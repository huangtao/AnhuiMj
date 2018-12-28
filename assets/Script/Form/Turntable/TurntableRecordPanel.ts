import UIBase from "../Base/UIBase";
import { WebRequest } from "../../Net/Open8hb";
import { ActionNet } from "../../CustomType/Action";
import TurntableRecordEntity from "./TurntableRecordEntity";
import TurntableRecordItem from "./TurntableRecordItem";

const {ccclass, property} = cc._decorator;

/**
 * 转盘记录面板
 * Author:Cyq
 * Date:2018/12/18
 */
@ccclass
export default class TurntableRecordPanel extends UIBase<any> {
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
        
        this.UiManager.ShowLoading("正在获取抽奖记录数据");
        const data = WebRequest.DefaultData();
        data.Add("count", 50);
        data.Add("page", 0);
        const action = new ActionNet(this, this.success, this.error);
        WebRequest.Turntable.getPrizeRecord(action, data);
    }

    private success(obj) {
        this.UiManager.CloseLoading();
        this.UiManager.ShowLoading("正在初始化抽奖记录数据");
        if (!obj) {
            this.UiManager.CloseLoading();
            this.UiManager.ShowTip("初始化信息异常");
            return;
        }

        let dataList = obj.data

        let recordInfo: TurntableRecordEntity = null;
        let data = null;

        let RecordInfoArray = new Array<TurntableRecordEntity>()
        for (var i = 0; i < dataList.length; i++) {
            recordInfo = new TurntableRecordEntity;
            data = dataList[i];
            if (recordInfo && data) {
                recordInfo.prizeId = data[0];
                recordInfo.prizeName = data[1];
                recordInfo.prizeNum = data[2];
                recordInfo.prizeType = data[3];
                recordInfo.addTime = data[4];
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
                    let turntableRecordItem: TurntableRecordItem = record_item.getComponent("TurntableRecordItem");
                    if (turntableRecordItem) {
                        turntableRecordItem.InitData(RecordList[index]);
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
