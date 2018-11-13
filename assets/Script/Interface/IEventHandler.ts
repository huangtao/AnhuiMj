

/**
 * 如果使用消息投递机制也可以实现
 */

export interface IEventHandler {

    /**
     * 事件处理接口
     * @param eventCode 事件类型
     * @param value 参数
     * @returns {} 
     */
    OnEventComeIn(eventCode: number, value: any): boolean;
}
