import HQMJ_OtherActive from "./HQMJ_OtherActive";
import { HQMJ } from "../../ConstDef/HQMJMahjongDef";
import M_HQMJVideoClass from "../../M_HQMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HQMJ_UpActive extends HQMJ_OtherActive {


    onLoad() {
        // init logic
        super.onLoad();
        this.init(3);
    }

    //
    //站立状态,y间隔26
    //

    //活动牌起点:x=150
    //活动牌起点:y:121,180,290,400,510
    private static ArrangeStartPos_stand: Array<number> = [0,39,156,273,390];

    //
    //摊开状态,y间隔31
    //

    //活动牌起点:x=131
    //活动牌起点:y:90,175,285,395,505
    private static ArrangeStartPos_lie: Array<number> = [0,67,184,301,418];
    

    /**
     * 刷新手牌
     * */
    protected refreshHandCard(): void {
        
        if(HQMJ.ins.iclass.is2D()){
            if(this.isLie) {
            //起始位置
            var startPos: number = HQMJ_UpActive.ArrangeStartPos_lie[this.fixedCardNum];

            //开始排版
            for(var i: number = 0;i < this._cardData.length;i++) {
                this._cardData[i].node.setLocalZOrder(i+1);
                this._cardData[i].node.x = -478;
                this._cardData[i].node.y = 215-(startPos + i*33);
                this._cardData[i].showCard(this._handCard[i],this.isLie,0);

                if(this.isHoldAfter && (i == (this._cardData.length - 1))) {
                    this._cardData[i].node.y -= 10;
                }
            }
        } else {
            //起始位置
            var startPos: number = HQMJ_UpActive.ArrangeStartPos_stand[this.fixedCardNum];

            //开始排版
            for(var i: number = 0;i < this._cardData.length;i++) {
                this._cardData[i].node.setLocalZOrder(i+1);
                 this._cardData[i].node.x = -510;
                this._cardData[i].node.y = 178-(startPos + i*25); 
                this._cardData[i].showCard(this._handCard[i],this.isLie,0);

                if(this.isHoldAfter && (i == (this._cardData.length - 1))) {
                    this._cardData[i].node.y -= 10;
                }
            }
        }
        }else{
            if(this.isLie){
                for(let i: number = 0;i < this._cardData.length;i++){
                    this._cardData[i].node.setLocalZOrder(i+1);
                    // this._cardData[i - 1].node.x = 480;
                    // this._cardData[i - 1].node.y = startPos + idx * 36.5 -55;
                    this._cardData[i].showCard(this._handCard[i],this.isLie,i+1+this.fixedCardNum*3);

                    // if(this.isHoldAfter && (i == 1)) {
                    //     this._cardData[i - 1].node.y += 5;
                    // }
                    
       
                }
            }else{
                for(let i: number = 0;i < this._cardData.length;i++){
                    this._cardData[i].node.setLocalZOrder(i+1);
                    // this._cardData[i - 1].node.x = 480;
                    // this._cardData[i - 1].node.y = startPos + idx * 32 -60;
                    // if(_hqmj == HQMJ.ins.iclass)
                        this._cardData[i].showCard(this._handCard[i],this.isLie,i+1+this.fixedCardNum*3);
                    // else
                        // this._cardData[i].showCard(this._handCard[i],true,i+1+this.fixedCardNum*3);

                    // if(this.isHoldAfter && (i == 1)) {
                    //     this._cardData[i - 1].node.y += 10;
                    // }
                }
            }
        }
    }

    // /**
    //  * 创建一个新的活动牌
    //  * */
    // protected createSingleActiveCard(): SingleActiveBase {
    //     return new UpSingleActive();
    // }

}
