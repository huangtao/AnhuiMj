import { IGameHost } from "../Interface/IGameHost";
import SendMessage from "./SendMessage";
import Global from "./Global";
import { QL_Common } from "../CommonSrc/QL_Common";
import { GameIF } from "../CommonSrc/GameIF";
import { EventCode } from "./EventCode";
import { InitGameParam } from "../CustomType/InitGameParam"; 
import { Action , ActionNet} from "../CustomType/Action";
import { WebRequest } from "../Net/Open8hb";
import { IDictionary } from "../Interface/IDictionary";
import FriendCircleWebHandle from "../Form/FriendsCircle/FriendCircleWebHandle";
import FriendCircleDataCache from "../Form/FriendsCircle/FriendCircleDataCache";
import { UIName } from "../Global/UIName";
import { CurrentPackageType, Debug } from "../Tools/Function";
import { PackageType } from "../CustomType/PackageType";

/**
 * 
 * 游戏控制器
 * 
 * 游戏控制器用来处理所有从游戏服务器发送来的公共信息
 * 
 * 它控制游戏从开始进入房间到玩家坐下的整个流程
 * 
 * 当玩家想进入房间时候，先检查有无可以断线重连的房间。
 * 
 * 如果有，提示玩家，在玩家同意的情况下开始断线重连逻辑，如果玩家不同意，不作任何处理
 * 
 * 如果没有，则直接执行进入房间，配桌等逻辑 获取到桌子号码之后，客户端更换场景
 * 
 * 
 * 
 * 
 * 不管是不是断线重连，第一步都是进入房间，进入房间后，服务器通知是否是断线重连进来，
 * 
 * 如果是，直接创建游戏界面，然后向服务器发送 “断线重连进来”
 * 
 * 如果不是 向服务器请求配桌，获取到椅子号之后，创建游戏界面，然后向服务器发送 “我坐下了”
 * 
 * 
 * 
 */
export class GameHost implements IGameHost {


    private _lock: boolean;

    private _enterParam: { id: number, method: QL_Common.EnterRoomMethod, rule: any, group_id: number, IsFreeCreate: false } = { id: 0, method: 0, rule: null, group_id: 0 ,IsFreeCreate: false}

    private _initGameParam: InitGameParam = new InitGameParam();

    private get DataCache() {
        return Global.Instance.DataCache;
    }


    private get EventManager() {
        return Global.Instance.EventManager;
    }

    private get UiManager() {
        return Global.Instance.UiManager;
    }

    private get UserInfo() {
        return this.DataCache.UserInfo;
    }
    public constructor() {

    }

    onErrorCode(code: number, reason: string): boolean {
        switch (code) {
            case QL_Common.SystemErrorCode.ExitRoomFail:
                this.UiManager.ShowMsgBox("玩家退出房间失败\n游戏已经开始");
                return true;
            case QL_Common.SystemErrorCode.Success:
                return true;
            case QL_Common.SystemErrorCode.RequestTableFail:
                const ok = () => {
                    this.GoToHall();
                    //SendMessage.Instance.OfferPairTable();
                };
                const cancle = () => {
                    this.GoToHall();
                };
                this.UiManager.ShowMsgBox("房间已满或者游戏已经开始，即将返回大厅", this, ok, cancle, cancle);
                return true;
            case QL_Common.SystemErrorCode.JoinRoomFail: {
                this.UiManager.ShowMsgBox(reason);
                this.GoToHall();
                return true;
            }
        }
        return false;
    }

