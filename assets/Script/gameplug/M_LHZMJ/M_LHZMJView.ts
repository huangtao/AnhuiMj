const { ccclass, property } = cc._decorator;

import { LHZMJMahjongDef, ILHZMJView, LHZMJ, LHZMJTableConfig, LHZMJTimer, enGamePhase, LHZMJOutCardPlayer, LHZMJRecordCard, enLHZMJAniType } from "./ConstDef/LHZMJMahjongDef";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { GameIF } from "../../CommonSrc/GameIF";
import M_LHZMJClass from "./M_LHZMJClass";
import LHZMJ_ReadyStatusGameInfo from "./SkinView/LHZMJ_ReadyStatusGameInfo";
import LHZMJ_GameInfo from "./SkinView/LHZMJ_GameInfo";
import LHZMJ_ReadyStatusUserInfo from "./SkinView/LHZMJ_ReadyStatusUserInfo";
import { M_LHZMJ_GameMessage } from "../../CommonSrc/M_LHZMJ_GameMessage";
import LHZMJ_TimerView from "./SkinView/LHZMJ_Timer";
import LHZMJ_SZAni from "./SkinView/LHZMJ_SZAni";
import LHZMJ_GameStatusUserInfo from "./SkinView/LHZMJ_GameStatusUserInfo";
import LHZMJ_CardView from "./SkinView/LHZMJ_CardView";
import LHZMJEvent from "./LHZMJEvent";
import LHZMJ_OperatorView from "./SkinView/LHZMJ_OperatorView";
import LHZMJ_JieShuan from "./SkinView/LHZMJ_JieShuan";
import MJ_RecordVideo from "../MJCommon/MJ_RecordVideo";
import LHZMJ_SelGang from "./SkinView/LHZMJ_SelGang";
import LHZMJ_QiangGangView from "./SkinView/LHZMJ_QiangGangView";
import LHZMJ_TingTip from "./SkinView/LHZMJ_TingTip";
import LHZMJ_TipMsg from "./SkinView/LHZMJ_TipMsg";
import LHZMJ_DissTable from "./SkinView/LHZMJ_DissTable";
import LHZMJ_MsgBox from "./SkinView/LHZMJ_MsgBox";
import LHZMJ_Pao from "./SkinView/LHZMJ_Pao";
import LHZMJ_La from "./SkinView/LHZMJ_La";
import LHZMJ_SettingView from "./SkinView/LHZMJ_SettingView";
import MJ_UserData from "../MJCommon/MJ_UserData";
import LHZMJ_FenXiang from "./SkinView/LHZMJ_FenXiang";
import LHZMJ_Ani from "./SkinView/LHZMJ_Ani";
import LHZMJ_StartAni from "./SkinView/LHZMJ_StartAni";

import LHZMJ_OutCardView from "./SkinView/LHZMJ_OutCardView";
import Global from "../../Global/Global";
import LHZMJ_ReadyAndGaming from "./SkinView/LHZMJ_ReadyAndGaming";
import HuDong_Animation from "../MJCommon/HuDong_Animation";
import LHZMJ_Cheating from "./SkinView/LHZMJ_Cheating";
import M_LHZMJVoice from "./M_LHZMJVoice";
import { AudioType } from "../../CustomType/Enum";
import MJ_Out from "../MJCommon/MJ_Out";

@ccclass
export default class M_LHZMJView extends cc.Component implements ILHZMJView {

    private static AniPos: Array<{ x: number, y: number }> = [
        { x: 640, y: 510 },
        { x: 1110, y: 360 },
        { x: 640, y: 150 },
        { x: 180, y: 360 }
    ];



    private static _ins: M_LHZMJView;
    /**
     * LHZMJView单例
     * */
    public static get ins(): M_LHZMJView { return this._ins; }
    public get gameClass(): M_LHZMJClass { return M_LHZMJClass.ins; }

    private _isCleared: boolean = false;

    public get IsCleared(): boolean { return this._isCleared; }

    // //局数显示
    // @property(cc.Node)
    // group_gameNum: cc.Node = null;



    @property(cc.Prefab)
    GameInfoView: cc.Prefab=null;

    //游戏信息
    private _gameInfo: LHZMJ_GameInfo;//me
    /**
     * 游戏信息
     * */
    public get GameInfo(): LHZMJ_GameInfo {
        if (cc.isValid(this._gameInfo)) {
            return this._gameInfo;
        }
        // else {
        //     cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_GameInfo", function (err, prefab) {
        //         if (err) {
        //             cc.error(err);
        //             return;
        //         }
        //         if (!cc.isValid(this._gameInfo)) {
        //             let ginode: cc.Node = cc.instantiate(prefab);
        //             this._gameInfo = ginode.getComponent<LHZMJ_GameInfo>(LHZMJ_GameInfo);
        //             cc.log("加载中！！！");
        //             ginode.setLocalZOrder(1);
        //             this.node.addChild(ginode);
        //             this._gameInfo.init();
        //             return this._gameInfo;
        //         }
        //     }.bind(this));
        // }
    }
            //中间层
    @property(cc.Node)
    info_mid: cc.Node = null;
        //中间层
    @property(cc.Node)
    group_mid: cc.Node = null;

    // @property(cc.Prefab)
    // ReadyStatusGameInfoView: cc.Prefab = null;

    //准备状态时的游戏信息
    private _readyStatus_gameInfo: LHZMJ_ReadyStatusGameInfo;//me
    /**
     * 准备状态游戏信息
     * */
    public get ReadyStatusGameInfo(): LHZMJ_ReadyStatusGameInfo {
        return this._readyStatus_gameInfo;
    }


    // private _settingView:LHZMJ_SettingView;
    // public get LHZMJ_SettingView(): LHZMJ_SettingView {
    //     return this._settingView;
    // }
    // @property(cc.Prefab)
    // ReadyStatusGameUserView: cc.Prefab = null;

    // //准备状态玩家信息
    // private _readyStatus_userInfo: LHZMJ_ReadyStatusUserInfo;//me
    // /**
    //  * 准备状态玩家信息
    //  * */
    // public get ReadyStatusUserInfo(): LHZMJ_ReadyStatusUserInfo {
    //     return this._readyStatus_userInfo;
    // }
    @property(cc.Prefab)
    ReadyAndGameUserView: cc.Prefab = null;

    //准备状态玩家信息
    private _rg_userInfo: LHZMJ_ReadyAndGaming;//me
    /**
     * 准备状态玩家信息
     * */
    public get ReadyAndGameUserInfo(): LHZMJ_ReadyAndGaming {
        return this._rg_userInfo;
    }

    // @property(cc.Prefab)
    // Time_View: cc.Prefab=null;
    //计时器
    private _timerView: LHZMJ_TimerView;//me
    /**
     * 游戏计时器
     * */
    public get TimerView(): LHZMJ_TimerView {
      //  if (cc.isValid(this._timerView)) {
            return this._timerView;
        // } else {
        //     cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_Timer3D", function (err, prefab) {
        //         if (err) {
        //             cc.error(err);
        //             return;
        //         }
        //         if (!cc.isValid(this._timerView)) {
        //             let timenode: cc.Node = cc.instantiate(prefab);
        //             this._timerView = timenode.getComponent<LHZMJ_TimerView>(LHZMJ_TimerView);
        //             timenode.setLocalZOrder(4);
        //             this.group_mid.addChild(timenode);
        //             this._timerView.init();
        //             return this._timerView;
        //         }
        //     }.bind(this));
        // }

    }


    // @property(cc.Prefab)
    // SZAni_View: cc.Prefab=null;
    //骰子动画
    private _szAni: LHZMJ_SZAni;//me
    /**
     * 骰子动画
     * */
    public get SZAni(): LHZMJ_SZAni {
            return this._szAni;
    }


    @property(cc.Prefab)
    LHZMJ_Card_View: cc.Prefab = null;
    //牌阵视图
    private _cardView: LHZMJ_CardView;//me
    /**
     * 牌阵视图
     * */
    public get CardView(): LHZMJ_CardView {
        return this._cardView;
    }

    // @property(cc.Prefab)
    // LHZMJ_OutCard_View: cc.Prefab = null;
    //出牌视图
    // private _outCardView: LHZMJ_OutCardView;//me
    // /**
    //  * 出牌视图
    //  * */
    // public get OutCardView(): LHZMJ_OutCardView {
    //     if (cc.isValid(this._outCardView)) {
    //         return this._outCardView;
    //     } else {
    //         cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_OutCardView", function (err, prefab) {
    //             if (err) {
    //                 cc.error(err);
    //                 return;
    //             }
    //             if (!cc.isValid(this._outCardView)) {
    //                 let ocvnode: cc.Node = cc.instantiate(prefab);

