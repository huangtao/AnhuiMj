/**
 * 规则面板横条Item
 */
import { Action } from "../../../CustomType/Action";
import { ToggleType } from "../CreateRoomEnum";

   
   /**
    * 选项参数数据结构
    */
export class AttrParam {
    /**
     * 属性名
     */
    public attrName: string = null;

    /**
     * 属性值
     */
    public value: any = null;

    /**
     * 属性值描述
     */
    public valueDesc: any = null;

    /**
     * 是否被选中
     */
    public isChecked: boolean = false;

    /**
     * 选项框节点
     */
    public node: cc.Node = null;

    /**
     * 父属性
     */
    public parentAttr: any = null;

    /**
     * 子属性集合
     */
    public childrenAttr = null;
}

const { ccclass, property } = cc._decorator;
@ccclass
export default abstract class RuleItemToggleBase extends cc.Component {
    protected _attrParam: AttrParam = null;
    protected _clickCallback: Action = null;

    /**
     * 父属性 (如果父属性不勾选子属性不显示)
     */
    private _parentAttr: any;

    /**
     * 子属性列表
     */
    private _childrenAttr = [];

    public showData: any = null;

    /**
     * 类型
     */
    protected _Type: ToggleType = null;

    public set Type(type: ToggleType) {
        this._Type = type;
    }

    public get Type() : ToggleType {
        return this._Type;
    }
    /*
     * 返回选中的参数和数值
     */
    public returnSelectParam(){
        if(this._clickCallback){
            this._clickCallback.Run([{attrParam: this._attrParam,toggle: this}]);
        }
    }

    /**
     * 设置回调
     */
    public set ClickCallBack(act: Action){
        this._clickCallback = act;
    }

    protected clickEventHandle(): void{}

    /**
     * 初始化显示界面
     */
    public abstract initShow(): void;

    /**
     * 设置选中状态和值
     */
    public abstract setSelectValue(data: any): void;
}
