import SendMessage from "../Global/SendMessage";
import { QL_Common } from "../CommonSrc/QL_Common";
import { LocalStorage } from "../CustomType/LocalStorage";
import Dictionary from "../CustomType/Dictionary";
import { SubscribeChanelType } from "../CustomType/Enum";

/**
 * 	------------  订阅消息推送管理 -------------
 * 	
 * 1.记录管理用户订阅的所有消息推送
 * 2.取消指定类型的订阅
 * 3.取消所有订阅
 * 4.断线重连时重新订阅玩家所有订阅的类型
 */

export class SubscribeManager {
	private _channelList: Dictionary<string, Array<string>> = null;

	constructor() {
		this._channelList = new Dictionary<string, Array<string>>();
	}

	private static _instance: SubscribeManager = null;
	public static get Instance(): SubscribeManager {
		if (!SubscribeManager._instance) {
			SubscribeManager._instance = new SubscribeManager();
		}

		return SubscribeManager._instance;
	}

	/**
	 * 订阅渠道消息
	 */
	public subscribeChannel(chanelType: SubscribeChanelType, chanel: string) {
		if (!chanel) {
			cc.log("-- error: chanel is null");
			return;
		}

		// 是否已经订阅
		let chanelSubList = this._channelList.GetValue(chanelType);
		
		if (!chanelSubList) {
			chanelSubList = new Array<string>();
			this._channelList.Add(chanelType, chanelSubList);
		}

		if (-1 != chanelSubList.indexOf(chanel)) {
			cc.log("--- warn: repeat subscribe");
			return;
		}

		// 缓存订阅记录
		chanelSubList.push(chanel);
		SendMessage.Instance.SubscribeOrUnsubscribe(chanel, QL_Common.SubscribeMessageOpType.Subscribe);
	}

	/**
	 * 取消订阅指定渠道
	 */
	public unSubscribeChannel(chanelType: SubscribeChanelType, chanel: string) {
		if (!chanel || !chanelType) {
			cc.log("-- error: chanel or chanelType is null");
			return;
		}

		let chanelSubList = this._channelList.GetValue(chanelType);

		if (!chanelSubList) {
			cc.log("-- warn: not find subscribe ", chanelType);
			return;
		}

		let index = chanelSubList.indexOf(chanel);
		if (-1 == index) {
			cc.log("-- warn: not find subscribe ", chanel);
			return;
		}

		chanelSubList.splice(index, 1);
		cc.log("--- subscribeList: ", this._channelList);
		SendMessage.Instance.SubscribeOrUnsubscribe(chanel, QL_Common.SubscribeMessageOpType.Unsubscribe);
	}

	/**
	 * 取所有订阅
	 */
	public unAllSubscribeChannel() {
		for (var idx = 0; idx < this._channelList.Count; ++idx) {
			let chanelSubList = this._channelList.Values[idx];
			for (var index = 0; index < chanelSubList.length; ++index) {
				let subInfo = chanelSubList[index];

				if (subInfo) {
					SendMessage.Instance.SubscribeOrUnsubscribe(subInfo, QL_Common.SubscribeMessageOpType.Unsubscribe);
				}
			}
		}

		// 清空缓存
		this._channelList.Clear();
	}

	/**
	 * 恢复玩家所有已订阅的消息渠道 (注：一般用于断线重连时恢复)
	 */
	public restoreSubscribeChannel() {
		for (var idx = 0; idx < this._channelList.Count; ++idx) {
			let chanelSubList = this._channelList.Values[idx];
			for (var index = 0; index < chanelSubList.length; ++index) {
				let subInfo = chanelSubList[index];

				if (subInfo) {
					SendMessage.Instance.SubscribeOrUnsubscribe(subInfo, QL_Common.SubscribeMessageOpType.Subscribe);
				}
			}
		}

		cc.log("--- restore all subscribe: ", this._channelList);
	}
}