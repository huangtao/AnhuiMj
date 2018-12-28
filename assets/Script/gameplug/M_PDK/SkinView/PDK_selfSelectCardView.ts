import PDK_skinCards from "../SkinView/PDK_skinCards";
import {SelfCardWidth,SelfCardHeight, TexturePath,CardType,GameInfo} from "../GameHelp/PDK_GameHelp";
import GameLogic from "../GameHelp/PDK_GameLogic";
import { PDK } from "../GameHelp/PDK_IClass";
import { M_PDK_GameMessage } from "../../../CommonSrc/M_PDK_GameMessage";
import VoicePlayer from "../GameHelp/PDK_VoicePlayer";
import  M_PDKClass  from "../M_PDKClass";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SelfSelectCardView extends cc.Component {

    @property(cc.Prefab)
    prefab_cardNode:cc.Prefab = null;
    //背景节点
    @property(cc.Node)
    private bigNode:cc.Node = null;
    //手牌节点
    @property(cc.Node)
    private cardsNode:cc.Node = null;
    //按钮
    @property(cc.Button)
    private btn_pass:cc.Button = null;
    @property(cc.Button)
    private btn_prompt:cc.Button = null;
    @property(cc.Button)
    private btn_out:cc.Button = null;  
   // @property(cc.Button)
    //private btn_cantOut:cc.Button = null;
    //按钮父节点
    @property(cc.Node)
    private node_btn:cc.Node = null;
    @property(cc.Sprite)
    private Sprite_zhuaNiao: cc.Sprite = null;
    @property(cc.Sprite)
    private Sprite_firstCard: cc.Sprite = null;
    //要不起遮罩
    @property(cc.Layout)
    private layout_mark:cc.Layout = null;
    @property(cc.Sprite)
    private Sprite_sysOut: cc.Label = null;
    @property(cc.Sprite)
    private Sprite_cantOut: cc.Sprite = null;

    //一局输赢提示
    @property(cc.Node)
    private node_roundTips:cc.Node = null;
    @property(cc.Sprite)
    private sprite_roundTips: cc.Sprite = null;
    @property([cc.SpriteFrame])
    private res_view: cc.SpriteFrame[] = [];


    //玩家自己手牌对象
    private handCard:PDK_skinCards[] = [];

    //开始点击的位置
    private startPosX:number = 0;

    //牌间距
    private cardSpacing:number = 60;

    //是否轮到我出牌
    private canSelectCard:boolean = false;
    //最后一次提示的牌的最小值
    private promptValue:number = 0;

    //发牌动画是否播放中
    private isAniIng:boolean = false;


    onLoad () {
        this.node_btn.active = false;

        this.cardsNode.on(cc.Node.EventType.TOUCH_START,this.touchBegin,this);
        this.cardsNode.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this);
        this.cardsNode.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
        this.cardsNode.on(cc.Node.EventType.TOUCH_CANCEL,this.touchCancel,this);
        this.btn_out.node.on("click",this.outCard,this);
        this.btn_prompt.node.on("click",this.promptCard,this);
        this.btn_pass.node.on("click",this.PassOpration,this);
        //this.btn_cantOut.node.on("click",this.cantOut,this);
        //this.btn_cantOut.node.active = false;
        this.Sprite_zhuaNiao.node.active = false;
        this.layout_mark.node.active = false;
        this.Sprite_sysOut.node.active = false;
        this.Sprite_cantOut.node.active = false;
        this.node_roundTips.active = false;

    }

    start () {

    }

    //设置是否能操作
    public SetCanSelectCard(state:boolean){
        this.promptValue = 0;
        //最后一张的时候自动出牌
        if(this.handCard.length == 1 && (PDK.ins.iview.GetGameInfo().lastOutCardChair == 0 || (PDK.ins.iview.GetGameInfo().lastOutCardType == CardType.One && GameLogic.GetCardLogicValue(PDK.ins.iview.GetGameInfo().lastOutCards[0]) < this.handCard[0].cValue)) )
        {
            this.handCard[0].setSelected(true);
            this.outCard();
            return;
        }

        this.canSelectCard = state;
        if(this.canSelectCard){
            this.node_btn.active = true;
            this.isCanTouchOutBtn();
        }
    }
    //清理上一局的手牌
    public clearHandCard(){
        this.promptValue = 0;
        for(let i = this.handCard.length -1;i>=0;i--){
            this.handCard[i].node.destroy();
            let index = this.handCard.indexOf(this.handCard[i]);
            this.handCard.splice(index,1);
        }
        this.cardsNode.removeAllChildren();
        this.node_btn.active = false;
        this.node_roundTips.active = false;
    }

    //创建手牌和设置手牌点击区域
    public SetPlayerCard(cards:number[]){
        this.promptValue = 0;
        if(this.handCard.length > 0){
            console.log("重新创建手牌错误，玩家已有手牌");
            return;
        }
        cards = GameLogic.SortCardToSmall(cards,cards.length,true);
        for(let i = 0;i<cards.length;i++){
            //实例化每张牌
            let cardObj = cc.instantiate(this.prefab_cardNode).getComponent<PDK_skinCards>(PDK_skinCards);
            cardObj.createCard(cards[i]);
            this.handCard.push(cardObj);
            this.cardsNode.addChild(cardObj.node);
        }
        this.refreshHandCardView();
    }
    //刷新手牌显示
    public refreshHandCardView(){
        for(let i = 0;i<this.handCard.length;i++){
            this.handCard[i].node.setPosition(i*this.cardSpacing,0);
            //每张牌在父节点上的X坐标
            this.handCard[i].PosX = i*this.cardSpacing;
            this.handCard[i].setSelected(false);
        }
        let NodeWith = this.handCard.length*this.cardSpacing + (SelfCardWidth - this.cardSpacing);
        this.refreshCardsPos(NodeWith);
    }
    //刷新手牌和触摸区域位置
    public refreshCardsPos(NodeWith:number){
        this.cardsNode.setContentSize(NodeWith,SelfCardHeight);
        this.cardsNode.setPositionX(0 - NodeWith/2);
    }
    //开始触摸
    private touchBegin(e:cc.Event.EventTouch){
        e.stopPropagation();
        if(this.canSelectCard && this.isAniIng == false){
            cc.log("开始触摸");
            this.startPosX = GameLogic.worldConvertLocalPoint(this.cardsNode,e.getLocation()).x;
            this.touchFristCard();
        }
    }
    //触摸中移动
    private touchMove(e:cc.Event.EventTouch){ 
        e.stopPropagation();
        if(this.canSelectCard && this.isAniIng == false){
            let nowTouchPosX = GameLogic.worldConvertLocalPoint(this.cardsNode,e.getLocation()).x; 
            this.changeCardSelected(nowTouchPosX);
            
            cc.log("触摸移动中"+ nowTouchPosX);
        } 
    }
    //取消触摸
    private touchCancel(e:cc.Event.EventTouch){
        e.stopPropagation();
        this.touchSelectEnd();
    }
    //触摸事件结束
    private touchEnd(e:cc.Event.EventTouch){
        this.touchSelectEnd();
        e.stopPropagation();
    }
    //选牌结束
    private touchSelectEnd(){
        this.changeSelectedByTouch();
        this.isCanTouchOutBtn();
        VoicePlayer.PlaySysSound("bull_select_poker");
    }

    //根据触摸结果改变选中状态
    private changeSelectedByTouch(){
        let tempCards = [];
        for(let card of this.handCard){
            if(card.touch_selected.node.active){
                tempCards.push(card);
            }
        }
        if(tempCards.length > 5 && (PDK.ins.iview.GetGameInfo().lastOutCardChair == 0 || PDK.ins.iview.GetGameInfo().lastOutCardChair == -1 ||(PDK.ins.iview.GetGameInfo().lastOutCardChair != 0 && PDK.ins.iview.GetGameInfo().lastOutCardChair != -1 && PDK.ins.iview.GetGameInfo().lastOutCardType == CardType.ShunZi))){
            //手牌（值=》对象）对象
            let cardsObj = {};
            for(let card of tempCards){
                if(cardsObj.hasOwnProperty(card.cValue)){
                    cardsObj[card.cValue].push(card);
                }else{
                    cardsObj[card.cValue] = [];
                    cardsObj[card.cValue].push(card);
                }
            }
            let length = 0;
            let isShun = true;
            for(let i in cardsObj){
                length += 1;
            }
            let index = 0;
            for(let i in cardsObj){
                index += 1;
                if(cardsObj.hasOwnProperty(parseInt(i) + 1) == false && index  < length){
                    isShun = false;
                }
                if(cardsObj[i].length == 3 && cardsObj.hasOwnProperty(parseInt(i) + 1) && cardsObj[(parseInt(i) + 1).toString()].length == 3){
                    isShun = false;
                }
            }
            if(length < 5 || isShun == false){
                for(let card of tempCards){
                    if(card.touch_selected.node.active){
                        card.changeSelected();
                        card.touch_selected.node.active = false;
                    }
                }
            }else{
                for(let card of tempCards){
                    card.setSelected(false);
                    card.touch_selected.node.active = false;
                }
                for(let i in cardsObj){
                    cardsObj[i][0].setSelected(true);
                }
            }

        }else{
            for(let card of tempCards){
                if(card.touch_selected.node.active){
                    card.changeSelected();
                    card.touch_selected.node.active = false;
                }
            }
        }
    }

     //判断出牌按钮是否可点击
     private isCanTouchOutBtn(){
        let isCanOut = false;
        for(let card of this.handCard){
            if(card.isSelected){
                isCanOut = true;
            }
        }
        this.setOutBtnState(isCanOut);
    }
    //开始触摸时选中第一张牌
    private touchFristCard(){
        let offsetMax = this.cardSpacing -1;
        for(let i = 0;i<this.handCard.length;i++ ){
            if(i === this.handCard.length - 1){
                offsetMax = SelfCardWidth;
            }
            if(this.handCard[i].PosX < this.startPosX && this.handCard[i].PosX + offsetMax > this.startPosX){
                this.handCard[i].changeTouchState(true);
            }
        }

    }


    //根据触摸移动点判断选中牌
    private changeCardSelected(endX){
        let minX,maxX;
        if(this.startPosX < endX){
            [minX,maxX] = [this.startPosX, endX];
        }else{
            [minX,maxX] = [endX, this.startPosX];
        }
        let offset = this.cardSpacing;
        for(let i = 0;i < this.handCard.length;i++){
            if(i == this.handCard.length - 1){
                offset = SelfCardWidth;
            }
            if(this.handCard[i].PosX +  offset >= minX && this.handCard[i].PosX < maxX){
                this.handCard[i].changeTouchState(true);
            }else{
                this.handCard[i].changeTouchState(false);
            }
        }
    }

    //出牌
    private outCard(){ 
        let lastCards = PDK.ins.iview.GetGameInfo().lastOutCards;
        //获取选中的牌
        let outCardList:number[] = [];
        for(let card of this.handCard){
            if(card.isSelected){
                outCardList.push(card.getValue());
            }
        }
        if(outCardList.length == 0){
            console.log("未选中任何牌");
            return;
        }
        //选中的牌的牌组类型
        let cardType = GameLogic.getCardType(outCardList);
        //有2必打A
        if(PDK.ins.iview.GetGameRule().have2OutA && lastCards.length == 1 && GameLogic.GetCardLogicValue(lastCards[0]) == 14 && PDK.ins.iview.GetGameInfo().lastOutCardChair != 0){
            if((outCardList.length != 1 || (outCardList.length == 1 && GameLogic.GetCardLogicValue(outCardList[0]) != 15)) && this.isHaveCardByLogic(15)){
                for(let card of this.handCard){
                    card.setSelected(false);
                }
                return;
            }
        }

       //类型错误，取消选中
       if(cardType == CardType.Error){
            this.cancelSelected();
       }else{
           //先出牌
            if(PDK.ins.iview.GetGameInfo().lastOutCardChair == -1){
                let handCardValueList:number[] = [];
                for(let card of this.handCard){
                    handCardValueList.push(card.getValue());
                }
                //黑桃三必出
                if(PDK.ins.iview.GetGameRule().spades3MustOut && this.isHaveCard(handCardValueList,0x33)){
                    if(this.isHaveCard(outCardList,0x33)){
                        this.sendOutCardMessage(outCardList);
                    }else{
                        this.cancelSelected();
                    }
                //红桃三必出
                }else if(PDK.ins.iview.GetGameRule().redPeach3MustOut && this.isHaveCard(handCardValueList,0x23) ){
                    if(this.isHaveCard(outCardList,0x23)){
                        this.sendOutCardMessage(outCardList);
                    }else{
                        this.cancelSelected();
                    }
                }else{
                    this.sendOutCardMessage(outCardList); 
                }
            //自己出的牌没人要
            }else if(PDK.ins.iview.GetGameInfo().lastOutCardChair == 0){
                if(PDK.ins.iview.GetGameInfo().nextOutCardChair == 0){
                    this.sendOutCardMessage(outCardList);
                }else{
                    this.cancelSelected();
                }
            //选中的牌大于最后的出牌
            }else if(this.isBiggerThanLast(outCardList,cardType,outCardList.length)){
                if(PDK.ins.iview.GetGameInfo().nextOutCardChair == 0){
                    this.sendOutCardMessage(outCardList);
                }else{
                    this.cancelSelected();
                }
            }else{
                this.cancelSelected();
            }
            
       }
    }
    //取消选中牌
    public cancelSelected(){
        if(this.canSelectCard == false || this.isAniIng == true){
            return;
        }
        for(let card of this.handCard){
            card.setSelected(false);
        }
        this.setOutBtnState(false);
    }
    //判断手牌中是否有某张牌
    private isHaveCardByLogic(value:number){
        for(let card of this.handCard){
            if(card.cValue == value){
                return true;
            }
        }
        return false;
    }
    //判断手牌中是否有某张牌
    private isHaveCard(cards:number[],value:number){
        for(let card of cards){
            if(card == value){
                return true;
            }
        }
        return false;
    }
    //判断玩家选中的牌是否大于上家出的牌
    private isBiggerThanLast(selfCards:number[],selfCardType:CardType,selfOutCardCount:number){
        let threeAIsBomb = PDK.ins.iview.GetGameRule().threeAIsBomb;
         //自己选中的牌的值数组和数量数组
         let selfCardHashObj = GameLogic.getCardHashObj(selfCards);
         let selfCardHashObjNum = Object.getOwnPropertyNames(selfCardHashObj).length;
         let [selfCardValueArray,selfCardCountArray] = GameLogic.ObjToArray(selfCardHashObj);


        //最后出牌的值数组和数量数组
        let lastCards = PDK.ins.iview.GetGameInfo().lastOutCards;
        let lastCardType = PDK.ins.iview.GetGameInfo().lastOutCardType;
        let lastCardHashObj = GameLogic.getCardHashObj(lastCards);
        let lastCardHashObjNum = Object.getOwnPropertyNames(lastCardHashObj).length;
        let [lastCardValueArray,lastCardCountArray] = GameLogic.ObjToArray(lastCardHashObj);
        //自己的牌型是炸弹
        if(selfCardType == CardType.Bomb){
            if(lastCardType == CardType.Bomb){
                if(threeAIsBomb && selfCardHashObjNum == 2){
                    if(lastCardHashObjNum == 2 || (lastCardHashObjNum == 1 && lastCardValueArray[0] >= 14)){
                        return false;
                    }
                    return true;
                }else if(selfCardValueArray[0]>lastCardValueArray[0]){
                    return true;
                }
                return false;
            }else{
                return true;
            }
        //牌的数量相同且牌型相同
        }else if(selfOutCardCount == lastCards.length && selfCardType == lastCardType){
            if(selfCardHashObjNum == 1){
                return selfCardValueArray[0]>lastCardValueArray[0];
            }else{
                if (selfCardType == CardType.lianDui || selfCardType == CardType.ShunZi)
                {
                    return selfCardValueArray[0] > lastCardValueArray[0];
                }
                else if (selfCardType == CardType.ThreeAndOne || selfCardType == CardType.ThreeAndTwo)
                {
                    return this.getCardValueByCount(selfCardValueArray, selfCardCountArray, 3) > this.getCardValueByCount(lastCardValueArray, lastCardCountArray, 3);
                }
                else if (selfCardType == CardType.FourAndTwo)
                {
                    if(threeAIsBomb){
                        for(let i = 0;i < selfCardValueArray.length;i++){
                            if(selfCardValueArray[i] == 14 && selfCardCountArray[i] == 3){
                                return 14 > this.getCardValueByCount(lastCardValueArray, lastCardCountArray, 4);
                            }
                        }
                        for(let i = 0;i < lastCardValueArray.length;i++){
                            if(lastCardValueArray[i] == 14 && lastCardCountArray[i] == 3){
                                return this.getCardValueByCount(selfCardValueArray, selfCardCountArray, 4) > 14;
                            }
                        }
                    }
                    
                    return this.getCardValueByCount(selfCardValueArray, selfCardCountArray, 4) > this.getCardValueByCount(lastCardValueArray, lastCardCountArray, 4);
                }
                else if (selfCardType == CardType.Plane)
                {
                    return this.ComprePlane(selfCardValueArray, selfCardCountArray, lastCardValueArray, lastCardCountArray);
                }
            }
        }else if(PDK.ins.iview.GetGameRule().SZTW && (lastCardType == CardType.ThreeAndOne ||  lastCardType == CardType.ThreeAndTwo) && selfCardType == CardType.Three && this.handCard.length == 3){
            return this.getCardValueByCount(selfCardValueArray, selfCardCountArray, 3) > this.getCardValueByCount(lastCardValueArray, lastCardCountArray, 3);
        }
        return false;
    }

    //根据张数获取牌值
    private getCardValueByCount(cardValue:number[],cardCount:number[],count:number)
    {
        for (let i = 0; i < cardCount.length; i++) {
            if (cardCount[i] >= count) {
                return cardValue[i];
            }
        }
        return 0;
    }
    //比较飞机
    private ComprePlane(cardValueArray:number[], cardCountArray:number[], cardBValueArray:number[],cardBCountArray:number[])
    {
        let count = 0;
        let cardATempArray = this.getTempPlaneArray(cardValueArray,cardCountArray);
        let cardBTempArray = this.getTempPlaneArray(cardBValueArray, cardBCountArray);

        if (cardATempArray.length >= cardBTempArray.length && cardATempArray[0] > cardBTempArray[0]) {
            return true;
        }

        return false;
    }
    //获取飞机中连续的部分
    private getTempPlaneArray(cardValueArray:number[],cardCountArray:number[])
    {
        let tempArray = [];
        for (let i = 0; i < cardValueArray.length; i++)
        {
            if (cardValueArray[i] + 1 == cardValueArray[i + 1] && cardCountArray[i] >= 3)
            {
                if (tempArray.length == 0)
                {
                    tempArray.push(cardValueArray[i]);
                    tempArray.push(cardValueArray[i+1]);
                }
                else if (tempArray[tempArray.length - 1] + 1 == cardValueArray[i])
                {
                    tempArray.push(cardValueArray[i+1]);
                }
            }

        }
        return tempArray;

    }

    //删除选中的手牌对象，往服务器发送出牌协议
    private sendOutCardMessage(outCardList:number[]){
        if(outCardList.length != 0){
            for(let i = this.handCard.length -1;i>=0;i--){
                if(this.handCard[i].isSelected){
                    this.handCard[i].node.destroy();
                    let index = this.handCard.indexOf(this.handCard[i]);
                    this.handCard.splice(index,1);
                }
            }
        }
        this.refreshHandCardView();
        this.node_btn.active = false;

        var data = new M_PDK_GameMessage.CMD_C_OutCard();
        data.cards = outCardList;
        PDK.ins.iclass.SendData(data);
        if(this.handCard.length == 1){
            this.showAuto();
        }else if(this.handCard.length == 0){
            this.clearTips();
        }
    }

    private promptCard(){
        this.promptSelectedCard();
        this.isCanTouchOutBtn();
        VoicePlayer.PlaySysSound("bull_select_poker");
    }
    
    //提示出牌
    private promptSelectedCard(){
        let threeAIsBomb = PDK.ins.iview.GetGameRule().threeAIsBomb;
        //先取消选中的牌
        for(let card of this.handCard){
            if(card.isSelected == true){
                card.setSelected(false);
            }
        }
        //手牌（值=》对象）对象
        let cardsObj = {};
        for(let card of this.handCard){
            if(cardsObj.hasOwnProperty(card.cValue)){
                cardsObj[card.cValue].push(card);
            }else{
                cardsObj[card.cValue] = [];
                cardsObj[card.cValue].push(card);
            }
        }
        let lastOutCardChair = PDK.ins.iview.GetGameInfo().lastOutCardChair ;
        //先出牌或自己出的牌没人要
        if(lastOutCardChair == -1 || lastOutCardChair == 0){
            let handCardValueList:number[] = [];
            for(let card of this.handCard){
                handCardValueList.push(card.getValue());
            }
            //黑桃三必出
            if(PDK.ins.iview.GetGameRule().spades3MustOut && this.isHaveCard(handCardValueList,0x33)){
                for(let card of this.handCard){
                    if(card.getValue() == 0x33){
                        card.setSelected(true);
                        return;
                    }
                }
            //红桃三必出
            }else if(PDK.ins.iview.GetGameRule().redPeach3MustOut && this.isHaveCard(handCardValueList,0x23) ){
                for(let card of this.handCard){
                    if(card.getValue() == 0x23){
                        card.setSelected(true);
                        return;
                    }
                }
            }
            if(this.promptValue == 0){
                this.promptValue = 1;
            }
            for(let i = 1;i<5;i++){
                for(let key in cardsObj){
                    if(cardsObj[key].length == i && cardsObj[key][0].cValue > this.promptValue){
                        this.promptValue = cardsObj[key][0].cValue;
                        for(let card of cardsObj[key]){
                            card.changeSelected(true);
                        }
                        return;
                    }
                }
            }
            this.promptValue = 1;
            this.promptSelectedCard();
        //获取手牌中大于上家的牌
        }else{
            let lastCards = PDK.ins.iview.GetGameInfo().lastOutCards;
            let cardType = PDK.ins.iview.GetGameInfo().lastOutCardType;
            //最后出牌的值数组和数量数组
            let lastCardHashObj = GameLogic.getCardHashObj(lastCards);
            let lastCardHashObjNum = Object.getOwnPropertyNames(lastCardHashObj).length;
            let [lastCardValueArray,lastCardCountArray] = GameLogic.ObjToArray(lastCardHashObj);

            //如果手牌数量小于打出的牌数量
            if(this.handCard.length < lastCards.length && this.handCard.length>=4){
                if(threeAIsBomb && cardsObj.hasOwnProperty(14)&& cardsObj[14].length == 3){
                    for(let card of cardsObj[14]){
                        card.changeSelected(true);
                    }
                }else{
                    for(let i in cardsObj){
                        if(cardsObj[i].length == 4){
                            for(let card of cardsObj[i]){
                                card.changeSelected(true);
                            }
                            return;
                        }
                    }

                }
            }else{
                //单张、对子、三张
                if(cardType == CardType.One || cardType == CardType.Two || cardType == CardType.Three){
                    if(this.promptValue == 0){
                        this.promptValue = lastCardValueArray[0];
                    }
                    let selectedCount = 0;
                    let needCount = 1;
                    let forCount = 3;
                    if(cardType == CardType.Two){
                        needCount =2;
                        forCount = 2;
                    }else if(cardType == CardType.Three){
                        needCount = 3;
                        forCount = 1;
                    }
                    for(let i = 0;i<forCount;i++){
                        for(let cards in cardsObj){
                            if(cardsObj[cards].length == cardType + i && parseInt(cards) > this.promptValue){
                                for(let card of cardsObj[cards]){
                                    if(selectedCount < needCount){
                                        this.promptValue = card.cValue;
                                        card.changeSelected(true);
                                        selectedCount++;
                                        if(needCount == selectedCount){
                                            return;
                                        }
                                    }
                                    
                                }
                            }
                        }
                    }
                    this.promptValue = lastCardValueArray[0];
                //三带一、二
                }else if(cardType == CardType.ThreeAndOne || cardType == CardType.ThreeAndTwo){
                    let tempCard = 0;
                    let isHaveBigger = false;
                    for(let i = 0;i<lastCardCountArray.length;i++){
                        if(lastCardCountArray[i] >= 3){
                            tempCard = lastCardValueArray[i];
                        }
                    }
                    if(this.promptValue == 0){
                        this.promptValue = tempCard;
                    }
                    for(let i in cardsObj){
                        if(cardsObj[i].length >= 3 && parseInt(i) > this.promptValue){
                            isHaveBigger = true;
                            let SelectedCount = 0;
                            for(let card of cardsObj[i]){
                                if(SelectedCount < 3){
                                    this.promptValue = card.cValue;
                                    card.changeSelected(true);
                                    SelectedCount++;
                                }
                            }
                            break;
                        }
                    }
                    if(isHaveBigger){
                        let needGetCount = 1;
                        if(cardType == CardType.ThreeAndTwo){
                            needGetCount = 2;
                        }
                        this.setCardSelected(needGetCount,cardsObj);
                        return;
                    }
                    this.promptValue = tempCard;

                //顺子连对和飞机
                }else if(cardType == CardType.ShunZi|| cardType == CardType.lianDui||cardType == CardType.Plane){
                    let ShunZiMinValue = lastCardValueArray[0];
                    let ShunZiCount = lastCardValueArray.length;
                    let ThreeCardCount = 0;
                    let count = 1;
                    if(cardType == CardType.lianDui){
                        count = 2;
                    }else if(cardType == CardType.Plane){
                        count = 3;
                        let StartValueIndex = -1;
                        for(let i = 0;i<lastCardValueArray.length;i++){
                            if(lastCardCountArray[i] >= 3){
                                if(StartValueIndex == -1){
                                    StartValueIndex =  i;
                                }
                                ThreeCardCount++;
                            }
                        }
                        if(ThreeCardCount*3  == lastCards.length|| ThreeCardCount*3 + ThreeCardCount == lastCards.length|| ThreeCardCount*3 + ThreeCardCount*2== lastCards.length){
                            ShunZiCount= ThreeCardCount;
                            ShunZiMinValue = lastCardValueArray[StartValueIndex];
                        } else{
                            ThreeCardCount-=1;
                            if(ThreeCardCount*3  == lastCards.length|| ThreeCardCount*3 + ThreeCardCount == lastCards.length|| ThreeCardCount*3 + ThreeCardCount*2== lastCards.length){
                                ShunZiCount= ThreeCardCount;
                                ShunZiMinValue = lastCardValueArray[StartValueIndex];
                            } 
                        }

                    }
                    if(this.promptValue == 0){
                        this.promptValue = ShunZiMinValue;
                    }
                    let temp = [];
                    for(let i in cardsObj){
                        //小于顺子最后一张牌的就不用判断了
                        if(parseInt(i) > this.promptValue){
                            if(cardsObj.hasOwnProperty(parseInt(i)+1) && cardsObj[i].length >=count && cardsObj[parseInt(i)+1].length >=count && parseInt(i) != 15 && parseInt(i)+1 != 15){
                                if(temp.length == 0){
                                    temp.push(parseInt(i));
                                    temp.push(parseInt(i)+1); 
                                }else{
                                    temp.push(parseInt(i)+1); 
                                }
                            }else{
                                //如果顺子的长度大于上一家打出的长度，则选中
                                if(temp.length>= ShunZiCount){
                                    for(let j = 0;j<ShunZiCount;j++){
                                        let selectCardValue = temp[j];
                                        if(j == 0){
                                            this.promptValue = cardsObj[selectCardValue][0].cValue;
                                        }
                                       for(let x = 0;x<cardsObj[selectCardValue].length;x++){
                                            if(x < count){
                                                cardsObj[selectCardValue][x].changeSelected(true);
                                            }
                                        }
                                    }
                                    return;
                                }
                                temp = [];
                            }

                        }
                        
                    }
                    this.promptValue = ShunZiMinValue;

                    //飞机还要获取带的牌
                    if(temp.length > 0 && cardType == CardType.Plane && lastCards.length - ThreeCardCount*3 > 0){
                        let needGetCount = lastCards.length - ThreeCardCount*3;
                        this.setCardSelected(needGetCount,cardsObj);
                    }
                //四带二   
                }else if(cardType == CardType.FourAndTwo){
                    let tempCard = 0;
                    let isHaveBigger = false;
                    for(let i = 0;i<lastCardCountArray.length;i++){
                        if(lastCardCountArray[i] == 4 || (threeAIsBomb && lastCardCountArray[i] == 3 && lastCardValueArray[i] == 14)){
                            tempCard = lastCardValueArray[i];
                        }
                    }
                    if(this.promptValue == 0){
                        this.promptValue = tempCard;
                    }
                    for(let i in cardsObj){
                        if((cardsObj[i].length == 4 ||( threeAIsBomb && cardsObj[i].length == 3 && cardsObj[i][0] == 14 ))&& parseInt(i) > this.promptValue){
                            isHaveBigger = true;
                            for(let card of cardsObj[i]){
                                this.promptValue = card.cValue;
                                card.changeSelected(true);
                            }
                            break;
                        }
                    }
                    if(isHaveBigger){
                        //3个A带三张其他任意牌也为4带2
                        if(threeAIsBomb && tempCard == 14){
                            this.setCardSelected(3,cardsObj); 
                        }else{
                            this.setCardSelected(2,cardsObj); 
                        }
                        return;
                    }
                    this.promptValue = tempCard;
                //炸弹  
                }else if(cardType == CardType.Bomb){
                    if(this.promptValue == 0){
                        this.promptValue = lastCardValueArray[0];
                        if(lastCardValueArray.length == 2){
                            this.promptValue = 14;
                        }
                    }
                    for(let i in cardsObj){
                        if(cardsObj[i].length == 4 && parseInt(i) > this.promptValue){
                            for(let card of cardsObj[i]){
                                this.promptValue = card.cValue;
                                card.changeSelected(true);
                            }
                            return;
                        }
                    }
                    //3个A或3A带1为炸弹
                    if(threeAIsBomb && cardsObj.hasOwnProperty(14)&& cardsObj[14].length >= 3 && 14 > this.promptValue){
                        let count = 0;
                        for(let card of cardsObj[14]){
                            if(count < 3){
                                this.promptValue = card.cValue;
                                card.changeSelected(true);
                                count += 1;
                            }
                        }
                        if(this.handCard.length >= 4){
                            this.setCardSelected(1,cardsObj);
                        }
                        return;
                    }
                    this.promptValue = 0;
                }
                let isHasSelectCard = false;
                for(let card of this.handCard){
                    if(card.isSelected == true){
                        isHasSelectCard = true;
                    }
                }
                if(isHasSelectCard == false && cardType != CardType.Bomb){
                    for(let i in cardsObj){
                        if(cardsObj[i].length == 4){
                            for(let card of cardsObj[i]){
                                card.changeSelected(true);
                            }
                            return;
                        }
                    }
                    if(threeAIsBomb && cardsObj.hasOwnProperty(14)&& cardsObj[14].length >= 3){
                        let count = 0;
                        for(let card of cardsObj[14]){
                            if(count < 3){
                                this.promptValue = card.cValue;
                                card.changeSelected(true);
                                count += 1;
                            }
                        }
                        if(this.handCard.length >= 4){
                            this.setCardSelected(1,cardsObj);
                        }
                        return;
                    }
                }
                this.promptValue = 0;
                this.promptSelectedCard();

            }

        }
        
    }
    //选中手牌（优先选中单张）
    private setCardSelected(needGetCount:number,cardsObj){
        let getCount = 0;
        //张数少的牌开始取（从小到大取牌）
        for(let i = 1;i<4;i++){
            for(let key in cardsObj){
                if(cardsObj[key].length == i){
                    for(let card of cardsObj[key]){
                        if(getCount < needGetCount && card.isSelected == false){
                            card.changeSelected(true);
                            getCount+=1;
                            if(getCount == needGetCount){
                                return;
                            }
                        }
                    }
                    
                }
            }
        }
    }

    //不出
    private PassOpration(){
        if(PDK.ins.iview.GetGameRule().mustOut == 0){
            M_PDKClass.Instance.UiManager.ShowTip("有牌必要");
            return;
        }
        if(PDK.ins.iview.GetGameInfo().lastOutCardChair == -1 && (PDK.ins.iview.GetGameRule().redPeach3MustOut || PDK.ins.iview.GetGameRule().spades3MustOut)){
            M_PDKClass.Instance.UiManager.ShowTip("红桃三或黑桃三必出");
            return;
        }
        if(PDK.ins.iview.GetGameRule().have2OutA && PDK.ins.iview.GetGameInfo().lastOutCardType == CardType.One && GameLogic.GetCardLogicValue(PDK.ins.iview.GetGameInfo().lastOutCards[0]) == 14 && this.isHaveCardByLogic(15)){
            M_PDKClass.Instance.UiManager.ShowTip("有2必打A");
            return;
        }
        
        //最后打出牌的不是自己，自己可以不要，否则必须出牌
        if(PDK.ins.iview.GetGameInfo().lastOutCardChair != 0){
            this.cancelSelected();
            this.sendOutCardMessage([]);
        }else{
            M_PDKClass.Instance.UiManager.ShowTip("必须出牌");
        }
    }
    //要不起
    private cantOut(){
        this.sendOutCardMessage([]);
    }

    //设置不出按钮的显示/不显示
    public setPassBtnState(state:boolean){
        this.btn_pass.node.active = state;
    }
    //设置出牌按钮的状态
    public setOutBtnState(state:boolean){
        this.btn_out.interactable = state;
    }
    //设置提示按钮的显示/不显示
    public setPromptBtnState(state:boolean){
        this.btn_prompt.node.active = state;
        if(state){
            this.btn_out.node.setPosition(302,0);
        }else{
            this.btn_out.node.setPosition(83,0);
        }
    }

    /**
     * 设置抓鸟动画
     */   
    public showZhuaNiaoAni(cChair:number,pos:cc.Vec2){
        if(cChair == 1){
            this.Sprite_zhuaNiao.node.setScale(-1,1);
        }else{
            this.Sprite_zhuaNiao.node.setScale(1,1);
        }
        this.Sprite_zhuaNiao.node.setPosition(0,0);
        this.Sprite_zhuaNiao.node.active = true;
        let movePos = pos;
        let ani = cc.sequence(cc.moveTo(0.6,movePos),cc.callFunc(function(){
            PDK.ins.iview.ShowZhuaNiaoIcon(cChair);
            this.Sprite_zhuaNiao.node.active = false;
        },this));
        this.Sprite_zhuaNiao.node.runAction(ani);
    }

    //显示先出牌的飞牌动画
    public showFristCardAni(value:number,Pos:cc.Vec2,cChair:number){
        this.Sprite_firstCard.node.active = true;
        this.Sprite_firstCard.node.opacity = 255;
        this.Sprite_firstCard.node.setScale(1,1);
        this.Sprite_firstCard.node.rotation = 0;
        this.Sprite_firstCard.node.setPosition(0,0);
        if(value == 0 ){
            this.Sprite_firstCard.spriteFrame = this.res_view[0];
        }else{
            this.Sprite_firstCard.spriteFrame = PDK.ins.iview.GetCardsRes(value);
        }
        var bezier = [new cc.Vec2(Pos.x/2-100, 50), new cc.Vec2(Pos.x/2+100, 150), Pos];
        var bezierTo = cc.bezierTo(0.25, bezier);
        let action = cc.spawn(bezierTo, cc.scaleTo(0.25, 0.3),cc.fadeOut(0.3),cc.rotateBy(0.3,1200));
        let callback = cc.callFunc(function(){
            this.Sprite_firstCard.node.active = false;
            PDK.ins.iview.showFirstIcon(cChair);
            PDK.ins.iview.changeOperationPlayer(cChair,true);
        },this)
        let  actionsequence = cc.sequence(cc.delayTime(0.8),action,callback);
        this.Sprite_firstCard.node.runAction(actionsequence);

    }

    //手牌发牌动画
    public showGetCardAni(data: M_PDK_GameMessage.CMD_S_GameStart){
        this.isAniIng = true;
        let delayTimes = 0.15;
        for(let i = 0;i<this.handCard.length;i++){
            let card = this.handCard[i].node;
            card.opacity = 0;
            let toPos = card.getPosition();
            card.setPositionY(card.getPositionY() + 20);
            let action = cc.spawn(cc.moveTo(0.3,toPos),cc.fadeIn(0.3));
            let actionSequence = cc.sequence(cc.delayTime(i*delayTimes),action);
            card.runAction(actionSequence);
        } 
        this.node.runAction(cc.sequence(cc.delayTime(this.handCard.length*delayTimes + 0.2),cc.callFunc(
            function(){
                this.canSelectCard = true;
                this.isAniIng = false;
                PDK.ins.iview.Rec_GameStart(data,true);
            },this)
        ));
    }
    //要不起按钮显示/不显示
    public showBtnCantOut(state:boolean){
        this.Sprite_cantOut.node.active = false;
        if(state){
            this.cancelSelected();
            this.canSelectCard = false;
            this.layout_mark.node.active = true;
            this.layout_mark.node.setContentSize(this.cardsNode.getContentSize().width - 12,this.cardsNode.getContentSize().height - 10);
            this.layout_mark.node.setPositionX(this.cardsNode.getPositionX()+5);
            if(this.Sprite_sysOut.node.active){
                this.Sprite_sysOut.node.active = false;
            }
            this.Sprite_cantOut.node.active = true;
        }else if(this.handCard.length != 1){
            this.canSelectCard = true;
            this.layout_mark.node.active = false;
            this.Sprite_cantOut.node.active = false;
            this.Sprite_sysOut.node.active = false;
        }
    }
    //剩余1张，系统出牌
    public showAuto(){
        if(this.handCard.length != 1){
            return;
        }
        this.cancelSelected();
        this.canSelectCard = false;
        this.layout_mark.node.active = true;
        this.layout_mark.node.setContentSize(this.cardsNode.getContentSize().width - 12,this.cardsNode.getContentSize().height - 10);
        this.layout_mark.node.setPositionX(this.cardsNode.getPositionX()+5);
        this.Sprite_sysOut.node.active = true;
    }
    //清理系统提示
    public clearTips(){
        this.layout_mark.node.active = false;
        this.Sprite_sysOut.node.active = false;
        this.Sprite_cantOut.node.active = false;
    }

    //每局输赢提示
    public showRoundResultTip(state:number){
        if(state == 0){
            this.node_roundTips.active = false;
        }else{
            this.sprite_roundTips.spriteFrame = this.res_view[state];
            this.node_roundTips.active = true;
        }
    }
}
