import { LHZMJMahjongDef, LHZMJ } from "../ConstDef/LHZMJMahjongDef";
import LHZMJEvent from "../LHZMJEvent";
import { SetTextureRes } from "../../MJCommon/MJ_Function";
import M_LHZMJView from "../M_LHZMJView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_SelGang extends cc.Component {

    @property([cc.Sprite])
    img_gangcard_0: cc.Sprite[]=[];
    @property(cc.Node)
    img_0: cc.Node=null;

    //杠2

    @property([cc.Sprite])
    img_gangcard_1: cc.Sprite[]=[];
    @property(cc.Node)
    img_1: cc.Node=null;

    //杠3

    @property([cc.Sprite])
    img_gangcard_2: cc.Sprite[]=[];
    @property(cc.Node)
    img_2: cc.Node=null;

    @property([cc.Button])
    btn_gang:cc.Button[] = [];

    //背景


    private _gangCard: Array<number>;

    onLoad() {
        // init logic
        this.img_0.on(cc.Node.EventType.TOUCH_END, this.Gang_1, this);
        this.img_1.on(cc.Node.EventType.TOUCH_END, this.Gang_2, this);
        this.img_2.on(cc.Node.EventType.TOUCH_END, this.Gang_3, this);
    }
    onDisable(){
        // this.node.removeFromParent(false);
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
        if(cc.isValid(this.node)){
        this.img_0.dispatchEvent(new LHZMJEvent(LHZMJEvent.msg_gangCard, this._gangCard[0]));}
        this.node.active = false;
        this.node.destroy();
    }

    /**
     * 杠2
     */
    private Gang_2(){
        if(cc.isValid(this.node)){
        this.img_1.dispatchEvent(new LHZMJEvent(LHZMJEvent.msg_gangCard, this._gangCard[1]));}
        this.node.active = false;
        this.node.destroy();
    }

    /**
     * 杠3
     */
    private Gang_3(){
        if(cc.isValid(this.node)){
        this.img_2.dispatchEvent(new LHZMJEvent(LHZMJEvent.msg_gangCard, this._gangCard[2]));}
        this.node.active = false;
        this.node.destroy();
    }

    public showGang(gangCard: Array<number>): void {
        // this.node.removeFromParent(false);
        // M_LHZMJView.ins.node.addChild(this.node);
        this._gangCard.splice(0, this._gangCard.length);
        for (var i: number = 0; i < gangCard.length; i++) {
            if (LHZMJMahjongDef.gInvalidMahjongValue != gangCard[i]) {
                this._gangCard.push(gangCard[i]);
            }
        }

        if (this._gangCard.length > 1) {

            //this.img_gangcard_2.active = (3 == this._gangCard.length);
           // this.img_2.active = (3 == this._gangCard.length);
            this.btn_gang[0].node.active = true;
            this.btn_gang[1].node.active = true;
            this.btn_gang[2].node.active = false;
            this.img_2.active = false;

            let url = "";

            if(3 == this._gangCard.length){
                // url=LHZMJ.ins.iclass.getMahjongResName(this._gangCard[2]);
                // SetTextureRes(url,this.img_2);
                for(let i=0;i<this.img_gangcard_2.length;i++){
                    this.img_gangcard_2[i].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._gangCard[2]);
                }
                //this.img_2.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._gangCard[2]);
            this.btn_gang[0].node.active = true;
            this.btn_gang[1].node.active = true;
            this.btn_gang[2].node.active = true;
            this.img_2.active = true;
            }
          //  this.node.x=0-this.gang_bg.node.width/2;

            // url=LHZMJ.ins.iclass.getMahjongResName(this._gangCard[0]);
            // SetTextureRes(url,this.img_0);
            // this.img_0.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._gangCard[0]);
            for(let i=0;i<this.img_gangcard_0.length;i++){
                this.img_gangcard_0[i].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._gangCard[0]);
            }
            // url=LHZMJ.ins.iclass.getMahjongResName(this._gangCard[1]);
            // SetTextureRes(url,this.img_1);
            // this.img_1.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._gangCard[1]);
            for(let i=0;i<this.img_gangcard_1.length;i++){
                this.img_gangcard_1[i].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._gangCard[1]);
            }

            this.node.active = true;
        }
        
    }
}
