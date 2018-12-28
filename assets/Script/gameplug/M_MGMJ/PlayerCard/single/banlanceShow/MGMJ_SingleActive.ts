import MGMJ_SingleActiveBase from "../MGMJ_SingleActiveBase";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";
import { MGMJ } from "../../../ConstDef/MGMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MGMJ_SingleActive extends MGMJ_SingleActiveBase {

    onLoad() {
        // init logic
        
    }

    /**
     * 显示牌
     * */
    public showCard(card: number,isLie: boolean): void {
        let hunpai = MGMJ.ins.iclass.getTableConfig().SetPeiZi;
        super.showCard(card,isLie,0,hunpai);
        
        this.bmp_cardcolor.node.active = true;
        this.bmp_cardback.node.active = true;
        this.bmp_huipai.node.active = hunpai==card;
        
        this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
        this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(card);
        this.bmp_cardcolor.node.scaleX=0.6;
        this.bmp_cardcolor.node.scaleY=0.6;
                  
    }

    public showCardJieSuan(card: number,isLie: boolean): void {
        let hunpai = MGMJ.ins.iclass.getTableConfig().SetPeiZi;
        super.showCard(card,isLie,0);
        
        this.bmp_cardcolor.node.active = true;
        this.bmp_cardback.node.active = true;
        this.bmp_huipai.node.active = hunpai == card;
        this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
        this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaResOut(card);
    }

}
