import HQMJ_ActiveBase from "../PlayerCard/active/HQMJ_ActiveBase";
import { HQMJ, HQMJMahjongDef, enFixedCardType } from "../ConstDef/HQMJMahjongDef";
import HQMJEvent from "../HQMJEvent";
import HQMJ_FixedBase from "../PlayerCard/fixed/HQMJ_FixedBase";
import HQMJ_PoolBase from "../PlayerCard/pool/HQMJ_PoolBase";
import HQMJ_HunPi from "../PlayerCard/single/hunpi/HQMJ_Hunpi";
import HQMJ_PaiWall from "../SkinView/HQMJ_PaiWalls";
import HQMJ_VideoActiveBase from "../PlayerCard/active/HQMJ_VideoActiveBase";
import M_HQMJVideoClass from '../M_HQMJVideoClass';

const { ccclass, property } = cc._decorator;

@ccclass
export default class HQMJ_CardView extends cc.Component {

    @property([HQMJ_ActiveBase])
    activeCard:HQMJ_ActiveBase[]=[];

    @property([HQMJ_VideoActiveBase])
    activeVideoCard:HQMJ_VideoActiveBase[]=[];

    @property([HQMJ_FixedBase])
    fixedCard:HQMJ_FixedBase[]=[];

    @property([HQMJ_PoolBase])
    poolCard:HQMJ_PoolBase[]=[];

    @property(cc.Node)
    moreNode:cc.Node = null;

    @property(cc.Sprite)
    img_poolCardArrow:cc.Sprite=null;
    @property([HQMJ_HunPi])
    private hunpiCard:HQMJ_HunPi[]=[];

    @property(cc.Prefab)
    HQMJ_PaiWalls_View: cc.Prefab=null;

    //牌墙
    private _delPaiWall: HQMJ_PaiWall;
    /**
    * 删除牌墙
    * */
    public get PaiWallView(): HQMJ_PaiWall {
        return this._delPaiWall;
    }
    
    private _hqmjClass: any = null;
    public set HQMJClass(value: any){
        this._hqmjClass = value;
    }
    public get HQMJClass():any{
       return this._hqmjClass;
    }

