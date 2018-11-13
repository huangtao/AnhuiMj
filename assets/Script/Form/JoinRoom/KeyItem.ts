import { EnterNumForm } from "../Base/EnterNumForm"; 
import { KeyValue } from "../../CustomType/NumStack";

const { ccclass, property } = cc._decorator;
@ccclass
export class KeyItem extends cc.Component {

    Value: KeyValue;

    form: EnterNumForm;


    @property(cc.Sprite)
    icon: cc.Sprite=null;

    @property(cc.Label)
    label: cc.Label=null;

    onLoad() {

    }

    Init() {
        if (this.Value >= KeyValue.KeyDelete) {
            if (this.Value === KeyValue.KeyDelete) {
                // this.Load("out_btn");
                this.label.string = "删除";
                return;
            }
            if (this.Value === KeyValue.KeyClear) {
                // this.Load("delect_btn");
                this.label.string = "清空";
                return;
            }
            return;
        }
        this.label.string = this.Value + "";
    }

    private Load(str) {
        const t = this;
        cc.loader.loadRes(`Texture/Hall/JoinRoom/${str}`, cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            t.icon.spriteFrame = spriteFrame;
        });
    }

    private onclick() {
        if (this.form) {
            this.form.onEnter(this.Value);
        }
    }
}