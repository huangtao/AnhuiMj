/*
 * @Author: 刘思宇 
 * @Date: 2017-11-30 16:21:09 
 * @Last Modified by: 刘思宇
 * @Last Modified time: 2018-01-24 12:51:28
 */
import Global from "../../Global/Global";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { GameIF } from "../../CommonSrc/GameIF";
import { EventCode } from "../../Global/EventCode";
import { InitGameParam } from "../../CustomType/InitGameParam";
import { ShareParam, ShareParamExpands } from "../../CustomType/ShareParam";
import ConfigData from "../../Global/ConfigData";
import { QueryAIFace, ReportError, Debug, PlayEffect } from "../../Tools/Function";
import SendMessage from "../../Global/SendMessage";
import { AudioType, ChatType } from "../../CustomType/Enum";
import { UIName } from "../../Global/UIName";
import { ChatForm } from "../../Form/Chat/ChatForm";
import { MapsForm } from "../../Form/Location/MapsForm";
import GameSettingForm from "../MJCommon/GameSettingForm";
import { ReConnectBase } from "../../SceneCtrl/ReConnectBase";
import { NativeCtrl } from "../../Native/NativeCtrl";
import MJ_UserData from "../MJCommon/MJ_UserData";
import { ConstValues } from "../../Global/ConstValues";
import { Action, ActionNet } from "../../CustomType/Action";
import { LastCardIndex } from '../M_BiJi/GameHelp/BJ_GameHelp';
import { ResumeGame } from "../../Form/ResumeGame/ResumeGame";
import { LocalStorage } from "../../CustomType/LocalStorage";
import { ResumeGameParam } from "../../CustomType/ResumeGameParam";
import { WebRequest } from "../../Net/Open8hb";

export abstract class GameBaseClass extends ReConnectBase {

    public readonly TablePlayer: QL_Common.TablePlayer[] = new Array();

    private _tableID: number;
    public get TableID(): number {
        return this._tableID;
    }

    private _chairID: number;
    public get ChairID(): number {
        return this._chairID;
    }

    private _roomInfo: QL_Common.RoomClient = null;
    public get RoomClient() {
        return this._roomInfo;
    }

    private _gameRule: any = null;
    public get GameRule() {
        if (!this._gameRule) {
            this._gameRule = {};
        }
        return this._gameRule;
    }

    public set GameRule(rule: any) {
        this._gameRule = rule;
    }
    private _resumeGame: ResumeGame = null;
    public get resumeGame() {
        return this._resumeGame;
    }
    public set resumeGame(value: ResumeGame) {
        this._resumeGame = value;
    }

    private _gameInfo: QL_Common.GameInfo = null;
    public get GameInfo() {
        return this._gameInfo;
    }

    private _gameStatus: number;
    public get GameStatus() {
        return this._gameStatus;
    }

    private _isInit = false;

    /**
     * 标志游戏基类是否已经数据初始化
     */
    public get IsInit() {
        return this._isInit;
    }

    /**
     * 是否已经准备
     */
    private _isReady = false;

    /**
     * 聊天框界面
     */
    private _chatform: ChatForm;
    private _onLoadChat = false;
    private _mapsForm: MapsForm;
    private _onLoadMap = false;

    /**
     * 是否是2D
     */
    public is2D() {
        let localSelect = LocalStorage.GetItem("Game_Canvas");
        return (localSelect == "2D") ? true : false;
    }

    /**
     * 获取当前场景类型 2D或3D
     */
    public getCurSceneCanvas() {
        let localCanvas = LocalStorage.GetItem("Game_Canvas");

        if (localCanvas) {
            return localCanvas;
        } else {
            // 默认是3D
            return "3D";
        }
    }

    public get isSelfCreateRoom() {
        if (!this._roomInfo) {
            cc.error("房间尚未初始化，请不要调用isSelfCreateRoom");
            return false;
        }
        return this._roomInfo.RoomType === QL_Common.RoomType.MomentsGame;
    }

    public SendUserReady(): void {
        if (!this.TablePlayer[this._chairID]) return;
        if (QL_Common.GState.SitDown === this.TablePlayer[this._chairID].PlayerState) {
            //const ready = new QL_Common.MSG_C_PlayerReady();
            SendMessage.Instance.PlayerReady();
            console.log(`发送准备请求:${this.TablePlayer[this._chairID].PlayerState}`);
        } else {
            console.log(`被忽略的准备请求:${this.TablePlayer[this._chairID].PlayerState}`);
        }
    }

    /**
     * 物理椅子号转换至逻辑椅子号,转换后自己永远是0，右边比自己大1，逆时针++
     * */
    public PhysicChair2LogicChair(chairID: number): number {
        if (!this._isInit) {
            ReportError("房间尚未初始化，请不要调用PhysicChair2LogicChair");
            return 0;
        }
        return chairID >= this._chairID ? chairID - this._chairID : chairID + this._roomInfo.MaxCount - this._chairID;
    }

    /**
     * 请求换桌位
     * @param chairID
     */
    public SendRequestChangeChairID(chairID: number) {
        SendMessage.Instance.RequestChangeChairId(chairID);

    }

    /**
     * 同意或拒绝换座位
     * @param chairid 
     * @param accept 
     */
    public SendAcceptChangeChairID(chairid: number, accept: boolean): void {
        SendMessage.Instance.AcceptChangeChairId(chairid, accept);
    }

