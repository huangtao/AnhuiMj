import { TingCardTip } from "../ConstDef/HZMJMahjongDef";
import M_HZMJClass from "../M_HZMJClass";
import HZMJ_SingleTingCardTip from "./HZMJ_SingleTingCardTip";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_TingTip extends cc.Component {

    //背景
    @property(cc.Sprite)
    img_bg: cc.Sprite=null;

    @property(cc.Prefab)
    HZMJ_SingleTingCard_Tip: cc.Prefab=null;
    //结算
    private _singleTingCard: HZMJ_SingleTingCardTip;
    /**
     * 结算视图
     * */
    public get SingleTingCard(): HZMJ_SingleTingCardTip {
        return this._singleTingCard;
    }
     public static _freeNode=new cc.NodePool();

    onLoad() {
        // init logic
       // this.init();
    }
    	
    //听牌提示
    private _tingCardAry: Array<HZMJ_SingleTingCardTip>;

    public init() {
        this.node.active = false;
        if(this._tingCardAry!=null)
        {
            while (this._tingCardAry.length > 0) {
               // this._tingCardAry.pop().node.destroy();
                HZMJ_TingTip._freeNode.put(this._tingCardAry.pop().node);
            }
        }else{
            this._tingCardAry = new Array<HZMJ_SingleTingCardTip>();
        }
        
    }

    /**
     * 显示听牌提示
     * */
    public showTingTip(tingTip: Array<TingCardTip>): void {
        if ((null == tingTip) || (tingTip.length < 1)) {
            this.node.active = false;
            return;
        }

        while (this._tingCardAry.length > 0) {
         //   this._tingCardAry.pop().node.destroy();
         HZMJ_TingTip._freeNode.put(this._tingCardAry.pop().node);
        }

        //设置背景宽度
        this.img_bg.node.width = 90 + tingTip.length * 120 - 40;

        //添加听牌提示
        this.img_bg.node.opacity = 210;
        for (var i: number = 0; i < tingTip.length; i++) {
            //var singleTip: HZMJ_SingleTingCardTip = new HZMJ_SingleTingCardTip();

          //  let singleTip=cc.instantiate(this.HZMJ_SingleTingCard_Tip);
          let singleTip = HZMJ_TingTip._freeNode.get();
            if (!cc.isValid(singleTip)) {
                singleTip = cc.instantiate(this.HZMJ_SingleTingCard_Tip);
            }
            this._singleTingCard=singleTip.getComponent<HZMJ_SingleTingCardTip>(HZMJ_SingleTingCardTip);
            this._singleTingCard.setData(tingTip[i]);
            
            this._singleTingCard.node.x = 90 + i * 120;
            this._singleTingCard.node.y = 0;
            
            this.node.addChild(singleTip);

            this._tingCardAry.push(this._singleTingCard);
        }
        cc.log("显示全部听牌！！！");
        this.node.active = true;
    }

    /**
     * 获取尺寸
     * */
    public get size(): { width: number, height: number } {
        if (this.img_bg == null) {
            return { width: 20, height: 80 };
        }
        return { width: this.img_bg.node.width, height: 80 };
    }
}

