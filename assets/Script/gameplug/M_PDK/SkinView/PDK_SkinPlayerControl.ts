import SkinPlayer from "./PDK_SkinPlayer";
import {GameInfo, UserState, LastCardIndex, GameStage, CardType } from "../GameHelp/PDK_GameHelp";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import GameLogic from "../GameHelp/PDK_GameLogic";
import { PDK } from "../GameHelp/PDK_IClass";
import  PDK_skinCards  from "./PDK_skinCards";
import { M_PDK_GameMessage } from "../../../CommonSrc/M_PDK_GameMessage";
import VoicePlayer from "../GameHelp/PDK_VoicePlayer";

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
    @property(cc.Prefab)
    prefab_skinCard: cc.Prefab = null;
    @property(cc.Sprite)
    Sprite_zhuaNiao: cc.Sprite = null;
    /**
     * 玩家视图
     */
    public skinPlayer: SkinPlayer[];
    //游戏信息
    public gameInfo:GameInfo = null;

    public effectCard:PDK_skinCards = null;
   
    onLoad() {
        this.gameInfo = PDK.ins.iview.GetGameInfo()
        SkinPlayerControl._instance = this;
        this.skinPlayer = new Array(this.gameInfo.PlayerCount);

        this.skinPlayer[1] = cc.instantiate(this.prefab_playerRight).getComponent<SkinPlayer>(SkinPlayer);
        this.node.addChild(this.skinPlayer[1].node);
        this.skinPlayer[2] = cc.instantiate(this.prefab_playerTop).getComponent<SkinPlayer>(SkinPlayer);
        this.node.addChild(this.skinPlayer[2].node);
        this.skinPlayer[3] = cc.instantiate(this.prefab_playerLeft).getComponent<SkinPlayer>(SkinPlayer);
        this.node.addChild(this.skinPlayer[3].node);
        // this.skinPlayer[5] = cc.instantiate(this.prefab_playerLeft).getComponent<SkinPlayer>(SkinPlayer);
        // this.node.addChild(this.skinPlayer[5].node);
        this.skinPlayer[0] = cc.instantiate(this.prefab_playerDown).getComponent<SkinPlayer>(SkinPlayer);
        this.node.addChild(this.skinPlayer[0].node);
        for (var i = 0; i < this.skinPlayer.length; i++) {
            this.skinPlayer[i].SetChair(i);
        }
        this.effectCard = cc.instantiate(this.prefab_skinCard).getComponent<PDK_skinCards>(PDK_skinCards);
        this.node.addChild(this.effectCard.node);
        this.Sprite_zhuaNiao.node.active = false;

        console.log("OnLoad");
        console.log(this.skinPlayer);
    }

    //==================================== 常用 开始 =======================================
    public Init() {
        for (var i = 0; i < this.skinPlayer.length; i++) {
            this.skinPlayer[i].Init();
        }
        this.effectCard.node.active = false;
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
        this.effectCard.node.active = false;
    }
    public SelfReadyClear() {
        for (var i = 0; i < this.skinPlayer.length; i++) {
            this.skinPlayer[i].SelfReadyClear();
        }
    }
    public showZhishi(chair:number) {
        for (var i = 0; i < this.skinPlayer.length; i++) {
            this.skinPlayer[i].HideZhishi();
        }
        this.skinPlayer[chair].ShowZhishi();
    }
    //==================================== 常用 结束 =======================================
    //==================================== 动画 开始 =======================================
    //注意，当前游戏某阶段流程比如：收到游戏开始的消息，调用AniDeal播放发牌动画并将消息传入，在动画播放完毕时，
    //再讲CMD_S_GameStart消息传入M_BiJiView中，在根据游戏模式判断是显示抢庄按钮或下注按钮

    /**
     * 播放发牌动画
     */
    public AniDeal(data: M_PDK_GameMessage.CMD_S_GameStart) {
        VoicePlayer.PlaySysSound("bull_start");
       // this.skinAniGameStart.Show(this, () => { this.aniDealControl.ShowAni(data) });
       cc.log("播放发牌动画");
       // this.aniDealControl.ShowAni(data)
    }
    //==================================== 动画 结束 =======================================

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


    /**
     * 设置玩家离开
     */
    public SetUserLeave(chair: number) {
        this.skinPlayer[chair].SetUserLeave();
    }
    /**
     * 设置庄家
     */
    public SetUserMaster(chair: number) {

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
     * 设置其他玩家的牌
     */   
    public setCardView(){
        for (var i = 1; i < this.skinPlayer.length; i++) {
            this.skinPlayer[i].setPlayerCardView(this.gameInfo.CardsCount);
        }
    }
    /**
     * 设置抓鸟动画
     */   
    public showZhuaNiaoAni(cChair:number){
        this.Sprite_zhuaNiao.node.setPosition(0,0);
        this.Sprite_zhuaNiao.node.active = true;
        let movePos = this.skinPlayer[cChair].node.getPosition();
        let ani = cc.sequence(cc.moveTo(0.4,movePos),cc.callFunc(function(){
            if(cChair != 0){
                this.skinPlayer[cChair].showZhuaNiaoIcon();
            }
            this.Sprite_zhuaNiao.node.active = false;
        },this));
        this.Sprite_zhuaNiao.node.runAction(ani);
    }
    /**
     * 断线重连设置其他玩家的牌
     */   
    public setCardViewByData(playerChair:number[],playerCardsCount:number[],playerOutCards:number[][]){
        for(let i = 0;i<playerChair.length;i++){
            let chair = PDK.ins.iclass.GetClientChair(playerChair[i]);
            if(chair != 0){
                this.skinPlayer[chair].setPlayerCardView(playerCardsCount[i]);
            }
            let cards = GameLogic.SortCardToSmall(playerOutCards[i],playerOutCards[i].length,true)
            this.skinPlayer[chair].showOutCard(cards);
        }
    }
      /**
     * 设置其他玩家的准备图片
     */   
    public showReadyImage(cChair:number[],userState:number[]){
        for(let i = 0;i<cChair.length;i++){
            if(userState[i] == UserState.Ready){
                this.skinPlayer[cChair[i]].SetUserReady();
            }
        }
    }
    /**
     * 关闭报警特效
     */   
    public stopWarningEffect(){
        for(let i = 0;i<this.skinPlayer.length;i++){
            this.skinPlayer[i].stopWarningEffect();
        }
    }

    /**
     * 显示玩家打出的牌
     */   
    public showOutCard(cChair: number,cards:number[],cardType:CardType = CardType.Error){
        this.skinPlayer[cChair].showOutCard(cards,cardType);
    }
    /**
     * 显示各玩家剩余手牌信息
     */  
    public showHandCard(chairList:number[],cardsList:number[][]){
        for(let i = 0;i<chairList.length;i++){
            let cChair = PDK.ins.iclass.GetClientChair(chairList[i]);
            if(cChair != 0){
                this.showOutCard(cChair,cardsList[i]); 
            }
        }
    }


    //显示先出牌的飞牌动画
    public showFristCardAni(value:number,chair:number,data: M_PDK_GameMessage.CMD_S_GameStart){
        this.effectCard.node.active = true;
        this.effectCard.node.opacity = 255;
        this.effectCard.node.setPosition(0,0);
        this.effectCard.createCard(value);
        let action = cc.spawn(cc.moveTo(0.25,this.skinPlayer[chair].node.getPosition()), cc.scaleTo(0.5, 0.5),cc.fadeOut(1));
        let callback = cc.callFunc(function(){
            this.effectCard.node.active = false;
            this.skinPlayer[chair].showPlayerTips("我先出");
            PDK.ins.iview.Rec_GameStart(data,true);
        },this)
        let  actionsequence = cc.sequence(cc.delayTime(0.5),action,callback);

        this.effectCard.node.runAction(actionsequence);

    }
    //==================================== 辅助 开始 =======================================
    /**
     * 座位号是否合法
     */
    public IsChairSafe(chair: number) {
        return chair >= 0 && chair < this.gameInfo.PlayerCount;
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
    //==================================== 辅助 结束 =======================================

    //==================================== 计时器 开始 =======================================
    
    //==================================== 计时器 结束 =======================================
}
