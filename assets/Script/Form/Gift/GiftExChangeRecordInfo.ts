import { DateTime } from "../../Serializer/DateTime";

/**
 * 兑换记录实体类
 */
export default class GiftExChangeRecordInfo{
    /**
     * 订单ID
     */
    public orderId:number = 0;

    /**
     * 礼品ID
     */
    public giftId:number = 0;

    /**
     * 礼品类型
     */
    public giftType:number = 0;

    /**
     * 礼品描述
     */
    public introduce:string = "";

    /**
     * 礼品名称
     */
    public giftName:string = "";

    /**
     * 礼品图片
     */
    public giftPic:string = "";

    /**
     * 订单状态
     */
    public status:number = 0;

    /**
     * 七豆数量
     */
    public qiDou:number = 0;

    /**
     * 玩家抬头姓名
     */
    public name:string = "";

    /**
     * 电话号码
     */
    public tel:number = 0;

    /**
     * 地址
     */
    public address:string = "";

    /**
     * 充值账号
     */
    public chacCount:string = "";

    /**
     * 添加时间
     */
    public addTime:string = "";

    /**
     * 更新时间
     */
    public updateTime:string = "";

    /**
     * 订单备注
     */
    public reMark:string = "";
}