import JZMJ_SingleCardBase from "../JZMJ_SingleCardBase";
import { enFixedCardType, JZMJ } from "../../ConstDef/JZMJMahjongDef";
import { IBiJiClass } from '../../../M_BiJi/GameHelp/BJ_IBiJiClass';

const { ccclass, property } = cc._decorator;

@ccclass
export default class JZMJ_SingleFixedBase extends JZMJ_SingleCardBase {

    @property(cc.Sprite)
    bmp_arrow:cc.Sprite=null;
    //四个牌背
    @property([cc.Sprite])
    bmp_cardbackAry: cc.Sprite[]=[];
    //4个牌花
    @property([cc.Sprite])
    bmp_cardcolorAry: cc.Sprite[]=[];
    //4个遮罩
    @property([cc.Sprite])
    bmp_cardHideAry: cc.Sprite[]=[];
    //3个亮光
    @property([cc.Sprite])
    light_arrow: cc.Sprite[]=[];

    onLoad() {
        // init logic
        
    }

    //定牌类型
    protected _fixdType: enFixedCardType;
    //标记的方向
    protected _pos:number;

    public _chiType:number;
        

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
     * 吃牌类型
     */
    public showChiType():enFixedCardType {
        return this._chiType;
    }
    /**
     * 显示定牌,pos为指向，具体方向要看自己的位置是什么（自己为0）
     * */
    public showCard(card: number,fixedType: enFixedCardType,index:number,type:number,pos?:number,_jzmj = JZMJ.ins.iclass): void {
        this._cardValue = card;
        this._fixdType = fixedType;
        this._cardIndex=index;
        this._chiType = type;
        if(pos!=null)
            this._pos=pos;
        for(var i: number = 0;i < 3;i++) {
            this.bmp_cardbackAry[i].node.active=true;
            this.bmp_cardHideAry[i].node.active=false;
            this.bmp_cardcolorAry[i].node.active=true;
        }
        if(enFixedCardType.FixedCardType_Peng != this._fixdType && enFixedCardType.FixedCardType_Chi != this._fixdType) {
            this.bmp_cardbackAry[3].node.active=true;
        }
        if(pos != null && this._fixdType == enFixedCardType.FixedCardType_Chi){
            if(type == 0){
                this.light_arrow[2].node.active = true;        
                this.light_arrow[1].node.active = false;
                this.light_arrow[0].node.active = false;
            }
            if(type == 1){
                this.light_arrow[1].node.active = true;    
                this.light_arrow[2].node.active = false;
                this.light_arrow[0].node.active = false;
            }
            if(type == 2){
                this.light_arrow[0].node.active = true;    
                this.light_arrow[1].node.active = false;
                this.light_arrow[2].node.active = false;
            }
        }
        if(pos != null && this._fixdType != enFixedCardType.FixedCardType_AGang && this._fixdType != enFixedCardType.FixedCardType_Chi){
            for(var i=0;i<3;i++){
                if(this._pos != i)
                    this.light_arrow[i].node.active = false;        
                else
                    this.light_arrow[i].node.active = true;    
            }
        }
    }

    /**
     * 碰转杠
     * */
    public changePeng2Gang(card: number,_jzmj): boolean {
        if((enFixedCardType.FixedCardType_Peng == this._fixdType) && (card == this._cardValue)) {
            this.showCard(card,enFixedCardType.FixedCardType_BGang,this._cardIndex,this._pos,null,_jzmj);
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
        if(cc.isValid(this.node)){
            if((enFixedCardType.FixedCardType_Peng == this._fixdType) && (card == this._cardValue)){
                // for(let i: number = 0;i < 3;i++) {
                //     this.bmp_cardHideAry[i].node.active=true;
                // }
            }else{
                for(let i: number = 0;i < 4;i++) {
                    this.bmp_cardHideAry[i].node.active=false;
                }
            }
        }
    }
}
