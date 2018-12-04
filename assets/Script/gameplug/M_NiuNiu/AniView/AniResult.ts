import AniResultType from "./AniResultType";
import AniChip from "./AniChip";
import { M_NiuNiu_GameMessage } from "../../../CommonSrc/M_NiuNiu_GameMessage";
import { NiuNiu } from "../GameHelp/INiuNiuClass";
import SkinPlayerControl from "../SkinView/SkinPlayerControl";
import { CardsCount } from "../GameHelp/GameHelp";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AniResult extends cc.Component {

    /**
     * 结果输赢动画
     */
    @property(cc.Prefab)
    prefab_aniResultType: cc.Prefab = null;
    private aniResultType: AniResultType;
    /**
     * 筹码动画
     */
    private aniChip: AniChip;
    /**
     * 座位号列表
     */
    private chairList: number[];
    /**
     * 当前座位号索引
     */
    private ani_chairIndex: number = 0;
    /**
     * 结果消息
     */
    private msg_gameResult: M_NiuNiu_GameMessage.CMD_S_GameResult;
    /**
     * 计分板消息
     */
    private msg_scoreView: M_NiuNiu_GameMessage.CMD_S_ScoreView;
    /**
     * 庄家变更消息
     */
    private msg_masterChange: M_NiuNiu_GameMessage.CMD_S_MasterChange;
    /**
     * 玩家记分
     */
    private msg_playerScore: M_NiuNiu_GameMessage.CMD_S_PlayerScore;

    onLoad() {
        const prefab0 = cc.instantiate(this.prefab_aniResultType);
        this.node.addChild(prefab0);
        this.aniResultType = prefab0.getComponent<AniResultType>(AniResultType);
        var node0 = new cc.Node();
        this.aniChip = node0.addComponent<AniChip>(AniChip);
        this.node.addChild(node0);
        this.node.active = false;
    }

    public Init() {
        if (!this.node.active) return;
        this.aniResultType.Init();
        this.aniChip.Init();
        this.unscheduleAllCallbacks();
        this.node.active = false;
        this.msg_gameResult = null;
        this.msg_scoreView = null;
        this.msg_masterChange = null;
        this.msg_playerScore = null;
    }
    /**
     * 后台挂起时销毁动画用
     */
    public Destroy() {
        if (!this.node.active) return;
        this.aniResultType.Destroy();
        this.aniChip.Destroy();
        this.unscheduleAllCallbacks();
        this.node.active = false;
        if (this.msg_gameResult != null) {
            NiuNiu.ins.iview.Rec_GameResult(this.msg_gameResult, true);
            this.msg_gameResult = null;
        }
        if (this.msg_scoreView != null) {
            NiuNiu.ins.iview.Rec_ScoreView(this.msg_scoreView, true);
            this.msg_scoreView = null;
        }
        if (this.msg_masterChange != null) {
            NiuNiu.ins.iview.Rec_MasterChange(this.msg_masterChange, true);
            this.msg_masterChange = null;
        }
        if (this.msg_playerScore != null) {
            NiuNiu.ins.iview.Rec_PlayerScore(this.msg_playerScore, true);
            this.msg_playerScore = null;
        }
    }
    /**
     * 显示动画
     */
    public ShowAni(data: M_NiuNiu_GameMessage.CMD_S_GameResult) {
        this.node.active = true;
        this.msg_gameResult = data;
        this.chairList = new Array(data.chair.length);
        for (let i = 0; i < data.chair.length; i++) {
            this.chairList[i] = NiuNiu.ins.iclass.GetClientChair(data.chair[i]);
        }
        this.ani_chairIndex = 0;
        this.schedule(this.ShowResultCards, 0.8 * NiuNiu.ins.iclass.GetSpeed());
    }
    /**
     * 亮牌
     */
    private ShowResultCards() {
        var master = NiuNiu.ins.iview.Master();
        if (this.ani_chairIndex >= this.chairList.length) {
            var index = this.chairList.indexOf(master);
            if (index >= 0 && master != 0) {
                var chair = this.chairList[index];
                var cards = this.GetCardsByIndex(index);
                var cardType = this.msg_gameResult.cardType[index];
                var skinPlayer = SkinPlayerControl.Instance.skinPlayer[chair];
                skinPlayer.skinCardsView.SetResultCards(cards, cardType, skinPlayer.userGender);
            }
            this.unschedule(this.ShowResultCards);
            this.AniShowCardsOver();
            return;
        }
        var chair = this.chairList[this.ani_chairIndex];
        if (chair != master && chair != 0) {
            var cards = this.GetCardsByIndex(this.ani_chairIndex);
            var cardType = this.msg_gameResult.cardType[this.ani_chairIndex];
            var skinPlayer = SkinPlayerControl.Instance.skinPlayer[chair];
            skinPlayer.skinCardsView.SetResultCards(cards, cardType, skinPlayer.userGender);
        }
        this.ani_chairIndex++;
        if (this.ani_chairIndex <= this.chairList.length && chair == master) {
            this.ShowResultCards();
        }
    }
    /**
     * 设置计分板消息
     * 在动画播放完毕时再显示计分板
     */
    public SetScoreView(data: M_NiuNiu_GameMessage.CMD_S_ScoreView) {
        if (this.node.active) {
            this.msg_scoreView = data;
        }
        else {
            NiuNiu.ins.iview.Rec_ScoreView(data, true);
        }
    }
    /**
     * 设置玩家变更消息
     * 同上
     */
    public SetMasterChange(data: M_NiuNiu_GameMessage.CMD_S_MasterChange) {
        if (this.node.active) {
            this.msg_masterChange = data;
        }
        else {
            NiuNiu.ins.iview.Rec_MasterChange(data, true);
        }
    }
    /**
     * 设置玩家余额
     * 同上
     */
    public SetPlayerScore(data: M_NiuNiu_GameMessage.CMD_S_PlayerScore) {
        if (this.node.active) {
            this.msg_playerScore = data;
        }
        else {
            NiuNiu.ins.iview.Rec_PlayerScore(data, true);
        }
    }
    /**
     * 显示玩家牌结束
     */
    private AniShowCardsOver() {
        console.log("AniShowCardsOver");
        var index = this.chairList.indexOf(0);
        if (index >= 0) {
            var score = this.msg_gameResult.score[index];
            this.scheduleOnce(this.AniShowCardsOverFun, 0.5 * NiuNiu.ins.iclass.GetSpeed());
        }
        else {
            this.AniShowResultTypeOver();
        }
    }
    private AniShowCardsOverFun() {
        console.log("AniShowCardsOverFun");
        var score = this.msg_gameResult.score[this.chairList.indexOf(0)];
        this.aniResultType.ShowResult(score, this, this.AniShowResultTypeOver);
    }
    /**
     * 播放玩家输赢动画结束
     */
    private AniShowResultTypeOver() {
        console.log("AniShowResultTypeOver");
        this.aniChip.ShowAni(this.chairList, this.msg_gameResult.score, this, this.AniShowChipOver);
    }
    private AniShowChipOver() {
        console.log("AniShowChipOver");
        for (var i = 0; i < this.chairList.length; i++) {
            var chair = this.chairList[i];
            var score = this.msg_gameResult.score[i];
            SkinPlayerControl.Instance.skinPlayer[chair].SetUserResultScore(score);
        }
        if (this.msg_playerScore != null) {
            NiuNiu.ins.iview.Rec_PlayerScore(this.msg_playerScore, true);
            this.msg_playerScore = null;
        }
        else {
            NiuNiu.ins.iview.UpdatePlayerScoreByGameResult(this.msg_gameResult);
        }
        this.AniOver();
    }
    /**
     * 动画结束
     */
    private AniOver() {
        console.log("AniOver");
        if (NiuNiu.ins.iclass.IsVideo()) return;
        this.node.active = false;
        /*for (var i = 0; i < this.chairList.length; i++) {
            var chair = this.chairList[i];
            SkinPlayerControl.Instance.skinPlayer[chair].HideUserResultScore();
        }*/
        if (this.msg_gameResult != null) {
            NiuNiu.ins.iview.Rec_GameResult(this.msg_gameResult, true);
            this.msg_gameResult = null;
        }
        if (this.msg_scoreView != null) {
            NiuNiu.ins.iview.Rec_ScoreView(this.msg_scoreView, true);
            this.msg_scoreView = null;
        }
        if (this.msg_masterChange != null) {
            NiuNiu.ins.iview.Rec_MasterChange(this.msg_masterChange, true);
            this.msg_masterChange = null;
        }
        if (this.msg_playerScore != null) {
            NiuNiu.ins.iview.Rec_PlayerScore(this.msg_playerScore, true);
            this.msg_playerScore = null;
        }
    }
    /**
     * 根据索引获取牌
     */
    private GetCardsByIndex(value: number) {
        var cards = new Array(CardsCount);
        for (var i = 0; i < CardsCount; i++) {
            cards[i] = this.msg_gameResult.cards[value * CardsCount + i];
        }
        return cards;
    }

    //==================================== 计时器 开始 =======================================
    public TimePause() {
        if (!this.node.active) return;
        this.aniResultType.TimePause();
        this.aniChip.TimePause();
        cc.director.getScheduler().pauseTarget(this);
    }
    public TimeResume() {
        if (!this.node.active) return;
        this.aniResultType.TimeResume();
        this.aniChip.TimeResume();
        cc.director.getScheduler().resumeTarget(this);
    }
    //==================================== 计时器 结束 =======================================
}
