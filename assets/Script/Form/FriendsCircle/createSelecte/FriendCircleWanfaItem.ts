import { Action } from "../../../CustomType/Action";
import { FriendCircleInfo, FriendCircleRule } from "../../../CustomType/FriendCircleInfo";
import { LoadHeader } from "../../../Tools/Function";
import { LocalStorage } from "../../../CustomType/LocalStorage";
import FriendCircleDataCache from "../FriendCircleDataCache";
import SendMessage from "../../../Global/SendMessage";
import Global from "../../../Global/Global";
import { UIName } from "../../../Global/UIName";
import { QL_Common } from "../../../CommonSrc/QL_Common";

const { ccclass, property } = cc._decorator;
@ccclass
export class FriendCircleWanfaItem extends cc.Component {

    /**
     * 游戏名称
     */
    @property(cc.Label)
    lab_gameName: cc.Label = null;

    /**
     * 玩法
     */
    @property(cc.Label)
    lab_gameWafa: cc.Label = null;

    /**
     * 游戏状态
     */
    @property(cc.Label)
    lab_gameStatus: cc.Label = null;

    /**
     * 桌数
     */
    @property(cc.Label)
    lab_tableNum: cc.Label = null;

    /**
     * 游戏Icon列表
     */
    @property([cc.SpriteFrame])
    frame_gameIconArray: cc.SpriteFrame[] = [];

    /**
     * 游戏Icon
     */
    @property(cc.Sprite)
    sp_gameIcon: cc.Sprite = null;

    /**
     * 未解锁状态
     */
    @property(cc.Node)
    node_lockStatus: cc.Node = null;

    /**
     * 解锁状态
     */
    @property(cc.Node)
    node_unLockStatus: cc.Node = null;

    /**
     * "当前"图标
     */
    @property(cc.Node)
    node_curIcon: cc.Node = null;

    /**
     * 设置玩法按钮
     */
    @property(cc.Button)
    btn_settingRule: cc.Button = null;

    /**
     * 开启暂停按钮节点
     */
    @property(cc.Node)
    node_startOrPause: cc.Node = null;

    /**
     * 玩法介绍按钮
     */
    @property(cc.Button)
    btn_ruleDesc: cc.Button = null;


    /**
     * 玩法数据
     * @type {any}
     */
    private _ruleInfo: FriendCircleRule = null;

    /**
     * 是否已解锁
     */
    private _bUnlocked: boolean = false;

    /**
     * 是否是管理员
     */
    private _isAdmin: boolean = false;

    /**
     * 选择亲友圈玩法选中事件注册
     */
    private _selectFriendRuleClickEvent: Action = null;
    public registSelectFriendRuleClickEvent(act: Action) { this._selectFriendRuleClickEvent = act };

    public onLoad() {
    }

