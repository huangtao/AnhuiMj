import UIBase from "../Base/UIBase";
import { UIName } from "../../Global/UIName";
import Global from "../../Global/Global";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { EventCode } from "../../Global/EventCode";
import { Action } from "../../CustomType/Action";
import { ReflushNodeWidgetAlignment } from "../../Tools/Function";

const { ccclass, property } = cc._decorator;
@ccclass
export class LoadingForm extends UIBase<any>{

    public IsEventHandler: boolean = false;
    public IsKeyHandler: boolean = false;
    public get isOneInstance(): boolean { return true; }
    public get isPersistRootFrom(): boolean { return true; }
    public get isPlayPopAction(): boolean { return false; }

    @property(cc.Label)
    label: cc.Label = null;

    // @property(cc.Animation)
    // ani: cc.Animation = null;

    public OnLoadInfo(str: string) {
        if (cc.isValid(this.label)) {
            this.label.string = str;
        }
    }
 }