    /**
     * 播放声音
     * @param path 播放声音的路径
     * @param audiotype 
     * @param loop 
     */
    public PlaySound(path: string | cc.AudioClip, audiotype: AudioType = AudioType.Effect, loop: boolean = false): number {
        cc.log(`播放声音：${path}`);
        return Global.Instance.AudioManager.Play(path, audiotype, loop);
    }

    /**
     * 对指定的操作节点进行截图，并自动拉起微信分享
     * @param haveMask 要截图的节点中活子节点中是否存在遮罩 mask 如果存在则为 true 否则为false
     * @param node 
     */
    public ScreenCapture(haveMask: boolean, node: cc.Node = null) {
        this.UiManager.ShowUi(UIName.GameShareForm, { shareType: 'img', shareParam: { node: node, haveMask: haveMask } })
    }
    /**
     * 复制文本信息到字体剪贴板
     * @param copyContent 要复制到系统剪贴板的文本内容
     */
    public CopyToClipboard(copyContent: string) {
        if (copyContent == null || copyContent.length <= 0) {
            //复制的内容不能为空
            return;
        }
        NativeCtrl.CopyToClipboard(copyContent);
    }
    /**
     * 发送一条分享内容，邀请好友等功能
     * @param charid 分享的椅子号
     * @param TableID 分享的房间号，桌子编号等
     * @param title 分享标题
     * @param context 分享内容
     */
    public ShowShare(charid: number = QL_Common.InvalidValue.InvalidChairID, TableID = QL_Common.InvalidValue.InvalidTableID, title: string = "", context: string = "") {

        const share = new ShareParam();
        share.text = context;
        share.title = title;
        share.link = ConfigData.SiteConfig.DownloadUrl;

        share.link_param = new ShareParamExpands();
        share.link_param.parent = this.UserInfo.userData.UserID + "";
        share.link_param.chairid = charid + "";
        share.link_param.tableid = TableID + '';
        this.UiManager.ShowUi(UIName.GameShareForm, { shareType: share.shareType, shareParam: share });
    }

    /**
     * 显示通用确定取消弹出框
     */
    public ShowMsgBox(str: string, thisobj?: any, okAction?: Function, cancleAction?: Function, closeAction?: Function, okArgs?: any, cancleArgs?: any, closeArgs?: any, align?: cc.Label.HorizontalAlign) {
        this.UiManager.ShowMsgBox(str, thisobj, okAction, cancleAction, closeAction, okArgs, cancleArgs, closeArgs, align);
    }

    public ForceQuitting() {
        Global.Instance.GameHost.ExitGame();
    }
    public showChat() {
        if (cc.isValid(this._chatform)) {
            this._chatform.Show();
        } else {
            if (this._onLoadChat) return;
            this._onLoadChat = true;
            cc.loader.loadRes("Prefabs/Chat/ChatForm", function (err, prefab: cc.Prefab) {
                if (err) {
                    return;
                }
                const node = cc.instantiate(prefab);
                const c = node.getComponent<ChatForm>(ChatForm);
                c.ChatString = this.GetChatMsg();
                c.Init();
                c.Show();
                this._onLoadChat = false;
            }.bind(this));
        }
    }
    closeChat() {
        if (cc.isValid(this._chatform)) {
            this._chatform.Close();
        }
    }

    public IsCanExitGame(chairid: number = this._chairID) {
        if (this.GameStatus === 0) return true;
        const player = this.TablePlayer[chairid]
        if (!player) {
            cc.warn("检查了无效的椅子号，此座位上没有玩家 chairid=" + chairid);
            return false;
        }
        if (player.PlayerState === QL_Common.GState.Gaming) {
            return false;
        }
        return true;
    }

    public ExitGame() {
        if (this.IsCanExitGame()) {
            Global.Instance.GameHost.ExitGame();

        } else {
            this.UiManager.ShowTip("正在游戏中无法离开游戏");
        }

    }

    public WebConfigName() {
        return ConfigData.SiteConfig.SiteName;
    }
    /**
     * 显示设置界面
     * canvasClick 游戏2D、3D切换
     */
    public ShowSettingForm(enableChange2D: boolean = false) {
        PlayEffect(cc.url.raw("resources/Sound/open_panel.mp3"));
        cc.loader.loadRes("Prefabs/GameSetting/GameSettingForm", function (err, prefab: cc.Prefab) {
            if (err) {
                return;
            }
            const node = cc.instantiate(prefab);
            const m = node.getComponent(GameSettingForm);
            m.registerCanvasSwtichClick(new Action(this, this.canvaSwitchClickEvent));
            m.Show(null, { canvas: this.getCurSceneCanvas() });
            m.setEnableChange2D(enableChange2D);
        }.bind(this));
    }

    /**
     * canvas: 值 '2D'、'3D'
     * @Desc     场景画布2D、3D切换逻辑
     */
    public canvaSwitchClickEvent(canvas: string) {

    }

    public StartRecord() {
        return this.AudioManager.StartRecord();
    }

    public StopRecord() {
        return this.AudioManager.StopRecord();
    }


    public PleaseLeavePlayer(userId: number) {
        if (this.isSelfCreateRoom) {
            SendMessage.Instance.EliminateUser(userId);
        } else {
            this.UiManager.ShowTip("这不是自主建房的房间");
        }
    }

