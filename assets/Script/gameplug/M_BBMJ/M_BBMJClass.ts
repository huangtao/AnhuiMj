const {ccclass, property} = cc._decorator;
import { GameBaseClass } from "../base/GameBaseClass";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { BBMJMahjongDef, IBBMJClass, BBMJ, BBMJTableConfig, BBMJTimer, enGamePhase, BBMJOutCardPlayer, BBMJRecordCard, BBMJTimerDef, TingCardTip, BBMJSoundDef, enHuCardType, enBBMJAniType } from "./ConstDef/BBMJMahjongDef";
import { GameIF } from "../../CommonSrc/GameIF";
import { ShareParam } from "../../CustomType/ShareParam";
import { UIName } from "../../Global/UIName";
import Global from "../../Global/Global";
import M_BBMJView from "./M_BBMJView";
import BBMJ_GameInfo from"./SkinView/BBMJ_GameInfo"
//import { BBMJMahjongAlgorithm} from "./BBMJMahjongAlgorithm/BBMJMahjongAlgorithm";
import { AudioType, VoiceType } from "../../CustomType/Enum";
import { M_BBMJ_GameMessage } from "../../CommonSrc/M_BBMJ_GameMessage";
import { GameRuleData, M_BBMJ_GameData } from "./M_BBMJSetting";
import BBMJEvent from "./BBMJEvent";
import M_BBMJVoice from "./M_BBMJVoice";
import BBMJ_SingleFixedBase from "./PlayerCard/single/BBMJ_SingleFixedBase";
import { enFixedCardType } from "../M_BBMJ/ConstDef/BBMJMahjongDef";
import { SetTextureRes } from "../MJCommon/MJ_Function";
import BBMJ_MsgBox from "./SkinView/BBMJ_MsgBox";
import { TranslateMoneyTypeName, ReportError } from "../../Tools/Function";
import BBMJ_CardView from "./SkinView/BBMJ_CardView";
import BBMJ_BanlanceActive from "./PlayerCard/banlanceShow/BBMJ_BanlanceActive";
import BBMJ_BanlanceFixed from "./PlayerCard/banlanceShow/BBMJ_BanlanceFixed";
import BBMJ_TingTip from "./SkinView/BBMJ_TingTip";

import BBMJ_BanlanceFlower from "./PlayerCard/banlanceShow/BBMJ_BanlanceFlower";
import { BBMJMahjongAlgorithm1 } from "./BBMJMahjongAlgorithm/BBMJMahjongAlgorithm1";
import { BBMJMahjongAlgorithm } from "./BBMJMahjongAlgorithm/BBMJMahjongAlgorithm";




@ccclass
export default class M_BBMJClass extends GameBaseClass implements IBBMJClass {

     public arr1:Boolean[];
    private static _ins: M_BBMJClass;
    public static get ins(): M_BBMJClass { return this._ins; }

     @property(cc.SpriteAtlas)
    private paihua:cc.SpriteAtlas=null;

    @property(cc.SpriteAtlas)
    private paibei:cc.SpriteAtlas=null;
        @property(cc.SpriteAtlas)
    private paibei3d:cc.SpriteAtlas=null;
    
    @property(M_BBMJView)
    //GameView:M_BBMJView;
    private gameView:M_BBMJView=null;
       
        //
        //游戏信息
        //
        private _shareContext:string;
        /**
         * 设置分享标题
         * */
        public set ShareTitle(value:string){this._shareContext=value;}
        public get ShareTitle():string{
            return this._shareContext;
        }
        public _canVote=false;
        //牌桌配置
        private _tableConfig : BBMJTableConfig;
        /**
         * 牌桌配置
         * */
        public get TableConfig():BBMJTableConfig{
            return this._tableConfig;
        }
        
        private _timer : BBMJTimer;
        
        //本局庄家椅子号
        private _bankerChair : number;
        //本局庄家连庄数
        public _lianBanker : number;
    
        public two_dimensional :boolean = false;

        //续局次数(1表示0次)
        public _addNum:number = 1;

        public  canSwitch3D:boolean = true;

    /**
     * 是否2D
    */
    public is2D():boolean{
        return this.two_dimensional;
    }

    public canvaSwitchClickEvent(canvas: string):void {
        if(this.canSwitch3D){
            this.canSwitch3D = false;
            this.scheduleOnce(function () {
            this.canSwitch3D = true;
              }.bind(this), 2)

        this.two_dimensional = canvas== "2D"?true:false;
        this.OnNetResponding();
        }else{
           return;
        }
      
    }

    public CheckCanNext(){
        return true;
    }
        /**
         * 庄家椅子号
         * */
        public get BankerChair():number{return this._bankerChair;};
        
        //当前游戏阶段
        private _gamePhase:enGamePhase;
        /**
         * 游戏阶段
         * */
        public get GamePhase():enGamePhase{return this._gamePhase};
        
        //当前活动玩家
        private _activePlayer:number;
        //打牌玩家
        private _outCardPlayer : BBMJOutCardPlayer;
        //骰子1点数
        private _sz1:number;
        /**
         * 骰子1
         * */
        public get SZ1():number{
            return this._sz1;
        }
        
        public oncebuhua:boolean=false;
        public realoncebuhua:boolean = true;
        //骰子2点数
        private _sz2:number;
        /**
         * 骰子2
         * */
        public get SZ2():number{
            return this._sz2;
        }
        
        //本局局号
        private _gameid:string;
        /**
         * 游戏id
         * */
        public get GameID():string{
            return this._gameid;
        }

        private _flowerAry:Array<number>;
    /**
     * 花牌列表
     */
    public get FlowerAry():Array<number>{
        return this._flowerAry;
    }

    private _hunPiCard:number;
    /**
     * 翻开的混皮牌
     */
    public get HunPiHunPiCard():number{
        return this._hunPiCard;
    }
        //
        //个人数据
        //
       public fankai:boolean = true;
        //手牌数据
        private _handCard:Array<number>;
        //本次可以抢的牌
        private _gangCard:Array<number>;
        //我的投票权限
        private _voteRight: number;
        //是否可以抢杠
        private _ifCanQiangGang:boolean;
        
        //当前时间
        private _curTime:number;
        //是否已经胡牌
        private _alreadyHu:boolean;
        /**
         * 是否已经胡牌
         * */
        public get AlreadyHu(){return this._alreadyHu;};
        //是否听牌
        private _isTing;
        /**
         * 是否听牌
         * */
        public get isTing():boolean{return this._isTing;};
        
        private _recordCard:BBMJRecordCard;
        /**
         * 宿州麻将计牌器
         * */
        public get RecordCard():BBMJRecordCard{
            return this._recordCard;
        }
        private _haveGameScene:boolean;
        //解散房间成功标记
        private _isIgnoreForceLeft:boolean = false;
        public set ignoreForceLeft(value:boolean){
            this._isIgnoreForceLeft=value;
        }

        /**
         * 自己的椅子号
         * */
        public get SelfChair():number{
            return this.ChairID;
        }
        /**
         * 自己是否是房主
         * */
        public get SelfIsTableOwener():boolean{
            return this.ChairID == this._tableConfig.tableCreatorChair;
        }
        /**
         * 手牌数据
         * */
        public get HandCardData():Array<number>{
            return this._handCard;
        }
        
        /**
         * 检查余额是否可以继续游戏
         * */
        public get checkMoneyCanGame():boolean{
            //如果不够,开始求助
             if(this.TableConfig.IsTableCreatorPay == 2){//房主支付
                if(this.SelfIsTableOwener){//如果是房主
                    if(this.SelfRoomMoney < this.gameMoneyNum*this._addNum) {
                        return false;
                    }
                }
            }else if(this.TableConfig.IsTableCreatorPay == 1){//AA支付
                if(this.SelfRoomMoney < this.gameMoneyNum*this._addNum) {
                    return false;
                }
            }
            return true;
            // if(this.SelfRoomMoney < this.gameMoneyNum) {
            //     return false;
            // }
            // return true;
        }

         /**
         * 游戏所需钱数
         * */
        public get gameMoneyNum():number{
            var checkMoney: number = 0;
            
            //自建房
            if(this.isSelfCreateRoom) {
                if(this.TableConfig.IsTableCreatorPay)
                {
                    checkMoney=this.TableConfig.tableCost;
                }
                
            } else {//自动匹配场
                checkMoney = this.RoomClient.BaseMoney * this.RoomClient.JoinMultiNum;
            }
            
            return checkMoney;
        }
        
        /**
         * 我的场地余额
         * */
        public get SelfRoomMoney():number{
            if(this.isSelfCreateRoom) {
                return this.UserBagEntity(this.RoomClient.TableCostMoneyType);
            }
            else{
                return this.UserBagEntity(this.RoomClient.CheckMoneyType);
            }
        }

        public get ifCanPao():boolean{
            if(enGamePhase.GamePhase_Pao == this._gamePhase){
                return true;
            }
            return false;
        }

        public get ifCanLa():boolean{
            if(enGamePhase.GamePhase_La == this._gamePhase){
                return true;
            }
            return false;
        }
        /**
         * 自己是否可以操作:打出牌,自摸,暗杠
         * */
        public get ifCanOp():boolean{
            if((enGamePhase.GamePhase_PlayerOP == this._gamePhase) && (this.SelfChair == this._activePlayer)){
                return true;
            }
            return false;
        }
        /**
         * 是否可以打出某张牌
         * */
        public IfCanOutACard(card:number):boolean{
            if(BBMJMahjongDef.gInvalidMahjongValue == card){
                return false;
            }
            return true;
        }
        /**
         * 自己是否可以投票碰
         * */
        public get ifCanVotePeng():boolean{
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && BBMJMahjongAlgorithm1.CheckVoteRight_Peng(this._voteRight)) {
                return true;
            }
            
