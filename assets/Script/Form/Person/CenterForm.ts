import UIBase from "../Base/UIBase";
import { LoadHeader, IsTest } from "../../Tools/Function";
import { NativeCtrl } from '../../Native/NativeCtrl';
import { ChoosePhotoReq } from "../../CustomType/ChoosePhotoReq";
import { Action, ActionNet } from "../../CustomType/Action";
import { UploadInfo_Type_Header } from "../../CustomType/UploadInfo";
import { DownloadFile } from "../../Net/DownloadFile";
import { WebRequest } from "../../Net/Open8hb";
import Global from "../../Global/Global";
import { UIName } from "../../Global/UIName";

const { ccclass, property } = cc._decorator;

@ccclass
export class CenterForm extends UIBase<any>{
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.Sprite)
    header: cc.Sprite = null;
    @property(cc.Label)
    nickname: cc.Label = null;
    @property(cc.Node)
    isAttestation: cc.Node = null;
    @property(cc.Label)
    id: cc.Label = null;
    @property(cc.Label)
    ip: cc.Label = null;
    @property(cc.EditBox)
    editBox: cc.EditBox = null;
    @property(cc.Node)
    btn_bind_phone: cc.Node = null;
    @property(cc.Label)
    lab_bind_text: cc.Label = null;

    @property(cc.Toggle)
    man: cc.Toggle = null;
    @property(cc.Toggle)
    woman: cc.Toggle = null;
    @property(cc.Toggle)
    secrecy: cc.Toggle = null;


    InitShow(): void {
        super.onLoad();
        this.id.string = "ID：" + this.UserInfo.userData.UserID;
        this.nickname.string = this.UserInfo.userData.NickName;
        LoadHeader(this.UserInfo.userData.Header, this.header);
        this.ip.string = this.UserInfo.userData.UserIP;

        let userGender = cc.sys.localStorage.getItem("userGender");
        cc.log("++++++++++" + userGender);
        if (userGender) {
            switch (userGender) {
                case "man":
                    this.secrecy.node.getComponent(cc.Toggle).isChecked = false;
                    this.woman.node.getComponent(cc.Toggle).isChecked = false;
                    this.man.node.getComponent(cc.Toggle).isChecked = true;
                    break;
                case "woman":
                    this.man.node.getComponent(cc.Toggle).isChecked = false;
                    this.secrecy.node.getComponent(cc.Toggle).isChecked = false;
                    this.woman.node.getComponent(cc.Toggle).isChecked = true;
                    break;
                default:
                    this.man.node.getComponent(cc.Toggle).isChecked = false;
                    this.woman.node.getComponent(cc.Toggle).isChecked = false;
                    this.secrecy.node.getComponent(cc.Toggle).isChecked = true;
                    break;
            }
        } else {
            switch (this.UserInfo.userData.Gender) {
                case 0:
                    this.man.node.getComponent(cc.Toggle).isChecked = false;
                    this.woman.node.getComponent(cc.Toggle).isChecked = false;
                    this.secrecy.node.getComponent(cc.Toggle).isChecked = true;
                    break;
                case 1:
                    this.secrecy.node.getComponent(cc.Toggle).isChecked = false;
                    this.woman.node.getComponent(cc.Toggle).isChecked = false;
                    this.man.node.getComponent(cc.Toggle).isChecked = true;
                    break;
                default:
                    this.man.node.getComponent(cc.Toggle).isChecked = false;
                    this.secrecy.node.getComponent(cc.Toggle).isChecked = false;
                    this.woman.node.getComponent(cc.Toggle).isChecked = true;
                    break;
            }
        }
        this.editBox.string = this.UserInfo.Signature;

        // if (this.DataCache.UserInfo.userData.IsAuthentication) {
        //     this.isAttestation.active = true;
        // }

        if (!this.UserInfo.userData.PhoneNum) {
            this.btn_bind_phone.active = true;
            this.lab_bind_text.string = "点击右边文字绑定手机→";
        } else {
            this.btn_bind_phone.active = false;
            this.lab_bind_text.string = "绑定手机号为：" + this.UserInfo.userData.PhoneNum;
        }

    }

    /**
     * 显示收货地址(勿删)
     */
    private updateAddress(){
        this.UiManager.ShowUi(UIName.Address)
    }
 
    /**
     * 复制玩家id(勿删)
     */
    private copyMyId(){
     NativeCtrl.CopyToClipboard(""+this.UserInfo.userData.UserID);
    }
 
    /**
     * 绑定手机号
     */
    private bindPhone(){
         this.UiManager.ShowUi(UIName.BindPhonePanel);
         super.Close();
    }

    public switchClick(customEventData: string) {
        cc.sys.localStorage.setItem("userGender", customEventData);
    }

    onSelectHeaderPhoto() {
        if (IsTest()) {
            cc.log('选择图片');
            let req = new ChoosePhotoReq();
            let action = new Action(this, this.onSelectHeaderPhotoCallback)
            NativeCtrl.ChoosePhoto(req, action);
        }
    }
    private onSelectHeaderPhotoCallback(obj: any) {
        //{"callBack":"1af651c065789c8877e6bd6302e5388c","imgPath":["/storage/emulated/0/HappyGame/ImagePic/-1390493704.jpg"],"msg":"OK","status":"success"}
        //{"callBack":"b8e1493c14671633beac389b2ceb5700","msg":"用户取消了上传图片","status":"fail"}

        if (obj.status != "success") {
            this.UiManager.ShowTip("用户取消了上传图片");
            return;
        }

        let imgPathArray: Array<string> = obj.imgPath;
        if (imgPathArray.length <= 0) {
            return;
        }
        let imgPath: string = imgPathArray[0];
        if (!cc.isValid(imgPath) || imgPath.length <= 0) {
            return;
        }

        const data = this.DataCache.UploadInfos.GetUploadInfo(UploadInfo_Type_Header);
        if (!data) {
            return;
        }
        let o: any = {};
        let thisobj = this;
        o.Success = function (result) {
            let path = result.baseUrl + result.key + `?t=${new Date().valueOf()}`;
            cc.log("头像上传成功 " + path);
            if (path && path.length > 0) {
                // SendMessage.Instance.ChartMsg(ChatType.Record, path);
                thisobj.UserInfo.userData.Header = path;
                Global.Instance.DataCache.ImgTexture.Remove(path);
                LoadHeader(path, thisobj.header);

                let data = WebRequest.DefaultData(true);
                data.AddOrUpdate("header", path);

                let setUserHeaderAction = new ActionNet(o, (obj) => {
                    thisobj.UiManager.ShowTip("修改成功");
                });
                WebRequest.userinfo.SetUserHeader(setUserHeaderAction, data);
            }
        }
        let action = new ActionNet(o, o.Success);
        DownloadFile.UploadAliOssFile(imgPath, data, action);




    }
}