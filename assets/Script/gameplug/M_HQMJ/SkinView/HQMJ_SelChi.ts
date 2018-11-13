import { HQMJMahjongDef, HQMJ } from "../ConstDef/HQMJMahjongDef";
import HQMJEvent from "../HQMJEvent";
import { SetTextureRes } from "../../MJCommon/MJ_Function";
import M_HQMJClass from '../M_HQMJClass';

const { ccclass, property } = cc._decorator;

@ccclass
export default class HQMJ_SelChi extends cc.Component {

    //吃1
    @property(cc.Button)
    btn_chi_0: cc.Button=null;
    @property([cc.Sprite])
    chi_bg_0: cc.Sprite[]=[];
    @property([cc.Sprite])
    img_0: cc.Sprite[]=[];
    @property(cc.Node)
    node_chi_0:cc.Node = null;

    //吃2
    @property(cc.Button)
    btn_chi_1: cc.Button=null;
    @property([cc.Sprite])
    chi_bg_1: cc.Sprite[]=[];
    @property([cc.Sprite])
    img_1: cc.Sprite[]=[];
    @property(cc.Node)
    node_chi_1:cc.Node = null;

    //吃3
    @property(cc.Button)
    btn_chi_2: cc.Button=null;
    @property([cc.Sprite])
    chi_bg_2: cc.Sprite[]=[];
    @property([cc.Sprite])
    img_2: cc.Sprite[]=[];
    @property(cc.Node)
    node_chi_2:cc.Node = null;


    //背景
    // @property(cc.Sprite)
    // chi_bg: cc.Sprite=null;

    public chiSel : number;//玩家选择的吃
    public chiNum : number;//吃的牌
    public leftChi: boolean;
    public midChi : boolean;
    public rightChi:boolean;
    public countChi: number;//总的可吃选择

    onLoad() {
        // init logic
        this.btn_chi_0.node.on(cc.Node.EventType.TOUCH_END, this.Chi_1, this);
        this.btn_chi_1.node.on(cc.Node.EventType.TOUCH_END, this.Chi_2, this);
        this.btn_chi_2.node.on(cc.Node.EventType.TOUCH_END, this.Chi_3, this);
    }
    
    public init() {
        this.node.active = false;
        this.chiSel = 0;   
        this.countChi = 0;
        this.chiNum = 0;     
    }
    /**
     * 吃1
     */
    private Chi_1(){
        if(2 == this.countChi){
            if(!this.leftChi){
                this.chiSel = 1;
            }
            if(!this.midChi || !this.rightChi){
                this.chiSel = 0;
            }
        }
        if(3 == this.countChi){
            this.chiSel = 0;
        }      
        M_HQMJClass.ins.OnChiSel(this.chiNum,this.chiSel);      
        this.node.active = false;
    }
    /**
     * 吃2
     */
    private Chi_2(){
        if(2 == this.countChi){
            if(!this.leftChi || !this.midChi){
                this.chiSel = 2;
            }
            if(!this.rightChi){
                this.chiSel = 1;
            }
        }
        if(3 == this.countChi){
            this.chiSel = 1;
        }
        M_HQMJClass.ins.OnChiSel(this.chiNum,this.chiSel);
        this.node.active = false;
    }
    /**
     * 吃3
     */
    private Chi_3(){
        this.chiSel = 2;
        M_HQMJClass.ins.OnChiSel(this.chiNum,this.chiSel);
        this.node.active = false;
    }

    public showChi(countChi: number,leftChi:boolean,midChi:boolean,rightChi:boolean,card:number): void {
        cc.log("-------吃牌预制体被调用 显示出来了---------");
        cc.log("总的可吃选择："+countChi+"---chiType分别为:leftChi|midChi|right| = "+ leftChi+"|"+midChi+"|"+rightChi + "吃的牌为:"+card);
        this.leftChi = leftChi;
        this.midChi = midChi;
        this.rightChi = rightChi;
        this.countChi = countChi;
        this.chiNum = card;

        this.node.active = true;
        //两种吃法
        if(2 == countChi){
            this.btn_chi_0.node.active = true;          
            this.node_chi_0.active = true;
            this.btn_chi_1.node.active = true;          
            this.node_chi_1.active = true;
            this.btn_chi_2.node.active = false;          
            this.node_chi_2.active = false;
            //吃牌赋值
            if(!leftChi){//中 右
                this.img_0[0].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card-1);
                this.img_0[1].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card);
                this.img_0[2].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card+1);

                this.img_1[0].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card);
                this.img_1[1].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card+1);
                this.img_1[2].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card+2);
            }
            if(!midChi){//左 右
                this.img_0[0].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card-2);
                this.img_0[1].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card-1);
                this.img_0[2].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card);

                this.img_1[0].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card);
                this.img_1[1].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card+1);
                this.img_1[2].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card+2);
            }
            if(!rightChi){//左 中
                this.img_0[0].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card-2);
                this.img_0[1].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card-1);
                this.img_0[2].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card);

                this.img_1[0].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card-1);
                this.img_1[1].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card);
                this.img_1[2].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card+1);
            }   
        }
        //三种吃法
        if(3 == countChi){
            this.btn_chi_0.node.active = true;          
            this.node_chi_0.active = true;
            this.btn_chi_1.node.active = true;          
            this.node_chi_1.active = true;
            this.btn_chi_2.node.active = true;          
            this.node_chi_2.active = true;
            //左
            this.img_0[0].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card-2);
            this.img_0[1].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card-1);
            this.img_0[2].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card);
            //中
            this.img_1[0].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card-1);
            this.img_1[1].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card);
            this.img_1[2].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card+1);
            //右
            this.img_2[0].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card);
            this.img_2[1].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card+1);
            this.img_2[2].spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card+2);
        }
       
    }
}
