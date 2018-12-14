
import { ISocketHandler } from "../Interface/ISocketHandler";
import { GameIF } from "../CommonSrc/GameIF";
import Global from '../Global/Global';
import { QL_Common } from "../CommonSrc/QL_Common";
import SendMessage from "../Global/SendMessage";
import { EventCode } from "../Global/EventCode";
import { NativeCtrl } from "../Native/NativeCtrl";
import ConfigData from "../Global/ConfigData";
import { onProfileSignIn2 } from "../CustomType/CallUMengParam";
import { SystmPushMessage } from "../CustomType/SystmPushMsg";
import { Tools } from "../Tools/SystemConfigReader";
import { UIName } from "../Global/UIName";
import UiManager from "../Manager/UiManager";
import HornGamePanel from "../Form/Horn/HornGamePanel";
import HornPanel from "../Form/Horn/HornPanel";
import { LocalStorage } from "../CustomType/LocalStorage";

/**
 * 主网络信息处理者
 */
export default class MainMessageHandler implements ISocketHandler {

    private get DataCache() {
        return Global.Instance.DataCache;
    }

    private get UserInfo() {
        return this.DataCache.UserInfo;
    }
    private get EventManager() {
        return Global.Instance.EventManager;
    }

    /**
     * 当网络连接
     */
    OnConnect(): void {
        Global.SocketHeart.StartHeart();
        const s = Global.Instance.NowScene;
        if (cc.isValid(s)) {
            s.OnConnect();
        }

    }

    OnServerReady(): void {
        const s = Global.Instance.NowScene;
        if (cc.isValid(s)) {
            s.OnServerReady();
        }
    }

    /**
     * 当网络断开
     */
    OnNetClose(): void {
        const s = Global.Instance.NowScene;
        Global.Instance.GameHost.UnLock();
        Global.SocketHeart.CheckConnet();
        if (cc.isValid(s)) {
            s.OnNetClose();
        }
    }

    /**
     * 当网络异常
     */
    OnNetError(): void {
        const s = Global.Instance.NowScene;
        Global.Instance.GameHost.UnLock();
        Global.SocketHeart.CheckConnet();
        if (cc.isValid(s)) {
            s.OnNetError();
        }
    }


    /**
     * 当网络消息到达
     * @param cm 
     */
    OnMessageIncome(cm: GameIF.CustomMessage): boolean {

        //如果是从游戏服务器发来的信息，交给游戏控制器处理
        if (cm.wMainCmdID === QL_Common.Main_CommonID.GS2C) {
            return Global.Instance.GameHost.OnMessageIncome(cm);

        }

        switch (cm.wMainCmdID << 8 | cm.wSubCmdID) {
            case QL_Common.Main_CommonID.LS2C << 8 | QL_Common.LS2C.MSG_S_LoginSuccess:
                this.ls2c_loginSuccess(cm);
                return true;
            case QL_Common.Main_CommonID.LS2C << 8 | QL_Common.LS2C.MSG_S_SysConfig:
                this.ls2c_sysConfig(cm);
                return true;
            case QL_Common.Main_CommonID.LS2C << 8 | QL_Common.LS2C.MSG_S_UserCreateTableNotice:
                this.ls2c_sysNotice(cm);
                return true;
            case QL_Common.Main_CommonID.LS2C << 8 | QL_Common.LS2C.MSG_S_UserSessionKey:
                this.MSG_S_UserSessionKey(cm);
                return true;
            case QL_Common.Main_CommonID.LS2C << 8 | QL_Common.LS2C.MSG_S_ErrorCode:
                this.ls2c_error(cm);
                return true;
            case QL_Common.Main_CommonID.LS2C << 8 | QL_Common.LS2C.MSG_S_PlayerLatestBalance:
                this.ls2c_playerLatestScore(cm);
                return true;
            case QL_Common.Main_CommonID.LS2C << 8 | QL_Common.LS2C.MSG_S_OfflineRoom:
                this.ls2c_offlineRoom(cm);
                return true;
            case QL_Common.Main_CommonID.LS2C << 8 | QL_Common.LS2C.MSG_S_UserCreateTableNotice:
                this.MSG_S_UserCreateTableNotice(cm);
                return true;
            case QL_Common.Main_CommonID.C2LS << 8 | QL_Common.C2LS.MSG_C_HeartBeatMessage:
                this.MSG_C_HeartBeatMessaeg(cm);
                return true;
            case QL_Common.Main_CommonID.LS2C << 8 | QL_Common.LS2C.MSG_S_GroupTableList:
                this.MSG_S_GroupTableList(cm);
                return true;
            case QL_Common.Main_CommonID.LS2C << 8 | QL_Common.LS2C.MSG_S_SingleTableInfo:
                this.MSG_S_SingleTableInfo(cm);
                return true;
            case QL_Common.Main_CommonID.LS2C << 8 | QL_Common.LS2C.MSG_S_SystmPushMsg:
                this.MSG_S_SystmPushMsg(cm);
                return true;
            case QL_Common.Main_CommonID.LS2C << 8 | QL_Common.LS2C.MSG_S_SystemHornMsg:
                this.MSG_S_SystemHornMsg(cm);
                return true;
            default: {
                const s = Global.Instance.NowScene;
                if (cc.isValid(s)) {
                    return s.OnMessageIncome(cm);
                }

                return false;
            }
        }
    }

