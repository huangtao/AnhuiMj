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

            for(let i=0;i<4;i++){
                this.bmp_cardcolorAry[i].node.x=0;
                this.bmp_cardcolorAry[i].node.y=7;
                this.bmp_cardcolorAry[i].node.skewX=0;
                this.bmp_cardcolorAry[i].node.scaleX=0.6;
                this.bmp_cardcolorAry[i].node.scaleY=0.4;
            }
            
            switch(this.fixedType) {
                case enFixedCardType.FixedCardType_AGang: {
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_oppo_self_1280`;
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
                    this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_fan@2x");
                    this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_fan@2x");
                    this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_fan@2x");
                    this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
                    this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHua2D(this.cardValue);

                    
                    this.bmp_cardbackAry[0].node.active=true;
                    this.bmp_cardbackAry[1].node.active=true;
                    this.bmp_cardbackAry[2].node.active=true;
                    this.bmp_cardbackAry[3].node.active=true;
                    this.bmp_cardcolorAry[0].node.active=false;
                    this.bmp_cardcolorAry[1].node.active=false;
                    this.bmp_cardcolorAry[2].node.active=false;
                    this.bmp_cardcolorAry[3].node.active=true;
                    // this.setPos(LHZMJ.ins.iclass);
                    for(let i=0;i<3;i++){
                        this.light_arrow[i].node.active = false;
                    }
                    break;
                }
                case enFixedCardType.FixedCardType_MGang:
                case enFixedCardType.FixedCardType_BGang: {
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
                    this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
                    this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
                    this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
                    this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
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
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
                    this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
                    this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
                    this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
                    this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHua2D(this.cardValue);
                    this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHua2D(this.cardValue);
                    this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHua2D(this.cardValue);
                    
                    
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
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_2_15");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_2_16");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_2_17");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_16");
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].node.scaleX = 0.4;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.38;
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_2_12");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_2_13");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_2_14");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_13");
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].node.scaleX = 0.4;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.38;
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_2_9");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_2_10");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_2_11");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_10");
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].node.scaleX = 0.4;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.38;
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_2_6");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_2_7");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_2_8");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_7");
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
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
                    // this.setPos(LHZMJ.ins.iclass);
                    // this.light_node.active = false;
                    for(let i=0;i<3;i++){
                        this.light_arrow[i].node.active = false;
                    }
                    break;
                }
                case enFixedCardType.FixedCardType_MGang:
                case enFixedCardType.FixedCardType_BGang: {
                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_15");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_16");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_17");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_16");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].node.scaleX = 0.4;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.38;
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_12");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_13");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_14");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_13");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].node.scaleX = 0.4;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.38;
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_9");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_10");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_11");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_10");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].node.scaleX = 0.4;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.38;
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_6");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_7");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_8");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_7");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
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
                    this.setPos();
                    break;
                }
                case enFixedCardType.FixedCardType_Peng: {
                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_15");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_16");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_17");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_12");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_13");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_14");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_9");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_10");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_11");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_6");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_7");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_oppo_1_8");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
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
            this.light_arrow[0].node.x = 80;
            this.light_arrow[0].node.y = -31;
            this.light_arrow[2].node.x = -80;
            this.light_arrow[2].node.y = -30;
        }else{
            this.light_arrow[0].node.x = 72.4;
            this.light_arrow[0].node.y = -31;
            this.light_arrow[2].node.x = -73.8;
            this.light_arrow[2].node.y = -31;
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
                    this.light_arrow[2].node.active = false;
                    this.light_arrow[1].node.active = false;
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
    
        
    }
}
