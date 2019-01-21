import UIBase from "../Base/UIBase";
import { ActionNet } from "../../CustomType/Action";
import { WebRequest } from "../../Net/Open8hb";
import EmailItemPanel from "./EmailItemPanel";

const {ccclass, property} = cc._decorator;

/**
 * 邮件消息
 * author:Cyq
 */
@ccclass
export default class EmailPanel extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.Prefab)
    private EmailItemPer : cc.Prefab = null;

    @property(cc.Node)
    private EmailItemContent : cc.Node = null;

    private EmailList = null;

    /**
     * 没有邮件提示文字
     */
    @property(cc.Label)
    lab_tip: cc.Label = null;

    InitShow() {
        if(this.EmailList == null){
            this.UiManager.ShowLoading("正在获取邮件列表");
            const data = WebRequest.DefaultData();
            data.Add("count", 10);
            const action = new ActionNet(this, this.success, this.error);
            WebRequest.email.EmailList(action, data);
        }
    }

    /**
     * 获取消息列表后回调
     */
    private success(json){
        this.UiManager.CloseLoading();

        if (json.data.length == 0 || json == null || json.data == null) {
            this.lab_tip.node.active = true;
            return;
        }else{
            this.lab_tip.node.active = false;
        }
        
        this.EmailList = json.data;

        for (let index = 0; index < this.EmailList.length; index++) {
            let email_item = cc.instantiate(this.EmailItemPer);
            let EmailItemPanel:EmailItemPanel = email_item.getComponent("EmailItemPanel");
            if(cc.isValid(EmailItemPanel)){
                EmailItemPanel.InitData(this.EmailList[index]);
            }

            this.EmailItemContent.addChild(email_item);
        }
    }

    /**
     * 获取消息失败
     */
    private error(){
        this.UiManager.CloseLoading();
        this.UiManager.ShowTip("获取邮件失败，请检查网络连接或重新登录");
    }
}
