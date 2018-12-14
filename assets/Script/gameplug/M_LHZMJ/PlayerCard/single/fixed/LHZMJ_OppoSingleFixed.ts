import LHZMJ_SingleFixedBase from "../LHZMJ_SingleFixedBase";
import { enFixedCardType, LHZMJ } from "../../../ConstDef/LHZMJMahjongDef";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_OppoSingleFixed extends LHZMJ_SingleFixedBase {

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
    // protected arrangeCard() {
    //     let url="";
    //     switch(this.fixedType) {
    //         case enFixedCardType.FixedCardType_AGang: {
                
    //             url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_oppo_self_1280`;
    //             // SetTextureRes(url,this.bmp_cardbackAry[0]);
    //             // SetTextureRes(url,this.bmp_cardbackAry[1]);
    //             // SetTextureRes(url,this.bmp_cardbackAry[2]);
    //             url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
    //             // SetTextureRes(url,this.bmp_cardbackAry[3]);

                
                
    //             // url=LHZMJ.ins.iclass.getMahjongResName(this.cardValue);
    //             // SetTextureRes(url,this.bmp_cardcolorAry[1]);
                
    //             this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcardback_oppo_self_1280");
    //             this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcardback_oppo_self_1280");
    //             this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcardback_oppo_self_1280");
    //             this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
    //             this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);


    //             this.bmp_cardcolorAry[1].node.y = 15;
    //             this.bmp_cardbackAry[0].node.active=true;
    //             this.bmp_cardbackAry[1].node.active=true;
    //             this.bmp_cardbackAry[2].node.active=true;
    //             this.bmp_cardbackAry[3].node.active=true;
    //             this.bmp_cardcolorAry[0].node.active=false;
    //             this.bmp_cardcolorAry[1].node.active=true;
    //             this.bmp_cardcolorAry[2].node.active=false;
    //             // this._bmp_cardcolorAry[0].x = 1;
    //             // this._bmp_cardcolorAry[0].y = 56;
    //             // this._bmp_cardcolorAry[0].scaleX = 0.5;
    //             // this._bmp_cardcolorAry[0].scaleY = 0.5;
    //             // this._bmp_cardcolorAry[0].rotation=-90;
    //             this.setPos();
    //             break;
    //         }
    //         case enFixedCardType.FixedCardType_MGang:
    //         case enFixedCardType.FixedCardType_BGang: {
    //             url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
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
    //             this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
    //             this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
    //             this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
    //             this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
    //             this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
    //             this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
    //             this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);

                
    //             this.bmp_cardcolorAry[1].node.y = 15;
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

    //             url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
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
    //             this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
    //             this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
    //             this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
    //             this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
    //             this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
    //             this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);

                
    //             this.bmp_cardcolorAry[1].node.y = 5;
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
    protected arrangeCard() {
        let url="";
        if(LHZMJ.ins.iclass.is2D()){
            
            this.bmp_cardbackAry[0].node.x=-36.5;
            this.bmp_cardbackAry[0].node.y=0;
            this.bmp_cardbackAry[0].node.width=43;
            this.bmp_cardbackAry[0].node.height=60;
            this.bmp_cardbackAry[0].node.scaleX=1;

            this.bmp_cardbackAry[1].node.x=4;
            this.bmp_cardbackAry[1].node.y=0;
            this.bmp_cardbackAry[1].node.width=43;
            this.bmp_cardbackAry[1].node.height=60;
            this.bmp_cardbackAry[1].node.scaleX=1;
            
            this.bmp_cardbackAry[2].node.x=44.5;
            this.bmp_cardbackAry[2].node.y=0;
            this.bmp_cardbackAry[2].node.width=43;
            this.bmp_cardbackAry[2].node.height=60;
            this.bmp_cardbackAry[2].node.scaleX=1;

            this.bmp_cardbackAry[3].node.x=4;
            this.bmp_cardbackAry[3].node.y=13;
            this.bmp_cardbackAry[3].node.width=43;
            this.bmp_cardbackAry[3].node.height=60;
            this.bmp_cardbackAry[3].node.scaleX=1;

            this.bmp_cardcolorAry[0].node.x=-36.5;
            this.bmp_cardcolorAry[0].node.y=8;
            this.bmp_cardcolorAry[0].node.skewX=0;
            this.bmp_cardcolorAry[0].node.scaleX=0.45;
            this.bmp_cardcolorAry[0].node.scaleY=0.45;

            this.bmp_cardcolorAry[1].node.x=4;
            this.bmp_cardcolorAry[1].node.y=21;
            this.bmp_cardcolorAry[1].node.skewX=0;
            this.bmp_cardcolorAry[1].node.scaleX=0.45;
            this.bmp_cardcolorAry[1].node.scaleY=0.45;

            this.bmp_cardcolorAry[2].node.x=44.5;
            this.bmp_cardcolorAry[2].node.y=8;
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

            this.light_node.x = 2;
            this.light_node.y = -2;
            switch(this.fixedType) {
                case enFixedCardType.FixedCardType_AGang: {
                
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_oppo_self_1280`;
                    // SetTextureRes(url,this.bmp_cardbackAry[0]);
                    // SetTextureRes(url,this.bmp_cardbackAry[1]);
                    // SetTextureRes(url,this.bmp_cardbackAry[2]);
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
                    // SetTextureRes(url,this.bmp_cardbackAry[3]);

                    
                    
                    // url=LHZMJ.ins.iclass.getMahjongResName(this.cardValue);
                    // SetTextureRes(url,this.bmp_cardcolorAry[1]);
                    
                    this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_fan@2x");
                    this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_fan@2x");
                    this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_fan@2x");
                    this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
                    this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);


                    this.bmp_cardcolorAry[1].node.y = 21;
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
                    // url=LHZMJ.ins.iclass.getMahjongResName(this.cardValue);
                    // SetTextureRes(url,this.bmp_cardcolorAry[0]);
                    // SetTextureRes(url,this.bmp_cardcolorAry[1]);
                    // SetTextureRes(url,this.bmp_cardcolorAry[2]);
                    this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
                    this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
                    this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
                    this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
                    this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);

                    
                    this.bmp_cardcolorAry[1].node.y = 21;
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
                    // url=LHZMJ.ins.iclass.getMahjongResName(this.cardValue);
                    // SetTextureRes(url,this.bmp_cardcolorAry[0]);
                    // SetTextureRes(url,this.bmp_cardcolorAry[1]);
                    // SetTextureRes(url,this.bmp_cardcolorAry[2]);
                    this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
                    this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
                    this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
                    this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);

                    
                    this.bmp_cardcolorAry[1].node.y = 8;
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
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bm_bg_03");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bm_bg_02");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bm_bg_01");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_02");
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bm_bg_06");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bm_bg_05");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bm_bg_04");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_05");
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bm_bg_06");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bm_bg_07");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bm_bg_07");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_07");
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bm_bg_03");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bm_bg_04");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bm_bg_05");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_04");
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
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_03");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_02");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_01");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_02");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_06");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_05");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_04");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_05");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_06");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_07");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_07");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_07");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_03");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_04");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_05");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_04");
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
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_03");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_02");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_01");
                        //this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].node.x=-0.4;
                        this.bmp_cardcolorAry[1].node.y=8.6;
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_06");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_05");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_04");
                        //this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].node.x=1.1;
                        this.bmp_cardcolorAry[1].node.y=8.6;
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_06");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_07");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_07");
                        //this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].node.x=-0.2;
                        this.bmp_cardcolorAry[1].node.y=8.6;
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_03");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_04");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_05");
                        //this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
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
    private setPos():void{
        // this.bmp_arrow.node.active=false;
        if(this._pos!=0 && this._pos>0 && this._pos<4){
            switch(this._pos)
            {
                case 1:{
                    this.bmp_arrow[2].node.active = false;
                    this.bmp_arrow[1].node.active = false;
                    this.bmp_arrow[0].node.active = true;
                    break;
                }
                case 2:{
                    this.bmp_arrow[0].node.active = false;
                    this.bmp_arrow[2].node.active = false;
                    this.bmp_arrow[1].node.active = true;
                    break;
                }
                case 3:{
                    this.bmp_arrow[0].node.active = false;
                    this.bmp_arrow[1].node.active = false;
                    this.bmp_arrow[2].node.active = true;
                    break;
                }
            }
            // this.bmp_arrow.node.active=true;;
        }
    }

    private set3DSize(){

        switch(this._cardIndex){
            case 1:{
                this.node.x=246;
                this.node.y=285;

                this.bmp_cardbackAry[2].node.x=40.5;
                this.bmp_cardbackAry[2].node.y=0;
                this.bmp_cardbackAry[2].node.width=57;
                this.bmp_cardbackAry[2].node.height=56;
                this.bmp_cardbackAry[2].node.setLocalZOrder(1);
                this.bmp_cardbackAry[2].node.scaleX=1;

                this.bmp_cardbackAry[1].node.x=0;
                this.bmp_cardbackAry[1].node.y=0;
                this.bmp_cardbackAry[1].node.width=56;
                this.bmp_cardbackAry[1].node.height=56;
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);
                this.bmp_cardbackAry[1].node.scaleX=1;

                this.bmp_cardbackAry[0].node.x=-42.9;
                this.bmp_cardbackAry[0].node.y=0;
                this.bmp_cardbackAry[0].node.width=54;
                this.bmp_cardbackAry[0].node.height=56;
                this.bmp_cardbackAry[0].node.setLocalZOrder(3);
                this.bmp_cardbackAry[0].node.scaleX=1;

                this.bmp_cardcolorAry[2].node.x=41.3;
                this.bmp_cardcolorAry[2].node.y=8.6;
                this.bmp_cardcolorAry[2].node.scaleX=0.55;
                this.bmp_cardcolorAry[2].node.scaleY=0.35;
                this.bmp_cardcolorAry[2].node.skewX=-12;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(4);

                this.bmp_cardbackAry[3].node.x=2.5;
                this.bmp_cardbackAry[3].node.y=16.7;
                this.bmp_cardbackAry[3].node.width=56;
                this.bmp_cardbackAry[3].node.height=57;
                this.bmp_cardbackAry[3].node.setLocalZOrder(5);
                this.bmp_cardbackAry[3].node.scaleX=1;

                this.bmp_cardcolorAry[0].node.x=-42.1;
                this.bmp_cardcolorAry[0].node.y=8.6;
                this.bmp_cardcolorAry[0].node.scaleX=0.55;
                this.bmp_cardcolorAry[0].node.scaleY=0.35;
                this.bmp_cardcolorAry[0].node.skewX=-7;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(6);

                this.bmp_cardcolorAry[1].node.x=2.4;
                this.bmp_cardcolorAry[1].node.y=25.5;
                this.bmp_cardcolorAry[1].node.scaleX=0.55;
                this.bmp_cardcolorAry[1].node.scaleY=0.35;
                this.bmp_cardcolorAry[1].node.skewX=-10;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                

                this.bmp_cardHideAry[0].node.x=-42.3;
                this.bmp_cardHideAry[0].node.y=8.8;
                this.bmp_cardHideAry[0].node.scaleX=0.45;
                this.bmp_cardHideAry[0].node.scaleY=0.35;
                this.bmp_cardHideAry[0].node.skewX=-10;

                this.bmp_cardHideAry[1].node.x=0;
                this.bmp_cardHideAry[1].node.y=8.8;
                this.bmp_cardHideAry[1].node.scaleX=0.45;
                this.bmp_cardHideAry[1].node.scaleY=0.35;
                this.bmp_cardHideAry[1].node.skewX=-12;

                this.bmp_cardHideAry[2].node.x=41.3;
                this.bmp_cardHideAry[2].node.y=8.8;
                this.bmp_cardHideAry[2].node.scaleX=0.45;
                this.bmp_cardHideAry[2].node.scaleY=0.35;
                this.bmp_cardHideAry[2].node.skewX=-13;
                break;
            }
            case 2:{
                this.node.x=114.3;
                this.node.y=285;

                this.bmp_cardbackAry[2].node.x=40.5;
                this.bmp_cardbackAry[2].node.y=0;
                this.bmp_cardbackAry[2].node.width=53;
                this.bmp_cardbackAry[2].node.height=56;
                this.bmp_cardbackAry[2].node.setLocalZOrder(1);
                this.bmp_cardbackAry[2].node.scaleX=1;

                this.bmp_cardbackAry[1].node.x=0;
                this.bmp_cardbackAry[1].node.y=0;
                this.bmp_cardbackAry[1].node.width=50;
                this.bmp_cardbackAry[1].node.height=56;
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);
                this.bmp_cardbackAry[1].node.scaleX=1;

                this.bmp_cardbackAry[0].node.x=-40.7;
                this.bmp_cardbackAry[0].node.y=0;
                this.bmp_cardbackAry[0].node.width=48;
                this.bmp_cardbackAry[0].node.height=56;
                this.bmp_cardbackAry[0].node.setLocalZOrder(3);
                this.bmp_cardbackAry[0].node.scaleX=1;

                this.bmp_cardcolorAry[2].node.x=41.3;
                this.bmp_cardcolorAry[2].node.y=8.6;
                this.bmp_cardcolorAry[2].node.scaleX=0.55;
                this.bmp_cardcolorAry[2].node.scaleY=0.35;
                this.bmp_cardcolorAry[2].node.skewX=-7;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(4);

                this.bmp_cardbackAry[3].node.x=3.6;
                this.bmp_cardbackAry[3].node.y=16.7;
                this.bmp_cardbackAry[3].node.width=50;
                this.bmp_cardbackAry[3].node.height=56;
                this.bmp_cardbackAry[3].node.setLocalZOrder(5);
                this.bmp_cardbackAry[3].node.scaleX=1;

                this.bmp_cardcolorAry[0].node.x=-39.7;
                this.bmp_cardcolorAry[0].node.y=8.6;
                this.bmp_cardcolorAry[0].node.scaleX=0.55;
                this.bmp_cardcolorAry[0].node.scaleY=0.35;
                this.bmp_cardcolorAry[0].node.skewX=-2;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(6);

                this.bmp_cardcolorAry[1].node.x=4.6;
                this.bmp_cardcolorAry[1].node.y=25.5;
                this.bmp_cardcolorAry[1].node.scaleX=0.55;
                this.bmp_cardcolorAry[1].node.scaleY=0.35;
                this.bmp_cardcolorAry[1].node.skewX=-4;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                
                this.bmp_cardHideAry[1].node.x=1;
                this.bmp_cardHideAry[1].node.y=8.8;
                this.bmp_cardHideAry[1].node.scaleX=0.45;
                this.bmp_cardHideAry[1].node.scaleY=0.35;
                this.bmp_cardHideAry[1].node.skewX=-3;

                this.bmp_cardHideAry[0].node.x=-39.8;
                this.bmp_cardHideAry[0].node.y=8.8;
                this.bmp_cardHideAry[0].node.scaleX=0.45;
                this.bmp_cardHideAry[0].node.scaleY=0.35;
                this.bmp_cardHideAry[0].node.skewX=-2;

                this.bmp_cardHideAry[2].node.x=42.2;
                this.bmp_cardHideAry[2].node.y=8.8;
                this.bmp_cardHideAry[2].node.scaleX=0.45;
                this.bmp_cardHideAry[2].node.scaleY=0.35;
                this.bmp_cardHideAry[2].node.skewX=-8;
                break;
            }
            case 3:{
                this.node.x=-13.7;
                this.node.y=285;

                this.bmp_cardbackAry[0].node.x=-42;
                this.bmp_cardbackAry[0].node.y=0;
                this.bmp_cardbackAry[0].node.width=48;
                this.bmp_cardbackAry[0].node.height=56;
                this.bmp_cardbackAry[0].node.setLocalZOrder(1);
                this.bmp_cardbackAry[0].node.scaleX=-1;

                this.bmp_cardbackAry[2].node.x=40.5;
                this.bmp_cardbackAry[2].node.y=0;
                this.bmp_cardbackAry[2].node.width=47;
                this.bmp_cardbackAry[2].node.height=56;
                this.bmp_cardbackAry[2].node.setLocalZOrder(2);
                this.bmp_cardbackAry[2].node.scaleX=1;

                this.bmp_cardbackAry[1].node.x=0;
                this.bmp_cardbackAry[1].node.y=0;
                this.bmp_cardbackAry[1].node.width=47;
                this.bmp_cardbackAry[1].node.height=56;
                this.bmp_cardbackAry[1].node.setLocalZOrder(3);
                this.bmp_cardbackAry[1].node.scaleX=-1;

                

                this.bmp_cardcolorAry[2].node.x=41.3;
                this.bmp_cardcolorAry[2].node.y=8.6;
                this.bmp_cardcolorAry[2].node.scaleX=0.55;
                this.bmp_cardcolorAry[2].node.scaleY=0.35;
                this.bmp_cardcolorAry[2].node.skewX=-1;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(4);

                this.bmp_cardbackAry[3].node.x=-0.7;
                this.bmp_cardbackAry[3].node.y=16.7;
                this.bmp_cardbackAry[3].node.width=47;
                this.bmp_cardbackAry[3].node.height=56;
                this.bmp_cardbackAry[3].node.setLocalZOrder(5);
                this.bmp_cardbackAry[3].node.scaleX=-1;

                this.bmp_cardcolorAry[0].node.x=-42.6;
                this.bmp_cardcolorAry[0].node.y=8.6;
                this.bmp_cardcolorAry[0].node.scaleX=0.55;
                this.bmp_cardcolorAry[0].node.scaleY=0.35;
                this.bmp_cardcolorAry[0].node.skewX=2;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(6);

                this.bmp_cardcolorAry[1].node.x=-0.8;
                this.bmp_cardcolorAry[1].node.y=25.5;
                this.bmp_cardcolorAry[1].node.scaleX=0.55;
                this.bmp_cardcolorAry[1].node.scaleY=0.35;
                this.bmp_cardcolorAry[1].node.skewX=1;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                

                this.bmp_cardHideAry[0].node.x=-41.7;
                this.bmp_cardHideAry[0].node.y=8.8;
                this.bmp_cardHideAry[0].node.scaleX=0.45;
                this.bmp_cardHideAry[0].node.scaleY=0.35;
                this.bmp_cardHideAry[0].node.skewX=2;

                this.bmp_cardHideAry[1].node.x=0.2;
                this.bmp_cardHideAry[1].node.y=8.8;
                this.bmp_cardHideAry[1].node.scaleX=0.45;
                this.bmp_cardHideAry[1].node.scaleY=0.35;
                this.bmp_cardHideAry[1].node.skewX=1;

                this.bmp_cardHideAry[2].node.x=41.7;
                this.bmp_cardHideAry[2].node.y=8.8;
                this.bmp_cardHideAry[2].node.scaleX=0.45;
                this.bmp_cardHideAry[2].node.scaleY=0.35;
                this.bmp_cardHideAry[2].node.skewX=-1;
                break;
            }
            case 4:{

                this.node.x=-143.2;
                this.node.y=285;

                this.bmp_cardbackAry[0].node.x=-43.1;
                this.bmp_cardbackAry[0].node.y=0;
                this.bmp_cardbackAry[0].node.width=54;
                this.bmp_cardbackAry[0].node.height=56;
                this.bmp_cardbackAry[0].node.setLocalZOrder(1);
                this.bmp_cardbackAry[0].node.scaleX=-1;

                this.bmp_cardbackAry[1].node.x=0;
                this.bmp_cardbackAry[1].node.y=0;
                this.bmp_cardbackAry[1].node.width=53;
                this.bmp_cardbackAry[1].node.height=56;
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);
                this.bmp_cardbackAry[1].node.scaleX=-1;

                this.bmp_cardbackAry[2].node.x=41;
                this.bmp_cardbackAry[2].node.y=0;
                this.bmp_cardbackAry[2].node.width=50;
                this.bmp_cardbackAry[2].node.height=56;
                this.bmp_cardbackAry[2].node.setLocalZOrder(3);
                this.bmp_cardbackAry[2].node.scaleX=-1;

                this.bmp_cardcolorAry[0].node.x=-43.9;
                this.bmp_cardcolorAry[0].node.y=8.6;
                this.bmp_cardcolorAry[0].node.scaleX=0.55;
                this.bmp_cardcolorAry[0].node.scaleY=0.35;
                this.bmp_cardcolorAry[0].node.skewX=9;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardbackAry[3].node.x=-2.3;
                this.bmp_cardbackAry[3].node.y=16.7;
                this.bmp_cardbackAry[3].node.width=53;
                this.bmp_cardbackAry[3].node.height=56;
                this.bmp_cardbackAry[3].node.setLocalZOrder(5);
                this.bmp_cardbackAry[3].node.scaleX=-1;

                this.bmp_cardcolorAry[1].node.x=-3.2;
                this.bmp_cardcolorAry[1].node.y=25.5;
                this.bmp_cardcolorAry[1].node.scaleX=0.55;
                this.bmp_cardcolorAry[1].node.scaleY=0.35;
                this.bmp_cardcolorAry[1].node.skewX=6;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(6);

                this.bmp_cardcolorAry[2].node.x=39.4;
                this.bmp_cardcolorAry[2].node.y=8.6;
                this.bmp_cardcolorAry[2].node.scaleX=0.55;
                this.bmp_cardcolorAry[2].node.scaleY=0.35;
                this.bmp_cardcolorAry[2].node.skewX=4;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(7);

                this.bmp_cardHideAry[0].node.x=-43;
                this.bmp_cardHideAry[0].node.y=8.8;
                this.bmp_cardHideAry[0].node.scaleX=0.45;
                this.bmp_cardHideAry[0].node.scaleY=0.35;
                this.bmp_cardHideAry[0].node.skewX=10;

                this.bmp_cardHideAry[1].node.x=-1.2;
                this.bmp_cardHideAry[1].node.y=8.8;
                this.bmp_cardHideAry[1].node.scaleX=0.45;
                this.bmp_cardHideAry[1].node.scaleY=0.35;
                this.bmp_cardHideAry[1].node.skewX=9;

                this.bmp_cardHideAry[2].node.x=40.6;
                this.bmp_cardHideAry[2].node.y=8.8;
                this.bmp_cardHideAry[2].node.scaleX=0.45;
                this.bmp_cardHideAry[2].node.scaleY=0.35;
                this.bmp_cardHideAry[2].node.skewX=6;
                break;
            }
        }
        this.bmp_cardHideAry[0].node.setLocalZOrder(8);
        this.bmp_cardHideAry[1].node.setLocalZOrder(9);
        this.bmp_cardHideAry[2].node.setLocalZOrder(10);
        this.light_node.active = true;
        this.node.y = this.node.y+25;
        
    }
}