    /**
     * 初始化界面显示
     */
    public initShow(data: FriendCircleRule, isAdmin?: boolean) {
        this._ruleInfo = data;
        this._isAdmin = isAdmin;
        // 初始化默认显示
        if (this.node_unLockStatus && this.node_lockStatus && this.node_curIcon) {
            this.node_unLockStatus.active = false;
            this.node_lockStatus.active = true;
            this.node_curIcon.active = false;
        } else {
            return;
        }

        /*********************** 未解锁状态显示 ******************************************/
        if (!data) {
            this._bUnlocked = false;
            this.node_unLockStatus.active = false;
            this.node_lockStatus.active = true;
            return;
        }

        this._bUnlocked = true;

        /*********************** 未解锁状态显示 ******************************************/
        this.node_unLockStatus.active = true;
        this.node_lockStatus.active = false;

        if (this.lab_gameName) {
            this.lab_gameName.string = data.gameName;
        }

        // 玩法显示
        if (this.lab_gameWafa) {
            this.lab_gameWafa.string = data.ruleDesc;
        }

        // 桌数
        if (this.lab_tableNum) {
            this.lab_tableNum.string = /*data.tableNum*/ "99";
        }

        // 游戏状态(休息中...)
        if (this.lab_gameStatus) {
            this.lab_gameStatus.string = "";
        }

        // 游戏Icon
        if (this.sp_gameIcon) {
            let gameInfo: QL_Common.GameInfo = Global.Instance.DataCache.GameList.GetGame(data.gameId);

            if (!gameInfo) {
                return;
            }

            let frame_gameIcon = null;
            switch (gameInfo.GameType) {
                case QL_Common.GameType.ChessGame:
                    frame_gameIcon = this.frame_gameIconArray[0];
                    break;
                case QL_Common.GameType.Mahjong:
                    frame_gameIcon = this.frame_gameIconArray[1];
                    break;
                default:
                    cc.error("-- game type is not exit ", gameInfo.GameType);
                    break;
            }

            if (frame_gameIcon) {
                this.sp_gameIcon.spriteFrame = frame_gameIcon;
            }
        }


        /***************************** 根据权限显示控制各个功能的开放和隐藏 **********************************/

        this.node_startOrPause.active = false;
        this.btn_ruleDesc.node.active = false;
        this.btn_settingRule.node.active = false;

        // 变更和创建玩法权限(只有管理员或圈主有权限)
        if (FriendCircleDataCache.Instance.selfIsAdministrator()) {
            this.btn_settingRule.node.active = true;
        } else {
            this.btn_ruleDesc.node.active = true;
        }

        // 暂停、开启游戏功能（只有圈主有权限）
        /*if (FriendCircleDataCache.Instance.selfIsCircleOwner()) {
            this.node_startOrPause.active = true;
        }*/
    }

    /**
     * 更新桌数显示
     */
    public setTableNum(tableNum: number) {
        this.lab_tableNum.string = tableNum + "";
    }

    /**
     * 添加或变更玩法
     */
    public addRule() {
        // 创建玩法
        Global.Instance.UiManager.ShowUi(UIName.SelectGame, { act: null, isFriendCircle: true });
    }

    /**
     * 解锁或进入桌子列表
     */
    public btnUnlockOrEnterTableListClickEvent() {
        if (this._bUnlocked) {
            // 解锁状态 (进入桌子列表)
            // 记录当前进入的亲友圈和玩法
            let str = "groupId:" + this._ruleInfo.friendId + "|ruleId:" + this._ruleInfo.Id;
            LocalStorage.SetItem("localFriendCircleInfo", str);

            // 设置当前选择的玩法
            FriendCircleDataCache.Instance.CurSelectedRule = this._ruleInfo;

            if (this._selectFriendRuleClickEvent) {
                this._selectFriendRuleClickEvent.Run([this._ruleInfo]);
            }
        } else {
            // 未解锁

            // 非管理员不能创建规则
            if (!this._isAdmin) {
                Global.Instance.UiManager.ShowTip("圈主或管理员暂未设置玩法");
                return;
            }

            // 先判断是否满足条件再进行创建玩法
            // ................

            // 满足条件则添加玩法
            this.addRule();
        }
    }

    /**
     * 变更玩法按钮事件
     */
    public btnModifyClick() {
        // 先判断当前是否有桌子
        let tableList = FriendCircleDataCache.Instance.RoomTableList;

        if (tableList.Count > 0) {
            Global.Instance.UiManager.ShowTip('当前还有玩家在房间');
            return;
        }

        // 设置当前选择的玩法
        FriendCircleDataCache.Instance.CurSelectedRule = this._ruleInfo;

        // 创建玩法
        Global.Instance.UiManager.ShowUi(UIName.SelectGame,{act:null,isFriendCircle: true});
    }

    /**
     * 显示玩法
     */
    public btnShowWanfaClickEvent() {

    }

    /**
     * 设置"当前"图标显示
     */
    public setCurIconShow(isVisible: boolean = false) {
        if (this.node_curIcon) {
            this.node_curIcon.active = isVisible;
        }
    }
}