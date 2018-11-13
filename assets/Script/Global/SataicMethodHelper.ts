import { Action, ActionNet } from "../CustomType/Action";
import { Open8hb } from "../Net/Open8hb";
import { DateTime } from "../Serializer/DateTime";
import { IEventHandler } from "../Interface/IEventHandler";
import { failLevel } from "../CustomType/CallUMengParam";
import Global from "./Global";
import { EventCode } from "./EventCode";
import { SystmPushMessage } from "../CustomType/SystmPushMsg";


export class StataicMethodHelper implements IEventHandler {


    OnEventComeIn(eventCode: number, value: any): boolean {
        switch (eventCode) {
            case EventCode.SystmPushMsg: {
                let m = value as SystmPushMessage;
                if (!m) return false;
                switch (m.EventCode) {
                    case "usergroup.exitgroup": {
                        let g = parseInt(m.EventData.groupId);
                        if (g) {
                            cc.log(`你已经被群主请出群（ID:${g}）`);
                            Global.Instance.UiManager.ShowTip(`你已经被群主请出群（ID:${g}）`);
                            this.ChangeUserGroupData(g, 1);
                        }

                    }
                }

            }
        }
        return false;
    }

    private constructor() {
        Global.Instance.EventManager.RegisterEventHadnle(this);
    }

    private static _instance: StataicMethodHelper;

    static get Instance(): StataicMethodHelper {
        if (StataicMethodHelper._instance) {
            return StataicMethodHelper._instance;
        }
        StataicMethodHelper._instance = new StataicMethodHelper();
        return StataicMethodHelper._instance;
    }
    private user_GroupData: any = {};
    CheckUserGroup(groupId: number, callBack: Action) {
        if (!callBack) return;
        let access: GroupAccessData = this.user_GroupData[groupId];
        if (access && access.access) {
            let cktime = access.cktime;
            if (cktime) {
                let hk = DateTime.Now.TimeStamp - cktime.TimeStamp;
                if ((hk) <= (30 * 60 * 1000)) { //数据缓存有效期 30分钟
                    callBack.Run([access.access == 2]);
                    return;
                }
                else {
                    //缓存的数据已过期！
                    cc.log(`缓存的数据已过期！`);
                }
            }
        }
        //从网站接口获取操作权限的检查结果 
        let data = Open8hb.DefaultData();
        data.Add("group_id", groupId);

        Open8hb.group.check_user(new ActionNet(this, o => {
            this.ChangeUserGroupData(groupId, o.access);
            callBack.Run([o.access == 2]);
            return;
        }, (e) => {
            callBack.Run([false]);
            return;
        }), data);
    }
    /**
     * 
     * @param groupId 修改玩家在指定群组的权限
     * @param access 操作权限状态：1：未加入，2：已加入
     */
    ChangeUserGroupData(groupId: number, access: number) {
        let a = new GroupAccessData();
        a.access = access;
        a.cktime = DateTime.Now;
        this.user_GroupData[groupId] = a;
    }
    ClearCache() {
        this.user_GroupData = {}
    }
}

class GroupAccessData {
    access: number;
    cktime: DateTime
}