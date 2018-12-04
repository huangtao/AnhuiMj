
import { QL_Common } from "../../../CommonSrc/QL_Common";
import GameLogic from "./GameLogic";
import { GameIF } from "../../../CommonSrc/GameIF";

const { ccclass, property } = cc._decorator;

/**
 * 玩家人数
 */
export const PlayerCount: number = 6;
/**
 * 牌数
 */
export const CardsCount: number = 5;
/**
 * 最后一张牌索引
 */
export const LastCardIndex: number = 4;
/**
 * 选牌数
 */
export const SelectCardsCount: number = 3;
/**
 * 牌宽
 */
export const CardWidth: number = 77;
/**
 * 牌高
 */
export const CardHeight: number = 99;
/**
 * 自己牌宽
 */
export const SelfCardWidth: number = 108;
/**
 * 自己牌高
 */
export const SelfCardHeight: number = 141.6;
/**
 * 舞台宽度
 */
export const StageWidth: number = 1280;
/**
 * 舞台高度
 */
export const StageHeight: number = 720;
/**
 * 资源路径
 */
export const TexturePath: string = "gameres/M_NiuNiu/Texture/";
/**
 * 公共资源路径
 */
export const CommonTexturePath: string = "gameres/gameCommonRes/Texture/";
/**
 * 预设体路径
 */
export const PrefabPath: string = "gameres/M_NiuNiu/Prefabs/";
/**
 * 字体路径
 */
export const FontPath: string = "gameres/M_NiuNiu/Font/";
/**
 * 字体路径
 */
export const CommonFontPath: string = "gameres/gameCommonRes/Font/";
/**
 * 音频路径
 */
export const VoicePath: string = "resources/gameres/M_NiuNiu/Voice/";
/**
 * 公共音频路径
 */
export const CommonVoicePath: string = "resources/gameres/gameCommonRes/Voice/";
/**
 * 场地类型
 */
export enum RoomType {
    /**
     * 自由匹配
     */
    Matching = 0,
    /**
     * 金币场
     */
    GoldRoom = 1,
    /**
     * 计分场
     */
    ScoreRoom = 2
}
/**
 * 桌费类型
 */
export enum TableCostType {
    /**
     * 免费
     */
    Free = 0,
    /**
     * 房主付费
     */
    TableCreatorPay = 2,
    /**
     * AA制
     */
    AAPay = 1,
    /**
     * 群主付费
     */
    GroupOwnerPay = 3,
}
/**
 * 游戏阶段
 */
export enum GameStage {
    /**
     * 空闲
     */
    Free = 0,
    /**
     * 游戏开始
     */
    GameStart = 1,
    /**
     * 下注
     */
    Bet = 2,
    /**
     * 选牌
     */
    SelectCards = 3,
    /**
     * 结果
     */
    Result = 4
}
/**
 * 开局庄家模式
 */
export enum StartMasterModel {
    /**
     * 房主当庄
     */
    TableOwner = 0,
    /**
     * 随机庄家
     */
    RandomMaster = 1,
}
/**
 * 游戏模式
 */
export enum GameModel {
    /**
     * 随机庄
     */
    RandomMaster = 0,
    /**
     * 抢庄
     */
    RobMaster = 1,
    /**
     * 轮流坐庄
     */
    TurnsMaster = 2,
    /**
     * 无牛下庄
     */
    NoNiuNoMaster = 3,
    /**
     * 牛9换庄
     */
    Niu9ChangeMaster = 4,
    /**
     * 不换庄
     */
    NotChangeMaster = 5,
}
/**
 * 推注类型
 */
export enum ExtendBetType {
    /**
     * 不显示
     */
    NotShow = 0,
    /**
     * 启用
     */
    Enable = 1,
    /**
     * 禁用
     */
    Disable = 2,
}
/**
 * 搓牌类型
 */
export enum RubCardType {
    /**
     * 不显示
     */
    NotShow = 0,
    /**
     * 启用
     */
    Enable = 1,
    /**
     * 禁用
     */
    Disable = 2,
}
/**
 * 牌型模式
 */
