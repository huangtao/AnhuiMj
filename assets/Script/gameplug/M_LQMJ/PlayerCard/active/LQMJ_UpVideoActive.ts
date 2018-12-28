import LQMJ_VideoActiveBase from "./LQMJ_VideoActiveBase";
import { LQMJ } from "../../ConstDef/LQMJMahjongDef";
import M_LQMJVideoClass from '../../M_LQMJVideoClass';

const { ccclass, property } = cc._decorator;

@ccclass
export default class LQMJ_UpVideoActive extends LQMJ_VideoActiveBase {



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
        var startPos: number = LQMJ_UpVideoActive.ArrangeStartPos_lie[this.fixedCardNum];

        //开始排版
        
        if(M_LQMJVideoClass.ins.is2D()){
            //起始位置
            let startPos: number = LQMJ_UpVideoActive.ArrangeStartPos_lie[this.fixedCardNum];

            //开始排版
            for(var i: number = 0;i < this._cardData.length;i++) {
                this._cardData[i].node.setLocalZOrder(i+1);
                this._cardData[i].node.x = -490;
                this._cardData[i].node.y = 360-(startPos + i*32)-30;;
                this._cardData[i].showCard(this._handCard[i],true,0,M_LQMJVideoClass.ins);

                if(this.isHoldAfter && (i == (this._cardData.length - 1))) {
                    this._cardData[i].node.y -= 15;
                }
            }
        }else{
            for(let i: number = 0;i < this._cardData.length;i++){
                this._cardData[i].node.setLocalZOrder(i+1);
                // this._cardData[i - 1].node.x = 480;
                // this._cardData[i - 1].node.y = startPos + idx * 36.5 -55;
                this._cardData[i].showCard(this._handCard[i],true,i+1+this.fixedCardNum*3,M_LQMJVideoClass.ins);

                // if(this.isHoldAfter && (i == 1)) {
                //     this._cardData[i - 1].node.y += 5;
                // }
                
    
            }
        }
    }

    /**
     * 刷新手牌数据
     * */
    public refreshHandCardData(cardAry: Array<number>): void {
        // for(var i:number=0; i<cardAry.length; i++){
        //     cardAry[i]=0x01;
        // }
        super.refreshHandCardData(cardAry);
    }
    
    /**
     * 抓牌墩牌
     * */
    public holdTricksCard(holdIdx: number): number {
        
        //4+4+4+1
        var holdNum =holdIdx;// (3 == holdIdx ? 1 : 4);

        for(var i: number = 0;i < holdNum;i++) {
            this._handCard.push(M_LQMJVideoClass.ins.getSelfHandCardData()[i]);
        }

        this.handCardChange();
        
        return holdNum;
    }

    /**
     * 抓到一张牌
     * */
    public holdACard(card: number,_lqmj): void {
        super.holdACard(card,_lqmj);
    }

    /**
     * 打出一张牌
     * */
    public outACard(card: number,_lqmj): void {
        super.outACard(card,_lqmj);
    }

     /**
     * 吃了一张牌
     * */
    public chiACard(card: number,type:number,_lqmj): void {
        super.chiACard(card,type,_lqmj);
    }
    
    /**
     * 碰了一张牌
     * */
    public pengACard(card: number,_lqmj): void {
        super.pengACard(card,_lqmj);
    }

    /**
     * 明杠了一张牌
     * */
    public MGangACard(card: number,_lqmj): void {
        super.MGangACard(card,_lqmj);
    }

    /**
     * 暗杠了一张牌
     * */
    public AGangACard(card: number,_lqmj): void {
        super.AGangACard(card,_lqmj);
    }

    /**
     * 补杠了一张牌
     * */
    public BGangACard(card: number,_lqmj): void {
        super.BGangACard(card,_lqmj);
    }

}
