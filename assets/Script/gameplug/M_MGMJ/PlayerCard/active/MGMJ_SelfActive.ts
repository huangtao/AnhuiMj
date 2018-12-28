import MGMJ_ActiveBase from "./MGMJ_ActiveBase";
import { MGMJ } from "../../ConstDef/MGMJMahjongDef";
import MGMJEvent from "../../MGMJEvent";
import { MGMJMahjongAlgorithm } from "../../MGMJMahjongAlgorithm/MGMJMahjongAlgorithm";
import MGMJ_SelfSingleActive from "../single/active/MGMJ_SelfSingleActive";
import MGMJ_SingleActiveBase from "../single/MGMJ_SingleActiveBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MGMJ_SelfActive extends MGMJ_ActiveBase {

    onLoad() {
        // init logic
        super.onLoad();
        this.init(0);
        this.node.on(MGMJEvent.MGMJ_EVENT_TYPE,this.onSingleActiveEvent,this);
    }

    /**
     * 排列起始位置
     * 
     * 站立状态,x间隔:74
     * 活动牌起点:y=595
     * 活动牌起点:x:159,270,381,492,603
     * 
     * 
     * 摊开状态,x间隔:74
     * 活动牌起点:y=595
     * 活动牌起点:x:159,270,381,492,603
     * */
    private static ArrangeStartPos: Array<number> = [0,265,495,725,955];

    private static ArrangeStartPos3D: Array<number> = [-595,-330,-82,150,380];
    
    /**
     * 抓牌墩牌
     * */
    public holdTricksCard(holdIdx: number): number {
        var holdNum =holdIdx;// (3 == holdIdx ? 1 : 4);

        for(var i: number = 0;i < holdNum;i++) {
            this._handCard.push(MGMJ.ins.iclass.getSelfHandCardData()[i]);//[holdIdx*4 + i]);
        }
        this.node.active=false;
        this.handCardChange();
        this.node.active=true;
        return holdNum;
    }
    /**
     * 设置起始弹起
     */
    public setSomeCardUp(upCard: Array<number>):void{
        if(null != upCard) {
            for(let i: number = 0;i < upCard.length;i++) {
                for(let j: number = 0;j < this._cardData.length;j++) {
                    if(upCard[i] == this._cardData[j].cardValue) {
                        (<MGMJ_SelfSingleActive>this._cardData[j]).setUp();
                        break;
                    }                      
                }
            }
        }
    }
    public setUpCardDown():void{
        for(let j: number = 0;j < this._cardData.length;j++) {
            (<MGMJ_SelfSingleActive>this._cardData[j]).setDown();
        }
    }
    /**
     * 设置听牌标志牌
     * */
    public showTingCardToken(cardAry: Array<number>): void {
        if((null == cardAry) || (cardAry.length < 1)){
            
            for(var i: number = 0;i < this._cardData.length;i++) {
                (<MGMJ_SelfSingleActive>this._cardData[i]).ifCanTingAfterOutThisCard = false;
            }
            
            return;
        }
        
        for(var i:number=0; i<this._cardData.length; i++){
            for(var j:number=0; j<cardAry.length; j++){
                if(this._cardData[i].cardValue == cardAry[j]){
                    (<MGMJ_SelfSingleActive>this._cardData[i]).ifCanTingAfterOutThisCard=true;
                    break;
                }
            }
        }
    }
    /**
     * 刷新牌阵状态
     * */
    public refreshCardStatus(): void {
            for(var j: number = 0;j < this._cardData.length;j++) {
                (<MGMJ_SelfSingleActive>this._cardData[j]).enable = true;
                (<MGMJ_SelfSingleActive>this._cardData[j]).showCoverBG = false;
            }
    }

    /**
     * 整理手牌
     * */
    public arrangeHandCard(): void {
        //这个发牌的时候 盖一下 不要了 刚好没这个资源
        // for(var i: number = 0;i < this._cardData.length;i++) {
        //     (<MGMJ_SelfSingleActive>this._cardData[i]).showBackCard();
        // }
        
        //延时0.8秒,显示正常手牌
        //this.scheduleOnce(this.arrangeCardComplete,0.5);
        this.arrangeCardComplete();

    }
    
    /**
     * 牌阵整理完毕
     * */
    private arrangeCardComplete():void{
        MGMJMahjongAlgorithm.sortCardAry(this._handCard);
        this.refreshHandCard();
        this.node.dispatchEvent(new MGMJEvent(MGMJEvent.msg_arrangeHandCardComplete)); 
    }
    
    /**
     * 设置活动牌是否可用
     * */
    public activeEnable(enable: boolean): void {
        for(var i:number=0; i<this._cardData.length; i++){
            (<MGMJ_SelfSingleActive>this._cardData[i]).enable =  enable;
            if(!enable){
                (<MGMJ_SelfSingleActive>this._cardData[i]).showCoverBG=false;
            }
        }
    }

    /**
     * 刷新手牌
     * */
    protected refreshHandCard(): void {
        //this.node.active=false;

        //this.node.active=true;
        // for(var i: number = 0;i < this._cardData.length;i++) {
        //     this._cardData[i].node.active=true;
        // }
        if(MGMJ.ins.iclass.is2D()){
            //起始位置
            let startPos: number = MGMJ_SelfActive.ArrangeStartPos[this.fixedCardNum];
            //开始排版

            for(var i: number = 0;i < this._cardData.length;i++) {
                //this._cardData[i].node.setLocalZOrder(i+1);
                this._cardData[i].node.x = startPos + i * 88-590;
                this._cardData[i].node.y = -295;
                // this._cardData[i].node.width = 87;
                // this._cardData[i].node.height = 124;
                let hunpai = MGMJ.ins.iclass.getTableConfig().SetPeiZi;
                this._cardData[i].showCard(this._handCard[i],this.isLie,0,hunpai);

                if(this.isHoldAfter && (i == (this._cardData.length - 1))) {
                    this._cardData[i].node.x += 15;
                    
                    if(!this.isLie && !MGMJ.ins.iclass.isVideo())
                    {(<MGMJ_SelfSingleActive>this._cardData[i]).setUp();}
                }
                if(!this.isHoldAfter && this._cardData.length%3==2 && (i == (this._cardData.length - 1))){//自己碰过之后会右移第一张牌
                    this._cardData[i].node.x += 15;
                }
            }
        }
        else{
            //起始位置
            let startPos: number = MGMJ_SelfActive.ArrangeStartPos3D[this.fixedCardNum];
            //开始排版
            for(let i: number = 0;i < this._cardData.length;i++) {
                //this._cardData[i].node.setLocalZOrder(i+1);
                this.resetZ();
                this._cardData[i].node.x = startPos + i * 90;
                this._cardData[i].node.y = -295;

                if(!this.isHoldAfter && this._cardData.length%3==2 && (i == (this._cardData.length - 1))){//自己碰过之后会右移第一张牌
                    this._cardData[i].node.x += 20;
                }
                //处理宝牌
                let hunpai = MGMJ.ins.iclass.getTableConfig().SetPeiZi;
                this._cardData[i].showCard(this._handCard[i],this.isLie,i+this.fixedCardNum*3+1,hunpai);
                if(this.isHoldAfter && (i == (this._cardData.length - 1))) {
                    this._cardData[i].node.x += 20;
                     
                    if(!this.isLie && !MGMJ.ins.iclass.isVideo())
                    {(<MGMJ_SelfSingleActive>this._cardData[i]).setUp();}
                }
                // cc.log(i+"="+"("+this._cardData[i].node.x+","+this._cardData[i].node.y+")");
            }
        }
    }
    public reflashHandCardForHide():void{

        
        if(MGMJ.ins.iclass.is2D()){
            let startPos: number = MGMJ_SelfActive.ArrangeStartPos[this.fixedCardNum];
            //开始排版
            for(var i: number = 0;i < this._cardData.length;i++) {
            //this._cardData[i].node.setLocalZOrder(i+1);
            this._cardData[i].node.x = startPos + i * 88 - 590;
            this._cardData[i].node.y = -295;

            let hunpai = MGMJ.ins.iclass.getTableConfig().SetPeiZi;
            this._cardData[i].showCard(this._handCard[i],this.isLie,0,hunpai);

            if(this.isHoldAfter && (i == (this._cardData.length - 1))) {
                this._cardData[i].node.x += 15;
            }
            if(!this.isHoldAfter && this._cardData.length%3==2 && (i == (this._cardData.length - 1))){//自己碰过之后会右移第一张牌
                this._cardData[i].node.x += 15;
            }
        }
        }
        else{
            let startPos: number = MGMJ_SelfActive.ArrangeStartPos3D[this.fixedCardNum];
            //开始排版
            for(let i: number = 0;i < this._cardData.length;i++) {
                this.resetZ();
                //this._cardData[i].node.setLocalZOrder(i+1);
                // this._cardData[i].node.x = startPos + i * 95;//87
                // this._cardData[i].node.y = -284-20;
                this._cardData[i].node.x = startPos + i * 90;
                this._cardData[i].node.y = -295;

                if(this.isHoldAfter && (i == (this._cardData.length - 1))) {
                    this._cardData[i].node.x += 20;
                }
                if(!this.isHoldAfter && this._cardData.length%3==2 && (i == (this._cardData.length - 1))){
                    this._cardData[i].node.x += 20;
                }
                let hunpai = MGMJ.ins.iclass.getTableConfig().SetPeiZi;
                this._cardData[i].showCard(this._handCard[i],this.isLie,i+this.fixedCardNum*3+1,hunpai);
            }
        }
    }
    /**
     * 牌阵变化
     * */
    // protected handCardChange(): void {
    //     //cc.log("自己开始创建牌元"+this._handCard.length+" "+this._cardData.length);
    //     if(this._handCard.length > this._cardData.length) {//需要增加活动牌

    //         var newNum = this._handCard.length - this._cardData.length;
    //         for(var i: number = 0;i < newNum;i++) {
    //             var newnode=cc.instantiate(this.CardType);
    //             this.node.addChild(newnode);
    //             //newnode.on(MGMJEvent.MGMJ_EVENT_TYPE,this.onSingleActiveEvent,this);
    //             //this.createSingleActiveCard(newnode);
    //             var active = newnode.getComponent<MGMJ_SingleActiveBase>(MGMJ_SingleActiveBase);
    //             active.init();
    //             this._cardData.push(active);
    //             //newnode.active=true;
    //         }
    //         //cc.log(this._handCard.length+" "+this._cardData.length)
    //     } else if(this._handCard.length < this._cardData.length) {//需要删除活动牌

    //         var delNum = this._cardData.length - this._handCard.length;
    //         for(var i: number = 0;i < delNum;i++) {
    //             this._cardData[i].node.destroy();
    //         }
    //         this._cardData.splice(0,delNum);
    //     }
    //     //cc.log("自己开始创建牌元结束"+this.node.childrenCount);
    //     this.refreshHandCard();
    // }
    
    /**
     * 单个活动牌事件
     * */
    private onSingleActiveEvent(e:MGMJEvent):void{
        
        switch(e.msgCode){
            case MGMJEvent.msg_reflashHandCard:{
                e.stopPropagation();
                ////cc.log("自己刷新！");
                this.refreshHandCard();
                break;
            }
            case MGMJEvent.msg_outACard:{

                let outindex=0;
                for(let i=0;i<this._cardData.length;i++){
                    if(!this._cardData[i].IsValidValue())
                    {
                        outindex=i;
                    }
                }
                ////cc.log("出了第"+outindex+"张牌");
                this.OutCardAfter(outindex);
                this.DelNullData();  
                // let str="出牌后牌序";
                // for(let i=0;i<this._cardData.length;i++){
                //     str+=" "+this._cardData[i].cardValue;
                // }
                // //cc.log(str);
            }

        }
    }

    /**
     * 创建一个新的活动牌
     * */
    protected createSingleActiveCard(p:cc.Node): void {
        //p.on(MGMJEvent.MGMJ_EVENT_TYPE,this.onSingleActiveEvent,this);
    }
    
    /**
     * 清理
     * */
    public clear(): void {
        
        // for(var i:number=0; i<this._cardData.length; i++){
        //     this._cardData[i].clear();
        //     this._cardData[i].node.destroy();
        // }
        super.clear();
    }
    /**
     * 出牌之后一系列的牌阵变化_cardData,_handCard都要变
     */
    private OutCardAfter(outindex:number):void{
        //MGMJMahjongAlgorithm.delCard(this._handCard,[card]);
        // //cc.log("位序调整");
        // let str1="";
        let newCardAry=new Array<number>();
        for(let i=0;i<this._handCard.length;i++){
            if(i!=outindex)
            {   
                newCardAry.push(this._handCard[i]);
            }
            else{
                newCardAry.push(0);
            }
            //str1+=" "+newCardAry[i];
        }//如果有抓牌，那么抓牌在最后
        // //cc.log(str1);str1="";
        // for(let i=0;i<this._cardData.length;i++){
        //     str1+=" "+this._cardData[i].cardValue;
        // }
        // //cc.log(str1);
        let tempCard:MGMJ_SingleActiveBase;

        //_handCard不能动，这要等服务端发消息过来，由Class改动
        //分有没有抓牌两种情况
        if(this.isHoldAfter){
            let last:number=newCardAry.length-1;
            if(outindex==this._handCard.length-1)//出抓牌
            {
                //什么都不做，等DelNullData
            }
            else{
                //不出抓牌,抓牌要放到什么位置，后面的牌要移动，这里要用newCardAry计算，具体计算根据sort写
                if(newCardAry[last]==this._handCard[outindex]){
                    //抓牌和打牌实际值相同
                    // this._cardData[newCardAry.length-1].node.x=this._cardData[outindex].node.x;
                    // this._cardData[newCardAry.length-1].node.y=this._cardData[outindex].node.y;
                    tempCard = this._cardData[outindex];
                    this._cardData[outindex] = this._cardData[last];
                    this._cardData[last] = tempCard;
                }
                else if(newCardAry[last]>this._handCard[outindex]){
                    tempCard = this._cardData[outindex];
                    this._cardData[outindex] = this._cardData[last];
                    this._cardData[last] = tempCard;
                    for(let k=outindex;k<last-1;k++){
                        if(this._cardData[k].cardValue>this._cardData[k+1].cardValue)
                        {
                            tempCard = this._cardData[k];
                            this._cardData[k] = this._cardData[k+1];
                            this._cardData[k+1] = tempCard;
                        }
                    }
                }
                else if(newCardAry[last]<this._handCard[outindex]){
                    tempCard = this._cardData[outindex];
                    this._cardData[outindex] = this._cardData[last];
                    this._cardData[last] = tempCard;
                    for(let k=outindex;k>0;k--){
                        if(this._cardData[k].cardValue<this._cardData[k-1].cardValue)
                        {
                            tempCard = this._cardData[k];
                            this._cardData[k] = this._cardData[k-1];
                            this._cardData[k-1] = tempCard;
                        }
                    }
                }
            }
        }
        else{
            //没抓牌,从打的那张开始，移动后面的牌
            // for(let j=this._cardData.length-1;j>outindex;j++)
            // {
            //     this._cardData[j].node.x=this._cardData[j-1].node.x;
            //     this._cardData[j].node.y=this._cardData[j-1].node.y;
            // }
            ////cc.log("换位置");
            for(let j=outindex;j<this._cardData.length-1;j++){
                tempCard = this._cardData[j];
                this._cardData[j] = this._cardData[j+1];
                this._cardData[j+1] = tempCard;
            }
        }

    }
    private resetZ():void{
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