    /**
     * 通过房间号加入房间
     */
    joinRoom(roomId: number, type: QL_Common.EnterRoomMethod) {
         if (!roomId) {
             return;
         }

        if (Debug()) {
            cc.info('--- debug mode ');
            Global.Instance.GameHost.TryEnterRoom(roomId, type);
            return;
        }
        
        // 判断是否加入的是亲友圈房间
        // 先请求亲友圈列表
        FriendCircleWebHandle.requestFriendCircleList(new Action(this,(res)=>{
            let getTableInfoCb = (args)=>{
                cc.info('-- requestFriendCircRuleCb ',args);
        
                if (!args || 'fail' == args.status || "success" != args.status) {
                    Global.Instance.UiManager.CloseUi(UIName.AutoJoinRoom);
                    return;
                }
                 
                // 检测该玩家是否已经加入了亲友圈
                let groupId = args.data.groupId;

                if (groupId > 0) {
                        if (!FriendCircleDataCache.Instance.isFriendCircleMember(groupId + '')) {
                            this.UiManager.ShowMsgBox('您不在该亲友圈，是否申请加入?',this,()=>{
                                FriendCircleWebHandle.joinFriendCircle(groupId + '',new Action(this,(res)=>{
                                this.UiManager.ShowTip('已申请,请联系圈主审核!');
                                }));
                            });
                        }else{
                            Global.Instance.GameHost.TryEnterRoom(roomId, type);
                        }
                }else{
                    Global.Instance.GameHost.TryEnterRoom(roomId, type);
                }
                
            }
            
            // 发送请求
            let data: IDictionary<string,any> = WebRequest.DefaultData(true);
            data.Add("tableId",roomId);
            const action = new ActionNet(this,getTableInfoCb,getTableInfoCb);
            WebRequest.FriendCircle.getTableInfo(action,data);
        }));
     }
    /**
     * 尝试进入房间，会检查断线重连信息
     * @param id 号
     * @param type 进入类型
     * @param gamerule 自定义的游戏规则
     * @param attachParam 调用请求的附加参数
     */
    TryEnterRoom(id: number, type: QL_Common.EnterRoomMethod, gamerule?: any, attachParam?: any) {
        if (this._lock) {
            //已经开始了一轮进入房间指令
            return;
        }
        this.SetLock();
        this._enterParam.id = id;
        this._enterParam.method = type;
        this._enterParam.rule = gamerule;
        this._enterParam.group_id = Global.Instance.DataCache.GroupId;

        this.initEnterRoomAttachParam(attachParam);
        SendMessage.Instance.QueryOfflineRoom();
    }

    /**
     * 直接进入房间，不需要检查断线重连信息
     * @param Room 房间号
     * @param type 进入类型
     */
    EnterRoom(id: number, type: QL_Common.EnterRoomMethod, gamerule?: any) {
        if (this._lock) {
            //已经开始了一轮进入房间指令
            return;
        }
        this.SetLock();

        this._enterParam.id = id;
        this._enterParam.method = type;
        this._enterParam.rule = gamerule;
        SendMessage.Instance.EnterGameRoom(this._enterParam.id, this._enterParam.method);
    }

    OfflineRoomInfo(): void {
        //断线重连的第一步也是进入房间，如果玩家选择进入房间，也可以
        const offline = this.DataCache.OfflineRoom;

        //如果没有断线重连信息，直接开始正常的配桌流程
        if (offline == null) {
            this.enterRoom();
            return;
        }


        //如果有断线重连信息，提示玩家，由玩家选择是否断线重连

        const reconnet = () => {
            this.enterRoom();
        }
        const noreconnet = () => {
            this.UiManager.ShowTip("用户取消了断线重连")
        }

        //如果包括了这个游戏，则直接创建游戏
        if (this.DataCache.GameList.Contains(this.DataCache.OfflineRoom.GameID)) {
            this.UiManager.ShowMsgBox(`你参加的${this.DataCache.OfflineRoom.Name}游戏尚未结束，是否断线重连？`, this, reconnet, noreconnet, noreconnet);
        } else {
            this.UiManager.ShowTip(`您在${this.DataCache.OfflineRoom.Name}中的游戏还未结束，请在结束后再进入`);
        }
    }

    OnGameSceneComplete(): void {
        if (this._initGameParam.IsOffLine) {
            SendMessage.Instance.OfflineComein();
        } else {
            if (this._enterParam.method === QL_Common.EnterRoomMethod.TableID) {
                SendMessage.Instance.OfferPairTable(this._enterParam.id);
            } else {
                if (this._enterParam.group_id > 0) {
                    //如果指定了群组Id,传入群Id创建房间
                    SendMessage.Instance.OfferPairTable(QL_Common.InvalidValue.InvalidTableID
                        , QL_Common.InvalidValue.InvalidChairID
                        , this._enterParam.group_id,
                        this._enterParam['IsFreeCreate']);
                } else {
                    SendMessage.Instance.OfferPairTable();
                }
            }
        }
    }
    OnQuerySingleTableInfo(cm: GameIF.CustomMessage) {
        let table_info = cm as QL_Common.MSG_S_SingleTableInfo;
        if (!table_info) {
            cc.log("回传消息无效");
            return;
        }

        if (table_info.Data.GroupId <= 0) {
            cc.log(`房间无群信息，随意进入`);
            SendMessage.Instance.EnterGameRoom(this._enterParam.id, this._enterParam.method);
        }
        else {

            if (table_info.Data.RoomOwner == this.DataCache.UserInfo.userData.UserID) {
                //由于是房主，无论是否在群内，都可以进入房间
                SendMessage.Instance.EnterGameRoom(this._enterParam.id, this._enterParam.method);
                return;
            }

            cc.log(`桌子存在群信息，需要验证后才能进入`); 
    
        }

    }
    OnMessageIncome(cm: GameIF.CustomMessage): boolean {
        switch (cm.wSubCmdID) {
            case QL_Common.GS2C.MSG_S_EnterRoomSuccess:
                this.MSG_S_EnterRoomSuccess(cm);
                return true;
            case QL_Common.GS2C.gs2c_pairTableSuccess:
                this.MSG_S_PlayerChairInfo(cm);
                return true;
            //断线重连信息
            case QL_Common.GS2C.MSG_S_PlayerGameOfflineStatus: {
                this.MSG_S_PlayerGameOfflineStatus(cm);
                return true;
            }
            //玩家退出房间
            case QL_Common.GS2C.MSG_S_PlayerExitRoom: {
                this.MSG_S_PlayerExitRoom(cm);
                return true;
            }
             case QL_Common.GS2C.MSG_S_ExitRoomSuccess: {
                this.GoToHall();
                return true;
            }
            default: {
                const s = Global.Instance.NowScene;
                if (cc.isValid(s)) {
                    s.OnMessageIncome(cm);
                }
                return true;
            }

        }
    }
    ExitGame() {
        SendMessage.Instance.ExitRoom();
    }

    
    public UnLock(){
        this._lock = false;
    }


