

import UIBase from "../Base/UIBase";
import { ShareParam } from "../../CustomType/ShareParam";
import Global from "../../Global/Global";
const { ccclass } = cc._decorator;
@ccclass
export class ShareForm extends UIBase<ShareParam>{
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    public WxChatClick() {
        if (!this.ShowParam) return;
        this.ShowParam.WXScene = 0;
        Global.Instance.WxManager.Share(this.ShowParam);        
    }

    public WxCircleClick() {
        if (!this.ShowParam) return;
        this.ShowParam.WXScene = 1;
        Global.Instance.WxManager.Share(this.ShowParam);
        
    }
}

