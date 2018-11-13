import UIBase from "../Base/UIBase";
import { WebRequest } from "../../Net/Open8hb";
import { ActionNet, Action } from "../../CustomType/Action";
import { EmailIMessage, EmailInfo } from "./EmailIMessage";
import { AttachmentItem } from "./AttachmentItem";
import Global from "../../Global/Global";
import { EventCode } from "../../Global/EventCode";
import { GameCachePool } from "../../Global/GameCachePool";
import { AddTListener } from "../../Tools/Function";
import { UIName } from "../../Global/UIName";
import ConfigData from "../../Global/ConfigData";
import { EmailItem } from "./EmailItem";
import EmailListScrollView from "./EmailListScrollView";


const { ccclass, property } = cc._decorator;

/**
 * 读取
 */
const Read = 1;
/**
 * 领取
 */
const Draw = 2;
/**
 * 删除
 */
const Delete = 3;


@ccclass
export class EmailForm extends UIBase<any>{
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    // @property(cc.ToggleGroup)
    // ItemGroup: cc.ToggleGroup=null;

    @property(cc.ScrollView)
    view: cc.ScrollView=null;

    // @property(cc.Button)
    // btnReceive: cc.Button=null;
    // @property(cc.Label)
    // TitleLabel: cc.Label=null;

    // @property(cc.Label)
    // TextLabel: cc.Label=null;

    // @property(cc.Node)
    // attNode: cc.Node=null;

    // @property(cc.Prefab)
    // EmailPrefab: cc.Prefab=null;

    // @property(cc.Prefab)
    // AttachmentPrefab: cc.Prefab=null;

    /**
     * 没有邮件提示文字
     */
    @property(cc.Label)
    lab_tip: cc.Label = null;

    private emails: EmailInfo[];

    // private selectEmailId: number;

    // private _onLoadEmail = false;
    
    public InitShow(){
        let scrollHelper: EmailListScrollView = this.view.getComponent("EmailListScrollView");
        scrollHelper.registerScrollToTopOrBottonEvent(this.requestDataAndRefreshList.bind(this));
        scrollHelper.resetList();
        this.getEmails();

        if (cc.isValid(this.lab_tip)) {
            this.lab_tip.node.active = false;
        }
    }

    private requestDataAndRefreshList(){
        if (this.emails.length === 0) return;
        if (this.emails.length === this.UserInfo.MessageNum) return;
        const id = this.emails[this.emails.length - 1].emailID;
        this.getEmails(id);
    }

    private getEmails(start_id:number = 0, len:number = 10){
        const action = new ActionNet(this,this.Onsuccess,this.OnError);
        const data = WebRequest.DefaultData();
        data.AddOrUpdate("start_id",start_id);
        data.AddOrUpdate("len",len);

        // WebRequest.email.get_email_list(action,data);
    }   

    private Onsuccess(obj:EmailIMessage){
        this.emails = this.emails.concat(obj.emailAry);
        if (!obj || !obj.emailAry || obj.emailAry.length === 0) {
            return;
        }

        if (0 == obj.emailAry.length && cc.isValid(this.lab_tip)) {
            this.lab_tip.node.active = true;
        }

        let scrollHelper: EmailListScrollView = this.view.getComponent("EmailListScrollView");
        scrollHelper.refreshData(obj.emailAry);
    }

    private OnError(){
        this.UiManager.ShowTip("获取邮件失败，请检查网络连接或重新登录");
    }

    // onLoad() {
    //     super.onLoad();
    //     this.emails = new Array();
    //     this.view.node.on("scroll-to-bottom", this.onBottom, this);
    // }

    // private onBottom() {
    //     if (this.emails.length === 0) return;
    //     //if (this.emails.length === this.UserInfo.MessageNum) return;
    //     const id = this.emails[this.emails.length - 1].emailID;
    //     this.getEmail(id);
    // }

    // public InitShow() {
    //     this.AllClear();
    //     this.getEmail();
    // }

    // private getEmail(start_id: number = 0, len = 10) {
    //     if (this._onLoadEmail) {
    //         cc.log("已经开始加载邮件，无需重试");
    //         return;
    //     }
    //     this._onLoadEmail = true;
    //     cc.log("开始加载Email");
    //     const action = new ActionNet(this, this.OnSuccess, this.OnError);
    //     const data = WebRequest.DefaultData();
    //     data.AddOrUpdate("len", len);
    //     data.AddOrUpdate("start_id", start_id);
    //     WebRequest.email.get_email_list(action, data);
    // }



    /**
     * 清除所有信息
     */
    // private AllClear() {
    //     //回收Email节点
    //     while (this.ItemGroup.node.childrenCount > 0) {
    //         GameCachePool.EmailPool.put(this.ItemGroup.node.children[0]);
    //     }
    //     this.selectEmailId = -1;
    //     this.emails.length = 0;
    //     this.ContextClear();
    // }

    /**
     * 清除右侧文本
     */
    // private ContextClear() {
    //     this.TextLabel.string = "";
    //     this.TitleLabel.string = "";
    //     this.AttClear();
    // }

    /**
     * 清除界面上的附件显示
     */
    // private AttClear() {
    //     //回收附件节点
    //     while (this.attNode.childrenCount > 0) {
    //         GameCachePool.AttachmentPool.put(this.attNode.children[0]);
    //     }
    // }

    // private ReceiveClick() {
    //     //如果没有选中邮件
    //     if (this.selectEmailId < 0) return;

