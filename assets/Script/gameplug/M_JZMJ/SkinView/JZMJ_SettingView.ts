import { JZMJ } from "../ConstDef/JZMJMahjongDef";
import M_JZMJView from '../M_JZMJView';
import { M_JZMJ_GameMessage } from "../../../CommonSrc/M_JZMJ_GameMessage";
import M_JZMJClass from '../M_JZMJClass';
import { QL_Common } from "../../../CommonSrc/QL_Common";
import JZMJ_ReadyStatusUserInfo from "./JZMJ_ReadyStatusUserInfo";
import { GameBaseClass } from '../../base/GameBaseClass';
import M_JZMJVoice from "../M_JZMJVoice";

const { ccclass, property } = cc._decorator;

@ccclass
export default class JZMJ_SettingView extends cc.Component {
    
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
        M_JZMJClass.ins.ShowSettingForm(true);
    }

    private showGPS(){
        M_JZMJClass.ins.ShowMaps();
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

        this.btn_help.interactable = !JZMJ.ins.iclass.isVideo();
        
        if (JZMJ.ins.iclass.isVideo() || !JZMJ.ins.iclass.isCreateRoom()) {
            this.btn_dissTable.node.active = false;
            this.btn_leaveTable.node.active = true;
        } else {
            //游戏过程中才可以解散房间
            this.btn_dissTable.node.active = JZMJ.ins.iclass.getTableStauts() == QL_Common.TableStatus.gameing;
            this.btn_leaveTable.node.active = JZMJ.ins.iclass.getTableStauts() != QL_Common.TableStatus.gameing;
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
        M_JZMJVoice.PlayCardType(`/sound/Button32.mp3`);
        if(!this.node.active){
            this.node.active = true;
        }else{
            this.node.active = false;
        }
        this.showRule();
        // cc.log(JZMJ.ins.iclass.isCreateRoom()+"测测测房主")
        // cc.log(JZMJ.ins.iclass.getTableStauts() + "游戏状态");
        // cc.log(JZMJ.ins.iclass.ifCanExitGame(JZMJ.ins.iclass.getSelfChair())+"是否可以退出房间")
        // if(JZMJ.ins.iclass.getTableStauts() == QL_Common.TableStatus.gameing){
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
        M_JZMJVoice.PlayCardType(`/sound/Button32.mp3`);
        this.closeSetting();
    }

    /**
     * 帮助
     */
    private onHelp(){
        M_JZMJVoice.PlayCardType(`/sound/Button32.mp3`);
        M_JZMJClass.ins.showWanfa();
        // M_JZMJView.ins.Help.node.active = true;
    }

    /**
     * 解散房间
     */
    public onDissable(){
        M_JZMJVoice.PlayCardType(`/sound/Button32.mp3`);
        this.btn_dissTable.scheduleOnce(p=>{
            cc.log("解散房间");
            JZMJ.ins.iclass.sendData(new M_JZMJ_GameMessage.CMD_C_OfferDissTable());
            this.closeSetting();
        }, 0.2);
    }

    /**
     * 音效
     */
    private onVolume(){
        M_JZMJView.ins.ShowSetVolume();
    }

    /**
     * 返回
     */
    public onExit(): void {
                    
        // if (!JZMJ.ins.iclass.ifCanExitGame(JZMJ.ins.iclass.getSelfChair())) {
        //     if (JZMJ.ins.iclass.isCreateRoom()) {
        //         //this.closeSetting();
        //     }
        //     else {
                //M_JZMJView.ins.MsgBox.showMsgBox("在游戏中退出会扣除游戏币,是否退出", "继续强退", () => {
                    var forceLeft: M_JZMJ_GameMessage.CMD_C_ForceLeft = new M_JZMJ_GameMessage.CMD_C_ForceLeft();
                    forceLeft.PlayerID = JZMJ.ins.iclass.getTablePlayerAry()[JZMJ.ins.iclass.getSelfChair()].PlayerID;
                    M_JZMJClass.ins.SendGameData(forceLeft);
                //}, this, "返回游戏");
        //     }
        // } else {
        //     if (!JZMJ.ins.iclass.isVideo() && JZMJ.ins.iclass.isCreateRoom()
        //         && JZMJ.ins.iclass.getSelfChair() == JZMJ.ins.iclass.getTableConfig().tableCreatorChair && !JZMJ.ins.iclass.getTableConfig().IsSaveTable) {
        //         if (JZMJ.ins.iclass.getTableConfig().IsTableCreatorPay) {
        //             M_JZMJView.ins.MsgBox.showMsgBox('是否需要系统为您保留房间？系统会在游戏开始前为您保留' + JZMJ.ins.iclass.getTableConfig().SaveTableTime + '分钟，请您记住房号' + JZMJ.ins.iclass.getTableConfig().TableCode + '。', "保留", () => {
        //                 var saveTable: M_JZMJ_GameMessage.CMD_C_SaveTable = new M_JZMJ_GameMessage.CMD_C_SaveTable();
        //                 M_JZMJClass.ins.SendGameData(saveTable);
        //             }, this, "不保留", () => { JZMJ.ins.iclass.exit(); }, this);
        //         }
        //         else {
        //             M_JZMJView.ins.MsgBox.showMsgBox('此房间为AA制付费，不支持保留房间，离开房间，房间将解散。', "确定", () => {
        //                 //打开充值
        //                 JZMJ.ins.iclass.exit();
        //             }, this);
        //         }

        //     }
        //     else {
        //         JZMJ.ins.iclass.exit();
        //     }
            
        // }
    }
}
