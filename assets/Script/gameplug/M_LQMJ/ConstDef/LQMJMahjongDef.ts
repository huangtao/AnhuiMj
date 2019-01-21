import { GameIF } from "../../../CommonSrc/GameIF";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { LQMJMahjongAlgorithm } from "../LQMJMahjongAlgorithm/LQMJMahjongAlgorithm";
import { AudioType } from "../../../CustomType/Enum";
import { ReportError } from "../../../Tools/Function";


const { ccclass, property } = cc._decorator;



    export interface ILQMJClass {
        isCreateRoom():boolean;
        isVideo():boolean;
        is2D():boolean;
        isAlreadyHu():boolean;
        ifCanExitGame(chairId: number): boolean;
        
        getSpeed(): number;
        getRoomData():QL_Common.RoomClient;
        getTableConfig():LQMJTableConfig;
        getSelfHandCardData():Array<number>;
        getPlayerHandCardData(chair:number):Array<number>;
        getTablePlayerAry(): Array<QL_Common.TablePlayer>;
        getActiveCardClassName():Array<string>;
         
        getSelfChair(): number;
        getBankerChair(): number;
        getMahjongResName(card: number): string;
        getMahjongPaiHuaRes(card: number): cc.SpriteFrame;
        getMahjongPaiHuaResOut(card: number): cc.SpriteFrame;
        getMahjongPaiBeiRes(cardtype:string): cc.SpriteFrame;
        getMahjong3DPaiBeiRes(cardtype:string): cc.SpriteFrame;

        getGamePhase():enGamePhase;
        getTableStauts(): QL_Common.TableStatus;
        
        physical2logicChair(chair: number): number;
        logic2physicalChair(chair: number): number;
        
        exit():void;
        stopTimer():void;
        getGameID():string;
        
        sendData(cm: GameIF.CustomMessage): void;
        playMJSound(soundName: string,type: AudioType,loops: boolean);

         getFreeActive(chair:number):cc.NodePool;
        getFreeFixed(chair:number):cc.NodePool;
        getFreePool(chair:number):cc.NodePool;
    }
    
    /**
	 *
	 * @author  
	 *
	 */
    export interface ILQMJView {
        OnButtonShare():void;
    }
    
    /**
	 *
	 * @author  
	 *
	 */
    export class LQMJ{
        
        private static _ins:LQMJ=null;
        private _icalss:ILQMJClass=null;
        private _iview:ILQMJView=null;
        
        public constructor(){
            
        }
        
        /**
         * 静态单例
         * */
        public static get ins():LQMJ{
            if(null == LQMJ._ins){
                LQMJ._ins = new LQMJ();
            }
            return LQMJ._ins;
        }
        
        /**
         * 逻辑
         * */
        public get iclass():ILQMJClass{
            return this._icalss;
        }
        public set iclass(value:ILQMJClass){
            this._icalss = value;
        }
        
        /**
         * 视图
         * */
        public get iview():ILQMJView{
            return this._iview;
        }
        public set iview(value:ILQMJView){
            this._iview = value;
        }
    }


	export class LQMJMahjongDef {

        public static gameID:number=107;
        /// <summary>
        /// 花色掩码
        /// </summary>
        public static gCardMask_color:number = 0xf0;
        /// <summary>
        /// 数值掩码
        /// </summary>
        public static gCardMask_value: number = 0x0f;
        /// <summary>
        /// 无效的麻将牌数值
        /// </summary>
        public static gInvalidMahjongValue: number = 0;
        /**
         * 麻将牌背值
         * */
        public static gBackMahjongValue:number=255;
        /// <summary>
        /// 无效的椅子号
        /// </summary>
        public static gInvalidChar: number = 255;
        /// <summary>
        /// 活动牌数量
        /// </summary>
        public static gCardCount_Active: number = 14;
        /// <summary>
        /// 牌包数量1
        /// </summary>
        public static gCardCount_Package: number = 136;
        /// <summary>
        /// 真人思考时间
        /// </summary>
        public static gTrueManWaitSecond: number = 5;
        /// <summary>
        /// 游戏人数
        /// </summary>
        public static gPlayerNum:number=4;
        /// <summary>
        /// 合肥麻将最大可能输嘴数，实际小于200嘴，但有庄要算连霸100庄估计也没人玩了。
        /// </summary>
        public static gMaxLoseMultiple: number = 200;
        /**
         * int最大值
         * */
        public static gIntMaxValue:number= 2147483647;
        /**
         * int最小值
         * */
        public static gIntMinValue:number=-2147483648;

        /// <summary>
        /// 麻将牌花色:无
        /// </summary>
        public static gMahjongColor_Null: number = 0xff;
        /// <summary>
        /// 麻将牌花色:万
        /// </summary>
        public static gMahjongColor_Wan: number = 0;
        /// <summary>
        /// 麻将牌花色:筒
        /// </summary>
        public static gMahjongColor_Tong: number = 1;
        /// <summary>
        /// 麻将牌花色:条
        /// </summary>
        public static gMahjongColor_Tiao: number = 2;
        /// <summary>
        /// 麻将牌花色:字
        /// </summary>
        public static gMahjongColor_Zhi: number = 3;


        /// <summary>
        /// 投票权限掩码:无
        /// </summary>
        public static gVoteRightMask_Null: number = 0x00;
        /// <summary>
        /// 投票权限掩码:碰
        /// </summary>
        public static gVoteRightMask_Peng: number = 0x01;
        /// <summary>
        /// 投票权限掩码:杠
        /// </summary>
        public static gVoteRightMask_Gang: number = 0x02;
        /// <summary>
        /// 投票权限掩码:胡
        /// </summary>
        public static gVoteRightMask_Hu: number = 0x04;
        /// <summary>
        /// 投票权限掩码:吃
        /// </summary>
        public static gVoteRightMask_Chi: number = 0x08;     

        /// <summary>
        /// 投票权限掩码:豹
        /// </summary>
        public static gVoteRightMask_Bao: number = 0x09;  

        /// <summary>
        /// 操作权限掩码:无
        /// </summary>
        public static gOperateRightMask_Null: number = 0x00;
        /// <summary>
        /// 操作权限掩码:可杠
        /// </summary>
        public static gOperateRightMask_Gang: number = 0x01;
        /// <summary>
        /// 操作权限掩码:可自摸
        /// </summary>
        public static gOperateRightMask_Zimo: number = 0x02;


        /// <summary>
        /// 投票结果:弃
        /// </summary>
        public static gVoteResult_GiveUp: number = 0;
        /// <summary>
        /// 投票结果:碰
        /// </summary>
        public static gVoteResult_Peng: number = 1;
        /// <summary>
        /// 投票结果:杠
        /// </summary>
        public static gVoteResult_Gang: number = 2;
        /// <summary>
        /// 投票结果:胡
        /// </summary>
        public static gVoteResult_Hu: number = 3;
        /// <summary>
        /// 投票结果:吃
        /// </summary>
        public static gVoteResult_Chi: number = 4;
        /// <summary>
        /// 无投票操作
        /// </summary>
        public static gVoteResult_Null: number = 0xff;

        /// <summary>
        /// 花色掩码数组
        /// </summary>
        public static gMahjongColorMask: Array<number> = [0x00,0x10,0x20,0x30];
        /// <summary>
        /// 牌型倍数
        /// </summary>
        public static gMahjongPatternMultiple:Array<number> =
        [
            0,
            
            4,           //清单调,手里的牌都碰或杠完只剩最后一张。例如：111筒、333筒、555筒、666筒都是碰掉了，手里剩一张2筒，胡2筒
            4,           //清七对,手上的牌是清一色的七对。 例：22334466778899条



            3,           //将对,除了一对对牌以外，剩下的都是三张一对的，一共四对。而对牌必须为二、五、八。 例：222555888万55588筒
            3,           //龙七对,手牌为暗七对牌型，没有碰过或者杠过，并且有四张牌是一样的，叫龙七对。不再计七对。例：22333366条337788筒
            3,           //清大对,手上的牌是清一色的对对胡。 例： 22233355566699筒



            2,           //大单吊,手里的牌都碰或杠完只剩最后一张。例如：111筒、333筒、555条、666条都是碰掉了，手里剩一张2筒或2条，胡2筒或2条
            2,           //带幺九,玩家手牌中，全部都是用1的连牌或者9的连牌组成的牌，且麻将也是1,9。 例：111222333筒78999万
            2,           //小七对,手牌全部是两张一对的，没有碰过和杠过 例：11335566条224466筒
            2,           //清一色,胡牌的手牌全部都是一门花色。 例：11122233345688筒。



            1,         //对对胡,除了一对对牌以外，剩下的都是三张一对的，一共四对。例： 222666888万33399筒
            1,         //平胡
            
            -1,         //天胡
            -1          //地胡
        ];

        /// <summary>
        /// 牌型名称
        /// </summary>
        public static gMahjongPatternName:Array<string> =
        [
            "",
            "清单调",
            "清七对",

            "将对",
            "龙七对",
            "清大对",

            "大单吊",
            "带幺九",
            "小七对",
            "清一色",

            "对对胡",
            "素番",
            
            "天胡",
            "地胡"
        ];

        /// <summary>
        /// 胡牌类型名称
        /// </summary>
        public static gHuCardTypeName:Array<string> =
        [
            "",
            "自摸",
            "平胡",
            "自摸杠上花",
            "杠上炮",
            "抢杠胡"
        ];
        
        /// <summary>
        /// 游戏阶段
        /// </summary>
        public static gGamePhaseName: Array<string> =
        [
            "",
            "发牌",
            "换牌",
            "定缺",
            "玩家操作",
            "投票",
            "抢杠",
            "游戏结束"
        ];
        
        /// <summary>
        /// 游戏流水
        /// </summary>
        public static gGameFlowName: Array<string> =
        [
            "",
            "暗杠",
            "直杠",
            "巴杠",
            
            "自摸杠上花",
            "自摸",
            "杠上炮",
            "抢杠",
            "平胡",
            "呼叫转移",
            
            "查花猪",
            "查大叫"
        ];
        
        /// <summary>
        /// 杠类型
        /// </summary>
        public static gGangTypeName: Array<string> =
        [
            "",
            "暗杠",
            "直杠",
            "巴杠"
        ];
        /**
         * 金币场配置
         * */
        public static gGoldCardRoomConfig:Array<{baseMoney:number,tableConst:number,joinMultiple:number}>=
        [
            { baseMoney: 500,tableConst: 640 / 16,joinMultiple: 500 * 200 },
            { baseMoney: 1000,tableConst: 640 / 16,joinMultiple: 1000* 200 },
            { baseMoney: 1500,tableConst: 1200 / 16,joinMultiple: 1500 * 200 },
            { baseMoney: 3000,tableConst: 1200 / 16,joinMultiple: 3000 * 200 },
            { baseMoney: 5000,tableConst: 1600 / 16,joinMultiple: 5000 * 200 },
            { baseMoney: 10000,tableConst: 3200 / 16,joinMultiple: 10000 * 200 },
            { baseMoney: 30000,tableConst: 6400 / 16,joinMultiple: 30000 * 200 },
        ];
	}
	
	/**
	 * 合肥麻将音效定义
	 * */
	export class LQMJSoundDef{
    	  /**
    	   * 背景音效
    	   * */
        public static sound_bg: string ="xzmj_sound_bg_mp3";
	    /**
    	   * 胡牌音效
    	   * */
        public static sound_hu: string ="xzmj_sound_hu_mp3";
	    /**
    	   * 碰牌音效
    	   * */
        public static sound_peng: string ="xzmj_sound_peng_mp3";
	    /**
    	   * 骰子音效
    	   * */
        public static sound_sz: string = "xzmj_sound_sz_mp3";
        /**
    	   * 赢音效
    	   * */
        public static sound_win: string ="xzmj_sound_win_mp3";
	    /**
    	   * 杠音效
    	   * */
        public static sound_windrain: string = "xzmj_sound_windrain_mp3";

        /**
         * 音频路径
         */
        public static VoicePath: string = "resources/gameres/Voice/MJ_Voice";
        /**
         * 公共音频路径
         */
        public static CommonVoicePath: string = "resources/gameres/Voice/";
	}
	
	//
	//计时器定义
	//
	
	/**
	 * 合肥麻将计时器定义
	 * */
	export class LQMJTimerDef{
    	/**
    	 * 玩家操作计时器id
    	 * */
    	public static timer_id_playerop:number=1;
    	public static timer_len_playerop:number=10;
    	
    	// /**
    	//  * 换牌计时器id
    	//  * */
    	// public static timer_id_changecard:number=2;
    	// public static timer_len_changecard:number=20;
    	
    	// /**
    	//  * 定缺计时器id
    	//  * */
    	// public static timer_id_dingque:number=3;
    	// public static timer_len_dingque:number=20;
    	
    	/**
    	 * 投票计时器id
    	 * */
    	public static timer_id_vote:number=4;
    	public static timer_len_vote:number=10;
    	
    	/**
    	 * 抢杠计时器id
    	 * */
    	public static timer_id_qianggang:number=5;
    	public static timer_len_qianggang:number=10;
        /**
    	 * 准备计时器
    	 * */
    	public static timer_id_ready:number=6;
    	public static timer_len_ready:number=20;
	}
	//
	//枚举定义
	//
	
	/**
	 * 动画类型
	 * */
	export enum enLQMJAniType{
        /**
    	 * 碰
    	 * */
	    aniType_chi=0,
    	/**
    	 * 碰
    	 * */
	    aniType_peng=1,
	    /**
	     * 明杠
	     * */
	    aniType_minggGang=2,
	    /**
	     * 暗杠
	     * */
	    aniType_anGang=3,
	    /**
	     * 胡牌
	     * */
	    aniType_huCard=4,
	    /**
	     * 自摸
	     * */
	    aniType_ziMo=5,
        /**
         * 豹
         */
        aniType_bao = 6,
        /**
         * 开始游戏
         */
        aniType_start = 7
	}
	
    /// <summary>
    /// 游戏阶段
    /// </summary>
    export enum enGamePhase {
        /// <summary>
        /// 未知
        /// </summary>
        GamePhase_Unknown = 0,
        /// <summary>
        /// 发牌阶段
        /// </summary>
        GamePhase_SendCard = 1,
        /// <summary>
        /// 换牌阶段
        /// </summary>
        GamePhase_La = 2,
        /// <summary>
        /// 定张阶段
        /// </summary>
        GamePhase_Pao = 3,
        /// <summary>
        /// 玩家操作
        /// </summary>
        GamePhase_PlayerOP = 4,
        /// <summary>
        /// 投票阶段
        /// </summary>
        GamePhase_Vote = 5,
        /// <summary>
        /// 抢杠阶段
        /// </summary>
        GamePhase_QiangGang = 6,
        /// <summary>
        /// 游戏结束
        /// </summary>
        GamePhase_Over = 7
    };

    /// <summary>
    /// 胡牌类型
    /// </summary>
    export enum enHuCardType {
        /// <summary>
        /// 没有胡牌
        /// </summary>
        HuCardType_Null = 0,
        /// <summary>
        /// 自摸
        /// </summary>
        HuCardType_ZiMo = 1,
        /// <summary>
        /// 平胡
        /// </summary>
        HuCardType_PingHu = 2,
        /// <summary>
        /// 杠上花
        /// </summary>
        HuCardType_GangShangHua = 3,
        /// <summary>
        /// 杠上炮
        /// </summary>
        HuCardType_GangShaPao = 4,
        /// <summary>
        /// 抢杠胡
        /// </summary>
        HuCardType_QiangGangHu = 5,
    }

    /// <summary>
    /// 麻将牌型
    /// </summary>
    export enum enMahjongPattern {
        /// <summary>
        /// 无牌型
        /// </summary>
        MahjongPattern_Null = 0,


        /// <summary>
        /// 清单调,手里的牌都碰或杠完只剩最后一张。例如：111筒、333筒、555筒、666筒都是碰掉了，手里剩一张2筒，胡2筒
        /// </summary>
        MahjongPattern_QingDanDiao = 1,
        /// <summary>
        /// 清七对,手上的牌是清一色的七对。 例：22334466778899条
        /// </summary>
        MahjongPattern_QingQiDui = 2,


        /// <summary>
        /// 将对,除了一对对牌以外，剩下的都是三张一对的，一共四对。而对牌必须为二、五、八。 例：222555888万55588筒
        /// </summary>
        MahjongPattern_JiangDui = 3,
        /// <summary>
        /// 龙七对,手牌为暗七对牌型，没有碰过或者杠过，并且有四张牌是一样的，叫龙七对。不再计七对。例：22333366条337788筒
        /// </summary>
        MahjongPattern_LongQiDui = 4,
        /// <summary>
        /// 清大对,手上的牌是清一色的对对胡。 例： 22233355566699筒
        /// </summary>
        MahjongPattern_QingDaDui = 5,


        /// <summary>
        /// 大单吊,手里的牌都碰或杠完只剩最后一张。例如：111筒、333筒、555条、666条都是碰掉了，手里剩一张2筒或2条，胡2筒或2条
        /// </summary>
        MahjongPattern_DaDanDiao = 6,
        /// <summary>
        /// 带幺九,玩家手牌中，全部都是用1的连牌或者9的连牌组成的牌，且麻将也是1,9。 例：111222333筒78999万
        /// </summary>
        MahjongPattern_DaiYaoJiu = 7,
        /// <summary>
        /// 小七对,手牌全部是两张一对的，没有碰过和杠过 例：11335566条224466筒
        /// </summary>
        MahjongPattern_XiaoQiDui = 8,
        /// <summary>
        /// 清一色,胡牌的手牌全部都是一门花色。 例：11122233345688筒。
        /// </summary>
        MahjongPattern_QingYiShe = 9,


        /// <summary>
        /// 对对胡,除了一对对牌以外，剩下的都是三张一对的，一共四对。例： 222666888万33399筒
        /// </summary>
        MahjongPattern_DuiDuiHu = 10,
        /// <summary>
        /// 平胡
        /// </summary>
        MahjongPattern_PingHu = 11,
        
        /// <summary>
        /// 对对胡,除了一对对牌以外，剩下的都是三张一对的，一共四对。例： 222666888万33399筒
        /// </summary>
        MahjongPattern_TianHu = 12,
        /// <summary>
        /// 平胡
        /// </summary>
        MahjongPattern_DiHu = 13
    };

    /// <summary>
    /// 游戏流水类型
    /// </summary>
    export enum enGameFlowType {
        /// <summary>
        /// Unknow
        /// </summary>
        GameFlow_Unknown = 0,
        /// <summary>
        /// 暗杠
        /// </summary>
        GameFlow_AnGang = 1,
        /// <summary>
        /// 明杠
        /// </summary>
        GameFlow_MingGang = 2,
        /// <summary>
        /// 补杠
        /// </summary>
        GameFlow_BuGang = 3,

        /// <summary>
        /// 杠上花
        /// </summary>
        GameFlow_GangShangHua = 4,
        /// <summary>
        /// 自摸
        /// </summary>
        GameFlow_ZiMo = 5,
        /// <summary>
        /// 杠上炮
        /// </summary>
        GameFlow_GangShangPao = 6,
        /// <summary>
        /// 抢杠
        /// </summary>
        GameFlow_QiangGang = 7,
        /// <summary>
        /// 胡牌
        /// </summary>
        GameFlow_HuPai = 8,
        /// <summary>
        /// 呼叫转移
        /// </summary>
        GameFlow_GangMove = 9,

        /// <summary>
        /// 查花猪
        /// </summary>
        GameFlow_HuaPig = 10,
        /// <summary>
        /// 查大叫
        /// </summary>
        GameFlow_ChaJiao = 11
    }
    
    /// <summary>
    /// 杠类型
    /// </summary>
    export enum enGangType {
        Unknown = 0,
        /// <summary>
        /// 暗杠
        /// </summary>
        AnGang = 1,
        /// <summary>
        /// 明杠
        /// </summary>
        MingGang = 2,
        /// <summary>
        /// 补杠
        /// </summary>
        BuGang = 3
    }
    
    /// <summary>
    /// 定牌组类型:碰，暗杠，明杠，补杠
    /// </summary>
    export enum enFixedCardType {
        /// <summary>
        /// 未知
        /// </summary>
        FixedCardType_UnKnown = 0,
        /// <summary>
        /// 暗杠
        /// </summary>
        FixedCardType_AGang = 1,
        /// <summary>
        /// 明杠
        /// </summary>
        FixedCardType_MGang = 2,
        /// <summary>
        /// 补杠
        /// </summary>
        FixedCardType_BGang = 3,
        /// <summary>
        /// 碰
        /// </summary>
        FixedCardType_Peng = 4,
        /// <summary>
        /// 吃
        /// </summary>
        FixedCardType_Chi = 5
    };
    //字集合
                /**
     * 花牌集合
     */
    export class allZhi{
        public zhi:Array<number> = 
        [
            ///<summary>
            ///东风
            ///</summary>
            0x31,
            ///<summary>
            ///红中
            ///</summary>
            0x32,
            ///<summary>
            ///发财
            ///</summary>
            0x33,
            ///<summary>
            ///白板
            ///</summary>
            0x34, 0x35, 0x36, 0x37
        ];
    }
    
    //
    //结构体定义
    //
    
    /**
     * 合肥麻将,桌子配置
     * */
    export class LQMJTableConfig{
        //是否拉跑坐
        private _isLaPaoZuo:boolean;
        //是否七对加
        private _isQiDui:boolean;
        //是否可胡七对
        private _ifCanHu7Dui:boolean;
        //是否杠开加
        private _isGangKai:boolean;
        //是否13不靠加
        private _isBuKao:boolean;
        //是否一炮多响
        private _isYiPaoDuoXiang:boolean;

        //一嘴多少分
        private _cellScore:number;
        //是否记分场
        private _isRecordRoom:boolean;
        //房主id
        private _tableCreatorID:number;
        //房主椅子号
        private _tableCreatorChair:number;
        //桌子号
        private _tableCode:string;
        //设置局数
        private _setGameNum:number;
        //已经游戏的局数
        private _alreadyGameNum:number=0;
        //已经游戏的真实局数
        private _realGameNum:number=0;
        //金币场底金索引
        private _goldRoomBaseIdx:number;
        //自建房是否超时代打
        private _isOutTimeOp:boolean;
        //是否保留房间，只有在游戏没有开始时有效
        private _isSaveTable:boolean;
        //
        private _saveTableTime:number;
        //是否房主买单
        private _tableCreatorPay:number;
        //房费
        private _tableCost:number;
        //能否同ip
        private _ifCanSameIP:boolean;
        //是否检测GPS
        private _ifCheckGps:boolean;       

        private _ifGangLeJiuYou:boolean;

        private _canChi:boolean;
        private _zhanZhuang:boolean;
        private _gangFen:boolean;
        private _daiDaPai:boolean;
        private _whoLose:boolean;
        private _tableWhere:number;

        public constructor(){    
            this._cellScore=1;
            this._isLaPaoZuo=false;
            this._isQiDui=true;
            this._ifCanHu7Dui = true;
            this._isGangKai=true;
            this._isBuKao = false;
            this._isYiPaoDuoXiang=false;
            this._goldRoomBaseIdx=0;
            this._isRecordRoom=false;
            this._tableCreatorID=0;
            this._tableCreatorChair = LQMJMahjongDef.gInvalidChar;
            this._tableCode = "";
            this._setGameNum=1;
            this._alreadyGameNum=0;
            this._realGameNum=0;
            this._isOutTimeOp=false;
            this._isSaveTable=false;
            this._saveTableTime=30;
            this._tableCreatorPay=0;
            this._tableCost=0;
            this._ifCanSameIP=true;
            this._ifGangLeJiuYou = false;
            this._canChi = false;
            this._zhanZhuang = true;
            this._gangFen = true;
            this._daiDaPai = true;
            this._whoLose = true;
            this._ifCheckGps = false;
        }
        
        /**
         * 初始化
         * */
        public init(
            cellScore:number,
            isLaPaoZuo: boolean,
            isQiDui: boolean,
            ifCanHu7Dui:boolean,
            isGangKai: boolean,
            isBuKao: boolean,

            isYiPaoDuoXiang:boolean,
            goldRoomBaseIdx: number,
            isRecordRoom: boolean,
            tableCreatorID: number,
            tableCreatorChair:number,

            tableCode:string,
            setGameNum:number,
            alreadyGameNum:number,
            realGameNum:number,
            isOutTimeOp:boolean,

            isSaveTable:boolean,
            saveTableTime:number,
            tableCreatorPay:number,
            tableCost:number,
            IfCanSameIP:boolean,

            IfGangLeJiuYou:boolean,
            IfCanChi:boolean,
            IfGangFen:boolean,
            IfZhanZhuang:boolean,
            IfDaiDaPai:boolean,
            IfWhoLose:boolean,
            tableWhere:number,
            IfCheckGps:boolean
        ):void{      
            this._cellScore=cellScore;
            this._isLaPaoZuo=isLaPaoZuo;
            this._isQiDui=isQiDui;
            this._ifCanHu7Dui=ifCanHu7Dui;
            this._isGangKai=isGangKai;
            this._isBuKao = isBuKao;
            this._isYiPaoDuoXiang=isYiPaoDuoXiang;
            this._goldRoomBaseIdx = goldRoomBaseIdx;
            this._isRecordRoom = isRecordRoom;
            this._tableCreatorID = tableCreatorID;
            this._tableCreatorChair = tableCreatorChair;
            this._tableCode = tableCode;
            this._setGameNum=setGameNum;
            this._alreadyGameNum=alreadyGameNum;
            this._realGameNum=realGameNum;
            this._isOutTimeOp=isOutTimeOp;
            this._isSaveTable=isSaveTable;
            this._saveTableTime=saveTableTime;
            this._tableCreatorPay=tableCreatorPay;
            this._tableCost=tableCost;
            this._ifCanSameIP=IfCanSameIP;
            this._ifGangLeJiuYou = IfGangLeJiuYou;
            this._canChi = IfCanChi;
            this._zhanZhuang = IfZhanZhuang;
            this._whoLose = IfWhoLose;
            this._daiDaPai = IfDaiDaPai;
            this._gangFen = IfGangFen;
            this._tableWhere = tableWhere;
            this._ifCheckGps = IfCheckGps;
        }
        /**
         * 是否保留房间
         * */
        public get IsSaveTable():boolean{
            return this._isSaveTable;
        }
        /**
         * 保留时间
         * */
        public get SaveTableTime():number{
            return this._saveTableTime;
        }
        /**
         * 自主建房是否超时代打
        */
        public get isOutTimeOp():boolean{
            return this._isOutTimeOp;
        }
        /**
         * 房号
         */
        public get TableCode():string{
            return this._tableCode;
        }
        /**
         * 房主买单
         */
        public get IsTableCreatorPay():number{
            return this._tableCreatorPay;
        }
        /**
         * 房费
         */
        public get tableCost(): number {
            return this._tableCost;
        }
        /**
         * 金币场底金索引
         * */
        public get GoldRoomBaseIdx():number{
            return this._goldRoomBaseIdx;
        }
        /**
         * 房主ID
         * */
        public get tableCreatorID(): number {
            return this._tableCreatorID;
        }
        public set tableCreatorID(value:number){
            this._tableCreatorID=value;
        }
        /**
         * 房主椅子号
         * */
        public get tableCreatorChair(): number {
            return this._tableCreatorChair;
        }
        public set tableCreatorChair(value:number) {
            this._tableCreatorChair=value;
        }
        /**
         * 设置局数
         * */
        public get setGameNum():number {
            return this._setGameNum;
        }
        //GPS检测
        public get ifCheckGps(){
            return this._ifCheckGps;
        }
        /**
         * 已经游戏局数
         * */
        public get alreadyGameNum(): number{
            return this._alreadyGameNum;
        }
        /**
         * 已经游戏真实局数
         */
        public get realGameNum():number{
            return this._realGameNum;
        }
        /**
         * 是否打满了设置的局数
         * */
        public isPlayEnoughGameNum(addNum:number):boolean{
            let jushu:number=0;
            if(this._setGameNum == 0)
                jushu = 8;
            if(this._setGameNum == 1)
                jushu = 16;
            return this._alreadyGameNum >= jushu*addNum;
        }

        
        /**
         * 一嘴多少分
         * */
        public get cellScore():number{
            if(LQMJ.ins.iclass.isCreateRoom()){
                return this._cellScore;
            }
                       if(LQMJ.ins.iclass.getRoomData()){
                return LQMJ.ins.iclass.getRoomData().BaseMoney;
            }
            else{
                ReportError("房间尚未初始化，HBMJ.ins.iclass.getRoomData()取不到");
                return 1;
            }
        }
        
        /**
         * 开胡嘴数
         * */
        public get IsLaPaoZuo():boolean{
            return this._isLaPaoZuo;
        }
                public get IfGangLeJiuYou():boolean{
            return this._ifGangLeJiuYou;
        }
        /**
         * 天地胡清一色嘴数
         * */
        public get IsQiDui():boolean{
            return this._isQiDui;
        }

        public get IsGangKai():boolean{
            return this._isGangKai;
        }
        public get IsBuKao():boolean{
            return this._isBuKao;
        }
        public get IsYiPaoDuoXiang():boolean{
            return this._isYiPaoDuoXiang;
        }

        /**
         * 是否是记分场
         * */
        public get isJiFenRoom():boolean{
            return this._isRecordRoom;
        }

        /**
         * 是否能够胡7对
         */
        public get IfCanHu7Dui():boolean{
            return this._ifCanHu7Dui;
        }
        
        /**
         * 是否有效
         * */
        public get isValid():boolean{
            if(0 != this._tableCreatorID) {
                return true;
            }
            return false;
        }

        public get isWhoLose():boolean{
            return this._whoLose;
        }
        public get isDaiDaPai():boolean{
            return this._daiDaPai;
        }
        public get isZhanZhuang():boolean{
            return this._zhanZhuang;
        }
        public get isGangFen():boolean{
            return this._gangFen;
        }
        public get isCanChi():boolean{
            return this._zhanZhuang;
        }
        public get tableWhere():number{
            return this._tableWhere;
        }
        
        /**
         * 根据规则生成分享内容
         * */
        public get shareContext():string{
            var context:string="";
            
            //房号
            // if(this._tableCode.length > 0){
            //     context+=`房号:${this._tableCode},`;
            // }
            //记分场,金币场
            //context+=`${this._isRecordRoom ? "记分场":"金币场"},`;
            //底分
            // if(!this._isRecordRoom){
            //     context+=`${this.cellScore}分一嘴,`;
            // }
            //开胡
            //context+=`底番${this._baseScore==1?"1234":"2468"},`;
            //局数
            // if(this._ifCanSameIP) {
            //     context+=`同IP允许同桌,`;
            // }else{
            //     context+=`同IP不许同桌,`;
            // }
            if(this._setGameNum == 0)
                context += "8局,";
            if(this._setGameNum == 1)
                context += "16局,";
            if(this._tableCreatorPay == 1)
                context += "AA支付,";
            if(this._tableCreatorPay == 2)
                context += "房主支付,";
            if(this._tableCreatorPay == 3)
                context += "圈主支付,";
            if(this._whoLose)
                context += "赢倒三家有,";
            if(!this._whoLose)
                context += "谁打谁出分,";
            if(!this._canChi)
                context += "不能吃牌,";
            if(this._daiDaPai)
                context += "带大牌,";
            if(!this._daiDaPai)
                context += "不带大牌,";
            if(this._zhanZhuang)
                context += "占庄,";
            if(!this._zhanZhuang)
                context += "不带占庄,"; 
            if(this._gangFen)   
                context += "明杠暗杠,";
            if(!this._gangFen)   
                context += "不带明杠暗杠,";
            return context;
        }
        
        /**
         * 需要隐藏玩家余额
         * */
        public get needHideUserMoney():boolean{
            if(this.isValid && !this._isRecordRoom){
                return false;
            }
            return true;
        }
    }
    
    /**
     * 合肥麻将计时器
     * */
    export class LQMJTimer{
        //计时器id
        private _timerid:number;
        public get TimerID():number{
            return this._timerid;
        }
        
        //计时器总共tick次数
        private _totalTickNum:number;
        
        //计时器已经tick次数
        private _alreadyTickNum:number;
        
        //计时器是否正在运行
        private _isRuning:boolean;
        
        //当前时间
        private _curTime:number;
        
        //触发时间
        private _triggerTime:number;
        
        //椅子号
        private _chair:number;
        
        //计时器回调
        private _timerCallback : (timerid:number,chair:number,leftTickNum:number) => void;
        
        //计时器回调作用域
        private _thisObject: any;
        
        public constructor(){
            this.clear();
        }
        
        /**
         * 清理
         * */
        public clear():void{
            this._timerid = 0;
            this._totalTickNum=0;
            this._alreadyTickNum=0;
            this._isRuning=false;
            this._curTime=0;
            this._triggerTime=0;
            this._chair = LQMJMahjongDef.gInvalidChar;
            this._timerCallback = null;
            this._thisObject = null;
        }
        
        /**
         * 设置计时器
         * */
        public setTimer(timerid: number,timerLen: number,chair: number,timerCallback: (timerid: number,chair: number,leftTickNum: number) => void,thisObject: any):void{
            
            this.clear();
            
            this._timerid = timerid;
            this._totalTickNum = timerLen;
            this._chair=chair;
            this._triggerTime=1.0; 
            this._timerCallback = timerCallback;
            this._thisObject = thisObject;
        }
        
        /**
         * 开始
         * */
        public start():void{
            this._isRuning=true;
        }
        
        /**
         * 停止运行
         * */
        public stop():void{
            this._isRuning = false;
        }
        
        /**
         * 重新开始
         * */
        public reStart():void{
            this._isRuning=true;
            this._alreadyTickNum=0;
            this._curTime=0;
        }
        
        /**
         * 计时器走一次
         * */
        public tick(timeStamp : number):void{
            
            timeStamp /= 1000;
            
            if(this._isRuning){
                
                this._curTime += timeStamp;
                
                if(this._curTime >= this._triggerTime){
                    
                    ++this._alreadyTickNum;
                    this._curTime = 0.0;
                    
                    if((null != this._timerCallback) && (null != this._thisObject)){
                        this._timerCallback.call(this._thisObject,this._timerid,this._chair,this._totalTickNum - this._alreadyTickNum);
                    }
                    
                    this._isRuning = this._alreadyTickNum < this._totalTickNum;
                }
                
            }
        }

        public runOnce():void{
            if(this._isRuning) {

                ++this._alreadyTickNum;
                this._curTime = 0.0;

                if((null != this._timerCallback) && (null != this._thisObject)) {
                    this._timerCallback.call(this._thisObject,this._timerid,this._chair,this._totalTickNum - this._alreadyTickNum);
                }

                this._isRuning = this._alreadyTickNum < this._totalTickNum;
            }
        }

        /**
         * 是否运行中
         * */
        public isRuning():boolean{
            return this._isRuning;
        }
    }
    
    /**
     * 合肥麻将打牌玩家
     * */
    export class LQMJOutCardPlayer{
        private _chair:number;
        private _card:number;
        
        public constructor(){
            this.clear();
        }
        
        /**
         * 出牌玩家椅子号
         * */
        public get Chair():number{
            return this._chair;
        }
        
        /**
         * 出牌玩家出的牌
         * */
        public get Card():number{
            return this._card;
        }
         
        /**
         * 玩家打出牌
         * */
        public playerOutCard(chair:number,card:number):void{
            this._chair = chair;
            this._card = card;
        }
        
        /**
         * 是否有效
         * */
        public get isValid():boolean{
            if((LQMJMahjongDef.gInvalidChar != this._chair) && (LQMJMahjongDef.gInvalidMahjongValue != this._card)){
                return true;
            }
            return false;
        }
        
        /**
         * 清除
         * */
        public clear():void{
            this._chair = LQMJMahjongDef.gInvalidChar;
            this._card = LQMJMahjongDef.gInvalidMahjongValue;
        }
    }

    /**
     * 无为麻将计牌器
     * */
    export class LQMJRecordCard{
        //牌阵数据
        private _cardData:Array<number>;
        
        public constructor(){
            this._cardData = new Array<number>();
        }
        
        public init():void{
            this._cardData.splice(0,this._cardData.length);
            for(var i:number=0; i<39; i++){
                this._cardData.push(4);
            }
        }
        
        /**
         * 获取某张牌剩余张数
         * */
        public getCardLeftNum(card:number,checkAry:Array<number> = null):number{
            var logicValue: number = LQMJMahjongAlgorithm.GetMahjongLogicValue(card);
            var leftNum :number = this._cardData[logicValue];
            
            if((leftNum > 0) && (null != checkAry)){
                for(var i:number=0; i<checkAry.length; i++){
                    if(card == checkAry[i]){
                        --leftNum;
                    }
                    if(leftNum <= 0){
                        break;
                    }
                }
            }
            
            return leftNum;
        }
        
        /**
         * 打出一张牌
         * */
        public outACard(card:number):void{
            this.delCardNum(card,1);
        }
        
        /**
         * 吃了一张牌
         * */
        public chiACard(card: number):void{
            this.delCardNum(card,1);
        }

        /**
         * 碰了一张牌
         * */
        public pengACard(card: number):void{
            this.delCardNum(card,2);
        }
        
        /**
         * 杠了一张牌
         * */
        public gangACard(card: number):void{
            this.delCardNum(card,4);
        }
        
        /**
         * 删除牌
         * */
        private delCardNum(card:number,delNum:number):void{
            var logicValue: number = LQMJMahjongAlgorithm.GetMahjongLogicValue(card);
            if(this._cardData[logicValue] >= delNum){
                this._cardData[logicValue] -= delNum;
            }else{
                this._cardData[logicValue]=0;
            }
        }
    }
    /// <summary>
    /// 听牌类型
    /// </summary>
    export enum enTinType
    {
        /// <summary>
        /// 不成模式
        /// </summary>
        TinType_Nothing = 0,
        /// <summary>
        /// 成组模式,例如:3万,4万,5万成一组 或者三张东风,都是成一组
        /// </summary>
        TinType_Tirple = 1,
        /// <summary>
        /// 含对模式,例如:3万,4万,5万 两个6万 成为含对模式
        /// </summary>
        TinType_HavePair = 2,
        /// <summary>
        /// 需对模式,例如:3万,4万,5万,7万,8万 成为需对模式(如果要想听牌,必须其他牌组必须含对)
        /// </summary>
        TinType_NeedPair = 3,
        /// <summary>
        /// 自由组合对模式,例如:3万,4万,5万,5万,5万 本身成为自由组合对模式(如果要想听牌,其他牌即可含对,也可需对)
        /// </summary>
        TinType_FreePair = 5,
        /// <summary>
        /// 需成组模式,例如:3万,4万,5万,8万,(如果要想听牌,其他牌必须都成组,所以叫需成组模式)
        /// </summary>
        TinType_OtherTriple = 7,
        /// <summary>
        /// 未知
        /// </summary>
        TinType_Unknown = 13
    }
    /// <summary>
    /// 三元组牌类型
    /// </summary>
    export enum enTripleType {
        /// <summary>
        /// 未知
        /// </summary>
        TripleType_Unknown = 0,
        /// <summary>
        /// 暗杠
        /// </summary>
        TripleType_AGang = 1,
        /// <summary>
        /// 明杠
        /// </summary>
        TripleType_MGang = 2,
        /// <summary>
        /// 补杠
        /// </summary>
        TripleType_BGang = 3,
        /// <summary>
        /// 碰
        /// </summary>
        TripleType_Peng = 4,
        /// <summary>
        /// 刻
        /// </summary>
        TripleType_Echo = 5,
        /// <summary>
        /// 顺
        /// </summary>
        TripleType_Flash = 6
    }
    
    
    //
    //结构体定义
    //
    
    /**
     * 听牌提示
     * */
    export class TingCardTip{
        private _tingCard:number;
        private _maxFanNum:number;
        private _leftCardNum:number;
        public constructor(tingCard:number,fanNum:number,leftNum:number){
            this._tingCard = tingCard;
            this._maxFanNum = fanNum;
            this._leftCardNum = leftNum;
        }
        
        /**
         * 听的牌
         * */
        public get tingCard():number{
            return this._tingCard;
        }
        /**
         * 听牌剩余张数
         * */
        public get leftCardNum():number{
            return this._leftCardNum;
        }
        /**
         * 可以胡的最大番数
         * */
        public get maxFanNum():number{
            return this._maxFanNum;
        }
    }

    /// <summary>
    /// 解析后的三元组定牌阵
    /// </summary>
    export class clsParseTriple
    {
        //特征牌
        public cTokenCard:number;
        //牌阵
        public cCardAry:Array<number> = new Array<number>();
        //三元组类型
        public enTripleType:enTripleType;

        public constructor(){
            this.Clear();
        }
        public Clear():void
        {
            this.cTokenCard = LQMJMahjongDef.gInvalidMahjongValue;
            this.cCardAry.splice(0,this.cCardAry.length);
            this.enTripleType = enTripleType.TripleType_Unknown;
        }
        /// <summary>
        /// 特征数,这是一个很重要的属性,大量使用在算翻中  
        /// 1,如果一个牌组是顺子,他的特征数就是100+最小牌的牌码
        /// 2,如果一个牌组是刻或者杠(算翻中,刻和杠在大部分情况下是同样的),他的特征数就是200+最小牌的牌码
        /// 基于这个属性,可以快速方便地进行算翻处理
        /// </summary>
        /// <returns></returns>
        public GetTokenNum():number
        {
            if (this.enTripleType == enTripleType.TripleType_Unknown)
            {
                return 0;
            }
            var wBaseNum:number = (this.enTripleType == enTripleType.TripleType_Flash ? 100 : 200);
            return (wBaseNum + LQMJMahjongAlgorithm.GetMahjongLogicValue(this.cTokenCard));
        }

        /// <summary>
        /// 是否有效
        /// </summary>
        /// <returns></returns>
        public get isValid():boolean
        {
                if ((LQMJMahjongDef.gInvalidMahjongValue != this.cTokenCard) && (enTripleType.TripleType_Unknown != this.enTripleType)){
                    return true;
                }
                return false;
        }

        /// <summary>
        /// 是否有19牌
        /// </summary>
        /// <returns></returns>
        /*public get have19Card():boolean
        {
                if (!this.isValid)
                {
                    return false;
                }
                if (XZMJMahjongDef.gMahjongColor_Zhi == XZMJMahjongAlgorithm.GetMahjongColor(this.cTokenCard))
                {
                    return false;
                }
                for (var i = 0; i < this.cCardAry.length; i++)
                {
                    if ((1 == XZMJMahjongAlgorithm.GetMahjongValue(this.cCardAry[i])) || (9 == XZMJMahjongAlgorithm.GetMahjongValue(this.cCardAry[i])))
                    {
                        return true;
                    }
                }
                return false;
            
        }*/
    }

   /// <summary>
    /// 普通胡牌结构
    /// </summary>
    export class clsNormalParseStruct
    {
        /// <summary>
        /// 解析后的对子
        /// </summary>
        public pair:number;
        /// <summary>
        /// 三元组集合
        /// </summary>
        public triplyAry:Array<clsParseTriple>;
        /// <summary>
        /// 活动牌
        /// </summary>
        public activeCard:Array<number>;

        public constructor(){
            this.triplyAry = new Array<clsParseTriple>();
            this.activeCard = new Array<number>();
        }

        public Clear():void
        {
            this.pair = LQMJMahjongDef.gInvalidMahjongValue;
            this.triplyAry.splice(0,this.triplyAry.length);
            this.activeCard.splice(0,this.activeCard.length);
        }

        public get isValid():boolean
        {

            return this.pair != LQMJMahjongDef.gInvalidMahjongValue;

        }
    }

    /// <summary>
    /// 解析结构
    /// </summary>
    export class clsParseResult
    {
        /// <summary>
        /// 是否有效
        /// </summary>
        public isValid:boolean
        /// <summary>
        /// 是否7对子牌型
        /// </summary>
        public is7Pair:boolean
        /// <summary>
        /// 胡的牌
        /// </summary>
        public huCard:number

        /// <summary>
        /// 7对子牌阵数据
        /// </summary>
        public cardAryBy7Pair:Array<number>;

        /// <summary>
        /// 普通解析结构
        /// </summary>
        public normalParse:clsNormalParseStruct;

        public constructor(){
            this.cardAryBy7Pair = new Array<number>();
            this.normalParse = new clsNormalParseStruct();
            this.Clear();
        }

        /// <summary>
        /// 清除
        /// </summary>
        public Clear():void
        {
            this.isValid = false;
            this.is7Pair = false;
            this.huCard = LQMJMahjongDef.gInvalidMahjongValue;

            this.cardAryBy7Pair.splice(0,this.cardAryBy7Pair.length);
            this.normalParse.Clear();
        }
    }

    /// <summary>
    /// 单个定牌
    /// </summary>
    export class clsSingleFixedCard
    {
        /// <summary>
        /// 牌值
        /// </summary>
        public card:number
        /// <summary>
        /// 定牌类型
        /// </summary>
        public fixedType:enFixedCardType;
        /// <summary>
        /// 是否弃杠转碰
        /// </summary>
        //public isGiveUpGang2Peng { get; set; }
        public constructor(){
            this.Clear();
        }
	    /// <summary>
	    /// 清除
	    /// </summary>
	    public Clear():void
	    {
            this.card = LQMJMahjongDef.gInvalidMahjongValue;
            this.fixedType = enFixedCardType.FixedCardType_UnKnown;
            //isGiveUpGang2Peng = false;
	    }

        /// <summary>
        /// 复制到目标
        /// </summary>
        /// <param name="dest"></param>
        public CopyTo(dest:clsSingleFixedCard):void
        {
            dest.card = this.card;
            dest.fixedType = this.fixedType;
            //dest.isGiveUpGang2Peng = this.isGiveUpGang2Peng;
        }
        
        public changePeng2Gang(card:number):boolean{
            if((enFixedCardType.FixedCardType_Peng == this.fixedType) && (card == this.card)) {
                this.fixedType = enFixedCardType.FixedCardType_BGang;
                return true;
            }

            return false;
        }
    }
    /// <summary>
    /// 定牌包装
    /// </summary>
    export class clsFixedCard
    {
        //定牌数据
        private _fixedCardList:Array<clsSingleFixedCard> = new Array<clsSingleFixedCard>();

        /// <summary>
        /// 定牌
        /// </summary>
        public fixedCard():Array<clsSingleFixedCard> {  return this._fixedCardList }

        public constructor(){
            this.Clear();
        }
        /// <summary>
        /// 添加一个
        /// </summary>
        /// <param name="cCard"></param>
        /// <param name="pos"></param>
        /// <param name="type"></param>
        public Add(cbCard:number, type:enFixedCardType):void
        {
            var temp:clsSingleFixedCard=new clsSingleFixedCard();
            temp.card=cbCard;
            temp.fixedType=type;
            this._fixedCardList.push(temp);
        }
        
        /**
		 * 碰转杠
		 * */
        public changePeng2Gang(card: number): void {
            for(var i:number=0; i<this._fixedCardList.length; i++){
                if(this._fixedCardList[i].changePeng2Gang(card)){
                    return;
                }
            }
        }

        /// <summary>
        /// 清除数据
        /// </summary>
        public Clear():void 
        {
            this._fixedCardList.splice(0,this._fixedCardList.length);
        }

        /// <summary>
        /// 拷贝到目标
        /// </summary>
        /// <param name="dest"></param>
        public CopyTo(dest:clsFixedCard):void 
        {
            dest.Clear();
            for(var i=0;i<this._fixedCardList.length;i++)
            {
                dest._fixedCardList.push(this._fixedCardList[i]);
            }
        }

        /// <summary>
        /// 从源拷贝
        /// </summary>
        /// <param name="src"></param>
        /// <returns></returns>
        // public clsFixedCard CopyFrom(ref clsFixedCard src)
        // {
        //     this.Clear();
        //     foreach(var fixedCard in src.fixedCard)
        //     {
        //         this.Add(fixedCard.card,fixedCard.fixedType,fixedCard.isGiveUpGang2Peng);
        //     }
        //     return this;
        // }
    }

    /// <summary>
    /// 模式解析中的对组包装
    /// 例如:将牌22333567789解析为
    /// 对:22
    /// 牌组:333,567,789
    /// 其中,333,567,789作为clsParseTriple加入到tagTripleList中
    /// </summary>
    export class clsPairTripleWrapper
    {
        //解析后的对子
        public cPair:number;

        //解析后的三元组
        public tagTripleList:Array<clsParseTriple> = new Array<clsParseTriple>();

        //三元组个数
        public wTripleCount:number;

        public constructor(){
            this.Clear();
        }

        public AddTriple(triple:clsParseTriple):boolean
        {
            if (this.wTripleCount >= 4)
            {
                return false;
            }
            this.tagTripleList.push(triple);
            ++this.wTripleCount;
            return true;
        }

        public Clear():void
        {
            this.cPair = LQMJMahjongDef.gInvalidMahjongValue;
            this.wTripleCount = 0;
            this.tagTripleList.splice(0,this.tagTripleList.length)
        }

        public get tripleValue():number
        {
            var wTripleValue = 0;
            for (var i = 0; i < this.wTripleCount; i++)
            {
                wTripleValue += this.tagTripleList[i].GetTokenNum();
            }
            return wTripleValue;
        }
    };
