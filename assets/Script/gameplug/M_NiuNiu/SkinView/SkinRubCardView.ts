import { CommonTexturePath, StageWidth, StageHeight, SelfCardWidth, SelfCardHeight } from "../GameHelp/GameHelp";
import { NiuNiu } from "../GameHelp/INiuNiuClass";
import { SetTextureRes } from "../GameHelp/NiuNiuFunction";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinRubCardView extends cc.Component {
    @property(cc.Node)
    private shapeBg: cc.Node = null;
    @property(cc.Sprite)
    private skinCard: cc.Sprite = null;
    @property(cc.Sprite)
    private skinCardBack: cc.Sprite = null;
    @property([cc.Sprite])
    private img_hand: cc.Sprite[] = [];
    @property(cc.SpriteAtlas)
    private spriteAtlas: cc.SpriteAtlas = null;
    private startPos: cc.Vec2 = null;
    private startScale: number = 3;
    private cardPos: cc.Vec2 = null;
    private tarCardPos: cc.Vec2 = cc.p(236, -274.2);//手动计算
    private tarCardScale: number = 1;
    private limitX: number = 0;
    private limitY: number = 0;

    onLoad() {
        this.node.width = StageWidth;
        this.node.height = StageHeight;
        this.skinCard.node.width = SelfCardWidth;
        this.skinCard.node.height = SelfCardHeight;
        this.skinCard.node.scale = this.startScale;
        this.skinCardBack.node.width = SelfCardWidth;
        this.skinCardBack.node.height = SelfCardHeight;
        this.skinCardBack.node.scale = this.startScale*1.1;
        this.skinCardBack.node.on(cc.Node.EventType.TOUCH_START, this.OnEventBegin, this);
        this.skinCardBack.node.on(cc.Node.EventType.TOUCH_MOVE, this.OnEventMove, this);
        this.skinCardBack.node.on(cc.Node.EventType.TOUCH_END, this.OnEventEnd, this);
        this.limitX = SelfCardWidth * this.startScale / 2;
        this.limitY = -SelfCardHeight * this.startScale / 2;
        this.node.active = false;
    }
    public Init() {
        this.Clear();
    }
    public Clear() {
        this.UnAni();
        this.node.active = false;
    }
    private UnAni() {
        this.unscheduleAllCallbacks();
        this.shapeBg.stopAllActions();
        this.skinCard.node.stopAllActions();
    }
    public Show(value: number) {
        this.UnAni();
        this.SetHand(true);
        this.node.active = true;
        this.shapeBg.active = true;
        this.shapeBg.opacity = 166;
        this.skinCard.spriteFrame = this.GetCardsRes(value);
        this.skinCard.node.position = cc.p(0, 0);
        this.skinCard.node.scale = this.startScale;
        this.cardPos = cc.p(0, 0);
        this.skinCardBack.node.position = this.cardPos;
        this.skinCardBack.node.active = true;
    }
    private OnEventBegin(e: cc.Event.EventTouch) {
        if (!cc.isValid(e) || !(e instanceof cc.Event.EventTouch)) return;
        this.startPos = e.getLocation();
    }
    private OnEventMove(e: cc.Event.EventTouch) {
        if (!cc.isValid(e) || !(e instanceof cc.Event.EventTouch)) return;
        let curPos = e.getLocation();
        let spaceX = curPos.x - this.startPos.x;
        let spaceY = curPos.y - this.startPos.y;
        this.SetCardBackPos(cc.p(this.cardPos.x + spaceX, this.cardPos.y + spaceY));
        this.CheckEnd();
    }
    private OnEventEnd(e: cc.Event.EventTouch) {
        if (!cc.isValid(e) || !(e instanceof cc.Event.EventTouch)) return;
        let endPos = e.getLocation();
        this.cardPos = this.skinCardBack.node.position;
        this.CheckEnd();
    }
    private SetCardBackPos(pos: cc.Vec2) {
        if (pos.x > 0)
            this.skinCardBack.node.x = pos.x;
        if (pos.y < 0)
            this.skinCardBack.node.y = pos.y;
    }
    private SetHand(value: boolean) {
        this.img_hand[0].node.active = value;
        this.img_hand[1].node.active = value;
    }
    private CheckEnd() {
        if (this.skinCardBack.node.x > this.limitX || this.skinCardBack.node.y < this.limitY) {
            console.log("RubCard Over");
            this.ShowAniRubCard();
        }
    }
    private ShowAniRubCard() {
        this.skinCardBack.node.active = false;
        this.SetHand(false);
        let callAction = cc.callFunc(function () {
            this.skinCard.node.runAction(cc.sequence(cc.spawn(cc.moveTo(0.5, this.tarCardPos), cc.scaleTo(0.5, this.tarCardScale)), cc.callFunc(this.AniOver, this)));
        }, this);
        this.shapeBg.runAction(cc.sequence(cc.fadeTo(0.5, 0), callAction));
    }
    private AniOver() {
        console.log("AniOver");
        this.node.active = false;
        NiuNiu.ins.iview.RubCardOver();
    }

    public GetCardsRes(value: number): cc.SpriteFrame {
        var index = Math.floor(value / 16) * 14 + Math.floor(value % 16) - 2;
        if (index == -1 || index == 13 || index == 27 || index == 41)
            index += 13;
        else {
            switch (value) {
                case 0x41: {
                    index = 27;
                    break;
                }
                case 0x42: {
                    index = 13;
                    break;
                }
            }
        }
        return this.spriteAtlas.getSpriteFrame("Poker_" + index);
    }
}