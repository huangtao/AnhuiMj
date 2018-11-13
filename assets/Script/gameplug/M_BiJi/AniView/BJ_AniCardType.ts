
import { CardType, TexturePath } from "../GameHelp/BJ_GameHelp";
import { SetTextureRes } from "../GameHelp/BJ_BiJiFunction";
import { BiJi } from "../GameHelp/BJ_IBiJiClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AniCardType extends cc.Component {

    @property(cc.Sprite)
    private img_bg: cc.Sprite=null;
    @property(cc.Sprite)
    private img_cardtype: cc.Sprite=null;
    /**
     * 回调函数
     */
    private fun: () => void;
    /**
     * 回调对象
     */
    private obj: any;

    onLoad() {
        this.node.active = false;
    }
    public Init() {
        if (!this.node.active) return;
        this.img_bg.node.stopAllActions();
        this.img_cardtype.node.stopAllActions();
        this.node.active = false;
    }
    public Destroy() {
        if (!this.node.active) return;
        this.img_bg.node.stopAllActions();
        this.img_cardtype.node.stopAllActions();
        this.node.active = false;
        if ((null != this.fun) && (null != this.obj)) {
            this.fun.call(this.obj);
        }
    }
    public Show(value: number, obj1: any = null, fun1: () => void = null) {
        this.fun = fun1;
        this.obj = obj1;
        this.node.active = true;
        this.img_cardtype.spriteFrame = null;
        SetTextureRes(TexturePath + "CardType/cardtype_" + value, this.img_cardtype);
        if (value > CardType.HighCard)
            this.AniHasNiu();
        else
            this.AniNoNiu();
    }
    /**
     * 显示非动画
     */
    public ShowUnAni(value: number, obj1: any = null, fun1: () => void = null) {
        this.fun = fun1;
        this.obj = obj1;
        this.node.active = true;
        this.img_cardtype.spriteFrame = null;
        SetTextureRes(TexturePath + "CardType/cardtype_" + value, this.img_cardtype);
        if (value > CardType.HighCard)
            this.img_bg.node.active = true;
        else
            this.img_bg.node.active = false;
        this.onFinished();
    }
    private AniHasNiu() {
        this.img_bg.node.scale = 0;
        this.img_bg.node.opacity = 0;
        this.img_cardtype.node.opacity = 0;
        var callAction = cc.callFunc(this.onFinished, this);
        var time = 0.2 * BiJi.ins.iclass.GetSpeed();
        var action0 = cc.sequence(cc.spawn(cc.scaleTo(time, 1, 1), cc.fadeTo(time, 255), cc.moveTo(time, 12, 0)), cc.moveTo(time, 0, 0));
        var action1 = cc.sequence(cc.fadeTo(time, 0), cc.spawn(cc.scaleTo(time, 0.6, 0.6), cc.fadeTo(time, 255)), cc.scaleTo(time, 0.8, 0.8), callAction);
        this.img_bg.node.runAction(action0);
        this.img_cardtype.node.runAction(action1);
    }
    private AniNoNiu() {
        this.img_bg.node.opacity = 0;
        this.img_cardtype.node.scale = 1.2;
        this.img_cardtype.node.opacity = 0;
        var callAction = cc.callFunc(this.onFinished, this);
        var time = 0.2 * BiJi.ins.iclass.GetSpeed();
        var action0 = cc.sequence(cc.spawn(cc.scaleTo(time, 0.6, 0.6), cc.fadeTo(time, 255)), cc.scaleTo(time, 0.8, 0.8), callAction);
        this.img_cardtype.node.runAction(action0);
    }
    private onFinished() {
        console.log("onFinished");
        if ((null != this.fun) && (null != this.obj)) {
            this.fun.call(this.obj);
        }
    }
    //==================================== 计时器 开始 =======================================
    public TimePause() {
        if (!this.node.active) return;
        this.img_bg.node.pauseAllActions();
        this.img_cardtype.node.pauseAllActions();
    }
    public TimeResume() {
        if (!this.node.active) return;
        this.img_bg.node.resumeAllActions();
        this.img_cardtype.node.resumeAllActions();
    }
    //==================================== 计时器 结束 =======================================
}
