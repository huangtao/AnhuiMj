import ScrollHelper from "../../utils/ScrollHelper";
import ScrollHelperItem from "../../utils/ScrollHelperItem";
import RecordItem from "./RecordItem";
const {ccclass, property} = cc._decorator;

@ccclass
export default class RecordListScrollView extends ScrollHelper {
	protected onRefresh(obj, idx: number, objIdx):void{
		// 刷新战绩列表
		if (this.ShowData) {
			let item: RecordItem = obj.getComponent("RecordItem");
			cc.warn('-- idx ',idx);
			item.initShow(this.ShowData[idx],idx);
		}

		super.onRefresh(obj, idx, objIdx);
	}

	/**
     * 滚动到顶部或底部回调
     */
    protected onScrollToBottomOrTopCallback(): void{
        super.onScrollToBottomOrTopCallback();
    }
}
