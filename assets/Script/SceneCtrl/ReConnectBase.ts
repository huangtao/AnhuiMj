import SuperClass from "./SuperClass";
import SendMessage from "../Global/SendMessage";
import { QL_Common } from "../CommonSrc/QL_Common";
import Global from "../Global/Global";
import { UIName } from "../Global/UIName";
import { EventType } from "../CustomType/EventMessage";
import { EventCode } from "../Global/EventCode";


const { ccclass, property, executionOrder } = cc._decorator;

@ccclass
@executionOrder(99)
export class ReConnectBase extends SuperClass {



    /**
     * 是否正在尝试重连
     */
    protected _onTryConnet: boolean = false;


    /**
     * 服务器连接已经准备完毕
     */
    OnServerReady(): void {
        cc.log(`服务器连接已经准备完毕,可以开始登陆`);
        cc.log(this.UserInfo.userData);
        if (this.UserInfo.userData) {
            // const account = this.UserInfo.userData.UserAccount;
            const logontoken = this.UserInfo.userData.UserLogonToken;
            if (logontoken) {
                SendMessage.Instance.LoginByAccount(QL_Common.LoginType.UserLogonToken, logontoken, "");
            }
        }
        this._onTryConnet = false;
    }
    OnNetClose(): void {
        cc.log("在已经登陆的状态下网络断开");
        this.UiManager.CloseLoading();
        if (this._onTryConnet) {
            const fun = () => {
                this.UiManager.CloseUi(UIName.FriendCircle);
                Global.ChangeScene("hotupdate");
            };
            this.UiManager.ShowMsgBox("您的网络不稳定，请检查网络连接是否正常！", this, fun, fun, fun);
        }
    }
    OnNetError(): void {
        cc.log("在已经登陆的状态下网络断开"); 
        this.UiManager.CloseLoading();
        if (this._onTryConnet) {
            const fun = () => {
                this.UiManager.CloseUi(UIName.FriendCircle);
                Global.ChangeScene("hotupdate");
            };
            this.UiManager.ShowMsgBox("您的网络不稳定，请检查网络连接是否正常！", this, fun, fun, fun);
        }
    }

    protected onNetNoResponse() {
        Global.Instance.Socket.Close();
        Global.Instance.UiManager.ShowLoading("您的网络不稳定，正在重连");
        Global.Instance.Socket.Connet();
        this._onTryConnet = true;
    }

    
    //可选重写
    protected OnSceneEvent(eventCode: number, value: any): boolean { 
        switch(eventCode){
            case  EventCode.onNetNoResponse:{
                this.onNetNoResponse();
                return true;
            }
        }
        return super.OnSceneEvent(eventCode,value);
    }
}