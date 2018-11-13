import UIBase from "../Base/UIBase";
import { WebRequest } from "../../Net/Open8hb";
import { ActionNet } from "../../CustomType/Action";
import Global from "../../Global/Global";

const { ccclass, property } = cc._decorator;

@ccclass
export class AuthCardForm extends UIBase<any>{
    public IsEventHandler: boolean=true;
    public IsKeyHandler: boolean=true;
    @property(cc.EditBox)
    RealName:cc.EditBox=null;
    @property(cc.EditBox)    
    CardNum:cc.EditBox=null;


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
        data.Add("name",name);
        data.Add("idcard",id);

        const action=new ActionNet(this,this.onsuccess,this.onerror);

        // WebRequest.userinfo.bindidcard(action,data)
    }

    private onsuccess(str) {
        cc.log(str);
        this.DataCache.UserInfo.userData.IsAuthentication = true;
        this.UiManager.ShowTip("实名认证成功，祝你游戏愉快！");
        this.CloseClick();

        this.ShowParam.active = false;
    }
    private onerror() {
        this.UiManager.ShowTip("实名认证出错，请核实信息后重新认证！");
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
}