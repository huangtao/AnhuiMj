import Task from "../CustomType/Task";
import { ActionNet, Action } from "../CustomType/Action";
import { IDictionary } from "../Interface/IDictionary";
import { DESEncryptHelper } from "../Tools/DESEncryptHelper";
import { WebRequest } from "./Open8hb";
import { ConstValues } from "../Global/ConstValues";


export default class UrlCtrl {

    public static LoadJsonAsync(url: string, action: ActionNet, data?: IDictionary<string, any>, method: string = "GET"): void {
        let isreturn = false;
            setTimeout(() => {
                if (!isreturn) {
                    //reject(new Error("网络连接已超时"));
                    action.RunError(new Error("网络连接已超时"));
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
        client.responseType = "json";

        client.onreadystatechange = (ev: Event) => {
            if (client.readyState < 4) return;
            if (isreturn) {
                return;
            }
            if (client.status === 200) {
                isreturn = true;
                action.Run(client.response);
            } else {
                isreturn = true;
                action.RunError(new Error(client.statusText));
            }
        };
        
        client.onerror = (ev: Event) => {
            if (isreturn) {
                return;
            }
            isreturn = true;
            action.RunError(new Error("网络请求出错"));
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


    public static async LoadText(url: string, data?: IDictionary<string, any>, method: string = "GET"): Promise<any> {
        var promise = new Promise<any>(function (resolve, reject) {
            let isreturn = false;
            setTimeout(() => {
                if (!isreturn) {
                    reject(new Error("网络连接已超时"));
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
                    resolve(client.response);
                } else {
                    isreturn = true;
                    reject(new Error(client.statusText));
                }
            };
            
            client.onerror = (ev: Event) => {
                if (isreturn) {
                    return;
                }
                isreturn = true;
                reject(new Error("网络请求出错"));
            }

            let log = `发送http请求 请求方式:${method} 请求地址:${url}`;
            if (datastr) {
                client.send(datastr);
                log += `?${datastr}`
            } else {
                client.send();
            }
            cc.log(log);

        });

        return promise;
    }

    public static async LoadJson(url: string, data?: IDictionary<string, any>, method: string = "GET"): Promise<any> {
        var promise = new Promise<any>(function (resolve, reject) {
            UrlCtrl.LoadText(url, data, method).then((res) => {
                try {
                    const data = JSON.parse(res);
                    resolve(data);
                } catch (e) {
                    reject(e);
                }
            }, (err) => {
                reject(err);
            })
        });

        return promise;
    }
    public static async LoadSafeJson(url: string, desKey?: string, data?: IDictionary<string, any>, method: string = "GET"): Promise<any> {

        var promise = new Promise<any>(function (resolve, reject) {
            UrlCtrl.LoadText(url, data, method).then((res) => {
                try {
                    let result: string = res;
                    //操作成功
                    if (desKey) {
                        var desEncrypt = new DESEncryptHelper();
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

                        if (last_pos + 1 != result.length) {
                            cc.log(result);
                        }
                        result = result.substr(0, last_pos + 1);
                    }
                    var jsonobj = JSON.parse(result);
                    cc.log(jsonobj);
                    resolve(jsonobj);
                }
                catch (e) {
                    cc.log(e);
                    reject(e);
                }

            }, (err) => {
                reject(err);
            });
        });

        return promise;

    }

    /**
    * 
    * @param url 
    * @param data 
    * @param method 
    */
    public static async LoadSafeRequestJson(url: string, data?: IDictionary<string, any>, method: string = "POST"): Promise<any> {
        var promise = new Promise<any>(function (resolve, reject) {
            let desKey = DESEncryptHelper.getRandomStr(ConstValues.DES_SecretLength);
            let rq_data = WebRequest.DefaultData(false, desKey);
            let desEncrypt = new DESEncryptHelper();
            rq_data.Add("safe_data", desEncrypt.encMe(data.ToUrl(), desKey));
            method = "POST";


            UrlCtrl.LoadText(url, rq_data, method).then((res) => {
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

                        result = result.substr(0, last_pos + 1);
                    }
                    let jsonobj = JSON.parse(result);
                    resolve(jsonobj);
                }
                catch (e) {
                    try {
                        let jsonobj = JSON.parse(res);
                        resolve(jsonobj);
                    }
                    catch (e2) {
                        cc.log(e2);
                        reject(e2);
                    }
                }
            }, (err) => {
                reject(err);
            });
        });


        return promise;


    }
}