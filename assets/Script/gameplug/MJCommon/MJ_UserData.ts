import { QL_Common } from "../../CommonSrc/QL_Common";
import { LoadHeader } from "../../Tools/Function";
import { NativeCtrl } from "../../Native/NativeCtrl";
import ItemListScrollView from '../../Form/Activity/ItemListScrollView';
import Global from '../../Global/Global';
import { LocalStorage } from "../../CustomType/LocalStorage";
import { DateTime } from "../../Serializer/DateTime";
import SendMessage from "../../Global/SendMessage";
import { ChatType } from "../../CustomType/Enum";
const { ccclass, property } = cc._decorator;

@ccclass
export default class MJ_UserData extends cc.Component {
    /**
     * IP
     */
    @property(cc.Node)
    group_userData: cc.Node = null;
    /**
     * IP
     */
    @property(cc.Sprite)
    img_close: cc.Sprite = null;
    /**
     * IP
     */
    @property(cc.Sprite)

    img_face: cc.Sprite = null;
    /**
     * IP
     */
    @property(cc.Label)
    lbl_useridbt: cc.Label = null;

    /**
    * 玩家ID
    */
    @property(cc.Label)
    lbl_userid: cc.Label = null;

    /**
     * 玩家ID
     */
    @property(cc.Label)
    lbl_userAccount: cc.Label = null;

    /**
     * IP
     */
    @property(cc.Label)
    lbl_userip: cc.Label = null;

    /**
     * GPS
     */
    @property(cc.Label)
    lab_GPS: cc.Label = null;

    //男女
    @property(cc.Sprite)
    img_boy: cc.Sprite = null;
    @property(cc.Sprite)
    img_girl: cc.Sprite = null;

    //道具根节点
    @property(cc.Node)
    ItemNode: cc.Node = null;

    //道具资源
    @property([cc.SpriteFrame])
    ItemRes: cc.SpriteFrame[] = [];

    //动画预制体
    @property([cc.Prefab])
    AniRes: cc.Prefab[] = [];

    //道具预制体
    @property(cc.Prefab)
    PlayerItem: cc.Prefab = null;

    private play_item_inteval : number = 2.5; //施放道具间隔(/s)

    private target_chairid : number = -1;

    onLoad() {
        // init logic
    }

    public init(): void {
        this.node.active = false;
        this.img_close.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.node.active = false;
        }, this);
    }

    /**
     * 初始化道具项
     */
    public initItem(player: QL_Common.TablePlayer) {
        if (player && (player.PlayerID == Global.Instance.DataCache.UserInfo.userData.UserID)) { //如果点击的是自己的头像
            let childrenArray = this.ItemNode.children;
            if (childrenArray && childrenArray.length > 0) {
                for (let index = 0; index < childrenArray.length; index++) {
                    if (childrenArray) {
                        childrenArray[index].destroy();
                    }
                }
            }
            return;
        }

        let item_bg = null;
        if (this.ItemNode.childrenCount <= 0) {
            for (let index = 0; index < this.ItemRes.length; index++) {
                item_bg = cc.instantiate(this.PlayerItem);
                if (cc.isValid(item_bg)) {
                    item_bg.on(cc.Node.EventType.TOUCH_START, () => { this.OnUseItem(index, player) }, this);
                    let icon: cc.Node = item_bg.getChildByName("daoju_icon");
                    if (icon) {
                        let sprite = icon.getComponent("cc.Sprite");
                        sprite.spriteFrame = this.ItemRes[index];
                        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                        this.ItemNode.addChild(item_bg);
                    } else {
                        cc.log("没有找到此子节点");
                    }
                } else {
                    cc.log("初始化道具预制体异常");
                    break;
                }
            }
        } else {
            cc.log("预制体无需实例化");
        }
    }

    public InitShow(tableInfo: QL_Common.TablePlayer, pos: any, chair : number) {
        if (!tableInfo || !pos) {
            return;
        }

        if(chair != null){
            this.target_chairid = chair;
        }

        this.init();
        this.showUserData(true, tableInfo, pos.x, pos.y);
    }

    /**
     * 当玩家使用道具时
     */
    public OnUseItem(i, targetPlayer) {
        if(i == null || targetPlayer == null){
            cc.log("参数获取失败, 请检查初始化道具代码");
            return;
        }

        this.playItemAnimation(targetPlayer, i);
    }

    /**
     * 播放道具动画
     */
    public playItemAnimation(targetPlayer: QL_Common.TablePlayer, index : number) {
        if (targetPlayer == null || index == null) {
            cc.log("参数获取失败, 请检查玩家使用道具代码");
            return;
        }

        let current_time = DateTime.Now.TimeStamp / 1000.0;
        let before_play_time = LocalStorage.GetItem(targetPlayer.PlayerID+"_play_time");

        if(before_play_time && parseInt(before_play_time) > 0){
            before_play_time = parseInt(before_play_time)
            if(current_time - before_play_time < this.play_item_inteval){
                LocalStorage.SetItem(targetPlayer.PlayerID+"_play_time", current_time.toString());
                Global.Instance.UiManager.ShowTip("太频繁啦 换个人试试吧!");
                return;
            }
        }
        
        if(this.target_chairid == -1){
            Global.Instance.UiManager.ShowTip("道具发送失败");
            cc.log("被点击人id未获取到!");
        }else{
            SendMessage.Instance.ChartMsg(ChatType.Item, index + "_" + this.target_chairid);
        }

        LocalStorage.SetItem(targetPlayer.PlayerID+"_play_time", current_time.toString());
        this.btnCloseClick();
    }

    public showUserData(IsShowID: boolean, player: QL_Common.TablePlayer, x: number, y: number): void {
        if (null != player) {
            if (IsShowID) {
                this.lbl_useridbt.node.active = true;
                this.lbl_userid.node.active = true;
            }
            else {
                this.lbl_useridbt.node.active = false;
                this.lbl_userid.node.active = false;
            }
            this.lbl_userid.string = player.PlayerID.toString();
            this.lbl_userip.string = `IP:${player.UserIP}`;
            let nickname: string = player.NickName;
            if (player.NickName.length > 6) {
                nickname = player.NickName.substr(0, 6);
            }
            this.lbl_userAccount.string = nickname;

            //this._img_face.source=player.FaceID;
            LoadHeader(player.FaceID, this.img_face);

            // this.group_userData.x = x;
            // this.group_userData.y = y;

            if (this.lab_GPS) {
                this.lab_GPS.string = '';

                for (let idx = 0; idx < player.CAttachData.length; ++idx) {
                    if ('Address' == player.CAttachData[idx].Key) {
                        let address = player.CAttachData[idx].Value;

                        if (address) {
                            this.lab_GPS.string = address;
                        }

                        break;
                    }
                }
            }

            this.node.active = true;

            //显示男女标识
            if (player.Gender == 0) {
                this.img_boy.node.active = true;
                this.img_girl.node.active = false;
            } else if (player.Gender == 1) {
                this.img_boy.node.active = false;
                this.img_girl.node.active = true;
            }

        } else {
            this.node.active = false;
        }

        // 显示定位
        // let map = NativeCtrl.GetGpsJson();
        this.initItem(player);
    }

    public btnCloseClick() {
        this.node.active = false;
    }
}
