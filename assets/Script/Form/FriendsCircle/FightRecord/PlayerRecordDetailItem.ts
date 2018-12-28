import { PlayerFightScore } from "../../../CustomType/FriendCircleInfo";
const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerRecordDetailItem extends cc.Component {
    /**
     * 玩家昵称
     */
    @property(cc.Label)
    lab_nickName: cc.Label = null;

    /**
    * 分数
    */
    @property(cc.Label)
    lab_score: cc.Label = null;
    /**
    * 字体
    */
    @property([cc.Font])
    jiaFont: cc.Font[] = [];

    public initUI(data: PlayerFightScore): void {
        if (!data) {
            return;
        }
        let maxsize = 3;
        let nickName = data.nickName;
        // 昵称
        this.lab_nickName.string = nickName.length > maxsize ? nickName.substr(0, maxsize) + "..." : nickName;

        let moneyNum = data.moneyNum;
        if (moneyNum < 0) {
            this.lab_score.font = this.jiaFont[1];
            // 分数
            this.lab_score.string = data.moneyNum + "";
        } else {

            this.lab_score.font = this.jiaFont[0];
            // 分数
            this.lab_score.string = "+" + data.moneyNum + "";
        }
    }
}
