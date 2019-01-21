const { ccclass, property } = cc._decorator;
import { GameBaseClass } from "../base/GameBaseClass";
import { GameID, CMD_Static } from "./GameHelp/BJ_CMD_Static";
import { GameIF } from "../../CommonSrc/GameIF";
import M_BiJiView from "./M_BiJiView";
import { BiJi, IBiJiClass } from "./GameHelp/BJ_IBiJiClass";
import { M_BiJi_GameData } from "./M_BiJiSetting";
import { M_BiJi_GameMessage } from "../../CommonSrc/M_BiJi_GameMessage";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { TimeFlag, PlayerCount } from "./GameHelp/BJ_GameHelp";
import { AudioType } from "../../CustomType/Enum";
import VoicePlayer from "./GameHelp/BJ_VoicePlayer";
import { Action } from "../../CustomType/Action";

@ccclass
export default class M_BiJiClass extends GameBaseClass implements IBiJiClass {

    private static _instance: M_BiJiClass;
    public static get Instance(): M_BiJiClass { return this._instance; }
    @property(M_BiJiView)
    private skingameView: M_BiJiView = null;
    private chatMsg: string[];
    public allmoney:number=0;
    public validata:boolean = false;
    private url:string = "";
    public VoiceType() { return this.VoiceType; }

    onLoad(): void {
        super.onLoad();
        M_BiJiClass._instance = this;
        BiJi.ins.iclass = this;
        this.chatMsg = new Array(
        "大家好，很高兴见到各位",
        "和你合作真是太愉快了",
        "你的牌打的也太好啦",
        "一手烂牌臭到底",
        "投降输一半，速度投降吧",
        "快点吧，我等的花儿都谢了",
        "吐了个槽的，整个一杯具啊",
        "大清早的，鸡都还没叫，慌什么嘛",
        "不怕神一样的对手，就怕猪一样的队友",
        "不要吵了，有什么好吵的，专心玩牌吧",
        "怎么又断线了，网络怎么那么差啊",
        );
        VoicePlayer.PlayBgm();
    }
    IsVideo(): boolean {
        return false;
    }
    IsCreateTable() {
        return this.isSelfCreateRoom;
    }
    public GetSelfState() {
        var playerinfo = this.TablePlayer[this.ChairID];
        if (playerinfo != undefined && playerinfo != null) {
            return playerinfo.PlayerState;
        }
        return QL_Common.GState.Unknown;
    }
    PlayGameSound(soundName: string, type: AudioType, loops: boolean) {
        this.PlaySound(soundName, type, loops);
    }
    GetServerChair(chair: number): number {
        return (this.ChairID + chair) % PlayerCount;
    }
    GetClientChair(chair: number): number {
        return this.PhysicChair2LogicChair(chair);
    }
    GetSpeed() {
        return 1;
    }
    ScreenShot(hasMask: boolean, node: cc.Node = null) {
        this.ScreenCapture(hasMask, node);
    }
    ForceQuit() {
        this.ForceQuitting();
    }
    ShowWanFa() {
        cc.log("准备显示玩法");
        this.showWanfa(this.skingameView.gamerule);
    }
    ShowMaps(){
        this.ShowMaps();
    }
    CopyToClipboardInfo(result:string){
        this.CopyToClipboard(result);
    }
    SendData(cm: GameIF.CustomMessage): void {
        this.SendGameData(cm);
    }
    // ================================ 开始重写 ================================
    public GetGameID(): number {
        return GameID;
    }
    //玩家人数
    //private _userCount :number[]=[];
    
    //玩家分数(续局时用)
    public _tempScore:Array<number> = new Array(5);


