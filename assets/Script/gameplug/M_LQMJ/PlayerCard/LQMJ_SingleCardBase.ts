import { LQMJMahjongDef } from "../ConstDef/LQMJMahjongDef";
import { LQMJMahjongAlgorithm } from "../LQMJMahjongAlgorithm/LQMJMahjongAlgorithm";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LQMJ_SingleCardBase extends cc.Component {

    onLoad() {
        // init logic
        //this.init();
    }

    //牌值
    protected _cardValue: number;

    protected _cardIndex:number;

    protected _chiType : number;

    public init() {
        this._cardValue = LQMJMahjongDef.gInvalidMahjongValue;
        this._cardIndex = 0;
        this._chiType = -1;
    }

    /**
     * 获取牌值
     * */
    public get cardValue(): number {
        return this._cardValue;
    }
    /**
     * 获取吃类型
     * */
    public get chiType(): number {
        return this._chiType;
    }
    
    /**
     * 是否有效
     * */
    public get isValid():boolean{
        return LQMJMahjongDef.gInvalidMahjongValue != this._cardValue;
    }
    
    /**
     * 获取麻将花色
     * */
    public get mahjongColor():number{
        if(this.isValid){
            return LQMJMahjongAlgorithm.GetMahjongColor(this._cardValue);
        }
        return LQMJMahjongDef.gMahjongColor_Null;
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
    //     this._cardValue = LQMJMahjongDef.gInvalidMahjongValue;
    //     if(null != this.node.parent){
    //         this.node.parent.removeComponent(this);
    //     }
    // }
}
