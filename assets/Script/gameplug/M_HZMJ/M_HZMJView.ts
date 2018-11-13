const {ccclass, property} = cc._decorator;

import { HZMJMahjongDef, IHZMJView, HZMJ, HZMJTableConfig, HZMJTimer, enGamePhase, HZMJOutCardPlayer, HZMJRecordCard, enHZMJAniType } from "./ConstDef/HZMJMahjongDef";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { GameIF } from "../../CommonSrc/GameIF";
import M_HZMJClass from "./M_HZMJClass";
import HZMJ_ReadyStatusGameInfo from "./SkinView/HZMJ_ReadyStatusGameInfo";
import HZMJ_GameInfo from "./SkinView/HZMJ_GameInfo";
import HZMJ_ReadyStatusUserInfo from "./SkinView/HZMJ_ReadyStatusUserInfo";
import { M_HZMJ_GameMessage } from "../../CommonSrc/M_HZMJ_GameMessage";
import HZMJ_TimerView from "./SkinView/HZMJ_Timer";
import HZMJ_SZAni from "./SkinView/HZMJ_SZAni";
import HZMJ_GameStatusUserInfo from "./SkinView/HZMJ_GameStatusUserInfo";
import HZMJ_CardView from "./SkinView/HZMJ_CardView";
import HZMJEvent from "./HZMJEvent";
import HZMJ_OperatorView from "./SkinView/HZMJ_OperatorView";
import HZMJ_JieShuan from "./SkinView/HZMJ_JieShuan";
import MJ_RecordVideo from "../MJCommon/MJ_RecordVideo";
import HZMJ_SelGang from "./SkinView/HZMJ_SelGang";
import HZMJ_QiangGangView from "./SkinView/HZMJ_QiangGangView";
import HZMJ_TingTip from "./SkinView/HZMJ_TingTip";
import HZMJ_HelpView from "./SkinView/HZMJ_HelpView";
import HZMJ_TipMsg from "./SkinView/HZMJ_TipMsg";
import HZMJ_DissTable from "./SkinView/HZMJ_DissTable";
import HZMJ_MsgBox from "./SkinView/HZMJ_MsgBox";
import HZMJ_Pao from "./SkinView/HZMJ_Pao";
import HZMJ_La from "./SkinView/HZMJ_La";
import HZMJ_SettingView from "./SkinView/HZMJ_SettingView";
import MJ_UserData from "../MJCommon/MJ_UserData";
import HZMJ_JiFenBan from "./SkinView/HZMJ_JiFenBan";
import HZMJ_FenXiang from "./SkinView/HZMJ_FenXiang";
import HZMJ_Ani from "./SkinView/HZMJ_Ani";
import HZMJ_StartAni from "./SkinView/HZMJ_StartAni";
import HZMJ_JiFenBanX from "./SkinView/HZMJ_JiFenBanX";
import HZMJ_OutCardView from "./SkinView/HZMJ_OutCardView";
import HZMJ_FanMa from "./SkinView/HZMJ_FanMa";
import HZMJ_WanFa from "./SkinView/HZMJ_WanFa";
import M_HZMJVoice from "./M_HZMJVoice";
import HZMJ_PaiWall from "./SkinView/HZMJ_PaiWalls";
@ccclass
export default class M_HZMJView extends cc.Component implements IHZMJView {

        private static AniPos: Array<{ x: number,y: number }> = [
            { x: 640,y: 510 },
            { x: 1110,y: 360 },
            { x: 640,y: 150 },
            { x: 180,y: 360 }
        ];


        
        private static _ins: M_HZMJView;
        /**
         * HZMJView单例
         * */
        public static get ins(): M_HZMJView { return this._ins; }
        public get gameClass(): M_HZMJClass { return M_HZMJClass.ins; }


        //局数显示
        @property(cc.Node)
        group_gameNum: cc.Node=null;
              //中间层
        @property(cc.Node)
        group_mid: cc.Node = null;

        @property(cc.Prefab)
        GameInfoView: cc.Prefab=null;

        @property(cc.Sprite)
        num:cc.Sprite=null;
        @property(cc.Sprite)
        num1:cc.Sprite=null;
        @property(cc.Sprite)
        reMain:cc.Sprite=null;

        //游戏信息
        private _gameInfo: HZMJ_GameInfo;//me
        /**
         * 游戏信息
         * */
        public get GameInfo(): HZMJ_GameInfo {
            return this._gameInfo;
        }

        @property(cc.Prefab)
        ReadyStatusGameInfoView: cc.Prefab=null;

        //准备状态时的游戏信息
        private _readyStatus_gameInfo: HZMJ_ReadyStatusGameInfo;//me
        /**
         * 准备状态游戏信息
         * */
        public get ReadyStatusGameInfo(): HZMJ_ReadyStatusGameInfo {
            return this._readyStatus_gameInfo;
        }

