/**
 * 玩法描述预制体
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameWanfaDescItem extends cc.Component {
    /**
     * 字段名
     */
    @property(cc.Label)
    lab_name: cc.Label = null;

    /**
     * 字段值
     */
    @property(cc.Label)
    lab_value: cc.Label = null;
  	
    /**
     * 属性描述layout
     */
    @property(cc.Layout)
    layout_desc: cc.Layout = null;  

    private _attrInfo: any;
    private _cityName: string = null;

    public getAttrInfo(): any{
        return this._attrInfo;
    }
    /**
     * 初始化界面显示
     */
    
    public initShow(attr: any): void{
        if (!attr) {
          return;
        }

        this._attrInfo = attr;

        if (this.lab_name) {
            this.lab_name.string = attr.name + ":";
        }

        if (this.lab_value) {
          this.lab_value.string = attr.value;
        }

        // 更新layout绘制
        if (this.layout_desc) {
            this.layout_desc.updateLayout();
        }

        // this.scheduleOnce(()=>{
        //     if (this.layout_desc.node.getContentSize().width > 720) {
        //         this.lab_value.node.width = 720;
        //         this.lab_value.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        //     }
        // },0.01);
    }

    /**
     * 判断是否换行显示
     */
    public isNewLine() : boolean {
        if (this.layout_desc.node.getContentSize().width > 360) {
            return true;
        }
        return false;
    }

}
