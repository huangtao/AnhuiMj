import { M_BiJi_GameMessage } from "../../../CommonSrc/M_BiJi_GameMessage";
import { StageHeight, StageWidth, PlayerCount, LastCardIndex } from "../GameHelp/BJ_GameHelp";
import SkinPlayerControl from "../SkinView/BJ_SkinPlayerControl";
import { BiJi } from "../GameHelp/BJ_IBiJiClass";
import GameLogic from "../GameHelp/BJ_GameLogic";
import SkinCard from "../SkinView/BJ_SkinCard";
import VoicePlayer from "../GameHelp/BJ_VoicePlayer";

const { ccclass, property } = cc._decorator;

export default class AniPlayerDealLast extends cc.Component {

    /**
     * 牌值
     */
    private cardValue: number;
    /**
     * 索引
     */
    private index: number;
    /**
     * 动画索引
     */
    private aniIndex: number;
    /**
     * 选牌开始消息
     */
    private msg_selectCardsStart: M_BiJi_GameMessage.CMD_S_SelectCardsStart;
    /**
     * 对象池
     */
    private poolNode: cc.NodePool = new cc.NodePool("SkinCard");

    onLoad() {
        this.node.width = StageWidth;
        this.node.height = StageHeight
        this.node.active = false;
    }
    onDestroy() {
        this.poolNode.clear();
    }
    private CreateSkinCard() {
        if (this.poolNode.size() > 0) {
            let node0 = this.poolNode.get();
            if (cc.isValid(node0))
                return node0;
        }
        let node0 = new cc.Node();
        node0.addComponent<SkinCard>(SkinCard);
        return node0;
    }
    public Init() {
        this.Destroy();
    }
    /**
     * 后台挂起时销毁动画用
     */
    public Destroy() {
        if (!this.node.active) return;
        this.Clear();
        this.node.active = false;
    }
    private Clear() {
        this.unscheduleAllCallbacks();
        while (this.node.childrenCount > 0) {
            this.node.children[0].stopAllActions();
            this.poolNode.put(this.node.children[0]);
        }
    }
    /**
     * 显示动画
     */
    public ShowAni(data: M_BiJi_GameMessage.CMD_S_SelectCardsStart) {
        this.node.active = true;
        this.Clear();
        this.msg_selectCardsStart = data;
        this.cardValue = data.card;
        VoicePlayer.PlaySysSound("bull_faPai");
        this.index = 0;
        this.aniIndex = 0;
        //this.schedule(this.AniChild, 0.2 * BiJi.ins.iclass.GetSpeed());
        for (let i = 0; i < PlayerCount; i++) {
            if (this.IsPlayerJoin(i)) {
                this.DealLast(i);
            }
            else {
                this.AniDealOver();
            }
        }
    }
    /**
     * 单张发牌动画
     */
    private AniChild() {
        if (this.index < PlayerCount) {
            if (this.IsPlayerJoin(this.index)) {
                this.DealLast(this.index);
                this.index++;
            }
            else {
                this.index++;
                this.AniDealOver();
                this.AniChild();
            }
            if (this.index >= PlayerCount) {
                this.unscheduleAllCallbacks();
            }
        }
        else {
            this.unscheduleAllCallbacks();
        }
    }
    /**
     * 发最后一张牌
     */
    private DealLast(chair: number) {
        var cardBack = this.CreateSkinCard();
        cardBack.getComponent<SkinCard>(SkinCard);
        cardBack.x = 0;
        cardBack.y = 0;
        this.node.addChild(cardBack);
        var tarPos = SkinPlayerControl.Instance.GetCardPos(chair, LastCardIndex);
        var tarScale = SkinPlayerControl.Instance.skinPlayer[chair].skinCardsView.GetCardsScale();
        var callAction = cc.callFunc(function () {
            this.SetCardValue(chair);
            this.poolNode.put(cardBack);
            this.AniDealOver();
        }, this);
        var time = 0.3 * BiJi.ins.iclass.GetSpeed();
        var action = cc.sequence(cc.spawn(cc.moveTo(time, tarPos.x, tarPos.y), cc.scaleTo(time, tarScale, tarScale)), callAction);
        cardBack.runAction(action);
    }
    /**
     * 发牌结束
     */
    private AniDealOver() {
        this.aniIndex++;
        if (this.aniIndex >= PlayerCount) {
            this.AniOver();
        }
    }
    /**
     * 动画完成
     */
    private AniOver() {
        console.log("AniOver");
        this.node.active = false;
        BiJi.ins.iview.Rec_SelectCardsStart(this.msg_selectCardsStart, true);
    }
    /**
     * 重置牌背位置
     */
    private ResetCardBackPos(obj: cc.Node) {
        obj.x = 0;
        obj.y = 0;
        obj.scaleX = 1;
        obj.scaleY = 1;
    }
    /**
     * 设置牌值
     */
    private SetCardValue(chair: number) {
        if (chair == 0) {
            SkinPlayerControl.Instance.skinPlayer[chair].skinCardsView.SetCardValue(LastCardIndex, this.cardValue);
        }
        else {
            SkinPlayerControl.Instance.skinPlayer[chair].skinCardsView.SetCardValue(LastCardIndex, 0);
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
        for (var i = 0; i < this.node.childrenCount; i++) {
            var cardback = <cc.Node>this.node.children[i];
            cardback.pauseAllActions();
        }
        cc.director.getScheduler().pauseTarget(this);
    }
    public TimeResume() {
        if (!this.node.active) return;
        for (var i = 0; i < this.node.childrenCount; i++) {
            var cardback = <cc.Node>this.node.children[i];
            cardback.resumeAllActions();
        }
        cc.director.getScheduler().resumeTarget(this);
    }
    //==================================== 计时器 结束 =======================================
}
