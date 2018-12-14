import JZMJ_SingleActiveBase from "../JZMJ_SingleActiveBase";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";
import { JZMJ } from "../../../ConstDef/JZMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class JZMJ_SingleActive extends JZMJ_SingleActiveBase {

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
        
        this.bmp_cardback.spriteFrame=JZMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
        this.bmp_cardcolor.spriteFrame=JZMJ.ins.iclass.getMahjongPaiHuaRes(card);
        this.bmp_cardcolor.node.scaleX=0.6;
        this.bmp_cardcolor.node.scaleY=0.6;
                  
    }

    public showCardJisSuan(card: number,isLie: boolean): void {
        super.showCard(card,isLie,0);
        
        this.bmp_cardcolor.node.active = true;
        this.bmp_cardback.node.active = true;
        
        this.bmp_cardback.spriteFrame=JZMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
        this.bmp_cardcolor.spriteFrame=JZMJ.ins.iclass.getMahjongPaiHuaResOut(card);
    }

}
