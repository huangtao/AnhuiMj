
/**
 * 提供对对象的序列化和反序列化的支持的类
 */
import TypeSerializerFactory from "./TypeSerializerFactory";
import H5ByteBuffer from "./H5ByteBuffer";
import { QL_Common } from "../CommonSrc/QL_Common";
import { GameIF } from "../CommonSrc/GameIF";

export default class PacketCodecHandler {
    /**
    * 开始标记      
    */
    static BeginingMarker: number = 0x80;
    static HeartBeatPing: number = 0x81;
    static HeartBeatPong: number = 0x82;
    /**
     * 头部长度不包含开始和结束标记
     */
    static HeaderLength: number = 4;

    public static AppSerializer(buffer: H5ByteBuffer): GameIF.CustomMessage {
        // var msgid  = buffer.ReadByteAt(0);
        var updata = PacketCodecHandler.PacketData(buffer);
        if (updata == null) return null;
        switch (updata.Code) {
            case UPacketDataType.Binnary: break;
            case UPacketDataType.HeartBeatPong: {
                //心跳包应答
                return new QL_Common.MSG_C_HeartBeatMessage();
            }
            default: return null
        }
        let data = updata.Data;
        if (data == null) return null;

        var typecode = data.readUnsignedByte() << 8 | data.readUnsignedByte();
        //        var data = buffer.UyiReadBytes(buffer.position,len-2); 
        //查找对象的序列化器
        var _typeSerializer = TypeSerializerFactory.GetTypeSerializer(typecode.toString());
        if (_typeSerializer == null) return null;
        data.RemoveBytes(0, 2);
        //将数据反序列化成对象
        data.Reset();

        var msg = <GameIF.CustomMessage>(_typeSerializer.Deserializer(data));
        return msg;



    }


    public static AppSerializerRecord(buffer: H5ByteBuffer): GameIF.CustomMessage {

        var updata = PacketCodecHandler.PacketData(buffer);
        if (updata == null) return null;
        switch (updata.Code) {
            case UPacketDataType.Binnary: break;
            case UPacketDataType.HeartBeatPong: {
                //心跳包应答
                return null;
            }
            default: return null
        }
        let data = updata.Data;
        if (data == null) return null;
        var typecode = data.readUnsignedByte() << 8 | data.readUnsignedByte();
        //        var data = buffer.UyiReadBytes(buffer.position,len-2); 
        //查找对象的序列化器
        var _typeSerializer = TypeSerializerFactory.GetTypeSerializer(typecode.toString());
        if (_typeSerializer == null) return null;
        data.RemoveBytes(0, 2);
        //将数据反序列化成对象
        data.Reset();

        var msg = <GameIF.CustomMessage>(_typeSerializer.Deserializer(data));
        return msg;



    }


    /**      
     *  对象的序列化，这个方法可以将传入的对象序列化为服务器传输的字节数据      
     */
    public static Encode(message: GameIF.CustomMessage): H5ByteBuffer {
        var stream = new H5ByteBuffer();
        //查找对象的序列化器
        var _typeSerializer = TypeSerializerFactory.GetTypeSerializer(message.get_TypeCode());
        //没有找到对象的序列化器
        if (_typeSerializer == null) return null;
        var data = _typeSerializer.Serializer(message);
        var len = data.length + 2;

        //写入消息头
        stream.writeByte(0x80);
        //写入消息协议版本号
        // stream.writeByte(1);
        //写入消息长度
        if (len < 254) {
            //直接写消息长度
            stream.writeByte(len);
        }
        else if (len <= 65535) {
            //直接写消息长度
            stream.writeByte(254);
            stream.writeUnsignedShort(len);
        }
        else {
            //直接写消息长度
            stream.writeByte(255);
            stream.writeInt(len)
        }

        // //写入CRC校验值
        // var crc_data = stream.UyiReadBytes(0, stream.length);
        // stream.writeByte(PacketCodecHandler.GETCRCData(crc_data));

        //写消息号
        stream.writeByte(message.wMainCmdID);
        stream.writeByte(message.wSubCmdID);

        //写入消息数据
        stream.writeBytes(data);

        stream.Reset();

        return stream;
    }

    // static GETCRCData(value: H5ByteBuffer): number {
    //     var sum = 0;
    //     var index = 0
    //     value.Reset();
    //     while (index < value.length) {
    //         sum += value.readUnsignedByte();
    //         index++;
    //     }
    //     return sum;
    // }

