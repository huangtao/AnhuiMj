
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
      public gameName: number;

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
       * 编号
       */
      public id: number;

      /**
       * 是否是管理员
       */
      public isAdmin: number;
      
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