            return false;
        }
        /**
         * 是否可以投票杠
         * */
        public get ifCanVoteGang():boolean{
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && BBMJMahjongAlgorithm1.CheckVoteRight_Gang(this._voteRight)) {
                console.log("可以很强势")
                return true;
                
            }
            console.log("什么J8玩意")
            return false;

           
        }
        /**
         * 自己是否可以杠
         * */
        public get ifCanGang(): boolean {

            if(this.ifCanOp && (this._gangCard.length > 0)){
                return true;
            }

            return false;
        }
        /**
         * 自己是否可以投票胡
         * */
        public get ifCanVoteHu(): boolean {
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && BBMJMahjongAlgorithm1.CheckVoteRight_Hu(this._voteRight)) {
                return true;
            }

            return false;
        }

          /**
         * 自己是否可以投票听
         * */
        public get ifCanVoteTing(): boolean {
            // if((enGamePhase.GamePhase_Vote == this._gamePhase) && BBMJMahjongAlgorithm1.CheckVoteRight_Ting(this._voteRight)) {
            //     return true;
            // }

            return false;
        }



        /**
         * 是否自己投票
         * */
        public get isSelfVote():boolean{
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && (BBMJMahjongDef.gVoteRightMask_Null != this._voteRight)) {
                return true;
            }
            return false;
        }
        /**
         * 是否可以抢杠
         * */
        public get ifCanQiangGang():boolean{
            if(this._ifCanQiangGang && (enGamePhase.GamePhase_QiangGang == this._gamePhase)){
                return true;
            }
            
            return false;
        }

        /**
         * 最后一张有效的牌
         * */
        public get lastValidCard():number{
            
            for(var i = 0 ;i<this._handCard.length;i++){
                if(!BBMJMahjongAlgorithm1.IsContainsNumber(this._flowerAry, this._handCard[this._handCard.length - (i+1)])){
                    return this._handCard[this._handCard.length - i-1];
                }
            }
            return this._handCard[this._handCard.length - 1];
           
        }
        
        // /**
        //  * 显示听牌
        //  * */
        // public showTingCard(outCard:number,pos:number):void{
            
        //     var checkAry:Array<number> = new Array<number>();
        //     for(var i:number=0; i<this._handCard.length; i++){
        //         if(BBMJMahjongDef.gInvalidMahjongValue != this._handCard[i]){
        //             checkAry.push(this._handCard[i]);
        //         }
        //     }
        //     BBMJMahjongAlgorithm1.delCard(checkAry,[outCard]);
            
        //     var tingAry: Array<number> = BBMJMahjongAlgorithm.GetTingCardArray(checkAry);    
        //     console.log("听牌长度"+tingAry.length);
                   
        //     var tingTip: Array<TingCardTip> = new Array<TingCardTip>();
            
        //     if(tingAry.length > 0){
                
        //         for(var j:number=0; j<tingAry.length; j++){
        //             checkAry.push(tingAry[j]);
        //             console.log("听牌"+tingAry[j]);
        //             tingTip.push(new TingCardTip(tingAry[j],0,this.RecordCard.getCardLeftNum(tingAry[j],this._handCard)));

        //             BBMJMahjongAlgorithm.delCard(checkAry,[tingAry[j]]);
        //         }
        //     }
            
        //     M_BBMJView.ins.TingTip.showTingTip(tingTip);
        //     if(tingTip.length > 0){
        //         // if((pos + M_BBMJView.ins.TingTip.size.width) > 1280){
        //         //     M_BBMJView.ins.TingTip.x = 1280 - M_BBMJView.ins.TingTip.size.width;
        //         // }else{
        //         //     M_BBMJView.ins.TingTip.x = pos;
        //         // }
        //         // if((pos + M_BBMJView.ins.TingTip.size.width/2) > 640){
        //         //     M_BBMJView.ins.TingTip.node.x = 640 - M_BBMJView.ins.TingTip.size.width;
        //         // }else{
        //         //     M_BBMJView.ins.TingTip.node.x = pos - M_BBMJView.ins.TingTip.size.width/2;
        //         // }
        //          if((pos + M_BBMJView.ins.TingTip.size.width/2) > 640){
        //         M_BBMJView.ins.TingTip.node.x = 640 - M_BBMJView.ins.TingTip.size.width;
        //     }else if((pos - M_BBMJView.ins.TingTip.size.width/2) < -640){
        //         M_BBMJView.ins.TingTip.node.x = M_BBMJView.ins.TingTip.size.width - 640;
        //     }
        //     else
        //     {
        //         M_BBMJView.ins.TingTip.node.x = pos - M_BBMJView.ins.TingTip.size.width/2;
        //     }
        //     }
        // }
            /**
     * 显示听牌
     * */
    public showTingCard(outCard: number, pos: number,tips:boolean): void {

        var checkAry: Array<number> = new Array<number>();
        for (var i: number = 0; i < this._handCard.length; i++) {
            if (BBMJMahjongDef.gInvalidMahjongValue != this._handCard[i]) {
                checkAry.push(this._handCard[i]);
            }
        }
        BBMJMahjongAlgorithm1.delCard(checkAry, [outCard]);


        // BBMJMahjongAlgorithmHaveHunLhh.HaveFlower =this._tableConfig._MaShu==0?true:false;
        var tingAry: Array<number> = BBMJMahjongAlgorithm.GetTingCardArray(checkAry);

        console.log(`听牌种类：${tingAry.length}`);
        var tingTip: Array<TingCardTip> = new Array<TingCardTip>();

        if (tingAry.length > 0) {
            for (var j: number = 0; j < tingAry.length; j++) {
                tingTip.push(new TingCardTip(tingAry[j], 0, this.RecordCard.getCardLeftNum(tingAry[j], this._handCard)));
            }
        }

        M_BBMJView.ins.TingTip.showTingTip(tingTip,tips);
      

        // if(tingTip.length>0 && pos!=3000){
        //     if((pos-M_BBMJView.ins.TingTip.size.width/2-300)<-640){
        //         M_BBMJView.ins.TingTip.node.x=-540;
        //         console.log("1111111111111111111111111111");
        //     }
        //     else if((pos + M_BBMJView.ins.TingTip.size.width/2+300) > 640){
        //         M_BBMJView.ins.TingTip.node.x = 640 - M_BBMJView.ins.TingTip.size.width-600;
        //         console.log("22222222222222222222222222222222");
        //     }
        //     else{
        //         M_BBMJView.ins.TingTip.node.x = pos - M_BBMJView.ins.TingTip.size.width/2-300;
        //         console.log("333333333333333333333333333333333");
        //     }
        // }else{
            
        //      M_BBMJView.ins.TingTip.node.x = 640 - M_BBMJView.ins.TingTip.size.width-200-300;
        //     //  M_BBMJView.ins.TingTip.scroll.node.width = 1080;
            
        //     //  M_BBMJView.ins.TingTip.scroll.node.x = 619;
        //     //  M_BBMJView.ins.TingTip.showNode.x = -519;
        //      console.log("555555555555555555555555555555555555555555555");
            

        //  }
        // if(tingTip.length > 0  && pos!=3000){
        
        //     if((pos + M_BBMJView.ins.TingTip.size.width/2) > 640){
        //         M_BBMJView.ins.TingTip.node.x = 640 - M_BBMJView.ins.TingTip.size.width;
        //     }else if((pos - M_BBMJView.ins.TingTip.size.width/2) < -640){
        //         M_BBMJView.ins.TingTip.node.x = M_BBMJView.ins.TingTip.size.width - 640;
        //     }
        //     else
        //     {
        //         M_BBMJView.ins.TingTip.node.x = pos - M_BBMJView.ins.TingTip.size.width/2;
        //     }
            
        // }else{
            
        //     M_BBMJView.ins.TingTip.node.x = 640 - M_BBMJView.ins.TingTip.size.width-200;
            
        // }
    }
 
        /**
         * 计时器事件
         * */
        private onTimerEvent(timerid: number,chair: number,leftTickNum: number):void{
            M_BBMJView.ins.TimerView.timerNum = leftTickNum;
            if(chair != this.SelfChair){
                return;
            }
            switch(timerid){
                //玩家操作
                case BBMJTimerDef.timer_id_playerop:{
                    if((0 == leftTickNum) && this.ifCanOp && !this.isSelfCreateRoom) {
                        
                        M_BBMJView.ins.CardView.selfActive.activeEnable(false);
                        this.outCard(this.lastValidCard);
                    }
                    break;
                }
                //投票
                case BBMJTimerDef.timer_id_vote:{
                    if((0 == leftTickNum) && this.isSelfVote&& !this.isSelfCreateRoom) {
                        M_BBMJView.ins.OperatorView.node.active=false;
                        this.vote(BBMJMahjongDef.gVoteResult_GiveUp);
                    }
                    break;
                }
                //抢杠
                case BBMJTimerDef.timer_id_qianggang:{
                    if((0 == leftTickNum) && this.ifCanQiangGang&& !this.isSelfCreateRoom) {
                        M_BBMJView.ins.QiangGangView.node.active=false;
                        this.qiangGang(1);
                    }
                    break;
                }
                //准备
                case BBMJTimerDef.timer_id_ready:{
                    if((0 == leftTickNum) && (chair == this.SelfChair)){

                    }
                    break;
                }
            }
        }
       /**
     * 获取麻将花牌
     */
    public static GetFlowerCardArySZMJ(): Array<number> {
        var Ary: Array<number> = new Array<number>();
        
        Ary.push(0x35);
        Ary.push(0x36);
        Ary.push(0x37);
        return Ary;
    }

        /**
         * 玩家打牌
         * */
        private outCard(card:number):void{
            this._canVote=false;
            
            this._gamePhase = enGamePhase.GamePhase_Unknown;

            M_BBMJView.ins.CardView.selfActive.activeEnable(false);
            if(cc.isValid(M_BBMJView.ins.OperatorView)){
            M_BBMJView.ins.OperatorView.node.active=false;
        }
        if(cc.isValid(M_BBMJView.ins.SelGangView)){
            M_BBMJView.ins.SelGangView.node.active=false;
        }
        if(cc.isValid(M_BBMJView.ins.TimerView)){
            M_BBMJView.ins.TimerView.hideArrow();
        }
  
            M_BBMJView.ins.CardView.selfActive.showTingCardToken(null);
            M_BBMJView.ins.TingTip.showTingTip(null,true);
            
            var outCard: M_BBMJ_GameMessage.CMD_C_OutCard = new M_BBMJ_GameMessage.CMD_C_OutCard();
                    if(card==0){
            ReportError("出牌报错，出牌0");
        }
            outCard.outCard = card;
            this.SendGameData(outCard);

            //M_BBMJView.ins.TipMsgView.showTip("出了一张牌，4秒钟后自动隐藏",true,4);
            //console.log("======================================出了一张牌============================");
            //M_BBMJView.ins.MsgBox.showMsgBox("出了一张牌，多写很多字，看是否能够自动换行，出了一张牌，多写很多字，看是否能够自动换行，出了一张牌，多写很多字，看是否能够自动换行，出了一张牌，多写很多字，看是否能够自动换行，出了一张牌，多写很多字，看是否能够自动换行，");
        }
        
        /**
         * 投票
         * */
        private vote(voteResult : number):void{
            
            this._voteRight = BBMJMahjongDef.gVoteRightMask_Null;
            this._gamePhase = enGamePhase.GamePhase_Unknown;
            this.stopTimer();
            M_BBMJView.ins.CardView.selfActive.allDown();
            M_BBMJView.ins.CardView.selfActive.showTingCardToken(null);
            M_BBMJView.ins.TingTip.showTingTip(null,true);
            
            var vote: M_BBMJ_GameMessage.CMD_C_Vote = new M_BBMJ_GameMessage.CMD_C_Vote();
            vote.voteResult = voteResult;
            this.SendGameData(vote);
        }
        
        /**
         * 抢杠
         * */
        private qiangGang(qiang:number):void{
            
            this._gamePhase = enGamePhase.GamePhase_Unknown;
            this._ifCanQiangGang = false;
            this.stopTimer();

            var qiangGang: M_BBMJ_GameMessage.CMD_C_QiangGang = new M_BBMJ_GameMessage.CMD_C_QiangGang();
            qiangGang.qiangGang = qiang;
            this.SendGameData(qiangGang);
        }

        /**
         * 清理数据
         * */
        private clear():void{
            this._bankerChair = BBMJMahjongDef.gInvalidChar;
            this._gamePhase = enGamePhase.GamePhase_Unknown;
            this._activePlayer = BBMJMahjongDef.gInvalidChar;
            this._outCardPlayer.clear();
            this._recordCard.init();
            this._sz1 = 0;
            this._sz2 = 0;
            this._gameid="";
            this._alreadyHu=false;
            
            this._handCard.splice(0,this._handCard.length);
            
            
            this._gangCard.splice(0,this._gangCard.length);
            this._voteRight = BBMJMahjongDef.gVoteRightMask_Null;
            this._ifCanQiangGang = false;
            this._isTing=false;
            this._isIgnoreForceLeft=false;
            
        }
                  public showHideCard(outCard:number):void{
             this.gameView.CardView.refreshHideCard(outCard);
    }

    onLoad() {
        super.onLoad();
        M_BBMJClass._ins = this;
        BBMJ.ins.iclass = this;

        this._shareContext ="我正在电玩城玩《蚌埠麻将》，已经建好游戏房间，就等你来战！";

        this._haveGameScene=false;
        //
        //初始化
        //
        this._timer = new BBMJTimer();
        this._tableConfig = new BBMJTableConfig();
        this._outCardPlayer = new BBMJOutCardPlayer();
        this._recordCard = new BBMJRecordCard();
        this._handCard = new Array<number>();
        this._gangCard = new Array<number>();
        BBMJ.ins.iclass = this;

        this.node.on(BBMJEvent.BBMJ_EVENT_TYPE,this.onGameViewEvent,this);

        
    }
    update(){
        super.update();
        this._timer.tick(Date.now() - this._curTime);
        this._curTime = Date.now();
    }

    
    // /**测试显示房号 */
    // private test():void{
    //     this.BBMJ_GameInfoView = this.GameInfoView.getComponent<BBMJ_GameInfo>(BBMJ_GameInfo);
    //     this.BBMJ_GameInfoView.tableCode="123456";
    // }


    public GetGameID(): number{
        return BBMJMahjongDef.gameID;
    }


     /**
     * 获取混牌
     */
    public GetHunCardAry():Array<number>{
        
        var HunAry:Array<number>=new Array<number>();
        

            // if (BBMJMahjongAlgorithm1.GetMahjongColor(this._hunPiCard) < 3)
            //     {
            //         if (BBMJMahjongAlgorithm1.GetMahjongValue(this._hunPiCard) != 9)
            //         {
            //             HunAry.push((this._hunPiCard + 1));
            //         }
            //         if (BBMJMahjongAlgorithm1.GetMahjongValue(this._hunPiCard) == 9)
            //         {
            //             HunAry.push((this._hunPiCard - 8));
            //         }
            //     }
            //     else if (BBMJMahjongAlgorithm1.GetMahjongColor(this._hunPiCard) == 3)
            //     {
            //         if (BBMJMahjongAlgorithm1.GetMahjongValue(this._hunPiCard) < 4)
            //         {
            //             HunAry.push((this._hunPiCard + 1));
            //         }

            //         if (BBMJMahjongAlgorithm1.GetMahjongValue(this._hunPiCard) == 4)
            //         {
            //             HunAry.push(0x31);
            //         }

            //         if (BBMJMahjongAlgorithm1.GetMahjongValue(this._hunPiCard) >= 5 && BBMJMahjongAlgorithm1.GetMahjongValue(this._hunPiCard) < 7)
            //         {
            //             HunAry.push((this._hunPiCard + 1));
            //         }

            //         if (BBMJMahjongAlgorithm1.GetMahjongValue(this._hunPiCard) == 7)
            //         {
            //             HunAry.push(0x35);
            //         }
            //     }
                HunAry.push(0x41);
            return HunAry;
        


    

    }

    public OnGameMessage(cm: GameIF.CustomMessage): boolean{
        switch(cm.wSubCmdID){
                //桌子配置
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_TableConfig: {
                    this.Handle_CMD_S_TableConfig(cm);
                    break;
                }
                //游戏开始
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_Start:{
                    this.Handle_CMD_S_Start(cm);
                    break;
                }
                //骰子庄家信息
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_SZInfo:{
                    this.Handle_CMD_S_SZInfo(cm);
                    break;
                }        
                //初始化牌
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_InitCard: {
                    this.Handle_CMD_S_InitCard(cm);
                    break;
                }
                //游戏ID
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_GameID: {
                    this.Handle_CMD_S_GameID(cm);
                    break;
                }
                //玩家抓了一张牌
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_PlayerHoldCard: {
                    this.Handle_CMD_S_PlayerHoldCard(cm);
                    break;
                }
                //当前活动玩家
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_ActivePlayer: {
                    this.Handle_CMD_S_ActivePlayer(cm);
                    break;
                }
                //投票权限
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_VoteRight: {
                    this.Handle_CMD_S_VoteRight(cm);
                    break;
                }
                //玩家打出了一张牌
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_PlayerOutCard: {
                    this.Handle_CMD_S_PlayerOutCard(cm);
                    break;
                }
                //删除玩家牌池的最后一张牌
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_DelPoolCard: {
                    this.Handle_CMD_S_DelPoolCard(cm);
                    break;
                }
                //玩家碰牌
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_PlayerPengCard: {
                    this.Handle_CMD_S_PlayerPengCard(cm);
                    break;
                }
                //玩家暗杠牌
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_PlayerAnGangCard: {
                    this.Handle_CMD_S_PlayerAnGangCard(cm);
                    break;
                }
                //玩家明杠牌
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_PlayerMingGang: {
                    this.Handle_CMD_S_PlayerMingGang(cm);
                    break;
                }
                //玩家补杠牌
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_PlayerBuGangCard: {
                    this.Handle_CMD_S_PlayerBuGangCard(cm);
                    break;
                }
                //玩家胡牌
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_PlayerHuCard: {
                    this.Handle_CMD_S_PlayerHuCard(cm);
                    break;
                }
                //操作玩家
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_OpPlayer: {
                    this.Handle_CMD_S_OpPlayer(cm);
                    break;
                }
                //开始发牌
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_StartSendCard: {
                    this.Handle_CMD_S_StartSendCard(cm);
                    break;
                }
                //玩家断线
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_PlayerOffline: {
                    this.Handle_CMD_S_PlayerOffline(cm);
                    break;
                }
                //玩家断线重连进入
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_PlayerOfflineCome: {
                    this.Handle_CMD_S_PlayerOfflineCome(cm);
                    break;
                }
                //抢杠信息
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_QiangGang: {
                    this.Handle_CMD_S_QiangGang(cm);
                    break;
                }
                //删除抢杠牌
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_DelQiangGangCard:{
                    this.Handle_CMD_S_DelQiangGangCard(cm);
                    break;
                }
                //玩家手牌数据
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_PlayerCardData: {
                    this.Handle_CMD_S_PlayerCardData(cm);
                    break;
                }
                //续局提示框
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_AddGameNum:{
                    this.Hanle_CMD_S_AddGameNum(cm);
                    break;
                }
                //结算信息
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_Balance: {
                    this.Handle_CMD_S_Balance(cm);
                    break;
                }
                //手牌数据
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_HandCardData:{
                    this.Handle_CMD_S_HandCardData(cm);
                    break;
                }
                //断线重连游戏信息
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_ORC_GameInfo:{
                    this.Handle_CMD_S_ORC_GameInfo(cm);
                    break;
                }
                //断线重连玩家手中牌
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_ORC_PlayerCard:{
                    this.Handle_CMD_S_ORC_PlayerCard(cm);
                    break;
                }
                //断线重连恢复投票阶段
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_ORC_Vote:{
                    this.Handle_CMD_S_ORC_Vote(cm);
                    break;
                }
                //断线重连结束
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_ORC_Over: {
                    this.Handle_CMD_S_ORC_Over(cm);
                    break;
                }
                //断线重连解散桌子
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_ORC_DissTable: {
                    this.Handle_CMD_S_ORC_DissTable(cm);
                    break;
                }
                //断线重连重置玩家分数
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_ORC_GameScoreChange:{
                    this.Handle_CMD_S_ORC_GameScoreChange(cm);
                    break;
                }
                //断线重连空闲状态进入
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_ORC_TableFree:{
                    this.Handle_CMD_S_ORC_TableFree(cm);
                    break;
                }
                //强退成功
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_ForceLeftSuccess: {
                    this.Handle_CMD_S_ForceLeftSuccess(cm);
                    break;
                }
                //桌子创建成功
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_CreateTableSuccess: {
                    //this.Handle_CMD_S_CreateTableSuccess(cm);
                    break;
                }
                //开始创建桌子
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_StartCreateTable: {
                    this.Handle_CMD_S_StartCreateTable(cm);
                    break;
                }
                //房主信息
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_TableCreatorInfo: {
                    this.Handle_CMD_S_TableCreatorInfo(cm);
                    break;
                }
                //强退玩家
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_ForceUserLeft:{
                    this.Handle_CMD_S_ForceUserLeft(cm);
                    break;
                }
                //显示提示信息
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_ShowMsg: {
                    this.Handle_CMD_S_ShowMsg(cm);
                    break;
                }
                //好友拒绝帮忙
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_FriendReject: {
                    //this.Handle_CMD_S_FriendReject(cm);
                    break;
                }
                //好友帮助成功
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_FriendHelpSuccess: {
                    //this.Handle_CMD_S_FriendHelpSuccess(cm);
                    break;
                }
                //好友请求信息
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_FriendHelpInfo: {
                    //this.Handle_CMD_S_FriendHelpInfo(cm);
                    break;
                }
                //新的一个回合
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_NewGameRound: {
                    this.Handle_CMD_S_NewGameRound(cm);
                    break;
                }
                //计分板结果
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_GameRecordResult: {
                    this.Handle_CMD_S_GameRecordResult(cm);
                    break;
                }
                //玩家余额
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_PlayerMoney:{
                    //this.Handle_CMD_S_PlayerMoney(cm);
                    break;
                }
                //有玩家申请解散桌子
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_PlayerDissTable: {
                    this.Handle_CMD_S_PlayerDissTable(cm);
                    break;
                }
                //玩家投票解散桌子结果
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_PlayerVoteDissTable: {
                    this.Handle_CMD_S_PlayerVoteDissTable(cm);
                    break;
                }
                //桌子解散成功
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_DissTableSuccess:{
                    this.Handle_CMD_S_DissTableSuccess(cm);
                    break;
                }

                //玩家准备
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_UseReady:{
                    this.Handle_CMD_S_UseReady(cm);
                    break;
                }
                //玩家保留桌子成功
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_SaveTableSuccess:{
                    this.Handle_CMD_S_SaveTableSuccess(cm);
                    break;
                }
                //听牌玩家相关判断
                 case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_Ting:{
                    this.Handle_CMD_S_Ting(cm);
                    break;
                }
                //解散房间时操作频繁相关信息
                 case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_IsDissolution:{
                    this.Handle_CMD_S_IsDissolution(cm);
                    break;
                }
                //显示服务端的版本号
                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_Version:{
                    this.Handle_CMD_S_Version(cm);
                    break;
                }

                case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_BuHua: {
                this.Handle_CMD_S_BuHua(cm);
                break;
            }
             case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_FlowerCardAry:{
                this.Handle_CMD_S_FlowerCardAry(cm);
                break;
            }
             case M_BBMJ_GameMessage.BBMJMsgID_s2c.CMD_S_FanKaiHun:{
                this.Handle_CMD_S_FanKaiHun(cm);
                break;
            }
                default:{
                    console.log(`未处理的指令:${cm.wMainCmdID} -- ${cm.wSubCmdID}`);
                    break;
                }
            }
            return true;
    }


    public NoZiMo(){
        console.log("++++++++++++玩家放弃自摸++++++++++++")
         var NoZiMo: M_BBMJ_GameMessage.CMD_C_NoZiMo = new M_BBMJ_GameMessage.CMD_C_NoZiMo();
         this.SendGameData(NoZiMo)
    }
    public NoGang(){
        console.log("++++++++++++玩家放弃杠++++++++++++")
         var NoGang: M_BBMJ_GameMessage.CMD_C_NoGang = new M_BBMJ_GameMessage.CMD_C_NoGang();
         this.SendGameData(NoGang)
    }
    /**
     * 花牌列表
     * @param msg 
     */
    private Handle_CMD_S_FlowerCardAry(msg: GameIF.CustomMessage):void{
        var floAry:M_BBMJ_GameMessage.CMD_S_FlowerCardAry=<M_BBMJ_GameMessage.CMD_S_FlowerCardAry>msg;
        this._flowerAry=floAry.cardAry;


        var flo:string="";
        for(var i=0;i<this._flowerAry.length;i++){
            if(i!=this._flowerAry.length-1){
                flo+=this._flowerAry[i].toString()+"、";
                continue;
            }
            flo+=this._flowerAry[i].toString();
        }

        console.log(`此局花牌为`+flo);
    }

    /**
     * 把混皮牌发送到客户端
     * @param msg 
     */
    private Handle_CMD_S_FanKaiHun(msg: GameIF.CustomMessage):void{
        var hunpi:M_BBMJ_GameMessage.CMD_S_FanKaiHun=<M_BBMJ_GameMessage.CMD_S_FanKaiHun>msg;
        this._hunPiCard=hunpi.card;





    
            //         if(this.fankai){
            //   this.scheduleOnce(function () {
            // M_BBMJView.ins.CardView.hunPi.ShowCard(this._hunPiCard);
            //   }.bind(this), 2)
            //         }else{
            //  M_BBMJView.ins.CardView.hunPi.ShowCard(this._hunPiCard);
       // }
        

        
      //  this._recordCard.outACard(hunpi.card);//这是听牌提示中显示剩余牌的结果
        //剩余牌显示
       // M_BBMJView.ins.GameInfo.holdACard();//这张牌算在20张牌里面
        
        //this._outCardPlayer.playerOutCard(playerOutCard.chair, playerOutCard.card);
        //this._recordCard.outACard(hunpi.card);


        
        console.log(`此局混皮牌为${this._hunPiCard}`);
    }
    /**
     * 销毁游戏
     */
    // protected DestryGameClass(): boolean{
    //     this.gameView.DestroyView();
    //     //销毁游戏场景
    //     return true;
    // }
      /**
     * 销毁游戏
     */
    protected DestryGameClass(): boolean{
        this.gameView.DestroyView();
        for(let i=0;i<4;i++){
            BBMJ_CardView._freeActiveNode[i].clear();
            BBMJ_CardView._freeFixedNode[i].clear();
            BBMJ_CardView._freePoolNode[i].clear();
            BBMJ_CardView._freeFlowerNode[i].clear();
        }
        BBMJ_BanlanceActive._freeNode.clear();
        BBMJ_BanlanceFixed._freeNode.clear();
        BBMJ_BanlanceFlower._freeNode.clear();
        BBMJ_TingTip._freeNode.clear();
        //销毁游戏场景
        return true;
    }


    // /**
    //  * 初始化游戏 有参数 用于初始化，会被多次调用
    //  */
    // protected OnInitClass(): void{
    //     console.log("init");
    //     //this.gameView.showGameNum(16,8,0);
    //     this.gameView.Init();
    // }



        /**
     * 初始化游戏 有参数 用于初始化，会被多次调用
     */
    protected OnInitClass(): void{
        console.log("init");
        //this.gameView.showGameNum(16,8,0);
        this.clear();
        this.gameView.Init();
    //      
     let timenode=this.UiManager.GetTimerForm();
        timenode.x=600;
        timenode.y=342;
        timenode.width = 1.2;
        timenode.height = 3;
        timenode.scale = 0.7;
        timenode.color=cc.color().fromHEX("#fedbc7");
        this.node.addChild(timenode); 
    
    }

    /**
     * 初始化游戏 有参数 用于初始化，每次游戏中断线重连都会被调用
     */
    protected ReInitClass():void{
        this.clear();
        this.gameView.Init();
    }

    // /**
    //  * 每次调用OnInitClass之前，会调用OnResetGameClass
    //  * @returns {} 
    //  */
    // protected OnResetGameClass(): void {
    //     this.clear();
    // }

    public GetChatMsg(): string[] {
        return this.MsgArray;
    }
        /**
     * IP检测提示
     */
    private showCheckIP(){
        var sameIPPlayer :Array<string> = new Array<string>();           
            for(var i:number=0; i<BBMJMahjongDef.gPlayerNum-1; i++){              
                var checkIPPlayer :string = i.toString();               
                for(var j:number=i+1; j<BBMJMahjongDef.gPlayerNum; j++){
                    if(null != this.TablePlayer[i] && null != this.TablePlayer[j] && i != this.SelfChair && j != this.SelfChair){
                        if(this.TablePlayer[i].UserIP == this.TablePlayer[j].UserIP){
                            checkIPPlayer+=`,${j}`;
                        }
                    }
                }          
                //检查本次收到的是否全部包含在其他集合中
                if(checkIPPlayer.length > 1){                  
                    var add:boolean=true;                
                    for(var m:number=0; m<sameIPPlayer.length; m++){
                        if(sameIPPlayer[m].indexOf(checkIPPlayer) >= 0){
                            add=false;
                            break;
                        }
                    }                
                    if(add){
                        sameIPPlayer.push(checkIPPlayer);
                    }
                }
            }        
            if(this._tableConfig.alreadyGameNum == 0 && sameIPPlayer.length > 0){           
                var tipMsg:string[] = [];       
                // for(var n:number=0; n<sameIPPlayer.length; n++){
                //     var chairAry: Array<string> = sameIPPlayer[n].split(",");
                //     if(chairAry.length > 1){
                //         for(var x:number=0; x<chairAry.length; x++){
                //             if(this.TablePlayer[parseInt(chairAry[x])].NickName.length > 6)
                //                 tipMsg += this.TablePlayer[parseInt(chairAry[x])].NickName.substr(0,6)+" ";
                //             else
                //                 tipMsg += this.TablePlayer[parseInt(chairAry[x])].NickName+" ";
                //             tipMsg += x == (chairAry.length - 1) ? "":",";
                //             //tipMsg += `玩家:${this.TablePlayer[parseInt(chairAry[x])].NickName}${x == (chairAry.length - 1) ? "":","}`;
                //         }
                //         // tipMsg+="  IP相同"+"\n"; 
                //     }
                //     if(n != (sameIPPlayer.length - 1)){
                //         tipMsg+=" | ";
                //     }
                // }
                let playerCount:number = 0;
                for(var i=0;i<4;i++) {
                    if(null != this.TablePlayer[i])
                        playerCount++;
                }
                if(playerCount == 4){
                    var sameIps = sameIPPlayer[0].split(",");
                    if(sameIps.length == 2){
                        if(this.TablePlayer[parseInt(sameIps[0])].NickName.length > 4){
                            this.TablePlayer[parseInt(sameIps[0])].NickName = this.TablePlayer[parseInt(sameIps[0])].NickName.substr(0,4);
                        }
                        if(this.TablePlayer[parseInt(sameIps[1])].NickName.length > 4){
                            this.TablePlayer[parseInt(sameIps[1])].NickName = this.TablePlayer[parseInt(sameIps[1])].NickName.substr(0,4);
                        }
                        tipMsg[0] = "玩家:"+this.TablePlayer[parseInt(sameIps[0])].NickName+" 与 "+"玩家:"+this.TablePlayer[parseInt(sameIps[1])].NickName
                    }
                    if(sameIps.length == 3){
                        if(this.TablePlayer[parseInt(sameIps[0])].NickName.length > 4){
                            this.TablePlayer[parseInt(sameIps[0])].NickName = this.TablePlayer[parseInt(sameIps[0])].NickName.substr(0,4);
                        }
                        if(this.TablePlayer[parseInt(sameIps[1])].NickName.length > 4){
                            this.TablePlayer[parseInt(sameIps[1])].NickName = this.TablePlayer[parseInt(sameIps[1])].NickName.substr(0,4);
                        }
                        if(this.TablePlayer[parseInt(sameIps[2])].NickName.length > 4){
                            this.TablePlayer[parseInt(sameIps[2])].NickName = this.TablePlayer[parseInt(sameIps[2])].NickName.substr(0,4);
                        }
                        tipMsg[0] = "玩家:"+this.TablePlayer[parseInt(sameIps[0])].NickName+" 与 "+"玩家:"+this.TablePlayer[parseInt(sameIps[1])].NickName
                        tipMsg[1] = "玩家:"+this.TablePlayer[parseInt(sameIps[0])].NickName+" 与 "+"玩家:"+this.TablePlayer[parseInt(sameIps[2])].NickName
                        tipMsg[2] = "玩家:"+this.TablePlayer[parseInt(sameIps[1])].NickName+" 与 "+"玩家:"+this.TablePlayer[parseInt(sameIps[2])].NickName
                    }
                    M_BBMJView.ins.StartCheckIP(tipMsg);

                }   
            }
    }


    /**
     * 游戏开始
     */
    protected OnGameStart(): void {

    }

    /**
     * 游戏结束
     * */
    protected OnGameOver(): void {

    }

    /**
     * 玩家坐下:自己坐下和自己坐下后又有新的玩家进入坐下,默认状态为SitDown状态,以防万一最好再处理一下状态
     * */
    protected OnPlayerSitDown(chairID: number, player: QL_Common.TablePlayer): void {
        let playerCount:number = 0;
                for(var i=0;i<4;i++) {
                    if(null != this.TablePlayer[i])
                        playerCount++;
                }
        if(playerCount == 4){
           this.gameView.ReadyAndGameUserInfo.group_other.active = false;
        }
        //cc.log("OnPlayerSitDown:" + chairID.toString() + "," + player.FaceID + "," + player.NickName + "," + player.PlayerState);      
      //  this.gameView.ReadyStatusUserInfo.OnPlayerSitDown(chairID,player);
        if (this.TablePlayer[chairID].PlayerState != QL_Common.GState.Gaming)
            this.showCheckIP();
        this.gameView.ReadyAndGameUserInfo.OnPlayerSitDown(chairID, player);  
       // this.gameView.GameStatusUserInfo.OnPlayerSitDown(chairID,player);
    }

    /**
     * 玩家坐下后告诉坐下的玩家,这个桌子上之前已经有哪些玩家了,这个函数需要同时处理玩家的状态显示
     * */
    protected OnTablePlayer(chairID: number, player: QL_Common.TablePlayer): void {
        let playerCount:number = 0;
                for(var i=0;i<4;i++) {
                    if(null != this.TablePlayer[i])
                        playerCount++;
                }
        if(playerCount == 4){
           this.gameView.ReadyAndGameUserInfo.group_other.active = false;
        }
        //cc.log("OnPlayerSitDown:" + chairID.toString() + "," + player.FaceID + "," + player.NickName + "," + player.PlayerState);
        if (this.TablePlayer[chairID].PlayerState != QL_Common.GState.Gaming)
            this.showCheckIP();
        this.gameView.ReadyAndGameUserInfo.OnTablePlayer(chairID, player);
        //this.gameView.ReadyStatusUserInfo.OnTablePlayer(chairID,player);
        var chair = this.physical2logicChair(chairID);
        if(chair == 0){
            M_BBMJView.ins.ShowTimerView(this.ChairID);
        }
    
    }

    /**
     * 玩家状态发生改变,如新的玩家坐下后默认状态为SitDown,然后玩家准备,新状态就是Ready状态
     * */
    protected OnPlayerStatusChange(chairID: number, newStatus: QL_Common.GState): void {
      this.gameView.ReadyAndGameUserInfo.OnPlayerStatusChange(chairID,newStatus);
       // this.gameView.ReadyStatusUserInfo.OnPlayerStatusChange(chairID,newStatus);
    }

    /**
     * 玩家离开,玩家从这个桌子上离开,游戏需要将玩家的信息从指定位置清除
     * */
    protected OnPlayerLeave(chairID: number): void {
        // let playerCount:number = 0;
        //         for(var i=0;i<4;i++) {
        //             if(null != this.TablePlayer[i])
        //                 playerCount++;
        //         }
        
        this.gameView.ReadyAndGameUserInfo.OnPlayerLeave(chairID);
        //this.gameView.ReadyStatusUserInfo.OnPlayerLeave(chairID);
    }

    /**
     * 玩家被从桌子上拉起（开始被换桌） 此时换桌刚刚开始，玩家处于起立状态，没有椅子号
     * @returns {} 
     */
    protected OnPlayerChangeTable() {
    }

    /**
     * 玩家聊天
     * */
    protected OnPlayerChat(chairID: number, player: QL_Common.TablePlayer, chatMsg: string): void {
        // M_BBMJView.ins.ReadyStatusUserInfo.playerChat(chairID,chatMsg);
        // M_BBMJView.ins.GameStatusUserInfo.playerChat(chairID,chatMsg);
        M_BBMJView.ins.ReadyAndGameUserInfo.playerChat(chairID,chatMsg);
    }

    /**
     * 玩家聊天
     * */
    protected OnPlayerChatIndex(chairID: number, player: QL_Common.TablePlayer, idx: number): void {
        console.log("收到编号为" + idx + "的消息");
        // M_BBMJView.ins.ReadyStatusUserInfo.playerChat(chairID,this.MsgArray[idx]);
        // M_BBMJView.ins.GameStatusUserInfo.playerChat(chairID,this.MsgArray[idx]);
        // M_BBMJVoice.PlayChatVoice(idx, player.Gender,this.AudioManager.VoiceType);
         M_BBMJView.ins.ReadyAndGameUserInfo.playerChat(chairID,this.MsgArray[idx]);
        M_BBMJVoice.PlayChatVoice(idx, player.Gender,this.AudioManager.VoiceType);
    }

    /**
     * 玩家聊天
     * */
    protected OnPlayerChatEmoji(chairID: number, player: QL_Common.TablePlayer, clip: cc.AnimationClip): void {
        //console.log(url);
       // M_BBMJView.ins.ReadyStatusUserInfo.playerLook(chairID,clip);
       // M_BBMJView.ins.GameStatusUserInfo.playerLook(chairID,clip);
    M_BBMJView.ins.ReadyAndGameUserInfo.playerLook(chairID,clip);
}

    /**
 * 玩家道具
 * */
    protected OnPlayerChatItem(self_chairID: number, chairID: number, player: QL_Common.TablePlayer, index:string): void {
        var rechair = this.PhysicChair2LogicChair(self_chairID);
        var rechair1 = this.PhysicChair2LogicChair(chairID);       
        cc.log("收到玩家道具消息,发起者"+rechair1+"接收者"+rechair,"玩家实体昵称"+player.NickName+"动画文件索引"+index);
        M_BBMJView.ins.ShowChatItem(rechair1,rechair,index);
    }

    /**
     * 聊天框里的语句
     */
    public get MsgArray() {
        return [
           "大家好,很高兴见到各位",
            "快点吧,我等的花都谢了",
            "不要走,决战到天亮",
            "你的牌打的也太好了",
            "不要吵啦,不要吵啦,专心玩游戏",
            "不好意思，我要离开一会儿",
            "下次咱们再玩吧，我要走了",
            "再见了，我会想念大家的",
            "怎么又掉线了啊,网络怎么差",
            "你是MM还是GG",         
        ];
    }



    /**
     * 游戏场景
     * */
    protected OnGameScene(status: number): void {
        console.log("** 场景消息 **");
        if(this._haveGameScene){
            return;
        }
        this._haveGameScene=true;
        //播放背景音乐
        M_BBMJVoice.PlayBgm(); 
        
        //清理数据
        this.clear();
        
        //通知玩家进入
        //this.node.dispatchEvent(new BBMJEvent(BBMJEvent.msg_playerComeing));
        this.gameView.playerComeing();
    }

    /**
     * 玩家余额发生改变
     * */
    protected OnPlayerScoreChange(): void {
        //M_BBMJView.ins.ReadyStatusUserInfo.refreshSelfScore();
        M_BBMJView.ins.ReadyAndGameUserInfo.refreshSelfScore();
    }

    /**
     * 准备倒计时通知
     * @param timeTick 
     * @returns {} 
     */
    protected OnPlayerReadyTimer(timeTick: number): void {
        if(!this._tableConfig.isValid && this.GameStatus!=QL_Common.TableStatus.gameing)
        {
            this.stopTimer();
            if(timeTick==-1)
            {
                M_BBMJView.ins.TimerView.node.active = false;
            }
            else{
                this.regTimer(BBMJTimerDef.timer_id_ready,timeTick,this.SelfChair);
                M_BBMJView.ins.TimerView.hideArrow();
            }
        }
    }

    /**
     * 一个玩家语音开始播放
     * @param chairID 
     * @returns {} 
     */
    protected OnPlayerVoiceStart(chairID: number) {
        // M_BBMJView.ins.ReadyStatusUserInfo.playerPlayVoice(chairID);
        // M_BBMJView.ins.GameStatusUserInfo.playerPlayVoice(chairID);
    M_BBMJView.ins.ReadyAndGameUserInfo.playerPlayVoice(chairID);

    }

    /**
     * 语音播放结束
     * @param chairID 
     * @returns {} 
     */
    protected OnPlayerVoiceEnd(chairID: number) {
        //M_BBMJView.ins.ReadyStatusUserInfo.playerStopVoice(chairID);
       // M_BBMJView.ins.GameStatusUserInfo.playerStopVoice(chairID);
    M_BBMJView.ins.ReadyAndGameUserInfo.playerStopVoice(chairID);

    }

    /**
     * native环境下，玩家点击开启播放背景声音
     * @returns {} 
     */
    protected OnTurnOnMusic() {
        //由于egret出现bug，我们临时使用这种方法重新播放声音
        //在这里，调用 this.PlaySound() 播放背景音乐
        M_BBMJVoice.PlayBgm();
    }

    /**
     * 当程序从后台返回，网络状态有响应时
     */
    protected OnNetResponding() {
        super.OnNetResponding();
        var reSet: M_BBMJ_GameMessage.CMD_C_ReSetScene = new M_BBMJ_GameMessage.CMD_C_ReSetScene();
        this.SendGameData(reSet);

        //显示桌布
        this.gameView.Init();
    }

    /**
     * 当玩家点击微信分享，但是并没有安装微信时候调用
     * @return 如果处理了这个事件返回true,否则返回false
     */
    protected OnNoInstallWx(): boolean {
        return false;
    }

    /**
     * 按键事件
     */
    protected OnKeyPressed(key: cc.KEY) {
        if (this.isSelfCreateRoom && !this.IsCanExitGame(this.ChairID))
            return false;
        if (key == cc.KEY.escape || key == cc.KEY.back) {
            this.gameView.OnButtonExit();
            return true;
        }
        return false;
    }

    

    /**
     * GameView事件
     * */
    private onGameViewEvent(e:BBMJEvent):void{
        
        switch(e.msgCode){
            //继续游戏
            case BBMJEvent.msg_goongame: {
                console.log("4444444444444444444444444444444444444444444");
                this.clear();
                console.log("555555555555555555555555555555555555555555555");
                if(this._timer.isRuning() && this._timer.TimerID==BBMJTimerDef.timer_id_ready){
              //      M_BBMJView.ins.TimerView.node.active = true;
                }
                e.stopPropagation();
                this.stopTimer();
             //   M_BBMJView.ins.TimerView.node.active = false;
                break;
            }
            //发送准备
            case BBMJEvent.msg_ready:{
                this.SendUserReady();
                this.stopTimer();
              //  M_BBMJView.ins.TimerView.node.active = false;
                e.stopPropagation();
                break;
            }
            //牌阵整理完毕
            case BBMJEvent.msg_arrangeHandCardComplete:{
                this.SendGameData(new M_BBMJ_GameMessage.CMD_C_HoldCardComplete());
                e.stopPropagation();
                break;
            }
            //玩家打出牌
            case BBMJEvent.msg_outACard:{
                this.outCard(<number>e.parm);
                e.stopPropagation();
                break;
            }
            //投票
            case BBMJEvent.msg_vote:{
                this.vote(<number>e.parm);
                e.stopPropagation();
                break;
            }
            //杠牌
            case BBMJEvent.msg_gangCard:{
                
               if(null == e.parm && this._gangCard.length>1){
                    // if(cc.isValid(this.gameView.SelGangView)){
                    //     this.gameView.SelGangView.node.active=true;
                    // }
                    
                    this.gameView.SelGangViewShowGang(this._gangCard);
                }else{
                    this._gamePhase = enGamePhase.GamePhase_Unknown;
                    M_BBMJView.ins.CardView.selfActive.showTingCardToken(null);
                    M_BBMJView.ins.TingTip.showTingTip(null,true);
                    var card :number = (null == e.parm ? this._gangCard[0] : <number>e.parm);
                    var gang : M_BBMJ_GameMessage.CMD_C_Gang = new M_BBMJ_GameMessage.CMD_C_Gang();
                    gang.gangCard = card;
                    this.SendGameData(gang);
                }
                e.stopPropagation();
                break;
            }
            //自摸
            case BBMJEvent.msg_zimo:{
                M_BBMJView.ins.CardView.selfActive.showTingCardToken(null);
                M_BBMJView.ins.TingTip.showTingTip(null,true);

                this._gamePhase = enGamePhase.GamePhase_Unknown;
                this.SendGameData(new M_BBMJ_GameMessage.CMD_C_ZiMo());
                e.stopPropagation();
                break;
            }
            //抢杠
            case BBMJEvent.msg_qiangGang:{
                
                this.qiangGang(<number>e.parm);
                e.stopPropagation();
                break;
            }
            //跑
            case BBMJEvent.msg_pao:{
                this._gamePhase = enGamePhase.GamePhase_Unknown;
                var card :number = <number>e.parm;
                var pao : M_BBMJ_GameMessage.CMD_C_Pao = new M_BBMJ_GameMessage.CMD_C_Pao();
                pao.point = card;
                this.SendGameData(pao);
                e.stopPropagation();
                break;
            }
            //拉
            case BBMJEvent.msg_la:{
                this._gamePhase = enGamePhase.GamePhase_Unknown;
                var card :number = <number>e.parm;
                var la : M_BBMJ_GameMessage.CMD_C_La = new M_BBMJ_GameMessage.CMD_C_La();
                la.point = card;
                this.SendGameData(la);
                e.stopPropagation();
                break;
            }
            default: {
                e.stopPropagation();
                break;
            }
        }
    }

    ///消息处理








    /**
     * 桌子配置this._cellScore=cellScore;
        this._isLaPaoZuo=isLaPaoZuo;
        this._isQiDui=isQiDui;
        this._isGangKai=isGangKai;
        this._isBuKao = isBuKao;
        this._isYiPaoDuoXiang=isYiPaoDuoXiang;
        this._goldRoomBaseIdx = goldRoomBaseIdx;
        * */
    private Handle_CMD_S_TableConfig(msg: GameIF.CustomMessage):void{
        var tableConfig: M_BBMJ_GameMessage.CMD_S_TableConfig = <M_BBMJ_GameMessage.CMD_S_TableConfig>msg;
        this.GameRule["GameData"] = tableConfig;
        this.GameRule["GameData"].ifcansameip = true;
        this._tableConfig.init(
            tableConfig.CellScore,
            tableConfig.LaPaoZuo>0,
            tableConfig.qiduijia>0,         
            tableConfig.gangkaijia>0,
            tableConfig.bukaojia > 0,
            tableConfig.isYiPaoDuoXiang > 0,
            tableConfig.GoldCardBaseIdx,
            tableConfig.IsRecordScoreRoom > 0,
            tableConfig.TableCreatorID,
            tableConfig.TableCreatorChair,
            tableConfig.TableCode,
            tableConfig.SetGameNum,
            tableConfig.GameNum,
            tableConfig.RealGameNum,
            tableConfig.isOutTimeOp>0,
            tableConfig.isSaveTable>0,
            tableConfig.saveTableTime,
            tableConfig.tableCreatorPay,
            tableConfig.tableCost,
            tableConfig.IfCanSameIP, 

            tableConfig.IfCanBaoTing,

            tableConfig.isChuHunJiaFan,

            tableConfig.IfCanHu7Dui,
            tableConfig.ifCanTianHu,
            tableConfig.GangLeJiuYou,
            tableConfig.GuoHuBuHu,
            tableConfig.RulePeng,
            tableConfig.MaShu,
            tableConfig.CheckGps,
            tableConfig.PeopleNum,
            tableConfig.OutCardTime,
            tableConfig.GroupId,
            tableConfig.BuBuGao,
                   
        );

        M_BBMJView.ins.ReadyAndGameUserInfo.refreshSelfScore();
        M_BBMJView.ins.GameInfo.init();
        M_BBMJView.ins.GameInfo.SetGameNum(this._tableConfig.alreadyGameNum,this._tableConfig.setGameNum);
        M_BBMJView.ins.GameInfo.tableCode = tableConfig.TableCode;
        M_BBMJView.ins.ReadyAndGameUserInfo.SelfReady();
       
        //设置分享内容
        if(this._tableConfig.isValid){
            this._shareContext = this._tableConfig.shareContext;
        }
        if(this._tableConfig.needHideUserMoney){
            M_BBMJView.ins.ReadyAndGameUserInfo.hideUserMoney();
        }
        if(this.getTableStauts()!=QL_Common.TableStatus.gameing)
            this.showWanfa();

        
    }
    /**
     * 游戏开始
     * */
    private Handle_CMD_S_Start(msg: GameIF.CustomMessage):void{
        var gameStart: M_BBMJ_GameMessage.CMD_S_Start = <M_BBMJ_GameMessage.CMD_S_Start>msg;
        this.clear();
        this._isIgnoreForceLeft=false;
        this.gameView.GameStart();
        //设置分享玩家信息
        //this.gameView.GameJiFenBan.SetPlayerData();
        this.gameView.PlayFenXiang.SetPlayerData(gameStart.gameNum);
        M_BBMJView.ins.showGameNum(gameStart.totalGameNum,gameStart.gameNum,gameStart.realGameNum);
                if(cc.isValid(M_BBMJView.ins.TipMsgView)){
            M_BBMJView.ins.TipMsgView.node.active=false;
            M_BBMJView.ins.TipMsgView.node.destroy();
        }
        
        for(var m:number=0; m<BBMJMahjongDef.gPlayerNum; m++){
            if(null == this.TablePlayer[m]) {
                continue;
            }
            //如果非断线玩家,设置成游戏状态
            if(QL_Common.GState.OfflineInGame != this.TablePlayer[m].PlayerState){
                this.TablePlayer[m].PlayerState = QL_Common.GState.Gaming;
            }
            
        }
        
        // if(this.isSelfCreateRoom){
        //     var sameIPPlayer :Array<string> = new Array<string>();
            
        //     for(var i:number=0; i<BBMJMahjongDef.gPlayerNum-1; i++){
                
        //         var checkIPPlayer :string = i.toString();
                
        //         for(var j:number=i+1; j<BBMJMahjongDef.gPlayerNum; j++){
        //             if(this.TablePlayer[i].UserIP == this.TablePlayer[j].UserIP){
        //                 checkIPPlayer+=`,${j}`;
        //             }
        //         }
                
        //         //检查本次收到的是否全部包含在其他集合中
        //         if(checkIPPlayer.length > 1){
                    
        //             var add:boolean=true;
                    
        //             for(var m:number=0; m<sameIPPlayer.length; m++){
        //                 if(sameIPPlayer[m].indexOf(checkIPPlayer) >= 0){
        //                     add=false;
        //                     break;
        //                 }
        //             }
                    
        //             if(add){
        //                 sameIPPlayer.push(checkIPPlayer);
        //             }
        //         }
        //     }
            
            
        //     if(sameIPPlayer.length > 0){
                
        //         var tipMsg:string="";
                
        //         for(var n:number=0; n<sameIPPlayer.length; n++){
        //             var chairAry: Array<string> = sameIPPlayer[n].split(",");
        //             if(chairAry.length > 1){
        //                 for(var x:number=0; x<chairAry.length; x++){
        //                     tipMsg += `玩家:${this.TablePlayer[parseInt(chairAry[x])].NickName}${x == (chairAry.length - 1) ? "":","}`;
        //                 }
        //                 tipMsg+="  IP相同";
        //             }
        //             if(n != (sameIPPlayer.length - 1)){
        //                 tipMsg+=" | ";
        //             }
        //         }
                
        //         if(tipMsg.length > 0){
        //            // M_BBMJView.ins.TipMsgView.showTip(tipMsg,true,4);
        //            this.UiManager.ShowTip(tipMsg);
        //         }
                
        //     }
        // }else{
        //     var tableCostName = TranslateMoneyTypeName(this.RoomClient.TableCostMoneyType);
        //     var tableCostNum = this.RoomClient.TableCost;
        //     if (tableCostNum > 0) {
        //         var tipMsg = `游戏已经开始，每局扣除桌费${tableCostNum}${tableCostName}`;
        //         this.UiManager.ShowTip(tipMsg);
        //     }
        // }
    }
    /**
     * 骰子数据
     * */
    private Handle_CMD_S_SZInfo(msg: GameIF.CustomMessage):void{
        var sz: M_BBMJ_GameMessage.CMD_S_SZInfo = <M_BBMJ_GameMessage.CMD_S_SZInfo>msg;
        this._bankerChair = sz.bankerChair;
        this._lianBanker=sz.lianBanker;
        this._sz1 = sz.sz1;
        this._sz2 = sz.sz2;
        
        //显示庄家
       // M_BBMJView.ins.GameStatusUserInfo.bankerChair = this._bankerChair;
        M_BBMJView.ins.ReadyAndGameUserInfo.bankerChair = this._bankerChair;
       
        
    }

    private Handle_CMD_S_StartPao():void{
        this._gamePhase=enGamePhase.GamePhase_Pao;
        M_BBMJView.ins.PaoView.node.active=true;
        //this.regTimer(BBMJTimerDef.timer_id_vote,BBMJTimerDef.timer_len_vote,this.SelfChair);
    }

    private Handle_CMD_S_StartLa():void{
        this._gamePhase=enGamePhase.GamePhase_La;
        M_BBMJView.ins.LaView.node.active=true;
        //this.regTimer(BBMJTimerDef.timer_id_vote,BBMJTimerDef.timer_len_vote,this.SelfChair);
    }
    private Handle_CMD_S_PlayerPaoInfo(msg: GameIF.CustomMessage):void{
        var pao: M_BBMJ_GameMessage.CMD_S_PlayerPaoInfo = <M_BBMJ_GameMessage.CMD_S_PlayerPaoInfo>msg;

        //M_BBMJView.ins.GameStatusUserInfo.SetPao(pao.points);
    }
    private Handle_CMD_S_PlayerLaInfo(msg: GameIF.CustomMessage):void{
        var la: M_BBMJ_GameMessage.CMD_S_PlayerLaInfo = <M_BBMJ_GameMessage.CMD_S_PlayerLaInfo>msg;

       // M_BBMJView.ins.GameStatusUserInfo.SetLa(la.points);
    }

    /**
     * 初始化牌
     * */
    private Handle_CMD_S_InitCard(msg: GameIF.CustomMessage): void {
        var initCard: M_BBMJ_GameMessage.CMD_S_InitCard = <M_BBMJ_GameMessage.CMD_S_InitCard>msg;
        this._handCard.splice(0,this._handCard.length);
        for(var i:number=0; i<initCard.cardAry.length; i++){
            if(BBMJMahjongDef.gInvalidMahjongValue != initCard.cardAry[i]){
                this._handCard.push(initCard.cardAry[i]);
            }
        }
    }
    /**
     * 游戏ID
     * */
    private Handle_CMD_S_GameID(msg: GameIF.CustomMessage): void {
        var gameid: M_BBMJ_GameMessage.CMD_S_GameID = <M_BBMJ_GameMessage.CMD_S_GameID>msg;
        this._gameid = gameid.gameid;
    }
    /**
     * 开始发牌
     * */
    private Handle_CMD_S_StartSendCard(msg: GameIF.CustomMessage): void {
        var startSendCard: M_BBMJ_GameMessage.CMD_S_StartSendCard = <M_BBMJ_GameMessage.CMD_S_StartSendCard>msg;
        this._gamePhase = enGamePhase.GamePhase_SendCard;
        //this.node.dispatchEvent(new BBMJEvent(BBMJEvent.msg_startSendCard));
        this.gameView.StartSendCard();
    }
    /**
     * 玩家手牌数据
     * */
    private Handle_CMD_S_HandCardData(msg: GameIF.CustomMessage):void{
        var handCard : M_BBMJ_GameMessage.CMD_S_HandCardData = <M_BBMJ_GameMessage.CMD_S_HandCardData>msg;
        this._handCard.splice(0,this._handCard.length);
        for(var i:number=0; i<handCard.handCardData.length; i++){
            this._handCard.push(handCard.handCardData[i]);
        }
        
        BBMJMahjongAlgorithm1.sortCardAry(this._handCard);
        this._handCard=BBMJMahjongAlgorithm1.sortCardAry1(this._handCard,this.GetHunCardAry());
        this.gameView.CardView.selfActive.refreshHandCardData(this._handCard);
    }
    /**
     * 玩家抓牌
     * */
    private Handle_CMD_S_PlayerHoldCard(msg: GameIF.CustomMessage): void {
        var playerHoldCard: M_BBMJ_GameMessage.CMD_S_PlayerHoldCard = <M_BBMJ_GameMessage.CMD_S_PlayerHoldCard>msg;

        this._outCardPlayer.clear();
        
        if((this.SelfChair == playerHoldCard.chair) && (BBMJMahjongDef.gInvalidMahjongValue != playerHoldCard.card)){
            this._handCard.push(playerHoldCard.card);
        }
        
        
        M_BBMJView.ins.GameInfo.holdACard();
        if(!this.is2D()){
            M_BBMJView.ins.CardView.PaiQiangInfo.holdACard();
        }
        //玩家抓牌
        M_BBMJView.ins.CardView.playerHoldCard(playerHoldCard.chair,playerHoldCard.card);
        if((this.SelfChair == playerHoldCard.chair) && (BBMJMahjongDef.gInvalidMahjongValue != playerHoldCard.card)){
            M_BBMJView.ins.CardView.selfActive.setUpCardDown();
        }
    }
    /**
     * 当前活动玩家
     * */
    private Handle_CMD_S_ActivePlayer(msg: GameIF.CustomMessage): void {

        var activePlayer: M_BBMJ_GameMessage.CMD_S_ActivePlayer = <M_BBMJ_GameMessage.CMD_S_ActivePlayer>msg;
        this._gamePhase = enGamePhase.GamePhase_PlayerOP;
        this._activePlayer = activePlayer.playerChair;
        M_BBMJView.ins.CardView.selfActive.activeEnable(false);
            if(cc.isValid(M_BBMJView.ins.OperatorView)){
            M_BBMJView.ins.OperatorView.node.active=false;
        }
        if(cc.isValid(M_BBMJView.ins.SelGangView)){
                    M_BBMJView.ins.SelGangView.node.active=false;
                }
        //注册计时器
        if(this.TableConfig._OutCardTime<2){
            this.regTimer(BBMJTimerDef.timer_id_playerop,activePlayer.timer+10*this.TableConfig._OutCardTime+10,this._activePlayer);
        }else{
             this.regTimer(BBMJTimerDef.timer_id_playerop,activePlayer.timer,this._activePlayer);
        }
        
    }
    /**
     * 我的投票权限
     * */
    private Handle_CMD_S_VoteRight(msg: GameIF.CustomMessage): void {
        var voteRight: M_BBMJ_GameMessage.CMD_S_VoteRight = <M_BBMJ_GameMessage.CMD_S_VoteRight>msg;
        this._gamePhase = enGamePhase.GamePhase_Vote;
        this._voteRight = voteRight.voteRight;
        // if(this._voteRight==BBMJMahjongDef.gVoteRightMask_Ting){
        //     console.log("我的投票权限里  条件true  有听权限");
        //     M_BBMJView.ins.OperatorViewShowOP(false,0,false,true,true,false)
        // }else{
            console.log("我的投票权限里  条件false  无听权限");
            this._canVote= true;
            this.scheduleOnce(function () {
                if(this._canVote==true&&!this._tableConfig.isValid)
                this._canVote=false;
            }.bind(this), 12)
             M_BBMJView.ins.OperatorViewShowOP(BBMJMahjongAlgorithm1.CheckVoteRight_Peng(this._voteRight),
                                            BBMJMahjongAlgorithm1.CheckVoteRight_Gang(this._voteRight)?1:0,
                                            BBMJMahjongAlgorithm1.CheckVoteRight_Hu(this._voteRight),
                                            false,
                                            true,false);
                                            
      //  }
       if(this.TableConfig._OutCardTime<2){
             this.regTimer(BBMJTimerDef.timer_id_vote,BBMJTimerDef.timer_len_vote+10*(this.TableConfig._OutCardTime+1),this.SelfChair);
       }else{
          this.regTimer(BBMJTimerDef.timer_id_vote,BBMJTimerDef.timer_len_vote,this.SelfChair);
       }
      
    } 




    /**
     *播放放大效果  
    **/
     private splashUserOutMj(chair,outPai){
        if(chair != this.SelfChair)
            M_BBMJView.ins.mg_out.showOutPai(chair,outPai,BBMJ.ins.iclass);
    }

    /**
     * 玩家打出牌
     * */
    private Handle_CMD_S_PlayerOutCard(msg: GameIF.CustomMessage): void {
        this.oncebuhua=false;
        this.realoncebuhua = true;
        var playerOutCard: M_BBMJ_GameMessage.CMD_S_PlayerOutCard = <M_BBMJ_GameMessage.CMD_S_PlayerOutCard>msg;
        M_BBMJView.ins.CardView.hideOutCardArrow();
        
        this._outCardPlayer.playerOutCard(playerOutCard.chair,playerOutCard.card);

        // this.splashUserOutMj(playerOutCard.chair,playerOutCard.card);

        this._recordCard.outACard(playerOutCard.card);
        let sex:number=this.TablePlayer[playerOutCard.chair].Gender==1?1:2;
        
        M_BBMJVoice.PlayCardType(`/sound/dapai.mp3`);
        //播放音效,todo
         if(this.AudioManager.VoiceType==VoiceType.Mandarin){//如果是普通话
          M_BBMJVoice.PlayCardType(`/sound/PT/${sex}/mj_${sex}_${BBMJMahjongAlgorithm1.GetMahjongColor(playerOutCard.card)}_${BBMJMahjongAlgorithm1.GetMahjongValue(playerOutCard.card)}.mp3`);
         }else{
        // M_BBMJVoice.PlayCardType(`/sound/${sex}/mj_${sex}_${BBMJMahjongAlgorithm1.GetMahjongColor(playerOutCard.card)}_${BBMJMahjongAlgorithm1.GetMahjongValue(playerOutCard.card)}.mp3`);

        //M_BBMJVoice.PlayDiaCardType(`resources/gameres/M_BBMJ/sound/dialectsound/${sex}/dsmj_${sex}_${BBMJMahjongAlgorithm.GetMahjongColor(playerOutCard.card)}_${BBMJMahjongAlgorithm.GetMahjongValue(playerOutCard.card)}.mp3`);
         }
        if(this._outCardPlayer.isValid){
            M_BBMJView.ins.CardView.addCard2Pool(this._outCardPlayer.Chair,this._outCardPlayer.Card);
        }
           
        //活动牌阵处理
        M_BBMJView.ins.CardView.playerOutCard(playerOutCard.chair,playerOutCard.card);
       
       
  

   
        //如果是自己
        if(this.SelfChair == playerOutCard.chair){
            this.showHideCard(0);
            BBMJMahjongAlgorithm1.delCard(this._handCard,[playerOutCard.card]);
            BBMJMahjongAlgorithm1.sortCardAry(this._handCard);
            this._handCard=BBMJMahjongAlgorithm1.sortCardAry1(this._handCard,this.GetHunCardAry());
            // let str="服务端出2牌"
            // for(let i=0;i<this._handCard.length;i++){
            //     str+=" "+this._handCard[i];
            // }
            // console.log(str);
            M_BBMJView.ins.CardView.selfActive.activeEnable(false);
            M_BBMJView.ins.CardView.selfActive.refreshHandCardData(this._handCard);
            
            if(cc.isValid(M_BBMJView.ins.OperatorView)){
                M_BBMJView.ins.OperatorView.node.active=false;
            }
            if(cc.isValid(M_BBMJView.ins.SelGangView)){
                M_BBMJView.ins.SelGangView.node.active=false;
            }
            if(cc.isValid(M_BBMJView.ins.TimerView)){
                M_BBMJView.ins.TimerView.hideArrow();
            }
            M_BBMJView.ins.CardView.selfActive.allDown();

            M_BBMJView.ins.CardView.selfActive.showTingCardToken(null);
            M_BBMJView.ins.TingTip.showTingTip(null,true);
            //判断玩家听哪些牌，显示听牌提示按钮
            this._isTing = BBMJMahjongAlgorithm.GetTingCardArray(this._handCard);
            this.gameView.TingBtn(this._isTing.length>0);
            if(this._isTing){
                this.showTingCard(0,3000,true);
            }

        }
            

        }
    
        
    
    // else{
    //         console.log("-----------变--牌变--牌---------")
    //          if(this._isTing){
    //             for(var k=0;k<4;k++)
    //            {
    //          for(var i=0;i<M_BBMJView.ins.CardView.getFixed(k)._fixedData.length;i++)
    //         {
    //             if(M_BBMJView.ins.CardView.getFixed(k)._fixedData[i].fixedType==enFixedCardType.FixedCardType_AGang)
    //             {
               
                
    //             var url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei1/pb1_showcard_self_1280`;
    //             SetTextureRes(url,M_BBMJView.ins.CardView.getFixed(k)._fixedData[i].bmp_cardbackAry[3]);
                 
    //              console.log("-----------变--牌变--牌---------")
    //             M_BBMJView.ins.CardView.getFixed(k)._fixedData[i].bmp_cardcolorAry[1].node.active=true;
    //         }}
    //            }}
    // }

    //玩家续局投票
    private Hanle_CMD_S_AddGameNum(msg:GameIF.CustomMessage):void{
        var addGameNum : M_BBMJ_GameMessage.CMD_S_AddGameNum = <M_BBMJ_GameMessage.CMD_S_AddGameNum>msg;

        if(addGameNum.gameNum == 100){//所有玩家同意续局
            cc.log("-----全部同意续局-----");
            this._addNum = addGameNum.addNum;

            if(M_BBMJView.ins.JieShuanView.isVisible()){
                M_BBMJView.ins.JieShuanView.node.active = false;
            }

            this.OnPlayerStatusChange(this.SelfChair,QL_Common.GState.PlayerReady);
            M_BBMJView.ins.ReadyAndGameUserInfo.group_userReady.active = true;
            M_BBMJView.ins.ReadyAndGameUserInfo.btn_ready.node.active = true;
            M_BBMJView.ins.ReadyAndGameUserInfo.btn_ready.node.x=0;
            // M_BBMJView.ins.ReadyAndGameUserInfo.btn_invite.node.active=false;
            M_BBMJView.ins.ReadyAndGameUserInfo.group_imgready[0].node.active = false;
            
        }
        if(addGameNum.gameNum == 101){//有玩家钻石不足
            Global.Instance.UiManager.CloseUi(UIName.ResumeGame);
            if(!M_BBMJView.ins.JieShuanView.isVisible()){
                this.TablePlayer[this.SelfChair].PlayerState = 0;
                this.exit();
            }
        }
       
            // if(M_BBMJView.ins.JieShuanView.isVisible()){
            //     M_BBMJView.ins.JieShuanView.node.active = false;
            // }
    }


    /**
     * 删除玩家牌池牌
     * */
    private Handle_CMD_S_DelPoolCard(msg: GameIF.CustomMessage): void {
        var DelCard: M_BBMJ_GameMessage.CMD_S_DelPoolCard = <M_BBMJ_GameMessage.CMD_S_DelPoolCard>msg;    
        M_BBMJView.ins.CardView.delCardinPool(DelCard.chair,DelCard.card,DelCard.cardnum);
    }

    /**
     * 玩家碰牌
     * */
    private Handle_CMD_S_PlayerPengCard(msg: GameIF.CustomMessage): void {
        var playerPeng: M_BBMJ_GameMessage.CMD_S_PlayerPengCard = <M_BBMJ_GameMessage.CMD_S_PlayerPengCard>msg;
        
        let sex:number=this.TablePlayer[playerPeng.chair].Gender==1?1:2;
        //音效
        M_BBMJVoice.PlayCardType(`/sound/1/peng_${sex}.mp3`);
        
        //动画
        M_BBMJView.ins.playBBMJAni(playerPeng.chair,enBBMJAniType.aniType_peng);
        M_BBMJView.ins.CardView.hideOutCardArrow();
        //清理玩家打出的牌
        this._outCardPlayer.clear();
        
        //处理碰牌
        M_BBMJView.ins.CardView.playerPeng(playerPeng.chair,playerPeng.card,playerPeng.outChair);
        this._recordCard.pengACard(playerPeng.card);
        //如果是自己
        if(this.SelfChair == playerPeng.chair){
            BBMJMahjongAlgorithm1.delCard(this._handCard,[playerPeng.card,playerPeng.card]);
            BBMJMahjongAlgorithm1.sortCardAry(this._handCard);
            this._handCard=BBMJMahjongAlgorithm1.sortCardAry1(this._handCard,this.GetHunCardAry());
            
            
        }
    }
    /**
     * 玩家暗杠
     * */
    private Handle_CMD_S_PlayerAnGangCard(msg: GameIF.CustomMessage): void {
        var playerAGang: M_BBMJ_GameMessage.CMD_S_PlayerAnGangCard = <M_BBMJ_GameMessage.CMD_S_PlayerAnGangCard>msg;
        
        let sex:number=this.TablePlayer[playerAGang.chair].Gender==1?1:2;
        // 音效
        M_BBMJVoice.PlayCardType(`/sound/1/gang_${sex}.mp3`);

        //动画
        M_BBMJView.ins.playBBMJAni(playerAGang.chair,enBBMJAniType.aniType_anGang);
        
        //处理暗杠牌
        M_BBMJView.ins.CardView.playerAGang(playerAGang.chair,playerAGang.card);
        this._recordCard.gangACard(playerAGang.card);
        //如果是自己
        if(this.SelfChair == playerAGang.chair) {
            BBMJMahjongAlgorithm1.delCard(this._handCard,[playerAGang.card,playerAGang.card,playerAGang.card,playerAGang.card]);
            BBMJMahjongAlgorithm1.sortCardAry(this._handCard);
           this._handCard=BBMJMahjongAlgorithm1.sortCardAry1(this._handCard,this.GetHunCardAry());
            
            this._recordCard.gangACard(playerAGang.card);
        }
    }
    /**
     * 玩家明杠/直杠
     * */
    private Handle_CMD_S_PlayerMingGang(msg: GameIF.CustomMessage): void {
        var playerMGang: M_BBMJ_GameMessage.CMD_S_PlayerMingGang = <M_BBMJ_GameMessage.CMD_S_PlayerMingGang>msg;
        
        let sex:number=this.TablePlayer[playerMGang.chair].Gender==1?1:2;
        // 音效
        M_BBMJVoice.PlayCardType(`/sound/1/gang_${sex}.mp3`);

        //动画
        M_BBMJView.ins.playBBMJAni(playerMGang.chair,enBBMJAniType.aniType_minggGang);
        M_BBMJView.ins.CardView.hideOutCardArrow();
        this._outCardPlayer.clear();
        //M_BBMJView.ins.OutCardView.show = false;
        
        //处理明杠牌
        M_BBMJView.ins.CardView.playerMGang(playerMGang.chair,playerMGang.card,playerMGang.outChair);
        this._recordCard.gangACard(playerMGang.card);
        //如果是自己
        if(this.SelfChair == playerMGang.chair) {
            BBMJMahjongAlgorithm1.delCard(this._handCard,[playerMGang.card,playerMGang.card,playerMGang.card]);
            BBMJMahjongAlgorithm1.sortCardAry(this._handCard);
            this._handCard=BBMJMahjongAlgorithm1.sortCardAry1(this._handCard,this.GetHunCardAry());
            
        }
    }
    /**
     * 玩家补杠/巴杠
     * */
    private Handle_CMD_S_PlayerBuGangCard(msg: GameIF.CustomMessage): void {
        var playerBGang: M_BBMJ_GameMessage.CMD_S_PlayerBuGangCard = <M_BBMJ_GameMessage.CMD_S_PlayerBuGangCard>msg;
        
        let sex:number=this.TablePlayer[playerBGang.chair].Gender==1?1:2;
        // 音效
        M_BBMJVoice.PlayCardType(`/sound/1/gang_${sex}.mp3`);

        //动画
        M_BBMJView.ins.playBBMJAni(playerBGang.chair,enBBMJAniType.aniType_minggGang);
        
        //处理补杠牌
        M_BBMJView.ins.CardView.playerBGang(playerBGang.chair,playerBGang.card);
        this._recordCard.gangACard(playerBGang.card);
        //如果是自己
        if(this.SelfChair == playerBGang.chair) {
            BBMJMahjongAlgorithm1.delCard(this._handCard,[playerBGang.card]);
            BBMJMahjongAlgorithm1.sortCardAry(this._handCard);
          this._handCard=BBMJMahjongAlgorithm1.sortCardAry1(this._handCard,this.GetHunCardAry());
            
        }
    }

    /**
     * 玩家胡牌
     * */
    private Handle_CMD_S_PlayerHuCard(msg: GameIF.CustomMessage): void {
        var playerHu: M_BBMJ_GameMessage.CMD_S_PlayerHuCard = <M_BBMJ_GameMessage.CMD_S_PlayerHuCard>msg;
        this.fankai= true;
        let sex:number=this.TablePlayer[playerHu.chair].Gender==1?1:2;
        // M_BBMJView.ins.GameInfo.init();
        switch(playerHu.huType){
            case enHuCardType.HuCardType_GangShaPao:
            case enHuCardType.HuCardType_PingHu:{
                //清理玩家打出的牌
                this._outCardPlayer.clear();
                M_BBMJVoice.PlayCardType(`/sound/1/hu_${sex}.mp3`);

                M_BBMJView.ins.playBBMJAni(playerHu.chair,enBBMJAniType.aniType_huCard);
                break;
            }
            case enHuCardType.HuCardType_QiangGangHu:{
                M_BBMJVoice.PlayCardType(`/sound/1/hu_${sex}.mp3`);
                M_BBMJView.ins.playBBMJAni(playerHu.chair,enBBMJAniType.aniType_huCard);
                this._recordCard.outACard(playerHu.card);
                break;
            }
            case enHuCardType.HuCardType_ZiMo:{
                M_BBMJVoice.PlayCardType(`/sound/1/zimo_${sex}.mp3`);
                M_BBMJView.ins.playBBMJAni(playerHu.chair,enBBMJAniType.aniType_ziMo);
                this._recordCard.outACard(playerHu.card);
                break;
            }
            case enHuCardType.HuCardType_GangShangHua:{
               M_BBMJVoice.PlayCardType(`/sound/1/zimo_${sex}.mp3`);
                M_BBMJView.ins.playBBMJAni(playerHu.chair,enBBMJAniType.aniType_ziMo);
                this._recordCard.outACard(playerHu.card);
                break;
            }
        }



        this._alreadyHu=true;

    }
    /**
     * 当前操作玩家
     * */
    private Handle_CMD_S_OpPlayer(msg: GameIF.CustomMessage): void {
        var op: M_BBMJ_GameMessage.CMD_S_OpPlayer = <M_BBMJ_GameMessage.CMD_S_OpPlayer>msg;
        this.oncebuhua=true;
        this.realoncebuhua = true;
        //隐藏听牌提示按钮
        this.gameView.TingTip.node.active=false;
        this.gameView.TingBtn(false);
        this._gangCard.splice(0,this._gangCard.length);
        if((null != op.gangCard) && (op.gangCard.length > 0)){
            for(var i:number=0; i<op.gangCard.length; i++){
                this._gangCard.push(op.gangCard[i]);
            }
        }
    
        if((this._gangCard.length > 0) || (op.ifCanZiMo > 0)){
            this._canVote=true;
            // if(this._gangCard.length > 1){
                
            //     M_BBMJView.ins.SelGangViewShowGang(this._gangCard);
                
            // }
            
            console.log("当前操作玩家  刚拍数量"+this._gangCard.length)
            M_BBMJView.ins.OperatorViewShowOP(false,this._gangCard.length,op.ifCanZiMo > 0,false,true,true);
        }
        
        M_BBMJView.ins.CardView.selfActive.refreshCardStatus();
        if((this._gangCard.length <= 0) && (op.ifCanZiMo <= 0)){
            M_BBMJView.ins.CardView.selfActive.standPai();
        }
        
        // //检查打出哪些牌可以听牌
        // var tingToken: Array<number> = BBMJMahjongAlgorithm1.GetLastCardToTing(this._handCard);

       // BBMJMahjongAlgorithmHaveHunLhh.IsCanHu7Dui=this._tableConfig.IfCanHu7Dui;
        var tingToken: Array<number> = BBMJMahjongAlgorithm.GetLastCardToTing(this._handCard);
      
        //console.log("听牌"+tingToken.length)
        M_BBMJView.ins.CardView.selfActive.showTingCardToken(tingToken);
    }
    /**
     * 开始抢杠
     * */
    private Handle_CMD_S_QiangGang(msg: GameIF.CustomMessage): void {
        var startQiangGang: M_BBMJ_GameMessage.CMD_S_QiangGang = <M_BBMJ_GameMessage.CMD_S_QiangGang>msg;
        
        this._gamePhase = enGamePhase.GamePhase_QiangGang;
        this._ifCanQiangGang=true;
        
        M_BBMJView.ins.QiangGangViewShowQiangGang(startQiangGang.card);

        
        //注册计时器
        if(this.TableConfig._OutCardTime<2){
             this.regTimer(BBMJTimerDef.timer_id_qianggang,BBMJTimerDef.timer_len_qianggang+10*(this.TableConfig._OutCardTime+1),this.SelfChair);
        }else{
        this.regTimer(BBMJTimerDef.timer_id_qianggang,BBMJTimerDef.timer_len_qianggang,this.SelfChair);
        }
    }
    /**
     * 删除抢杠牌
     * */
    private Handle_CMD_S_DelQiangGangCard(msg: GameIF.CustomMessage):void{
        var qiangGangCard : M_BBMJ_GameMessage.CMD_S_DelQiangGangCard = <M_BBMJ_GameMessage.CMD_S_DelQiangGangCard>msg;
        M_BBMJView.ins.CardView.selfActive.outACard(qiangGangCard.card);
        BBMJMahjongAlgorithm1.delCard(this._handCard,[qiangGangCard.card]);
        BBMJMahjongAlgorithm1.sortCardAry(this._handCard);
       this._handCard=BBMJMahjongAlgorithm1.sortCardAry1(this._handCard,this.GetHunCardAry());
       
    }
    /**
     * 某个玩家手中牌
     * */
    private Handle_CMD_S_PlayerCardData(msg: GameIF.CustomMessage): void {
        var playerCardData: M_BBMJ_GameMessage.CMD_S_PlayerCardData = <M_BBMJ_GameMessage.CMD_S_PlayerCardData>msg;
        BBMJMahjongAlgorithm1.sortCardAry(playerCardData.handCard);
       playerCardData.handCard=BBMJMahjongAlgorithm1.sortCardAry1(playerCardData.handCard,this.GetHunCardAry());
        M_BBMJView.ins.CardView.getActive(playerCardData.chair).showLieCard(playerCardData.handCard,playerCardData.huCard);
        M_BBMJView.ins.CardView.getActive(playerCardData.chair).activeEnable(false);
    }
    /**
     * 本局结算结果
     * */
    private Handle_CMD_S_Balance(msg: GameIF.CustomMessage): void {
        this.oncebuhua=false;
        this.realoncebuhua = true;
        var balance: M_BBMJ_GameMessage.CMD_S_Balance = <M_BBMJ_GameMessage.CMD_S_Balance>msg;
        
        this._outCardPlayer.clear();
        if(cc.isValid(this.gameView.OperatorView)){
            this.gameView.OperatorView.node.active=false;
        }
        
        if(cc.isValid(this.gameView.QiangGangView)){
            this.gameView.QiangGangView.node.active=false;
        }
        
        if(cc.isValid(this.gameView.SelGangView)){
            this.gameView.SelGangView.node.active=false;
        }
        this.gameView.TingBtn(false);
        this.gameView.TingTip.node.active=false;
        this.stopTimer();

        var recordData:Array<number> = new Array<number>();
        for(var i:number=0; i<balance.playerBalance.length; i++){
            recordData.push(balance.playerBalance[i].TotalScore);
        }
        //M_BBMJView.ins.GameJiFenBan.gameRecord(recordData);
        M_BBMJView.ins.PlayFenXiang.gameRecord(recordData); 
        // if(balance.MaPai.length>0){
        // M_BBMJView.ins.CardView.showFanMa(balance.MaPai);   
        //  this.scheduleOnce(() => {
        //     M_BBMJView.ins.JieShuanView.showJieShuan(balance);
        //     if (this.TableConfig.isPlayEnoughGameNum) {
        //         if (cc.isValid(M_BBMJView.ins.DissTable)) {
        //             M_BBMJView.ins.DissTable.node.active = false;
        //             M_BBMJView.ins.DissTable.node.destroy();
        //         }

        //     }
        //      M_BBMJView.ins.CardView.HideFanMa();
        //      this.gameView.TimerView.clearAction();
        //     M_BBMJView.ins.UserData.node.active = false;
        // }, 3); 
        // }else{
             M_BBMJView.ins.JieShuanView.showJieShuan(balance);
            if (this.TableConfig.isPlayEnoughGameNum) {
                if (cc.isValid(M_BBMJView.ins.DissTable)) {
                    M_BBMJView.ins.DissTable.node.active = false;
                    M_BBMJView.ins.DissTable.node.destroy();
                }

            }

            M_BBMJView.ins.UserData.node.active = false;
      //  } 
        

           


    }

    /**
     * 新的游戏回合开始
     * */
    private Handle_CMD_S_NewGameRound(msg: GameIF.CustomMessage): void {
        //新的回合开始
        //M_BBMJView.ins.GameJiFenBan.gameroundStart();
    }
    
    /**
     * 记分板数据结果
     * */
    private Handle_CMD_S_GameRecordResult(msg: GameIF.CustomMessage): void {
        var data : M_BBMJ_GameMessage.CMD_S_GameRecordResult = <M_BBMJ_GameMessage.CMD_S_GameRecordResult>msg;
        //M_BBMJView.ins.GameJiFenBan.gameRecordDataCome(data.record);
        M_BBMJView.ins.PlayFenXiang.HuGangCount(data);
        M_BBMJView.ins.PlayFenXiang.gameRecordDataCome(data.record);
    }
    /**
     * 强制玩家离开
     * */
    private Handle_CMD_S_ForceUserLeft(msg: GameIF.CustomMessage): void {
        var forceLeft : M_BBMJ_GameMessage.CMD_S_ForceUserLeft = <M_BBMJ_GameMessage.CMD_S_ForceUserLeft>msg;
        if(this._isIgnoreForceLeft){
            return;
        }
        this.UiManager.ShowTip(forceLeft.msg);
        //this.ShowMessageBox(forceLeft.msg);
        //this.ForceQuitting();
    }
    /**
     * 保留桌子成功
     * */
    private Handle_CMD_S_SaveTableSuccess(msg: GameIF.CustomMessage):void{
        this.ForceQuitting();
    }
    /*玩家头像显示听*/
    private Handle_CMD_S_Ting(msg: GameIF.CustomMessage): void {
        
        var playerTing: M_BBMJ_GameMessage.CMD_S_Ting = <M_BBMJ_GameMessage.CMD_S_Ting>msg;
        M_BBMJView.ins.ReadyAndGameUserInfo.Ting=playerTing.TingNum;
       
        // for (var i = 0; i < M_BBMJView.ins.CardView.getFixed(playerTing.TingNum)._fixedData.length; i++) {
        //     if (M_BBMJView.ins.CardView.getFixed(playerTing.TingNum)._fixedData[i].fixedType == enFixedCardType.FixedCardType_AGang) {
        //         this._recordCard.gangACard(M_BBMJView.ins.CardView.getFixed(playerTing.TingNum)._fixedData[i].cardValue);
        //         M_BBMJView.ins.CardView.getFixed(playerTing.TingNum)._fixedData[i].bmp_cardcolorAry[3].node.active = false;
        //     }
        // }
    }

     private Handle_CMD_S_IsDissolution(msg:GameIF.CustomMessage):void

    {
        var busy: M_BBMJ_GameMessage.CMD_S_IsDissolution = <M_BBMJ_GameMessage.CMD_S_IsDissolution>msg;
        if(busy.IsDissolution==true){
            this.gameView.showMsg();

        }

    }

    /**
     * 
     * @param msg 显示服务端版本号
     */
        private Handle_CMD_S_Version(msg:GameIF.CustomMessage):void

        {
        // var VS: M_BBMJ_GameMessage.CMD_S_Version = <M_BBMJ_GameMessage.CMD_S_Version>msg;
        // M_BBMJView.ins.Help.SV.string="SV"+VS.Version;
        }




    /**
     * 玩家准备
     */
    private Handle_CMD_S_UseReady(msg: GameIF.CustomMessage):void{
        var ReadyUser:M_BBMJ_GameMessage.CMD_S_UseReady=<M_BBMJ_GameMessage.CMD_S_UseReady>msg;
        // //非断线状态玩家状态改为准备状态
        // if(QL_Common.GState.OfflineInGame != this.TablePlayer[ReadyUser.chair].PlayerState){
        //     this.TablePlayer[ReadyUser.chair].PlayerState = QL_Common.GState.PlayerReady;
        // }
        // M_BBMJView.ins.reMain.node.active=true;
        // M_BBMJView.ins.num.node.active=true;
        // M_BBMJView.ins.num1.node.active=true;
        // this._lianBanker=ReadyUser.reMain;
        // console.log("-----++++++++++++------")
        // M_BBMJView.ins.showreMain(this._lianBanker);
        //M_BBMJView.ins.ReadyStatusUserInfo.OnPlayerStatusChange(ReadyUser.chair,this.TablePlayer[ReadyUser.chair].PlayerState);
         M_BBMJView.ins.ReadyAndGameUserInfo.OnPlayerStatusChange(ReadyUser.chair,QL_Common.GState.PlayerReady);
    }
    /**
     * 开始创建桌子
     * */
    private Handle_CMD_S_StartCreateTable(msg: GameIF.CustomMessage): void {
         if (!this.GameRule) {
            console.log("Handle_CMD_S_StartCreateTable:");
            console.log(this.GameRule);
            this.ExitGame();
            return;
        }
      
       // if (!this.GameRule) return;
        //请求创建房间
        
        
        const gameRuleData: GameRuleData = <GameRuleData>this.GameRule;


        const data: M_BBMJ_GameData = <M_BBMJ_GameData>gameRuleData.GameData;
        



        var createTable : M_BBMJ_GameMessage.CMD_C_CreateTable = new M_BBMJ_GameMessage.CMD_C_CreateTable();
        


       
        createTable.IsRecordScoreRoom = 1;//this._cbx_jifenRoom.isSel ? 1 : 0;
        createTable.TableCode = M_BBMJClass.ins.TableID.toString();
        createTable.SetGameNum = data.SetGameNum;//this._juarr[this._payka];//this._slider_selGameNum.value;//设置圈数
        createTable.TableCost = gameRuleData.TableCost;//房卡数量
        createTable.isOutTimeOp = 0//this._cbx_outTime.isSel ? 1 : 0;
        createTable.isTableCreatorPay = data.tableCreatorPay;//this._cbx_payType.isSel?0:1;//
        createTable.IfCanSameIp=data.ifcansameip;
        createTable.ifCanHu7Dui=data.IfCanHu7Dui;
        createTable.isGangJiuYou = data.GangLeJiuYou;
        createTable.CheckGps = data.CheckGps;
        createTable.PeopleNum = data.PeopleNum;
        createTable.MaShu = data.MaShu;
        createTable.OutCardTime = 2;
        createTable.GuoHuBuHu = data.GuoHuBuHu;
        createTable.RulePeng = data.RulePeng;
        createTable.BuBuGao = data.BuBuGao;
        this.SendGameData(createTable);
    }

    /**
     * 房主信息
     * */
    private Handle_CMD_S_TableCreatorInfo(msg: GameIF.CustomMessage): void {
        var tableCreatorInfo: M_BBMJ_GameMessage.CMD_S_TableCreatorInfo = <M_BBMJ_GameMessage.CMD_S_TableCreatorInfo>msg;
        
        this._tableConfig.tableCreatorID = tableCreatorInfo.plyaerID;
        this._tableConfig.tableCreatorChair = tableCreatorInfo.chair;
        
        
        //this.node.dispatchEvent(new BBMJEvent(BBMJEvent.msg_tableCreatorInfo,this._tableConfig.tableCreatorChair,this._tableConfig.tableCreatorID));
        this.gameView.TableCreatorInfo(this._tableConfig.tableCreatorChair);
    }

    //断线重连断线重连
    /**
     * 断线重连恢复游戏信息
     * */

    /**
     * 玩家断线
     * */
    private Handle_CMD_S_PlayerOffline(msg: GameIF.CustomMessage): void {
        var playerOffLine: M_BBMJ_GameMessage.CMD_S_PlayerOffline = <M_BBMJ_GameMessage.CMD_S_PlayerOffline>msg;
        // M_BBMJView.ins.GameStatusUserInfo.offlineChair = playerOffLine.chair;
        // M_BBMJView.ins.ReadyStatusUserInfo.offlineChair = playerOffLine.chair;
         M_BBMJView.ins.ReadyAndGameUserInfo.offlineChair = playerOffLine.chair;
    }
    /**
     * 玩家断线进来
     * */
    private Handle_CMD_S_PlayerOfflineCome(msg: GameIF.CustomMessage): void {
        var playerOfflineCome: M_BBMJ_GameMessage.CMD_S_PlayerOfflineCome = <M_BBMJ_GameMessage.CMD_S_PlayerOfflineCome>msg;
        // M_BBMJView.ins.GameStatusUserInfo.reconnectChair = playerOfflineCome.chair;
        // M_BBMJView.ins.ReadyStatusUserInfo.reconnectChair = playerOfflineCome.chair;
         M_BBMJView.ins.ReadyAndGameUserInfo.reconnectChair = playerOfflineCome.chair;
    }
    
    private Handle_CMD_S_ORC_GameInfo(msg: GameIF.CustomMessage): void {
        this.fankai=false;
        M_BBMJView.ins.OnResetGameView();
        //播放背景音乐
        M_BBMJVoice.PlayBgm();
        //this.PlaySound(BBMJSoundDef.sound_bg,0,egret.Sound.MUSIC);
        //清理数据
        this.clear();
        //通知玩家进入
        this.gameView.playerComeing();//dispatchEvent(new BBMJEvent(BBMJEvent.msg_playerComeing));
        //局数恢复
        M_BBMJView.ins.showGameNum(this._tableConfig.setGameNum,this._tableConfig.alreadyGameNum,this._tableConfig.realGameNum);
        var gameInfo : M_BBMJ_GameMessage.CMD_S_ORC_GameInfo = <M_BBMJ_GameMessage.CMD_S_ORC_GameInfo>msg;
        this._bankerChair = gameInfo.bankerChair;
        this._lianBanker=gameInfo.lianBanker;
        this._gameid = gameInfo.gameid;
        this._gamePhase = gameInfo.gamePhase;
         M_BBMJView.ins.ReadyAndGameUserInfo.bankerChair = this._bankerChair;
        //M_BBMJView.ins.GameStatusUserInfo.bankerChair = this._bankerChair;
        
        //通知游戏开始
        this.gameView.GameStart();//(new BBMJEvent(BBMJEvent.msg_gameStart));
    }
    
    /**
     * 断线重连恢复玩家牌阵
     * */
    private Handle_CMD_S_ORC_PlayerCard(msg: GameIF.CustomMessage): void {
        var playerCard : M_BBMJ_GameMessage.CMD_S_ORC_PlayerCard = <M_BBMJ_GameMessage.CMD_S_ORC_PlayerCard>msg;
        if(cc.isValid(M_BBMJView.ins.SZAni)){
            M_BBMJView.ins.SZAni.StopAni();
        }
        //M_BBMJView.ins.SendCardEngine.destroy();
        BBMJMahjongAlgorithm1.sortCardAry(playerCard.selfCard.handCard);
       playerCard.selfCard.handCard=BBMJMahjongAlgorithm1.sortCardAry1(playerCard.selfCard.handCard,this.GetHunCardAry());
        for(var m:number=0; m<playerCard.selfCard.handCard.length; m++){
            this._handCard.push(playerCard.selfCard.handCard[m]);
        }
        if(playerCard.selfCard.holdCard!=BBMJMahjongDef.gInvalidMahjongValue)
            this._handCard.push(playerCard.selfCard.holdCard);
        //1、恢复自己牌阵
        
        M_BBMJView.ins.CardView.selfFixed.recoveryFixed(playerCard.selfCard.fixedCard,this.SelfChair);
        M_BBMJView.ins.CardView.selfPool.recoveryPoolCard(playerCard.selfCard.poolCard);
        M_BBMJView.ins.CardView.recoveryActiveCard(this.SelfChair,playerCard.selfCard.handCard);
        M_BBMJView.ins.CardView.recoveryFlowerCard(this.SelfChair,playerCard.selfCard.flowerCard);
        if(playerCard.selfCard.isTing){
            M_BBMJView.ins.ReadyAndGameUserInfo.Ting=this.SelfChair;
        }
        
        
        if(BBMJMahjongDef.gInvalidMahjongValue != playerCard.selfCard.holdCard){
            M_BBMJView.ins.CardView.selfActive.holdACard(playerCard.selfCard.holdCard);
            M_BBMJView.ins.CardView.selfActive.allDown();
        }
        
        //2、恢复其他玩家牌阵
        for(var i:number=0; i<playerCard.otherPlayerCard.length; i++){
            var handCard : Array<number>=new Array<number>();
            for(var j:number=0; j<playerCard.otherPlayerCard[i].handCardNum; j++){
                handCard.push(0x01);
            }
           
           
            M_BBMJView.ins.CardView.getFixed(playerCard.otherPlayerCard[i].chair).recoveryFixed(playerCard.otherPlayerCard[i].fixedCard,playerCard.otherPlayerCard[i].chair);
            M_BBMJView.ins.CardView.getPool(playerCard.otherPlayerCard[i].chair).recoveryPoolCard(playerCard.otherPlayerCard[i].poolCard);
            M_BBMJView.ins.CardView.recoveryActiveCard(playerCard.otherPlayerCard[i].chair,handCard);
            M_BBMJView.ins.CardView.recoveryFlowerCard(playerCard.otherPlayerCard[i].chair,playerCard.otherPlayerCard[i].flowerCard)
             if(playerCard.otherPlayerCard[i].IsTing){
               M_BBMJView.ins.ReadyAndGameUserInfo.Ting=playerCard.otherPlayerCard[i].chair;
             }
                if(playerCard.otherPlayerCard[i].IsTing==true) {
                
                
                   for(var z=0;z<M_BBMJView.ins.CardView.getFixed(playerCard.otherPlayerCard[i].chair)._fixedData.length;z++){
       if( M_BBMJView.ins.CardView.getFixed(playerCard.otherPlayerCard[i].chair)._fixedData[z].fixedType==enFixedCardType.FixedCardType_AGang)
          {
               M_BBMJView.ins.CardView.getFixed(playerCard.otherPlayerCard[i].chair)._fixedData[z].bmp_cardcolorAry[3].node.active=false;
                this._recordCard.gangACard(M_BBMJView.ins.CardView.getFixed(playerCard.otherPlayerCard[i].chair)._fixedData[z].cardValue);
           }
            }
                
                
            }


        }
        
            
    }
    /**
     * 断线重连恢复玩家分数变化
     * */
    private Handle_CMD_S_ORC_GameScoreChange(msg: GameIF.CustomMessage):void{
        var orcGameScore : M_BBMJ_GameMessage.CMD_S_ORC_GameScoreChange = <M_BBMJ_GameMessage.CMD_S_ORC_GameScoreChange>msg;
      //  M_BBMJView.ins.GameStatusUserInfo.reShowScoreChange(orcGameScore.PlayerScoreChange);
        M_BBMJView.ins.ReadyAndGameUserInfo.reShowScoreChange(orcGameScore.PlayerScoreChange);
    }
    
    
    /**
     * 断线重连恢复投票阶段
     * */
    private Handle_CMD_S_ORC_Vote(msg: GameIF.CustomMessage): void {
        var vote : M_BBMJ_GameMessage.CMD_S_ORC_Vote = <M_BBMJ_GameMessage.CMD_S_ORC_Vote>msg;
        this._outCardPlayer.playerOutCard(vote.chair,vote.card);
        //M_BBMJView.ins.OutCardView.showCard(this._outCardPlayer.Chair,this._outCardPlayer.Card);
        if(this._outCardPlayer.isValid){
            //this._recordCard.outACard(this._outCardPlayer.Card);
            M_BBMJView.ins.CardView.addCard2Pool(this._outCardPlayer.Chair,this._outCardPlayer.Card);
        }
    }
    
    /**
     * 断线重连结束
     * */
    private Handle_CMD_S_ORC_Over(msg: GameIF.CustomMessage):void{
        var orcOver : M_BBMJ_GameMessage.CMD_S_ORC_Over = <M_BBMJ_GameMessage.CMD_S_ORC_Over>msg;
        M_BBMJView.ins.GameInfo.init();
        if(!this.is2D()){
           M_BBMJView.ins.CardView.PaiQiangInfo.showPaiQiang(orcOver.leftCardNum);
        
        }
           if(!M_BBMJView.ins.TimerView.node.active){
               M_BBMJView.ins.TimerView.showArrow=this.SelfChair;
           }
        M_BBMJView.ins.GameInfo.leftCardNum = orcOver.leftCardNum;
        M_BBMJView.ins.GameInfo.SetGameNum(this._tableConfig.alreadyGameNum,this._tableConfig.setGameNum);
        M_BBMJView.ins.GameInfo.tableCode=this._tableConfig.TableCode;
        //设置计分板玩家名称
        // for(var m: number = 0;m < BBMJMahjongDef.gPlayerNum;m++) {
        //     if(null == this.TablePlayer[m]) {
        //         continue;
        //     }
        // }
        M_BBMJView.ins.PlayFenXiang.SetPlayerData(this._tableConfig.alreadyGameNum);
        //M_BBMJView.ins.GameJiFenBan.SetPlayerData();
        this._isTing = BBMJMahjongAlgorithm.GetTingCardArray(this._handCard);
        this.gameView.TingBtn(this._isTing.length>0);
        if(this.isTing){
            this.showTingCard(0,3000,true);
        }
    }
    /**
     * 断线重连恢复解散房间
     * */
    private Handle_CMD_S_ORC_DissTable(msg: GameIF.CustomMessage):void{
        var orcDissTable: M_BBMJ_GameMessage.CMD_S_ORC_DissTable = <M_BBMJ_GameMessage.CMD_S_ORC_DissTable>msg;
       // M_BBMJView.ins.DissTable.playerDissTable(orcDissTable.sponsor,orcDissTable.playerVote,orcDissTable.leftTime);
         M_BBMJView.ins.DissTableShow("playerDissTable",[orcDissTable.sponsor,orcDissTable.playerVote,orcDissTable.leftTime]);
    }
    /**
     * 空闲桌子断线重连进入
     * */
    private Handle_CMD_S_ORC_TableFree(msg: GameIF.CustomMessage):void{
        //发牌前切换2d或3d时更换罗盘
        this.gameView.ShowTimerView(this.SelfChair);
        var tablefree: M_BBMJ_GameMessage.CMD_S_ORC_TableFree= <M_BBMJ_GameMessage.CMD_S_ORC_TableFree>msg;
        //播放背景音乐
        M_BBMJVoice.PlayBgm();
        //清理数据
        this.clear();
        //通知玩家进入
        this.gameView.playerComeing();//this.dispatchEvent(new BBMJEvent(BBMJEvent.msg_playerComeing));

        //显示准备界面
        if(this.getTableStauts()==QL_Common.TableStatus.gameing)
        {
            M_BBMJView.ins.PlayFenXiang.SetPlayerData(this._tableConfig.alreadyGameNum);
            //M_BBMJView.ins.GameJiFenBan.SetPlayerData();
             M_BBMJView.ins.ReadyAndGameUserInfo.OnPlayerStatusChange(this.SelfChair,QL_Common.GState.PlayerReady);
           // M_BBMJView.ins.ReadyStatusUserInfo.OnPlayerStatusChange(this.SelfChair,QL_Common.GState.PlayerReady);
            M_BBMJView.ins.TipMsgShow("上局已经结束,等待其他玩家准备进入下一局",false);
        }
        else{

              M_BBMJView.ins.ReadyAndGameUserInfo.SelfReady();
          //   M_BBMJView.ins.ReadyStatusUserInfo.SelfReady();
            // if(this.checkMoneyCanGame)
            // {
            //     M_BBMJView.ins.ReadyStatusUserInfo.OnPlayerStatusChange(this.SelfChair,QL_Common.GState.PlayerReady);
            // }
        }
        
        
        if(this._tableConfig.isValid){
            M_BBMJView.ins.GameInfo.init();
            M_BBMJView.ins.GameInfo.tableCode = this._tableConfig.TableCode;
            M_BBMJView.ins.GameInfo.SetGameNum(this._tableConfig.alreadyGameNum,this._tableConfig.setGameNum);
            M_BBMJView.ins.GameInfo.GroupLeftCard.active= true;
        }
        
        if(this._tableConfig.needHideUserMoney){
           // M_BBMJView.ins.ReadyStatusUserInfo.hideUserMoney();
            M_BBMJView.ins.ReadyAndGameUserInfo.hideUserMoney();
        }

       if(tablefree.isXuJu == 1){
            M_BBMJView.ins.ReadyAndGameUserInfo.group_userReady.active = true;
            // M_BBMJView.ins.ReadyAndGameUserInfo.btn_invite.node.active = false;
            M_BBMJView.ins.ReadyAndGameUserInfo.btn_ready.node.active = true;
            M_BBMJView.ins.ReadyAndGameUserInfo.btn_ready.node.x=0;
            M_BBMJView.ins.ReadyAndGameUserInfo.group_imgready[0].node.active = false;
            this._addNum = tablefree.addNum;
        }
        
        
    }


    /**
     * 强退成功
     * */
    private Handle_CMD_S_ForceLeftSuccess(msg: GameIF.CustomMessage): void {
        this.ForceQuitting();
    }
    //
    /**
     * 显示消息
     * */
    private Handle_CMD_S_ShowMsg(msg: GameIF.CustomMessage): void {
        var showMsg : M_BBMJ_GameMessage.CMD_S_ShowMsg = <M_BBMJ_GameMessage.CMD_S_ShowMsg>msg;
        if(1 == showMsg.tipType){
           M_BBMJView.ins.TipMsgShow(showMsg.msg,true,4);
        }else{
            M_BBMJView.ins.MsgBox.showMsgBox(showMsg.msg);
        }
    }


    /**
     * 有玩家提出解散房间
     * */
    private Handle_CMD_S_PlayerDissTable(msg: GameIF.CustomMessage):void{
        var playerDissTable: M_BBMJ_GameMessage.CMD_S_PlayerDissTable = <M_BBMJ_GameMessage.CMD_S_PlayerDissTable>msg;
       // M_BBMJView.ins.DissTable.playerDissTable(playerDissTable.sponsorChair,null);
         M_BBMJView.ins.DissTableShow("playerDissTable",[playerDissTable.sponsorChair,null,60]);
    }
    
    /**
     * 玩家对解散房间进行投票
     * */
    private Handle_CMD_S_PlayerVoteDissTable(msg: GameIF.CustomMessage):void{
        var playerVoteDissTable: M_BBMJ_GameMessage.CMD_S_PlayerVoteDissTable = <M_BBMJ_GameMessage.CMD_S_PlayerVoteDissTable>msg;
       // M_BBMJView.ins.DissTable.playerVoteDissTable(playerVoteDissTable.chair,playerVoteDissTable.vote);
         M_BBMJView.ins.DissTableShow("playerVoteDissTable",[playerVoteDissTable.chair,playerVoteDissTable.vote]);
        
        if(2 == playerVoteDissTable.vote){
            M_BBMJView.ins.DissTable.node.active=false;
            M_BBMJView.ins.DissTable.node.destroy();
            let name=this.getTablePlayerAry()[playerVoteDissTable.chair].NickName;
            name = name.substring(0,4);
            this.ShowMsgBox("玩家 "+name+" 拒绝解散房间");
           // M_BBMJView.ins.ShowMsgBox("玩家 "+name+" 拒绝解散房间");
        }
    }
    
    /**
     * 解散桌子成功
     * */
    private Handle_CMD_S_DissTableSuccess(msg: GameIF.CustomMessage):void{
        
        //},this);
        var dissTable: M_BBMJ_GameMessage.CMD_S_DissTableSuccess = <M_BBMJ_GameMessage.CMD_S_DissTableSuccess>msg;
            if(cc.isValid(M_BBMJView.ins.DissTable)){
            M_BBMJView.ins.DissTable.node.active=false;
            M_BBMJView.ins.DissTable.node.destroy();
        }
        if(0 == dissTable.gameing){
            M_BBMJClass.ins.ignoreForceLeft = true;
            
            M_BBMJView.ins.JieShuanView.node.active=false;
            M_BBMJView.ins.PlayFenXiang.startShow(()=>{
                this.ExitGame();
            },this);
        }
    }
        

    /**
     * 注册一个计时器
     * */
    public regTimer(timerid:number,timerLen:number,chair:number):void{
     
        this._timer.setTimer(timerid,timerLen,chair,this.onTimerEvent,this);
        
        M_BBMJView.ins.TimerView.node.active=true;
        M_BBMJView.ins.TimerView.showArrow = chair;
        M_BBMJView.ins.TimerView.timerNum = timerLen;
       
        
        
        
        this._timer.start();
    }    

    ///接口    


    /**
     * 是否自建房间
     * */
    public isCreateRoom(): boolean{
        return this.isSelfCreateRoom;
    }
    /**
     * 是否录像
     * */
    public isVideo(): boolean{
        return false;
    }
    /**
     * 是否已经胡牌
     * */
    public isAlreadyHu():boolean{
        return this._alreadyHu;
    }
    /**
     * 速度
     * */
    public getSpeed(): number {
        return 1;
    }
    /**
     * 发送游戏消息
     * */
    public sendData(cm: GameIF.CustomMessage): void{
        this.SendGameData(cm);
    }
    /**
     * 是否可以退出游戏
     * */
    public ifCanExitGame(chairId: number): boolean{
        return this.IsCanExitGame(chairId);
    }
    /**
     * 场地数据
     * */
    public getRoomData(): QL_Common.RoomClient{
        return this.RoomClient;
    }
    /**
     * 桌子配置
     * */
    public getTableConfig(): BBMJTableConfig{
        return this._tableConfig;
    }
    /**
     * 手牌数据
     * */
    public getSelfHandCardData(): Array<number>{
        return this._handCard;
    }
    /**
     * 取指定椅子号玩家手牌数据
     * */
    public getPlayerHandCardData(chair:number):Array<number>{
        if(chair == this.SelfChair){
            return this._handCard;
        }
        return null;
    }
    /**
     * 活动牌类名
     * */
    public getActiveCardClassName(): Array<string>{
        return ["QL.gameplug.M_BBMJ.BBMJ_SelfActive","QL.gameplug.M_BBMJ.BBMJ_DownActive","QL.gameplug.M_BBMJ.BBMJ_OppoActive","QL.gameplug.M_BBMJ.BBMJ_UpActive"];
    }
    /**
     * 获取桌子玩家集合
     * */
    public getTablePlayerAry(): Array<QL_Common.TablePlayer>{
        return this.TablePlayer;
    }
    /**
     * 取自己椅子号
     * */
    public getSelfChair(): number{
        return this.SelfChair;
    }
    /**
     * 取庄家椅子号
     * */
    public getBankerChair(): number{
        return this.BankerChair;
    }
    /**
     * 取庄家连庄数
     * */
    public getLianBanker(): number{
        return this._lianBanker;
    }
    /**
     * 获取麻将资源名称
     * */
    public getMahjongResName(card: number): string {
        return `gameres/gameCommonRes/Texture/Mahjong/PaiHua/mahjong_${BBMJMahjongAlgorithm1.GetMahjongColor(card)}_${BBMJMahjongAlgorithm1.GetMahjongValue(card)}`;
    }

    public getMahjongPaiHuaRes(card: number): cc.SpriteFrame {
            return this.paihua.getSpriteFrame(`mahjong_${BBMJMahjongAlgorithm1.GetMahjongColor(card)}_${BBMJMahjongAlgorithm1.GetMahjongValue(card)}`);    
        //return `gameres/gameCommonRes/Texture/Mahjong/PaiHua/mahjong_${WHMJMahjongAlgorithm.GetMahjongColor(card)}_${WHMJMahjongAlgorithm.GetMahjongValue(card)}`;
    }
    /**
     * 获取麻将牌背资源
     * */
    public getMahjongPaiBeiRes(cardtype: string): cc.SpriteFrame {
        return this.paibei.getSpriteFrame(cardtype);
        //return `gameres/gameCommonRes/Texture/Mahjong/PaiHua/mahjong_${WHMJMahjongAlgorithm.GetMahjongColor(card)}_${WHMJMahjongAlgorithm.GetMahjongValue(card)}`;
    }
            /**
     * 获取麻将牌背资源
     * */
    public getMahjong3DPaiBeiRes(cardtype: string): cc.SpriteFrame {
        return this.paibei3d.getSpriteFrame(cardtype);
    }
    /**
     * 获取随机牌花资源
     * @param cardvalue 随机花色
     * @param cardvalue2 随机数值
     */
        public getRanDomMahjongPaiHuaRes(cardvalue: number,cardvalue2: number): cc.SpriteFrame {
        return this.paihua.getSpriteFrame(`mahjong_${cardvalue}_${cardvalue2}`);    
    }

    /**
     * 逻辑椅子号转物理椅子号
     * */
    public logic2physicalChair(chair: number): number {
        return (this.SelfChair + chair) % BBMJMahjongDef.gPlayerNum;
    }

    /**
     * 物理椅子号转逻辑椅子号
     * */
    public physical2logicChair(chair: number): number {
        return chair >= this.SelfChair ? chair - this.SelfChair : BBMJMahjongDef.gPlayerNum + chair - this.SelfChair;
    }
    /**
     * 退出游戏
     * */
    public exit(): void{
        this.ExitGame();
    }
    /**
     * 停止计时器
     * */
    public stopTimer():void{
        this._timer.stop();
    }
    /**
     * 取局号
     * */
    public getGameID(): string{
        return this._gameid;
    }
    /**
     * 游戏阶段
     * */
    public getGamePhase(): enGamePhase{
        return this.GamePhase;
    }
    /**
     * 获取桌子状态
     * */
    public getTableStauts(): QL_Common.TableStatus{
        return this.GameStatus;
    }
    
    /**
     * 播放麻将音效
     * */
    public playMJSound(soundName: string,type: AudioType,loops: boolean){
        let path=cc.url.raw(soundName);//soundName是全路径名.mp3
        this.PlaySound(path, type, loops);
    }
    

        getFreeActive(chair:number):cc.NodePool{
        return BBMJ_CardView._freeActiveNode[chair];
        // switch(chair){
        //     case 0:{
        //         return WHMJ_CardView._freeSelfActiveNode;
        //     }
        //     case 1:{
        //         return WHMJ_CardView._freeDownActiveNode;
        //     }
        //     case 2:{
        //         return WHMJ_CardView._freeOppoActiveNode;
        //     }
        //     case 3:{
        //         return WHMJ_CardView._freeUpActiveNode;
        //     }
        // }
    }
    getFreeFixed(chair:number):cc.NodePool{
        // switch(chair){
        //     case 0:{
        return BBMJ_CardView._freeFixedNode[chair];
        //     }
        //     case 1:{
        //         return WHMJ_CardView._freeDownFixedNode;
        //     }
        //     case 2:{
        //         return WHMJ_CardView._freeOppoFixedNode;
        //     }
        //     case 3:{
        //         return WHMJ_CardView._freeUpFixedNode;
        //     }
        // }
    }
    getFreePool(chair:number):cc.NodePool{
        return BBMJ_CardView._freePoolNode[chair];
        // switch(chair){
        //     case 0:{
        //         return WHMJ_CardView._freeSelfPoolNode;
        //     }
        //     case 1:{
        //         return WHMJ_CardView._freeDownPoolNode;
        //     }
        //     case 2:{
        //         return WHMJ_CardView._freeOppoPoolNode;
        //     }
        //     case 3:{
        //         return WHMJ_CardView._freeUpPoolNode;
        //     }
        // }
    } 
     getFreeFlower(chair:number):cc.NodePool{
        return BBMJ_CardView._freeFlowerNode[chair];
    }
    /**
     * 是否是花牌
     */
    public IsFlowerCardSZMJ(card: number): boolean {
         var flower: Array<number> = M_BBMJClass.GetFlowerCardArySZMJ();
         if (BBMJMahjongAlgorithm1.IsContainsNumber(flower, card)) {
             return true;
         }
        //之所以把上面的注释掉，是因为宿州麻将所有手动出的牌都不是花牌,宿州麻将的花牌都自动补花了.
        return false;
    }
    private Handle_CMD_S_BuHua(msg: GameIF.CustomMessage): void {
        // var buhua:M_SZMJ_GameMessage.CMD_S_BuHua=<M_SZMJ_GameMessage.CMD_S_BuHua>msg;

        // //加个音效

        // var logicChair=this.physical2logicChair(buhua.chair);

        // var cardAry:Array<number>=new Array<number>();

        // for(var i=0;i<buhua.huacards.length;i++){
        //     M_SZMJView.ins.CardView.addAFlowerCard(buhua.huacards[i],logicChair);
        //     cardAry.push(buhua.huacards[i]);

        //     M_SZMJView.ins.CardView.playerOutCard(buhua.chair,buhua.huacards[i]);//删除活动牌
        // }




        // //如果是自己
        // if(this.SelfChair == buhua.chair){
        //     SZMJMahjongAlgorithm.delCard(this._handCard,cardAry);
        //     MJCommon.MahjongAlgorithm.sortCardAry(this._handCard);
        //     M_SZMJView.ins.CardView.selfActive.refreshHandCardData(this._handCard);
        //     M_SZMJView.ins.CardView.selfActive.activeEnable(false);

        //     /*加的*/
        //     /*var logicChair=this.physical2logicChair(playerShowFlowerCard.chair);
        //     M_SZMJView.ins.CardView.selfFlower.addFlowerCard(playerShowFlowerCard.card,logicChair);*/
        //     /*加的*/


        //     M_SZMJView.ins.OperatorView.show=false;
        //     M_SZMJView.ins.SelGangView.show=false;
        //     //M_SZMJView.ins.CardView.selfActive.activeEnableClearCover(false);
        //     //this.stopTimer();
        //     M_SZMJView.ins.TimerView.hideArrow();
        //     M_SZMJView.ins.CardView.selfActive.allDown();

        //     M_SZMJView.ins.CardView.selfActive.showTingCardToken(null);
        //     M_SZMJView.ins.TingTip.showTingTip(null);

        //     //this._isTing = SZMJMahjongAlgorithm.CheckIfCanTingCardArray(this._handCard);
        // }





        var playerBuHua: M_BBMJ_GameMessage.CMD_S_BuHua = <M_BBMJ_GameMessage.CMD_S_BuHua>msg;

       // M_BBMJView.ins.CardView.hideOutCardArrow();
        //M_SZMJView.ins.OutCardView.showCard(playerOutCard.chair,playerOutCard.card);

        this._outCardPlayer.playerOutCard(playerBuHua.chair, playerBuHua.huacard);
        this._recordCard.outACard(playerBuHua.huacard);



        console.log(`这是花牌,应该补花`);
        console.log(`花牌值：${playerBuHua.huacard}`);
        console.log(`出牌玩家椅子号：${playerBuHua.chair}`);
        M_BBMJView.ins.CardView.addCard2Flower(playerBuHua.huacard, playerBuHua.chair);
        let sex:number=this.TablePlayer[playerBuHua.chair].Gender==1?1:2;
       

        if (this.realoncebuhua){
                M_BBMJVoice.PlayCardType(`/sound/PT/${sex}/mj_buhua_${sex}.mp3`);
                this.realoncebuhua=false;
        }
        
        

        M_BBMJView.ins.CardView.playerBuHua(playerBuHua.chair, playerBuHua.huacard);


        //如果是自己
        if (this.SelfChair == playerBuHua.chair/* && !isHuaCard*/) {
            BBMJMahjongAlgorithm1.delCard(this._handCard, [playerBuHua.huacard]);
             BBMJMahjongAlgorithm1.sortCardAry(this._handCard);
            this._handCard=BBMJMahjongAlgorithm1.sortCardAry1(this._handCard,this.GetHunCardAry());

            
           // this.ShowAryCardLog("补花之后自己的牌阵：",this._handCard);


            M_BBMJView.ins.CardView.selfActive.refreshHandCardData(this._handCard);
            M_BBMJView.ins.CardView.selfActive.activeEnable(false);
                      if(cc.isValid(M_BBMJView.ins.OperatorView)){
            M_BBMJView.ins.OperatorView.node.active=false;
        }
                      if(cc.isValid(this.gameView.SelGangView)){
             M_BBMJView.ins.SelGangView.node.active = false;
        }
           

            //this.stopTimer();
            M_BBMJView.ins.TimerView.hideArrow();
            M_BBMJView.ins.CardView.selfActive.allDown();

            M_BBMJView.ins.CardView.selfActive.showTingCardToken(null);
            M_BBMJView.ins.TingTip.showTingTip(null,true);

           // this._3m1.CheckIfCanTingCardArray(this._handCard, BBMJMahjongDef.gInvalidMahjongValue);
        } 

    }
      /**
     * 显示牌阵列表log
     * @param MiaoShu 
     * @param cardAry 
     */
    public ShowAryCardLog(MiaoShu:string,cardAry:Array<number>){
        if(cardAry==null||cardAry.length==0){
            console.log(MiaoShu);
        }
        var strCard:string="";
        var length=cardAry.length;
        for(var i=0;i<length;i++){
            if(i==length-1){
                strCard+=cardAry[i].toString();
                continue;
            }
            strCard+=cardAry[i].toString();
            strCard+=",";
        }
        return MiaoShu+strCard;
    }

  

 /**
     * 是否能够出此牌
     * @param card 
     */
    public ifCanOutCardFlower(card:number):boolean{
        var iscanOut:boolean=true;
        if(BBMJMahjongAlgorithm1.IsContainsNumber(this._flowerAry, card)){
            console.log(`因为花牌而不能出牌`);
            iscanOut=false;
        }
        return iscanOut;
    }
    

}
