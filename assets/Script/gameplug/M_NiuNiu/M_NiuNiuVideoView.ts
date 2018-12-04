const { ccclass, property } = cc._decorator;

import { INiuNiuView, NiuNiu } from "./GameHelp/INiuNiuClass";
import { ScoreView, TableInfo, GameInfo, TimeFlag, RoomType, TableCostType, PlayerCount, TimerValue, GameModel, GameStage, ScoreEle, CardType, SelectCardsCount, SkinQueryScoreParam, SkinDissolveTableParam, StartMasterModel, CardTypeModel, PrefabPath, TotalScoreData } from "./GameHelp/GameHelp";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { GameIF } from "../../CommonSrc/GameIF";
import M_NiuNiuVideoClass from "./M_NiuNiuVideoClass";
import SkinPlayerControl from "./SkinView/SkinPlayerControl";
import { M_NiuNiu_GameMessage } from "../../CommonSrc/M_NiuNiu_GameMessage";
import SkinLabelView from "./SkinView/SkinLabelView";
import SkinButtonView from "./SkinView/SkinButtonView";
import SkinClock from "./SkinView/SkinClock";
import SkinCountDown from "./SkinView/SkinCountDown";
import SkinCountCard from "./SkinView/SkinCountCard";
import { SetNodeChildrenOrder, ShowNodeView } from "./GameHelp/NiuNiuFunction";
import SkinGameHelp from "./SkinView/SkinGameHelp";
import SkinQueryScore from "./SkinView/SkinQueryScore";
import SkinDissolveTable from "./SkinView/SkinDissolveTable";
import SkinTiren from "./SkinView/SkinTiren";
import SkinRecordVideo from "./SkinView/SkinRecordVideo";
import SkinPlayerInfo from "./SkinView/SkinPlayerInfo";
import { TranslateMoneyTypeName } from "../../Tools/Function";
import VoicePlayer from "./GameHelp/VoicePlayer";
import { AudioType } from "../../CustomType/Enum";
import GameLogic from "./GameHelp/GameLogic";
import SkinVideoCtrl from "./SkinView/SkinVideoCtrl";
import PokerCardsRes from "./GameHelp/PokerCardsRes";
import SkinTotalScore from "./SkinView/SkinTotalScore";

@ccclass
export default class M_NiuNiuVideoView extends cc.Component implements INiuNiuView {
    private static _instance: M_NiuNiuVideoView;
    public static get Instance(): M_NiuNiuVideoView { return this._instance; }
    public get skingameClass(): M_NiuNiuVideoClass { return M_NiuNiuVideoClass.Instance; }
    //控件
    @property(cc.Node)
    private group_bg: cc.Node = null;
    @property(cc.Prefab)
    prefab_palyercontrol: cc.Prefab = null;
    private skinPlayerControl: SkinPlayerControl;
    @property(cc.Prefab)
    prefab_labelView: cc.Prefab = null;
    private skinLabelView: SkinLabelView;
    @property(cc.Prefab)
    prefab_buttonView: cc.Prefab = null;
    private skinButtonView: SkinButtonView;
    @property(cc.Prefab)
    prefab_clock: cc.Prefab = null;
    private skinClock: SkinClock;
    @property(cc.Prefab)
    prefab_countCard: cc.Prefab = null;
    private skinCountCard: SkinCountCard;
    @property(cc.Prefab)
    prefab_countDown: cc.Prefab = null;
    private skinCountDown: SkinCountDown;
    private skinGameHelp: SkinGameHelp;
    private skinQueryScore: SkinQueryScore;
    private skinTotalScore: SkinTotalScore;
    private skinDissolveTable: SkinDissolveTable;
    private skinTiren: SkinTiren;
    private skinRecordVideo: SkinRecordVideo;
    private skinPlayerInfo: SkinPlayerInfo;
    @property(cc.Prefab)
    prefab_videoCtrl: cc.Prefab = null;
    private skinVideoCtrl: SkinVideoCtrl;
    //变量
    private scoreView: ScoreView;
    private tableInfo: TableInfo;
    private gameInfo: GameInfo;
    public GameModel() { return this.tableInfo.gameModel; }
    public Master() { return this.gameInfo.master; }

    onLoad() {
        M_NiuNiuVideoView._instance = this;
        NiuNiu.ins.iview = this;
        this.tableInfo = new TableInfo();
        this.gameInfo = new GameInfo();
        this.scoreView = null;
        this.group_bg.on(cc.Node.EventType.TOUCH_START, this.OnButtonBg, this);
        SetNodeChildrenOrder(this.node);
        var orderIndex = this.node.childrenCount;//1
        this.skinLabelView = this.AddPrefab(this.prefab_labelView, "SkinLabelView", orderIndex++);//2
        this.skinPlayerControl = this.AddPrefab(this.prefab_palyercontrol, "SkinPlayerControl", orderIndex++);//3
        this.skinButtonView = this.AddPrefab(this.prefab_buttonView, "SkinButtonView", orderIndex++);//5
        this.skinClock = this.AddPrefab(this.prefab_clock, "SkinClock", orderIndex++);//6
        this.skinCountCard = this.AddPrefab(this.prefab_countCard, "SkinCountCard", orderIndex++);//7
        this.skinCountDown = this.AddPrefab(this.prefab_countDown, "SkinCountDown", orderIndex++);//8
        //SkinTiren:11
        //SkinPlayerInfo:12
        //SkinRecordVideo:13
        //SkinGameHelp:14
        //SkinTotalScore:15
        //SkinQueryScore:16
        //skinDissolveTable:17

        this.skinVideoCtrl = this.AddPrefab(this.prefab_videoCtrl, "SkinVideoCtrl", 20);//20
    }
    /**
     * 添加预设体到this节点下
     */
    private AddPrefab(prefab: cc.Prefab, className: string, zOrder: number) {
        let com = cc.instantiate(prefab).getComponent(className);
        this.node.addChild(com.node, zOrder);
        return com;
    }
    //
    //==================================== 基类可重写 开始 =======================================
    //
    /**
     * 初始化游戏视图,皮肤已经加载完成,在这里可以访问皮肤里的组件，也可以访问gameClass中的成员
     * */
    public InitGameView(): void {
        console.log("InitGameView");
        this.Init();
    }
    /**
     * 销毁游戏视图,游戏需要移除所有子元素
     * */
    public DestroyGameCiew(): void {
    }
    //
    //==================================== 基类可重写 结束 =======================================
    //

