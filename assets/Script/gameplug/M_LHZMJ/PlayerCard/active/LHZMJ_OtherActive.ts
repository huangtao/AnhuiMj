import LHZMJ_ActiveBase from "./LHZMJ_ActiveBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_OtherActive extends LHZMJ_ActiveBase {   

    onLoad() {
        // init logic
        
    }

    /**
     * 刷新手牌数据
     * */
    public refreshHandCardData(cardAry: Array<number>): void {
        for(var i:number=0; i<cardAry.length; i++){
            cardAry[i]=0x01;
        }
        super.refreshHandCardData(cardAry,true);
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
    public holdACard(card: number): void {
        super.holdACard(0x01);
    }

    /**
     * 打出一张牌
     * */
    public outACard(card: number): void {
        super.outACard(0x01);
    }
    
    /**
     * 碰了一张牌
     * */
    public pengACard(card: number): void {
        super.pengACard(0x01);
    }

    /**
     * 明杠了一张牌
     * */
    public MGangACard(card: number): void {
        super.MGangACard(0x01);
    }

    /**
     * 暗杠了一张牌
     * */
    public AGangACard(card: number): void {
        super.AGangACard(0x01);
    }

    /**
     * 补杠了一张牌
     * */
    public BGangACard(card: number): void {
        super.BGangACard(0x01);
    }
}
