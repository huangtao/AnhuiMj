import LHZMJ_PoolBase from "./LHZMJ_PoolBase";
import { LHZMJ } from "../../ConstDef/LHZMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_DownPool extends LHZMJ_PoolBase {


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
        
        let valueIdx: number = 0;
        let cardIdx: number = this._poolCard.length;
        let lastIdx: number = 0;

        if(LHZMJ.ins.iclass.is2D()){
            this.resetZ_2d();
            this.node.rotation = 0;
            let columnNum2d = Math.ceil((this._poolCard.length - 1) / 12) + 1;
            for(let i: number = 0;i < columnNum2d;i++) {
                for(let j: number = 0;j < 12;j++) {

                    if((cardIdx > 0) && (valueIdx < this._cardAry.length)) {

                        --cardIdx;

                        this._poolCard[cardIdx].node.x = 299 + i * 53;
                        this._poolCard[cardIdx].node.y = -145 + j * 34;
                        this._poolCard[cardIdx].showCard(this._cardAry[valueIdx],0);
                        ++valueIdx;
                        
                    } else {
                        break;
                    }

                }
            }
        }else{
            let columnNum = Math.ceil((this._poolCard.length - 1) / 9) + 1;
            this.resetZ();
            for(let i: number = 0;i < columnNum;i++) {
                for(let j: number = 0;j < 9;j++) {
                    if((i * 9 + j) < this._poolCard.length) {
                        this._poolCard[i * 9 + j].showCard(this._cardAry[i * 9 + j],i * 10 + j+1);

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
        // if(this._poolCard.length <= 8){
        //     for (let i: number = 0; i < this._poolCard.length; i++) {
        //         this._poolCard[i].node.setLocalZOrder(i + 21);
        //     }
        // }else if (this._poolCard.length > 8 && this._poolCard.length <= 20) {
        //     for (let j: number = 0; j < 8; j++) {
        //         this._poolCard[j].node.setLocalZOrder(j + 21);
        //     }
        //     for (let i: number = 8; i < this._poolCard.length; i++) {
        //         this._poolCard[i].node.setLocalZOrder(i + 1);
        //     }
        // }else{
        //     for (let j: number = 0; j < 10; j++) {
        //         this._poolCard[j].node.setLocalZOrder(j + 21);
        //     }
        //     for (let k: number = 10; k < 20; k++) {
        //         this._poolCard[k].node.setLocalZOrder(k + 1);
        //     }
        //     for (let i: number = 20; i < this._poolCard.length; i++) {
        //         this._poolCard[i].node.setLocalZOrder(1 - 19);
        //     }
        // }
    }
}
