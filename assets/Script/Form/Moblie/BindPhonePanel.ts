import UIBase from "../Base/UIBase";
import { SafeWebRequest } from "../../Net/SafeWebRequest";
import { WebRequest } from "../../Net/Open8hb";
import { ActionNet } from "../../CustomType/Action";
import { UIName } from "../../Global/UIName";
import { EventCode } from "../../Global/EventCode";
import { LocalStorage } from "../../CustomType/LocalStorage";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BindPhonePanel extends UIBase<any> {
    public IsKeyHandler: boolean = true;
    public IsEventHandler: boolean = true;

    @property(cc.EditBox)
    private phone_number: cc.EditBox = null;

    @property(cc.EditBox)
    private yzm: cc.EditBox = null;

    @property(cc.Node)
    private node_yzm: cc.Node = null;

    @property(cc.Label)
    private lab_click_text: cc.Label = null;

    @property(cc.Node)
    private no_bind_panel : cc.Node = null;

    @property(cc.Node)
    private bind_panel : cc.Node = null;

    @property(cc.Label)
    private bind_panel_text : cc.Label = null;

    private Count = 59;
    private Inteval = 1;
    private OpeCount = 60;

    public ProType: string = "七豆";
    public ProNum: string = "5";
    public ImgId: number = 6;

    InitShow(){
        this.phone_number.string = "";
        this.yzm.string = "";

        let phone = this.UserInfo.userData.PhoneNum;
        if(phone){
            this.no_bind_panel.active = false;
            this.bind_panel.active = true;
            this.bind_panel_text.string = "绑定手机号为：" + phone;
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

    private CountDownOpe() {
        this.OpeCount = this.OpeCount - 1;
        this.lab_click_text.string = this.OpeCount + "S";

        if (this.OpeCount <= 0) {
            this.BtnToggle("no_click");
        }
    }

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
        data.AddOrUpdate("scene", "userbind");
        const action = new ActionNet(this, this.sendSuccess, this.sendError);
        SafeWebRequest.SmsSend.getSmsSend(action, data);
        this.UiManager.ShowLoading("正在准备发送验证码");
    }

    /**
     * 当玩家点击绑定手机号时
     */
    private ClickBind() {
        let phone_num = this.phone_number.string;
        let yzm = this.yzm.string;

        if (!this.CheckVaild(phone_num, yzm, 1)) {
            return;
        }

        const data = WebRequest.DefaultData();
        data.AddOrUpdate("code", yzm);
        data.AddOrUpdate("phone", phone_num);
        const action = new ActionNet(this, this.bindSuccess, this.bindError);
        SafeWebRequest.SmsSUserSessionend.BindPhone(action, data);

        //执行绑定操作
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

    private bindSuccess(){
        this.UserInfo.userData.PhoneNum = this.phone_number.string;
        this.UiManager.ShowUi(UIName.ShopGiftPanel, this); //弹出奖励面板
        this.EventManager.PostMessage(EventCode.LatestBalance);
        LocalStorage.SetItem("player_phone", this.phone_number.string); //记录玩家绑定的手机号
        this.CloseClick();
    }

    private bindError(){
        cc.log("验证码错误");
        // this.BtnToggle("no_click");
    }
}