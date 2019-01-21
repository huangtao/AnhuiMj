import { MGMJMahjongDef, MGMJ } from '../ConstDef/MGMJMahjongDef';
import M_MGMJView from '../M_MGMJView';
import M_MGMJVideoView from "../M_MGMJVideoView";

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
        if(MGMJ.ins.iclass.is2D()){
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
            this.showArr(MGMJ.ins.iclass.getSelfChair(),MGMJ.ins.iclass.getSelfChair());
        }
    }

    public showArr(active:number,self:number,isVideo:boolean = false){
        if(active == 255){
            //图片下标
            if(MGMJ.ins.iclass.is2D()){
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
        for(var i:number=0; i<MGMJMahjongDef.gPlayerNum; i++){
            if(MGMJ.ins.iclass.is2D()){
                this.img_arrow_2d[i].active =false;
            }else{
                this.img_arrow[i].active = false;
            }
        }

        if(isVideo){
            M_MGMJVideoView.ins.TimerView.node.x = 0;
            M_MGMJVideoView.ins.TimerView.node.y = 35;
        }else{
            M_MGMJView.ins.TimerView.node.x = 0;
            M_MGMJView.ins.TimerView.node.y = 35;
        }
        this.node.active = active != MGMJMahjongDef.gInvalidChar;

        let action= cc.repeatForever(cc.sequence(cc.fadeTo(0.5, 0), cc.fadeTo(0.5, 255)));

        for(var i:number=0; i<MGMJMahjongDef.gPlayerNum; i++){
            if (MGMJ.ins.iclass.is2D()) {
                this.Node_3d.active = false;

                this.Node_2d.active =true;
                this.img_arrow_2d[i].active = (i == MGMJ.ins.iclass.physical2logicChair(active));
                this.img_arrow_2d[i].opacity = 255;
                this.img_arrow_2d[i].runAction(action);

            }else{
                this.Node_2d.active = false;

                this.Node_3d.active = true;
                this.img_arrow[i].active = (i == MGMJ.ins.iclass.physical2logicChair(active));
          
                if(i == MGMJ.ins.iclass.physical2logicChair(active)){
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
        if(MGMJ.ins.iclass.is2D()){
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
        for(var i:number=0; i<MGMJMahjongDef.gPlayerNum; i++){
            this.img_arrow[i].active = false;
            this.img_arrow_2d[i].active = false;
        }

        this.node.active = chair != MGMJMahjongDef.gInvalidChar;

        let action= cc.repeatForever(cc.sequence(cc.fadeTo(0.5, 0), cc.fadeTo(0.5, 255)));
        for(var i:number=0; i<MGMJMahjongDef.gPlayerNum; i++){
            if(MGMJ.ins.iclass.is2D()){
                this.Node_3d.active = false;
                
                this.Node_2d.active = true;
                this.img_arrow_2d[i].active = (i == MGMJ.ins.iclass.physical2logicChair(chair));
                if (i == MGMJ.ins.iclass.physical2logicChair(chair)) {
                    this.img_arrow_2d[i].opacity=255;
                    this.img_arrow_2d[i].runAction(action);
                }else{
                    this.img_arrow_2d[i].stopAllActions();
                }
            }else{
                this.Node_2d.active =false;

                this.Node_3d.active = true;
                this.img_arrow[i].active = (i == MGMJ.ins.iclass.physical2logicChair(chair));
                if(i == MGMJ.ins.iclass.physical2logicChair(chair)){
                    this.img_arrow[i].opacity=255;
                    this.img_arrow[i].runAction(action);
                }
                else{
                    this.img_arrow[i].stopAllActions();
                }
            }
        }
        //图片下标
        if(MGMJ.ins.iclass.is2D()){
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
        if (MGMJ.ins.iclass.is2D()) {
            this.lbl_timerNum.node.active = false;
            this.lbl_timerNum_2d.node.active = true;
            this.lbl_timerNum_2d.string = Math.abs(timer).toString();
        }else{
            this.lbl_timerNum_2d.node.active = false;
            this.lbl_timerNum.node.active = true;
            this.lbl_timerNum.string = Math.abs(timer).toString();
                
        }
        
    }
}
