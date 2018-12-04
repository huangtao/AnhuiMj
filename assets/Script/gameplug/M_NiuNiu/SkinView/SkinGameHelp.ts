import { StageWidth, StageHeight } from "../GameHelp/GameHelp";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinGameHelp extends cc.Component {

    @property(cc.Label)
    private label_title: cc.Label=null;
    @property(cc.Label)
    private label_version: cc.Label=null;
    @property(cc.RichText)
    private label: cc.RichText=null;
    @property(cc.Button)
    private btn_close: cc.Button=null;

    onLoad() {
        this.label_title.string = "牛牛规则";
        this.label_version.string="SV1.6.0 CV1.6.1";
        var str = "<size=30>一、基本规则</size>\n";
        str += "1、牌数：一副牌，去掉两个王，总共52张牌\n";
        str += "2、人数：2-6个人玩，每人发5张牌\n";
        str += "3、玩法：系统随机发5张牌，玩家可在其中任选三张使其相加是10的倍数即可，其中J、Q、K算10点，然后另外两张相加的点数即为所比较的点数（所加点数大于10 则需要减去10）（五小牛，四炸, 三带二和顺子另算）\n\n";

        str += "<size=30>二、大小比较</size>\n";
        str += "1、不同牌型比较（从大到小）：五小牛,四炸,五花牛,三带二,顺子,牛牛,牛九,牛八,牛七,牛六,牛五,牛四,牛三,牛二,牛一,没牛\n";
        str += "2、相同牌型比较：相同牌型仅比较最大的一张即可，若最大的一张相同，则比较花色\n";
        str += "2.1 最大牌的比较（从大到小）：K,Q,J,10,9,8,7,6,5,4,3,2,A\n";
        str += "2.2 花色的比较（从大到小）：黑桃,红桃,梅花,方块\n";
        str += "3、注：四炸比较炸弹的大小;三带二比较三张的大小;\n\n";

        str += "<size=30>三、名词解释</size>\n";
        str += "1、房主坐庄：即第一局房主为庄家（看牌抢庄除外）\n";
        str += "2、随机坐庄：即第一局系统会随机选择庄家（看牌抢庄除外）\n";
        str += "3、轮流坐庄：即从第二局开始庄家变为下一家\n";
        str += "4、看牌抢庄：游戏开始后，系统会给每位玩家发4张牌，玩家根据自己的牌况决定是否抢庄；玩家最多可以选择4倍额度来抢庄，抢庄额度最高的玩家成为庄家。若存在不止1名玩家用4倍额度抢庄，则由系统随机抽签决定庄家\n";
        str += "5、无牛下庄：直到庄家拿到无牛牌后，庄家变为下一家\n";
        str += "6、牛九换庄：拿到牛九的玩家下局坐庄（牌型一致时，较大者下局当庄）\n\n";

        str += "<size=30>四、牌型解释</size>\n";
        str += "1、顺  子：5张连续数字组成的牌型，顺子中只有A 、2 、3 、4 、5；没有 10 、J 、Q 、K 、A\n";
        str += "2、三带二：由三张相同数字组成的牌以及另外两张相同数字组成的牌型\n";
        str += "3、五花牛：由J、Q、K中任选5张所组成的牌型\n";
        str += "4、四  炸：由四张相同数字组成的牌以及另外一张任意牌组成的牌型\n";
        str += "5、五小牛：由五张均小于5且所加之和小于等于10的牌组成的牌型\n\n";

        str += "<size=30>五、分值计算</size>\n";
        str += "1、牛六、牛五、牛四、牛三、牛二、牛一、没牛（1倍）\n";
        str += "2、牛七、牛八（2倍）\n";
        str += "3、牛九（3倍）\n";
        str += "4、牛牛（4倍）\n";
        str += "5、顺子、三带二、五花牛（5倍）\n";
        str += "6、四炸（6倍）\n";
        str += "7、五小牛（7倍）\n";

        this.label.string = str;
        this.label.node.parent.height = this.label.node.height;
        this.btn_close.node.on("click", this.OnButtonClose, this);
    }
    public Show() {
        this.node.active = true;
    }
    private OnButtonClose() {
        this.node.active = false;
    }
}
