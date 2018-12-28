

import { ISocketManager } from "../Interface/ISocketManager";
import DataCollection from "./DataCollection";
import { IGameHost } from "../Interface/IGameHost";
import { GameHost } from "./GameHost";
import { IUiManager } from "../Interface/IUiManager";
import { MainEventHandler } from "../MainHandler/MainEventHandler";
import { GameBaseClass } from "../gameplug/base/GameBaseClass";
import { IWXManager } from "../Interface/IWXManager";
import SuperClass from "../SceneCtrl/SuperClass";
import SocketManager from "../Manager/SocketManager";
import { EventManager } from "../Manager/EventManager";
import UiManager from "../Manager/UiManager";
import { WxManager } from "../Manager/WxManager";
import { IAudioManager } from "../Interface/IAudioManager";
import { AudioManager } from "../Manager/AudioManager";
import { HeartMessageManager } from "../Manager/HeartMessageManager";
import { SystmPushMsgHandler } from "../MainHandler/SystmPushMsgHandler";
import { IActionManager } from "../Interface/IActionManager";
import { ActionManager } from "../Manager/ActionManager";
import { IPanelManager } from "../Interface/IPanelManager";
import { PanelManager } from "../Manager/PanelManager";

export default class Global {


    private constructor() {

    }

    public static GC() {
        //在ios上在执行GC操作
        //if(cc.sys.isNative&&(cc.sys.platform===cc.sys.IPHONE||cc.sys.platform===cc.sys.IPAD)){
        	// cc.sys.garbageCollect();
        //}
    }

    /**
     * 
     * @param name 场景名称
     */
    public static IsContainsScene(name: string) {
        if (cc.director._getSceneUuid(name)) {
            return true;
        }
        return false;
    }

    public static SceneName: string;


    public static ChangeScene(name: string, fun?: Function,tipTxt?: string) {
    	Global.GC();
        cc.log("请求切换到场景:" + name);
        if (name === "hotupdate" && cc.sys.isBrowser) {
            cc.log("web环境下不启动热更新界面，直接定位到Login");
            Global.ChangeScene("Login", fun);
            return;
        }
        if (name === Global.SceneName) {
            if (fun) {
                fun();
            }
            return;
        }
        if (!Global.IsContainsScene(name)) {
            Global.Instance.UiManager.ShowTip("游戏暂未开放");
            return;
        }
        Global.SceneName = name;

        if (tipTxt) {
            Global.Instance.UiManager.ShowLoading(tipTxt);
        }else{
            Global.Instance.UiManager.ShowLoading("正在进入游戏");
        }
        
        cc.director.preloadScene(name, function (err) {
            if (err) {
                Global.Instance.UiManager.CloseLoading();
                Global.Instance.UiManager.ShowTip("游戏暂未开放");
            } else {
                cc.director.loadScene(name, fun);
            }
        });
    }

    private static _socketHeart: HeartMessageManager;
    public static get SocketHeart(): HeartMessageManager {
        if (!Global._socketHeart) {
            Global._socketHeart = new HeartMessageManager();
        }
        return Global._socketHeart;
    }

    //单例
    private static _ins: Global;
    public static get Instance(): Global {
        if (!Global._ins) {
            Global._ins = new Global();
        }
        return Global._ins;
    }

    //socket
    private _socketManager: ISocketManager;
    public get Socket(): ISocketManager {
        if (!this._socketManager) {
            this._socketManager = new SocketManager();
        }
        return this._socketManager;
    }

    //数据缓存    
    private _dataCache: DataCollection;
    public get DataCache(): DataCollection {
        if (!this._dataCache) {
            this._dataCache = new DataCollection();
        }
        return this._dataCache;
    }

    //游戏宿主
    private _gameHost: IGameHost;
    public get GameHost(): IGameHost {
        if (!this._gameHost) {
            this._gameHost = new GameHost();
        }
        return this._gameHost;
    }

    private _eventManager: EventManager;
    public get EventManager(): EventManager {
        if (!this._eventManager) {
            this._eventManager = new EventManager();
            this._eventManager.RegisterEventHadnle(new MainEventHandler())
        }
        return this._eventManager;
    }

    private _uiManager: IUiManager;
    public get UiManager(): IUiManager {
        if (!this._uiManager) {
            this._uiManager = new UiManager();
        }
        return this._uiManager;
    }

    private _wxManager: IWXManager;
    public get WxManager() {
        if (!this._wxManager) {
            this._wxManager = new WxManager();
        }
        return this._wxManager;
    }


    private _audioManager: IAudioManager;
    public get AudioManager() {
        if (!this._audioManager) {
            this._audioManager = new AudioManager();
        }
        return this._audioManager;
    }

    private _systmPushMsgHandler:SystmPushMsgHandler;
	public get SystmPushMsgHandler(): SystmPushMsgHandler {
        if(!this._systmPushMsgHandler){
            this._systmPushMsgHandler=new SystmPushMsgHandler();
        }
		return this._systmPushMsgHandler;
	}

    private _actionManager:IActionManager;
	public get ActionManager(): IActionManager {
        if(!this._actionManager){
            this._actionManager=new ActionManager();
        }
		return this._actionManager;
	}

    private _panelManager:IPanelManager;
	public get PanelManager(): IPanelManager {
        if(!this._actionManager){
            this._panelManager=new PanelManager();
        }
		return this._panelManager;
	}


    public get NowCanves() {
        return cc.Canvas.instance.node;
    }

    public get NowScene(): SuperClass {
        const scene = cc.director.getScene();
        if (!cc.isValid(scene)) {
            cc.log("无效的scene");
            return null;
        }
        const now = scene.getComponentInChildren(SuperClass);
        if (!cc.isValid(now)) {
            cc.log("无效的SuperClass");
            return null;
        }
        return <SuperClass>now;
    }

    public get NowGameScene(): GameBaseClass {
        let c = this.NowScene;
        if (!cc.isValid(c)) {
            return null;
        }
        if (c instanceof GameBaseClass) {
            return c;
        }
        return null;
    }
}