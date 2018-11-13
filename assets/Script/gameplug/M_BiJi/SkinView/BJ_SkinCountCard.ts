import GameLogic from "../GameHelp/BJ_GameLogic";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinCountCard extends cc.Component {

    /**
     * 文本
     */
    @property([cc.Label])
    private label: cc.Label[] = [];
    /**
     * 选择的牌值组合是否有牛
     */
    private hasNiu: boolean;
    public get HasNiu() { return this.hasNiu; }

    onLoad() {
        this.node.y = -145;
        this.Init();
    }
    public Init() {
        this.Reset();
    }
    public Reset() {
        this.hasNiu = false;
        this.node.active = false;
        this.ResetLabel();
    }
    public Destroy() {
        this.Reset();
    }
    /**
     * 重置文本
     */
    public ResetLabel() {
        for (var i = 0; i < this.label.length; i++) {
            this.label[i].string = "";
        }
    }
    /**
     * 开始显示
     */
    public Show() {
        this.node.active = true;
    }
    /**
     * 关闭
     */
    public Close() {
        this.node.active = false;
    }
    /**
     * 显示牌值
     * value：需要计算的牌数组,1-3张牌
     */
    public ShowCount(value: number[]) {
        this.ResetLabel();
        if (value.length < 1 || value.length > 3) {
            return;
        }
        var sum = 0;
        for (var i = 0; i < value.length; i++) {
            var card = GameLogic.GetCardLogicValue(value[i]);
            this.label[i].string = card + "";
            sum += card;
        }
        this.SetSum(sum);
        if (value.length == 3 && sum >= 10 && sum % 10 == 0) {
            this.hasNiu = true;
        }
        else {
            this.hasNiu = false;
        }
    }
    /**
     * 设置总计
     */
    private SetSum(value: number) {
        this.label[3].string = value + "";
    }
}
