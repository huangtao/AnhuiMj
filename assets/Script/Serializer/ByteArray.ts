
export default class ByteArray {


    public static readonly SIZE_OF_BOOLEAN = 1;
    public static readonly SIZE_OF_INT8 = 1;
    public static readonly SIZE_OF_INT16 = 2;
    public static readonly SIZE_OF_INT32 = 4;
    public static readonly SIZE_OF_UINT8 = 1;
    public static readonly SIZE_OF_UINT16 = 2;
    public static readonly SIZE_OF_UINT32 = 4;
    public static readonly SIZE_OF_FLOAT32 = 4;
    public static readonly SIZE_OF_FLOAT64 = 8;
    public static LITTLE_ENDIAN: string = "LITTLE_ENDIAN";
    public static BIG_ENDIAN: string = "BIG_ENDIAN";

    public static readonly BUFFER_EXT_SIZE: number = 0
    public static readonly EOF_code_point: number = -1;
    public static readonly EOF_byte: number = -1;


    public endian: string
    data: DataView
    private _position: number = 0;
    private write_position: number = 0;

    //构造器
    public constructor(buffer?: ArrayBuffer) {
        this._setArrayBuffer(buffer || new ArrayBuffer(ByteArray.BUFFER_EXT_SIZE));
        this.endian = ByteArray.BIG_ENDIAN;
    }
    public get position(): number { return this._position }
    public set position(value: number) {
        this._position = value;
        this.write_position = value > this.write_position ? value : this.write_position;
    }
    public get length(): number { return this.write_position; }
    public set length(value: number) {
        this.write_position = value;
        var tmp = new Uint8Array(new ArrayBuffer(value));
        var byteLength = this.data.buffer.byteLength;
        if (byteLength > value) {
            this._position = value;
        }
        var length = Math.min(byteLength, value);
        tmp.set(new Uint8Array(this.data.buffer, 0, length));
        this.buffer = tmp.buffer;
    }
    public get bufferOffset(): number { return this.data.byteOffset }
    public get bytesAvailable(): number { return this.data.byteLength - this._position; }
    public get buffer(): ArrayBuffer { return this.data.buffer; }
    public set buffer(value: ArrayBuffer) { this.data = new DataView(value); }






    /*******************************************************************************************************************/


    /**
           * 清除字节数组的内容，并将 length 和 position 属性重置为 0。 
           * @version Egret 2.4
           * @platform Web,Native
           * @language zh_CN
           */
    public clear() {
        this._setArrayBuffer(new ArrayBuffer(ByteArray.BUFFER_EXT_SIZE));
    }
    public writeByte(value: number) {
        this.validateBuffer(ByteArray.SIZE_OF_INT8);
        this.data.setInt8(this.position++, value);
    }
    public writeUTFBytes(value: string) {
        this._writeUint8Array(this.encodeUTF8(value));
    }
    public writeUnsignedShort(value: number) {

        this.validateBuffer(ByteArray.SIZE_OF_UINT16);
        this.data.setUint16(this.position, value, this.endian == ByteArray.LITTLE_ENDIAN);
        this.position += ByteArray.SIZE_OF_UINT16;
    }
    public writeInt(value: number) {
        this.validateBuffer(ByteArray.SIZE_OF_INT32);
        this.data.setInt32(this.position, value, this.endian == ByteArray.LITTLE_ENDIAN);
        this.position += ByteArray.SIZE_OF_INT32;

    }
    public writeDouble(value: number) {

        this.validateBuffer(ByteArray.SIZE_OF_FLOAT64);
        this.data.setFloat64(this.position, value, this.endian == ByteArray.LITTLE_ENDIAN);
        this.position += ByteArray.SIZE_OF_FLOAT64;
    }
    public writeBytes(bytes: ByteArray, offset?: number, length?: number) {
        if (offset === void 0) { offset = 0; }
        if (length === void 0) { length = 0; }
        if (offset < 0) {
            var writeLength;
            return;
        }
        if (length < 0) {
            return;
        }
        else if (length == 0) {
            writeLength = bytes.length - offset;
        }
        else {
            writeLength = Math.min(bytes.length - offset, length);
        }
        if (writeLength > 0) {
            this.validateBuffer(writeLength);
            var tmp_data = new DataView(bytes.buffer);
            var length_11 = writeLength;
            var BYTES_OF_UINT32 = 4;
            for (; length_11 > BYTES_OF_UINT32; length_11 -= BYTES_OF_UINT32) {
                this.data.setUint32(this._position, tmp_data.getUint32(offset));
                this.position += BYTES_OF_UINT32;
                offset += BYTES_OF_UINT32;
            }
            for (; length_11 > 0; length_11--) {
                this.data.setUint8(this.position++, tmp_data.getUint8(offset++));
            }
        }
    }
    public writeShort(value: number) {
        this.validateBuffer(ByteArray.SIZE_OF_INT16);
        this.data.setInt16(this.position, value, this.endian == ByteArray.LITTLE_ENDIAN);
        this.position += ByteArray.SIZE_OF_INT16;
    }
    public writeUnsignedInt(value: number) {
        this.validateBuffer(ByteArray.SIZE_OF_UINT32);
        this.data.setUint32(this.position, value, this.endian == ByteArray.LITTLE_ENDIAN);
        this.position += ByteArray.SIZE_OF_UINT32;
    }
    public writeFloat(value: number) {
        this.validateBuffer(ByteArray.SIZE_OF_FLOAT32);
        this.data.setFloat32(this.position, value, this.endian == ByteArray.LITTLE_ENDIAN);
        this.position += ByteArray.SIZE_OF_FLOAT32;
    }
    public writeBoolean(value: number) {
        this.validateBuffer(ByteArray.SIZE_OF_BOOLEAN);
        this.data.setUint8(this.position++, value ? 1 : 0);
    }






