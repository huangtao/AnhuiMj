
import SendMessage from "../Global/SendMessage";
import Global from "../Global/Global";
import { EventCode } from "../Global/EventCode";
import { NativeCtrl } from "../Native/NativeCtrl";
import ConfigData from "../Global/ConfigData";
import { Debug } from "../Tools/Function";

//心跳包间隔
const interval = 3000;

const delay = 1500;

const update = 500;


export class HeartMessageManager {

    get enHeart(): boolean {
        if (Debug()) {
            return true;
        }
        return true;
    }

    public constructor() {
        if (!this.enHeart) return;

        this.StartUpdate();
        cc.game.on(cc.game.EVENT_SHOW, this.CheckConnet.bind(this));
    }

    private _timeout: NodeJS.Timeout = null;
    private _timeInterval: NodeJS.Timeout = null;

    private StartUpdate() { 

        let i = parseInt(ConfigData.SiteConfig.AttachParam2);
        if (isNaN(i)) {
            i = update;
        }
        // var interval = setInterval(function () {
        //     const result = NativeCtrl.Update();
        //     if (result === "fail") {
        //         cc.log("清除update" + interval);
        //         clearInterval(interval)
        //     }
        // }, i);
    }

    /**
     * 检查一下网络连接情况
     */
    public CheckConnet() {
        if (!this.enHeart) return;

        if (this._timeInterval != null) {
            cc.log("后台返回，检查一下网络连接情况");
            this.onSendMessage();
        } else {
            cc.log("等待服务器响应中，不检查网络连接")
        }
    }


    /**
     * 当网络有响应时候调用
     */
    public OnHeartMessage() {
        if (!this.enHeart) return;

        if (this._timeout != null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
    }

    public StartHeart() {
        if (!this.enHeart) return;

        if (this._timeInterval === null) {
            this._timeInterval = setInterval(this.onSendMessage.bind(this), interval);
        }
    }

    public Stop() {
        if (!this.enHeart) return;

        clearInterval(this._timeInterval);
        this._timeInterval = null;
        this._timeout = null;
    }

    private onSendMessage() {
        if (this._timeout == null) {
            SendMessage.Instance.HeartBeatMessage();
            this._timeout = setTimeout(this.onTimeout.bind(this), delay);
        }
    }

    private onTimeout() {

        cc.log("网络连接已经超时");
        this.Stop();
        Global.Instance.EventManager.PostMessage(EventCode.onNetNoResponse);
    }


}