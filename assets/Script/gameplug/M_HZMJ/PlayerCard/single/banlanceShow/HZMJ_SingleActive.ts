import HZMJ_SingleActiveBase from "../HZMJ_SingleActiveBase";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";
import { HZMJ } from "../../../ConstDef/HZMJMahjongDef";
//import { scaleTo } from '../../../../../../../creator';

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_SingleActive extends HZMJ_SingleActiveBase {


    onLoad() {
        // init logic
        
    }

    /**
     * 显示牌
     * */
    public showCard(card: number,isLie: boolean): void {
        super.showCard(card,isLie,0);
        let url="";
        
        this.bmp_cardcolor.node.active = true;
        this.bmp_cardback.node.active = true;
        
        url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
        // SetTextureRes(url,this.bmp_cardback);

        
        
        // url=HZMJ.ins.iclass.getMahjongResName(this.cardValue);
        // SetTextureRes(url,this.bmp_cardcolor);
        this.bmp_cardback.spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");  
        this.bmp_cardcolor.spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(card);
        this.bmp_cardcolor.node.scaleX=0.6;
        this.bmp_cardcolor.node.scaleY=0.6;
        this.bmp_cardback.node.scaleX=0.65;
        this.bmp_cardback.node.scaleY=0.65;
        this.bmp_cardcolor.node.y=-2;
        //this.bmp_cardback.x = 0;
        // this.bmp_cardback.scaleX=0.6;
        // //this.bmp_cardback.y = 0;
        // this.bmp_cardback.scaleY=0.6;
        // //this.bmp_cardcolor.texture = <egret.Texture>RES.getRes(HZMJ.ins.iclass.getMahjongResName(card));
        // //this.bmp_cardcolor.x = 7;
        // this.bmp_cardcolor.scaleX=0.5;
        // //this.bmp_cardcolor.y = 4;
        // this.bmp_cardcolor.scaleY=0.5;
            
    }
}
