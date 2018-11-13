

import ByteArray from "./ByteArray"
import { DateTime, TimeSpan } from "./DateTime"


/**
 * 客户端统一使用的字节缓冲区数组
 */
export default class H5ByteBuffer extends ByteArray {
    public constructor(buffer?: ArrayBuffer) {
        super(buffer);
        this.endian = ByteArray.BIG_ENDIAN;
    }
    static MaxUInt8_: string = "255";
    static MaxInt8__: string = "127";
    static MaxUInt16: string = "65535";
    static MaxInt16_: string = "32767";
    static MaxUInt24: string = "16777215";
    static MaxInt24_: string = "8388607";
    static MaxUInt32: string = "4294967295";
    static MaxInt32_: string = "2147483647";
    static MaxUInt40: string = "1099511627775";
    static MaxInt40_: string = "549755813887";
    static MaxUInt48: string = "281474976710655";
    static MaxInt48_: string = "140737488355327";
    static MaxUInt56: string = "72057594037927900";
    static MaxInt56_: string = "36028797018964000";
    static MaxUInt64: string = "18446744073709600000";
    static MaxInt64_: string = "9223372036854780000";

	/**
	 * 从字节数据的开始位置删除指定长度的字节数据,并将数组的游标位置重置
	 */
    public RemoveBytes(startIndex: number, count: number) {
        //将读取游标定位到开始位置
        this.position = 0;
        //定义一个缓冲区接收删除后的字节数据
        var buffer = new H5ByteBuffer();
        if (startIndex > 0) {
            //读入开头数据
            buffer.writeBytes(this, 0, startIndex);
        }
        //跳过删除的数据写入后续数据
        buffer.writeBytes(this, startIndex + count, this.length - startIndex - count);
        this.clear();
        this.writeBytes(buffer, 0, buffer.length);
    }
    /**
     * 读取并移除
     * */
    public Public_ReadAndRemoveBytes(startIdx: number, readCount: number): H5ByteBuffer {
        if (this.length > (startIdx + readCount)) {
            var re: H5ByteBuffer = new H5ByteBuffer();
            re = this.UyiReadBytes(startIdx, readCount);
            this.RemoveBytes(startIdx, readCount);
            return re;
        }
        return null;
    }
	/**
	 * 读取指定索引位置的无符号字节数据
	 */
    public ReadByteAt(index: number): number {
        if (index >= this.length)
            throw new Error("索引超出指定界限");
        var curpos = this.position;
        this.position = index;
        var data = this.readUnsignedByte();
        this.position = curpos;
        return data;
    }

    public UyiReadBytes(index: number, length: number): H5ByteBuffer {
        if (index + length > this.length)
            throw new Error("指定的索引超出数组界限");

        var curPos = this.position;
        this.position = 0;
        var data = new H5ByteBuffer();
        data.writeBytes(this, index, length);
        this.position = curPos;
        return data;
    }
	/**
	 * 重置缓冲区数据的读取游标的位置
	 */
    public Reset(): void {
        this.position = 0;
    }

    /*******************************************************************   UTF8String    ******************************************************/
    /**
     * 写入一个字符串
     */
    public writeUTF8String(str: string) {
        if (null == str || undefined == str) {
            this.writeByte(0);
            return;
        }
        var data = new H5ByteBuffer();
        data.writeUTFBytes(str);
        data.Reset();
        this.writeH5ByteArray(data);

        //        this.writeInt(data.length);
        //        this.writeUTFBytes(str);

    }
    /**
     * 读取一个字符串
     */
    public readUTF8String(): string {
        var buffer = this.readH5ByteArray();
        if (buffer.length == 0)
            return "";
        buffer.Reset();
        return buffer.readUTFBytes(buffer.length);
    }

    /*******************************************************************   UTF8String    ******************************************************/
    /*******************************************************************   H5ByteArray    ******************************************************/


    /**
     * 写入一个字节数组
     */
    public writeH5ByteArray(data: any) {

        let len: number = 0;
        if (!data) {
            len = 0;
        }
        else {
            len = data.length;
        }



        if (len < 254) {
            this.writeByte(len);
        }
        else if (len <= 65535) {
            this.writeByte(254);
            this.writeUnsignedShort(len)
        }
        else {

            this.writeByte(255);
            this.writeInt(len)
        }

        if (len <= 0) {
            return;
        }

        if (data instanceof Array) {
            var d = new H5ByteBuffer();
            for (var i = 0; i < len; i++) {
                d.writeByte(data[i]);
            }
            d.Reset();
            this.writeBytes(d);
            return;
        }
        this.writeBytes(data);


    }
    /**
     * 读取一个字节数组
     */
    public readH5ByteArray(): H5ByteBuffer {
        var len = this.readUnsignedByte();
        if (len == 254) {
            len = this.readUnsignedShort();
        }
        else if (len == 255) {
            len = this.readInt();
        }
        var data = new H5ByteBuffer();
        if (len > 0)
            this.readBytes(data, 0, len);
        return data;
    }
    /*******************************************************************   H5ByteArray    ******************************************************/
    /*******************************************************************   TimeClass    *****************************************************    
    /**
     * 读取一个时间对象信息
     */
    public readDateTime(): DateTime {
        return DateTime.FromTimeStamp(this.readDouble());
    }
    /**
     * 写入一个时间对象信息
     * @param data 表示时间的对象信息
     */
    public writeDateTime(data: DateTime) {
        this.writeDouble(data.TimeStamp);
    }


    /**
     * 读取一个时间对象信息
     */
    public readTimeSpan(): TimeSpan {
        return TimeSpan.FromTotalSeconds(this.readDouble());
    }
    /**
     * 写入一个时间对象信息
     * @param data 表示时间的对象信息
     */
    public writeTimeSpan(data: TimeSpan) {
        this.writeDouble(data.TotalSeconds);
        //this.writeUnsignedInt
    }

    /*******************************************************************   TimeClass     ******************************************************/
    /***************************************************************  LONG  Number  ********************************/

	/**
	 * 写入一个无符号长整形数据
	 */
    public writeUnsignedLong(data: number) {
        this.writeLong(data);
    }
    /** 
     *  读取一个无符号的长整形数据    
     */
    public readUnsignedLong(): number {
        var num = this.readDouble();
        return num;
    }
	/**
	 * 写入一个长整形数据
	 */
    public writeLong(value: number) {
        this.writeDouble(value);
    }
    /** 
     *  读取一个长整形数据    
     */
    public readLong(): number {
        return this.readDouble();
    }

    /*************************************************************** LONG  Number ********************************/

    public GetAllArray(): Array<number> {

        var data: Array<number> = [];
        var len = this.length;
        var index = 0;
        while (index < len) {
            data.push(this.ReadByteAt(index));
            index++;

        }
        return data;
    }

    public WriteArray(value: Array<number>): void {
        while (value.length > 0) {
            this.writeByte(value.shift());
        }
    }



    /**
     * 
     */
    public WriteLengthData(value: number): void {
        if (value < 254) {
            this.writeByte(value);
        }
        else if (value <= 65535) {
            this.writeByte(254);
            this.writeUnsignedShort(value);
        }
        else {
            this.writeByte(255);
            this.writeInt(value);
        }
    }

    public ReadLengthData(): number {
        var len = this.readUnsignedByte();
        if (len == 254) {
            len = this.readUnsignedShort();
        }
        else if (len == 255) {
            len = this.readInt();
        }
        return len;
    }
}






