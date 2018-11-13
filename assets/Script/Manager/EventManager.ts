import { IEventHandler } from "../Interface/IEventHandler";
import { EventMessage, EventType, EventMessageToOne } from "../CustomType/EventMessage";
/**
 * 消息管理与投递器
 */
export class EventManager {
    public constructor() {
        this._handleList = new Array();
        this._addHandle = new Array();
        this._removeHandle = new Array();
        this._eventArray = new Array();
    }
    private _handleList: Array<IEventHandler>;

    private _addHandle: Array<IEventHandler>;

    private _removeHandle: Array<IEventHandler>;


    private _eventArray: Array<EventMessage>;

    private _lock = false;

    /**
     * 注册监听器
     * @param ui 
     * @returns {} 
     */
    public RegisterEventHadnle(ui: IEventHandler): boolean {
        if (ui == null) return false;
        if (this._lock) {
            this._addHandle.push(ui);
        } else {
            const idx = this._handleList.indexOf(ui);
            if (idx >= 0) return false;
            this._handleList.push(ui);
        }
        return true;
    }

    /**
     * 注销监听器
     * @param ui 
     * @returns {}
     */
    public UnRegisterEventHadnle(ui: IEventHandler): boolean {
        if (ui == null) return false;
        if (this._lock) {
            this._removeHandle.push(ui);
        } else {
            const idx = this._handleList.indexOf(ui);
            if (idx === -1) return false;
            this._handleList.splice(idx, 1);
        }
        return true;
    }

    private addLockList() {
        while (this._addHandle.length > 0) {
            this.RegisterEventHadnle(this._addHandle[0]);
            this._addHandle.splice(0, 1);
        }
    }

    private removeLockList() {
        while (this._removeHandle.length > 0) {
            this.UnRegisterEventHadnle(this._removeHandle[0]);
            this._removeHandle.splice(0, 1);
        }
    }

    /**
     * 投递消息
     * @param eventCode 
     * @param value 
     * @returns {} 
     */
    public PostMessage(eventCode: number, value?: any) {
        this._eventArray.push(new EventMessage(eventCode, value));
        while (this.startThread());
    }
    /**
     * 
     * 投递给所有组件，但是只有一个组件处理该消息 
     * 如果最上层组件没有处理，往下找下一个组件
     * 此功能一般用于用于投递物理键消息
     * 比如点击返回键
     * 
     * @param handle 消息接收者
     * @param eventCode 消息码
     * @param value 可选参数
     * @returns {} 
     */
    public PostMessageOneHandle(eventCode: number, value?: any) {
        this._eventArray.push(new EventMessage(eventCode, value, EventType.FirstHandle));
        while (this.startThread());
    }

    /**
     * 投递消息给指定对象
     * @param eventCode 
     * @param value 
     * @returns {} 
     */
    public PostMessageToHandle(handle: IEventHandler, eventCode: number, value?: any) {
        if (handle == null) return;
        const event = new EventMessageToOne();
        event.eventCode = eventCode;
        event.value = value;
        event.eventType = EventType.ToHandle;
        event.evnetHandle = handle;
        this._eventArray.push(event);
        while (this.startThread());
    }

    /**
     * 投递消息到最上层组件
     * @param eventCode 
     * @param value 
     * @returns {} 
     */
    public PostMessageToFirst(eventCode: number, value?: any) {
        const i = this._handleList.length - 1;
        if (i < 0) return;
        this.PostMessageToHandle(this._handleList[i], eventCode, value);
    }


    private startThread() {
        if (this._eventArray.length === 0) return false;
        if (this._lock) return false;
        this._lock = true;
        const event = this._eventArray.shift();
        //try {

        switch (event.eventType) {
            case EventType.AllHandle:
                this.threadAll(event);
                break;
            case EventType.ToHandle:
                this.threadToHandle(event);
                break;
            case EventType.FirstHandle:
                this.threadToFirst(event);
                break;
        }
        // } catch (e) {
        //     cc.error(e);
        // }
        this._lock = false;
        this.addLockList();
        this.removeLockList();
        return true;
    }


    private threadAll(event: EventMessage) {
        const length = this._handleList.length;
        for (let i = 0; i < length; i++) {
            this._handleList[i].OnEventComeIn(event.eventCode, event.value);
        }
    }
    private threadToHandle(event: EventMessage) {
        const handle_event = <EventMessageToOne>event;
        handle_event.evnetHandle.OnEventComeIn(handle_event.eventCode, handle_event.value);
    }

    private threadToFirst(event: EventMessage) {
        const count = this._handleList.length;
        for (let i = count - 1; i >= 0; i--) {
            //如果已经处理过，结束投递，如果没有，前进到前一个handle
            if (this._handleList[i].OnEventComeIn(event.eventCode, event.value)) {
                break;
            }
        }
    }
}
