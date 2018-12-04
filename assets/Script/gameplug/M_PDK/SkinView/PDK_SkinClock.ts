import { TimeFlag, TimerValue } from "../GameHelp/PDK_GameHelp";
import { PDK } from "../GameHelp/PDK_IClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinClock extends cc.Component {

    /**
     * 背景图
     */
    @property(cc.Sprite)
    private img_bg: cc.Sprite = null;
    /**
     * 计时器文本
     */
    @property(cc.Label)
    private label_tips: cc.Label = null;
    /**
     * 计时器显示文本
     */
    private label_title: string;
    /**
     * 计时器标识
     */
    private timerFlag: TimeFlag;
    /**
     * 是否单单显示
     */
    private onlyShow: boolean;
    /**
     * 总倒计时时间
     */
    private timerCount = 0;
    /**
     * 上次时间
     */
    private timeStamp: number;
    /**
     * 当前是否有计时器真正运行
     */
    private isRuning: boolean;

    onLoad() {
        this.node.y = -20;
        this.node.x = -90;
        this.Init();
    }
    public Init() {
        this.DestroyTimer();
        this.isRuning = false;
        this.timerFlag = null;
        this.node.active = false;
        this.node.rotation = 0;
    }
    public Destroy() {
        this.DestroyTimer();
    }
    /**
     * 注册计时器
     * timeflag:计时器标识，onlyShow是否单单显示，value:倒计时时间,msg：显示的文本内容
     */
    public RegTimer(timeflag: TimeFlag, onlyShow: boolean = false, value: number = 0, msg: string = "",cChair:number) {
        this.node.stopAllActions();
        this.node.rotation = 0;
        console.log("RegTimer:" + Date.now());
        console.log(timeflag + "," + onlyShow + "," + value + "," + msg);
        switch (timeflag) {
            case TimeFlag.WaitStart: {
                // this.label_title = "准备倒计时：";
                // this.timerCount = TimerValue.WaitStart;
                // this.node.y = 120;               
                break;
            }
            case TimeFlag.Interval: {
                // this.label_title = "准备倒计时：";
                // this.timerCount = TimerValue.Interval;
                // this.node.y = 120;
                return;
             //    break;
            }
        }
        this.node.active = true;
        this.isRuning = true;
        this.timerFlag = timeflag;
        this.onlyShow = onlyShow;
        if (value > 0)
            this.timerCount = value;
        this.timeStamp = Date.now();
        this.SetLabelValue("", this.timerCount);
        this.schedule(this.TimerHandle, 1 * PDK.ins.iclass.GetSpeed());
        if(cChair == 0){
            this.node.setPosition(-90,-20);
        }else if(cChair == 1){
            this.node.setPosition(450,80);
        }else if(cChair == 2){
            this.node.setPosition(0,155);
        }else if(cChair == 3){
            this.node.setPosition(-450,80);
        }
    }
    /**
     * 销毁计时器
     */
    public DestroyTimer() {
        this.node.active = false;
        this.isRuning = false;
        this.unscheduleAllCallbacks();
        this.timerFlag = null;
        this.node.rotation = 0;
    }
    /**
     * 计时器进程
     */
    private TimerHandle() {
        this.timerCount--;
        if (this.timerCount < 0) {
            this.node.active = false;
            this.node.stopAllActions();
            this.TimerOver();
        }
        else {
            this.SetLabelValue(this.label_title, this.timerCount);
            if(this.timerCount == 5){
                let action = cc.sequence(cc.rotateBy(0.05,20),cc.rotateBy(0.1,-40),cc.rotateBy(0.05,20));
                this.node.runAction(cc.repeatForever(action));
            }
        }
    }
    /**
     * 计时器结束
     */
    private TimerOver() {
        console.log("TimerOver:" + Date.now());
       // this.node.active = false;
        this.isRuning = false;
        this.unscheduleAllCallbacks();
        if (!this.onlyShow) {
            PDK.ins.iview.TimerOver(this.timerFlag);
        }
        this.timerFlag = null;
    }
    /**
     * 设置文本内容
     */
    private SetLabelValue(value: string, time: number) {
        if (time < 0)
            time = 0;
        this.label_tips.string = "" + time;
        // if (this.label_tips.node.width > 140) {
        //     this.img_bg.node.width = this.label_tips.node.width + 60;
        // }
        // else {
        //     this.img_bg.node.width = 140;
        // }
    }

    //==================================== 计时器 开始 =======================================
    public TimePause() {
        if (this.timerFlag != null && this.isRuning) {
            this.isRuning = false;
        }
        cc.director.getScheduler().pauseTarget(this);
    }
    public TimeResume() {
        if (this.timerFlag != null && !this.isRuning) {
            this.isRuning = true;
        }
        cc.director.getScheduler().resumeTarget(this);
    }
    //==================================== 计时器 结束 =======================================
}
