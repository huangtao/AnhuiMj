import UIBase from "../../Form/Base/UIBase";
import Dictionary from "../../CustomType/Dictionary";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { LocalStorage } from "../../CustomType/LocalStorage";
import Global from "../../Global/Global";
import { Action } from "../../CustomType/Action";
import CityListScrollView from "./CityListScrollView";
import GameListScrollView from "./GameListScrollView";
import CreateRoomDataCache from "./CreateRoomDataCache";
import GameItem from "./GameItem";
import TopFormBase from "../General/TopFormBase";

const { ccclass, property } = cc._decorator;

@ccclass
export class SelectGame extends TopFormBase {
	public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;
    
    public get isPlayPopAction(): boolean { return false; }

	/** 
		城市列表
	 */
    @property(cc.ScrollView)
    scroll_cityList: cc.ScrollView = null;
    /** 
		游戏列表
	 */
    @property(cc.ScrollView)
    scroll_gameList: cc.ScrollView = null;

    /** 
		游戏Item预制体
	 */
    @property(cc.Prefab)
    prefab_gameItem: cc.Prefab = null;

    /** 
		游戏列表面板
	 */
    @property(cc.Layout)
    layout_game: cc.Layout = null;

    /**
     * 当前已添加的游戏
     */
    private _curAddGameItem: GameItem = null;

    public InitShow(){
        super.InitShow();
        this.initCityListUI();
    }

    /**
     * 初始化城市列表
     */
    public initCityListUI(): void{
    	// 初始化滚动列表
    	let scroll_city: CityListScrollView = this.scroll_cityList.getComponent("CityListScrollView");
        let cityList = CreateRoomDataCache.Instance.cityList;
        let act = new Action(this,this.cityItemClickEvent);
        scroll_city.resetList();
        scroll_city.clickAction = act;
        scroll_city.cityList = cityList;
        scroll_city.refreshData(cityList.Keys);
        scroll_city.setDefaultSelectedIdx(1);

        // 默认选中当前所在城市
        // this.cityItemClickEvent({name: "LIUAN",list: cityList.GetValue("LIUAN")});
    }

    /**
     * 城市按钮点击事件
     */
    private cityItemClickEvent(info: any): void{
        if (!info || !info.list) {
            return;
        }

    	// 切换面板
    	this.chanageGamePanel();

    	// 显示游戏列表
    	switch (info.name) {
    		case "CHAGNWAN":
    			// 常玩
    			this.showOfenPlayGameList();
    			break;
    		case "TUIJIAN":
    			// 推荐
    			this.showRecommendGameList(info.list);
    			break;
    		default:
    			// 城市
    			this.initGameListUI(info.list);
    			break;
    	}
    }

    /**
     *  切换城市标签
     */
    public chanageGamePanel(): void{
    	// 清空面板
        this.layout_game.node.removeAllChildren();
    }

    /**
     * 显示城市游戏列表
     */
    public initGameListUI(gameList: any): void{
        if (!gameList) {
            return;
        }

        let itemSize:cc.Size;
    	// 创建游戏列表
    	for (var idx = 0; idx < gameList.length; ++idx) {
    		const newNode = cc.instantiate(this.prefab_gameItem);
            const item: GameItem = newNode.getComponent(GameItem);

            if (!cc.isValid(itemSize)) {
                itemSize = item.node.getContentSize();
            }

            let act = new Action(this,this.addGameToHall);
            item.action = act;
            item.isFriendCircle = this.ShowParam.isFriendCircle;
            
            item.initUI(gameList[idx]);
            item.node.getContentSize();
            
            this.layout_game.node.addChild(item.node);
    	}
    }

    /**
     * 显示常玩游戏列表
     */
    public showOfenPlayGameList(): void{
        let gameList = CreateRoomDataCache.Instance.getOftenPlayGameList();

        if (gameList.length > 0) {
            this.initGameListUI(gameList);
        }
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-11
     * @Desc     显示推荐游戏列表
     * @param    {any}      info [description]
     */
    public showRecommendGameList(info: any): void{
        this.initGameListUI(info);
    }

    /**
     * 根据定位排序游戏列表
     */
    private orderGameListByGPS(): void{

    }

    /**
     * 更新当前添加游戏的状态显示并通知大厅刷新
     */
    public addGameToHall(item: GameItem): void{
        if (!cc.isValid(item)) {
            return;
        }

        // 更新上一个已添加的显示为添加
        if (cc.isValid(this._curAddGameItem)) {
            this._curAddGameItem.updateAddStatusShow(false);
        }

        this._curAddGameItem = item;

        // 更新大厅显示
        if (this.ShowParam && this.ShowParam.act) {
            this.ShowParam.act.Run([item.GameInfo]);
        }
    }
}
