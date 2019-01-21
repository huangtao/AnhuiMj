import LQMJ_CardBase from "../single/LQMJ_CardBase";

import { LQMJMahjongDef, LQMJ } from "../../ConstDef/LQMJMahjongDef";
import { LQMJMahjongAlgorithm } from "../../LQMJMahjongAlgorithm/LQMJMahjongAlgorithm";
import LQMJ_SingleActiveBase from "../single/LQMJ_SingleActiveBase";
import M_LQMJVideoClass from "../../M_LQMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LQMJ_ActiveBase extends LQMJ_CardBase {

    @property(cc.Prefab)
    CardType: cc.Prefab=null;
    /**
     * 显示牌
     * */
    protected _cardData: Array<LQMJ_SingleActiveBase>;
    /**
     * 手牌
     * */
    protected _handCard:Array<number>
    /**
     * 抓到的牌
     * */
    private _holdCard:number;
    /**
     * 定牌数量
     * */
    private _fixedCardNum: number;
    /**
     * 是否躺倒
     * */
    private _isLie:boolean;
    /**
     * 逻辑椅子号
     * */
    protected _logicChair:number;

    onLoad() {
        // init logic
        
    }

    public standPai():void{
        this._cardData[this._cardData.length-1].onClick();
        
    }
    
    public init(logicChair: number):void{
        this._logicChair= logicChair;
        this._cardData = new Array<LQMJ_SingleActiveBase>(0);
        this._handCard = new Array<number>(0);
        this._holdCard=LQMJMahjongDef.gInvalidMahjongValue;
        this._fixedCardNum=0;
        this._isLie=false;
    }

    /**
     * 获取定牌数量
     * */
    public get fixedCardNum():number{
        return this._fixedCardNum;
    }
    
    /**
     * 设置定牌剩余数量
     * */
    public set fixedCardNum(fixedNum:number){
        this._fixedCardNum=fixedNum;
    }
    
    /**
     * 是否躺倒
     * */
    public get isLie():boolean{
        return this._isLie;
    }
    /**
     * 设置起始弹起
     */
    public setSomeCardUp(upCard: Array<number>):void{

    }

    public setUpCardDown():void{
        
    }
    /**
     * 是否抓牌后
     * */
    public get isHoldAfter():boolean{
        return this._holdCard != LQMJMahjongDef.gInvalidMahjongValue;
    }
    
    /**
     * 刷新手牌数据
     * */
    public refreshHandCardData(cardAry:Array<number>):void{
        this.unscheduleAllCallbacks();
        if(!LQMJMahjongAlgorithm.IsSame(cardAry,this._handCard))
        {
            
            let lengthsame:boolean = cardAry.length==this._handCard.length;
            this._handCard.splice(0,this._handCard.length);
            for(let i:number=0; i<cardAry.length; i++){
                this._handCard.push(cardAry[i]);
            }

            if(lengthsame)
            {
                this.refreshHandCard();
            }
            else{
                this.handCardChange();
            }
            
        }
    }
    
    public reflashHandCardForHide():void{

    }
    /**
     * 刷新牌阵状态
     * */
    public refreshCardStatus():void{
        
    }
    
    /**
     * 设置听牌标志牌
     * */
    public showTingCardToken(cardAry:Array<number>):void{
        
    }
    
    /**
     * 整理手牌
     * */
    public arrangeHandCard():void{
        
    }
    
    /**
     * 抓牌墩牌
     * */
    public holdTricksCard(holdIdx: number): number {
        return 0;
    }
    
    /**
     * 设置活动牌是否可用
     * */
    public activeEnable(enable:boolean):void{
        
    }
    
    /**
     * 所有牌按下
     * */
    public allDown(): void {
        for(let i: number = 0;i < this._cardData.length;i++) {
            this._cardData[i].down();
        }
    }
    
    /**
     * 所有牌弹起
     * */
    public allUp():void{
        for(let i: number = 0;i < this._cardData.length;i++) {
            this._cardData[i].up();
        }
    }
    
    /**
     * 抓到一张牌
     * */
    public holdACard(card: number,_lqmj = LQMJ.ins.iclass): void {
        this._holdCard = card;
        this._handCard.push(card);
        this.handCardChange(_lqmj);
    }

    /**
     * 打出一张牌
     * */
    public outACard(card: number,_lqmj = LQMJ.ins.iclass): void {
        //自动出牌优化
        if(card==this._holdCard){
            this._handCard.pop();
            this._holdCard =LQMJMahjongDef.gInvalidMahjongValue;
            // this._cardData.pop().node.destroy();
            _lqmj.getFreeActive(this._logicChair).put(this._cardData.pop().node);
            
        }
        else{
            this.delCard([card]);
            this._holdCard = LQMJMahjongDef.gInvalidMahjongValue;
        }
        // let str="服务端出1牌"
        // for(let i=0;i<this._handCard.length;i++){
        //     str+=" "+this._handCard[i];
        // }//如果有抓牌，那么抓牌在最后
        // //cc.log(str);
        this.handCardChange();
    }
    
    /**
     * 吃了一张牌
     * */
    public chiACard(card:number,type:number,_lqmj = LQMJ.ins.iclass):void{
        if(type == 0){
            this.delCard([card-1,card-2]);
        }
        if(type == 1){
            this.delCard([card-1,card+1]);
        }
        if(type == 2){
            this.delCard([card+1,card+2]);
        }
        this._holdCard = LQMJMahjongDef.gInvalidMahjongValue;

        this.handCardChange(_lqmj);
    }

    /**
     * 吃了一张牌
     * */
    public chiACardOther(card:number,_lqmj = LQMJ.ins.iclass):void{
        this.delCard([card,card]);
        this._holdCard = LQMJMahjongDef.gInvalidMahjongValue;

        this.handCardChange(_lqmj);
    }

    /**
     * 碰了一张牌
     * */
    public pengACard(card:number,_lqmj = LQMJ.ins.iclass):void{
        this.delCard([card,card]);
        this._holdCard = LQMJMahjongDef.gInvalidMahjongValue;

        this.handCardChange(_lqmj);
    }
    
    /**
     * 明杠了一张牌
     * */
    public MGangACard(card: number,_lqmj = LQMJ.ins.iclass): void {
        this.delCard([card,card,card]);
        this._holdCard = LQMJMahjongDef.gInvalidMahjongValue;

        this.handCardChange(_lqmj);
    }
    
    /**
     * 暗杠了一张牌
     * */
    public AGangACard(card: number,_lqmj = LQMJ.ins.iclass): void {
        this.delCard([card,card,card,card]);
        this._holdCard = LQMJMahjongDef.gInvalidMahjongValue;

        this.handCardChange(_lqmj);
    }
    
    /**
     * 补杠了一张牌
     * */
    public BGangACard(card: number,_lqmj = LQMJ.ins.iclass): void {
        this.delCard([card]);
        this._holdCard = LQMJMahjongDef.gInvalidMahjongValue;

        this.handCardChange(_lqmj);
    }
    
    /**
     * 删除牌
     * */
    private delCard(cardAry:Array<number>):void{
        if((null == cardAry) || (cardAry.length < 1)){
            return;
        }
        LQMJMahjongAlgorithm.delCard(this._handCard,cardAry);
        LQMJMahjongAlgorithm.sortCardAry(this._handCard);
    }
    
    /**
     * 显示躺倒牌
     * */
    public showLieCard(cardAry:Array<number>,huCard:number):void{
        this._isLie=true;
        this._holdCard = huCard;
        
        this._handCard.splice(0,this._handCard.length);
        for(let i:number=0; i<cardAry.length; i++){
            this._handCard.push(cardAry[i]);
        }
        
        if(LQMJMahjongDef.gInvalidMahjongValue != huCard){
            this._handCard.push(huCard);
        }
        this.node.active=false;
        this.handCardChange();
        this.node.active=true;
    }
    
    /**
     * 玩家胡牌
     * */
    public playerHu(huCard: number):void{

        //如果抓到的牌不为空,那么就是自摸
        if(LQMJMahjongDef.gInvalidMahjongValue != this._holdCard){
            this._handCard[this._handCard.length - 1] = huCard;
        }else{
            this._handCard.push(huCard);
        }
        
        this._isLie = true;
        this._holdCard = huCard;
        this.handCardChange();
    }

    /**
     * 刷新手牌
     * */
    protected refreshHandCard(): void {

    }

    /**
     * 创建一个新的活动牌
     * */
    protected createSingleActiveCard(p:cc.Node):void{
        // let active : SingleActiveBase = new SingleActiveBase();
        // p.addComponent(active);
    }

    /**
     * 牌阵变化
     * */
    protected handCardChange(_lqmj = LQMJ.ins.iclass): void {
        ////cc.log("开始创建牌元"+this._handCard.length+" "+this._cardData.length);
        if(this._handCard.length > this._cardData.length) {//需要增加活动牌

            let newNum = this._handCard.length - this._cardData.length;
            for(let i: number = 0;i < newNum;i++) {
                let newnode = _lqmj.getFreeActive(this._logicChair).get();
                if (!cc.isValid(newnode)) {
                    newnode = cc.instantiate(this.CardType);
                }
                // let newnode=cc.instantiate(this.CardType);
        
                // this.createSingleActiveCard(newnode);
                let active = newnode.getComponent<LQMJ_SingleActiveBase>(LQMJ_SingleActiveBase);
                active.init();
             
                this.node.addChild(newnode);
                this._cardData.push(active);
                //newnode.active=true;
            }

        } else if(this._handCard.length < this._cardData.length) {//需要删除活动牌

            let delNum = this._cardData.length - this._handCard.length;
            for(let i: number = 0;i < delNum;i++) {
                // this._cardData[i].node.destroy();
                _lqmj.getFreeActive(this._logicChair).put(this._cardData[i].node);
            }
            this._cardData.splice(0,delNum);
        }
        ////cc.log("开始创建牌元结束"+this.node.childrenCount);
        this.refreshHandCard();
    }

    /**
     * 清理
     * */
    public clear(): void {
        super.clear();
        if(this._cardData)
            this._cardData.length=0;
        while(this.node.children.length > 0) {
            // let active: LQMJ_SingleActiveBase = this._cardData.pop();
            // active.node.destroy();
            LQMJ.ins.iclass.getFreeActive(this._logicChair).put(this.node.children[0]);
        }
        if(this._handCard)
            this._handCard.splice(0,this._handCard.length);
        this._holdCard = LQMJMahjongDef.gInvalidMahjongValue;
        this._fixedCardNum = 0;
        this._isLie=false;
    }

    public DelNullData():void{
        ////cc.log("开始清空");
        let temp:Array<LQMJ_SingleActiveBase>= new Array<LQMJ_SingleActiveBase>();
        while(this._cardData.length > 0) {
            //cc.log(this._cardData.length);
            let active: LQMJ_SingleActiveBase = this._cardData.shift();
            if(active.IsValidValue())
            {
                temp.push(active);
            }
            else{
                ////cc.log("清空"+this._cardData.length);
                // active.node.destroy();
                LQMJ.ins.iclass.getFreeActive(this._logicChair).put(active.node);
                // active.destroy();
            }
        }
        while(temp.length > 0) {
            this._cardData.push(temp.shift());
        }
        //this._cardData.pop().node.destroy();
    }
}
