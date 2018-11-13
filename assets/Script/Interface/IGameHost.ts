
import { ISocketHandler } from "./ISocketHandler";
import { QL_Common } from "../CommonSrc/QL_Common";
import { GameIF } from "../CommonSrc/GameIF";
import { IEventHandler } from "./IEventHandler";

/**
 * 游戏控制器接口
 */
export interface IGameHost {
 
    /**
     * 尝试进入房间，会检查断线重连信息
     * @param id 号
     * @param type 进入类型
     * @param gamerule 自定义的游戏规则
     * @param attachParam 调用请求的附加参数
     */
    TryEnterRoom(id: number, type: QL_Common.EnterRoomMethod, gamerule?: any, attachParam?: any) 
    joinRoom(id: number, type: QL_Common.EnterRoomMethod) 

    EnterRoom(id: number, type: QL_Common.EnterRoomMethod, gamerule?: any);

    onErrorCode(code: number, reason: string): boolean;

    /**
     * 检查是否有断线房间的时候，如果没有那个处理器处理了信息，最终会被投递到MainEventHandler中，MainEventHandler会调用GameHost的此接口来处理这个信息
     */
    OfflineRoomInfo(): void;

    /**
     * 当游戏场景创建完成之后，会调用到这个方法
     */
    OnGameSceneComplete(): void;
    /**
     * 游戏服务器发送的消息到达
     */
    OnMessageIncome(cm: GameIF.CustomMessage): boolean;

    ExitGame(): void;
    
    UnLock(): void;
    /**
     * 
     */
    OnQuerySingleTableInfo(cm:GameIF.CustomMessage);
}