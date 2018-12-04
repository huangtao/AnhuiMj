import { SetTextureRes, SetFontRes } from "../GameHelp/NiuNiuFunction";
import { TexturePath, CommonFontPath } from "../GameHelp/GameHelp";
import { NiuNiu } from "../GameHelp/INiuNiuClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinAniWinGold extends cc.Component {

    /**
     * 回调函数
     */
    private fun: () => void;
    /**
     * 回调对象
     */
    private obj: any;
    private animation: cc.Animation;
    /**
     * 赢分动画容器
     */
    @property(cc.Node)
    private group_main: cc.Node = null;
    /**
     * 得分容器
     */
    @property(cc.Node)
    private group_score: cc.Node = null;
    /**
     * 得分背景
     */
    @property(cc.Sprite)
    private img_score: cc.Sprite = null;
    /**
     * 得分组件
     */
    @property(cc.Label)
    private label_score: cc.Label = null;
    /**
     * 字体资源
     */
    @property([cc.BitmapFont])
    private bitmapFont: cc.BitmapFont[] = [];

    onLoad() {
        this.node.active = false;
        this.animation = this.getComponent<cc.Animation>(cc.Animation);
    }
    public Init() {
        if (!this.node.active) return;
        this.animation.stop();
        this.group_score.stopAllActions();
        this.node.active = false;
    }
    public Destroy() {
        if (!this.node.active) return;
        this.animation.stop();
        this.group_score.stopAllActions();
        this.node.active = false;
        if ((null != this.fun) && (null != this.obj)) {
            this.fun.call(this.obj);
        }
    }
    public Show(chair: number, score: number, obj1: any = null, fun1: () => void = null) {
        this.fun = fun1;
        this.obj = obj1;
        this.node.active = true;
        if (score >= 0) {
            SetTextureRes(TexturePath + "niuniures/resultScoreBg_yellow", this.img_score);
            //SetFontRes(CommonFontPath + "common_font_gold", this.label_score);
            this.label_score.font = this.bitmapFont[0];
            this.label_score.string = "+" + score;
            this.group_main.active = true;
            this.animation.play();
        }
        else {
            SetTextureRes(TexturePath + "niuniures/resultScoreBg_blue", this.img_score);
            //SetFontRes(CommonFontPath + "common_font_blue", this.label_score);
            this.label_score.font = this.bitmapFont[1];
            this.label_score.string = "" + score;
            this.group_main.active = false;
        }
        this.AniScore(chair);
    }
    public ShowResultScore(chair: number, score: number) {
        this.node.active = true;
        this.group_main.active = false;
        if (score >= 0) {
            SetTextureRes(TexturePath + "niuniures/resultScoreBg_yellow", this.img_score);
            this.label_score.font = this.bitmapFont[0];
            this.label_score.string = "+" + score;
        }
        else {
            SetTextureRes(TexturePath + "niuniures/resultScoreBg_blue", this.img_score);
            this.label_score.font = this.bitmapFont[1];
            this.label_score.string = "" + score;
        }
        var end = 0;
        if (chair == 0) {
            end = 25;
        }
        else if (chair == 3) {
            end = -10;
        }
        else {
            end = 25;
        }
        this.group_score.y = end;
        this.group_score.opacity = 255;
    }
    private AniScore(chair: number) {
        var start = 0;
        var end = 0;
        if (chair == 0) {
            start = -58;
            end = 25;
        }
        else if (chair == 3) {
            start = -58;
            end = -10;
        }
        else {
            start = -77;
            end = 25;
        }
        this.group_score.y = start;
        this.group_score.opacity = 0;
        var tarPos = cc.p(this.group_score.x, end);
        var action = cc.sequence(cc.scaleTo(0.25 * NiuNiu.ins.iclass.GetSpeed(), 1, 1), cc.spawn(cc.moveTo(0.75 * NiuNiu.ins.iclass.GetSpeed(),
            tarPos), cc.fadeTo(0.75 * NiuNiu.ins.iclass.GetSpeed(), 255)), cc.callFunc(this.onFinished, this));
        this.group_score.runAction(action);
    }
    private onFinished() {
        //this.node.active = false;
        if ((null != this.fun) && (null != this.obj)) {
            this.fun.call(this.obj);
        }
    }
    //==================================== 计时器 开始 =======================================
    public TimePause() {
        if (!this.node.active) return;
        this.animation.pause();
        this.group_score.pauseAllActions();
    }
    public TimeResume() {
        if (!this.node.active) return;
        this.animation.resume();
        this.group_score.resumeAllActions();
    }
    //==================================== 计时器 结束 =======================================
}