    public OnGameMessage(cm: GameIF.CustomMessage): boolean {
        console.log("OnGameMessage:" + cm.wSubCmdID);
        if (cm.wMainCmdID == GameID) {
            switch (cm.wSubCmdID) {
                case CMD_Static.SUB_S_Attribute: {
                    this.skingameView.Rec_Attribute(cm);
                    break;
                }
                case CMD_Static.SUB_S_GameStart: {
                    this.skingameView.Rec_GameStart(cm);
                    break;
                }
                case CMD_Static.SUB_C_RobMaster: {
                    this.skingameView.Rec_RobMaster(cm);
                    break;
                }
                case CMD_Static.SUB_S_BetStart: {
                    this.skingameView.Rec_BetStart(cm);
                    break;
                }
                case CMD_Static.SUB_C_Bet: {
                    this.skingameView.Rec_Bet(cm);
                    break;
                }
                case CMD_Static.SUB_S_SelectCardsStart: {
                    this.skingameView.Rec_SelectCardsStart(cm);
                    break;
                }
                case CMD_Static.SUB_S_SelectCards: {
                    this.skingameView.Rec_SelectCards(cm);
                    break;
                }
                case CMD_Static.SUB_S_GameResult: {
                    this.skingameView.Rec_GameResult(cm);
                    break;
                }
                case CMD_Static.SUB_S_PlayerScore: {
                    this.skingameView.Rec_PlayerScore(cm);
                    break;
                }
                case CMD_Static.SUB_S_TableCreator: {
                    this.skingameView.Rec_TableCreator(cm);
                    break;
                }
                case CMD_Static.SUB_S_MasterChange: {
                    this.skingameView.Rec_MasterChange(cm);
                    break;
                }
                case CMD_Static.SUB_S_GameContext_RobMaster: {
                    this.skingameView.Rec_GameContext_RobMaster(cm);
                    break;
                }
                case CMD_Static.SUB_S_GameContext_Bet: {
                    this.skingameView.Rec_GameContext_Bet(cm);
                    break;
                }
                case CMD_Static.SUB_S_GameContext_SelectCards: {
                    this.skingameView.Rec_GameContext_SelectCards(cm);
                    break;
                }
                case CMD_Static.SUB_S_GameContext_Result: {
                    this.skingameView.Rec_GameContext_Result(cm);
                    break;
                }
                case CMD_Static.SUB_S_ShowCardTypeSelf:{
                    this.skingameView.Rec_ShowCardTypeSelf(cm);
                    break;
                }
                case CMD_Static.SUB_S_GameCreatePlease: {
                    if (!this.GameRule) {
                        console.log("SUB_S_GameCreatePlease:");
                        console.log(this.GameRule);
                        this.ExitGame();
                        return;
                    }
                    this.skingameView.Rec_GameCreatePlease(cm);
                    //请求创建房间
                    const data: M_BiJi_GameData = <M_BiJi_GameData>this.GameRule.GameData;
                    var createTable = new M_BiJi_GameMessage.CMD_C_CreateTable();
                    createTable.tableCreatorPay = data.tableCreatorPay;                   
                    createTable.gameModel = data.gameModel;                    
                    createTable.cellScore = data.cellScore;
                    createTable.SetGameNum = data.SetGameNum;
                    createTable.checkIP = data.checkIP;
                    createTable.extendBet = data.extendBet;
                    createTable.rubCard = data.rubCard;
                    createTable.havedropCard = data.havedropCard;
                    createTable.havexiScore = data.havexiScore;
                    createTable.havesanShunzi = data.havesanShunzi;
                    console.log(createTable);                   
                    this.SendGameData(createTable);
                    break;
                }
                case CMD_Static.SUB_S_ScoreView: {
                    this.skingameView.Rec_ScoreView(cm);
                    break;
                }
                case CMD_Static.SUB_S_TableState: {
                    this.skingameView.Rec_TableState(cm);
                    break;
                }
                case CMD_Static.SUB_S_DissolveTable: {
                    this.skingameView.Rec_DissolveTable(cm);
                    break;
                }
                case CMD_Static.SUB_S_ForceLeftSuccess: {
                    this.skingameView.Rec_ForceLeftSuccess(cm);
                    break;
                }
                case CMD_Static.SUB_S_TableCreatorLeftSuccess: {
                    this.skingameView.Rec_TableCreatorLeftSuccess(cm);
                    break;
                }
                case CMD_Static.SUB_S_ShowMsg: {
                    this.skingameView.Rec_ShowMsg(cm);
                    break;
                }
                case CMD_Static.SUB_C_Ready: {
                    this.skingameView.Rec_Ready(cm);
                    break;
                }
                case CMD_Static.SUB_S_FinishPoker: {   
                    cc.log("收到玩家配牌成功消息");                
                    this.skingameView.ShowFinishPoker(cm);
                    break;
                }case CMD_Static.SUB_S_DropCards: {   
                    cc.log("收到玩家配牌成功消息");                
                    this.skingameView.Rec_DropCards(cm);
                    break;
                }case CMD_Static.SUB_S_NextGamePlease:{
                    cc.log("----------------------显示--------------结算-----------------------");
                    this.RecNextGamePlease(cm);              

                     break;
                }
            }
        }
        return true;
    }
     GetSetId(setid:number){

        this.getRecordShareUrl(setid,(url)=>{           
            this.skingameView.ShowJieSuanCopy(url);
        });
        
    }
    /**
     * 请求续局弹框
     * @param msg 
     */
    private RecNextGamePlease(msg:GameIF.CustomMessage){
        var data = <M_BiJi_GameMessage.CMD_S_NextGamePlease>msg;
        if(data.sponsor==undefined||data.sponsor<=0){
            return;
        }
        this.skingameView.showjiesuan(data.sponsor);
       //  this.showResumeGameForm(new Action(this,this.RefusedNext),new Action(this,this.AgreeNext),this.getTablePlayerAry(),data.total,30);
    }

