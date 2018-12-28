
import { QL_Common } from "../../../CommonSrc/QL_Common";
import GameLogic from "./PDK_GameLogic";
import { GameIF } from "../../../CommonSrc/GameIF";

const { ccclass, property } = cc._decorator;
/**
 * 最大玩家人数
 */
export const MaxPlayerCount: number = 4;
/**
 * 最后一张牌索引
 */
export const LastCardIndex: number = 2;
/**
 * 牌宽
 */
export const CardWidth: number = 87.6;
/**
 * 牌高
 */
export const CardHeight: number = 114;
/**
 * 自己牌宽
 */
export const SelfCardWidth: number = 146;
/**
 * 自己牌高
 */
export const SelfCardHeight: number = 190;
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
export const TexturePath: string = "effect/gameres/M_PDK/Textrue";
/**
 * 公共资源路径
 */
export const CommonTexturePath: string = "gameres/gameCommonRes/Texture/";
/**
 * 预设体路径
 */
export const PrefabPath: string = "gameres/M_PDK/Prefabs/";
/**
 * 字体路径
 */
export const FontPath: string = "gameres/M_BiJi/Font/";
/**
 * 字体路径
 */
export const CommonFontPath: string = "gameres/gameCommonRes/Font/";
/**
 * 音频路径
 */
export const VoicePath: string = "resources/gameres/M_PDK/Voice/";
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
     * 结果
     */
    Result = 2
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
     * 要不起
     */
    Pass = -1,
    /**
     * 错误牌型
     */
    Error = 0,
    /**
     * 单张
     */
    One = 1,
    /**
     * 对子
     */
    Two = 2,
    /**
     * 三张
     */
    Three = 3,
    /**
     *三带一
     */
    ThreeAndOne = 4,
    /**
     * 三带二
     */
    ThreeAndTwo = 5,
    /**
     * 顺子
     */
    ShunZi = 6,
    /**
     * 连对
     */
    lianDui = 7,
    /**
     * 飞机
     */
    Plane = 8,
    /**
     * 四带二
     */
    FourAndTwo = 9,
    /**
     * 炸弹
     */
    Bomb = 10,
    /**
     * 春天
     */
    chuantian = 20,
    /**
     * 包赔
     */
    baopei = 30


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
     * 出牌
     */
    OutCards = 1,
    /**
     * 局数中间状态
     */
    Interval = 2
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

export class GameRule{

    public SetGameNum:number;
    
    public zhuaNiaoScore:number;
    public mustOut:number;
    public have2OutA:boolean;


    public spadesRedPeach3:number;
    public spades3MustOut:boolean;
    public redPeach3MustOut:boolean;


    public bomb:boolean;
    public FZBP:boolean;
    public SZTW:boolean;
    public firstSpades3Out:boolean;
    public threeAIsBomb:boolean;
    public showRemainNum:boolean;
    public ifcansameip:boolean;
    public checkGps:boolean;
    public PeopleNum:number;

    
    public extendBet:number;
    
    public gameModel:number;
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
    

    public constructor() {
        this.Init();
    }
    public Init() {
        this.forceLeftMoney = 0;
        this.forceLeftMoneyType = QL_Common.CurrencyType.Gold;
        this.checkIP = false;
        this.Reset();
    }
    public Reset() {
        this.roomType = RoomType.Matching;
        this.tableCostType = TableCostType.Free;
        this.tableCostNum = 0;
        this.joinMoney = 0;
        this.selfScore = 0;
    }

    public SetRoomType(value: RoomType) { this.roomType = value; }
    public SetTableCostType(value: TableCostType) { this.tableCostType = value; }
    public SetTableCostNum(value: number) { this.tableCostNum = value; }
    public SetTableCreator(value: number) { this.tableCreator = value; }
    public SetMoneyType(value: QL_Common.CurrencyType) { this.moneyType = value; }
    public SetJoinMoney(value: number) { this.joinMoney = value; }
    public SetSelfScore(value: number) { this.selfScore = value; }
    public AddSelfScore(value: number) { this.selfScore += value; }
    public SetForceLeftMoney(value: number) { this.forceLeftMoney = value; }
    public SetForceLeftMoneyType(value: QL_Common.CurrencyType) { this.forceLeftMoneyType = value; }
    public SetCheckIP(value: boolean) { this.checkIP = value; }

