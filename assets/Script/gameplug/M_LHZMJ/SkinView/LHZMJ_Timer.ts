import { LHZMJMahjongDef, LHZMJ } from "../ConstDef/LHZMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_TimerView extends cc.Component {

    @property(cc.Label)
    lbl_timerNum: cc.Label = null;

    @property([cc.Node])
    img_arrow: cc.Node[] = [];
    //private _img_arrows:Array<cc.Sprite>;
    @property(cc.Animation)
    ArrowNode: cc.Animation=null;
    @property(cc.Sprite)
    img_dipan:cc.Sprite = null;

    @property(cc.Sprite)
    img_Node0:cc.Sprite[] =[];
    @property(cc.Sprite)
    img_Node1:cc.Sprite[] =[];
    @property(cc.Sprite)
    img_Node2:cc.Sprite[] =[];
    @property(cc.Sprite)
    img_Node3:cc.Sprite[] =[];

    @property([cc.SpriteFrame])
    private dipan_res: cc.SpriteFrame[] = [];
    // private _index:number;
    // private _play:boolean;
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
        // for(var i: number = 0;i < LHZMJMahjongDef.gPlayerNum;i++) {
        //     this._img_arrows.push(this.img_arrow[i]);
        // }
        this.node.active = false;
        // this._play=false;
    }
    public  showLuoPan(chair:number){
        if(chair==LHZMJMahjongDef.gInvalidChar){
            return;
        }
        if(this.node.active){
            return;
        }
        this.img_dipan.spriteFrame = this.dipan_res[chair];
        this.img_Node0[chair].node.active = true;
        this.img_Node1[(chair+1)%4].node.active = true;
        this.img_Node2[(chair+2)%4].node.active = true;
        this.img_Node3[(chair+3)%4].node.active = true;
        this.node.active = chair != LHZMJMahjongDef.gInvalidChar;
    }
    // onDisable(){
    //     this._index=0;
    // }
    /**
     * 显示计时器箭头
     * */
    public set showArrow(chair: number) {
        if(!this.node.active){
        this.showLuoPan(chair);
        }
        this.node.active = chair != LHZMJMahjongDef.gInvalidChar;
        this.img_dipan.node.active = true;
        // let action= cc.repeatForever(cc.sequence(cc.fadeTo(0.5, 0), cc.fadeTo(0.5, 255)));
        for (var i: number = 0; i < LHZMJMahjongDef.gPlayerNum; i++) {
            // this.img_arrow[i].stopAllActions();
            // this.img_arrow[i].stop();
            // this.img_arrow[i].active= (i == LHZMJ.ins.iclass.physical2logicChair(chair));
            // if (chair != LHZMJMahjongDef.gInvalidChar) {
                this.img_arrow[i].active = (i == LHZMJ.ins.iclass.physical2logicChair(chair));
                // if (i == LHZMJ.ins.iclass.physical2logicChair(chair)) {
                //     // this.img_arrow[i].opacity=255;
                //     // this.img_arrow[i].runAction(action);
                //     this.img_arrow[i].play();
                // }
            // }
        }
        if (chair != LHZMJMahjongDef.gInvalidChar) {
            this.ArrowNode.stop();
            this.ArrowNode.play();
            // this._index=0;
            // this._play=true;
        }
    }

    // update(){
    //     // if(this._play){
    //     //     if(this._index==0){
    //     //         this.ArrowNode.node.opacity=0;
    //     //     }else if(this._index==5){
    //     //         this.ArrowNode.node.opacity=40;
    //     //     }else if(this._index==10){
    //     //         this.ArrowNode.node.opacity=80;
    //     //     }else if(this._index==15){
    //     //         this.ArrowNode.node.opacity=120;
    //     //     }else if(this._index==20){
    //     //         this.ArrowNode.node.opacity=160;
    //     //     }else if(this._index==25){
    //     //         this.ArrowNode.node.opacity=205;
    //     //     }else if(this._index==30){
    //     //         this.ArrowNode.node.opacity=255;
    //     //     }else if(this._index==35){
    //     //         this.ArrowNode.node.opacity=205;
    //     //     }else if(this._index==40){
    //     //         this.ArrowNode.node.opacity=160;
    //     //     }else if(this._index==45){
    //     //         this.ArrowNode.node.opacity=120;
    //     //     }else if(this._index==50){
    //     //         this.ArrowNode.node.opacity=80;
    //     //     }else if(this._index==55){
    //     //         this.ArrowNode.node.opacity=40;
    //     //     }else if(this._index>59){
    //     //         this.ArrowNode.node.opacity=0;
    //     //         this._index=0;
    //     //     }
    //     //     this._index++;
    //     // }
    //     if(this._play){
    //         if(this._index%3==0){
    //             if(this._index>30){
    //                 this.ArrowNode.node.opacity=(60-this._index)/5*30+75;
    //             }else{
    //                 this.ArrowNode.node.opacity=this._index/5*30+75;
    //             }
    //         }
            
    //         if(this._index>59){
    //             this.ArrowNode.node.opacity=75;
    //             this._index=0;
    //         }
    //         this._index++;
    //     }
    // }

    public clearAction(): void {
        // for (var i: number = 0; i < LHZMJMahjongDef.gPlayerNum; i++) {
        //     // this.img_arrow[i].stopAllActions();
        //     this.img_arrow[i].stop();
        // }
        this.ArrowNode.stop();
        this.unscheduleAllCallbacks();
        // this._play=false;
    }

    /**
     * 隐藏箭头
     * */
    public hideArrow(): void {
        // for(var i: number = 0;i < LHZMJMahjongDef.gPlayerNum;i++) {
        //     this._img_arrow[i].visible = false;
        //     egret.Tween.removeTweens(this._img_arrow[i]);
        // }
    }

    /**
     * 计时器数字
     * */
    public set timerNum(timer: number) {
        this.lbl_timerNum.string = timer.toString();
    }
}
