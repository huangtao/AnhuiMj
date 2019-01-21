const {ccclass, property} = cc._decorator;

@ccclass
export default class TDHMJ_HelpView extends cc.Component {

    @property(cc.RichText)
    label: cc.RichText=null;

    @property(cc.Button)
    btn_close: cc.Button=null;

    @property(cc.Label)
    SV: cc.Label=null;
 
    onLoad() {
        this.node.active = false;
        var str = "<color=#561414><size=30>基本介绍：</size></color>\n";
        str += "1、推倒胡由饼（1至9）、条（1至9）、万（1至9）、东、南、西、北、中、發、白各四张组成，合计136张牌\n";
        str +="玩法二：由饼（1至9）、条（1至9）、万（1至9）各四张组成，合计108张牌\n";
        str +="吃炮费用由放炮者一人承担，如果自摸胡牌将收三家分数，杠分由放杠者出，无一炮多响\n";
        str += "2、规则介绍：\n";      
        str += "起张牌数：庄家的起张牌数为14张，闲家的起张牌数为13张可碰、可杠、不可吃。可点炮胡、可自摸胡、过胡不胡、过碰不碰\n";
        str +="轮庄: 庄家胡牌了继续坐庄，没胡下家坐庄。\n"       
        str += "可以杠，可以碰，但是不可以吃。\n";
        str += "一局当中剩余牌数0张流局。\n";
        str += "胡牌类型随意,七对可以能胡，抢杠胡可以胡\n";       
        str += "过胡不胡：如果胡牌一方，在别人打出牌胡家没有胡，只有过了自己后才能胡牌。\n";       
        str += "杠分计算: 明杠、暗杠都是一分，荒庄也计杠分，明杠由放杠者出，暗杠三家给\n";
        str += "暗杠也要亮起来\n";

       

        this.label.string = str;
        this.label.node.parent.height = this.label.node.height;
        this.btn_close.node.on("click", this.OnButtonClose, this);
    }
    public init(){
        this.node.active=false;
    }
    public Destroy(){
        
    }
    public Show() {
        this.node.active = true;
    }
    private OnButtonClose() {
        this.node.active = false;
    }
}
