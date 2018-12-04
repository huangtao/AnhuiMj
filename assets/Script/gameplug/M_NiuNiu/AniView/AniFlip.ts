import { M_NiuNiu_GameMessage } from "../../../CommonSrc/M_NiuNiu_GameMessage";
import SkinPlayerControl from "../SkinView/SkinPlayerControl";
import GameLogic from "../GameHelp/GameLogic";
import { NiuNiu } from "../GameHelp/INiuNiuClass";
import VoicePlayer from "../GameHelp/VoicePlayer";

const { ccclass, property } = cc._decorator;

export default class AniFlip extends cc.Component {

    /**
     * 牌值
     */
    private cardsValue: number[];
    /**
     * 选牌开始消息
     */
    private msg_selectCardsStart: M_NiuNiu_GameMessage.CMD_S_SelectCardsStart;

    onLoad() {
        // init logic

    }
    public Init(){
        this.Destroy();
    }
    /**
     * 后台挂起时销毁动画用
     */
    public Destroy() {
        if (!this.node.active) return;
        SkinPlayerControl.Instance.skinPlayer[0].skinCardsView.StopAni();
        this.unscheduleAllCallbacks();
        this.node.active = false;
    }
    /**
     * 显示动画
     */
    public ShowAni(data: M_NiuNiu_GameMessage.CMD_S_SelectCardsStart) {
        this.node.active = true;
        this.msg_selectCardsStart = data;
        this.cardsValue = new Array(data.cards.length);
        GameLogic.CopyArray(this.cardsValue, data.cards, data.cards.length);
        SkinPlayerControl.Instance.skinPlayer[0].skinCardsView.AniCardsFlip(data.cards);
        this.scheduleOnce(this.AniOver, 0.5 * NiuNiu.ins.iclass.GetSpeed());
        VoicePlayer.PlayPublicSound("btdp_seccard");
    }
    /**
     * 动画完成
     */
    private AniOver() {
        console.log("AniOver");
        SkinPlayerControl.Instance.skinPlayer[0].skinCardsView.StopAni();
        this.node.active = false;
        NiuNiu.ins.iview.Rec_SelectCardsStart(this.msg_selectCardsStart, true);
    }
    //==================================== 计时器 开始 =======================================
    public TimePause() {
        if (!this.node.active) return;
        cc.director.getScheduler().pauseTarget(this);
    }
    public TimeResume() {
        if (!this.node.active) return;
        cc.director.getScheduler().resumeTarget(this);
    }
    //==================================== 计时器 结束 =======================================
}