    //==================================== 常用 开始 =======================================
    /**
     * 初始化
     */
    private Init() {
        this.tableInfo.Init();
        this.gameInfo.Init();
        this.scoreView = null;
        this.skinButtonView.Init();
        this.skinClock.Init();
        this.skinCountCard.Init();
        this.skinCountDown.Init();
        if (this.skinDissolveTable != undefined)
            this.skinDissolveTable.Init();
        this.skinLabelView.Init();
        this.skinPlayerControl.Init();
        this.skinPlayerControl.SetPlayerTransForm(this.skingameClass.isSelfCreateRoom);
    }
    /**
     * 重置
     **/
    public Reset(): void {
        this.gameInfo.Reset();
        this.skinCountCard.Reset();
        this.gameInfo.SetIsGaming(false);
        this.skinLabelView.SetGameCount(this.gameInfo.gameCount);
        this.skinPlayerControl.Reset();
    }
    /**
     * 清理
     */
    public Clear() {
        this.skinPlayerControl.StopAni(GameStage.Free);
        this.skinButtonView.HideReady();
        this.skinPlayerControl.SelfReadyClear();
    }
    //==================================== 常用 结束 =======================================

    //==================================== 来自Class的消息 开始 =======================================
    /**
     * 设置玩家信息
     */
    public SetUserInfo(chair: number, faceID: string, name: string, gender: number): void {
        console.log("chair:" + chair + ",name:" + name + ",faceID:" + faceID + ",gender:" + gender);
        this.skinPlayerControl.SetUserInfo(chair, faceID, name, gender);
    }
    /**
     * 设置玩家状态
     */
    public SetUserState(chair: number, state: QL_Common.GState) {
        this.skinPlayerControl.SetUserState(chair, state);
    }
    /**
     * 设置玩家离开
     */
    public SetUserLeave(chair: number) {
        this.skinPlayerControl.SetUserLeave(chair);
    }
    /**
     * 显示文字聊天
     */
    public ShowChat(chair: number, value: string) {
    }
    /**
     * 显示聊天表情
     */
    public ShowChatEmoji(chair: number, value: cc.AnimationClip) {
        this.skinPlayerControl.ShowChatEmoji(chair, value);
    }
    /**
     * 显示语言聊天
     */
    public StartVoicePlay(chair: number) {
    }
    /**
     * 关闭语音聊天显示
     */
    public StopVoicePlay(chair: number) {
    }
    public ShowWanfa(){
        return;
    }
    /**
     * 余额更新
     */
    public RefreshMoney() {
        if (this.gameInfo.waitPay) {
            this.gameInfo.SetWaitPay(false);
        }
    }
    //==================================== 来自Class的消息 结束 =======================================

