import { GameCachePool } from "../../Global/GameCachePool";


const { ccclass, property } = cc._decorator;

@ccclass
export class Flower extends cc.Component{

    @property(cc.RigidBody)
    rigidBody: cc.RigidBody=null;

    @property(cc.Sprite)
    texture: cc.Sprite=null;

    @property([cc.SpriteFrame])
    res: cc.SpriteFrame[]=[];

    private timeout:number=-1;
    onLoad() {
        const idx = Math.floor(Math.random() * 8);
        this.texture.spriteFrame = this.res[idx];
        if (Math.random() > 0.5) {
            this.rigidBody.angularVelocity = Math.random() * 50;
        } else {
            this.rigidBody.angularVelocity = Math.random() * -50;
        }
        this.init();
    }

    onDestroy(): void {
        if (this.timeout != -1) {
            clearTimeout(this.timeout);
            this.timeout = -1;
        }
    }
    reuse() {
        this.init();
    }

    private init() {
        if (!cc.game.isPersistRootNode(this.node)) {
            cc.game.addPersistRootNode(this.node)
        }
        this.timeout = setTimeout(this.remove.bind(this), 10000);
    }

    unuse() {

    }

    private remove() {
        if (this.isValid) {
            GameCachePool.FlowerPool.put(this.node);
        }
    }


}