


import Global from "../../Global/Global";
import UIBase from "../Base/UIBase";
import { Action } from "../../CustomType/Action";
import { ReflushNodeWidgetAlignment, PlayEffect } from "../../Tools/Function";
import { AudioType } from "../../CustomType/Enum";

const { ccclass, property } = cc._decorator;

@ccclass

export class MessageBox extends UIBase<any>{
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;
    
    @property(cc.Label)
    text: cc.Label = null;

    thisobj: any;
    sureFun: Function;
    sureArgs: any;
    cancleFun: Function;
    cancleArgs: any;
    closeFun: Function;
    closeArgs: any;
    public Go(text: string, thisobj, okFun, cancleFun, closeFun, okArgs, cancleArgs, closeArgs) {
        
        //弹出音效
        PlayEffect(cc.url.raw("resources/Sound/open_panel.mp3"));

        this.text.string = text;
        this.thisobj = thisobj;
        this.sureFun = okFun;
        this.cancleFun = cancleFun;
        this.closeFun = closeFun;
        this.sureArgs = okArgs;
        this.cancleArgs = cancleArgs;
        this.closeArgs = closeArgs;
        this.Show();
       
    }

    

    public SureClick() {
        cc.log(`点击了确定按钮`);
        this.RunAction(this.sureFun, this.thisobj, this.sureArgs);
        super.CloseClick();
    }

    public CancleClick() {
        cc.log(`点击了确定按钮`);
        this.RunAction(this.cancleFun, this.thisobj, this.cancleArgs);
        super.CloseClick();
    }

    public CloseClick() {
        this.RunAction(this.closeFun, this.thisobj, this.closeArgs);
        super.CloseClick();
    }
    
    private RunAction(fun: Function, obj?: any, argArray?: any) {
        if (typeof fun !== "function") {
            cc.warn("待执行的fun不是一个function")
            return;
        }
        fun.apply(obj, argArray);
    }
}