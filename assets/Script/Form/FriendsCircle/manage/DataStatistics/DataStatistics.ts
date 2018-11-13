import { Action, ActionNet } from "../../../../CustomType/Action";
import { UIName } from "../../../../Global/UIName";
import Global from "../../../../Global/Global";
import FriendCircleDataCache from "../../FriendCircleDataCache";
import FriendCircleWebHandle from "../../FriendCircleWebHandle";
import ManageChildBase from "../ManageChildBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DataStatistics extends ManageChildBase {
	/**
     * 今日耗钻
     */
    @property(cc.Label)
    lab_todayCostNum: cc.Label = null;

    /**
     * 昨日耗钻
     */
    @property(cc.Label)
    lab_yesterdayCostNum: cc.Label = null;

    /**
     * 七日耗钻
     */
    @property(cc.Label)
    lab_sevenDayCostNum: cc.Label = null;

    /**
     * 今日开房数
     */
    @property(cc.Label)
    lab_todayRoomNum: cc.Label = null;

    /**
     * 昨日开房数
     */
    @property(cc.Label)
    lab_yesterdayRoomNum: cc.Label = null;

    /**
     * 七日开房数
     */
    @property(cc.Label)
    lab_sevenDayRoomNum: cc.Label = null;

    /**
     * 初始化显示
     */
    public InitShow() {
        // 请求战绩数据
        let act = new Action(this,(res)=>{
            Global.Instance.UiManager.CloseLoading();

            if (res && res.status == 'success') {
                
                // 今日耗钻
                if (this.lab_todayCostNum) {
                    this.lab_todayCostNum.string = res['today_roomamt'];
                }

                // 昨日耗钻
                if (this.lab_yesterdayCostNum) {
                    this.lab_yesterdayCostNum.string = res['yesterday_roomamt'];
                }

                // 七日耗钻
                if (this.lab_sevenDayCostNum) {
                    this.lab_sevenDayCostNum.string = res['day7_roomamt'];
                }

                // 今日开局
                if (this.lab_todayRoomNum) {
                    this.lab_todayRoomNum.string = res['today_roomcnt'];
                }

                // 昨日开局
                if (this.lab_yesterdayRoomNum) {
                    this.lab_yesterdayRoomNum.string = res['yesterday_roomcnt'];
                }

                // 七日开局
                if (this.lab_sevenDayRoomNum) {
                    this.lab_sevenDayRoomNum.string = res['day7_roomcnt'];
                }
            }
        });

        Global.Instance.UiManager.ShowLoading('正在获数据');
        let curFriendInfo = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        FriendCircleWebHandle.getGroupStat(parseInt(curFriendInfo.ID),act);
    }
}
