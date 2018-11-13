/**
    * 分站配置
    */
import ConfigData from "../Global/ConfigData";

export class WebSiteConfig {

    public SetNewConfig(config: WebSiteConfig) {
        if (!config) return;
        for (let i in config) {
            this[i] = config[i];
        }
        if (this.LsUrl.length > 0) {
            const array = this.LsUrl.split(",");
            if (array.length > 0) {
                // ConfigData.IPPort = array;
            }
        }
        if (this.GameIds.length > 0) {
            const array = new Array<number>();
            const gameidstr = this.GameIds.split(",");
            for (let i = 0; i < gameidstr.length; i++) {
                const id = parseInt(gameidstr[i]);
                if (!isNaN(id)) {
                    array.push(id);
                }
            }
            if (array.length > 0) {
                ConfigData.GameList = array;
            }
        }
        if (this.AttachParam1 === "1") {
            //打开自动打开log输出
            cc._initDebugSetting(cc.DebugMode.INFO);
        } else {
            //打开自动打开log输出
            cc._initDebugSetting(cc.DebugMode.NONE);
        }

    }
    public RegionHost = "";
    
    public AgentHost = '';			

    /**
     * 分站ID
     */
    public SiteID = 1;
    /**
     * 分站名称
     */
    public SiteName = "朋友互娱";
    /**
     * 分站主ID
     */
    public SiteManagerID = 150000;
    /**
     * 分站虚拟目录
     */
    public SiteVirtualDir = "ceshi";
    /**
     * 分站默认分享标题
     */
    public DefaultShareTitle = "电玩城：微信版";
    /**
     * 分站默认分享内容
     */
    public DefaultShareContext = "朋友圈游戏，电玩游戏，大合集：支持自己开房间，应邀进房间";

    /**
     * 默认分享图片
     */
    public DefaultShareImg = `http://update.test.qileah.cn/share_imgs/qiahmj/defaultShare-201809191855.png`;
    /**
     * 网站标题
     */
    public webTitle = "电玩城 - 玩游戏赢大奖";

    /**
     * 支持的游戏id
     */
    public GameIds = "";
    /**
     * 登录服务器地址
     */
    public LsUrl = "";
    /**
     * h5网址
     */
    public H5Url = "";
    /**
     * app下载地址
     */
    public DownloadUrl = "http://manager.qlahmj-qlgame.qileah.cn/share/download.php";

    public AttachParam1 = "";
    public AttachParam2 = "ios_pay";
    public AttachParam3 = "";

    public ShareGiftImg ="http://update.test.qileah.cn/share_imgs/share_20180920210704.png";

}