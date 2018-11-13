import { PlayerCount } from "../GameHelp/BJ_GameHelp";

const { ccclass, property } = cc._decorator;

export default class AniCurve extends cc.Component {
    //(-226.00, -274.20),(323.00, -50.00),(232.00, 165.00),(-50.00, 169.00),(-332.00, 165.00),(-423.00, -50.00)//1.54
    private bezierList: cc.Vec2[] = new Array(//玩家发牌对应的贝赛尔曲线轨迹
        cc.p(-100, -66.4), cc.p(-175, -137.8),
        cc.p(107.7, -6.7), cc.p(215.3, -23.3),
        cc.p(67.3, 65), cc.p(144.7, 120),
        cc.p(-16.7, 56.3), cc.p(-33.3, 112.7),
        cc.p(-100.7, 65), cc.p(-211.3, 120),
        cc.p(-141, -6.7), cc.p(-282, -23.3)
    );
    /**
     * 回调函数
     */
    private fun: () => void;
    /**
     * 回调对象
     */
    private obj: any;

    onLoad() {

    }
    public Show(startPos: cc.Vec2, tarPos: cc.Vec2, time: number, chair: number, tarscale: number = 1, obj1: any = null, fun1: () => void = null) {
        this.fun = fun1;
        this.obj = obj1;
        var callAction = cc.callFunc(this.AniOver, this);
        var bezier = new Array(this.bezierList[chair * 2], this.bezierList[chair * 2 + 1], tarPos);
        this.node.runAction(cc.sequence(cc.spawn(cc.bezierTo(time, bezier), cc.scaleTo(time, tarscale, tarscale)), callAction));
    }
    /**
     * 动画结束
     */
    private AniOver() {
        if ((null != this.fun) && (null != this.obj)) {
            this.fun.call(this.obj);
        }
    }

    //==================================== 计时器 开始 =======================================
    public TimePause() {
        if (!this.node.active) return;
        this.node.pauseAllActions();
    }
    public TimeResume() {
        if (!this.node.active) return;
        this.node.resumeAllActions();
    }
    //==================================== 计时器 结束 =======================================
}
