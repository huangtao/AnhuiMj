import UIBase from "../Base/UIBase";
import { MyRoomItem } from "./MyRoomItem";
import { EventCode } from "../../Global/EventCode";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { GameCachePool } from "../../Global/GameCachePool";

const { ccclass, property } = cc._decorator;

@ccclass
export class MyRoomForm extends UIBase<any>{
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.Node)
    ItemNode: cc.Node = null;
    InitShow() {
        this.Clear();
        if (this.DataCache.MyRoom.Infos.length == 0) return;
        cc.loader.loadRes("Prefabs/MyRoom/MyRoomItem", this.onPrefab.bind(this));
    }

    private onPrefab(err, prefab: cc.Prefab) {
        if (err) {
            cc.error(err);
            return;
        }
        const infos = this.DataCache.MyRoom.Infos;
        for (let i = 0; i < infos.length; i++) {
            let node = GameCachePool.MyRoomPool.get();
            if (!cc.isValid(node)) {
                node = cc.instantiate(prefab);
            }
            const m = node.getComponent<MyRoomItem>(MyRoomItem);
            m.data = infos[i];
            m.Init();
            node.parent = this.ItemNode;
        }
    }

    private Clear() {
        while (this.ItemNode.childrenCount > 0) {
            GameCachePool.MyRoomPool.put(this.ItemNode.children[0]);
        }
        // this.ItemNode.destroyAllChildren();
    }

    protected OnUiEventComeIn(eventCode: number): boolean {
        switch (eventCode) {
            case EventCode.onMyRoomChange:
                this.onMyRoomChange();
                return true;
        }
        return false;
    }

    private onMyRoomChange() {
        cc.log("受到房间信息变化");
        const all = this.ItemNode.children;
        for (let i = 0; i < all.length; i++) {
            const m = all[i].getComponent<MyRoomItem>(MyRoomItem);
            m.reFlush();

        }
        cc.log(all.length);

    }



}