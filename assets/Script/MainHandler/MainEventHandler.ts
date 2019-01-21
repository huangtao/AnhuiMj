import { IEventHandler } from "../Interface/IEventHandler";
import { EventCode } from "../Global/EventCode";
import Global from "../Global/Global";
import { QL_Common } from "../CommonSrc/QL_Common";
import { Debug } from "../Tools/Function";
import { LocalStorage } from "../CustomType/LocalStorage";

export class MainEventHandler implements IEventHandler {

    private get DataCache() {
        return Global.Instance.DataCache;
    }

    private get UiManager() {
        return Global.Instance.UiManager;
    }


    OnEventComeIn(eventCode: number, value: any): boolean {
        switch (eventCode) {
            case EventCode.OfflineRoom:
                this.OfflineRoom();
                return true;
            case EventCode.ErrorCode:
                this.ErrorCode(value[0], value[1])
                return true;
            case EventCode.onKeyPressed:
                this.OnKeyPressed(value);
                return true;
        }
        return false;
    }

    private OfflineRoom() {
        Global.Instance.GameHost.OfflineRoomInfo();
    }

    private ErrorCode(code: QL_Common.SystemErrorCode, msg: string) {
        if (Global.Instance.GameHost.onErrorCode(code, msg)) {
            return;
        }
        switch (code) {
            case QL_Common.SystemErrorCode.Success:
                return;
            case QL_Common.SystemErrorCode.RemoteLogin:
                //清除记住的密码
                // LocalStorage.LastUserLoginCache = '';
                Global.ChangeScene("hotupdate", function () {
                    this.UiManager.ShowMsgBox(msg);
                }.bind(this));
                return;
            case QL_Common.SystemErrorCode.LoginFail:
                this.UiManager.CloseLoading();
                //this.UiManager.ShowMsgBox(msg);
                Global.SocketHeart.Stop();
                Global.Instance.Socket.Close();
                Global.ChangeScene("hotupdate", function () {
                    //this.UiManager.ShowMsgBox(msg);
                }.bind(this));
                return;
            // case QL_Common.SystemErrorCode.e:
            //     cc.log("退出房间成功！")
            //     return;
            case QL_Common.SystemErrorCode.ExitRoomFail:
                cc.log("退出房间失败了");
                return;
            case QL_Common.SystemErrorCode.ServerMaintain: {
                if (msg.length > 0) {
                    this.UiManager.ShowMsgBox(msg)
                }
                this.UiManager.CloseLoading();
                return;
            }
            default:
                if (msg.length > 0) {
                    this.UiManager.ShowTip(msg);
                } else {
                    if (Debug()) {
                        this.UiManager.ShowTip("无内容的错误码，请检查！");
                    }
                }
                return;
        }


    }
    private OnKeyPressed(key: cc.KEY) {
        switch (key) {
            case cc.KEY.back:
            case cc.KEY.escape:
                this.UiManager.ShowMsgBox("是否退出游戏？", this, () => { cc.game.end(); });
                return;

        }
    }

}