    //                 this._outCardView = ocvnode.getComponent<LHZMJ_OutCardView>(LHZMJ_OutCardView);
    //                 ocvnode.setLocalZOrder(7);
    //                 this.group_mid.addChild(ocvnode);
    //                 this._outCardView.init();
    //                 return this._outCardView;
    //             }
    //         }.bind(this));
    //     }

    // }

    // @property(cc.Prefab)
    // LHZMJ_OP_View: cc.Prefab=null;
    //玩家操作
    private _operatorView: LHZMJ_OperatorView;
    /**
     * 操作视图
     * */
    public get OperatorView(): LHZMJ_OperatorView {
        // if (cc.isValid(this._operatorView)) {
            return this._operatorView;
        // } 
        // else {
        //     cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_OperatorView", function (err, prefab) {
        //         if (err) {
        //             cc.error(err);
        //             return;
        //         }
        //         if (!cc.isValid(this._operatorView)) {
        //             let opnode: cc.Node = cc.instantiate(prefab);
        //             this._operatorView = opnode.getComponent<LHZMJ_OperatorView>(LHZMJ_OperatorView);
        //             opnode.setLocalZOrder(9);
        //             // M_LHZMJView._needDestroyNode.push(opnode);
        //             this.node.addChild(opnode);
        //             this._operatorView.init();
        //             return this._operatorView;
        //         }
        //     }.bind(this));
        // }
    }

    // @property(cc.Prefab)
    // LHZMJ_SelGang_View: cc.Prefab=null;
    //选择杠
    private _selGang: LHZMJ_SelGang;
    /**
     * 选择杠视图
     * */
    public get SelGangView(): LHZMJ_SelGang {
        // if (cc.isValid(this._selGang)) {
        return this._selGang;
        // } else {
        //     cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_SelGang", function (err, prefab) {
        //         if (err) {
        //             cc.error(err);
        //             return;
        //         }
        //         if (!cc.isValid(this._selGang)) {
        //             let selgnode: cc.Node = cc.instantiate(prefab);
        //             this._selGang = selgnode.getComponent<LHZMJ_SelGang>(LHZMJ_SelGang);
        //             selgnode.setLocalZOrder(10);
        //             // M_LHZMJView._needDestroyNode.push(selgnode);
        //             this.node.addChild(selgnode);
        //             this._selGang.init();
        //             return this._selGang;
        //         }
        //     }.bind(this));
        // }
    }


    // @property(cc.Prefab)
    // LHZMJ_QiangGang_View: cc.Prefab=null;
    //抢杠
    private _qiangGang: LHZMJ_QiangGangView;
    /**
     * 抢杠视图
     * */
    public get QiangGangView(): LHZMJ_QiangGangView {
        // if (cc.isValid(this._qiangGang)) {
            return this._qiangGang;
        // } else {
        //     cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_QiangGangView", function (err, prefab) {
        //         if (err) {
        //             cc.error(err);
        //             return;
        //         }
        //         if (!cc.isValid(this._qiangGang)) {
        //             let qianggnode: cc.Node = cc.instantiate(prefab);
        //             this._qiangGang = qianggnode.getComponent<LHZMJ_QiangGangView>(LHZMJ_QiangGangView);
        //             qianggnode.setLocalZOrder(11);
        //             // M_LHZMJView._needDestroyNode.push(qianggnode);
        //             this.node.addChild(qianggnode);
        //             this._qiangGang.init();
        //             return this._qiangGang;
        //         }
        //     }.bind(this));
        // }
    }

    @property(cc.Prefab)
    LHZMJ_TingTip_View: cc.Prefab = null;
    private _tingTip: LHZMJ_TingTip;
    /**
     * 听牌提示
     * */
    public get TingTip(): LHZMJ_TingTip {
        return this._tingTip;
    }
    @property(cc.Prefab)
    prefab_hudong:cc.Prefab = null;
    private huDongDaoJu:HuDong_Animation;
    public get HuDong_Ani():HuDong_Animation{
        return this.huDongDaoJu;
    }
     //outpai
    @property(cc.Prefab)
    MJ_Out:cc.Prefab=null;

    private _mjOut:MJ_Out;

    public get mg_out():MJ_Out{
        return this._mjOut;
    }


    @property(cc.Prefab)
    LHZMJ_JieShuan_View: cc.Prefab = null;
    //结算
    private _jieShuan: LHZMJ_JieShuan;//me
    /**
     * 结算视图
     * */
    public get JieShuanView(): LHZMJ_JieShuan {
        return this._jieShuan;
    }



    @property(cc.Button)
    //录音
    btn_recordVideo: cc.Button = null;

    @property(cc.Button)
    //语句设置
    btn_chat: cc.Button = null;

    // @property(cc.Prefab)
    // LHZMJ_help_View: cc.Prefab = null;
    // private _help: LHZMJ_HelpView;//me
    /**
     * 帮助
     * */
    // public get Help(): LHZMJ_HelpView {
    //         return this._help;
    // };


    @property(cc.Prefab)
    //录音
    LHZMJ_recordVideo: cc.Prefab = null;
    private _recordVideo: MJ_RecordVideo;//me

    //是否有录音
    private _haveRecordVoice: boolean;


    // @property(cc.Prefab)
    // LHZMJ_TipMsg_View: cc.Prefab = null;
    private _tipMsg: LHZMJ_TipMsg;
    /**
     * Tip视图
     */
    public get TipMsgView(): LHZMJ_TipMsg {
        return this._tipMsg;
    }


    // @property(cc.Prefab)
    // LHZMJ_DissTable_View: cc.Prefab = null;
    /**
     * 解散房间界面
     */
    private _dissTable: LHZMJ_DissTable;
    /**
     * 解散房间界面
     */
    public get DissTable(): LHZMJ_DissTable {
        return this._dissTable;
    }

    // @property(cc.Prefab)
    // LHZMJ_MsgBox_View: cc.Prefab = null;

    private _msgBox: LHZMJ_MsgBox;
    /**
     * 
     */
    public get MsgBox(): LHZMJ_MsgBox {
        return this._msgBox;
    }

    // @property(cc.Prefab)
    // LHZMJ_Pao_View:cc.Prefab=null;
    //跑
    private _pao: LHZMJ_Pao;//me

    public get PaoView(): LHZMJ_Pao {
        // if (cc.isValid(this._pao)) {
            return this._pao;
        // } else {
        //     cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_Pao", function (err, prefab) {
        //         if (err) {
        //             cc.error(err);
        //             return;
        //         }
        //         if (!cc.isValid(this._pao)) {
        //             let paonode: cc.Node = cc.instantiate(prefab);
        //             this._pao = paonode.getComponent<LHZMJ_Pao>(LHZMJ_Pao);
        //             paonode.setLocalZOrder(13);
        //             // M_LHZMJView._needDestroyNode.push(paonode);
        //             this.node.addChild(paonode);
        //             this._pao.init();
        //             return this._pao;
        //         }
        //     }.bind(this));
        // }
    }

    // @property(cc.Prefab)
    // LHZMJ_La_View:cc.Prefab=null;
    //拉
    private _la: LHZMJ_La;//me

    public get LaView(): LHZMJ_La {
        // if (cc.isValid(this._la)) {
            return this._la;
        // } else {
        //     cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_La", function (err, prefab) {
        //         if (err) {
        //             cc.error(err);
        //             return;
        //         }
        //         if (!cc.isValid(this._la)) {
        //             let lanode: cc.Node = cc.instantiate(prefab);
        //             this._la = lanode.getComponent<LHZMJ_La>(LHZMJ_La);
        //             lanode.setLocalZOrder(14);
        //             // M_LHZMJView._needDestroyNode.push(lanode);
        //             this.node.addChild(lanode);
        //             this._la.init();
        //             return this._la;
        //         }
        //     }.bind(this));
        // }
    }

    @property(cc.Prefab)
    LHZMJ_Setting_View: cc.Prefab = null;
    private _setting: LHZMJ_SettingView;

    @property(cc.Prefab)
    LHZMJ_UserData_View: cc.Prefab = null;
    //用户数据
    private _userData: MJ_UserData;
    /**
     * 用户数据
     * */
    public get UserData(): MJ_UserData {
        return this._userData;
    }





