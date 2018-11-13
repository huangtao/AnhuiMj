
import { GameBaseClass } from "../base/GameBaseClass";
import { MGMJMahjongDef, IMGMJClass, MGMJ, MGMJTableConfig, MGMJTimer, enGamePhase, MGMJOutCardPlayer, MGMJRecordCard, MGMJTimerDef, TingCardTip, MGMJSoundDef, enHuCardType, enMGMJAniType } from "./ConstDef/MGMJMahjongDef";
import { GameIF } from "../../CommonSrc/GameIF";
import { ShareParam } from "../../CustomType/ShareParam";
// import { String, set, Label, update, property } from '../../../../creator';
import SendMessage from '../../Global/SendMessage';
import PrefabClass from './PrefabClass';

import Global from "../../Global/Global";
import M_MGMJView from './M_MGMJView';
import MGMJ_GameInfo from"./SkinView/MGMJ_GameInfo"
import { MGMJMahjongAlgorithm } from "./MGMJMahjongAlgorithm/MGMJMahjongAlgorithm";
import { MGMJMahjongAlogrithmHaveHun } from "./MGMJMahjongAlgorithm/MGMJMahjongAlogrithmHaveHun";
import { AudioType, VoiceType } from "../../CustomType/Enum";
import { M_MGMJ_GameMessage } from "../../CommonSrc/M_MGMJ_GameMessage";
import { GameRuleData, M_MGMJ_GameData } from './M_MGMJSetting';
import MGMJEvent from './MGMJEvent';
import M_MGMJVoice from "./M_MGMJVoice";
import MGMJ_SingleFixedBase from './PlayerCard/single/MGMJ_SingleFixedBase';
import { enFixedCardType } from "../M_MGMJ/ConstDef/MGMJMahjongDef";
import { SetTextureRes } from "../MJCommon/MJ_Function";
import MGMJ_MsgBox from "./SkinView/MGMJ_MsgBox";
import { TranslateMoneyTypeName } from "../../Tools/Function";
import MGMJ_CardView from "./SkinView/MGMJ_CardView";
import MGMJ_BanlanceActive from "./PlayerCard/banlanceShow/MGMJ_BanlanceActive";
import MGMJ_BanlanceFixed from "./PlayerCard/banlanceShow/MGMJ_BanlanceFixed";
import MGMJ_JiFenBan from "./SkinView/MGMJ_JiFenBan";
import MGMJ_TingTip from "./SkinView/MGMJ_TingTip"; 
// import { Boolean, property, Node } from '../../../../creator';
import MGMJ_SelChi from './SkinView/MGMJ_SelChi';
import MGMJ_BaoTing from './SkinView/MGMJ_Bao';
import MGMJ_PaiWalls from './SkinView/MGMJ_PaiWalls';
import { QL_Common } from "../../CommonSrc/QL_Common";
const { ccclass, property } = cc._decorator;



@ccclass
export default class M_MGMJClass extends GameBaseClass implements IMGMJClass {

    public arr1:Boolean[];
    private static _ins: M_MGMJClass;
    public static get ins(): M_MGMJClass { return this._ins; }
    // @property(cc.Label)
    // label: cc.Label;

    // @property(cc.Node)
    // GameInfoView:cc.Node;
    // private MGMJ_GameInfoView:MGMJ_GameInfo;
    
    //牌蹲预制体
    @property(cc.Prefab)
    private prefabPai:cc.Prefab=null;

    @property(cc.SpriteAtlas)
    private paihua:cc.SpriteAtlas=null;

    @property(cc.SpriteAtlas)
    private paibei:cc.SpriteAtlas=null;
    @property(cc.SpriteAtlas)
    private paibei3d:cc.SpriteAtlas=null;
    
    @property(M_MGMJView)
    //GameView:M_MGMJView;
    private gameView:M_MGMJView=null;

        //
        //游戏信息
        //
        public _shareContext:string;
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

        //当前桌子人数
        public _currentPlayer:number = 0;

        //因为吃牌加的参数 
        public _sendMsg : boolean = false;
        public _eventMsg : any = null;

        //方向盘位置
        // private posX : number = M_MGMJView.ins.TimerView.node.x;
        // private posY : number = M_MGMJView.ins.TimerView.node.y;

        //牌桌配置
        private _tableConfig : MGMJTableConfig;
        /**
         * 牌桌配置
         * */
        public get TableConfig():MGMJTableConfig{
            return this._tableConfig;
        }
        
        private _timer : MGMJTimer;
        
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
        private _outCardPlayer : MGMJOutCardPlayer;
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
        
        private _recordCard:MGMJRecordCard;
        /**
         * 临泉麻将计牌器
         * */
        public get RecordCard():MGMJRecordCard{
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
                if(this.TableConfig.IsTableCreatorPay && this.TableConfig.alreadyGameNum < 1)
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
            if(MGMJMahjongDef.gInvalidMahjongValue == card){
                return false;
            }
            return true;
        }
        /**
         * 自己是否可以投票碰
         * */
        public get ifCanVotePeng():boolean{
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && MGMJMahjongAlgorithm.CheckVoteRight_Peng(this._voteRight)) {
                return true;
            }
            
