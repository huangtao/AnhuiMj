import BBMJ_SingleCardBase from "../../BBMJ_SingleCardBase";
import { BBMJMahjongDef, BBMJ } from "../../../ConstDef/BBMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_HunPi extends BBMJ_SingleCardBase {

    @property(cc.Sprite)
    bmp_cardback: cc.Sprite=null;

    @property(cc.Sprite)
    bmp_cardcolor: cc.Sprite=null;

    @property(cc.Sprite)
    bmp_greenZZ: cc.Sprite=null;

        @property(cc.Sprite)
    bmp_greenZZbg: cc.Sprite=null;

    onLoad() {
        // init logic
        
    }
    
    public init() {
        super.init();
    }
    /**
     * 显示牌
     * @param card 
     */
    public ShowCard(card:number):void{
        if(card==BBMJMahjongDef.gInvalidMahjongValue){
            return;
        }
        this.ShowGreenZZ=false;//隐藏绿色遮罩
        
        // let url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
        // this.bmp_cardback.spriteFrame=BBMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
        // this.bmp_cardcolor.spriteFrame=BBMJ.ins.iclass.getMahjongPaiHuaRes(card);

         if (card == BBMJMahjongDef.gInvalidMahjongValue) {
            this.bmp_cardback.node.active = false;
            this.bmp_cardcolor.node.active = false;
            this.ShowGreenZZ=false;
            console.log("牌值为无效值");
        }
        else {
            this.bmp_cardback.node.active = true;
            this.bmp_cardcolor.node.active = true;
         //   this.bmp_greenZZ.node.active = true;
            if (BBMJ.ins.iclass.is2D()) {
                this.bmp_cardback.node.x = 0;
                this.bmp_cardback.node.y = 0;
                this.bmp_cardback.node.scaleX = 0.7;
                this.bmp_cardback.node.scaleY = 0.7;
                this.bmp_cardback.node.width = 87;
                this.bmp_cardback.node.height = 124;
                this.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjongPaiBeiRes("pb3_active_self_1280");

                this.bmp_cardcolor.node.x = 0;
                this.bmp_cardcolor.node.y = 0;
                this.bmp_cardcolor.node.scaleX = 0.7;
                this.bmp_cardcolor.node.scaleY = 0.7;
                this.bmp_cardcolor.node.width = 68;
                this.bmp_cardcolor.node.height = 95;
                this.bmp_cardcolor.node.skewX = 0;

                this.bmp_greenZZ.node.x = 0;
                this.bmp_greenZZ.node.y = 0;
                this.bmp_greenZZ.node.scaleX = 0.7;
                this.bmp_greenZZ.node.scaleY = 0.7;
                this.bmp_greenZZ.node.width = 73;
                this.bmp_greenZZ.node.height = 106;
                this.bmp_greenZZ.node.skewX = 0;
            } else {
                this.bmp_cardback.node.x = 13;
                this.bmp_cardback.node.y = 15;
                this.bmp_cardback.node.scaleX = -0.9;
                this.bmp_cardback.node.scaleY = 0.9;
                this.bmp_cardback.node.width = 96;
                this.bmp_cardback.node.height = 106;
                this.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_04");

                this.bmp_cardcolor.node.x = 13;
                this.bmp_cardcolor.node.y = 29;
                this.bmp_cardcolor.node.scaleX = 0.7;
                this.bmp_cardcolor.node.scaleY = 0.7;
                this.bmp_cardcolor.node.width = 68;
                this.bmp_cardcolor.node.height = 95;
                this.bmp_cardcolor.node.skewX = -6;

                this.bmp_greenZZ.node.x = 13;
                this.bmp_greenZZ.node.y = 15;
                this.bmp_greenZZ.node.scaleX = 0.9;
                this.bmp_greenZZ.node.scaleY = 0.6;
                this.bmp_greenZZ.node.width = 79;
                this.bmp_greenZZ.node.height = 111;
                this.bmp_greenZZbg.node.width = 79;
                this.bmp_greenZZbg.node.height = 150;
                this.bmp_greenZZ.node.skewX = -5;
            }
            console.log("牌值为有效值");
            //var url = `gameres/gameCommonRes/Texture/Mahjong/PaiHua/mahjong_${MahjongAlgorithm.GetMahjongColor(card)}_${MahjongAlgorithm.GetMahjongValue(card)}`;
            //SetTextureRes(url, this.card);
            this.bmp_cardcolor.spriteFrame = BBMJ.ins.iclass.getMahjongPaiHuaRes(card);
        }


        this.bmp_cardback.node.active=true;
        this.bmp_cardcolor.node.active=true;
        this.node.active=true;
    }
    /**
     * 显示牌(有绿色遮罩)
     * @param card 
     */
    public ShowCardHaveZZ(card:number):void{
        this.ShowCard(card);
        this.ShowGreenZZ=true;
    }

    /**
     * 是否显示绿色遮罩
     */
    public set ShowGreenZZ(isShow:boolean){
        this.bmp_greenZZ.node.active=isShow;
    }

    /**
     * 隐藏牌
     */
    public HideCard():void{
        this.node.active=false;
        this.bmp_cardback.node.active=false;
        this.bmp_cardcolor.node.active=false;
        this.bmp_greenZZ.node.active=false;
    }
}
