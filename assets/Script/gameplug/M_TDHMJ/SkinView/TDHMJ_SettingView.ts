import { TDHMJ } from "../ConstDef/TDHMJMahjongDef";
import M_TDHMJView from '../M_TDHMJView';
import { M_TDHMJ_GameMessage } from "../../../CommonSrc/M_TDHMJ_GameMessage";
import M_TDHMJClass from '../M_TDHMJClass';
import { QL_Common } from "../../../CommonSrc/QL_Common";
import TDHMJ_ReadyStatusUserInfo from "./TDHMJ_ReadyStatusUserInfo";
import { GameBaseClass } from '../../base/GameBaseClass';
import M_TDHMJVoice from "../M_TDHMJVoice";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TDHMJ_SettingView extends cc.Component {
    
    //玩法
    @property(cc.Button)
    btn_help: cc.Button=null;

    //定位
    @property(cc.Button)
    btn_dingwei:cc.Button = null;

    //设置
    @property(cc.Button)
    btn_shezhi:cc.Button = null;

    //解散房间
    @property(cc.Button)
    btn_dissTable: cc.Button=null;

    //离开房间
    @property(cc.Button)
    btn_leaveTable: cc.Button = null;

    private _isClose: boolean;
    private _locked:boolean;
    onLoad() {

    }

    public init() {
        this._isClose = true;

        this.refreshStatus();
    }

    public showView() {
        this.node.active = true;
    }

    private showSetting(){
        M_TDHMJClass.ins.ShowSettingForm(true);
    }

    private showGPS(){
        M_TDHMJClass.ins.ShowMaps();
    }

    private closeSetting(): void {
        if(this._locked){
            return;
        }else{
            this._locked=true;
        }
        var action = cc.moveTo(0.1, 13, 560);
        this.node.runAction(action);

        // this.scheduleOnce(p=>{
            this._isClose = true;
            this.refreshStatus();
        // }, 0.3);

        this.scheduleOnce(function () {
            this._locked = false;
            }.bind(this), 0.2)
    }

    private refreshStatus(): void {

    }

    private showRule(): void {

        this.btn_help.interactable = !TDHMJ.ins.iclass.isVideo();
        
        if (TDHMJ.ins.iclass.isVideo() || !TDHMJ.ins.iclass.isCreateRoom()) {
            this.btn_dissTable.node.active = false;
            this.btn_leaveTable.node.active = true;
        } else {
            //游戏过程中才可以解散房间
            this.btn_dissTable.node.active = TDHMJ.ins.iclass.getTableStauts() == QL_Common.TableStatus.gameing;
            this.btn_leaveTable.node.active = TDHMJ.ins.iclass.getTableStauts() != QL_Common.TableStatus.gameing;
        }
    }

    /**
     * 打开
     */
    public onOpen(){
    //    if(this._locked){
    //         return;
    //     }else{
    //         this._locked=true;
    //     }
        M_TDHMJVoice.PlayCardType(`/sound/Button32.mp3`);
        if(!this.node.active){
            this.node.active = true;
        }else{
            this.node.active = false;
        }
        this.showRule();
        // cc.log(TDHMJ.ins.iclass.isCreateRoom()+"测测测房主")
        // cc.log(TDHMJ.ins.iclass.getTableStauts() + "游戏状态");
        // cc.log(TDHMJ.ins.iclass.ifCanExitGame(TDHMJ.ins.iclass.getSelfChair())+"是否可以退出房间")
        // if(TDHMJ.ins.iclass.getTableStauts() == QL_Common.TableStatus.gameing){
        //     this.btn_dissTable.node.active = true;
        //     this.bnt_leaveTable.node.active = false;
        // }else{
        //     this.btn_dissTable.node.active = false;
        //     this.bnt_leaveTable.node.active = true;
        // }

        var action = cc.moveTo(0.1, 0, 120);
        this.node.runAction(action);

        // this.scheduleOnce(p=>{
        //this._isClose = false;
        // this.refreshStatus();
        // }, 0.3);
        // setTimeout(function () {
        //     this._locked = false;
        // }.bind(this), 200);
    }

    /**
     * 关闭、背景按钮
     */
    private onClose(){
        M_TDHMJVoice.PlayCardType(`/sound/Button32.mp3`);
        this.closeSetting();
    }

    /**
     * 帮助
     */
    private onHelp(){
        M_TDHMJVoice.PlayCardType(`/sound/Button32.mp3`);
        M_TDHMJClass.ins.showWanfa();
        // M_TDHMJView.ins.Help.node.active = true;
    }

    /**
     * 解散房间
     */
    public onDissable(){
        M_TDHMJVoice.PlayCardType(`/sound/Button32.mp3`);
        this.btn_dissTable.scheduleOnce(p=>{
            cc.log("解散房间");
            TDHMJ.ins.iclass.sendData(new M_TDHMJ_GameMessage.CMD_C_OfferDissTable());
            this.closeSetting();
        }, 0.2);
    }

    /**
     * 音效
     */
    private onVolume(){
        M_TDHMJView.ins.ShowSetVolume();
    }

    /**
     * 返回
     */
    public onExit(): void {
                    
        // if (!TDHMJ.ins.iclass.ifCanExitGame(TDHMJ.ins.iclass.getSelfChair())) {
        //     if (TDHMJ.ins.iclass.isCreateRoom()) {
        //         //this.closeSetting();
        //     }
        //     else {
                //M_TDHMJView.ins.MsgBox.showMsgBox("在游戏中退出会扣除游戏币,是否退出", "继续强退", () => {
                    var forceLeft: M_TDHMJ_GameMessage.CMD_C_ForceLeft = new M_TDHMJ_GameMessage.CMD_C_ForceLeft();
                    forceLeft.PlayerID = TDHMJ.ins.iclass.getTablePlayerAry()[TDHMJ.ins.iclass.getSelfChair()].PlayerID;
                    M_TDHMJClass.ins.SendGameData(forceLeft);
                //}, this, "返回游戏");
        //     }
        // } else {
        //     if (!TDHMJ.ins.iclass.isVideo() && TDHMJ.ins.iclass.isCreateRoom()
        //         && TDHMJ.ins.iclass.getSelfChair() == TDHMJ.ins.iclass.getTableConfig().tableCreatorChair && !TDHMJ.ins.iclass.getTableConfig().IsSaveTable) {
        //         if (TDHMJ.ins.iclass.getTableConfig().IsTableCreatorPay) {
        //             M_TDHMJView.ins.MsgBox.showMsgBox('是否需要系统为您保留房间？系统会在游戏开始前为您保留' + TDHMJ.ins.iclass.getTableConfig().SaveTableTime + '分钟，请您记住房号' + TDHMJ.ins.iclass.getTableConfig().TableCode + '。', "保留", () => {
        //                 var saveTable: M_TDHMJ_GameMessage.CMD_C_SaveTable = new M_TDHMJ_GameMessage.CMD_C_SaveTable();
        //                 M_TDHMJClass.ins.SendGameData(saveTable);
        //             }, this, "不保留", () => { TDHMJ.ins.iclass.exit(); }, this);
        //         }
        //         else {
        //             M_TDHMJView.ins.MsgBox.showMsgBox('此房间为AA制付费，不支持保留房间，离开房间，房间将解散。', "确定", () => {
        //                 //打开充值
        //                 TDHMJ.ins.iclass.exit();
        //             }, this);
        //         }

        //     }
        //     else {
        //         TDHMJ.ins.iclass.exit();
        //     }
            
        // }
    }
}