    //==================================== 接收消息 开始 =======================================
    /**
     * 特殊属性
     */
    public Rec_Attribute(msg: GameIF.CustomMessage) {
        if (this.gameInfo.isGaming) {
            return;
        }
        var data = <M_NiuNiu_GameMessage.CMD_S_Attribute>msg;
        this.skinLabelView.SetCellScore(data.cellScore, this.skingameClass.IsCreateTable());
        this.skinLabelView.SetMoneyType(data.moneyType);
        this.skinLabelView.SetGameCount(data.gameCount);
        this.gameInfo.SetGameCount(data.gameCount);
        this.tableInfo.SetMoneyType(data.moneyType);
        this.tableInfo.SetJoinMoney(data.joinMoney);
        this.gameInfo.SetTableCreateWaitTime(data.tableCreateWaitTime);
        this.tableInfo.SetRoomType(<RoomType>data.roomType);
        this.tableInfo.SetTableCostType(<TableCostType>data.tableCostType);
        this.tableInfo.SetGameModel(data.gameModel);
        this.tableInfo.SetStartMasterModel(data.startMasterModel);
        this.tableInfo.SetCardTypeModel(data.cardTypeModel);
        this.tableInfo.SetTableCostNum(data.tableCostNum);
        this.tableInfo.SetCheckIP(data.checkIP);
        this.tableInfo.SetExtendBet(data.extendBet);
        //this.skinButtonView.SetGameModel(data.gameModel);
        this.skinButtonView.SetForBetRate(data.forBetRate);
        if (this.skingameClass.GetSelfState() != QL_Common.GState.Gaming)
            this.skinButtonView.ShowReady();
        if (this.skingameClass.IsCreateTable()) {
            if (data.tableCreator >= 0 && data.tableCreator < PlayerCount) {
                this.tableInfo.SetTableCreator(this.skingameClass.GetClientChair(data.tableCreator));
                this.skinPlayerControl.SetTableCreator(this.tableInfo.tableCreator);
            }
            this.skinButtonView.btn_queryscore.node.active = true;
            this.skinButtonView.btn_voice.node.active = true;
            if (this.skingameClass.GetSelfState() != QL_Common.GState.Gaming)
                this.skinButtonView.SetTirenButton(this.tableInfo.IsSelfCreateTable());
        }
        const tableCostName = this.tableInfo.tableCostType == TableCostType.GroupOwnerPay ? "钻石" : TranslateMoneyTypeName(this.skingameClass.RoomClient.TableCostMoneyType);
        this.skinLabelView.SetTableNum(data.tableID);//显示桌子号
        try {
            this.skinButtonView.SetGameRule(this.skingameClass.isSelfCreateRoom, data.cellScore, this.GetTableCostType(), this.GetGameCount(), data.tableCostNum,
                tableCostName, this.GetGameModel(), data.checkIP, this.GetStartMasterModel(), this.GetCardTypeModel(), data.extendBet, data.rubCard);
        } catch (error) {
            console.log("旧的录像文件");
        }
    }
    /**
     * 游戏开始
     * aniFinish：当动画完成时会将CMD_S_GameStart消息再次传入这里，此aniFinish即标识是否动画完成
     */
    public Rec_GameStart(msg: GameIF.CustomMessage, aniFinish: boolean = false) {
        var data = <M_NiuNiu_GameMessage.CMD_S_GameStart>msg;
        console.log("--------Rec_GameStart:" + aniFinish);
        this.gameInfo.SetIsTrueOver(false);
        if (aniFinish) {
            this.skinPlayerControl.SetCards(0, data.cards);
            this.SetOtherCards(data.cards.length);
            if (this.tableInfo.gameModel != GameModel.RobMaster) {
                this.skinPlayerControl.SetUserMaster(this.gameInfo.master);
                if (this.skinPlayerControl.IsSelfJoinGame()) {
                    if (this.gameInfo.master == 0) {
                        this.RegTimer(TimeFlag.OnlyShow, true, TimerValue.Bet, "请等待其他玩家下注：");
                    }
                    else {
                        this.RegTimer(TimeFlag.Bet);
                        this.skinButtonView.ShowBet(data.extendBet);
                    }
                }
            }
            else {
                if (this.skinPlayerControl.IsSelfJoinGame()) {
                    this.RegTimer(TimeFlag.RobMaster);
                    this.skinButtonView.ShowRob();
                }
            }
        }
        else {
            this.skinPlayerControl.StopAni(GameStage.Free);
            this.Clear();
            this.skinCountCard.Reset();
            this.DestroyTimer();
            this.skinPlayerControl.GameStartClear();
            this.gameInfo.SetIsGaming(true);
            this.skinButtonView.SetMulGameButton(this.skingameClass.isSelfCreateRoom);
            this.skinButtonView.HideReady();
            this.skinButtonView.HideTiRen();
            if (this.tableInfo.gameModel != GameModel.RobMaster) {
                var master = this.skingameClass.GetClientChair(data.master);
                this.gameInfo.SetMaster(master);
                this.skinPlayerControl.HideAllUserFrame();
            }
            this.skinPlayerControl.AniDeal(data);
        }
    }
    /**
     * 抢庄
     */
    public Rec_RobMaster(msg: GameIF.CustomMessage) {
        var data = <M_NiuNiu_GameMessage.CMD_C_RobMaster>msg;
        var chair = this.skingameClass.GetClientChair(data.chair);
        this.skinPlayerControl.SetUserRobRate(chair, data.robMasterRate);
        if (chair == 0) {
            this.DestroyTimer();
            this.skinButtonView.HideRob();
        }
        VoicePlayer.PlayPublicSound("btdp_check");
    }
    /**
     * 下注开始
     */
    public Rec_BetStart(msg: GameIF.CustomMessage, aniFinish: boolean = false) {
        var data = <M_NiuNiu_GameMessage.CMD_S_BetStart>msg;
        console.log("--------Rec_BetStart:" + aniFinish);
        if (aniFinish) {
            this.skinPlayerControl.SetUserMaster(this.gameInfo.master);
            if (this.skinPlayerControl.IsSelfJoinGame()) {
                if (this.gameInfo.master == 0) {
                    this.RegTimer(TimeFlag.OnlyShow, true, TimerValue.Bet, "请等待其他玩家下注：");
                }
                else {
                    this.RegTimer(TimeFlag.Bet);
                    this.skinButtonView.ShowBet(data.extendBet);
                }
            }
        }
        else {
            this.skinPlayerControl.StopAni(GameStage.Bet);
            this.DestroyTimer();
            this.HideButton(0);
            var master = this.skingameClass.GetClientChair(data.master);
            this.gameInfo.SetMaster(master);
            this.skinPlayerControl.AniMaster(data);
        }
    }
    /**
     * 下注
     */
    public Rec_Bet(msg: GameIF.CustomMessage) {
        var data = <M_NiuNiu_GameMessage.CMD_C_Bet>msg;
        var chair = this.skingameClass.GetClientChair(data.chair);
        this.skinPlayerControl.SetUserBetRate(chair, data.betRate);
        if (chair == 0) {
            this.DestroyTimer();
            this.skinButtonView.HideBet();
        }
        VoicePlayer.PlayPublicSound("btdp_followbet");
    }
    /**
     * 选牌开始
     */
    public Rec_SelectCardsStart(msg: GameIF.CustomMessage, aniFinish: boolean = false) {
        var data = <M_NiuNiu_GameMessage.CMD_S_SelectCardsStart>msg;
        console.log("--------Rec_SelectCardsStart:" + aniFinish);
        if (aniFinish) {
            if (this.tableInfo.gameModel == GameModel.RobMaster) {
                this.skinPlayerControl.SetLastCardValue(data.card);
            }
            else {
                this.skinPlayerControl.SetCards(0, data.cards);
            }
            if (this.skinPlayerControl.IsSelfJoinGame()) {
              //  this.skinCountCard.Show();
                this.skinCountDown.Show(TimerValue.SelectCards);
                this.skinPlayerControl.SetCanClick();
                this.skinButtonView.ShowSelectCard();
            }
        }
        else {
            this.gameInfo.SetCardType(data.cardType);
            this.gameInfo.SetBestSelectIndex(data.bestSelectIndex);
            this.skinPlayerControl.StopAni(GameStage.SelectCards);
            this.DestroyTimer();
            this.HideButton(1);
            if (this.tableInfo.gameModel != GameModel.RobMaster) {
                this.skinPlayerControl.AniFlip(data);
            }
            else {
                this.skinPlayerControl.AniDealLast(data);
            }
        }
    }
    /**
     * 选牌
     */
    public Rec_SelectCards(msg: GameIF.CustomMessage) {
        var data = <M_NiuNiu_GameMessage.CMD_S_SelectCards>msg;
        var chair = this.skingameClass.GetClientChair(data.chair);
        if (chair == 0) {
            this.skinCountCard.Close();
            this.skinCountDown.Close();
            this.skinPlayerControl.HideCanClick();
            this.skinButtonView.HideSelectCard();
            this.RegTimer(TimeFlag.OnlyShow, true, data.surplusTimer, "还有人在苦思冥想中：");
            this.skinPlayerControl.SetSelfSelectCards(data.cards, this.gameInfo.cardType);
        }
        else {
            this.skinPlayerControl.SetUserSelectCards(chair);
        }
        VoicePlayer.PlayPublicSound("btdp_flop");
    }
    /**
     * 游戏结果
     */
    public Rec_GameResult(msg: GameIF.CustomMessage, aniFinish: boolean = false) {
        var data = <M_NiuNiu_GameMessage.CMD_S_GameResult>msg;
        if (aniFinish) {
            this.skinLabelView.SetGameCount(data.gameCount);
            this.gameInfo.SetGameCount(data.gameCount);
            this.gameInfo.SetIsTrueReady(data.isEnd);
            this.OnGameOver();
        }
        else {
            this.skinPlayerControl.StopAni(GameStage.Result);
            this.DestroyTimer();
            this.HideButton(255);
            this.gameInfo.SetIsGaming(false);
            this.skinPlayerControl.HideAllUserSelectCards();
            this.skinPlayerControl.HideCanClick();
            this.skinPlayerControl.AniResult(data);
        }
    }
    /**
     * 根据游戏结果更新玩家余额
     * 此种情况为服务端玩家余额未及时发过来时调用
     */
    public UpdatePlayerScoreByGameResult(data: M_NiuNiu_GameMessage.CMD_S_GameResult) {
        for (var i = 0; i < data.chair.length; i++) {
            var chair = this.skingameClass.GetClientChair(data.chair[i]);
            this.skinPlayerControl.AddUserMoney(chair, data.score[i]);
            if (chair == 0) {
                this.tableInfo.AddSelfScore(data.score[i]);
                this.skinLabelView.SetMoney(this.tableInfo.selfScore);
            }
        }
    }
    /**
     * 玩家余额
     */
    public Rec_PlayerScore(msg: GameIF.CustomMessage, aniFinish: boolean = false) {
        var data = <M_NiuNiu_GameMessage.CMD_S_PlayerScore>msg;
        if (aniFinish) {
            for (var i = 0; i < data.score.length; i++) {
                var chair = this.skingameClass.GetClientChair(i);
                this.skinPlayerControl.SetUserMoney(chair, data.score[i]);
                if (chair == 0) {
                    this.skinLabelView.SetMoney(data.score[i]);
                    this.tableInfo.SetSelfScore(data.score[i]);
                }
            }
        }
        else {
            this.skinPlayerControl.AniPlayerScore(data);
        }
    }
    /**
     * 房主信息
     */
    public Rec_TableCreator(msg: GameIF.CustomMessage) {
        var data = <M_NiuNiu_GameMessage.CMD_S_TableCreator>msg;
        if (data.chair >= 0 && data.chair < PlayerCount) {
            this.tableInfo.SetTableCreator(this.skingameClass.GetClientChair(data.chair));
            this.skinPlayerControl.SetTableCreator(this.tableInfo.tableCreator);
            this.skinButtonView.SetTirenButton(this.tableInfo.IsSelfCreateTable());
        }
    }
    /**
     * 庄家变更
     */
    public Rec_MasterChange(msg: GameIF.CustomMessage, aniFinish: boolean = false) {
        console.log("Rec_MasterChange:" + aniFinish);
        var data = <M_NiuNiu_GameMessage.CMD_S_MasterChange>msg;
        if (aniFinish) {
            var master = this.skingameClass.GetClientChair(data.master);
            this.gameInfo.SetMaster(master);
            this.skinPlayerControl.HideAllUserFrame();
            this.skinPlayerControl.SetUserMaster(master);
        }
        else {
            this.skinPlayerControl.AniMasterChange(data);
        }
    }
    /**
     * 抢庄时的断线重连，观战也走断线重连逻辑
     */
    public Rec_GameContext_RobMaster(msg: GameIF.CustomMessage) {
        this.skinButtonView.HideReady();
        this.skinButtonView.HideTiRen();
        this.skinPlayerControl.GameStartClear();
        this.gameInfo.SetIsGaming(true);
        this.gameInfo.SetIsTrueOver(false);
        this.skinButtonView.SetMulGameButton(this.skingameClass.isSelfCreateRoom);
        var data = <M_NiuNiu_GameMessage.CMD_S_GameContext_RobMaster>msg;
        this.skinPlayerControl.SetCards(0, data.cards);
        this.SetOtherCards(data.cards.length);
        for (var i = 0; i < data.robMasterRate.length; i++) {
            var chair = this.skingameClass.GetClientChair(i);
            if (data.robMasterRate[i] >= 0) {
                this.skinPlayerControl.SetUserRobRate(chair, data.robMasterRate[i]);
            }
            else if (chair == 0 && data.surplusTimer > 0) {
                if (this.skinPlayerControl.IsSelfJoinGame()) {
                    this.RegTimer(TimeFlag.RobMaster, false, data.surplusTimer);
                    this.skinButtonView.ShowRob();
                }
            }
        }
    }
    /**
     * 下注时的断线重连
     */
    public Rec_GameContext_Bet(msg: GameIF.CustomMessage) {
        this.skinButtonView.HideReady();
        this.skinButtonView.HideTiRen();
        this.skinPlayerControl.GameStartClear();
        this.gameInfo.SetIsGaming(true);
        this.gameInfo.SetIsTrueOver(false);
        this.skinButtonView.SetMulGameButton(this.skingameClass.isSelfCreateRoom);
        var data = <M_NiuNiu_GameMessage.CMD_S_GameContext_Bet>msg;
        var master = this.skingameClass.GetClientChair(data.master);
        this.gameInfo.SetMaster(master);
        this.skinPlayerControl.SetUserMaster(master);
        this.skinPlayerControl.SetUserRobRate(master, data.masterRate);
        if (this.tableInfo.gameModel == GameModel.RobMaster)
            this.skinPlayerControl.SetCards(0, data.cards);
        else {
            var selfCards = new Array(data.cards.length);
            for (var i = 0; i < data.cards.length; i++) {
                selfCards[i] = 0;
            }
            this.skinPlayerControl.SetCards(0, selfCards);
        }
        this.SetOtherCards(data.cards.length);
        for (var i = 0; i < data.betRate.length; i++) {
            var chair = this.skingameClass.GetClientChair(i);
            if (data.betRate[i] >= 0) {
                this.skinPlayerControl.SetUserBetRate(chair, data.betRate[i]);
            }
            else if (chair == 0 && data.surplusTimer > 0) {
                if (this.skinPlayerControl.IsSelfJoinGame()) {
                    if (master == 0) {
                        this.RegTimer(TimeFlag.OnlyShow, true, data.surplusTimer, "请等待其他玩家下注：");
                    }
                    else {
                        this.RegTimer(TimeFlag.Bet, false, data.surplusTimer);
                        this.skinButtonView.ShowBet(data.extendBet);
                    }
                }
            }
        }
    }
    /**
     * 选牌时的断线重连
     */
    public Rec_GameContext_SelectCards(msg: GameIF.CustomMessage) {
        this.skinButtonView.HideReady();
        this.skinButtonView.SetMulGameButton(this.skingameClass.isSelfCreateRoom);
        var data = <M_NiuNiu_GameMessage.CMD_S_GameContext_SelectCards>msg;
        var master = this.skingameClass.GetClientChair(data.master);
        this.gameInfo.SetMaster(master);
        this.skinPlayerControl.SetUserMaster(master);
        this.skinButtonView.HideTiRen();
        this.skinPlayerControl.GameStartClear();
        this.gameInfo.SetIsGaming(true);
        this.gameInfo.SetIsTrueOver(false);
        this.gameInfo.SetCardType(data.cardType);
        this.gameInfo.SetBestSelectIndex(data.bestSelectIndex);
        this.skinPlayerControl.SetUserRobRate(master, data.masterRate);
        this.skinPlayerControl.SetCards(0, data.cards);
        this.SetOtherCards(data.cards.length);
        for (var i = 0; i < data.betRate.length; i++) {
            var chair = this.skingameClass.GetClientChair(i);
            if (data.betRate[i] >= 0) {
                this.skinPlayerControl.SetUserBetRate(chair, data.betRate[i]);
            }
        }
        for (var i = 0; i < data.selectState.length; i++) {
            var chair = this.skingameClass.GetClientChair(i);
            if (data.selectState[i]) {
                if (chair == 0)
                    this.skinPlayerControl.SetSelfSelectCards(data.cards, this.gameInfo.cardType);
                else
                    this.skinPlayerControl.SetUserSelectCards(chair);
            }
            else if (chair == 0) {
                if (this.skinPlayerControl.IsSelfJoinGame()) {
                   // this.skinCountCard.Show();
                    if (data.surplusTimer > 0) {
                        this.skinCountDown.Show(data.surplusTimer, TimerValue.SelectCards - data.surplusTimer);
                    }
                    this.skinPlayerControl.SetCanClick();
                    this.skinButtonView.ShowSelectCard();
                }
            }
        }
    }
    /**
     * 请求玩家创建房间
     */
    public Rec_GameCreatePlease(msg: GameIF.CustomMessage) {
        this.gameInfo.SetShowExitAsk(true);
    }
    /**
     * 计分板
     */
    public Rec_ScoreView(msg: GameIF.CustomMessage, aniFinish: boolean = false) {
        var data = <M_NiuNiu_GameMessage.CMD_S_ScoreView>msg;
        if (aniFinish || !data.isShow) {
            this.scoreView = new ScoreView(data.chairList, this.GetIDList(data.chairList), data.nameList, this.GetFaceList(data.chairList), data.gameNum);
            var num = data.chairList.length;
            var count = data.result.length / num;
            for (var i = 0; i < count; i++) {
                var result = new Array(num);
                for (var j = 0; j < num; j++) {
                    result[j] = data.result[i * num + j];
                }
                this.scoreView.AddScoreEle(new ScoreEle(result));
            }
            if (data.isExit && this.skinDissolveTable != undefined) {
                if (this.gameInfo.isGaming)
                    this.gameInfo.SetIsDissolveTable(true);
                this.skinDissolveTable.OnClose();
            }
            if (data.isShow) {
                this.gameInfo.SetIsTrueReady(false);
                if (data.isExit)
                    this.TheEnd();
                else
                    this.OnClassOver();
            }
        }
        else {
            this.skinPlayerControl.AniScoreView(data);
        }
    }
    /**
     * 局数中间时的桌子上玩家状态
     */
    public Rec_TableState(msg: GameIF.CustomMessage) {
        this.skinButtonView.SetMulGameButton(this.skingameClass.isSelfCreateRoom);
        var data = <M_NiuNiu_GameMessage.CMD_S_TableState>msg;
        //this.OnGameOver();
        this.skinPlayerControl.GameStartClear();
        this.skinButtonView.HideTiRen();
        for (var i = 0; i < data.chair.length; i++) {
            var chair = this.skingameClass.GetClientChair(data.chair[i]);
            if (data.ready[i]) {
                this.skinPlayerControl.SetUserReady(chair);
                if (chair == 0) {
                    this.skinButtonView.HideReady();
                }
            }
            else if (chair == 0 && data.surplusTimer > 0) {
                console.log(chair + "," + data.surplusTimer);
                this.RegTimer(TimeFlag.Interval, false, data.surplusTimer);
            }
        }
        this.gameInfo.SetIsTrueReady(data.isend);
    }
    /**
     * 解散房间
     */
    public Rec_DissolveTable(msg: GameIF.CustomMessage) {
        this.ShowDissolveTable(msg);
    }
    /**
     * 强退结果
     */
    public Rec_ForceLeftSuccess(msg: GameIF.CustomMessage) {
    }
    /**
     * 房主离开成功
     */
    public Rec_TableCreatorLeftSuccess(msg: GameIF.CustomMessage) {
        this.skingameClass.ExitGame();
    }
    /**
     * 显示来自服务端的消息
     */
    public Rec_ShowMsg(msg: GameIF.CustomMessage) {
        var data = <M_NiuNiu_GameMessage.CMD_S_ShowMsg>msg;
    }
    /**
     * 准备消息
     */
    public Rec_Ready(msg: GameIF.CustomMessage) {
        var data = <M_NiuNiu_GameMessage.CMD_C_Ready>msg;
        var chair = this.skingameClass.GetClientChair(data.chair);
        this.skinPlayerControl.SetUserReady(chair);
    }
    /**
     * 游戏结束
     */
    private OnGameOver() {
        this.OnClassOver();
    }
    public OnClassOver() {
        if (this.gameInfo.isTrueOver) {
            this.ShowReady();
        }
        else {
            this.gameInfo.SetIsTrueOver(true);
        }
    }
    /**
     * 局数打完或者解散房间
     */
    private TheEnd() {
        this.gameInfo.SetIsTrueOver(false);
        this.DestroyTimer();
        this.Reset();
        this.tableInfo.Reset();
        this.skinButtonView.SetMulGameButton(false);
        if (this.gameInfo.isDissolveTable) {
            this.ShowTotalScore();
        }
        else {
            this.skinButtonView.HideReady();
            this.skinButtonView.ShowTotalScore();
        }
    }
    private ShowReady() {
        this.Reset();
        if (this.skingameClass.IsCreateTable()) {
            if (this.gameInfo.IsEnd()) {
                this.tableInfo.Reset();
                this.skinButtonView.SetMulGameButton(false);
                return;
            }
            this.RegTimer(TimeFlag.Interval);
        }
        this.skinButtonView.ShowReady();
    }

