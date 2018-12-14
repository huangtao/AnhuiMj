const { ccclass, property } = cc._decorator;
import { GameBaseClass } from "../base/GameBaseClass";
import { GameID, CMD_Static } from "./GameHelp/PDK_CMD_Static";
import { GameIF } from "../../CommonSrc/GameIF";
import M_PDKView from "./M_PDKView";
import { PDK, IPDKClass } from "./GameHelp/PDK_IClass";
import { M_PDK_GameMessage } from "../../CommonSrc/M_PDK_GameMessage";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { MaxPlayerCount } from "./GameHelp/PDK_GameHelp";
import { AudioType } from "../../CustomType/Enum";
import { M_PDK_GameData } from "./M_PDKSetting";
import VoicePlayer from "./GameHelp/PDK_VoicePlayer";

@ccclass
export default class M_PDKClass extends GameBaseClass implements IPDKClass {

    private static _instance: M_PDKClass;
    public static get Instance(): M_PDKClass { return this._instance; }
    @property(M_PDKView)
    private skingameView:M_PDKView = null;
    public allmoney:number=0;
    public validata:boolean = false;
    private chatMsg: string[];
    public VoiceType() { return this.VoiceType; }


    onLoad(): void {
        super.onLoad();
        M_PDKClass._instance = this;
        PDK.ins.iclass = this;
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
    GetSpeed() {
        return 1;
    }
    ScreenShot(hasMask: boolean, node: cc.Node = null) {
        this.ScreenCapture(hasMask, node);
    }
    GetServerChair(chair: number): number {
        return (this.ChairID + chair) % MaxPlayerCount;
    }
    GetClientChair(chair: number): number {
        return this.PhysicChair2LogicChair(chair);
    }

    IsVideo(): boolean {
        return false;
    }
    PlayGameSound(soundName: string, type: AudioType, loops: boolean) {
        this.PlaySound(soundName, type, loops);
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
                case CMD_Static.SUB_S_DissolveTable: {
                    this.skingameView.Rec_DissolveTable(cm);
                    break;
                }
                case CMD_Static.SUB_S_Ready: {
                    this.skingameView.Rec_ShowReady(cm);
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
                case CMD_Static.SUB_S_GameRoundResult: {
                    this.skingameView.Rec_ScoreView(cm);
                    break;
                }
                case CMD_Static.SUB_S_TableState: {
                    this.skingameView.Rec_TableState(cm);
                    break;
                }
                case CMD_Static.SUB_S_OutCard: {
                    this.skingameView.Rec_OutCard(cm);
                    break;
                }
                case CMD_Static.SUB_S_PlayerScore: {
                    this.skingameView.Rec_PlayerScore(cm);
                    break;
                }
                case CMD_Static.SUB_S_ScoreView: {
                    this.skingameView.Rec_RefreshScoreView(cm);
                    break;
                }
                case CMD_Static.SUB_S_GameContext_OutCard: {
                    this.skingameView.Rec_GameContext_OutCard(cm);
                    break;
                }
                case CMD_Static.SUB_S_TableCreator: {
                    this.skingameView.Rec_TableCreator(cm);
                    break;
                }
                case CMD_Static.SUB_S_GameContext_Interval: {
                    this.skingameView.Rec_GameContext_Interval(cm);
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
                    const data: M_PDK_GameData = <M_PDK_GameData>this.GameRule.GameData;
                    var createTable = new M_PDK_GameMessage.CMD_C_CreateTable();
                    createTable.tableCreatorPay = data.tableCreatorPay;                  
                    createTable.SetGameNum = data.SetGameNum;
                    createTable.ifcansameip = data.ifcansameip;
                    createTable.PlayerNum = data.PlayerNum;
                    createTable.gameModel = data.gameModel;
                    createTable.mustOut = data.mustOut;
                    createTable.have2OutA = data.have2OutA;
                    createTable.spadesRedPeach3 = data.spadesRedPeach3;
                    createTable.spades3MustOut = data.spades3MustOut;
                    createTable.redPeach3MustOut = data.redPeach3MustOut;
                    createTable.bomb = data.bomb;
                    createTable.FZBP = data.FZBP;
                    createTable.SZTW = data.SZTW;
                    createTable.showRemainNum = data.showRemainNum;
                    createTable.CheckGps = data.CheckGps;
                    createTable.zhuaNiaoScore = data.zhuaNiaoScore;

                    console.log(createTable);                   
                    this.SendGameData(createTable);
                    break;
                }
              
            }
        }
        return true;
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

    ForceQuit() {
        this.ForceQuitting();
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
    // ================================ 重写结束 ================================

}
