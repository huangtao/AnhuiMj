import { SetTextureRes } from "../../../../MJCommon/MJ_Function";
import { LHZMJ } from "../../../ConstDef/LHZMJMahjongDef";
import LHZMJ_SingleFlowerBase from "../LHZMJ_SingleFlowerBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_SelfSingleFlower extends LHZMJ_SingleFlowerBase {

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

        // url=LHZMJ.ins.iclass.getMahjongResName(card);
        // SetTextureRes(url,this.bmp_cardcolor);
        
        this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);

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
