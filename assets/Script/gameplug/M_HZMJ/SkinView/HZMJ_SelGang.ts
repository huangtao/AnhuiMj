import { HZMJMahjongDef, HZMJ } from "../ConstDef/HZMJMahjongDef";
import HZMJEvent from "../HZMJEvent";
import { SetTextureRes } from "../../MJCommon/MJ_Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_SelGang extends cc.Component {

    //杠1
    @property(cc.Button)
    btn_gang_0: cc.Button=null;
    @property(cc.Sprite)
    img_gangcard_0: cc.Sprite=null;
    @property(cc.Sprite)
    img_0: cc.Sprite=null;

    //杠2
    @property(cc.Button)
    btn_gang_1: cc.Button=null;
    @property(cc.Sprite)
    img_gangcard_1: cc.Sprite=null;
    @property(cc.Sprite)
    img_1: cc.Sprite=null;

    //杠3
    @property(cc.Button)
    btn_gang_2: cc.Button=null;
    @property(cc.Sprite)
    img_gangcard_2: cc.Sprite=null;
    @property(cc.Sprite)
    img_2: cc.Sprite=null;

    //背景
    @property(cc.Sprite)
    gang_bg: cc.Sprite=null;

    private _gangCard: Array<number>;

    onLoad() {
        // init logic
        this.img_0.node.on(cc.Node.EventType.TOUCH_END, this.Gang_1, this);
        this.img_1.node.on(cc.Node.EventType.TOUCH_END, this.Gang_2, this);
        this.img_2.node.on(cc.Node.EventType.TOUCH_END, this.Gang_3, this);
    }

    public init() {
        this.node.active = false;
        this._gangCard = new Array<number>();

        //this.node.on(cc.Node.EventType.MOUSE_DOWN, p=>{}, this.node);
        
    }

    /**
     * 杠1
     */
    private Gang_1(){
        this.img_0.node.dispatchEvent(new HZMJEvent(HZMJEvent.msg_gangCard, this._gangCard[0]));
        this.node.active = false;
    }

    /**
     * 杠2
     */
    private Gang_2(){
        this.img_1.node.dispatchEvent(new HZMJEvent(HZMJEvent.msg_gangCard, this._gangCard[1]));
        this.node.active = false;
    }

    /**
     * 杠3
     */
    private Gang_3(){
        this.img_2.node.dispatchEvent(new HZMJEvent(HZMJEvent.msg_gangCard, this._gangCard[2]));
        this.node.active = false;
    }

    public showGang(gangCard: Array<number>): void {
        this._gangCard.splice(0, this._gangCard.length);
        for (var i: number = 0; i < gangCard.length; i++) {
            if (HZMJMahjongDef.gInvalidMahjongValue != gangCard[i]) {
                this._gangCard.push(gangCard[i]);
            }
        }

        if (this._gangCard.length > 1) {

            this.img_gangcard_2.node.active = (3 == this._gangCard.length);
            this.img_2.node.active = (3 == this._gangCard.length);
            this.gang_bg.node.scaleX = 3.3;

            let url = "";

            if(3 == this._gangCard.length){
                // url=HZMJ.ins.iclass.getMahjongResName(this._gangCard[2]);
                // SetTextureRes(url,this.img_2);
                this.img_2.spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this._gangCard[2]);
                this.gang_bg.node.scaleX = 5;
            }

            // url=HZMJ.ins.iclass.getMahjongResName(this._gangCard[0]);
            // SetTextureRes(url,this.img_0);
            this.img_0.spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this._gangCard[0]);

            // url=HZMJ.ins.iclass.getMahjongResName(this._gangCard[1]);
            // SetTextureRes(url,this.img_1);

            this.img_1.spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this._gangCard[1]);
            this.node.active = true;
        }
    }
}
