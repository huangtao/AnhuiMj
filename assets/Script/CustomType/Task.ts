
import { Action } from "./Action"
/**
 * 一个异步的操作task任务
 */
export default abstract class Task {
    /**
     * 操作完成回调
     */
    public CallBack: Action;

    /**
     * 是否空闲
     */
    private _isFree: boolean;

    /**
     * 是否空闲
     */
    public get IsFree(): boolean {
        return this._isFree;
    }

    /**
     * 
     * @param action 构造方法，默认传入一个操作完成回调
     */
    public constructor(action?: Action) {
        this.CallBack = action;
        this._isFree = true;
    }

    /**
     * 外部调用，通知task开始执行
     */
    public Start() {
        this._isFree = false;
        this.OnTaskStart();
    }

    /**
     * 当task开始执行，子类必须重写
     */
    protected abstract OnTaskStart(): void;

    /**
     * task完成后手动调用，调用时候要确保操作已经全部完成
     * @param args 参数
     */
    protected Complete(args?: any[]) {
        this._isFree = true;
        if (this.CallBack) {
            this.CallBack.Run(args);
        }
    }

}


