import { SetTextureRes } from "../../MJCommon/MJ_Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_Ani extends cc.Component {

    @property(cc.Sprite)
    img_ani: cc.Sprite=null;

    @property(cc.Animation)
    img_animation: cc.Animation=null;

    @property(cc.Animation)
    eff_animation: cc.Animation=null;

    onLoad() {
        // init logic
        
    }

    public init():void{
        this.img_animation.stop();
        this.eff_animation.stop();
        this.node.active=false;
    }

    private loc: Array<{ x: number,y: number }> = [
        { x: 0,y: -170 },
        { x: 350,y: 20 },
        { x: 0,y: 220 },
        { x: -350,y: 20 }
    ]; 

    public PlayAni(url:string,chair:number):void{
        this.node.resumeAllActions();
        this.node.active=false;
        this.img_ani.spriteFrame=null;
        SetTextureRes(url,this.img_ani)
        this.img_ani.node.x= this.loc[chair].x;
        this.img_ani.node.y= this.loc[chair].y;
        this.img_ani.node.opacity=255;
        this.node.active=true;
        let func=cc.callFunc(()=>{
            this.node.active=false;
            this.img_ani.node.opacity=255;
        },this);
        let action =cc.sequence(cc.scaleTo(0.2,1.4,1.4),cc.scaleTo(0.2,0.3,0.3),cc.scaleTo(0.2,1,1),cc.fadeTo(0.8,150),func);
        this.img_ani.node.runAction(action);
    }

    public PlayAnimation(AniName:string,chair:number):void{

        this.img_animation.stop();
        this.eff_animation.stop();
        this.unscheduleAllCallbacks();
        this.node.active=false;
        this.img_animation.node.x=this.loc[chair].x;
        this.img_animation.node.y=this.loc[chair].y;
        this.eff_animation.node.x=this.loc[chair].x;
        this.eff_animation.node.y=this.loc[chair].y+280;
        
        if(AniName=="AniHu" || AniName=="AniZimo"){
            this.eff_animation.play("EffHuangShanDian");
        }
        this.img_animation.play(AniName);
        this.node.active=true;
        this.scheduleOnce(this.AniEmojiFinish, 1);

    }

    private AniEmojiFinish() {
        this.img_animation.stop();
        this.eff_animation.stop();
        this.node.active = false;
    }
}
