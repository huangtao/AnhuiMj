import Global from "../../Global/Global";
import TurntableRecordEntity from "./TurntableRecordEntity";
import { DateTime } from "../../Serializer/DateTime";

const { ccclass, property } = cc._decorator;

/**
 * 转盘记录奖励项
 * Author:Cyq
 * Date:2018/12/18
 */
@ccclass
export default class TurntableRecordItem extends cc.Component {

    @property(cc.Label)
    private prizeNum: cc.Label = null;

    @property(cc.Label)
    private prizeName: cc.Label = null;

    @property(cc.Label)
    private time: cc.Label = null;

    @property(cc.Label)
    private PrizeType = null;

    /**
     * 接收传过来的值
     */
    private RecordInfo: TurntableRecordEntity = null;

    /**
     * 进行初始化操作
     * @param recordInfo 
     */
    public InitData(recordInfo: TurntableRecordEntity) {
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
    private Init(recordInfo: TurntableRecordEntity) {
        this.prizeNum.string = recordInfo.prizeNum.toString();
        this.prizeName.string = recordInfo.prizeName;
        this.time.string = DateTime.FromTimeStamp(parseInt(recordInfo.addTime)).ToString("");

        let str = "";

        switch (recordInfo.prizeType.toString()) {
            case "VQ":
            case "VD":
                str = "虚拟";
                break;
            case "VR":
                str = "实物"
                break;
            default:
                str = "未知"
                break;
        }

        this.PrizeType.string = str;
    }
}
