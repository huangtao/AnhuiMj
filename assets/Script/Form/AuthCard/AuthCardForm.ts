import UIBase from "../Base/UIBase";
import { WebRequest } from "../../Net/Open8hb";
import { ActionNet } from "../../CustomType/Action";
import { UIName } from "../../Global/UIName";
import { EventCode } from "../../Global/EventCode";

const { ccclass, property } = cc._decorator;

@ccclass
export class AuthCardForm extends UIBase<any>{
    public IsEventHandler: boolean=true;
    public IsKeyHandler: boolean=true;
    @property(cc.EditBox)
    RealName:cc.EditBox=null;
    @property(cc.EditBox)    
    CardNum:cc.EditBox=null;

    @property(cc.Node)
    no_bind_panel : cc.Node = null;

    @property(cc.Node)
    bind_panel : cc.Node = null;

    @property(cc.Label)
    lab_real_name : cc.Label = null;

    @property(cc.Label)
    lab_id_card_num : cc.Label = null;


    public ProType: string = "七豆";
    public ProNum: string = "5";
    public ImgId: number = 6;

    InitShow(){
        let real_name = this.UserInfo.userData.RealName;
        let id_card_num  = this.UserInfo.userData.IdCardNum;

        if(real_name != "" && id_card_num != ""){
            this.no_bind_panel.active = false;
            this.bind_panel.active = true;
            this.lab_real_name.string = "真实姓名为：" + real_name;
            this.lab_id_card_num.string = "身份证号为：" + id_card_num;
        }else{
            this.no_bind_panel.active = true;
            this.bind_panel.active = false;
        }
    }

    public SureClick() {

        const name = this.RealName.string;
        const id = this.CardNum.string;
        if (!name || name.length === 0) {
            this.UiManager.ShowTip("请输入姓名");
            return;
        }
        if (!this.checkID(id)) {
            this.UiManager.ShowTip("请输入有效的身份证号码");
            return;
        }
        cc.log("有效的身份信息 姓名=" + name + "  身份证号码=" + id);
        const data=WebRequest.DefaultData();
        data.Add("in_realname", name);
        data.Add("in_idcard", id);

        const action=new ActionNet(this,this.onsuccess,this.onerror);

        WebRequest.bind.BindID(action, data);
    }

    private onsuccess(str) {
        this.UserInfo.userData.RealName = this.RealName.string;
        this.UserInfo.userData.IdCardNum = this.CardNum.string;
        this.DataCache.UserInfo.userData.IsAuthentication = true;
        this.UiManager.ShowUi(UIName.ShopGiftPanel, this); //弹出奖励面板
        this.CloseClick();
        this.EventManager.PostMessage(EventCode.LatestBalance);
    }
    private onerror() {
        cc.log("绑定失败");
    }
    
    private checkID(ID: string) {
        if (typeof ID !== 'string') return false;
        var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
        var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2));
        var d = new Date(birthday);
        var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
        var currentTime = new Date().getTime();
        var time = d.getTime();
        var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        var sum = 0, i, residue;

        if (!/^\d{17}(\d|x)$/i.test(ID)) return false;
        if (city[ID.substr(0, 2)] === undefined) return false;
        if (time >= currentTime || birthday !== newBirthday) return false;
        for (i = 0; i < 17; i++) {
            sum += parseInt(ID.substr(i, 1)) * arrInt[i];
        }
        residue = arrCh[sum % 11];
        if (residue !== ID.substr(17, 1)) return false;
        return true;
    }

    /**
     * 关闭时清空文本框
     */
    CloseClick(){
        this.CardNum.string = "";
        this.RealName.string = "";
        this.lab_real_name.string = "";
        this.lab_id_card_num.string = "";

        super.CloseClick();
    }
}