

/**
 * socket管理器
 */
import { GameIF } from "../CommonSrc/GameIF";
import H5ByteBuffer from "../Serializer/H5ByteBuffer";
export interface ISocketManager {

    /**
     * 连接
     */
    Connet(url?: string, protocols?: string | string[]): boolean;

    /**
     * 发送数据
     */
    SendData(msg: GameIF.CustomMessage|H5ByteBuffer): boolean;

    /**
     * 关闭连接
     */
    Close(code?: number, reason?: string): boolean;
}