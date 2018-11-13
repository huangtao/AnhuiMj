import UIBase from "../Base/UIBase";
import { ActionNet } from "../../CustomType/Action";
import { WebRequest } from "../../Net/Open8hb";
import Global from "../../Global/Global";
import ConfigData from "../../Global/ConfigData";
import { NativeCtrl } from "../../Native/NativeCtrl";
import { QL_Common } from "../../CommonSrc/QL_Common"
import ShopFormItems from './ShopFormItems';
import { EventCode } from "../../Global/EventCode";
import { UIName } from "../../Global/UIName";
import { SystmPushMessage } from "../../CustomType/SystmPushMsg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopForm extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.Node)
    private content : cc.Node = null;

    @property(cc.Prefab)
    private ItemPrefab : cc.Prefab = null;

    @property(cc.Label)
    private lab_diamond : cc.Label = null;

    @property(cc.Prefab)
    private ShopItemBg : cc.Prefab = null;

    public static ShopFormItems : ShopFormItems = null;
 
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.UiManager.ShowLoading("正在获取商品列表");

        const data = WebRequest.DefaultData();
        const action = new ActionNet(this, this.success, this.error);
        WebRequest.pay.PayList(action, data);

        if (cc.isValid(this.lab_diamond)) {
            if(!Global.Instance.DataCache.UserInfo.userData.MoneyBag) {
                return;
            }

            // 钻石
            this.lab_diamond.getComponent(cc.Label).string = Global.Instance.DataCache.UserProp.GetValue(QL_Common.CurrencyType.Diamond) + ""
        }
    }

    OnEventComeIn(eventCode: number, value: any): boolean {
        switch (eventCode) {
            case EventCode.SystmPushMsg:
                let temp = <SystmPushMessage>value;
                switch (temp.EventCode) {
                    case "hall.paysuccess":
 
                    if(ShopForm.ShopFormItems){
                        this.lab_diamond.getComponent(cc.Label).string = Global.Instance.DataCache.UserProp.GetValue(QL_Common.CurrencyType.Diamond) + ""
                        Global.Instance.UiManager.ShowUi(UIName.ShopGiftPanel, ShopForm.ShopFormItems); //弹出奖励面板
                    }
                    return false;
                }
        }
        // return this.OnUiEventComeIn(eventCode,value);
        return super.OnEventComeIn(eventCode, value);
    }

    // start() {
    // }

    private success(json){
        this.UiManager.CloseLoading();
        if(!json.data){
            this.UiManager.ShowTip("没有配置任何的充值项!")
            return
        }

        let data = json.data

        let i = 0;
        let item_bg:cc.Node;

        for (let v of data) {
            if(i % 4 == 0){
                item_bg = cc.instantiate(this.ShopItemBg);
                this.content.addChild(item_bg);
            }

            let item = cc.instantiate(this.ItemPrefab);
            let ShopFormItems:ShopFormItems = item.getComponent("ShopFormItems");
            if(cc.isValid(ShopFormItems)){
                ShopFormItems.InitData(v);
            }
            item_bg.getChildByName("img_bg").addChild(item);

            i++;
        }
    }

    private error(){
        this.UiManager.CloseLoading();
        this.UiManager.ShowTip("获取充值项失败，请检查网络连接或重新登录");
    }

    private ClickItem(){
        this.UiManager.ShowTip("购买道具功能未上线. 请各位玩家敬请期待")
    }

    // CloseClick(){
    //     this.UiManager.DestroyUi(UIName.Shop);
    // }
}
