import SuperClass from "./SuperClass";
import { EventCode } from "../Global/EventCode";
import SendMessage from "../Global/SendMessage";
import { QL_Common } from "../CommonSrc/QL_Common";
import Global from "../Global/Global";
import { LoadHeader, Debug, IsTest, PlayBgMusic, ParseInviteJson } from "../Tools/Function";
import { UIName } from "../Global/UIName";
import { NativeCtrl } from "../Native/NativeCtrl";
import { ShareParam, ShareParamExpands } from "../CustomType/ShareParam";
import ConfigData from "../Global/ConfigData";
import { AudioType } from "../CustomType/Enum";
import UiManager from "../Manager/UiManager";
import { WebRequest } from "../Net/Open8hb";
import { Action, ActionNet } from "../CustomType/Action";
import { IDictionary } from "../Interface/IDictionary";
import { LocalStorage } from "../CustomType/LocalStorage";
import FormTop from "../Form/General/FormTop";
import RuleItemPool from "../Form/CreateRoom/RuleItemType/RuleItemPool";
import CreateRoomDataCache from "../Form/CreateRoom/CreateRoomDataCache";

import FriendCircleDataCache from "../Form/FriendsCircle/FriendCircleDataCache";
import FriendCircleWebHandle from "../Form/FriendsCircle/FriendCircleWebHandle";
import { ReConnectBase } from "./ReConnectBase";
import { DateTime } from '../Serializer/DateTime';
import RankList from "../Form/Rank/RankList";
import HornPanel from "../Form/Horn/HornPanel";
import HornGamePanel from "../Form/Horn/HornGamePanel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HallCtrl extends ReConnectBase {
    /** 
       大厅广播
     */
    @property(cc.Node)
    node_formTop: cc.Node = null;

    /** 
       大厅广播
     */
    @property(cc.Label)
    hallNews: cc.Label = null;

    /** 
       更多面板
     */
    @property(cc.Layout)
    moreMenu: cc.Layout = null;
    /** 
       实名认证按钮
     */
    @property(cc.Button)
    realName: cc.Button = null;

    /** 
       创建房间按钮游戏名称
     */
    @property(cc.Label)
    lab_gameName: cc.Label = null;

    /**
     * 创建房间按钮麻将动画节点
     */
    @property(cc.Node)
    animate_maj: cc.Node = null;


    /**
     * 创建房间按扑克动画界点
     */
    @property(cc.Node)
    animate_pk: cc.Node = null;
    /**
     * 排行榜content节点
     */
    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.SpriteFrame)
    frame_defaultHead: cc.SpriteFrame = null;

    @property(cc.Node)
    email: cc.Node = null;



    @property(cc.Prefab)
    rankPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    HornNode: cc.Prefab = null;

    /**
     * 当前添加的游戏信息
     */
    private _curGameInfo: QL_Common.GameInfo = null;

    onLoad() {
        super.onLoad();

        /**
         * 预加载资源
         */
        RuleItemPool.Instance.loadPrefab();
        CreateRoomDataCache.Instance.preLoadRuleJson();

        /**
         * 每日弹出活动页面
         */
        this.LoadActivity();
        this.DoShareParamHandle();

        if (HornPanel.HornHallList.length > 0) {
            this.UiManager.ShowHorn(HornPanel.HornHallList[HornPanel.HornHallList.length - 1]);
        }
    }

    start() {
        super.start();
        if (!this.UserInfo.userData) {
            Global.ChangeScene("Login");
            return;
        }

        //播放大厅背景音乐
        PlayBgMusic(cc.url.raw("resources/Sound/bg_hall.mp3"));

        // 刷新创建房间按钮面板显示的游戏名称
        this.refreshCurGameName();

        // LoadHeader(this.UserInfo.userData.Header, this.header); //头像
        this.OnLatestBalance(); //刷新余额
        this.NewEmailInfo();    //刷新邮件显示
        if (!Debug()) {
            // if (!this.UserInfo.userData.TodayIsSign)
            //     this.ShowUi(UIName.SignIn);//获取签到配置
            // if (this.UserInfo.userData.AgentId === 0) {
            //     this.ShowUi(UIName.Daili);
            // }
        }

        this.OnFriendGroup();
        this.circulationGetRank();
        this.ShowGiftPanel();
    }

    /**
     * 弹出赠送钻石 七豆面板
     */
    private ShowGiftPanel() {
        if (this.DataCache.UserInfo.isFirstLogon == 1) {
            this.ShowUi(UIName.GiveGiftPanel);
            this.DataCache.UserInfo.isFirstLogon = 0;
        }
    }

    onDestroy(): void {
        super.onDestroy();
        Global.Instance.AudioManager.StopMusic();
    }

    /**
     * 弹出活动面板
     * author:Cyq
     */
    public LoadActivity() {
        let nowDays = Math.floor(DateTime.Now.TimeStamp / 1000.0 / 24.0 / 3600.0); //获取时间戳总天数

        let CacheTime = LocalStorage.GetItem("ActivityTime"); //用于弹出面板控制变量
        if (!CacheTime) {
            LocalStorage.SetItem("ActivityTime", nowDays.toString());
            this.ShowUi(UIName.Activity);
        } else {
            if (nowDays > parseInt(CacheTime)) {
                LocalStorage.SetItem("ActivityTime", nowDays.toString());
                this.ShowUi(UIName.Activity);
            }
        }
    }

    /**
     * 刷新当前玩的游戏名称
     */
    public refreshCurGameName(gameInfo?: QL_Common.GameInfo): void {
        // 先判断本地存储的游戏名字如果是第一次玩显示"设置玩法"
        let preGameID = LocalStorage.GetItem("PreSelectGame");
        let preGame: QL_Common.GameInfo = this.DataCache.GameList.GetGame(parseInt(preGameID));

        if (!preGameID || !preGame) {
            // 默认显示比鸡
            preGame = this.DataCache.GameList.GetGame(51)
            LocalStorage.SetItem("PreSelectGame", '51');
            this.lab_gameName.string = "快乐比鸡";

            // 显示麻将动画节点
            if (this.animate_maj) {
                this.animate_maj.active = true;
            }

            if (this.animate_pk) {
                this.animate_pk.active = false;
            }

            this._curGameInfo = preGame
        } else {
            this.lab_gameName.string = preGame.GameName;
            this._curGameInfo = preGame;

            if (QL_Common.GameType.Mahjong == preGame.GameType) {
                // 麻将
                if (this.animate_maj) {
                    this.animate_maj.active = true;
                }

                if (this.animate_pk) {
                    this.animate_pk.active = false;
                }
            } else if (QL_Common.GameType.ChessGame == preGame.GameType) {
                if (this.animate_maj) {
                    this.animate_maj.active = false;
                }

                if (this.animate_pk) {
                    this.animate_pk.active = true;
                }
            }
        }

        if (gameInfo) {
            this._curGameInfo = gameInfo;
        }
    }

    public MyRoomClick() {
        this.ShowUi(UIName.MyRoom);
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-07-31
     * @Desc     亲友圈
     */
    private friendCircleClick() {
        /*// 如果只有一个亲友圈则直接进入亲友圈
        if (1 === FriendCircleDataCache.Instance.FriendCircleList.length) {
            let friendCirl = FriendCircleDataCache.Instance.FriendCircleList[0];
            FriendCircleDataCache.Instance.CurEnterFriendCircle = friendCirl;
            this.UiManager.ShowUi(UIName.FriendCircle,friendCirl);
            return;
        }*/

        this.ShowUi(UIName.SelectFriendCircle);
    }

    /**
     * 创建房间
     */
    private createClick() {
        cc.info("--- gameList", this.DataCache.GameList.CityGames);
        let act = new Action(this, this.refreshCurGameName);
        this.ShowUi(UIName.SelectGame, { act: act, isFriendCircle: false });
    }

    /**
     * 点击屏幕任意处
     */
    public clickAnyAreaEvent() {
        // 关闭更多面板
        if (this.moreMenu && this.moreMenu.node.active) {
            this.moreMenu.node.active = false;
        }
    }

    /**
     * 快速创建房间
     */
    private quickCreateRoomClick() {
        cc.log("--- quick Create Room", this._curGameInfo);

        if (!this._curGameInfo) {
            return;
        }

        this.ShowUi(UIName.SelectRule, { gameInfo: this._curGameInfo, isFriendCircle: false });
    }

    /**
     * 加入房间
     */
    private joinClick() {
        this.ShowUi(UIName.JoinRoom, "Hall");

    }

    /**
     * 匹配
     */
    private matchClick() {
        this.ShowUi(UIName.MatchGame);
    }

    /**
     * 代理
     */
    private dailiclick() {
        this.ShowUi(UIName.Daili);
        // if (this.UserInfo.userData.AgentId === 0 && ConfigData.RegionName !== "review") {
        //     this.ShowUi(UIName.Daili);
        //     return;
        // }

        // const str = this.DataCache.SysConfig.GetValue("代理加盟");
        // if (str) {
        //     this.UiManager.ShowMsgBox(str, null, null, null, null, null, null, null, cc.Label.HorizontalAlign.LEFT);
        // } else {
        //     this.UiManager.ShowTip("暂无代理须知，请联系客服！");
        // }

    }


    /**
     * 分享
     */
    // private shareClick() {
    //     const share = new ShareParam();
    //     share.title = ConfigData.SiteConfig.DefaultShareTitle;
    //     share.link = ConfigData.SiteConfig.H5Url;
    //     share.desc = ConfigData.SiteConfig.DefaultShareContext;

    //     share.link_param = new ShareParamExpands();
    //     share.link_param.parent = this.UserInfo.userData.UserID + "";
    //     Global.Instance.WxManager.ShareAndSelectType(share);
    // }


    /**
 * 分享
 */
    private shareGiftClick() {
        // if (this.UserInfo.IsShare === -1) {
        this.ShowUi(UIName.ShareGift);
        //     return;
        // }
        // this.UiManager.ShowTip("你今天已经领取过奖励了，明天再来吧！");
    }

    /**
     * 实名认证
     */
    private authClick() {
        this.ShowUi(UIName.Auth, this.realName.node);

    }

    /**
     * 战绩
     */
    private recordClick() {
        this.ShowUi(UIName.Record);
    }

    /**
     * 玩法
     */
    private gameruleClick() {
        this.ShowUi(UIName.GameRule);
    }

    /**
     * 设置
     */
    private settingClick() {
        this.ShowUi(UIName.Setting);
    }

    /**
     * 邮件
     */
    private emailClick() {
        this.ShowUi(UIName.Email);
    }

    /**
     * 头像
     */
    private headClick() {
        this.ShowUi(UIName.Person);
    }

    /**
     * 礼品
     */
    private giftClick() {
        this.ShowUi(UIName.Gift);

    }

    private kefuClick(e, type: string) {
        this.ShowUi(UIName.Service);
        //this.ShowUi(UIName.Contact);
        // const str = this.DataCache.SysConfig.GetValue("lxkf");
        // if (str) {
        //     let fun = null;
        //     const kfurl = this.DataCache.SysConfig.GetValue("kfurl");
        //     if (kfurl) {
        //         fun = () => {
        //             cc.sys.openURL(kfurl);
        //         }
        //     }
        //     this.UiManager.ShowMsgBox(str, this, fun, null, null, null, null, null, cc.Label.HorizontalAlign.LEFT);
        // } else {
        //     this.UiManager.ShowTip("客服暂时不在，请以后再试吧！");
        // }
    }

    private informClick() {
        this.ShowUi(UIName.Inform);
    }

    /**
     * 商城
     */
    private shopClick() {
        this.ShowUi(UIName.Shop)
        // if (type && type.toLowerCase() === "goldcard") {
        //     this.ShowUi(UIName.Shop, QL_Common.CurrencyType.Gold);
        // } else {
        //     this.ShowUi(UIName.Shop, QL_Common.CurrencyType.Diamond);
        // }
    }

    /**
     * 任务
     */
    private taskClick() {
        this.ShowUi(UIName.Task);
    }

    private luckClick() {
        this.ShowUi(UIName.LuckDraw);
    }

    /**
     * 更多菜单
     */
    private a: boolean = false;
    private moreClick() {
        if (!this.a) {

            if (this.UserInfo.userData.IsAuthentication) {
                this.realName.node.active = false;
                // this.UiManager.ShowTip("你已经实名认证过了，不需要重复认证");
                // return;
            }

            this.moreMenu.node.active = true;
            this.a = true;
        } else {
            this.moreMenu.node.active = false;
            this.a = false;
        }
    }

    /**
     * 排行榜
     */
    private rankingList() {
        this.UiManager.ShowUi(UIName.RankingList);
    }

    private circulationGetRank() {
        cc.log("----刷新排行榜");
        if (!this.content) {
            return;
        }
        this.content.removeAllChildren();
        let callBack = new Action(null, (res) => {
            if (!res) {
                return;
            }
            for (var i = 0; i < res.length; i++) {
                let prefab = cc.instantiate(this.rankPrefab);
                let sprite = prefab.getChildByName("headImg");
                if ("" === res[i]) {
                    sprite.getComponent(cc.Sprite).spriteFrame = this.frame_defaultHead;
                } else {
                    LoadHeader(res[i], sprite.getComponent(cc.Sprite));
                }
                this.content.addChild(prefab);
            }
        });
        RankList.Instance.getTodayRankInfos(callBack);
        setTimeout(this.circulationGetRank.bind(this), 10 * 60 * 1000);
    }

    /**
     * 指南
     */
    private guideClick() {
        this.ShowUi(UIName.Guide)
    }

    /**
     * 退出
     */
    private quitClick() {
        const exit = () => {
            Global.Instance.Socket.Close();
            cc.game.end();
        }
        this.UiManager.ShowMsgBox("你真的要退出吗？", this, exit);
    }

    /**
     * 活动
     */
    private activityClick() {
        this.ShowUi(UIName.Activity);
    }

    /**
     * 游戏内自定义消息到达
     * @param eventCode 
     * @param value 
     */
    protected OnSceneEvent(eventCode: number, value: any): boolean {
        switch (eventCode) {
            //登录成功
            case EventCode.LoginSuccess:
                this.OnLoginSuccess();
                this.UiManager.CloseLoading();
                return true;
            //最新余额信息
            case EventCode.LatestBalance:
                this.OnLatestBalance();
                return true;
            //需要开始创建游戏场景
            case EventCode.CreateGameScene:
                this.CreateGameScene(value);
                return true;
            case EventCode.NewEmailInfo:
                this.NewEmailInfo();
                return true;
            case EventCode.onReplayBack:
                this.onReplayBack();
                return true;
            case EventCode.onNewUri:
                this.onNewUri();
                return true;
            case EventCode.EmailStatus:
                this.NewEmailInfo();
                return true;
            case EventCode.HornHallStart:
                cc.log("长度为：" + HornPanel.HornHallList.length);
                if (HornPanel.HornHallList.length > 0) {
                    this.UiManager.ShowHorn(HornPanel.HornHallList[HornPanel.HornHallList.length - 1]);
                }
                cc.log("大厅跑马灯到达");
                return true;
            default:
                return super.OnSceneEvent(eventCode, value);
        }
        return false;
    }


    private OnLoginSuccess() {
        SendMessage.Instance.QueryUserProp([QL_Common.CurrencyType.Gold, QL_Common.CurrencyType.Diamond]);
    }

    private OnLatestBalance() {
        if (this.node_formTop) {
            let fomTop: FormTop = this.node_formTop.getComponent(FormTop);

            if (fomTop) {
                fomTop.refreshDataShow();
            }
        }
    }

    private CreateGameScene(roomInfo: QL_Common.RoomClient) {
        const game = this.DataCache.GameList.GetGame(roomInfo.GameID);
        if (game) {
            Global.ChangeScene(game.ModuleName, () => {
                Global.Instance.UiManager.CloseUi(UIName.FriendCircle);
                Global.Instance.UiManager.CloseUi(UIName.SelectGame);
                Global.Instance.UiManager.CloseUi(UIName.MatchGame);
                Global.Instance.UiManager.CloseUi(UIName.JoinRoom);
                Global.Instance.UiManager.CloseUi(UIName.InputFormView);
                Global.Instance.UiManager.CloseLoading();
                cc.log("ChangeScene Complete");
                Global.Instance.GameHost.OnGameSceneComplete()
            });
        } else {
            cc.warn("不存在游戏" + roomInfo.ID);
        }
    }

    private NewEmailInfo() {
        this.email.getChildByName("icon").active = this.DataCache.UserInfo.MessageNum > 0;
        // this.EmailNum.string = this.DataCache.UserInfo.MessageNum + "";
    }

    private onReplayBack() {
        // var path = cc.url.raw("resources/Sound/bg_hall.mp3");
        // Global.Instance.AudioManager.Play(path, AudioType.Music, true);
    }


    private onNewUri() {
        // 延迟0.1秒执行
        this.scheduleOnce(() => {
            const data = Global.Instance.DataCache.ShareParam;
            if (!cc.isValid(data)) {
                return;
            }
            const tableid = parseInt(data.tableid);

            if (isNaN(tableid)) {
                cc.log("邀请的tableid不是数字");
                return;
            }
            if (tableid == QL_Common.InvalidValue.InvalidTableID) {
                cc.log("邀请的tableid不是有效的桌号");
                return;
            }

            this.UiManager.ShowUi(UIName.AutoJoinRoom, tableid.toString());
        }, 0.1);
    }

    OnFriendGroup() {
        /**
          * 亲友圈是常驻节点 如果存在则显示亲友圈
         */
        if (0 != Global.Instance.DataCache.GroupId) {
            this.UiManager.ShowUi(UIName.FriendCircle);
            Global.Instance.DataCache.GroupId = 0;
        }
    }
    DoShareParamHandle() {

        try {
            if (ConfigData._isGetedOpenUri) return;
            ConfigData._isGetedOpenUri = true;
            const xianliaoshare = NativeCtrl.GetOpenUri("XianliaoUrlScheme");
            cc.log(`XianliaoUrlScheme = ${xianliaoshare}`);
            if (cc.isValid(xianliaoshare)) {
                let share_param = ParseInviteJson(xianliaoshare);
                this.DataCache.ShareParam = share_param;
                this.EventManager.PostMessage(EventCode.onNewUri);
            }
        }
        catch (err) {

        }

    }
}