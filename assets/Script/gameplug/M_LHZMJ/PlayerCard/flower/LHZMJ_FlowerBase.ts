import LHZMJ_CardBase from "../single/LHZMJ_CardBase";
import LHZMJ_SingleFlowerBase from "../single/LHZMJ_SingleFlowerBase";
import M_LHZMJClass from "../../M_LHZMJClass";
import { LHZMJ } from "../../ConstDef/LHZMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_FlowerBase extends LHZMJ_CardBase {

    @property(cc.Prefab)
    FlowerType: cc.Prefab=null;


    
    //牌池数据
    protected _flowerCard:Array<LHZMJ_SingleFlowerBase>;
    //牌阵数据
    protected _cardAry:Array<number>;
    

    /**
     * 逻辑椅子号
     * */
    protected _logicChair:number;
    
    

    onLoad() {
        // init logic
        //this.Init();
    }

    /**
     * 初始化
     */
    public init(logicChair: number) {
        this._logicChair= logicChair;
        this._flowerCard = new Array<LHZMJ_SingleFlowerBase>(0);
        this._cardAry = new Array<number>(0);
    }


    /**
     * 添加一个牌池牌
     * */
    public addFlowerCard(card:number):{x:number,y:number}{
        let newnode = LHZMJ.ins.iclass.getFreeFlower(this._logicChair).get();
        if (!cc.isValid(newnode)) {
            newnode = cc.instantiate(this.FlowerType);
        }
        //var newnode=cc.instantiate(this.FlowerType);
        var pool = newnode.getComponent<LHZMJ_SingleFlowerBase>(LHZMJ_SingleFlowerBase);
        pool.init();
        this.node.addChild(newnode);
        this._flowerCard.push(pool);
        //pool.showCard(card);
        this._cardAry.push(card);
        
        // var poolCard : SinglePoolBase = this.createSinglePoolCard();
        // this._flowerCard.push(poolCard);
        
        // this.addChild(poolCard);
        return this.refreshPoolCard();
    }

    /**
     * 恢复牌池(感觉应该是用于断线重连)
     * */
    public recoveryFlowerCard(cardAry:Array<number>):void{
        if((null != cardAry) && (cardAry.length > 0)){
            for(var i:number=0; i<cardAry.length; i++){
                
                this._cardAry.push(cardAry[i]);
                M_LHZMJClass.ins.RecordCard.outACard(cardAry[i]);
                
                let newnode = LHZMJ.ins.iclass.getFreeFlower(this._logicChair).get();
                if (!cc.isValid(newnode)) {
                    newnode = cc.instantiate(this.FlowerType);
                }
                //var newnode=cc.instantiate(this.FlowerType);
                var pool = newnode.getComponent<LHZMJ_SingleFlowerBase>(LHZMJ_SingleFlowerBase);
                pool.init();
                this.node.addChild(newnode);
                this._flowerCard.push(pool);
            }
            
            this.refreshPoolCard();
        }
    }


    /**
     * 获取花牌数量
     */
    public FlowerCardNum():number{
        return this._cardAry.length;
    }
    
    /**
     * 刷新牌池牌(就是给牌摆位置)
     * */
    protected refreshPoolCard(): {x:number,y:number} {
        return {x:0,y:0};
    }

    public ShowAllCard():void{
        if(cc.isValid(this._flowerCard)){
            for(let i=0;i<this._flowerCard.length;i++){
                this._flowerCard[i].node.active=true;
            }
        }
    }


    /**
     * 清理
     * */
    public clear(): void {
        super.clear();
        if(this._cardAry==null){
            return;
        }
        if(this._flowerCard==null){
            return;
        }

        console.log(`===========================================清理了花牌列表==========================================`);

        this._cardAry.splice(0,this._cardAry.length);
        this._flowerCard.length=0;
        while(this.node.children.length > 0) {
            // this._poolCard.pop().node.destroy();
            LHZMJ.ins.iclass.getFreeFlower(this._logicChair).put(this.node.children[0]);
        }
    }

}
