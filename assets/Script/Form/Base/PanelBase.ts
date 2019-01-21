import Global from "../../Global/Global";
import { ReflushNodeWidgetAlignment } from "../../Tools/Function";
import { IPanelManager } from "../../Interface/IPanelManager";


export abstract class PanelBase<T> extends cc.Component {
 

    //表示当前的页面是否已经激活进场动画
    protected hasEnterAnimation: boolean = false;
    //表示当前的页面是否已经激活进场动画
    protected hasExitAnimation: boolean = false;
    public get canReUse(): boolean { return true }
    public get isPlayPopAction(): boolean { return true; }
    protected get needPlayPopAction(): boolean { return this.isPlayPopAction; }
    public PanelName:string;


    Show(root?: cc.Node, param?: T) {
        if (!(cc.isValid(root) && this.isValid)) {
            root = cc.Canvas.instance.node;
        }
        this.node.removeFromParent();
        root.addChild(this.node);
        this.InitShow();
        this.OnShow();
    }

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
    public get PanelManager(): IPanelManager{
        return Global.Instance.PanelManager;
    }

    /**
     * 刷新
     */
    public InitShow() {
    }
    public OnShow() {
    }
    public OnDestory() {
    }

    Destory() {
        if (this.canReUse) {
            

        } else {
            this.node.destroy();
        }
    }



    



    
    // /****************************** 界面的进场动画和退场动画部分 ************************************* */

    // protected PlayEnterAnimation(callBack?: Function) {
    //     if (this.needPlayPopAction) {
    //         if (this.hasEnterAnimation) return;
    //         this.hasEnterAnimation = true;
    //         ReflushNodeWidgetAlignment(this, (() => {
    //             this.EnterAnimation(callBack)
    //         }).bind(this));
    //         return;
    //     }
    //     if (!!callBack) {
    //         this.scheduleOnce(callBack,0);
    //     }
    // }
    // protected PlayExitAnimation(callBack?: Function) {
    //     if (this.needPlayPopAction) {
    //         if (this.hasExitAnimation) return;
    //         this.hasExitAnimation = true;
    //         this.ExitAnimation(callBack);
    //         return;
    //     }
    //     if (!!callBack) {
    //         this.scheduleOnce(callBack,0); 
    //     }
    // }
    // protected EnterAnimation(callBack?: Function) {
    //     if (!callBack) {
    //         callBack = () => { };
    //     }
    //     callBack();

    // }
    // protected ExitAnimation(callBack?: Function) {
    //     if (!callBack) {
    //         callBack = () => { };
    //     }
    //     callBack();
    // }




}