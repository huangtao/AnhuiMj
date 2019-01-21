import UIBase from "../../Base/UIBase";
import { Action, ActionNet } from "../../../CustomType/Action";
import FriendCircleWebHandle from "../FriendCircleWebHandle";
import FriendCircleDataCache from "../FriendCircleDataCache";
import MessageInfoScrollView from './MessageInfoScrollView';
import MessageInfoItem from './MessageInfoItem';

const {ccclass, property} = cc._decorator;

@ccclass
export default class MessageUI extends UIBase<any> {
	public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.ScrollView)
    scroll_messageList: cc.ScrollView = null;
    /**
     * 是否正在请求
     */
    private _isRequesting: boolean = false;
    /**
     * 当前用户的操作（同意或拒绝)
     * 根据用户的操作进行列表相应的刷新
     */
    private _curOperate: string = null;
    /**
     * 消息数据
     */
    private _messageList: any = null;

    /**
     * 当前操作的Item
     */
    private _curOperateItem: MessageInfoItem = null;

    private _scroll_message: MessageInfoScrollView = null;

	public InitShow(){
		this._isRequesting = false;
		
		// 默认隐藏列表显示
		if (this.scroll_messageList) {
			// this.scroll_messageList.scrollToTop(0.1);
			this.scroll_messageList.node.active = false;

			// 创建消息列表
			let scroll_message: MessageInfoScrollView = this.scroll_messageList.getComponent("MessageInfoScrollView");

			if (scroll_message) {
				scroll_message.resetList();
			}
		}

		this.requestMessageList();
	}

	/**
	 * 获取消息列表
	 */
	public requestMessageList() {
		// 请求数据
		let act = new Action(this, this.getMessageListCallBack);
		let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
		FriendCircleWebHandle.getMessageList(curFriendCircle.ID,act);
	}
	/**
	 * 获取消息列表
	 */
	public getMessageListCallBack(res) {
		// 默认隐藏列表显示
		if (this.scroll_messageList) {
			this.scroll_messageList.node.active = true;
		}

		let list = FriendCircleDataCache.Instance.MessageList;
		this._messageList = list.Values;
		
		// 创建消息列表
		let scroll_message: MessageInfoScrollView = this.scroll_messageList.getComponent("MessageInfoScrollView");

		if (0 == list.Count) {
			scroll_message.resetList();
			return;
		}
		
    	scroll_message.clickAction = new Action(this,this.agreeOrRefuseClick);
        scroll_message.refreshData(list.Values);

        this._scroll_message = scroll_message;
	}

	/**
	 * 同意或拒绝点击事件处理
	 */
	public agreeOrRefuseClick(args){
		if (!args) {
			return;
		}

		if (this._isRequesting) {
			this.UiManager.ShowTip("您的操作过于频繁，请稍后再试!")
			return;
		}

		this._curOperateItem = args.item;
		let operate = null;

		if ('refuse' == args.operate) {
			operate = 2;
			this._curOperate = 'refuse';
		}else if('agree' == args.operate){
			operate = 1;
			this._curOperate = 'agree';
		}else{
			cc.info('-- agreeOrRefuseClick operate is error');
			return;
		}

		let userId = args.userId;
		let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
		let friendCircleId = null;

		if (curFriendCircle) {
			friendCircleId = curFriendCircle.ID;
		}

		let act = new Action(this,(res)=>{
			if ('success' != res.status) {
				this._isRequesting = false;
				return;
			}

			// 操作成功刷新列表显示
			this._isRequesting = false;

			if ('refuse' == this._curOperate) {
				this.refreshStatusShow(2);
			}else if('agree' == this._curOperate){
				// 刷新数据
				if (-1 != this._messageList[this._curOperateItem.Idx]) {
					this.refreshStatusShow(1);
				}				
			}

			FriendCircleDataCache.Instance.dealMessage(this._curOperateItem.showData[0] + "");
		});

		this._isRequesting = true;
		let resuslt = FriendCircleWebHandle.agreeOrRefuseJoinFriendCircle(userId, parseInt(friendCircleId),operate,act);

		if (!resuslt) {
			this._isRequesting = false;
		}
	}

	/**
	 * 移除一条数据并刷新显示
	 */
	public deleteMessage(index: number) {
		let pos = this._messageList.indexOf(index);

		if (-1 != this._messageList.indexOf(index)) {
			this._messageList.splice(pos,1);
			this._scroll_message.refreshData(this._messageList);
		}
	}

	/**
	 * 更新状态显示
	 */
	public refreshStatusShow(status) {
		if (this._curOperateItem) {
			this._curOperateItem.refreshStatusShow(status);
		}
	}
}
