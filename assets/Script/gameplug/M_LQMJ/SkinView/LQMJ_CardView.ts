import LQMJ_ActiveBase from "../PlayerCard/active/LQMJ_ActiveBase";
import { LQMJ, LQMJMahjongDef, enFixedCardType } from "../ConstDef/LQMJMahjongDef";
import LQMJEvent from "../LQMJEvent";
import LQMJ_FixedBase from "../PlayerCard/fixed/LQMJ_FixedBase";
import LQMJ_PoolBase from "../PlayerCard/pool/LQMJ_PoolBase";
import LQMJ_HunPi from "../PlayerCard/single/hunpi/LQMJ_Hunpi";
import LQMJ_PaiWall from "../SkinView/LQMJ_PaiWalls";
import LQMJ_VideoActiveBase from "../PlayerCard/active/LQMJ_VideoActiveBase";
import M_LQMJVideoClass from '../M_LQMJVideoClass';

const { ccclass, property } = cc._decorator;

@ccclass
export default class LQMJ_CardView extends cc.Component {

    @property([LQMJ_ActiveBase])
    activeCard:LQMJ_ActiveBase[]=[];

    @property([LQMJ_VideoActiveBase])
    activeVideoCard:LQMJ_VideoActiveBase[]=[];

    @property([LQMJ_FixedBase])
    fixedCard:LQMJ_FixedBase[]=[];

    @property([LQMJ_PoolBase])
    poolCard:LQMJ_PoolBase[]=[];

    @property(cc.Node)
    moreNode:cc.Node = null;

    @property(cc.Sprite)
    img_poolCardArrow:cc.Sprite=null;
    @property([LQMJ_HunPi])
    private hunpiCard:LQMJ_HunPi[]=[];

    @property(cc.Prefab)
    LQMJ_PaiWalls_View: cc.Prefab=null;

    //牌墙
    private _delPaiWall: LQMJ_PaiWall;
    /**
    * 删除牌墙
    * */
    public get PaiWallView(): LQMJ_PaiWall {
        return this._delPaiWall;
    }
    
    private _lqmjClass: any = null;
    public set LQMJClass(value: any){
        this._lqmjClass = value;
    }
    public get LQMJClass():any{
       return this._lqmjClass;
    }

