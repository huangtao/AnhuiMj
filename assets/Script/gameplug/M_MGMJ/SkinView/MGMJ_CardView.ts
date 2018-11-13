import MGMJ_ActiveBase from "../PlayerCard/active/MGMJ_ActiveBase";
import { MGMJ, MGMJMahjongDef, enFixedCardType } from "../ConstDef/MGMJMahjongDef";
import MGMJEvent from "../MGMJEvent";
import MGMJ_FixedBase from "../PlayerCard/fixed/MGMJ_FixedBase";
import MGMJ_PoolBase from "../PlayerCard/pool/MGMJ_PoolBase";
import MGMJ_HunPi from "../PlayerCard/single/hunpi/MGMJ_Hunpi";
import MGMJ_PaiWall from "../SkinView/MGMJ_PaiWalls";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MGMJ_CardView extends cc.Component {

    @property([MGMJ_ActiveBase])
    activeCard:MGMJ_ActiveBase[]=[];

    @property([MGMJ_FixedBase])
    fixedCard:MGMJ_FixedBase[]=[];

    @property([MGMJ_PoolBase])
    poolCard:MGMJ_PoolBase[]=[];

    @property(cc.Node)
    moreNode:cc.Node = null;

    @property(cc.Sprite)
    img_poolCardArrow:cc.Sprite=null;
    @property([MGMJ_HunPi])
    private hunpiCard:MGMJ_HunPi[]=[];

    @property(cc.Prefab)
    MGMJ_PaiWalls_View: cc.Prefab=null;

    //牌墙
    private _delPaiWall: MGMJ_PaiWall;
    /**
     * 删除牌墙
     * */
    public get PaiWallView(): MGMJ_PaiWall {
        return this._delPaiWall;
    }
    
    onLoad() {
        // init logic
        //this.init();
        let wallcnode=cc.instantiate(this.MGMJ_PaiWalls_View);
        this._delPaiWall=wallcnode.getComponent<MGMJ_PaiWall>(MGMJ_PaiWall);
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
    // private _fixedCard:Array<MGMJ_FixedBase>;
    // //牌池牌
    // private _poolCard:Array<MGMJ_PoolBase>;
    
    public init() {
        this.clear();
        this.node.active=true;
        
        
        //this._activeCard = new Array<MGMJ_ActiveBase>();
        // this._fixedCard = new Array<MGMJ_FixedBase>();
        // this._poolCard = new Array<MGMJ_PoolBase>();

        // if(this._activeCard.length > 0){
        //     return;
        // }
        
        // //下家处理
        // var pool_down : MGMJ_DownPool = new MGMJ_DownPool();
        // var fixed_down : MGMJ_DownFixed = new MGMJ_DownFixed();
        // var donwActiveCls : any = egret.getDefinitionByName(MGMJ.ins.iclass.getActiveCardClassName()[1]);
        // var active_down: MGMJ_ActiveBase = new donwActiveCls();
        
        // this._group_down.addChild(pool_down);
        // this._group_down.addChild(fixed_down);
        // this._group_down.addChild(active_down);
        
        // //对家处理
        // var pool_oppo : MGMJ_OppoPool = new MGMJ_OppoPool();
        // var fixed_oppo: MGMJ_OppoFixed = new MGMJ_OppoFixed();
        // var oppoActiveCls : any = egret.getDefinitionByName(MGMJ.ins.iclass.getActiveCardClassName()[2]);
        // var active_oppo: MGMJ_ActiveBase = new oppoActiveCls();
        
        
        // this._group_oppo.addChild(pool_oppo);
        // this._group_oppo.addChild(fixed_oppo);
        // this._group_oppo.addChild(active_oppo);
        
        // //上家处理
        // var pool_up : MGMJ_UpPool = new MGMJ_UpPool();
        // var upActiveCls: any = egret.getDefinitionByName(MGMJ.ins.iclass.getActiveCardClassName()[3]);
        // var acitve_up: MGMJ_ActiveBase = new upActiveCls();
        // var fixed_up : MGMJ_UpFixed = new MGMJ_UpFixed();
        
        // this._group_up.addChild(pool_up);
        // this._group_up.addChild(fixed_up);
        // this._group_up.addChild(acitve_up);
        
        // //自家处理
        // var pool_self: MGMJ_SelfPool = new MGMJ_SelfPool();
        // var fixed_self : MGMJ_SelfFixed = new MGMJ_SelfFixed();
        // var selfActiveCls : any = egret.getDefinitionByName(MGMJ.ins.iclass.getActiveCardClassName()[0]);
        // var active_self: MGMJ_ActiveBase = new selfActiveCls();
        
        //this.activeCard[0].node.on(MGMJEvent.MGMJ_EVENT_TYPE,this.onSelfActiveEvent,this);
        
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
    public get selfActive():MGMJ_ActiveBase{
        return this.activeCard[0];
    }
    /**
     * 自己的定牌阵
     * */
    public get selfFixed():MGMJ_FixedBase{
        return this.fixedCard[0];
    }
    /**
     * 自己的牌池
     * */
    public get selfPool():MGMJ_PoolBase{
        return this.poolCard[0];
    }
    /**
     * 获取活动牌阵
     * */
    public getActive(chair:number): MGMJ_ActiveBase{
        var logicChair: number = MGMJ.ins.iclass.physical2logicChair(chair);
        return this.activeCard[logicChair];
    }
    /**
     * 获取定牌阵
     * */
    public getFixed(chair: number):MGMJ_FixedBase{
        var logicChair: number = MGMJ.ins.iclass.physical2logicChair(chair);
        return this.fixedCard[logicChair];
    }
        /**
     * 获取混皮牌
     */
    public get hunPi():MGMJ_HunPi{
        return this.hunpiCard[0];
    }
    /**
     * 获取牌池
     * */
    public getPool(chair: number):MGMJ_PoolBase{
        var logicChair: number = MGMJ.ins.iclass.physical2logicChair(chair);
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
        if((MGMJMahjongDef.gInvalidChar == chair) || (MGMJMahjongDef.gInvalidMahjongValue == card)){
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

        if((MGMJMahjongDef.gInvalidChar == chair) || (MGMJMahjongDef.gInvalidMahjongValue == card)){
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
        
        var logicChair: number = MGMJ.ins.iclass.physical2logicChair(chair);
        //更新活动牌阵中定牌数量
        this.activeCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
        //刷新手牌阵
        this.activeCard[logicChair].refreshHandCardData(cardAry);
    }
    
    /**
     * 活动牌事件
     * */
    // private onSelfActiveEvent(e:MGMJEvent):void{
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
        var logicChair : number = MGMJ.ins.iclass.physical2logicChair(chair);
        return this.activeCard[logicChair].holdTricksCard(holdIdx);
    }
    
    /**
     * 玩家抓牌
     * */
    public playerHoldCard(chair:number,card:number):void{
        var logicChair: number = MGMJ.ins.iclass.physical2logicChair(chair);
        this.activeCard[logicChair].holdACard(card);
    }
    
    /**
     * 玩家打牌
     * */
    public playerOutCard(chair:number,card:number):void{
        var logicChair: number = MGMJ.ins.iclass.physical2logicChair(chair);
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
     * 玩家吃牌
     * */
    public playerChi(chair: number,card: number,outChair:number,chiType:number):void{
        
        var logicChair: number = MGMJ.ins.iclass.physical2logicChair(chair);
        
        // let pos=(outChair+MGMJMahjongDef.gPlayerNum-chair)%MGMJMahjongDef.gPlayerNum;
        //吃牌 亮光显示吃的那张牌
        let pos = 2 - chiType;

        //处理定牌
        this.fixedCard[logicChair].addFixed(card,enFixedCardType.FixedCardType_Chi,pos,chiType);
        
        //更新活动牌阵中定牌数量
        this.activeCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
        
        //更新活动牌
        this.activeCard[logicChair].chiACard(card,chiType);
    }

    /**
     * 玩家碰牌
     * */
    public playerPeng(chair: number,card: number,outChair:number):void{
        
        var logicChair: number = MGMJ.ins.iclass.physical2logicChair(chair);
        
        // let pos=(outChair+MGMJMahjongDef.gPlayerNum-chair)%MGMJMahjongDef.gPlayerNum;
        let pos:number=0;
        // if(chair > outChair && (chair - outChair) == 1)//上家打的
        //     pos = 0;
        // if(chair -outChair == 2 || outChair - chair == 2)//对家
        //     pos = 1;
        // if(chair < outChair && (chair - outChair) == 1)//下家
        //     pos = 2;
        if(chair < outChair && Math.abs(chair - outChair) == 1 || chair > outChair &&  Math.abs(chair - outChair) == 3)
            pos = 2;//下家
        if(chair -outChair == 2 || outChair - chair == 2)
            pos = 1;//对家
        if(chair > outChair && Math.abs(chair - outChair) == 1 || chair < outChair &&  Math.abs(chair - outChair) == 3)           
            pos = 0;//上家

        //处理定牌
        this.fixedCard[logicChair].addFixed(card,enFixedCardType.FixedCardType_Peng,pos,null);
        
        //更新活动牌阵中定牌数量
        this.activeCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;
        
        //更新活动牌
        this.activeCard[logicChair].pengACard(card);
    }
    
    /**
     * 玩家暗杠
     * */
    public playerAGang(chair: number,card: number):void{
        var logicChair: number = MGMJ.ins.iclass.physical2logicChair(chair);

        //处理定牌
        this.fixedCard[logicChair].addFixed(card,enFixedCardType.FixedCardType_AGang,0,null);

        //更新活动牌阵中定牌数量
        this.activeCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;

        //更新活动牌
        this.activeCard[logicChair].AGangACard(card);
    }
    
    /**
     * 玩家明杠
     * */
    public playerMGang(chair: number,card: number,outChair:number):void{
        var logicChair: number = MGMJ.ins.iclass.physical2logicChair(chair);

        // let pos=(outChair+MGMJMahjongDef.gPlayerNum-chair)%MGMJMahjongDef.gPlayerNum;
        let pos:number=0;
        if(chair < outChair && Math.abs(chair - outChair) == 1 || chair > outChair &&  Math.abs(chair - outChair) == 3)
            pos = 2;//下家
        if(chair -outChair == 2 || outChair - chair == 2)
            pos = 1;//对家
        if(chair > outChair && Math.abs(chair - outChair) == 1 || chair < outChair &&  Math.abs(chair - outChair) == 3)           
            pos = 0;//上家

        //处理定牌
        this.fixedCard[logicChair].addFixed(card,enFixedCardType.FixedCardType_MGang,pos,null);

        //更新活动牌阵中定牌数量
        this.activeCard[logicChair].fixedCardNum = this.fixedCard[logicChair].fixedCardNum;

        //更新活动牌
        this.activeCard[logicChair].MGangACard(card);
    }
    
    /**
     * 玩家补杠
     * */
    public playerBGang(chair: number,card: number):void{
        var logicChair: number = MGMJ.ins.iclass.physical2logicChair(chair);

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
