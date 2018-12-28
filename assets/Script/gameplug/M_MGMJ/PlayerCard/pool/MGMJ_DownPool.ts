import MGMJ_PoolBase from "./MGMJ_PoolBase";
import { MGMJ } from "../../ConstDef/MGMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MGMJ_DownPool extends MGMJ_PoolBase {


    onLoad() {
        // init logic
        this.init(1);
    }

    /**
     * 刷新牌池牌
     * */
    protected refreshPoolCard(): {x:number,y:number} {
        
        if(this._poolCard.length < 1) {
            return {x:0,y:0};
        }
        
        let columnNum = Math.ceil((this._poolCard.length - 1) / 10) + 1;
        let valueIdx: number = 0;
        let cardIdx: number = this._poolCard.length;
        let lastIdx: number = 0;

        if(MGMJ.ins.iclass.is2D()){
            this.resetZ_2d();
            this.node.rotation = 0;
            let columnNum2d = Math.ceil((this._poolCard.length - 1) / 12) + 1;
            for(let i: number = 0;i < columnNum2d;i++) {
                for(let j: number = 0;j < 12;j++) {
                    if((cardIdx > 0) && (valueIdx < this._cardAry.length)) {
                        --cardIdx;
                        this._poolCard[cardIdx].node.x = 299 + i * 53;
                        this._poolCard[cardIdx].node.y = -145 + j * 30;
                        this._poolCard[cardIdx].showCard(this._cardAry[valueIdx],0);
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
                        this._poolCard[i * 10 + j].showCard(this._cardAry[i * 10 + j],i * 10 + j+1);

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

    private resetZ_2d():void{
        for(let i: number = 0;i < this._poolCard.length;i++){
            this._poolCard[i].node.setLocalZOrder(i+1);
        }
    }

    private resetZ():void{
        for(let i: number = 0;i < this._poolCard.length;i++){
            this._poolCard[i].node.setLocalZOrder(this._poolCard.length-i);
        }
    }
}
