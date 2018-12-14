import BBMJ_ActiveBase from "./BBMJ_ActiveBase";
import { BBMJ } from "../../ConstDef/BBMJMahjongDef";
import { BBMJMahjongAlgorithm1 } from "../../BBMJMahjongAlgorithm/BBMJMahjongAlgorithm1";
import M_BBMJVideoClass from "../../M_BBMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_VideoActiveBase extends BBMJ_ActiveBase {

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
        BBMJMahjongAlgorithm1.sortCardAry(this._handCard);
         if(BBMJ.ins.iclass.isVideo()){
           this._handCard= BBMJMahjongAlgorithm1.sortCardAry1(this._handCard,M_BBMJVideoClass.ins.GetHunCardAry());
       }
       // this._handCard=BBMJMahjongAlgorithm1.sortCardAry1(this._handCard,M_BBMJVideoClass.ins.GetHunCardAry());
        this.scheduleOnce(this.refreshHandCard,0.8);
    }
    
    /**
     * 抓牌墩牌
     * */
    public holdTricksCard(holdIdx: number): number {
        var holdNum =holdIdx;// (3 == holdIdx ? 1 : 4);

        for(var i: number = 0;i < holdNum;i++) {
            this._handCard.push(BBMJ.ins.iclass.getPlayerHandCardData(BBMJ.ins.iclass.logic2physicalChair(this._logicChair))[i]);//[holdIdx * 4 + i]);
        }
        this.handCardChange();

        return holdNum;
    }
    
    
    /**
     * 玩家胡牌
     * */
    public playerHu(huCard: number): void {

        var chair : number = BBMJ.ins.iclass.logic2physicalChair(this._logicChair);
        
        var lastCard: Array<number> = new Array<number>();
        for(var i: number = 0;i < BBMJ.ins.iclass.getPlayerHandCardData(chair).length;i++) {
            lastCard.push(BBMJ.ins.iclass.getPlayerHandCardData(chair)[i]);
        }

        if(2 == (lastCard.length % 3)) {
            lastCard.pop();
        }

        this.showLieCard(lastCard,huCard);
    }
}
