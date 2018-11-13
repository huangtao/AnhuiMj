import { LoadHeader } from "../../../Tools/Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinQueryScorePlayer extends cc.Component {

    @property(cc.Sprite)
    private img_creator: cc.Sprite=null;
    @property(cc.Label)
    private label_player: cc.Label=null;

    onLoad() {
    }

    public Show(url: string, name: string, isSelf: boolean = false) {
        this.node.active = true;
     //   LoadHeader(url, this.img_player);
        if (name.length > 4)
            this.label_player.string = name.substring(0, 4);
        else
            this.label_player.string = name;
        if (isSelf) {
            this.label_player.node.color = cc.hexToColor("#ff5c00");
        }
        else {
            this.label_player.node.color = cc.hexToColor("#5B1E00");
        }
    }
}
