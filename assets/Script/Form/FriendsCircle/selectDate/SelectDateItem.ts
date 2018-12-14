import ScrollHelperItem from "../../../utils/ScrollHelperItem";
import { LoadHeader } from "../../../Tools/Function";
import FriendCircleDataCache from "../FriendCircleDataCache";
import { MillisSecondToDate } from "../../../Tools/Function";
import { Action } from "../../../CustomType/Action";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SelectDateItem extends ScrollHelperItem {

    /**
     * 小时label
     */
    @property(cc.Label)
    lab_hour: cc.Label = null;

    /**
     * 选中状态
     */
    @property(cc.Sprite)
    sp_selectedBg: cc.Sprite = null;
    
    /**
     * 标签的值
     */
    private _value: string  = "";

    public get Value(): string { return this._value };

    /*
     * 点击事件监听
     */
    private _clickAct: Action = null;

    public set ClickAct(act: Action) {
        this._clickAct = act;
    }

    /**
     * 设置文本显示
     */
    public setText(idx: string){
        if (idx !== undefined) {
            this._value = idx;
            this.lab_hour.string = idx;
        }
    }

    /**
     * 设置选中或取消状态
     */
    public setSelected(isSelect: boolean){
        this.sp_selectedBg.node.active = isSelect;
    }

    // 点击事件
    public btnClickEvent(type, args){       
        if (this._clickAct) {
            this._clickAct.Run([this]);
        }
    }
}
