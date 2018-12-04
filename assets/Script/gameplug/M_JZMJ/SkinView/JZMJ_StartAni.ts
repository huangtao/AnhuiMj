const {ccclass, property} = cc._decorator;

@ccclass
export default class JZMJ_StartAni extends cc.Component {

    @property(cc.Animation)
    ani: cc.Animation=null;

    onLoad() {
        // init logic
        
    }

    /**
     * 初始化数据
     */
    public init(){
        // this.node.active = false;
    }

    start() {
        this.ani.on("finished",this.anistop,this);
    }

    /**
     * 播放动画
     */
    public play(){
        this.node.active = true;
        this.ani.node.active = true;
        this.ani.play();
    }

    private anistop(){
        this.ani.stop();
        this.unscheduleAllCallbacks();
        this.ani.node.active = false;

    }

}
