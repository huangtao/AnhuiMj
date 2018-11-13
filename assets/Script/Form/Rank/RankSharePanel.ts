import { RankListItemInfo } from "./RankListItemInfo";
import { LoadHeader } from "../../Tools/Function";
import { DateTime } from "../../Serializer/DateTime";
import Global from "../../Global/Global";
import { UIName } from "../../Global/UIName";
import UIBase from "../Base/UIBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankSharePanel extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;
    public get isPlayPopAction(): boolean { return false; }

    @property(cc.Node)
    private share_bg: cc.Node = null;

    //玩家排名
    @property(cc.Label)
    private rank_top: cc.Label = null;

    //当前日期
    @property(cc.Label)
    private cureent_date: cc.Label = null;

    //玩家头像
    @property(cc.Sprite)
    private player_head: cc.Sprite = null;

    //玩家昵称
    @property(cc.Label)
    private player_name: cc.Label = null;

    //玩家id
    @property(cc.Label)
    private player_id: cc.Label = null;

    private total_data = new Array<RankListItemInfo>();

    public initShow(data: Array<RankListItemInfo>) {
        if (data) {
            this.total_data = data;
        }
    }

    /**
     * 玩家点击分享触发
     * @param type 分享类型
     */
    ClickRankShare(e, type) {
        switch (type) {
            case "pyq":
                Global.Instance.WxManager.CaptureScreenshot(this.share_bg, 1, true, "Screenshot.jpg");
                break;
            case "py":
                Global.Instance.WxManager.CaptureScreenshot(this.share_bg, 0, true, "Screenshot.jpg");
                break;
            default:
                cc.log("参数错误");
                return;
        }
    }

    /**
     * 初始化属性
     */
    public InitShow(){
        let rank_player = this.ShowParam;
        if(rank_player){
            this.player_id.string = "ID:" + rank_player.userId.toString();
            this.player_name.string = rank_player.userName;
            LoadHeader(rank_player.userImg, this.player_head);
            if(rank_player.rank > 9999){
                this.rank_top.string = (rank_player.rank / 10000).toString() + "万";
            }else{
                this.rank_top.string = rank_player.rank.toString();
            }
            
        }else{
            let player = this.UserInfo.userData;
            this.player_id.string = "ID:" + player.UserID.toString();
            this.player_name.string = player.NickName;
            this.rank_top.string = 0 + "";
            LoadHeader(player.Header, this.player_head);
        }
        this.cureent_date.string = "分享日期：" + DateTime.Now.ToString("yyyy-MM-dd");
    }
    /**
     * 关闭面板
     */
    // CloseClick(){
    //     if(cc.isValid(this.node)){
    //         Global.Instance.UiManager.DestroyUi(UIName.RankSharePanel);
    //     }
    // }
}