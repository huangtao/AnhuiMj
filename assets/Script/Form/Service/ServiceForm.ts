import UIBase from "../Base/UIBase";
import UiManager from '../../Manager/UiManager';
import { NativeCtrl } from '../../Native/NativeCtrl';
import { ShareParam } from "../../CustomType/ShareParam";
import Global from "../../Global/Global";
const {ccclass, property} = cc._decorator;

@ccclass
export class ServiceForm extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.Button)
    CopyServiceWxNumber: cc.Button = null;

    @property(cc.Label)
    ServiceWxNumber: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    /**
     * Desc:点击复制按钮
     * author:Cyq
     * Date:18/09/03
     */
    private ClickCopyWxNumber(){
        let ServiceWxNumberText = this.ServiceWxNumber.string;
        if (ServiceWxNumberText.length > 0){
            let str = ServiceWxNumberText.substr(4, ServiceWxNumberText.length);/** 取得微信号 */
            NativeCtrl.CopyToClipboard(str);/** 调用copy方法 */

            // let shareParam = new ShareParam();
            // shareParam.WXScene = 0;
            // shareParam.text = str;
            // shareParam.shareType = "text";
            // Global.Instance.WxManager.Share(shareParam);

            cc.sys.openURL("weixin://")
        }else{
            this.UiManager.ShowTip("你要复制的文本为空");
        }
    }

    // update (dt) {}
}
