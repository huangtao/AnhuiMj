import BBMJEvent from "../BBMJEvent";
import M_BBMJClass from "../M_BBMJClass";
import { BBMJMahjongDef, BBMJ } from "../ConstDef/BBMJMahjongDef";
import M_BBMJView from "../M_BBMJView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_OperatorView extends cc.Component {

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

    //听
    @property(cc.Button)
    btn_ting: cc.Button=null;
    @property(cc.Animation)
    btnFlash:cc.Animation=null;

    canhu:boolean = false;
    cangang:boolean = false;


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
        //     if (M_BBMJClass.ins.ifCanVotePeng) {
        //         this.onOP(BBMJEvent.msg_vote, BBMJMahjongDef.gVoteResult_Peng);
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
        //     if (M_BBMJClass.ins.ifCanVoteGang) {
        //         this.onOP(BBMJEvent.msg_vote, BBMJMahjongDef.gVoteResult_Gang);
        //     }
        //     else if (M_BBMJClass.ins.ifCanGang) {
        //         this.onOP(BBMJEvent.msg_gangCard, null);
        //     }
        //     this.show = false;
        // }, this);
        

        //胡
        // this._btn_hu.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
        //     if (M_BBMJClass.ins.ifCanVoteHu) {
        //         this.onOP(BBMJEvent.msg_vote, BBMJMahjongDef.gVoteResult_Hu);
        //     } else if (M_BBMJClass.ins.ifCanOp) {
        //         this.onOP(BBMJEvent.msg_zimo, null);
        //     }
        //     this.show = false;
        // }, this);
        

        //弃
        // this._btn_giveUp.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
        //     if (M_BBMJClass.ins.isSelfVote) {
        //         this.onOP(BBMJEvent.msg_vote, BBMJMahjongDef.gVoteResult_GiveUp);
        //     }
        //     this.show = false;
        // }, this);
        
    }

    /**
     * 碰操作
     */
    private opPeng(){
        M_BBMJClass.ins._canVote=false;

            if (M_BBMJClass.ins.ifCanVotePeng) {
                this.onOP(BBMJEvent.msg_vote, BBMJMahjongDef.gVoteResult_Peng);
            }
            this.node.active = false;
            this.node.destroy();
    }

    /**
     * 杠操作
     */
    private opGang(){
             M_BBMJClass.ins._canVote=false;
            if (M_BBMJClass.ins.ifCanVoteGang) {
                this.onOP(BBMJEvent.msg_vote, BBMJMahjongDef.gVoteResult_Gang);
            }
            else if (M_BBMJClass.ins.ifCanGang) {
                this.onOP(BBMJEvent.msg_gangCard, null);
            }
            
            this.node.active = false;
            this.node.destroy();
    }

    /**
     * 胡操作
     */
    private opHu(){
             M_BBMJClass.ins._canVote=false;
            if (M_BBMJClass.ins.ifCanVoteHu) {
                this.onOP(BBMJEvent.msg_vote, BBMJMahjongDef.gVoteResult_Hu);
            } else if (M_BBMJClass.ins.ifCanOp) {
                this.onOP(BBMJEvent.msg_zimo, null);
            }
            this.node.active = false;
            this.node.destroy();
    }

    /**
     * 弃操作
     */
    private opQi(){
            M_BBMJClass.ins._canVote=false;
            if (M_BBMJClass.ins.isSelfVote) {
                this.onOP(BBMJEvent.msg_vote, BBMJMahjongDef.gVoteResult_GiveUp);
            }else if (!BBMJ.ins.iclass.isVideo() &&M_BBMJClass.ins.ifCanOp) {
                //
               if(cc.isValid(M_BBMJView.ins.SelGangView)){
                    M_BBMJView.ins.SelGangView.node.active=false;
                }
            }
            this.node.active = false;
            this.node.destroy();
            if(this.canhu)
            {
                console.log("+++++++2222222+++++玩家放弃自摸++++++++++++")
                M_BBMJClass.ins.NoZiMo();
            }
            if(this.cangang){
                 console.log("+++++++2222222+++++玩家放弃杠++++++++++++")
                M_BBMJClass.ins.NoGang();

            }
            

    }

      /**
     * 听操作
     */
    private opTing(){

            if (M_BBMJClass.ins.ifCanVoteTing) {
                this.onOP(BBMJEvent.msg_vote, BBMJMahjongDef.gVoteResult_Ting);
            }
            this.node.active = false;
            this.node.destroy();
    }

    /**
     * 显示操作
     * */
    public showOP(ifCanPeng: boolean, ifCanGang: number, ifCanHu: boolean, ifCanTing:boolean,ifCanGiveup: boolean,istoupiao:boolean): void {
         if(ifCanGang){
            console.log("我我我我我我我我我我玩玩我 玩玩我 玩玩我我有杠权限")
         }


        cc.log("玩家正式进行操作！！！");
        // this.btn_peng.enabled = ifCanPeng;
        // this.btn_gang.enabled = ifCanGang;
        // this.btn_hu.enabled = ifCanHu;
        // this.btn_giveUp.enabled = ifCanGiveup;
        this.canhu=ifCanHu;
        if(istoupiao){
            this.cangang=ifCanGang>0;
        }
        
        this.node.getChildByName("_btn_peng").active = ifCanPeng;
        this.node.getChildByName("_btn_gang").active = ifCanGang>0;
        this.btn_gang.interactable = ifCanGang>=1;
        this.node.getChildByName("_btn_hu").active = ifCanHu;
        this.node.getChildByName("_btn_giveUp").active = ifCanGiveup;
        this.node.getChildByName("_btn_ting").active = ifCanTing;
        let idx: number = (ifCanPeng ? 1 : 0) + (ifCanGang ? 1 : 0) + (ifCanHu ? 1 : 0) + (ifCanGiveup ? 1 : 0)+ (ifCanTing ? 1 : 0);
        let temp: number = BBMJ_OperatorView.startPointX[idx];
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
        
        if (ifCanTing) {
            this.btn_ting.node.x  = temp;
            this.btn_ting.node.y = 7;
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
        if(cc.isValid(this.node)){
        this.node.dispatchEvent(new BBMJEvent(msgid, parm));}
    }
    
}
