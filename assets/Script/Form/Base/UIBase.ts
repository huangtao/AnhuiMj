import { IEventHandler } from "../../Interface/IEventHandler";
import { Action } from "../../CustomType/Action";
import Global from "../../Global/Global";
import { EventCode } from "../../Global/EventCode";
import { AudioType } from "../../CustomType/Enum";
import { PlayEffect, ReflushNodeWidgetAlignment } from "../../Tools/Function";

const { ccclass, property } = cc._decorator;

/**
 * 弹窗类窗体组件基类，提供弹窗类界面的弹出和关闭等一些管理方法，提供界面从弹出到关闭的方法生命周期维护
 * 
 */
export default abstract class UIBase<T> extends cc.Component implements IEventHandler {

    protected isShowUI: boolean = false;
    //表示当前的页面是否已经激活进场动画
    protected hasEnterAnimation: boolean = false;
    //表示当前的页面是否已经激活进场动画
    protected hasExitAnimation: boolean = false;
    //表示当前弹窗界面是否是单根实例
    public get isOneInstance(): boolean { return true; }
    public get isPersistRootFrom(): boolean { return false; }
    public get isPlayPopAction(): boolean { return true; }
    public get canReUse(): boolean { return true }

    protected get needPlayPopAction(): boolean { return this.isPlayPopAction; }


    protected _isFree = true;
    private _canClose: boolean = true;
    private _reqClose: boolean = false;
    public get IsFree() {
        return this._isFree;
    }

    onLoad(): void {
        //cc.game.addPersistRootNode(this.node);
    }

    start(): void {
        //this.node.setPosition(640,360);
    }

    update(): void {

    }

    lateUpdate(): void {

    }

    onDestroy(): void {
        if (this.IsEventHandler) {
            Global.Instance.EventManager.UnRegisterEventHadnle(this);
        }
    }

    onEnable(): void {

    }

    onDisable(): void {

    }

    protected ShowParam: T;
    protected get DataCache() {
        return Global.Instance.DataCache;
    }
    protected get EventManager() {
        return Global.Instance.EventManager;
    }
    protected get UiManager() {
        return Global.Instance.UiManager;
    }

    protected get UserInfo() {
        return this.DataCache.UserInfo;
    }
    OnEventComeIn(eventCode: number, value: any): boolean {
        switch (eventCode) {
            case EventCode.onKeyPressed:
                return this.onKeyboardClick(value);
        }
        return this.OnUiEventComeIn(eventCode, value);
    }



    // /**
    //  * 名字
    //  */
    // public abstract get UIname(): string;

    private onKeyboardClick(value: cc.KEY) {
        if (!this.IsKeyHandler) {
            return false;
        }
        if (value === cc.KEY.escape || value == cc.KEY.back) {
            this.BackClick();
            return true;
        } else {
            return this.OnKeyClick(value);
        }
    }


    /**
     * 是否监听信息
     */
    public abstract get IsEventHandler(): boolean;

    /**
     * 是否处理物理按键
     */
    public abstract get IsKeyHandler(): boolean;

    /**
     * 
     * @param eventCode 消息到达
     * @param value 
     */
    protected OnUiEventComeIn(eventCode: number, value: any): boolean {
        return false;
    }

    /**
     * 显示方法，调用该方法会显示界面。
     * @param root 
     * @param param 
     * @param action 
     */
    public Show(root?: cc.Node, param?: T, action?: Action) {
        if (this.isShowUI && this.isOneInstance) {
            if (this._canClose) {
                //如果当前界面可以关闭，则调用关闭后重新显示
                let a: Action = new Action(this, this.Show, [root, param, action]);
                this.Close(a);
            }
            return;
        }
        this._canClose = false;
        this.isShowUI = true;
        this._isFree = false;
        this._reqClose = false;
        if (!(cc.isValid(root) && this.isValid)) {
            //root = cc.director.getScene();
            root = cc.Canvas.instance.node;
        }
        if (this.IsEventHandler) {
            Global.Instance.EventManager.RegisterEventHadnle(this);
        }
        this.ShowParam = param;
        if (this.isPersistRootFrom) {
            root.addChild(this.node);
            if (!cc.game.isPersistRootNode(this.node)) {
                // this.node.removeFromParent(true);
                cc.game.addPersistRootNode(this.node);
            }
        }
        else {
            root.addChild(this.node);
        }
        this.InitShow();
        this.PlayEnterAnimation(() => {
            this.OnShow();
            this._canClose = true;
            if (action) {
                action.RunArgs();
            }
            if(this._reqClose){
                this.CloseClick();
            }
        });
    }

