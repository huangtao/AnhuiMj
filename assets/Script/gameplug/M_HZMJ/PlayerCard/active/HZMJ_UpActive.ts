import HZMJ_OtherActive from "./HZMJ_OtherActive";
import { HZMJ } from "../../ConstDef/HZMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_UpActive extends HZMJ_OtherActive {


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
    private static ArrangeStartPos_stand: Array<number> = [120,161,273,385,497];

    //
    //摊开状态,y间隔31
    //

    //活动牌起点:x=131
    //活动牌起点:y:90,175,285,395,505
    private static ArrangeStartPos_lie: Array<number> = [85,150,270,385,495];
    

    /**
     * 刷新手牌
     * */
    protected refreshHandCard(): void {
        

        if(HZMJ.ins.iclass.is2D()){
            if(this.isLie) {
            //起始位置
            var startPos: number = HZMJ_UpActive.ArrangeStartPos_lie[this.fixedCardNum];

            //开始排版
            for(var i: number = 0;i < this._cardData.length;i++) {
                this._cardData[i].node.setLocalZOrder(i+1);
                this._cardData[i].node.x = -490;
                this._cardData[i].node.y = 360-(startPos + i*32)-30;
                this._cardData[i].showCard(this._handCard[i],this.isLie,0);

                if(this.isHoldAfter && (i == (this._cardData.length - 1))) {
                    this._cardData[i].node.y -= 10;
                }
            }
        } else {
            //起始位置
            var startPos: number = HZMJ_UpActive.ArrangeStartPos_stand[this.fixedCardNum];

            //开始排版
            for(var i: number = 0;i < this._cardData.length;i++) {
                this._cardData[i].node.setLocalZOrder(i+1);
                this._cardData[i].node.x = -490;
                this._cardData[i].node.y = 360-(startPos + i*29)-20;
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
                    this._cardData[i].showCard(this._handCard[i],this.isLie,i+1+this.fixedCardNum*3);

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
