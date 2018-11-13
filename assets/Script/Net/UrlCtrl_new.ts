import { ActionNet, Action } from "../CustomType/Action";
import { IDictionary } from "../Interface/IDictionary";
import { DESEncryptHelper } from "../Tools/DESEncryptHelper";
import { ConstValues } from "../Global/ConstValues";
import { WebRequest } from "./Open8hb";
import { Debug } from "../Tools/Function";



export class UrlCtrl_new {

    public static LoadText(url: string, action: ActionNet, data?: IDictionary<string, any>, method: string = "GET"): void {
        let isreturn = false;
        setTimeout(() => {
            if (!isreturn) {
                //reject(new Error("网络连接已超时"));
                action.RunError([new Error("网络连接已超时")]);
                isreturn = true;
            }
        }, 5000);
        let datastr = null;
        if (data) {
            datastr = data.ToUrl();
        }
        var client = cc.loader.getXMLHttpRequest();//new XMLHttpRequest();
        if (method === "GET") {
            if (datastr) {
                client.open(method, url + "?" + datastr, true);
            } else {
                client.open(method, url, true);
            }

        } else if (method === "POST") {
            client.open(method, url, true);
            client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
        //client.timeout = 5000;       //5秒后超时
        client.responseType = "text";

        client.onreadystatechange = (ev: Event) => {
            if (client.readyState < 4) return;
            if (isreturn) {
                return;
            }
            if (client.status === 200) {
                isreturn = true;
                action.RunOK([client.response]);
            } else {
                isreturn = true;
                action.RunError([new Error(client.statusText)]);
            }
        };

        client.onerror = (ev: Event) => {
            if (isreturn) {
                return;
            }
            isreturn = true;
            action.RunError([new Error("网络请求出错")]);
        }

        let log = `发送http请求 请求方式:${method} 请求地址:${url}`;
        if (datastr) {
            client.send(datastr);
            log += `?${datastr}`
        } else {
            client.send();
        }
        cc.log(log);
    }

    public static LoadJson(url: string, action: ActionNet, data?: IDictionary<string, any>, method: string = "GET"): void {
        const a = new ActionNet(this, (str) => {
            if (!action) return;
            try {
                const json = JSON.parse(str);
                action.Run(json);
            } catch (e) {
                action.RunError([e]);
                return;
            }
        }, (error) => {
            if (action)
                action.RunError([error]);
        });

        UrlCtrl_new.LoadText(url, a, data, method);

    }

    // public static LoadSafeJson(url: string, action: ActionNet, desKey?: string, data?: IDictionary<string, any>, method: string = "GET") {
    //     const a = new ActionNet(this, (res) => {

    //         try {
    //             let result: string = res;
    //             //操作成功
    //             if (desKey) {
    //                 var desEncrypt = new DESEncryptHelper();
    //                 result = desEncrypt.uncMe(res, desKey);
    //                 let last_pos = 0;
    //                 let start_pos = 0;

    //                 let t = result.lastIndexOf('}');
    //                 if (t > last_pos) last_pos = t;
    //                 t = result.lastIndexOf(']');
    //                 if (t > last_pos) last_pos = t;


    //                 t = result.indexOf('{');
    //                 if (t < start_pos) start_pos = t;
    //                 t = result.indexOf('[');
    //                 if (t < start_pos) start_pos = t;
    //                 if (start_pos < 0) start_pos = 0;

    //                 if (last_pos + 1 != result.length) {
    //                     cc.log(result);
    //                 }
    //                 result = result.substr(0, last_pos + 1);
    //             }
    //             var jsonobj = JSON.parse(result);
    //             cc.log(jsonobj);
    //             action.Run(jsonobj);
    //         }
    //         catch (e) {
    //             cc.log(e);
    //             action.RunError([e]);
    //         }



    //     }, (error) => {
    //         if (action)
    //             action.RunError([error]);
    //     });

    //     UrlCtrl_new.LoadSafeRequestJson(url, a, data, method);
    // }

    /**
* 
* @param url 
* @param data 
* @param method 
*/
    public static LoadSafeRequestJson(url: string, action: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
        UrlCtrl_new.TryLoadSafeRequestJson(3, url, action, data, method);
    }
    public static TryLoadSafeRequestJson(trycount: number, url: string, action: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
        let desKey = DESEncryptHelper.getRandomStr(ConstValues.DES_SecretLength);
        let rq_data = WebRequest.DefaultData(false, desKey);
        if (Debug()) {
            rq_data.AddOrUpdate("desKey", desKey);
        }
        let secret_pwd = rq_data.GetValue("secret_pwd");
        let reTryAction = (() => {
            setTimeout(() => {
                UrlCtrl_new.TryLoadSafeRequestJson(trycount, url, action, data, method);
            }, 10);
        }).bind(this);
        if (cc.isValid(secret_pwd) || secret_pwd.length > 0) {
            let dindex = secret_pwd.indexOf('=');
            if (dindex != -1 && dindex < secret_pwd.length - 1) {
                reTryAction();
                return;

                // rq_data.AddOrUpdate("errlog", "参数异常");
            }
        }

        let desEncrypt = new DESEncryptHelper();
        let paramData = "";
        if (cc.isValid(data)) {
            paramData = data.ToUrl();
        }
        rq_data.Add("safe_data", desEncrypt.encMe(paramData, desKey));
        method = "POST";

        const a = new ActionNet(this, (res) => {
            try {
                let result: string = res;
                //操作成功
                if (desKey) {
                    let desEncrypt = new DESEncryptHelper();
                    result = desEncrypt.uncMe(res, desKey);
                    let last_pos = 0;
                    let start_pos = 0;


                    let t = result.lastIndexOf('}');
                    if (t > last_pos) last_pos = t;
                    t = result.lastIndexOf(']');
                    if (t > last_pos) last_pos = t;

                    t = result.indexOf('{');
                    if (t < start_pos) start_pos = t;
                    t = result.indexOf('[');
                    if (t < start_pos) start_pos = t;
                    if (start_pos < 0) start_pos = 0;

                    result = result.substr(start_pos, last_pos + 1);
                }
                let jsonobj = JSON.parse(result);
                trycount = 0;
                if (action)
                    action.Run(jsonobj);
            }
            catch (e) {
                if (--trycount > 0) {
                    UrlCtrl_new.TryLoadSafeRequestJson(trycount, url, action, data, method);
                    return;
                }
                if (action)
                    action.RunError([e]);
            }
        }, (error) => {
            if (--trycount > 0) {
                UrlCtrl_new.TryLoadSafeRequestJson(trycount, url, action, data, method);
                return;
            }
            if (action)
                action.RunError([error]);
        });
        UrlCtrl_new.LoadText(url, a, rq_data, method);
    }

}