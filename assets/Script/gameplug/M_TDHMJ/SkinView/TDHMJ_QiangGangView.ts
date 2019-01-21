import { TDHMJ } from "../ConstDef/TDHMJMahjongDef";
import TDHMJEvent from "../TDHMJEvent";
import M_TDHMJClass from "../M_TDHMJClass";
import { SetTextureRes } from "../../MJCommon/MJ_Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TDHMJ_QiangGangView extends cc.Component {

    // //牌花
    // @property(cc.Sprite)
    // img_card: cc.Sprite=null;

    //抢杠
    @property(cc.Button)
    btn_hu: cc.Button=null;

     //不抢
    @property(cc.Button)
    btn_giveUp: cc.Button=null;

    onLoad() {
        // init logic
        
    }

    public init(){
        this.node.active = false;
        // this.img_card.node.active = false;
        this.btn_hu.node.active = false;
        this.btn_giveUp.node.active = false;
    }

    /**
     * ui创建完成
     * */
    // protected uiCompHandler(): void {
    //     console.log("TDHMJ_QiangGangViewSkin");
    //     this._btn_hu.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
            
    //     }, this);
    //     this._btn_giveUp.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
            
    //     }, this);
    // }

    /**
     * 胡操作
     */
    public opHu(){
        // var actionBy = cc.scaleBy(0.3, 1.5, 1.5);
        // this.btn_hu.node.runAction(actionBy);

        this.btn_hu.scheduleOnce(p=>{
            if (M_TDHMJClass.ins.ifCanQiangGang) {
                this.node.dispatchEvent(new TDHMJEvent(TDHMJEvent.msg_qiangGang, 1));
            }
            this.node.active = false;
        }, 0.5);
        
    }

    /**
     * 过操作
     */
    public giveUpOp(){
        // var actionBy_1 = cc.scaleBy(0.3, 1.5, 1.5);
        // this.btn_hu.node.runAction(actionBy_1);

        this.btn_hu.scheduleOnce(p=>{
        if (M_TDHMJClass.ins.ifCanQiangGang) {
                this.node.dispatchEvent(new TDHMJEvent(TDHMJEvent.msg_qiangGang, 0));
            }
        this.node.active = false;
        }, 0.5);
    }

    /**
     * 显示抢杠
     */
    public showQiangGang(cardValue: number): void {
        this.node.active = true;
        //this.img_card.node.active = true;
        this.btn_hu.node.active = true;
        this.btn_giveUp.node.active = true;

        // var sFrame = new cc.SpriteFrame();
        // this.img_card.spriteFrame = sFrame;
        // SetTextureRes(TDHMJ.ins.iclass.getMahjongResName(cardValue),this.img_card);
        //this.img_card.spriteFrame=TDHMJ.ins.iclass.getMahjongPaiHuaRes(cardValue);
    }
}
