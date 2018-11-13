import SkinQueryScoreEle from "./BJ_SkinQueryScoreEle";
import SkinQueryScorePlayer from "./BJ_SkinQueryScorePlayer";
import { PlayerCount, SkinQueryScoreParam, ScoreView, TexturePath, StageWidth, StageHeight, CommonTexturePath } from "../GameHelp/BJ_GameHelp";
import { BiJi } from "../GameHelp/BJ_IBiJiClass";
import { SetTextureRes } from "../GameHelp/BJ_BiJiFunction";
import { PlayEffect } from "../../../Tools/Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinQueryScore extends cc.Component {
    @property(cc.Node)
    private groupRoot: cc.Node=null;
    @property(cc.Node)
    private group_main: cc.Node=null;
    @property(cc.Label)
    private label_gamenum: cc.Label=null;
    @property(cc.Label)
    private label_time: cc.Label=null;

    @property(cc.Node)
    private group_queryscoreplayer: cc.Node=null;
    @property(cc.Prefab)
    prefab_player: cc.Prefab=null;
    private skinQueryScorePlayer: SkinQueryScorePlayer[];
    @property(cc.Node)
    private group: cc.Node=null;
    @property(cc.Prefab)
    prefab_ele: cc.Prefab=null;
    @property(cc.Button)
    private btn_close: cc.Button=null;
    private _isExit: boolean = false;
    /**
     * 对象池
     */
    private poolNode: cc.NodePool = new cc.NodePool();

    onLoad() {
      //  this.eleTotal.Init("总计", 0, true);
        this.skinQueryScorePlayer = new Array(PlayerCount);
        for (var i = 0; i < this.skinQueryScorePlayer.length; i++) {
            var node0 = cc.instantiate(this.prefab_player);
            this.skinQueryScorePlayer[i] = node0.getComponent<SkinQueryScorePlayer>(SkinQueryScorePlayer);
            this.skinQueryScorePlayer[i].node.x = -385 + 190 * i;
            this.skinQueryScorePlayer[i].node.y = 0;
            this.group_queryscoreplayer.addChild(node0);
        }
        this.node.active = false;
        this._isExit = false;
        this.btn_close.node.on("click", this.OnButtonClose, this);
    }
    onDestroy() {
        this.poolNode.clear();
    }
    private CreateEle() {
        if (this.poolNode.size() > 0) {
            let node0 = this.poolNode.get();
            if (cc.isValid(node0))
                return node0;
        }
        let node0 = cc.instantiate(this.prefab_ele);
        return node0;
    }
    private ClearEle() {
        while (this.group.childrenCount > 0) {
            this.poolNode.put(this.group.children[0]);
        }
    }
    public Init() {
        this.node.active = false;
    }
    public Show(param: any) {
        if (param == null)
            return;
        this.ShowQueryScore((<SkinQueryScoreParam>param).scoreview, (<SkinQueryScoreParam>param).isExit, (<SkinQueryScoreParam>param).gameCount);
    }
    /**
     * 显示计分板
     * scoreview:计分板数据，isExit是否点击计分板的关闭按钮退出游戏
     */
    public ShowQueryScore(scoreview: ScoreView, isExit: boolean, gameCount: number[]) {
        this.node.active = true;
        this.SetTableInfo(gameCount);
        this.ClearEle();
        if (scoreview != null) {
            this.SetGameNum(scoreview.gameNum.substring(0, 10));
            this._isExit = isExit;
            var total = new Array(scoreview.chairlist.length);
            for (var i = 0; i < total.length; i++) {
                total[i] = 0;
            }
            var j = 0;
            for (var i = scoreview.scorelist.length-1; i >=0; i--) {
                var node1 = this.CreateEle();
                var ele = node1.getComponent<SkinQueryScoreEle>(SkinQueryScoreEle);
                ele.Init((i + 1) + "", (i + 1));
                ele.SetData(scoreview.scorelist[i].data,scoreview.headscorelist[i].data,scoreview.opposcorelist[i].data,scoreview.lastscorelist[i].data);
                ele.SetPoker(scoreview.pokerlist,i);
                ele.SetXiScore(scoreview.xifendata,i)
                this.group.addChild(node1);
                ele.node.y = -145 - 308 * j;
                j++;
                //计算总计
                // for (var j = 0; j < scoreview.scorelist[i].data.length; j++) {
                //     total[j] += scoreview.scorelist[i].data[j];
                // }
            }
            if (scoreview.scorelist.length > 1) {
                this.group.height = scoreview.scorelist.length * 308;
                
            }
            else {
                this.group.height = 300;
            }
            var selfindex = scoreview.chairlist.indexOf(BiJi.ins.iclass.GetServerChair(0));
            this.SetPlayerInfo(scoreview.chairlist, scoreview.namelist, scoreview.facelist, selfindex);
        //    this.eleTotal.SetData(total);
            if (scoreview.scorelist.length > 0)
                this.CheckMaxWin(total);
        }
        else {
            this.SetGameNum("");
            this._isExit = false;
            this.SetPlayerInfo(new Array(0), new Array(0), new Array(0), -1);
       //     this.eleTotal.SetData(new Array(0));
        }
    }
    /**
     * 设置桌子信息
     */
    private SetTableInfo(gamecount: number[]) {
        this.SetTime();
        this.SetGameCount(gamecount);
    }
    /**
     * 设置局号
     */
    private SetGameNum(value: string) {
        this.label_gamenum.node.active = true;
        this.label_gamenum.string = "局号:" + value;
    }
    /**
     * 设置时间
     */
    private SetTime() {
        var time = new Date();
        var strTime = time.getFullYear() + "/" + this.FomatNumber(time.getMonth() + 1) + "/" + this.FomatNumber(time.getDate());
        strTime += " " + this.FomatNumber(time.getHours()) + ":" + this.FomatNumber(time.getMinutes());
        this.label_time.string = strTime;
    }
    /**
     * 转化数字格式
     */
    private FomatNumber(value: number): string {
        var result = "";
        if (value < 10)
            return "0" + value;
        else
            return "" + value;
    }
    /**
     * 设置局数
     */
    private SetGameCount(value: number[]) {
      //  this.label_gamecount.string = "（" + value[0] + "/" + value[1] + "）";
    }
    /**
     * 设置玩家信息
     */
    private SetPlayerInfo(chairlist: number[], namelist: string[], facelist: string[], selfindex: number) {
        for (var i = 0; i < this.skinQueryScorePlayer.length; i++) {
            if (i < chairlist.length) {
                this.skinQueryScorePlayer[i].Show(facelist[i], namelist[i], i == selfindex);
            }
            else {
                this.skinQueryScorePlayer[i].node.active = false;
            }
        }
    }
    /**
     * 检查是否显示大赢家
     */
    private CheckMaxWin(total: number[]) {
        if (this._isExit) {
            var max = 0;
            for (var i = 0; i < total.length; i++) {
                if (total[i] > max) {
                    max = total[i];
                }
            }
            for (var i = 0; i < total.length; i++) {
                if (total[i] >= max) {
                    this.CreateMaxWin(i);
                }
            }
        }
    }
    /**
     * 创建大赢家图标
     */
    private CreateMaxWin(index: number) {
        var node2 = new cc.Node();
        var img_maxwin = node2.addComponent<cc.Sprite>(cc.Sprite);
        SetTextureRes(CommonTexturePath + "commonRes/logo_maxwin", img_maxwin);
        this.group_main.addChild(node2);
        img_maxwin.node.scaleX = 0.6;
        img_maxwin.node.scaleY = 0.6;
        img_maxwin.node.y = -210;
        img_maxwin.node.x = -320 + index * 150;
    }
    /**
     * 退出按钮事件
     */
    private OnButtonClose() {
        PlayEffect(cc.url.raw("resources/Sound/close_panel.mp3"));
        this.node.active = false;
    }
    /**
     * 截图按钮事件
     */
    private OnButtonscreenShot() {
        BiJi.ins.iclass.ScreenShot(true,this.groupRoot);
    }
}
