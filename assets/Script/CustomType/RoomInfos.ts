import { QL_Common } from "../CommonSrc/QL_Common";

export class RoomInfos {
    private _infos: Array<QL_Common.RoomClient>;
    public get RoomInfos(): Array<QL_Common.RoomClient> {
        return this._infos;
    }

    public set RoomInfos(infos: Array<QL_Common.RoomClient>) {
        this._infos = infos;
        for (let i = 0; i < infos.length; i++) {
            if (infos[i].RoomLV < 1) {
                infos[i].RoomLV = 1;
                continue;
            }
            if (infos[i].RoomLV > 3) {
                infos[i].RoomLV = 3;
                continue;
            }
        }
    }

    public Contains(id: number): boolean {
        if (!this._infos || this._infos.length === 0) return false;
        for (let i = 0; i < this._infos.length; i++) {
            if (this._infos[i].ID === id) return true;
        }
        return false;
    }


    public GetRoomByRoomID(id: number) {
        if (!this._infos || this._infos.length === 0) return null;
        const length = this._infos.length;
        for (let i = 0; i < length; i++) {
            const info = this._infos[i];
            if (info.ID === id) {
                return info;
            }
        }
        return null;
    }

    public GetRoomByGameID(id: number) {
        const arr: Array<QL_Common.RoomClient> = [];
        if (!this._infos || this._infos.length === 0) return arr;

        const length = this._infos.length;
        for (let i = 0; i < length; i++) {
            const info = this._infos[i];
            if (info.GameID === id) {
                arr.push(info);
            }
        }
        return arr;
    }

    public GetRoomByIDAndType(id: number, type: QL_Common.RoomType) {
        const arr: Array<QL_Common.RoomClient> = [];
        if (!this._infos || this._infos.length === 0) return arr;

        const length = this._infos.length;
        for (let i = 0; i < length; i++) {
            const info = this._infos[i];
            if (info.GameID === id && info.RoomType === type) {
                arr.push(info);
            }
        }
        return arr;
    }

    public GetCreateRoom(id: number) {
        if (!this._infos || this._infos.length === 0) return null;
        const length = this._infos.length;
        for (let i = 0; i < length; i++) {
            const info = this._infos[i];
            if (info.GameID === id && info.RoomType === QL_Common.RoomType.MomentsGame) {
                return info;
            }
        }
        return null;
    }



}