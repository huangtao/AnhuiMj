import AniPlayerDeal from "./AniPlayerDeal";
import { M_NiuNiu_GameMessage } from "../../../CommonSrc/M_NiuNiu_GameMessage";
import { StageWidth, StageHeight, PlayerCount, GameModel } from "../GameHelp/GameHelp";
import { NiuNiu } from "../GameHelp/INiuNiuClass";
import GameLogic from "../GameHelp/GameLogic";
import SkinPlayerControl from "../SkinView/SkinPlayerControl";
import VoicePlayer from "../GameHelp/VoicePlayer";

const { ccclass, property } = cc._decorator;

export default class AniDealControl extends cc.Component {

    /**
     * 单个玩家的发牌动画
     */
    private aniPlayerDeal: AniPlayerDeal[];
    /**
     * 牌值
     */
    private cardsValue: number[];
    /**
     * 当前发牌座位号索引
     */
    private aniChair = 0;
    /**
     * 发牌动画索引
     */
    private aniDealIndex = 0;
    /**
     * 游戏开始消息
     */
    private msg_gameStart: M_NiuNiu_GameMessage.CMD_S_GameStart;

    onLoad() {
        this.node.width = StageWidth;
        this.node.height = StageHeight;
        this.node.active = false;
        this.msg_gameStart = null;
        this.aniPlayerDeal = new Array(PlayerCount);
        for (var i = 0; i < this.aniPlayerDeal.length; i++) {
            var node0 = new cc.Node();
            this.aniPlayerDeal[i] = node0.addComponent<AniPlayerDeal>(AniPlayerDeal);
            this.node.addChild(node0);
            this.aniPlayerDeal[i].SetChair(i);
        }
    }
    public Init() {
        if (!this.node.active) return;
        this.unscheduleAllCallbacks();
        for (var i = 0; i < this.aniPlayerDeal.length; i++) {
            this.aniPlayerDeal[i].Init();
        }
        this.node.active = false;
        this.msg_gameStart = null;
    }
    /**
     * 后台挂起时销毁动画用
     */
    public Destroy() {
        if (!this.node.active) return;
        this.unscheduleAllCallbacks();
        for (var i = 0; i < this.aniPlayerDeal.length; i++) {
            this.aniPlayerDeal[i].Destroy();
        }
        this.node.active = false;
        if (this.msg_gameStart != null) {
            NiuNiu.ins.iview.Rec_GameStart(this.msg_gameStart, true);
            this.msg_gameStart = null;
        }
    }
    /**
     * 显示动画
     */
    public ShowAni(data: M_NiuNiu_GameMessage.CMD_S_GameStart) {
        this.node.active = true;
        this.msg_gameStart = data;
        this.cardsValue = new Array(data.cards.length);
        GameLogic.CopyArray(this.cardsValue, data.cards, data.cards.length);
        this.aniChair = 0;
        this.aniDealIndex = 0;
        //this.schedule(this.AniChild, 0.3 * NiuNiu.ins.iclass.GetSpeed());
        for (let i = 0; i < this.aniPlayerDeal.length; i++) {
            if (this.IsPlayerJoin(i)) {
                this.ShowPlayerDeal(i);
            }
            else {
                this.AniPlayerDealOver();
            }
        }
    }
    /**
     * 子动画
     */
    private AniChild() {
        if (this.aniChair < this.aniPlayerDeal.length) {
            if (this.IsPlayerJoin(this.aniChair)) {
                this.ShowPlayerDeal(this.aniChair);
                this.aniChair++;
            }
            else {
                this.aniChair++;
                this.AniPlayerDealOver();
                this.AniChild();
            }
            if (this.aniChair >= this.aniPlayerDeal.length) {
                this.unscheduleAllCallbacks();
            }
        }
        else {
            this.unscheduleAllCallbacks();
        }
    }
    /**
     * 显示玩家发牌动画
     */
    private ShowPlayerDeal(value: number) {
        if (value == 0) {
            this.aniPlayerDeal[value].ShowAni(this.cardsValue, this, this.AniPlayerDealOver);
        }
        else {
            var cards = new Array(this.cardsValue.length);
            for (var i = 0; i < cards.length; i++) {
                cards[i] = 0;
            }
            this.aniPlayerDeal[value].ShowAni(cards, this, this.AniPlayerDealOver);
        }
    }
    /**
     * 某个玩家发牌动画结束
     */
    private AniPlayerDealOver() {
        console.log("AniPlayerDealOver");
        this.aniDealIndex++;
        if (this.aniDealIndex >= this.aniPlayerDeal.length) {
            this.AniDealOver();
        }
    }
    /**
     * 发牌动画完成
     * 判断是否要播放锁定庄家动画或是动画结束
     */
    private AniDealOver() {
        console.log("AniDealOver");
        if (!GameLogic.IsGameModelRobMaster(this.cardsValue.length)) {
            var master = NiuNiu.ins.iclass.GetClientChair(this.msg_gameStart.master);
            SkinPlayerControl.Instance.skinPlayer[master].ShowAniLockMaster(master, this, this.AniOver);
        }
        else {
            this.AniOver();
        }
    }
    /**
     * 动画结束
     */
    private AniOver() {
        console.log("AniOver");
        for (var i = 0; i < this.aniPlayerDeal.length; i++) {
            this.aniPlayerDeal[i].Clear();
        }
        this.node.active = false;
        if (this.msg_gameStart != null) {
            NiuNiu.ins.iview.Rec_GameStart(this.msg_gameStart, true);
            this.msg_gameStart = null;
        }
    }
    /**
     * 玩家是否参与游戏
     */
    private IsPlayerJoin(value: number) {
        return SkinPlayerControl.Instance.skinPlayer[value].IsJoinGame();
    }

    //==================================== 计时器 开始 =======================================
    public TimePause() {
        if (!this.node.active) return;
        for (var i = 0; i < this.aniPlayerDeal.length; i++) {
            this.aniPlayerDeal[i].TimePause();
        }
        cc.director.getScheduler().pauseTarget(this);
    }
    public TimeResume() {
        if (!this.node.active) return;
        for (var i = 0; i < this.aniPlayerDeal.length; i++) {
            this.aniPlayerDeal[i].TimeResume();
        }
        cc.director.getScheduler().resumeTarget(this);
    }
    //==================================== 计时器 结束 =======================================
}
