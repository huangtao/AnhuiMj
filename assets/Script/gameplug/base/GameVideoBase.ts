import UIBase from "../../Form/Base/UIBase";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { QueryAIFace, ReportError } from "../../Tools/Function";
import ConfigData from "../../Global/ConfigData";
import { GameIF } from "../../CommonSrc/GameIF";
import { AudioType } from "../../CustomType/Enum";
import Global from "../../Global/Global";
import H5ByteBuffer from "../../Serializer/H5ByteBuffer";
import PacketCodecHandler from "../../Serializer/PacketCodecHandler";
import { EventCode } from "../../Global/EventCode";
import { ConstValues } from "../../Global/ConstValues";

/**
 * 录像消息
 * */
class VideoMsg {

    /**
     * 发送椅子号
     * */
    public chair: number;
    /**
     * 发送时间
     * */
    public time: number;
    /**
     * 发送数据
     * */
    public data: Array<number>;

    public constructor() {
        this.chair = QL_Common.InvalidValue.InvalidChairID;
        this.time = 0;
        this.data = new Array<number>();
    }
}
const timeinvinterval = 0;

export class GameVideoBase extends UIBase<any>{
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true
    
    public get isPlayPopAction(): boolean { return false; }

    public readonly TablePlayer: QL_Common.TablePlayer[] = new Array();
    private readonly _timerHandle: Function = this.timerHandle.bind(this);

    private _tableID: number;
    public get TableID(): number {
        return this._tableID;
    }

    private _chairID: number;
    public get ChairID(): number {
        return this._chairID;
    }

    private _roomInfo: QL_Common.RoomClient;
    public get RoomClient() {
        return this._roomInfo;
    }

    private _gameRule: any;
    public get GameRule() {
        return this._gameRule;
    }

    private _gameInfo: QL_Common.GameInfo;
    public get GameInfo() {
        return this._gameInfo;
    }

    private _gameStatus: number;
    public get GameStatus() {
        return this._gameStatus;
    }

    private _videoMsg: Array<VideoMsg>;
    //录像是否暂停中
    private _isRuning: boolean;
    //录像播放速度
    private _videoSpeed: number;
    public get VideoSpeed(): number {
        return this._videoSpeed;
    }
    //上次时间
    private _timeStamp: number;
    //消息索引
    private _msgIdx: number;
    //时间
    private _videoTime: number;
    //buffer数据
    private _data: H5ByteBuffer = new H5ByteBuffer();


    public get AudioManager() {
        return Global.Instance.AudioManager;
    }

    onDestroy() {
        super.onDestroy();
        // Global.Instance.AudioManager.StopMusic();
        try {
            this.DestryGameClass();
        } catch (e) {
            cc.error("销毁录像场景出现异常");
            if (cc.sys.isBrowser) {
                cc.error(e);
            }
            ReportError(`销毁游戏场景出现异常` + " err.msg=" + e.message);
        }
        this.EventManager.PostMessage(EventCode.onReplayBack);
    }

