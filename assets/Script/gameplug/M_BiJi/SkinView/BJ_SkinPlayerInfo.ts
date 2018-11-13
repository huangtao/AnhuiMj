import { LoadHeader } from "../../../Tools/Function";
import GameLogic from "../GameHelp/BJ_GameLogic";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinPlayerInfo extends cc.Component {

    @property(cc.Node)
    private group_main: cc.Node=null;
    @property(cc.Sprite)
    private img_face: cc.Sprite=null;
    @property(cc.Label)
    private label_id_title: cc.Label=null;
    @property(cc.Label)
    private label_id: cc.Label=null;
    @property(cc.Label)
    private label_name: cc.Label=null;
    @property(cc.Label)
    private label_ip: cc.Label=null;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.OnButtonBg, this);
    }
    public Show(chair: number, point: cc.Vec2, faceID: string, id: number, name: string, ip: string, isCreateRoom: boolean) {
        this.node.active = true;
        switch (chair) {
            case 0: {
                point.y += this.group_main.height / 2;
                point.x += 80;
                break;
            }
            case 1:
            case 2: {
                point.x -= this.group_main.width / 2;
                break;
            }
            case 3: {
                point.y -= this.group_main.height / 2;
                break;
            }
            case 4:
            case 5: {
                point.x += this.group_main.width / 2;
                break;
            }
        }
        if (isCreateRoom) {
            this.label_id_title.node.active = true;
            this.label_id.node.active = true;
        }
        else {
            this.label_id_title.node.active = false;
            this.label_id.node.active = false;
        }
        this.group_main.x = point.x;
        this.group_main.y = point.y;
        LoadHeader(faceID, this.img_face);
        this.label_id.string = id + "";
        this.label_name.string = name;
        this.label_ip.string = "IP:" + ip;
    }
    private OnButtonBg() {
        this.node.active = false;
    }
}
