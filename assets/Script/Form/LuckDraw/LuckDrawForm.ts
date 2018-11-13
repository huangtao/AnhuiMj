import UIBase from "../Base/UIBase";
import { ActionNet, Action } from "../../CustomType/Action";
import { WebRequest } from "../../Net/Open8hb";
import Dictionary from "../../CustomType/Dictionary";
import { DrawItem } from "./DrawItem";
import { PrizeItem } from "./PrizeItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LuckDrawForm extends UIBase<any> {
    public IsEventHandler: boolean;
    public IsKeyHandler: boolean;

    @property(cc.Label)
    lastTimes: cc.Label=null;

    @property(cc.Node)
    round: cc.Node=null;

    @property(cc.Node)
    content: cc.Node=null;

    @property(cc.Prefab)
    prizePrefab: cc.Prefab=null;

    @property(cc.Prefab)
    itemPrefab: cc.Prefab=null;

    private static itemPopl: cc.NodePool = new cc.NodePool("DrawItem");

    //private _times = 0;
    private CurTimes = 0;
    private UseTimes = 0;
    private _clickLock: boolean = false;
    onLoad() {
        super.onLoad();
        const action = new ActionNet(this, this.onSetSuc, this.onSetErr);
        // WebRequest.prize.getsetlist(action);
    }

    private _prizeList = new Dictionary<number, PrizeItemSet>()

    InitShow() {
        this.RefreshData();
    }

    private RefreshData(){
        const action = new ActionNet(this, this.onPropSuc, this.onPropErr);
        const data = WebRequest.DefaultData();
        // WebRequest.prize.get_turn_times(action, data);

        this.clearContent();
        const action1 = new ActionNet(this, this.onProListSuc, this.onProErr);
        data.Add("count", 40);
        data.Add("startid", 0);
        // WebRequest.prize.getlist(action1, data);
    }
    /**
     * 如果转盘正在旋转，则禁止关闭，防止出现一些问题
     * @param action 
     */
    public Close(action?: Action) {
        if (this._clickLock) {
            return;
        }
        super.Close(action);
    }

    private clearContent() {
        while (this.content.childrenCount > 0) {
            LuckDrawForm.itemPopl.put(this.content.children[0]);
        }
    }


    private FlushTimes() {
        if (cc.isValid(this.lastTimes)) {
            this.lastTimes.string = `剩余${this.CurTimes - this.UseTimes}次`;
        }
    }

    /**
     * 点击开始抽奖
     */
    goClick() {
        if (!(this.CurTimes-this.UseTimes > 0)) {
            this.UiManager.ShowTip("你已经没有抽奖机会了\n快去完成任务获得抽奖机会吧！");
            return;
        }

        if (this._clickLock) {
            return;
        }
        this._clickLock = true;
        const action = new ActionNet(this, this.onDrawSuc, this.onDrawErr);
        const data = WebRequest.DefaultData();
        // WebRequest.prize.luck_draw(action, data);
    }

    /**
     * 转啊转
     * @param data
     */
    roundGo(data: DrawPrize) {
        this.CurTimes = data.CurTimes;
        this.UseTimes = data.UserTimes;
        this.FlushTimes();
        let str: string;
        if (data.MoneyNum === 0) {
            str = "很遗憾你没有中奖";
        } else {
            str = "恭喜你获得" + this._prizeList.GetValue(data.side).title;
        }
        var finished = cc.callFunc(function (target, title) {
            this._clickLock = false;
            this.UiManager.ShowTip(title);
            this.RefreshData();
        }, this, str);//动作完成后 提示玩家

        this.round.rotation = 0;
        let round = 360 + 10;//先预制移量15度
        const offset = Math.random() * 20;//随机产生一个偏移
        let idx = this._prizeList.Keys.indexOf(data.side);
        if (idx < 0) {
            this.UiManager.ShowTip("抽奖出现异常，请联系客服");
            return;
        }
        idx = 12 - idx;
        round += idx * 30;
        round -= offset;//计算最终角度
        let action = cc.sequence(cc.rotateBy(2, round).easing(cc.easeSineInOut()), finished);
        this.round.runAction(action);
    }

    /**
     * 奖品列表
     * @param data 
     */
    onSetSuc(data) {
        const arr: Array<PrizeItemSet> = data.data;
        for (let i = 0; i < arr.length && i < 12; i++) {
            this._prizeList.Add(arr[i].Side, arr[i]);
            const node = cc.instantiate(this.prizePrefab);
            let prizeItem = node.getComponent<PrizeItem>(PrizeItem);
            node.rotation = 30 * i;
            node.parent = this.round;
            // prizeItem.img.node.rotation = -30 * i;
            // prizeItem.count.node.rotation=-30*i;
            prizeItem.data = arr[i];
            prizeItem.Init();
        }
    }
    onSetErr() {
        this.UiManager.ShowTip("获取奖品信息失败，请联系客服");
    }

    /**
     * 抽奖剩余次数结果返回
     * @param data 
     */
    onPropSuc(data) {
        if (isNaN(data.UseTimes) || isNaN(data.CurTimes) || data.UseTimes > data.CurTimes) {
            this.CurTimes = 0;
            this.UseTimes = 0;
        } else {
            //this._times = data.CurTimes - data.UseTimes;
            this.CurTimes = data.CurTimes;
            this.UseTimes = data.UseTimes;
        }
        this.FlushTimes();
    }



    onPropErr() {
        this.UiManager.ShowTip("获取剩余抽奖次数失败，请联系客服");
        this.lastTimes.string = `未获取到剩余抽奖次数`;
    }


    /**
     * 抽奖结果返回
     * @param obj 抽奖结果返回
     */
    onDrawSuc(obj) {
        cc.log(obj.data);

        this.roundGo(obj.data);
    }

    onDrawErr() {
        this.UiManager.ShowTip("抽奖失败，请联系客服");
        this._clickLock = false;
    }

    /**
     * 中奖纪录返回
     * @param data 
     */
    onProListSuc(obj) {
        if (!obj) return;
        const arr: Array<DrawDataItem> = obj.data;
        for (let i = 0; i < arr.length; i++) {
            let node=LuckDrawForm.itemPopl.get();
            if(!cc.isValid(node)){
                node=cc.instantiate(this.itemPrefab);
            }
            let d= node.getComponent<DrawItem>(DrawItem);
            d.data=arr[i];
            d.Init();
            node.parent=this.content;
        }
    }

    onProErr() {

    }


}

/**
 * 奖品列表
 */
export class PrizeItemSet {
    title: string;
    Side: number;
    id:number;
    MoneyType:number;
    MoneyNum:number;
    ImgUrl:string;
}

/**
 * 抽奖结果
 */
export class DrawPrize {
    CurTimes: number;
    MoneyNum = 0
    MoneyType = 0
    UserTimes = 18
    side = 7
}

/**
 * 中奖纪录表
 */
export class DrawDataItem {
    id: number;
    GetMoneyNum: number;
    GetMoneyType: number;
    Ctime: string;
    remark: string;
}