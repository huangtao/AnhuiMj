import { LHZMJMahjongDef } from "../../ConstDef/LHZMJMahjongDef";
import LHZMJ_CardBase from "../single/LHZMJ_CardBase";
import LHZMJ_SingleFlower from "../single/banlanceShow/LHZMJ_SingleFlower";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_BanlanceFlower extends LHZMJ_CardBase {

    @property(cc.Prefab)
    CardType: cc.Prefab=null;

    onLoad() {
        // init logic
        
    }

    /**
     * 排列起始位置
     * 
     * 站立状态,x间隔:74
     * 活动牌起点:y=595
     * 活动牌起点:x:159,270,381,492,603
     * 
     * 
     * 摊开状态,x间隔:74
     * 活动牌起点:y=595
     * 活动牌起点:x:159,270,381,492,603
     * */
    private _arrangeStartPos: Array<number> = [280,435,580,730,880];
    /**
     * 显示牌
     * */
    protected _cardData: Array<LHZMJ_SingleFlower>;
    /**
     * 手牌
     * */
    protected _handCard:Array<number>
    /**
     * 抓到的牌
     * */
    public _holdCard:number;
    /**
     * 定牌数量
     * */
    private _fixedCardNum: number;
    
    public static _freeNode=new cc.NodePool();
    
    public init() {
        this._cardData = new Array<LHZMJ_SingleFlower>(0);
        this._handCard = new Array<number>(0);
        this._holdCard=LHZMJMahjongDef.gInvalidMahjongValue;
        this._fixedCardNum=0;
    }
    
    /**
     * 获取定牌数量
     * */
    public get fixedCardNum():number{
        return this._fixedCardNum;
    }
    
    /**
     * 设置定牌剩余数量
     * */
    public set fixedCardNum(fixedNum:number){
        this._fixedCardNum=fixedNum;
    }
    
    /**
     * 刷新手牌数据
     * */
    public refreshHandCardData(cardAry:Array<number>):void{
        this._handCard.splice(0,this._handCard.length);
        for(var i:number=0; i<cardAry.length; i++){
            this._handCard.push(cardAry[i]);
        }
        
        this.handCardChange();
    }

    /**
     * 刷新手牌
     * */
    protected refreshHandCard(): void {
            //起始位置
        //var startPos: number = this._arrangeStartPos[this.fixedCardNum];
        
        //开始排版
        if(this._cardData.length>10){
        for(var i: number = 0;i < (this._cardData.length-1)/10+1;i++) {
            for(var j: number = 0;j < 10;j++){
                if((i * 10 + j) < this._cardData.length) {
                     this._cardData[i*10+j].node.x = j * 29+350;
            this._cardData[i*10+j].node.y = 14+i*(-37);
            this._cardData[i*10+j].showCard(this._handCard[i*10+j],true);


                }
           
            }
           
            
            // if(this._holdCard != LHZMJMahjongDef.gInvalidMahjongValue && (i == (this._cardData.length - 1))) {
            //     this._cardData[i].node.x += 15;
            // }
        }}else{
            for(var i: number = 0;i < this._cardData.length;i++) {
            this._cardData[i].node.x = i * 29+350;
            this._cardData[i].node.y = -17;
            this._cardData[i].showCard(this._handCard[i],true);
        }
    }

    }

    /**
     * 牌阵变化
     * */
    protected handCardChange(): void {

        

        if(this._handCard.length > this._cardData.length) {//需要增加活动牌

            var newNum = this._handCard.length - this._cardData.length;
            for(var i: number = 0;i < newNum;i++) {
                let newnode = LHZMJ_BanlanceFlower._freeNode.get();
                if (!cc.isValid(newnode)) {
                    newnode = cc.instantiate(this.CardType);
                }
                //var newnode=cc.instantiate(this.CardType);
                this.node.addChild(newnode);
                var active = newnode.getComponent<LHZMJ_SingleFlower>(LHZMJ_SingleFlower);
                active.init();
                this._cardData.push(active);
                newnode.active=true;
            }
            
        } else if(this._handCard.length < this._cardData.length) {//需要删除活动牌

            var delNum = this._cardData.length - this._handCard.length;
            for(var i: number = 0;i < delNum;i++) {
                this._cardData[i].node.destroy();
            }
            this._cardData.splice(0,delNum);
        }
        this.refreshHandCard();
    }

    /**
     * 清理
     * */
    public clear(): void {
        
        super.clear();
        this._cardData.length=0;
        while(this.node.children.length > 0) {
            // this._cardData.pop().node.destroy();
            LHZMJ_BanlanceFlower._freeNode.put(this.node.children[0]);
        }
        this._handCard.splice(0,this._handCard.length);
        this._holdCard = LHZMJMahjongDef.gInvalidMahjongValue;
        this._fixedCardNum = 0;
    }
}
