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
            case "usergroup.exitgroup": {
                this.exitgroup(e);
                return;
            }
            case "hall.paysuccess" :{
                this.paysuccess(e);
                return
            }

        }
        return false;
    }
    paysuccess(e: SystmPushMessage): any {
        this.EventManager.PostMessage(EventCode.SystmPushMsg, e)
    }


    private emailnew() {
        const now = this.DataCache.UserInfo.MessageNum;
        this.DataCache.UserInfo.MessageNum = now + 1;
        this.EventManager.PostMessage(EventCode.NewEmailInfo);
    }
    private exitgroup(e: SystmPushMessage) {
        this.EventManager.PostMessage(EventCode.SystmPushMsg, e)
    }

} 