import { UyiObject } from "../Serializer/UyiObject";
import { SerializerCreator } from "../Serializer/SerializerCreator";
import { TSRH } from "../Serializer/TypeSerializerRegisterHandle";
export module GameIF {
    /**
     *
     * @创建时间：2018年11月09日 17:32:55
     * @创建人员：DESKTOP-U2RLB94\Cyq
     * @备注信息：消息基类,所有需要传输的消息均需要继承该类
     *
     */
    export class CustomMessage extends UyiObject {
        public constructor()
        {
            super();
            this.$T="GameIF.CustomMessage"; 
        }
       /**
        *主命令码，根据PacketContract属性值解析，不用赋值
        */
       public wMainCmdID : number = 0;
       /**
        *副命令码，根据PacketContract属性值解析，不用赋值
        */
       public wSubCmdID : number = 0;
       get_TypeCode(): string {
        if(this.wMainCmdID == 0 && this.wSubCmdID == 0)
            return this.FullName();
        else
            return (this.wMainCmdID << 8 | this.wSubCmdID).toString();
        }   
    }
    SerializerCreator.Register("GameIF.CustomMessage", function () {return new CustomMessage()})
    TSRH.RSerializer("GameIF.CustomMessage", "", "GameIF.CustomMessage");


    /**
     *
     * @创建时间：2018年11月09日 17:32:55
     * @创建人员：DESKTOP-U2RLB94\Cyq
     * @备注信息：游戏通用消息;
            主命令码：
            0~50:系统指令，平台
            51-255：游戏指令
            副命令码游戏开发者自己定义
     *
     */
    export class GameMessage extends CustomMessage {
        public constructor()
        {
            super();
            this.$T="GameIF.GameMessage"; 
        }
   
    }
    SerializerCreator.Register("GameIF.GameMessage", function () {return new GameMessage()})
    TSRH.RSerializer("GameIF.GameMessage", "", "GameIF.GameMessage");


    /**
     *
     * @创建时间：2018年11月09日 17:32:55
     * @创建人员：DESKTOP-U2RLB94\Cyq
     * @备注信息：H5客户端连接成功的回调通知消息
     *
     */
    export class H5Connected extends CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 1;
            this.wSubCmdID = 1;
            this.$T="GameIF.H5Connected"; 
        }
   
    }
    SerializerCreator.Register("GameIF.H5Connected", function () {return new H5Connected()})
    TSRH.RSerializer("257", "", "GameIF.H5Connected");


    /**
     *
     * 创建时间：2018年11月09日 17:32:55
     * 创建人员：DESKTOP-U2RLB94\Cyq
     * 备注：
     *
     */
    export enum FrozenUserAccountObjectType{
        /**
        * 
        */
        Unknown = 0,
        /**
        * 
        */
        PlayerId = 1,
        /**
        * 
        */
        GroupId = 2,
        /**
        * 
        */
        AgentId = 3,    
    }

}