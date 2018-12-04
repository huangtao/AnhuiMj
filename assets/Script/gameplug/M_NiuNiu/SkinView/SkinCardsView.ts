import AniCardType from "../AniView/AniCardType";
import { CardsCount, CardWidth, StageWidth, StageHeight, SelfCardWidth, SelfCardHeight } from "../GameHelp/GameHelp";
import { SetTextureRes } from "../GameHelp/NiuNiuFunction";
import GameLogic from "../GameHelp/GameLogic";
import { NiuNiu } from "../GameHelp/INiuNiuClass";
import VoicePlayer from "../GameHelp/VoicePlayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinCardsView extends cc.Component {

    @property(cc.Prefab)
    prefab_aniCardType: cc.Prefab = null;
    //扑克
    private img_card: cc.Sprite[];
    //finish
    private img_finish: cc.Sprite;
    /**
     * 是否是自己的牌视图
     */
    private isSelf: boolean;
    /**
     * 当前牌值
     */
    private cardValue: number[];
    /**
     * 是否可以点击牌
     */
    private canClick: boolean;
    /**
     * 牌型动画
     */
    private skinAniCardType: AniCardType;
    /**
     * 等待搓牌
     */
    private waitRub: boolean;

    onLoad() {
        this.cardValue = new Array(CardsCount);
        this.img_card = new Array(CardsCount);
        for (var i = 0; i < this.img_card.length; i++) {
            this.img_card[i] = this.node.getChildByName("img_card" + i).getComponent<cc.Sprite>(cc.Sprite);
            this.img_card[i].node.active = false;
        }
        this.img_finish = this.node.getChildByName("img_finish").getComponent<cc.Sprite>(cc.Sprite);
        const prefab0 = cc.instantiate(this.prefab_aniCardType);
        this.node.addChild(prefab0);
        this.skinAniCardType = prefab0.getComponent<AniCardType>(AniCardType);
        this.canClick = false;
        this.waitRub = false;
        for (let i = 0; i < this.img_card.length; i++) {
            this.img_card[i].node.on(cc.Node.EventType.TOUCH_START, () => { this.OnButtonCard(i) }, this);
        }
    }
    public Init() {
        this.RemoveCardsTween();
        this.skinAniCardType.Init();
        this.canClick = false;
        this.waitRub = false;
    }
    public SetChair(chair: number) {
        this.isSelf = chair == 0;
        if (chair == 0) {
            this.node.x = (232 + this.node.width) / 2 + 10;
            this.node.y = (this.node.height - 116) / 2;
        }
        else if (chair == 1 || chair == 2) {
            this.node.x = -((this.node.width + 116) / 2 + (210 - this.node.width));
            this.node.y = (this.node.height - 160) / 2;
        }
        else if (chair == 3) {
            this.node.x = 0;
            this.node.y = -((this.node.height + 116) / 2 + (110 - this.node.height));
        }
        else {
            this.node.x = (this.node.width + 116) / 2 + 10;
            this.node.y = (this.node.height - 160) / 2;
        }
        if (this.isSelf) {
            this.skinAniCardType.node.y = 65;//85;
        }
        else {
            this.skinAniCardType.node.y = -35;
        }
    }
    public Reset() {
        if (this.isSelf) {
            for (var i = 0; i < this.img_card.length; i++) {
                this.img_card[i].node.active = false;
                this.img_card[i].node.width = SelfCardWidth;
                this.img_card[i].node.height = SelfCardHeight;
                this.img_card[i].node.y = 0;
                this.img_card[i].node.x = -230 + 115 * i;
                this.cardValue[i] = 0;
                //SetTextureRes(GameLogic.GetCardUrl(0), this.img_card[i]);
                this.img_card[i].spriteFrame = NiuNiu.ins.iview.GetCardsRes(0);
            }
        }
        else {
            for (var i = 0; i < this.img_card.length; i++) {
                this.img_card[i].node.active = false;
                this.img_card[i].node.x = -50 + 25 * i;
                this.img_card[i].node.width = SelfCardWidth/1.5;
                this.img_card[i].node.height = SelfCardHeight/1.5;
                this.cardValue[i] = 0;
                //SetTextureRes(GameLogic.GetCardUrl(0), this.img_card[i]);
                this.img_card[i].spriteFrame = NiuNiu.ins.iview.GetCardsRes(0);
            }
        }
        this.img_finish.node.active = false;
        this.skinAniCardType.node.active = false;
    }
    public Destroy() {
        this.RemoveCardsTween();
        this.skinAniCardType.Destroy();
    }

    //==================================== 设置 开始 =======================================
    /**
     * 设置牌
     */
    public SetCards(value: number[]) {
        for (var i = 0; i < this.img_card.length; i++) {
            if (i < value.length) {
                this.SetCardValue(i, value[i]);
            }
            else {
                this.img_card[i].node.active = false;
            }
        }
    }
    /**
     * 设置finish
     */
    public SetFinish(value: boolean) {
        this.img_finish.node.active = value;
    }
    /**
     * 设置结果亮牌是的牌显示
     */
    public SetResultCards(cards: number[], cardType: number, gender: number = 0, ani: boolean = true) {
        this.SetOnSelectCardsPos();
        if (cardType > 0) {
            for (var i = 0; i < cards.length; i++) {
                this.SetCardValue(i, cards[i]);
                if (i < 3)
                    this.img_card[i].node.x = -60 + i * 25;
                else
                    this.img_card[i].node.x = 60 - (CardsCount - i - 1) * 25;
            }
        }
        else {
            this.SetCards(cards);
        }
        this.SetCardType(cardType, gender, ani);
    }
    /**
     * 显示牌型
     */
    private SetCardType(value: number, gender: number = 0, ani: boolean = true) {
        VoicePlayer.PlayCardType(value, NiuNiu.ins.iclass.VoiceType(), gender);
        if (ani)
            this.skinAniCardType.Show(value);
        else
            this.skinAniCardType.ShowUnAni(value);
    }
    /**
     * 根据牌索引设置指定位置牌
     */
    public SetCardValue(index: number, value: number) {
        this.cardValue[index] = value;
        this.img_card[index].node.active = true;
        //SetTextureRes(GameLogic.GetCardUrl(value), this.img_card[index]);
        this.img_card[index].spriteFrame = NiuNiu.ins.iview.GetCardsRes(value);
    }
    /**
     * 设置搓牌值
     */
    public SetRubCardValue(index: number, value: number) {
        this.cardValue[index] = value;
        this.img_card[index].node.active = true;
        this.img_card[index].spriteFrame = NiuNiu.ins.iview.GetCardsRes(value);
        this.waitRub = true;
    }
    /**
     * 设置是否可以点击牌
     */
    public SetCanClick(value: boolean) {
        this.canClick = value;
    }
    /**
     * 设置等待搓牌
     */
    public SetWaitRub(value: boolean) {
        this.waitRub = value;
    }
    /**
     *  选牌完成时的牌显示
     */
    public OnSelectCards() {
        this.RemoveCardsTween();
        this.SetOnSelectCardsPos();
        for (var i = 0; i < this.img_card.length; i++) {
            this.img_card[i].spriteFrame = NiuNiu.ins.iview.GetCardsRes(0);
        }
    }
    /**
     * 自己选牌完成
     */
    public OnSelfSelectCards(cards: number[], cardType: number, gender: number) {
        /*this.RemoveCardsTween();
        this.SetOnSelectCardsPos();
        for (var i = 0; i < this.img_card.length; i++) {
            this.img_card[i].spriteFrame = NiuNiu.ins.iview.GetCardsRes(value[i]);
        }*/
        this.RemoveCardsTween();
        this.SetOnSelectCardsPos();
        if (cardType > 0) {
            for (var i = 0; i < cards.length; i++) {
                this.SetCardValue(i, cards[i]);
                if (i < 3)
                    this.img_card[i].node.x = -60 + i * 25;
                else
                    this.img_card[i].node.x = 60 - (CardsCount - i - 1) * 25;
            }
        }
        else {
            this.SetCards(cards);
        }
        this.SetCardType(cardType, gender, false);
    }
    /**
     * 设置选牌后的牌位置
     */
    private SetOnSelectCardsPos() {
        if (this.isSelf) {
            for (var i = 0; i < this.img_card.length; i++) {
                this.img_card[i].node.width = 78;
                this.img_card[i].node.height = 100;
                this.img_card[i].node.x = -50 + i * 25;
                this.img_card[i].node.y = 100;//120;
            }
        }
        else {
            for (var i = 0; i < this.img_card.length; i++) {
                this.img_card[i].node.y = 0;
            }
        }
    }
    /**
     * 根据索引弹起牌
     */
    public UpCardsByIndex(value: number[]) {
        console.log("UpCardsByIndex:" + value);
        console.log(this.img_card);
        for (var i = 0; i < this.img_card.length; i++) {
            this.img_card[i].node.y = 0;
        }
        for (var i = 0; i < value.length; i++) {
            this.img_card[value[i]].node.y = 30;
        }
        console.log(this.img_card);
        VoicePlayer.PlaySysSound("bull_select_poker");
        this.CountCard();
    }
    //==================================== 设置 结束 =======================================

    //==================================== 动画 开始 =======================================
    /**
     * 翻牌动画
     */
    public AniCardsFlip(value: number[]) {
        for (var i = 0; i < value.length; i++) {
            this.AniCardValue(i, value[i]);
        }
    }
    /**
     * 翻牌动画
     */
    private AniCardValue(index: number, value: number) {
        this.cardValue[index] = value;
        //SetTextureRes(GameLogic.GetCardUrl(0), this.img_card[index]);
        this.img_card[index].spriteFrame = NiuNiu.ins.iview.GetCardsRes(0);
        this.img_card[index].node.scaleX = 1;
        var callAction = cc.callFunc(function () {
            //SetTextureRes(GameLogic.GetCardUrl(value), this.img_card[index]);
            this.img_card[index].spriteFrame = NiuNiu.ins.iview.GetCardsRes(value);
            this.img_card[index].node.runAction(cc.scaleTo(0.1 * NiuNiu.ins.iclass.GetSpeed(), 1, 1));
        }, this);
        var action = cc.sequence(cc.scaleTo(0.1 * NiuNiu.ins.iclass.GetSpeed(), 0, 1), callAction);
        this.img_card[index].node.runAction(action);
    }
    /**
     * 关闭动画
     */
    public StopAni() {
        for (var i = 0; i < this.img_card.length; i++) {
            this.img_card[i].node.stopAllActions();
            this.img_card[i].node.scale = 1;
        }
    }
    //==================================== 动画 结束 =======================================

    //==================================== 扑克相关 开始 =======================================
    /**
     * 点击牌事件
     */
    private OnButtonCard(value: number) {
        if (!this.canClick || NiuNiu.ins.iclass.IsVideo()) return;
        if (this.waitRub) {
            if (value == 4)
                NiuNiu.ins.iview.SkipRubCard();
            return;
        }
        if (this.IsCardUp(value)) {
            this.DownCard(value);
        }
        else {
            if (this.GetUpCardCount() < 3) {
                this.UpCard(value);
            }
        }
        VoicePlayer.PlaySysSound("bull_select_poker");
    }
    /**
     * 计算牌值提示
     */
    private CountCard() {
        console.log("CountCard:");
        for (var i = 0; i < this.img_card.length; i++) {
            console.log(this.img_card[i].node.position);
        }
        var list = this.GetUpCardList();
        console.log(list);
        NiuNiu.ins.iview.OnButtonCard(this.GetUpCardList());
    }
    /**
     * 获取选择的牌数
     */
    private GetUpCardCount() {
        var count = 0;
        for (var i = 0; i < this.img_card.length; i++) {
            if (this.IsCardUp(i))
                count++;
        }
        return count;
    }
    /**
     * 获取选择的牌
     */
    private GetUpCardList() {
        var list: number[] = new Array(0);
        for (var i = 0; i < this.img_card.length; i++) {
            if (this.IsCardUp(i))
                list.push(this.cardValue[i]);
        }
        return list;
    }
    /**
     * 该张牌是否弹起
     */
    private IsCardUp(value: number) {
        if (this.img_card[value].node.y > 0)
            return true;
        else
            return false;
    }
    /**
     * 弹起牌
     */
    private UpCard(value: number) {
        this.img_card[value].node.stopAllActions();
        var tarPos = cc.p(this.img_card[value].node.x, 30);
        var callAction = cc.callFunc(function () {
            this.img_card[value].node.y = 30;
            this.CountCard();
        }, this);
        var action = cc.sequence(cc.moveTo(0.05 * NiuNiu.ins.iclass.GetSpeed(), tarPos), callAction);
        this.img_card[value].node.runAction(action);
    }
    /**
     * 放下牌
     */
    private DownCard(value: number) {
        this.img_card[value].node.stopAllActions();
        var tarPos = cc.p(this.img_card[value].node.x, 0);
        var callAction = cc.callFunc(function () {
            this.img_card[value].node.y = 0;
            this.CountCard();
        }, this);
        var action = cc.sequence(cc.moveTo(0.05 * NiuNiu.ins.iclass.GetSpeed(), tarPos), callAction);
        this.img_card[value].node.runAction(action);
    }
    /**
     * 移除所有牌动画
     */
    public RemoveCardsTween() {
        this.StopAni();
    }

    //==================================== 扑克相关 结束 =======================================

    //==================================== 辅助 开始 =======================================
    /**
     * 获取单张牌的位置
     */
    public GetCardPos(index: number) {
        var pos = this.img_card[index].node.position;
        pos.x += this.node.x;
        pos.y += this.node.y;
        return pos;
    }
    /**
     * 获取牌的缩放值
     */
    public GetCardsScale() {
        return this.img_card[0].node.width / CardWidth;
    }
    /**
     * 获取弹起牌的索引
     */
    public GetUpIndexList() {
        var list: number[] = new Array(0);
        for (var i = 0; i < this.img_card.length; i++) {
            if (this.IsCardUp(i))
                list.push(i);
        }
        return list;
    }
    //==================================== 辅助 结束 =======================================

    //==================================== 计时器 开始 =======================================
    public TimePause() {
        for (var i = 0; i < this.img_card.length; i++) {
            this.img_card[i].node.pauseAllActions();
        }
        this.skinAniCardType.TimePause();
    }
    public TimeResume() {
        for (var i = 0; i < this.img_card.length; i++) {
            this.img_card[i].node.resumeAllActions();
        }
        this.skinAniCardType.TimeResume();
    }
    //==================================== 计时器 结束 =======================================
}
