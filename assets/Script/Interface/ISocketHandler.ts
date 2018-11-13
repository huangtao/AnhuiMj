
import { GameIF } from "../CommonSrc/GameIF";

export interface ISocketHandler {
    
		/**
		 * 成功连接
		 * */
        OnConnect(): void;

        /**
		 * 成功连接
		 * */
        OnServerReady(): void;

        /**
         * 网络断开
         * */
        OnNetClose(): void;

        /**
         * 网络连接异常
         * @returns {} 
         */
        OnNetError(): void;

        /**
         * 消息到达
         * */
        OnMessageIncome(cm: GameIF.CustomMessage): boolean;
}