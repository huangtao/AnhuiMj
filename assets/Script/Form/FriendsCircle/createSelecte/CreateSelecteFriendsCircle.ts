import { WebRequest } from "../../../Net/Open8hb";
import { IDictionary } from "../../../Interface/IDictionary";
import { LoadHeader } from "../../../Tools/Function"
import UIBase from "../../Base/UIBase";
import UiManager from "../../../Manager/UiManager";
import Global from "../../../Global/Global";
import { Action, ActionNet } from "../../../CustomType/Action";
import { GameCachePool } from "../../../Global/GameCachePool";
import { HallNodePools } from "../../../Global/HallNodePools";
import { EventCode } from "../../../Global/EventCode";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { UIName } from "../../../Global/UIName";
import { FriendsCircleListItem } from "./FriendsCircleListItem";
import FriendCircleWebHandle from "../FriendCircleWebHandle";
import FriendCircleDataCache from "../FriendCircleDataCache";
import { PlayEffect } from "../../../Tools/Function";

import UrlCtrl from "../../../Net/UrlCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CreateSelecteFriendsCircle extends UIBase<any> {
    public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;
    public get isPlayPopAction(): boolean { return false; }
    /**
     * 加入群组或者创建群组操作面板
     */
    @property(cc.Node)
    joinOrCreateGroup: cc.Node = null;

    /**
     * 列表项
     */
    @property(cc.Prefab)
    groupItemPrefab: cc.Node = null;

    /**
      * 玩家昵称
      */
    @property(cc.Label)
    lab_nickname: cc.Label = null;

    /**
     * 玩家ID
     */
    @property(cc.Label)
    lab_ID: cc.Label = null;

    /**
     * 玩家头像
     */
    @property(cc.Sprite)
    sp_headImg: cc.Sprite = null;

    /**
     * 亲友圈帮助提示框
     */
    @property(cc.Node)
    node_help: cc.Node = null;

    // 是否在正在请求
    private bRequestIng: boolean = false;

    protected OnShow() {
        super.OnShow();
        
        // 显示玩家头像、ID
        let userInfo = this.DataCache.UserInfo.userData;

        // ID
        this.lab_ID.string = String(userInfo.UserID);

        // 头像
        LoadHeader(userInfo.Header, this.sp_headImg);

        // 昵称
        this.lab_nickname.string = userInfo.NickName;

        // 先清空亲友圈数据
        FriendCircleDataCache.Instance.clearData();

        // 拉取亲友圈列表
        this.requestFriendCircleList();
    }

    /**
     * 设置
     */
    private settingClick() {
        Global.Instance.UiManager.ShowUi(UIName.Setting);
    }

    /**
     * 邮件
     */
    private emailClick() {
        Global.Instance.UiManager.ShowUi(UIName.Email);
    }

    /**
     * 刷新列表显示
     */
    private refreshListShow() {
        this.joinOrCreateGroup.removeAllChildren();
        let data = FriendCircleDataCache.Instance.FriendCircleList;
        let length = data.Count;
        let values = data.Values;
        // 默认创建4个
        if (length < 4 || length > 4) {
            length = 4;
        }

        for (var i = 0; i < length; ++i) {
            // 创建Item
            let item = cc.instantiate(this.groupItemPrefab);
            const action = new Action(this, this.joinOrEnterCircle);
            const component = item.getComponent<FriendsCircleListItem>(FriendsCircleListItem);

            if (i < length) {
                component.setData(values[i]);
            } else {
                component.setData(null);
            }

            component.action = action;
            this.joinOrCreateGroup.addChild(item);
        }
    }

    /**
     * 创建亲友圈
     */
    public createBtnCllickEventHandle() {
        // 判断是否已经成为代理
        let agentId = this.DataCache.UserInfo.LinkAgentId;

        if (agentId > 0) {
            let action = new Action(this, this.createCircleCallback);
            this.UiManager.ShowUi(UIName.CreateFriendCircle, action, null);
        } else {
            this.UiManager.ShowUi(UIName.CreateFriendCircleTip);
        }
    }

    /**
     * 创建亲友圈回调
     */
    public createCircleCallback(obj: any) {
        // 重新请求亲友圈列表
        this.requestFriendCircleList();
    }

    /**
     * 请求亲友圈列表
     */
    public requestFriendCircleList(): void {
        if (this.bRequestIng) {
            this.UiManager.ShowTip('您的操作过于频繁，请稍后再试');
            return;
        }

        this.bRequestIng = true;

        let action = new Action(this, (args) => {
            cc.info('--- requestFriendCircleList', args);
            this.bRequestIng = false;

            if ("success" != args.status) {
                this.UiManager.ShowTip("创建亲友圈失败!")
                return;
            } else {
                this.refreshListShow();
            }
        });

        FriendCircleWebHandle.requestFriendCircleList(action);
    }

    /**
     * 加入或进入亲友圈获取玩法列表
     */
    public joinOrEnterCircle(obj: any) {
        // 判断是加入还是进入
        if (obj.isJoin) {
            // 弹出加入亲友圈界面
            this.UiManager.ShowUi(UIName.JoinRoom, "FriendCircle");
            let act = new Action(this, (args) => {
                // 关闭加入房间界面
                this.UiManager.CloseUi(UIName.JoinRoom);
                this.UiManager.ShowTip('已申请,请联系圈主审核!');

                // 再次请求亲友圈列表进行刷新
                this.requestFriendCircleList();
            });

            FriendCircleWebHandle.setJoinFriendCircleHandle(act);
        } else {
            let groupId = obj.circleInfo.ID;
            let act = new Action(this, (res) => {
                if ('success' != res.status) {
                    return;
                }

                // 关闭当前界面
                this.CloseClick();

                // 设置当前进入的亲友圈
                FriendCircleDataCache.Instance.CurEnterFriendCircle = obj.circleInfo;
                // 进入亲友圈
                this.UiManager.ShowUi(UIName.FriendCircle, obj.circleInfo);
            });

            this.UiManager.ShowLoading('正在进入...');
            FriendCircleWebHandle.getMemberList(groupId, 0, 24, act);
        }
    }

    /**
     * 刷新按钮
     */
    public btnRefreshClickEventHandle() {
        PlayEffect(cc.url.raw("resources/Sound/close_panel.mp3"));
        // 拉取亲友圈列表
        this.requestFriendCircleList();
    }

    /**
     * 帮助按钮处理
     */
    public helpBtnCllickEventHandle() {
        if (this.node_help) {
            this.node_help.active = !this.node_help.activeInHierarchy;
        }
    }
}
