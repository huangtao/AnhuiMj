import RuleItemToggleBase from "./RuleItemToggleBase";
import SingleToggle from "./SingleToggle";
import { AttrParam }  from "./RuleItemToggleBase";
import { Action } from "../../../CustomType/Action";

const {ccclass, property} = cc._decorator;

@ccclass
export default class QLToggleContainer extends cc.Component {

    @property(cc.Layout)
    layout_item: cc.Layout = null;

    private action: Action = null;
    /*
     * 上一个选中的节点
     */
    private _preSelectedToggle: cc.Toggle = null;

    private _toggleItems: Array<SingleToggle> = null;

    public onLoad() {
        if (this.layout_item) {
            this.layout_item.updateLayout();
        }
    }

    public addToggle(toggle: any): void{
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

    public onToggleClickEvent(param: any):void{
    	if (!this._toggleItems) {
    		this._toggleItems = this.layout_item.node.getComponentsInChildren(SingleToggle);
    	}

    	if (!param || !param.attrParam) {
    		return;
    	}

    	let _param = param.attrParam;
    	let curClickToggle: SingleToggle = param.toggle;

    	if (this.action && _param.isChecked) {
    		this.action.Run([{attrParam: param.attrParam}]);
    	}

    	this.allowOnlyOneToggleChecked(curClickToggle.singleToggle.isChecked,curClickToggle.singleToggle);
    }

    /**
     * 只允许有一个选中
     */
    private allowOnlyOneToggleChecked(isCheck: boolean, toggle: cc.Toggle){
    	let curToggle = toggle.getComponent(cc.Toggle);

    	if (!cc.isValid(this._preSelectedToggle) && isCheck) {
        	this._preSelectedToggle = curToggle;
        	curToggle.enabled = false;
    		return;
        }else if(!isCheck){
        	curToggle.enabled = true;
        }

        if (!this._preSelectedToggle) {
        	return;
        }

        if (this._preSelectedToggle == curToggle) {
        	return;
        }

    	if (isCheck) {
    		curToggle.enabled = false;
    		this._preSelectedToggle.uncheck();
            this._preSelectedToggle = curToggle;
    	}else{
    		curToggle.enabled = true;
    	}
    }  
}
