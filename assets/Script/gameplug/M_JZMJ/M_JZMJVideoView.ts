import M_JZMJVideoClass from './M_JZMJVideoClass';
import { JZMJMahjongDef, IJZMJView, JZMJ, JZMJTableConfig, JZMJTimer, enGamePhase, JZMJOutCardPlayer, JZMJRecordCard, enJZMJAniType } from "./ConstDef/JZMJMahjongDef";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { GameIF } from "../../CommonSrc/GameIF";
import M_JZMJClass from "./M_JZMJClass";
import JZMJ_ReadyStatusGameInfo from "./SkinView/JZMJ_ReadyStatusGameInfo";
import JZMJ_GameInfo from "./SkinView/JZMJ_GameInfo";
import JZMJ_ReadyStatusUserInfo from './SkinView/JZMJ_ReadyStatusUserInfo';
import { M_JZMJ_GameMessage } from "../../CommonSrc/M_JZMJ_GameMessage";
import JZMJ_TimerView from "./SkinView/JZMJ_Timer";
import JZMJ_SZAni from "./SkinView/JZMJ_SZAni";
import JZMJ_GameStatusUserInfo from "./SkinView/JZMJ_GameStatusUserInfo";
import JZMJ_CardView from "./SkinView/JZMJ_CardView";
import JZMJEvent from "./JZMJEvent";
import JZMJ_OperatorView from "./SkinView/JZMJ_OperatorView";
import JZMJ_JieShuan from "./SkinView/JZMJ_JieShuan";
import MJ_RecordVideo from "../MJCommon/MJ_RecordVideo";
import JZMJ_SelGang from "./SkinView/JZMJ_SelGang";
import JZMJ_PaiWall from "./SkinView/JZMJ_PaiWalls";
import JZMJ_QiangGangView from "./SkinView/JZMJ_QiangGangView";
import JZMJ_TingTip from "./SkinView/JZMJ_TingTip";
import JZMJ_HelpView from "./SkinView/JZMJ_HelpView";
import JZMJ_TipMsg from "./SkinView/JZMJ_TipMsg";
import JZMJ_DissTable from "./SkinView/JZMJ_DissTable";
import JZMJ_MsgBox from "./SkinView/JZMJ_MsgBox";
import MJ_Cheating from "../MJCommon/MJ_Cheating";
import MJ_Out from "../MJCommon/MJ_Out";
import JZMJ_Pao from "./SkinView/JZMJ_Pao";
import JZMJ_La from "./SkinView/JZMJ_La";
import JZMJ_SettingView from './SkinView/JZMJ_SettingView';
import MJ_UserData from "../MJCommon/MJ_UserData";
import JZMJ_JiFenBan from "./SkinView/JZMJ_JiFenBan";
import JZMJ_FenXiang from "./SkinView/JZMJ_FenXiang";
import JZMJ_Ani from "./SkinView/JZMJ_Ani";
import JZMJ_StartAni from "./SkinView/JZMJ_StartAni";
import JZMJ_JiFenBanX from "./SkinView/JZMJ_JiFenBanX";
import JZMJ_OutCardView from "./SkinView/JZMJ_OutCardView";
import M_JZMJVoice from "./M_JZMJVoice";
import JZMJ_VideoCtl from "./SkinView/JZMJ_VideoCtl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class M_JZMJVideoView extends cc.Component {

    private static _ins: M_JZMJVideoView;
    public static get ins(): M_JZMJVideoView { return this._ins; }
    public get gameClass(): M_JZMJVideoClass { return M_JZMJVideoClass.ins; }
    
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
        private _gameInfo: JZMJ_GameInfo;//me
        /**
         * 游戏信息
         * */
        public get GameInfo(): JZMJ_GameInfo {
            return this._gameInfo;
        }
              //中间层
        // @property(cc.Node)
        // group_mid: cc.Node = null;

        @property(cc.Prefab)
        ReadyStatusGameInfoView: cc.Prefab=null;

        //准备状态时的游戏信息
        private _readyStatus_gameInfo: JZMJ_ReadyStatusGameInfo;//me
        /**
         * 准备状态游戏信息
         * */
        public get ReadyStatusGameInfo(): JZMJ_ReadyStatusGameInfo {
            return this._readyStatus_gameInfo;
        }

        @property(cc.Prefab)
        ReadyStatusGameUserView: cc.Prefab=null;

        //准备状态玩家信息
        private _readyStatus_userInfo: JZMJ_ReadyStatusUserInfo;//me
        /**
         * 准备状态玩家信息
         * */
        public get ReadyStatusUserInfo(): JZMJ_ReadyStatusUserInfo {
            return this._readyStatus_userInfo;
        }

        @property(cc.Prefab)
        Time_View: cc.Prefab=null;
        //计时器
        private _timerView: JZMJ_TimerView;//me
        /**
         * 游戏计时器
         * */
        public get TimerView(): JZMJ_TimerView {
            return this._timerView;
        }

        @property(cc.Prefab)
        SZAni_View: cc.Prefab=null;
        //骰子动画
        private _szAni: JZMJ_SZAni;//me
        /**
         * 骰子动画
         * */
        public get SZAni(): JZMJ_SZAni {
            return this._szAni;
        }

        @property(cc.Node)
        mask_node:cc.Node=null;
       
        @property(cc.Prefab)
        GameStatus_userInfo_View: cc.Prefab=null;
        //游戏状态玩家信息
        private _gameStatus_userInfo: JZMJ_GameStatusUserInfo;//me
        /**
         * 游戏状态玩家信息
         * */
        public get GameStatusUserInfo(): JZMJ_GameStatusUserInfo {
            return this._gameStatus_userInfo;
        }

        @property(cc.Prefab)
        JZMJ_Card_View: cc.Prefab=null;
        //牌阵视图
        private _cardView: JZMJ_CardView;//me
        /**
         * 牌阵视图
         * */
        public get CardView(): JZMJ_CardView {
            return this._cardView;
        }
         @property(cc.Prefab)
        JZMJ_OutCard_View: cc.Prefab = null;
        //出牌视图
        private _outCardView: JZMJ_OutCardView;//me
        /**
         * 出牌视图
         * */
        public get OutCardView(): JZMJ_OutCardView {
            return this._outCardView;
        }

        @property(cc.Prefab)
        JZMJ_OP_View: cc.Prefab=null;
        //玩家操作
        private _operatorView: JZMJ_OperatorView;
        /**
         * 操作视图
         * */
        public get OperatorView(): JZMJ_OperatorView {
            return this._operatorView;
        }
        
        @property(cc.Prefab)
        JZMJ_TingTip_View: cc.Prefab=null;
        private _tingTip:JZMJ_TingTip;
        /**
         * 听牌提示
         * */
        public get TingTip(): JZMJ_TingTip{
            return this._tingTip;
        }

        @property(cc.Prefab)
        JZMJ_JieShuan_View: cc.Prefab=null;
        //结算
        private _jieShuan: JZMJ_JieShuan;//me
        /**
         * 结算视图
         * */
        public get JieShuanView(): JZMJ_JieShuan {
            return this._jieShuan;
        }

        @property(cc.Prefab)
        JZMJ_TipMsg_View:cc.Prefab=null;
        private _tipMsg:JZMJ_TipMsg;
        /**
         * Tip视图
         */
        public get TipMsgView():JZMJ_TipMsg{
            return this._tipMsg;
        }

        @property(cc.Prefab)
        JZMJ_DissTable_View:cc.Prefab=null;
        /**
         * 解散房间界面
         */
        private _dissTable:JZMJ_DissTable;
        /**
         * 解散房间界面
         */
        public get DissTable():JZMJ_DissTable{
            return this._dissTable;
        }

        @property(cc.Prefab)
        JZMJ_MsgBox_View:cc.Prefab=null;

        private _msgBox:JZMJ_MsgBox;

        public get MsgBox():JZMJ_MsgBox{
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
        JZMJ_Setting_View:cc.Prefab=null;
        public _setting: JZMJ_SettingView;

        @property(cc.Prefab)
        JZMJ_UserData_View:cc.Prefab=null;
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
        JZMJ_FenXiang_View:cc.Prefab=null;
        //分享板
        private _fenxiang:JZMJ_FenXiang;

        public get PlayFenXiang():JZMJ_FenXiang{return this._fenxiang}

        @property(cc.Prefab)
        JZMJ_Ani_View:cc.Prefab=null;
        //动画面板
        private _aniPanel:JZMJ_Ani;

        @property(cc.Prefab)
        JZMJ_Start_Ani: cc.Prefab=null;
        private _startAni:JZMJ_StartAni;
        /**
         * 帮助
         * */
        public get StartAni():JZMJ_StartAni{
            return this._startAni;
        };
        // @property(cc.Button)
        //位置
        // btn_location:cc.Button=null;
        // @property(cc.Button)
        //请求听牌提示
        // btn_tingtip:cc.Button=null;
	
	 @property(cc.Prefab)
   	 JZMJ_VideoCtl_View:cc.Prefab=null;
    	//录像控制条
    	private _videoCtl: JZMJ_VideoCtl;
   	 /**
    	 * 录像控制条
    	 * */
    	public get VideoCtl():JZMJ_VideoCtl{
            return this._videoCtl;
    	}
        onLoad(){
            M_JZMJVideoView._ins = this;
            // M_JZMJVideoClass.ins.view = this;
            
            let ginode=cc.instantiate(this.GameInfoView);
            this._gameInfo=ginode.getComponent<JZMJ_GameInfo>(JZMJ_GameInfo);
            this.group_mid.addChild(ginode);

            let rsgnode=cc.instantiate(this.ReadyStatusGameInfoView);
            this._readyStatus_gameInfo=rsgnode.getComponent<JZMJ_ReadyStatusGameInfo>(JZMJ_ReadyStatusGameInfo);
            this.node.addChild(rsgnode);
            
            let rsunode=cc.instantiate(this.ReadyStatusGameUserView);
            this._readyStatus_userInfo=rsunode.getComponent<JZMJ_ReadyStatusUserInfo>(JZMJ_ReadyStatusUserInfo);
            this.node.addChild(rsunode);
            
            let timenode=cc.instantiate(this.Time_View);
            this._timerView=timenode.getComponent<JZMJ_TimerView>(JZMJ_TimerView);
            this.group_mid.addChild(timenode);

            let sznode=cc.instantiate(this.SZAni_View);
            this._szAni=sznode.getComponent<JZMJ_SZAni>(JZMJ_SZAni);
            this.node.addChild(sznode);            
            
            let cvnode=cc.instantiate(this.JZMJ_Card_View);
            this._cardView=cvnode.getComponent<JZMJ_CardView>(JZMJ_CardView);
            this.group_mid.addChild(cvnode);

            let ocvnode=cc.instantiate(this.JZMJ_OutCard_View);
            this._outCardView=ocvnode.getComponent<JZMJ_OutCardView>(JZMJ_OutCardView);
            this.group_mid.addChild(ocvnode);

            let gsunode=cc.instantiate(this.GameStatus_userInfo_View);
            this._gameStatus_userInfo=gsunode.getComponent<JZMJ_GameStatusUserInfo>(JZMJ_GameStatusUserInfo);
            this.node.addChild(gsunode);      

            let opnode=cc.instantiate(this.JZMJ_OP_View);
            this._operatorView=opnode.getComponent<JZMJ_OperatorView>(JZMJ_OperatorView);
            this.node.addChild(opnode);

            let tingtipnode=cc.instantiate(this.JZMJ_TingTip_View);
            this._tingTip=tingtipnode.getComponent<JZMJ_TingTip>(JZMJ_TingTip);
            this.node.addChild(tingtipnode);

            let setnode=cc.instantiate(this.JZMJ_Setting_View);
            this._setting=setnode.getComponent<JZMJ_SettingView>(JZMJ_SettingView);
            this.node.addChild(setnode);

            let udnode=cc.instantiate(this.JZMJ_UserData_View);
            this._userData=udnode.getComponent<MJ_UserData>(MJ_UserData);
            this.node.addChild(udnode);

            let tipnode=cc.instantiate(this.JZMJ_TipMsg_View);
            this._tipMsg=tipnode.getComponent<JZMJ_TipMsg>(JZMJ_TipMsg);
            this.node.addChild(tipnode);

            let aninode=cc.instantiate(this.JZMJ_Ani_View);
            this._aniPanel=aninode.getComponent<JZMJ_Ani>(JZMJ_Ani);
            this.node.addChild(aninode);

            let saninode=cc.instantiate(this.JZMJ_Start_Ani);
            this._startAni=saninode.getComponent<JZMJ_StartAni>(JZMJ_StartAni);
            this.node.addChild(saninode);

            let msgboxnode=cc.instantiate(this.JZMJ_MsgBox_View);
            this._msgBox=msgboxnode.getComponent<JZMJ_MsgBox>(JZMJ_MsgBox);
            this.node.addChild(msgboxnode);
	    
	    let vcnode=cc.instantiate(this.JZMJ_VideoCtl_View);
            this._videoCtl=vcnode.getComponent<JZMJ_VideoCtl>(JZMJ_VideoCtl);
            this.node.addChild(vcnode);
	
            let cheatNode=cc.instantiate(this.MJ_Cheating);
            this._mjcheat=cheatNode.getComponent<MJ_Cheating>(MJ_Cheating);
            this.node.addChild(cheatNode);

            let mjoutNode=cc.instantiate(this.MJ_Out);
            this._mjOut=mjoutNode.getComponent<MJ_Out>(MJ_Out);
            this.node.addChild(mjoutNode);

            let jsnode=cc.instantiate(this.JZMJ_JieShuan_View);
            this._jieShuan=jsnode.getComponent<JZMJ_JieShuan>(JZMJ_JieShuan);
            this.node.addChild(jsnode);

            let fxnode=cc.instantiate(this.JZMJ_FenXiang_View);
            this._fenxiang=fxnode.getComponent<JZMJ_FenXiang>(JZMJ_FenXiang);
            this.node.addChild(fxnode);

            let disstablenode=cc.instantiate(this.JZMJ_DissTable_View);
            this._dissTable=disstablenode.getComponent<JZMJ_DissTable>(JZMJ_DissTable);
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
        this._gameStatus_userInfo.tableOwener = M_JZMJVideoClass.ins.getTableConfig().tableCreatorChair;
        this._timerView.showArrow = M_JZMJVideoClass.ins.getSelfChair();
        this._timerView.showArr(255,M_JZMJVideoClass.ins.getSelfChair(),true);
        // this._timerView.timerNum = 0;
        this._timerView.showArrow = JZMJMahjongDef.gInvalidChar;
        this._timerView.node.active=false;
    }

    public StartSendCard():void{
        this._gameInfo.holdCardOver();
            for(let i=0;i<JZMJMahjongDef.gPlayerNum;i++){
                this.CardView.holdTricksCard(i,13);
            }
        // this._szAni.playSZ(M_JZMJVideoClass.ins.SZ1,M_JZMJVideoClass.ins.SZ2,JZMJEvent.msg_holdCardSZComplete);
    }

    public TableCreatorInfo(chair:number):void{
        this._gameStatus_userInfo.tableOwener = chair;
    }

    /**
     * 分享按钮事件
     */
    public OnButtonShare() {
        //this.gameClass.ShowShare(0, this.gameClass.TableID, this.gameClass.WebConfigName + "淮北麻将分享",JZMJ.ins.iclass.getTableConfig().shareContext);
    }

    /**
     * 事件监听
     * */
    private onGameEvent(e: JZMJEvent): void {
        switch(e.msgCode) {

            //抓牌骰子动画播放完毕
            case JZMJEvent.msg_holdCardSZComplete: {
                // for(let i=0;i<JZMJMahjongDef.gPlayerNum;i++){
                //     this.CardView.holdTricksCard(i,13);
                // }
                // for(var i:number=0; i<JZMJMahjongDef.gPlayerNum; i++){
                //     this._cardView.getActive(i).arrangeHandCard();
                // }
                this._cardView.selfActive.refreshHandCardData(M_JZMJVideoClass.ins.getSelfHandCardData());
                this._szAni.node.active = false;
                this._gameInfo.holdCardOver();
                // this._videoCtl.start();
                e.stopPropagation();
                //this._sendCardEngine.start(M_JZMJVideoClass.ins.BankerChair);
                break;
            }
            //继续游戏
            case JZMJEvent.msg_goongame: {
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
    public playJZMJAni(chair: number,aniType: enJZMJAniType): void {
            var logicChair: number = M_JZMJVideoClass.ins.physical2logicChair(chair);
            switch(aniType) {
                case enJZMJAniType.aniType_peng: {
                    this._aniPanel.PlayAnimation("AniPeng",logicChair);
                    break;
                }
                case enJZMJAniType.aniType_minggGang: {
                     this._aniPanel.PlayAnimation("AniGang",logicChair);
                    break;
                }
                case enJZMJAniType.aniType_anGang: {
                     this._aniPanel.PlayAnimation("AniGang",logicChair);
                    break;
                }
                case enJZMJAniType.aniType_huCard: {
                      this._aniPanel.PlayAnimation("AniHu",logicChair);
                    break;
                }
                case enJZMJAniType.aniType_ziMo: {
                     this._aniPanel.PlayAnimation("AniZimo",logicChair);                 
                    break;
                }
                case enJZMJAniType.aniType_chi: {
                     this._aniPanel.PlayAnimation("AniChi",logicChair);                 
                    break;
                }
                case enJZMJAniType.aniType_bao: {
                     this._aniPanel.PlayAnimation("AniBao",logicChair);                 
                    break;
                }
                case enJZMJAniType.aniType_start: {
                     this._aniPanel.PlayAnimation("AniStart",logicChair);                 
                    break;
                }
            }
        }

    public showMsg(){
        
    }
}
