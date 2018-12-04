/**
 * 任务实体类
 */
export default class TaskInfo{
    /**
     * 任务Id
     */
    public taskId : string  = null;

    /**
     * 任务名称
     */
    public taskName : string = null;

    /**
     * 任务奖励数量
     */
    public taskaward : number = null;

    /**
     * 奖励类型：
     * VQ = 七豆
     * VD = 钻石
     */
    public awardtype : string = null;

    /**
     * 任务类型
     * D = 每日任务
     * W = 每周任务
     * M = 每月任务
     */
    public tasktype : string = null;

    /**
     * 添加时间
     */
    public addtime : string = null;

    /**
     * 任务说明
     */
    public taskremark : string = null;

    /**
     * 任务状态
     * 0：不可用
     * 1：可用
     */
    public status : number = null;

    /**
     * 任务条件数
     */
    public taskcond : number = null;

    /**
     * 领取期限(结束时间往后延迟天数)
     */
    public getlimit : number = null;

    /**
     * 玩家完成条件数
     */
    public realnum : number = null;

    /**
     * 任务的领取状态
     */
    public isget : number = null;

    /**
     * 任务的完成状态
     */
    public taskStatus : number = null;

    /**
     * 跳转目标
     */
    public target : string = null;
}