    public UserBagEntity(currencyType: QL_Common.CurrencyType): number {
        return this.UserInfo.CurrencyNum(currencyType);
    }

    public showPay(): void {
        this.UiManager.ShowUi(UIName.Shop)
    }
    /**
     * 显示定位
     */
    public ShowMaps() {
        if (cc.isValid(this._mapsForm)) {
            this._mapsForm.Show(null);
        } else {
            if (this._onLoadMap) return;
            this._onLoadMap = true;
            let thisObj = this;
            cc.loader.loadRes("Prefabs/Location/GpsForm", function (err, prefab: cc.Prefab) {
                if (err) {
                    return;
                }
                const node = cc.instantiate(prefab);
                const m = node.getComponent<MapsForm>(MapsForm);

                /**
                 * 取得当前桌子的总人数
                 */
                let playerNum = 0;
                for (let i = 0; i < thisObj.TablePlayer.length; i++) {
                    if (thisObj.TablePlayer[i]) {
                        playerNum++;
                    }
                }

                /**
                 * 设置玩家信息
                 */
                for (let i = 0; i < thisObj.TablePlayer.length; i++) {
                    if (thisObj.TablePlayer[i]) {
                        if (thisObj.TablePlayer[i].PlayerID != thisObj.UserInfo.userData.UserID) {
                            if (thisObj.TablePlayer[(i + 1) % 4]) {
                                if (thisObj.TablePlayer[(i + 1) % 4].PlayerID != thisObj.UserInfo.userData.UserID) {
                                    m.SetPlayer(this.PhysicChair2LogicChair(i), this.TablePlayer[i], this.TablePlayer[(i + 1) % 4], playerNum);
                                } else {
                                    m.SetPlayer(this.PhysicChair2LogicChair(i), this.TablePlayer[i], this.TablePlayer[(i + 2) % 4], playerNum);
                                }
                            } else {

                                m.SetPlayer(this.PhysicChair2LogicChair(i), this.TablePlayer[i], null, playerNum);
                            }
                        }
                    }
                }

                m.Show(null);
                this._mapsForm = m;
                this._onLoadMap = false;
            }.bind(this));
        }
    }
    /**
     * 显示玩法
     */
    public showWanfa(gameRule?: any) {
        let rules = gameRule;

        if (!gameRule) {
            if (this.GameRule) {
                rules = this.GameRule.GameData;
            }
        }

        if (!rules) {
            return;
        }

        this.ShowUi(UIName.GameWanFa, { rule: rules, modelName: this.GameInfo.ModuleName });
    }

    /**
     * 显示申请续局弹框
     * downTime: 倒计时
     */
    public showResumeGameForm(gameEndEventHandle: Action, agreeEventHandle: Action, playerList: any, scoreList: any, countDownTime: number, statusList?: any) {
        this.ShowUi(UIName.ResumeGame, { downTime: 0, gameEndEventHandle: gameEndEventHandle, agreeEventHandle: agreeEventHandle, playerList: playerList, scoreList: scoreList, countDownTime: countDownTime, statusList: statusList });
    }

    /**
     * 显示个人信息框
     */
    public showPlayerInfoForm(tableInfo: QL_Common.TablePlayer, pos: any, chairID: number) {
        let tableInfo_ = tableInfo;
        let pos_ = pos;

        cc.loader.loadRes("gameres/PlayerInfoForm", (err, prefab: cc.Prefab) => {

            if (err) {
                cc.error(err.message || err);
                return;
            }

            const newNode = cc.instantiate(prefab);
            let playerInfo: MJ_UserData = newNode.getComponent('MJ_UserData');

            if (playerInfo) {
                playerInfo.InitShow(tableInfo_, pos_, chairID);
            }

            cc.Canvas.instance.node.addChild(newNode);
        });

        // this.ShowUi(UIName.GamePlayerInfo, { tableInfo: tableInfo, pos: pos });
    }

    public CloseSocket() {
        Global.Instance.Socket.Close();
    }


    /**
     * 根据提供的setId获取我那家战绩的分享链接
     * @param setId 游戏结算后获得的setId
     * @param callback 获得分享链接的回调
     */
    public getRecordShareUrl(setId: number, callback: (url: string) => void) {

        let data = WebRequest.DefaultData(true);
        data.AddOrUpdate("setId", setId);
        let action = new ActionNet(this, (obj) => {
            callback(obj.url)
        }, (o) => {
            callback("");
        });
        WebRequest.replay.getRecordUrl(action, data);

        // let url = `${ConfigData.webserverinterfaceUrl}/web/ShareReplay.showrec?setId=${setId}`;
        // if (cc.isValid(callback)) {
        //     callback.apply(this, [url]);
        // }
    }









    onLoad(): void {
        super.onLoad();
        if (!this.UserInfo.userData) {
            this.ChangeScene("Login");
            return;
        }
    }

    start(): void {
        super.start();

    }

    update(): void {
        super.update();
    }

    lateUpdate(): void {
        super.lateUpdate();
    }

