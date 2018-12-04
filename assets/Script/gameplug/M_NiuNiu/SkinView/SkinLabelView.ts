import GameLogic from "../GameHelp/GameLogic";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { SetTextureRes } from "../GameHelp/NiuNiuFunction";
import { TexturePath, CommonTexturePath } from "../GameHelp/GameHelp";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinLabelView extends cc.Component {

    //底分
    @property(cc.Label)
    private label_cellScore: cc.Label = null;
    //局数
    @property(cc.Label)
    private label_gameCount: cc.Label = null;
    //玩家余额或记分
    @property(cc.Node)
    private group_money: cc.Node = null;
    @property(cc.Sprite)
    private img_money: cc.Sprite = null;
    @property(cc.Label)
    private label_moneytitle: cc.Label = null;
    @property(cc.Label)
    private label_money: cc.Label = null;
    //房间号
    @property(cc.Node)
    private group_tablenum: cc.Node = null;
    @property(cc.Label)
    private label_tablenum: cc.Label = null;
    private gamenum:number;
    private allnum:number;

    public allgamenum:number;

    onLoad() {
        this.Init();
    }
    public Init() {
        this.label_cellScore.string = "";
        this.label_gameCount.string = "";
        this.group_tablenum.active = false;
        this.group_money.active = false;
        this.gamenum = 0;
        this.allnum = 0;
    }
    public Destroy() {

    }
    /**
     * 设置底分
     */
    public SetCellScore(value: number, isCreateRoom = false) {
        this.label_cellScore.string = "底分：" + value;
        this.label_gameCount.node.active = isCreateRoom;
        if (isCreateRoom) {
            this.label_cellScore.node.x = -100;
        }
        else {
            this.label_cellScore.node.x = 0;
        }
    }
    /**
     * 设置游戏结果局数
     */
    public SetGameCountResult(value: number[]) {
        this.SetGameCount([value[0] - 1, value[1]]);
    }
    /**
     * 设置局数
     */
    public SetGameCount(value: number[]) {
        if (value[0] < value[1]) {
            this.label_gameCount.string = "局数：" + (value[0] + 1) + "/" + value[1];
            this.gamenum = value[0] + 1;
            this.allnum = value[1];
        }

        else {
            this.gamenum = value[0];
            this.allnum = value[1];
            this.label_gameCount.string = "局数：" + (value[0]) + "/" + value[1];
        }
           
    }
    /**
     * 续局后重置局数显示
     * @param value 
     */
    public SetGameCountForNext(value: number) {
        this.label_gameCount.string = "局数：" + (this.allnum - this.allgamenum) + "/" + (this.allnum - this.allgamenum);
    }
    /**
     * 设置房间号
     */
    public SetTableNum(value: number) {
        this.group_tablenum.active = true;
        this.label_tablenum.string = "房间号：" + value;
    }
    /**
     * 设置币种类型
     */
    public SetMoneyType(type: QL_Common.CurrencyType) {
     //   this.group_money.active = true;
        // if (type == QL_Common.CurrencyType.MatchScore) {
        //     this.label_moneytitle.node.active = true;
        //     this.img_money.node.active = false;
        // }
        // else {
        //     this.label_moneytitle.node.active = false;
        //     this.img_money.node.active = true;
        // }
    }
    /**
     * 设置余额
     */
    public SetMoney(value: number) {
        if (value.toString().length > 9)
            this.label_money.string = value.toString().substring(0, 6) + "..";
        else if (value.toString().length > 7)
            this.label_money.string = GameLogic.FomatInt(value);
        else if (value.toString().length > 5)
            this.label_money.string = GameLogic.FomatDecimal(value);
        else
            this.label_money.string = value.toString();
    }
}
