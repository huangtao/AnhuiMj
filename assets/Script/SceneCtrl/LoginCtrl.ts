
import Global from "../Global/Global";
import { GameIF } from "../CommonSrc/GameIF";
import SendMessage from "../Global/SendMessage";
import { QL_Common } from "../CommonSrc/QL_Common";
import { UIName } from "../Global/UIName";
import { EventCode } from "../Global/EventCode";
import ConfigData from "../Global/ConfigData";
import { WebRequest } from "../Net/Open8hb";
import { ActionNet } from "../CustomType/Action";
import { InitKeyListener, ParseInviteUri, CurrentPackageType, Debug } from "../Tools/Function";
import { GetConfigForm } from "../Form/Loading/GetConfigForm";
import { NativeCtrl } from "../Native/NativeCtrl";
import { ReConnectBase } from "./ReConnectBase";
import { PackageType } from "../CustomType/PackageType";
import VersionManager from "../Global/VersionManager";
import { LocalStorage } from "../CustomType/LocalStorage";
import { SafeWebRequest } from "../Net/SafeWebRequest";
import { SubscribeManager } from "../Manager/SubscribeManager";
// import { PackageType } from "../CustomType/PackageType";
const { ccclass, property } = cc._decorator;
class LoginStruct {
    public method: QL_Common.LoginType;
    public Account: string;
    public PassWord: string;
}

@ccclass
export default class LoginCtrl extends ReConnectBase {

    private _loginStruct: LoginStruct = new LoginStruct();

    @property(cc.Toggle)
    tgl_Protocol: cc.Toggle = null;

    @property(cc.Node)
    btn_account: cc.Node = null;

    @property(cc.Node)
    btn_onekey: cc.Node = null;

    @property([cc.Node])
    btn_testArray: cc.Node[] = [];

    @property(GetConfigForm)
    getConfigForm: GetConfigForm = null;

    @property(cc.Label)
    version: cc.Label = null;

    private str_account: string;
    private str_password: string;

    onLoad() {
        super.onLoad();
        Global.SceneName = "Login";
        this.UserInfo.userData = new QL_Common.Player();

        //动态更新版本号
        this.version.string = "v" + VersionManager.ClintVersion.toString();

        //开启物理引擎
        //cc.director.getPhysicsManager().enabled = true;

        // //开始加载分站配置
        // const action = new Action(this, this.onConfig);
        // this.getConfigForm.StartGetConfig(action); 
    }



    start() {
        super.start();

        
        if (!ConfigData.SystemInited) {
            InitKeyListener();
            ConfigData.SystemInited = true;
        }

        //设置不显示右下角FPS信息
        if (cc.director.isDisplayStats()) {
            cc.director.setDisplayStats(false);
        }
 
        this.str_password = LocalStorage.LastUserLoginCache; 

        // if (!cc.sys.isNative) return; 
        switch (CurrentPackageType()) {
            case PackageType.Debug:
                cc.log("测试服,不隐藏游客、账号按钮");
                return;
            case PackageType.Preview:
                cc.log("审核服,隐藏账号按钮");
                this.btn_account.active = false;
                this.hideTestButton();
                return;
            default:
                cc.log("正式服,隐藏游客、账号按钮");
                this.btn_account.active = false;
                this.btn_onekey.active = false;
                this.hideTestButton();
                // //尝试执行自动登录
                if (ConfigData.AutoLogin) {
                    if (!this.str_password || this.str_password.length === 0) {
                        //没有可用的自动登录参数
                        return;
                    }
                    this.AccountLogin();
                }
                return;
        }


    }

    onDestroy(): void {
        super.onDestroy();
        //停止物理引擎
        //this.unschedule(this.loadFlower);
    }

    // private loadFlower() {
    //     let node = GameCachePool.FlowerPool.get();
    //     if (!cc.isValid(node)) {
    //         if (!cc.isValid(this.flowerPrefab)) {
    //             return;
    //         }
    //         node = cc.instantiate(this.flowerPrefab);
    //     }
    //     const x = Math.random() * 1280;
    //     node.x = x
    //     node.y = 730;
    //     node.parent = cc.director.getScene();
    // }


    // onConfig() {
    //     this.getConfigForm.node.active = false;
    //     this.getConfigForm.node.removeFromParent();
    //     // this.getConfigForm.node.destroy();

