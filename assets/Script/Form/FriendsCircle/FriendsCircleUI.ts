import { LoadHeader, MillisSecondToDate } from "../../Tools/Function"
import UIBase from "../Base/UIBase";
import Global from "../../Global/Global";
import { Action, ActionNet } from "../../CustomType/Action";
import { EventCode } from "../../Global/EventCode";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { UIName } from "../../Global/UIName";
import GeneralField from "./generalField/GeneralField";
import FriendCircleWebHandle from "./FriendCircleWebHandle";
import FriendCircleDataCache from "./FriendCircleDataCache";
import { FriendCircleInfo, FriendCircleRule, FriendCircleMember } from "../../CustomType/FriendCircleInfo";
import { StrToObject } from "../../Tools/Function";
import { ShareParam } from "../../CustomType/ShareParam";
import ConfigData from "../../Global/ConfigData";
import CreateSelecteFriendsCircle from "./createSelecte/CreateSelecteFriendsCircle";
import { LocalStorage } from "../../CustomType/LocalStorage";
import { SystmPushMessage } from "../../CustomType/SystmPushMsg";

const { ccclass, property } = cc._decorator;
@ccclass
export default class FriendsCircleUI extends UIBase<any> {
    public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;
    public get isPlayPopAction(): boolean { return false; }

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
     * 亲友圈ID
     */
    @property(cc.Label)
    lab_circleID: cc.Label = null;

    /**
     * 亲友圈昵称
     */
    @property(cc.Label)
    lab_circleIName: cc.Label = null;

    /**
    * 亲友圈人数
    */
    @property(cc.Label)
    lab_peopleNum: cc.Label = null;

    /**
     * 亲友公告
     */
    @property(cc.Label)
    lab_notice: cc.Label = null;

    /** 
     * 选择亲友圈面板节点
     */
    @property(cc.Node)
    node_selectFriendCircle: cc.Node = null;

    /** 
     * 普通场面板节点
     */
    @property(cc.Node)
    node_general: cc.Node = null;

    /** 
     * 比赛场面板节点
     */
    @property(cc.Node)
    node_match: cc.Node = null;

    /**
     * 我的战绩分数
     */
    @property(cc.Label)
    lab_recordScore: cc.Label = null;

    /**
     * 我的今日积分
     */
    @property(cc.Label)
    lab_myTodayScore: cc.Label = null;

    /**
     * 我的今日局数
     */
    @property(cc.Label)
    lab_myTodayGameNum: cc.Label = null;


    /** 
     * 亲友圈信息面板
     */
    @property(cc.Node)
    node_friendInfo: cc.Node = null;

    /** 
     * 消息红点
     */
    @property(cc.Node)
    sp_msgRedPoint: cc.Node = null;

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
     * 选择亲友圈界面组件
     */
    private _selectedFriendCircleComp: CreateSelecteFriendsCircle = null;

    public onLoad() {
    }

    public InitShow() {
        super.InitShow();
        // 默认显示普通场面板
        this.node_selectFriendCircle.active = false;
        this.btn_record.node.active = true;
        this.node_general.active = true;
        this.node_match.active = false;
        this.btn_change.node.active = true;

        // 显示玩家头像、
        let userInfo = this.DataCache.UserInfo.userData;

        // 玩家ID
        if (this.lab_ID) {
            this.lab_ID.string = String(userInfo.UserID);
        }

        //头像
        if (this.sp_headImg) {
            LoadHeader(userInfo.Header, this.sp_headImg);
        }

        //昵称
        if (this.lab_nickname) {
            this.lab_nickname.string = userInfo.NickName;
        }

        // 消息红点
        if (this.sp_msgRedPoint) {
            this.sp_msgRedPoint.active = false;
        }

        this.lab_circleID.string = '';
        this.lab_circleIName.string = "";
        this.lab_peopleNum.string = "";
        this.lab_myTodayScore.string = "";
        this.lab_myTodayGameNum.string = "";
    }

