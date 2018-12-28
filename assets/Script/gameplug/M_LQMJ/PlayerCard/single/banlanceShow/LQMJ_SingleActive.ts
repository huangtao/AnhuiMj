import LQMJ_SingleActiveBase from "../LQMJ_SingleActiveBase";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";
import { LQMJ } from "../../../ConstDef/LQMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LQMJ_SingleActive extends LQMJ_SingleActiveBase {

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
        
        this.bmp_cardback.spriteFrame=LQMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
        this.bmp_cardcolor.spriteFrame=LQMJ.ins.iclass.getMahjongPaiHuaRes(card);
        // this.bmp_cardcolor.node.scaleX=0.6;
        // this.bmp_cardcolor.node.scaleY=0.6;
                  
    }
    public showCardJieSuan(card: number,isLie: boolean): void {
        super.showCard(card,isLie,0);
        
        this.bmp_cardcolor.node.active = true;
        this.bmp_cardback.node.active = true;
        
        this.bmp_cardback.spriteFrame=LQMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
        this.bmp_cardcolor.spriteFrame=LQMJ.ins.iclass.getMahjongPaiHuaResOut(card);
    }
}
