import UIBase from "../../../Base/UIBase";
import { UIName } from "../../../../Global/UIName";
import FriendCircleDataCache from "../../FriendCircleDataCache";
import FriendCircleWebHandle from "../../FriendCircleWebHandle";
import { Action, ActionNet } from "../../../../CustomType/Action";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DataStatistics extends UIBase<any> {
	public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;

    /**
     * 非圈主显示的亲友圈ID
     */
    @property(cc.Label)
    lab_circleId: cc.Label = null;

    /**
     * 非圈主显示的成员数量
     */
    @property(cc.Label)
    lab_userNum: cc.Label = null;

    /**
     * 亲友圈昵称
     */
    @property(cc.Label)
    lab_circleName: cc.Label = null;

    /**
     * 亲友圈公告
     */
    @property(cc.Label)
    lab_circleNotice: cc.Label = null;

	public InitShow() {
		let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;

    	if (!curFriendCircle) {
    			return;
    		}

    	// ID 
    	if (this.lab_circleId) {
    		this.lab_circleId.string = '亲友圈ID：' + curFriendCircle.ID;
    	}

    	// 成员数量
    	if (this.lab_userNum) {
    		this.lab_userNum.string = '成员(' + curFriendCircle.userCount + '/' + curFriendCircle.maxUser + ')';
    	}

    	// 昵称
    	if (this.lab_circleName) {
    		this.lab_circleName.string = curFriendCircle.name;
    	}

    	// 公告
    	if (this.lab_circleNotice) {
    		this.lab_circleNotice.string = curFriendCircle.notice;
    	}
	}

	/**
     * 退出亲友圈按钮
     */
    public btnQuitFriendCircleClick(event,args) {
        this.UiManager.ShowMsgBox('退出亲友圈后，你将无法再加入该亲友圈，是否真的退出？ ',this,()=>{
            let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
            let act = new Action(this,(res)=>{
                if ('success' == res.resuslt.status) {
                    this.UiManager.ShowTip('退出亲友圈成功！');
                    // 退出亲友圈则成功关闭亲友圈界面
                    this.UiManager.CloseUi(UIName.FriendCircle);
                    this.UiManager.CloseUi(UIName.FriendCirclePersonInfo);
                }
            });
    
            let userId = this.DataCache.UserInfo.userData.UserID;
            FriendCircleWebHandle.setKickMemberHandle(act);
            FriendCircleWebHandle.kickMember(userId,parseInt(curFriendCircle.ID));
        });
    }
}
