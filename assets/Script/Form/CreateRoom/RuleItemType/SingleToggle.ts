import RuleItemToggleBase from "./RuleItemToggleBase";
import { AttrParam }  from "./RuleItemToggleBase";

const { ccclass, property } = cc._decorator;
@ccclass
export default class SingleToggle extends RuleItemToggleBase {
	@property(cc.Label)
	attrDesc: cc.Label = null;

	@property(cc.Toggle)
    singleToggle: cc.Toggle = null;

	public initShow(): void{
		if (!this.showData) {
			return;
		}

		if (cc.isValid(this.attrDesc)) {
			this.attrDesc.string = this.showData.desc;
		}

		if (this.showData.defaultSelected) {
			this.singleToggle.check();
		}else{
			this.singleToggle.uncheck()
		}
	}

	/**
     * 设置选中状态下和值
     */
	public setSelectValue(data: any): void{
		if (!data) {
			return;
		}

		if (data.selected) {
			this.singleToggle.check();
		}else{
			this.singleToggle.uncheck();
		}
	}
	
	/**
	 * 点击事件处理
	 */
	protected clickEventHandle(): void{
		if (!cc.isValid(this.singleToggle)) {
			return;
		}

		this._attrParam = new AttrParam();
		this._attrParam.childrenAttr = this.showData.childrenAttr;
		this._attrParam.parentAttr = this.showData.parentAttr;
		this._attrParam.node = this.node;
		this._attrParam.value = this.showData.value;
		this._attrParam.attrName = this.showData.attr;
		this._attrParam.value = this.showData.value;
		this._attrParam.valueDesc = this.showData.desc;
		this._attrParam.isChecked = this.singleToggle.isChecked;
		
		this.returnSelectParam();
	}
}