            return false;
        }
        /**
         * 是否可以投票杠
         * */
        public get ifCanVoteGang():boolean{
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && MGMJMahjongAlgorithm.CheckVoteRight_Gang(this._voteRight)) {
                return true;
            }
            return false;
        }
        /**
         * 是否可以投票吃
         * */
        public get ifCanVoteChi():boolean{
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && MGMJMahjongAlgorithm.CheckVoteRight_Chi(this._voteRight)) {
                return true;
            }
            return false;
        }
        /**
         * 是否可以投票豹
         * */
        public get ifCanVoteBao():boolean{
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && MGMJMahjongAlgorithm.CheckVoteRight_Bao(this._voteRight)) {
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
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && MGMJMahjongAlgorithm.CheckVoteRight_Hu(this._voteRight)) {
                return true;
            }

            return false;
        }
        /**
         * 是否自己投票
         * */
        public get isSelfVote():boolean{
            cc.log("...."+this._gamePhase);
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && (MGMJMahjongDef.gVoteRightMask_Null != this._voteRight)) {
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
        public showTingCard(outCard:number,pos:number,tips:boolean):void{
            
            var checkAry:Array<number> = new Array<number>();
            var hunzi:Array<number> = new Array<number>();
            hunzi[0]= this._tableConfig.SetPeiZi; 
            for(var i:number=0; i<this._handCard.length; i++){
                if(MGMJMahjongDef.gInvalidMahjongValue != this._handCard[i]){
                    checkAry.push(this._handCard[i]);
                }
            }
            MGMJMahjongAlgorithm.delCard(checkAry,[outCard]);
            
            // var tingAry: Array<number> = MGMJMahjongAlgorithm.GetTingCardArray(checkAry);    
            var tingAry: Array<number> = MGMJMahjongAlogrithmHaveHun.GetTingCardArray(checkAry,hunzi);    
            console.log("听牌长度"+tingAry.length);
                   
            var tingTip: Array<TingCardTip> = new Array<TingCardTip>();
            
            if(tingAry.length > 0){
                
                for(var j:number=0; j<tingAry.length; j++){
                    checkAry.push(tingAry[j]);
                    console.log("听牌"+tingAry[j]);
                    tingTip.push(new TingCardTip(tingAry[j],0,this.RecordCard.getCardLeftNum(tingAry[j],this._handCard),hunzi[0]));

                    MGMJMahjongAlgorithm.delCard(checkAry,[tingAry[j]]);
                }
            }
            
            M_MGMJView.ins.TingTip.showTingTip(tingTip,tips);
            // if(tingTip.length > 0){
         
            //      if((pos + M_MGMJView.ins.TingTip.size.width/2) > 640){
            //     M_MGMJView.ins.TingTip.node.x = 640 - M_MGMJView.ins.TingTip.size.width;
            // }else if((pos - M_MGMJView.ins.TingTip.size.width/2) < -640){
            //     M_MGMJView.ins.TingTip.node.x = M_MGMJView.ins.TingTip.size.width - 640;
            // }
            // else
            // {
            //     M_MGMJView.ins.TingTip.node.x = pos - M_MGMJView.ins.TingTip.size.width/2;
            // }
            // }
            // M_MGMJView.ins.TingTip.node.x=-330;
            // M_MGMJView.ins.TingTip.node.y=-150;
        //    if(tingTip.length>0 && pos!=3000){
        //     if((pos-M_MGMJView.ins.TingTip.size.width/2)<-640){
        //         M_MGMJView.ins.TingTip.node.x=-540;

        //     }
        //     else if((pos + M_MGMJView.ins.TingTip.size.width/2) > 640){
        //         M_MGMJView.ins.TingTip.node.x = 640 - M_MGMJView.ins.TingTip.size.width;

        //     }
        //     else{
        //         M_MGMJView.ins.TingTip.node.x = pos - M_MGMJView.ins.TingTip.size.width/2;

        //     }
        // }else{
            
        //      M_MGMJView.ins.TingTip.node.x = 640 - M_MGMJView.ins.TingTip.size.width-200;

            

        //  }
        }

 
        /**
         * 计时器事件
         * */
        private onTimerEvent(timerid: number,chair: number,leftTickNum: number):void{
            M_MGMJView.ins.TimerView.timerNum = leftTickNum;
            if(chair != this.SelfChair){
                return;
            }
            switch(timerid){
                //玩家操作
                case MGMJTimerDef.timer_id_playerop:{
                    if((0 == leftTickNum) && this.ifCanOp && !this.isSelfCreateRoom) {
                        
                        M_MGMJView.ins.CardView.selfActive.activeEnable(false);
                        this.outCard(this.lastValidCard);
                    }
                    break;
                }
                //投票
                case MGMJTimerDef.timer_id_vote:{
                    if((0 == leftTickNum) && this.isSelfVote&& !this.isSelfCreateRoom) {
                        M_MGMJView.ins.OperatorView.node.active=false;
                        this.vote(MGMJMahjongDef.gVoteResult_GiveUp);
                    }
                    break;
                }
                //抢杠
                case MGMJTimerDef.timer_id_qianggang:{
                    if((0 == leftTickNum) && this.ifCanQiangGang&& !this.isSelfCreateRoom) {
                        M_MGMJView.ins.QiangGangView.node.active=false;
                        this.qiangGang(1);
                    }
                    break;
                }
                //准备
                case MGMJTimerDef.timer_id_ready:{
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

            M_MGMJView.ins.CardView.selfActive.activeEnable(false);
            M_MGMJView.ins.OperatorView.node.active=false;
            M_MGMJView.ins.SelGangView.node.active=false;

            M_MGMJView.ins.TimerView.hideArrow();
  
            M_MGMJView.ins.CardView.selfActive.showTingCardToken(null);
            M_MGMJView.ins.TingTip.showTingTip(null,true);
            
            var outCard: M_MGMJ_GameMessage.CMD_C_OutCard = new M_MGMJ_GameMessage.CMD_C_OutCard();
            outCard.outCard = card;
            this.SendGameData(outCard);

            //M_MGMJView.ins.TipMsgView.showTip("出了一张牌，4秒钟后自动隐藏",true,4);
            //console.log("======================================出了一张牌============================");
            //M_MGMJView.ins.MsgBox.showMsgBox("出了一张牌，多写很多字，看是否能够自动换行，出了一张牌，多写很多字，看是否能够自动换行，出了一张牌，多写很多字，看是否能够自动换行，出了一张牌，多写很多字，看是否能够自动换行，出了一张牌，多写很多字，看是否能够自动换行，");
        }
        
        /**
         * 投票
         * */
        private vote(voteResult : number):void{
            
            this._voteRight = MGMJMahjongDef.gVoteRightMask_Null;
            this._gamePhase = enGamePhase.GamePhase_Unknown;
            this.stopTimer();
            M_MGMJView.ins.CardView.selfActive.allDown();
            M_MGMJView.ins.CardView.selfActive.showTingCardToken(null);
            M_MGMJView.ins.TingTip.showTingTip(null,true);
            
            var vote: M_MGMJ_GameMessage.CMD_C_Vote = new M_MGMJ_GameMessage.CMD_C_Vote();
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

            var qiangGang: M_MGMJ_GameMessage.CMD_C_QiangGang = new M_MGMJ_GameMessage.CMD_C_QiangGang();
            qiangGang.qiangGang = qiang;
            this.SendGameData(qiangGang);
        }

        /**
         * 清理数据
         * */
        private clear():void{
            this._bankerChair = MGMJMahjongDef.gInvalidChar;
            this._gamePhase = enGamePhase.GamePhase_Unknown;
            this._activePlayer = MGMJMahjongDef.gInvalidChar;
            this._outCardPlayer.clear();
            this._recordCard.init();
            this._sz1 = 0;
            this._sz2 = 0;
            this._sendMsg = false;
            this._gameid="";
            this._alreadyHu=false;
            this._handCard.splice(0,this._handCard.length);
            this._gangCard.splice(0,this._gangCard.length);
            this._voteRight = MGMJMahjongDef.gVoteRightMask_Null;
            this._ifCanQiangGang = false;
            this._isTing=false;
            this._isIgnoreForceLeft=false;
        }

    onLoad() {
        super.onLoad();
        M_MGMJClass._ins = this;
        MGMJ.ins.iclass = this;

        //this._shareContext ="我正在玩《霍邱麻将》，已经建好游戏房间，就等你来战！";

        this._haveGameScene=false;
        //
        //初始化
        //
        this._timer = new MGMJTimer();
        this._tableConfig = new MGMJTableConfig();
        this._outCardPlayer = new MGMJOutCardPlayer();
        this._recordCard = new MGMJRecordCard();
        this._handCard = new Array<number>();
        this._gangCard = new Array<number>();
        MGMJ.ins.iclass = this;

        this.node.on(MGMJEvent.MGMJ_EVENT_TYPE,this.onGameViewEvent,this);
        
    }

    update(){
        super.update();
        this._timer.tick(Date.now() - this._curTime);
        this._curTime = Date.now();
    }

    
    // /**测试显示房号 */
    // private test():void{
    //     this.MGMJ_GameInfoView = this.GameInfoView.getComponent<MGMJ_GameInfo>(MGMJ_GameInfo);
    //     this.MGMJ_GameInfoView.tableCode="123456";
    // }


    public GetGameID(): number{
        return MGMJMahjongDef.gameID;
    }

    public OnGameMessage(cm: GameIF.CustomMessage): boolean{
        switch(cm.wSubCmdID){
                //桌子配置
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_TableConfig: {
                    this.Handle_CMD_S_TableConfig(cm);
                    break;
                }
                //游戏开始
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_Start:{
                    this.Handle_CMD_S_Start(cm);
                    break;
                }
                //骰子庄家信息
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_SZInfo:{
                    this.Handle_CMD_S_SZInfo(cm);
                    break;
                }        
                //初始化牌
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_InitCard: {
                    this.Handle_CMD_S_InitCard(cm);
                    break;
                }
                //游戏ID
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_GameID: {
                    this.Handle_CMD_S_GameID(cm);
                    break;
                }
                //玩家抓了一张牌
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_PlayerHoldCard: {
                    this.Handle_CMD_S_PlayerHoldCard(cm);
                    break;
                }
                //当前活动玩家
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_ActivePlayer: {
                    this.Handle_CMD_S_ActivePlayer(cm);
                    break;
                }
                //投票权限
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_VoteRight: {
                    this.Handle_CMD_S_VoteRight(cm);
                    break;
                }
                //玩家打出了一张牌
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_PlayerOutCard: {
                    this.Handle_CMD_S_PlayerOutCard(cm);
                    break;
                }
                //删除玩家牌池的最后一张牌
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_DelPoolCard: {
                    this.Handle_CMD_S_DelPoolCard(cm);
                    break;
                }
                //玩家吃牌
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_PlayerChiCard: {
                    this.Handle_CMD_S_PlayerChiCard(cm);
                    break;
                }
                //玩家碰牌
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_PlayerPengCard: {
                    this.Handle_CMD_S_PlayerPengCard(cm);
                    break;
                }
                //玩家暗杠牌
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_PlayerAnGangCard: {
                    this.Handle_CMD_S_PlayerAnGangCard(cm);
                    break;
                }
                //玩家明杠牌
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_PlayerMingGang: {
                    this.Handle_CMD_S_PlayerMingGang(cm);
                    break;
                }
                //玩家补杠牌
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_PlayerBuGangCard: {
                    this.Handle_CMD_S_PlayerBuGangCard(cm);
                    break;
                }
                //玩家胡牌
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_PlayerHuCard: {
                    this.Handle_CMD_S_PlayerHuCard(cm);
                    break;
                }
                //操作玩家
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_OpPlayer: {
                    this.Handle_CMD_S_OpPlayer(cm);
                    break;
                }
                //开始发牌
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_StartSendCard: {
                    this.Handle_CMD_S_StartSendCard(cm);
                    break;
                }
                //玩家断线
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_PlayerOffline: {
                    this.Handle_CMD_S_PlayerOffline(cm);
                    break;
                }
                //玩家断线重连进入
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_PlayerOfflineCome: {
                    this.Handle_CMD_S_PlayerOfflineCome(cm);
                    break;
                }
                //抢杠信息
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_QiangGang: {
                    this.Handle_CMD_S_QiangGang(cm);
                    break;
                }
                //删除抢杠牌
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_DelQiangGangCard:{
                    this.Handle_CMD_S_DelQiangGangCard(cm);
                    break;
                }
                //玩家手牌数据
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_PlayerCardData: {
                    this.Handle_CMD_S_PlayerCardData(cm);
                    break;
                }
                //结算信息
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_Balance: {
                    this.Handle_CMD_S_Balance(cm);
                    break;
                }
                //手牌数据
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_HandCardData:{
                    this.Handle_CMD_S_HandCardData(cm);
                    break;
                }
                //断线重连游戏信息
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_ORC_GameInfo:{
                    this.Handle_CMD_S_ORC_GameInfo(cm);
                    break;
                }
                //断线重连玩家手中牌
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_ORC_PlayerCard:{
                    this.Handle_CMD_S_ORC_PlayerCard(cm);
                    break;
                }
                //断线重连恢复投票阶段
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_ORC_Vote:{
                    this.Handle_CMD_S_ORC_Vote(cm);
                    break;
                }
                //断线重连结束
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_ORC_Over: {
                    this.Handle_CMD_S_ORC_Over(cm);
                    break;
                }
                //断线重连解散桌子
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_ORC_DissTable: {
                    this.Handle_CMD_S_ORC_DissTable(cm);
                    break;
                }
                //断线重连重置玩家分数
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_ORC_GameScoreChange:{
                    this.Handle_CMD_S_ORC_GameScoreChange(cm);
                    break;
                }
                //断线重连空闲状态进入
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_ORC_TableFree:{
                    this.Handle_CMD_S_ORC_TableFree(cm);
                    break;
                }
                //强退成功
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_ForceLeftSuccess: {
                    this.Handle_CMD_S_ForceLeftSuccess(cm);
                    break;
                }
                //桌子创建成功
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_CreateTableSuccess: {
                    //this.Handle_CMD_S_CreateTableSuccess(cm);
                    break;
                }
                //开始创建桌子
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_StartCreateTable: {
                    this.Handle_CMD_S_StartCreateTable(cm);
                    break;
                }
                //房主信息
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_TableCreatorInfo: {
                    this.Handle_CMD_S_TableCreatorInfo(cm);
                    break;
                }
                //强退玩家
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_ForceUserLeft:{
                    this.Handle_CMD_S_ForceUserLeft(cm);
                    break;
                }
                //显示提示信息
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_ShowMsg: {
                    this.Handle_CMD_S_ShowMsg(cm);
                    break;
                }
                //好友拒绝帮忙
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_FriendReject: {
                    //this.Handle_CMD_S_FriendReject(cm);
                    break;
                }
                //好友帮助成功
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_FriendHelpSuccess: {
                    //this.Handle_CMD_S_FriendHelpSuccess(cm);
                    break;
                }
                //好友请求信息
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_FriendHelpInfo: {
                    //this.Handle_CMD_S_FriendHelpInfo(cm);
                    break;
                }
                //新的一个回合
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_NewGameRound: {
                    this.Handle_CMD_S_NewGameRound(cm);
                    break;
                }
                //计分板结果
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_GameRecordResult: {
                    this.Handle_CMD_S_GameRecordResult(cm);
                    break;
                }
                //玩家余额
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_PlayerMoney:{
                    //this.Handle_CMD_S_PlayerMoney(cm);
                    break;
                }
                //有玩家申请解散桌子
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_PlayerDissTable: {
                    this.Handle_CMD_S_PlayerDissTable(cm);
                    break;
                }
                //玩家投票解散桌子结果
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_PlayerVoteDissTable: {
                    this.Handle_CMD_S_PlayerVoteDissTable(cm);
                    break;
                }
                //桌子解散成功
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_DissTableSuccess:{
                    this.Handle_CMD_S_DissTableSuccess(cm);
                    break;
                }

                //玩家准备
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_UseReady:{
                    this.Handle_CMD_S_UseReady(cm);
                    break;
                }
                //玩家保留桌子成功
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_SaveTableSuccess:{
                    this.Handle_CMD_S_SaveTableSuccess(cm);
                    break;
                }
                //听牌玩家相关判断
                 case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_Ting:{
                    this.Handle_CMD_S_Ting(cm);
                    break;
                }
                //解散房间时操作频繁相关信息
                 case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_IsDissolution:{
                    this.Handle_CMD_S_IsDissolution(cm);
                    break;
                }
                //显示服务端的版本号
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_Version:{
                    this.Handle_CMD_S_Version(cm);
                    break;
                }
                //开始跑
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_StartPao:{
                    this.Handle_CMD_S_StartPao(cm);
                    break;
                }
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_FanKaiHun:{
                this.Handle_CMD_S_FanKaiHun(cm);
                break;
                }
                //跑信息
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_PlayerPaoInfo:{
                    this.Handle_CMD_S_PlayerPaoInfo(cm);
                    break;
                }
                //豹子听（玩家可选豹听）
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_PlayerBaoTing:{
                    this.Handle_CMD_S_PlayerBaoTing(cm);
                    break;
                }
                //玩家选择了豹听
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_PlayerBao:{
                    this.Handle_CMD_S_PlayerBao(cm);
                    break;
                }
                //圈主钻石不足 将玩家踢出房间
                case M_MGMJ_GameMessage.MGMJMsgID_s2c.CMD_S_QuitCreator:{
                    this.Hanle_CMD_S_QuitCreator();
                }

                default:{
                    console.log(`未处理的指令:${cm.wMainCmdID} -- ${cm.wSubCmdID}`);
                    break;
                }
        }
        return true;
    }

    private Hanle_CMD_S_QuitCreator():void{
        M_MGMJView.ins._setting.onExit();
        M_MGMJView.ins.MsgBox.showMsgBox("圈主钻石不足,创建房间失败！");
    }
    /**
     * 把混皮牌发送到客户端
     * @param msg 
     */
    private Handle_CMD_S_FanKaiHun(msg: GameIF.CustomMessage):void{
        var hunpi:M_MGMJ_GameMessage.CMD_S_FanKaiHun=<M_MGMJ_GameMessage.CMD_S_FanKaiHun>msg;
        this._hunPiCard=hunpi.card;
        if(this.fankai){
              this.scheduleOnce(function () {
                M_MGMJView.ins.CardView.hunPi.ShowCard(this._hunPiCard);             
                 M_MGMJView.ins.CardView.hunPi.ShowCardHaveZZ(this._hunPiCard);
                console.log("--------延时翻牌-------")
            }.bind(this), 0.5)

        }else{
            M_MGMJView.ins.CardView.hunPi.ShowCard(this._hunPiCard);             
            M_MGMJView.ins.CardView.hunPi.ShowCardHaveZZ(this._hunPiCard);
        }
            
       

        
        
        //this._recordCard.outACard(hunpi.card);//这是听牌提示中显示剩余牌的结果
        //剩余牌显示
       // M_MGMJView.ins.GameInfo.holdACard();//这张牌算在20张牌里面
        
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
            MGMJ_CardView._freeActiveNode[i].clear();
            MGMJ_CardView._freeFixedNode[i].clear();
            MGMJ_CardView._freePoolNode[i].clear();
        }
        MGMJ_BanlanceActive._freeNode.clear();
        MGMJ_BanlanceFixed._freeNode.clear();
        MGMJ_JiFenBan._freeNode.clear();
        MGMJ_TingTip._freeNode.clear();
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
    //当前时间
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
        //var a  = this.TablePlayer;
        if(this.TablePlayer[chairID].PlayerState != QL_Common.GState.Gaming)
            this.showCheckIP();
        this.gameView.ReadyStatusUserInfo.OnPlayerSitDown(chairID,player);
        this.gameView.GameStatusUserInfo.OnPlayerSitDown(chairID,player);
        //踢人按钮
        if(M_MGMJClass.ins.SelfIsTableOwener){
            this.gameView.ReadyStatusUserInfo.kickBtn[0].node.active = true;
            this.gameView.ReadyStatusUserInfo.kickBtn[1].node.active = true;
            this.gameView.ReadyStatusUserInfo.kickBtn[2].node.active = true;
        }else{
            this.gameView.ReadyStatusUserInfo.kickBtn[0].node.active = false;
            this.gameView.ReadyStatusUserInfo.kickBtn[1].node.active = false;
            this.gameView.ReadyStatusUserInfo.kickBtn[2].node.active = false;
        }
    }
    /**
     * IP检测提示
     */
    protected showCheckIP(){
        var sameIPPlayer :Array<string> = new Array<string>();           
            for(var i:number=0; i<MGMJMahjongDef.gPlayerNum-1; i++){              
                var checkIPPlayer :string = i.toString();               
                for(var j:number=i+1; j<MGMJMahjongDef.gPlayerNum; j++){
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
                    M_MGMJView.ins.cheatBox.showCheatBox(tipMsg,()=>{M_MGMJView.ins._setting.onExit();},this);
                }   
            }
    }
    /**
     * 玩家坐下后告诉坐下的玩家,这个桌子上之前已经有哪些玩家了,这个函数需要同时处理玩家的状态显示
     * */
    protected OnTablePlayer(chairID: number, player: QL_Common.TablePlayer): void {
        //cc.log("OnPlayerSitDown:" + chairID.toString() + "," + player.FaceID + "," + player.NickName + "," + player.PlayerState);
        if(this.TablePlayer[chairID].PlayerState != QL_Common.GState.Gaming)
            this.showCheckIP();
        this.gameView.ReadyStatusUserInfo.OnTablePlayer(chairID,player);
        //踢人按钮
        if(M_MGMJClass.ins.SelfIsTableOwener){
            this.gameView.ReadyStatusUserInfo.kickBtn[0].node.active = true;
            this.gameView.ReadyStatusUserInfo.kickBtn[1].node.active = true;
            this.gameView.ReadyStatusUserInfo.kickBtn[2].node.active = true;
        }else{
            this.gameView.ReadyStatusUserInfo.kickBtn[0].node.active = false;
            this.gameView.ReadyStatusUserInfo.kickBtn[1].node.active = false;
            this.gameView.ReadyStatusUserInfo.kickBtn[2].node.active = false;
        }
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
    * 玩家道具
    * */
    protected OnPlayerChatItem(self_chairID: number, chairID: number, player: QL_Common.TablePlayer, index:string): void {
        var rechair = this.PhysicChair2LogicChair(self_chairID);
        var rechair1 = this.PhysicChair2LogicChair(chairID);       
        cc.log("收到玩家道具消息,发起者"+rechair1+"接收者"+rechair,"玩家实体昵称"+player.NickName+"动画文件索引"+index);
        M_MGMJView.ins.ShowChatItem(rechair1,rechair,index);
    }

    /**
     * 玩家聊天
     * */
    protected OnPlayerChat(chairID: number, player: QL_Common.TablePlayer, chatMsg: string): void {
        M_MGMJView.ins.ReadyStatusUserInfo.playerChat(chairID,chatMsg);
        M_MGMJView.ins.GameStatusUserInfo.playerChat(chairID,chatMsg);
    }

    /**
     * 玩家聊天
     * */
    protected OnPlayerChatIndex(chairID: number, player: QL_Common.TablePlayer, idx: number): void {
        console.log("收到编号为" + idx + "的消息");
        M_MGMJView.ins.ReadyStatusUserInfo.playerChat(chairID,this.MsgArray[idx]);
        M_MGMJView.ins.GameStatusUserInfo.playerChat(chairID,this.MsgArray[idx]);
        M_MGMJVoice.PlayChatVoice(idx, player.Gender,this.AudioManager.VoiceType);
    }

    /**
     * 玩家聊天
     * */
    protected OnPlayerChatEmoji(chairID: number, player: QL_Common.TablePlayer, clip: cc.AnimationClip): void {
        //console.log(url);
        M_MGMJView.ins.ReadyStatusUserInfo.playerLook(chairID,clip);
        M_MGMJView.ins.GameStatusUserInfo.playerLook(chairID,clip);
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
        M_MGMJVoice.PlayBgm(); 
        
        //清理数据
        this.clear();
        
        //通知玩家进入
        //this.node.dispatchEvent(new MGMJEvent(MGMJEvent.msg_playerComeing));
        this.gameView.playerComeing();
    }

    /**
     * 玩家余额发生改变
     * */
    protected OnPlayerScoreChange(): void {
        M_MGMJView.ins.ReadyStatusUserInfo.refreshSelfScore();
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
                M_MGMJView.ins.TimerView.node.active = false;
            }
            else{
                this.regTimer(MGMJTimerDef.timer_id_ready,timeTick,this.SelfChair);
                M_MGMJView.ins.TimerView.hideArrow();
            }
        }
    }

    /**
     * 一个玩家语音开始播放
     * @param chairID 
     * @returns {} 
     */
    protected OnPlayerVoiceStart(chairID: number) {
        M_MGMJView.ins.ReadyStatusUserInfo.playerPlayVoice(chairID);
        M_MGMJView.ins.GameStatusUserInfo.playerPlayVoice(chairID);
    }

    /**
     * 语音播放结束
     * @param chairID 
     * @returns {} 
     */
    protected OnPlayerVoiceEnd(chairID: number) {
        M_MGMJView.ins.ReadyStatusUserInfo.playerStopVoice(chairID);
        M_MGMJView.ins.GameStatusUserInfo.playerStopVoice(chairID);
    }

    /**
     * native环境下，玩家点击开启播放背景声音
     * @returns {} 
     */
    protected OnTurnOnMusic() {
        //由于egret出现bug，我们临时使用这种方法重新播放声音
        //在这里，调用 this.PlaySound() 播放背景音乐
        M_MGMJVoice.PlayBgm();
    }

    /**
     * 当程序从后台返回，网络状态有响应时
     */
    protected OnNetResponding() {
        super.OnNetResponding();
        var reSet: M_MGMJ_GameMessage.CMD_C_ReSetScene = new M_MGMJ_GameMessage.CMD_C_ReSetScene();
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

    public OnChiSel(chiNum:number,chiType:number){                  
          var chi : M_MGMJ_GameMessage.CMD_C_Chi = new M_MGMJ_GameMessage.CMD_C_Chi();
          chi.chiCard = chiNum;
          chi.chiType = chiType;
          this.SendGameData(chi);   
          this._sendMsg = true;
          this.chiFun(this._eventMsg);
    }
    public OnGangSel(gangCard:number){
        var gang : M_MGMJ_GameMessage.CMD_C_Gang = new M_MGMJ_GameMessage.CMD_C_Gang();
        gang.gangCard = gangCard;
        this.SendGameData(gang);
    }

    /**
     * GameView事件
     * */
    private onGameViewEvent(e:MGMJEvent):void{
        
        
        switch(e.msgCode){
            //继续游戏
            case MGMJEvent.msg_goongame: {
                this.clear();
                //if(this._timer.isRuning() && this._timer.TimerID==MGMJTimerDef.timer_id_ready){
                M_MGMJView.ins.TimerView.node.active = true;
                //}
                e.stopPropagation();
                this.stopTimer();
                //隐藏邀请好友按钮
                M_MGMJView.ins.ReadyStatusUserInfo.btn_invite.node.active = false;

                // M_MGMJView.ins.TimerView.node.active = false;
                //玩家点击继续游戏 清除所有的牌蹲
                M_MGMJView.ins.CardView.PaiWallView.hidePaiWall();
                //踢人按钮
                this.gameView.ReadyStatusUserInfo.kickBtn[0].node.active = false;
                this.gameView.ReadyStatusUserInfo.kickBtn[1].node.active = false;
                this.gameView.ReadyStatusUserInfo.kickBtn[2].node.active = false;
        
                break;
            }
            //发送准备
            case MGMJEvent.msg_ready:{
                this.SendUserReady();
                this.stopTimer();
                M_MGMJView.ins.TimerView.node.active = false;
                e.stopPropagation();
                break;
            }
            //牌阵整理完毕
            case MGMJEvent.msg_arrangeHandCardComplete:{
                if(this.GameStatus != enGamePhase.GamePhase_SendCard){
                    return;
                }
                this.SendGameData(new M_MGMJ_GameMessage.CMD_C_HoldCardComplete());
                e.stopPropagation();
                break;
            }
            //玩家打出牌
            case MGMJEvent.msg_outACard:{
                this.outCard(<number>e.parm);
                e.stopPropagation();
                break;
            }
            //投票
            case MGMJEvent.msg_vote:{
                this.vote(<number>e.parm);
                e.stopPropagation();
                break;
            }
            //杠牌
            case MGMJEvent.msg_gangCard:{              
                this._gamePhase = enGamePhase.GamePhase_Unknown;
                M_MGMJView.ins.CardView.selfActive.showTingCardToken(null);
                M_MGMJView.ins.TingTip.showTingTip(null,true);
                if(this._gangCard.length == 1){
                    var gang : M_MGMJ_GameMessage.CMD_C_Gang = new M_MGMJ_GameMessage.CMD_C_Gang();
                    gang.gangCard = this._gangCard[0];
                    this.SendGameData(gang);
                }else{
                    M_MGMJView.ins.SelGangView.showGang(this._gangCard);
                }
                e.stopPropagation();
                break;
            }
             //吃牌
            case MGMJEvent.msg_chiCard:{
                
                this._gamePhase = enGamePhase.GamePhase_Unknown;
                M_MGMJView.ins.CardView.selfActive.showTingCardToken(null);
                M_MGMJView.ins.TingTip.showTingTip(null,true);
                
                var chi : M_MGMJ_GameMessage.CMD_C_Chi = new M_MGMJ_GameMessage.CMD_C_Chi();
                let leftChi = false;
                let midChi = false;
                let rightChi = false;
                let chiStyle = 0;
                if(this._handCard.indexOf(this._outCardPlayer.Card-2) > -1 && this._handCard.indexOf(this._outCardPlayer.Card-1) > -1){
                    leftChi = true;
                    chi.chiType = 0;
                    chiStyle++;
                }
                if(this._handCard.indexOf(this._outCardPlayer.Card+1) > -1 && this._handCard.indexOf(this._outCardPlayer.Card-1) > -1){
                    midChi = true;
                    chi.chiType = 1;
                    chiStyle++;
                }
                if(this._handCard.indexOf(this._outCardPlayer.Card+2) > -1 && this._handCard.indexOf(this._outCardPlayer.Card+1) > -1){
                    rightChi = true;
                    chi.chiType = 2;
                    chiStyle++;
                }
                if((leftChi && !midChi && !rightChi) || (!leftChi && midChi && !rightChi) || (!leftChi && !midChi && rightChi)){
                    chi.chiCard = this._outCardPlayer.Card;
                    this.SendGameData(chi);

                    this.vote(<number>e.parm);
                    e.stopPropagation();
                    //e.stopPropagation();
                    break;
                    // chi.chiType = -1;
                }else if(chiStyle > 1){
                    //如果吃的选择大于一种 调预制体
                    cc.log("玩家有"+chiStyle+"种吃法,chiType分别为:leftChi|midChi|right| = "+ leftChi+"|"+midChi+"|"+rightChi);
                    M_MGMJView.ins.SelChiView.showChi(chiStyle,leftChi,midChi,rightChi,this._outCardPlayer.Card);
                    this._eventMsg = e;
                    this.chiFun(this._eventMsg);           
                    // if(this._sendMsg){
                    //     this.vote(<number>e.parm);
                    //     e.stopPropagation();
                    // }
                    
                }

            }
            case MGMJEvent.msg_baoting:{
                // M_MGMJView.ins.OperatorView.node.active=false;
                // this.SendGameData(new M_MGMJ_GameMessage.CMD_C_BaoTing());
                // e.stopPropagation();
                // break;
            }
            //自摸
            case MGMJEvent.msg_zimo:{
                M_MGMJView.ins.CardView.selfActive.showTingCardToken(null);
                M_MGMJView.ins.TingTip.showTingTip(null,true);

                this._gamePhase = enGamePhase.GamePhase_Unknown;
                this.SendGameData(new M_MGMJ_GameMessage.CMD_C_ZiMo());
                e.stopPropagation();
                break;
            }
            //抢杠
            case MGMJEvent.msg_qiangGang:{
                
                this.qiangGang(<number>e.parm);
                e.stopPropagation();
                break;
            }
            //跑
            case MGMJEvent.msg_pao:{
                this._gamePhase = enGamePhase.GamePhase_Unknown;
                var card :number = <number>e.parm;
                var pao : M_MGMJ_GameMessage.CMD_C_Pao = new M_MGMJ_GameMessage.CMD_C_Pao();
                pao.point = card;
                this.SendGameData(pao);
                e.stopPropagation();
                break;
            }
            //拉
            case MGMJEvent.msg_la:{
                this._gamePhase = enGamePhase.GamePhase_Unknown;
                var card :number = <number>e.parm;
                var la : M_MGMJ_GameMessage.CMD_C_La = new M_MGMJ_GameMessage.CMD_C_La();
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

    private chiFun(msg:any){
        if(this._sendMsg){
            this.vote(<number>msg.parm);
            msg.stopPropagation();
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
        var tableConfig: M_MGMJ_GameMessage.CMD_S_TableConfig = <M_MGMJ_GameMessage.CMD_S_TableConfig>msg;
        this.GameRule["GameData"] = tableConfig;
        // this.GameRule = tableConfig;
        this._tableConfig.init(
            tableConfig.PlayerNum,
            tableConfig.WaitTimeNum,
            tableConfig.CheckGps>0,
            tableConfig.SetPeiZi,
            tableConfig.DianPao>0,
            tableConfig.QiangGangHu>0,
            tableConfig.daiDaPai,
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
            tableConfig.IfCanSameIP>0,

            tableConfig.gangFen>0,
            tableConfig.canChi>0,
            tableConfig.gangFen>0,
            tableConfig.zhanZhuang>0,
            tableConfig.daiDaPai>0,
            tableConfig.whoLose>0,

            tableConfig.tableWhere
        );
        M_MGMJView.ins.ReadyStatusGameInfo.refresh();
        M_MGMJView.ins.ReadyStatusUserInfo.refreshSelfScore();
        M_MGMJView.ins.GameInfo.init();
        let gameCount:number=0;
        if(this._tableConfig.setGameNum == 0)
            gameCount = 8;
        if(this._tableConfig.setGameNum == 1)
            gameCount = 16;    
        M_MGMJView.ins.GameInfo.SetGameNum(this._tableConfig.alreadyGameNum,gameCount);
        M_MGMJView.ins.GameInfo.tableCode = tableConfig.TableCode;
        M_MGMJView.ins.ReadyStatusUserInfo.SelfReady();
        
        
        if(this._tableConfig.needHideUserMoney){
            M_MGMJView.ins.ReadyStatusUserInfo.hideUserMoney();
        }
        this.showFangxiang(this.getSelfChair());

        // SetTextureRes(url,M_MGMJView.ins.fangXiangView);

        // cc.loader.loadRes(url, cc.SpriteAtlas, function(err, atlas) {
        //     if(!err){
        //         var frame = atlas.getSpriteFrame("gfx_sifangdi_"+b);
        //         M_MGMJView.ins.fangXiangView.spriteFrame = frame;
        //     }else{
        //         cc.log(err+"加载路径不对!");
        //     }
        // });

    }

    private showFangxiang(a:number){
        //取到自己的椅子号
        // let a = this.getSelfChair();
        cc.log(a+"椅子号椅子号椅子号");
        //图片下标
        let b = (a + 1)%4;
        let c = (a + 2)%4;
        let d = (a + 3)%4;
        
        //方向盘
        M_MGMJView.ins.TimerView.node.active = true;
        M_MGMJView.ins.TimerView.lbl_timerNum.node.active = true;

        M_MGMJView.ins.TimerView.node.x = -1;
        M_MGMJView.ins.TimerView.node.y = 30;
        for(var i=0;i<4;i++){
            M_MGMJView.ins.TimerView.ArrowNode[i].node.opacity = 255;
            if(i!=a)
                M_MGMJView.ins.TimerView.sprite_0[i].node.active = false;
            if(i!=b)
                M_MGMJView.ins.TimerView.sprite_1[i].node.active = false;
            if(i!=c)
                M_MGMJView.ins.TimerView.sprite_2[i].node.active = false;
            if(i!=d)
                M_MGMJView.ins.TimerView.sprite_3[i].node.active = false;    
        }
    }
    /**
     * 游戏开始
     * */
    private Handle_CMD_S_Start(msg: GameIF.CustomMessage):void{
        var gameStart: M_MGMJ_GameMessage.CMD_S_Start = <M_MGMJ_GameMessage.CMD_S_Start>msg;
        this.clear();
        this._isIgnoreForceLeft=false;
        this.gameView.GameStart();

        //如果防作弊提示active 则直接隐藏
        M_MGMJView.ins.cheatBox.hideCheatBox();

        // M_MGMJView.ins.playMGMJAni(this.SelfChair,enMGMJAniType.aniType_start);

        //游戏开始 牌蹲显示
        this.gameView.CardView.PaiWallView.node.active = true;
        M_MGMJView.ins.CardView.PaiWallView.showPaiWall();

        //设置分享玩家信息
        this.gameView.GameJiFenBan.SetPlayerData();
        this.gameView.PlayFenXiang.SetPlayerData(gameStart.gameNum);

        M_MGMJView.ins.showGameNum(gameStart.totalGameNum,gameStart.gameNum,gameStart.realGameNum);
        M_MGMJView.ins.TipMsgView.node.active=false;
        
        for(var m:number=0; m<MGMJMahjongDef.gPlayerNum; m++){
            if(null == this.TablePlayer[m]) {
                continue;
            }
            //如果非断线玩家,设置成游戏状态
            if(QL_Common.GState.OfflineInGame != this.TablePlayer[m].PlayerState){
                this.TablePlayer[m].PlayerState = QL_Common.GState.Gaming;
            }          
        }
        
        if(this.isSelfCreateRoom){
            // var sameIPPlayer :Array<string> = new Array<string>();
            
            // for(var i:number=0; i<MGMJMahjongDef.gPlayerNum-1; i++){
                
            //     var checkIPPlayer :string = i.toString();
                
            //     for(var j:number=i+1; j<MGMJMahjongDef.gPlayerNum; j++){
            //         if(this.TablePlayer[i].UserIP == this.TablePlayer[j].UserIP){
            //             checkIPPlayer+=`,${j}`;
            //         }
            //     }
                
            //     //检查本次收到的是否全部包含在其他集合中
            //     if(checkIPPlayer.length > 1){
                    
            //         var add:boolean=true;
                    
            //         for(var m:number=0; m<sameIPPlayer.length; m++){
            //             if(sameIPPlayer[m].indexOf(checkIPPlayer) >= 0){
            //                 add=false;
            //                 break;
            //             }
            //         }
                    
            //         if(add){
            //             sameIPPlayer.push(checkIPPlayer);
            //         }
            //     }
            // }
            
            // if(this._tableConfig.alreadyGameNum == 0 && sameIPPlayer.length > 0){
                
            //     var tipMsg:string="";
                
            //     for(var n:number=0; n<sameIPPlayer.length; n++){
            //         var chairAry: Array<string> = sameIPPlayer[n].split(",");
            //         if(chairAry.length > 1){
            //             for(var x:number=0; x<chairAry.length; x++){
            //                 tipMsg += `玩家:${this.TablePlayer[parseInt(chairAry[x])].NickName}${x == (chairAry.length - 1) ? "":","}`;
            //             }
            //             tipMsg+="  IP相同"+"\n";
            //         }
            //         if(n != (sameIPPlayer.length - 1)){
            //             tipMsg+=" | ";
            //         }
            //     }     
            //     if(tipMsg.length > 0){
            //         //M_MGMJView.ins.TipMsgView.showTip(tipMsg,true,8);
            //         // M_MGMJView.ins.MsgBox.showMsgBox(tipMsg);
            //         this.ShowMsgBox(tipMsg);
                    
            //     }   
            // }
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
        var sz: M_MGMJ_GameMessage.CMD_S_SZInfo = <M_MGMJ_GameMessage.CMD_S_SZInfo>msg;
        this._bankerChair = sz.bankerChair;
        this._lianBanker=sz.lianBanker;
        this._sz1 = sz.sz1;
        this._sz2 = sz.sz2;
        
        //显示庄家
        M_MGMJView.ins.GameStatusUserInfo.setBankerChair(this._bankerChair,this._lianBanker);
        
        //掷完骰子后 这里删除牌蹲的牌
        //_bankerChair 本局庄家座位号
        // M_MGMJView.ins.PaiWallView.node.active = true;
        //M_MGMJView.ins.CardView.PaiWallView.delPaiWall(this._bankerChair,this.SelfChair,this._sz1+this._sz2);
        M_MGMJView.ins.CardView.PaiWallView.testPai(this._bankerChair,this.SelfChair,this._sz1+this._sz2,0,4);
    }

    private Handle_CMD_S_StartPao(msg: GameIF.CustomMessage):void{
         var pao: M_MGMJ_GameMessage.CMD_S_StartPao = <M_MGMJ_GameMessage.CMD_S_StartPao>msg;
              
        this._gamePhase=enGamePhase.GamePhase_Pao;
        M_MGMJView.ins.PaoView.node.active=true;
        M_MGMJView.ins.PaoView.btn_pao_0.node.active=true;
        M_MGMJView.ins.PaoView.btn_pao_1.node.active=true;
        if(pao.pao==false){
        M_MGMJView.ins.PaoView.btn_pao_2.node.active=true;
        }

        //this.regTimer(MGMJTimerDef.timer_id_vote,MGMJTimerDef.timer_len_vote,this.SelfChair);
    }

    private Handle_CMD_S_StartLa():void{
        this._gamePhase=enGamePhase.GamePhase_La;
        M_MGMJView.ins.LaView.node.active=true;
        //this.regTimer(MGMJTimerDef.timer_id_vote,MGMJTimerDef.timer_len_vote,this.SelfChair);
    }
    private Handle_CMD_S_PlayerPaoInfo(msg: GameIF.CustomMessage):void{
        var pao: M_MGMJ_GameMessage.CMD_S_PlayerPaoInfo = <M_MGMJ_GameMessage.CMD_S_PlayerPaoInfo>msg;

        M_MGMJView.ins.GameStatusUserInfo.SetPao(pao.points);
    }
    //豹听
    private Handle_CMD_S_PlayerBaoTing(msg: GameIF.CustomMessage):void{
        M_MGMJView.ins.SelBaoTing.node.active=true;
        M_MGMJView.ins.SelBaoTing.btn_bao.node.active=true;
        M_MGMJView.ins.SelBaoTing.btn_guo.node.active=true;
    }
    //通知所有玩家 有人选了豹听
    private Handle_CMD_S_PlayerBao(msg: GameIF.CustomMessage):void{
        var playerBao: M_MGMJ_GameMessage.CMD_S_PlayerBao = <M_MGMJ_GameMessage.CMD_S_PlayerBao>msg;
        M_MGMJView.ins.playMGMJAni(playerBao.chair,enMGMJAniType.aniType_bao);
    }

    //选择豹听
    public btnBaoClick(){
         M_MGMJView.ins.SelBaoTing.node.active=false;
         this.SendGameData(new M_MGMJ_GameMessage.CMD_C_BaoTing());
    }
    //放弃豹听
    public btnGuoClick(){
        M_MGMJView.ins.SelBaoTing.node.active=false;
        this.SendGameData(new M_MGMJ_GameMessage.CMD_C_GiveUpBaoTing());
    }

    private Handle_CMD_S_PlayerLaInfo(msg: GameIF.CustomMessage):void{
        var la: M_MGMJ_GameMessage.CMD_S_PlayerLaInfo = <M_MGMJ_GameMessage.CMD_S_PlayerLaInfo>msg;

        M_MGMJView.ins.GameStatusUserInfo.SetLa(la.points);
    }

    /**
     * 初始化牌
     * */
    private Handle_CMD_S_InitCard(msg: GameIF.CustomMessage): void {
        var initCard: M_MGMJ_GameMessage.CMD_S_InitCard = <M_MGMJ_GameMessage.CMD_S_InitCard>msg;
        this._handCard.splice(0,this._handCard.length);
        for(var i:number=0; i<initCard.cardAry.length; i++){
            if(MGMJMahjongDef.gInvalidMahjongValue != initCard.cardAry[i]){
                this._handCard.push(initCard.cardAry[i]);
            }
        }
    }
    /**
     * 游戏ID
     * */
    private Handle_CMD_S_GameID(msg: GameIF.CustomMessage): void {
        var gameid: M_MGMJ_GameMessage.CMD_S_GameID = <M_MGMJ_GameMessage.CMD_S_GameID>msg;
        this._gameid = gameid.gameid;
    }
    /**
     * 开始发牌
     * */
    private Handle_CMD_S_StartSendCard(msg: GameIF.CustomMessage): void {
        var startSendCard: M_MGMJ_GameMessage.CMD_S_StartSendCard = <M_MGMJ_GameMessage.CMD_S_StartSendCard>msg;
        this._gamePhase = enGamePhase.GamePhase_SendCard;
        //this.node.dispatchEvent(new MGMJEvent(MGMJEvent.msg_startSendCard));
        //延迟加载 因为要等待牌墙删除动作结束
      //  setTimeout(function(){
        // this.scheduleOnce(function () {
            this.gameView.StartSendCard();
            // console.log("--------延时发牌-------")
            // }.bind(this), 0.8)
      //  }.bind(this),800);
    }
    /**
     * 玩家手牌数据
     * */
    private Handle_CMD_S_HandCardData(msg: GameIF.CustomMessage):void{
        var handCard : M_MGMJ_GameMessage.CMD_S_HandCardData = <M_MGMJ_GameMessage.CMD_S_HandCardData>msg;
        this._handCard.splice(0,this._handCard.length);
        for(var i:number=0; i<handCard.handCardData.length; i++){
            this._handCard.push(handCard.handCardData[i]);
        }    
        MGMJMahjongAlgorithm.sortCardAry(this._handCard);
        //延迟加载 因为要等待牌墙删除动作结束
    //    setTimeout(function(){
        // this.scheduleOnce(function () {
            this.gameView.CardView.selfActive.refreshHandCardData(this._handCard);
            // console.log("--------延时发牌-------")
            // }.bind(this), 0.8)
      //  }.bind(this),600);
    }
    /**
     * 玩家抓牌
     * */
    private Handle_CMD_S_PlayerHoldCard(msg: GameIF.CustomMessage): void {
        var playerHoldCard: M_MGMJ_GameMessage.CMD_S_PlayerHoldCard = <M_MGMJ_GameMessage.CMD_S_PlayerHoldCard>msg;
        
        //剩余牌为10时 给tips提示
        if(136 - 52 - playerHoldCard.countPai == 10)
            M_MGMJView.ins.TipMsgView.showTip("剩余牌只有10张了...",true,5);

        this._outCardPlayer.clear();
        
        if((this.SelfChair == playerHoldCard.chair) && (MGMJMahjongDef.gInvalidMahjongValue != playerHoldCard.card)){
            this._handCard.push(playerHoldCard.card);
        }
        
        M_MGMJView.ins.GameInfo.holdACard();
        
        //玩家抓牌 去预制体删除对应牌蹲
        M_MGMJView.ins.CardView.PaiWallView.delOnePai(this.SelfChair,this._bankerChair,playerHoldCard.countPai,playerHoldCard.gangNum,playerHoldCard.usual);
        
        //玩家抓牌
        M_MGMJView.ins.CardView.playerHoldCard(playerHoldCard.chair,playerHoldCard.card);
        if((this.SelfChair == playerHoldCard.chair) && (MGMJMahjongDef.gInvalidMahjongValue != playerHoldCard.card)){
            M_MGMJView.ins.CardView.selfActive.setUpCardDown();
        }
    }
    /**
     * 当前活动玩家
     * */
    private Handle_CMD_S_ActivePlayer(msg: GameIF.CustomMessage): void {
        var activePlayer: M_MGMJ_GameMessage.CMD_S_ActivePlayer = <M_MGMJ_GameMessage.CMD_S_ActivePlayer>msg;
        this._gamePhase = enGamePhase.GamePhase_PlayerOP;
        this._activePlayer = activePlayer.playerChair;
        M_MGMJView.ins.CardView.selfActive.activeEnable(false);
        M_MGMJView.ins.OperatorView.node.active=false;
        M_MGMJView.ins.SelGangView.node.active=false;
        //注册计时器
        this.regTimer(MGMJTimerDef.timer_id_playerop,activePlayer.timer,this._activePlayer,this.SelfChair);
    }
    /**
     * 我的投票权限
     * */
    private Handle_CMD_S_VoteRight(msg: GameIF.CustomMessage): void {
        var voteRight: M_MGMJ_GameMessage.CMD_S_VoteRight = <M_MGMJ_GameMessage.CMD_S_VoteRight>msg;
        this._gamePhase = enGamePhase.GamePhase_Vote;
        this._voteRight = voteRight.voteRight;
        
        M_MGMJView.ins.OperatorView.showOP( MGMJMahjongAlgorithm.CheckVoteRight_Chi(this._voteRight)?1:0,
                                            MGMJMahjongAlgorithm.CheckVoteRight_Peng(this._voteRight),
                                            MGMJMahjongAlgorithm.CheckVoteRight_Gang(this._voteRight)?1:0,
                                            MGMJMahjongAlgorithm.CheckVoteRight_Hu(this._voteRight),
                                            true);
        this.regTimer(MGMJTimerDef.timer_id_vote,MGMJTimerDef.timer_len_vote,this._activePlayer,this.SelfChair);
    } 
    /**
     * 玩家打出牌
     * */
    private Handle_CMD_S_PlayerOutCard(msg: GameIF.CustomMessage): void {
        var playerOutCard: M_MGMJ_GameMessage.CMD_S_PlayerOutCard = <M_MGMJ_GameMessage.CMD_S_PlayerOutCard>msg;
        M_MGMJView.ins.CardView.hideOutCardArrow();
        
        this._outCardPlayer.playerOutCard(playerOutCard.chair,playerOutCard.card);

        // 放大牌
        this.splashUserOutMj(playerOutCard.chair,playerOutCard.card);

        this._recordCard.outACard(playerOutCard.card);
        let sex:number=this.TablePlayer[playerOutCard.chair].Gender==1?1:2;
        let chair = playerOutCard.chair;
        M_MGMJVoice.PlayCardType(`/sound/dapai.mp3`);
        //播放音效,todo
         if(true){//如果是普通话
            if(chair % 2 == 0)
                M_MGMJVoice.PlayCardType(`/sound/PT/1/mj_1_${MGMJMahjongAlgorithm.GetMahjongColor(playerOutCard.card)}_${MGMJMahjongAlgorithm.GetMahjongValue(playerOutCard.card)}.mp3`);
            else
                M_MGMJVoice.PlayCardType(`/sound/PT/2/mj_2_${MGMJMahjongAlgorithm.GetMahjongColor(playerOutCard.card)}_${MGMJMahjongAlgorithm.GetMahjongValue(playerOutCard.card)}.mp3`);
         }else{
            //M_MGMJVoice.PlayCardType(`/sound/${sex}/mj_${sex}_${MGMJMahjongAlgorithm.GetMahjongColor(playerOutCard.card)}_${MGMJMahjongAlgorithm.GetMahjongValue(playerOutCard.card)}.mp3`);
            //M_MGMJVoice.PlayDiaCardType(`resources/gameres/M_MGMJ/sound/dialectsound/${sex}/dsmj_${sex}_${MGMJMahjongAlgorithm.GetMahjongColor(playerOutCard.card)}_${MGMJMahjongAlgorithm.GetMahjongValue(playerOutCard.card)}.mp3`);
         }
        if(this._outCardPlayer.isValid){
            M_MGMJView.ins.CardView.addCard2Pool(this._outCardPlayer.Chair,this._outCardPlayer.Card);
        }          
        //活动牌阵处理
        M_MGMJView.ins.CardView.playerOutCard(playerOutCard.chair,playerOutCard.card);
             //听牌提示剩余牌可能要刷新
        // if(M_MGMJView.ins.TingTip.node.active){
        //     this.showTingCard(0,3000);
        // } 
        //如果是自己
        if(this.SelfChair == playerOutCard.chair){
            MGMJMahjongAlgorithm.delCard(this._handCard,[playerOutCard.card]);
            MGMJMahjongAlgorithm.sortCardAry(this._handCard);
            // let str="服务端出2牌"
            // for(let i=0;i<this._handCard.length;i++){
            //     str+=" "+this._handCard[i];
            // }
            // console.log(str);
            M_MGMJView.ins.CardView.selfActive.activeEnable(false);
            M_MGMJView.ins.CardView.selfActive.refreshHandCardData(this._handCard);
            
            M_MGMJView.ins.OperatorView.node.active=false;
            M_MGMJView.ins.SelGangView.node.active=false;

            M_MGMJView.ins.TimerView.hideArrow();
            M_MGMJView.ins.CardView.selfActive.allDown();

            M_MGMJView.ins.CardView.selfActive.showTingCardToken(null);
            M_MGMJView.ins.TingTip.showTingTip(null,true);
              this._isTing = MGMJMahjongAlgorithm.CheckIfCanTingCardArray(this._handCard);
            //   this.gameView.TingBtn(this._isTing);
            if(this._isTing){
                M_MGMJView.ins.btn_tingtip.node.active = true;
                this.showTingCard(0,3000,true);
            }else{
                M_MGMJView.ins.btn_tingtip.node.active = false;
            }
            // if(this._isTing){
            //     M_MGMJView.ins.GameStatusUserInfo.Ting = playerOutCard.chair;
            //    }

        }
            
        }
    
        
    
    // else{
    //         console.log("-----------变--牌变--牌---------")
    //          if(this._isTing){
    //             for(var k=0;k<4;k++)
    //            {
    //          for(var i=0;i<M_MGMJView.ins.CardView.getFixed(k)._fixedData.length;i++)
    //         {
    //             if(M_MGMJView.ins.CardView.getFixed(k)._fixedData[i].fixedType==enFixedCardType.FixedCardType_AGang)
    //             {
               
                
    //             var url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei1/pb1_showcard_self_1280`;
    //             SetTextureRes(url,M_MGMJView.ins.CardView.getFixed(k)._fixedData[i].bmp_cardbackAry[3]);
                 
    //              console.log("-----------变--牌变--牌---------")
    //             M_MGMJView.ins.CardView.getFixed(k)._fixedData[i].bmp_cardcolorAry[1].node.active=true;
    //         }}
    //            }}
    // }

    /**
     * [splashUserOutMj 出牌放大功能]
     * @Author   李爽
     * @DateTime 2018-10-13T17:12:22+0800
     * @param    {[type]}                 chair  [description]
     * @param    {[type]}                 outPai [description]
     */
    private splashUserOutMj(chair,outPai){
        // var action = cc.moveTo(0.1, 0, 120);
        // this.node.runAction(action);
        if(chair != this.SelfChair)
            M_MGMJView.ins.mg_out.showOutPai(chair,outPai);

        // var bgStr = "#shoupai2@2x.png";
        // var colorStr = $.Mj4_common.getNewCardRes(mj,"sp");
        // var bg = new sprite(bgStr);
        // var sprite = new sprite("#" + colorStr);
        // bg.addChild(sprite,0);
        // sprite.attr({
        //     x: bg.width / 2,
        //     y: bg.height / 2 - 5,
        //     anchorX: 0.5,
        //     anchorY: 0.5
        // });
        // var flareBg = new sprite("#texie_diban_light@2x.png");
        // bg.addChild(flareBg,-1);
        // flareBg.attr({
        //     x: bg.width / 2,
        //     y: bg.height / 2 + 2.5,
        //     anchorX: 0.5,
        //     anchorY: 0.5
        // });
        // flareBg.setScale(0.91);
        // this.dialogSelfParent.addChild(bg,101);
        // bg.setPosition(this.mjEffectPosition[viewseat]);
        // bg.runAction(cc.sequence(cc.delayTime(0.3),cc.fadeOut(0.1),
        //     cc.callFunc(function () {
        //         sprite.removeFromParent(true);
        //     })));
        // bg.setScale(1.2);
        // sprite.runAction(cc.sequence(cc.delayTime(0.3),cc.fadeOut(0.1)));
        // flareBg.runAction(cc.sequence(cc.delayTime(0.3),cc.fadeOut(0.1)));
    }


    /**
     * 删除玩家牌池牌
     * */
    private Handle_CMD_S_DelPoolCard(msg: GameIF.CustomMessage): void {
        var DelCard: M_MGMJ_GameMessage.CMD_S_DelPoolCard = <M_MGMJ_GameMessage.CMD_S_DelPoolCard>msg;    
        M_MGMJView.ins.CardView.delCardinPool(DelCard.chair,DelCard.card,DelCard.cardnum);
    }


    /**
     * 玩家吃牌
     * */
    private Handle_CMD_S_PlayerChiCard(msg: GameIF.CustomMessage): void {
        var playerChi: M_MGMJ_GameMessage.CMD_S_PlayerChiCard = <M_MGMJ_GameMessage.CMD_S_PlayerChiCard>msg;
        
        let sex:number=this.TablePlayer[playerChi.chair].Gender==1?1:2;
        let chair:number = playerChi.chair;
        //音效
        if(chair%2 == 0)
            M_MGMJVoice.PlayCardType(`/sound/1/chi_1.mp3`);
        else
            M_MGMJVoice.PlayCardType(`/sound/1/chi_2.mp3`);
        //动画
        // M_MGMJView.ins.playMGMJAni(playerChi.chair,enMGMJAniType.aniType_chi);
        M_MGMJView.ins.playMGMJAni(playerChi.chair,enMGMJAniType.aniType_chi);
        // M_MGMJView.ins.CardView.hideOutCardArrow();
        //清理玩家打出的牌
        this._outCardPlayer.clear();
        
        //处理吃牌
        // if(M_MGMJView.ins.TingTip.node.active){
        //     this.showTingCard(0,3000);
        // }
        M_MGMJView.ins.CardView.playerChi(playerChi.chair,playerChi.card,playerChi.outChair,playerChi.chi_type);
        
        if(playerChi.chi_type == 0){
            this._recordCard.chiACard(playerChi.card-1);
            this._recordCard.chiACard(playerChi.card-2);
        }
        if(playerChi.chi_type == 1){
            this._recordCard.chiACard(playerChi.card-1);
            this._recordCard.chiACard(playerChi.card+1);
        }
        if(playerChi.chi_type == 2){
            this._recordCard.chiACard(playerChi.card+1);
            this._recordCard.chiACard(playerChi.card+2);
        }

        //如果是自己
        if(this.SelfChair == playerChi.chair){
            if(playerChi.chi_type == 0){
                MGMJMahjongAlgorithm.delCard(this._handCard,[playerChi.card - 1,playerChi.card - 2]);
            }
            if(playerChi.chi_type == 1){
                MGMJMahjongAlgorithm.delCard(this._handCard,[playerChi.card - 1,playerChi.card + 1]);
            }
            if(playerChi.chi_type == 2){
                MGMJMahjongAlgorithm.delCard(this._handCard,[playerChi.card + 1,playerChi.card + 2]);
            }
            MGMJMahjongAlgorithm.sortCardAry(this._handCard);
        }
        this._sendMsg = false;
    }

    /**
     * 玩家碰牌
     * */
    private Handle_CMD_S_PlayerPengCard(msg: GameIF.CustomMessage): void {
        //当有玩家碰牌时 吃的选项view需要隐藏
        if(M_MGMJView.ins.SelChiView.node.active = true){
            M_MGMJView.ins.SelChiView.node.active = false;
        }
        var playerPeng: M_MGMJ_GameMessage.CMD_S_PlayerPengCard = <M_MGMJ_GameMessage.CMD_S_PlayerPengCard>msg;
        
        let sex:number=this.TablePlayer[playerPeng.chair].Gender==1?1:2;
        let chair:number = playerPeng.chair;
        //音效
        if(chair%2 == 0)
            M_MGMJVoice.PlayCardType(`/sound/1/peng_1.mp3`);
        else
            M_MGMJVoice.PlayCardType(`/sound/1/peng_2.mp3`);
        
        //动画
        M_MGMJView.ins.playMGMJAni(playerPeng.chair,enMGMJAniType.aniType_peng);
        M_MGMJView.ins.CardView.hideOutCardArrow();
        //清理玩家打出的牌
        this._outCardPlayer.clear();
        
        //处理碰牌
        // if(M_MGMJView.ins.TingTip.node.active){
        //     this.showTingCard(0,3000);
        // }
        M_MGMJView.ins.CardView.playerPeng(playerPeng.chair,playerPeng.card,playerPeng.outChair);
        this._recordCard.pengACard(playerPeng.card);
        //如果是自己
        if(this.SelfChair == playerPeng.chair){
            MGMJMahjongAlgorithm.delCard(this._handCard,[playerPeng.card,playerPeng.card]);
            MGMJMahjongAlgorithm.sortCardAry(this._handCard);
        }
    }
    /**
     * 玩家暗杠
     * */
    private Handle_CMD_S_PlayerAnGangCard(msg: GameIF.CustomMessage): void {
        var playerAGang: M_MGMJ_GameMessage.CMD_S_PlayerAnGangCard = <M_MGMJ_GameMessage.CMD_S_PlayerAnGangCard>msg;
        
        let sex:number=this.TablePlayer[playerAGang.chair].Gender==1?1:2;
        let chair:number = playerAGang.chair;
        // 音效
        if(chair%2 == 0)
            M_MGMJVoice.PlayCardType(`/sound/1/gang_1.mp3`);
        else
            M_MGMJVoice.PlayCardType(`/sound/1/gang_2.mp3`);
        //动画
        M_MGMJView.ins.playMGMJAni(playerAGang.chair,enMGMJAniType.aniType_anGang);
        
        //处理暗杠牌
        // if(M_MGMJView.ins.TingTip.node.active){
        //     this.showTingCard(0,3000);
        // }
        M_MGMJView.ins.CardView.playerAGang(playerAGang.chair,playerAGang.card);
        this._recordCard.gangACard(playerAGang.card);
        //如果是自己
        if(this.SelfChair == playerAGang.chair) {
            MGMJMahjongAlgorithm.delCard(this._handCard,[playerAGang.card,playerAGang.card,playerAGang.card,playerAGang.card]);
            MGMJMahjongAlgorithm.sortCardAry(this._handCard);
            this._recordCard.gangACard(playerAGang.card);
        }
    }
    /**
     * 玩家明杠/直杠
     * */
    private Handle_CMD_S_PlayerMingGang(msg: GameIF.CustomMessage): void {
        //当有玩家明杠时 吃的选项view需要隐藏
        if(M_MGMJView.ins.SelChiView.node.active = true){
            M_MGMJView.ins.SelChiView.node.active = false;
        }
        var playerMGang: M_MGMJ_GameMessage.CMD_S_PlayerMingGang = <M_MGMJ_GameMessage.CMD_S_PlayerMingGang>msg;
        
        let sex:number=this.TablePlayer[playerMGang.chair].Gender==1?1:2;
        let chair:number = playerMGang.chair;
        // 音效
        if(chair%2 == 0)
            M_MGMJVoice.PlayCardType(`/sound/1/gang_1.mp3`);
        else
            M_MGMJVoice.PlayCardType(`/sound/1/gang_2.mp3`);
        //动画
        M_MGMJView.ins.playMGMJAni(playerMGang.chair,enMGMJAniType.aniType_minggGang);
        M_MGMJView.ins.CardView.hideOutCardArrow();
        this._outCardPlayer.clear();
        //M_MGMJView.ins.OutCardView.show = false;
        
        //处理明杠牌
        // if(M_MGMJView.ins.TingTip.node.active){
        //     this.showTingCard(0,3000);
        // }
        M_MGMJView.ins.CardView.playerMGang(playerMGang.chair,playerMGang.card,playerMGang.outChair);
        this._recordCard.gangACard(playerMGang.card);
        //如果是自己
        if(this.SelfChair == playerMGang.chair) {
            MGMJMahjongAlgorithm.delCard(this._handCard,[playerMGang.card,playerMGang.card,playerMGang.card]);
            MGMJMahjongAlgorithm.sortCardAry(this._handCard);
        }
    }
    /**
     * 玩家补杠/巴杠
     * */
    private Handle_CMD_S_PlayerBuGangCard(msg: GameIF.CustomMessage): void {
        var playerBGang: M_MGMJ_GameMessage.CMD_S_PlayerBuGangCard = <M_MGMJ_GameMessage.CMD_S_PlayerBuGangCard>msg;
        
        let sex:number=this.TablePlayer[playerBGang.chair].Gender==1?1:2;
        var chair:number = playerBGang.chair;
        // 音效
        if(chair%2 == 0)
            M_MGMJVoice.PlayCardType(`/sound/1/gang_1.mp3`);
        else
            M_MGMJVoice.PlayCardType(`/sound/1/gang_2.mp3`);

        //动画
        M_MGMJView.ins.playMGMJAni(playerBGang.chair,enMGMJAniType.aniType_minggGang);
        
        //处理补杠牌
        // if(M_MGMJView.ins.TingTip.node.active){
        //     this.showTingCard(0,3000);
        // }
        M_MGMJView.ins.CardView.playerBGang(playerBGang.chair,playerBGang.card);
        this._recordCard.gangACard(playerBGang.card);
        //如果是自己
        if(this.SelfChair == playerBGang.chair) {
            MGMJMahjongAlgorithm.delCard(this._handCard,[playerBGang.card]);
            MGMJMahjongAlgorithm.sortCardAry(this._handCard);
        }
    }

    /**
     * 玩家胡牌
     * */
    private Handle_CMD_S_PlayerHuCard(msg: GameIF.CustomMessage): void {
        //当有玩家胡牌时 吃的选项view需要隐藏
        if(M_MGMJView.ins.SelChiView.node.active = true){
            M_MGMJView.ins.SelChiView.node.active = false;
        }
        var playerHu: M_MGMJ_GameMessage.CMD_S_PlayerHuCard = <M_MGMJ_GameMessage.CMD_S_PlayerHuCard>msg;
        this.fankai= true;
        let sex:number=this.TablePlayer[playerHu.chair].Gender==1?1:2;
        // M_MGMJView.ins.GameInfo.init();
        
        switch(playerHu.huType){
            case enHuCardType.HuCardType_GangShaPao:
            case enHuCardType.HuCardType_PingHu:{
                //清理玩家打出的牌
                this._outCardPlayer.clear();
                if(playerHu.chair%2 == 0)
                    M_MGMJVoice.PlayCardType(`/sound/1/hu_1.mp3`);
                else
                    M_MGMJVoice.PlayCardType(`/sound/1/hu_2.mp3`);
                M_MGMJView.ins.playMGMJAni(playerHu.chair,enMGMJAniType.aniType_huCard);
                break;
            }
            case enHuCardType.HuCardType_QiangGangHu:{
                if(playerHu.chair%2 == 0)
                    M_MGMJVoice.PlayCardType(`/sound/1/hu_1.mp3`);
                else
                    M_MGMJVoice.PlayCardType(`/sound/1/hu_2.mp3`);
                M_MGMJView.ins.playMGMJAni(playerHu.chair,enMGMJAniType.aniType_huCard);
                this._recordCard.outACard(playerHu.card);
                break;
            }
            case enHuCardType.HuCardType_ZiMo:{
                if(playerHu.chair%2 == 0)
                    M_MGMJVoice.PlayCardType(`/sound/1/zimo_1.mp3`);
                else
                    M_MGMJVoice.PlayCardType(`/sound/1/zimo_2.mp3`);
                M_MGMJView.ins.playMGMJAni(playerHu.chair,enMGMJAniType.aniType_ziMo);
                this._recordCard.outACard(playerHu.card);
                break;
            }
            case enHuCardType.HuCardType_GangShangHua:{
                if(playerHu.chair%2 == 0)
                    M_MGMJVoice.PlayCardType(`/sound/1/zimo_1.mp3`);
                else
                    M_MGMJVoice.PlayCardType(`/sound/1/zimo_2.mp3`);
                M_MGMJView.ins.playMGMJAni(playerHu.chair,enMGMJAniType.aniType_ziMo);
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
        var op: M_MGMJ_GameMessage.CMD_S_OpPlayer = <M_MGMJ_GameMessage.CMD_S_OpPlayer>msg;
        this.gameView.TingTip.node.active=false;
        //this.gameView.TingBtn(false);
        this._gangCard.splice(0,this._gangCard.length);
        if((null != op.gangCard) && (op.gangCard.length > 0)){
            for(var i:number=0; i<op.gangCard.length; i++){
                this._gangCard.push(op.gangCard[i]);
            }
        }
    
        if((this._gangCard.length > 0) || (op.ifCanZiMo > 0)){
            M_MGMJView.ins.OperatorView.showOP(0,false,this._gangCard.length,op.ifCanZiMo > 0,true);
            // if(this._gangCard.length > 1){
            //     M_MGMJView.ins.SelGangView.showGang(this._gangCard);
            // }else if(this._gangCard.length == 1){
            //     M_MGMJView.ins.OperatorView.showOP(0,false,this._gangCard.length,op.ifCanZiMo > 0,true);
            // }
            
        }
        cc.log("当前操作玩家11111111111111");
        M_MGMJView.ins.CardView.selfActive.refreshCardStatus();
        M_MGMJView.ins.CardView.selfActive.standPai();
        //检查打出哪些牌可以听牌
        var tingToken: Array<number> = MGMJMahjongAlgorithm.GetLastCardToTing(this._handCard);
      cc.log("当前操作玩家22222222222222222");
        //console.log("听牌"+tingToken.length)
        M_MGMJView.ins.CardView.selfActive.showTingCardToken(tingToken);
    }
    /**
     * 开始抢杠
     * */
    private Handle_CMD_S_QiangGang(msg: GameIF.CustomMessage): void {
        var startQiangGang: M_MGMJ_GameMessage.CMD_S_QiangGang = <M_MGMJ_GameMessage.CMD_S_QiangGang>msg;
        
        this._gamePhase = enGamePhase.GamePhase_QiangGang;
        this._ifCanQiangGang=true;
        
        M_MGMJView.ins.QiangGangView.showQiangGang(startQiangGang.card);
        
        //注册计时器
        this.regTimer(MGMJTimerDef.timer_id_qianggang,MGMJTimerDef.timer_len_qianggang,this.SelfChair);
    }
    /**
     * 删除抢杠牌
     * */
    private Handle_CMD_S_DelQiangGangCard(msg: GameIF.CustomMessage):void{
        var qiangGangCard : M_MGMJ_GameMessage.CMD_S_DelQiangGangCard = <M_MGMJ_GameMessage.CMD_S_DelQiangGangCard>msg;
        M_MGMJView.ins.CardView.selfActive.outACard(qiangGangCard.card);
        MGMJMahjongAlgorithm.delCard(this._handCard,[qiangGangCard.card]);
        MGMJMahjongAlgorithm.sortCardAry(this._handCard);
    }
    /**
     * 某个玩家手中牌
     * */
    private Handle_CMD_S_PlayerCardData(msg: GameIF.CustomMessage): void {
        var playerCardData: M_MGMJ_GameMessage.CMD_S_PlayerCardData = <M_MGMJ_GameMessage.CMD_S_PlayerCardData>msg;
        MGMJMahjongAlgorithm.sortCardAry(playerCardData.handCard);
        M_MGMJView.ins.CardView.getActive(playerCardData.chair).showLieCard(playerCardData.handCard,playerCardData.huCard);
        M_MGMJView.ins.CardView.getActive(playerCardData.chair).activeEnable(false);
    }
    /**
     * 本局结算结果
     * */
    private Handle_CMD_S_Balance(msg: GameIF.CustomMessage): void {
        var balance: M_MGMJ_GameMessage.CMD_S_Balance = <M_MGMJ_GameMessage.CMD_S_Balance>msg;
        
        this._outCardPlayer.clear();
        this.gameView.OperatorView.node.active=false;
        this.gameView.QiangGangView.node.active=false;
        this.gameView.SelGangView.node.active=false;
        this.gameView.TingTip.node.active=false;
        //this.gameView.TingBtn(false);
        this.stopTimer();

        var recordData:Array<number> = new Array<number>();
        for(var i:number=0; i<balance.playerBalance.length; i++){
            recordData.push(balance.playerBalance[i].TotalScore);
        }
        M_MGMJView.ins.GameJiFenBan.gameRecord(recordData);
        M_MGMJView.ins.PlayFenXiang.gameRecord(recordData);
        M_MGMJView.ins.JieShuanView.showJieShuan(balance);
               if(this.TableConfig.isPlayEnoughGameNum){
              M_MGMJView.ins.DissTable.node.active=false;
        }
        M_MGMJView.ins.UserData.node.active=false;
    }

    /**
     * 新的游戏回合开始
     * */
    private Handle_CMD_S_NewGameRound(msg: GameIF.CustomMessage): void {
        //新的回合开始
        M_MGMJView.ins.GameJiFenBan.gameroundStart();
    }
    
    /**
     * 记分板数据结果
     * */
    private Handle_CMD_S_GameRecordResult(msg: GameIF.CustomMessage): void {
        var data : M_MGMJ_GameMessage.CMD_S_GameRecordResult = <M_MGMJ_GameMessage.CMD_S_GameRecordResult>msg;
        M_MGMJView.ins.GameJiFenBan.gameRecordDataCome(data.record);
        M_MGMJView.ins.PlayFenXiang.gameRecordDataCome(data.record);
    }
    /**
     * 强制玩家离开
     * */
    private Handle_CMD_S_ForceUserLeft(msg: GameIF.CustomMessage): void {
        var forceLeft : M_MGMJ_GameMessage.CMD_S_ForceUserLeft = <M_MGMJ_GameMessage.CMD_S_ForceUserLeft>msg;
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
        // var playerTing: M_MGMJ_GameMessage.CMD_S_Ting = <M_MGMJ_GameMessage.CMD_S_Ting>msg;

        //听牌显示杠
        
        // for (var i = 0; i < M_MGMJView.ins.CardView.getFixed(playerTing.TingNum)._fixedData.length; i++) {
        //     if (M_MGMJView.ins.CardView.getFixed(playerTing.TingNum)._fixedData[i].fixedType == enFixedCardType.FixedCardType_AGang) {
        //         this._recordCard.gangACard(M_MGMJView.ins.CardView.getFixed(playerTing.TingNum)._fixedData[i].cardValue);
        //         M_MGMJView.ins.CardView.getFixed(playerTing.TingNum)._fixedData[i].bmp_cardcolorAry[3].node.active = false;
        //     }
        // }
    }

     private Handle_CMD_S_IsDissolution(msg:GameIF.CustomMessage):void

    {
        var busy: M_MGMJ_GameMessage.CMD_S_IsDissolution = <M_MGMJ_GameMessage.CMD_S_IsDissolution>msg;
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
        var VS: M_MGMJ_GameMessage.CMD_S_Version = <M_MGMJ_GameMessage.CMD_S_Version>msg;
        M_MGMJView.ins.Help.SV.string="SV"+VS.Version;
        }




    /**
     * 玩家准备
     */
    private Handle_CMD_S_UseReady(msg: GameIF.CustomMessage):void{
        var ReadyUser:M_MGMJ_GameMessage.CMD_S_UseReady=<M_MGMJ_GameMessage.CMD_S_UseReady>msg;

        let sex:number=this.TablePlayer[ReadyUser.chair].Gender==1?1:2;
        M_MGMJVoice.PlayCardType(`/sound/ready_${sex}.mp3`);
        // //非断线状态玩家状态改为准备状态
        // if(QL_Common.GState.OfflineInGame != this.TablePlayer[ReadyUser.chair].PlayerState){
        //     this.TablePlayer[ReadyUser.chair].PlayerState = QL_Common.GState.PlayerReady;
        // }
        // M_MGMJView.ins.reMain.node.active=true;
        // M_MGMJView.ins.num.node.active=true;
        // M_MGMJView.ins.num1.node.active=true;
        // this._lianBanker=ReadyUser.reMain;
        // console.log("-----++++++++++++------")
        // M_MGMJView.ins.showreMain(this._lianBanker);
        // M_MGMJView.ins.ReadyStatusUserInfo.OnShowUserState(ReadyUser.chair);
        M_MGMJView.ins.ReadyStatusUserInfo.OnPlayerStatusChange(ReadyUser.chair,this.TablePlayer[ReadyUser.chair].PlayerState);
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
        //请求创建房间
               
        const gameRuleData: GameRuleData = <GameRuleData>this.GameRule;

        const data = gameRuleData.GameData;
        
        var createTable : M_MGMJ_GameMessage.CMD_C_CreateTable = new M_MGMJ_GameMessage.CMD_C_CreateTable();
        
        // createTable.CellScore = data.CellScore;
        createTable.PlayerNum = data.PlayerNum;
        createTable.WaitTimeNum = data.OutCardTime;
        createTable.SetGameNum = data.SetGameNum;
        createTable.SetPeiZi = data.SetPeiZi;
        createTable.zhanZhuang = data.zhanZhuang;
        createTable.DianPao = data.DianPao;
        createTable.QiangGangHu = data.QiangGangHu;
        createTable.IfCanSameIp=data.IfCanSameIP;
        createTable.CheckGps=data.CheckGps;
        createTable.isTableCreatorPay=data.tableCreatorPay;
//-------------------------------------------------------------------
        createTable.isYiPaoDuoXiang = data.isYiPaoDuoXiang?1:0;
        createTable.QiDuiJia = data.isQiDui?1:0;
        createTable.BuKaoJia = data.isBuKao?1:0;
        createTable.GangKaiJia = data.isGangKai?1:0;
        createTable.LaPaoZuo = data.isLaPaoZuo?1:0;
       
        createTable.GoldRoomBaseIdx = 1;//data.GoldRoomBaseIdx;//this._selBaseMoney.baseMoneyIdx;
        createTable.IsRecordScoreRoom = 1;//this._cbx_jifenRoom.isSel ? 1 : 0;
        createTable.TableCode = M_MGMJClass.ins.TableID.toString();
        
        createTable.TableCost = gameRuleData.TableCost;
        
        createTable.canChi = data.canChi;
        createTable.daiDaPai = data.daiDaPai;
        createTable.gangFen = data.gangFen;
        createTable.whoLose = data.whoLose;
        
        // if(data.tableCreatorPay==2){//如果是房主支付
        //     if(data.SetGameNum ==0){ //如果是8局
        //          createTable.TableCost = 32;//桌费32钻
        //     }else  if(data.SetGameNum ==1){//如果是16局
        //         createTable.TableCost = 64;//桌费64钻
        //     }else{
        //         createTable.TableCost = 64;//局数未取到，默认桌费64钻
        //     }
           
        // }else if(data.tableCreatorPay==1) {//如果是AA支付
        //     if(data.SetGameNum ==0){
        //         createTable.TableCost = 8;
        //     }else if(data.SetGameNum ==1){
        //         createTable.TableCost = 16;
        //     }else{
        //         createTable.TableCost = 16;
        //     }
        // }
        //设置分享内容
        // if(this._tableConfig.isValid){
            this._shareContext = this._tableConfig.shareContext;
        // }

        this.SendGameData(createTable);
    }

    /**
     * 房主信息
     * */
    private Handle_CMD_S_TableCreatorInfo(msg: GameIF.CustomMessage): void {
        var tableCreatorInfo: M_MGMJ_GameMessage.CMD_S_TableCreatorInfo = <M_MGMJ_GameMessage.CMD_S_TableCreatorInfo>msg;
        
        this._tableConfig.tableCreatorID = tableCreatorInfo.plyaerID;
        this._tableConfig.tableCreatorChair = tableCreatorInfo.chair;
        
        //this.node.dispatchEvent(new MGMJEvent(MGMJEvent.msg_tableCreatorInfo,this._tableConfig.tableCreatorChair,this._tableConfig.tableCreatorID));
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
        var playerOffLine: M_MGMJ_GameMessage.CMD_S_PlayerOffline = <M_MGMJ_GameMessage.CMD_S_PlayerOffline>msg;
        M_MGMJView.ins.GameStatusUserInfo.offlineChair = playerOffLine.chair;
        M_MGMJView.ins.ReadyStatusUserInfo.offlineChair = playerOffLine.chair;
    }
    /**
     * 玩家断线进来
     * */
    private Handle_CMD_S_PlayerOfflineCome(msg: GameIF.CustomMessage): void {
        var playerOfflineCome: M_MGMJ_GameMessage.CMD_S_PlayerOfflineCome = <M_MGMJ_GameMessage.CMD_S_PlayerOfflineCome>msg;
        M_MGMJView.ins.GameStatusUserInfo.reconnectChair = playerOfflineCome.chair;
        M_MGMJView.ins.ReadyStatusUserInfo.reconnectChair = playerOfflineCome.chair;
    }
    
    private Handle_CMD_S_ORC_GameInfo(msg: GameIF.CustomMessage): void {
        this.fankai=false;
        M_MGMJView.ins.OnResetGameView();
        //播放背景音乐
        M_MGMJVoice.PlayBgm();
        //this.PlaySound(MGMJSoundDef.sound_bg,0,egret.Sound.MUSIC);
        //清理数据
        this.clear();
        //通知玩家进入
        this.gameView.playerComeing();//dispatchEvent(new MGMJEvent(MGMJEvent.msg_playerComeing));
        //局数恢复
        M_MGMJView.ins.showGameNum(this._tableConfig.setGameNum,this._tableConfig.alreadyGameNum,this._tableConfig.realGameNum);
        var gameInfo : M_MGMJ_GameMessage.CMD_S_ORC_GameInfo = <M_MGMJ_GameMessage.CMD_S_ORC_GameInfo>msg;
        this._bankerChair = gameInfo.bankerChair;
        this._lianBanker=gameInfo.lianBanker+1;
        this._gameid = gameInfo.gameid;
        this._gamePhase = gameInfo.gamePhase;
        M_MGMJView.ins.GameStatusUserInfo.setBankerChair(this._bankerChair,this._lianBanker);
        
        //通知游戏开始开始
        this.gameView.GameStart();//(new MGMJEvent(MGMJEvent.msg_gameStart));

    }
    
    /**
     * 断线重连恢复玩家牌阵
     * */
    private Handle_CMD_S_ORC_PlayerCard(msg: GameIF.CustomMessage): void {
        var playerCard : M_MGMJ_GameMessage.CMD_S_ORC_PlayerCard = <M_MGMJ_GameMessage.CMD_S_ORC_PlayerCard>msg;
        M_MGMJView.ins.SZAni.StopAni();
        //M_MGMJView.ins.SendCardEngine.destroy();
        MGMJMahjongAlgorithm.sortCardAry(playerCard.selfCard.handCard);
        for(var m:number=0; m<playerCard.selfCard.handCard.length; m++){
            this._handCard.push(playerCard.selfCard.handCard[m]);
        }
        if(playerCard.selfCard.holdCard!=MGMJMahjongDef.gInvalidMahjongValue)
            this._handCard.push(playerCard.selfCard.holdCard);
        //1、恢复自己牌阵
        
        M_MGMJView.ins.CardView.selfFixed.recoveryFixed(playerCard.selfCard.fixedCard,this.SelfChair);
        M_MGMJView.ins.CardView.selfPool.recoveryPoolCard(playerCard.selfCard.poolCard);
        M_MGMJView.ins.CardView.recoveryActiveCard(this.SelfChair,playerCard.selfCard.handCard);
        
        if(MGMJMahjongDef.gInvalidMahjongValue != playerCard.selfCard.holdCard){
            M_MGMJView.ins.CardView.selfActive.holdACard(playerCard.selfCard.holdCard);
            M_MGMJView.ins.CardView.selfActive.allDown();
        }
        
        //2、恢复其他玩家牌阵
        for(var i:number=0; i<playerCard.otherPlayerCard.length; i++){
            var handCard : Array<number>=new Array<number>();
            for(var j:number=0; j<playerCard.otherPlayerCard[i].handCardNum; j++){
                handCard.push(0x01);
            }           
            M_MGMJView.ins.CardView.getFixed(playerCard.otherPlayerCard[i].chair).recoveryFixed(playerCard.otherPlayerCard[i].fixedCard,playerCard.otherPlayerCard[i].chair);
            M_MGMJView.ins.CardView.getPool(playerCard.otherPlayerCard[i].chair).recoveryPoolCard(playerCard.otherPlayerCard[i].poolCard);
            M_MGMJView.ins.CardView.recoveryActiveCard(playerCard.otherPlayerCard[i].chair,handCard);
           
        }

        //3、恢复牌墙
        this.gameView.CardView.PaiWallView.node.active = true;
        M_MGMJView.ins.CardView.PaiWallView.showPaiWall();
        M_MGMJView.ins.CardView.PaiWallView.delAllPai(this._bankerChair,this.SelfChair,playerCard.paiWall.paiCount + 52,playerCard.paiWall.houPai);
            
    }
    /**
     * 断线重连恢复玩家分数变化
     * */
    private Handle_CMD_S_ORC_GameScoreChange(msg: GameIF.CustomMessage):void{
        var orcGameScore : M_MGMJ_GameMessage.CMD_S_ORC_GameScoreChange = <M_MGMJ_GameMessage.CMD_S_ORC_GameScoreChange>msg;
        M_MGMJView.ins.GameStatusUserInfo.reShowScoreChange(orcGameScore.PlayerScoreChange);
    }
    
    
    /**
     * 断线重连恢复投票阶段
     * */
    private Handle_CMD_S_ORC_Vote(msg: GameIF.CustomMessage): void {
        var vote : M_MGMJ_GameMessage.CMD_S_ORC_Vote = <M_MGMJ_GameMessage.CMD_S_ORC_Vote>msg;
        this._outCardPlayer.playerOutCard(vote.chair,vote.card);
        //M_MGMJView.ins.OutCardView.showCard(this._outCardPlayer.Chair,this._outCardPlayer.Card);
        if(this._outCardPlayer.isValid){
            //this._recordCard.outACard(this._outCardPlayer.Card);
            M_MGMJView.ins.CardView.addCard2Pool(this._outCardPlayer.Chair,this._outCardPlayer.Card);
        }
    }
    
    /**
     * 断线重连结束
     * */
    private Handle_CMD_S_ORC_Over(msg: GameIF.CustomMessage):void{
        var orcOver : M_MGMJ_GameMessage.CMD_S_ORC_Over = <M_MGMJ_GameMessage.CMD_S_ORC_Over>msg;
        M_MGMJView.ins.GameInfo.init();

      
        M_MGMJView.ins.GameInfo.leftCardNum = orcOver.leftCardNum;
        let gameCount:number=0;
        if(this._tableConfig.setGameNum == 0)
            gameCount = 8;
        if(this._tableConfig.setGameNum == 1)
            gameCount = 16; 
        M_MGMJView.ins.GameInfo.SetGameNum(this._tableConfig.alreadyGameNum,gameCount);
        M_MGMJView.ins.GameInfo.tableCode=this._tableConfig.TableCode;
        //设置计分板玩家名称
        // for(var m: number = 0;m < MGMJMahjongDef.gPlayerNum;m++) {
        //     if(null == this.TablePlayer[m]) {
        //         continue;
        //     }
        // }
        M_MGMJView.ins.PlayFenXiang.SetPlayerData(this._tableConfig.alreadyGameNum);
        M_MGMJView.ins.GameJiFenBan.SetPlayerData();
        this._isTing = MGMJMahjongAlgorithm.CheckIfCanTingCardArray(this._handCard);
        if(this._isTing)
            this.showTingCard(0,3000,true);
        //this.gameView.TingBtn(this._isTing);
    }
    /**
     * 断线重连恢复解散房间
     * */
    private Handle_CMD_S_ORC_DissTable(msg: GameIF.CustomMessage):void{
        var orcDissTable: M_MGMJ_GameMessage.CMD_S_ORC_DissTable = <M_MGMJ_GameMessage.CMD_S_ORC_DissTable>msg;
        M_MGMJView.ins.DissTable.playerDissTable(orcDissTable.sponsor,orcDissTable.playerVote,orcDissTable.leftTime);
    }
    /**
     * 空闲桌子断线重连进入
     * */
    private Handle_CMD_S_ORC_TableFree(msg: GameIF.CustomMessage):void{
        
        var tablefree: M_MGMJ_GameMessage.CMD_S_ORC_TableFree= <M_MGMJ_GameMessage.CMD_S_ORC_TableFree>msg;
        //播放背景音乐
        M_MGMJVoice.PlayBgm();
        //清理数据
        this.clear();
        //通知玩家进入
        this.gameView.playerComeing();//this.dispatchEvent(new MGMJEvent(MGMJEvent.msg_playerComeing));

        //显示准备界面
        if(this.getTableStauts()==QL_Common.TableStatus.gameing)
        {
            M_MGMJView.ins.PlayFenXiang.SetPlayerData(this._tableConfig.alreadyGameNum);
            M_MGMJView.ins.GameJiFenBan.SetPlayerData();
            M_MGMJView.ins.ReadyStatusUserInfo.OnPlayerStatusChange(this.SelfChair,QL_Common.GState.PlayerReady);
            M_MGMJView.ins.TipMsgView.showTip("上局已经结束,等待其他玩家准备进入下一局",false);
        }
        else{
             M_MGMJView.ins.ReadyStatusUserInfo.SelfReady();
            // if(this.checkMoneyCanGame)
            // {
            //     M_MGMJView.ins.ReadyStatusUserInfo.OnPlayerStatusChange(this.SelfChair,QL_Common.GState.PlayerReady);
            // }
        }
        
        
        if(this._tableConfig.isValid){
            M_MGMJView.ins.GameInfo.init();
            M_MGMJView.ins.GameInfo.tableCode = this._tableConfig.TableCode;
            let gameCount:number=0;
            if(this._tableConfig.setGameNum == 0)
                gameCount = 8;
            if(this._tableConfig.setGameNum == 1)
                gameCount = 16; 
            M_MGMJView.ins.GameInfo.SetGameNum(this._tableConfig.alreadyGameNum,gameCount);
        }
        
        if(this._tableConfig.needHideUserMoney){
            M_MGMJView.ins.ReadyStatusUserInfo.hideUserMoney();
        }

        this.showFangxiang(this.SelfChair);

        //断线重连后显示踢人按钮
        if(M_MGMJClass.ins.SelfIsTableOwener){
            this.gameView.ReadyStatusUserInfo.kickBtn[0].node.active = true;
            this.gameView.ReadyStatusUserInfo.kickBtn[1].node.active = true;
            this.gameView.ReadyStatusUserInfo.kickBtn[2].node.active = true;
        }
        //每局之间断线重连 踢人按钮、准备按钮、邀请按钮需要隐藏
        if(this.getTableConfig().alreadyGameNum > 0){
            this.gameView.ReadyStatusUserInfo.kickBtn[0].node.active = false;
            this.gameView.ReadyStatusUserInfo.kickBtn[1].node.active = false;
            this.gameView.ReadyStatusUserInfo.kickBtn[2].node.active = false;
            this.gameView.ReadyStatusUserInfo.btn_ready.node.active = false;
            this.gameView.ReadyStatusUserInfo.btn_invite.node.active = false;
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
        var showMsg : M_MGMJ_GameMessage.CMD_S_ShowMsg = <M_MGMJ_GameMessage.CMD_S_ShowMsg>msg;
        if(1 == showMsg.tipType){
            M_MGMJView.ins.TipMsgView.showTip(showMsg.msg,true,4);
        }else{
            M_MGMJView.ins.MsgBox.showMsgBox(showMsg.msg);
        }
        if(101 == showMsg.tipType){
            //亲友圈圈主解散空闲房间
            this.ExitGame();
        }
    }


    /**
     * 有玩家提出解散房间
     * */
    private Handle_CMD_S_PlayerDissTable(msg: GameIF.CustomMessage):void{
        var playerDissTable: M_MGMJ_GameMessage.CMD_S_PlayerDissTable = <M_MGMJ_GameMessage.CMD_S_PlayerDissTable>msg;
        M_MGMJView.ins.DissTable.playerDissTable(playerDissTable.sponsorChair,null);
    }
    
    /**
     * 玩家对解散房间进行投票
     * */
    private Handle_CMD_S_PlayerVoteDissTable(msg: GameIF.CustomMessage):void{
        var playerVoteDissTable: M_MGMJ_GameMessage.CMD_S_PlayerVoteDissTable = <M_MGMJ_GameMessage.CMD_S_PlayerVoteDissTable>msg;
        M_MGMJView.ins.DissTable.playerVoteDissTable(playerVoteDissTable.chair,playerVoteDissTable.vote);
        
        if(2 == playerVoteDissTable.vote){
            M_MGMJView.ins.DissTable.node.active=false;
            let name=this.getTablePlayerAry()[playerVoteDissTable.chair].NickName;
            name = name.substring(0,4);
            M_MGMJView.ins.MsgBox.showMsgBox("玩家 "+name+" 拒绝解散房间");
        }
    }
    
    /**
     * 解散桌子成功
     * */
    private Handle_CMD_S_DissTableSuccess(msg: GameIF.CustomMessage):void{
        
        //},this);
        var dissTable: M_MGMJ_GameMessage.CMD_S_DissTableSuccess = <M_MGMJ_GameMessage.CMD_S_DissTableSuccess>msg;
         M_MGMJView.ins.DissTable.node.active=false;
        if(0 == dissTable.gameing){
            M_MGMJClass.ins.ignoreForceLeft = true;
            
            M_MGMJView.ins.JieShuanView.node.active=false;
            M_MGMJView.ins.PlayFenXiang.startShow(()=>{
                this.ExitGame();
            },this);
        }
    }
        

    /**
     * 注册一个计时器
     * */
    public regTimer(timerid:number,timerLen:number,chair:number,selfChair:number = 255):void{
     
        this._timer.setTimer(timerid,timerLen,chair,this.onTimerEvent,this);
        
        M_MGMJView.ins.TimerView.node.active=true;
        M_MGMJView.ins.TimerView.showArr(chair,selfChair);// = chair;
        M_MGMJView.ins.TimerView.timerNum = timerLen;
       
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
    public getTableConfig(): MGMJTableConfig{
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
        return ["QL.gameplug.M_MGMJ.MGMJ_SelfActive","QL.gameplug.M_MGMJ.MGMJ_DownActive","QL.gameplug.M_MGMJ.MGMJ_OppoActive","Uyi.gameplug.M_MGMJ.MGMJ_UpActive"];
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
        return `gameres/majiang_plist/paihua/mahjong_${MGMJMahjongAlgorithm.GetMahjongColor(card)}_${MGMJMahjongAlgorithm.GetMahjongValue(card)}`;
    }
     public getMahjongPaiHuaRes(card: number): cc.SpriteFrame {
         let aa = `mahjong_${MGMJMahjongAlgorithm.GetMahjongColor(card)}_${MGMJMahjongAlgorithm.GetMahjongValue(card)}`;
         
        return this.paihua.getSpriteFrame(`mahjong_${MGMJMahjongAlgorithm.GetMahjongColor(card)}_${MGMJMahjongAlgorithm.GetMahjongValue(card)}`);
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
        return (this.SelfChair + chair) % MGMJMahjongDef.gPlayerNum;
    }

    /**
     * 物理椅子号转逻辑椅子号
     * */
    public physical2logicChair(chair: number): number {
        return chair >= this.SelfChair ? chair - this.SelfChair : MGMJMahjongDef.gPlayerNum + chair - this.SelfChair;
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
        return MGMJ_CardView._freeActiveNode[chair];
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
        return MGMJ_CardView._freeFixedNode[chair];
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
        return MGMJ_CardView._freePoolNode[chair];
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
