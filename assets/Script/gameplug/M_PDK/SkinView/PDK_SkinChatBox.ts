import { PDK } from "../GameHelp/PDK_IClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinChatBox extends cc.Component {

    /**
     * 聊天框背景
     */
    @property(cc.Sprite)
    private img_chat: cc.Sprite=null;
    /**
     * 聊天框文本
     */
    @property(cc.Label)
    private label_chat: cc.Label=null;

    onLoad() {
        this.node.active = false;
    }
    public SetChair(chair: number) {
        switch (chair) {
            case 0: {
                this.node.x = -531;
                this.node.y = -247;
                break;
            }
            case 1: {
                this.node.x = 520;
                this.node.y = 150;
                break;
            }
            case 2: {
                this.node.x = 45;
                this.node.y = 260;
                break;
            }
            case 3: {
                // this.node.x = 0;
                // this.node.y = 292;
                this.node.x = -520;
                this.node.y = 150;
                break;
            }
        }
        if (chair == 2) {
            this.img_chat.node.y += 12;
        }
        if (chair == 1) {
            this.img_chat.node.scaleX = -1;
        }else if(chair == 2){
            this.img_chat.node.scaleY = -1;
        }
        else {
            this.img_chat.node.scaleX = 1;
        }
    }
    public Init() {
        this.Destroy();
        this.node.active = false;
    }
    public Destroy() {
        this.unscheduleAllCallbacks();
    }
    /**
     * 显示聊天框
     */
    public ShowChat(value: string) {
        this.unscheduleAllCallbacks();
        this.node.active = true;
        this.label_chat.string = value;
        this.scheduleOnce(this.AniOver, 3.5 * PDK.ins.iclass.GetSpeed());
    }
    private AniOver() {
        this.node.active = false;
    }
}
