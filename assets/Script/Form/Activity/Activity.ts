import UIBase from "../Base/UIBase";
import ItemListScrollView from "./ItemListScrollView";
import { Action } from "../../CustomType/Action";
import { UIName } from "../../Global/UIName";
import TurntablePanel from "../Turntable/TurntablePanel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    /**
     * 存放已经实例化的预制体
     */
    public turntable = null;

    @property(cc.Layout)
    layout: cc.Layout = null;

    @property(cc.Prefab)
    prefab: cc.Prefab = null;

    @property(cc.ScrollView)
    activityItem_scrollview: cc.ScrollView = null;

    @property(cc.Node)
    activity: cc.Node = null;

    @property(cc.Node)
    notice: cc.Node = null;

    @property(cc.Button)
    jump: cc.Button = null;

    @property(cc.Prefab)
    TurntablePanel: cc.Prefab = null;

    @property(cc.Node)
    ParentNode: cc.Node = null;


    InitShow() {
        super.InitShow();
        this.notice.active = false;
        this.activity.active = true;
        this.activityItemListInitUI();
    }

    /**
     * 活动菜单列表
     * activityItemListInitUI
     */
    public activityItemListInitUI() {
        let scroll_ActivityItem: ItemListScrollView = this.activityItem_scrollview.getComponent("ItemListScrollView");
        let itemList = [
            {
                name: "转盘抽奖上线",
                list: []
            },
            {
                name: "跑得快上线",
                list: ["image/activity/activity/f"]
            },
            // {
            //     name: "蚌埠麻将上线",
            //     list: ["image/activity/activity/e"]
            // },
            {
                name: "礼品上线",
                list: ["image/activity/activity/d"]
            },
            // {
            //     name: "麻神争霸赛",
            //     list: ["image/activity/activity/c"]
            // },
            {
                name: "真3D来了",
                list: ["image/activity/activity/b"]
            }
        ];
        let act = new Action(this, this.ItemClickEvent);
        scroll_ActivityItem.resetList();
        scroll_ActivityItem.clickAction = act;
        scroll_ActivityItem.refreshData(itemList);
        scroll_ActivityItem.setDefaultSelectedIdx(0);
    }
    /**
     * 公告菜单列表
     * noticeItemListInitUI
     */
    public noticeItemListInitUI() {
        let scroll_ActivityItem: ItemListScrollView = this.activityItem_scrollview.getComponent("ItemListScrollView");
        let itemList = [
            {
                name: "官方声明",
                list: ["image/activity/notice/a"]
            }, {
                name: "防作弊声明",
                list: ["image/activity/notice/b"]
            }, {
                name: "数据不互通",
                list: ["image/activity/notice/c"]
            }, {
                name: "健康游戏忠告",
                list: ["image/activity/notice/d"]
            }
        ];

        let act = new Action(this, this.ItemClickEvent);
        scroll_ActivityItem.resetList();
        scroll_ActivityItem.clickAction = act;
        scroll_ActivityItem.refreshData(itemList);
        scroll_ActivityItem.setDefaultSelectedIdx(0);
    }

    /**
     *活动子菜单点击事件
     */
    public ItemClickEvent(info: any) {
        if (!info || !info.list) {
            return;
        }
 
        if (info.name == "转盘抽奖上线") {
            if (this.turntable == null) {
                let turntable = cc.instantiate(this.TurntablePanel);
                if (cc.isValid(turntable)) {
                    this.ParentNode.addChild(turntable);
                }
                this.turntable = turntable;
                return;
            }else{
                this.turntable.active = true;
            }
        }else{
            this.turntable.active = false;
        }
        
        var that = this;
        cc.loader.loadResArray(info.list, cc.SpriteFrame, (err, spriteFrames) => {
            this.layout.node.removeAllChildren();

            for (var i = 0; i < spriteFrames.length; i++) {
                var node = new cc.Node();
                that.layout.node.addChild(node);
                node.addComponent(cc.Sprite).spriteFrame = spriteFrames[i];

                let btn = node.addComponent<cc.Button>(cc.Button);
                const e = new cc.Component.EventHandler();

                switch (info.name) {
                    case "蚌埠麻将上线":
                        this.jump.node.active = true;
                        return;
                    case "礼品上线":
                        e.target = this.node;
                        e.component = "Activity";
                        e.handler = "OnClickGift";
                        btn.clickEvents.push(e);
                        break;
                    default:
                        break;
                }

                this.jump.node.active = false;

                /**
                 * 如果点击的是麻神争霸赛
                 */
                // if (info.name == "麻神争霸赛") {
                //     let btn = node.addComponent<cc.Button>(cc.Button);
                //     const e = new cc.Component.EventHandler();
                //     e.target = this.node;
                //     e.component = "Activity";
                //     e.handler = "OnClickRank";
                //     btn.clickEvents.push(e);
                // }
            }
        });

    }

    /**
     * 点击电视大奖图片所触发的操作
     */
    public OnClickRank() {
        this.UiManager.ShowUi(UIName.RankingList); //显示排行榜
        this.CloseClick(); //关闭本窗体
    }

    private titleClick(e, type: string) {
        if (type === "activity") {
            this.notice.active = false;
            this.activity.active = true;
            this.activityItemListInitUI();
        } else if (type === "notice") {
            this.activity.active = false;
            this.notice.active = true;
            this.noticeItemListInitUI();
        }
    }

    OnClickGift() {
        this.UiManager.ShowUi(UIName.Gift);
        this.CloseClick(); //关闭本窗体
    }

    OnClickBbmj() {
        this.UiManager.ShowUi(UIName.Service);
        this.CloseClick(); //关闭本窗体
    }
}
