

import MGMJ_SingleActiveBase from "../MGMJ_SingleActiveBase";
import M_MGMJClass from "../../../M_MGMJClass";
import MGMJEvent from "../../../MGMJEvent";
import { MGMJMahjongDef, MGMJ } from "../../../ConstDef/MGMJMahjongDef";
import M_MGMJView from "../../../M_MGMJView";
import { SetTextureRes, SetTextureResAry } from "../../../../MJCommon/MJ_Function";
import { IPDKClass } from '../../../../M_PDK/GameHelp/PDK_IClass';

const { ccclass, property } = cc._decorator;

@ccclass
export default class MGMJ_SelfSingleActive extends MGMJ_SingleActiveBase {

    

    @property(cc.Sprite)
    bmp_enable: cc.Sprite=null;

    @property(cc.Sprite)
    bmp_tingToken: cc.Sprite=null;

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
        this.bmp_huipai.node.active=false;
        //this.node.on(cc.Event.,this.onAdd2Stage,this);
        //this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveFromStage,this);
        //this.onAdd2Stage();
        this._selfPoint = cc.p(0,0);
        this._touchBeginPoint = cc.p(0,0);
        this._isTouch=false;
        this._clickEnable=false;
        this._moveMax=0;
        this.node.active=false;
        
    }
    
    private onAdd2Stage():void{
        //cc.log("bangding");
        
        this._touchEnable=true;
        
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchBegin,this);
        // //this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchEnd,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onClick,this);
    }

    private remove2Stage():void{
        //cc.log("bangding");
        
        this._touchEnable=true;
        
        this.node.off(cc.Node.EventType.TOUCH_START,this.onTouchBegin,this);
        // //this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.node.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL,this.onTouchEnd,this);
        this.node.off(cc.Node.EventType.TOUCH_END,this.onClick,this);
    }

    private onTouchBegin(e:cc.Event.EventTouch):void{
        //cc.log("1111111");
        if(M_MGMJClass.ins.ifCanOp && M_MGMJClass.ins.IfCanOutACard(this._cardValue) && cc.isValid(e)){
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
        
        if(this._isTouch && cc.isValid(e) && (e instanceof cc.Event.EventTouch)){
            this.node.x +=e.getDeltaX();//e.getLocationX()-640-56;// this._selfPoint.x + e.getLocationX() - this._touchBeginPoint.x;
            this.node.y +=e.getDeltaY();//e.getLocationY()-360;// this._selfPoint.y + e.getLocationY() - this._touchBeginPoint.y;
            if(this.node.y-this._selfPoint.y>this._moveMax)//e.getLocationY()>this._moveMax)
            {
                this._moveMax=this.node.y-this._selfPoint.y;//this._touchBeginPoint.y-e.getLocationY();
            }
        }
        
    }
    private onTouchEnd(e:cc.Event.EventTouch):void{
        //cc.log("2222222");
        if(this._isTouch){
            this.node.parent.off(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
            
            this._isTouch=false;
            this.node.x = this._selfPoint.x;
            let tempY=this.node.y - this._selfPoint.y;
            this.node.y = this._selfPoint.y;
            //cc.log("移动"+(e.getLocationY() - this._touchBeginPoint.y));
            cc.log("移动"+(tempY));
            if(tempY >=30 ) {

                if(M_MGMJClass.ins.ifCanOp)
                {   
                    //cc.log("33333");
                    this.node.opacity=0;
                    this.down();
                    this._isValid=false;
                    this.node.dispatchEvent(new MGMJEvent(MGMJEvent.msg_outACard,this._cardValue));
                    
                    //this.node.destroy();
                }
                else{
                    cc.log("44444");
                    this.node.dispatchEvent(new MGMJEvent(MGMJEvent.msg_reflashHandCard));
                }
            }
            cc.log("移动最大Y"+(this._moveMax));
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
        //cc.log("55555");
        if(this._clickEnable)
        {
            this._clickEnable=false;
            return;
        }
        //如果已经胡牌
        if(MGMJ.ins.iclass.isAlreadyHu()){
            return;
        }
        cc.log("点击了！"+this._cardValue);
        if(MGMJMahjongDef.gInvalidMahjongValue != this._cardValue){
            
                if(M_MGMJClass.ins.ifCanOp && M_MGMJClass.ins.IfCanOutACard(this._cardValue)){
                    
                    if(this._isUp){//如果已经站立,打出去
                        //cc.log("66666");
                        
                        this.node.opacity=0;
                        this.down();
                        this._isValid=false;
                        this.node.dispatchEvent(new MGMJEvent(MGMJEvent.msg_outACard,this._cardValue));
                        
                        //this.node.destroy();
                    }else{
                        
                        M_MGMJView.ins.CardView.selfActive.allDown();
                        M_MGMJClass.ins.showHideCard(this.cardValue);
                        if(this._ifCanTingAfterOutThisCard) {
                            //显示听牌
                            M_MGMJClass.ins.showTingCard(this.cardValue,this.node.x,false);
                        }else{

                            //注释
                            // let index =0;
                            // if(!M_MGMJClass.ins._tingPai[M_MGMJClass.ins.SelfChair] && index == 0){
                                M_MGMJView.ins.TingTip.showTingTip(null,true);
                                // index++;
                            // }
                        }
                        //其他所有按下,这张牌弹
                        this.up();
                    }
                }
                else
                {
                    this.down();
                    this.node.dispatchEvent(new MGMJEvent(MGMJEvent.msg_reflashHandCard));
                }
            
        }
    }
    
    public down():void{

        this.node.stopAllActions();
        this.node.y=-295;
        this._isUp = false;
    }
    /**
     * 起立，听牌提示添加到这里
     * */
    public up():void{
         
        if(!this._isUp){ 
            this.node.stopAllActions();
            let tempY=this.node.y+25;
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
            // let tempY=-304;
            // let action=cc.moveTo(0.2,this.node.x,tempY);
            // this.node.runAction(action);
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
     * 设置是否可用
     * */
    public set enable(isEnable:boolean){
        this._touchEnable=isEnable;
        cc.log("设置可用！"+isEnable?1:2);
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
        // let url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_backcard_self_1280`;
        // this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("pb3_backcard_self_1280");
        //this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("b_btm_self_mj_bg");
        if(MGMJ.ins.iclass.is2D()){
            this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("pb3_backcard_self_1280");
        }
        else{
            this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("chi_self_2_13");
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
    
    public showCard(card: number,isLie: boolean,index:number,hunpai:number): void {
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
        super.showCard(card,isLie,index,hunpai);
        
        this.node.opacity=255;
        this._isUp=false;
        this.bmp_cardcolor.node.active = false;
        this.bmp_cardback.node.active = false;
        
        let url="";
        let url1="";
        if(MGMJ.ins.iclass.is2D()){
            this.node.width=79;
            this.node.height=119;
            this.bmp_cardback.node.width=92;
            this.bmp_cardback.node.height=132;
            this.bmp_cardback.node.scaleX=1;
            this.bmp_cardcolor.node.width=88;//68;
            this.bmp_cardcolor.node.height=92//;97;
            this.bmp_enable.node.width=73;
            this.bmp_enable.node.height=107;
            
            if(isLie){
                this.bmp_enable.node.active=false;
                
                if(MGMJMahjongDef.gBackMahjongValue != card){
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_showcard_self_1280`;
                    this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg@2x");
                    this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(card);
                    this.bmp_cardback.node.width=92; 
                    this.bmp_cardback.node.height=132;
                    this.bmp_cardcolor.node.y = 20;//3;
                    this.bmp_cardcolor.node.scaleX = 1;
                    this.bmp_cardcolor.node.scaleY = 0.8;
                    this.bmp_cardcolor.node.skewX = 0;
                    this.bmp_cardcolor.node.skewY = 0;
                    this.bmp_cardcolor.node.active = true;
                    this.bmp_cardback.node.active = true;
                }else{
                    url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_backcard_self_1280`;
                    this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("shoupaipg_back@2x");
                    this.bmp_cardback.node.active = true;
                    this.bmp_cardcolor.node.active=false;
                }

                
            }else{
                url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_active_self_1280`;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjongPaiBeiRes("shoupai2@2x");
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(card);
                this.bmp_cardback.node.width=92;
                this.bmp_cardback.node.height=132;
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardback.node.scaleY=1;
                this.bmp_cardcolor.node.y=-9;//15;
                this.bmp_cardcolor.node.scaleX = 1;
                this.bmp_cardcolor.node.scaleY = 1;
                this.bmp_cardcolor.node.skewX = 0;
                this.bmp_cardcolor.node.skewY = 0;
                this.bmp_cardcolor.node.active = true;
                this.bmp_cardback.node.active = true;
            }
        }else{
            this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
            this.bmp_cardback.node.scaleX=1.2;
            this.bmp_cardback.node.scaleY=1.2;
            this.bmp_cardcolor.node.x=0.5;
            this.bmp_cardcolor.node.y=-4;
            this.bmp_cardcolor.node.scaleX=0.6;
            this.bmp_cardcolor.node.scaleY=0.6;
            this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(card);
            this.bmp_cardcolor.node.active = true;
            this.bmp_cardback.node.active = true;
        }
        this.bmp_huipai.node.active = card == hunpai;
        this.node.active=true;
    }

    private showSelfDaoPai():void{
        cc.log(this._cardIndex + "------" +this._cardValue);
        var paiY = -304;
        switch(this._cardIndex){
            case 1:{
                this.node.x=-496+9;
                this.node.y=paiY;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=-3.5;
                break;
            }
            case 2:{
                this.node.x=-421+9;
                this.node.y=paiY;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=-3.5;
                break;
            }
            case 3:{
                this.node.x=-346+9;
                this.node.y=paiY;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.x=-2;
                this.bmp_cardcolor.node.y=-3.5;
                break;
            }
            case 4:{
                this.node.x=-271+9;
                this.node.y=paiY;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.x=-5;
                this.bmp_cardcolor.node.y=-3.5;
                break;
            }
            case 5:{
                this.node.x=-196+9;
                this.node.y=paiY;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=-3.5;
                break;
            }
            case 6:{
                this.node.x=-121+9;
                this.node.y=paiY;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=-3.5;
                break;
            }
            case 7:{
                this.node.x=-46+9;
                this.node.y=paiY;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=-3.5;
                break;
            }
            case 8:{
                this.node.x=29+9;
                this.node.y=paiY;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.skewX=0;
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=-3.5;
                break;
            }
            case 9:{
                this.node.x=104+9;
                this.node.y=paiY;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.skewX=-1;
                this.bmp_cardcolor.node.x=1;
                this.bmp_cardcolor.node.y=-3.5;
                break;
            }
            case 10:{
                this.node.x=179+9;
                this.node.y=paiY;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.x=3;
                this.bmp_cardcolor.node.y=-3.5;
                break;           
            }
            case 11:{
                this.node.x=254+9;
                this.node.y=paiY;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue)
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=-3.5;
                break;
            }
            case 12:{
                this.node.x=329+9;
                this.node.y=paiY;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=-3.5;
                break;
            }
            case 13:{              
                this.node.x=404+9;
                this.node.y=paiY;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.x=0;
                this.bmp_cardcolor.node.y=-3.5;
                break;
            }
            case 14:{              
                this.node.x=491+7+9;
                this.node.y=paiY;
                this.bmp_cardback.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                this.bmp_cardback.node.scaleX=1;
                this.bmp_cardcolor.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(this._cardValue);
                this.bmp_cardcolor.node.x=4;
                this.bmp_cardcolor.node.y=-3.5;
                break;
            }
        }
    }
}
