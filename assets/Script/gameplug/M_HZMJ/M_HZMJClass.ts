const {ccclass, property} = cc._decorator;
import { GameBaseClass } from "../base/GameBaseClass";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { HZMJMahjongDef, IHZMJClass, HZMJ, HZMJTableConfig, HZMJTimer, enGamePhase, HZMJOutCardPlayer, HZMJRecordCard, HZMJTimerDef, TingCardTip, HZMJSoundDef, enHuCardType, enHZMJAniType } from "./ConstDef/HZMJMahjongDef";
import { GameIF } from "../../CommonSrc/GameIF";
import { ShareParam } from "../../CustomType/ShareParam";
import { LocalStorage } from '../../CustomType/LocalStorage'; 
import Global from "../../Global/Global";
import M_HZMJView from "./M_HZMJView";
import HZMJ_GameInfo from"./SkinView/HZMJ_GameInfo"
import { HZMJMahjongAlgorithm } from "./HZMJMahjongAlgorithm/HZMJMahjongAlgorithm";
import { HZMJMahjongAlgorithm1 } from "./HZMJMahjongAlgorithm/HZMJMahjongAlgorithm1";
import { HZMJMahjongAlgorithmHaveHunLhh } from "./HZMJMahjongAlgorithm/HZMJMahjongAlogrithmHaveHunLhh";                                                                     
import { AudioType, VoiceType } from "../../CustomType/Enum";
import { M_HZMJ_GameMessage } from "../../CommonSrc/M_HZMJ_GameMessage";
import { GameRuleData, M_HZMJ_GameData } from "./M_HZMJSetting";
import HZMJEvent from "./HZMJEvent";
import M_HZMJVoice from "./M_HZMJVoice";
import HZMJ_SingleFixedBase from "./PlayerCard/single/HZMJ_SingleFixedBase";
import { enFixedCardType } from "../M_HZMJ/ConstDef/HZMJMahjongDef";
import { SetTextureRes } from "../MJCommon/MJ_Function";
import HZMJ_MsgBox from "./SkinView/HZMJ_MsgBox";
import { TranslateMoneyTypeName } from "../../Tools/Function";
import HZMJ_CardView from "./SkinView/HZMJ_CardView";
import HZMJ_BanlanceActive from "./PlayerCard/banlanceShow/HZMJ_BanlanceActive";
import HZMJ_BanlanceFixed from "./PlayerCard/banlanceShow/HZMJ_BanlanceFixed";
import HZMJ_JiFenBan from "./SkinView/HZMJ_JiFenBan";
import HZMJ_TingTip from "./SkinView/HZMJ_TingTip";
import HZMJ_FanMa from "./SkinView/HZMJ_FanMa";
import HZMJ_SettingView from "./SkinView/HZMJ_SettingView";
import HZMJ_PaiWalls from './SkinView/HZMJ_PaiWalls';


@ccclass
export default class M_HZMJClass extends GameBaseClass implements IHZMJClass {
     public ifFZPay:boolean=false;
     public RoomNum:string;
     public JuShu:number;
     public HuCardtype : string;
     public arr1:Boolean[];
     public yuYan:string;
     public time=0;
    private static _ins: M_HZMJClass;
    public static get ins(): M_HZMJClass { return this._ins; }
    public _fanma :Array<number> = new Array();
    //public _hun :Array<number> = new Array(0x35);
         // public arr4:any[] = new Array(5,6,7,8)
    // @property(cc.Label)
    // label: cc.Label;

    // @property(cc.Node)
    // GameInfoView:cc.Node;
    // private HZMJ_GameInfoView:HZMJ_GameInfo;

     @property(cc.SpriteAtlas)
    private paihua:cc.SpriteAtlas=null;

    @property(cc.SpriteAtlas)
    private paibei:cc.SpriteAtlas=null;
    @property(cc.SpriteAtlas)
    private paibei3d:cc.SpriteAtlas=null;
    
    @property(M_HZMJView)
    //GameView:M_HZMJView;
    private gameView:M_HZMJView=null;

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
            /**
     * 是否2D
    */
    public is2D():boolean{
        return false;
    }
        
        //牌桌配置
        private _tableConfig : HZMJTableConfig;
        /**
         * 牌桌配置
         * */
        public get TableConfig():HZMJTableConfig{
            return this._tableConfig;
        }
        
        private _timer : HZMJTimer;
        
        //本局庄家椅子号
        private _bankerChair : number;
        //本局庄家连庄数
        public _lianBanker : number;
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
        private _outCardPlayer : HZMJOutCardPlayer;
        //骰子1点数
        private _sz1:number;
        /**
         * 骰子1
         * */
        public get SZ1():number{
            return this._sz1;
        }
            public _hunPiCard:number;
    /**
     * 翻开的混皮牌
     */
    public get HunPiHunPiCard():number{
        return this._hunPiCard;
    }
        
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
        private _voteCard: number;
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
        
        private _recordCard:HZMJRecordCard;
        /**
         * 临泉麻将计牌器
         * */
        public get RecordCard():HZMJRecordCard{
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
            if(this.SelfRoomMoney < this.gameMoneyNum) {
                return false;
            }
            return true;
        }

