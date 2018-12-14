/**
 * 亲友圈数据缓存
 */
import { FriendCircleInfo, FriendCircleRule, FriendCircleMember } from "../../CustomType/FriendCircleInfo";
import Dictionary from "../../CustomType/Dictionary";
import { QL_Common } from "../../CommonSrc/QL_Common";
import Global from "../../Global/Global";
import { SubscribeManager } from "../../Manager/SubscribeManager";
import { SubscribeChanelType } from "../../CustomType/Enum";
import { LocalStorage } from "../../CustomType/LocalStorage";

export default class FriendCircleDataCache {
	/**
	 * 当前进入的亲友圈
	 */
	private _curEnterFriendCircle: FriendCircleInfo;

	private static _instance: FriendCircleDataCache = null;

	public static get Instance(): FriendCircleDataCache {
		if (!FriendCircleDataCache._instance) {
			FriendCircleDataCache._instance = new FriendCircleDataCache();
		}

		return FriendCircleDataCache._instance;
	}

	public get CurEnterFriendCircle(): FriendCircleInfo {
		return this._curEnterFriendCircle;
	}

	public set CurEnterFriendCircle(friendInfo: FriendCircleInfo) {
		this._curEnterFriendCircle = friendInfo;
	}

	/**************************************************亲友圈列表***********************************************/
	/**
	 * 亲友圈列表
	 * @type {Array<FriendCircleInfo>}
	 */
	private _friendCircleList: Dictionary<string, FriendCircleInfo>;

	public get FriendCircleList(): Dictionary<string, FriendCircleInfo> {
		if (!this._friendCircleList) {
			this._friendCircleList = new Dictionary<string, FriendCircleInfo>();
		}

		return this._friendCircleList;
	}

	public set FriendCircleList(data: Dictionary<string, FriendCircleInfo>) {
		this._friendCircleList = data;
	}

	public AddrdorUpdateFriendCircleList(data: Array<FriendCircleInfo>) {
		this.FriendCircleList.Clear();

		for (var idx = 0; idx < data.length; ++idx) {
			let friendId = data[idx].ID;
			this.FriendCircleList.Add(friendId + '', data[idx]);
		}

		// 更新当前进入的亲友圈信息
		if (this.CurEnterFriendCircle) {
			this.CurEnterFriendCircle = this.FriendCircleList.GetValue(this.CurEnterFriendCircle.ID + '');
		}
	}

	public getFriendCircleById(friendId: number) {
		if (!friendId) {
			return;
		}

		return this.FriendCircleList.GetValue(friendId + "");
	}

	/**
	 * 判断自己是否在指定亲友圈
	 */
	public isFriendCircleMember(groupId: string): boolean {
		let info = this.FriendCircleList.GetValue(groupId + '');

		if (!info) {
			return false;
		}

		return true;
	}
	/**************************************************亲友圈玩法列表***********************************************/
	/**
	 * 亲友圈玩法列表
	 * @type {Array<FriendCircleRule>}
	 */
	private _friendCircleRuleList: Dictionary<string, Array<FriendCircleRule>>;

	public get FriendCircleRuleList(): Dictionary<string, Array<FriendCircleRule>> {
		if (!this._friendCircleRuleList) {
			this._friendCircleRuleList = new Dictionary<string, Array<FriendCircleRule>>();
		}

		return this._friendCircleRuleList;
	}

	public set FriendCircleRuleList(data: Dictionary<string, Array<FriendCircleRule>>) {
		this._friendCircleRuleList = data;
	}

