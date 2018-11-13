import { M_BiJi_GameMessage } from "../../../CommonSrc/M_BiJi_GameMessage";
import { BiJi } from "../GameHelp/BJ_IBiJiClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinTeXiao extends cc.Component {
    @property(cc.Animation)
    private compare: cc.Animation = null;



    onLoad() {
        this.compare.on("finished", this.comparefinish, this);       
    }
    public Init() {
        this.compare.node.active = false;
        this.compare.stop();
    }

    public ShowCompare() {
        this.compare.node.active = true;
        this.compare.play();
    }
    private comparefinish() {
        console.log("比牌动画播放完成");
        this.compare.stop();
    }

}



// var animation = this.node.getComponent(cc.Animation);

// // 注册
// animation.on('play',      this.onPlay,        this);
// animation.on('stop',      this.onStop,        this);
// animation.on('lastframe', this.onLastFrame,   this);
// animation.on('finished',  this.onFinished,    this);
// animation.on('pause',     this.onPause,       this);
// animation.on('resume',    this.onResume,      this);

// // 取消注册
// animation.off('play',      this.onPlay,        this);
// animation.off('stop',      this.onStop,        this);
// animation.off('lastframe', this.onLastFrame,   this);
// animation.off('finished',  this.onFinished,    this);
// animation.off('pause',     this.onPause,       this);
// animation.off('resume',    this.onResume,      this);

// // 对单个 cc.AnimationState 注册回调
// var anim1 = animation.getAnimationState('anim1');
// anim1.on('lastframe',    this.onLastFrame,      this);
// 动态创建 Animation Clip
//     var animation = this.node.getComponent(cc.Animation);
//     // frames 这是一个 SpriteFrame 的数组.
//     var clip = cc.AnimationClip.createWithSpriteFrames(frames, 17);
//     clip.name = "anim_run";
//     clip.wrapMode = cc.WrapMode.Loop;

//     // 添加帧事件
//     clip.events.push({
//         frame: 1,               // 准确的时间，以秒为单位。这里表示将在动画播放到 1s 时触发事件
//         func: "frameEvent",     // 回调函数名称
//         params: [1, "hello"]    // 回调参数
//     });

//     animation.addClip(clip);
//     animation.play('anim_run');