
/**
 * 系统通知事件消息，通用
 */
export class SystmPushMessage {

    /**
     *通知推送的目标主体
     */
    public TargerUser: number = 0;
    /**
     *通知的事件类型
     */
    public EventCode: string = "";
    /**
     *通知事件的附加参数
     */
    public EventData: any = null;
}