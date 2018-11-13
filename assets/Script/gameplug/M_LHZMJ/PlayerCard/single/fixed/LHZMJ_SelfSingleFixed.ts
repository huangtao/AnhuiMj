import LHZMJ_SingleFixedBase from "../LHZMJ_SingleFixedBase";
import { enFixedCardType, LHZMJ } from "../../../ConstDef/LHZMJMahjongDef";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_SelfSingleFixed extends LHZMJ_SingleFixedBase {

    

    onLoad() {
        // init logic
        
    }

    /**
     * 显示定牌
     * */
    public showCard(card: number,fixedType: enFixedCardType,index:number,pos:number): void {
        super.showCard(card,fixedType,index,pos);
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
    
    /**
     * 整理牌阵
     * */
    // protected arrangeCard(){
    //     let url="";
    //     switch(this.fixedType) {
    //         case enFixedCardType.FixedCardType_AGang: {
    //             url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_backcard_self_1280`;
    //             // SetTextureRes(url,this.bmp_cardbackAry[0]);
    //             // SetTextureRes(url,this.bmp_cardbackAry[1]);
    //             // SetTextureRes(url,this.bmp_cardbackAry[2]);
    //             url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
    //             // SetTextureRes(url,this.bmp_cardbackAry[3]);
    //             // url=LHZMJ.ins.iclass.getMahjongResName(this.cardValue);
    //             // SetTextureRes(url,this.bmp_cardcolorAry[1]);
    //             this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_backcard_self_1280");
    //             this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_backcard_self_1280");
    //             this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_backcard_self_1280");
    //             this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
    //             this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);

    //             this.bmp_cardcolorAry[1].node.y = 26;

    //             this.bmp_cardbackAry[0].node.active=true;
    //             this.bmp_cardbackAry[1].node.active=true;
    //             this.bmp_cardbackAry[2].node.active=true;
    //             this.bmp_cardbackAry[3].node.active=true;

    //             this.bmp_cardcolorAry[0].node.active=false;
    //             this.bmp_cardcolorAry[1].node.active=true;
    //             this.bmp_cardcolorAry[2].node.active=false;
    //             this.setPos();
    //             break;
    //         }
    //         case enFixedCardType.FixedCardType_MGang:
    //         case enFixedCardType.FixedCardType_BGang: {
    //             url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
    //             // SetTextureRes(url,this.bmp_cardbackAry[0]);
    //             // SetTextureRes(url,this.bmp_cardbackAry[1]);
    //             // SetTextureRes(url,this.bmp_cardbackAry[2]);
    //             // SetTextureRes(url,this.bmp_cardbackAry[3]);
                
    //             // //
    //             // //=================
    //             // //
    //             // url=LHZMJ.ins.iclass.getMahjongResName(this.cardValue);
    //             // SetTextureRes(url,this.bmp_cardcolorAry[0]);
    //             // SetTextureRes(url,this.bmp_cardcolorAry[1]);
    //             // SetTextureRes(url,this.bmp_cardcolorAry[2]);
    //             this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
    //             this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
    //             this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
    //             this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
    //             this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
    //             this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
    //             this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                
    //             this.bmp_cardcolorAry[1].node.y = 26;

    //             this.bmp_cardbackAry[0].node.active=true;
    //             this.bmp_cardbackAry[1].node.active=true;
    //             this.bmp_cardbackAry[2].node.active=true;
    //             this.bmp_cardbackAry[3].node.active=true;

    //             this.bmp_cardcolorAry[0].node.active=true;
    //             this.bmp_cardcolorAry[1].node.active=true;
    //             this.bmp_cardcolorAry[2].node.active=true;
    //             this.setPos();
    //             break;
    //         }
    //         case enFixedCardType.FixedCardType_Peng: {
    //             url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
    //             // SetTextureRes(url,this.bmp_cardbackAry[0]);
    //             // SetTextureRes(url,this.bmp_cardbackAry[1]);
    //             // SetTextureRes(url,this.bmp_cardbackAry[2]);

    //             // url=LHZMJ.ins.iclass.getMahjongResName(this.cardValue);
    //             // SetTextureRes(url,this.bmp_cardcolorAry[0]);
    //             // SetTextureRes(url,this.bmp_cardcolorAry[1]);
    //             // SetTextureRes(url,this.bmp_cardcolorAry[2]);
    //             this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
    //             this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
    //             this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
    //             this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
    //             this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
    //             this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);

    //             this.bmp_cardcolorAry[1].node.y = 8;

    //             this.bmp_cardbackAry[0].node.active=true;
    //             this.bmp_cardbackAry[1].node.active=true;
    //             this.bmp_cardbackAry[2].node.active=true;
    //             this.bmp_cardbackAry[3].node.active=false;
    //             this.bmp_cardcolorAry[0].node.active=true;
    //             this.bmp_cardcolorAry[1].node.active=true;
    //             this.bmp_cardcolorAry[2].node.active=true;
    //             this.setPos();
    //             break;
    //         }
    //     }
    //     this.node.active=true;
    // }
    protected arrangeCard(){
        let url="";
        if(LHZMJ.ins.iclass.is2D()){
            this.node.scaleX=0.9;
            this.node.scaleY=0.9;
            this.node.y=-289;
            this.bmp_cardbackAry[0].node.x=-67;
            this.bmp_cardbackAry[0].node.y=0;
            this.bmp_cardbackAry[0].node.width=86;
            this.bmp_cardbackAry[0].node.height=124;
            this.bmp_cardbackAry[0].node.scaleX=1;

            this.bmp_cardbackAry[1].node.x=0;
            this.bmp_cardbackAry[1].node.y=0;
            this.bmp_cardbackAry[1].node.width=86;
            this.bmp_cardbackAry[1].node.height=124;
            this.bmp_cardbackAry[1].node.scaleX=1;
            
            this.bmp_cardbackAry[2].node.x=67;
            this.bmp_cardbackAry[2].node.y=0;
            this.bmp_cardbackAry[2].node.width=86;
            this.bmp_cardbackAry[2].node.height=124;
            this.bmp_cardbackAry[2].node.scaleX=1;

            this.bmp_cardbackAry[3].node.x=0;
            this.bmp_cardbackAry[3].node.y=20;
            this.bmp_cardbackAry[3].node.width=86;
            this.bmp_cardbackAry[3].node.height=124;
            this.bmp_cardbackAry[3].node.scaleX=1;

            this.bmp_cardcolorAry[0].node.x=-67;
            this.bmp_cardcolorAry[0].node.y=10;
            this.bmp_cardcolorAry[0].node.skewX=0;
            this.bmp_cardcolorAry[0].node.scaleX=1;
            this.bmp_cardcolorAry[0].node.scaleY=1;

            this.bmp_cardcolorAry[1].node.x=0;
            this.bmp_cardcolorAry[1].node.y=30;
            this.bmp_cardcolorAry[1].node.skewX=0;
            this.bmp_cardcolorAry[1].node.scaleX=1;
            this.bmp_cardcolorAry[1].node.scaleY=1;

            this.bmp_cardcolorAry[2].node.x=67;
            this.bmp_cardcolorAry[2].node.y=10;
            this.bmp_cardcolorAry[2].node.skewX=0;
            this.bmp_cardcolorAry[2].node.scaleX=1;
            this.bmp_cardcolorAry[2].node.scaleY=1;

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
                    // SetTextureRes(url,this.bmp_cardbackAry[0]);
                    // SetTextureRes(url,this.bmp_cardbackAry[1]);
                    // SetTextureRes(url,this.bmp_cardbackAry[2]);
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
                    // SetTextureRes(url,this.bmp_cardbackAry[3]);
                    // url=LHZMJ.ins.iclass.getMahjongResName(this.cardValue);
                    // SetTextureRes(url,this.bmp_cardcolorAry[1]);
                    this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg_back@2x");
                    this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg_back@2x");
                    this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg_back@2x");
                    this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);

                    this.bmp_cardcolorAry[1].node.y = 30;

                    this.bmp_cardbackAry[0].node.active=true;
                    this.bmp_cardbackAry[1].node.active=true;
                    this.bmp_cardbackAry[2].node.active=true;
                    this.bmp_cardbackAry[3].node.active=true;

                    this.bmp_cardcolorAry[0].node.active=false;
                    this.bmp_cardcolorAry[1].node.active=true;
                    this.bmp_cardcolorAry[2].node.active=false;
                    this.setPos();
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
                    // url=LHZMJ.ins.iclass.getMahjongResName(this.cardValue);
                    // SetTextureRes(url,this.bmp_cardcolorAry[0]);
                    // SetTextureRes(url,this.bmp_cardcolorAry[1]);
                    // SetTextureRes(url,this.bmp_cardcolorAry[2]);
                    this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    
                    this.bmp_cardcolorAry[1].node.y = 30;

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
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
                    // SetTextureRes(url,this.bmp_cardbackAry[0]);
                    // SetTextureRes(url,this.bmp_cardbackAry[1]);
                    // SetTextureRes(url,this.bmp_cardbackAry[2]);

                    // url=LHZMJ.ins.iclass.getMahjongResName(this.cardValue);
                    // SetTextureRes(url,this.bmp_cardcolorAry[0]);
                    // SetTextureRes(url,this.bmp_cardcolorAry[1]);
                    // SetTextureRes(url,this.bmp_cardcolorAry[2]);
                    this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);

                    this.bmp_cardcolorAry[1].node.y = 10;

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
                    // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_backcard_self_1280`;
                    // // SetTextureRes(url,this.bmp_cardbackAry[0]);
                    // // SetTextureRes(url,this.bmp_cardbackAry[1]);
                    // // SetTextureRes(url,this.bmp_cardbackAry[2]);
                    // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
                    // // SetTextureRes(url,this.bmp_cardbackAry[3]);
                    // // url=LHZMJ.ins.iclass.getMahjongResName(this.cardValue);
                    // // SetTextureRes(url,this.bmp_cardcolorAry[1]);

                    // this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_backcard_self_1280");
                    // this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_backcard_self_1280");
                    // this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_backcard_self_1280");
                    // this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                    // this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    // this.bmp_cardcolorAry[1].node.y = 30;
                    
                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bm_01");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bm_02");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bm_03");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_02");
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bm_04");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bm_05");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bm_06");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_05");
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bm_07");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bm_07");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bm_06");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_07");
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bm_05");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bm_04");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bm_03");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_04");
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
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
                    this.setPos();
                    break;
                }
                case enFixedCardType.FixedCardType_MGang:
                case enFixedCardType.FixedCardType_BGang: {
                    // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
                    // // SetTextureRes(url,this.bmp_cardbackAry[0]);
                    // // SetTextureRes(url,this.bmp_cardbackAry[1]);
                    // // SetTextureRes(url,this.bmp_cardbackAry[2]);
                    // // SetTextureRes(url,this.bmp_cardbackAry[3]);
                    
                    // // //
                    // // //=================
                    // // //
                    // // url=LHZMJ.ins.iclass.getMahjongResName(this.cardValue);
                    // // SetTextureRes(url,this.bmp_cardcolorAry[0]);
                    // // SetTextureRes(url,this.bmp_cardcolorAry[1]);
                    // // SetTextureRes(url,this.bmp_cardcolorAry[2]);
                    // this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                    // this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                    // this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                    // this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                    // this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    // this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    // this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    
                    // this.bmp_cardcolorAry[1].node.y = 30;
                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_01");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_02");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_03");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_02");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_04");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_05");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_06");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_05");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_07");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_07");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_06");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_07");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_05");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_04");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_03");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_04");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
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
                    this.setPos();
                    break;
                }
                case enFixedCardType.FixedCardType_Peng: {
                    // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
                    // // SetTextureRes(url,this.bmp_cardbackAry[0]);
                    // // SetTextureRes(url,this.bmp_cardbackAry[1]);
                    // // SetTextureRes(url,this.bmp_cardbackAry[2]);

                    // // url=LHZMJ.ins.iclass.getMahjongResName(this.cardValue);
                    // // SetTextureRes(url,this.bmp_cardcolorAry[0]);
                    // // SetTextureRes(url,this.bmp_cardcolorAry[1]);
                    // // SetTextureRes(url,this.bmp_cardcolorAry[2]);
                    // this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                    // this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                    // this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                    // //this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                    // this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    // this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    // this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);

                    // this.bmp_cardcolorAry[1].node.y = 10;
                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_01");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_02");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_03");
                        //this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].node.x=-2.5;
                        this.bmp_cardcolorAry[1].node.y=14;
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_04");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_05");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_06");
                        //this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].node.x=-1.6;
                        this.bmp_cardcolorAry[1].node.y=14;
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_07");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_07");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_06");
                        //this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].node.x=-0.8;
                        this.bmp_cardcolorAry[1].node.y=14;
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_05");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_04");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_03");
                        //this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].node.x=3.3;
                        this.bmp_cardcolorAry[1].node.y=14;
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
    private setPos():void{
        this.bmp_arrow.node.active=false;
        if(this._pos!=0 && this._pos>0 && this._pos<4){
            switch(this._pos)
            {
                case 1:{
                    this.bmp_arrow.node.rotation = 90;
                    break;
                }
                case 2:{
                    this.bmp_arrow.node.rotation = 0;
                    break;
                }
                case 3:{
                    this.bmp_arrow.node.rotation = -90;
                    break;
                }
            }
            this.bmp_arrow.node.active=true;;
        }
    }

    private set3DSize(){
        this.node.scaleX=1;
        this.node.scaleY=1;
        this.node.y=-298;
        switch(this._cardIndex){
            case 1:{
                this.bmp_cardbackAry[0].node.x=-78;
                this.bmp_cardbackAry[0].node.y=0;
                this.bmp_cardbackAry[0].node.width=108;
                this.bmp_cardbackAry[0].node.height=106;
                this.bmp_cardbackAry[0].node.setLocalZOrder(1);
                this.bmp_cardbackAry[0].node.scaleX=1;

                this.bmp_cardbackAry[1].node.x=0;
                this.bmp_cardbackAry[1].node.y=0;
                this.bmp_cardbackAry[1].node.width=104;
                this.bmp_cardbackAry[1].node.height=106;
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);
                this.bmp_cardbackAry[1].node.scaleX=1;

                this.bmp_cardbackAry[2].node.x=79;
                this.bmp_cardbackAry[2].node.y=0;
                this.bmp_cardbackAry[2].node.width=99;
                this.bmp_cardbackAry[2].node.height=106;
                this.bmp_cardbackAry[2].node.setLocalZOrder(3);
                this.bmp_cardbackAry[2].node.scaleX=1;

                this.bmp_cardcolorAry[0].node.x=-80.5;
                this.bmp_cardcolorAry[0].node.y=14;
                this.bmp_cardcolorAry[0].node.scaleX=0.9;
                this.bmp_cardcolorAry[0].node.scaleY=0.65;
                this.bmp_cardcolorAry[0].node.skewX=11;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=77;
                this.bmp_cardcolorAry[2].node.y=14;
                this.bmp_cardcolorAry[2].node.scaleX=0.9;
                this.bmp_cardcolorAry[2].node.scaleY=0.65;
                this.bmp_cardcolorAry[2].node.skewX=7;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);

                this.bmp_cardbackAry[3].node.x=-6.8;
                this.bmp_cardbackAry[3].node.y=29;
                this.bmp_cardbackAry[3].node.width=104;
                this.bmp_cardbackAry[3].node.height=106;
                this.bmp_cardbackAry[3].node.setLocalZOrder(6);
                this.bmp_cardbackAry[3].node.scaleX=1;
                
                this.bmp_cardcolorAry[1].node.x=-9.8;
                this.bmp_cardcolorAry[1].node.y=43;
                this.bmp_cardcolorAry[1].node.scaleX=0.9;
                this.bmp_cardcolorAry[1].node.scaleY=0.65;
                this.bmp_cardcolorAry[1].node.skewX=9;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                

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
                this.bmp_cardbackAry[0].node.x=-78;
                this.bmp_cardbackAry[0].node.y=0;
                this.bmp_cardbackAry[0].node.width=96;
                this.bmp_cardbackAry[0].node.height=106;
                this.bmp_cardbackAry[0].node.setLocalZOrder(1);
                this.bmp_cardbackAry[0].node.scaleX=1;

                this.bmp_cardbackAry[1].node.x=0;
                this.bmp_cardbackAry[1].node.y=0;
                this.bmp_cardbackAry[1].node.width=94;
                this.bmp_cardbackAry[1].node.height=106;
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);
                this.bmp_cardbackAry[1].node.scaleX=1;

                this.bmp_cardbackAry[2].node.x=79;
                this.bmp_cardbackAry[2].node.y=0;
                this.bmp_cardbackAry[2].node.width=88;
                this.bmp_cardbackAry[2].node.height=106;
                this.bmp_cardbackAry[2].node.setLocalZOrder(3);
                this.bmp_cardbackAry[2].node.scaleX=1;

                this.bmp_cardcolorAry[0].node.x=-80.5;
                this.bmp_cardcolorAry[0].node.y=14;
                this.bmp_cardcolorAry[0].node.scaleX=0.9;
                this.bmp_cardcolorAry[0].node.scaleY=0.65;
                this.bmp_cardcolorAry[0].node.skewX=5;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=77;
                this.bmp_cardcolorAry[2].node.y=14;
                this.bmp_cardcolorAry[2].node.scaleX=0.9;
                this.bmp_cardcolorAry[2].node.scaleY=0.65;
                this.bmp_cardcolorAry[2].node.skewX=1;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);

                this.bmp_cardbackAry[3].node.x=-4.8;
                this.bmp_cardbackAry[3].node.y=29;
                this.bmp_cardbackAry[3].node.width=94;
                this.bmp_cardbackAry[3].node.height=106;
                this.bmp_cardbackAry[3].node.setLocalZOrder(6);
                this.bmp_cardbackAry[3].node.scaleX=1;
                
                this.bmp_cardcolorAry[1].node.x=-7.8;
                this.bmp_cardcolorAry[1].node.y=43;
                this.bmp_cardcolorAry[1].node.scaleX=0.9;
                this.bmp_cardcolorAry[1].node.scaleY=0.65;
                this.bmp_cardcolorAry[1].node.skewX=3;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                

                this.bmp_cardHideAry[0].node.x=-80.6;
                this.bmp_cardHideAry[0].node.y=14;
                this.bmp_cardHideAry[0].node.scaleX=0.9;
                this.bmp_cardHideAry[0].node.scaleY=0.6;
                this.bmp_cardHideAry[0].node.skewX=5;

                this.bmp_cardHideAry[1].node.x=-2.1;
                this.bmp_cardHideAry[1].node.y=14;
                this.bmp_cardHideAry[1].node.scaleX=0.9;
                this.bmp_cardHideAry[1].node.scaleY=0.6;
                this.bmp_cardHideAry[1].node.skewX=3;

                this.bmp_cardHideAry[2].node.x=78.3;
                this.bmp_cardHideAry[2].node.y=14;
                this.bmp_cardHideAry[2].node.scaleX=0.9;
                this.bmp_cardHideAry[2].node.scaleY=0.6;
                this.bmp_cardHideAry[2].node.skewX=2;
                break;
            }
            case 3:{
                this.bmp_cardbackAry[0].node.x=-78;
                this.bmp_cardbackAry[0].node.y=0;
                this.bmp_cardbackAry[0].node.width=83;
                this.bmp_cardbackAry[0].node.height=106;
                this.bmp_cardbackAry[0].node.setLocalZOrder(1);
                this.bmp_cardbackAry[0].node.scaleX=1;

                this.bmp_cardbackAry[2].node.x=79;
                this.bmp_cardbackAry[2].node.y=0;
                this.bmp_cardbackAry[2].node.width=88;
                this.bmp_cardbackAry[2].node.height=106;
                this.bmp_cardbackAry[2].node.setLocalZOrder(2);
                this.bmp_cardbackAry[2].node.scaleX=-1;

                this.bmp_cardbackAry[1].node.x=0;
                this.bmp_cardbackAry[1].node.y=0;
                this.bmp_cardbackAry[1].node.width=83;
                this.bmp_cardbackAry[1].node.height=106;
                this.bmp_cardbackAry[1].node.setLocalZOrder(3);
                this.bmp_cardbackAry[1].node.scaleX=-1;

                this.bmp_cardbackAry[3].node.x=0.2;
                this.bmp_cardbackAry[3].node.y=29;
                this.bmp_cardbackAry[3].node.width=83;
                this.bmp_cardbackAry[3].node.height=106;
                this.bmp_cardbackAry[3].node.setLocalZOrder(4);
                this.bmp_cardbackAry[3].node.scaleX=-1;

                this.bmp_cardcolorAry[0].node.x=-77.5;
                this.bmp_cardcolorAry[0].node.y=14;
                this.bmp_cardcolorAry[0].node.scaleX=0.9;
                this.bmp_cardcolorAry[0].node.scaleY=0.65;
                this.bmp_cardcolorAry[0].node.skewX=0;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(5);

                this.bmp_cardcolorAry[1].node.x=-0.8;
                this.bmp_cardcolorAry[1].node.y=43;
                this.bmp_cardcolorAry[1].node.scaleX=0.9;
                this.bmp_cardcolorAry[1].node.scaleY=0.65;
                this.bmp_cardcolorAry[1].node.skewX=0;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(6);

                this.bmp_cardcolorAry[2].node.x=79;
                this.bmp_cardcolorAry[2].node.y=14;
                this.bmp_cardcolorAry[2].node.scaleX=0.9;
                this.bmp_cardcolorAry[2].node.scaleY=0.65;
                this.bmp_cardcolorAry[2].node.skewX=-1;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(7);

                
                
                
                

                this.bmp_cardHideAry[0].node.x=-77.8;
                this.bmp_cardHideAry[0].node.y=14;
                this.bmp_cardHideAry[0].node.scaleX=0.9;
                this.bmp_cardHideAry[0].node.scaleY=0.6;
                this.bmp_cardHideAry[0].node.skewX=0;

                this.bmp_cardHideAry[1].node.x=0;
                this.bmp_cardHideAry[1].node.y=14;
                this.bmp_cardHideAry[1].node.scaleX=0.9;
                this.bmp_cardHideAry[1].node.scaleY=0.6;
                this.bmp_cardHideAry[1].node.skewX=0;

                this.bmp_cardHideAry[2].node.x=79.4;
                this.bmp_cardHideAry[2].node.y=14;
                this.bmp_cardHideAry[2].node.scaleX=0.9;
                this.bmp_cardHideAry[2].node.scaleY=0.6;
                this.bmp_cardHideAry[2].node.skewX=-1;
                break;
            }
            case 4:{

                this.bmp_cardbackAry[2].node.x=78;
                this.bmp_cardbackAry[2].node.y=0;
                this.bmp_cardbackAry[2].node.width=99;
                this.bmp_cardbackAry[2].node.height=106;
                this.bmp_cardbackAry[2].node.setLocalZOrder(1);
                this.bmp_cardbackAry[2].node.scaleX=-1;

                this.bmp_cardbackAry[1].node.x=0;
                this.bmp_cardbackAry[1].node.y=0;
                this.bmp_cardbackAry[1].node.width=96;
                this.bmp_cardbackAry[1].node.height=106;
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);
                this.bmp_cardbackAry[1].node.scaleX=-1;

                this.bmp_cardbackAry[0].node.x=-79;
                this.bmp_cardbackAry[0].node.y=0;
                this.bmp_cardbackAry[0].node.width=94;
                this.bmp_cardbackAry[0].node.height=106;
                this.bmp_cardbackAry[0].node.setLocalZOrder(3);
                this.bmp_cardbackAry[0].node.scaleX=-1;

                this.bmp_cardcolorAry[0].node.x=-77.5;
                this.bmp_cardcolorAry[0].node.y=14;
                this.bmp_cardcolorAry[0].node.scaleX=0.9;
                this.bmp_cardcolorAry[0].node.scaleY=0.65;
                this.bmp_cardcolorAry[0].node.skewX=-3;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=82;
                this.bmp_cardcolorAry[2].node.y=14;
                this.bmp_cardcolorAry[2].node.scaleX=0.9;
                this.bmp_cardcolorAry[2].node.scaleY=0.65;
                this.bmp_cardcolorAry[2].node.skewX=-7;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);

                this.bmp_cardbackAry[3].node.x=5.2;
                this.bmp_cardbackAry[3].node.y=29;
                this.bmp_cardbackAry[3].node.width=96;
                this.bmp_cardbackAry[3].node.height=106;
                this.bmp_cardbackAry[3].node.setLocalZOrder(6);
                this.bmp_cardbackAry[3].node.scaleX=-1;
                
                this.bmp_cardcolorAry[1].node.x=7.2;
                this.bmp_cardcolorAry[1].node.y=43;
                this.bmp_cardcolorAry[1].node.scaleX=0.9;
                this.bmp_cardcolorAry[1].node.scaleY=0.65;
                this.bmp_cardcolorAry[1].node.skewX=-5;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                

                this.bmp_cardHideAry[0].node.x=-77.4;
                this.bmp_cardHideAry[0].node.y=14;
                this.bmp_cardHideAry[0].node.scaleX=0.9;
                this.bmp_cardHideAry[0].node.scaleY=0.6;
                this.bmp_cardHideAry[0].node.skewX=-3;

                this.bmp_cardHideAry[1].node.x=2.2;
                this.bmp_cardHideAry[1].node.y=14;
                this.bmp_cardHideAry[1].node.scaleX=0.9;
                this.bmp_cardHideAry[1].node.scaleY=0.6;
                this.bmp_cardHideAry[1].node.skewX=-4;

                this.bmp_cardHideAry[2].node.x=81;
                this.bmp_cardHideAry[2].node.y=14;
                this.bmp_cardHideAry[2].node.scaleX=0.9;
                this.bmp_cardHideAry[2].node.scaleY=0.6;
                this.bmp_cardHideAry[2].node.skewX=-5;
                break;
            }
        }
        this.bmp_cardHideAry[0].node.setLocalZOrder(8);
        this.bmp_cardHideAry[1].node.setLocalZOrder(9);
        this.bmp_cardHideAry[2].node.setLocalZOrder(10);
        this.bmp_arrow.node.setLocalZOrder(11);
    }
}
