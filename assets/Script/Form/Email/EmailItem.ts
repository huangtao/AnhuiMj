
import { EmailInfo } from "./EmailIMessage";
import { addZero } from "../../Tools/Function";
import { Action } from "../../CustomType/Action";
import ScrollHelperItem from "../../utils/ScrollHelperItem";
import Global from "../../Global/Global";
import { UIName } from "../../Global/UIName";
import { DateTime } from "../../Serializer/DateTime";

const { ccclass, property } = cc._decorator;


@ccclass
export class EmailItem extends ScrollHelperItem {
    // @property(cc.Sprite)
    // attach: cc.Sprite=null;
    @property(cc.Label)
    titleLabel: cc.Label=null;
    @property(cc.Label)
    dateLabel: cc.Label=null;
    @property(cc.Label)
    statusLabel: cc.Label=null;
    
    public emailInfo: EmailInfo;

    public action: Action;

    // Init() {
    //     if (!this.emailInfo) {
    //         cc.warn("无效的邮件信息")
    //         return;
    //     }
    //     const date = new Date(this.emailInfo.sendTime * 1000);
    //     this.dateLabel.string = `${date.getFullYear()}-${addZero(date.getMonth() + 1, 2)}-${addZero(date.getDate(), 2)}`
    //     this.titleLabel.string = this.emailInfo.emailTitle;
    //     //this.attach.node.active = this.emailInfo.Attachment.length > 0;
    // } 

    public initShow(data: EmailInfo,idx: number){
        this.emailInfo = data;

        this.titleLabel.string = data.emailTitle;
        const date = new Date(data.sendTime * 1000);
        this.dateLabel.string = `${date.getFullYear()}-${addZero(date.getMonth() + 1, 2)}-${addZero(date.getDate(), 2)}`;
        this.statusLabel.string = data.status > 0?"已读":"未读";

    }

    // private thisClick() {
    //     if(this.action){
    //         this.action.Run([this.emailInfo]);
    //     }
    // }

    /**
     * 列表点击处理
     */
      public clickEventHandle(): void{
      // super.clickEventHandle();
          cc.log("--- clickEventHandle");
          if (this.clickAction) {
              Global.Instance.UiManager.ShowUi(UIName.EmailContent,this.emailInfo);
          }      
      }

    /**
     * 选中
     */
    public selected(): void{
     
    }
    /**
     * 取消选中
     */
    public cancelSelected(): void{
      
    }
}