    //==================================== 接收消息 结束 =======================================

    //==================================== 按钮事件 开始 =======================================
    /**
     * 背景点击，隐藏菜单栏
     */
    private OnButtonBg() {
        this.skinButtonView.HideMenu();
    }
    /**
     * 退出按钮事件
     */
    public OnButtonExit() {
        this.skinVideoCtrl.Destroy();
        this.skingameClass.ExitGame();
    }
    /**
     * 分享按钮事件
     */
    public OnButtonShare() {
    }
    /**
     * 设置按钮事件
     */
    public OnButtonAudio() {
    }
    /**
     * 帮助按钮事件
     */
    public OnButtonHelp() {
    }
    /**
     * 文本聊天按钮事件
     */
    public OnButtonChat() {
    }
    /**
     * 语音按钮事件
     */
    public OnButtonVoice() {
    }
    /**
     * 语音按钮关闭事件
     */
    public OnVoiceStop() {
    }
    /**
     * 积分板按钮事件
     */
    public OnButtonQueryScore() {
    }
    /**
     * 踢人按钮事件
     */
    public OnButtonTiren() {
    }
    /**
     * 踢出某玩家
     */
    public OnTiren(chair: number) {
    }
    /**
     * 准备按钮事件
     */
    public OnButtonReady() {
    }
    /**
     * 点击牌事件
     */
    public OnButtonCard(value: number[]) {
    }
    /**
     * 有牛，没牛按钮点击事件
     */
    public OnButtonSelectCard(value: boolean) {
    }
    /**
     * 搓牌
     */
    public OnButtonRubCard() {
    }
    /**
     * 选牌提示按钮
     */
    public OnButtonSelectHelp() {
    }
    //==================================== 按钮事件 结束 =======================================

