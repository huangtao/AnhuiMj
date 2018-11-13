
import { ITypeSerializer } from "./ITypeSerializer";
import TypeSerializerFactory from "./TypeSerializerFactory";
import { BaseSerializer } from "./BaseSerializer";


/**
 *
 * @author 
 *
 */

export class TSRH {
    public constructor() {
    }

    static R(serialzier: ITypeSerializer): void {
        var key = serialzier.Key;
        TypeSerializerFactory.Register(key, serialzier);
    }

    public static RegisterHandle() {

    }



    public static RegisterSerializer(o) {
        for (var i in o) {
            var s = new BaseSerializer();
            s.Key = o[i][0];
            s.F = o[i][1];
            s.T = o[i][2];
            TSRH.R(s);
        }
    }



    public static RSerializer(key: string, f: string, t: string) {
        var s = new BaseSerializer();
        s.Key = key;
        s.F = f;
        s.T = t;
        TSRH.R(s);
    }


}
TSRH.RegisterHandle();
class TypeSerializerRegisterHandle {

    /**
     * 注册序列化器
     * @param serialzier
     */
    static TypeRegisterHandle(serialzier: ITypeSerializer): void {
        var key = serialzier.Key;
        TypeSerializerFactory.Register(key, serialzier);
    }

} 