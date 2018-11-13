import UIBase from "../Base/UIBase";
import { UIName } from "../../Global/UIName";
import GiftInfo from "./GiftInfo";
import { LoadHeader } from "../../Tools/Function";
import { ActionNet } from "../../CustomType/Action";
import { WebRequest } from "../../Net/Open8hb";
import { LocalStorage } from "../../CustomType/LocalStorage";

const { ccclass, property } = cc._decorator;

/**
 * 处理玩家兑换
 * author:Cyq
 */
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
    @property(cc.EditBox)
    rechargeNum: cc.EditBox = null;
    /**
     * 手机号
     */
    @property(cc.EditBox)
    phoneNum: cc.EditBox = null;
    /**
     * 姓名
     */
    @property(cc.EditBox)
    userName: cc.EditBox = null;
    /**
     * 收货地址
     */
    @property(cc.EditBox)
    userAddress: cc.EditBox = null;

    private giftInfo: GiftInfo = null;

    private gifttype: number = null;

    /**
     * 初始化参数
     */
    InitShow() {
        this.giftInfo = this.ShowParam;
        if (this.desc_label) {
            this.desc_label.string = this.giftInfo.introduces;
        }
        if (this.giftName_label) {
            this.giftName_label.string = this.giftInfo.giftName;
        }
        if (this.giftCoupon_label) {
            this.giftCoupon_label.string = this.giftInfo.qidou.toString();
        }

        LoadHeader(this.giftInfo.giftpic, this.giftImg);

        //判断礼品类型，显示不同的editBox
        this.gifttype = this.giftInfo.gifttype;
        switch (this.gifttype) {
            case 1://虚拟
                this.node_entity.active = false;
                this.node_phone.active = false;
                this.node_virtual.active = true;
                break;
            case 5://话费
                this.node_entity.active = false;
                this.node_virtual.active = false;
                this.node_phone.active = true;
                break;
            default://实物
                this.node_virtual.active = false;
                this.node_phone.active = true;
                this.node_entity.active = true;
                break;
        }

        let take_name = LocalStorage.GetItem("take_name");
        if(take_name && take_name != ""){
            this.userName.string = take_name;
        }

        let take_phone = LocalStorage.GetItem("take_phone");
        if(take_phone && take_phone != ""){
            this.phoneNum.string = take_phone;
        }

        let take_address = LocalStorage.GetItem("take_address");
        if(take_address && take_address != ""){
            this.userAddress.string = take_address;
        }
    }

    /**
     * 验证玩家输入的值是否合法
     * @param rechargeNum 虚拟物品充值账号
     * @param phoneNum  玩家手机号
     * @param userAddress 用户地址
     * @param userName  用户姓名
     */
    private checkparam(rechargeNum, phoneNum, userAddress, userName) {
        if (rechargeNum != null && (rechargeNum == "" || rechargeNum.length <= 0)) {
            return false;
        }

        if (phoneNum != null && (phoneNum == "" || phoneNum.length <= 0)) {
            return false;
        }else{
            if(phoneNum != null){
                let regex = /^[1][3,4,5,7,8][0-9]{9}$/;

                if(!regex.test(phoneNum)){
                    return false;
                }
            }
        }

        if (userAddress != null && (userAddress == "" || userAddress.length <= 0)) {
            return false;
        }

        if (userName != null && (userName == "" || userName.length <= 0)) {
            return false;
        }

        return true;
    }

    /**
     * 获取用户输入的信息，进行兑换
     */
    private startExchangeClick() {
        let rechargeNum = this.rechargeNum.string;
        let phoneNum = this.phoneNum.string;
        let userAddress = this.userAddress.string;
        let userName = this.userName.string;

        switch (this.gifttype) {
            case 1:
                if (!this.checkparam(rechargeNum, null, null, null)) {
                    this.UiManager.ShowTip("虚拟物品充值账号不合法!");
                    return;
                }else{
                    phoneNum = "无";
                    userAddress = "无";
                    userName = "无";
                }
                break;
            case 2:
            case 3:
            case 4:
            case 6:
                if (!this.checkparam(null, phoneNum, userAddress, userName)) {
                    this.UiManager.ShowTip("收货信息不合法!");
                    return;
                }else{
                    rechargeNum = "无";
                }
                break;
            case 5:
                if (!this.checkparam(null, phoneNum, null, null)) {
                    this.UiManager.ShowTip("手机号不合法!");
                    return;
                }else{
                    rechargeNum = "无";
                    userAddress = "无";
                    userName = "无";
                }
                break
            default:
                break;
        }

        let action = new ActionNet(this, this.ExChangeSuccess, this.ExChangeError);
        WebRequest.gift.giftRequest(action, this.giftInfo.giftId, userName, phoneNum, userAddress, rechargeNum);
        this.UiManager.ShowLoading("已成功发送兑换请求. 请稍等");
    }

    /**
     * 兑换成功
     */
    private ExChangeSuccess(){
        this.UiManager.CloseLoading();
        this.UiManager.ShowTip("兑换请求发送成功 请等待审核!");
        this.UiManager.DestroyUi(UIName.GiftExchange);
    }

    /**
     * 兑换失败
     */
    private ExChangeError(){
        this.UiManager.CloseLoading();
        this.UiManager.ShowTip("兑换失败!");
    }

    /**
     * 清空EditBox输入参数
     */
    ClearEditText(){
        this.userName.string = "";
        this.phoneNum.string = "";
        this.rechargeNum.string = "";
        this.userAddress.string = "";
    }

    CloseClick(){
        this.Close();
        this.ClearEditText();
    }
}