    //==================================== 其他 开始 =======================================
    /**
     * 注册计时器
     */
    public RegTimer(timeflag: TimeFlag, onlyShow: boolean = false, value: number = 0, msg: string = "") {
        this.skinClock.RegTimer(timeflag, onlyShow, value, msg);
    }
    /**
     * 销毁计时器
     */
    public DestroyTimer() {
        this.skinClock.DestroyTimer();
    }
    /**
     * 隐藏按钮
     */
    private HideButton(value: number) {
        if (value == 0) {
            this.skinButtonView.HideRob();
        }
        else if (value == 1) {
            this.skinButtonView.HideBet();
            this.skinButtonView.HideRob();
        }
        else {
            this.skinButtonView.HideBet();
            this.skinButtonView.HideRob();
            this.skinCountDown.Close();
            this.skinButtonView.HideSelectCard();
        }
    }
    /**
     * 检查IP
     */
    private CheckUserIP() {
    }
    /**
     * 计时器结束
     */
    public TimerOver(value: TimeFlag) {
    }
    /**
     * 桌费
     */
    private TableCost() {
        if (this.skingameClass.IsCreateTable()) {
            if (this.tableInfo.tableCostType == TableCostType.AAPay && this.gameInfo.isTrueReady) {
                return this.tableInfo.tableCostNum;
            }
            return 0;
        }
        return this.skingameClass.RoomClient.TableCost;
    }
    /**
     * 游戏准入金额
     */
    private JoinMoney() {
        if (this.skingameClass.IsCreateTable())
            return this.tableInfo.joinMoney * this.gameInfo.GetLastGameCount();
        else
            return this.skingameClass.RoomClient.BaseMoney * this.skingameClass.RoomClient.JoinMultiNum;
    }
    /**
     * 自己的余额是否够付桌费
     */
    private IsTableCostEnought() {
        return true;
    }
    /**
     * 检查玩家余额
     */
    private CheckMoneyEnought() {
        if (this.tableInfo.roomType == RoomType.ScoreRoom) {
            if (!this.IsTableCostEnought())
                this.ShowNeedMoneyTip(1);
            else
                return true;
            return false;
        }
        if (this.skingameClass.RoomClient.TableCostMoneyType == this.tableInfo.moneyType) {
            if (this.tableInfo.selfScore < this.JoinMoney())
                this.ShowNeedMoneyTip(2);
            else
                return true;
            return false;
        }
        else {
            var needMoney = this.tableInfo.selfScore < this.JoinMoney();
            var needCost = !this.IsTableCostEnought();
            if (needMoney && needCost)
                this.ShowNeedMoneyTip(3);
            else if (needMoney)
                this.ShowNeedMoneyTip(2);
            else if (needCost)
                this.ShowNeedMoneyTip(1);
            else
                return true;
            return false;
        }
    }
    /**
     * 显示余额不足提示
     * 3:金币和房卡都不足，2:金币不足，3:房卡不足
     */
    private ShowNeedMoneyTip(type: number) {
        var str = "";
        var tableMoneyName = TranslateMoneyTypeName(this.skingameClass.RoomClient.CheckMoneyType);
        var tableCostName = TranslateMoneyTypeName(this.skingameClass.RoomClient.TableCostMoneyType);
        var tableMoney = this.JoinMoney();
        var tableCostNum = this.TableCost();
        if (type == 3)
            str = `您的账户的${tableMoneyName}和${tableCostName}不足,所需${tableMoneyName}${tableMoney}及${tableCostName}${tableCostNum},是否充值？`;
        else if (type == 2)
            str = `您的账户的${tableMoneyName}不足,所需${tableMoneyName}${tableMoney},是否充值？`;
        else if (type == 1)
            str = `您的账户的${tableCostName}不足,所需${tableCostName}${tableCostNum},是否充值？`;
    }
    //==================================== 其他 结束 =======================================

