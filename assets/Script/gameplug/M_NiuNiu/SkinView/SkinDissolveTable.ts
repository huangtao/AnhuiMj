import { SkinDissolveTableParam, StageWidth, StageHeight } from "../GameHelp/GameHelp";
import { GameIF } from "../../../CommonSrc/GameIF";
import { M_NiuNiu_GameMessage } from "../../../CommonSrc/M_NiuNiu_GameMessage";
import { NiuNiu } from "../GameHelp/INiuNiuClass";
import M_NiuNiuView from "../M_NiuNiuView";
import M_NiuNiuClass from "../M_NiuNiuClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinDissolveTable extends cc.Component {

    //文本及按钮组件
    @property(cc.Label)
    private label_title: cc.Label = null;
    @property(cc.Label)
    private label_timer: cc.Label = null;
    @property([cc.Label])
    private label: cc.Label[] = [];
    @property(cc.Button)
    private btn_refuse: cc.Button = null;
    @property(cc.Button)
    private btn_agree: cc.Button = null;
    //倒计时
    private _timer: number = 0;

    onLoad() {
        this.btn_refuse.node.on("click", this.OnButtonRefuse, this);
        this.btn_agree.node.on("click", this.OnButtonAgree, this);
        this.node.active = false;
    }
    public Init() {
        this.Destroy();
    }
    public Destroy() {
        this.OnClose();
    }
    public OnClose() {
        this.unscheduleAllCallbacks();
        this.node.active = false;
    }
    public Show(param: any) {
        if (param == null)
            return;
        this.ShowDissolveTable((<SkinDissolveTableParam>param).msg);
    }
    /**
     * 显示
     */
    private ShowDissolveTable(msg: GameIF.CustomMessage) {
        var data = <M_NiuNiu_GameMessage.CMD_S_DissolveTable>msg;
        if (data.result == 0) {
            var chair = -1;
            if (data.chair >= 0 && data.chair < 6)
                chair = NiuNiu.ins.iclass.GetClientChair(data.chair);
            var sponsor = NiuNiu.ins.iclass.GetClientChair(data.sponsor);
            if (sponsor == chair) {
                this.node.active = true;
                M_NiuNiuView.Instance.TimePause();
                this.label_title.string = "玩家【" + data.sponsorName + "】申请解散房间";
                for (var i = 0; i < this.label.length; i++) {
                    if (i < data.member.length)
                        this.label[i].node.active = true;
                    else
                        this.label[i].node.active = false;
                }
                if (data.timer > 0) {
                    if (sponsor == 0) {
                        this.SetBtnState(false);
                    }
                    else {
                        let index = data.member.indexOf(M_NiuNiuClass.Instance.ChairID);
                        if (index >= 0 && !data.memberflag[index])
                            this.SetBtnState(true);
                        else
                            this.SetBtnState(false);
                    }
                    this.label_timer.node.active = true;
                    this._timer = data.timer;
                    this.label_timer.string = this._timer + "秒后自动同意";
                    this.schedule(this.TimerHandle, 1 * NiuNiu.ins.iclass.GetSpeed());
                }
                else {
                    this.SetBtnState(false);
                }
            }
            for (var i = 0; i < data.member.length; i++) {
                if (data.memberflag[i]) {
                    this.label[i].string = "玩家【" + data.memberName[i] + "】同意";
                    if(data.member[i]==M_NiuNiuClass.Instance.ChairID){
                        this.SetBtnState(false);
                    }
                }
                else {
                    this.label[i].string = "玩家【" + data.memberName[i] + "】等待选择";
                }
            }
        }
        else if (data.result == 1) {
            this.unscheduleAllCallbacks();
            this.label_timer.node.active = false;
            this.SetBtnState(false);
            M_NiuNiuView.Instance.OnDisTableSuccess();
            for (var i = 0; i < data.member.length; i++) {
                if (data.memberflag[i]) {
                    this.label[i].string = "玩家【" + data.memberName[i] + "】同意";
                }
                else {
                    this.label[i].string = "玩家【" + data.memberName[i] + "】等待选择";
                }
            }
        }
        else if (data.result == 2) {
            this.unscheduleAllCallbacks();
            this.node.active = false;
            M_NiuNiuView.Instance.TimeResume();
            var str = "玩家【" + data.chairName + "】拒绝解散房间";
            M_NiuNiuClass.Instance.UiManager.ShowMsgBox(str);
        }
    }
    private TimerHandle() {
        this._timer--;
        console.log("TimerHandle:" + this._timer);
        if (this._timer > 0) {
            this.label_timer.string = this._timer + "秒后自动同意";
        }
        else {
            this.label_timer.string = this._timer + "秒后自动同意";
            this.unscheduleAllCallbacks();
            if (this.btn_agree.node.active)
                this.OnButtonAgree();
        }
    }
    /**
     * 设置按钮状态
     */
    private SetBtnState(value: boolean) {
        this.btn_refuse.node.active = value;
        this.btn_agree.node.active = value;
    }
    /**
     * 拒绝按钮事件
     */
    private OnButtonRefuse() {
        this.btn_refuse.node.active = false;
        this.btn_agree.node.active = false;
        var data = new M_NiuNiu_GameMessage.CMD_C_DissolveTable();
        data.agree = false;
        NiuNiu.ins.iclass.SendData(data);
    }
    /**
     * 同意按钮事件
     */
    private OnButtonAgree() {
        this.btn_refuse.node.active = false;
        this.btn_agree.node.active = false;
        var data = new M_NiuNiu_GameMessage.CMD_C_DissolveTable();
        data.agree = true;
        NiuNiu.ins.iclass.SendData(data);
    }
}
