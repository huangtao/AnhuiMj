import { JZMJMahjongDef, JZMJ } from "../ConstDef/JZMJMahjongDef";
import M_JZMJView from '../M_JZMJView';
import M_JZMJVideoView from '../M_JZMJVideoView';
import M_JZMJVideoClass from '../M_JZMJVideoClass';
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
        for(var i:number=0; i<JZMJMahjongDef.gPlayerNum; i++){
            this.img_arrow[i].active = false;
        }
        let _JZMJ:any = null;
        if(isVideo){
            M_JZMJVideoView.ins.TimerView.node.x = 0;
            M_JZMJVideoView.ins.TimerView.node.y = 35;
            _JZMJ = M_JZMJVideoClass.ins;
        }else{
            M_JZMJView.ins.TimerView.node.x = 0;
            M_JZMJView.ins.TimerView.node.y = 35;
            _JZMJ = JZMJ.ins.iclass;
        }
        this.node.active = active != JZMJMahjongDef.gInvalidChar;

        let action= cc.repeatForever(cc.sequence(cc.fadeTo(0.5, 0), cc.fadeTo(0.5, 255)));

        for(var i:number=0; i<JZMJMahjongDef.gPlayerNum; i++){

            this.img_arrow[i].active = (i == _JZMJ.physical2logicChair(active));
          
            if(i == _JZMJ.physical2logicChair(active)){
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

        for(var i:number=0; i<JZMJMahjongDef.gPlayerNum; i++){
            this.img_arrow[i].active = false;
        }

        cc.log(chair+"椅子椅子转移至一字字");

        this.node.active = chair != JZMJMahjongDef.gInvalidChar;

        let action= cc.repeatForever(cc.sequence(cc.fadeTo(0.5, 0), cc.fadeTo(0.5, 255)));
        let _JZMJ = JZMJ.ins.iclass;
        /**
         * 这里有问题 但是显示正常 先不改吧
         */
        if(JZMJ.ins.iclass && !JZMJ.ins.iclass.isVideo)
            _JZMJ = JZMJ.ins.iclass;
        if(M_JZMJVideoClass.ins && M_JZMJVideoClass.ins.isVideo)
            _JZMJ = M_JZMJVideoClass.ins;
        for(var i:number=0; i<JZMJMahjongDef.gPlayerNum; i++){
            this.img_arrow[i].active = (i == _JZMJ.physical2logicChair(chair));
            if(i == _JZMJ.physical2logicChair(chair)){
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
