/**
 * 创建房间数据缓存
 */
import Dictionary from "../../CustomType/Dictionary";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { LocalStorage } from "../../CustomType/LocalStorage";
import { Action } from "../../CustomType/Action";
import { ToggleType } from "./CreateRoomEnum";
import Global from "../../Global/Global";
import ConfigData from "../../Global/ConfigData";

export default class CreateRoomDataCache {
	private preGameRuleJsonList = [
		'M_BiJi',
		'M_HQMJ',
		'M_LHZMJ'
	];

	private static _instance: CreateRoomDataCache;
	/**
	 * 当前选择的游戏
	 */
	private _curSelectGameId: number = null;

	public get CurSelectGameId(): number {
		return this.CurSelectGameId;
	}

	public set CurSelectGameId(Id: number) {
		this._curSelectGameId = Id;
	}

	//
	public static get Instance(): CreateRoomDataCache {
		if (!CreateRoomDataCache._instance) {
			CreateRoomDataCache._instance = new CreateRoomDataCache();
		}

		return CreateRoomDataCache._instance;
	}

	/**
	* 常玩列表<gameId,times>
	*/
	private _OftenPlayGameList: Dictionary<string, number>;

	public get OftenPlayGameList(): Dictionary<string, number> {
		if (!this._OftenPlayGameList) {
			this._OftenPlayGameList = new Dictionary<string, number>();
		}

		return this._OftenPlayGameList;
	}

	public set OftenPlayGameList(data: Dictionary<string, number>) {
		this._OftenPlayGameList = data;
	}

	/**
	* 城市游戏列表
	*/
	private _cityList: Dictionary<string, Array<QL_Common.GameInfo>>;

	/**
	* 规则列表
	*/
	private _ruleDescList: Dictionary<string, Array<any>>;

	/**
	 * 游戏规则json缓存
	 */
	private _gameRuleJsonArray: Dictionary<string, Array<any>> = null;

	public get RuleDescList(): Dictionary<string, Array<any>> {
		if (!this._ruleDescList) {
			this._ruleDescList = new Dictionary<string, Array<any>>();
		}

		return this._ruleDescList;
	}

	public get cityList(): Dictionary<string, Array<QL_Common.GameInfo>> {
		if (!this._cityList) {
			this._cityList = new Dictionary<string, Array<QL_Common.GameInfo>>();
			this.initCityList();
		}

		// 初始化常玩列表
		let oftenList = this.getOftenPlayGameList();
		this._cityList.AddOrUpdate("CHAGNWAN", oftenList);
		return this._cityList;
	}

	public get gameRuleJsonArray(): Dictionary<string, Array<any>> {
		if (!this._gameRuleJsonArray) {
			this._gameRuleJsonArray = new Dictionary<string, Array<any>>();
			this.initCityList();
		}

		return this._gameRuleJsonArray;
	}

	/**
	 * 初始化城市列表
	 */
	private initCityList(): void {
		// 获取数据
		let list = Global.Instance.DataCache.GameList.CityGames;
		this._cityList = new Dictionary<string, Array<QL_Common.GameInfo>>();

		this._cityList.AddOrUpdate("CHAGNWAN", new Array<QL_Common.GameInfo>());

		// 初始化常玩列表
		let oftenList = this.getOftenPlayGameList();
		this._cityList.AddOrUpdate("CHAGNWAN", oftenList);

		if (!this._cityList.GetValue("TUIJIAN")) {
			this._cityList.AddOrUpdate("TUIJIAN", new Array<QL_Common.GameInfo>());
		}

		let keys = list.Keys;
		for (var idx = 0; idx < keys.length; ++idx) {
			this._cityList.AddOrUpdate(keys[idx], list.GetValue(keys[idx]));
		}

		// 把比鸡放到推荐列表中
		let gameInfo = Global.Instance.DataCache.GameList.GetGame(51);

		if (gameInfo) {
			this._cityList.GetValue('TUIJIAN').push(gameInfo);
		}

		// 根据定位排序
		this.orderCityListByGPS("");
	}

	/**
	 * 获取大厅游戏列表
	 */
	public getHallCityGameList(): Dictionary<string, Array<QL_Common.GameInfo>> {
		// 过滤掉只在指定亲友圈显示的游戏
		if (0 == ConfigData.FriendAccreditGameList.length) {
			return this.cityList;
		}

		let tmpCityGameList: Dictionary<string, Array<QL_Common.GameInfo>> = new Dictionary<string, Array<QL_Common.GameInfo>>();
		for (var idx = 0; idx < this.cityList.Count; ++idx) {
			let cityKey = this.cityList.Keys[idx];
			let citGameList = this.cityList.GetValue(this.cityList.Keys[idx]);
			let tmpGameList = new Array<QL_Common.GameInfo>();
			for (var index = 0; index < citGameList.length; ++index) {
				let gameInfo = citGameList[index];

				if (!gameInfo) {
					continue;
				}

				if (-1 == ConfigData.FriendAccreditGameList.indexOf(gameInfo.GameID)) {
					tmpGameList.push(gameInfo);
				}
			}

			if (tmpGameList.length > 0) {
				tmpCityGameList.AddOrUpdate(cityKey, tmpGameList);
			}
		}
		return tmpCityGameList;
	}

