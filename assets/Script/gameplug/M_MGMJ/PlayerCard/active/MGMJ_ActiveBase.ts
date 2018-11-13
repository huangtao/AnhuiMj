import MGMJ_CardBase from "../single/MGMJ_CardBase";

import { MGMJMahjongDef, MGMJ } from "../../ConstDef/MGMJMahjongDef";
import { MGMJMahjongAlgorithm } from "../../MGMJMahjongAlgorithm/MGMJMahjongAlgorithm";
import MGMJ_SingleActiveBase from "../single/MGMJ_SingleActiveBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MGMJ_ActiveBase extends MGMJ_CardBase {

    @property(cc.Prefab)
    CardType: cc.Prefab=null;
    /**
     * 显示牌
     * */
    protected _cardData: Array<MGMJ_SingleActiveBase>;
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
        this._cardData = new Array<MGMJ_SingleActiveBase>(0);
        this._handCard = new Array<number>(0);
        this._holdCard=MGMJMahjongDef.gInvalidMahjongValue;
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
        return this._holdCard != MGMJMahjongDef.gInvalidMahjongValue;
    }
    
    /**
     * 刷新手牌数据
     * */
    public refreshHandCardData(cardAry:Array<number>):void{
        this.unscheduleAllCallbacks();
        if(!MGMJMahjongAlgorithm.IsSame(cardAry,this._handCard))
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
    public holdACard(card: number): void {
        this._holdCard = card;
        this._handCard.push(card);
        this.handCardChange();
    }

    /**
     * 打出一张牌
     * */
    public outACard(card: number): void {
        //自动出牌优化
        if(card==this._holdCard){
            this._handCard.pop();
            this._holdCard =MGMJMahjongDef.gInvalidMahjongValue;
            // this._cardData.pop().node.destroy();
            MGMJ.ins.iclass.getFreeActive(this._logicChair).put(this._cardData.pop().node);
            
        }
        else{
            this.delCard([card]);
            this._holdCard = MGMJMahjongDef.gInvalidMahjongValue;
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
    public chiACard(card:number,type:number):void{
        if(type == 0){
            this.delCard([card-1,card-2]);
        }
        if(type == 1){
            this.delCard([card-1,card+1]);
        }
        if(type == 2){
            this.delCard([card+1,card+2]);
        }
        this._holdCard = MGMJMahjongDef.gInvalidMahjongValue;

        this.handCardChange();
    }

    /**
     * 吃了一张牌
     * */
    public chiACardOther(card:number):void{
        this.delCard([card,card]);
        this._holdCard = MGMJMahjongDef.gInvalidMahjongValue;

        this.handCardChange();
    }

    /**
     * 碰了一张牌
     * */
    public pengACard(card:number):void{
        this.delCard([card,card]);
        this._holdCard = MGMJMahjongDef.gInvalidMahjongValue;

        this.handCardChange();
    }
    
    /**
     * 明杠了一张牌
     * */
    public MGangACard(card: number): void {
        this.delCard([card,card,card]);
        this._holdCard = MGMJMahjongDef.gInvalidMahjongValue;

        this.handCardChange();
    }
    
    /**
     * 暗杠了一张牌
     * */
    public AGangACard(card: number): void {
        this.delCard([card,card,card,card]);
        this._holdCard = MGMJMahjongDef.gInvalidMahjongValue;

        this.handCardChange();
    }
    
    /**
     * 补杠了一张牌
     * */
    public BGangACard(card: number): void {
        this.delCard([card]);
        this._holdCard = MGMJMahjongDef.gInvalidMahjongValue;

        this.handCardChange();
    }
    
    /**
     * 删除牌
     * */
    private delCard(cardAry:Array<number>):void{
        if((null == cardAry) || (cardAry.length < 1)){
            return;
        }
        MGMJMahjongAlgorithm.delCard(this._handCard,cardAry);
        MGMJMahjongAlgorithm.sortCardAry(this._handCard);
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
        
        if(MGMJMahjongDef.gInvalidMahjongValue != huCard){
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
        if(MGMJMahjongDef.gInvalidMahjongValue != this._holdCard){
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
    protected handCardChange(): void {
        ////cc.log("开始创建牌元"+this._handCard.length+" "+this._cardData.length);
        if(this._handCard.length > this._cardData.length) {//需要增加活动牌

            let newNum = this._handCard.length - this._cardData.length;
            for(let i: number = 0;i < newNum;i++) {
                let newnode = MGMJ.ins.iclass.getFreeActive(this._logicChair).get();
                if (!cc.isValid(newnode)) {
                    newnode = cc.instantiate(this.CardType);
                }
                // let newnode=cc.instantiate(this.CardType);
        
                // this.createSingleActiveCard(newnode);
                let active = newnode.getComponent<MGMJ_SingleActiveBase>(MGMJ_SingleActiveBase);
                active.init();
             
                this.node.addChild(newnode);
                this._cardData.push(active);
                //newnode.active=true;
            }

        } else if(this._handCard.length < this._cardData.length) {//需要删除活动牌

            let delNum = this._cardData.length - this._handCard.length;
            for(let i: number = 0;i < delNum;i++) {
                // this._cardData[i].node.destroy();
                MGMJ.ins.iclass.getFreeActive(this._logicChair).put(this._cardData[i].node);
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
        this._cardData.length=0;
        while(this.node.children.length > 0) {
            // let active: MGMJ_SingleActiveBase = this._cardData.pop();
            // active.node.destroy();
            MGMJ.ins.iclass.getFreeActive(this._logicChair).put(this.node.children[0]);
        }
        
        this._handCard.splice(0,this._handCard.length);
        this._holdCard = MGMJMahjongDef.gInvalidMahjongValue;
        this._fixedCardNum = 0;
        this._isLie=false;
    }

    public DelNullData():void{
        ////cc.log("开始清空");
        let temp:Array<MGMJ_SingleActiveBase>= new Array<MGMJ_SingleActiveBase>();
        while(this._cardData.length > 0) {
            //cc.log(this._cardData.length);
            let active: MGMJ_SingleActiveBase = this._cardData.shift();
            if(active.IsValidValue())
            {
                temp.push(active);
            }
            else{
                ////cc.log("清空"+this._cardData.length);
                // active.node.destroy();
                MGMJ.ins.iclass.getFreeActive(this._logicChair).put(active.node);
                // active.destroy();
            }
        }
        while(temp.length > 0) {
            this._cardData.push(temp.shift());
        }
        //this._cardData.pop().node.destroy();
    }
}
