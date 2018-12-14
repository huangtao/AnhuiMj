

import LHZMJ_SingleActiveBase from "../LHZMJ_SingleActiveBase";
import { LHZMJMahjongDef, LHZMJ } from "../../../ConstDef/LHZMJMahjongDef";
import { SetTextureRes, SetTextureResAry } from "../../../../MJCommon/MJ_Function";
import { LHZMJMahjongAlgorithm1 } from "../../../LHZMJMahjongAlgorithm/LHZMJMahjongAlgorithm1";


const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_DownSingleActive extends LHZMJ_SingleActiveBase {
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
    // /**
    //  * 显示牌
    //  * */
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
    //         this.HuiCardShowGreenZZ(card);
            
    //         if(LHZMJMahjongDef.gBackMahjongValue != card){
           
    //             // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
    //             // url1=LHZMJ.ins.iclass.getMahjongResName(card);
    //             url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
    //               this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
    //             this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);

    //           //  SetTextureResAry([url,url1],[this.bmp_liecardback,this.bmp_cardcolor]);
               
    //         }else{
    //             // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_left_right_1280`;
    //             // SetTextureRes(url,this.bmp_liecardback);
    //             url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_left_right_1280`;
    //             // SetTextureRes(url,this.bmp_liecardback);
    //             this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcardback_left_right_1280");
    //         }
            
    //         this.bmp_liecardback.node.active=true;
    //         this.bmp_cardcolor.node.active = LHZMJMahjongDef.gBackMahjongValue != card;
            
    //     } else {

    //         // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_active_right_1280`;
    //         // SetTextureRes(url,this.bmp_cardback);
    //         // this.bmp_cardback.node.active=true;
    //           url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_active_right_1280`;
    //         // SetTextureRes(url,this.bmp_cardback);
    //         this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_active_right_1280");
    //         this.bmp_cardback.node.active=true;
    //         //this.bmp_cardcolor.node.active=false;
         
    //     }
    //     this.node.active=true;
    // }
     /**
     * 显示牌
     * */
    // pub
    public showCard(card: number,isLie: boolean,index:number): void {
        if(card==this._cardValue&&isLie==this._isLie&&index==this._cardIndex)
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
            this.bmp_liecardback.node.width=56;
            this.bmp_liecardback.node.height=45;
            this.bmp_liecardback.node.scaleX=1;
            this.bmp_cardback.node.width=67;
            this.bmp_cardback.node.height=63;
            this.bmp_cardback.node.scaleX=1;

            this.bmp_cardcolor.node.x=0;
            this.bmp_cardcolor.node.y=7.5;
            this.bmp_cardcolor.node.scaleX=0.4;
            this.bmp_cardcolor.node.scaleY=0.45;
            this.bmp_cardcolor.node.skewY=0;
            if(isLie) {
                if(LHZMJMahjongDef.gBackMahjongValue != card){
                    // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
                    // SetTextureRes(url,this.bmp_cardback);

                    // url=LHZMJ.ins.iclass.getMahjongResName(card);
                    // SetTextureRes(url,this.bmp_cardcolor);
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
                    //url1=LHZMJ.ins.iclass.getMahjongResName(card);
                    this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);
                    //SetTextureResAry([url,url1],[this.bmp_liecardback,this.bmp_cardcolor]);
                    // this.bmp_cardcolor.node.x = 0;
                    // this.bmp_cardcolor.node.y = 5;
                    // this.bmp_cardcolor.node.rotation = -90;
                    // this.bmp_cardcolor.node.scaleX = 0.5;
                    // this.bmp_cardcolor.node.scaleY = 0.5;
                }else{
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_left_right_1280`;
                    this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyou_back@2x");
                
                    //SetTextureRes(url,this.bmp_liecardback);
                }
                this.bmp_liecardback.node.active=true;
                this.bmp_cardcolor.node.active = LHZMJMahjongDef.gBackMahjongValue != card;
            } else {
                url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_active_right_1280`;
                cc.log("显示下家");
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("you_pai@2x");
                //SetTextureRes(url,this.bmp_cardback);
                this.bmp_cardback.node.active=true;
                //this.bmp_cardcolor.node.active=false;
            }
        }else{
            this.bmp_liecardback.node.width=58;
            this.bmp_liecardback.node.height=50;
            this.bmp_liecardback.node.scaleX=1;
            this.bmp_cardback.node.width=29;
            this.bmp_cardback.node.height=66;
            this.bmp_cardback.node.scaleX=1;

            this.bmp_cardcolor.node.x=0;
            this.bmp_cardcolor.node.y=6;
            this.bmp_cardcolor.node.scaleX=0.5;
            this.bmp_cardcolor.node.scaleY=0.5;
            this.bmp_cardcolor.node.skewY=0;
            if(isLie) {
                this.HuiCardShowGreenZZ(card);
                if(LHZMJMahjongDef.gBackMahjongValue != card){
                    // // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
                    // // SetTextureRes(url,this.bmp_cardback);

                    // // url=LHZMJ.ins.iclass.getMahjongResName(card);
                    // // SetTextureRes(url,this.bmp_cardcolor);
                    // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
                    // //url1=LHZMJ.ins.iclass.getMahjongResName(card);
                    // this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
                    // this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);
                    // //SetTextureResAry([url,url1],[this.bmp_liecardback,this.bmp_cardcolor]);
                    // // this.bmp_cardcolor.node.x = 0;
                    // // this.bmp_cardcolor.node.y = 5;
                    // // this.bmp_cardcolor.node.rotation = -90;
                    // // this.bmp_cardcolor.node.scaleX = 0.5;
                    // // this.bmp_cardcolor.node.scaleY = 0.5;
                    this.showDaoPai();
                }else{
                    // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_left_right_1280`;
                    // this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcardback_left_right_1280");
                
                    // //SetTextureRes(url,this.bmp_liecardback);
                    this.showDaoPai();
                }
                this.bmp_liecardback.node.active=true;
                this.bmp_cardcolor.node.active = LHZMJMahjongDef.gBackMahjongValue != card;
            } else {
                

                this.showShuPai();
                // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_active_right_1280`;
                // cc.log("显示下家");
                // this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_active_right_1280");
                //SetTextureRes(url,this.bmp_cardback);
                this.bmp_cardback.node.active=true;
                //this.bmp_cardcolor.node.active=false;
            }
        }

        
        this.node.active=true;
    }
    
    public down(): void {
        if(this._isUp) {
            this.node.x += 10;
            this._isUp = false;
        }
    }

    /**
     * 起立
     * */
    public up(): void {
        if(!this._isUp) {
            this.node.x -= 10;
            this._isUp = true;
        }
    }
     private showShuPai():void{
        // cc.log(this._cardIndex + "------" +this._cardValue);
        switch(this._cardIndex){
            case 1:{
                this.node.x=467;
                this.node.y=40;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_01");
                this.bmp_cardback.node.width=187;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=-1;
                break;
            }
            case 2:{
                this.node.x=477.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_02");
                this.bmp_cardback.node.width=179;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=-1;
                break;
            }
            case 3:{
                this.node.x=481.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_03");
                this.bmp_cardback.node.width=171;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=-1;
                break;
            }
            case 4:{
                this.node.x=485.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_04");
                this.bmp_cardback.node.width=163;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=-1;
                break;
            }
            case 5:{
                this.node.x=490;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_05");
                this.bmp_cardback.node.width=154;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=-1;
                break;
            }
            case 6:{
                this.node.x=494.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_06");
                this.bmp_cardback.node.width=145;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=-1;
                break;
            }
            case 7:{
                this.node.x=498.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_07");
                this.bmp_cardback.node.width=137;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=-1;
                break;
            }
            case 8:{
                this.node.x=502.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_08");
                this.bmp_cardback.node.width=129;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=-1;
                break;
            }
            case 9:{
                this.node.x=507;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_09");
                this.bmp_cardback.node.width=120;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=-1;
                break;
            }
            case 10:{
                this.node.x=511.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_10");
                this.bmp_cardback.node.width=111;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=-1;
                break;
            }
            case 11:{
                this.node.x=516.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_11");
                this.bmp_cardback.node.width=101;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=-1;
                break;
            }
            case 12:{
                this.node.x=521;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_12");
                this.bmp_cardback.node.width=92;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=-1;
                break;
            }
            case 13:{
                this.node.x=525.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_13");
                this.bmp_cardback.node.width=83;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=-1;
                break;
            }
            case 14:{
                this.node.x=530.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_14");
                this.bmp_cardback.node.width=73;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=-1;
                break;
            }
        }
     }

         private showDaoPai():void{
        // cc.log(this._cardIndex + "------" +this._cardValue);
        switch(this._cardIndex){
            case 1:{
                this.node.x=374;
                this.node.y=295;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_01");
                this.bmp_liecardback.node.width=59;
                this.bmp_liecardback.node.height=42;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.34;
                this.bmp_cardcolor.node.scaleY=0.42;
                this.bmp_cardcolor.node.skewY=15;
                this.bmp_cardcolor.node.x=1.5;
                this.bmp_cardcolor.node.y=7.6;

                this.bmp_greenbg.node.scaleX=0.34;
                this.bmp_greenbg.node.scaleY=0.42;
                this.bmp_greenbg.node.skewY=15;
                this.bmp_greenbg.node.x=1.5;
                this.bmp_greenbg.node.y=7.6;
                
                break;
            }
            case 2:{
                this.node.x=386;
                this.node.y=255;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_02");
                this.bmp_liecardback.node.width=60;
                this.bmp_liecardback.node.height=43;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.34;
                this.bmp_cardcolor.node.scaleY=0.43;
                this.bmp_cardcolor.node.skewY=14.5;
                this.bmp_cardcolor.node.x=1.6;
                this.bmp_cardcolor.node.y=7.8;

                this.bmp_greenbg.node.scaleX=0.34;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewY=14.5;
                this.bmp_greenbg.node.x=1.6;
                this.bmp_greenbg.node.y=7.8;
                
                break;
            }
            case 3:{
                this.node.x=393.7;
                this.node.y=227;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_03");
                this.bmp_liecardback.node.width=60;
                this.bmp_liecardback.node.height=45;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.34;
                this.bmp_cardcolor.node.scaleY=0.43;
                this.bmp_cardcolor.node.skewY=14;
                this.bmp_cardcolor.node.x=2.4;
                this.bmp_cardcolor.node.y=8.4;

                this.bmp_greenbg.node.scaleX=0.34;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewY=14;
                this.bmp_greenbg.node.x=2.4;
                this.bmp_greenbg.node.y=8.4;
                
                break;
            }
            case 4:{
                this.node.x=403;
                this.node.y=199.5;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_04");
                this.bmp_liecardback.node.width=62;
                this.bmp_liecardback.node.height=46;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.34;
                this.bmp_cardcolor.node.scaleY=0.44;
                this.bmp_cardcolor.node.skewY=13.5;
                this.bmp_cardcolor.node.x=1.6;
                this.bmp_cardcolor.node.y=8.8;

                this.bmp_greenbg.node.scaleX=0.34;
                this.bmp_greenbg.node.scaleY=0.44;
                this.bmp_greenbg.node.skewY=13.5;
                this.bmp_greenbg.node.x=1.6;
                this.bmp_greenbg.node.y=8.8;
                break;
            }
            case 5:{
                this.node.x=412.3;
                this.node.y=172;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_05");
                this.bmp_liecardback.node.width=63;
                this.bmp_liecardback.node.height=47;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.34;
                this.bmp_cardcolor.node.scaleY=0.445;
                this.bmp_cardcolor.node.skewY=13;
                this.bmp_cardcolor.node.x=1.4;
                this.bmp_cardcolor.node.y=8.8;

                this.bmp_greenbg.node.scaleX=0.34;
                this.bmp_greenbg.node.scaleY=0.445;
                this.bmp_greenbg.node.skewY=13;
                this.bmp_greenbg.node.x=1.4;
                this.bmp_greenbg.node.y=8.8;
                break;
            }
            case 6:{
                this.node.x=420.5;
                this.node.y=144;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_06");
                this.bmp_liecardback.node.width=63;
                this.bmp_liecardback.node.height=47;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.34;
                this.bmp_cardcolor.node.scaleY=0.45;
                this.bmp_cardcolor.node.skewY=13;
                this.bmp_cardcolor.node.x=2.2;
                this.bmp_cardcolor.node.y=8.8;

                this.bmp_greenbg.node.scaleX=0.34;
                this.bmp_greenbg.node.scaleY=0.45;
                this.bmp_greenbg.node.skewY=13;
                this.bmp_greenbg.node.x=2.2;
                this.bmp_greenbg.node.y=8.8;
                break;
            }
            case 7:{
                this.node.x=430.3;
                this.node.y=115.3;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_07");
                this.bmp_liecardback.node.width=66;
                this.bmp_liecardback.node.height=48;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.36;
                this.bmp_cardcolor.node.scaleY=0.46;
                this.bmp_cardcolor.node.skewY=12;
                this.bmp_cardcolor.node.x=1.8;
                this.bmp_cardcolor.node.y=8.3;

                this.bmp_greenbg.node.scaleX=0.36;
                this.bmp_greenbg.node.scaleY=0.46;
                this.bmp_greenbg.node.skewY=12;
                this.bmp_greenbg.node.x=1.8;
                this.bmp_greenbg.node.y=8.3;
                break;
            }
            case 8:{
                this.node.x=438.8;
                this.node.y=85.6;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_08");
                this.bmp_liecardback.node.width=67;
                this.bmp_liecardback.node.height=48;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.36;
                this.bmp_cardcolor.node.scaleY=0.47;
                this.bmp_cardcolor.node.skewY=12.5;
                this.bmp_cardcolor.node.x=1.2;
                this.bmp_cardcolor.node.y=8.7;

                this.bmp_greenbg.node.scaleX=0.36;
                this.bmp_greenbg.node.scaleY=0.47;
                this.bmp_greenbg.node.skewY=12.5;
                this.bmp_greenbg.node.x=1.2;
                this.bmp_greenbg.node.y=8.7;
                break;
            }
            case 9:{
                this.node.x=448.2;
                this.node.y=55.3;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_09");
                this.bmp_liecardback.node.width=68;
                this.bmp_liecardback.node.height=50;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.38;
                this.bmp_cardcolor.node.scaleY=0.48;
                this.bmp_cardcolor.node.skewY=12.5;
                this.bmp_cardcolor.node.x=1.2;
                this.bmp_cardcolor.node.y=8.9;

                this.bmp_greenbg.node.scaleX=0.38;
                this.bmp_greenbg.node.scaleY=0.48;
                this.bmp_greenbg.node.skewY=12.5;
                this.bmp_greenbg.node.x=1.2;
                this.bmp_greenbg.node.y=8.9;
                break;
            }
            case 10:{
                this.node.x=459.1;
                this.node.y=24;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_10");
                this.bmp_liecardback.node.width=70;
                this.bmp_liecardback.node.height=50;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.38;
                this.bmp_cardcolor.node.scaleY=0.48;
                this.bmp_cardcolor.node.skewY=12;
                this.bmp_cardcolor.node.x=1.6;
                this.bmp_cardcolor.node.y=9;

                this.bmp_greenbg.node.scaleX=0.38;
                this.bmp_greenbg.node.scaleY=0.48;
                this.bmp_greenbg.node.skewY=12;
                this.bmp_greenbg.node.x=1.6;
                this.bmp_greenbg.node.y=9;
                break;
            }
            case 11:{
                this.node.x=469;
                this.node.y=-8;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_11");
                this.bmp_liecardback.node.width=71;
                this.bmp_liecardback.node.height=52;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.39;
                this.bmp_cardcolor.node.scaleY=0.49;
                this.bmp_cardcolor.node.skewY=12.5;
                this.bmp_cardcolor.node.x=1.9;
                this.bmp_cardcolor.node.y=9.7;

                this.bmp_greenbg.node.scaleX=0.39;
                this.bmp_greenbg.node.scaleY=0.49;
                this.bmp_greenbg.node.skewY=12.5;
                this.bmp_greenbg.node.x=1.9;
                this.bmp_greenbg.node.y=9.7;
                break;
            }
            case 12:{
                this.node.x=479.7;
                this.node.y=-40;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_12");
                this.bmp_liecardback.node.width=72;
                this.bmp_liecardback.node.height=52;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.39;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=12.5;
                this.bmp_cardcolor.node.x=1.9;
                this.bmp_cardcolor.node.y=9.2;

                this.bmp_greenbg.node.scaleX=0.39;
                this.bmp_greenbg.node.scaleY=0.5;
                this.bmp_greenbg.node.skewY=12.5;
                this.bmp_greenbg.node.x=1.9;
                this.bmp_greenbg.node.y=9.2;
                break;
            }
            case 13:{
                this.node.x=490.4;
                this.node.y=-73;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_13");
                this.bmp_liecardback.node.width=74;
                this.bmp_liecardback.node.height=54;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.39;
                this.bmp_cardcolor.node.scaleY=0.52;
                this.bmp_cardcolor.node.skewY=12.5;
                this.bmp_cardcolor.node.x=2.6;
                this.bmp_cardcolor.node.y=10.3;

                this.bmp_greenbg.node.scaleX=0.39;
                this.bmp_greenbg.node.scaleY=0.52;
                this.bmp_greenbg.node.skewY=12.5;
                this.bmp_greenbg.node.x=2.6;
                this.bmp_greenbg.node.y=10.3;
                break;
            }
            case 14:{
                this.node.x=502;
                this.node.y=-106.7;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_14");
                this.bmp_liecardback.node.width=75;
                this.bmp_liecardback.node.height=55;
                this.bmp_liecardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.53;
                this.bmp_cardcolor.node.skewY=13;
                this.bmp_cardcolor.node.x=1.2;
                this.bmp_cardcolor.node.y=10.6;

                this.bmp_greenbg.node.scaleX=0.4;
                this.bmp_greenbg.node.scaleY=0.53;
                this.bmp_greenbg.node.skewY=13;
                this.bmp_greenbg.node.x=1.2;
                this.bmp_greenbg.node.y=10.6;
                break;
            }
        }
        if(!LHZMJ.ins.iclass.isVideo()){
                     this.node.x+=30;
        }

    }
}