    /**
     * 设置加锁
     */
    private SetLock() {
        this._lock = true;
        const t = this;
        setTimeout(() => {
            t._lock = false;
            cc.log("解锁");
        }, 1000);
    }


    private enterRoom() {
        if (this.DataCache.OfflineRoom != null) {
            SendMessage.Instance.EnterGameRoom(this.DataCache.OfflineRoom.ID, QL_Common.EnterRoomMethod.RoomID);
        } else {
            if (this._enterParam.method == QL_Common.EnterRoomMethod.TableID) {
                //检查桌子信息 
                SendMessage.Instance.EnterGameRoom(this._enterParam.id, QL_Common.EnterRoomMethod.QueryTableInfo);
                return;
            }
            //不需要断线重连，直接进入场地 
            SendMessage.Instance.EnterGameRoom(this._enterParam.id, this._enterParam.method);
        }
    }


    private GoToHall() {
        Global.ChangeScene("Hall",null,'正在返回大厅');
        this.Clear();
    }
    private Clear() {
        this._enterParam.id = 0;
        this._enterParam.method = 0;
        this._enterParam.rule = null;
    }




    //进入房间成功
    private MSG_S_EnterRoomSuccess(cm) {
        const success = <QL_Common.MSG_S_EnterRoomSuccess>cm;
        this._initGameParam.IsOffLine = success.IsOffLine;
        this._initGameParam.RoomClient = success.RoomInfo;
        this._initGameParam.GameInfo = this.DataCache.GameList.GetGame(success.RoomInfo.GameID);

        this.EventManager.PostMessage(EventCode.CreateGameScene, success.RoomInfo);

    }

    //配桌成功
    private MSG_S_PlayerChairInfo(cm) {
        const chair = <QL_Common.MSG_S_PlayerChairInfo>cm;
        //this.UiManager.ShowTip("配桌成功！");
        //设置玩家座位号
        this._initGameParam.ChairID = chair.chairID;
        this._initGameParam.TableID = chair.tableID;
        this._initGameParam.GameStatus = 0;
        this._initGameParam.GameRule = this._enterParam.rule;
        // this._initGameParam.GroupId = this._enterParam.group_id;
        //配桌成功后初始化场景
        this.EventManager.PostMessage(EventCode.InitGameScene, this._initGameParam);
        //初始化完成后通知服务端我坐下了
        SendMessage.Instance.SitDown();
    }




    //当发送我进来了以后，服务器发送状态信息到客户端，用于恢复客户端信息
    private MSG_S_PlayerGameOfflineStatus(cm) {
        const offline = <QL_Common.MSG_S_PlayerGameOfflineStatus>cm;
        if (!offline.ifCanOfflineConnect) {
            this.GoToHall();
            return;
        }
        //this.UiManager.ShowTip("重连成功！");
        this._initGameParam.ChairID = offline.selfChair;
        this._initGameParam.TableID = offline.tableID;
        this._initGameParam.GameStatus = offline.gameStatus;
        this.EventManager.PostMessage(EventCode.InitGameScene, this._initGameParam);
    }

    private MSG_S_PlayerExitRoom(cm) {
        const exit = <QL_Common.MSG_S_PlayerExitRoom>cm;
        if (exit.UserID === this.UserInfo.userData.UserID) {
            this.GoToHall();
        }
    }
    /**
     * 初始化进入房间时携带的附件参数
     * @param attachParam 携带的附件参数
     */
    private initEnterRoomAttachParam(attachParam: any) {
        cc.log(`开始初始化附件参数数据`); 
        if (!cc.isValid(attachParam)) return;
        for (let i in attachParam) {
            this._enterParam[i] = attachParam[i];
        }
    }

}