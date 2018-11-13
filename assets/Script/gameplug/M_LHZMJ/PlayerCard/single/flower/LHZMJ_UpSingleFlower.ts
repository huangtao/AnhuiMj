import { LHZMJ } from "../../../ConstDef/LHZMJMahjongDef";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";
import LHZMJ_SingleFlowerBase from "../LHZMJ_SingleFlowerBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_UpSingleFlower extends LHZMJ_SingleFlowerBase {


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
        // this._bmp_cardcolor.x = 51;
        // this._bmp_cardcolor.y = 0;
        // this._bmp_cardcolor.scaleX = 0.5;
        // this._bmp_cardcolor.scaleY = 0.5;
        // this._bmp_cardcolor.rotation = 90;
    }
    
    /**
     * 尺寸
     * */
    public get size(): { width: number,height: number } {
        return { width: 52*0.8,height: 45*0.8 };
    }
}
