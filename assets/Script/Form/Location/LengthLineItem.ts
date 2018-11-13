import { QL_Common } from "../../CommonSrc/QL_Common";
import { HeaderItem } from "./HeaderItem";
import { SizeLength } from "../../Tools/Function";


const { ccclass, property } = cc._decorator;
@ccclass
export class LengthLineItem extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Sprite)
    labelBg: cc.Sprite = null;
    @property([cc.SpriteFrame])
    spriteFrame: cc.SpriteFrame[] = [];

    private header = new Array<HeaderItem>();
    public AddHeader(item: HeaderItem) {
        this.header.push(item);
    }
    public Flush() {
        if (!this.checkValid()) {
            this.label.string = "距离未知";
            // this.labelBg.spriteFrame = this.spriteFrame[0];
            return;
        }
        // this.labelBg.spriteFrame = this.spriteFrame[1];
        let len = SizeLength(this.header[0].Latitude, this.header[0].Longitude, this.header[1].Latitude, this.header[1].Longitude);
        len = Math.floor(len);
        // let len = 200;
        if (len > 10000) {
            this.label.string = len / 1000 + "公里";
        } else {
            this.label.string = len + "米";
        }
    }

    private checkValid() {
        if (this.header.length != 2) {
            cc.log("无效的header")
            return false;
        }
        if (!this.header[0]) {
            cc.log("无效的header0")
            return false;
        }
        if (this.header[0].Latitude == 0 && this.header[0].Longitude == 0) {
            cc.log("无效的header0 数据")
            return false;
        }
        if (!this.header[1]) {
            cc.log("无效的header1")
            return false;
        }
        if (this.header[1].Latitude == 0 && this.header[1].Longitude == 0) {
            cc.log("无效的header1 数据")
            return false;
        }
        return true;
    }
}