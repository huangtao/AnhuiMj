import MGMJ_SingleFixedBase from "../MGMJ_SingleFixedBase";
import { enFixedCardType, MGMJ } from "../../../ConstDef/MGMJMahjongDef";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MGMJ_SelfSingleFixed extends MGMJ_SingleFixedBase {

    

    onLoad() {
        // init logic
        
    }

    /**
     * 显示定牌
     * */
    public showCard(card: number,fixedType: enFixedCardType,index:number,chiType:number,pos:number): void {
        super.showCard(card,fixedType,index,chiType,pos);
        this.arrangeCard();
    }
    /**
     * 碰转杠
     * */
    public changePeng2Gang(card: number): boolean {
        if(super.changePeng2Gang(card)) {
            this.arrangeCard();
            return true;
        }

        return false;
    }
    
    protected arrangeCard(){
        let url="";
        if(MGMJ.ins.iclass.is2D()){
            this.node.scaleX=1;
            this.node.scaleY=1;
          
            this.bmp_cardbackAry[0].node.x=-53;
            this.bmp_cardbackAry[0].node.y=0;
            this.bmp_cardbackAry[0].node.width=78;
            this.bmp_cardbackAry[0].node.height=110;

            this.bmp_cardbackAry[1].node.x=14;
            this.bmp_cardbackAry[1].node.y=0;
            this.bmp_cardbackAry[1].node.width=78;
            this.bmp_cardbackAry[1].node.height=110;
            
            this.bmp_cardbackAry[2].node.x=81;
            this.bmp_cardbackAry[2].node.y=0;
            this.bmp_cardbackAry[2].node.width=78;
            this.bmp_cardbackAry[2].node.height=110;

            this.bmp_cardbackAry[3].node.x=14;
            this.bmp_cardbackAry[3].node.y=18;
            this.bmp_cardbackAry[3].node.width=78;
            this.bmp_cardbackAry[3].node.height=110;

            for(let i=0;i<4;i++){
                this.bmp_cardcolorAry[i].node.x=0;
                this.bmp_cardcolorAry[i].node.y=15;
                this.bmp_cardcolorAry[i].node.skewX=0;
                this.bmp_cardcolorAry[i].node.scaleX=1;
                this.bmp_cardcolorAry[i].node.scaleY=0.8;
            }

            this.bmp_cardHideAry[0].node.x=-67;
            this.bmp_cardHideAry[0].node.y=0;
            this.bmp_cardHideAry[0].node.scaleX=1;
            this.bmp_cardHideAry[0].node.scaleY=1;
            this.bmp_cardHideAry[0].node.skewX=0;
            this.bmp_cardHideAry[1].node.x=0;
            this.bmp_cardHideAry[1].node.y=0;
            this.bmp_cardHideAry[1].node.scaleX=1;
            this.bmp_cardHideAry[1].node.scaleY=1;
            this.bmp_cardHideAry[1].node.skewX=0;
            this.bmp_cardHideAry[2].node.x=67;
            this.bmp_cardHideAry[2].node.y=0;
            this.bmp_cardHideAry[2].node.scaleX=1;
            this.bmp_cardHideAry[2].node.scaleY=1;
            this.bmp_cardHideAry[2].node.skewX=0;
            switch(this.fixedType) {
                case enFixedCardType.FixedCardType_AGang: {
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_backcard_self_1280`;
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
                    this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg_back@2x");
                    this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg_back@2x");
                    this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg_back@2x");
                    this.bmp_cardbackAry[3].spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardcolorAry[3].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);

                    this.bmp_cardbackAry[0].node.active=true;
                    this.bmp_cardbackAry[1].node.active=true;
                    this.bmp_cardbackAry[2].node.active=true;
                    this.bmp_cardbackAry[3].node.active=true;

                    this.bmp_cardcolorAry[0].node.active=false;
                    this.bmp_cardcolorAry[1].node.active=false;
                    this.bmp_cardcolorAry[2].node.active=false;
                    this.bmp_cardcolorAry[3].node.active=true;
                    // this.setPos(MGMJ.ins.iclass);
                    for(let i=0;i<3;i++){
                        this.bmp_lightArt[i].node.active = false;
                    }
                    break;
                }
                case enFixedCardType.FixedCardType_MGang:
                case enFixedCardType.FixedCardType_BGang: {
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
                    this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardbackAry[3].spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[3].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    
                    this.bmp_cardbackAry[0].node.active=true;
                    this.bmp_cardbackAry[1].node.active=true;
                    this.bmp_cardbackAry[2].node.active=true;
                    this.bmp_cardbackAry[3].node.active=true;

                    for (var i = 0; i < 4; ++i) {
                        this.bmp_cardbackAry[i].node.scaleX=0.9;
                        this.bmp_cardbackAry[i].node.scaleY=0.9;
                    }

                    this.bmp_cardcolorAry[0].node.active=true;
                    this.bmp_cardcolorAry[1].node.active=false;
                    this.bmp_cardcolorAry[2].node.active=true;
                    this.bmp_cardcolorAry[3].node.active=true;
                    this.setPos();
                    break;
                }
                case enFixedCardType.FixedCardType_Peng: {
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
                    this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);

                    this.bmp_cardbackAry[0].node.active=true;
                    this.bmp_cardbackAry[1].node.active=true;
                    this.bmp_cardbackAry[2].node.active=true;
                    this.bmp_cardbackAry[3].node.active=false;
                    this.bmp_cardcolorAry[0].node.active=true;
                    this.bmp_cardcolorAry[1].node.active=true;
                    this.bmp_cardcolorAry[2].node.active=true;
                    this.setPos();
                    break;
                }
                case enFixedCardType.FixedCardType_Chi: {
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
                    this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType - 2);
                    this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType - 1);
                    this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType);

                    this.bmp_cardbackAry[0].node.active=true;
                    this.bmp_cardbackAry[1].node.active=true;
                    this.bmp_cardbackAry[2].node.active=true;
                    this.bmp_cardbackAry[3].node.active=false;
                    this.bmp_cardcolorAry[0].node.active=true;
                    this.bmp_cardcolorAry[1].node.active=true;
                    this.bmp_cardcolorAry[2].node.active=true;
                    this.setPos();
                    break;
                }
            }
        }else{
            
            switch(this.fixedType) {
                case enFixedCardType.FixedCardType_AGang: {
                    
                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_2_17");
                        this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_2_16");
                        this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_2_15");
                        this.bmp_cardbackAry[3].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_16");
                        this.bmp_cardcolorAry[3].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_2_14");
                        this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_2_13");
                        this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_2_12");
                        this.bmp_cardbackAry[3].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_13");
                        this.bmp_cardcolorAry[3].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_2_11");
                        this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_2_10");
                        this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_2_9");
                        this.bmp_cardbackAry[3].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_10");
                        this.bmp_cardcolorAry[3].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_2_8");
                        this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_2_7");
                        this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_2_6");
                        this.bmp_cardbackAry[3].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_7");
                        this.bmp_cardcolorAry[3].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else{
                        cc.log("牌序异常！："+this._cardIndex);
                    }

                   
                    
                    this.bmp_cardbackAry[0].node.active=true;
                    this.bmp_cardbackAry[1].node.active=true;
                    this.bmp_cardbackAry[2].node.active=true;
                    this.bmp_cardbackAry[3].node.active=true;

                    this.bmp_cardcolorAry[0].node.active=false;
                    this.bmp_cardcolorAry[1].node.active=false;
                    this.bmp_cardcolorAry[2].node.active=false;
                    this.bmp_cardcolorAry[3].node.active=true;
                    // this.setPos(MGMJ.ins.iclass);
                    // this.light_node.active = false;
                    for(let i=0;i<3;i++){
                        this.bmp_lightArt[i].node.active = false;
                    }
                    break;
                }
                case enFixedCardType.FixedCardType_MGang: 
                case enFixedCardType.FixedCardType_BGang: {
                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_17");
                        this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_16");
                        this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_15");
                        this.bmp_cardbackAry[3].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_16");
                        this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_14");
                        this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_13");
                        this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_12");
                        this.bmp_cardbackAry[3].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_13");
                        this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_11");
                        this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_10");
                        this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_9");
                        this.bmp_cardbackAry[3].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_10");
                        this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_8");
                        this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_7");
                        this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_6");
                        this.bmp_cardbackAry[3].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_7");
                        this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else{
                        cc.log("牌序异常！："+this._cardIndex);
                    }

                    this.bmp_cardbackAry[0].node.active=true;
                    this.bmp_cardbackAry[1].node.active=true;
                    this.bmp_cardbackAry[2].node.active=true;
                    this.bmp_cardbackAry[3].node.active=true;

                    this.bmp_cardcolorAry[0].node.active=true;
                    this.bmp_cardcolorAry[1].node.active=true;
                    this.bmp_cardcolorAry[2].node.active=true;
                    this.bmp_cardcolorAry[3].node.active=true;
                    this.setPos();
                    break;
                }
                case enFixedCardType.FixedCardType_Peng: {                  
                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_17");
                        this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_16");
                        this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_15");
                        this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_14");
                        this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_13");
                        this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_12");
                        this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_11");
                        this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_10");
                        this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_9");
                        this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_7");
                        this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_7");
                        this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_7");
                        this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else{
                        cc.log("牌序异常！："+this._cardIndex);
                    }

                    this.bmp_cardbackAry[0].node.active=true;
                    this.bmp_cardbackAry[1].node.active=true;
                    this.bmp_cardbackAry[2].node.active=true;
                    this.bmp_cardbackAry[3].node.active=false;
                    this.bmp_cardcolorAry[0].node.active=true;
                    this.bmp_cardcolorAry[1].node.active=true;
                    this.bmp_cardcolorAry[2].node.active=true;
                    this.setPos();
                    break;
                }
                case enFixedCardType.FixedCardType_Chi: {                     

                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_17");
                        this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_16");
                        this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_15");
                        //this.bmp_cardbackAry[3].spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                        this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType -2);
                        this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType -1);
                        this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType);
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_14");
                        this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_13");
                        this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_12");
                        //this.bmp_cardbackAry[3].spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                        this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType -2);
                        this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType -1);
                        this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType);
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_11");
                        this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_10");
                        this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_9");
                        //this.bmp_cardbackAry[3].spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                        this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType -2);
                        this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType -1);
                        this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType);
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_8");
                        this.bmp_cardbackAry[1].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_7");
                        this.bmp_cardbackAry[2].spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_1_6");
                        //this.bmp_cardbackAry[3].spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                        this.bmp_cardcolorAry[0].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType -2);
                        this.bmp_cardcolorAry[1].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType -1);
                        this.bmp_cardcolorAry[2].spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType);
                    }else{
                        cc.log("牌序异常！："+this._cardIndex);
                    }

                    this.bmp_cardbackAry[0].node.active=true;
                    this.bmp_cardbackAry[1].node.active=true;
                    this.bmp_cardbackAry[2].node.active=true;
                    this.bmp_cardbackAry[3].node.active=false;
                    this.bmp_cardcolorAry[0].node.active=true;
                    this.bmp_cardcolorAry[1].node.active=true;
                    this.bmp_cardcolorAry[2].node.active=true;
                    this.setPos();
                    break;
                }
            }
            this.set3DSize();
        }
        this.node.active=true;
    }
    private setPos(type:number = 0):void{
        if(MGMJ.ins.iclass.is2D()){
            this.bmp_lightArt[0].node.y = -60;
            this.bmp_lightArt[1].node.y = -60;
            this.bmp_lightArt[2].node.y = -60;
        }else{
            this.bmp_lightArt[0].node.y = -38;
            this.bmp_lightArt[1].node.y = -38;
            this.bmp_lightArt[2].node.y = -38;
        }
    }

    private set3DSize(){
        // if(fixedType != enFixedCardType.FixedCardType_BGang){
            //碰牌时已经放大 补杠时不能再放大父节点
            this.node.scaleX=1.5;
            this.node.scaleY=1.5;
        // }
        switch(this._cardIndex){
            case 1:{
                    this.bmp_cardbackAry[0].node.x=-35;
                    this.bmp_cardbackAry[0].node.y=3;
                    this.bmp_cardbackAry[0].node.width=68;
                    this.bmp_cardbackAry[0].node.height=72;
                    this.bmp_cardbackAry[0].node.setLocalZOrder(1);

                    this.bmp_cardbackAry[1].node.x=9.1;
                    this.bmp_cardbackAry[1].node.y=3;
                    this.bmp_cardbackAry[1].node.width=68;
                    this.bmp_cardbackAry[1].node.height=72;
                    this.bmp_cardbackAry[1].node.setLocalZOrder(2);

                    this.bmp_cardbackAry[2].node.x=53;
                    this.bmp_cardbackAry[2].node.y=3;
                    this.bmp_cardbackAry[2].node.width=66;
                    this.bmp_cardbackAry[2].node.height=72;
                    this.bmp_cardbackAry[2].node.setLocalZOrder(3);

                    this.bmp_cardbackAry[3].node.x=4.5;
                    this.bmp_cardbackAry[3].node.y=12.8;
                    this.bmp_cardbackAry[3].node.width=66;
                    this.bmp_cardbackAry[3].node.height=72;
                    this.bmp_cardbackAry[3].node.setLocalZOrder(6);
                this.bmp_cardcolorAry[0].node.x=-2;
                this.bmp_cardcolorAry[0].node.y=6.66;
                this.bmp_cardcolorAry[0].node.scaleX=0.5;
                this.bmp_cardcolorAry[0].node.scaleY=0.52;
                this.bmp_cardcolorAry[0].node.skewX=12;
                this.bmp_cardcolorAry[0].node.width=68;
                this.bmp_cardcolorAry[0].node.height=95;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=-2;
                this.bmp_cardcolorAry[2].node.y=6.666;
                this.bmp_cardcolorAry[2].node.scaleX=0.5;
                this.bmp_cardcolorAry[2].node.scaleY=0.517;
                this.bmp_cardcolorAry[2].node.skewX=10;
                this.bmp_cardcolorAry[2].node.width=68;
                this.bmp_cardcolorAry[2].node.height=95;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);


                this.bmp_cardcolorAry[1].node.x=-1;
                this.bmp_cardcolorAry[1].node.y=6.444;
                this.bmp_cardcolorAry[1].node.scaleX=0.5;
                this.bmp_cardcolorAry[1].node.scaleY=0.518;
                this.bmp_cardcolorAry[1].node.skewX=11;
                 this.bmp_cardcolorAry[1].node.width=68;
                this.bmp_cardcolorAry[1].node.height=95;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                
                this.bmp_cardcolorAry[3].node.x=-2;
                this.bmp_cardcolorAry[3].node.y=6.444;
                this.bmp_cardcolorAry[3].node.scaleX=0.5;
                this.bmp_cardcolorAry[3].node.scaleY=0.518;
                this.bmp_cardcolorAry[3].node.skewX=10;
                this.bmp_cardcolorAry[3].node.width=68;
                this.bmp_cardcolorAry[3].node.height=95;
                this.bmp_cardcolorAry[3].node.setLocalZOrder(8);

                this.bmp_cardHideAry[0].node.x=-80.6;
                this.bmp_cardHideAry[0].node.y=14;
                this.bmp_cardHideAry[0].node.scaleX=0.9;
                this.bmp_cardHideAry[0].node.scaleY=0.6;
                this.bmp_cardHideAry[0].node.skewX=11;

                this.bmp_cardHideAry[1].node.x=-2.7;
                this.bmp_cardHideAry[1].node.y=14;
                this.bmp_cardHideAry[1].node.scaleX=0.9;
                this.bmp_cardHideAry[1].node.scaleY=0.6;
                this.bmp_cardHideAry[1].node.skewX=8;

                this.bmp_cardHideAry[2].node.x=76.3;
                this.bmp_cardHideAry[2].node.y=14;
                this.bmp_cardHideAry[2].node.scaleX=0.9;
                this.bmp_cardHideAry[2].node.scaleY=0.6;
                this.bmp_cardHideAry[2].node.skewX=7;
                break;
            }
            case 2:{
                // if(fixedType != enFixedCardType.FixedCardType_BGang){
                    this.bmp_cardbackAry[0].node.x=-35;
                    this.bmp_cardbackAry[0].node.y=3;
                    this.bmp_cardbackAry[0].node.width=64;
                    this.bmp_cardbackAry[0].node.height=72;
                    this.bmp_cardbackAry[0].node.setLocalZOrder(1);

                    this.bmp_cardbackAry[1].node.x=9.1;
                    this.bmp_cardbackAry[1].node.y=3;
                    this.bmp_cardbackAry[1].node.width=62;
                    this.bmp_cardbackAry[1].node.height=72;
                    this.bmp_cardbackAry[1].node.setLocalZOrder(2);

                    this.bmp_cardbackAry[2].node.x=53;
                    this.bmp_cardbackAry[2].node.y=3;
                    this.bmp_cardbackAry[2].node.width=60;
                    this.bmp_cardbackAry[2].node.height=72;
                    this.bmp_cardbackAry[2].node.setLocalZOrder(3);

                    this.bmp_cardbackAry[3].node.x=5.5;
                    this.bmp_cardbackAry[3].node.y=12.8;
                    this.bmp_cardbackAry[3].node.width=62;
                    this.bmp_cardbackAry[3].node.height=72;
                    this.bmp_cardbackAry[3].node.setLocalZOrder(6);
                // }
                this.bmp_cardcolorAry[0].node.x=-1;
                this.bmp_cardcolorAry[0].node.y=6.66;
                this.bmp_cardcolorAry[0].node.scaleX=0.5;
                this.bmp_cardcolorAry[0].node.scaleY=0.52;
                this.bmp_cardcolorAry[0].node.skewX=9;
                this.bmp_cardcolorAry[0].node.width=68;
                this.bmp_cardcolorAry[0].node.height=95;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=-0.5;
                this.bmp_cardcolorAry[2].node.y=6.666;
                this.bmp_cardcolorAry[2].node.scaleX=0.5;
                this.bmp_cardcolorAry[2].node.scaleY=0.517;
                this.bmp_cardcolorAry[2].node.skewX=6;
                this.bmp_cardcolorAry[2].node.width=68;
                this.bmp_cardcolorAry[2].node.height=95;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);


                this.bmp_cardcolorAry[1].node.x=-1.5;
                this.bmp_cardcolorAry[1].node.y=6.444;
                this.bmp_cardcolorAry[1].node.scaleX=0.5;
                this.bmp_cardcolorAry[1].node.scaleY=0.518;
                this.bmp_cardcolorAry[1].node.skewX=7;
                this.bmp_cardcolorAry[1].node.width=68;
                this.bmp_cardcolorAry[1].node.height=95;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                
                this.bmp_cardcolorAry[3].node.x=-0.5;
                this.bmp_cardcolorAry[3].node.y=6.444;
                this.bmp_cardcolorAry[3].node.scaleX=0.5;
                this.bmp_cardcolorAry[3].node.scaleY=0.518;
                this.bmp_cardcolorAry[3].node.skewX=7;
                this.bmp_cardcolorAry[3].node.width=68;
                this.bmp_cardcolorAry[3].node.height=95;
                this.bmp_cardcolorAry[3].node.setLocalZOrder(8);

                this.bmp_cardHideAry[0].node.x=-80.6;
                this.bmp_cardHideAry[0].node.y=14;
                this.bmp_cardHideAry[0].node.scaleX=0.9;
                this.bmp_cardHideAry[0].node.scaleY=0.6;
                this.bmp_cardHideAry[0].node.skewX=11;

                this.bmp_cardHideAry[1].node.x=-2.7;
                this.bmp_cardHideAry[1].node.y=14;
                this.bmp_cardHideAry[1].node.scaleX=0.9;
                this.bmp_cardHideAry[1].node.scaleY=0.6;
                this.bmp_cardHideAry[1].node.skewX=8;

                this.bmp_cardHideAry[2].node.x=76.3;
                this.bmp_cardHideAry[2].node.y=14;
                this.bmp_cardHideAry[2].node.scaleX=0.9;
                this.bmp_cardHideAry[2].node.scaleY=0.6;
                this.bmp_cardHideAry[2].node.skewX=7;
                break;
            }
            case 3:{
                // if(fixedType != enFixedCardType.FixedCardType_BGang){
                    this.bmp_cardbackAry[0].node.x=-35;
                    this.bmp_cardbackAry[0].node.y=3;
                    this.bmp_cardbackAry[0].node.width=58;
                    this.bmp_cardbackAry[0].node.height=72;
                    this.bmp_cardbackAry[0].node.setLocalZOrder(1);

                    this.bmp_cardbackAry[1].node.x=9.1;
                    this.bmp_cardbackAry[1].node.y=3.1;
                    this.bmp_cardbackAry[1].node.width=56;
                    this.bmp_cardbackAry[1].node.height=72;
                    this.bmp_cardbackAry[1].node.setLocalZOrder(2);

                    this.bmp_cardbackAry[2].node.x=53;
                    this.bmp_cardbackAry[2].node.y=3;
                    this.bmp_cardbackAry[2].node.width=54;
                    this.bmp_cardbackAry[2].node.height=72;
                    this.bmp_cardbackAry[2].node.setLocalZOrder(3);

                    this.bmp_cardbackAry[3].node.x=7.5;
                    this.bmp_cardbackAry[3].node.y=12.8;
                    this.bmp_cardbackAry[3].node.width=56;
                    this.bmp_cardbackAry[3].node.height=72;
                    this.bmp_cardbackAry[3].node.setLocalZOrder(6);
                // }
                this.bmp_cardcolorAry[0].node.x=-2;
                this.bmp_cardcolorAry[0].node.y=6.66;
                this.bmp_cardcolorAry[0].node.scaleX=0.5;
                this.bmp_cardcolorAry[0].node.scaleY=0.52;
                this.bmp_cardcolorAry[0].node.skewX=5;
                // this.bmp_cardcolorAry[0].node.width=68;
                // this.bmp_cardcolorAry[0].node.height=95;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=0;
                this.bmp_cardcolorAry[2].node.y=6.666;
                this.bmp_cardcolorAry[2].node.scaleX=0.5;
                this.bmp_cardcolorAry[2].node.scaleY=0.517;
                this.bmp_cardcolorAry[2].node.skewX=2;
                // this.bmp_cardcolorAry[2].node.width=68;
                // this.bmp_cardcolorAry[2].node.height=95;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);


                this.bmp_cardcolorAry[1].node.x=0;
                this.bmp_cardcolorAry[1].node.y=6.444;
                this.bmp_cardcolorAry[1].node.scaleX=0.5;
                this.bmp_cardcolorAry[1].node.scaleY=0.518;
                this.bmp_cardcolorAry[1].node.skewX=4;
                //  this.bmp_cardcolorAry[1].node.width=68;
                // this.bmp_cardcolorAry[1].node.height=95;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                
                this.bmp_cardcolorAry[3].node.x=0;
                this.bmp_cardcolorAry[3].node.y=6.444;
                this.bmp_cardcolorAry[3].node.scaleX=0.5;
                this.bmp_cardcolorAry[3].node.scaleY=0.518;
                this.bmp_cardcolorAry[3].node.skewX=4;
                // this.bmp_cardcolorAry[3].node.width=68;
                // this.bmp_cardcolorAry[3].node.height=95;
                this.bmp_cardcolorAry[3].node.setLocalZOrder(8);

                this.bmp_cardHideAry[0].node.x=-80.6;
                this.bmp_cardHideAry[0].node.y=14;
                this.bmp_cardHideAry[0].node.scaleX=0.9;
                this.bmp_cardHideAry[0].node.scaleY=0.6;
                this.bmp_cardHideAry[0].node.skewX=11;

                this.bmp_cardHideAry[1].node.x=-2.7;
                this.bmp_cardHideAry[1].node.y=14;
                this.bmp_cardHideAry[1].node.scaleX=0.9;
                this.bmp_cardHideAry[1].node.scaleY=0.6;
                this.bmp_cardHideAry[1].node.skewX=8;

                this.bmp_cardHideAry[2].node.x=76.3;
                this.bmp_cardHideAry[2].node.y=14;
                this.bmp_cardHideAry[2].node.scaleX=0.9;
                this.bmp_cardHideAry[2].node.scaleY=0.6;
                this.bmp_cardHideAry[2].node.skewX=7;
                break;
            }
            case 4:{
                    this.bmp_cardbackAry[0].node.x=-35;
                    this.bmp_cardbackAry[0].node.y=3;
                    this.bmp_cardbackAry[0].node.width=52;
                    this.bmp_cardbackAry[0].node.height=72;
                    this.bmp_cardbackAry[0].node.setLocalZOrder(1);

                    this.bmp_cardbackAry[1].node.x=8.8;
                    this.bmp_cardbackAry[1].node.y=3.1;
                    this.bmp_cardbackAry[1].node.width=54;
                    this.bmp_cardbackAry[1].node.height=72;
                    this.bmp_cardbackAry[1].node.setLocalZOrder(2);

                    this.bmp_cardbackAry[2].node.x=53;
                    this.bmp_cardbackAry[2].node.y=3;
                    this.bmp_cardbackAry[2].node.width=54;
                    this.bmp_cardbackAry[2].node.height=72;
                    this.bmp_cardbackAry[2].node.setLocalZOrder(3);

                    this.bmp_cardbackAry[3].node.x=8.5;
                    this.bmp_cardbackAry[3].node.y=12.8;
                    this.bmp_cardbackAry[3].node.width=54;
                    this.bmp_cardbackAry[3].node.height=72;
                    this.bmp_cardbackAry[3].node.setLocalZOrder(6);
                this.bmp_cardcolorAry[0].node.x=0;
                this.bmp_cardcolorAry[0].node.y=6.66;
                this.bmp_cardcolorAry[0].node.scaleX=0.5;
                this.bmp_cardcolorAry[0].node.scaleY=0.52;
                this.bmp_cardcolorAry[0].node.skewX=1;
                this.bmp_cardcolorAry[0].node.width=68;
                this.bmp_cardcolorAry[0].node.height=95;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=0;
                this.bmp_cardcolorAry[2].node.y=6.666;
                this.bmp_cardcolorAry[2].node.scaleX=0.5;
                this.bmp_cardcolorAry[2].node.scaleY=0.517;
                this.bmp_cardcolorAry[2].node.skewX=-1;
                this.bmp_cardcolorAry[2].node.width=68;
                this.bmp_cardcolorAry[2].node.height=95;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);

                this.bmp_cardcolorAry[1].node.x=0;
                this.bmp_cardcolorAry[1].node.y=6.444;
                this.bmp_cardcolorAry[1].node.scaleX=0.5;
                this.bmp_cardcolorAry[1].node.scaleY=0.518;
                this.bmp_cardcolorAry[1].node.skewX=0;
                this.bmp_cardcolorAry[1].node.width=68;
                this.bmp_cardcolorAry[1].node.height=95;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                
                this.bmp_cardcolorAry[3].node.x=0;
                this.bmp_cardcolorAry[3].node.y=6.444;
                this.bmp_cardcolorAry[3].node.scaleX=0.5;
                this.bmp_cardcolorAry[3].node.scaleY=0.518;
                this.bmp_cardcolorAry[3].node.skewX=0;
                this.bmp_cardcolorAry[3].node.width=68;
                this.bmp_cardcolorAry[3].node.height=95;
                this.bmp_cardcolorAry[3].node.setLocalZOrder(8);

                this.bmp_cardHideAry[0].node.x=-80.6;
                this.bmp_cardHideAry[0].node.y=14;
                this.bmp_cardHideAry[0].node.scaleX=0.9;
                this.bmp_cardHideAry[0].node.scaleY=0.6;
                this.bmp_cardHideAry[0].node.skewX=11;

                this.bmp_cardHideAry[1].node.x=-2.7;
                this.bmp_cardHideAry[1].node.y=14;
                this.bmp_cardHideAry[1].node.scaleX=0.9;
                this.bmp_cardHideAry[1].node.scaleY=0.6;
                this.bmp_cardHideAry[1].node.skewX=8;

                this.bmp_cardHideAry[2].node.x=76.3;
                this.bmp_cardHideAry[2].node.y=14;
                this.bmp_cardHideAry[2].node.scaleX=0.9;
                this.bmp_cardHideAry[2].node.scaleY=0.6;
                this.bmp_cardHideAry[2].node.skewX=7;
                break;
            }
        }
        this.bmp_cardHideAry[0].node.setLocalZOrder(8);
        this.bmp_cardHideAry[1].node.setLocalZOrder(9);
        this.bmp_cardHideAry[2].node.setLocalZOrder(10);
    }
}
