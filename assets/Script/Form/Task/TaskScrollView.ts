import ScrollHelper from "../../utils/ScrollHelper";
import TaskItem from "./TaskItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TaskScrollView extends ScrollHelper {
	public onRefresh(obj, idx: number, objIdx):void{
		// 刷新城市列表
		let key = this.ShowData.Keys[idx];
		let messageInfoItem: TaskItem = obj.getComponent(TaskItem);
		messageInfoItem.showData = this.ShowData.GetValue(key);
		messageInfoItem.initShow();
		
		super.onRefresh(obj, idx, objIdx);

	}
}
