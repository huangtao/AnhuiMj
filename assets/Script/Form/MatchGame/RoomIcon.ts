
import { Action } from "../../CustomType/Action";
import { QL_Common } from "../../CommonSrc/QL_Common";
import Global from "../../Global/Global";

const { ccclass, property } = cc._decorator;

@ccclass
export class RoomIcon extends cc.Component {
    Action: Action;
    RoomInfo: QL_Common.RoomClient;

    @property(cc.Sprite)
    icon: cc.Sprite=null;


    @property(cc.Node)
    infoNode: cc.Node=null;

    @property(cc.Node)
    disibleNode: cc.Node=null;

    @property(cc.Label)
    Baselabel: cc.Label=null;

    @property(cc.Label)
    Checklabel: cc.Label=null;

    public Init() {
        if (!this.RoomInfo) return;
        const t = this;
        cc.loader.loadRes(`Texture/Hall/MatchGame/room${this.RoomInfo.RoomLV}`, cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            t.icon.spriteFrame = spriteFrame;
        });

        if (this.RoomInfo.RoomState === QL_Common.RoomState.Upcoming) {
            this.infoNode.active = false;;
            this.disibleNode.active = true;
        } else if (this.RoomInfo.RoomState === QL_Common.RoomState.Running) {
            this.Baselabel.string = `${this.RoomInfo.BaseMoney}`;
            this.Checklabel.string = this.RoomInfo.BaseMoney * this.RoomInfo.JoinMultiNum + "";
            this.infoNode.active = true;;
            this.disibleNode.active = false;
        }


    }

    private thisClick() {
        if (this.RoomInfo.RoomState !== QL_Common.RoomState.Running) {
            Global.Instance.UiManager.ShowTip("敬请期待！");
            return;
        }
        if (this.Action) {
            this.Action.Run([this.RoomInfo]);
        }
    }


}