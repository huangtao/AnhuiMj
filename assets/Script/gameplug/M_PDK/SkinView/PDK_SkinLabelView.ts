import GameLogic from "../GameHelp/PDK_GameLogic";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { TexturePath, CommonTexturePath } from "../GameHelp/PDK_GameHelp";
import Global from "../../../Global/Global";
import  M_PDKView  from "../M_PDKView";

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
    private label_playerNum: cc.Label = null;
    @property(cc.Label)
    private label_gameRule: cc.Label = null;
    //牌堆
    @property(cc.Label)
    private label_leftCardCount: cc.Label = null;
    @property(cc.Sprite)
    private icon_paihe: cc.Sprite = null;
    private gamenum:number;
    private allnum:number;

    public allgamenum:number;

    private bg_touchStartTime = null;
    private bg_touchEndTime = null; 

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START,this.bg_touchBegin,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.bg_touchEnd,this);
        this.Init();
    }
    public Init() {
        this.gamenum = 0;
        this.allnum = 0;
        this.label_gameCount.string = "";
        this.label_playerNum.string = "";
        this.group_tablenum.active = false;
        this.group_money.active = false;
        this.label_gameRule.node.active = false;
        this.icon_paihe.node.active = false;
    }
    public Destroy() {

    }
    //背景开始触摸
    private bg_touchBegin(e:cc.Event.EventTouch){
        this.bg_touchStartTime = new Date().getTime();
    }
    //背景触摸结束
    private bg_touchEnd(e:cc.Event.EventTouch){
        this.bg_touchEndTime = new Date().getTime();
        if(this.bg_touchEndTime - this.bg_touchStartTime < 200 ){
            M_PDKView.Instance.selfSelectCardView.cancelSelected();
        }
        M_PDKView.Instance.skinButtonView.HideMenu();
    }

    /**
     * 设置局数
     */
    public SetGameCount(value: number[]) {
        this.label_gameCount.string = "第" + (value[0]) + "/" + value[1] + "局";
        this.gamenum = value[0];
        this.allnum = value[1];
    }
    /**
     * 设置房间号
     */
    public SetTableNum(value: number,isGroup:boolean=false) {
        this.group_tablenum.active = true;
    if(Global.Instance.DataCache.GroupId>0){
            this.label_tablenum.string = "亲友圈房号:" + value;
        }else{
            if(isGroup){
                 this.label_tablenum.string = "亲友圈房号:" + value;
            }else{
                this.label_tablenum.string = "房间号:" + value;
            }
            
        }
        
    }
 
    public showGameRule(str:string){
        this.label_gameRule.string = str;
        this.label_gameRule.node.active = true;
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
        this.label_gameCount.string = "第"+(this.allnum-this.allgamenum)+"/" + (this.allnum-this.allgamenum) + "局";
    }
    //游戏人数
    public setPlayerNum(playerNum:number){
        this.label_playerNum.string = "跑得快"+playerNum+"人";
    }
    //牌堆剩余牌数
    public showPaihe(leftCardCount:number){
        this.icon_paihe.node.active = true;
        this.label_leftCardCount.string = "剩余" + leftCardCount + "张";
    }
}
