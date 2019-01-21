import UIBase from "../Base/UIBase";
import { ActionNet } from "../../CustomType/Action";
import { WebRequest } from "../../Net/Open8hb";
import TaskItem from "./TaskItem";
import TaskInfo from "./TaskInfo";
import { UIName } from "../../Global/UIName";

const { ccclass, property } = cc._decorator;

@ccclass
export class TaskForm extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.Node)
    Group: cc.Node = null;

    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    @property(cc.ScrollView)
    ScrollView : cc.ScrollView = null;

    private isActivity = false;

    /**
     * 记录本地缓存表
     */
    private dataList = null;

    LoadDataNum = 20;

    InitShow() {
        let obj = this.ShowParam;
        if (obj) {
            this.isActivity = true;
        }

        this.UiManager.ShowLoading("正在刷新任务数据");
    }

    OnShow(){
        super.OnShow();
        
        this.LoadTask();
    }

    /**
     * 发送请求
     */
    LoadTask() {
        const data = WebRequest.DefaultData();
        const action = new ActionNet(this, this.TaskSuccess, this.TaskError);
        data.Add("count", this.LoadDataNum);
        WebRequest.Task.get_task_list(action, data);
    }

    /**
     * 请求数据成功
     * @param obj 
     */
    TaskSuccess(obj) {
        this.UiManager.CloseLoading();
        this.UiManager.ShowLoading("正在加载任务数据");

        if (!obj) {
            this.UiManager.CloseLoading();
            cc.log("对象不存在");
            return;
        }

        this.dataList = obj.data;

        let task: TaskInfo = null;
        let data = null;

        let TaskInfoArray = new Array<TaskInfo>();

        for (var i = 0; i < this.dataList.length; i++) {
            task = new TaskInfo;
            data = this.dataList[i];

            if (task && data) {
                task.taskId = data[0];
                task.taskName = data[1];
                task.taskaward = data[2];
                task.awardtype = data[3];
                task.tasktype = data[4];
                task.addtime = data[5];
                task.taskremark = data[6];
                task.status = data[7];
                task.taskcond = data[8];
                task.getlimit = data[9];
                task.isget = data[10];
                task.realnum = data[11];
                task.taskStatus = data[12];
                task.target = data[13];
                TaskInfoArray.push(task);
            } else {
                this.UiManager.CloseLoading();
                this.UiManager.ShowTip("初始化任务异常");
                cc.log("任务赋值出现异常");
                return;
            }
        }

        if (TaskInfoArray != null && TaskInfoArray.length > 0) {
            this.InitTaskItem(TaskInfoArray);
        } else {
            this.UiManager.CloseLoading();
            cc.log("获取到的数据为空");
        }
    }

    TaskError() {
        this.UiManager.CloseLoading();
        this.UiManager.ShowTip("获取任务列表失败");
        cc.log("获取任务列表失败, 请检查接口或成功操作");
    }

    /**
     * 实例化每一个任务项
     * @param TaskList 
     */
    InitTaskItem(TaskList) {
        this.Group.removeAllChildren();

        let task : TaskInfo = null;
        for (let index = 0; index < TaskList.length; index++) {
            let task_item = cc.instantiate(this.itemPrefab);
            if (cc.isValid(task_item)) {
                let taskitem: TaskItem = task_item.getComponent("TaskItem");
                if (taskitem && TaskList[index]) {
                    task = TaskList[index];
                    taskitem.InitData(task, this);
                    this.Group.addChild(task_item);
                }
            }
        }

        this.UiManager.CloseLoading();
    }

    /**
     * 是否在关闭时显示活动面板
     */
    IsShowActivity() {
        if (this.isActivity) {
            this.isActivity = false;
            this.UiManager.ShowUi(UIName.Activity);
        }

    }

    CloseClick() {
        super.CloseClick();

        this.ScrollView.scrollToTop(0.1);

        this.IsShowActivity(); 
    }
}