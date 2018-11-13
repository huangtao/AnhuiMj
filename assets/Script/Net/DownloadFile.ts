/*
 * @Author: 刘思宇 
 * @Date: 2017-12-14 13:49:11 
 * @Last Modified by: 刘思宇
 * @Last Modified time: 2018-01-24 10:22:52
 */
import { UploadInfo } from "../CustomType/UploadInfo";
import { UuidHelper } from "../Tools/UuidHelper";
import { deepCopy } from "../Tools/Function";
import {  ActionNet } from "../CustomType/Action";
import { FileUploadTask } from "./FileUploadTask";
import { error } from "util";

export class DownloadFile {
    public static LoadFile(url: string, path: string, success: (flag: boolean, data: Uint8Array) => any, error: (info: string) => any = (info: string) => { cc.error(info); }) {
        if (cc.sys.isBrowser) {
            error("浏览器中不支持下载文件");
            return;
        }
        const xhr = cc.loader.getXMLHttpRequest();//new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = 'arraybuffer';
        xhr.timeout = 10000;
        xhr.onreadystatechange = (ev: Event) => {
            if (xhr.readyState < 4) return;
            if (xhr.status === 200) {
                const data = new Uint8Array(xhr.response);
                cc.log("下载完成,保存路径为" + path);
                success(jsb.fileUtils.writeDataToFile(data, path), data);
            } else {
                error("下载文件响应码为" + xhr.status);
            }
        };

        xhr.onerror = (ev: Event) => {
            error("下载文件异常");
        }

        xhr.ontimeout = (ev) => {
            error("下载文件超时");
        }

        xhr.send();
    }


    public static UploadFile(filepath: string, param: UploadInfo, success: (str: string) => any, error: (info: string) => any = (info: string) => { cc.error(info); }) {
        if (cc.sys.isBrowser) {
            error("浏览器中不支持上传文件");
            return;
        }

        const data = jsb.fileUtils.getDataFromFile(filepath);
        const fd = new FormData();

        let resp = {};



        fd.append(param.fileName, data);
        for (let i in param.attachParam) {
            let paramVal: string = param.attachParam[i];
            if (!paramVal && typeof paramVal === "string") {
                paramVal = paramVal.replace('$(uuid)', UuidHelper.getShortUuid());
            }
            resp[i] = paramVal;
            fd.append(i, paramVal);
        }

        const xhr = cc.loader.getXMLHttpRequest();//new XMLHttpRequest();
        xhr.open('POST', param.url);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.timeout = 10000;
        xhr.onerror = (ev: Event) => {
            error("上传文件异常");
        }
        xhr.ontimeout = (ev) => {
            error("上传文件超时");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    success(xhr.responseText);
                } else {
                    error(xhr.status + "上传文件失败" + xhr.statusText);
                }
            }
        }
        xhr.send(fd);
    }



    public static UploadFileNative(param: UploadInfo, success: (str: string) => any, error: (info: string) => any = (info: string) => { cc.error(info); }) {
        if (cc.sys.isBrowser) {
            error("浏览器中不支持上传文件");
            return;
        }



        // const xhr = cc.loader.getXMLHttpRequest();//new XMLHttpRequest();
        // xhr.open('POST', param.url);
        // xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        // xhr.timeout = 10000;
        // xhr.onerror = (ev: Event) => {
        //     error("上传文件异常");
        // }
        // xhr.ontimeout = (ev) => {
        //     error("上传文件超时");
        // }

        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == 4) {
        //         if (xhr.status == 200) {
        //             success(xhr.responseText);
        //         } else {
        //             error(xhr.status + "上传文件失败" + xhr.statusText);
        //         }
        //     }
        // }
        // xhr.send(fd);
    }




    public static UploadAliOssFile(filepath: string, param: UploadInfo,action: ActionNet) {
        if (cc.sys.isBrowser) {
            error("浏览器中不支持上传文件");
            return;
        }

        param = <UploadInfo>deepCopy(param);
        param.filePath = filepath;

        for (let i in param.attachParam) {
            let paramVal: string = param.attachParam[i];
            if (paramVal && typeof paramVal === "string") {
                paramVal = paramVal.replace('$(uuid)', UuidHelper.getShortUuid());
            }
            param.attachParam[i] = paramVal;
        }

        let task:FileUploadTask = new FileUploadTask(param);
        task.execute(action);

        // DownloadFile.UploadFile(filepath, param, (str: string) => {
        //     if (str != null && str.length == 0) {
        //         let resp = deepCopy(param.attachParam);
        //         resp.status = "success";
        //         resp.msg = "OK";
        //     }
        // })
    }
}