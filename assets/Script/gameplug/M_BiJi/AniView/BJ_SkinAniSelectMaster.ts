import { TexturePath } from "../GameHelp/BJ_GameHelp";
import { BiJi } from "../GameHelp/BJ_IBiJiClass";
import VoicePlayer from "../GameHelp/BJ_VoicePlayer";

const { ccclass, property } = cc._decorator;

export default class SkinAniSelectMaster extends cc.Component {

    /**
     * 回调函数
     */
    private fun: () => void;
    /**
     * 回调对象
     */
    private obj: any;
    /**
     * 图集
     */
    private spriteAtlas: cc.SpriteAtlas;
    /**
     * 是否横版
     */
    private isHor: boolean;
    /**
     * 动画图集个数
     */
    private count: number = 2;
    /**
     * 图集索引
     */
    private index: number;

    onLoad() {
        this.addComponent<cc.Sprite>(cc.Sprite);
    }
    public Show(chair: number, obj1: any = null, fun1: () => void = null) {
        this.isHor = chair == 0 || chair == 3;
        this.fun = fun1;
        this.obj = obj1;
        this.getComponent<cc.Sprite>(cc.Sprite).spriteFrame = null;
        this.node.active = true;
        if (this.isHor) {
            //横版
            cc.loader.loadRes(TexturePath + "altas/Ani_HSelectMaster", cc.SpriteAtlas, function (err, spriteFrame) {
                if (err) {
                    cc.error(err);
                    this.AniOver();
                    return;
                }
                this.spriteAtlas = spriteFrame;
                this.ShowAni();
            }.bind(this));
        }
        else {
            //竖版
            cc.loader.loadRes(TexturePath + "altas/Ani_VSelectMaster", cc.SpriteAtlas, function (err, spriteFrame) {
                if (err) {
                    cc.error(err);
                    this.AniOver();
                    return;
                }
                this.spriteAtlas = spriteFrame;
                this.ShowAni();
            }.bind(this));
        }
    }
    public Init() {
        this.Destroy();
    }
    public Destroy() {
        if (!this.node.active) return;
        this.unscheduleAllCallbacks();
        this.node.active = false;
    }
    private ShowAni() {
        this.index = 0;
        VoicePlayer.PlaySysSound("bull_host_selecting");
        this.schedule(this.SetSprite, 0.03 * BiJi.ins.iclass.GetSpeed());
    }
    private SetSprite() {
        if (this.index >= this.count * 2 - 1) {
            this.unschedule(this.SetSprite);
            this.AniOver();
            return;
        }
        var name = this.isHor ? "hsm_" : "vsm_";
        this.getComponent<cc.Sprite>(cc.Sprite).spriteFrame = this.spriteAtlas.getSpriteFrame(name + (this.index % this.count + 1));
        this.index++;
    }
    private AniOver() {
        this.node.active = false;
        if ((null != this.fun) && (null != this.obj)) {
            this.fun.call(this.obj);
        }
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
