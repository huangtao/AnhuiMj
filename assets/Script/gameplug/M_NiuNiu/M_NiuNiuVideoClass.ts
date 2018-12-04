const { ccclass, property } = cc._decorator;
import { GameID, CMD_Static } from "./GameHelp/CMD_Static";
import { GameIF } from "../../CommonSrc/GameIF";
import { NiuNiu, INiuNiuClass } from "./GameHelp/INiuNiuClass";
import { M_NiuNiu_GameData } from "./M_NiuNiuSetting";
import { M_NiuNiu_GameMessage } from "../../CommonSrc/M_NiuNiu_GameMessage";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { TimeFlag, PlayerCount } from "./GameHelp/GameHelp";
import { AudioType } from "../../CustomType/Enum";
import VoicePlayer from "./GameHelp/VoicePlayer";
import { GameVideoBase } from "../base/GameVideoBase";
import M_NiuNiuVideoView from "./M_NiuNiuVideoView";

@ccclass
export default class M_NiuNiuVideoClass extends GameVideoBase implements INiuNiuClass {

    private static _instance: M_NiuNiuVideoClass;
    public static get Instance(): M_NiuNiuVideoClass { return this._instance; }
    @property(M_NiuNiuVideoView)
    private skingameView: M_NiuNiuVideoView=null;
    public VoiceType() { return this.VoiceType; }

    onLoad(): void {
        super.onLoad();
        M_NiuNiuVideoClass._instance = this;
        NiuNiu.ins.iclass = this;
        VoicePlayer.PlayBgm();
    }
    IsVideo(): boolean {
        return true;
    }
    IsCreateTable() {
        return this.isSelfCreateRoom;
    }
    public GetSelfState(){
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
        return this.VideoSpeed / 1000;
    }
    ScreenShot(hasMask: boolean, node: cc.Node = null) {
    }
    ForceQuit() {
        this.ExitGame();
    }
    SendData(cm: GameIF.CustomMessage): void {
    }
    /**
     * 计时器
     */
    protected onTimerTick(): void {
    }
    protected CanSkipReplayMessage(message:GameIF.CustomMessage):boolean{
        return false;
    }
    /**
     * 录像暂停
     */
    public OnPause(): void {
        this.skingameView.TimePause();
    }
    /**
     * 录像恢复播放
     */
    public OnResume(): void {
        this.skingameView.TimeResume();
    }
    // ================================ 开始重写 ================================
    public GetGameID(): number {
        return GameID;
    }

    public OnGameMessage(sendChair: number, cm: GameIF.CustomMessage): void {
        console.log("OnGameMessage:" + cm.wSubCmdID);
        if (cm.wMainCmdID == GameID && (sendChair == -1 || this.GetClientChair(sendChair) == 0)) {
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
                case CMD_Static.SUB_S_GameCreatePlease: {
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
     * 玩家坐下:自己坐下和自己坐下后又有新的玩家进入坐下,默认状态为SitDown状态,以防万一最好再处理一下状态
     * */
    protected OnPlayerSitDown(chairID: number, player: QL_Common.TablePlayer): void {
        console.log("OnPlayerSitDown:" + chairID.toString() + "," + player.FaceID + "," + player.NickName + "," + player.PlayerState);
        var chair = this.GetClientChair(chairID);
        this.skingameView.SetUserInfo(chair, player.FaceID, player.NickName, player.Gender);
        this.skingameView.SetUserState(chair, player.PlayerState);
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

    // ================================ 重写结束 ================================
}