    onDestroy(): void {
        super.onDestroy();
        if (Debug()) {
            this.DestryGameClass();
        } else {
            try {
                this.DestryGameClass();
            } catch (e) {
                cc.error("销毁游戏场景出现异常");
                ReportError(`销毁游戏场景出现异常 msg:${e.message}`);
            }
        }
        this.AudioManager.StopMusic();
    }

    private ChangeScene(scene: string) {
        Global.ChangeScene(scene);
    }
    protected OnSceneMessage(cm: GameIF.CustomMessage): boolean {
        if (!this._isInit) {
            return false;
        }
        switch (cm.wMainCmdID << 8 | cm.wSubCmdID) {
            //玩家坐下
            case QL_Common.Main_CommonID.GS2C << 8 | QL_Common.GS2C.gs2c_playerSitDown:
                this.HandleNet_gs2c_playerSitDown(cm);
                return true;
            //桌子上的玩家
            case QL_Common.Main_CommonID.GS2C << 8 | QL_Common.GS2C.gs2c_tablePlayer:
                this.HandleNet_gs2c_tablePlayer(cm);
                return true;
            //玩家起立离开
            case QL_Common.Main_CommonID.GS2C << 8 | QL_Common.GS2C.gs2c_playerStandUP:
                this.HandleNet_gs2c_playerStandUP(cm);
                return true;
            //玩家状态改变
            case QL_Common.Main_CommonID.GS2C << 8 | QL_Common.GS2C.gs2c_playerStatus:
                this.HandleNet_gs2c_playerStatus(cm);
                return true;
            //桌子上的聊天消息
            case QL_Common.Main_CommonID.GS2C << 8 | QL_Common.GS2C.gs2c_tableChartMsg:
                this.HandleNet_gs2c_tableChartMsg(cm);
                return true;
            //游戏结束
            case QL_Common.Main_CommonID.GS2C << 8 | QL_Common.GS2C.MSG_S_GameOver:
                this.HandleNet_MSG_S_GameOver(cm);
                return true;
            //游戏场景消息
            case QL_Common.Main_CommonID.GS2C << 8 | QL_Common.GS2C.MSG_S_GameScene:
                this.HandleNet_MSG_S_GameScene(cm);
                return true;
            //游戏开始
            case QL_Common.Main_CommonID.GS2C << 8 | QL_Common.GS2C.MSG_S_GameStart:
                this.HandleNet_MSG_S_GameStart(cm);
                return true;
            //准备倒计时
            case QL_Common.Main_CommonID.GS2C << 8 | QL_Common.GS2C.MSG_S_PlayerReadyTimer:
                this.HandleNet_MSG_S_PlayerReadyTimer(cm);
                return true;
            //收到其他玩家请求换桌
            case QL_Common.Main_CommonID.GS2C << 8 | QL_Common.GS2C.MSG_S_RequestChangeChairId:
                this.HandleNet_MSG_S_RequestChangeChairId(cm);
                return true;
            //玩家换桌
            case QL_Common.Main_CommonID.GS2C << 8 | QL_Common.GS2C.MSG_S_PlayerNewChairInfo:
                this.HandleNet_MSG_S_PlayerNewChairInfo(cm);
                return true;
            //收到开始续局消息
            case QL_Common.Main_CommonID.GS2C << 8 | QL_Common.GS2C.MSG_S_BeginGameVote:
                this.HandleNet_MSG_S_BeginGameVote(cm);
                return true;
            //续局时服务端推送玩家状态    
            case QL_Common.Main_CommonID.GS2C << 8 | QL_Common.GS2C.MSG_S_PlayerGameVoteStatus:
                this.HandleNet_MSG_S_PlayerGameVoteStatus(cm);
                return true;
            case QL_Common.Main_CommonID.GS2C << 8 | QL_Common.GS2C.MSG_S_EndGameVote:
                this.HandleNet_MSG_S_EndGameVote(cm);
                return true;
            default:
                if (this.GetGameID() === cm.wMainCmdID && this._isInit) {
                    this.OnGameMessage(cm);
                    return true;
                } else {
                    console.warn("丢弃消息:" + cm.FullName());
                    return false;
                }

        }
    }


    //玩家坐下
    private HandleNet_gs2c_playerSitDown(msg: GameIF.CustomMessage): void {
        const playerSitDown: QL_Common.MSG_S_PlayerSitDown = <QL_Common.MSG_S_PlayerSitDown>msg;
        if (playerSitDown.playerInfo.FaceID.length === 0) {
            //设置默认头像
            playerSitDown.playerInfo.FaceID = ConfigData.defaultHeader;
        }
        //获取AI头像
        if (playerSitDown.playerInfo.PlayerID < ConstValues.StartUserId) {
            playerSitDown.playerInfo.FaceID = QueryAIFace(playerSitDown.playerInfo.FaceID);
        }

        this.TablePlayer[playerSitDown.chairID] = playerSitDown.playerInfo;
        this.OnPlayerSitDown(playerSitDown.chairID, playerSitDown.playerInfo);
        if (cc.isValid(this._mapsForm)) {
            this._mapsForm.SetPlayer(this.PhysicChair2LogicChair(playerSitDown.chairID), playerSitDown.playerInfo, null, 0);
        }
    }

