import { UIName } from "../../Global/UIName"; 
import UIBase from "../Base/UIBase";
import { NativeCtrl } from '../../Native/NativeCtrl';

const { ccclass, property } = cc._decorator;

@ccclass
export class DailiFormItem extends UIBase<any>{
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    private areaName : Number;
    private wxNumber : String;

    @property(cc.Node)
    item : cc.Node = null;

    start () {

    }

    ClickItem(){
        NativeCtrl.CopyToClipboard(this.item.name);
        cc.sys.openURL("weixin://")
    }

}