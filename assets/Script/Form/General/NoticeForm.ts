import { Action } from "../../CustomType/Action";
import { QL_Common } from "../../CommonSrc/QL_Common";


const { ccclass, property } = cc._decorator;

@ccclass
export class NoticeForm extends cc.Component {
    public Action: Action;
    
    // private notice: QL_Common.HallRoolNotice;

    /**
     * 为了防止将来添加新的组件，这里使用一个布局器来做缓动动画
     */
    @property(cc.Node)
    tween:cc.Node=null;
    @property(cc.Label)
    label:cc.Label=null;
    onLoad(){
        
    }

    private _running=false;
    public Go(notice: any) {
        if (!notice) {
            this.onPlayEnd();
            return;
        }
        // this.notice = notice;//保存参数
        this.label.string=notice.Context;
        this.resetLocation();//重置位置
        this._running=true;
        if (!this.node.parent) {
            const scene = cc.director.getScene();
            scene.addChild(this.node);
        }
        if (!cc.game.isPersistRootNode(this.node)) {
            cc.game.addPersistRootNode(this.node);
        }
    }

    update() {
        if (!this._running) {
            return;
        }
        this.tween.x-=1;
        let last = -(this.tween.width + 640);
        if (this.tween.x <= last) {
            this._running = false;
            this.resetLocation();
            this.onPlayEnd();
        }
    }



    public Close() {
        this.node.removeFromParent();
    }

    private resetLocation() {
        this.tween.x = 640;
    }

    private onPlayEnd() {
        if (this.Action) {
            this.Action.RunArgs();
        }
    }

}