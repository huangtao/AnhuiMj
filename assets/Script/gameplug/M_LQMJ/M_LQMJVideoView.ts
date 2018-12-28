import M_LQMJVideoClass from './M_LQMJVideoClass';
import { LQMJMahjongDef, ILQMJView, LQMJ, LQMJTableConfig, LQMJTimer, enGamePhase, LQMJOutCardPlayer, LQMJRecordCard, enLQMJAniType } from "./ConstDef/LQMJMahjongDef";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { GameIF } from "../../CommonSrc/GameIF";
import M_LQMJClass from "./M_LQMJClass";
import LQMJ_ReadyStatusGameInfo from "./SkinView/LQMJ_ReadyStatusGameInfo";
import LQMJ_GameInfo from "./SkinView/LQMJ_GameInfo";
import LQMJ_ReadyStatusUserInfo from './SkinView/LQMJ_ReadyStatusUserInfo';
import { M_LQMJ_GameMessage } from "../../CommonSrc/M_LQMJ_GameMessage";
import LQMJ_TimerView from "./SkinView/LQMJ_Timer";
import LQMJ_SZAni from "./SkinView/LQMJ_SZAni";
import LQMJ_GameStatusUserInfo from "./SkinView/LQMJ_GameStatusUserInfo";
import LQMJ_CardView from "./SkinView/LQMJ_CardView";
import LQMJEvent from "./LQMJEvent";
import LQMJ_OperatorView from "./SkinView/LQMJ_OperatorView";
import LQMJ_JieShuan from "./SkinView/LQMJ_JieShuan";
import MJ_RecordVideo from "../MJCommon/MJ_RecordVideo";
import LQMJ_SelGang from "./SkinView/LQMJ_SelGang";
import LQMJ_SelChi from "./SkinView/LQMJ_SelChi";
import LQMJ_PaiWall from "./SkinView/LQMJ_PaiWalls";
import LQMJ_BaoTing from './SkinView/LQMJ_Bao';
import LQMJ_QiangGangView from "./SkinView/LQMJ_QiangGangView";
import LQMJ_TingTip from "./SkinView/LQMJ_TingTip";
import LQMJ_HelpView from "./SkinView/LQMJ_HelpView";
import LQMJ_TipMsg from "./SkinView/LQMJ_TipMsg";
import LQMJ_DissTable from "./SkinView/LQMJ_DissTable";
import LQMJ_MsgBox from "./SkinView/LQMJ_MsgBox";
import MJ_Cheating from "../MJCommon/MJ_Cheating";
import MJ_Out from "../MJCommon/MJ_Out";
import LQMJ_Pao from "./SkinView/LQMJ_Pao";
import LQMJ_La from "./SkinView/LQMJ_La";
import LQMJ_SettingView from './SkinView/LQMJ_SettingView';
import MJ_UserData from "../MJCommon/MJ_UserData";
import LQMJ_JiFenBan from "./SkinView/LQMJ_JiFenBan";
import LQMJ_FenXiang from "./SkinView/LQMJ_FenXiang";
import LQMJ_Ani from "./SkinView/LQMJ_Ani";
import LQMJ_StartAni from "./SkinView/LQMJ_StartAni";
import LQMJ_JiFenBanX from "./SkinView/LQMJ_JiFenBanX";
import LQMJ_OutCardView from "./SkinView/LQMJ_OutCardView";
import M_LQMJVoice from "./M_LQMJVoice";
import LQMJ_VideoCtl from "./SkinView/LQMJ_VideoCtl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class M_LQMJVideoView extends cc.Component {

    private static _ins: M_LQMJVideoView;
    public static get ins(): M_LQMJVideoView { return this._ins; }
    public get gameClass(): M_LQMJVideoClass { return M_LQMJVideoClass.ins; }
    
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
        private _gameInfo: LQMJ_GameInfo;//me
        /**
         * 游戏信息
         * */
        public get GameInfo(): LQMJ_GameInfo {
            return this._gameInfo;
        }
              //中间层
        // @property(cc.Node)
        // group_mid: cc.Node = null;

        @property(cc.Prefab)
        ReadyStatusGameInfoView: cc.Prefab=null;

        //准备状态时的游戏信息
        private _readyStatus_gameInfo: LQMJ_ReadyStatusGameInfo;//me
        /**
         * 准备状态游戏信息
         * */
        public get ReadyStatusGameInfo(): LQMJ_ReadyStatusGameInfo {
            return this._readyStatus_gameInfo;
        }

        @property(cc.Prefab)
        ReadyStatusGameUserView: cc.Prefab=null;

        //准备状态玩家信息
        private _readyStatus_userInfo: LQMJ_ReadyStatusUserInfo;//me
        /**
         * 准备状态玩家信息
         * */
        public get ReadyStatusUserInfo(): LQMJ_ReadyStatusUserInfo {
            return this._readyStatus_userInfo;
        }

        @property(cc.Prefab)
        Time_View: cc.Prefab=null;
        //计时器
        private _timerView: LQMJ_TimerView;//me
        /**
         * 游戏计时器
         * */
        public get TimerView(): LQMJ_TimerView {
            return this._timerView;
        }

        @property(cc.Prefab)
        SZAni_View: cc.Prefab=null;
        //骰子动画
        private _szAni: LQMJ_SZAni;//me
        /**
         * 骰子动画
         * */
        public get SZAni(): LQMJ_SZAni {
            return this._szAni;
        }

        @property(cc.Node)
        mask_node:cc.Node=null;
       
        @property(cc.Prefab)
        GameStatus_userInfo_View: cc.Prefab=null;
        //游戏状态玩家信息
        private _gameStatus_userInfo: LQMJ_GameStatusUserInfo;//me
        /**
         * 游戏状态玩家信息
         * */
        public get GameStatusUserInfo(): LQMJ_GameStatusUserInfo {
            return this._gameStatus_userInfo;
        }

        @property(cc.Prefab)
        LQMJ_Card_View: cc.Prefab=null;
        //牌阵视图
        private _cardView: LQMJ_CardView;//me
        /**
         * 牌阵视图
         * */
        public get CardView(): LQMJ_CardView {
            return this._cardView;
        }
         @property(cc.Prefab)
        LQMJ_OutCard_View: cc.Prefab = null;
        //出牌视图
        private _outCardView: LQMJ_OutCardView;//me
        /**
         * 出牌视图
         * */
        public get OutCardView(): LQMJ_OutCardView {
            return this._outCardView;
        }

        @property(cc.Prefab)
        LQMJ_OP_View: cc.Prefab=null;
        //玩家操作
        private _operatorView: LQMJ_OperatorView;
        /**
         * 操作视图
         * */
        public get OperatorView(): LQMJ_OperatorView {
            return this._operatorView;
        }
        
        @property(cc.Prefab)
        LQMJ_TingTip_View: cc.Prefab=null;
        private _tingTip:LQMJ_TingTip;
        /**
         * 听牌提示
         * */
        public get TingTip(): LQMJ_TingTip{
            return this._tingTip;
        }

        @property(cc.Prefab)
        LQMJ_JieShuan_View: cc.Prefab=null;
        //结算
        private _jieShuan: LQMJ_JieShuan;//me
        /**
         * 结算视图
         * */
        public get JieShuanView(): LQMJ_JieShuan {
            return this._jieShuan;
        }

        @property(cc.Prefab)
        LQMJ_TipMsg_View:cc.Prefab=null;
        private _tipMsg:LQMJ_TipMsg;
        /**
         * Tip视图
         */
        public get TipMsgView():LQMJ_TipMsg{
            return this._tipMsg;
        }

        @property(cc.Prefab)
        LQMJ_DissTable_View:cc.Prefab=null;
        /**
         * 解散房间界面
         */
        private _dissTable:LQMJ_DissTable;
        /**
         * 解散房间界面
         */
        public get DissTable():LQMJ_DissTable{
            return this._dissTable;
        }

        @property(cc.Prefab)
        LQMJ_MsgBox_View:cc.Prefab=null;

        private _msgBox:LQMJ_MsgBox;

        public get MsgBox():LQMJ_MsgBox{
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
        LQMJ_Setting_View:cc.Prefab=null;
        public _setting: LQMJ_SettingView;

        @property(cc.Prefab)
        LQMJ_UserData_View:cc.Prefab=null;
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
        LQMJ_FenXiang_View:cc.Prefab=null;
        //分享板
        private _fenxiang:LQMJ_FenXiang;

        public get PlayFenXiang():LQMJ_FenXiang{return this._fenxiang}

        @property(cc.Prefab)
        LQMJ_Ani_View:cc.Prefab=null;
        //动画面板
        private _aniPanel:LQMJ_Ani;

        @property(cc.Prefab)
        LQMJ_Start_Ani: cc.Prefab=null;
        private _startAni:LQMJ_StartAni;
        /**
         * 帮助
         * */
        public get StartAni():LQMJ_StartAni{
            return this._startAni;
        };
        // @property(cc.Button)
        //位置
        // btn_location:cc.Button=null;
        // @property(cc.Button)
        //请求听牌提示
        // btn_tingtip:cc.Button=null;
	
	 @property(cc.Prefab)
   	 LQMJ_VideoCtl_View:cc.Prefab=null;
    	//录像控制条
    	private _videoCtl: LQMJ_VideoCtl;
   	 /**
    	 * 录像控制条
    	 * */
    	public get VideoCtl():LQMJ_VideoCtl{
            return this._videoCtl;
    	}
        onLoad(){
            M_LQMJVideoView._ins = this;
            // M_LQMJVideoClass.ins.view = this;
            
            let ginode=cc.instantiate(this.GameInfoView);
            this._gameInfo=ginode.getComponent<LQMJ_GameInfo>(LQMJ_GameInfo);
            this.group_mid.addChild(ginode);

            let rsgnode=cc.instantiate(this.ReadyStatusGameInfoView);
            this._readyStatus_gameInfo=rsgnode.getComponent<LQMJ_ReadyStatusGameInfo>(LQMJ_ReadyStatusGameInfo);
            this.node.addChild(rsgnode);
            
            let rsunode=cc.instantiate(this.ReadyStatusGameUserView);
            this._readyStatus_userInfo=rsunode.getComponent<LQMJ_ReadyStatusUserInfo>(LQMJ_ReadyStatusUserInfo);
            this.node.addChild(rsunode);
            
            let timenode=cc.instantiate(this.Time_View);
            this._timerView=timenode.getComponent<LQMJ_TimerView>(LQMJ_TimerView);
            this.group_mid.addChild(timenode);

            let sznode=cc.instantiate(this.SZAni_View);
            this._szAni=sznode.getComponent<LQMJ_SZAni>(LQMJ_SZAni);
            this.node.addChild(sznode);            
            
            let cvnode=cc.instantiate(this.LQMJ_Card_View);
            this._cardView=cvnode.getComponent<LQMJ_CardView>(LQMJ_CardView);
            this.group_mid.addChild(cvnode);

            let ocvnode=cc.instantiate(this.LQMJ_OutCard_View);
            this._outCardView=ocvnode.getComponent<LQMJ_OutCardView>(LQMJ_OutCardView);
            this.group_mid.addChild(ocvnode);

            let gsunode=cc.instantiate(this.GameStatus_userInfo_View);
            this._gameStatus_userInfo=gsunode.getComponent<LQMJ_GameStatusUserInfo>(LQMJ_GameStatusUserInfo);
            this.node.addChild(gsunode);      

            let opnode=cc.instantiate(this.LQMJ_OP_View);
            this._operatorView=opnode.getComponent<LQMJ_OperatorView>(LQMJ_OperatorView);
            this.node.addChild(opnode);

            let tingtipnode=cc.instantiate(this.LQMJ_TingTip_View);
            this._tingTip=tingtipnode.getComponent<LQMJ_TingTip>(LQMJ_TingTip);
            this.node.addChild(tingtipnode);

            let setnode=cc.instantiate(this.LQMJ_Setting_View);
            this._setting=setnode.getComponent<LQMJ_SettingView>(LQMJ_SettingView);
            this.node.addChild(setnode);

            let udnode=cc.instantiate(this.LQMJ_UserData_View);
            this._userData=udnode.getComponent<MJ_UserData>(MJ_UserData);
            this.node.addChild(udnode);

            let tipnode=cc.instantiate(this.LQMJ_TipMsg_View);
            this._tipMsg=tipnode.getComponent<LQMJ_TipMsg>(LQMJ_TipMsg);
            this.node.addChild(tipnode);

            let aninode=cc.instantiate(this.LQMJ_Ani_View);
            this._aniPanel=aninode.getComponent<LQMJ_Ani>(LQMJ_Ani);
            this.node.addChild(aninode);

            let saninode=cc.instantiate(this.LQMJ_Start_Ani);
            this._startAni=saninode.getComponent<LQMJ_StartAni>(LQMJ_StartAni);
            this.node.addChild(saninode);

            let msgboxnode=cc.instantiate(this.LQMJ_MsgBox_View);
            this._msgBox=msgboxnode.getComponent<LQMJ_MsgBox>(LQMJ_MsgBox);
            this.node.addChild(msgboxnode);
	    
	    let vcnode=cc.instantiate(this.LQMJ_VideoCtl_View);
            this._videoCtl=vcnode.getComponent<LQMJ_VideoCtl>(LQMJ_VideoCtl);
            this.node.addChild(vcnode);
	
            let cheatNode=cc.instantiate(this.MJ_Cheating);
            this._mjcheat=cheatNode.getComponent<MJ_Cheating>(MJ_Cheating);
            this.node.addChild(cheatNode);

            let mjoutNode=cc.instantiate(this.MJ_Out);
            this._mjOut=mjoutNode.getComponent<MJ_Out>(MJ_Out);
            this.node.addChild(mjoutNode);

            let jsnode=cc.instantiate(this.LQMJ_JieShuan_View);
            this._jieShuan=jsnode.getComponent<LQMJ_JieShuan>(LQMJ_JieShuan);
            this.node.addChild(jsnode);

            let fxnode=cc.instantiate(this.LQMJ_FenXiang_View);
            this._fenxiang=fxnode.getComponent<LQMJ_FenXiang>(LQMJ_FenXiang);
            this.node.addChild(fxnode);

            let disstablenode=cc.instantiate(this.LQMJ_DissTable_View);
            this._dissTable=disstablenode.getComponent<LQMJ_DissTable>(LQMJ_DissTable);
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
        this._gameStatus_userInfo.tableOwener = M_LQMJVideoClass.ins.getTableConfig().tableCreatorChair;
        this._timerView.showArrow = M_LQMJVideoClass.ins.getSelfChair();
        this._timerView.showArr(255,M_LQMJVideoClass.ins.getSelfChair(),true);
        // this._timerView.timerNum = 0;
        this._timerView.showArrow = LQMJMahjongDef.gInvalidChar;
        this._timerView.node.active=false;
    }

    public StartSendCard():void{
        this._gameInfo.holdCardOver();
            for(let i=0;i<LQMJMahjongDef.gPlayerNum;i++){
                this.CardView.holdTricksCard(i,13);
            }
        // this._szAni.playSZ(M_LQMJVideoClass.ins.SZ1,M_LQMJVideoClass.ins.SZ2,LQMJEvent.msg_holdCardSZComplete);
    }

    public TableCreatorInfo(chair:number):void{
        this._gameStatus_userInfo.tableOwener = chair;
    }

    /**
     * 分享按钮事件
     */
    public OnButtonShare() {
        //this.gameClass.ShowShare(0, this.gameClass.TableID, this.gameClass.WebConfigName + "淮北麻将分享",LQMJ.ins.iclass.getTableConfig().shareContext);
    }

    /**
     * 事件监听
     * */
    private onGameEvent(e: LQMJEvent): void {
        switch(e.msgCode) {

            //抓牌骰子动画播放完毕
            case LQMJEvent.msg_holdCardSZComplete: {
                // for(let i=0;i<LQMJMahjongDef.gPlayerNum;i++){
                //     this.CardView.holdTricksCard(i,13);
                // }
                // for(var i:number=0; i<LQMJMahjongDef.gPlayerNum; i++){
                //     this._cardView.getActive(i).arrangeHandCard();
                // }
                this._cardView.selfActive.refreshHandCardData(M_LQMJVideoClass.ins.getSelfHandCardData());
                this._szAni.node.active = false;
                this._gameInfo.holdCardOver();
                // this._videoCtl.start();
                e.stopPropagation();
                //this._sendCardEngine.start(M_LQMJVideoClass.ins.BankerChair);
                break;
            }
            //继续游戏
            case LQMJEvent.msg_goongame: {
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
    public playLQMJAni(chair: number,aniType: enLQMJAniType): void {
            var logicChair: number = M_LQMJVideoClass.ins.physical2logicChair(chair);
            switch(aniType) {
                case enLQMJAniType.aniType_peng: {
                    this._aniPanel.PlayAnimation("AniPeng",logicChair);
                    break;
                }
                case enLQMJAniType.aniType_minggGang: {
                     this._aniPanel.PlayAnimation("AniGang",logicChair);
                    break;
                }
                case enLQMJAniType.aniType_anGang: {
                     this._aniPanel.PlayAnimation("AniGang",logicChair);
                    break;
                }
                case enLQMJAniType.aniType_huCard: {
                      this._aniPanel.PlayAnimation("AniHu",logicChair);
                    break;
                }
                case enLQMJAniType.aniType_ziMo: {
                     this._aniPanel.PlayAnimation("AniZimo",logicChair);                 
                    break;
                }
                case enLQMJAniType.aniType_chi: {
                     this._aniPanel.PlayAnimation("AniChi",logicChair);                 
                    break;
                }
                case enLQMJAniType.aniType_bao: {
                     this._aniPanel.PlayAnimation("AniBao",logicChair);                 
                    break;
                }
                case enLQMJAniType.aniType_start: {
                     this._aniPanel.PlayAnimation("AniStart",logicChair);                 
                    break;
                }
            }
        }

    public showMsg(){
        
    }
}
