import { TexturePath } from "../GameHelp/GameHelp";
import { NiuNiu } from "../GameHelp/INiuNiuClass";
import VoicePlayer from "../GameHelp/VoicePlayer";

const { ccclass, property } = cc._decorator;

export default class SkinAniLockMaster extends cc.Component {

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
    private count: number = 3;
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
        this.node.active = true;
        if (this.isHor) {
            this.node.x = 14;
            this.node.y = 8;
            //横版
            cc.loader.loadRes(TexturePath + "altas/Ani_HLockMaster", cc.SpriteAtlas, function (err, spriteFrame) {
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
            this.node.x = 20;
            this.node.y = 14;
            //竖版
            cc.loader.loadRes(TexturePath + "altas/Ani_VLockMaster", cc.SpriteAtlas, function (err, spriteFrame) {
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
        VoicePlayer.PlaySysSound("bull_host_selected");
        this.schedule(this.SetSprite, 0.1 * NiuNiu.ins.iclass.GetSpeed());
    }
    private SetSprite() {
        if (this.index >= this.count * 2 - 1) {
            this.unschedule(this.SetSprite);
            this.AniOver();
            return;
        }
        var name = this.isHor ? "hlm_" : "vlm_";
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
