import ScrollHelper from "../../utils/ScrollHelper";
import { EmailItem } from "./EmailItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EmailListScrollView extends ScrollHelper {
	protected onRefresh(obj, idx: number, objIdx):void{
		// 刷新列表
		if (this.ShowData) {
			let item: EmailItem = obj.getComponent("EmailItem");
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