    @property(cc.Prefab)
    LHZMJ_FenXiang_View: cc.Prefab = null;
    //分享板
    private _fenxiang: LHZMJ_FenXiang;

    public get PlayFenXiang(): LHZMJ_FenXiang { return this._fenxiang }

    // @property(cc.Prefab)
    // LHZMJ_Ani_View:cc.Prefab=null;
    //动画面板
    private _aniPanel: LHZMJ_Ani;

    // @property(cc.Prefab)
    // LHZMJ_Start_Ani: cc.Prefab=null;
    private _startAni: LHZMJ_StartAni;
    /**
     * 帮助
     * */
    public get StartAni(): LHZMJ_StartAni {
        // if (cc.isValid(this._startAni)) {
            return this._startAni;
        // } else {
        //     cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_StartAni", function (err, prefab) {
        //         if (err) {
        //             cc.error(err);
        //             return;
        //         }
        //         if (!cc.isValid(this._startAni)) {
        //             let saninode: cc.Node = cc.instantiate(prefab);
        //             this._startAni = saninode.getComponent<LHZMJ_StartAni>(LHZMJ_StartAni);
        //             saninode.setLocalZOrder(21);
        //             this.node.addChild(saninode);
        //             this._startAni.init();
        //             return this._startAni;
        //         }
        //     }.bind(this));
        // }

    };
    private _checkip:LHZMJ_Cheating;
    public get CheckIp():LHZMJ_Cheating{
        return this._checkip;
    }

    // @property(cc.Button)
    // //请求计分板
    // btn_menu: cc.Button = null;

    @property(cc.Button)
    //请求听牌提示
    btn_tingtip: cc.Button = null;


    @property(cc.Sprite)
    backpack:cc.Sprite = null;
    //2d桌布
    @property(cc.SpriteFrame)
    private backpack_2d:cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private backpack_3d:cc.SpriteFrame = null;
    
    // @property(cc.Button)
    // //位置
    // btn_location: cc.Button = null;
    // @property(cc.Button)
    // //请求计分板
    // btn_menu: cc.Button = null;

    private _locked: boolean;

    private _lockedSetting: boolean;

    private static _needDestroyNode:Array<cc.Node>;

    onLoad() {
        M_LHZMJView._ins = this;
        LHZMJ.ins.iview = this;
        M_LHZMJView._needDestroyNode=new Array<cc.Node>();
        let ginode=cc.instantiate(this.GameInfoView);
        this._gameInfo=ginode.getComponent<LHZMJ_GameInfo>(LHZMJ_GameInfo);
        ginode.setLocalZOrder(1);
        this.info_mid.addChild(ginode);
        

        // let rsgnode = cc.instantiate(this.ReadyStatusGameInfoView);
        // this._readyStatus_gameInfo = rsgnode.getComponent<LHZMJ_ReadyStatusGameInfo>(LHZMJ_ReadyStatusGameInfo);
        // rsgnode.setLocalZOrder(2);
        // // M_LHZMJView._needDestroyNode.push(rsgnode);
        // this.group_mid.addChild(rsgnode);
            let mjoutNode=cc.instantiate(this.MJ_Out);
            this._mjOut=mjoutNode.getComponent<MJ_Out>(MJ_Out);
            this.node.addChild(mjoutNode);

        // let rsunode = cc.instantiate(this.ReadyStatusGameUserView);
        // this._readyStatus_userInfo = rsunode.getComponent<LHZMJ_ReadyStatusUserInfo>(LHZMJ_ReadyStatusUserInfo);
        // rsunode.setLocalZOrder(3);
        // // M_LHZMJView._needDestroyNode.push(rsunode);
        // this.node.addChild(rsunode);

        // let timenode=cc.instantiate(this.Time_View);
        // this._timerView=timenode.getComponent<LHZMJ_TimerView>(LHZMJ_TimerView);
        // timenode.setLocalZOrder(4);
        // this.group_mid.addChild(timenode);

        // let sznode=cc.instantiate(this.SZAni_View);
        // this._szAni=sznode.getComponent<LHZMJ_SZAni>(LHZMJ_SZAni);
        // sznode.setLocalZOrder(5);
        // this.node.addChild(sznode);

        let cvnode = cc.instantiate(this.LHZMJ_Card_View);
        this._cardView = cvnode.getComponent<LHZMJ_CardView>(LHZMJ_CardView);
        cvnode.setLocalZOrder(6);
        this.group_mid.addChild(cvnode);

        // let ocvnode=cc.instantiate(this.LHZMJ_OutCard_View);
        // this._outCardView=ocvnode.getComponent<LHZMJ_OutCardView>(LHZMJ_OutCardView);
        // ocvnode.setLocalZOrder(7);
        // this.group_mid.addChild(ocvnode);

        // let gsunode = cc.instantiate(this.GameStatus_userInfo_View);
        // this._gameStatus_userInfo = gsunode.getComponent<LHZMJ_GameStatusUserInfo>(LHZMJ_GameStatusUserInfo);
        // gsunode.setLocalZOrder(8);
        // // M_LHZMJView._needDestroyNode.push(gsunode);
        // this.node.addChild(gsunode);
        let rgunode = cc.instantiate(this.ReadyAndGameUserView);
        this._rg_userInfo = rgunode.getComponent<LHZMJ_ReadyAndGaming>(LHZMJ_ReadyAndGaming);
        rgunode.setLocalZOrder(8);
        // M_LHZMJView._needDestroyNode.push(gsunode);
        this.node.addChild(rgunode);

        // let opnode=cc.instantiate(this.LHZMJ_OP_View);
        // this._operatorView=opnode.getComponent<LHZMJ_OperatorView>(LHZMJ_OperatorView);
        // opnode.setLocalZOrder(9);
        // // this.node.addChild(opnode);

        // let selgnode=cc.instantiate(this.LHZMJ_SelGang_View);
        // this._selGang=selgnode.getComponent<LHZMJ_SelGang>(LHZMJ_SelGang);
        // selgnode.setLocalZOrder(10);
        // // this.node.addChild(selgnode);

        // let qianggnode=cc.instantiate(this.LHZMJ_QiangGang_View);
        // this._qiangGang=qianggnode.getComponent<LHZMJ_QiangGangView>(LHZMJ_QiangGangView);
        // qianggnode.setLocalZOrder(11);
        // this.node.addChild(qianggnode);

        let tingtipnode = cc.instantiate(this.LHZMJ_TingTip_View);
        this._tingTip = tingtipnode.getComponent<LHZMJ_TingTip>(LHZMJ_TingTip);
        tingtipnode.setLocalZOrder(12);
        // M_LHZMJView._needDestroyNode.push(tingtipnode);
        this.node.addChild(tingtipnode);

        // let paonode=cc.instantiate(this.LHZMJ_Pao_View);
        // this._pao=paonode.getComponent<LHZMJ_Pao>(LHZMJ_Pao);
        // paonode.setLocalZOrder(13);
        // // this.node.addChild(paonode);

        // let lanode=cc.instantiate(this.LHZMJ_La_View);
        // this._la=lanode.getComponent<LHZMJ_La>(LHZMJ_La);
        // lanode.setLocalZOrder(14);
        // // this.node.addChild(lanode);

        let setnode = cc.instantiate(this.LHZMJ_Setting_View);
        this._setting = setnode.getComponent<LHZMJ_SettingView>(LHZMJ_SettingView);
        setnode.setLocalZOrder(15);
        this.node.addChild(setnode);

        let recordVnode = cc.instantiate(this.LHZMJ_recordVideo);
        this._recordVideo = recordVnode.getComponent<MJ_RecordVideo>(MJ_RecordVideo);
        recordVnode.setLocalZOrder(16);
        this.node.addChild(recordVnode);

        let udnode = cc.instantiate(this.LHZMJ_UserData_View);
        this._userData = udnode.getComponent<MJ_UserData>(MJ_UserData);
        udnode.setLocalZOrder(17);
        this.node.addChild(udnode);

        // let helpnode = cc.instantiate(this.LHZMJ_help_View);
        // this._help = helpnode.getComponent<LHZMJ_HelpView>(LHZMJ_HelpView);
        // helpnode.setLocalZOrder(18);
        // this.node.addChild(helpnode);
        let hudongnode = cc.instantiate(this.prefab_hudong);
        this.huDongDaoJu = hudongnode.getComponent<HuDong_Animation>(HuDong_Animation);
        hudongnode.setLocalZOrder(18);
        this.node.addChild(hudongnode);

        // let tipnode = cc.instantiate(this.LHZMJ_TipMsg_View);
        // this._tipMsg = tipnode.getComponent<LHZMJ_TipMsg>(LHZMJ_TipMsg);
        // tipnode.setLocalZOrder(19);
        // this.node.addChild(tipnode);

        // let aninode=cc.instantiate(this.LHZMJ_Ani_View);
        // this._aniPanel=aninode.getComponent<LHZMJ_Ani>(LHZMJ_Ani);
        // aninode.setLocalZOrder(20);
        // this.node.addChild(aninode);

        // let saninode=cc.instantiate(this.LHZMJ_Start_Ani);
        // this._startAni=saninode.getComponent<LHZMJ_StartAni>(LHZMJ_StartAni);
        // saninode.setLocalZOrder(21);
        // this.node.addChild(saninode);


        let jsnode = cc.instantiate(this.LHZMJ_JieShuan_View);
        this._jieShuan = jsnode.getComponent<LHZMJ_JieShuan>(LHZMJ_JieShuan);
        jsnode.setLocalZOrder(22);
        // M_LHZMJView._needDestroyNode.push(jsnode);
        this.node.addChild(jsnode);




        // let disstablenode = cc.instantiate(this.LHZMJ_DissTable_View);
        // this._dissTable = disstablenode.getComponent<LHZMJ_DissTable>(LHZMJ_DissTable);
        // disstablenode.setLocalZOrder(23);
        // // M_LHZMJView._needDestroyNode.push(disstablenode);
        // this.node.addChild(disstablenode);

        let fxnode = cc.instantiate(this.LHZMJ_FenXiang_View);
        this._fenxiang = fxnode.getComponent<LHZMJ_FenXiang>(LHZMJ_FenXiang);
        fxnode.setLocalZOrder(24);
        // M_LHZMJView._needDestroyNode.push(fxnode);
        this.node.addChild(fxnode);



        // let msgboxnode = cc.instantiate(this.LHZMJ_MsgBox_View);
        // this._msgBox = msgboxnode.getComponent<LHZMJ_MsgBox>(LHZMJ_MsgBox);
        // msgboxnode.setLocalZOrder(26);
        // this.node.addChild(msgboxnode);

        this.btn_recordVideo.node.active = false;
        this.btn_chat.node.active = false;

        //this.btn_location.node.active = false;
        this._haveRecordVoice = false;

        this.node.on(LHZMJEvent.LHZMJ_EVENT_TYPE, this.onGameEvent, this);
        this.btn_chat.node.on(cc.Node.EventType.TOUCH_END, this.onshowChatWindows, this);

        this.btn_recordVideo.node.on(cc.Node.EventType.TOUCH_START, this.onStartRecordVideo, this);
        this.btn_recordVideo.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onStopRecordVideo, this);
        this.btn_recordVideo.node.on(cc.Node.EventType.TOUCH_END, this.onStopRecordVideo, this);



