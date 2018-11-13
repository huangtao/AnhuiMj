/**
 * 城市列表Item
 */
import { CityName } from "../../CustomType/GameInfos";
import { Action } from "../../CustomType/Action";
import ScrollHelperItem from "../../utils/ScrollHelperItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CityItem extends ScrollHelperItem {
    /**
     * 游戏名称
     */
    @property(cc.Label)
    txt_name: cc.Label = null;

    /**
     * 火图标
     */
    @property(cc.Sprite)
    sp_icon: cc.Sprite = null;
  	
    /**
     * 选中状态图标
     */
    @property(cc.Sprite)
    sp_selected: cc.Sprite = null;

    /**
     * 选中状态游戏名称
     */
    @property(cc.Label)
    lab_selectGameName: cc.Label = null;

    private _cityName: string = null;

    /**
     * 初始化界面显示
     */
    
    public initUI(name: string): void{
        if (!name || "" == name) {
          return;
        }

        if (this.sp_selected) {
          this.sp_selected.node.active = false;
        }

        let sp_fire = cc.find("sp_icon",this.node); // 火的图标
        sp_fire.active = false;
        
        if ("CHAGNWAN" == name) {
            sp_fire.active = true;
        }

        if (cc.isValid(this.txt_name)) {
           this.txt_name.string = CityName[name];
        }

        this._cityName = name;
    }

    /**
     * 城市列表点击处理
     */
  	public clickEventHandle(): void{
      super.clickEventHandle();

      if (this.clickAction) {
          this.clickAction.Run([{name: this._cityName,list: this.showData}]);
      }      
  	}

    /**
     * 选中
     */
    public selected(): void{
      if (this.sp_selected) {
          this.sp_selected.node.active = true;
      }

      if(this.lab_selectGameName && this._cityName){
        this.lab_selectGameName.string = CityName[this._cityName];
      }
    }
    /**
     * 取消选中
     */
    public cancelSelected(): void{
      if (this.sp_selected) {
        this.sp_selected.node.active = false;
      }
    }
}
