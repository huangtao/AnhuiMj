import TDHMJ_SingleCardBase from "../TDHMJ_SingleCardBase";
import { TDHMJ } from "../../ConstDef/TDHMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TDHMJ_SingleActiveBase extends TDHMJ_SingleCardBase {

    @property(cc.Sprite)
    bmp_cardback: cc.Sprite=null;

    @property(cc.Sprite)
    bmp_cardcolor: cc.Sprite=null;


    onLoad() {
        // init logic
        super.onLoad();
        
    }
    //是否弹起
    protected _isUp: boolean;

    protected _isLie:boolean;

    protected _isValid:boolean;

    public init() {
        super.init();
        this._isLie=false;
        this._isUp=false;
        this._isValid=true;
    }
    
    /**
     * 显示牌
     * */
    public showCard(card:number,isLie:boolean,index:number,_lqmj=TDHMJ.ins.iclass):void{
        this._cardValue = card;
        this._isLie=isLie;
        this._cardIndex=index;
    }

    /**
     * 尾牌弹起
     */
    public onClick(){

    }

    /**
     * 弹下
     * */
    public down():void{
        
    }
    
    /**
     * 起立
     * */
    public up():void{
        
    }
    
    /**
     * 清理
     * */
    public clear():void{
        
    }


    public IsValidValue():boolean{
        return this._isValid;
    }
    // /**绑定事件用 */
    // public onAdd2Stage():void{
    // }

}