       // this.btn_menu.node.on(cc.Node.EventType.TOUCH_END, this.onShowMenu, this);
        //this.btn_location.node.on(cc.Node.EventType.TOUCH_END, this.onMap, this);


        cc.game.on(cc.game.EVENT_HIDE, this.onStopRecordVideo, this);
        cc.game.on(cc.game.EVENT_HIDE, this.onReflashHandCard, this);

        //this.Inti();
    }

    public Init(): void {
        if(LHZMJ.ins.iclass.is2D()){
           this.backpack.spriteFrame = this.backpack_2d; 
         }else{
            this.backpack.spriteFrame = this.backpack_3d;
        }
        
        this._locked = false;
        this._lockedSetting=false;
        if (cc.isValid(this.GameInfo)) {
            this.GameInfo.init();
        }
        if (cc.isValid(this.TimerView)) {
            this.TimerView.init();
        }
        if(cc.isValid(this._readyStatus_gameInfo)){
            this.ReadyStatusGameInfo.init();
        }
        
        // this.ReadyStatusUserInfo.init();
        this.ReadyAndGameUserInfo.init();
        
        if (cc.isValid(this._szAni)) {
            this.SZAni.init();
        }

        // this.GameStatusUserInfo.init();
        this.CardView.init();
        // if (cc.isValid(this._outCardView)) {
        //     this.OutCardView.init();
        // }
        // if(cc.isValid(this._help)){
        //     this.Help.init();
        // }
        
        if (cc.isValid(this._la)) {
            this.LaView.init();
        }

        if (cc.isValid(this._pao)) {
            this.PaoView.init();
        }

        this.JieShuanView.init();

        this.UserData.init();

        if (cc.isValid(this._aniPanel)) {
            this._aniPanel.init();
        } 
        // else {
        //     cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_Ani", function (err, prefab) {
        //         if (err) {
        //             cc.error(err);
        //             return;
        //         }
        //         if (!cc.isValid(this._aniPanel)) {
        //             let aninode: cc.Node = cc.instantiate(prefab);
        //             this._aniPanel = aninode.getComponent<LHZMJ_Ani>(LHZMJ_Ani);
        //             aninode.setLocalZOrder(20);
        //             this.node.addChild(aninode);
        //             this._aniPanel.init();
        //         }
        //     }.bind(this));
        // }

        //this.GameJiFenBan.init();
        if (cc.isValid(this._operatorView)) {
            this.OperatorView.init();
        }
        if (cc.isValid(this._selGang)) {
            this.SelGangView.init();
        }
        if (cc.isValid(this._qiangGang)) {
            this.QiangGangView.init();
        }
        // if (cc.isValid(this._help)) {
        //     this.Help.init();
        // }
       

        if(cc.isValid(this._setting)){
            this._setting.init();
        }
        
        this.PlayFenXiang.init();
        if (cc.isValid(this._startAni)) {
            this.StartAni.init();
        }
         if (cc.isValid(this._dissTable)) {
            this.DissTable.Init();
        }
        // this.TipMsgView.Init();
       // this.DissTable.Init();
        // this.MsgBox.Init();
        //this.GameJiFenBan.Init();

        this.btn_tingtip.node.active = false;


        this._recordVideo.init();
        cc.log("View初始化");
         if(cc.isValid(this.TingTip)){
            this.TingTip.init();
        }
       
    }

    public OnResetGameView() {
        this.clear();
    }

    public DestroyView() {
        cc.game.off(cc.game.EVENT_HIDE, this.onStopRecordVideo, this);
        cc.game.off(cc.game.EVENT_HIDE, this.onReflashHandCard, this);

        //销毁孤立节点
        while(M_LHZMJView._needDestroyNode.length>0){
            let node = M_LHZMJView._needDestroyNode.pop();
            if(cc.isValid(node)){
                node.removeFromParent();
                node.destroy();
            }
        }

        //释放预制体资源
        var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_GameInfo");
        cc.loader.release(des);
        var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_Timer3D");
        cc.loader.release(des);
        var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_SZani");
        cc.loader.release(des);
        // var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_OutCardView");
        // cc.loader.release(des);
        var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_OperatorView");
        cc.loader.release(des);
        var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_SelGang");
        cc.loader.release(des);

        var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_QiangGangView");
        cc.loader.release(des);
        var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_HelpView");
        cc.loader.release(des);
        var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_Pao");
        cc.loader.release(des);
        var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_La");
        cc.loader.release(des);
        var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_StartAni");
        cc.loader.release(des);
        var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_Ani");
        cc.loader.release(des);

        //额外的销毁
        // var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_CardView");
        // cc.loader.release(des);
        // var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_GameStatusUserInfo");
        // cc.loader.release(des);
        var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_MsgBox");
        cc.loader.release(des);
        var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_ReadyStatusGameInfo");
        cc.loader.release(des);
        // var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_ReadyStatusUserInfo");
        // cc.loader.release(des);
        var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_SettingView");
        cc.loader.release(des);

        // var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_JiFenBanX");
        // cc.loader.release(des);
        // var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_JieShuan");
        // cc.loader.release(des);
        // var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_FenXiang");
        // cc.loader.release(des);
        var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_TingTip");
        cc.loader.release(des);
        var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_TipMsg");
        cc.loader.release(des);
        var des= cc.loader.getDependsRecursively("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_DissTable");
        cc.loader.release(des);
        // var des= cc.loader.getDependsRecursively("gameres/gameCommonRes/Prefabs/MJCommon/MJ_RecordVideo");
        // cc.loader.release(des);
        // var des= cc.loader.getDependsRecursively("gameres/gameCommonRes/Prefabs/MJCommon/MJ_UserData");
        // cc.loader.release(des);
        
    }




    private onReflashHandCard() {
        if (cc.isValid(this._cardView)) {
            this._cardView.selfActive.reflashHandCardForHide();
            this._cardView.refreshHideCard(0);
        }
        if (cc.isValid(this._tingTip)) {
            this._tingTip.node.active = false;
        }
    }

    /**
     * 分享按钮事件
     */
    public OnButtonShare() {

          var curPlayer = M_LHZMJClass.ins.getTablePlayerAry();
        let curPlayerCount:number=0;//查看当前桌上玩家数
        for(let i:number=0;i<curPlayer.length;i++){
            if(null != curPlayer[i])
                curPlayerCount++;
        }
        var selfChair = M_LHZMJClass.ins.SelfChair;
        var playerName = curPlayer[selfChair].NickName;//发送邀请玩家的name

        let title : string;
        let context : string;
        let tableID : number = M_LHZMJClass.ins.TableID;
        title = "红中麻将 房间号:" + tableID + " "+curPlayerCount+"缺"+(4-curPlayerCount);

        let wanfa:string=  "";

        if(M_LHZMJClass.ins.TableConfig.IsTableCreatorPay == 1)
            wanfa = "AA支付,";
        if(M_LHZMJClass.ins.TableConfig.IsTableCreatorPay == 2)
            wanfa = "房主支付,";
        if(M_LHZMJClass.ins.TableConfig.IsTableCreatorPay == 3)
            wanfa = "圈主支付,";
          if(M_LHZMJClass.ins.TableConfig._MaShu == 0)
            wanfa += "2码 ";
        else if(M_LHZMJClass.ins.TableConfig._MaShu == 1)
            wanfa += "4码 ";
        else if(M_LHZMJClass.ins.TableConfig._MaShu == 2)
            wanfa += "6码 ";    
        if(M_LHZMJClass.ins.TableConfig._RulePeng == 0)
            wanfa += "可碰牌 ";
        else if(M_LHZMJClass.ins.TableConfig._RulePeng == 1)
            wanfa += "碰一次 ";
        else if(M_LHZMJClass.ins.TableConfig._RulePeng == 2)
            wanfa += "不可碰 ";
        if(M_LHZMJClass.ins.TableConfig.IfCanHu7Dui)
            wanfa += "可胡七对 ";
        if(M_LHZMJClass.ins.TableConfig._isGangLeJiuYou)
            wanfa += "杠了就有 ";
            
        context = "玩法:"+ wanfa + playerName + "邀请你";
        M_LHZMJClass.ins.ShowShare(null,tableID,title,context);
        this.gameClass.ShowShare(0, this.gameClass.TableID,title, context);
    }
    public GetMashu():number{
        return (M_LHZMJClass.ins.TableConfig._MaShu+1)*2;
    }

    public TingBtn(enable: boolean): void {
        // this.btn_tingtip.interactable=enable;
        this.btn_tingtip.node.active = enable;
    }

    private onTingTip(): void {
        if (this.TingTip.node.active) {
            this.TingTip.node.active = false;
            return;
        }
        this.gameClass.showTingCard(0, 3000 ,true);
    }
    private onShowMenu() {
        if(this._lockedSetting)
        {
            return;
        }
        if (cc.isValid(this._setting)) {
            this._setting.showRule();
        }else{
            this._lockedSetting=true;
            cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_SettingView", function (err, prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if (!cc.isValid(this._setting)) {
                    let setnode: cc.Node = cc.instantiate(prefab);
                    this._setting = setnode.getComponent<LHZMJ_SettingView>(LHZMJ_SettingView);
                    setnode.setLocalZOrder(15);
                    this.node.addChild(setnode);
                    this._setting.showRule();
                }else{
                    this._setting.showRule();
                }
                this._lockedSetting=false;
            }.bind(this));
        }
    }



    private onshowChatWindows(e: cc.Event.EventTouch): void {

        if (!this._locked) {
            M_LHZMJClass.ins.showChat();
            this._locked = true;
            setTimeout(function () {
                this._locked = false;
            }.bind(this), 200);
        }
    }
    /**
     * 开始录音
     * */
    private onStartRecordVideo(e: cc.Event.EventTouch): void {
        if (!this._haveRecordVoice) {
            this._haveRecordVoice = true;
            this._recordVideo.Show();
            if (this.gameClass.StartRecord()) {
                //this.gameClass.PauseSound();
            }
        }
    }

    /**
     * 录音结束
     * */
    private onStopRecordVideo(e: cc.Event.EventTouch): void {
        // this.btn_recordVideo.scaleX=1.0;
        // this.btn_recordVideo.scaleY=1.0;
        if (this._haveRecordVoice) {
            this._recordVideo.Close();
            this._haveRecordVoice = false;
            if (this.gameClass.AudioManager.IsRecording()) {
                this.gameClass.StopRecord();
                //播放背景音乐
                //this.gameClass.ContinueSound();
            }
        }

    }


    /**
     * 清理
     * */
    private clear(): void {
        if (cc.isValid(this._gameInfo)) {
            this.GameInfo.node.active = false;
        }
        // if (cc.isValid(this._timerView)) {
        //     this._timerView.node.active = false;
        //     this._timerView.clearAction();
        // }
        //隐藏玩家头像上的听
        this.ReadyAndGameUserInfo.HideTing();

        cc.log("玩家信息被清！！！");

        this._rg_userInfo.ShowState(true);

        this._cardView.node.active = false;
        this._cardView.clear();


        if (cc.isValid(this._pao)) {
            this._pao.node.active = false;

        }
        if (cc.isValid(this._la)) {
            this._la.node.active = false;

        }

        if (cc.isValid(this._selGang)) {
            this._selGang.node.active = false;

        }


        if (cc.isValid(this._operatorView)) {
            this._operatorView.node.active = false;

        }
        if(cc.isValid(this._qiangGang)){
            this._qiangGang.node.active = false;

        }
        

        this._jieShuan.node.active = false;
 
        



        this._tingTip.node.active = false;


        this.btn_tingtip.node.active = false;

        this._userData.node.active = false;

        this._isCleared = true;

        this.CardView.PaiQiangInfo.init();
    }

    public playerComeing(): void {
        cc.log("玩家进入响应");
        this.clear();
        this.btn_recordVideo.node.active = M_LHZMJClass.ins.isSelfCreateRoom;
        //this.btn_location.node.active = M_LHZMJClass.ins.isSelfCreateRoom;
        this.btn_chat.node.active = true;
       // this.group_gameNum.active = true;
    }

    public GameStart(): void {
        this._setting.refreshBtn_backStatus();
        this.ReadyAndGameUserInfo.warning.node.active = false;
        this._isCleared = false;
        this.hideGameInfo();
        
        // this._readyStatus_gameInfo.node.removeFromParent(false);
        // this._readyStatus_userInfo.node.active = false;
        // this._readyStatus_userInfo.node.removeFromParent(false);


        this._userData.node.active = false;
        // this._userData.node.removeFromParent(false);
        if (cc.isValid(this.GameInfo)) {
            this.GameInfo.init();
        }
        if (cc.isValid(this._szAni)) {
            this._szAni.Clear();
        }
        // this._gameStatus_userInfo.node.removeFromParent(false);
        // this.node.addChild(this._gameStatus_userInfo.node);
        // this._gameStatus_userInfo.node.active = true;
        this._rg_userInfo.ShowState(false);
        this._rg_userInfo.reflashPlayer();
        this._rg_userInfo.HideLaPao();
        this._rg_userInfo.tableOwener = LHZMJ.ins.iclass.getTableConfig().tableCreatorChair;
        // this._gameStatus_userInfo.reflashPlayer();
        // this._gameStatus_userInfo.HideLaPao();
        // this._gameStatus_userInfo.tableOwener = LHZMJ.ins.iclass.getTableConfig().tableCreatorChair;
        if (cc.isValid(this._timerView)) {
            this._timerView.timerNum = 0;
            // this._timerView.showArrow = LHZMJMahjongDef.gInvalidChar;
            // // this._timerView.clearAction();
            // this._timerView.node.active = false;
        }
        
        this._cardView.node.active = true;
        if(!LHZMJ.ins.iclass.is2D()){
            this._cardView.paiQiang.active = true;
        }

    }

    public nextAction (): void{
        this.GameInfo.holdCardOver();
        // for (let i = 0; i < LHZMJ.ins.iclass.getRealUserNum(); i++) {
        //     var playerarr = M_LHZMJClass.ins.getTablePlayerAry();
        //     playerarr.indexOf(null);

        //     this.CardView.holdTricksCard(i, 13);
        // }
        var playerarr = M_LHZMJClass.ins.getTablePlayerAry();
        for(let i = 0;i<playerarr.length;i++){
            if(playerarr[i] == null){
                continue;
            }
            this.CardView.holdTricksCard(i, 13);
        }
        this.scheduleOnce(()=>{
            this._cardView.selfActive.refreshHandCardData(LHZMJ.ins.iclass.getSelfHandCardData());
            this._cardView.selfActive.arrangeHandCard();      
            // if(M_LHZMJClass.ins.oncebuhua){
            //     this.CardView.selfActive.refreshCardStatus();
            // }
            
            },1.25);
    }

    public StartSendCard(): void {
        this.StartAniPlay();
        
        if(LHZMJ.ins.iclass.is2D()){
            this.nextAction();
        }else{
            this._cardView.PaiQiangInfo.showPaiWall(this,()=>this.nextAction());
        }

    }

    public TableCreatorInfo(chair: number): void {
        this._rg_userInfo.tableOwener = chair;
    }
    /**
     * 事件监听
     * */
    private onGameEvent(e: LHZMJEvent): void {
        switch (e.msgCode) {

            //抓牌骰子动画播放完毕
            case LHZMJEvent.msg_holdCardSZComplete: {
                this._cardView.selfActive.refreshHandCardData(LHZMJ.ins.iclass.getSelfHandCardData());
                this._cardView.selfActive.arrangeHandCard();
                if (cc.isValid(this._szAni)) {
                    this._szAni.node.active = false;
                }
                e.stopPropagation();
                break;
            }


            //继续游戏
            case LHZMJEvent.msg_goongame: {
                this.clear();
                this.GameInfo.node.active = true;
                this.GameInfo.leftCardNum = LHZMJMahjongDef.gCardCount_Package;
               // this.group_gameNum.active = true;
                //如果余额够,自动发送准备
                if (M_LHZMJClass.ins.checkMoneyCanGame) {
                    cc.log(`isSelfCreateRoom=${this.gameClass.isSelfCreateRoom}`);
                    cc.log(`alreadyGameNum=${M_LHZMJClass.ins.TableConfig.alreadyGameNum}`);
                    cc.log(`isPlayEnoughGameNum=${M_LHZMJClass.ins.TableConfig.isPlayEnoughGameNum}`);

                    if (this.gameClass.isSelfCreateRoom && (M_LHZMJClass.ins.TableConfig.alreadyGameNum > 0) && !M_LHZMJClass.ins.TableConfig.isPlayEnoughGameNum) {
                        // this.ReadyStatusUserInfo.OnPlayerStatusChange(M_LHZMJClass.ins.SelfChair, QL_Common.GState.PlayerReady);
                        this.ReadyAndGameUserInfo.OnPlayerStatusChange(M_LHZMJClass.ins.SelfChair, QL_Common.GState.PlayerReady);

                        this.gameClass.SendGameData(new M_LHZMJ_GameMessage.CMD_C_NextGame());
                    } else {
                        M_LHZMJClass.ins.SendUserReady();
                    }
                }
                else {
                    this.ShowMsgBox('余额不足请先充值！', "确定", () => {
                        //打开充值
                        LHZMJ.ins.iclass.exit();
                    }, this, "", null, null, () => {
                        //打开充值
                        LHZMJ.ins.iclass.exit();
                    }, this, );
                }

                break;
            }
            //玩家打出牌
            case LHZMJEvent.msg_outACard: {

                this._cardView.selfActive.activeEnable(false);

                break;
            }

            default: {
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

        if (LHZMJ.ins.iclass.getTableConfig().alreadyGameNum == 0) {
            this.gameClass.SendGameData(new M_LHZMJ_GameMessage.CMD_C_UserReady());
            this.gameClass.SendUserReady();

        }
        else {
            //this.DestroyTimer();
            this.gameClass.SendGameData(new M_LHZMJ_GameMessage.CMD_C_NextGame());
        }
    }
    /**
     * 显示游戏局数
     * */
    public showGameNum(totalNum: number, playNum: number, realNum: number): void {
       // this.group_gameNum.active = true;
        // if(!this.gameClass.isSelfCreateRoom){
        //     this.group_gameNum.active=false;
        //     return;
        // }
        // this.group_gameNum.active = totalNum > 0;
      //  const _lbl_totalGameNum = this.group_gameNum.getChildByName("_lbl_totalGameNum").getComponent<cc.RichText>(cc.RichText);
     //   _lbl_totalGameNum.string = "<color=#4ec6bc>共</c><color=#fdff3d>" + `${totalNum}` + "</color><color=#4ec6bc>局</c>";//<Array<cc.ITextElement>>[
        //     { text: `共`,style: { "textColor": 0x4ec6bc } },
        //     { text: `${totalNum}`,style: { "textColor": 0xfdff3d } },
        //     { text: `局`,style: { "textColor": 0x4ec6bc } }
        // ];
     //   const _lbl_gameNum = this.group_gameNum.getChildByName("_lbl_gameNum").getComponent<cc.RichText>(cc.RichText);
      //  _lbl_gameNum.string = "<color=#4ec6bc>剩</c><color=#fdff3d>" + `${totalNum - playNum}` + "</color><color=#4ec6bc>局</c>";
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
    public playLHZMJAni(chair: number, aniType: enLHZMJAniType): void {
        var logicChair: number = LHZMJ.ins.iclass.physical2logicChair(chair);

        if (cc.isValid(this._aniPanel)) {
            switch (aniType) {
                case enLHZMJAniType.aniType_peng: {
                    // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_peng_1280",logicChair);
                    this._aniPanel.PlayAnimation("AniPeng", logicChair);
                    //ani = new PengAni();
                    break;
                }
                case enLHZMJAniType.aniType_minggGang: {
                    // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_gang_1280",logicChair);
                    this._aniPanel.PlayAnimation("AniGang", logicChair);
                    break;
                }
                case enLHZMJAniType.aniType_anGang: {
                    // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_gang_1280",logicChair);
                    this._aniPanel.PlayAnimation("AniGang", logicChair);
                    break;
                }
                case enLHZMJAniType.aniType_huCard: {
                    // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_hu_1280",logicChair);
                    this._aniPanel.PlayAnimation("AniHu", logicChair);
                    break;
                }
                case enLHZMJAniType.aniType_ziMo: {
                    // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_zm_1280",logicChair);
                    this._aniPanel.PlayAnimation("AniZimo", logicChair);
                    break;
                }
                // case enLHZMJAniType.aniType_start:{
                //     this._aniPanel.PlayAnimation("AniStart",logicChair);
                // }
            }
        } else {
            cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_Ani", function (err, prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if (!cc.isValid(this._aniPanel)) {
                    let aninode: cc.Node = cc.instantiate(prefab);
                    this._aniPanel = aninode.getComponent<LHZMJ_Ani>(LHZMJ_Ani);
                    aninode.setLocalZOrder(20);
                    this.node.addChild(aninode);
                    this._aniPanel.init();
                    this.playLHZMJAni(chair, aniType);
                }else{
                    this.playLHZMJAni(chair, aniType);
                }
            }.bind(this));
        }




    }
    public ShowSetVolume(): void {
        this.gameClass.ShowSettingForm(true);
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
            var point = this._rg_userInfo.GetPlayerPoint(spschair);
            var point2 = this._rg_userInfo.GetPlayerPoint(rechair);
            if(point==null||point == undefined){
                cc.log("获取用户头像坐标失败");
                return;
            }
            if (point2 == null || point2 == undefined) {
                cc.log("获取用户头像坐标失败");
                return;
            }
            this.huDongDaoJu.showChatItem(idx,point,point2);
        }else{
           var path = cc.url.raw("resources/Sound/Item/guzhang.mp3");
           M_LHZMJClass.ins.PlaySound(path,AudioType.Effect,false);
            this._rg_userInfo.ShowGuZhang(spschair);
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
     * 物理按钮事件
     */
    public OnButtonExit() {
        if (!LHZMJ.ins.iclass.ifCanExitGame(LHZMJ.ins.iclass.getSelfChair())) {
            if (LHZMJ.ins.iclass.isCreateRoom()) {
                return;
            }
            else {

                    Global.Instance.GameHost.ExitGame();

            }
        } else {
            if (!LHZMJ.ins.iclass.isVideo() && LHZMJ.ins.iclass.isCreateRoom() && LHZMJ.ins.iclass.getTableConfig().alreadyGameNum==0
                && LHZMJ.ins.iclass.getSelfChair() == LHZMJ.ins.iclass.getTableConfig().tableCreatorChair && !LHZMJ.ins.iclass.getTableConfig().IsSaveTable) {

                        LHZMJ.ins.iclass.exit();
              
            }
            else {

                    LHZMJ.ins.iclass.exit();
     
            }
        }
    }

    /** gameinfo
     *  可能还有问题，holdACard不好修改
     */
    public GameInfoSetData(now: number, all: number, value: string, leftCardNum?: number): void {
        if (cc.isValid(this._gameInfo)) {
            this._gameInfo.init();
            this._gameInfo.SetGameNum(now, all);
            this._gameInfo.tableCode = value;
            if (leftCardNum != null) {
                this._gameInfo.leftCardNum = leftCardNum;
            }
        } else {
            cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_GameInfo", function (err, prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if (!cc.isValid(this._gameInfo)) {
                    let ginode: cc.Node = cc.instantiate(prefab);
                    this._gameInfo = ginode.getComponent<LHZMJ_GameInfo>(LHZMJ_GameInfo);
                    ginode.setLocalZOrder(1);
                    this.node.addChild(ginode);
                    this._gameInfo.init();
                    this._gameInfo.SetGameNum(now, all);
                    this._gameInfo.tableCode = value;
                    if (leftCardNum != null) {
                        this._gameInfo.leftCardNum = leftCardNum;
                    }
                }else{
                    this._gameInfo.init();
                    this._gameInfo.SetGameNum(now, all);
                    this._gameInfo.tableCode = value;
                    if (leftCardNum != null) {
                        this._gameInfo.leftCardNum = leftCardNum;
                    }
                }
            }.bind(this));
        }
    }
    // /**
    //  * 出牌动画
    //  * @param chair 
    //  * @param card 
    //  * @param x 
    //  * @param y 
    //  */
    // public OutCardViewShowCard(chair: number, card: number, x: number, y: number): void {
    //     if (cc.isValid(this._outCardView)) {
    //         this._outCardView.showCard(chair, card, x, y);
    //     } else {
    //         cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_OutCardView", function (err, prefab) {
    //             if (err) {
    //                 cc.error(err);
    //                 return;
    //             }
    //             if (!cc.isValid(this._outCardView)) {
    //                 let ocvnode: cc.Node = cc.instantiate(prefab);
    //                 this._outCardView = ocvnode.getComponent<LHZMJ_OutCardView>(LHZMJ_OutCardView);
    //                 ocvnode.setLocalZOrder(7);
    //                 this.group_mid.addChild(ocvnode);
    //                 this._outCardView.init();
    //                 this._outCardView.showCard(chair, card, x, y);
    //             }
    //         }.bind(this));
    //     }
    // }
    /**
     * 操作
     * @param ifCanPeng 
     * @param ifCanGang 
     * @param ifCanHu 
     * @param ifCanGiveup 
     */
    public OperatorViewShowOP(ifCanPeng: boolean, ifCanGang: number, ifCanHu: boolean, ifCanTing:boolean,ifCanGiveup: boolean,istoupiao:boolean): void {
        if (cc.isValid(this._operatorView)) {
            this._operatorView.showOP(ifCanPeng, ifCanGang, ifCanHu, ifCanTing,ifCanGiveup,istoupiao);
        } else {
            cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_OperatorView", function (err, prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if (!cc.isValid(this._operatorView)) {
                    let opnode: cc.Node = cc.instantiate(prefab);
                    this._operatorView = opnode.getComponent<LHZMJ_OperatorView>(LHZMJ_OperatorView);
                    opnode.setLocalZOrder(9);
                    // M_LHZMJView._needDestroyNode.push(opnode);
                    this.node.addChild(opnode);
                    this._operatorView.init();
                    this._operatorView.showOP(ifCanPeng, ifCanGang, ifCanHu, ifCanTing,ifCanGiveup,istoupiao);
                }else{
                    this._operatorView.showOP(ifCanPeng, ifCanGang, ifCanHu, ifCanTing,ifCanGiveup,istoupiao);
                }
            }.bind(this));
        }
    }
    /**
     * 选择杠
     * @param gangCard 
     */
    public SelGangViewShowGang(gangCard: Array<number>): void {
        if (cc.isValid(this._selGang)) {
            this._selGang.showGang(gangCard);
        } else {
            cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_SelGang", function (err, prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if (!cc.isValid(this._selGang)) {
                    let selgnode: cc.Node = cc.instantiate(prefab);
                    this._selGang = selgnode.getComponent<LHZMJ_SelGang>(LHZMJ_SelGang);
                    selgnode.setLocalZOrder(10);
                    // M_LHZMJView._needDestroyNode.push(selgnode);
                    this.node.addChild(selgnode);
                    this._selGang.init();
                    this._selGang.showGang(gangCard);
                }else{
                    this._selGang.showGang(gangCard);
                }
            }.bind(this));
        }
    }
    /**
     * 罗盘
     */
        public ShowTimerView(chair:number): void {
        if (cc.isValid(this._timerView)) {
             this._timerView.showLuoPan(chair);
        } else {
            cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_Timer3D", function (err, prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if (!cc.isValid(this._timerView)) {
                    let timenode: cc.Node = cc.instantiate(prefab);
                    this._timerView = timenode.getComponent<LHZMJ_TimerView>(LHZMJ_TimerView);
                    timenode.setLocalZOrder(4);
                    this.group_mid.addChild(timenode);
                    this._timerView.init();
                    this._timerView.showLuoPan(chair);
                }else{
                    this._timerView.showLuoPan(chair);
                }
            }.bind(this));
        }

    }
    /**
     * 抢杠
     * @param cardValue 
     */
    public QiangGangViewShowQiangGang(cardValue: number): void {
        if (cc.isValid(this._qiangGang)) {
            this._qiangGang.showQiangGang(cardValue);
        } else {
            cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_QiangGangView", function (err, prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if (!cc.isValid(this._qiangGang)) {
                    let qianggnode: cc.Node = cc.instantiate(prefab);
                    this._qiangGang = qianggnode.getComponent<LHZMJ_QiangGangView>(LHZMJ_QiangGangView);
                    qianggnode.setLocalZOrder(11);
                    // M_LHZMJView._needDestroyNode.push(qianggnode);
                    this.node.addChild(qianggnode);
                    this._qiangGang.init();
                    this._qiangGang.showQiangGang(cardValue);
                }
            }.bind(this));
        }
    }

    /**
     * 显示跑
     */
    public PaoViewShow(): void {
        if (cc.isValid(this._pao)) {
            // this._pao.node.removeFromParent(false);
            // this.node.addChild(this._pao.node);
            this._pao.node.active = true;
        } else {
            cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_Pao", function (err, prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if (!cc.isValid(this._pao)) {
                    let paonode: cc.Node = cc.instantiate(prefab);
                    this._pao = paonode.getComponent<LHZMJ_Pao>(LHZMJ_Pao);
                    paonode.setLocalZOrder(13);
                    // M_LHZMJView._needDestroyNode.push(paonode);
                    
                    this._pao.init();
                    this.node.addChild(this._pao.node);
                    this._pao.node.active = true;
                }else{
                    this._pao.node.active = true;
                }
            }.bind(this));
        }
    }

    public LaViewShow(): void {
        if (cc.isValid(this._la)) {
            // this._la.node.removeFromParent(false);
            // this.node.addChild(this._la.node);
            this._la.node.active = true;
        } else {
            cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_La", function (err, prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if (!cc.isValid(this._la)) {
                    let lanode: cc.Node = cc.instantiate(prefab);
                    this._la = lanode.getComponent<LHZMJ_La>(LHZMJ_La);
                    lanode.setLocalZOrder(14);
                    // M_LHZMJView._needDestroyNode.push(lanode);
                    this._la.init();
                    this.node.addChild(this._la.node);
                    this._la.node.active = true;
                }else{
                    this._la.node.active = true;
                }
            }.bind(this));
        }
    }



    public StartAniPlay():void{

        if(cc.isValid(this._startAni)){
            this._startAni.play();
        }else{
            cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_StartAni", function (err, prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if (!cc.isValid(this._startAni)) {
                    let saninode: cc.Node = cc.instantiate(prefab);
                    this._startAni = saninode.getComponent<LHZMJ_StartAni>(LHZMJ_StartAni);
                    saninode.setLocalZOrder(21);
                    this.node.addChild(saninode);
                    this._startAni.init();
                    this._startAni.play();
                }else{
                    this._startAni.play();
                }
            }.bind(this));
        }
    }

    public StartCheckIP(msgStr:string[]):void{
        if(cc.isValid(this._checkip)){
            this._checkip.showCheatBox(msgStr);
        }else{
            cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_Cheating", function (err, prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if (!cc.isValid(this._checkip)) {
                    let ipnode: cc.Node = cc.instantiate(prefab);
                    this._checkip = ipnode.getComponent<LHZMJ_Cheating>(LHZMJ_Cheating);
                    ipnode.setLocalZOrder(25);
                    this.node.addChild(ipnode);
                    this._checkip.showCheatBox(msgStr);
                }else{
                    this._checkip.showCheatBox(msgStr);
                }
            }.bind(this));
        }
    }

    public SZPlay(sz1:number,sz2:number,msgcode:number):void{   
        if (cc.isValid(this._szAni)) {
            this._szAni.playSZ(sz1,sz2,msgcode);
        } else {
            cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_SZani", function (err, prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if (!cc.isValid(this._szAni)) {
                    let sznode: cc.Node = cc.instantiate(prefab);
                    this._szAni = sznode.getComponent<LHZMJ_SZAni>(LHZMJ_SZAni);
                    sznode.setLocalZOrder(5);
                    this.node.addChild(sznode);
                    this._szAni.init();
                    this._szAni.playSZ(sz1,sz2,msgcode);
                }else{
                    this._szAni.playSZ(sz1,sz2,msgcode);
                }
            }.bind(this));
        }
    }

    public ReFlashGameInfo():void{
        if(cc.isValid(this._readyStatus_gameInfo)){
            this._readyStatus_gameInfo.refresh();
        }else{
            cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_ReadyStatusGameInfo", function (err, prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if (!cc.isValid(this._readyStatus_gameInfo)) {
                    let rsgnode: cc.Node = cc.instantiate(prefab);
                    this._readyStatus_gameInfo = rsgnode.getComponent<LHZMJ_ReadyStatusGameInfo>(LHZMJ_ReadyStatusGameInfo);
                    rsgnode.setLocalZOrder(2);
                    this.group_mid.addChild(rsgnode);
                    this._readyStatus_gameInfo.init();
                    this._readyStatus_gameInfo.refresh();
                }else{
                    this._readyStatus_gameInfo.refresh();
                }
            }.bind(this));
            
        }
    }

    private showGameInfo():void{
        if(cc.isValid(this._readyStatus_gameInfo)){
            this._readyStatus_gameInfo.refresh();
            this._readyStatus_gameInfo.node.active=true;
        }else{
            cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_ReadyStatusGameInfo", function (err, prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if (!cc.isValid(this._readyStatus_gameInfo)) {
                    let rsgnode: cc.Node = cc.instantiate(prefab);
                    this._readyStatus_gameInfo = rsgnode.getComponent<LHZMJ_ReadyStatusGameInfo>(LHZMJ_ReadyStatusGameInfo);
                    rsgnode.setLocalZOrder(2);
                    this.group_mid.addChild(rsgnode);
                    this._readyStatus_gameInfo.init();
                    this._readyStatus_gameInfo.refresh();
                    this._readyStatus_gameInfo.node.active=true;
                }else{
                    this._readyStatus_gameInfo.refresh();
                    this._readyStatus_gameInfo.node.active=true;
                }
            }.bind(this));
        }
    }

    private hideGameInfo():void{
        if(cc.isValid(this._readyStatus_gameInfo)){
            this._readyStatus_gameInfo.node.active=false;
        }else{
            cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_ReadyStatusGameInfo", function (err, prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if (!cc.isValid(this._readyStatus_gameInfo)) {
                    let rsgnode: cc.Node = cc.instantiate(prefab);
                    this._readyStatus_gameInfo = rsgnode.getComponent<LHZMJ_ReadyStatusGameInfo>(LHZMJ_ReadyStatusGameInfo);
                    rsgnode.setLocalZOrder(2);
                    this.group_mid.addChild(rsgnode);
                    this._readyStatus_gameInfo.init();
                    this._readyStatus_gameInfo.node.active=false;
                }else{
                    this._readyStatus_gameInfo.node.active=false;
                }
            }.bind(this));
        }
    }

    public TipMsgShow(tip: string, autoHide: boolean = true, waitTimer: number = 4): void {
        if(cc.isValid(this._tipMsg)){
            this._tipMsg.showTip(tip, autoHide, waitTimer);
        }else{
            cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_TipMsg", function (err, prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if(!cc.isValid(this._tipMsg)){
                    let tipmsgnode: cc.Node = cc.instantiate(prefab);
                    this._tipMsg = tipmsgnode.getComponent<LHZMJ_TipMsg>(LHZMJ_TipMsg);
                    tipmsgnode.setLocalZOrder(19);
                    this.node.addChild(tipmsgnode);
                    this._tipMsg.showTip(tip, autoHide, waitTimer);
                }
                else{
                    this._tipMsg.showTip(tip, autoHide, waitTimer);
                }
            }.bind(this));
        }
    }

    public ShowMsgBox(msg: string,lbl1: string = "",fun1: () => void = null,obj1: any = null,lbl2: string = "",fun2: () => void = null,obj2: any = null,fun_close: () => void = null,obj_close: any = null):void{
        if(cc.isValid(this._msgBox)){
            this._msgBox.showMsgBox(msg, lbl1, fun1,obj1,lbl2,fun2,obj2,fun_close,obj_close);
        }else{
            cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_MsgBox", function (err, prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if(!cc.isValid(this._msgBox)){
                    let msgboxnode: cc.Node = cc.instantiate(prefab);
                    this._msgBox = msgboxnode.getComponent<LHZMJ_MsgBox>(LHZMJ_MsgBox);
                    msgboxnode.setLocalZOrder(26);
                    this._msgBox.Init();
                    this.node.addChild(msgboxnode);
                    this._msgBox.showMsgBox(msg, lbl1, fun1,obj1,lbl2,fun2,obj2,fun_close,obj_close);
                }
                else{
                    this._msgBox.showMsgBox(msg, lbl1, fun1,obj1,lbl2,fun2,obj2,fun_close,obj_close);
                }
            }.bind(this));
        }
        
    }



     public showMsg(){
        this.ShowMsgBox("您的操作过于频繁,请一分钟后再次操作")

    }

 

     public DissTableShow(funName: string, args:any, fun?: Function): void {
        if(cc.isValid(this._dissTable)){
            // this._dissTable.Init();
            if("playerVoteDissTable" == funName){
                if(cc.isValid(args[0]) && cc.isValid(args[1]))
                    this._dissTable.playerVoteDissTable(args[0], args[1]);
            }
            if("playerDissTable" == funName){
                this._dissTable.Init();
                if(cc.isValid(args[0]))
                    this._dissTable.playerDissTable(args[0], args[1],args[2]);
            }
        }else{
            cc.loader.loadRes("gameres/M_LHZMJ/Prefabs/skinView/LHZMJ_DissTable", function (err, prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if(!cc.isValid(this._dissTable)){
                    let dissablenode: cc.Node = cc.instantiate(prefab);
                    this._dissTable = dissablenode.getComponent<LHZMJ_DissTable>(LHZMJ_DissTable);
                    dissablenode.setLocalZOrder(23);
                    
                    this.node.addChild(dissablenode);
                    if ("playerVoteDissTable" == funName) {
                        if (cc.isValid(args[0]) && cc.isValid(args[1]))
                            this._dissTable.playerVoteDissTable(args[0], args[1]);
                    }
                    if ("playerDissTable" == funName) {
                        this._dissTable.Init();
                        if (cc.isValid(args[0]))
                            this._dissTable.playerDissTable(args[0], args[1], args[2]);
                    }
                }else{
                    // this._dissTable.Init();
                    if ("playerVoteDissTable" == funName) {
                        if (cc.isValid(args[0]) && cc.isValid(args[1]))
                            this._dissTable.playerVoteDissTable(args[0], args[1]);
                    }
                    if ("playerDissTable" == funName) {
                        this._dissTable.Init();
                        if (cc.isValid(args[0]))
                            this._dissTable.playerDissTable(args[0], args[1], args[2]);
                    }
                }
                
                

            }.bind(this));
        }
    }
}

