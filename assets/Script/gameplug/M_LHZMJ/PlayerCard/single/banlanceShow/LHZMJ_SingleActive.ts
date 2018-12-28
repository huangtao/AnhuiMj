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
         this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
        this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);
        // SetTextureRes(url,this.bmp_cardback);

        this.HuiCardShowGreenZZ(card);
        
       
            
    }

    /**
     * 是否显示显示绿色遮罩
     */
    public set ShowGreenZZ(isShow:boolean){
        // this.bmp_greenZZ.node.active=isShow;
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