	/**
	 * 添加或更新亲友圈玩法
	 */
	public addOrUpdateWanfaList(groupId: string, list: Array<FriendCircleRule>) {
		let ruleList = list;

		if (0 == list.length) {
			return;
		}

		/**
         * 进行玩法排序
         */
		ruleList.sort((a, b) => {
			return b.gameId - a.gameId;
		})

		this.FriendCircleRuleList.AddOrUpdate(groupId, ruleList);

		if (this.CurSelectedRule) {
			// 如果玩法变更了则更新亲友圈当前玩法
			if (!this.getRuleByID(this.CurSelectedRule.Id, parseInt(groupId))) {
				// 判断是否是变更了游戏
				let index = -1;
				for (let idx = 0; idx < ruleList.length; ++idx) {
					if (ruleList[idx] && ruleList[idx].gameId == this.CurSelectedRule.gameId) {
						index = idx;
						break;
					}
				}

				// 如果没有变更游戏则直接更新玩法信息
				if (-1 != index) {
					this.CurSelectedRule = ruleList[index];
				} else {
					// 否则默认更新成当前玩法列表第一个
					this.CurSelectedRule = ruleList[0];
				}
			}
		} else {
			//否则默认更新成当前玩法列表第一个
			this.CurSelectedRule = ruleList[0];
		}

	}

	/**
	 * 获取亲友圈玩法列表
	 */
	public getFriendCircleRuleList(groupId: string): Array<FriendCircleRule> {
		let ruleDict = this.FriendCircleRuleList;
		let ruleArray = ruleDict.GetValue(groupId);

		if (!ruleArray || 0 == ruleArray.length) {
			return null;
		}

		return ruleArray;
	}

	/**
	 * 获取亲友圈玩法通过玩法ID
	 */
	public getRuleByID(ruleId: number, groupId: number): FriendCircleRule {
		let friendList = this.FriendCircleList;
		let ruleArray = this.getFriendCircleRuleList(groupId + "");

		if (!ruleArray || 0 == ruleArray.length) {
			return null;
		}

		for (var idx = 0; idx < ruleArray.length; ++idx) {
			if (parseInt(ruleId + "") == ruleArray[idx].Id) {
				return ruleArray[idx];
			}
		}

		return null;
	}

	/**
	 * 当前选择的玩法
	 */
	private _curSelectedRule: FriendCircleRule = null;

	public get CurSelectedRule(): FriendCircleRule {
		return this._curSelectedRule;
	}

	public set CurSelectedRule(rule: FriendCircleRule) {
		this._curSelectedRule = rule;
	}

	/**
	 * 验证玩法有效性 判断该亲友圈里是否存在该玩法
	 */
	public isValidRule(ruleId: number, friendCircleId: number): boolean {
		if (this.getRuleByID(ruleId, friendCircleId)) {
			return true;
		}

		return false;
	}

	/**************************************************亲友圈成员列表***********************************************/
	/**
	 * 亲友圈成员列表
	 * Array<<userId, FriendCircleMember>
	 * @type {Array<FriendCircleMember>}
	 */
	private _friendCircleMemberList: Dictionary<string, FriendCircleMember>;

	public get FriendCircleMemberList(): Dictionary<string, FriendCircleMember> {
		if (!this._friendCircleMemberList) {
			this._friendCircleMemberList = new Dictionary<string, FriendCircleMember>();
		}

		return this._friendCircleMemberList;
	}

	public set FriendCircleMemberList(data: Dictionary<string, FriendCircleMember>) {
		this._friendCircleMemberList = data;
	}

	/**
	 * 添加或更新成员列表
	 */
	public addOrUpdateMemberList(column: any[], value: any[]) {
		if (!column || !value) {
			return;
		}

		for (let idx = 0; idx < value.length; ++idx) {
			let data = value[idx];
			let member: FriendCircleMember = new FriendCircleMember();

			for (let index = 0; index < data.length; ++index) {
				member[column[index]] = data[index];
			}

			this.FriendCircleMemberList.AddOrUpdate(member.userid + '', member);
		}

		let curEnterCircleInfo = this.CurEnterFriendCircle;
		// 订阅亲友圈消息
		if (this.selfIsAdministrator()) {
			if (curEnterCircleInfo) {
				SubscribeManager.Instance.subscribeChannel(SubscribeChanelType.CHANEL_TYPE_FRIENDCIRCLE, "GroupAdmin#" + curEnterCircleInfo.ID);
			}
		} else {
			if (curEnterCircleInfo) {
				SubscribeManager.Instance.subscribeChannel(SubscribeChanelType.CHANEL_TYPE_FRIENDCIRCLE, "Group#" + curEnterCircleInfo.ID);
			}
		}
	}

