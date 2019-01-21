import M_LHZMJVideoClass from "./M_LHZMJVideoClass";
import LHZMJ_CardView from "./SkinView/LHZMJ_CardView";
import LHZMJ_GameInfo from "./SkinView/LHZMJ_GameInfo";
import LHZMJ_TimerView from "./SkinView/LHZMJ_Timer";
import LHZMJ_SZAni from "./SkinView/LHZMJ_SZAni";
import LHZMJ_GameStatusUserInfo from "./SkinView/LHZMJ_GameStatusUserInfo";
import LHZMJ_OperatorView from "./SkinView/LHZMJ_OperatorView";
import LHZMJ_SelGang from "./SkinView/LHZMJ_SelGang";
import LHZMJ_QiangGangView from "./SkinView/LHZMJ_QiangGangView";
import LHZMJ_TipMsg from "./SkinView/LHZMJ_TipMsg";
import LHZMJ_SettingView from "./SkinView/LHZMJ_SettingView";
import LHZMJ_Ani from "./SkinView/LHZMJ_Ani";
import { LHZMJ, enLHZMJAniType, LHZMJMahjongDef } from "./ConstDef/LHZMJMahjongDef";
import LHZMJEvent from "./LHZMJEvent";
import LHZMJ_VideoCtl from "./SkinView/LHZMJ_VideoCtl";
import MJ_Out from "../MJCommon/MJ_Out";


const { ccclass, property } = cc._decorator;

@ccclass
export default class M_LHZMJVideoView extends cc.Component {

    private static _ins: M_LHZMJVideoView;
    public static get ins(): M_LHZMJVideoView { return this._ins; }
    public get gameClass(): M_LHZMJVideoClass { return M_LHZMJVideoClass.ins; }

    //局数显示
    @property(cc.Node)
    group_gameNum: cc.Node=null;
    @property(cc.Node)
    info_mid: cc.Node=null;

    @property(cc.Node)
    LHZMJ_Card_View: cc.Node=null;
    //牌阵视图
    private _cardView: LHZMJ_CardView;//me
    /**
     * 牌阵视图
     * */
    public get CardView(): LHZMJ_CardView {
        return this._cardView;
    }

    @property(cc.Prefab)
    GameInfoView: cc.Prefab=null;

    //游戏信息
    private _gameInfo: LHZMJ_GameInfo;//me
    /**
     * 游戏信息
     * */
    public get GameInfo(): LHZMJ_GameInfo {
        return this._gameInfo;
    }
    
    @property(cc.Prefab)
    Time_View: cc.Prefab=null;
    //计时器
    private _timerView: LHZMJ_TimerView;//me
    /**
     * 游戏计时器
     * */
    public get TimerView(): LHZMJ_TimerView {
        return this._timerView;
    }


    @property(cc.Prefab)
    SZAni_View: cc.Prefab=null;
    //骰子动画
    private _szAni: LHZMJ_SZAni;//me
    /**
     * 骰子动画
     * */
    public get SZAni(): LHZMJ_SZAni {
        return this._szAni;
    }

    @property(cc.Prefab)
    GameStatus_userInfo_View: cc.Prefab=null;
    //游戏状态玩家信息
    private _gameStatus_userInfo: LHZMJ_GameStatusUserInfo;//me
    /**
     * 游戏状态玩家信息
     * */
    public get GameStatusUserInfo(): LHZMJ_GameStatusUserInfo {
        return this._gameStatus_userInfo;
    }

    @property(cc.Prefab)
    LHZMJ_OP_View: cc.Prefab=null;
    //玩家操作
    private _operatorView: LHZMJ_OperatorView;
    /**
     * 操作视图
     * */
    public get OperatorView(): LHZMJ_OperatorView {
        return this._operatorView;
    }

    @property(cc.Prefab)
    LHZMJ_SelGang_View: cc.Prefab=null;
    //选择杠
    private _selGang: LHZMJ_SelGang;
    /**
     * 选择杠视图
     * */
    public get SelGangView(): LHZMJ_SelGang {
        return this._selGang;
    }

    @property(cc.Prefab)
    MJ_Out:cc.Prefab=null;

    private _mjOut:MJ_Out;

    public get mg_out():MJ_Out{
        return this._mjOut;
    }
    
    // @property(cc.Prefab)
    // LHZMJ_QiangGang_View: cc.Prefab;
    // //抢杠
    // private _qiangGang: LHZMJ_QiangGangView;
    // /**
    //  * 抢杠视图
    //  * */
    // public get QiangGangView(): LHZMJ_QiangGangView {
    //     return this._qiangGang;
    // }

