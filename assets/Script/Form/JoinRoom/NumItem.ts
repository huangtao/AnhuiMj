

const { ccclass, property } = cc._decorator;
@ccclass
export class NumItem extends cc.Component {
    text: string = '';
    /**
     * 椭圆背景图片
     */
    @property(cc.SpriteFrame)
    frame_oval: cc.SpriteFrame=null;

    /**
     * 背景图片
     */
    @property(cc.Sprite )
    sp_bg: cc.Sprite = null;

    @property(cc.RichText)
    label: cc.RichText=null;

    public SetText(str: string) {
        if (this.text === str) return;
        this.text = str;
        if (cc.isValid(this.label)) {
            this.label.string = `<color=#FFD862><b>${str}</b></c>`;
        }else{
            cc.warn("无效label");
        }
    }

    public Show(root: cc.Node) {
        if (!(cc.isValid(root) && this.isValid)) {
            root = cc.Canvas.instance.node;
        }
        this.node.removeFromParent(true);
        root.addChild(this.node);
    }






}