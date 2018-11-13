import SkinPlayer from "./BJ_SkinPlayer";
import { PlayerCount, UserState, LastCardIndex, GameStage } from "../GameHelp/BJ_GameHelp";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { M_BiJi_GameMessage } from "../../../CommonSrc/M_BiJi_GameMessage";
import AniDealControl from "../AniView/BJ_AniDealControl";
import AniPlayerDealLast from "../AniView/BJ_AniPlayerDealLast";
import AniFlip from "../AniView/BJ_AniFlip";
import AniSelectMaster from "../AniView/BJ_AniSelectMaster";
import SkinAni from "../AniView/BJ_SkinAni";
import AniResult from "../AniView/BJ_AniResult";
import VoicePlayer from "../GameHelp/BJ_VoicePlayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinPlayerControl extends cc.Component {

    private static _instance: SkinPlayerControl;
    public static get Instance(): SkinPlayerControl { return this._instance; }

    @property(cc.Prefab)
    prefab_playerDown: cc.Prefab = null;
    @property(cc.Prefab)
    prefab_playerRight: cc.Prefab = null;
    @property(cc.Prefab)
    prefab_playerTop: cc.Prefab = null;
    @property(cc.Prefab)
    prefab_playerLeft: cc.Prefab = null;
    /**
     * 玩家视图
     */
    public skinPlayer: SkinPlayer[];
    /**
     * 开始动画
     */
    @property(cc.Prefab)
    prefab_aniGameStart: cc.Prefab = null;
    private skinAniGameStart: SkinAni;
    /**
     * 发牌动画控制器
     */
    private aniDealControl: AniDealControl;
    /**
     * 发最后一张牌
     */
    private aniPlayerDealLast: AniPlayerDealLast;
    /**
     * 选庄动画
     */
    private aniSelectMaster: AniSelectMaster;
    /**
     * 转牌动画
     */
    public aniFlip: AniFlip;
    /**
     * 结果动画
     */
    @property(cc.Prefab)
    prefab_aniResult: cc.Prefab = null;
    private aniResult: AniResult;

    onLoad() {
        SkinPlayerControl._instance = this;
        this.skinPlayer = new Array(PlayerCount);

        this.skinPlayer[1] = cc.instantiate(this.prefab_playerRight).getComponent<SkinPlayer>(SkinPlayer);
        this.node.addChild(this.skinPlayer[1].node);
        this.skinPlayer[2] = cc.instantiate(this.prefab_playerRight).getComponent<SkinPlayer>(SkinPlayer);
        this.node.addChild(this.skinPlayer[2].node);
        this.skinPlayer[3] = cc.instantiate(this.prefab_playerTop).getComponent<SkinPlayer>(SkinPlayer);
        this.node.addChild(this.skinPlayer[3].node);
        this.skinPlayer[4] = cc.instantiate(this.prefab_playerLeft).getComponent<SkinPlayer>(SkinPlayer);
        this.node.addChild(this.skinPlayer[4].node);
        // this.skinPlayer[5] = cc.instantiate(this.prefab_playerLeft).getComponent<SkinPlayer>(SkinPlayer);
        // this.node.addChild(this.skinPlayer[5].node);
        this.skinPlayer[0] = cc.instantiate(this.prefab_playerDown).getComponent<SkinPlayer>(SkinPlayer);
        this.node.addChild(this.skinPlayer[0].node);
        for (var i = 0; i < this.skinPlayer.length; i++) {
            this.skinPlayer[i].SetChair(i);
        }

        const prefab0 = cc.instantiate(this.prefab_aniGameStart);
        this.node.addChild(prefab0);
        this.skinAniGameStart = prefab0.addComponent<SkinAni>(SkinAni);
        var node0 = new cc.Node();
        this.aniDealControl = node0.addComponent<AniDealControl>(AniDealControl);
        this.node.addChild(node0);
        var node1 = new cc.Node();
        this.aniPlayerDealLast = node1.addComponent<AniPlayerDealLast>(AniPlayerDealLast);
        this.node.addChild(node1);
        var node2 = new cc.Node();
        this.aniFlip = node2.addComponent<AniFlip>(AniFlip);
        this.node.addChild(node2);
        var node3 = new cc.Node();
        this.aniSelectMaster = node3.addComponent<AniSelectMaster>(AniSelectMaster);
        this.node.addChild(node3);
        const prefab1 = cc.instantiate(this.prefab_aniResult);
        this.node.addChild(prefab1);
        this.aniResult = prefab1.getComponent<AniResult>(AniResult);

        console.log("OnLoad");
        console.log(this.skinPlayer);
    }

    //==================================== 常用 开始 =======================================
    public Init() {
        this.skinAniGameStart.Init();
        this.aniDealControl.Init();
        this.aniPlayerDealLast.Init();
        this.aniFlip.Init();
        this.aniSelectMaster.Init();
        this.aniResult.Init();
        for (var i = 0; i < this.skinPlayer.length; i++) {
            this.skinPlayer[i].Init();
        }
    }
    public SetPlayerTransForm(isCreateTable: boolean) {
        for (var i = 0; i < this.skinPlayer.length; i++) {
            this.skinPlayer[i].SetTransForm(isCreateTable);
        }
    }
    public Reset() {
        for (var i = 0; i < this.skinPlayer.length; i++) {
            this.skinPlayer[i].Reset();
        }
    }
    public SelfReadyClear() {
        for (var i = 0; i < this.skinPlayer.length; i++) {
            this.skinPlayer[i].SelfReadyClear();
        }
    }
    //==================================== 常用 结束 =======================================

    //==================================== 设置 开始 =======================================
    /**
     * 设置玩家信息
     */
    public SetUserInfo(chair: number, faceID: string, name: string, gender: number) {
        this.skinPlayer[chair].SetUserInfo(faceID, name, gender);
    }
    /**
     * 设置玩家余额
     */
    public SetUserMoney(chair: number, value: number) {
        this.skinPlayer[chair].SetUserMoney(value);
    }
    /**
     * 增加玩家余额
     */
    public AddUserMoney(chair: number, value: number) {
        this.skinPlayer[chair].AddUserMoney(value);
    }
    /**
     * 游戏开始的清理
     */
    public GameStartClear() {
        for (var i = 0; i < this.skinPlayer.length; i++) {
            this.skinPlayer[i].GameStartClear();
        }
    }
    /**
     * 设置玩家准备，此为游戏内自定义的准备
     */
    public SetUserReady(chair: number) {
        this.skinPlayer[chair].SetUserReady(false);
    }
    /**
     * 设置玩家状态
     */
    public SetUserState(chair: number, state: QL_Common.GState) {
        switch (state) {
            case QL_Common.GState.PlayerReady: {               
                this.skinPlayer[chair].SetUserReady();
                break;
            }
            case QL_Common.GState.OfflineInGame: {
                this.skinPlayer[chair].SetUserOffLine();
                break;
            }
            case QL_Common.GState.Gaming: {
                this.skinPlayer[chair].SetUserGaming();
                break;
            }
            case QL_Common.GState.OnLooking: {
                this.skinPlayer[chair].SetUserLook();
                break;
            }
            case QL_Common.GState.SitDown:
            case QL_Common.GState.Free: {
                this.skinPlayer[chair].SetUserSitDown();
                break;
            }
        }
    }

    public HideScoreListControl(){
        for(var i = 0;i<this.skinPlayer.length;i++){
            this.skinPlayer[i].skinCardsView.HideScoreList();
        }
    }



    /**
     * 设置玩家离开
     */
    public SetUserLeave(chair: number) {
        this.skinPlayer[chair].SetUserLeave();
    }
    /**
     * 设置玩家抢庄倍数
     */
    public SetUserRobRate(chair: number, value: number) {
      //  this.skinPlayer[chair].SetUserRobRate(value);
    }
    /**
     * 隐藏玩家抢庄倍数
     */
    public HideUserRobRate(chair: number) {
        this.skinPlayer[chair].HideUserRobRate();
    }
    /**
     * 设置庄家
     */
    public SetUserMaster(chair: number) {

    }
    /**
     * 设置玩家下注倍数
     */
    public SetUserBetRate(chair: number, value: number) {
        if (!this.IsChairSafe(chair)) return;
        this.skinPlayer[chair].SetUserBetRate(value);
        this.skinPlayer[chair].SetUserFrame(1);
    }
    /**
     * 隐藏玩家下注倍数
     */
    public HideUserBetRate(chair: number) {
        this.skinPlayer[chair].HideUserBetRate();
    }
    public HideDropCard(){
        for(var i = 0;i<PlayerCount;i++){
            if(this.skinPlayer[i].IsJoinGame){
                this.skinPlayer[i].HideDropCard();
            }
            
        }
    }
    /**
     * 设置玩家选牌完成
     */
    public SetUserSelectCards(chair: number) {
        if (!this.IsChairSafe(chair)) return;
        this.skinPlayer[chair].skinCardsView.SetOnSelectCardsPos(chair);
        this.skinPlayer[chair].HidePeiPai();
        
        // if (chair == 0) {
        //     this.skinPlayer[chair].skinCardsView.OnSelectCards();
        // }
    }
    /**
     * 自己选牌完成
     */
    public SetSelfSelectCards(cards: number[], cardType: number) {
        this.skinPlayer[0].skinCardsView.OnSelfSelectCards(cards, cardType, this.skinPlayer[0].userGender);
    }
    /**
     * 隐藏玩家选牌完成
     */
    public HideUserSelectCards(chair: number) {
        this.skinPlayer[chair].HideUserSelectCards();
    }
    /**
     * 隐藏所有玩家选牌完成
     */
    public HideAllUserSelectCards() {
        for (var i = 0; i < this.skinPlayer.length; i++) {
            if (this.skinPlayer[i].node.active) {
                this.HideUserSelectCards(i);
            }
        }
    }
    /**
     * 隐藏所有玩家的边框
     */
    public HideAllUserFrame(value:boolean=false) {
        for (var i = 0; i < this.skinPlayer.length; i++) {
            this.skinPlayer[i].HideUserFrame(value);
        }
    }
    /**
     * 设置房主
     */
    public SetTableCreator(chair: number) {
        for (var i = 0; i < this.skinPlayer.length; i++) {
            if (i == chair)
                this.skinPlayer[i].SetTableCreator(true);
            else
                this.skinPlayer[i].SetTableCreator(false);
        }
    }
    /**
     * 显示聊天表情
     */
    public ShowChatEmoji(chair: number, value: cc.AnimationClip) {
        if (this.skinPlayer[chair].node.active)
            this.skinPlayer[chair].ShowChatEmoji(value);
    }
        /**
     * 显示鼓掌动画
     */
    public ShowGuZhang(chair: number) {
        if (this.skinPlayer[chair].node.active)
            this.skinPlayer[chair].ShowGuZhang();
    }
    /**
     * 设置玩家牌
     */
    public SetCards(chair: number, value: number[]) {
        if (this.skinPlayer[chair].userState != UserState.None && this.skinPlayer[chair].userState != UserState.Look) {
            this.skinPlayer[chair].skinCardsView.SetCards(value);
        }
    }
    /**
     * 设置玩家最后一张牌
     */
    public SetLastCardValue(value: number) {
        for (var i = 0; i < this.skinPlayer.length; i++) {
            if (this.skinPlayer[i].userState != UserState.None && this.skinPlayer[i].userState != UserState.Look) {
                if (i == 0)
                    this.skinPlayer[i].skinCardsView.SetCardValue(LastCardIndex, value);
                else
                    this.skinPlayer[i].skinCardsView.SetCardValue(LastCardIndex, 0);
            }
        }
    }
    /**
     * 设置最后一张牌
     */
    public SetLastRubCardValue() {
        for (var i = 0; i < this.skinPlayer.length; i++) {
            if (this.skinPlayer[i].userState != UserState.None && this.skinPlayer[i].userState != UserState.Look) {
                if (i == 0)
                    this.skinPlayer[i].skinCardsView.SetRubCardValue(LastCardIndex, 0);
                else
                    this.skinPlayer[i].skinCardsView.SetCardValue(LastCardIndex, 0);
            }
        }
    }
    /**
     * 设置自己最后一张牌
     */
    public SetSelfLastCardValue(value: number) {
        if (value <= 0)
            return;
        this.skinPlayer[0].skinCardsView.SetCardValue(LastCardIndex, value);
    }
    /**
     * 设置是否可以点击牌
     */
    public SetCanClick() {
        this.skinPlayer[0].skinCardsView.SetCanClick(true);
    }
    public ShowPeiPai(chair:number){
        this.skinPlayer[chair].ShowPeiPai();
    }
    /**
     * 关闭是否可以点击牌
     */
    public HideCanClick() {
        this.skinPlayer[0].skinCardsView.SetCanClick(false);
    }
    /**
     * 关闭是否等待搓牌
     */
    public HideWaitRub() {
        this.skinPlayer[0].skinCardsView.SetWaitRub(false);
    }
    /**
     * 获取玩家选牌索引
     */
    public GetUpIndexList() {
        return this.skinPlayer[0].skinCardsView.GetUpIndexList();
    }
    /**
     * 根据索引弹起牌
     */
    public UpCardsByIndex(value: number[]) {
        this.skinPlayer[0].skinCardsView.UpCardsByIndex(value);
    }

    //==================================== 设置 结束 =======================================

    //==================================== 动画 开始 =======================================
    //注意，当前游戏某阶段流程比如：收到游戏开始的消息，调用AniDeal播放发牌动画并将消息传入，在动画播放完毕时，
    //再讲CMD_S_GameStart消息传入M_BiJiView中，在根据游戏模式判断是显示抢庄按钮或下注按钮

    /**
     * 播放发牌动画
     */
    public AniDeal(data: M_BiJi_GameMessage.CMD_S_GameStart) {
        VoicePlayer.PlaySysSound("bull_start");
       // this.skinAniGameStart.Show(this, () => { this.aniDealControl.ShowAni(data) });
       cc.log("播放发牌动画");
        this.aniDealControl.ShowAni(data)
    }
    /**
     * 播放选庄动画
     */
    public AniMaster(data: M_BiJi_GameMessage.CMD_S_BetStart) {
        this.aniSelectMaster.ShowAni(data);
    }
    /**
     * 播放发最后一张牌动画
     */
    public AniDealLast(data: M_BiJi_GameMessage.CMD_S_SelectCardsStart) {
        this.aniPlayerDealLast.ShowAni(data);
    }
    public AniFlip(data: M_BiJi_GameMessage.CMD_S_SelectCardsStart) {
     //   this.aniFlip.ShowAni(data);
    }
    /**
     * 播放结果动画
     */
    public AniResult(data: M_BiJi_GameMessage.CMD_S_GameResult) {
     //   this.aniResult.ShowAni(data);
        this.aniFlip.ShowAni(data);
    }
    /**
     * 设置计分板信息，以在结果动画播放完毕后弹出计分板
     */
    public AniScoreView(data: M_BiJi_GameMessage.CMD_S_ScoreView) {
        this.aniResult.SetScoreView(data);
    }
    /**
     * 设置庄家变更信息，以在结果动画播放完毕后弹出庄家变更消息
     */
    public AniMasterChange(data: M_BiJi_GameMessage.CMD_S_MasterChange) {
        this.aniResult.SetMasterChange(data);
    }
    /**
     * 设置玩家余额
     */
    public AniPlayerScore(data: M_BiJi_GameMessage.CMD_S_PlayerScore) {
        this.aniResult.SetPlayerScore(data);
    }
    private StopPlayerAni() {
        for (var i = 0; i < this.skinPlayer.length; i++) {
            this.skinPlayer[i].StopAni();
        }
    }
    /**
     * 根据状态进行动画的销毁
     * @param gameStage 游戏客户端的状态 
     */
    public StopAni(gameStage: GameStage) {
        if (gameStage == GameStage.Bet) {
            this.StopPlayerAni();
            this.skinAniGameStart.Destroy();
            this.aniDealControl.Destroy();
        }
        else if (gameStage == GameStage.SelectCards) {
            this.StopPlayerAni();
            this.skinAniGameStart.Destroy();
            this.aniSelectMaster.Destroy();
            this.aniDealControl.Destroy();
        }
        else if (gameStage == GameStage.Result) {
            this.StopPlayerAni();
            this.skinAniGameStart.Destroy();
            this.aniDealControl.Destroy();
            this.aniSelectMaster.Destroy();
            this.aniPlayerDealLast.Destroy();
            this.aniFlip.Destroy();
        }
        else if (gameStage == GameStage.Free) {
            this.StopPlayerAni();
            this.aniResult.Destroy();
        }
    }
    //==================================== 动画 结束 =======================================

    //==================================== 辅助 开始 =======================================
    /**
     * 座位号是否合法
     */
    public IsChairSafe(chair: number) {
        return chair >= 0 && chair < PlayerCount;
    }

    /**
     * 获取某个玩家的坐标
     */
    public GetPlayerInfoPoint(chair: number): cc.Vec2 {
        var point = new cc.Vec2(this.skinPlayer[chair].node.x, this.skinPlayer[chair].node.y);
        switch (chair) {
            case 0: {
               // point.y += this.skinPlayer[chair].node.height / 2;
                break;
            }
            case 1:
            case 2: {
             //   point.x -= this.skinPlayer[chair].node.width / 2;
                break;
            }
            case 3: {
              //  point.y -= this.skinPlayer[chair].node.height / 2;
                break;
            }
            case 4:
            case 5: {
             //   point.x += this.skinPlayer[chair].node.width / 2;
                break;
            }
        }
        return point;
    }
    /**
     * 获取玩家状态
     */
    public GetPlayerState(): number[] {
        var state = new Array(4);
        for (var i = 0; i < 4; i++) {
            state[i] = this.skinPlayer[i + 1].IsFree() ? 0 : 1;
        }
        return state;
    }
    /**
     * 获取玩家余额
     */
    public GetPlayerMoney(chair: number) {
        return this.skinPlayer[chair].money;
    }
    /**
     * 自己是否参与游戏
     */
    public IsSelfJoinGame() {
        return this.skinPlayer[0].IsJoinGame();
    }
    /**
     * 获取单张牌的位置
     */
    public GetCardPos(chair: number, index: number) {
        return this.skinPlayer[chair].GetCardPos(index,chair);
    }
    //==================================== 辅助 结束 =======================================

    //==================================== 计时器 开始 =======================================
    public TimePause() {
        for (var i = 0; i < this.skinPlayer.length; i++) {
            this.skinPlayer[i].TimePause();
        }
        this.skinAniGameStart.TimePause();
        this.aniDealControl.TimePause();
        this.aniPlayerDealLast.TimePause();
        this.aniSelectMaster.TimePause();
        this.aniFlip.TimePause();
        this.aniResult.TimePause();
    }
    public TimeResume() {
        for (var i = 0; i < this.skinPlayer.length; i++) {
            this.skinPlayer[i].TimeResume();
        }
        this.skinAniGameStart.TimeResume();
        this.aniDealControl.TimeResume();
        this.aniPlayerDealLast.TimeResume();
        this.aniSelectMaster.TimeResume();
        this.aniFlip.TimeResume();
        this.aniResult.TimeResume();
    }
    //==================================== 计时器 结束 =======================================
}
