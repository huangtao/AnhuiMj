import JZMJ_SingleFixedBase from "../JZMJ_SingleFixedBase";
import { enFixedCardType, JZMJ } from "../../../ConstDef/JZMJMahjongDef";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";
import M_JZMJVideoClass from "../../../M_JZMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class JZMJ_OppoSingleFixed extends JZMJ_SingleFixedBase {
    onLoad() {
        // init logic
        
    }
    /**
     * 显示定牌
     * */
    public showCard(card: number,fixedType: enFixedCardType,index:number,chiType:number,pos:number,_JZMJ=JZMJ.ins.iclass): void {
        super.showCard(card,fixedType,index,chiType,pos,_JZMJ);

        this.arrangeCard(_JZMJ);
    }

    /**
     * 碰转杠
     * */
    public changePeng2Gang(card: number,_JZMJ): boolean {
        if(super.changePeng2Gang(card,_JZMJ)) {
            this.arrangeCard(_JZMJ);
            return true;
        }

        return false;
    }

    protected arrangeCard(_JZMJ) {
        let url="";
        if(_JZMJ.is2D()){
            
            this.bmp_cardbackAry[0].node.x=-40.5;
            this.bmp_cardbackAry[0].node.y=0;
            this.bmp_cardbackAry[0].node.width=42;
            this.bmp_cardbackAry[0].node.height=58;
            this.bmp_cardbackAry[0].node.scaleX=1;

            this.bmp_cardbackAry[1].node.x=0;
            this.bmp_cardbackAry[1].node.y=0;
            this.bmp_cardbackAry[1].node.width=42;
            this.bmp_cardbackAry[1].node.height=58;
            this.bmp_cardbackAry[1].node.scaleX=1;
            
            this.bmp_cardbackAry[2].node.x=40.5;
            this.bmp_cardbackAry[2].node.y=0;
            this.bmp_cardbackAry[2].node.width=42;
            this.bmp_cardbackAry[2].node.height=58;
            this.bmp_cardbackAry[2].node.scaleX=1;

            this.bmp_cardbackAry[3].node.x=0;
            this.bmp_cardbackAry[3].node.y=10;
            this.bmp_cardbackAry[3].node.width=42;
            this.bmp_cardbackAry[3].node.height=58;
            this.bmp_cardbackAry[3].node.scaleX=1;

            this.bmp_cardcolorAry[0].node.x=-40.5;
            this.bmp_cardcolorAry[0].node.y=5;
            this.bmp_cardcolorAry[0].node.skewX=0;
            this.bmp_cardcolorAry[0].node.scaleX=0.45;
            this.bmp_cardcolorAry[0].node.scaleY=0.45;

            this.bmp_cardcolorAry[1].node.x=0;
            this.bmp_cardcolorAry[1].node.y=15;
            this.bmp_cardcolorAry[1].node.skewX=0;
            this.bmp_cardcolorAry[1].node.scaleX=0.45;
            this.bmp_cardcolorAry[1].node.scaleY=0.45;

            this.bmp_cardcolorAry[2].node.x=40.5;
            this.bmp_cardcolorAry[2].node.y=5;
            this.bmp_cardcolorAry[2].node.skewX=0;
            this.bmp_cardcolorAry[2].node.scaleX=0.45;
            this.bmp_cardcolorAry[2].node.scaleY=0.45;

            this.bmp_cardHideAry[0].node.x=-40.7;
            this.bmp_cardHideAry[0].node.y=5;
            this.bmp_cardHideAry[0].node.scaleX=0.45;
            this.bmp_cardHideAry[0].node.scaleY=0.45;
            this.bmp_cardHideAry[0].node.skewX=0;

            this.bmp_cardHideAry[1].node.x=0;
            this.bmp_cardHideAry[1].node.y=5;
            this.bmp_cardHideAry[1].node.scaleX=0.45;
            this.bmp_cardHideAry[1].node.scaleY=0.45;
            this.bmp_cardHideAry[1].node.skewX=0;

            this.bmp_cardHideAry[2].node.x=40.7;
            this.bmp_cardHideAry[2].node.y=5;
            this.bmp_cardHideAry[2].node.scaleX=0.45;
            this.bmp_cardHideAry[2].node.scaleY=0.45;
            this.bmp_cardHideAry[2].node.skewX=0;
            switch(this.fixedType) {
                case enFixedCardType.FixedCardType_AGang: {
                
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_oppo_self_1280`;
                    // SetTextureRes(url,this.bmp_cardbackAry[0]);
                    // SetTextureRes(url,this.bmp_cardbackAry[1]);
                    // SetTextureRes(url,this.bmp_cardbackAry[2]);
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
                    // SetTextureRes(url,this.bmp_cardbackAry[3]);

                    
                    
                    // url=_JZMJ.getMahjongResName(this.cardValue);
                    // SetTextureRes(url,this.bmp_cardcolorAry[1]);
                    
                    this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjongPaiBeiRes("pb3_showcardback_oppo_self_1280");
                    this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjongPaiBeiRes("pb3_showcardback_oppo_self_1280");
                    this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjongPaiBeiRes("pb3_showcardback_oppo_self_1280");
                    this.bmp_cardbackAry[3].spriteFrame=_JZMJ.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
                    this.bmp_cardcolorAry[1].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);


                    this.bmp_cardcolorAry[1].node.y = 15;
                    this.bmp_cardbackAry[0].node.active=true;
                    this.bmp_cardbackAry[1].node.active=true;
                    this.bmp_cardbackAry[2].node.active=true;
                    this.bmp_cardbackAry[3].node.active=true;
                    this.bmp_cardcolorAry[0].node.active=false;
                    this.bmp_cardcolorAry[1].node.active=true;
                    this.bmp_cardcolorAry[2].node.active=false;
                    // this._bmp_cardcolorAry[0].x = 1;
                    // this._bmp_cardcolorAry[0].y = 56;
                    // this._bmp_cardcolorAry[0].scaleX = 0.5;
                    // this._bmp_cardcolorAry[0].scaleY = 0.5;
                    // this._bmp_cardcolorAry[0].rotation=-90;
                    this.setPos();
                    break;
                }
                case enFixedCardType.FixedCardType_MGang:
                case enFixedCardType.FixedCardType_BGang: {
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
                    // SetTextureRes(url,this.bmp_cardbackAry[0]);
                    // SetTextureRes(url,this.bmp_cardbackAry[1]);
                    // SetTextureRes(url,this.bmp_cardbackAry[2]);
                    // SetTextureRes(url,this.bmp_cardbackAry[3]);
                    
                    // //
                    // //=================
                    // //
                    // url=_JZMJ.getMahjongResName(this.cardValue);
                    // SetTextureRes(url,this.bmp_cardcolorAry[0]);
                    // SetTextureRes(url,this.bmp_cardcolorAry[1]);
                    // SetTextureRes(url,this.bmp_cardcolorAry[2]);
                    this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
                    this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
                    this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
                    this.bmp_cardbackAry[3].spriteFrame=_JZMJ.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
                    this.bmp_cardcolorAry[0].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[1].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[2].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);

                    
                    this.bmp_cardcolorAry[1].node.y = 15;
                    this.bmp_cardbackAry[0].node.active=true;
                    this.bmp_cardbackAry[1].node.active=true;
                    this.bmp_cardbackAry[2].node.active=true;
                    this.bmp_cardbackAry[3].node.active=true;
                    this.bmp_cardcolorAry[0].node.active=true;
                    this.bmp_cardcolorAry[1].node.active=true;
                    this.bmp_cardcolorAry[2].node.active=true;
                    this.setPos();
                    break;
                }
                case enFixedCardType.FixedCardType_Peng: {

                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
                    // SetTextureRes(url,this.bmp_cardbackAry[0]);
                    // SetTextureRes(url,this.bmp_cardbackAry[1]);
                    // SetTextureRes(url,this.bmp_cardbackAry[2]);
                    // SetTextureRes(url,this.bmp_cardbackAry[3]);
                    
                    // //
                    // //=================
                    // //
                    // url=_JZMJ.getMahjongResName(this.cardValue);
                    // SetTextureRes(url,this.bmp_cardcolorAry[0]);
                    // SetTextureRes(url,this.bmp_cardcolorAry[1]);
                    // SetTextureRes(url,this.bmp_cardcolorAry[2]);
                    this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
                    this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
                    this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
                    this.bmp_cardcolorAry[0].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[1].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[2].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);

                    
                    this.bmp_cardcolorAry[1].node.y = 5;
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
            this.set3DSize();
            switch(this.fixedType) {
                case enFixedCardType.FixedCardType_AGang: {
                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_2_15");
                        this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_2_16");
                        this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_2_17");
                        this.bmp_cardbackAry[3].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_16");
                        this.bmp_cardcolorAry[3].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].node.scaleX = 0.4;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.38;
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_2_12");
                        this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_2_13");
                        this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_2_14");
                        this.bmp_cardbackAry[3].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_13");
                        this.bmp_cardcolorAry[3].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].node.scaleX = 0.4;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.38;
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_2_9");
                        this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_2_10");
                        this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_2_11");
                        this.bmp_cardbackAry[3].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_10");
                        this.bmp_cardcolorAry[3].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].node.scaleX = 0.4;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.38;
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_2_6");
                        this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_2_7");
                        this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_2_8");
                        this.bmp_cardbackAry[3].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_7");
                        this.bmp_cardcolorAry[3].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].node.scaleX = 0.4;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.38;
                    }else{
                        cc.log("牌序异常！："+this._cardIndex);
                    }           

                    this.bmp_cardbackAry[0].node.active=true;
                    this.bmp_cardbackAry[1].node.active=true;
                    this.bmp_cardbackAry[2].node.active=true;
                    this.bmp_cardbackAry[3].node.active=true;

                    this.bmp_cardcolorAry[0].node.active=false;
                    this.bmp_cardcolorAry[1].node.active=true;
                    this.bmp_cardcolorAry[2].node.active=false;
                    //this.setPos();
                    break;
                }
                case enFixedCardType.FixedCardType_MGang:
                case enFixedCardType.FixedCardType_BGang: {
                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_15");
                        this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_16");
                        this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_17");
                        this.bmp_cardbackAry[3].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_16");
                        this.bmp_cardcolorAry[0].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].node.scaleX = 0.4;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.38;
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_12");
                        this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_13");
                        this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_14");
                        this.bmp_cardbackAry[3].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_13");
                        this.bmp_cardcolorAry[0].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].node.scaleX = 0.4;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.38;
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_9");
                        this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_10");
                        this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_11");
                        this.bmp_cardbackAry[3].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_10");
                        this.bmp_cardcolorAry[0].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].node.scaleX = 0.4;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.38;
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_6");
                        this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_7");
                        this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_8");
                        this.bmp_cardbackAry[3].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_7");
                        this.bmp_cardcolorAry[0].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].node.scaleX = 0.4;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.38;
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
                    this.setPos(1);
                    break;
                }
                case enFixedCardType.FixedCardType_Peng: {
                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_15");
                        this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_16");
                        this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_17");
                        this.bmp_cardcolorAry[0].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_12");
                        this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_13");
                        this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_14");
                        this.bmp_cardcolorAry[0].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_9");
                        this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_10");
                        this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_11");
                        this.bmp_cardcolorAry[0].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_6");
                        this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_7");
                        this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_8");
                        this.bmp_cardcolorAry[0].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue);
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
                        this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_15");
                        this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_16");
                        this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_17");
                        this.bmp_cardcolorAry[0].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue + this._chiType);
                        this.bmp_cardcolorAry[1].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue + this._chiType -1);
                        this.bmp_cardcolorAry[2].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue + this._chiType -2);
                        this.bmp_cardcolorAry[1].node.x=-0.4;
                        this.bmp_cardcolorAry[1].node.y=8.6;
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_12");
                        this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_13");
                        this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_14");
                        this.bmp_cardcolorAry[0].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue + this._chiType);
                        this.bmp_cardcolorAry[1].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue + this._chiType -1);
                        this.bmp_cardcolorAry[2].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue + this._chiType -2);
                        this.bmp_cardcolorAry[1].node.x=1.1;
                        this.bmp_cardcolorAry[1].node.y=8.6;
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_9");
                        this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_10");
                        this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_11");
                        this.bmp_cardcolorAry[0].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue + this._chiType);
                        this.bmp_cardcolorAry[1].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue + this._chiType -1);
                        this.bmp_cardcolorAry[2].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue + this._chiType -2);
                        this.bmp_cardcolorAry[1].node.x=-0.2;
                        this.bmp_cardcolorAry[1].node.y=8.6;
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_6");
                        this.bmp_cardbackAry[1].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_7");
                        this.bmp_cardbackAry[2].spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("chi_oppo_1_8");
                        this.bmp_cardcolorAry[0].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue + this._chiType);
                        this.bmp_cardcolorAry[1].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue + this._chiType -1);
                        this.bmp_cardcolorAry[2].spriteFrame=_JZMJ.getMahjongPaiHuaRes(this.cardValue + this._chiType -2);
                        this.bmp_cardcolorAry[1].node.x=-1.3;
                        this.bmp_cardcolorAry[1].node.y=8.6;
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
        }
        
        this.node.active=true;
    }
    private setPos(type:number = 0):void{
        this.bmp_arrow.node.active=false;
        if(this._pos!=0 && this._pos>0 && this._pos<4){
            switch(this._pos)
            {
                case 1:{
                    //this.bmp_arrow.node.rotation = -90;
                    //this.bmp_cardHideAry[0].node.active = true;
                    break;
                }
                case 2:{
                    //this.bmp_arrow.node.rotation = 180;
                    //this.bmp_cardHideAry[1].node.active = true;
                    //if(type == 1)
                        //this.bmp_cardHideAry[3].node.active = true;
                    break;
                }
                case 3:{
                    //this.bmp_arrow.node.rotation = 90;
                    //this.bmp_cardHideAry[2].node.active = true;
                    break;
                }
            }
            //this.bmp_arrow.node.active=true;;
        }
    }

    private set3DSize(){

        switch(this._cardIndex){
            case 1:{
                this.node.x=246+3;
                this.node.y=328;

                this.bmp_cardbackAry[3].node.x=-21;
                this.bmp_cardbackAry[3].node.y=10-5;
                this.bmp_cardbackAry[3].node.setLocalZOrder(5);

                this.bmp_cardbackAry[2].node.x=14;
                this.bmp_cardbackAry[2].node.y=0-5;
                this.bmp_cardbackAry[2].node.setLocalZOrder(1);

                this.bmp_cardbackAry[1].node.x=-23;
                this.bmp_cardbackAry[1].node.y=0-5;
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);

                this.bmp_cardbackAry[0].node.x=-61;
                this.bmp_cardbackAry[0].node.y=0-5;
                this.bmp_cardbackAry[0].node.setLocalZOrder(3);

                this.bmp_cardcolorAry[2].node.x=1;
                this.bmp_cardcolorAry[2].node.y=8;
                this.bmp_cardcolorAry[2].node.scaleX = 0.38;
                this.bmp_cardcolorAry[2].node.scaleY = 0.34;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(4);
                this.bmp_cardcolorAry[2].node.skewX = -10;

                this.bmp_cardcolorAry[1].node.x=1;
                this.bmp_cardcolorAry[1].node.y=8;
                this.bmp_cardcolorAry[1].node.scaleX = 0.38;
                this.bmp_cardcolorAry[1].node.scaleY = 0.34;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                this.bmp_cardcolorAry[1].node.skewX = -10;

                this.bmp_cardcolorAry[0].node.x=1;
                this.bmp_cardcolorAry[0].node.y=8;
                this.bmp_cardcolorAry[0].node.scaleX = 0.38;
                this.bmp_cardcolorAry[0].node.scaleY = 0.34;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(6);
                this.bmp_cardcolorAry[0].node.skewX = -10;

                break;
            }
            case 2:{
                this.node.x=137+3;
                this.node.y=328;

                this.bmp_cardbackAry[3].node.x=-33;
                this.bmp_cardbackAry[3].node.y=10-5;
                this.bmp_cardbackAry[3].node.setLocalZOrder(5);

                this.bmp_cardbackAry[2].node.x=3;
                this.bmp_cardbackAry[2].node.y=0-5;
                this.bmp_cardbackAry[2].node.setLocalZOrder(1);

                this.bmp_cardbackAry[1].node.x=-34;
                this.bmp_cardbackAry[1].node.y=0-5;
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);

                this.bmp_cardbackAry[0].node.x=-71;
                this.bmp_cardbackAry[0].node.y=0-5;
                this.bmp_cardbackAry[0].node.setLocalZOrder(3);

                this.bmp_cardcolorAry[2].node.x=0;
                this.bmp_cardcolorAry[2].node.y=8;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(4);
                this.bmp_cardcolorAry[2].node.scaleX = 0.38;
                this.bmp_cardcolorAry[2].node.scaleY = 0.34;
                this.bmp_cardcolorAry[2].node.skewY = -2;

                this.bmp_cardcolorAry[1].node.x=0;
                this.bmp_cardcolorAry[1].node.y=8;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                this.bmp_cardcolorAry[1].node.scaleX = 0.38;
                this.bmp_cardcolorAry[1].node.scaleY = 0.34;
                this.bmp_cardcolorAry[1].node.skewY = -2;

                this.bmp_cardcolorAry[0].node.x=0;
                this.bmp_cardcolorAry[0].node.y=8;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(6);
                this.bmp_cardcolorAry[0].node.scaleX = 0.38;
                this.bmp_cardcolorAry[0].node.scaleY = 0.34;
                this.bmp_cardcolorAry[0].node.skewY = -2;
                
                break;
            }
            case 3:{
                this.node.x=-11.5+3;
                this.node.y=328;

                this.bmp_cardbackAry[3].node.x=-3;
                this.bmp_cardbackAry[3].node.y=10-5;
                this.bmp_cardbackAry[3].node.setLocalZOrder(5);

                this.bmp_cardbackAry[2].node.x=33;
                this.bmp_cardbackAry[2].node.y=0-5;
                this.bmp_cardbackAry[2].node.setLocalZOrder(2);

                this.bmp_cardbackAry[1].node.x=-3;
                this.bmp_cardbackAry[1].node.y=0-5;
                this.bmp_cardbackAry[1].node.setLocalZOrder(3);                

                this.bmp_cardbackAry[0].node.x=-40;
                this.bmp_cardbackAry[0].node.y=0-5;
                this.bmp_cardbackAry[0].node.setLocalZOrder(1);

                this.bmp_cardcolorAry[2].node.x=0;
                this.bmp_cardcolorAry[2].node.y=8;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(4);
                this.bmp_cardcolorAry[2].node.scaleX = 0.38;
                this.bmp_cardcolorAry[2].node.scaleY = 0.34;
                this.bmp_cardcolorAry[0].node.skewY = -2;

                this.bmp_cardcolorAry[1].node.x=0;
                this.bmp_cardcolorAry[1].node.y=8;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                this.bmp_cardcolorAry[1].node.scaleX = 0.38;
                this.bmp_cardcolorAry[1].node.scaleY = 0.34;
                this.bmp_cardcolorAry[0].node.skewY = -2;

                this.bmp_cardcolorAry[0].node.x=0;
                this.bmp_cardcolorAry[0].node.y=8;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(6);
                this.bmp_cardcolorAry[0].node.scaleX = 0.38;
                this.bmp_cardcolorAry[0].node.scaleY = 0.34;
                this.bmp_cardcolorAry[0].node.skewY = -2;

                break;
            }
            case 4:{
                this.node.x=-139+7;
                this.node.y=328;

                this.bmp_cardbackAry[3].node.x=2;
                this.bmp_cardbackAry[3].node.y=10-5;
                this.bmp_cardbackAry[3].node.setLocalZOrder(5);

                this.bmp_cardbackAry[2].node.x=41;
                this.bmp_cardbackAry[2].node.y=0-5;
                this.bmp_cardbackAry[2].node.setLocalZOrder(3);

                this.bmp_cardbackAry[1].node.x=4;
                this.bmp_cardbackAry[1].node.y=0-5;
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);

                this.bmp_cardbackAry[0].node.x=-35;
                this.bmp_cardbackAry[0].node.y=0-5;
                this.bmp_cardbackAry[0].node.setLocalZOrder(1);

                this.bmp_cardcolorAry[0].node.x=0;
                this.bmp_cardcolorAry[0].node.y=8;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);
                this.bmp_cardcolorAry[0].node.scaleX = 0.38;
                this.bmp_cardcolorAry[0].node.scaleY = 0.34;

                this.bmp_cardcolorAry[1].node.x=0;
                this.bmp_cardcolorAry[1].node.y=8;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(6);
                this.bmp_cardcolorAry[1].node.scaleX = 0.38;
                this.bmp_cardcolorAry[1].node.scaleY = 0.34;

                this.bmp_cardcolorAry[2].node.x=0;
                this.bmp_cardcolorAry[2].node.y=8;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(7);
                this.bmp_cardcolorAry[2].node.scaleX = 0.38;
                this.bmp_cardcolorAry[2].node.scaleY = 0.34;

                break;
            }
        }
    
        this.bmp_cardHideAry[0].node.setLocalZOrder(8);
        this.bmp_cardHideAry[1].node.setLocalZOrder(9);
        this.bmp_cardHideAry[2].node.setLocalZOrder(10);
        this.bmp_arrow.node.setLocalZOrder(11);
        
    }
}
