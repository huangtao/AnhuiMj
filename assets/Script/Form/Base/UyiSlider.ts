 
const { ccclass, property } = cc._decorator;

@ccclass
export class UyiSlider extends cc.Slider {
    @property(cc.Sprite)
    progressImg: cc.Sprite=null;

    OnChange() {
        this.progressImg.node.width = this.node.width * this.progress;
    }

}