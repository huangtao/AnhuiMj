import MGMJ_VideoActiveBase from "./MGMJ_VideoActiveBase";
import { MGMJ } from "../../ConstDef/MGMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MGMJ_UpVideoActive extends MGMJ_VideoActiveBase {



    onLoad() {
        // init logic
        super.onLoad();
        this.init(3);
    }

    //
    //摊开状态,y间隔31
    //

    //活动牌起点:x=131
    //活动牌起点:y:90,175,285,395,505
    private static ArrangeStartPos_lie: Array<number> =[85,150,270,385,495];
    
    
    /**
     * 刷新手牌
     * */
    protected refreshHandCard(): void {
        //起始位置
        var startPos: number = MGMJ_UpVideoActive.ArrangeStartPos_lie[this.fixedCardNum];

        //开始排版
        
        if(MGMJ.ins.iclass.is2D()){
            //起始位置
            let startPos: number = MGMJ_UpVideoActive.ArrangeStartPos_lie[this.fixedCardNum];

            //开始排版
            for(var i: number = 0;i < this._cardData.length;i++) {
                this._cardData[i].node.setLocalZOrder(i+1);
                this._cardData[i].node.x = -490;
                this._cardData[i].node.y = 360-(startPos + i*32)-30;;
                this._cardData[i].showCard(this._handCard[i],true,0);

                if(this.isHoldAfter && (i == (this._cardData.length - 1))) {
                    this._cardData[i].node.y -= 15;
                }
            }
        }else{
            for(let i: number = 0;i < this._cardData.length;i++){
                this._cardData[i].node.setLocalZOrder(i+1);
                // this._cardData[i - 1].node.x = 480;
                // this._cardData[i - 1].node.y = startPos + idx * 36.5 -55;
                this._cardData[i].showCard(this._handCard[i],true,i+1+this.fixedCardNum*3);

                // if(this.isHoldAfter && (i == 1)) {
                //     this._cardData[i - 1].node.y += 5;
                // }
                
    
            }
        }
    }
}