    @property(cc.Prefab)
    LHZMJ_TipMsg_View:cc.Prefab=null;
    private _tipMsg:LHZMJ_TipMsg;
    /**
     * Tip视图
     */
    public get TipMsgView():LHZMJ_TipMsg{
        return this._tipMsg;
    }

    @property(cc.Prefab)
    LHZMJ_Setting_View:cc.Prefab=null;
    private _setting: LHZMJ_SettingView;

    @property(cc.Prefab)
    LHZMJ_Ani_View:cc.Prefab=null;
    //动画面板
    private _aniPanel:LHZMJ_Ani;

    public get Ani_Op():LHZMJ_Ani{
        return this._aniPanel;
    }
    @property(cc.Prefab)
    LHZMJ_VideoCtl_View:cc.Prefab=null;
    //录像控制条
    private _videoCtl: LHZMJ_VideoCtl;
    /**
     * 录像控制条
     * */
    public get VideoCtl():LHZMJ_VideoCtl{
            return this._videoCtl;
    }


    onLoad() {
        // init logic
        M_LHZMJVideoView._ins = this;
        LHZMJ.ins.iview = this;
            
        let ginode=cc.instantiate(this.GameInfoView);
        this._gameInfo=ginode.getComponent<LHZMJ_GameInfo>(LHZMJ_GameInfo);
        this.info_mid.addChild(ginode);

        let timenode=cc.instantiate(this.Time_View);
        this._timerView=timenode.getComponent<LHZMJ_TimerView>(LHZMJ_TimerView);
        this.node.addChild(timenode);

        let sznode=cc.instantiate(this.SZAni_View);
        this._szAni=sznode.getComponent<LHZMJ_SZAni>(LHZMJ_SZAni);
        this.node.addChild(sznode);

        this._cardView=this.LHZMJ_Card_View.getComponent<LHZMJ_CardView>(LHZMJ_CardView);

        let gsunode=cc.instantiate(this.GameStatus_userInfo_View);
        this._gameStatus_userInfo=gsunode.getComponent<LHZMJ_GameStatusUserInfo>(LHZMJ_GameStatusUserInfo);
        this.node.addChild(gsunode);

        let opnode=cc.instantiate(this.LHZMJ_OP_View);
        this._operatorView=opnode.getComponent<LHZMJ_OperatorView>(LHZMJ_OperatorView);
        this.node.addChild(opnode);

        let selgnode=cc.instantiate(this.LHZMJ_SelGang_View);
        this._selGang=selgnode.getComponent<LHZMJ_SelGang>(LHZMJ_SelGang);
        this.node.addChild(selgnode);

        // let qianggnode=cc.instantiate(this.LHZMJ_QiangGang_View);
        // this._qiangGang=qianggnode.getComponent<LHZMJ_QiangGangView>(LHZMJ_QiangGangView);
        // this.node.addChild(qianggnode);


        let mjoutNode=cc.instantiate(this.MJ_Out);
        this._mjOut=mjoutNode.getComponent<MJ_Out>(MJ_Out);
        this.node.addChild(mjoutNode);
        
        let tipnode=cc.instantiate(this.LHZMJ_TipMsg_View);
        this._tipMsg=tipnode.getComponent<LHZMJ_TipMsg>(LHZMJ_TipMsg);
        this.node.addChild(tipnode);

        let aninode=cc.instantiate(this.LHZMJ_Ani_View);
        this._aniPanel=aninode.getComponent<LHZMJ_Ani>(LHZMJ_Ani);
        this.node.addChild(aninode);


        let vcnode=cc.instantiate(this.LHZMJ_VideoCtl_View);
        this._videoCtl=vcnode.getComponent<LHZMJ_VideoCtl>(LHZMJ_VideoCtl);
        this.node.addChild(vcnode);

        let setnode=cc.instantiate(this.LHZMJ_Setting_View);
        this._setting=setnode.getComponent<LHZMJ_SettingView>(LHZMJ_SettingView);
        this.node.addChild(setnode);

        this.node.on(LHZMJEvent.LHZMJ_EVENT_TYPE,this.onGameEvent,this);
    }

    public Init():void{
        this.GameInfo.init();
        this.TimerView.init();
        this.SZAni.init();
        this.GameStatusUserInfo.init();
        this.CardView.init();
        this._aniPanel.init();
        this.VideoCtl.init();
        this.OperatorView.init();
        this.SelGangView.init();
        // this.QiangGangView.init();
        this._setting.node.active = false;
        this.TipMsgView.Init();
    }
    /**
     * 清理
     * */
    private clear(): void {

       // this._gameInfo.node.active = false;
        this._timerView.node.active = false;

        this._gameStatus_userInfo.node.active = false;
        this._gameStatus_userInfo.clear();

        this._cardView.node.active = false;
        this._cardView.clear();

        //this._outCardView.show = false;
        // this._img_changeCardTip.visible = false;
        // this._btn_confirmChange.visible = false;
        // this._dingQue.show = false;
        this._selGang.node.active = false;
        this._operatorView.node.active = false;
        // this._qiangGang.node.active = false;

    }


