import { SetTextureRes } from "../GameHelp/BJ_BiJiFunction";
import { BiJi } from "../GameHelp/BJ_IBiJiClass";
import { XiScoreType } from "../GameHelp/BJ_GameHelp";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinQueryScoreEle extends cc.Component {

    @property(cc.Sprite)
    private img_bg: cc.Sprite=null;
    @property(cc.Label)
    private label_title: cc.Label=null;
    @property([cc.Label])
    private sumlabel: cc.Label[]=[];
    @property([cc.Label])
    private headlabel: cc.Label[]=[];
    @property([cc.Label])
    private oppolabel: cc.Label[]=[];
    @property([cc.Label])
    private lastlabel: cc.Label[]=[];
    @property([cc.Sprite])
    private oneplayercard: cc.Sprite[]=[];
    @property([cc.Sprite])
    private twoplayercard: cc.Sprite[]=[];
    @property([cc.Sprite])
    private threeplayercard: cc.Sprite[]=[];
    @property([cc.Sprite])
    private fourplayercard: cc.Sprite[]=[];
    @property([cc.Sprite])
    private fiveplayercard: cc.Sprite[]=[];
    @property([cc.Label])
    private xilabel: cc.Label[]=[];

    onLoad() {
    }

    /***
     * 初始化
     * title：标题，showline：是否显示下划线，isTitle：是否是标题
     */
    public Init(title: string, line: number = 0, isTitle: boolean = false) {
        if (title.length > 5)
            this.label_title.string = title.substring(0, 5);
        else
            this.label_title.string = title;
        this.label_title.node.color = cc.hexToColor("#5B1E00");
      //  this.Setbg(line);
    }
    /**
     * 设置背景
     */
    private Setbg(value: number) {
        if (value <= 0) {
            this.img_bg.node.active = false;
            return;
        }
        var res = "";
        if (value % 2 == 0)
            res = "elebg2";
        else
            res = "elebg1";
        SetTextureRes("gameres/gameCommonRes/Texture/MsgBoxV2/" + res, this.img_bg);
    }
    /**
     * 重置label为""
     */
    private Reset() {
        for (var i = 0; i < this.sumlabel.length; i++) {
            this.sumlabel[i].string = "";
            this.headlabel[i].string ="";
            this.oppolabel[i].string ="";
            this.lastlabel[i].string ="";
            this.xilabel[i].string = "";
        }
        for(i = 0;i<this.oneplayercard.length;i++){
            this.oneplayercard[i].spriteFrame = null;
            this.twoplayercard[i].spriteFrame = null;
            this.threeplayercard[i].spriteFrame = null;
            this.fourplayercard[i].spriteFrame = null;
            this.fiveplayercard[i].spriteFrame = null;
        }
    }
    /**
     * 设置数据
     */
    public SetData(data: number[],headdata:number[],oppdata:number[],lastdata:number[]) {
        this.Reset();
        for (var i = 0; i < data.length; i++) {
            this.SetDataValue(i, data[i]);
            this.SetHeadDataValue(i, headdata[i]);
            this.SetOppoDataValue(i, oppdata[i]);
            this.SetLastDataValue(i, lastdata[i]);
        }
    }
    public SetPoker(pokerlist:number[][],jushu:number){
        for(var i = 0;i<pokerlist.length;i++){
            switch(i){
                case 0:for(var j = 0;j<9;j++){
                    this.oneplayercard[j].node.active = true;
                    this.oneplayercard[j].spriteFrame = BiJi.ins.iview.GetSmallCardsRes(pokerlist[0][9*(jushu)+j]);
                }break;
                case 1:for(var j = 0;j<9;j++){
                    this.twoplayercard[j].node.active = true;
                    this.twoplayercard[j].spriteFrame = BiJi.ins.iview.GetSmallCardsRes(pokerlist[1][9*(jushu)+j]);
                }break;
                case 2:for(var j = 0;j<9;j++){
                    this.threeplayercard[j].node.active = true;
                    this.threeplayercard[j].spriteFrame = BiJi.ins.iview.GetSmallCardsRes(pokerlist[2][9*(jushu)+j]);
                }break;
                case 3:for(var j = 0;j<9;j++){
                    this.fourplayercard[j].node.active = true;
                    this.fourplayercard[j].spriteFrame = BiJi.ins.iview.GetSmallCardsRes(pokerlist[3][9*(jushu)+j]);
                }break;
                case 4:for(var j = 0;j<9;j++){
                    this.fiveplayercard[j].node.active = true;
                    this.fiveplayercard[j].spriteFrame = BiJi.ins.iview.GetSmallCardsRes(pokerlist[4][9*(jushu)+j]);
                }break;
            }

        }       
    }
    public SetXiScore(xifenlist:number[][],junshu:number){      
        for(var i = 0;i<xifenlist.length;i++){
        var name = "";
           for(var j =0;j<4;j++){
                name+=this.GetCardTypeToString(xifenlist[i][4*junshu+j])+" ";                
            }
            this.xilabel[i].string = name;
        }

    }
    /**
     * 设置数据值
     */
    private SetDataValue(chair: number, value: number) {
        if (value > 0) {
            this.sumlabel[chair].string = "+" + value;
            this.sumlabel[chair].node.color = cc.hexToColor("#019D1E");
        }
        else {
            this.sumlabel[chair].string = "" + value;
            this.sumlabel[chair].node.color = cc.hexToColor("#ED0302");
        }
    }
        private SetHeadDataValue(chair: number, value: number) {
        if (value > 0) {
            this.headlabel[chair].string = "+" + value;
            this.headlabel[chair].node.color = cc.hexToColor("#019D1E");
        }
        else {
            this.headlabel[chair].string = "" + value;
            this.headlabel[chair].node.color = cc.hexToColor("#ED0302");
        }
    }
        private SetOppoDataValue(chair: number, value: number) {
        if (value > 0) {
            this.oppolabel[chair].string = "+" + value;
            this.oppolabel[chair].node.color = cc.hexToColor("#019D1E");
        }
        else {
            this.oppolabel[chair].string = "" + value;
            this.oppolabel[chair].node.color = cc.hexToColor("#ED0302");
        }
    }
        private SetLastDataValue(chair: number, value: number) {
        if (value > 0) {
            this.lastlabel[chair].string = "+" + value;
            this.lastlabel[chair].node.color = cc.hexToColor("#019D1E");
        }
        else {
            this.lastlabel[chair].string = "" + value;
            this.lastlabel[chair].node.color = cc.hexToColor("#ED0302");
        }
    }

    /**
     * 设置文本
     */
    public SetStr(data: string[], selfindex: number) {
        this.Reset();
        for (var i = 0; i < data.length; i++) {
            if (i == selfindex)
                this.sumlabel[i].node.color = cc.hexToColor("#ff5c00");
            else
                this.sumlabel[i].node.color = cc.hexToColor("#5B1E00");
            if (data[i].length > 5)
                this.sumlabel[i].string = data[i].substring(0, 5);
            else
                this.sumlabel[i].string = data[i];
        }
    }
        public GetCardTypeToString(value:number):string{
        switch(value){
            case XiScoreType.LianShun : return "连顺";
            case XiScoreType.LianShunQing: return "连顺青";
            case XiScoreType.QuanHei: return "全黑";
            case XiScoreType.QuanHong: return "全红";
            case XiScoreType.QuanSanTiao: return "全三条";
            case XiScoreType.SanQing: return "三青";
            case XiScoreType.SanShunQing: return "三顺青";
            case XiScoreType.SanShunZi: return "三顺子";
            case XiScoreType.ShuangSanTiao: return "双三条";
            case XiScoreType.ShuangShunQing: return "双顺青";
            case XiScoreType.ShuangZhaDan: return "双炸弹";
            case XiScoreType.TongGuan: return "通关";
            case XiScoreType.ZhaDan : return "炸弹";
            default :return "";
        }
    }
}
