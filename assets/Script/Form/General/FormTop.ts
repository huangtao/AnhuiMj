import { QL_Common } from "../../CommonSrc/QL_Common"

import { UIName } from "../../Global/UIName";
import { LocalStorage } from "../../CustomType/LocalStorage";
import Global from "../../Global/Global";
import UIBase from "../../Form/Base/UIBase";
import { LoadHeader, Debug, IsTest } from "../../Tools/Function";

const { ccclass, property } = cc._decorator;
@ccclass
export default class FormTop extends cc.Component {
    /**
     * 返回面板
     */
    @property(cc.Node)
    node_return: cc.Node = null;

    /**
     * 头像面板
     */
    @property(cc.Node)
    node_head: cc.Node = null;

    /**
     * Form名称
     */
    @property(cc.Sprite)
    sp_formName: cc.Sprite = null;


    /**
     * 钻石label
     */
    @property(cc.Label)
    lab_diamond: cc.Label = null;

    /**
     * 七豆label
     */
    @property(cc.Label)
    lab_qiDou: cc.Label = null;

    /** 
       头像
     */
    @property(cc.Sprite)
    header: cc.Sprite = null;

    /** 
       ID
     */
    @property(cc.Label)
    ID: cc.Label = null;

    /** 
       昵称
     */
    @property(cc.Label)
    nickname: cc.Label = null;

    /**
     * 附加的节点
     */
    @property(cc.Node)
    node_parent: cc.Node = null;

    public onLoad(): void{
        this.refreshDataShow();
    }
    
    /**
     * 刷新数据显示
     */
    public refreshDataShow(): void{
        if (!Global.Instance.DataCache.UserInfo
            || !Global.Instance.DataCache.UserInfo.userData) {
            return;
        }

        if (cc.isValid(this.lab_qiDou) && cc.isValid(this.lab_diamond)) {
            if(!Global.Instance.DataCache.UserProp) {
                return;
            }

            // 七豆
            this.lab_qiDou.getComponent(cc.Label).string = Global.Instance.DataCache.UserProp.GetValue(QL_Common.CurrencyType.QiDou) + "";
            // 钻石
            this.lab_diamond.getComponent(cc.Label).string = Global.Instance.DataCache.UserProp.GetValue(QL_Common.CurrencyType.Diamond) + ""
        }
        
        if (this.node_head && this.node_head.active) {
            if (cc.isValid(this.nickname)
                && cc.isValid(this.ID)
                && cc.isValid(this.header)) {
                //昵称
               this.nickname.string = Global.Instance.DataCache.UserInfo.userData.NickName; 
               //ID
               this.ID.string = "ID:" + Global.Instance.DataCache.UserInfo.userData.UserID; 
               //头像
               LoadHeader(Global.Instance.DataCache.UserInfo.userData.Header, this.header);
            }
        }
    }

    /**
     * 设置
     */
    private settingClick() {
        Global.Instance.UiManager.ShowUi(UIName.Setting);
    }

    /**
     * 邮件
     */
    private emailClick() {
        Global.Instance.UiManager.ShowUi(UIName.Email);
    }

    /**
     * 头像
     */
    private headClick() {
        Global.Instance.UiManager.ShowUi(UIName.Person);
    }

    /**
     * 购买钻石
     */
    private  buyDiamond(){
        Global.Instance.UiManager.ShowUi(UIName.Shop);
    }

     /**
     * 返回
     */
    private backClick() {
        if (!this.node_parent) {
            return;
        }

        let formBase: UIBase<any> = this.node_parent.getComponent(UIBase);

        if (formBase) {
            formBase.CloseClick();
        }
    }
}