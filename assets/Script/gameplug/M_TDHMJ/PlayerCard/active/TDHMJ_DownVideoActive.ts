import TDHMJ_VideoActiveBase from "./TDHMJ_VideoActiveBase";
import { TDHMJ } from "../../ConstDef/TDHMJMahjongDef";
import M_TDHMJVideoClass from '../../M_TDHMJVideoClass';

const { ccclass, property } = cc._decorator;

@ccclass
export default class TDHMJ_DownVideoActive extends TDHMJ_VideoActiveBase {


    onLoad() {
        // init logic
        super.onLoad();
        this.init(1);
    }

    //
    //摊开状态,y间隔31
    //
    //活动牌起点:x=1099
    //活动牌起点:y:528,415,305,195,85
    private static ArrangeStartPos_lie: Array<number> = [461,405,292,179,71];
    
    private static ArrangeStartPos3D_lie: Array<number> = [-120,-5,110,225,340];
    
    /**
     * 刷新手牌
     * */
    protected refreshHandCard(): void {
        let idx: number = 0;
        if(M_TDHMJVideoClass.ins.is2D()){
            //起始位置
            let startPos: number = TDHMJ_DownVideoActive.ArrangeStartPos_lie[this.fixedCardNum];

            for(var i: number = this._cardData.length;i > 0;i--) {
                this._cardData[i-1].node.setLocalZOrder(i);
                this._cardData[i - 1].node.x = 490;
                this._cardData[i - 1].node.y = 360-(startPos - idx * 32)-45;
                this._cardData[i - 1].showCard(this._handCard[idx],true,0,M_TDHMJVideoClass.ins);

                if(this.isHoldAfter && (i == 1)) {
                    this._cardData[i - 1].node.y += 15;
                }

                ++idx;
            }
        }else{
            let temp=0;
            if(this._cardData.length%3==2){
                temp=0;
            }else{
                temp=1;
            }
            //起始位置
            let startPos: number = TDHMJ_DownVideoActive.ArrangeStartPos3D_lie[this.fixedCardNum];

            for(let i: number = this._cardData.length; i>0; i--){
                this._cardData[i-1].node.setLocalZOrder(this._cardData.length-i+1);
                // this._cardData[i - 1].node.x = 480;
                // this._cardData[i - 1].node.y = startPos + idx * 36.5 -55;
                this._cardData[i - 1].showCard(this._handCard[i-1],true,++temp,M_TDHMJVideoClass.ins);

                // if(this.isHoldAfter && (i == 1)) {
                //     this._cardData[i - 1].node.y += 5;
                // }
                
                ++idx;
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
            this._handCard.push(0x01);
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
    public chiACard(card: number,type:number): void {
        super.chiACard(card,type);
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
