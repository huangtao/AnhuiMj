import { RankListItemInfo } from "./RankListItemInfo";
import Global from "../../Global/Global";
import ScrollHelperItem from "../../utils/ScrollHelperItem";
import { LoadHeader } from "../../Tools/Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankListItem extends ScrollHelperItem {

    @property(cc.Label)
    rank_num: cc.Label = null;
    @property(cc.Sprite)
    rank_img_a: cc.Sprite = null;
    @property(cc.Sprite)
    rank_img_b: cc.Sprite = null;
    @property(cc.Sprite)
    rank_img_c: cc.Sprite = null;
    @property(cc.Sprite)
    userImg: cc.Sprite = null;
    @property(cc.Label)
    userName: cc.Label = null;
    @property(cc.Label)
    inning_num: cc.Label = null;
    @property(cc.Sprite)
    prize_dimmond: cc.Sprite = null;
    @property(cc.Sprite)
    prize_qidou: cc.Sprite = null;
    @property(cc.Label)
    prize_num: cc.Label = null;
    @property(cc.SpriteFrame)
    frame_defaultHead: cc.SpriteFrame = null;
    @property(cc.Sprite)
    prize_TV: cc.Sprite = null;


    public initShow(data: RankListItemInfo, idx: number, data_type: string) {
        if (!data) {
            cc.log("数据传输失败");
            return;
        }

        this.userName.string = data.userName;
        if (!data.userImg) {//玩家头像
            if (this.userImg && this.frame_defaultHead) {
                this.userImg.spriteFrame = this.frame_defaultHead;
            }
        } else {
            LoadHeader(data.userImg, this.userImg);
        }

        // if(data.rank > 1){//奖品
        //     if(data.prizeType === 2){
        //         this.prize_qidou.node.active = false;
        //         this.prize_dimmond.node.active = true;
        //     }else if(data.prizeType === 4){
        //         this.prize_dimmond.node.active = false;
        //         this.prize_qidou.node.active = true;
        //     }
        // }

        /**
         * 奖品刷新
         */
        switch (data_type) {
            case "today":
                this.GiftInit(data, 188, 128, 88, 68, 0, 0);
                break;
            case "total":
                this.GiftInit(data, 1, 2888, 1888, 3000, 2000, 1000);
                break;
            default:
                break;
        }

        this.inning_num.string = data.inning_num.toString();//局数
        // this.prize_num.string = data.prize_num;//奖品数量

        let that = this;
        switch (data.rank) {//排名
            case 1:
                that.rank_img_b.node.active = false;
                that.rank_img_c.node.active = false;
                that.rank_num.node.active = false;
                that.rank_img_a.node.active = true;

                // that.prize_qidou.node.active = false;
                // that.prize_dimmond.node.active = false;
                // that.prize_num.node.active = false;
                // that.prize_TV.node.active = true;
                break;
            case 2:
                that.rank_img_a.node.active = false;
                that.rank_img_c.node.active = false;
                that.rank_num.node.active = false;
                that.rank_img_b.node.active = true;
                // that.prize_TV.node.active = false;
                // that.prize_num.node.active = true;
                break;
            case 3:
                that.rank_img_a.node.active = false;
                that.rank_img_b.node.active = false;
                that.rank_num.node.active = false;
                that.rank_img_c.node.active = true;
                // that.prize_TV.node.active = false;
                // that.prize_num.node.active = true;
                break;
            default:
                that.rank_img_a.node.active = false;
                that.rank_img_c.node.active = false;
                that.rank_img_b.node.active = false;
                that.rank_num.node.active = true;
                // that.prize_TV.node.active = false;
                // that.prize_num.node.active = true;
                that.rank_num.string = data.rank.toString();
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
                    this.prize_num.string = one + "";
                    this.prize_num.node.active = true;
                }else{
                    this.prize_TV.node.active = true;
                    this.prize_qidou.node.active = false;
                    this.prize_dimmond.node.active = false;
                    this.prize_num.node.active = false;
                }
                break;
            case 2:
                this.prize_dimmond.node.active = true;
                this.prize_num.node.active = true;
                this.prize_qidou.node.active = false;
                this.prize_num.string = tow + "";
                this.prize_TV.node.active = false;
                this.prize_num.node.active = true;
                break;
            case 3:
                this.prize_dimmond.node.active = true;
                this.prize_qidou.node.active = false;
                this.prize_num.string = three + "";
                this.prize_TV.node.active = false;
                this.prize_num.node.active = true;
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
                this.prize_num.string = four + "";
                this.prize_TV.node.active = false;
                this.prize_num.node.active = true;
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
                    this.prize_num.string = five + "";
                    this.prize_TV.node.active = false;
                    this.prize_num.node.active = true;
                }
                break;
            default:
                if (six > 0) {
                    this.prize_dimmond.node.active = false;
                    this.prize_qidou.node.active = true;
                    this.prize_num.string = six + "";
                    this.prize_TV.node.active = false;
                    this.prize_num.node.active = true;
                }
                break;
        }
    }
}