    onLoad() {
        // init logic
        //this.init();
        let wallcnode=cc.instantiate(this.HQMJ_PaiWalls_View);
        this._delPaiWall=wallcnode.getComponent<HQMJ_PaiWall>(HQMJ_PaiWall);
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
    // private _fixedCard:Array<HQMJ_FixedBase>;
    // //牌池牌
    // private _poolCard:Array<HQMJ_PoolBase>;
    
    public init() {
        this.clear();
        this.node.active=true;
        
        
        //this._activeCard = new Array<HQMJ_ActiveBase>();
        // this._fixedCard = new Array<HQMJ_FixedBase>();
        // this._poolCard = new Array<HQMJ_PoolBase>();

        // if(this._activeCard.length > 0){
        //     return;
        // }
        
        // //下家处理
        // var pool_down : HQMJ_DownPool = new HQMJ_DownPool();
        // var fixed_down : HQMJ_DownFixed = new HQMJ_DownFixed();
        // var donwActiveCls : any = egret.getDefinitionByName(this.HQMJClass.getActiveCardClassName()[1]);
        // var active_down: HQMJ_ActiveBase = new donwActiveCls();
        
        // this._group_down.addChild(pool_down);
        // this._group_down.addChild(fixed_down);
        // this._group_down.addChild(active_down);
        
        // //对家处理
        // var pool_oppo : HQMJ_OppoPool = new HQMJ_OppoPool();
        // var fixed_oppo: HQMJ_OppoFixed = new HQMJ_OppoFixed();
        // var oppoActiveCls : any = egret.getDefinitionByName(this.HQMJClass.getActiveCardClassName()[2]);
        // var active_oppo: HQMJ_ActiveBase = new oppoActiveCls();
        
        
        // this._group_oppo.addChild(pool_oppo);
        // this._group_oppo.addChild(fixed_oppo);
        // this._group_oppo.addChild(active_oppo);
        
        // //上家处理
        // var pool_up : HQMJ_UpPool = new HQMJ_UpPool();
        // var upActiveCls: any = egret.getDefinitionByName(this.HQMJClass.getActiveCardClassName()[3]);
        // var acitve_up: HQMJ_ActiveBase = new upActiveCls();
        // var fixed_up : HQMJ_UpFixed = new HQMJ_UpFixed();
        
        // this._group_up.addChild(pool_up);
        // this._group_up.addChild(fixed_up);
        // this._group_up.addChild(acitve_up);
        
        // //自家处理
        // var pool_self: HQMJ_SelfPool = new HQMJ_SelfPool();
        // var fixed_self : HQMJ_SelfFixed = new HQMJ_SelfFixed();
        // var selfActiveCls : any = egret.getDefinitionByName(this.HQMJClass.getActiveCardClassName()[0]);
        // var active_self: HQMJ_ActiveBase = new selfActiveCls();
        
        //this.activeCard[0].node.on(HQMJEvent.HQMJ_EVENT_TYPE,this.onSelfActiveEvent,this);
        
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
    public get selfActive():HQMJ_ActiveBase{
        return this.activeCard[0];
    }
    /**
     * 回放自己活动牌针
     */
    public selfVideoActive(index):HQMJ_ActiveBase{
        return this.activeVideoCard[index];
    }

    /**
     * 自己的定牌阵
     * */
    public get selfFixed():HQMJ_FixedBase{
        return this.fixedCard[0];
    }
    /**
     * 自己的牌池
     * 
     * */
    public get selfPool():HQMJ_PoolBase{
        return this.poolCard[0];
    }
    /**
     * 获取活动牌阵
     * */
    public getActive(chair:number): HQMJ_ActiveBase{
        var logicChair: number = this.HQMJClass.physical2logicChair(chair);
        if(this.HQMJClass == HQMJ.ins.iclass)
            return this.activeCard[logicChair];
        else
            return this.activeVideoCard[logicChair];
    }
    /**
     * 获取定牌阵
     * */
    public getFixed(chair: number):HQMJ_FixedBase{
        var logicChair: number = this.HQMJClass.physical2logicChair(chair);
        return this.fixedCard[logicChair];
    }
        /**
     * 获取混皮牌
     */
    public get hunPi():HQMJ_HunPi{
        return this.hunpiCard[0];
    }
    /**
     * 获取牌池
     * */
    public getPool(chair: number):HQMJ_PoolBase{
        var logicChair: number = this.HQMJClass.physical2logicChair(chair);
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
        if((HQMJMahjongDef.gInvalidChar == chair) || (HQMJMahjongDef.gInvalidMahjongValue == card)){
            return;
        }
        if(HQMJ.ins.iclass == this.HQMJClass)
            var arrowPos : {x:number,y:number} = this.getPool(chair).addPoolCard(card);
        else
            var arrowPos : {x:number,y:number} = this.getPool(chair).addPoolCard(card,this.HQMJClass);
        
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

        if((HQMJMahjongDef.gInvalidChar == chair) || (HQMJMahjongDef.gInvalidMahjongValue == card)){
            return;
        }
       // this.unschedule(this.ArrowRun);
        this.img_poolCardArrow.node.stopAllActions();
        this.img_poolCardArrow.node.active = false;
        if(HQMJ.ins.iclass == this.HQMJClass)
            this.getPool(chair).delLastPoolCard(card,leftnum);
        else
            this.getPool(chair).delLastPoolCard(card,leftnum,this.HQMJClass);
    }
    /**
     * 恢复玩家活动牌
     * */
    public recoveryActiveCard(chair:number,cardAry:Array<number>):void{
        
        var logicChair: number = this.HQMJClass.physical2logicChair(chair);
        //更新活动牌阵中定牌数量
        this.activeCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
        //刷新手牌阵
        this.activeCard[logicChair].refreshHandCardData(cardAry);
    }
    
    /**
     * 活动牌事件
     * */
    // private onSelfActiveEvent(e:HQMJEvent):void{
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
        var logicChair : number = this.HQMJClass.physical2logicChair(chair);
        if(this.HQMJClass == HQMJ.ins.iclass)
            return this.activeCard[logicChair].holdTricksCard(holdIdx);
        else
            return this.activeVideoCard[logicChair].holdTricksCard(holdIdx);
    }
    
    /**
     * 玩家抓牌
     * */
    public playerHoldCard(chair:number,card:number):void{
        var logicChair: number = this.HQMJClass.physical2logicChair(chair);
        if(this.HQMJClass == HQMJ.ins.iclass)
            this.activeCard[logicChair].holdACard(card);
        else
            this.activeVideoCard[logicChair].holdACard(card,this.HQMJClass);
    }
    
    /**
     * 玩家打牌
     * */
    public playerOutCard(chair:number,card:number):void{
        var logicChair: number = this.HQMJClass.physical2logicChair(chair);
        if(this.HQMJClass == HQMJ.ins.iclass)
            this.activeCard[logicChair].outACard(card);
        else
            this.activeVideoCard[logicChair].outACard(card,this.HQMJClass);
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
        
        var logicChair: number = this.HQMJClass.physical2logicChair(chair);
        
        // let pos=(outChair+HQMJMahjongDef.gPlayerNum-chair)%HQMJMahjongDef.gPlayerNum;
        //吃牌 亮光显示吃的那张牌
        let pos = 2 - chiType;

        //处理定牌
        this.fixedCard[logicChair].addFixed(card,enFixedCardType.FixedCardType_Chi,pos,chiType,this.HQMJClass);
        
        if(this.HQMJClass == HQMJ.ins.iclass){
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
        
        var logicChair: number = this.HQMJClass.physical2logicChair(chair);
        
        let pos:number=0;
        if(chair < outChair && Math.abs(chair - outChair) == 1 || chair > outChair &&  Math.abs(chair - outChair) == 3)
            pos = 2;//下家
        if(chair -outChair == 2 || outChair - chair == 2)
            pos = 1;//对家
        if(chair > outChair && Math.abs(chair - outChair) == 1 || chair < outChair &&  Math.abs(chair - outChair) == 3)           
            pos = 0;//上家

        //处理定牌
        this.fixedCard[logicChair].addFixed(card,enFixedCardType.FixedCardType_Peng,pos,null,this.HQMJClass);
        
        if(this.HQMJClass == HQMJ.ins.iclass){
            //更新活动牌阵中定牌数量
            this.activeCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
            //更新活动牌
            this.activeCard[logicChair].pengACard(card);
        }else{
            this.activeVideoCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
            this.activeVideoCard[logicChair].pengACard(card,this.HQMJClass);
        }
    }
    
    /**
     * 玩家暗杠
     * */
    public playerAGang(chair: number,card: number):void{
        var logicChair: number = this.HQMJClass.physical2logicChair(chair);

        //处理定牌
        this.fixedCard[logicChair].addFixed(card,enFixedCardType.FixedCardType_AGang,0,null,this.HQMJClass);

        if(this.HQMJClass == HQMJ.ins.iclass){
            //更新活动牌阵中定牌数量
            this.activeCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
            //更新活动牌
            this.activeCard[logicChair].AGangACard(card);
        }else{
            this.activeVideoCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
            this.activeVideoCard[logicChair].AGangACard(card,this.HQMJClass);
        }
    }
    
    /**
     * 玩家明杠
     * */
    public playerMGang(chair: number,card: number,outChair:number):void{
        var logicChair: number = this.HQMJClass.physical2logicChair(chair);

        // let pos=(outChair+HQMJMahjongDef.gPlayerNum-chair)%HQMJMahjongDef.gPlayerNum;
        let pos:number=0;
        if(chair < outChair && Math.abs(chair - outChair) == 1 || chair > outChair &&  Math.abs(chair - outChair) == 3)
            pos = 2;//下家
        if(chair -outChair == 2 || outChair - chair == 2)
            pos = 1;//对家
        if(chair > outChair && Math.abs(chair - outChair) == 1 || chair < outChair &&  Math.abs(chair - outChair) == 3)           
            pos = 0;//上家

        //处理定牌
        this.fixedCard[logicChair].addFixed(card,enFixedCardType.FixedCardType_MGang,pos,null,this.HQMJClass);

        if(this.HQMJClass == HQMJ.ins.iclass){
            //更新活动牌阵中定牌数量
            this.activeCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
            //更新活动牌
            this.activeCard[logicChair].MGangACard(card);
        }else{
            this.activeVideoCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
            this.activeVideoCard[logicChair].MGangACard(card,this.HQMJClass);
        }
    }
    
    /**
     * 玩家补杠
     * */
    public playerBGang(chair: number,card: number):void{
        var logicChair: number = this.HQMJClass.physical2logicChair(chair);

        //处理定牌
        this.fixedCard[logicChair].peng2gang(card,this.HQMJClass);

        //更新活动牌
        if(this.HQMJClass == HQMJ.ins.iclass)
            this.activeCard[logicChair].BGangACard(card);
        else
            this.activeVideoCard[logicChair].BGangACard(card,this.HQMJClass);
    }
    
    /**
     * 清理
     * */
    public clear():void{
        for(var i:number=0; i<this.activeCard.length; i++){
            if(this.HQMJClass == HQMJ.ins.iclass)
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
