import UIBase from "../Base/UIBase";
import { ActionNet } from "../../CustomType/Action";
import { WebRequest } from "../../Net/Open8hb";
import EmailItemPanel from './EmailItemPanel';

const {ccclass, property} = cc._decorator;

/**
 * 显示邮件内容
 * author:Cyq
 */
@ccclass
export default class EmailContentPanel extends UIBase<EmailItemPanel> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.Label)
    content: cc.Label = null;

    /**
     * 初始化数据
     */
    InitShow(){
        let obj = this.ShowParam;
        if(obj){
            if(obj.status == 0){
                const data = WebRequest.DefaultData();
                data.Add("msgId", obj.id);
                const action = new ActionNet(this, this.success, this.error);
                WebRequest.email.SetUserReadMsg(action, data);
                obj.status = 1;
            }

            this.content.string = obj.content;
        }
    }

    private success(){
        cc.log("重置邮件状态成功!");
    }

    private error(){
        cc.log("重置邮件状态失败!");
    }
}
