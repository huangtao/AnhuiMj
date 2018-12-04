import { M_NiuNiu_GameMessage } from "../../../CommonSrc/M_NiuNiu_GameMessage";
import { StageWidth, StageHeight, CommonTexturePath } from "../GameHelp/GameHelp";
import { NiuNiu } from "../GameHelp/INiuNiuClass";
import SkinAniSelectMaster from "./SkinAniSelectMaster";
import SkinPlayerControl from "../SkinView/SkinPlayerControl";
import VoicePlayer from "../GameHelp/VoicePlayer";
import { SetTextureRes } from "../GameHelp/NiuNiuFunction";

const { ccclass, property } = cc._decorator;

export default class AniSelectMaster extends cc.Component {

    /**
     * 选择庄家动画时的当前庄家索引
     */
    private ani_playerIndex: number = 0;
    /**
     * 下注开始消息
     */
    private msg_betStart: M_NiuNiu_GameMessage.CMD_S_BetStart;
    /**
     * 动画容器
     */
    private group_ani: cc.Node;
    /**
     * 背景遮罩
     */
    private shapeBg: cc.Node;
    /**
     * 对象池
     */
    private poolNode: cc.NodePool = new cc.NodePool();

    onLoad() {
        this.node.width = StageWidth;
        this.node.height = StageHeight;
        this.group_ani = new cc.Node;
        this.group_ani.width = this.node.width;
        this.group_ani.height = this.node.height;
        this.node.addChild(this.group_ani);
        this.node.active = false;
        this.msg_betStart = null;
        this.CreateBg();
    }
    onDestroy() {
        this.poolNode.clear();
    }
    private CreateSkinAniSelectMaster() {
        if (this.poolNode.size() > 0) {
            let node0 = this.poolNode.get();
            if (cc.isValid(node0))
                return node0;
        }
        let node0 = new cc.Node();
        node0.addComponent<SkinAniSelectMaster>(SkinAniSelectMaster);
        return node0;
    }
    /**
     * 创建背景
     */
    private CreateBg() {
        this.shapeBg = new cc.Node();
        var img = this.shapeBg.addComponent<cc.Sprite>(cc.Sprite);
        img.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        //SetTextureRes(CommonTexturePath + "default_sprite", img);
        this.shapeBg.width = StageWidth;
        this.shapeBg.height = StageHeight;
        this.shapeBg.color = cc.hexToColor("#000000");
        this.shapeBg.opacity = 126;
        this.shapeBg.addComponent<cc.Button>(cc.Button);
        this.node.addChild(this.shapeBg, -1);
    }
    public Init() {
        if (!this.node.active) return;
        this.node.active = false;
        this.msg_betStart = null;
        this.Clear();
    }
    /**
     * 后台挂起时销毁动画用
     */
    public Destroy() {
        if (!this.node.active) return;
        this.node.active = false;
        if (this.msg_betStart != null) {
            NiuNiu.ins.iview.Rec_BetStart(this.msg_betStart, true);
            this.msg_betStart = null;
        }
        this.Clear();
    }
    private Clear() {
        while (this.group_ani.childrenCount > 0) {
            this.group_ani.children[0].getComponent<SkinAniSelectMaster>(SkinAniSelectMaster).Destroy();
            this.poolNode.put(this.group_ani.children[0]);
        }
    }
    /**
     * 显示动画
     */
    public ShowAni(data: M_NiuNiu_GameMessage.CMD_S_BetStart) {
        this.node.active = true;
        this.msg_betStart = data;
        if (data.masterList.length > 1) {
            this.AniSelectMaster();
        }
        else {
            this.AniLockMaster();
        }
    }
    /**
     * 选择庄家动画
     */
    private AniSelectMaster() {
        var count = this.msg_betStart.masterList.length;
        var masterlist = new Array(count);
        this.ani_playerIndex = 0;
        var aniCount = count;
        this.shapeBg.active = true;
        this.SelectMaster(aniCount);
    }
    /**
     * 选择庄家
     */
    private SelectMaster(aniCount: number) {
        var serverChair = this.msg_betStart.masterList[this.ani_playerIndex % this.msg_betStart.masterList.length];
        var chair = NiuNiu.ins.iclass.GetClientChair(serverChair);
        var node0 = this.CreateSkinAniSelectMaster();
        var skinAniSelectMaster = node0.getComponent<SkinAniSelectMaster>(SkinAniSelectMaster);
        var playerPos = this.GetPlayerPos(chair);
        skinAniSelectMaster.node.x = playerPos.x;
        skinAniSelectMaster.node.y = playerPos.y;
        this.group_ani.addChild(node0);
        skinAniSelectMaster.Show(chair, this, () => {
            this.poolNode.put(node0);
            this.ani_playerIndex++;
            if (this.ani_playerIndex > aniCount && this.msg_betStart.master == serverChair) {
                this.AniLockMaster();
            }
            else {
                this.SelectMaster(aniCount);
            }
        });
    }
    private GetPlayerPos(chair: number) {
        var skinPlayer = SkinPlayerControl.Instance.skinPlayer[chair];
        return cc.p(skinPlayer.node.x, skinPlayer.node.y);
    }
    /**
     * 锁定庄家动画
     */
    private AniLockMaster() {
        this.shapeBg.active = true;
        var master = NiuNiu.ins.iclass.GetClientChair(this.msg_betStart.master);
        SkinPlayerControl.Instance.skinPlayer[master].ShowAniLockMaster(master, this, this.AniOver);
    }
    /**
     * 动画结束
     */
    private AniOver() {
        console.log("AniOver");
        this.node.active = false;
        if (this.msg_betStart != null) {
            NiuNiu.ins.iview.Rec_BetStart(this.msg_betStart, true);
            this.msg_betStart = null;
        }
    }

    //==================================== 计时器 开始 =======================================
    public TimePause() {
        if (!this.node.active) return;
        for (var i = 0; i < this.group_ani.childrenCount; i++) {
            var skinAniSelectMaster = this.group_ani.children[i].getComponent<SkinAniSelectMaster>(SkinAniSelectMaster);
            skinAniSelectMaster.TimePause();
        }
    }
    public TimeResume() {
        if (!this.node.active) return;
        for (var i = 0; i < this.group_ani.childrenCount; i++) {
            var skinAniSelectMaster = this.group_ani.children[i].getComponent<SkinAniSelectMaster>(SkinAniSelectMaster);
            skinAniSelectMaster.TimeResume();
        }
    }
    //==================================== 计时器 结束 =======================================
}
