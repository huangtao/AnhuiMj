import LHZMJ_SinglePoolBase from "../LHZMJ_SinglePoolBase";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";
import { LHZMJ } from "../../../ConstDef/LHZMJMahjongDef";


const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_SelfSinglePool extends LHZMJ_SinglePoolBase {

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
        // let url="";
        if(LHZMJ.ins.iclass.is2D()){
            this.bmp_cardback.node.width=42;
            this.bmp_cardback.node.height=58;
            this.bmp_cardback.node.scaleX=1;
            this.bmp_cardback.node.skewX=0;
            this.bmp_cardback.node.skewY=0;

            this.bmp_cardcolor.node.x=0;
            this.bmp_cardcolor.node.y=5;
            this.bmp_cardcolor.node.scaleX=0.45;
            this.bmp_cardcolor.node.scaleY=0.45;
            this.bmp_cardcolor.node.skewX=0;

            this.bmp_cardHide.node.x=0;
            this.bmp_cardHide.node.y=7;
            this.bmp_cardHide.node.scaleX=0.55;
            this.bmp_cardHide.node.scaleY=0.43;
            this.bmp_cardHide.node.skewX=0;
            this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
            this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);
        }else{
            this.show3DCard();
        }
        // // url=LHZMJ.ins.iclass.getMahjongResName(card);
        // // SetTextureRes(url,this.bmp_cardcolor);
        // this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb1_showcard_oppo_1280");
        // this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);

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
        switch (this._cardIndex) {
            case 1:{
                this.node.x=-260;
                this.node.y=-85;

                this.bmp_cardback.node.width=59;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=1;

                this.bmp_cardcolor.node.x=-0.4;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=2.9;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=4;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=4;


                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_3p_01");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 2:{
                this.node.x=-209;
                this.node.y=-85;

                this.bmp_cardback.node.width=57;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=1;

                this.bmp_cardcolor.node.x=0.8;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=2.4;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=2.7;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=2.7;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_3p_02");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 3:{
                this.node.x=-158;
                this.node.y=-85;

                this.bmp_cardback.node.width=56;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=1;

                this.bmp_cardcolor.node.x=0.4;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=1.9;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=1.2;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=1.2;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_3p_03");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 4:{
                this.node.x=-107;
                this.node.y=-85;

                this.bmp_cardback.node.width=56;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=1;

                this.bmp_cardcolor.node.x=0.4;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=1.2;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=1;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=1;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_3p_04");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 5:{
                this.node.x=-56;
                this.node.y=-85;

                this.bmp_cardback.node.width=55;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=1;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=0;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=0;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=0;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_3p_05");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

            case 6:{
                this.node.x=-4;
                this.node.y=-85;

                this.bmp_cardback.node.width=55;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=0;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=0;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=0;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_3p_04");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 7:{
                this.node.x=47;
                this.node.y=-85;

                this.bmp_cardback.node.width=56;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=-0.4;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=-1.2;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=-1;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=-1;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_3p_03");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 8:{
                this.node.x=98;
                this.node.y=-85;

                this.bmp_cardback.node.width=56;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=-0.4;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=-1.9;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=-1.2;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=-1.2;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_3p_02");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 9:{
                this.node.x=149;
                this.node.y=-85;

                this.bmp_cardback.node.width=57;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=-0.8;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=-2.4;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=-2.7;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=-2.7;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_3p_01");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 10:{
                this.node.x=199;
                this.node.y=-85;

                this.bmp_cardback.node.width=59;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=0.4;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=-2.9;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=-4;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=-4;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_3p_01");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }



            case 11:{
                this.node.x=-264;
                this.node.y=-130.6;

                this.bmp_cardback.node.width=60;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=1;

                this.bmp_cardcolor.node.x=-0.4;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=2.9;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=4;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=4;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_1p_01");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 12:{
                this.node.x=-212;
                this.node.y=-130.6;

                this.bmp_cardback.node.width=58;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=1;

                this.bmp_cardcolor.node.x=0.8;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=2.4;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=2.7;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=2.7;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_1p_02");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 13:{
                this.node.x=-160;
                this.node.y=-130.6;

                this.bmp_cardback.node.width=57;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=1;

                this.bmp_cardcolor.node.x=0.4;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=1.9;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=1.2;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=1.2;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_1p_03");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 14:{
                this.node.x=-109;
                this.node.y=-130.6;

                this.bmp_cardback.node.width=56;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=1;

                this.bmp_cardcolor.node.x=0.4;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=1.2;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=1;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=1;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_1p_04");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 15:{
                this.node.x=-56;
                this.node.y=-130.6;

                this.bmp_cardback.node.width=55;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=1;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=0;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=0;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=0;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_1p_05");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

            case 16:{
                this.node.x=-3;
                this.node.y=-130.6;

                this.bmp_cardback.node.width=55;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=0;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=0;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=0;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_1p_04");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 17:{
                this.node.x=49;
                this.node.y=-130.6;

                this.bmp_cardback.node.width=56;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=-0.4;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=-1.2;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=-1;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=-1;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_1p_03");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 18:{
                this.node.x=101;
                this.node.y=-130.6;

                this.bmp_cardback.node.width=57;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=-0.4;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=-1.9;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=-1.2;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=-1.2;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_1p_02");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 19:{
                this.node.x=153;
                this.node.y=-130.6;

                this.bmp_cardback.node.width=58;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=-0.8;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=-2.4;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=-2.7;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=-2.7;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_1p_01");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 20:{
                this.node.x=204.7;
                this.node.y=-130.6;

                this.bmp_cardback.node.width=60;
                this.bmp_cardback.node.height=72;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=0.4;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=-2.9;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=-4;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=-4;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_1p_01");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }


            case 21:{
                this.node.x=-270.2;
                this.node.y=-175.7;

                this.bmp_cardback.node.width=61;
                this.bmp_cardback.node.height=71;
                this.bmp_cardback.node.scaleX=1;

                this.bmp_cardcolor.node.x=-0.4;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=3.3;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=4;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=4;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_2p_01");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 22:{
                this.node.x=-216.1;
                this.node.y=-175.7;

                this.bmp_cardback.node.width=58;
                this.bmp_cardback.node.height=71;
                this.bmp_cardback.node.scaleX=1;

                this.bmp_cardcolor.node.x=0.6;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=2.5;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=3;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=3;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_2p_02");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 23:{
                this.node.x=-163;
                this.node.y=-175.7;

                this.bmp_cardback.node.width=58;
                this.bmp_cardback.node.height=71;
                this.bmp_cardback.node.scaleX=1;

                this.bmp_cardcolor.node.x=-0.4;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=3.3;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=2;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=2;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_2p_03");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 24:{
                this.node.x=-109.9;
                this.node.y=-175.7;

                this.bmp_cardback.node.width=57;
                this.bmp_cardback.node.height=71;
                this.bmp_cardback.node.scaleX=1;

                this.bmp_cardcolor.node.x=0.6;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=1.3;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=1;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=1;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_2p_04");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 25:{
                this.node.x=-56.8;
                this.node.y=-175.7;

                this.bmp_cardback.node.width=57;
                this.bmp_cardback.node.height=71;
                this.bmp_cardback.node.scaleX=1;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=0;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=0;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=1;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_2p_05");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }


            case 26:{
                this.node.x=-4.5;
                this.node.y=-175.7;

                this.bmp_cardback.node.width=57;
                this.bmp_cardback.node.height=71;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=0;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=0;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=0;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_2p_05");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 27:{
                this.node.x=49.4;
                this.node.y=-175.7;

                this.bmp_cardback.node.width=57;
                this.bmp_cardback.node.height=71;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=-0.6;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=-1.3;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=-1;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=-1;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_2p_04");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 28:{
                this.node.x=103;
                this.node.y=-175.7;

                this.bmp_cardback.node.width=58;
                this.bmp_cardback.node.height=71;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=0.4;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=-3.3;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=-2;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=-2;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_2p_03");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 29:{
                this.node.x=155.9;
                this.node.y=-175.7;

                this.bmp_cardback.node.width=58;
                this.bmp_cardback.node.height=71;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=-0.6;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=-2.5;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=-3;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=-3;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_2p_02");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 30:{
                this.node.x=209.8;
                this.node.y=-175.7;

                this.bmp_cardback.node.width=61;
                this.bmp_cardback.node.height=71;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=0.4;
                this.bmp_cardcolor.node.y=12;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=-3.3;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=-4;

                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=12.6;
                this.bmp_greenbg.node.scaleX=0.6;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewX=-4;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_btm_2p_01");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

        }
        this.node.x = this.node.x+130;
      //  this.node.y = this.node.y ;
        if(this._cardIndex>5&&this._cardIndex<10){
            this.bmp_cardback.node.skewX = this._cardIndex-4;
        }
        
       // this.node.scaleX = -1;
 
    }
}
