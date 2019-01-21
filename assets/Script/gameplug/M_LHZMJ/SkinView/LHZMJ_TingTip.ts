import { TingCardTip } from "../ConstDef/LHZMJMahjongDef";
import M_LHZMJClass from "../M_LHZMJClass";
import LHZMJ_SingleTingCardTip from "./LHZMJ_SingleTingCardTip";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_TingTip extends cc.Component {

    //背景
    @property(cc.Sprite)
    img_bg: cc.Sprite=null;

    @property(cc.Prefab)
    LHZMJ_SingleTingCard_Tip: cc.Prefab=null;

     @property(cc.ScrollView)
    scroll:cc.ScrollView=null;

    @property(cc.Node)
    maskRect:cc.Node=null;

    @property(cc.Node)
    showNode:cc.Node=null;

    @property(cc.Node)
    img_hu: cc.Node=null;

    @property(cc.Sprite)
    img_zhezhao: cc.Sprite=null;
    @property(cc.Label)
    countHU:cc.Label = null;


    //结算
    private _singleTingCard: LHZMJ_SingleTingCardTip;
    /**
     * 结算视图
     * */
    public get SingleTingCard(): LHZMJ_SingleTingCardTip {
        return this._singleTingCard;
    }
     public static _freeNode=new cc.NodePool();

    onLoad() {
        // init logic
       // this.init();
    }
    	
    //听牌提示
    private _tingCardAry: Array<LHZMJ_SingleTingCardTip>;

    public init() {
        this.node.active = false;
        this.img_zhezhao.node.active = false;
        if(this._tingCardAry!=null)
        {
            while (this._tingCardAry.length > 0) {
               // this._tingCardAry.pop().node.destroy();
                LHZMJ_TingTip._freeNode.put(this._tingCardAry.pop().node);
            }
        }else{
            this._tingCardAry = new Array<LHZMJ_SingleTingCardTip>();
        }
        
    }

    /**
     * 显示听牌提示
     * */
    public showTingTip(tingTip: Array<TingCardTip>, tips:boolean): void {
        if ((null == tingTip) || (tingTip.length < 1)) {
            this.node.active = false;
            return;
        }

        while (this._tingCardAry.length > 0) {
         //   this._tingCardAry.pop().node.destroy();
         LHZMJ_TingTip._freeNode.put(this._tingCardAry.pop().node);
        }
        this.node.y = -167;
        this.node.x = -500;
       let startPos : number = 0;
        if(tingTip.length>4){
            this.img_bg.node.width = 450;        
        }
        else{
            this.img_bg.node.width = 400 - (4-tingTip.length)*80;//400 - (6-tingTip.length)*35
            // if(tingTip.length == 1)
            //     this.img_bg.node.width = 400-35*5-40;
            // if(tingTip.length == 2)
            //     this.img_bg.node.width = 260;
            // if(tingTip.length == 3)
            //     this.img_bg.node.width = 400-35*3+30;
            // if(tingTip.length == 4)
            //     this.img_bg.node.width = 400-70+80;
        }
        //设置背景宽度
       // this.img_bg.node.width = 90 + tingTip.length * 120 - 40;

        //  let maxwidth=120 + tingTip.length * 80 - 40;
        // this.showNode.width=maxwidth;
        // if(maxwidth>680){
        //     //this.maskRect.width=1280;
        //     this.img_bg.node.width=680;
        //     //this.scroll.node.width=1280;
        // }
        // else{
        //     //this.maskRect.width=maxwidth;
        //     this.img_bg.node.width=maxwidth;
        // }
        // if(tips){
            // if(maxwidth>680){
            //     this.scroll.node.width = 980;
            //     this.img_zhezhao.node.active = false;
               
            //     //this.maskRect.width = 880;
            //     this.scroll.node.x  = 719 - 80-200-20;
            //     this.scroll.horizontal = true;
            //     this.img_hu.x = 9;
            //     this.img_zhezhao.node.x = 200;
            //    // this.maskRect.x = 20;
            // }else{
            //     this.scroll.node.width = maxwidth-100;
            //     //this.maskRect.width =maxwidth -100;
            //     this.scroll.node.x  = 719 - (680-maxwidth)/2+44-300;
            //     this.scroll.horizontal = false;
            //     this.img_zhezhao.node.active = false;
            // }
        
        
        // }else{
        //     this.scroll.node.x =719-300;
        //     this.scroll.node.width=680;
        //     this.scroll.horizontal = true;
        //     this.img_hu.x = 9;
        //     this.img_zhezhao.node.active = false;
        // }

        
        // console.log(`滑动框宽度：${this.showNode.width}`);

        this.scroll.scrollToLeft();

        //添加听牌提示
        this.img_bg.node.opacity = 210;
        for (var i: number = 0; i < tingTip.length; i++) {
            //var singleTip: LHZMJ_SingleTingCardTip = new LHZMJ_SingleTingCardTip();

          //  let singleTip=cc.instantiate(this.LHZMJ_SingleTingCard_Tip);
          let singleTip = LHZMJ_TingTip._freeNode.get();
            if (!cc.isValid(singleTip)) {
                singleTip = cc.instantiate(this.LHZMJ_SingleTingCard_Tip);
            }
            this._singleTingCard=singleTip.getComponent<LHZMJ_SingleTingCardTip>(LHZMJ_SingleTingCardTip);
            this._singleTingCard.setData(tingTip[i]);
            // if(tips&&maxwidth>680){
            // this._singleTingCard.node.x = 214 + i * 80;
            this._singleTingCard.node.y = 0;
            // }else{
            // this._singleTingCard.node.x = 30 + i * 80;
            // this._singleTingCard.node.y = 0;
            // }
            
            
            this.showNode.addChild(singleTip);

            this._tingCardAry.push(this._singleTingCard);
        }
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
            return { width: 20, height: 80 };
        }
        return { width: this.img_bg.node.width, height: 80 };
    }
}

