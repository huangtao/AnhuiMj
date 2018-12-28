import Global from "../../../Global/Global";
import { Action, ActionNet } from "../../../CustomType/Action";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { UIName } from "../../../Global/UIName";
import FriendCircleWebHandle from "../FriendCircleWebHandle";
import FriendCircleDataCache from "../FriendCircleDataCache";
import RoomRuleItem from "./RoomRuleItem";
import Dictionary from "../../../CustomType/Dictionary";
import { FriendCircleRule } from "../../../CustomType/FriendCircleInfo";
import SendMessage from "../../../Global/SendMessage";

const { ccclass, property } = cc._decorator;

/******************************** 普通场 ******************************/

@ccclass
export default class GeneralField extends cc.Component {
    /**
     * 创建玩法按钮
     */
    @property(cc.Button)
    createRuleBtn: cc.Button = null;

    /**
     * 刷新按钮
     */
    @property(cc.Button)
    refreshBtn: cc.Button = null;

    /**
     * 桌子模板
     */
    roomRuleModel: cc.Node = null;

    /**
     * 房间桌子预制体
     */
    @property(cc.Prefab)
    prefab_tableItem: cc.Prefab = null;

    /**
     * 桌子翻页容器
     */
    @property(cc.PageView)
    pageView_tableList: cc.PageView = null;

    /**
     * 桌子翻页容器
     */
    @property(cc.Prefab)
    prefab_RoomTableListPageItem: cc.Prefab = null;

    /**
     * 提示没有玩法
     */
    @property(cc.Label)
    lab_noRuleTip: cc.Label = null;

    /**
     * 是否正在请求
     */
    private _isRequesting = false;

    /**
     * 桌子节点列表
     */
    private _roomTableList: Dictionary<string, RoomRuleItem> = null;

    private get RoomTableList(): Dictionary<string, RoomRuleItem> {
        if (!this._roomTableList) {
            this._roomTableList = new Dictionary<string, RoomRuleItem>();
        }

        return this._roomTableList;
    }

    // 玩法信息
    private _ruleInfo: FriendCircleRule;

    /**
     * 是否是圈主
     */
    private _isCircleOwner: boolean = false;

    public onLoad() {
        console.log("onLoad");
    }

    public start() {

    }

    /**
     * 初始化数据
     */
    public initData(ruleInfo: FriendCircleRule, isCircleOwner: boolean) {
        this._isRequesting = false;
        this._ruleInfo = ruleInfo;
        this._isCircleOwner = isCircleOwner;

        // 设置初始状态
        if (this.lab_noRuleTip) {
            this.lab_noRuleTip.node.active = false;
        }

        this.btnRefreshClick();
    }

    /**
     * 请求亲友圈玩法
     */
    public requestFriendCircRuleList(cb?: Action) {
        // 请求亲友圈玩法信息
        var that = this;
        let _callback = cb;
        let action = new Action(this, (args) => {
            console.log(args);
            if (_callback) {
                _callback.Run([args])
            };

            if (!args) {
                Global.Instance.UiManager.ShowTip("获取亲友圈玩法信息失败!")
                return;
            } else {
                that.refreshRuleUIShow();
            }
        });

        if (this._ruleInfo) {
            FriendCircleWebHandle.requestFriendCircRuleList(this._ruleInfo.friendId + '', action);
        }
    }

    /** 
     * 刷新玩法显示
     */
    public refreshRuleUIShow() {
        let ruleInfo = FriendCircleDataCache.Instance.CurSelectedRule;

        if (ruleInfo && this.roomRuleModel) {
            let roomModel = <RoomRuleItem>this.roomRuleModel.getComponent("RoomRuleItem");
            roomModel.initData();
            roomModel.refreshTableShow(ruleInfo, null);
        }
    }

    /**
     * 创建游戏规则
     */
    public createGameRue() {
        Global.Instance.UiManager.ShowUi(UIName.SelectGame, { act: null, isFriendCircle: true });
    }

