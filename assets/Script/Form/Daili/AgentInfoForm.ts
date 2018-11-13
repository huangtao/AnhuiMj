import UIBase from "../Base/UIBase";
import { LoadHeader } from "../../Tools/Function";
import { WebRequest } from "../../Net/Open8hb";
import { ActionNet } from "../../CustomType/Action";
import { UIName } from "../../Global/UIName";

const { ccclass, property } = cc._decorator;
@ccclass
export class AgentInfoForm extends UIBase<any> {

    @property(cc.Label)
    nickname: cc.Label=null;
    @property(cc.Label)
    id: cc.Label=null;
    @property(cc.Sprite)
    header: cc.Sprite=null;

    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    private _lock = false;

    public InitShow() {
        if (this.ShowParam) {
            this.id.string = "ID:" + this.ShowParam["id"];
            this.nickname.string = this.ShowParam["nickname"];
            LoadHeader(this.ShowParam["header"], this.header);
        }
    }

    public Bind() {
        if (this._lock) return;
        this._lock = true;
        const action = new ActionNet(this, this.Success, this.Error);
        const data = WebRequest.DefaultData();
        data.AddOrUpdate("agentid", this.ShowParam.id);
        // WebRequest.userinfo.bindagent(action, data);
    }

    private Success() {
        this._lock = false;
        this.UiManager.ShowTip("绑定成功,请到信件中查收奖励！");
        this.UiManager.CloseUi(UIName.Daili);
        this.UserInfo.userData.AgentId = parseInt(this.ShowParam.id);
        this.CloseClick();
    }
    private Error(e) {
        this._lock = false;
        cc.error(e);
    }
}