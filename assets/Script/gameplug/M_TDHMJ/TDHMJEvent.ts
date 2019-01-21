import { startLevel } from '../../CustomType/CallUMengParam';
const {ccclass, property} = cc._decorator;

export default class TDHMJEvent extends cc.Event.EventCustom {


    /**
         * 消息标识
         * */
        public static TDHMJ_EVENT_TYPE: string = "event_hnmj_event_type";
    
        //
        //=====消息码定义
        //
        
        /**
         * 准备
         * */
        public static msg_ready:number=1;
        /**
         * 自己进入
         * */
        public static msg_playerComeing:number=2;
        /**
         * 游戏开始
         * */
        public static msg_gameStart:number=3;
        /**
         * 玩家抓牌墩
         * */
        public static msg_playerHoldTrickCard: number = 4;
        /**
         * 开始发牌
         * */
        public static msg_startSendCard:number=5;
        /**
         * 发牌结束
         * */
        public static msg_sendCardComplete:number=6;
        /**
         * 开始换牌
         * */
        public static msg_startChangeCard:number=7;
        /**
         * 添加一张要换的牌
         * */
        public static msg_addAChangeCard:number=8;
        /**
         * 删除一张要换的牌
         * */
        public static msg_delAChangeCard:number=9;
        /**
         * 换牌结束
         * */
        public static msg_changeCardComplete:number=10;
        /**
         * 开始定缺
         * */
        public static msg_startDingQue:number=11;
        /**
         * 定缺花色
         * */
        public static msg_dingQueColor:number=12;
        /**
         * 打出一张牌
         * */
        public static msg_outACard:number=13;
        /**
         * 抢杠
         * */
        public static msg_qiangGang:number=15;
        /**
         * 杠牌
         * */
        public static msg_gangCard:number=16;
        /**
         * 吃牌
         * */
        public static msg_chiCard:number=17;
        /**
         * 继续游戏
         * */
        public static msg_goongame:number=18;
        /**
         * 投票碰
         * */
        public static msg_vote:number=19;
        /**
         * 自摸
         * */
        public static msg_zimo:number=22;
        /**
         * 整理手牌结束
         * */
        public static msg_arrangeHandCardComplete : number = 23;
        /**
         * 抓牌骰子播放完毕
         * */
        public static msg_holdCardSZComplete:number=24;
        /**
         * 换牌骰子播放完毕
         * */
        public static msg_changeCardSZComplete:number=25;
        /**
         * 合肥麻将序列帧动画循环完成
         * */
        public static msg_hfmjFrameAni_loop_complete:number=26;
        /**
         * 合肥麻将动画完成
         * */
        public static msg_hfmjFrameAni_complete:number=27;
        /**
         * 房主信息
         * */
        public static msg_tableCreatorInfo:number=28;
        /**
         * 创建桌子
         * */
        public static msg_startCreateTable:number=29;
        /**
         * 刷新手牌
         * */
        public static msg_reflashHandCard=31;
        /**
         * 自己手牌弹起,
         */
        public static msg_selfCardUp:number=40;

        public static msg_pao:number=41;

        public static msg_la:number=42;

        public static msg_baoting:number=43;

        public static msg_addGameNum:number=44;

        //
        //=====属性定义 
        //
        
        //息码
        private _msgCode: number;
        //带入的参数
        private _parm: any;
    
        public constructor(msgCode: number,parm?: any,data?: any) {
    
            super(TDHMJEvent.TDHMJ_EVENT_TYPE,true);
            this._msgCode = msgCode;
            this._parm = parm;
            this.setUserData(data);
        }
    
        /**
         * 消息码
         * */
        public get msgCode(): number {
            return this._msgCode;
        }
    
        /**
         * 传入的参数
         * */
        public get parm(): any {
            return this._parm;
        }
    
        /**
         * 克隆一个
         * */
        public clone(): TDHMJEvent {
            return new TDHMJEvent(this._msgCode,this._parm,this.getUserData());
        }
}
