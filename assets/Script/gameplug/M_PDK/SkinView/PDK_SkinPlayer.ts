import { UserState, TexturePath, FontPath,CardType} from "../GameHelp/PDK_GameHelp";
import GameLogic from "../GameHelp/PDK_GameLogic";
import { PDK } from "../GameHelp/PDK_IClass";

import { LoadHeader } from "../../../Tools/Function";
import PDK_skinCards from "../SkinView/PDK_skinCards";
import { SelfCardWidth } from "../GameHelp/PDK_GameHelp";
import VoicePlayer from "../GameHelp/PDK_VoicePlayer";
import { AudioType, VoiceType } from "../../../CustomType/Enum";

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
    @property(cc.Label)
    private label_scoreAni: cc.Label = null;
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
    //踢人
    @property(cc.Button)
    private btn_tiRen:cc.Button = null;

    //手牌节点
    @property(cc.Node)
    private node_handCard:cc.Node = null;
    //手牌
    @property(cc.Sprite)
    private sprite_Card:cc.Sprite = null;
    //剩余牌数
    @property(cc.Label)
    private label_CardCount:cc.Label = null;
    //扎鸟
    @property(cc.Sprite)
    private sprite_zhaNiao:cc.Sprite = null;

    //打出的牌节点
    @property(cc.Node)
    private node_OutCard:cc.Node = null;
    //卡牌预制体
    @property(cc.Prefab)
    private prefab_card:cc.Prefab = null;

    //牌型提示
    @property(cc.Sprite)
    private Ani_cardType:cc.Sprite = null;
    
    //边框
    @property(cc.Sprite)
    private img_frame: cc.Sprite = null;
    //庄标识
    @property(cc.Sprite)
    private img_master: cc.Sprite = null;
    //准备跟观战标识
    @property(cc.Sprite)
    private img_view: cc.Sprite = null;
    @property([cc.SpriteFrame])
    private res_view: cc.SpriteFrame[] = [];
    @property(cc.Animation)
    public img_guzhang:cc.Animation = null;
    //操作指示特效
    @property(cc.Node)
    public node_touxiang_zhishi:cc.Node = null;
    private touxiang_zhishi:cc.Animation = null;
    //报警特效
    @property(cc.Node)
    public node_warningEffect:cc.Node = null;
    private Ani_warningEffect:cc.Animation = null;
    /**
     * 字体资源
     */
    @property([cc.BitmapFont])
    private bitmapFont: cc.BitmapFont[] = [];

    //变量
    private _chair: number = 0;
    //玩家状态
    public userState: UserState;
    //玩家性别
    public userGender: number;
    //玩家余额
    public money: number = 0;
    public ss1:string="";
    private animation: cc.Animation;

    onLoad() {
        this.touxiang_zhishi = this.node_touxiang_zhishi.getComponent<cc.Animation>(cc.Animation);
        this.Ani_warningEffect = this.node_warningEffect.getComponent<cc.Animation>(cc.Animation);
        this.animation = this.img_chat.addComponent<cc.Animation>(cc.Animation);
        this.img_bg.node.on(cc.Node.EventType.TOUCH_END,this.OnImgClick, this);
        this.Init();
    }
    public SetChair(chair: number): void {
        this._chair = chair;
        this.SetPos(chair);
    }
    private SetPos(chair: number) {
        switch (chair) {
            case 0: {
                this.node.x = -542;
                this.node.y = -320;
                break;
            }
            case 1: {
                this.node.x = 590;
                this.node.y = 50;
                break;
            }
            case 2: {
                this.node.x = 0;
                this.node.y = 300;
                break;
            }
            case 3: {
                // this.node.x = 0;
                // this.node.y = 292;
                this.node.x = -590;
                this.node.y = 50;
                break;
            }
           
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
        this.HideZhishi();
    }
    public Destroy(): void {
        this.animation.stop();
        this.unscheduleAllCallbacks();
    }
    private Clear() {
        this.node.active = false;
        this.userState = UserState.None;
        this.label_name.string = "";
        this.label_bottom.string = "";
        this.label_scoreAni.string = "";
        this.label_scoreAni.node.active = false;

        this.img_userimg.spriteFrame = null;
        this.animation.stop();
        this.Ani_cardType.node.active = false;
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
        this.node_handCard.active = false;
        this.sprite_zhaNiao.node.active = false;
        this.node_OutCard.active = false;
        this.node_touxiang_zhishi.active = false;
        this.node_warningEffect.active = false;
       
        this.btn_tiRen.node.active = false;
        this.SelfReadyClear();
    }
    public SelfReadyClear() {
        this.img_view.node.active = false;
        this.btn_tiRen.node.active = false;
    }
    //==================================== 常用 结束 =======================================

    //==================================== 设置 开始 =======================================
    /**
     * 设置玩家信息
     */
    public SetUserInfo(faceID: string, name: string, gender: number) {      
        if( name.length > 5){
            this.ss1 = name.substring(0,3) + "...";            
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
        this.img_userimg.node.width=68;
        if(this._chair == 0){
            this.img_userimg.node.width=65;
        }
        this.img_userimg.node.height =63;
    }
    /**
     * 设置玩家余额
     */
    public SetUserMoney(value: number) {
        if (this.node.active && this.userState != UserState.None) {
            let upMoney = value - this.money;
            if(upMoney != 0){
                if(value > 0){
                    this.label_scoreAni.font = this.bitmapFont[0];
                }else{
                    this.label_scoreAni.font = this.bitmapFont[1];
                }
                this.label_scoreAni.string = upMoney.toString();
                this.label_scoreAni.node.active = true;
                this.label_scoreAni.node.getComponent(cc.Animation).play();
            }
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
        this.userState = UserState.Game;
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
    }
    /**
     * 游戏开始的清理
     */
    public GameStartClear() {
        if (this.userState != UserState.Look)
            this.HideUserReady();
        if (this.userState == UserState.Ready)
            this.userState = UserState.Free;
        this.sprite_zhaNiao.node.active = false;
        this.node_handCard.active = false;
        this.node_OutCard.active = false;
        this.stopWarningEffect();
    }

    public stopWarningEffect(){
        this.node_warningEffect.active = false;
        this.Ani_warningEffect.stop();
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
        this.scheduleOnce(this.AniEmojiFinish, 3 * PDK.ins.iclass.GetSpeed());
    }

    public ShowGuZhang(){
        this.img_guzhang.node.active = true;
        this.img_guzhang.play();
        this.scheduleOnce(this.AniGuZhangFinish, 2 * PDK.ins.iclass.GetSpeed());
    }
    private AniGuZhangFinish() {
        this.img_guzhang.stop();
        this.img_guzhang.node.active = false;
    }

    private AniEmojiFinish() {
        this.animation.stop();
        this.img_chat.node.active = false;
    }

     /**
     * 设置玩家卡牌信息
     */
    public setPlayerCardView(count:number){
        this.label_CardCount.string = count.toString();
        if(PDK.ins.iview.GetGameRule().showRemainNum){
            this.label_CardCount.node.active = true;
        }else{
            this.label_CardCount.node.active = false;
        }
        this.node_handCard.active = true;

    }
    //显示玩家提示信息
    public showPlayerTips(resIndex:number){
        this.Ani_cardType.node.active = true;
        this.Ani_cardType.spriteFrame = this.res_view[resIndex];
        this.Ani_cardType.node.getComponent(cc.Animation).play();

    }
    //显示玩家打出的牌
    public showOutCard(cards:number[],cardType:CardType = CardType.Error){
        for(let i = 0;i < this.node_OutCard.childrenCount;i++) {
            this.node_OutCard.children[i].destroy();
        }
        cards = GameLogic.SortCardToSmall(cards,cards.length,true);
        let maxOutCardWidth = (cards.length - 1)*30 + SelfCardWidth*0.65;
        for(let i= 0;i<cards.length;i++){
            let cardObj = cc.instantiate(this.prefab_card).getComponent<PDK_skinCards>(PDK_skinCards);
            cardObj.createCard(cards[i]);
            cardObj.setScale(0.65);
            this.node_OutCard.addChild(cardObj.node);
            if(this._chair == 0 || this._chair == 2){
                cardObj.node.setPosition(0 - maxOutCardWidth/2 + i*30,0);
            }else if(this._chair == 1){
                cardObj.node.setPosition(0- maxOutCardWidth + i*30,0);
            }else{
                cardObj.node.setPosition(i*30,0);
            }
        }
        this.node_OutCard.active = true;
        if(cardType != CardType.Error){
            let cardLogicValue;

            if(cardType == CardType.Pass){
                //不要
                this.showPlayerTips(2);
                cardLogicValue = null;
            }else{
                PDK.ins.iview.playCardTypeAni(cardType,this._chair,this.node.getPosition());
                cardLogicValue = GameLogic.GetCardLogicValue(cards[0]);
            }
            let leftCount = parseInt(this.label_CardCount.string) - cards.length;
            this.label_CardCount.string = leftCount.toString();
            if(this._chair != 0 && leftCount == 1){
                this.Ani_warningEffect.play();
                this.node_warningEffect.active = true;
            }
            VoicePlayer.PlayCardType(cardType,cardLogicValue,VoiceType.Mandarin,this.userGender);
        }
    }
    public getCardTypeStr(cardType:CardType){
        let cardTypeName:string = null;
        switch(cardType){
            case CardType.Pass:
                cardTypeName = "要不起";
            break;
            case CardType.Error:
                cardTypeName = "牌型错误";
            break;
            case CardType.One:
                cardTypeName = "单张";
            break;
            case CardType.Two:
                cardTypeName = "对子";
            break;
            case CardType.Three:
                cardTypeName = "三张";
            break;
            case CardType.ThreeAndOne:
                cardTypeName = "三带一";
            break;
            case CardType.ThreeAndTwo:
                cardTypeName = "三带二";
            break;
            case CardType.ShunZi:
                cardTypeName = "顺子";
            break;
            case CardType.lianDui:
                cardTypeName = "连对";
            break;
            case CardType.Plane:
                cardTypeName = "飞机";
            break;
            case CardType.FourAndTwo:
                cardTypeName = "四带二";
            break;
            case CardType.Bomb:
                cardTypeName = "炸弹";
            break;
        }

        return cardTypeName;
    }
    //踢人
    private OnButtonTiren(){
        this.btn_tiRen.node.active = false;
        PDK.ins.iview.OnTiren(this._chair);
    }
    public ShowTiren(){
        this.btn_tiRen.node.active = true;
        this.btn_tiRen.node.on("click",this.OnButtonTiren,this);
    }
    public HideTiren(){
        this.btn_tiRen.node.active = false;
    }
    //头像指示
    public ShowZhishi(){
        this.node_touxiang_zhishi.active = true;
        var aniState = this.touxiang_zhishi.play();
        aniState.wrapMode = cc.WrapMode.Loop;
    }
    public HideZhishi(){
        this.touxiang_zhishi.stop();
        this.node_touxiang_zhishi.active = false;
    }
    //显示抓鸟图标
    public showZhuaNiaoIcon(){
        this.sprite_zhaNiao.node.active = true;
    }
    //==================================== 设置 结束 =======================================
    public OnImgClick() {
        if (PDK.ins.iclass.IsVideo()) return;
        if (this._chair == 0) return;
        PDK.ins.iview.ShowPlayerInfo(this._chair);
    }
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
    
   
    //==================================== 辅助 结束 =======================================
   
}
