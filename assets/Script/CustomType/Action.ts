


import Global from "../Global/Global";

function Filter(obj) {
    if (obj.status === "success") {
        return true;
    }
    if (obj.status === "showtip") {
        Global.Instance.UiManager.ShowTip(obj.msg);
        return false;
    }
    if (obj.status === "showbox") {
        Global.Instance.UiManager.ShowMsgBox(obj.msg);
        return false;
    }
    if (obj.status === "restart") {
        Global.Instance.UiManager.ShowMsgBox(obj.msg, this, () => {
            cc.game.restart();
        });
        return false;
    }
    if (obj.status === "fail") {
        Global.Instance.UiManager.ShowTip(obj.msg);
        return false;
    }
    return false;

}

export class Action {
    public static ResultFilter(obj:any,): boolean {
        if (!cc.isValid(obj)) {
            return false;
        }
        if (obj.status === "success") {
            return true;
        }
        // if (obj.status === "showtip") {
        //     //Global.Instance.UiManager.ShowTip(obj.msg);
        //     return false;
        // }
        // if (obj.status === "showbox") {
        //     //Global.Instance.UiManager.ShowMsgBox(obj.msg);
        //     return false;
        // }
        // if (obj.status === "restart") {
        //     // Global.Instance.UiManager.ShowMsgBox(obj.msg, this, () => {
        //     //     cc.game.restart();
        //     // });
        //     return false;
        // }
        // if (obj.status === "fail") {
        //     Global.Instance.UiManager.ShowTip(obj.msg);
        //     return false;
        // }
        return false;

    }

    public Fun: Function;
    public Obj: any;
    public Args: any[];
    public constructor(obj?: any, fun?: Function, args?: any[]) {
        this.Obj = obj;
        this.Args = args;
        this.Fun = fun;
    }
    public Run(args: any[]): any {
        if (!this.Fun) return;
        if (typeof this.Fun !== "function") return;
        if (this.Obj) {
            return this.Fun.apply(this.Obj, args);
        } else {
            return this.Fun(args);
        }
    }
    public RunArgs(): any {
        if (!this.Fun) return;
        if (typeof this.Fun !== "function") return;
        if (this.Obj) {
            return this.Fun.apply(this.Obj, this.Args);
        } else {
            return this.Fun(this.Args);
        }
    }
}


export class ActionNet {
    public constructor(thisObject: any, okAction: Function, errorAction: Function = null) {
        this.thisObject = thisObject;
        this.okAction = okAction;
        this.errorAction = errorAction;

    }
    /**
     * 方法
     */
    public okAction: Function;

    public errorAction: Function;

    public progressAction: Function;
    /**
     * 作用域
     */
    public thisObject: any;
    /**
     * 参数 数组格式
     * 例如方法是function(a:number,b:string)   则argArray格式为[1,"string"];
     */
    public argArray: any;

    public Run(argArray: any = null): boolean {

        if (Filter(argArray)) {
            this.RunOK([argArray]);
            return true;
        } else {
            this.RunError([new Error(argArray.msg)]);
            return false;
        }
    }



    /**
     * 传入参数的委托
     * @param argArray
     * @returns {}
     */
    public RunOK(argArray: any = null) {
        if (this.okAction) {
            this.okAction.apply(this.thisObject, argArray);
        }
    }

    public RunError(argArray: any = null) {
        if (this.errorAction) {
            this.errorAction.apply(this.thisObject, argArray);
        }
    }

    public RunProgress(argArray: any = null) {
        if (this.thisObject && this.progressAction) {
            this.progressAction.apply(this.thisObject, argArray);
        }
    }
}

