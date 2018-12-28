import M_TDHMJVideoClass from './M_TDHMJVideoClass';
import { TDHMJMahjongDef, ITDHMJView, TDHMJ, TDHMJTableConfig, TDHMJTimer, enGamePhase, TDHMJOutCardPlayer, TDHMJRecordCard, enTDHMJAniType } from "./ConstDef/TDHMJMahjongDef";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { GameIF } from "../../CommonSrc/GameIF";
import M_TDHMJClass from "./M_TDHMJClass";
import TDHMJ_ReadyStatusGameInfo from "./SkinView/TDHMJ_ReadyStatusGameInfo";
import TDHMJ_GameInfo from "./SkinView/TDHMJ_GameInfo";
import TDHMJ_ReadyStatusUserInfo from './SkinView/TDHMJ_ReadyStatusUserInfo';
import { M_TDHMJ_GameMessage } from "../../CommonSrc/M_TDHMJ_GameMessage";
import TDHMJ_TimerView from "./SkinView/TDHMJ_Timer";
import TDHMJ_SZAni from "./SkinView/TDHMJ_SZAni";
import TDHMJ_GameStatusUserInfo from "./SkinView/TDHMJ_GameStatusUserInfo";
import TDHMJ_CardView from "./SkinView/TDHMJ_CardView";
import TDHMJEvent from "./TDHMJEvent";
import TDHMJ_OperatorView from "./SkinView/TDHMJ_OperatorView";
import TDHMJ_JieShuan from "./SkinView/TDHMJ_JieShuan";
import MJ_RecordVideo from "../MJCommon/MJ_RecordVideo";
import TDHMJ_SelGang from "./SkinView/TDHMJ_SelGang";
import TDHMJ_SelChi from "./SkinView/TDHMJ_SelChi";
import TDHMJ_PaiWall from "./SkinView/TDHMJ_PaiWalls";
import TDHMJ_BaoTing from './SkinView/TDHMJ_Bao';
import TDHMJ_QiangGangView from "./SkinView/TDHMJ_QiangGangView";
import TDHMJ_TingTip from "./SkinView/TDHMJ_TingTip";
import TDHMJ_HelpView from "./SkinView/TDHMJ_HelpView";
import TDHMJ_TipMsg from "./SkinView/TDHMJ_TipMsg";
import TDHMJ_DissTable from "./SkinView/TDHMJ_DissTable";
import TDHMJ_MsgBox from "./SkinView/TDHMJ_MsgBox";
import MJ_Cheating from "../MJCommon/MJ_Cheating";
import MJ_Out from "../MJCommon/MJ_Out";
import TDHMJ_Pao from "./SkinView/TDHMJ_Pao";
import TDHMJ_La from "./SkinView/TDHMJ_La";
import TDHMJ_SettingView from './SkinView/TDHMJ_SettingView';
import MJ_UserData from "../MJCommon/MJ_UserData";
import TDHMJ_JiFenBan from "./SkinView/TDHMJ_JiFenBan";
import TDHMJ_FenXiang from "./SkinView/TDHMJ_FenXiang";
import TDHMJ_Ani from "./SkinView/TDHMJ_Ani";
import TDHMJ_StartAni from "./SkinView/TDHMJ_StartAni";
import TDHMJ_JiFenBanX from "./SkinView/TDHMJ_JiFenBanX";
import TDHMJ_OutCardView from "./SkinView/TDHMJ_OutCardView";
import M_TDHMJVoice from "./M_TDHMJVoice";
import TDHMJ_VideoCtl from "./SkinView/TDHMJ_VideoCtl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class M_TDHMJVideoView extends cc.Component {

    private static _ins: M_TDHMJVideoView;
    public static get ins(): M_TDHMJVideoView { return this._ins; }
    public get gameClass(): M_TDHMJVideoClass { return M_TDHMJVideoClass.ins; }
    
    constructor(){
        super();
         cc.info('--- 构造');
    }
    //东南西北显示
        @property(cc.Sprite)
        fangXiangView:cc.Sprite = null;

        //局数显示
        // @property(cc.Node)
        // group_gameNum: cc.Node=null;

        //游戏信息
        @property(cc.Prefab)
        GameInfoView: cc.Prefab=null;
        private _gameInfo: TDHMJ_GameInfo;//me
        /**
         * 游戏信息
         * */
        public get GameInfo(): TDHMJ_GameInfo {
            return this._gameInfo;
        }
              //中间层
        // @property(cc.Node)
        // group_mid: cc.Node = null;

        @property(cc.Prefab)
        ReadyStatusGameInfoView: cc.Prefab=null;

        //准备状态时的游戏信息
        private _readyStatus_gameInfo: TDHMJ_ReadyStatusGameInfo;//me
        /**
         * 准备状态游戏信息
         * */
        public get ReadyStatusGameInfo(): TDHMJ_ReadyStatusGameInfo {
            return this._readyStatus_gameInfo;
        }

        @property(cc.Prefab)
        ReadyStatusGameUserView: cc.Prefab=null;

        //准备状态玩家信息
        private _readyStatus_userInfo: TDHMJ_ReadyStatusUserInfo;//me
        /**
         * 准备状态玩家信息
         * */
        public get ReadyStatusUserInfo(): TDHMJ_ReadyStatusUserInfo {
            return this._readyStatus_userInfo;
        }

        @property(cc.Prefab)
        Time_View: cc.Prefab=null;
        //计时器
        private _timerView: TDHMJ_TimerView;//me
        /**
         * 游戏计时器
         * */
        public get TimerView(): TDHMJ_TimerView {
            return this._timerView;
        }

        @property(cc.Prefab)
        SZAni_View: cc.Prefab=null;
        //骰子动画
        private _szAni: TDHMJ_SZAni;//me
        /**
         * 骰子动画
         * */
        public get SZAni(): TDHMJ_SZAni {
            return this._szAni;
        }

        @property(cc.Node)
        mask_node:cc.Node=null;
       
        @property(cc.Prefab)
        GameStatus_userInfo_View: cc.Prefab=null;
        //游戏状态玩家信息
        private _gameStatus_userInfo: TDHMJ_GameStatusUserInfo;//me
        /**
         * 游戏状态玩家信息
         * */
        public get GameStatusUserInfo(): TDHMJ_GameStatusUserInfo {
            return this._gameStatus_userInfo;
        }

        @property(cc.Prefab)
        TDHMJ_Card_View: cc.Prefab=null;
        //牌阵视图
        private _cardView: TDHMJ_CardView;//me
        /**
         * 牌阵视图
         * */
        public get CardView(): TDHMJ_CardView {
            return this._cardView;
        }
         @property(cc.Prefab)
        TDHMJ_OutCard_View: cc.Prefab = null;
        //出牌视图
        private _outCardView: TDHMJ_OutCardView;//me
        /**
         * 出牌视图
         * */
        public get OutCardView(): TDHMJ_OutCardView {
            return this._outCardView;
        }

        @property(cc.Prefab)
        TDHMJ_OP_View: cc.Prefab=null;
        //玩家操作
        private _operatorView: TDHMJ_OperatorView;
        /**
         * 操作视图
         * */
        public get OperatorView(): TDHMJ_OperatorView {
            return this._operatorView;
        }
        
        @property(cc.Prefab)
        TDHMJ_TingTip_View: cc.Prefab=null;
        private _tingTip:TDHMJ_TingTip;
        /**
         * 听牌提示
         * */
        public get TingTip(): TDHMJ_TingTip{
            return this._tingTip;
        }

        @property(cc.Prefab)
        TDHMJ_JieShuan_View: cc.Prefab=null;
        //结算
        private _jieShuan: TDHMJ_JieShuan;//me
        /**
         * 结算视图
         * */
        public get JieShuanView(): TDHMJ_JieShuan {
            return this._jieShuan;
        }

        @property(cc.Prefab)
        TDHMJ_TipMsg_View:cc.Prefab=null;
        private _tipMsg:TDHMJ_TipMsg;
        /**
         * Tip视图
         */
        public get TipMsgView():TDHMJ_TipMsg{
            return this._tipMsg;
        }

        @property(cc.Prefab)
        TDHMJ_DissTable_View:cc.Prefab=null;
        /**
         * 解散房间界面
         */
        private _dissTable:TDHMJ_DissTable;
        /**
         * 解散房间界面
         */
        public get DissTable():TDHMJ_DissTable{
            return this._dissTable;
        }

        @property(cc.Prefab)
        TDHMJ_MsgBox_View:cc.Prefab=null;

        private _msgBox:TDHMJ_MsgBox;

        public get MsgBox():TDHMJ_MsgBox{
            return this._msgBox;
        }

        @property(cc.Prefab)
        MJ_Cheating:cc.Prefab=null;

        private _mjcheat:MJ_Cheating;

        public get cheatBox():MJ_Cheating{
            return this._mjcheat;
        }

        //outpai
        @property(cc.Prefab)
        MJ_Out:cc.Prefab=null;

        private _mjOut:MJ_Out;

        public get mg_out():MJ_Out{
            return this._mjOut;
        }          

        @property(cc.Prefab)
        TDHMJ_Setting_View:cc.Prefab=null;
        public _setting: TDHMJ_SettingView;

        @property(cc.Prefab)
        TDHMJ_UserData_View:cc.Prefab=null;
        //用户数据
        private _userData:MJ_UserData;
        /**
         * 用户数据
         * */
        public get UserData():MJ_UserData{
            return this._userData;
        }
        @property(cc.Node)
        group_mid: cc.Node = null;
        @property(cc.Prefab)
        TDHMJ_FenXiang_View:cc.Prefab=null;
        //分享板
        private _fenxiang:TDHMJ_FenXiang;

        public get PlayFenXiang():TDHMJ_FenXiang{return this._fenxiang}

        @property(cc.Prefab)
        TDHMJ_Ani_View:cc.Prefab=null;
        //动画面板
        private _aniPanel:TDHMJ_Ani;

        @property(cc.Prefab)
        TDHMJ_Start_Ani: cc.Prefab=null;
        private _startAni:TDHMJ_StartAni;
        /**
         * 帮助
         * */
        public get StartAni():TDHMJ_StartAni{
            return this._startAni;
        };
        // @property(cc.Button)
        //位置
        // btn_location:cc.Button=null;
        // @property(cc.Button)
        //请求听牌提示
        // btn_tingtip:cc.Button=null;
	
	 @property(cc.Prefab)
   	 TDHMJ_VideoCtl_View:cc.Prefab=null;
    	//录像控制条
    	private _videoCtl: TDHMJ_VideoCtl;
   	 /**
    	 * 录像控制条
    	 * */
    	public get VideoCtl():TDHMJ_VideoCtl{
            return this._videoCtl;
    	}
        onLoad(){
            M_TDHMJVideoView._ins = this;
            // M_TDHMJVideoClass.ins.view = this;
            
            let ginode=cc.instantiate(this.GameInfoView);
            this._gameInfo=ginode.getComponent<TDHMJ_GameInfo>(TDHMJ_GameInfo);
            this.group_mid.addChild(ginode);

            let rsgnode=cc.instantiate(this.ReadyStatusGameInfoView);
            this._readyStatus_gameInfo=rsgnode.getComponent<TDHMJ_ReadyStatusGameInfo>(TDHMJ_ReadyStatusGameInfo);
            this.node.addChild(rsgnode);
            
            let rsunode=cc.instantiate(this.ReadyStatusGameUserView);
            this._readyStatus_userInfo=rsunode.getComponent<TDHMJ_ReadyStatusUserInfo>(TDHMJ_ReadyStatusUserInfo);
            this.node.addChild(rsunode);
            
            let timenode=cc.instantiate(this.Time_View);
            this._timerView=timenode.getComponent<TDHMJ_TimerView>(TDHMJ_TimerView);
            this.group_mid.addChild(timenode);

            let sznode=cc.instantiate(this.SZAni_View);
            this._szAni=sznode.getComponent<TDHMJ_SZAni>(TDHMJ_SZAni);
            this.node.addChild(sznode);            
            
            let cvnode=cc.instantiate(this.TDHMJ_Card_View);
            this._cardView=cvnode.getComponent<TDHMJ_CardView>(TDHMJ_CardView);
            this.group_mid.addChild(cvnode);

            let ocvnode=cc.instantiate(this.TDHMJ_OutCard_View);
            this._outCardView=ocvnode.getComponent<TDHMJ_OutCardView>(TDHMJ_OutCardView);
            this.group_mid.addChild(ocvnode);

            let gsunode=cc.instantiate(this.GameStatus_userInfo_View);
            this._gameStatus_userInfo=gsunode.getComponent<TDHMJ_GameStatusUserInfo>(TDHMJ_GameStatusUserInfo);
            this.node.addChild(gsunode);      

            let opnode=cc.instantiate(this.TDHMJ_OP_View);
            this._operatorView=opnode.getComponent<TDHMJ_OperatorView>(TDHMJ_OperatorView);
            this.node.addChild(opnode);

            let tingtipnode=cc.instantiate(this.TDHMJ_TingTip_View);
            this._tingTip=tingtipnode.getComponent<TDHMJ_TingTip>(TDHMJ_TingTip);
            this.node.addChild(tingtipnode);

            let setnode=cc.instantiate(this.TDHMJ_Setting_View);
            this._setting=setnode.getComponent<TDHMJ_SettingView>(TDHMJ_SettingView);
            this.node.addChild(setnode);

            let udnode=cc.instantiate(this.TDHMJ_UserData_View);
            this._userData=udnode.getComponent<MJ_UserData>(MJ_UserData);
            this.node.addChild(udnode);

            let tipnode=cc.instantiate(this.TDHMJ_TipMsg_View);
            this._tipMsg=tipnode.getComponent<TDHMJ_TipMsg>(TDHMJ_TipMsg);
            this.node.addChild(tipnode);

            let aninode=cc.instantiate(this.TDHMJ_Ani_View);
            this._aniPanel=aninode.getComponent<TDHMJ_Ani>(TDHMJ_Ani);
            this.node.addChild(aninode);

            let saninode=cc.instantiate(this.TDHMJ_Start_Ani);
            this._startAni=saninode.getComponent<TDHMJ_StartAni>(TDHMJ_StartAni);
            this.node.addChild(saninode);

            let msgboxnode=cc.instantiate(this.TDHMJ_MsgBox_View);
            this._msgBox=msgboxnode.getComponent<TDHMJ_MsgBox>(TDHMJ_MsgBox);
            this.node.addChild(msgboxnode);
	    
	    let vcnode=cc.instantiate(this.TDHMJ_VideoCtl_View);
            this._videoCtl=vcnode.getComponent<TDHMJ_VideoCtl>(TDHMJ_VideoCtl);
            this.node.addChild(vcnode);
	
            let cheatNode=cc.instantiate(this.MJ_Cheating);
            this._mjcheat=cheatNode.getComponent<MJ_Cheating>(MJ_Cheating);
            this.node.addChild(cheatNode);

            let mjoutNode=cc.instantiate(this.MJ_Out);
            this._mjOut=mjoutNode.getComponent<MJ_Out>(MJ_Out);
            this.node.addChild(mjoutNode);

            let jsnode=cc.instantiate(this.TDHMJ_JieShuan_View);
            this._jieShuan=jsnode.getComponent<TDHMJ_JieShuan>(TDHMJ_JieShuan);
            this.node.addChild(jsnode);

            let fxnode=cc.instantiate(this.TDHMJ_FenXiang_View);
            this._fenxiang=fxnode.getComponent<TDHMJ_FenXiang>(TDHMJ_FenXiang);
            this.node.addChild(fxnode);

            let disstablenode=cc.instantiate(this.TDHMJ_DissTable_View);
            this._dissTable=disstablenode.getComponent<TDHMJ_DissTable>(TDHMJ_DissTable);
            this.node.addChild(disstablenode);
            
        }

    public Init():void{

            this.GameInfo.init();
            this.ReadyStatusGameInfo.init();
            this.ReadyStatusUserInfo.init();
            this.TimerView.init();
            this.SZAni.init();
            // this.GameStatusUserInfo.init();
            this.CardView.init();
            this.JieShuanView.init();
            this.UserData.init();
            this._aniPanel.init();
            this.OperatorView.init();
            this.TingTip.init();
            this._setting.init();
            this.PlayFenXiang.init();
            this.StartAni.init();

            this.TipMsgView.Init()
            this.DissTable.Init();
            this.MsgBox.Init();
            // this.btn_tingtip.node.active=false;
            console.log("View初始化");
            
        }
    /**
     * 清理
     * */
    private clear(): void {

        this._timerView.node.active = false;

        this._gameStatus_userInfo.node.active = false;
        this._gameStatus_userInfo.clear();

    }

    public playerComeing():void{
        this.clear();
    }
    
    public GameStart():void{

        this._gameInfo.init();
        this._szAni.Clear();

        this._gameStatus_userInfo.node.active = true;
        this._gameStatus_userInfo.reflashPlayer();
        
        this._gameStatus_userInfo.HideLaPao();
        this._gameStatus_userInfo.tableOwener = M_TDHMJVideoClass.ins.getTableConfig().tableCreatorChair;
        this._timerView.showArrow = M_TDHMJVideoClass.ins.getSelfChair();
        this._timerView.showArr(255,M_TDHMJVideoClass.ins.getSelfChair(),true);
        // this._timerView.timerNum = 0;
        this._timerView.showArrow = TDHMJMahjongDef.gInvalidChar;
        this._timerView.node.active=false;
    }

    public StartSendCard():void{
        this._gameInfo.holdCardOver();
            for(let i=0;i<TDHMJMahjongDef.gPlayerNum;i++){
                this.CardView.holdTricksCard(i,13);
            }
        // this._szAni.playSZ(M_TDHMJVideoClass.ins.SZ1,M_TDHMJVideoClass.ins.SZ2,TDHMJEvent.msg_holdCardSZComplete);
    }

    public TableCreatorInfo(chair:number):void{
        this._gameStatus_userInfo.tableOwener = chair;
    }

    /**
     * 分享按钮事件
     */
    public OnButtonShare() {
        //this.gameClass.ShowShare(0, this.gameClass.TableID, this.gameClass.WebConfigName + "淮北麻将分享",TDHMJ.ins.iclass.getTableConfig().shareContext);
    }

    /**
     * 事件监听
     * */
    private onGameEvent(e: TDHMJEvent): void {
        switch(e.msgCode) {

            //抓牌骰子动画播放完毕
            case TDHMJEvent.msg_holdCardSZComplete: {
                // for(let i=0;i<TDHMJMahjongDef.gPlayerNum;i++){
                //     this.CardView.holdTricksCard(i,13);
                // }
                // for(var i:number=0; i<TDHMJMahjongDef.gPlayerNum; i++){
                //     this._cardView.getActive(i).arrangeHandCard();
                // }
                this._cardView.selfActive.refreshHandCardData(M_TDHMJVideoClass.ins.getSelfHandCardData());
                this._szAni.node.active = false;
                this._gameInfo.holdCardOver();
                // this._videoCtl.start();
                e.stopPropagation();
                //this._sendCardEngine.start(M_TDHMJVideoClass.ins.BankerChair);
                break;
            }
            //继续游戏
            case TDHMJEvent.msg_goongame: {
                this.clear();     
                break;
            }
            default: {
                //this.dispatchEvent(e.clone());
                break;
            }
        }
    }


    /**
     * 播放动画
     * */
    public playTDHMJAni(chair: number,aniType: enTDHMJAniType): void {
            var logicChair: number = M_TDHMJVideoClass.ins.physical2logicChair(chair);
            switch(aniType) {
                case enTDHMJAniType.aniType_peng: {
                    this._aniPanel.PlayAnimation("AniPeng",logicChair);
                    break;
                }
                case enTDHMJAniType.aniType_minggGang: {
                     this._aniPanel.PlayAnimation("AniGang",logicChair);
                    break;
                }
                case enTDHMJAniType.aniType_anGang: {
                     this._aniPanel.PlayAnimation("AniGang",logicChair);
                    break;
                }
                case enTDHMJAniType.aniType_huCard: {
                      this._aniPanel.PlayAnimation("AniHu",logicChair);
                    break;
                }
                case enTDHMJAniType.aniType_ziMo: {
                     this._aniPanel.PlayAnimation("AniZimo",logicChair);                 
                    break;
                }
                case enTDHMJAniType.aniType_chi: {
                     this._aniPanel.PlayAnimation("AniChi",logicChair);                 
                    break;
                }
                case enTDHMJAniType.aniType_bao: {
                     this._aniPanel.PlayAnimation("AniBao",logicChair);                 
                    break;
                }
                case enTDHMJAniType.aniType_start: {
                     this._aniPanel.PlayAnimation("AniStart",logicChair);                 
                    break;
                }
            }
        }

    public showMsg(){
        
    }
}
