import H5ByteBuffer from "../Serializer/H5ByteBuffer";
import PacketCodecHandler from "../Serializer/PacketCodecHandler";
import { UyiObject } from "../Serializer/UyiObject";
import { ISocketHandler } from "../Interface/ISocketHandler";
import { GameIF } from "../CommonSrc/GameIF";
import { QL_Common } from "../CommonSrc/QL_Common";
import { Debug, ReportError } from "../Tools/Function";


/**
 * 这是一个网络连接器
 */
export default class ClientSocket extends UyiObject {

    //socket连接
    private _socket: WebSocket;

    //回调
    private _callback: ISocketHandler;

    //队列
    private _bufferqueue: Array<H5ByteBuffer>;

    private _msgQueue: Array<GameIF.CustomMessage>;

    //锁
    private _isReceive: boolean;

    private _tickID: NodeJS.Timeout;

    public constructor(callback: ISocketHandler) {
        super();
        if (!callback) {
            throw new Error("无效的socket监听");
        }
        this._callback = callback;
        this._bufferqueue = new Array();
        this._msgQueue = new Array();
        this._isReceive = false;
        this._tickID = setInterval(this.onUpdate.bind(this), 30);
    }

    public get ReadyState(): number {
        return this._socket.readyState;
    }


    public Start(url: string) {
        if (!url || url.length <= 3) {
            cc.warn("无效的连接字符串")
            return;
        }
        if (url.substr(0, 3) !== "ws:") {
            url = `ws://${url}`;
        }


        cc.log("开始连接" + url);
        this._socket = new WebSocket(url);
        // if(cc.sys.isNative){
        //     if(url.substr(0, 3) === "wss"){
        //         this._socket = new WebSocket(url,null,cc.url.raw("resources/weblstest8hbcc.pem"));
        //     }else{
        //         this._socket = new WebSocket(url);
        //     }
        // }else{
        //     this._socket = new WebSocket(url);
        // }



        //this._socket["thisObj"] = this;
        this._socket.binaryType = "arraybuffer";    //收到的是 ArrayBuffer 数据
        this._socket.onclose = this.onclose.bind(this);
        this._socket.onerror = this.onerror.bind(this);
        this._socket.onmessage = this.onmessage.bind(this);
        this._socket.onopen = this.onopen.bind(this);
    }


    public SendData(data: GameIF.CustomMessage | H5ByteBuffer): boolean {
        if (!this._socket || this._socket.readyState !== WebSocket.OPEN) {
            cc.warn("请先连接socket");
            return false;
        }
        if (data instanceof H5ByteBuffer) {
            this._socket.send(data.buffer);
            return;
        }
        const buffer = PacketCodecHandler.Encode(data);
        if (buffer == null || buffer.length === 0) {
            cc.warn("无效的序列化数据");
            return false;
        }
        buffer.Reset();
        ClientSocket.ShowLog(data, false);
        this._socket.send(buffer.buffer);
        return true;
    }


    /**
     * 关闭网络链接
     */
    public Close(code?: number, reason?: string) {
        if (this._socket) {
            this._socket.close();
            this._socket = null;
        }
    }

    /**
     * 销毁
     */
    public Dispose(): void {
        super.Dispose();
        this.Close();
        clearInterval(this._tickID);
        this._msgQueue = null;
        this._bufferqueue = null;
        this._callback = null;

    }

    private onclose(ev: CloseEvent) {
        cc.log("连接已断开");
        if (this._callback) {
            this._callback.OnNetClose();
        }
        this.Dispose();
        return;
    }

    private onerror(ev: Event) {
        cc.log("网络连接异常");
        if (this._callback) {
            this._callback.OnNetError();
        }
        this.Dispose();
        return;
    }

    private onmessage(ev: MessageEvent) {
        const e = <ArrayBuffer>ev.data;
        if (!this._bufferqueue) return false;
        //为防止消息拥塞，先将收到的字节流进队列处理
        const buffer = new H5ByteBuffer(e);
        buffer.Reset();

        this._bufferqueue.push(buffer);
        while (this.TryPacketMessage());
    }

    private onopen(ev: Event) {
        cc.log("连接已打开，等待服务器准备好");
        if (this._callback) {
            this._callback.OnConnect();
        }
    }


    private TryPacketMessage() {
        //如果正在处理 直接返回
        if (this._isReceive) return false;
        //如果缓存队列为空
        if (!this._bufferqueue || this._bufferqueue.length === 0) return false;


        //设置状态值
        this._isReceive = true;
        //获取一条暂存的字节流信息
        const buffer = this._bufferqueue.shift();
        buffer.position = 0;
        //开始解析
        let message: GameIF.CustomMessage;
        try {
            message = PacketCodecHandler.AppSerializer(buffer);
        } 
        catch (error) { 
            cc.warn("序列化器异常")
            ReportError("序列化器异常！");
            cc.log(error);
            message = null;
            this._isReceive = false;
            return false;
        }


        //如果解析出错                                                                                                                              
        if (message == null) {
            this._isReceive = false;
            return true;
        }


        // //响应消息过滤掉
        // if ((QL_Common.Main_CommonID.LS2C === message.wMainCmdID) &&
        //     (QL_Common.LS2C. === message.wSubCmdID)) {
        //     this._isReceive = false;
        //     return true;
        // }

        if (message.wMainCmdID === QL_Common.Main_CommonID.C2LS && message.wSubCmdID === QL_Common.C2LS.MSG_C_HeartBeatMessage) {
            if (this._callback) {
                this._callback.OnMessageIncome(message);
            }
            this._isReceive = false;
            return true;
        }

        //打印日志
        ClientSocket.ShowLog(message, true);

        //如果是服务器准备完成的通知
        if (message.wMainCmdID === QL_Common.Main_CommonID.BaseGeneral && message.wSubCmdID === QL_Common.SUB_BaseGeneral_CommonID.H5Connected) {
            cc.log("服务器已准备好，等待登录！")
            if (this._callback) {
                this._callback.OnServerReady();
            }
            this._isReceive = false;
            return true;
        }


        this._msgQueue.push(message);
        this._isReceive = false;
        return true;
    }

    private onUpdate() {
        if ((!this._msgQueue) || this._msgQueue.length === 0) {
            return;
        }
        const message = this._msgQueue.shift();
        if (this._callback) {
            if (Debug()) {
                this._callback.OnMessageIncome(message);
            } else {
                try {
                    this._callback.OnMessageIncome(message);
                } catch (e) {
                    ReportError("消息体处理出现异常！msg：" + message.FullName() + " err.msg=" + e.message);
                }
            }

        }
    }

    /**
     * 
     * @param msg 消息内容
     * @param receive true表示收到消息，false表示发送消息
     */
    private static ShowLog(msg: GameIF.CustomMessage, receive: boolean) {
        if (msg.wMainCmdID === QL_Common.Main_CommonID.C2LS && msg.wSubCmdID === QL_Common.C2LS.MSG_C_HeartBeatMessage) {
            return;
        }
        if (receive) {
            cc.log("server <<<<<<=====" + msg.FullName());
        } else {
            cc.log("send   =====>>>>>>" + msg.FullName());
        }
        if (cc.sys.isBrowser) {
            cc.log(msg);
        }
    }


}