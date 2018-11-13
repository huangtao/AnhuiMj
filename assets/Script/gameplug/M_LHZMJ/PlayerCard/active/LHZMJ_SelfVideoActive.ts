import LHZMJ_SelfActive from "./LHZMJ_SelfActive";
import { LHZMJ } from "../../ConstDef/LHZMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_SelfVideoActive extends LHZMJ_SelfActive {


    onLoad() {
        // init logic
        this.init(0);
    }
    /**
     * 玩家胡牌
     * */
    public playerHu(huCard: number): void {
        var lastCard:Array<number> = new Array<number>();
        for(var i:number=0; i<LHZMJ.ins.iclass.getSelfHandCardData().length; i++){
            lastCard.push(LHZMJ.ins.iclass.getSelfHandCardData()[i]);
        }
        
        if(2 == (lastCard.length % 3)){
            lastCard.pop();
        }
        
        this.showLieCard(lastCard,huCard);
        
    }
}
