import SkinCardsView from "./BJ_SkinCardsView";
import { UserState, TexturePath, GameModel, FontPath } from "../GameHelp/BJ_GameHelp";
import { BiJi } from "../GameHelp/BJ_IBiJiClass";

import { SetTextureRes } from "../GameHelp/BJ_BiJiFunction";
import SkinAniLockMaster from "../AniView/BJ_SkinAniLockMaster";
import SkinAniWinGold from "../AniView/BJ_SkinAniWinGold";
import GameLogic from "../GameHelp/BJ_GameLogic";
import VoicePlayer from "../GameHelp/BJ_VoicePlayer";
import { LoadHeader } from "../../../Tools/Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinPlayer extends cc.Component {
    @property(cc.Sprite)
    private img_bg: cc.Sprite = null;
    @property(cc.Sprite)
    private img_mask: cc.Sprite = null;
    //label
    @property(cc.Node)
    private grouplabel: cc.Node = null;
    @property(cc.Label)
    private label_name: cc.Label = null;
    @property(cc.Label)
    private label_bottom: cc.Label = null;
    //img
    @property(cc.Node)
    private groupimg: cc.Node = null;
    @property(cc.Sprite)
    public img_userimg: cc.Sprite = null;
    @property(cc.Sprite)
    private img_chat: cc.Sprite = null;
    @property(cc.Sprite)
    private img_offline: cc.Sprite = null;
    @property(cc.Sprite)
    private img_tablecreator: cc.Sprite = null;
    //扑克
    @property(cc.Prefab)
    prefab_cardsView: cc.Prefab = null;
    public skinCardsView: SkinCardsView;
    //抢庄
    @property(cc.Node)
    private group_robmaster: cc.Node = null;
    @property(cc.Sprite)
    private img_robmaster: cc.Sprite = null;
    @property(cc.Label)
    private label_robmaster: cc.Label = null;
    //下注
    @property(cc.Node)
    private group_bet: cc.Node = null;
    @property(cc.Label)
    private label_bet: cc.Label = null;
    //边框
    @property(cc.Sprite)
    private img_frame: cc.Sprite = null;
    //庄标识
    @property(cc.Sprite)
    private img_master: cc.Sprite = null;
    @property(cc.Node)
    private grouppoker:cc.Node = null;
    //准备跟观战标识
    @property(cc.Sprite)
    private img_view: cc.Sprite = null;
    @property([cc.SpriteFrame])
    private res_view: cc.SpriteFrame[] = [];
    @property(cc.Sprite)
    public img_peipaizhong:cc.Sprite = null;
    @property(cc.Sprite)
    public img_dropcard:cc.Sprite = null;
    @property(cc.Animation)
    public img_guzhang:cc.Animation = null;
    //变量
    private _chair: number = 0;
    //玩家状态
    public userState: UserState;
    //玩家性别
    public userGender: number;
    //玩家余额
    public money: number;
    public ss1:string="";
    private animation: cc.Animation;
    /**
     * 锁定庄家动画
     */
    private skinAniLockMaster: SkinAniLockMaster;
    /**
     * 玩家赢金币动画
     */
    @property(cc.Prefab)
    prefab_aniWinGold: cc.Prefab = null;
    public skinAniWinGold: SkinAniWinGold;

    onLoad() {
        this.skinCardsView = cc.instantiate(this.prefab_cardsView).getComponent<SkinCardsView>(SkinCardsView);
        this.grouppoker.addChild(this.skinCardsView.node);
        this.skinAniLockMaster = new cc.Node().addComponent<SkinAniLockMaster>(SkinAniLockMaster);
        this.node.addChild(this.skinAniLockMaster.node);
        this.skinAniWinGold = cc.instantiate(this.prefab_aniWinGold).getComponent<SkinAniWinGold>(SkinAniWinGold);
        this.node.addChild(this.skinAniWinGold.node);
        this.img_bg.node.on(cc.Node.EventType.TOUCH_END,this.OnImgClick, this);
        this.animation = this.img_chat.addComponent<cc.Animation>(cc.Animation);
        this.Init();
    }
    public SetChair(chair: number): void {
        this._chair = chair;
        this.SetPos(chair);
        this.skinCardsView.SetChair(chair);
    }
    private SetPos(chair: number) {
        switch (chair) {
            case 0: {
                this.node.x = -542;
                this.node.y = -267;
                break;
            }
            case 1: {
                this.node.x = 581;
                this.node.y = 5;
                break;
            }
            case 2: {
                this.node.x = 390;
                this.node.y = 230;
                break;
            }
            case 3: {
                // this.node.x = 0;
                // this.node.y = 292;
                this.node.x = -390;
                this.node.y = 230;
                break;
            }
            case 4: {
                this.node.x = -581;
                this.node.y = 5;
                break;
            }
            // case 5: {
            //     this.node.x = -541;
            //     this.node.y = -15;
            //     break;
            // }
        }
    }
    public SetTransForm(isCreateTable: boolean) {
        if (isCreateTable) {
            this.label_bottom.node.active = true;
            // if (this._chair != 0 && this._chair != 3) {
            //     this.groupimg.y = 0;
            //     this.grouplabel.y = 0;
            // }
        }
        else {
            this.label_bottom.node.active = false;
            // if (this._chair != 0 && this._chair != 3) {
            //     this.groupimg.y = -10;
            //     this.grouplabel.y = -5;
            // }
        }
    }
    public Init() {
        this.skinCardsView.Init();
        this.skinAniLockMaster.Init();
        this.skinAniWinGold.Init();
        this.animation.stop();
        this.unscheduleAllCallbacks();
        this.Clear();
        this.Reset();
        this.money = 0;
        this.userGender = 0;
    }
    public Reset(): void {
        if (this.userState == UserState.Look) {
            this.userState = UserState.Free;
            this.HideUserLook();
        }
        else {
            this.HideMask();
        }
    }
    public Destroy(): void {
        this.skinCardsView.Destroy();
        this.skinAniLockMaster.Destroy();
        this.skinAniWinGold.Destroy();
        this.animation.stop();
        this.unscheduleAllCallbacks();
    }
    private Clear() {
        this.node.active = false;
        this.userState = UserState.None;
        this.label_name.string = "";
        this.label_bottom.string = "";

        this.img_userimg.spriteFrame = null;
        this.animation.stop();
        this.img_guzhang.stop();
        this.img_guzhang.node.active = false;
        this.unscheduleAllCallbacks();
        this.img_chat.node.active = false;
        this.img_offline.node.active = false;
        this.img_tablecreator.node.active = false;

        this.img_mask.node.active = false;
        this.img_frame.node.active = false;
        this.img_master.node.active = false;
        this.img_view.node.active = false;
        this.img_peipaizhong.node.active = false;
        this.img_dropcard.node.active = false;
        this.SelfReadyClear();
    }
    public SelfReadyClear() {
        this.skinCardsView.Reset(this._chair);
        this.HideUserRobRate();
        this.HideUserBetRate();
        this.HideUserSelectCards();
        this.img_frame.node.active = false;
        if (BiJi.ins.iview.GameModel() == GameModel.RobMaster)
            this.img_master.node.active = false;
        this.HideUserResultScore();
    }
    //==================================== 常用 结束 =======================================

    //==================================== 设置 开始 =======================================
    /**
     * 设置玩家信息
     */
    public SetUserInfo(faceID: string, name: string, gender: number) {      
        if( name.length > 5){
            this.ss1 = name.substring(0,4) + "...";            
        }else{
            this.ss1 = name;
        }
      


        this.node.active = true;
        this.userGender = gender;
        this.label_name.node.active = true;
        this.label_name.string = this.ss1;
        this.img_userimg.spriteFrame = null;

        this.img_userimg.node.active = true;
        LoadHeader(faceID, this.img_userimg);
        this.img_userimg.node.width=82;
        this.img_userimg.node.height =82;
    }
    /**
     * 设置玩家余额
     */
    public SetUserMoney(value: number) {
        if (this.node.active && this.userState != UserState.None) {
            this.money = value;
            this.label_bottom.string = value + "";
        }
    }
    /**
     * 增加玩家余额
     */
    public AddUserMoney(value: number) {
        if (this.node.active && this.userState != UserState.None) {
            this.money += value;
            this.label_bottom.string = this.money + "";
        }
    }
    /**
     * 设置玩家坐下
     */
    public SetUserSitDown() {
        this.HideUserReady();
        this.img_offline.node.active = false;
        this.userState = UserState.Free;
    }
    /**
     * 设置玩家准备
     */
    public SetUserReady(isTrue: boolean = true) {
        if (isTrue)
            this.img_offline.node.active = false;
        this.userState = UserState.Ready;
        cc.log("播放准备音效性别"+this.userGender);
        VoicePlayer.PlayChatVoice(11,this.userGender);
        this.img_view.spriteFrame = this.res_view[0];
        this.img_view.node.active = true;
    }
    /**
     * 隐藏玩家准备
     */
    public HideUserReady() {
        this.img_view.node.active = false;
    }
    /**
     * 设置玩家断线
     */
    public SetUserOffLine() {
        this.img_offline.node.active = true;
        this.userState = UserState.Offline;
    }
    /**
     * 设置玩家游戏中
     */
    public SetUserGaming() {
        this.HideUserReady();
        this.img_offline.node.active = false;
        this.userState = UserState.Free;
    }
    /**
     * 设置玩家观战
     */
    public SetUserLook() {
        this.img_offline.node.active = false;
        this.img_mask.node.active = true;
        this.img_view.node.active = true;
        this.img_view.spriteFrame = this.res_view[1];
        this.userState = UserState.Look;
    }
    public ShowPeiPai(){
        this.img_peipaizhong.node.active = true;
    }
    public HidePeiPai(){
        this.img_peipaizhong.node.active = false;
    }
        public ShowDropCard(){
        this.img_dropcard.node.active = true;
    }
    public HideDropCard(){
        if(this.img_dropcard.node.active){
             this.img_dropcard.node.active = false;
        }
       
    }
    /**
     * 隐藏玩家观战
     */
    public HideUserLook() {
        this.img_mask.node.active = false;
        this.img_view.node.active = false;
    }
    /**
     * 隐藏遮罩
     */
    private HideMask() {
        this.img_mask.node.active = false;
    }
    /**
     * 设置玩家离开
     */
    public SetUserLeave(): void {
        this.Reset();
        this.Clear();
    }
    // /**
    //  * 显示锁定庄家动画
    //  */
    // public ShowAniLockMaster(chair: number, obj1: any = null, fun1: () => void = null) {
    //     this.img_master.node.active = false;
    //     this.skinAniLockMaster.Show(chair, obj1, fun1);
    // }
    // /**
    //  * 设置玩家抢庄倍数
    //  */
    // public SetUserRobRate(value: number) {
    //     if (value == 0) {
    //         this.group_robmaster.active = true;
    //         SetTextureRes(TexturePath + "niuniures/view_notrob", this.img_robmaster);
    //         this.label_robmaster.node.active = false;
    //     }
    //     else if (value > 0) {
    //         this.group_robmaster.active = true;
    //         SetTextureRes(TexturePath + "niuniures/view_robb", this.img_robmaster);
    //         this.label_robmaster.node.active = true;
    //        // this.label_robmaster.string = value + "";
    //     }
    // }
    /**
     * 隐藏玩家抢庄倍数
     */
    public HideUserRobRate() {
        this.group_robmaster.active = false;
    }
    /**
     * 设置玩家下注倍数
     */
    public SetUserBetRate(value: number) {
        this.group_bet.active = true;
        this.label_bet.string = "x" + value;
    }
    /**
     * 隐藏玩家下注倍数
     */
    public HideUserBetRate() {
        this.group_bet.active = false;
    }
    /**
     * 设置玩家选牌完成
     */
    public SetUserSelectCards() {
        this.skinCardsView.SetFinish(true);
    }
    /**
     * 隐藏玩家选牌完成
     */
    public HideUserSelectCards() {
        this.skinCardsView.SetFinish(false);
    }
    /**
     * 设置玩家边框
     */
    public SetUserFrame(value: number) {
        if (value == 0) {
            this.img_frame.node.active = false;
            this.img_master.node.active = true;
        }
        else if (value == 1) {
            this.img_frame.node.active = true;
            this.img_master.node.active = false;
        }
    }
    /**
     * 隐藏玩家边框
     */
    public HideUserFrame(value:boolean=false) {
        this.img_frame.node.active = false;
        if (BiJi.ins.iview.GameModel() != GameModel.RobMaster && BiJi.ins.iview.Master() == this._chair) {

        }
        else {
            this.img_master.node.active = false;
        }
        if(value){
            this.img_master.node.active = false;
        }
    }
    /**
     * 设置玩家结果得分
     */
    public SetUserResultScore(value: number, ani: boolean = true) {
        if (ani)
            this.skinAniWinGold.Show(this._chair, value);
        else
            this.skinAniWinGold.ShowResultScore(this._chair, value);
    }
    /**
     * 隐藏玩家结果得分
     */
    public HideUserResultScore() {
        this.skinAniWinGold.node.active = false;
    }
    /**
     * 游戏开始的清理
     */
    public GameStartClear() {
        if (this.userState != UserState.Look)
            this.HideUserReady();
        if (this.userState == UserState.Ready)
            this.userState = UserState.Free;
    }
    /**
     * 设置房主
     */
    public SetTableCreator(value: boolean) {
        this.img_tablecreator.node.active = value;
    }
    /**
     * 显示聊天表情
     */
    public ShowChatEmoji(value: cc.AnimationClip) {
        this.img_chat.node.active = true;
        value.name = "Emoji";
        this.animation.stop();
        this.unscheduleAllCallbacks();
        var clips = this.animation.getClips();
        for (var i = 0; i < clips.length; i++) {
            this.animation.removeClip(clips[i]);
        }
        this.animation.addClip(value);
        this.animation.play("Emoji");
        this.scheduleOnce(this.AniEmojiFinish, 3 * BiJi.ins.iclass.GetSpeed());
    }
    public ShowGuZhang(){
        this.img_guzhang.node.active = true;
        this.img_guzhang.play();
        this.scheduleOnce(this.AniGuZhangFinish, 2 * BiJi.ins.iclass.GetSpeed());
    }
    private AniGuZhangFinish() {
        this.img_guzhang.stop();
        this.img_guzhang.node.active = false;
    }
    private AniEmojiFinish() {
        this.animation.stop();
        this.img_chat.node.active = false;
    }
    //==================================== 设置 结束 =======================================

    //==================================== 辅助 开始 =======================================
    /**
     * 该玩家是否空闲
     */
    public IsFree() {
        return !this.node.active;
    }
    /**
     * 该玩家是否参与游戏
     */
    public IsJoinGame() {
        if (this.node.active && this.userState != UserState.None && this.userState != UserState.Look) {
            return true;
        }
        else {
            return false;
        }
    }
    public IsDropCard(){
         if (this.node.active && this.userState != UserState.None && this.userState != UserState.Look) {            
                return this.img_dropcard.node.active;           
        }
    }
    /**
     * 获取单张牌的位置
     */
    public GetCardPos(index: number,chair:number) {
        var pos = this.skinCardsView.GetCardPos(index);
        pos.x += this.node.x;
        pos.y += this.node.y;
        if(chair == 0){
            pos.y = -180;
        }
        if(chair == 4){
            pos.y -= 10;
            pos.x +=10;
        }
        if(chair == 2||chair == 3){
            pos.y += 28;
        }
        if(chair == 3){
            pos.x+=15;
        }
        return pos;
    }
    //==================================== 辅助 结束 =======================================
    public OnImgClick() {
        if (BiJi.ins.iclass.IsVideo()) return;
        BiJi.ins.iview.ShowPlayerInfo(this._chair);
    }
    public StopAni() {
        this.skinCardsView.RemoveCardsTween();
        this.skinAniLockMaster.Destroy();
        //this.skinAniWinGold.Destroy();
    }

    //==================================== 计时器 开始 =======================================
    public TimePause() {
        if (!this.node.active) return;
        this.skinCardsView.TimePause();
        this.skinAniLockMaster.TimePause();
        this.skinAniWinGold.TimePause();
    }
    public TimeResume() {
        if (!this.node.active) return;
        this.skinCardsView.TimeResume();
        this.skinAniLockMaster.TimeResume();
        this.skinAniWinGold.TimeResume();
    }
    //==================================== 计时器 结束 =======================================
}
