
import { ITypeSerializer } from "./ITypeSerializer"

export default class TypeSerializerFactory {
    static t: any = {};
    public static Register(key: string, value: ITypeSerializer): boolean {
        TypeSerializerFactory.t[key] = value;
        return true;
    }
    public static GetTypeSerializer(Key: string): ITypeSerializer {
        var s = TypeSerializerFactory.t[Key];
        if (!s) return null;
        return s;
    }
    public static Log(){
        cc.log(TypeSerializerFactory.t);
    }
}