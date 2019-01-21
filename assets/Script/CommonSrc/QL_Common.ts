import { UyiObject } from "../Serializer/UyiObject";
import { SerializerCreator } from "../Serializer/SerializerCreator";
import { TSRH } from "../Serializer/TypeSerializerRegisterHandle";
import {GameIF_Common} from "./GameIF_Common";
import {DateTime} from "../Serializer/DateTime";
import {GameIF} from "./GameIF";
export module QL_Common {
    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：消息主码编号，定义各个服务器传递数据所需要的消息主码,包含方向性定义
     *
     */
    export class Main_CommonID{
    /**
    * 服务器内部通讯处理的消息,礼游平台基础通讯消息体定义
    */
   public static readonly BaseGeneral = 1;
    /**
    * 登录服务器发送给登录服务器？不要奇怪这个是发给其他登录服务器的指令消息，在多个登录服务器同步消息使用
    */
   public static readonly LS2LS = 2;
    /**
    * 登录服务器发给游戏服务器的消息主命令码
    */
   public static readonly LS2GS = 3;
    /**
    * 服务器通用主码，一般用于服务器启动注册，停止信息报告任务等
    */
   public static readonly ServerGeneral = 4;
    /**
    * 游戏服务器发给登陆服务器的消息主命令码
    */
   public static readonly GS2LS = 5;
    /**
    * GMTools 操作命令码
    */
   public static readonly GMTools = 6;
    /**
    * 往登录服务器
    */
   public static readonly C2LS = 31;
    /**
    * 大厅和游戏插件的直接交互消息主码
    */
   public static readonly G2LS = 32;
    /**
    * 往游戏服务器
    */
   public static readonly C2GS = 41;
    /**
    * 从登录服务器来
    */
   public static readonly LS2C = 39;
    /**
    * 从游戏服务器来
    */
   public static readonly GS2C = 49;

    }


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：服务器内部通讯处理的消息,礼游平台基础通讯消息体定义
     *
     */
    export class SUB_BaseGeneral_CommonID{
    /**
    * 定时器消息
    */
   public static readonly GameTimerMsg = 0;
    /**
    * H5客户端连接成功的回调通知消息
    */
   public static readonly H5Connected = 1;
    /**
    * 一个空消息，服务端标记使用，大厅请不要使用该消息体
    */
   public static readonly NullMsg = 2;
    /**
    * 管道释放消息
    */
   public static readonly PipelineDisposed = 3;
    /**
    * 服务端测试通信序列化消息体
    */
   public static readonly ServerMaintain = 4;

    }


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：服务器内部通讯处理的消息,礼游平台基础通讯消息体定义
     *
     */
    export class SUB_LS2LS_CommonID{
    /**
    * 玩家重复登录
    */
   public static readonly UserRepeatLogon = 1;
    /**
    * 玩家登陆
    */
   public static readonly PlayerLogon = 2;
    /**
    * 服务器之间中转服务器消息
    */
   public static readonly RouteUserMessage = 3;
    /**
    * 系统跑马灯消息
    */
   public static readonly SystemHornMsg = 4;

    }


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：服务器内部通讯处理的消息,礼游平台基础通讯消息体定义
     *
     */
    export class SUB_GS2LS_CommonID{
    /**
    * 更新场地信息
    */
   public static readonly UpdateGameRoomInfo = 1;
    /**
    * 玩家创建桌子的通知信息
    */
   public static readonly UserCreateTableNotice = 2;
    /**
    * 给指定的玩家发送数据，该消息会通过中心服务器中转发送给相应服务器处理,如果玩家不在线会被丢弃
    */
   public static readonly SendDataToPlayer = 3;

    }


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：游戏内部投票器类型
     *
     */
    export class SUB_Code_GameVoteType{
    /**
    * 游戏续局
    */
   public static readonly GameContinue = 1;

    }


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：无效值定义
     *
     */
    export class InvalidValue{
    /**
    * 无效的ID
    */
   public static readonly InvalidID = 0;
    /**
    * 无效的索引
    */
   public static readonly InvalidIdx = -1;
    /**
    * 无效的桌子号
    */
   public static readonly InvalidTableID = 0;
    /**
    * 无效的椅子号
    */
   public static readonly InvalidChairID = 255;
    /**
    * 排名无效值
    */
   public static readonly InvlidRank = 0;
    /**
    * 
    */
   public static readonly InvalidRoomID = 0;

    }


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：常量值定义
     *
     */
    export class ConstValueDef{
    /**
    * ios平台
    */
   public static readonly platform_ios = 1;
    /**
    * android平台
    */
   public static readonly platform_android = 2;
    /**
    * web版本
    */
   public static readonly platform_web = 4;
    /**
    * pc版本
    */
   public static readonly platform_pc = 8;
    /**
    * h5版本
    */
   public static readonly platform_h5 = 16;
    /**
    * mac版本
    */
   public static readonly platform_mac = 32;

    }


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家数据(超简版)
     *
     */
    export class PlayerDataSimple extends UyiObject {
        public constructor()
        {
            super();
            this.$T="QL.Common.PlayerDataSimple"; 
        }
       /**
        *昵称
        */
       public NickName: string = "";
       /**
        *头像
        */
       public Header: string = "";
       /**
        *玩家ID
        */
       public UserID : number = 0;
   
    }
    SerializerCreator.Register("QL.Common.PlayerDataSimple", function () {return new PlayerDataSimple()})
    TSRH.RSerializer("QL.Common.PlayerDataSimple", "12|Header&12|NickName&5|UserID", "QL.Common.PlayerDataSimple");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家数据
     *
     */
    export class PlayerData extends PlayerDataSimple {
        public constructor()
        {
            super();
            this.$T="QL.Common.PlayerData"; 
        }
       /**
        *友情树等级（下级用户总数）
        */
       public LV: number = 0;
       /**
        *玩家的VIP等级
        */
       public VipLV: number = 0;
       /**
        *玩家背包数据
        */
       public MoneyBag : MoneyBag = null;
   
    }
    SerializerCreator.Register("QL.Common.PlayerData", function () {return new PlayerData()})
    TSRH.RSerializer("QL.Common.PlayerData", "5|LV&QL.Common.MoneyBag|MoneyBag&12|Header&12|NickName&5|UserID&1|VipLV", "QL.Common.PlayerData");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家客户端版本，带金币钻石
     *
     */
    export class PlayerBase extends PlayerData {
        public constructor()
        {
            super();
            this.$T="QL.Common.PlayerBase"; 
        }
       /**
        *玩家性别 1男 2女
        */
       public Gender: number = 0;
       /**
        *客户端登录时携带的附加参数
        */
       public CAttachData: KeyValueData[] = null;
       /**
        *指示玩家是否是AI
        */
   
    }
    SerializerCreator.Register("QL.Common.PlayerBase", function () {return new PlayerBase()})
    TSRH.RSerializer("QL.Common.PlayerBase", "!QL.Common.KeyValueData|CAttachData&1|Gender&5|LV&QL.Common.MoneyBag|MoneyBag&12|Header&12|NickName&5|UserID&1|VipLV", "QL.Common.PlayerBase");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：
     *
     */
    export class MoneyBag extends UyiObject {
        public constructor()
        {
            super();
            this.$T="QL.Common.MoneyBag"; 
        }
       /**
        *
        */
       public Empty: MoneyBag = null;
       /**
        *金币
        */
       public GoldNum : number = 0;
       /**
        *钻石
        */
       public DiamondNum : number = 0;
       /**
        *玩家金豆的数量
        */
       public RMBNum : number = 0;
       /**
        *玩家活跃度
        */
       public QiDouNum : number = 0;
       /**
        *
        */
       public Item : number = 0;
       /**
        *
        */
       public _data : PlayerMoneyBagBase[] = null;
   
    }
    SerializerCreator.Register("QL.Common.MoneyBag", function () {return new MoneyBag()})
    TSRH.RSerializer("QL.Common.MoneyBag", "!QL.Common.PlayerMoneyBagBase|_data", "QL.Common.MoneyBag");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家客户端版本，带金币钻石
     *
     */
    export class Player extends PlayerBase {
        public constructor()
        {
            super();
            this.$T="QL.Common.Player"; 
        }
       /**
        *用户名
        */
       public UserAccount: string = "";
       /**
        *用户登陆成功刷新的登陆令牌，下次可以使用该令牌自动登陆，有效期7天，每登陆一次刷新一次
        */
       public UserLogonToken: string = "";
       /**
        *客户端可以长时间保存玩家登陆信息令牌，可用于用户自动登录
        */
       public LogonCacheToken: string = "";
       /**
        *玩家当前的外网IP
        */
       public UserIP: string = "";
       /**
        *玩家绑定的代理编号Id
        */
       public AgentId: number = 0;
       /**
        *真实姓名
        */
       public RealName: string = "";
       /**
        *手机号码
        */
       public PhoneNum: string = "";
       /**
        *身份证号码
        */
       public IdCardNum: string = "";
       /**
        *附加参数
        */
       public AttachParam: KeyValueData[] = null;
   
    }
    SerializerCreator.Register("QL.Common.Player", function () {return new Player()})
    TSRH.RSerializer("QL.Common.Player", "5|AgentId&!QL.Common.KeyValueData|AttachParam&!QL.Common.KeyValueData|CAttachData&1|Gender&5|LV&QL.Common.MoneyBag|MoneyBag&12|Header&12|NickName&5|UserID&1|VipLV&12|IdCardNum&12|LogonCacheToken&12|PhoneNum&12|RealName&12|UserAccount&12|UserIP&12|UserLogonToken", "QL.Common.Player");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：
     *
     */
    export class UserTagObjectBase extends UyiObject {
        public constructor()
        {
            super();
            this.$T="QL.Common.UserTagObjectBase"; 
        }
   
    }
    SerializerCreator.Register("QL.Common.UserTagObjectBase", function () {return new UserTagObjectBase()})
    TSRH.RSerializer("QL.Common.UserTagObjectBase", "", "QL.Common.UserTagObjectBase");


