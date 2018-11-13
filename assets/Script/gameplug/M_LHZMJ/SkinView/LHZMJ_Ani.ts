import { SetTextureRes } from "../../MJCommon/MJ_Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_Ani extends cc.Component {

    @property(cc.Sprite)
    img_ani: cc.Sprite=null;

    @property(cc.Animation)
    peng_animation: cc.Animation=null;

    @property(cc.Animation)
    gang_animation: cc.Animation=null;

    @property(cc.Animation)
    hu_animation: cc.Animation=null;

    @property(cc.Animation)
    zimo_animation: cc.Animation=null;



    onLoad() {
        // init logic
        
    }
    start(){

         this.peng_animation.on("finished",this.AniEmojiFinish,this);
         this.gang_animation.on("finished",this.AniEmojiFinish,this);
         this.hu_animation.on("finished",this.AniEmojiFinish,this);
         this.zimo_animation.on("finished",this.AniEmojiFinish,this);


    }

    public init():void{
        this.peng_animation.stop();
        this.gang_animation.stop();
        this.hu_animation.stop();
        this.zimo_animation.stop();


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

        this.HideTeXiao();

        this.unscheduleAllCallbacks();
        this.node.active=false;
        this.SetPos(chair); 

        
        if(AniName=="AniHu"){
              this.hu_animation.play().speed = 2;
            this.hu_animation.node.active = true;
        }else if(AniName=="AniZimo"){
            this.zimo_animation.play().speed = 2;
            this.zimo_animation.node.active = true;
        }else if(AniName=="AniPeng"){
            this.peng_animation.play().speed = 2;
            this.peng_animation.node.active = true;
        }else if(AniName=="AniGang"){
            this.gang_animation.play().speed = 2;
            this.gang_animation.node.active = true;
        }
        
        this.node.active=true;
       // this.scheduleOnce(this.AniEmojiFinish, 1);
    }
    private SetPos(chair:number){
        this.peng_animation.node.x=this.loc[chair].x;
        this.peng_animation.node.y=this.loc[chair].y;
        this.gang_animation.node.x=this.loc[chair].x;
        this.gang_animation.node.y=this.loc[chair].y;
        this.hu_animation.node.x=this.loc[chair].x;
        this.hu_animation.node.y=this.loc[chair].y;
        this.zimo_animation.node.x=this.loc[chair].x;
        this.zimo_animation.node.y=this.loc[chair].y;

    }

    private HideTeXiao(){
        this.peng_animation.stop();
        this.peng_animation.node.active = false;
        this.gang_animation.stop();
        this.gang_animation.node.active = false;
        this.hu_animation.stop();
        this.hu_animation.node.active = false;
        this.zimo_animation.stop();
        this.zimo_animation.node.active = false;

    }

    private AniEmojiFinish() {
        this.init();
    }
}
