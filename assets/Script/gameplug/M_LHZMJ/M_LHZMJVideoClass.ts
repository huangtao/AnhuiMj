import { GameVideoBase } from "../base/GameVideoBase";
import { ILHZMJClass, LHZMJTableConfig, LHZMJTimer, enGamePhase, LHZMJOutCardPlayer, LHZMJMahjongDef, LHZMJ, LHZMJTimerDef, enHuCardType, enLHZMJAniType, enFixedCardType } from "./ConstDef/LHZMJMahjongDef";
import { GameIF } from "../../CommonSrc/GameIF";
import { QL_Common } from "../../CommonSrc/QL_Common";

import { AudioType } from "../../CustomType/Enum";
import M_LHZMJVideoView from "./M_LHZMJVideoView";
import { M_LHZMJ_GameMessage } from "../../CommonSrc/M_LHZMJ_GameMessage";
import M_LHZMJVoice from "./M_LHZMJVoice";
import LHZMJ_SingleFixedBase from "./PlayerCard/single/LHZMJ_SingleFixedBase";
import LHZMJ_CardView from "./SkinView/LHZMJ_CardView";
import { LHZMJMahjongAlgorithm1 } from "./LHZMJMahjongAlgorithm/LHZMJMahjongAlgorithm1";


const { ccclass, property } = cc._decorator;

@ccclass
export default class M_LHZMJVideoClass extends GameVideoBase implements ILHZMJClass {

      
    private static _ins: M_LHZMJVideoClass;
    public static get ins(): M_LHZMJVideoClass { return this._ins; }
    @property(cc.SpriteAtlas)
    private paihua:cc.SpriteAtlas=null;