	/**
	 *  移除成员
	 */
	public remoeMember(userId: number) {
		if (!userId) {
			return;
		}

		this.FriendCircleMemberList.Remove(userId.toString());
	}

	/** 
	 * 获取管理员列表(不包括圈主)
	 */
	public getAdminList(): Array<FriendCircleMember> {
		let adminList = new Array<FriendCircleMember>();

		let memberInfo: FriendCircleMember = null;
		for (var idx = 0; idx < this.FriendCircleMemberList.Count; ++idx) {
			let key = this.FriendCircleMemberList.Keys[idx];
			memberInfo = this.FriendCircleMemberList.GetValue(key + '');

			if (memberInfo && parseInt(memberInfo.isadmin) && this.CurEnterFriendCircle.userId != memberInfo.userid + "") {
				adminList.push(memberInfo);
			}
		}

		return adminList;
	}

	/** 
	 * 自己是否是管理员
	 */
	public selfIsAdministrator(): boolean {
		let userInfo = Global.Instance.DataCache.UserInfo.userData;
		let info = this.FriendCircleMemberList.GetValue(userInfo.UserID + '');

		if (!info) {
			return false;
		}

		if (parseInt(info.isadmin) > 0) {
			return true;
		}
		return false;
	}

	/**
	 * 获取圈主信息
	 */
	public getCircleOwenerInfo(): FriendCircleMember {
		if (!this.CurEnterFriendCircle) {
			return null;
		}

		let info = this.FriendCircleMemberList.GetValue(this.CurEnterFriendCircle.userId + '');
		return info;
	}

	/**************************************************房间列表***********************************************/
	/**
	 * 获取房间列表
	 */
	private _roomTableList: Dictionary<string, QL_Common.UserCreateTableInfo>;

	public get RoomTableList(): Dictionary<string, QL_Common.UserCreateTableInfo> {
		if (!this._roomTableList) {
			this._roomTableList = new Dictionary<string, QL_Common.UserCreateTableInfo>();
		}

		return this._roomTableList;
	}

	public set RoomTableList(data: Dictionary<string, QL_Common.UserCreateTableInfo>) {
		this._roomTableList = data;
	}


	/**
	 * 排序桌子列表
	 */
	private orderRoomTableList() {
		// 根据游戏状态进行排序 准备状态中的排在最前面
		let keys = this.RoomTableList.Keys;
		let readyArray = new Dictionary<string, QL_Common.UserCreateTableInfo>();
		let gameIngArray = new Dictionary<string, QL_Common.UserCreateTableInfo>();
		// let gameEndArray = new Dictionary<string, QL_Common.UserCreateTableInfo>();

		for (let idx = 0; idx < keys.length; ++idx) {
			let tableInfo = this.RoomTableList.GetValue(keys[idx] + '');

			if (QL_Common.UserCreateTableNoticeStatus.CreateTable == tableInfo.status) {
				// 准备中的
				readyArray.AddOrUpdate(keys[idx] + '', tableInfo);
			} else if (QL_Common.UserCreateTableNoticeStatus.TableInGameing == tableInfo.status) {
				// 正在游戏中的
				gameIngArray.AddOrUpdate(keys[idx] + '', tableInfo);
			} else if (QL_Common.UserCreateTableNoticeStatus.TableGameOver == tableInfo.status) {
				// 游戏结束的
				// gameEndArray.AddOrUpdate(keys[idx],tableInfo);
			}
		}

		this.RoomTableList.Clear();

		if (readyArray.Count > 0) {
			this.RoomTableList = this.RoomTableList.Concat(readyArray);
		}

		if (gameIngArray.Count > 0) {
			this.RoomTableList = this.RoomTableList.Concat(gameIngArray);
		}

		cc.info('-- orderRoomTableList ', this.RoomTableList);
	}

