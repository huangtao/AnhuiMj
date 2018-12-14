

import LHZMJ_SingleActiveBase from "../LHZMJ_SingleActiveBase";
import M_LHZMJClass from "../../../M_LHZMJClass";
import LHZMJEvent from "../../../LHZMJEvent";
import { LHZMJMahjongDef, LHZMJ } from "../../../ConstDef/LHZMJMahjongDef";
import M_LHZMJView from "../../../M_LHZMJView";
import { SetTextureRes, SetTextureResAry } from "../../../../MJCommon/MJ_Function";
import { LHZMJMahjongAlgorithm1 } from "../../../LHZMJMahjongAlgorithm/LHZMJMahjongAlgorithm1";


const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_SelfSingleActive extends LHZMJ_SingleActiveBase {

    

    @property(cc.Sprite)
    bmp_enable: cc.Sprite=null;

    @property(cc.Sprite)
    bmp_tingToken: cc.Sprite=null;
    
    @property(cc.Sprite)
    bmp_greenbg:cc.Sprite=null;    

    onLoad() {
        // init logic
        
        //this.init();
    }

    //打出这张牌之后是否可以听牌
    private _ifCanTingAfterOutThisCard:boolean;
    private _touchEnable=false;
    private _selfPoint=cc.p(0,0);
    private _touchBeginPoint=cc.p(0,0);
    private _isTouch:boolean;
    private _moveMax:number;
    //click失效
    private _clickEnable:boolean;

    public init() {
        super.init();
        this._ifCanTingAfterOutThisCard=false;
        this.bmp_cardback.node.active=false;
        this.bmp_cardcolor.node.active=false;
        this.bmp_enable.node.active=false;
        this.bmp_tingToken.node.active=false;
        //this.node.on(cc.Event.,this.onAdd2Stage,this);
        //this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveFromStage,this);
        //this.onAdd2Stage();
        this._selfPoint = cc.p(0,0);
        this._touchBeginPoint = cc.p(0,0);
        this._isTouch=false;
        this._clickEnable=false;
        this._moveMax=0;
        this._isValid=true;
        this.node.active=false;
        this.bmp_greenbg.node.active = false;
        
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
    
    private onAdd2Stage():void{
        //console.log("bangding");
        
        this._touchEnable=true;
        
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchBegin,this);
        // //this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchEnd,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onClick,this);
    }

    private remove2Stage():void{
        //console.log("bangding");
        
        this._touchEnable=true;
        
        this.node.off(cc.Node.EventType.TOUCH_START,this.onTouchBegin,this);
        // //this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.node.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL,this.onTouchEnd,this);
        this.node.off(cc.Node.EventType.TOUCH_END,this.onClick,this);
    }

    private onTouchBegin(e:cc.Event.EventTouch):void{
        //console.log("1111111");
        // if(M_LHZMJClass.ins._canVote){
        //     this.down();
        //     return;
        // }
        //  if(!M_LHZMJClass.ins.ifCanOutCardFlower(this.cardValue)){
        //     this.down();
        //    // this.node.dispatchEvent(new LHZMJEvent(LHZMJEvent.msg_reflashHandCard));
        //     return;

        // }
        if(M_LHZMJClass.ins.ifCanOp && M_LHZMJClass.ins.IfCanOutACard(this._cardValue) && cc.isValid(e)){
            this._selfPoint=cc.p(this.node.x,this.node.y);
            this._touchBeginPoint==cc.p(e.getLocationX(),e.getLocationY());
            this._isTouch = true;
            this._moveMax=0;
            this.node.setLocalZOrder(this.node.parent.childrenCount);
            //this.node.parent.addChild(this.node);
            this.node.parent.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
        }
    }
    
    private onTouchMove(e:cc.Event.EventTouch):void{
        
        if(this._isTouch&& cc.isValid(e) && (e instanceof cc.Event.EventTouch)){
            this.node.x +=e.getDeltaX();//e.getLocationX()-640-56;// this._selfPoint.x + e.getLocationX() - this._touchBeginPoint.x;
            this.node.y +=e.getDeltaY();//e.getLocationY()-360;// this._selfPoint.y + e.getLocationY() - this._touchBeginPoint.y;
            if(this.node.y-this._selfPoint.y>this._moveMax)//e.getLocationY()>this._moveMax)
            {
                this._moveMax=this.node.y-this._selfPoint.y;//this._touchBeginPoint.y-e.getLocationY();
            }
        }
        
    }
    private onTouchEnd(e:cc.Event.EventTouch):void{
        //console.log("2222222");
        //   if(M_LHZMJClass.ins._canVote){
        //     this.down();
        //     return;
        // }
        if(this._isTouch){
            this.node.parent.off(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
            
            this._isTouch=false;
            this.node.x = this._selfPoint.x;
            let tempY=this.node.y - this._selfPoint.y;
            this.node.y = this._selfPoint.y;
            //console.log("移动"+(e.getLocationY() - this._touchBeginPoint.y));
            console.log("移动"+(tempY));
            if(tempY >=30 ) {

                if(M_LHZMJClass.ins.ifCanOp)
                {   
                    //console.log("33333");
                    this.node.opacity=0;
                    this.down();
                    this._isValid=false;
                    this.node.dispatchEvent(new LHZMJEvent(LHZMJEvent.msg_outACard,this._cardValue));
                    
                    //this.node.destroy();
                }
                else{
                    console.log("44444");
                    this.node.dispatchEvent(new LHZMJEvent(LHZMJEvent.msg_reflashHandCard));
                }
            }
            console.log("移动最大Y"+(this._moveMax));
            if(this._moveMax>30)
            {
                //肯定是拖动的，不用up
                this._clickEnable=true;
                this.down();
            }
            this._selfPoint=cc.p(0,0);
            this._touchBeginPoint=cc.p(0,0);
        }
    }
    // private onRemoveFromStage(e:egret.Event):void{
    //     this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);

    //     if(DEBUG || isNative()){
    //         this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
    //         //this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
    //         this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
    //         this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onTouchEnd,this);
    //         this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onTouchEnd,this);
    //         this.removeEventListener(egret.TouchEvent.TOUCH_ROLL_OUT,this.onTouchEnd,this);
    //         this.removeEventListener(egret.TouchEvent.TOUCH_ROLL_OVER,this.onTouchEnd,this);
    //     }
    // }
    /**
     * 获取是否打出这张牌之后就可以听牌
     * */
    public get ifCanTingAfterOutThisCard():boolean{
        return this._ifCanTingAfterOutThisCard;
    }
    
    /**
     * 设置是否打出这张牌之后就可以听牌
     * */
    public set ifCanTingAfterOutThisCard(value:boolean){
        this._ifCanTingAfterOutThisCard=value;
        this.bmp_tingToken.node.active=value;
    }



    
    public onClick():void{
        //console.log("55555");
        //    if(M_LHZMJClass.ins._canVote){
        //     this.down();
        //     return;
        // }
        if(this._clickEnable)
        {
            this._clickEnable=false;
            return;
        }
        //如果已经胡牌
        if(LHZMJ.ins.iclass.isAlreadyHu()){
            return;
        }

        // if(!M_LHZMJClass.ins.ifCanOutCardFlower(this.cardValue)){
        //     this.down();
        //    // this.node.dispatchEvent(new LHZMJEvent(LHZMJEvent.msg_reflashHandCard));
        //     return;

        // }
        console.log("点击了！"+this._cardValue);
        if(LHZMJMahjongDef.gInvalidMahjongValue != this._cardValue){
            
            
                if(M_LHZMJClass.ins.ifCanOp && M_LHZMJClass.ins.IfCanOutACard(this._cardValue)){
                    
                    if(this._isUp){//如果已经站立,打出去
                        //console.log("66666");
                        
                        this.node.opacity=0;
                        this.down();
                        this._isValid=false;
                        this.node.dispatchEvent(new LHZMJEvent(LHZMJEvent.msg_outACard,this._cardValue));
                        
                        //this.node.destroy();
                    }else{
                        
                        M_LHZMJView.ins.CardView.selfActive.allDown();
                        M_LHZMJClass.ins.showHideCard(this._cardValue);
                        if(this._ifCanTingAfterOutThisCard) {
                            //显示听牌
                            M_LHZMJClass.ins.showTingCard(this.cardValue,this.node.x,false);
                        }else{
                            M_LHZMJView.ins.TingTip.showTingTip(null,true);
                        }
                        //其他所有按下,这张牌弹起   
                        this.up();
                    }
                }
                else
                {
                    this.down();
                    this.node.dispatchEvent(new LHZMJEvent(LHZMJEvent.msg_reflashHandCard));
                }
            
        }
    }
    
    public down():void{

        this.node.stopAllActions();
        this.node.y=-300;
        this._isUp = false;
    }
    /**
     * 起立，听牌提示添加到这里
     * */
    public up():void{
         
        if(!this._isUp){ 
            this.node.stopAllActions();
            this.node.y=-300;
            let tempY=this.node.y+20;
            //this.y-=20;
            //egret.Tween.get(this).to({y:tempY},200).call(()=>{},this);
            let action=cc.moveTo(0.2,this.node.x,tempY);
            this.node.runAction(action);
            this._isUp = true;
        }
    }
    public setUp():void{
        if(!this._isUp){ 
            this.node.stopAllActions();
            
            //this.node.y=-250;
            //this.y-=20;
            //egret.Tween.get(this).to({y:tempY},200).call(()=>{},this);
            this._isUp = true;
        }
    }
    public setDown():void{
        if(this._isUp){ 
            // this.node.y=-250;
            // let tempY=-284;
            // //egret.Tween.get(this).to({y:tempY},200).call(()=>{},this);
            // let action=cc.moveTo(0.2,this.node.x,tempY);
            // this.node.runAction(action);
            //this.y-=20;
            //egret.Tween.get(this).to({y:tempY},200).call(()=>{},this);
            this._isUp = false;
        }
    }
    /**
     * 设置是否显示盖牌背景
     * */
    public set showCoverBG(isShow:boolean){
        this.bmp_enable.node.active=isShow;
    }
        /**
     * 是否显示显示绿色遮罩
     */
    public set ShowGreenZZ(isShow:boolean){
        this.bmp_greenbg.node.active = isShow;
    }
    /**
     * 设置是否可用
     * */
    public set enable(isEnable:boolean){
        this._touchEnable=isEnable;
        console.log("设置可用！"+isEnable?1:2);
        if(this._touchEnable)
        {
            this.onAdd2Stage();
        }
        else{
            this.remove2Stage();
        }
    }
    
    /**
     * 获取是否可用
     * */
    public get enable():boolean{
        return this._touchEnable;
    }
    
    /**
     * 显示盖牌
     * */
    public showBackCard():void{
        this.bmp_enable.node.active = false;
        this.bmp_cardcolor.node.active=false;
        this.bmp_cardback.node.active=true;
        this.ShowGreenZZ=false;
    //     let url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_backcard_self_1280`;
    //   //  SetTextureRes(url,this.bmp_cardback);
    //   this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("pb3_backcard_self_1280");
     if(LHZMJ.ins.iclass.is2D()){
            this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg_back@2x");
        }
        else{
            this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("b_btm_self_mj_bg");
        }
        this.bmp_cardback.node.x = 0;
        this.bmp_cardback.node.y = 0;
        this.node.active=true;
    }
    /**
     * 清理
     * */
    public clear(): void {
        super.clear();
        this.ifCanTingAfterOutThisCard=false;
        this.showCoverBG=false;
        this.enable=false;
        this._clickEnable=false;
    }
   public showCard(card: number,isLie: boolean,index:number): void {
        //cc.log("开始刷新牌元"+card);
        if(this.node.parent!=null)
        {
            this.node.parent.off(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
        }
        if(card==this._cardValue && isLie==this._isLie && this.bmp_cardcolor.node.active==true){
            this.node.active=true;
            if(!isLie)
                return;
        }
        super.showCard(card,isLie,index);
        
        this.node.opacity=255;
        this._isUp=false;
        this.bmp_cardcolor.node.active = false;
        this.bmp_cardback.node.active = false;
        
        let url="";
        let url1="";
        if(LHZMJ.ins.iclass.is2D()){
            this.HuiCardShowGreenZZ(card);
            this.node.width=79;
            this.node.height=119;
            this.bmp_cardback.node.width=92;
            this.bmp_cardback.node.height=132;
            this.bmp_cardback.node.scaleX=1;
            this.bmp_cardcolor.node.width=68;
            this.bmp_cardcolor.node.height=97;
            this.bmp_enable.node.width=73;
            this.bmp_enable.node.height=107;
            this.bmp_greenbg.node.scaleX=1;
            this.bmp_greenbg.node.scaleY=1;
            this.bmp_greenbg.node.skewX=0;
            this.bmp_greenbg.node.x=0;
            this.bmp_greenbg.node.y=-10.5;
            

            if(isLie){
                this.bmp_enable.node.active=false;
                
                if(LHZMJMahjongDef.gBackMahjongValue != card){
                    
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
                    //url1=LHZMJ.ins.iclass.getMahjongResName(card);
                    this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);
                    //SetTextureResAry([url,url1],[this.bmp_cardback,this.bmp_cardcolor]);
                    //this.bmp_cardcolor.node.x = 0;//9;
                    this.bmp_cardback.node.width=92; 
                    this.bmp_cardback.node.height=132;
                    this.bmp_cardcolor.node.width=68;
                    this.bmp_cardcolor.node.height=97;
                    this.bmp_cardcolor.node.y = 20;//3;
                    this.bmp_cardcolor.node.scaleX = 1;
                    this.bmp_cardcolor.node.scaleY = 0.8;
                    this.bmp_cardcolor.node.skewX = 0;
                    this.bmp_cardcolor.node.skewY = 0;
                    this.bmp_greenbg.node.x=2;
                    this.bmp_greenbg.node.y=18;

                    this.bmp_cardcolor.node.active = true;
                    this.bmp_cardback.node.active = true;
                }else{
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_backcard_self_1280`;
                    this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg_back@2x");
                    //SetTextureRes(url,this.bmp_cardback);
                    //this._bmp_cardback.texture = <egret.Texture>RES.getRes(switchResName("xzmj_backcard_self_png"));
                    this.bmp_cardback.node.active = true;
                    this.bmp_cardcolor.node.width=68;
                    this.bmp_cardcolor.node.height=97;
                    this.bmp_cardcolor.node.active=false;
                }
            }else{
                url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_active_self_1280`;
                //url1=LHZMJ.ins.iclass.getMahjongResName(card);
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiBeiRes("shoupai2@2x");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);
                //SetTextureResAry([url,url1],[this.bmp_cardback,this.bmp_cardcolor]);
                this.bmp_cardback.node.width=92;
                this.bmp_cardback.node.height=132;
                this.bmp_cardcolor.node.width=68;
                this.bmp_cardcolor.node.height=97;
                this.bmp_cardcolor.node.y=-9;//15;

                this.bmp_cardcolor.node.scaleX = 1;
                this.bmp_cardcolor.node.scaleY = 1;
                this.bmp_cardcolor.node.skewX = 0;
                this.bmp_cardcolor.node.skewY = 0;
                this.bmp_cardcolor.node.active = true;
                this.bmp_cardback.node.active = true;
            }
        }else{
            this.HuiCardShowGreenZZ(card);
            
            this.node.width=88;
            this.node.height=119;
            this.node.scaleX=1;
            this.node.scaleY=1;
            this.bmp_cardback.node.width=90;
            this.bmp_cardback.node.height=121;
            this.bmp_cardback.node.scaleX=1;
            this.bmp_cardcolor.node.width=68;
            this.bmp_cardcolor.node.height=97;
            this.bmp_enable.node.width=87;
            this.bmp_enable.node.height=119;

            this.bmp_greenbg.node.scaleX=1;
            this.bmp_greenbg.node.scaleY=1;
            this.bmp_greenbg.node.skewX=0;
            this.bmp_greenbg.node.x=0;
            this.bmp_greenbg.node.y=-10.5;

            if(isLie){
                this.bmp_enable.node.active=false;
                if(LHZMJMahjongDef.gBackMahjongValue != card){
                    // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
                    // SetTextureRes(url,this.bmp_cardback);
                    
                    // url=LHZMJ.ins.iclass.getMahjongResName(card);
                    // SetTextureRes(url,this.bmp_cardcolor);

                    // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
                    // //url1=LHZMJ.ins.iclass.getMahjongResName(card);
                    // this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("pb3_showcard_self_1280");
                    // this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);
                    // //SetTextureResAry([url,url1],[this.bmp_cardback,this.bmp_cardcolor]);
                    // //this.bmp_cardcolor.node.x = 0;//9;
                    // this.bmp_cardcolor.node.y = 10;//3;

                    // this.bmp_cardcolor.node.scaleX = 1;
                    // this.bmp_cardcolor.node.scaleY = 1;
                    // this.bmp_cardcolor.node.skewX = 1;
                    // this.bmp_cardcolor.node.skewY = 1;
                    this.showSelfDaoPai();
                    
                    

                    this.bmp_cardcolor.node.active = true;
                    this.bmp_cardback.node.active = true;
                }else{
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_backcard_self_1280`;
                    this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_top_self_showcardback_bg");
                    //SetTextureRes(url,this.bmp_cardback);
                    //this._bmp_cardback.texture = <egret.Texture>RES.getRes(switchResName("xzmj_backcard_self_png"));
                    this.bmp_cardback.node.active = true;
                    this.bmp_cardcolor.node.active=false;
                }

                
            }else{
                // url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_active_self_1280`;
                // SetTextureRes(url,this.bmp_cardback);
            
                // url=LHZMJ.ins.iclass.getMahjongResName(card);
                // SetTextureRes(url,this.bmp_cardcolor);
                //url1=LHZMJ.ins.iclass.getMahjongResName(card);
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("s_btm_self_mj_bg");
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(card);
                //SetTextureResAry([url,url1],[this.bmp_cardback,this.bmp_cardcolor]);
                this.bmp_cardcolor.node.width=68;
                this.bmp_cardcolor.node.height=97;    
                //this.bmp_cardcolor.node.x=0;//6;
                this.bmp_cardcolor.node.y=-11.5;//15;

                this.bmp_cardcolor.node.scaleX = 0.9;
                this.bmp_cardcolor.node.scaleY = 0.9;
                this.bmp_cardcolor.node.skewX = 0;
                this.bmp_cardcolor.node.skewY = 0;
                this.bmp_cardcolor.node.active = true;
                this.bmp_cardback.node.active = true;
            }
        }
        
        this.node.active=true;
    }

    private showSelfDaoPai():void{
        // cc.log(this._cardIndex + "------" +this._cardValue);
        switch(this._cardIndex){
            case 1:{
                this.node.x=-514;
                this.node.y=-298;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_01");
                this.bmp_cardback.node.width=108;
                this.bmp_cardback.node.height=106;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.9;
                this.bmp_cardcolor.node.scaleY=0.65;
                this.bmp_cardcolor.node.skewX=11;
                this.bmp_cardcolor.node.x=-1.5;
                this.bmp_cardcolor.node.y=14;

                this.bmp_greenbg.node.scaleX=0.9;
                this.bmp_greenbg.node.scaleY=0.65;
                this.bmp_greenbg.node.skewX=11;
                this.bmp_greenbg.node.x=-1.5;
                this.bmp_greenbg.node.y=14;
                
            
                break;
            }
            case 2:{
                this.node.x=-434;
                this.node.y=-298;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_02");
                this.bmp_cardback.node.width=104;
                this.bmp_cardback.node.height=106;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.9;
                this.bmp_cardcolor.node.scaleY=0.65;
                this.bmp_cardcolor.node.skewX=9;
                this.bmp_cardcolor.node.x=-1.5;
                this.bmp_cardcolor.node.y=14;

                this.bmp_greenbg.node.scaleX=0.9;
                this.bmp_greenbg.node.scaleY=0.65;
                this.bmp_greenbg.node.skewX=9;
                this.bmp_greenbg.node.x=-1.5;
                this.bmp_greenbg.node.y=14;
                

                break;
            }
            case 3:{
                this.node.x=-354;
                this.node.y=-298;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_03");
                this.bmp_cardback.node.width=99;
                this.bmp_cardback.node.height=106;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.9;
                this.bmp_cardcolor.node.scaleY=0.65;
                this.bmp_cardcolor.node.skewX=7;
                this.bmp_cardcolor.node.x=-2.1;
                this.bmp_cardcolor.node.y=14;

                this.bmp_greenbg.node.scaleX=0.9;
                this.bmp_greenbg.node.scaleY=0.65;
                this.bmp_greenbg.node.skewX=7;
                this.bmp_greenbg.node.x=-2.1;
                this.bmp_greenbg.node.y=14;
                
                break;
            }
            case 4:{
                this.node.x=-275;
                this.node.y=-298;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_04");
                this.bmp_cardback.node.width=96;
                this.bmp_cardback.node.height=106;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.9;
                this.bmp_cardcolor.node.scaleY=0.65;
                this.bmp_cardcolor.node.skewX=5;
                this.bmp_cardcolor.node.x=-2.1;
                this.bmp_cardcolor.node.y=14;

                this.bmp_greenbg.node.scaleX=0.9;
                this.bmp_greenbg.node.scaleY=0.65;
                this.bmp_greenbg.node.skewX=5;
                this.bmp_greenbg.node.x=-2.1;
                this.bmp_greenbg.node.y=14;
                break;
            }
            case 5:{
                this.node.x=-196;
                this.node.y=-298;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_05");
                this.bmp_cardback.node.width=94;
                this.bmp_cardback.node.height=106;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.9;
                this.bmp_cardcolor.node.scaleY=0.65;
                this.bmp_cardcolor.node.skewX=3;
                this.bmp_cardcolor.node.x=-2.1;
                this.bmp_cardcolor.node.y=14;

                this.bmp_greenbg.node.scaleX=0.9;
                this.bmp_greenbg.node.scaleY=0.65;
                this.bmp_greenbg.node.skewX=3;
                this.bmp_greenbg.node.x=-2.1;
                this.bmp_greenbg.node.y=14;
                break;
            }
            case 6:{
                this.node.x=-118;
                this.node.y=-298;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_06");
                this.bmp_cardback.node.width=88;
                this.bmp_cardback.node.height=106;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.9;
                this.bmp_cardcolor.node.scaleY=0.65;
                this.bmp_cardcolor.node.skewX=1;
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=14;

                this.bmp_greenbg.node.scaleX=0.9;
                this.bmp_greenbg.node.scaleY=0.65;
                this.bmp_greenbg.node.skewX=1;
                this.bmp_greenbg.node.x=1;
                this.bmp_greenbg.node.y=14;
                break;
            }
            case 7:{
                this.node.x=-39;
                this.node.y=-298;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_07");
                this.bmp_cardback.node.width=83;
                this.bmp_cardback.node.height=106;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.9;
                this.bmp_cardcolor.node.scaleY=0.65;
                this.bmp_cardcolor.node.skewX=0;
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=14;

                this.bmp_greenbg.node.scaleX=0.9;
                this.bmp_greenbg.node.scaleY=0.65;
                this.bmp_greenbg.node.skewX=0;
                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=14;
                break;
            }
            case 8:{
                // this.node.x=39;
                // this.node.y=-298;
                // this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_07");
                // this.bmp_cardback.node.width=83;
                // this.bmp_cardback.node.height=106;
                // this.bmp_cardback.node.scaleX=-1;
                // this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                // this.bmp_cardcolor.node.scaleX=0.9;
                // this.bmp_cardcolor.node.scaleY=0.65;
                // this.bmp_cardcolor.node.skewX=0;
                // this.bmp_cardcolor.node.x=0;
                // this.bmp_cardcolor.node.y=14;
                this.node.x=39;
                this.node.y=-298;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_07");
                this.bmp_cardback.node.width=83;
                this.bmp_cardback.node.height=106;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.9;
                this.bmp_cardcolor.node.scaleY=0.65;
                this.bmp_cardcolor.node.skewX=0;
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=14;

                this.bmp_greenbg.node.scaleX=0.9;
                this.bmp_greenbg.node.scaleY=0.65;
                this.bmp_greenbg.node.skewX=0;
                this.bmp_greenbg.node.x=0;
                this.bmp_greenbg.node.y=14;
                break;
            }
            case 9:{
                // this.node.x=118;
                // this.node.y=-298;
                // this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_06");
                // this.bmp_cardback.node.width=88;
                // this.bmp_cardback.node.height=106;
                // this.bmp_cardback.node.scaleX=-1;
                // this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                // this.bmp_cardcolor.node.scaleX=0.9;
                // this.bmp_cardcolor.node.scaleY=0.65;
                // this.bmp_cardcolor.node.skewX=-1;
                // this.bmp_cardcolor.node.x=1;
                // this.bmp_cardcolor.node.y=14;
                this.node.x=118;
                this.node.y=-298;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_06");
                this.bmp_cardback.node.width=88;
                this.bmp_cardback.node.height=106;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.9;
                this.bmp_cardcolor.node.scaleY=0.65;
                this.bmp_cardcolor.node.skewX=-1;
                this.bmp_cardcolor.node.x=-1;
                this.bmp_cardcolor.node.y=14;

                this.bmp_greenbg.node.scaleX=0.9;
                this.bmp_greenbg.node.scaleY=0.65;
                this.bmp_greenbg.node.skewX=-1;
                this.bmp_greenbg.node.x=-1;
                this.bmp_greenbg.node.y=14;
                break;
            }
            case 10:{
                // this.node.x=196;
                // this.node.y=-298;
                // this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_05");
                // this.bmp_cardback.node.width=94;
                // this.bmp_cardback.node.height=106;
                // this.bmp_cardback.node.scaleX=-1;
                // this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                // this.bmp_cardcolor.node.scaleX=0.9;
                // this.bmp_cardcolor.node.scaleY=0.65;
                // this.bmp_cardcolor.node.skewX=-3;
                // this.bmp_cardcolor.node.x=2.6;
                // this.bmp_cardcolor.node.y=14;
                this.node.x=196;
                this.node.y=-298;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_05");
                this.bmp_cardback.node.width=94;
                this.bmp_cardback.node.height=106;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.9;
                this.bmp_cardcolor.node.scaleY=0.65;
                this.bmp_cardcolor.node.skewX=-3;
                this.bmp_cardcolor.node.x=2.1;
                this.bmp_cardcolor.node.y=14;

                this.bmp_greenbg.node.scaleX=0.9;
                this.bmp_greenbg.node.scaleY=0.65;
                this.bmp_greenbg.node.skewX=-3;
                this.bmp_greenbg.node.x=2.1;
                this.bmp_greenbg.node.y=14;
                break;
            }
            case 11:{
                // this.node.x=275;
                // this.node.y=-298;
                // this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_04");
                // this.bmp_cardback.node.width=96;
                // this.bmp_cardback.node.height=106;
                // this.bmp_cardback.node.scaleX=-1;
                // this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                // this.bmp_cardcolor.node.scaleX=0.9;
                // this.bmp_cardcolor.node.scaleY=0.65;
                // this.bmp_cardcolor.node.skewX=-5;
                // this.bmp_cardcolor.node.x=2.1;
                // this.bmp_cardcolor.node.y=14;
                this.node.x=275;
                this.node.y=-298;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_04");
                this.bmp_cardback.node.width=96;
                this.bmp_cardback.node.height=106;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.9;
                this.bmp_cardcolor.node.scaleY=0.65;
                this.bmp_cardcolor.node.skewX=-5;
                this.bmp_cardcolor.node.x=2.1;
                this.bmp_cardcolor.node.y=14;

                this.bmp_greenbg.node.scaleX=0.9;
                this.bmp_greenbg.node.scaleY=0.65;
                this.bmp_greenbg.node.skewX=-5;
                this.bmp_greenbg.node.x=2.1;
                this.bmp_greenbg.node.y=14;
                break;
            }
            case 12:{
                // this.node.x=354;
                // this.node.y=-298;
                // this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_03");
                // this.bmp_cardback.node.width=99;
                // this.bmp_cardback.node.height=106;
                // this.bmp_cardback.node.scaleX=-1;
                // this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                // this.bmp_cardcolor.node.scaleX=0.9;
                // this.bmp_cardcolor.node.scaleY=0.65;
                // this.bmp_cardcolor.node.skewX=-7;
                // this.bmp_cardcolor.node.x=2.1;
                // this.bmp_cardcolor.node.y=14;
                this.node.x=354;
                this.node.y=-298;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_03");
                this.bmp_cardback.node.width=99;
                this.bmp_cardback.node.height=106;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.9;
                this.bmp_cardcolor.node.scaleY=0.65;
                this.bmp_cardcolor.node.skewX=-7;
                this.bmp_cardcolor.node.x=2.1;
                this.bmp_cardcolor.node.y=14;

                this.bmp_greenbg.node.scaleX=0.9;
                this.bmp_greenbg.node.scaleY=0.65;
                this.bmp_greenbg.node.skewX=-7;
                this.bmp_greenbg.node.x=2.1;
                this.bmp_greenbg.node.y=14;
                break;
            }
            case 13:{
                // this.node.x=434;
                // this.node.y=-298;
                // this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_02");
                // this.bmp_cardback.node.width=104;
                // this.bmp_cardback.node.height=106;
                // this.bmp_cardback.node.scaleX=-1;
                // this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                // this.bmp_cardcolor.node.scaleX=0.9;
                // this.bmp_cardcolor.node.scaleY=0.65;
                // this.bmp_cardcolor.node.skewX=-9;
                // this.bmp_cardcolor.node.x=3;
                // this.bmp_cardcolor.node.y=14;
                this.node.x=434;
                this.node.y=-298;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_02");
                this.bmp_cardback.node.width=104;
                this.bmp_cardback.node.height=106;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.9;
                this.bmp_cardcolor.node.scaleY=0.65;
                this.bmp_cardcolor.node.skewX=-9;
                this.bmp_cardcolor.node.x=1.5;
                this.bmp_cardcolor.node.y=14;

                this.bmp_greenbg.node.scaleX=0.9;
                this.bmp_greenbg.node.scaleY=0.65;
                this.bmp_greenbg.node.skewX=-9;
                this.bmp_greenbg.node.x=1.5;
                this.bmp_greenbg.node.y=14;
                break;
            }
            case 14:{
                // this.node.x=534;
                // this.node.y=-298;
                // this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_01");
                // this.bmp_cardback.node.width=108;
                // this.bmp_cardback.node.height=106;
                // this.bmp_cardback.node.scaleX=-1;
                // this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                // this.bmp_cardcolor.node.scaleX=0.9;
                // this.bmp_cardcolor.node.scaleY=0.65;
                // this.bmp_cardcolor.node.skewX=-12;
                // this.bmp_cardcolor.node.x=2.6;
                // this.bmp_cardcolor.node.y=14;
                this.node.x=534;
                this.node.y=-298;
                this.bmp_cardback.spriteFrame=LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_mj_bg_01");
                this.bmp_cardback.node.width=108;
                this.bmp_cardback.node.height=106;
                this.bmp_cardback.node.scaleX=-1;
                this.bmp_cardcolor.spriteFrame=LHZMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.scaleX=0.9;
                this.bmp_cardcolor.node.scaleY=0.65;
                this.bmp_cardcolor.node.skewX=-12;
                this.bmp_cardcolor.node.x=2.6;
                this.bmp_cardcolor.node.y=14;

                this.bmp_greenbg.node.scaleX=0.9;
                this.bmp_greenbg.node.scaleY=0.65;
                this.bmp_greenbg.node.skewX=-12;
                this.bmp_greenbg.node.x=2.6;
                this.bmp_greenbg.node.y=14;
                break;
            }
        }
    }
 
    



}