    //玩家拒绝续局 
    private RefusedNext():void{
        var voteGame : M_BiJi_GameMessage.CMD_C_VoteNextGame = new M_BiJi_GameMessage.CMD_C_VoteNextGame();
        voteGame.select = false;
        this.SendGameData(voteGame);
    }
    //玩家同意续局 0同意 1拒绝 2钻石不足
    private AgreeNext():void{
        var voteGame : M_BiJi_GameMessage.CMD_C_VoteNextGame = new M_BiJi_GameMessage.CMD_C_VoteNextGame();
        voteGame.select = true;
        this.SendGameData(voteGame);     
    }
        /**
     * 获取桌子玩家集合
     * */
    public getTablePlayerAry(): Array<QL_Common.TablePlayer>{
        return this.TablePlayer;
    }
    /**
     * 销毁游戏
     */
    protected DestryGameClass(): boolean {
        this.skingameView.DestroyGameCiew();
        return true;
    }

    /**
     * 初始化游戏 有参数 用于初始化，会被多次调用
     */
    protected OnInitClass(): void {
        this.skingameView.InitGameView();
    }

    /**
     * 初始化游戏 有参数 用于初始化，每次游戏中断线重连都会被调用
     */
    protected ReInitClass(): void {
        this.skingameView.ReInitView();
    }

    public GetChatMsg(): string[] {
        return this.chatMsg;
    }
    /**
     * 游戏结束
     * */
    protected OnGameOver(): void {
        this.skingameView.OnClassOver();
    }

    /**
     * 玩家坐下:自己坐下和自己坐下后又有新的玩家进入坐下,默认状态为SitDown状态,以防万一最好再处理一下状态
     * */
    protected OnPlayerSitDown(chairID: number, player: QL_Common.TablePlayer): void {
        console.log("OnPlayerSitDown:" + chairID.toString() + "," + player.FaceID + "," + player.NickName + "," + player.PlayerState);        
        var chair = this.GetClientChair(chairID);
        //人员数组添加元素
        this.skingameView.SetUserInfo(chair, player.FaceID, player.NickName, player.Gender);
   
        this.skingameView.SetUserState(chair, player.PlayerState);
                if(this.skingameView.tableInfo.tableCreator==0){
            if(chair!=0){
                this.skingameView.ShowTiren(chair);
            }
            
           
        }

     
    }
    protected OnAgreeNextGame(){
        cc.log("所有玩家同意续局");
        this.skingameView.tableInfo.tableCostNum+=this.allmoney;
        this.validata = true;
         this.skingameView.AgreeNextGameReset();
    }
    protected OnRefuseNextGame(){
        cc.log("有玩家拒绝续局");
        
        this.skingameView.RefuseNextGameReset();
    }
    protected CheckCanNext():boolean{
        return true;
    }

    /**
     * 玩家坐下后告诉坐下的玩家,这个桌子上之前已经有哪些玩家了,这个函数需要同时处理玩家的状态显示
     * */
    protected OnTablePlayer(chairID: number, player: QL_Common.TablePlayer): void {
        console.log("OnTablePlayer:" + chairID.toString() + "," + player.FaceID + "," + player.NickName + "," + player.PlayerState);
        var chair = this.GetClientChair(chairID);
        this.skingameView.SetUserInfo(chair, player.FaceID, player.NickName, player.Gender);
        this.skingameView.SetUserState(chair, player.PlayerState);

    }

