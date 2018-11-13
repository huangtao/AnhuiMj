import UIBase from "../../Base/UIBase";
import { WebRequest } from "../../../Net/Open8hb";
import { IDictionary } from "../../../Interface/IDictionary";
import Global from "../../../Global/Global";
import { Action, ActionNet } from "../../../CustomType/Action";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { FriendCircleMember } from "../../../CustomType/FriendCircleInfo";
import { LoadHeader } from "../../../Tools/Function";
import { UIName } from "../../../Global/UIName";

const { ccclass, property } = cc._decorator;

@ccclass
export class MemberUserItem extends UIBase<any> {
    public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;

    /**
     * 圈主头像
     */
    @property(cc.Sprite)
    sp_headImg: cc.Sprite = null;

    /**
     * 管理员文字图标
     */
    @property(cc.Sprite)
    sp_adminIcon: cc.Sprite=null;

    /**
     * 点击事件回调
     */
    public _clickCb: Action = null;

    public set ClickAction(act: Action) {
        this._clickCb = act;
    }

    public get ClickAction(): Action {
        return this._clickCb;
    }

    private _showData: FriendCircleMember = null;

    /**
     * @Author   WangHao
     * @DateTime 2018-08-04
     * @Desc     头像点击事件
     */
    public headClickEvent(){
        if (this.ClickAction) {
            this.ClickAction.Run([this._showData]);
            return;
        }

        // 显示个信息框
        Global.Instance.UiManager.ShowUi(UIName.MemberPlayerInfo,this._showData);
    }

    public initShow(data: FriendCircleMember) {
        if (!data) {
            return;
        }

        this._showData = data;
        // 显示头像
        if (data.header && this.sp_headImg) {
            LoadHeader(data.header,this.sp_headImg);
        }

        // 显示头像
        if (data.isAdmin > 0 && this.sp_adminIcon) {
            this.sp_adminIcon.node.active = true;
        }else{
            this.sp_adminIcon.node.active = false;
        }
    }
}