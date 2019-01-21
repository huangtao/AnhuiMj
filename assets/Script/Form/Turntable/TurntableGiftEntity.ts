const {ccclass} = cc._decorator;

/**
 * 转盘奖励项实体类
 * Author:Cyq
 * Date:2018/12/18
 */
@ccclass
export default class TurntableGiftEntity {

    /**
     * 奖品id
     */
    public id : number = 0;

    /**
     * 奖品名称
     */
    public PrizeName : string = "";

    /**
     * 奖品类型 VQ VD VR (七豆 钻石 实物)
     */
    public PrizeType : string = "";

    /**
     * 奖品数量
     */
    public PrizeNum : number = 0;

    /**
     * 抽奖概率
     */
    public Percent : number = 0;

    /**
     * 
     */
    public TotalNum : number = 0;

    /**
     * 剩余数量
     */
    public RemainNum : number = 0;

    /**
     * 奖品图片路径
     */
    public ImgPath : string = "";

    /**
     * 状态（1可用 0 不可用）
     */
    public Status : number = 0;
}
