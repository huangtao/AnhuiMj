import JZMJ_SingleActiveBase from "../JZMJ_SingleActiveBase";
import { JZMJMahjongDef, JZMJ } from "../../../ConstDef/JZMJMahjongDef";
import { SetTextureRes, SetTextureResAry } from "../../../../MJCommon/MJ_Function";
import M_JZMJVideoClass from "../../../M_JZMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class JZMJ_OppoSingleActive extends JZMJ_SingleActiveBase {
    @property(cc.Sprite)
    bmp_liecardback: cc.Sprite=null;

    onLoad() {
        // init logic
        
    }

    public init(){
        super.init();
        this.node.active=false;
    }

    /**
     * 显示牌
     * */
    public showCard(card: number,isLie: boolean,index:number,_JZMJ=JZMJ.ins.iclass): void {
        if(card==this._cardValue&&isLie==this._isLie)
        {
            if(!isLie)
                return;
        }
        super.showCard(card,isLie,index,_JZMJ);
        this.bmp_cardcolor.node.active = false;
        this.bmp_cardback.node.active = false;
        this.bmp_liecardback.node.active=false;
        let url="";
        let url1="";
        if(_JZMJ.is2D()){
            this.bmp_liecardback.node.width=39;
            this.bmp_liecardback.node.height=56;
            this.bmp_liecardback.node.scaleX=1;
            this.bmp_cardback.node.width=39;
            this.bmp_cardback.node.height=56;

            this.bmp_cardcolor.node.x=0;
            this.bmp_cardcolor.node.y=5;
            this.bmp_cardcolor.node.scaleX=0.45;
            this.bmp_cardcolor.node.scaleY=0.45;
            this.bmp_cardcolor.node.skewX=0;

            if(isLie) {
                if(JZMJMahjongDef.gBackMahjongValue != card){
                    // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
                    // SetTextureRes(url,this.bmp_cardback);
                    // url=_JZMJ.getMahjongResName(card);
                    // SetTextureRes(url,this.bmp_cardcolor);
                    
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
                    //url1=_JZMJ.getMahjongResName(card);
                    this.bmp_liecardback.spriteFrame=_JZMJ.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
                    this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(card);
                    //SetTextureResAry([url,url1],[this.bmp_liecardback,this.bmp_cardcolor]);

                    // this.bmp_cardcolor.node.x = 0;
                    // this.bmp_cardcolor.node.y = 5;
                    // this.bmp_cardcolor.node.scaleX = 0.45;
                    // this.bmp_cardcolor.node.scaleY = 0.45;
                }else{
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_oppo_self_1280`;
                    this.bmp_liecardback.spriteFrame=_JZMJ.getMahjongPaiBeiRes("pb3_showcardback_oppo_self_1280");
                    //SetTextureRes(url,this.bmp_liecardback);
                } 

                this.bmp_liecardback.node.active=true;
                this.bmp_cardcolor.node.active = JZMJMahjongDef.gBackMahjongValue != card;

            } else {
                url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_active_oppo_1280`;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjongPaiBeiRes("pb3_active_oppo_1280");
                //SetTextureRes(url,this.bmp_cardback);
                this.bmp_cardback.node.active=true;

                //this.bmp_cardcolor.node.active = false;
            }
        }else{
            this.bmp_liecardback.node.scaleX=1;
            
            this.bmp_cardcolor.node.x=0;
            this.bmp_cardcolor.node.y=5;
            this.bmp_cardcolor.node.scaleX=0.31;
            this.bmp_cardcolor.node.scaleY=0.23;
            this.bmp_cardcolor.node.skewX=0.2;

            if(isLie) {
                this.showDaoPai(_JZMJ);
                this.bmp_liecardback.node.active=true;
                this.bmp_cardcolor.node.active = JZMJMahjongDef.gBackMahjongValue != card;
            } else {
                this.showShuPai(_JZMJ);
                this.bmp_cardback.node.active=true;
            }
        }
        
        this.node.active=true;
    }
    
    public down(): void {
        if(this._isUp) {
            this.node.y -= 10;
            this._isUp = false;
        }
    }

    /**
     * 起立
     * */
    public up(): void {
        if(!this._isUp) {
            this.node.y += 10;
            this._isUp = true;
        }
    }
    private showDaoPai(_JZMJ):void{
        switch(this._cardIndex){
            case 1:{
                this.node.x=212-1;
                this.node.y=302;
                this.bmp_liecardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_1_15");
                this.node.setLocalZOrder(1);
                //this.bmp_liecardback.node.setLocalZOrder(13);
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.30;
                this.bmp_cardcolor.node.scaleY=0.22;
                this.bmp_cardcolor.node.skewX=0.2;
                this.bmp_cardcolor.node.x=0.7;
                this.bmp_cardcolor.node.y=9.4;
                break;
            }
            case 2:{
                this.node.x=177-1;
                this.node.y=302;
                this.bmp_liecardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_1_14");
                this.node.setLocalZOrder(2);
                //this.bmp_liecardback.node.setLocalZOrder(12);
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.30;
                this.bmp_cardcolor.node.scaleY=0.22;
                this.bmp_cardcolor.node.skewX=1;
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=9.4;
                break;
            }
            case 3:{
                this.node.x=140-1;
                this.node.y=302;
                this.bmp_liecardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_1_13");
                this.node.setLocalZOrder(3);
                //this.bmp_liecardback.node.setLocalZOrder(11);
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.30;
                this.bmp_cardcolor.node.scaleY=0.22;
                this.bmp_cardcolor.node.skewX=1.5;
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=9.4;
                break;
            }
            case 4:{
                this.node.x=104;
                this.node.y=302;
                this.bmp_liecardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_1_12");
                this.node.setLocalZOrder(4);
                //this.bmp_liecardback.node.setLocalZOrder(10);
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.30;
                this.bmp_cardcolor.node.scaleY=0.22;
                this.bmp_cardcolor.node.skewX=2;
                this.bmp_cardcolor.node.x=0.3;
                this.bmp_cardcolor.node.y=9.4;
                break;
            }
            case 5:{
                this.node.x=67;
                this.node.y=302;
                this.bmp_liecardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_1_11");
                this.node.setLocalZOrder(5);
                //this.bmp_liecardback.node.setLocalZOrder(9);
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.30;
                this.bmp_cardcolor.node.scaleY=0.22;
                this.bmp_cardcolor.node.skewX=2.5;
                this.bmp_cardcolor.node.x=0.6;
                this.bmp_cardcolor.node.y=9.4;
                break;
            }
            case 6:{
                this.node.x=31;
                this.node.y=302;
                this.bmp_liecardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_1_10");
                this.node.setLocalZOrder(6);
                //this.bmp_liecardback.node.setLocalZOrder(8);
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.30;
                this.bmp_cardcolor.node.scaleY=0.22;
                this.bmp_cardcolor.node.skewX=3;
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=9.4;
                break;
            }
            case 7:{
                this.node.x=-5;
                this.node.y=302;
                this.bmp_liecardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_1_9");
                this.node.setLocalZOrder(7);
                //this.bmp_liecardback.node.setLocalZOrder(7);
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.30;
                this.bmp_cardcolor.node.scaleY=0.22;
                this.bmp_cardcolor.node.skewX=3.5;
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=9.4;
                break;
            }
            case 8:{
                this.node.x=-41;
                this.node.y=302;
                this.bmp_liecardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_1_8");
                this.node.setLocalZOrder(8);
                //this.bmp_liecardback.node.setLocalZOrder(6);
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.30;
                this.bmp_cardcolor.node.scaleY=0.22;
                this.bmp_cardcolor.node.skewX=4;
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=9.4;
                break;
            }
            case 9:{
                this.node.x=-77;
                this.node.y=302;
                this.bmp_liecardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_1_7");
                this.node.setLocalZOrder(7);
                //this.bmp_liecardback.node.setLocalZOrder(5);
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.30;
                this.bmp_cardcolor.node.scaleY=0.22;
                this.bmp_cardcolor.node.skewX=4.5;
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=9.4;
                break;
            }
            case 10:{
                this.node.x=-113;
                this.node.y=302;
                this.bmp_liecardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_1_6");
                this.node.setLocalZOrder(6);
                //this.bmp_liecardback.node.setLocalZOrder(4);
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.30;
                this.bmp_cardcolor.node.scaleY=0.22;
                this.bmp_cardcolor.node.skewX=5;
                this.bmp_cardcolor.node.x=-0.6;
                this.bmp_cardcolor.node.y=9.4;
                break;
            }
            case 11:{
                this.node.x=-150+1;
                this.node.y=302;
                this.bmp_liecardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_1_5");
                this.node.setLocalZOrder(5);
                //this.bmp_liecardback.node.setLocalZOrder(3);
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.30;
                this.bmp_cardcolor.node.scaleY=0.22;
                this.bmp_cardcolor.node.skewX=5.5;
                this.bmp_cardcolor.node.x=-0.3;
                this.bmp_cardcolor.node.y=9.4;
                break;
            }
            case 12:{
                this.node.x=-187+2;
                this.node.y=302;
                this.bmp_liecardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_1_4");
                this.node.setLocalZOrder(4);
                //this.bmp_liecardback.node.setLocalZOrder(2);
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.30;
                this.bmp_cardcolor.node.scaleY=0.22;
                this.bmp_cardcolor.node.skewX=6;
                this.bmp_cardcolor.node.x=-0.5;
                this.bmp_cardcolor.node.y=9.4;
                break;
            }
            case 13:{
                this.node.x=-223+2;
                this.node.y=302;
                this.bmp_liecardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_1_3");
                this.node.setLocalZOrder(3);
                //this.bmp_liecardback.node.setLocalZOrder(1);
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.30;
                this.bmp_cardcolor.node.scaleY=0.22;
                this.bmp_cardcolor.node.skewX=6.5;
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=9.4;
                break;
            }
            case 14:{
                this.node.x=-278;
                this.node.y=302;
                this.bmp_liecardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_1_2");
                this.bmp_cardcolor.spriteFrame=_JZMJ.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.30;
                this.bmp_cardcolor.node.scaleY=0.22;
                this.bmp_cardcolor.node.skewX=7;
                this.bmp_cardcolor.node.x=-0.7;
                this.bmp_cardcolor.node.y=9.4;
                break;
            }
        }
    }

    private showShuPai(_JZMJ):void{
        switch(this._cardIndex){
            case 1:{
                this.node.x=204+36;
                this.node.y=315;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_3_13");   
                this.bmp_cardback.node.setLocalZOrder(13);  
                break;
            }
            case 2:{
                this.node.x=168+36;
                this.node.y=315;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_3_12");
                this.bmp_cardback.node.setLocalZOrder(12);
                break;
            }
            case 3:{
                this.node.x=132+36;
                this.node.y=315;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_3_11");
                this.bmp_cardback.node.setLocalZOrder(11);
                break;
            }
            case 4:{
                this.node.x=96+36;
                this.node.y=315;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_3_10");
                this.bmp_cardback.node.setLocalZOrder(10);
                break;
            }
            case 5:{
                this.node.x=60+36;
                this.node.y=315;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_3_9");
                this.bmp_cardback.node.setLocalZOrder(9);
                break;
            }
            case 6:{
                this.node.x=24+36;
                this.node.y=315;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_3_8");
                this.bmp_cardback.node.setLocalZOrder(8);
                break;
            }
            case 7:{
                this.node.x=-12+36;
                this.node.y=315;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_3_7");
                this.bmp_cardback.node.setLocalZOrder(7);
                break;
            }
            case 8:{
                this.node.x=-48+36;
                this.node.y=315;
                this.node.setLocalZOrder(6);
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_3_6");
                this.bmp_cardback.node.setLocalZOrder(6);
                break;
            }
            case 9:{
                this.node.x=-84+36;
                this.node.y=315;
                this.node.setLocalZOrder(5);
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_3_5");
                this.bmp_cardback.node.setLocalZOrder(5);
                break;
            }
            case 10:{
                this.node.x=-120+36;
                this.node.y=315;
                this.node.setLocalZOrder(4);
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_3_4");
                this.bmp_cardback.node.setLocalZOrder(4);
                break;
            }
            case 11:{
                this.node.x=-156+36;
                this.node.y=315;
                this.node.setLocalZOrder(3);
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_3_3");
                this.bmp_cardback.node.setLocalZOrder(3);
                break;
            }
            case 12:{
                this.node.x=-192+36;
                this.node.y=315;
                this.node.setLocalZOrder(2);
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_3_2");
                this.bmp_cardback.node.setLocalZOrder(2);
                break;
            }
            case 13:{
                this.node.x=-228+36;
                this.node.y=315;
                this.node.setLocalZOrder(1);
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_3_1");
                this.bmp_cardback.node.setLocalZOrder(1);
                break;
            }
            case 14:{
                this.node.x=-265+36-5-20;
                this.node.y=315;
                this.bmp_cardback.spriteFrame=_JZMJ.getMahjong3DPaiBeiRes("hand_oppo_3_1");
                this.bmp_cardback.node.setLocalZOrder(1);
                break;
            }
        }
    }

}
