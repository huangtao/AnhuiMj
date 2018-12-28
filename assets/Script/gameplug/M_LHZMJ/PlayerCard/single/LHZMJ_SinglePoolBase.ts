import LHZMJ_SingleCardBase from "../LHZMJ_SingleCardBase";

import { LHZMJ } from "../../ConstDef/LHZMJMahjongDef";
import { LHZMJMahjongAlgorithm1 } from "../../LHZMJMahjongAlgorithm/LHZMJMahjongAlgorithm1";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_SinglePoolBase extends LHZMJ_SingleCardBase {

    @property(cc.Sprite)
    bmp_cardback: cc.Sprite=null;

    @property(cc.Sprite)
    bmp_cardcolor: cc.Sprite=null;

    //  @property(cc.Sprite)
    // bmp_greenZZ: cc.Sprite=null;
    
    @property(cc.Sprite)
    bmp_cardHide: cc.Sprite=null;

    //      @property(cc.Sprite)
    // bmp_greenbg: cc.Sprite=null;

      
        


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
        // this.bmp_greenZZ.node.active=isShow;
    }

    /**
     * 会牌显示绿色遮罩(宿州麻将专有)
     * @param card 
     */
    public HuiCardShowGreenZZ(card:number):void{
        var huiAry:Array<number>=LHZMJ.ins.iclass.GetHunCardAry();
        if(!LHZMJMahjongAlgorithm1.IsContainsNumber(huiAry,card)){
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
