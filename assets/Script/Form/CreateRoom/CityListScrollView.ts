import ScrollHelper from "../../utils/ScrollHelper";
import CityItem from "./CityItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CityListScrollView extends ScrollHelper {
	/**
	 * 城市列表
	 */
	public cityList: any;

	public onRefresh(obj, idx: number, objIdx):void{
		if (!this.cityList) {
			return;
		}
		
		// 刷新城市列表
		let key = this.ShowData[idx];
		let cityItem: CityItem = obj.getComponent(CityItem);
		cityItem.showData = this.cityList.GetValue(key);
		cityItem.initUI(key);
		
		super.onRefresh(obj, idx, objIdx);
	}
}
