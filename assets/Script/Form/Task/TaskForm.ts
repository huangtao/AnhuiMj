import UIBase from "../Base/UIBase";
import { ActionNet } from "../../CustomType/Action";
import { WebRequest } from "../../Net/Open8hb";
import TaskItem from "./TaskItem";

const { ccclass, property } = cc._decorator;

@ccclass
export class TaskForm extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.Node)
    Group: cc.Node=null;

    @property(cc.Prefab)
    itemPrefab: cc.Prefab=null;

    private _isFree = true;

    //private taskdata: Array<Array<any>>;

    private static taskPool = new cc.NodePool("TaskItem");

    onLoad(){
        super.onLoad();
        //this.taskdata = new Array();
    }

    InitShow() {        
        this.LoadTask();
    }
    OnClose(){
        this.ClearAll();
    }

    ClearAll(){
        this.clearNode();
        this.clearData();
    }

    clearNode() {
        while(this.Group.children.length>0){
            TaskForm.taskPool.put(this.Group.children[0]);
        }
        
        // for (let i = 0; i < this.Group.children.length; i++) {
        //     cc.log(this.Group.children.length);
        //     TaskForm.taskPool.put(this.Group.children[i]);
        // }
    }

    clearData() {
        //this.taskdata = new Array();
    }

    LoadTask(count = 20, startid = 0) {
        if (!this._isFree) {
            cc.log("已经开始加载，请等待结果返回");
            return;
        }
        const action = new ActionNet(this, this.onsuccess, this.onerror);
        const data = WebRequest.DefaultData();
        data.Add("count", count);
        data.Add("startid", startid);
        WebRequest.userinfo.gettasklist(action, data);
        this._isFree = false;
    }

    onsuccess(msg: TaskMessage) {
        //this.taskdata = this.taskdata.concat(msg.data);

        for (let i = 0; i < msg.data.length; i++) {
            let node = TaskForm.taskPool.get();
            if (!cc.isValid(node)) {
                node = cc.instantiate(this.itemPrefab);
            }
            const item = node.getComponent<TaskItem>(TaskItem);
            if (cc.isValid(item)) {
                item.showData = msg.data[i];
                item.initShow();
                node.parent = this.Group;
            }
        }
        this._isFree = true;
    }
    onerror() {
        this._isFree = true;
    }




}

class TaskMessage {
    status: string;
    msg: string;
    data: Array<Array<any>>;
}