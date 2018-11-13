import { UIName } from "../../Global/UIName"; 
import { ActionNet } from "../../CustomType/Action";
import UIBase from "../Base/UIBase";
import { WebRequest } from "../../Net/Open8hb";

const { ccclass, property } = cc._decorator;
@ccclass
export class DailiFormNew extends UIBase<any>{
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;


    onLoad(){
        super.onLoad();
        this.editbox.stayOnTop = false;
    }

    @property(cc.EditBox)
    editbox: cc.EditBox=null;
    // onLoad(){
    //     super.onLoad();
    // }
    private _lock=false;

    ClickEditBG(){
        this.editbox.setFocus();
    }


    public sureClick() {
        if (this._lock) return;
        this._lock = true;
        //this.editbox.stayOnTop = false;
        const action = new ActionNet(this, this.Success, this.Error);
        const data = WebRequest.DefaultData();
        data.AddOrUpdate("agentid", this.editbox.string);
       // WebRequest.userinfo.get_agent_info(action, data);
    }


    private Success(obj) {
        this._lock = false;
        const param = {};
        param["id"] = this.editbox.string;
        param["nickname"] = obj.data[0];//获取昵称
        param["header"] = obj.data[1];//获取头像
        // param.nickname = obj.data[0];//获取昵称
        // param.header = obj.data[1];//获取头像
        this.UiManager.ShowUi(UIName.AgentInfo, param);
    }

    private Error(e) {
        this._lock = false;
        this.editbox.string = "";
    }


}