/**
 * 城市列表Item
 */
import { Action } from "../CustomType/Action";
import ScrollHelper from "../utils/ScrollHelper";
const {ccclass, property} = cc._decorator;

@ccclass
export default class ScrollHelperItem extends cc.Component {
	/**
  	 * 父节点滚动容器
  	 */
  	public scroll: ScrollHelper = null;
  	/**
  	 * 显示的数据
  	 */
  	public showData: any = null;

    /**
     * 回调
     */
    public clickAction: Action;

    /**
     * 选中
     */
    public selected(): void{
    }
    /**
     * 取消选中
     */
    public cancelSelected(): void{
    }

    /**
     * 点击事件
     */
    public clickEventHandle(): void{
    	if (cc.isValid(this.scroll)) {
    	    this.scroll.updateSelectedStatus(this);
    	}
    }
}
