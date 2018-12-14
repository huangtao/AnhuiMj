
import Dictionary from "./Dictionary";
import Global from "../Global/Global";
import ConfigData from "../Global/ConfigData";
import { QL_Common } from "../CommonSrc/QL_Common";
import { WebRequest } from "../Net/Open8hb";
import { ActionNet } from "./Action";
import { UploadInfo } from "./UploadInfo";
import { Debug } from "../Tools/Function";
  
/**
 *  亲友圈数据结构
 */
export class FriendCircleInfo {
    public constructor() {

    }

   	/**
   	 * 亲友圈ID
   	 */
   	
   	public ID: string;

    /**
     * 圈主ID
     */
    public userId: string;

    /**
     * 圈主昵称
     */
    public userName: string;

   	/**
   	 * 亲友圈昵称
   	 */
   	public name: string;

    /**
      * 指定授权的游戏列表
      */
    public accessGame: string;


    /**
     * 亲友圈公告
     */
    public notice: string;

   	/**
   	 * 亲友圈圈主头像
   	 */
   	public header: string;

   	/**
   	 * 成员人数
   	 */
   	public userCount: number;

   	/**
   	 * 最大成员数量
   	 */
   	public maxUser: number;
}

/**
 * 亲友圈玩法数据结构
 */
export class FriendCircleRule {
    public constructor() {

    }
      /**
       * 亲友圈ID
       */
      public friendId: number;
      /**
       * ID
       */
      public Id: number;

      /**
       * 游戏ID
       */
      
      public gameId: number;

      /**
       * 游戏昵称
       */
      public gameName: string;

      /**
       * 玩法
       */
      public ruleStr: string;

      /**
       * 玩法描述
       */
      public ruleDesc: string;

      /**
       * 模块名称
       */
      public moduleName: string;
}


/**
 * 亲友圈成员数结构
 */
export class FriendCircleMember {
      /**
       * 玩家ID
       */
      public userid: number = 0;

      /**
       * 玩家局数
       */
      public cnt: number = 0;;

      /**
       * 大赢家局数
       */
      public userwin: number = 0;;

      /**
       * 胜利局数
       */
      public victory: number = 0;;

      /**
       * 失败局数
       */
      public fail: number = 0;;

      /**
       * 积分
       */
      public moneynum: number = 0;;

      /**
       * 禁玩状态(1是被禁场地.2是被禁游戏)
       */
      public bantype: number = 0;;

      /**
       * flag 是否点亮
       */
      public flag: number = 0;;
      
      /**
       * 是否是管理员
       */
      public isadmin: string = "";

      /**
       * 昵称
       */
      public nickname: string = "";

      /**
       * 头像
       */
      public picfile: string = "";
}

/**
 * 亲友圈战绩排行数据结构
 */
export class FriendCircleRecordRank {
      /**
       * 编号
       */
      public id: number;

      /**
       * user id
       */
      public userId: string;

      /**
       * 昵称
       */      
      public name: string;

      /**
       * 头像
       */      
      public header: string;

      /**
       * 总局数
       */
      public allRound: number;
}

/**
 * 玩家分数结构
 */
export class PlayerFightScore {
  /**
  * 玩家Id
  */
  public userId: number;
   
  /**
  * 分数
  */
  public moneyNum: number;
  
  /**
  * 是否是胜利者
  */
  public isWinner: number;

  /**
  * 玩家昵称
  */
  public nickName: string;
}

/**
 * 亲友圈战绩数据结构
 */
export class FriendCircleRecord {
    /** 
     * setId
     */
    public setId: number = 0;

    /**
     * 游戏Id
     */
    public gameId: number = 0;

    /**
     * 积分
     */
    public moneyNum: number = 0;

    /**
     * 结束时间
     */
    public addTime: number = 0;
    
    /**
     * 桌子Id
     */
    public tableId: number = 0;
    
    /**
     * 游戏局数
     */
    public gameNum: number = 0;

    /**
      * flag 是否点亮
      */
    public flag: number = 0;;
    
    /**
     * 战绩mid
     */
    public mid: string = "";
    
    /**
     * 游戏名
     */
    public gameName: string = "";

    /**
     * 玩家分数列表
     */
    public userData: PlayerFightScore[] = null;
}