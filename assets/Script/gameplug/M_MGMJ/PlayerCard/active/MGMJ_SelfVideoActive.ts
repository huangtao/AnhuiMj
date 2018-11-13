import MGMJ_SelfActive from "./MGMJ_SelfActive";
import { MGMJ } from "../../ConstDef/MGMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MGMJ_SelfVideoActive extends MGMJ_SelfActive {


    onLoad() {
        // init logic
        this.init(0);
    }
    /**
     * 玩家胡牌
     * */
    public playerHu(huCard: number): void {
        var lastCard:Array<number> = new Array<number>();
        for(var i:number=0; i<MGMJ.ins.iclass.getSelfHandCardData().length; i++){
            lastCard.push(MGMJ.ins.iclass.getSelfHandCardData()[i]);
        }
        
        if(2 == (lastCard.length % 3)){
            lastCard.pop();
        }
        
        this.showLieCard(lastCard,huCard);
        
    }
}