    public IsSelfCreateTable() { return this.roomType != RoomType.Matching && this.tableCreator == 0 ? true : false; }
}
/**
 * 游戏信息
 */
export class GameInfo {

    /**
     * 玩家人数
     */
    public PlayerCount: number = 4;
    /**
     * 牌数
     */
    public CardsCount: number = 9;
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
    /**
     * 最后出牌的玩家
     */
    public lastOutCardChair:number = -1;
    /**
     * 最后出牌的玩家打出的牌
     */
    public lastOutCards: number[] = [];
    /**
     * 最后出牌的玩家打出的牌型
     */
    public lastOutCardType:CardType = CardType.Error;
     /**
     * 下一个出牌的玩家
     */
    public nextOutCardChair:number = -1;
    /**
     * 先出的牌的牌值
     */
    public firstOutValue: number = 0;
    /**
     * 创建房间时的最大局数
     */
    public startNum: number = 0;


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
        this.lastOutCardType = CardType.Error;
        this.lastOutCards = [];
        this.hasForceLeft = false;
        this.lastOutCardChair = -1;
        this.nextOutCardChair = -1;
        this.rubCardValue = 0;
        this.firstOutValue = 0;
    }

    public SetIsGaming(value: boolean) { this.isGaming = value; }
    public SetPlayerCount(value: number) { this.PlayerCount = value; }
    public SetCardsCount(value: number) { this.CardsCount = value; }
    public SetIsTrueReady(value: boolean) { this.isTrueReady = value; }
    public SetGameCount(value: number[]) { this.gameCount = value; }
    public SetCardType(value: CardType) { this.lastOutCardType = value; }
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
     * 当前局数+1
     */
    public AddCurCount() {
        this.gameCount[0] +=1;
    }
    /**
     * 是否局数打完或者解散房间
     */
    public IsEnd() {
        return this.GetLastGameCount() <= 0 || this.isDissolveTable;
    }
    
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
 * 计分板数字元素
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
 * 计分板字符串元素
 */
export class ScoreStrEle {
    /**
     * 一条玩家计分数据
     */
    public data: string[];

    public constructor(value: string[]) {
        this.data = new Array(value.length);
        for (var i = 0; i < value.length; i++) {
            this.data[i] = value[i];
        }
    }
}
/**
 * 计分板布尔元素
 */
export class ScoreboolEle {
    /**
     * 一条玩家计分数据
     */
    public data: boolean[];

    public constructor(value: boolean[]) {
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
    public datalist:ScoreEle[];
    /**
     * 炸弹数据
     */
    public bomblist:ScoreEle[];
    /**
     * 抓鸟数据
     */
    public zhuaNiaolist:ScoreEle[];
    /**
     * 被焖锅数据
     */
    public beiMenGuolist:ScoreEle[];
    /**
     * 剩牌数据
     */
    public haveCardlist:ScoreEle[];
    /**
     * 剩牌数据
     */
    public baoPeilist:ScoreboolEle[];
    /**
     * 剩牌数据
     */
    public RoundScoreInfolist:ScoreStrEle[];
    /**
     * 胜负数据
     */
    public isWinList:ScoreEle[];
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
        this.datalist = new Array(0);
        this.bomblist = new Array(0);
        this.zhuaNiaolist = new Array(0);
        this.beiMenGuolist = new Array(0);
        this.haveCardlist = new Array(0);
        this.RoundScoreInfolist = new Array(0);
        this.baoPeilist = new Array(0);
        this.isWinList = new Array(0);
        this.gameNum = gNum;
    }

}

