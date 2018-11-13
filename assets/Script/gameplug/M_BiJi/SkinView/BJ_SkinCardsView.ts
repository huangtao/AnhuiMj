import AniCardType from "../AniView/BJ_AniCardType";
import { CardsCount, CardWidth, StageWidth, StageHeight, SelfCardWidth, SelfCardHeight, XiScoreType } from "../GameHelp/BJ_GameHelp";
import { SetTextureRes } from "../GameHelp/BJ_BiJiFunction";
import GameLogic from "../GameHelp/BJ_GameLogic";
import { BiJi } from "../GameHelp/BJ_IBiJiClass";
import VoicePlayer from "../GameHelp/BJ_VoicePlayer";
import M_BiJiView from "../M_BiJiView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinCardsView extends cc.Component {

    @property(cc.Prefab)
    prefab_aniCardType: cc.Prefab = null;
    @property(cc.Node)
    selectMask: cc.Node = null;
    @property([cc.Label])
    scorelist:cc.Label[] = [];
    @property([cc.Label])
    jianscorelist:cc.Label[] = [];
    @property([cc.Sprite])
    xiscoretype:cc.Sprite[] = [];
    @property([cc.Label])
    xiscoreself:cc.Label[] = [];
    @property([cc.Label])
    xiscore:cc.Label[]=[];
    @property(cc.Sprite)
    scoremask:cc.Sprite = null;
    @property(cc.Sprite)
    dropmask:cc.Sprite = null;
    @property(cc.Node)
    pokerNode:cc.Node = null;


    //扑克
    private img_card: cc.Sprite[];
    //finish
    //private img_finish: cc.Sprite;
    public get skingameView(): M_BiJiView { return M_BiJiView.Instance; }
    /**
     * 是否是自己的牌视图
     */
    private isSelf: boolean;
    /**
     * 当前牌值
     */
    private cardValue: number[];
    /**
     * 是否可以点击牌
     */
    private canClick: boolean;
    /**
     * 牌型动画
     */
    private skinAniCardType: AniCardType;
    /**
     * 等待搓牌
     */
    private waitRub: boolean;

    private startIndx:number;

    private endIndx:number;

    private cardsnum:number;

    private CanTouch:boolean[];

    onLoad() {
        this.cardValue = new Array(CardsCount);
        this.img_card = new Array(CardsCount);
        this.CanTouch = new Array(CardsCount);
        for (var i = 0; i < this.img_card.length; i++) {
            this.img_card[i] = this.pokerNode.getChildByName("img_card" + i).getComponent<cc.Sprite>(cc.Sprite);
            this.img_card[i].node.active = false;
            this.CanTouch[i] = true;
        }
      //  this.img_finish = this.node.getChildByName("img_finish").getComponent<cc.Sprite>(cc.Sprite);
        const prefab0 = cc.instantiate(this.prefab_aniCardType);
        this.node.addChild(prefab0);
        this.skinAniCardType = prefab0.getComponent<AniCardType>(AniCardType);
        this.canClick = true;
        this.waitRub = false;
        
        this.pokerNode.on(cc.Node.EventType.TOUCH_START,this.touchBegin,this);
        this.pokerNode.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this);
        this.pokerNode.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
    //    for (let i = 0; i < this.img_card.length; i++) {
    //        this.img_card[i].node.on(cc.Node.EventType.TOUCH_START, () => {this.OnButtonCard(i)}, this);
            
    //    }

}
start(){

}
    private touchBegin(e:cc.Event.EventTouch){
        cc.log("开始触摸");
        cc.log("x坐标"+e.getLocationX()+"y坐标"+e.getLocationY());
        // if(e.getLocationY()>255||e.getLocationY()<116){
        //     cc.log("Y坐标超出范围");
        //     return;
        // }
        if(e.getLocationX()<257||e.getLocationX()>(this.GetCardNum()-1)*80+257+133){
            cc.log("X坐标超出范围");
            return;
        }
        if(e.getLocationY()<94||e.getLocationY()>269){
            cc.log("Y坐标超出范围");
            return;
        }
        let start = this.GetCardIndex(e.getLocationX(),e.getLocationY());
        if(this.CanTouch[start]){
         this.OnButtonCard(start);
        this.CanTouch[start] = false;
        }
     
        
            
        
    //   if(e.getLocationX()-420
    }
    private touchMove(e:cc.Event.EventTouch){
        cc.log("开始触摸");
        // if(e.getLocationY()>255||e.getLocationY()<116){
        //     cc.log("Y坐标超出范围");
        //     return;
        // }
        if(e.getLocationX()<420||e.getLocationX()>1004){
            cc.log("X坐标超出范围");
        }
        let end = this.GetCardIndex(e.getLocationX(),e.getLocationY());
        if(this.CanTouch[end]){
            this.OnButtonCard(end);
            this.CanTouch[end] = false;
        }
        
        
    }
    private touchEnd(e:cc.Event.EventTouch){
        cc.log("完成触摸");
        // if(e.getLocationY()>255||e.getLocationY()<116){
        //     cc.log("Y坐标超出范围");
        //     return;
        // }
        for(var i = 0;i<9;i++){
            this.CanTouch[i] = true;
        }
          if(e.getLocationX()<257||e.getLocationX()>(this.GetCardNum()-1)*80+257+133){
            cc.log("X坐标超出范围");
            return;
        }
        if(e.getLocationY()<94||e.getLocationY()>269){
            cc.log("Y坐标超出范围");
            return;
        }

    }
    private GetCardIndex(x:number,y:number):number{
        var idx = 0;
        if(x<(this.GetCardNum()-1)*80+257){
            idx = Math.floor((x-257)/80);
        }else{
            idx = this.GetCardNum()-1;
        }
        

        return idx;

    }

    public Init() {
        this.RemoveCardsTween();
        this.skinAniCardType.Init();
        this.HideScoreList();
        this.canClick = false;
        this.waitRub = false;
        this.cardsnum = 9;
    }
    public ShowSelectMask(){
        this.selectMask.active = true;
    }
    public SetChair(chair: number) {
        this.isSelf = chair == 0;
        if (chair == 0) {
            this.node.x = (232 + this.node.width) / 2 - 100;
            this.node.y = (this.node.height - 116) / 2+40;      
        }
        else if (chair == 1) {
            this.node.x = -((this.node.width + 116) / 2 + (210 - this.node.width))-110;
            this.node.y = (this.node.height - 160) / 2+10;
           // this.node.rotation = -90;
        }else if(chair == 2){
            this.node.x = -((this.node.width + 116) / 2 + (210 - this.node.width))-110;
            this.node.y = (this.node.height - 160) / 2-4;

            
        }
        else if (chair == 3) {
            // this.node.x = 20;
            // this.node.y = -((this.node.height + 116) / 2 + (110 - this.node.height));
            this.node.x = (this.node.width + 116) / 2-20;
            this.node.y = (this.node.height - 160) / 2-4;

        }
        else if(chair == 4){
            this.node.x = (this.node.width + 116) / 2-24;
            this.node.y = (this.node.height - 160) / 2+10;
            
          //  this.node.rotation = 90;
        }else if(chair ==5){
            this.node.x = (this.node.width + 116) / 2 + 10;
            this.node.y = (this.node.height - 160) / 2+20;
        }
        if (this.isSelf) {
            this.skinAniCardType.node.y = 65;//85;
        }
        else {
            this.skinAniCardType.node.y = -35;
        }
        this.SetScoreMaskPos(chair);
    }
    public Reset(chair:number) {
        if (this.isSelf) {
            for (var i = 0; i < this.img_card.length; i++) {
                this.img_card[i].node.active = false;
                this.img_card[i].node.width = SelfCardWidth;
                this.img_card[i].node.height = SelfCardHeight;
                this.img_card[i].node.y = 94;
                this.img_card[i].node.x = -150 + 80 * i;
                this.cardValue[i] = 0;
                //SetTextureRes(GameLogic.GetCardUrl(0), this.img_card[i]);
                this.img_card[i].node.scale =1;
                this.img_card[i].spriteFrame = BiJi.ins.iview.GetCardsRes(0);
            }
        }
        else {
            for (var i = 0; i < this.img_card.length; i++) {
                this.img_card[i].node.active = false;
                this.img_card[i].node.y = 0;
                this.img_card[i].node.x = -50 + 30 * i;
                this.cardValue[i] = 0;
                //SetTextureRes(GameLogic.GetCardUrl(0), this.img_card[i]);
                this.img_card[i].spriteFrame = BiJi.ins.iview.GetCardsRes(0);
            }
        }
       // this.img_finish.node.active = false;
        this.skinAniCardType.node.active = false;
        this.scoremask.node.active = false;
        this.dropmask.node.active = false;
        this.SetScoreMaskPos(chair);
    }
    public Destroy() {
        this.RemoveCardsTween();
        this.skinAniCardType.Destroy();
    }

    //==================================== 设置 开始 =======================================
    /**
     * 设置牌
     */
    public SetCards(value: number[]) {
        for (var i = 0; i < this.img_card.length; i++) {
            if (i < value.length) {
                this.SetCardValue(i, value[i]);
                
            }
            else {
                this.img_card[i].node.active = false;
            }
        }
        this.DownAllCard();
    }
    public GetCardNum(){
        let cardNum = 0;
        for(var i = 0;i<this.img_card.length;i++){
            if(this.img_card[i].node.active){
                cardNum++;
            }
        }
        return cardNum;
    }
    /**
     * 设置finish
     */
    public SetFinish(value: boolean) {
      //  this.img_finish.node.active = value;
    }
    /**
     * 设置结果亮牌是的牌显示
     */
    public SetResultCards(cards: number[], cardType: number, gender: number = 0, ani: boolean = true) {
        this.SetCardType(cardType, gender, ani);
    }
    /**
     * 显示牌型
     */
    private SetCardType(value: number, gender: number = 0, ani: boolean = true) {
        //VoicePlayer.PlayCardType(value, BiJi.ins.iclass.VoiceType(), gender);
        if (ani)
            this.skinAniCardType.Show(value);
        else
            this.skinAniCardType.ShowUnAni(value);
    }
    /**
     * 根据牌索引设置指定位置牌
     */
    public SetCardValue(index: number, value: number) {
        cc.log("-----------搓牌--------结束------------");
        this.cardValue[index] = value;
        this.img_card[index].node.active = true;
        //SetTextureRes(GameLogic.GetCardUrl(value), this.img_card[index]);
        this.img_card[index].spriteFrame = BiJi.ins.iview.GetCardsRes(value);
    }
    /**
     * 设置搓牌值
     */
    public SetRubCardValue(index: number, value: number) {
        this.cardValue[index] = value;
        this.img_card[index].node.active = true;
        this.img_card[index].spriteFrame = BiJi.ins.iview.GetCardsRes(value);
        this.waitRub = true;
    }
    /**
     * 设置是否可以点击牌
     */
    public SetCanClick(value: boolean) {
        this.canClick = value;
    }
    /**
     * 设置等待搓牌
     */
    public SetWaitRub(value: boolean) {
        this.waitRub = value;
    }
    /**
     *  选牌完成时的牌显示
     */
    public OnSelectCards() {
        this.RemoveCardsTween();
  //      this.SetOnSelectCardsPos();
        for (var i = 0; i < this.img_card.length; i++) {
            this.img_card[i].spriteFrame = BiJi.ins.iview.GetCardsRes(0);
        }
    }
    /**
     * 自己选牌完成
     */
    public OnSelfSelectCards(cards: number[], cardType: number, gender: number) {
        this.RemoveCardsTween();
//        this.SetOnSelectCardsPos();
        if (cardType > 0) {
            for (var i = 0; i < cards.length; i++) {
                this.SetCardValue(i, cards[i]);
                if (i < 3)
                    this.img_card[i].node.x = -60 + i * 25;
                else
                    this.img_card[i].node.x = 60 - (CardsCount - i - 1) * 25;
            }
        }
        else {
            this.SetCards(cards);
        }
        this.SetCardType(cardType, gender, false);
    }
    public SetQiPaiPos(chair:number){
        this.dropmask.node.active = true;
        switch(chair){
            case 0:for (var i = 0; i < this.img_card.length; i++) {    
                this.img_card[i].node.scale = 0.6;       
                this.img_card[i].node.y = 0;
                this.img_card[i].node.x = 50 + 30 * i;  
             } 
             this.dropmask.node.x = 168;
             break;
                case 1: 
                this.dropmask.node.x = 70;
                this.dropmask.node.y = 34;
                
                break;
                case 2:
                this.dropmask.node.x = 70;
                this.dropmask.node.y = 34;
                break;
                case 3:
                this.dropmask.node.x = 70;
                this.dropmask.node.y = 34;
                break;
                case 4:
                this.dropmask.node.x = 70;
                this.dropmask.node.y = 34;
                break;
                default:break;
            }
        

    }
    /**
     * 设置选牌后的牌位置
     */
    public SetOnSelectCardsPos(chair:number) {
        // if (this.isSelf) {
        //     this.canClick = false;
        //     this.selectMask.active = false;
        //     for (var i = 0; i < this.img_card.length; i++) {           
        //         this.img_card[i].node.scale =0.7;
        //         this.img_card[i].node.y = -Math.floor(i/3)*60+60;//120;
        //         this.img_card[i].node.x = 40*Math.floor(i%3)+70;          
        //     }
        // }
        // else {
        //     for (var i = 0; i < this.img_card.length; i++) {               
        //         this.img_card[i].node.x = 25*Math.floor(i%3)+40;
        //         this.img_card[i].node.y = this.img_card[i].node.y-Math.floor(i/3)*50+60;
        //     }
        // }

        switch(chair){
            case 0: this.canClick = false;
            this.selectMask.active = false;
            for (var i = 0; i < this.img_card.length; i++) {           
                this.img_card[i].node.scale =0.6;
                this.img_card[i].node.y = -Math.floor(i/3)*55+104;//120;
                this.img_card[i].node.x = 38*Math.floor(i%3)+128;          
            }
            break;
            case 3:for (var i = 0; i < this.img_card.length; i++) {     
                this.img_card[i].node.scale =1;          
                this.img_card[i].node.x = 38*Math.floor(i%3)-40;
                this.img_card[i].node.y = this.img_card[i].node.y-Math.floor(i/3)*55+24;
                this.img_card[i].node.scale =1;
            }
            break;
            case 4:for (var i = 0; i < this.img_card.length; i++) { 
                this.img_card[i].node.scale =1;                      
                this.img_card[i].node.x = 38*Math.floor(i%3)-30;
                this.img_card[i].node.y = this.img_card[i].node.y-Math.floor(i/3)*55-10;
                this.img_card[i].node.scale =1;
            }
            break;
            case 2:for (var i = 0; i < this.img_card.length; i++) {        
                this.img_card[i].node.scale =1;               
                this.img_card[i].node.x = 38*Math.floor(i%3)+104;
                this.img_card[i].node.y = this.img_card[i].node.y-Math.floor(i/3)*55+24;
                this.img_card[i].node.scale =1;
            }
            break;
            case 1:for (var i = 0; i < this.img_card.length; i++) {  
                this.img_card[i].node.scale =1;                     
                this.img_card[i].node.x = 38*Math.floor(i%3)+100;
                this.img_card[i].node.y = this.img_card[i].node.y-Math.floor(i/3)*55-10;
                this.img_card[i].node.scale =1;
            }
            break;
        }
    }
    /**
     * 设置玩家最终得分
     * @param index 头道、中道、尾道、总分索引
     * @param scorelist 分数
     * @param chair 椅子号
     * @param xiscoretype 喜分数组 
     */
    public SetScoreList(index: number, scorelist: number = 0, chair: number ,xiscoretype:number[]=null) {
        this.SetScorePos(chair);
        if(scorelist<0&&index!=4){          
            this.jianscorelist[index].string =""; 
             switch(index){
            case 0:                
                   this.jianscorelist[0].string += scorelist.toString();
                   this.jianscorelist[0].node.active = true;
                   break;
            case 1:
                   this.jianscorelist[1].string += scorelist.toString();
                   this.jianscorelist[1].node.active = true;
                   break;
            case 2:
                   this.jianscorelist[2].string += scorelist.toString();
                   this.jianscorelist[2].node.active = true;
                   break;
            case 3:
                    this.scoremask.node.active = true;
                   this.jianscorelist[3].string += scorelist.toString();
                   this.jianscorelist[3].node.active = true;
                   break;
            case 4:
                //    this.jianscorelist[4].string = "喜分+"+scorelist.toString();
                //    this.jianscorelist[4].node.active = true;
                   break;
        }
    }else if(scorelist>=0&&index!=4){
            if(scorelist!=0){
                this.scorelist[index].string = "+";
            }else{
                this.scorelist[index].string = "";
            }
            
             switch(index){
            case 0:
                   this.scorelist[0].string += scorelist.toString();
                   this.scorelist[0].node.active = true;
                   break;
            case 1:
                   this.scorelist[1].string += scorelist.toString();
                   this.scorelist[1].node.active = true;
                   break;
            case 2:
                   this.scorelist[2].string += scorelist.toString();
                   this.scorelist[2].node.active = true;
                   break;
            case 3:
                     this.scoremask.node.active = true;
                   this.scorelist[3].string += scorelist.toString();
                   this.scorelist[3].node.active = true;
                   break;
            case 4:
                //    this.scorelist[4].string = "喜分+"+scorelist.toString();
                //    this.scorelist[4].node.active = true;
                   break;
        }
        }
       if((index==4)&&(xiscoretype.length>0)){
            var name = [];
            for(var i =0;i<xiscoretype.length;i++){
                name.push(this.GetCardTypeToString(xiscoretype[i]));                
            }
            for(i = 0;i<name.length;i++){
                cc.log("-----特殊牌型"+name[i]+"-----");
                this.xiscoretype[i].node.active = true;
                this.xiscoretype[i].spriteFrame = BiJi.ins.iview.GetXiScoreTypeRes(name[i]);
                this.xiscoreself[i].string=BiJi.ins.iview.GetPlayerXiScore()*this.GetCardXiScore(xiscoretype[i])+"";
            }
       }
    }
    public GetCardTypeToString(value:number):string{
        switch(value){
            case XiScoreType.LianShun : return "lianshun";
            case XiScoreType.LianShunQing: return "lianshunqing";
            case XiScoreType.QuanHei: return "quanhei";
            case XiScoreType.QuanHong: return "quanhong";
            case XiScoreType.QuanSanTiao: return "quansantiao";
            case XiScoreType.SanQing: return "sanqing";
            case XiScoreType.SanShunQing: return "sanshunqing";
            case XiScoreType.SanShunZi: return "sanshunzi";
            case XiScoreType.ShuangSanTiao: return "shuangsantiao";
            case XiScoreType.ShuangShunQing: return "shuangshunqing";
            case XiScoreType.ShuangZhaDan: return "shuangzhadan";
            case XiScoreType.TongGuan: return "tongguan";
            case XiScoreType.ZhaDan : return "zhadan";
            default :cc.log("--牌型获取错误--"); return "";
        }
    }
    public GetCardXiScore(value:number):number{
        switch(value){
            case XiScoreType.LianShun : return 2;
            case XiScoreType.LianShunQing: return 3;
            case XiScoreType.QuanHei: return 2;
            case XiScoreType.QuanHong: return 2;
            case XiScoreType.QuanSanTiao: return 3;
            case XiScoreType.SanQing: return 1;
            case XiScoreType.SanShunQing: return 2;
            case XiScoreType.SanShunZi: return 1;
            case XiScoreType.ShuangSanTiao: return 1;
            case XiScoreType.ShuangShunQing: return 1;
            case XiScoreType.ShuangZhaDan: return 3;
            case XiScoreType.TongGuan: return 1;
            case XiScoreType.ZhaDan : return 1;
            default :cc.log("--牌型获取错误--"); return 0;
        }

    }
    /**
     * 根据索引弹起牌
     */
    public UpCardsByIndex(value: number[]) {
        console.log("UpCardsByIndex:" + value);
        console.log(this.img_card);
        for (var i = 0; i < this.img_card.length; i++) {
            this.img_card[i].node.y = 35;
        }
        for (var i = 0; i < value.length; i++) {
            this.img_card[value[i]].node.y = 65;
        }
        console.log(this.img_card);
        VoicePlayer.PlaySysSound("bull_select_poker");
        this.CountCard();
    }
    //==================================== 设置 结束 =======================================

    //==================================== 动画 开始 =======================================
    /**
     * 翻牌动画
     */
    public AniCardsFlip(value: number[],type:number) {
        for (var i = 0; i < value.length; i++) {
            this.AniCardValue(i+type, value[i]);
        }
    }
    /**
     * 翻牌动画
     */
    private AniCardValue(index: number, value: number) {
        this.cardValue[index] = value;
        this.img_card[index].spriteFrame = BiJi.ins.iview.GetCardsRes(0);
      //  this.img_card[index].node.scaleX = 1;
        var callAction = cc.callFunc(function () {
            this.img_card[index].spriteFrame = BiJi.ins.iview.GetCardsRes(value);
            this.img_card[index].node.runAction(cc.scaleTo(0.1 * BiJi.ins.iclass.GetSpeed(), 1, 1));
        }, this);
        var action = cc.sequence(cc.scaleTo(0.1 * BiJi.ins.iclass.GetSpeed(), 0, 1), callAction);
        this.img_card[index].node.runAction(action);
    }
    /**
     * 关闭动画
     */
    public StopAni() {
        for (var i = 0; i < this.img_card.length; i++) {
            this.img_card[i].node.stopAllActions();
            if(!this.isSelf){
                this.img_card[i].node.scale = 1;
            }
         //   this.img_card[i].node.scale = 1;
        }
    }
    //==================================== 动画 结束 =======================================

    //==================================== 扑克相关 开始 =======================================
    /**
     * 点击牌事件
     */
    private OnButtonCard(value: number) {
        if (!this.canClick || BiJi.ins.iclass.IsVideo()) return;
        cc.log("-----------我点击了牌----------");
        if (this.waitRub) {
            cc.log("--------现在是等待搓牌-------")
            if (value == 2)
            return;
        }
      
        if (this.IsCardUp(value)) {
            this.DownCard(value);
        }
        else {
            if (this.GetUpCardCount() < 9) {
                this.UpCard(value);
            }
        }

        VoicePlayer.PlaySysSound("bull_select_poker");
    }
    public DownAllCard(){
        for(var i =0 ;i<9;i++){
            if(this.img_card[i].node){
                this.img_card[i].node.y = 35;
            }
        }
    }
    public UpCards(value:any,click:number){
         if (!this.canClick || BiJi.ins.iclass.IsVideo()) return;
         this.DownAllCard();
         var index = 0;
         for(var i =0;i<3;i++){
            cc.log("----准备弹起牌"+value[i+3*click]);
            index = this.cardValue.indexOf(value[i+3*click]);
            this.UpCard(index);
         }
    }
    public HideScoreList(){
        for(var i= 0 ;i<this.scorelist.length;i++){
            if(this.scorelist[i].node.active){
                this.scorelist[i].node.active = false;
            }
            if(this.jianscorelist[i].node.active){
                this.jianscorelist[i].node.active = false;
            }
            if((i<4)&&(this.xiscoretype[i].node.active)){
                this.xiscoretype[i].node.active = false;
            }
        }
    }
    /**
     * 计算牌值提示
     */
    private CountCard() {
        console.log("CountCard:");
        for (var i = 0; i < this.img_card.length; i++) {
            console.log(this.img_card[i].node.position);
        }
        var list = this.GetUpCardList();
        console.log("弹起牌的数量"+list);
        BiJi.ins.iview.OnButtonCard(this.GetUpCardList());
    }
    /**
     * 获取选择的牌数
     */
    private GetUpCardCount() {
        var count = 0;
        for (var i = 0; i < this.img_card.length; i++) {
            if (this.IsCardUp(i))
                count++;
        }
        return count;
    }
    /**
     * 获取选择的牌
     */
    private GetUpCardList() {
        var list: number[] = new Array(0);
        for (var i = 0; i < this.img_card.length; i++) {
            if (this.IsCardUp(i))
                list.push(this.cardValue[i]);
        }
        return list;
    }
    /**
     * 该张牌是否弹起
     */
    private IsCardUp(value: number) {
        if (this.img_card[value].node.y > 35)
            return true;
        else
            return false;
    }
    /**
     * 弹起牌
     */
    private UpCard(value: number) {
        this.img_card[value].node.stopAllActions();
        var tarPos = cc.p(this.img_card[value].node.x, 65);
        var callAction = cc.callFunc(function () {
            this.img_card[value].node.y = 65;
            this.CountCard();
        }, this);
        var action = cc.sequence(cc.moveTo(0.05 * BiJi.ins.iclass.GetSpeed(), tarPos), callAction);
        this.img_card[value].node.runAction(action);
    }
    /**
     * 放下牌
     */
    private DownCard(value: number) {
        this.img_card[value].node.stopAllActions();
        var tarPos = cc.p(this.img_card[value].node.x, 35);
        var callAction = cc.callFunc(function () {
            this.img_card[value].node.y = 35;
            this.CountCard();
        }, this);
        var action = cc.sequence(cc.moveTo(0.05 * BiJi.ins.iclass.GetSpeed(), tarPos), callAction);
        this.img_card[value].node.runAction(action);
    }
    /**
     * 移除所有牌动画
     */
    public RemoveCardsTween() {
        this.StopAni();
    }

    //==================================== 扑克相关 结束 =======================================

    //==================================== 辅助 开始 =======================================
    /**
     * 获取单张牌的位置
     */
    public GetCardPos(index: number) {
        var pos = this.img_card[index].node.position;
        pos.x += this.node.x;
        pos.y += this.node.y;
        return pos;
    }
    /**
     * 获取牌的缩放值
     */
    public GetCardsScale() {
        if(this.isSelf){
            return 1.5;
        }
        return 1.2;
       // return this.img_card[0].node.width / CardWidth;
    }
    /**
     * 获取弹起牌的索引
     */
    public GetUpIndexList() {
        var list: number[] = new Array(0);
        for (var i = 0; i < this.img_card.length; i++) {
            if (this.IsCardUp(i))
                list.push(i);
        }
        return list;
    }
    private SetScoreMaskPos(chair:number){
        switch(chair){
            case 0: 
            this.scoremask.node.x = 164;
            this.scoremask.node.y = -35;break;  
            case 1:
            this.scoremask.node.x = 140;
            this.scoremask.node.y = -120;break;
            case 2:
            this.scoremask.node.x = 140;
            this.scoremask.node.y = -85;break;
            case 3:
            this.scoremask.node.x = 6;
            this.scoremask.node.y = -85;break;
            case 4:
            this.scoremask.node.x = 6;
            this.scoremask.node.y = -120;break;
        }
    }
    public SetScoreMaskQiPaiPos(chair:number){
        switch(chair){
            case 0: 
            this.scoremask.node.x = 164;
            this.scoremask.node.y = -35;break;  
            case 1:
            this.scoremask.node.x = 80;
            this.scoremask.node.y = 10;break;
            case 2:
            this.scoremask.node.x = 80;
            this.scoremask.node.y = 10;break;
            case 3:
            this.scoremask.node.x = 66;
            this.scoremask.node.y = 10;break;
            case 4:
            this.scoremask.node.x = 66;
            this.scoremask.node.y = 10;break;
        }
    }
    private SetScorePos(chair:number){
                switch (chair) {
            case 0: this.scorelist[2].node.x = 276;
                    this.scorelist[1].node.x = 276;
                    this.scorelist[0].node.x = 276;
                    this.jianscorelist[2].node.x = 276;
                    this.jianscorelist[1].node.x = 276;
                    this.jianscorelist[0].node.x = 276;
                    this.xiscoretype[0].node.x = -20;
                    this.xiscoretype[1].node.x = -20;
                    this.xiscoretype[2].node.x = -20;
                    this.xiscoretype[3].node.x = -20;
                    this.xiscoreself[0].node.x = 70;
                    this.xiscoreself[1].node.x = 70;
                    this.xiscoreself[2].node.x = 70;
                    this.xiscoreself[3].node.x = 70;
                    this.scorelist[0].node.y = 140;
                    this.scorelist[1].node.y = 85;
                    this.scorelist[2].node.y = 30;
                    this.jianscorelist[0].node.y = 140;
                    this.jianscorelist[1].node.y = 85;
                    this.jianscorelist[2].node.y = 30; 
                    this.xiscoretype[0].node.y = 140;
                    this.xiscoretype[1].node.y = 85;
                    this.xiscoretype[2].node.y = 30;
                    this.xiscoretype[3].node.y = -25;
   
                    break;
            case 1: this.scorelist[2].node.x = 5;
                    this.scorelist[1].node.x = 5;
                    this.scorelist[0].node.x = 5;
                    this.jianscorelist[2].node.x = 5;
                    this.jianscorelist[1].node.x = 5;
                    this.jianscorelist[0].node.x = 5;
                    this.xiscoretype[0].node.x = -25;
                    this.xiscoretype[1].node.x = -25;
                    this.xiscoretype[2].node.x = -25;
                    this.xiscoretype[3].node.x = -25;
                    this.scorelist[0].node.y = 55;
                    this.scorelist[1].node.y = 0;
                    this.scorelist[2].node.y = -55;
                    this.jianscorelist[0].node.y = 55;
                    this.jianscorelist[1].node.y = 0;
                    this.jianscorelist[2].node.y = -55;
                    this.xiscoretype[0].node.y = -110; 
                    this.xiscoretype[1].node.y = -160;
                    this.xiscoretype[2].node.y = -210;
                    this.xiscoretype[3].node.y = -260;  



                    this.xiscoreself[0].node.x = 80;
                    this.xiscoreself[1].node.x = 80;
                    this.xiscoreself[2].node.x = 80;
                    this.xiscoreself[3].node.x = 80;


                    break;
            case 2: this.scorelist[2].node.x = 15;
                    this.scorelist[1].node.x = 15;
                    this.scorelist[0].node.x = 15;
                    this.jianscorelist[2].node.x = 15;
                    this.jianscorelist[1].node.x = 15;
                    this.jianscorelist[0].node.x = 15;
                    this.xiscoretype[0].node.x = -5;
                    this.xiscoretype[1].node.x = -5;
                    this.xiscoretype[2].node.x = -5;
                    this.xiscoretype[3].node.x = -5;
                    this.scorelist[0].node.y = 100;
                    this.scorelist[1].node.y = 45;
                    this.scorelist[2].node.y = -10;
                    this.jianscorelist[0].node.y = 100;
                    this.jianscorelist[1].node.y = 45;
                    this.jianscorelist[2].node.y = -10;
                    this.xiscoretype[0].node.y = -65;
                    this.xiscoretype[1].node.y = -115;
                    this.xiscoretype[2].node.y = -165;
                    this.xiscoretype[3].node.y = -215;   

                    this.xiscoreself[0].node.x = 70;
                    this.xiscoreself[1].node.x = 70;
                    this.xiscoreself[2].node.x = 70;
                    this.xiscoreself[3].node.x = 70;
                    break;
            case 3: this.scorelist[2].node.x = 110;
                    this.scorelist[1].node.x = 110;
                    this.scorelist[0].node.x = 110;
                    this.jianscorelist[2].node.x = 110;
                    this.jianscorelist[1].node.x = 110;
                    this.jianscorelist[0].node.x = 110;
                    this.xiscoretype[0].node.x = 110;
                    this.xiscoretype[1].node.x = 110;
                    this.xiscoretype[2].node.x = 110;
                    this.xiscoretype[3].node.x = 110;
                    this.scorelist[0].node.y = 100;
                    this.scorelist[1].node.y = 45;
                    this.scorelist[2].node.y = -10;
                    this.jianscorelist[0].node.y = 100;
                    this.jianscorelist[1].node.y = 45;
                    this.jianscorelist[2].node.y = -10;
                    this.xiscoretype[0].node.y = -65;
                    this.xiscoretype[1].node.y = -115;
                    this.xiscoretype[2].node.y = -165;
                    this.xiscoretype[3].node.y = -215;     

                    this.xiscoreself[0].node.x = 70;
                    this.xiscoreself[1].node.x = 70;
                    this.xiscoreself[2].node.x =70;
                    this.xiscoreself[3].node.x = 70;                
                    break;
            case 4: this.scorelist[2].node.x = 120;
                    this.scorelist[1].node.x = 120;
                    this.scorelist[0].node.x = 120;
                    this.jianscorelist[2].node.x = 120;
                    this.jianscorelist[1].node.x = 120;
                    this.jianscorelist[0].node.x = 120;
                    this.xiscoretype[0].node.x = 140;
                    this.xiscoretype[1].node.x = 140;
                    this.xiscoretype[2].node.x = 140;
                    this.xiscoretype[3].node.x = 140;
                    this.scorelist[0].node.y=55;
                    this.scorelist[1].node.y=0;
                    this.scorelist[2].node.y=-55;
                    this.jianscorelist[0].node.y=55;
                    this.jianscorelist[1].node.y=0;
                    this.jianscorelist[2].node.y=-55;
                    this.xiscoretype[0].node.y=-110;
                    this.xiscoretype[1].node.y=-160;
                    this.xiscoretype[2].node.y=-210;
                    this.xiscoretype[3].node.y=-260; 

                    this.xiscoreself[0].node.x = 70;
                    this.xiscoreself[1].node.x = 70;
                    this.xiscoreself[2].node.x = 70;
                    this.xiscoreself[3].node.x = 70;          
                    break;
        }
    }
    //==================================== 辅助 结束 =======================================

    //==================================== 计时器 开始 =======================================
    public TimePause() {
        for (var i = 0; i < this.img_card.length; i++) {
            this.img_card[i].node.pauseAllActions();
        }
        this.skinAniCardType.TimePause();
    }
    public TimeResume() {
        for (var i = 0; i < this.img_card.length; i++) {
            this.img_card[i].node.resumeAllActions();
        }
        this.skinAniCardType.TimeResume();
    }
    //==================================== 计时器 结束 =======================================
}