    //桌子上的玩家
    private HandleNet_gs2c_tablePlayer(msg: GameIF.CustomMessage): void {
        const table_player: QL_Common.MSG_S_PlayerSitDown = <QL_Common.MSG_S_TablePlayer>msg;
        if (table_player.playerInfo.FaceID.length === 0) {
            //设置默认头像
            table_player.playerInfo.FaceID = ConfigData.defaultHeader;
        }
        //获取AI头像
        if (table_player.playerInfo.PlayerID < ConstValues.StartUserId) {
            table_player.playerInfo.FaceID = QueryAIFace(table_player.playerInfo.FaceID);
        }

        this.TablePlayer[table_player.chairID] = table_player.playerInfo;
        this.OnTablePlayer(table_player.chairID, table_player.playerInfo);
        if (cc.isValid(this._mapsForm)) {
            this._mapsForm.SetPlayer(this.PhysicChair2LogicChair(table_player.chairID), table_player.playerInfo, null, 0);
        }
    }

    //玩家起立
    private HandleNet_gs2c_playerStandUP(msg: GameIF.CustomMessage): void {
        const player_stand_up: QL_Common.MSG_S_PlayerStandUp = <QL_Common.MSG_S_PlayerStandUp>msg;
        this.OnPlayerLeave(player_stand_up.chairID);
        if (player_stand_up.chairID === this._chairID) {
            this._isInit = false;
            //如果离开的玩家是自己，则表示自己被换桌了
            if (this.TablePlayer[player_stand_up.chairID].PlayerState === QL_Common.GState.PlayerReady) {
                this.TablePlayer[player_stand_up.chairID].PlayerState = QL_Common.GState.Free;
                this._isReady = true;
            }
            this.OnPlayerChangeTable();
        }
        this.TablePlayer[player_stand_up.chairID] = null;
        if (cc.isValid(this._mapsForm)) {
            this._mapsForm.SetPlayer(this.PhysicChair2LogicChair(player_stand_up.chairID), null, null, 0);
        }
    }

    //玩家状态
    private HandleNet_gs2c_playerStatus(msg: GameIF.CustomMessage): void {
        const player_status = <QL_Common.MSG_S_TablePlayerStatus>msg;
        if (player_status == null) return;
        if (null != this.TablePlayer[player_status.chairID]) {
            this.TablePlayer[player_status.chairID].PlayerState = player_status.status;
            this.OnPlayerStatusChange(player_status.chairID, player_status.status);
        }

        if (player_status.chairID === this._chairID) {
            if (player_status.status === QL_Common.GState.SitDown) {
                if (this._isReady) {
                    this.SendUserReady();
                }
            }
        }

    }


    //桌子上的聊天消息
    private HandleNet_gs2c_tableChartMsg(msg: GameIF.CustomMessage): void {
        if (!this._isInit) {
            return;
        }
        const chart = <QL_Common.MSG_S_TableChart>msg;
        if (chart == null) return;
        if (!this.TablePlayer[chart.chairID]) {
            ReportError("在无玩家时候收到玩家聊天信息");
            return;



        }
        switch (chart.Type) {
            case ChatType.Text:
                this.OnPlayerChat(chart.chairID, this.TablePlayer[chart.chairID], chart.chartContext);
                return;
            case ChatType.Emoji:
                let path = "";
                let scene = cc.director.getScene();
                if (scene.name == "M_BiJi" || scene.name == "M_PDK") {
                    path = "Animation/Emoji/PK/gfx_chat_puke_" + chart.chartContext;
                } else {
                    path = "Animation/Emoji/MJ/gfx_chat_majiang_" + chart.chartContext;
                }
                cc.loader.loadRes(path, cc.AnimationClip, function (err, clip) {
                    if (err) {
                        cc.error(err);
                        return;
                    }
                    this.OnPlayerChatEmoji(chart.chairID, this.TablePlayer[chart.chairID], clip);
                }.bind(this))
                return;
            case ChatType.TextVoice:
                const idx = parseInt(chart.chartContext);
                if (!isNaN(idx) && idx >= 0) {
                    this.OnPlayerChatIndex(chart.chairID, this.TablePlayer[chart.chairID], idx);
                }
                return;
            case ChatType.Record:
                cc.log("收到语音，地址：" + chart.chartContext);
                Global.Instance.AudioManager.PlayRecord(chart.chartContext, chart.chairID);
                return;
            case ChatType.Item:
                let target_chairid;//发起玩家的椅子号

                let exist = chart.chartContext.indexOf("_"); //如果下划线存在
                if (exist > - 1) {
                    let str_array = chart.chartContext.split("_");
                    chart.chartContext = str_array[0];
                    target_chairid = parseInt(str_array[1]);
                }

                this.OnPlayerChatItem(target_chairid, chart.chairID, this.TablePlayer[chart.chairID], chart.chartContext);

                // if(chart.chartContext == "guzhang"){
                //     filename = "Animation/Item/gfx_meili_" + chart.chartContext + "_stand_animation";
                //     play_flag = false;
                // }else{
                //     filename = "Animation/Item/gfx_meili_" + chart.chartContext + "_feixing_animation"
                // }

                // if(!play_flag){
                //     cc.log("鼓掌没有命中动画");
                //     return;
                // }

                // cc.loader.loadRes(filename, cc.AnimationClip, function (err, fxclip) {
                //     if (err) {
                //         cc.error(err);
                //         return;
                //     }
                //     fx_clip = fxclip;
                // }.bind(this))

                // cc.loader.loadRes("Animation/Item/gfx_meili_" + chart.chartContext + "_mingzhong_animation", cc.AnimationClip, function (err, mzclip) {
                //     if (err) {
                //         cc.error(err);
                //         return;
                //     }

                //     if(fx_clip != null){
                //         this.OnPlayerChatItem(target_chairid, chart.chairID, this.TablePlayer[chart.chairID], fx_clip, mzclip);
                //     }else{
                //         cc.log("获取道具飞行动画初始化失败");
                //     }
                // }.bind(this))

                return;
            default:
                cc.warn("一条未知的信息类型")
                return;
        }
    }

