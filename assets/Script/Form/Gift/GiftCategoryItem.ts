import ScrollHelperItem from "../../utils/ScrollHelperItem";


const {ccclass, property} = cc._decorator;

@ccclass
export class GiftCategortItem extends ScrollHelperItem {

	/**
	*礼物种类名称
	*/
    @property(cc.Label)
    label_off: cc.Label = null;

    /**
     * 选中状态图标
     */
    @property(cc.Sprite)
    gift_selected: cc.Sprite = null;

    /**
	*点击状态礼物种类名称
	*/
    @property(cc.Label)
    label_on: cc.Label = null;

    /**
     * 礼品种类名称
     */
    private giftCategoryName:string = null;
    private giftList:any[];

    public initShow(data: any,idx: number){
        if (cc.isValid(this.label_off)) {
            this.label_off = data.categotyName;
        }
        this.giftCategoryName = data.categotyName;
        this.giftList = data.list;
    }
    
    /**
     * 列表点击处理
     */
    public clickEventHandle(): void{
        super.clickEventHandle();
        cc.log("--- clickEventHandle");
        if (this.clickAction) {
           this.clickAction.Run([{name:this.giftCategoryName,list:this.giftList}]);
        }      
    }
  
    /**
     * 选中
     */
    public selected(): void{
        if(this.gift_selected){
            this.gift_selected.node.active = true;
        }
        if(this.label_on && this.giftCategoryName){
            this.label_on.string = this.showData.categotyName;
        }
    }

    /**
     * 取消选中
     */
    public cancelSelected(): void{
        if(this.gift_selected){
            this.gift_selected.node.active = false;
        }
    }
}
