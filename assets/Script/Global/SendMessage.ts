
import Global from "./Global";
import { QL_Common } from "../CommonSrc/QL_Common";
import { GameIF } from "../CommonSrc/GameIF";
import { Debug } from "../Tools/Function";
import { NativeCtrl } from "../Native/NativeCtrl";
import { GpsInfoTools } from "../CustomType/GpsInfo";
import { DESEncryptHelper } from "../Tools/DESEncryptHelper";
import H5ByteBuffer from "../Serializer/H5ByteBuffer";
import { UPacketData } from "../Serializer/PacketCodecHandler";

export default class SendMessage {
    private static _instance: SendMessage;
    public static get Instance(): SendMessage {
        if (SendMessage._instance == null) SendMessage._instance = new SendMessage();
        return SendMessage._instance;
    }

    public constructor() {

    }

    private sendData(cm: GameIF.CustomMessage | H5ByteBuffer) {
        Global.Instance.Socket.SendData(cm);
    }


    public HeartBeatMessage() {
        const heart = UPacketData.HeartBeatPingData;
        this.sendData(heart);
    }

    /**
     * 登录
     * @returns {}
     */
    public LoginByAccount(PlayerLogonType: QL_Common.LoginType, Password: string = "", Account: string = "") {
        const login_by_account = new QL_Common.MSG_C_LoginByAccount();
        login_by_account.Account = Account;
        login_by_account.Password = Password;
        login_by_account.PlayerLogonType = PlayerLogonType;

        const str = NativeCtrl.GetGpsJson();
        if (str != "fail" && str != "success") {
            cc.log(str);

            login_by_account.CAttachData = new Array();
            const gps = GpsInfoTools.initWithJsonStr(str);
            const data1 = new QL_Common.KeyValueData();
            data1.Key = "Latitude";
            data1.Value = gps.Latitude + "";
            const data2 = new QL_Common.KeyValueData();
            data2.Key = "Longitude";
            data2.Value = gps.Longitude + "";

            const data3 = new QL_Common.KeyValueData();
            data3.Key = "Address";
            data3.Value = gps.Address + "";

            login_by_account.CAttachData.push(data1);
            login_by_account.CAttachData.push(data2);
            login_by_account.CAttachData.push(data3);
        }

        this.sendData(login_by_account);
    }

    /**
     * 查询所有游戏列表
     * @returns {} 
     */
    public QueryGame() {
        const query_game = new QL_Common.MSG_C_QueryGame();
        this.sendData(query_game);
    }

    public QueryGameByIDArray(array: Array<number>) {
        const query_game = new QL_Common.MSG_C_QueryGameByIDArray();
        query_game.GameIDArray = array;
        this.sendData(query_game);
    }


    /**
     * 根据游戏取房间
     * @param GameID 游戏ID
     * @param AgentID 商户ID
     * @returns {} 
     */
    public QueryRoomByGameID(GameID: number) {
        const query_room_by_game_id = new QL_Common.MSG_C_QueryRoomByGameIDArray();
        query_room_by_game_id.GameIDArray = [GameID];
        this.sendData(query_room_by_game_id);
    }

    public QueryRoomByGameIDAyyay(GameID: number[]) {
        const query_room_by_game_id_ayyay = new QL_Common.MSG_C_QueryRoomByGameIDArray();
        query_room_by_game_id_ayyay.GameIDArray = GameID;
        this.sendData(query_room_by_game_id_ayyay);
    }

    /**
     * 查询玩家道具
     * @param currenttype 
     * @returns {} 
     */
    public QueryUserProp(currenttype: Array<QL_Common.CurrencyType>) {
        const query_user_prop = new QL_Common.MSG_C_QueryUserProp();
        query_user_prop.queryTypeAry = currenttype;
        this.sendData(query_user_prop);
    }


    /**
     * 进入游戏房间
     * @param RoomID 
     * @returns {} 
     */
    public EnterGameRoom(RoomID: number, Method = QL_Common.EnterRoomMethod.RoomID) {
        const enter_game_room = new QL_Common.MSG_C_EnterGameRoom();
        enter_game_room.RoomID = RoomID;
        enter_game_room.Method = Method;
        this.sendData(enter_game_room);
    }

    /**
     * 查询断线列表
     * @returns {} 
     */
    public QueryOfflineRoom() {
        const query_offline_room = new QL_Common.MSG_C_QueryOfflineRoom();
        this.sendData(query_offline_room);
    }

    //============================================================游戏发往服务器消息======================================================


