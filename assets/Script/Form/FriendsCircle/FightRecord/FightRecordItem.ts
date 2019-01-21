import { Action } from "../../../CustomType/Action";
import { FriendCircleRecord, PlayerFightScore } from "../../../CustomType/FriendCircleInfo";
import { MillisSecondToDate } from "../../../Tools/Function";
import Global from "../../../Global/Global";
import PlayerRecordDetailItem from "./PlayerRecordDetailItem";
import ScrollHelperItem from "../../../utils/ScrollHelperItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FightRecordItem extends ScrollHelperItem {
    /**
     * 游戏名称
     */
    @property(cc.Label)
    lab_gameName: cc.Label = null;

    /**
    * 游戏结束时间日期
    */
    @property(cc.Label)
    lab_time_day: cc.Label = null;

    /**
    * 游戏结束时间秒数
    */
    @property(cc.Label)
    lab_time_second: cc.Label = null;

    /**
    * 大赢家昵称
    */
    @property(cc.Label)
    lab_bigwinnerNick: cc.Label = null;

    /**
    * 大赢家Id
    */

    @property(cc.Label)
    lab_bigwinnerUserId: cc.Label = null;

    /**
     * 房间号
     */
    @property(cc.Label)
    lab_roomId: cc.Label = null;

    /**
    * 局数
    */
    @property(cc.Label)
    lab_roundNum: cc.Label = null;

    /**
    * 胜利或失败图标
    */
    @property(cc.Sprite)
    sp_winOrFail: cc.Sprite = null;

    /**
    * 点赞按钮
    */
    @property(cc.Sprite)
    sp_praise: cc.Sprite = null;

    /**
    * 胜利、失败图标
    */
    @property([cc.SpriteFrame])
    frame_winOrFail: cc.SpriteFrame[] = [];

    /**
    * 点赞灰色、和正常状态图标
    */
    @property([cc.SpriteFrame])
    frame_praise: cc.SpriteFrame[] = [];

    /**
     * 玩家分数列表滚动容器
     */
    @property(cc.ScrollView)
    scroll_scoreList: cc.ScrollView = null;

    /**
     * 玩家分数列表容器
     */
    @property(cc.Layout)
    layout_scoreList: cc.Layout = null;

    /**
     * 玩家分数详情预制体
     */
    @property(cc.Prefab)
    prefab_scoreDetail: cc.Prefab = null;

    // 战绩详情按钮点击事件
    private _recordDetailAct: Action = null;

    set RecordDetailHandle(act: Action) {
        this._recordDetailAct = act;
    }

    // 点赞按钮事件回调
    private _praiseAct: Action = null;

    set PraiseActHandle(act: Action) {
        this._praiseAct = act;
    }

    private _showData: FriendCircleRecord = null;

    public get ShowData(): FriendCircleRecord {
        return this._showData;
    }

    private _scoreItemList: PlayerRecordDetailItem[] = [];
    /**
     * 初始化界面显示
     */
    public initUI(data: FriendCircleRecord): void {
        if (!data) {
            return;
        }

        try {
            this._showData = data;

            // 游戏名称
            this.lab_gameName.string = data.gameName;

            // 结束时间日期
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

            let tmpStr = MillisSecondToDate(data.addTime * 1000);
            let dayStr = getDayStr(data.addTime * 1000);
            let hourStr = tmpStr.substr(tmpStr.indexOf(" "), tmpStr.length - 1);

            this.lab_time_day.string = dayStr;
            this.lab_time_second.string = hourStr;

            let bigwinner = this.getBigWinner(data.userData);
            // cc.log(bigwinner, data.userData);

            if (bigwinner) {
                let bigWinNickName: string = bigwinner.nickName;
                if (bigWinNickName.length > 4) {
                    bigWinNickName = bigWinNickName.substr(0, 4) + '...';
                }
                // 大赢家显示
                this.lab_bigwinnerNick.string = bigWinNickName;
                this.lab_bigwinnerUserId.string = bigwinner.userId + "";
            } else {
                this.lab_bigwinnerNick.string = "无";
                this.lab_bigwinnerUserId.string = "无";
            }


            // 桌号
            this.lab_roomId.string = data.tableId + "";

            // 局数
            this.lab_roundNum.string = data.gameNum + "";

            // 胜利失败图标
            if (this.sp_winOrFail) {
                this.sp_winOrFail.spriteFrame = this.frame_winOrFail[this.isWinner(data.userData)];
            }

            // 赞图标显示
            if (data.flag > 0) {
                this.sp_praise.spriteFrame = this.frame_praise[1];
            } else {
                this.sp_praise.spriteFrame = this.frame_praise[0];
            }

            let scroll_score: cc.ScrollView = this.scroll_scoreList.getComponent("cc.ScrollView");
            scroll_score.scrollToTop();
            
            // 显示所有玩家的分数详情
            if (data.userData) {
                if (0 == data.userData.length) {
                    for (let idx = 0; idx < this._scoreItemList.length; ++idx) {
                        this._scoreItemList[idx].node.active = false;
                    }
                }

                this.layout_scoreList.node.removeAllChildren();
                let num = this._scoreItemList.length;

                for (let idx = 0; idx < data.userData.length; ++idx) {
                    let scoreDetail = null;
                    let detailComp: PlayerRecordDetailItem = null;

                    if (this._scoreItemList[idx]) {
                        detailComp = this._scoreItemList[idx];
                    } else if (idx >= num && data.userData.length > num) {
                        scoreDetail = cc.instantiate(this.prefab_scoreDetail);
                        detailComp = scoreDetail.getComponent(PlayerRecordDetailItem);
                        this._scoreItemList.push(detailComp);
                    }

                    if (detailComp) {
                        detailComp.node.active = true;
                        detailComp.initUI(data.userData[idx]);
                        this.layout_scoreList.node.addChild(detailComp.node);
                    }
                }
            }

        } catch (e) {
            cc.log(e);
        }

    }

    /**
     * 获取大赢家
     */
    private getBigWinner(data: PlayerFightScore[]): PlayerFightScore {
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

    /**
     * 获取是否是胜利或失败
     */
    private isWinner(data: PlayerFightScore[]): number {
        let userId = this._showData.currentUserId;
        if (!cc.isValid(userId) || userId <= 0) {
            userId = Global.Instance.DataCache.UserInfo.userData.UserID;
        }
        for (let index = 0; index < data.length; ++index) {
            if (userId == data[index].userId) {
                if (data[index].moneyNum > 0) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
        return 0;
    }

    /**
     * 更新赞图标显示
     */
    public refreshPraiseIcon(status: number) {
        if (typeof status != "number") {
            return;
        }

        if (!this.frame_praise[status]) {
            return;
        }

        // 赞图标显示
        this.sp_praise.spriteFrame = this.frame_praise[status];
    }

    /**
     * 战绩详情按钮
     */
    public btnRecordDetailClickEvent(): void {
        if (this._recordDetailAct) {
            this._recordDetailAct.Run([this]);
        }
    }

    /**
     * 点赞按钮点击事件处理
     */
    public btnPraiseClickEvent(): void {
        if (this._praiseAct) {
            this._praiseAct.Run([this]);
        }
    }
}
