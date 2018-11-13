import HZMJ_SingleFixedBase from "../HZMJ_SingleFixedBase";
import { enFixedCardType, HZMJ } from "../../../ConstDef/HZMJMahjongDef";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_SingleFixed extends HZMJ_SingleFixedBase {

    onLoad() {
        // init logic
        
    }

    /**
     * 显示定牌
     * */
    public showCard(card: number,fixedType: enFixedCardType,pos:number): void {
        super.showCard(card,fixedType,null,0);
        
        this.arrangeCard();
    }

    /**
     * 整理牌阵
     * */
    protected arrangeCard(){
        let url="";
        switch(this.fixedType) {
            case enFixedCardType.FixedCardType_AGang: {
                url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_backcard_self_1280`;
                // SetTextureRes(url,this.bmp_cardbackAry[0]);
                // SetTextureRes(url,this.bmp_cardbackAry[1]);
                // SetTextureRes(url,this.bmp_cardbackAry[2]);
                url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
                // SetTextureRes(url,this.bmp_cardbackAry[3]);//0.6
                // url=HZMJ.ins.iclass.getMahjongResName(this.cardValue);
                // SetTextureRes(url,this.bmp_cardcolorAry[1]);//0.5
                this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardbackAry[3].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);

                this.bmp_cardcolorAry[1].node.y = 19;

                this.bmp_cardbackAry[0].node.active=true;
                this.bmp_cardbackAry[1].node.active=true;
                this.bmp_cardbackAry[2].node.active=true;
                this.bmp_cardbackAry[3].node.active=true;
                for(let i=0;i<3;i++){
                    this.bmp_cardcolorAry[i].node.scaleX=0.4;
                    this.bmp_cardcolorAry[i].node.scaleY=0.4;
                }
                this.bmp_cardcolorAry[0].node.active=false;
                this.bmp_cardcolorAry[1].node.active=true;
                this.bmp_cardcolorAry[2].node.active=false;
                
                break;
            }
            case enFixedCardType.FixedCardType_MGang:
            case enFixedCardType.FixedCardType_BGang: {
                url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
                // SetTextureRes(url,this.bmp_cardbackAry[0]);
                // SetTextureRes(url,this.bmp_cardbackAry[1]);
                // SetTextureRes(url,this.bmp_cardbackAry[2]);
                // SetTextureRes(url,this.bmp_cardbackAry[3]);
                
                // //
                // //=================
                // //
                // url=HZMJ.ins.iclass.getMahjongResName(this.cardValue);
                // SetTextureRes(url,this.bmp_cardcolorAry[0]);
                // SetTextureRes(url,this.bmp_cardcolorAry[1]);
                // SetTextureRes(url,this.bmp_cardcolorAry[2]);
                this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardbackAry[3].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                for(let i=0;i<3;i++){
                    this.bmp_cardcolorAry[i].node.scaleX=0.4;
                    this.bmp_cardcolorAry[i].node.scaleY=0.4;
                }
                this.bmp_cardcolorAry[1].node.y = 19;

                this.bmp_cardbackAry[0].node.active=true;
                this.bmp_cardbackAry[1].node.active=true;
                this.bmp_cardbackAry[2].node.active=true;
                this.bmp_cardbackAry[3].node.active=true;

                this.bmp_cardcolorAry[0].node.active=true;
                this.bmp_cardcolorAry[1].node.active=true;
                this.bmp_cardcolorAry[2].node.active=true;
                
                break;
            }
            case enFixedCardType.FixedCardType_Peng: {
                url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
                // SetTextureRes(url,this.bmp_cardbackAry[0]);
                // SetTextureRes(url,this.bmp_cardbackAry[1]);
                // SetTextureRes(url,this.bmp_cardbackAry[2]);

                // url=HZMJ.ins.iclass.getMahjongResName(this.cardValue);
                // SetTextureRes(url,this.bmp_cardcolorAry[0]);
                // SetTextureRes(url,this.bmp_cardcolorAry[1]);
                // SetTextureRes(url,this.bmp_cardcolorAry[2]);
                this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                for(let i=0;i<3;i++){
                    this.bmp_cardcolorAry[i].node.scaleX=0.4;
                    this.bmp_cardcolorAry[i].node.scaleY=0.4;
                }
              

                this.bmp_cardcolorAry[1].node.y = 6;

                this.bmp_cardbackAry[0].node.active=true;
                this.bmp_cardbackAry[1].node.active=true;
                this.bmp_cardbackAry[2].node.active=true;
                this.bmp_cardbackAry[3].node.active=false;
                this.bmp_cardcolorAry[0].node.active=true;
                this.bmp_cardcolorAry[1].node.active=true;
                this.bmp_cardcolorAry[2].node.active=true;
                break;
            }
        }
        this.node.active=true;
    }
}
