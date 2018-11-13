import UIBase from "../Base/UIBase";
import RankListItemScrollView from "./RankListItemScrollView";
import { ActionNet, Action } from "../../CustomType/Action";
import { WebRequest } from '../../Net/Open8hb';
import { RankListItemInfo } from "./RankListItemInfo";
import { LoadHeader, TranslateMoneyTypeName } from "../../Tools/Function";
import { ShareParam } from "../../CustomType/ShareParam";
import Global from "../../Global/Global";
import { WxManager } from "../../Manager/WxManager";
import { UIName } from "../../Global/UIName";
import RankListItem from './RankListItem';

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankForm extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;
    public get isPlayPopAction(): boolean { return false; }

    /**
     * 滑动列表
     */
    @property(cc.ScrollView)
    view: cc.ScrollView = null;

    /**
     * 我的排名
     */
    @property(cc.Label)
    myRank: cc.Label = null;

    /**
     * 按钮今日榜
     */
    @property(cc.Node)
    today_selected: cc.Node = null;

    /**
     * 按钮总战榜
     */
    @property(cc.Node)
    total_selected: cc.Node = null;

    @property(cc.Node)
    myRankNode: cc.Node = null;
    @property(cc.Sprite)
    MyItem_rankImg_a: cc.Sprite = null;
    @property(cc.Sprite)
    MyItem_rankImg_b: cc.Sprite = null;
    @property(cc.Sprite)
    MyItem_rankImg_c: cc.Sprite = null;
    @property(cc.Label)
    MyItem_rank: cc.Label = null;
    @property(cc.Label)
    MyItem_noRank: cc.Label = null;
    @property(cc.Sprite)
    MyHeaderImg: cc.Sprite = null;
    @property(cc.Label)
    MyNickName: cc.Label = null;
    @property(cc.Label)
    MyInning: cc.Label = null;
    @property(cc.Sprite)
    prize_dimmond: cc.Sprite = null;
    @property(cc.Sprite)
    prize_qidou: cc.Sprite = null;
    @property(cc.Label)
    MyPrizeNum: cc.Label = null;
    @property(cc.Node)
    RankFormNode: cc.Node = null;
    @property(cc.Sprite)
    prize_TV: cc.Sprite = null;

    /**
     * 今日榜显示名数
     */
    private today_num: number = 20;

    /**
     * 总站榜显示名数
     */
    private total_num: number = 50;
    private status: boolean = true;

    /**
     * 总战榜数据
     */
    private total_data = new Array<RankListItemInfo>();

    public InitShow() {
        super.InitShow(); 
        this.total_selected.active = false;
        this.today_selected.active = true;
        this.RankListInfosShow("todayRank", this.today_num);
        let rankListItemScrollView: RankListItemScrollView = this.view.getComponent("RankListItemScrollView");
        rankListItemScrollView.resetList();
        rankListItemScrollView.setting(new Action(this, this.checkMyRank));
    }


    public checkMyRank(act: boolean) {
        this.myRankNode.active = act;
    }

    /**
     * 排行榜
     */
    public RankListInfosShow(type: string, count: number) {
        const action = new ActionNet(this, (obj) => this.success(obj, count), this.error);
        const data = WebRequest.DefaultData();
        data.Add("type", type);
        data.Add("count", count)
        WebRequest.rank.rank_success(action, data);

    }

    public success(obj, count) {
        if (!obj) {
            this.UiManager.ShowTip("获取排行榜数据异常");
            cc.log("返回参数有误");
            return;
        }

        this.status = true;

        let myId = this.UserInfo.userData.UserID;
        let rankListItemScrollView: RankListItemScrollView = this.view.getComponent("RankListItemScrollView");
        let dataList = obj.data;
        let infoArray = new Array<RankListItemInfo>();

        for (var i = 0; i < dataList.length; i++) {
            let info = new RankListItemInfo;

            info.userId = dataList[i][0];
            info.userImg = dataList[i][1];
            info.userName = dataList[i][2];
            info.inning_num = dataList[i][3];
            info.prizeType = dataList[i][4];
            info.prize_num = dataList[i][5];
            info.rank = dataList[i][6];

            if (myId === info.userId) {
                if (count == this.today_num && info.rank <= this.today_num) { //如果是今日榜并且在排名内
                    this.myRank.string = info.rank.toString();
                }
                this.updateMyItem(info, count);
                this.status = false;
                if (info.rank > count) {
                    continue;
                }
            }
            infoArray.push(info);
        }

        this.checkStatus(this.status);

        let type = "";

        if (obj && count == this.total_num) {
            this.total_data = infoArray;
            type = "total";
        } else {
            type = "today";
        }

        cc.info('-- rank list data:  ', infoArray);
        rankListItemScrollView.data_type = type;

        rankListItemScrollView.refreshData(infoArray);
    }

    public error() {
        let rankListItemScrollView: RankListItemScrollView = this.view.getComponent("RankListItemScrollView");
        rankListItemScrollView.resetList();
        this.UiManager.ShowTip("查询失败");
    }

    private checkStatus(status) {
        if (status) {
            this.updateMyItem(null, 0);
        }
    }
    public updateMyItem(data, count) {
        if (data) {//上榜
            switch (data.rank) {
                case 1:
                    this.refreshData(data, count);
                    this.MyItem_rankImg_a.node.active = true;
                    this.MyItem_rankImg_b.node.active = false;
                    this.MyItem_rankImg_c.node.active = false;
                    this.MyItem_rank.node.active = false;
                    this.MyItem_noRank.node.active = false;
                    break;
                case 2:
                    this.refreshData(data, count);
                    this.MyItem_rankImg_b.node.active = true;
                    this.MyItem_rankImg_a.node.active = false;
                    this.MyItem_rankImg_c.node.active = false;
                    this.MyItem_rank.node.active = false;
                    this.MyItem_noRank.node.active = false;
                    break;
                case 3:
                    this.refreshData(data, count);
                    this.MyItem_rankImg_c.node.active = true;
                    this.MyItem_rankImg_b.node.active = false;
                    this.MyItem_rankImg_a.node.active = false;
                    this.MyItem_rank.node.active = false;
                    this.MyItem_noRank.node.active = false;
                    break;
                default:
                    switch (count) {
                        case this.today_num:
                            if (data.rank > this.today_num) {
                                this.ClearInfo();
                            } else {
                                this.GiftInit(data, 188, 128, 88, 68, 0, 0);
                                this.MyItem_rank.node.active = true;
                                this.MyItem_noRank.node.active = false;
                            }
                            break;
                        case this.total_num:
                            if (data.rank > this.total_num) {
                                this.ClearInfo();
                            } else {
                                this.GiftInit(data, 1, 2888, 1888, 3000, 2000, 1000);
                                this.MyItem_rank.node.active = true;
                                this.MyItem_noRank.node.active = false;
                            }
                            break;
                        default:
                            break;
                    }
                    this.MyItem_rank.string = data.rank.toString();
                    this.MyItem_rankImg_a.node.active = false;
                    this.MyItem_rankImg_b.node.active = false;
                    this.MyItem_rankImg_c.node.active = false;
                    break;
            }

            this.MyInning.string = data.inning_num.toString();
        } else {//未上榜
            this.MyItem_rankImg_a.node.active = false;
            this.MyItem_rankImg_b.node.active = false;
            this.MyItem_rankImg_c.node.active = false;
            this.prize_qidou.node.active = false;
            this.prize_dimmond.node.active = false;
            this.prize_TV.node.active = false;
            this.MyItem_rank.node.active = false;
            this.MyItem_noRank.string = "未上榜";
            this.MyItem_noRank.node.active = true;

            this.MyInning.string = "0";

            // this.prize_qidou.node.active = false;
            // this.prize_dimmond.node.active = true;

            this.MyPrizeNum.string = "";
        }
        LoadHeader(this.UserInfo.userData.Header, this.MyHeaderImg);
        this.MyNickName.string = this.UserInfo.userData.NickName;
    }

    /**
     * 面板切换
     * @param e 
     * @param type 
     */
    private changeClick(e, type: string) {
        let rankListItemScrollView: RankListItemScrollView = this.view.getComponent("RankListItemScrollView");
        rankListItemScrollView.resetList();

        if (type === "today") {
            this.total_selected.active = false;
            this.today_selected.active = true;
            this.RankListInfosShow("todayRank", this.today_num);
        } else {
            this.today_selected.active = false;
            this.total_selected.active = true;
            this.RankListInfosShow("totalRank", this.total_num);
        }
    }

    /**
     * 截屏分享
    */
    private shareRankClick() {
        //如果界面不存在
        if (!cc.isValid(this.node)) {
            cc.log("排行榜窗口已关闭, 不进行分享操作");
            return;
        }

        /**
         * 如果总战榜对象存在
         */
        if (this.total_data && this.total_data.length > 0) {
            for (let index = 0; index < this.total_data.length; index++) {
                /**
                 * 如果玩家在总战榜上
                 */
                if (this.total_data[index].userId == this.UserInfo.userData.UserID) {
                    this.UiManager.ShowUi(UIName.RankSharePanel, this.total_data[index]);
                    break;
                }

                /**
                 * 当循环到最后一个值 玩家不在榜上时
                 */
                if (index == (this.total_data.length - 1)) {
                    this.UiManager.ShowUi(UIName.RankSharePanel, null);
                }
            }
        } else {
            this.UiManager.ShowUi(UIName.RankSharePanel, null);
        }


        // Global.Instance.WxManager.CaptureScreenshot(this.RankFormNode,0,false,"Screenshot.jpg");
    }

    /**
     * 刷新数据
     */
    private refreshData(data: any, count: number) {
        if (data == null || count == null) {
            return;
        }

        switch (count) {
            case this.today_num:
                this.GiftInit(data, 188, 128, 88, 68, 0, 0);
                break;
            case this.total_num:
                this.GiftInit(data, 1, 2888, 1888, 3000, 2000, 1000);
                break;
        }
    }

    /**
  * 初始化奖励
  * @param data 
  * @param one 
  * @param tow 
  * @param three 
  * @param four 
  * @param five 
  * @param six 
  */
    private GiftInit(data, one, tow, three, four, five, six) {
        switch (data.rank) {
            case 1:
                if (one > 1) {
                    this.prize_TV.node.active = false;
                    this.prize_qidou.node.active = false;
                    this.prize_dimmond.node.active = true;
                    this.MyPrizeNum.string = one + "";
                    this.MyPrizeNum.node.active = true;
                } else {
                    this.prize_TV.node.active = true;
                    this.prize_qidou.node.active = false;
                    this.prize_dimmond.node.active = false;
                    this.MyPrizeNum.node.active = false;
                }
                break;
            case 2:
                this.prize_dimmond.node.active = true;
                this.MyPrizeNum.node.active = true;
                this.prize_qidou.node.active = false;
                this.MyPrizeNum.string = tow + "";
                this.prize_TV.node.active = false;
                this.MyPrizeNum.node.active = true;
                break;
            case 3:
                this.prize_dimmond.node.active = true;
                this.prize_qidou.node.active = false;
                this.MyPrizeNum.string = three + "";
                this.prize_TV.node.active = false;
                this.MyPrizeNum.node.active = true;
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                this.prize_dimmond.node.active = false;
                this.prize_qidou.node.active = true;
                this.MyPrizeNum.string = four + "";
                this.prize_TV.node.active = false;
                this.MyPrizeNum.node.active = true;
                break;
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
                if (five > 0) {
                    this.prize_dimmond.node.active = false;
                    this.prize_qidou.node.active = true;
                    this.MyPrizeNum.string = five + "";
                    this.prize_TV.node.active = false;
                    this.MyPrizeNum.node.active = true;
                }
                break;
            default:
                if (six > 0) {
                    this.prize_dimmond.node.active = false;
                    this.prize_qidou.node.active = true;
                    this.MyPrizeNum.string = six + "";
                    this.prize_TV.node.active = false;
                    this.MyPrizeNum.node.active = true;
                }
                break;
        }
    }

    public ClearInfo() {
        this.MyPrizeNum.string = "";
        this.MyItem_noRank.string = "未上榜";
        this.prize_TV.node.active = false;
        this.MyItem_rank.node.active = false;
        this.prize_qidou.node.active = false;
        this.prize_dimmond.node.active = false;
    }
}
