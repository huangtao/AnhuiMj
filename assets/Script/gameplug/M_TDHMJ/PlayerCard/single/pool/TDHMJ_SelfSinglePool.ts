import TDHMJ_SinglePoolBase from "../TDHMJ_SinglePoolBase";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";
import { TDHMJ } from "../../../ConstDef/TDHMJMahjongDef";
import M_TDHMJVideoClass from "../../../M_TDHMJVideoClass";


const { ccclass, property } = cc._decorator;

@ccclass
export default class TDHMJ_SelfSinglePool extends TDHMJ_SinglePoolBase {

    onLoad() {
        // init logic
        this.init();
    }

		
    /**
     * 显示牌
     * */
    public showCard(card: number,index:number,_lqmj): void {
        if(card==this._cardValue){
            return;
        }
        super.showCard(card,index,_lqmj);
        // let url="";
        if(_lqmj.is2D()){
            this.bmp_cardback.node.width=42;
            this.bmp_cardback.node.height=58;
            this.bmp_cardback.node.scaleX=1;
            this.bmp_cardback.node.skewX=0;
            this.bmp_cardback.node.skewY=0;

            this.bmp_cardcolor.node.x=0;
            this.bmp_cardcolor.node.y=8;
            this.bmp_cardcolor.node.scaleX=0.75;
            this.bmp_cardcolor.node.scaleY=0.45;
            this.bmp_cardcolor.node.skewX=0;

            this.bmp_cardHide.node.x=0;
            this.bmp_cardHide.node.y=5;
            this.bmp_cardHide.node.scaleX=0.56;
            this.bmp_cardHide.node.scaleY=0.43;
            this.bmp_cardHide.node.skewX=0;
            this.bmp_cardback.spriteFrame=_lqmj.getMahjongPaiBeiRes("shangdp_back@2x");
            this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(card);
        }else{
            this.show3DCard(_lqmj);
        }
        // // url=_lqmj.getMahjongResName(card);
        // // SetTextureRes(url,this.bmp_cardcolor);
        // this.bmp_cardback.spriteFrame=_lqmj.getMahjongPaiBeiRes("pb1_showcard_oppo_1280");
        // this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(card);

        this.bmp_cardback.node.active=true;
        this.bmp_cardcolor.node.active=true;
    }
    
    /**
     * 尺寸
     * */
    public get size(): { width: number,height: number } {
        return { width: 39,height: 58 };
    }