export enum CardTypeModel {
    /**
     * 顺子
     */
    Junko = 0,
    /**
     * 三带二
     */
    Gourd = 1,
    /**
     * 五花牛
     */
    FiveBig = 2,
    /**
     * 炸弹
     */
    Bomb = 3,
    /**
     * 五小牛
     */
    FiveSmall = 4,
}
/**
 * 玩家状态
 */
export enum UserState {
    /**
     * 没人
     */
    None = 0,
    /**
     * 空闲
     */
    Free = 1,
    /**
     * 准备
     */
    Ready = 2,
    /**
     * 游戏中
     */
    Game = 3,
    /**
     * 断线
     */
    Offline = 4,
    /**
     * 观战
     */
    Look = 5
}
/**
 * 牌型
 */
export enum CardType {
    /**
     * 散牌
     */
    HighCard = 0,
    /**
     * 牛一
     */
    Niu1 = 1,
    /**
     * 牛二
     */
    Niu2 = 2,
    /**
     * 牛三
     */
    Niu3 = 3,
    /**
     * 牛四
     */
    Niu4 = 4,
    /**
     * 牛五
     */
    Niu5 = 5,
    /**
     * 牛六
     */
    Niu6 = 6,
    /**
     * 牛七
     */
    Niu7 = 7,
    /**
     * 牛八
     */
    Niu8 = 8,
    /**
     * 牛九
     */
    Niu9 = 9,
    /**
     * 牛牛
     */
    NiuNiu = 10,
    /**
     * 顺子
     */
    Junko = 11,
    /**
     * 三带二
     */
    Gourd = 12,
    /**
     * 五花牛
     */
    FiveBig = 13,
    /**
     * 炸弹
     */
    Bomb = 14,
    /**
     * 五小牛
     */
    FiveSmall = 15,
}
/**
 * 倒计时标识
 */
export enum TimeFlag {
    /**
     * 等待开始
     */
    WaitStart = 0,
    /**
     * 抢庄
     */
    RobMaster = 1,
    /**
     * 下注
     */
    Bet = 2,
    /**
     * 选牌
     */
    SelectCards = 3,
    /**
     * 单单显示的计时器
     */
    OnlyShow = 4,
    /**
     * 局数中间状态
     */
    Interval = 5
}
/**
 * 倒计时的值
 */
export class TimerValue {
    /**
     * 等待游戏开始
     */
    public static WaitStart: number = 20;
    /**
     * 玩家抢庄
     */
    public static RobMaster: number = 8;
    /**
     * 玩家下注
     */
    public static Bet: number = 8;
    /**
     * 等待选牌
     */
    public static SelectCards: number = 10;//4;
    /**
     * 局数中间状态
     */
    public static Interval: number = 5;
}
/**
 * 计分板元素
 */
export class ScoreEle {
    /**
     * 一条玩家计分数据
     */
    public data: number[];

    public constructor(value: number[]) {
        this.data = new Array(value.length);
        for (var i = 0; i < value.length; i++) {
            this.data[i] = value[i];
        }
    }
}
/**
 * 计分板
 */
export class ScoreView {
    /**
     * 座位号列表
     */
    public chairlist: number[];
    /**
     * ID列表
     */
    public IDlist: number[];
    /**
     * 昵称列表
     */
    public namelist: string[];
    /**
     * 头像列表
     */
    public facelist: string[];
    /**
     * 计分数据
     */
    public scorelist: ScoreEle[];
    /**
     * 局号
     */
    public gameNum: string;

    public constructor(clist: number[], _IDlist: number[], nlist: string[], flist: string[], gNum: string = "") {
        this.chairlist = new Array(clist.length);
        this.IDlist = new Array(_IDlist.length);
        this.namelist = new Array(nlist.length);
        this.facelist = new Array(flist.length);
        GameLogic.CopyArray(this.chairlist, clist, clist.length);
        GameLogic.CopyArray(this.IDlist, _IDlist, _IDlist.length);
        GameLogic.CopyStr(this.namelist, nlist, nlist.length);
        GameLogic.CopyStr(this.facelist, flist, flist.length);
        this.scorelist = new Array(0);
        this.gameNum = gNum;
    }
    /**
     * 增加一条玩家数据
     */
    public AddScoreEle(value: ScoreEle) {
        this.scorelist.push(value);
    }
}
export class GameRule{

public SetGameNum:number;

public cellScore:number;

public checkIP:boolean;

public extendBet:boolean;

public gameModel:number;

public startMasterModel:boolean;

public isValid:boolean;

public rubCard:boolean;

public tableCreatorPay:number;


}
/**
 * 桌子信息
 */
