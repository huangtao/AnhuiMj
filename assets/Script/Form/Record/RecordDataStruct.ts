/** 
 * 战绩每局详情信息
 */
export class RoundDetailInfoItem{
  /**
     * 战绩ID
     */
    recordid: number = null;
    /**
     * 房间号
    */
    userid: number = null;
    /**
     * 局数
     */
    moneynum: number = null;
 }

/** 
 * 战绩每局详情信息
 */
export class RoundDetailInfo{
  /**
     * 战绩ID
     */
    recordId: number = null;
    /**
     * 录像回放地址
    */
    recPath: string = null;
    /**
     * 分数列表
     */
    detailListItem: Array<RoundDetailInfoItem>;
 }

/** 
 * 战绩目录Item
 */
export class RecordListItem{
	  /**
     * userid
     */
      userid: number = null;

     /**
     * 玩家昵称
     */
      nickname: string = null;

    /**
     * 分数
     */
      moneynum: number = null;
}

// 战绩数据结构
export class RecordInfo{
    /**
     * 战绩Id
     */
    recordId: number = 0;

    /**
     * mid
     */
    mId:      string = "";

    /**
     * 房间Id
     */
    roomId:   number = 0;

    /**
     * 游戏ID
     */
    gameId:   number = 0;

    /**
     * 房主ID
     */
    ownerId:  number = 0;

    /**
     * 亲友圈id
     */
    groupId:  number = 0;

    /**
     * 桌子号
     */
    tableId:  number = 0;

    /**
     * 结束时间
     */
    addtime:  number = 0;

    /**
     * 总局数
     */
    gameNum:  number = 0;

    /**
     * 分数列表
     */
    scoreList: Array<RecordListItem>;

    /**
     * 下一条战绩的ID
     */
    nextStartId: number = null;
}