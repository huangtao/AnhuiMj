import { SkinDissolveTableParam, StageWidth, StageHeight } from "../GameHelp/PDK_GameHelp";
import { GameIF } from "../../../CommonSrc/GameIF";
import { M_PDK_GameMessage } from "../../../CommonSrc/M_PDK_GameMessage";
import { PDK } from "../GameHelp/PDK_IClass";
import M_PDKView from "../M_PDKView";
import M_PDKClass from "../M_PDKClass";
import { LoadHeader } from "../../../Tools/Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinDissolveTable extends cc.Component {

    //文本及按钮组件
    @property(cc.Label)
    private label_title: cc.Label=null;
    @property(cc.Label)
    private label_timer: cc.Label=null;
    @property([cc.Label])
    private label: cc.Label[]=[];
    @property([cc.Label])
    private vote: cc.Label[]=[];
    @property(cc.Button)
    private btn_refuse: cc.Button=null;
    @property(cc.Button)
    private btn_agree: cc.Button=null;
    @property(cc.Sprite)
    private img_voteright:cc.Sprite = null;
    @property([cc.Sprite])
    private img_people:cc.Sprite[] = [];

    //倒计时
    private _timer: number = 0;
    //private diss:boolean = true;

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
        this.img_voteright.node.active = false;
        this.node.active = false;
    }
    public Show(param: any,face:string[]) {
        if (param == null)
            return;
           // this.diss = true;
        this.ShowDissolveTable((<SkinDissolveTableParam>param).msg,face);
    }
    /**
     * 显示
     */
    private ShowDissolveTable(msg: GameIF.CustomMessage,face:string[]) {
        var data = <M_PDK_GameMessage.CMD_S_DissolveTable>msg;
        this.img_voteright.node.active = false;
        if (data.result == 0) {
            var chair = -1;
            if (data.chair >= 0 && data.chair < 6)
                chair = PDK.ins.iclass.GetClientChair(data.chair);
            var sponsor = PDK.ins.iclass.GetClientChair(data.sponsor);
            if (sponsor == chair) {
                this.node.active = true;
                M_PDKView.Instance.TimePause();
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
                        let index = data.member.indexOf(M_PDKClass.Instance.ChairID);                       
                        if (index >= 0 && !data.memberflag[index])
                            this.SetBtnState(true);
                        else
                            this.SetBtnState(false);
                    }
                    this.label_timer.node.active = true;
                    this._timer = data.timer;
                    this.label_timer.string = this._timer + "";
                    this.schedule(this.TimerHandle,1*PDK.ins.iclass.GetSpeed());
                }
                else {
                    this.SetBtnState(false);
                }
            }
            for (var i = 0; i < data.member.length; i++) {
                 if (data.memberflag[i]) {
                //     this.label[i].string = data.memberName+"";
                //     this.vote[i].string = "已同意";
                  this.img_people[i].node.active = true;
                 
                this.label[i].string = data.memberName[i]+"";
                this.vote[i].string = "已同意";
                 }
                else {
                   this.img_people[i].node.active = true;
                    this.label[i].string = data.memberName[i]+"";
                    this.vote[i].string = "投票中";
                   // this.label[i].string = "投票中";
                }
                LoadHeader(face[i], this.img_people[i]);
            }
             
        }
        else if (data.result == 1) {
            this.unscheduleAllCallbacks();
            this.label_timer.node.active = false;
            M_PDKView.Instance.OnDisTableSuccess();
            for (var i = 0; i < data.member.length; i++) {
                if (data.memberflag[i]) {
                   // this.label[i].string = data.memberName+"";
                    this.vote[i].string = "已同意";
                }
                else {
                  //  this.label[i].string = data.memberName+"";
                  this.vote[i].string = "已同意";
                }
            }
        }
        else if (data.result == 2) {
            //this.diss = false;
            this.unscheduleAllCallbacks();
            this.node.active = false;
            M_PDKView.Instance.TimeResume();
            var str = "玩家【" + data.chairName + "】拒绝解散房间";
            M_PDKClass.Instance.UiManager.ShowMsgBox(str);
        }
    }
    private TimerHandle() {
        this._timer--;
        console.log("TimerHandle:" + this._timer);
        if (this._timer > 0) {
            this.label_timer.string = this._timer + "";
        }
        else {
            this.label_timer.string = this._timer + "";
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
        var data = new M_PDK_GameMessage.CMD_C_DissolveTable();
        data.agree = false;
        PDK.ins.iclass.SendData(data);
    }
    /**
     * 同意按钮事件
     */
    private OnButtonAgree() {
        this.btn_refuse.node.active = false;
        this.btn_agree.node.active = false;
        var data = new M_PDK_GameMessage.CMD_C_DissolveTable();
        data.agree = true;
        data.askagree = false;
        PDK.ins.iclass.SendData(data);
        this.img_voteright.node.active = true;
    }
}
