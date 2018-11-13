


import Global from "../../Global/Global";
import UIBase from "../Base/UIBase";

const { ccclass, property } = cc._decorator;

@ccclass

export class Contact extends UIBase<any>{
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.Label)
    text: cc.Label=null;
    @property(cc.Button)
    btn: cc.Button=null;

    str:string="";
    kfurl:string="";
    onLoad(){
        super.onLoad();
    }
    InitShow(){
        this.str = this.DataCache.SysConfig.GetValue("lxkf");
        if (this.str) {
            this.kfurl = this.DataCache.SysConfig.GetValue("kfurl");
            if (!this.kfurl)
                this.btn.enabled=false;
            this.text.string = this.str;
        } else {
            this.UiManager.ShowTip("客服暂时不在，请以后再试吧！");
            this.CloseClick();
        }
    }

    public SureClick() {
        if (this.kfurl)
            cc.sys.openURL(this.kfurl);
        this.CloseClick();
    }
    
    private RunAction(fun: Function, obj?: any, argArray?: any) {
        if (typeof fun !== "function") {
            cc.warn("待执行的fun不是一个function")
            return;
        }
        fun.apply(obj, argArray);
    }


}