    //游戏结束
    private HandleNet_MSG_S_GameOver(msg: GameIF.CustomMessage): void {
        if (!this._isInit) {
            return;
        }
        this._gameStatus = QL_Common.TableStatus.free;
        this._isReady = false;
        for (let i = 0; i < this.TablePlayer.length; i++) {
            if (this.TablePlayer[i]) {
                this.TablePlayer[i].PlayerState = QL_Common.GState.SitDown;
            }
        }
        if (this._isInit) {
            this.OnGameOver();
        }
    }

    //游戏场景
    private HandleNet_MSG_S_GameScene(msg: GameIF.CustomMessage): void {
        const game_scene: QL_Common.MSG_S_GameScene = <QL_Common.MSG_S_GameScene>msg;
        if (this._isInit) {
            this.OnGameScene(game_scene.GameSceneStatus);
        }
    }

    //游戏开始
    private HandleNet_MSG_S_GameStart(msg: GameIF.CustomMessage): void {
        this._gameStatus = QL_Common.TableStatus.gameing;
        for (let i = 0; i < this.TablePlayer.length; i++) {
            if (null != this.TablePlayer[i]) {
                if (this.TablePlayer[i].PlayerState === QL_Common.GState.PlayerReady)
                    this.TablePlayer[i].PlayerState = QL_Common.GState.Gaming;
            }
        }
        if (this._isInit) {
            this.OnGameStart();
        }
    }

    private HandleNet_MSG_S_PlayerReadyTimer(msg: GameIF.CustomMessage): void {
        const timer = <QL_Common.MSG_S_PlayerReadyTimer>msg;
        if (this._isInit) {
            this.OnPlayerReadyTimer(timer.TimeTick);
        }
    }

    /**
     * 收到别人请求换座位
     * @param msg
     */
    private HandleNet_MSG_S_RequestChangeChairId(msg: GameIF.CustomMessage): void {
        const change = <QL_Common.MSG_S_RequestChangeChairId>msg;
        if (change.selfChairId !== this.ChairID) {
            cc.log("位置不符，不响应服务端信息");
            return;
        }
        if (this._isInit) {
            this.OnRequestChangeChairId(change.chairId, change.selfChairId, change.Mark);
        }
    }
    /**
     * 续局开始，显示弹窗
     * @param msg 
     */
    private HandleNet_MSG_S_BeginGameVote(msg: GameIF.CustomMessage): void {
        const change = <QL_Common.MSG_S_BeginGameVote>msg;
        var scoreList = new Array(this.TablePlayer.length);
        cc.log("我自己的椅子号" + this._chairID);
        for (let i = 0, j = 0; i < this.TablePlayer.length; i++) {
            if (this.TablePlayer[i] != null) {
                if (change.GamePlayerScore[j].PlayerId == 0 && change.GameVoteType == 1) {
                    j++;
                }
                scoreList[i] = change.GamePlayerScore[j].GameScore;
                j++;
            }

        }
        let p: ResumeGameParam = new ResumeGameParam();

        p.downTime = 0;
        p.gameEndEventHandle = this.refuseNext;
        p.agreeEventHandle = this.agreeNext;
        p.playerList = this.TablePlayer;
        p.scoreList = scoreList;
        p.countDownTime = change.Time;
        p.gameVoteType = change.GameVoteType;
        p.statusList = null;

        this.ShowUi(UIName.ResumeGame, p);
    }
    /**
     * 续局时，服务端推送玩家续局投票状态
     * @param msg 
     */
    private HandleNet_MSG_S_PlayerGameVoteStatus(msg: GameIF.CustomMessage): void {
        const playerstatus = <QL_Common.MSG_S_PlayerGameVoteStatus>msg;
        let resumeNode = Global.Instance.UiManager.GetUINode(UIName.ResumeGame);
        if (resumeNode) {
            this.resumeGame = resumeNode.getComponent("ResumeGame");
            this.resumeGame.updatePlayerVoteStatus(playerstatus.PlayerId, playerstatus.status);
        } else {
            // this.scheduleOnce(function () { 
            // this.resumeGame = resumeNode.getComponent("ResumeGame");
            // this.resumeGame.updatePlayerVoteStatus(playerstatus.PlayerId,playerstatus.status);
            //  }.bind(this), 1)

        }
    }
    /**
     * 续局完成
     * @param msg 
     */
    private HandleNet_MSG_S_EndGameVote(msg: GameIF.CustomMessage): void {
        const nextresult = <QL_Common.MSG_S_EndGameVote>msg;
        if (nextresult.status == QL_Common.GameVoteStatus.Denied) {
            let resumeNode = Global.Instance.UiManager.GetUINode(UIName.ResumeGame);
            if (resumeNode) {
                this.resumeGame = resumeNode.getComponent("ResumeGame");
                this.resumeGame.CloseUiContinue();
                this.OnRefuseNextGame();
            }
        } else {
            let resumeNode = Global.Instance.UiManager.GetUINode(UIName.ResumeGame);
            if (resumeNode) {
                this.resumeGame = resumeNode.getComponent("ResumeGame");
                this.resumeGame.CloseUiContinue();
                this.OnAgreeNextGame();
            }
        }

    }
    private refuseNext() {
        // SendMessage.Instance.GameVoteStatus(QL_Common.GameVoteStatus.Denied);
    }
    private agreeNext() {
        // SendMessage.Instance.GameVoteStatus(QL_Common.GameVoteStatus.Agree);
    }
    private HandleNet_MSG_S_PlayerNewChairInfo(msg: GameIF.CustomMessage): void {
        const change = <QL_Common.MSG_S_PlayerNewChairInfo>msg;

        //通知子类
        this.OnBeforeNewChairInfo(change.oldChairId, change.chairID);

        //交换信息
        const a = this.TablePlayer[change.oldChairId];
        this.TablePlayer[change.oldChairId] = this.TablePlayer[change.chairID];
        this.TablePlayer[change.chairID] = a;


        if (change.oldChairId === this._chairID) { //如果旧椅子号是自己，变更椅子号
            this._chairID = change.chairID;
        } else if (change.chairID === this._chairID) { //如果新椅子号是自己，变更椅子号
            this._chairID = change.oldChairId;
        }
        if (this._isInit) {
            //通知子类
            this.OnAfterNewChairInfo(change.oldChairId, change.chairID);
        }

    }