    protected InitShow() {
        const obj = this.ShowParam;
        if (!obj) return;
        this.OnResetGameClass();
        //恢复场地数据
        this._roomInfo = new QL_Common.RoomClient();
        this._roomInfo.GameID = obj.room.GameID;
        this._roomInfo.RoomType = obj.room.RoomType;
        this._roomInfo.BaseMoney = obj.room.BaseMoney;
        this._roomInfo.JoinMultiNum = obj.room.JoinMultiNum;
        this._roomInfo.MaxCount = obj.room.MaxCount;
        this._roomInfo.RoomLV = obj.room.RoomLV;
        this._roomInfo.CheckMoneyType = obj.room.CheckMoneyType;
        this._roomInfo.TableCost = obj.room.TableCost;
        this._roomInfo.Name = obj.room.Name;
        this._roomInfo.TableCostMoneyType = obj.room.TableCostMoneyType;
        this._roomInfo.ID = obj.room.ID;


        this.OnInitClass();


        //恢复桌子玩家数据

        this._tableID = 0;
        this._chairID = QL_Common.InvalidValue.InvalidChairID;

        for (var i = 0; i < obj.tableplayer.length; i++) {
            if (0 === obj.tableplayer[i].PlayerID) {
                this.TablePlayer.push(null);
            } else {
                const player: QL_Common.TablePlayer = new QL_Common.TablePlayer();

                player.NickName = obj.tableplayer[i].NickName;
                player.PlayerID = obj.tableplayer[i].PlayerID;
                if (player.PlayerID < ConstValues.StartUserId)
                    player.FaceID = QueryAIFace(obj.tableplayer[i].FaceID);
                else
                    player.FaceID = obj.tableplayer[i].FaceID;
                player.PlayerLV = obj.tableplayer[i].PlayerLV;
                player.VIPLV = obj.tableplayer[i].VIPLV;
                player.PlayerState = QL_Common.GState.Gaming;
                player.GoldNum = obj.tableplayer[i].GoldNum;
                player.QiDouNum = obj.tableplayer[i].GoldCardNum;
                player.DiamondsNum = obj.tableplayer[i].DiamondsNum;
                player.Gender = obj.tableplayer[i].Gender;

                if (player.PlayerID === this.UserInfo.userData.UserID) {
                    this._chairID = i;
                }
                if (player.FaceID.length === 0) {
                    player.FaceID = ConfigData.defaultHeader;
                }

                this.TablePlayer.push(player);
            }
        }

        if (QL_Common.InvalidValue.InvalidChairID === this._chairID) {
            //this.ExitGame();
            for (let i = 0; i < this.TablePlayer.length; i++) {
                if (this.TablePlayer[i]) {
                    this._chairID = i;
                    break;
                }
            }
        }

        //通知玩家坐下
        for (let j = 0; j < this.TablePlayer.length; j++) {
            if (null != this.TablePlayer[j]) {
                this.OnPlayerSitDown(j, this.TablePlayer[j]);
            }
        }
        //读取消息数据
        this._videoMsg = new Array();
        cc.log("总消息长度为" + obj.gamemessage.length);
        for (let j = 0; j < obj.gamemessage.length; j++) {
            const msg: VideoMsg = new VideoMsg();
            msg.chair = obj.gamemessage[j].chair;
            msg.time = obj.gamemessage[j].time;
            msg.data = obj.gamemessage[j].data;
            this._videoMsg.push(msg);
        }

        //预备开始
        this.onPreStart(obj);

        this._isRuning = true;
        this._videoSpeed = 800;
        this._timeStamp = Date.now();
        this._msgIdx = 0;
        this._videoTime = 0;

        // 开始之前先快进抓牌之前的所有消息
        // 前面的准备操作快放
        let message: GameIF.CustomMessage = null;
        for (var i: number = this._msgIdx; i < this._videoMsg.length; i++) {
            message = this.TryPacketMessage(this._videoMsg[i].chair, this._videoMsg[i].data);
            this._msgIdx = i + 1;
            if (cc.isValid(message)) {
                this.OnGameMessage(this._videoMsg[i].chair, message);
            }
            if (!this.CanSkipReplayMessage(message)) {
                break;
            }
        }

        //开始
        this.schedule(this._timerHandle, timeinvinterval);
    }

    private timerHandle() {
        if (this._isRuning && (this._msgIdx < this._videoMsg.length)) {
            if ((Date.now() - this._timeStamp) >= this._videoSpeed) {
                this._timeStamp = Date.now();
                // ++this._videoTime;
                this.onTimerTick();
                var startIdx: number = this._msgIdx;
                let message: GameIF.CustomMessage = null;
                message = this.TryPacketMessage(this._videoMsg[this._msgIdx].chair, this._videoMsg[this._msgIdx].data);

                if (message) {
                    this.OnGameMessage(this._videoMsg[this._msgIdx].chair, message);
                }

                this._msgIdx++;

                // for (var i: number = startIdx; i < this._videoMsg.length; i++) {
                // if (this._videoMsg[i].time < this._videoTime) {
                // this.TryPacketMessage(this._videoMsg[i].chair, this._videoMsg[i].data);
                // } else {
                //     this._msgIdx = i;
                //     break;
                // }
                // }
            }
        }
        return false;
    }

