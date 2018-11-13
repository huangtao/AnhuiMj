import UIBase from "../Base/UIBase";
import { UIName } from "../../Global/UIName";
import { QL_Common } from "../../CommonSrc/QL_Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HornGamePanel extends UIBase<any> {
    public IsEventHandler: boolean;
    public IsKeyHandler: boolean;

    /**
     * 用于存放游戏跑马灯数据
     */
    public static HornGameList: Array<QL_Common.SystemHornEntity> = [];

    /**
     * 跑马灯是否正在播放
     */
    public static HornGameIsPlay: boolean = false;

    /**
     * 跑马灯内容
     */
    @property(cc.RichText)
    private horn_text: cc.RichText = null;

    private LoopCount = 0;//循环次数字段

    private initial_position = -500; //初始化位置

    onLoad () {
        cc.game.addPersistRootNode(this.node); //设置常驻节点
    }

    /**
     * 接收参数
     */
    InitShow() {
        let obj = this.ShowParam;
        if (obj) {
            this.init(obj[0], obj[1], obj[2]);
        }
    }

    init(LoopCount: number, pos_x: number, pos_y: number) {
        this.PlayGameHorn();

        this.node.x = pos_x;
        this.node.y = pos_y;

        this.LoopCount = LoopCount;
    }

    /**
     * 播放游戏跑马灯
     */
    PlayGameHorn() {
        var self = this;
        HornGamePanel.HornGameIsPlay = true;

        let HornGameList = HornGamePanel.HornGameList
        if (HornGameList.length > 0) {
            let index = HornGameList.length - 1;
            let HornEntity = HornGameList[index]
            if (HornEntity) {
                HornGameList.splice(index, 1);
                this.horn_text.string = HornEntity.Context;
                this.horn_text.node.position = cc.v2(this.initial_position, 0); //初始化位置

                /**
                 * 开始播放操作
                 */
                this.horn_text.node.runAction(cc.sequence(
                    cc.moveTo((this.node.width + this.horn_text.node.width) / 100,
                        cc.v2(this.initial_position - (this.node.width + this.horn_text.node.width), 0)),
                    cc.callFunc(function () { //说明移动完了
                        self.EndHorn(HornGameList); //播放完执行函数
                    })
                ));
            }
            
        }
    }

    /**
     * 每条跑马灯播放结束
     * @param HornGameList 游戏跑马灯实体
     */
    EndHorn(HornGameList : Array<QL_Common.SystemHornEntity>){
        if(this.LoopCount >= 0){
            if(HornGameList.length > 0){
                this.PlayGameHorn();
            }else{
                this.UiManager.DestroyUi(UIName.HornGamePanel);
            }
        }else{
            this.PlayGameHorn(); //一直循环播放
        }
    }

    onDestroy(){
        HornGamePanel.HornGameIsPlay = false;
        cc.log("游戏跑马灯销毁");
    }
}