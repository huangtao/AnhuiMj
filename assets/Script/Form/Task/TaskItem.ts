import ScrollHelperItem from "../../utils/ScrollHelperItem";
import { TaskRewardType } from "./TaskEnum";
const {ccclass, property} = cc._decorator;

@ccclass
export default class TaskItem extends ScrollHelperItem {
    /**
     * 奖励Icon
     */
    @property(cc.Sprite)
    sp_icon: cc.Sprite = null;

    /**
     * 任务描述
     */
    @property(cc.Label)
    lab_desc: cc.Label = null;

    /**
     * 奖励内容
     */
    @property(cc.Label)
    lab_reward: cc.Label = null;

    /**
     * 任务进度
     */
    @property(cc.Label)
    lab_progress: cc.Label = null;

    /**
     * 领取按钮
     */
    @property(cc.Button)
    btn_get: cc.Button = null;

    /**
     * 已完成
     */
    @property(cc.Sprite)
    sp_finished: cc.Sprite = null;

    /**
     * 未完成
     */
    @property(cc.Sprite)
    sp_noFinished: cc.Sprite = null;

    public initShow(){
        if (!this.showData) {
            return;
        }

        let data = this.showData;
        
        // 图标
        if (this.sp_icon) {
            cc.loader.loadRes("/prop/" + data.icon,(err,texture)=>{
                if (err) {
                    cc.info("--- error: load img fail ","/prop/" + data.icon);
                    return;
                }

                if (texture) {
                    this.sp_icon.spriteFrame = new cc.SpriteFrame(texture);
                }
            });
        }

        // 任务内容
        if (this.lab_desc) {
            this.lab_desc.string = data.desc;
        }

        // 奖励内容
        let nameList = [
            "七豆",
            "金币",
            "钻石",
            "道具"
        ];

        if (this.lab_reward) {
            this.lab_reward.string = "奖励： " + nameList[data.rewardType] + 'x' + data.rewardNum;
        }

        // 任务进度
        if (this.lab_progress) {
            this.lab_progress.string = data.progress + '/' + data.allNum; 
        }

        if (this.btn_get && this.sp_noFinished && this.sp_finished) {
            this.btn_get.node.active = false;
            this.sp_noFinished.node.active = false;
            this.sp_finished.node.active = false;
        }

        // 任务状态
        this.updateStatusShow(data.status);
    }

    // 更新任务状态显示
    public updateStatusShow(status: number){
        if (null == status) {
            return;
        }

        switch (status) {
            case 0:
                // 领取
                if (this.btn_get) {
                    this.btn_get.node.active = true;
                }
                break;
            case 1:
                // 未完成
                if (this.sp_noFinished) {
                    this.sp_noFinished.node.active = true;
                }
                break;
            case 1:
                // 已完成
                if (this.sp_finished) {
                    this.sp_finished.node.active = true;
                }
                break;
            default:
                cc.info("--- error status ",status);
                break;
        }
    }
}
