
import H5ByteBuffer from "./H5ByteBuffer"
import TypeSerializerFactory from "./TypeSerializerFactory"
import { ITypeSerializer } from "./ITypeSerializer";
import { SerializerCreator } from "./SerializerCreator";

/**
     * 创建时间：2017年04月13日 12:37:12
     * 创建人员：沈瑞
     * 备注信息：客户端消息体序列化基类
     * 
     * ===================   类型序列化定义类别   ====================
     * 如果类别起始包含 “!” 则表示是数组多个数组则为 多维数组
     * 例如：!!4 ==> 是一个 int类型的 二维数组
     * 
     * 0    sbyte
     * 1    byte
     * 2    short
     * 3    ushort
     * 4    int
     * 5    uint
     * 6    long
     * 7    ulong
     * 8    float
     * 9    double
     * 10   TimeSpan
     * 11   DateTime
     * 12   string
     * 13   byte[]
     * 
     * 
     * ==================================================================
     * 
     * 使用分隔符 | 分割字段类型和字段名称
     * 使用分隔符 & 分割多个字段
     * 
     * 
     * 
     * 
     * 
 */
export class BaseSerializer implements ITypeSerializer {
    /**
      * 表示序列化器对象的唯一键 
      */
    public Key: string;
    public F: string;
    public T: string;
    public N(): any {
        return SerializerCreator.InitObject(this.T)
    }

    /**
    * 消息序列化器的反序列化方法
    */
    public Deserializer(buffer: H5ByteBuffer): any {
        if (buffer.readByte() == 0)
            return null;

        //创建一个新的对象
        var msg = this.N();
        if (this.F.length == 0) return msg;

        //分割字符串 取出所有的字段信息
        var spFileds = this.F.split('&');
        for (var i = 0; i < spFileds.length; i++) {
            //分割取出字段的类型和字段名称
            var spTF = spFileds[i].split('|')
            var type = spTF[0];
            var name = spTF[1];
            var value = this.ReadFiledFromBuffer(type, buffer);
            msg[name] = value;


        }
        return msg;
    }
    /**
    * 消息类型的序列化方法
    */
    public Serializer(obj: any): H5ByteBuffer {
        
        var buffer = new H5ByteBuffer();
        if (obj == null) {
            buffer.writeByte(0);
            buffer.Reset();
            return buffer;
        }
        buffer.writeByte(1);


        if (this.F.length == 0) return buffer;
        
        //分割字符串 去除所有的字段信息
        var spFileds = this.F.split('&');
        for (var i = 0; i < spFileds.length; i++) {
            //分割取出字段的类型和字段名称
            var spTF = spFileds[i].split('|')
            var type = spTF[0];
            var name = spTF[1];
            this.WriteFiledFromBuffer(type, obj[name], buffer);
        }
        return buffer;
    }
    public ReadFiledFromBuffer(type: string, buffer: H5ByteBuffer): any {
        //处理数组类型
        if (type.charAt(0) == '!') {
            var array = new Array<any>();
            var baseType = type.substr(1);
            var len = buffer.ReadLengthData();
            for (var i = 0; i < len; i++) {
                array.push(this.ReadFiledFromBuffer(baseType, buffer));
            }
            return array;
        } 

        //开始处理基础类型 
        switch (type) {
            case "0": return buffer.readByte();
            case "1": return buffer.readUnsignedByte();
            case "2": return buffer.readShort();
            case "3": return buffer.readUnsignedShort();
            case "4": return buffer.readInt();
            case "5": return buffer.readUnsignedInt();
            case "6": return buffer.readLong();
            case "7": return buffer.readUnsignedLong();
            case "8": return buffer.readFloat();
            case "9": return buffer.readDouble();
            case "10": return buffer.readTimeSpan();
            case "11": return buffer.readDateTime();
            case "12": return buffer.readUTF8String();
            case "13": return buffer.readH5ByteArray().GetAllArray();
            case "14": return buffer.readBoolean();
            default:
                {
                    //当前类型是一个实体类型
                    var _serializer = TypeSerializerFactory.GetTypeSerializer(type);
                    return _serializer.Deserializer(buffer);
                }
        }

    }
    public WriteFiledFromBuffer(type: string, obj: any, buffer: H5ByteBuffer) {

        //处理数组类型
        if (type.charAt(0) == '!') {
            var baseType = type.substr(1);
            let len: number = 0;
            if (!obj) {
                len = 0;
            }
            else {
                len = <number>obj.length;
            }
            buffer.WriteLengthData(len);
            for (var i = 0; i < len; i++) {
                this.WriteFiledFromBuffer(baseType, obj[i], buffer)
            }
            return;
        }

        //开始处理基础类型 
        switch (type) {
            case "0":
            case "1": buffer.writeByte(obj); break;
            case "2": buffer.writeShort(obj); break;
            case "3": buffer.writeUnsignedShort(obj); break;
            case "4": buffer.writeInt(obj); break;
            case "5": buffer.writeUnsignedInt(obj); break;
            case "6": buffer.writeLong(obj); break;
            case "7": buffer.writeUnsignedLong(obj); break;
            case "8": buffer.writeFloat(obj); break;
            case "9": buffer.writeDouble(obj); break;
            case "10": buffer.writeTimeSpan(obj); break;
            case "11": buffer.writeDateTime(obj); break;
            case "12": buffer.writeUTF8String(obj); break;
            case "13": buffer.writeH5ByteArray(obj); break;
            case "14": buffer.writeBoolean(obj); break;
            default:
                {
                    //当前类型是一个实体类型
                    var _serializer = TypeSerializerFactory.GetTypeSerializer(type);
                    var obj_buffer = _serializer.Serializer(obj);
                    obj_buffer.Reset();
                    buffer.writeBytes(obj_buffer)

                    break;
                }
        }
    }
}