         /**
         * 游戏所需钱数
         * */
        public get gameMoneyNum():number{
            var checkMoney: number = 0;
            
            //自建房
            if(this.isSelfCreateRoom) {
                if(!this.TableConfig.IsTableCreatorPay && this.TableConfig.alreadyGameNum < 1)
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
            if(HZMJMahjongDef.gInvalidMahjongValue == card){
                return false;
            }
            return true;
        }
        /**
         * 自己是否可以投票碰
         * */
        public get ifCanVotePeng():boolean{
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && HZMJMahjongAlgorithm.CheckVoteRight_Peng(this._voteRight)) {
                return true;
            }
            
            return false;
        }
        /**
         * 是否可以投票杠
         * */
        public get ifCanVoteGang():boolean{
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && HZMJMahjongAlgorithm.CheckVoteRight_Gang(this._voteRight)) {
                return true;
            }
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
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && HZMJMahjongAlgorithm.CheckVoteRight_Hu(this._voteRight)) {
                return true;
            }

            return false;
        }
        /**
         * 是否自己投票
         * */
        public get isSelfVote():boolean{
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && (HZMJMahjongDef.gVoteRightMask_Null != this._voteRight)) {
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
          public showHideCard(outCard:number):void{
      //  this.gameView.CardView.refreshHideCard(outCard);
    }

        /**
         * 最后一张有效的牌
         * */
        public get lastValidCard():number{
            return this._handCard[this._handCard.length - 1];
        }

        /**
         * 显示听牌
         * */
        public showTingCard(outCard:number,pos:number):void{      
            var checkAry:Array<number> = new Array<number>();
              var hunzi:Array<number> = new Array<number>();
              hunzi[0]=0x35;
            for(var i:number=0; i<this._handCard.length; i++){
                if(HZMJMahjongDef.gInvalidMahjongValue != this._handCard[i]){
                    checkAry.push(this._handCard[i]);
                }
            }
            HZMJMahjongAlgorithm.delCard(checkAry,[outCard]);
            
            var tingAry: Array<number> = HZMJMahjongAlgorithmHaveHunLhh.GetTingCardArray(checkAry,hunzi);    
            console.log("听牌长度"+tingAry.length); 
            var tingTip: Array<TingCardTip> = new Array<TingCardTip>();
            if(tingAry.length > 0){
                
                for(var j:number=0; j<tingAry.length; j++){
                    checkAry.push(tingAry[j]);
                    console.log("听牌"+tingAry[j]);
                    tingTip.push(new TingCardTip(tingAry[j],0,this.RecordCard.getCardLeftNum(tingAry[j],this._handCard)));

                    HZMJMahjongAlgorithm.delCard(checkAry,[tingAry[j]]);
                }
            }
            
            M_HZMJView.ins.TingTip.showTingTip(tingTip);
            // if(tingTip.length > 0){
         
            //      if((pos + M_HZMJView.ins.TingTip.size.width/2) > 640){
            //     M_HZMJView.ins.TingTip.node.x = 640 - M_HZMJView.ins.TingTip.size.width;
            // }else if((pos - M_HZMJView.ins.TingTip.size.width/2) < -640){
            //     M_HZMJView.ins.TingTip.node.x = M_HZMJView.ins.TingTip.size.width - 640;
            // }
            // else
            // {
            //     M_HZMJView.ins.TingTip.node.x = pos - M_HZMJView.ins.TingTip.size.width/2;
            // }
            // }
            if(tingTip.length > 0  && pos!=3000){
           
            if((pos + M_HZMJView.ins.TingTip.size.width/2) > 640){
                M_HZMJView.ins.TingTip.node.x = 640 - M_HZMJView.ins.TingTip.size.width;
            }else if((pos - M_HZMJView.ins.TingTip.size.width/2) < -640){
                M_HZMJView.ins.TingTip.node.x = M_HZMJView.ins.TingTip.size.width - 640;
            }
            else
            {
                M_HZMJView.ins.TingTip.node.x = pos - M_HZMJView.ins.TingTip.size.width/2;
            }
            // M_HZMJView.ins.TingTip.node.y =-160;
        }else{
            // M_HZMJView.ins.TingTip.node.x = 0;
            M_HZMJView.ins.TingTip.node.x = 640 - M_HZMJView.ins.TingTip.size.width-200;
            // M_HZMJView.ins.TingTip.node.y =-100;
        }
        }

 
        /**
         * 计时器事件
         * */
        private onTimerEvent(timerid: number,chair: number,leftTickNum: number):void{
            M_HZMJView.ins.TimerView.timerNum = leftTickNum;
            if(this.time==0){
                M_HZMJView.ins.TimerView.timerNum=0;
            }
            if(chair != this.SelfChair){
                return;
            }
            switch(timerid){
                //玩家操作
                //无时间限制条件!this.isSelfCreateRoom
               
                case HZMJTimerDef.timer_id_playerop:{
                    if((0 == leftTickNum) && this.ifCanOp) {
                        if(this.time!=0){
                          M_HZMJView.ins.CardView.selfActive.activeEnable(false);
                          this.outCard(this.lastValidCard);
                        }                        
                    }
                    break;
                }
                //投票
                case HZMJTimerDef.timer_id_vote:{
                    if((0 == leftTickNum) && this.isSelfVote&&!this.isSelfCreateRoom) {
                        M_HZMJView.ins.OperatorView.node.active=false;
                        this.vote(HZMJMahjongDef.gVoteResult_GiveUp);
                    }
                    break;
                }
                //抢杠
                case HZMJTimerDef.timer_id_qianggang:{
                    if((0 == leftTickNum) && this.ifCanQiangGang) {
                        M_HZMJView.ins.QiangGangView.node.active=false;
                        this.qiangGang(1);
                    }
                    break;
                }
                //准备
                case HZMJTimerDef.timer_id_ready:{
                    if((0 == leftTickNum) && (chair == this.SelfChair)){

                    }
                    break;
                }
            }
        }
   
        /**
         * 玩家打牌
         * */
        private outCard(card:number):void{
            
            this._gamePhase = enGamePhase.GamePhase_Unknown;

            M_HZMJView.ins.CardView.selfActive.activeEnable(false);
            M_HZMJView.ins.OperatorView.node.active=false;
            M_HZMJView.ins.SelGangView.node.active=false;

            M_HZMJView.ins.TimerView.hideArrow();
  
            M_HZMJView.ins.CardView.selfActive.showTingCardToken(null);
            M_HZMJView.ins.TingTip.showTingTip(null);
            
            var outCard: M_HZMJ_GameMessage.CMD_C_OutCard = new M_HZMJ_GameMessage.CMD_C_OutCard();
            outCard.outCard = card;
            this.SendGameData(outCard);

            //M_HZMJView.ins.TipMsgView.showTip("出了一张牌，4秒钟后自动隐藏",true,4);
            //console.log("======================================出了一张牌============================");
            //M_HZMJView.ins.MsgBox.showMsgBox("出了一张牌，多写很多字，看是否能够自动换行，出了一张牌，多写很多字，看是否能够自动换行，出了一张牌，多写很多字，看是否能够自动换行，出了一张牌，多写很多字，看是否能够自动换行，出了一张牌，多写很多字，看是否能够自动换行，");
        }
        
        /**
         * 投票
         * */
        private vote(voteResult : number):void{
            
            this._voteRight = HZMJMahjongDef.gVoteRightMask_Null;
            this._gamePhase = enGamePhase.GamePhase_Unknown;
            this.stopTimer();
            M_HZMJView.ins.CardView.selfActive.allDown();
            M_HZMJView.ins.CardView.selfActive.showTingCardToken(null);
            M_HZMJView.ins.TingTip.showTingTip(null);
            
            var vote: M_HZMJ_GameMessage.CMD_C_Vote = new M_HZMJ_GameMessage.CMD_C_Vote();
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

            var qiangGang: M_HZMJ_GameMessage.CMD_C_QiangGang = new M_HZMJ_GameMessage.CMD_C_QiangGang();
            qiangGang.qiangGang = qiang;
            this.SendGameData(qiangGang);
        }

        /**
         * 清理数据
         * */
        private clear():void{
            this._bankerChair = HZMJMahjongDef.gInvalidChar;
            this._gamePhase = enGamePhase.GamePhase_Unknown;
            this._activePlayer = HZMJMahjongDef.gInvalidChar;
            this._outCardPlayer.clear();
            this._recordCard.init();
            this._sz1 = 0;
            this._sz2 = 0;
            this._gameid="";
            this._alreadyHu=false;
            this._handCard.splice(0,this._handCard.length);
            this._gangCard.splice(0,this._gangCard.length);
            this._voteRight = HZMJMahjongDef.gVoteRightMask_Null;
            this._ifCanQiangGang = false;
            this._isTing=false;
            this._isIgnoreForceLeft=false;
        }

    onLoad() {
        super.onLoad();
        M_HZMJClass._ins = this;
        HZMJ.ins.iclass = this;

        this._shareContext ="我正在电玩城玩《临泉麻将》，已经建好游戏房间，就等你来战！";

        this._haveGameScene=false;
        //
        //初始化
        //
        this._timer = new HZMJTimer();
        this._tableConfig = new HZMJTableConfig();
        this._outCardPlayer = new HZMJOutCardPlayer();
        this._recordCard = new HZMJRecordCard();
        this._handCard = new Array<number>();
        this._gangCard = new Array<number>();
        HZMJ.ins.iclass = this;

        this.node.on(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameViewEvent,this);

        
    }
    update(){
        super.update();
        this._timer.tick(Date.now() - this._curTime);
        this._curTime = Date.now();
    }

    
    // /**测试显示房号 */
    // private test():void{
    //     this.HZMJ_GameInfoView = this.GameInfoView.getComponent<HZMJ_GameInfo>(HZMJ_GameInfo);
    //     this.HZMJ_GameInfoView.tableCode="123456";
    // }


    public GetGameID(): number{
        return HZMJMahjongDef.gameID;
    }

    public OnGameMessage(cm: GameIF.CustomMessage): boolean{
        switch(cm.wSubCmdID){
                //桌子配置
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_TableConfig: {
                    this.Handle_CMD_S_TableConfig(cm);
                    break;
                }
                //游戏开始
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_Start:{
                    this.Handle_CMD_S_Start(cm);
                    break;
                }
                //骰子庄家信息
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_SZInfo:{
                    this.Handle_CMD_S_SZInfo(cm);
                    break;
                }        
                //初始化牌
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_InitCard: {
                    this.Handle_CMD_S_InitCard(cm);
                    break;
                }
                //游戏ID
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_GameID: {
                    this.Handle_CMD_S_GameID(cm);
                    break;
                }
                //玩家抓了一张牌
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_PlayerHoldCard: {
                    this.Handle_CMD_S_PlayerHoldCard(cm);
                    break;
                }
                //当前活动玩家
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_ActivePlayer: {
                    this.Handle_CMD_S_ActivePlayer(cm);
                    break;
                }
                //投票权限
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_VoteRight: {
                    this.Handle_CMD_S_VoteRight(cm);
                    break;
                }
                //玩家打出了一张牌
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_PlayerOutCard: {
                    this.Handle_CMD_S_PlayerOutCard(cm);
                    break;
                }
                //删除玩家牌池的最后一张牌
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_DelPoolCard: {
                    this.Handle_CMD_S_DelPoolCard(cm);
                    break;
                }
                //玩家碰牌
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_PlayerPengCard: {
                    this.Handle_CMD_S_PlayerPengCard(cm);
                    break;
                }
                //玩家暗杠牌
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_PlayerAnGangCard: {
                    this.Handle_CMD_S_PlayerAnGangCard(cm);
                    break;
                }
                //玩家明杠牌
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_PlayerMingGang: {
                    this.Handle_CMD_S_PlayerMingGang(cm);
                    break;
                }
                //玩家补杠牌
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_PlayerBuGangCard: {
                    this.Handle_CMD_S_PlayerBuGangCard(cm);
                    break;
                }
                //玩家胡牌
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_PlayerHuCard: {
                    this.Handle_CMD_S_PlayerHuCard(cm);
                    break;
                }
                //操作玩家
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_OpPlayer: {
                    this.Handle_CMD_S_OpPlayer(cm);
                    break;
                }
                //开始发牌
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_StartSendCard: {
                    this.Handle_CMD_S_StartSendCard(cm);
                    break;
                }
                //玩家断线
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_PlayerOffline: {
                    this.Handle_CMD_S_PlayerOffline(cm);
                    break;
                }
                //玩家断线重连进入
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_PlayerOfflineCome: {
                    this.Handle_CMD_S_PlayerOfflineCome(cm);
                    break;
                }
                //抢杠信息
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_QiangGang: {
                    this.Handle_CMD_S_QiangGang(cm);
                    break;
                }
                //删除抢杠牌
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_DelQiangGangCard:{
                    this.Handle_CMD_S_DelQiangGangCard(cm);
                    break;
                }
                //玩家手牌数据
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_PlayerCardData: {
                    this.Handle_CMD_S_PlayerCardData(cm);
                    break;
                }
                //结算信息
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_Balance: {
                    this.Handle_CMD_S_Balance(cm);
                    break;
                }
                //翻码信息
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_PlayerFanMa: {
                    this.Handle_CMD_S_FanMa(cm);
                    break;
                }
                //手牌数据
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_HandCardData:{
                    this.Handle_CMD_S_HandCardData(cm);
                    break;
                }
                //断线重连游戏信息
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_ORC_GameInfo:{
                    this.Handle_CMD_S_ORC_GameInfo(cm);
                    break;
                }
                //断线重连玩家手中牌
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_ORC_PlayerCard:{
                    this.Handle_CMD_S_ORC_PlayerCard(cm);
                    break;
                }
                //断线重连恢复投票阶段
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_ORC_Vote:{
                    this.Handle_CMD_S_ORC_Vote(cm);
                    break;
                }
                //断线重连结束
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_ORC_Over: {
                    this.Handle_CMD_S_ORC_Over(cm);
                    break;
                }
                //断线重连解散桌子
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_ORC_DissTable: {
                    this.Handle_CMD_S_ORC_DissTable(cm);
                    break;
                }
                //断线重连重置玩家分数
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_ORC_GameScoreChange:{
                    this.Handle_CMD_S_ORC_GameScoreChange(cm);
                    break;
                }
                //断线重连空闲状态进入
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_ORC_TableFree:{
                    this.Handle_CMD_S_ORC_TableFree(cm);
                    break;
                }
                //强退成功
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_ForceLeftSuccess: {
                    this.Handle_CMD_S_ForceLeftSuccess(cm);
                    break;
                }
                //桌子创建成功
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_CreateTableSuccess: {
                    //this.Handle_CMD_S_CreateTableSuccess(cm);
                    break;
                }
                //开始创建桌子
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_StartCreateTable: {
                    this.Handle_CMD_S_StartCreateTable(cm);
                    break;
                }
                //房主信息
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_TableCreatorInfo: {
                    this.Handle_CMD_S_TableCreatorInfo(cm);
                    break;
                }
                //强退玩家
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_ForceUserLeft:{
                    this.Handle_CMD_S_ForceUserLeft(cm);
                    break;
                }
                //显示提示信息
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_ShowMsg: {
                    this.Handle_CMD_S_ShowMsg(cm);
                    break;
                }
                //好友拒绝帮忙
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_FriendReject: {
                    //this.Handle_CMD_S_FriendReject(cm);
                    break;
                }
                //好友帮助成功
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_FriendHelpSuccess: {
                    //this.Handle_CMD_S_FriendHelpSuccess(cm);
                    break;
                }
                //好友请求信息
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_FriendHelpInfo: {
                    //this.Handle_CMD_S_FriendHelpInfo(cm);
                    break;
                }
                //新的一个回合
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_NewGameRound: {
                    this.Handle_CMD_S_NewGameRound(cm);
                    break;
                }
                //计分板结果
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_GameRecordResult: {
                    this.Handle_CMD_S_GameRecordResult(cm);
                    break;
                }
                //玩家余额
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_PlayerMoney:{
                    //this.Handle_CMD_S_PlayerMoney(cm);
                    break;
                }
                //有玩家申请解散桌子
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_PlayerDissTable: {
                    this.Handle_CMD_S_PlayerDissTable(cm);
                    break;
                }
                //玩家投票解散桌子结果
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_PlayerVoteDissTable: {
                    this.Handle_CMD_S_PlayerVoteDissTable(cm);
                    break;
                }
                //桌子解散成功
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_DissTableSuccess:{
                    this.Handle_CMD_S_DissTableSuccess(cm);
                    break;
                }

                //玩家准备
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_UseReady:{
                    this.Handle_CMD_S_UseReady(cm);
                    break;
                }
                //玩家保留桌子成功
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_SaveTableSuccess:{
                    this.Handle_CMD_S_SaveTableSuccess(cm);
                    break;
                }
                //听牌玩家相关判断
                 case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_Ting:{
                    this.Handle_CMD_S_Ting(cm);
                    break;
                }
                //解散房间时操作频繁相关信息
                 case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_IsDissolution:{
                    this.Handle_CMD_S_IsDissolution(cm);
                    break;
                }
                //显示服务端的版本号
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_Version:{
                    this.Handle_CMD_S_Version(cm);
                    break;
                }
                                //开始跑
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_StartPao:{
                    this.Handle_CMD_S_StartPao(cm);
                    break;
                }
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_FanKaiHun:{
                this.Handle_CMD_S_FanKaiHun(cm);
                break;
            }
             //跑信息
                case M_HZMJ_GameMessage.HZMJMsgID_s2c.CMD_S_PlayerPaoInfo:{
                    this.Handle_CMD_S_PlayerPaoInfo(cm);
                    break;
                }
                default:{
                    console.log(`未处理的指令:${cm.wMainCmdID} -- ${cm.wSubCmdID}`);
                    break;
                }
            }
            return true;
    }

    /**
     * 把混皮牌发送到客户端
     * @param msg 
     */
    private Handle_CMD_S_FanKaiHun(msg: GameIF.CustomMessage):void{
        var hunpi:M_HZMJ_GameMessage.CMD_S_FanKaiHun=<M_HZMJ_GameMessage.CMD_S_FanKaiHun>msg;
        this._hunPiCard=hunpi.card;
        if(this.fankai){
              this.scheduleOnce(function () {
                M_HZMJView.ins.CardView.hunPi.ShowCard(this._hunPiCard);             
                 M_HZMJView.ins.CardView.hunPi.ShowCardHaveZZ(this._hunPiCard);
                console.log("--------延时翻牌-------")
            }.bind(this), 4)

        }else{
            M_HZMJView.ins.CardView.hunPi.ShowCard(this._hunPiCard);             
            M_HZMJView.ins.CardView.hunPi.ShowCardHaveZZ(this._hunPiCard);
        }
            
       

        
        
        //this._recordCard.outACard(hunpi.card);//这是听牌提示中显示剩余牌的结果
        //剩余牌显示
       // M_LSZMJView.ins.GameInfo.holdACard();//这张牌算在20张牌里面
        
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
            HZMJ_CardView._freeActiveNode[i].clear();
            HZMJ_CardView._freeFixedNode[i].clear();
            HZMJ_CardView._freePoolNode[i].clear();
        }
        HZMJ_BanlanceActive._freeNode.clear();
        HZMJ_BanlanceFixed._freeNode.clear();
        HZMJ_JiFenBan._freeNode.clear();
        HZMJ_TingTip._freeNode.clear();
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
    //     let timenode=this.UiManager.GetTimerForm();
    //    // timenode.x=570;
    //    timenode.x=-590;
    //     timenode.y=340;
    //     this.node.addChild(timenode); 
    let timenode=this.UiManager.GetTimerForm();
        timenode.x=-520;
        timenode.y=345;
        timenode.width = 100;
        timenode.height = 100;
        timenode.scale=0.8
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
        //cc.log("OnPlayerSitDown:" + chairID.toString() + "," + player.FaceID + "," + player.NickName + "," + player.PlayerState);
      
        this.gameView.ReadyStatusUserInfo.OnPlayerSitDown(chairID,player);
        this.gameView.GameStatusUserInfo.OnPlayerSitDown(chairID,player);
    }

    /**
     * 玩家坐下后告诉坐下的玩家,这个桌子上之前已经有哪些玩家了,这个函数需要同时处理玩家的状态显示
     * */
    protected OnTablePlayer(chairID: number, player: QL_Common.TablePlayer): void {
        //cc.log("OnPlayerSitDown:" + chairID.toString() + "," + player.FaceID + "," + player.NickName + "," + player.PlayerState);
        
        this.gameView.ReadyStatusUserInfo.OnTablePlayer(chairID,player);
        
    }

    /**
     * 玩家状态发生改变,如新的玩家坐下后默认状态为SitDown,然后玩家准备,新状态就是Ready状态
     * */
    protected OnPlayerStatusChange(chairID: number, newStatus: QL_Common.GState): void {
     
        this.gameView.ReadyStatusUserInfo.OnPlayerStatusChange(chairID,newStatus);
    }

    /**
     * 玩家离开,玩家从这个桌子上离开,游戏需要将玩家的信息从指定位置清除
     * */
    protected OnPlayerLeave(chairID: number): void {
        this.gameView.ReadyStatusUserInfo.OnPlayerLeave(chairID);
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
        M_HZMJView.ins.ReadyStatusUserInfo.playerChat(chairID,chatMsg);
        M_HZMJView.ins.GameStatusUserInfo.playerChat(chairID,chatMsg);
    }

    /**
     * 玩家聊天
     * */
    protected OnPlayerChatIndex(chairID: number, player: QL_Common.TablePlayer, idx: number): void {
        console.log("收到编号为" + idx + "的消息");
        M_HZMJView.ins.ReadyStatusUserInfo.playerChat(chairID,this.MsgArray[idx]);
        M_HZMJView.ins.GameStatusUserInfo.playerChat(chairID,this.MsgArray[idx]);
        M_HZMJVoice.PlayChatVoice(idx, player.Gender,this.AudioManager.VoiceType);
    }

    /**
     * 玩家聊天
     * */
    protected OnPlayerChatEmoji(chairID: number, player: QL_Common.TablePlayer, clip: cc.AnimationClip): void {
        //console.log(url);
        M_HZMJView.ins.ReadyStatusUserInfo.playerLook(chairID,clip);
        M_HZMJView.ins.GameStatusUserInfo.playerLook(chairID,clip);
    }
    /**
     * 聊天框里的语句
     */
    public get MsgArray() {
        return [
            "我又打错牌了",
            "别吵了别吵了，专心玩游戏吧",
            "别急，我要好好想想",
            "不要走，决战到天亮",
            "大家好，很高兴认识各位",
            "各位，不好意思，我要离开一会",
            "哈哈，春风得意呀",
            "和你合作真是太愉快了",
            "看来，我又要输光了",
            "快点，小蜗牛",
            "快点啊，我等的花都谢了",
            "来啊，互相伤害呀",
            "你们的牌真是太好了",
            "我的牌真是太好了",
            "我有大把银子，有本事来拿啊",
            "呦！手气比脚气还好",
            "怎么又断线了"
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
        //获取语言选择
         this.yuYan=LocalStorage.GetItem("yuYan");
        if(this.yuYan=="PTH" || this.yuYan==null){
        M_HZMJView.ins._setting.toggle_yuYan[0].isChecked=false;
        M_HZMJView.ins._setting.toggle_yuYan[1].isChecked=true; 
        M_HZMJView.ins._setting.toggle_yuYan[1].node.getChildByName("New Label").color=cc.color(255,230,160);
        M_HZMJView.ins._setting.toggle_yuYan[0].node.getChildByName("New Label").color=cc.color(184,190,255);
        }
        if(this.yuYan=="HFH"){
        M_HZMJView.ins._setting.toggle_yuYan[1].isChecked=false; 
        M_HZMJView.ins._setting.toggle_yuYan[0].isChecked=true; 
        M_HZMJView.ins._setting.toggle_yuYan[1].node.getChildByName("New Label").color=cc.color(184,190,255);
        M_HZMJView.ins._setting.toggle_yuYan[0].node.getChildByName("New Label").color=cc.color(255,230,160);  
        }
     
        //获取本地保存的音乐数据
        var turnMusic=LocalStorage.GetItem("MusicTurn");
        var musicSlide=LocalStorage.GetItem("MusicSlide"); 
       //获取本地保存的音效数据
         var turnEffect=LocalStorage.GetItem("EffectTurn");
         var effectSlide=LocalStorage.GetItem("EffectSlide");   
        //加载场景音乐设置
        if(turnMusic!=null && musicSlide!=null){
           if(turnMusic==1){  
           M_HZMJView.ins._setting.sli_musicSlider.progress=musicSlide;        
           Global.Instance.AudioManager.SetVolume(musicSlide,AudioType.Music);
           M_HZMJView.ins._setting.tog_musicOn.isChecked=true;
        }
           else{  
           M_HZMJView.ins._setting.sli_musicSlider.progress=0;      
           Global.Instance.AudioManager.SetVolume(0,AudioType.Music);
           M_HZMJView.ins._setting.tog_musicOn.isChecked=false;
        }
    }   
        //第一次加载没有记录
       if(turnMusic==null && musicSlide==null){
           M_HZMJView.ins._setting.sli_musicSlider.progress=0.5;        
           Global.Instance.AudioManager.SetVolume(0.5,AudioType.Music);
           M_HZMJView.ins._setting.tog_musicOn.isChecked=true;

           M_HZMJView.ins._setting.sli_effectSlider.progress=0.5;
           Global.Instance.AudioManager.SetVolume(0.5,AudioType.Effect);
           M_HZMJView.ins._setting.tog_effectOn.isChecked=true;
    }
        

      //加载场景音效设置
       if(turnMusic!=null && musicSlide!=null){
       if(turnEffect==1){
           M_HZMJView.ins._setting.sli_effectSlider.progress=effectSlide;
           Global.Instance.AudioManager.SetVolume(effectSlide,AudioType.Effect);
           M_HZMJView.ins._setting.tog_effectOn.isChecked=true;
       }
       else{
           M_HZMJView.ins._setting.sli_effectSlider.progress=0;  
           Global.Instance.AudioManager.SetVolume(0,AudioType.Effect);
           M_HZMJView.ins._setting.tog_effectOn.isChecked=false;
       }
    }
        //播放背景音乐
        M_HZMJVoice.PlayBgm(); 
        
        //清理数据
        this.clear();
        
        //通知玩家进入
        //this.node.dispatchEvent(new HZMJEvent(HZMJEvent.msg_playerComeing));
        this.gameView.playerComeing();
    }

    /**
     * 玩家余额发生改变
     * */
    protected OnPlayerScoreChange(): void {
        M_HZMJView.ins.ReadyStatusUserInfo.refreshSelfScore();
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
                M_HZMJView.ins.TimerView.node.active = false;
            }
            else{
                this.regTimer(HZMJTimerDef.timer_id_ready,timeTick,this.SelfChair);
                M_HZMJView.ins.TimerView.hideArrow();
            }
        }
    }

    /**
     * 一个玩家语音开始播放
     * @param chairID 
     * @returns {} 
     */
    protected OnPlayerVoiceStart(chairID: number) {
        M_HZMJView.ins.ReadyStatusUserInfo.playerPlayVoice(chairID);
        M_HZMJView.ins.GameStatusUserInfo.playerPlayVoice(chairID);
    }

    /**
     * 语音播放结束
     * @param chairID 
     * @returns {} 
     */
    protected OnPlayerVoiceEnd(chairID: number) {
        M_HZMJView.ins.ReadyStatusUserInfo.playerStopVoice(chairID);
        M_HZMJView.ins.GameStatusUserInfo.playerStopVoice(chairID);
    }

    /**
     * native环境下，玩家点击开启播放背景声音
     * @returns {} 
     */
    protected OnTurnOnMusic() {
        //由于egret出现bug，我们临时使用这种方法重新播放声音
        //在这里，调用 this.PlaySound() 播放背景音乐
        M_HZMJVoice.PlayBgm();
    }

    /**
     * 当程序从后台返回，网络状态有响应时
     */
    protected OnNetResponding() {
        super.OnNetResponding();
        var reSet: M_HZMJ_GameMessage.CMD_C_ReSetScene = new M_HZMJ_GameMessage.CMD_C_ReSetScene();
        this.SendGameData(reSet);
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
    private onGameViewEvent(e:HZMJEvent):void{
        
        switch(e.msgCode){
            //继续游戏
            case HZMJEvent.msg_goongame: {
                this.clear();
                if(this._timer.isRuning() && this._timer.TimerID==HZMJTimerDef.timer_id_ready){
                    M_HZMJView.ins.TimerView.node.active = true;
                }
                e.stopPropagation();
                this.stopTimer();
                M_HZMJView.ins.TimerView.node.active = false;
                break;
            }
            //发送准备
            case HZMJEvent.msg_ready:{
                this.SendUserReady();
                this.stopTimer();
                M_HZMJView.ins.TimerView.node.active = false;
                e.stopPropagation();
                //玩家点击继续游戏 清除所有的牌蹲
                M_HZMJView.ins.PaiWallView.hidePaiWall();
                break;
              
            }
            //牌阵整理完毕
            case HZMJEvent.msg_arrangeHandCardComplete:{
                this.SendGameData(new M_HZMJ_GameMessage.CMD_C_HoldCardComplete());
                e.stopPropagation();
                break;
            }
            //玩家打出牌
            case HZMJEvent.msg_outACard:{
                this.outCard(<number>e.parm);
                e.stopPropagation();
                break;
            }
            //投票
            case HZMJEvent.msg_vote:{
                this.vote(<number>e.parm);
                e.stopPropagation();
                break;
            }
            //杠牌
            case HZMJEvent.msg_gangCard:{
                
                this._gamePhase = enGamePhase.GamePhase_Unknown;
                M_HZMJView.ins.CardView.selfActive.showTingCardToken(null);
                M_HZMJView.ins.TingTip.showTingTip(null);

                var card :number = (null == e.parm ? this._gangCard[0] : <number>e.parm);
                var gang : M_HZMJ_GameMessage.CMD_C_Gang = new M_HZMJ_GameMessage.CMD_C_Gang();
                gang.gangCard = card;
                this.SendGameData(gang);
                e.stopPropagation();
                break;
            }
            //自摸
            case HZMJEvent.msg_zimo:{
                M_HZMJView.ins.CardView.selfActive.showTingCardToken(null);
                M_HZMJView.ins.TingTip.showTingTip(null);

                this._gamePhase = enGamePhase.GamePhase_Unknown;
                this.SendGameData(new M_HZMJ_GameMessage.CMD_C_ZiMo());
                e.stopPropagation();
                break;
            }
            //抢杠
            case HZMJEvent.msg_qiangGang:{
                
                this.qiangGang(<number>e.parm);
                e.stopPropagation();
                break;
            }
            //跑
            case HZMJEvent.msg_pao:{
                this._gamePhase = enGamePhase.GamePhase_Unknown;
                var card :number = <number>e.parm;
                var pao : M_HZMJ_GameMessage.CMD_C_Pao = new M_HZMJ_GameMessage.CMD_C_Pao();
                pao.point = card;
                this.SendGameData(pao);
                e.stopPropagation();
                break;
            }
            //拉
            case HZMJEvent.msg_la:{
                this._gamePhase = enGamePhase.GamePhase_Unknown;
                var card :number = <number>e.parm;
                var la : M_HZMJ_GameMessage.CMD_C_La = new M_HZMJ_GameMessage.CMD_C_La();
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
        var tableConfig: M_HZMJ_GameMessage.CMD_S_TableConfig = <M_HZMJ_GameMessage.CMD_S_TableConfig>msg;
        this._tableConfig.init(
            tableConfig.CellScore,
            tableConfig.LaPaoZuo>0,
            tableConfig.qidui>0,         
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
            tableConfig.tableCreatorPay>0,
            tableConfig.tableCost,
            tableConfig.IfCanSameIP>0,
            tableConfig.isGangJiuYou>0         
        );
        M_HZMJView.ins.ReadyStatusGameInfo.refresh();
        M_HZMJView.ins.ReadyStatusUserInfo.refreshInvite();
        M_HZMJView.ins.ReadyStatusUserInfo.refreshSelfScore();
        M_HZMJView.ins.GameInfo.init();
        M_HZMJView.ins.GameInfo.SetGameNum(this._tableConfig.alreadyGameNum,this._tableConfig.setGameNum);
        M_HZMJView.ins.GameInfo.tableCode = tableConfig.TableCode;
        M_HZMJView.ins.ReadyStatusUserInfo.SelfReady();
        this.JuShu=this._tableConfig.setGameNum;
        this.RoomNum=tableConfig.TableCode;
        //设置分享内容
        if(this._tableConfig.isValid){
            this._shareContext = this._tableConfig.shareContext;
        }
        if(this._tableConfig.needHideUserMoney){
            M_HZMJView.ins.ReadyStatusUserInfo.hideUserMoney();
        }
        if(tableConfig.tableCreatorPay>0){
            this.ifFZPay=true;
        }
        
        
    }
    /**
     * 游戏开始
     * */
    private Handle_CMD_S_Start(msg: GameIF.CustomMessage):void{
        var gameStart: M_HZMJ_GameMessage.CMD_S_Start = <M_HZMJ_GameMessage.CMD_S_Start>msg;
        this.clear();
        this._isIgnoreForceLeft=false;
        this.gameView.GameStart();
          //游戏开始 牌蹲显示
        this.gameView.PaiWallView.node.active = true;
        M_HZMJView.ins.PaiWallView.showPaiWall();
        //设置分享玩家信息
        this.gameView.GameJiFenBan.SetPlayerData();
        this.gameView.PlayFenXiang.SetPlayerData(gameStart.gameNum);
        M_HZMJView.ins.showGameNum(gameStart.totalGameNum,gameStart.gameNum,gameStart.realGameNum);
        M_HZMJView.ins.TipMsgView.node.active=false;      
        for(var m:number=0; m<HZMJMahjongDef.gPlayerNum; m++){
            if(null == this.TablePlayer[m]) {
                continue;
            }
            //如果非断线玩家,设置成游戏状态
            if(QL_Common.GState.OfflineInGame != this.TablePlayer[m].PlayerState){
                this.TablePlayer[m].PlayerState = QL_Common.GState.Gaming;
            }
            
        }
        
        if(this.isSelfCreateRoom){
            var sameIPPlayer :Array<string> = new Array<string>();
            
            for(var i:number=0; i<HZMJMahjongDef.gPlayerNum-1; i++){
                
                var checkIPPlayer :string = i.toString();
                
                for(var j:number=i+1; j<HZMJMahjongDef.gPlayerNum; j++){
                    if(this.TablePlayer[i].UserIP == this.TablePlayer[j].UserIP){
                        checkIPPlayer+=`,${j}`;
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
            
            
            if(sameIPPlayer.length > 0){
                
                var tipMsg:string="";
                
                for(var n:number=0; n<sameIPPlayer.length; n++){
                    var chairAry: Array<string> = sameIPPlayer[n].split(",");
                    if(chairAry.length > 1){
                        for(var x:number=0; x<chairAry.length; x++){
                            tipMsg += `玩家:${this.TablePlayer[parseInt(chairAry[x])].NickName}${x == (chairAry.length - 1) ? "":","}`;
                        }
                        tipMsg+="  IP相同";
                    }
                    if(n != (sameIPPlayer.length - 1)){
                        tipMsg+=" | ";
                    }
                }
                
                if(tipMsg.length > 0){
                    M_HZMJView.ins.TipMsgView.showTip(tipMsg,true,4);
                }
                
            }
        }else{
            var tableCostName = TranslateMoneyTypeName(this.RoomClient.TableCostMoneyType);
            var tableCostNum = this.RoomClient.TableCost;
            if (tableCostNum > 0) {
                var tipMsg = `游戏已经开始，每局扣除桌费${tableCostNum}${tableCostName}`;
                this.UiManager.ShowTip(tipMsg);
            }
        }
    }
    /**
     * 骰子数据
     * */
    private Handle_CMD_S_SZInfo(msg: GameIF.CustomMessage):void{
        var sz: M_HZMJ_GameMessage.CMD_S_SZInfo = <M_HZMJ_GameMessage.CMD_S_SZInfo>msg;
        this._bankerChair = sz.bankerChair;
        this._lianBanker=sz.lianBanker;
        this._sz1 = sz.sz1;
        this._sz2 = sz.sz2;
        
        //显示庄家
        M_HZMJView.ins.GameStatusUserInfo.bankerChair = this._bankerChair;
         //掷完骰子后 这里删除牌蹲的牌
        //_bankerChair 本局庄家座位号
        // M_HQMJView.ins.PaiWallView.node.active = true;
        M_HZMJView.ins.PaiWallView.delPaiWall(this._bankerChair,this.SelfChair);
        
        
    }

    private Handle_CMD_S_StartPao(msg: GameIF.CustomMessage):void{
         var pao: M_HZMJ_GameMessage.CMD_S_StartPao = <M_HZMJ_GameMessage.CMD_S_StartPao>msg;
        
       
        this._gamePhase=enGamePhase.GamePhase_Pao;
        M_HZMJView.ins.PaoView.node.active=true;
        M_HZMJView.ins.PaoView.btn_pao_0.node.active=true;
        M_HZMJView.ins.PaoView.btn_pao_1.node.active=true;
        if(pao.pao==false){
        M_HZMJView.ins.PaoView.btn_pao_2.node.active=true;
        }

        //this.regTimer(HZMJTimerDef.timer_id_vote,HZMJTimerDef.timer_len_vote,this.SelfChair);
    }

    private Handle_CMD_S_StartLa():void{
        this._gamePhase=enGamePhase.GamePhase_La;
        M_HZMJView.ins.LaView.node.active=true;
        //this.regTimer(HZMJTimerDef.timer_id_vote,HZMJTimerDef.timer_len_vote,this.SelfChair);
    }
    private Handle_CMD_S_PlayerPaoInfo(msg: GameIF.CustomMessage):void{
        var pao: M_HZMJ_GameMessage.CMD_S_PlayerPaoInfo = <M_HZMJ_GameMessage.CMD_S_PlayerPaoInfo>msg;

        M_HZMJView.ins.GameStatusUserInfo.SetPao(pao.points);
    }
    private Handle_CMD_S_PlayerLaInfo(msg: GameIF.CustomMessage):void{
        var la: M_HZMJ_GameMessage.CMD_S_PlayerLaInfo = <M_HZMJ_GameMessage.CMD_S_PlayerLaInfo>msg;

        M_HZMJView.ins.GameStatusUserInfo.SetLa(la.points);
    }

    /**
     * 初始化牌
     * */
    private Handle_CMD_S_InitCard(msg: GameIF.CustomMessage): void {
        var initCard: M_HZMJ_GameMessage.CMD_S_InitCard = <M_HZMJ_GameMessage.CMD_S_InitCard>msg;
        this._handCard.splice(0,this._handCard.length);
        for(var i:number=0; i<initCard.cardAry.length; i++){
            if(HZMJMahjongDef.gInvalidMahjongValue != initCard.cardAry[i]){
                this._handCard.push(initCard.cardAry[i]);
            }
        }
    }
    /**
     * 游戏ID
     * */
    private Handle_CMD_S_GameID(msg: GameIF.CustomMessage): void {
        var gameid: M_HZMJ_GameMessage.CMD_S_GameID = <M_HZMJ_GameMessage.CMD_S_GameID>msg;
        this._gameid = gameid.gameid;
    }
    /**
     * 开始发牌
     * */
    private Handle_CMD_S_StartSendCard(msg: GameIF.CustomMessage): void {
        var startSendCard: M_HZMJ_GameMessage.CMD_S_StartSendCard = <M_HZMJ_GameMessage.CMD_S_StartSendCard>msg;
        this._gamePhase = enGamePhase.GamePhase_SendCard;
        //this.node.dispatchEvent(new HZMJEvent(HZMJEvent.msg_startSendCard));
        this.gameView.StartSendCard();
    }
    /**
     * 玩家手牌数据
     * */
    private Handle_CMD_S_HandCardData(msg: GameIF.CustomMessage):void{
           var _hun :Array<number> = new Array<number>();
           _hun.push(0x35);
           var _hun1 :Array<number> = new Array<number>();
        var handCard : M_HZMJ_GameMessage.CMD_S_HandCardData = <M_HZMJ_GameMessage.CMD_S_HandCardData>msg;
        this._handCard.splice(0,this._handCard.length);
        for(var i:number=0; i<handCard.handCardData.length; i++){
            this._handCard.push(handCard.handCardData[i]);
        }
        //HZMJMahjongAlgorithm.sortCardAry(this._handCard);
        
        this._handCard=HZMJMahjongAlgorithm1.sortCardAry1(this._handCard,_hun);       
        this.gameView.CardView.selfActive.refreshHandCardData(this._handCard);        
    }
    /**
     * 玩家抓牌
     * */
    private Handle_CMD_S_PlayerHoldCard(msg: GameIF.CustomMessage): void {
        var playerHoldCard: M_HZMJ_GameMessage.CMD_S_PlayerHoldCard = <M_HZMJ_GameMessage.CMD_S_PlayerHoldCard>msg;

        this._outCardPlayer.clear();
        
        if((this.SelfChair == playerHoldCard.chair) && (HZMJMahjongDef.gInvalidMahjongValue != playerHoldCard.card)){
            this._handCard.push(playerHoldCard.card);
        }
        
        
        M_HZMJView.ins.GameInfo.holdACard();
         //玩家抓牌 去预制体删除对应牌蹲
        M_HZMJView.ins.PaiWallView.delOnePai(this.SelfChair,this._bankerChair,playerHoldCard.countPai,playerHoldCard.gangNum,playerHoldCard.usual);
        //玩家抓牌
        M_HZMJView.ins.CardView.playerHoldCard(playerHoldCard.chair,playerHoldCard.card);
        if((this.SelfChair == playerHoldCard.chair) && (HZMJMahjongDef.gInvalidMahjongValue != playerHoldCard.card)){
            M_HZMJView.ins.CardView.selfActive.setUpCardDown();
        }
    }
    /**
     * 当前活动玩家
     * */
    private Handle_CMD_S_ActivePlayer(msg: GameIF.CustomMessage): void {
        var activePlayer: M_HZMJ_GameMessage.CMD_S_ActivePlayer = <M_HZMJ_GameMessage.CMD_S_ActivePlayer>msg;
        this._gamePhase = enGamePhase.GamePhase_PlayerOP;
        this._activePlayer = activePlayer.playerChair;
        this.time=activePlayer.timer;
        M_HZMJView.ins.CardView.selfActive.activeEnable(false);
        M_HZMJView.ins.OperatorView.node.active=false;
        M_HZMJView.ins.SelGangView.node.active=false;
        //注册计时器
        this.regTimer(HZMJTimerDef.timer_id_playerop,activePlayer.timer,this._activePlayer);
    }
    /**
     * 我的投票权限
     * */
    private Handle_CMD_S_VoteRight(msg: GameIF.CustomMessage): void {
        var voteRight: M_HZMJ_GameMessage.CMD_S_VoteRight = <M_HZMJ_GameMessage.CMD_S_VoteRight>msg;
        this._gamePhase = enGamePhase.GamePhase_Vote;
        this._voteRight = voteRight.voteRight;
        this._voteCard = voteRight.voteCard;      
            M_HZMJView.ins.OperatorView.showOP(HZMJMahjongAlgorithm.CheckVoteRight_Peng(this._voteRight),
                                            HZMJMahjongAlgorithm.CheckVoteRight_Gang(this._voteRight)?1:0,
                                            HZMJMahjongAlgorithm.CheckVoteRight_Hu(this._voteRight),
                                            true);
           
        this.regTimer(HZMJTimerDef.timer_id_vote,HZMJTimerDef.timer_len_vote,this.SelfChair);
    } 
    /**
     * 玩家打出牌
     * */
    private Handle_CMD_S_PlayerOutCard(msg: GameIF.CustomMessage): void {
        this.yuYan=LocalStorage.GetItem("yuYan");
        if(this.yuYan==null){
           this.yuYan=="PTH"; 
        }
        var playerOutCard: M_HZMJ_GameMessage.CMD_S_PlayerOutCard = <M_HZMJ_GameMessage.CMD_S_PlayerOutCard>msg;
        M_HZMJView.ins.CardView.hideOutCardArrow();
        this._outCardPlayer.playerOutCard(playerOutCard.chair,playerOutCard.card);
        this._recordCard.outACard(playerOutCard.card);
        let sex:number=this.TablePlayer[playerOutCard.chair].Gender==1?1:2;
        
        M_HZMJVoice.PlayCardType(`/sound/mj_outCard.mp3`);
        //播放音效,todo       
         if(this.yuYan=="PTH"){//如果是普通话
        M_HZMJVoice.PlayCardType(`/sound/PT/${sex}/mj_${sex}_${HZMJMahjongAlgorithm.GetMahjongColor(playerOutCard.card)}_${HZMJMahjongAlgorithm.GetMahjongValue(playerOutCard.card)}.mp3`);      
         }else{
         M_HZMJVoice.PlayCardType(`/sound/FY/${sex}/mj_${sex}_${HZMJMahjongAlgorithm.GetMahjongColor(playerOutCard.card)}_${HZMJMahjongAlgorithm.GetMahjongValue(playerOutCard.card)}.mp3`);

        //M_HZMJVoice.PlayDiaCardType(`resources/gameres/M_HZMJ/sound/dialectsound/${sex}/dsmj_${sex}_${HZMJMahjongAlgorithm.GetMahjongColor(playerOutCard.card)}_${HZMJMahjongAlgorithm.GetMahjongValue(playerOutCard.card)}.mp3`);
         }
        if(this._outCardPlayer.isValid){
            M_HZMJView.ins.CardView.addCard2Pool(this._outCardPlayer.Chair,this._outCardPlayer.Card);
        }
           
        //活动牌阵处理
        M_HZMJView.ins.CardView.playerOutCard(playerOutCard.chair,playerOutCard.card);
             //听牌提示剩余牌可能要刷新
        if(M_HZMJView.ins.TingTip.node.active){
            this.showTingCard(0,3000);
        }
       
  

   
        //如果是自己
        if(this.SelfChair == playerOutCard.chair){
            var checkAry:Array<number> = new Array<number>();
              var hunzi:Array<number> = new Array<number>();
              hunzi[0]=0x35;                   
            for(var i:number=0; i<this._handCard.length; i++){
                if(HZMJMahjongDef.gInvalidMahjongValue != this._handCard[i] && this._handCard[i]!=playerOutCard.card){
                    checkAry.push(this._handCard[i]);
                }
            }
            var hunzi:Array<number> = new Array<number>();
              hunzi[0]=0x35;
            HZMJMahjongAlgorithm.delCard(this._handCard,[playerOutCard.card]);
           // HZMJMahjongAlgorithm.sortCardAry(this._handCard);
            this._handCard=HZMJMahjongAlgorithm1.sortCardAry1(this._handCard,hunzi);  
            // let str="服务端出2牌"
            // for(let i=0;i<this._handCard.length;i++){
            //     str+=" "+this._handCard[i];
            // }
            // console.log(str);
            M_HZMJView.ins.CardView.selfActive.activeEnable(false);
            M_HZMJView.ins.CardView.selfActive.refreshHandCardData(this._handCard);
            
            M_HZMJView.ins.OperatorView.node.active=false;
            M_HZMJView.ins.SelGangView.node.active=false;

            M_HZMJView.ins.TimerView.hideArrow();
            M_HZMJView.ins.CardView.selfActive.allDown();

            M_HZMJView.ins.CardView.selfActive.showTingCardToken(null);
            M_HZMJView.ins.TingTip.showTingTip(null);
              this._isTing = HZMJMahjongAlgorithm.CheckIfCanTingCardArray(this._handCard);
              var tingAry: Array<number> = HZMJMahjongAlgorithmHaveHunLhh.GetTingCardArray(checkAry,hunzi);  
              if(tingAry.length>0){
                  this.gameView.TingBtn(true);
              }  
             // this.gameView.TingBtn(this._isTing);
            if(this._isTing){
                M_HZMJView.ins.GameStatusUserInfo.Ting = playerOutCard.chair;
       
               }

        }
            

        }
    
        
    
    // else{
    //         console.log("-----------变--牌变--牌---------")
    //          if(this._isTing){
    //             for(var k=0;k<4;k++)
    //            {
    //          for(var i=0;i<M_HZMJView.ins.CardView.getFixed(k)._fixedData.length;i++)
    //         {
    //             if(M_HZMJView.ins.CardView.getFixed(k)._fixedData[i].fixedType==enFixedCardType.FixedCardType_AGang)
    //             {
               
                
    //             var url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei1/pb1_showcard_self_1280`;
    //             SetTextureRes(url,M_HZMJView.ins.CardView.getFixed(k)._fixedData[i].bmp_cardbackAry[3]);
                 
    //              console.log("-----------变--牌变--牌---------")
    //             M_HZMJView.ins.CardView.getFixed(k)._fixedData[i].bmp_cardcolorAry[1].node.active=true;
    //         }}
    //            }}
    // }




    /**
     * 删除玩家牌池牌
     * */
    private Handle_CMD_S_DelPoolCard(msg: GameIF.CustomMessage): void {
        var DelCard: M_HZMJ_GameMessage.CMD_S_DelPoolCard = <M_HZMJ_GameMessage.CMD_S_DelPoolCard>msg;    
        M_HZMJView.ins.CardView.delCardinPool(DelCard.chair,DelCard.card,DelCard.cardnum);
    }

    /**
     * 玩家碰牌
     * */
    private Handle_CMD_S_PlayerPengCard(msg: GameIF.CustomMessage): void {
        var playerPeng: M_HZMJ_GameMessage.CMD_S_PlayerPengCard = <M_HZMJ_GameMessage.CMD_S_PlayerPengCard>msg;
        
        let sex:number=this.TablePlayer[playerPeng.chair].Gender==1?1:2;
        //音效
        if(this.yuYan=="PTH"){
            M_HZMJVoice.PlayCardType(`/sound/PT/${sex}/mj_peng_${sex}.mp3`);
        }
        else{
            M_HZMJVoice.PlayCardType(`/sound/FY/${sex}/mj_peng_${sex}.mp3`);
        }
        
        //动画
        M_HZMJView.ins.playHZMJAni(playerPeng.chair,enHZMJAniType.aniType_peng);
        M_HZMJView.ins.CardView.hideOutCardArrow();
        //清理玩家打出的牌
        this._outCardPlayer.clear();
        
        //处理碰牌
        if(M_HZMJView.ins.TingTip.node.active){
            this.showTingCard(0,3000);
        }
        M_HZMJView.ins.CardView.playerPeng(playerPeng.chair,playerPeng.card,playerPeng.outChair);
        this._recordCard.pengACard(playerPeng.card);
        //如果是自己
        if(this.SelfChair == playerPeng.chair){
            var hunzi:Array<number> = new Array<number>();
              hunzi[0]=0x35; 
            HZMJMahjongAlgorithm.delCard(this._handCard,[playerPeng.card,playerPeng.card]);
            //HZMJMahjongAlgorithm.sortCardAry(this._handCard);
             this._handCard=HZMJMahjongAlgorithm1.sortCardAry1(this._handCard,hunzi);  
        }
    }
    /**
     * 玩家暗杠
     * */
    private Handle_CMD_S_PlayerAnGangCard(msg: GameIF.CustomMessage): void {
        var playerAGang: M_HZMJ_GameMessage.CMD_S_PlayerAnGangCard = <M_HZMJ_GameMessage.CMD_S_PlayerAnGangCard>msg;
        
        let sex:number=this.TablePlayer[playerAGang.chair].Gender==1?1:2;
        // 音效
        if(this.yuYan=="PTH"){
            M_HZMJVoice.PlayCardType(`/sound/PT/${sex}/mj_gang_${sex}.mp3`);
        }
        else{
            M_HZMJVoice.PlayCardType(`/sound/FY/${sex}/mj_gang_${sex}.mp3`);
        }
        //动画
        M_HZMJView.ins.playHZMJAni(playerAGang.chair,enHZMJAniType.aniType_anGang);
        
        //处理暗杠牌
        if(M_HZMJView.ins.TingTip.node.active){
            this.showTingCard(0,3000);
        }
        M_HZMJView.ins.CardView.playerAGang(playerAGang.chair,playerAGang.card);
        this._recordCard.gangACard(playerAGang.card);
        //如果是自己
        if(this.SelfChair == playerAGang.chair) {
            ///var hunzi:Array<number> = [0x35];
             var _hun :Array<number> = new Array<number>();
              _hun.push(0x35);          
            HZMJMahjongAlgorithm.delCard(this._handCard,[playerAGang.card,playerAGang.card,playerAGang.card,playerAGang.card]);
            //HZMJMahjongAlgorithm.sortCardAry(this._handCard);
            this._handCard=HZMJMahjongAlgorithm1.sortCardAry1(this._handCard,_hun); 
            this._recordCard.gangACard(playerAGang.card);
        }
    }
    /**
     * 玩家明杠/直杠
     * */
    private Handle_CMD_S_PlayerMingGang(msg: GameIF.CustomMessage): void {
        var playerMGang: M_HZMJ_GameMessage.CMD_S_PlayerMingGang = <M_HZMJ_GameMessage.CMD_S_PlayerMingGang>msg;
        
        let sex:number=this.TablePlayer[playerMGang.chair].Gender==1?1:2;
        // 音效
        //M_HZMJVoice.PlayCardType(`/sound/${sex}/mj_gang_${sex}.mp3`);
        if(this.yuYan=="PTH"){
            M_HZMJVoice.PlayCardType(`/sound/PT/${sex}/mj_gang_${sex}.mp3`);
        }
        else{
            M_HZMJVoice.PlayCardType(`/sound/FY/${sex}/mj_gang_${sex}.mp3`);
        }
        //动画
        M_HZMJView.ins.playHZMJAni(playerMGang.chair,enHZMJAniType.aniType_minggGang);
        M_HZMJView.ins.CardView.hideOutCardArrow();
        this._outCardPlayer.clear();
        //M_HZMJView.ins.OutCardView.show = false;
        
        //处理明杠牌
        if(M_HZMJView.ins.TingTip.node.active){
            this.showTingCard(0,3000);
        }
        M_HZMJView.ins.CardView.playerMGang(playerMGang.chair,playerMGang.card,playerMGang.outChair);
        this._recordCard.gangACard(playerMGang.card);
        //如果是自己
        if(this.SelfChair == playerMGang.chair) {
            var _hun :Array<number> = new Array<number>();
              _hun.push(0x35);  
            HZMJMahjongAlgorithm.delCard(this._handCard,[playerMGang.card,playerMGang.card,playerMGang.card]);
           // HZMJMahjongAlgorithm.sortCardAry(this._handCard);
            this._handCard=HZMJMahjongAlgorithm1.sortCardAry1(this._handCard,_hun); 
        }
    }
    /**
     * 玩家补杠/巴杠
     * */
    private Handle_CMD_S_PlayerBuGangCard(msg: GameIF.CustomMessage): void {
        var playerBGang: M_HZMJ_GameMessage.CMD_S_PlayerBuGangCard = <M_HZMJ_GameMessage.CMD_S_PlayerBuGangCard>msg;
        
        let sex:number=this.TablePlayer[playerBGang.chair].Gender==1?1:2;
        // 音效
        //M_HZMJVoice.PlayCardType(`/sound/${sex}/mj_gang_${sex}.mp3`);
         if(this.yuYan=="PTH"){
            M_HZMJVoice.PlayCardType(`/sound/PT/${sex}/mj_gang_${sex}.mp3`);
        }
        else{
            M_HZMJVoice.PlayCardType(`/sound/FY/${sex}/mj_gang_${sex}.mp3`);
        }
        //动画
        M_HZMJView.ins.playHZMJAni(playerBGang.chair,enHZMJAniType.aniType_minggGang);
        
        //处理补杠牌
        if(M_HZMJView.ins.TingTip.node.active){
            this.showTingCard(0,3000);
        }
        M_HZMJView.ins.CardView.playerBGang(playerBGang.chair,playerBGang.card);
        this._recordCard.gangACard(playerBGang.card);
        //如果是自己
        if(this.SelfChair == playerBGang.chair) {
              
            HZMJMahjongAlgorithm.delCard(this._handCard,[playerBGang.card]);
            //HZMJMahjongAlgorithm.sortCardAry(this._handCard);
            var _hun :Array<number> = new Array<number>();
              _hun.push(0x35);  
             this._handCard=HZMJMahjongAlgorithm1.sortCardAry1(this._handCard,_hun); 
        }
    }

    /**
     * 玩家胡牌
     * */
    private Handle_CMD_S_PlayerHuCard(msg: GameIF.CustomMessage): void {
        //HuCardType=msg.
        var playerHu: M_HZMJ_GameMessage.CMD_S_PlayerHuCard = <M_HZMJ_GameMessage.CMD_S_PlayerHuCard>msg;
        this.HuCardtype=playerHu.huCardType;
        this.fankai= true;
        let sex:number=this.TablePlayer[playerHu.chair].Gender==1?1:2;
        // M_HZMJView.ins.GameInfo.init();
        switch(playerHu.huType){
            case enHuCardType.HuCardType_GangShaPao:
            case enHuCardType.HuCardType_PingHu:{
                //清理玩家打出的牌
                this._outCardPlayer.clear();
                M_HZMJVoice.PlayCardType(`/sound/${sex}/mj_hu_${sex}.mp3`);

                M_HZMJView.ins.playHZMJAni(playerHu.chair,enHZMJAniType.aniType_huCard);
                break;
            }
            case enHuCardType.HuCardType_QiangGangHu:{
                M_HZMJVoice.PlayCardType(`/sound/${sex}/mj_hu_${sex}.mp3`);
                M_HZMJView.ins.playHZMJAni(playerHu.chair,enHZMJAniType.aniType_huCard);
                this._recordCard.outACard(playerHu.card);
                break;
            }
            case enHuCardType.HuCardType_ZiMo:{
                if(this.yuYan=="PTH"){
                   M_HZMJVoice.PlayCardType(`/sound/PT/${sex}/mj_hu_${sex}.mp3`);
                }
                else{
                   M_HZMJVoice.PlayCardType(`/sound/FY/${sex}/mj_hu_${sex}.mp3`);
                }
                
                M_HZMJView.ins.playHZMJAni(playerHu.chair,enHZMJAniType.aniType_ziMo);
                this._recordCard.outACard(playerHu.card);
                break;
            }
            case enHuCardType.HuCardType_GangShangHua:{
               // M_HZMJVoice.PlayCardType(`/sound/${sex}/mj_zimo_${sex}.mp3`);
                if(this.yuYan=="PTH"){
                   M_HZMJVoice.PlayCardType(`/sound/PT/${sex}/mj_hu_${sex}.mp3`);
                }
                else{
                   M_HZMJVoice.PlayCardType(`/sound/FY/${sex}/mj_hu_${sex}.mp3`);
                }
                M_HZMJView.ins.playHZMJAni(playerHu.chair,enHZMJAniType.aniType_ziMo);
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
        var op: M_HZMJ_GameMessage.CMD_S_OpPlayer = <M_HZMJ_GameMessage.CMD_S_OpPlayer>msg;
        this.gameView.TingTip.node.active=false;
        this.gameView.TingBtn(false);
        this._gangCard.splice(0,this._gangCard.length);
        if((null != op.gangCard) && (op.gangCard.length > 0)){
            for(var i:number=0; i<op.gangCard.length; i++){
                this._gangCard.push(op.gangCard[i]);
            }
        }
    
        if((this._gangCard.length > 0) || (op.ifCanZiMo > 0)){
            if(this._gangCard.length > 1){
                M_HZMJView.ins.SelGangView.showGang(this._gangCard);
            }
            M_HZMJView.ins.OperatorView.showOP(false,this._gangCard.length,op.ifCanZiMo > 0,true);
        }
        
        M_HZMJView.ins.CardView.selfActive.refreshCardStatus();

        //检查打出哪些牌可以听牌
        var tingToken: Array<number> = HZMJMahjongAlgorithm.GetLastCardToTing(this._handCard);
      
        //console.log("听牌"+tingToken.length)
        M_HZMJView.ins.CardView.selfActive.showTingCardToken(tingToken);
    }
    /**
     * 开始抢杠
     * */
    private Handle_CMD_S_QiangGang(msg: GameIF.CustomMessage): void {
        var startQiangGang: M_HZMJ_GameMessage.CMD_S_QiangGang = <M_HZMJ_GameMessage.CMD_S_QiangGang>msg;
        
        this._gamePhase = enGamePhase.GamePhase_QiangGang;
        this._ifCanQiangGang=true;
        
        M_HZMJView.ins.QiangGangView.showQiangGang(startQiangGang.card);
        
        //注册计时器
        this.regTimer(HZMJTimerDef.timer_id_qianggang,HZMJTimerDef.timer_len_qianggang,this.SelfChair);
    }
    /**
     * 删除抢杠牌
     * */
    private Handle_CMD_S_DelQiangGangCard(msg: GameIF.CustomMessage):void{       
        var qiangGangCard : M_HZMJ_GameMessage.CMD_S_DelQiangGangCard = <M_HZMJ_GameMessage.CMD_S_DelQiangGangCard>msg;
        M_HZMJView.ins.CardView.selfActive.outACard(qiangGangCard.card);
        HZMJMahjongAlgorithm.delCard(this._handCard,[qiangGangCard.card]);
        var _hun :Array<number> = new Array<number>();
        _hun.push(0x35);  
        this._handCard=HZMJMahjongAlgorithm1.sortCardAry1(this._handCard,_hun); 
        //HZMJMahjongAlgorithm.sortCardAry(this._handCard);
    }
    /**
     * 某个玩家手中牌
     * */
    private Handle_CMD_S_PlayerCardData(msg: GameIF.CustomMessage): void {
        var playerCardData: M_HZMJ_GameMessage.CMD_S_PlayerCardData = <M_HZMJ_GameMessage.CMD_S_PlayerCardData>msg;
        var _hun :Array<number> = new Array<number>();
        _hun.push(0x35);  
        this._handCard=HZMJMahjongAlgorithm1.sortCardAry1(this._handCard,_hun); 
        //HZMJMahjongAlgorithm.sortCardAry(playerCardData.handCard);
        M_HZMJView.ins.CardView.getActive(playerCardData.chair).showLieCard(playerCardData.handCard,playerCardData.huCard);
        M_HZMJView.ins.CardView.getActive(playerCardData.chair).activeEnable(false);
    }

 private Handle_CMD_S_FanMa(msg: GameIF.CustomMessage): void {
    M_HZMJView.ins.FanMaView.bmp_fanmalable.node.active=true;
     var fanmamag: M_HZMJ_GameMessage.CMD_S_PlayerFanMa = <M_HZMJ_GameMessage.CMD_S_PlayerFanMa>msg;
        this._fanma=fanmamag.fanMaShu;
        M_HZMJView.ins.FanMaView.showFanMa(fanmamag.fanMaShu);
 }
    /**
     * 本局结算结果
     * */
    private Handle_CMD_S_Balance(msg: GameIF.CustomMessage): void {
       
        var balance: M_HZMJ_GameMessage.CMD_S_Balance = <M_HZMJ_GameMessage.CMD_S_Balance>msg;
         
        this._outCardPlayer.clear();
        this.gameView.OperatorView.node.active=false;
        this.gameView.QiangGangView.node.active=false;
        this.gameView.SelGangView.node.active=false;
        this.gameView.TingTip.node.active=false;
        this.gameView.TingBtn(false);
        this.stopTimer();

        var recordData:Array<number> = new Array<number>();
        for(var i:number=0; i<balance.playerBalance.length; i++){
            recordData.push(balance.playerBalance[i].TotalScore);
        }
        M_HZMJView.ins.GameJiFenBan.gameRecord(recordData);
        M_HZMJView.ins.PlayFenXiang.gameRecord(recordData);
        this.scheduleOnce(function () {
               M_HZMJView.ins.FanMaView.bmp_fanmalable.node.active=false;
               M_HZMJView.ins.JieShuanView.showJieShuan(balance);
            }.bind(this),2)       
               if(this.TableConfig.isPlayEnoughGameNum){
              M_HZMJView.ins.DissTable.node.active=false;
        }
        M_HZMJView.ins.UserData.node.active=false;
    }

    /**
     * 新的游戏回合开始
     * */
    private Handle_CMD_S_NewGameRound(msg: GameIF.CustomMessage): void {
        //新的回合开始
        M_HZMJView.ins.GameJiFenBan.gameroundStart();
    }
    
    /**
     * 记分板数据结果
     * */
    private Handle_CMD_S_GameRecordResult(msg: GameIF.CustomMessage): void {
        var data : M_HZMJ_GameMessage.CMD_S_GameRecordResult = <M_HZMJ_GameMessage.CMD_S_GameRecordResult>msg;
        M_HZMJView.ins.GameJiFenBan.gameRecordDataCome(data.record);
        M_HZMJView.ins.PlayFenXiang.gameRecordDataCome(data.record);
    }
    /**
     * 强制玩家离开
     * */
    private Handle_CMD_S_ForceUserLeft(msg: GameIF.CustomMessage): void {
        var forceLeft : M_HZMJ_GameMessage.CMD_S_ForceUserLeft = <M_HZMJ_GameMessage.CMD_S_ForceUserLeft>msg;
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
        var playerTing: M_HZMJ_GameMessage.CMD_S_Ting = <M_HZMJ_GameMessage.CMD_S_Ting>msg;


        // for (var i = 0; i < M_HZMJView.ins.CardView.getFixed(playerTing.TingNum)._fixedData.length; i++) {
        //     if (M_HZMJView.ins.CardView.getFixed(playerTing.TingNum)._fixedData[i].fixedType == enFixedCardType.FixedCardType_AGang) {
        //         this._recordCard.gangACard(M_HZMJView.ins.CardView.getFixed(playerTing.TingNum)._fixedData[i].cardValue);
        //         M_HZMJView.ins.CardView.getFixed(playerTing.TingNum)._fixedData[i].bmp_cardcolorAry[3].node.active = false;
        //     }
        // }
    }

     private Handle_CMD_S_IsDissolution(msg:GameIF.CustomMessage):void

    {
        var busy: M_HZMJ_GameMessage.CMD_S_IsDissolution = <M_HZMJ_GameMessage.CMD_S_IsDissolution>msg;
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
        var VS: M_HZMJ_GameMessage.CMD_S_Version = <M_HZMJ_GameMessage.CMD_S_Version>msg;
        M_HZMJView.ins.Help.SV.string="SV"+VS.Version;
        }




    /**
     * 玩家准备
     */
    private Handle_CMD_S_UseReady(msg: GameIF.CustomMessage):void{
        var ReadyUser:M_HZMJ_GameMessage.CMD_S_UseReady=<M_HZMJ_GameMessage.CMD_S_UseReady>msg;
        // //非断线状态玩家状态改为准备状态
        // if(QL_Common.GState.OfflineInGame != this.TablePlayer[ReadyUser.chair].PlayerState){
        //     this.TablePlayer[ReadyUser.chair].PlayerState = QL_Common.GState.PlayerReady;
        // }
        // M_HZMJView.ins.reMain.node.active=true;
        // M_HZMJView.ins.num.node.active=true;
        // M_HZMJView.ins.num1.node.active=true;
        // this._lianBanker=ReadyUser.reMain;
        // console.log("-----++++++++++++------")
        // M_HZMJView.ins.showreMain(this._lianBanker);
        M_HZMJView.ins.ReadyStatusUserInfo.OnPlayerStatusChange(ReadyUser.chair,this.TablePlayer[ReadyUser.chair].PlayerState);
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


        const data: M_HZMJ_GameData = <M_HZMJ_GameData>gameRuleData.GameData;
        



        var createTable : M_HZMJ_GameMessage.CMD_C_CreateTable = new M_HZMJ_GameMessage.CMD_C_CreateTable();
                
        createTable.isYiPaoDuoXiang = data.isYiPaoDuoXiang?1:0;
        createTable.QiDui = data.QiDui?1:0;        
        createTable.GangKaiJia = data.isGangKai?1:0;        
        createTable.isGangJiuYou=data.isGangJiuYou?1:0;       
        createTable.GoldRoomBaseIdx = 0;//this._selBaseMoney.baseMoneyIdx;
        createTable.IsRecordScoreRoom = 1;//this._cbx_jifenRoom.isSel ? 1 : 0;
        createTable.TableCode = M_HZMJClass.ins.TableID.toString();
        createTable.SetGameNum = data.SetGameNum;
        createTable.TableCost = data.TableCost;
        createTable.isOutTimeOp= data.isOutTimeOp;
        createTable.isTableCreatorPay=data.isTableCreatorPay;
        createTable.IfCanSameIp=0;//moren 
        createTable.MaShu=data.MaShu;
        createTable.RulePeng=data.RulePeng;       
        createTable.OutCardTime=data.OutCardTime;        
        this.SendGameData(createTable);
    }

    /**
     * 房主信息
     * */
    private Handle_CMD_S_TableCreatorInfo(msg: GameIF.CustomMessage): void {
        var tableCreatorInfo: M_HZMJ_GameMessage.CMD_S_TableCreatorInfo = <M_HZMJ_GameMessage.CMD_S_TableCreatorInfo>msg;
        
        this._tableConfig.tableCreatorID = tableCreatorInfo.plyaerID;
        this._tableConfig.tableCreatorChair = tableCreatorInfo.chair;
        
        //this.node.dispatchEvent(new HZMJEvent(HZMJEvent.msg_tableCreatorInfo,this._tableConfig.tableCreatorChair,this._tableConfig.tableCreatorID));
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
        var playerOffLine: M_HZMJ_GameMessage.CMD_S_PlayerOffline = <M_HZMJ_GameMessage.CMD_S_PlayerOffline>msg;
        M_HZMJView.ins.GameStatusUserInfo.offlineChair = playerOffLine.chair;
        M_HZMJView.ins.ReadyStatusUserInfo.offlineChair = playerOffLine.chair;
    }
    /**
     * 玩家断线进来
     * */
    private Handle_CMD_S_PlayerOfflineCome(msg: GameIF.CustomMessage): void {
        var playerOfflineCome: M_HZMJ_GameMessage.CMD_S_PlayerOfflineCome = <M_HZMJ_GameMessage.CMD_S_PlayerOfflineCome>msg;
        M_HZMJView.ins.GameStatusUserInfo.reconnectChair = playerOfflineCome.chair;
        M_HZMJView.ins.ReadyStatusUserInfo.reconnectChair = playerOfflineCome.chair;
    }
    
    private Handle_CMD_S_ORC_GameInfo(msg: GameIF.CustomMessage): void {
        this.fankai=false;
        M_HZMJView.ins.OnResetGameView();
        //播放背景音乐
       // M_HZMJVoice.PlayBgm();
        //this.PlaySound(HZMJSoundDef.sound_bg,0,egret.Sound.MUSIC);
        //清理数据
        this.clear();
        //通知玩家进入
        this.gameView.playerComeing();//dispatchEvent(new HZMJEvent(HZMJEvent.msg_playerComeing));
        //局数恢复
        M_HZMJView.ins.showGameNum(this._tableConfig.setGameNum,this._tableConfig.alreadyGameNum,this._tableConfig.realGameNum);
        var gameInfo : M_HZMJ_GameMessage.CMD_S_ORC_GameInfo = <M_HZMJ_GameMessage.CMD_S_ORC_GameInfo>msg;
        this._bankerChair = gameInfo.bankerChair;
        this._lianBanker=gameInfo.lianBanker;
        this._gameid = gameInfo.gameid;
        this._gamePhase = gameInfo.gamePhase;
        
        M_HZMJView.ins.GameStatusUserInfo.bankerChair = this._bankerChair;
        
        //通知游戏开始
        this.gameView.GameStart();//(new HZMJEvent(HZMJEvent.msg_gameStart));
    }
    
    /**
     * 断线重连恢复玩家牌阵
     * */
    private Handle_CMD_S_ORC_PlayerCard(msg: GameIF.CustomMessage): void {
        var playerCard : M_HZMJ_GameMessage.CMD_S_ORC_PlayerCard = <M_HZMJ_GameMessage.CMD_S_ORC_PlayerCard>msg;
        M_HZMJView.ins.SZAni.StopAni();
        //M_HZMJView.ins.SendCardEngine.destroy();
        var _hun :Array<number> = new Array<number>();
        _hun.push(0x35);  
        this._handCard=HZMJMahjongAlgorithm1.sortCardAry1(this._handCard,_hun); 
       // HZMJMahjongAlgorithm.sortCardAry(playerCard.selfCard.handCard);
        for(var m:number=0; m<playerCard.selfCard.handCard.length; m++){
            this._handCard.push(playerCard.selfCard.handCard[m]);
        }
        if(playerCard.selfCard.holdCard!=HZMJMahjongDef.gInvalidMahjongValue)
            this._handCard.push(playerCard.selfCard.holdCard);
        //1、恢复自己牌阵
        
        M_HZMJView.ins.CardView.selfFixed.recoveryFixed(playerCard.selfCard.fixedCard,this.SelfChair);
        M_HZMJView.ins.CardView.selfPool.recoveryPoolCard(playerCard.selfCard.poolCard);
        M_HZMJView.ins.CardView.recoveryActiveCard(this.SelfChair,playerCard.selfCard.handCard);
        
        if(HZMJMahjongDef.gInvalidMahjongValue != playerCard.selfCard.holdCard){
            M_HZMJView.ins.CardView.selfActive.holdACard(playerCard.selfCard.holdCard);
            M_HZMJView.ins.CardView.selfActive.allDown();
        }
        
        //2、恢复其他玩家牌阵
        for(var i:number=0; i<playerCard.otherPlayerCard.length; i++){
            var handCard : Array<number>=new Array<number>();
            for(var j:number=0; j<playerCard.otherPlayerCard[i].handCardNum; j++){
                handCard.push(0x01);
            }
           
           
            M_HZMJView.ins.CardView.getFixed(playerCard.otherPlayerCard[i].chair).recoveryFixed(playerCard.otherPlayerCard[i].fixedCard,playerCard.otherPlayerCard[i].chair);
            M_HZMJView.ins.CardView.getPool(playerCard.otherPlayerCard[i].chair).recoveryPoolCard(playerCard.otherPlayerCard[i].poolCard);
            M_HZMJView.ins.CardView.recoveryActiveCard(playerCard.otherPlayerCard[i].chair,handCard);
           
        }
            
    }
    /**
     * 断线重连恢复玩家分数变化
     * */
    private Handle_CMD_S_ORC_GameScoreChange(msg: GameIF.CustomMessage):void{
        var orcGameScore : M_HZMJ_GameMessage.CMD_S_ORC_GameScoreChange = <M_HZMJ_GameMessage.CMD_S_ORC_GameScoreChange>msg;
        M_HZMJView.ins.GameStatusUserInfo.reShowScoreChange(orcGameScore.PlayerScoreChange);
    }
    
    
    /**
     * 断线重连恢复投票阶段
     * */
    private Handle_CMD_S_ORC_Vote(msg: GameIF.CustomMessage): void {
        var vote : M_HZMJ_GameMessage.CMD_S_ORC_Vote = <M_HZMJ_GameMessage.CMD_S_ORC_Vote>msg;
        this._outCardPlayer.playerOutCard(vote.chair,vote.card);
        //M_HZMJView.ins.OutCardView.showCard(this._outCardPlayer.Chair,this._outCardPlayer.Card);
        if(this._outCardPlayer.isValid){
            //this._recordCard.outACard(this._outCardPlayer.Card);
            M_HZMJView.ins.CardView.addCard2Pool(this._outCardPlayer.Chair,this._outCardPlayer.Card);
        }
    }
    
    /**
     * 断线重连结束
     * */
    private Handle_CMD_S_ORC_Over(msg: GameIF.CustomMessage):void{
        var orcOver : M_HZMJ_GameMessage.CMD_S_ORC_Over = <M_HZMJ_GameMessage.CMD_S_ORC_Over>msg;
        M_HZMJView.ins.GameInfo.init();

      
        M_HZMJView.ins.GameInfo.leftCardNum = orcOver.leftCardNum;
        M_HZMJView.ins.GameInfo.SetGameNum(this._tableConfig.alreadyGameNum,this._tableConfig.setGameNum);
        M_HZMJView.ins.GameInfo.tableCode=this._tableConfig.TableCode;
        //设置计分板玩家名称
        // for(var m: number = 0;m < HZMJMahjongDef.gPlayerNum;m++) {
        //     if(null == this.TablePlayer[m]) {
        //         continue;
        //     }
        // }
        M_HZMJView.ins.PlayFenXiang.SetPlayerData(this._tableConfig.alreadyGameNum);
        M_HZMJView.ins.GameJiFenBan.SetPlayerData();
        this._isTing = HZMJMahjongAlgorithm.CheckIfCanTingCardArray(this._handCard);
        this.gameView.TingBtn(this._isTing);
    }
    /**
     * 断线重连恢复解散房间
     * */
    private Handle_CMD_S_ORC_DissTable(msg: GameIF.CustomMessage):void{
        var orcDissTable: M_HZMJ_GameMessage.CMD_S_ORC_DissTable = <M_HZMJ_GameMessage.CMD_S_ORC_DissTable>msg;
        M_HZMJView.ins.DissTable.playerDissTable(orcDissTable.sponsor,orcDissTable.playerVote,orcDissTable.leftTime);
    }
    /**
     * 空闲桌子断线重连进入
     * */
    private Handle_CMD_S_ORC_TableFree(msg: GameIF.CustomMessage):void{
        


        var tablefree: M_HZMJ_GameMessage.CMD_S_ORC_TableFree= <M_HZMJ_GameMessage.CMD_S_ORC_TableFree>msg;
        //播放背景音乐
        M_HZMJVoice.PlayBgm();
        //清理数据
        this.clear();
        //通知玩家进入
        this.gameView.playerComeing();//this.dispatchEvent(new HZMJEvent(HZMJEvent.msg_playerComeing));

        //显示准备界面
        if(this.getTableStauts()==QL_Common.TableStatus.gameing)
        {
            M_HZMJView.ins.PlayFenXiang.SetPlayerData(this._tableConfig.alreadyGameNum);
            M_HZMJView.ins.GameJiFenBan.SetPlayerData();
            M_HZMJView.ins.ReadyStatusUserInfo.OnPlayerStatusChange(this.SelfChair,QL_Common.GState.PlayerReady);
            M_HZMJView.ins.TipMsgView.showTip("上局已经结束,等待其他玩家准备进入下一局",false);
        }
        else{

             M_HZMJView.ins.ReadyStatusUserInfo.SelfReady();
            // if(this.checkMoneyCanGame)
            // {
            //     M_HZMJView.ins.ReadyStatusUserInfo.OnPlayerStatusChange(this.SelfChair,QL_Common.GState.PlayerReady);
            // }
        }
        
        
        if(this._tableConfig.isValid){
            M_HZMJView.ins.GameInfo.init();
            M_HZMJView.ins.GameInfo.tableCode = this._tableConfig.TableCode;
         M_HZMJView.ins.GameInfo.SetGameNum(this._tableConfig.alreadyGameNum,this._tableConfig.setGameNum);
    }
        
        if(this._tableConfig.needHideUserMoney){
            M_HZMJView.ins.ReadyStatusUserInfo.hideUserMoney();
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
        var showMsg : M_HZMJ_GameMessage.CMD_S_ShowMsg = <M_HZMJ_GameMessage.CMD_S_ShowMsg>msg;
        if(1 == showMsg.tipType){
            M_HZMJView.ins.TipMsgView.showTip(showMsg.msg,true,4);
        }else{
            M_HZMJView.ins.MsgBox.showMsgBox(showMsg.msg);
        }
    }


    /**
     * 有玩家提出解散房间
     * */
    private Handle_CMD_S_PlayerDissTable(msg: GameIF.CustomMessage):void{
        var playerDissTable: M_HZMJ_GameMessage.CMD_S_PlayerDissTable = <M_HZMJ_GameMessage.CMD_S_PlayerDissTable>msg;
        M_HZMJView.ins.DissTable.playerDissTable(playerDissTable.sponsorChair,null);
    }
    
    /**
     * 玩家对解散房间进行投票
     * */
    private Handle_CMD_S_PlayerVoteDissTable(msg: GameIF.CustomMessage):void{
        var playerVoteDissTable: M_HZMJ_GameMessage.CMD_S_PlayerVoteDissTable = <M_HZMJ_GameMessage.CMD_S_PlayerVoteDissTable>msg;
        M_HZMJView.ins.DissTable.playerVoteDissTable(playerVoteDissTable.chair,playerVoteDissTable.vote);
        
        if(2 == playerVoteDissTable.vote){
            M_HZMJView.ins.DissTable.node.active=false;
            let name=this.getTablePlayerAry()[playerVoteDissTable.chair].NickName;
            M_HZMJView.ins.MsgBox.showMsgBox("玩家 "+name+" 拒绝解散房间");
        }
    }
    
    /**
     * 解散桌子成功
     * */
    private Handle_CMD_S_DissTableSuccess(msg: GameIF.CustomMessage):void{
        
        //},this);
        var dissTable: M_HZMJ_GameMessage.CMD_S_DissTableSuccess = <M_HZMJ_GameMessage.CMD_S_DissTableSuccess>msg;
         M_HZMJView.ins.DissTable.node.active=false;
        if(0 == dissTable.gameing){
            M_HZMJClass.ins.ignoreForceLeft = true;
            
            M_HZMJView.ins.JieShuanView.node.active=false;
            M_HZMJView.ins.PlayFenXiang.startShow(()=>{
                this.ExitGame();
            },this);
        }
    }
        

    /**
     * 注册一个计时器
     * */
    public regTimer(timerid:number,timerLen:number,chair:number):void{
     
        this._timer.setTimer(timerid,timerLen,chair,this.onTimerEvent,this);
        
        M_HZMJView.ins.TimerView.node.active=true;
        M_HZMJView.ins.TimerView.showArrow = chair;
        M_HZMJView.ins.TimerView.timerNum = timerLen;
       
        
        
        
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
    public getTableConfig(): HZMJTableConfig{
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
        return ["Uyi.gameplug.M_HZMJ.HZMJ_SelfActive","Uyi.gameplug.M_HZMJ.HZMJ_DownActive","Uyi.gameplug.M_HZMJ.HZMJ_OppoActive","Uyi.gameplug.M_HZMJ.HZMJ_UpActive"];
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
        return `gameres/gameCommonRes/Texture/Mahjong/PaiHua/mahjong_${HZMJMahjongAlgorithm.GetMahjongColor(card)}_${HZMJMahjongAlgorithm.GetMahjongValue(card)}`;
    }
     public getMahjongPaiHuaRes(card: number): cc.SpriteFrame {
        return this.paihua.getSpriteFrame(`mahjong_${HZMJMahjongAlgorithm.GetMahjongColor(card)}_${HZMJMahjongAlgorithm.GetMahjongValue(card)}`);
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
     * 逻辑椅子号转物理椅子号
     * */
    public logic2physicalChair(chair: number): number {
        return (this.SelfChair + chair) % HZMJMahjongDef.gPlayerNum;
    }

    /**
     * 物理椅子号转逻辑椅子号
     * */
    public physical2logicChair(chair: number): number {
        return chair >= this.SelfChair ? chair - this.SelfChair : HZMJMahjongDef.gPlayerNum + chair - this.SelfChair;
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
        return HZMJ_CardView._freeActiveNode[chair];
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
        return HZMJ_CardView._freeFixedNode[chair];
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
        return HZMJ_CardView._freePoolNode[chair];
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
}
