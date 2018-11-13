
import Dictionary from "./Dictionary";
import Global from "../Global/Global";
import ConfigData from "../Global/ConfigData";
import { QL_Common } from "../CommonSrc/QL_Common";
import { WebRequest } from "../Net/Open8hb";
import { ActionNet } from "./Action";
import { UploadInfo } from "./UploadInfo";
import { Debug } from "../Tools/Function";

export default class UserInfo {
    public constructor() {

    }

    /**
     * 未读邮件数量
     */
    public MessageNum = 0;

    /**
     * 首充礼包状态
     * -1 未知
     * 0  未充值
     * 1  未领取
     * 2  已领取
     */
    public FRState = -1;

    /**
     * 周卡今天是否领取
     */
    public ReceiveWeek = -1;

    /**
     * 特惠礼包状态
     */
    public GiftState = -1;

    /**
     * 活动礼包状态
     */
    public JCFive = -1;

    /**
     * 今天是否已经分享送金币
     */
    public IsShare: number;

    /**
     * 自己的代理Id
     */
    public InviteCode: number;


    /**
     * 玩家登陆来源，weixin？ onekey？
     */
    public Provider: string;

    /**
     * 玩家签名
     */
    public Signature: string = "";

    /**
     * 玩家是否是第一次登陆
     */
    public isFirstLogon = 0;
    /**
     * 当成为代理后此值是生成的代理Id
     */
    public LinkAgentId:number=0;

    public VIPNum: number = 0;

    private _userData: QL_Common.Player = null;


    /**
     * 获取或设置用户数据
     * */
    public get userData(): QL_Common.Player {
        return this._userData;
    }
    /**
     * 获取或设置用户数据
     * */
    public set userData(value: QL_Common.Player) {
        this._userData = value;
        if (value.AttachParam) {
            for (let i = 0; i < value.AttachParam.length; i++) {
                console.log(`key:${value.AttachParam[i].Key},value:${value.AttachParam[i].Value}`);
                if (value.AttachParam[i].Key === "MessageNum") {
                    this.MessageNum = parseInt(value.AttachParam[i].Value);
                    continue;
                }
                if (value.AttachParam[i].Key === "IsShare") {
                    this.IsShare = parseInt(value.AttachParam[i].Value);
                    continue;
                }
                if (value.AttachParam[i].Key === "InviteCode") {
                    this.InviteCode = parseInt(value.AttachParam[i].Value);
                    continue;
                }
                if (value.AttachParam[i].Key === "ReceiveWeek") {
                    this.ReceiveWeek = parseInt(value.AttachParam[i].Value);
                    continue;
                }
                if (value.AttachParam[i].Key === "GiftState") {
                    this.GiftState = parseInt(value.AttachParam[i].Value);
                    continue;
                }
                if (value.AttachParam[i].Key === "FRState") {
                    this.FRState = parseInt(value.AttachParam[i].Value);
                    continue;
                }
                if(value.AttachParam[i].Key === "isFirstLogon"){
                    this.isFirstLogon = parseInt(value.AttachParam[i].Value);
                }
                if(value.AttachParam[i].Key === "LinkAgentId"){
                    this.LinkAgentId = parseInt(value.AttachParam[i].Value);
                }
            }
        }
        if (value.CAttachData) {
            for (let i = 0; i < value.CAttachData.length; i++) {
                const item = value.CAttachData[i];
                console.log(`key:${item.Key},value:${item.Value}`);
                if (item.Key === "Signature") {
                    this.Signature = item.Value;
                }
                if (item.Key === "MessageNum") {
                    this.MessageNum = parseInt(item.Value);
                    continue;
                }
                if (item.Key === "IsShare") {
                    this.IsShare = parseInt(item.Value);
                    continue;
                }
                if (item.Key === "InviteCode") {
                    this.InviteCode = parseInt(item.Value);
                    continue;
                }
                if (item.Key === "ReceiveWeek") {
                    this.ReceiveWeek = parseInt(item.Value);
                    continue;
                }
                if (item.Key === "GiftState") {
                    this.GiftState = parseInt(item.Value);
                    continue;
                }
                if (item.Key === "FRState") {
                    this.FRState = parseInt(item.Value);
                    continue;
                }
                if (item.Key === "JCFive") {
                    this.JCFive = parseInt(item.Value);
                    continue;
                }
            }
        }


        if (this._userData.Header === "") {
            this._userData.Header = ConfigData.defaultHeader;
            this.Provider = "onekey";
        } else {
            this.Provider = "wechat";
        }
    }


    private _userSessionKey: UserSessionKey;

    /**
     * 资源上传签名参数
     * @returns {} 
     */
    public get UserSessionKey() {
        if (this._userSessionKey == null) this._userSessionKey = new UserSessionKey();
        return this._userSessionKey;
    }


    public CurrencyNum(currencyType: QL_Common.CurrencyType) {
        if (Global.Instance.DataCache.UserProp.Contains(currencyType)) {
            return Global.Instance.DataCache.UserProp.GetValue(currencyType);
        }
        return 0;
    }

    // private _weiXinData: UserWeiXinData;
    // public get WeiXinData() {
    //     if (!this._weiXinData) this._weiXinData = new UserWeiXinData();
    //     return this._weiXinData;
    // }
}

class UpLoadVoiceKey {
    public status: string;
    public ext: string;
    public bucket: string;
    public policy: string;
    public signature: string;
}

class UserSessionKey {
    private _sessionKey: string;
    /**
     * 上传语音的参数
     */
    private _upLoadVoiceKey: UploadInfo = null;
    /**
     * 上传头像的参数
     */
    private _upLoadHeaderKey: UploadInfo = null;
    public constructor() {
        this.ClearAll();
    }

    public ClearAll(): void {
        this._sessionKey = "";
    }


    public get SessionKey() {
        return this._sessionKey;
    }
    public set SessionKey(val: string) {
        this._sessionKey = val;
        //if (cc.sys.isBrowser) return;
        const action = new ActionNet(this, this.policySuccess, this.policyError);
        //
        let data = WebRequest.DefaultData(true);
        data.AddOrUpdate("type", "voices");
        WebRequest.userinfo.GetUploadPolicy(action, data);
    }

    public get UpLoadVoiceKey() {
        return Global.Instance.DataCache.UploadInfos.GetUploadInfo('voices');
    }
    public get UpLoadHeaderKey() {
        return Global.Instance.DataCache.UploadInfos.GetUploadInfo('header');
    }

    private policySuccess(obj: any) {
        cc.log(obj)
        const arr = obj.policy_data;

        Global.Instance.DataCache.UploadInfos.AddRange(arr);
        // if (!arr) return;
        // for (let i = 0; i < arr.length; i++) {
        //     const item = arr[i];
        //     if (item.type === "header") {
        //         this._upLoadHeaderKey= new UploadInfo();
        //         this._upLoadHeaderKey.Url = item.Url;
        //         this._upLoadHeaderKey.Params = item;
        //         this._upLoadHeaderKey.FileName = item.FileName;
        //         continue;
        //     }
        //     if (item.type === "voice") {
        //         this._upLoadVoiceKey= new UploadInfo();
        //         this._upLoadVoiceKey.Url = ConfigData.UploadInfoUrl + "/" + item.bucket;
        //         this._upLoadVoiceKey.Params["signature"] = item.signature;
        //         this._upLoadVoiceKey.Params["policy"] = item.policy;
        //         continue;
        //     }
        // }

    }
    private policyError(e) {
        if (Debug()) {
            Global.Instance.UiManager.ShowTip("获取上传语音policy出错");
        }
        //
    }
}