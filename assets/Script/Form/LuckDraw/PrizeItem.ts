
import { PrizeItemSet } from "./LuckDrawForm";
import { LoadImage } from "../../Tools/Function";
const { ccclass, property } = cc._decorator;

@ccclass
export class PrizeItem extends cc.Component{
    @property(cc.Label)
    count:cc.Label=null;
    @property(cc.Sprite)
    img:cc.Sprite=null;

    data:PrizeItemSet;
    Init() {
        LoadImage(this.data.ImgUrl, this.img);
        this.count.string = "x" + this.data.MoneyNum;
        this.count.node.active = this.data.MoneyNum > 0;
    }
}