	/**
	 * 获取亲友圈游戏列表
	 * 传入亲友圈指定的游戏授权列表
	 */
	public getFriendCityGameList(gameIdList: number[]): Dictionary<string, Array<QL_Common.GameInfo>> {
		// 过滤掉在该亲友圈授权的游戏
		if (0 == gameIdList.length) {
			return this.getHallCityGameList();
		}

		let tmpCityGameList: Dictionary<string, Array<QL_Common.GameInfo>> = new Dictionary<string, Array<QL_Common.GameInfo>>();
		for (var idx = 0; idx < this.cityList.Count; ++idx) {
			let cityKey = this.cityList.Keys[idx];
			let citGameList = this.cityList.GetValue(this.cityList.Keys[idx]);
			let tmpGameList = new Array<QL_Common.GameInfo>();
			for (var index = 0; index < citGameList.length; ++index) {
				let gameInfo = citGameList[index];

				if (!gameInfo) {
					continue;
				}

				if (-1 == ConfigData.FriendAccreditGameList.indexOf(gameInfo.GameID)) {
					tmpGameList.push(gameInfo);
				} else if (-1 != gameIdList.indexOf(gameInfo.GameID)) {
					tmpGameList.push(gameInfo);
				}
			}

			if (tmpGameList.length > 0) {
				tmpCityGameList.AddOrUpdate(cityKey, tmpGameList);
			}
		}
		return tmpCityGameList;
	}

	/**
	 * 根据定位来排序城市列表
	 */
	private orderCityListByGPS(cityName: string): void {
		// 根据定位的城市名称来排序，当前定位所在城市放在城市列表最前面
		// 判断该城市游戏是否已经上线
		if (!cc.isValid(cityName) || !cc.isValid(this._cityList.Contains(cityName)) || "" == cityName) {
			// 未上线: 返回系统默认排序
		} else {
			// 已上线: 进行排序
			let index = this._cityList.Keys.indexOf(cityName);

			// 当前城市放到第一个位置
			this._cityList.swapKeyValue(cityName, this._cityList.Keys[2]);
		}
	}


	/**
	 * 加载本地存储常玩列表
	 */
	public loadLocalOftenPlayList() {
		this.OftenPlayGameList.Clear();
		let gameList = LocalStorage.GetItem("OftenPlayGame");

		if (!gameList) {
			return;
		}

		gameList = gameList.split('|');

		for (let idx = 0; idx < gameList.length; ++idx) {
			let times = 1;
			let gameId = gameList[idx];

			if (0 == this.OftenPlayGameList.Count) {
				this.OftenPlayGameList.Add(gameId + '', times);
			} else {
				times = this.OftenPlayGameList.GetValue(gameId + '');

				if (times && times > 0) {
					this.OftenPlayGameList.AddOrUpdate(gameId + '', times + 1);
				} else {
					this.OftenPlayGameList.Add(gameId + '', 1);
				}
			}
		}
	}

	/**
	 * 添加常玩游戏
	 */
	public addOftenPlayGame(gameId: number) {
		// 先判断是否存在 存在则次数加一

		let gameList: string = LocalStorage.GetItem('OftenPlayGame');

		if (!gameList) {
			gameList = '';
			LocalStorage.SetItem('OftenPlayGame', gameList + gameId);
		} else {
			LocalStorage.SetItem('OftenPlayGame', gameList + '|' + gameId);
		}

		cc.info('-- addOftenPlayGame ', gameList);
	}

	/**
	 * 获取常玩游戏列表
	 */
	public getOftenPlayGameList(): Array<QL_Common.GameInfo> {
		this.loadLocalOftenPlayList();

		let gameList = new Array<QL_Common.GameInfo>();
		for (var idx = 0; idx < this.OftenPlayGameList.Count; ++idx) {
			let gameInfo = Global.Instance.DataCache.GameList.GetGame(parseInt(this.OftenPlayGameList.Keys[idx]));
			gameList.push(gameInfo);
		}

		// cc.info('-- OftenPlayGameList ', this.OftenPlayGameList);
		return gameList;
	}

