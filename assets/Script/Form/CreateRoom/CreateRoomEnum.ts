/**
 * 规则面板选项框类型
 */
export enum ToggleType {
	/**
	 * 复选框
	 */
	TOGGLE_CHECKBOX = "TOGGLE_CHECKBOX",

	/**
	 * 复选框数组列表
	 */
	TOGGLE_CHECKBOX_ARRAYCONTAINER = "TOGGLE_CHECKBOX_ARRAYCONTAINER",

	/**
	 * 单选框
	 */	
	TOGGLE_SINGLE = "TOGGLE_SINGLE",

	/**
	 * 滑动条
	 */
	TOGGLE_SLIDER = "TOGGLE_SLIDER",

	/**
	 * 下拉框
	 */
	TOGGLE_DROPDOWN = "TOGGLE_DROPDOWN",

	/**
	 * 单选框加下拉框
	 */
	TOGGLE_SINGLE_DROPDOWN = "TOGGLE_SINGLE_DROPDOWN",

	/**
	 * 复选框加下拉框
	 */
	TOGGLE_CHECKBOX_DROPDOWN = "TOGGLE_CHECKBOX_DROPDOWN",

	/**
	 * 单选左右箭头选择框
	 */
	SINGLE_LEFTRIGHT = "SINGLE_LEFTRIGHT",

	/**
	 * 复选左右箭头选择框
	 */
	CHECKBOX_LEFTRIGHT = "CHECKBOX_LEFTRIGHT",
}