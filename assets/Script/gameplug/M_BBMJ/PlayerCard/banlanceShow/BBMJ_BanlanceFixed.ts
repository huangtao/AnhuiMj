import BBMJ_CardBase from "../single/BBMJ_CardBase";
import BBMJ_SingleFixed from "../single/banlanceShow/BBMJ_SingleFixed";
import { enFixedCardType } from "../../ConstDef/BBMJMahjongDef";
import { ReportError } from "../../../../Tools/Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_BanlanceFixed extends BBMJ_CardBase {

    @property(cc.Prefab)
    FixedType: cc.Prefab=null;
     public static _freeNode=new cc.NodePool();
    onLoad() {
        // init logic
        
    }

    //定牌数据
    protected _fixedData:Array<BBMJ_SingleFixed>;
    
    public init() {
        if(this._fixedData==null)
        this._fixedData = new Array<BBMJ_SingleFixed>(0);
    }
    
    /**
     * 定牌数量
     * */
    public get fixedCardNum():number{
        return this._fixedData.length;
    }
    
    /**
     * 添加一个定牌
     * */
    public addFixed(card:number,fixedType:enFixedCardType,pos:number):void{


        //var newnode=cc.instantiate(this.FixedType);
        let newnode = BBMJ_BanlanceFixed._freeNode.get();
        if (!cc.isValid(newnode)) {
            newnode = cc.instantiate(this.FixedType);
        }
        var fixed = newnode.getComponent<BBMJ_SingleFixed>(BBMJ_SingleFixed);
        fixed.init();
        this.node.addChild(newnode);
        this._fixedData.push(fixed);
        fixed.showCard(card,fixedType,pos);
        
        this.refreshFixedCard();
    }						
    
    /**
     * 刷新定牌
     * */
    protected refreshFixedCard():void{
        this.node.active=false;
        if(this._fixedData.length > 0){
            for(var i:number=0; i<this._fixedData.length; i++){
                this._fixedData[i].node.x = i*153-390+22.5*3;
                this._fixedData[i].node.y = -5;
            }
        }
        this.node.active=true;
    }
    
    
    /**
     * 清理
     * */
    public clear(): void {
         super.clear();
        this._fixedData.length = 0;
        while (this.node.children.length > 0) {
            // this._fixedData.pop().node.destroy();
            // HBMJ_BanlanceFixed._freeNode.put(this.node.children[0]);
            let fixed = this.node.children[0];

            if (cc.isValid(fixed)) {
                // if (cc.sys.isNative && cc.sys.platform === cc.sys.ANDROID) {
                //     fixed.removeFromParent();
                //     fixed.destroy();
                // } else {
                    BBMJ_BanlanceFixed._freeNode.put(fixed);
                // }
            } else {
                ReportError("手牌数据出错！！！");
            }
        }
    }
}
