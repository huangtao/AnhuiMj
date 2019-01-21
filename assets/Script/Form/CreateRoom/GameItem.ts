import { QL_Common } from "../../CommonSrc/QL_Common"
import { UIName } from "../../Global/UIName";
import { LocalStorage } from "../../CustomType/LocalStorage";
import Global from "../../Global/Global";
import { Action } from "../../CustomType/Action";
import FriendCircleDataCache from "../FriendsCircle/FriendCircleDataCache";
import { FriendCircleRule } from "../../CustomType/FriendCircleInfo";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameItem extends cc.Component {
	/**
	 * 游戏名称
	 */
    @property(cc.Label)
    lab_gameName: cc.Label = null;

    /**
	 * 游戏描述
	 */
    @property(cc.Label)
    lab_gameDesc: cc.Label = null;

    /**
	 * 游戏状态(维护、限免、免费...)
	 */
    @property(cc.Sprite)
    sp_gameState: cc.Sprite = null;

    /**
	 * 已添加提示文字
	 */
    @property(cc.Button)
    btn_add: cc.Button = null;
    /**
     * 失效状态面板
     */
    @property(cc.SpriteFrame)
    disabledPanel: cc.SpriteFrame = null;

    /**
     * 游戏角标
     */
    @property([cc.SpriteFrame])
    icon: cc.SpriteFrame[] = [];

    // 是否是亲友圈进来的
    public friendCircle: any = null;

    // 是否是添加玩法
    public isAddRule: boolean = false;

    // 回调
    public action: Action = null;

    // 游戏信息
    private _gameInfo: QL_Common.GameInfo;

    public get GameInfo(): QL_Common.GameInfo {
        return this._gameInfo;
    }

    /**
     * 初始化界面显示
     */
    public initUI(gameInfo: QL_Common.GameInfo): void {
        if (!gameInfo) {
            return;
        }

        this.lab_gameDesc.string = gameInfo.GameDesc;
        this._gameInfo = gameInfo;
        this.lab_gameName.string = gameInfo.GameName;

        // 初始化状态
        if (this.btn_add) {
            this.btn_add.node.active = true;

            // 从亲友圈进来的隐藏添加按钮
            if (this.friendCircle) {
                this.btn_add.node.active = false;
            }
        }

        let localGame = LocalStorage.GetItem("PreSelectGame");
        let info = Global.Instance.DataCache.GameList.GetGame(parseInt(localGame));

        if (info) {
            if (gameInfo.GameID == info.GameID) {
                this.updateAddStatusShow(true);
                //更新大厅创建房间界面显示
                if (this.action) {
                    this.action.Run([this]);
                }
            } else {
                this.updateAddStatusShow(false);
            }
        }

        this.showGameStatus();
    }

    /**
     * 游戏状态显示
     */
    private showGameStatus(): void {
        let iconList: Array<string> = [
            "tag_1.png", // 火爆
            "tag_4.png", // 维护中
            "tag_2.png", // 免费
            "tag_3.png", // 内测
            "tag_5.png", // 限免
            "tag_6.png", // 热门
            "tag_7.png", // 新
        ];

        switch (this._gameInfo.GameStatus) {
            case QL_Common.GameState.Normal:
                break;
            case QL_Common.GameState.ShowCannotJoin:
                {
                    //面板切换为灰色
                    this.node.getComponent(cc.Sprite).spriteFrame = this.disabledPanel;
                    //游戏名字字体颜色
                    this.lab_gameName.node.color = cc.hexToColor("#FFFFFF");
                    //游戏名字描边样式
                    this.lab_gameName.node.getComponent(cc.LabelOutline).color = cc.hexToColor("#545454");
                    //logo隐藏
                    this.sp_gameState.node.active = false;
                    // 隐藏添加按钮
                    if (this.btn_add) {
                        this.btn_add.node.active = false;
                    }
                }
                break;
            case QL_Common.GameState.Hide:
                break;
            default:
                break;
        }

        let sp = this.sp_gameState.getComponent("cc.Sprite")
        if (!sp) {
            return;
        }

        let index = this._gameInfo.GameLabel - 1;

        switch (this._gameInfo.GameLabel) {
            case QL_Common.GameLabelType.None:
            cc.log("进来了");
                break;
            default:
            cc.log("进来了2");
                sp.spriteFrame = this.icon[index];
                break;
        }
    }

    /**
     * 添加游戏到大厅创建房间面板中显示
     */
    public addGameToHall(): void {
        // 更新本地记录
        LocalStorage.SetItem("PreSelectGame", this.GameInfo.GameID.toString());
        this.updateAddStatusShow(true);

        //更新大厅创建房间界面显示
        if (this.action) {
            this.action.Run([this]);
        }
    }

    /**
     * 更新是否添加状态 
     */
    public updateAddStatusShow(isAdded: boolean) {
        let path = "createRoom/cjfj_74.png";

        if (isAdded) {
            path = "createRoom/cjfj_75.png";
        }

        // 更新按钮显示状态为已添加
        if (this.btn_add) {
            let sprite = this.btn_add.getComponent(cc.Sprite);
            let button = this.btn_add.getComponent(cc.Button);

            if (isAdded) {
                button.enabled = false;
            } else {
                button.enabled = true;
            }

            cc.loader.loadRes(path, (err, texture) => {
                if (err) {
                    cc.info(err);
                    return;
                }

                sprite.spriteFrame = new cc.SpriteFrame(texture);
            });
        }
    }
    /**
     * 进入游戏规则选择面板
     */
    public enterSelectRuleUI(): void {
        if (this._gameInfo && QL_Common.GameState.ShowCannotJoin == this._gameInfo.GameStatus) {
            Global.Instance.UiManager.ShowTip("此玩法暂未开放...");
            return;
        }

        if (this.friendCircle) {
            // 一款游戏只能创建一个玩法
           let friendInfo = FriendCircleDataCache.Instance.CurEnterFriendCircle;

           if (!friendInfo) {
               return;
           }

           let ruleList = FriendCircleDataCache.Instance.FriendCircleRuleList.GetValue(friendInfo.ID + "");

           if (ruleList) {
              for (var idx = 0; idx < ruleList.length; ++idx) {
                let rule: FriendCircleRule = ruleList[idx];
    
                if (rule && rule.gameId == this._gameInfo.GameID) {
                    // 修改玩法
                    if (!this.friendCircle.isAddRule) {
                        let curRule = FriendCircleDataCache.Instance.CurSelectedRule;

                        if (curRule && curRule.gameId != this._gameInfo.GameID) {
                            Global.Instance.UiManager.ShowTip("该游戏已经被创建请勿创建相同的游戏玩法");
                            return;
                        }
                    } else {
                        Global.Instance.UiManager.ShowTip("该游戏已经被创建请勿创建相同的游戏玩法");
                        return;
                    }
                }
            } 
           }
        }

        Global.Instance.UiManager.ShowUi(UIName.SelectRule, { gameInfo: this._gameInfo, friendCircle: this.friendCircle });
    }
}
