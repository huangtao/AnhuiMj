import LHZMJ_SingleActiveBase from "../LHZMJ_SingleActiveBase";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";
import { LHZMJ } from "../../../ConstDef/LHZMJMahjongDef";
import { LHZMJMahjongAlgorithm1 } from "../../../LHZMJMahjongAlgorithm/LHZMJMahjongAlgorithm1";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_SingleActive extends LHZMJ_SingleActiveBase {
     @property(cc.Sprite)
    bmp_greenZZ:cc.Sprite=null;

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
         this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
        this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);
        // SetTextureRes(url,this.bmp_cardback);

        this.HuiCardShowGreenZZ(card);
        
        // url=LHZMJ.ins.iclass.getMahjongResName(this.cardValue);
        // SetTextureRes(url,this.bmp_cardcolor);
        //this.bmp_cardback.x = 0;
        // this.bmp_cardback.scaleX=0.6;
        // //this.bmp_cardback.y = 0;
        // this.bmp_cardback.scaleY=0.6;
        // //this.bmp_cardcolor.texture = <egret.Texture>RES.getRes(LHZMJ.ins.iclass.getMahjongResName(card));
        // //this.bmp_cardcolor.x = 7;
        // this.bmp_cardcolor.scaleX=0.5;
        // //this.bmp_cardcolor.y = 4;
        // this.bmp_cardcolor.scaleY=0.5;
            
    }

    /**
     * 是否显示显示绿色遮罩
     */
    public set ShowGreenZZ(isShow:boolean){
        this.bmp_greenZZ.node.active=isShow;
    }
    /**
     * 会牌显示绿色遮罩
     * @param card 
     */
    public HuiCardShowGreenZZ(card:number):void{
        var huiAry:Array<number>=LHZMJ.ins.iclass.GetHunCardAry();
        if(LHZMJMahjongAlgorithm1.IsContainsNumber(huiAry,card)){
            this.ShowGreenZZ=true;
            return;
        }
        this.ShowGreenZZ=false;
    }



}
