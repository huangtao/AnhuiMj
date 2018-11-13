import { Attachment } from "./EmailIMessage";
import { QL_Common } from "../../CommonSrc/QL_Common";

const { ccclass, property } = cc._decorator;


@ccclass
export class AttachmentItem extends cc.Component {
    @property(cc.Sprite)
    icon: cc.Sprite=null;
    @property(cc.Label)
    label: cc.Label=null;
    @property(cc.SpriteFrame)
    goldframe: cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    RoomCardframe: cc.SpriteFrame=null;

    public a: Attachment;

    Init() {
        if (!this.a) {
            cc.warn("无效的附件信息")
            return;
        }
        this.label.string = "x" + this.a.AttachmentNum;
        if (this.a.AttachmentType === QL_Common.CurrencyType.Diamond) {
            this.icon.spriteFrame = this.RoomCardframe;
            return;
        }
        if (this.a.AttachmentType === QL_Common.CurrencyType.QiDou) {
            this.icon.spriteFrame = this.goldframe;
            return;
        }
        this.node.active = false;

    }


}