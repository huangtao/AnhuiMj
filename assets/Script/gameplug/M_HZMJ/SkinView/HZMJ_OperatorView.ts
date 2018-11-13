import HZMJEvent from "../HZMJEvent";
import M_HZMJClass from "../M_HZMJClass";
import { HZMJMahjongDef, HZMJ } from "../ConstDef/HZMJMahjongDef";
import M_HZMJView from "../M_HZMJView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_OperatorView extends cc.Component {

    //碰
    @property(cc.Button)
    btn_peng: cc.Button=null;

    //杠
    @property(cc.Button)
    btn_gang: cc.Button=null;

    //胡
    @property(cc.Button)
    btn_hu: cc.Button=null;

    //弃
    @property(cc.Button)
    btn_giveUp: cc.Button=null;

    @property(cc.Animation)
    btnFlash:cc.Animation=null;

    //初始位置
    private static startPointX: Array<number> = [0, 294, 388, 482, 576];

    //this:any = cc;

    onLoad() {
        // init logic
        //this.init();
    }
    onDisable(){
        this.unscheduleAllCallbacks();
        this.btnFlash.node.active=false;
    }
    /**
     * 初始化
     */
    public init(){
        //碰
        // this._btn_peng.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
        //     if (M_HZMJClass.ins.ifCanVotePeng) {
        //         this.onOP(HZMJEvent.msg_vote, HZMJMahjongDef.gVoteResult_Peng);
        //     }
        //     this.show = false;
        // }, this);
        //this.node.active = true;
        this.unscheduleAllCallbacks();
        this.node.active = false;
        this.node.getChildByName("_btn_peng").active = false;
        this.node.getChildByName("_btn_gang").active = false;
        this.node.getChildByName("_btn_hu").active = false;
        this.node.getChildByName("_btn_giveUp").active = false;
        this.btnFlash.node.active=false;
        //杠
        // this._btn_gang.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
        //     if (M_HZMJClass.ins.ifCanVoteGang) {
        //         this.onOP(HZMJEvent.msg_vote, HZMJMahjongDef.gVoteResult_Gang);
        //     }
        //     else if (M_HZMJClass.ins.ifCanGang) {
        //         this.onOP(HZMJEvent.msg_gangCard, null);
        //     }
        //     this.show = false;
        // }, this);
        

        //胡
        // this._btn_hu.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
        //     if (M_HZMJClass.ins.ifCanVoteHu) {
        //         this.onOP(HZMJEvent.msg_vote, HZMJMahjongDef.gVoteResult_Hu);
        //     } else if (M_HZMJClass.ins.ifCanOp) {
        //         this.onOP(HZMJEvent.msg_zimo, null);
        //     }
        //     this.show = false;
        // }, this);
        

        //弃
        // this._btn_giveUp.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
        //     if (M_HZMJClass.ins.isSelfVote) {
        //         this.onOP(HZMJEvent.msg_vote, HZMJMahjongDef.gVoteResult_GiveUp);
        //     }
        //     this.show = false;
        // }, this);
        
    }

    /**
     * 碰操作
     */
    private opPeng(){

            if (M_HZMJClass.ins.ifCanVotePeng) {
                this.onOP(HZMJEvent.msg_vote, HZMJMahjongDef.gVoteResult_Peng);
            }
            this.node.active = false;

    }

    /**
     * 杠操作
     */
    private opGang(){

            if (M_HZMJClass.ins.ifCanVoteGang) {
                this.onOP(HZMJEvent.msg_vote, HZMJMahjongDef.gVoteResult_Gang);
            }
            else if (M_HZMJClass.ins.ifCanGang) {
                this.onOP(HZMJEvent.msg_gangCard, null);
            }
            this.node.active = false;

    }

    /**
     * 胡操作
     */
    private opHu(){

            if (M_HZMJClass.ins.ifCanVoteHu) {
                this.onOP(HZMJEvent.msg_vote, HZMJMahjongDef.gVoteResult_Hu);
            } else if (M_HZMJClass.ins.ifCanOp) {
                this.onOP(HZMJEvent.msg_zimo, null);
            }
            this.node.active = false;

    }

    /**
     * 弃操作
     */
    private opQi(){

            if (M_HZMJClass.ins.isSelfVote) {
                this.onOP(HZMJEvent.msg_vote, HZMJMahjongDef.gVoteResult_GiveUp);
            }else if (!HZMJ.ins.iclass.isVideo() &&M_HZMJClass.ins.ifCanOp) {
                //
                M_HZMJView.ins.SelGangView.node.active=false;
            }
            this.node.active = false;

    }

    /**
     * 显示操作
     * */
    public showOP(ifCanPeng: boolean, ifCanGang: number, ifCanHu: boolean, ifCanGiveup: boolean): void {
        
        cc.log("玩家正式进行操作！！！");
        // this.btn_peng.enabled = ifCanPeng;
        // this.btn_gang.enabled = ifCanGang;
        // this.btn_hu.enabled = ifCanHu;
        // this.btn_giveUp.enabled = ifCanGiveup;
        this.unscheduleAllCallbacks();
        this.btnFlash.stop();
        this.btnFlash.node.active=false;
        this.node.getChildByName("_btn_peng").active = ifCanPeng;
        this.node.getChildByName("_btn_gang").active = ifCanGang>0;
        this.btn_gang.interactable = ifCanGang==1;
        this.node.getChildByName("_btn_hu").active = ifCanHu;
        this.node.getChildByName("_btn_giveUp").active = ifCanGiveup;
        let idx: number = (ifCanPeng ? 1 : 0) + (ifCanGang ? 1 : 0) + (ifCanHu ? 1 : 0) + (ifCanGiveup ? 1 : 0);
        let temp: number = HZMJ_OperatorView.startPointX[idx];
        temp = 300;
        if (ifCanGiveup) {
            this.btn_giveUp.node.x = temp;
            this.btn_giveUp.node.y = 7;
            temp -= 160;
        }
        if (ifCanHu) {
            this.btn_hu.node.x  = temp;
            this.btn_hu.node.y = 7;
            if(!this.btnFlash.node.active){
                this.btnFlash.node.x=temp;
                this.btnFlash.node.y=7;
                this.btnFlash.node.active=true;
            }
            temp -= 160;
        }
        if (ifCanGang) {
            this.btn_gang.node.x  = temp;
            this.btn_gang.node.y = 7;
            if(!this.btnFlash.node.active){
                this.btnFlash.node.x=temp;
                this.btnFlash.node.y=7;
                this.btnFlash.node.active=true;
            }
            temp -= 160;
        }
        if (ifCanPeng) {
            this.btn_peng.node.x  = temp;
            this.btn_peng.node.y = 7;
            if(!this.btnFlash.node.active){
                this.btnFlash.node.x=temp;
                this.btnFlash.node.y=7;
                this.btnFlash.node.active=true;
            }
        }
        this.btnFlash.node.active=false;
        this.node.active = true;
        this.showflash();
        //this.enabled = true;
    }
    private showflash():void{
        this.schedule(this.flash,2);
    }

    private flash():void{
        this.btnFlash.node.active=true;
        this.btnFlash.play();
    }
    private onOP(msgid: number, parm: any): void {
        this.node.dispatchEvent(new HZMJEvent(msgid, parm));
    }
}
