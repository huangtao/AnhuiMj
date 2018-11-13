import { UploadInfo } from "../CustomType/UploadInfo";
import { ActionNet, Action } from "../CustomType/Action";
import Global from "../Global/Global";
import { NativeCtrl } from "../Native/NativeCtrl";
import { TryJSONParse, deepCopy } from "../Tools/Function";



export class FileUploadTask {

    private _info: UploadInfo;
    private _action: ActionNet;
    public constructor(info: UploadInfo) {

        this._info = info;
    }


    public execute(action: ActionNet) {

        let a: Action = new Action(this, this.Callback);
        this._info.callBack = Global.Instance.ActionManager.AddFunction(a);
        this._action = action;

        cc.log('请求参数结果:' + JSON.stringify(this._info));

        NativeCtrl.PostUploadFile(this._info)


    }
    public Callback(value: string) {

        let result: any;

        if (value == "") {
            result = deepCopy(this._info.attachParam);
            result.status = "success";
            result.type = this._info.type;
            result.baseUrl = this._info.baseUrl;
        }
        else {
            result = TryJSONParse(value);
        }
        this._action.Run(result);
    }
}