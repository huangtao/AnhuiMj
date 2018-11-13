const {ccclass, property} = cc._decorator;

@ccclass
export default class HZMJ_StartAni extends cc.Component {

    @property(cc.Animation)
    ani: cc.Animation=null;

    onLoad() {
        // init logic
        
    }

    /**
     * 初始化数据
     */
    public init(){
        this.node.active = false;
    }

    /**
     * 播放动画
     */
    public play(){
        this.node.active = true;
        //this.node.active = false;
        this.ani.play();
    }

}