        @property(cc.Prefab)
        ReadyStatusGameUserView: cc.Prefab=null;

        //准备状态玩家信息
        private _readyStatus_userInfo: HZMJ_ReadyStatusUserInfo;//me
        /**
         * 准备状态玩家信息
         * */
        public get ReadyStatusUserInfo(): HZMJ_ReadyStatusUserInfo {
            return this._readyStatus_userInfo;
        }

        @property(cc.Prefab)
        Time_View: cc.Prefab=null;
        //计时器
        private _timerView: HZMJ_TimerView;//me
        /**
         * 游戏计时器
         * */
        public get TimerView(): HZMJ_TimerView {
            return this._timerView;
        }


        @property(cc.Prefab)
        SZAni_View: cc.Prefab=null;
        //骰子动画
        private _szAni: HZMJ_SZAni;//me
        /**
         * 骰子动画
         * */
        public get SZAni(): HZMJ_SZAni {
            return this._szAni;
        }

        @property(cc.Prefab)
        GameStatus_userInfo_View: cc.Prefab=null;
        //游戏状态玩家信息
        private _gameStatus_userInfo: HZMJ_GameStatusUserInfo;//me
        /**
         * 游戏状态玩家信息
         * */
        public get GameStatusUserInfo(): HZMJ_GameStatusUserInfo {
            return this._gameStatus_userInfo;
        }

        @property(cc.Prefab)
        HZMJ_Card_View: cc.Prefab=null;
        //牌阵视图
        private _cardView: HZMJ_CardView;//me
        /**
         * 牌阵视图
         * */
        public get CardView(): HZMJ_CardView {
            return this._cardView;
        }
         @property(cc.Prefab)
        HZMJ_OutCard_View: cc.Prefab = null;
        //出牌视图
        private _outCardView: HZMJ_OutCardView;//me
        /**
         * 出牌视图
         * */
        public get OutCardView(): HZMJ_OutCardView {
            return this._outCardView;
        }

        @property(cc.Prefab)
        HZMJ_OP_View: cc.Prefab=null;
        //玩家操作
        private _operatorView: HZMJ_OperatorView;
        /**
         * 操作视图
         * */
        public get OperatorView(): HZMJ_OperatorView {
            return this._operatorView;
        }

        @property(cc.Prefab)
        HZMJ_SelGang_View: cc.Prefab=null;
        //选择杠
        private _selGang: HZMJ_SelGang;
        /**
         * 选择杠视图
         * */
        public get SelGangView(): HZMJ_SelGang {
            return this._selGang;
        }

         @property(cc.Prefab)
        HZMJ_PaiWalls_View: cc.Prefab=null;
        //牌墙
        private _delPaiWall: HZMJ_PaiWall;
        /**
         * 删除牌墙
         * */
        public get PaiWallView(): HZMJ_PaiWall {
            return this._delPaiWall;
        }
        
        @property(cc.Prefab)
        HZMJ_QiangGang_View: cc.Prefab=null;
        //抢杠
        private _qiangGang: HZMJ_QiangGangView;
        /**
         * 抢杠视图
         * */
        public get QiangGangView(): HZMJ_QiangGangView {
            return this._qiangGang;
        }

        @property(cc.Prefab)
        HZMJ_TingTip_View: cc.Prefab=null;
        private _tingTip:HZMJ_TingTip;
        /**
         * 听牌提示
         * */
        public get TingTip(): HZMJ_TingTip{
            return this._tingTip;
        }

        @property(cc.Prefab)
        HZMJ_JieShuan_View: cc.Prefab=null;
        //结算
        private _jieShuan: HZMJ_JieShuan;//me
        /**
         * 结算视图
         * */
        public get JieShuanView(): HZMJ_JieShuan {
            return this._jieShuan;
        }

        @property(cc.Prefab)
        HZMJ_FanMa_View: cc.Prefab=null;
        //翻码
        private _fanMa: HZMJ_FanMa;//me
        /**
         * 翻码视图
         * */
        public get FanMaView(): HZMJ_FanMa {
            return this._fanMa;
        }


        @property(cc.Prefab)
        HZMJ_WanFa_View: cc.Prefab=null;
        //玩法
        private _wanFa: HZMJ_WanFa;//me
        /**
         * 玩法视图
         * */
        public get WanFaView(): HZMJ_WanFa {
            return this._wanFa;
        }



        @property(cc.Button)
        //录音
        btn_recordVideo:cc.Button=null;

        @property(cc.Button)
        //语句设置
        btn_chat:cc.Button=null;