    //     if (!cc.sys.isNative) {
    //         if(LinkActionProcesser.CkeckDoAction()){
    //             return;
    //         } 
    //     }
    //     if (IsTest()) {
    //         return;
    //     }
    //     //在非测试服的情况下、是app的情况下自动登录、
    //     if (this.str_account && this.str_account.length > 0 && this.str_password && ConfigData.AutoLogin) {
    //         this.AccountLogin();
    //         return;
    //     }
    //     //如果没有自动登录，判断是否是审核服
    //     if (ConfigData.RegionName === "review" && ConfigData.AutoLogin) {
    //         this.OneKeyLogin();
    //         return;
    //     }
    // }


    OnConnect(): void {

    }
    OnServerReady(): void {
        this.UiManager.LoadingInfo("正在登陆中");
        SendMessage.Instance.LoginByAccount(this._loginStruct.method, this._loginStruct.PassWord, this._loginStruct.Account);
    }

    OnNetClose(): void {
        this.UiManager.CloseLoading();
        this.UiManager.ShowMsgBox("您的网络不稳定，请检查网络连接是否正常！");
    }

    OnNetError(): void {
        this.UiManager.CloseLoading();
        this.UiManager.ShowMsgBox("您的网络不稳定，请检查网络连接是否正常！");
    }
    UrlClick() {

        throw new Error("this is a custom error info,test by Liu.sy");

        // var desKey = DESEncryptHelper.getRandomStr(16);

        // var actionNet = new ActionNet(this,function(obj){
        //     cc.log(obj)
        // }); 

        // var data = WebRequest.DefaultData(false,desKey);
        // data.Add("agent_path","ceshi");
        // WebRequest.system.getagentconfig(actionNet,data,"POST",desKey);


    }
    public ProtocolClick() {
        this.ShowUi(UIName.Protocol);
    }

    public ShowLoginForm() {
        this.AccountLogin();
    }

    public OnLoginClick(e, type: string) {
        if (!this.tgl_Protocol.isChecked) {
            cc.warn("请先同意用户协议");
            Global.Instance.UiManager.ShowTip("您未同意用户使用协议，请勾选");
            return;
        }
        switch (type) {
            case "wx": {
                this.WxLogin();
                break;
            }
            case "onekey": {
                this.OneKeyLogin();
                break;
            }
            case "account": {
                this.AccountLogin();
                break;
            }
            default: {
                cc.warn("无效的登录方式");
                return;
            }
        }
    }

    private WxLogin() {
        this._loginStruct.method = QL_Common.LoginType.UserLogonToken;
        if (Debug() || cc.sys.isBrowser) {
            if (Debug()) {
                this.TestReleaseLogin();
                return;
            }
            if (typeof getUrlQueryData !== 'undefined') {
                this._loginStruct.PassWord = getUrlQueryData().accesstoken;
                this.startLogin();
            } else {
                this.UiManager.ShowTip("无微信参数，无法登陆");
            }
            return;
        }

        Global.Instance.WxManager.Login();
    }

    private OneKeyLogin() {
        this._loginStruct.method = QL_Common.LoginType.Onekey;
        this.startLogin();
    }
    private TestReleaseLogin() {

        this._loginStruct.Account = this.str_account;
        this._loginStruct.PassWord = this.str_password;

        if (!this.str_password || this.str_password.length === 0) {
            this.OneKeyLogin();
            return;
        }
        
        LocalStorage.LastUserLoginCache = '';
        this.AccountLogin();
    }

    private AccountLogin() {

        if (!this.str_password || this.str_password.length === 0) {
            this.UiManager.ShowTip("请输入密码");
            return;
        }
        
        //构建账号登录网站接口信息缓存
        let data = WebRequest.DefaultData(false);


        let region = ConfigData.RegionName;
        let device_type = 2;
        if (cc.sys.platform == cc.sys.ANDROID) {
            device_type = 1;
        }

        data.AddOrUpdate("cacheToken", this.str_password);
        data.Add("parent", ConfigData.SiteConfig.SiteManagerID);
        data.AddOrUpdate("region", region);
        if (!cc.sys.isNative) {
            device_type = -1;
            data.AddOrUpdate("device_type", device_type);
        }
        else {
            data.AddOrUpdate("js_version", LocalStorage.LocalHotVersion);
            data.AddOrUpdate("device_type", device_type);
        }
 
        let action = new ActionNet(this, this.OnSuccess, this.OnError);
        SafeWebRequest.GameHall.LoginCacheApp(action, data);


        // this.startLogin();
    }
    private startLogin() {
        Global.Instance.UiManager.ShowLoading("正在连接服务器");
        this.scheduleOnce(() => { Global.Instance.Socket.Connet(); }, 0.5);
    }