    //==================================== 辅助 开始 =======================================
    /**
     * 设置其他玩家的牌
     */
    private SetOtherCards(length: number) {
        var othercards = new Array(length);
        for (var i = 0; i < othercards.length; i++) {
            othercards[i] = 0;
        }
        for (var i = 1; i < PlayerCount; i++) {
            this.skinPlayerControl.SetCards(i, othercards);
        }
    }
    /**
     * 获取游戏模式
     */
    public GetGameModel() {
        switch (this.tableInfo.gameModel) {
            case GameModel.RandomMaster:
                return "随机庄家";
            case GameModel.RobMaster:
                return "看牌抢庄";
            case GameModel.TurnsMaster:
                return "轮流坐庄";
            case GameModel.NoNiuNoMaster:
                return "无牛下庄";
            case GameModel.Niu9ChangeMaster:
                return "牛九换庄";
            case GameModel.NotChangeMaster:
                return "不换庄";
        }
        return "";
    }
    /**
     * 获取总局数
     */
    public GetGameCount() {
        return this.gameInfo.GetAllGameCount();
    }
    /**
     * 获取桌费模式
     */
    public GetTableCostType() {
        switch (this.tableInfo.tableCostType) {
            case TableCostType.AAPay:
                return "AA制";
            case TableCostType.TableCreatorPay:
                return "房主付费";
            case TableCostType.GroupOwnerPay:
                return "群主付费";
        }
        return "";
    }
    /**
     * 获取开始专家模式
     */
    public GetStartMasterModel() {
        switch (this.tableInfo.startMasterModel) {
            case StartMasterModel.RandomMaster:
                return "随机坐庄";
            case StartMasterModel.TableOwner:
                return "房主坐庄";
        }
        return "";
    }
    /**
     * 获取牌型模式
     */
    public GetCardTypeModel() {
        let result = "";
        for (let i = 0; i < this.tableInfo.cardTypeModel.length; i++) {
            result += GameLogic.GetCardTypeModelText(this.tableInfo.cardTypeModel[i]) + ",";
        }
        return result.length > 0 ? result.substring(0, result.length - 1) : "";
    }
    /**
     * 获取自己的ID
     */
    public GetSelfID(): number {
        var playerinfo = this.skingameClass.TablePlayer[this.skingameClass.ChairID];
        if (playerinfo != undefined && playerinfo != null)
            return playerinfo.PlayerID;
        return 0;
    }
    /**
     * 获取ID列表
     */
    public GetIDList(chairlist: number[]): number[] {
        var IDlist = new Array();
        for (var i = 0; i < chairlist.length; i++) {
            var playerinfo = this.skingameClass.TablePlayer[chairlist[i]];
            if (playerinfo != undefined && playerinfo != null)
                IDlist.push(playerinfo.PlayerID);
            else
                IDlist.push("");
        }
        return IDlist;
    }
    /**
     * 获取头像列表
     */
    public GetNameList(chairlist: number[]): string[] {
        var namelist = new Array();
        for (var i = 0; i < chairlist.length; i++) {
            var playerinfo = this.skingameClass.TablePlayer[chairlist[i]];
            if (playerinfo != undefined && playerinfo != null)
                namelist.push(playerinfo.NickName);
            else
                namelist.push("");
        }
        return namelist;
    }
    /**
     * 获取头像列表
     */
    public GetFaceList(chairlist: number[]): string[] {
        var facelist = new Array();
        for (var i = 0; i < chairlist.length; i++) {
            var playerinfo = this.skingameClass.TablePlayer[chairlist[i]];
            if (playerinfo != undefined && playerinfo != null)
                facelist.push(playerinfo.FaceID);
            else
                facelist.push("");
        }
        return facelist;
    }
    /**
     * 获取牌资源
     */
    public GetCardsRes(value: number): cc.SpriteFrame {
        return this.getComponent<PokerCardsRes>(PokerCardsRes).GetCardsRes(value);
    }
    //==================================== 辅助 结束 =======================================

