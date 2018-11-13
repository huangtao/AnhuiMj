import { EnterNumForm } from "../Base/EnterNumForm";
import { UIName } from "../../Global/UIName";
import { WebRequest } from "../../Net/Open8hb";
import { ActionNet } from "../../CustomType/Action";
import UIBase from "../Base/UIBase"; 
import { NativeCtrl } from '../../Native/NativeCtrl';
import { DailiFormItem } from './DailiFormItem';
import { InitGameParam } from '../../CustomType/InitGameParam';

const { ccclass, property } = cc._decorator;
@ccclass
export class DailiForm extends UIBase<any>{
    public IsEventHandler: boolean=true;
    public IsKeyHandler: boolean=true;

    @property(cc.Node)
    content : cc.Node = null;

    @property(cc.Prefab)
    ItemPrefab : cc.Prefab = null;

    start () {
        this.InitPrefab()
    }

    /**
     * 初始化预制体
     */
    private InitPrefab(){
        for(var i = 0; i < 4; i++){
            let item = cc.instantiate(this.ItemPrefab);
            this.content.addChild(item);
            switch (i) {
                case 0:
                    this.InitData(item, "六安地区", "qilehuyu005") 
                    break;
                case 1:
                     this.InitData(item, "合肥地区", "qilehuyu002")
                    break;
                case 2:
                     this.InitData(item, "滁州地区", "qilehuyu003")
                    break;
                case 3:
                     this.InitData(item, "阜阳地区", "qilehuyu001")
                    break;
                default:
                    break;
            } 
        }
    }
    
    /**
     * 动态传参
     */
    private InitData(item:cc.Node, areaName:String, wxNumber:String){
        item.getComponent("cc.Label").string = areaName.toString()
        item.name = wxNumber.toString()
    }

    private ClickBottomCopy(){
        NativeCtrl.CopyToClipboard("qlahmj");
        cc.sys.openURL("weixin://")
    }

}