    /**
     * 更新桌子列表显示
     */
    private refreshRoomTableList() {
        if (!this.prefab_tableItem || !this.pageView_tableList) {
            return;
        }

        let keys = this.RoomTableList.Keys;

        // 先清空所有桌子
        this.pageView_tableList.removeAllPages();
        this.roomRuleModel = null;
        this.RoomTableList.Clear();

        // 重新创建桌子列表
        let roomTableList = FriendCircleDataCache.Instance.RoomTableList;
        let ruleInfo = FriendCircleDataCache.Instance.CurSelectedRule;

        if (!ruleInfo) {
            return;
        }
        
        // 获取游戏信息
        let roomInfo = Global.Instance.DataCache.RoomList.GetRoomByGameID(ruleInfo.gameId);
        let maxCount = roomInfo[0].MaxCount; // 人数

        keys = roomTableList.Keys;

        // 创建新桌子(每页显示6个)
        let tableCount = 0; // 桌子数量统计
        let curPage: any = null; // 当前页

        // 创建桌子模板

        let roomRuleModel: RoomRuleItem = null;

        if (!this.roomRuleModel) {
            this.roomRuleModel = cc.instantiate(this.prefab_tableItem);
            roomRuleModel = this.roomRuleModel.getComponent("RoomRuleItem");
            roomRuleModel.setTableInfo(null);
            roomRuleModel.isRuleModel = true;

            // 刷新玩法显示
            this.refreshRuleUIShow();
        }

        // 添加桌子模板
        curPage = cc.instantiate(this.prefab_RoomTableListPageItem);
        let layout = curPage.getComponent("cc.Layout");
        layout.node.addChild(this.roomRuleModel);
        this.pageView_tableList.addPage(curPage);
        tableCount++;

        for (let idx = 0; idx < roomTableList.Count; ++idx) {
            let talbleInfo: QL_Common.UserCreateTableInfo = roomTableList.GetValue(keys[idx]);

            // 游戏未已开始、或人数满了在准备中的桌子 并且不是自由创建的桌子
            if (!roomRuleModel.getTableInfo()
                && (QL_Common.UserCreateTableNoticeStatus.CreateTable == talbleInfo.status
                    && talbleInfo.PlayerCount < maxCount) && !talbleInfo.IsFreeCreate && !talbleInfo.IsFullUsered) {
                // 模板刷新 
                if (this.roomRuleModel) {
                    if (talbleInfo.status == QL_Common.UserCreateTableNoticeStatus.CreateTable) {
                        roomRuleModel.refreshTableShow(ruleInfo, talbleInfo);
                    }
                }
            } else if (talbleInfo.status != QL_Common.UserCreateTableNoticeStatus.TableGameOver) {
                // 创建Layout页Item
                if (tableCount % 6 == 0 && tableCount < roomTableList.Count + 1) {
                    curPage = cc.instantiate(this.prefab_RoomTableListPageItem);
                    this.pageView_tableList.addPage(curPage);
                }

                // 创建桌子
                let prefab = cc.instantiate(this.prefab_tableItem);
                let comp: RoomRuleItem = prefab.getComponent(RoomRuleItem);

                if (comp) {
                    comp.initData();
                    comp.refreshTableShow(ruleInfo, talbleInfo);
                    this.RoomTableList.AddOrUpdate(talbleInfo.TableId.toString(), comp);
                    let layout = curPage.getComponent("cc.Layout");
                    tableCount ++;
                    layout.node.addChild(prefab);
                }
            }
        }
    }

    /**
     * 刷新按钮事件
     */
    public btnRefreshClick() {
        if (this._isRequesting) {
            Global.Instance.UiManager.ShowTip('您的请求操作过于频繁!请稍后再试');
            return;
        }

        this._isRequesting = true;

        // 请求玩法列表
        this.requestFriendCircRuleList(new Action(this, (res) => {
            // 请求房间桌子列表
            this.requestTableList();
            // 请求亲友圈信息
            FriendCircleWebHandle.requestFriendCircleList();
        }));
    }

    /**
     * 请求桌子列表
     */
    public requestTableList() {
        SendMessage.Instance.QueryGroupTableList(this._ruleInfo.friendId, this._ruleInfo.Id);
    }
    /**
     * 消息回调
     */
    public OnMessageComeIn(cm: any) {
        let g = cm as QL_Common.MSG_S_GroupTableList;
        this._isRequesting = false;

        if (!g) return;
        if (this._ruleInfo.friendId != g.GroupId) {
            // 操作的房间列表不是当前选中的群组，直接返回
            return;
        }

        FriendCircleDataCache.Instance.addOrUpdateRoomTableList(g.Data);

        // 刷新桌子列表显示
        this.refreshRoomTableList();
    }
}
