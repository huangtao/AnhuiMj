import LHZMJ_SingleFixedBase from "../LHZMJ_SingleFixedBase";
import { enFixedCardType, LHZMJ } from "../../../ConstDef/LHZMJMahjongDef";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_DownSingleFixed extends LHZMJ_SingleFixedBase {


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

   

    protected arrangeCard() {
        let url="";
        if(LHZMJ.ins.iclass.is2D()){
            this.node.rotation = 0;
            
            this.bmp_cardbackAry[0].node.x=0;
            this.bmp_cardbackAry[0].node.y=-31;
            this.bmp_cardbackAry[0].node.width=56;
            this.bmp_cardbackAry[0].node.height=45;
            this.bmp_cardbackAry[0].node.scaleX=1;

            this.bmp_cardbackAry[1].node.x=0;
            this.bmp_cardbackAry[1].node.y=0;
            this.bmp_cardbackAry[1].node.width=56;
            this.bmp_cardbackAry[1].node.height=45;
            this.bmp_cardbackAry[1].node.scaleX=1;
            
            this.bmp_cardbackAry[2].node.x=0;
            this.bmp_cardbackAry[2].node.y=31;
            this.bmp_cardbackAry[2].node.width=56;
            this.bmp_cardbackAry[2].node.height=45;
            this.bmp_cardbackAry[2].node.scaleX=1;

            this.bmp_cardbackAry[3].node.x=0;
            this.bmp_cardbackAry[3].node.y=13;
            this.bmp_cardbackAry[3].node.width=56;
            this.bmp_cardbackAry[3].node.height=45;
            this.bmp_cardbackAry[3].node.scaleX=1;

            this.bmp_cardcolorAry[0].node.x=0;
            this.bmp_cardcolorAry[0].node.y=-23;
            this.bmp_cardcolorAry[0].node.skewY=0;
            this.bmp_cardcolorAry[0].node.scaleX=0.4;
            this.bmp_cardcolorAry[0].node.scaleY=0.5;

            this.bmp_cardcolorAry[1].node.x=0;
            this.bmp_cardcolorAry[1].node.y=20;
            this.bmp_cardcolorAry[1].node.skewY=0;
            this.bmp_cardcolorAry[1].node.scaleX=0.4;
            this.bmp_cardcolorAry[1].node.scaleY=0.5;

            this.bmp_cardcolorAry[2].node.x=0;
            this.bmp_cardcolorAry[2].node.y=38;
            this.bmp_cardcolorAry[2].node.skewY=0;
            this.bmp_cardcolorAry[2].node.scaleX=0.4;
            this.bmp_cardcolorAry[2].node.scaleY=0.5;

            this.bmp_cardHideAry[0].node.x=0;
            this.bmp_cardHideAry[0].node.y=-27;
            this.bmp_cardHideAry[0].node.scaleX=0.45;
            this.bmp_cardHideAry[0].node.scaleY=0.45;
            this.bmp_cardHideAry[0].node.skewY=0;

            this.bmp_cardHideAry[1].node.x=0;
            this.bmp_cardHideAry[1].node.y=5;
            this.bmp_cardHideAry[1].node.scaleX=0.45;
            this.bmp_cardHideAry[1].node.scaleY=0.45;
            this.bmp_cardHideAry[1].node.skewY=0;

            this.bmp_cardHideAry[2].node.x=0;
            this.bmp_cardHideAry[2].node.y=37;
            this.bmp_cardHideAry[2].node.scaleX=0.45;
            this.bmp_cardHideAry[2].node.scaleY=0.45;
            this.bmp_cardHideAry[2].node.skewY=0;

            this.light_node.x = -2;
            this.light_node.y = 2;
            switch(this.fixedType) {
                case enFixedCardType.FixedCardType_AGang: {
                    
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_left_right_1280`;
                    // SetTextureRes(url,this.bmp_cardbackAry[0]);
                    // SetTextureRes(url,this.bmp_cardbackAry[1]);
                    // SetTextureRes(url,this.bmp_cardbackAry[2]);
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
                    // SetTextureRes(url,this.bmp_cardbackAry[3]);

                    
                    
                    // url=LHZMJ.ins.iclass.getMahjongResName(this.cardValue);
                    // SetTextureRes(url,this.bmp_cardcolorAry[1]);
                    this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyou_back@2x");
                    this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyou_back@2x");
                    this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyou_back@2x");
                    this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);

                    this.bmp_cardcolorAry[1].node.y = 20;
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
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
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
                    this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    
                    this.bmp_cardcolorAry[1].node.y = 20;
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

                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
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
                    this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    
                    this.bmp_cardcolorAry[1].node.y = 7;
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
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bm_bg_14");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bm_bg_13");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bm_bg_12");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_13");
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bm_bg_11");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bm_bg_10");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bm_bg_09");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_10");
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bm_bg_08");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bm_bg_07");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bm_bg_06");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_07");
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bm_bg_05");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bm_bg_04");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bm_bg_03");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_04");
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
                   
                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_14");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_13");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_12");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_13");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_11");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_10");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_09");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_10");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_08");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_07");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_06");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_07");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_05");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_04");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_03");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_04");
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
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_14");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_13");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_12");
                        // this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_13");
                        //this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].node.x=2.1;
                        this.bmp_cardcolorAry[1].node.y=9.3;
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_11");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_10");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_09");
                        // this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_10");
                        //this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].node.x=1.4;
                        this.bmp_cardcolorAry[1].node.y=9.1;
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_08");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_07");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_06");
                        // this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_07");
                        //this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].node.x=1.4;
                        this.bmp_cardcolorAry[1].node.y=8.9;
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_05");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_04");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_03");
                        // this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_04");
                        //this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_self_1280");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].node.x=1.1;
                        this.bmp_cardcolorAry[1].node.y=9.3;
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
        if(LHZMJ.ins.iclass.is2D()){
            this.light_node.rotation = 0;
        }else{
            this.light_node.x = -9;
            this.light_node.y = -3;
            this.light_node.rotation = -15;
        }
        if(this._pos!=0 && this._pos>0 && this._pos<4){
            switch(this._pos)
            {
                case 1:{
                    this.bmp_arrow[1].node.active = false;
                    this.bmp_arrow[2].node.active = false;
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
                this.node.x=566.5;
                this.node.y=-111;

                this.bmp_cardbackAry[2].node.x=-10;
                this.bmp_cardbackAry[2].node.y=32.1;
                this.bmp_cardbackAry[2].node.width=72;
                this.bmp_cardbackAry[2].node.height=52;
                this.bmp_cardbackAry[2].node.setLocalZOrder(1);
                this.bmp_cardbackAry[2].node.scaleX=-1;

                this.bmp_cardbackAry[1].node.x=0;
                this.bmp_cardbackAry[1].node.y=0;
                this.bmp_cardbackAry[1].node.width=74;
                this.bmp_cardbackAry[1].node.height=54;
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);
                this.bmp_cardbackAry[1].node.scaleX=-1;

                this.bmp_cardbackAry[0].node.x=11.3;
                this.bmp_cardbackAry[0].node.y=-33.8;
                this.bmp_cardbackAry[0].node.width=75;
                this.bmp_cardbackAry[0].node.height=55;
                this.bmp_cardbackAry[0].node.setLocalZOrder(3);
                this.bmp_cardbackAry[0].node.scaleX=-1;

                this.bmp_cardcolorAry[0].node.x=12.9;
                this.bmp_cardcolorAry[0].node.y=-23.9;
                this.bmp_cardcolorAry[0].node.scaleX=0.46;
                this.bmp_cardcolorAry[0].node.scaleY=0.54;
                this.bmp_cardcolorAry[0].node.skewY=15;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=-8.2;
                this.bmp_cardcolorAry[2].node.y=41.3;
                this.bmp_cardcolorAry[2].node.scaleX=0.42;
                this.bmp_cardcolorAry[2].node.scaleY=0.52;
                this.bmp_cardcolorAry[2].node.skewY=13;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);

                this.bmp_cardbackAry[3].node.x=5.9;
                this.bmp_cardbackAry[3].node.y=19;
                this.bmp_cardbackAry[3].node.width=74;
                this.bmp_cardbackAry[3].node.height=54;
                this.bmp_cardbackAry[3].node.setLocalZOrder(6);
                this.bmp_cardbackAry[3].node.scaleX=-1;    

                this.bmp_cardcolorAry[1].node.x=7.5;
                this.bmp_cardcolorAry[1].node.y=29;
                this.bmp_cardcolorAry[1].node.scaleX=0.46;
                this.bmp_cardcolorAry[1].node.scaleY=0.52;
                this.bmp_cardcolorAry[1].node.skewY=18;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                

                this.bmp_cardHideAry[0].node.x=12.8;
                this.bmp_cardHideAry[0].node.y=-23.8;
                this.bmp_cardHideAry[0].node.scaleX=0.47;
                this.bmp_cardHideAry[0].node.scaleY=0.51;
                this.bmp_cardHideAry[0].node.skewY=15;

                this.bmp_cardHideAry[1].node.x=1.7;
                this.bmp_cardHideAry[1].node.y=10.1;
                this.bmp_cardHideAry[1].node.scaleX=0.45;
                this.bmp_cardHideAry[1].node.scaleY=0.5;
                this.bmp_cardHideAry[1].node.skewY=18;

                this.bmp_cardHideAry[2].node.x=-8.1;
                this.bmp_cardHideAry[2].node.y=41.5;
                this.bmp_cardHideAry[2].node.scaleX=0.45;
                this.bmp_cardHideAry[2].node.scaleY=0.5;
                this.bmp_cardHideAry[2].node.skewY=15;
                break;
            }
            case 2:{
                this.node.x=535.3;
                this.node.y=-9;

                this.bmp_cardbackAry[2].node.x=-9.6;
                this.bmp_cardbackAry[2].node.y=31.2;
                this.bmp_cardbackAry[2].node.width=68;
                this.bmp_cardbackAry[2].node.height=50;
                this.bmp_cardbackAry[2].node.setLocalZOrder(1);
                this.bmp_cardbackAry[2].node.scaleX=-1;

                this.bmp_cardbackAry[1].node.x=0;
                this.bmp_cardbackAry[1].node.y=0;
                this.bmp_cardbackAry[1].node.width=70;
                this.bmp_cardbackAry[1].node.height=50;
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);
                this.bmp_cardbackAry[1].node.scaleX=-1;

                this.bmp_cardbackAry[0].node.x=9.6;
                this.bmp_cardbackAry[0].node.y=-31.7;
                this.bmp_cardbackAry[0].node.width=71;
                this.bmp_cardbackAry[0].node.height=52;
                this.bmp_cardbackAry[0].node.setLocalZOrder(3);
                this.bmp_cardbackAry[0].node.scaleX=-1;

                this.bmp_cardcolorAry[0].node.x=11.4;
                this.bmp_cardcolorAry[0].node.y=-22.1;
                this.bmp_cardcolorAry[0].node.scaleX=0.44;
                this.bmp_cardcolorAry[0].node.scaleY=0.53;
                this.bmp_cardcolorAry[0].node.skewY=15;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=-8.6;
                this.bmp_cardcolorAry[2].node.y=40.4;
                this.bmp_cardcolorAry[2].node.scaleX=0.42;
                this.bmp_cardcolorAry[2].node.scaleY=0.52;
                this.bmp_cardcolorAry[2].node.skewY=13;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);

                this.bmp_cardbackAry[3].node.x=5.3;
                this.bmp_cardbackAry[3].node.y=16.9;
                this.bmp_cardbackAry[3].node.width=70;
                this.bmp_cardbackAry[3].node.height=50;
                this.bmp_cardbackAry[3].node.setLocalZOrder(6);
                this.bmp_cardbackAry[3].node.scaleX=-1;    

                this.bmp_cardcolorAry[1].node.x=6.6;
                this.bmp_cardcolorAry[1].node.y=25.9;
                this.bmp_cardcolorAry[1].node.scaleX=0.43;
                this.bmp_cardcolorAry[1].node.scaleY=0.52;
                this.bmp_cardcolorAry[1].node.skewY=15;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                

                this.bmp_cardHideAry[0].node.x=11.3;
                this.bmp_cardHideAry[0].node.y=-22.3;
                this.bmp_cardHideAry[0].node.scaleX=0.435;
                this.bmp_cardHideAry[0].node.scaleY=0.48;
                this.bmp_cardHideAry[0].node.skewY=15;

                this.bmp_cardHideAry[1].node.x=1.5;
                this.bmp_cardHideAry[1].node.y=8.8;
                this.bmp_cardHideAry[1].node.scaleX=0.435;
                this.bmp_cardHideAry[1].node.scaleY=0.48;
                this.bmp_cardHideAry[1].node.skewY=18;

                this.bmp_cardHideAry[2].node.x=-8.7;
                this.bmp_cardHideAry[2].node.y=40.4;
                this.bmp_cardHideAry[2].node.scaleX=0.435;
                this.bmp_cardHideAry[2].node.scaleY=0.48;
                this.bmp_cardHideAry[2].node.skewY=15;
                break;
            }
            case 3:{
                this.node.x=506.3;
                this.node.y=88;

                this.bmp_cardbackAry[2].node.x=-9.6+1;
                this.bmp_cardbackAry[2].node.y=28.7;
                this.bmp_cardbackAry[2].node.width=63;
                this.bmp_cardbackAry[2].node.height=47;
                this.bmp_cardbackAry[2].node.setLocalZOrder(1);
                this.bmp_cardbackAry[2].node.scaleX=-1;

                this.bmp_cardbackAry[1].node.x=0+1;
                this.bmp_cardbackAry[1].node.y=0;
                this.bmp_cardbackAry[1].node.width=66;
                this.bmp_cardbackAry[1].node.height=48;
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);
                this.bmp_cardbackAry[1].node.scaleX=-1;

                this.bmp_cardbackAry[0].node.x=8.3+1;
                this.bmp_cardbackAry[0].node.y=-29.6;
                this.bmp_cardbackAry[0].node.width=68;
                this.bmp_cardbackAry[0].node.height=48;
                this.bmp_cardbackAry[0].node.setLocalZOrder(3);
                this.bmp_cardbackAry[0].node.scaleX=-1;

                this.bmp_cardcolorAry[0].node.x=10.2+1;
                this.bmp_cardcolorAry[0].node.y=-20.8;
                this.bmp_cardcolorAry[0].node.scaleX=0.41;
                this.bmp_cardcolorAry[0].node.scaleY=0.5;
                this.bmp_cardcolorAry[0].node.skewY=15;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=-7.5+1;
                this.bmp_cardcolorAry[2].node.y=37.7;
                this.bmp_cardcolorAry[2].node.scaleX=0.4;
                this.bmp_cardcolorAry[2].node.scaleY=0.5;
                this.bmp_cardcolorAry[2].node.skewY=13;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);

                this.bmp_cardbackAry[3].node.x=5.3+1;
                this.bmp_cardbackAry[3].node.y=16.9;
                this.bmp_cardbackAry[3].node.width=66;
                this.bmp_cardbackAry[3].node.height=48;
                this.bmp_cardbackAry[3].node.setLocalZOrder(6);
                this.bmp_cardbackAry[3].node.scaleX=-1;    

                this.bmp_cardcolorAry[1].node.x=6.2+1;
                this.bmp_cardcolorAry[1].node.y=25.4;
                this.bmp_cardcolorAry[1].node.scaleX=0.4;
                this.bmp_cardcolorAry[1].node.scaleY=0.5;
                this.bmp_cardcolorAry[1].node.skewY=14;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                

                this.bmp_cardHideAry[0].node.x=10.2+1;
                this.bmp_cardHideAry[0].node.y=-20.8;
                this.bmp_cardHideAry[0].node.scaleX=0.4;
                this.bmp_cardHideAry[0].node.scaleY=0.45;
                this.bmp_cardHideAry[0].node.skewY=15;

                this.bmp_cardHideAry[1].node.x=1.5+1;
                this.bmp_cardHideAry[1].node.y=8.6;
                this.bmp_cardHideAry[1].node.scaleX=0.4;
                this.bmp_cardHideAry[1].node.scaleY=0.45;
                this.bmp_cardHideAry[1].node.skewY=16;

                this.bmp_cardHideAry[2].node.x=-7.4+1;
                this.bmp_cardHideAry[2].node.y=37.7;
                this.bmp_cardHideAry[2].node.scaleX=0.4;
                this.bmp_cardHideAry[2].node.scaleY=0.45;
                this.bmp_cardHideAry[2].node.skewY=15;
                break;
            }
            case 4:{

                this.node.x=477.7;
                this.node.y=178;

                this.bmp_cardbackAry[2].node.x=-8.7+2;
                this.bmp_cardbackAry[2].node.y=27.5;
                this.bmp_cardbackAry[2].node.width=60;
                this.bmp_cardbackAry[2].node.height=45;
                this.bmp_cardbackAry[2].node.setLocalZOrder(1);
                this.bmp_cardbackAry[2].node.scaleX=-1;

                this.bmp_cardbackAry[1].node.x=0+2;
                this.bmp_cardbackAry[1].node.y=0;
                this.bmp_cardbackAry[1].node.width=62;
                this.bmp_cardbackAry[1].node.height=46;
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);
                this.bmp_cardbackAry[1].node.scaleX=-1;

                this.bmp_cardbackAry[0].node.x=8.2+2;
                this.bmp_cardbackAry[0].node.y=-27.1;
                this.bmp_cardbackAry[0].node.width=63;
                this.bmp_cardbackAry[0].node.height=47;
                this.bmp_cardbackAry[0].node.setLocalZOrder(3);
                this.bmp_cardbackAry[0].node.scaleX=-1;

                this.bmp_cardcolorAry[0].node.x=9.8+2;
                this.bmp_cardcolorAry[0].node.y=-18.3;
                this.bmp_cardcolorAry[0].node.scaleX=0.37;
                this.bmp_cardcolorAry[0].node.scaleY=0.47;
                this.bmp_cardcolorAry[0].node.skewY=14;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=-6.9+2;
                this.bmp_cardcolorAry[2].node.y=35.9;
                this.bmp_cardcolorAry[2].node.scaleX=0.37;
                this.bmp_cardcolorAry[2].node.scaleY=0.47;
                this.bmp_cardcolorAry[2].node.skewY=13;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);

                this.bmp_cardbackAry[3].node.x=5.3+2;
                this.bmp_cardbackAry[3].node.y=16.9;
                this.bmp_cardbackAry[3].node.width=62;
                this.bmp_cardbackAry[3].node.height=46;
                this.bmp_cardbackAry[3].node.setLocalZOrder(6);
                this.bmp_cardbackAry[3].node.scaleX=-1;    

                this.bmp_cardcolorAry[1].node.x=6.5+2;
                this.bmp_cardcolorAry[1].node.y=25.9;
                this.bmp_cardcolorAry[1].node.scaleX=0.37;
                this.bmp_cardcolorAry[1].node.scaleY=0.47;
                this.bmp_cardcolorAry[1].node.skewY=14;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                

                this.bmp_cardHideAry[0].node.x=10.1+2;
                this.bmp_cardHideAry[0].node.y=-18.4;
                this.bmp_cardHideAry[0].node.scaleX=0.36;
                this.bmp_cardHideAry[0].node.scaleY=0.44;
                this.bmp_cardHideAry[0].node.skewY=15;

                this.bmp_cardHideAry[1].node.x=0.77+2;
                this.bmp_cardHideAry[1].node.y=9.49;
                this.bmp_cardHideAry[1].node.scaleX=0.36;
                this.bmp_cardHideAry[1].node.scaleY=0.42;
                this.bmp_cardHideAry[1].node.skewY=16;

                this.bmp_cardHideAry[2].node.x=-7+2;
                this.bmp_cardHideAry[2].node.y=36.3;
                this.bmp_cardHideAry[2].node.scaleX=0.36;
                this.bmp_cardHideAry[2].node.scaleY=0.41;
                this.bmp_cardHideAry[2].node.skewY=15;
                break;
            }
        }
        
        this.bmp_cardHideAry[0].node.setLocalZOrder(8);
        this.bmp_cardHideAry[1].node.setLocalZOrder(9);
        this.bmp_cardHideAry[2].node.setLocalZOrder(10);
        // this.bmp_arrow.node.setLocalZOrder(11);
        this.light_node.active = true;
        this.node.rotation = 1.2;
        this.node.y = this.node.y - 20;

    }
}
