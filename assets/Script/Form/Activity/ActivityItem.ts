import ScrollHelperItem from "../../utils/ScrollHelperItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ActivityItem extends ScrollHelperItem {

    @property(cc.Label)
    label_selected: cc.Label = null;

    @property(cc.Label)
    label_unselect: cc.Label = null;

    @property(cc.Sprite)
    item_selected:cc.Sprite = null;

    private _itemName: string = null;

    public initUI(info:any,idx: number){
        if (!info || "" == info) {
            return;
        }
        if (this.item_selected) {
            this.item_selected.node.active = false;
        }
        if (cc.isValid(this.label_unselect)) {
            this.label_unselect.string = info.name;
        }
        this._itemName = info.name;
    }

    /**
     * 选中
     */
    public selected(): void{
        if (this.item_selected) {
            this.item_selected.node.active = true;
        }
        if(this.label_selected && this._itemName){
        this.label_selected.string = this._itemName;
        }
    }
    /**
     * 取消选中
     */
    public cancelSelected(): void{
        if (this.item_selected) {
            this.item_selected.node.active = false;
        }
    }

    /**
     * 点击事件
     */
    public clickEventHandle(): void{
        super.clickEventHandle();
        if (this.clickAction) {
            this.clickAction.Run([{name: this._itemName,list: this.showData.list}]);
        }      
    }
}