    public OnShow() {
        super.OnShow();
        this._selectedFriendCircleComp = <CreateSelecteFriendsCircle>this.node_selectFriendCircle.getComponent("CreateSelecteFriendsCircle");

        // 注册监听
        FriendCircleWebHandle.setModifyFriendCirleInfoHandle(new Action(this, this.modifyNickNoticHandle));
        // 初始化选择亲友圈界面
        let selectFriendForm = <CreateSelecteFriendsCircle>this.node_selectFriendCircle.getComponent("CreateSelecteFriendsCircle");

        // 请求亲友圈列表
        this.UiManager.ShowLoading("正在请求数据...");
        let act = new Action(this, this.requestFriendCircleListCb);
        FriendCircleWebHandle.requestFriendCircleList(act);

        // 注册选择亲友圈界面选择玩法监听回调
        let selectFriendAct = new Action(this, (friendInfo) => {
            this.updateFriendInfoShow();
        });

        selectFriendForm.registSelectFriendClickEvent(selectFriendAct);

        // 注册创建房间面选择亲友圈玩法回调
        let selectFriendruleAct = new Action(this, (ruleInfo) => {
            this.node_selectFriendCircle.active = false;

            // 刷新亲友积分显示
            this.updateMyStatisticsShow();

            // 显示亲友圈信息
            this.btn_record.node.active = true;
            this.enterTableList(ruleInfo);
        });

        selectFriendForm.registSelectFriendRuleClickEvent(selectFriendruleAct);
        FriendCircleWebHandle.setDealApplyMsgHandle(new Action(this, this.updateMsgRedPointShow));
    }

    /**
     * 创建并显示桌子列表
     */
    public enterTableList(ruleInfo: FriendCircleRule) {
        if (!ruleInfo) {
            return;
        }

        // 设置当前选择的玩法
        FriendCircleDataCache.Instance.CurSelectedRule = ruleInfo;

        let generalCommponet = <GeneralField>this.node_general.getComponent("GeneralField");
        let isCircleOwner = FriendCircleDataCache.Instance.selfIsCircleOwner();
        generalCommponet.initData(ruleInfo, isCircleOwner);
    }

    /**
     * 更新亲友圈信息显示
     */
    public updateFriendInfoShow() {
        let friendInfo = FriendCircleDataCache.Instance.CurEnterFriendCircle;

        if (!friendInfo) {
            return;
        }

        // 亲友圈ID
        if (this.lab_circleID) {
            this.lab_circleID.string = '圈号：' + friendInfo.ID;
        }

        //头像
        if (this.sp_headImg) {
            LoadHeader(friendInfo.header, this.sp_headImg);
        }

        // 更新亲友圈昵称
        if (friendInfo.name && this.lab_circleIName) {
            this.lab_circleIName.string = friendInfo.name;
        }

        // 更新亲友圈人数
        this.lab_peopleNum.string = "(" + friendInfo.userCount + "人)";

        // 公告
        if (friendInfo.notice && this.lab_notice) {
            if ('' == friendInfo.notice) {
                this.lab_notice.string = '这个圈主很懒，什么都没有留下~';
            } else {
                this.lab_notice.string = friendInfo.notice;
            }
        }

        // 更新我的战绩数据统计显示
        this.updateMyStatisticsShow();

        // 更新亲友圈消息红点显示
        this.updateMsgRedPointShow();
    }

