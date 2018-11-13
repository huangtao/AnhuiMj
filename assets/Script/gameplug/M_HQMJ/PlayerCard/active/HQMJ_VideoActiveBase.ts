import HQMJ_ActiveBase from "./HQMJ_ActiveBase";
import { HQMJMahjongAlgorithm } from "../../HQMJMahjongAlgorithm/HQMJMahjongAlgorithm";
import { HQMJ } from "../../ConstDef/HQMJMahjongDef";
import M_HQMJVideoClass from '../../M_HQMJVideoClass';
import HQMJ_SingleActiveBase from "../single/HQMJ_SingleActiveBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HQMJ_VideoActiveBase extends HQMJ_ActiveBase {

    onLoad() {
        // init logic
        
    }

    public init(logicChair: number) {
        super.init(logicChair);

    }
    
    /**
     * 整理手牌
     * */
    public arrangeHandCard(): void {
        HQMJMahjongAlgorithm.sortCardAry(this._handCard);
        this.scheduleOnce(this.refreshHandCard,0.8);
    }
    
    /**
     * 抓牌墩牌
     * */
    public holdTricksCard(holdIdx: number): number {
        // var holdNum =holdIdx;// (3 == holdIdx ? 1 : 4);

        // for(var i: number = 0;i < holdNum;i++) {
        //     this._handCard.push(M_HQMJVideoClass.ins.getPlayerHandCardData(M_HQMJVideoClass.ins.logic2physicalChair(this._logicChair))[i]);//[holdIdx * 4 + i]);
        // }
        // this.handCardChange(M_HQMJVideoClass.ins);

        // return holdNum;
        return 0;
    }
    
    
    /**
     * 玩家胡牌
     * */
    public playerHu(huCard: number): void {

        var chair : number = M_HQMJVideoClass.ins.logic2physicalChair(this._logicChair);
        
        var lastCard: Array<number> = new Array<number>();
        for(var i: number = 0;i < M_HQMJVideoClass.ins.getPlayerHandCardData(chair).length;i++) {
            lastCard.push(M_HQMJVideoClass.ins.getPlayerHandCardData(chair)[i]);
        }

        if(2 == (lastCard.length % 3)) {
            lastCard.pop();
        }

        this.showLieCard(lastCard,huCard);
    }

    protected handCardChange(): void {
        ////cc.log("开始创建牌元"+this._handCard.length+" "+this._cardData.length);
        if(this._handCard.length > this._cardData.length) {//需要增加活动牌

            let newNum = this._handCard.length - this._cardData.length;
            for(let i: number = 0;i < newNum;i++) {
                let newnode = M_HQMJVideoClass.ins.getFreeActive(this._logicChair).get();
                if (!cc.isValid(newnode)) {
                    newnode = cc.instantiate(this.CardType);
                }
                // let newnode=cc.instantiate(this.CardType);
        
                // this.createSingleActiveCard(newnode);
                let active = newnode.getComponent<HQMJ_SingleActiveBase>(HQMJ_SingleActiveBase);
                active.init();
             
                this.node.addChild(newnode);
                this._cardData.push(active);
                //newnode.active=true;
            }

        } else if(this._handCard.length < this._cardData.length) {//需要删除活动牌

            let delNum = this._cardData.length - this._handCard.length;
            for(let i: number = 0;i < delNum;i++) {
                // this._cardData[i].node.destroy();
                M_HQMJVideoClass.ins.getFreeActive(this._logicChair).put(this._cardData[i].node);
            }
            this._cardData.splice(0,delNum);
        }
        ////cc.log("开始创建牌元结束"+this.node.childrenCount);
        this.refreshHandCard();
    }

    
    
}
