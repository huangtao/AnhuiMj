import LHZMJ_SingleActiveBase from "../LHZMJ_SingleActiveBase";
import { LHZMJMahjongDef, LHZMJ } from "../../../ConstDef/LHZMJMahjongDef";
import { SetTextureRes, SetTextureResAry } from "../../../../MJCommon/MJ_Function";
import { LHZMJMahjongAlgorithm1 } from "../../../LHZMJMahjongAlgorithm/LHZMJMahjongAlgorithm1";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_UpSingleActive extends LHZMJ_SingleActiveBase {

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
        //this.bmp_greenZZ.node.active=isShow;
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
            
                if(LHZMJMahjongDef.gBackMahjongValue != card){
                    // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
                    // SetTextureRes(url,this.bmp_cardback);
                    // url=LHZMJ.ins.iclass.getMahjongResName(card);
                    // SetTextureRes(url,this.bmp_cardcolor);
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_left_right_1280`;
                    //url1=LHZMJ.ins.iclass.getMahjongResName(card);
                    //SetTextureResAry([url,url1],[this.bmp_liecardback,this.bmp_cardcolor]);
                    this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuoyoupg@2x");
                    this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);
                    // this.bmp_cardcolor.node.x = 0;
                    // this.bmp_cardcolor.node.y = 5;
                    // this.bmp_cardcolor.node.rotation = 90;
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
                url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_active_left_1280`;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("zuo_pai@2x");
                //SetTextureRes(url,this.bmp_cardback);
                this.bmp_cardback.node.active=true;

                //this.bmp_cardcolor.node.active = false;
            }
        }else{
            if(isLie) {
                this.HuiCardShowGreenZZ(card);
                if(LHZMJMahjongDef.gBackMahjongValue != card){
                    this.showDaoPai();
                }else{

                    this.showDaoPai();
                }
                this.bmp_liecardback.node.active=true;
                this.bmp_cardcolor.node.active = LHZMJMahjongDef.gBackMahjongValue != card;
            } else {
                this.showShuPai();

                this.bmp_cardback.node.active=true;
            }
        }
        
        this.node.active=true;
    }

    public down(): void {
        if(this._isUp) {
            this.node.x -= 10;
            this._isUp = false;
        }
    }

    /**
     * 起立
     * */
    public up(): void {
        if(!this._isUp) {
            this.node.x += 10;
            this._isUp = true;
        }
    }

    private showDaoPai():void{
        
        switch(this._cardIndex){
            case 1:{
                this.node.x=-447.7;
                this.node.y=280.9;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_01");
                this.bmp_liecardback.node.width=59;
                this.bmp_liecardback.node.height=42;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.34;
                this.bmp_cardcolor.node.scaleY=0.42;
                this.bmp_cardcolor.node.skewY=-15;
                this.bmp_cardcolor.node.x=-1.5;
                this.bmp_cardcolor.node.y=7.6;

                this.bmp_greenbg.node.scaleX=0.34;
                this.bmp_greenbg.node.scaleY=0.42;
                this.bmp_greenbg.node.skewY=-15;
                this.bmp_greenbg.node.x=-1.5;
                this.bmp_greenbg.node.y=7.6;
                
                break;
            }
            case 2:{
                this.node.x=-456;
                this.node.y=255;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_02");
                this.bmp_liecardback.node.width=60;
                this.bmp_liecardback.node.height=43;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.34;
                this.bmp_cardcolor.node.scaleY=0.43;
                this.bmp_cardcolor.node.skewY=-14.5;
                this.bmp_cardcolor.node.x=-1.6;
                this.bmp_cardcolor.node.y=7.8;

                this.bmp_greenbg.node.scaleX=0.34;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewY=-14.5;
                this.bmp_greenbg.node.x=-1.6;
                this.bmp_greenbg.node.y=7.8;
                
                break;
            }
            case 3:{
                this.node.x=-463.7;
                this.node.y=227;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_03");
                this.bmp_liecardback.node.width=60;
                this.bmp_liecardback.node.height=45;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.34;
                this.bmp_cardcolor.node.scaleY=0.43;
                this.bmp_cardcolor.node.skewY=-14;
                this.bmp_cardcolor.node.x=-2.4;
                this.bmp_cardcolor.node.y=8.4;

                this.bmp_greenbg.node.scaleX=0.34;
                this.bmp_greenbg.node.scaleY=0.43;
                this.bmp_greenbg.node.skewY=-14;
                this.bmp_greenbg.node.x=-2.4;
                this.bmp_greenbg.node.y=8.4;
               
                break;
            }
            case 4:{
                this.node.x=-472.5;
                this.node.y=199.5;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_04");
                this.bmp_liecardback.node.width=62;
                this.bmp_liecardback.node.height=46;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.34;
                this.bmp_cardcolor.node.scaleY=0.44;
                this.bmp_cardcolor.node.skewY=-13.5;
                this.bmp_cardcolor.node.x=-1.6;
                this.bmp_cardcolor.node.y=8.8;

                this.bmp_greenbg.node.scaleX=0.34;
                this.bmp_greenbg.node.scaleY=0.44;
                this.bmp_greenbg.node.skewY=-13.5;
                this.bmp_greenbg.node.x=-1.6;
                this.bmp_greenbg.node.y=8.8;
                break;
            }
            case 5:{
                this.node.x=-481.3;
                this.node.y=172;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_05");
                this.bmp_liecardback.node.width=63;
                this.bmp_liecardback.node.height=47;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.34;
                this.bmp_cardcolor.node.scaleY=0.445;
                this.bmp_cardcolor.node.skewY=-13;
                this.bmp_cardcolor.node.x=-1.4;
                this.bmp_cardcolor.node.y=8.8;

                this.bmp_greenbg.node.scaleX=0.34;
                this.bmp_greenbg.node.scaleY=0.445;
                this.bmp_greenbg.node.skewY=-13;
                this.bmp_greenbg.node.x=-1.4;
                this.bmp_greenbg.node.y=8.8;
                break;
            }
            case 6:{
                this.node.x=-489;
                this.node.y=144;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_06");
                this.bmp_liecardback.node.width=63;
                this.bmp_liecardback.node.height=47;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.34;
                this.bmp_cardcolor.node.scaleY=0.45;
                this.bmp_cardcolor.node.skewY=-13;
                this.bmp_cardcolor.node.x=-2.2;
                this.bmp_cardcolor.node.y=8.8;

                this.bmp_greenbg.node.scaleX=0.34;
                this.bmp_greenbg.node.scaleY=0.45;
                this.bmp_greenbg.node.skewY=-13;
                this.bmp_greenbg.node.x=-2.2;
                this.bmp_greenbg.node.y=8.8;
                break;
            }
            case 7:{
                this.node.x=-498.3;
                this.node.y=115.3;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_07");
                this.bmp_liecardback.node.width=66;
                this.bmp_liecardback.node.height=48;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.36;
                this.bmp_cardcolor.node.scaleY=0.46;
                this.bmp_cardcolor.node.skewY=-12;
                this.bmp_cardcolor.node.x=-1.8;
                this.bmp_cardcolor.node.y=8.3;

                this.bmp_greenbg.node.scaleX=0.36;
                this.bmp_greenbg.node.scaleY=0.46;
                this.bmp_greenbg.node.skewY=-12;
                this.bmp_greenbg.node.x=-1.8;
                this.bmp_greenbg.node.y=8.3;
                break;
            }
            case 8:{
                this.node.x=-506.3;
                this.node.y=85.6;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_08");
                this.bmp_liecardback.node.width=67;
                this.bmp_liecardback.node.height=48;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.36;
                this.bmp_cardcolor.node.scaleY=0.47;
                this.bmp_cardcolor.node.skewY=-12.5;
                this.bmp_cardcolor.node.x=-1.2;
                this.bmp_cardcolor.node.y=8.7;

                this.bmp_greenbg.node.scaleX=0.36;
                this.bmp_greenbg.node.scaleY=0.47;
                this.bmp_greenbg.node.skewY=-12.5;
                this.bmp_greenbg.node.x=-1.2;
                this.bmp_greenbg.node.y=8.7;
                break;
            }
            case 9:{
                this.node.x=-515.2;
                this.node.y=55.3;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_09");
                this.bmp_liecardback.node.width=68;
                this.bmp_liecardback.node.height=50;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.38;
                this.bmp_cardcolor.node.scaleY=0.48;
                this.bmp_cardcolor.node.skewY=-12.5;
                this.bmp_cardcolor.node.x=-1.2;
                this.bmp_cardcolor.node.y=8.9;

                this.bmp_greenbg.node.scaleX=0.38;
                this.bmp_greenbg.node.scaleY=0.48;
                this.bmp_greenbg.node.skewY=-12.5;
                this.bmp_greenbg.node.x=-1.2;
                this.bmp_greenbg.node.y=8.9;
                break;
            }
            case 10:{
                this.node.x=-525.6;
                this.node.y=24;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_10");
                this.bmp_liecardback.node.width=70;
                this.bmp_liecardback.node.height=50;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.38;
                this.bmp_cardcolor.node.scaleY=0.48;
                this.bmp_cardcolor.node.skewY=-12;
                this.bmp_cardcolor.node.x=-1.6;
                this.bmp_cardcolor.node.y=9;

                this.bmp_greenbg.node.scaleX=0.38;
                this.bmp_greenbg.node.scaleY=0.48;
                this.bmp_greenbg.node.skewY=-12;
                this.bmp_greenbg.node.x=-1.6;
                this.bmp_greenbg.node.y=9;
                break;
            }
            case 11:{
                this.node.x=-535;
                this.node.y=-8;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_11");
                this.bmp_liecardback.node.width=71;
                this.bmp_liecardback.node.height=52;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.39;
                this.bmp_cardcolor.node.scaleY=0.49;
                this.bmp_cardcolor.node.skewY=-12.5;
                this.bmp_cardcolor.node.x=-1.9;
                this.bmp_cardcolor.node.y=9.7;

                this.bmp_greenbg.node.scaleX=0.39;
                this.bmp_greenbg.node.scaleY=0.49;
                this.bmp_greenbg.node.skewY=-12.5;
                this.bmp_greenbg.node.x=-1.9;
                this.bmp_greenbg.node.y=9.7;
                break;
            }
            case 12:{
                this.node.x=-545.2;
                this.node.y=-40;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_12");
                this.bmp_liecardback.node.width=72;
                this.bmp_liecardback.node.height=52;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.39;
                this.bmp_cardcolor.node.scaleY=0.5;
                this.bmp_cardcolor.node.skewY=-12.5;
                this.bmp_cardcolor.node.x=-1.9;
                this.bmp_cardcolor.node.y=9.2;

                this.bmp_greenbg.node.scaleX=0.39;
                this.bmp_greenbg.node.scaleY=0.5;
                this.bmp_greenbg.node.skewY=-12.5;
                this.bmp_greenbg.node.x=-1.9;
                this.bmp_greenbg.node.y=9.2;
                break;
            }
            case 13:{
                this.node.x=-555.4;
                this.node.y=-73;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_13");
                this.bmp_liecardback.node.width=74;
                this.bmp_liecardback.node.height=54;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.39;
                this.bmp_cardcolor.node.scaleY=0.52;
                this.bmp_cardcolor.node.skewY=-12.5;
                this.bmp_cardcolor.node.x=-2.6;
                this.bmp_cardcolor.node.y=10.3;

                this.bmp_greenbg.node.scaleX=0.39;
                this.bmp_greenbg.node.scaleY=0.52;
                this.bmp_greenbg.node.skewY=-12.5;
                this.bmp_greenbg.node.x=-2.6;
                this.bmp_greenbg.node.y=10.3;
                break;
            }
            case 14:{
                this.node.x=-569.9;
                this.node.y=-123;
                this.bmp_liecardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_mj_bg_14");
                this.bmp_liecardback.node.width=75;
                this.bmp_liecardback.node.height=55;
                this.bmp_liecardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.4;
                this.bmp_cardcolor.node.scaleY=0.53;
                this.bmp_cardcolor.node.skewY=-13;
                this.bmp_cardcolor.node.x=-1.2;
                this.bmp_cardcolor.node.y=10.6;

                this.bmp_greenbg.node.scaleX=0.4;
                this.bmp_greenbg.node.scaleY=0.53;
                this.bmp_greenbg.node.skewY=-13;
                this.bmp_greenbg.node.x=-1.2;
                this.bmp_greenbg.node.y=10.6;
                break;
            }
        }
        if(!LHZMJ.ins.iclass.isVideo()){
                    this.node.x-=34;
        }

    }

    private showShuPai():void{
        // cc.log(this._cardIndex + "------" +this._cardValue);
        switch(this._cardIndex){
            case 1:{
                this.node.x=-543.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_01");
                this.bmp_cardback.node.width=195;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 2:{
                this.node.x=-547.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_02");
                this.bmp_cardback.node.width=185;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 3:{
                this.node.x=-551.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_03");
                this.bmp_cardback.node.width=178;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 4:{
                this.node.x=-555.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_04");
                this.bmp_cardback.node.width=169;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 5:{
                this.node.x=-560;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_05");
                this.bmp_cardback.node.width=160;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 6:{
                this.node.x=-564.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_06");
                this.bmp_cardback.node.width=151;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 7:{
                this.node.x=-568.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_07");
                this.bmp_cardback.node.width=143;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 8:{
                this.node.x=-572.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_08");
                this.bmp_cardback.node.width=135;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 9:{
                this.node.x=-577;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_09");
                this.bmp_cardback.node.width=126;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 10:{
                this.node.x=-581.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_10");
                this.bmp_cardback.node.width=117;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 11:{
                this.node.x=-586.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_11");
                this.bmp_cardback.node.width=107;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 12:{
                this.node.x=-591;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_12");
                this.bmp_cardback.node.width=98;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 13:{
                this.node.x=-595.5;
                this.node.y=20;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_13");
                this.bmp_cardback.node.width=89;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=1;
                break;
            }
            case 14:{
                this.node.x=-607;
                this.node.y=0;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_left_mj_bg_14");
                this.bmp_cardback.node.width=79;
                this.bmp_cardback.node.height=720;
                this.bmp_cardback.node.scaleX=1;
                break;
            }
        }
    }
}
