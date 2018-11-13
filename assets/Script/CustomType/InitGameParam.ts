

/**
 * 这是一个结构体，用于初始化游戏界面时候
 */
import { QL_Common } from "../CommonSrc/QL_Common";

export class InitGameParam {
    /**
     * 自己的椅子号
     */
    public ChairID: number;

    /**
     * 是不是断线重连
     */
    public IsOffLine: boolean;

    /**
     * 游戏信息
     */
    public GameInfo: QL_Common.GameInfo;

    /**
     * 房间信息
     */
    public RoomClient: QL_Common.RoomClient;

    /**
     * 桌子号
     */
    public TableID: number;

    /**
     * 游戏的状态信息，当它大于0的时候，表示游戏已经开始
     */
    public GameStatus: number;

    /**
     * 创建房间条件下的游戏规则
     */
    public GameRule: any;
}