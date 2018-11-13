import HZMJ_SingleFixedBase from "../HZMJ_SingleFixedBase";
import { enFixedCardType, HZMJ } from "../../../ConstDef/HZMJMahjongDef";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_DownSingleFixed extends HZMJ_SingleFixedBase {


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

    /**
     * 整理牌阵
     * */
    // protected arrangeCard() {
    //     let url="";
    //     switch(this.fixedType) {
    //         case enFixedCardType.FixedCardType_AGang: {
                
    //             url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_left_right_1280`;
    //             // SetTextureRes(url,this.bmp_cardbackAry[0]);
    //             // SetTextureRes(url,this.bmp_cardbackAry[1]);
    //             // SetTextureRes(url,this.bmp_cardbackAry[2]);
    //             url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
    //             // SetTextureRes(url,this.bmp_cardbackAry[3]);

                
                
    //             // url=HZMJ.ins.iclass.getMahjongResName(this.cardValue);
    //             // SetTextureRes(url,this.bmp_cardcolorAry[1]);
    //             this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcardback_left_right_1280");
    //             this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcardback_left_right_1280");
    //             this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcardback_left_right_1280");
    //             this.bmp_cardbackAry[3].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
    //             this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);

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
    //             url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
    //             // SetTextureRes(url,this.bmp_cardbackAry[0]);
    //             // SetTextureRes(url,this.bmp_cardbackAry[1]);
    //             // SetTextureRes(url,this.bmp_cardbackAry[2]);
    //             // SetTextureRes(url,this.bmp_cardbackAry[3]);
                
    //             // //
    //             // //=================
    //             // //
    //             // url=HZMJ.ins.iclass.getMahjongResName(this.cardValue);
    //             // SetTextureRes(url,this.bmp_cardcolorAry[0]);
    //             // SetTextureRes(url,this.bmp_cardcolorAry[1]);
    //             // SetTextureRes(url,this.bmp_cardcolorAry[2]);
    //             this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
    //             this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
    //             this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
    //             this.bmp_cardbackAry[3].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
    //             this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
    //             this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
    //             this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                
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

    //             url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
    //             // SetTextureRes(url,this.bmp_cardbackAry[0]);
    //             // SetTextureRes(url,this.bmp_cardbackAry[1]);
    //             // SetTextureRes(url,this.bmp_cardbackAry[2]);
    //             // SetTextureRes(url,this.bmp_cardbackAry[3]);
                
    //             // //
    //             // //=================
    //             // //
    //             // url=HZMJ.ins.iclass.getMahjongResName(this.cardValue);
    //             // SetTextureRes(url,this.bmp_cardcolorAry[0]);
    //             // SetTextureRes(url,this.bmp_cardcolorAry[1]);
    //             // SetTextureRes(url,this.bmp_cardcolorAry[2]);
    //             this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
    //             this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
    //             this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
    //             this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
    //             this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
    //             this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                
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
        if(HZMJ.ins.iclass.is2D()){
            this.bmp_cardbackAry[0].node.x=0;
            this.bmp_cardbackAry[0].node.y=-32;
            this.bmp_cardbackAry[0].node.width=52;
            this.bmp_cardbackAry[0].node.height=42;
            this.bmp_cardbackAry[0].node.scaleX=1;

            this.bmp_cardbackAry[1].node.x=0;
            this.bmp_cardbackAry[1].node.y=0;
            this.bmp_cardbackAry[1].node.width=52;
            this.bmp_cardbackAry[1].node.height=42;
            this.bmp_cardbackAry[1].node.scaleX=1;
            
            this.bmp_cardbackAry[2].node.x=0;
            this.bmp_cardbackAry[2].node.y=32;
            this.bmp_cardbackAry[2].node.width=52;
            this.bmp_cardbackAry[2].node.height=42;
            this.bmp_cardbackAry[2].node.scaleX=1;

            this.bmp_cardbackAry[3].node.x=0;
            this.bmp_cardbackAry[3].node.y=10;
            this.bmp_cardbackAry[3].node.width=52;
            this.bmp_cardbackAry[3].node.height=42;
            this.bmp_cardbackAry[3].node.scaleX=1;

            this.bmp_cardcolorAry[0].node.x=0;
            this.bmp_cardcolorAry[0].node.y=-27;
            this.bmp_cardcolorAry[0].node.skewY=0;
            this.bmp_cardcolorAry[0].node.scaleX=0.5;
            this.bmp_cardcolorAry[0].node.scaleY=0.5;

            this.bmp_cardcolorAry[1].node.x=0;
            this.bmp_cardcolorAry[1].node.y=15;
            this.bmp_cardcolorAry[1].node.skewY=0;
            this.bmp_cardcolorAry[1].node.scaleX=0.5;
            this.bmp_cardcolorAry[1].node.scaleY=0.5;

            this.bmp_cardcolorAry[2].node.x=0;
            this.bmp_cardcolorAry[2].node.y=37;
            this.bmp_cardcolorAry[2].node.skewY=0;
            this.bmp_cardcolorAry[2].node.scaleX=0.5;
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
            switch(this.fixedType) {
                case enFixedCardType.FixedCardType_AGang: {
                    
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_left_right_1280`;
                    // SetTextureRes(url,this.bmp_cardbackAry[0]);
                    // SetTextureRes(url,this.bmp_cardbackAry[1]);
                    // SetTextureRes(url,this.bmp_cardbackAry[2]);
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
                    // SetTextureRes(url,this.bmp_cardbackAry[3]);

                    
                    
                    // url=HZMJ.ins.iclass.getMahjongResName(this.cardValue);
                    // SetTextureRes(url,this.bmp_cardcolorAry[1]);
                    this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcardback_left_right_1280");
                    this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcardback_left_right_1280");
                    this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcardback_left_right_1280");
                    this.bmp_cardbackAry[3].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
                    this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);

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
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
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
                    this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
                    this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
                    this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
                    this.bmp_cardbackAry[3].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
                    this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    
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

                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
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
                    this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
                    this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
                    this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
                    this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    
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
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_17");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_16");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_15");
                        this.bmp_cardbackAry[3].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_16");
                        this.bmp_cardbackAry[3].node.x = -37;
                        this.bmp_cardbackAry[3].node.y = 52;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.26;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.36;
                        this.bmp_cardcolorAry[3].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_14");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_13");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_12");
                        this.bmp_cardbackAry[3].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_13");
                        this.bmp_cardbackAry[3].node.x = -45;
                        this.bmp_cardbackAry[3].node.y = 256;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.24;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.34;
                        this.bmp_cardcolorAry[3].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==3){ 
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_11");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_10");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_9");
                        this.bmp_cardbackAry[3].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_10");
                        this.bmp_cardbackAry[3].node.x = -37;
                        this.bmp_cardbackAry[3].node.y = 60;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.22;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.32;
                        this.bmp_cardcolorAry[3].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_8");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_7");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_6");
                        this.bmp_cardbackAry[3].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_7");
                        this.bmp_cardbackAry[3].node.x = 4;
                        this.bmp_cardbackAry[3].node.y = 175;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.20;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.30;
                        this.bmp_cardcolorAry[3].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
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
                case enFixedCardType.FixedCardType_MGang: {
                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_17");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_16");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_15");
                        this.bmp_cardbackAry[3].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_16");
                        this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -38;
                        this.bmp_cardbackAry[3].node.y = 52;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.26;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.36;
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_14");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_13");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_12");
                        this.bmp_cardbackAry[3].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_13");
                        this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -45;
                        this.bmp_cardbackAry[3].node.y = 256;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.24;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.34;
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_11");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_10");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_9");
                        this.bmp_cardbackAry[3].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_10");
                        this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = 2;
                        this.bmp_cardbackAry[3].node.y = 125;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.22;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.32;
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_8");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_7");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_6");
                        this.bmp_cardbackAry[3].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_7");
                        this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = 4;
                        this.bmp_cardbackAry[3].node.y = 175;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.20;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.30;
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
                case enFixedCardType.FixedCardType_BGang: {

                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_17");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_16");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_15");
                        this.bmp_cardbackAry[3].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_16");
                        this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -34;
                        this.bmp_cardbackAry[3].node.y = 53;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.24;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.34;
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_14");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_13");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_12");
                        this.bmp_cardbackAry[3].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_13");
                        this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -45;
                        this.bmp_cardbackAry[3].node.y = 260;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.24;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.34;
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_11");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_10");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_9");
                        this.bmp_cardbackAry[3].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_10");
                        this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -37;
                        this.bmp_cardbackAry[3].node.y = 60;
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_8");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_7");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_6");
                        this.bmp_cardbackAry[3].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_7");
                        this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -36;
                        this.bmp_cardbackAry[3].node.y = 68;
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
                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_17");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_16");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_15");
                        this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);                                    
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_14");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_13");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_12");
                        this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_11");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_10");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_9");
                        this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_8");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_7");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_6");
                        this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
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
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_17");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_16");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_15");
                        this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType -2);
                        this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType -1);
                        this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType);
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_14");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_13");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_12");
                        this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType -2);
                        this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType -1);
                        this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType);
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_11");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_10");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_9");
                        this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType -2);
                        this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType -1);
                        this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType);
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_8");
                        this.bmp_cardbackAry[1].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_7");
                        this.bmp_cardbackAry[2].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_6");
                        this.bmp_cardcolorAry[0].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType -2);
                        this.bmp_cardcolorAry[1].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType -1);
                        this.bmp_cardcolorAry[2].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue + this._chiType);
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
                    this.bmp_arrow.node.rotation = 0;
                    break;
                }
                case 2:{
                    this.bmp_arrow.node.rotation = -90;
                    break;
                }
                case 3:{
                    this.bmp_arrow.node.rotation = 180;
                    break;
                }
            }
            this.bmp_arrow.node.active=true;;
        }
    }

    private set3DSize(){
        switch(this._cardIndex){
            case 1:{
                this.node.x=561.5;
                this.node.y=-111;

                this.bmp_cardbackAry[2].node.x=-50;
                this.bmp_cardbackAry[2].node.y=80;   
                this.bmp_cardbackAry[2].node.setLocalZOrder(1);

                this.bmp_cardbackAry[1].node.x=-42;
                this.bmp_cardbackAry[1].node.y=44;              
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);
      
                this.bmp_cardbackAry[0].node.x=-34;
                this.bmp_cardbackAry[0].node.y=7;             
                this.bmp_cardbackAry[0].node.setLocalZOrder(3);

                this.bmp_cardcolorAry[0].node.x=5;
                this.bmp_cardcolorAry[0].node.y=6;
                this.bmp_cardcolorAry[0].node.scaleX = 0.26;
                this.bmp_cardcolorAry[0].node.scaleY = 0.36;
                this.bmp_cardcolorAry[0].node.skewY = 9;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=4;
                this.bmp_cardcolorAry[2].node.y=4;
                this.bmp_cardcolorAry[2].node.scaleX = 0.26;
                this.bmp_cardcolorAry[2].node.scaleY = 0.36;
                this.bmp_cardcolorAry[2].node.skewY = 9;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);

                this.bmp_cardbackAry[3].node.x=0;
                this.bmp_cardbackAry[3].node.y=2;
                this.bmp_cardbackAry[3].node.setLocalZOrder(6);  

                this.bmp_cardcolorAry[1].node.x=3;
                this.bmp_cardcolorAry[1].node.y=3;
                this.bmp_cardcolorAry[1].node.scaleX = 0.26;
                this.bmp_cardcolorAry[1].node.scaleY = 0.36;
                this.bmp_cardcolorAry[1].node.skewY = 9;
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
                this.node.x= 543;
                this.node.y=-204;

                this.bmp_cardbackAry[2].node.x=-60;
                this.bmp_cardbackAry[2].node.y=280;   
                this.bmp_cardbackAry[2].node.setLocalZOrder(1);

                this.bmp_cardbackAry[1].node.x=-52;
                this.bmp_cardbackAry[1].node.y=249;              
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);
      
                this.bmp_cardbackAry[0].node.x=-44;
                this.bmp_cardbackAry[0].node.y=216;             
                this.bmp_cardbackAry[0].node.setLocalZOrder(3);

                this.bmp_cardcolorAry[0].node.x=5;
                this.bmp_cardcolorAry[0].node.y=4;
                this.bmp_cardcolorAry[0].node.scaleX = 0.24;
                this.bmp_cardcolorAry[0].node.scaleY = 0.34;
                this.bmp_cardcolorAry[0].node.skewY = 9;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=4;
                this.bmp_cardcolorAry[2].node.y=4;
                this.bmp_cardcolorAry[2].node.scaleX = 0.24;
                this.bmp_cardcolorAry[2].node.scaleY = 0.34;
                this.bmp_cardcolorAry[2].node.skewY = 9;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);

                this.bmp_cardbackAry[3].node.x=0;
                this.bmp_cardbackAry[3].node.y=0;
                this.bmp_cardbackAry[3].node.setLocalZOrder(6);  

                this.bmp_cardcolorAry[1].node.x=3;
                this.bmp_cardcolorAry[1].node.y=5;
                this.bmp_cardcolorAry[1].node.scaleX = 0.24;
                this.bmp_cardcolorAry[1].node.scaleY = 0.34;
                this.bmp_cardcolorAry[1].node.skewY = 9;
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
                this.node.x=506;
                this.node.y=97;

                this.bmp_cardbackAry[2].node.x=-50;
                this.bmp_cardbackAry[2].node.y=80;   
                this.bmp_cardbackAry[2].node.setLocalZOrder(1);

                this.bmp_cardbackAry[1].node.x=-42;
                this.bmp_cardbackAry[1].node.y=50;              
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);
      
                this.bmp_cardbackAry[0].node.x=-34;
                this.bmp_cardbackAry[0].node.y=20;             
                this.bmp_cardbackAry[0].node.setLocalZOrder(3);

                this.bmp_cardcolorAry[0].node.x=5;
                this.bmp_cardcolorAry[0].node.y=6;
                this.bmp_cardcolorAry[0].node.scaleX = 0.21;
                this.bmp_cardcolorAry[0].node.scaleY = 0.31;
                this.bmp_cardcolorAry[0].node.skewY = 9;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=4;
                this.bmp_cardcolorAry[2].node.y=4;
                this.bmp_cardcolorAry[2].node.scaleX = 0.21;
                this.bmp_cardcolorAry[2].node.scaleY = 0.31;
                this.bmp_cardcolorAry[2].node.skewY = 9;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);

                this.bmp_cardbackAry[3].node.x=0;
                this.bmp_cardbackAry[3].node.y=0;
                this.bmp_cardbackAry[3].node.setLocalZOrder(6);  

                this.bmp_cardcolorAry[1].node.x=3;
                this.bmp_cardcolorAry[1].node.y=3;
                this.bmp_cardcolorAry[1].node.scaleX = 0.21;
                this.bmp_cardcolorAry[1].node.scaleY = 0.31;
                this.bmp_cardcolorAry[1].node.skewY = 9;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                

                this.bmp_cardHideAry[0].node.x=10.2;
                this.bmp_cardHideAry[0].node.y=-20.8;
                this.bmp_cardHideAry[0].node.scaleX=0.4;
                this.bmp_cardHideAry[0].node.scaleY=0.45;
                this.bmp_cardHideAry[0].node.skewY=15;

                this.bmp_cardHideAry[1].node.x=1.5;
                this.bmp_cardHideAry[1].node.y=8.6;
                this.bmp_cardHideAry[1].node.scaleX=0.4;
                this.bmp_cardHideAry[1].node.scaleY=0.45;
                this.bmp_cardHideAry[1].node.skewY=16;

                this.bmp_cardHideAry[2].node.x=-7.4;
                this.bmp_cardHideAry[2].node.y=37.7;
                this.bmp_cardHideAry[2].node.scaleX=0.4;
                this.bmp_cardHideAry[2].node.scaleY=0.45;
                this.bmp_cardHideAry[2].node.skewY=15;
                break;
            }
            case 4:{
                this.node.x=478;
                this.node.y=190;

                this.bmp_cardbackAry[2].node.x=-43;
                this.bmp_cardbackAry[2].node.y=80;   
                this.bmp_cardbackAry[2].node.setLocalZOrder(1);

                this.bmp_cardbackAry[1].node.x=-37;
                this.bmp_cardbackAry[1].node.y=55;              
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);
      
                this.bmp_cardbackAry[0].node.x=-29;
                this.bmp_cardbackAry[0].node.y=28;             
                this.bmp_cardbackAry[0].node.setLocalZOrder(3);

                this.bmp_cardcolorAry[0].node.x=5;
                this.bmp_cardcolorAry[0].node.y=6;
                this.bmp_cardcolorAry[0].node.scaleX = 0.19;
                this.bmp_cardcolorAry[0].node.scaleY = 0.29;
                this.bmp_cardcolorAry[0].node.skewY = 9;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=4;
                this.bmp_cardcolorAry[2].node.y=6;
                this.bmp_cardcolorAry[2].node.scaleX = 0.19;
                this.bmp_cardcolorAry[2].node.scaleY = 0.29;
                this.bmp_cardcolorAry[2].node.skewY = 9;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);

                this.bmp_cardbackAry[3].node.x=0;
                this.bmp_cardbackAry[3].node.y=0;
                this.bmp_cardbackAry[3].node.setLocalZOrder(6);  

                this.bmp_cardcolorAry[1].node.x=3;
                this.bmp_cardcolorAry[1].node.y=5;
                this.bmp_cardcolorAry[1].node.scaleX = 0.19;
                this.bmp_cardcolorAry[1].node.scaleY = 0.29;
                this.bmp_cardcolorAry[1].node.skewY = 9;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                
                this.bmp_cardHideAry[0].node.x=10.1;
                this.bmp_cardHideAry[0].node.y=-18.4;
                this.bmp_cardHideAry[0].node.scaleX=0.36;
                this.bmp_cardHideAry[0].node.scaleY=0.44;
                this.bmp_cardHideAry[0].node.skewY=15;

                this.bmp_cardHideAry[1].node.x=0.77;
                this.bmp_cardHideAry[1].node.y=9.49;
                this.bmp_cardHideAry[1].node.scaleX=0.36;
                this.bmp_cardHideAry[1].node.scaleY=0.42;
                this.bmp_cardHideAry[1].node.skewY=16;

                this.bmp_cardHideAry[2].node.x=-7;
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
        this.bmp_arrow.node.setLocalZOrder(11);

    }
}