    /**
     *
     * 创建时间：2018年12月13日 22:07:32
     * 创建人员：SHENRUI\admin
     * 备注：游戏场地状态
            0，初始，尚未编辑 （保存）
            1，编辑，尚未审核 （提交）
            2，审核，尚未开始（不能再编辑）
            3，开始运行
            4，停止运行：（系统维护）
            5，停止运行：（租金不够）
            6，停止运行：（其他原因）
            7. 停止运行：（红包不足）
            8. 停止运行: 商户停办
     *
     */
    export enum RoomState{
        /**
        * 未知
        */
        Unknown = 0,
        /**
        * 正常运行
        */
        Running = 3,
        /**
        * 停止:系统维护
        */
        Stop = 4,
        /**
        * 停止:租金不够
        */
        StopByNoMoney = 5,
        /**
        * 停止:其他原因
        */
        StopByOtherReason = 6,
        /**
        * 停止:红包不足
        */
        StopByNoRedGift = 7,
        /**
        * 停止：商户停办
        */
        StopByAgentStop = 8,
        /**
        * 等待：即将开始比赛
        */
        Upcoming = 9,    
    }


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：场地信息的最终基类，包含一个场地ID
     *
     */
    export class RoomInfoSingleID extends UserTagObjectBase {
        public constructor()
        {
            super();
            this.$T="QL.Common.RoomInfoSingleID"; 
        }
       /**
        *游戏场地ID
        */
       public ID: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.RoomInfoSingleID", function () {return new RoomInfoSingleID()})
    TSRH.RSerializer("QL.Common.RoomInfoSingleID", "5|ID", "QL.Common.RoomInfoSingleID");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：桌子信息
     *
     */
    export class TableInfo extends UyiObject {
        public constructor()
        {
            super();
            this.$T="QL.Common.TableInfo"; 
        }
       /**
        *只是当前桌子所属的群Id,如果房间已经绑定牌友群则为非零值，否则为零
        */
       public GroupId: number = 0;
       /**
        *桌子号
        */
       public TableID: number = 0;
       /**
        *桌子上的玩家信息集合
        */
       public TablePlayerList: TablePlayer[] = null;
   
    }
    SerializerCreator.Register("QL.Common.TableInfo", function () {return new TableInfo()})
    TSRH.RSerializer("QL.Common.TableInfo", "5|TableID&!QL.Common.TablePlayer|TablePlayerList", "QL.Common.TableInfo");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：桌子上的玩家信息
     *
     */
    export class TablePlayer extends UserTagObjectBase {
        public constructor()
        {
            super();
            this.$T="QL.Common.TablePlayer"; 
        }
       /**
        *昵称
        */
       public NickName : string = "";
       /**
        *头像
        */
       public FaceID : string = "";
       /**
        *玩家ID
        */
       public PlayerID : number = 0;
       /**
        *玩家成长树等级
        */
       public PlayerLV : number = 0;
       /**
        *玩家VIP等级
        */
       public VIPLV : number = 0;
       /**
        *玩家在游戏服务器上的状态
        */
       public PlayerState : GState = 0;
       /**
        *玩家持有的金豆数量
        */
       public GoldNum : number = 0;
       /**
        *玩家持有的当前金币数量
        */
       public RMBNum : number = 0;
       /**
        *玩家持有的钻石数量
        */
       public DiamondsNum : number = 0;
       /**
        *玩家活跃度
        */
       public QiDouNum : number = 0;
       /**
        *玩家背包数据
        */
       public MoneyBag : MoneyBag = null;
       /**
        *表示玩家的性别 1-男 2-女
        */
       public Gender : number = 0;
       /**
        *玩家IP
        */
       public UserIP : string = "";
       /**
        *客户端登录时携带的附加参数
        */
       public CAttachData : KeyValueData[] = null;
   
    }
    SerializerCreator.Register("QL.Common.TablePlayer", function () {return new TablePlayer()})
    TSRH.RSerializer("QL.Common.TablePlayer", "!QL.Common.KeyValueData|CAttachData&12|FaceID&1|Gender&12|NickName&5|PlayerID&5|PlayerLV&1|PlayerState&12|UserIP&1|VIPLV", "QL.Common.TablePlayer");


    /**
     *
     * 创建时间：2018年12月13日 22:07:32
     * 创建人员：SHENRUI\admin
     * 备注：指定当前登录的用户信息
     *
     */
    export enum UserType{
        /**
        * 正常用户
        */
        Normal = 1,
        /**
        * 测试用户
        */
        Tester = 2,
        /**
        * GM用户
        */
        GM = 3,    
    }


    /**
     *
     * 创建时间：2018年12月13日 22:07:32
     * 创建人员：SHENRUI\admin
     * 备注：游戏状态
            0:正常
            1:显示但不准进入
            2:不显示
     *
     */
    export enum GameState{
        /**
        * 正常
        */
        Normal = 0,
        /**
        * 显示但不准进入
        */
        ShowCannotJoin = 1,
        /**
        * 隐藏,不显示
        */
        Hide = 2,    
    }


    /**
     *
     * 创建时间：2018年12月13日 22:07:32
     * 创建人员：SHENRUI\admin
     * 备注：货币种类
     *
     */
    export enum CurrencyType{
        /**
        * 未知
        */
        Unknown = 0,
        /**
        * 人民币
        */
        RMB = 1,
        /**
        * 钻石
        */
        Diamond = 2,
        /**
        * 金币
        */
        Gold = 3,
        /**
        * 七豆
        */
        QiDou = 4,
        /**
        * 记分币种
        */
        MatchScore = 10,    
    }


    /**
     *
     * 创建时间：2018年12月13日 22:07:32
     * 创建人员：SHENRUI\admin
     * 备注：场地类型
     *
     */
    export enum RoomType{
        /**
        * 未知
        */
        Unknown = 0,
        /**
        * 多人游戏场地
        */
        MultipleGame = 2,
        /**
        * 机台
        */
        MachineGame = 3,
        /**
        * 百人
        */
        HundredGame = 4,
        /**
        * 比赛场地
        */
        MathRoomGame = 7,
        /**
        * 朋友圈游戏
        */
        MomentsGame = 9,    
    }


    /**
     *
     * 创建时间：2018年12月13日 22:07:32
     * 创建人员：SHENRUI\admin
     * 备注：房费的付费方式
     *
     */
    export enum RoomCostPayType{
        /**
        * 未知
        */
        Unknown = 0,
        /**
        * AA制
        */
        AA = 1,
        /**
        * 房主付费
        */
        RoomOwnerPay = 2,
        /**
        * 亲友圈圈主支付
        */
        GroupOwnerPay = 3,    
    }


    /**
     *
     * 创建时间：2018年12月13日 22:07:32
     * 创建人员：SHENRUI\admin
     * 备注：游戏类型
     *
     */
    export enum GameType{
        /**
        * 敬请期待
        */
        Unknown = 0,
        /**
        * 电玩游戏
        */
        VideoGame = 1,
        /**
        * 扑克牌类游戏
        */
        ChessGame = 2,
        /**
        * 麻将类游戏
        */
        Mahjong = 3,    
    }


    /**
     *
     * 创建时间：2018年12月13日 22:07:32
     * 创建人员：SHENRUI\admin
     * 备注：游戏标签类型
     *
     */
    export enum GameLabelType{
        /**
        * 无
        */
        None = 0,
        /**
        * 火爆
        */
        Fire = 1,
        /**
        * 免费
        */
        Free = 2,
        /**
        * 内测
        */
        InTest = 3,
        /**
        * 维护中
        */
        Maintain = 4,
        /**
        * 限免
        */
        LimitFree = 5,
        /**
        * 热门
        */
        Hot = 6,
        /**
        * 新
        */
        New = 7,
        /**
        * 公测
        */
        PubTest = 8,    
    }


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：场地信息，包含场地的状态信息
     *
     */
    export class RoomStateInfo extends RoomInfoSingleID {
        public constructor()
        {
            super();
            this.$T="QL.Common.RoomStateInfo"; 
        }
       /**
        *0，初始，尚未编辑
            <para>1，编辑，尚未审核</para><para>2，审核，尚未开始（不能再编辑）</para><para>3，开始运行</para><para>4，停止运行：（系统维护）</para><para>5，停止运行：（租金不够）</para><para>6，停止运行：（其他原因）</para>
        */
       public RoomState: RoomState = 0;
   
    }
    SerializerCreator.Register("QL.Common.RoomStateInfo", function () {return new RoomStateInfo()})
    TSRH.RSerializer("QL.Common.RoomStateInfo", "5|ID&1|RoomState", "QL.Common.RoomStateInfo");


    /**
     *
     * 创建时间：2018年12月13日 22:07:32
     * 创建人员：SHENRUI\admin
     * 备注：桌子状态
     *
     */
    export enum TableStatus{
        /**
        * 空闲
        */
        free = 0,
        /**
        * 游戏中
        */
        gameing = 1,    
    }


    /**
     *
     * 创建时间：2018年12月13日 22:07:32
     * 创建人员：SHENRUI\admin
     * 备注：玩家在游戏服务器GS上的状态
     *
     */
    export enum GState{
        /**
        * 未知
        */
        Unknown = 0,
        /**
        * 空闲（刚进入场地时的状态）
        */
        Free = 1,
        /**
        * 系统已经分配椅子号，但玩家还没有坐下
        */
        HasTableState = 2,
        /**
        * 玩家坐下
        */
        SitDown = 3,
        /**
        * 玩家已经准备
        */
        PlayerReady = 4,
        /**
        * 配桌成功开始游戏
        */
        Gaming = 5,
        /**
        * 旁观状态
        */
        OnLooking = 6,
        /**
        * 某局游戏中断线
        */
        OfflineInGame = 7,    
    }


