const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinSettingTips extends cc.Component {

    @property(cc.Node)
    private group: cc.Node=null;
    @property(cc.Label)
    private label: cc.Label=null;

    onLoad() {
        this.node.on("click", this.Hide, this);
    }

    /**
     * 显示文字 
     */
    public Show(message: string, pos: cc.Vec2, autoHide: boolean = true) {
        this.node.active = true;
        this.group.x = 0;//pos.x;
        this.group.y = pos.y + this.group.height / 2 + 25;
        this.label.string = message;
        this.node.stopAllActions();
        this.node.opacity = 0;
        if (autoHide)
            this.node.runAction(cc.sequence(cc.fadeTo(0.5, 255), cc.fadeTo(2, 255), cc.fadeTo(0.5, 0)));
        else
            this.node.runAction(cc.fadeTo(0.5, 255));
    }
    private Hide() {
        this.node.stopAllActions();
        this.node.active = false;
    }
}
