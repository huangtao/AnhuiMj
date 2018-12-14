export class AppInfo {
    status:string;
    msg:string;
    //升级下载地址
    downloadurl:string;

    //渠道
    up_channel:string;

    //版本号
    pkg_version: number;
    js_version:string

    //热更新相关
    packageUrl: string;
    remoteManifestUrl: string;
    remoteVersionUrl: string;
    debug_model:number =1;
}