import TDHMJ_SinglePoolBase from "../TDHMJ_SinglePoolBase";
import { TDHMJ } from "../../../ConstDef/TDHMJMahjongDef";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";
import M_TDHMJVideoClass from "../../../M_TDHMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TDHMJ_UpSinglePool extends TDHMJ_SinglePoolBase {

    onLoad() {
        // init logic
        
    }

    /**
     * 显示牌
     * */
    public showCard(card: number,index:number,_lqmj): void {
        if(card==this._cardValue){
            return;
        }
        super.showCard(card,index,_lqmj);

        if(_lqmj.is2D()){
            this.bmp_cardback.node.width=56;
            this.bmp_cardback.node.height=45;
            this.bmp_cardback.node.scaleX=1;

            this.bmp_cardcolor.node.x=0;
            this.bmp_cardcolor.node.y=8;
            this.bmp_cardcolor.node.scaleX=0.4;
            this.bmp_cardcolor.node.scaleY=0.55;
            this.bmp_cardcolor.node.skewY=0;

            this.bmp_cardHide.node.x=0;
            this.bmp_cardHide.node.y=8;
            this.bmp_cardHide.node.scaleX=0.4;
            this.bmp_cardHide.node.scaleY=0.45;
            this.bmp_cardHide.node.skewY=0;
            this.bmp_cardback.spriteFrame=_lqmj.getMahjongPaiBeiRes("zuoyoupg@2x");
            this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(card);
        }else{
            this.show3DCard(_lqmj);
        }
        this.bmp_cardback.node.active=true;
        this.bmp_cardcolor.node.active=true;
        // this._bmp_cardcolor.x = 51;
        // this._bmp_cardcolor.y = 0;
        // this._bmp_cardcolor.scaleX = 0.5;
        // this._bmp_cardcolor.scaleY = 0.5;
        // this._bmp_cardcolor.rotation = 90;
    }
    
    /**
     * 尺寸
     * */
    public get size(): { width: number,height: number } {
        return { width: 52,height: 45 };
    }

    private show3DCard(_lqmj): void {
        switch (this._cardIndex) {
            case 9:{
                this.node.x=-167.5;
                this.node.y=-164;
                this.node.setLocalZOrder(29);
                this.bmp_cardcolor.node.x=-2;
                this.bmp_cardcolor.node.y=7;
                this.bmp_cardcolor.node.scaleX=0.26;
                this.bmp_cardcolor.node.scaleY=0.36;
                this.bmp_cardcolor.node.skewY=-7;
                this.bmp_cardHide.node.x=-2;
                this.bmp_cardHide.node.y=7;
                this.bmp_cardHide.node.scaleX=0.26;
                this.bmp_cardHide.node.scaleY=0.36;
                this.bmp_cardHide.node.skewY=-7;
                this.bmp_cardback.node.width = 68;
                this.bmp_cardback.node.height = 54;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_25");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 8:{
                this.node.x=-164.5;
                this.node.y=-127;
                this.node.setLocalZOrder(28);
                this.bmp_cardcolor.node.x=-2;
                this.bmp_cardcolor.node.y=7;
                this.bmp_cardcolor.node.scaleX=0.25;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewY=-7;
                this.bmp_cardHide.node.x=-2;
                this.bmp_cardHide.node.y=7;
                this.bmp_cardHide.node.scaleX=0.25;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewY=-7;
                this.bmp_cardback.node.width = 68;
                this.bmp_cardback.node.height = 52;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_22");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 7:{
                this.node.x=-161.5;
                this.node.y=-92;
                this.node.setLocalZOrder(27);
                this.bmp_cardcolor.node.x=-1;
                this.bmp_cardcolor.node.y=7;
                this.bmp_cardcolor.node.scaleX=0.25;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewY=-9;
                this.bmp_cardHide.node.x=-1;
                this.bmp_cardHide.node.y=7;
                this.bmp_cardHide.node.scaleX=0.25;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewY=-9;
                this.bmp_cardback.node.width = 66;
                this.bmp_cardback.node.height = 52;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_19");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 6:{
                this.node.x=-159;
                this.node.y=-58;
                this.node.setLocalZOrder(26);
                this.bmp_cardcolor.node.x=-1;
                this.bmp_cardcolor.node.y=7;
                this.bmp_cardcolor.node.scaleX=0.24;
                this.bmp_cardcolor.node.scaleY=0.34;
                this.bmp_cardcolor.node.skewY=-9;
                this.bmp_cardHide.node.x=-1;
                this.bmp_cardHide.node.y=7;
                this.bmp_cardHide.node.scaleX=0.24;
                this.bmp_cardHide.node.scaleY=0.34;
                this.bmp_cardHide.node.skewY=-9;
                this.bmp_cardback.node.width = 66;
                this.bmp_cardback.node.height = 52;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_6");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 5:{
                this.node.x=-156;
                this.node.y=-25;
                this.node.setLocalZOrder(25);
                this.bmp_cardcolor.node.x=-1.7;
                this.bmp_cardcolor.node.y=7;
                this.bmp_cardcolor.node.scaleX=0.24;
                this.bmp_cardcolor.node.scaleY=0.34;
                this.bmp_cardcolor.node.skewY=-7;
                this.bmp_cardHide.node.x=-1.7;
                this.bmp_cardHide.node.y=7;
                this.bmp_cardHide.node.scaleX=0.24;
                this.bmp_cardHide.node.scaleY=0.34;
                this.bmp_cardHide.node.skewY=-7;
                this.bmp_cardback.node.width = 64;
                this.bmp_cardback.node.height = 50;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_5");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 4:{
                this.node.x=-153;
                this.node.y=7;
                this.node.setLocalZOrder(24);
                this.bmp_cardcolor.node.x=-1.7;
                this.bmp_cardcolor.node.y=7;
                this.bmp_cardcolor.node.scaleX=0.23;
                this.bmp_cardcolor.node.scaleY=0.33;
                this.bmp_cardcolor.node.skewY=-7;
                this.bmp_cardHide.node.x=-1.7;
                this.bmp_cardHide.node.y=7;
                this.bmp_cardHide.node.scaleX=0.23;
                this.bmp_cardHide.node.scaleY=0.33;
                this.bmp_cardHide.node.skewY=-7;
                this.bmp_cardback.node.width = 62;
                this.bmp_cardback.node.height = 50;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_4");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 3:{
                this.node.x=-150.5;
                this.node.y=40;
                this.node.setLocalZOrder(23);
                this.bmp_cardcolor.node.x=-1.3;
                this.bmp_cardcolor.node.y=7;
                this.bmp_cardcolor.node.scaleX=0.23;
                this.bmp_cardcolor.node.scaleY=0.33;
                this.bmp_cardcolor.node.skewY=-7;
                this.bmp_cardHide.node.x=-1.3;
                this.bmp_cardHide.node.y=7;
                this.bmp_cardHide.node.scaleX=0.23;
                this.bmp_cardHide.node.scaleY=0.33;
                this.bmp_cardHide.node.skewY=-7;
                this.bmp_cardback.node.width = 62;
                this.bmp_cardback.node.height = 48;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_3");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 2:{
                this.node.x=-148;
                this.node.y=72;
                this.node.setLocalZOrder(22);
                this.bmp_cardcolor.node.x=-0.6;
                this.bmp_cardcolor.node.y=7;
                this.bmp_cardcolor.node.scaleX=0.22;
                this.bmp_cardcolor.node.scaleY=0.32;
                this.bmp_cardcolor.node.skewY=-5;
                this.bmp_cardHide.node.x=-0.6;
                this.bmp_cardHide.node.y=7;
                this.bmp_cardHide.node.scaleX=0.22;
                this.bmp_cardHide.node.scaleY=0.32;
                this.bmp_cardHide.node.skewY=-5;
                this.bmp_cardback.node.width = 60;
                this.bmp_cardback.node.height = 48;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_2");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 1:{
                this.node.x=-145.5;
                this.node.y=101;
                this.node.setLocalZOrder(21);
                this.bmp_cardcolor.node.x=-1;
                this.bmp_cardcolor.node.y=8.5;
                this.bmp_cardcolor.node.scaleX=0.22;
                this.bmp_cardcolor.node.scaleY=0.32;
                this.bmp_cardcolor.node.skewY=-5;
                this.bmp_cardHide.node.x=-1;
                this.bmp_cardHide.node.y=8.5;
                this.bmp_cardHide.node.scaleX=0.22;
                this.bmp_cardHide.node.scaleY=0.32;
                this.bmp_cardHide.node.skewY=-5;
                this.bmp_cardback.node.width = 60;
                this.bmp_cardback.node.height = 46;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_1");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            } 
            //第二行
            case 18:{
                this.node.x=-227.5;
                this.node.y=-165;
                this.node.setLocalZOrder(19);
                this.bmp_cardcolor.node.x=-2;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.26;
                this.bmp_cardcolor.node.scaleY=0.36;
                this.bmp_cardcolor.node.skewY=-7;
                this.bmp_cardHide.node.x=-2;
                this.bmp_cardHide.node.y=10.5;
                this.bmp_cardHide.node.scaleX=0.26;
                this.bmp_cardHide.node.scaleY=0.36;
                this.bmp_cardHide.node.skewY=-7;
                this.bmp_cardback.node.width = 70;
                this.bmp_cardback.node.height = 54;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_26");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 17:{
                this.node.x=-223.5;
                this.node.y=-127;
                this.node.setLocalZOrder(18);
                this.bmp_cardcolor.node.x=-1;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.25;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewY=-9;
                this.bmp_cardHide.node.x=-1;
                this.bmp_cardHide.node.y=10.5;
                this.bmp_cardHide.node.scaleX=0.25;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewY=-9;
                this.bmp_cardback.node.width = 68;
                this.bmp_cardback.node.height = 52;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_23");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 16:{
                this.node.x=-219.5;
                this.node.y=-92;
                this.node.setLocalZOrder(17);
                this.bmp_cardcolor.node.x=-1;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.25;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewY=-9;
                this.bmp_cardHide.node.x=-1;
                this.bmp_cardHide.node.y=10.5;
                this.bmp_cardHide.node.scaleX=0.25;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewY=-9;
                this.bmp_cardback.node.width = 68;
                this.bmp_cardback.node.height = 52;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_20");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 15:{
                this.node.x=-215;
                this.node.y=-58;
                this.node.setLocalZOrder(16);
                this.bmp_cardcolor.node.x=-1.7;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.24;
                this.bmp_cardcolor.node.scaleY=0.34;
                this.bmp_cardcolor.node.skewY=-7;
                this.bmp_cardHide.node.x=-1.7;
                this.bmp_cardHide.node.y=10.5;
                this.bmp_cardHide.node.scaleX=0.24;
                this.bmp_cardHide.node.scaleY=0.34;
                this.bmp_cardHide.node.skewY=-7;
                this.bmp_cardback.node.width = 66;
                this.bmp_cardback.node.height = 52;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_12");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 14:{
                this.node.x=-211;
                this.node.y=-25;
                this.node.setLocalZOrder(15);
                this.bmp_cardcolor.node.x=-1.7;
                this.bmp_cardcolor.node.y=9.6;
                this.bmp_cardcolor.node.scaleX=0.24;
                this.bmp_cardcolor.node.scaleY=0.34;
                this.bmp_cardcolor.node.skewY=-7;
                this.bmp_cardHide.node.x=-1.7;
                this.bmp_cardHide.node.y=9.6;
                this.bmp_cardHide.node.scaleX=0.24;
                this.bmp_cardHide.node.scaleY=0.34;
                this.bmp_cardHide.node.skewY=-7;
                this.bmp_cardback.node.width = 66;
                this.bmp_cardback.node.height = 50;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_11");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 13:{
                this.node.x=-208;
                this.node.y=7;
                this.node.setLocalZOrder(14);
                this.bmp_cardcolor.node.x=-1.3;
                this.bmp_cardcolor.node.y=9.4;
                this.bmp_cardcolor.node.scaleX=0.23;
                this.bmp_cardcolor.node.scaleY=0.33;
                this.bmp_cardcolor.node.skewY=-7;
                this.bmp_cardHide.node.x=-1.3;
                this.bmp_cardHide.node.y=9.4;
                this.bmp_cardHide.node.scaleX=0.23;
                this.bmp_cardHide.node.scaleY=0.33;
                this.bmp_cardHide.node.skewY=-7;
                this.bmp_cardback.node.width = 64;
                this.bmp_cardback.node.height = 50;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_10");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 12:{
                this.node.x=-204;
                this.node.y=40;
                this.node.setLocalZOrder(13);
                this.bmp_cardcolor.node.x=-0.6;
                this.bmp_cardcolor.node.y=9.4;
                this.bmp_cardcolor.node.scaleX=0.23;
                this.bmp_cardcolor.node.scaleY=0.33;
                this.bmp_cardcolor.node.skewY=-7;
                this.bmp_cardHide.node.x=-0.6;
                this.bmp_cardHide.node.y=9.4;
                this.bmp_cardHide.node.scaleX=0.23;
                this.bmp_cardHide.node.scaleY=0.33;
                this.bmp_cardHide.node.skewY=-7;
                this.bmp_cardback.node.width = 62;
                this.bmp_cardback.node.height = 48;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_9");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 11:{
                this.node.x=-201;
                this.node.y=71;
                this.node.setLocalZOrder(12);
                this.bmp_cardcolor.node.x=-1;
                this.bmp_cardcolor.node.y=8.5;
                this.bmp_cardcolor.node.scaleX=0.22;
                this.bmp_cardcolor.node.scaleY=0.32;
                this.bmp_cardcolor.node.skewY=-7;
                this.bmp_cardHide.node.x=-1;
                this.bmp_cardHide.node.y=8.5;
                this.bmp_cardHide.node.scaleX=0.22;
                this.bmp_cardHide.node.scaleY=0.32;
                this.bmp_cardHide.node.skewY=-7;
                this.bmp_cardback.node.width = 62;
                this.bmp_cardback.node.height = 48;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_8");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 10:{
                this.node.x=-198;
                this.node.y=101;
                this.node.setLocalZOrder(11);
                this.bmp_cardcolor.node.x=-2;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.22;
                this.bmp_cardcolor.node.scaleY=0.32;
                this.bmp_cardcolor.node.skewY=-11;
                this.bmp_cardHide.node.x=-2;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.22;
                this.bmp_cardHide.node.scaleY=0.32;
                this.bmp_cardHide.node.skewY=-11;
                this.bmp_cardback.node.width = 60;
                this.bmp_cardback.node.height = 46;
                this.bmp_cardback.node.width = 60;
                this.bmp_cardback.node.height = 46;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_7");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            //第三行
            case 30:{
                this.node.x=-253;
                this.node.y=-101;
                this.bmp_cardback.node.width=75;
                this.bmp_cardback.node.height=56;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.node.x=-2;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.22;
                this.bmp_cardcolor.node.scaleY=0.32;
                this.bmp_cardcolor.node.skewY=-11;
                this.bmp_cardHide.node.x=-2.1;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.55;
                this.bmp_cardHide.node.skewY=-8;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_13");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 29:{
                this.node.x=-255;
                this.node.y=-101;
                this.bmp_cardback.node.width=74;
                this.bmp_cardback.node.height=55;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.node.x=-2;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.23;
                this.bmp_cardcolor.node.scaleY=0.33;
                this.bmp_cardcolor.node.skewY=-11;

                this.bmp_cardHide.node.x=-2.1;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.46;
                this.bmp_cardHide.node.scaleY=0.53;
                this.bmp_cardHide.node.skewY=-11;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_14");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 28:{
                this.node.x=-257;
                this.node.y=-71;

                this.bmp_cardback.node.width=71;
                this.bmp_cardback.node.height=53;
                this.bmp_cardback.node.scaleX=1;

                this.bmp_cardcolor.node.x=-1.6;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.23;
                this.bmp_cardcolor.node.scaleY=0.33;
                this.bmp_cardcolor.node.skewY=-10;

                this.bmp_cardHide.node.x=-1.4;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.43;
                this.bmp_cardHide.node.scaleY=0.52;
                this.bmp_cardHide.node.skewY=-10;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_15");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 27:{
                this.node.x=-259;
                this.node.y=-42;

                this.bmp_cardcolor.node.x=-1;
                this.bmp_cardcolor.node.y=10.3;
                this.bmp_cardcolor.node.scaleX=0.24;
                this.bmp_cardcolor.node.scaleY=0.34;
                this.bmp_cardcolor.node.skewY=-11;

                this.bmp_cardHide.node.x=-0.8;
                this.bmp_cardHide.node.y=10.3;
                this.bmp_cardHide.node.scaleX=0.44;
                this.bmp_cardHide.node.scaleY=0.52;
                this.bmp_cardHide.node.skewY=-11;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_16");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 26:{
                this.node.x=-251;
                this.node.y=-136;

                // this.bmp_cardback.node.width=69;
                // this.bmp_cardback.node.height=55;
                // this.bmp_cardback.node.scaleX=1;

                this.bmp_cardcolor.node.x=-1;
                this.bmp_cardcolor.node.y=10.9;
                this.bmp_cardcolor.node.scaleX=0.22;
                this.bmp_cardcolor.node.scaleY=0.32;
                this.bmp_cardcolor.node.skewY=-9;

                this.bmp_cardHide.node.x=-1;
                this.bmp_cardHide.node.y=11;
                this.bmp_cardHide.node.scaleX=0.44;
                this.bmp_cardHide.node.scaleY=0.51;
                this.bmp_cardHide.node.skewY=-11;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_24");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

            case 25:{
                this.node.x=-247;
                this.node.y=-98;
                this.bmp_cardcolor.node.x=-1.3;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.23;
                this.bmp_cardcolor.node.scaleY=0.33;
                this.bmp_cardcolor.node.skewY=-9;

                this.bmp_cardHide.node.x=-1.3;
                this.bmp_cardHide.node.y=10.5;
                this.bmp_cardHide.node.scaleX=0.23;
                this.bmp_cardHide.node.scaleY=0.33;
                this.bmp_cardHide.node.skewY=-9;
                this.bmp_cardback.node.width = 66;
                this.bmp_cardback.node.height = 50;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_16");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 24:{
                this.node.x=-242;
                this.node.y=-64;
                this.bmp_cardcolor.node.x=-1.7;
                this.bmp_cardcolor.node.y=9.6;
                this.bmp_cardcolor.node.scaleX=0.23;
                this.bmp_cardcolor.node.scaleY=0.33;
                this.bmp_cardcolor.node.skewY=-10;
                this.bmp_cardHide.node.x=-1.7;
                this.bmp_cardHide.node.y=9.6;
                this.bmp_cardHide.node.scaleX=0.23;
                this.bmp_cardHide.node.scaleY=0.33;
                this.bmp_cardHide.node.skewY=-10;
                this.bmp_cardback.node.width = 64;
                this.bmp_cardback.node.height = 48;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_15");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 23:{
                this.node.x=-237;
                this.node.y=-29;
                this.bmp_cardcolor.node.x=-1.3;
                this.bmp_cardcolor.node.y=9.4;
                this.bmp_cardcolor.node.scaleX=0.22;
                this.bmp_cardcolor.node.scaleY=0.32;
                this.bmp_cardcolor.node.skewY=-10;

                this.bmp_cardHide.node.x=-1.3;
                this.bmp_cardHide.node.y=9.4;
                this.bmp_cardHide.node.scaleX=0.22;
                this.bmp_cardHide.node.scaleY=0.32;
                this.bmp_cardHide.node.skewY=-10;
                this.bmp_cardback.node.width = 64;
                this.bmp_cardback.node.height = 48;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_14");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 22:{
                this.node.x=-262;
                this.node.y=9;
                this.node.setLocalZOrder(4);
                this.bmp_cardcolor.node.x=-1;
                this.bmp_cardcolor.node.y=9.4;
                this.bmp_cardcolor.node.scaleX=0.23;
                this.bmp_cardcolor.node.scaleY=0.33;
                this.bmp_cardcolor.node.skewY=-9;

                this.bmp_cardHide.node.x=-1;
                this.bmp_cardHide.node.y=9.4;
                this.bmp_cardHide.node.scaleX=0.23;
                this.bmp_cardHide.node.scaleY=0.33;
                this.bmp_cardHide.node.skewY=-9;
                this.bmp_cardback.node.width = 66;
                this.bmp_cardback.node.height = 50;
                this.bmp_cardback.node.width = 62;
                this.bmp_cardback.node.height = 46;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_13");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 21:{
                this.node.x=-258;
                this.node.y=41;
                this.node.setLocalZOrder(3);
                this.bmp_cardcolor.node.x=-1;
                this.bmp_cardcolor.node.y=8.5;
                this.bmp_cardcolor.node.scaleX=0.23;
                this.bmp_cardcolor.node.scaleY=0.33;
                this.bmp_cardcolor.node.skewY=-9;

                this.bmp_cardHide.node.x=-1;
                this.bmp_cardHide.node.y=8.5;
                this.bmp_cardHide.node.scaleX=0.23;
                this.bmp_cardHide.node.scaleY=0.33;
                this.bmp_cardHide.node.skewY=-9;
                this.bmp_cardback.node.width = 62;
                this.bmp_cardback.node.height = 48;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_15");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 20:{
                this.node.x=-254;
                this.node.y=73;
                this.node.setLocalZOrder(2);
                this.bmp_cardcolor.node.x=-2;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.22;
                this.bmp_cardcolor.node.scaleY=0.32;
                this.bmp_cardcolor.node.skewY=-7;

                this.bmp_cardHide.node.x=-2;
                this.bmp_cardHide.node.y=10.5;
                this.bmp_cardHide.node.scaleX=0.22;
                this.bmp_cardHide.node.scaleY=0.32;
                this.bmp_cardHide.node.skewY=-7;
                this.bmp_cardback.node.width = 62;
                this.bmp_cardback.node.height = 48;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_14");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 19:{
                this.node.x=-250;
                this.node.y=101;
                this.node.setLocalZOrder(1);
                this.bmp_cardcolor.node.x=-2;
                this.bmp_cardcolor.node.y=10.5;
                this.bmp_cardcolor.node.scaleX=0.22;
                this.bmp_cardcolor.node.scaleY=0.32;
                this.bmp_cardcolor.node.skewY=-7;
                this.bmp_cardHide.node.x=-2;
                this.bmp_cardHide.node.y=10.5;
                this.bmp_cardHide.node.scaleX=0.22;
                this.bmp_cardHide.node.scaleY=0.32;
                this.bmp_cardHide.node.skewY=-7;
                this.bmp_cardback.node.width = 60;
                this.bmp_cardback.node.height = 46;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_left_13");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

        }
    }
}
