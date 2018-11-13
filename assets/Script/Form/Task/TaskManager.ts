/**
 *  任务逻辑处理
 */
import { Action, ActionNet } from "../../CustomType/Action";
import { IDictionary } from "../../Interface/IDictionary";
import { WebRequest } from "../../Net/Open8hb";
import Dictionary from "../../CustomType/Dictionary";


export class TaskManager {
 	private static _instance: TaskManager = null;
    private _taskList: Dictionary<string,any>;

 	public static get Instance(): TaskManager{
		if (!TaskManager._instance) {
			TaskManager._instance = new TaskManager();
		}

		return TaskManager._instance;
	}

    public get TaskList(): Dictionary<string,any>{
        if (!this._taskList) {
            this._taskList = new Dictionary<string,any>;
        }

        return this._taskList;
    }

	/**
	 * 请求任务列表
	 */
	public getTaskList(act: Action,startId?: number, count?: number): void{

        let action_ = act;
        let getListCb = (args)=>{

            if (!args || !args.status) {
                return;
            }
            
            if ("success" != args.status) {
            	console.log("--- getTaskList fail!");
                return;
            }

            // 回调
            if (action_) {
                action_.Run([]);
            }

            console.log("--- success: getTaskList: ",args);
        }

        // 拉取亲友圈列表
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        const action: ActionNet = new ActionNet(this,getListCb,getListCb);
        WebRequest.Task.get_task_list(action,data);       
    }

    /**
     * 根据状态进行排序，默认领取状态的放在最前面
     */
    private orderTaskList() {
        if (0 == this.TaskList.Count) {
            return;
        }

        let dict = new Dictionary<string,any>();
        let keys = this.TaskList.Keys;
        for (let idx = 0; idx < this.TaskList.Count; ++idx) {
            if (0 == this.TaskList.GetValue[keys[idx]].status) {
                dict.AddOrUpdate(keys[idx],this.TaskList.GetValue(keys[idx]));
            }
        }

        // 从之前的数组中移除
        for (let idx = 0; idx < dict.Count; ++idx) {
            this.TaskList.Remove(dict.Keys[idx]);
        }

        return dict.Concat(this.TaskList);
    }
 }