    /**
     * 关闭
     * @param action 
     */
    public Close(action?: Action, param?: any) {
        if(!this._canClose){
            this._reqClose = true;
            if(this._canClose){
                this.scheduleOnce(()=>{
                    this.CloseClick();
                },0);
            }
            return;
        }
        this.scheduleOnce(() => {
            if (!this.isShowUI || this.hasEnterAnimation) return;
            this.hasEnterAnimation = false;
            this.PlayExitAnimation(() => {
                this.CloseUI(action);
            })
        });
    }
    protected CloseUI(action?: Action, param?: any) {
        PlayEffect(cc.url.raw("resources/Sound/close_panel.mp3"));
        if (this.IsEventHandler) {
            Global.Instance.EventManager.UnRegisterEventHadnle(this);
        }
        //cc.log(this.node.parent);
        this.node.removeFromParent(true);
        this.OnClose();
        this._isFree = true;
        this.isShowUI = false;
        if (action) {
            action.RunArgs();
        }
    }




    /****************************** 界面的进场动画和退场动画部分 ************************************* */

    protected PlayEnterAnimation(callBack?: Function) {
        if (this.needPlayPopAction) {
            if (this.hasEnterAnimation) return;
            this.hasEnterAnimation = true;
            ReflushNodeWidgetAlignment(this, (() => {
                this.EnterAnimation(callBack)
            }).bind(this));
            return;
        }
        if (!!callBack) {
            callBack();
        }
    }
    protected PlayExitAnimation(callBack?: Function) {
        if (this.needPlayPopAction) {
            if (this.hasExitAnimation) return;
            this.hasExitAnimation = true;
            this.ExitAnimation(callBack);
            return;
        }
        if (!!callBack) {
            callBack();
        }
    }
    protected EnterAnimation(callBack?: Function) {
        // 弹出效果、从小到大，然后再从大到小
        // if (this.isPlayPopAction) {
        // 弹出效果、从小到大，然后再从大到小
        if (!callBack) {
            callBack = () => { };
        }


        let oldScale = this.node.scale;

        this.node.setScale(0.5);
        this.node.opacity = 255;
        let scaleadd = 0.05
        this.node.runAction(
            cc.sequence(cc.scaleTo(0.15, oldScale + scaleadd, oldScale + scaleadd),
                cc.scaleTo(0.15, oldScale, oldScale),
                cc.callFunc(() => {
                    try {
                        callBack();
                    }
                    catch (e) {
                        cc.error(e);
                    }
                    finally {
                        this.hasEnterAnimation = false;
                    }
                })
            ));
    }
    protected ExitAnimation(callBack?: Function) {
        // 弹出效果、从小到大，然后再从大到小
        if (!callBack) {
            callBack = () => { };
        }

        let oldScale = this.node.scale;
        let closeScale = 0.3;

        // this.node.setScale(0.5);
        // this.node.opacity = 128;
        let scaleadd = 0.05
        this.node.runAction(cc.spawn(
            cc.fadeTo(0.3, 255),
            cc.sequence(cc.scaleTo(0.15, oldScale + scaleadd, oldScale + scaleadd),
                cc.scaleTo(0.15, closeScale, closeScale)
                , cc.callFunc(() => {
                    try {
                        callBack();
                    }
                    catch (e) {
                        cc.error(e);
                    }
                    finally {
                        this.hasExitAnimation = false;
                        this.node.setScale(oldScale);
                    }

                }))
        ));
    }




    /**
     * 刷新
     */
    public InitShow() {
    }
    public OnShow() {
    }

    public OnClose() {
        // this.InitShow();
    }
    public BackClick() {
        this.CloseClick();
    }
    public OnKeyClick(value: cc.KEY): boolean {
        return false;
    }
    public CloseClick() {
        this.Close();
    }

}