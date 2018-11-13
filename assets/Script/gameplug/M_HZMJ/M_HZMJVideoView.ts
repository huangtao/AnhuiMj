import M_HZMJVideoClass from "./M_HZMJVideoClass";
import HZMJ_CardView from "./SkinView/HZMJ_CardView";
import HZMJ_GameInfo from "./SkinView/HZMJ_GameInfo";
import HZMJ_TimerView from "./SkinView/HZMJ_Timer";
import HZMJ_SZAni from "./SkinView/HZMJ_SZAni";
import HZMJ_GameStatusUserInfo from "./SkinView/HZMJ_GameStatusUserInfo";
import HZMJ_OperatorView from "./SkinView/HZMJ_OperatorView";
import HZMJ_SelGang from "./SkinView/HZMJ_SelGang";
import HZMJ_QiangGangView from "./SkinView/HZMJ_QiangGangView";
import HZMJ_TipMsg from "./SkinView/HZMJ_TipMsg";
import HZMJ_SettingView from "./SkinView/HZMJ_SettingView";
import HZMJ_Ani from "./SkinView/HZMJ_Ani";
import { HZMJ, enHZMJAniType, HZMJMahjongDef } from "./ConstDef/HZMJMahjongDef";
import HZMJEvent from "./HZMJEvent";
import HZMJ_VideoCtl from "./SkinView/HZMJ_VideoCtl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class M_HZMJVideoView extends cc.Component {

    private static _ins: M_HZMJVideoView;
    public static get ins(): M_HZMJVideoView { return this._ins; }
    public get gameClass(): M_HZMJVideoClass { return M_HZMJVideoClass.ins; }

    //局数显示
    @property(cc.Node)
    group_gameNum: cc.Node=null;

    @property(cc.Node)
    HZMJ_Card_View: cc.Node=null;
    //牌阵视图
    private _cardView: HZMJ_CardView;//me
    /**
     * 牌阵视图
     * */
    public get CardView(): HZMJ_CardView {
        return this._cardView;
    }

    @property(cc.Prefab)
    GameInfoView: cc.Prefab=null;

    //游戏信息
    private _gameInfo: HZMJ_GameInfo;//me
    /**
     * 游戏信息
     * */
    public get GameInfo(): HZMJ_GameInfo {
        return this._gameInfo;
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

    // @property(cc.Prefab)
    // HZMJ_OP_View: cc.Prefab;
    // //玩家操作
    // private _operatorView: HZMJ_OperatorView;
    // /**
    //  * 操作视图
    //  * */
    // public get OperatorView(): HZMJ_OperatorView {
    //     return this._operatorView;
    // }

    // @property(cc.Prefab)
    // HZMJ_SelGang_View: cc.Prefab;
    // //选择杠
    // private _selGang: HZMJ_SelGang;
    // /**
    //  * 选择杠视图
    //  * */
    // public get SelGangView(): HZMJ_SelGang {
    //     return this._selGang;
    // }

    
    // @property(cc.Prefab)
    // HZMJ_QiangGang_View: cc.Prefab;
    // //抢杠
    // private _qiangGang: HZMJ_QiangGangView;
    // /**
    //  * 抢杠视图
    //  * */
    // public get QiangGangView(): HZMJ_QiangGangView {
    //     return this._qiangGang;
    // }

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
    HZMJ_Setting_View:cc.Prefab=null;
    private _setting: HZMJ_SettingView;

    @property(cc.Prefab)
    HZMJ_Ani_View:cc.Prefab=null;
    //动画面板
    private _aniPanel:HZMJ_Ani;

    @property(cc.Prefab)
    HZMJ_VideoCtl_View:cc.Prefab=null;
    //录像控制条
    private _videoCtl: HZMJ_VideoCtl;
    /**
     * 录像控制条
     * */
    public get VideoCtl():HZMJ_VideoCtl{
            return this._videoCtl;
    }


    onLoad() {
        // init logic
        M_HZMJVideoView._ins = this;
        HZMJ.ins.iview = this;
            
        let ginode=cc.instantiate(this.GameInfoView);
        this._gameInfo=ginode.getComponent<HZMJ_GameInfo>(HZMJ_GameInfo);
        this.node.addChild(ginode);

        let timenode=cc.instantiate(this.Time_View);
        this._timerView=timenode.getComponent<HZMJ_TimerView>(HZMJ_TimerView);
        this.node.addChild(timenode);

        let sznode=cc.instantiate(this.SZAni_View);
        this._szAni=sznode.getComponent<HZMJ_SZAni>(HZMJ_SZAni);
        this.node.addChild(sznode);

        this._cardView=this.HZMJ_Card_View.getComponent<HZMJ_CardView>(HZMJ_CardView);

        let gsunode=cc.instantiate(this.GameStatus_userInfo_View);
        this._gameStatus_userInfo=gsunode.getComponent<HZMJ_GameStatusUserInfo>(HZMJ_GameStatusUserInfo);
        this.node.addChild(gsunode);

        // let opnode=cc.instantiate(this.HZMJ_OP_View);
        // this._operatorView=opnode.getComponent<HZMJ_OperatorView>(HZMJ_OperatorView);
        // this.node.addChild(opnode);

        // let selgnode=cc.instantiate(this.HZMJ_SelGang_View);
        // this._selGang=selgnode.getComponent<HZMJ_SelGang>(HZMJ_SelGang);
        // this.node.addChild(selgnode);

        // let qianggnode=cc.instantiate(this.HZMJ_QiangGang_View);
        // this._qiangGang=qianggnode.getComponent<HZMJ_QiangGangView>(HZMJ_QiangGangView);
        // this.node.addChild(qianggnode);

        let tipnode=cc.instantiate(this.HZMJ_TipMsg_View);
        this._tipMsg=tipnode.getComponent<HZMJ_TipMsg>(HZMJ_TipMsg);
        this.node.addChild(tipnode);

        let aninode=cc.instantiate(this.HZMJ_Ani_View);
        this._aniPanel=aninode.getComponent<HZMJ_Ani>(HZMJ_Ani);
        this.node.addChild(aninode);


        let vcnode=cc.instantiate(this.HZMJ_VideoCtl_View);
        this._videoCtl=vcnode.getComponent<HZMJ_VideoCtl>(HZMJ_VideoCtl);
        this.node.addChild(vcnode);

        let setnode=cc.instantiate(this.HZMJ_Setting_View);
        this._setting=setnode.getComponent<HZMJ_SettingView>(HZMJ_SettingView);
        this.node.addChild(setnode);

        this.node.on(HZMJEvent.HZMJ_EVENT_TYPE,this.onGameEvent,this);
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
        this._gameStatus_userInfo.tableOwener = HZMJ.ins.iclass.getTableConfig().tableCreatorChair;
        this._timerView.timerNum = 0;
        this._timerView.showArrow = HZMJMahjongDef.gInvalidChar;
        this._timerView.node.active=false;
        this._cardView.node.active = true;
    }

    public StartSendCard():void{
        this._szAni.playSZ(M_HZMJVideoClass.ins.SZ1,M_HZMJVideoClass.ins.SZ2,HZMJEvent.msg_holdCardSZComplete);
    }

    public TableCreatorInfo(chair:number):void{
        this._gameStatus_userInfo.tableOwener = chair;
    }

    /**
     * 分享按钮事件
     */
    public OnButtonShare() {
        //this.gameClass.ShowShare(0, this.gameClass.TableID, this.gameClass.WebConfigName + "淮北麻将分享",HZMJ.ins.iclass.getTableConfig().shareContext);
    }

    /**
     * 事件监听
     * */
    private onGameEvent(e: HZMJEvent): void {
        switch(e.msgCode) {

            //抓牌骰子动画播放完毕
            case HZMJEvent.msg_holdCardSZComplete: {
                for(let i=0;i<HZMJMahjongDef.gPlayerNum;i++){
                    this.CardView.holdTricksCard(i,13);
                }
                //
                for(var i:number=0; i<HZMJMahjongDef.gPlayerNum; i++){
                    this._cardView.getActive(i).arrangeHandCard();
                }
                this._szAni.node.active = false;
                this._gameInfo.holdCardOver();
                this._videoCtl.start();
                e.stopPropagation();
                //this._sendCardEngine.start(M_HZMJVideoClass.ins.BankerChair);
                break;
            }
            //继续游戏
            case HZMJEvent.msg_goongame: {
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
                // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_gang_1280",logicChair);
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
                // this._aniPanel.PlayAni("gameres/gameCommonRes/Texture/Mahjong/MJ_OP_btn/mj_btn_zm_1280",logicChair);
                this._aniPanel.PlayAnimation("AniZimo",logicChair);
                break;
            }
        }

        
        
    }

    public showMsg(){
        
    }
}
