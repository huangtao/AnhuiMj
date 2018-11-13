import UIBase from "../Base/UIBase";
import { ActionNet } from "../../CustomType/Action";
import { WebRequest } from "../../Net/Open8hb";
import Global from "../../Global/Global";
import UiManager from '../../Manager/UiManager';
import { UIName } from "../../Global/UIName";
import ShopForm from "./ShopForm";
const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopFormItems extends cc.Component {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.Node)
    id: cc.Node = null;

    @property(cc.Label)
    LabItemNum: cc.Label = null;

    @property(cc.Label)
    Price: cc.Label = null;

    @property(cc.Sprite)
    ShopImg: cc.Sprite = null;

    @property(cc.Label)
    private GiveNum: cc.Label = null;

    @property(cc.Node)
    private ImgGiveNum: cc.Node = null;

    @property(cc.Node)
    private RightTitle: cc.Node = null;

    public ProType: string = "钻石";
    public ProNum: string = "x0";
    public ImgId: number = 0;

    /**
     * 初始化赋值
     * @param data 
     */
    public InitData(data) {
        this.id.name = data.id.toString(); //设置商品Id

        this.Price.string = "￥" + data.rmb.toString(); //设置人民币

        // 设置图片
        let img_id = data.img_id;
        if (img_id <= 6) {
            img_id = img_id - 1;
        } else {
            img_id = 0;
        }

        this.ImgId = img_id;

        //是否显示充值返还
        let agent_id = Global.Instance.DataCache.UserInfo.userData.AgentId
        if (agent_id > 0 && data.givenum > 0) { //说明下面有代理
            this.GiveNum.string = data.givenum.toString()
            this.ImgGiveNum.active = true;
        }

        //是否为热销商品
        if (data.isHot == 1) {
            this.RightTitle.active = true;
        }

        this.ProType = this.getGiveType(data.givetype); //获取商品类型

        //设置购买获得数量
        this.ProNum = data.moneynum
        this.LabItemNum.string = this.ProNum.toString();
    }

    /**
     * 发送支付请求
     */
    private SendPayReq() {
        ShopForm.ShopFormItems = this;
        // Global.Instance.UiManager.ShowUi(UIName.ShopGiftPanel, this); //弹出奖励面板
        let action = new ActionNet(this, this.onWxAppPaySuccess, this.error);
        WebRequest.Pay.WxAppPay(action, parseInt(this.id.name), "玩家充值钻石", "wx6ea708f4d025efa5");
    }

    onWxAppPaySuccess(json: any) {
        Global.Instance.UiManager.CloseLoading();
        cc.sys.openURL(json.payUrl);
        cc.log(json.payUrl);
    }

    /**
     * 
     * @param e 点击支付
     * @param type 
     */
    public ClickItem(e, type: string): void {
        switch (type) {
            case "wxpay": {
                Global.Instance.UiManager.ShowLoading("正在准备支付相关数据");
                this.SendPayReq();
                return;
            }
        }

    }

    /**
     * 获取商品类型
     * @param type 商品类型
     */
    private getGiveType(type) {
        switch (type) {
            case "1":
                return "金币";
            case "2":
                return "钻石"
        }
    }

    private error() {
        Global.Instance.UiManager.CloseLoading();
    }
}