import UIBase from "../Base/UIBase";
import { WebRequest } from "../../Net/Open8hb";
import { ActionNet } from "../../CustomType/Action";
import ExChangeRecordInfo from "./GiftExChangeRecordInfo";
import GiftExchangeRecordItem from "./GiftExchangeRecordItem";

const { ccclass, property } = cc._decorator;
@ccclass
export default class GiftExchangeRecord extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    /**
     * 列表根节点
     */
    @property(cc.Node)
    private content: cc.Node = null;

    /**
     * 每一项记录预制体
     */
    @property(cc.Prefab)
    private item: cc.Prefab = null;
    

    InitShow() {
        this.content.removeAllChildren();
        
        this.UiManager.ShowLoading("正在获取兑换记录数据");
        const data = WebRequest.DefaultData();
        const action = new ActionNet(this, this.success, this.error);
        WebRequest.gift.showChangeRecord(action, data);
    }

    private success(obj) {
        this.UiManager.CloseLoading();
        this.UiManager.ShowLoading("正在初始化兑换记录数据");
        if (!obj) {
            this.UiManager.CloseLoading();
            this.UiManager.ShowTip("初始化信息异常");
            return;
        }

        let dataList = obj.data

        let recordInfo: ExChangeRecordInfo = null;
        let data = null;

        let RecordInfoArray = new Array<ExChangeRecordInfo>()
        for (var i = 0; i < dataList.length; i++) {
            recordInfo = new ExChangeRecordInfo;
            data = dataList[i];
            if (recordInfo && data) {
                recordInfo.orderId = data[0];
                recordInfo.giftId = data[1];
                recordInfo.giftType = data[2];
                recordInfo.status = data[3];
                recordInfo.qiDou = data[4];
                recordInfo.addTime = data[5];
                recordInfo.tel = data[6];
                recordInfo.name = data[7];
                recordInfo.address = data[8];
                recordInfo.introduce = data[9];
                recordInfo.giftName = data[10];
                recordInfo.giftPic = data[11];
                recordInfo.chacCount = data[12];

                RecordInfoArray.push(recordInfo);
            } else {
                this.UiManager.ShowTip("初始化信息异常");
                this.UiManager.CloseLoading();
                return;
            }
        }

        this.InitRecordPanel(RecordInfoArray);
    }

    private error() {


    }

    /**
     * 初始化记录界面
     */
    private InitRecordPanel(RecordList) {
        this.UiManager.CloseLoading();
        if (!RecordList) {
            return;
        }

        for (let index = 0; index < RecordList.length; index++) {
            if (RecordList[index]) {
                let record_item = cc.instantiate(this.item);
                if (cc.isValid(record_item)) {
                    let giftExchangeRecordItem: GiftExchangeRecordItem = record_item.getComponent("GiftExchangeRecordItem");
                    if (giftExchangeRecordItem) {
                        giftExchangeRecordItem.InitData(RecordList[index]);
                        this.content.addChild(record_item);
                    }else{
                        cc.log("没有找到此脚本");
                        return;
                    }
                } else {
                    this.UiManager.ShowTip("初始化信息异常");
                    return;
                }
            } else {
                this.UiManager.ShowTip("初始化信息异常");
                return;
            }
        }

    } 
}