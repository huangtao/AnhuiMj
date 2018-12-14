import LHZMJ_SinglePoolBase from "../LHZMJ_SinglePoolBase";
import { LHZMJ } from "../../../ConstDef/LHZMJMahjongDef";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_DownSinglePool extends LHZMJ_SinglePoolBase {


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
        let url="";

        //url=LHZMJ.ins.iclass.getMahjongResName(card);
        //SetTextureRes(url,this.bmp_cardcolor);
        // this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);
        if(LHZMJ.ins.iclass.is2D()){
            this.bmp_cardback.node.width=56;
            this.bmp_cardback.node.height=45;
            this.bmp_cardback.node.scaleY=1.1;

            this.bmp_cardcolor.node.x=0;
            this.bmp_cardcolor.node.y=8;
            this.bmp_cardcolor.node.scaleX=0.4;
            this.bmp_cardcolor.node.scaleY=0.45;
            this.bmp_cardcolor.node.skewY=0;

            this.bmp_cardHide.node.x=0;
            this.bmp_cardHide.node.y=8;
            this.bmp_cardHide.node.scaleX=0.44;
            this.bmp_cardHide.node.scaleY=0.5;
            this.bmp_cardHide.node.skewY=0;
            this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
            this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);
        }else{
            this.show3DCard();
        }
        this.bmp_cardback.node.active=true;
        this.bmp_cardcolor.node.active=true;
        // this._bmp_cardcolor.x = 2;
        // this._bmp_cardcolor.y = 34;
        // this._bmp_cardcolor.scaleX = 0.5;
        // this._bmp_cardcolor.scaleY = 0.5;
        // this._bmp_cardcolor.rotation=-90;

    }
    
    /**
     * 尺寸
     * */
    public get size(): { width: number,height: number } {
        return { width: 52,height: 45 };
    }

    private show3DCard():void{

        switch(this._cardIndex){
            case 1:{
                this.node.x=225.7;
                this.node.y=-106.5;

                this.bmp_cardback.node.width=75;
                this.bmp_cardback.node.height=56;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=2;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.48;
                this.bmp_cardcolor.node.scaleY=0.6;
                this.bmp_cardcolor.node.skewY=11;

                this.bmp_cardHide.node.x=2.1;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.55;
                this.bmp_cardHide.node.skewY=7;

                this.bmp_greenbg.node.x=2.1;
                this.bmp_greenbg.node.y=10.3;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.55;
                this.bmp_greenbg.node.skewY=7;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_3p_10");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 2:{
                this.node.x=220.7;
                this.node.y=-72;

                this.bmp_cardback.node.width=73;
                this.bmp_cardback.node.height=55;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=2;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.48;
                this.bmp_cardcolor.node.scaleY=0.6;
                this.bmp_cardcolor.node.skewY=7;

                this.bmp_cardHide.node.x=2.1;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.46;
                this.bmp_cardHide.node.scaleY=0.53;
                this.bmp_cardHide.node.skewY=7;

                this.bmp_greenbg.node.x=2.1;
                this.bmp_greenbg.node.y=10.3;
                this.bmp_greenbg.node.scaleX=0.46;
                this.bmp_greenbg.node.scaleY=0.53;
                this.bmp_greenbg.node.skewY=7;


                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_3p_09");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 3:{
                this.node.x=215.4;
                this.node.y=-39.5;

                this.bmp_cardback.node.width=71;
                this.bmp_cardback.node.height=53;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=2;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.46;
                this.bmp_cardcolor.node.scaleY=0.58;
                this.bmp_cardcolor.node.skewY=7;

                this.bmp_cardHide.node.x=1.8;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.44;
                this.bmp_cardHide.node.scaleY=0.52;
                this.bmp_cardHide.node.skewY=7;

                this.bmp_greenbg.node.x=1.8;
                this.bmp_greenbg.node.y=10.3;
                this.bmp_greenbg.node.scaleX=0.44;
                this.bmp_greenbg.node.scaleY=0.52;
                this.bmp_greenbg.node.skewY=7;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_3p_08");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 4:{
                this.node.x=211.4;
                this.node.y=-8.9;

                this.bmp_cardback.node.width=69;
                this.bmp_cardback.node.height=53;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.46;
                this.bmp_cardcolor.node.scaleY=0.58;
                this.bmp_cardcolor.node.skewY=9;

                this.bmp_cardHide.node.x=0.8;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.44;
                this.bmp_cardHide.node.scaleY=0.52;
                this.bmp_cardHide.node.skewY=8;

                this.bmp_greenbg.node.x=0.8;
                this.bmp_greenbg.node.y=10.3;
                this.bmp_greenbg.node.scaleX=0.44;
                this.bmp_greenbg.node.scaleY=0.52;
                this.bmp_greenbg.node.skewY=8;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_3p_07");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 5:{
                this.node.x=207.2;
                this.node.y=22.7;

                this.bmp_cardback.node.width=69;
                this.bmp_cardback.node.height=55;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.46;
                this.bmp_cardcolor.node.scaleY=0.58;
                this.bmp_cardcolor.node.skewY=9;

                this.bmp_cardHide.node.x=0.8;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.44;
                this.bmp_cardHide.node.scaleY=0.52;
                this.bmp_cardHide.node.skewY=8;

                 this.bmp_greenbg.node.x=0.8;
                this.bmp_greenbg.node.y=10.3;
                this.bmp_greenbg.node.scaleX=0.44;
                this.bmp_greenbg.node.scaleY=0.52;
                this.bmp_greenbg.node.skewY=8;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_3p_06");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

            case 6:{
                this.node.x=203.1;
                this.node.y=54.1;

                this.bmp_cardback.node.width=66;
                this.bmp_cardback.node.height=52;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1.7;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.41;
                this.bmp_cardcolor.node.scaleY=0.56;
                this.bmp_cardcolor.node.skewY=7;

                this.bmp_cardHide.node.x=1.7;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.43;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=8;

                this.bmp_greenbg.node.x=1.7;
                this.bmp_greenbg.node.y=10.3;
                this.bmp_greenbg.node.scaleX=0.43;
                this.bmp_greenbg.node.scaleY=0.5;
                this.bmp_greenbg.node.skewY=8;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_3p_05");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 7:{
                this.node.x=198.3;
                this.node.y=85;

                this.bmp_cardback.node.width=66;
                this.bmp_cardback.node.height=50;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1.7;
                this.bmp_cardcolor.node.y=9.6;
                this.bmp_cardcolor.node.scaleX=0.41;
                this.bmp_cardcolor.node.scaleY=0.54;
                this.bmp_cardcolor.node.skewY=7;

                this.bmp_cardHide.node.x=1.5;
                this.bmp_cardHide.node.y=9.2;
                this.bmp_cardHide.node.scaleX=0.42;
                this.bmp_cardHide.node.scaleY=0.49;
                this.bmp_cardHide.node.skewY=8;

                this.bmp_greenbg.node.x=1.5;
                this.bmp_greenbg.node.y=9.2;
                this.bmp_greenbg.node.scaleX=0.42;
                this.bmp_greenbg.node.scaleY=0.49;
                this.bmp_greenbg.node.skewY=8;



                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_3p_04");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 8:{
                this.node.x=194.3;
                this.node.y=114.2;

                this.bmp_cardback.node.width=64;
                this.bmp_cardback.node.height=48;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1.3;
                this.bmp_cardcolor.node.y=9.4;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.535;
                this.bmp_cardcolor.node.skewY=7;

                this.bmp_cardHide.node.x=1.5;
                this.bmp_cardHide.node.y=9.2;
                this.bmp_cardHide.node.scaleX=0.42;
                this.bmp_cardHide.node.scaleY=0.49;
                this.bmp_cardHide.node.skewY=8;

                this.bmp_greenbg.node.x=1.5;
                this.bmp_greenbg.node.y=9.2;
                this.bmp_greenbg.node.scaleX=0.42;
                this.bmp_greenbg.node.scaleY=0.49;
                this.bmp_greenbg.node.skewY=8;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_3p_03");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 9:{
                this.node.x=190.2;
                this.node.y=142.3;

                this.bmp_cardback.node.width=62;
                this.bmp_cardback.node.height=48;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=0.6;
                this.bmp_cardcolor.node.y=9.4;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.53;
                this.bmp_cardcolor.node.skewY=7;

                this.bmp_cardHide.node.x=1.1;
                this.bmp_cardHide.node.y=9.2;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.47;
                this.bmp_cardHide.node.skewY=8;

                this.bmp_greenbg.node.x=1.1;
                this.bmp_greenbg.node.y=9.2;
                this.bmp_greenbg.node.scaleX=0.4;
                this.bmp_greenbg.node.scaleY=0.47;
                this.bmp_greenbg.node.skewY=8;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_3p_02");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 10:{
                this.node.x=186.1;
                this.node.y=171.5;

                this.bmp_cardback.node.width=61;
                this.bmp_cardback.node.height=47;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=8.5;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.51;
                this.bmp_cardcolor.node.skewY=7;

                this.bmp_cardHide.node.x=1.1;
                this.bmp_cardHide.node.y=8.3;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.465;
                this.bmp_cardHide.node.skewY=8;

                this.bmp_greenbg.node.x=1.1;
                this.bmp_greenbg.node.y=8.3;
                this.bmp_greenbg.node.scaleX=0.4;
                this.bmp_greenbg.node.scaleY=0.465;
                this.bmp_greenbg.node.skewY=8;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_3p_01");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }




            case 11:{
                this.node.x=284.5;
                this.node.y=-106.5;

                this.bmp_cardback.node.width=75;
                this.bmp_cardback.node.height=56;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=2;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.48;
                this.bmp_cardcolor.node.scaleY=0.6;
                this.bmp_cardcolor.node.skewY=7;

                this.bmp_cardHide.node.x=2.1;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.55;
                this.bmp_cardHide.node.skewY=7;

                this.bmp_greenbg.node.x=2.1;
                this.bmp_greenbg.node.y=10.3;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.55;
                this.bmp_greenbg.node.skewY=7;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_2p_10");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 12:{
                this.node.x=278;
                this.node.y=-72;

                this.bmp_cardback.node.width=73;
                this.bmp_cardback.node.height=55;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=2;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.48;
                this.bmp_cardcolor.node.scaleY=0.6;
                this.bmp_cardcolor.node.skewY=7;

                this.bmp_cardHide.node.x=2.1;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.46;
                this.bmp_cardHide.node.scaleY=0.53;
                this.bmp_cardHide.node.skewY=7;

                this.bmp_greenbg.node.x=2.1;
                this.bmp_greenbg.node.y=10.3;
                this.bmp_greenbg.node.scaleX=0.46;
                this.bmp_greenbg.node.scaleY=0.53;
                this.bmp_greenbg.node.skewY=7;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_2p_09");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 13:{
                this.node.x=272.3;
                this.node.y=-39.8;

                this.bmp_cardback.node.width=71;
                this.bmp_cardback.node.height=53;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=2;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.46;
                this.bmp_cardcolor.node.scaleY=0.58;
                this.bmp_cardcolor.node.skewY=7;

                this.bmp_cardHide.node.x=1.8;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.44;
                this.bmp_cardHide.node.scaleY=0.52;
                this.bmp_cardHide.node.skewY=7;

                this.bmp_greenbg.node.x=1.8;
                this.bmp_greenbg.node.y=10.3;
                this.bmp_greenbg.node.scaleX=0.44;
                this.bmp_greenbg.node.scaleY=0.52;
                this.bmp_greenbg.node.skewY=7;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_2p_08");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 14:{
                this.node.x=267;
                this.node.y=-8.6;

                this.bmp_cardback.node.width=70;
                this.bmp_cardback.node.height=53;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.46;
                this.bmp_cardcolor.node.scaleY=0.58;
                this.bmp_cardcolor.node.skewY=9;

                this.bmp_cardHide.node.x=0.8;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.44;
                this.bmp_cardHide.node.scaleY=0.52;
                this.bmp_cardHide.node.skewY=8;

                this.bmp_greenbg.node.x=0.8;
                this.bmp_greenbg.node.y=10.3;
                this.bmp_greenbg.node.scaleX=0.44;
                this.bmp_greenbg.node.scaleY=0.52;
                this.bmp_greenbg.node.skewY=8;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_2p_07");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 15:{
                this.node.x=260.4;
                this.node.y=22.7;

                this.bmp_cardback.node.width=69;
                this.bmp_cardback.node.height=55;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.46;
                this.bmp_cardcolor.node.scaleY=0.58;
                this.bmp_cardcolor.node.skewY=9;

                this.bmp_cardHide.node.x=0.8;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.44;
                this.bmp_cardHide.node.scaleY=0.52;
                this.bmp_cardHide.node.skewY=8;

                this.bmp_greenbg.node.x=0.8;
                this.bmp_greenbg.node.y=10.3;
                this.bmp_greenbg.node.scaleX=0.44;
                this.bmp_greenbg.node.scaleY=0.52;
                this.bmp_greenbg.node.skewY=8;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_2p_06");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

            case 16:{
                this.node.x=254.9;
                this.node.y=54.1;

                this.bmp_cardback.node.width=67;
                this.bmp_cardback.node.height=52;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1.7;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.41;
                this.bmp_cardcolor.node.scaleY=0.56;
                this.bmp_cardcolor.node.skewY=7;

                this.bmp_cardHide.node.x=1.7;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.43;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=8;

                this.bmp_greenbg.node.x=1.7;
                this.bmp_greenbg.node.y=10.3;
                this.bmp_greenbg.node.scaleX=0.43;
                this.bmp_greenbg.node.scaleY=0.5;
                this.bmp_greenbg.node.skewY=8;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_2p_05");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 17:{
                this.node.x=249.6;
                this.node.y=85;

                this.bmp_cardback.node.width=66;
                this.bmp_cardback.node.height=50;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1.7;
                this.bmp_cardcolor.node.y=9.6;
                this.bmp_cardcolor.node.scaleX=0.41;
                this.bmp_cardcolor.node.scaleY=0.54;
                this.bmp_cardcolor.node.skewY=7;

                this.bmp_cardHide.node.x=1.5;
                this.bmp_cardHide.node.y=9.2;
                this.bmp_cardHide.node.scaleX=0.42;
                this.bmp_cardHide.node.scaleY=0.49;
                this.bmp_cardHide.node.skewY=8;

                this.bmp_greenbg.node.x=1.5;
                this.bmp_greenbg.node.y=9.2;
                this.bmp_greenbg.node.scaleX=0.42;
                this.bmp_greenbg.node.scaleY=0.49;
                this.bmp_greenbg.node.skewY=8;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_2p_04");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 18:{
                this.node.x=244.1;
                this.node.y=114.2;

                this.bmp_cardback.node.width=65;
                this.bmp_cardback.node.height=48;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1.3;
                this.bmp_cardcolor.node.y=9.4;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.535;
                this.bmp_cardcolor.node.skewY=7;

                this.bmp_cardHide.node.x=1.5;
                this.bmp_cardHide.node.y=9.2;
                this.bmp_cardHide.node.scaleX=0.42;
                this.bmp_cardHide.node.scaleY=0.49;
                this.bmp_cardHide.node.skewY=8;

                this.bmp_greenbg.node.x=1.5;
                this.bmp_greenbg.node.y=9.2;
                this.bmp_greenbg.node.scaleX=0.42;
                this.bmp_greenbg.node.scaleY=0.49;
                this.bmp_greenbg.node.skewY=8;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_2p_03");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 19:{
                this.node.x=239.3;
                this.node.y=142.3;

                this.bmp_cardback.node.width=63;
                this.bmp_cardback.node.height=48;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=0.6;
                this.bmp_cardcolor.node.y=9.4;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.53;
                this.bmp_cardcolor.node.skewY=7;

                this.bmp_cardHide.node.x=1.1;
                this.bmp_cardHide.node.y=9.2;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.47;
                this.bmp_cardHide.node.skewY=8;

                this.bmp_greenbg.node.x=1.1;
                this.bmp_greenbg.node.y=9.2;
                this.bmp_greenbg.node.scaleX=0.4;
                this.bmp_greenbg.node.scaleY=0.47;
                this.bmp_greenbg.node.skewY=8;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_2p_02");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 20:{
                this.node.x=238.5;
                this.node.y=171.5;

                this.bmp_cardback.node.width=62;
                this.bmp_cardback.node.height=47;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=8.5;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.51;
                this.bmp_cardcolor.node.skewY=7;

                this.bmp_cardHide.node.x=1.1;
                this.bmp_cardHide.node.y=8.3;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.465;
                this.bmp_cardHide.node.skewY=8;

                this.bmp_greenbg.node.x=1.1;
                this.bmp_greenbg.node.y=8.3;
                this.bmp_greenbg.node.scaleX=0.4;
                this.bmp_greenbg.node.scaleY=0.465;
                this.bmp_greenbg.node.skewY=8;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_2p_01");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }


            case 21:{
                this.node.x=350.7;
                this.node.y=-106.5;

                this.bmp_cardback.node.width=75;
                this.bmp_cardback.node.height=56;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=2;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.48;
                this.bmp_cardcolor.node.scaleY=0.6;
                this.bmp_cardcolor.node.skewY=11;

                this.bmp_cardHide.node.x=2.1;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.55;
                this.bmp_cardHide.node.skewY=8;

                this.bmp_greenbg.node.x=2.1;
                this.bmp_greenbg.node.y=10.3;
                this.bmp_greenbg.node.scaleX=0.48;
                this.bmp_greenbg.node.scaleY=0.55;
                this.bmp_greenbg.node.skewY=8;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_1p_10");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 22:{
                this.node.x=342.7;
                this.node.y=-72;

                this.bmp_cardback.node.width=74;
                this.bmp_cardback.node.height=55;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=2;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.48;
                this.bmp_cardcolor.node.scaleY=0.6;
                this.bmp_cardcolor.node.skewY=11;

                this.bmp_cardHide.node.x=2.1;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.46;
                this.bmp_cardHide.node.scaleY=0.53;
                this.bmp_cardHide.node.skewY=11;

                this.bmp_greenbg.node.x=2.1;
                this.bmp_greenbg.node.y=10.3;
                this.bmp_greenbg.node.scaleX=0.46;
                this.bmp_greenbg.node.scaleY=0.53;
                this.bmp_greenbg.node.skewY=11;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_1p_09");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 23:{
                this.node.x=335.7;
                this.node.y=-39.8;

                this.bmp_cardback.node.width=71;
                this.bmp_cardback.node.height=53;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1.6;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.445;
                this.bmp_cardcolor.node.scaleY=0.58;
                this.bmp_cardcolor.node.skewY=10;

                this.bmp_cardHide.node.x=1.4;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.43;
                this.bmp_cardHide.node.scaleY=0.52;
                this.bmp_cardHide.node.skewY=10;

                this.bmp_greenbg.node.x=1.4;
                this.bmp_greenbg.node.y=10.3;
                this.bmp_greenbg.node.scaleX=0.43;
                this.bmp_greenbg.node.scaleY=0.52;
                this.bmp_greenbg.node.skewY=10;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_1p_08");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 24:{
                this.node.x=329.4;
                this.node.y=-8.6;

                this.bmp_cardback.node.width=70;
                this.bmp_cardback.node.height=53;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=10.3;
                this.bmp_cardcolor.node.scaleX=0.45;
                this.bmp_cardcolor.node.scaleY=0.58;
                this.bmp_cardcolor.node.skewY=11;

                this.bmp_cardHide.node.x=0.8;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.44;
                this.bmp_cardHide.node.scaleY=0.52;
                this.bmp_cardHide.node.skewY=11;

                this.bmp_greenbg.node.x=0.8;
                this.bmp_greenbg.node.y=10.3;
                this.bmp_greenbg.node.scaleX=0.44;
                this.bmp_greenbg.node.scaleY=0.52;
                this.bmp_greenbg.node.skewY=11;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_1p_07");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 25:{
                this.node.x=322.2;
                this.node.y=22.7;

                this.bmp_cardback.node.width=69;
                this.bmp_cardback.node.height=55;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=10.9;
                this.bmp_cardcolor.node.scaleX=0.45;
                this.bmp_cardcolor.node.scaleY=0.57;
                this.bmp_cardcolor.node.skewY=9;

                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=11;
                this.bmp_cardHide.node.scaleX=0.44;
                this.bmp_cardHide.node.scaleY=0.51;
                this.bmp_cardHide.node.skewY=11;

                this.bmp_greenbg.node.x=1;
                this.bmp_greenbg.node.y=11;
                this.bmp_greenbg.node.scaleX=0.44;
                this.bmp_greenbg.node.scaleY=0.51;
                this.bmp_greenbg.node.skewY=11;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_1p_06");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

            case 26:{
                this.node.x=315.1;
                this.node.y=54.1;

                this.bmp_cardback.node.width=68;
                this.bmp_cardback.node.height=52;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1.3;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.41;
                this.bmp_cardcolor.node.scaleY=0.55;
                this.bmp_cardcolor.node.skewY=9;

                this.bmp_cardHide.node.x=1.3;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.41;
                this.bmp_cardHide.node.scaleY=0.49;
                this.bmp_cardHide.node.skewY=11;

                this.bmp_greenbg.node.x=1.3;
                this.bmp_greenbg.node.y=10.3;
                this.bmp_greenbg.node.scaleX=0.41;
                this.bmp_greenbg.node.scaleY=0.49;
                this.bmp_greenbg.node.skewY=11;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_1p_05");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 27:{
                this.node.x=308.3;
                this.node.y=85;

                this.bmp_cardback.node.width=66;
                this.bmp_cardback.node.height=50;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1.7;
                this.bmp_cardcolor.node.y=9.6;
                this.bmp_cardcolor.node.scaleX=0.41;
                this.bmp_cardcolor.node.scaleY=0.54;
                this.bmp_cardcolor.node.skewY=10;

                this.bmp_cardHide.node.x=1.5;
                this.bmp_cardHide.node.y=9.2;
                this.bmp_cardHide.node.scaleX=0.42;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewY=10;

                this.bmp_greenbg.node.x=1.5;
                this.bmp_greenbg.node.y=9.2;
                this.bmp_greenbg.node.scaleX=0.42;
                this.bmp_greenbg.node.scaleY=0.48;
                this.bmp_greenbg.node.skewY=10;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_1p_04");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 28:{
                this.node.x=302.3;
                this.node.y=114.2;

                this.bmp_cardback.node.width=65;
                this.bmp_cardback.node.height=48;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1.3;
                this.bmp_cardcolor.node.y=9.4;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.535;
                this.bmp_cardcolor.node.skewY=10;

                this.bmp_cardHide.node.x=1.5;
                this.bmp_cardHide.node.y=9.2;
                this.bmp_cardHide.node.scaleX=0.39;
                this.bmp_cardHide.node.scaleY=0.47;
                this.bmp_cardHide.node.skewY=10;

                this.bmp_greenbg.node.x=1.5;
                this.bmp_greenbg.node.y=9.2;
                this.bmp_greenbg.node.scaleX=0.39;
                this.bmp_greenbg.node.scaleY=0.47;
                this.bmp_greenbg.node.skewY=10;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_1p_03");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 29:{
                this.node.x=296.2;
                this.node.y=142.3;

                this.bmp_cardback.node.width=64;
                this.bmp_cardback.node.height=48;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=9.4;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.53;
                this.bmp_cardcolor.node.skewY=9;

                this.bmp_cardHide.node.x=1.1;
                this.bmp_cardHide.node.y=9.2;
                this.bmp_cardHide.node.scaleX=0.38;
                this.bmp_cardHide.node.scaleY=0.46;
                this.bmp_cardHide.node.skewY=10;

                this.bmp_greenbg.node.x=1.1;
                this.bmp_greenbg.node.y=9.2;
                this.bmp_greenbg.node.scaleX=0.38;
                this.bmp_greenbg.node.scaleY=0.46;
                this.bmp_greenbg.node.skewY=10;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_1p_02");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 30:{
                this.node.x=290.1;
                this.node.y=171.5;

                this.bmp_cardback.node.width=62;
                this.bmp_cardback.node.height=47;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=8.5;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=9;

                this.bmp_cardHide.node.x=1.1;
                this.bmp_cardHide.node.y=8.3;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.45;
                this.bmp_cardHide.node.skewY=11;

                this.bmp_greenbg.node.x=1.1;
                this.bmp_greenbg.node.y=8.3;
                this.bmp_greenbg.node.scaleX=0.4;
                this.bmp_greenbg.node.scaleY=0.45;
                this.bmp_greenbg.node.skewY=11;

                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_pc_left_1p_01");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

        }
        this.node.x = this.node.x -40 + (this._cardIndex-1)*0.4;
        this.node.y = this.node.y +80;
    }
}
