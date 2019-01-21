import UIBase from "../Base/UIBase";
import { UIName } from "../../Global/UIName";
import { PlayEffect, LoadHeader } from "../../Tools/Function";
import { WebRequest } from "../../Net/Open8hb";
import { ActionNet } from "../../CustomType/Action";
import TurntableGiftEntity from "./TurntableGiftEntity";
import { EventCode } from "../../Global/EventCode";

const { ccclass, property } = cc._decorator;

/**
 * 转盘主面板
 * Author:Cyq
 * Date:2018/12/18
 */
@ccclass
export default class TurntablePanel extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    /**
     * 奖励参数
     */
    private ProType = ""; //奖励类型

    private ProNum = "" //奖励数量;

    private ImgId = 0; //奖励图片

    /**
     * 旋转角度
     */
    private RotationAngle = 30;

    /**
     * 旋转总圈数
     */
    private RotationSumNum = 3;

    /**
     * 回调次数
     */
    private callCount = 0;

    /**
     * 移动次数
     */
    private moveCount = 0;

    /**
     * 起步旋转动画
     */
    private StartSpeed = null;

    /**
     * 匀速动画
     */
    private ConstantSpeed = null;

    /**
     * 索引
     */
    public index = 0;

    /**
     * 奖品项
     */
    @property([cc.Node])
    TurntableGiftList: cc.Node[] = [];

    /**
     * 玩家完成游戏局数
     */
    @property(cc.Label)
    LabGameCount: cc.Label = null;

    /**
     * 玩家可用抽奖次数
     */
    @property(cc.Label)
    LabUseCount: cc.Label = null;

    /**
     * 转盘开始按钮
     */
    @property(cc.Button)
    BtnStart: cc.Button = null;

    /**
     * 旋转节点
     */
    @property(cc.Node)
    RotationNode: cc.Node = null;

    onLoad() {
        super.onLoad();

        this.UiManager.ShowLoading("正在获取抽奖奖励列表");
        const data = WebRequest.DefaultData();
        const action = new ActionNet(this, this.getGiftSuccess, this.getGiftErr);
        WebRequest.Turntable.GetTurntableGiftList(action, data);
    }

    /**
     * 初始化参数
     */
    InitParam() {
        this.RotationAngle = 30;
        this.moveCount = 0;
        this.callCount = 0;
        this.BtnStart.enabled = true;
    }

    /**
     * 获取奖品成功后
     * @param obj 
     */
    getGiftSuccess(obj) {
        this.UiManager.CloseLoading();
        if (obj == null) {
            return;
        }

        /**
         * 赋值
         */
        let turntableGiftArray = new Array<TurntableGiftEntity>();

        let turntableGiftEntity: TurntableGiftEntity = null;
        let data = obj.data;

        for (let index = 0; index < data.length; index++) {
            turntableGiftEntity = new TurntableGiftEntity;
            turntableGiftEntity.id = data[index][0];
            turntableGiftEntity.PrizeName = data[index][1];
            turntableGiftEntity.PrizeNum = data[index][2];
            turntableGiftEntity.ImgPath = data[index][3];
            turntableGiftEntity.Percent = data[index][4];
            turntableGiftEntity.PrizeType = data[index][5];

            turntableGiftArray.push(turntableGiftEntity);
        }

        /**
         * 显示获得的值
         */
        for (let i = 0; i < this.TurntableGiftList.length; i++) {
            let bg_node: cc.Node = this.TurntableGiftList[i].getChildByName("bg");
            if (bg_node == null) {
                return;
            }

            let icon: cc.Sprite = bg_node.getChildByName("product_icon").getComponent("cc.Sprite");
            if (icon != null) {
                LoadHeader(turntableGiftArray[i].ImgPath, icon);
            }

            let name: cc.Label = bg_node.getChildByName("product_name").getComponent("cc.Label");
            if (name != null) {
                name.string = turntableGiftArray[i].PrizeName + "x" + turntableGiftArray[i].PrizeNum;
            }
        }

    }

    getGiftErr() {
        this.UiManager.CloseLoading();
        this.UiManager.ShowTip("获取奖品列表失败!");
    }

    /**
     * 当玩家点击开始转盘时进入
     */
    StartTurntable() {
        this.BtnStart.enabled = false;
        this.UiManager.ShowLoading("转盘正在启动");
        const data = WebRequest.DefaultData();
        const action = new ActionNet(this, this.StartSuccess, this.StartErr);
        WebRequest.Turntable.LuckDrawRequest(action, data);
    }

    StartSuccess(obj) {
        this.UiManager.CloseLoading();
        let giftId = obj.order_by - 1; //获得对应客户端的奖品项ID
        cc.log("对应的奖品ID为：" + giftId);
        this.RotateTurntable(giftId);

        switch (obj.prize_type) {
            case "VQ":
                this.ProType = "七豆";
                this.ImgId = 6;
                break;
            case "VD":
                this.ProType = "钻石"
                this.ImgId = 1;
                break;
            case "VR":
                this.ProType = "实物";
                break;
        }

        this.ProNum = obj.prize_num;
    }

    StartErr() {
        this.UiManager.CloseLoading();
        this.BtnStart.enabled = true;
        this.UiManager.ShowTip("请检查您的抽奖次数!");
    }

    /**
     * 计算索引
     */
    calculateIndex() {
        this.callCount++;

        this.index = this.index + 1;

        if (this.index > 11) {
            this.index = 0;
        }

        this.HeightNight(this.index);
        PlayEffect(cc.url.raw("resources/Sound/Turntable/zhuan.mp3"));
    }

    /**
     * 转盘旋转
     */
    RotateTurntable(giftId) {
        let self = this;

        let move_num = 0;

        /**
         * 计算移动个数
         * 减去加速过程的移动 并 减去减速过程的移动
         */
        if (giftId <= 0) {
            move_num = this.TurntableGiftList.length * this.RotationSumNum - 3 - 3;
        } else {
            cc.log(this.index);
            move_num = (this.TurntableGiftList.length - this.index) + (this.TurntableGiftList.length * this.RotationSumNum) + giftId - 3 - 3;
        }

        this.moveCount = move_num + 6; //应该进回调的总次数

        /**
         * 加速动画(反向也就是减速动画)
         */
        this.StartSpeed = cc.sequence(
            cc.rotateBy(0.5, self.RotationAngle),
            cc.callFunc(() => {
                self.calculateIndex();
            }),

            cc.rotateBy(0.4, self.RotationAngle),
            cc.callFunc(() => {
                self.calculateIndex();
            }),

            cc.rotateBy(0.3, self.RotationAngle),
            cc.callFunc(() => {
                self.calculateIndex();
            })
        )

        /**
        * 匀速动画
        */
        if (this.ConstantSpeed == null) {
            this.ConstantSpeed = cc.sequence(
                cc.rotateBy(0.05, this.RotationAngle),
                cc.callFunc(() => {
                    self.calculateIndex();
                }),
            )
        }

        this.RotationNode.runAction(
            cc.sequence(
                this.StartSpeed,
                cc.repeat(this.ConstantSpeed, move_num), this.StartSpeed.reverse(),
                cc.callFunc(() => {//转盘结束后回调
                    if(!cc.isValid(this)){
                        this.InitParam();
                        return;
                    }

                    cc.log("callCount = " + this.callCount);
                    cc.log("moveCount = " + this.moveCount);

                    if (this.callCount < this.moveCount) {
                        this.HeightNight(this.index + 1);
                    } 

                    this.InitParam();
                    this.EventManager.PostMessage(EventCode.LatestBalance);
                    this.UiManager.ShowUi(UIName.Congratulation, this); //打开奖励面板
                })
            )
        );
    }

    /**
     * 获得隐藏显示节点
     * @param index 
     * @param beforeIndex 
     */
    GetHeightNode(index, beforeIndex) {
        if (beforeIndex == null) {
            return;
        }

        let heightNightNode: cc.Node = this.TurntableGiftList[index].getChildByName("bg").getChildByName("height_night");

        if (beforeIndex == -1) {
            if (heightNightNode == null) {
                return;
            }

            heightNightNode.active = true;
        } else {
            let beforeHeightNightNode: cc.Node = this.TurntableGiftList[beforeIndex].getChildByName("bg").getChildByName("height_night");
            if (heightNightNode == null || beforeHeightNightNode == null) {
                return;
            }

            heightNightNode.active = true;
            beforeHeightNightNode.active = false;
        }
    }

    /**
     * 根据index去获得前一个节点
     * @param index 
     */
    HeightNight(index) {
        // cc.log("--- index: ", index);

        if (index == null || index > this.TurntableGiftList.length) {
            return;
        }

        let hide_index = -1;

        if (index == 0) {
            hide_index = this.TurntableGiftList.length - 1;
        } else {
            hide_index = index - 1;
        }

        this.GetHeightNode(index, hide_index);
    }

    /**
     * 显示转盘活动介绍 
     */
    ShowActivityDesc() {
        cc.log("打开抽奖详情界面");
        this.UiManager.ShowUi(UIName.TurntableDesc);
    }

    /**
     * 显示中奖记录
     */
    ShowGiftRecord() {
        cc.log("打开抽奖记录界面");
        this.UiManager.ShowUi(UIName.TurntableRecordPanel);
    }

    
}
