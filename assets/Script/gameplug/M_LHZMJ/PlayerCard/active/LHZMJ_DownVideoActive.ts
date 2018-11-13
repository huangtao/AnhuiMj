import LHZMJ_VideoActiveBase from "./LHZMJ_VideoActiveBase";
import { LHZMJ } from "../../ConstDef/LHZMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_DownVideoActive extends LHZMJ_VideoActiveBase {



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
        if(LHZMJ.ins.iclass.is2D()){
            //起始位置
            let startPos: number = LHZMJ_DownVideoActive.ArrangeStartPos_lie[this.fixedCardNum];

            for(var i: number = this._cardData.length;i > 0;i--) {
                this._cardData[i-1].node.setLocalZOrder(i);
                this._cardData[i - 1].node.x = 490;
                this._cardData[i - 1].node.y = 360-(startPos - idx * 32)-45;
                this._cardData[i - 1].showCard(this._handCard[idx],true,0);

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
            let startPos: number = LHZMJ_DownVideoActive.ArrangeStartPos3D_lie[this.fixedCardNum];

            for(let i: number = this._cardData.length; i>0; i--){
                this._cardData[i-1].node.setLocalZOrder(this._cardData.length-i+1);
                // this._cardData[i - 1].node.x = 480;
                // this._cardData[i - 1].node.y = startPos + idx * 36.5 -55;
                this._cardData[i - 1].showCard(this._handCard[i-1],true,++temp);

                // if(this.isHoldAfter && (i == 1)) {
                //     this._cardData[i - 1].node.y += 5;
                // }
                
                ++idx;
            }
        }
    }

        
}
