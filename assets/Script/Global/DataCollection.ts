/*
 * @Author: 刘思宇 
 * @Date: 2017-12-02 09:39:06 
 * @Last Modified by: 刘思宇
 * @Last Modified time: 2017-12-14 15:28:22
 */
import { UyiObject } from "../Serializer/UyiObject";
import Dictionary from "../CustomType/Dictionary";
import { QL_Common } from "../CommonSrc/QL_Common";
import UserInfo from "../CustomType/UserInfo";
import { IDictionary } from "../Interface/IDictionary";
import { GameInfos } from "../CustomType/GameInfos";
import { RoomInfos } from "../CustomType/RoomInfos";
import { MyRoomInfo } from "../CustomType/MyRoomInfo";
import { ShareParamExpands } from "../CustomType/ShareParam";
import { UploadInfos } from "../CustomType/UploadInfo"; 
import { FriendCircleInfo}  from "../CustomType/FriendCircleInfo";


export default class DataCollection extends UyiObject {

    public ShareParam: ShareParamExpands;

    public OfflineRoom: QL_Common.RoomClient;

    private _sysConfig: IDictionary<string, string>;
    public get SysConfig(): IDictionary<string, string> {
        if (!this._sysConfig) {
            this._sysConfig = new Dictionary<string, string>();
        }
        return this._sysConfig;
    }

    private _imgTexture: IDictionary<string, cc.SpriteFrame>;
    public get ImgTexture(): IDictionary<string, cc.SpriteFrame> {
        if (!this._imgTexture) {
            this._imgTexture = new Dictionary<string, cc.SpriteFrame>();
        }
        return this._imgTexture;
    }

    private _userProp: IDictionary<QL_Common.CurrencyType, number>;
    public get UserProp(): IDictionary<QL_Common.CurrencyType, number> {
        if (!this._userProp) {
            this._userProp = new Dictionary<QL_Common.CurrencyType, number>();
        }
        return this._userProp;
    }

    private _userInfo: UserInfo;
    public get UserInfo() {
        if (!this._userInfo) {
            this._userInfo = new UserInfo();
        }
        return this._userInfo;
    }

    private _myRoom: MyRoomInfo;
    public get MyRoom() {
        if (this._myRoom == null) {
            this._myRoom = new MyRoomInfo();
        }
        return this._myRoom;
    }


    private _gameList: GameInfos;
    public get GameList() {
        if (this._gameList == null) {
            this._gameList = new GameInfos();
        }
        return this._gameList;
    }



    private _roomList: RoomInfos;
    public get RoomList() {
        if (this._roomList == null) {
            this._roomList = new RoomInfos();
        }
        return this._roomList;
    }

    private _uploadInfos: UploadInfos;
    public get UploadInfos() {
        if (this._uploadInfos == null) {
            this._uploadInfos = new UploadInfos();
        }
        return this._uploadInfos;
    }

    /**
     * 亲友圈列表
     */
    private _friendCircleInfos: Array<FriendCircleInfo>;
    public get FriendCircleInfos(){
        if (null == this._friendCircleInfos) {
            this._friendCircleInfos = new Array<FriendCircleInfo>();
        }

        return this._friendCircleInfos;
    }

     public set FriendCircleInfos(data){
      this._friendCircleInfos = data;
    }

    public GroupId: number = 0;

}