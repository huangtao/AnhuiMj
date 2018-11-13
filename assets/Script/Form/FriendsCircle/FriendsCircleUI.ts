import { LoadHeader } from "../../Tools/Function"
import UIBase from "../Base/UIBase";
import UiManager from "../../Manager/UiManager";
import Global from "../../Global/Global";
import { Action, ActionNet } from "../../CustomType/Action";
import { GameCachePool } from "../../Global/GameCachePool";
import { HallNodePools } from "../../Global/HallNodePools";
import { EventCode } from "../../Global/EventCode";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { UIName } from "../../Global/UIName";
import GeneralField from "./generalField/GeneralField";
import FriendCircleWebHandle from "./FriendCircleWebHandle";
import FriendCircleDataCache from "./FriendCircleDataCache";
import { FriendCircleInfo } from "../../CustomType/FriendCircleInfo";
import { StrToObject } from "../../Tools/Function";
import { ShareParam } from "../../CustomType/ShareParam";
import ConfigData from "../../Global/ConfigData";

const { ccclass, property } = cc._decorator;
@ccclass
export default class FriendsCircleUI extends UIBase<any> {
	public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;
    public get isPlayPopAction(): boolean { return false; }

    /**
     * 玩家昵称
     */
    @property(cc.Label)
    lab_nickname: cc.Label = null;

    /**
     * 玩家ID
     */
    @property(cc.Label)
    lab_ID: cc.Label = null;

    /**
     * 玩家头像
     */
    @property(cc.Sprite)
    sp_headImg: cc.Sprite = null;
    
    /**
     * 亲友圈ID
     */
    @property(cc.Label)
    lab_circleID: cc.Label = null;

    /**
     * 亲友圈昵称
     */
    @property(cc.Label)
    lab_circleIName: cc.Label = null;

    /**
     * 亲友公告
     */
    @property(cc.Label)
    lab_notice: cc.Label = null;

    /** 
     * 普通场面板节点
     */
    @property(cc.Node)
    node_general: cc.Node = null;

    /** 
     * 比赛场面板节点
     */
    @property(cc.Node)
    node_match: cc.Node = null;

    /**
     * 我的战绩分数
     */
    @property(cc.Label)
    lab_recordScore: cc.Label = null;

    /**
     * 亲友圈信息
     */
    private circleInfo: FriendCircleInfo = null;


    public onLoad(){
        
    }

    public InitShow() {
        super.InitShow(); 
    }

    public OnShow(){
        super.OnShow(); 
        
        // 初始化数据
        if (this.ShowParam) {
            this.circleInfo = this.ShowParam;
        }else if(FriendCircleDataCache.Instance.CurEnterFriendCircle){
            this.circleInfo = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        }else{
            return;
        }

        // 默认显示普通场面板
        this.node_general.active = true;
        this.node_match.active = false;

        let generalCommponet = <GeneralField>this.node_general.getComponent("GeneralField");
        let isCircleOwner = FriendCircleDataCache.Instance.selfIsCircleOwner();
        generalCommponet.initData(this.circleInfo,isCircleOwner);

        // 显示亲友圈信息
        this.lab_circleID.string = '圈号：' + this.circleInfo.ID;

        if (this.lab_circleID) {
            this.lab_circleIName.string = this.circleInfo.name;
        }

        // 显示玩家头像、ID
        let userInfo = this.DataCache.UserInfo.userData;

        if (this.lab_ID) {
            this.lab_ID.string = String(userInfo.UserID);
        }
        
        //头像
        if (this.sp_headImg) {
            LoadHeader(userInfo.Header, this.sp_headImg); 
        }

        //昵称
        if (this.lab_nickname) {
            this.lab_nickname.string = userInfo.NickName;
        }

        //公告
        if (this.lab_notice) {
            if ('' == this.circleInfo.notice) {
                this.lab_notice.string = '这个圈主很懒，什么都没有留下~';
            }else{
                this.lab_notice.string = this.circleInfo.notice;
            }
        }

        // 注册修改亲友圈消息监听回调
        let modifyAct = new Action(this,this.modifyNickNoticHandle);
        FriendCircleWebHandle.setModifyFriendCirleInfoHandle(modifyAct);

        // 注册获取亲友圈列表消息回调
        let friendCircleListAct = new Action(this,this.updateFriendInfoShow);
        FriendCircleWebHandle.setFriendCircleListHandle(friendCircleListAct);
    }

