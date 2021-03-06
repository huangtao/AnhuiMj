import TDHMJ_OtherActive from "./TDHMJ_OtherActive";
import { TDHMJ } from "../../ConstDef/TDHMJMahjongDef";
import M_TDHMJVideoClass from "../../M_TDHMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TDHMJ_OppoActive extends TDHMJ_OtherActive {


    onLoad() {
        // init logic
        super.onLoad();
        this.init(2);
    }

    //
        //站立状态,x间隔38
        //
        //活动牌起点:y=30
        //活动牌起点:x:847,733,619,505,391
        private static ArrangeStartPos_stand: Array<number> = [892,785,675,550,425];

        //
        //摊开状态,x间隔38
        //
        //活动牌起点:y=36
        //活动牌起点:x:847,733,619,505,391
        private static ArrangeStartPos_lie: Array<number> = [892,785,675,550,425];

        private static ArrangeStartPos3D_stand: Array<number> = [260,140,20,-100,-240+50];
        //
        //摊开状态,x间隔38
        //
        //活动牌起点:y=36
        //活动牌起点:x:847,733,619,505,391
        private static ArrangeStartPos3D_lie: Array<number> =  [310,185,45,-95,-235];

        /**
         * 刷新手牌
         * */
        protected refreshHandCard(): void {
        if(TDHMJ.ins.iclass.is2D()){
            if(this.isLie) {
                //起始位置private static ArrangeStartPos_stand: Array<number> = [892,785,675,550,425];
                var startPos: number = TDHMJ_OppoActive.ArrangeStartPos_lie[this.fixedCardNum];
                //开始排版
                for(var i: number = 0;i < this._cardData.length;i++) {
                    this._cardData[i].node.setLocalZOrder(i+1);
                    this._cardData[i].node.x = startPos - i * 42-640-18;
                    this._cardData[i].node.y = 309;
                    this._cardData[i].showCard(this._handCard[i],this.isLie,0);

                    if(this.isHoldAfter && (i == (this._cardData.length - 1))) {
                        this._cardData[i].node.x -= 10;
                    }
                }
            } else {
                //起始位置
                var startPos: number = TDHMJ_OppoActive.ArrangeStartPos_stand[this.fixedCardNum];
                //开始排版
                for(var i: number = 0;i < this._cardData.length;i++) {
                    this._cardData[i].node.setLocalZOrder(i+1);
                    this._cardData[i].node.x = startPos - i * 37-640-18;
                    this._cardData[i].node.y = 309;
                    this._cardData[i].showCard(this._handCard[i],this.isLie,0);
                    if(this.isHoldAfter && (i == (this._cardData.length - 1))) {
                        this._cardData[i].node.x -= 10;
                    }
                    if(!this.isHoldAfter && this._cardData.length%3==2 && (i == (this._cardData.length - 1))){//碰过之后会右移第一张牌
                        this._cardData[i].node.x -= 10;
                    }
                }
            }
        }else{
            let temp=0;
            if(this._cardData.length%3==2){
                temp=14-this._cardData.length;
            }else{
                temp=13-this._cardData.length;
            }
            if(this.isLie) {
            //起始位置
                let startPos: number = TDHMJ_OppoActive.ArrangeStartPos3D_lie[this.fixedCardNum];
                //this.resetZ();
                
                //开始排版
                for(let i: number = 0;i < this._cardData.length;i++) {
                    // this._cardData[i].node.setLocalZOrder(i+1);
                    // this._cardData[i].node.x = startPos - i * 44;
                    // this._cardData[i].node.y = 280;
                    this._cardData[i].showCard(this._handCard[i],this.isLie,i+temp+1);

                    // if(this.isHoldAfter && (i == (this._cardData.length - 1))) {
                    //     this._cardData[i].node.x -= 15;
                    // }
                }
            } else {
                //起始位置
                let startPos: number = TDHMJ_OppoActive.ArrangeStartPos3D_stand[this.fixedCardNum];
                
                //开始排版
                for(let i: number = 0;i < this._cardData.length;i++) {
                   // this._cardData[i].node.setLocalZOrder(15-i);
                    this._cardData[i].node.x = startPos - i * 36-20;
                    this._cardData[i].node.y = 315;
                    // if(_lqmj == TDHMJ.ins.iclass)
                        this._cardData[i].showCard(this._handCard[i],this.isLie,i+temp+1);
                    // else
                        // this._cardData[i].showCard(this._handCard[i],true,i+temp+1);

                    if(this.isHoldAfter && (i == (this._cardData.length - 1))) {
                        this._cardData[i].node.x -= 15;
                    }
                     if(!this.isHoldAfter && this._cardData.length%3==2 && (i == (this._cardData.length - 1))){//碰过之后会右移第一张牌
                        this._cardData[i].node.x -= 15;
                    }
                    if(this._cardData.length == 2){
                        this._cardData[0].node.x -= 10;
                        this._cardData[1].node.x -= 10;
                    }
                    if(this._cardData.length == 1){
                        this._cardData[0].node.x -= 20;
                    }
                }
            }
        }
    }

    private resetZ(){
        if(this._cardData.length<=7){
            for(let i: number = 0;i < this._cardData.length;i++){
                this._cardData[i].node.setLocalZOrder(this._cardData.length-i);
            }
        }else{
            let x=this._cardData.length-7;    
            for(let i: number = 0;i < x;i++){
                this._cardData[i].node.setLocalZOrder(i);
            }
            for(let i: number = x;i < this._cardData.length;i++){
                this._cardData[i].node.setLocalZOrder(this._cardData.length-i);
            }
            
        }
    }
}
