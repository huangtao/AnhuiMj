


import UIBase from "../Base/UIBase";
import { ShareParam, ShareParamExpands } from "../../CustomType/ShareParam";
import ConfigData from "../../Global/ConfigData";
import Global from "../../Global/Global";
import { EventCode } from "../../Global/EventCode";
import { WebRequest } from "../../Net/Open8hb";
import { ActionNet } from "../../CustomType/Action";
import { UIName } from "../../Global/UIName";
import { WxManager } from "../../Manager/WxManager";
import { NativeCallBack } from "../../Native/NativeCallBack";
import { DateTime } from "../../Serializer/DateTime";
import { LocalStorage } from "../../CustomType/LocalStorage";

const { ccclass, property } = cc._decorator;
@ccclass
export class ShareGiftForm extends UIBase<any>{
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    public ProType : string = "";
    public ProNum : number = 0;
    public ImgId : number = 0;
    // @property(cc.Label)
    // numtxt: cc.Label=null;

//     onLoad() {
//         super.onLoad();
//         this.numtxt.string = "×" + this.DataCache.SysConfig.GetValue("GiveMoneyMaxNum");
//     }


    public ShareClick() {
        const share = new ShareParam();
        share.WXScene = 1;
        share.title = "";
        share.text = "";
        share.shareType = "img";
        share.shareImg = ConfigData.SiteConfig.ShareGiftImg;
        share.thumb_size = 200;
        WxManager.ShareSceneType = "Hall";
        Global.Instance.WxManager.Share(share);
        // var searchPaths: Array<string> = jsb.fileUtils.getSearchPaths();
        // share.path = "";
        // share.shareType = "link";
        // share.title = ConfigData.SiteConfig.DefaultShareContext;
        // share.link = ConfigData.SiteConfig.DownloadUrl;
        // share.text = ConfigData.SiteConfig.DefaultShareContext;
        // share.shareImg = ConfigData.SiteConfig.DefaultShareImg;
        // share.link_param = new ShareParamExpands();
        // share.link_param.parent = this.UserInfo.userData.UserID + "";
        // this.UiManager.ShowUi(UIName.Share,share);
    }


    /**
 * 
 * @param eventCode 消息到达
 * @param value 
 */
    protected OnUiEventComeIn(eventCode: number, value: any): boolean {
        switch (eventCode) {
            case EventCode.onWxMessageResp:
                this.onWxMessageResp(value);
                return true;
        }
        return false;
    }

    private onWxMessageResp(value) {
        if (value !== "0") {
            this.UiManager.ShowTip("你取消了分享！")
            return;
        }
        
        if(WxManager.ShareSceneType == "Hall"){
            let nowDays = Math.floor(DateTime.Now.TimeStamp / 1000.0 / 24.0 / 3600.0);

            let ShareTime = LocalStorage.GetItem("ShareTime"); //用于弹出面板控制变量
            if (!ShareTime) { 
                LocalStorage.SetItem("ShareTime", nowDays.toString());
            } else {
                if (nowDays > parseInt(ShareTime)) {
                    LocalStorage.SetItem("ShareTime", nowDays.toString());
                }else{
                    this.UiManager.ShowTip("分享成功！");
                    return;
                }
            }

            const action = new ActionNet(this, this.success, this.error);
            WebRequest.share.share_success(action, "share_diamond");

        }else{
            this.UiManager.ShowTip("分享成功！");
        }
    }

    private success(obj) {
        this.UserInfo.IsShare = 0;
        this.CloseClick();

        try {
            if(obj.diamond > 0){
                this.ProType = "钻石";
                this.ProNum = obj.diamond;
            }else if(obj.gold > 0){
                this.ProType = "金币";
                this.ProNum = obj.gold;
            }else if(obj.qidou > 0){
                this.ProType = "七豆";
                this.ProNum = obj.qidou;
            }else{
                return;
            }

            Global.Instance.UiManager.ShowUi(UIName.ShopGiftPanel, this); //弹出奖励面板
            // this.UiManager.ShowTip("已赠送房卡×" + this.DataCache.SysConfig.GetValue("GiveMoneyMaxNum"));
        } catch (ex) {
            cc.error(ex);
        }

    }
    private error(str) {
        this.UiManager.ShowTip("赠送失败");
    }
}