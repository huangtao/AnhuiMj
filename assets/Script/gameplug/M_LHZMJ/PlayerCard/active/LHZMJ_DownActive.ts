import LHZMJ_OtherActive from "./LHZMJ_OtherActive";
import { LHZMJ } from "../../ConstDef/LHZMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_DownActive extends LHZMJ_OtherActive {


    onLoad() {
        // init logic
        super.onLoad();
        this.init(1);
    }

    //
    //站立状态,y间隔26
    //
    //活动牌起点:x=1126
    //活动牌起点:y:468,415,305,195,85
    private static ArrangeStartPos_stand: Array<number> = [482,411,294,177,60];
    
    //
    //摊开状态,y间隔31
    //
    //活动牌起点:x=1099
    //活动牌起点:y:528,415,305,195,85
    private static ArrangeStartPos_lie: Array<number> = [505,420,300,183,66];

    private static ArrangeStartPos3D_stand: Array<number> = [-120,-5,110,225,340];

    private static ArrangeStartPos3D_lie: Array<number> = [-120,-5,110,225,340];

    protected refreshHandCard(): void {
        
        let idx : number=0;
        if(LHZMJ.ins.iclass.is2D()){
            this.node.x = 0;
            this.node.rotation = 0;
            if(this.isLie){
            //起始位置
            var startPos: number = LHZMJ_DownActive.ArrangeStartPos_lie[this.fixedCardNum];

            for(var i: number = this._cardData.length; i>0; i--){
                this._cardData[i-1].node.setLocalZOrder(i);
                this._cardData[i - 1].node.x = 478;
                this._cardData[i - 1].node.y = 360-(startPos - idx * 33);
                this._cardData[i - 1].showCard(this._handCard[idx],this.isLie,0);

                if(this.isHoldAfter && (i == 1)) {
                    this._cardData[i - 1].node.y += 10;
                }
                
                ++idx;
            }
            }else{
            //起始位置
            var startPos: number = LHZMJ_DownActive.ArrangeStartPos_stand[this.fixedCardNum];

            for(var i: number = this._cardData.length;i > 0;i--) {
                this._cardData[i-1].node.setLocalZOrder(i);
                this._cardData[i - 1].node.x = 510;
                this._cardData[i - 1].node.y = 360-(startPos - idx * 25);//屋顶拍，-145开始
                this._cardData[i - 1].showCard(this._handCard[idx],this.isLie,0);

                if(this.isHoldAfter && (i == 1)) {
                    this._cardData[i - 1].node.y += 10;
                }

                ++idx;
            }
            
            }
        }else{
            let temp=0;
            if(this._cardData.length%3==2){
                temp=0;
            }else{
                temp=1;
            }
            if(this.isLie){
                //起始位置
                let startPos: number = LHZMJ_DownActive.ArrangeStartPos3D_lie[this.fixedCardNum];

                for(let i: number = this._cardData.length; i>0; i--){
                    this._cardData[i-1].node.setLocalZOrder(this._cardData.length-i+1);
                    // this._cardData[i - 1].node.x = 480;
                    // this._cardData[i - 1].node.y = startPos + idx * 36.5 -55;
                    this._cardData[i - 1].showCard(this._handCard[i-1],this.isLie,++temp);

                    // if(this.isHoldAfter && (i == 1)) {
                    //     this._cardData[i - 1].node.y += 5;
                    // }
                    
                    ++idx;
                }
            }else{
                //起始位置
                let startPos: number = LHZMJ_DownActive.ArrangeStartPos3D_stand[this.fixedCardNum];

                for(let i: number = this._cardData.length;i > 0;i--) {
                    this._cardData[i-1].node.setLocalZOrder(this._cardData.length-i+1);
                    // this._cardData[i - 1].node.x = 450;
                    // this._cardData[i - 1].node.y = startPos + idx * 32 -60;
                    
                    this._cardData[i - 1].showCard(this._handCard[i-1],this.isLie,++temp);

                    // if(this.isHoldAfter && (i == 1)) {
                    //     this._cardData[i - 1].node.y += 10;
                    // }

                    ++idx;
                }
            }
        }
        
    }

    // /**
    //  * 创建一个新的活动牌
    //  * */
    // protected createSingleActiveCard(p:cc.Node): void {
    //     //p.on(LHZMJEvent.LHZMJ_EVENT_TYPE,this.onSingleActiveEvent,this);
    // }
}
