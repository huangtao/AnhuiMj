import LHZMJ_SingleCardBase from "../LHZMJ_SingleCardBase";
import { enFixedCardType } from "../../ConstDef/LHZMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_SingleFixedBase extends LHZMJ_SingleCardBase {

private static _ins: LHZMJ_SingleFixedBase;
        /**
         * LHZMJView单例
         * */
        public static get ins():LHZMJ_SingleFixedBase{ return this._ins; }
        public get gameClass(): LHZMJ_SingleFixedBase { return LHZMJ_SingleFixedBase.ins; }


    // @property(cc.Node)
    // light_node:cc.Node=null;

    // @property(cc.Sprite)
    // bmp_arrow:cc.Sprite[]=[];

    //四个牌背
    @property([cc.Sprite])
    bmp_cardbackAry: cc.Sprite[]=[];
    //3个牌花
    @property([cc.Sprite])
    bmp_cardcolorAry: cc.Sprite[]=[];
        //3个遮罩
    // @property([cc.Sprite])
    // bmp_cardHideAry: cc.Sprite[]=[];

    @property([cc.Sprite])
    light_arrow: cc.Sprite[]=[];
    
    onLoad() {
        // init logic
        
    }

    //定牌类型
    protected _fixdType: enFixedCardType;
    //标记的方向
    protected _pos:number;
        

    public init() {
        super.init();
        this._fixdType = enFixedCardType.FixedCardType_UnKnown;
        this._pos=0;
        this.node.active=false;
    }

    /**
     * 定牌类型
     * */
    public get fixedType(): enFixedCardType {
        return this._fixdType;
    }

    /**
     * 显示定牌,pos为指向，具体方向要看自己的位置是什么（自己为0）
     * */
    public showCard(card: number,fixedType: enFixedCardType,index:number,pos?:number): void {
        this._cardValue = card;
        this._fixdType = fixedType;
        this._cardIndex=index;
         if(pos!=null)
            this._pos=pos;
        //this._pos=pos;
        //this._bmp_arrow=new egret.Bitmap();
        for(var i: number = 0;i < 3;i++) {
            this.bmp_cardbackAry[i].node.active=true;
            // this.bmp_cardHideAry[i].node.active=false;
            this.bmp_cardcolorAry[i].node.active=true;
        }

        if(enFixedCardType.FixedCardType_Peng != this._fixdType) {
            this.bmp_cardbackAry[3].node.active=true;
        }

        // if(pos != null && this._fixdType != enFixedCardType.FixedCardType_AGang){
        //     for(var i=1;i<4;i++){
        //         if(this._pos != i)
        //             this.light_arrow[i].node.active = false;        
        //         else
        //             this.light_arrow[i].node.active = true;    
        //     }
        // }
    }
   

    /**
     * 碰转杠
     * */
    public changePeng2Gang(card: number): boolean {
        if((enFixedCardType.FixedCardType_Peng == this._fixdType) && (card == this._cardValue)) {
            // while(this._bmp_cardbackAry.length > 0){
            //     this._bmp_cardbackAry.pop();
            // }
            
            // while(this._bmp_cardcolorAry.length > 0){
            //     this._bmp_cardcolorAry.pop();
            // }
            this.showCard(card,enFixedCardType.FixedCardType_BGang,this._cardIndex,this._pos);

            return true;
        }

        return false;
    }
        
        
    /**
     * 取牌组
     */
    public getCards():Array<number>{
        var result:Array<number>=new Array<number>();
        if(this._fixdType>0)
        {
            if(this._fixdType<4)
            {
                for(var i=0;i<4;i++)
                    result.push(this._cardValue);
            }
            else
            {
                for(var i=0;i<3;i++)
                    result.push(this._cardValue);
            }
        }
        return result;
    }
    public showHide(card:number):void{
    //     if(cc.isValid(this.node)){
    //         if((enFixedCardType.FixedCardType_Peng == this._fixdType) && (card == this._cardValue)){
    //             // for(let i: number = 0;i < 3;i++) {
    //             //     this.bmp_cardHideAry[i].node.active=true;
    //             // }
    //         }else{
    //             for(let i: number = 0;i < 3;i++) {
    //                 this.bmp_cardHideAry[i].node.active=false;
    //             }
    //         }
    //     }
    }
}
