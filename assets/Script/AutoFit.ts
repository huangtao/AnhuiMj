// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class AutoFit extends cc.Component {


    @property([cc.Node])
    public content: cc.Node[] = [];
    @property(cc.Boolean)
    public onlyLessen: boolean = true;


    start() {
        this.OnFrameSizeChanged();
        
    }

    OnFrameSizeChanged() {

        /**
         * 屏幕的适配当参照实际宽高比与设计宽高比来动态的调整缩放
         * 
         * 
         */
        let frameSize = cc.view.getFrameSize();
        let cavasRatio = 1280 / 720;
        let frameRatio = frameSize.width / frameSize.height;

        let scale = 1;
        if (frameRatio > cavasRatio) {
            //scale = frameSize.height / (frameSize.width / 1280 * 720);
            scale = frameSize.width / (frameSize.height / 720 * 1280);

        }
        else {
             scale = frameSize.width / (frameSize.height / 720 * 1280);
            //scale = frameSize.height / (frameSize.width / 1280 * 720);
        }
        if (this.onlyLessen && scale > 1) {
            scale = 1;
        }

        cc.log(`已经启用屏幕组件的自动适配，当前缩放比：${scale}`);

        if (cc.isValid(this.content) && this.content.length > 0) {
            for (let i in this.content) {
                let obj = this.content[i];
                if (!cc.isValid(obj)) {
                    continue;
                }
                obj.scale = scale;
            }

        }
    }

}

