import Global from "../../../Global/Global";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { UIName } from "../../../Global/UIName";
import FriendCircleDataCache from "../FriendCircleDataCache";
import { QL_Common_GameMessageCommon } from "../../../CommonSrc/QL_Common_GameMessageCommon";
import { FriendCircleRule } from "../../../CustomType/FriendCircleInfo";
import { StrToObject, LoadHeader } from "../../../Tools/Function";
import { ShareParam } from "../../../CustomType/ShareParam";
import ConfigData from "../../../Global/ConfigData";
import SendMessage from "../../../Global/SendMessage";
import FriendCircleWebHandle from "../FriendCircleWebHandle";
import { Action } from "../../../CustomType/Action";

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
    lab_gameStatus: cc.Label = null;

    /**
    * 当前局数
    */
    @property(cc.Label)
    lab_gameRound: cc.Label = null;

    /**
    * 游戏名称
    */
    @property(cc.Label)
    lab_gameName: cc.Label = null;

    /**
     * 游戏logo
     */
    @property(cc.Sprite)
    sp_gameIcon: cc.Sprite = null;

    /**
     * 坐下按钮图标
     */
    @property(cc.Sprite)
    sp_sitDown: cc.Sprite = null;

    /**
     * 玩家头像列表
     */
    @property([cc.Sprite])
    playerHeadImgList: cc.Sprite[] = [];

    /**
     * 玩家头像节点列表
     */
    @property([cc.Node])
    playerHeadNoList: cc.Node[] = [];

    /**
     * 玩家头像节点列表
     */
    @property([cc.SpriteFrame])
    frame_gameIconList: cc.SpriteFrame[] = [];

    /**
     * 是否是规则模板(0 不是，1 是)
     */
    isRuleModel: boolean = false;

    /**
     * 桌子最大玩家数
     */
    private _maxUserCount = 4;

    /**
     * 桌子信息
     */
    private _talbleInfo: QL_Common.UserCreateTableInfo = null;

    public getTableInfo(): QL_Common.UserCreateTableInfo {
        return this._talbleInfo;
    }

    public setTableInfo(tableInfo: QL_Common.UserCreateTableInfo) {
        this._talbleInfo = tableInfo;
    }

    public initData() {
        this.clearTableHead();

        // 初始化默认显示
        // 隐藏游戏图标
        this.sp_gameIcon.node.active = false;

        // 隐藏游戏状态
        this.lab_gameStatus.node.active = false;

        // 隐藏游戏进行的进度局数
        this.lab_gameStatus.node.active = false;

        // 隐藏坐下按钮图标
        this.sp_sitDown.node.active = false;

        // 分享按钮
        this.btn_share.node.active = false;

        // 解散按钮
        this.btn_dissolve.node.active = false;

        //游戏图标
        this.sp_gameIcon.node.active = false;

        // 游戏名称
        this.lab_gameName.node.active = false;

        // 局数显示
        this.lab_gameRound.node.active = false;
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-08
     * @Desc     更新玩法信息数据显示
     * @param    {any}      data [description]
     */
    public updateRuleUIShow(data: any) {
        if (!data) {
            return;
        }


    }

    /**
     * 清空桌子头像
     */
    public clearTableHead() {
        for (var idx = 0; idx < this.playerHeadNoList.length; ++idx) {
            if (this.playerHeadNoList[idx]) {
                this.playerHeadNoList[idx].active = false;
            }
        }
    }

    /**
     * 点击加入房间事件
     */
    public joinRoomHandle(bSited) {
        // 点击加入之前应刷新当前空闲桌子状态和数据避免多人点击开桌子
        // 请求房间桌子列表
        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        let ruleInfo = FriendCircleDataCache.Instance.CurSelectedRule;
        let userId = Global.Instance.DataCache.UserInfo.userData.UserID;
        
        SendMessage.Instance.QueryGroupTableList(parseInt(curFriendCircle.ID), ruleInfo.Id);

        // 判断是否游戏已经开始
        if (this._talbleInfo && this._talbleInfo.status == QL_Common.UserCreateTableNoticeStatus.TableInGameing) {
            Global.Instance.UiManager.ShowTip('游戏已经开始');
            return;
        }

        if (!ruleInfo || !curFriendCircle) {
            return;
        }

        let enterTalbe = function () {
            // 如果房间已存在直接加入房间否则创建房间
            const rule = {
                CheckMoneyNum: 1,
                CurrencyType: 0,
                RoomData: null,
                GroupId: 0,
                RuleId: 0,
            };

            rule.CheckMoneyNum = 1;
            rule.CurrencyType = QL_Common.CurrencyType.Diamond;
            let ruleData = {
                GameData: null,
                TableCost: 0
            };


            let ruleObj = StrToObject(ruleInfo.ruleStr);

            for (let key in ruleObj) {
                ruleObj[key] = eval(ruleObj[key]);
            }

            if (ruleObj["TableCost"]) {
                ruleData.TableCost = ruleObj["TableCost"];
                delete ruleObj["TableCost"];
            }

            ruleData.GameData = ruleObj;
            rule.RoomData = ruleData;
            rule.RuleId = ruleInfo.Id;

            if (!rule) {
                Global.Instance.UiManager.ShowTip("无有效的游戏规则");
                return;
            }

            cc.log(rule.RoomData);
            Global.Instance.DataCache.GroupId = parseInt(curFriendCircle.ID);

            if (this._talbleInfo) {
                Global.Instance.UiManager.ShowLoading("正在进入房间...");
                Global.Instance.GameHost.TryEnterRoom(this._talbleInfo.TableId, QL_Common.EnterRoomMethod.TableID, rule.RoomData, null);
            } else {
                const room = Global.Instance.DataCache.RoomList.GetCreateRoom(ruleInfo.gameId);

                if (!room) {
                    cc.warn("没有创建房间");
                } else {
                    Global.Instance.GameHost.TryEnterRoom(room.ID, QL_Common.EnterRoomMethod.RoomID, rule, { IsFreeCreate: false });
                }
            }
        }.bind(this)

        Global.Instance.UiManager.ShowLoading("正在请求数据...");
        // 判断是否玩家被禁玩
        FriendCircleWebHandle.GroupUserGameBan(parseInt(curFriendCircle.ID), 2, 0, ruleInfo.gameId, "Q", userId, new Action(this, (res) => {
            if ("success" != res.status) {
                Global.Instance.UiManager.CloseLoading();
                Global.Instance.UiManager.ShowTip("请求数据失败!");
                return;
            }

            if (res.isBan) {
                Global.Instance.UiManager.ShowTip("您没有权限进入该玩法,请联系圈主!");
                return;
            }

            enterTalbe();
        }));
    }

    /**
     * 刷新桌子显示
     */
    public refreshTableShow(ruleInfo: FriendCircleRule, table: QL_Common.UserCreateTableInfo) {
        if (!ruleInfo) {
            return;
        }

        // 先刷新玩法显示，再刷新玩家头像显示和游戏状态
        // this.updateRuleUIShow(ruleInfo);
        let isAdmin = FriendCircleDataCache.Instance.selfIsAdministrator();
        let gameInfo = Global.Instance.DataCache.GameList.GetGame(ruleInfo.gameId);

        // 游戏名称显示
        if (ruleInfo) {
            this.lab_gameName.string = ruleInfo.gameName;
        }

        this.lab_gameName.node.active = true;
        // 只有模板才有分享和解散按钮
        if (this.isRuleModel) {
            this.sp_sitDown.node.active = true;

            if (isAdmin) {
                this.btn_share.node.active = true;
            }
        } else {
            // 游戏图标
            this.sp_gameIcon.node.active = true;

            if (gameInfo) {
                this.sp_gameIcon.spriteFrame = this.frame_gameIconList[gameInfo.GameType];
            }
        }

        if (!table) {
            return;
        }

        cc.log('--- refreshTableShow ', table);
        this._talbleInfo = table;

        // 刷新头像显示
        for (let idx = 0; idx < this.playerHeadImgList.length; ++idx) {
            let spHead = this.playerHeadImgList[idx];
            let nodeHead = this.playerHeadNoList[idx];
            nodeHead.active = true;
            if (idx <= table.PlayerCount - 1) {
                LoadHeader(table.PlayerHeaders[idx], spHead);
            } else {
                nodeHead.removeFromParent();
            }
        }

        // 获取游戏信息
        let roomList: QL_Common.RoomClient[] = Global.Instance.DataCache.RoomList.GetRoomByGameID(ruleInfo.gameId);
        let maxUserCount = 0;

        if (roomList && roomList[0]) {
            maxUserCount = roomList[0].MaxCount;
        }

        // 更新桌子状态和人数显示
        if (!this.isRuleModel) {
            let status = '';
            switch (table.status) {
                case QL_Common.UserCreateTableNoticeStatus.CreateTable:
                    {
                        // 创建桌子
                        status = '准备中';
                        this.lab_gameStatus.node.active = true;

                        // 显示"几缺几"
                        if (maxUserCount > 0) {
                            this.lab_gameStatus.string = "\n" + maxUserCount + "缺" + (maxUserCount - table.PlayerCount);
                        }

                        if (isAdmin) {
                            this.btn_dissolve.node.active = true;
                            this.lab_gameName.node.active = false;
                        }
                    }
                    break;
                case QL_Common.UserCreateTableNoticeStatus.TableInGameing:
                    {
                        // 指示桌子游戏开始
                        status = '游戏中';
                        this.lab_gameRound.node.active = true;
                        this.lab_gameStatus.node.active = true;
                        // 获取局数进度
                        let round = ruleInfo.ruleDesc.replace(/[^0-9]/ig, "");
                        this.lab_gameRound.string = '(' + table.GameNum + '/' + round + '局)';
                        this.lab_gameStatus.string = '游戏中';
                    }
                    break;
                case QL_Common.UserCreateTableNoticeStatus.TableGameOver:
                    {
                        this.lab_gameStatus.node.active = true;
                    }
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
        }
    }

    /**
     * 分享按钮事件
     */
    public btnShareClick() {
        let curRule = FriendCircleDataCache.Instance.CurSelectedRule;
        let gameName = curRule.gameName;

        if (51 == curRule.gameId) {
            gameName = "快乐BiJi";
        }

        if (76 == curRule.gameId) {
            gameName = "快乐PinShi";
        }

        const share = new ShareParam();
        share.link = ConfigData.SiteConfig.DownloadUrl;
        share.title = gameName + " 亲友房已开 圈号：" + FriendCircleDataCache.Instance.CurEnterFriendCircle.ID;
        share.text = '七乐' + gameName + '：' + curRule.ruleDesc;


        Global.Instance.UiManager.ShowUi(UIName.Share, share);
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
        if (this._talbleInfo.GroupId > 0) {
            Global.Instance.UiManager.ShowMsgBox("如果创建房间时消耗了钻石，解散时将返还钻石。\n是否解散该房间？", this, enter);
        } else {
            Global.Instance.UiManager.ShowMsgBox("如果创建房间时消耗了房卡，解散时将返还房卡。\n是否解散该房间？", this, enter);
        }
    }
}
