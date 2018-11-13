

import { QL_Common } from "../CommonSrc/QL_Common";

export class MyRoomInfo {
    private _infos: QL_Common.UserCreateTableInfo[];


    public get Infos() {
        return this._infos;
    }

    public constructor() {
        this._infos = new Array();
    }

    public InfoChange(type: QL_Common.UserCreateTableNoticeStatus, info: QL_Common.UserCreateTableInfo) {
        
        switch (type) {

            case QL_Common.UserCreateTableNoticeStatus.TableGameOver:
                //info.status = type;
                this.deleteByID(info);
                break;
            case QL_Common.UserCreateTableNoticeStatus.CreateTable:

            case QL_Common.UserCreateTableNoticeStatus.TableInGameing:

            case QL_Common.UserCreateTableNoticeStatus.TableUpdate:
                this.updateByID(info);
                break;
        }
    }

    private deleteByID(info: QL_Common.UserCreateTableInfo) {
        for (let i = 0; i < this._infos.length; i++) {
            if (this._infos[i].TableId === info.TableId) {
                this._infos[i].Dispose();
                this._infos.splice(i, 1);
                break;
            }
        }
    }

    private updateByID(info: QL_Common.UserCreateTableInfo) {
        let item = null;
        for (let i = 0; i < this._infos.length; i++) {
            if (this._infos[i].TableId === info.TableId) {
                item = this._infos[i];
                break;
            }
        }

        if (!item) {
            //如果这一项不存在，直接添加
            this._infos.push(info);
        } else {

            //如果存在，更新信息
            item.PlayerCount = info.PlayerCount;
            item.GameID = info.GameId;
            item.TableID = info.TableId;
            item.status = info.status;
            item.RoomID = info.RoomId;
        }


    }
    Clear() {
        this._infos.length = 0;
    }
}