	/**
	 * 添加或更房间列表
	 */
	public addOrUpdateRoomTableList(list: Array<QL_Common.UserCreateTableInfo>) {
		// 先清空
		this.RoomTableList.Clear();

		if (!list || 0 == list.length) {
			return;
		}

		for (var idx = 0; idx < list.length; ++idx) {
			this.RoomTableList.AddOrUpdate(list[idx].TableId + '', list[idx]);
		}

		// 进行排序
		this.orderRoomTableList();
	}

	/**************************************************消息列表***********************************************/

	/**
	 * 消息列表
	 */
	private _messageList: Dictionary<string, Array<any>>;

	public get MessageList(): Dictionary<string, Array<any>> {
		if (!this._messageList) {
			this._messageList = new Dictionary<string, Array<any>>();
		}

		return this._messageList;
	}

	public set MessageList(data: Dictionary<string, Array<any>>) {
		this._messageList = data;
	}

	/** 
	 * 消息列表未处理的消息
	 */
	private _unDealMessageList: Dictionary<string, any>;

	public get UnDealMessageList(): Dictionary<string, Array<any>> {
		if (!this._unDealMessageList) {
			this._unDealMessageList = new Dictionary<string, Array<any>>();
		}

		return this._unDealMessageList;
	}

	public set UnDealMessageList(data: Dictionary<string, Array<any>>) {
		this._unDealMessageList = data;
	}

	/**
	 * 添加消息
	 */
	public addMessage(data) {
		if (!data || 0 == data.length) {
			return;
		}

		this.MessageList.Clear();
		// 降序排序
		data.sort((param1, param2) => {
			return param2[4] - param1[4];
		});

		for (let idx = 0; idx < data.length; ++idx) {
			let info = data[idx];
			// if (1 == info[5]) {
			// 	this.UnDealMessageList.AddOrUpdate(info[0].toString(),info);
			// }

			this.MessageList.Add(info[0].toString(), info);
		}

		cc.info('-- messagelist ', this.MessageList);
	}

	/************************************************** 战绩数据 ***********************************************/

	/**
	 * 排行列表
	 */
	private _rankList: Dictionary<string, Array<any>>;

	public get RankListList(): Dictionary<string, Array<any>> {
		if (!this._rankList) {
			this._rankList = new Dictionary<string, Array<any>>();
		}

		return this._rankList;
	}

	public set RankListList(data: Dictionary<string, Array<any>>) {
		this._rankList = data;
	}


	/*****************************************************************************************************/
	/**
	 * 是否是圈主
	 */
	public selfIsCircleOwner(): boolean {
		let userInfo = Global.Instance.DataCache.UserInfo.userData;

		if (this.CurEnterFriendCircle && this.CurEnterFriendCircle.userId == userInfo.UserID + '') {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 清除数据
	 */
	public clearData() {
		this._curSelectedRule = null;
		this._curEnterFriendCircle = null;
		this.FriendCircleMemberList.Clear();
		this.MessageList.Clear();
		this.RoomTableList.Clear();
		this.UnDealMessageList.Clear();
		this.FriendCircleRuleList.Clear();
	}

	/**
	 * 存储数据到本地
	 */
	public saveToLocalStorage(key: string, value: string) {
		if (!key) {
			cc.log("error: localStorage key is invalid");
			return;
		}

		let userId = Global.Instance.DataCache.UserInfo.userData.UserID;

		if (userId > 0) {
			LocalStorage.SetItem(userId + key, value);
		}
	}

	/**
	 * 读取本地数据
	 */
	public getLocalStorage(key: string): string {
		if (!key) {
			cc.log("error: localStorage key is invalid");
			return;
		}

		let userId = Global.Instance.DataCache.UserInfo.userData.UserID;

		if (userId > 0) {
			return LocalStorage.GetItem(userId + key);
		}

		return "";

	}
}