    private OnSuccess(back) {
        this._loginStruct.method = QL_Common.LoginType.UserLogonToken;
        this._loginStruct.PassWord = back.accesstoken;
        this.startLogin();
    }

    private OnError(obj) {
        cc.log(obj);
        //this.UiManager.ShowTip("登录异常，请联系客服");
    }

    /**
     * 网络消息到达
     * @param cm 
     */
    protected OnSceneMessage(cm: GameIF.CustomMessage): boolean {
        switch (cm.wMainCmdID << 8 | cm.wSubCmdID) {
            case QL_Common.Main_CommonID.LS2C << 8 | QL_Common.LS2C.MSG_S_GameList:
                this.HandlerNet_ls2c_gameInfo(cm);
                return true;
            case QL_Common.Main_CommonID.LS2C << 8 | QL_Common.LS2C.MSG_S_RoomList:
                this.HandlerNet_ls2c_roomInfo(cm);
                return true;
        }
        return false;
    }

    private HandlerNet_ls2c_gameInfo(cm: GameIF.CustomMessage) {
        const game_msg = <QL_Common.MSG_S_GameList>cm;
        if (game_msg == null) return;
        if (game_msg.gameList.length === 0) {
            Global.Instance.UiManager.ShowMsgBox("游戏尚未开放，请关注官网！");
            return;
        }

        const gameids = new Array<number>();
        const gameList = new Array<QL_Common.GameInfo>();
        for (let i = 0; i < game_msg.gameList.length; i++) {
            const game = game_msg.gameList[i];
            //如果游戏隐藏 不取列表
            if (game.GameStatus === QL_Common.GameState.Hide) continue;
            //游戏显示
            gameList.push(game);
            //如果游戏显示但不准进入
            if (game.GameStatus === QL_Common.GameState.ShowCannotJoin) continue;
            //
            gameids.push(game.GameID);
        }
        this.DataCache.GameList.GameInfos = gameList;

        if (gameids.length === 0) {
            Global.Instance.UiManager.ShowMsgBox("游戏尚未开放，请关注官网！");
            return;
        }
        Global.Instance.UiManager.LoadingInfo("正在获取游戏房间数据");
        SendMessage.Instance.QueryRoomByGameIDAyyay(gameids);
    }

    /**
     * 
     * @param cm 
     */
    private HandlerNet_ls2c_roomInfo(cm: GameIF.CustomMessage) {
        const rooms = <QL_Common.MSG_S_RoomList>cm;
        if (rooms == null) return;
        if (rooms.roomList.length === 0) {
            Global.Instance.UiManager.ShowMsgBox("游戏尚未开放，请关注官网！");
            return;
        }
        Global.Instance.UiManager.LoadingInfo("正在进入大厅");
        this.DataCache.RoomList.RoomInfos = rooms.roomList;
        SendMessage.Instance.QueryOfflineRoom();
    }


    /**
     * 
     * @param eventCode 游戏内自定义消息到达
     * @param value 
     */
    protected OnSceneEvent(eventCode: number, value: any): boolean {
        switch (eventCode) {
            case EventCode.LoginSuccess:
                this.OnLoginSuccess();
                return true;
            case EventCode.LatestBalance:
                this.OnLatestBalance();
                return true;
            case EventCode.CreateGameScene:
                this.OfflineEnterRoomSuccess(value);
                return true;
            case EventCode.OnWxCodeResp:
                this.OnWxCodeResp(value);
                return true;
            case EventCode.OfflineRoom:
                this.OfflineRoom();
                return true;
            case EventCode.MobileLoginSuccess:
                this.OnSuccess(value);
        }
        return false;
    }

    private OnLoginSuccess() {
        Global.Instance.UiManager.LoadingInfo("正在获取玩家余额");
        SubscribeManager.Instance.restoreSubscribeChannel();
        SendMessage.Instance.QueryUserProp([QL_Common.CurrencyType.Gold, QL_Common.CurrencyType.Diamond]);
    }

