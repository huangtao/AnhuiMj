import RuleItemToggleBase  from "./RuleItemToggleBase";
import { AttrParam }  from "./RuleItemToggleBase";
import { Action } from "../../../CustomType/Action";

const { ccclass, property } = cc._decorator;
@ccclass

export default class DropDownBoxItem extends cc.Component {
	@property(cc.Label)
	attrDesc: cc.Label = null;

    private _clickEventAct: Action = null;
    private _showData: any;
    private _index: number = 0;
    
    set ClickEventAct(act: Action) {
		this._clickEventAct = act;
    }

    /**
     * 初始化显示
     */
    public initShow(data: any, idx: number) {
    	if (!data) {
    		return;
    	}

    	this._showData = data;
    	this._index = idx;
    	this.attrDesc.string = data["desc"];
    }

	/**
	 * 点击事件
	 */
	protected clickEventHandle(): void{
		if (this._clickEventAct) {
			this._clickEventAct.Run([this._index]);
		}
	}
}