    //     const index=this.getSelectEmailIndex(this.selectEmailId);
    //     //如果没有附件
    //     if (!this.emails[index].Attachment || this.emails[index].Attachment.length === 0) {
    //         return;
    //     }

    //     EmailForm_new.SendMessage(this.selectEmailId, Draw);

    //     //隐藏领取按钮
    //     this.btnReceive.node.active = false;

    //     //清空附件数据
    //     this.emails[index].Attachment = [];

    //     //清除附件NODe
    //     this.AttClear();

    //     //
    //     this.ItemGroup.node.children[index].getComponent<EmailItem_new>(EmailItem_new).Flush();

    //     //显示Tips
    //     this.UiManager.ShowTip("领取成功");
    // }

    // private DeleteClick() {

    //     //如果没有选中邮件
    //     if (this.selectEmailId < 0) return;

    //     //
    //     EmailForm_new.SendMessage(this.selectEmailId, Delete);

    //     //
    //     const index = this.getSelectEmailIndex(this.selectEmailId);

    //     let next: cc.Toggle;
    //     if (index === 0) {
    //         next= this.ItemGroup.node.children[1].getComponent(cc.Toggle)
    //         //next = this.ItemGroup.toggleItems[1];
    //     } else {
    //         next= this.ItemGroup.node.children[index - 1].getComponent(cc.Toggle)
    //         //next = this.ItemGroup.toggleItems[index - 1];
    //     }
    //     if (cc.isValid(next)) {
    //         next.check();
    //     }else{
    //         this.ContextClear();
    //     }

    //     //
    //     this.emails.splice(index, 1);

    //     //
    //     GameCachePool.EmailPool.put(this.ItemGroup.node.children[index]);

    //     //显示Tips
    //     this.UiManager.ShowTip("删除成功");
    // }

    // private OnSuccess(obj: EmailIMessage) {
    //     this._onLoadEmail = false;
    //     if (!obj || !obj.emailAry || obj.emailAry.length === 0) {
    //         return;
    //     }
    //     this.addNewEmail(obj.emailAry);
    // }
    // private OnError(err) {
    //     this._onLoadEmail = false;
    //     this.UiManager.ShowTip("获取邮件失败，请检查网络连接或重新登录");
    // }

    // private addNewEmail(emailAry: Array<EmailInfo>) {
    //     if (!emailAry || emailAry.length === 0) return;

    //     if (!cc.isValid(this.EmailPrefab)) {
    //         return;
    //     }

    //     this.emails = this.emails.concat(emailAry);

    //     for (let i = this.emails.length - emailAry.length; i < this.emails.length; i++) {
    //         const item = this.emails[i];
            // let node = GameCachePool.EmailPool.get();
    //         if (!cc.isValid(node)) {
                // node = cc.instantiate(this.EmailPrefab);
    //         }
    //         const t = node.getComponent<cc.Toggle>(cc.Toggle);


    //         t.toggleGroup = this.ItemGroup;


            // AddTListener(t, this.node, "EmailForm_new", "onEmailClick", item.emailID + "");

            // const e = node.getComponent<EmailItem_new>(EmailItem_new);
            // if (cc.isValid(e)) {
            //     e.emailInfo = item;
            //     e.Init();
            //     node.parent = this.ItemGroup.node;
            // }
    //     }
    //     if (!(this.selectEmailId >= 0)) {
    //         this.onEmailClick(null, this.emails[0].emailID + "");
    //     }
    // }

    // private onEmailClick(e, str: string) {
    //     //获取邮件id
    //     const id = parseInt(str);
    //     //根据邮件id获取索引
    //     const index = this.getSelectEmailIndex(id);
    //     const info = this.emails[index];
    //     if (!info) return;

    //     //this.AttClear();
    //     this.selectEmailId = id;
    //     if (info.status == 0) {
    //         EmailForm_new.SendMessage(id, Read);
    //         info.status = 1;
    //         this.UserInfo.MessageNum--;
    //         this.EventManager.PostMessage(EventCode.NewEmailInfo);
    //         this.ItemGroup.node.children[index].getComponent<EmailItem_new>(EmailItem_new).Flush();
    //     }
    //     this.TextLabel.string = info.emailContext;
    //     this.TitleLabel.string = info.emailTitle;
    //     if (!info.Attachment || info.Attachment.length === 0) {
    //         this.btnReceive.node.active = false;
    //         return;
    //     }
    //     if (!cc.isValid(this.AttachmentPrefab)) {
    //         return;
    //     }
    //     this.btnReceive.node.active = true;
    //     for (let i = 0; i < info.Attachment.length; i++) {
    //         let node = GameCachePool.AttachmentPool.get();
    //         if (!cc.isValid(node)) {
    //             node = cc.instantiate(this.AttachmentPrefab);
    //         }
    //         node.parent = this.attNode;
    //         const a = node.getComponent<AttachmentItem>(AttachmentItem);
    //         if (cc.isValid(a)) {
    //             a.a = this.emails[index].Attachment[i];
    //         }
    //         a.Init();
    //     }
    // }


    // private static SendMessage(id, type) {
    //     const data = WebRequest.DefaultData();
    //     //邮件id
    //     data.Add("e_id", id);
    //     data.Add("r_type", type);
    //     // WebRequest.email.read_email(null, data);
    // }


    // private getSelectEmailIndex(emailid: number) {
    //     for (let i = 0; i < this.emails.length; i++) {
    //         if (emailid == this.emails[i].emailID)
    //             return i;
    //     }
    //     return 0;
    // }

}