import LHZMJ_SinglePoolBase from "../LHZMJ_SinglePoolBase";
import { LHZMJ } from "../../../ConstDef/LHZMJMahjongDef";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_OppoSinglePool extends LHZMJ_SinglePoolBase {


    onLoad() {
        // init logic
        this.init();
    }

    /**
     * 显示牌
     * */
    public showCard(card: number,index:number): void {
        if(card==this._cardValue){
            return;
        }
        super.showCard(card,index);
        // // let url="";
        // // url=LHZMJ.ins.iclass.getMahjongResName(card);
        // // SetTextureRes(url,this.bmp_cardcolor);
        // //this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb1_showcard_oppo_1280");
        // this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);
        
        if(LHZMJ.ins.iclass.is2D()){
            this.bmp_cardback.node.width=42;
            this.bmp_cardback.node.height=58;
            this.bmp_cardback.node.scaleX=1;

            this.bmp_cardcolor.node.x=0;
            this.bmp_cardcolor.node.y=4;
            this.bmp_cardcolor.node.scaleX=0.45;
            this.bmp_cardcolor.node.scaleY=0.45;
            this.bmp_cardcolor.node.skewX=0;

            this.bmp_cardHide.node.x=0;
            this.bmp_cardHide.node.y=4;
            this.bmp_cardHide.node.scaleX=0.56;
            this.bmp_cardHide.node.scaleY=0.43;
            this.bmp_cardHide.node.skewX=0;
            this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
            this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);
        }else{
            this.show3DCard();
        }
        this.bmp_cardback.node.active=true;
        this.bmp_cardcolor.node.active=true;
    }
    
    /**
     * 尺寸
     * */
    public get size(): { width: number,height: number } {
        return { width: 39,height: 58 };
    }

    private show3DCard():void{

         switch(this._cardIndex){
            case 1:{
                this.node.x=197.2;
                this.node.y=139;

                this.bmp_cardback.node.width=51;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=-1;
                // this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=-3;

                this.bmp_cardHide.node.x=0.4;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=-4;

                this.bmp_greenbg.node.x=0.4;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=-4;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_2p_01");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 2:{
                this.node.x=153.4;
                this.node.y=139;

                this.bmp_cardback.node.width=49;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=-1;
                // this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=-2;

                this.bmp_cardHide.node.x=-0.1;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=-2.5;

                this.bmp_greenbg.node.x=-0.1;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=-2.5;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_2p_02");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 3:{
                this.node.x=109.4;
                this.node.y=139;

                this.bmp_cardback.node.width=48;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=-1.5;

                this.bmp_cardHide.node.x=-0.1;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=-2;

                this.bmp_greenbg.node.x=-0.1;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=-2;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_2p_03");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 4:{
               this.node.x=65.5;
                this.node.y=139;

                this.bmp_cardback.node.width=49;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=-1;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10.2;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=-1;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=10.2;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=-1;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_2p_04");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 5:{
                this.node.x=21;
                this.node.y=139;

                this.bmp_cardback.node.width=49;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=0;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=0;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=0;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_2p_05");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

            case 6:{
                this.node.x=-23;
                this.node.y=139;

                this.bmp_cardback.node.width=49;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=0;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=0;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=0;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_2p_05");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 7:{
                this.node.x=-67.5;
                this.node.y=139;

                this.bmp_cardback.node.width=49;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=1;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=1;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=1;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_2p_04");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 8:{
                this.node.x=-111.4;
                this.node.y=139;

                this.bmp_cardback.node.width=48;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=1.5;

                this.bmp_cardHide.node.x=0.1;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=2;

                this.bmp_greenbg.node.x=0.1;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=2;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_2p_03");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 9:{
                this.node.x=-155.4;
                this.node.y=139;

                this.bmp_cardback.node.width=49;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=2;

                this.bmp_cardHide.node.x=0.1;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=2.5;

                this.bmp_greenbg.node.x=0.1;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=2.5;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_2p_02");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 10:{
                this.node.x=-199.2;
                this.node.y=139;

                this.bmp_cardback.node.width=51;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=-1;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=3;

                this.bmp_cardHide.node.x=-0.4;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=4;

                this.bmp_greenbg.node.x=-0.4;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=4;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_2p_01");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }




            case 11:{
                this.node.x=193.9;
                this.node.y=177.5;

                this.bmp_cardback.node.width=51;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=-3;

                this.bmp_cardHide.node.x=0.4;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=-4;

                this.bmp_greenbg.node.x=0.4;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=-4;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_01");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 12:{
                this.node.x=150.7;
                this.node.y=177.5;

                this.bmp_cardback.node.width=49;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=-2;

                this.bmp_cardHide.node.x=-0.1;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=-2.5;

                this.bmp_greenbg.node.x=-0.1;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=-2.5;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_02");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 13:{
                this.node.x=107.9;
                this.node.y=177.5;

                this.bmp_cardback.node.width=48;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=-1.5;

                this.bmp_cardHide.node.x=-0.1;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=-2;

                this.bmp_greenbg.node.x=-0.1;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=-2;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_03");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 14:{
               this.node.x=64.3;
                this.node.y=177.5;

                this.bmp_cardback.node.width=47;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=-1;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=-1;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=-1;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_04");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 15:{
                this.node.x=21;
                this.node.y=177.5;

                this.bmp_cardback.node.width=47;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=0;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=0;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=0;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_05");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

            case 16:{
                this.node.x=-23;
                this.node.y=177.5;

                this.bmp_cardback.node.width=47;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=0;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=0;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=0;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_05");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 17:{
                this.node.x=-66.3;
                this.node.y=177.5;

                this.bmp_cardback.node.width=47;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=1;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=1;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=1;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_04");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 18:{
                this.node.x=-109.9;
                this.node.y=177.5;

                this.bmp_cardback.node.width=48;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=1.5;

                this.bmp_cardHide.node.x=0.1;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=2;

                this.bmp_greenbg.node.x=0.1;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=2;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_03");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 19:{
                this.node.x=-152.7;
                this.node.y=177.5;

                this.bmp_cardback.node.width=49;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=2;

                this.bmp_cardHide.node.x=0.1;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=2.5;

                this.bmp_greenbg.node.x=0.1;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=2.5;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_02");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 20:{
                this.node.x=-195.9;
                this.node.y=177.5;

                this.bmp_cardback.node.width=51;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=-1;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=3;

                this.bmp_cardHide.node.x=-0.4;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=4;

                this.bmp_greenbg.node.x=-0.4;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=4;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_01");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }





            case 21:{
                this.node.x=190.9;
                this.node.y=215.5;

                this.bmp_cardback.node.width=50;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=-3;

                this.bmp_cardHide.node.x=0.4;
                this.bmp_cardHide.node.y=10.2;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=-3;

                this.bmp_greenbg.node.x=0.4;
                this.bmp_greenbg.node.y=10.2;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=-3;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_01");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 22:{
                this.node.x=148.7;
                this.node.y=215.5;

                this.bmp_cardback.node.width=48;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=-2;

                this.bmp_cardHide.node.x=-0.1;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=-3;

                this.bmp_greenbg.node.x=-0.1;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=-3;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_02");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 23:{
                this.node.x=105.9;
                this.node.y=215.5;

                this.bmp_cardback.node.width=48;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=-1.5;

                this.bmp_cardHide.node.x=-0.1;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=-2;

                this.bmp_greenbg.node.x=-0.1;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=-2;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_03");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 24:{
               this.node.x=63.3;
                this.node.y=215.5;

                this.bmp_cardback.node.width=48;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=-1;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=-1;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=-1;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_04");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 25:{
                this.node.x=20;
                this.node.y=215.5;

                this.bmp_cardback.node.width=48;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=0;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=0;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=0;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_05");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

            case 26:{
                this.node.x=-22;
                this.node.y=215.5;

                this.bmp_cardback.node.width=48;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=0;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.55;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=0;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.55;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=0;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_05");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 27:{
                this.node.x=-64.3;
                this.node.y=215.5;

                this.bmp_cardback.node.width=48;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=1;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=2;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=2;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_04");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 28:{
                this.node.x=-107.9;
                this.node.y=215.5;

                this.bmp_cardback.node.width=48;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=1.5;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=2.5;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=2.5;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_03");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 29:{
                this.node.x=-150.7;
                this.node.y=215.5;

                this.bmp_cardback.node.width=48;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=2;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=2.5;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=2.5;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_02");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 30:{
                this.node.x=-192.9;
                this.node.y=215.5;

                this.bmp_cardback.node.width=50;
                this.bmp_cardback.node.height=60;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardback.node.y=0;

                this.bmp_cardcolor.node.x=-1;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewX=3;

                this.bmp_cardHide.node.x=-0.4;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=4;

                this.bmp_greenbg.node.x=-0.4;
                this.bmp_greenbg.node.y=10;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.35;
                this.bmp_greenbg.node.skewX=4;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_top_1p_01");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
        }
        this.node.x = this.node.x - 90;
        this.node.y = this.node.y+10;
    }
}
