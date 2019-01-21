import { LoadHeader, StrToObject } from "../../../Tools/Function"
import Global from "../../../Global/Global";
import { Action, ActionNet } from "../../../CustomType/Action";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { UIName } from "../../../Global/UIName";
import { FriendsCircleListItem } from "./FriendsCircleListItem";
import FriendCircleWebHandle from "../FriendCircleWebHandle";
import FriendCircleDataCache from "../FriendCircleDataCache";
import { LocalStorage } from "../../../CustomType/LocalStorage";
import { FriendCircleRule, FriendCircleInfo } from "../../../CustomType/FriendCircleInfo";
import { FriendCircleWanfaItem } from "./FriendCircleWanfaItem";
import Dictionary from "../../../CustomType/Dictionary";
import SendMessage from "../../../Global/SendMessage";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CreateSelecteFriendsCircle extends cc.Component {
    /**
     * 加入群组或者创建群组操作面板
     */
    @property(cc.Node)
    joinOrCreateGroup: cc.Node = null;

    /**
     * 亲友圈列表项
     */
    @property(cc.Prefab)
    groupItemPrefab: cc.Node = null;


    /**
     * 玩法面板
     */
    @property(cc.Layout)
    layout_Wanfa: cc.Layout = null;

    /**
     * 玩法列表项
     */
    @property(cc.Prefab)
    prefab_wanfa: cc.Node = null;

    /** 
     * 亲友圈信息面板
     */
    @property(cc.Node)
    node_friendInfo: cc.Node = null;

    /** 
     * 没有亲友圈的面板
     */
    @property(cc.Node)
    node_noFriend: cc.Node = null;

    /** 
     * 没有玩法的面板
     */
    @property(cc.Node)
    node_noWanfa: cc.Node = null;

    /** 
     * 玩法列表的面板
     */
    @property(cc.Node)
    node_wanfa: cc.Node = null;

    /** 
     * 钻石数量
     */
    @property(cc.Label)
    lab_diamond: cc.Label = null;

    /** 
     * 七豆数量
     */
    @property(cc.Label)
    lab_qidou: cc.Label = null;

    /** 
     * 切换按钮
     */
    @property(cc.Button)
    btn_change: cc.Button = null;

    /** 
     * 战绩按钮
     */
    @property(cc.Button)
    btn_record: cc.Button = null;

    /** 
     * 消息红点
     */
    @property(cc.Node)
    sp_msgRedPoint: cc.Node = null;


    /**
     * 当前选中的亲友圈Item
     */
    private _curSelectedItem: FriendsCircleListItem = null;

    // 是否在正在请求
    private bRequestIng: boolean = false;

    /**
     * 选择亲友圈点击事件注册
     */
    private _selectFriendClickEvent: Action = null;
    public registSelectFriendClickEvent(act: Action) { this._selectFriendClickEvent = act };

    /**
     * 选择亲友圈玩法选中事件注册
     */
    private _selectFriendRuleClickEvent: Action = null;
    public registSelectFriendRuleClickEvent(act: Action) { this._selectFriendRuleClickEvent = act };

    /**
     * 玩法列表Item组件
     */
    private _wanfaItemComList: Dictionary<number, FriendCircleWanfaItem>;

    public init() {
        // 初始化状态显示
        this.node_friendInfo.active = false;
        this.node_noFriend.active = false;
        this.node_noWanfa.active = false;
        this.btn_change.node.active = false;
        this.btn_record.node.active = false;

        this.joinOrCreateGroup.removeAllChildren();
        this.layout_Wanfa.node.removeAllChildren();

        // 拉取亲友圈列表
        this.requestFriendCircleList();

        // 钻石七豆数量显示
        if (!Global.Instance.DataCache.UserInfo
            || !Global.Instance.DataCache.UserInfo.userData) {
            return;
        }

        if (cc.isValid(this.lab_qidou) && cc.isValid(this.lab_diamond)) {
            if (!Global.Instance.DataCache.UserProp) {
                return;
            }

            // 七豆
            this.lab_qidou.string = Global.Instance.DataCache.UserProp.GetValue(QL_Common.CurrencyType.QiDou) + "";

            // 钻石
            this.lab_diamond.string = Global.Instance.DataCache.UserProp.GetValue(QL_Common.CurrencyType.Diamond) + ""
        }

        /**
         * 设置添加玩法监听
         */
        let act: Action = new Action(this, this.addRuleHandle);
        FriendCircleWebHandle.setAddRuleHandle(act);
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
     * 刷新亲友圈列表显示
     */
    private refreshFriendCircleListShow() {
        this.joinOrCreateGroup.removeAllChildren();
        let friendCircleList = FriendCircleDataCache.Instance.FriendCircleList;
        let friendNum = friendCircleList.Count;
        let values = friendCircleList.Values;

        // 先获取本地存储的上次选择的亲友圈及玩法信息
        let local_info: string = FriendCircleDataCache.Instance.getLocalStorage("localFriendCircleInfo");
        let localFriendCircleInfo: any = StrToObject(local_info);

        if (localFriendCircleInfo && !FriendCircleDataCache.Instance.getFriendCircleById(localFriendCircleInfo.groupId)) {
            localFriendCircleInfo = null;
            FriendCircleDataCache.Instance.saveToLocalStorage("localFriendCircleInfo", "");
        }

        if (this.node_friendInfo && this.node_noFriend) {
            if (0 == friendNum) {
                this.node_friendInfo.active = false;
                this.node_wanfa.active = false;
                this.node_noFriend.active = true;
            } else {
                this.node_friendInfo.active = true;
                this.node_wanfa.active = true;
                this.node_noFriend.active = false;
            }
        }

        // 默认创建4个
        if (friendNum < 4 || friendNum > 4) {
            friendNum = 4;
        }

        for (var i = 0; i < friendNum; ++i) {
            // 创建Item
            let item = cc.instantiate(this.groupItemPrefab);
            const friendItem = item.getComponent<FriendsCircleListItem>(FriendsCircleListItem);
            const action = new Action(this, this.joinOrEnterCircle);
            friendItem.clickAction = action;

            if (i < friendNum) {
                friendItem.setData(values[i]);
            } else {
                friendItem.setData(null);
            }

            if (!localFriendCircleInfo && 0 == i && friendCircleList.Count > 0) {
                // 默认选中第一个
                friendItem.setSelected();
            }

            // 选中本地记忆的的亲友圈
            if (localFriendCircleInfo && values[i] && values[i].ID == localFriendCircleInfo.groupId) {
                friendItem.setSelected();
            }

            this.joinOrCreateGroup.addChild(item);
        }

        // 如果亲友圈数量为0则显示没有亲友圈提示
        if (0 == friendNum) {
            // this.layout_Wanfa.node.active = false;
            this.node_wanfa.active = false;
            this.node_noFriend.active = true;
        }
    }

    /**
     * 刷新亲友圈玩法列表显示
     */
    private refreshRuleListShow(ruleList: any) {
        //先清空节点重新创建
        // this.layout_Wanfa.node.active = true;
        this.node_wanfa.active = true;
        this.node_noWanfa.active = false;

        if (!this._wanfaItemComList) {
            this._wanfaItemComList = new Dictionary<number, FriendCircleWanfaItem>();
        }

        this._wanfaItemComList.Clear();
        this.layout_Wanfa.node.removeAllChildren();
        let list = ruleList;

        if (!list) {
            list = [];
        }

        if (0 == list.length) {
            // 如果不是圈主则显示没有创建玩法提示
            if (!FriendCircleDataCache.Instance.selfIsAdministrator()) {
                this.node_noWanfa.active = true;
                return;
            }
        }

        let length = list.length;
        // 默认创建4个
        if (length < 4 || length > 4) {
            length = 4;
        }

        // 先获取本地存储的上次选择的亲友圈及玩法信息
        let local_info: string = FriendCircleDataCache.Instance.getLocalStorage("localFriendCircleInfo");
        let localFriendCircleInfo: any = StrToObject(local_info);
        let isAdmin = FriendCircleDataCache.Instance.selfIsAdministrator();

        for (let i = 0; i < length; ++i) {
            // 创建Item
            let item = cc.instantiate(this.prefab_wanfa);
            const wanfaItem: FriendCircleWanfaItem = item.getComponent(FriendCircleWanfaItem);
            let ruleInfo: FriendCircleRule = list[i];
            
            wanfaItem.initShow(ruleInfo, isAdmin, i + 1);

            // 设置"当前图标显示"
            if (ruleInfo && localFriendCircleInfo && localFriendCircleInfo.ruleId == ruleInfo.Id) {
                // 设置当前选择的玩法
                FriendCircleDataCache.Instance.CurSelectedRule = ruleInfo;
                wanfaItem.setCurIconShow(true);
            }

            if (ruleInfo) {
                this._wanfaItemComList.AddOrUpdate(ruleInfo.Id, wanfaItem);
                // 请求桌子列表
                SendMessage.Instance.QueryGroupTableList(ruleInfo.friendId, ruleInfo.Id);
            }

            wanfaItem.registSelectFriendRuleClickEvent(new Action(this, this.selectFriendRule));
            this.layout_Wanfa.node.addChild(item);
        }

        // 如果之前没有选择过玩法则默认选择玩法列表的第一个
        if (!FriendCircleDataCache.Instance.CurSelectedRule && list.length > 0) {
            FriendCircleDataCache.Instance.CurSelectedRule = list[0];
        }
    }

    /**
     * 创建亲友圈
     */
    public createBtnCllickEventHandle() {
        // 判断是否已经成为代理
        let agentId = Global.Instance.DataCache.UserInfo.LinkAgentId;

        if (agentId > 0) {
            let action = new Action(this, this.createCircleCallback);
            Global.Instance.UiManager.ShowUi(UIName.CreateFriendCircle, action, null);
        } else {
            Global.Instance.UiManager.ShowUi(UIName.CreateFriendCircleTip);
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
     * 添加规则消息回调
     */
    public addRuleHandle() {
        // 关闭界面
        Global.Instance.UiManager.CloseUi(UIName.SelectRule);
        Global.Instance.UiManager.CloseUi(UIName.SelectGame);

        let friendInfo = FriendCircleDataCache.Instance.CurEnterFriendCircle;

        // 创建规则成功 刷新玩法列表
        this.requestFriendCircRuleList(parseInt(friendInfo.ID));
    }

    /**
     * 请求亲友圈列表
     */
    public requestFriendCircleList(): void {
        if (this.bRequestIng) {
            Global.Instance.UiManager.ShowTip('您的操作过于频繁，请稍后再试');
            return;
        }

        this.bRequestIng = true;

        let action = new Action(this, (args) => {
            cc.info('--- requestFriendCircleList', args);
            this.bRequestIng = false;

            if ("success" != args.status) {
                Global.Instance.UiManager.ShowTip("获取亲友圈列表失败!")
                return;
            } else {
                // 更新界面显示
                let data = FriendCircleDataCache.Instance.FriendCircleList;
                this.refreshFriendCircleListShow();
            }
        });

        FriendCircleWebHandle.requestFriendCircleList(action);
    }

    /**
     * 请求玩法列表
     */
    public requestFriendCircRuleList(groupId: number) {
        let groupId_ = groupId;
        let act = new Action(this, (res) => {
            let ruleInfo = res;
            FriendCircleWebHandle.getMemberList(groupId_ + "", 0, 10, new Action(this, (res) => {
                this.refreshRuleListShow(ruleInfo);
                // 点击事件回调
                if (this._selectFriendClickEvent) {
                    this._selectFriendClickEvent.Run([]);
                }
            }));
        });

        FriendCircleWebHandle.requestFriendCircRuleList(groupId_ + "", act);
    }

    /**
     * 加入或选择亲友圈
     */
    public joinOrEnterCircle(obj: any) {
        // 判断是加入还是进入
        if (obj.isJoin) {
            // 弹出加入亲友圈界面
            Global.Instance.UiManager.ShowUi(UIName.JoinRoom, "FriendCircle");
            let act = new Action(this, (args) => {
                // 关闭加入房间界面
                Global.Instance.UiManager.CloseUi(UIName.JoinRoom);
                Global.Instance.UiManager.ShowTip('已申请,请联系圈主审核!');

                // 再次请求亲友圈列表进行刷新
                this.requestFriendCircleList();
            });

            FriendCircleWebHandle.setJoinFriendCircleHandle(act);
        } else {

            // 清空当前亲友圈
            FriendCircleDataCache.Instance.clearData();

            // 设置当前进入的亲友圈
            let friendInfo: FriendCircleInfo = obj.circleInfo;
            FriendCircleDataCache.Instance.CurEnterFriendCircle = friendInfo;

            // 请求消息列表
            FriendCircleWebHandle.getMessageList(friendInfo.ID, new Action(this, (this.updateMsgRedPointShow)));

            // // 点击事件回调
            // if (this._selectFriendClickEvent) {
            //     this._selectFriendClickEvent.Run([]);
            // }

            // 更新Item选中状态显示
            let friendItem = <FriendsCircleListItem>obj.item;

            if (this._curSelectedItem == friendItem) {
                return;
            }

            if (friendItem) {
                if (this._curSelectedItem) {
                    this._curSelectedItem.cancelSelectedShow();
                }

                friendItem.setSelectedStatusShow();
                this._curSelectedItem = friendItem;
            }

            // 选择亲友圈,请求亲友圈玩法列表
            this.requestFriendCircRuleList(parseInt(obj.circleInfo.ID));
        }
    }

    /**
     * 更新消息红点显示
     */
    public updateMsgRedPointShow() {
        if (FriendCircleDataCache.Instance.UnDealMessageList.Count > 0 && FriendCircleDataCache.Instance.selfIsAdministrator()) {
            this.sp_msgRedPoint.active = true;
        } else {
            this.sp_msgRedPoint.active = false;
        }
    }

    /**
     * 请求桌子列表回调
     */
    public requestTableCb(cm: any) {
        let g = cm as QL_Common.MSG_S_GroupTableList;
        if (!g) return;

        let wanfaItem = this._wanfaItemComList.GetValue(g.RuleId);

        if (wanfaItem) {
            wanfaItem.setTableNum(g.Total);
        }
    }

    /**
     * 选择亲友圈玩法事件
     */
    public selectFriendRule(ruleInfo: FriendCircleRule) {
        let friendInfo = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        let userId = Global.Instance.DataCache.UserInfo.userData.UserID;

        if (!friendInfo || !ruleInfo) {
            return;
        }

        Global.Instance.UiManager.ShowLoading("正在请求数据...");
        // 判断是否玩家被禁玩
        FriendCircleWebHandle.GroupUserGameBan(parseInt(friendInfo.ID), 2, 0, ruleInfo.gameId, "Q", userId, new Action(this, (res) => {
            Global.Instance.UiManager.CloseLoading();
            
            if ("success" != res.status) {
                return;
            }

            if (res.isBan) {
                Global.Instance.UiManager.ShowTip("您没有权限进入该玩法,请联系圈主!");
                return;
            }

            if (this._selectFriendRuleClickEvent) {
                this._selectFriendRuleClickEvent.Run([ruleInfo]);
            }

            this.btn_change.node.active = true;

        }));
    }

    /**
     * 玩家申请加入亲友圈消息推送
     */
    public userReqJoinMsg(eventData: any) {
        // 更新亲友圈红点显示

    }
}
