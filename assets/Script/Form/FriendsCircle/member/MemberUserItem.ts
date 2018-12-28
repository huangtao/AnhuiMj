import UIBase from "../../Base/UIBase";
import { WebRequest } from "../../../Net/Open8hb";
import { IDictionary } from "../../../Interface/IDictionary";
import Global from "../../../Global/Global";
import { Action, ActionNet } from "../../../CustomType/Action";
import { FriendCircleMember } from "../../../CustomType/FriendCircleInfo";
import { LoadHeader } from "../../../Tools/Function";
import ScrollHelperItem from "../../../utils/ScrollHelperItem";
import { UIName } from "../../../Global/UIName";

const { ccclass, property } = cc._decorator;

@ccclass
export class MemberUserItem extends ScrollHelperItem {
    public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;

    /**
     * 圈主头像
     */
    @property(cc.Sprite)
    sp_headImg: cc.Sprite = null;

    /**
     * 昵称
     */
    @property(cc.Label)
    lab_nicName: cc.Label = null;

    /**
     * ID
     */
    @property(cc.Label)
    lab_userId: cc.Label = null;

    /**
     * 局数
     */
    @property(cc.Label)
    lab_gameNum: cc.Label = null;

    /**
     * 胜/败
     */
    @property(cc.Label)
    lab_winFail: cc.Label = null;

    /**
     * 大赢家
     */
    @property(cc.Label)
    lab_bigWin: cc.Label = null;

    /**
     * 积分
     */
    @property(cc.Label)
    lab_money: cc.Label = null;



    /**
     * 展开按钮
     */
    @property(cc.Sprite)
    sp_openBtn: cc.Sprite = null;

    /**
     * 管理员文字图标
     */
    @property(cc.Sprite)
    sp_adminIcon: cc.Sprite = null;

    /**
     * 头像
     */
    @property(cc.Sprite)
    sp_head: cc.Sprite = null;

    /**
     * 心图标
     */
    @property(cc.Sprite)
    sp_heart: cc.Sprite = null;


    /**
     * 玩家身份或者状态图标
     */
    @property([cc.SpriteFrame])
    frame_banOrIdentify: cc.SpriteFrame[] = [];

    /**
     * 心图标
     */
    @property([cc.SpriteFrame])
    frame_heartFlag: cc.SpriteFrame[] = [];

    // 查看个人信息按钮点击事件
    private _openPlayerInfolAct: Action = null;

    get OpenPlayerInfoHandle(): Action {
        return this._openPlayerInfolAct;
    }

    set OpenPlayerInfoHandle(act: Action) {
        this._openPlayerInfolAct = act;
    }

    // 展开按钮事件
    private _recordListAct: Action = null;
    get RecordDetailHandle(): Action {
        return this._recordListAct;
    }

    set RecordDetailHandle(act: Action) {
        this._recordListAct = act;
    }

    // 点心按钮事件回调
    private _heartFlagAct: Action = null;

    get HeartFlagActHandle(): Action {
        return this._heartFlagAct;
    }

    set HeartFlagActHandle(act: Action) {
        this._heartFlagAct = act;
    }

    private _showData: FriendCircleMember = null;
    public get ShowData(): any { return this._showData };

    // 当前战绩详情点开状态
    private _recordDetailOpen: boolean = false;

    public initShow(data: FriendCircleMember) {
        if (!data) {
            return;
        }

        this._showData = data;
        // 显示头像
        if (data.picfile && this.sp_headImg) {
            LoadHeader(data.picfile, this.sp_headImg);
        } else {
            LoadHeader("", this.sp_headImg);
        }

        let frameStatus: cc.SpriteFrame = null;
        this.sp_adminIcon.node.active = true;

        // 显示职位或状态图标
        if (data.bantype > 0) {
            // 禁玩状态
            frameStatus = this.frame_banOrIdentify[4];
        } else {
            let isAdmin = parseInt(data.isadmin);

            if (0 == isAdmin) {
                this.sp_adminIcon.node.active = false;
            } else {
                frameStatus = this.frame_banOrIdentify[isAdmin];
            }
        }

        if (this.sp_adminIcon.node.active && frameStatus) {
            this.sp_adminIcon.spriteFrame = frameStatus;
        }

        // 心图标显示
        if (data.flag > 0) {
            this.sp_heart.spriteFrame = this.frame_heartFlag[1];
        } else {
            this.sp_heart.spriteFrame = this.frame_heartFlag[0];
        }

        this.lab_nicName.string = data.nickname;
        this.lab_userId.string = data.userid + "";
        this.lab_gameNum.string = data.cnt + "";
        this.lab_winFail.string = data.victory + "/" + data.fail;
        this.lab_bigWin.string = data.userwin + "";
        this.lab_money.string = data.moneynum + "";
    }

    /**
     * 点心按钮事件
     */
    public btnHeartFlagClickEvent() {
        if (this._heartFlagAct) {
            this._heartFlagAct.Run([this]);
            return;
        }
    }

    /**
     * 更新心图标显示
     */
    public refreshHeartIcon(status: number) {
        if (typeof status != "number") {
            return;
        }

        if (!this.frame_heartFlag[status]) {
            return;
        }

        // 心图标显示
        this.sp_heart.spriteFrame = this.frame_heartFlag[status];
    }

    /**
     * 更新玩家禁玩状态
     */
    public updatePlayerBanStatusShow(bantype: number) {
        if (bantype > 0) {
            // 禁玩状态
            this.sp_adminIcon.node.active = true;
            this.sp_adminIcon.spriteFrame = this.frame_banOrIdentify[4];
        } else {
            let isAdmin = parseInt(this._showData.isadmin);
   
            if (0 == isAdmin) {
                this.sp_adminIcon.node.active = false;
            } else {
                if (this.sp_adminIcon.node.active) {
                    this.sp_adminIcon.spriteFrame = this.frame_banOrIdentify[isAdmin];
                }
            }
        }
    }

    /**
     * 个人信息按钮弹框
     */
    public btnPersonInfoFormClickEvent() {
        if (this._openPlayerInfolAct) {
            this._openPlayerInfolAct.Run([this]);
            return;
        }
    }

    /**
     * 设置展开按钮开关状态
     */
    public setOpenBtnStatus(status: boolean) {
        if (this.sp_openBtn) {
            let scaleY = status ? -1 : 1;
            this.sp_openBtn.node.scaleY = scaleY;
        }
    }

    /**
    * 展开战绩详情按钮
    */
    public btnRecordDetailClickEvent() {
        this._recordDetailOpen = !this._recordDetailOpen;

        if (this._recordListAct) {
            this._recordListAct.Run([this]);
            return;
        }
    }
}