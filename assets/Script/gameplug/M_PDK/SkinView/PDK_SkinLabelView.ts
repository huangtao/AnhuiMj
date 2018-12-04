import GameLogic from "../GameHelp/PDK_GameLogic";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { TexturePath, CommonTexturePath } from "../GameHelp/PDK_GameHelp";
import Global from "../../../Global/Global";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinLabelView extends cc.Component {

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
    @property(cc.Label)
    private label_Tips: cc.Label = null;

    private TipsAni:cc.Animation = null; 
    private gamenum:number;
    private allnum:number;

    public allgamenum:number;

    onLoad() {
        this.Init();
    }
    public Init() {
        this.gamenum = 0;
        this.allnum = 0;
        this.label_gameCount.string = "";
        this.group_tablenum.active = false;
        this.group_money.active = false;
        this.label_Tips.node.active = false;
        this.TipsAni = this.label_Tips.node.getComponent(cc.Animation);
    }
    public Destroy() {

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
        if (value[0] < value[1]){
            this.label_gameCount.string = "局数：" + (value[0] + 1) + "/" + value[1];
            this.gamenum = value[0]+1;
            this.allnum = value[1];
       }
          
       else{
           this.label_gameCount.string = "局数：" + (value[0]) + "/" + value[1];
           this.gamenum = value[0];
           this.allnum = value[1];
       }
    }
    /**
     * 设置房间号
     */
    public SetTableNum(value: number,isGroup:boolean=false) {
        this.group_tablenum.active = true;
    if(Global.Instance.DataCache.GroupId>0){
            this.label_tablenum.string = "亲友圈房号：" + value;
        }else{
            if(isGroup){
                 this.label_tablenum.string = "亲友圈房号：" + value;
            }else{
                this.label_tablenum.string = "房间号： " + value;
            }
            
        }
        
    }
 
    public showTipsAni(str:string){
        this.label_Tips.string = str;
        this.TipsAni.play("Ani_Tips");

    }
    /**
     * 设置币种类型
     */
    public SetMoneyType(type: QL_Common.CurrencyType) {
        // this.group_money.active = true;
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
    public SetGameCountForNext(value:number){
        this.label_gameCount.string = "局数："+(this.allnum-this.allgamenum)+"/" + (this.allnum-this.allgamenum);
    }
}
