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

    public initUI(data: PlayerFightScore): void {
        if (!data) {
            return;
        }

        // 游戏名称
        this.lab_nickName.string = data.nickName;

        // 结束时间日期
        this.lab_score.string = data.moneyNum + "";
    }
}
