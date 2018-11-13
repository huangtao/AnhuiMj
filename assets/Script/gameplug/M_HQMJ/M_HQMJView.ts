const {ccclass, property} = cc._decorator;

import { HQMJMahjongDef, IHQMJView, HQMJ, HQMJTableConfig, HQMJTimer, enGamePhase, HQMJOutCardPlayer, HQMJRecordCard, enHQMJAniType } from "./ConstDef/HQMJMahjongDef";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { GameIF } from "../../CommonSrc/GameIF";
import M_HQMJClass from './M_HQMJClass';
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
import M_HQMJVoice from './M_HQMJVoice';
import M_HQMJVideoClass from './M_HQMJVideoClass';
import HuDong_Animation from "../MJCommon/HuDong_Animation";

@ccclass
export default class M_HQMJView extends cc.Component implements IHQMJView {

        private static AniPos: Array<{ x: number,y: number }> = [
            { x: 640,y: 510 },
            { x: 1110,y: 360 },
            { x: 640,y: 150 },
            { x: 180,y: 360 }
        ];
    
        private static _ins: M_HQMJView;
        /**
         * HQMJView单例
         * */
        public static get ins(): M_HQMJView { return this._ins; }
        public get gameClass(): M_HQMJClass { return M_HQMJClass.ins; }

        //东南西北显示
        @property(cc.Sprite)
        fangXiangView:cc.Sprite = null;

