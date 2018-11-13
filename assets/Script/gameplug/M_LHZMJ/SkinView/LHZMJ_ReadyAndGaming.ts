import LHZMJ_Player from "./LHZMJ_Player";
import { LHZMJ, LHZMJMahjongDef } from "../ConstDef/LHZMJMahjongDef";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { LHZMJMahjongAlgorithm } from "../LHZMJMahjongAlgorithm/LHZMJMahjongAlgorithm";
import MJ_PlayVoiceStaus from "../../MJCommon/MJ_PlayVoiceStaus";
import M_LHZMJView from "../M_LHZMJView";
import M_LHZMJClass from "../M_LHZMJClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_ReadyAndGaming extends cc.Component {

    @property([LHZMJ_Player])
    gameUserAry: LHZMJ_Player[] = [];

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
    btn_invite: cc.Button=null;

    private voiceAry: Array<MJ_PlayVoiceStaus>;

    
    private readyORgaming:boolean = false;

    onLoad() {
        // init logic
        // cc.log("gameUserInfo玩家信息初始化");
        //this.init();

    }

    public init(): void {
        this.readyORgaming=false;
        this.voiceAry = new Array<MJ_PlayVoiceStaus>();
        cc.log("UserInfo玩家信息初始化1111111");
        for (let i = 0; i < LHZMJMahjongDef.gPlayerNum; i++) {
            this.group_voice[i].active = false;
            let tempvoice: MJ_PlayVoiceStaus = this.group_voice[i].getComponent<MJ_PlayVoiceStaus>(MJ_PlayVoiceStaus);
            this.voiceAry.push(tempvoice);
        }
        cc.log("UserInfo玩家信息初始化2222222");
        for (let i = 0; i < LHZMJMahjongDef.gPlayerNum - 1; i++) {
           // this.group_kickusers[i].node.active=true;
            this.group_kickusers[i].node.on(cc.Node.EventType.TOUCH_END,() => {
                    let chair: number = i+1;
                    this.onKickUser(chair);
            },this);
            const x = i + 1;
            this.gameUserAry[x].node.on(cc.Node.EventType.TOUCH_END, () => { this.onSelUserFace(x); }, this);
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
            var logicChair:number=LHZMJ.ins.iclass.physical2logicChair(chair);
            for(var i:number=0;i<LHZMJMahjongDef.gPlayerNum;i++){
                if(i==logicChair){
                    this.gameUserAry[i].SetTing();
                }
            }
        }

                /**隐藏听牌者椅子号 */
        public HideTing(){
      
            for(var i:number=0;i<LHZMJMahjongDef.gPlayerNum;i++){
              
                    this.gameUserAry[i].HideTing();
                
            }
        }

    /**
     * 显示分数变化
     */
    public showScoreChange(scores: Array<number>): void {
        for (var i = 0; i < this.gameUserAry.length; i++) {
            if(cc.isValid(this.gameUserAry[i])){
                this.gameUserAry[i].AddScore(scores[LHZMJ.ins.iclass.logic2physicalChair(i)]);
            }
        }
    }
    /**
     * 重置显示分数
     */
    public reShowScoreChange(scores: Array<number>): void {
        for (var i = 0; i < this.gameUserAry.length; i++) {
            if(cc.isValid(this.gameUserAry[i])){
                this.gameUserAry[i].SetScore(scores[LHZMJ.ins.iclass.logic2physicalChair(i)]);
            }
        }
    }
    /**
     * 选择用户头像
     * */
    private onSelUserFace(logicChair: number): void {
        if (!LHZMJ.ins.iclass.isVideo()) {
            var chair: number = LHZMJ.ins.iclass.logic2physicalChair(logicChair);
           // if(!this.readyORgaming)
           // {
           //     M_LHZMJView.ins.UserData.showUserData(LHZMJ.ins.iclass.getTableConfig().isValid,LHZMJ.ins.iclass.getTablePlayerAry()[chair],LHZMJ_ReadyAndGaming.UserDataReadyPos[logicChair].x,LHZMJ_ReadyAndGaming.UserDataReadyPos[logicChair].y);
         //   }else{
             //   M_LHZMJView.ins.UserData.showUserData(LHZMJ.ins.iclass.getTableConfig().isValid, LHZMJ.ins.iclass.getTablePlayerAry()[chair], LHZMJ_ReadyAndGaming.UserDataGamingPos[logicChair].x, LHZMJ_ReadyAndGaming.UserDataGamingPos[logicChair].y);
                let point = new cc.Vec2(LHZMJ_ReadyAndGaming.UserDataGamingPos[logicChair].x, LHZMJ_ReadyAndGaming.UserDataGamingPos[logicChair].y);
                M_LHZMJClass.ins.showPlayerInfoForm(LHZMJ.ins.iclass.getTablePlayerAry()[chair],point, chair);
          //  }
        }
    }
    /**
     * 获取用户头像坐标
     * @param chair 椅子号
     */
    public GetPlayerPoint(chair:number){
        let point = new cc.Vec2(LHZMJ_ReadyAndGaming.UserDataGamingPos[chair].x, LHZMJ_ReadyAndGaming.UserDataGamingPos[chair].y);   
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
            var logicChair: number = LHZMJ.ins.iclass.physical2logicChair(chair);
            if(cc.isValid(this.gameUserAry[logicChair])){
                this.gameUserAry[logicChair].playerLook(clip);
            }
        }
    }


    public reflashPlayer(): void {
        for (var i: number = 0; i < this.gameUserAry.length; i++) {
            if (LHZMJ.ins.iclass.getTablePlayerAry()[LHZMJ.ins.iclass.logic2physicalChair(i)]){
                if(cc.isValid(this.gameUserAry[i])){
                    this.gameUserAry[i].SetPlayer(LHZMJ.ins.iclass.getTablePlayerAry()[LHZMJ.ins.iclass.logic2physicalChair(i)],this.readyORgaming);
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
            this.gameUserAry[0].SetMoney(this.getPlayerLeftMoneyNum(LHZMJ.ins.iclass.getTablePlayerAry()[LHZMJ.ins.iclass.getSelfChair()]));
            this.gameUserAry[0].ShowMoney(!LHZMJ.ins.iclass.getTableConfig().needHideUserMoney);
        }
    }
    /**
     * 显示
     * */
    onEnable(): void {

        //this.group_kickuser.active=false;
        this.group_userReady.active=false;
        this.group_kickuser.active = M_LHZMJClass.ins.SelfIsTableOwener && M_LHZMJClass.ins.TableConfig.alreadyGameNum==0;
        

        if (!LHZMJ.ins.iclass.getTableConfig().IsLaPaoZuo) {
            for (var i: number = 0; i < LHZMJMahjongDef.gPlayerNum; i++) {
                if(cc.isValid(this.gameUserAry[i])){
                    this.gameUserAry[i].ShowLaAndPao(false);
                }
            }
        }

        for(var i:number=0; i<LHZMJMahjongDef.gPlayerNum; i++){
            
            if(null == M_LHZMJClass.ins.TablePlayer[i]){
                this.OnPlayerLeave(i);
            }else{
                this.showChairPlayer(i,LHZMJ.ins.iclass.getTablePlayerAry()[i]);
            }
        }

        //检查断线玩家
        for (var i: number = 0; i < LHZMJMahjongDef.gPlayerNum; i++) {
            if ((null != LHZMJ.ins.iclass.getTablePlayerAry()[i]) && (LHZMJ.ins.iclass.getTablePlayerAry()[i].PlayerState == QL_Common.GState.OfflineInGame)) {
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
            //             this.gameUserAry[i].node.x=LHZMJ_ReadyAndGaming.ReadyPlayerPos[i].x;
            //             this.gameUserAry[i].node.y=LHZMJ_ReadyAndGaming.ReadyPlayerPos[i].y;
            //         }
            //     }
            //     for (var i = 0; i < this.voiceAry.length; i++) {
            //         if(cc.isValid(this.voiceAry[i])){
            //             this.voiceAry[i].node.x=LHZMJ_ReadyAndGaming.ReadyVoicePos[i].x;
            //             this.voiceAry[i].node.y=LHZMJ_ReadyAndGaming.ReadyVoicePos[i].y;
            //         }
            //     }
        //    }else{
                this.group_userReady.active=false;
                this.group_ready.active=this.readyORgaming;
               // this.group_kickuser.active=false;
              //  this.btn_kick.node.active=false;
                for (var i = 0; i < this.gameUserAry.length; i++) {
                    if(cc.isValid(this.gameUserAry[i])){
                        this.gameUserAry[i].node.x=LHZMJ_ReadyAndGaming.GamingPlayerPos[i].x;
                        this.gameUserAry[i].node.y=LHZMJ_ReadyAndGaming.GamingPlayerPos[i].y;
                    }
                }
                for (var i = 0; i < this.voiceAry.length; i++) {
                    if(cc.isValid(this.voiceAry[i])){
                        this.voiceAry[i].node.x=LHZMJ_ReadyAndGaming.GamingVoicePos[i].x;
                        this.voiceAry[i].node.y=LHZMJ_ReadyAndGaming.GamingVoicePos[i].y;
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
            var logicChair: number = LHZMJ.ins.iclass.physical2logicChair(chair);
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
       
        var logicChair: number = LHZMJ.ins.iclass.physical2logicChair(chairID);
        // this.group_imgready[logicChair].node.active = (QL_Common.GState.PlayerReady == newStatus);//|| Uyi.Common.GState.OfflineInGame == newStatus);
        if(cc.isValid(this.group_imgready[logicChair]) && !this.group_imgready[logicChair].node.active){
            this.group_imgready[logicChair].node.active = (QL_Common.GState.PlayerReady == newStatus);
        }
        if(QL_Common.GState.PlayerReady != newStatus)
        {
            
            // this.group_imgready[logicChair].node.active = QL_Common.GState.OfflineInGame == newStatus;//LHZMJ.ins.iclass.getTablePlayerAry()[chairID].DiamondsNum>=M_LHZMJClass.ins.gameMoneyNum && Uyi.Common.GState.OfflineInGame == newStatus;
            if(cc.isValid(this.group_imgready[logicChair]) &&!this.group_imgready[logicChair].node.active)
            {
                this.group_imgready[logicChair].node.active=LHZMJ.ins.iclass.getTableConfig().alreadyGameNum>0;
            }
        }
        if(cc.isValid(this.gameUserAry[logicChair])){
            if(QL_Common.GState.OfflineInGame == newStatus){
                this.gameUserAry[logicChair].Setoffline();
            }else{
                this.gameUserAry[logicChair].Hideoffline();
            }
        }
        
        
        // if((LHZMJ.ins.iclass.getSelfChair() == chairID) && (QL_Common.GState.PlayerReady == newStatus)){
        //     this._btn_ready.visible=false;
        //     //返回大厅消失
        //     this._btn_dissTable.visible = false;
        // }
    }
    
    public OnPlayerLeave(chairID: number): void {

        var logicChair: number = LHZMJ.ins.iclass.physical2logicChair(chairID);
        
        //头像不显示
        if(cc.isValid(this.gameUserAry[logicChair])){
            this.gameUserAry[logicChair].Clear();
        }
        if(logicChair!=0&&M_LHZMJClass.ins.SelfIsTableOwener){
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
        var logicChair: number =LHZMJ.ins.iclass.physical2logicChair(chairID);
        if(logicChair!=0&&M_LHZMJClass.ins.SelfIsTableOwener){
        this.group_kickusers[logicChair-1].node.active = true;
        }
        this.group_imguser[logicChair].node.active = true;
        if(cc.isValid(this.gameUserAry[logicChair])){
            this.gameUserAry[logicChair].SetPlayer(player,this.readyORgaming);
            //显示余额
            this.gameUserAry[logicChair].SetMoney(this.getPlayerLeftMoneyNum(player));
            this.gameUserAry[logicChair].ShowMoney(!LHZMJ.ins.iclass.getTableConfig().needHideUserMoney);

            this.group_imgready[logicChair].node.active = (QL_Common.GState.PlayerReady == player.PlayerState);
            if(QL_Common.GState.OfflineInGame == player.PlayerState)this.gameUserAry[logicChair].Setoffline();
            if(LHZMJ.ins.iclass.isCreateRoom() && (player.PlayerState == QL_Common.GState.OfflineInGame) && (LHZMJ.ins.iclass.getTableConfig().alreadyGameNum > 0)){// ||LHZMJ.ins.iclass.getTablePlayerAry()[chairID].DiamondsNum>=M_LHZMJClass.ins.gameMoneyNum)) {
                this.group_imgready[logicChair].node.active=true;
            }

           

            this.gameUserAry[logicChair].node.active=true;
        }
        
    }
    public SelfReady():void{
        if(LHZMJ.ins.iclass.getTablePlayerAry()[LHZMJ.ins.iclass.getSelfChair()].PlayerState==QL_Common.GState.SitDown){
            if(LHZMJ.ins.iclass.getTableConfig().isValid && LHZMJ.ins.iclass.getTableConfig().alreadyGameNum==0){
                this.btn_ready.node.active=true;
                this.btn_ready.node.x=-130;
                this.btn_invite.node.x=130;
                this.group_userReady.active=true;
            }else{
                this.onReady();
            }
        }
        else if(LHZMJ.ins.iclass.getTablePlayerAry()[LHZMJ.ins.iclass.getSelfChair()].PlayerState==QL_Common.GState.PlayerReady){
            if(LHZMJ.ins.iclass.getTableConfig().isValid && LHZMJ.ins.iclass.getTableConfig().alreadyGameNum==0){
                this.btn_ready.node.active=false;
                this.btn_invite.node.x=0;
                this.group_userReady.active=true;
            }
        }
    }
        
    private onReady():void{
        if (M_LHZMJClass.ins.TableConfig.IsTableCreatorPay == 2) {
            if (M_LHZMJClass.ins.SelfIsTableOwener) {
                //如果不够,开始求助
                if (M_LHZMJClass.ins.checkMoneyCanGame) {
                    if (M_LHZMJClass.ins.isSelfCreateRoom && (M_LHZMJClass.ins.TableConfig.alreadyGameNum > 0) && !M_LHZMJClass.ins.TableConfig.isPlayEnoughGameNum) {
                        //继续游戏
                        //this.dispatchEvent(new LHZMJEvent(LHZMJEvent.msg_goongame));
                    } else {
                        //发送准备
                        M_LHZMJView.ins.OnReady();
                    }
                    this.btn_ready.node.active = false;
                    this.btn_invite.node.x = 0;
                }
                else {
                    if (LHZMJ.ins.iclass.getTableStauts() != QL_Common.TableStatus.gameing) {
                        // M_LHZMJClass.ins.UiManager.ShowMsgBox("余额不足请先充值", this, () => { })
                        M_LHZMJView.ins.ShowMsgBox('余额不足请先充值！', "确定", () => {
                            //打开充值
                            M_LHZMJClass.ins.showPay();
                        }, this, "", null, null, () => {
                            //打开充值
                            LHZMJ.ins.iclass.exit();
                        }, this, );
                    }
                }
            } else {
                if (M_LHZMJClass.ins.isSelfCreateRoom && (M_LHZMJClass.ins.TableConfig.alreadyGameNum > 0) && !M_LHZMJClass.ins.TableConfig.isPlayEnoughGameNum) {
                    //继续游戏
                    //this.dispatchEvent(new LHZMJEvent(LHZMJEvent.msg_goongame));
                } else {
                    //发送准备
                    M_LHZMJView.ins.OnReady();
                }
                this.btn_ready.node.active = false;
                this.btn_invite.node.x = 0;
            }
        } else
            //如果不够,开始求助
            if (M_LHZMJClass.ins.checkMoneyCanGame) {
                if (M_LHZMJClass.ins.isSelfCreateRoom && (M_LHZMJClass.ins.TableConfig.alreadyGameNum > 0) && !M_LHZMJClass.ins.TableConfig.isPlayEnoughGameNum) {
                    //继续游戏
                    //this.dispatchEvent(new LHZMJEvent(LHZMJEvent.msg_goongame));
                } else {
                    //发送准备
                    M_LHZMJView.ins.OnReady();
                }
                this.btn_ready.node.active = false;
                this.btn_invite.node.x = 0;
            }
            else {
                if (LHZMJ.ins.iclass.getTableStauts() != QL_Common.TableStatus.gameing) {
                    // M_LHZMJClass.ins.UiManager.ShowMsgBox("余额不足请先充值", this, () => { })
                    M_LHZMJView.ins.ShowMsgBox('余额不足请先充值！', "确定", () => {
                        //打开充值
                        M_LHZMJClass.ins.showPay();
                    }, this, "", null, null, () => {
                        //打开充值
                        LHZMJ.ins.iclass.exit();
                    }, this, );
                }
            }
    }

    /**
     * 踢人
     * */
    private onKickUser(chair:number):void{
        if(!M_LHZMJClass.ins.isCreateRoom()){
            return;
        }
        let phychair: number = LHZMJ.ins.iclass.logic2physicalChair(chair);
        if(null == LHZMJ.ins.iclass.getTablePlayerAry()[phychair]){
            M_LHZMJView.ins.TipMsgShow("此位置没有玩家");
            return;
        }
        
        var selfChair : number = LHZMJ.ins.iclass.getSelfChair();

        // if(LHZMJ.ins.iclass.getTablePlayerAry()[phychair].VIPLV > LHZMJ.ins.iclass.getTablePlayerAry()[selfChair].VIPLV){
        //     M_LHZMJView.ins.ShowMsgBox("不可踢出VIP等级高于自己的玩家");
        //     return;
        // }
        
        //M_LHZMJView.ins.ShowMsgBox(`是否踢出玩家${LHZMJ.ins.iclass.getTablePlayerAry()[phychair].NickName}?`,"确定",()=>{
            M_LHZMJClass.ins.PleaseLeavePlayer(LHZMJ.ins.iclass.getTablePlayerAry()[phychair].PlayerID);
        //     this.group_kickuser.active=false;
        // },this,"取消");
    }


    public HideLaPao(): void {
        for (var i: number = 0; i < LHZMJMahjongDef.gPlayerNum; i++) {
            this.gameUserAry[i].ShowLaAndPao(false);
        }
    }

    /**
     * 设置庄家椅子号
     * */
    public set bankerChair(chair: number) {
        var logicChair: number = LHZMJ.ins.iclass.physical2logicChair(chair);
        for (var i: number = 0; i < LHZMJMahjongDef.gPlayerNum; i++) {
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
        var logicChair: number = LHZMJ.ins.iclass.physical2logicChair(chair);
        for (var i: number = 0; i < LHZMJMahjongDef.gPlayerNum; i++) {
            if(cc.isValid(this.gameUserAry[i])){
                if (i == logicChair) {
                    this.gameUserAry[i].SetTableowenr();
                }
                else {
                    this.gameUserAry[i].HideTableowenr();
                }
            }
        }
        if(!LHZMJ.ins.iclass.isVideo()){
            this.group_kickuser.active = M_LHZMJClass.ins.SelfIsTableOwener && M_LHZMJClass.ins.TableConfig.alreadyGameNum==0;
        }
        
    }

    public SetLa(la: Array<number>): void {
        for (var i: number = 0; i < LHZMJMahjongDef.gPlayerNum; i++) {
            var logicChair: number = LHZMJ.ins.iclass.physical2logicChair(i);
            if(cc.isValid(this.gameUserAry[logicChair])){
                this.gameUserAry[logicChair].SetLa(la[i]);
            }
        }
    }

    public SetPao(pao: Array<number>): void {
        for (var i: number = 0; i < LHZMJMahjongDef.gPlayerNum; i++) {
            var logicChair: number = LHZMJ.ins.iclass.physical2logicChair(i);
            if(cc.isValid(this.gameUserAry[logicChair])){
                this.gameUserAry[logicChair].SetPao(pao[i]);
            }
        }
    }

    /**
     * 设置断线玩家
     * */
    public set offlineChair(chair: number) {
        if(cc.isValid(this.gameUserAry[LHZMJ.ins.iclass.physical2logicChair(chair)])){
            this.gameUserAry[LHZMJ.ins.iclass.physical2logicChair(chair)].Setoffline();
        }
    }

    /**
     * 设置重连玩家
     * */
    public set reconnectChair(chair: number) {
        if(cc.isValid(this.gameUserAry[LHZMJ.ins.iclass.physical2logicChair(chair)])){
            this.gameUserAry[LHZMJ.ins.iclass.physical2logicChair(chair)].Hideoffline();
        }
    }

    /**
     * 玩家连庄
     * */
    public playerLianBanker(chair: number): void {
        var logicChair: number = LHZMJ.ins.iclass.physical2logicChair(chair);
        if(cc.isValid(this.gameUserAry[logicChair])){
            this.gameUserAry[logicChair].SetBanker();
        }
    }
    /**
     * 开始播放语音
     * */
    public playerPlayVoice(chair: number): void {
        if (this.node.active) {
            var logicChair: number = LHZMJ.ins.iclass.physical2logicChair(chair);
            if(cc.isValid(this.voiceAry[logicChair])){
                this.voiceAry[logicChair].startPlay();
            }
        }
    }
    /**
     * 停止播放语音
     * */
    public playerStopVoice(chair: number): void {
        var logicChair: number = LHZMJ.ins.iclass.physical2logicChair(chair);
        if(cc.isValid(this.voiceAry[logicChair])){
            this.voiceAry[logicChair].stopPlay();
        }
    }

    /**
     * 清理
     * */
    public clear(): void {
        cc.log("clear玩家信息初始化");
        for (let i = 0; i < LHZMJMahjongDef.gPlayerNum; i++) {
            this.group_voice[i].active = false;
        }
        for (let i = 0; i < this.gameUserAry.length; i++) {
            this.gameUserAry[i].Clear();
        }
    }

    private onShare():void{
        LHZMJ.ins.iview.OnButtonShare();
    }

    /**
     * 根据场地类型,获取玩家对应余额
     * */
    private getPlayerLeftMoneyNum(player: QL_Common.TablePlayer):number{
        if(null == player){
            return 0;
        }
        switch(LHZMJ.ins.iclass.getRoomData().CheckMoneyType){
            case QL_Common.CurrencyType.Gold:return player.GoldNum;
            case QL_Common.CurrencyType.Diamond:return player.DiamondsNum;
            case QL_Common.CurrencyType.QiDou:return player.QiDouNum;
        }
        return 0;
    }
}