    /**
 * 此房间是否为自主建房
 * @returns {} 
 */
    public get isSelfCreateRoom(): boolean {
        if (this._roomInfo == null) {
            console.error("房间尚未初始化，请不要调用游戏参数");
            return false;
        }
        return this._roomInfo.RoomType === QL_Common.RoomType.MomentsGame;
    }

    /**
 * 发送消息
 * @param cm 
 * @returns {} 
 */
    protected SendData(cm: GameIF.CustomMessage) {

    }

    /**
 * 物理椅子号转换至逻辑椅子号,转换后自己永远是0，右边比自己大1，逆时针++
 * */
    public PhysicChair2LogicChair(chairID: number): number {
        return chairID >= this._chairID ? chairID - this._chairID : chairID + this._roomInfo.MaxCount - this._chairID;
    }

    public ExitGame(): boolean {

        this.node.destroy();
        //GameVideo.GameVideoCtrl.Instance.CloseVideo();
        return true;
    }



    /**
   * 播放声音
   * @param soundName 资源名称 xxx.res.config中的键
   * @param loops  播放次数，默认值是 1。 大于 0 为播放次数，如 1 为播放 1 次；小于等于 0，为循环播放
   * @param soundType 声音文件类型 默认是 egret.Sound.EFFECT，可修改为egret.Sound.MUSIC
   * @param startTime 开始时间 以秒为单位 默认值是 0
   * @returns {}
   */
    public PlaySound(path: string | cc.AudioClip, audiotype: AudioType = AudioType.Effect, loop: boolean = false): number {
        return Global.Instance.AudioManager.Play(path, audiotype, loop);
    }

    /**
     * 暂停
     * */
    public Pause(): void {
        if (this._isRuning) {
            this._isRuning = false;
            this.unschedule(this._timerHandle);
        }
    }

    /**
     * 恢复
     * */
    public Resume(): void {
        if (!this._isRuning) {
            this._isRuning = true;
            this.schedule(this._timerHandle, timeinvinterval);
        }
    }

    /**
     * 快进
     * */
    public Fastforward(): boolean {
        if (this._videoSpeed >= 400) {
            this._videoSpeed -= 200;
            return true;
        }
        return false;
    }

    /**
     * 恢复正常速度
     * */
    public ResumeNormalSpeed(): void {
        this._videoSpeed = 800;
    }

    private TryPacketMessage(chair: number, data: Array<number>): GameIF.CustomMessage {

        this._data.clear();
        this._data.WriteArray(data);
        this._data.Reset();

        var message = null;
        try {
            message = PacketCodecHandler.AppSerializerRecord(this._data);
        }
        catch (error) {
            message = null;
            console.log(error);
        }
        if (message == null) {
            return message;
        }

        cc.info('--- video msg : ', message);
        return message;
    }

    /**
     * 计时器
     * */
    protected onTimerTick(): void {

    };

    protected OnResetGameClass() {

    }

    protected DestryGameClass() {

    }

    protected OnInitClass() {

    }
    /**
* 预备开始
* */
    protected onPreStart(obj: any): void {

    }
    /**
     * 提供一个接口，让游戏来决定录像开局时消息的快进处理逻辑。
     * 游戏可以将游戏开始到抓牌开始之前的消息进行快放处理
     * @param message 对应解析的录像消息体信息
     */
    protected CanSkipReplayMessage(message: GameIF.CustomMessage): boolean {
        if (message && message.wSubCmdID != 105) {
            return true;
        }
        return false;
    }


    /**
     * 玩家坐下:自己坐下和自己坐下后又有新的玩家进入坐下,默认状态为SitDown状态,以防万一最好再处理一下状态
     * */
    protected OnPlayerSitDown(chairID: number, player: QL_Common.TablePlayer): void {

    }

    /**
     * 游戏消息
     * */
    protected OnGameMessage(sendChair: number, msg: GameIF.CustomMessage): void {

    }



}