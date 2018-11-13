import { Action } from "../../CustomType/Action";
import { EventCode } from "../../Global/EventCode";
import { QL_Common } from "../../CommonSrc/QL_Common";
import Global from "../../Global/Global";
import { LocalStorage } from "../../CustomType/LocalStorage";

export class CreateRoomStruct {
    CheckMoneyNum: number;
    CurrencyType: QL_Common.CurrencyType;
    RoomData: any;
    GroupId:number; 
}

export abstract class CreateRoomSettingBase extends cc.Component {
    private _roomInfo: QL_Common.RoomClient = null;

    private _showParams: any = null

    /**
     * 保存数据
     * @param key 
     * @param value
     */
    protected SetItem(key: string, value: string): void {
        key = this.RoomInfo.GameID + key;
        const str = LocalStorage.GetItem(this._roomInfo.GameID + "_allkey");
        let array: Array<string>;
        if (str && str.length > 0) {
            try {
                array = JSON.parse(str);
            } catch (e) {
                array = new Array();
            }
        } else {
            array = new Array();
        }
        if (array.indexOf(key) < 0) {
            array.push(key);
            LocalStorage.SetItem(this._roomInfo.GameID + "_allkey", JSON.stringify(array));
        }
        LocalStorage.SetItem(key, value);
    }

    protected RemoveItem(key: string) {
        LocalStorage.RemoveItem(this.RoomInfo.GameID + key);
    }

    /**
     * 获取缓存的数据，如果未缓存过数据，返回null
     * @param key 缓存的键
     */
    protected GetItem(key: string): string {
        return LocalStorage.GetItem(this.RoomInfo.GameID + key);
    }



    public get UiManager() {
        return Global.Instance.UiManager;
    }

    public get ShowParam(): any {
        if (cc.isValid(this._showParams))
            return this._showParams;
        else
            return {}
    }
    public set ShowParam(value: any) {
        this._showParams = value;
    }


    public set RoomInfo(val: QL_Common.RoomClient) {
        this._roomInfo = val;

    }

    public get RoomInfo(): QL_Common.RoomClient {
        if (!this._roomInfo) {
            cc.error("roominfo尚未初始化，请在Init之后获取信息");
            return new QL_Common.RoomClient();
        }
        return this._roomInfo;
    }

    public InitWithData(): boolean {
        cc.log("初始化设置界面");
        return false;
    }

    /**
     *
     */
    public ClearAllCache() {
        if (!this._roomInfo) return;
        const str = LocalStorage.GetItem(this._roomInfo.GameID + "_allkey");
        try {
            const array = JSON.parse(str);
            for (let i = 0; i < array.length; i++) {
                LocalStorage.RemoveItem(array[i]);
            }
            LocalStorage.RemoveItem(this._roomInfo.GameID + "_allkey");
        } catch (e) {

        }

    }

    /**
     * 返回游戏规则
     */
    public abstract GetSetting(): CreateRoomStruct;
}