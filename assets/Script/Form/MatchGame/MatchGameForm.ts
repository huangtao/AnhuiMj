
import { Action } from "../../CustomType/Action";
import { QL_Common } from "../../CommonSrc/QL_Common";
import Global from "../../Global/Global";
import UIBase from "../Base/UIBase";
import { UIName } from "../../Global/UIName";
import { GameIcon } from "../CreateRoom/GameIcon";
import { RoomIcon } from "./RoomIcon";
import { GameCachePool } from "../../Global/GameCachePool";

const { ccclass, property } = cc._decorator;

@ccclass
export class MatchGameForm extends UIBase<any> {
    @property(cc.Prefab)
    gameprefab: cc.Prefab=null;

    @property(cc.Prefab)
    roomprefab: cc.Prefab=null;

    @property(cc.ToggleGroup)
    gameicons: cc.ToggleGroup=null;

    @property(cc.Layout)
    roomicons: cc.Layout=null;

    private roomAction = new Action(this,this.SelectRoom);
    public get UIname() {
        return UIName.MatchGame;
    }
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    onLoad() {
        super.onLoad();
        let array: Array<QL_Common.GameInfo>;
        array = this.DataCache.GameList.GetGamesByType(QL_Common.GameType.ChessGame)
        .concat(this.DataCache.GameList.GetGamesByType(QL_Common.GameType.Mahjong))
        .concat(this.DataCache.GameList.GetGamesByType(4))
        if (array.length === 0) return;
        const action = new Action(this,this.SelectGame);
        for (let i = 0; i < array.length; i++) {
            let newNode=GameCachePool.GamePool.get();
            if (!cc.isValid(newNode)) {
                newNode = cc.instantiate(this.gameprefab);
            }
            
            const t = newNode.getComponent<cc.Toggle>(cc.Toggle);
            t.toggleGroup = this.gameicons;
            //this.gameicons.toggleItems.push(t);
            const u = newNode.getComponent<GameIcon>(GameIcon);
            u.gameinfo = array[i];
            u.action = action;
            u.Init();

            this.gameicons.node.addChild(newNode);
        }
        this.SelectGame(array[0]);
    }


    start(){
        super.start();
        this.node.setPosition(640,360);
    }

    InitShow(){
        super.InitShow();
        
        if(!cc.game.isPersistRootNode(this.node)){
            cc.log("添加常驻节点");
            cc.game.addPersistRootNode(this.node);
        }
    }

    private SelectGame(gameinfo: QL_Common.GameInfo) {
        cc.log("选择" + gameinfo.GameName);
        const rooms = this.DataCache.RoomList.GetRoomByIDAndType(gameinfo.GameID, QL_Common.RoomType.MultipleGame)
        .concat(this.DataCache.RoomList.GetRoomByIDAndType(gameinfo.GameID, 4));
        rooms.sort((a, b) => a.RoomLV - b.RoomLV);
        this.clearRGroup();
        for (let i = 0; i < rooms.length; i++) {
            let newNode=GameCachePool.RoomPool.get();
            if (!cc.isValid(newNode)) {
                newNode = cc.instantiate(this.roomprefab);
            }
            this.OnNode(newNode, rooms[i]);
        }

    }


    private clearLGroup() {
        if (cc.isValid(this.gameicons.node)) {
            while (this.gameicons.node.children.length > 0) {
                GameCachePool.GamePool.put(this.gameicons.node.children[0]);
            }
        }
    }

    private clearRGroup() {
        if (cc.isValid(this.roomicons.node)) {
            while (this.roomicons.node.children.length > 0) {
                GameCachePool.RoomPool.put(this.roomicons.node.children[0]);
            }
        }
    }


    private OnNode(node: cc.Node, info: QL_Common.RoomClient) {
        const room = <RoomIcon>node.getComponent(RoomIcon);
        if (!cc.isValid(room)) {
            cc.warn("无效的ui组件")
            return;
        }
        room.Action = this.roomAction;
        room.RoomInfo = info;
        room.Init();
        this.roomicons.node.addChild(node);
    }

    private SelectRoom(room: QL_Common.RoomClient) {
        Global.Instance.GameHost.TryEnterRoom(room.ID,QL_Common.EnterRoomMethod.RoomID);
    }

}