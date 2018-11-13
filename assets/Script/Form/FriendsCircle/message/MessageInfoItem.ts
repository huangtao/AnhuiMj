import ScrollHelperItem from "../../../utils/ScrollHelperItem";
import { LoadHeader } from "../../../Tools/Function";
import FriendCircleDataCache from "../FriendCircleDataCache";
import { MillisSecondToDate } from "../../../Tools/Function";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MessageInfoItem extends ScrollHelperItem {

    /**
     * 玩家昵称
     */
    @property(cc.Label)
    lab_nickName: cc.Label = null;

    /**
     * 头像
     */
    @property(cc.Sprite)
    sp_head: cc.Sprite = null;
    
    /**
     * 玩家ID
     */
    @property(cc.Label)
    lab_gameId: cc.Label = null;

    /**
     * 申请时间
     */
    @property(cc.Label)
    lab_time: cc.Label = null;

    /**
     * 申请状态(已加入/已退出)
     */
    @property(cc.Sprite)
    node_status_agreed: cc.Sprite = null;

    /**
     * 申请状态(待处理)
     */
    @property(cc.Node)
    node_status_waitAgree: cc.Node = null;

    /**
     * 申请状态(已退出)
     */
    @property(cc.SpriteFrame)
    frame_exited: cc.SpriteFrame = null;

    /**
     * 申请状态(已加入)
     */
    @property(cc.SpriteFrame)
    frame_added: cc.SpriteFrame = null;

    /**
     * 申请状态(已加入)
     */
    @property(cc.Button)
    btn_agree: cc.Button = null;

    /**
     * 申请状态(已加入)
     */
    @property(cc.Button)
    btn_refuse: cc.Button = null;

    private _idx: number = null;

    public get Idx(): number {
        return this._idx;
    }
    
    public initShow(idx: number){
    	if (!this.showData) {
    		return;
    	}

        this._idx = idx;
    	let info = this.showData;
    	if (!info) {
    		return
    	}

    	// 显示申请信息
		if (this.sp_head) {
			LoadHeader(info[3],this.sp_head);
		} 

		if (this.lab_nickName) {
			this.lab_nickName.string = info[2];
		} 

		if (this.lab_gameId) {
			this.lab_gameId.string = info[1];
		}

        if (this.btn_agree) {
            this.btn_agree.node.on(cc.Node.EventType.TOUCH_END,this.agreeClickHandle,this);
        }
    
        if (this.btn_refuse) {
            this.btn_refuse.node.on(cc.Node.EventType.TOUCH_END,this.refuseClickHandle,this);
        }
    
		if (this.lab_time) {
          this.lab_time.string = MillisSecondToDate(info[4]);
		}

		this.refreshStatusShow(info[5]);
    }
    /**
     * 更新状态显示
     */
    public refreshStatusShow(status) {
        this.showData[5] = status;
        
        // 更新状态显示
        if (this.node_status_agreed && this.node_status_waitAgree){
            this.node_status_agreed.node.active = false;
            this.node_status_waitAgree.active = false;

            if (0 == status) {
                // 等待同意
                // 只有管理员才有执行或拒绝的权力
                if (FriendCircleDataCache.Instance.selfIsAdministrator()) {
                    this.node_status_agreed.node.active = false;
                    this.node_status_waitAgree.active = true;
                }
            }else if(1 == status) {
                // 已加入
                this.node_status_waitAgree.active = false;
                this.node_status_agreed.node.active = true;

                if (this.frame_added) {
                    this.node_status_agreed.spriteFrame = this.frame_added;
                }
            }else if(2 == status) {
                // 已退出
                this.node_status_waitAgree.active = false;
                this.node_status_agreed.node.active = true;
                // 已退出
                if (this.frame_exited) {
                    this.node_status_agreed.spriteFrame = this.frame_exited;
                }
            }     
        }
    }

    /**
     * 同意
     */
    public refuseClickHandle(event){
      event.stopPropagation();

      if (this.clickAction) {
          this.clickAction.Run([{userId: this.showData[0], operate: 'refuse',item: this}]);
      } 

      return true;
    }

    /**
     * 同意
     */
    public agreeClickHandle(event){
      if (this.clickAction) {
          this.clickAction.Run([{userId: this.showData[0], operate: 'agree',item: this}]);
      }

      event.stopPropagation();
      return true;
    }
}
