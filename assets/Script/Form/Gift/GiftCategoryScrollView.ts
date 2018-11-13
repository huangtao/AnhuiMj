import ScrollHelper from "../../utils/ScrollHelper";
import {GiftCategortItem} from "./GiftCategoryItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GiftCategoryScrollView extends ScrollHelper {
	public onRefresh(obj,idx:number,objIdx):void{
		if(this.ShowData){
			let categoryItem:GiftCategortItem = obj.getComponent("GiftCategortItem");
			categoryItem.initShow(this.ShowData[idx],idx);
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
