import { BBMJ } from "../../../ConstDef/BBMJMahjongDef";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";
import BBMJ_SingleFlowerBase from "../BBMJ_SingleFlowerBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_DownSingleFlower extends BBMJ_SingleFlowerBase {


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
        if(!BBMJ.ins.iclass.is2D()){
        this.bmp_cardcolor.spriteFrame=BBMJ.ins.iclass.getMahjongPaiHuaRes(card);
        this.bmp_cardback.node.active=true;
        this.bmp_cardcolor.node.active=true;
       // this.bmp_cardback.node.scale = 1;
       
    }else{
        this.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
        this.bmp_cardcolor.node.scale = 0.45;
        this.bmp_cardcolor.spriteFrame=BBMJ.ins.iclass.getMahjongPaiHuaRes(card);
        this.bmp_cardback.node.active=true;
        this.bmp_cardcolor.node.active=true;
        }
        
        // this._bmp_cardcolor.x = 2;
        // this._bmp_cardcolor.y = 34;
        // this._bmp_cardcolor.scaleX = 0.5;
        // this._bmp_cardcolor.scaleY = 0.5;
        // this._bmp_cardcolor.rotation=-90;
    }
    
    /**
     * 尺寸
     * */
    public get size(): { width: number,height: number } {
        return { width: 52*0.8,height: 45*0.8 };
    }
}
