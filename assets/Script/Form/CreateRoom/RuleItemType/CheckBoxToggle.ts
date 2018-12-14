import RuleItemToggleBase  from "./RuleItemToggleBase";
import { AttrParam }  from "./RuleItemToggleBase";

const { ccclass, property } = cc._decorator;
@ccclass

export default class CheckBoxToggle extends RuleItemToggleBase {
	@property(cc.Label)
	attrDesc: cc.Label = null;

	@property(cc.Toggle)
    checkBox: cc.Toggle = null;

	public initShow(): void{
		if (!this.showData) {
			return;
		}

		if (cc.isValid(this.attrDesc)) {
			this.attrDesc.string = this.showData.desc;
		}
	}

	public get isChecked() {
    	if (!this.checkBox) {
    		return false;
    	}
    	
    	return this.checkBox.isChecked;
    }
    
	/**
     * 设置选中状态下和值
     */
	public setSelectValue(data: any): void{
		if (!data) {
			return;
		}
		
		if (data.selected) {
			this.checkBox.check();
		}else{
			this.checkBox.uncheck();
		}
	}

	/**
	 * 点击事件
	 */
	protected clickEventHandle(): void{
		if (!cc.isValid(this.checkBox)) {
			return;
		}

		this._attrParam = new AttrParam();
		this._attrParam.childrenAttr = this.showData.childrenAttr;
		this._attrParam.parentAttr = this.showData.parentAttr;
		this._attrParam.node = this.node;
		this._attrParam.attrName = this.showData.attr;
		this._attrParam.valueDesc = this.showData.desc;
		this._attrParam.isChecked = this.checkBox.isChecked;

		if (this.checkBox.isChecked) {
			this._attrParam.value = this.showData.value;
		}else{
			this._attrParam.value = false;
		}
		
		// 返回选中值和状态
		this.returnSelectParam();
	}
}