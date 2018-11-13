export class GameCachePool{
    /**
     * 花瓣的对象池
     */
    public static FlowerPool: cc.NodePool = new cc.NodePool("Flower");

    /**
     * 游戏图标对象池
     */
    public static GamePool: cc.NodePool = new cc.NodePool("GameIcon");

    /**
     * 房间对象池
     */
    public static RoomPool: cc.NodePool = new cc.NodePool("RoomIcon");
    
    /**
     * 我的房间对象池
     */
    public static MyRoomPool: cc.NodePool = new cc.NodePool("MyRoomItem");

    /**
     * 
     */
    public static UrlMsgBoxPool: cc.NodePool = new cc.NodePool("UrlMsgBox");

    /**
     * 邮件对象
     */
    public static EmailPool:cc.NodePool=new cc.NodePool("EmailItem_new");

    public static AttachmentPool:cc.NodePool=new cc.NodePool("AttachmentItem");
}