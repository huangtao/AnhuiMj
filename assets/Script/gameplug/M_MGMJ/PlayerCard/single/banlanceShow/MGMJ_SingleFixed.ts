import MGMJ_SingleFixedBase from "../MGMJ_SingleFixedBase";
import { enFixedCardType, MGMJ } from "../../../ConstDef/MGMJMahjongDef";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MGMJ_SingleFixed extends MGMJ_SingleFixedBase {

    onLoad() {
        // init logic
        
    }

    /**
     * 显示定牌
     * */
    public showCard(card: number,fixedType: enFixedCardType,chiType:number,pos:number): void {
        super.showCard(card,fixedType,null,chiType,null);
        
        this.arrangeCard();
    }

    /**
     * 整理牌阵
     * */
    protected arrangeCard(){
        switch(this.fixedType) {
            case enFixedCardType.FixedCardType_AGang: {

                this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_2_7");
                this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_2_7");
                this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_2_7");
                this.bmp_cardbackAry[3].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_7");
                // this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaResOut(this.cardValue);
                // this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaResOut(this.cardValue);
                // this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaResOut(this.cardValue);
                this.bmp_cardcolorAry[3].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaResOut(this.cardValue);

                this.bmp_cardbackAry[0].node.active=true;
                this.bmp_cardbackAry[1].node.active=true;
                this.bmp_cardbackAry[2].node.active=true;
                this.bmp_cardbackAry[3].node.active=true;
                this.bmp_cardcolorAry[3].node.scaleX=0.4;
                this.bmp_cardcolorAry[3].node.scaleY=0.4;

                this.bmp_cardcolorAry[0].node.active=false;
                this.bmp_cardcolorAry[1].node.active=true;
                this.bmp_cardcolorAry[2].node.active=false;
                
                break;
            }
            case enFixedCardType.FixedCardType_MGang:
            case enFixedCardType.FixedCardType_BGang: {
                this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_7");
                this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_7");
                this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_7");
                this.bmp_cardbackAry[3].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_7");
                this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaResOut(this.cardValue);
                this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaResOut(this.cardValue);
                this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaResOut(this.cardValue);
                this.bmp_cardcolorAry[3].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaResOut(this.cardValue);
                for(let i=0;i<4;i++){
                    this.bmp_cardcolorAry[i].node.scaleX=0.4;
                    this.bmp_cardcolorAry[i].node.scaleY=0.4;
                    this.bmp_cardbackAry[i].node.active=true;
                    this.bmp_cardcolorAry[i].node.active=true;
                }     
                break;
            }
            case enFixedCardType.FixedCardType_Peng: {
                this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_7");
                this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_7");
                this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_7");
                this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaResOut(this.cardValue);
                this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaResOut(this.cardValue);
                this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaResOut(this.cardValue);
                for(let i=0;i<3;i++){
                    this.bmp_cardcolorAry[i].node.scaleX=0.4;
                    this.bmp_cardcolorAry[i].node.scaleY=0.4;
                    this.bmp_cardbackAry[i].node.active=true;
                    this.bmp_cardcolorAry[i].node.active=true;
                }             
                this.bmp_cardbackAry[3].node.active=false;
                break;
            }
            case enFixedCardType.FixedCardType_Chi: {       
                this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_7");
                this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_7");
                this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_7");
                this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaResOut(this.cardValue + this._chiType - 2);
                this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaResOut(this.cardValue + this._chiType - 1);
                this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaResOut(this.cardValue + this._chiType);
                for(let i=0;i<3;i++){
                    this.bmp_cardcolorAry[i].node.scaleX=0.4;
                    this.bmp_cardcolorAry[i].node.scaleY=0.4;
                    this.bmp_cardbackAry[i].node.active=true;
                    this.bmp_cardcolorAry[i].node.active=true;
                }             
                this.bmp_cardbackAry[3].node.active=false;
                break;
            }
        }
        this.node.active=true;
    }
}
