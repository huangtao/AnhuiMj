import Global from "../Global/Global";
import { CallUMengParam } from "../CustomType/CallUMengParam";
import { UploadInfo, Voice, Header } from "../CustomType/UploadInfo";
import ConfigData from "../Global/ConfigData";
import { Action } from "../CustomType/Action";
import { BuglyUserData } from "../CustomType/BuglyUserData";
export class NativeCtrl {

    public static HideSplash() {
        //android环境下才需要隐藏Splash
        if (cc.sys.platform !== cc.sys.ANDROID) return;
        return NativeCtrl.CallNative("HideSplash", "", false);
    }

    public static Update() {
        return NativeCtrl.CallNative("Update", "", false);
    }
    /**
     * 拉起微信登录
     */
    public static WxLogin(): string {
        return NativeCtrl.CallNative("WxLogin", "开始微信登录");
    }
    public static WxAppPay(param: string): string {
        return NativeCtrl.CallNative("WxAppPay", param);
    }
    /**
     * 分享
     * @param param
     */
    public static WxShare(param: string) {
        return NativeCtrl.CallNative("WxShare", param);
    }
    /**
     * 截图分享
     * @param param
     */
    public static Screenshot(param: string) {
        return NativeCtrl.CallNative("Screenshot", param);
    }
    /**
     * 开始录音
     */
    public static StartRecord() {
        NativeCtrl.CallNative("StartRecord");
    }
    /**
     * 错误信息上报
     */
    public static ReportError(error: any) {

    }
    /**
     * 停止录音
     */
    public static StopRecord(isValid: boolean) {
        const key = Global.Instance.DataCache.UploadInfos.GetUploadInfo(Voice);
        if (!key) {
            Global.Instance.UiManager.ShowTip("录音上传失败，请重启应用！");
            //return;
        }
        key["isValid"] = isValid;
        let param = "";
        try {
            param = JSON.stringify(key);
        } catch (e) {

        }
        NativeCtrl.CallNative("StopRecord", param);
    }
    /**
     * 下载并播放
     * @param id 
     */
    public static PlayRecorder(id: string) {
        NativeCtrl.CallNative("PlayRecorder", id);
    }
    public static GetNativeConfig(): string {
        return NativeCtrl.CallNative("GetNativeConfig");
    }
    public static InitRecorder(openid: string): string {
        return NativeCtrl.CallNative("InitRecorder", openid);
    }
    public static CallUMeng(data: CallUMengParam): string {
        if (!data) return;
        return NativeCtrl.CallNative("CallUMeng", JSON.stringify(data));
    }
    public static GetOpenUri(type: string): string {
        return NativeCtrl.CallNative("GetOpenUri", type);
    }
    public static GetGpsJson(): string {
        return NativeCtrl.CallNative("getGpsJson");
    }
    public static CallApplePay(str: string): string {
        return NativeCtrl.CallNative("callApplePay", str);
    }
    public static PostUploadFile(value: UploadInfo): string {
        let result = NativeCtrl.CallNative("PostUploadFile", JSON.stringify(value));
        if (result != "success") {
            Global.Instance.ActionManager.RunCallback(value.callBack, "fail");
        }

        return result;
    }
    /**
     * 调用系统剪切板功能
     * @param 剪切内容 
     */
    public static CopyToClipboard(content: string): string {
        let msg = NativeCtrl.CallNative("CopyToClipboard", content);
        if (msg == "success") {
            Global.Instance.UiManager.ShowTip(`已复制到系统剪贴板`);
        }
        return msg;
    }
    /**
     * 检查指定的应用是否已经安装
     * @param value 
     */
    public static CheckHasApp(value: string): boolean {
        let msg = NativeCtrl.CallNative("CheckHasApp", value);
        return msg == "success";
    }
    /**
     * 检查指定的应用是否已经安装
     * @param value 
     */
    public static SetBuglyUserData(value: BuglyUserData): boolean {
        if(!cc.isValid(value))return;
        let msg = NativeCtrl.CallNative("SetBuglyUserData", JSON.stringify(value));
        return msg == "success";
    }
    /**
     * 通过js来调用native的静态方法
     * @param method
     * @param value 
     */
    private static CallNative(method: string, value: string = "无参数", showlog: boolean = true): string {
        if (showlog) {
            cc.log(`Js_To_Native========>method:${method};value:${value};`);
            if (!cc.sys.isNative || !cc.sys.isMobile) {
                cc.warn("请在移动设备中使用 Native功能");
                return "fail";
            }
        }

        let result: string;
        switch (cc.sys.platform) {
            case cc.sys.ANDROID: {
                result = jsb.reflection.callStaticMethod("com/qileah/games/NativeJavaClass", "InfoFromJs", "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", method, value);
                break;
            }
            case cc.sys.IPHONE:
            case cc.sys.IPAD: {
                result = jsb.reflection.callStaticMethod("NativeOcClass", "InfoFromJs:value:", method, value);
                break;
            }
            default: {
                if (showlog) {
                    cc.warn("只支持iPhone、Adnroid、iPad设备");
                }
                result = "fail";
                break;
            }
        }

        return result;
    }
}

