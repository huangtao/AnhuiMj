import { HQMJMahjongDef, HQMJ } from "../ConstDef/HQMJMahjongDef";
import M_HQMJView from '../M_HQMJView';
import M_HQMJVideoView from '../M_HQMJVideoView';
import M_HQMJVideoClass from '../M_HQMJVideoClass';
import { IBiJiClass } from '../../M_BiJi/GameHelp/BJ_IBiJiClass';

const { ccclass, property } = cc._decorator;

@ccclass
export default class HBMJ_TimerView extends cc.Component {

    @property(cc.Sprite)
    img_fangxiang:cc.Sprite = null;

    @property(cc.Label)
    lbl_timerNum: cc.Label=null;

    @property([cc.Node])
    img_arrow: cc.Node[]=[];
    //private _img_arrows:Array<cc.Sprite>;

    @property([cc.Animation])
    ArrowNode: cc.Animation[]=[];

    @property([cc.SpriteFrame])
    fangxiang:cc.SpriteFrame[] = [];

    @property([cc.Sprite])
    sprite_0:cc.Sprite[] = [];
    @property([cc.Sprite])
    sprite_1:cc.Sprite[] = [];
    @property([cc.Sprite])
    sprite_2:cc.Sprite[] = [];
    @property([cc.Sprite])
    sprite_3:cc.Sprite[] = [];


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
    public showArr(active:number,self:number,isVideo:boolean = false){
        if(active == 255){
            //图片下标
            this.img_fangxiang.spriteFrame=this.fangxiang[self];
            this.img_fangxiang.node.active = true;
            return;
        }
        for(var i:number=0; i<HQMJMahjongDef.gPlayerNum; i++){
            this.img_arrow[i].active = false;
        }
        let _HQMJ:any = null;
        if(isVideo){
            M_HQMJVideoView.ins.TimerView.node.x = 0;
            M_HQMJVideoView.ins.TimerView.node.y = 35;
            _HQMJ = M_HQMJVideoClass.ins;
        }else{
            M_HQMJView.ins.TimerView.node.x = 0;
            M_HQMJView.ins.TimerView.node.y = 35;
            _HQMJ = HQMJ.ins.iclass;
        }
        this.node.active = active != HQMJMahjongDef.gInvalidChar;

        let action= cc.repeatForever(cc.sequence(cc.fadeTo(0.5, 0), cc.fadeTo(0.5, 255)));

        for(var i:number=0; i<HQMJMahjongDef.gPlayerNum; i++){

            this.img_arrow[i].active = (i == _HQMJ.physical2logicChair(active));
          
            if(i == _HQMJ.physical2logicChair(active)){
                if(i==0)
                    this.sprite_0[active].node.active = true;
                if(i==1)
                    this.sprite_1[active].node.active = true;
                if(i==2)
                    this.sprite_2[active].node.active = true;
                if(i==3)
                    this.sprite_3[active].node.active = true;
                this.img_arrow[i].opacity=255;
                this.img_arrow[i].runAction(action);
                for(var a=0;a<4;a++){
                    if(a != active){
                        this.sprite_0[a].node.active = false;
                        this.sprite_1[a].node.active = false;
                        this.sprite_2[a].node.active = false;
                        this.sprite_3[a].node.active = false;
                    }
                }
            }
            else{
                this.img_arrow[i].active = false;
                this.img_arrow[i].stopAllActions();
            }
        }
        //图片下标
        this.img_fangxiang.spriteFrame=this.fangxiang[self];
        this.img_fangxiang.node.active = true;
    }
    /**
     * 显示计时器箭头
     * */
    public set showArrow(chair:number){

        for(var i:number=0; i<HQMJMahjongDef.gPlayerNum; i++){
            this.img_arrow[i].active = false;
        }

        cc.log(chair+"椅子椅子转移至一字字");

        this.node.active = chair != HQMJMahjongDef.gInvalidChar;

        let action= cc.repeatForever(cc.sequence(cc.fadeTo(0.5, 0), cc.fadeTo(0.5, 255)));
        let _hqmj = HQMJ.ins.iclass;
        /**
         * 这里有问题 但是显示正常 先不改吧
         */
        if(HQMJ.ins.iclass && !HQMJ.ins.iclass.isVideo)
            _hqmj = HQMJ.ins.iclass;
        if(M_HQMJVideoClass.ins && M_HQMJVideoClass.ins.isVideo)
            _hqmj = M_HQMJVideoClass.ins;
        for(var i:number=0; i<HQMJMahjongDef.gPlayerNum; i++){
            this.img_arrow[i].active = (i == _hqmj.physical2logicChair(chair));
            if(i == _hqmj.physical2logicChair(chair)){
                this.img_arrow[i].opacity=255;
                this.img_arrow[i].runAction(action);
            }
            else{
                this.img_arrow[i].stopAllActions();
            }
        }
        //图片下标
        this.img_fangxiang.spriteFrame=this.fangxiang[chair];
        this.img_fangxiang.node.active = true;
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
