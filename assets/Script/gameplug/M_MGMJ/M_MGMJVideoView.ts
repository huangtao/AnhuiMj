import M_MGMJVideoClass from "./M_MGMJVideoClass";
import MGMJ_CardView from "./SkinView/MGMJ_CardView";
import MGMJ_GameInfo from "./SkinView/MGMJ_GameInfo";
import MGMJ_TimerView from "./SkinView/MGMJ_Timer";
import MGMJ_SZAni from "./SkinView/MGMJ_SZAni";
import MGMJ_GameStatusUserInfo from "./SkinView/MGMJ_GameStatusUserInfo";
import MGMJ_OperatorView from "./SkinView/MGMJ_OperatorView";
import MGMJ_SelGang from "./SkinView/MGMJ_SelGang";
import MGMJ_QiangGangView from "./SkinView/MGMJ_QiangGangView";
import MGMJ_TipMsg from "./SkinView/MGMJ_TipMsg";
import MGMJ_SettingView from "./SkinView/MGMJ_SettingView";
import MGMJ_Ani from "./SkinView/MGMJ_Ani";
import { MGMJ, enMGMJAniType, MGMJMahjongDef } from "./ConstDef/MGMJMahjongDef";
import MGMJEvent from "./MGMJEvent";
import MGMJ_VideoCtl from "./SkinView/MGMJ_VideoCtl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class M_MGMJVideoView extends cc.Component {

    private static _ins: M_MGMJVideoView;
    public static get ins(): M_MGMJVideoView { return this._ins; }
    public get gameClass(): M_MGMJVideoClass { return M_MGMJVideoClass.ins; }

    //局数显示
    @property(cc.Node)
    group_gameNum: cc.Node=null;

    @property(cc.Node)
    MGMJ_Card_View: cc.Node=null;
    //牌阵视图
    private _cardView: MGMJ_CardView;//me
    /**
     * 牌阵视图
     * */
    public get CardView(): MGMJ_CardView {
        return this._cardView;
    }

    @property(cc.Prefab)
    GameInfoView: cc.Prefab=null;

    //游戏信息
    private _gameInfo: MGMJ_GameInfo;//me
    /**
     * 游戏信息
     * */
    public get GameInfo(): MGMJ_GameInfo {
        return this._gameInfo;
    }
    
    @property(cc.Prefab)
    Time_View: cc.Prefab=null;
    //计时器
    private _timerView: MGMJ_TimerView;//me
    /**
     * 游戏计时器
     * */
    public get TimerView(): MGMJ_TimerView {
        return this._timerView;
    }


    @property(cc.Prefab)
    SZAni_View: cc.Prefab=null;
    //骰子动画
    private _szAni: MGMJ_SZAni;//me
    /**
     * 骰子动画
     * */
    public get SZAni(): MGMJ_SZAni {
        return this._szAni;
    }

    @property(cc.Prefab)
    GameStatus_userInfo_View: cc.Prefab=null;
    //游戏状态玩家信息
    private _gameStatus_userInfo: MGMJ_GameStatusUserInfo;//me
    /**
     * 游戏状态玩家信息
     * */
    public get GameStatusUserInfo(): MGMJ_GameStatusUserInfo {
        return this._gameStatus_userInfo;
    }

    // @property(cc.Prefab)
    // MGMJ_OP_View: cc.Prefab;
    // //玩家操作
    // private _operatorView: MGMJ_OperatorView;
    // /**
    //  * 操作视图
    //  * */
    // public get OperatorView(): MGMJ_OperatorView {
    //     return this._operatorView;
    // }

    // @property(cc.Prefab)
    // MGMJ_SelGang_View: cc.Prefab;
    // //选择杠
    // private _selGang: MGMJ_SelGang;
    // /**
    //  * 选择杠视图
    //  * */
    // public get SelGangView(): MGMJ_SelGang {
    //     return this._selGang;
    // }

    
    // @property(cc.Prefab)
    // MGMJ_QiangGang_View: cc.Prefab;
    // //抢杠
    // private _qiangGang: MGMJ_QiangGangView;
    // /**
    //  * 抢杠视图
    //  * */
    // public get QiangGangView(): MGMJ_QiangGangView {
    //     return this._qiangGang;
    // }

    @property(cc.Prefab)
    MGMJ_TipMsg_View:cc.Prefab=null;
    private _tipMsg:MGMJ_TipMsg;
    /**
     * Tip视图
     */
    public get TipMsgView():MGMJ_TipMsg{
        return this._tipMsg;
    }

    @property(cc.Prefab)
    MGMJ_Setting_View:cc.Prefab=null;
    private _setting: MGMJ_SettingView;

    @property(cc.Prefab)
    MGMJ_Ani_View:cc.Prefab=null;
    //动画面板
    private _aniPanel:MGMJ_Ani;

    @property(cc.Prefab)
    MGMJ_VideoCtl_View:cc.Prefab=null;
    //录像控制条
    private _videoCtl: MGMJ_VideoCtl;
    /**
     * 录像控制条
     * */
    public get VideoCtl():MGMJ_VideoCtl{
            return this._videoCtl;
    }


    onLoad() {
        // init logic
        M_MGMJVideoView._ins = this;
        MGMJ.ins.iview = this;
            
        let ginode=cc.instantiate(this.GameInfoView);
        this._gameInfo=ginode.getComponent<MGMJ_GameInfo>(MGMJ_GameInfo);
        this.node.addChild(ginode);

        let timenode=cc.instantiate(this.Time_View);
        this._timerView=timenode.getComponent<MGMJ_TimerView>(MGMJ_TimerView);
        this.node.addChild(timenode);

        let sznode=cc.instantiate(this.SZAni_View);
        this._szAni=sznode.getComponent<MGMJ_SZAni>(MGMJ_SZAni);
        this.node.addChild(sznode);

        this._cardView=this.MGMJ_Card_View.getComponent<MGMJ_CardView>(MGMJ_CardView);

        let gsunode=cc.instantiate(this.GameStatus_userInfo_View);
        this._gameStatus_userInfo=gsunode.getComponent<MGMJ_GameStatusUserInfo>(MGMJ_GameStatusUserInfo);
        this.node.addChild(gsunode);

        // let opnode=cc.instantiate(this.MGMJ_OP_View);
        // this._operatorView=opnode.getComponent<MGMJ_OperatorView>(MGMJ_OperatorView);
        // this.node.addChild(opnode);

        // let selgnode=cc.instantiate(this.MGMJ_SelGang_View);
        // this._selGang=selgnode.getComponent<MGMJ_SelGang>(MGMJ_SelGang);
        // this.node.addChild(selgnode);

        // let qianggnode=cc.instantiate(this.MGMJ_QiangGang_View);
        // this._qiangGang=qianggnode.getComponent<MGMJ_QiangGangView>(MGMJ_QiangGangView);
        // this.node.addChild(qianggnode);

        let tipnode=cc.instantiate(this.MGMJ_TipMsg_View);
        this._tipMsg=tipnode.getComponent<MGMJ_TipMsg>(MGMJ_TipMsg);
        this.node.addChild(tipnode);

        let aninode=cc.instantiate(this.MGMJ_Ani_View);
        this._aniPanel=aninode.getComponent<MGMJ_Ani>(MGMJ_Ani);
        this.node.addChild(aninode);


        let vcnode=cc.instantiate(this.MGMJ_VideoCtl_View);
        this._videoCtl=vcnode.getComponent<MGMJ_VideoCtl>(MGMJ_VideoCtl);
        this.node.addChild(vcnode);

        let setnode=cc.instantiate(this.MGMJ_Setting_View);
        this._setting=setnode.getComponent<MGMJ_SettingView>(MGMJ_SettingView);
        this.node.addChild(setnode);

        this.node.on(MGMJEvent.MGMJ_EVENT_TYPE,this.onGameEvent,this);
    }

    public Init():void{
        this.GameInfo.init();
        this.TimerView.init();
        this.SZAni.init();
        this.GameStatusUserInfo.init();
        this.CardView.init();
        this._aniPanel.init();
        this.VideoCtl.init();
        // this.OperatorView.init();
        // this.SelGangView.init();
        // this.QiangGangView.init();
        this._setting.init();
        this.TipMsgView.Init()
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
        // this._selGang.node.active = false;
        // this._operatorView.node.active = false;
        // this._qiangGang.node.active = false;

    }


    public playerComeing():void{
        this.clear();
        this.group_gameNum.active=false;
    }
    
    public GameStart():void{

        this._gameInfo.init();
        this._szAni.Clear();

        this._gameStatus_userInfo.node.active = true;
        this._gameStatus_userInfo.reflashPlayer();
        
        this._gameStatus_userInfo.HideLaPao();
        this._gameStatus_userInfo.tableOwener = MGMJ.ins.iclass.getTableConfig().tableCreatorChair;
        this._timerView.timerNum = 0;
        this._timerView.showArrow = MGMJMahjongDef.gInvalidChar;
        this._timerView.node.active=false;
        this._cardView.node.active = true;
    }

    public StartSendCard():void{
        this._szAni.playSZ(M_MGMJVideoClass.ins.SZ1,M_MGMJVideoClass.ins.SZ2,MGMJEvent.msg_holdCardSZComplete);
    }

    public TableCreatorInfo(chair:number):void{
        this._gameStatus_userInfo.tableOwener = chair;
    }

    /**
     * 分享按钮事件
     */
    public OnButtonShare() {
        //this.gameClass.ShowShare(0, this.gameClass.TableID, this.gameClass.WebConfigName + "淮北麻将分享",MGMJ.ins.iclass.getTableConfig().shareContext);
    }

    /**
     * 事件监听
     * */
    private onGameEvent(e: MGMJEvent): void {
        switch(e.msgCode) {

            //抓牌骰子动画播放完毕
            case MGMJEvent.msg_holdCardSZComplete: {
                for(let i=0;i<MGMJMahjongDef.gPlayerNum;i++){
                    this.CardView.holdTricksCard(i,13);
                }
                //
                for(var i:number=0; i<MGMJMahjongDef.gPlayerNum; i++){
                    this._cardView.getActive(i).arrangeHandCard();
                }
                this._szAni.node.active = false;
                this._gameInfo.holdCardOver();
                this._videoCtl.start();
                e.stopPropagation();
                //this._sendCardEngine.start(M_MGMJVideoClass.ins.BankerChair);
                break;
            }
            //继续游戏
            case MGMJEvent.msg_goongame: {
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
     * 显示游戏局数
     * */
    public showGameNum(totalNum:number,playNum:number,realNum:number):void{
        if(!this.gameClass.isSelfCreateRoom){
            this.group_gameNum.active=false;
            return;
        }
    //    this.group_gameNum.active = totalNum > 0;
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
    public playMGMJAni(chair: number,aniType: enMGMJAniType): void {
        var logicChair: number = MGMJ.ins.iclass.physical2logicChair(chair);
        

        switch(aniType) {
      
            case enMGMJAniType.aniType_peng: {
                // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_peng_1280",logicChair);
                this._aniPanel.PlayAnimation("AniPeng",logicChair);
                //ani = new PengAni();
                break;
            }
            case enMGMJAniType.aniType_minggGang: {
                // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_gang_1280",logicChair);
                this._aniPanel.PlayAnimation("AniGang",logicChair);
                break;
            }
            case enMGMJAniType.aniType_anGang: {
                // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_gang_1280",logicChair);
                this._aniPanel.PlayAnimation("AniGang",logicChair);
                break;
            }
            case enMGMJAniType.aniType_huCard: {
                // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_hu_1280",logicChair);
                this._aniPanel.PlayAnimation("AniHu",logicChair);
                break;
            }
            case enMGMJAniType.aniType_ziMo: {
                // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_zm_1280",logicChair);
                this._aniPanel.PlayAnimation("AniZimo",logicChair);
                break;
            }
        }

        
        
    }

    public showMsg(){
        
    }
}
