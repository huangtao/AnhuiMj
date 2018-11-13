import UIBase from "../../Base/UIBase";
import Global from "../../../Global/Global";
import { Action, ActionNet } from "../../../CustomType/Action";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { FriendCircleMember } from "../../../CustomType/FriendCircleInfo";
import { LoadHeader } from "../../../Tools/Function";
import FriendCircleWebHandle from "../FriendCircleWebHandle";
import FriendCircleDataCache from "../FriendCircleDataCache";

const { ccclass, property } = cc._decorator;

@ccclass
export class MemberPlayerInfo extends UIBase<any> {
    public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;

    /**
     * 头像
     */
    @property(cc.Sprite)
    sp_headImg: cc.Sprite = null;

    /**
     * 昵称
     */
    @property(cc.Label)
    lab_nicakName: cc.Label = null;

    /**
     * 玩家ID
     */
    @property(cc.Label)
    lab_userId: cc.Label = null;

    /**
     * 局数
     */
    @property(cc.Label)
    lab_gameTimes: cc.Label = null;

    /**
     * 最后游戏时间
     */
    @property(cc.Label)
    lab_lastTime: cc.Label = null;

    /**
     * 踢出亲友圈
     */
    @property(cc.Button)
    btn_kick: cc.Button = null;

    public InitShow() {
    	let data: FriendCircleMember = this.ShowParam;

        if (!data) {
            return;
        }

        // 显示头像
        if (data.header && this.sp_headImg) {
            LoadHeader(data.header,this.sp_headImg);
        }

        if (this.lab_nicakName) {
        	this.lab_nicakName.string = data.name;
        }

        if (this.lab_userId) {
        	this.lab_userId.string = data.userId;
        }

        if (this.lab_gameTimes) {
        	// this.lab_gameTimes.string = data.gameTimes;
        }

        if (this.lab_lastTime) {
        	// this.lab_lastTime.string = data.lastTime;
        }

        let isAdmin = FriendCircleDataCache.Instance.selfIsAdministrator();

        if (this.btn_kick) {
            this.btn_kick.node.active = false;
            let userInfo = this.DataCache.UserInfo.userData;
            // 非管理员不显示踢出亲友圈按钮
            if (isAdmin) {
                this.btn_kick.node.active = true;
            }
        }
    }

    /**
     * 踢出亲友圈按钮事件
     */
    public bntKickClick(){
        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;

        if (!curFriendCircle || !this.ShowParam) {
            return;
        }

        let groupId = curFriendCircle.ID;
        let userId = this.ShowParam.userId;
        FriendCircleWebHandle.kickMember(parseInt(userId),parseInt(groupId));
    }
}