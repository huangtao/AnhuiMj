import UIBase from "../../Base/UIBase";
import FriendCircleDataCache from "../FriendCircleDataCache";
import FriendCircleWebHandle from "../FriendCircleWebHandle";
import { Action } from "../../../CustomType/Action";
import { FriendCircleRecord, FriendCircleMember, PlayerFightScore } from "../../../CustomType/FriendCircleInfo";
import MemberScrollHelper from "./MemberScrollHelper";
import SelectDate from "../selectDate/SelectDate";
import FightRecordScrollHelper from "../FightRecord/FightRecordScrollHelper";
import { MemberUserItem } from "./MemberUserItem";
import FightRecordItem from "../FightRecord/FightRecordItem";
import { UIName } from "../../../Global/UIName";
import { MillisSecondToDate, checkNumber } from "../../../Tools/Function";
import { RecordInfo, RecordListItem } from "../../Record/RecordDataStruct";
import { RecordDataManage } from "../../Record/RecordDataManage";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FightRecordUI extends UIBase<any> {
    public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;

    /**
     * 亲友圈人数显示
     */
    @property(cc.Label)
    lab_memberCount: cc.Label = null;

    /**
     * 昵称、ID输入框
     */
    @property(cc.EditBox)
    editbox_nickOrId: cc.EditBox = null;

    /**
     * 今日积分按钮标签文字
     */
    @property([cc.Label])
    lab_score: cc.Label[] = [];

    /**
     * 日期切换标签
     */
    @property([cc.Button])
    btn_tab_date: cc.Button[] = [];

    /**
     * 日期标签按钮选中状态图标
     */
    @property(cc.Sprite)
    sp_tabDateSelected: cc.Sprite = null;

    /**
     * 战绩切换标签
     */
    @property([cc.Button])
    btn_tab_member: cc.Button[] = [];

    /**
     * 战绩切换标签文本
     */
    @property([cc.Label])
    lab_tab_member: cc.Label[] = [];

    /**
     * 战绩标签选中状态图标
     */
    @property([cc.Sprite])
    sp_tabMemberSelected: cc.Sprite[] = [];

    /**
     * 选择的日期显示
     */
    @property(cc.Label)
    lab_searchDate: cc.Label = null;

    /**
     * 战绩标签节点
     */
    @property(cc.Node)
    node_tabMember: cc.Node = null;

    /**
     * 我的战绩列表滚动容器
     */
    @property(cc.ScrollView)
    scrol_myMember: cc.ScrollView = null;

    /**
     * 合伙人列表表滚动容器
     */
    @property(cc.ScrollView)
    scrol_partner: cc.ScrollView = null;

    /**
     * 玩家战绩列表
     */
    @property(cc.ScrollView)
    scrol_userRecord: cc.ScrollView = null;

    /**
     * 选择日期面板
     */
    @property(cc.Node)
    node_selectDate: cc.Node = null;

    /**
     * 玩家战绩界面
     */
    @property(cc.Node)
    node_userRecordList: cc.Node = null;

    /**
     * 玩家战绩界面
     */
    @property(cc.Node)
    node_userItem: cc.Node = null;

    /**
     * 搜索日期节点
     */
    @property(cc.Node)
    node_searchDate: cc.Node = null;

    /**
     * 按昵称或ID搜索节点
     */
    @property(cc.Node)
    node_searchNick: cc.Node = null;

    // 是否正在请求
    private _requestIng: boolean = false;

    public get isPlayPopAction(): boolean { return false; }

    /**
     * 当前日期选择标签索引
     */
    private _curDateSelectTabIdx: number = 0;

    /**
     * 当前战绩选择标签索引
     */
    private _curMemberSelectTabIdx: number = 0;

    /**
     * 我的战绩数据
     */
    private _memberList: FriendCircleMember[] = [];

    /**
     * 玩家战绩数据
     */
    private _userRecordList: FriendCircleRecord[] = [];

    /**
     * 当前请求我的战绩startId
     */
    private _userRecordStartId: number = 0;

    private _scrollMember: MemberScrollHelper = null;
    private _scrollPartner: MemberScrollHelper = null;
    private _scrollUserRecord: FightRecordScrollHelper = null;

    /**
     * 具体某个玩家的展示
     */
    private _userItem: MemberUserItem = null;

    /**
     * 当前点击查看战绩详情或查看用户信息的成员Item
     */
    private _curSelectUserItem: MemberUserItem = null;
    /**
     * 当前选择的搜索日期
     */
    private _curSearchDate = {
        beginTime: "",
        endTime: ""
    }

    public InitShow() {
        // this._scrollPartner = this.scrol_partner.getComponent("MemberScrollHelper");
        this._scrollMember = this.scrol_myMember.getComponent("MemberScrollHelper");
        this._scrollMember.RecordDetailHandle = new Action(this, this.userRecordDetailHandle.bind(this));
        this._scrollMember.OpenPlayerInfoHandle = new Action(this, this.openPlayerInfoHandle.bind(this));
        this._scrollMember.HearFlagActHandle = new Action(this, this.HeardFlagActHandle.bind(this));

        this._scrollUserRecord = this.scrol_userRecord.getComponent(FightRecordScrollHelper);
        this._scrollUserRecord.PraiseActHandle = new Action(this, this.PraiseActHandle.bind(this));
        this._scrollUserRecord.RecordDetailHandle = new Action(this, this.RecordDetailHandle.bind(this));
        this._scrollUserRecord.registerScrollToTopOrBottonEvent(this.userRecordScrollEventHandle.bind(this));

        this._userItem = this.node_userItem.getComponent(MemberUserItem);
        this._userItem.RecordDetailHandle = new Action(this, this.userRecordDetailHandle.bind(this));
        this._userItem.HeartFlagActHandle = new Action(this, this.HeardFlagActHandle.bind(this));

        /**
         * 注册踢人消息回调
         */
        FriendCircleWebHandle.setKickMemberHandle(new Action(this, this.kickMemberMsgCb.bind(this)));

        /**
         * 注册禁玩或解禁消息回调
         */
        FriendCircleWebHandle.setBanHandle(new Action(this, this.banOrRelieveMsgCb.bind(this)));
    }

    public OnShow() {
        // 初始化界面显示

        // 管理员才可以看到我的战绩
        let isAdmin = FriendCircleDataCache.Instance.selfIsAdministrator();

        if (isAdmin) {
            this.node_tabMember.active = true;
        } else {
            this.node_tabMember.active = false;
        }

        this.node_selectDate.active = false;
        // this.node_searchNick.active = true;
        this.node_userRecordList.active = false;

        this._curSearchDate = {
            beginTime: "",
            endTime: ""
        };

        this.clearData();

        // 默认显示第一个标签
        this.tabDataChangeLogic('0');
        this.tabMemberChangeLogic('0');

        // 初始化搜索时间显示(默认为今日)
        let date = this.getTabBeginEndTime();
        this._curSearchDate = date;

        let beginTime = date.beginTime.substr(date.beginTime.indexOf("-") + 1, date.beginTime.length - 1);
        let endTime = date.endTime.substr(date.endTime.indexOf("-") + 1, date.endTime.length - 1);
        this.lab_searchDate.string = beginTime + "至" + endTime;

        // 默认请求成员列表
        this.requestMemberList();
    }

    /**
     * 日期标签切换逻辑
     */
    public tabDataChangeLogic(tabTag: string) {
        let tag = parseInt(tabTag);

        // 更新文字颜色表示
        if (this.lab_score[this._curDateSelectTabIdx]) {
            this.lab_score[this._curDateSelectTabIdx].node.color = cc.hexToColor("#FFFFFF");
            this.lab_score[this._curDateSelectTabIdx].node.getComponent('cc.LabelOutline').enabled = false;
        }

        this._curDateSelectTabIdx = tag;

        // 更新当前选中按钮状态位置
        if (cc.isValid(this.btn_tab_date[this._curDateSelectTabIdx])) {
            this.sp_tabDateSelected.node.y = this.btn_tab_date[this._curDateSelectTabIdx].node.y;
        }

        // 更新文字颜色表示
        if (this.lab_score[tag]) {
            this.lab_score[tag].node.color = cc.hexToColor("#783000");
            this.lab_score[tag].node.getComponent('cc.LabelOutline').enabled = true;
        }
    }

    /**
     * 战绩标签切换逻辑
     */
    public tabMemberChangeLogic(tabTag: string) {
        if (!tabTag) {
            return;
        }

        let tag = parseInt(tabTag);

        if (1 == tag) {
            this.UiManager.ShowTip("敬请期待");
            return;
        }

        // 更新文字颜色表示
        if (this.lab_tab_member[this._curMemberSelectTabIdx]) {
            this.sp_tabMemberSelected[this._curMemberSelectTabIdx].node.active = false;
            this.lab_tab_member[this._curMemberSelectTabIdx].node.color = cc.hexToColor("#EEEEEE");
            this.lab_tab_member[this._curMemberSelectTabIdx].node.getComponent('cc.LabelOutline').color = cc.hexToColor("#9A8379");
        }

        this._curMemberSelectTabIdx = tag;

        // 更新文字颜色表示
        if (this.lab_tab_member[tag]) {
            this.sp_tabMemberSelected[tag].node.active = true;
            this.lab_tab_member[tag].node.color = cc.hexToColor("#FFFFFF");
            this.lab_tab_member[tag].node.getComponent('cc.LabelOutline').color = cc.hexToColor("#2A9A2F");
        }

        switch (tabTag) {
            case "0":
                {
                    this.scrol_myMember.node.active = true;
                    this.scrol_partner.node.active = true;
                }
                break;
            case "1":
                {
                    this.scrol_myMember.node.active = false;
                    this.scrol_partner.node.active = true;
                }
                break;
            default:
                // code...
                break;
        }
    }

    /**
     * 请求成员数据
     */
    private requestMemberData(userId: number, nickname: string = "", gameId: number = 0, in_querytype: number, startId: number, count: number, beginTime: string, endTime: string, act: Action) {
        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;

        if (!curFriendCircle || userId < 0) {
            cc.log("--- error: requestMemberData param is error");
            return;
        }

        let _beginTime = "";
        let _endTime = "";

        if (beginTime && endTime) {
            _beginTime = beginTime;
            _endTime = endTime;
        } else {
            _beginTime = this._curSearchDate.beginTime;
            _endTime = this._curSearchDate.endTime;
        }

        FriendCircleWebHandle.GroupGameStat(parseInt(curFriendCircle.ID), gameId, userId, in_querytype, nickname, startId, count, _beginTime, _endTime, act);
    }

    /**
     * 请求成员列表
     */
    public requestMemberList(userId: number = 0, nickname: string = "", beginTime?: string, endTime?: string) {
        let curRuleInfo = FriendCircleDataCache.Instance.CurSelectedRule;
        let gameId = (curRuleInfo && curRuleInfo.gameId > 0) ? curRuleInfo.gameId : 0;

        this.requestMemberData(userId, nickname, gameId, 2, 0, 0, beginTime, endTime, new Action(this, (res) => {
            if (!res || !res.status) {
                return;
            }

            if ("success" != res.status) {
                return;
            }

            if (!res.column || !res.data) {
                return;
            }

            this._memberList = [];
            let attr = res.column;
            for (let idx = 0; idx < res.data.length; ++idx) {
                let data = res.data[idx];
                let member: FriendCircleMember = new FriendCircleMember();

                for (let index = 0; index < data.length; ++index) {
                    member[attr[index]] = data[index];
                }

                this._memberList.push(member);
            }

            // 默认按照局数排序
            this.sortMemberListData("cnt");

            // 更新成员数量显示
            this.lab_memberCount.string = "成员数：" + this._memberList.length + "人";
            ;
            cc.log("-- memberList ", this._memberList);
            this.showMemberList();
        }));
    }

    /**
     * 请求玩家战绩列表
     */
    public requestUserRecordList(userId: number, beginTime?: string, endTime?: string) {
        if (!userId) {
            return;
        }

        let _userId = userId;

        if (this._userRecordStartId < 0) {
            return;
        }

        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        let curRuleInfo = FriendCircleDataCache.Instance.CurSelectedRule;

        if (!curFriendCircle || !curRuleInfo || userId < 0) {
            cc.log("--- error: requestMemberData param is error");
            return;
        }

        let _beginTime = "";
        let _endTime = "";

        if (beginTime && endTime) {
            _beginTime = beginTime;
            _endTime = endTime;
        } else {
            _beginTime = this._curSearchDate.beginTime;
            _endTime = this._curSearchDate.endTime;
        }

        this._requestIng = true;
        FriendCircleWebHandle.GroupGameStat(parseInt(curFriendCircle.ID), curRuleInfo.gameId, userId, 1, "", this._userRecordStartId, 10, _beginTime, _endTime, new Action(this, (res) => {
            if (!res || !res.status) {
                return;
            }

            if ("success" != res.status) {
                return;
            }

            for (var idx = 0; idx < res.data.length; ++idx) {
                let data = res.data[idx];

                if (!data) {
                    continue;
                }

                this._userRecordList.push(data);
            }

            this._userRecordStartId = res.nextId;
            this.showUserRecordList();
        }));
    }

    /**
     * 显示成员列表
     */
    public showMemberList() {
        if (this._scrollMember) {
            this._scrollMember.resetList();
            this._scrollMember.refreshData(this._memberList);
        }

        // 更新点开的玩家数据
        if (this.node_userRecordList.active && this._userItem) {
            let showData: FriendCircleMember = this._userItem.ShowData;

            if (showData) {
                // 更新缓存的值
                for (var idx = 0; idx < this._memberList.length; ++idx) {
                    if (this._memberList[idx] && this._memberList[idx].userid == showData.userid) {
                        this._userItem.initShow(this._memberList[idx]);
                        break;
                    }
                }
            }

        }
    }

    /**
     * 显示玩家战绩列表
     */
    public showUserRecordList() {
        if (this._scrollUserRecord) {
            this._scrollUserRecord.refreshData(this._userRecordList);
        }
    }

    /**
     * 显示合伙人数据
     */
    public showPartnerListData(data: any) {
        if (this._scrollPartner) {
            this._scrollPartner.refreshData(this._memberList);
        }
    }

    /**
     * 获取当前查询的时间
     */
    public getTabBeginEndTime(): any {
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

        let curSelectTime = new Date().getTime() - 24 * (this._curDateSelectTabIdx) * 3600 * 1000;

        // 获取当前选择的日期
        let dayStr = getDayStr(curSelectTime);
        date.beginTime = dayStr + " 00";

        // 获取下一天的日期
        let nextDate = getDayStr(curSelectTime + 24 * 3600 * 1000)
        date.endTime = nextDate + " 00";

        cc.log("--- cur select time : ", date);
        return date;
    }

    /**
     * 踢人消息回调
     */
    public kickMemberMsgCb(res) {
        // 关闭个人信息弹框
        this.UiManager.CloseUi(UIName.MemberPlayerInfo);

        // 刷新成员列表
        this.requestMemberList();

        // 隐藏个人信息界面
        this.node_userRecordList.active = false;
    }

    /**
     * 禁玩或解禁消息回调
     */
    public banOrRelieveMsgCb(res) {
        if (!this._curSelectUserItem) {
            return;
        }

        let data: FriendCircleMember = this._curSelectUserItem.ShowData;
        let bantype = 0;

        // 更新玩家禁玩状态
        for (var idx = 0; idx < this._memberList.length; ++idx) {
            if (this._memberList[idx].userid == data.userid) {
                this._memberList[idx].bantype = data.bantype ? 0 : 2;
                bantype = this._memberList[idx].bantype;
                break;
            }
        }

        // 刷新Item显示
        this._curSelectUserItem.updatePlayerBanStatusShow(bantype);
    }

    /**
     * 日期选择回调
     */
    private selectDateAct(date: any) {
        this.lab_searchDate.string = "";
        this.lab_searchDate.string = date.beginTime + "至" + date.endTime;

        let year = new Date().getFullYear() + "-";
        let beginTime = year + date.beginTime;
        let endTime = year + date.endTime;

        this._curSearchDate.beginTime = beginTime;
        this._curSearchDate.endTime = endTime;

        // 请求当前选择标签的战绩数据
        switch (this._curMemberSelectTabIdx) {
            case 0:
                this.requestMemberList();
                break;
            case 1:
                // this.requestAllRecord( beginTime, endTime );
                break;
            default:
                break;
        }
    }

    /**
     * 排序列表
     */
    private sortMemberListData(attr: string) {
        if (!attr) {
            return;
        }

        this._memberList.sort((a, b) => {
            return b[attr] - a[attr];
        })
    }

    /**
     * 清空数据
     */
    private clearData() {
        // 清空数据
        this._memberList = [];
        this._userRecordList = [];
        this._userRecordStartId = 0;
        this._scrollMember.resetList();
        this._scrollUserRecord.resetList();
    }

    /**
     * 点心钮事件
     */
    public HeardFlagActHandle(memberItem: MemberUserItem) {
        if (!memberItem) {
            return;
        }

        let userId = this.DataCache.UserInfo.userData.UserID;
        // 身份级别必须大于这个人的并且是管理员以上级别才能点开查看
        let selfInfo: FriendCircleMember = FriendCircleDataCache.Instance.FriendCircleMemberList.GetValue(userId + "");

        if (!selfInfo) {
            return
        }

        if (parseInt(selfInfo.isadmin) < 1) {
            this.UiManager.ShowTip("只有圈主或管理员才能点心");
            return;
        }

        let memberInfo = memberItem;
        let showData: FriendCircleMember = memberItem.ShowData;

        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        let curRuleInfo = FriendCircleDataCache.Instance.CurSelectedRule;

        if (!curRuleInfo) {
            return;
        }
        FriendCircleWebHandle.GroupSetHeartFlag(parseInt(curFriendCircle.ID),
            curRuleInfo.gameId,
            showData.userid,
            this._curSearchDate.beginTime,
            this._curSearchDate.endTime, new Action(this, (res) => {
                if ("success" != res.status) {
                    return;
                }

                // 更新缓存的值
                for (var idx = 0; idx < this._memberList.length; ++idx) {
                    if (this._memberList[idx] && this._memberList[idx].userid == showData.userid) {
                        this._memberList[idx].flag = res.heartFlag;
                        break;
                    }
                }

                // 更新列表中的显示
                if (this._userItem == memberInfo) {
                    if (this._curSelectUserItem) {
                        this._curSelectUserItem.refreshHeartIcon(res.heartFlag);
                    }
                }

                memberInfo.refreshHeartIcon(res.heartFlag)
            }));
    }

    /**
     * 点赞钮事件
     */
    public PraiseActHandle(fightRecordItem: FightRecordItem) {
        if (!fightRecordItem) {
            return;
        }

        let userId = this.DataCache.UserInfo.userData.UserID;
        // 身份级别必须大于这个人的并且是管理员以上级别才能点开查看
        let selfInfo: FriendCircleMember = FriendCircleDataCache.Instance.FriendCircleMemberList.GetValue(userId + "");

        if (!selfInfo) {
            return
        }

        if (parseInt(selfInfo.isadmin) < 1) {
            this.UiManager.ShowTip("只有圈主或管理员才能点赞");
            return;
        }

        let item = fightRecordItem;
        let showData: FriendCircleRecord = fightRecordItem.ShowData;
        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;

        if (!curFriendCircle || !showData.setId) {
            return;
        }

        FriendCircleWebHandle.GroupSetRecordFlag(parseInt(curFriendCircle.ID), showData.setId, new Action(this, (res) => {
            if ("success" != res.status) {
                return;
            }

            // 更新缓存的值
            for (var idx = 0; idx < this._userRecordList.length; ++idx) {
                if (this._userRecordList[idx] && this._userRecordList[idx].setId == showData.setId) {
                    this._userRecordList[idx].flag = res.flag;
                    break;
                }
            }

            item.refreshPraiseIcon(res.flag)
        }));
    }

    /**
     * 打开个人信息弹框回调
     */
    public openPlayerInfoHandle(userItem: MemberUserItem) {
        if (!userItem) {
            return;
        }

        // 如果是从添加管理员界面进来的
        let memberInfo: FriendCircleMember = userItem.ShowData;

        if (this.ShowParam && this.ShowParam.isAddmin && this.ShowParam.act) {
            this.ShowParam.act.Run([memberInfo]);
            return;
        }

        let userId = this.DataCache.UserInfo.userData.UserID;

        // 身份级别必须大于这个人的并且是管理员以上级别才能点开查看
        let selfInfo: FriendCircleMember = FriendCircleDataCache.Instance.FriendCircleMemberList.GetValue(userId + "");

        if ((selfInfo && parseInt(selfInfo.isadmin) > parseInt(memberInfo.isadmin) && parseInt(selfInfo.isadmin) > 0)
            || memberInfo.userid == userId) {
            this._curSelectUserItem = userItem;
            this.UiManager.ShowUi(UIName.MemberPlayerInfo, userItem.ShowData);
        }
    }

    /**
     * 成员中玩家战绩详情按钮
     */
    public userRecordDetailHandle(userItem: MemberUserItem) {
        if (!userItem) {
            return
        }

        this.node_userRecordList.active = !this.node_userRecordList.active;
        this.scrol_myMember.node.active = !this.node_userRecordList.active;

        this._userRecordStartId = 0;
        this._userRecordList = [];
        this._scrollUserRecord.resetList();

        // 战绩详情中的成员展开按钮不需要做任何处理直接隐藏战绩详情界面
        if (this._userItem == userItem) {
            this._curSelectUserItem = null;
            // 显示昵称搜索框
            // this.node_searchNick.active = true;
            return;
        }

        /****************请求玩家战绩详情数据并显示 ***********/
        // 隐藏昵称搜索框
        // this.node_searchNick.active = false;

        // 获取玩家信息
        let showData: FriendCircleMember = userItem.ShowData;
        this._curSelectUserItem = userItem;

        let userInfo: FriendCircleMember = null;
        for (var idx = 0; idx < this._memberList.length; ++idx) {
            if (this._memberList[idx] && this._memberList[idx].userid == showData.userid) {
                userInfo = this._memberList[idx];
                break;
            }
        }

        if (this._userItem && userInfo) {
            this._userItem.initShow(userInfo);
            this._userItem.setOpenBtnStatus(true);
        }

        this._scrollUserRecord.resetList();

        // 请求玩家战绩列表
        this.requestUserRecordList(showData.userid);
    }

    /**
     * 战绩中对局详情
     */
    public RecordDetailHandle(item: FightRecordItem) {
        if (!item) {
            return;
        }

        let friendInfo = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        let friendRecord: FriendCircleRecord = item.ShowData;
        let recordInfo: RecordInfo = new RecordInfo();
        recordInfo.recordId = friendRecord.setId;
        recordInfo.mId = friendRecord.mid;
        recordInfo.groupId = parseInt(friendInfo.ID);
        recordInfo.gameId = friendRecord.gameId;
        recordInfo.gameNum = friendRecord.gameNum;
        recordInfo.addtime = friendRecord.addTime;
        recordInfo.roomId = friendRecord.tableId;
        recordInfo.scoreList = new Array<RecordListItem>();

        // 分数列表
        for (let idx = 0; idx < friendRecord.userData.length; ++idx) {
            let userData: PlayerFightScore = friendRecord.userData[idx];
            let recordListItem = new RecordListItem();
            recordListItem.userid = userData.userId;
            recordListItem.nickname = userData.nickName;
            recordListItem.moneynum = userData.moneyNum;
            recordInfo.scoreList.push(recordListItem);
        }

        RecordDataManage.Instance.RecordList.Clear();
        RecordDataManage.Instance.RecordList.AddOrUpdate(recordInfo.recordId + "", recordInfo);
        this.UiManager.ShowUi(UIName.RecordDetails, recordInfo, null);
    }

    /**
     * 成员列表滚动事件
     */
    public recordScrollEventHandle() {
        if (this._requestIng) {
            return;
        }
        this._requestIng = true;
        this.requestMemberList();
    }

    /**
     * 玩家战绩滚动列表监听事件
     */
    public userRecordScrollEventHandle(scrollview, eventType, customEventData) {
        this._requestIng = true;
    }

    /**
     * 日期标签点击事件处理
     */
    public btnTabDateClickHandle(event, args) {
        this.tabDataChangeLogic(args);
        this.clearData();

        let date = this.getTabBeginEndTime();
        this._curSearchDate = date;

        if (0 == this._curDateSelectTabIdx) {
            this.node_searchDate.active = true;
        } else {
            this.node_searchDate.active = false;
        }

        // 更新当前点开玩家的战绩数据
        if (this.node_userRecordList.active && this._userItem) {
            let showData: FriendCircleMember = this._userItem.ShowData;
            this.requestUserRecordList(showData.userid);
        }

        // 
        // 请求当前选择标签的战绩数据
        switch (this._curMemberSelectTabIdx) {
            case 0:
                this.requestMemberList();
                break;
            case 1:
                // this.requestAllRecord();
                break;
            default:
                break;
        }
    }

    /**
     * 成员、合伙人标签按钮点击事件处理
     */
    public btnTabMemberClickHandle(event, args) {
        this.tabMemberChangeLogic(args);

        switch (args) {
            case "0":
                {
                    // 如果没有切换日期则从缓存中读取
                    if (this._memberList.length > 0) {
                        this.showMemberList();
                    } else {
                        this.requestMemberList();
                    }
                }
                break;
            case "1":
                // this.UiManager.ShowTip("敬请期待");
                break;
            default:
                // code...
                break;
        }
    }

    /**
     * 刷新按钮点击事件处理
     */
    public btnRefreshClickHandle(event?, args?) {
        // 刷新玩家列表
        this.requestMemberList();

        // 更新当前点开玩家的战绩数据
        if (this.node_userRecordList.active && this._userItem) {
            let showData: FriendCircleMember = this._userItem.ShowData;
            this._userRecordList = [];
            this._userRecordStartId = 0;
            this._scrollUserRecord.resetList();
            this.requestUserRecordList(showData.userid);
        }
    }

    /**
     * 昵称、ID输入框回车点击事件处理
     */
    public editBoxReturnEventHandle(event, args) {
        this._memberList = [];
        this._scrollMember.resetList();

        let content = this.editbox_nickOrId.string;
        let userId = parseInt(content);
        let nick = content;

        if (checkNumber(userId)) {
            this.requestMemberList(parseInt(content))
        } else {
            this.requestMemberList(0, nick);
        }
    }

    /**
     * 日期选择按钮事件处理
     */
    private btnSelectDateClickHandle(event, args) {
        this.node_selectDate.active = true;
        let selectDate: SelectDate = this.node_selectDate.getComponent("SelectDate");
        selectDate.initUI();
        selectDate.SelectTimeAct = new Action(this, this.selectDateAct);
    }
}
