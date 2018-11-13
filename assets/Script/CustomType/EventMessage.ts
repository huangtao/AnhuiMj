import { IEventHandler } from "../Interface/IEventHandler";
export class EventMessage {
    public constructor(eventCode: number = 0, value: any = null, eventType: EventType = EventType.AllHandle) {
        this.eventCode = eventCode;        
        this.value = value;
        this.eventType = eventType;
    }
    public eventCode: number;
    public value: any;
    public eventType: EventType;
}


export class EventMessageToOne extends EventMessage {
    public evnetHandle: IEventHandler;
}


export enum EventType {
    /**
     * 投递到所有
     */
    AllHandle,
    /**
     * 投递到某一个
     */
    ToHandle,
    /**
     * 只有一个处理
     */
    FirstHandle,
}
