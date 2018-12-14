import UIBase from "../../Base/UIBase";
import FriendCircleDataCache from "../FriendCircleDataCache";
import FriendCircleWebHandle from "../FriendCircleWebHandle";
import { MillisSecondToDate } from "../../../Tools/Function";
import { Action } from "../../../CustomType/Action";
import { FriendCircleRecord, PlayerFightScore, FriendCircleMember } from "../../../CustomType/FriendCircleInfo";
import FightRecordScrollHelper from "./FightRecordScrollHelper";
import SelectDate from "../selectDate/SelectDate";
import FightRecordItem from "./FightRecordItem";
import { RecordInfo, RecordListItem } from "../../Record/RecordDataStruct";
import { RecordDataManage } from "../../Record/RecordDataManage";
import { UIName } from "../../../Global/UIName";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FightRecordUI extends UIBase<any> {
    public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;

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
    btn_tab_record: cc.Button[] = [];

    /**
     * 战绩切换标签文本
     */
    @property([cc.Label])
    lab_tab_record: cc.Label[] = [];

    /**
     * 战绩标签选中状态图标
     */
    @property([cc.Sprite])
    sp_tabRecordSelected: cc.Sprite[] = [];

    /**
     * 选择的日期显示
     */
    @property(cc.Label)
    lab_searchDate: cc.Label = null;

    /**
     * 我的积分显示
     */
    /**
     * 我的积分
     */
    @property(cc.Label)
    lab_myScore: cc.Label = null;

    /**
     * 局数
     */
    @property(cc.Label)
    lab_roundNum: cc.Label = null;

    /**
     * 大赢家次数
     */
    @property(cc.Label)
    lab_bigWinnerNum: cc.Label = null;

    /**
     * 该玩法的开局统计
     */
    @property(cc.Label)
    lab_friendRoundNum: cc.Label = null;

    /**
     * 该玩法的亲友圈耗钻统计
     */
    @property(cc.Label)
    lab_friendDiamond: cc.Label = null;

    /**
     * 战绩标签节点
     */
    @property(cc.Node)
    node_tabRecord: cc.Node = null;

    /**
     * 我的战绩列表滚动容器
     */
    @property(cc.ScrollView)
    scrol_myRecord: cc.ScrollView = null;

    /**
     * 所有战绩列表滚动容器
     */
    @property(cc.ScrollView)
    scrol_friendRecord: cc.ScrollView = null;

    /**
     * 选择日期面板
     */
    @property(cc.Node)
    node_selectDate: cc.Node = null;

    /**
     * 搜索日期节点
     */
    @property(cc.Node)
    node_searchDate: cc.Node = null;

    /**
     * 我的战绩统计数据节点
     */
    @property(cc.Node)
    node_myStatistics: cc.Node = null;

    /**
     * 亲友圈战绩统计数据节点
     */
    @property(cc.Node)
    node_friendStatistics: cc.Node = null;

    /**
     * 我的战绩数字段名节点
     */
    @property(cc.Node)
    node_myField: cc.Node = null;

    /**
     * 亲友圈战绩数字段名节点
     */
    @property(cc.Node)
    node_friendField: cc.Node = null;

    /**
     * 胜败标签
     */
    @property(cc.Label)
    lab_result: cc.Label = null;

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
    private _curRecordSelectTabIdx: number = 0;

    /**
     * 我的战绩数据
     */
    private _myRecordDataList: FriendCircleRecord[] = [];

    /**
     * 亲友圈战绩数据
     */
    private _friendRecordDataList: FriendCircleRecord[] = [];

    /**
     * 当前请求我的战绩startId
     */
    private _myRecordStartId: number = 0;

    /**
     * 当前请求所有战绩startId
     */
    private _friendRecordStartId: number = 0;

    /**
     * 当前选择的搜索日期
     */
    private _curSearchDate = {
        beginTime: "",
        endTime: ""
    }

    private _scrollMyrecord: FightRecordScrollHelper = null;
    private _scrollFriendRecord: FightRecordScrollHelper = null;

    public InitShow() {

        this._scrollMyrecord = this.scrol_myRecord.getComponent(FightRecordScrollHelper);
        this._scrollMyrecord.PraiseActHandle = new Action(this, this.PraiseActHandle.bind(this));
        this._scrollMyrecord.RecordDetailHandle = new Action(this, this.RecordDetailHandle.bind(this));
        
        this._scrollFriendRecord = this.scrol_friendRecord.getComponent(FightRecordScrollHelper);
        this._scrollFriendRecord.PraiseActHandle = new Action(this, this.PraiseActHandle.bind(this));
        this._scrollFriendRecord.RecordDetailHandle = new Action(this, this.RecordDetailHandle.bind(this));

        this._scrollMyrecord.registerScrollToTopOrBottonEvent(this.myRecordScrollEventHandle.bind(this));
        this._scrollFriendRecord.registerScrollToTopOrBottonEvent(this.allRecordScrollEventHandle.bind(this));
    }

    public OnShow() {
        // 初始化界面显示

        // 管理员才可以看到我的战绩
        let isAdmin = FriendCircleDataCache.Instance.selfIsAdministrator();

        if (isAdmin) {
            this.node_tabRecord.active = true;
        } else {
            this.node_tabRecord.active = false;
        }

        this.node_selectDate.active = false;
        this._curDateSelectTabIdx = 0;
        this.node_friendStatistics.active = false;
        this.node_myStatistics.active = true;
        this.lab_result.node.active = true;
        this.node_myField.active = true;
        this.node_friendField.active = false;

        this.lab_friendDiamond.string = "耗钻数：0" ;
        this.lab_friendRoundNum.string = "开局数：0";

        this.lab_myScore.string = "积分：0";
        this.lab_roundNum.string = "牌局数：0";
        this.lab_bigWinnerNum.string = "大赢家次数：0";

        this.clearData();

        // 初始化搜索时间显示(默认为今日)
        let date = this.getTabBeginEndTime();
        this._curSearchDate = date;

        // 默认请求我的战绩数据
        this.requestMyRecord();

        // 默认显示第一个标签
        this.tabDataChangeLogic('0');
        this.tabRecordChangeLogic('0');
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
    public tabRecordChangeLogic(tabTag: string) {
        if (!tabTag) {
            return;
        }

        let tag = parseInt(tabTag);

        // 更新文字颜色表示
        if (this.lab_tab_record[this._curRecordSelectTabIdx]) {
            this.sp_tabRecordSelected[this._curRecordSelectTabIdx].node.active = false;
            this.lab_tab_record[this._curRecordSelectTabIdx].node.color = cc.hexToColor("#EEEEEE");
            this.lab_tab_record[this._curRecordSelectTabIdx].node.getComponent('cc.LabelOutline').color = cc.hexToColor("#9A8379");
        }

        this._curRecordSelectTabIdx = tag;

        // 更新文字颜色表示
        if (this.lab_tab_record[tag]) {
            this.sp_tabRecordSelected[tag].node.active = true;
            this.lab_tab_record[tag].node.color = cc.hexToColor("#FFFFFF");
            this.lab_tab_record[tag].node.getComponent('cc.LabelOutline').color = cc.hexToColor("#2A9A2F");
        }

        switch (tabTag) {
            case "0":
                {
                    this.scrol_myRecord.node.active = true;
                    this.scrol_friendRecord.node.active = true;
                }
                break;
            case "1":
                {
                    this.scrol_myRecord.node.active = false;
                    this.scrol_friendRecord.node.active = true;
                }
                break;
            default:
                // code...
                break;
        }
    }

    /**
     * 请求战绩数据
     */
    private requestFightRecordData(userId: number, startId: number, count: number, beginTime: string, endTime: string, act: Action) {
        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        let curRuleInfo = FriendCircleDataCache.Instance.CurSelectedRule;

        if (!curFriendCircle || !curRuleInfo || userId < 0) {
            cc.log("--- error: requestFightRecordData param is error");
            return;
        }

        FriendCircleWebHandle.GroupGameStat(parseInt(curFriendCircle.ID), curRuleInfo.gameId, userId, 1, "", startId, count, beginTime, endTime, act)
    }

    /**
     * 请求我的战绩
     */
    public requestMyRecord(beginTime?: string, endTime?: string) {
        let userId = this.DataCache.UserInfo.userData.UserID;

        let _beginTime = "";
        let _endTime = "";

        if (beginTime && endTime) {
            _beginTime = beginTime;
            _endTime = endTime;
        } else {
            _beginTime = this._curSearchDate.beginTime;
            _endTime = this._curSearchDate.endTime;
        }

        this.requestFightRecordData(userId, this._myRecordStartId, 10, _beginTime, _endTime, new Action(this, (res) => {
            this._requestIng = false;

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

                this._myRecordDataList.push(data);
            }

            this._myRecordStartId = res.nextId;

            // 如果是按照日期搜索的结果则清空当前容器列表
            if (_beginTime && _endTime && this._myRecordDataList.length > 0) {
                this._scrollMyrecord.resetList();
            }

            // 更新我的战绩数据统计显示
            this.updateMyStatisticsShow();

            this.showMyRecordData(this._myRecordDataList);
        }));
    }

    /**
     * 请求亲友圈所有的战绩
     */
    public requestAllRecord(beginTime?: string, endTime?: string) {
        let _beginTime = "";
        let _endTime = "";

        if (beginTime && endTime) {
            _beginTime = beginTime;
            _endTime = endTime;
        } else {
            _beginTime = this._curSearchDate.beginTime;
            _endTime = this._curSearchDate.endTime;
        }

        this.requestFightRecordData(0, this._friendRecordStartId, 10, _beginTime, _endTime, new Action(this, (res) => {
            this._requestIng = false;

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

                this._friendRecordDataList.push(data);
            }

            // 更新开局数和耗钻数
            if ("number" == typeof res.roomamt && "number" == typeof res.roomcnt) {
                this.lab_friendDiamond.string = "耗钻数：" + res.roomamt; 
                this.lab_friendRoundNum.string = "开局数：" + res.roomcnt;
            }

            this._friendRecordStartId = res.nextId;
            this.showFriendRecordData(this.    _friendRecordDataList);
        }));
    }

    /**
     * 显示我的战绩数据
     */
    public showMyRecordData(data: any) {
        if (this._scrollMyrecord) {
            this._scrollMyrecord.refreshData(this._myRecordDataList);
        }
    }

    /**
     * 显示亲友圈战绩数据
     */
    public showFriendRecordData(data: any) {
        if (this._scrollFriendRecord) {
            this._scrollFriendRecord.refreshData(this._friendRecordDataList);
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
     * 日期选择回调
     */
    private selectDateAct(date: any) {
        this.clearData();

        this.lab_searchDate.string = "";
        this.lab_searchDate.string = date.beginTime + "至" + date.endTime;
        let year = new Date().getFullYear() + "-";
        let beginTime = year + date.beginTime;
        let endTime = year + date.endTime;

        this._curSearchDate.beginTime = beginTime;
        this._curSearchDate.endTime = endTime;

        // 请求当前选择标签的战绩数据
        switch (this._curRecordSelectTabIdx) {
            case 0:
                this.requestMyRecord(beginTime, endTime);
                break;
            case 1:
                this.requestAllRecord(beginTime, endTime);
                break;
            default:
                break;
        }
    }

    /**
     * 清空数据
     */
    private clearData() {
        // 清空我的战绩数据
        this._myRecordDataList = [];
        this._myRecordStartId = 0;
        this._friendRecordDataList = [];
        this._friendRecordStartId = 0;
        this._scrollMyrecord.resetList();
        this._scrollFriendRecord.resetList();
    }

    /**
     * 更新我的战绩数据统计显示
     */
    private updateMyStatisticsShow() {
        if (0 == this._myRecordDataList.length) {
            this.lab_myScore.string = "积分：0";
            this.lab_roundNum.string = "牌局数：0";
            this.lab_bigWinnerNum.string = "大赢家次数：0";
        } else {
            let allScore = 0;
            let gameNum = 0;
            let bigwinnerNum = 0;

            /**
             * 获取大赢家
             */
            let getBigWinner = function (data: PlayerFightScore[]): PlayerFightScore {
                let idx = 0;
                let maxScore = 0;
                for (let index = 0; index < data.length; ++index) {
                    if (data[index].moneyNum > maxScore) {
                        maxScore = data[index].moneyNum;
                        idx = index;
                    }
                }

                return data[idx];
            }

            let userId = this.DataCache.UserInfo.userData.UserID;
            for (let idx = 0; idx < this._myRecordDataList.length; ++idx) {
                let record: FriendCircleRecord = this._myRecordDataList[idx];
                // gameNum += record.gameNum;

                let bigwinner = getBigWinner(record.userData);
                for (let idx = 0; idx < record.userData.length; ++idx) {
                    if (record.userData[idx].userId == userId) {
                        allScore += record.userData[idx].moneyNum;
                        break;
                    }
                }

                if (bigwinner.userId == userId) {
                    bigwinnerNum++;
                }
            }

            this.lab_myScore.string = "积分：" + allScore;
            this.lab_roundNum.string = "牌局数：" + this._myRecordDataList.length;
            this.lab_bigWinnerNum.string = "大赢家次数：" + bigwinnerNum;
        }
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

        if (!curFriendCircle) {
            return;
        }

        FriendCircleWebHandle.GroupSetRecordFlag(parseInt(curFriendCircle.ID), showData.setId, new Action(this, (res) => {
            if ("success" != res.status) {
                return;
            }

            // 更新缓存的值
            for (var idx = 0; idx < this._myRecordDataList.length; ++idx) {
                if (this._myRecordDataList[idx] && this._myRecordDataList[idx].setId == showData.setId) {
                    this._myRecordDataList[idx].flag = res.flag;
                    break;
                }
            }

            item.refreshPraiseIcon(res.flag)
        }));
    }

    /**
     * 战绩详情按钮
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
     * 我的战绩滚动容器监听事件
     */
    public myRecordScrollEventHandle() {
        if (this._requestIng) {
            return;
        }

        if (-1 == this._myRecordStartId) {
            return;
        }

        this._requestIng = true;
        this.requestMyRecord();
    }

    /**
     * 我的战绩滚动容器监听事件
     */
    public allRecordScrollEventHandle(scrollview, eventType, customEventData) {
        if (this._requestIng) {
            return;
        }

        if (-1 == this._friendRecordStartId) {
            return;
        }

        this._requestIng = true;
        this.requestAllRecord();
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

        // 请求当前选择标签的战绩数据
        switch (this._curRecordSelectTabIdx) {
            case 0:
                this.requestMyRecord();
                break;
            case 1:
                this.requestAllRecord();
                break;
            default:
                break;
        }
    }

    /**
     * 战绩标签点击事件处理
     */
    public btnTabRecordClickHandle(event, args) {
        this.tabRecordChangeLogic(args);
        this.clearData();

        switch (args) {
            case "0":
                {
                    this.node_friendStatistics.active = false;
                    this.node_myStatistics.active = true;
                    this.scrol_myRecord.node.active = true;
                    this.scrol_friendRecord.node.active = false;
                    this.lab_result.node.active = true;
                    this.node_myField.active = true;
                    this.node_friendField.active = false;
                    this.requestMyRecord();
                }
                break;
            case "1":
                {
                    this.node_friendStatistics.active = true;
                    this.node_myStatistics.active = false;
                    this.scrol_myRecord.node.active = false;
                    this.scrol_friendRecord.node.active = true;
                    this.lab_result.node.active = false;
                    this.node_myField.active = false;
                    this.node_friendField.active = true;
                    this.requestAllRecord();
                }

                break;
            default:
                // code...
                break;
        }
    }

    /**
     * 刷新按钮点击事件处理
     */
    public btnRefreshClickHandle(event, args) {
        this.clearData();

        switch (this._curRecordSelectTabIdx) {
            case 0:
                {
                    this.requestMyRecord();
                }
                break;
            case 1:
                {
                    this.requestAllRecord();
                }
                break;
            default:
                break;
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
