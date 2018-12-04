import { StageWidth, StageHeight, CommonTexturePath } from "../GameHelp/GameHelp";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinAni extends cc.Component {

    /**
     * 回调函数
     */
    private fun: () => void;
    /**
     * 回调对象
     */
    private obj: any;
    private animation: cc.Animation;

    onLoad() {
        this.node.active = false;
        this.animation = this.getComponent<cc.Animation>(cc.Animation);
        this.animation.on('finished', this.onFinished, this);
    }
    public Init() {
        if (!this.node.active) return;
        this.animation.stop();
        this.node.active = false;
    }
    public Destroy() {
        if (!this.node.active) return;
        this.animation.stop();
        this.node.active = false;
        if ((null != this.fun) && (null != this.obj)) {
            this.fun.call(this.obj);
        }
    }
    public Show(obj1: any = null, fun1: () => void = null) {
        this.fun = fun1;
        this.obj = obj1;
        this.node.active = true;
        this.animation.play();
    }
    private onFinished() {
        console.log("Show");
        this.node.active = false;
        if ((null != this.fun) && (null != this.obj)) {
            this.fun.call(this.obj);
        }
    }
    //==================================== 计时器 开始 =======================================
    public TimePause() {
        if (!this.node.active) return;
        this.animation.pause();
    }
    public TimeResume() {
        if (!this.node.active) return;
        this.animation.resume();
    }
    //==================================== 计时器 结束 =======================================
}
