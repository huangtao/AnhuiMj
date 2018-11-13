import ScrollHelper from "../../utils/ScrollHelper";
import ActivityItem from "./ActivityItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemListScrollView extends ScrollHelper {
	public onRefresh(obj, idx: number, objIdx):void{
		// 刷新列表
		let cityItem: ActivityItem = obj.getComponent(ActivityItem);
		cityItem.showData = this.ShowData[idx];
		cityItem.initUI(this.ShowData[idx],idx);

		super.onRefresh(obj,idx,objIdx);
	}
}