export class TableInfo {
    /**
     * 场地类型
     */
    public roomType: RoomType;
    /**
     * 桌费类型
     */
    public tableCostType: TableCostType;
    /**
     * 桌费
     */
    public tableCostNum: number;
    /**
     * 游戏模式
     */
    public gameModel: GameModel;
    /**
     * 开局庄家模式
     */
    public startMasterModel: StartMasterModel;
    /**
     * 牌型模式
     */
    public cardTypeModel: CardTypeModel[] = [];
    /**
     * 房主
     */
    public tableCreator: number;
    /**
     * 币种类型
     */
    public moneyType: QL_Common.CurrencyType;
    /**
     * 准入金额
     */
    public joinMoney: number;
    /**
     * 自己的积分，根据场地币种类型可能是金币
     */
    public selfScore: number;
    /**
     * 强退扣费金额
     */
    public forceLeftMoney: number;
    /**
     * 强退扣费币种
     */
    public forceLeftMoneyType: QL_Common.CurrencyType;
    /**
     * 是否检查IP
     */
    public checkIP: boolean;
    /**
     * 是否允许推注
     */
    public extendBet: ExtendBetType;
    /**
     * 是否允许搓牌
     */
    public rubCard: RubCardType;

    public constructor() {
        this.Init();
    }
    public Init() {
        this.forceLeftMoney = 0;
        this.forceLeftMoneyType = QL_Common.CurrencyType.Gold;
        this.checkIP = false;
        this.extendBet = ExtendBetType.NotShow;
        this.rubCard = RubCardType.NotShow;
        this.Reset();
    }
    public Reset() {
        this.roomType = RoomType.Matching;
        this.tableCostType = TableCostType.Free;
        this.tableCostNum = 0;
        this.gameModel = GameModel.RandomMaster;
        this.startMasterModel = StartMasterModel.RandomMaster;
        this.cardTypeModel.length = 0;
        this.tableCreator = -1;
        this.joinMoney = 0;
        this.selfScore = 0;
    }

    public SetRoomType(value: RoomType) { this.roomType = value; }
    public SetTableCostType(value: TableCostType) { this.tableCostType = value; }
    public SetTableCostNum(value: number) { this.tableCostNum = value; }
    public SetGameModel(value: GameModel) { this.gameModel = value; }
    public SetStartMasterModel(value: StartMasterModel) { this.startMasterModel = value; }
    public SetCardTypeModel(value: number[]) {
        this.cardTypeModel = new Array(value.length);
        for (let i = 0; i < value.length; i++) {
            this.cardTypeModel[i] = <CardTypeModel>value[i];
        }
    }
    public SetTableCreator(value: number) { this.tableCreator = value; }
    public SetMoneyType(value: QL_Common.CurrencyType) { this.moneyType = value; }
    public SetJoinMoney(value: number) { this.joinMoney = value; }
    public SetSelfScore(value: number) { this.selfScore = value; }
    public AddSelfScore(value: number) { this.selfScore += value; }
    public SetForceLeftMoney(value: number) { this.forceLeftMoney = value; }
    public SetForceLeftMoneyType(value: QL_Common.CurrencyType) { this.forceLeftMoneyType = value; }
    public SetCheckIP(value: boolean) { this.checkIP = value; }
    public SetExtendBet(value: number) { this.extendBet = <ExtendBetType>value; }
    public SetRubCard(value: number) { this.rubCard = <RubCardType>value; }