	/***************************************游戏规则加载***************************************/
	/**
	 * 加载游戏规则配置JSON
	 */
	public loadGameRuleJson(modelName: string, act?: Action) {
		if (!modelName || "" === modelName) {
			cc.info("error: loadGameRuleJson error!");
			return;
		}

		let _act = act;
		// 判断是否已经缓存
		let json = this.gameRuleJsonArray.GetValue(modelName);

		if (json && act) {
			_act.Run([json]);
			return;
		}

		cc.loader.loadRes(modelName + ".json", (err, res) => {
			if (err) {
				cc.info(err);

				if (_act) {
					_act.Run([err]);
				}
			} else {
				// cc.info(res);
				cc.info('-- loadGameRuleJson success', modelName + '.json');
				this.putRuleJsonToCache(res);

				if (_act) {
					_act.Run([res]);
				}
			}
		});
	}

	/**
	 * 添加游戏规则JSON 到缓存
	 */
	private putRuleJsonToCache(json: any) {
		if (!json) {
			return;
		}

		this.gameRuleJsonArray.AddOrUpdate(json.gameName, json);
	}

	/**
	 * 获取游戏规则
	 */
	public getRuleJson(modelName: string, act?: Action): any {
		if (!modelName) {
			return;
		}

		if (!this.gameRuleJsonArray.GetValue(modelName) && act) {
			this.loadGameRuleJson(modelName, act);
			return;
		}

		if (act) {
			act.Run([this.gameRuleJsonArray.GetValue(modelName)])
		} else {
			return this.gameRuleJsonArray.GetValue(modelName);
		}
	}

	/**
	 * 读取玩法描述
	 */
	public getRuleDesc(modelName: string, rule: any, act: Action) {
		if (!rule || !modelName) {
			cc.info("--- error param ruele is null (getRuleDesc)");
			return;
		}

		if (!act) {
			return;
		}

		let _act = act;
		let gameRule = rule;
		let cb = new Action(null, (res: Dictionary<string, Array<any>>) => {
			if (!res || !res[0]) {
				return;
			}

			let ruleJson = {};
			let data = res[0];

			for (let key in gameRule) {
				for (let stage = 0; stage < data.Count; ++stage) {
					let stageName = data.Keys[stage];
					let values = data.GetValue(stageName);
					for (var idx = 0; idx < values.length; ++idx) {
						let attrObj = values[idx];

						// 判断属性名和属性值相同
						if ((attrObj[key] || 0 == attrObj[key]) && (attrObj[key] == gameRule[key]) || (attrObj[key] + "" == gameRule[key] + "")) {
							if (!ruleJson[stageName]) {
								ruleJson[stageName] = "";
							}

							ruleJson[stageName] += attrObj.desc + "、";
						}
					}
				}
			}
			// 去除最后多余的'、'号
			for (let key in ruleJson) {
				let str = ruleJson[key] + '';
				let index = str.lastIndexOf('、');

				if (-1 != index) {
					str = str.substring(0, index);
				}

				ruleJson[key] = str;
			}

			if (_act) {
				_act.Run([ruleJson]);
			}

			cc.info("-- rule json ", ruleJson);

		});
		this.getRuleDescList(modelName, cb);
	}

	/**
	 * 读取规则界面显示的所有规则描述
	 */
	private getRuleDescList(modelName: string, act: Action) {
		// 获取缓存中的json
		if (!modelName || "" == modelName) {
			return;
		}

		let _act = act;
		let callBack = new Action(null, (res) => {
			if (res[0]) {
				let data = res[0];
				let itemInfo: any = null;
				for (let row = 0; row < data.list.length; ++row) {
					let attrArray = new Array<any>();

					for (let idx = 0; idx < data.list[row].itemList.length; ++idx) {
						itemInfo = data.list[row].itemList[idx];
						for (var index = 0; index < itemInfo.list.length; ++index) {
							let obj = {};

							if (ToggleType.CHECKBOX_LEFTRIGHT == itemInfo.nodeType
								|| ToggleType.SINGLE_LEFTRIGHT == itemInfo.nodeType) {
								obj[itemInfo.attr] = itemInfo.list[index].value;
								obj["desc"] = itemInfo.list[index].desc;
							} else {
								obj[itemInfo.list[index].attr] = itemInfo.list[index].value;
								obj["desc"] = itemInfo.list[index].desc;
							}

							attrArray.push(obj);
						}
					}

					this.RuleDescList.AddOrUpdate(data.list[row].desc, attrArray);
				}

				if (_act) {
					_act.Run([this.RuleDescList]);
				}
			}
		});

		this.loadGameRuleJson(modelName, callBack);
	}

	/**
	 * 预加载JSon
	 */
	public preLoadRuleJson() {
		for (let idx = 0; idx < this.preGameRuleJsonList.length; ++idx) {
			this.loadGameRuleJson(this.preGameRuleJsonList[idx]);
		}
	}
	/****************************************************************************************/
	/**
	 * 清空所有缓存
	 */
	public clearData() {
		this._cityList.Clear();
		this._gameRuleJsonArray.Clear();
	}
}