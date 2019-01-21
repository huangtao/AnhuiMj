/*
 * @Author: 刘思宇 
 * @Date: 2017-12-01 14:59:13 
 * @Last Modified by: 刘思宇
 * @Last Modified time: 2018-01-24 15:12:50
 */
import { SystmPushMessage } from '../CustomType/SystmPushMsg';
import { ConstValues } from '../Global/ConstValues';
import Global from '../Global/Global';
import { EventCode } from '../Global/EventCode';
import { QL_Common } from '../CommonSrc/QL_Common';
import { Tools } from '../Tools/SystemConfigReader';



export class SystmPushMsgHandler {

    private get DataCache() {
        return Global.Instance.DataCache;
    }
    private get UserInfo() {
        return this.DataCache.UserInfo;
    }

    private get EventManager() {
        return Global.Instance.EventManager;
    }
    public OnSystmPushMsg(e: SystmPushMessage): boolean {
        if (!e) return;
        switch (e.EventCode) {
            case "email.new": {
                this.emailnew();
                return;
            }
            case "Group.UserExit":
            case "Group.GameStatusChange":
            case "Group.UserReqJoin":
            case "Group.UserAccessJoin": {
                this.groupMessage(e);
                return;
            }
            case "hall.paysuccess": {
                this.paysuccess(e);
                return
            }
            case "task.tasksuccess": {
                this.tasksuccess(e);
                return;
            }
        }
        return false;
    } 
    paysuccess(e: SystmPushMessage): any {
        this.EventManager.PostMessage(EventCode.SystmPushMsg, e)
    }

    tasksuccess(e: SystmPushMessage): any {
        let point = e.EventData.point;
        if(point){
            this.DataCache.UserInfo.taskCount = e.EventData.point;
        }

        this.EventManager.PostMessage(EventCode.TaskNumPush);
    }

    private emailnew() {
        const now = this.DataCache.UserInfo.MessageNum;
        this.DataCache.UserInfo.MessageNum = now + 1;
        this.EventManager.PostMessage(EventCode.NewEmailInfo);
    }
    private groupMessage(e: SystmPushMessage) {
        this.EventManager.PostMessage(EventCode.GroupSystemPush, e)
    }

} 