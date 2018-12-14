import BBMJ_SelfActive from "./BBMJ_SelfActive";
import { BBMJ } from "../../ConstDef/BBMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_SelfVideoActive extends BBMJ_SelfActive {


    onLoad() {
        // init logic
        this.init(0);
    }
    /**
     * 玩家胡牌
     * */
    public playerHu(huCard: number): void {
        var lastCard:Array<number> = new Array<number>();
        for(var i:number=0; i<BBMJ.ins.iclass.getSelfHandCardData().length; i++){
            lastCard.push(BBMJ.ins.iclass.getSelfHandCardData()[i]);
        }
        
        if(2 == (lastCard.length % 3)){
            lastCard.pop();
        }
        
        this.showLieCard(lastCard,huCard);
        
    }
}