    private show3DCard(_lqmj):void{
        switch(this._cardIndex){
            case 1:{
                this.node.x=-105.5;
                this.node.y=-77;
                this.node.setLocalZOrder(9);
                this.bmp_cardcolor.node.x=-0.4;
                this.bmp_cardcolor.node.y=8;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.45+0.05;
                this.bmp_cardcolor.node.skewX=3;
                this.bmp_cardHide.node.x=-0.4;
                this.bmp_cardHide.node.y=8;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.5;
                this.bmp_cardHide.node.skewX=3;
                this.bmp_cardback.node.width = 50;
                this.bmp_cardback.node.height = 62;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_1");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 2:{
                this.node.x=-61;
                this.node.y=-77;
                this.node.setLocalZOrder(8);
                this.bmp_cardcolor.node.x=0.8;
                this.bmp_cardcolor.node.y=8;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=2;
                this.bmp_cardHide.node.x=0.8;
                this.bmp_cardHide.node.y=8;
                this.bmp_cardHide.node.scaleX=0.66;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=2;
                this.bmp_cardback.node.width = 48;
                this.bmp_cardback.node.height = 62;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_2");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 3:{
                this.node.x=-17;
                this.node.y=-78;
                this.node.setLocalZOrder(7);
                this.bmp_cardcolor.node.x=0.4;
                this.bmp_cardcolor.node.y=8;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=0.5;
                this.bmp_cardHide.node.x=0.4;
                this.bmp_cardHide.node.y=8;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=0.5;
                this.bmp_cardback.node.width = 48;
                this.bmp_cardback.node.height = 62;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_3");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 4:{
                this.node.x=28;
                this.node.y=-78;
                this.node.setLocalZOrder(6);
                this.bmp_cardcolor.node.x=0.4;
                this.bmp_cardcolor.node.y=8;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-0.5;
                this.bmp_cardHide.node.x=0.4;
                this.bmp_cardHide.node.y=8;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=-0.5;
                this.bmp_cardback.node.width = 48;
                this.bmp_cardback.node.height = 62;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_4");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 5:{
                this.node.x=72;
                this.node.y=-78;
                this.node.setLocalZOrder(5);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=8;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-2;
                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=8;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=-2;
                this.bmp_cardback.node.width = 50;
                this.bmp_cardback.node.height = 62;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_5");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 6:{
                this.node.x=116;
                this.node.y=-78;
                this.node.setLocalZOrder(4);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=8;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-4;
                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=8;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=-4;
                this.bmp_cardback.node.width = 50;
                this.bmp_cardback.node.height = 62;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_6");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 7:{
                this.node.x=160;
                this.node.y=-78;
                this.node.setLocalZOrder(3);
                this.bmp_cardcolor.node.x=-0.4;
                this.bmp_cardcolor.node.y=8;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-4;
                this.bmp_cardHide.node.x=-0.4;
                this.bmp_cardHide.node.y=8;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=-4;
                this.bmp_cardback.node.width = 52;
                this.bmp_cardback.node.height = 62;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_19");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 8:{
                this.node.x=203;
                this.node.y=-78;
                this.node.setLocalZOrder(2);
                this.bmp_cardcolor.node.x=0.5;
                this.bmp_cardcolor.node.y=8;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-5.5;
                this.bmp_cardHide.node.x=0.5;
                this.bmp_cardHide.node.y=8;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=-5.5;
                this.bmp_cardback.node.width = 54;
                this.bmp_cardback.node.height = 62;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_22");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }       
            case 9:{
                this.node.x=246;
                this.node.y=-78;
                this.node.setLocalZOrder(1);
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=8;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-7;
                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=8;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=-7;
                this.bmp_cardback.node.width = 56;
                this.bmp_cardback.node.height = 62;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_25");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

            //第二行
            case 10:{
                this.node.x=-107.5;
                this.node.y=-124;
                this.node.setLocalZOrder(29);
                this.bmp_cardcolor.node.x=0.4;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=1.5;
                this.bmp_cardHide.node.x=0.4;
                this.bmp_cardHide.node.y=9;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=1.5;
                this.bmp_cardback.node.width = 50;
                this.bmp_cardback.node.height = 64;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_7");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 11:{
                this.node.x=-62;
                this.node.y=-124;
                this.node.setLocalZOrder(28);
                this.bmp_cardcolor.node.x=-0.4;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=1.5;
                this.bmp_cardHide.node.x=-0.4;
                this.bmp_cardHide.node.y=9;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=1.5;
                this.bmp_cardback.node.width = 48;
                this.bmp_cardback.node.height = 64;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_8");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 12:{
                this.node.x=-17;
                this.node.y=-124;
                this.node.setLocalZOrder(27);
                this.bmp_cardcolor.node.x=0.8;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=0.2;
                this.bmp_cardHide.node.x=0.8;
                this.bmp_cardHide.node.y=9;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=0.2;
                this.bmp_cardback.node.width = 48;
                this.bmp_cardback.node.height = 64;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_9");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 13:{
                this.node.x=28.5;
                this.node.y=-124;
                this.node.setLocalZOrder(26);
                this.bmp_cardcolor.node.x=0.4;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-1;
                this.bmp_cardHide.node.x=0.4;
                this.bmp_cardHide.node.y=9;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=-1;
                this.bmp_cardback.node.width = 48;
                this.bmp_cardback.node.height = 64;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_10");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 14:{
                this.node.x=74;
                this.node.y=-124;
                this.node.setLocalZOrder(25);
                this.bmp_cardcolor.node.x=0.4;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-3;
                this.bmp_cardHide.node.x=0.4;
                this.bmp_cardHide.node.y=9;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=-3;
                this.bmp_cardback.node.width = 50;
                this.bmp_cardback.node.height = 64;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_11");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 15:{
                this.node.x=119;
                this.node.y=-124;
                this.node.setLocalZOrder(24);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-3.5;
                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=9;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=-3.5;
                this.bmp_cardback.node.width = 52;
                this.bmp_cardback.node.height = 64;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_12");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 16:{
                this.node.x=164;
                this.node.y=-124;
                this.node.setLocalZOrder(23);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-5.5;
                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=9;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=-5.5;
                this.bmp_cardback.node.width = 54;
                this.bmp_cardback.node.height = 64;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_20");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 17:{
                this.node.x=209;
                this.node.y=-124;
                this.node.setLocalZOrder(22);
                this.bmp_cardcolor.node.x=-0.4;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-6.5;
                this.bmp_cardHide.node.x=-0.4;
                this.bmp_cardHide.node.y=9;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=-6.5;
                this.bmp_cardback.node.width = 56;
                this.bmp_cardback.node.height = 64;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_23");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 18:{
                this.node.x=254;
                this.node.y=-124;
                this.node.setLocalZOrder(21);
                this.bmp_cardcolor.node.x=-0.4;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-7.5;
                this.bmp_cardHide.node.x=-0.4;
                this.bmp_cardHide.node.y=9;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=-7.5;
                this.bmp_cardback.node.width = 56;
                this.bmp_cardback.node.height = 64;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_26");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

            //第三行
            case 19:{
                this.node.x=-110.5;
                this.node.y=-170;
                this.node.setLocalZOrder(39);
                this.bmp_cardcolor.node.x=-0.8;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=2;

                this.bmp_cardHide.node.x=-0.8;
                this.bmp_cardHide.node.y=9;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=2;
                this.bmp_cardback.node.width = 52;
                this.bmp_cardback.node.height = 66;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_13");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 20:{
                this.node.x=-63;
                this.node.y=-170.5;
                this.node.setLocalZOrder(38);
                this.bmp_cardcolor.node.x=0.4;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=1;

                this.bmp_cardHide.node.x=0.4;
                this.bmp_cardHide.node.y=9;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=1;
                this.bmp_cardback.node.width = 50;
                this.bmp_cardback.node.height = 66;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_14");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

            case 21:{
                this.node.x=-17;
                this.node.y=-170.5;
                this.node.setLocalZOrder(37);
                this.bmp_cardcolor.node.x=-0.4;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-0.2;

                this.bmp_cardHide.node.x=-0.4;
                this.bmp_cardHide.node.y=9;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=-0.2;
                this.bmp_cardback.node.width = 50;
                this.bmp_cardback.node.height = 66;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_15");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 22:{
                this.node.x=26;
                this.node.y=-170;
                this.node.setLocalZOrder(36);
                this.bmp_cardcolor.node.x=0.6;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-1.5;

                this.bmp_cardHide.node.x=0.6;
                this.bmp_cardHide.node.y=9;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=-1.5;
                this.bmp_cardback.node.width = 50;
                this.bmp_cardback.node.height = 66;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_16");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 23:{
                this.node.x=71;
                this.node.y=-170;
                this.node.setLocalZOrder(35);
                this.bmp_cardcolor.node.x=-0.4;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-2;

                this.bmp_cardHide.node.x=-0.4;
                this.bmp_cardHide.node.y=9;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=-2;
                this.bmp_cardback.node.width = 52;
                this.bmp_cardback.node.height = 66;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_17");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 24:{
                this.node.x=116;
                this.node.y=-167.44;

                this.bmp_cardcolor.node.x=0.6;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-3.5;

                this.bmp_cardHide.node.x=0.6;
                this.bmp_cardHide.node.y=9;
                this.bmp_cardHide.node.scaleX=0.65;
                this.bmp_cardHide.node.scaleY=0.48;
                this.bmp_cardHide.node.skewX=-3.5;
                this.bmp_cardback.node.width = 54;
                this.bmp_cardback.node.height = 66;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_18");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 25:{
                this.node.x=161;
                this.node.y=-167.44;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-4.5;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=0;
                this.bmp_cardback.node.width = 54;
                this.bmp_cardback.node.height = 66;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_21");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }


            case 26:{
                this.node.x=206;
                this.node.y=-167.44;

                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-6;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=0;
                this.bmp_cardback.node.width = 56;
                this.bmp_cardback.node.height = 62;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_24");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 27:{
                this.node.x=247;
                this.node.y=-167.44;
                this.bmp_cardcolor.node.x=-0.6;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6+0.05;
                this.bmp_cardcolor.node.scaleY=0.43+0.05;
                this.bmp_cardcolor.node.skewX=-7;
                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=-1;
                this.bmp_cardback.node.width = 58;
                this.bmp_cardback.node.height = 62;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("field_self_27");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            //
            case 28:{
                this.node.x=133;
                this.node.y=-136.7;

                this.bmp_cardback.node.width=58;
                this.bmp_cardback.node.height=71;
                this.bmp_cardback.node.scaleX=-1;

                this.bmp_cardcolor.node.x=0.4;
                this.bmp_cardcolor.node.y=9;
                this.bmp_cardcolor.node.scaleX=0.6;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=-3.3;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=12.6;
                this.bmp_cardHide.node.scaleX=0.6;
                this.bmp_cardHide.node.scaleY=0.43;
                this.bmp_cardHide.node.skewX=-2;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("d_pc_btm_2p_03");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 29:{
                this.node.x=185.9;
                this.node.y=-136.7;

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
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("d_pc_btm_2p_02");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 30:{
                this.node.x=239.8;
                this.node.y=-136.7;

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
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("d_pc_btm_2p_01");
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

        }
    }
}