        //局数显示
        @property(cc.Node)
        group_gameNum: cc.Node=null;

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
        @property(cc.Node)
        group_mid: cc.Node = null;

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
        prefab_hudong:cc.Prefab = null;
        private huDongDaoJu:HuDong_Animation;
        public get HuDong_Ani():HuDong_Animation{
            return this.huDongDaoJu;
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
        HQMJ_SelGang_View: cc.Prefab=null;
        //选择杠
        private _selGang: HQMJ_SelGang;
        /**
         * 选择杠视图
         * */
        public get SelGangView(): HQMJ_SelGang {
            return this._selGang;
        }

        @property(cc.Prefab)
        HQMJ_SelChi_View: cc.Prefab=null;
        //选择吃
        private _selChi: HQMJ_SelChi;
        /**
         * 选择吃视图
         * */
        public get SelChiView(): HQMJ_SelChi {
            return this._selChi;
        }

         @property(cc.Prefab)
        HQMJ_BaoTing_View: cc.Prefab=null;
        //选择豹听
        private _BaoTing: HQMJ_BaoTing;
        /**
         * 选择豹听视图
         * */
        public get SelBaoTing(): HQMJ_BaoTing {
            return this._BaoTing;
        }
        
        @property(cc.Prefab)
        HQMJ_QiangGang_View: cc.Prefab=null;
        //抢杠
        private _qiangGang: HQMJ_QiangGangView;
        /**
         * 抢杠视图
         * */
        public get QiangGangView(): HQMJ_QiangGangView {
            return this._qiangGang;
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



        @property(cc.Button)
        //录音
        btn_recordVideo:cc.Button=null;

        @property(cc.Button)
        //语句设置
        btn_chat:cc.Button=null;

        @property(cc.Prefab)
        HQMJ_help_View: cc.Prefab=null;
        private _help:HQMJ_HelpView;//me
        /**
         * 帮助
         * */
        public get Help():HQMJ_HelpView{
            return this._help;
        };


        @property(cc.Prefab)
        //录音
        HQMJ_recordVideo: cc.Prefab=null;
        private _recordVideo: MJ_RecordVideo;//me

        //是否有录音
        private _haveRecordVoice:boolean;


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
        HQMJ_Pao_View:cc.Prefab=null;
        //跑
        private _pao:HQMJ_Pao;//me

        public get PaoView():HQMJ_Pao{
            return this._pao;
        }

        @property(cc.Prefab)
        HQMJ_La_View:cc.Prefab=null;
        //拉
        private _la:HQMJ_La;//me

        public get LaView():HQMJ_La{
            return this._la;
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

        // @property(cc.Button)
        // //请求计分板
        // btn_queryRecord:cc.Button=null;

        @property(cc.Prefab)
        HQMJ_JiFenBan_View:cc.Prefab=null;
        //记分板
        private _jifenban:HQMJ_JiFenBanX;
        /**
         * 游戏记分板
         * */
        public get GameJiFenBan(): HQMJ_JiFenBanX{
            return this._jifenban;
        }

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
        @property(cc.Button)
        //位置
        btn_location:cc.Button=null;
        @property(cc.Button)
        //请求听牌提示
        btn_tingtip:cc.Button=null;

        onLoad(){
            M_HQMJView._ins = this;
            HQMJ.ins.iview = this;
            
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

            let selcnode=cc.instantiate(this.HQMJ_SelChi_View);
            this._selChi=selcnode.getComponent<HQMJ_SelChi>(HQMJ_SelChi);
            this.node.addChild(selcnode);

            let baocnode=cc.instantiate(this.HQMJ_BaoTing_View);
            this._BaoTing=baocnode.getComponent<HQMJ_BaoTing>(HQMJ_BaoTing);
            this.node.addChild(baocnode);

            let selgnode=cc.instantiate(this.HQMJ_SelGang_View);
            this._selGang=selgnode.getComponent<HQMJ_SelGang>(HQMJ_SelGang);
            this.node.addChild(selgnode);

            let qianggnode=cc.instantiate(this.HQMJ_QiangGang_View);
            this._qiangGang=qianggnode.getComponent<HQMJ_QiangGangView>(HQMJ_QiangGangView);
            this.node.addChild(qianggnode);

            let tingtipnode=cc.instantiate(this.HQMJ_TingTip_View);
            this._tingTip=tingtipnode.getComponent<HQMJ_TingTip>(HQMJ_TingTip);
            this.node.addChild(tingtipnode);

            let paonode=cc.instantiate(this.HQMJ_Pao_View);
            this._pao=paonode.getComponent<HQMJ_Pao>(HQMJ_Pao);
            this.node.addChild(paonode);

            let lanode=cc.instantiate(this.HQMJ_La_View);
            this._la=lanode.getComponent<HQMJ_La>(HQMJ_La);
            this.node.addChild(lanode);

            let setnode=cc.instantiate(this.HQMJ_Setting_View);
            this._setting=setnode.getComponent<HQMJ_SettingView>(HQMJ_SettingView);
            this.node.addChild(setnode);

            let recordVnode=cc.instantiate(this.HQMJ_recordVideo);
            this._recordVideo=recordVnode.getComponent<MJ_RecordVideo>(MJ_RecordVideo);
            this.node.addChild(recordVnode);

            let udnode=cc.instantiate(this.HQMJ_UserData_View);
            this._userData=udnode.getComponent<MJ_UserData>(MJ_UserData);
            this.node.addChild(udnode);

            let helpnode=cc.instantiate(this.HQMJ_help_View);
            this._help=helpnode.getComponent<HQMJ_HelpView>(HQMJ_HelpView);
            this.node.addChild(helpnode);

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

            let cheatNode=cc.instantiate(this.MJ_Cheating);
            this._mjcheat=cheatNode.getComponent<MJ_Cheating>(MJ_Cheating);
            this.node.addChild(cheatNode);

            let mjoutNode=cc.instantiate(this.MJ_Out);
            this._mjOut=mjoutNode.getComponent<MJ_Out>(MJ_Out);
            this.node.addChild(mjoutNode);

            let hudongnode = cc.instantiate(this.prefab_hudong);
            this.huDongDaoJu = hudongnode.getComponent<HuDong_Animation>(HuDong_Animation);
            this.node.addChild(hudongnode);

            let jsnode=cc.instantiate(this.HQMJ_JieShuan_View);
            this._jieShuan=jsnode.getComponent<HQMJ_JieShuan>(HQMJ_JieShuan);
            this.node.addChild(jsnode);

            let fxnode=cc.instantiate(this.HQMJ_FenXiang_View);
            this._fenxiang=fxnode.getComponent<HQMJ_FenXiang>(HQMJ_FenXiang);
            this.node.addChild(fxnode);

            let jfbnode=cc.instantiate(this.HQMJ_JiFenBan_View);
            this._jifenban=jfbnode.getComponent<HQMJ_JiFenBanX>(HQMJ_JiFenBanX);
            this.node.addChild(jfbnode);

            let disstablenode=cc.instantiate(this.HQMJ_DissTable_View);
            this._dissTable=disstablenode.getComponent<HQMJ_DissTable>(HQMJ_DissTable);
            this.node.addChild(disstablenode);
            
            this.btn_recordVideo.node.active=false;
            this.btn_chat.node.active=false;
            // this.btn_queryRecord.node.active=false;
            this._haveRecordVoice=false;
            this.btn_location.node.active=false;
            this.node.on(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
            this.btn_chat.node.on(cc.Node.EventType.TOUCH_END,this.onshowChatWindows,this);

            this.btn_recordVideo.node.on(cc.Node.EventType.TOUCH_START,this.onStartRecordVideo,this);
            this.btn_recordVideo.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onStopRecordVideo,this);
            this.btn_recordVideo.node.on(cc.Node.EventType.TOUCH_END,this.onStopRecordVideo,this);

            // this.btn_queryRecord.node.on(cc.Node.EventType.TOUCH_END,() => {
            //     if(0 == M_HQMJClass.ins.TableConfig.alreadyGameNum){
            //         this.MsgBox.showMsgBox("暂无游戏记录");
            //     }else{
            //         this._jifenban.startShow();
            //     }
            // },this);


            cc.game.on(cc.game.EVENT_HIDE, this.onStopRecordVideo, this);
             cc.game.on(cc.game.EVENT_HIDE, this.onReflashHandCard, this);
            this.btn_location.node.on(cc.Node.EventType.TOUCH_END,this.onMap,this);

            this.mask_node.on(cc.Node.EventType.TOUCH_START, this.OnButtonBg, this);
            //this.Inti();
        }

        public Init():void{

            this.GameInfo.init();
            this.ReadyStatusGameInfo.init();
            this.ReadyStatusUserInfo.init();
            this.TimerView.init();
            this.SZAni.init();
            this.GameStatusUserInfo.init();
            this.CardView.init();
            this.Help.init();
            this.LaView.init();
            this.PaoView.init();
            this.JieShuanView.init();
            this.UserData.init();
            this._aniPanel.init();
            this.GameJiFenBan.init();

            this.OperatorView.init();
            this.SelChiView.init();
            this.SelBaoTing.init();
            this.SelGangView.init();
            this.QiangGangView.init();
            this.TingTip.init();
            this._setting.init();
            this.PlayFenXiang.init();
            this.StartAni.init();

            this.TipMsgView.Init()
            this.DissTable.Init();
            this.MsgBox.Init();
            //this.GameJiFenBan.Init();
            this.btn_tingtip.node.active=false;



            this._recordVideo.init();
            console.log("View初始化");
            
            
            
            //this._operatorView.node.on(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
            //this._selGang.node.on(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
            //this._cardView.node.on(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
            // this._qiangGang.node.on(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
            // this._jieShuan.node.on(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
            
            //this._readyStatus_userInfo.node.on(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
            //this._szAni.node.on(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        }
        private onMap():void{
            this.gameClass.ShowMaps();
        }

        public OnResetGameView() {
            this.clear();
        }
        public OnButtonBg(){
            cc.log("关闭设置");
            if(this._setting.node.active)
            this._setting.node.active = false;
        }
        public DestroyView(){
            cc.game.off(cc.game.EVENT_HIDE, this.onStopRecordVideo, this);
            cc.game.off(cc.game.EVENT_HIDE, this.onReflashHandCard, this);
        }
        private onReflashHandCard(){
            if(cc.isValid(this._cardView))
            {
                this._cardView.selfActive.reflashHandCardForHide();
                this._cardView.refreshHideCard(0);
            }    
             if(cc.isValid(this._tingTip)){
                this._tingTip.node.active=false;
            }
        }
        /**
         * 分享按钮事件
         */
        public OnButtonShare() {
         //   this.gameClass.ShowShare(0, this.gameClass.TableID, this.gameClass.WebConfigName() + "麻将分享",HQMJ.ins.iclass.getTableConfig().shareContext);
        this.gameClass.ShowShare(0, this.gameClass.TableID, this.gameClass.WebConfigName() + "【临泉麻将】房号："+HQMJ.ins.iclass.getTableConfig().TableCode,HQMJ.ins.iclass.getTableConfig().shareContext);

        }

        private onshowSetting(e:cc.Event.EventTouch):void{
            // this._setting.showView();
            //M_HQMJClass.ins.ShowSettingForm();
            M_HQMJVoice.PlayCardType(`/sound/Button32.mp3`);
            this._setting.onOpen();
        } 

        private onshowChatWindows(e:cc.Event.EventTouch):void{
            M_HQMJVoice.PlayCardType(`/sound/Button32.mp3`);
            M_HQMJClass.ins.showChat();
        }
        /**
         * 开始录音
         * */
        private onStartRecordVideo(e:cc.Event.EventTouch):void{
            if(this.gameClass.StartRecord()){
                M_HQMJVoice.PlayCardType(`/sound/Button32.mp3`);
                this._haveRecordVoice = true;
                this._recordVideo.Show();
                //this.gameClass.PauseSound();
            }
        }
        
        /**
         * 录音结束
         * */
        private onStopRecordVideo(e:cc.Event.EventTouch):void{
            // this.btn_recordVideo.scaleX=1.0;
            // this.btn_recordVideo.scaleY=1.0;
            if(this.gameClass.AudioManager.IsRecording()){
                this._recordVideo.Close();
                this.gameClass.StopRecord();
                //播放背景音乐
                //this.gameClass.ContinueSound();
                this._haveRecordVoice=false;
            }
        }
         public TingBtn(enable:boolean):void{
            // this.btn_tingtip.interactable=enable;
            // this.btn_tingtip.node.active=enable;
            if(this._tingTip.node.active)
                this._tingTip.node.active = false;
            if(!this._tingTip.node.active && this.gameClass.isTing)
                this._tingTip.node.active = true;
        }

        private onTingTip():void{
            if(this.TingTip.node.active){   
                this.TingTip.node.active=false;
                return;
            }
            this.gameClass.showTingCard(0,3000,true);
            //this.btn_tingtip.interactable=this.TingTip.node.active;
        }
        
        // //骰子动画
        // private _szAni: HQMJ_SZAni;
        // /**
        //  * 骰子动画
        //  * */
        // public get SZAni(): HQMJ_SZAni {
        //     return this._szAni;
        // }
    
        

        // //
        // //==================================== 基类可重写 开始 =======================================
        // //
        // /**
        //  * 是否响应物理返回按钮
        //  */
        // public get isKeyHandle():boolean{
        //     return true;
        // }
        // /**
        //  * 物理返回按钮
        //  */
        // protected ClickBack():void{
            
        // }
        // /*
        //  * 界面创建完成,游戏上下文数据暂时取不到,如场地数据
        //  * */
        // protected InitUiClass() {
        //     console.log("gameview === HQMJView InitUiClass");
        //     M_HQMJView._ins = this;
        //     this._sendCardEngine = new HQMJSendCardEngine();
        //     this.TingTip;
        //     this.UserData;
        //     this.Help;
        //     this.JieShuanView;
        //     this.GameJiFenBan;
        // }

        // /**
		//  * 初始化游戏视图,皮肤已经加载完成,在这里可以访问皮肤里的组件，也可以访问gameClass中的成员
		//  * */
        // public InitGameView(): void {
        //     console.log("gameview === HQMJView InitGameView");
        //     super.InitGameView();
        //     this.touchEnabled = true;

        //     this.gameClass.addEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._operatorView.addEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._selGang.addEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._cardView.addEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._qiangGang.addEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._jieShuan.addEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._sendCardEngine.addEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._readyStatus_userInfo.addEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._szAni.addEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._pao.addEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._la.addEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);

        //     this._btn_queryRecord.addEventListener(egret.TouchEvent.TOUCH_TAP,(e: egret.TouchEvent) => {
        //         if(0 == M_HQMJClass.ins.TableConfig.alreadyGameNum){
        //             this.MsgBox.showMsgBox("暂无游戏记录");
        //         }else{
        //             this._jifenban.startShow();
        //         }
        //     },this);
        //     this._btn_chat.addEventListener(egret.TouchEvent.TOUCH_TAP,(e: egret.TouchEvent) => {
        //         M_HQMJClass.ins.showChat();
        //         M_HQMJView.ins.showCtlChat=true;
        //     },this);
        //     this._btn_recordVideo.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onStartRecordVideo,this);
        //     this._btn_recordVideo.addEventListener(egret.TouchEvent.TOUCH_END,this.onStopRecordVideo,this);
        //     this._btn_recordVideo.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onStopRecordVideo,this);
        //     this._btn_recordVideo.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onStopRecordVideo,this);
        //     this._group_ctlChatWindow.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
        //         this.gameClass.closeChat();
        //         this.showCtlChat=false;
        //     },this);
        // }
        // /**
        //  * 重置游戏场景,用于在游戏中断线重连时候重置场景
        //  * @returns {} 
        //  */
        // public OnResetGameView() {
        //     this.clear();
        // }
        // /**
        //  * 开始录音
        //  * */
        // private onStartRecordVideo(e:egret.TouchEvent):void{
        //     if(this.gameClass.StartRecord()){
        //         this._haveRecordVoice = true;
        //         this._recordVideo.show = true;
        //         this.gameClass.PauseSound();
        //     }
        // }
        
        // /**
        //  * 录音结束
        //  * */
        // private onStopRecordVideo(e: egret.TouchEvent):void{
        //     this._btn_recordVideo.scaleX=1.0;
        //     this._btn_recordVideo.scaleY=1.0;
        //     this._recordVideo.show = false;
        //     M_HQMJClass.ins.StopRecord();
        //     //播放背景音乐
        //     this.gameClass.ContinueSound();
        //     this._haveRecordVoice=false;
        // }

        // /**
		//  * 销毁游戏视图,游戏需要移除所有子元素
		//  * */
        // public DestroyGameCiew(): void {
        //     super.DestroyGameCiew();
        //     this._readyStatus_gameInfo.destroy();
        //     this._readyStatus_userInfo.destroy();
        //     this._gameInfo.destroy();
        //     this._timerView.destroy();
        //     this._gameStatus_userInfo.destroy();
        //     this._cardView.destroy();
        //     this._selGang.destroy();
        //     this._operatorView.destroy();
        //     this._qiangGang.destroy();
        //     this._jieShuan.destroy();
        //     //this._outCardView.destroy();
        //     this._setting.destroy();
        //     this._szAni.destroy();
        //     this._tip.destroy();
        //     this._createTable.destroy();
        //     this._msgbox.destroy();
        //     this._recordVideo.destroy();
        //     this._playerVoide.destroy();
        //     this._dissTable.destroy();
        //     this._pao.destroy();
        //     this._la.destroy();
        //     //1、移除事件监听
        //     this.removeAllListenEvent();

        //     //2、移除所有子对象
        //     while(this.numChildren > 0) {
        //         var item = this.removeChildAt(0);
        //         item = null;
        //     }
        // }

        // /**
        //  * 移除所有事件监听
        //  * */
        // private removeAllListenEvent(): void {
        //     this.gameClass.removeEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     //this._dingQue.removeEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._operatorView.removeEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._selGang.removeEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._cardView.removeEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._qiangGang.removeEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._jieShuan.removeEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._sendCardEngine.removeEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._readyStatus_userInfo.removeEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._szAni.removeEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._pao.removeEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._la.removeEventListener(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameEvent,this);
        // }

        /**
         * 清理
         * */
        private clear(): void {
            //this._gameInfo.node.active = false;
           
            this._timerView.node.active = false;

            this._gameStatus_userInfo.node.active = false;
            console.log("玩家信息被清！！！");
            this._gameStatus_userInfo.clear();

            this._cardView.node.active = false;
            this._cardView.clear();
            this._pao.node.active=false;
            this._la.node.active=false;
            this.btn_tingtip.node.active=false;
            this._selChi.node.active = false;
            this._selGang.node.active = false;
            this._operatorView.node.active = false;
            this._qiangGang.node.active = false;
            this._jieShuan.node.active = false;
            //桌子是否显示一些规则（推到胡）
            this._readyStatus_gameInfo.node.active = false;
            this._readyStatus_userInfo.node.active = true;
        }

        public playerComeing():void{
            console.log("玩家进入响应");
            this.clear();
            // this.btn_queryRecord.node.active = M_HQMJClass.ins.isSelfCreateRoom;
            this.btn_recordVideo.node.active = M_HQMJClass.ins.isSelfCreateRoom;
            this.btn_location.node.active = M_HQMJClass.ins.isSelfCreateRoom;
            this.btn_chat.node.active=true;
            this.group_gameNum.active=false;
        }
        
        public GameStart():void{
            this._readyStatus_gameInfo.node.active = false;
            this._readyStatus_userInfo.node.active = false;
           

            this._userData.node.active=false;

            this._gameInfo.init();
            this._szAni.Clear();
            console.log("xxxxxxx");

            this.fangXiangView.node.active = false;
            this._gameStatus_userInfo.node.active = true;
            this._gameStatus_userInfo.reflashPlayer();
            this._gameStatus_userInfo.HideLaPao();
            this._gameStatus_userInfo.tableOwener = HQMJ.ins.iclass.getTableConfig().tableCreatorChair;
            this._timerView.timerNum = 0;
            this._timerView.showArrow = HQMJ.ins.iclass.getSelfChair();
            this._timerView.showArr(255,HQMJ.ins.iclass.getSelfChair());
            this._timerView.node.active=false;
            this._cardView.node.active = true;
            
        }

        public StartSendCard():void{
            this._startAni.play();
            this._gameInfo.holdCardOver();
            for(let i=0;i<HQMJMahjongDef.gPlayerNum;i++){
                this.CardView.holdTricksCard(i,13);
            }
            this.scheduleOnce(()=>{
                 this._startAni.node.active=false;
                 this._szAni.playSZ(M_HQMJClass.ins.SZ1,M_HQMJClass.ins.SZ2,HQMJEvent.msg_holdCardSZComplete);
             },0.25);
        }

        public TableCreatorInfo(chair:number):void{
            this._readyStatus_userInfo.tableOwener = chair;
            this._gameStatus_userInfo.tableOwener = chair;
        }

    /**
     * 显示互动道具
     * @param spschair 发起者
     * @param rechair 接收者
     * @param index 道具索引
     */
    public ShowChatItem(spschair:number,rechair:number,index:string){
        cc.log("索引"+index);
        var idx = parseInt(index);
        if(idx!=4){
            var point = this.ReadyStatusUserInfo.GetPlayerPoint(spschair);
            var point2 = this.ReadyStatusUserInfo.GetPlayerPoint(rechair);
            if(point==null||point == undefined){
                cc.log("获取用户头像坐标失败");
                return;
            }
            if (point2 == null || point2 == undefined) {
                cc.log("获取用户头像坐标失败");
                return;
            }
            this.huDongDaoJu.showChatItem(idx,point,point2);
            // if(idx == 0)
            //     M_HQMJVoice.playDaoJu("eggs.mp3");
            // if(idx == 1)
            //     M_HQMJVoice.playDaoJu("zuichun.mp3");
            // if(idx == 2)
            //     M_HQMJVoice.playDaoJu("banzhuan.mp3");
            // if(idx == 3)
            //     M_HQMJVoice.playDaoJu("zhadan.mp3");
        }else{
            this.ReadyStatusUserInfo.ShowGuZhang(spschair);
            this.GameStatusUserInfo.ShowGuZhang(spschair);
            // M_HQMJVoice.playDaoJu("guzhang.mp3");
        }
        // if(idx==4){
        //     this.skinPlayerControl.ShowGuZhang(spschair);
        // }else{
        //     var point = this.skinPlayerControl.GetPlayerInfoPoint(spschair);
        //     var point2 = this.skinPlayerControl.GetPlayerInfoPoint(rechair);
        //     this._aniPanel.showChatItem(idx,point,point2);
        // }     
    }

        /**
         * 事件监听
         * */
        private onGameEvent(e: HQMJEvent): void {
            switch(e.msgCode) {
                //玩家进入    
                // case HQMJEvent.msg_playerComeing: {
                //     console.log("玩家进入响应");
                //     e.stopPropagation();
                //     this.clear();
                //     // this._btn_queryRecord.visible = M_HQMJClass.ins.isSelfCreateRoom;
                //     // this._btn_recordVideo.visible = M_HQMJClass.ins.isSelfCreateRoom;
                //     this.group_gameNum.active=false;
                //     break;
                // }
                //游戏开始
                // case HQMJEvent.msg_gameStart: {
                //     this._readyStatus_gameInfo.node.active = false;
                //     this._readyStatus_userInfo.node.active = false;

                //     // this._playerVoide.show=true;
                //     // this._userData.show=false;

                //     this._gameInfo.init();
                //     this._szAni.Clear();
                //     this._gameStatus_userInfo.init();
                //     this._gameStatus_userInfo.node.active = true;
                //     this._gameStatus_userInfo.HideLaPao();
                //     this._timerView.timerNum = 0;
                //     this._timerView.showArrow = HQMJMahjongDef.gInvalidChar;
                //     this._timerView.node.active=false;
                //     this._cardView.node.active = true;

                //     e.stopPropagation();
                //     break;
                // }
                //开始发牌
                // case HQMJEvent.msg_startSendCard: {
                //     //this._startAni.Play();
                //     // egret.setTimeout(()=>{
                //     //     this._startAni.visible=false;
                   // this._szAni.playSZ(M_HQMJClass.ins.SZ1,M_HQMJClass.ins.SZ2,HQMJEvent.msg_holdCardSZComplete);
                //     //},this,1250);
                //     e.stopPropagation();
                //     break;
                // }
                //抓牌骰子动画播放完毕
                case HQMJEvent.msg_holdCardSZComplete: {
                    // for(let i=0;i<HQMJMahjongDef.gPlayerNum;i++){
                    //     this.CardView.holdTricksCard(i,13);
                    // }
                    //this._gameInfo.holdCardOver();
                    this._cardView.selfActive.refreshHandCardData(HQMJ.ins.iclass.getSelfHandCardData());
                    this._cardView.selfActive.arrangeHandCard();
                    this._szAni.node.active = false;
                    M_HQMJClass.ins.fankai=false;
                    //  this.CardView.hunPi.ShowCard(M_HQMJClass.ins._hunPiCard);             
                    //  this.CardView.hunPi.ShowCardHaveZZ(M_HQMJClass.ins._hunPiCard);
                    //this._sendCardEngine.start(M_HQMJClass.ins.BankerChair);
                    e.stopPropagation();
                    break;
                }
                
                
                //继续游戏
                case HQMJEvent.msg_goongame: {
                    this.clear();
                    this._gameInfo.node.active = true;
                    //if(M_HQMJClass.ins.TableConfig.IsBuKao){
                         //this._gameInfo.leftCardNum=108
                    //}else{
                        this._gameInfo.leftCardNum=HQMJMahjongDef.gCardCount_Package;
                    //}
                    
                    this.group_gameNum.active =false;
                    //如果余额够,自动发送准备
                    if(M_HQMJClass.ins.checkMoneyCanGame()){
                        console.log(`isSelfCreateRoom=${this.gameClass.isSelfCreateRoom}`);
                        console.log(`alreadyGameNum=${M_HQMJClass.ins.TableConfig.alreadyGameNum}`);
                        console.log(`isPlayEnoughGameNum=${M_HQMJClass.ins.TableConfig.isPlayEnoughGameNum(M_HQMJClass.ins._addNum)}`);
                        
                        if(this.gameClass.isSelfCreateRoom && (M_HQMJClass.ins.TableConfig.alreadyGameNum > 0) && !M_HQMJClass.ins.TableConfig.isPlayEnoughGameNum(M_HQMJClass.ins._addNum)){
                            this.ReadyStatusUserInfo.OnPlayerStatusChange(M_HQMJClass.ins.SelfChair,QL_Common.GState.PlayerReady);
                            
                            this.gameClass.SendGameData(new M_HQMJ_GameMessage.CMD_C_NextGame());                       
                        }else{
                            M_HQMJClass.ins.SendUserReady();
                        }
                    }
                    // else{
                    //     this._readyStatus_userInfo.initHelpNum();
                    //     //发起求助
                    //     var tipMsg: string = `您的游戏币已经不足,无法继续游戏,共次共需要:${TranslateMoneyTypeName(HQMJ.ins.iclass.getRoomData().TableCostMoneyType)}X${M_HQMJClass.ins.gameMoneyNum},点击关闭将会返回大厅。您还可以选择：`;
                    //     if(M_HQMJClass.ins.isSelfCreateRoom) {
                    //         //发起求助
                    //         M_HQMJView.ins.MsgBox.showMsgBox(tipMsg,"去充值",() => {
                    //     //充值 
                    //     M_HQMJClass.ins.showPay();
                    // },this,"",null,null,() => {
                    //     //退出游戏
                    //     M_HQMJClass.ins.ExitGame();
                    // },this); 
                    //     } else {
                    //         //发起求助
                    //         M_HQMJView.ins.MsgBox.showMsgBox(tipMsg,"去充值",() => {
                    //     //充值 
                    //     M_HQMJClass.ins.showPay();
                    // },this,"",null,null,() => {
                    //     //退出游戏
                    //     M_HQMJClass.ins.ExitGame();
                    // },this); 
                    //     }
                    // }
                    break;
                }
                //玩家打出牌
                case HQMJEvent.msg_outACard: {

                    this._cardView.selfActive.activeEnable(false);
                    // this._operatorView.show = false;
                    // this._selGang.show = false;

                    //this.node.dispatchEvent(e.clone());

                    break;
                }
                //房主
                // case HQMJEvent.msg_tableCreatorInfo:{
                //     var chair:number = <number>e.parm;
                //     this._readyStatus_userInfo.tableOwener = chair;
                //     this._gameStatus_userInfo.tableOwener = chair;
                //     e.stopPropagation();
                //     break;
                // }
                default: {
                    //this.node.dispatchEvent(e.clone());
                    break;
                }
            }
        }

        // //
        // //=================================end=============================
        // //

        /**
         * 准备按钮事件
         */
        public OnReady() {
            //VoicePlayer.PlaySysSound("btn");
            // if (!this.CheckMoneyEnought()) {
            //     this.gameInfo.SetWaitPay(true);
            //     return;
            // }
            //this.skinButtonView.HideReady();
            if (HQMJ.ins.iclass.getTableConfig().alreadyGameNum==0) {
                this.gameClass.SendUserReady();
            }
            else {
                //this.DestroyTimer();
                this.gameClass.SendGameData(new M_HQMJ_GameMessage.CMD_C_NextGame());
            }
        }

        /**
         * 显示游戏局数
         * */
        public showGameNum(totalNum:number,playNum:number,realNum:number):void{
            if(!this.gameClass.isSelfCreateRoom){
                this.group_gameNum.active=false;
                return;
            }
            //this.group_gameNum.active = totalNum > 0;
            this.group_gameNum.active=false;
            const _lbl_totalGameNum=this.group_gameNum.getChildByName("_lbl_totalGameNum").getComponent<cc.RichText>(cc.RichText);
            _lbl_totalGameNum.string ="<color=#4ec6bc>共</c><color=#fdff3d>"+`${totalNum}`+"</color><color=#4ec6bc>局</c>";//<Array<cc.ITextElement>>[
            //     { text: `共`,style: { "textColor": 0x4ec6bc } },
            //     { text: `${totalNum}`,style: { "textColor": 0xfdff3d } },
            //     { text: `局`,style: { "textColor": 0x4ec6bc } }
            // ];
            const _lbl_gameNum=this.group_gameNum.getChildByName("_lbl_gameNum").getComponent<cc.RichText>(cc.RichText);
            _lbl_gameNum.string ="<color=#4ec6bc>剩</c><color=#fdff3d>"+`${totalNum - playNum}`+"</color><color=#4ec6bc>局</c>";
            // this._lbl_gameNum.textFlow = <Array<egret.ITextElement>>[
            //     { text: `剩`,style: { "textColor": 0x4ec6bc } },
            //     { text: `${totalNum - playNum}`,style: { "textColor": 0xfdff3d } },
            //     { text: `局`,style: { "textColor": 0x4ec6bc } }
            // ];
        }
        // }
        /**
         * 播放动画
         * */
        public playHQMJAni(chair: number,aniType: enHQMJAniType): void {
            var logicChair: number = HQMJ.ins.iclass.physical2logicChair(chair);
            
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
        public ShowSetVolume():void{
            this.gameClass.ShowSettingForm();
        }
        
    /**
     * 物理按钮事件
     */
    public OnButtonExit() {
        if (!HQMJ.ins.iclass.ifCanExitGame(HQMJ.ins.iclass.getSelfChair())) {
            if (HQMJ.ins.iclass.isCreateRoom()) {
                return;
            }
            else {
                M_HQMJView.ins.MsgBox.showMsgBox("在游戏中退出会扣除游戏币,是否退出", "继续强退", () => {
                    var forceLeft: M_HQMJ_GameMessage.CMD_C_ForceLeft = new M_HQMJ_GameMessage.CMD_C_ForceLeft();
                    forceLeft.PlayerID = HQMJ.ins.iclass.getTablePlayerAry()[HQMJ.ins.iclass.getSelfChair()].PlayerID;
                    M_HQMJClass.ins.SendGameData(forceLeft);
                }, this, "返回游戏");
            }
        } else {
            // if (!HQMJ.ins.iclass.isVideo() && HQMJ.ins.iclass.isCreateRoom()
            //     && HQMJ.ins.iclass.getSelfChair() == HQMJ.ins.iclass.getTableConfig().tableCreatorChair && !HQMJ.ins.iclass.getTableConfig().IsSaveTable) {
            //     if (HQMJ.ins.iclass.getTableConfig().IsTableCreatorPay) {
            //         M_HQMJView.ins.MsgBox.showMsgBox('是否需要系统为您保留房间？系统会在游戏开始前为您保留' + HQMJ.ins.iclass.getTableConfig().SaveTableTime + '分钟，请您记住房号' + HQMJ.ins.iclass.getTableConfig().TableCode + '。', "保留", () => {
            //             var saveTable: M_HQMJ_GameMessage.CMD_C_SaveTable = new M_HQMJ_GameMessage.CMD_C_SaveTable();
            //             M_HQMJClass.ins.SendGameData(saveTable);
            //         }, this, "不保留", () => { HQMJ.ins.iclass.exit(); }, this);
            //     }
            //     else {
            //         M_HQMJView.ins.MsgBox.showMsgBox('此房间为AA制付费，不支持保留房间，离开房间，房间将解散。', "确定", () => {
            //             //打开充值
            //             HQMJ.ins.iclass.exit();
            //         }, this);
            //         // this.gameClass.UiManager.ShowMsgBox("此房间为AA制付费，不支持保留房间，离开房间，房间将解散。", this, () => {
            //         //     this.gameClass.ExitGame();
            //         // });
            //     }
            // }
            // else {
            //     M_HQMJView.ins.MsgBox.showMsgBox('是否退出霍邱麻将？', "确定", () => {
                    //打开充值
                    HQMJ.ins.iclass.exit();
            //     }, this);
            //     //HQMJ.ins.iclass.exit();
            // } 
        }
    }
    public showMsg(){
      
        this._dissTable.node.active=false;
        this._msgBox.lbl_msg.string="您的操作过于频繁,请一分钟后再次操作";
        this._msgBox.node.active=true;
    }
    
}