    public readUnsignedShort(): number {
        if (!this.validate(ByteArray.SIZE_OF_UINT16))
            return null;
        var value = this.data.getUint16(this.position, this.endian == ByteArray.LITTLE_ENDIAN);
        this.position += ByteArray.SIZE_OF_UINT16;
        return value;
    }
    public readInt(): number {
        if (!this.validate(ByteArray.SIZE_OF_INT32))
            return null;
        var value = this.data.getInt32(this.position, this.endian == ByteArray.LITTLE_ENDIAN);
        this.position += ByteArray.SIZE_OF_INT32;
        return value;
    }
    public readDouble(): number {
        if (!this.validate(ByteArray.SIZE_OF_FLOAT64))
            return null;
        var value = this.data.getFloat64(this.position, this.endian == ByteArray.LITTLE_ENDIAN);
        this.position += ByteArray.SIZE_OF_FLOAT64;
        return value;
    }
    public readUnsignedByte() {
        if (!this.validate(ByteArray.SIZE_OF_INT8))
            return null;
        return this.data.getUint8(this.position++);
    }
    public readUTFBytes(length) {
        if (!this.validate(length))
            return null;
        var bytes = new Uint8Array(this.buffer, this.bufferOffset + this.position, length);
        this.position += length;
        return this.decodeUTF8(bytes);
    }
    public readByte(): number {
        if (!this.validate(ByteArray.SIZE_OF_INT8))
            return null;
        return this.data.getInt8(this.position++);
    }
    public readShort(): number {
        if (!this.validate(ByteArray.SIZE_OF_INT16))
            return null;
        var value = this.data.getInt16(this.position, this.endian == ByteArray.LITTLE_ENDIAN);
        this.position += ByteArray.SIZE_OF_INT16;
        return value;
    }
    public readUnsignedInt(): number {
        if (!this.validate(ByteArray.SIZE_OF_UINT32))
            return null;
        var value = this.data.getUint32(this.position, this.endian == ByteArray.LITTLE_ENDIAN);
        this.position += ByteArray.SIZE_OF_UINT32;
        return value;
    }
    public readFloat(): number {
        if (!this.validate(ByteArray.SIZE_OF_FLOAT32))
            return null;
        var value = this.data.getFloat32(this.position, this.endian == ByteArray.LITTLE_ENDIAN);
        this.position += ByteArray.SIZE_OF_FLOAT32;
        return value;
    }
    public readBoolean(): boolean {
        if (!this.validate(ByteArray.SIZE_OF_BOOLEAN))
            return null;
        return this.data.getUint8(this.position++) != 0;
    }
    public readBytes(bytes, offset, length) {
        if (offset === void 0) { offset = 0; }
        if (length === void 0) { length = 0; }
        if (length == 0) {
            length = this.bytesAvailable;
        }
        else if (!this.validate(length)) {
            return null;
        }
        if (bytes) {
            bytes.validateBuffer(offset + length);
        }
        else {
            bytes = new ByteArray(new ArrayBuffer(offset + length));
        }
        //This method is expensive
        for (var i = 0; i < length; i++) {
            bytes.data.setUint8(i + offset, this.data.getUint8(this.position++));
        }
    };






