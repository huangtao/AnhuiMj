import ScrollHelper from "../../utils/ScrollHelper";
import RecordDetailItem from "./RecordDetailItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RecordDetailScrollView extends ScrollHelper {
	public onRefresh(obj, idx: number, objIdx):void{
		super.onRefresh(obj, idx, objIdx);

		// 刷新战绩列表
		if (this.ShowData) {
			let item: RecordDetailItem = obj.getComponent("RecordDetailItem");
			item.initShow(this.ShowData[idx],idx);
		}
	}
}
