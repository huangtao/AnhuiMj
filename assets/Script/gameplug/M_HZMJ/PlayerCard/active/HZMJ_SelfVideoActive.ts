import HZMJ_SelfActive from "./HZMJ_SelfActive";
import { HZMJ } from "../../ConstDef/HZMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_SelfVideoActive extends HZMJ_SelfActive {


    onLoad() {
        // init logic
        this.init(0);
    }
    /**
     * 玩家胡牌
     * */
    public playerHu(huCard: number): void {
        var lastCard:Array<number> = new Array<number>();
        for(var i:number=0; i<HZMJ.ins.iclass.getSelfHandCardData().length; i++){
            lastCard.push(HZMJ.ins.iclass.getSelfHandCardData()[i]);
        }
        
        if(2 == (lastCard.length % 3)){
            lastCard.pop();
        }
        
        this.showLieCard(lastCard,huCard);
        
    }
}
