import { TingCardTip } from "../ConstDef/LQMJMahjongDef";
import M_LQMJClass from "../M_LQMJClass";
import LQMJ_SingleTingCardTip from "./LQMJ_SingleTingCardTip";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LQMJ_TingTip extends cc.Component {

    //背景
    @property(cc.Sprite)
    img_bg: cc.Sprite=null;

    @property(cc.Prefab)
    LQMJ_SingleTingCard_Tip: cc.Prefab=null;

    @property(cc.ScrollView)
    scroll:cc.ScrollView=null;

    @property(cc.Node)
    maskRect:cc.Node=null;

    @property(cc.Node)
    showNode:cc.Node=null;

    @property(cc.Label)
    countHU:cc.Label = null;

    //结算
    private _singleTingCard: LQMJ_SingleTingCardTip;
    /**
     * 结算视图
     * */
    public get SingleTingCard(): LQMJ_SingleTingCardTip {
        return this._singleTingCard;
    }
     public static _freeNode=new cc.NodePool();

    onLoad() {
        // init logic
       // this.init();
    }
    	
    //听牌提示
    private _tingCardAry: Array<LQMJ_SingleTingCardTip>;

    public init() {
        this.node.active = false;
        if(this._tingCardAry!=null)
        {
            while (this._tingCardAry.length > 0) {
               // this._tingCardAry.pop().node.destroy();
                LQMJ_TingTip._freeNode.put(this._tingCardAry.pop().node);
            }
        }else{
            this._tingCardAry = new Array<LQMJ_SingleTingCardTip>();
        }
        
    }

    /**
     * 显示听牌提示
     * */
    public showTingTip(tingTip: Array<TingCardTip>,tips:boolean): void {
        if ((null == tingTip) || (tingTip.length < 1)) {
            this.node.active = false;
            return;
        }
        while (this._tingCardAry.length > 0) {
         //   this._tingCardAry.pop().node.destroy();
         LQMJ_TingTip._freeNode.put(this._tingCardAry.pop().node);
        }

        this.node.x = 0;
        this.node.y = -170;
        //设置背景宽度
       // M_LQMJView.ins.TingTip.node.x=-330;
        let startPos : number = 0;
        if(tingTip.length>4){
            this.node.x = -330;
            this.img_bg.node.width = 400;        
            // startPos = -400;
            // this.img_bg.node.width = 500;
            // this.scroll.horizontal = true;
            // this.scroll.node.width = -50 + tingTip.length*70;
            //this.scroll.node.x = -10;
            // this.showNode.x = -330 + 50;
            // this.showNode.width = 420;
        }
        else{
            //第一张牌的横坐标
            // startPos=-610+ (6-tingTip.length) * 70;
            //框的位置
            this.node.x = -330 ;//+ (6-tingTip.length) * 60;
            this.img_bg.node.width = 400 - (6-tingTip.length)*35;//400 - (6-tingTip.length)*35
            if(tingTip.length == 1)
                this.img_bg.node.width = 400-35*5-40;
            if(tingTip.length == 2)
                this.img_bg.node.width = 260;
            if(tingTip.length == 3)
                this.img_bg.node.width = 400-35*3+30;
            if(tingTip.length == 4)
                this.img_bg.node.width = 400-70+80;
            //框的长度
            // this.img_bg.node.width = 500 - 70*(6-tingTip.length);
            //滑动容器
            // this.scroll.horizontal = false;
            // this.scroll.node.active = false;
            //可胡的牌
            // this.showNode.x = -330 + 50;
            // this.showNode.width = this.img_bg.node.width - 80;
        }
        // this.showNode.width=maxwidth;
        
        // if(maxwidth>1280)
        //     this.img_bg.node.width=1280;
        // else
        //     this.img_bg.node.width=maxwidth;
        // if(tips){
        //     if(maxwidth>1080){
        //         this.scroll.node.width = 1080;         
        //         this.scroll.node.x  = 719 - 80;
        //         this.scroll.horizontal = true;
        //     }else{
        //         this.scroll.node.width = maxwidth-100;
        //         this.scroll.node.x  = 719 - (1280-maxwidth)/2+44;
        //         this.scroll.horizontal = false;
        //     }    
        // }else{
        //     if(maxwidth>1280)
        //         this.scroll.node.width=1280;
        //     else
        //         this.scroll.node.width=maxwidth;
        //     this.scroll.node.x =719;
        //     this.scroll.horizontal = true;
        // }
        console.log(`滑动框宽度：${this.showNode.width}`);

        //this.scroll.scrollToLeft();

        //添加听牌提示
        this.img_bg.node.opacity = 210;
        for (var i: number = 0; i < tingTip.length; i++) {
          let singleTip = LQMJ_TingTip._freeNode.get();
            if (!cc.isValid(singleTip)) {
                singleTip = cc.instantiate(this.LQMJ_SingleTingCard_Tip);
            }
            this._singleTingCard=singleTip.getComponent<LQMJ_SingleTingCardTip>(LQMJ_SingleTingCardTip);
            this._singleTingCard.setData(tingTip[i]);
            
            this.showNode.addChild(singleTip);

            this._tingCardAry.push(this._singleTingCard);
            // this._singleTingCard.node.x = startPos + i*70;
            // this._singleTingCard.node.y = 10;
        }
        // if(tips&&maxwidth>1280){
        //     this._singleTingCard.node.x = 200;
        //     this._singleTingCard.node.y = 10;
        // }else{
        // }
        let countHu:number = 0;
        for(let i:number = 0;i<tingTip.length;i++){
            countHu += tingTip[i].leftCardNum;
        }
        this.countHU.string = countHu.toString();
        cc.log("显示全部听牌！！！");
        this.node.active = true;
    }
    /**
     * 获取尺寸
     * */
    public get size(): { width: number, height: number } {
        if (this.img_bg == null) {
            return { width: 20, height: 100 };
        }
        return { width: this.img_bg.node.width, height: 100 };
    }
}