    /*
     * ============================================进入游戏=========================================
     * 一个完整的进入游戏流程如下：
     * 
     * 1.>>>>>>>>>>>>>玩家申请进入房间
     * 2.<<<<<<<<<<<<<收到服务器通知
     * -------进入房间成功时候创建游戏场景,初始化游戏场景（仅仅实例化界面）此时游戏中无法访问到桌子数据，只能做游戏界面处理（InitUiClass()）
     * ——---进入房间失败弹出错误
     * 3.>>>>>>>>>>>>>发送请求配桌
     * 4.<<<<<<<<<<<<<收到配桌成功
     * -------初始化游戏数据（InitGameView()）
     * 5.>>>>>>>>>>>>>发送玩家坐下
     * ====================================================================================
     * 
     * 
     * 
     * ============================================离开游戏========================================== 
     * >>>>>>>>>>>>>>>先发送请求离开
     * <<<<<<<<<<<<<<<客户端收到服务器 “自己离开”的消息
     * >>>>>>>>>>>>>>>发送退出房间
     * <<<<<<<<<<<<<<<收到退出房间成功
     * 显示Loading，创建主场景，销毁游戏场景，显示主场景，隐藏Loading
     * ====================================================================================
     * 
     * 
     * 
     * 
     * ==============================================换桌=============================================
     * <<<<<<<<<<<<<<<客户端收到服务器 “自己离开”的消息
     * *********此时客户端不会发送 退出房间指令 ，退出房间只有玩家主动离开时才会发送*******
     * <<<<<<<<<<<<<<<收到配桌成功
     * 此时检测到游戏场景已经创建完成，直接将玩家设置到座位上
     * ====================================================================================
     * 
     * 
     * 
     * 
     * 
     * 
     * /




    /**
     * 请求配桌
     * @param UserID 
     * @returns {} 
     */
    public OfferPairTable(TableID: number = QL_Common.InvalidValue.InvalidTableID
        , ChairID: number = QL_Common.InvalidValue.InvalidChairID
        , GroupId: number = QL_Common.InvalidValue.InvalidID
        , IsFreeCreate: boolean = false
        , RuleId: number = 0
    ) {
        const offer_pair_table = new QL_Common.MSG_C_OfferPairTable();
        offer_pair_table.ChairID = ChairID;
        offer_pair_table.TableID = TableID;
        offer_pair_table.GroupId = GroupId
        offer_pair_table.IsFreeCreate = IsFreeCreate;
        offer_pair_table.RuleId = RuleId;
        this.sendData(offer_pair_table);
    }

    /**
     * 退出房间
     * @param PlayerID 
     * @returns {} 
     */
    public ExitRoom() {
        const exit_room = new QL_Common.MSG_C_ExitRoom();
        this.sendData(exit_room);
    }

    /**
     * 玩家坐下
     * @returns {} 
     */
    public SitDown() {
        const sit_down = new QL_Common.MSG_C_SitDown();
        this.sendData(sit_down);
    }

    /**
     * 准备游戏
     * @returns {} 
     */
    public PlayerReady() {
        const player_ready = new QL_Common.MSG_C_PlayerReady();
        this.sendData(player_ready);
    }
    public GameVoteStatus(gameVoteType: number, status: QL_Common.GameVoteStatus) {
        const continue_status = new QL_Common.MSG_C_SendGameVoteStatus();
        continue_status.status = status;
        continue_status.GameVoteType = gameVoteType;
        this.sendData(continue_status)
    }


    /**
     * 玩家起立
     * @returns {} 
     */
    public PlayerStandUP() {
        const player_stand_up = new QL_Common.MSG_C_PlayerStandUP();
        this.sendData(player_stand_up);
    }

    /**
     * 发送聊天消息
     * @param type 消息类型
     * @param chartContext 文本内容
     * @returns {} 
     */
    public ChartMsg(type: number, chartContext: string) {
        const chart_msg = new QL_Common.MSG_C_ChartMsg();
        chart_msg.type = type;
        chart_msg.chartContext = chartContext;
        this.sendData(chart_msg);
    }

    /**
     * 断线重连进来
     * @returns {} 
     */
    public OfflineComein() {
        const offline_comein = new QL_Common.MSG_C_OfflineComein();
        this.sendData(offline_comein);
    }

    /**
     * 踢出玩家
     * @param EliminateUserID 踢出的玩家UserID,该玩家必须在当前桌子上并且不是房主，玩家的VIP等级必须低于或者等于请求的玩家的VIP等级才会被踢出
     * @returns {} 
     */
    public EliminateUser(EliminateUserID: number) {
        const eliminate_user = new QL_Common.MSG_C_EliminateUser();
        eliminate_user.EliminateUserID = EliminateUserID;
        this.sendData(eliminate_user);

    }

    /**
     * 请求换座位
     * @param chairid 
     */
    public RequestChangeChairId(chairid: number) {
        const req = new QL_Common.MSG_C_RequestChangeChairId();
        req.chairId = chairid;
        this.sendData(req);
    }

    public AcceptChangeChairId(chairid: number, accept: boolean) {
        const a = new QL_Common.MSG_C_AcceptChangeChairId();
        a.chairId = chairid;
        a.IsAccept = accept;
        this.sendData(a);
    }

    /**
     * 获取群内创建房间列表
     * @param group_id 获取的群Id
     * @param start_id 获取数据的起始Id
     * @param count 获取数据的数量
     */
    public QueryGroupTableList(group_id: number, rule_Id: number, start_id: number = 0, count: number = 3) {
        let data: QL_Common.MSG_C_QueryGroupTableList = new QL_Common.MSG_C_QueryGroupTableList();

        data.GroupId = group_id;
        data.count = count;
        data.RuleId = rule_Id;
        data.startId = start_id;

        this.sendData(data);

    }

    /**
     * 向服务器订阅指定渠道的消息
     */
    public SubscribeOrUnsubscribe(chanel: string, opType: QL_Common.SubscribeMessageOpType = QL_Common.SubscribeMessageOpType.Subscribe) {
        let data: QL_Common.MSG_C_SubscribeOrUnsubscribeMessage
            = new QL_Common.MSG_C_SubscribeOrUnsubscribeMessage();

        data.OpType = opType;
        data.ChanelName = chanel;
        this.sendData(data);

    }
}
