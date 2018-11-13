

import { Action } from "../../CustomType/Action";
import { D } from "./RecordInfo";
import { PlayerComponent } from "./PlayerComponent";
import { addZero } from "../../Tools/Function";
import Global from "../../Global/Global";

const { ccclass, property } = cc._decorator;
@ccclass
export class GameResultComponent extends cc.Component {

    @property(cc.Label)
    gameName: cc.Label=null;

    @property(cc.Label)
    date: cc.Label=null;

    @property(cc.Layout)
    playerLaout: cc.Layout=null;

    data: D;

    action: Action;
    Init() {
        if (!this.data) return;
        const date = new Date(this.data.RecordInfo[0].CTime * 1000);
        this.date.string = `对战时间：${date.getFullYear()}-${addZero(date.getMonth() + 1, 2)}-${addZero(date.getDate(), 2)} ${date.getHours()}:${addZero(date.getMinutes(), 2)}:${addZero(date.getSeconds(), 2)}`
        const game = Global.Instance.DataCache.GameList.GetGame(this.data.GameId);
        this.gameName.string = `游戏：${game.GameName}`;
        this.playerLaout.node.removeAllChildren();
        cc.loader.loadRes("Prefabs/Record/PlayerComponent", this.onres.bind(this));
    }

    private onres(err, prefab: cc.Prefab) {
        if (err) {
            cc.error(err);
            return;
        }
        for (let i = 0; i < this.data.TotalUserData.length; i++) {
            const node = cc.instantiate(prefab);
            if (!cc.isValid(node)) return;
            node.parent = this.playerLaout.node;
            const p = node.getComponent<PlayerComponent>(PlayerComponent);
            if (!cc.isValid(p)) return;
            p.data = this.data.TotalUserData[i];
            p.Init();
        }
    }

    thisClick() {
        if (this.action) {
            this.action.Run([this.data]);
        }
    }
}