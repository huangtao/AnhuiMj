import JZMJ_CardBase from "../single/JZMJ_CardBase";
import JZMJ_SingleFixedBase from "../single/JZMJ_SingleFixedBase";
import { clsFixedCard, enFixedCardType, JZMJMahjongDef, JZMJ } from "../../ConstDef/JZMJMahjongDef";
import { M_JZMJ_GameMessage } from "../../../../CommonSrc/M_JZMJ_GameMessage";
import M_JZMJClass from "../../M_JZMJClass";
import M_JZMJVideoClass from "../../M_JZMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class JZMJ_FixedBase extends JZMJ_CardBase{

    @property(cc.Prefab)
    FixedType: cc.Prefab=null;
    

    onLoad() {
        // init logic
        
    }

    //定牌数据
    public _fixedData:Array<JZMJ_SingleFixedBase>;
    //定牌包装
    protected _fixedWrapper:clsFixedCard;
    /**
     * 逻辑椅子号
     * */
    protected _logicChair:number;
    
    public init(logicChair:number) {
        this._logicChair= logicChair;
        this._fixedData = new Array<JZMJ_SingleFixedBase>(0);
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
    public addFixed(card:number,fixedType:enFixedCardType,pos:number,type:number,_JZMJ = JZMJ.ins.iclass):void{
        let newnode = _JZMJ.getFreeFixed(this._logicChair).get();
        if (!cc.isValid(newnode)) {
            newnode = cc.instantiate(this.FixedType);
        }
        // var newnode=cc.instantiate(this.FixedType);
        var fixed = newnode.getComponent<JZMJ_SingleFixedBase>(JZMJ_SingleFixedBase);
        fixed.init();
        this.node.addChild(newnode);
        this._fixedData.push(fixed);
        fixed.showCard(card,fixedType,this._fixedData.length,type,pos,_JZMJ);
        this._fixedWrapper.Add(card,fixedType);
        
        this.refreshFixedCard(_JZMJ);
    }
    
    /**
     * 恢复定牌
     * */
    public recoveryFixed(fixedCard : Array<M_JZMJ_GameMessage.ORCFixedCard>,mychair:number):void{
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
                let newnode = JZMJ.ins.iclass.getFreeFixed(this._logicChair).get();
                if (!cc.isValid(newnode)) {
                    newnode = cc.instantiate(this.FixedType);
                }
                // var newnode=cc.instantiate(this.FixedType);
                var fixed = newnode.getComponent<JZMJ_SingleFixedBase>(JZMJ_SingleFixedBase);
                fixed.init();
                this.node.addChild(newnode);
                this._fixedData.push(fixed);  
                fixed.showCard(fixedCard[i].fixedCard,fixedCard[i].fixedType,i+1,3,pos);
                // cc.log(fixedCard[i].chiType+"吃的类型 断线重连....");
                this._fixedWrapper.Add(fixedCard[i].fixedCard,fixedCard[i].fixedType);
                
                switch(fixedCard[i].fixedType){
                    case enFixedCardType.FixedCardType_Peng:{
                        M_JZMJClass.ins.RecordCard.pengACard(fixedCard[i].fixedCard);
                        M_JZMJClass.ins.RecordCard.outACard(fixedCard[i].fixedCard);
                        break;
                    }
                    case enFixedCardType.FixedCardType_AGang:
                    case enFixedCardType.FixedCardType_MGang:
                    case enFixedCardType.FixedCardType_BGang:{
                        M_JZMJClass.ins.RecordCard.gangACard(fixedCard[i].fixedCard);
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
    public peng2gang(card:number,_JZMJ):void{
        this._fixedWrapper.changePeng2Gang(card);
        for(var i:number=0; i<this._fixedData.length; i++){
            if(this._fixedData[i].changePeng2Gang(card,_JZMJ)){
                return;
            }
        }
    }
    
    /**
     * 刷新定牌
     * */
    protected refreshFixedCard(_JZMJ = JZMJ.ins.iclass):void{
        
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
            JZMJ.ins.iclass.getFreeFixed(this._logicChair).put(this.node.children[0]);
        }
    }
}
