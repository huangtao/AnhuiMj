import { MGMJMahjongDef, MGMJ } from "../ConstDef/MGMJMahjongDef";
import MGMJEvent from "../MGMJEvent";
import { SetTextureRes } from "../../MJCommon/MJ_Function";
import M_MGMJClass from '../M_MGMJClass';

const { ccclass, property } = cc._decorator;

@ccclass
export default class MGMJ_SelGang extends cc.Component {

    //框
    @property([cc.Sprite])
    img_kuang:cc.Sprite[] = [];

    //杠1
    @property(cc.Button)
    btn_gang_0: cc.Button=null;
    @property([cc.Sprite])
    img_gangcard_0: cc.Sprite[] = [];
    @property([cc.Sprite])
    img_0: cc.Sprite[] = [];

    //杠2
    @property(cc.Button)
    btn_gang_1: cc.Button=null;
    @property([cc.Sprite])
    img_gangcard_1: cc.Sprite[] = [];
    @property([cc.Sprite])
    img_1: cc.Sprite[] = [];

    //杠3
    @property(cc.Button)
    btn_gang_2: cc.Button=null;
    @property([cc.Sprite])
    img_gangcard_2: cc.Sprite[] = [];
    @property([cc.Sprite])
    img_2: cc.Sprite[] = [];

    private _gangCard: Array<number>;

    onLoad() {
        // init logic
       this.btn_gang_0.node.on(cc.Node.EventType.TOUCH_END, this.Gang_1, this);
       this.btn_gang_1.node.on(cc.Node.EventType.TOUCH_END, this.Gang_2, this);
       this.btn_gang_2.node.on(cc.Node.EventType.TOUCH_END, this.Gang_3, this);
    }

    public init() {
        this.node.active = false;
        this._gangCard = new Array<number>();    
    }

    /**
     * 杠1
     */
    private Gang_1(){
        // this.btn_gang_0.node.dispatchEvent(new MGMJEvent(MGMJEvent.msg_gangCard, this._gangCard[0]));
        M_MGMJClass.ins.OnGangSel(this._gangCard[0]);
        this.node.active = false;
    }

    /**
     * 杠2
     */
    private Gang_2(){
        // this.btn_gang_1.node.dispatchEvent(new MGMJEvent(MGMJEvent.msg_gangCard, this._gangCard[1]));
        M_MGMJClass.ins.OnGangSel(this._gangCard[1]);
        this.node.active = false;
    }

    /**
     * 杠3
     */
    private Gang_3(){
        // this.btn_gang_0.node.dispatchEvent(new MGMJEvent(MGMJEvent.msg_gangCard, this._gangCard[2]));
        M_MGMJClass.ins.OnGangSel(this._gangCard[2]);
        this.node.active = false;
    }

    public showGang(gangCard: Array<number>): void {
        this._gangCard.splice(0, this._gangCard.length);
        for (var i: number = 0; i < gangCard.length; i++) {
            if (MGMJMahjongDef.gInvalidMahjongValue != gangCard[i]) {
                this._gangCard.push(gangCard[i]);
            }
        }

        if(2 == this._gangCard.length){
            //0,1
            this.img_kuang[0].node.active = true;
            this.img_kuang[1].node.active = true;
            this.img_kuang[2].node.active = false;
            this.btn_gang_2.node.active = false;
            for(var i:number = 0;i<4;i++){
                this.img_0[i].spriteFrame = MGMJ.ins.iclass.getMahjongPaiHuaResOut(this._gangCard[0]);
                this.img_1[i].spriteFrame = MGMJ.ins.iclass.getMahjongPaiHuaResOut(this._gangCard[1]);
            }                  
        }
        if(3 == this._gangCard.length){
            //0,1,2
            this.img_kuang[0].node.active = true;
            this.img_kuang[1].node.active = true;
            this.img_kuang[2].node.active = true;
            for(var i:number = 0;i<4;i++){
                this.img_0[i].spriteFrame = MGMJ.ins.iclass.getMahjongPaiHuaResOut(this._gangCard[0]);
                this.img_1[i].spriteFrame = MGMJ.ins.iclass.getMahjongPaiHuaResOut(this._gangCard[1]);
                this.img_2[i].spriteFrame = MGMJ.ins.iclass.getMahjongPaiHuaResOut(this._gangCard[2]);
            }
        }
        this.node.active = true;
        // if (this._gangCard.length > 1) {

        //    // this.img_gangcard_2.node.active = (3 == this._gangCard.length);
        //   //  this.img_2.node.active = (3 == this._gangCard.length);

        //     let url = "";

        //     if(3 == this._gangCard.length){
        //         // url=MGMJ.ins.iclass.getMahjongResName(this._gangCard[2]);
        //         // SetTextureRes(url,this.img_2);
        //    //     this.img_2.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaResOut(this._gangCard[2]);
        //     }
        //    // this.img_0.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaResOut(this._gangCard[0]);

        //    // this.img_1.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaResOut(this._gangCard[1]);
        //     this.node.active = true;
        // }
    }
}