    // ================================ 开始重写 ================================
    public abstract GetGameID(): number;

    public abstract OnGameMessage(cm: GameIF.CustomMessage): boolean;
    /**
     * 销毁游戏
     */
    protected abstract DestryGameClass(): boolean;

    /**
     * 初始化游戏 有参数 用于初始化，只会被调用一次
     */
    protected abstract OnInitClass(): void;
    /**
     * 是否可以续局
     */
    protected abstract CheckCanNext(): boolean;
    /**
     * 初始化游戏 有参数 用于初始化，每次游戏中断线重连都会被调用
     */
    protected ReInitClass(): void {

    }

    protected ExitGameTips(): string {
        return "你参加的游戏已经结束";
    }

    /**
     * 每次调用OnInitClass之前，会调用OnResetGameClass
     * @returns {} 
     */
    protected OnResetGameClass(): void {

    }

    public GetChatMsg(): string[] {
        return [""];
    }
    /**
     * 续剧结果同意
     */
    protected OnAgreeNextGame(): void {

    }
    /**
     * 续局结果拒绝
     */
    protected OnRefuseNextGame(): void {

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

    }

    /**
     * 玩家坐下后告诉坐下的玩家,这个桌子上之前已经有哪些玩家了,这个函数需要同时处理玩家的状态显示
     * */
    protected OnTablePlayer(chairID: number, player: QL_Common.TablePlayer): void {

    }

    /**
     * 玩家状态发生改变,如新的玩家坐下后默认状态为SitDown,然后玩家准备,新状态就是Ready状态
     * */
    protected OnPlayerStatusChange(chairID: number, newStatus: QL_Common.GState): void {

    }

    /**
     * 玩家离开,玩家从这个桌子上离开,游戏需要将玩家的信息从指定位置清除
     * */
    protected OnPlayerLeave(chairID: number): void {

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
    }

    /**
     * 玩家聊天
     * */
    protected OnPlayerChatIndex(chairID: number, player: QL_Common.TablePlayer, idx: number): void {

    }

    /**
     * 玩家聊天
     * */
    protected OnPlayerChatEmoji(chairID: number, player: QL_Common.TablePlayer, clip: cc.AnimationClip): void {

    }

    /**
     * 玩家道具
     * */
    protected OnPlayerChatItem(self_chairID: number, chairID: number, player: QL_Common.TablePlayer, index: string): void {

    }


    /**
     * 游戏场景
     * */
    protected OnGameScene(status: number): void {

    }

    /**
     * 玩家余额发生改变
     * */
    protected OnPlayerScoreChange(): void {

    }

    /**
     * 准备倒计时通知
     * @param timeTick 
     * @returns {} 
     */
    protected OnPlayerReadyTimer(timeTick: number): void {

    }

    /**
     * 一个玩家语音开始播放
     * @param chairID 
     * @returns {} 
     */
    protected OnPlayerVoiceStart(chairID: number) {

    }

    /**
     * 语音播放结束
     * @param chairID 
     * @returns {} 
     */
    protected OnPlayerVoiceEnd(chairID: number) {

    }

