import UIBase from "../Base/UIBase";
import { LoadHeader, IsTest, LoadImage } from "../../Tools/Function";
import { NativeCtrl } from '../../Native/NativeCtrl';
import { ChoosePhotoReq } from "../../CustomType/ChoosePhotoReq";
import { Action, ActionNet } from "../../CustomType/Action";
import { UploadInfo_Type_Header, UploadInfo_Type_Userphoto } from "../../CustomType/UploadInfo";
import { DownloadFile } from "../../Net/DownloadFile";
import { WebRequest } from "../../Net/Open8hb";
import Global from "../../Global/Global";
import { UIName } from "../../Global/UIName";
import { timingSafeEqual } from "crypto";
import { ConstValues } from "../../Global/ConstValues";

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
    // @property(cc.Label)
    // ip: cc.Label = null;
    // @property(cc.EditBox)
    // editBox: cc.EditBox = null;
    // @property(cc.Node)
    // btn_bind_phone: cc.Node = null;
    // @property(cc.Label)
    // lab_bind_text: cc.Label = null;

    // @property(cc.Toggle)
    // man: cc.Toggle = null;
    // @property(cc.Toggle)
    // woman: cc.Toggle = null;
    // @property(cc.Toggle)
    // secrecy: cc.Toggle = null;
    @property({ type: [cc.Node], tooltip: "个人相册的占坑索引" })
    user_photos: cc.Node[] = [];
    @property({ type: cc.SpriteFrame, tooltip: "默认的个人相册底图" })
    user_photo_default: cc.SpriteFrame = null;

    @property({ type: cc.Node, tooltip: "去绑定按钮" })
    btn_qbd: cc.Node = null;
    @property({ type: cc.Node, tooltip: "变更按钮" })
    btn_biangeng: cc.Node = null;
    @property({ type: cc.Label, tooltip: "手机号" })
    lab_bind_text: cc.Label = null;


    InitShow(): void {
        super.onLoad();
        this.id.string = "ID:" + this.UserInfo.userData.UserID;
        let nickName: string = this.UserInfo.userData.NickName;
        if (cc.isValid(nickName)) {
            this.nickname.string = nickName.length <= 6 ? nickName : nickName.substr(0, 6)+"...";
        } else {
            this.nickname.string = '';
        }
        LoadHeader(this.UserInfo.userData.Header, this.header);
        // this.ip.string = this.UserInfo.userData.UserIP;

        let userGender = cc.sys.localStorage.getItem("userGender");
        cc.log("++++++++++" + userGender);
        // if (userGender) {
        //     switch (userGender) {
        //         case "man":
        //             this.secrecy.node.getComponent(cc.Toggle).isChecked = false;
        //             this.woman.node.getComponent(cc.Toggle).isChecked = false;
        //             this.man.node.getComponent(cc.Toggle).isChecked = true;
        //             break;
        //         case "woman":
        //             this.man.node.getComponent(cc.Toggle).isChecked = false;
        //             this.secrecy.node.getComponent(cc.Toggle).isChecked = false;
        //             this.woman.node.getComponent(cc.Toggle).isChecked = true;
        //             break;
        //         default:
        //             this.man.node.getComponent(cc.Toggle).isChecked = false;
        //             this.woman.node.getComponent(cc.Toggle).isChecked = false;
        //             this.secrecy.node.getComponent(cc.Toggle).isChecked = true;
        //             break;
        //     }
        // } else {
        //     switch (this.UserInfo.userData.Gender) {
        //         case 0:
        //             this.man.node.getComponent(cc.Toggle).isChecked = false;
        //             this.woman.node.getComponent(cc.Toggle).isChecked = false;
        //             this.secrecy.node.getComponent(cc.Toggle).isChecked = true;
        //             break;
        //         case 1:
        //             this.secrecy.node.getComponent(cc.Toggle).isChecked = false;
        //             this.woman.node.getComponent(cc.Toggle).isChecked = false;
        //             this.man.node.getComponent(cc.Toggle).isChecked = true;
        //             break;
        //         default:
        //             this.man.node.getComponent(cc.Toggle).isChecked = false;
        //             this.secrecy.node.getComponent(cc.Toggle).isChecked = false;
        //             this.woman.node.getComponent(cc.Toggle).isChecked = true;
        //             break;
        //     }
        // }
        // this.editBox.string = this.UserInfo.Signature;

        // if (this.DataCache.UserInfo.userData.IsAuthentication) {
        //     this.isAttestation.active = true;
        // }

        if (!this.UserInfo.userData.PhoneNum) {
            this.btn_qbd.active = true;
            this.btn_biangeng.active = !this.btn_qbd.active;
            this.lab_bind_text.string = "点击右边按钮绑定手机→";
        } else {
            this.btn_qbd.active = false;
            this.btn_biangeng.active = !this.btn_qbd.active;
            this.lab_bind_text.string = this.UserInfo.userData.PhoneNum;
        }
        for (let index: number = 0; index < ConstValues.MaxUserPhotoCount; index++) {
            this.loadPhoto(this.UserInfo["userPhotoPath" + index.toString()], index);
        }
    }


    public switchClick(customEventData: string) {
        cc.sys.localStorage.setItem("userGender", customEventData);
    }

    onSelectUserPhoto(e, arg) {
        if (IsTest()) {
            cc.log('选择图片');
            let req = new ChoosePhotoReq();
            let action = new Action(this, ((obj) => {
                let i = parseInt(arg);
                if (Number.isNaN(i)) {
                    i = 0;
                }
                this.onSelectUserPhotoCallback(i, obj);
            }).bind(this));
            NativeCtrl.ChoosePhoto(req, action);
        }
    }
    onDeleteUserPhoto(e, arg) {

        let index = parseInt(arg);
        if (Number.isNaN(index)) {
            return;
        }

        let data = WebRequest.DefaultData(true);
        data.AddOrUpdate("index", index);

        let setUserHeaderAction = new ActionNet(this, (obj) => {
            this.removePhoto(index);
            this.UiManager.ShowTip("删除成功");
        });
        WebRequest.userinfo.DeleteUserPhoto(setUserHeaderAction, data);


    }
    private onSelectUserPhotoCallback(index: number, obj: any) {
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

        const data = this.DataCache.UploadInfos.GetUploadInfo(UploadInfo_Type_Userphoto);
        if (!data) {
            return;
        }
        let o: any = {};
        let thisobj = this;
        o.Success = function (result) {
            let path = result.baseUrl + result.key + `?t=${new Date().valueOf()}`;
            cc.log("相册图片上传成功 " + path);
            if (path && path.length > 0) {

                Global.Instance.DataCache.ImgTexture.Remove(path)
                thisobj.loadPhoto(path, index);
                // thisobj.UserInfo.userData.Header = path;
                // Global.Instance.DataCache.ImgTexture.Remove(path);
                // LoadHeader(path, thisobj.header);

                //修改玩家图片缓存
                thisobj.UserInfo["userPhotoPath" + index.toString()] = path;

                let data = WebRequest.DefaultData(true);
                data.AddOrUpdate("path", path);
                data.AddOrUpdate("index", index);

                let setUserHeaderAction = new ActionNet(o, (obj) => {
                    thisobj.UiManager.ShowTip("上传成功");
                });
                //调用接口设置玩家头像信息数据
                WebRequest.userinfo.SetUserPhoto(setUserHeaderAction, data);
            }
        }
        let action = new ActionNet(o, o.Success);
        data.index = index;
        DownloadFile.UploadAliOssFile(imgPath, data, action);




    }
    /**
     * 
     * @param path 加载用户的个人相册图片信息
     * @param index
     */
    private loadPhoto(path: string, index: number): any {
        if (!cc.isValid(path) || path.length <= 0) return;
        if (!cc.isValid(this.user_photos) || this.user_photos.length <= index) return;

        let node = this.user_photos[index];
        if (!cc.isValid(node)) return;

        let wscxc: cc.Node = node.getChildByName("wscxc");
        let del: cc.Node = node.getChildByName("del");
        let userPhotoSprite: cc.Sprite = wscxc.getComponent<cc.Sprite>(cc.Sprite);
        let nodeButton: cc.Button = node.getComponent<cc.Button>(cc.Button);
        if (!cc.isValid(wscxc)) return;
        if (!cc.isValid(del)) return;
        if (!cc.isValid(userPhotoSprite)) return;
        if (!cc.isValid(nodeButton)) return;

        LoadImage(path, userPhotoSprite);
        del.active = true;
        nodeButton.interactable = false;


    }
    /**
     * 
     * @param index 删除用户的相册图片
     */
    private removePhoto(index: number): any {

        if (!cc.isValid(this.user_photos) || this.user_photos.length <= index) return;

        let node = this.user_photos[index];
        if (!cc.isValid(node)) return;

        let wscxc: cc.Node = node.getChildByName("wscxc");
        let del: cc.Node = node.getChildByName("del");
        let userPhotoSprite: cc.Sprite = wscxc.getComponent<cc.Sprite>(cc.Sprite);
        let nodeButton: cc.Button = node.getComponent<cc.Button>(cc.Button);
        if (!cc.isValid(wscxc)) return;
        if (!cc.isValid(del)) return;
        if (!cc.isValid(userPhotoSprite)) return;
        if (!cc.isValid(nodeButton)) return;

        //修改玩家图片缓存
        this.UserInfo["userPhotoPath" + index.toString()] = '';

        userPhotoSprite.spriteFrame = this.user_photo_default;
        del.active = false;
        nodeButton.interactable = true;

    }
    /**
     * 显示收货地址(勿删)
     */
    private updateAddress() {
        this.UiManager.ShowUi(UIName.Address)
    }
    /**
     * 复制玩家id(勿删)
     */
    private copyMyId() {
        NativeCtrl.CopyToClipboard("" + this.UserInfo.userData.UserID);
    }
    /**
     * 绑定手机号
     */
    private bindPhone() {
        this.UiManager.ShowUi(UIName.BindPhonePanel);
        this.CloseClick();
    }
}