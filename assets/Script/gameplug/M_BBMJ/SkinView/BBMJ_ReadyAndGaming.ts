import BBMJ_Player from "./BBMJ_Player";
import { BBMJ, BBMJMahjongDef } from "../ConstDef/BBMJMahjongDef";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { BBMJMahjongAlgorithm } from "../BBMJMahjongAlgorithm/BBMJMahjongAlgorithm";
import MJ_PlayVoiceStaus from "../../MJCommon/MJ_PlayVoiceStaus";
import M_BBMJView from "../M_BBMJView";
import M_BBMJClass from "../M_BBMJClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_ReadyAndGaming extends cc.Component {

    @property([BBMJ_Player])
    gameUserAry: BBMJ_Player[] = [];

    @property([cc.Node])
    group_voice: cc.Node[] = [];

    @property(cc.Node)
    group_ready: cc.Node=null;

    @property([cc.Sprite])
    group_imgready: cc.Sprite[]=[];

    @property(cc.Node)
    group_kickuser: cc.Node=null;

    @property([cc.Button])
    group_kickusers: cc.Button[]=[];

    @property([cc.Sprite])
    group_imguser:cc.Sprite[]=[];
    
    
    @property(cc.Button)
    btn_kick: cc.Button=null;

    @property(cc.Node)
    group_userReady: cc.Node=null;

    @property(cc.Button)
    btn_ready: cc.Button=null;
    @property(cc.Button)
    btn_threeBodyPlay: cc.Button=null;

    @property(cc.Node)
    group_other: cc.Node=null;

    @property(cc.Sprite)
    warning:cc.Sprite = null;

    private voiceAry: Array<MJ_PlayVoiceStaus>;

    
    private readyORgaming:boolean = false;

    onLoad() {
        for (let i = 0; i < BBMJMahjongDef.gPlayerNum - 1; i++) {
            const x = i + 1;
            this.gameUserAry[x].node.on(cc.Node.EventType.TOUCH_END, () => { this.onSelUserFace(x); }, this);
        }
        // init logic
        // cc.log("gameUserInfo玩家信息初始化");
        //this.init();

    }

    public init(): void {
        this.readyORgaming=false;
        this.voiceAry = new Array<MJ_PlayVoiceStaus>();
        cc.log("UserInfo玩家信息初始化1111111");
        for (let i = 0; i < BBMJMahjongDef.gPlayerNum; i++) {
            this.group_voice[i].active = false;
            let tempvoice: MJ_PlayVoiceStaus = this.group_voice[i].getComponent<MJ_PlayVoiceStaus>(MJ_PlayVoiceStaus);
            this.voiceAry.push(tempvoice);
        }
        cc.log("UserInfo玩家信息初始化2222222");
        for (let i = 0; i < BBMJMahjongDef.gPlayerNum - 1; i++) {
           // this.group_kickusers[i].node.active=true;
            this.group_kickusers[i].node.on(cc.Node.EventType.TOUCH_END,() => {
                    let chair: number = i+1;
                    this.onKickUser(chair);
            },this);
        }
        cc.log("UserInfo玩家信息初始化33333333");
        for (let i = 0; i < this.gameUserAry.length; i++) {
            this.gameUserAry[i].init();
        }
       // this.group_kickuser.active=false;
        // this.btn_kick.node.active=false;
        // this.btn_kick.node.on(cc.Node.EventType.TOUCH_END,() => {
        //         if(this.group_kickuser.active==false){
        //             this.group_kickuser.active=true;
        //         }else{
        //             this.group_kickuser.active=false;
        //         }
        // },this);
    }



    private static UserDataGamingPos: Array<{ x: number, y: number }> = [
        { x: -350, y: -170 },
        { x: 350, y: 50 },
        { x: 150, y: 220 },
        { x: -350, y: 50 }
    ];

    private static UserDataReadyPos: Array<{ x: number,y: number }> = [
        { x: 0,y: -60 },
        { x: 170,y: 10 },
        { x: 0,y: 120 },
        { x: -170,y: 10 }
    ]; 

    private static ReadyPlayerPos: Array<{ x: number,y: number }> = [
        { x: 0,y: -270 },
        { x: 400,y: -30 },
        { x: 0,y: 200 },
        { x: -400,y: -30 }
    ]; 
    private static GamingPlayerPos: Array<{ x: number,y: number }> = [
        { x: -577,y: -210 },
        { x: 573,y: 36 },
        { x: 360,y: 245 },
        { x: -575,y: 36 }
    ]; 
    private static ReadyVoicePos: Array<{ x: number,y: number }> = [
        { x: 101,y: -206 },
        { x: 295,y: 92 },
        { x: -103,y: 343 },
        { x: -299,y: 47 }
    ]; 
    private static GamingVoicePos: Array<{ x: number,y: number }> = [
        { x: -454,y: -149 },
        { x: 455,y: 96 },
        { x: 244,y: 313 },
        { x: -452,y: 99 }
    ]; 
        /**设置听牌者椅子号 */
        public set Ting(chair:number){
            var logicChair:number=BBMJ.ins.iclass.physical2logicChair(chair);
            for(var i:number=0;i<BBMJMahjongDef.gPlayerNum;i++){
                if(i==logicChair){
                    this.gameUserAry[i].SetTing();
                }
            }
        }

                /**隐藏听牌者椅子号 */
        public HideTing(){
      
            for(var i:number=0;i<BBMJMahjongDef.gPlayerNum;i++){
              
                    this.gameUserAry[i].HideTing();
                
            }
        }

    /**
     * 显示分数变化
     */
    public showScoreChange(scores: Array<number>): void {
        for (var i = 0; i < this.gameUserAry.length; i++) {
            if(cc.isValid(this.gameUserAry[i])){
                this.gameUserAry[i].AddScore(scores[BBMJ.ins.iclass.logic2physicalChair(i)]);
            }
        }
    }
    /**
     * 重置显示分数
     */
    public reShowScoreChange(scores: Array<number>): void {
        for (var i = 0; i < this.gameUserAry.length; i++) {
            if(cc.isValid(this.gameUserAry[i])){
                this.gameUserAry[i].SetScore(scores[BBMJ.ins.iclass.logic2physicalChair(i)]);
            }
        }
    }
    /**
     * 选择用户头像
     * */
    private onSelUserFace(logicChair: number): void {
        if (!BBMJ.ins.iclass.isVideo()) {
            var chair: number = BBMJ.ins.iclass.logic2physicalChair(logicChair);
           // if(!this.readyORgaming)
           // {
           //     M_BBMJView.ins.UserData.showUserData(BBMJ.ins.iclass.getTableConfig().isValid,BBMJ.ins.iclass.getTablePlayerAry()[chair],BBMJ_ReadyAndGaming.UserDataReadyPos[logicChair].x,BBMJ_ReadyAndGaming.UserDataReadyPos[logicChair].y);
         //   }else{
             //   M_BBMJView.ins.UserData.showUserData(BBMJ.ins.iclass.getTableConfig().isValid, BBMJ.ins.iclass.getTablePlayerAry()[chair], BBMJ_ReadyAndGaming.UserDataGamingPos[logicChair].x, BBMJ_ReadyAndGaming.UserDataGamingPos[logicChair].y);
                let point = new cc.Vec2(BBMJ_ReadyAndGaming.UserDataGamingPos[logicChair].x, BBMJ_ReadyAndGaming.UserDataGamingPos[logicChair].y);
                M_BBMJClass.ins.showPlayerInfoForm(BBMJ.ins.iclass.getTablePlayerAry()[chair],point, chair);
          //  }
        }
    }
    /**
     * 获取用户头像坐标
     * @param chair 椅子号
     */
    public GetPlayerPoint(chair:number){
        let point = new cc.Vec2(BBMJ_ReadyAndGaming.UserDataGamingPos[chair].x, BBMJ_ReadyAndGaming.UserDataGamingPos[chair].y);   
        switch(chair){
            case 0:point.x-=240;
                    point.y+=30;
                    break;
            case 1:point.x+=220;
                    point.y+=50;
                    break;
            case 2:point.x+=205;
                    point.y+=90;
                    break;
            case 3:point.x-=230;
                    point.y+=60;
                    break;
        }
        return point;
     }
             /**
     * 显示鼓掌动画
     */
    public ShowGuZhang(chair: number) {
        if (this.gameUserAry[chair].node.active)
            this.gameUserAry[chair].ShowGuZhang();
    }
    /**
     * 玩家表情
     */
    public playerLook(chair: number, clip: cc.AnimationClip): void {
        if (this.node.active) {
            var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chair);
            if(cc.isValid(this.gameUserAry[logicChair])){
                this.gameUserAry[logicChair].playerLook(clip);
            }
        }
    }


    public reflashPlayer(): void {
        for (var i: number = 0; i < this.gameUserAry.length; i++) {
            if (BBMJ.ins.iclass.getTablePlayerAry()[BBMJ.ins.iclass.logic2physicalChair(i)]){
                if(cc.isValid(this.gameUserAry[i])){
                    this.gameUserAry[i].SetPlayer(BBMJ.ins.iclass.getTablePlayerAry()[BBMJ.ins.iclass.logic2physicalChair(i)],this.readyORgaming);
                }
            }
        }
    }
    /**
     * 隐藏玩家余额
     * */
    public hideUserMoney():void{
        if(this.gameUserAry!=null && this.gameUserAry.length!=0){
            for(var j: number = 0;j < this.gameUserAry.length; j++){
                if(cc.isValid(this.gameUserAry[j])){
                    this.gameUserAry[j].ShowMoney(false);
                }
            }
        }
    }

    /**
     * 刷新自己余额
     * */
    public refreshSelfScore():void{
        if(this.gameUserAry!=null && this.gameUserAry.length!=0 && cc.isValid(this.gameUserAry[0])){
            this.gameUserAry[0].SetMoney(this.getPlayerLeftMoneyNum(BBMJ.ins.iclass.getTablePlayerAry()[BBMJ.ins.iclass.getSelfChair()]));
            this.gameUserAry[0].ShowMoney(!BBMJ.ins.iclass.getTableConfig().needHideUserMoney);
        }
    }
    /**
     * 显示
     * */
    onEnable(): void {

        //this.group_kickuser.active=false;
        this.group_userReady.active=false;
        this.group_kickuser.active = M_BBMJClass.ins.SelfIsTableOwener && M_BBMJClass.ins.TableConfig.alreadyGameNum==0;
        

        if (!BBMJ.ins.iclass.getTableConfig().IsLaPaoZuo) {
            for (var i: number = 0; i < BBMJMahjongDef.gPlayerNum; i++) {
                if(cc.isValid(this.gameUserAry[i])){
                    this.gameUserAry[i].ShowLaAndPao(false);
                }
            }
        }

        for(var i:number=0; i<BBMJMahjongDef.gPlayerNum; i++){
            
            if(null == M_BBMJClass.ins.TablePlayer[i]){
                this.OnPlayerLeave(i);
            }else{
                this.showChairPlayer(i,BBMJ.ins.iclass.getTablePlayerAry()[i]);
            }
        }

        //检查断线玩家
        for (var i: number = 0; i < BBMJMahjongDef.gPlayerNum; i++) {
            if ((null != BBMJ.ins.iclass.getTablePlayerAry()[i]) && (BBMJ.ins.iclass.getTablePlayerAry()[i].PlayerState == QL_Common.GState.OfflineInGame)) {
                this.offlineChair = i;
            }else{
                this.reconnectChair=i;
            }
        }
    }

    public ShowState(readyOrgaming:boolean):void{
        if(this.readyORgaming==readyOrgaming){
            this.node.active=true;
            return;
        }else{
            this.node.active=false;
            this.readyORgaming=readyOrgaming;
            // if(this.readyORgaming){
            //     this.group_ready.active=true;
            //     for (var i = 0; i < this.gameUserAry.length; i++) {
            //         if(cc.isValid(this.gameUserAry[i])){
            //             this.gameUserAry[i].node.x=BBMJ_ReadyAndGaming.ReadyPlayerPos[i].x;
            //             this.gameUserAry[i].node.y=BBMJ_ReadyAndGaming.ReadyPlayerPos[i].y;
            //         }
            //     }
            //     for (var i = 0; i < this.voiceAry.length; i++) {
            //         if(cc.isValid(this.voiceAry[i])){
            //             this.voiceAry[i].node.x=BBMJ_ReadyAndGaming.ReadyVoicePos[i].x;
            //             this.voiceAry[i].node.y=BBMJ_ReadyAndGaming.ReadyVoicePos[i].y;
            //         }
            //     }
        //    }else{
                this.group_userReady.active=false;
                this.group_ready.active=this.readyORgaming;
               // this.group_kickuser.active=false;
              //  this.btn_kick.node.active=false;
                for (var i = 0; i < this.gameUserAry.length; i++) {
                    if(cc.isValid(this.gameUserAry[i])){
                        this.gameUserAry[i].node.x=BBMJ_ReadyAndGaming.GamingPlayerPos[i].x;
                        this.gameUserAry[i].node.y=BBMJ_ReadyAndGaming.GamingPlayerPos[i].y;
                    }
                }
                for (var i = 0; i < this.voiceAry.length; i++) {
                    if(cc.isValid(this.voiceAry[i])){
                        this.voiceAry[i].node.x=BBMJ_ReadyAndGaming.GamingVoicePos[i].x;
                        this.voiceAry[i].node.y=BBMJ_ReadyAndGaming.GamingVoicePos[i].y;
                    }
                }
          //  }
            this.node.active=true;
        }
        
        //readyORgaming准备为true

    }
    /**
     * 玩家聊天消息
     * */
    public playerChat(chair: number, chatMsg: string): void {
        if (this.node.active) {
            var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chair);
            if(cc.isValid(this.gameUserAry[logicChair])){
                this.gameUserAry[logicChair].ShowChat(chatMsg);
            }

        }
    }

    public OnTablePlayer(chairID: number,player: QL_Common.TablePlayer): void {
        this.showChairPlayer(chairID,player);
    }

    /**
     * 玩家坐下:自己坐下和自己坐下后又有新的玩家进入坐下,默认状态为SitDown状态,以防万一最好再处理一下状态
     * */
    public OnPlayerSitDown(chairID: number, player: QL_Common.TablePlayer): void {
        this.showChairPlayer(chairID,player);
    }

    public OnPlayerStatusChange(chairID: number,newStatus: QL_Common.GState): void {
       
        var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chairID);
        // this.group_imgready[logicChair].node.active = (QL_Common.GState.PlayerReady == newStatus);//|| Uyi.Common.GState.OfflineInGame == newStatus);
        if(cc.isValid(this.group_imgready[logicChair]) && !this.group_imgready[logicChair].node.active){
            this.group_imgready[logicChair].node.active = (QL_Common.GState.PlayerReady == newStatus);
        }
        if(QL_Common.GState.PlayerReady != newStatus)
        {
            
            // this.group_imgready[logicChair].node.active = QL_Common.GState.OfflineInGame == newStatus;//BBMJ.ins.iclass.getTablePlayerAry()[chairID].DiamondsNum>=M_BBMJClass.ins.gameMoneyNum && Uyi.Common.GState.OfflineInGame == newStatus;
            if(cc.isValid(this.group_imgready[logicChair]) &&!this.group_imgready[logicChair].node.active)
            {
                this.group_imgready[logicChair].node.active=BBMJ.ins.iclass.getTableConfig().alreadyGameNum>0;
            }
        }
        if(cc.isValid(this.gameUserAry[logicChair])){
            if(QL_Common.GState.OfflineInGame == newStatus){
                this.gameUserAry[logicChair].Setoffline();
            }else{
                this.gameUserAry[logicChair].Hideoffline();
            }
        }
        
        
        // if((BBMJ.ins.iclass.getSelfChair() == chairID) && (QL_Common.GState.PlayerReady == newStatus)){
        //     this._btn_ready.visible=false;
        //     //返回大厅消失
        //     this._btn_dissTable.visible = false;
        // }
    }
    
    public OnPlayerLeave(chairID: number): void {
        if(chairID == 0 || chairID == 1 || chairID ==2 || chairID ==3){
           this.group_other.active = true;
        }
        var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chairID);
        
        //头像不显示
        if(cc.isValid(this.gameUserAry[logicChair])){
            this.gameUserAry[logicChair].Clear();
        }
        if(logicChair!=0&&M_BBMJClass.ins.SelfIsTableOwener){
        this.group_kickusers[logicChair-1].node.active = false;
    }
    this.group_imguser[logicChair].node.active = false;
        //准备字样消失
        if(cc.isValid(this.group_imgready[logicChair])){
            this.group_imgready[logicChair].node.active=false;
        }
        

    }

    /**
     * 显示桌子上的玩家
     * */
    private showChairPlayer(chairID: number,player: QL_Common.TablePlayer){
        var logicChair: number =BBMJ.ins.iclass.physical2logicChair(chairID);
        if(logicChair!=0&&M_BBMJClass.ins.SelfIsTableOwener){
        this.group_kickusers[logicChair-1].node.active = true;
        }
        this.group_imguser[logicChair].node.active = true;
        if(cc.isValid(this.gameUserAry[logicChair])){
            this.gameUserAry[logicChair].SetPlayer(player,this.readyORgaming);
            //显示余额
            this.gameUserAry[logicChair].SetMoney(this.getPlayerLeftMoneyNum(player));
            this.gameUserAry[logicChair].ShowMoney(!BBMJ.ins.iclass.getTableConfig().needHideUserMoney);

            this.group_imgready[logicChair].node.active = (QL_Common.GState.PlayerReady == player.PlayerState);
            if(QL_Common.GState.OfflineInGame == player.PlayerState)this.gameUserAry[logicChair].Setoffline();
            if(BBMJ.ins.iclass.isCreateRoom() && (player.PlayerState == QL_Common.GState.OfflineInGame) && (BBMJ.ins.iclass.getTableConfig().alreadyGameNum > 0)){// ||BBMJ.ins.iclass.getTablePlayerAry()[chairID].DiamondsNum>=M_BBMJClass.ins.gameMoneyNum)) {
                this.group_imgready[logicChair].node.active=true;
            }

           

            this.gameUserAry[logicChair].node.active=true;
        }
        
    }

    private copyRoomNUM(){
        M_BBMJClass.ins.CopyToClipboard(BBMJ.ins.iclass.getTableConfig().TableCode);
    }

    public SelfReady():void{
        if(BBMJ.ins.iclass.getTablePlayerAry()[BBMJ.ins.iclass.getSelfChair()].PlayerState==QL_Common.GState.SitDown){
            if(BBMJ.ins.iclass.getTableConfig().isValid && BBMJ.ins.iclass.getTableConfig().alreadyGameNum==0){
                this.btn_ready.node.active=true;
                this.group_userReady.active=true;
                
            }else{
                this.onReady();
            }
        }
        else if(BBMJ.ins.iclass.getTablePlayerAry()[BBMJ.ins.iclass.getSelfChair()].PlayerState==QL_Common.GState.PlayerReady){
            if(BBMJ.ins.iclass.getTableConfig().isValid && BBMJ.ins.iclass.getTableConfig().alreadyGameNum==0){
                this.btn_ready.node.active=false;
                this.group_userReady.active=true;
                
            }
        }
    }
        
    private onReady():void{
        if(M_BBMJClass.ins.checkMoneyCanGame){
            M_BBMJView.ins.OnReady();
            this.group_userReady.active=false;
        }
         else {
                M_BBMJClass.ins.UiManager.ShowMsgBox('余额不足请先充值！', "确定", () => {
                    //打开充值
                    M_BBMJClass.ins.showPay();
                }, null,null,null,null,() => {
                    //打开充值
                    BBMJ.ins.iclass.exit();
                });
        } 
        
    }

    /**
     * 踢人
     * */
    private onKickUser(chair:number):void{
        if(!M_BBMJClass.ins.isCreateRoom()){
            return;
        }
        let phychair: number = BBMJ.ins.iclass.logic2physicalChair(chair);
        if(null == BBMJ.ins.iclass.getTablePlayerAry()[phychair]){
            M_BBMJView.ins.TipMsgShow("此位置没有玩家");
            return;
        }
        
        var selfChair : number = BBMJ.ins.iclass.getSelfChair();

        // if(BBMJ.ins.iclass.getTablePlayerAry()[phychair].VIPLV > BBMJ.ins.iclass.getTablePlayerAry()[selfChair].VIPLV){
        //     M_BBMJView.ins.ShowMsgBox("不可踢出VIP等级高于自己的玩家");
        //     return;
        // }
        
        //M_BBMJView.ins.ShowMsgBox(`是否踢出玩家${BBMJ.ins.iclass.getTablePlayerAry()[phychair].NickName}?`,"确定",()=>{
            M_BBMJClass.ins.PleaseLeavePlayer(BBMJ.ins.iclass.getTablePlayerAry()[phychair].PlayerID);
        //     this.group_kickuser.active=false;
        // },this,"取消");
    }


    public HideLaPao(): void {
        for (var i: number = 0; i < BBMJMahjongDef.gPlayerNum; i++) {
            this.gameUserAry[i].ShowLaAndPao(false);
        }
    }

    /**
     * 设置庄家椅子号
     * */
    public set bankerChair(chair: number) {
        var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chair);
        for (var i: number = 0; i < BBMJMahjongDef.gPlayerNum; i++) {
            if(cc.isValid(this.gameUserAry[i])){
                if (i == logicChair) {
                    this.gameUserAry[i].SetBanker();
                }
                else {
                    this.gameUserAry[i].HideBanker();
                }
            }
        }
    }

    /**
     * 显示房主
     * */
    public set tableOwener(chair: number) {
        var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chair);
        for (var i: number = 0; i < BBMJMahjongDef.gPlayerNum; i++) {
            if(cc.isValid(this.gameUserAry[i])){
                if (i == logicChair) {
                    this.gameUserAry[i].SetTableowenr();
                }
                else {
                    this.gameUserAry[i].HideTableowenr();
                }
            }
        }
        if(!BBMJ.ins.iclass.isVideo()){
            this.group_kickuser.active = M_BBMJClass.ins.SelfIsTableOwener && M_BBMJClass.ins.TableConfig.alreadyGameNum==0;
        }
        
    }

    public SetLa(la: Array<number>): void {
        for (var i: number = 0; i < BBMJMahjongDef.gPlayerNum; i++) {
            var logicChair: number = BBMJ.ins.iclass.physical2logicChair(i);
            if(cc.isValid(this.gameUserAry[logicChair])){
                this.gameUserAry[logicChair].SetLa(la[i]);
            }
        }
    }

    public SetPao(pao: Array<number>): void {
        for (var i: number = 0; i < BBMJMahjongDef.gPlayerNum; i++) {
            var logicChair: number = BBMJ.ins.iclass.physical2logicChair(i);
            if(cc.isValid(this.gameUserAry[logicChair])){
                this.gameUserAry[logicChair].SetPao(pao[i]);
            }
        }
    }

    /**
     * 设置断线玩家
     * */
    public set offlineChair(chair: number) {
        if(cc.isValid(this.gameUserAry[BBMJ.ins.iclass.physical2logicChair(chair)])){
            this.gameUserAry[BBMJ.ins.iclass.physical2logicChair(chair)].Setoffline();
        }
    }

    /**
     * 设置重连玩家
     * */
    public set reconnectChair(chair: number) {
        if(cc.isValid(this.gameUserAry[BBMJ.ins.iclass.physical2logicChair(chair)])){
            this.gameUserAry[BBMJ.ins.iclass.physical2logicChair(chair)].Hideoffline();
        }
    }

    /**
     * 玩家连庄
     * */
    public playerLianBanker(chair: number): void {
        var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chair);
        if(cc.isValid(this.gameUserAry[logicChair])){
            this.gameUserAry[logicChair].SetBanker();
        }
    }
    /**
     * 开始播放语音
     * */
    public playerPlayVoice(chair: number): void {
        if (this.node.active) {
            var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chair);
            if(cc.isValid(this.voiceAry[logicChair])){
                this.voiceAry[logicChair].startPlay();
            }
        }
    }
    /**
     * 停止播放语音
     * */
    public playerStopVoice(chair: number): void {
        var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chair);
        if(cc.isValid(this.voiceAry[logicChair])){
            this.voiceAry[logicChair].stopPlay();
        }
    }

    /**
     * 清理
     * */
    public clear(): void {
        cc.log("clear玩家信息初始化");
        for (let i = 0; i < BBMJMahjongDef.gPlayerNum; i++) {
            this.group_voice[i].active = false;
        }
        for (let i = 0; i < this.gameUserAry.length; i++) {
            this.gameUserAry[i].Clear();
        }
    }

    private onShare():void{
        BBMJ.ins.iview.OnButtonShare();
    }

    /**
     * 根据场地类型,获取玩家对应余额
     * */
    private getPlayerLeftMoneyNum(player: QL_Common.TablePlayer):number{
        if(null == player){
            return 0;
        }
        switch(BBMJ.ins.iclass.getRoomData().CheckMoneyType){
            case QL_Common.CurrencyType.Gold:return player.GoldNum;
            case QL_Common.CurrencyType.Diamond:return player.DiamondsNum;
            case QL_Common.CurrencyType.QiDou:return player.QiDouNum;
        }
        return 0;
    }
}