    private OnLatestBalance() {
        if (ConfigData.GameList[0] === 1) {
            SendMessage.Instance.QueryGame();
        } else {
            SendMessage.Instance.QueryGameByIDArray(ConfigData.GameList);
        }

        Global.Instance.UiManager.LoadingInfo("正在获取游戏数据");
    }

    private OfflineEnterRoomSuccess(room: QL_Common.RoomClient) {
        const game = this.DataCache.GameList.GetGame(room.GameID);
        if (game) {
            this.ChangeScene(game.ModuleName, () => {
                Global.Instance.UiManager.CloseLoading();
                Global.Instance.GameHost.OnGameSceneComplete()
            });
        } else {
            cc.warn("不存在游戏" + room.GameID);
        }
    }

    private OnWxCodeResp(str: string) {
        try {
            const obj = JSON.parse(str);
            if (obj.status === "showtip") {
                this.UiManager.ShowTip(obj.msg);
                return;
            }
            if (!obj.status || obj.status === "success") {
                const data = WebRequest.DefaultData(false);


                let region = ConfigData.RegionName;
                let device_type = 2;
                if (cc.sys.platform == cc.sys.ANDROID) {
                    device_type = 1;
                }
                data.Add("parent", ConfigData.SiteConfig.SiteManagerID);
                data.Add("code", obj.code);
                data.Add("type", obj.type);
                data.Add("appId", obj.wx_appid);
                data.AddOrUpdate("region", region);
                data.AddOrUpdate("device_type", device_type);
                data.AddOrUpdate("js_version", LocalStorage.LocalHotVersion);
                const action = new ActionNet(this, this.OnSuccess, this.OnError);
                WebRequest.userlogon.wx_app(action, data);
            }
        } catch (ex) {

        }

    }

    private OfflineRoom() {
        //断线重连的第一步也是进入房间，如果玩家选择进入房间，也可以
        const offline = this.DataCache.OfflineRoom;

        //如果没有断线重连信息，直接开始正常的配桌流程
        if (offline == null) {
            this.noOffline();
            return;
        }
        
        //如果包括了这个游戏，则直接创建游戏
        if (this.DataCache.GameList.Contains(this.DataCache.OfflineRoom.GameID)) {
            Global.Instance.UiManager.ShowLoading(`正在为你恢复游戏`);
            Global.Instance.GameHost.EnterRoom(offline.ID, QL_Common.EnterRoomMethod.RoomID);
            // this.UiManager.ShowMsgBox(`你参加的${this.DataCache.OfflineRoom.Name}游戏尚未结束，是否断线重连？`, this, reconnet, noreconnet, noreconnet);
        } else {
            this.UiManager.ShowTip(`您在${this.DataCache.OfflineRoom.Name}中的游戏还未结束，请在结束后再进入`);
        }
    }


    private noOffline() {
        const openuri = NativeCtrl.GetOpenUri('');
        const data = ParseInviteUri(openuri);
        const tableid = parseInt(data.tableid);
        if (isNaN(tableid)) {
            cc.log("邀请的tableid不是数字");
            this.ChangeScene("Hall");
            return;
        }
        if (tableid == QL_Common.InvalidValue.InvalidTableID) {
            cc.log("邀请的tableid不是有效的桌号");
            this.ChangeScene("Hall");
            return;
        }
        Global.Instance.GameHost.EnterRoom(tableid, QL_Common.EnterRoomMethod.TableID);
    }

    private ChangeScene(scenes: string, fun?: Function) {
        //this.unschedule(this.loadFlower);
        //clearInterval(this._flowerTick);
        cc.log("清除花瓣倒计时，切换场景到" + scenes);
        Global.ChangeScene(scenes, fun);

    }
    private hideTestButton() {
        if (!this.btn_testArray || this.btn_testArray.length <= 0) return;

        for (let node of this.btn_testArray) {
            if (!cc.isValid(node)) continue;
            node.active = false;
        }
    }

    OnShowUrl() {
        this.ShowUi(UIName.WebForm, "https://cli.im/DAtewT?iframe=1");
    }

    private ClickPhoneLogin() {
        this.ShowUi(UIName.PhoneLoginPanel);
    }
}

