/*
 * @Author: 刘思宇 
 * @Date: 2017-12-04 13:55:39 
 * @Last Modified by: 刘思宇
 * @Last Modified time: 2018-01-24 12:32:58
 */
import Global from "../Global/Global";
import { EventCode } from "../Global/EventCode";
import SendMessage from "../Global/SendMessage";
import { ChatType } from "../CustomType/Enum";
import { ShareParamExpands } from "../CustomType/ShareParam";
import { ParseInviteUri, TryJSONParse, ParseInviteJson } from "../Tools/Function";
import { WebRequest } from "../Net/Open8hb";
import { ActionNet, Action } from "../CustomType/Action";
import { DateTime } from "../Serializer/DateTime";
import { DownloadFile } from "../Net/DownloadFile";
import { Voice } from "../CustomType/UploadInfo";
import { NativeCtrl } from "./NativeCtrl";
export class NativeCallBack {
    public static InfoToJs(method: string, value: string) {
        // if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.IPAD) {
        //     value = decodeURIComponent(value);
        // }
        switch (method) {
            case "OnWxCodeResp":
                this.OnWxCodeResp(value);
                return;
            case "onRecorderEnd":
                this.onRecorderEnd(value);
                return;
            case "onRecorderError":
                this.onRecorderError(value);
                return;
            case "onStartRecordError":
                this.onStartRecordError(value);
                return;
            case "onUpLoadSuccess":
                this.onUpLoadSuccess(value);
                return;
            case "onRecorderPlayEnd":
                this.onRecorderPlayEnd(value);
                return;
            case "OnWxMessageResp":
                this.OnWxMessageResp(value);
                return;
            case "OnNewUri":
                this.OnNewUri(value);
                return;
            case "onPaySuccess":
                this.onPaySuccess(value);
                return;
            case "onUploadPicSuccess":
                this.onUploadPicSuccess(value)
                return;
            case "ShowTip":
                this.ShowTip(value);
                return;
            case "ShowMsgBox":
                this.ShowMsgBox(value);
            case "onUploadFileCompleted":
                this.onUploadFileCompleted(value);
                return;
            default: {
                cc.warn("未处理的method" + method);
                return;
            }
        }

    }
    static onRecorderError(value: string): any {
        throw new Error("Method not implemented.");
    }


    private static OnWxCodeResp(str: string): void {
        try {
            this.EventManager.PostMessage(EventCode.OnWxCodeResp, str);
        } catch (e) {
        }

    }

    private static onRecorderEnd(str: string): void {
        const data = this.DataCache.UploadInfos.GetUploadInfo(Voice);
        if (!data) {
            return;
        }
        let o: any = {};
        o.Success = function (result) {
            let path = result.baseUrl + result.key;
            cc.log("录音上传成功 " + path);
            if (path && path.length > 0) {
                SendMessage.Instance.ChartMsg(ChatType.Record, path);
            }
        }
        let action = new ActionNet(o, o.Success);
        DownloadFile.UploadAliOssFile(str, data, action);
    }

    private static onStartRecordError(str) {
        this.ShowTip(str);
    }

    //录音成功
    private static onUpLoadSuccess(e: string) {
        cc.log("录音上传成功 url=" + e);
        if (e && e.length > 0) {
            SendMessage.Instance.ChartMsg(ChatType.Record, e);
        }
    }

    private static onRecorderPlayEnd(e: string) {
        //Global.Instance.AudioManager.OnRecordEnd();
    }
    private static OnWxMessageResp(e: string) {
        this.EventManager.PostMessage(EventCode.onWxMessageResp, e);
    }

    private static OnNewUri(e: string) {
        // 分享回调拉起APP回调参数
        let shareCallBackInfo = JSON.parse(e);
        cc.log('-- OnNewUri param',shareCallBackInfo);

        let param = null;
        switch (shareCallBackInfo.type) {
            case "XianliaoUrlScheme":
                param = ParseInviteJson(shareCallBackInfo.value);
                break;
            default:
                param = ParseInviteUri(shareCallBackInfo.value);
                break;
        }
        
        this.DataCache.ShareParam = param;
        this.EventManager.PostMessage(EventCode.onNewUri);
    }

    private static onPaySuccess(e: string) {
        try {
            const payinfo = JSON.parse(e);
            if (this.UserInfo.UserSessionKey.SessionKey && this.UserInfo.UserSessionKey.SessionKey.length > 0) {
                const data = WebRequest.DefaultData();
                data.Add("paytype", payinfo.paytype);
                data.Add("receipt_data", payinfo.receipt_data);
                // WebRequest.notice.ios_pay(null, data);
            }
        } catch (error) {

        }

    }

    private static onUploadPicSuccess(e: string) {
        e = e + "?" + (new Date().valueOf());
        const action = new ActionNet(this, () => {
            this.UiManager.ShowTip("修改头像成功");
            this.DataCache.UserInfo.userData.Header = e;
            //this.EventManager.PostMessage(EventCode.onPlayerInfoChange);
        }, () => {
            this.UiManager.ShowTip("修改头像失败");
        });
        cc.log("修改头像为" + e);
        // WebRequest.userinfo.set_userinfo(action, e, null, null);
    }

    private static get DataCache() {
        return Global.Instance.DataCache;
    }

    private static get UserInfo() {
        return this.DataCache.UserInfo;
    }

    private static get UiManager() {
        return Global.Instance.UiManager;
    }

    private static get EventManager() {
        return Global.Instance.EventManager;
    }

    private static ShowTip(value) {
        Global.Instance.UiManager.ShowTip(value);
    }

    private static ShowMsgBox(value) {
        Global.Instance.UiManager.ShowMsgBox(value);
    }
    private static onUploadFileCompleted(value) {
        cc.log(value);
        let obj = TryJSONParse(value);
        if (!obj) return;

        cc.log(JSON.stringify(obj));

        Global.Instance.ActionManager.RunCallback(obj.callBack, obj.response);

    }
}



cc["NativeCallBack"] = NativeCallBack;