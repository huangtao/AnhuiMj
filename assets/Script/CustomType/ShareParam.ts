/**
 * 分享的参数
 */
import { QL_Common } from "../CommonSrc/QL_Common";
import ConfigData from "../Global/ConfigData";


/**
 * 在分享的时候的结构体
 */
export class ShareParam {

    /**
     * 分享内容的类别 text:文本，link:链接，img:图片
     */
    public shareType:string = "link";

    /**
     * 分享类型 0 好友  1朋友圈, 1001闲聊分享  
     */
    public WXScene: number = 0;

    /**
     * 分享标题
     */
    public title = "";

    /**
     * 分享描述
     */
    public text = "";

    /**
     * 分享参数
     */
    public link_param: ShareParamExpands;

    /**
     * 分享图片的url
     */
    public shareImg: string = ConfigData.SiteConfig.DefaultShareImg;

    /**
     * 链接
     */
    public link: string = "http://www.qileah.cn/";

    /**
     * 截图图片所在地址
     */
    public path: string = "";
    /**
     * 图片尺寸
     */
    public thumb_size:number = 0;
}
/**
 * 参数
 */
export class ShareParamExpands {

    /**
     * 桌子号
     */
    public tableid: string = QL_Common.InvalidValue.InvalidTableID + '';

    /**
     * 邀请人ID
     */
    public parent: string = QL_Common.InvalidValue.InvalidID + '';

    /**
     * 邀请的位子
     */
    public chairid: string = QL_Common.InvalidValue.InvalidChairID + '';
}