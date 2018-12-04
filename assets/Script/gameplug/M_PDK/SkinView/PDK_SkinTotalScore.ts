
import SkinTotalScoreItem from "./PDK_SkinTotalScoreItem";
import { PDK } from "../GameHelp/PDK_IClass";


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
    @property(cc.Label)
    private time_label:cc.Label = null;
    @property(cc.Label)
    private jushu:cc.Label = null;
    @property(cc.Label)
    private roomnum:cc.Label = null;
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
        return node0.getComponent<SkinTotalScoreItem>(SkinTotalScoreItem);
    }
    public Show() {
        let scoreview = PDK.ins.iview.GetScoreView();
        this.SetTime();

        let playerCount = scoreview.chairlist.length;
        let total: number[] = new Array(playerCount);
        let bombCount:number[] = new Array(playerCount);
        let zhuaNiaoCount:number[] = new Array(playerCount);
        let menGuoCount:number[] = new Array(playerCount);
        let winCount: number[] = new Array(playerCount);
        for (let i = 0; i < playerCount; i++) {
            total[i] =0;
            bombCount[i] =0;
            zhuaNiaoCount[i] =0;
            menGuoCount[i] =0;
            winCount[i] = 0;
            for(let j = 0;j<scoreview.isWinList.length;j++){
                total[i] += scoreview.datalist[j].data[i];
                if(scoreview.isWinList[j].data[i] == 1){
                    winCount[i] +=1;
                }
            }
            for(let j = 0;j<scoreview.bomblist.length;j++){
                bombCount[i] += scoreview.bomblist[j].data[i];
            }
            for(let j = 0;j<scoreview.zhuaNiaolist.length;j++){
                zhuaNiaoCount[i] += scoreview.zhuaNiaolist[j].data[i];
            }
            
            for(let j = 0;j<scoreview.beiMenGuolist.length;j++){
                let RoundBeiMenguoCount = 0;
               for(let n = 0;n< playerCount;n++){
                 if(scoreview.beiMenGuolist[j].data[n] > 0){
                    RoundBeiMenguoCount += 1;
                 }
               }
               if(RoundBeiMenguoCount > 0 ){
                menGuoCount[i] += 1;
               }
            }
        }

        
        let maxScore = Math.max(...total);
        for (let i = 0; i < playerCount; i++) {
            this.namelist[i] = scoreview.namelist[i];
            this.scorelist[i] = total[i]+"";
            let skinEle = this.CreateEle();
            skinEle.node.x = -500+259*i;
            let isTableCreator = PDK.ins.iview.GetTableInfo().tableCreator;

            skinEle.Show(isTableCreator == PDK.ins.iclass.GetClientChair(scoreview.chairlist[i]),scoreview.facelist[i], scoreview.namelist[i], scoreview.datalist.length, scoreview.IDlist[i], total[i],winCount[i],
                bombCount[i],zhuaNiaoCount[i],menGuoCount[i],scoreview.datalist.length > 0 && total[i] == maxScore);

        }
    }
    private OnButtonInfo() {
     //   BiJi.ins.iview.ShowQueryScore();
     var info ="本局分数："+"\n";
     for(var i = 0;i<this.namelist.length;i++){
         info += this.namelist[i]+":"+this.scorelist[i]+"\n";
     }
  
    PDK.ins.iclass.CopyToClipboardInfo(info);
    }
    private OnButtonShare() {
        PDK.ins.iclass.ScreenShot(true,this.bg);
    }
    private OnButtonClose() {
        PDK.ins.iclass.ForceQuit();
    }



    /**
     * 设置时间
     */
    private SetTime() {
        var time = new Date();
        var strTime = time.getFullYear() + "-" + this.FomatNumber(time.getMonth() + 1) + "-" + this.FomatNumber(time.getDate());
        strTime += " " + this.FomatNumber(time.getHours()) + ":" + this.FomatNumber(time.getMinutes());
        this.time_label.string = strTime+" 结束";
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
}
