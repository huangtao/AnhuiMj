import { TDHMJMahjongDef, TDHMJ } from "../ConstDef/TDHMJMahjongDef";
import M_TDHMJView from '../M_TDHMJView';
import M_TDHMJVideoView from '../M_TDHMJVideoView';
import M_TDHMJVideoClass from '../M_TDHMJVideoClass';
import { IBiJiClass } from '../../M_BiJi/GameHelp/BJ_IBiJiClass';

const { ccclass, property } = cc._decorator;

@ccclass
export default class HBMJ_TimerView extends cc.Component {

    @property(cc.Sprite)
    img_fangxiang:cc.Sprite = null;

    @property(cc.Label)
    lbl_timerNum_2d: cc.Label = null;

    @property(cc.Label)
    lbl_timerNum: cc.Label=null;

    @property([cc.Node])
    img_arrow: cc.Node[]=[];
    
    @property([cc.Node])
    img_arrow_2d: cc.Node[] = [];

    @property(cc.Node)
    Node_2d:cc.Node = null;

    @property(cc.Node)
    Node_3d:cc.Node = null;
    
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

    @property(cc.Sprite)
    img_dipan:cc.Sprite = null;
    @property(cc.Sprite)
    img_dipan_2d:cc.Sprite = null;



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

    public showLuoPan(){
        if(TDHMJ.ins.iclass.is2D()){
            this.img_dipan.node.active = false;
            this.lbl_timerNum.node.active = false;

            this.img_arrow[0].active =false;
            this.img_arrow[1].active =false;
            this.img_arrow[2].active =false;
            this.img_arrow[3].active =false;

            // this.img_dipan_2d.node.rotation = 90*chair;
            this.img_dipan_2d.node.active = true;
            this.lbl_timerNum_2d.node.active = true;
        }else{
            this.img_dipan_2d.node.active = false;
            this.lbl_timerNum_2d.node.active = false;
            this.showArr(TDHMJ.ins.iclass.getSelfChair(),TDHMJ.ins.iclass.getSelfChair());
        }
    }
    public showArr(active:number,self:number,isVideo:boolean = false){
        let _TDHMJ:any = null;
        if(isVideo)
            _TDHMJ = M_TDHMJVideoClass.ins;
        else
            _TDHMJ = TDHMJ.ins.iclass;
        if(active == 255){
            //图片下标
            if(_TDHMJ.is2D()){
                this.img_fangxiang.node.active = false;
                this.img_dipan_2d.node.rotation = 90*self;
                this.img_dipan_2d.node.active = true;
            }else{
                this.img_dipan_2d.node.active = false;
                this.img_fangxiang.spriteFrame=this.fangxiang[self];
                this.img_fangxiang.node.active = true;
            }
            return;
        }
        for(var i:number=0; i<TDHMJMahjongDef.gPlayerNum; i++){
            if(_TDHMJ.is2D()){
                this.img_arrow_2d[i].active =false;
            }else{
                this.img_arrow[i].active = false;
            }
        }

        if(isVideo){
            M_TDHMJVideoView.ins.TimerView.node.x = 0;
            M_TDHMJVideoView.ins.TimerView.node.y = 35;
        }else{
            M_TDHMJView.ins.TimerView.node.x = 0;
            M_TDHMJView.ins.TimerView.node.y = 35;
        }
        this.node.active = active != TDHMJMahjongDef.gInvalidChar;

        let action= cc.repeatForever(cc.sequence(cc.fadeTo(0.5, 0), cc.fadeTo(0.5, 255)));

        for(var i:number=0; i<TDHMJMahjongDef.gPlayerNum; i++){
            if (_TDHMJ.is2D()) {
                this.Node_3d.active = false;

                this.Node_2d.active =true;
                this.img_arrow_2d[i].active = (i == _TDHMJ.physical2logicChair(active));
                this.img_arrow_2d[i].opacity = 255;
                this.img_arrow_2d[i].runAction(action);

            }else{
                this.Node_2d.active = false;

                this.Node_3d.active = true;
                this.img_arrow[i].active = (i == _TDHMJ.physical2logicChair(active));
          
                if(i == _TDHMJ.physical2logicChair(active)){
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
            
        }
        //图片下标
        if(_TDHMJ.is2D()){
            this.img_fangxiang.node.active = false;
            
            this.img_dipan_2d.node.rotation = 90*self;
            this.img_dipan_2d.node.active = true;
        }else{
            this.img_dipan_2d.node.active = false;

            this.img_fangxiang.spriteFrame=this.fangxiang[self];
            this.img_fangxiang.node.active = true;    
        }
        
    }
    /**
     * 显示计时器箭头
     * */
    public set showArrow(chair:number){

        for(var i:number=0; i<TDHMJMahjongDef.gPlayerNum; i++){
            this.img_arrow[i].active = false;
            this.img_arrow_2d[i].active = false;
        }

        this.node.active = chair != TDHMJMahjongDef.gInvalidChar;

        let action= cc.repeatForever(cc.sequence(cc.fadeTo(0.5, 0), cc.fadeTo(0.5, 255)));
        let _lqmj = TDHMJ.ins.iclass;
        /**
         * 这里有问题 但是显示正常 先不改吧
         */
        if(TDHMJ.ins.iclass && !TDHMJ.ins.iclass.isVideo)
            _lqmj = TDHMJ.ins.iclass;
        if(M_TDHMJVideoClass.ins && M_TDHMJVideoClass.ins.isVideo)
            _lqmj = M_TDHMJVideoClass.ins;
        for(var i:number=0; i<TDHMJMahjongDef.gPlayerNum; i++){
            if(_lqmj.is2D()){
                this.Node_3d.active = false;
                
                this.Node_2d.active = true;
                this.img_arrow_2d[i].active = (i == _lqmj.physical2logicChair(chair));
                if (i == _lqmj.physical2logicChair(chair)) {
                    this.img_arrow_2d[i].opacity=255;
                    this.img_arrow_2d[i].runAction(action);
                }else{
                    this.img_arrow_2d[i].stopAllActions();
                }
            }else{
                this.Node_2d.active =false;

                this.Node_3d.active = true;
                this.img_arrow[i].active = (i == _lqmj.physical2logicChair(chair));
                if(i == _lqmj.physical2logicChair(chair)){
                    this.img_arrow[i].opacity=255;
                    this.img_arrow[i].runAction(action);
                }
                else{
                    this.img_arrow[i].stopAllActions();
                }
            }
        }
        //图片下标
        if(_lqmj.is2D()){
            this.img_fangxiang.node.active = false;
            this.img_dipan_2d.node.rotation = 90*chair;
            this.img_dipan_2d.node.active = true;
        }else{
            this.img_dipan_2d.node.active = false;
            this.img_fangxiang.spriteFrame=this.fangxiang[chair];
            this.img_fangxiang.node.active = true;
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
        if (TDHMJ.ins.iclass.is2D()) {
            this.lbl_timerNum.node.active = false;
            this.lbl_timerNum_2d.node.active = true;
            this.lbl_timerNum_2d.string = timer.toString();
        }else{
            this.lbl_timerNum_2d.node.active = false;
            this.lbl_timerNum.node.active = true;
            this.lbl_timerNum.string=timer.toString();
                
        }
        
    }
}
