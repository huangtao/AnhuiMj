import LHZMJ_SingleFixedBase from "../LHZMJ_SingleFixedBase";
import { enFixedCardType, LHZMJ } from "../../../ConstDef/LHZMJMahjongDef";
import { SetTextureRes } from "../../../../MJCommon/MJ_Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_UpSingleFixed extends LHZMJ_SingleFixedBase {


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
            this.bmp_cardbackAry[0].node.x=0;
            this.bmp_cardbackAry[0].node.y=30;
            this.bmp_cardbackAry[0].node.width=56;
            this.bmp_cardbackAry[0].node.height=45;
            this.bmp_cardbackAry[0].node.scaleX=1;

            this.bmp_cardbackAry[1].node.x=0;
            this.bmp_cardbackAry[1].node.y=-1;
            this.bmp_cardbackAry[1].node.width=56;
            this.bmp_cardbackAry[1].node.height=45;
            this.bmp_cardbackAry[1].node.scaleX=1;
            
            this.bmp_cardbackAry[2].node.x=0;
            this.bmp_cardbackAry[2].node.y=-32;
            this.bmp_cardbackAry[2].node.width=56;
            this.bmp_cardbackAry[2].node.height=45;
            this.bmp_cardbackAry[2].node.scaleX=1;

            this.bmp_cardbackAry[3].node.x=0;
            this.bmp_cardbackAry[3].node.y=11;
            this.bmp_cardbackAry[3].node.width=56;
            this.bmp_cardbackAry[3].node.height=45;
            this.bmp_cardbackAry[3].node.scaleX=1;

            for(let i=0;i<4;i++){
                this.bmp_cardcolorAry[i].node.x=0;
                this.bmp_cardcolorAry[i].node.y=8;
                this.bmp_cardcolorAry[i].node.skewY=0;
                this.bmp_cardcolorAry[i].node.scaleX=0.55;
                this.bmp_cardcolorAry[i].node.scaleY=0.5;
            }
            switch(this.fixedType) {
                case enFixedCardType.FixedCardType_AGang: {
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_left_right_1280`;
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
                    this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyou_back@2x");
                    this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyou_back@2x");
                    this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyou_back@2x");
                    this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHua2D(this.cardValue);

                    
                    this.bmp_cardbackAry[0].node.active=true;
                    this.bmp_cardbackAry[1].node.active=true;
                    this.bmp_cardbackAry[2].node.active=true;
                    this.bmp_cardbackAry[3].node.active=true;
                    this.bmp_cardcolorAry[0].node.active=false;
                    this.bmp_cardcolorAry[1].node.active=false;
                    this.bmp_cardcolorAry[2].node.active=false;
                    this.bmp_cardcolorAry[3].node.active=true;
                    for(let i=0;i<3;i++){
                        this.light_arrow[i].node.active = false;
                    }
                    // this.light_node.active = false;
                    break;
                }
                case enFixedCardType.FixedCardType_MGang:
                case enFixedCardType.FixedCardType_BGang: {
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
                    
                    this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHua2D(this.cardValue);
                    this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHua2D(this.cardValue);
                    this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHua2D(this.cardValue);
                    this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHua2D(this.cardValue);
                    
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

                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
                    this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHua2D(this.cardValue);
                    this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHua2D(this.cardValue);
                    this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHua2D(this.cardValue);
                    
                    this.bmp_cardbackAry[3].node.active=false;
                    this.bmp_cardbackAry[0].node.active=true;
                    this.bmp_cardbackAry[1].node.active=true;
                    this.bmp_cardbackAry[2].node.active=true;
                    
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
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_2_17");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_2_16");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_2_15");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_16");
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -11;
                        this.bmp_cardbackAry[3].node.y = -12;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.30;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.40;
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_2_14");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_2_13");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_2_12");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_13");
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -13;
                        this.bmp_cardbackAry[3].node.y = -14;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.32;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.42;
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_2_11");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_2_10");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_2_9");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_10");
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -14;
                        this.bmp_cardbackAry[3].node.y = -17;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.34;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.44;
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_2_8");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_2_7");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_2_6");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_7");
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -17;
                        this.bmp_cardbackAry[3].node.y = -19;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.36;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.46;
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
                    for(let i=0;i<3;i++){
                        this.light_arrow[i].node.active = false;
                    }
                    break;
                }
                case enFixedCardType.FixedCardType_MGang: {
                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_17");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_16");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_15");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_16");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -15;
                        this.bmp_cardbackAry[3].node.y = -15;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.30;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.40;
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_14");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_13");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_12");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_13");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -13;
                        this.bmp_cardbackAry[3].node.y = -14;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.32;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.42;
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_11");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_10");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_9");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_10");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -14;
                        this.bmp_cardbackAry[3].node.y = -17;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.34;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.44;
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_8");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_7");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_6");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_7");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -17;
                        this.bmp_cardbackAry[3].node.y = -19;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.36;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.46;
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
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_17");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_16");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_15");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_16");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -15;
                        this.bmp_cardbackAry[3].node.y = -15;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.30;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.40;
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_14");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_13");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_12");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_13");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -13;
                        this.bmp_cardbackAry[3].node.y = -14;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.32;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.42;
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_11");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_10");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_9");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_10");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -14;
                        this.bmp_cardbackAry[3].node.y = -17;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.34;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.44;
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_8");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_7");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_6");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_7");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -17;
                        this.bmp_cardbackAry[3].node.y = -19;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.36;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.46;
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
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_17");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_16");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_15");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].node.x=-1;
                        this.bmp_cardcolorAry[1].node.y=8;
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_14");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_13");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_12");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].node.x=-1.5;
                        this.bmp_cardcolorAry[1].node.y=9.3;
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_11");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_10");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_9");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].node.x=-1.7;
                        this.bmp_cardcolorAry[1].node.y=8.7;
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_8");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_7");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_left_1_6");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].node.x=-1.7;
                        this.bmp_cardcolorAry[1].node.y=9.4;
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
       if(LHZMJ.ins.iclass.is2D()){
            this.light_arrow[0].node.x = 33.3;
            this.light_arrow[0].node.y = -5.7;
            this.light_arrow[1].node.x = 32.8;
            this.light_arrow[1].node.y = -5.5;
            this.light_arrow[2].node.x = 33.2;
            this.light_arrow[2].node.y = -6.7;
            this.light_arrow[0].node.rotation = 90;
            this.light_arrow[1].node.rotation = 90;
            this.light_arrow[2].node.rotation = 90;

        }else{
            this.light_arrow[0].node.x = 29.3;
            this.light_arrow[0].node.y = -5.7;
            this.light_arrow[1].node.x = 28.8;
            this.light_arrow[1].node.y = -5.5;
            this.light_arrow[2].node.x = 29.2;
            this.light_arrow[2].node.y = -6.7;
            this.light_arrow[0].node.rotation = 102;
            this.light_arrow[1].node.rotation = 102;
            this.light_arrow[2].node.rotation = 102;
        }
        
         if(this._pos!=0 && this._pos>0 && this._pos<4){
            switch(this._pos)
            {
                case 1:{
                    this.light_arrow[0].node.active = false;
                    this.light_arrow[1].node.active = false;
                    this.light_arrow[2].node.active = true;
                    break;
                }
                case 2:{
                     this.light_arrow[0].node.active = false;
                    this.light_arrow[2].node.active = false;
                    this.light_arrow[1].node.active = true;
                    break;
                }
                case 3:{
                     this.light_arrow[1].node.active = false;
                    this.light_arrow[2].node.active = false;
                    this.light_arrow[0].node.active = true;
                    break;
                }
            }
            // this.bmp_arrow.node.active=true;;
        }
        
    }
    private set3DSize(){
        switch(this._cardIndex){
            case 1:{
                this.node.x=-440;
                this.node.y=260;

                this.bmp_cardbackAry[0].node.x=0;
                this.bmp_cardbackAry[0].node.y=0;
                this.bmp_cardbackAry[0].node.setLocalZOrder(1);

                this.bmp_cardbackAry[1].node.x=-7;
                this.bmp_cardbackAry[1].node.y=-25;
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);

                this.bmp_cardbackAry[2].node.x=-14;
                this.bmp_cardbackAry[2].node.y=-49;
                this.bmp_cardbackAry[2].node.setLocalZOrder(3);              

                this.bmp_cardcolorAry[0].node.x=-2;
                this.bmp_cardcolorAry[0].node.y=6;
                this.bmp_cardcolorAry[0].node.scaleX = 0.30;
                this.bmp_cardcolorAry[0].node.scaleY = 0.40;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=-3;
                this.bmp_cardcolorAry[2].node.y=6;
                this.bmp_cardcolorAry[2].node.scaleX = 0.30;
                this.bmp_cardcolorAry[2].node.scaleY = 0.40;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);

                this.bmp_cardbackAry[3].node.x=0;
                this.bmp_cardbackAry[3].node.y=0;
                this.bmp_cardbackAry[3].node.setLocalZOrder(6);  

                this.bmp_cardcolorAry[1].node.x=0;
                this.bmp_cardcolorAry[1].node.y=0;
                this.bmp_cardcolorAry[1].node.scaleX = 0.30;
                this.bmp_cardcolorAry[1].node.scaleY = 0.40;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);

                
                break;
            }
            case 2:{
                this.node.x=-463;
                this.node.y=178;

                this.bmp_cardbackAry[0].node.x=0;
                this.bmp_cardbackAry[0].node.y=0;
                this.bmp_cardbackAry[0].node.setLocalZOrder(1);

                this.bmp_cardbackAry[1].node.x=-7;
                this.bmp_cardbackAry[1].node.y=-27;
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);

                this.bmp_cardbackAry[2].node.x=-15;
                this.bmp_cardbackAry[2].node.y=-53;
                this.bmp_cardbackAry[2].node.setLocalZOrder(3);
                         
                this.bmp_cardcolorAry[0].node.x=-1;
                this.bmp_cardcolorAry[0].node.y=5.5;
                this.bmp_cardcolorAry[0].node.scaleX = 0.32;
                this.bmp_cardcolorAry[0].node.scaleY = 0.42;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=-2;
                this.bmp_cardcolorAry[2].node.y=6.5;
                this.bmp_cardcolorAry[2].node.scaleX = 0.32;
                this.bmp_cardcolorAry[2].node.scaleY = 0.42;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);

                this.bmp_cardbackAry[3].node.x=-1;
                this.bmp_cardbackAry[3].node.y=0;
                this.bmp_cardbackAry[3].node.setLocalZOrder(6);   

                this.bmp_cardcolorAry[1].node.x=0;
                this.bmp_cardcolorAry[1].node.y=0;
                this.bmp_cardcolorAry[1].node.scaleX = 0.32;
                this.bmp_cardcolorAry[1].node.scaleY = 0.42;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                
                break;
            }
            case 3:{
                this.node.x=-489;
                this.node.y=90;

                this.bmp_cardbackAry[0].node.x=0;
                this.bmp_cardbackAry[0].node.y=0;
                this.bmp_cardbackAry[0].node.setLocalZOrder(1);

                this.bmp_cardbackAry[1].node.x=-8;
                this.bmp_cardbackAry[1].node.y=-28;
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);

                this.bmp_cardbackAry[2].node.x=-16;
                this.bmp_cardbackAry[2].node.y=-56;
                this.bmp_cardbackAry[2].node.setLocalZOrder(3);               
                
                this.bmp_cardcolorAry[0].node.x=-2;
                this.bmp_cardcolorAry[0].node.y=5;
                this.bmp_cardcolorAry[0].node.scaleX = 0.34;
                this.bmp_cardcolorAry[0].node.scaleY = 0.44;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=-2;
                this.bmp_cardcolorAry[2].node.y=5;
                this.bmp_cardcolorAry[2].node.scaleX = 0.34;
                this.bmp_cardcolorAry[2].node.scaleY = 0.44;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);

                this.bmp_cardbackAry[3].node.x=0;
                this.bmp_cardbackAry[3].node.y=0;
                this.bmp_cardbackAry[3].node.setLocalZOrder(6);

                this.bmp_cardcolorAry[1].node.x=0;
                this.bmp_cardcolorAry[1].node.y=-2;
                this.bmp_cardcolorAry[1].node.scaleX = 0.34;
                this.bmp_cardcolorAry[1].node.scaleY = 0.44;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                
                break;
            }
            case 4:{

                this.node.x=-519;
                this.node.y=-10;

                this.bmp_cardbackAry[0].node.x=0;
                this.bmp_cardbackAry[0].node.y=0;
                this.bmp_cardbackAry[0].node.setLocalZOrder(1);

                this.bmp_cardbackAry[1].node.x=-8;
                this.bmp_cardbackAry[1].node.y=-30;
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);

                this.bmp_cardbackAry[2].node.x=-17;
                this.bmp_cardbackAry[2].node.y=-60;
                this.bmp_cardbackAry[2].node.setLocalZOrder(3);

                this.bmp_cardcolorAry[0].node.x=-2;
                this.bmp_cardcolorAry[0].node.y=5;
                this.bmp_cardcolorAry[0].node.scaleX = 0.36;
                this.bmp_cardcolorAry[0].node.scaleY = 0.46;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=-2;
                this.bmp_cardcolorAry[2].node.y=5;
                this.bmp_cardcolorAry[2].node.scaleX = 0.36;
                this.bmp_cardcolorAry[2].node.scaleY = 0.46;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);

                this.bmp_cardbackAry[3].node.x=0;
                this.bmp_cardbackAry[3].node.y=0;
                this.bmp_cardbackAry[3].node.setLocalZOrder(6); 

                this.bmp_cardcolorAry[1].node.x=0;
                this.bmp_cardcolorAry[1].node.y=0;
                this.bmp_cardcolorAry[1].node.scaleX = 0.36;
                this.bmp_cardcolorAry[1].node.scaleY = 0.46;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                
                break;
            }
        }
      
        // this.bmp_arrow.node.setLocalZOrder(11);
        // this.light_node.active = true;
    }
}
