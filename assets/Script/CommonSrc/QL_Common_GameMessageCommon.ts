import { UyiObject } from "../Serializer/UyiObject";
import { SerializerCreator } from "../Serializer/SerializerCreator";
import { TSRH } from "../Serializer/TypeSerializerRegisterHandle";
import {GameIF} from "./GameIF";
export module QL_Common_GameMessageCommon {
    /**
     *
     * @创建时间：2018年11月09日 17:32:55
     * @创建人员：DESKTOP-U2RLB94\Cyq
     * @备注信息：消息主副命令码定义
     *
     */
    export class GameMessageCommonSubCode{
    /**
    * 大厅和游戏插件的直接交互消息主码
    */
   public static readonly MainId = 32;
    /**
    * 
    */
   public static readonly MSG_C_Hall2GamePluginMessage = 1;

    }


    /**
     *
     * @创建时间：2018年11月09日 17:32:55
     * @创建人员：DESKTOP-U2RLB94\Cyq
     * @备注信息：大厅和游戏插件直接的交互公共消息基础基类
     *
     */
    export class GameMessageCommonBase extends GameIF.GameMessage {
        public constructor()
        {
            super();
            this.$T="QL.Common.GameMessageCommon.GameMessageCommonBase"; 
        }
       /**
        *服务器编号（指定该消息将要被发送到的服务器编号）,可以在房间信息获取
        */
       public ServerUuid: string = "";
       /**
        *消息需要投递到的桌子编号
        */
       public TableID: number = 0;
       /**
        *该条消息的发送者，不用赋值，平台在接收到该消息时会直接绑定当前会话的玩家ID
        */
       public UserId: number = 0;
       /**
        *指示当前的房间是不是创建房间模式
        */
       public IsCreateRoom: boolean = false;
   
    }
    SerializerCreator.Register("QL.Common.GameMessageCommon.GameMessageCommonBase", function () {return new GameMessageCommonBase()})
    TSRH.RSerializer("QL.Common.GameMessageCommon.GameMessageCommonBase", "14|IsCreateRoom&12|ServerUuid&5|TableID&5|UserId", "QL.Common.GameMessageCommon.GameMessageCommonBase");


    /**
     *
     * @创建时间：2018年11月09日 17:32:55
     * @创建人员：DESKTOP-U2RLB94\Cyq
     * @备注信息：
     *
     */
    export class MSG_C_Hall2GamePluginMessage extends GameMessageCommonBase {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 32;
            this.wSubCmdID = 1;
            this.$T="QL.Common.GameMessageCommon.MSG_C_Hall2GamePluginMessage"; 
        }
       /**
        *处理命令的名称
        */
       public Handle: string = "";
       /**
        *处理命令的参数
        */
       public Params: string = "";
   
    }
    SerializerCreator.Register("QL.Common.GameMessageCommon.MSG_C_Hall2GamePluginMessage", function () {return new MSG_C_Hall2GamePluginMessage()})
    TSRH.RSerializer("8193", "14|IsCreateRoom&12|ServerUuid&5|TableID&5|UserId&12|Handle&12|Params", "QL.Common.GameMessageCommon.MSG_C_Hall2GamePluginMessage");

}