    //==================================== 显示组件 开始 =======================================
    /**
     * 显示玩家信息
     */
    public ShowPlayerInfo(chair: number) {
        let playerinfo = this.skingameClass.TablePlayer[this.skingameClass.GetServerChair(chair)];
        if (playerinfo != null) {
            let point = this.skinPlayerControl.GetPlayerInfoPoint(chair);
            ShowNodeView("PlayerInfo", this.skinPlayerInfo, (prefab) => {
                this.skinPlayerInfo = this.AddPrefab(prefab, "SkinPlayerInfo", 12);
            }, () => {
                this.skinPlayerInfo.Show(chair, point, playerinfo.FaceID, playerinfo.PlayerID, playerinfo.NickName, playerinfo.UserIP, this.skingameClass.isSelfCreateRoom);
            });
        }
    }
    /**
     * 显示总计
     */
    public ShowTotalScore() {
        ShowNodeView("TotalScore", this.skinTotalScore, (prefab) => {
            this.skinTotalScore = this.AddPrefab(prefab, "SkinTotalScore", 15);
        }, () => {
            this.skinTotalScore.Show(new TotalScoreData(this.scoreView, this.GetSelfID()));
        });
    }
    /**
     * 显示计分板
     */
    public ShowQueryScore(isExit: boolean = true) {
        ShowNodeView("QueryScore", this.skinQueryScore, (prefab) => {
            this.skinQueryScore = this.AddPrefab(prefab, "SkinQueryScore", 16);
        }, () => {
            this.skinQueryScore.Show(new SkinQueryScoreParam(this.scoreView, isExit, this.gameInfo.gameCount));
        });
    }
    /**
     * 解散房间
     */
    private ShowDissolveTable(msg: GameIF.CustomMessage) {
        ShowNodeView("DissolveTable", this.skinDissolveTable, (prefab) => {
            this.skinDissolveTable = this.AddPrefab(prefab, "SkinDissolveTable", 17);
        }, () => {
            this.skinDissolveTable.Show(new SkinDissolveTableParam(msg));
        });
    }
    //==================================== 显示组件 结束 =======================================

    //==================================== 搓牌 =======================================
    /**
     * 跳过搓牌
     */
    public SkipRubCard() {
    }
    /**
     * 搓牌结束
     */
    public RubCardOver() {
    }

    //==================================== 计时器 开始 =======================================
    public TimePause() {
        this.skinClock.TimePause();
        this.skinCountDown.TimePause();
        this.skinPlayerControl.TimePause();
    }
    public TimeResume() {
        this.skinClock.TimeResume();
        this.skinCountDown.TimeResume();
        this.skinPlayerControl.TimeResume();
    }
    //==================================== 计时器 结束 =======================================
}
