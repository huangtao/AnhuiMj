import { WebRequest } from "../../../Net/Open8hb";
import { IDictionary } from "../../../Interface/IDictionary";
import UIBase from "../../Base/UIBase";
import UiManager from "../../../Manager/UiManager";
import Global from "../../../Global/Global";
import { Action, ActionNet } from "../../../CustomType/Action";
import { HallNodePools } from "../../../Global/HallNodePools";
import { EventCode } from "../../../Global/EventCode";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { UIName } from "../../../Global/UIName";
import FriendCircleWebHandle from "../FriendCircleWebHandle";
import FriendCircleDataCache from "../FriendCircleDataCache";
import RoomRuleItem from "./RoomRuleItem";
import Dictionary from "../../../CustomType/Dictionary";
import { FriendCircleInfo } from "../../../CustomType/FriendCircleInfo";
import SendMessage from "../../../Global/SendMessage";
import { PlayEffect } from "../../../Tools/Function";


const { ccclass, property } = cc._decorator;

/******************************** 普通场 ******************************/

@ccclass
export default class GeneralField extends cc.Component {
    /**
     * 创建玩法按钮
     */
    @property(cc.Button)
    createRuleBtn: cc.Button = null;

    /**
     * 刷新按钮
     */
    @property(cc.Button)
    refreshBtn: cc.Button = null;

    /**
     * 列表项
     */
    @property(cc.Node)
    roomRuleModel: cc.Node = null;

    /**
     * 房间桌子预制体
     */
    @property(cc.Prefab)
    prefab_tableItem: cc.Prefab = null;

    /**
     * 桌子列表容器Layout
     */
    @property(cc.Layout)
    layout_tableList: cc.Layout = null;

    /**
     * 提示没有玩法
     */
    @property(cc.Label)
    lab_noRuleTip: cc.Label = null;

    /**
     * 是否正在请求
     */
    private _isRequesting = false;

    /**
     * 桌子节点列表
     */
    private _roomTableList: Dictionary<string,RoomRuleItem> = null;
    
    private get RoomTableList(): Dictionary<string,RoomRuleItem>{
        if (!this._roomTableList) {
            this._roomTableList = new Dictionary<string,RoomRuleItem>();
        }

        return this._roomTableList;
    }

    // 亲友圈ID
    private circleInfo: FriendCircleInfo;

    /**
     * 是否是圈主
     */
    private _isCircleOwner: boolean = false;

    public onLoad(){
     console.log("onLoad");
    }

    public start(){
        
    }

    /**
     * 初始化数据
     */
    public initData(circleInfo: FriendCircleInfo,isCircleOwner: boolean){
        this._isRequesting = false;
        this.circleInfo = circleInfo;
        this._isCircleOwner = isCircleOwner;

        // 设置初始状态
        if (this.lab_noRuleTip) {
            this.lab_noRuleTip.node.active = false;
        }

        if (this.createRuleBtn) {
            this.createRuleBtn.node.active = false;
        }

        if (this.roomRuleModel) {
            this.roomRuleModel.active = false;
        }

        this.btnRefreshClick();

        /**
         * 设置添加玩法监听
         */
        let act: Action = new Action(this,this.addRuleHandle);
        FriendCircleWebHandle.setAddRuleHandle(act);
    }

    /**
     * 请求亲友圈玩法
     */
    public requestFriendCircRuleList(cb?: Action){
        // 请求亲友圈玩法信息
        var that = this;
        let _callback = cb;
        let action = new Action(this,(args)=>{
            console.log(args.args);
            if (_callback) {
                _callback.Run([args])
            };

            if ("success" != args.args.status) {
                Global.Instance.UiManager.ShowTip("获取亲友圈玩法信息失败!")
                return;
            }else{
                that.refreshRuleUIShow();
            }
        });

        if (this.circleInfo) {
            FriendCircleWebHandle.requestFriendCircRuleList(this.circleInfo.ID,action);
        }
    }

    /** 
     * 刷新玩法显示
     */
    public refreshRuleUIShow(){
        let ruleInfo = FriendCircleDataCache.Instance.getCurFriendCircleRule();

        if (!ruleInfo ) {
            let isAddmin = FriendCircleDataCache.Instance.selfIsAdministrator();
            // 没有玩法如果是管理员,显示创建玩法按钮
            if (isAddmin) {
                this.createRuleBtn.node.active = true;
            }else{
                this.lab_noRuleTip.node.active = true;
                this.createRuleBtn.node.active = false;
            }

            this.roomRuleModel.active = false;
        }else{
            this.lab_noRuleTip.node.active = false;
            this.createRuleBtn.node.active = false;
            this.roomRuleModel.active = true;

            let roomModel = <RoomRuleItem>this.roomRuleModel.getComponent("RoomRuleItem");
            roomModel.initData();
            roomModel.updateRuleUIShow(ruleInfo);
        }
    }

