const { ccclass, property } = cc._decorator;
import { GameBaseClass } from "../base/GameBaseClass";
import { GameID, CMD_Static } from "./GameHelp/CMD_Static";
import { GameIF } from "../../CommonSrc/GameIF";
import M_NiuNiuView from "./M_NiuNiuView";
import { NiuNiu, INiuNiuClass } from "./GameHelp/INiuNiuClass";
import { M_NiuNiu_GameData } from "./M_NiuNiuSetting";
import { M_NiuNiu_GameMessage } from "../../CommonSrc/M_NiuNiu_GameMessage";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { TimeFlag, PlayerCount } from "./GameHelp/GameHelp";
import { AudioType } from "../../CustomType/Enum";
import VoicePlayer from "./GameHelp/VoicePlayer";

@ccclass
export default class M_NiuNiuClass extends GameBaseClass implements INiuNiuClass {

    private static _instance: M_NiuNiuClass;
    public static get Instance(): M_NiuNiuClass { return this._instance; }
    @property(M_NiuNiuView)
    private skingameView: M_NiuNiuView = null;
    private chatMsg: string[];
    public allmoney:number=0;
    public validata:boolean = false;
    public VoiceType() { return this.VoiceType; }

    onLoad(): void {
        super.onLoad();
        M_NiuNiuClass._instance = this;
        NiuNiu.ins.iclass = this;
        this.chatMsg = new Array(
            "大家好，很高兴见到各位",
            "快点啊，等到花都谢啦",
            "我是庄家，谁敢挑战我",
            "风水轮流转，底裤都输光了",
            "大牛吃小牛，不要伤心呦",
            "一点小钱，那都不是事",
            "大家一起浪起来",
            "底牌亮出来，绝对吓死你",
            "哇，你真是一个天生的演员",
            "不要走，决战到天亮",
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
    SendData(cm: GameIF.CustomMessage): void {
        this.SendGameData(cm);
    }
    // ================================ 开始重写 ================================
    public GetGameID(): number {
        return GameID;
    }

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
                case CMD_Static.SUB_S_GameCreatePlease: {
                    if (!this.GameRule) {
                        console.log("SUB_S_GameCreatePlease:");
                        console.log(this.GameRule);
                        this.ExitGame();
                        return;
                    }
                    this.skingameView.Rec_GameCreatePlease(cm);
                    
                    //请求创建房间
                    const data: M_NiuNiu_GameData = <M_NiuNiu_GameData>this.GameRule.GameData;
                    var spType = [0,1,2,3,4];
                    var createTable = new M_NiuNiu_GameMessage.CMD_C_CreateTable();
                    createTable.tableCreatorPay = data.tableCreatorPay;
                    createTable.startMasterModel = 1;
                    if(data.extendBet){
                        createTable.cardTypeModel = spType;
                    }
                    createTable.gameModel = data.gameModel;
                    
                    createTable.cellScore = data.cellScore;
                    createTable.gameCountIndex = data.SetGameNum;
                    createTable.checkIP = data.ifcansameip;
                    createTable.extendBet = 0;
                    createTable.rubCard = data.rubCard;
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
            }
        }
        return true;
    }

    protected OnAgreeNextGame() {
        cc.log("所有玩家同意续局");
        this.skingameView.tableInfo.tableCostNum += this.allmoney;
        this.validata = true;
        this.skingameView.AgreeNextGameReset();
    }
    protected OnRefuseNextGame() {
        cc.log("有玩家拒绝续局");

        this.skingameView.RefuseNextGameReset();
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
    protected CheckCanNext():boolean{
        return true;
    }
    /**
     * 玩家坐下:自己坐下和自己坐下后又有新的玩家进入坐下,默认状态为SitDown状态,以防万一最好再处理一下状态
     * */
    protected OnPlayerSitDown(chairID: number, player: QL_Common.TablePlayer): void {
        console.log("OnPlayerSitDown:" + chairID.toString() + "," + player.FaceID + "," + player.NickName + "," + player.PlayerState);
        var chair = this.GetClientChair(chairID);
        this.skingameView.SetUserInfo(chair, player.FaceID, player.NickName, player.Gender);
        this.skingameView.SetUserState(chair, player.PlayerState);
        if (this.skingameView.tableInfo.tableCreator == 0) {
            if (chair != 0) {
                this.skingameView.ShowTiren(chair);
            }
        }
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
        if (this.skingameView.tableInfo.tableCreator == 0) {
            if (chair != 0)
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
        this.skingameView.ShowChatEmoji(chair, clip);
    }
    /**
 * 玩家道具
 * */
    protected OnPlayerChatItem(self_chairID: number, chairID: number, player: QL_Common.TablePlayer, index: string): void {
        var rechair = this.PhysicChair2LogicChair(self_chairID);
        var rechair1 = this.PhysicChair2LogicChair(chairID);
        cc.log("收到玩家道具消息,发起者" + rechair1 + "接收者" + rechair, "玩家实体昵称" + player.NickName + "动画文件索引" + index);
        this.skingameView.ShowChatItem(rechair1, rechair, index);
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
           // if (this.IsCanExitGame(this.ChairID))
                //this.skingameView.RegTimer(TimeFlag.WaitStart, true, timeTick);
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
    /**
     * 录音超时
     */
    protected OnRecordTimeout(){
        this.skingameView.OnVoiceStop(true);
    }

    // ================================ 重写结束 ================================

}