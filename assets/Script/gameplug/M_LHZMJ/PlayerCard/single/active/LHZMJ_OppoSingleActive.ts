import LHZMJ_SingleActiveBase from "../LHZMJ_SingleActiveBase";
import { LHZMJMahjongDef, LHZMJ } from "../../../ConstDef/LHZMJMahjongDef";
import { SetTextureRes, SetTextureResAry } from "../../../../MJCommon/MJ_Function";
import { LHZMJMahjongAlgorithm1 } from "../../../LHZMJMahjongAlgorithm/LHZMJMahjongAlgorithm1";


const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_OppoSingleActive extends LHZMJ_SingleActiveBase {
    @property(cc.Sprite)
    bmp_liecardback: cc.Sprite=null;
     @property(cc.Sprite)
    bmp_greenZZ:cc.Sprite=null;

    @property(cc.Sprite)
    bmp_greenbg:cc.Sprite=null;

    onLoad() {
        // init logic
        
    }

    public init(){
        super.init();
        this.node.active=false;
        this.bmp_greenZZ.node.active=false;
        this.bmp_greenbg.node.active = false;
    }
         /**
     * 是否显示显示绿色遮罩
     */
    public set ShowGreenZZ(isShow:boolean){
       // this.bmp_greenZZ.node.active=isShow;
        this.bmp_greenbg.node.active = isShow;
    }

/**
     * 会牌显示绿色遮罩
     * @param card 
     */
    public HuiCardShowGreenZZ(card:number):void{
        var huiAry:Array<number>=LHZMJ.ins.iclass.GetHunCardAry();
        if(!LHZMJMahjongAlgorithm1.IsContainsNumber(huiAry,card)){
            this.ShowGreenZZ=false;
            return;
        }
        this.ShowGreenZZ=true;
        
    }
      /**
     * 显示牌
     * */
    public showCard(card: number,isLie: boolean,index:number): void {
        if(card==this._cardValue&&isLie==this._isLie)
        {
            if(!isLie)
                return;
        }
        super.showCard(card,isLie,index);
        this.bmp_cardcolor.node.active = false;
        this.bmp_cardback.node.active = false;
        this.bmp_liecardback.node.active=false;
        let url="";
        let url1="";
        if(LHZMJ.ins.iclass.is2D()){
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
               this.HuiCardShowGreenZZ(card);
                if(LHZMJMahjongDef.gBackMahjongValue != card){
                    // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
                    // SetTextureRes(url,this.bmp_cardback);
                    // url=LHZMJ.ins.iclass.getMahjongResName(card);
                    // SetTextureRes(url,this.bmp_cardcolor);
                    
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
                    //url1=LHZMJ.ins.iclass.getMahjongResName(card);
                    this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_back@2x");
                    this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);
                    //SetTextureResAry([url,url1],[this.bmp_liecardback,this.bmp_cardcolor]);

                    // this.bmp_cardcolor.node.x = 0;
                    // this.bmp_cardcolor.node.y = 5;
                    // this.bmp_cardcolor.node.scaleX = 0.45;
                    // this.bmp_cardcolor.node.scaleY = 0.45;
                }else{
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_oppo_self_1280`;
                    this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shangdp_fan@2x");
                    //SetTextureRes(url,this.bmp_liecardback);
                } 

                this.bmp_liecardback.node.active=true;
                this.bmp_cardcolor.node.active = LHZMJMahjongDef.gBackMahjongValue != card;

            } else {
                url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_active_oppo_1280`;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shang_back@2x");
                //SetTextureRes(url,this.bmp_cardback);
                this.bmp_cardback.node.active=true;

                //this.bmp_cardcolor.node.active = false;
            }
        }else{

            this.bmp_liecardback.node.width=45;
            this.bmp_liecardback.node.height=64;
            this.bmp_liecardback.node.scaleX=1;
            this.bmp_cardback.node.width=42;
            this.bmp_cardback.node.height=57;
            
            this.bmp_cardcolor.node.x=0;
            this.bmp_cardcolor.node.y=5;
            this.bmp_cardcolor.node.scaleX=0.5;
            this.bmp_cardcolor.node.scaleY=0.5;
            this.bmp_cardcolor.node.skewX=0;

            this.bmp_greenbg.node.scaleX=0.55;
            this.bmp_greenbg.node.scaleY=0.37;
            this.bmp_greenbg.node.skewX=-12;
            this.bmp_greenbg.node.x=0.7;
            this.bmp_greenbg.node.y=9.4;

            if(isLie) {
                this.HuiCardShowGreenZZ(card);
                if(LHZMJMahjongDef.gBackMahjongValue != card){
                    // // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
                    // // SetTextureRes(url,this.bmp_cardback);
                    // // url=LHZMJ.ins.iclass.getMahjongResName(card);
                    // // SetTextureRes(url,this.bmp_cardcolor);
                    
                    // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
                    // //url1=LHZMJ.ins.iclass.getMahjongResName(card);
                    // this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
                    // this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);
                    // //SetTextureResAry([url,url1],[this.bmp_liecardback,this.bmp_cardcolor]);

                    // // this.bmp_cardcolor.node.x = 0;
                    // // this.bmp_cardcolor.node.y = 5;
                    // // this.bmp_cardcolor.node.scaleX = 0.45;
                    // // this.bmp_cardcolor.node.scaleY = 0.45;
                    this.showDaoPai();
                }else{
                    // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_oppo_self_1280`;
                    // this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcardback_oppo_self_1280");
                    // //SetTextureRes(url,this.bmp_liecardback);
                    this.showDaoPai();
                } 

                this.bmp_liecardback.node.active=true;
                this.bmp_cardcolor.node.active = LHZMJMahjongDef.gBackMahjongValue != card;

            } else {
                url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_active_oppo_1280`;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_top_self_showcardback_bg");
                //SetTextureRes(url,this.bmp_cardback);
                this.bmp_cardback.node.active=true;

                //this.bmp_cardcolor.node.active = false;
            }
        }
        
        this.node.active=true;
    }
    // public showCard(card: number,isLie: boolean): void {
    //     if(card==this._cardValue&&isLie==this._isLie)
    //     {
    //         return;
    //     }
    //     super.showCard(card,isLie);
    //     this.bmp_cardcolor.node.active = false;
    //     this.bmp_cardback.node.active = false;
    //     this.bmp_liecardback.node.active=false;
    //     let url="";
    //     let url1="";
    //     if(isLie) {
    //         if(LHZMJMahjongDef.gBackMahjongValue != card){
    //             // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
    //             // SetTextureRes(url,this.bmp_cardback);
    //             // url=LHZMJ.ins.iclass.getMahjongResName(card);
    //             // SetTextureRes(url,this.bmp_cardcolor);
                
    //             url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_oppo_1280`;
    //             // url1=LHZMJ.ins.iclass.getMahjongResName(card);
    //             // SetTextureResAry([url,url1],[this.bmp_liecardback,this.bmp_cardcolor]);
    //             this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_oppo_1280");
    //             this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);
    //             // this.bmp_cardcolor.node.x = 0;
    //             // this.bmp_cardcolor.node.y = 5;
    //             // this.bmp_cardcolor.node.scaleX = 0.45;
    //             // this.bmp_cardcolor.node.scaleY = 0.45;
    //         }else{
    //             url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_oppo_self_1280`;
    //             // SetTextureRes(url,this.bmp_liecardback);
    //             this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcardback_oppo_self_1280");
    //         } 

    //         this.bmp_liecardback.node.active=true;
    //         this.bmp_cardcolor.node.active = LHZMJMahjongDef.gBackMahjongValue != card;

    //     } else {
    //         url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_active_oppo_1280`;
    //         // SetTextureRes(url,this.bmp_cardback);
    //         this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_active_oppo_1280");
    //         this.bmp_cardback.node.active=true;

    //         //this.bmp_cardcolor.node.active = false;
    //     }
    //     this.node.active=true;
    // }
    
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
    private showDaoPai():void{
        // cc.log(this._cardIndex + "------" +this._cardValue);
        switch(this._cardIndex){
            case 1:{
                this.node.x=271.8;
                this.node.y=285;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_01");
                this.bmp_liecardback.node.width=57;
                this.bmp_liecardback.node.height=56;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.37;
                this.bmp_cardcolor.node.skewX=-12;
                this.bmp_cardcolor.node.x=0.7;
                this.bmp_cardcolor.node.y=9.4;

                this.bmp_greenbg.node.scaleX=0.55;
                this.bmp_greenbg.node.scaleY=0.37;
                this.bmp_greenbg.node.skewX=-12;
                this.bmp_greenbg.node.x=0.7;
                this.bmp_greenbg.node.y=9.4;
                
                break;
            }
            case 2:{
                this.node.x=230.8;
                this.node.y=285;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_02");
                this.bmp_liecardback.node.width=56;
                this.bmp_liecardback.node.height=56;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.37;
                this.bmp_cardcolor.node.skewX=-10;
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=9.4;

                this.bmp_greenbg.node.scaleX=0.55;
                this.bmp_greenbg.node.scaleY=0.37;
                this.bmp_greenbg.node.skewX=-10;
                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=9.4;
                
                break;
            }
            case 3:{
                this.node.x=188.8;
                this.node.y=285;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_03");
                this.bmp_liecardback.node.width=54;
                this.bmp_liecardback.node.height=56;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.37;
                this.bmp_cardcolor.node.skewX=-9;
                this.bmp_cardcolor.node.x=0.5;
                this.bmp_cardcolor.node.y=9.4;

                this.bmp_greenbg.node.scaleX=0.55;
                this.bmp_greenbg.node.scaleY=0.37;
                this.bmp_greenbg.node.skewX=-9;
                this.bmp_greenbg.node.x=0.5;
                this.bmp_greenbg.node.y=9.4;
                
                break;
            }
            case 4:{
                this.node.x=145.8;
                this.node.y=285;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_04");
                this.bmp_liecardback.node.width=53;
                this.bmp_liecardback.node.height=56;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.37;
                this.bmp_cardcolor.node.skewX=-7;
                this.bmp_cardcolor.node.x=0.3;
                this.bmp_cardcolor.node.y=9.4;

                this.bmp_greenbg.node.scaleX=0.55;
                this.bmp_greenbg.node.scaleY=0.37;
                this.bmp_greenbg.node.skewX=-7;
                this.bmp_greenbg.node.x=0.3;
                this.bmp_greenbg.node.y=9.4;
                break;
            }
            case 5:{
                this.node.x=104.8;
                this.node.y=285;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_05");
                this.bmp_liecardback.node.width=50;
                this.bmp_liecardback.node.height=56;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.37;
                this.bmp_cardcolor.node.skewX=-4;
                this.bmp_cardcolor.node.x=0.6;
                this.bmp_cardcolor.node.y=9.4;

                this.bmp_greenbg.node.scaleX=0.55;
                this.bmp_greenbg.node.scaleY=0.37;
                this.bmp_greenbg.node.skewX=-4;
                this.bmp_greenbg.node.x=0.6;
                this.bmp_greenbg.node.y=9.4;
                break;
            }
            case 6:{
                this.node.x=63.8;
                this.node.y=285;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_06");
                this.bmp_liecardback.node.width=48;
                this.bmp_liecardback.node.height=56;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.37;
                this.bmp_cardcolor.node.skewX=-2;
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=9.4;

                this.bmp_greenbg.node.scaleX=0.55;
                this.bmp_greenbg.node.scaleY=0.37;
                this.bmp_greenbg.node.skewX=-2;
                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=9.4;
                break;
            }
            case 7:{
                this.node.x=21.9;
                this.node.y=285;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_07");
                this.bmp_liecardback.node.width=47;
                this.bmp_liecardback.node.height=56;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.37;
                this.bmp_cardcolor.node.skewX=-1;
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=9.4;

                this.bmp_greenbg.node.scaleX=0.55;
                this.bmp_greenbg.node.scaleY=0.37;
                this.bmp_greenbg.node.skewX=-1;
                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=9.4;
                break;
            }
            case 8:{
                this.node.x=-21.9;
                this.node.y=285;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_07");
                this.bmp_liecardback.node.width=47;
                this.bmp_liecardback.node.height=56;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.37;
                this.bmp_cardcolor.node.skewX=1;
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=9.4;

                this.bmp_greenbg.node.scaleX=0.55;
                this.bmp_greenbg.node.scaleY=0.37;
                this.bmp_greenbg.node.skewX=1;
                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=9.4;
                break;
            }
            case 9:{
                this.node.x=-64.2;
                this.node.y=285;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_06");
                this.bmp_liecardback.node.width=48;
                this.bmp_liecardback.node.height=56;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.37;
                this.bmp_cardcolor.node.skewX=2;
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=9.4;

                this.bmp_greenbg.node.scaleX=0.55;
                this.bmp_greenbg.node.scaleY=0.37;
                this.bmp_greenbg.node.skewX=2;
                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=9.4;
                break;
            }
            case 10:{
                this.node.x=-106.2;
                this.node.y=285;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_05");
                this.bmp_liecardback.node.width=50;
                this.bmp_liecardback.node.height=56;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.37;
                this.bmp_cardcolor.node.skewX=4;
                this.bmp_cardcolor.node.x=-0.6;
                this.bmp_cardcolor.node.y=9.4;

                this.bmp_greenbg.node.scaleX=0.55;
                this.bmp_greenbg.node.scaleY=0.37;
                this.bmp_greenbg.node.skewX=4;
                this.bmp_greenbg.node.x=-0.6;
                this.bmp_greenbg.node.y=9.4;
                break;
            }
            case 11:{
                this.node.x=-147.2;
                this.node.y=285;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_04");
                this.bmp_liecardback.node.width=53;
                this.bmp_liecardback.node.height=56;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.37;
                this.bmp_cardcolor.node.skewX=7;
                this.bmp_cardcolor.node.x=-0.3;
                this.bmp_cardcolor.node.y=9.4;

                this.bmp_greenbg.node.scaleX=0.55;
                this.bmp_greenbg.node.scaleY=0.37;
                this.bmp_greenbg.node.skewX=7;
                this.bmp_greenbg.node.x=-0.3;
                this.bmp_greenbg.node.y=9.4;
                break;
            }
            case 12:{
                this.node.x=-189.7;
                this.node.y=285;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_03");
                this.bmp_liecardback.node.width=54;
                this.bmp_liecardback.node.height=56;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.37;
                this.bmp_cardcolor.node.skewX=9;
                this.bmp_cardcolor.node.x=-0.5;
                this.bmp_cardcolor.node.y=9.4;

                this.bmp_greenbg.node.scaleX=0.55;
                this.bmp_greenbg.node.scaleY=0.37;
                this.bmp_greenbg.node.skewX=9;
                this.bmp_greenbg.node.x=-0.5;
                this.bmp_greenbg.node.y=9.4;
                break;
            }
            case 13:{
                this.node.x=-232.4;
                this.node.y=285;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_02");
                this.bmp_liecardback.node.width=56;
                this.bmp_liecardback.node.height=56;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.37;
                this.bmp_cardcolor.node.skewX=10;
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=9.4;

                this.bmp_greenbg.node.scaleX=0.55;
                this.bmp_greenbg.node.scaleY=0.37;
                this.bmp_greenbg.node.skewX=10;
                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=9.4;
                break;
            }
            case 14:{
                this.node.x=-288;
                this.node.y=285;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_mj_bg_01");
                this.bmp_liecardback.node.width=57;
                this.bmp_liecardback.node.height=56;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.55;
                this.bmp_cardcolor.node.scaleY=0.37;
                this.bmp_cardcolor.node.skewX=12;
                this.bmp_cardcolor.node.x=-0.7;
                this.bmp_cardcolor.node.y=9.4;

                this.bmp_greenbg.node.scaleX=0.55;
                this.bmp_greenbg.node.scaleY=0.37;
                this.bmp_greenbg.node.skewX=12;
                this.bmp_greenbg.node.x=-0.7;
                this.bmp_greenbg.node.y=9.4;
                break;
            }
        }
        this.node.y+=30;
    }
}
