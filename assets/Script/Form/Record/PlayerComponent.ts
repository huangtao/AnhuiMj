
/**
 *
 */
import { TotalUserData } from "./RecordInfo";
import { LoadHeader } from "../../Tools/Function";

const { ccclass, property } = cc._decorator;
@ccclass
export class PlayerComponent extends cc.Component {

    @property(cc.Label)
    nickname: cc.Label=null;
    @property(cc.Label)
    userID: cc.Label=null;

    @property(cc.Label)
    num: cc.Label=null;

    @property(cc.Sprite)
    header: cc.Sprite=null;
    @property( cc.Sprite)
    win: cc.Sprite=null;

    @property([cc.SpriteFrame])
    icon: cc.SpriteFrame[] = [];


    data: TotalUserData;
    public Init() {
        if (!this.data) return;
        this.nickname.string = this.data.NickName;
        this.userID.string = this.data.UserID + "";
        LoadHeader(this.data.Header, this.header);
        if (this.data.MoneyNum > 0) {
            this.num.string = "+" + this.data.MoneyNum;
            this.win.spriteFrame = this.icon[0];
        } else if (this.data.MoneyNum < 0) {
            this.num.string = this.data.MoneyNum + "";
            this.win.spriteFrame = this.icon[1];
        }else {
            this.num.string = "";
            this.win.spriteFrame = this.icon[2];
        }
    }


}