import { DrawDataItem } from "./LuckDrawForm";
import { addZero } from "../../Tools/Function";

const { ccclass, property } = cc._decorator;

@ccclass
export class DrawItem extends cc.Component{
    @property(cc.Label)
    time:cc.Label=null;
    @property(cc.Label)
    title:cc.Label=null;
    @property(cc.Label)
    num: cc.Label=null;

    data: DrawDataItem;
    Init() {
        if (!this.data) return;
        const date=new Date(this.data.Ctime);
        this.time.string = `${addZero(date.getMonth() + 1, 2)}-${addZero(date.getDate(), 2)} ${date.getHours()}:${addZero(date.getMinutes(), 2)}:${addZero(date.getSeconds(), 2)}`;
        this.title.string = this.data.remark;
        this.num.string = "x" + this.data.GetMoneyNum;
    }
}