import { HZMJ, HZMJSoundDef } from "../ConstDef/HZMJMahjongDef";
import { SetTextureRes } from "../../MJCommon/MJ_Function";
import HZMJEvent from "../HZMJEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_SZAni extends cc.Component {

    @property(cc.Sprite)
    img_sz_1: cc.Sprite=null;

    @property(cc.Sprite)
    img_sz_2: cc.Sprite=null;

    @property(cc.Animation)
    ani_sz_1: cc.Animation=null;

    @property(cc.Animation)
    ani_sz_2: cc.Animation=null;

    private _isStart:boolean;

    private _aniCompleteNum:number;
    //动画结束投递事件编码
    private _msgCode:number;

    onLoad() {
        // init logic
        //this.init();
    }
        
    public init() {
        this.img_sz_1.node.active=false;
        this.img_sz_2.node.active=false;
        this.ani_sz_1.node.active=false;
        this.ani_sz_2.node.active=false;
        this.unscheduleAllCallbacks();
        this.node.active=false;
        this._isStart=true;
    }
		
    public playSZ(sz1:number,sz2:number,msgcode:number):void{   
        if(!this._isStart )
        {
            return;
        }
        this._msgCode = msgcode;
        
        // this.ani_sz_1.node.stopAllActions();
        // this.ani_sz_2.node.stopAllActions();
        this.unscheduleAllCallbacks();


        
        this.img_sz_1.node.active=false;
        this.img_sz_2.node.active=false;
        if(sz1!=0){
            SetTextureRes(`gameres/gameCommonRes/Texture/Mahjong/MJ_SZ/mj_sz_${sz1}_1280`,this.img_sz_1);
        }
        if(sz2!=0){
            SetTextureRes(`gameres/gameCommonRes/Texture/Mahjong/MJ_SZ/mj_sz_${sz2}_1280`,this.img_sz_2);
        }
        
        this._aniCompleteNum=0;
        this.node.active=true;

        this.ani_sz_1.node.active=true;
        this.ani_sz_2.node.active=true;
        // this.ani_sz_1.node.opacity=255;
        // this.ani_sz_2.node.opacity=255;
        this.ani_sz_1.play();
        this.ani_sz_2.play();
        

        
        
        // var callAction1 = cc.callFunc(this.onSZ1AniComplete, this);
        // var callAction2 = cc.callFunc(this.onSZ2AniComplete, this);

        // var action1 = cc.sequence(cc.fadeTo(1, 255),cc.fadeTo(0.1, 0),callAction1);
        // var action2 = cc.sequence(cc.fadeTo(1, 255),cc.fadeTo(0.1, 0),callAction2);
        // //HZMJ.ins.iclass.playMJSound(HZMJSoundDef.sound_sz);
        // this.ani_sz_1.node.runAction(action1);
        // this.ani_sz_2.node.runAction(action2);
        
        this.scheduleOnce(()=>{
            this.onSZ1AniComplete();
            this.onSZ2AniComplete();
        },0.8);
        
    }
    
    public onSZ1AniComplete():void{
        console.log("骰子1"); 
        this.ani_sz_1.stop();

        this.ani_sz_1.node.active=false;
        
        this.img_sz_1.node.active=true;
        
        this.scheduleOnce(()=>{
            this.szComplete();
        },0.2);
        
    }
    
    public onSZ2AniComplete(): void {
        console.log("骰子2"); 
        this.ani_sz_2.stop();

        this.ani_sz_2.node.active=false;
        
        this.img_sz_2.node.active=true;
        
        this.scheduleOnce(()=>{
            this.szComplete();
        },0.2);
    }
    
    private szComplete():void{
        if(!this._isStart )
        {
            return;
        }
        if(++this._aniCompleteNum >= 2){
            
            console.log("骰子完毕");    
            this.node.dispatchEvent(new HZMJEvent(this._msgCode));  
        }
    }
    public StopAni():void{
        this.unscheduleAllCallbacks();
        this._isStart=false;
        this.ani_sz_1.pause();
        this.ani_sz_2.pause();
        this.node.active=false;
    }

    public Clear():void{
        this.unscheduleAllCallbacks();
        this.ani_sz_1.pause();
        this.ani_sz_2.pause();
        this._isStart=true;
        this.node.active=false;
    }
}
