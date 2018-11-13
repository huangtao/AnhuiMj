
import { QL_Common } from "../../CommonSrc/QL_Common";
import { Action } from "../../CustomType/Action";

const { ccclass, property } = cc._decorator;

@ccclass
export class GameIcon extends cc.Component {
    @property(cc.Sprite)
    icon: cc.Sprite=null;

    @property(cc.Label)
    label: cc.Label=null;

    @property([cc.SpriteFrame])
    SpriteFrames: cc.SpriteFrame[]=[];

    gameinfo: QL_Common.GameInfo;
    action:Action;
    Init() {
        const t = this;
        cc.loader.loadRes(`Texture/GameIcon/${this.gameinfo.GameID}`, cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {                
                t.onerror();
                return;
            }
            t.onres(spriteFrame);
        });
    }

    private onres(spriteFrame) {
        this.label.node.active = false;
        this.icon.spriteFrame = spriteFrame;
    }

    private onerror() {
        this.label.node.active = true;
        if (this.gameinfo.GameType <= this.SpriteFrames.length && this.gameinfo.GameType > 0) {
            this.icon.spriteFrame = this.SpriteFrames[this.gameinfo.GameType - 1];
        }else{
            this.icon.spriteFrame = this.SpriteFrames[0];
        }

        this.label.string = this.gameinfo.GameName;
    }

    private thisClick() {

        if (this.action) {
            this.action.Run([this.gameinfo]);
        }
    }
}