    /**
     * 更新我的战绩数据统计显示
     */
    private updateMyStatisticsShow() {
        /**
        * 获取当前查询的时间
        */
        let getTabBeginEndTime = function (): any {
            let date = {
                beginTime: "",
                endTime: ""
            };
            // 截取字符串到小时 2018-12-02 12
            let getHourStr = function (time): string {
                let dateStr = MillisSecondToDate(time);// 格式:2018-12-02 12:30:30
                dateStr = dateStr.substr(0, dateStr.indexOf(":"));
                return dateStr;
            }

            // 截取字符串到天 2018-12-02
            let getDayStr = function (time): string {
                let dateStr = getHourStr(time);
                let dayStr = dateStr.substr(0, dateStr.indexOf(" "));
                return dayStr;
            }

            let curSelectTime = new Date().getTime();

            // 获取当前选择的日期
            let dayStr = getDayStr(curSelectTime);
            date.beginTime = dayStr + " 00";

            // 获取下一天的日期
            let nextDate = getDayStr(curSelectTime + 24 * 3600 * 1000)
            date.endTime = nextDate + " 00";

            cc.log("--- cur select time : ", date);
            return date;
        }

        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        let curRule = FriendCircleDataCache.Instance.CurSelectedRule;
        let userId = this.DataCache.UserInfo.userData.UserID;


        if (!curRule || !curFriendCircle || userId < 0) {
            cc.log("--- error: requestMemberData param is error");
            return;
        }

        let data = getTabBeginEndTime();
        let _beginTime = data.beginTime;
        let _endTime = data.endTime;
        
        FriendCircleWebHandle.GroupGameStat(parseInt(curFriendCircle.ID), curRule.gameId, userId, 2, "", 0, 0, _beginTime, _endTime, new Action(this, (res) => {
            if ("success" == res.status) {
                let memberInfo: FriendCircleMember = res.data[0];

                if (!memberInfo) {
                    return;
                }

                let attr = res.column;
                let data = res.data[0];
                let member: FriendCircleMember = new FriendCircleMember();

                for (let index = 0; index < data.length; ++index) {
                    member[attr[index]] = data[index];
                }

                this.lab_myTodayScore.string = member.moneynum + "分";
                this.lab_myTodayGameNum.string = member.cnt + "局";
            }
        }));
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
     * 
     * @param eventCode 消息到达分发到各个模块
     * @param value 
     */
    protected OnUiEventComeIn(eventCode: number, value: any): boolean {
        try {
            switch (eventCode) {
                case EventCode.GroupTableList: // 房间桌子列表
                    cc.log("----- GroupTableList :", value);
                    let generalCommponet: GeneralField = this.node_general.getComponent("GeneralField");



                    if (this._selectedFriendCircleComp && this.node_selectFriendCircle.active) {
                        this._selectedFriendCircleComp.requestTableCb(value);
                    } else {
                        if (generalCommponet) {
                            generalCommponet.OnMessageComeIn(value);
                        }
                    }
                    return true;

                    break;
                case EventCode.GroupSystemPush: //系统推送消息
                    this.friendCirlSytemPush(value);
                default:
                    // code...
                    break;
            }
        }
        catch (e) {
            cc.log(e);
        }
        return false;
    }

    /**
     * 亲友圈消息推送处理
     */
    private friendCirlSytemPush(msg: SystmPushMessage) {
        if (!msg) {
            return;
        }

        switch (msg.EventCode) {
            case "Group.UserExit":    // 玩家被踢出亲友圈
                this.kickedFromFriendCircleMsg(msg);
                break;
            case "Group.GameStatusChange": // 亲友圈玩法状态修改
                break;
            case "Group.UserReqJoin":     // 玩家申请加入亲友圈
                this.userReqJoinMsg(msg);
                break;
            case "Group.UserAccessJoin":  // 管理员同意加入亲友圈
                this.agreeJoinFriendCircleMsg(msg);
            default:
                // code...
                break;
        }
    }

    /**
     * 玩家被踢出亲友圈客户端消息处理
     */
    private kickedFromFriendCircleMsg(msg: SystmPushMessage) {
        // 解析消息数据获取圈主信息

        if (!msg) {
            return;
        }

        if (msg.EventData.opUserId) {
            this.UiManager.ShowMsgBox("很遗憾，由于某种原因，您将暂离" + msg.EventData.opUserId + "的亲友圈，期待您再次回归!", this,
                () => {
                    //确定
                    // 玩家点击确定退出亲友圈界面
                    this.UiManager.CloseUi(UIName.FriendCircle);
                },
                () => {
                    // 取消
                    // 玩家点击确定退出亲友圈界面
                    this.UiManager.CloseUi(UIName.FriendCircle);
                });
        }
    }

    /**
    * 玩家申请加入亲友圈消息处理
    */
    private userReqJoinMsg(msg: SystmPushMessage) {
        // 显示消息红点
        if (this.sp_msgRedPoint) {
            this.sp_msgRedPoint.active = true;
        }
        if (this.node_selectFriendCircle.active && this._selectedFriendCircleComp) {
            this._selectedFriendCircleComp.userReqJoinMsg(msg.EventData);
        }
    }

    
    /**
     * 管理员同意加入亲友圈消息处理
     */
    private agreeJoinFriendCircleMsg(msg: SystmPushMessage) {
        if (!msg.EventData || !msg.EventData.friendName) {
            return;
        }
        this.UiManager.ShowMsgBox("恭喜您，已加入" + msg.EventData.friendName + "的亲友圈，请文明游戏，祝您一周七天乐!");

        FriendCircleWebHandle.requestFriendCircleList(new Action(this, (res) => {
            if (this.node_selectFriendCircle.active) {
                // 亲友圈列表进行刷新
                this._selectedFriendCircleComp.init()
            }
        }));
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-03
     * @Desc     成员管理
     */
    public memberBtnEventHandle() {
        this.UiManager.ShowUi(UIName.FriendCircleMember);
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-03
     * @Desc     分享
     */
    public shareBtnEventHandle() {
        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;

        if (!curFriendCircle) {
            return;
        }

        const share = new ShareParam();
        share.link = ConfigData.SiteConfig.DownloadUrl;
        share.title = "七乐亲友圈ID:" + curFriendCircle.ID;
        share.text = "快乐时光，亲友分享。快来和我一起抢钻石、红包，还有实物大奖，亲友比赛，精彩无限，期待您的加入！";
        this.UiManager.ShowUi(UIName.Share, share);
    }

    /**
     * 公告昵称修改回调
     */
    public modifyNickNoticHandle(info: any) {
        this.UiManager.ShowTip('修改成功！');
        // 刷新亲友圈数据
        FriendCircleWebHandle.requestFriendCircleList(new Action(this, this.updateFriendInfoShow));
    }

    /**
     * 显示玩法
     */
    public btnShowWanfaClickEvent() {
        let ruleInfo = FriendCircleDataCache.Instance.CurSelectedRule;

        if (!ruleInfo) {
            return;
        }

        let gameRule = StrToObject(ruleInfo.ruleStr);
        let gameInfo = Global.Instance.DataCache.GameList.GetGame(ruleInfo.gameId);

        if (!gameInfo) {
            return;
        }

        Global.Instance.UiManager.ShowUi(UIName.GameWanFa, { rule: gameRule, modelName: gameInfo.ModuleName });
    }

    /**
     * 战绩按钮事件
     */
    public btnRecordClick() {
        Global.Instance.UiManager.ShowUi(UIName.FriendCircleRecord);
    }

    /**
     * 获取亲友圈列表回调
     */
    public getFriendCircleListHandle(info: any) {
        this.updateFriendInfoShow();
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-11-09
     * @Desc     切换按钮点击事件
     */
    private btnChangeFriendClickEventHandle() {
        // 显示选择亲友圈界面
        this.node_selectFriendCircle.active = true;
        this.btn_change.node.active = false;


        if (this._selectedFriendCircleComp) {
            this._selectedFriendCircleComp.init()
        }


    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-03
     * @Desc     消息
     */
    public messageBtnEventHandle() {
        this.UiManager.ShowUi(UIName.FriendCircleMessage);
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-03
     * @Desc     管理
     */
    public manageBtnEventHandle() {
        let name = UIName.FriendCircleManage;
        let isAddmin = FriendCircleDataCache.Instance.selfIsAdministrator();
        // 非管理员不显示成员的管理界面
        if (!isAddmin) {
            name = UIName.FriendCirclePersonInfo;
        }

        this.UiManager.ShowUi(name);
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-03
     * @Desc     普通场
     */
    public generalFieldBtnEventHandle() {

    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-03
     * @Desc     比赛场
     */
    public matchFieldtnEventHandle() {
        this.UiManager.ShowTip('敬请期待');
    }

    /**
     * 自由创建
     */
    public autoJoinEventHandle() {
        // 判断该位置是否已经有玩家
        let friendInfo = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        let userId = Global.Instance.DataCache.UserInfo.userData.UserID;
        let ruleInfo = FriendCircleDataCache.Instance.CurSelectedRule;

        if (!ruleInfo || !friendInfo) {
            return;
        }

        let createTable = function () {
            // 如果房间已存在直接加入房间否则创建房间
            const rule = {
                CheckMoneyNum: 1,
                CurrencyType: 0,
                RoomData: null,
                GroupId: 0,
                RuleId: 0,
            };

            rule.CheckMoneyNum = 1;
            rule.CurrencyType = QL_Common.CurrencyType.Diamond;
            let ruleData = {
                GameData: null,
                TableCost: 0
            };

            let ruleObj = StrToObject(ruleInfo.ruleStr);

            for (let key in ruleObj) {
                ruleObj[key] = eval(ruleObj[key]);
            }

            if (ruleObj["TableCost"]) {
                ruleData.TableCost = ruleObj["TableCost"];
                delete ruleObj["TableCost"];
            }

            ruleData.GameData = ruleObj;
            rule.RoomData = ruleData;
            rule.RuleId = ruleInfo.Id;

            if (!rule) {
                Global.Instance.UiManager.ShowTip("无有效的游戏规则");
                return;
            }

            const room = Global.Instance.DataCache.RoomList.GetCreateRoom(ruleInfo.gameId);
            cc.log(rule.RoomData);

            if (room) {
                let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;

                if (!curFriendCircle) {
                    return;
                }

                Global.Instance.DataCache.GroupId = parseInt(curFriendCircle.ID);
                Global.Instance.GameHost.TryEnterRoom(room.ID, QL_Common.EnterRoomMethod.RoomID, rule, { IsFreeCreate: true });
            } else {

                cc.warn("没有创建房间");
            }
        }.bind(this)

        this.UiManager.ShowLoading("正在进入房间...");
        // 判断是否玩家被禁玩
        FriendCircleWebHandle.GroupUserGameBan(parseInt(friendInfo.ID), 2, 0, ruleInfo.gameId, "Q", userId, new Action(this, (res) => {
            if (!res.status || "success" != res.status) {
                this.UiManager.CloseLoading();
                this.UiManager.ShowTip("请求数据失败!");
                return;
            }

            if (res.isBan) {
                Global.Instance.UiManager.CloseLoading();
                this.UiManager.ShowTip("您没有权限进入该玩法,请联系圈主!");
                return;
            }
            createTable();
        }));
    }

    /**
     * 请求亲友圈列表回调
     */
    public requestFriendCircleListCb() {
        // 判断上一次选择进入的亲友圈及玩法,存在则直接进入改亲友圈的桌子列表
        let localFriendCircle = FriendCircleDataCache.Instance.getLocalStorage("localFriendCircleInfo");
        // 初始化选择亲友圈界面
        let selectFriendForm = <CreateSelecteFriendsCircle>this.node_selectFriendCircle.getComponent("CreateSelecteFriendsCircle");

        if (localFriendCircle) {
            let localInfo = StrToObject(localFriendCircle);
            // 请求消息列表
            FriendCircleWebHandle.getMessageList(localInfo.groupId);

            // 请求玩法列表
            FriendCircleWebHandle.requestFriendCircRuleList(localInfo.groupId, new Action(this, (res) => {
                // 请求成员列表回调
                FriendCircleWebHandle.getMemberList(localInfo.groupId, 0, 10, new Action(this, () => {
                    this.UiManager.CloseLoading();
                    // 判断亲友圈玩法的有效性(因为存在圈主把玩家踢出去或者玩家自动退出的情况)
                    if (FriendCircleDataCache.Instance.isFriendCircleMember(localInfo.groupId)
                        && FriendCircleDataCache.Instance.isValidRule(localInfo.ruleId, localInfo.groupId)) {
                        //隐藏选择亲友圈界面
                        this.node_selectFriendCircle.active = false;
                        // 显示战绩按钮
                        this.btn_record.node.active = true;
                        // 显示亲友圈信息
                        this.node_friendInfo.active = true;

                        //设置当前进入的亲友圈
                        let friendInfo = FriendCircleDataCache.Instance.getFriendCircleById(parseInt(localInfo.groupId));
                        FriendCircleDataCache.Instance.CurEnterFriendCircle = friendInfo;

                        let ruleInfo = FriendCircleDataCache.Instance.getRuleByID(localInfo.ruleId, localInfo.groupId);
                        this.enterTableList(ruleInfo);

                        // 更新亲友圈显示
                        this.updateFriendInfoShow();
                    } else {
                        selectFriendForm.init();
                        this.node_selectFriendCircle.active = true;
                    }
                }))
            }));
        } else {
            this.UiManager.CloseLoading();
            selectFriendForm.init();
            this.node_selectFriendCircle.active = true;
        }
    }

    /**
     * 关闭按钮事件
     */
    public CloseClick() {
        Global.Instance.DataCache.GroupId = 0;
        super.CloseClick();

        // 取消对该亲友圈的所有订阅
        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        let isAddmin = FriendCircleDataCache.Instance.selfIsAdministrator();
    }
}
