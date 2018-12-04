const { ccclass, property } = cc._decorator;

import { INiuNiuView, NiuNiu } from "./GameHelp/INiuNiuClass";
import { ScoreView, TableInfo, GameInfo, TimeFlag, RoomType, TableCostType, PlayerCount, TimerValue, GameModel, GameStage, ScoreEle, CardType, SelectCardsCount, SkinQueryScoreParam, SkinDissolveTableParam, CardsCount, StartMasterModel, CardTypeModel, PrefabPath, TotalScoreData, ExtendBetType, RubCardType, GameRule } from "./GameHelp/GameHelp";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { GameIF } from "../../CommonSrc/GameIF";
import M_NiuNiuClass from "./M_NiuNiuClass";
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
import PokerCardsRes from "./GameHelp/PokerCardsRes";
import SkinTotalScore from "./SkinView/SkinTotalScore";
import SkinCommunionView from "./SkinView/SkinCommunionView";
import SkinRubCardView from "./SkinView/SkinRubCardView";
import Global from "../../Global/Global";
import HuDong_Animation from "../MJCommon/HuDong_Animation";

@ccclass
export default class M_NiuNiuView extends cc.Component implements INiuNiuView {
    private static _instance: M_NiuNiuView;
    public static get Instance(): M_NiuNiuView { return this._instance; }
    public get skingameClass(): M_NiuNiuClass { return M_NiuNiuClass.Instance; }
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
    private skinCommunionView: SkinCommunionView;
    private skinCountDown: SkinCountDown;
    @property(cc.Prefab)
    prefab_rubCard: cc.Prefab = null;
    private skinRubCardView: SkinRubCardView;
    private skinGameHelp: SkinGameHelp;
    private skinQueryScore: SkinQueryScore;
    private skinTotalScore: SkinTotalScore;
    @property(cc.Prefab)
    prefab_dissolveTable: cc.Prefab = null;
    private skinDissolveTable: SkinDissolveTable;
    @property(cc.Prefab)
    prefab_hudong:cc.Prefab = null;
    private skinTiren: SkinTiren;
    private skinRecordVideo: SkinRecordVideo;
    private skinPlayerInfo: SkinPlayerInfo;
    //变量
    private scoreView: ScoreView;
    public tableInfo: TableInfo;
    private gameInfo: GameInfo;
    public gamerule:GameRule;
    private huDongDaoJu:HuDong_Animation;
    public GameModel() { return this.tableInfo.gameModel; }
    public Master() { return this.gameInfo.master; }

