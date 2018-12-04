
import { LoadHeader } from "../../../Tools/Function";
import { SetTextureRes } from "../GameHelp/NiuNiuFunction";
import { CommonTexturePath, TexturePath } from "../GameHelp/GameHelp";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinTotalScoreEle extends cc.Component {

    private img_bg: cc.Sprite;
    @property(cc.Sprite)
    private img_face: cc.Sprite=null;
    @property(cc.Label)
    private label_name: cc.Label=null;
    @property(cc.Label)
    private label_info: cc.Label=null;
    @property(cc.Label)
    private label_score: cc.Label=null;
    @property(cc.Sprite)
    private img_maxwin: cc.Sprite=null;

    onLoad() {
        this.img_bg = this.getComponent<cc.Sprite>(cc.Sprite);
    }
    public Show(faceID: string, name: string, gamecount: number, userID: number, score: number, selfID: number, maxwin: boolean = false) {
        this.SetBg(userID == selfID);
        this.img_face.spriteFrame = null;
        LoadHeader(faceID, this.img_face);
        this.label_name.string = name;
        this.label_info.string = "对局数:" + gamecount + "/ID:" + userID;
        this.label_score.string = score + "";
        this.img_maxwin.node.active = maxwin;
    }
    private SetBg(value: boolean) {
        if (value) {
            SetTextureRes(TexturePath + "bg_yellow", this.img_bg);
            this.label_score.node.color = cc.hexToColor("#670409");
        }
        else {
            SetTextureRes(TexturePath + "bg_blue", this.img_bg);
            this.label_score.node.color = cc.hexToColor("#242B3A");
        }
    }
}
