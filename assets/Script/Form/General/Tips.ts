
import Global from "../../Global/Global";

const { ccclass, property } = cc._decorator;

@ccclass
export class Tips extends cc.Component {
    private _isfree: boolean = true;
    private _tween: cc.ActionInterval;
    @property(cc.RichText)
    label: cc.RichText=null;

    @property(cc.Node)
    bg: cc.Node=null;
    public get IsFree() {
        return this._isfree;
    }
    onLoad() {
        //cc.game.addPersistRootNode(this.node);
        this.node.x = 640;// 1280/2
        this.node.y = 360;// 360+160

        //与旧版本兼容
        //当未手动绑定组件时候，搜索绑定
        if (!cc.isValid(this.bg)) {
            const spite = this.node.getComponentInChildren(cc.Sprite);
            if (!cc.isValid(spite)) {
                this.bg = spite.node;
            }
        }
    }
    update() {
        if (!cc.isValid(this.bg)) {
            return;
        }
        let h = this.label.node.height + 70;
        if (this.bg.height === h) {
            return;
        }
        this.bg.height = h;
    }


    public Go(text: string, time: number) {
        //this.enabled = true;
        this.label.string = text;

        // if (!this._tween) {
        //     this._tween = cc.moveTo(0.4, 0, 200);
        // }
        // this.node.runAction(this._tween);
        const scene = cc.director.getScene();;
        if (cc.isValid(scene)) {
            scene.addChild(this.node);
            if(!cc.game.isPersistRootNode(this.node)){
                cc.game.addPersistRootNode(this.node);
            }
           
        } else {
            return;
        }
        this.scheduleOnce(this.complete, time);
        this._isfree = false;
    }

    private complete() {
        this._isfree = true;
        //this.enabled = false;
        // this.node.y = 0;
        this.label.string = "";
        this.node.removeFromParent();
    }
}