import TDHMJ_SingleActiveBase from "../TDHMJ_SingleActiveBase";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";
import { TDHMJ } from "../../../ConstDef/TDHMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TDHMJ_SingleActive extends TDHMJ_SingleActiveBase {

    onLoad() {
        // init logic
        
    }

    /**
     * 显示牌
     * */
    public showCard(card: number,isLie: boolean): void {
        super.showCard(card,isLie,0);
        
        this.bmp_cardcolor.node.active = true;
        this.bmp_cardback.node.active = true;
        
        this.bmp_cardback.spriteFrame=TDHMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
        this.bmp_cardcolor.spriteFrame=TDHMJ.ins.iclass.getMahjongPaiHuaRes(card);
        // this.bmp_cardcolor.node.scaleX=0.6;
        // this.bmp_cardcolor.node.scaleY=0.6;
                  
    }
    public showCardJieSuan(card: number,isLie: boolean): void {
        super.showCard(card,isLie,0);
        
        this.bmp_cardcolor.node.active = true;
        this.bmp_cardback.node.active = true;
        
        this.bmp_cardback.spriteFrame=TDHMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
        this.bmp_cardcolor.spriteFrame=TDHMJ.ins.iclass.getMahjongPaiHuaResOut(card);
    }
}