    /**
     *
     * 创建时间：2018年12月13日 22:07:32
     * 创建人员：SHENRUI\admin
     * 备注：错误码定义
     *
     */
    export enum SystemErrorCode{
        /**
        * 操作成功
        */
        Success = 0,
        /**
        * 请求失败
        */
        RequestFail = 1,
        /**
        * 服务器维护
        */
        ServerMaintain = 2,
        /**
        * 玩家退出场地失败，游戏已经开始
        */
        ExitRoomFail = 3,
        /**
        * 请求配桌失败
        */
        RequestTableFail = 8,
        /**
        * 玩家重复登录通知
        */
        RemoteLogin = 9,
        /**
        * 登录失败
        */
        LoginFail = 10,
        /**
        * 进入场地失败
        */
        JoinRoomFail = 11,    
    }


    /**
     *
     * 创建时间：2018年12月13日 22:07:32
     * 创建人员：SHENRUI\admin
     * 备注：订阅或取消的操作类别
     *
     */
    export enum SubscribeMessageOpType{
        /**
        * 订阅消息
        */
        Subscribe = 0,
        /**
        * 取消订阅
        */
        Unsubscribe = 1,
        /**
        * 取消所有订阅
        */
        UnsubscribeAll = 2,
        /**
        * 执行方法
        */
        RunAction = 3,
        /**
        * 发送消息
        */
        SendMessage = 4,    
    }


    /**
     *
     * 创建时间：2018年12月13日 22:07:32
     * 创建人员：SHENRUI\admin
     * 备注：用户登录方式
     *
     */
    export enum LoginType{
        /**
        * 未知
        */
        Unknown = 0,
        /**
        * 玩家正常登陆，登陆采用输入账号和密码的方式登陆游戏服务器
        */
        Normal = 1,
        /**
        * 玩家采用一键登录（当玩家在第一次使用当前客户端自动登陆的）
        */
        Onekey = 2,
        /**
        * 玩家采用登陆令牌自动登陆方式登陆
        */
        UserLogonToken = 3,    
    }


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：系统配置数据实体
     *
     */
    export class KeyValueData extends UyiObject {
        public constructor()
        {
            super();
            this.$T="QL.Common.KeyValueData"; 
        }
       /**
        *系统配置信息的Key
        */
       public Key: string = "";
       /**
        *系统配置的对应键的值
        */
       public Value: string = "";
   
    }
    SerializerCreator.Register("QL.Common.KeyValueData", function () {return new KeyValueData()})
    TSRH.RSerializer("QL.Common.KeyValueData", "12|Key&12|Value", "QL.Common.KeyValueData");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：场地：客户端简版
     *
     */
    export class RoomClient extends RoomStateInfo {
        public constructor()
        {
            super();
            this.$T="QL.Common.RoomClient"; 
        }
       /**
        *游戏ID
        */
       public GameID: number = 0;
       /**
        *场地所属类别（单选）
        */
       public RoomType: RoomType = 0;
       /**
        *底金
        */
       public BaseMoney: number = 0;
       /**
        *准入倍数
            准入条件：= 底金* 准入倍数
        */
       public JoinMultiNum: number = 0;
       /**
        *场地等级
        */
       public RoomLV: number = 0;
       /**
        *结算币种
        */
       public CheckMoneyType: CurrencyType = 0;
       /**
        *桌费
        */
       public TableCost: number = 0;
       /**
        *场地名称
        */
       public Name: string = "";
       /**
        *游戏规则
        */
       public GameRule: GameIF_Common.GameRuleEntity = null;
       /**
        *场地桌费的币种
        */
       public TableCostMoneyType: CurrencyType = 0;
       /**
        *场地特殊属性
        */
       public CSpareAttrib: GameIF_Common.GRSpareAttrib = null;
       /**
        *每桌最小开始人数
        */
       public MinCount: number = 0;
       /**
        *每桌最大开始人数
        */
       public MaxCount: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.RoomClient", function () {return new RoomClient()})
    TSRH.RSerializer("QL.Common.RoomClient", "5|BaseMoney&1|CheckMoneyType&GameIF.Common.GRSpareAttrib|CSpareAttrib&1|GameID&GameIF.Common.GameRuleEntity|GameRule&5|JoinMultiNum&1|MaxCount&1|MinCount&12|Name&1|RoomLV&1|RoomType&5|TableCost&1|TableCostMoneyType&5|ID&1|RoomState", "QL.Common.RoomClient");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：游戏信息的基类，只有一个游戏ID信息
     *
     */
    export class GameInfoBaseForID extends UserTagObjectBase {
        public constructor()
        {
            super();
            this.$T="QL.Common.GameInfoBaseForID"; 
        }
       /**
        *游戏ID
        */
       public GameID: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.GameInfoBaseForID", function () {return new GameInfoBaseForID()})
    TSRH.RSerializer("QL.Common.GameInfoBaseForID", "3|GameID", "QL.Common.GameInfoBaseForID");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：游戏基本信息
     *
     */
    export class GameInfo extends GameInfoBaseForID {
        public constructor()
        {
            super();
            this.$T="QL.Common.GameInfo"; 
        }
       /**
        *游戏名称
        */
       public GameName: string = "";
       /**
        *游戏模块名称
        */
       public ModuleName: string = "";
       /**
        *游戏类型（多选）
        */
       public GameType: GameType = 0;
       /**
        *游戏状态
        */
       public GameStatus: GameState = 0;
       /**
        *最新版本
        */
       public LatestVersion: string = "";
       /**
        *排序号码
        */
       public SortID: number = 0;
       /**
        *支持平台
        */
       public SupportPlatform: number = 0;
       /**
        *支持平台
        */
       public GameCity: string = "";
       /**
        *游戏描述
        */
       public GameDesc: string = "";
       /**
        *游戏标签类型
        */
       public GameLabel: GameLabelType = 0;
   
    }
    SerializerCreator.Register("QL.Common.GameInfo", function () {return new GameInfo()})
    TSRH.RSerializer("QL.Common.GameInfo", "12|GameName&1|GameType&1|GameStatus&3|SupportPlatform&3|SortID&3|GameID&12|GameCity&12|GameDesc&1|GameLabel&12|LatestVersion&12|ModuleName", "QL.Common.GameInfo");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：道具实体
     *
     */
    export class PropEntity extends UyiObject {
        public constructor()
        {
            super();
            this.$T="QL.Common.PropEntity"; 
        }
       /**
        *ID
        */
       public ID: number = 0;
       /**
        *类型
        */
       public propType: CurrencyType = 0;
       /**
        *数量
        */
       public propCount: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.PropEntity", function () {return new PropEntity()})
    TSRH.RSerializer("QL.Common.PropEntity", "1|propType&5|propCount", "QL.Common.PropEntity");


    /**
     *
     * 创建时间：2018年12月13日 22:07:32
     * 创建人员：SHENRUI\admin
     * 备注：表示请求的桌子类型
     *
     */
    export enum TableType{
        /**
        * 默认类型
        */
        Default = 0,
        /**
        * 自建桌子
        */
        BuildOneSelf = 1,    
    }


    /**
     *
     * 创建时间：2018年12月13日 22:07:32
     * 创建人员：SHENRUI\admin
     * 备注：指示进入场地的方式
     *
     */
    export enum EnterRoomMethod{
        /**
        * 使用场地编号进入场地
        */
        RoomID = 0,
        /**
        * 使用创建房间的房间编号进入场地
        */
        TableID = 1,
        /**
        * 查询指定桌子Id的桌子信息
        */
        QueryTableInfo = 2,    
    }


    /**
     *
     * 创建时间：2018年12月13日 22:07:32
     * 创建人员：SHENRUI\admin
     * 备注：游戏服务端发送跑马灯公告
     *
     */
    export enum SystemHornType{
        /**
        * 未知
        */
        Unkonown = 0,
        /**
        * 指定系统跑马灯类型
        */
        System = 1,
        /**
        * 服务器跑马灯
        */
        Server = 2,
        /**
        * 游戏内跑马灯
        */
        Game = 3,
        /**
        * 大厅（游戏外）跑马灯
        */
        Hall = 4,
        /**
        * 所有
        */
        All = 5,    
    }


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：系统跑马灯消息实体
     *
     */
    export class SystemHornEntity extends UyiObject {
        public constructor()
        {
            super();
            this.$T="QL.Common.SystemHornEntity"; 
        }
       /**
        *跑马灯循环次数
        */
       public LoopCount: number = 0;
       /**
        *跑马灯内容
        */
       public Context: string = "";
       /**
        *跑马灯类别
        */
       public HornType: SystemHornType = 0;
       /**
        *附加参数
        */
       public AttachData: KeyValueData[] = null;
       /**
        *循环间隔（单位秒）
        */
       public LoopInterval: number = 0;
       /**
        *
        */
       public Priority: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.SystemHornEntity", function () {return new SystemHornEntity()})
    TSRH.RSerializer("QL.Common.SystemHornEntity", "!QL.Common.KeyValueData|AttachData&12|Context&1|HornType&4|LoopCount&4|LoopInterval&1|Priority", "QL.Common.SystemHornEntity");


