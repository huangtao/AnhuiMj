import FriendCircleDataCache from "../../FriendCircleDataCache";
import FriendCircleWebHandle from "../../FriendCircleWebHandle";
import ManageChildBase from "../ManageChildBase";
import Global from "../../../../Global/Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ModifyInfo extends ManageChildBase {
	/**
     * 亲友圈ID
     */
    @property(cc.Label)
    lab_circleId: cc.Label = null;

    /**
     * 成员数量
     */
    @property(cc.Label)
    lab_userNum: cc.Label = null;

    /**
     * 亲友圈名称输入框
     */
    @property(cc.EditBox)
    editBox_circleName: cc.EditBox = null;

    /**
     * 亲友圈公告输入框
     */
    @property(cc.EditBox)
    editBox_circleNotice: cc.EditBox = null;

    public InitShow() {
        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        // 圈主ID
        if (this.lab_circleId) {
            this.lab_circleId.string = '亲友圈ID：' + curFriendCircle.userId;
        }

        // 成员数量
        if (this.lab_userNum) {
            this.lab_userNum.string = '成员(' + curFriendCircle.userCount + '/' + curFriendCircle.maxUser + ')';
        }


        // 显示亲友圈昵称和公告文字
        if (this.editBox_circleName) {
             this.editBox_circleNotice.string = '';
            this.editBox_circleName.placeholder = curFriendCircle.name;
        }

        if (this.editBox_circleNotice) {
            this.editBox_circleNotice.string = '';
            this.editBox_circleNotice.placeholder = curFriendCircle.notice;
        }
    }

	/**
     * 保存昵称按钮
     */
    public btnSaveNickNameClick() {
        // 判断输入内容非空
        let name = this.editBox_circleName.string;
        
        if ('' == name) {
            Global.Instance.UiManager.ShowTip('输入内容不能为空！');
            return;
        }

        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;

        if (!curFriendCircle.notice) {
            curFriendCircle.notice = '这个圈主很懒，什么都没有留下~';
        }
        
        this.sendModifyInfo(name,curFriendCircle.notice);
    }

    /**
     * 保存公告按钮
     */
    public btnSaveNoticeClick() {
        // 判断输入内容非空
        let notice = this.editBox_circleNotice.string;
        
        if ('' == notice) {
            Global.Instance.UiManager.ShowTip('输入内容不能为空！');
            return;
        }

        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        this.sendModifyInfo(curFriendCircle.name,notice);
    }

    /**
     * 发送修改亲友圈信息请求
     */
    public sendModifyInfo(name: string, notice: string) {
        if (!name || !notice) {
            Global.Instance.UiManager.ShowTip('输入内容不能为空！');
            return;
        }

        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        FriendCircleWebHandle.modifyFriendCircleInfo(name,notice,parseInt(curFriendCircle.ID));
    }
}
