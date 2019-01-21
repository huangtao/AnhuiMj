import Global from "../../Global/Global";
import TaskInfo from "./TaskInfo";
import { ActionNet } from "../../CustomType/Action";
import { WebRequest } from "../../Net/Open8hb";
import { UIName } from "../../Global/UIName";
import { EventCode } from "../../Global/EventCode";
import { TaskForm } from "./TaskForm";
const { ccclass, property } = cc._decorator;

@ccclass
export default class TaskItem extends cc.Component {
    /**
     * 奖励Icon
     */
    @property(cc.Sprite)
    sp_icon: cc.Sprite = null;

    /**
     * 图片资源列表
     */
    @property([cc.SpriteFrame])
    public IconList: cc.SpriteFrame[] = [];

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
     * 跳转按钮
     */
    @property(cc.Button)
    btn_go_task: cc.Button = null;

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

    /**
     * 任务实体
     */
    private task: TaskInfo = null;

    /**
     * 列表实体
     */
    private taskForm : TaskForm = null;

    /**
     * 关于奖励弹出窗
     */
    public ProType: string = "";
    public ProNum: string = "";
    public ImgId: number = 0;

    public GameId = 0;
    public uiName = "";

    /**
     * 初始化数据
     * @param task 
     */
    InitData(taskInfo: TaskInfo, obj : TaskForm) {
        if (!taskInfo || !obj) {
            Global.Instance.UiManager.ShowTip("初始化失败");
            Global.Instance.UiManager.CloseLoading();
            cc.log("传值失败, 请检查传值代码");
            return;
        }

        this.taskForm = obj;
        this.task = taskInfo;

        this.lab_desc.string = this.task.taskName + "：" + this.task.taskremark; //任务名称

        let gift_type = "";

        let spriteFrame = null;

        switch (this.task.awardtype) {
            case "VQ":
                gift_type = "七豆";
                this.ProType = "七豆";
                this.ImgId = 6;
                spriteFrame = this.IconList[0];
                break;
            case "VD":
                gift_type = "钻石";
                this.ProType = "钻石";
                this.ImgId = 3;
                spriteFrame = this.IconList[1];
                break;
            default:
                cc.log("无法识别的奖励类型");
                break;
        }

        if (spriteFrame) {
            this.sp_icon.spriteFrame = spriteFrame;
        }

        this.lab_reward.string = "奖励：" + gift_type + "x " + this.task.taskaward;
        this.ProNum = this.task.taskaward + "";

        if(this.task.realnum > this.task.taskcond){
            this.task.realnum = this.task.taskcond;
        }

        this.lab_progress.string = this.task.realnum + "/" + this.task.taskcond;

        this.updateStatusShow(this.task.taskStatus, this.task.isget, this.task.target);
    }

    // 更新任务状态显示
    public updateStatusShow(task_status: number, gift_status: number, target: string) {
        if (null == task_status || gift_status == null) {
            return;
        }

        switch (task_status.toString()) {
            case "0":
                switch (target) {
                    case "charge":
                        this.ShowGoBtn();
                        this.uiName = UIName.Shop;
                        break;
                    case "share":
                        this.ShowGoBtn();
                        this.uiName = UIName.ShareGift;
                        break;
                    case "game":
                        this.ShowGoBtn();
                        this.uiName = UIName.SelectGame;
                        break;
                    case "HQ":
                        this.ShowGoBtn();
                        this.uiName = UIName.SelectRule;
                        this.GameId = 100;
                        break;
                    case "HZ":
                        this.ShowGoBtn();
                        this.uiName = UIName.SelectRule;
                        this.GameId = 101;
                        break;
                    case "MG":
                        this.ShowGoBtn();
                        this.uiName = UIName.SelectRule;
                        this.GameId = 102;
                        break;
                    case "JZ":
                        this.ShowGoBtn();
                        this.uiName = UIName.SelectRule;
                        this.GameId = 104;
                        break;
                    case "BJ":
                        this.ShowGoBtn();
                        this.uiName = UIName.SelectRule;
                        this.GameId = 51;
                        break;
                    case "NN":
                        this.ShowGoBtn();
                        this.uiName = UIName.SelectRule;
                        this.GameId = 76;
                        break;
                    default:
                        this.sp_noFinished.node.active = true;
                        this.btn_get.node.active = false;
                        this.sp_finished.node.active = false;
                        this.btn_go_task.node.active = false;
                        break;
                }
                break;
            case "1":
                if (gift_status.toString() == "0") { //任务奖励为未领取
                    this.btn_get.node.active = true;
                    this.sp_noFinished.node.active = false;
                    this.sp_finished.node.active = false;
                    this.btn_go_task.node.active = false;
                } else {
                    this.sp_finished.node.active = true;
                    this.btn_get.node.active = false;
                    this.sp_noFinished.node.active = false;
                    this.btn_go_task.node.active = false;
                }
                break;
            default:
                cc.info("--- error status ", status);
                break;
        }
    }
    
    ShowGoBtn(){
        this.btn_get.node.active = false;
        this.sp_noFinished.node.active = false;
        this.sp_finished.node.active = false;
        this.btn_go_task.node.active = true;
        this.uiName = UIName.SelectRule;
    }

    ClickGetGift() {
        const data = WebRequest.DefaultData();
        let action = new ActionNet(this, this.GetTaskGiftSuccess, this.GetTaskGiftError);
        data.Add("taskID", this.task.taskId);
        WebRequest.Task.getReward(action, data);
        Global.Instance.UiManager.ShowLoading("已成功发送兑换请求. 请稍等");
    }

    GetTaskGiftSuccess() {
        Global.Instance.UiManager.CloseLoading();
        Global.Instance.UiManager.ShowUi(UIName.ShopGiftPanel, this); //弹出奖励面板 
        Global.Instance.EventManager.PostMessage(EventCode.LatestBalance);

        this.taskForm.Group.removeAllChildren();
        
        let task_count = Global.Instance.DataCache.UserInfo.taskCount
        if(task_count != null && task_count > 0){
            Global.Instance.DataCache.UserInfo.taskCount = task_count - 1;
            Global.Instance.EventManager.PostMessage(EventCode.TaskNumPush);
        }
        this.taskForm.LoadTask();
        // this.task.taskStatus = 1;
        // this.task.isget = 1;
        // this.updateStatusShow(this.task.taskStatus, this.task.isget, "");
    }

    GetTaskGiftError() {
        Global.Instance.UiManager.CloseLoading();
        Global.Instance.UiManager.ShowTip("领取任务奖励失败");
        cc.log("任务奖励不能正常领取!");
    }

    ClickGoTask() {
        if(this.GameId == 0){
            Global.Instance.UiManager.ShowUi(this.uiName);
        }else{
            Global.Instance.UiManager.ShowUi(this.uiName, { gameInfo: Global.Instance.DataCache.GameList.GetGame(this.GameId), isFriendCircle: false });
        }
        this.taskForm.CloseClick();
    }
}
