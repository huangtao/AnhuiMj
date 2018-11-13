import { LHZMJMahjongDef } from "../ConstDef/LHZMJMahjongDef";
import { LHZMJMahjongAlgorithm } from "../LHZMJMahjongAlgorithm/LHZMJMahjongAlgorithm";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_SingleCardBase extends cc.Component {

    onLoad() {
        // init logic
        //this.init();
    }

    //牌值
    protected _cardValue: number;

    protected _cardIndex:number;

    public init() {
        this._cardValue = LHZMJMahjongDef.gInvalidMahjongValue;
        this._cardIndex=0;
    }

    /**
     * 获取牌值
     * */
    public get cardValue(): number {
        return this._cardValue;
    }
    
    /**
     * 是否有效
     * */
    public get isValid():boolean{
        return LHZMJMahjongDef.gInvalidMahjongValue != this._cardValue;
    }
    
    /**
     * 获取麻将花色
     * */
    public get mahjongColor():number{
        if(this.isValid){
            return LHZMJMahjongAlgorithm.GetMahjongColor(this._cardValue);
        }
        return LHZMJMahjongDef.gMahjongColor_Null;
    }
    
    /**
     * 尺寸
     * */
    public get size(): { width: number,height: number } {
        return { width: 0,height: 0 };
    }
    
    // /**
    //  * 除移
    //  * */
    // public destroy():void{
    //     this._cardValue = LHZMJMahjongDef.gInvalidMahjongValue;
    //     if(null != this.node.parent){
    //         this.node.parent.removeComponent(this);
    //     }
    // }
}
