import UIBase from "../Base/UIBase";
import { UIName } from "../../Global/UIName";
import { QL_Common } from "../../CommonSrc/QL_Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HornPanel extends UIBase<any> {
    public IsEventHandler: boolean;
    public IsKeyHandler: boolean;

    /**
     * 用于存放大厅跑马灯数据
     */
    public static HornHallList: Array<QL_Common.SystemHornEntity> = [];

    @property(cc.RichText)
    private horn_text: cc.RichText = null;

    private LoopCount = 0;

    public static HornHallIsPlay : boolean = false; //是否正在播放大厅跑马灯

    public init_location = -500;

    InitShow() {
        let LoopCount = this.ShowParam;
        if (LoopCount) {
            this.LoopCount = LoopCount;
            this.PlayHallHorn();
        }
    }

    PlayHallHorn() {
        var self = this;

        HornPanel.HornHallIsPlay == true; //开始播放

        let HornHallList = HornPanel.HornHallList;
        if (HornHallList.length > 0) {
            this.horn_text.string = HornHallList[HornHallList.length - 1].Context; //赋值最新跑马灯内容
 
            this.horn_text.node.position = cc.v2(this.init_location, 1); //初始化位置
            if (this.LoopCount >= 0) {
                HornPanel.HornHallList = [];
            }

            /**
             * 开始播放操作
             */
            this.horn_text.node.runAction(cc.sequence(
                cc.moveTo((this.node.width + this.horn_text.node.width) / 100,
                    cc.v2(this.init_location - (this.node.width + this.horn_text.node.width), 0)),
                cc.callFunc(function () { //说明移动完了
                    self.EndHorn(); //播放完执行函数
                })
            ));
        } else {
            HornPanel.HornHallIsPlay = false;
            cc.log("没有可播放的内容");
            return;
        }
    }

    EndHorn() {
        let HornHallList = HornPanel.HornHallList;
        if (HornHallList.length > 0) {
            this.PlayHallHorn();
            return;
        }

        this.UiManager.DestroyUi(UIName.HornPanel);
    }

    onDestroy(){
        HornPanel.HornHallIsPlay == false;
        cc.log("大厅跑马灯已销毁");
    }

    // update (dt) {}
}
