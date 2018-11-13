import { UyiObject } from "../Serializer/UyiObject";
import { SerializerCreator } from "../Serializer/SerializerCreator";
import { TSRH } from "../Serializer/TypeSerializerRegisterHandle";
import {GameIF} from "./GameIF";
export module M_BiJi_GameMessage {
    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_Attribute extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 11;
            this.$T="M_BiJi_GameMessage.CMD_S_Attribute"; 
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
       public cellScore: number = 0;
       /**
        *
        */
       public joinMoney: number = 0;
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
       public checkIP: boolean = false;
       /**
        *
        */
       public extendBet: number = 0;
       /**
        *
        */
       public rubCard: number = 0;
       /**
        *
        */
       public tableID: number = 0;
       /**
        *
        */
       public cardTypeModel: number[] = null;
       /**
        *
        */
       public forBetRate: number[] = null;
       /**
        *
        */
       public havedropcard: boolean = false;
       /**
        *
        */
       public havexiscore: boolean = false;
       /**
        *
        */
       public isgroup: boolean = false;
       /**
        *
        */
       public havesanshunzi: boolean = false;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_Attribute", function () {return new CMD_S_Attribute()})
    TSRH.RSerializer("13067", "!4|cardTypeModel&4|cellScore&14|checkIP&4|extendBet&!4|forBetRate&4|forceLeftMoney&4|forceLeftMoneyType&!4|gameCount&4|gameModel&14|hasForceLeft&14|havedropcard&14|havesanshunzi&14|havexiscore&14|isgroup&4|joinMoney&4|moneyType&4|roomType&4|rubCard&5|tableCostNum&4|tableCostType&4|tableCreateWaitTime&4|tableCreator&5|tableID", "M_BiJi_GameMessage.CMD_S_Attribute");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_GameStart extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 12;
            this.$T="M_BiJi_GameMessage.CMD_S_GameStart"; 
        }
       /**
        *
        */
       public master: number = 0;
       /**
        *
        */
       public cards: number[] = null;
       /**
        *
        */
       public extendBet: number = 0;
       /**
        *
        */
       public remaster: boolean = false;
       /**
        *
        */
       public startcardType: number = 0;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_GameStart", function () {return new CMD_S_GameStart()})
    TSRH.RSerializer("13068", "13|cards&4|extendBet&3|master&14|remaster&4|startcardType", "M_BiJi_GameMessage.CMD_S_GameStart");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_NextGamePlease extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 41;
            this.$T="M_BiJi_GameMessage.CMD_S_NextGamePlease"; 
        }
       /**
        *
        */
       public sponsor: number = 0;
       /**
        *
        */
       public total: number[] = null;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_NextGamePlease", function () {return new CMD_S_NextGamePlease()})
    TSRH.RSerializer("13097", "4|sponsor&!4|total", "M_BiJi_GameMessage.CMD_S_NextGamePlease");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_BetStart extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 13;
            this.$T="M_BiJi_GameMessage.CMD_S_BetStart"; 
        }
       /**
        *
        */
       public master: number = 0;
       /**
        *
        */
       public masterList: number[] = null;
       /**
        *
        */
       public extendBet: number = 0;
       /**
        *
        */
       public cards: number[] = null;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_BetStart", function () {return new CMD_S_BetStart()})
    TSRH.RSerializer("13069", "13|cards&4|extendBet&3|master&!3|masterList", "M_BiJi_GameMessage.CMD_S_BetStart");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_SelectCardsStart extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 14;
            this.$T="M_BiJi_GameMessage.CMD_S_SelectCardsStart"; 
        }
       /**
        *
        */
       public card: number = 0;
       /**
        *
        */
       public cardType: number = 0;
       /**
        *
        */
       public bestSelectIndex: number[] = null;
       /**
        *
        */
       public cards: number[] = null;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_SelectCardsStart", function () {return new CMD_S_SelectCardsStart()})
    TSRH.RSerializer("13070", "!4|bestSelectIndex&1|card&13|cards&4|cardType", "M_BiJi_GameMessage.CMD_S_SelectCardsStart");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_SelectCards extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 15;
            this.$T="M_BiJi_GameMessage.CMD_S_SelectCards"; 
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
       public surplusTimer: number = 0;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_SelectCards", function () {return new CMD_S_SelectCards()})
    TSRH.RSerializer("13071", "13|cards&3|chair&4|surplusTimer", "M_BiJi_GameMessage.CMD_S_SelectCards");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_GameResult extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 16;
            this.$T="M_BiJi_GameMessage.CMD_S_GameResult"; 
        }
       /**
        *
        */
       public chair: number[] = null;
       /**
        *
        */
       public headcards: number[] = null;
       /**
        *
        */
       public oppocards: number[] = null;
       /**
        *
        */
       public lastcards: number[] = null;
       /**
        *
        */
       public cardType: number[] = null;
       /**
        *
        */
       public score: number[] = null;
       /**
        *
        */
       public headscore: number[] = null;
       /**
        *
        */
       public opposcore: number[] = null;
       /**
        *
        */
       public lastscore: number[] = null;
       /**
        *
        */
       public isEnd: boolean = false;
       /**
        *
        */
       public gameCount: number[] = null;
       /**
        *
        */
       public masterType: number = 0;
       /**
        *
        */
       public isDropCard: boolean[] = null;
       /**
        *
        */
       public xiScore: number[] = null;
       /**
        *
        */
       public xiScoreType: number[][] = null;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_GameResult", function () {return new CMD_S_GameResult()})
    TSRH.RSerializer("13072", "!4|cardType&!3|chair&!4|gameCount&13|headcards&!4|headscore&!14|isDropCard&14|isEnd&13|lastcards&!4|lastscore&4|masterType&13|oppocards&!4|opposcore&!4|score&!4|xiScore&!!4|xiScoreType", "M_BiJi_GameMessage.CMD_S_GameResult");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_MasterChange extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 18;
            this.$T="M_BiJi_GameMessage.CMD_S_MasterChange"; 
        }
       /**
        *
        */
       public master: number = 0;
       /**
        *
        */
       public msg: string = "";
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_MasterChange", function () {return new CMD_S_MasterChange()})
    TSRH.RSerializer("13074", "3|master&12|msg", "M_BiJi_GameMessage.CMD_S_MasterChange");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_GameContext_RobMaster extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 19;
            this.$T="M_BiJi_GameMessage.CMD_S_GameContext_RobMaster"; 
        }
       /**
        *
        */
       public cards: number[] = null;
       /**
        *
        */
       public robMasterRate: number[] = null;
       /**
        *
        */
       public surplusTimer: number = 0;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_GameContext_RobMaster", function () {return new CMD_S_GameContext_RobMaster()})
    TSRH.RSerializer("13075", "13|cards&!4|robMasterRate&4|surplusTimer", "M_BiJi_GameMessage.CMD_S_GameContext_RobMaster");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_GameContext_Bet extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 20;
            this.$T="M_BiJi_GameMessage.CMD_S_GameContext_Bet"; 
        }
       /**
        *
        */
       public master: number = 0;
       /**
        *
        */
       public masterRate: number = 0;
       /**
        *
        */
       public cards: number[] = null;
       /**
        *
        */
       public betRate: number[] = null;
       /**
        *
        */
       public extendBet: number = 0;
       /**
        *
        */
       public surplusTimer: number = 0;
       /**
        *
        */
       public istimeover: boolean = false;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_GameContext_Bet", function () {return new CMD_S_GameContext_Bet()})
    TSRH.RSerializer("13076", "!4|betRate&13|cards&4|extendBet&14|istimeover&3|master&4|masterRate&4|surplusTimer", "M_BiJi_GameMessage.CMD_S_GameContext_Bet");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_GameContext_SelectCards extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 21;
            this.$T="M_BiJi_GameMessage.CMD_S_GameContext_SelectCards"; 
        }
       /**
        *
        */
       public cardType: number = 0;
       /**
        *
        */
       public bestSelectIndex: number[] = null;
       /**
        *
        */
       public master: number = 0;
       /**
        *
        */
       public masterRate: number = 0;
       /**
        *
        */
       public cards: number[] = null;
       /**
        *
        */
       public betRate: number[] = null;
       /**
        *
        */
       public selectState: boolean[] = null;
       /**
        *
        */
       public surplusTimer: number = 0;
       /**
        *
        */
       public isGameEnd: boolean = false;
       /**
        *
        */
       public isDropCard: boolean[] = null;
       /**
        *
        */
       public isFinishCard: boolean = false;
       /**
        *
        */
       public poker: number[] = null;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_GameContext_SelectCards", function () {return new CMD_S_GameContext_SelectCards()})
    TSRH.RSerializer("13077", "!4|bestSelectIndex&!4|betRate&13|cards&4|cardType&!14|isDropCard&14|isFinishCard&14|isGameEnd&3|master&4|masterRate&13|poker&!14|selectState&4|surplusTimer", "M_BiJi_GameMessage.CMD_S_GameContext_SelectCards");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_GameContext_Result extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 22;
            this.$T="M_BiJi_GameMessage.CMD_S_GameContext_Result"; 
        }
       /**
        *
        */
       public master: number = 0;
       /**
        *
        */
       public showResult: boolean = false;
       /**
        *
        */
       public masterRate: number = 0;
       /**
        *
        */
       public betRate: number[] = null;
       /**
        *
        */
       public chair: number[] = null;
       /**
        *
        */
       public headcards: number[] = null;
       /**
        *
        */
       public oppocards: number[] = null;
       /**
        *
        */
       public lastcards: number[] = null;
       /**
        *
        */
       public headscore: number[] = null;
       /**
        *
        */
       public opposcore: number[] = null;
       /**
        *
        */
       public lastscore: number[] = null;
       /**
        *
        */
       public cardType: number[] = null;
       /**
        *
        */
       public score: number[] = null;
       /**
        *
        */
       public isend: boolean = false;
       /**
        *
        */
       public gameCount: number[] = null;
       /**
        *
        */
       public surplusTimer: number = 0;
       /**
        *
        */
       public selfcards: number[] = null;
       /**
        *
        */
       public selfcardType: number = 0;
       /**
        *
        */
       public isDropCard: boolean[] = null;
       /**
        *
        */
       public xiScore: number[] = null;
       /**
        *
        */
       public xiScoreType: number[][] = null;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_GameContext_Result", function () {return new CMD_S_GameContext_Result()})
    TSRH.RSerializer("13078", "!4|betRate&!4|cardType&!3|chair&!4|gameCount&13|headcards&!4|headscore&!14|isDropCard&14|isend&13|lastcards&!4|lastscore&3|master&4|masterRate&13|oppocards&!4|opposcore&!4|score&13|selfcards&4|selfcardType&14|showResult&4|surplusTimer&!4|xiScore&!!4|xiScoreType", "M_BiJi_GameMessage.CMD_S_GameContext_Result");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_TableCreator extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 23;
            this.$T="M_BiJi_GameMessage.CMD_S_TableCreator"; 
        }
       /**
        *
        */
       public chair: number = 0;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_TableCreator", function () {return new CMD_S_TableCreator()})
    TSRH.RSerializer("13079", "4|chair", "M_BiJi_GameMessage.CMD_S_TableCreator");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_PlayerScore extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 17;
            this.$T="M_BiJi_GameMessage.CMD_S_PlayerScore"; 
        }
       /**
        *
        */
       public score: number[] = null;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_PlayerScore", function () {return new CMD_S_PlayerScore()})
    TSRH.RSerializer("13073", "!4|score", "M_BiJi_GameMessage.CMD_S_PlayerScore");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_GameCreatePlease extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 31;
            this.$T="M_BiJi_GameMessage.CMD_S_GameCreatePlease"; 
        }
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_GameCreatePlease", function () {return new CMD_S_GameCreatePlease()})
    TSRH.RSerializer("13087", "", "M_BiJi_GameMessage.CMD_S_GameCreatePlease");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_ScoreView extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 33;
            this.$T="M_BiJi_GameMessage.CMD_S_ScoreView"; 
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
       public result: number[] = null;
       /**
        *
        */
       public isShow: boolean = false;
       /**
        *
        */
       public isExit: boolean = false;
       /**
        *
        */
       public gameNum: string = "";
       /**
        *
        */
       public headresult: number[] = null;
       /**
        *
        */
       public opporesult: number[] = null;
       /**
        *
        */
       public lastresult: number[] = null;
       /**
        *
        */
       public pokerresult: number[][] = null;
       /**
        *
        */
       public xifenresult: number[][] = null;
       /**
        *
        */
       public winhead: number[] = null;
       /**
        *
        */
       public winoppo: number[] = null;
       /**
        *
        */
       public winlast: number[] = null;
       /**
        *
        */
       public winalltimes: number[] = null;
       /**
        *
        */
       public xifentimes: number[] = null;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_ScoreView", function () {return new CMD_S_ScoreView()})
    TSRH.RSerializer("13089", "!3|chairList&12|gameNum&!4|headresult&14|isExit&14|isShow&!4|lastresult&!12|nameList&!4|opporesult&!13|pokerresult&!4|result&13|winalltimes&13|winhead&13|winlast&13|winoppo&!!4|xifenresult&13|xifentimes", "M_BiJi_GameMessage.CMD_S_ScoreView");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_TableState extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 34;
            this.$T="M_BiJi_GameMessage.CMD_S_TableState"; 
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
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_TableState", function () {return new CMD_S_TableState()})
    TSRH.RSerializer("13090", "!3|chair&14|isend&3|master&!14|ready&4|surplusTimer", "M_BiJi_GameMessage.CMD_S_TableState");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_DissolveTable extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 35;
            this.$T="M_BiJi_GameMessage.CMD_S_DissolveTable"; 
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
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_DissolveTable", function () {return new CMD_S_DissolveTable()})
    TSRH.RSerializer("13091", "4|chair&12|chairName&!4|member&!14|memberflag&!12|memberName&4|result&4|sponsor&12|sponsorName&4|timer", "M_BiJi_GameMessage.CMD_S_DissolveTable");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_ForceLeftSuccess extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 36;
            this.$T="M_BiJi_GameMessage.CMD_S_ForceLeftSuccess"; 
        }
       /**
        *
        */
       public chair: number = 0;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_ForceLeftSuccess", function () {return new CMD_S_ForceLeftSuccess()})
    TSRH.RSerializer("13092", "3|chair", "M_BiJi_GameMessage.CMD_S_ForceLeftSuccess");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_TableCreatorLeftSuccess extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 37;
            this.$T="M_BiJi_GameMessage.CMD_S_TableCreatorLeftSuccess"; 
        }
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_TableCreatorLeftSuccess", function () {return new CMD_S_TableCreatorLeftSuccess()})
    TSRH.RSerializer("13093", "", "M_BiJi_GameMessage.CMD_S_TableCreatorLeftSuccess");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_ShowCardTypeSelf extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 38;
            this.$T="M_BiJi_GameMessage.CMD_S_ShowCardTypeSelf"; 
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
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_ShowCardTypeSelf", function () {return new CMD_S_ShowCardTypeSelf()})
    TSRH.RSerializer("13094", "1|card&4|cardType&3|chair", "M_BiJi_GameMessage.CMD_S_ShowCardTypeSelf");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_ShowMsg extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 50;
            this.$T="M_BiJi_GameMessage.CMD_S_ShowMsg"; 
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
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_ShowMsg", function () {return new CMD_S_ShowMsg()})
    TSRH.RSerializer("13106", "14|isexit&12|msg&4|type", "M_BiJi_GameMessage.CMD_S_ShowMsg");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_FinishPoker extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 39;
            this.$T="M_BiJi_GameMessage.CMD_S_FinishPoker"; 
        }
       /**
        *
        */
       public chair: boolean[] = null;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_FinishPoker", function () {return new CMD_S_FinishPoker()})
    TSRH.RSerializer("13095", "!14|chair", "M_BiJi_GameMessage.CMD_S_FinishPoker");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_S_DropCards extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 40;
            this.$T="M_BiJi_GameMessage.CMD_S_DropCards"; 
        }
       /**
        *
        */
       public chair: number = 0;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_S_DropCards", function () {return new CMD_S_DropCards()})
    TSRH.RSerializer("13096", "1|chair", "M_BiJi_GameMessage.CMD_S_DropCards");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_RobMaster extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 101;
            this.$T="M_BiJi_GameMessage.CMD_C_RobMaster"; 
        }
       /**
        *
        */
       public chair: number = 0;
       /**
        *
        */
       public robMasterRate: number = 0;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_C_RobMaster", function () {return new CMD_C_RobMaster()})
    TSRH.RSerializer("13157", "4|chair&4|robMasterRate", "M_BiJi_GameMessage.CMD_C_RobMaster");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_DropCards extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 131;
            this.$T="M_BiJi_GameMessage.CMD_C_DropCards"; 
        }
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_C_DropCards", function () {return new CMD_C_DropCards()})
    TSRH.RSerializer("13187", "", "M_BiJi_GameMessage.CMD_C_DropCards");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_Bet extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 102;
            this.$T="M_BiJi_GameMessage.CMD_C_Bet"; 
        }
       /**
        *
        */
       public chair: number = 0;
       /**
        *
        */
       public betRate: number = 0;
       /**
        *
        */
       public timerover: boolean = false;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_C_Bet", function () {return new CMD_C_Bet()})
    TSRH.RSerializer("13158", "4|betRate&4|chair&14|timerover", "M_BiJi_GameMessage.CMD_C_Bet");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_SelectCards extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 103;
            this.$T="M_BiJi_GameMessage.CMD_C_SelectCards"; 
        }
       /**
        *
        */
       public select: number[] = null;
       /**
        *
        */
       public hasNiu: boolean = false;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_C_SelectCards", function () {return new CMD_C_SelectCards()})
    TSRH.RSerializer("13159", "14|hasNiu&!4|select", "M_BiJi_GameMessage.CMD_C_SelectCards");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_VoteNextGame extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 132;
            this.$T="M_BiJi_GameMessage.CMD_C_VoteNextGame"; 
        }
       /**
        *
        */
       public select: boolean = false;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_C_VoteNextGame", function () {return new CMD_C_VoteNextGame()})
    TSRH.RSerializer("13188", "14|select", "M_BiJi_GameMessage.CMD_C_VoteNextGame");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_CreateTable extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 121;
            this.$T="M_BiJi_GameMessage.CMD_C_CreateTable"; 
        }
       /**
        *
        */
       public cellScore: number = 0;
       /**
        *
        */
       public tableCreatorPay: number = 0;
       /**
        *
        */
       public gameModel: number = 0;
       /**
        *
        */
       public SetGameNum: number = 0;
       /**
        *
        */
       public checkIP: boolean = false;
       /**
        *
        */
       public extendBet: number = 0;
       /**
        *
        */
       public rubCard: number = 0;
       /**
        *
        */
       public havedropCard: boolean = false;
       /**
        *
        */
       public havexiScore: boolean = false;
       /**
        *
        */
       public havesanShunzi: boolean = false;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_C_CreateTable", function () {return new CMD_C_CreateTable()})
    TSRH.RSerializer("13177", "4|cellScore&14|checkIP&4|extendBet&4|gameModel&14|havedropCard&14|havesanShunzi&14|havexiScore&4|rubCard&4|SetGameNum&4|tableCreatorPay", "M_BiJi_GameMessage.CMD_C_CreateTable");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_Ready extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 122;
            this.$T="M_BiJi_GameMessage.CMD_C_Ready"; 
        }
       /**
        *
        */
       public chair: number = 0;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_C_Ready", function () {return new CMD_C_Ready()})
    TSRH.RSerializer("13178", "3|chair", "M_BiJi_GameMessage.CMD_C_Ready");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_DissolveTable extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 123;
            this.$T="M_BiJi_GameMessage.CMD_C_DissolveTable"; 
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
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_C_DissolveTable", function () {return new CMD_C_DissolveTable()})
    TSRH.RSerializer("13179", "14|agree&14|askagree", "M_BiJi_GameMessage.CMD_C_DissolveTable");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_ForceLeft extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 124;
            this.$T="M_BiJi_GameMessage.CMD_C_ForceLeft"; 
        }
       /**
        *
        */
       public PlayerID: number = 0;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_C_ForceLeft", function () {return new CMD_C_ForceLeft()})
    TSRH.RSerializer("13180", "5|PlayerID", "M_BiJi_GameMessage.CMD_C_ForceLeft");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_RefreshMoney extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 125;
            this.$T="M_BiJi_GameMessage.CMD_C_RefreshMoney"; 
        }
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_C_RefreshMoney", function () {return new CMD_C_RefreshMoney()})
    TSRH.RSerializer("13181", "", "M_BiJi_GameMessage.CMD_C_RefreshMoney");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_TableCreatorLeft extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 127;
            this.$T="M_BiJi_GameMessage.CMD_C_TableCreatorLeft"; 
        }
       /**
        *
        */
       public saveTable: boolean = false;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_C_TableCreatorLeft", function () {return new CMD_C_TableCreatorLeft()})
    TSRH.RSerializer("13183", "14|saveTable", "M_BiJi_GameMessage.CMD_C_TableCreatorLeft");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_StartGameOver extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 128;
            this.$T="M_BiJi_GameMessage.CMD_C_StartGameOver"; 
        }
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_C_StartGameOver", function () {return new CMD_C_StartGameOver()})
    TSRH.RSerializer("13184", "", "M_BiJi_GameMessage.CMD_C_StartGameOver");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_ShowCard extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 129;
            this.$T="M_BiJi_GameMessage.CMD_C_ShowCard"; 
        }
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_C_ShowCard", function () {return new CMD_C_ShowCard()})
    TSRH.RSerializer("13185", "", "M_BiJi_GameMessage.CMD_C_ShowCard");


    /**
     *
     * @创建时间：2018年11月07日 20:04:46
     * @创建人员：PC-20180301DMRG\Administrator
     * @备注信息：
     *
     */
    export class CMD_C_FinishPoker extends GameIF.GameMessage {
        public constructor()
        {
            super();
            
            this.wMainCmdID = 51;
            this.wSubCmdID = 130;
            this.$T="M_BiJi_GameMessage.CMD_C_FinishPoker"; 
        }
       /**
        *
        */
       public headcards: number[] = null;
       /**
        *
        */
       public oppocards: number[] = null;
       /**
        *
        */
       public lastcards: number[] = null;
   
    }
    SerializerCreator.Register("M_BiJi_GameMessage.CMD_C_FinishPoker", function () {return new CMD_C_FinishPoker()})
    TSRH.RSerializer("13186", "13|headcards&13|lastcards&13|oppocards", "M_BiJi_GameMessage.CMD_C_FinishPoker");

}