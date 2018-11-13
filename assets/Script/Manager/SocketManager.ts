
import { ISocketManager } from "../Interface/ISocketManager";
import { Debug } from "../Tools/Function";
import { ISocketHandler } from "../Interface/ISocketHandler";
import { GameIF } from "../CommonSrc/GameIF";
import MainMessageHandler from "../MainHandler/MainMessageHandler";
import ClientSocket from "../Net/ClientSocket";
import ConfigData from "../Global/ConfigData";
import H5ByteBuffer from "../Serializer/H5ByteBuffer";

export default class SocketManager implements ISocketManager {


    private _socket: ClientSocket;
    private _handler: MainMessageHandler;
    public constructor() {
        this._handler = new MainMessageHandler();
    }
    Connet(address?: string, protocols?: string | string[]): boolean {
        //如果已经存在连接并且连接有效
        if (this._socket && this._socket.isValid) {
            //如果socket存在并且有效，不作处理
            return;
        }

        if (!address || address.length === 0) {
            address = ConfigData.IPPort[0];
        }


        if (Debug()) {
            //address = "ws://123.206.199.186:9103";
            //address="ws://123.206.199.186:9003";
            // address = "ws://192.168.1.13:9003";

            // address = "ws://192.168.1.250:9003";
        }
 

        if (!address || address.length === 0) {
            throw new Error("无效的连接字符串");
        }

        this._socket = new ClientSocket(this._handler);
        this._socket.Start(address);

    }
    SendData(msg: GameIF.CustomMessage|H5ByteBuffer): boolean {
        if (!this._socket) {
            cc.warn("请先创建连接");
            return false;
        }
        if (!this._socket.isValid) {
            cc.warn("请先创建连接");
            return false;
        }
        return this._socket.SendData(msg);
    }
    Close(code?: number, reason?: string): boolean {
        if (this._socket) {
            this._socket.Dispose();
        }
        return true;
    }

}