    onLoad() {
        // init logic
        //this.init();
        let wallcnode=cc.instantiate(this.LQMJ_PaiWalls_View);
        this._delPaiWall=wallcnode.getComponent<LQMJ_PaiWall>(LQMJ_PaiWall);
        this.moreNode.addChild(wallcnode);
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
    // private _fixedCard:Array<LQMJ_FixedBase>;
    // //牌池牌
    // private _poolCard:Array<LQMJ_PoolBase>;
    
    public init() {
        this.clear();
        this.node.active=true;
        
        
        //this._activeCard = new Array<LQMJ_ActiveBase>();
        // this._fixedCard = new Array<LQMJ_FixedBase>();
        // this._poolCard = new Array<LQMJ_PoolBase>();

        // if(this._activeCard.length > 0){
        //     return;
        // }
        
        // //下家处理
        // var pool_down : LQMJ_DownPool = new LQMJ_DownPool();
        // var fixed_down : LQMJ_DownFixed = new LQMJ_DownFixed();
        // var donwActiveCls : any = egret.getDefinitionByName(this.LQMJClass.getActiveCardClassName()[1]);
        // var active_down: LQMJ_ActiveBase = new donwActiveCls();
        
        // this._group_down.addChild(pool_down);
        // this._group_down.addChild(fixed_down);
        // this._group_down.addChild(active_down);
        
        // //对家处理
        // var pool_oppo : LQMJ_OppoPool = new LQMJ_OppoPool();
        // var fixed_oppo: LQMJ_OppoFixed = new LQMJ_OppoFixed();
        // var oppoActiveCls : any = egret.getDefinitionByName(this.LQMJClass.getActiveCardClassName()[2]);
        // var active_oppo: LQMJ_ActiveBase = new oppoActiveCls();
        
        
        // this._group_oppo.addChild(pool_oppo);
        // this._group_oppo.addChild(fixed_oppo);
        // this._group_oppo.addChild(active_oppo);
        
        // //上家处理
        // var pool_up : LQMJ_UpPool = new LQMJ_UpPool();
        // var upActiveCls: any = egret.getDefinitionByName(this.LQMJClass.getActiveCardClassName()[3]);
        // var acitve_up: LQMJ_ActiveBase = new upActiveCls();
        // var fixed_up : LQMJ_UpFixed = new LQMJ_UpFixed();
        
        // this._group_up.addChild(pool_up);
        // this._group_up.addChild(fixed_up);
        // this._group_up.addChild(acitve_up);
        
        // //自家处理
        // var pool_self: LQMJ_SelfPool = new LQMJ_SelfPool();
        // var fixed_self : LQMJ_SelfFixed = new LQMJ_SelfFixed();
        // var selfActiveCls : any = egret.getDefinitionByName(this.LQMJClass.getActiveCardClassName()[0]);
        // var active_self: LQMJ_ActiveBase = new selfActiveCls();
        
        //this.activeCard[0].node.on(LQMJEvent.LQMJ_EVENT_TYPE,this.onSelfActiveEvent,this);
        
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
    public get selfActive():LQMJ_ActiveBase{
        return this.activeCard[0];
    }
    /**
     * 回放自己活动牌针
     */
    public selfVideoActive(index):LQMJ_ActiveBase{
        return this.activeVideoCard[index];
    }

    /**
     * 自己的定牌阵
     * */
    public get selfFixed():LQMJ_FixedBase{
        return this.fixedCard[0];
    }
    /**
     * 自己的牌池
     * 
     * */
    public get selfPool():LQMJ_PoolBase{
        return this.poolCard[0];
    }
    /**
     * 获取活动牌阵
     * */
    public getActive(chair:number): LQMJ_ActiveBase{
        var logicChair: number = this.LQMJClass.physical2logicChair(chair);
        if(this.LQMJClass == LQMJ.ins.iclass)
            return this.activeCard[logicChair];
        else
            return this.activeVideoCard[logicChair];
    }
    /**
     * 获取定牌阵
     * */
    public getFixed(chair: number):LQMJ_FixedBase{
        var logicChair: number = this.LQMJClass.physical2logicChair(chair);
        return this.fixedCard[logicChair];
    }
        /**
     * 获取混皮牌
     */
    public get hunPi():LQMJ_HunPi{
        return this.hunpiCard[0];
    }
    /**
     * 获取牌池
     * */
    public getPool(chair: number):LQMJ_PoolBase{
        var logicChair: number = this.LQMJClass.physical2logicChair(chair);
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
        if((LQMJMahjongDef.gInvalidChar == chair) || (LQMJMahjongDef.gInvalidMahjongValue == card)){
            return;
        }
        if(LQMJ.ins.iclass == this.LQMJClass)
            var arrowPos : {x:number,y:number} = this.getPool(chair).addPoolCard(card);
        else
            var arrowPos : {x:number,y:number} = this.getPool(chair).addPoolCard(card,this.LQMJClass);
        
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

        if((LQMJMahjongDef.gInvalidChar == chair) || (LQMJMahjongDef.gInvalidMahjongValue == card)){
            return;
        }
       // this.unschedule(this.ArrowRun);
        this.img_poolCardArrow.node.stopAllActions();
        this.img_poolCardArrow.node.active = false;
        if(LQMJ.ins.iclass == this.LQMJClass)
            this.getPool(chair).delLastPoolCard(card,leftnum);
        else
            this.getPool(chair).delLastPoolCard(card,leftnum,this.LQMJClass);
    }
    /**
     * 恢复玩家活动牌
     * */
    public recoveryActiveCard(chair:number,cardAry:Array<number>):void{
        
        var logicChair: number = this.LQMJClass.physical2logicChair(chair);
        //更新活动牌阵中定牌数量
        this.activeCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
        //刷新手牌阵
        this.activeCard[logicChair].refreshHandCardData(cardAry);
    }
    
    /**
     * 活动牌事件
     * */
    // private onSelfActiveEvent(e:LQMJEvent):void{
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
        var logicChair : number = this.LQMJClass.physical2logicChair(chair);
        if(this.LQMJClass == LQMJ.ins.iclass)
            return this.activeCard[logicChair].holdTricksCard(holdIdx);
        else
            return this.activeVideoCard[logicChair].holdTricksCard(holdIdx);
    }
    
    /**
     * 玩家抓牌
     * */
    public playerHoldCard(chair:number,card:number):void{
        var logicChair: number = this.LQMJClass.physical2logicChair(chair);
        if(this.LQMJClass == LQMJ.ins.iclass)
            this.activeCard[logicChair].holdACard(card);
        else
            this.activeVideoCard[logicChair].holdACard(card,this.LQMJClass);
    }
    
    /**
     * 玩家打牌
     * */
    public playerOutCard(chair:number,card:number):void{
        var logicChair: number = this.LQMJClass.physical2logicChair(chair);
        if(this.LQMJClass == LQMJ.ins.iclass)
            this.activeCard[logicChair].outACard(card);
        else
            this.activeVideoCard[logicChair].outACard(card,this.LQMJClass);
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
     * 玩家吃牌
     * */
    public playerChi(chair: number,card: number,outChair:number,chiType:number):void{
        
        var logicChair: number = this.LQMJClass.physical2logicChair(chair);
        
        // let pos=(outChair+LQMJMahjongDef.gPlayerNum-chair)%LQMJMahjongDef.gPlayerNum;
        //吃牌 亮光显示吃的那张牌
        let pos = 2 - chiType;

        //处理定牌
        this.fixedCard[logicChair].addFixed(card,enFixedCardType.FixedCardType_Chi,pos,chiType,this.LQMJClass);
        
        if(this.LQMJClass == LQMJ.ins.iclass){
            //更新活动牌阵中定牌数量
            this.activeCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
            //更新活动牌
            this.activeCard[logicChair].chiACard(card,chiType);
        }else{
            this.activeVideoCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
            this.activeVideoCard[logicChair].chiACard(card,chiType);
        }
    }

    /**
     * 玩家碰牌
     * */
    public playerPeng(chair: number,card: number,outChair:number):void{
        
        var logicChair: number = this.LQMJClass.physical2logicChair(chair);
        
        let pos:number=0;
        if(chair < outChair && Math.abs(chair - outChair) == 1 || chair > outChair &&  Math.abs(chair - outChair) == 3)
            pos = 2;//下家
        if(chair -outChair == 2 || outChair - chair == 2)
            pos = 1;//对家
        if(chair > outChair && Math.abs(chair - outChair) == 1 || chair < outChair &&  Math.abs(chair - outChair) == 3)           
            pos = 0;//上家

        //处理定牌
        this.fixedCard[logicChair].addFixed(card,enFixedCardType.FixedCardType_Peng,pos,null,this.LQMJClass);
        
        if(this.LQMJClass == LQMJ.ins.iclass){
            //更新活动牌阵中定牌数量
            this.activeCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
            //更新活动牌
            this.activeCard[logicChair].pengACard(card);
        }else{
            this.activeVideoCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
            this.activeVideoCard[logicChair].pengACard(card,this.LQMJClass);
        }
    }
    
    /**
     * 玩家暗杠
     * */
    public playerAGang(chair: number,card: number):void{
        var logicChair: number = this.LQMJClass.physical2logicChair(chair);

        //处理定牌
        this.fixedCard[logicChair].addFixed(card,enFixedCardType.FixedCardType_AGang,0,null,this.LQMJClass);

        if(this.LQMJClass == LQMJ.ins.iclass){
            //更新活动牌阵中定牌数量
            this.activeCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
            //更新活动牌
            this.activeCard[logicChair].AGangACard(card);
        }else{
            this.activeVideoCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
            this.activeVideoCard[logicChair].AGangACard(card,this.LQMJClass);
        }
    }
    
    /**
     * 玩家明杠
     * */
    public playerMGang(chair: number,card: number,outChair:number):void{
        var logicChair: number = this.LQMJClass.physical2logicChair(chair);

        // let pos=(outChair+LQMJMahjongDef.gPlayerNum-chair)%LQMJMahjongDef.gPlayerNum;
        let pos:number=0;
        if(chair < outChair && Math.abs(chair - outChair) == 1 || chair > outChair &&  Math.abs(chair - outChair) == 3)
            pos = 2;//下家
        if(chair -outChair == 2 || outChair - chair == 2)
            pos = 1;//对家
        if(chair > outChair && Math.abs(chair - outChair) == 1 || chair < outChair &&  Math.abs(chair - outChair) == 3)           
            pos = 0;//上家

        //处理定牌
        this.fixedCard[logicChair].addFixed(card,enFixedCardType.FixedCardType_MGang,pos,null,this.LQMJClass);

        if(this.LQMJClass == LQMJ.ins.iclass){
            //更新活动牌阵中定牌数量
            this.activeCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
            //更新活动牌
            this.activeCard[logicChair].MGangACard(card);
        }else{
            this.activeVideoCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
            this.activeVideoCard[logicChair].MGangACard(card,this.LQMJClass);
        }
    }
    
    /**
     * 玩家补杠
     * */
    public playerBGang(chair: number,card: number):void{
        var logicChair: number = this.LQMJClass.physical2logicChair(chair);

        //处理定牌
        this.fixedCard[logicChair].peng2gang(card,this.LQMJClass);

        //更新活动牌
        if(this.LQMJClass == LQMJ.ins.iclass)
            this.activeCard[logicChair].BGangACard(card);
        else
            this.activeVideoCard[logicChair].BGangACard(card,this.LQMJClass);
    }
    
    /**
     * 清理
     * */
    public clear():void{
        for(var i:number=0; i<this.activeCard.length; i++){
            if(this.LQMJClass == LQMJ.ins.iclass)
                this.activeCard[i].clear();
            // else
                // this.activeVideoCard[i].clear();
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
