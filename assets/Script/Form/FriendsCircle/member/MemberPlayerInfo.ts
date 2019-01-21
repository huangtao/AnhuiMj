import UIBase from "../../Base/UIBase";
import { Action, ActionNet } from "../../../CustomType/Action";
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
     * 踢人按钮
     */
    @property(cc.Button)
    btn_kick: cc.Button = null;


    /**
     * 禁玩按钮
     */
    @property(cc.Button)
    btn_ban: cc.Button = null;

    /**
     * 解除禁玩按钮
     */
    @property(cc.Button)
    btn_relieve: cc.Button = null;

    public InitShow() {
        let data: FriendCircleMember = this.ShowParam;

        if (!data) {
            return;
        }

        // 显示头像
        if (data.picfile && this.sp_headImg) {
            LoadHeader(data.picfile, this.sp_headImg);
        } else {
            LoadHeader("", this.sp_headImg);
        }

        if (this.lab_nicakName) {
            this.lab_nicakName.string = data.nickname;
        }

        if (this.lab_userId) {
            this.lab_userId.string = data.userid + "";
        }

        if (this.lab_gameTimes) {
            this.lab_gameTimes.string = "局数：" + data.cnt;
        }

        if (this.lab_lastTime) {
            // this.lab_lastTime.string = data.lastTime;
        }

        let isadmin = FriendCircleDataCache.Instance.selfIsAdministrator();

        if (isadmin) {
            this.btn_kick.node.active = true;
        } else {
            this.btn_kick.node.active = false;
        }

        this.btn_kick.interactable = isadmin;

        let userId = this.DataCache.UserInfo.userData.UserID;
        // 自己不显示踢出按钮
        if (userId == data.userid) {
            this.btn_kick.node.active = false;
        }

        if (data.bantype > 0) {
            this.btn_ban.node.active = false;
            this.btn_relieve.node.active = true;
        } else {
            this.btn_relieve.node.active = false;
            this.btn_ban.node.active = true;
        }
    }

    /**
     * 禁玩按钮事件
     */
    public btnBanClick() {
        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        let curRuleInfo = FriendCircleDataCache.Instance.CurSelectedRule;
        if (!curFriendCircle || !this.ShowParam || !curRuleInfo) {
            cc.log("--- erro: friend rule is null!");
            return;
        }

        let groupId = curFriendCircle.ID;
        let userId = this.ShowParam.userid;
        this.UiManager.ShowLoading("正在执行操作...");
        FriendCircleWebHandle.GroupUserGameBan(parseInt(groupId), 2, 0, curRuleInfo.gameId, "A", parseInt(userId), new Action(this, (res) => {
            this.UiManager.CloseLoading();

            if (res.status != "success") {
                this.UiManager.CloseLoading();
                this.UiManager.ShowTip("请求数据失败!");
                return;
            }

            this.UiManager.ShowTip("操作成功!")
            this.btn_ban.node.active = false;
            this.btn_relieve.node.active = true;
        }));
    }

    /**
     * 解除禁玩按钮事件
     */
    public bntRelieveClick() {
        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        let curRuleInfo = FriendCircleDataCache.Instance.CurSelectedRule;
        if (!curFriendCircle || !this.ShowParam || !curRuleInfo) {
            return;
        }

        let groupId = curFriendCircle.ID;
        let userId = this.ShowParam.userid;

        this.UiManager.ShowLoading("正在执行操作...");
        FriendCircleWebHandle.GroupUserGameBan(parseInt(groupId), 2, 0, curRuleInfo.gameId, "D", parseInt(userId), new Action(this, (res) => {
            this.UiManager.CloseLoading();
            if (res.status != "success") {
                this.UiManager.CloseLoading();
                this.UiManager.ShowTip("请求数据失败!");
                return;
            }

            this.UiManager.ShowTip("操作成功!")
            this.btn_ban.node.active = true;
            this.btn_relieve.node.active = false;
        }));
    }

    /**
     * 踢出亲友圈按钮事件
     */
    public bntKickClick() {
        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;

        if (!curFriendCircle || !this.ShowParam) {
            return;
        }

        let groupId = curFriendCircle.ID;
        let userId = this.ShowParam.userid;
        FriendCircleWebHandle.kickMember(parseInt(userId), parseInt(groupId));
    }
}