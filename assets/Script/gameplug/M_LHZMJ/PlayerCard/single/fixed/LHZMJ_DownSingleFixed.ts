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

           
            for(let i=0;i<4;i++){
                this.bmp_cardcolorAry[i].node.x=0;
                this.bmp_cardcolorAry[i].node.y=8;
                this.bmp_cardcolorAry[i].node.skewY=0;
                this.bmp_cardcolorAry[i].node.scaleX=0.4;
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
                    // this.light_node.active = false;
                    for(let i=0;i<3;i++){
                        this.light_arrow[i].node.active = false;
                    }
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
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_17");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_16");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_15");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_16");
                        this.bmp_cardbackAry[3].node.x = -37;
                        this.bmp_cardbackAry[3].node.y = 52;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.26;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.36;
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_14");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_13");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_12");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_13");
                        this.bmp_cardbackAry[3].node.x = -45;
                        this.bmp_cardbackAry[3].node.y = 260;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.24;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.34;
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_11");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_10");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_9");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_10");
                        this.bmp_cardbackAry[3].node.x = -35;
                        this.bmp_cardbackAry[3].node.y = 60;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.22;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.32;
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_8");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_7");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_2_6");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_7");
                        this.bmp_cardbackAry[3].node.x = -30;
                        this.bmp_cardbackAry[3].node.y = 67;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.20;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.30;
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
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
                    for(let i=0;i<3;i++){
                        this.light_arrow[i].node.active = false;
                    }
                    break;
                }
                case enFixedCardType.FixedCardType_MGang:
                case enFixedCardType.FixedCardType_BGang: {

                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_17");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_16");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_15");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_16");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -38;
                        this.bmp_cardbackAry[3].node.y = 52;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.26;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.36;
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_14");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_13");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_12");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_13");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -45;
                        this.bmp_cardbackAry[3].node.y = 260;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.24;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.34;
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_11");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_10");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_9");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_10");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -35;
                        this.bmp_cardbackAry[3].node.y = 60;
                        this.bmp_cardcolorAry[3].node.scaleX = 0.22;
                        this.bmp_cardcolorAry[3].node.scaleY = 0.32;
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_8");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_7");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_6");
                        this.bmp_cardbackAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_7");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[3].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardbackAry[3].node.x = -30;
                        this.bmp_cardbackAry[3].node.y = 67;
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
                case enFixedCardType.FixedCardType_Peng: {                  
                    if(this._cardIndex==1){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_17");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_16");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_15");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);                                    
                    }else if(this._cardIndex==2){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_14");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_13");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_12");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==3){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_11");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_10");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_9");
                        this.bmp_cardcolorAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                        this.bmp_cardcolorAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this.cardValue);
                    }else if(this._cardIndex==4){
                        this.bmp_cardbackAry[0].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_8");
                        this.bmp_cardbackAry[1].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_7");
                        this.bmp_cardbackAry[2].spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_right_1_6");
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
            this.light_arrow[0].node.x = -30;
            this.light_arrow[0].node.y = 2;
            this.light_arrow[1].node.x = -30;
            this.light_arrow[1].node.y = 3;
            this.light_arrow[2].node.x = -30;
            this.light_arrow[2].node.y = 4;
            this.light_arrow[0].node.rotation = 90;
            this.light_arrow[1].node.rotation = 90;
            this.light_arrow[2].node.rotation = 90;

        }else{
            this.light_arrow[0].node.x = -30;
            this.light_arrow[0].node.y = -6;
            this.light_arrow[1].node.x = -30;
            this.light_arrow[1].node.y = -5;
            this.light_arrow[2].node.x = -30;
            this.light_arrow[2].node.y = -2;
            this.light_arrow[0].node.rotation = 260;
            this.light_arrow[1].node.rotation = 260;
            this.light_arrow[2].node.rotation =258;
        }
        if(this._pos!=0 && this._pos>0 && this._pos<4){
            switch(this._pos)
            {
                case 1:{
                    this.light_arrow[1].node.active = false;
                    this.light_arrow[0].node.active = false;
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
                this.node.x=561.5;
                this.node.y=-111;

                this.bmp_cardbackAry[2].node.x=-50;
                this.bmp_cardbackAry[2].node.y=78;   
                this.bmp_cardbackAry[2].node.setLocalZOrder(1);

                this.bmp_cardbackAry[1].node.x=-42;
                this.bmp_cardbackAry[1].node.y=43;              
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
                
                break;
            }
            case 2:{
                this.node.x= 543;
                this.node.y=-204;

                this.bmp_cardbackAry[2].node.x=-60;
                this.bmp_cardbackAry[2].node.y=279;   
                this.bmp_cardbackAry[2].node.setLocalZOrder(1);

                this.bmp_cardbackAry[1].node.x=-52;
                this.bmp_cardbackAry[1].node.y=248;              
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
                
                break;
            }
            case 3:{
                this.node.x=506;
                this.node.y=97;

                this.bmp_cardbackAry[2].node.x=-50;
                this.bmp_cardbackAry[2].node.y=78;   
                this.bmp_cardbackAry[2].node.setLocalZOrder(1);

                this.bmp_cardbackAry[1].node.x=-42;
                this.bmp_cardbackAry[1].node.y=49;              
                this.bmp_cardbackAry[1].node.setLocalZOrder(2);
      
                this.bmp_cardbackAry[0].node.x=-34;
                this.bmp_cardbackAry[0].node.y=20;             
                this.bmp_cardbackAry[0].node.setLocalZOrder(3);

                this.bmp_cardcolorAry[0].node.x=5;
                this.bmp_cardcolorAry[0].node.y=7;
                this.bmp_cardcolorAry[0].node.scaleX = 0.21;
                this.bmp_cardcolorAry[0].node.scaleY = 0.31;
                this.bmp_cardcolorAry[0].node.skewY = 9;
                this.bmp_cardcolorAry[0].node.setLocalZOrder(4);

                this.bmp_cardcolorAry[2].node.x=4;
                this.bmp_cardcolorAry[2].node.y=6;
                this.bmp_cardcolorAry[2].node.scaleX = 0.21;
                this.bmp_cardcolorAry[2].node.scaleY = 0.31;
                this.bmp_cardcolorAry[2].node.skewY = 9;
                this.bmp_cardcolorAry[2].node.setLocalZOrder(5);

                this.bmp_cardbackAry[3].node.x=0;
                this.bmp_cardbackAry[3].node.y=0;
                this.bmp_cardbackAry[3].node.setLocalZOrder(6);  

                this.bmp_cardcolorAry[1].node.x=3;
                this.bmp_cardcolorAry[1].node.y=5;
                this.bmp_cardcolorAry[1].node.scaleX = 0.21;
                this.bmp_cardcolorAry[1].node.scaleY = 0.31;
                this.bmp_cardcolorAry[1].node.skewY = 9;
                this.bmp_cardcolorAry[1].node.setLocalZOrder(7);
                
                break;
            }
            case 4:{
                this.node.x=478;
                this.node.y=190;

                this.bmp_cardbackAry[2].node.x=-43;
                this.bmp_cardbackAry[2].node.y=79;   
                this.bmp_cardbackAry[2].node.setLocalZOrder(1);

                this.bmp_cardbackAry[1].node.x=-37;
                this.bmp_cardbackAry[1].node.y=54;              
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
                
                break;
            }
        }
        
       

    }
}
