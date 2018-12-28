const {ccclass} = cc._decorator;

/**
 * 转盘记录项实体类
 * Author:Cyq
 * Date:2018/12/18
 */
@ccclass
export default class TurntableRecordEntity {
    /**
     * 奖项ID
     */
    public prizeId : string = null;

    /**
     * 中奖项名称
     */
    public prizeName : string = null;

    /**
     * 中奖项数量
     */
    public prizeNum : number = null;

    /**
     * 中奖项类型
     */
    public prizeType : number = null;

    /**
     * 抽奖时间
     */
    public addTime : string = null;
}