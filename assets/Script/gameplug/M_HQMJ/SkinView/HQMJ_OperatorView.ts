import HQMJEvent from "../HQMJEvent";
import M_HQMJClass from "../M_HQMJClass";
import { HQMJMahjongDef, HQMJ } from "../ConstDef/HQMJMahjongDef";
import M_HQMJView from "../M_HQMJView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HQMJ_OperatorView extends cc.Component {

    //吃
    @property(cc.Button)
    btn_chi: cc.Button=null;

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
        //     if (M_HQMJClass.ins.ifCanVotePeng) {
        //         this.onOP(HQMJEvent.msg_vote, HQMJMahjongDef.gVoteResult_Peng);
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
        this.node.getChildByName("_btn_chi").active = false;
        this.btnFlash.node.active=false;
        //杠
        // this._btn_gang.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
        //     if (M_HQMJClass.ins.ifCanVoteGang) {
        //         this.onOP(HQMJEvent.msg_vote, HQMJMahjongDef.gVoteResult_Gang);
        //     }
        //     else if (M_HQMJClass.ins.ifCanGang) {
        //         this.onOP(HQMJEvent.msg_gangCard, null);
        //     }
        //     this.show = false;
        // }, this);
        

        //胡
        // this._btn_hu.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
        //     if (M_HQMJClass.ins.ifCanVoteHu) {
        //         this.onOP(HQMJEvent.msg_vote, HQMJMahjongDef.gVoteResult_Hu);
        //     } else if (M_HQMJClass.ins.ifCanOp) {
        //         this.onOP(HQMJEvent.msg_zimo, null);
        //     }
        //     this.show = false;
        // }, this);
        

        //弃
        // this._btn_giveUp.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
        //     if (M_HQMJClass.ins.isSelfVote) {
        //         this.onOP(HQMJEvent.msg_vote, HQMJMahjongDef.gVoteResult_GiveUp);
        //     }
        //     this.show = false;
        // }, this);
        
    }

    /**
     * 碰操作
     */
    private opPeng(){

            if (M_HQMJClass.ins.ifCanVotePeng) {
                this.onOP(HQMJEvent.msg_vote, HQMJMahjongDef.gVoteResult_Peng);
            }
            this.node.active = false;

    }

     /**
     * 吃操作
     */
    private opChi(){

            if (M_HQMJClass.ins.ifCanVoteChi) {
                this.onOP(HQMJEvent.msg_chiCard, HQMJMahjongDef.gVoteResult_Chi);
            }          
            this.node.active = false;

    }

    /**
     * 豹操作
     */
    // private opBao(){
            
    //          M_HQMJClass.ins.btnBaoAddClickEvent();
    //          this.node.active = false;

    // }

    /**
     * 杠操作
     */
    private opGang(){

            if (M_HQMJClass.ins.ifCanVoteGang) {
                this.onOP(HQMJEvent.msg_vote, HQMJMahjongDef.gVoteResult_Gang);
            }
            else if (M_HQMJClass.ins.ifCanGang) {
                this.onOP(HQMJEvent.msg_gangCard, null);
            }
            this.node.active = false;

    }

    /**
     * 胡操作
     */
    private opHu(){

            if (M_HQMJClass.ins.ifCanVoteHu) {
                this.onOP(HQMJEvent.msg_vote, HQMJMahjongDef.gVoteResult_Hu);
            } else if (M_HQMJClass.ins.ifCanOp) {
                this.onOP(HQMJEvent.msg_zimo, null);
            }
            this.node.active = false;

    }

    /**
     * 弃操作
     */
    private opQi(){

            if (M_HQMJClass.ins.isSelfVote) {
                this.onOP(HQMJEvent.msg_vote, HQMJMahjongDef.gVoteResult_GiveUp);
            }else if (!HQMJ.ins.iclass.isVideo() && M_HQMJClass.ins.ifCanOp) {
                //
                M_HQMJView.ins.SelGangView.node.active=false;
            }
            // this.onOP(HQMJEvent.msg_vote, HQMJMahjongDef.gVoteResult_GiveUp);
             this.node.active = false;

    }

    /**
     * 显示操作
     * */
    public showOP(ifCanChi:number,ifCanPeng: boolean, ifCanGang: number, ifCanHu: boolean, ifCanGiveup: boolean): void {
        
        cc.log("玩家正式进行操作！！！");
        // this.btn_peng.enabled = ifCanPeng;
        // this.btn_gang.enabled = ifCanGang;
        // this.btn_hu.enabled = ifCanHu;
        // this.btn_giveUp.enabled = ifCanGiveup;
        this.unscheduleAllCallbacks();
        this.btnFlash.stop();
        this.btnFlash.node.active=false;
        //吃碰杠 按钮的层级
        this.node.setLocalZOrder(999);
        this.node.getChildByName("_btn_chi").active = ifCanChi>0;
        this.node.getChildByName("_btn_peng").active = ifCanPeng;
        this.node.getChildByName("_btn_gang").active = ifCanGang>0;
        // this.btn_gang.interactable = ifCanGang==1;
        this.node.getChildByName("_btn_hu").active = ifCanHu;
        this.node.getChildByName("_btn_giveUp").active = ifCanGiveup;
        let idx: number = (ifCanChi ? 1 : 0) + (ifCanPeng ? 1 : 0) + (ifCanGang ? 1 : 0) + (ifCanHu ? 1 : 0) + (ifCanGiveup ? 1 : 0);
        let temp: number = HQMJ_OperatorView.startPointX[idx];
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
            temp -= 160;
        }
        if (ifCanChi) {
            this.btn_chi.node.x  = temp;
            this.btn_chi.node.y = 7;
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
        this.node.dispatchEvent(new HQMJEvent(msgid, parm));
    }
}
