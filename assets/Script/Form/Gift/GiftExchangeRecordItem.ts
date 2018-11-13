import UIBase from "../Base/UIBase";
import ExChangeRecordInfo from "./GiftExChangeRecordInfo";
import { UIName } from "../../Global/UIName";
import { DateTime } from "../../Serializer/DateTime";
import Global from "../../Global/Global";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GiftExchangeRecordItem extends cc.Component {
    @property(cc.Label)
    private orderId: cc.Label = null;

    @property(cc.Label)
    private giftName: cc.Label = null;

    @property(cc.Label)
    private time: cc.Label = null;

    @property(cc.Label)
    private exChangeStatus = null;

    /**
     * 接收传过来的值
     */
    private RecordInfo : ExChangeRecordInfo = null;

    /**
     * 进行初始化操作
     * @param recordInfo 
     */
    public InitData(recordInfo: ExChangeRecordInfo) {
        if (!recordInfo) {
            Global.Instance.UiManager.ShowTip("初始化信息失败");
            return;
        }

        this.Init(recordInfo);
        this.RecordInfo = recordInfo;
    }

    /**
     * 赋值
     * @param recordInfo 
     */
    private Init(recordInfo: ExChangeRecordInfo) {
        this.orderId.string = recordInfo.orderId.toString();
        this.giftName.string = recordInfo.giftName;
        this.time.string = DateTime.FromTimeStamp(parseInt(recordInfo.addTime)).ToString("");

        let str = "";

        switch (recordInfo.status.toString()) {
            case "0":
                str = "失败";
                break;
            case "1":
                str = "成功";
                break;
            case "2":
                str = "处理中"
                break;
            default:
                str = "未知"
                break;
        }

        this.exChangeStatus.string = str;
    }

    /**
     * 当玩家点击详情时
     */
    private ClickDesc(){
        if(!this.RecordInfo){
            return;
        }

        Global.Instance.UiManager.ShowUi(UIName.GiftExchangeDetails, this.RecordInfo);
    }


}