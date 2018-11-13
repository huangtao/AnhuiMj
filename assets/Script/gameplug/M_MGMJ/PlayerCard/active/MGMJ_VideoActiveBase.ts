import MGMJ_ActiveBase from "./MGMJ_ActiveBase";
import { MGMJMahjongAlgorithm } from "../../MGMJMahjongAlgorithm/MGMJMahjongAlgorithm";
import { MGMJ } from "../../ConstDef/MGMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MGMJ_VideoActiveBase extends MGMJ_ActiveBase {

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
        MGMJMahjongAlgorithm.sortCardAry(this._handCard);
        this.scheduleOnce(this.refreshHandCard,0.8);
    }
    
    /**
     * 抓牌墩牌
     * */
    public holdTricksCard(holdIdx: number): number {
        var holdNum =holdIdx;// (3 == holdIdx ? 1 : 4);

        for(var i: number = 0;i < holdNum;i++) {
            this._handCard.push(MGMJ.ins.iclass.getPlayerHandCardData(MGMJ.ins.iclass.logic2physicalChair(this._logicChair))[i]);//[holdIdx * 4 + i]);
        }
        this.handCardChange();

        return holdNum;
    }
    
    
    /**
     * 玩家胡牌
     * */
    public playerHu(huCard: number): void {

        var chair : number = MGMJ.ins.iclass.logic2physicalChair(this._logicChair);
        
        var lastCard: Array<number> = new Array<number>();
        for(var i: number = 0;i < MGMJ.ins.iclass.getPlayerHandCardData(chair).length;i++) {
            lastCard.push(MGMJ.ins.iclass.getPlayerHandCardData(chair)[i]);
        }

        if(2 == (lastCard.length % 3)) {
            lastCard.pop();
        }

        this.showLieCard(lastCard,huCard);
    }
}
