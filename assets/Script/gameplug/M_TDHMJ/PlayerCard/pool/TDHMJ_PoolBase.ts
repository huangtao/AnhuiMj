import TDHMJ_CardBase from "../single/TDHMJ_CardBase";
import TDHMJ_SinglePoolBase from "../single/TDHMJ_SinglePoolBase";
import M_TDHMJClass from '../../M_TDHMJClass';
import { TDHMJ } from "../../ConstDef/TDHMJMahjongDef";
import M_TDHMJVideoClass from "../../M_TDHMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TDHMJ_PoolBase extends TDHMJ_CardBase {

    @property(cc.Prefab)
    PoolType: cc.Prefab=null;

    onLoad() {
        // init logic
        
    }

    //牌池数据
    protected _poolCard:Array<TDHMJ_SinglePoolBase>;
    //牌阵数据
    protected _cardAry:Array<number>;
    /**
     * 逻辑椅子号
     * */
    protected _logicChair:number;
    
    public init(logicChair: number) {
        this._logicChair= logicChair;
        this._poolCard = new Array<TDHMJ_SinglePoolBase>(0);
        this._cardAry = new Array<number>(0);
    }
    
    /**
     * 添加一个牌池牌
     * */
    public addPoolCard(card:number,_lqmj = TDHMJ.ins.iclass):{x:number,y:number}{
        let newnode = _lqmj.getFreePool(this._logicChair).get();
        if (!cc.isValid(newnode)) {
            newnode = cc.instantiate(this.PoolType);
        }
        // var newnode=cc.instantiate(this.PoolType);
        var pool = newnode.getComponent<TDHMJ_SinglePoolBase>(TDHMJ_SinglePoolBase);
        pool.init();
        this.node.addChild(newnode);
        this._poolCard.push(pool);
        //pool.showCard(card);
        this._cardAry.push(card);
        
        // var poolCard : SinglePoolBase = this.createSinglePoolCard();
        // this._poolCard.push(poolCard);
        
        // this.addChild(poolCard);
        return this.refreshPoolCard(_lqmj);
    }
    /**
     * 删除最后一个牌池牌
     * */
    public delLastPoolCard(card:number,leftnum:number,_lqmj = TDHMJ.ins.iclass):{x:number,y:number}{
        if(leftnum!=this._cardAry.length-1)
        {return;}

        if(card!= this._cardAry[leftnum])
        {return;}
        this._cardAry.pop();
        // this._poolCard.pop().node.destroy();
        _lqmj.getFreePool(this._logicChair).put(this._poolCard.pop().node);
        return this.refreshPoolCard(_lqmj);
    }
    /**
     * 恢复牌池
     * */
    public recoveryPoolCard(cardAry:Array<number>):void{
        if((null != cardAry) && (cardAry.length > 0)){
            for(var i:number=0; i<cardAry.length; i++){
                
                this._cardAry.push(cardAry[i]);
                M_TDHMJClass.ins.RecordCard.outACard(cardAry[i]);
                let newnode = TDHMJ.ins.iclass.getFreePool(this._logicChair).get();
                if (!cc.isValid(newnode)) {
                    newnode = cc.instantiate(this.PoolType);
                }
                // var newnode=cc.instantiate(this.PoolType);
                var pool = newnode.getComponent<TDHMJ_SinglePoolBase>(TDHMJ_SinglePoolBase);
                pool.init();
                this.node.addChild(newnode);
                this._poolCard.push(pool);
            }
            
            this.refreshPoolCard(TDHMJ.ins.iclass);
        }
    }
    
    /**
     * 刷新牌池牌
     * */
    protected refreshPoolCard(_lqmj): {x:number,y:number} {
        return {x:0,y:0};
    }
    /**
     * 
     * @param card 刷新当前牌的牌池位置
     */
    public refreshHideCard(card:number):void{
        if(cc.isValid(this._poolCard)){
            for(let i=0;i<this._poolCard.length;i++){
                this._poolCard[i].showHide(card);
            }
        }
    }

    public HideLastCard(): {x:number,y:number}{
        if(this._poolCard.length < 1) {
            return {x:0,y:0};
        }
        let lastIdx=this._poolCard.length - 1;
        let rx: number = this._poolCard[lastIdx].node.x ;
        let ry: number = this._poolCard[lastIdx].node.y+ this._poolCard[lastIdx].size.height / 2;
        this._poolCard[lastIdx].node.active=false;
        return { x: rx,y: ry };
    }

    public ShowAllCard():void{
        if(cc.isValid(this._poolCard)){
            for(let i=0;i<this._poolCard.length;i++){
                this._poolCard[i].node.active=true;
            }
        }
    }
    // /**
    //  * 创建一个新的牌池牌
    //  * */
    // protected createSinglePoolCard(): SinglePoolBase {
    //     return null;
    // }
    
    /**
     * 清理
     * */
    public clear(): void {
        super.clear();
        if(this._cardAry)
            this._cardAry.splice(0,this._cardAry.length);
        if(this._poolCard)
            this._poolCard.length=0;
        while(this.node.children.length > 0) {
            // this._poolCard.pop().node.destroy();
            TDHMJ.ins.iclass.getFreePool(this._logicChair).put(this.node.children[0]);
        }
    }
}