    /**
     * 玩家状态发生改变,如新的玩家坐下后默认状态为SitDown,然后玩家准备,新状态就是Ready状态
     * */
    protected OnPlayerStatusChange(chairID: number, newStatus: QL_Common.GState): void {
        console.log("OnPlayerStatusChange:" + chairID.toString() + ":" + newStatus.toString());
        var chair = this.GetClientChair(chairID);
        this.skingameView.SetUserState(chair, newStatus);
    }

    /**
     * 玩家离开,玩家从这个桌子上离开,游戏需要将玩家的信息从指定位置清除
     * */
    protected OnPlayerLeave(chairID: number): void {
        console.log("其他玩家离开OnPlayerLeave:" + chairID.toString());
        var chair = this.GetClientChair(chairID);
        this.skingameView.SetUserLeave(chair);
        if(this.skingameView.tableInfo.tableCreator==0){
            if(chair!=0)
            this.skingameView.HideTiren(chair);
        }
    }

    /**
     * 玩家聊天
     * */
    protected OnPlayerChat(chairID: number, player: QL_Common.TablePlayer, chatMsg: string): void {
        console.log("OnPlayerChat:" + chairID + "," + chatMsg);
        var chair = this.GetClientChair(chairID);
        this.skingameView.ShowChat(chair, chatMsg);
    }

    /**
     * 玩家聊天
     * */
    protected OnPlayerChatIndex(chairID: number, player: QL_Common.TablePlayer, idx: number): void {
        console.log("OnPlayerChatIndex:" + chairID + "," + player.Gender + "," + idx);
        var chair = this.GetClientChair(chairID);
        this.skingameView.ShowChat(chair, this.chatMsg[idx]);
        VoicePlayer.PlayChatVoice(idx, player.Gender);
    }

    /**
     * 玩家聊天
     * */
    protected OnPlayerChatEmoji(chairID: number, player: QL_Common.TablePlayer, clip: cc.AnimationClip): void {
        console.log("OnPlayerChatEmoji:" + chairID + "," + clip);
        var chair = this.GetClientChair(chairID);
        cc.log("显示聊天表情，椅子号为"+chair);
        this.skingameView.ShowChatEmoji(chair, clip);
    }
        /**
     * 玩家道具
     * */
    protected OnPlayerChatItem(self_chairID : number ,chairID: number, player: QL_Common.TablePlayer, index:string): void {
        var rechair = this.PhysicChair2LogicChair(self_chairID);
        var rechair1 = this.PhysicChair2LogicChair(chairID);
        cc.log("收到玩家道具消息,发起者"+rechair1+"接收者"+rechair,"玩家实体昵称"+player.NickName+"动画文件索引"+index);
        this.skingameView.ShowChatItem(rechair1,rechair,index);
    }

    /**
     * 玩家余额发生改变
     * */
    protected OnPlayerScoreChange(): void {
        console.log("OnPlayerScoreChange");
        this.skingameView.RefreshMoney();
    }

    /**
     * 准备倒计时通知
     * @param timeTick 
     * @returns {} 
     */
    protected OnPlayerReadyTimer(timeTick: number): void {
        console.log("OnPlayerReadyTimer:" + timeTick);
        if (timeTick >= 0) {
            return;
            // if (this.IsCanExitGame(this.ChairID))
            //     this.skingameView.RegTimer(TimeFlag.WaitStart, true, timeTick);
        }
        else {
            this.skingameView.DestroyTimer();
        }
    }

    /**
     * 一个玩家语音开始播放
     * @param chairID 
     * @returns {} 
     */
    protected OnPlayerVoiceStart(chairID: number) {
        var chair = this.GetClientChair(chairID);
        this.skingameView.StartVoicePlay(chair);
    }

    /**
     * 语音播放结束
     * @param chairID 
     * @returns {} 
     */
    protected OnPlayerVoiceEnd(chairID: number) {
        var chair = this.GetClientChair(chairID);
        this.skingameView.StopVoicePlay(chair);
    }

    /**
     * native环境下，玩家点击开启播放背景声音
     * @returns {} 
     */
    protected OnTurnOnMusic() {
        //由于egret出现bug，我们临时使用这种方法重新播放声音
        //在这里，调用 this.PlaySound() 播放背景音乐
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
            this.skingameView.OnButtonExit(true);
            return true;
        }
        return false;
    }

    // ================================ 重写结束 ================================

}
