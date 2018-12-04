import SkinAni from "./SkinAni";
import VoicePlayer from "../GameHelp/VoicePlayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AniResultType extends cc.Component {

    /**
     * 赢动画
     */
    @property(cc.Prefab)
    prefab_aniWin: cc.Prefab=null;
    private skinAniWin: SkinAni;
    /**
     * 输动画
     */
    @property(cc.Prefab)
    prefab_aniLose: cc.Prefab=null;
    private skinAniLose: SkinAni;
    /**
     * 打酱油动画
     */
    @property(cc.Prefab)
    prefab_aniDaJiangYou: cc.Prefab=null;
    private skinAniDaJiangYou: SkinAni;
    /**
     * 回调函数
     */
    private fun: () => void;
    /**
     * 回调对象
     */
    private obj: any;

    onLoad() {
        const prefab0 = cc.instantiate(this.prefab_aniWin);
        this.node.addChild(prefab0);
        this.skinAniWin = prefab0.addComponent<SkinAni>(SkinAni);
        const prefab1 = cc.instantiate(this.prefab_aniLose);
        this.node.addChild(prefab1);
        this.skinAniLose = prefab1.addComponent<SkinAni>(SkinAni);
        const prefab2 = cc.instantiate(this.prefab_aniDaJiangYou);
        this.node.addChild(prefab2);
        this.skinAniDaJiangYou = prefab2.addComponent<SkinAni>(SkinAni);
    }

    /**
     * 后台挂起时销毁动画用
     */
    public Init() {
        if (!this.node.active) return;
        this.skinAniDaJiangYou.Init();
        this.skinAniLose.Init();
        this.skinAniWin.Init();
        this.node.active = false;
    }
    /**
     * 关闭动画
     */
    public Destroy() {
        if (!this.node.active) return;
        this.skinAniDaJiangYou.Destroy();
        this.skinAniLose.Destroy();
        this.skinAniWin.Destroy();
        this.node.active = false;
    }
    /**
     * 显示动画
     */
    public ShowResult(value: number, obj1: any = null, fun1: () => void = null) {
        console.log("ShowResult:" + value);
        this.node.active = true;
        this.fun = fun1;
        this.obj = obj1;
        if (value > 0) {
            VoicePlayer.PlaySysSound("bull_win");
            this.skinAniWin.Show(this, this.AniOver);
        }
        else if (value < 0) {
            VoicePlayer.PlaySysSound("bull_loss");
            this.skinAniLose.Show(this, this.AniOver);
        }
        else {
            VoicePlayer.PlaySysSound("bull_win");
            this.skinAniDaJiangYou.Show(this, this.AniOver);
        }
    }
    /**
     * 动画结束
     */
    public AniOver() {
        console.log("AniOver");
        this.node.active = false;
        if ((null != this.fun) && (null != this.obj)) {
            this.fun.call(this.obj);
        }
    }

    //==================================== 计时器 开始 =======================================
    public TimePause() {
        if (!this.node.active) return;
        this.skinAniDaJiangYou.TimePause();
        this.skinAniLose.TimePause();
        this.skinAniWin.TimePause();
    }
    public TimeResume() {
        if (!this.node.active) return;
        this.skinAniDaJiangYou.TimeResume();
        this.skinAniLose.TimeResume();
        this.skinAniWin.TimeResume();
    }
    //==================================== 计时器 结束 =======================================
}
