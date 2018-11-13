import { WebRequest } from "../../../Net/Open8hb";
import { IDictionary } from "../../../Interface/IDictionary";
import UIBase from "../../Base/UIBase";
import UiManager from "../../../Manager/UiManager";
import Global from "../../../Global/Global";
import { Action, ActionNet } from "../../../CustomType/Action";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { UIName } from "../../../Global/UIName";
import FriendCircleDataCache from "../FriendCircleDataCache";
import FriendCircleWebHandle from "../FriendCircleWebHandle";
import { QL_Common_GameMessageCommon } from "../../../CommonSrc/QL_Common_GameMessageCommon";
import { FriendCircleInfo ,FriendCircleRule} from "../../../CustomType/FriendCircleInfo";
import { ClickJoinRoomItem } from "./ClickJoinRoomItem";
import { StrToObject } from "../../../Tools/Function";
import UrlCtrl from "../../../Net/UrlCtrl";
import { ShareParam } from "../../../CustomType/ShareParam";
import ConfigData from "../../../Global/ConfigData";
import SendMessage from "../../../Global/SendMessage";

const { ccclass, property } = cc._decorator;

/******************************** 房间玩法和房间列表Item ******************************/

@ccclass
export default class RoomRuleItem extends cc.Component {
	public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;

    /**
     * 成员列表Item
     */
    @property(cc.Prefab)
    prefab_memberItem: cc.Prefab = null;


   /**
    * 变更按钮
    */
    @property(cc.Button)
    btn_modifyRule: cc.Button = null;

    /**
     * 分享按钮
     */
    @property(cc.Button)
    btn_share: cc.Button = null;

    /**
     * 解散按钮
     */
    @property(cc.Button)
    btn_dissolve: cc.Button = null;

    /**
    * 桌子状态
    */
    @property(cc.Label)
    lab_status: cc.Label = null;

    /**
    * 桌子玩法
    */
    @property(cc.Label)
    lab_rule: cc.Label = null;


    /**
     * 是否是规则模板(0 不是，1 是)
     */
    @property(Number)
    isRuleModel: Number = 0;

    /**
     * 桌子最大玩家数
     */
    private _maxUserCount = 4;

    /**
     * 桌子信息
     */
    private _talbleInfo: QL_Common.UserCreateTableInfo = null;

    public getTableInfo(): QL_Common.UserCreateTableInfo{
        return this._talbleInfo;
    }

    public setTableInfo(tableInfo: QL_Common.UserCreateTableInfo){
        this._talbleInfo = tableInfo;
    }

    /**
     * 房间头像按钮数组
     */ 
    private _memberItemList: Array<ClickJoinRoomItem> = null;

    public get MemberItemlist(): Array<ClickJoinRoomItem> {
        if (!this._memberItemList) {
            this._memberItemList = new Array<ClickJoinRoomItem>();
        }

        return this._memberItemList;
    }

    public set MemberItemlist(array: Array<ClickJoinRoomItem>) {
        this._memberItemList = array;
    }
    
