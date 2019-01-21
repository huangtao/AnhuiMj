import M_BBMJVideoClass from "./M_BBMJVideoClass";
import BBMJ_CardView from "./SkinView/BBMJ_CardView";
import BBMJ_GameInfo from "./SkinView/BBMJ_GameInfo";
import BBMJ_TimerView from "./SkinView/BBMJ_Timer";
import BBMJ_SZAni from "./SkinView/BBMJ_SZAni";
import BBMJ_GameStatusUserInfo from "./SkinView/BBMJ_GameStatusUserInfo";
import BBMJ_OperatorView from "./SkinView/BBMJ_OperatorView";
import BBMJ_SelGang from "./SkinView/BBMJ_SelGang";
import BBMJ_QiangGangView from "./SkinView/BBMJ_QiangGangView";
import BBMJ_TipMsg from "./SkinView/BBMJ_TipMsg";
import BBMJ_SettingView from "./SkinView/BBMJ_SettingView";
import BBMJ_Ani from "./SkinView/BBMJ_Ani";
import { BBMJ, enBBMJAniType, BBMJMahjongDef } from "./ConstDef/BBMJMahjongDef";
import BBMJEvent from "./BBMJEvent";
import BBMJ_VideoCtl from "./SkinView/BBMJ_VideoCtl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class M_BBMJVideoView extends cc.Component {

    private static _ins: M_BBMJVideoView;
    public static get ins(): M_BBMJVideoView { return this._ins; }
    public get gameClass(): M_BBMJVideoClass { return M_BBMJVideoClass.ins; }

    //局数显示
    @property(cc.Node)
    group_gameNum: cc.Node=null;
    @property(cc.Node)
    info_mid: cc.Node=null;

    @property(cc.Node)
    BBMJ_Card_View: cc.Node=null;
    //牌阵视图
    private _cardView: BBMJ_CardView;//me
    /**
     * 牌阵视图
     * */
    public get CardView(): BBMJ_CardView {
        return this._cardView;
    }

    @property(cc.Prefab)
    GameInfoView: cc.Prefab=null;

    //游戏信息
    private _gameInfo: BBMJ_GameInfo;//me
    /**
     * 游戏信息
     * */
    public get GameInfo(): BBMJ_GameInfo {
        return this._gameInfo;
    }
    
    @property(cc.Prefab)
    Time_View: cc.Prefab=null;
    //计时器
    private _timerView: BBMJ_TimerView;//me
    /**
     * 游戏计时器
     * */
    public get TimerView(): BBMJ_TimerView {
        return this._timerView;
    }


    @property(cc.Prefab)
    SZAni_View: cc.Prefab=null;
    //骰子动画
    private _szAni: BBMJ_SZAni;//me
    /**
     * 骰子动画
     * */
    public get SZAni(): BBMJ_SZAni {
        return this._szAni;
    }

    @property(cc.Prefab)
    GameStatus_userInfo_View: cc.Prefab=null;
    //游戏状态玩家信息
    private _gameStatus_userInfo: BBMJ_GameStatusUserInfo;//me
    /**
     * 游戏状态玩家信息
     * */
    public get GameStatusUserInfo(): BBMJ_GameStatusUserInfo {
        return this._gameStatus_userInfo;
    }

    @property(cc.Prefab)
    BBMJ_OP_View: cc.Prefab=null;
    //玩家操作
    private _operatorView: BBMJ_OperatorView;
    /**
     * 操作视图
     * */
    public get OperatorView(): BBMJ_OperatorView {
        return this._operatorView;
    }

    @property(cc.Prefab)
    BBMJ_SelGang_View: cc.Prefab=null;
    //选择杠
    private _selGang: BBMJ_SelGang;
    /**
     * 选择杠视图
     * */
    public get SelGangView(): BBMJ_SelGang {
        return this._selGang;
    }

    
    // @property(cc.Prefab)
    // BBMJ_QiangGang_View: cc.Prefab;
    // //抢杠
    // private _qiangGang: BBMJ_QiangGangView;
    // /**
    //  * 抢杠视图
    //  * */
    // public get QiangGangView(): BBMJ_QiangGangView {
    //     return this._qiangGang;
    // }

    @property(cc.Prefab)
    BBMJ_TipMsg_View:cc.Prefab=null;
    private _tipMsg:BBMJ_TipMsg;
    /**
     * Tip视图
     */
    public get TipMsgView():BBMJ_TipMsg{
        return this._tipMsg;
    }

    @property(cc.Prefab)
    BBMJ_Setting_View:cc.Prefab=null;
    private _setting: BBMJ_SettingView;

    @property(cc.Prefab)
    BBMJ_Ani_View:cc.Prefab=null;
    //动画面板
    private _aniPanel:BBMJ_Ani;

    public get Ani_Op():BBMJ_Ani{
        return this._aniPanel;
    }
    @property(cc.Prefab)
    BBMJ_VideoCtl_View:cc.Prefab=null;
    //录像控制条
    private _videoCtl: BBMJ_VideoCtl;
    /**
     * 录像控制条
     * */
    public get VideoCtl():BBMJ_VideoCtl{
            return this._videoCtl;
    }


    onLoad() {
        // init logic
        M_BBMJVideoView._ins = this;
        BBMJ.ins.iview = this;
            
        let ginode=cc.instantiate(this.GameInfoView);
        this._gameInfo=ginode.getComponent<BBMJ_GameInfo>(BBMJ_GameInfo);
        this.info_mid.addChild(ginode);

        let timenode=cc.instantiate(this.Time_View);
        this._timerView=timenode.getComponent<BBMJ_TimerView>(BBMJ_TimerView);
        this.node.addChild(timenode);

        let sznode=cc.instantiate(this.SZAni_View);
        this._szAni=sznode.getComponent<BBMJ_SZAni>(BBMJ_SZAni);
        this.node.addChild(sznode);

        this._cardView=this.BBMJ_Card_View.getComponent<BBMJ_CardView>(BBMJ_CardView);

        let gsunode=cc.instantiate(this.GameStatus_userInfo_View);
        this._gameStatus_userInfo=gsunode.getComponent<BBMJ_GameStatusUserInfo>(BBMJ_GameStatusUserInfo);
        this.node.addChild(gsunode);

        let opnode=cc.instantiate(this.BBMJ_OP_View);
        this._operatorView=opnode.getComponent<BBMJ_OperatorView>(BBMJ_OperatorView);
        this.node.addChild(opnode);

        let selgnode=cc.instantiate(this.BBMJ_SelGang_View);
        this._selGang=selgnode.getComponent<BBMJ_SelGang>(BBMJ_SelGang);
        this.node.addChild(selgnode);

        // let qianggnode=cc.instantiate(this.BBMJ_QiangGang_View);
        // this._qiangGang=qianggnode.getComponent<BBMJ_QiangGangView>(BBMJ_QiangGangView);
        // this.node.addChild(qianggnode);

        let tipnode=cc.instantiate(this.BBMJ_TipMsg_View);
        this._tipMsg=tipnode.getComponent<BBMJ_TipMsg>(BBMJ_TipMsg);
        this.node.addChild(tipnode);

        let aninode=cc.instantiate(this.BBMJ_Ani_View);
        this._aniPanel=aninode.getComponent<BBMJ_Ani>(BBMJ_Ani);
        this.node.addChild(aninode);


        let vcnode=cc.instantiate(this.BBMJ_VideoCtl_View);
        this._videoCtl=vcnode.getComponent<BBMJ_VideoCtl>(BBMJ_VideoCtl);
        this.node.addChild(vcnode);

        let setnode=cc.instantiate(this.BBMJ_Setting_View);
        this._setting=setnode.getComponent<BBMJ_SettingView>(BBMJ_SettingView);
        this.node.addChild(setnode);

        this.node.on(BBMJEvent.BBMJ_EVENT_TYPE,this.onGameEvent,this);
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
        this._gameStatus_userInfo.tableOwener = BBMJ.ins.iclass.getTableConfig().tableCreatorChair;
        this._timerView.timerNum = 0;
      //  this._timerView.showArrow = BBMJMahjongDef.gInvalidChar;
        this._timerView.node.active=false;
        this._cardView.node.active = true;
    }

    public StartSendCard():void{
        
            for(let i=0;i<BBMJMahjongDef.gPlayerNum;i++){
                this.CardView.holdTricksCard(i,13);
            }
            for(var i:number=0; i<BBMJMahjongDef.gPlayerNum; i++){
                    this._cardView.getActive(i).arrangeHandCard();
                }
              this._gameInfo.holdCardOver();
            this._videoCtl.start();


 


        
       // this._szAni.playSZ(M_BBMJVideoClass.ins.SZ1,M_BBMJVideoClass.ins.SZ2,BBMJEvent.msg_holdCardSZComplete);
    }

    public TableCreatorInfo(chair:number):void{
        this._gameStatus_userInfo.tableOwener = chair;
    }

    /**
     * 分享按钮事件
     */
    public OnButtonShare() {
        //this.gameClass.ShowShare(0, this.gameClass.TableID, this.gameClass.WebConfigName + "淮北麻将分享",BBMJ.ins.iclass.getTableConfig().shareContext);
    }

    /**
     * 事件监听
     * */
    private onGameEvent(e: BBMJEvent): void {
        switch(e.msgCode) {

            //抓牌骰子动画播放完毕
            case BBMJEvent.msg_holdCardSZComplete: {
                for(let i=0;i<BBMJMahjongDef.gPlayerNum;i++){
                    this.CardView.holdTricksCard(i,13);
                }
                //
                for(var i:number=0; i<BBMJMahjongDef.gPlayerNum; i++){
                    this._cardView.getActive(i).arrangeHandCard();
                }
              //   this._cardView.selfActive.refreshHandCardData(M_BBMJVideoClass.ins.getSelfHandCardData());
                this._szAni.node.active = false;
                this._gameInfo.holdCardOver();
                this._videoCtl.start();
                e.stopPropagation();
                //this._sendCardEngine.start(M_BBMJVideoClass.ins.BankerChair);
                break;
            }
            //继续游戏
            case BBMJEvent.msg_goongame: {
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
    public playBBMJAni(chair: number,aniType: enBBMJAniType): void {
        var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chair);
        

        switch(aniType) {
      
            case enBBMJAniType.aniType_peng: {
                // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_peng_1280",logicChair);
                this._aniPanel.PlayAnimation("AniPeng",logicChair);
                //ani = new PengAni();
                break;
            }
            case enBBMJAniType.aniType_minggGang: {
                // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_gang_1280",logicChair);
                this._aniPanel.PlayAnimation("AniGang",logicChair);
                break;
            }
            case enBBMJAniType.aniType_anGang: {
                // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_gang_1280",logicChair);
                this._aniPanel.PlayAnimation("AniGang",logicChair);
                break;
            }
            case enBBMJAniType.aniType_huCard: {
                // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_hu_1280",logicChair);
                this._aniPanel.PlayAnimation("AniHu",logicChair);
                break;
            }
            case enBBMJAniType.aniType_ziMo: {
                // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_zm_1280",logicChair);
                this._aniPanel.PlayAnimation("AniZimo",logicChair);
                break;
            }
        }

        
        
    }

    public showMsg(){
        
    }
}
