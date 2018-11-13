import { HZMJMahjongDef, HZMJ } from "../ConstDef/HZMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HBMJ_TimerView extends cc.Component {

    @property(cc.Label)
    lbl_timerNum: cc.Label=null;

    @property([cc.Node])
    img_arrow: cc.Node[]=[];
    //private _img_arrows:Array<cc.Sprite>;



    onLoad() {
        // init logic
        //this.init();
        //this.node.active=false;
    }
		
    /**
     * ui创建完成
     * */
    public init(): void {
        // this._img_arrows=new Array<cc.Sprite>();
        // for(var i: number = 0;i < HBMJMahjongDef.gPlayerNum;i++) {
        //     this._img_arrows.push(this.img_arrow[i]);
        // }
        this.node.active=false;
    }
    
    /**
     * 显示计时器箭头
     * */
    public set showArrow(chair:number){
        this.node.active = chair != HZMJMahjongDef.gInvalidChar;
        let action= cc.repeatForever(cc.sequence(cc.fadeTo(0.5, 0), cc.fadeTo(0.5, 255)));
        for(var i:number=0; i<HZMJMahjongDef.gPlayerNum; i++){
            this.img_arrow[i].active= (i == HZMJ.ins.iclass.physical2logicChair(chair));
            if(i == HZMJ.ins.iclass.physical2logicChair(chair)){
                this.img_arrow[i].opacity=255;
                this.img_arrow[i].runAction(action);
            }
            else{
                this.img_arrow[i].stopAllActions();
            }
        }
    }
    
    /**
     * 隐藏箭头
     * */
    public hideArrow():void{
        // for(var i: number = 0;i < HBMJMahjongDef.gPlayerNum;i++) {
        //     this._img_arrow[i].visible = false;
        //     egret.Tween.removeTweens(this._img_arrow[i]);
        // }
    }
    
    /**
     * 计时器数字
     * */
    public set timerNum(timer:number){
        this.lbl_timerNum.string=timer.toString();
    }
}
