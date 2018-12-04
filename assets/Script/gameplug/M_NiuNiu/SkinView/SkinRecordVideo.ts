import { ConstValues } from "../../../Global/ConstValues";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinRecordVideo extends cc.Component {

    @property([cc.Sprite])
    private img_recordstatusAry: cc.Sprite[]=[];
    private _idx: number;
    private _intervalIdx: number;

    @property(cc.Node)
    private ani: cc.Node=null;

    @property(cc.Label)
    private lab: cc.Label=null;

    onLoad() {
        this.node.active = false;
    }
    public init() {
        this.node.active = false;
    }
    /**
     * 销毁
     * */
    public Destroy(): void {
        this.unscheduleAllCallbacks();
    }
    /**
     * 显示
     * */
    public Show(): void {
        this.ani.active=true;
        this.lab.node.active=false;
        this.node.active = true;
        this._idx = 1;
        for (var i: number = 0; i < this.img_recordstatusAry.length; i++) {
            this.img_recordstatusAry[i].node.active = i < this._idx;
        }
        this.schedule(this.onInterval, 0.3);
        let x=ConstValues.RecordMax-10;
        this.scheduleOnce(this.timeOutStart,x);
    }


    private timeOutStart():void{
        this.unschedule(this.onInterval);
        this.ani.active=false;
        this._idx=10;
        this.lab.string=""+10;
        this.lab.node.active=true;
        this.schedule(this.onIntervalNum,1);
    }
    /**
     * 隐藏
     * */
    public Close(): void {
        this.unschedule(this.onInterval);
        this.unschedule(this.onIntervalNum);
        this.unschedule(this.timeOutStart);
        this.node.active = false;
    }
    /**
     * 循环调用
     * */
    private onInterval(): void {
        ++this._idx;
        if (this._idx > 4) {
            this._idx = 1;
        }
        for (var i: number = 0; i < this.img_recordstatusAry.length; i++) {
            this.img_recordstatusAry[i].node.active = i < this._idx;
        }
    }

    private onIntervalNum(): void {
        this._idx--;
        if (this._idx >= 0) {
            this.lab.string=""+this._idx;
        }
    }

}
