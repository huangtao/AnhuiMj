import PDK_skinCards from "../SkinView/PDK_skinCards";
import {SelfCardWidth,SelfCardHeight, CardWidth,CardType,GameInfo} from "../GameHelp/PDK_GameHelp";
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
    //按钮父节点
    @property(cc.Node)
    private node_btn:cc.Node = null;


    //玩家自己手牌对象
    private handCard:PDK_skinCards[] = [];

    //开始点击的位置
    private startPosX:number = 0;
   
    //滑动选中的牌
    private slideSelectedCard:PDK_skinCards[] = [];

    //牌间距
    private cardSpacing:number = 50;

    //是否轮到我出牌
    private canSelectCard:boolean = false;


    onLoad () {
        this.node_btn.active = false;

        this.cardsNode.on(cc.Node.EventType.TOUCH_START,this.touchBegin,this);
        this.cardsNode.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this);
        this.cardsNode.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
        this.btn_out.node.on("click",this.outCard,this);
        this.btn_prompt.node.on("click",this.promptCard,this);
        this.btn_pass.node.on("click",this.PassOpration,this)

    }

    start () {

    }

    //设置是否能操作
    public SetCanSelectCard(state:boolean){
        this.canSelectCard = state;
        if(this.canSelectCard){
            this.node_btn.active = true;
            this.isCanTouchOutBtn();
        }
    }
    //清理上一局的手牌
    public clearHandCard(){
        for(let i = this.handCard.length -1;i>=0;i--){
            this.handCard[i].node.destroy();
            let index = this.handCard.indexOf(this.handCard[i]);
            this.handCard.splice(index,1);
        }
        this.cardsNode.removeAllChildren();
        this.node_btn.active = false;
    }


    //创建手牌和设置手牌点击区域
    public SetPlayerCard(cards:number[]){
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
        if(this.canSelectCard){
            cc.log("开始触摸");
            this.slideSelectedCard = [];
            this.startPosX = GameLogic.worldConvertLocalPoint(this.cardsNode,e.getLocation()).x;
            this.touchFristCard();
        }
    }
    //触摸中移动
    private touchMove(e:cc.Event.EventTouch){ 
        if(this.canSelectCard){
            let nowTouchPosX = GameLogic.worldConvertLocalPoint(this.cardsNode,e.getLocation()).x; 
            this.changeCardSelected(nowTouchPosX);
            
            cc.log("触摸移动中"+ nowTouchPosX);
        } 
    }
    private touchEnd(e:cc.Event.EventTouch){
       this.isCanTouchOutBtn();
       VoicePlayer.PlaySysSound("bull_select_poker");
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
                this.handCard[i].changeSelected();
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

        for(let card of this.handCard){
            if(card.PosX +  this.cardSpacing >= minX && card.PosX < maxX){
                card.setSelected(true);
                if(this.slideSelectedCard.indexOf(card) === -1){
                    this.slideSelectedCard.push(card);
                }
            }
        }

        for(let card of this.slideSelectedCard){
            if(card.PosX +  this.cardSpacing >= minX && card.PosX < maxX){
                
            }else{
                card.setSelected(false);
                this.slideSelectedCard.splice(this.slideSelectedCard.indexOf(card),1);
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
        //有2必打A
        if(PDK.ins.iview.GetGameRule().have2OutA && lastCards.length == 1 && GameLogic.GetCardLogicValue(lastCards[0]) == 14){
            if(outCardList.length != 1 ||(outCardList.length == 1 && GameLogic.GetCardLogicValue(outCardList[0]) != 15 && this.isHaveCardByLogic(15))){
                for(let card of this.handCard){
                    card.setSelected(false);
                }
                return;
            }
        }

       //选中的牌的牌组类型
       let cardType = GameLogic.getCardType(outCardList);
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
                this.sendOutCardMessage(outCardList);
            //选中的牌大于最后的出牌
            }else if(this.isBiggerThanLast(outCardList,cardType,outCardList.length)){
                this.sendOutCardMessage(outCardList);
            }else{
                this.cancelSelected();
            }
            
       }
    }
    //取消选中牌
    private cancelSelected(){
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
                if(selfCardHashObjNum == 2){
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
                    return this.getCardValueByCount(selfCardValueArray, selfCardCountArray, 4) > this.getCardValueByCount(lastCardValueArray, lastCardCountArray, 4);
                }
                else if (selfCardType == CardType.Plane)
                {
                    return this.ComprePlane(selfCardValueArray, selfCardCountArray, lastCardValueArray, lastCardCountArray);
                }
            }
        }else if(PDK.ins.iview.GetGameRule().SZTW && (lastCardType == CardType.ThreeAndOne ||  lastCardType == CardType.ThreeAndTwo) && selfCardType == CardType.Three && selfCards.length == 3){
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
        for(let i = this.handCard.length -1;i>=0;i--){
            if(this.handCard[i].isSelected){
                this.handCard[i].node.destroy();
                let index = this.handCard.indexOf(this.handCard[i]);
                this.handCard.splice(index,1);
            }
        }
        this.refreshHandCardView();
        this.node_btn.active = false;

        var data = new M_PDK_GameMessage.CMD_C_OutCard();
        data.cards = outCardList;
        PDK.ins.iclass.SendData(data);
    }

    private promptCard(){
        this.promptSelectedCard();
        this.isCanTouchOutBtn();
    }
    
    //提示出牌
    private promptSelectedCard(){
        //先取消选中的牌
        for(let card of this.handCard){
            if(card.isSelected == true){
                card.setSelected(false);
            }
        }
        let resultCards = [];
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
            for(let i = 1;i<5;i++){
                for(let key in cardsObj){
                    if(cardsObj[key].length == i){
                        for(let card of cardsObj[key]){
                            card.changeSelected(true);
                        }
                        return;
                    }
                }
            }
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
                if(cardsObj.hasOwnProperty(14)&& cardsObj[14].length == 3){
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
                            if(cardsObj[cards].length == cardType + i && parseInt(cards) > lastCardValueArray[0]){
                                for(let card of cardsObj[cards]){
                                    if(selectedCount < needCount){
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
                    
                //三带一、二
                }else if(cardType == CardType.ThreeAndOne || cardType == CardType.ThreeAndTwo){
                    let tempCard = 0;
                    for(let i = 0;i<lastCardCountArray.length;i++){
                        if(lastCardCountArray[i] == 3){
                            tempCard = lastCardValueArray[i];
                        }
                    }
                    for(let i in cardsObj){
                        if(cardsObj[i].length == 3 && parseInt(i) > tempCard){
                            for(let card of cardsObj[i]){
                                card.changeSelected(true);
                            }
                            break;
                        }
                    }
                    let needGetCount = 1;
                    if(cardType == CardType.ThreeAndTwo){
                        needGetCount = 2;
                    }
                    this.setCardSelected(needGetCount,cardsObj);

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
                            ShunZiMinValue = lastCardCountArray[StartValueIndex] -ThreeCardCount+1;
                        } else{
                            ThreeCardCount-=1;
                            if(ThreeCardCount*3  == lastCards.length|| ThreeCardCount*3 + ThreeCardCount == lastCards.length|| ThreeCardCount*3 + ThreeCardCount*2== lastCards.length){
                                ShunZiCount= ThreeCardCount;
                                ShunZiMinValue = lastCardCountArray[StartValueIndex] -ThreeCardCount+1;
                            } 
                        }

                    }
                    let temp = [];
                    for(let i in cardsObj){
                        //小于顺子最后一张牌的就不用判断了
                        if(parseInt(i) > ShunZiMinValue){
                            if(cardsObj.hasOwnProperty(parseInt(i)+1) && cardsObj[i].length >=count && cardsObj[parseInt(i)+1].length >=count){
                                if(temp.length == 0){
                                    temp.push(parseInt(i));
                                    temp.push(parseInt(i)+1); 
                                }else{
                                    temp.push(parseInt(i)+1); 
                                }
                            }else{
                                if(temp.length>= ShunZiCount){
                                    for(let j = 0;j<ShunZiCount;j++){
                                        let selectCardValue = temp[j];
                                       for(let x = 0;x<cardsObj[selectCardValue].length;x++){
                                            if(x < count){
                                                cardsObj[selectCardValue][x].changeSelected(true);
                                            }
                                        }
                                    }
                                    break;
                                }
                                temp = [];
                            }

                        }
                        
                    }

                    //飞机还要获取带的牌
                    if(cardType == CardType.Plane && lastCards.length - ThreeCardCount*3 > 0){
                        let getCount = 0;
                        let needGetCount = lastCards.length - ThreeCardCount*3;
                        this.setCardSelected(needGetCount,cardsObj);
                    }
                //四带二   
                }else if(cardType == CardType.FourAndTwo){
                    let tempCard = 0;
                    for(let i = 0;i<lastCardCountArray.length;i++){
                        if(lastCardCountArray[i] == 4){
                            tempCard == lastCardValueArray[i];
                        }
                    }
                    for(let i in cardsObj){
                        if(cardsObj[i].length == 4 && parseInt(i) > tempCard){
                            for(let card of cardsObj[i]){
                                card.changeSelected(true);
                            }
                            break;
                        }
                    }
                    this.setCardSelected(2,cardsObj); 
                //炸弹  
                }else if(cardType == CardType.Bomb){
                    if(cardsObj.hasOwnProperty(14)&& cardsObj[14].length == 3){
                        for(let card of cardsObj[14]){
                            card.changeSelected(true);
                        }
                        this.setCardSelected(1,cardsObj);
                    }else{
                        for(let i in cardsObj){
                            if(cardsObj[i].length == 4 && parseInt(i) > lastCardValueArray[0]){
                                for(let card of cardsObj[i]){
                                    card.changeSelected(true);
                                    return;
                                }
                            }
                            break;
                        }

                    }
                }
                let isHasSelectCard = false;
                for(let card of this.handCard){
                    if(card.isSelected == true){
                        isHasSelectCard = true;
                    }
                }
                if(isHasSelectCard == false){
                    if(cardsObj.hasOwnProperty(14)&& cardsObj[14].length == 3){
                        for(let card of cardsObj[14]){
                            card.changeSelected(true);
                        }
                        this.setCardSelected(1,cardsObj);
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
                }

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
        if(PDK.ins.iview.GetGameRule().mustOut){
            M_PDKClass.Instance.UiManager.ShowTip("有牌必要");
            return;
        }
        if(PDK.ins.iview.GetGameRule().redPeach3MustOut || PDK.ins.iview.GetGameRule().spades3MustOut){
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
    //设置不出按钮的状态
    public setPassBtnState(state:boolean){
        this.btn_pass.interactable = state;
    }
    //设置出牌按钮的状态
    public setOutBtnState(state:boolean){
        this.btn_out.interactable = state;
    }
}
