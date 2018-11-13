import M_HQMJVideoClass from './M_HQMJVideoClass';
import { HQMJMahjongDef, IHQMJView, HQMJ, HQMJTableConfig, HQMJTimer, enGamePhase, HQMJOutCardPlayer, HQMJRecordCard, enHQMJAniType } from "./ConstDef/HQMJMahjongDef";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { GameIF } from "../../CommonSrc/GameIF";
import M_HQMJClass from "./M_HQMJClass";
import HQMJ_ReadyStatusGameInfo from "./SkinView/HQMJ_ReadyStatusGameInfo";
import HQMJ_GameInfo from "./SkinView/HQMJ_GameInfo";
import HQMJ_ReadyStatusUserInfo from './SkinView/HQMJ_ReadyStatusUserInfo';
import { M_HQMJ_GameMessage } from "../../CommonSrc/M_HQMJ_GameMessage";
import HQMJ_TimerView from "./SkinView/HQMJ_Timer";
import HQMJ_SZAni from "./SkinView/HQMJ_SZAni";
import HQMJ_GameStatusUserInfo from "./SkinView/HQMJ_GameStatusUserInfo";
import HQMJ_CardView from "./SkinView/HQMJ_CardView";
import HQMJEvent from "./HQMJEvent";
import HQMJ_OperatorView from "./SkinView/HQMJ_OperatorView";
import HQMJ_JieShuan from "./SkinView/HQMJ_JieShuan";
import MJ_RecordVideo from "../MJCommon/MJ_RecordVideo";
import HQMJ_SelGang from "./SkinView/HQMJ_SelGang";
import HQMJ_SelChi from "./SkinView/HQMJ_SelChi";
import HQMJ_PaiWall from "./SkinView/HQMJ_PaiWalls";
import HQMJ_BaoTing from './SkinView/HQMJ_Bao';
import HQMJ_QiangGangView from "./SkinView/HQMJ_QiangGangView";
import HQMJ_TingTip from "./SkinView/HQMJ_TingTip";
import HQMJ_HelpView from "./SkinView/HQMJ_HelpView";
import HQMJ_TipMsg from "./SkinView/HQMJ_TipMsg";
import HQMJ_DissTable from "./SkinView/HQMJ_DissTable";
import HQMJ_MsgBox from "./SkinView/HQMJ_MsgBox";
import MJ_Cheating from "../MJCommon/MJ_Cheating";
import MJ_Out from "../MJCommon/MJ_Out";
import HQMJ_Pao from "./SkinView/HQMJ_Pao";
import HQMJ_La from "./SkinView/HQMJ_La";
import HQMJ_SettingView from './SkinView/HQMJ_SettingView';
import MJ_UserData from "../MJCommon/MJ_UserData";
import HQMJ_JiFenBan from "./SkinView/HQMJ_JiFenBan";
import HQMJ_FenXiang from "./SkinView/HQMJ_FenXiang";
import HQMJ_Ani from "./SkinView/HQMJ_Ani";
import HQMJ_StartAni from "./SkinView/HQMJ_StartAni";
import HQMJ_JiFenBanX from "./SkinView/HQMJ_JiFenBanX";
import HQMJ_OutCardView from "./SkinView/HQMJ_OutCardView";
import M_HQMJVoice from "./M_HQMJVoice";
import HQMJ_VideoCtl from "./SkinView/HQMJ_VideoCtl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class M_HQMJVideoView extends cc.Component {

    private static _ins: M_HQMJVideoView;
    public static get ins(): M_HQMJVideoView { return this._ins; }
    public get gameClass(): M_HQMJVideoClass { return M_HQMJVideoClass.ins; }
    
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
        private _gameInfo: HQMJ_GameInfo;//me
        /**
         * 游戏信息
         * */
        public get GameInfo(): HQMJ_GameInfo {
            return this._gameInfo;
        }
              //中间层
        // @property(cc.Node)
        // group_mid: cc.Node = null;

        @property(cc.Prefab)
        ReadyStatusGameInfoView: cc.Prefab=null;

        //准备状态时的游戏信息
        private _readyStatus_gameInfo: HQMJ_ReadyStatusGameInfo;//me
        /**
         * 准备状态游戏信息
         * */
        public get ReadyStatusGameInfo(): HQMJ_ReadyStatusGameInfo {
            return this._readyStatus_gameInfo;
        }

        @property(cc.Prefab)
        ReadyStatusGameUserView: cc.Prefab=null;

        //准备状态玩家信息
        private _readyStatus_userInfo: HQMJ_ReadyStatusUserInfo;//me
        /**
         * 准备状态玩家信息
         * */
        public get ReadyStatusUserInfo(): HQMJ_ReadyStatusUserInfo {
            return this._readyStatus_userInfo;
        }

        @property(cc.Prefab)
        Time_View: cc.Prefab=null;
        //计时器
        private _timerView: HQMJ_TimerView;//me
        /**
         * 游戏计时器
         * */
        public get TimerView(): HQMJ_TimerView {
            return this._timerView;
        }

        @property(cc.Prefab)
        SZAni_View: cc.Prefab=null;
        //骰子动画
        private _szAni: HQMJ_SZAni;//me
        /**
         * 骰子动画
         * */
        public get SZAni(): HQMJ_SZAni {
            return this._szAni;
        }

        @property(cc.Node)
        mask_node:cc.Node=null;
       
        @property(cc.Prefab)
        GameStatus_userInfo_View: cc.Prefab=null;
        //游戏状态玩家信息
        private _gameStatus_userInfo: HQMJ_GameStatusUserInfo;//me
        /**
         * 游戏状态玩家信息
         * */
        public get GameStatusUserInfo(): HQMJ_GameStatusUserInfo {
            return this._gameStatus_userInfo;
        }

        @property(cc.Prefab)
        HQMJ_Card_View: cc.Prefab=null;
        //牌阵视图
        private _cardView: HQMJ_CardView;//me
        /**
         * 牌阵视图
         * */
        public get CardView(): HQMJ_CardView {
            return this._cardView;
        }
         @property(cc.Prefab)
        HQMJ_OutCard_View: cc.Prefab = null;
        //出牌视图
        private _outCardView: HQMJ_OutCardView;//me
        /**
         * 出牌视图
         * */
        public get OutCardView(): HQMJ_OutCardView {
            return this._outCardView;
        }

        @property(cc.Prefab)
        HQMJ_OP_View: cc.Prefab=null;
        //玩家操作
        private _operatorView: HQMJ_OperatorView;
        /**
         * 操作视图
         * */
        public get OperatorView(): HQMJ_OperatorView {
            return this._operatorView;
        }
        
        @property(cc.Prefab)
        HQMJ_TingTip_View: cc.Prefab=null;
        private _tingTip:HQMJ_TingTip;
        /**
         * 听牌提示
         * */
        public get TingTip(): HQMJ_TingTip{
            return this._tingTip;
        }

        @property(cc.Prefab)
        HQMJ_JieShuan_View: cc.Prefab=null;
        //结算
        private _jieShuan: HQMJ_JieShuan;//me
        /**
         * 结算视图
         * */
        public get JieShuanView(): HQMJ_JieShuan {
            return this._jieShuan;
        }

        @property(cc.Prefab)
        HQMJ_TipMsg_View:cc.Prefab=null;
        private _tipMsg:HQMJ_TipMsg;
        /**
         * Tip视图
         */
        public get TipMsgView():HQMJ_TipMsg{
            return this._tipMsg;
        }

        @property(cc.Prefab)
        HQMJ_DissTable_View:cc.Prefab=null;
        /**
         * 解散房间界面
         */
        private _dissTable:HQMJ_DissTable;
        /**
         * 解散房间界面
         */
        public get DissTable():HQMJ_DissTable{
            return this._dissTable;
        }

        @property(cc.Prefab)
        HQMJ_MsgBox_View:cc.Prefab=null;

        private _msgBox:HQMJ_MsgBox;

        public get MsgBox():HQMJ_MsgBox{
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
        HQMJ_Setting_View:cc.Prefab=null;
        public _setting: HQMJ_SettingView;

        @property(cc.Prefab)
        HQMJ_UserData_View:cc.Prefab=null;
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
        HQMJ_FenXiang_View:cc.Prefab=null;
        //分享板
        private _fenxiang:HQMJ_FenXiang;

        public get PlayFenXiang():HQMJ_FenXiang{return this._fenxiang}

        @property(cc.Prefab)
        HQMJ_Ani_View:cc.Prefab=null;
        //动画面板
        private _aniPanel:HQMJ_Ani;

        @property(cc.Prefab)
        HQMJ_Start_Ani: cc.Prefab=null;
        private _startAni:HQMJ_StartAni;
        /**
         * 帮助
         * */
        public get StartAni():HQMJ_StartAni{
            return this._startAni;
        };
        // @property(cc.Button)
        //位置
        // btn_location:cc.Button=null;
        // @property(cc.Button)
        //请求听牌提示
        // btn_tingtip:cc.Button=null;
	
	 @property(cc.Prefab)
   	 HQMJ_VideoCtl_View:cc.Prefab=null;
    	//录像控制条
    	private _videoCtl: HQMJ_VideoCtl;
   	 /**
    	 * 录像控制条
    	 * */
    	public get VideoCtl():HQMJ_VideoCtl{
            return this._videoCtl;
    	}
        onLoad(){
            M_HQMJVideoView._ins = this;
            // M_HQMJVideoClass.ins.view = this;
            
            let ginode=cc.instantiate(this.GameInfoView);
            this._gameInfo=ginode.getComponent<HQMJ_GameInfo>(HQMJ_GameInfo);
            this.group_mid.addChild(ginode);

            let rsgnode=cc.instantiate(this.ReadyStatusGameInfoView);
            this._readyStatus_gameInfo=rsgnode.getComponent<HQMJ_ReadyStatusGameInfo>(HQMJ_ReadyStatusGameInfo);
            this.node.addChild(rsgnode);
            
            let rsunode=cc.instantiate(this.ReadyStatusGameUserView);
            this._readyStatus_userInfo=rsunode.getComponent<HQMJ_ReadyStatusUserInfo>(HQMJ_ReadyStatusUserInfo);
            this.node.addChild(rsunode);
            
            let timenode=cc.instantiate(this.Time_View);
            this._timerView=timenode.getComponent<HQMJ_TimerView>(HQMJ_TimerView);
            this.group_mid.addChild(timenode);

            let sznode=cc.instantiate(this.SZAni_View);
            this._szAni=sznode.getComponent<HQMJ_SZAni>(HQMJ_SZAni);
            this.node.addChild(sznode);            
            
            let cvnode=cc.instantiate(this.HQMJ_Card_View);
            this._cardView=cvnode.getComponent<HQMJ_CardView>(HQMJ_CardView);
            this.group_mid.addChild(cvnode);

            let ocvnode=cc.instantiate(this.HQMJ_OutCard_View);
            this._outCardView=ocvnode.getComponent<HQMJ_OutCardView>(HQMJ_OutCardView);
            this.group_mid.addChild(ocvnode);

            let gsunode=cc.instantiate(this.GameStatus_userInfo_View);
            this._gameStatus_userInfo=gsunode.getComponent<HQMJ_GameStatusUserInfo>(HQMJ_GameStatusUserInfo);
            this.node.addChild(gsunode);      

            let opnode=cc.instantiate(this.HQMJ_OP_View);
            this._operatorView=opnode.getComponent<HQMJ_OperatorView>(HQMJ_OperatorView);
            this.node.addChild(opnode);

            let tingtipnode=cc.instantiate(this.HQMJ_TingTip_View);
            this._tingTip=tingtipnode.getComponent<HQMJ_TingTip>(HQMJ_TingTip);
            this.node.addChild(tingtipnode);

            let setnode=cc.instantiate(this.HQMJ_Setting_View);
            this._setting=setnode.getComponent<HQMJ_SettingView>(HQMJ_SettingView);
            this.node.addChild(setnode);

            let udnode=cc.instantiate(this.HQMJ_UserData_View);
            this._userData=udnode.getComponent<MJ_UserData>(MJ_UserData);
            this.node.addChild(udnode);

            let tipnode=cc.instantiate(this.HQMJ_TipMsg_View);
            this._tipMsg=tipnode.getComponent<HQMJ_TipMsg>(HQMJ_TipMsg);
            this.node.addChild(tipnode);

            let aninode=cc.instantiate(this.HQMJ_Ani_View);
            this._aniPanel=aninode.getComponent<HQMJ_Ani>(HQMJ_Ani);
            this.node.addChild(aninode);

            let saninode=cc.instantiate(this.HQMJ_Start_Ani);
            this._startAni=saninode.getComponent<HQMJ_StartAni>(HQMJ_StartAni);
            this.node.addChild(saninode);

            let msgboxnode=cc.instantiate(this.HQMJ_MsgBox_View);
            this._msgBox=msgboxnode.getComponent<HQMJ_MsgBox>(HQMJ_MsgBox);
            this.node.addChild(msgboxnode);
	    
	    let vcnode=cc.instantiate(this.HQMJ_VideoCtl_View);
            this._videoCtl=vcnode.getComponent<HQMJ_VideoCtl>(HQMJ_VideoCtl);
            this.node.addChild(vcnode);
	
            let cheatNode=cc.instantiate(this.MJ_Cheating);
            this._mjcheat=cheatNode.getComponent<MJ_Cheating>(MJ_Cheating);
            this.node.addChild(cheatNode);

            let mjoutNode=cc.instantiate(this.MJ_Out);
            this._mjOut=mjoutNode.getComponent<MJ_Out>(MJ_Out);
            this.node.addChild(mjoutNode);

            let jsnode=cc.instantiate(this.HQMJ_JieShuan_View);
            this._jieShuan=jsnode.getComponent<HQMJ_JieShuan>(HQMJ_JieShuan);
            this.node.addChild(jsnode);

            let fxnode=cc.instantiate(this.HQMJ_FenXiang_View);
            this._fenxiang=fxnode.getComponent<HQMJ_FenXiang>(HQMJ_FenXiang);
            this.node.addChild(fxnode);

            let disstablenode=cc.instantiate(this.HQMJ_DissTable_View);
            this._dissTable=disstablenode.getComponent<HQMJ_DissTable>(HQMJ_DissTable);
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
        this._gameStatus_userInfo.tableOwener = M_HQMJVideoClass.ins.getTableConfig().tableCreatorChair;
        this._timerView.showArrow = M_HQMJVideoClass.ins.getSelfChair();
        this._timerView.showArr(255,M_HQMJVideoClass.ins.getSelfChair(),true);
        this._timerView.timerNum = 0;
        this._timerView.showArrow = HQMJMahjongDef.gInvalidChar;
        this._timerView.node.active=false;
    }

    public StartSendCard():void{
        this._gameInfo.holdCardOver();
            for(let i=0;i<HQMJMahjongDef.gPlayerNum;i++){
                this.CardView.holdTricksCard(i,13);
            }
        // this._szAni.playSZ(M_HQMJVideoClass.ins.SZ1,M_HQMJVideoClass.ins.SZ2,HQMJEvent.msg_holdCardSZComplete);
    }

    public TableCreatorInfo(chair:number):void{
        this._gameStatus_userInfo.tableOwener = chair;
    }

    /**
     * 分享按钮事件
     */
    public OnButtonShare() {
        //this.gameClass.ShowShare(0, this.gameClass.TableID, this.gameClass.WebConfigName + "淮北麻将分享",HQMJ.ins.iclass.getTableConfig().shareContext);
    }

    /**
     * 事件监听
     * */
    private onGameEvent(e: HQMJEvent): void {
        switch(e.msgCode) {

            //抓牌骰子动画播放完毕
            case HQMJEvent.msg_holdCardSZComplete: {
                // for(let i=0;i<HQMJMahjongDef.gPlayerNum;i++){
                //     this.CardView.holdTricksCard(i,13);
                // }
                // for(var i:number=0; i<HQMJMahjongDef.gPlayerNum; i++){
                //     this._cardView.getActive(i).arrangeHandCard();
                // }
                this._cardView.selfActive.refreshHandCardData(M_HQMJVideoClass.ins.getSelfHandCardData());
                this._szAni.node.active = false;
                this._gameInfo.holdCardOver();
                // this._videoCtl.start();
                e.stopPropagation();
                //this._sendCardEngine.start(M_HQMJVideoClass.ins.BankerChair);
                break;
            }
            //继续游戏
            case HQMJEvent.msg_goongame: {
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
    public playHQMJAni(chair: number,aniType: enHQMJAniType): void {
            var logicChair: number = M_HQMJVideoClass.ins.physical2logicChair(chair);
            switch(aniType) {
                case enHQMJAniType.aniType_peng: {
                    this._aniPanel.PlayAnimation("AniPeng",logicChair);
                    break;
                }
                case enHQMJAniType.aniType_minggGang: {
                     this._aniPanel.PlayAnimation("AniGang",logicChair);
                    break;
                }
                case enHQMJAniType.aniType_anGang: {
                     this._aniPanel.PlayAnimation("AniGang",logicChair);
                    break;
                }
                case enHQMJAniType.aniType_huCard: {
                      this._aniPanel.PlayAnimation("AniHu",logicChair);
                    break;
                }
                case enHQMJAniType.aniType_ziMo: {
                     this._aniPanel.PlayAnimation("AniZimo",logicChair);                 
                    break;
                }
                case enHQMJAniType.aniType_chi: {
                     this._aniPanel.PlayAnimation("AniChi",logicChair);                 
                    break;
                }
                case enHQMJAniType.aniType_bao: {
                     this._aniPanel.PlayAnimation("AniBao",logicChair);                 
                    break;
                }
                case enHQMJAniType.aniType_start: {
                     this._aniPanel.PlayAnimation("AniStart",logicChair);                 
                    break;
                }
            }
        }

    public showMsg(){
        
    }
}
