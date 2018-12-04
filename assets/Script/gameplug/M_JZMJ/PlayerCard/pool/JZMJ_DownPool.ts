import JZMJ_PoolBase from "./JZMJ_PoolBase";
import { JZMJ } from "../../ConstDef/JZMJMahjongDef";
import M_JZMJVideoClass from "../../M_JZMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class JZMJ_DownPool extends JZMJ_PoolBase {


    onLoad() {
        // init logic
        this.init(1);
    }

    /**
     * 刷新牌池牌
     * */
    protected refreshPoolCard(_JZMJclass): {x:number,y:number} {
        
        if(this._poolCard.length < 1) {
            return {x:0,y:0};
        }
        
        let columnNum = Math.ceil((this._poolCard.length - 1) / 10) + 1;
        let valueIdx: number = 0;
        let cardIdx: number = this._poolCard.length;
        let lastIdx: number = 0;
        if(_JZMJclass.is2D()){
            for(let i: number = 0;i < columnNum;i++) {
                for(let j: number = 0;j < 10;j++) {

                    if((cardIdx > 0) && (valueIdx < this._cardAry.length)) {

                        --cardIdx;

                        this._poolCard[cardIdx].node.x = 280 + i * 50.5;
                        this._poolCard[cardIdx].node.y = -122.5 + j * 31.5+4;
                        this._poolCard[cardIdx].showCard(this._cardAry[valueIdx],0,_JZMJclass);
                        ++valueIdx;
                        
                    } else {
                        break;
                    }

                }
            }
        }else{
            //this.resetZ();
            for(let i: number = 0;i < columnNum;i++) {
                for(let j: number = 0;j < 10;j++) {
                    if((i * 10 + j) < this._poolCard.length) {
                        this._poolCard[i * 10 + j].showCard(this._cardAry[i * 10 + j],i * 10 + j+1,_JZMJclass);

                    } else {
                        break;
                    }

                }
            }
            lastIdx=this._poolCard.length - 1;
        }
        
        let rx: number = this._poolCard[lastIdx].node.x ;
        let ry: number = this._poolCard[lastIdx].node.y+ this._poolCard[lastIdx].size.height / 2;
        return { x: rx,y: ry };
    }

    private resetZ():void{
        for(let i: number = 0;i < this._poolCard.length;i++){
            this._poolCard[i].node.setLocalZOrder(this._poolCard.length-i);
        }
    }
}
