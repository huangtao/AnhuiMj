

import { DateTime } from "../Serializer/DateTime";
import { Action } from "../CustomType/Action";
import { IActionManager } from "../Interface/IActionManager";
import { UuidHelper } from "../Tools/UuidHelper";


class FunctionItem {
    public call: Action;
    public exprise: DateTime;
}

export class ActionManager implements IActionManager {

    private callbacklist: any = {};

    public AddKeyFunction(key: string, call: Action, tager?: any): boolean {

        var s = this.callbacklist[key];
        if (s) return false;
        let fitem: FunctionItem = <FunctionItem>s;

        cc.log("当前时间戳：" + DateTime.Now.TimeStamp);

        if (fitem && (fitem.exprise.TimeStamp + 1 * 60 * 60 * 1000) >= DateTime.Now.TimeStamp) return false;

        fitem = new FunctionItem();
        fitem.exprise = DateTime.Now;
        fitem.call = call;
        
        this.callbacklist[key] = fitem;

        return true;
        
    }
    public AddFunction(call: Action): string {
        while (true) {
            let uuid = UuidHelper.getShortUuid();
            if (this.AddKeyFunction(uuid, call)) {
                return uuid;
            }
            continue;
        }
    }
    public RunCallback(key: string, value: any) {
        var s = this.callbacklist[key];
        if (!s) {
            this.callbacklist[key] = undefined;
            return;
        }
        let fitem: FunctionItem = <FunctionItem>s;
        if (!fitem) {
            this.callbacklist[key] = undefined;
            return;
        }

        let action = fitem.call;
        if (!action) {
            this.callbacklist[key] = undefined;
            return;
        }
        action.Run([value]);
        this.callbacklist[key] = undefined;
        return;
    }

}