    public static PacketData(buffer: H5ByteBuffer): UPacketData {

        var data: H5ByteBuffer = null;
        let outdata: UPacketData = null;

        var index = 0;
        var read = 2;
        while (true) {
            if (buffer.length < index + 1) return null;
            switch (buffer.ReadByteAt(index)) {
                case 0x81:
                    {
                        //心跳包请求消息
                        buffer.RemoveBytes(0, index + 1);
                        return UPacketData.HeartBeatPing;
                    }
                case 0x82:
                    {
                        //心跳包响应消息  
                        buffer.RemoveBytes(0, index + 1);
                        return UPacketData.HeartBeatPong;;

                    }
                case 0x80: break;
                default:
                    {
                        index++;
                        continue;
                    }
            }

            if (buffer.length < index + 4) return null;
            //删除前导无效数据
            buffer.RemoveBytes(0, index);

            //读取解析数据长度
            var len = buffer.ReadByteAt(1);
            if (len == 254) {
                if (buffer.length < 5) return null;
                buffer.position = read;

                len = buffer.readUnsignedShort()
                read += 2;
            }
            else if (len == 255) {
                if (buffer.length < 7) return null;
                buffer.position = read;

                len = buffer.readInt();
                read += 4;
            }


            if (buffer.length < len + read) return null;

            data = buffer.UyiReadBytes(read, len);
            buffer.RemoveBytes(0, len + read);
            data.Reset();
            return new UPacketData(UPacketDataType.Binnary, data);

        }
    }
    // public static PacketDataRecord(buffer: H5ByteBuffer): H5ByteBuffer {

    //     var data: H5ByteBuffer = null;
    //     var index = 0;
    //     var read = 3;
    //     while (true) {
    //         if (buffer.length < index + 4) return null;
    //         if (buffer.ReadByteAt(index) != 0x80 || buffer.ReadByteAt(index + 1) != 1) {
    //             index++;
    //             continue;
    //         };
    //         //删除前导无效数据
    //         buffer.RemoveBytes(0, index);

    //         //读取解析数据长度
    //         var len = buffer.ReadByteAt(2)
    //         if (len == 254) {
    //             if (buffer.length < 6) return null;
    //             buffer.position = read;

    //             len = buffer.readUnsignedShort();
    //             read += 2;
    //         }
    //         else if (len == 255) {
    //             if (buffer.length < 8) return null;
    //             buffer.position = read;

    //             len = buffer.readInt();
    //             read += 4;
    //         }

    //         if (buffer.length < len + read + 1) return null;

    //         data = buffer.UyiReadBytes(read + 1, len);
    //         buffer.RemoveBytes(0, len + read + 1);
    //         data.Reset();
    //         return data;

    //     }
    // }


}


/**
 * 表示数据包的类别
 */
export enum UPacketDataType {

    /**
     * 空
     */
    Null = 0,
    /**
     * 心跳包请求
     */
    HeartBeatPing = 0x81,
    /**
     * 心跳包应答
     */
    HeartBeatPong = 0x82,
    /**
     * 二进制数据包
     */
    Binnary = 0x80,
}

/**
 * 表示一个序列化数据包
 */
export class UPacketData {

    /**
     * 
     */
    public static readonly Null: UPacketData = new UPacketData(UPacketDataType.Null, null);
    /**
     * 
     */
    public static readonly HeartBeatPing: UPacketData = new UPacketData(UPacketDataType.HeartBeatPing, null);
    /**
     * 
     */
    public static HeartBeatPong: UPacketData = new UPacketData(UPacketDataType.HeartBeatPong, null);
    /**
     * 
     */
    public static get HeartBeatPingData(): H5ByteBuffer {
        var buffer = new H5ByteBuffer();
        buffer.writeByte(0x81);
        buffer.Reset();
        return buffer;
    }
    /**
     * 
     */
    public static get HeartBeatPongData(): H5ByteBuffer {
        var buffer = new H5ByteBuffer();
        buffer.writeByte(0x82);
        buffer.Reset();
        return buffer;

    }

    _code: UPacketDataType;
    _data: H5ByteBuffer;

    /// <summary>
    /// 
    /// </summary>
    /// <param name="code"></param>
    /// <param name="data"></param>
    /// <param name="payloadData"></param>
    public constructor(code: UPacketDataType, data: H5ByteBuffer) {
        this._code = code;
        this._data = data;
    }
    /// <summary>
    /// 
    /// </summary>
    public get Code(): UPacketDataType {
        return this._code;
    }
    /// <summary>
    /// 
    /// </summary>
    public get Data(): H5ByteBuffer {
        return this._data;
    }
}



