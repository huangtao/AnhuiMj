import TDHMJ_CardBase from "../single/TDHMJ_CardBase";
import TDHMJ_SingleFixedBase from "../single/TDHMJ_SingleFixedBase";
import { clsFixedCard, enFixedCardType, TDHMJMahjongDef, TDHMJ } from "../../ConstDef/TDHMJMahjongDef";
import { M_TDHMJ_GameMessage } from "../../../../CommonSrc/M_TDHMJ_GameMessage";
import M_TDHMJClass from "../../M_TDHMJClass";
import M_TDHMJVideoClass from "../../M_TDHMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TDHMJ_FixedBase extends TDHMJ_CardBase{

    @property(cc.Prefab)
    FixedType: cc.Prefab=null;
    

    onLoad() {
        // init logic
        
    }

    //定牌数据
    public _fixedData:Array<TDHMJ_SingleFixedBase>;
    //定牌包装
    protected _fixedWrapper:clsFixedCard;
    /**
     * 逻辑椅子号
     * */
    protected _logicChair:number;
    
    public init(logicChair:number) {
        this._logicChair= logicChair;
        this._fixedData = new Array<TDHMJ_SingleFixedBase>(0);
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
    public addFixed(card:number,fixedType:enFixedCardType,pos:number,type:number,_lqmj = TDHMJ.ins.iclass):void{
        let newnode = _lqmj.getFreeFixed(this._logicChair).get();
        if (!cc.isValid(newnode)) {
            newnode = cc.instantiate(this.FixedType);
        }
        // var newnode=cc.instantiate(this.FixedType);
        var fixed = newnode.getComponent<TDHMJ_SingleFixedBase>(TDHMJ_SingleFixedBase);
        fixed.init();
        this.node.addChild(newnode);
        this._fixedData.push(fixed);
        fixed.showCard(card,fixedType,this._fixedData.length,type,pos,_lqmj);
        this._fixedWrapper.Add(card,fixedType);
        
        this.refreshFixedCard(_lqmj);
    }
    
    /**
     * 恢复定牌
     * */
    public recoveryFixed(fixedCard : Array<M_TDHMJ_GameMessage.ORCFixedCard>,mychair:number):void{
        if((null != fixedCard) && (fixedCard.length > 0)){
            for(var i:number=0; i<fixedCard.length; i++){
                let pos : number = 0;
                let outChair : number = fixedCard[i].outChair;
                if(mychair < outChair && Math.abs(mychair - outChair) == 1 || mychair > outChair &&  Math.abs(mychair - outChair) == 3)
                    pos = 2;//下家
                if(mychair -outChair == 2 || outChair - mychair == 2)
                    pos = 1;//对家
                if(mychair > outChair && Math.abs(mychair - outChair) == 1 || mychair < outChair &&  Math.abs(mychair - outChair) == 3)           
                    pos = 0;//上家
                //let pos=(fixedCard[i].outChair+TDHMJMahjongDef.gPlayerNum-mychair)%TDHMJMahjongDef.gPlayerNum;
                let newnode = TDHMJ.ins.iclass.getFreeFixed(this._logicChair).get();
                if (!cc.isValid(newnode)) {
                    newnode = cc.instantiate(this.FixedType);
                }
                // var newnode=cc.instantiate(this.FixedType);
                var fixed = newnode.getComponent<TDHMJ_SingleFixedBase>(TDHMJ_SingleFixedBase);
                fixed.init();
                this.node.addChild(newnode);
                this._fixedData.push(fixed);  
                fixed.showCard(fixedCard[i].fixedCard,fixedCard[i].fixedType,i+1,fixedCard[i].chiType,pos);
                cc.log(fixedCard[i].chiType+"吃的类型 断线重连....");
                this._fixedWrapper.Add(fixedCard[i].fixedCard,fixedCard[i].fixedType);
                
                switch(fixedCard[i].fixedType){
                    case enFixedCardType.FixedCardType_Peng:{
                        M_TDHMJClass.ins.RecordCard.pengACard(fixedCard[i].fixedCard);
                        M_TDHMJClass.ins.RecordCard.outACard(fixedCard[i].fixedCard);
                        break;
                    }
                    case enFixedCardType.FixedCardType_AGang:
                    case enFixedCardType.FixedCardType_MGang:
                    case enFixedCardType.FixedCardType_BGang:{
                        M_TDHMJClass.ins.RecordCard.gangACard(fixedCard[i].fixedCard);
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
    public peng2gang(card:number,_lqmj):void{
        this._fixedWrapper.changePeng2Gang(card);
        for(var i:number=0; i<this._fixedData.length; i++){
            if(this._fixedData[i].changePeng2Gang(card,_lqmj)){
                return;
            }
        }
    }
    
    /**
     * 刷新定牌
     * */
    protected refreshFixedCard(_lqmj = TDHMJ.ins.iclass):void{
        
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
        if(this._fixedWrapper)
            this._fixedWrapper.Clear();
        if(this._fixedData)
            this._fixedData.length=0;
        while(this.node.children.length > 0){
            // this._fixedData.pop().node.destroy();
            TDHMJ.ins.iclass.getFreeFixed(this._logicChair).put(this.node.children[0]);
        }
    }
}
