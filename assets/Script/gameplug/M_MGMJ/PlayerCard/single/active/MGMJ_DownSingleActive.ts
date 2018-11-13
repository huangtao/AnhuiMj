import MGMJ_SingleActiveBase from "../MGMJ_SingleActiveBase";
import { MGMJMahjongDef, MGMJ } from "../../../ConstDef/MGMJMahjongDef";
import { SetTextureRes, SetTextureResAry } from "../../../../MJCommon/MJ_Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MGMJ_DownSingleActive extends MGMJ_SingleActiveBase {
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

        if(MGMJ.ins.iclass.is2D()){
            this.bmp_liecardback.node.width=52;
            this.bmp_liecardback.node.height=45;
            this.bmp_liecardback.node.scaleX=1;
            this.bmp_cardback.node.width=25;
            this.bmp_cardback.node.height=57;
            this.bmp_cardback.node.scaleX=1;

            this.bmp_cardcolor.node.x=0;
            this.bmp_cardcolor.node.y=5;
            this.bmp_cardcolor.node.scaleX=0.5;
            this.bmp_cardcolor.node.scaleY=0.5;
            this.bmp_cardcolor.node.skewY=0;
            if(isLie) {
                if(MGMJMahjongDef.gBackMahjongValue != card){
                    // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
                    // SetTextureRes(url,this.bmp_cardback);

                    // url=MGMJ.ins.iclass.getMahjongResName(card);
                    // SetTextureRes(url,this.bmp_cardcolor);
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
                    //url1=MGMJ.ins.iclass.getMahjongResName(card);
                    this.bmp_liecardback.spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
                    this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(card);
                    //SetTextureResAry([url,url1],[this.bmp_liecardback,this.bmp_cardcolor]);
                    // this.bmp_cardcolor.node.x = 0;
                    // this.bmp_cardcolor.node.y = 5;
                    // this.bmp_cardcolor.node.rotation = -90;
                    // this.bmp_cardcolor.node.scaleX = 0.5;
                    // this.bmp_cardcolor.node.scaleY = 0.5;
                }else{
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_left_right_1280`;
                    this.bmp_liecardback.spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcardback_left_right_1280");
                
                    //SetTextureRes(url,this.bmp_liecardback);
                }
                this.bmp_liecardback.node.active=true;
                this.bmp_cardcolor.node.active = MGMJMahjongDef.gBackMahjongValue != card;
            } else {
                url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_active_right_1280`;
                cc.log("显示下家");
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("pb3_active_right_1280");
                //SetTextureRes(url,this.bmp_cardback);
                this.bmp_cardback.node.active=true;
                //this.bmp_cardcolor.node.active=false;
            }
        }else{
            // this.bmp_liecardback.node.width=78;
            // this.bmp_liecardback.node.height=54;
            // this.bmp_liecardback.node.scaleX=1;
            // this.bmp_cardback.node.width=29;
            // this.bmp_cardback.node.height=66;
            // this.bmp_cardback.node.scaleX=1;

            this.bmp_cardcolor.node.x=0;
            this.bmp_cardcolor.node.y=6;
            this.bmp_cardcolor.node.scaleX=0.5;
            this.bmp_cardcolor.node.scaleY=0.5;
            // this.bmp_cardcolor.node.skewY=0;
            if(isLie) {
                if(MGMJMahjongDef.gBackMahjongValue != card){
                    // // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
                    // // SetTextureRes(url,this.bmp_cardback);

                    // // url=MGMJ.ins.iclass.getMahjongResName(card);
                    // // SetTextureRes(url,this.bmp_cardcolor);
                    // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
                    // //url1=MGMJ.ins.iclass.getMahjongResName(card);
                    // this.bmp_liecardback.spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcard_left_right_1280");
                    // this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(card);
                    // //SetTextureResAry([url,url1],[this.bmp_liecardback,this.bmp_cardcolor]);
                    // // this.bmp_cardcolor.node.x = 0;
                    // // this.bmp_cardcolor.node.y = 5;
                    // // this.bmp_cardcolor.node.rotation = -90;
                    // // this.bmp_cardcolor.node.scaleX = 0.5;
                    // // this.bmp_cardcolor.node.scaleY = 0.5;
                    this.showDaoPai();
                }else{
                    // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcardback_left_right_1280`;
                    // this.bmp_liecardback.spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("pb3_showcardback_left_right_1280");
                
                    // //SetTextureRes(url,this.bmp_liecardback);
                    this.showDaoPai();
                }
                this.bmp_liecardback.node.active=true;
                this.bmp_cardcolor.node.active = MGMJMahjongDef.gBackMahjongValue != card;
            } else {
                this.showShuPai();
                // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_active_right_1280`;
                // cc.log("显示下家");
                // this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("pb3_active_right_1280");
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

    private 
    
    showDaoPai():void{
        // cc.log(this._cardIndex + "------" +this._cardValue);
        switch(this._cardIndex){
            case 1:{
                this.node.x=411+3;
                this.node.y=270;
                this.bmp_liecardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_1_1");
                this.bmp_liecardback.node.width=62;
                this.bmp_liecardback.node.height=44;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.200;
                this.bmp_cardcolor.node.scaleY=0.310;
                this.bmp_cardcolor.node.skewY=15;
                this.bmp_cardcolor.node.x=0.5;
                this.bmp_cardcolor.node.y=7.6;
                break;
            }
            case 2:{
                this.node.x=417.5+3;
                this.node.y=229;
                this.bmp_liecardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_1_2");
                this.bmp_liecardback.node.width=62;
                this.bmp_liecardback.node.height=44;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.200;
                this.bmp_cardcolor.node.scaleY=0.310;
                this.bmp_cardcolor.node.skewY=13;
                this.bmp_cardcolor.node.x=0.5;
                this.bmp_cardcolor.node.y=7.8;
                break;
            }
            case 3:{
                this.node.x=423.5+3;
                this.node.y=202;
                this.bmp_liecardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_1_3");
                this.bmp_liecardback.node.width=62;
                this.bmp_liecardback.node.height=44;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.205;
                this.bmp_cardcolor.node.scaleY=0.315;
                this.bmp_cardcolor.node.skewY=12.5;
                this.bmp_cardcolor.node.x=0.5;
                this.bmp_cardcolor.node.y=8.4;
                break;
            }
            case 4:{
                this.node.x=429.5+3;
                this.node.y=174;
                this.bmp_liecardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_1_4");
                this.bmp_liecardback.node.width=62;
                this.bmp_liecardback.node.height=44;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.210;
                this.bmp_cardcolor.node.scaleY=0.320;
                this.bmp_cardcolor.node.skewY=12;
                this.bmp_cardcolor.node.x=0.5;
                this.bmp_cardcolor.node.y=8.8;
                break;
            }
            case 5:{
                this.node.x=435.5+3;
                this.node.y=146;
                this.bmp_liecardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_1_5");
                this.bmp_liecardback.node.width=63;
                this.bmp_liecardback.node.height=47;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.215;
                this.bmp_cardcolor.node.scaleY=0.325;
                this.bmp_cardcolor.node.skewY=12;
                this.bmp_cardcolor.node.x=0.5;
                this.bmp_cardcolor.node.y=8.8;
                break;
            }
            case 6:{
                this.node.x=441.5+3;
                this.node.y=116;
                this.bmp_liecardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_1_6");
                this.bmp_liecardback.node.width=63;
                this.bmp_liecardback.node.height=47;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.220;
                this.bmp_cardcolor.node.scaleY=0.330;
                this.bmp_cardcolor.node.skewY=12;
                this.bmp_cardcolor.node.x=0.5;
                this.bmp_cardcolor.node.y=8.8;
                break;
            }
            case 7:{
                this.node.x=448+3;
                this.node.y=86;
                this.bmp_liecardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_1_7");
                this.bmp_liecardback.node.width=66;
                this.bmp_liecardback.node.height=48;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.225;
                this.bmp_cardcolor.node.scaleY=0.335;
                this.bmp_cardcolor.node.skewY=12;
                this.bmp_cardcolor.node.x=0.5;
                this.bmp_cardcolor.node.y=8.3;
                break;
            }
            case 8:{
                this.node.x=454.5+3;
                this.node.y=55;
                this.bmp_liecardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_1_8");
                this.bmp_liecardback.node.width=67;
                this.bmp_liecardback.node.height=48;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.230;
                this.bmp_cardcolor.node.scaleY=0.340;
                this.bmp_cardcolor.node.skewY=12.5;
                this.bmp_cardcolor.node.x=0.5;
                this.bmp_cardcolor.node.y=8.7;
                break;
            }
            case 9:{
                this.node.x=461.5+3;
                this.node.y=25;
                this.bmp_liecardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_1_9");
                this.bmp_liecardback.node.width=68;
                this.bmp_liecardback.node.height=50;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.235;
                this.bmp_cardcolor.node.scaleY=0.345;
                this.bmp_cardcolor.node.skewY=12.5;
                this.bmp_cardcolor.node.x=0.5;
                this.bmp_cardcolor.node.y=8.9;
                break;
            }
            case 10:{
                this.node.x=468+3;
                this.node.y=-7;
                this.bmp_liecardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_1_10");
                this.bmp_liecardback.node.width=70;
                this.bmp_liecardback.node.height=50;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.240;
                this.bmp_cardcolor.node.scaleY=0.350;
                this.bmp_cardcolor.node.skewY=12;
                this.bmp_cardcolor.node.x=0.5;
                this.bmp_cardcolor.node.y=9;
                break;
            }
            case 11:{
                this.node.x=475+3;
                this.node.y=-41;
                this.bmp_liecardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_1_11");
                this.bmp_liecardback.node.width=71;
                this.bmp_liecardback.node.height=52;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.245;
                this.bmp_cardcolor.node.scaleY=0.355;
                this.bmp_cardcolor.node.skewY=12.5;
                this.bmp_cardcolor.node.x=0.5;
                this.bmp_cardcolor.node.y=9.7;
                break;
            }
            case 12:{
                this.node.x=483+3;
                this.node.y=-75;
                this.bmp_liecardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_1_12");
                this.bmp_liecardback.node.width=72;
                this.bmp_liecardback.node.height=52;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.250;
                this.bmp_cardcolor.node.scaleY=0.360;
                this.bmp_cardcolor.node.skewY=12.5;
                this.bmp_cardcolor.node.x=0.5;
                this.bmp_cardcolor.node.y=9.2;
                break;
            }
            case 13:{
                this.node.x=491+3;
                this.node.y=-112;
                this.bmp_liecardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_1_13");
                this.bmp_liecardback.node.width=74;
                this.bmp_liecardback.node.height=54;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.255;
                this.bmp_cardcolor.node.scaleY=0.365;
                this.bmp_cardcolor.node.skewY=12.5;
                this.bmp_cardcolor.node.x=0.5;
                this.bmp_cardcolor.node.y=10.3;
                break;
            }
            case 14:{
                this.node.x=499+3;
                this.node.y=-149;
                this.bmp_liecardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_1_14");
                this.bmp_liecardback.node.width=75;
                this.bmp_liecardback.node.height=55;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.260;
                this.bmp_cardcolor.node.scaleY=0.370;
                this.bmp_cardcolor.node.skewY=13;
                this.bmp_cardcolor.node.x=0.5;
                this.bmp_cardcolor.node.y=10.6;
                break;
            }
        }
    }

    private showShuPai():void{
        let a = 6;
        switch(this._cardIndex){
            case 1:{
                this.node.x=393-a;
                this.node.y=262;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_3_1");
                break;
            }
            case 2:{
                this.node.x=399-a;
                this.node.y=223;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_3_2");
                break;
            }
            case 3:{
                this.node.x=406-a;
                this.node.y=196;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_3_3");
                break;
            }
            case 4:{
                this.node.x=412-a;
                this.node.y=168.5;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_3_4");      
                break;
            }
            case 5:{
                this.node.x=418.5-a;
                this.node.y=140.5;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_3_5");
                break;
            }
            case 6:{
                this.node.x=425-a;
                this.node.y=111;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_3_6");
                break;
            }
            case 7:{
                this.node.x=431.5-a;
                this.node.y=80;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_3_7");
                break;
            }
            case 8:{
                this.node.x=438.5-a;
                this.node.y=48.5;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_3_8");
                break;
            }
            case 9:{
                this.node.x=446-a;
                this.node.y=16.5;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_3_9");
                break;
            }
            case 10:{
                this.node.x=452.5-a;
                this.node.y=-17;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_3_10");
                break;
            }
            case 11:{
                this.node.x=461.5-a;
                this.node.y=-51;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_3_11");
                break;
            }
            case 12:{
                this.node.x=468.5-a;
                this.node.y=-85;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_3_12");
                break;
            }
            case 13:{
                this.node.x=477-a;
                this.node.y=-121;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_3_13");
                break;
            }
            case 14:{
                this.node.x=486-a;
                this.node.y=-158.5;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_right_3_14");
                break;
            }
        }
    }
}
