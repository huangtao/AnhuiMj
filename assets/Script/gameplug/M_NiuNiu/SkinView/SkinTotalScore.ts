
import SkinTotalScoreEle from "./SkinTotalScoreEle";
import { NiuNiu } from "../GameHelp/INiuNiuClass";
import { TotalScoreData } from "../GameHelp/GameHelp";
import M_NiuNiuView from "../M_NiuNiuView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinTotalScore extends cc.Component {
    @property(cc.Node)
    private bg: cc.Node=null;
    @property(cc.Prefab)
    private prefab_ele: cc.Prefab=null;
    @property(cc.Node)
    private group: cc.Node=null;
    @property(cc.Button)
    private btn_info: cc.Button=null;
    @property(cc.Button)
    private btn_share: cc.Button=null;
    @property(cc.Button)
    private btn_close: cc.Button=null;
    // @property(cc.Label)
    // private time_label:cc.Label = null;
    // @property(cc.Label)
    // private jushu:cc.Label = null;
    // @property(cc.Label)
    // private roomnum:cc.Label = null;
    // @property(cc.Label)
    // private scoretime:cc.Label = null;
    // @property(cc.Label)
    // private xifenmodel:cc.Label = null;
    // @property(cc.Label)
    // private isdropcard:cc.Label = null;
    private namelist:string[] = [];
    private scorelist:string[] =[];

    onLoad() {
        this.btn_info.node.on("click", this.OnButtonInfo, this);
        this.btn_share.node.on("click", this.OnButtonShare, this);
        this.btn_close.node.on("click", this.OnButtonClose, this);
    }
    private CreateEle() {
        let node0 = cc.instantiate(this.prefab_ele);
        this.group.addChild(node0);
        return node0.getComponent<SkinTotalScoreEle>(SkinTotalScoreEle);
    }
    public Show(data: TotalScoreData) {
        const scoreview = data.scoreView;
        const selfID = data.selfID;
        //this.SetTime();
        // this.jushu.string = ""+M_NiuNiuView.Instance.GetCurGameCount();
        // this.roomnum.string =""+M_NiuNiuView.Instance.skingameClass.TableID;
        var total: number[] = new Array(scoreview.chairlist.length);
        for (var i = 0; i < total.length; i++) {
            total[i] = 0;
        }
        if (scoreview != null) {
            for (var i = 0; i < scoreview.scorelist.length; i++) {
                for (var j = 0; j < scoreview.scorelist[i].data.length; j++) {
                    total[j] += scoreview.scorelist[i].data[j];
                }
            }
        }
        let maxScore = Math.max(...total);
        for (let i = 0; i < scoreview.chairlist.length; i++) {
            let skinEle = this.CreateEle();
            skinEle.node.y = 200 - 80 * i;
            skinEle.Show(scoreview.facelist[i], scoreview.namelist[i], scoreview.scorelist.length, scoreview.IDlist[i], total[i], selfID, scoreview.scorelist.length > 0 && total[i] == maxScore);
           // skinEle.SetPeopleGameInfo(scoreview.winhead[i],scoreview.winoppo[i],scoreview.winlast[i],scoreview.xifentime[i],scoreview.allwin[i]);
        }
    }

        /**
     * 设置时间
     */
    private SetTime() {
        var time = new Date();
        var strTime = time.getFullYear() + "-" + this.FomatNumber(time.getMonth() + 1) + "-" + this.FomatNumber(time.getDate());
        strTime += " " + this.FomatNumber(time.getHours()) + ":" + this.FomatNumber(time.getMinutes());
     //   this.time_label.string = strTime+" 结束";
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
    private OnButtonInfo() {
        NiuNiu.ins.iview.ShowQueryScore();
    }
    private OnButtonShare() {
        NiuNiu.ins.iclass.ScreenShot(false,this.bg);
    }
    private OnButtonClose() {
        NiuNiu.ins.iclass.ForceQuit();
    }
}