        @property(cc.Prefab)
        HZMJ_help_View: cc.Prefab=null;
        private _help:HZMJ_HelpView;//me
        /**
         * 帮助
         * */
        public get Help():HZMJ_HelpView{
            return this._help;
        };


        @property(cc.Prefab)
        //录音
        HZMJ_recordVideo: cc.Prefab=null;
        private _recordVideo: MJ_RecordVideo;//me

        //是否有录音
        private _haveRecordVoice:boolean;


        @property(cc.Prefab)
        HZMJ_TipMsg_View:cc.Prefab=null;
        private _tipMsg:HZMJ_TipMsg;
        /**
         * Tip视图
         */
        public get TipMsgView():HZMJ_TipMsg{
            return this._tipMsg;
        }


        @property(cc.Prefab)
        HZMJ_DissTable_View:cc.Prefab=null;
        /**
         * 解散房间界面
         */
        private _dissTable:HZMJ_DissTable;
        /**
         * 解散房间界面
         */
        public get DissTable():HZMJ_DissTable{
            return this._dissTable;
        }

        @property(cc.Prefab)
        HZMJ_MsgBox_View:cc.Prefab=null;

        private _msgBox:HZMJ_MsgBox;
        /**
         * 
         */
        public get MsgBox():HZMJ_MsgBox{
            return this._msgBox;
        }

        @property(cc.Prefab)
        HZMJ_Pao_View:cc.Prefab=null;
        //跑
        private _pao:HZMJ_Pao;//me

        public get PaoView():HZMJ_Pao{
            return this._pao;
        }

        @property(cc.Prefab)
        HZMJ_La_View:cc.Prefab=null;
        //拉
        private _la:HZMJ_La;//me

        public get LaView():HZMJ_La{
            return this._la;
        }

        @property(cc.Prefab)
        HZMJ_Setting_View:cc.Prefab=null;
        public _setting: HZMJ_SettingView;
        public get settingView(): HZMJ_SettingView {
            return this._setting;
        }

        @property(cc.Prefab)
        HZMJ_UserData_View:cc.Prefab=null;
        //用户数据
        private _userData:MJ_UserData;
        /**
         * 用户数据
         * */
        public get UserData():MJ_UserData{
            return this._userData;
        }

        @property(cc.Button)
        //请求计分板
        btn_queryRecord:cc.Button=null;

        @property(cc.Prefab)
        HZMJ_JiFenBan_View:cc.Prefab=null;
        //记分板
        private _jifenban:HZMJ_JiFenBanX;
        /**
         * 游戏记分板
         * */
        public get GameJiFenBan(): HZMJ_JiFenBanX{
            return this._jifenban;
        }

        @property(cc.Prefab)
        HZMJ_FenXiang_View:cc.Prefab=null;
        //分享板
        private _fenxiang:HZMJ_FenXiang;

        public get PlayFenXiang():HZMJ_FenXiang{return this._fenxiang}

        @property(cc.Prefab)
        HZMJ_Ani_View:cc.Prefab=null;
        //动画面板
        private _aniPanel:HZMJ_Ani;

        @property(cc.Prefab)
        HZMJ_Start_Ani: cc.Prefab=null;
        private _startAni:HZMJ_StartAni;
        /**
         * 帮助
         * */
        public get StartAni():HZMJ_StartAni{
            return this._startAni;
        };
        @property(cc.Button)
        //位置
        btn_location:cc.Button=null;
        @property(cc.Button)
        //请求听牌提示
        btn_tingtip:cc.Button=null;

