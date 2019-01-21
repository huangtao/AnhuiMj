import HQMJ_SinglePoolBase from "../HQMJ_SinglePoolBase";
import { HQMJ } from "../../../ConstDef/HQMJMahjongDef";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";
import M_HQMJVideoClass from "../../../M_HQMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HQMJ_DownSinglePool extends HQMJ_SinglePoolBase {

    onLoad() {
        // init logic
        this.init();
    }

    /**
     * 显示牌
     * */
    public showCard(card: number,index:number,_hqmj): void {
        if(card==this._cardValue){
            return;
        }
        super.showCard(card,index,_hqmj);
        
        if(_hqmj.is2D()){
            this.bmp_cardback.node.width=56;
            this.bmp_cardback.node.height=45;
            this.bmp_cardback.node.scaleX=1;

            this.bmp_cardcolor.node.x=0;
            this.bmp_cardcolor.node.y=8;
            this.bmp_cardcolor.node.scaleX=0.45;
            this.bmp_cardcolor.node.scaleY=0.52;
            this.bmp_cardcolor.node.skewY=0;

            this.bmp_cardHide.node.x=0;
            this.bmp_cardHide.node.y=8;
            this.bmp_cardHide.node.scaleX=0.45;
            this.bmp_cardHide.node.scaleY=0.45;
            this.bmp_cardHide.node.skewY=0;
            this.bmp_cardback.spriteFrame=_hqmj.getMahjongPaiBeiRes("zuoyoupg@2x");
            this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(card);
        }else{
            this.show3DCard(_hqmj);
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

    private show3DCard(_hqmj):void{
        switch(this._cardIndex){
            case 1:{
                this.node.x=139;
                this.node.y=-33;
                this.node.setLocalZOrder(29);
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=7;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=4.5;
                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=7;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=4.5;
                this.bmp_cardback.node.width = 64;
                this.bmp_cardback.node.height = 52;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_1");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 2:{
                this.node.x=137;
                this.node.y=-1;
                this.node.setLocalZOrder(28);
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=7;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=3.5;
                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=7;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=3.5;
                this.bmp_cardback.node.width = 62;
                this.bmp_cardback.node.height = 50;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_2");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 3:{
                this.node.x=134;
                this.node.y=31;
                this.node.setLocalZOrder(27);
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=7;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=3.5;
                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=7;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=3.5;
                this.bmp_cardback.node.width = 62;
                this.bmp_cardback.node.height = 50;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_3");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 4:{
                this.node.x=132;
                this.node.y=61;
                this.node.setLocalZOrder(26);
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=7;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=4.5;
                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=7;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=4.5;
                this.bmp_cardback.node.width = 60;
                this.bmp_cardback.node.height = 48;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_4");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 5:{
                this.node.x=130;
                this.node.y=91;
                this.node.setLocalZOrder(25);
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=7;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=4.5;
                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=7;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=4.5;
                this.bmp_cardback.node.width = 58;
                this.bmp_cardback.node.height = 48;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_5");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 6:{
                this.node.x=128;
                this.node.y=119;
                this.node.setLocalZOrder(24);
                this.bmp_cardback.node.height=52;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=7;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=3.5;
                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=7;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=3.5;
                this.bmp_cardback.node.width = 58;
                this.bmp_cardback.node.height = 48;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_6");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 7:{
                this.node.x=125;
                this.node.y=148;
                this.node.setLocalZOrder(23);
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=7;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=7;
                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=7;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=7;
                this.bmp_cardback.node.width = 58;
                this.bmp_cardback.node.height = 46;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_19");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 8:{
                this.node.x=124;
                this.node.y=177;
                this.node.setLocalZOrder(22);
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=7;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=7;
                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=7;
                this.bmp_cardHide.node.scaleX=0.;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=7;
                this.bmp_cardback.node.width = 56;
                this.bmp_cardback.node.height = 46;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_22");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 9:{
                this.node.x=121;
                this.node.y=206;
                this.node.setLocalZOrder(21);
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=7;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=7;
                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=7;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=7;
                this.bmp_cardback.node.width = 56;
                this.bmp_cardback.node.height = 44;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_25");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

            //第二行
            case 10:{
                this.node.x=196;
                this.node.y=-34;
                this.node.setLocalZOrder(19);
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=8.5;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=7;
                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=8.5;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=7;
                this.bmp_cardback.node.width = 64;
                this.bmp_cardback.node.height = 52;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_7");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 11:{
                this.node.x=192;
                this.node.y=-1;
                this.node.setLocalZOrder(18);
                this.bmp_cardcolor.node.x=2;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=7;

                this.bmp_cardHide.node.x=2;
                this.bmp_cardHide.node.y=10.5;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=7;
                this.bmp_cardback.node.width = 64;
                this.bmp_cardback.node.height = 50;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_8");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 12:{
                this.node.x=189;
                this.node.y=31;
                this.node.setLocalZOrder(17);
                this.bmp_cardcolor.node.x=2;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=7;

                this.bmp_cardHide.node.x=2;
                this.bmp_cardHide.node.y=10.5;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=7;
                this.bmp_cardback.node.width = 62;
                this.bmp_cardback.node.height = 50;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_9");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 13:{
                this.node.x=187;
                this.node.y=61;
                this.node.setLocalZOrder(16);
                this.bmp_cardcolor.node.x=2;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=7;

                this.bmp_cardHide.node.x=2;
                this.bmp_cardHide.node.y=10.5;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=7;
                this.bmp_cardback.node.width = 62;
                this.bmp_cardback.node.height = 48;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_10");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 14:{
                this.node.x=184;
                this.node.y=92;
                this.node.setLocalZOrder(15);
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=8;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=9;

                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=8;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=9;
                this.bmp_cardback.node.width = 60;
                this.bmp_cardback.node.height = 48;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_11");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 15:{
                this.node.x=181;
                this.node.y=120;
                this.node.setLocalZOrder(14);
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=9;

                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=10.5;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=9;
                this.bmp_cardback.node.width = 58;
                this.bmp_cardback.node.height = 48;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_12");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 16:{
                this.node.x=178;
                this.node.y=149;
                this.node.setLocalZOrder(13);
                this.bmp_cardcolor.node.x=1.7;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=7;
                this.bmp_cardHide.node.x=1.7;
                this.bmp_cardHide.node.y=10.5;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=7;
                this.bmp_cardback.node.width = 58;
                this.bmp_cardback.node.height = 46;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_20");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 17:{
                this.node.x=175;
                this.node.y=178;
                this.node.setLocalZOrder(12);
                this.bmp_cardcolor.node.x=1.7;
                this.bmp_cardcolor.node.y=9.6;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=7;
                this.bmp_cardHide.node.x=1.7;
                this.bmp_cardHide.node.y=9.6;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=7;
                this.bmp_cardback.node.width = 58;
                this.bmp_cardback.node.height = 46;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_23");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 18:{
                this.node.x=173;
                this.node.y=206;
                this.node.setLocalZOrder(11);
                this.bmp_cardcolor.node.x=1.3;
                this.bmp_cardcolor.node.y=9.4;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=7;
                this.bmp_cardHide.node.x=1.3;
                this.bmp_cardHide.node.y=9.4;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=7;
                this.bmp_cardback.node.width = 56;
                this.bmp_cardback.node.height = 44;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_26");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            //第三行
            case 19:{
                this.node.x=253;
                this.node.y=-35;
                this.node.setLocalZOrder(9);
                this.bmp_cardcolor.node.x=0.6;
                this.bmp_cardcolor.node.y=9.4;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=7;
                this.bmp_cardHide.node.x=0.6;
                this.bmp_cardHide.node.y=9.4;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=7;
                this.bmp_cardback.node.width = 66;
                this.bmp_cardback.node.height = 52;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_13");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 20:{
                this.node.x=248;
                this.node.y=-3;
                this.node.setLocalZOrder(8);
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=8.5;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=7;
                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=8.5;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=7;
                this.bmp_cardback.node.width = 66;
                this.bmp_cardback.node.height = 50;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_14");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 21:{
                this.node.x=244;
                this.node.y=29;
                this.node.setLocalZOrder(7);
                this.bmp_cardcolor.node.x=2;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=11;
                this.bmp_cardHide.node.x=2;
                this.bmp_cardHide.node.y=10.5;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=11;
                this.bmp_cardback.node.width = 64;
                this.bmp_cardback.node.height = 50;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_15");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 22:{
                this.node.x=241;
                this.node.y=59;
                this.node.setLocalZOrder(6);
                this.bmp_cardcolor.node.x=2;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=11;

                this.bmp_cardHide.node.x=2;
                this.bmp_cardHide.node.y=10.5;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=11;
                this.bmp_cardback.node.width = 62;
                this.bmp_cardback.node.height = 48;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_16");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 23:{
                this.node.x=129;
                this.node.y=97;

                // this.bmp_cardback.node.width=71;
                // this.bmp_cardback.node.height=53;
                // this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1.6;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=10;

                this.bmp_cardHide.node.x=1.6;
                this.bmp_cardHide.node.y=10.5;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=10;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_17");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 24:{
                this.node.x=125;
                this.node.y=130;

                // this.bmp_cardback.node.width=70;
                // this.bmp_cardback.node.height=53;
                // this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=10.3;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=11;

                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.4;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewY=11;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_18");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 25:{
                this.node.x=121;
                this.node.y=161;

                // this.bmp_cardback.node.width=69;
                // this.bmp_cardback.node.height=55;
                // this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=10.9;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=9;

                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=11;
                this.bmp_cardHide.node.scaleX=0.44;
                this.bmp_cardHide.node.scaleY=0.51;
                this.bmp_cardHide.node.skewY=11;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_21");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

            case 26:{
                this.node.x=120;
                this.node.y=190;

                // this.bmp_cardback.node.width=68;
                // this.bmp_cardback.node.height=52;
                // this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1.3;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=9;

                this.bmp_cardHide.node.x=1.3;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.41;
                this.bmp_cardHide.node.scaleY=0.49;
                this.bmp_cardHide.node.skewY=11;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_24");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 27:{
                this.node.x=116;
                this.node.y=218.2;

                // this.bmp_cardback.node.width=66;
                // this.bmp_cardback.node.height=50;
                // this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=1.7;
                this.bmp_cardcolor.node.y=9.6;
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=10;

                this.bmp_cardHide.node.x=1.5;
                this.bmp_cardHide.node.y=9.2;
                this.bmp_cardHide.node.scaleX=0.42;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewY=10;
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("field_right_27");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 28:{
                this.node.x=402.3;
                this.node.y=113.2;

                // this.bmp_cardback.node.width=65;
                // this.bmp_cardback.node.height=48;
                // this.bmp_cardback.node.scaleX=-1;

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
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("d_pc_left_1p_03");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 29:{
                this.node.x=396.2;
                this.node.y=141.3;

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
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("d_pc_left_1p_02");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 30:{
                this.node.x=390.1;
                this.node.y=170.5;

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
                this.bmp_cardback.spriteFrame=_hqmj.getMahjong3DPaiBeiRes("d_pc_left_1p_01");
                this.bmp_cardcolor.spriteFrame=_hqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

        }
    }
}