    public playerComeing():void{
        this.clear();
        this.group_gameNum.active=false;
    }
    
    public GameStart():void{

        this._gameInfo.init();
       // this._szAni.Clear();

        this._gameStatus_userInfo.node.active = true;
        this._gameStatus_userInfo.reflashPlayer();
        
        this._gameStatus_userInfo.HideLaPao();
        this._gameStatus_userInfo.tableOwener = LHZMJ.ins.iclass.getTableConfig().tableCreatorChair;
        this._timerView.timerNum = 0;
      //  this._timerView.showArrow = LHZMJMahjongDef.gInvalidChar;
        this._timerView.node.active=false;
        this._cardView.node.active = true;
    }

    public StartSendCard():void{
        
            for(let i=0;i<LHZMJMahjongDef.gPlayerNum;i++){
                this.CardView.holdTricksCard(i,13);
            }
            for(var i:number=0; i<LHZMJMahjongDef.gPlayerNum; i++){
                    this._cardView.getActive(i).arrangeHandCard();
                }
              this._gameInfo.holdCardOver();
            this._videoCtl.start();


 


        
       // this._szAni.playSZ(M_LHZMJVideoClass.ins.SZ1,M_LHZMJVideoClass.ins.SZ2,LHZMJEvent.msg_holdCardSZComplete);
    }

    public TableCreatorInfo(chair:number):void{
        this._gameStatus_userInfo.tableOwener = chair;
    }

    /**
     * 分享按钮事件
     */
    public OnButtonShare() {
        //this.gameClass.ShowShare(0, this.gameClass.TableID, this.gameClass.WebConfigName + "淮北麻将分享",LHZMJ.ins.iclass.getTableConfig().shareContext);
    }

    /**
     * 事件监听
     * */
    private onGameEvent(e: LHZMJEvent): void {
        switch(e.msgCode) {

            //抓牌骰子动画播放完毕
            case LHZMJEvent.msg_holdCardSZComplete: {
                for(let i=0;i<LHZMJMahjongDef.gPlayerNum;i++){
                    this.CardView.holdTricksCard(i,13);
                }
                //
                for(var i:number=0; i<LHZMJMahjongDef.gPlayerNum; i++){
                    this._cardView.getActive(i).arrangeHandCard();
                }
              //   this._cardView.selfActive.refreshHandCardData(M_LHZMJVideoClass.ins.getSelfHandCardData());
                this._szAni.node.active = false;
                this._gameInfo.holdCardOver();
                this._videoCtl.start();
                e.stopPropagation();
                //this._sendCardEngine.start(M_LHZMJVideoClass.ins.BankerChair);
                break;
            }
            //继续游戏
            case LHZMJEvent.msg_goongame: {
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
     * 罗盘
     */
        public ShowTimerView(chair:number): void {

             this._timerView.showLuoPan(chair);

    }

    /**
     * 显示游戏局数
     * */
    public showGameNum(totalNum:number,playNum:number,realNum:number):void{
        if(!this.gameClass.isSelfCreateRoom){
            this.group_gameNum.active=false;
            return;
        }
       // this.group_gameNum.active = totalNum > 0;
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
    public playLHZMJAni(chair: number,aniType: enLHZMJAniType): void {
        var logicChair: number = LHZMJ.ins.iclass.physical2logicChair(chair);
        

        switch(aniType) {
      
            case enLHZMJAniType.aniType_peng: {
                // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_peng_1280",logicChair);
                this._aniPanel.PlayAnimation("AniPeng",logicChair);
                //ani = new PengAni();
                break;
            }
            case enLHZMJAniType.aniType_minggGang: {
                // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_gang_1280",logicChair);
                this._aniPanel.PlayAnimation("AniGang",logicChair);
                break;
            }
            case enLHZMJAniType.aniType_anGang: {
                // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_gang_1280",logicChair);
                this._aniPanel.PlayAnimation("AniGang",logicChair);
                break;
            }
            case enLHZMJAniType.aniType_huCard: {
                // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_hu_1280",logicChair);
                this._aniPanel.PlayAnimation("AniHu",logicChair);
                break;
            }
            case enLHZMJAniType.aniType_ziMo: {
                // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_zm_1280",logicChair);
                this._aniPanel.PlayAnimation("AniZimo",logicChair);
                break;
            }
        }

        
        
    }

    public showMsg(){
        
    }
}
