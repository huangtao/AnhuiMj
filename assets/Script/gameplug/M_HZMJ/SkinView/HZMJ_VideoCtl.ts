import M_HZMJVideoClass from "../M_HZMJVideoClass";
import { HZMJ } from "../ConstDef/HZMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_VideoCtl extends cc.Component {

    @property(cc.Button)
    private btn_exit: cc.Button=null;
    @property(cc.Button)
    private btn_play: cc.Button=null;
    @property(cc.Button)
    private btn_pause: cc.Button=null;
    @property(cc.Button)
    private btn_fastSpeed: cc.Button=null;
    @property(cc.Button)
    private btn_normalSpeed: cc.Button=null;
    @property(cc.Label)
    private lbl_speed: cc.Label=null;


    private _speed: number;

    onLoad() {
        // init logic
        this.btn_exit.node.on("click", () => {
            HZMJ.ins.iclass.exit();    
        },this);
        
        this.btn_play.node.on("click", () => {
            M_HZMJVideoClass.ins.Resume();
            this.btn_play.node.active=false;
            this.btn_pause.node.active=true;
            
            this.btn_fastSpeed.enabled=true;
            this.btn_normalSpeed.enabled=true;
        },this);
        this.btn_pause.node.on("click", () => {
            M_HZMJVideoClass.ins.Pause();
            this.btn_play.node.active = true;
            this.btn_pause.node.active = false;
            
            this.btn_fastSpeed.enabled = false;
            this.btn_normalSpeed.enabled = false;
        },this);
        
        this.btn_fastSpeed.node.on("click", () => {
            if(M_HZMJVideoClass.ins.Fastforward()){
                this.speed = this._speed * 2;
            }
            if(M_HZMJVideoClass.ins.VideoSpeed < 400){
                this.btn_fastSpeed.node.active=false;
                this.btn_normalSpeed.node.active=true;
            }
        },this);
        this.btn_normalSpeed.node.on("click", () => {
            M_HZMJVideoClass.ins.ResumeNormalSpeed();           
            this.btn_fastSpeed.node.active = true;
            this.btn_normalSpeed.node.active = false;
            this.speed=1;
        },this);
    }
    public init():void{
        this.node.active=false;
    }

    private set speed(value:number){
        this._speed = value;
        this.lbl_speed.string = `x${this._speed}`;
        this.lbl_speed.node.active = true;
    }
    
    public start():void{
        this.btn_pause.node.active=true;
        this.btn_play.node.active=false;
        
        this.btn_fastSpeed.node.active=true;
        this.btn_normalSpeed.node.active=false;
        
        this._speed=1;

        this.node.active=true;
    }
    
    public end():void{
        this.btn_play.enabled=false;
        this.btn_pause.enabled=false;
        
        this.btn_fastSpeed.enabled=false;
        this.btn_normalSpeed.enabled=false;
    }
}
