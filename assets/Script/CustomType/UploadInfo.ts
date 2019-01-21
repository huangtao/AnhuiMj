import Dictionary from "./Dictionary";
import { deepCopy } from "../Tools/Function";
import { UyiObject } from "../Serializer/UyiObject";


/*

 

 * @Author: 刘思宇 
 * @Date: 2017-11-30 16:20:03 
 * @Last Modified by: 刘思宇
 * @Last Modified time: 2017-12-14 15:27:05
 */
export class UploadInfo {
    public url: string;
    public fileName: string = "file";
    public filePath: string;
    public attachParam = {};
    public type: string;
    public callBack: string;
    public baseUrl: string;
    public index: number = 0;
}



export const UploadInfo_Type_Voice = "voices";
export const UploadInfo_Type_Header = "header";
export const UploadInfo_Type_Userphoto = "userphoto";



export class UploadInfos {
    private _dic = new Dictionary<string, UploadInfo>();
    public GetUploadInfo(types: string): UploadInfo {
        return deepCopy(this._dic.GetValue(types));
    }
    public AddRange(list: UploadInfo[]) {
        if (!list) return;
        for (let i = 0; i < list.length; i++) {
            this._dic.AddOrUpdate(list[i].type, list[i]);
        }

        cc.log("成功的获取文件的上传策略");
        cc.log(this._dic);

    }

}