    public IsSelfCreateTable() { return this.roomType != RoomType.Matching && this.tableCreator == 0 ? true : false; }
    public IsRubCardEnable() { return this.rubCard == RubCardType.Enable; }
}
export class GameInfo {
    /**
     * 是否正在游戏中
     */
    public isGaming: boolean;
    /**
     * true表示真实的准备,false表示局数中间游戏模拟的准备
     */
    public isTrueReady: boolean;
    /**
     * 局数
     */
    public gameCount: number[];
    /**
     * 牌型
     */
    public cardType: CardType;
    /**
     * 选牌提示索引
     */
    public bestSelectIndex: number[];
    /**
     * 庄座位号
     */
    public master: number;
    /**
     * 等待充值
     */
    public waitPay: boolean;
    /**
     * 房间创建等待时间
     */
    public tableCreateWaitTime: number;
    /**
     * 是否是真实结束
     */
    public isTrueOver: boolean;
    /**
     * 是否弹退出询问
     */
    public showExitAsk: boolean;
    /**
     * 是否已经强退过
     */
    public hasForceLeft: boolean;
    /**
     * 是否解散房间
     */
    public isDissolveTable: boolean;
    /**
     * 搓牌值
     */
    public rubCardValue: number;
    /**
     * 房主等待离开房间
     */
    public tableOwnerWaitExit: boolean = false;

    public constructor() {
        this.Init();
    }
    public Init() {
        this.isTrueReady = true;
        this.isTrueOver = true;
        this.master = -1;
        this.waitPay = false;
        this.tableCreateWaitTime = 10;
        this.gameCount = new Array(0, 1);
        this.showExitAsk = false;
        this.isDissolveTable = false;
        this.Reset();
    }
    public Reset() {
        this.isGaming = false;
        this.cardType = CardType.HighCard;
        this.hasForceLeft = false;
        this.rubCardValue = 0;
    }

    public SetIsGaming(value: boolean) { this.isGaming = value; }
    public SetIsTrueReady(value: boolean) { this.isTrueReady = value; }
    public SetGameCount(value: number[]) { this.gameCount = value; }
    public SetCardType(value: CardType) { this.cardType = value; }
    public SetBestSelectIndex(value: number[]) { this.bestSelectIndex = value; }
    public SetMaster(value: number) { this.master = value; }
    public SetWaitPay(value: boolean) { this.waitPay = value; }
    public SetTableCreateWaitTime(value: number) { this.tableCreateWaitTime = value; }
    public SetIsTrueOver(value: boolean) { this.isTrueOver = value; }
    public SetShowExitAsk(value: boolean) { this.showExitAsk = value; }
    public SetTableOwnerWaitExit(value: boolean) { this.tableOwnerWaitExit = value; }
    public SetHasForceLeft(value: boolean) { this.hasForceLeft = value; }
    public SetIsDissolveTable(value: boolean) { this.isDissolveTable = value; }
    public SetRubCardValue(value: number) { this.rubCardValue = value; }

    /**
     * 获取剩余局数
     */
    public GetLastGameCount() {
        var value = this.gameCount[1] - this.gameCount[0];
        return value >= 0 ? value : 0;
    }
    /**
     * 获取总局数
     */
    public GetAllGameCount() {
        return this.gameCount[1];
    }
    /**
     * 获取当前局数
     */
    public GetCurGameCount(){
        return this.gameCount[0];
    }
    /**
     * 是否局数打完或者解散房间
     */
    public IsEnd() {
        return this.GetLastGameCount() <= 0 || this.isDissolveTable;
    }
}
/**
 * 计分板数据
 */
export class SkinQueryScoreParam {
    public constructor(value1: ScoreView, value2: boolean = false, value3: number[]) {
        this.scoreview = value1;
        this.isExit = value2;
        this.gameCount = value3;
    }
    public scoreview: ScoreView;
    public isExit: boolean = false;
    public gameCount: number[];
}
/**
 * 解散房间数据
 */
export class SkinDissolveTableParam {
    public constructor(value1: GameIF.CustomMessage) {
        this.msg = value1;
    }
    public msg: GameIF.CustomMessage;
}
/**
 * 总计数据
 */
export class TotalScoreData {
    public constructor(_scoreView: ScoreView, _selfID: number) {
        this.scoreView = _scoreView;
        this.selfID = _selfID;
    }
    public scoreView: ScoreView;
    public selfID: number;
}
/**
 * 桌费配置
 */
export class TableCostConfig {
    public constructor() {
        this.gameCount = new Array();
        this.tableCost = new Array();
    }
    public Add(_gameCount: number, _tableCost: number) {
        this.gameCount.push(_gameCount);
        this.tableCost.push(_tableCost);
    }
    public gameCount: number[];
    public tableCost: number[];
}