
import H5ByteBuffer from "./H5ByteBuffer"

 

/**
 * 定义一个接口，以实现消息对象的序列化及反序列化操作
 */
export interface ITypeSerializer {
    /**
    * 表示序列化器对象的唯一键 
    */
    Key: string;

    /**
    * 消息序列化器的反序列化方法
    */
    Deserializer(buffer: H5ByteBuffer): any;

    /**
    * 消息类型的序列化方法
    */
    Serializer(obj: any): H5ByteBuffer;
};

    