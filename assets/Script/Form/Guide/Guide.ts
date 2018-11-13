import UIBase from "../Base/UIBase";
import Global from "../../Global/Global";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends UIBase<any> {
  public IsEventHandler: boolean = true;
  public IsKeyHandler: boolean = true;

  @property(cc.PageView)
  view: cc.PageView = null;
  // LIFE-CYCLE CALLBACKS:

  @property(cc.Node)
  first: cc.Node = null;
  @property(cc.Node)
  second: cc.Node = null;
  @property(cc.Node)
  third: cc.Node = null;


  InitShow() {
    this.second.active = false;
    this.third.active = false;
    this.first.active = true;
    this.loadResource("first");
  }

  start() {

  }

  private loadResource(type: string) {
    var that = this;
    that.view.removeAllPages();

    cc.loader.loadResDir("guide/" + type, cc.SpriteFrame, function (err, spriteFrames) {
      for (var i = spriteFrames.length - 1; i >= 0; i--) {
        var node = new cc.Node();
        that.view.addPage(node);
        node.addComponent(cc.Sprite).spriteFrame = spriteFrames[i]
      }
    });
  }

  private chooseClick(e, type: string) {
    this.first.active = false;
    this.second.active = false;
    this.third.active = false;

    if (type === "first") {
      this.first.active = true
    } else if (type === "second") {
      this.second.active = true;
    } else {
      this.third.active = true;
    };
    this.loadResource(type);

  }
  // update (dt) {}
}
