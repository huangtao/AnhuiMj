import RuleItemToggleBase from "./RuleItemToggleBase";
import SingleToggle from "./SingleToggle";
import { AttrParam }  from "./RuleItemToggleBase";
import { Action } from "../../../CustomType/Action";

const {ccclass, property} = cc._decorator;

@ccclass
export default class QLCheckBoxArrayContainer extends cc.Component {

    @property(cc.Layout)
    layout_item: cc.Layout = null;

    public action: Action = null;
    /*
     * 选中的复选框值数组
     */
    private _selectedValuesArray: Array<cc.Toggle> = null;

    private _attrName = "";
    public set AttrName(name: string) {
        this._attrName = name;
    }

    public onLoad() {
        if (this.layout_item) {
            this.layout_item.updateLayout();
        }
    }

    /**
     * 添加子节点到列表中
     */
    public addToggle(toggle: cc.Node): void{
    	cc.info("addToggle");
    	if (!cc.isValid(toggle)) {
    		cc.info("error: invalid toggle!");
    		return;
    	}

    	if (!cc.isValid(this.layout_item)) {
    		return;
    	}

    	let componet: RuleItemToggleBase = toggle.getComponent("RuleItemToggleBase");
    	if (componet) {
       		componet.ClickCallBack = new Action(this,this.onToggleClickEvent);
    	}
        
    	this.layout_item.node.addChild(toggle);
        this.layout_item.updateLayout();
    }

    /**
     * 复选框点击事件
     */
    public onToggleClickEvent(param: any):void{

        if (!this._selectedValuesArray) {
            this._selectedValuesArray = new Array<cc.Toggle>();
        }

    	if (!param || !param.attrParam) {
    		return;
    	}

    	let _param = param.attrParam;
    	let curClickToggle: SingleToggle = param.toggle;

        // 选中状态
        if (_param.isChecked) {
            this._selectedValuesArray.push(param.attrParam.value);
        } else {
            let index = this._selectedValuesArray.indexOf(param.attrParam.value);

            if (-1 != index) {
                this._selectedValuesArray.splice(index, 1);
            }
        }

        param.attrParam.value = this._selectedValuesArray;
        param.attrParam.attrName = this._attrName;

    	if (this.action) {
    		this.action.Run([{attrParam: param.attrParam}]);
    	}
    }
}
