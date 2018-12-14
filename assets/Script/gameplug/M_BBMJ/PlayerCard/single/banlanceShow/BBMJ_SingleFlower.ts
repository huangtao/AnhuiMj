import BBMJ_SingleActiveBase from "../BBMJ_SingleActiveBase";
import { BBMJ } from "../../../ConstDef/BBMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_SingleFlower extends BBMJ_SingleActiveBase {

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
        
        // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei1/pb1_showcard_oppo_1280`;
        // SetTextureRes(url,this.bmp_cardback);

        
        
        // url=AQMJ.ins.iclass.getMahjongResName(this.cardValue);
        // //url=this.getMahjongResName(this.cardValue);
        // //console.log(url);
        
        // SetTextureRes(url,this.bmp_cardcolor);


        
        this.bmp_cardback.spriteFrame=BBMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
        this.bmp_cardcolor.spriteFrame=BBMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);





        //this.bmp_cardback.x = 0;
        // this.bmp_cardback.scaleX=0.6;
        // //this.bmp_cardback.y = 0;
        // this.bmp_cardback.scaleY=0.6;
        // //this.bmp_cardcolor.texture = <egret.Texture>RES.getRes(AQMJ.ins.iclass.getMahjongResName(card));
        // //this.bmp_cardcolor.x = 7;
        // this.bmp_cardcolor.scaleX=0.5;
        // //this.bmp_cardcolor.y = 4;
        // this.bmp_cardcolor.scaleY=0.5;
            
    }

}
