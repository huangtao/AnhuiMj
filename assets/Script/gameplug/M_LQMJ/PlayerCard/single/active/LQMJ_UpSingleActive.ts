import LQMJ_SingleActiveBase from "../LQMJ_SingleActiveBase";
import { LQMJMahjongDef, LQMJ } from "../../../ConstDef/LQMJMahjongDef";
import { SetTextureRes, SetTextureResAry } from "../../../../MJCommon/MJ_Function";
import M_LQMJVideoClass from "../../../M_LQMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LQMJ_UpSingleActive extends LQMJ_SingleActiveBase {

    @property(cc.Sprite)
    bmp_liecardback: cc.Sprite=null;

    onLoad() {
        // init logic
        
    }

    public init(){
        super.init();
        this.node.active=false;
    }

    public showCard(card: number,isLie: boolean,index:number,_lqmj=LQMJ.ins.iclass): void {
        if(card==this._cardValue&&isLie==this._isLie&&index==this._cardIndex)
        {
            if(!isLie)
                return;
        }
        super.showCard(card,isLie,index,_lqmj);
        this.bmp_cardcolor.node.active = false;
        this.bmp_cardback.node.active = false;
        this.bmp_liecardback.node.active=false;
        let url="";
        let url1="";

        if(_lqmj.is2D()){
            this.bmp_liecardback.node.width=56;
            this.bmp_liecardback.node.height=45;
            this.bmp_liecardback.node.scaleX=1;
            this.bmp_cardback.node.width=67;
            this.bmp_cardback.node.height=63;
            this.bmp_cardback.node.scaleX=1;

            this.bmp_cardcolor.node.x=0;
            this.bmp_cardcolor.node.y=7.5;
            this.bmp_cardcolor.node.scaleX=0.4;
            this.bmp_cardcolor.node.scaleY=0.45;
            this.bmp_cardcolor.node.skewY=0;
            if(isLie) {
                if(LQMJMahjongDef.gBackMahjongValue != card){
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
                    this.bmp_liecardback.spriteFrame=_lqmj.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(card);
                }else{
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_left_right_1280`;
                    this.bmp_liecardback.spriteFrame=_lqmj.getMahjongPaiBeiRes("zuoyou_back@2x");
                }
                this.bmp_liecardback.node.active=true;
                this.bmp_cardcolor.node.active = LQMJMahjongDef.gBackMahjongValue != card;
            } else {
                url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_active_left_1280`;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjongPaiBeiRes("zuo_pai@2x");
                this.bmp_cardback.node.active=true;
            }
        }else{
            if(isLie) {
                this.showDaoPai(_lqmj);
                this.bmp_liecardback.node.active=true;
                this.bmp_cardcolor.node.active = LQMJMahjongDef.gBackMahjongValue != card;
            }else {
                this.showShuPai(_lqmj);
                this.bmp_cardback.node.active=true;
            }
        }
        
        this.node.active=true;
    }

    public down(): void {
        if(this._isUp) {
            this.node.x -= 10;
            this._isUp = false;
        }
    }

    /**
     * 起立
     * */
    public up(): void {
        if(!this._isUp) {
            this.node.x += 10;
            this._isUp = true;
        }
    }

    private showDaoPai(_lqmj):void{
        switch(this._cardIndex){
            case 1:{
                this.node.x=-371;
                this.node.y=273;
                this.bmp_liecardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_1_1");
                this.bmp_liecardback.node.width=62;
                this.bmp_liecardback.node.height=44;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.20;
                this.bmp_cardcolor.node.scaleY=0.31;
                this.bmp_cardcolor.node.skewY=-15;
                this.bmp_cardcolor.node.x=-1.5;
                this.bmp_cardcolor.node.y=7.6;
                break;
            }
            case 2:{
                this.node.x=-378;
                this.node.y=247;
                this.bmp_liecardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_1_2");
                this.bmp_liecardback.node.width=62;
                this.bmp_liecardback.node.height=44;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.20;
                this.bmp_cardcolor.node.scaleY=0.31;
                this.bmp_cardcolor.node.skewY=-14.5;
                this.bmp_cardcolor.node.x=-1.6;
                this.bmp_cardcolor.node.y=7.8;
                break;
            }
            case 3:{
                this.node.x=-386;
                this.node.y=219;
                this.bmp_liecardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_1_3");
                this.bmp_liecardback.node.width=62;
                this.bmp_liecardback.node.height=44;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.205;
                this.bmp_cardcolor.node.scaleY=0.315;
                this.bmp_cardcolor.node.skewY=-14;
                this.bmp_cardcolor.node.x=-2.4;
                this.bmp_cardcolor.node.y=8.4;
                break;
            }
            case 4:{
                this.node.x=-393;
                this.node.y=192;
                this.bmp_liecardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_1_4");
                this.bmp_liecardback.node.width=62;
                this.bmp_liecardback.node.height=44;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.21;
                this.bmp_cardcolor.node.scaleY=0.32;
                this.bmp_cardcolor.node.skewY=-13.5;
                this.bmp_cardcolor.node.x=-1.6;
                this.bmp_cardcolor.node.y=8.8;
                break;
            }
            case 5:{
                this.node.x=-400;
                this.node.y=163;
                this.bmp_liecardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_1_5");
                this.bmp_liecardback.node.width=63;
                this.bmp_liecardback.node.height=47;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.215;
                this.bmp_cardcolor.node.scaleY=0.325;
                this.bmp_cardcolor.node.skewY=-13;
                this.bmp_cardcolor.node.x=-1.4;
                this.bmp_cardcolor.node.y=8.8;
                break;
            }
            case 6:{
                this.node.x=-408;
                this.node.y=134;
                this.bmp_liecardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_1_6");
                this.bmp_liecardback.node.width=63;
                this.bmp_liecardback.node.height=47;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.22;
                this.bmp_cardcolor.node.scaleY=0.33;
                this.bmp_cardcolor.node.skewY=-13;
                this.bmp_cardcolor.node.x=-2.2;
                this.bmp_cardcolor.node.y=8.8;
                break;
            }
            case 7:{
                this.node.x=-415;
                this.node.y=103;
                this.bmp_liecardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_1_7");
                this.bmp_liecardback.node.width=66;
                this.bmp_liecardback.node.height=48;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.225;
                this.bmp_cardcolor.node.scaleY=0.335;
                this.bmp_cardcolor.node.skewY=-12;
                this.bmp_cardcolor.node.x=-1.8;
                this.bmp_cardcolor.node.y=8.3;
                break;
            }
            case 8:{
                this.node.x=-422;
                this.node.y=71.5;
                this.bmp_liecardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_1_8");
                this.bmp_liecardback.node.width=67;
                this.bmp_liecardback.node.height=48;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.23;
                this.bmp_cardcolor.node.scaleY=0.34;
                this.bmp_cardcolor.node.skewY=-12.5;
                this.bmp_cardcolor.node.x=-1.2;
                this.bmp_cardcolor.node.y=8.7;
                break;
            }
            case 9:{
                this.node.x=-430;
                this.node.y=40;
                this.bmp_liecardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_1_9");
                this.bmp_liecardback.node.width=68;
                this.bmp_liecardback.node.height=50;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.235;
                this.bmp_cardcolor.node.scaleY=0.345;
                this.bmp_cardcolor.node.skewY=-12.5;
                this.bmp_cardcolor.node.x=-1.2;
                this.bmp_cardcolor.node.y=8.9;
                break;
            }
            case 10:{
                this.node.x=-440;
                this.node.y=6;
                this.bmp_liecardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_1_10");
                this.bmp_liecardback.node.width=70;
                this.bmp_liecardback.node.height=50;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.24;
                this.bmp_cardcolor.node.scaleY=0.35;
                this.bmp_cardcolor.node.skewY=-12;
                this.bmp_cardcolor.node.x=-1.6;
                this.bmp_cardcolor.node.y=9;
                break;
            }
            case 11:{
                this.node.x=-448;
                this.node.y=-28;
                this.bmp_liecardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_1_11");
                this.bmp_liecardback.node.width=71;
                this.bmp_liecardback.node.height=52;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.245;
                this.bmp_cardcolor.node.scaleY=0.355;
                this.bmp_cardcolor.node.skewY=-12.5;
                this.bmp_cardcolor.node.x=-1.9;
                this.bmp_cardcolor.node.y=9.7;
                break;
            }
            case 12:{
                this.node.x=-457;
                this.node.y=-62;
                this.bmp_liecardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_1_12");
                this.bmp_liecardback.node.width=72;
                this.bmp_liecardback.node.height=52;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.25;
                this.bmp_cardcolor.node.scaleY=0.36;
                this.bmp_cardcolor.node.skewY=-12.5;
                this.bmp_cardcolor.node.x=-1.9;
                this.bmp_cardcolor.node.y=9.2;
                break;
            }
            case 13:{
                this.node.x=-466;
                this.node.y=-100;
                this.bmp_liecardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_1_13");
                this.bmp_liecardback.node.width=74;
                this.bmp_liecardback.node.height=54;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.255;
                this.bmp_cardcolor.node.scaleY=0.365;
                this.bmp_cardcolor.node.skewY=-12.5;
                this.bmp_cardcolor.node.x=-2.6;
                this.bmp_cardcolor.node.y=10.3;
                break;
            }
            case 14:{
                this.node.x=-478;
                this.node.y=-145;
                this.bmp_liecardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_1_14");
                this.bmp_liecardback.node.width=75;
                this.bmp_liecardback.node.height=55;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=_lqmj.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.26;
                this.bmp_cardcolor.node.scaleY=0.37;
                this.bmp_cardcolor.node.skewY=-13;
                this.bmp_cardcolor.node.x=-1.2;
                this.bmp_cardcolor.node.y=10.6;
                break;
            }
        }
    }

    private showShuPai(_lqmj):void{
        // cc.log(this._cardIndex + "------" +this._cardValue);
        switch(this._cardIndex){
            case 1:{
                this.node.x=-389;
                this.node.y=247;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_3_1");
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 2:{
                this.node.x=-397;
                this.node.y=220;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_3_2");       
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 3:{
                this.node.x=-405;
                this.node.y=193;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_3_3");
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 4:{
                this.node.x=-413;
                this.node.y=164.5;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_3_4");
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 5:{
                this.node.x=-421;
                this.node.y=135;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_3_5")
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 6:{
                this.node.x=-430;
                this.node.y=105;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_3_6");
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 7:{
                this.node.x=-439;
                this.node.y=74.5;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_3_7");
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 8:{
                this.node.x=-448;
                this.node.y=43.5;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_3_8");
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 9:{
                this.node.x=-457;
                this.node.y=12;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_3_9");
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 10:{
                this.node.x=-466;
                this.node.y=-20;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_3_10");
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 11:{
                this.node.x=-475;
                this.node.y=-52.5;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_3_11");
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 12:{
                this.node.x=-484;
                this.node.y=-85.5;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_3_12");
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 13:{
                this.node.x=-495;
                this.node.y=-121;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_3_13");
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 14:{
                this.node.x=-506-2;
                this.node.y=-175;
                this.bmp_cardback.spriteFrame=_lqmj.getMahjong3DPaiBeiRes("hand_left_3_14");
                this.bmp_cardback.node.scaleX=1;
                break;
            }
        }
    }
}
