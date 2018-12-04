import { SetTextureRes } from "../GameHelp/NiuNiuFunction";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinQueryScoreEle extends cc.Component {

    @property(cc.Sprite)
    private img_bg: cc.Sprite=null;
    @property(cc.Label)
    private label_title: cc.Label=null;
    @property([cc.Label])
    private label: cc.Label[]=[];

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
        //this.Setbg(line);
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
        for (var i = 0; i < this.label.length; i++) {
            this.label[i].string = "";
        }
    }
    /**
     * 设置数据
     */
    public SetData(data: number[]) {
        this.Reset();
        for (var i = 0; i < data.length; i++) {
            this.SetDataValue(i, data[i]);
        }
    }
    /**
     * 设置数据值
     */
    private SetDataValue(chair: number, value: number) {
        if (value > 0) {
            this.label[chair].string = "+" + value;
            this.label[chair].node.color = cc.hexToColor("#019D1E");
        }
        else {
            this.label[chair].string = "" + value;
            this.label[chair].node.color = cc.hexToColor("#ED0302");
        }
    }
    /**
     * 设置文本
     */
    public SetStr(data: string[], selfindex: number) {
        this.Reset();
        for (var i = 0; i < data.length; i++) {
            if (i == selfindex)
                this.label[i].node.color = cc.hexToColor("#ff5c00");
            else
                this.label[i].node.color = cc.hexToColor("#5B1E00");
            if (data[i].length > 5)
                this.label[i].string = data[i].substring(0, 5);
            else
                this.label[i].string = data[i];
        }
    }
}
