const {ccclass, property} = cc._decorator;

import { JZMJMahjongDef, IJZMJView, JZMJ, JZMJTableConfig, JZMJTimer, enGamePhase, JZMJOutCardPlayer, JZMJRecordCard, enJZMJAniType } from "./ConstDef/JZMJMahjongDef";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { GameIF } from "../../CommonSrc/GameIF";
import M_JZMJClass from './M_JZMJClass';
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
import M_JZMJVoice from './M_JZMJVoice';
import M_JZMJVideoClass from './M_JZMJVideoClass';
import HuDong_Animation from "../MJCommon/HuDong_Animation";

@ccclass
export default class M_JZMJView extends cc.Component implements IJZMJView {

        private static AniPos: Array<{ x: number,y: number }> = [
            { x: 640,y: 510 },
            { x: 1110,y: 360 },
            { x: 640,y: 150 },
            { x: 180,y: 360 }
        ];
    
        private static _ins: M_JZMJView;
        /**
         * JZMJView单例
         * */
        public static get ins(): M_JZMJView { return this._ins; }
        public get gameClass(): M_JZMJClass { return M_JZMJClass.ins; }

        //东南西北显示
        @property(cc.Sprite)
        fangXiangView:cc.Sprite = null;

        //局数显示
        @property(cc.Node)
        group_gameNum: cc.Node=null;

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
        @property(cc.Node)
        group_mid: cc.Node = null;

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
        prefab_hudong:cc.Prefab = null;
        private huDongDaoJu:HuDong_Animation;
        public get HuDong_Ani():HuDong_Animation{
            return this.huDongDaoJu;
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
        JZMJ_SelGang_View: cc.Prefab=null;
        //选择杠
        private _selGang: JZMJ_SelGang;
        /**
         * 选择杠视图
         * */
        public get SelGangView(): JZMJ_SelGang {
            return this._selGang;
        }           
        
        @property(cc.Prefab)
        JZMJ_QiangGang_View: cc.Prefab=null;
        //抢杠
        private _qiangGang: JZMJ_QiangGangView;
        /**
         * 抢杠视图
         * */
        public get QiangGangView(): JZMJ_QiangGangView {
            return this._qiangGang;
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



        @property(cc.Button)
        //录音
        btn_recordVideo:cc.Button=null;

        @property(cc.Button)
        //语句设置
        btn_chat:cc.Button=null;

        @property(cc.Prefab)
        JZMJ_help_View: cc.Prefab=null;
        private _help:JZMJ_HelpView;//me
        /**
         * 帮助
         * */
        public get Help():JZMJ_HelpView{
            return this._help;
        };


        @property(cc.Prefab)
        //录音
        JZMJ_recordVideo: cc.Prefab=null;
        private _recordVideo: MJ_RecordVideo;//me

        //是否有录音
        private _haveRecordVoice:boolean;


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
        JZMJ_Pao_View:cc.Prefab=null;
        //跑
        private _pao:JZMJ_Pao;//me

        public get PaoView():JZMJ_Pao{
            return this._pao;
        }

        @property(cc.Prefab)
        JZMJ_La_View:cc.Prefab=null;
        //拉
        private _la:JZMJ_La;//me

        public get LaView():JZMJ_La{
            return this._la;
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

        // @property(cc.Button)
        // //请求计分板
        // btn_queryRecord:cc.Button=null;

        @property(cc.Prefab)
        JZMJ_JiFenBan_View:cc.Prefab=null;
        //记分板
        private _jifenban:JZMJ_JiFenBanX;
        /**
         * 游戏记分板
         * */
        public get GameJiFenBan(): JZMJ_JiFenBanX{
            return this._jifenban;
        }

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
        @property(cc.Button)
        //位置
        btn_location:cc.Button=null;
        @property(cc.Button)
        //请求听牌提示
        btn_tingtip:cc.Button=null;

        onLoad(){
            M_JZMJView._ins = this;
            JZMJ.ins.iview = this;
            
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

            let selgnode=cc.instantiate(this.JZMJ_SelGang_View);
            this._selGang=selgnode.getComponent<JZMJ_SelGang>(JZMJ_SelGang);
            this.node.addChild(selgnode);

            let qianggnode=cc.instantiate(this.JZMJ_QiangGang_View);
            this._qiangGang=qianggnode.getComponent<JZMJ_QiangGangView>(JZMJ_QiangGangView);
            this.node.addChild(qianggnode);

            let tingtipnode=cc.instantiate(this.JZMJ_TingTip_View);
            this._tingTip=tingtipnode.getComponent<JZMJ_TingTip>(JZMJ_TingTip);
            this.node.addChild(tingtipnode);

            let paonode=cc.instantiate(this.JZMJ_Pao_View);
            this._pao=paonode.getComponent<JZMJ_Pao>(JZMJ_Pao);
            this.node.addChild(paonode);

            let lanode=cc.instantiate(this.JZMJ_La_View);
            this._la=lanode.getComponent<JZMJ_La>(JZMJ_La);
            this.node.addChild(lanode);

            let setnode=cc.instantiate(this.JZMJ_Setting_View);
            this._setting=setnode.getComponent<JZMJ_SettingView>(JZMJ_SettingView);
            this.node.addChild(setnode);

            let recordVnode=cc.instantiate(this.JZMJ_recordVideo);
            this._recordVideo=recordVnode.getComponent<MJ_RecordVideo>(MJ_RecordVideo);
            this.node.addChild(recordVnode);

            let udnode=cc.instantiate(this.JZMJ_UserData_View);
            this._userData=udnode.getComponent<MJ_UserData>(MJ_UserData);
            this.node.addChild(udnode);

            let helpnode=cc.instantiate(this.JZMJ_help_View);
            this._help=helpnode.getComponent<JZMJ_HelpView>(JZMJ_HelpView);
            this.node.addChild(helpnode);

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

            let cheatNode=cc.instantiate(this.MJ_Cheating);
            this._mjcheat=cheatNode.getComponent<MJ_Cheating>(MJ_Cheating);
            this.node.addChild(cheatNode);

            let mjoutNode=cc.instantiate(this.MJ_Out);
            this._mjOut=mjoutNode.getComponent<MJ_Out>(MJ_Out);
            this.node.addChild(mjoutNode);

            let hudongnode = cc.instantiate(this.prefab_hudong);
            this.huDongDaoJu = hudongnode.getComponent<HuDong_Animation>(HuDong_Animation);
            this.node.addChild(hudongnode);

            let jsnode=cc.instantiate(this.JZMJ_JieShuan_View);
            this._jieShuan=jsnode.getComponent<JZMJ_JieShuan>(JZMJ_JieShuan);
            this.node.addChild(jsnode);

            let fxnode=cc.instantiate(this.JZMJ_FenXiang_View);
            this._fenxiang=fxnode.getComponent<JZMJ_FenXiang>(JZMJ_FenXiang);
            this.node.addChild(fxnode);

            let jfbnode=cc.instantiate(this.JZMJ_JiFenBan_View);
            this._jifenban=jfbnode.getComponent<JZMJ_JiFenBanX>(JZMJ_JiFenBanX);
            this.node.addChild(jfbnode);

            let disstablenode=cc.instantiate(this.JZMJ_DissTable_View);
            this._dissTable=disstablenode.getComponent<JZMJ_DissTable>(JZMJ_DissTable);
            this.node.addChild(disstablenode);
            
            this.btn_recordVideo.node.active=false;
            this.btn_chat.node.active=false;
            // this.btn_queryRecord.node.active=false;
            this._haveRecordVoice=false;
            this.btn_location.node.active=false;
            this.node.on(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
            this.btn_chat.node.on(cc.Node.EventType.TOUCH_END,this.onshowChatWindows,this);

            this.btn_recordVideo.node.on(cc.Node.EventType.TOUCH_START,this.onStartRecordVideo,this);
            this.btn_recordVideo.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onStopRecordVideo,this);
            this.btn_recordVideo.node.on(cc.Node.EventType.TOUCH_END,this.onStopRecordVideo,this);

            // this.btn_queryRecord.node.on(cc.Node.EventType.TOUCH_END,() => {
            //     if(0 == M_JZMJClass.ins.TableConfig.alreadyGameNum){
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
            
            if (cc.isValid(this._startAni)) {
                this.StartAni.init();
            }
            
            //this._operatorView.node.on(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
            //this._selGang.node.on(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
            //this._cardView.node.on(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
            // this._qiangGang.node.on(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
            // this._jieShuan.node.on(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
            
            //this._readyStatus_userInfo.node.on(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
            //this._szAni.node.on(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
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
         //   this.gameClass.ShowShare(0, this.gameClass.TableID, this.gameClass.WebConfigName() + "麻将分享",JZMJ.ins.iclass.getTableConfig().shareContext);
        this.gameClass.ShowShare(0, this.gameClass.TableID, this.gameClass.WebConfigName() + "【临泉麻将】房号："+JZMJ.ins.iclass.getTableConfig().TableCode,JZMJ.ins.iclass.getTableConfig().shareContext);

        }

        private onshowSetting(e:cc.Event.EventTouch):void{
            // this._setting.showView();
            //M_JZMJClass.ins.ShowSettingForm();
            M_JZMJVoice.PlayCardType(`/sound/Button32.mp3`);
            this._setting.onOpen();
        } 

        private onshowChatWindows(e:cc.Event.EventTouch):void{
            M_JZMJVoice.PlayCardType(`/sound/Button32.mp3`);
            M_JZMJClass.ins.showChat();
        }
        /**
         * 开始录音
         * */
        private onStartRecordVideo(e:cc.Event.EventTouch):void{
            if(this.gameClass.StartRecord()){
                M_JZMJVoice.PlayCardType(`/sound/Button32.mp3`);
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
        // private _szAni: JZMJ_SZAni;
        // /**
        //  * 骰子动画
        //  * */
        // public get SZAni(): JZMJ_SZAni {
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
        //     console.log("gameview === JZMJView InitUiClass");
        //     M_JZMJView._ins = this;
        //     this._sendCardEngine = new JZMJSendCardEngine();
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
        //     console.log("gameview === JZMJView InitGameView");
        //     super.InitGameView();
        //     this.touchEnabled = true;

        //     this.gameClass.addEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._operatorView.addEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._selGang.addEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._cardView.addEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._qiangGang.addEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._jieShuan.addEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._sendCardEngine.addEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._readyStatus_userInfo.addEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._szAni.addEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._pao.addEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._la.addEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);

        //     this._btn_queryRecord.addEventListener(egret.TouchEvent.TOUCH_TAP,(e: egret.TouchEvent) => {
        //         if(0 == M_JZMJClass.ins.TableConfig.alreadyGameNum){
        //             this.MsgBox.showMsgBox("暂无游戏记录");
        //         }else{
        //             this._jifenban.startShow();
        //         }
        //     },this);
        //     this._btn_chat.addEventListener(egret.TouchEvent.TOUCH_TAP,(e: egret.TouchEvent) => {
        //         M_JZMJClass.ins.showChat();
        //         M_JZMJView.ins.showCtlChat=true;
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
        //     M_JZMJClass.ins.StopRecord();
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
        //     this.gameClass.removeEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     //this._dingQue.removeEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._operatorView.removeEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._selGang.removeEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._cardView.removeEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._qiangGang.removeEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._jieShuan.removeEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._sendCardEngine.removeEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._readyStatus_userInfo.removeEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._szAni.removeEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._pao.removeEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
        //     this._la.removeEventListener(JZMJEvent.JZMJ_EVENT_TYPE,this.onGameEvent,this);
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
            // this.btn_queryRecord.node.active = M_JZMJClass.ins.isSelfCreateRoom;
            this.btn_recordVideo.node.active = M_JZMJClass.ins.isSelfCreateRoom;
            this.btn_location.node.active = M_JZMJClass.ins.isSelfCreateRoom;
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
            // this._gameStatus_userInfo.HideLaPao();
            this._gameStatus_userInfo.tableOwener = JZMJ.ins.iclass.getTableConfig().tableCreatorChair;
            this._timerView.timerNum = 0;
            this._timerView.showArrow = JZMJ.ins.iclass.getSelfChair();
            this._timerView.showArr(255,JZMJ.ins.iclass.getSelfChair());
            this._timerView.node.active=false;
            this._cardView.node.active = true;
            
        }

        public StartSendCard():void{
            this._startAni.play();
            this._gameInfo.holdCardOver();
            for(let i=0;i<JZMJMahjongDef.gPlayerNum;i++){
                this.CardView.holdTricksCard(i,13);
            }
            this.scheduleOnce(()=>{
                //  this._startAni.node.active=false;
                 this._szAni.playSZ(M_JZMJClass.ins.SZ1,M_JZMJClass.ins.SZ2,JZMJEvent.msg_holdCardSZComplete);
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
            //     M_JZMJVoice.playDaoJu("eggs.mp3");
            // if(idx == 1)
            //     M_JZMJVoice.playDaoJu("zuichun.mp3");
            // if(idx == 2)
            //     M_JZMJVoice.playDaoJu("banzhuan.mp3");
            // if(idx == 3)
            //     M_JZMJVoice.playDaoJu("zhadan.mp3");
        }else{
            this.ReadyStatusUserInfo.ShowGuZhang(spschair);
            this.GameStatusUserInfo.ShowGuZhang(spschair);
            // M_JZMJVoice.playDaoJu("guzhang.mp3");
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
        private onGameEvent(e: JZMJEvent): void {
            switch(e.msgCode) {
                //玩家进入    
                // case JZMJEvent.msg_playerComeing: {
                //     console.log("玩家进入响应");
                //     e.stopPropagation();
                //     this.clear();
                //     // this._btn_queryRecord.visible = M_JZMJClass.ins.isSelfCreateRoom;
                //     // this._btn_recordVideo.visible = M_JZMJClass.ins.isSelfCreateRoom;
                //     this.group_gameNum.active=false;
                //     break;
                // }
                //游戏开始
                // case JZMJEvent.msg_gameStart: {
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
                //     this._timerView.showArrow = JZMJMahjongDef.gInvalidChar;
                //     this._timerView.node.active=false;
                //     this._cardView.node.active = true;

                //     e.stopPropagation();
                //     break;
                // }
                //开始发牌
                // case JZMJEvent.msg_startSendCard: {
                //     //this._startAni.Play();
                //     // egret.setTimeout(()=>{
                //     //     this._startAni.visible=false;
                   // this._szAni.playSZ(M_JZMJClass.ins.SZ1,M_JZMJClass.ins.SZ2,JZMJEvent.msg_holdCardSZComplete);
                //     //},this,1250);
                //     e.stopPropagation();
                //     break;
                // }
                //抓牌骰子动画播放完毕
                case JZMJEvent.msg_holdCardSZComplete: {
                    // for(let i=0;i<JZMJMahjongDef.gPlayerNum;i++){
                    //     this.CardView.holdTricksCard(i,13);
                    // }
                    //this._gameInfo.holdCardOver();
                    this._cardView.selfActive.refreshHandCardData(JZMJ.ins.iclass.getSelfHandCardData());
                    this._cardView.selfActive.arrangeHandCard();
                    this._szAni.node.active = false;
                    M_JZMJClass.ins.fankai=false;
                    //  this.CardView.hunPi.ShowCard(M_JZMJClass.ins._hunPiCard);             
                    //  this.CardView.hunPi.ShowCardHaveZZ(M_JZMJClass.ins._hunPiCard);
                    //this._sendCardEngine.start(M_JZMJClass.ins.BankerChair);
                    e.stopPropagation();
                    break;
                }
                
                
                //继续游戏
                case JZMJEvent.msg_goongame: {
                    this.clear();
                    this._gameInfo.node.active = true;
                    //if(M_JZMJClass.ins.TableConfig.IsBuKao){
                         //this._gameInfo.leftCardNum=108
                    //}else{
                        this._gameInfo.leftCardNum=JZMJMahjongDef.gCardCount_Package;
                    //}
                    
                    this.group_gameNum.active =false;
                    //如果余额够,自动发送准备
                    if(M_JZMJClass.ins.checkMoneyCanGame()){
                        console.log(`isSelfCreateRoom=${this.gameClass.isSelfCreateRoom}`);
                        console.log(`alreadyGameNum=${M_JZMJClass.ins.TableConfig.alreadyGameNum}`);
                        console.log(`isPlayEnoughGameNum=${M_JZMJClass.ins.TableConfig.isPlayEnoughGameNum(M_JZMJClass.ins._addNum)}`);
                        
                        if(this.gameClass.isSelfCreateRoom && (M_JZMJClass.ins.TableConfig.alreadyGameNum > 0) && !M_JZMJClass.ins.TableConfig.isPlayEnoughGameNum(M_JZMJClass.ins._addNum)){
                            this.ReadyStatusUserInfo.OnPlayerStatusChange(M_JZMJClass.ins.SelfChair,QL_Common.GState.PlayerReady);
                            
                            this.gameClass.SendGameData(new M_JZMJ_GameMessage.CMD_C_NextGame());                       
                        }else{
                            M_JZMJClass.ins.SendUserReady();
                        }
                    }
                    // else{
                    //     this._readyStatus_userInfo.initHelpNum();
                    //     //发起求助
                    //     var tipMsg: string = `您的游戏币已经不足,无法继续游戏,共次共需要:${TranslateMoneyTypeName(JZMJ.ins.iclass.getRoomData().TableCostMoneyType)}X${M_JZMJClass.ins.gameMoneyNum},点击关闭将会返回大厅。您还可以选择：`;
                    //     if(M_JZMJClass.ins.isSelfCreateRoom) {
                    //         //发起求助
                    //         M_JZMJView.ins.MsgBox.showMsgBox(tipMsg,"去充值",() => {
                    //     //充值 
                    //     M_JZMJClass.ins.showPay();
                    // },this,"",null,null,() => {
                    //     //退出游戏
                    //     M_JZMJClass.ins.ExitGame();
                    // },this); 
                    //     } else {
                    //         //发起求助
                    //         M_JZMJView.ins.MsgBox.showMsgBox(tipMsg,"去充值",() => {
                    //     //充值 
                    //     M_JZMJClass.ins.showPay();
                    // },this,"",null,null,() => {
                    //     //退出游戏
                    //     M_JZMJClass.ins.ExitGame();
                    // },this); 
                    //     }
                    // }
                    break;
                }
                //玩家打出牌
                case JZMJEvent.msg_outACard: {

                    this._cardView.selfActive.activeEnable(false);
                    // this._operatorView.show = false;
                    // this._selGang.show = false;

                    //this.node.dispatchEvent(e.clone());

                    break;
                }
                //房主
                // case JZMJEvent.msg_tableCreatorInfo:{
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
            if (JZMJ.ins.iclass.getTableConfig().alreadyGameNum==0) {
                this.gameClass.SendUserReady();
            }
            else {
                //this.DestroyTimer();
                this.gameClass.SendGameData(new M_JZMJ_GameMessage.CMD_C_NextGame());
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
        public playJZMJAni(chair: number,aniType: enJZMJAniType): void {
            var logicChair: number = JZMJ.ins.iclass.physical2logicChair(chair);
            
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
                // case enJZMJAniType.aniType_start: {
                //      this._aniPanel.PlayAnimation("AniStart",logicChair);                 
                //     break;
                // }
            }
          
        }
        public ShowSetVolume():void{
            this.gameClass.ShowSettingForm();
        }
        
    /**
     * 物理按钮事件
     */
    public OnButtonExit() {
        if (!JZMJ.ins.iclass.ifCanExitGame(JZMJ.ins.iclass.getSelfChair())) {
            if (JZMJ.ins.iclass.isCreateRoom()) {
                return;
            }
            else {
                M_JZMJView.ins.MsgBox.showMsgBox("在游戏中退出会扣除游戏币,是否退出", "继续强退", () => {
                    var forceLeft: M_JZMJ_GameMessage.CMD_C_ForceLeft = new M_JZMJ_GameMessage.CMD_C_ForceLeft();
                    forceLeft.PlayerID = JZMJ.ins.iclass.getTablePlayerAry()[JZMJ.ins.iclass.getSelfChair()].PlayerID;
                    M_JZMJClass.ins.SendGameData(forceLeft);
                }, this, "返回游戏");
            }
        } else {
            // if (!JZMJ.ins.iclass.isVideo() && JZMJ.ins.iclass.isCreateRoom()
            //     && JZMJ.ins.iclass.getSelfChair() == JZMJ.ins.iclass.getTableConfig().tableCreatorChair && !JZMJ.ins.iclass.getTableConfig().IsSaveTable) {
            //     if (JZMJ.ins.iclass.getTableConfig().IsTableCreatorPay) {
            //         M_JZMJView.ins.MsgBox.showMsgBox('是否需要系统为您保留房间？系统会在游戏开始前为您保留' + JZMJ.ins.iclass.getTableConfig().SaveTableTime + '分钟，请您记住房号' + JZMJ.ins.iclass.getTableConfig().TableCode + '。', "保留", () => {
            //             var saveTable: M_JZMJ_GameMessage.CMD_C_SaveTable = new M_JZMJ_GameMessage.CMD_C_SaveTable();
            //             M_JZMJClass.ins.SendGameData(saveTable);
            //         }, this, "不保留", () => { JZMJ.ins.iclass.exit(); }, this);
            //     }
            //     else {
            //         M_JZMJView.ins.MsgBox.showMsgBox('此房间为AA制付费，不支持保留房间，离开房间，房间将解散。', "确定", () => {
            //             //打开充值
            //             JZMJ.ins.iclass.exit();
            //         }, this);
            //         // this.gameClass.UiManager.ShowMsgBox("此房间为AA制付费，不支持保留房间，离开房间，房间将解散。", this, () => {
            //         //     this.gameClass.ExitGame();
            //         // });
            //     }
            // }
            // else {
            //     M_JZMJView.ins.MsgBox.showMsgBox('是否退出霍邱麻将？', "确定", () => {
                    //打开充值
                    JZMJ.ins.iclass.exit();
            //     }, this);
            //     //JZMJ.ins.iclass.exit();
            // } 
        }
    }
    public showMsg(){
      
        this._dissTable.node.active=false;
        this._msgBox.lbl_msg.string="您的操作过于频繁,请一分钟后再次操作";
        this._msgBox.node.active=true;
    }
    
}