    onLoad() {
        M_NiuNiuView._instance = this;
        NiuNiu.ins.iview = this;
        this.tableInfo = new TableInfo();
        this.gameInfo = new GameInfo();
        this.scoreView = null;
        this.group_bg.on(cc.Node.EventType.TOUCH_START, this.OnButtonBg, this);
        SetNodeChildrenOrder(this.node);
        var orderIndex = this.node.childrenCount;//1
        this.skinLabelView = this.AddPrefab(this.prefab_labelView, "SkinLabelView", orderIndex++);//2
        this.skinPlayerControl = this.AddPrefab(this.prefab_palyercontrol, "SkinPlayerControl", orderIndex++);//3
        orderIndex++;//SkinCommunionView:4
        this.skinButtonView = this.AddPrefab(this.prefab_buttonView, "SkinButtonView", orderIndex++);//5
        this.skinClock = this.AddPrefab(this.prefab_clock, "SkinClock", orderIndex++);//6
        this.skinCountCard = this.AddPrefab(this.prefab_countCard, "SkinCountCard", orderIndex++);//7
        this.skinCountDown = this.AddPrefab(this.prefab_countDown, "SkinCountDown", orderIndex++);//8
        this.skinRubCardView = this.AddPrefab(this.prefab_rubCard, "SkinRubCardView", orderIndex++);//9
        //SkinTiren:11
        //SkinPlayerInfo:12
        //SkinRecordVideo:13
        //SkinGameHelp:14
        //SkinTotalScore:15
        //SkinQueryScore:16
        //SkinDissolveTable:17
        this.skinDissolveTable = this.AddPrefab(this.prefab_dissolveTable, "SkinDissolveTable", 17);
        this.huDongDaoJu = this.AddPrefab(this.prefab_hudong,"HuDong_Animation",orderIndex++);
  
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
        this.AddTimerForm();
    }
    /**
     * 初始化游戏 有参数 用于初始化，每次游戏中断线重连都会被调用
     */
    public ReInitView() {
        console.log("ReInitView");
        this.Init();
    }
    /**
     * 销毁游戏视图,游戏需要移除所有子元素
     * */
    public DestroyGameCiew(): void {
    }
    private AddTimerForm() {
        let timeForm = this.skingameClass.UiManager.GetTimerForm();
        this.group_bg.addChild(timeForm);
        timeForm.x = -520;
        timeForm.y = 345;
        timeForm.color=cc.color().fromHEX("#F68EAC");
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
        this.skinRubCardView.Init();
        if (this.skinCommunionView != undefined)
            this.skinCommunionView.Init();
        if (this.skinDissolveTable != undefined)
            this.skinDissolveTable.Init();
        this.skinLabelView.Init();
        this.skinPlayerControl.Init();
        if (this.skingameClass.IsCreateTable())
            this.skinLabelView.SetTableNum(this.skingameClass.TableID);
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
    public AgreeNextGameReset() {
        this.skinLabelView.SetGameCountForNext(this.gameInfo.gameCount[1]);
        this.gameInfo.SetIsTrueReady(true);
    }
    public RefuseNextGameReset() {
        this.gameInfo.gameCount[1] -= this.skinLabelView.allgamenum;
        this.gameInfo.gameCount[0] = this.gameInfo.gameCount[1];
        //  this.skinLabelView.SetGameCountForNext(this.gameInfo.gameCount[1]);
        cc.log("---------清理-----------游戏--------规则------");
        this.TheEnd();
        // this.skinButtonView.ShowTotalScore();
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
        if (this.skinCommunionView != undefined)
            this.skinCommunionView.Clear(chair);
    }
    /**
     * 显示文字聊天
     */
    public ShowChat(chair: number, value: string) {
        this.ShowCommunionView(chair, 0, value);
    }
    /**
     * 显示聊天表情
     */
    public ShowChatEmoji(chair: number, value: cc.AnimationClip) {
        this.skinPlayerControl.ShowChatEmoji(chair, value);
    }
     /**
     * 显示互动道具
     * @param spschair 发起者
     * @param rechair 接收者
     * @param index 道具索引
     */
    public ShowChatItem(spschair:number,rechair:number,index:string){
        var idx = parseInt(index);
        if(idx==4){
            var path = cc.url.raw("resources/Sound/Item/guzhang.mp3");
            this.skingameClass.PlaySound(path,AudioType.Effect,false);
            this.skinPlayerControl.ShowGuZhang(spschair);
        }else{
            var point = this.skinPlayerControl.GetPlayerChatPoint(spschair);
            var point2 = this.skinPlayerControl.GetPlayerChatPoint(rechair);
       //     if(rechair !=0){
           //      point2.y += 20;
  //          }
               

            this.huDongDaoJu.showChatItem(idx,point,point2);
        }
     

    }
    /**
     * 显示语言聊天
     */
    public StartVoicePlay(chair: number) {
        this.ShowCommunionView(chair, 1);
    }
    /**
     * 关闭语音聊天显示
     */
    public StopVoicePlay(chair: number) {
        this.ShowCommunionView(chair, 2);
    }
    /**
     * 余额更新
     */
    public RefreshMoney() {
        if (this.gameInfo.waitPay) {
            this.gameInfo.SetWaitPay(false);
            this.skingameClass.SendGameData(new M_NiuNiu_GameMessage.CMD_C_RefreshMoney());
        }
    }
    //==================================== 来自Class的消息 结束 =======================================

    //==================================== 接收消息 开始 =======================================
    /**
     * 特殊属性
     */
    public Rec_Attribute(msg: GameIF.CustomMessage) {
        var data = <M_NiuNiu_GameMessage.CMD_S_Attribute>msg;
        this.gamerule = new GameRule();
        this.skinLabelView.SetCellScore(data.cellScore, this.skingameClass.IsCreateTable());
        this.skinLabelView.SetMoneyType(data.moneyType);
        this.skinLabelView.SetGameCount(data.gameCount);
        this.skinLabelView.allgamenum = data.startNum;
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
        this.tableInfo.SetForceLeftMoney(data.forceLeftMoney);
        this.tableInfo.SetForceLeftMoneyType(<QL_Common.CurrencyType>data.forceLeftMoneyType);
        this.tableInfo.SetCheckIP(data.checkIP);
        this.tableInfo.SetExtendBet(data.extendBet);
        this.tableInfo.SetRubCard(data.rubCard);
        this.gameInfo.SetHasForceLeft(data.hasForceLeft);
        //this.skinButtonView.SetGameModel(data.gameModel);
        this.skinButtonView.SetForBetRate(data.forBetRate);
        this.skingameClass.allmoney = data.tableCostNum;
        this.gamerule.SetGameNum = data.gameCount[1]/10-1;
        this.gamerule.cellScore = data.cellScore;
        this.gamerule.checkIP = data.checkIP;
        this.gamerule.extendBet = data.extendBet==1?true:false;
        this.gamerule.rubCard = data.rubCard==0?false:true;
        this.gamerule.tableCreatorPay = data.tableCostType;
        this.gamerule.startMasterModel = data.startMasterModel==0?true:false;
        this.gamerule.gameModel = data.gameModel;
        this.gamerule.isValid = true;

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
        this.skinButtonView.SetGameRule(this.skingameClass.isSelfCreateRoom, data.cellScore, this.GetTableCostType(), this.GetGameCount(), data.tableCostNum,
            tableCostName, this.GetGameModel(), data.checkIP, this.GetStartMasterModel(), this.GetCardTypeModel(), data.extendBet, data.rubCard);
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
            if (this.tableInfo.tableCreator == 0) {
                if (cc.isValid(this.skinTiren))
                    this.skinTiren.HideTiRen();
            }
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
         //   this.CheckUserIP();
            this.ShowTableCostTips();
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
            let isRobMaster = this.tableInfo.gameModel == GameModel.RobMaster;
            let isJoin = this.skinPlayerControl.IsSelfJoinGame();
            let rubCardEnable = this.tableInfo.IsRubCardEnable();
            if (isRobMaster) {
                //this.skinPlayerControl.SetLastCardValue(data.card);
                if (rubCardEnable && isJoin) {
                    this.gameInfo.SetRubCardValue(data.card);
                    this.skinPlayerControl.SetLastRubCardValue();
                }
                else {
                    this.skinPlayerControl.SetLastCardValue(data.card);
                }
            }
            else {
                this.skinPlayerControl.SetCards(0, data.cards);
            }
            if (isJoin) {
                this.skinCountCard.Show();
                this.skinCountDown.Show(TimerValue.SelectCards);
                this.skinPlayerControl.SetCanClick();
                this.skinButtonView.ShowSelectCard(isRobMaster && rubCardEnable);
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
        //this.skinPlayerControl.SetUserSelectCards(chair);
        if (chair == 0) {
            this.skinRubCardView.Clear();
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
            this.skinRubCardView.Clear();
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
            if (this.skingameClass.GetSelfState() != QL_Common.GState.Gaming)
                this.skinButtonView.SetTirenButton(this.tableInfo.IsSelfCreateTable());
            if (this.tableInfo.tableCreator == 0 && !this.gameInfo.isGaming && this.gameInfo.gameCount[0] < 1) {
                for (var i = 1; i < 5; i++) {
                    if (SkinPlayerControl.Instance.skinPlayer[i].IsJoinGame()) {
                        this.ShowTiren(i);
                    }
                }
            }
        }
    }
    /**
     * 庄家变更
     */
    public Rec_MasterChange(msg: GameIF.CustomMessage, aniFinish: boolean = false) {
        console.log("Rec_MasterChange:" + aniFinish);
        var data = <M_NiuNiu_GameMessage.CMD_S_MasterChange>msg;
        if (aniFinish) {
            //this.skingameClass.UiManager.ShowTip(data.msg);
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
        cc.log("Rec_GameContext_Bet:");
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
                    this.skinCountCard.Show();
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
     * 选牌时的断线重连
     */
    public Rec_GameContext_Result(msg: GameIF.CustomMessage) {
        this.skinButtonView.HideReady();
        this.skinButtonView.SetMulGameButton(this.skingameClass.isSelfCreateRoom);
        var data = <M_NiuNiu_GameMessage.CMD_S_GameContext_Result>msg;
        var master = this.skingameClass.GetClientChair(data.master);
        this.gameInfo.SetMaster(master);
        this.skinPlayerControl.SetUserMaster(master);
        this.skinButtonView.HideTiRen();
        this.skinPlayerControl.GameStartClear();
        this.gameInfo.SetIsGaming(false);
        this.gameInfo.SetIsTrueOver(false);
        this.gameInfo.SetGameCount(data.gameCount);
        this.skinLabelView.SetGameCountResult(data.gameCount);
        if (!data.showResult) {
            this.OnGameOver();
            this.skingameClass.UiManager.ShowTip("游戏结算中，请耐心等待游戏结束。");
            return;
        }
        this.skinPlayerControl.SetUserRobRate(master, data.masterRate);
        for (let i = 0; i < data.betRate.length; i++) {
            let chair = this.skingameClass.GetClientChair(i);
            if (data.betRate[i] >= 0) {
                this.skinPlayerControl.SetUserBetRate(chair, data.betRate[i]);
            }
        }
        //显示结果
        for (let i = 0; i < data.chair.length; i++) {
            let chair = this.skingameClass.GetClientChair(data.chair[i]);
            let cards = new Array(CardsCount);
            for (let j = 0; j < CardsCount; j++) {
                cards[j] = data.cards[i * CardsCount + j];
            }
            let cardType = data.cardType[i];
            let skinPlayer = SkinPlayerControl.Instance.skinPlayer[chair];
            skinPlayer.skinCardsView.SetResultCards(cards, cardType, skinPlayer.userGender, false);
            skinPlayer.SetUserResultScore(data.score[i], false);
        }
        if (data.surplusTimer - TimerValue.Interval > 1) {
            this.skingameClass.UiManager.ShowTip("游戏结算中，请耐心等待游戏结束。");
        }
        this.gameInfo.SetIsTrueReady(data.isend);
        this.OnGameOver();
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
            else if (chair == 0) {
                console.log(chair + "," + data.surplusTimer);
                this.skinButtonView.ShowReady();
               // if (data.surplusTimer > 0)
                   // this.RegTimer(TimeFlag.Interval, false, data.surplusTimer);
            }
        }
        var master = this.skingameClass.GetClientChair(data.master);
        this.gameInfo.SetMaster(master);
        this.skinPlayerControl.SetUserMaster(master);
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
        var data = <M_NiuNiu_GameMessage.CMD_S_ForceLeftSuccess>msg;
        var chair = this.skingameClass.GetClientChair(data.chair);
        if (chair == 0) {
            this.skingameClass.ForceQuitting();
        }
    }
    /**
     * 房主离开成功
     */
    public Rec_TableCreatorLeftSuccess(msg: GameIF.CustomMessage) {
        if (!this.gameInfo.tableOwnerWaitExit) return;
        this.skingameClass.ExitGame();
    }
    /**
     * 显示来自服务端的消息
     */
    public Rec_ShowMsg(msg: GameIF.CustomMessage) {
        var data = <M_NiuNiu_GameMessage.CMD_S_ShowMsg>msg;
        if (data.type == 0) {
            this.skingameClass.UiManager.ShowTip(data.msg);
        }
        else if (data.type == 1) {
            if (data.isexit) {
                this.skingameClass.ForceQuitting();
                this.skingameClass.UiManager.ShowTip(data.msg);
            }
            else {
                this.skingameClass.UiManager.ShowTip(data.msg);
            }
        }
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
        console.log("OnGameOver");
        this.OnClassOver();
    }
    public OnClassOver() {
        console.log("OnClassOver");
        if (this.gameInfo.isTrueOver) {
            this.ShowReady();
        }
        else {
            this.gameInfo.SetIsTrueOver(true);
        }
    }
    /**
     * 解散房间成功
     */
    public OnDisTableSuccess() {
        if (!this.gameInfo.isGaming)
            this.TimeResume();
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
        //this.skinPlayerControl.StopAni(GameStage.Free);
        this.Reset();
        if (this.skingameClass.IsCreateTable()) {
            if (this.gameInfo.IsEnd()) {
                this.tableInfo.Reset();
                this.skinButtonView.SetMulGameButton(false);
                return;
            }
          //  this.RegTimer(TimeFlag.Interval);
        }
        this.skinButtonView.ShowReady();
    }

    //==================================== 接收消息 结束 =======================================

    //==================================== 按钮事件 开始 =======================================
    /**
     * 背景点击，隐藏菜单栏
     */
    private OnButtonBg() {
        this.skingameClass.closeChat();
        this.skinButtonView.HideMenu();
    }
    /**
     * 退出按钮事件
     */
    public OnButtonExit(iskey: boolean = false) {
        if (this.skingameClass.isSelfCreateRoom) {
            if (!this.skingameClass.IsCanExitGame(this.skingameClass.ChairID)) {
                //自主建房中途不许退出;
                return;
            }
            if (this.tableInfo.IsSelfCreateTable()) {
                if (this.tableInfo.tableCostType == TableCostType.AAPay) {
                  
                        var data = new M_NiuNiu_GameMessage.CMD_C_TableCreatorLeft();
                        data.saveTable = false;
                        this.skingameClass.SendGameData(data);
                        this.skingameClass.ExitGame();
                   
                }
                else if (this.tableInfo.tableCostType == TableCostType.GroupOwnerPay) {
                    this.NomalExit(iskey);
                }
                else if (this.gameInfo.showExitAsk) {
                    // let strTips = this.gameInfo.tableCreateWaitTime > 0 ? "是否需要系统为您保留房间？系统会在游戏开始前为您保留" + this.gameInfo.tableCreateWaitTime + "分钟，请您记住房号。" : "是否需要系统为您保留房间？请您记住房号。";
                    // this.skingameClass.UiManager.ShowMsgBox(strTips, this, () => {
                    //     var data = new M_NiuNiu_GameMessage.CMD_C_TableCreatorLeft();
                    //     data.saveTable = true;
                    //     this.skingameClass.SendGameData(data);
                    //     this.gameInfo.SetTableOwnerWaitExit(true);
                    // }, () => {
                    //     var data = new M_NiuNiu_GameMessage.CMD_C_TableCreatorLeft();
                    //     data.saveTable = false;
                    //     this.skingameClass.SendGameData(data);
                    //     this.skingameClass.ExitGame();
                    // });
                        var data = new M_NiuNiu_GameMessage.CMD_C_TableCreatorLeft();
                        data.saveTable = false;
                        this.skingameClass.SendGameData(data);
                        this.skingameClass.ExitGame();                    
                }
                else {
                    this.NomalExit(iskey);
                }
            }
            else {
                this.NomalExit(iskey);
            }
        }
        else if (!this.skingameClass.IsCanExitGame(this.skingameClass.ChairID)) {
            var money = Math.abs(this.tableInfo.forceLeftMoney);
            if (!this.gameInfo.hasForceLeft && money > 0) {
                var moneytype = TranslateMoneyTypeName(this.tableInfo.forceLeftMoneyType);
                this.skingameClass.UiManager.ShowMsgBox(`在游戏中退出会扣除${moneytype}${money},是否退出`, this, () => {
                    this.ForceExit();
                });
            }
            else {
                if (iskey) {
                    this.skingameClass.UiManager.ShowMsgBox("是否退出快乐拼十？", this, () => {
                        this.ForceExit();
                    });
                }
                else {
                    if (money > 0)
                        M_NiuNiuClass.Instance.SendGameData(new M_NiuNiu_GameMessage.CMD_C_ForceLeft());
                    else
                        this.skingameClass.ForceQuitting();
                }
            }
        }
        else {
            this.NomalExit(iskey);
        }
    }
    private ForceExit() {
        if (!this.skingameClass.IsCanExitGame(this.skingameClass.ChairID)) {
            if (Math.abs(this.tableInfo.forceLeftMoney) > 0)
                M_NiuNiuClass.Instance.SendGameData(new M_NiuNiu_GameMessage.CMD_C_ForceLeft());
            else
                this.skingameClass.ForceQuitting();
        }
        else
            this.skingameClass.ExitGame();
    }
    private NomalExit(iskey: boolean) {
        if (iskey) {
            this.skingameClass.UiManager.ShowMsgBox("是否退出快乐拼十？", this, () => {
                this.skingameClass.ExitGame();
            });
        }
        else {
            this.skingameClass.ExitGame();
        }
    }
    /**
     * 分享按钮事件
     */
    public OnButtonShare() {
        var title = "";
        if(Global.Instance.DataCache.GroupId>0){
            title = this.skingameClass.isSelfCreateRoom ? `【快乐pinshi】亲友圈房号：${this.skingameClass.TableID}` : `赶快加入"快乐pinshi"`;
         }else{
              title = this.skingameClass.isSelfCreateRoom ? `【快乐pinshi】房号：${this.skingameClass.TableID}` : `赶快加入"快乐pinshi"`;
         }
        var extendBet = this.GetRuleExtendBet(this.tableInfo.extendBet);
        var rubCard = this.GetRuleRubCard(this.tableInfo.rubCard);
        var gameCount = this.GetGameCount();
        var tableCostType = this.GetTableCostType();
        var startMasterModel = this.GetStartMasterModel();
        var gameModel = this.GetGameModel();
        var cardTypeModel = this.GetCardTypeModel();
        var shareText = `玩法:打${gameCount}局,${tableCostType},开局庄家:${startMasterModel},换庄模式：${gameModel},${extendBet}${rubCard}`;
        if (cardTypeModel.length > 0)
            shareText += `特殊牌型:(${cardTypeModel})`;
        else
            shareText += `特殊牌型:无`;
        var context = this.skingameClass.isSelfCreateRoom ? shareText : `你的好友邀请你来加入"快乐pinshi"！`;
        this.skingameClass.ShowShare(0, this.skingameClass.TableID, title, context);
    }
    /**
     * 设置按钮事件
     */
    public OnButtonAudio() {
        this.skingameClass.ShowSettingForm();
    }
    /**
     * 帮助按钮事件
     */
    public OnButtonHelp() {
        this.ShowGameHelp();
    }
    /**
     * 文本聊天按钮事件
     */
    public OnButtonChat() {
        this.skingameClass.showChat();
    }
    /**
     * 语音按钮事件
     */
    public OnButtonVoice() {
        this.skingameClass.StartRecord();
        if (this.skingameClass.AudioManager.IsRecording()) {
            this.ShowRecordVideo();
        }
    }
    /**
     * 语音按钮关闭事件
     */
    public OnVoiceStop(timeout: boolean = false) {
        if (this.skingameClass.AudioManager.IsRecording() || timeout) {
            this.skinButtonView.btn_voice.node.scale = 1;
            if (this.skinRecordVideo != undefined) {
                this.skinRecordVideo.Close();
            }
            this.skingameClass.StopRecord();
        }
    }
    /**
     * 积分板按钮事件
     */
    public OnButtonQueryScore() {
        this.ShowQueryScore(false);
    }
    /**
     * 踢人按钮事件
     */
    public OnButtonTiren() {
        var state = this.skinPlayerControl.GetPlayerState();
        var count = 0;
        for (var i = 0; i < state.length; i++) {
            if (state[i] == 1)
                count++;
        }
        if (count > 0) {
         //   this.ShowTiren(state);
        }
        else
            this.skingameClass.UiManager.ShowMsgBox("当前没有可以踢的玩家。");
    }
    /**
     * 踢出某玩家
     */
    public OnTiren(chair: number) {
        console.log("OnTiren:" + chair);
        var logicchair = this.skingameClass.GetServerChair(chair);
        var user = this.skingameClass.TablePlayer[logicchair];
        if (user != undefined && user != null)
            this.skingameClass.PleaseLeavePlayer(user.PlayerID);
    }
    /**
     * 准备按钮事件
     */
    public OnButtonReady() {
        if (!this.CheckMoneyEnought()) {
            this.gameInfo.SetWaitPay(true);
            return;
        }
        this.Clear();
                if(this.gameInfo.gameCount[1]>this.skinLabelView.allgamenum){
            this.DestroyTimer();
            this.skingameClass.SendGameData(new M_NiuNiu_GameMessage.CMD_C_Ready());
        }else
        if (this.gameInfo.isTrueReady) {
            this.skingameClass.SendUserReady();
        }
        else {
            this.DestroyTimer();
            this.skingameClass.SendGameData(new M_NiuNiu_GameMessage.CMD_C_Ready());
        }
    }
    /**
     * 点击牌事件
     */
    public OnButtonCard(value: number[]) {
        this.skinCountCard.ShowCount(value);
        if (this.gameInfo.cardType > CardType.NiuNiu)
            this.skinButtonView.ShowSelectCardType(this.gameInfo.cardType);
        else if (this.gameInfo.cardType > CardType.HighCard && this.skinCountCard.HasNiu)
            this.skinButtonView.ShowSelectCardType(this.gameInfo.cardType);
        else
            this.skinButtonView.ShowSelectCardHelp();
    }
    /**
     * 有牛，没牛按钮点击事件
     */
    public OnButtonSelectCard(value: boolean) {
        if (value) {
            if (this.gameInfo.cardType > CardType.NiuNiu || this.skinCountCard.HasNiu) {
                this.skinCountDown.Close();
                this.skinButtonView.HideSelectCard();
                var data = new M_NiuNiu_GameMessage.CMD_C_SelectCards();
                data.select = this.skinPlayerControl.GetUpIndexList();
                data.hasNiu = true;
                this.skingameClass.SendGameData(data);
            }
            else {
                this.skingameClass.UiManager.ShowTip("选择的三张牌之和等于10的倍数才是有牛哦！");
            }
        }
        else {
            this.skinCountDown.Close();
            this.skinButtonView.HideSelectCard();
            var data = new M_NiuNiu_GameMessage.CMD_C_SelectCards();
            data.hasNiu = false;
            this.skingameClass.SendGameData(data);
        }
    }
    /**
     * 搓牌
     */
    public OnButtonRubCard() {
        this.skinRubCardView.Show(this.gameInfo.rubCardValue);
    }
    /**
     * 选牌提示按钮
     */
    public OnButtonSelectHelp() {
        this.SkipRubCard();
        if (this.gameInfo.bestSelectIndex == null || this.gameInfo.bestSelectIndex.length != SelectCardsCount) {
            this.skingameClass.UiManager.ShowTip("当前手牌没牛");
            this.skinPlayerControl.UpCardsByIndex(new Array(0));
            this.skinButtonView.ShowSelectCardType(this.gameInfo.cardType);
        }
        else {
            this.skinPlayerControl.UpCardsByIndex(this.gameInfo.bestSelectIndex);
        }
    }
    public ShowWanfa(){
        this.skingameClass.showWanfa(this.gamerule);
    }
    //==================================== 按钮事件 结束 =======================================

    //==================================== 显示组件 开始 =======================================
    /**
     * 显示聊天消息
     */
    private ShowCommunionView(chair: number, type: number, msg: string = "") {
        ShowNodeView("CommunionView", this.skinCommunionView, (prefab) => {
            this.skinCommunionView = this.AddPrefab(prefab, "SkinCommunionView", 4);
        }, () => {
            this.skinCommunionView.Show(chair, type, msg);
        });
    }
    // /**
    //  * 显示踢人
    //  */
    // private ShowTiren(state: number[]) {
    //     ShowNodeView("Tiren", this.skinTiren, (prefab) => {
    //         this.skinTiren = this.AddPrefab(prefab, "SkinTiren", 11);
    //     }, () => {
    //         this.skinTiren.Show(state);
    //     });
    // }
        /**
     * 显示踢人
     */
    public ShowTiren(chair: number) {
        ShowNodeView("Tiren", this.skinTiren, (prefab) => {
            this.skinTiren = this.AddPrefab(prefab, "SkinTiren", 4);
        }, () => {
            this.skinTiren.ShowTiRen(chair);
        });
    }
     public HideTiren(chair:number){
        this.skinTiren.HideTiRenOne(chair);
    }
    /**
     * 显示玩家信息
     */
    public ShowPlayerInfo(chair: number) {
        let playerinfo = this.skingameClass.TablePlayer[this.skingameClass.GetServerChair(chair)];
        if (playerinfo != null) {
            let point = this.skinPlayerControl.GetPlayerInfoPoint(chair);
             this.skingameClass.showPlayerInfoForm(playerinfo,point,this.skingameClass.GetServerChair(chair));
            // ShowNodeView("PlayerInfo", this.skinPlayerInfo, (prefab) => {
            //     this.skinPlayerInfo = this.AddPrefab(prefab, "SkinPlayerInfo", 12);
            // }, () => {
            //     this.skinPlayerInfo.Show(chair, point, playerinfo.FaceID, playerinfo.PlayerID, playerinfo.NickName, playerinfo.UserIP, this.skingameClass.isSelfCreateRoom);
            // });
        }
    }
    /**
     * 显示录音界面
     */
    private ShowRecordVideo() {
        ShowNodeView("RecordVideo", this.skinRecordVideo, (prefab) => {
            this.skinRecordVideo = this.AddPrefab(prefab, "SkinRecordVideo", 13);
        }, () => {
            if (this.skingameClass.AudioManager.IsRecording())
                this.skinRecordVideo.Show();
            else
                this.skinRecordVideo.Close();
        });
    }
    /**
     * 显示游戏帮助
     */
    private ShowGameHelp() {
        ShowNodeView("GameHelp", this.skinGameHelp, (prefab) => {
            this.skinGameHelp = this.AddPrefab(prefab, "SkinGameHelp", 14);
        }, () => {
            this.skinGameHelp.Show();
        });
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
        if (this.skingameClass.isSelfCreateRoom && this.gameInfo.isTrueReady) {
            //检查IP
            var list = new Array(0);
            for (var i = 0; i < PlayerCount; i++) {
                if (this.skinPlayerControl.skinPlayer[i].IsJoinGame()) {
                    var contain = false;
                    for (var k = 0; k < list.length; k++) {
                        if (list[k].indexOf(i) > 0) {
                            contain = true;
                            break;
                        }
                    }
                    if (!contain) {
                        var list2 = new Array(0);
                        list2.push(i);
                        var iIP = this.skingameClass.TablePlayer[this.skingameClass.GetServerChair(i)].UserIP;
                        for (var j = i + 1; j < PlayerCount; j++) {
                            if (this.skinPlayerControl.skinPlayer[j].IsJoinGame()) {
                                var jIP = this.skingameClass.TablePlayer[this.skingameClass.GetServerChair(j)].UserIP;
                                if (iIP == jIP) {
                                    list2.push(j);
                                }
                            }
                        }
                        if (list2.length > 1)
                            list.push(list2);
                    }
                }
            }
            if (list.length > 0) {
                var tipMsg = "";
                for (var i = 0; i < list.length; i++) {
                    var list3: number[] = list[i];
                    for (var j = 0; j < list3.length; j++) {
                        tipMsg += `玩家:${this.skingameClass.TablePlayer[this.skingameClass.GetServerChair(list3[j])].NickName}`;
                        if (j != list3.length - 1)
                            tipMsg += ",";
                    }
                    tipMsg += "  IP相同";
                    if (i != list.length - 1)
                        tipMsg += "\n";
                }
                console.log("tipMsg:" + tipMsg);
                this.skingameClass.UiManager.ShowTip(tipMsg);
            }
        }
    }
    /**
     * 显示桌费提示
     */
    private ShowTableCostTips() {
        if (!this.skingameClass.isSelfCreateRoom) {
            var tableCostName = TranslateMoneyTypeName(this.skingameClass.RoomClient.TableCostMoneyType);
            var tableCostNum = this.TableCost();
            if (tableCostNum > 0) {
                var tipMsg = `游戏已经开始，每局扣除桌费${tableCostNum}${tableCostName}`;
                this.skingameClass.UiManager.ShowTip(tipMsg);
            }
        }
    }
    /**
     * 计时器结束
     */
    public TimerOver(value: TimeFlag) {
        console.log("TimerOver:" + value);
        switch (value) {
            case TimeFlag.WaitStart: {
                //this.OnButtonExit();
                break;
            }
            case TimeFlag.Interval: {
                this.OnButtonReady();
                break;
            }
            case TimeFlag.RobMaster: {
                this.skinButtonView.OnButtonRob();
                break;
            }
            case TimeFlag.Bet: {
                /*if (this.skingameClass.IsCreateTable())
                    this.skinButtonView.OnButtonBet(2);
                else
                    this.skinButtonView.OnButtonBet();*/
                this.skinButtonView.OnButtonBet();
                break;
            }
            case TimeFlag.SelectCards: {
                this.skinCountDown.Close();
                this.skinButtonView.HideSelectCard();
                var data = new M_NiuNiu_GameMessage.CMD_C_SelectCards();
                data.hasNiu = false;
                this.skingameClass.SendGameData(data);
                break;
            }
            case TimeFlag.OnlyShow: {
                break;
            }
        }
    }
    /**
     * 桌费
     */
    private TableCost() {
        if (this.skingameClass.IsCreateTable()) {
            if (this.tableInfo.tableCostType == TableCostType.TableCreatorPay) {
                if (this.gameInfo.isTrueReady || this.skingameClass.validata || (this.gameInfo.gameCount[0] % 10 == 0)) {
                    this.skingameClass.validata = false;
                    return this.tableInfo.tableCostNum;
                }

            }
            if (this.tableInfo.tableCostType == TableCostType.AAPay) {
                if (this.gameInfo.isTrueReady || this.skingameClass.validata || (this.gameInfo.gameCount[0] % 10 == 0)) {
                    cc.log("检查玩家桌费 AA制钻石" + this.gameInfo.gameCount[1]);
                    this.skingameClass.validata = false;
                    return this.gameInfo.gameCount[1];
                }
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
        if((this.tableInfo.tableCostType == TableCostType.TableCreatorPay)&&(this.tableInfo.tableCreator!=0)){
            return true;
        }
        if (this.skingameClass.UserBagEntity(this.skingameClass.RoomClient.TableCostMoneyType) >= this.TableCost())
            return true;
        else
            return false;
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
        this.skingameClass.UiManager.ShowMsgBox(str, this, () => { this.skingameClass.showPay() })
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
     * 获取总局数
     */
    public GetCurGameCount() {
        return this.gameInfo.GetCurGameCount();
    }
    /**
     * 获取推注文本
     */
    private GetRuleExtendBet(value: ExtendBetType) {
        if (value == ExtendBetType.Enable)
            return "允许闲家推注,";
        else if (value == ExtendBetType.Disable)
            return "不允许闲家推注,";
        return "";
    }
    /**
     * 获取搓牌文本
     */
    private GetRuleRubCard(value: RubCardType) {
        if (value == RubCardType.Enable)
            return "允许搓牌,";
        else if (value == RubCardType.Disable)
            return "不允许搓牌,";
        return "";
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
                IDlist.push(0);
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

    //==================================== 搓牌 =======================================
    /**
     * 跳过搓牌
     */
    public SkipRubCard() {
        if (this.tableInfo.gameModel != GameModel.RobMaster || !this.tableInfo.IsRubCardEnable()) return;
        this.skinPlayerControl.SetSelfLastCardValue(this.gameInfo.rubCardValue);
        this.skinPlayerControl.HideWaitRub();
        this.skinButtonView.HideRubCardBtn();
    }
    /**
     * 搓牌结束
     */
    public RubCardOver() {
        if (this.tableInfo.gameModel != GameModel.RobMaster || !this.tableInfo.IsRubCardEnable()) return;
        this.skinPlayerControl.SetSelfLastCardValue(this.gameInfo.rubCardValue);
        this.skinPlayerControl.HideWaitRub();
        this.skinButtonView.HideRubCardBtn();
        this.OnButtonSelectCard(false);
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
