import RuleItemToggleBase from "./RuleItemToggleBase";
import { AttrParam }  from "./RuleItemToggleBase";

const { ccclass, property } = cc._decorator;
@ccclass
export default class CheckBoxLeftRight extends RuleItemToggleBase {
	/**
	 * 选项切换显示Label
	 */
	@property(cc.Label)
	lab_desc: cc.Label = null;

	@property(cc.Toggle)
    checkBox: cc.Toggle = null;

    /**
     * 当前选中的索引(默认第一个)
     */
    private _curSelectIdx: number = 0;

	public initShow(): void{
		if (!this.showData || 0 == this.showData.list.length) {
			return;
		}

		this._curSelectIdx = this.showData.defaultValue;

		if (this.lab_desc) {
			this.lab_desc.string = this.showData.list[this._curSelectIdx].desc;
		}

		if (this.showData.defaultSelected) {
			this.checkBox.check();
		}else{
			this.checkBox.uncheck()
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
			this.checkBox.check();
		}else{
			this.checkBox.uncheck();
		}

		this._curSelectIdx = parseInt(data.value);

		if (this.lab_desc) {
			this.lab_desc.string = this.showData.list[this._curSelectIdx].desc;
		}
		
		/*if (typeof data.value !== 'undefined') {
			this._curSelectIdx = data.value;

			if (data.value == this.showData.defaultValue) {
				this.checkBox.uncheck();
			}
		}*/
	}
	
	/**
	 * 点击事件处理
	 */
	protected clickEventHandle(): void{
		if (!cc.isValid(this.checkBox)) {
			return;
		}

		this._attrParam = new AttrParam();
		this._attrParam.attrName = this.showData.attr;
		this._attrParam.isChecked = this.checkBox.isChecked;
		this._attrParam.valueDesc = this.showData.list[this._curSelectIdx].desc;
		
		if (this.checkBox.isChecked) {
			this._attrParam.value = this._curSelectIdx;
		}else{
			this._attrParam.value = this.showData.defaultValue;
		}
		
		this.returnSelectParam();
	}

	/**
	 * 左右箭头点击事件处理
	 */
	protected leftRightBtnEventHandle(event, customEventData): void{
		if (!cc.isValid(this.checkBox)) {
			return;
		}

		if ("LEFT" == customEventData) {
			this._curSelectIdx --;

			if (this._curSelectIdx < 0) {
				this._curSelectIdx = this.showData.list.length - 1;
			}

			this.lab_desc.string = this.showData.list[this._curSelectIdx].desc;
		}else if ("RIGHT" == customEventData) {
			this._curSelectIdx ++;

			if (this._curSelectIdx > this.showData.list.length - 1) {
				this._curSelectIdx = 0;
			}

			this.lab_desc.string = this.showData.list[this._curSelectIdx].desc;
		}

		this.clickEventHandle();
	}
}