    /*******************************************************************************************************************/



    encodeUTF8(str: string): Uint8Array {
        var pos = 0;
        var codePoints = this.stringToCodePoints(str);
        var outputBytes = [];
        while (codePoints.length > pos) {
            var code_point = codePoints[pos++];
            if (this.inRange(code_point, 0xD800, 0xDFFF)) {
                this.encoderError(code_point);
            }
            else if (this.inRange(code_point, 0x0000, 0x007f)) {
                outputBytes.push(code_point);
            }
            else {
                var count = void 0, offset = void 0;
                if (this.inRange(code_point, 0x0080, 0x07FF)) {
                    count = 1;
                    offset = 0xC0;
                }
                else if (this.inRange(code_point, 0x0800, 0xFFFF)) {
                    count = 2;
                    offset = 0xE0;
                }
                else if (this.inRange(code_point, 0x10000, 0x10FFFF)) {
                    count = 3;
                    offset = 0xF0;
                }
                outputBytes.push(this.div(code_point, Math.pow(64, count)) + offset);
                while (count > 0) {
                    var temp = this.div(code_point, Math.pow(64, count - 1));
                    outputBytes.push(0x80 + (temp % 64));
                    count -= 1;
                }
            }
        }
        return new Uint8Array(outputBytes);
    }
    decodeUTF8(data) {
        var fatal = false;
        var pos = 0;
        var result = "";
        var code_point;
        var utf8_code_point = 0;
        var utf8_bytes_needed = 0;
        var utf8_bytes_seen = 0;
        var utf8_lower_boundary = 0;
        while (data.length > pos) {
            var _byte = data[pos++];
            if (_byte == ByteArray.EOF_byte) {
                if (utf8_bytes_needed != 0) {
                    code_point = this.decoderError(fatal);
                }
                else {
                    code_point = ByteArray.EOF_code_point;
                }
            }
            else {
                if (utf8_bytes_needed == 0) {
                    if (this.inRange(_byte, 0x00, 0x7F)) {
                        code_point = _byte;
                    }
                    else {
                        if (this.inRange(_byte, 0xC2, 0xDF)) {
                            utf8_bytes_needed = 1;
                            utf8_lower_boundary = 0x80;
                            utf8_code_point = _byte - 0xC0;
                        }
                        else if (this.inRange(_byte, 0xE0, 0xEF)) {
                            utf8_bytes_needed = 2;
                            utf8_lower_boundary = 0x800;
                            utf8_code_point = _byte - 0xE0;
                        }
                        else if (this.inRange(_byte, 0xF0, 0xF4)) {
                            utf8_bytes_needed = 3;
                            utf8_lower_boundary = 0x10000;
                            utf8_code_point = _byte - 0xF0;
                        }
                        else {
                            this.decoderError(fatal);
                        }
                        utf8_code_point = utf8_code_point * Math.pow(64, utf8_bytes_needed);
                        code_point = null;
                    }
                }
                else if (!this.inRange(_byte, 0x80, 0xBF)) {
                    utf8_code_point = 0;
                    utf8_bytes_needed = 0;
                    utf8_bytes_seen = 0;
                    utf8_lower_boundary = 0;
                    pos--;
                    code_point = this.decoderError(fatal, _byte);
                }
                else {
                    utf8_bytes_seen += 1;
                    utf8_code_point = utf8_code_point + (_byte - 0x80) * Math.pow(64, utf8_bytes_needed - utf8_bytes_seen);
                    if (utf8_bytes_seen !== utf8_bytes_needed) {
                        code_point = null;
                    }
                    else {
                        var cp = utf8_code_point;
                        var lower_boundary = utf8_lower_boundary;
                        utf8_code_point = 0;
                        utf8_bytes_needed = 0;
                        utf8_bytes_seen = 0;
                        utf8_lower_boundary = 0;
                        if (this.inRange(cp, lower_boundary, 0x10FFFF) && !this.inRange(cp, 0xD800, 0xDFFF)) {
                            code_point = cp;
                        }
                        else {
                            code_point = this.decoderError(fatal, _byte);
                        }
                    }
                }
            }
            //Decode string
            if (code_point !== null && code_point !== ByteArray.EOF_code_point) {
                if (code_point <= 0xFFFF) {
                    if (code_point > 0)
                        result += String.fromCharCode(code_point);
                }
                else {
                    code_point -= 0x10000;
                    result += String.fromCharCode(0xD800 + ((code_point >> 10) & 0x3ff));
                    result += String.fromCharCode(0xDC00 + (code_point & 0x3ff));
                }
            }
        }
        return result;
    }
    stringToCodePoints(str: string) {
        /** @type {Array.<number>} */
        var cps = [];
        // Based on http://www.w3.org/TR/WebIDL/#idl-DOMString
        var i = 0, n = str.length;
        while (i < str.length) {
            var c = str.charCodeAt(i);
            if (!this.inRange(c, 0xD800, 0xDFFF)) {
                cps.push(c);
            }
            else if (this.inRange(c, 0xDC00, 0xDFFF)) {
                cps.push(0xFFFD);
            }
            else {
                if (i == n - 1) {
                    cps.push(0xFFFD);
                }
                else {
                    var d = str.charCodeAt(i + 1);
                    if (this.inRange(d, 0xDC00, 0xDFFF)) {
                        var a = c & 0x3FF;
                        var b = d & 0x3FF;
                        i += 1;
                        cps.push(0x10000 + (a << 10) + b);
                    }
                    else {
                        cps.push(0xFFFD);
                    }
                }
            }
            i += 1;
        }
        return cps;
    }
    inRange(a, min, max): boolean {
        return min <= a && a <= max;
    }
    div(n, d) {
        return Math.floor(n / d);
    };
    decoderError(fatal, code_point = null) {
        throw cc.error(fatal)
    };
    encoderError(code_point) {
        throw cc.error(code_point)
    };
    validateBuffer(len, needReplace = false) {
        if (needReplace === void 0) { needReplace = false; }
        this.write_position = len > this.write_position ? len : this.write_position;
        len += this._position;
        if (this.data.byteLength < len || needReplace) {
            var tmp = new Uint8Array(new ArrayBuffer(len + ByteArray.BUFFER_EXT_SIZE));
            var length_12 = Math.min(this.data.buffer.byteLength, len + ByteArray.BUFFER_EXT_SIZE);
            tmp.set(new Uint8Array(this.data.buffer, 0, length_12));
            this.buffer = tmp.buffer;
        }
    };
    public validate(len: number) {
        //len += this.data.byteOffset;
        if (this.data.byteLength > 0 && this._position + len <= this.data.byteLength) {
            return true;
        }
        else {
            throw cc.error(1025)
        }
    };
    _setArrayBuffer(buffer: ArrayBuffer) {
        this.write_position = buffer.byteLength;
        this.data = new DataView(buffer);
        this._position = 0;
    };
    _writeUint8Array(bytes, validateBuffer?) {
        if (validateBuffer === void 0) { validateBuffer = true; }
        if (validateBuffer) {
            this.validateBuffer(this.position + bytes.length);
        }
        for (var i = 0; i < bytes.length; i++) {
            this.data.setUint8(this.position++, bytes[i]);
        }
    };
}