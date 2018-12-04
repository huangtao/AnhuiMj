import RuleItemToggleBase from "./RuleItemToggleBase";
import { AttrParam } from "./RuleItemToggleBase";
import DropDownBoxItem from "./DropDownBoxItem";
import { Action } from "../../../CustomType/Action";

const { ccclass, property } = cc._decorator;
@ccclass
export default class CheckBoxDropDownBox extends RuleItemToggleBase {
	/**
	 * 选项切换显示Label
	 */
	@property(cc.Label)
	lab_desc: cc.Label = null;

	/**
	 * 当前选中项的Item
	 */
	@property(cc.Label)
	lab_selectValue: cc.Label = null;

	@property(cc.Toggle)
	checkBox: cc.Toggle = null;

	@property(cc.Node)
	btn_fold: cc.Node = null;

	@property(cc.Prefab)
	prefab_DropDown: cc.Prefab = null;

    /**
     * 下拉框面板节点
     */
	@property(cc.Layout)
	layout_dropDownBox: cc.Layout = null;

	private _curSelectValue: any = { value: 0, desc: "" };

	public initShow(): void {
		if (!this.showData || 0 == this.showData.list.length) {
			return;
		}

		if (this.lab_desc) {
			this.lab_desc.string = this.showData.desc;
		}

		if (this.layout_dropDownBox) {
			this.layout_dropDownBox.node.active = false;
		}

		this._curSelectValue.value = this.showData.defaultValue;

		this.btn_fold.width = this.showData.dropDownWidth;
		this.layout_dropDownBox.node.width = this.showData.dropDownWidth;

		// 创建下拉框列表项
		this.ceateDropBoxAttrList();
	}

	public get isChecked() {
		if (!this.checkBox) {
			return false;
		}

		return this.checkBox.isChecked;
	}

    /**
     * 初始化下拉框选项属性列表
     */
	private ceateDropBoxAttrList() {
		if (!this.showData || !this.prefab_DropDown) {
			return;
		}

		for (var idx = this.showData.list.length - 1; idx >= 0; idx--) {
			let attrInfo = this.showData.list[idx];

			if (attrInfo) {
				// 创建下拉框列表选项Item
				let prefab = cc.instantiate(this.prefab_DropDown);
				let dropDownBxoxItem: DropDownBoxItem = prefab.getComponent(DropDownBoxItem);
				dropDownBxoxItem.initShow(attrInfo, idx);
				dropDownBxoxItem.ClickEventAct = new Action(this, this.dropDownItemBtnEventHandle);
				this.layout_dropDownBox.node.addChild(prefab);
			}
		}
	}

	/**
     * 设置选中状态下和值
     */
	public setSelectValue(data: any): void {
		if (!data) {
			return;
		}

		if (data.value) {
			this._curSelectValue.value = parseInt(data.value);

			// 遍历匹配值的描述
			for (var idx = this.showData.list.length - 1; idx >= 0; idx--) {
				if (this.showData.list[idx].value == data.value) {
					this._curSelectValue.desc = this.showData.list[idx].desc;
					this.lab_selectValue.string = this.showData.list[idx].desc;
					break;
				}
			}
		}

		if (data.selected) {
			this.checkBox.check();
		} else {
			this.checkBox.uncheck();
		}
	}

	/**
	 * 点击事件处理
	 */
	protected clickEventHandle(): void {
		if (!cc.isValid(this.checkBox) || !this._curSelectValue) {
			return;
		}

		this._attrParam = new AttrParam();
		this._attrParam.attrName = this.showData.attr;
		this._attrParam.isChecked = this.checkBox.isChecked;
		this._attrParam.valueDesc = this._curSelectValue.desc;

		if (this.checkBox.isChecked) {
			this._attrParam.value = this._curSelectValue.value;
		} else {
			this._attrParam.value = this.showData.defaultValue;
		}

		this.returnSelectParam();
	}

	/**
	 * 列表项Item点击事件处理
	 */
	protected dropDownItemBtnEventHandle(data: any): void {
		if (!cc.isValid(this.checkBox)) {
			return;
		}

		if (data) {
			this.lab_selectValue.string = data.desc;
			this._curSelectValue = data;
			this.layout_dropDownBox.node.active = false;
			this.clickEventHandle();
			return;
		}

		cc.log("--- error: func[dropDownItemBtnEventHandle] param 'index' is error");
	}

	/**
	 * 下拉框折叠按钮事件
	 */
	private btnFoldClickEvent() {
		if (this.layout_dropDownBox) {
			this.layout_dropDownBox.node.active = !this.layout_dropDownBox.node.active;
		}
	}
}