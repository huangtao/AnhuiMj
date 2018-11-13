import HZMJ_ActiveBase from "./HZMJ_ActiveBase";
import { HZMJMahjongAlgorithm } from "../../HZMJMahjongAlgorithm/HZMJMahjongAlgorithm";
import { HZMJ } from "../../ConstDef/HZMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_VideoActiveBase extends HZMJ_ActiveBase {

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
        HZMJMahjongAlgorithm.sortCardAry(this._handCard);
        this.scheduleOnce(this.refreshHandCard,0.8);
    }
    
    /**
     * 抓牌墩牌
     * */
    public holdTricksCard(holdIdx: number): number {
        var holdNum =holdIdx;// (3 == holdIdx ? 1 : 4);

        for(var i: number = 0;i < holdNum;i++) {
            this._handCard.push(HZMJ.ins.iclass.getPlayerHandCardData(HZMJ.ins.iclass.logic2physicalChair(this._logicChair))[i]);//[holdIdx * 4 + i]);
        }
        this.handCardChange();

        return holdNum;
    }
    
    
    /**
     * 玩家胡牌
     * */
    public playerHu(huCard: number): void {

        var chair : number = HZMJ.ins.iclass.logic2physicalChair(this._logicChair);
        
        var lastCard: Array<number> = new Array<number>();
        for(var i: number = 0;i < HZMJ.ins.iclass.getPlayerHandCardData(chair).length;i++) {
            lastCard.push(HZMJ.ins.iclass.getPlayerHandCardData(chair)[i]);
        }

        if(2 == (lastCard.length % 3)) {
            lastCard.pop();
        }

        this.showLieCard(lastCard,huCard);
    }
}
