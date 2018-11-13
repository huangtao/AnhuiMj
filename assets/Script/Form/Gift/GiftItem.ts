import GiftInfo from "./GiftInfo";
import { LoadHeader } from "../../Tools/Function";
import Global from "../../Global/Global";
import { UIName } from "../../Global/UIName";
import { UserData } from "../Record/RecordInfo";
import { QL_Common } from "../../CommonSrc/QL_Common";


const { ccclass, property } = cc._decorator;

@ccclass
export default class GiftItem extends cc.Component{
    /**
     * 七豆数量
     */
    @property(cc.Label)
    lab_qidouNum: cc.Label = null;
    /**
     * 礼品图片
     */
    @property(cc.Sprite)
    giftImg: cc.Sprite = null;
    /**
     * 礼品名称
     */
    @property(cc.Label)
    giftName: cc.Label = null;

    /**
     * 接收传来的对象
     */
    private giftInfo: GiftInfo = null;

    public InitData(Info: GiftInfo) {
        if (!Info) {
            cc.log("传过来的对象为空!");
            return;
        }

        this.giftName.string = Info.giftName;
        this.lab_qidouNum.string = Info.qidou.toString();

        LoadHeader(Info.giftpic, this.giftImg);

        this.giftInfo = Info;
    }
    /**
     * 点击进入兑换页面
     */
    private goExchangeClick() {
        let obj = this.giftInfo;

        if (!obj) {
            return;
        }

        if (Global.Instance.DataCache.UserProp.GetValue(QL_Common.CurrencyType.QiDou) < obj.qidou) {
            Global.Instance.UiManager.ShowTip("您当前的七豆数量不足以兑换该物品");
            return;
        }

        Global.Instance.UiManager.ShowUi(UIName.GiftExchange, obj);
    }
}
