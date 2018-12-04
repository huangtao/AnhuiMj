import SkinCard from "../SkinView/SkinCard";
import { StageWidth, StageHeight, CardsCount, GameModel, CardWidth, CardHeight } from "../GameHelp/GameHelp";
import { NiuNiu } from "../GameHelp/INiuNiuClass";
import GameLogic from "../GameHelp/GameLogic";
import SkinPlayerControl from "../SkinView/SkinPlayerControl";
import VoicePlayer from "../GameHelp/VoicePlayer";

const { ccclass, property } = cc._decorator;

/**
 * 发牌动画
 * 动画时间:count*20+300+count*20
 * 抢庄增加一个翻牌动画300
 */
export default class AniPlayerDeal extends cc.Component {

    /**
     * 牌对象
     */
    private skinCards: SkinCard[];
    /**
     * 牌值
     */
    private cardsValue: number[];
    /**
     * 玩家座位号
     */
    private playerChair: number;
    /**
     * 索引
     */
    private index: number;
    /**
     * 动画索引
     */
    private aniIndex: number;
    /**
     * 回调函数
     */
    private fun: () => void;
    /**
     * 回调对象
     */
    private obj: any;

    onLoad() {
        this.node.width = StageWidth;
        this.node.height = StageHeight;
        this.node.active = false;
        this.skinCards = new Array(CardsCount);
        for (var i = 0; i < CardsCount; i++) {
            this.skinCards[i] = new SkinCard();
            var node0 = new cc.Node();
            this.skinCards[i] = node0.addComponent<SkinCard>(SkinCard);
            this.node.addChild(node0);
            node0.active = false;
        }
    }
    public SetChair(chair: number) {
        this.playerChair = chair;
    }
    public Init() {
        this.Destroy();
    }
    /**
     * 后台挂起时销毁动画用
     */
    public Destroy() {
        if (!this.node.active) return;
        for (var i = 0; i < this.skinCards.length; i++) {
            this.skinCards[i].node.stopAllActions();
        }
        this.unscheduleAllCallbacks();
        this.node.active = false;
    }
    /**
     * 显示动画
     */
    public ShowAni(value: number[], obj1: any = null, fun1: () => void = null) {
        this.fun = fun1;
        this.obj = obj1;
        this.node.active = true;
        this.cardsValue = new Array(value.length);
        GameLogic.CopyArray(this.cardsValue, value, value.length);
        this.CreateCards(value.length);
        this.index = 0;
        this.aniIndex = 0;
        VoicePlayer.PlaySysSound("bull_faPai");
        this.schedule(this.AniChild, 0.02 * NiuNiu.ins.iclass.GetSpeed());
    }
    private AniChild() {
        this.index++;
        console.log("AniChild:" + this.index);
        console.log(this.cardsValue);
        if (this.index <= this.cardsValue.length) {
            this.CardFlay();
            if (this.index >= this.cardsValue.length) {
                this.unschedule(this.AniChild);
            }
        }
    }
    /**
     * 重置牌
     */
    private CreateCards(value: number) {
        var startPos = cc.p(0, 0);
        for (var i = 0; i < value; i++) {
            this.skinCards[i].node.x = startPos.x;
            this.skinCards[i].node.y = startPos.y;
            this.skinCards[i].node.scale = 1;
        }
    }
    /**
     * 隐藏牌
     */
    private HideCards() {
        for (var i = 0; i < this.skinCards.length; i++) {
            this.skinCards[i].node.active = false;
        }
    }
    /**
     * 牌飞动画
     */
    private CardFlay() {
        var skinCard = this.skinCards[this.index - 1];
        skinCard.node.active = true;
        var startPos = cc.p(skinCard.node.x, skinCard.node.y);
        var tarPos = SkinPlayerControl.Instance.GetCardPos(this.playerChair, 0);
        var tarScale = SkinPlayerControl.Instance.skinPlayer[this.playerChair].skinCardsView.GetCardsScale();
        console.log("CardFly:" + startPos + "," + tarPos + "," + tarScale);
        skinCard.Show(startPos, tarPos, 0.3 * NiuNiu.ins.iclass.GetSpeed(), this.playerChair, tarScale, this, this.AniCardFlyOver);
    }
    /**
     * 牌飞动画结束
     */
    private AniCardFlyOver() {
        console.log("AniCardFlyOver:" + this.aniIndex);
        this.aniIndex++;
        if (this.aniIndex >= this.cardsValue.length) {
            this.AniExtendCards();
        }
    }
    /**
     * 牌摊开
     */
    private AniExtendCards() {
        this.index = 0;
        this.aniIndex = 0;
        console.log("AniExtendCards");
        this.schedule(this.AniExtendCardsChild, 0.02 * NiuNiu.ins.iclass.GetSpeed());
    }
    private AniExtendCardsChild() {
        this.index++;
        if (this.index < this.cardsValue.length) {
            this.ExtendCard();
            if (this.index >= this.cardsValue.length - 1) {
                this.unschedule(this.AniExtendCardsChild);
            }
        }
    }
    /**
     * 摊开牌
     */
    private ExtendCard() {
        var tarindex = this.cardsValue.length - this.index;
        var time = tarindex * 0.02 * NiuNiu.ins.iclass.GetSpeed();
        var tarPos = SkinPlayerControl.Instance.GetCardPos(this.playerChair, tarindex);
        var action = cc.sequence(cc.moveTo(time, tarPos.x, tarPos.y), cc.callFunc(this.AniExtendCardOver, this));
        this.skinCards[tarindex].node.runAction(action);
    }
    /**
     * 牌摊开结束
     */
    private AniExtendCardOver() {
        console.log("AniExtendCardOver");
        this.aniIndex++;
        if (this.aniIndex >= this.cardsValue.length - 1) {
            this.AniFlip();
        }
    }
    /**
     * 翻牌
     */
    private AniFlip() {
        console.log("AniFlip");
        if (GameLogic.IsGameModelRobMaster(this.cardsValue.length) && this.playerChair == 0) {
            var cards = new Array(this.cardsValue.length);
            for (var i = 0; i < cards.length; i++) {
                cards[i] = 0;
            }
            this.HideCards();
            SkinPlayerControl.Instance.skinPlayer[this.playerChair].skinCardsView.SetCards(cards);
            SkinPlayerControl.Instance.skinPlayer[this.playerChair].skinCardsView.AniCardsFlip(this.cardsValue);
            this.scheduleOnce(this.AniOver, 0.3 * NiuNiu.ins.iclass.GetSpeed());
            VoicePlayer.PlayPublicSound("btdp_seccard");
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
        //this.node.active = false;
        if ((null != this.fun) && (null != this.obj)) {
            this.fun.call(this.obj);
        }
    }
    /**
     * 清理
     */
    public Clear() {
        this.node.active = false;
    }

    //==================================== 计时器 开始 =======================================
    public TimePause() {
        if (!this.node.active) return;
        for (var i = 0; i < this.skinCards.length; i++) {
            this.skinCards[i].TimePause();
            this.skinCards[i].node.pauseAllActions();
        }
        cc.director.getScheduler().pauseTarget(this);
    }
    public TimeResume() {
        if (!this.node.active) return;
        for (var i = 0; i < this.skinCards.length; i++) {
            this.skinCards[i].TimeResume();
            this.skinCards[i].node.resumeAllActions();
        }
        cc.director.getScheduler().resumeTarget(this);
    }
    //==================================== 计时器 结束 =======================================
}
