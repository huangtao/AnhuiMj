import BBMJ_SingleCardBase from "../BBMJ_SingleCardBase";

import { BBMJ } from "../../ConstDef/BBMJMahjongDef";
import { BBMJMahjongAlgorithm1 } from "../../BBMJMahjongAlgorithm/BBMJMahjongAlgorithm1";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_SinglePoolBase extends BBMJ_SingleCardBase {

    @property(cc.Sprite)
    bmp_cardback: cc.Sprite=null;

    @property(cc.Sprite)
    bmp_cardcolor: cc.Sprite=null;

     @property(cc.Sprite)
    bmp_greenZZ: cc.Sprite=null;
        @property(cc.Sprite)
    bmp_cardHide: cc.Sprite=null;

         @property(cc.Sprite)
    bmp_greenbg: cc.Sprite=null;

      
        


    onLoad() {
        // init logic
       
            
    }

    public init() {
        super.init();
        this.bmp_cardback.node.active=false;
        this.bmp_cardcolor.node.active=false;
        this.bmp_cardHide.node.active=false;
    }


     /**
     * 是否显示绿色遮罩
     */
    public set ShowGreenZZ(isShow:boolean){
        this.bmp_greenZZ.node.active=isShow;
    }

    /**
     * 会牌显示绿色遮罩(宿州麻将专有)
     * @param card 
     */
    public HuiCardShowGreenZZ(card:number):void{
        var huiAry:Array<number>=BBMJ.ins.iclass.GetHunCardAry();
        if(!BBMJMahjongAlgorithm1.IsContainsNumber(huiAry,card)){
            this.ShowGreenZZ=false;
            return;
        }
        this.ShowGreenZZ=true;
    }
        
    /**
     * 显示牌
     * */
    public showCard(card:number,index:number):void{
     this.HuiCardShowGreenZZ(card);
        this._cardValue = card;
        this._cardIndex=index;
    }

     public showHide(card:number):void{//传0清
        if(cc.isValid(this.node)){
            if(card==this._cardValue){
                this.bmp_cardHide.node.active=true;
            }else{
                this.bmp_cardHide.node.active=false;
            }
        }
    }
}
