import JZMJ_SinglePoolBase from "../JZMJ_SinglePoolBase";
import { JZMJ } from "../../../ConstDef/JZMJMahjongDef";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";
import M_JZMJVideoClass from "../../../M_JZMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class JZMJ_OppoSinglePool extends JZMJ_SinglePoolBase {
 
    onLoad() {
        // init logic
        this.init();
    }

    /**
     * 显示牌
     * */
    public showCard(card: number,index:number,_JZMJ): void {
        if(card==this._cardValue){
            return;
        }
        super.showCard(card,index,_JZMJ);
        // // let url="";
        // // url=_JZMJ.getMahjongResName(card);
        // // SetTextureRes(url,this.bmp_cardcolor);
        // //this.bmp_cardback.spriteFrame=_JZMJ.getMahjongPaiBeiRes("pb1_showcard_oppo_1280");
        // this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(card);
        
        if(_JZMJ.is2D()){
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
            this.bmp_cardback.spriteFrame=_JZMJ.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
            this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(card);
        }else{
            this.show3DCard(_JZMJ);
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

    private show3DCard(_JZMJ):void{
        var colorY = 8;
        switch(this._cardIndex){
            case 1:{
                this.node.x=77;
                this.node.y=139;
                this.node.setLocalZOrder(29);
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=colorY;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.45;
                this.bmp_cardcolor.node.skewX=-3;

                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=colorY;
                this.bmp_cardHide.node.scaleX=0.55;
                this.bmp_cardHide.node.scaleY=0.45;
                this.bmp_cardHide.node.skewX=-3;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_1");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 2:{
                this.node.x=39;
                this.node.y=139;
                this.node.setLocalZOrder(28);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=colorY;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.45;
                this.bmp_cardcolor.node.skewX=-2;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=colorY;
                this.bmp_cardHide.node.scaleX=0.55;
                this.bmp_cardHide.node.scaleY=0.45;
                this.bmp_cardHide.node.skewX=-2.5;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_2");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 3:{
                this.node.x=-1;
                this.node.y=139;
                this.node.setLocalZOrder(27);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=colorY;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.45;
                this.bmp_cardcolor.node.skewX=-1.5;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=colorY;
                this.bmp_cardHide.node.scaleX=0.55;
                this.bmp_cardHide.node.scaleY=0.45;
                this.bmp_cardHide.node.skewX=-1.5;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_3");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 4:{
               this.node.x=-40;
                this.node.y=139;
                this.node.setLocalZOrder(26);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=colorY;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.45;
                this.bmp_cardcolor.node.skewX=-1;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=colorY;
                this.bmp_cardHide.node.scaleX=0.55;
                this.bmp_cardHide.node.scaleY=0.45;
                this.bmp_cardHide.node.skewX=-1;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_4");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 5:{
                this.node.x=-77;
                this.node.y=139;
                this.node.setLocalZOrder(25);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=colorY;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.45;
                this.bmp_cardcolor.node.skewX=0;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=colorY;
                this.bmp_cardHide.node.scaleX=0.55;
                this.bmp_cardHide.node.scaleY=0.45;
                this.bmp_cardHide.node.skewX=0;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_5");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 6:{
                this.node.x=-115;
                this.node.y=139;
                this.node.setLocalZOrder(24);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=colorY;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.45;
                this.bmp_cardcolor.node.skewX=0;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=colorY;
                this.bmp_cardHide.node.scaleX=0.55;
                this.bmp_cardHide.node.scaleY=0.45;
                this.bmp_cardHide.node.skewX=0;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_6");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 7:{
                this.node.x=-150;
                this.node.y=139;
                this.node.setLocalZOrder(23);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=colorY;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.45;
                this.bmp_cardcolor.node.skewX=1;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=colorY;
                this.bmp_cardHide.node.scaleX=0.55;
                this.bmp_cardHide.node.scaleY=0.45;
                this.bmp_cardHide.node.skewX=1;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_19");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 8:{
                this.node.x=-187;
                this.node.y=139;
                this.node.setLocalZOrder(22);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=colorY;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.45;
                this.bmp_cardcolor.node.skewX=1.5;

                this.bmp_cardHide.node.x=0.1;
                this.bmp_cardHide.node.y=colorY;
                this.bmp_cardHide.node.scaleX=0.55;
                this.bmp_cardHide.node.scaleY=0.45;
                this.bmp_cardHide.node.skewX=1.5;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_22");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 9:{
                this.node.x=-223;
                this.node.y=139;
                this.node.setLocalZOrder(21);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=colorY;
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.45;
                this.bmp_cardcolor.node.skewX=2;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=colorY;
                this.bmp_cardHide.node.scaleX=0.55;
                this.bmp_cardHide.node.scaleY=0.45;
                this.bmp_cardHide.node.skewX=2;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_25");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            //第二行
            case 10:{
                this.node.x=75;
                this.node.y=180;
                this.node.setLocalZOrder(19);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.5;
                this.bmp_cardcolor.node.scaleY=0.4;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.5;
                this.bmp_cardHide.node.scaleY=0.4;
                // this.bmp_cardHide.node.skewX=4;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_7");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 11:{
                this.node.x=38;
                this.node.y=178.5;
                this.node.setLocalZOrder(18);
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.5;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=-3;

                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.5;
                this.bmp_cardHide.node.scaleY=0.4;
                this.bmp_cardHide.node.skewX=-3;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_8");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 12:{
                this.node.x=0;
                this.node.y=178.5;
                this.node.setLocalZOrder(17);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.5;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=-2;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.5;
                this.bmp_cardHide.node.scaleY=0.4;
                this.bmp_cardHide.node.skewX=-2;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_9");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 13:{
                this.node.x=-37;
                this.node.y=178.5;
                this.node.setLocalZOrder(16);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.5;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=-1.5;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.5;
                this.bmp_cardHide.node.scaleY=0.4;
                this.bmp_cardHide.node.skewX=-1.5;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_10");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 14:{
               this.node.x=-75;
                this.node.y=178.5;
                this.node.setLocalZOrder(15);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.5;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=-1;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.5;
                this.bmp_cardHide.node.scaleY=0.4;
                this.bmp_cardHide.node.skewX=-1;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_11");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 15:{
                this.node.x=-111;
                this.node.y=178.5;
                this.node.setLocalZOrder(14);
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.5;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=0;

                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.5;
                this.bmp_cardHide.node.scaleY=0.4;
                this.bmp_cardHide.node.skewX=0;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_12");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 16:{
                this.node.x=-147;
                this.node.y=178.5;
                this.node.setLocalZOrder(13);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.5;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=0;
                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.5;
                this.bmp_cardHide.node.scaleY=0.4;
                this.bmp_cardHide.node.skewX=0;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_20");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 17:{
                this.node.x=-182;
                this.node.y=178.5;
                this.node.setLocalZOrder(12);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.5;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=0.5;
                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.5;
                this.bmp_cardHide.node.scaleY=0.4;
                this.bmp_cardHide.node.skewX=0.5;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_23");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 18:{
                this.node.x=-218;
                this.node.y=178.5;
                this.node.setLocalZOrder(11);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.5;
                this.bmp_cardcolor.node.scaleY=0.4;
                this.bmp_cardcolor.node.skewX=1;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.5;
                this.bmp_cardHide.node.scaleY=0.4;
                this.bmp_cardHide.node.skewX=1;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_26");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            //第三行
            case 19:{
                this.node.x=72;
                this.node.y=218;
                this.node.setLocalZOrder(9);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.48;
                this.bmp_cardcolor.node.scaleY=0.38;
                this.bmp_cardcolor.node.skewX=2;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.38;
                this.bmp_cardHide.node.skewX=2;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_13");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 20:{
                this.node.x=37;
                this.node.y=217;
                this.node.setLocalZOrder(8);
                this.bmp_cardcolor.node.x=-1;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.48;
                this.bmp_cardcolor.node.scaleY=0.38;
                this.bmp_cardcolor.node.skewX=3;

                this.bmp_cardHide.node.x=-1;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.38;
                this.bmp_cardHide.node.skewX=3;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_14");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }

            case 21:{
                this.node.x=1;
                this.node.y=217;
                this.node.setLocalZOrder(7);
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.48;
                this.bmp_cardcolor.node.scaleY=0.38;
                this.bmp_cardcolor.node.skewX=-3;

                this.bmp_cardHide.node.x=1;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.38;
                this.bmp_cardHide.node.skewX=-3;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_15");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 22:{
                this.node.x=-34;
                this.node.y=216.5;
                this.node.setLocalZOrder(6);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.48;
                this.bmp_cardcolor.node.scaleY=0.38;
                this.bmp_cardcolor.node.skewX=-2;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.38;
                this.bmp_cardHide.node.skewX=-2;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_16");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 23:{
                this.node.x=-71;
                this.node.y=232.5;
                this.node.setLocalZOrder(5);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.48;
                this.bmp_cardcolor.node.scaleY=0.38;
                this.bmp_cardcolor.node.skewX=-1.5;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.38;
                this.bmp_cardHide.node.skewX=-1.5;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_17");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 24:{
               this.node.x=-69.5;
                this.node.y=215.5;
                this.node.setLocalZOrder(4);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.48;
                this.bmp_cardcolor.node.scaleY=0.38;
                this.bmp_cardcolor.node.skewX=-1;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.38;
                this.bmp_cardHide.node.skewX=-1;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_24");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 25:{
                this.node.x=-113.4;
                this.node.y=215.5;
                this.node.setLocalZOrder(3);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.48;
                this.bmp_cardcolor.node.scaleY=0.38;
                this.bmp_cardcolor.node.skewX=0;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=0;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_25");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 26:{
                this.node.x=-157.4;
                this.node.y=215.5;
                this.node.setLocalZOrder(2);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.48;
                this.bmp_cardcolor.node.scaleY=0.38;
                this.bmp_cardcolor.node.skewX=0;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.55;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=0;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_26");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
            case 27:{
                this.node.x=-201.2;
                this.node.y=215.5;
                this.node.setLocalZOrder(1);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=10;
                this.bmp_cardcolor.node.scaleX=0.48;
                this.bmp_cardcolor.node.scaleY=0.38;
                this.bmp_cardcolor.node.skewX=1;

                this.bmp_cardHide.node.x=0;
                this.bmp_cardHide.node.y=10;
                this.bmp_cardHide.node.scaleX=0.48;
                this.bmp_cardHide.node.scaleY=0.35;
                this.bmp_cardHide.node.skewX=2;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("field_oppo_27");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
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
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("d_pc_top_1p_03");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
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
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("d_pc_top_1p_02");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
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
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("d_pc_top_1p_01");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                break;
            }
        }
    }
}
