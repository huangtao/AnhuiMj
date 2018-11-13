import LHZMJ_ActiveBase from "./LHZMJ_ActiveBase";
import { LHZMJ } from "../../ConstDef/LHZMJMahjongDef";
import { LHZMJMahjongAlgorithm1 } from "../../LHZMJMahjongAlgorithm/LHZMJMahjongAlgorithm1";
import M_LHZMJVideoClass from "../../M_LHZMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_VideoActiveBase extends LHZMJ_ActiveBase {

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
        LHZMJMahjongAlgorithm1.sortCardAry(this._handCard);
         if(LHZMJ.ins.iclass.isVideo()){
           this._handCard= LHZMJMahjongAlgorithm1.sortCardAry1(this._handCard,M_LHZMJVideoClass.ins.GetHunCardAry());
       }
       // this._handCard=LHZMJMahjongAlgorithm1.sortCardAry1(this._handCard,M_LHZMJVideoClass.ins.GetHunCardAry());
        this.scheduleOnce(this.refreshHandCard,0.8);
    }
    
    /**
     * 抓牌墩牌
     * */
    public holdTricksCard(holdIdx: number): number {
        var holdNum =holdIdx;// (3 == holdIdx ? 1 : 4);

        for(var i: number = 0;i < holdNum;i++) {
            this._handCard.push(LHZMJ.ins.iclass.getPlayerHandCardData(LHZMJ.ins.iclass.logic2physicalChair(this._logicChair))[i]);//[holdIdx * 4 + i]);
        }
        this.handCardChange();

        return holdNum;
    }
    
    
    /**
     * 玩家胡牌
     * */
    public playerHu(huCard: number): void {

        var chair : number = LHZMJ.ins.iclass.logic2physicalChair(this._logicChair);
        
        var lastCard: Array<number> = new Array<number>();
        for(var i: number = 0;i < LHZMJ.ins.iclass.getPlayerHandCardData(chair).length;i++) {
            lastCard.push(LHZMJ.ins.iclass.getPlayerHandCardData(chair)[i]);
        }

        if(2 == (lastCard.length % 3)) {
            lastCard.pop();
        }

        this.showLieCard(lastCard,huCard);
    }
}
