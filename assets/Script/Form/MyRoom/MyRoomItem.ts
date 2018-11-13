import { QL_Common } from "../../CommonSrc/QL_Common";
import Global from "../../Global/Global";
import { QL_Common_GameMessageCommon } from "../../CommonSrc/QL_Common_GameMessageCommon";
import { ShareParam, ShareParamExpands } from "../../CustomType/ShareParam";
import ConfigData from "../../Global/ConfigData";
import { GameCachePool } from "../../Global/GameCachePool";

const { ccclass, property } = cc._decorator;

@ccclass
export class MyRoomItem extends cc.Component{
    // onLoad(){

    // }
    @property(cc.Label)
    gameName: cc.Label=null;

    @property(cc.Label)
    tableID: cc.Label=null;

    @property(cc.Label)
    playerNum: cc.Label=null;

    @property(cc.Button)
    btn_this:cc.Button=null;
    @property(cc.Button)
    btn_del: cc.Button=null;  
    @property(cc.Button)
    btn_inv: cc.Button=null;
    @property(cc.Button)
    btn_enter: cc.Button=null;

    data: QL_Common.UserCreateTableInfo;
    Init() {
        if (!this.data) return;
        this.reFlush();
        
    }

    // private SetAllEnable(d: boolean) {

    // }

    private SetEnterEnable(d: boolean) {
        this.btn_this.interactable = d;

        this.btn_inv.interactable = d;
        this.btn_enter.interactable = d;
    }
    private SetDelEnable(d: boolean) {
        this.btn_del.interactable = d;
    }

    /**
     * 刷新显示，返回值表示是否删除了自身
     */
    public reFlush() :boolean{
        if(!this.data)return true;
        if(!this.data.isValid){
            GameCachePool.MyRoomPool.put(this.node);
            return false;
        }
        this.tableID.string = this.data.TableId + "";
        const room = Global.Instance.DataCache.RoomList.GetRoomByRoomID(this.data.RoomId);

        let str = `${this.data.PlayerCount}/${room.MaxCount}`
        if (this.data.status === QL_Common.UserCreateTableNoticeStatus.TableInGameing) {
            this.playerNum.node.color = cc.hexToColor("#ff0000");
            this.SetEnterEnable(false);
            this.SetDelEnable(false);
        } else if (this.data.PlayerCount >= room.MaxCount) {
            this.playerNum.node.color = cc.hexToColor("#ff0000");
            str += "满";   
            this.SetEnterEnable(false);
            this.SetDelEnable(true);
        } else {
            this.playerNum.node.color = cc.hexToColor("#00ff30");
            str += "闲";
        }
        this.playerNum.string = str;
        const game = Global.Instance.DataCache.GameList.GetGame(this.data.GameId);
        this.gameName.string = game.GameName;
        this.gameName.string = game.GameName;
        return false;
    }


    EnterClick() {
        if (!this.data) return;
        if (this.data.status === QL_Common.UserCreateTableNoticeStatus.TableInGameing) {
            Global.Instance.UiManager.ShowTip("游戏已经开始，无法中途加入");
            return;
        }
        Global.Instance.GameHost.TryEnterRoom(this.data.TableId, QL_Common.EnterRoomMethod.TableID);
    }

    InviteClick() {
        const expand=new ShareParamExpands();
        expand.chairid=QL_Common.InvalidValue.InvalidChairID+"";
        expand.tableid=this.data.TableId+"";
        expand.parent = Global.Instance.DataCache.UserInfo.userData.UserID+"";

        const share = new ShareParam();
        share.title = "一起来玩" + this.gameName.string;
        share.desc = `房号:${this.tableID.string}`
        share.link = ConfigData.SiteConfig.DownloadUrl;
        share.link_param = expand;

        Global.Instance.WxManager.ShareAndSelectType(share);
    }

    DelClick() {
        if (!this.data) return;
        if (this.data.status === QL_Common.UserCreateTableNoticeStatus.TableInGameing) {
            Global.Instance.UiManager.ShowTip("游戏已经开始，无法解散");
            return;
        }
        const enter = () => {
            if (!this.data) return;
            const msg = new QL_Common_GameMessageCommon.MSG_C_Hall2GamePluginMessage();
            msg.Handle = "TryDeleteRoom";
            msg.TableID = this.data.TableId;
            const str = this.data.TableId.toString();
            // msg.ServerUuid = parseInt(str[0]);
            Global.Instance.Socket.SendData(msg);
        }

        //GroupId
        if(this.data.GroupId>0){
            Global.Instance.UiManager.ShowMsgBox("如果创建房间时消耗了钻石，解散时将返还钻石。\n是否解散该房间？", this, enter);
        }else{
            Global.Instance.UiManager.ShowMsgBox("如果创建房间时消耗了房卡，解散时将返还房卡。\n是否解散该房间？", this, enter);
        }

    }

    // private get isGameIng(){
    //     if(!this._info) return false;
    //     return this._info.Status===Uyi.Common.UserCreateTableNoticeStatus.TableInGameing;
    // }
}