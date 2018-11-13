import Dictionary from "./Dictionary";

/*
 * @Author: 刘思宇 
 * @Date: 2017-11-30 16:20:03 
 * @Last Modified by: 刘思宇
 * @Last Modified time: 2017-12-14 15:27:05
 */
export class VoiceUpload {
    public Url: string;
    public FileName: string = "file";
    public Params = {};
    public type:string;
}

export const Voice = "voice";
export const Header = "header";



export class UploadInfos {
    private _dic = new Dictionary<string, VoiceUpload>();
    public GetUploadInfo(types: string) {
        return this._dic.GetValue(types);
    }
    public AddRange(list: VoiceUpload[]) {
        if (!list) return;
        for (let i = 0; i < list.length; i++) {
            this._dic.AddOrUpdate(list[i].type, list[i]);
        }
    }
}