    private MSG_S_SystmPushMsg(cm: GameIF.CustomMessage) {
        let e = cm as QL_Common.MSG_S_SystemPushMsg;
        if (!e) return;

        let arg = new SystmPushMessage();
        arg.EventCode = e.EventCode;
        arg.TargerUser = e.TargerUser;
        arg.EventData = Tools.SystemConfigReader.Parse(e.EventData);
        Global.Instance.SystmPushMsgHandler.OnSystmPushMsg(arg);

    }

    private MSG_S_SystemHornMsg(cm: GameIF.CustomMessage){
        const e = <QL_Common.MSG_S_SystemHornMsg>cm;
        if (!e) return;

        let entity = e.HornMsgList[e.HornMsgList.length - 1];
        if(!entity){
            return;
        }
        if(entity.HornType == QL_Common.SystemHornType.Hall){
            HornPanel.HornHallList = [];
            HornPanel.HornHallList[HornPanel.HornHallList.length] = entity;
            this.EventManager.PostMessage(EventCode.HornHallStart);
        }else{
            // Global.Instance.UiManager.ShowHorn(e.HornMsgList[e.HornMsgList.length - 1]);
        }
    }


    //登录成功的处理
    private ls2c_loginSuccess(cm: GameIF.CustomMessage) {
        const success = <QL_Common.MSG_S_LoginSuccess>cm;
        //记住密码 下次使用
        // cc.sys.localStorage.setItem("account", success.playerData.UserAccount);
        // cc.sys.localStorage.setItem("logontoken", success.playerData.UserLogonToken);
        LocalStorage.LastUserLoginCache = success.playerData.LogonCacheToken;
        this.DataCache.UserInfo.userData = success.playerData;
        this.EventManager.PostMessage(EventCode.LoginSuccess);
        this.DataCache.MyRoom.Clear();
        // Global.Instance.UiManager.DestroyUi(UIName.FriendCircle);
        //取消切换登录时的自动登录
        ConfigData.AutoLogin = false;

        let first = cc.sys.localStorage.getItem("firstuserid");
        if (!first) {
            first = ConfigData.RegionName + success.playerData.UserID;
            cc.sys.localStorage.setItem("firstuserid", first);
        }
        NativeCtrl.InitRecorder(first);

        const data = new onProfileSignIn2();
        data.ID = ConfigData.RegionName + this.UserInfo.userData.UserID;
        data.Provider = this.UserInfo.Provider;
        NativeCtrl.CallUMeng(data);
    }

    private ls2c_sysConfig(cm: GameIF.CustomMessage) {
        const config = <QL_Common.MSG_S_SysConfig>cm;
        for (let i = 0; i < config.sysConfigArray.length; i++) {
            const t = config.sysConfigArray[i];
            this.DataCache.SysConfig.AddOrUpdate(t.Key, t.Value);
        }
    }


    private ls2c_sysNotice(cm: GameIF.CustomMessage) {
        // const notice = <QL_Common.MSG_S_SysNotice>cm;
        // Global.Instance.UiManager.PlayHallRoolNotice(notice.notice);
        // return;
    }

    private MSG_S_UserSessionKey(cm: GameIF.CustomMessage) {
        const key = <QL_Common.MSG_S_UserSessionKey>cm;
        this.DataCache.UserInfo.UserSessionKey.SessionKey = key.SessionKey;
    }

    private ls2c_error(cm: GameIF.CustomMessage) {
        const e = <QL_Common.MSG_S_ErrorCode>cm;
        this.EventManager.PostMessageOneHandle(EventCode.ErrorCode, [e.errorCode, e.ErrorReason]);
    }

    private ls2c_playerLatestScore(cm: GameIF.CustomMessage) {
        const e = <QL_Common.MSG_S_PlayerLatestBalance>cm;
        for (let i = 0; i < e.MoneyBag.length; i++) {
            const t = e.MoneyBag[i];
            this.DataCache.UserProp.AddOrUpdate(t.MoneyType, t.MoneyNum);
        }
        this.EventManager.PostMessage(EventCode.LatestBalance);
    }

    private ls2c_offlineRoom(cm: GameIF.CustomMessage) {
        const e = <QL_Common.MSG_S_OfflineRoom>cm;
        this.DataCache.OfflineRoom = e.room;
        this.EventManager.PostMessageOneHandle(EventCode.OfflineRoom);
    }


    private MSG_S_UserCreateTableNotice(cm: GameIF.CustomMessage) {
        const n = <QL_Common.MSG_S_UserCreateTableNotice>cm;
        if (n.UserId !== this.DataCache.UserInfo.userData.UserID) return;
        this.DataCache.MyRoom.InfoChange(n.Status, n.TableInfo);
        this.EventManager.PostMessageOneHandle(EventCode.onMyRoomChange);
    }

    private MSG_C_HeartBeatMessaeg(cm: GameIF.CustomMessage) {
        if (Global.SocketHeart) {
            Global.SocketHeart.OnHeartMessage();
        }


    }
    private MSG_S_GroupTableList(cm: GameIF.CustomMessage) {
        this.EventManager.PostMessageOneHandle(EventCode.GroupTableList, cm);
    }
    private MSG_S_SingleTableInfo(cm: GameIF.CustomMessage) {
        Global.Instance.GameHost.OnQuerySingleTableInfo(cm);
    }

}