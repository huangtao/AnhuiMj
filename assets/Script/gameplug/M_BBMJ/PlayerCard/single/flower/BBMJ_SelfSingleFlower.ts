import { SetTextureRes } from "../../../../MJCommon/MJ_Function";
import { BBMJ } from "../../../ConstDef/BBMJMahjongDef";
import BBMJ_SingleFlowerBase from "../BBMJ_SingleFlowerBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_SelfSingleFlower extends BBMJ_SingleFlowerBase {

    onLoad() {
        // init logic
        
    }

    /**
     * 显示牌
     * */
    public showCard(card: number): void {
        if(card==this._cardValue){
            return;
        }
        super.showCard(card);
        // let url="";

        // url=BBMJ.ins.iclass.getMahjongResName(card);
        // SetTextureRes(url,this.bmp_cardcolor);
        if(BBMJ.ins.iclass.is2D()){
            this.bmp_cardback.spriteFrame=BBMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
            this.bmp_cardcolor.node.scale = 0.45;
        }else{
            // this.bmp_cardcolor.node.scale =0.5;
        }
        this.bmp_cardcolor.spriteFrame=BBMJ.ins.iclass.getMahjongPaiHuaRes(card);

        this.bmp_cardback.node.active=true;
        this.bmp_cardcolor.node.active=true;
    }
    
    /**
     * 尺寸
     * */
    public get size(): { width: number,height: number } {//花牌设定比牌池牌小一点
        return { width: 39*0.8,height: 58*0.8 };
    }
}
