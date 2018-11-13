import HZMJ_ActiveBase from "../PlayerCard/active/HZMJ_ActiveBase";
import { HZMJ, HZMJMahjongDef, enFixedCardType } from "../ConstDef/HZMJMahjongDef";
import HZMJEvent from "../HZMJEvent";
import HZMJ_FixedBase from "../PlayerCard/fixed/HZMJ_FixedBase";
import HZMJ_PoolBase from "../PlayerCard/pool/HZMJ_PoolBase";
import HZMJ_HunPi from "../PlayerCard/single/hunpi/HZMJ_Hunpi";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_CardView extends cc.Component {

    @property([HZMJ_ActiveBase])
    activeCard:HZMJ_ActiveBase[]=[];

    @property([HZMJ_FixedBase])
    fixedCard:HZMJ_FixedBase[]=[];

    @property([HZMJ_PoolBase])
    poolCard:HZMJ_PoolBase[]=[];

    @property(cc.Sprite)
    img_poolCardArrow:cc.Sprite=null;
        @property([HZMJ_HunPi])
    private hunpiCard:HZMJ_HunPi[]=[];
    
    onLoad() {
        // init logic
        //this.init();
    }

    public static _freeActiveNode: Array<cc.NodePool> = [new cc.NodePool(),new cc.NodePool(),new cc.NodePool(),new cc.NodePool()];
    // public static _freeDownActiveNode= new cc.NodePool();
    // public static _freeOppoActiveNode= new cc.NodePool();
    // public static _freeUpActiveNode= new cc.NodePool();
    //Fixed
    public static _freeFixedNode: Array<cc.NodePool> = [new cc.NodePool(),new cc.NodePool(),new cc.NodePool(),new cc.NodePool()];
    // public static _freeDownFixedNode= new cc.NodePool();
    // public static _freeOppoFixedNode= new cc.NodePool();
    // public static _freeUpFixedNode= new cc.NodePool();
    //Pool
    public static _freePoolNode: Array<cc.NodePool> = [new cc.NodePool(),new cc.NodePool(),new cc.NodePool(),new cc.NodePool()];
    // public static _freeDownPoolNode= new cc.NodePool();
    // public static _freeOppoPoolNode= new cc.NodePool();
    // public static _freeUpPoolNode= new cc.NodePool();
        
    //===================================================================
    //

    // //定牌
    // private _fixedCard:Array<HZMJ_FixedBase>;
    // //牌池牌
    // private _poolCard:Array<HZMJ_PoolBase>;
    
    public init() {
        this.clear();
        this.node.active=true;
        
        //this._activeCard = new Array<HZMJ_ActiveBase>();
        // this._fixedCard = new Array<HZMJ_FixedBase>();
        // this._poolCard = new Array<HZMJ_PoolBase>();

        // if(this._activeCard.length > 0){
        //     return;
        // }
        
        // //下家处理
        // var pool_down : HZMJ_DownPool = new HZMJ_DownPool();
        // var fixed_down : HZMJ_DownFixed = new HZMJ_DownFixed();
        // var donwActiveCls : any = egret.getDefinitionByName(HZMJ.ins.iclass.getActiveCardClassName()[1]);
        // var active_down: HZMJ_ActiveBase = new donwActiveCls();
        
        // this._group_down.addChild(pool_down);
        // this._group_down.addChild(fixed_down);
        // this._group_down.addChild(active_down);
        
        // //对家处理
        // var pool_oppo : HZMJ_OppoPool = new HZMJ_OppoPool();
        // var fixed_oppo: HZMJ_OppoFixed = new HZMJ_OppoFixed();
        // var oppoActiveCls : any = egret.getDefinitionByName(HZMJ.ins.iclass.getActiveCardClassName()[2]);
        // var active_oppo: HZMJ_ActiveBase = new oppoActiveCls();
        
        
        // this._group_oppo.addChild(pool_oppo);
        // this._group_oppo.addChild(fixed_oppo);
        // this._group_oppo.addChild(active_oppo);
        
        // //上家处理
        // var pool_up : HZMJ_UpPool = new HZMJ_UpPool();
        // var upActiveCls: any = egret.getDefinitionByName(HZMJ.ins.iclass.getActiveCardClassName()[3]);
        // var acitve_up: HZMJ_ActiveBase = new upActiveCls();
        // var fixed_up : HZMJ_UpFixed = new HZMJ_UpFixed();
        
        // this._group_up.addChild(pool_up);
        // this._group_up.addChild(fixed_up);
        // this._group_up.addChild(acitve_up);
        
        // //自家处理
        // var pool_self: HZMJ_SelfPool = new HZMJ_SelfPool();
        // var fixed_self : HZMJ_SelfFixed = new HZMJ_SelfFixed();
        // var selfActiveCls : any = egret.getDefinitionByName(HZMJ.ins.iclass.getActiveCardClassName()[0]);
        // var active_self: HZMJ_ActiveBase = new selfActiveCls();
        
        //this.activeCard[0].node.on(HZMJEvent.HZMJ_EVENT_TYPE,this.onSelfActiveEvent,this);
        
        // this._group_self.addChild(pool_self);
        // this._group_self.addChild(fixed_self);
        // this._group_self.addChild(active_self);
        
        // this._activeCard.push(active_self);
        // this._activeCard.push(active_down);
        // this._activeCard.push(active_oppo);
        // this._activeCard.push(acitve_up);
        
        // this._fixedCard.push(fixed_self);
        // this._fixedCard.push(fixed_down);
        // this._fixedCard.push(fixed_oppo);
        // this._fixedCard.push(fixed_up);
        
        // this._poolCard.push(pool_self);
        // this._poolCard.push(pool_down);
        // this._poolCard.push(pool_oppo);
        // this._poolCard.push(pool_up);
    }
    
    /**
     * 自己活动牌阵
     * */
    public get selfActive():HZMJ_ActiveBase{
        return this.activeCard[0];
    }
    /**
     * 自己的定牌阵
     * */
    public get selfFixed():HZMJ_FixedBase{
        return this.fixedCard[0];
    }
    /**
     * 自己的牌池
     * */
    public get selfPool():HZMJ_PoolBase{
        return this.poolCard[0];
    }
    /**
     * 获取活动牌阵
     * */
    public getActive(chair:number): HZMJ_ActiveBase{
        var logicChair: number = HZMJ.ins.iclass.physical2logicChair(chair);
        return this.activeCard[logicChair];
    }
    /**
     * 获取定牌阵
     * */
    public getFixed(chair: number):HZMJ_FixedBase{
        var logicChair: number = HZMJ.ins.iclass.physical2logicChair(chair);
        return this.fixedCard[logicChair];
    }
        /**
     * 获取混皮牌
     */
    public get hunPi():HZMJ_HunPi{
        return this.hunpiCard[0];
    }
    /**
     * 获取牌池
     * */
    public getPool(chair: number):HZMJ_PoolBase{
        var logicChair: number = HZMJ.ins.iclass.physical2logicChair(chair);
        return this.poolCard[logicChair];
    }
    /**
     * 隐藏出牌箭头
     * */
    public hideOutCardArrow():void{
   // this.unschedule(this.ArrowRun);
        this.img_poolCardArrow.node.stopAllActions();
        this.img_poolCardArrow.node.active = false;
    }
    /**
     * 将牌添加到牌池中
     * */
    public addCard2Pool(chair:number,card:number):void{
        if((HZMJMahjongDef.gInvalidChar == chair) || (HZMJMahjongDef.gInvalidMahjongValue == card)){
            return;
        }
        
        var arrowPos : {x:number,y:number} = this.getPool(chair).addPoolCard(card);
        
        this.img_poolCardArrow.node.x=arrowPos.x;
        this.img_poolCardArrow.node.y=arrowPos.y;
        
        // this.img_poolCardArrow.node.stopAllActions();
        // let aciton= cc.repeatForever(cc.sequence(cc.moveBy(0.8, cc.p(0, 10)), cc.moveBy(0.8, cc.p(0, -10))));
        // //egret.Tween.get(this._img_poolCardArrow,{ loop: true }).to({ y: this.img_poolCardArrow.y - 10 },800).to({ y: this.img_poolCardArrow.y },800);
        // this.img_poolCardArrow.node.runAction(aciton);
      //  this.schedule(this.ArrowRun,1.05);
        this.img_poolCardArrow.node.active = true;
        this.RunArrow();
    }

    private ArrowRun():void{
          this.img_poolCardArrow.node.stopAllActions();

        let aciton=cc.repeatForever(cc.sequence(cc.moveBy(0.5, cc.p(0, 10)), cc.moveBy(0.5, cc.p(0, -10))));
        this.img_poolCardArrow.node.runAction(aciton);
    }

    public RunArrow():void{
         // this.schedule(this.ArrowRun,1.05);
        this.img_poolCardArrow.node.active = true;
        this.ArrowRun();
    }
    /**
     * 将牌池的最后一张牌删除
     */
    public delCardinPool(chair:number,card:number,leftnum:number){

        if((HZMJMahjongDef.gInvalidChar == chair) || (HZMJMahjongDef.gInvalidMahjongValue == card)){
            return;
        }
       // this.unschedule(this.ArrowRun);
        this.img_poolCardArrow.node.stopAllActions();
        this.img_poolCardArrow.node.active = false;
        this.getPool(chair).delLastPoolCard(card,leftnum);            
    }
    /**
     * 恢复玩家活动牌
     * */
    public recoveryActiveCard(chair:number,cardAry:Array<number>):void{
        
        var logicChair: number = HZMJ.ins.iclass.physical2logicChair(chair);
        //更新活动牌阵中定牌数量
        this.activeCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
        //刷新手牌阵
        this.activeCard[logicChair].refreshHandCardData(cardAry);
    }
    
    /**
     * 活动牌事件
     * */
    // private onSelfActiveEvent(e:HZMJEvent):void{
    //     switch(e.msgCode){
    //         default:{
    //             //this.node.dispatchEvent(e.clone());
    //             break;
    //         }
    //     }
    // }
    
    /**
     * 抓牌墩牌
     * */
    public holdTricksCard(chair:number,holdIdx:number):number{
        var logicChair : number = HZMJ.ins.iclass.physical2logicChair(chair);
        return this.activeCard[logicChair].holdTricksCard(holdIdx);
    }
    
    /**
     * 玩家抓牌
     * */
    public playerHoldCard(chair:number,card:number):void{
        var logicChair: number = HZMJ.ins.iclass.physical2logicChair(chair);
        this.activeCard[logicChair].holdACard(card);
    }
    
    /**
     * 玩家打牌
     * */
    public playerOutCard(chair:number,card:number):void{
        var logicChair: number = HZMJ.ins.iclass.physical2logicChair(chair);
        this.activeCard[logicChair].outACard(card);
    }
    public refreshHideCard(card:number):void{
        for(var j:number=0; j<this.fixedCard.length; j++){
            this.fixedCard[j].refreshHideCard(card);
        }
        for(var m:number=0; m<this.poolCard.length; m++){
            this.poolCard[m].refreshHideCard(card);
        }
    }
    
    /**
     * 玩家碰牌
     * */
    public playerPeng(chair: number,card: number,outChair:number):void{
        
        var logicChair: number = HZMJ.ins.iclass.physical2logicChair(chair);
        
        let pos=(outChair+HZMJMahjongDef.gPlayerNum-chair)%HZMJMahjongDef.gPlayerNum;
        //处理定牌
        this.fixedCard[logicChair].addFixed(card,enFixedCardType.FixedCardType_Peng,pos);
        
        //更新活动牌阵中定牌数量
        this.activeCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
        
        //更新活动牌
        this.activeCard[logicChair].pengACard(card);
    }
    
    /**
     * 玩家暗杠
     * */
    public playerAGang(chair: number,card: number):void{
        var logicChair: number = HZMJ.ins.iclass.physical2logicChair(chair);

        //处理定牌
        this.fixedCard[logicChair].addFixed(card,enFixedCardType.FixedCardType_AGang,0);

        //更新活动牌阵中定牌数量
        this.activeCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;

        //更新活动牌
        this.activeCard[logicChair].AGangACard(card);
    }
    
    /**
     * 玩家明杠
     * */
    public playerMGang(chair: number,card: number,outChair:number):void{
        var logicChair: number = HZMJ.ins.iclass.physical2logicChair(chair);

        let pos=(outChair+HZMJMahjongDef.gPlayerNum-chair)%HZMJMahjongDef.gPlayerNum;
        //处理定牌
        this.fixedCard[logicChair].addFixed(card,enFixedCardType.FixedCardType_MGang,pos);

        //更新活动牌阵中定牌数量
        this.activeCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;

        //更新活动牌
        this.activeCard[logicChair].MGangACard(card);
    }
    
    /**
     * 玩家补杠
     * */
    public playerBGang(chair: number,card: number):void{
        var logicChair: number = HZMJ.ins.iclass.physical2logicChair(chair);

        //处理定牌
        this.fixedCard[logicChair].peng2gang(card);

        //更新活动牌
        this.activeCard[logicChair].BGangACard(card);
    }
    
    /**
     * 清理
     * */
    public clear():void{
        for(var i:number=0; i<this.activeCard.length; i++){
            this.activeCard[i].clear();
        }
        for(var j:number=0; j<this.fixedCard.length; j++){
            this.fixedCard[j].clear();
        }
        for(var m:number=0; m<this.poolCard.length; m++){
            this.poolCard[m].clear();
        }
        for(var i:number=0;i<this.hunpiCard.length;i++){
            this.hunpiCard[i].HideCard();
        }
            this.img_poolCardArrow.node.active=false;
       this.img_poolCardArrow.node.stopAllActions();
    
    }
}
