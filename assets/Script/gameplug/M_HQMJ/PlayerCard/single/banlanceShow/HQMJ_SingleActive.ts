import HQMJ_SingleActiveBase from "../HQMJ_SingleActiveBase";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";
import { HQMJ } from "../../../ConstDef/HQMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HQMJ_SingleActive extends HQMJ_SingleActiveBase {

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
        
        this.bmp_cardback.spriteFrame=HQMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
        this.bmp_cardcolor.spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaRes(card);
        // this.bmp_cardcolor.node.scaleX=0.6;
        // this.bmp_cardcolor.node.scaleY=0.6;
                  
    }
    public showCardJieSuan(card: number,isLie: boolean): void {
        super.showCard(card,isLie,0);
        
        this.bmp_cardcolor.node.active = true;
        this.bmp_cardback.node.active = true;
        
        this.bmp_cardback.spriteFrame=HQMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
        this.bmp_cardcolor.spriteFrame=HQMJ.ins.iclass.getMahjongPaiHuaResOut(card);
    }
}
