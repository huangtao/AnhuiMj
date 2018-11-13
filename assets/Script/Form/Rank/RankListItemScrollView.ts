import RankListItem from "./RankListItem";
import ScrollHelper from "../../utils/ScrollHelper";
import Global from "../../Global/Global";
import { Action } from "../../CustomType/Action";
const {ccclass, property} = cc._decorator;

@ccclass
export default class RankListItemScrollView extends ScrollHelper {
    private act:Action = null;
    
    public data_type : string;

    public setting(obj){
        this.act = obj;
    }
    
    protected onRefresh(obj, idx: number, objIdx):void{
        // 刷新列表
		if (this.ShowData) {
			let item:RankListItem = obj.getComponent("RankListItem");
            item.initShow(this.ShowData[idx],idx, this.data_type);
            
            if(this.ShowData[idx].userId === Global.Instance.DataCache.UserInfo.userData.UserID){
                if(this.act){
                    this.act.Run([false]);
                }
            }else{
                if(this.act){
                    this.act.Run([true]);
                }
            }
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
