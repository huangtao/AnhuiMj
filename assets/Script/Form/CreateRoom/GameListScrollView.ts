import ScrollHelper from "../../utils/ScrollHelper";
import CityItem from "./CityItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameListScrollView extends ScrollHelper {
	public onRefresh(obj, idx: number, objIdx):void{
		super.onRefresh(obj, idx, objIdx);

		// 刷新城市列表
		let key = this.ShowData.Keys[idx];
		let cityItem: CityItem = obj.getComponent(CityItem);
		cityItem.initUI(key);
	}
}
