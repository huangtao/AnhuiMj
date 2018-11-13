import { UyiObject } from "../Serializer/UyiObject";
import { SerializerCreator } from "../Serializer/SerializerCreator";
import { TSRH } from "../Serializer/TypeSerializerRegisterHandle";
export module QL_Platfrom2Web_Session {
    /**
     *
     * 创建时间：2018年11月09日 17:32:55
     * 创建人员：DESKTOP-U2RLB94\Cyq
     * 备注：
     *
     */
    export enum LogonAccessTokenDataType{
        /**
        * 
        */
        Platfrom = 0,
        /**
        * 
        */
        WebApi = 1,    
    }


    /**
     *
     * @创建时间：2018年11月09日 17:32:55
     * @创建人员：DESKTOP-U2RLB94\Cyq
     * @备注信息：玩家登陆服务器平台用 AccessToken 数据对象
            <para>签名方式分两种：</para>
            1、Platfrom 签名方式UserID+TimeTick+Password+LogonType
            <para>2、WebApi 签名方式：UserID+TimeTick+LogonType+web_Secret </para>
     *
     */
    export class LogonAccessTokenData_V0 extends UyiObject {
        public constructor()
        {
            super();
            this.$T="QL.Platfrom2Web.Session.LogonAccessTokenData_V0"; 
        }
       /**
        *
        */
       public TimeTick: string = "";
       /**
        *
        */
       public Sign: string = "";
       /**
        *
        */
       public LogonType: LogonAccessTokenDataType = 0;
       /**
        *
        */
       public UserId : number = 0;
       /**
        *所属分区
        */
       public Region : string = "";
       /**
        *
        */
       public Version : number = 0;
   
    }
    SerializerCreator.Register("QL.Platfrom2Web.Session.LogonAccessTokenData_V0", function () {return new LogonAccessTokenData_V0()})
    TSRH.RSerializer("QL.Platfrom2Web.Session.LogonAccessTokenData_V0", "5|UserId&12|TimeTick&12|Sign&1|LogonType", "QL.Platfrom2Web.Session.LogonAccessTokenData_V0");

}