    public initData(){
        this.clearTableHead();

        this.btn_modifyRule.node.active = false;
        this.btn_share.node.active = false;
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-08
     * @Desc     更新玩法信息数据显示
     * @param    {any}      data [description]
     */
    public updateRuleUIShow(data: any){
        if (!data) {
            return;
        }

        if (this.btn_modifyRule && this.btn_share.node && this.btn_dissolve) {
            this.btn_modifyRule.node.active = false;
            this.btn_share.node.active = false;
            this.btn_dissolve.node.active = false;
        }
        
        let ruleInfo = FriendCircleDataCache.Instance.getCurFriendCircleRule();

        // 更新玩法显示
        if (this.lab_rule) {
            this.lab_rule.string = ruleInfo.ruleDesc;
        }

        let isAdmin = FriendCircleDataCache.Instance.selfIsAdministrator();
        // 只有管理员有变更和分享权限
        if (isAdmin) {
            // 只有模板才有变更和分享按钮
            if (this.isRuleModel) {
                this.btn_modifyRule.node.active = true;
                this.btn_share.node.active = true;
                this.btn_dissolve.node.active = false;
            }else{
                // 解散功能只有非模板界面有
                this.btn_dissolve.node.active = true;
                this.btn_share.node.active = false;
                this.btn_modifyRule.node.active = false;
            }
        }

        if (!this.MemberItemlist || 0 == this.MemberItemlist.length) {
            this.createJoinRoomBtn();
        }      
    }

    /**
     * 创建加入游戏加号按钮显示
     */
    public createJoinRoomBtn() {
        // 获取游戏信息
        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;

        if (!curFriendCircle) {
            return;
        }

        let ruleInfo = FriendCircleDataCache.Instance.getCurFriendCircleRule();

        let gameId = ruleInfo.gameId;
        let roomInfo = Global.Instance.DataCache.RoomList.GetRoomByGameID(gameId);
        let userCount = roomInfo[0].MaxCount; // 人数

        this._maxUserCount = userCount;

        if (!this.prefab_memberItem) {
            return;
        }

        // 坐标
        // 三人
        let threePosList = [
        ];
        // 四人
        let fourPosList = [
            {x: -47, y: 80},
            {x: 58 , y: 80},
            {x: -47, y: 10},
            {x: 58 , y: 10}
        ];

        // 五人
        let fivePosList = [
            {x: -53, y: 80},
            {x: 60, y: 80},
            {x: -100, y: 7},
            {x: 5, y: 7},
            {x: 112, y: 7}
        ];

        let posList = fourPosList;

        if (4 == userCount) {
            posList = fourPosList;
        }else if(5 == userCount){
            posList = fivePosList;
        }
        
        // 创建头像Item显示
        for (var idx = 0; idx < userCount; ++idx) {
            let prefab = cc.instantiate(this.prefab_memberItem);
            prefab.setPosition(posList[idx].x,posList[idx].y);
            let comp = prefab.getComponent(ClickJoinRoomItem);

            if (comp) {
                comp.ClickEvent = new Action(this,this.joinRoomHandle);
                this.MemberItemlist.push(comp);
            }
            
            this.node.addChild(prefab);
        }
    }

    /**
     * 清空桌子头像
     */
    public clearTableHead() {
        for (var idx = 0; idx < this.MemberItemlist.length; ++idx) {
            if (this.MemberItemlist[idx]) {
                this.MemberItemlist[idx].node.removeFromParent();
            }
        }

        this.MemberItemlist = [];
    }

    /**
     * 点击加入房间事件
     */
    public joinRoomHandle(bSited) {
        // 点击加入之前应刷新当前空闲桌子状态和数据避免多人点击开桌子
        // 请求房间桌子列表
        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        SendMessage.Instance.QueryGroupTableList(parseInt(curFriendCircle.ID));
        
        /*// 判断该位置是否已经有玩家
        
        if (bSited) {
            return;
        }
*/
        // 判断是否游戏已经开始
        if (this._talbleInfo && this._talbleInfo.status == QL_Common.UserCreateTableNoticeStatus.TableInGameing) {
            Global.Instance.UiManager.ShowTip('游戏已经开始');
            return;
        }

        let ruleInfo = FriendCircleDataCache.Instance.getCurFriendCircleRule();

        if (!ruleInfo || !curFriendCircle) {
            return;
        }

        // 如果房间已存在直接加入房间否则创建房间
        const rule = {
            CheckMoneyNum: 1,
            CurrencyType: 0,
            RoomData: null,
            GroupId: 0,
        };

        rule.CheckMoneyNum = 1;
        rule.CurrencyType = QL_Common.CurrencyType.Diamond;
        let ruleData = {
                GameData: null,
                TableCost: 0
            };

        
        let ruleObj = StrToObject(ruleInfo.ruleStr);

        for(let key in ruleObj){
            ruleObj[key] = eval(ruleObj[key]);
        }

        if (ruleObj["TableCost"]) {
            ruleData.TableCost = ruleObj["TableCost"];
            delete ruleObj["TableCost"];
        }

        ruleData.GameData = ruleObj;
        rule.RoomData = ruleData;
        
        if (!rule) {
            Global.Instance.UiManager.ShowTip("无有效的游戏规则");
            return;
        }
        
        cc.log(rule.RoomData);
        Global.Instance.DataCache.GroupId = parseInt(curFriendCircle.ID);

        if (this._talbleInfo) {
            Global.Instance.GameHost.TryEnterRoom(this._talbleInfo.TableId, QL_Common.EnterRoomMethod.TableID, rule.RoomData, null);
        } else {
            const room = Global.Instance.DataCache.RoomList.GetCreateRoom(ruleInfo.gameId);

            if(!room){
               cc.warn("没有创建房间"); 
           }else{
              Global.Instance.GameHost.TryEnterRoom(room.ID, QL_Common.EnterRoomMethod.RoomID, rule.RoomData, {IsFreeCreate: false});
           }
        }
    }

    /**
     * 刷新桌子显示
     */
    public refreshTableShow(ruleInfo: FriendCircleRule, talble: QL_Common.UserCreateTableInfo){
        if (!talble || !ruleInfo) {
            return;
        }

        cc.info('--- refreshTableShow ',talble);
        this._talbleInfo = talble;

        // 先刷新玩法显示，再刷新玩家头像显示和游戏状态
        this.updateRuleUIShow(ruleInfo);

        // 刷新头像显示
        for (let idx = 0; idx < this.MemberItemlist.length; ++idx) {
            let comp: ClickJoinRoomItem = this.MemberItemlist[idx];

            if (idx <= talble.PlayerCount - 1) {
                comp.playerSit(talble.PlayerHeaders[idx]);
            }else{

                if (talble.status == QL_Common.UserCreateTableNoticeStatus.TableInGameing ) {
                    // 游戏已经开始剩下座位隐藏
                    comp.playerHide();
                }else{
                    comp.playerLeave();
                }
            }
        }

        // 更新桌子状态和人数显示
        if (this.lab_status && !this.isRuleModel) {
            let status = '';
            switch (talble.status) {
                case QL_Common.UserCreateTableNoticeStatus.CreateTable:
                    // 创建桌子
                    status = '准备中';
                    break;
                case QL_Common.UserCreateTableNoticeStatus.TableInGameing:
                    // 指示桌子游戏开始
                    status = '游戏中';
                    break;
                case QL_Common.UserCreateTableNoticeStatus.TableGameOver:
                    // 指示桌子游戏结束
                    status = '游戏结束';
                    break;
                case 3:
                    // 刷新状态数据
                    break;
                default:
                    // code...
                    break;
            }

            // 获取局数
            let round = ruleInfo.ruleDesc.replace(/[^0-9]/ig,"");
            this.lab_status.string = status + '(' + talble.GameNum + '/' + round + ')';
        }
    }

    /**
     * 分享按钮事件
     */
    public btnShareClick() {
        let curRule = FriendCircleDataCache.Instance.getCurFriendCircleRule();
        const share = new ShareParam();
        share.link = ConfigData.SiteConfig.DownloadUrl;
        share.title = curRule.gameName+" 亲友房已开 圈号："+ FriendCircleDataCache.Instance.CurEnterFriendCircle.ID;
        share.text  = '七乐' + curRule.gameName + '：' + curRule.ruleDesc;
        Global.Instance.UiManager.ShowUi(UIName.Share,share);
    }

    /**
     * 变更玩法按钮事件
     */
    public btnModifyClick() {
        // 先判断当前是否有桌子
        let tableList = FriendCircleDataCache.Instance.RoomTableList;

        if (tableList.Count > 0) {
            Global.Instance.UiManager.ShowTip('当前还有玩家在房间');
            return;
        }

        // 创建玩法
        Global.Instance.UiManager.ShowUi(UIName.SelectGame,{act:null,isFriendCircle: true});
    }

    /**
     * 解散房间按钮事件
     */
    public btnDismissRoomClick() {
        if (!this._talbleInfo) return;
        if (this._talbleInfo.status === QL_Common.UserCreateTableNoticeStatus.TableInGameing) {
            Global.Instance.UiManager.ShowTip("游戏已经开始，无法解散");
            return;
        }
        const enter = () => {
            if (!this._talbleInfo) return;
            const msg = new QL_Common_GameMessageCommon.MSG_C_Hall2GamePluginMessage();
            msg.Handle = "TryDeleteRoom";
            msg.TableID = this._talbleInfo.TableId;
            const str = this._talbleInfo.TableId.toString();
            // msg.ServerUuid = parseInt(str[0]);
            Global.Instance.Socket.SendData(msg);
        }

        //GroupId
        if(this._talbleInfo.GroupId>0){
            Global.Instance.UiManager.ShowMsgBox("如果创建房间时消耗了钻石，解散时将返还钻石。\n是否解散该房间？", this, enter);
        }else{
            Global.Instance.UiManager.ShowMsgBox("如果创建房间时消耗了房卡，解散时将返还房卡。\n是否解散该房间？", this, enter);
        }
    }    
}