    /**
     * 更新亲友圈信息显示
     */
    public updateFriendInfoShow(){
        let friendInfo = FriendCircleDataCache.Instance.CurEnterFriendCircle;

        // 判断是否还在亲友圈内是否已经被踢出房间
        let isExit = FriendCircleDataCache.Instance.isFriendCircleMember(friendInfo.ID + '');

        if (!isExit) {
            this.UiManager.ShowTip('您已不在该亲友圈!');
            this.CloseClick();
            return;
        }

        // 更新亲友圈昵称、公告
        if (friendInfo.name && this.lab_circleIName) {
            this.lab_circleIName.string = friendInfo.name;
        }

        if (friendInfo.notice && this.lab_notice) {
            this.lab_notice.string = friendInfo.notice;
        }
    }

    /**
     * 
     * @param eventCode 消息到达分发到各个模块
     * @param value 
     */
    protected OnUiEventComeIn(eventCode: number, value: any): boolean {
        try {
            /**
             * @Author   WangHao
             * @DateTime 2018-08-08
             * @Desc     房间列表消息
             */
            if (eventCode == EventCode.GroupTableList) {
                cc.log("----- GroupTableList :",value);
                let generalCommponet: GeneralField = this.node_general.getComponent("GeneralField");

                if (generalCommponet) {
                    generalCommponet.OnMessageComeIn(value);
                }
                return true;
            }
        }
        catch (e) {

        }
        return false;
    } 

    /**
     * @Author   WangHao
     * @DateTime 2018-08-03
     * @Desc     成员管理
     */
    public memberBtnEventHandle(){
        this.UiManager.ShowUi(UIName.FriendCircleMember);
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-03
     * @Desc     分享
     */
    public shareBtnEventHandle(){
        if (!this.circleInfo) {
            return;
        }
        const share = new ShareParam();
        share.link = ConfigData.SiteConfig.DownloadUrl;
        share.title = "七乐亲友圈ID:"+this.circleInfo.ID;
        share.text  = "快乐时光，亲友分享。快来和我一起抢钻石、红包，还有实物大奖，亲友比赛，精彩无限，期待您的加入！";
        this.UiManager.ShowUi(UIName.Share,share);
    }

    /**
     * 公告昵称修改回调
     */
    public modifyNickNoticHandle(info: any) {
        this.UiManager.ShowTip('修改成功！');
        this.updateFriendInfoShow();
        // 刷新亲友圈数据
        FriendCircleWebHandle.requestFriendCircleList();
    }

    /**
     * 战绩按钮事件
     */
    public btnRecordClick(){
        Global.Instance.UiManager.ShowUi(UIName.FriendCircleRecord);
    }

    /**
     * 获取亲友圈列表回调
     */
    public getFriendCircleListHandle(info: any) {
        this.updateFriendInfoShow();
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-03
     * @Desc     消息
     */
    public messageBtnEventHandle(){
        this.UiManager.ShowUi(UIName.FriendCircleMessage);
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-03
     * @Desc     管理
     */
    public manageBtnEventHandle(){
        let name = UIName.FriendCircleManage;
        let isAddmin = FriendCircleDataCache.Instance.selfIsAdministrator();
        // 非管理员不显示成员的管理界面
        if (!isAddmin) {
            name = UIName.FriendCirclePersonInfo;
        }

        this.UiManager.ShowUi(name);
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-03
     * @Desc     普通场
     */
    public generalFieldBtnEventHandle(){
        
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-03
     * @Desc     比赛场
     */
    public matchFieldtnEventHandle(){
        this.UiManager.ShowTip('敬请期待');
    }

    /**
     * 自由创建
     */
    public autoJoinEventHandle(){
        // 判断该位置是否已经有玩家
        let ruleInfo = FriendCircleDataCache.Instance.getCurFriendCircleRule();

        if (!ruleInfo) {
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
        
        const room = Global.Instance.DataCache.RoomList.GetCreateRoom(ruleInfo.gameId);
        cc.log(rule.RoomData);

        if (room) {
            let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
            
            if (!curFriendCircle) {
                return;
            }

            Global.Instance.DataCache.GroupId = parseInt(curFriendCircle.ID);
            Global.Instance.GameHost.TryEnterRoom(room.ID, QL_Common.EnterRoomMethod.RoomID, rule.RoomData, {IsFreeCreate: true});
        } else {

        cc.warn("没有创建房间");
        }
    }

    /**
     * 关闭按钮事件
     */
    public CloseClick(){
        Global.Instance.DataCache.GroupId = 0;
        super.CloseClick();
    }
}
