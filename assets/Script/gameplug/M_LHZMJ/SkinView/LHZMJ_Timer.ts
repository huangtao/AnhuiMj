import { LHZMJMahjongDef, LHZMJ } from "../ConstDef/LHZMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_TimerView extends cc.Component {

    @property(cc.Label)
    lbl_timerNum: cc.Label = null;

    @property(cc.Label)
    lbl_timerNum_2d: cc.Label = null;

    @property([cc.Node])
    img_arrow_2d: cc.Node[] = [];
    
    @property([cc.Node])
    img_arrow: cc.Node[] = [];
    
    @property(cc.Node)
    Node_2d:cc.Node = null;

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
     @property(cc.Sprite)
     img_dipan_2d:cc.Sprite = null;
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
    public showLuoPan(chair:number){
        if(chair==LHZMJMahjongDef.gInvalidChar){
            return;
        }

        if(this.node.active){
            return;
        }

        if(LHZMJ.ins.iclass.is2D()){
            this.img_dipan.node.active = false;
            this.lbl_timerNum.node.active = false;

            this.img_arrow[0].active =false;
            this.img_arrow[1].active =false;
            this.img_arrow[2].active =false;
            this.img_arrow[3].active =false;


            this.img_dipan_2d.node.rotation = 90*chair;
            this.img_dipan_2d.node.active = true;
            this.lbl_timerNum_2d.node.active = true;
        }else{
            this.img_dipan_2d.node.active = false;
            this.lbl_timerNum_2d.node.active = false;

            this.img_arrow[0].active =true;
            this.img_arrow[1].active =true;
            this.img_arrow[2].active =true;
            this.img_arrow[3].active =true;

            this.img_dipan.spriteFrame = this.dipan_res[chair];
            this.lbl_timerNum.node.active = true;
            this.img_Node0[chair].node.active = true;
            this.img_Node1[(chair+1)%4].node.active = true;
            this.img_Node2[(chair+2)%4].node.active = true;
            this.img_Node3[(chair+3)%4].node.active = true;
        }
        this.ArrowNode.node.active = true;
        this.node.active = chair != LHZMJMahjongDef.gInvalidChar;

    }
  
    public set showArrow(chair: number) {
        if(!this.node.active){
        this.showLuoPan(chair);
        }
        this.node.active = chair != LHZMJMahjongDef.gInvalidChar;
        if(!LHZMJ.ins.iclass.is2D()){
            this.img_dipan.node.active = true;
            this.img_arrow[0].active =true;
            this.img_arrow[1].active =true;
            this.img_arrow[2].active =true;
            this.img_arrow[3].active =true;
            
            this.img_dipan_2d.node.active = false;

        }else{
            this.img_dipan.node.active = false;
            this.img_arrow[0].active =false;
            this.img_arrow[1].active =false;
            this.img_arrow[2].active =false;
            this.img_arrow[3].active =false;

            this.img_dipan_2d.node.active = true;
            this.img_dipan_2d.node.rotation = 90*LHZMJ.ins.iclass.getSelfChair();
        }
        
        for (var i: number = 0; i < LHZMJMahjongDef.gPlayerNum; i++) {
            
                if(LHZMJ.ins.iclass.is2D()){
                    this.Node_2d.active = true;
                    this.img_arrow_2d[i].active = (i == LHZMJ.ins.iclass.physical2logicChair(chair));
                }else{
                    this.Node_2d.active =false;
                    this.img_arrow[i].active = (i == LHZMJ.ins.iclass.physical2logicChair(chair));
                }
        }

                 
        if (chair != LHZMJMahjongDef.gInvalidChar) {
                this.ArrowNode.stop();
                this.ArrowNode.play();
        }
        
    }


    public clearAction(): void {
       
        this.ArrowNode.stop();
        this.unscheduleAllCallbacks();
       
    }

    /**
     * 隐藏箭头
     * */
    public hideArrow(): void {
        
    }

    /**
     * 计时器数字
     * */
    public set timerNum(timer: number) {
        if(LHZMJ.ins.iclass.is2D()){
            this.lbl_timerNum.node.active = false;
            this.lbl_timerNum_2d.node.active = true;
            this.lbl_timerNum_2d.string = timer.toString();

        }else{
            this.lbl_timerNum_2d.node.active = false;
            this.lbl_timerNum.node.active = true;
            this.lbl_timerNum.string = timer.toString();
        }
    }
}