    /**
     * 创建游戏规则桌子
     */
    public createGameRue() {
        Global.Instance.UiManager.ShowUi(UIName.SelectGame,{act:null,isFriendCircle: true});
    }

    /**
     * 更新桌子列表显示
     */
    private refreshRoomTableList() {
        if (!this.prefab_tableItem || !this.layout_tableList) {
            return;
        }

        let keys = this.RoomTableList.Keys;

        // 先清空当前桌子列表显示
        for (let index = 0; index < this.RoomTableList.Count; ++index) {
            let info = this.RoomTableList.GetValue(keys[index]);
 
            if (info && info.node) {
                this.layout_tableList.node.removeChild(info.node);
            }
        }

        // 清空模板显示
        let roomRuleModel: RoomRuleItem = this.roomRuleModel.getComponent(RoomRuleItem);

        if (roomRuleModel) {
            roomRuleModel.setTableInfo(null);
        }
 
        this.RoomTableList.Clear();

        // 重新创建桌子列表
        let roomTableList = FriendCircleDataCache.Instance.RoomTableList;
 
        if (0 == roomTableList.Count) {
            return;
        }

        let ruleInfo = FriendCircleDataCache.Instance.getCurFriendCircleRule();

        // 获取游戏信息
        let roomInfo = Global.Instance.DataCache.RoomList.GetRoomByGameID(ruleInfo.gameId);
        let maxCount = roomInfo[0].MaxCount; // 人数

        keys = roomTableList.Keys;
        // 创建新桌子
        for (let idx = 0; idx < roomTableList.Count; ++idx) {
            let talbleInfo: QL_Common.UserCreateTableInfo = roomTableList.GetValue(keys[idx]);

            // 游戏未已开始、或人数满了在准备中的桌子 并且不是自由创建的桌子
            if (!roomRuleModel.getTableInfo() 
                && (QL_Common.UserCreateTableNoticeStatus.CreateTable == talbleInfo.status
                 && talbleInfo.PlayerCount < maxCount) && !talbleInfo.IsFreeCreate && !talbleInfo.IsFullUsered) {
                // 模板刷新 
                if (this.roomRuleModel) {                    
                    if (talbleInfo.status == QL_Common.UserCreateTableNoticeStatus.CreateTable) {
                        roomRuleModel.refreshTableShow(ruleInfo,talbleInfo);
                    }
                }
            }else if(talbleInfo.status != QL_Common.UserCreateTableNoticeStatus.TableGameOver){
                // 创建桌子
                let prefab = cc.instantiate(this.prefab_tableItem);
                let comp: RoomRuleItem = prefab.getComponent(RoomRuleItem);
    
                if (comp) {
                    comp.initData();
                    comp.refreshTableShow(ruleInfo,talbleInfo);
                    this.RoomTableList.AddOrUpdate(talbleInfo.TableId.toString(),comp);
                    this.layout_tableList.node.addChild(prefab);
                }  
            }

        }
    }

    /**
     * 添加规则消息回调
     */
    public addRuleHandle() {
        // 关闭界面
        Global.Instance.UiManager.CloseUi(UIName.SelectRule);
        Global.Instance.UiManager.CloseUi(UIName.SelectGame);

        // 创建规则成功 刷新玩法列表
        this.requestFriendCircRuleList();
    }
    /**
     * 刷新按钮事件
     */
    public btnRefreshClick(){
        if (this._isRequesting) {
            Global.Instance.UiManager.ShowTip('您的请求操作过于频繁!请稍后再试');
            return;
        }

        this._isRequesting = true;

        // 请求玩法列表
        this.requestFriendCircRuleList(new Action(this,(res)=>{
            // 请求房间桌子列表
            SendMessage.Instance.QueryGroupTableList(parseInt(this.circleInfo.ID));

            // 请求亲友圈信息
            FriendCircleWebHandle.requestFriendCircleList();
        }));

        PlayEffect(cc.url.raw("resources/Sound/close_panel.mp3"));
    }

    /**
     * 消息回调
     */
    public OnMessageComeIn(cm: any){
        let g = cm as QL_Common.MSG_S_GroupTableList;
        this._isRequesting = false;

        if (!g) return;
        if (this.circleInfo.ID != g.GroupId.toString()) {
            // 操作的房间列表不是当前选中的群组，直接返回
            return;
        }

        FriendCircleDataCache.Instance.addOrUpdateRoomTableList(g.Data);

        // 刷新桌子列表显示
        this.refreshRoomTableList();
    }
}
