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

    /**
     * 没有邮件提示文字
     */
    @property(cc.Label)
    lab_tip: cc.Label = null;

    onLoad () {
        this.UiManager.ShowLoading("正在获取邮件列表");
        const data = WebRequest.DefaultData();
        data.Add("count", 10);
        const action = new ActionNet(this, this.success, this.error);
        WebRequest.email.EmailList(action, data);
    }

    public InitShow() {
        if (cc.isValid(this.lab_tip)) {
            this.lab_tip.node.active = false;
        }
    }

    /**
     * 获取消息列表后回调
     */
    private success(json){
        this.UiManager.CloseLoading();

        if (0 == json.data.length && cc.isValid(this.lab_tip)) {
            this.lab_tip.node.active = true;
        }
        
        for (let index = 0; index < json.data.length; index++) {
            let email_item = cc.instantiate(this.EmailItemPer);
            let EmailItemPanel:EmailItemPanel = email_item.getComponent("EmailItemPanel");
            if(cc.isValid(EmailItemPanel)){
                EmailItemPanel.InitData(json.data[index]);
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
