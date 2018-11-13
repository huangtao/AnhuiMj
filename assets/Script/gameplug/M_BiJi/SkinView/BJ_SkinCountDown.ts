import { BiJi } from "../GameHelp/BJ_IBiJiClass";
import { TimeFlag } from "../GameHelp/BJ_GameHelp";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinCountDown extends cc.Component {

    @property(cc.Sprite)
    private img_clock: cc.Sprite=null;
    @property(cc.Label)
    private label_clock: cc.Label=null;
    private fillRange: number;//0到-1
    private timer: number;
    private count: number = 100;
    private fillRangeBase: number;

    onLoad() {
        this.fillRangeBase = 1 / this.count;
        this.node.y=25;
        this.node.active = false;
    }
    public Init() {
        this.Destroy();
        this.node.active = false;
    }
    public Destroy() {
        this.unscheduleAllCallbacks();
    }
    public Show(timer: number, start: number = 0) {
        if (timer <= 0) {
            this.AniOver();
            return;
        }
        this.Destroy();
        this.node.active = true;
        this.ShowLabelClock(timer);
        this.fillRange = 1 - start / timer;
        this.img_clock.fillRange = this.fillRange;
        this.schedule(this.ChangeFillRange, timer / this.count * BiJi.ins.iclass.GetSpeed());
    }
    public Close() {
        this.Destroy();
        this.node.active = false;
    }
    private ShowLabelClock(value: number) {
        this.timer = value;
        this.SetLabel();
        this.schedule(this.TimerHandle, 1 * BiJi.ins.iclass.GetSpeed());
    }
    private TimerHandle() {
        this.timer--;
        if (this.timer >= 0)
            this.SetLabel();
        else {
            this.AniOver();
        }
    }
    private SetLabel() {
        if (this.timer < 10)
            this.label_clock.string = "0" + this.timer;
        else
            this.label_clock.string = "" + this.timer;
    }
    private AniOver() {
        console.log("AniOver");
        this.Destroy();
        this.node.active = false;
        BiJi.ins.iview.TimerOver(TimeFlag.SelectCards);
    }
    /**
     * 分为100次
     */
    private ChangeFillRange() {
        this.fillRange -= this.fillRangeBase;
        if (this.fillRange < 0) {
            this.img_clock.fillRange = 0;
            this.unschedule(this.ChangeFillRange);
            return;
        }
        this.img_clock.fillRange = this.fillRange;
    }

    //==================================== 计时器 开始 =======================================
    public TimePause() {
        cc.director.getScheduler().pauseTarget(this);
    }
    public TimeResume() {
        cc.director.getScheduler().resumeTarget(this);
    }
    //==================================== 计时器 结束 =======================================
}
