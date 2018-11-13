import HZMJ_CardBase from "../single/HZMJ_CardBase";
import HZMJ_SingleFixedBase from "../single/HZMJ_SingleFixedBase";
import { clsFixedCard, enFixedCardType, HZMJMahjongDef, HZMJ } from "../../ConstDef/HZMJMahjongDef";
import { M_HZMJ_GameMessage } from "../../../../CommonSrc/M_HZMJ_GameMessage";
import M_HZMJClass from "../../M_HZMJClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_FixedBase extends HZMJ_CardBase{

    @property(cc.Prefab)
    FixedType: cc.Prefab=null;
    

    onLoad() {
        // init logic
        
    }

    //定牌数据
    public _fixedData:Array<HZMJ_SingleFixedBase>;
    //定牌包装
    protected _fixedWrapper:clsFixedCard;
    /**
     * 逻辑椅子号
     * */
    protected _logicChair:number;
    
    public init(logicChair:number) {
        this._logicChair= logicChair;
        this._fixedData = new Array<HZMJ_SingleFixedBase>(0);
        this._fixedWrapper = new clsFixedCard();
    }
    
    /**
     * 定牌数量
     * */
    public get fixedCardNum():number{
        return this._fixedData.length;
    }
    
    /**
     * 定牌包装
     * */
    public get fixedWrapper():clsFixedCard{
        return this._fixedWrapper;
    }
    
    /**
     * 添加一个定牌
     * */
    public addFixed(card:number,fixedType:enFixedCardType,pos:number):void{
        let newnode = HZMJ.ins.iclass.getFreeFixed(this._logicChair).get();
        if (!cc.isValid(newnode)) {
            newnode = cc.instantiate(this.FixedType);
        }
        // var newnode=cc.instantiate(this.FixedType);
        var fixed = newnode.getComponent<HZMJ_SingleFixedBase>(HZMJ_SingleFixedBase);
        fixed.init();
        this.node.addChild(newnode);
        this._fixedData.push(fixed);
        fixed.showCard(card,fixedType,this._fixedData.length,pos);
        this._fixedWrapper.Add(card,fixedType);
        
        this.refreshFixedCard();
    }
    
    /**
     * 恢复定牌
     * */
    public recoveryFixed(fixedCard : Array<M_HZMJ_GameMessage.ORCFixedCard>,mychair:number):void{
        if((null != fixedCard) && (fixedCard.length > 0)){
            for(var i:number=0; i<fixedCard.length; i++){
                let pos=(fixedCard[i].outChair+HZMJMahjongDef.gPlayerNum-mychair)%HZMJMahjongDef.gPlayerNum;
                let newnode = HZMJ.ins.iclass.getFreeFixed(this._logicChair).get();
                if (!cc.isValid(newnode)) {
                    newnode = cc.instantiate(this.FixedType);
                }
                // var newnode=cc.instantiate(this.FixedType);
                var fixed = newnode.getComponent<HZMJ_SingleFixedBase>(HZMJ_SingleFixedBase);
                fixed.init();
                this.node.addChild(newnode);
                this._fixedData.push(fixed);  
                fixed.showCard(fixedCard[i].fixedCard,fixedCard[i].fixedType,i+1,pos);
                this._fixedWrapper.Add(fixedCard[i].fixedCard,fixedCard[i].fixedType);
                
                switch(fixedCard[i].fixedType){
                    case enFixedCardType.FixedCardType_Peng:{
                        M_HZMJClass.ins.RecordCard.pengACard(fixedCard[i].fixedCard);
                        M_HZMJClass.ins.RecordCard.outACard(fixedCard[i].fixedCard);
                        break;
                    }
                    case enFixedCardType.FixedCardType_AGang:
                    case enFixedCardType.FixedCardType_MGang:
                    case enFixedCardType.FixedCardType_BGang:{
                        M_HZMJClass.ins.RecordCard.gangACard(fixedCard[i].fixedCard);
                        break;
                    }
                }
            }
            this.refreshFixedCard();
        }
    }
    
    /**
     * 碰转杠
     * */
    public peng2gang(card:number):void{
        this._fixedWrapper.changePeng2Gang(card);
        for(var i:number=0; i<this._fixedData.length; i++){
            if(this._fixedData[i].changePeng2Gang(card)){
                return;
            }
        }
    }
    
    /**
     * 刷新定牌
     * */
    protected refreshFixedCard():void{
        
    }
    /**
     * 
     * @param card 刷新定牌遮罩 0为重置
     */
    public refreshHideCard(card:number):void{
        if(cc.isValid(this._fixedData)){
            for(let i:number=0; i<this._fixedData.length; i++){
                this._fixedData[i].showHide(card);
            }
        }
        
    }
    // /**
    //  * 创建一个新的活动牌
    //  * */
    // protected createSingleFixedCard(): SingleFixedBase {
    //     return null;
    // }
    
    /**
     * 清理
     * */
    public clear(): void {
        super.clear();
        this._fixedWrapper.Clear();
        this._fixedData.length=0;
        while(this.node.children.length > 0){
            // this._fixedData.pop().node.destroy();
            HZMJ.ins.iclass.getFreeFixed(this._logicChair).put(this.node.children[0]);
        }
    }
}