    /**
     *
     * 创建时间：2018年12月13日 22:07:32
     * 创建人员：SHENRUI\admin
     * 备注：
     *
     */
    export enum UserCreateTableNoticeStatus{
        /**
        * 指示创建桌子
        */
        CreateTable = 0,
        /**
        * 指示桌子游戏开始
        */
        TableInGameing = 1,
        /**
        * 指示桌子游戏结束
        */
        TableGameOver = 2,
        /**
        * 刷新状态数据
        */
        TableUpdate = 3,
        /**
        * 
        */
        ChangeTableOwner = 4,    
    }


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：
     *
     */
    export class PlayerMoneyBagBase extends UyiObject {
        public constructor()
        {
            super();
            this.$T="QL.Common.PlayerMoneyBagBase"; 
        }
       /**
        *币种类型
        */
       public MoneyType: number = 0;
       /**
        *币种数量
        */
       public MoneyNum: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.PlayerMoneyBagBase", function () {return new PlayerMoneyBagBase()})
    TSRH.RSerializer("QL.Common.PlayerMoneyBagBase", "4|MoneyNum&1|MoneyType", "QL.Common.PlayerMoneyBagBase");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：
     *
     */
    export class PlayerMoneyBag extends PlayerMoneyBagBase {
        public constructor()
        {
            super();
            this.$T="QL.Common.PlayerMoneyBag"; 
        }
       /**
        *
        */
       public UserID: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.PlayerMoneyBag", function () {return new PlayerMoneyBag()})
    TSRH.RSerializer("QL.Common.PlayerMoneyBag", "4|MoneyNum&1|MoneyType&5|UserID", "QL.Common.PlayerMoneyBag");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：
     *
     */
    export class UserCreateTableInfo extends UyiObject {
        public constructor()
        {
            super();
            this.$T="QL.Common.UserCreateTableInfo"; 
        }
       /**
        *指示是否是在请有权自由创建的房间
        */
       public IsFreeCreate: boolean = false;
       /**
        *指示当前桌子是否曾经出现过满员的状态，亲友圈使用
        */
       public IsFullUsered: boolean = false;
       /**
        *创建的房间号
        */
       public TableId: number = 0;
       /**
        *创建桌子所属的游戏
        */
       public GameId: number = 0;
       /**
        *创建桌子所属的场地
        */
       public RoomId: number = 0;
       /**
        *玩家人数
        */
       public PlayerCount: number = 0;
       /**
        *桌子的状态
        */
       public status: UserCreateTableNoticeStatus = 0;
       /**
        *该房间所属的群Id
        */
       public GroupId: number = 0;
       /**
        *
        */
       public RuleId: number = 0;
       /**
        *游戏内发送给客户端的附加参数
        */
       public AttachParams: KeyValueData[] = null;
       /**
        *
        */
       public Id: number = 0;
       /**
        *
        */
       public PlayerHeaders: string[] = null;
       /**
        *所属的房主Id
        */
       public RoomOwner : number = 0;
       /**
        *当前游戏已经完成的局数
        */
       public GameNum : number = 0;
   
    }
    SerializerCreator.Register("QL.Common.UserCreateTableInfo", function () {return new UserCreateTableInfo()})
    TSRH.RSerializer("QL.Common.UserCreateTableInfo", "!QL.Common.KeyValueData|AttachParams&1|GameId&1|GameNum&5|GroupId&14|IsFreeCreate&14|IsFullUsered&1|PlayerCount&!12|PlayerHeaders&5|RoomId&5|RoomOwner&5|RuleId&1|status&5|TableId", "QL.Common.UserCreateTableInfo");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：服务器信息
     *
     */
    export class ServerInfo extends UyiObject {
        public constructor()
        {
            super();
            this.$T="QL.Common.ServerInfo"; 
        }
       /**
        *服务器编号
        */
       public Uuid: any = null;
       /**
        *服务器地址
        */
       public Adress: string = "";
       /**
        *服务器端口
        */
       public Port: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.ServerInfo", function () {return new ServerInfo()})
    TSRH.RSerializer("QL.Common.ServerInfo", "12|Adress&4|Port&System.Guid|Uuid", "QL.Common.ServerInfo");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家在登录服务器上的位置信息
     *
     */
    export class UserLSLocation extends UyiObject {
        public constructor()
        {
            super();
            this.$T="QL.Common.UserLSLocation"; 
        }
       /**
        *玩家Id
        */
       public UserId: number = 0;
       /**
        *
        */
       public ServerUUID: any = null;
       /**
        *
        */
       public SessionId: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.UserLSLocation", function () {return new UserLSLocation()})
    TSRH.RSerializer("QL.Common.UserLSLocation", "System.Guid|ServerUUID&4|SessionId&5|UserId", "QL.Common.UserLSLocation");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：
     *
     */
    export class R2GsInfo extends UyiObject {
        public constructor()
        {
            super();
            this.$T="QL.Common.R2GsInfo"; 
        }
       /**
        *场地Id
        */
       public RoomId: number = 0;
       /**
        *服务信息
        */
       public SInfo: ServerInfo = null;
   
    }
    SerializerCreator.Register("QL.Common.R2GsInfo", function () {return new R2GsInfo()})
    TSRH.RSerializer("QL.Common.R2GsInfo", "5|RoomId&QL.Common.ServerInfo|SInfo", "QL.Common.R2GsInfo");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家将创建的房间信息
     *
     */
    export class UserCRoomInfo extends UserCreateTableInfo {
        public constructor()
        {
            super();
            this.$T="QL.Common.UserCRoomInfo"; 
        }
       /**
        *
        */
       public MaxUserCount: number = 0;
       /**
        *当前房间的服务器信息
        */
       public ServerInfo: ServerInfo = null;
   
    }
    SerializerCreator.Register("QL.Common.UserCRoomInfo", function () {return new UserCRoomInfo()})
    TSRH.RSerializer("QL.Common.UserCRoomInfo", "!QL.Common.KeyValueData|AttachParams&1|GameId&1|GameNum&5|GroupId&14|IsFreeCreate&14|IsFullUsered&1|PlayerCount&!12|PlayerHeaders&5|RoomId&5|RoomOwner&5|RuleId&1|status&5|TableId&1|MaxUserCount&QL.Common.ServerInfo|ServerInfo", "QL.Common.UserCRoomInfo");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家在登录服务器上的位置信息
     *
     */
    export class UserGSLocation extends UyiObject {
        public constructor()
        {
            super();
            this.$T="QL.Common.UserGSLocation"; 
        }
       /**
        *玩家Id
        */
       public UserId: number = 0;
       /**
        *玩家断线所在的场地Id
        */
       public GsInfo: R2GsInfo = null;
   
    }
    SerializerCreator.Register("QL.Common.UserGSLocation", function () {return new UserGSLocation()})
    TSRH.RSerializer("QL.Common.UserGSLocation", "QL.Common.R2GsInfo|GsInfo&5|UserId", "QL.Common.UserGSLocation");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：手机验证码相关信息
     *
     */
    export class PhoneSmsCode extends UyiObject {
        public constructor()
        {
            super();
            this.$T="QL.Common.PhoneSmsCode"; 
        }
       /**
        *发送短信的手机号码
        */
       public Phone: string = "";
       /**
        *手机验证码
        */
       public SmsCode: string = "";
       /**
        *验证码的使用场景
        */
       public Scene: string = "";
       /**
        *验证码验证次数
        */
       public TryCount: number = 0;
       /**
        *验证码的发送时间
        */
       public SendTime: DateTime = DateTime.Now;
   
    }
    SerializerCreator.Register("QL.Common.PhoneSmsCode", function () {return new PhoneSmsCode()})
    TSRH.RSerializer("QL.Common.PhoneSmsCode", "12|Phone&12|Scene&11|SendTime&12|SmsCode&4|TryCount", "QL.Common.PhoneSmsCode");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：提供序列化测试类
     *
     */
    export class MSG_T_TestMessage extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 31;
            this.wSubCmdID = 4;
            this.$T="QL.Common.MSG_T_TestMessage"; 
        }
       /**
        *
        */
       public V1: number = 0;
       /**
        *
        */
       public V2: number = 0;
       /**
        *
        */
       public V3: number = 0;
       /**
        *
        */
       public V4: number = 0;
       /**
        *
        */
       public V5: number = 0;
       /**
        *
        */
       public V6: number = 0;
       /**
        *
        */
       public V7: number = 0;
       /**
        *
        */
       public V8: number = 0;
       /**
        *
        */
       public V9: number = 0;
       /**
        *
        */
       public V10: number = 0;
       /**
        *
        */
       public V11: string = "";
       /**
        *
        */
       public V12: number[] = null;
       /**
        *
        */
       public V13: string[] = null;
       /**
        *
        */
       public V14: number[] = null;
       /**
        *
        */
       public V15: number[] = null;
       /**
        *
        */
       public V16: number[] = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_T_TestMessage", function () {return new MSG_T_TestMessage()})
    TSRH.RSerializer("7940", "0|V1&9|V10&12|V11&13|V12&!12|V13&!4|V14&!8|V15&!9|V16&1|V2&2|V3&3|V4&4|V5&5|V6&6|V7&7|V8&8|V9", "QL.Common.MSG_T_TestMessage");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：客户端登录平台游戏服务器统一请求消息
     *
     */
    export class MSG_C_LoginByAccount extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 31;
            this.wSubCmdID = 1;
            this.$T="QL.Common.MSG_C_LoginByAccount"; 
        }
       /**
        *登录类型（必填）
        */
       public PlayerLogonType: LoginType = 0;
       /**
        *登录账号（必填,一键登陆时该字段可以省略）
        */
       public Account: string = "";
       /**
        *登录密码，如果采用令牌登陆直接在这个字段填写登陆令牌（必填,一键登陆时该字段可以省略）
        */
       public Password: string = "";
       /**
        *客户端登录时携带的附加参数
        */
       public CAttachData: KeyValueData[] = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_LoginByAccount", function () {return new MSG_C_LoginByAccount()})
    TSRH.RSerializer("7937", "12|Account&!QL.Common.KeyValueData|CAttachData&12|Password&1|PlayerLogonType", "QL.Common.MSG_C_LoginByAccount");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：进入游戏场地
     *
     */
    export class MSG_C_EnterGameRoom extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 31;
            this.wSubCmdID = 2;
            this.$T="QL.Common.MSG_C_EnterGameRoom"; 
        }
       /**
        *场地ID
        */
       public RoomID: number = 0;
       /**
        *指定玩家进入场地的进入方式
        */
       public Method: EnterRoomMethod = 0;
       /**
        *
        */
       public GsServerInfo: ServerInfo = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_EnterGameRoom", function () {return new MSG_C_EnterGameRoom()})
    TSRH.RSerializer("7938", "1|Method&5|RoomID", "QL.Common.MSG_C_EnterGameRoom");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：查询某个游戏下的所有场地
     *
     */
    export class MSG_C_QueryRoomByGameIDArray extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 31;
            this.wSubCmdID = 5;
            this.$T="QL.Common.MSG_C_QueryRoomByGameIDArray"; 
        }
       /**
        *游戏ID
        */
       public GameIDArray: number[] = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_QueryRoomByGameIDArray", function () {return new MSG_C_QueryRoomByGameIDArray()})
    TSRH.RSerializer("7941", "13|GameIDArray", "QL.Common.MSG_C_QueryRoomByGameIDArray");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：查询游戏
     *
     */
    export class MSG_C_QueryGame extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 31;
            this.wSubCmdID = 6;
            this.$T="QL.Common.MSG_C_QueryGame"; 
        }
       /**
        *游戏ID
        */
       public GameIDArray: number[] = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_QueryGame", function () {return new MSG_C_QueryGame()})
    TSRH.RSerializer("7942", "13|GameIDArray", "QL.Common.MSG_C_QueryGame");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：查询游戏
     *
     */
    export class MSG_C_QueryGameByIDArray extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 31;
            this.wSubCmdID = 7;
            this.$T="QL.Common.MSG_C_QueryGameByIDArray"; 
        }
       /**
        *
        */
       public GameIDArray: number[] = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_QueryGameByIDArray", function () {return new MSG_C_QueryGameByIDArray()})
    TSRH.RSerializer("7943", "!3|GameIDArray", "QL.Common.MSG_C_QueryGameByIDArray");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：查询玩家道具余额，提供给玩家的余额更新通知
     *
     */
    export class MSG_C_QueryUserProp extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 31;
            this.wSubCmdID = 8;
            this.$T="QL.Common.MSG_C_QueryUserProp"; 
        }
       /**
        *查询类型数组
        */
       public queryTypeAry: number[] = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_QueryUserProp", function () {return new MSG_C_QueryUserProp()})
    TSRH.RSerializer("7944", "13|queryTypeAry", "QL.Common.MSG_C_QueryUserProp");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：查询断线场地
     *
     */
    export class MSG_C_QueryOfflineRoom extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 31;
            this.wSubCmdID = 9;
            this.$T="QL.Common.MSG_C_QueryOfflineRoom"; 
        }
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_QueryOfflineRoom", function () {return new MSG_C_QueryOfflineRoom()})
    TSRH.RSerializer("7945", "", "QL.Common.MSG_C_QueryOfflineRoom");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：心跳包消息
     *
     */
    export class MSG_C_HeartBeatMessage extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 31;
            this.wSubCmdID = 3;
            this.$T="QL.Common.MSG_C_HeartBeatMessage"; 
        }
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_HeartBeatMessage", function () {return new MSG_C_HeartBeatMessage()})
    TSRH.RSerializer("7939", "", "QL.Common.MSG_C_HeartBeatMessage");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：获取群内创建房间列表
     *
     */
    export class MSG_C_QueryGroupTableList extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 31;
            this.wSubCmdID = 10;
            this.$T="QL.Common.MSG_C_QueryGroupTableList"; 
        }
       /**
        *查询的玩家Id，（服务端自动赋值）
        */
       public UserId: number = 0;
       /**
        *查询的群组Id
        */
       public GroupId: number = 0;
       /**
        *
        */
       public RuleId: number = 0;
       /**
        *起始Id
        */
       public startId: number = 0;
       /**
        *获取数量
        */
       public count: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_QueryGroupTableList", function () {return new MSG_C_QueryGroupTableList()})
    TSRH.RSerializer("7946", "4|count&5|GroupId&5|RuleId&5|startId&5|UserId", "QL.Common.MSG_C_QueryGroupTableList");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：获取群内创建房间列表
     *
     */
    export class MSG_C_SubscribeOrUnsubscribeMessage extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 31;
            this.wSubCmdID = 11;
            this.$T="QL.Common.MSG_C_SubscribeOrUnsubscribeMessage"; 
        }
       /**
        *要订阅消息的渠道名称
        */
       public ChanelName: string = "";
       /**
        *
        */
       public OpType: SubscribeMessageOpType = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_SubscribeOrUnsubscribeMessage", function () {return new MSG_C_SubscribeOrUnsubscribeMessage()})
    TSRH.RSerializer("7947", "12|ChanelName&1|OpType", "QL.Common.MSG_C_SubscribeOrUnsubscribeMessage");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：请求配桌
     *
     */
    export class MSG_C_OfferPairTable extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 41;
            this.wSubCmdID = 1;
            this.$T="QL.Common.MSG_C_OfferPairTable"; 
        }
       /**
        *请求配桌的椅子号，只有在邀请朋友加入的情况下有效
        */
       public ChairID: number = 0;
       /**
        *请求配桌时携带分组Id，指示该桌子是否是在牌友群界面创建的。以及所属的群号
        */
       public GroupId: number = 0;
       /**
        *表示是否是自由创建
        */
       public IsFreeCreate: boolean = false;
       /**
        *创建房间使用的玩法编号，没有可以传零
        */
       public RuleId: number = 0;
       /**
        *
        */
       public Empty: MSG_C_OfferPairTable = null;
       /**
        *一个玩家ID，在邀请玩家进行游戏和邀请玩家帮助抢红包需要携带的一些参数信息
        */
       public TableID : number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_OfferPairTable", function () {return new MSG_C_OfferPairTable()})
    TSRH.RSerializer("10497", "1|ChairID&5|GroupId&14|IsFreeCreate&5|RuleId&5|TableID", "QL.Common.MSG_C_OfferPairTable");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：退出场地
     *
     */
    export class MSG_C_ExitRoom extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 41;
            this.wSubCmdID = 13;
            this.$T="QL.Common.MSG_C_ExitRoom"; 
        }
       /**
        *玩家ID
        */
       public PlayerID: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_ExitRoom", function () {return new MSG_C_ExitRoom()})
    TSRH.RSerializer("10509", "5|PlayerID", "QL.Common.MSG_C_ExitRoom");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家坐下
     *
     */
    export class MSG_C_SitDown extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 41;
            this.wSubCmdID = 2;
            this.$T="QL.Common.MSG_C_SitDown"; 
        }
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_SitDown", function () {return new MSG_C_SitDown()})
    TSRH.RSerializer("10498", "", "QL.Common.MSG_C_SitDown");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家准备
     *
     */
    export class MSG_C_PlayerReady extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 41;
            this.wSubCmdID = 3;
            this.$T="QL.Common.MSG_C_PlayerReady"; 
        }
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_PlayerReady", function () {return new MSG_C_PlayerReady()})
    TSRH.RSerializer("10499", "", "QL.Common.MSG_C_PlayerReady");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家起立
     *
     */
    export class MSG_C_PlayerStandUP extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 41;
            this.wSubCmdID = 4;
            this.$T="QL.Common.MSG_C_PlayerStandUP"; 
        }
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_PlayerStandUP", function () {return new MSG_C_PlayerStandUP()})
    TSRH.RSerializer("10500", "", "QL.Common.MSG_C_PlayerStandUP");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：同桌聊天
     *
     */
    export class MSG_C_ChartMsg extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 41;
            this.wSubCmdID = 6;
            this.$T="QL.Common.MSG_C_ChartMsg"; 
        }
       /**
        *聊天信息
        */
       public chartContext: string = "";
       /**
        *消息类别
        */
       public type: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_ChartMsg", function () {return new MSG_C_ChartMsg()})
    TSRH.RSerializer("10502", "12|chartContext&1|type", "QL.Common.MSG_C_ChartMsg");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：断线重连进来
     *
     */
    export class MSG_C_OfflineComein extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 41;
            this.wSubCmdID = 9;
            this.$T="QL.Common.MSG_C_OfflineComein"; 
        }
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_OfflineComein", function () {return new MSG_C_OfflineComein()})
    TSRH.RSerializer("10505", "", "QL.Common.MSG_C_OfflineComein");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家执行踢人处理逻辑，必须在游戏的桌子中且游戏没有开始
     *
     */
    export class MSG_C_EliminateUser extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 41;
            this.wSubCmdID = 16;
            this.$T="QL.Common.MSG_C_EliminateUser"; 
        }
       /**
        *踢出的玩家UserID,该玩家必须在当前桌子上并且不是房主
            <para>玩家的VIP等级必须低于或者等于请求的玩家的VIP等级才会被踢出</para>
        */
       public EliminateUserID: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_EliminateUser", function () {return new MSG_C_EliminateUser()})
    TSRH.RSerializer("10512", "5|EliminateUserID", "QL.Common.MSG_C_EliminateUser");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家发起求助请求，服务服务器在接收到该消息后会将该消息转发给指定玩家，客户端也需要处理该消息
     *
     */
    export class MSG_C_SeekHelpUser extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 41;
            this.wSubCmdID = 17;
            this.$T="QL.Common.MSG_C_SeekHelpUser"; 
        }
       /**
        *玩家求助时候指定的玩家ID,该玩家,如果是客户端发起求助则为向谁求助。接收求助的玩家ID
            <para>如果是服务器发给客户端的求助消息时候，该玩家ID指示是谁发起的求助；发起求助的玩家ID</para>
        */
       public SeekHelpUserID: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_SeekHelpUser", function () {return new MSG_C_SeekHelpUser()})
    TSRH.RSerializer("10513", "5|SeekHelpUserID", "QL.Common.MSG_C_SeekHelpUser");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家最新余额
     *
     */
    export class MSG_S_PlayerLatestBalance extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 39;
            this.wSubCmdID = 2;
            this.$T="QL.Common.MSG_S_PlayerLatestBalance"; 
        }
       /**
        *玩家最新余额数据
        */
       public MoneyBag: PlayerMoneyBagBase[] = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_PlayerLatestBalance", function () {return new MSG_S_PlayerLatestBalance()})
    TSRH.RSerializer("9986", "!QL.Common.PlayerMoneyBagBase|MoneyBag", "QL.Common.MSG_S_PlayerLatestBalance");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：登录成功
     *
     */
    export class MSG_S_LoginSuccess extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 39;
            this.wSubCmdID = 3;
            this.$T="QL.Common.MSG_S_LoginSuccess"; 
        }
       /**
        *用户信息
        */
       public playerData: Player = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_LoginSuccess", function () {return new MSG_S_LoginSuccess()})
    TSRH.RSerializer("9987", "QL.Common.Player|playerData", "QL.Common.MSG_S_LoginSuccess");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：通知客户端刷新的玩家 SessionKey
     *
     */
    export class MSG_S_UserSessionKey extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 39;
            this.wSubCmdID = 4;
            this.$T="QL.Common.MSG_S_UserSessionKey"; 
        }
       /**
        *
        */
       public SessionKey: string = "";
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_UserSessionKey", function () {return new MSG_S_UserSessionKey()})
    TSRH.RSerializer("9988", "12|SessionKey", "QL.Common.MSG_S_UserSessionKey");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家创建桌的推送消息（实时推送）
     *
     */
    export class MSG_S_UserCreateTableNotice extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 39;
            this.wSubCmdID = 5;
            this.$T="QL.Common.MSG_S_UserCreateTableNotice"; 
        }
       /**
        *指示该条通知信息的操作，服务器间数据同步使用这个消息来同步玩家的桌子列表刷新
        */
       public Status: UserCreateTableNoticeStatus = 0;
       /**
        *创建的玩家（房主）
        */
       public UserId: number = 0;
       /**
        *创建的桌子信息
        */
       public TableInfo: UserCreateTableInfo = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_UserCreateTableNotice", function () {return new MSG_S_UserCreateTableNotice()})
    TSRH.RSerializer("9989", "1|Status&QL.Common.UserCreateTableInfo|TableInfo&5|UserId", "QL.Common.MSG_S_UserCreateTableNotice");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：推送消息（实时推送）
     *
     */
    export class MSG_S_SystemPushMsg extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 39;
            this.wSubCmdID = 0;
            this.$T="QL.Common.MSG_S_SystemPushMsg"; 
        }
       /**
        *通知推送的目标主体
        */
       public TargerUser: number = 0;
       /**
        *通知的事件类型
        */
       public EventCode: string = "";
       /**
        *通知事件的附加参数
        */
       public EventData: KeyValueData[] = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_SystemPushMsg", function () {return new MSG_S_SystemPushMsg()})
    TSRH.RSerializer("9984", "12|EventCode&!QL.Common.KeyValueData|EventData&5|TargerUser", "QL.Common.MSG_S_SystemPushMsg");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：场地列表
     *
     */
    export class MSG_S_RoomList extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 39;
            this.wSubCmdID = 6;
            this.$T="QL.Common.MSG_S_RoomList"; 
        }
       /**
        *场地列表
        */
       public roomList: RoomClient[] = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_RoomList", function () {return new MSG_S_RoomList()})
    TSRH.RSerializer("9990", "!QL.Common.RoomClient|roomList", "QL.Common.MSG_S_RoomList");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：游戏列表
     *
     */
    export class MSG_S_GameList extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 39;
            this.wSubCmdID = 7;
            this.$T="QL.Common.MSG_S_GameList"; 
        }
       /**
        *游戏列表
        */
       public gameList: GameInfo[] = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_GameList", function () {return new MSG_S_GameList()})
    TSRH.RSerializer("9991", "!QL.Common.GameInfo|gameList", "QL.Common.MSG_S_GameList");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：系统配置表
     *
     */
    export class MSG_S_SysConfig extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 39;
            this.wSubCmdID = 9;
            this.$T="QL.Common.MSG_S_SysConfig"; 
        }
       /**
        *
        */
       public sysConfigArray: KeyValueData[] = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_SysConfig", function () {return new MSG_S_SysConfig()})
    TSRH.RSerializer("9993", "!QL.Common.KeyValueData|sysConfigArray", "QL.Common.MSG_S_SysConfig");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家道具列表
     *
     */
    export class MSG_S_UserProp extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 39;
            this.wSubCmdID = 10;
            this.$T="QL.Common.MSG_S_UserProp"; 
        }
       /**
        *道具列表
        */
       public propAry: PropEntity[] = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_UserProp", function () {return new MSG_S_UserProp()})
    TSRH.RSerializer("9994", "!QL.Common.PropEntity|propAry", "QL.Common.MSG_S_UserProp");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：断线场地
     *
     */
    export class MSG_S_OfflineRoom extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 39;
            this.wSubCmdID = 8;
            this.$T="QL.Common.MSG_S_OfflineRoom"; 
        }
       /**
        *玩家所在的断线场地信息，执行断线重连。如果玩家没有断线场地，则为 null
        */
       public room: RoomClient = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_OfflineRoom", function () {return new MSG_S_OfflineRoom()})
    TSRH.RSerializer("9992", "QL.Common.RoomClient|room", "QL.Common.MSG_S_OfflineRoom");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：根据桌子Id获取创建的房间信息
     *
     */
    export class MSG_S_SingleTableInfo extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 39;
            this.wSubCmdID = 11;
            this.$T="QL.Common.MSG_S_SingleTableInfo"; 
        }
       /**
        *查询的群Id
        */
       public GroupId: number = 0;
       /**
        *房间列表
        */
       public Data: UserCreateTableInfo = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_SingleTableInfo", function () {return new MSG_S_SingleTableInfo()})
    TSRH.RSerializer("9995", "QL.Common.UserCreateTableInfo|Data&5|GroupId", "QL.Common.MSG_S_SingleTableInfo");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：获取到的群内玩家创建的房间列表
     *
     */
    export class MSG_S_GroupTableList extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 39;
            this.wSubCmdID = 12;
            this.$T="QL.Common.MSG_S_GroupTableList"; 
        }
       /**
        *查询的群Id
        */
       public GroupId: number = 0;
       /**
        *查询的群玩法编号Id
        */
       public RuleId: number = 0;
       /**
        *房间列表
        */
       public Data: UserCreateTableInfo[] = null;
       /**
        *总数据大小
        */
       public Total: number = 0;
       /**
        *下次请求分页数据时携带的起始Id,客户端透传
        */
       public LastId: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_GroupTableList", function () {return new MSG_S_GroupTableList()})
    TSRH.RSerializer("9996", "!QL.Common.UserCreateTableInfo|Data&5|GroupId&5|LastId&5|RuleId&4|Total", "QL.Common.MSG_S_GroupTableList");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：系统跑马灯消息
     *
     */
    export class MSG_S_SystemHornMsg extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 39;
            this.wSubCmdID = 13;
            this.$T="QL.Common.MSG_S_SystemHornMsg"; 
        }
       /**
        *跑马灯消息列表
        */
       public HornMsgList: SystemHornEntity[] = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_SystemHornMsg", function () {return new MSG_S_SystemHornMsg()})
    TSRH.RSerializer("9997", "!QL.Common.SystemHornEntity|HornMsgList", "QL.Common.MSG_S_SystemHornMsg");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：配桌成功
     *
     */
    export class MSG_S_PlayerChairInfo extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 1;
            this.$T="QL.Common.MSG_S_PlayerChairInfo"; 
        }
       /**
        *桌子号
        */
       public tableID: number = 0;
       /**
        *椅子号
        */
       public chairID: number = 0;
       /**
        *表示玩家请求配桌操作结果状态
            0 -- 正常配桌
            1 -- 正常选桌
            2 -- 玩家被换桌
        */
       public resultStatus: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_PlayerChairInfo", function () {return new MSG_S_PlayerChairInfo()})
    TSRH.RSerializer("12545", "1|chairID&4|resultStatus&5|tableID", "QL.Common.MSG_S_PlayerChairInfo");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家换桌完成，这个消息是推送的随时会出现
     *
     */
    export class MSG_S_PlayerChangeTableSucess extends MSG_S_PlayerChairInfo {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 22;
            this.$T="QL.Common.MSG_S_PlayerChangeTableSucess"; 
        }
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_PlayerChangeTableSucess", function () {return new MSG_S_PlayerChangeTableSucess()})
    TSRH.RSerializer("12566", "1|chairID&4|resultStatus&5|tableID", "QL.Common.MSG_S_PlayerChangeTableSucess");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家坐到桌子上
     *
     */
    export class MSG_S_PlayerSitDown extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 2;
            this.$T="QL.Common.MSG_S_PlayerSitDown"; 
        }
       /**
        *椅子号
        */
       public chairID: number = 0;
       /**
        *用户信息
        */
       public playerInfo: TablePlayer = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_PlayerSitDown", function () {return new MSG_S_PlayerSitDown()})
    TSRH.RSerializer("12546", "1|chairID&QL.Common.TablePlayer|playerInfo", "QL.Common.MSG_S_PlayerSitDown");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：桌子上的玩家
     *
     */
    export class MSG_S_TablePlayer extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 3;
            this.$T="QL.Common.MSG_S_TablePlayer"; 
        }
       /**
        *椅子号
        */
       public chairID: number = 0;
       /**
        *用户信息
        */
       public playerInfo: TablePlayer = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_TablePlayer", function () {return new MSG_S_TablePlayer()})
    TSRH.RSerializer("12547", "1|chairID&QL.Common.TablePlayer|playerInfo", "QL.Common.MSG_S_TablePlayer");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家从椅子上起立
     *
     */
    export class MSG_S_PlayerStandUp extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 4;
            this.$T="QL.Common.MSG_S_PlayerStandUp"; 
        }
       /**
        *椅子号
        */
       public chairID: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_PlayerStandUp", function () {return new MSG_S_PlayerStandUp()})
    TSRH.RSerializer("12548", "1|chairID", "QL.Common.MSG_S_PlayerStandUp");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家从场地中离开，推送消息，玩家在被系统强制离开场地会发送该消息
     *
     */
    export class MSG_S_PlayerExitRoom extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 23;
            this.$T="QL.Common.MSG_S_PlayerExitRoom"; 
        }
       /**
        *退出场地的玩家ID
        */
       public UserID: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_PlayerExitRoom", function () {return new MSG_S_PlayerExitRoom()})
    TSRH.RSerializer("12567", "5|UserID", "QL.Common.MSG_S_PlayerExitRoom");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：桌子上的玩家状态更新
     *
     */
    export class MSG_S_TablePlayerStatus extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 5;
            this.$T="QL.Common.MSG_S_TablePlayerStatus"; 
        }
       /**
        *椅子号
        */
       public chairID: number = 0;
       /**
        *状态
        */
       public status: GState = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_TablePlayerStatus", function () {return new MSG_S_TablePlayerStatus()})
    TSRH.RSerializer("12549", "1|chairID&1|status", "QL.Common.MSG_S_TablePlayerStatus");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：桌子上的聊天消息
     *
     */
    export class MSG_S_TableChart extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 6;
            this.$T="QL.Common.MSG_S_TableChart"; 
        }
       /**
        *发送者
        */
       public chairID: number = 0;
       /**
        *聊天内容
        */
       public chartContext: string = "";
       /**
        *表示当前消息是不是语音消息,1是语音消息，0 是普通消息（文字消息）
        */
       public Type: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_TableChart", function () {return new MSG_S_TableChart()})
    TSRH.RSerializer("12550", "1|chairID&12|chartContext&1|Type", "QL.Common.MSG_S_TableChart");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家进入场地成功
     *
     */
    export class MSG_S_ExitRoomSuccess extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 12;
            this.$T="QL.Common.MSG_S_ExitRoomSuccess"; 
        }
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_ExitRoomSuccess", function () {return new MSG_S_ExitRoomSuccess()})
    TSRH.RSerializer("12556", "", "QL.Common.MSG_S_ExitRoomSuccess");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家进入场地成功
     *
     */
    export class MSG_S_EnterRoomSuccess extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 13;
            this.$T="QL.Common.MSG_S_EnterRoomSuccess"; 
        }
       /**
        *客户端请求进入的场地ID
        */
       public EnterRoomID: number = 0;
       /**
        *表示玩家是否在场地断线，如果断线需要断线重连
        */
       public IsOffLine: boolean = false;
       /**
        *如果玩家断线重连则该字段表示玩家所在的断线的场地信息
        */
       public RoomInfo: RoomClient = null;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_EnterRoomSuccess", function () {return new MSG_S_EnterRoomSuccess()})
    TSRH.RSerializer("12557", "5|EnterRoomID&14|IsOffLine&QL.Common.RoomClient|RoomInfo", "QL.Common.MSG_S_EnterRoomSuccess");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：游戏结束的通知消息
     *
     */
    export class MSG_S_GameOver extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 14;
            this.$T="QL.Common.MSG_S_GameOver"; 
        }
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_GameOver", function () {return new MSG_S_GameOver()})
    TSRH.RSerializer("12558", "", "QL.Common.MSG_S_GameOver");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：游戏场景状态
     *
     */
    export class MSG_S_GameScene extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 15;
            this.$T="QL.Common.MSG_S_GameScene"; 
        }
       /**
        *游戏当前的场景状态信息
        */
       public GameSceneStatus: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_GameScene", function () {return new MSG_S_GameScene()})
    TSRH.RSerializer("12559", "1|GameSceneStatus", "QL.Common.MSG_S_GameScene");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：游戏开始的通知消息
     *
     */
    export class MSG_S_GameStart extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 16;
            this.$T="QL.Common.MSG_S_GameStart"; 
        }
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_GameStart", function () {return new MSG_S_GameStart()})
    TSRH.RSerializer("12560", "", "QL.Common.MSG_S_GameStart");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家断线游戏的当前状态
     *
     */
    export class MSG_S_PlayerGameOfflineStatus extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 17;
            this.$T="QL.Common.MSG_S_PlayerGameOfflineStatus"; 
        }
       /**
        *自己的椅子号
        */
       public selfChair: number = 0;
       /**
        *自己的桌子号
        */
       public tableID: number = 0;
       /**
        *是否可以断线重连
        */
       public ifCanOfflineConnect: boolean = false;
       /**
        *游戏场景状态
        */
       public gameStatus: number = 0;
       /**
        *桌子类型
        */
       public TableType: TableType = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_PlayerGameOfflineStatus", function () {return new MSG_S_PlayerGameOfflineStatus()})
    TSRH.RSerializer("12561", "1|gameStatus&14|ifCanOfflineConnect&1|selfChair&5|tableID", "QL.Common.MSG_S_PlayerGameOfflineStatus");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家准备倒计时
     *
     */
    export class MSG_S_PlayerReadyTimer extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 21;
            this.$T="QL.Common.MSG_S_PlayerReadyTimer"; 
        }
       /**
        *玩家当前的计时周期,当为 -1 时表示玩家计时器取消
        */
       public TimeTick: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_PlayerReadyTimer", function () {return new MSG_S_PlayerReadyTimer()})
    TSRH.RSerializer("12565", "0|TimeTick", "QL.Common.MSG_S_PlayerReadyTimer");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：
     *
     */
    export class MSG_C_RequestChangeChairId extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 41;
            this.wSubCmdID = 18;
            this.$T="QL.Common.MSG_C_RequestChangeChairId"; 
        }
       /**
        *请求更换座位的椅子号，如果座位上已经有玩家将会发送请求让对方同意。如果座位上没有其他玩家则直接更换到其座位上
        */
       public chairId: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_RequestChangeChairId", function () {return new MSG_C_RequestChangeChairId()})
    TSRH.RSerializer("10514", "1|chairId", "QL.Common.MSG_C_RequestChangeChairId");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：
     *
     */
    export class MSG_C_AcceptChangeChairId extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 41;
            this.wSubCmdID = 19;
            this.$T="QL.Common.MSG_C_AcceptChangeChairId"; 
        }
       /**
        *请求更换座位玩家的椅子号，根据 MSG_S_RequestChangeChairId 内的椅子号参数原样带回
        */
       public chairId: number = 0;
       /**
        *表示玩家是否同意更换座位
        */
       public IsAccept: boolean = false;
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_AcceptChangeChairId", function () {return new MSG_C_AcceptChangeChairId()})
    TSRH.RSerializer("10515", "1|chairId&14|IsAccept", "QL.Common.MSG_C_AcceptChangeChairId");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：服务端发送给玩家请求更换座位的请求消息
     *
     */
    export class MSG_S_RequestChangeChairId extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 24;
            this.$T="QL.Common.MSG_S_RequestChangeChairId"; 
        }
       /**
        *请求更换座位玩家的椅子号
        */
       public chairId: number = 0;
       /**
        *更换座位的提示显示内容
        */
       public Mark: string = "";
       /**
        *发起前的自己的椅子号
        */
       public selfChairId: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_RequestChangeChairId", function () {return new MSG_S_RequestChangeChairId()})
    TSRH.RSerializer("12568", "1|chairId&12|Mark&1|selfChairId", "QL.Common.MSG_S_RequestChangeChairId");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：玩家座位号被更换，如果新座位上有玩家存在直接调换座次，服务端不另行通知
     *
     */
    export class MSG_S_PlayerNewChairInfo extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 25;
            this.$T="QL.Common.MSG_S_PlayerNewChairInfo"; 
        }
       /**
        *玩家的原始椅子号
        */
       public oldChairId: number = 0;
       /**
        *玩家被分配的新的椅子号
        */
       public chairID: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_PlayerNewChairInfo", function () {return new MSG_S_PlayerNewChairInfo()})
    TSRH.RSerializer("12569", "1|chairID&1|oldChairId", "QL.Common.MSG_S_PlayerNewChairInfo");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：开始处理续局功能结果
     *
     */
    export class MSG_S_BeginGameVote extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 26;
            this.$T="QL.Common.MSG_S_BeginGameVote"; 
        }
       /**
        *操作剩余时间
        */
       public Time: number = 0;
       /**
        *玩家的结算分数信息
        */
       public GamePlayerScore: PlayerGameScore[] = null;
       /**
        *游戏内投票器类型
        */
       public GameVoteType: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_BeginGameVote", function () {return new MSG_S_BeginGameVote()})
    TSRH.RSerializer("12570", "!QL.Common.PlayerGameScore|GamePlayerScore&1|GameVoteType&1|Time", "QL.Common.MSG_S_BeginGameVote");


    /**
     *
     * 创建时间：2018年12月13日 22:07:32
     * 创建人员：SHENRUI\admin
     * 备注：
     *
     */
    export enum GameVoteStatus{
        /**
        * 未知
        */
        Unknown = 0,
        /**
        * 同意
        */
        Agree = 1,
        /**
        * 拒绝
        */
        Denied = 2,    
    }


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：服务端发送给玩家请求更换座位的请求消息
     *
     */
    export class MSG_S_PlayerGameVoteStatus extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 28;
            this.$T="QL.Common.MSG_S_PlayerGameVoteStatus"; 
        }
       /**
        *
        */
       public PlayerId: number = 0;
       /**
        *
        */
       public ChairId: number = 0;
       /**
        *
        */
       public status: GameVoteStatus = 0;
       /**
        *
        */
       public GameScore: number = 0;
       /**
        *游戏内投票器类型
        */
       public GameVoteType: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_PlayerGameVoteStatus", function () {return new MSG_S_PlayerGameVoteStatus()})
    TSRH.RSerializer("12572", "1|GameVoteType&5|PlayerId&1|status", "QL.Common.MSG_S_PlayerGameVoteStatus");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：服务端发送给玩家请求更换座位的请求消息
     *
     */
    export class MSG_C_SendGameVoteStatus extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 41;
            this.wSubCmdID = 20;
            this.$T="QL.Common.MSG_C_SendGameVoteStatus"; 
        }
       /**
        *
        */
       public status: GameVoteStatus = 0;
       /**
        *游戏内投票器类型
        */
       public GameVoteType: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_C_SendGameVoteStatus", function () {return new MSG_C_SendGameVoteStatus()})
    TSRH.RSerializer("10516", "1|GameVoteType&1|status", "QL.Common.MSG_C_SendGameVoteStatus");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：完成续局功能操作
     *
     */
    export class MSG_S_EndGameVote extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 49;
            this.wSubCmdID = 27;
            this.$T="QL.Common.MSG_S_EndGameVote"; 
        }
       /**
        *续局操作结束，操作结果
        */
       public status: GameVoteStatus = 0;
       /**
        *游戏内投票器类型
        */
       public GameVoteType: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_EndGameVote", function () {return new MSG_S_EndGameVote()})
    TSRH.RSerializer("12571", "1|GameVoteType&1|status", "QL.Common.MSG_S_EndGameVote");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：表示游戏内玩家的分数信息
     *
     */
    export class PlayerGameScore extends UyiObject {
        public constructor()
        {
            super();
            this.$T="QL.Common.PlayerGameScore"; 
        }
       /**
        *玩家Id
        */
       public PlayerId: number = 0;
       /**
        *玩家椅子号
        */
       public ChairId: number = 0;
       /**
        *玩家分数
        */
       public GameScore: number = 0;
   
    }
    SerializerCreator.Register("QL.Common.PlayerGameScore", function () {return new PlayerGameScore()})
    TSRH.RSerializer("QL.Common.PlayerGameScore", "1|ChairId&4|GameScore&5|PlayerId", "QL.Common.PlayerGameScore");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：错误码
     *
     */
    export class MSG_S_ErrorCode extends GameIF.CustomMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 39;
            this.wSubCmdID = 1;
            this.$T="QL.Common.MSG_S_ErrorCode"; 
        }
       /**
        *错误码数值
        */
       public errorCode: SystemErrorCode = 0;
       /**
        *错误原因
        */
       public ErrorReason: string = "";
   
    }
    SerializerCreator.Register("QL.Common.MSG_S_ErrorCode", function () {return new MSG_S_ErrorCode()})
    TSRH.RSerializer("9985", "1|errorCode&12|ErrorReason", "QL.Common.MSG_S_ErrorCode");


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：往登录服务器
     *
     */
    export class C2LS{
    /**
    * 根据账号登录
    */
   public static readonly MSG_C_LoginByAccount = 1;
    /**
    * 进入游戏房间
    */
   public static readonly MSG_C_EnterGameRoom = 2;
    /**
    * 心跳包
    */
   public static readonly MSG_C_HeartBeatMessage = 3;
    /**
    * 测试消息体
    */
   public static readonly MSG_T_TestMessage = 4;
    /**
    * 根据游戏Id数据查询场地列表
    */
   public static readonly MSG_C_QueryRoomByGameIDArray = 5;
    /**
    * 查询游戏
    */
   public static readonly MSG_C_QueryGame = 6;
    /**
    * 根据传入的一个游戏Id数组来查询游戏信息
    */
   public static readonly MSG_C_QueryGameByIDArray = 7;
    /**
    * 查询玩家道具余额，提供给玩家的余额更新通知
    */
   public static readonly MSG_C_QueryUserProp = 8;
    /**
    * 查询断线场地
    */
   public static readonly MSG_C_QueryOfflineRoom = 9;
    /**
    * 获取群内创建房间列表
    */
   public static readonly MSG_C_QueryGroupTableList = 10;
    /**
    * 订阅或者取消订阅指定类别消息的处理接口
    */
   public static readonly MSG_C_SubscribeOrUnsubscribeMessage = 11;

    }


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：往游戏服务器
     *
     */
    export class C2GS{
    /**
    * 请求配桌
    */
   public static readonly c2gs_offerPairTable = 1;
    /**
    * 坐下
    */
   public static readonly c2gs_sitDown = 2;
    /**
    * 玩家准备
    */
   public static readonly c2gs_ready = 3;
    /**
    * 玩家从座位上起立(离开)
    */
   public static readonly c2gs_standUP = 4;
    /**
    * 聊天消息
    */
   public static readonly c2gs_chartMsg = 6;
    /**
    * 查询商户比赛状态
    */
   public static readonly c2gs_queryAgentMatchStatus = 7;
    /**
    * 复活参加商户比赛
    */
   public static readonly c2gs_reliveAgentMatch = 8;
    /**
    * 玩家断线重连进来
    */
   public static readonly c2gs_offlineComein = 9;
    /**
    * 报名参赛
    */
   public static readonly c2gs_signupMatch = 11;
    /**
    * 查询复活规则
    */
   public static readonly c2gs_queryReliveRule = 12;
    /**
    * 退出场地
    */
   public static readonly c2gs_exitRoom = 13;
    /**
    * 同桌语音聊天
    */
   public static readonly MSG_C_ChartVoiceMsg = 14;
    /**
    * 踢出桌子上的玩家，玩家会被强制起立离开当前桌子
    */
   public static readonly MSG_C_EliminateUser = 16;
    /**
    * 玩家发起求助请求，服务服务器在接收到该消息后会将该消息转发给指定玩家，客户端也需要处理该消息
    */
   public static readonly MSG_C_SeekHelpUser = 17;
    /**
    * 玩家请求更换座位
    */
   public static readonly MSG_C_RequestChangeChairId = 18;
    /**
    * 玩家同意更换玩家座位号
    */
   public static readonly MSG_C_AcceptChangeChairId = 19;
    /**
    * 服务端发送给玩家请求更换座位的请求消息
    */
   public static readonly MSG_C_SendGameVoteStatus = 20;

    }


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：从登录服务器来
     *
     */
    export class LS2C{
    /**
    * 系统推送消息
    */
   public static readonly MSG_S_SystmPushMsg = 0;
    /**
    * 错误码
    */
   public static readonly MSG_S_ErrorCode = 1;
    /**
    * 玩家最新余额
    */
   public static readonly MSG_S_PlayerLatestBalance = 2;
    /**
    * 登录成功
    */
   public static readonly MSG_S_LoginSuccess = 3;
    /**
    * 刷新玩家的登录信息Token
    */
   public static readonly MSG_S_UserSessionKey = 4;
    /**
    * 玩家创建桌子信息的推送
    */
   public static readonly MSG_S_UserCreateTableNotice = 5;
    /**
    * 查询场地信息返回
    */
   public static readonly MSG_S_RoomList = 6;
    /**
    * 游戏列表
    */
   public static readonly MSG_S_GameList = 7;
    /**
    * 断线场地
    */
   public static readonly MSG_S_OfflineRoom = 8;
    /**
    * 系统配置表
    */
   public static readonly MSG_S_SysConfig = 9;
    /**
    * 玩家道具列表
    */
   public static readonly MSG_S_UserProp = 10;
    /**
    * 根据桌子Id获取创建的房间信息
    */
   public static readonly MSG_S_SingleTableInfo = 11;
    /**
    * 获取到的群内玩家创建的房间列表
    */
   public static readonly MSG_S_GroupTableList = 12;
    /**
    * 系统跑马灯消息
    */
   public static readonly MSG_S_SystemHornMsg = 13;

    }


    /**
     *
     * @创建时间：2018年12月13日 22:07:32
     * @创建人员：SHENRUI\admin
     * @备注信息：从游戏服务器来
     *
     */
    export class GS2C{
    /**
    * 配桌成功
    */
   public static readonly gs2c_pairTableSuccess = 1;
    /**
    * 玩家坐下
    */
   public static readonly gs2c_playerSitDown = 2;
    /**
    * 桌子上的玩家
    */
   public static readonly gs2c_tablePlayer = 3;
    /**
    * 玩家起立
    */
   public static readonly gs2c_playerStandUP = 4;
    /**
    * 玩家状态
    */
   public static readonly gs2c_playerStatus = 5;
    /**
    * 本桌聊天消息
    */
   public static readonly gs2c_tableChartMsg = 6;
    /**
    * 我的比赛状态
    */
   public static readonly gs2c_matchStatus = 7;
    /**
    * 玩家进入场地成功
    */
   public static readonly MSG_S_ExitRoomSuccess = 12;
    /**
    * 玩家进入场地成功
    */
   public static readonly MSG_S_EnterRoomSuccess = 13;
    /**
    * 游戏结束的通知消息
    */
   public static readonly MSG_S_GameOver = 14;
    /**
    * 游戏场景状态
    */
   public static readonly MSG_S_GameScene = 15;
    /**
    * 游戏开始的通知消息
    */
   public static readonly MSG_S_GameStart = 16;
    /**
    * 玩家断线游戏的当前状态
    */
   public static readonly MSG_S_PlayerGameOfflineStatus = 17;
    /**
    * 玩家准备计时
    */
   public static readonly MSG_S_PlayerReadyTimer = 21;
    /**
    * 玩家换桌完成，这个消息是推送的随时会出现
    */
   public static readonly MSG_S_PlayerChangeTableSucess = 22;
    /**
    * 玩家被系统请离场地，这个时候玩家已经不在场地中
    */
   public static readonly MSG_S_PlayerExitRoom = 23;
    /**
    * 玩家响应更换座位的请求
    */
   public static readonly MSG_S_RequestChangeChairId = 24;
    /**
    * 玩家椅子号被更换分配的新的椅子号
    */
   public static readonly MSG_S_PlayerNewChairInfo = 25;
    /**
    * 开始处理续局功能结果
    */
   public static readonly MSG_S_BeginGameVote = 26;
    /**
    * 完成续局功能操作
    */
   public static readonly MSG_S_EndGameVote = 27;
    /**
    * 服务端发送给玩家请求更换座位的请求消息
    */
   public static readonly MSG_S_PlayerGameVoteStatus = 28;

    }

}