import UIBase from "../Base/UIBase";
import GiftExChangeRecordInfo from "./GiftExChangeRecordInfo";
import { LoadHeader } from "../../Tools/Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GiftExchange extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;
    /**
     * 礼品简介
     */
    @property(cc.Label)
    desc_label: cc.Label = null;
    /**
     * 礼品名称
     */
    @property(cc.Label)
    giftName_label: cc.Label = null;
    /**
     * 所需七豆数量
     */
    @property(cc.Label)
    giftCoupon_label: cc.Label = null;
    /**
     * 礼品图片
     */
    @property(cc.Sprite)
    giftImg: cc.Sprite = null;
    /**
     * 虚拟物品editBox
     */
    @property(cc.Node)
    node_virtual: cc.Node = null;
    /**
     * 实物礼品editBox
     */
    @property(cc.Node)
    node_entity: cc.Node = null;
    /**
     * 话费editBox
     */
    @property(cc.Node)
    node_phone: cc.Node = null;
    /**
     * 虚拟物品充值账号
     */
    @property(cc.Label)
    rechargeNum: cc.Label = null;
    /**
     * 话费手机号
     */
    @property(cc.Label)
    phoneNum: cc.Label = null;
    /**
     * 姓名
     */
    @property(cc.Label)
    userName: cc.Label = null;

    /**
     * 收货时手机号
     */
    @property(cc.Label)
    tel : cc.Label = null;

    /**
     * 收货地址
     */
    @property(cc.Label)
    userAddress: cc.Label = null;

    @property(cc.Label)
    orderStatus: cc.Label = null;

    InitShow() {
        let param: GiftExChangeRecordInfo = this.ShowParam;
        if (!param) {
            return;
        }

        this.InitData(param);
    }

    private InitData(giftInfo: GiftExChangeRecordInfo) {
        this.desc_label.string = giftInfo.introduce;
        this.giftName_label.string = giftInfo.giftName;
        this.giftCoupon_label.string = giftInfo.qiDou.toString();

        // this.rechargeNum.string = giftInfo.chacCount + "";
        // this.phoneNum.string = giftInfo.tel + "";
        // this.userName.string = giftInfo.name + "";
        // this.userAddress.string = giftInfo.address + "";

        LoadHeader(giftInfo.giftPic, this.giftImg);

        switch (giftInfo.giftType) {
            case 1://虚拟
                this.node_entity.active = false;
                this.node_phone.active = false;
                this.node_virtual.active = true;

                this.rechargeNum.string = giftInfo.chacCount + "";
                // this.rechargeNum.getComponent("cc.EditBox").enabled = false;
                break;
            case 5://话费
                this.node_entity.active = false;
                this.node_virtual.active = false;
                this.node_phone.active = true;

                this.phoneNum.string = giftInfo.tel + "";
                // this.phoneNum.getComponent("cc.EditBox").enabled = false;
                break;
            default://实物
                this.node_virtual.active = false;
                this.node_phone.active = false;
                this.node_entity.active = true;

                this.userName.string = giftInfo.name + "";
                this.tel.string = giftInfo.tel + "";
                this.userAddress.string = giftInfo.address + "";
                // this.phoneNum.getComponent("cc.EditBox").enabled = false;
                // this.userName.getComponent("cc.EditBox").enabled = false;
                // this.userAddress.getComponent("cc.EditBox").enabled = false;
        }

        let str = "";

        switch (giftInfo.status.toString()) {
            case "0":
                str = "失败";
                break;
            case "1":
                str = "成功";
                break;
            case "2":
                str = "处理中";
                break;
            default:
                str = "未知";
                break;
        }

        this.orderStatus.string = str;
    }

}