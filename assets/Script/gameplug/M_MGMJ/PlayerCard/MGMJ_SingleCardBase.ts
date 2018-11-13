import { MGMJMahjongDef } from "../ConstDef/MGMJMahjongDef";
import { MGMJMahjongAlgorithm } from "../MGMJMahjongAlgorithm/MGMJMahjongAlgorithm";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MGMJ_SingleCardBase extends cc.Component {

    onLoad() {
        // init logic
        //this.init();
    }

    //牌值
    protected _cardValue: number;

    protected _cardIndex:number;

    protected _chiType : number;

    public init() {
        this._cardValue = MGMJMahjongDef.gInvalidMahjongValue;
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
        return MGMJMahjongDef.gInvalidMahjongValue != this._cardValue;
    }
    
    /**
     * 获取麻将花色
     * */
    public get mahjongColor():number{
        if(this.isValid){
            return MGMJMahjongAlgorithm.GetMahjongColor(this._cardValue);
        }
        return MGMJMahjongDef.gMahjongColor_Null;
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
    //     this._cardValue = MGMJMahjongDef.gInvalidMahjongValue;
    //     if(null != this.node.parent){
    //         this.node.parent.removeComponent(this);
    //     }
    // }
}
