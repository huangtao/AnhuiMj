

import { IEventHandler } from "../Interface/IEventHandler";
import { ISocketHandler } from "../Interface/ISocketHandler";
import Global from "../Global/Global";
import { GameIF } from "../CommonSrc/GameIF";
import { UIName } from "../Global/UIName";
import { Action } from "../CustomType/Action";
import ConfigData from "../Global/ConfigData";
import { Debug } from "../Tools/Function";
import { NativeCtrl } from "../Native/NativeCtrl";

const { ccclass, property, executionOrder } = cc._decorator;


//场景基类

@ccclass
@executionOrder(100)
export default class SuperClass extends cc.Component implements IEventHandler, ISocketHandler {
    protected get DataCache() {
        return Global.Instance.DataCache;
    }

    protected get EventManager() {
        return Global.Instance.EventManager;
    }

    protected get UserInfo() {
        return this.DataCache.UserInfo;
    }

    public get UiManager() {
        return Global.Instance.UiManager;
    }

    public get AudioManager(){
        return Global.Instance.AudioManager;
    }

    onLoad(): void {
        
        //隐藏loading
        NativeCtrl.HideSplash();
        
        this.UiManager.CloseLoading();
        if(cc.sys.isNative){
            if(!Debug()){
                if (ConfigData.NeedHotupdate) {
                    Global.ChangeScene("hotupdate");
                    return;
                }
            }
        }
        this.EventManager.RegisterEventHadnle(this);
    }

    start(): void {

    }

    update(): void {

    }

    lateUpdate(): void {

    }

    onDestroy(): void {
        this.EventManager.UnRegisterEventHadnle(this);
    }

    onEnable(): void {

    }

    onDisable(): void {

    }

    ShowUiClick(e, uiname: string){
        Global.Instance.UiManager.ShowUi(uiname);
    }

    protected ShowUi(uiname: string, param?: any, action?: Action) {
        Global.Instance.UiManager.ShowUi(uiname, param, action);
    }



    /**
        * 消息到达
        * */
    OnMessageIncome(cm: GameIF.CustomMessage): boolean {
        return this.OnSceneMessage(cm);
    }

    OnEventComeIn(eventCode: number, value: any): boolean {
        return this.OnSceneEvent(eventCode, value);
    }


    OnConnect(): void {

    }

    OnServerReady(): void {

    }
    OnNetClose(): void {

    }
    OnNetError(): void {

    }


    /**
    * 消息到达
    * */
    protected OnSceneMessage(cm: GameIF.CustomMessage): boolean {
        return false;
    }


    //可选重写
    protected OnSceneEvent(eventCode: number, value: any): boolean { 
        return false;
    }



}
