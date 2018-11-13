import { M_BiJi_GameMessage } from "../../../CommonSrc/M_BiJi_GameMessage";
import SkinPlayerControl from "../SkinView/BJ_SkinPlayerControl";
import GameLogic from "../GameHelp/BJ_GameLogic";
import { BiJi } from "../GameHelp/BJ_IBiJiClass";
import VoicePlayer from "../GameHelp/BJ_VoicePlayer";
import SelectCards from "../SkinView/BJ_SelectCards";

const { ccclass, property } = cc._decorator;

export default class AniFlip extends cc.Component {

    /**
     * 牌值
     */
    // private cardsValue: number[];
    /**
     * 选牌开始消息
     */
    private msg_selectCardsStart: M_BiJi_GameMessage.CMD_S_GameResult;

    /**
  * 座位号列表
  */
    private chairList: number[];

    onLoad() {
        // init logic

    }
    public Init() {
        this.Destroy();
    }
    /**
     * 后台挂起时销毁动画用
     */
    public Destroy() {
        if (!this.node.active) return;
        //     SkinPlayerControl.Instance.skinPlayer[0].skinCardsView.StopAni();
        for (var i = 0; i < 5; i++) {
            if (SkinPlayerControl.Instance.skinPlayer[i].IsJoinGame) {
                SkinPlayerControl.Instance.skinPlayer[i].skinCardsView.StopAni();
            }
        }
        this.unscheduleAllCallbacks();
        //  this.node.active = false;
    }
    /**
     * 显示动画
     */
    public ShowAni(data: M_BiJi_GameMessage.CMD_S_GameResult) {
        //  this.node.active = true;
        cc.log("-----准备执行翻牌动画-----");

        this.msg_selectCardsStart = data;
        for (var i = 0; i < 5; i++) {
            if (SkinPlayerControl.Instance.skinPlayer[i].IsJoinGame() && !SkinPlayerControl.Instance.skinPlayer[i].IsDropCard()) {
                break;
            }
            if (i == 5) {
                this.AniOver();
            }
        }
        this.chairList = new Array(data.chair.length);
        for (var i = 0; i < data.chair.length; i++) {
            this.chairList[i] = BiJi.ins.iclass.GetClientChair(data.chair[i]);
        }
        for (var i = 0; i < 5; i++) {
            if (SkinPlayerControl.Instance.skinPlayer[i].IsJoinGame() && !SkinPlayerControl.Instance.skinPlayer[i].IsDropCard()) {
                var index = this.chairList.indexOf(i);
                if (i != 0) {
                    SkinPlayerControl.Instance.skinPlayer[i].skinCardsView.AniCardsFlip(this.GetCardsByIndex(data.headcards, index), 0);
                }
                if(i==0){
                var cards = new Array(3);
                cards[0] = this.msg_selectCardsStart.headcards[index*3];
                cards[1] = this.msg_selectCardsStart.headcards[index*3+1];
                cards[2] = this.msg_selectCardsStart.headcards[index*3+2];
                var cardType = BiJi.ins.iview.GetCardType(cards);                
                VoicePlayer.PlayCardType(cardType,null,null);
                }
                

                SkinPlayerControl.Instance.skinPlayer[i].skinCardsView.SetScoreList(0, data.headscore[index], i, null);
            }else if(SkinPlayerControl.Instance.skinPlayer[i].IsDropCard()){
                SkinPlayerControl.Instance.skinPlayer[i].skinCardsView.SetScoreMaskQiPaiPos(i);
                var index = this.chairList.indexOf(i);
                SkinPlayerControl.Instance.skinPlayer[i].skinCardsView.SetScoreList(3, data.score[index], i, null); 
            }
        }
        this.scheduleOnce(this.HeadOver, 1);
        //  this.scheduleOnce(this.AniOver, 0.5 * BiJi.ins.iclass.GetSpeed());
        VoicePlayer.PlayPublicSound("btdp_seccard");
    }
    private HeadOver() {
        for (var i = 0; i < 5; i++) {
            if (SkinPlayerControl.Instance.skinPlayer[i].IsJoinGame() && !SkinPlayerControl.Instance.skinPlayer[i].IsDropCard()) {
                var index = this.chairList.indexOf(i);
                if (i != 0) {
                    SkinPlayerControl.Instance.skinPlayer[i].skinCardsView.AniCardsFlip(this.GetCardsByIndex(this.msg_selectCardsStart.oppocards, index), 3);
                }
                if(i==0){
                var cards = new Array(3);
                cards[0] = this.msg_selectCardsStart.oppocards[index*3];
                cards[1] = this.msg_selectCardsStart.oppocards[index*3+1];
                cards[2] = this.msg_selectCardsStart.oppocards[index*3+2];
                var cardType = BiJi.ins.iview.GetCardType(cards);                
                VoicePlayer.PlayCardType(cardType,null,null);
                }
                

                SkinPlayerControl.Instance.skinPlayer[i].skinCardsView.SetScoreList(1, this.msg_selectCardsStart.opposcore[index], i, null);
            }
        }
        this.scheduleOnce(this.OppoOver, 1);
    }
    private OppoOver() {
        for (var i = 0; i < 5; i++) {
            if (SkinPlayerControl.Instance.skinPlayer[i].IsJoinGame() && !SkinPlayerControl.Instance.skinPlayer[i].IsDropCard()) {
                var index = this.chairList.indexOf(i);
                if (i != 0) {
                    SkinPlayerControl.Instance.skinPlayer[i].skinCardsView.AniCardsFlip(this.GetCardsByIndex(this.msg_selectCardsStart.lastcards, index), 6);
                }
                if(i==0){
                var cards = new Array(3);
                cards[0] = this.msg_selectCardsStart.lastcards[index*3];
                cards[1] = this.msg_selectCardsStart.lastcards[index*3+1];
                cards[2] = this.msg_selectCardsStart.lastcards[index*3+2];
                var cardType = BiJi.ins.iview.GetCardType(cards);                
                VoicePlayer.PlayCardType(cardType,null,null);
                }

                SkinPlayerControl.Instance.skinPlayer[i].skinCardsView.SetScoreList(2, this.msg_selectCardsStart.lastscore[index], i, null);
                
            }
        }
        this.scheduleOnce(this.LastOver, 0.5 * BiJi.ins.iclass.GetSpeed());
    }
    private LastOver() {
        for (var i = 0; i < 5; i++) {
            if (SkinPlayerControl.Instance.skinPlayer[i].IsJoinGame()&& !SkinPlayerControl.Instance.skinPlayer[i].IsDropCard()) {
                var index = this.chairList.indexOf(i);
                var chair = BiJi.ins.iclass.GetServerChair(i);
                SkinPlayerControl.Instance.skinPlayer[i].skinCardsView.SetScoreList(3, this.msg_selectCardsStart.score[index], i, null);                
                SkinPlayerControl.Instance.skinPlayer[i].skinCardsView.SetScoreList(4, this.msg_selectCardsStart.xiScore[index], i, this.msg_selectCardsStart.xiScoreType[chair]);
            }
        }
        this.scheduleOnce(this.AniOver, 0.5 * BiJi.ins.iclass.GetSpeed());
    }
    private GetCardsByIndex(allcards: number[], value: number) {
        var cards = new Array(3);
        for (var i = 0; i < 3; i++) {
            cards[i] = allcards[value * 3 + i];
        }
        return cards;
    }
    /**
     * 动画完成
     */
    private AniOver() {
        console.log("AniOver");
        //  SkinPlayerControl.Instance.skinPlayer[0].skinCardsView.StopAni();
        //    this.node.active = false;
        BiJi.ins.iview.Rec_GameResult(this.msg_selectCardsStart, true);
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
