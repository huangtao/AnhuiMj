import { BiJi } from "../GameHelp/BJ_IBiJiClass";
import GameLogic from "../GameHelp/BJ_GameLogic";
import SkinChip from "../SkinView/BJ_SkinChip";
import SkinPlayerControl from "../SkinView/BJ_SkinPlayerControl";
import { StageWidth, StageHeight, PlayerCount } from "../GameHelp/BJ_GameHelp";
import VoicePlayer from "../GameHelp/BJ_VoicePlayer";

const { ccclass, property } = cc._decorator;

/**
 * 筹码动画
 * 单个：40*30+400
 * 两个：(40*30+400)*2+200
 */
export default class AniChip extends cc.Component {

    /**
     * 回调函数
     */
    private fun: () => void;
    /**
     * 回调对象
     */
    private obj: any;
    /**
     * 创建筹码下限
     */
    private createMin = 30;
    /**
     * 创建筹码上限
     */
    private createMax = 40;
    /**
     * 创建筹码索引
     */
    private aniIndex: number;
    /**
     * 座位号列表
     * 主要分为三组座位号列表，分别为输的闲家，庄家，赢的闲家，然后根据下面的索引先播放输的闲家筹码飞向庄家动画，
     * 播放完毕再播放庄家筹码飞向赢的闲家动画
     */
    private chairList: ChairList[];
    /**
     * 当前座位号列表索引
     */
    private chairIndex: number;
    /**
     * 对象池
     */
    private poolNode: cc.NodePool = new cc.NodePool();

    onLoad() {
        this.node.width = StageWidth;
        this.node.height = StageHeight;
        this.node.active = false;
    }
    onDestroy() {
        this.poolNode.clear();
    }
    private CreateSkinChip() {
        if (this.poolNode.size() > 0) {
            let node0 = this.poolNode.get();
            if (cc.isValid(node0))
                return node0;
        }
        let node0 = new cc.Node();
        node0.addComponent<SkinChip>(SkinChip);
        return node0;
    }
    public Init() {
        this.Destroy();
    }
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
    public ShowAni(chairList: number[], score: number[], obj1: any = null, fun1: () => void = null) {
        this.node.active = true;
        this.Clear();
        this.fun = fun1;
        this.obj = obj1;
        var master = BiJi.ins.iview.Master();
        console.log("ShowAni:" + master);
        var loseChair = new Array(0);
        var winChair = new Array(0);
        this.chairList = new Array(0);
        for (var i = 0; i < chairList.length; i++) {
            var chair = chairList[i];
            if (chair != master) {
                if (score[i] > 0) {
                    winChair.push(chair);
                }
                else {
                    loseChair.push(chair);
                }
            }
        }
        if (loseChair.length > 0) {
            this.chairList.push(new ChairList(loseChair));
        }
        if (master >= 0 && master < PlayerCount) {
            var masterChair = new Array(0);
            masterChair.push(master);
            this.chairList.push(new ChairList(masterChair));
        }
        if (winChair.length > 0) {
            this.chairList.push(new ChairList(winChair));
        }
        console.log("ShowAni");
        console.log(this.chairList);
        this.chairIndex = 0;
        this.AniChild();
    }
    /**
     * 根据座位号列表索引播放动画
     */
    private AniChild() {
        VoicePlayer.PlaySysSound("bull_gold_move");
        for (var k = 0; k < this.chairList.length - 1; k++) {
            var oriChair = this.chairList[k].list;
            var tarChair = this.chairList[k + 1].list;
            this.aniIndex = 0;
            var createCount = GameLogic.Random(this.createMin, this.createMax);
            for (var i = 0; i < oriChair.length; i++) {
                for (var j = 0; j < tarChair.length; j++) {
                    this.AniChipSingle(createCount, oriChair[i], tarChair[j]);
                }
            }
        }
    }
    /**
     * 单个玩家的筹码动画
     */
    private AniChipSingle(createCount: number, oriChair: number, tarChair: number) {
        this.aniIndex++;
        if (this.aniIndex <= createCount) {
            this.AniCreateChipAndFly(oriChair, tarChair);
            var waittime = GameLogic.Random(10, 30) / 1000 * BiJi.ins.iclass.GetSpeed();
            this.scheduleOnce(function () {
                this.AniChipSingle(createCount, oriChair, tarChair);
            }, waittime);
        }
    }
    /**
     * 筹码创建并移动动画
     */
    private AniCreateChipAndFly(oriChair: number, tarChair: number) {
        var node0 = this.CreateSkinChip();
        var skinChip = node0.getComponent<SkinChip>(SkinChip);
        this.SetChipPos(node0, oriChair);
        this.node.addChild(node0);
        var tarPoint = this.GetPlayerCenterPos(tarChair);
        var callAction = cc.callFunc(function () {
            this.poolNode.put(node0);
            this.AniChipArrive();
        }, this);
        var action = cc.sequence(cc.moveTo(0.4 * BiJi.ins.iclass.GetSpeed(), tarPoint.x, tarPoint.y), callAction);
        skinChip.node.runAction(action);
    }
    /**
     * 筹码抵达目的地
     */
    private AniChipArrive() {
        if (this.node.childrenCount == 0) {
            this.AniOver();
        }
    }
    /**
     * 动画结束
     */
    private AniOver() {
        console.log("AniOver");
        this.node.active = false;
        if ((null != this.fun) && (null != this.obj)) {
            this.fun.call(this.obj);
        }
    }
    /**
     * 设置筹码位置
     */
    private SetChipPos(node0: cc.Node, chair: number) {
        var point = this.GetPlayerCenterPos(chair);
        node0.x = point.x;
        node0.y = point.y;
    }
    /**
     * 获取玩家中心附近位置
     */
    private GetPlayerCenterPos(chair: number) {
        var skinPlayer = SkinPlayerControl.Instance.skinPlayer[chair];
        var width = skinPlayer.node.width / 2 - SkinChip.Width / 2;
        var height = skinPlayer.node.height / 2 - SkinChip.Height / 2;
        var x = skinPlayer.node.x;
        var y = skinPlayer.node.y;
        x += GameLogic.Random(-width, width);
        y += GameLogic.Random(-height, height);
        return cc.p(x, y);
    }

    //==================================== 计时器 开始 =======================================
    public TimePause() {
        if (!this.node.active) return;
        for (var i = 0; i < this.node.childrenCount; i++) {
            this.node.children[i].pauseAllActions();
        }
        cc.director.getScheduler().pauseTarget(this);
    }
    public TimeResume() {
        if (!this.node.active) return;
        for (var i = 0; i < this.node.childrenCount; i++) {
            this.node.children[i].resumeAllActions();
        }
        cc.director.getScheduler().resumeTarget(this);
    }
    //==================================== 计时器 结束 =======================================
}
/**
 * 座位号列表
 */
export class ChairList {
    public list: number[];
    public constructor(value: number[]) {
        this.list = value;
    }
}
