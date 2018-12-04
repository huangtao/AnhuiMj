import { PDK } from "../GameHelp/PDK_IClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinRecordVideo extends cc.Component {

    @property([cc.Sprite])
    private img_recordstatusAry: cc.Sprite[]=[];
    private _idx: number;
    private _intervalIdx: number;

    onLoad() {
        
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
        this.node.active = true;
        this._idx = 1;
        for (var i: number = 0; i < this.img_recordstatusAry.length; i++) {
            this.img_recordstatusAry[i].node.active = i < this._idx;
        }
        this.schedule(this.onInterval, 0.3 * PDK.ins.iclass.GetSpeed());
    }
    /**
     * 隐藏
     * */
    public Close(): void {
        this.unscheduleAllCallbacks();
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
}
