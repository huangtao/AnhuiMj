import { UyiObject } from "../Serializer/UyiObject";
import { SerializerCreator } from "../Serializer/SerializerCreator";
import { TSRH } from "../Serializer/TypeSerializerRegisterHandle";
import {GameIF} from "./GameIF";
export module M_PDK_GameMessage {
    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_Attribute extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 11;
            this.$T="M_PDK_GameMessage.CMD_S_Attribute"; 
        }
       /**
        *
        */
       public tableCreator: number = 0;
       /**
        *
        */
       public roomType: number = 0;
       /**
        *
        */
       public tableCostType: number = 0;
       /**
        *
        */
       public gameModel: number = 0;
       /**
        *
        */
       public zhuaNiaoScore: number = 0;
       /**
        *
        */
       public moneyType: number = 0;
       /**
        *
        */
       public gameCount: number[] = null;
       /**
        *
        */
       public tableCreateWaitTime: number = 0;
       /**
        *
        */
       public tableCostNum: number = 0;
       /**
        *
        */
       public forceLeftMoney: number = 0;
       /**
        *
        */
       public forceLeftMoneyType: number = 0;
       /**
        *
        */
       public hasForceLeft: boolean = false;
       /**
        *
        */
       public tableID: number = 0;
       /**
        *
        */
       public isgroup: boolean = false;
       /**
        *
        */
       public PlayerNum: number = 0;
       /**
        *
        */
       public mustOut: number = 0;
       /**
        *
        */
       public have2OutA: boolean = false;
       /**
        *
        */
       public spadesRedPeach3: number = 0;
       /**
        *
        */
       public spades3MustOut: boolean = false;
       /**
        *
        */
       public redPeach3MustOut: boolean = false;
       /**
        *
        */
       public bomb: boolean = false;
       /**
        *
        */
       public FZBP: boolean = false;
       /**
        *
        */
       public SZTW: boolean = false;
       /**
        *
        */
       public showRemainNum: boolean = false;
       /**
        *
        */
       public ifcansameip: boolean = false;
       /**
        *
        */
       public CheckGps: boolean = false;
       /**
        *
        */
       public startNum: number = 0;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_S_Attribute", function () {return new CMD_S_Attribute()})
    TSRH.RSerializer("13323", "14|bomb&14|CheckGps&4|forceLeftMoney&4|forceLeftMoneyType&14|FZBP&!4|gameCount&4|gameModel&14|hasForceLeft&14|have2OutA&14|ifcansameip&14|isgroup&4|moneyType&4|mustOut&4|PlayerNum&14|redPeach3MustOut&4|roomType&14|showRemainNum&14|spades3MustOut&4|spadesRedPeach3&4|startNum&14|SZTW&5|tableCostNum&4|tableCostType&4|tableCreateWaitTime&4|tableCreator&5|tableID&4|zhuaNiaoScore", "M_PDK_GameMessage.CMD_S_Attribute");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_GameStart extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 12;
            this.$T="M_PDK_GameMessage.CMD_S_GameStart"; 
        }
       /**
        *
        */
       public cards: number[] = null;
       /**
        *
        */
       public FirstOperationChair: number = 0;
       /**
        *
        */
       public FirstCard: number = 0;
       /**
        *
        */
       public zhuaNiaoChair: number = 0;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_S_GameStart", function () {return new CMD_S_GameStart()})
    TSRH.RSerializer("13324", "13|cards&1|FirstCard&3|FirstOperationChair&4|zhuaNiaoChair", "M_PDK_GameMessage.CMD_S_GameStart");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_GameRoundResult extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 14;
            this.$T="M_PDK_GameMessage.CMD_S_GameRoundResult"; 
        }
       /**
        *
        */
       public chairList: number[] = null;
       /**
        *
        */
       public scoreInfoList: string[] = null;
       /**
        *
        */
       public baoPeiList: boolean[] = null;
       /**
        *
        */
       public bombList: number[] = null;
       /**
        *
        */
       public zhuaNiaoList: number[] = null;
       /**
        *
        */
       public haveCardList: number[] = null;
       /**
        *
        */
       public menGuoList: number[] = null;
       /**
        *
        */
       public dataList: number[] = null;
       /**
        *
        */
       public nameList: string[] = null;
       /**
        *
        */
       public cardsList: number[][] = null;
       /**
        *
        */
       public isWinList: number[] = null;
       /**
        *
        */
       public gameNum: string = "";
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_S_GameRoundResult", function () {return new CMD_S_GameRoundResult()})
    TSRH.RSerializer("13326", "!14|baoPeiList&!4|bombList&!13|cardsList&!3|chairList&!4|dataList&12|gameNum&!4|haveCardList&!4|isWinList&!4|menGuoList&!12|nameList&!12|scoreInfoList&!4|zhuaNiaoList", "M_PDK_GameMessage.CMD_S_GameRoundResult");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_OutCard extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 15;
            this.$T="M_PDK_GameMessage.CMD_S_OutCard"; 
        }
       /**
        *
        */
       public chair: number = 0;
       /**
        *
        */
       public cards: number[] = null;
       /**
        *
        */
       public cardType: number = 0;
       /**
        *
        */
       public nextChair: number = 0;
       /**
        *
        */
       public canOut: boolean = false;
       /**
        *
        */
       public isRoundEnd: boolean = false;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_S_OutCard", function () {return new CMD_S_OutCard()})
    TSRH.RSerializer("13327", "14|canOut&13|cards&4|cardType&3|chair&14|isRoundEnd&0|nextChair", "M_PDK_GameMessage.CMD_S_OutCard");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_GameContext_OutCard extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 21;
            this.$T="M_PDK_GameMessage.CMD_S_GameContext_OutCard"; 
        }
       /**
        *
        */
       public cards: number[] = null;
       /**
        *
        */
       public nowOprationChair: number = 0;
       /**
        *
        */
       public lastOutCardChair: number = 0;
       /**
        *
        */
       public lastOutCard: number[] = null;
       /**
        *
        */
       public lastOutCardType: number = 0;
       /**
        *
        */
       public playerChair: number[] = null;
       /**
        *
        */
       public playerCardsCount: number[] = null;
       /**
        *
        */
       public playerOutCards: number[][] = null;
       /**
        *
        */
       public gameCount: number[] = null;
       /**
        *
        */
       public CanOut: boolean = false;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_S_GameContext_OutCard", function () {return new CMD_S_GameContext_OutCard()})
    TSRH.RSerializer("13333", "14|CanOut&13|cards&!4|gameCount&13|lastOutCard&2|lastOutCardChair&4|lastOutCardType&2|nowOprationChair&!4|playerCardsCount&!3|playerChair&!13|playerOutCards", "M_PDK_GameMessage.CMD_S_GameContext_OutCard");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_GameContext_Interval extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 22;
            this.$T="M_PDK_GameMessage.CMD_S_GameContext_Interval"; 
        }
       /**
        *
        */
       public chair: number[] = null;
       /**
        *
        */
       public userState: number[] = null;
       /**
        *
        */
       public gameCount: number[] = null;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_S_GameContext_Interval", function () {return new CMD_S_GameContext_Interval()})
    TSRH.RSerializer("13334", "!3|chair&!4|gameCount&!4|userState", "M_PDK_GameMessage.CMD_S_GameContext_Interval");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_TableCreator extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 23;
            this.$T="M_PDK_GameMessage.CMD_S_TableCreator"; 
        }
       /**
        *
        */
       public chair: number = 0;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_S_TableCreator", function () {return new CMD_S_TableCreator()})
    TSRH.RSerializer("13335", "4|chair", "M_PDK_GameMessage.CMD_S_TableCreator");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_PlayerScore extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 17;
            this.$T="M_PDK_GameMessage.CMD_S_PlayerScore"; 
        }
       /**
        *
        */
       public score: number[] = null;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_S_PlayerScore", function () {return new CMD_S_PlayerScore()})
    TSRH.RSerializer("13329", "!4|score", "M_PDK_GameMessage.CMD_S_PlayerScore");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_GameCreatePlease extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 31;
            this.$T="M_PDK_GameMessage.CMD_S_GameCreatePlease"; 
        }
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_S_GameCreatePlease", function () {return new CMD_S_GameCreatePlease()})
    TSRH.RSerializer("13343", "", "M_PDK_GameMessage.CMD_S_GameCreatePlease");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_ScoreView extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 33;
            this.$T="M_PDK_GameMessage.CMD_S_ScoreView"; 
        }
       /**
        *
        */
       public chairList: number[] = null;
       /**
        *
        */
       public nameList: string[] = null;
       /**
        *
        */
       public bombList: number[][] = null;
       /**
        *
        */
       public zhuaNiaoList: number[][] = null;
       /**
        *
        */
       public menGuoList: number[][] = null;
       /**
        *
        */
       public haveCardList: number[][] = null;
       /**
        *
        */
       public dataList: number[][] = null;
       /**
        *
        */
       public isWinList: number[][] = null;
       /**
        *
        */
       public scoreInfoList: string[][] = null;
       /**
        *
        */
       public baoPeiList: boolean[][] = null;
       /**
        *
        */
       public isExit: boolean = false;
       /**
        *
        */
       public gameNum: string = "";
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_S_ScoreView", function () {return new CMD_S_ScoreView()})
    TSRH.RSerializer("13345", "!!14|baoPeiList&!!4|bombList&!3|chairList&!!4|dataList&12|gameNum&!!4|haveCardList&14|isExit&!!4|isWinList&!!4|menGuoList&!12|nameList&!!12|scoreInfoList&!!4|zhuaNiaoList", "M_PDK_GameMessage.CMD_S_ScoreView");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_TableState extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 34;
            this.$T="M_PDK_GameMessage.CMD_S_TableState"; 
        }
       /**
        *
        */
       public chair: number[] = null;
       /**
        *
        */
       public ready: boolean[] = null;
       /**
        *
        */
       public master: number = 0;
       /**
        *
        */
       public isend: boolean = false;
       /**
        *
        */
       public surplusTimer: number = 0;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_S_TableState", function () {return new CMD_S_TableState()})
    TSRH.RSerializer("13346", "!3|chair&14|isend&3|master&!14|ready&4|surplusTimer", "M_PDK_GameMessage.CMD_S_TableState");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_DissolveTable extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 35;
            this.$T="M_PDK_GameMessage.CMD_S_DissolveTable"; 
        }
       /**
        *
        */
       public sponsor: number = 0;
       /**
        *
        */
       public member: number[] = null;
       /**
        *
        */
       public memberflag: boolean[] = null;
       /**
        *
        */
       public result: number = 0;
       /**
        *
        */
       public chair: number = 0;
       /**
        *
        */
       public timer: number = 0;
       /**
        *
        */
       public chairName: string = "";
       /**
        *
        */
       public sponsorName: string = "";
       /**
        *
        */
       public memberName: string[] = null;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_S_DissolveTable", function () {return new CMD_S_DissolveTable()})
    TSRH.RSerializer("13347", "4|chair&12|chairName&!4|member&!14|memberflag&!12|memberName&4|result&4|sponsor&12|sponsorName&4|timer", "M_PDK_GameMessage.CMD_S_DissolveTable");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_ForceLeftSuccess extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 36;
            this.$T="M_PDK_GameMessage.CMD_S_ForceLeftSuccess"; 
        }
       /**
        *
        */
       public chair: number = 0;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_S_ForceLeftSuccess", function () {return new CMD_S_ForceLeftSuccess()})
    TSRH.RSerializer("13348", "3|chair", "M_PDK_GameMessage.CMD_S_ForceLeftSuccess");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_TableCreatorLeftSuccess extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 37;
            this.$T="M_PDK_GameMessage.CMD_S_TableCreatorLeftSuccess"; 
        }
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_S_TableCreatorLeftSuccess", function () {return new CMD_S_TableCreatorLeftSuccess()})
    TSRH.RSerializer("13349", "", "M_PDK_GameMessage.CMD_S_TableCreatorLeftSuccess");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_ShowCardTypeSelf extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 38;
            this.$T="M_PDK_GameMessage.CMD_S_ShowCardTypeSelf"; 
        }
       /**
        *
        */
       public chair: number = 0;
       /**
        *
        */
       public cardType: number = 0;
       /**
        *
        */
       public card: number = 0;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_S_ShowCardTypeSelf", function () {return new CMD_S_ShowCardTypeSelf()})
    TSRH.RSerializer("13350", "1|card&4|cardType&3|chair", "M_PDK_GameMessage.CMD_S_ShowCardTypeSelf");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_ShowMsg extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 50;
            this.$T="M_PDK_GameMessage.CMD_S_ShowMsg"; 
        }
       /**
        *
        */
       public type: number = 0;
       /**
        *
        */
       public msg: string = "";
       /**
        *
        */
       public isexit: boolean = false;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_S_ShowMsg", function () {return new CMD_S_ShowMsg()})
    TSRH.RSerializer("13362", "14|isexit&12|msg&4|type", "M_PDK_GameMessage.CMD_S_ShowMsg");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_FinishPoker extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 39;
            this.$T="M_PDK_GameMessage.CMD_S_FinishPoker"; 
        }
       /**
        *
        */
       public chair: boolean[] = null;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_S_FinishPoker", function () {return new CMD_S_FinishPoker()})
    TSRH.RSerializer("13351", "!14|chair", "M_PDK_GameMessage.CMD_S_FinishPoker");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_DropCards extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 40;
            this.$T="M_PDK_GameMessage.CMD_S_DropCards"; 
        }
       /**
        *
        */
       public chair: number = 0;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_S_DropCards", function () {return new CMD_S_DropCards()})
    TSRH.RSerializer("13352", "1|chair", "M_PDK_GameMessage.CMD_S_DropCards");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_DropCards extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 131;
            this.$T="M_PDK_GameMessage.CMD_C_DropCards"; 
        }
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_C_DropCards", function () {return new CMD_C_DropCards()})
    TSRH.RSerializer("13443", "", "M_PDK_GameMessage.CMD_C_DropCards");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_OutCard extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 103;
            this.$T="M_PDK_GameMessage.CMD_C_OutCard"; 
        }
       /**
        *
        */
       public cards: number[] = null;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_C_OutCard", function () {return new CMD_C_OutCard()})
    TSRH.RSerializer("13415", "13|cards", "M_PDK_GameMessage.CMD_C_OutCard");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_CreateTable extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 121;
            this.$T="M_PDK_GameMessage.CMD_C_CreateTable"; 
        }
       /**
        *
        */
       public tableCreatorPay: number = 0;
       /**
        *
        */
       public SetGameNum: number = 0;
       /**
        *
        */
       public PlayerNum: number = 0;
       /**
        *
        */
       public gameModel: number = 0;
       /**
        *
        */
       public mustOut: number = 0;
       /**
        *
        */
       public have2OutA: boolean = false;
       /**
        *
        */
       public spadesRedPeach3: number = 0;
       /**
        *
        */
       public spades3MustOut: boolean = false;
       /**
        *
        */
       public redPeach3MustOut: boolean = false;
       /**
        *
        */
       public bomb: boolean = false;
       /**
        *
        */
       public FZBP: boolean = false;
       /**
        *
        */
       public SZTW: boolean = false;
       /**
        *
        */
       public zhuaNiaoScore: number = 0;
       /**
        *
        */
       public showRemainNum: boolean = false;
       /**
        *
        */
       public ifcansameip: boolean = false;
       /**
        *
        */
       public CheckGps: boolean = false;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_C_CreateTable", function () {return new CMD_C_CreateTable()})
    TSRH.RSerializer("13433", "14|bomb&14|CheckGps&14|FZBP&4|gameModel&14|have2OutA&14|ifcansameip&4|mustOut&4|PlayerNum&14|redPeach3MustOut&4|SetGameNum&14|showRemainNum&14|spades3MustOut&4|spadesRedPeach3&14|SZTW&4|tableCreatorPay&4|zhuaNiaoScore", "M_PDK_GameMessage.CMD_C_CreateTable");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_Ready extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 122;
            this.$T="M_PDK_GameMessage.CMD_C_Ready"; 
        }
       /**
        *
        */
       public chair: number = 0;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_C_Ready", function () {return new CMD_C_Ready()})
    TSRH.RSerializer("13434", "3|chair", "M_PDK_GameMessage.CMD_C_Ready");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_DissolveTable extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 123;
            this.$T="M_PDK_GameMessage.CMD_C_DissolveTable"; 
        }
       /**
        *
        */
       public agree: boolean = false;
       /**
        *
        */
       public askagree: boolean = false;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_C_DissolveTable", function () {return new CMD_C_DissolveTable()})
    TSRH.RSerializer("13435", "14|agree&14|askagree", "M_PDK_GameMessage.CMD_C_DissolveTable");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_ForceLeft extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 124;
            this.$T="M_PDK_GameMessage.CMD_C_ForceLeft"; 
        }
       /**
        *
        */
       public PlayerID: number = 0;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_C_ForceLeft", function () {return new CMD_C_ForceLeft()})
    TSRH.RSerializer("13436", "5|PlayerID", "M_PDK_GameMessage.CMD_C_ForceLeft");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_RefreshMoney extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 125;
            this.$T="M_PDK_GameMessage.CMD_C_RefreshMoney"; 
        }
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_C_RefreshMoney", function () {return new CMD_C_RefreshMoney()})
    TSRH.RSerializer("13437", "", "M_PDK_GameMessage.CMD_C_RefreshMoney");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_TableCreatorLeft extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 127;
            this.$T="M_PDK_GameMessage.CMD_C_TableCreatorLeft"; 
        }
       /**
        *
        */
       public saveTable: boolean = false;
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_C_TableCreatorLeft", function () {return new CMD_C_TableCreatorLeft()})
    TSRH.RSerializer("13439", "14|saveTable", "M_PDK_GameMessage.CMD_C_TableCreatorLeft");


    /**
     *
     * @创建时间：2018年12月01日 14:55:10
     * @创建人员：PC-20180301ZDSR\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_StartGameOver extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 52;
            this.wSubCmdID = 128;
            this.$T="M_PDK_GameMessage.CMD_C_StartGameOver"; 
        }
   
    }
    SerializerCreator.Register("M_PDK_GameMessage.CMD_C_StartGameOver", function () {return new CMD_C_StartGameOver()})
    TSRH.RSerializer("13440", "", "M_PDK_GameMessage.CMD_C_StartGameOver");

}