        onLoad(){
            M_HZMJView._ins = this;
            HZMJ.ins.iview = this;
            
            let ginode=cc.instantiate(this.GameInfoView);
            this._gameInfo=ginode.getComponent<HZMJ_GameInfo>(HZMJ_GameInfo);
            this.node.addChild(ginode);

            let rsgnode=cc.instantiate(this.ReadyStatusGameInfoView);
            this._readyStatus_gameInfo=rsgnode.getComponent<HZMJ_ReadyStatusGameInfo>(HZMJ_ReadyStatusGameInfo);
            this.node.addChild(rsgnode);
            //添加翻码
             let fanmanode=cc.instantiate(this.HZMJ_FanMa_View);
            this._fanMa=fanmanode.getComponent<HZMJ_FanMa>(HZMJ_FanMa);
            this.node.addChild(fanmanode);
            //添加玩法
             let wanfanode=cc.instantiate(this.HZMJ_WanFa_View);
            this._wanFa=wanfanode.getComponent<HZMJ_WanFa>(HZMJ_WanFa);
            this.node.addChild(wanfanode);

            let wallcnode=cc.instantiate(this.HZMJ_PaiWalls_View);
            this._delPaiWall=wallcnode.getComponent<HZMJ_PaiWall>(HZMJ_PaiWall);
            this.node.addChild(wallcnode);


            let rsunode=cc.instantiate(this.ReadyStatusGameUserView);
            this._readyStatus_userInfo=rsunode.getComponent<HZMJ_ReadyStatusUserInfo>(HZMJ_ReadyStatusUserInfo);
            this.node.addChild(rsunode);
            

            let timenode=cc.instantiate(this.Time_View);
            this._timerView=timenode.getComponent<HZMJ_TimerView>(HZMJ_TimerView);
            this.group_mid.addChild(timenode);

            let sznode=cc.instantiate(this.SZAni_View);
            this._szAni=sznode.getComponent<HZMJ_SZAni>(HZMJ_SZAni);
            this.node.addChild(sznode);

            let cvnode=cc.instantiate(this.HZMJ_Card_View);
            this._cardView=cvnode.getComponent<HZMJ_CardView>(HZMJ_CardView);
            this.group_mid.addChild(cvnode);

            let ocvnode=cc.instantiate(this.HZMJ_OutCard_View);
            this._outCardView=ocvnode.getComponent<HZMJ_OutCardView>(HZMJ_OutCardView);
            this.group_mid.addChild(ocvnode);

            let gsunode=cc.instantiate(this.GameStatus_userInfo_View);
            this._gameStatus_userInfo=gsunode.getComponent<HZMJ_GameStatusUserInfo>(HZMJ_GameStatusUserInfo);
            this.node.addChild(gsunode);

            


            let opnode=cc.instantiate(this.HZMJ_OP_View);
            this._operatorView=opnode.getComponent<HZMJ_OperatorView>(HZMJ_OperatorView);
            this.node.addChild(opnode);

            let selgnode=cc.instantiate(this.HZMJ_SelGang_View);
            this._selGang=selgnode.getComponent<HZMJ_SelGang>(HZMJ_SelGang);
            this.node.addChild(selgnode);

            let qianggnode=cc.instantiate(this.HZMJ_QiangGang_View);
            this._qiangGang=qianggnode.getComponent<HZMJ_QiangGangView>(HZMJ_QiangGangView);
            this.node.addChild(qianggnode);

            let tingtipnode=cc.instantiate(this.HZMJ_TingTip_View);
            this._tingTip=tingtipnode.getComponent<HZMJ_TingTip>(HZMJ_TingTip);
            this.node.addChild(tingtipnode);

            let paonode=cc.instantiate(this.HZMJ_Pao_View);
            this._pao=paonode.getComponent<HZMJ_Pao>(HZMJ_Pao);
            this.node.addChild(paonode);

            let lanode=cc.instantiate(this.HZMJ_La_View);
            this._la=lanode.getComponent<HZMJ_La>(HZMJ_La);
            this.node.addChild(lanode);

            let setnode=cc.instantiate(this.HZMJ_Setting_View);
            this._setting=setnode.getComponent<HZMJ_SettingView>(HZMJ_SettingView);
            this.node.addChild(setnode);

            let recordVnode=cc.instantiate(this.HZMJ_recordVideo);
            this._recordVideo=recordVnode.getComponent<MJ_RecordVideo>(MJ_RecordVideo);
            this.node.addChild(recordVnode);

            let udnode=cc.instantiate(this.HZMJ_UserData_View);
            this._userData=udnode.getComponent<MJ_UserData>(MJ_UserData);
            this.node.addChild(udnode);

            let helpnode=cc.instantiate(this.HZMJ_help_View);
            this._help=helpnode.getComponent<HZMJ_HelpView>(HZMJ_HelpView);
            this.node.addChild(helpnode);

            let tipnode=cc.instantiate(this.HZMJ_TipMsg_View);
            this._tipMsg=tipnode.getComponent<HZMJ_TipMsg>(HZMJ_TipMsg);
            this.node.addChild(tipnode);

            let aninode=cc.instantiate(this.HZMJ_Ani_View);
            this._aniPanel=aninode.getComponent<HZMJ_Ani>(HZMJ_Ani);
            this.node.addChild(aninode);

            let saninode=cc.instantiate(this.HZMJ_Start_Ani);
            this._startAni=saninode.getComponent<HZMJ_StartAni>(HZMJ_StartAni);
            this.node.addChild(saninode);

            let msgboxnode=cc.instantiate(this.HZMJ_MsgBox_View);
            this._msgBox=msgboxnode.getComponent<HZMJ_MsgBox>(HZMJ_MsgBox);
            this.node.addChild(msgboxnode);

            let jsnode=cc.instantiate(this.HZMJ_JieShuan_View);
            this._jieShuan=jsnode.getComponent<HZMJ_JieShuan>(HZMJ_JieShuan);
            this.node.addChild(jsnode);

            let disstablenode=cc.instantiate(this.HZMJ_DissTable_View);
            this._dissTable=disstablenode.getComponent<HZMJ_DissTable>(HZMJ_DissTable);
            this.node.addChild(disstablenode);

            let fxnode=cc.instantiate(this.HZMJ_FenXiang_View);
            this._fenxiang=fxnode.getComponent<HZMJ_FenXiang>(HZMJ_FenXiang);
            this.node.addChild(fxnode);

            let jfbnode=cc.instantiate(this.HZMJ_JiFenBan_View);
            this._jifenban=jfbnode.getComponent<HZMJ_JiFenBanX>(HZMJ_JiFenBanX);
            this.node.addChild(jfbnode);

            this.btn_recordVideo.node.active=false;
            this.btn_chat.node.active=false;
            this.btn_queryRecord.node.active=false;
            this._haveRecordVoice=false;
            this.btn_location.node.active=false;
            this.node.on(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
            this.btn_chat.node.on(cc.Node.EventType.TOUCH_END,this.onshowChatWindows,this);

            this.btn_recordVideo.node.on(cc.Node.EventType.TOUCH_START,this.onStartRecordVideo,this);
            this.btn_recordVideo.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onStopRecordVideo,this);
            this.btn_recordVideo.node.on(cc.Node.EventType.TOUCH_END,this.onStopRecordVideo,this);

            this.btn_queryRecord.node.on(cc.Node.EventType.TOUCH_END,() => {
                if(0 == M_HZMJClass.ins.TableConfig.alreadyGameNum){
                    this.MsgBox.showMsgBox("暂无游戏记录");
                }else{
                    this._jifenban.startShow();
                }
            },this);


            cc.game.on(cc.game.EVENT_HIDE, this.onStopRecordVideo, this);
             cc.game.on(cc.game.EVENT_HIDE, this.onReflashHandCard, this);
            this.btn_location.node.on(cc.Node.EventType.TOUCH_END,this.onMap,this);
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
            //初始化翻码界面
           // this.FanMaView.initView();
            this.OperatorView.init();
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
            
            
            
            //this._operatorView.node.on(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
            //this._selGang.node.on(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
            //this._cardView.node.on(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
            // this._qiangGang.node.on(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
            // this._jieShuan.node.on(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
            
            //this._readyStatus_userInfo.node.on(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
            //this._szAni.node.on(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        }
        private onMap():void{
            this.gameClass.ShowMaps();
        }

        public OnResetGameView() {
            this.clear();
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
         //   this.gameClass.ShowShare(0, this.gameClass.TableID, this.gameClass.WebConfigName() + "麻将分享",HZMJ.ins.iclass.getTableConfig().shareContext);
        this.gameClass.ShowShare(0, this.gameClass.TableID, this.gameClass.WebConfigName() + "【临泉麻将】房号："+HZMJ.ins.iclass.getTableConfig().TableCode,HZMJ.ins.iclass.getTableConfig().shareContext);

        }

        private onshowChatWindows(e:cc.Event.EventTouch):void{
            M_HZMJClass.ins.showChat();
        }  
        private onshowWanFa(e:cc.Event.EventTouch):void{
            M_HZMJView.ins.WanFaView.showWanFa();
          
        }
        private onshowSetting(e:cc.Event.EventTouch):void{
            M_HZMJView.ins.settingView.onOpen();
          
        }              
        /**
         * 开始录音
         * */
        private onStartRecordVideo(e:cc.Event.EventTouch):void{
            if(this.gameClass.StartRecord()){
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
            this.btn_tingtip.node.active=enable;
        }

        private onTingTip():void{
            if(this.TingTip.node.active){   
                this.TingTip.node.active=false;
                return;
            }
            this.gameClass.showTingCard(0,3000);
            //this.btn_tingtip.interactable=this.TingTip.node.active;
        }
        
        // //骰子动画
        // private _szAni: HZMJ_SZAni;
        // /**
        //  * 骰子动画
        //  * */
        // public get SZAni(): HZMJ_SZAni {
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
        //     console.log("gameview === HZMJView InitUiClass");
        //     M_HZMJView._ins = this;
        //     this._sendCardEngine = new HZMJSendCardEngine();
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
        //     console.log("gameview === HZMJView InitGameView");
        //     super.InitGameView();
        //     this.touchEnabled = true;

        //     this.gameClass.addEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._operatorView.addEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._selGang.addEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._cardView.addEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._qiangGang.addEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._jieShuan.addEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._sendCardEngine.addEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._readyStatus_userInfo.addEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._szAni.addEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._pao.addEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._la.addEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);

        //     this._btn_queryRecord.addEventListener(egret.TouchEvent.TOUCH_TAP,(e: egret.TouchEvent) => {
        //         if(0 == M_HZMJClass.ins.TableConfig.alreadyGameNum){
        //             this.MsgBox.showMsgBox("暂无游戏记录");
        //         }else{
        //             this._jifenban.startShow();
        //         }
        //     },this);
        //     this._btn_chat.addEventListener(egret.TouchEvent.TOUCH_TAP,(e: egret.TouchEvent) => {
        //         M_HZMJClass.ins.showChat();
        //         M_HZMJView.ins.showCtlChat=true;
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
        //     M_HZMJClass.ins.StopRecord();
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
        //     this.gameClass.removeEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     //this._dingQue.removeEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._operatorView.removeEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._selGang.removeEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._cardView.removeEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._qiangGang.removeEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._jieShuan.removeEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._sendCardEngine.removeEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._readyStatus_userInfo.removeEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._szAni.removeEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._pao.removeEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._la.removeEventListener(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
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
            this.btn_queryRecord.node.active = M_HZMJClass.ins.isSelfCreateRoom;
            this.btn_recordVideo.node.active = M_HZMJClass.ins.isSelfCreateRoom;
            this.btn_location.node.active = M_HZMJClass.ins.isSelfCreateRoom;
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

            
            this._gameStatus_userInfo.node.active = true;
            this._gameStatus_userInfo.reflashPlayer();
            this._gameStatus_userInfo.HideLaPao();
            this._gameStatus_userInfo.tableOwener = HZMJ.ins.iclass.getTableConfig().tableCreatorChair;
            this._timerView.timerNum = 0;
            this._timerView.showArrow = HZMJMahjongDef.gInvalidChar;
            this._timerView.node.active=false;
            this._cardView.node.active = true;
          
        }

        public StartSendCard():void{
            this._startAni.play();
           // M_HZMJVoice.StartGame(); 
            M_HZMJVoice.PlayCardType(`/sound/game_start.mp3`);          
            this._gameInfo.holdCardOver();
            for(let i=0;i<HZMJMahjongDef.gPlayerNum;i++){
                this.CardView.holdTricksCard(i,13);
            }


            this.scheduleOnce(()=>{
                this._startAni.node.active=false;
                this._szAni.playSZ(M_HZMJClass.ins.SZ1,M_HZMJClass.ins.SZ2,HZMJEvent.msg_holdCardSZComplete);
            },1.25);
        }

        public TableCreatorInfo(chair:number):void{
            this._readyStatus_userInfo.tableOwener = chair;
            this._gameStatus_userInfo.tableOwener = chair;
        }
        /**
         * 事件监听
         * */
        private onGameEvent(e: HZMJEvent): void {
            switch(e.msgCode) {
                //玩家进入    
                // case HZMJEvent.msg_playerComeing: {
                //     console.log("玩家进入响应");
                //     e.stopPropagation();
                //     this.clear();
                //     // this._btn_queryRecord.visible = M_HZMJClass.ins.isSelfCreateRoom;
                //     // this._btn_recordVideo.visible = M_HZMJClass.ins.isSelfCreateRoom;
                //     this.group_gameNum.active=false;
                //     break;
                // }
                //游戏开始
                // case HZMJEvent.msg_gameStart: {
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
                //     this._timerView.showArrow = HZMJMahjongDef.gInvalidChar;
                //     this._timerView.node.active=false;
                //     this._cardView.node.active = true;

                //     e.stopPropagation();
                //     break;
                // }
                //开始发牌
                // case HZMJEvent.msg_startSendCard: {
                //     //this._startAni.Play();
                //     // egret.setTimeout(()=>{
                //     //     this._startAni.visible=false;
                //     this._szAni.playSZ(M_HZMJClass.ins.SZ1,M_HZMJClass.ins.SZ2,HZMJEvent.msg_holdCardSZComplete);
                //     //},this,1250);
                //     e.stopPropagation();
                //     break;
                // }
                //抓牌骰子动画播放完毕
                case HZMJEvent.msg_holdCardSZComplete: {
                    // for(let i=0;i<HZMJMahjongDef.gPlayerNum;i++){
                    //     this.CardView.holdTricksCard(i,13);
                    // }
                    //this._gameInfo.holdCardOver();
                    this._cardView.selfActive.refreshHandCardData(HZMJ.ins.iclass.getSelfHandCardData());
                    this._cardView.selfActive.arrangeHandCard();
                    this._szAni.node.active = false;
                    M_HZMJClass.ins.fankai=false;
                    //  this.CardView.hunPi.ShowCard(M_HZMJClass.ins._hunPiCard);             
                    //  this.CardView.hunPi.ShowCardHaveZZ(M_HZMJClass.ins._hunPiCard);
                    //this._sendCardEngine.start(M_HZMJClass.ins.BankerChair);
                    e.stopPropagation();
                    break;
                }
                
                
                //继续游戏
                case HZMJEvent.msg_goongame: {
                    this.clear();
                    this._gameInfo.node.active = true;
                    if(M_HZMJClass.ins.TableConfig.IsBuKao){
                         this._gameInfo.leftCardNum=108
                    }else{
                        this._gameInfo.leftCardNum=HZMJMahjongDef.gCardCount_Package;
                    }
                    
                    this.group_gameNum.active =false;
                    //如果余额够,自动发送准备
                    if(M_HZMJClass.ins.checkMoneyCanGame){
                        console.log(`isSelfCreateRoom=${this.gameClass.isSelfCreateRoom}`);
                        console.log(`alreadyGameNum=${M_HZMJClass.ins.TableConfig.alreadyGameNum}`);
                        console.log(`isPlayEnoughGameNum=${M_HZMJClass.ins.TableConfig.isPlayEnoughGameNum}`);
                        
                        if(this.gameClass.isSelfCreateRoom && (M_HZMJClass.ins.TableConfig.alreadyGameNum > 0) && !M_HZMJClass.ins.TableConfig.isPlayEnoughGameNum){
                            this.ReadyStatusUserInfo.OnPlayerStatusChange(M_HZMJClass.ins.SelfChair,QL_Common.GState.PlayerReady);
                            
                            this.gameClass.SendGameData(new M_HZMJ_GameMessage.CMD_C_NextGame());                       
                        }else{
                            M_HZMJClass.ins.SendUserReady();
                        }
                    }
                    // else{
                    //     this._readyStatus_userInfo.initHelpNum();
                    //     //发起求助
                    //     var tipMsg: string = `您的游戏币已经不足,无法继续游戏,共次共需要:${TranslateMoneyTypeName(HZMJ.ins.iclass.getRoomData().TableCostMoneyType)}X${M_HZMJClass.ins.gameMoneyNum},点击关闭将会返回大厅。您还可以选择：`;
                    //     if(M_HZMJClass.ins.isSelfCreateRoom) {
                    //         //发起求助
                    //         M_HZMJView.ins.MsgBox.showMsgBox(tipMsg,"去充值",() => {
                    //     //充值 
                    //     M_HZMJClass.ins.showPay();
                    // },this,"",null,null,() => {
                    //     //退出游戏
                    //     M_HZMJClass.ins.ExitGame();
                    // },this); 
                    //     } else {
                    //         //发起求助
                    //         M_HZMJView.ins.MsgBox.showMsgBox(tipMsg,"去充值",() => {
                    //     //充值 
                    //     M_HZMJClass.ins.showPay();
                    // },this,"",null,null,() => {
                    //     //退出游戏
                    //     M_HZMJClass.ins.ExitGame();
                    // },this); 
                    //     }
                    // }
                    break;
                }
                //玩家打出牌
                case HZMJEvent.msg_outACard: {

                    this._cardView.selfActive.activeEnable(false);
                    // this._operatorView.show = false;
                    // this._selGang.show = false;

                    //this.node.dispatchEvent(e.clone());

                    break;
                }
                //房主
                // case HZMJEvent.msg_tableCreatorInfo:{
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
            if (HZMJ.ins.iclass.getTableConfig().alreadyGameNum==0) {
                this.gameClass.SendUserReady();
            }
            else {
                //this.DestroyTimer();
                this.gameClass.SendGameData(new M_HZMJ_GameMessage.CMD_C_NextGame());
            }
        }

        /**
         * 显示连庄数
         */
        public showreMain(ReMain:number){
           var self=this;
            var num1 = ReMain%10;
            var num= Math.floor(ReMain/10);   
            console.log("=-----------"+num1+"-----------------"+num+"----------")
            if(num==0){
          cc.loader.loadRes("gameres/M_HZMJ/Texture/ziku/"+num1,function(err,texture)
          {
              if(err){
                    cc.error(err)
                    return;
                }
          const sprite=self.num.getComponent<cc.Sprite>(cc.Sprite);
          sprite.spriteFrame =  new cc.SpriteFrame(texture);
        });
        }else{
             cc.loader.loadRes("gameres/M_HZMJ/Texture/ziku/"+num,function(err,texture)
          {
            //   if(err){
            //         cc.error(err)
            //         return;
            //     }
          const sprite=self.num.getComponent<cc.Sprite>(cc.Sprite);
          sprite.spriteFrame =  new cc.SpriteFrame(texture);
           });
           
           cc.loader.loadRes("gameres/M_HZMJ/Texture/ziku/"+num1,function(err,texture)
          {
            //   if(err){
            //         cc.error(err)
            //         return;
            //     }
          const sprite=self.num1.getComponent<cc.Sprite>(cc.Sprite);
          sprite.spriteFrame =  new cc.SpriteFrame(texture);
           });
        }



         cc.loader.loadRes("gameres/M_HZMJ/Texture/ziku/lianbank",function(err,texture)
          {
            //   if(err){
            //         cc.error(err)
            //         return;
            //     }
          const sprite=self.reMain.getComponent<cc.Sprite>(cc.Sprite);
          sprite.spriteFrame =  new cc.SpriteFrame(texture);
        });

 
        this.num.node.active=true;
        this.num1.node.active=true;
        
    
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
        public playHZMJAni(chair: number,aniType: enHZMJAniType): void {
            var logicChair: number = HZMJ.ins.iclass.physical2logicChair(chair);
            

            switch(aniType) {
                case enHZMJAniType.aniType_peng: {
                   // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_peng_1280",logicChair);
                     this._aniPanel.PlayAnimation("AniPeng",logicChair);
                    //ani = new PengAni();
                    break;
                }
                case enHZMJAniType.aniType_minggGang: {
                  //  this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_gang_1280",logicChair);
                     this._aniPanel.PlayAnimation("AniGang",logicChair);
                    break;
                }
                case enHZMJAniType.aniType_anGang: {
                   // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_gang_1280",logicChair);
                     this._aniPanel.PlayAnimation("AniGang",logicChair);

                    break;
                }
                case enHZMJAniType.aniType_huCard: {
                   // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_hu_1280",logicChair);
                      this._aniPanel.PlayAnimation("AniHu",logicChair);
                    break;
                }
                case enHZMJAniType.aniType_ziMo: {
                    //this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_zm_1280",logicChair);
                     this._aniPanel.PlayAnimation("AniZimo",logicChair);
                   
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
        if (!HZMJ.ins.iclass.ifCanExitGame(HZMJ.ins.iclass.getSelfChair())) {
            if (HZMJ.ins.iclass.isCreateRoom()) {
                return;
            }
            else {
                M_HZMJView.ins.MsgBox.showMsgBox("在游戏中退出会扣除游戏币,是否退出", "继续强退", () => {
                    var forceLeft: M_HZMJ_GameMessage.CMD_C_ForceLeft = new M_HZMJ_GameMessage.CMD_C_ForceLeft();
                    forceLeft.PlayerID = HZMJ.ins.iclass.getTablePlayerAry()[HZMJ.ins.iclass.getSelfChair()].PlayerID;
                    M_HZMJClass.ins.SendGameData(forceLeft);
                }, this, "返回游戏");
            }
        } else {
            if (!HZMJ.ins.iclass.isVideo() && HZMJ.ins.iclass.isCreateRoom()
                && HZMJ.ins.iclass.getSelfChair() == HZMJ.ins.iclass.getTableConfig().tableCreatorChair && !HZMJ.ins.iclass.getTableConfig().IsSaveTable) {
                if (HZMJ.ins.iclass.getTableConfig().IsTableCreatorPay) {
                    M_HZMJView.ins.MsgBox.showMsgBox('是否需要系统为您保留房间？系统会在游戏开始前为您保留' + HZMJ.ins.iclass.getTableConfig().SaveTableTime + '分钟，请您记住房号' + HZMJ.ins.iclass.getTableConfig().TableCode + '。', "保留", () => {
                        var saveTable: M_HZMJ_GameMessage.CMD_C_SaveTable = new M_HZMJ_GameMessage.CMD_C_SaveTable();
                        M_HZMJClass.ins.SendGameData(saveTable);
                    }, this, "不保留", () => { HZMJ.ins.iclass.exit(); }, this);
                }
                else {
                    M_HZMJView.ins.MsgBox.showMsgBox('此房间为AA制付费，不支持保留房间，离开房间，房间将解散。', "确定", () => {
                        //打开充值
                        HZMJ.ins.iclass.exit();
                    }, this);
                    // this.gameClass.UiManager.ShowMsgBox("此房间为AA制付费，不支持保留房间，离开房间，房间将解散。", this, () => {
                    //     this.gameClass.ExitGame();
                    // });
                }

            }
            else {
                M_HZMJView.ins.MsgBox.showMsgBox('是否退出临泉麻将？', "确定", () => {
                    //打开充值
                    HZMJ.ins.iclass.exit();
                }, this);
                //HZMJ.ins.iclass.exit();
            } 
        }
    }
    public showMsg(){
      
        this._dissTable.node.active=false;
        this._msgBox.lbl_msg.string="您的操作过于频繁,请一分钟后再次操作";
        this._msgBox.node.active=true;
    }
    
}