    /**
     * 当聊天框被隐藏
     * @returns {} 
     */
    protected OnChaatFormHide() {

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
     * 当程序从后台返回，网络状态有响应时
     */
    protected OnNetResponding() {

    }

    /**
     * 当玩家点击微信分享，但是并没有安装微信时候调用
     * @return 如果处理了这个事件返回true,否则返回false
     */
    protected OnNoInstallWx(): boolean {
        return false;
    }

    /**
     * 请求换座位
     * @param otherChairID 请求者椅子号
     * @param myChairID 自己的椅子号
     * @param mark 提示
     */
    protected OnRequestChangeChairId(otherChairID: number, myChairID: number, mark: string): void {

    }

    /**
     * 在更换两个玩家座位之前调用，此时房间内的玩家列表信息尚未发生变化
     * @param oldChairID
     * @param newChairID
     */
    protected OnBeforeNewChairInfo(oldChairID: number, newChairID: number) {

    }

    /**
     * 在更换两个玩家座位之后调用
     * @param oldChairID
     * @param newChairID
     */
    protected OnAfterNewChairInfo(oldChairID: number, newChairID: number) {

    }

    protected OnKeyPressed(key: cc.KEY) {
        return false;
    }

    protected OnRecordTimeout() {

    }


    // ================================ 重写结束 ================================

    public SendGameData(data: GameIF.CustomMessage) {
        if (!data) return;
        Global.Instance.Socket.SendData(data);
    }

    protected OnSceneEvent(eventCode: number, value: any): boolean {
        switch (eventCode) {
            case EventCode.ErrorCode:
                return this.ErrorCode(value);
            case EventCode.InitGameScene:
                this.InitGameScene(value);
                Global.Instance.UiManager.CloseLoading();
                return true;
            case EventCode.onKeyPressed:
                if (this._isInit) {
                    return this.onKeyPressed(value);
                } else {
                    return false;
                }
            case EventCode.LoginSuccess:
                this.LoginSuccess();
                return true;
            case EventCode.OfflineRoom:
                this.OfflineRoom();
                return true;
            case EventCode.CreateGameScene:
                this.CreateGameScene();
                return true;
            case EventCode.onRecorderPlay:
                if (this._isInit) {
                    this.OnPlayerVoiceStart(value);
                }
                return true;
            case EventCode.onRecorderEnd:
                if (this._isInit) {
                    this.OnPlayerVoiceEnd(value);
                }
                return true;
            case EventCode.LatestBalance:
                if (this._isInit) {
                    this.OnPlayerScoreChange();
                }
                return true;
            case EventCode.RecordTimeout:
                if (this._isInit) {
                    this.OnRecordTimeout();
                }
                break;
            default: {
                return super.OnSceneEvent(eventCode, value);
            }
        }
        return true;
    }



    private ErrorCode(value) {
        const code: QL_Common.SystemErrorCode = value[0];
        // if (code === QL_Common.SystemErrorCode.ExitRoomFail) {
        //     this.ChangeScene("Hall");
        //     return true;
        // }
        return false;
    }
    private onKeyPressed(value: cc.KEY) {
        return this.OnKeyPressed(value);
    }
    private LoginSuccess() {
        SendMessage.Instance.QueryOfflineRoom();
    }
    private OfflineRoom() {
        if (this.DataCache.OfflineRoom) {
            Global.Instance.GameHost.EnterRoom(this.DataCache.OfflineRoom.ID, QL_Common.EnterRoomMethod.RoomID);
        } else {
            const str = this.ExitGameTips();
            if (str && str.length > 0) {
                this.UiManager.ShowMsgBox(str);
            }
            this.ChangeScene("Hall");
        }
    }
    private CreateGameScene() {
        Global.Instance.GameHost.OnGameSceneComplete();
    }

    private InitGameScene(param: InitGameParam) {

        this._chairID = param.ChairID;
        this._tableID = param.TableID;
        this._gameStatus = param.GameStatus;
        this._gameInfo = param.GameInfo;
        this._roomInfo = param.RoomClient;
        this._gameRule = param.GameRule;



        if (!this._isInit) {
            //在首次init的时候设置null
            for (let i = 0; i < param.RoomClient.MaxCount; i++) {
                this.TablePlayer[i] = null;
            }
            if (Debug()) {
                this.OnInitClass();
            } else {
                try {
                    this.OnInitClass();
                } catch (e) {
                    cc.error("游戏场景出现异常");
                    if (cc.sys.isBrowser) {
                        cc.error(e);
                    }
                    ReportError(`OnInitClass出现异常` + " err.msg=" + e.message);
                }
            }
        } else {
            if (Debug()) {
                this.ReInitClass();
            } else {
                try {
                    this.ReInitClass();
                } catch (e) {
                    cc.error("游戏场景出现异常");
                    if (cc.sys.isBrowser) {
                        cc.error(e);
                    }
                    ReportError(`ReInitClass出现异常` + " err.msg=" + e.message);
                }
            }
        }
        this._isInit = true;

        const player = new QL_Common.TablePlayer();
        player.NickName = this.UserInfo.userData.NickName;//昵称
        player.PlayerID = this.UserInfo.userData.UserID;//id
        player.UserIP = this.UserInfo.userData.UserIP;//ip
        player.Gender = this.UserInfo.userData.Gender;//性别
        player.FaceID = this.UserInfo.userData.Header;//头像
        player.PlayerState = param.IsOffLine ? QL_Common.GState.Gaming : QL_Common.GState.SitDown;//设置玩家状态
        player.CAttachData = this.UserInfo.userData.CAttachData;//附加参数
        this.TablePlayer[this._chairID] = player;
        this.OnTablePlayer(this._chairID, player);
        if (cc.isValid(this._mapsForm)) {
            this._mapsForm.SetPlayer(0, player, null, 0);
        }

    }

}