    @property(cc.SpriteAtlas)
    private paibei:cc.SpriteAtlas=null;
        @property(cc.SpriteAtlas)
    private paibei3d:cc.SpriteAtlas=null;
    @property(M_LHZMJVideoView)
    private gameView: M_LHZMJVideoView=null;
    //判断补花一次的音效
    private oncebuhua:boolean=true;
    //牌桌配置
    private _tableConfig : LHZMJTableConfig;
    /**
     * 牌桌配置
     * */
    public get TableConfig():LHZMJTableConfig{
        return this._tableConfig;
    }
    public _canVote=false;
    private _timer : LHZMJTimer;
    //我的投票权限
    private _voteRight: number;
    //本局庄家椅子号
    private _bankerChair : number;
    //本局庄家连庄数
    private _lianBanker : number;
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
    private _outCardPlayer : LHZMJOutCardPlayer;
    //骰子1点数
    private _sz1:number;
    /**
     * 骰子1
     * */
    public get SZ1():number{
        return this._sz1;
    }
                /**
     * 是否2D
    */
    public is2D():boolean{
        return false;
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
     private _hunPiCard:number;
    /**
     * 翻开的混皮牌
     */
    public get HunPiHunPiCard():number{
        return this._hunPiCard;
    }
      private _flowerAry:Array<number>;
    /**
     * 花牌列表
     */
    public get FlowerAry():Array<number>{
        return this._flowerAry;
    }
    private videostart:boolean= true;;
    
    //
    //个人数据
    //
    //手牌数据
    private _handCard: Array<Array<number>>;
    //是否已经胡牌
    private _alreadyHu:boolean;

    /**
     * 自己的椅子号
     * */
    public get SelfChair():number{
        return this.ChairID;
    }

          public showHideCard(outCard:number):void{
      //  this.gameView.CardView.refreshHideCard(outCard);
    }
    /**
     * 计时器事件
     * */
    private onTimerEvent(timerid: number,chair: number,leftTickNum: number):void{
        this.gameView.TimerView.timerNum = leftTickNum;
    }


    
    

    /**
     * 清理数据
     * */
    private clear():void{
        this._bankerChair = LHZMJMahjongDef.gInvalidChar;
        this._gamePhase = enGamePhase.GamePhase_Unknown;
        this._activePlayer = LHZMJMahjongDef.gInvalidChar;
        this._outCardPlayer.clear();
        this._sz1 = 0;
        this._sz2 = 0;
        this._gameid="";
        this._alreadyHu=false;
        this._handCard.splice(0,this._handCard.length);

        for(var i:number=0; i<LHZMJMahjongDef.gPlayerNum; i++){
            this._handCard.push(null);
        }


    }

    /**
     * 计时器
     * */
    protected onTimerTick(): void {
        if(null != this._timer){ 
            this._timer.runOnce();
        }
    }
    
    onLoad() {
        // init logic
        M_LHZMJVideoClass._ins = this;
        LHZMJ.ins.iclass = this;
        //
        //初始化
        //
        this._timer = new LHZMJTimer();
        this._tableConfig = new LHZMJTableConfig();
        this._outCardPlayer = new LHZMJOutCardPlayer();
        this._handCard = new Array<Array<number>>();
    }



    protected OnResetGameClass(){
    }

    protected OnInitClass(){
        this.gameView.Init();
    }
                /**
     * 获取麻将牌背资源
     * */
    public getMahjong3DPaiBeiRes(cardtype: string): cc.SpriteFrame {
        return this.paibei3d.getSpriteFrame(cardtype);
    }

    /**
    * 预备开始
    * */
    protected onPreStart(obj: any): void {

        //播放背景音乐
        M_LHZMJVoice.PlayBgm(); 
        
        //清理数据
        this.clear();
        
        //通知玩家进入
        //this.node.dispatchEvent(new LHZMJEvent(LHZMJEvent.msg_playerComeing));
        this.gameView.playerComeing();
    }



    /**
     * 玩家坐下:自己坐下和自己坐下后又有新的玩家进入坐下,默认状态为SitDown状态,以防万一最好再处理一下状态
     * */
    protected OnPlayerSitDown(chairID: number, player: QL_Common.TablePlayer): void {
        this.gameView.GameStatusUserInfo.OnPlayerSitDown(chairID,player);
                var chair = this.physical2logicChair(chairID);
        if(chair == 0){
            M_LHZMJVideoView.ins.ShowTimerView(this.ChairID);
        }
    }
    protected CanSkipReplayMessage(message:GameIF.CustomMessage):boolean{

        return this.videostart;
    }

    /**
     * 游戏消息
     * */
    protected OnGameMessage(sendChair: number, msg: GameIF.CustomMessage): void {
        switch(msg.wSubCmdID){
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_TableConfig: {
                    this.Handle_CMD_S_TableConfig(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_Start:{
                    this.Handle_CMD_S_Start(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_SZInfo:{
                    this.Handle_CMD_S_SZInfo(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_InitCard: {
                    this.Handle_CMD_S_InitCard(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_GameID: {
                    this.Handle_CMD_S_GameID(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_PlayerHoldCard: {
                    this.Handle_CMD_S_PlayerHoldCard(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_ActivePlayer: {
                    this.Handle_CMD_S_ActivePlayer(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_VoteRight: {
                    this.Handle_CMD_S_VoteRight(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_PlayerOutCard: {
                    this.Handle_CMD_S_PlayerOutCard(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_DelPoolCard: {
                    this.Handle_CMD_S_DelPoolCard(msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_PlayerPengCard: {
                    this.Handle_CMD_S_PlayerPengCard(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_PlayerAnGangCard: {
                    this.Handle_CMD_S_PlayerAnGangCard(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_PlayerMingGang: {
                    this.Handle_CMD_S_PlayerMingGang(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_PlayerBuGangCard: {
                    this.Handle_CMD_S_PlayerBuGangCard(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_PlayerHuCard: {
                    this.Handle_CMD_S_PlayerHuCard(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_OpPlayer: {
                    this.Handle_CMD_S_OpPlayer(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_StartSendCard: {
                    this.Handle_CMD_S_StartSendCard(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_PlayerOffline: {
                    this.Handle_CMD_S_PlayerOffline(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_PlayerOfflineCome: {
                    this.Handle_CMD_S_PlayerOfflineCome(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_QiangGang: {
                    this.Handle_CMD_S_QiangGang(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_VoteQGResult:{
                    this.Handle_CMD_S_VoteQGResult(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_DelQiangGangCard:{
                    this.Handle_CMD_S_DelQiangGangCard(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_PlayerCardData: {
                    this.Handle_CMD_S_PlayerCardData(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_Balance: {
                    this.Handle_CMD_S_Balance(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_HandCardData:{
                    this.Handle_CMD_S_HandCardData(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_TableCreatorInfo: {
                    this.Handle_CMD_S_TableCreatorInfo(sendChair,msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_ShowMsg: {
                    this.Handle_CMD_S_ShowMsg(sendChair,msg);
                    break;
                }case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_Ting:{
                    this.Handle_CMD_S_Ting(msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_IsDissolution:{
                    this.Handle_CMD_S_IsDissolution(msg);
                    break;
                }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_BuHua: {
                this.Handle_CMD_S_BuHua(msg);
                    break;
                 }
                case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_FlowerCardAry:{
                this.Handle_CMD_S_FlowerCardAry(msg);
                    break;
            }
             case M_LHZMJ_GameMessage.LHZMJMsgID_s2c.CMD_S_FanKaiHun:{
                this.Handle_CMD_S_FanKaiHun(msg);
                     break;
            }

                default:{
                    console.log(`未处理的指令:${msg.wMainCmdID} -- ${msg.wSubCmdID}`);
                    break;
                }
            }
    }



    /**
     * 把混皮牌发送到客户端
     * @param msg 
     */
    private Handle_CMD_S_FanKaiHun(msg: GameIF.CustomMessage):void{
        var hunpi:M_LHZMJ_GameMessage.CMD_S_FanKaiHun=<M_LHZMJ_GameMessage.CMD_S_FanKaiHun>msg;
        this._hunPiCard=hunpi.card;

       //     M_LHZMJVideoView.ins.CardView.hunPi.ShowCard(this._hunPiCard);
        

        



        
        console.log(`此局混皮牌为${this._hunPiCard}`);
    }
     /**
     * 花牌列表
     * @param msg 
     */
    private Handle_CMD_S_FlowerCardAry(msg: GameIF.CustomMessage):void{
                
        var floAry:M_LHZMJ_GameMessage.CMD_S_FlowerCardAry=<M_LHZMJ_GameMessage.CMD_S_FlowerCardAry>msg;
        this._flowerAry=floAry.cardAry;


        var flo:string="";
        for(var i=0;i<this._flowerAry.length;i++){
            if(i!=this._flowerAry.length-1){
                flo+=this._flowerAry[i].toString()+"、";
                continue;
            }
            flo+=this._flowerAry[i].toString();
        }

        
    }
    private Handle_CMD_S_BuHua(msg: GameIF.CustomMessage): void {
      




        var playerBuHua: M_LHZMJ_GameMessage.CMD_S_BuHua = <M_LHZMJ_GameMessage.CMD_S_BuHua>msg;

        //M_LHZMJVideoView.ins.CardView.hideOutCardArrow();
        //M_SZMJView.ins.OutCardView.showCard(playerOutCard.chair,playerOutCard.card);

        this._outCardPlayer.playerOutCard(playerBuHua.chair, playerBuHua.huacard);
        

        M_LHZMJVideoView.ins.CardView.addCard2Flower(playerBuHua.huacard, playerBuHua.chair);
        let sex:number=this.TablePlayer[playerBuHua.chair].Gender==1?1:2;

            if (this.oncebuhua){
                M_LHZMJVoice.PlayCardType(`/sound/1/mj_buhua_${sex}.mp3`);
                this.oncebuhua=false;
        }



       // M_LHZMJVoice.PlayCardType(`/sound/${sex}/mj_buhua_${sex}.mp3`);
        

        M_LHZMJVideoView.ins.CardView.playerBuHua(playerBuHua.chair, playerBuHua.huacard);


        //如果是自己
         if (this.SelfChair == playerBuHua.chair/* && !isHuaCard*/) {
             LHZMJMahjongAlgorithm1.delCard(this._handCard[this.SelfChair], [playerBuHua.huacard]);
             LHZMJMahjongAlgorithm1.sortCardAry(this._handCard[this.SelfChair]);
             this._handCard[this.SelfChair]=LHZMJMahjongAlgorithm1.sortCardAry1(this._handCard[this.SelfChair],this.GetHunCardAry());

             //M_LHZMJVideoView.ins.CardView.selfActive.refreshHandCardData(this._handCard[this.SelfChair]);
            M_LHZMJVideoView.ins.CardView.selfActive.activeEnable(false);
           

            //this.stopTimer();
            // M_LHZMJVideoView.ins.TimerView.hideArrow();
            // M_LHZMJVideoView.ins.CardView.selfActive.allDown();

          
           

         }
        // } 

    }






    /**
     * 桌子配置
     * */
    private Handle_CMD_S_TableConfig(sendChair : number,msg: GameIF.CustomMessage):void{
        var tableConfig: M_LHZMJ_GameMessage.CMD_S_TableConfig = <M_LHZMJ_GameMessage.CMD_S_TableConfig>msg;
        //this.GameRule["GameData"] = tableConfig;

        console.log(`录像消息:桌子规则`);

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
            true,
            30,
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
        );
        //this.gameView.GameInfo.init();
        this.gameView.GameInfo.tableCode = tableConfig.TableCode;
        this.gameView.GameInfo.SetGameNum(this._tableConfig.alreadyGameNum,this._tableConfig.setGameNum);
    }
    /**
     * 游戏开始
     * */
    private Handle_CMD_S_Start(sendChair : number,msg: GameIF.CustomMessage):void{
        var gameStart: M_LHZMJ_GameMessage.CMD_S_Start = <M_LHZMJ_GameMessage.CMD_S_Start>msg;
        this.clear();
        this.gameView.GameStart();
        this.gameView.showGameNum(gameStart.totalGameNum,gameStart.gameNum,gameStart.realGameNum);
    }
    /**
     * 骰子数据
     * */
    private Handle_CMD_S_SZInfo(sendChair : number,msg: GameIF.CustomMessage):void{        
        var sz: M_LHZMJ_GameMessage.CMD_S_SZInfo = <M_LHZMJ_GameMessage.CMD_S_SZInfo>msg;
        this._bankerChair = sz.bankerChair;
        this._lianBanker=sz.lianBanker;
        this._sz1 = sz.sz1;
        this._sz2 = sz.sz2;
        
        //显示庄家
        this.gameView.GameStatusUserInfo.bankerChair = this._bankerChair;
    }
    private Handle_CMD_S_PlayerPaoInfo(msg: GameIF.CustomMessage):void{
        var pao: M_LHZMJ_GameMessage.CMD_S_PlayerPaoInfo = <M_LHZMJ_GameMessage.CMD_S_PlayerPaoInfo>msg;

        this.gameView.GameStatusUserInfo.SetPao(pao.points);
    }
    private Handle_CMD_S_PlayerLaInfo(msg: GameIF.CustomMessage):void{
        var la: M_LHZMJ_GameMessage.CMD_S_PlayerLaInfo = <M_LHZMJ_GameMessage.CMD_S_PlayerLaInfo>msg;

        this.gameView.GameStatusUserInfo.SetLa(la.points);
    }
    /**
     * 初始化牌
     * */
    private Handle_CMD_S_InitCard(sendChair : number,msg: GameIF.CustomMessage): void {
        var initCard: M_LHZMJ_GameMessage.CMD_S_InitCard = <M_LHZMJ_GameMessage.CMD_S_InitCard>msg;
        this._handCard[sendChair] = new Array<number>();
        
        for(var i:number=0; i<initCard.cardAry.length; i++){
            if(LHZMJMahjongDef.gInvalidMahjongValue != initCard.cardAry[i]){
                this._handCard[sendChair].push(initCard.cardAry[i]);
            }
        }
    }
    /**
     * 游戏ID
     * */
    private Handle_CMD_S_GameID(sendChair : number,msg: GameIF.CustomMessage): void {
        var gameid: M_LHZMJ_GameMessage.CMD_S_GameID = <M_LHZMJ_GameMessage.CMD_S_GameID>msg;
        this._gameid = gameid.gameid;
    }
    /**
     * 开始发牌
     * */
    private Handle_CMD_S_StartSendCard(sendChair : number,msg: GameIF.CustomMessage): void {
        var startSendCard: M_LHZMJ_GameMessage.CMD_S_StartSendCard = <M_LHZMJ_GameMessage.CMD_S_StartSendCard>msg;
        this._gamePhase = enGamePhase.GamePhase_SendCard;
        this.gameView.StartSendCard();
    }
    
    
    /**
     * 玩家抓牌
     * */
    private Handle_CMD_S_PlayerHoldCard(sendChair : number,msg: GameIF.CustomMessage): void {
        var playerHoldCard: M_LHZMJ_GameMessage.CMD_S_PlayerHoldCard = <M_LHZMJ_GameMessage.CMD_S_PlayerHoldCard>msg;
        this.handleOPAfter();
        //this.gameView.CardView.hideOutCardArrow();
        //清理打出牌,添加牌池牌
        /*this.gameView.OutCardView.show=false;
        if(this._outCardPlayer.isValid){
            this.gameView.CardView.addCard2Pool(this._outCardPlayer.Chair,this._outCardPlayer.Card);
        }*/
        this._outCardPlayer.clear();
        
        if(LHZMJMahjongDef.gInvalidMahjongValue != playerHoldCard.card){
            this._handCard[playerHoldCard.chair].push(playerHoldCard.card);
        }
        
        //剩余牌显示
        this.gameView.GameInfo.holdACard();
        
        //玩家抓牌
        this.gameView.CardView.playerHoldCard(playerHoldCard.chair,playerHoldCard.card);
        // if((this.SelfChair == playerHoldCard.chair) && (LHZMJMahjongDef.gInvalidMahjongValue != playerHoldCard.card)){
        //     this.gameView.CardView.selfActive.setUpCardDown();
        // }
    }
    /**
     * 当前活动玩家
     * */
    private Handle_CMD_S_ActivePlayer(sendChair : number,msg: GameIF.CustomMessage): void {
        this.videostart = false;
        var activePlayer: M_LHZMJ_GameMessage.CMD_S_ActivePlayer = <M_LHZMJ_GameMessage.CMD_S_ActivePlayer>msg;
        this._gamePhase = enGamePhase.GamePhase_PlayerOP;
        this._activePlayer = activePlayer.playerChair;
        //注册计时器

             this.regTimer(LHZMJTimerDef.timer_id_playerop,activePlayer.timer,this._activePlayer);

    }
    /**
     * 我的投票权限
     * */
    private Handle_CMD_S_VoteRight(sendChair : number,msg: GameIF.CustomMessage): void {
        if(this.SelfChair == sendChair){
            var voteRight: M_LHZMJ_GameMessage.CMD_S_VoteRight = <M_LHZMJ_GameMessage.CMD_S_VoteRight>msg;
        this._gamePhase = enGamePhase.GamePhase_Vote;
        this._voteRight = voteRight.voteRight;
        if(this._voteRight==LHZMJMahjongDef.gVoteRightMask_Ting){
            console.log("我的投票权限里  条件true  有听权限");
            M_LHZMJVideoView.ins.OperatorView.showOP(false,0,false,true,true,false)
        }else{
            console.log("我的投票权限里  条件false  无听权限");
            this._canVote= true;
            this.scheduleOnce(function () {
                if(this._canVote==true&&!this._tableConfig.isValid)
                this._canVote=false;
            }.bind(this), 12)
             M_LHZMJVideoView.ins.OperatorView.showOP(LHZMJMahjongAlgorithm1.CheckVoteRight_Peng(this._voteRight),
                                            LHZMJMahjongAlgorithm1.CheckVoteRight_Gang(this._voteRight)?1:0,
                                            LHZMJMahjongAlgorithm1.CheckVoteRight_Hu(this._voteRight),
                                            false,
                                            true,false);
                                            
        }
       
            //注册计时器

             this.regTimer(LHZMJTimerDef.timer_id_vote,LHZMJTimerDef.timer_len_vote+10*(this.TableConfig._OutCardTime+1),this.SelfChair);

        }
    } 
    /**
     * 玩家打出牌
     * */
    private Handle_CMD_S_PlayerOutCard(sendChair : number,msg: GameIF.CustomMessage): void {
        var playerOutCard: M_LHZMJ_GameMessage.CMD_S_PlayerOutCard = <M_LHZMJ_GameMessage.CMD_S_PlayerOutCard>msg;
        this.oncebuhua=true;
        this.gameView.CardView.hideOutCardArrow();
        this.handleOPAfter();
        //this.gameView.OutCardView.showCard(playerOutCard.chair,playerOutCard.card);
        this._outCardPlayer.playerOutCard(playerOutCard.chair,playerOutCard.card);
        
        if(playerOutCard.chair == this.SelfChair){
            this.gameView.CardView.selfActive.activeEnable(false);
        }
            let sex:number=this.TablePlayer[playerOutCard.chair].Gender==1?1:2;
        
        M_LHZMJVoice.PlayCardType(`/sound/dapai.mp3`);
        //播放音效,todo
        M_LHZMJVoice.PlayCardType(`/sound/PT/${sex}/mj_${sex}_${LHZMJMahjongAlgorithm1.GetMahjongColor(playerOutCard.card)}_${LHZMJMahjongAlgorithm1.GetMahjongValue(playerOutCard.card)}.mp3`);
        
        if(this._outCardPlayer.isValid){
            this.gameView.CardView.addCard2Pool(this._outCardPlayer.Chair,this._outCardPlayer.Card);
        }
        //活动牌阵处理
        this.gameView.CardView.playerOutCard(playerOutCard.chair,playerOutCard.card);
        //this.gameView.CardView.hideOutCardArrow();
        //牌阵数据处理
        LHZMJMahjongAlgorithm1.delCard(this._handCard[playerOutCard.chair],[playerOutCard.card]);
        LHZMJMahjongAlgorithm1.sortCardAry(this._handCard[playerOutCard.chair]);
         this._handCard[playerOutCard.chair]=LHZMJMahjongAlgorithm1.sortCardAry1(this._handCard[playerOutCard.chair],this.GetHunCardAry());
    }
    /**
     * 删除玩家牌池牌
     * */
    private Handle_CMD_S_DelPoolCard(msg: GameIF.CustomMessage): void {
        var DelCard: M_LHZMJ_GameMessage.CMD_S_DelPoolCard = <M_LHZMJ_GameMessage.CMD_S_DelPoolCard>msg;    
        this.gameView.CardView.delCardinPool(DelCard.chair,DelCard.card,DelCard.cardnum);
    }
    /**
     * 玩家碰牌
     * */
    private Handle_CMD_S_PlayerPengCard(sendChair : number,msg: GameIF.CustomMessage): void {
        var playerPeng: M_LHZMJ_GameMessage.CMD_S_PlayerPengCard = <M_LHZMJ_GameMessage.CMD_S_PlayerPengCard>msg;
        
        this.handleOPAfter();
        let sex:number=this.TablePlayer[playerPeng.chair].Gender==1?1:2;
        //音效
        M_LHZMJVoice.PlayCardType(`/sound/1/peng_${sex}.mp3`);
        if(playerPeng.chair == this.SelfChair) {
            this.gameView.CardView.selfActive.activeEnable(false);
        }
        //动画
        this.gameView.playLHZMJAni(playerPeng.chair,enLHZMJAniType.aniType_peng);
        this.gameView.CardView.hideOutCardArrow();
        //清理玩家打出的牌
        this._outCardPlayer.clear();
        //this.gameView.OutCardView.show=false;
        
        //处理碰牌
        this.gameView.CardView.playerPeng(playerPeng.chair,playerPeng.card,playerPeng.outChair);
        //牌阵数据处理
        LHZMJMahjongAlgorithm1.delCard(this._handCard[playerPeng.chair],[playerPeng.card]);
        LHZMJMahjongAlgorithm1.sortCardAry(this._handCard[playerPeng.chair]);
        this._handCard[playerPeng.chair]=LHZMJMahjongAlgorithm1.sortCardAry1(this._handCard[playerPeng.chair],this.GetHunCardAry());
        
    }
    /**
     * 玩家暗杠
     * */
    private Handle_CMD_S_PlayerAnGangCard(sendChair : number,msg: GameIF.CustomMessage): void {
        var playerAGang: M_LHZMJ_GameMessage.CMD_S_PlayerAnGangCard = <M_LHZMJ_GameMessage.CMD_S_PlayerAnGangCard>msg;
        
        this.handleOPAfter();
        let sex:number=this.TablePlayer[playerAGang.chair].Gender==1?1:2;
        // 音效
        M_LHZMJVoice.PlayCardType(`/sound/1/gang_${sex}.mp3`);

        if(playerAGang.chair == this.SelfChair) {
            this.gameView.CardView.selfActive.activeEnable(false);
        }
        //动画
        this.gameView.playLHZMJAni(playerAGang.chair,enLHZMJAniType.aniType_anGang);
        
        //处理暗杠牌
        this.gameView.CardView.playerAGang(playerAGang.chair,playerAGang.card);
        
       
        //牌阵数据处理
        LHZMJMahjongAlgorithm1.delCard(this._handCard[playerAGang.chair],[playerAGang.card,playerAGang.card,playerAGang.card,playerAGang.card]);
        LHZMJMahjongAlgorithm1.sortCardAry(this._handCard[playerAGang.chair]);
        this._handCard[playerAGang.chair]=LHZMJMahjongAlgorithm1.sortCardAry1(this._handCard[playerAGang.chair],this.GetHunCardAry());

    }
    /**
     * 玩家明杠/直杠
     * */
    private Handle_CMD_S_PlayerMingGang(sendChair : number,msg: GameIF.CustomMessage): void {
        var playerMGang: M_LHZMJ_GameMessage.CMD_S_PlayerMingGang = <M_LHZMJ_GameMessage.CMD_S_PlayerMingGang>msg;
        
        this.handleOPAfter();
        let sex:number=this.TablePlayer[playerMGang.chair].Gender==1?1:2;
        // 音效
        M_LHZMJVoice.PlayCardType(`/sound/1/gang_${sex}.mp3`);
        if(playerMGang.chair == this.SelfChair) {
            this.gameView.CardView.selfActive.activeEnable(false);
        }
        //动画
        this.gameView.playLHZMJAni(playerMGang.chair,enLHZMJAniType.aniType_minggGang);
        this.gameView.CardView.hideOutCardArrow();
        this._outCardPlayer.clear();
        //this.gameView.OutCardView.show = false;
        
        //处理明杠牌
        this.gameView.CardView.playerMGang(playerMGang.chair,playerMGang.card,playerMGang.outChair);

        //牌阵数据处理
        LHZMJMahjongAlgorithm1.delCard(this._handCard[playerMGang.chair],[playerMGang.card,playerMGang.card,playerMGang.card]);
        LHZMJMahjongAlgorithm1.sortCardAry(this._handCard[playerMGang.chair]);
        this._handCard[playerMGang.chair]=LHZMJMahjongAlgorithm1.sortCardAry1(this._handCard[playerMGang.chair],this.GetHunCardAry());
    }
    /**
     * 玩家补杠/巴杠
     * */
    private Handle_CMD_S_PlayerBuGangCard(sendChair : number,msg: GameIF.CustomMessage): void {
        var playerBGang: M_LHZMJ_GameMessage.CMD_S_PlayerBuGangCard = <M_LHZMJ_GameMessage.CMD_S_PlayerBuGangCard>msg;
        
        this.handleOPAfter();
        let sex:number=this.TablePlayer[playerBGang.chair].Gender==1?1:2;
        // 音效
        M_LHZMJVoice.PlayCardType(`/sound/1/gang_${sex}.mp3`);
        if(playerBGang.chair == this.SelfChair) {
            this.gameView.CardView.selfActive.activeEnable(false);
        }
        //动画
        this.gameView.playLHZMJAni(playerBGang.chair,enLHZMJAniType.aniType_minggGang);
        
        //处理补杠牌
        this.gameView.CardView.playerBGang(playerBGang.chair,playerBGang.card);

        //牌阵数据处理
        LHZMJMahjongAlgorithm1.delCard(this._handCard[playerBGang.chair],[playerBGang.card]);
        LHZMJMahjongAlgorithm1.sortCardAry(this._handCard[playerBGang.chair]);
        this._handCard[playerBGang.chair]= LHZMJMahjongAlgorithm1.sortCardAry1(this._handCard[playerBGang.chair],this.GetHunCardAry());
    }
    
    /**
     * 玩家胡牌
     * */
    private Handle_CMD_S_PlayerHuCard(sendChair : number,msg: GameIF.CustomMessage): void {
        var playerHu: M_LHZMJ_GameMessage.CMD_S_PlayerHuCard = <M_LHZMJ_GameMessage.CMD_S_PlayerHuCard>msg;
        
        this.handleOPAfter();
        let sex:number=this.TablePlayer[playerHu.chair].Gender==1?1:2;
        
        //this.PlaySound(LHZMJSoundDef.sound_hu);
        switch(playerHu.huType){
            case enHuCardType.HuCardType_GangShaPao:
            case enHuCardType.HuCardType_PingHu:{
                //清理玩家打出的牌
                this._outCardPlayer.clear();
                M_LHZMJVoice.PlayCardType(`/sound/1/hu_${sex}.mp3`);
                //this.gameView.OutCardView.show = false;
                this.gameView.playLHZMJAni(playerHu.chair,enLHZMJAniType.aniType_huCard);
                break;
            }
            case enHuCardType.HuCardType_QiangGangHu:{
                M_LHZMJVoice.PlayCardType(`/sound/1/hu_${sex}.mp3`);
                this.gameView.playLHZMJAni(playerHu.chair,enLHZMJAniType.aniType_huCard);
                break;
            }
            case enHuCardType.HuCardType_ZiMo:{
                M_LHZMJVoice.PlayCardType(`/sound/1/hu_${sex}.mp3`);
                this.gameView.playLHZMJAni(playerHu.chair,enLHZMJAniType.aniType_ziMo);
                break;
            }
            case enHuCardType.HuCardType_GangShangHua:{
                M_LHZMJVoice.PlayCardType(`/sound/1/zimo_${sex}.mp3`);
                this.gameView.playLHZMJAni(playerHu.chair,enLHZMJAniType.aniType_ziMo);
                break;
            }
        }

        //this.gameView.CardView.getActive(playerHu.chair).playerHu(playerHu.card);
        
    }
    /**
     * 当前操作玩家
     * */
    private Handle_CMD_S_OpPlayer(sendChair : number,msg: GameIF.CustomMessage): void {
        this.oncebuhua=true;
        if(sendChair == this.SelfChair){
            var op: M_LHZMJ_GameMessage.CMD_S_OpPlayer = <M_LHZMJ_GameMessage.CMD_S_OpPlayer>msg;

                if((op.gangCard.length > 0) || (op.ifCanZiMo > 0)) {
                if(op.gangCard.length > 1){
                    this.gameView.SelGangView.showGang(op.gangCard);
                }
                this.gameView.OperatorView.showOP(false,op.gangCard.length,op.ifCanZiMo > 0,false,true,true);
            }

            //this.gameView.CardView.getActive(this.SelfChair).refreshCardStatus();
        }
    }
    
    /**
     * 玩家断线
     * */
    private Handle_CMD_S_PlayerOffline(sendChair : number,msg: GameIF.CustomMessage): void {
        var playerOffLine: M_LHZMJ_GameMessage.CMD_S_PlayerOffline = <M_LHZMJ_GameMessage.CMD_S_PlayerOffline>msg;
        this.gameView.GameStatusUserInfo.offlineChair = playerOffLine.chair;
    }
    /**
     * 玩家断线进来
     * */
    private Handle_CMD_S_PlayerOfflineCome(sendChair : number,msg: GameIF.CustomMessage): void {
        var playerOfflineCome: M_LHZMJ_GameMessage.CMD_S_PlayerOfflineCome = <M_LHZMJ_GameMessage.CMD_S_PlayerOfflineCome>msg;
        this.gameView.GameStatusUserInfo.reconnectChair = playerOfflineCome.chair;
        
    }
    /**
     * 开始抢杠
     * */
    private Handle_CMD_S_QiangGang(sendChair : number,msg: GameIF.CustomMessage): void {
        if(sendChair == this.SelfChair){
            var startQiangGang: M_LHZMJ_GameMessage.CMD_S_QiangGang = <M_LHZMJ_GameMessage.CMD_S_QiangGang>msg;

            this._gamePhase = enGamePhase.GamePhase_QiangGang;

            //this.gameView.QiangGangView.showQiangGang(startQiangGang.card);


             this.regTimer(LHZMJTimerDef.timer_id_qianggang,LHZMJTimerDef.timer_len_qianggang+10*(this.TableConfig._OutCardTime+1),this.SelfChair);

        }
    }
    /**
     * 投抢杠结果
     * */
    private Handle_CMD_S_VoteQGResult(sendChair: number,msg: GameIF.CustomMessage):void{
        if(sendChair == this.SelfChair){
            //this.gameView.QiangGangView.node.active=false;
            this._gamePhase = enGamePhase.GamePhase_Unknown;
            this.stopTimer();
        }
    }
    /**
     * 删除抢杠牌
     * */
    private Handle_CMD_S_DelQiangGangCard(sendChair : number,msg: GameIF.CustomMessage):void{
        var qiangGangCard : M_LHZMJ_GameMessage.CMD_S_DelQiangGangCard = <M_LHZMJ_GameMessage.CMD_S_DelQiangGangCard>msg;
        this.gameView.CardView.getActive(sendChair).outACard(qiangGangCard.card);
        LHZMJMahjongAlgorithm1.delCard(this._handCard[sendChair],[qiangGangCard.card]);
    }
    /**
     * 某个玩家手中牌
     * */
    private Handle_CMD_S_PlayerCardData(sendChair : number,msg: GameIF.CustomMessage): void {
        var playerCardData: M_LHZMJ_GameMessage.CMD_S_PlayerCardData = <M_LHZMJ_GameMessage.CMD_S_PlayerCardData>msg;
        LHZMJMahjongAlgorithm1.sortCardAry(playerCardData.handCard);
        playerCardData.handCard=LHZMJMahjongAlgorithm1.sortCardAry1(playerCardData.handCard,this.GetHunCardAry());
        this.gameView.CardView.getActive(playerCardData.chair).showLieCard(playerCardData.handCard,playerCardData.huCard);
    }

    /**
     * 本局结算结果
     * */
    private Handle_CMD_S_Balance(sendChair : number,msg: GameIF.CustomMessage): void {
        var balance: M_LHZMJ_GameMessage.CMD_S_Balance = <M_LHZMJ_GameMessage.CMD_S_Balance>msg;
        this.oncebuhua=true;
        this.gameView.TimerView.clearAction();
        //this.gameView.OutCardView.show = false;
        // if(this._outCardPlayer.isValid) {
        //     //this._recordCard.outACard(this._outCardPlayer.Card);
        //     this.gameView.CardView.addCard2Pool(this._outCardPlayer.Chair,this._outCardPlayer.Card);
        // }
        this._outCardPlayer.clear();
        this.stopTimer();
        this.gameView.Ani_Op.init();
       // this.gameView.TimerView.node.active=false;
        this.unscheduleAllCallbacks();
        this.gameView.TipMsgView.showTip("录像回放结束,点击右上角[返回]退出录像",false);
        this.gameView.VideoCtl.end();
    }
    /**
     * 游戏流水账
     * */
    /*
    private Handle_CMD_S_GameFlow(sendChair : number,msg: GameIF.CustomMessage): void {
        var gameFlow: M_LHZMJ_GameMessage.CMD_S_GameFlow = <M_LHZMJ_GameMessage.CMD_S_GameFlow>msg;
        this.gameView.JieShuanView.gameFlow = gameFlow;
    }*/
    
    /**
     * 玩家手牌数据
     * */
    private Handle_CMD_S_HandCardData(sendChair : number,msg: GameIF.CustomMessage):void{
        var handCard : M_LHZMJ_GameMessage.CMD_S_HandCardData = <M_LHZMJ_GameMessage.CMD_S_HandCardData>msg;
        this._handCard[sendChair].splice(0,this._handCard.length);
        for(var i:number=0; i<handCard.handCardData.length; i++){
            this._handCard[sendChair].push(handCard.handCardData[i]);
        }
    }
    
    /**
     * 房主信息
     * */
    private Handle_CMD_S_TableCreatorInfo(sendChair : number,msg: GameIF.CustomMessage): void {
        var tableCreatorInfo: M_LHZMJ_GameMessage.CMD_S_TableCreatorInfo = <M_LHZMJ_GameMessage.CMD_S_TableCreatorInfo>msg;
        
        this._tableConfig.tableCreatorID = tableCreatorInfo.plyaerID;
        this._tableConfig.tableCreatorChair = tableCreatorInfo.chair;
        this.gameView.TableCreatorInfo(this._tableConfig.tableCreatorChair);
        //this.dispatchEvent(new LHZMJEvent(LHZMJEvent.msg_tableCreatorInfo,this._tableConfig.tableCreatorChair,this._tableConfig.tableCreatorID));
    }

    /**
     * 显示消息
     * */
    private Handle_CMD_S_ShowMsg(sendChair : number,msg: GameIF.CustomMessage): void {
        var showMsg : M_LHZMJ_GameMessage.CMD_S_ShowMsg = <M_LHZMJ_GameMessage.CMD_S_ShowMsg>msg;
        if(1 == showMsg.tipType){
            this.gameView.TipMsgView.showTip(showMsg.msg);
        }else{
            //this.gameView.MsgBox.showMsgBox(showMsg.msg);
        }
    }

    /**
     * 注册一个计时器
     * */
    public regTimer(timerid:number,timerLen:number,chair:number):void{
        
        this._timer.setTimer(timerid,timerLen,chair,this.onTimerEvent,this);
        
        M_LHZMJVideoView.ins.TimerView.node.active=true;
        M_LHZMJVideoView.ins.TimerView.showArrow = chair;
        M_LHZMJVideoView.ins.TimerView.timerNum = timerLen;
        
        this._timer.start();
    }
    
    /**
     * 操作之后
     * */
    private handleOPAfter():void{
          M_LHZMJVideoView.ins.OperatorView.node.active=false;
          M_LHZMJVideoView.ins.SelGangView.node.active=false;
        this._gamePhase = enGamePhase.GamePhase_Unknown;
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
        return true;
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
        return this.VideoSpeed;
    }
    /**
     * 发送游戏消息
     * */
    public sendData(cm: GameIF.CustomMessage): void{
        //this.SendGameData(cm);
    }
    /**
     * 是否可以退出游戏
     * */
    public ifCanExitGame(chairId: number): boolean{
        return true;
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
    public getTableConfig(): LHZMJTableConfig{
        return this._tableConfig;
    }
    /**
     * 手牌数据
     * */
    public getSelfHandCardData(): Array<number>{
        return this._handCard[this.SelfChair];
    }
    /**
     * 取指定椅子号玩家手牌数据
     * */
    public getPlayerHandCardData(chair:number):Array<number>{
        return this._handCard[chair];
    }
    /**
     * 活动牌类名
     * */
    public getActiveCardClassName(): Array<string>{
        return ["QL.gameplug.M_LHZMJ.LHZMJ_SelfActive","QL.gameplug.M_LHZMJ.LHZMJ_DownActive","QL.gameplug.M_LHZMJ.LHZMJ_OppoActive","QL.gameplug.M_LHZMJ.LHZMJ_UpActive"];
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
        return `gameres/gameCommonRes/Texture/Mahjong/PaiHua/mahjong_${LHZMJMahjongAlgorithm1.GetMahjongColor(card)}_${LHZMJMahjongAlgorithm1.GetMahjongValue(card)}`;
    }
     /**
     * 获取麻将牌花资源
     * */
    public getMahjongPaiHuaRes(card: number): cc.SpriteFrame {
        return this.paihua.getSpriteFrame(`mahjong_${LHZMJMahjongAlgorithm1.GetMahjongColor(card)}_${LHZMJMahjongAlgorithm1.GetMahjongValue(card)}`);
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
     * 逻辑椅子号转物理椅子号
     * */
    public logic2physicalChair(chair: number): number {
        return (this.SelfChair + chair) % LHZMJMahjongDef.gPlayerNum;
    }

    /**
     * 物理椅子号转逻辑椅子号
     * */
    public physical2logicChair(chair: number): number {
        return chair >= this.SelfChair ? chair - this.SelfChair : LHZMJMahjongDef.gPlayerNum + chair - this.SelfChair;
    }
    /**
     * 退出游戏
     * */
    public exit(): void{

          for(let i=0;i<4;i++){
            LHZMJ_CardView._freeActiveNode[i].clear();
            LHZMJ_CardView._freeFixedNode[i].clear();
            LHZMJ_CardView._freePoolNode[i].clear();
        }

        


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

    /*玩家头像显示听*/
    private Handle_CMD_S_Ting(msg: GameIF.CustomMessage): void {
       
         var playerTing: M_LHZMJ_GameMessage.CMD_S_Ting = <M_LHZMJ_GameMessage.CMD_S_Ting>msg;
         M_LHZMJVideoView.ins.GameStatusUserInfo.Ting=playerTing.TingNum;

   

        // for (var i = 0; i < M_LHZMJVideoView.ins.CardView.getFixed(playerTing.TingNum)._fixedData.length; i++) {
        //     if (M_LHZMJVideoView.ins.CardView.getFixed(playerTing.TingNum)._fixedData[i].fixedType == enFixedCardType.FixedCardType_AGang) {
              
        //         M_LHZMJVideoView.ins.CardView.getFixed(playerTing.TingNum)._fixedData[i].bmp_cardcolorAry[3].node.active = false;
        //     }
        // }
    }

/**
 * 
 * @param msg 操作过于频繁
 */
    private Handle_CMD_S_IsDissolution(msg:GameIF.CustomMessage):void

    {
        var busy: M_LHZMJ_GameMessage.CMD_S_IsDissolution = <M_LHZMJ_GameMessage.CMD_S_IsDissolution>msg;
        if(busy.IsDissolution==false){

           this.gameView.showMsg();


        }



    }
getFreeActive(chair:number):cc.NodePool{
        return LHZMJ_CardView._freeActiveNode[chair];
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
        return LHZMJ_CardView._freeFixedNode[chair];
        // switch(chair){
        //     case 0:{
        //         return WHMJ_CardView._freeSelfFixedNode;
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
        return LHZMJ_CardView._freePoolNode[chair];
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
        return LHZMJ_CardView._freeFlowerNode[chair];
    }

     /**
     * 获取混牌
     */
    public GetHunCardAry():Array<number>{
        var HunAry:Array<number>=new Array<number>();
   
            if (LHZMJMahjongAlgorithm1.GetMahjongColor(this._hunPiCard) < 3)
                {
                    if (LHZMJMahjongAlgorithm1.GetMahjongValue(this._hunPiCard) != 9)
                    {
                        HunAry.push((this._hunPiCard + 1));
                    }
                    if (LHZMJMahjongAlgorithm1.GetMahjongValue(this._hunPiCard) == 9)
                    {
                        HunAry.push((this._hunPiCard - 8));
                    }
                }
                else if (LHZMJMahjongAlgorithm1.GetMahjongColor(this._hunPiCard) == 3)
                {
                    if (LHZMJMahjongAlgorithm1.GetMahjongValue(this._hunPiCard) < 4)
                    {
                        HunAry.push((this._hunPiCard + 1));
                    }

                    if (LHZMJMahjongAlgorithm1.GetMahjongValue(this._hunPiCard) == 4)
                    {
                        HunAry.push(0x31);
                    }

                    if (LHZMJMahjongAlgorithm1.GetMahjongValue(this._hunPiCard) >= 5 && LHZMJMahjongAlgorithm1.GetMahjongValue(this._hunPiCard) < 7)
                    {
                        HunAry.push((this._hunPiCard + 1));
                    }

                    if (LHZMJMahjongAlgorithm1.GetMahjongValue(this._hunPiCard) == 7)
                    {
                        HunAry.push(0x35);
                    }
                }
            return HunAry;
        
 
    }



}




