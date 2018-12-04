import UIBase from "../Base/UIBase";
import { WebRequest } from "../../Net/Open8hb";
import { ActionNet } from "../../CustomType/Action";
import { SafeWebRequest } from "../../Net/SafeWebRequest";
import { EventCode } from "../../Global/EventCode";
import { LocalStorage } from "../../CustomType/LocalStorage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PhoneLogin extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.EditBox)
    private phone_number: cc.EditBox = null;

    @property(cc.EditBox)
    private yzm: cc.EditBox = null;

    @property(cc.Node)
    private node_yzm: cc.Node = null;

    @property(cc.Label)
    private lab_click_text: cc.Label = null;

    private Count = 59;
    private Inteval = 1;
    private OpeCount = 60;
    // LIFE-CYCLE CALLBACKS:

    InitShow(){
        this.phone_number.string = "";
        this.yzm.string = "";

        let phone = LocalStorage.GetItem("player_phone");
        if(phone && phone != ""){
            this.phone_number.string = phone;
        }
    }

    /**
     * 验证参数
     * @param param 手机号
     * @param param1 验证码
     */
    private CheckVaild(param, param1, type) {
        if(!param || param == ""){
            this.UiManager.ShowTip("手机号码不能为空!");
            return false;
        }

        let regex = /^[1][3,4,5,7,8,9][0-9]{9}$/; 
        if (!regex.test(param)) {
            this.UiManager.ShowTip("您的手机号不符合规则");
            return false;
        }

        if(type == 1){
            if(!param1 || param1 == ""){
                this.UiManager.ShowTip("验证码不能为空!");
                return false;
            }
        }
        
        return true;
    }

    /**
     * 计时器操作
     */
    private CountDownOpe() {
        this.OpeCount = this.OpeCount - 1;
        this.lab_click_text.string = this.OpeCount + "S";

        if (this.OpeCount <= 0) {
            this.BtnToggle("no_click");
        }
    }

    /**
     * @param type 控制验证码按钮的状态
     */
    private BtnToggle(type) {
        if (!type) {
            return;
        }

        let no_click = this.node_yzm.getChildByName("no_click");
        let click = this.node_yzm.getChildByName("img_click_bg");
        if (!no_click || !click) {
            return;
        }

        let btn : cc.Button = this.node_yzm.getComponent("cc.Button");
        if(!btn){
            return;
        }

        switch (type) {
            case "click":
                btn.enabled = false;
                click.active = true;
                no_click.active = false;
                break;
            default:
                no_click.active = true;
                click.active = false;
                btn.enabled = true;
                break;
        }
    }

    /**
     * 当玩家点击验证码时
     */
    private ClickYzm() {
        let phone_num = this.phone_number.string;
        if (!this.CheckVaild(phone_num, null, 0)) {
            return;
        }

        this.OpeCount = 60; //重置时间

        const data = WebRequest.DefaultData();
        data.AddOrUpdate("phone", this.phone_number.string);
        data.AddOrUpdate("scene", "userlogin");
        const action = new ActionNet(this, this.sendSuccess, this.sendError);
        SafeWebRequest.SmsSend.getSmsSend(action, data);
        this.UiManager.ShowLoading("正在准备发送验证码");
    }

    private sendSuccess(){
        this.UiManager.CloseLoading();

        /** 
         * 显示隐藏
         */
        this.BtnToggle("click");

        //赋值文本
        this.lab_click_text.string = this.OpeCount + "S";

        //定时器开始
        this.schedule(this.CountDownOpe, this.Inteval, this.Count);
    }

    private sendError(){
        this.UiManager.CloseLoading();

        this.UiManager.ShowTip("验证码发送失败!");
        cc.log("发送验证码失败");
    }

    /**
     * 登陆操作
     */
    private LoginOpe(phone_num, yzm){
        const data = WebRequest.DefaultData();
        data.AddOrUpdate("phone", phone_num);
        data.AddOrUpdate("code", yzm);
        const action = new ActionNet(this, this.loginSuccess, this.loginError);
        SafeWebRequest.GameHall.LoginSmsApp(action, data);
    }

    /**
     * 当玩家点击登录时
     */
    private ClickBind() {
        let phone_num = this.phone_number.string;
        let yzm = this.yzm.string;

        if (!this.CheckVaild(phone_num, yzm, 1)) {
            return;
        }

        this.LoginOpe(phone_num, yzm);
    }

    private loginSuccess(obj){
        if(!obj){
            return;
        }

        this.BtnToggle("no_click");
        this.CloseClick();
        this.EventManager.PostMessage(EventCode.MobileLoginSuccess, obj);
    }

    private loginError(){
        // this.BtnToggle("no_click");
        cc.log("登录失败");
    }

    CloseClick(){
        super.CloseClick();
        this.BtnToggle("no_click");
    }
    // update (dt) {}
}
