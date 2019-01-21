import MJ_ReadyUser from "../../MJCommon/MJ_ReadyUser";
import MJ_PlayVoiceStaus from "../../MJCommon/MJ_PlayVoiceStaus";
import { BBMJMahjongDef, BBMJ } from "../ConstDef/BBMJMahjongDef";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import M_BBMJClass from "../M_BBMJClass";
import M_BBMJView from "../M_BBMJView";
import MJ_ChatContext from "../../MJCommon/MJ_ChatContext";
import { BBMJMahjongAlgorithm1 } from "../BBMJMahjongAlgorithm/BBMJMahjongAlgorithm1";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_ReadyStatusUserInfo extends cc.Component {

    private static UserDataPos: Array<{ x: number,y: number }> = [
        { x: 0,y: -60 },
        { x: 170,y: 10 },
        { x: 0,y: 120 },
        { x: -170,y: 10 }
    ]; 

    @property([cc.Sprite])
    group_ready: cc.Sprite[]=[];

    @property([cc.Node])
    group_user: cc.Node[]=[];
    private userAry:Array<MJ_ReadyUser>;

    @property([cc.Node])
    group_chat: cc.Node[]=[];
    private chatAry:Array<MJ_ChatContext>;

    @property([cc.Button])
    group_invite: cc.Button[]=[];
    
    @property(cc.Node)
    group_kickuser: cc.Node=null;

    @property([cc.Button])
    group_kickusers: cc.Button[]=[];
    
    
    @property(cc.Button)
    btn_kick: cc.Button=null;

    @property([cc.Node])
    group_voice: cc.Node[]=[];
    private voiceAry:Array<MJ_PlayVoiceStaus>;
        @property(cc.Node)
    group_userReady: cc.Node=null;

    @property(cc.Button)
    btn_ready: cc.Button=null;

    @property(cc.Button)
    btn_invite: cc.Button=null;

    onLoad() {
        // init logic
        //this.init();
        
    }

    public init():void{
        cc.log("init BBMJ_ReadyStatusUserInfo")
        this.userAry=new Array<MJ_ReadyUser>();
        this.voiceAry=new Array<MJ_PlayVoiceStaus>();
        this.chatAry=new Array<MJ_ChatContext>();
        for(let i=0;i<BBMJMahjongDef.gPlayerNum;i++)
        {
            this.group_ready[i].node.active=false;

            let tempuser:MJ_ReadyUser=this.group_user[i].getComponent<MJ_ReadyUser>(MJ_ReadyUser);
            this.userAry.push(tempuser);
            this.userAry[i].init();

            this.group_chat[i].active=false;
            let tempchat:MJ_ChatContext=this.group_chat[i].getComponent<MJ_ChatContext>(MJ_ChatContext);
            tempchat.init();
            //tempchat.node.active=false;
            this.chatAry.push(tempchat);

            this.group_voice[i].active=false;
            let tempvoice:MJ_PlayVoiceStaus=this.group_voice[i].getComponent<MJ_PlayVoiceStaus>(MJ_PlayVoiceStaus);
            //tempvoice.node.active=false;
            this.voiceAry.push(tempvoice);
            
        }
        this.group_kickuser.active=false;
        this.btn_kick.node.active=false;
        this.btn_kick.node.on(cc.Node.EventType.TOUCH_END,() => {
                if(this.group_kickuser.active==false){
                    this.group_kickuser.active=true;
                }else{
                    this.group_kickuser.active=false;
                }
        },this);

        for(let i=0;i<BBMJMahjongDef.gPlayerNum-1;i++)
        {
            // this.group_invite[i].node.active=false;
            // this.group_invite[i].node.on(cc.Node.EventType.TOUCH_END,this.onShare,this);

            this.group_kickusers[i].node.active=true;
            this.group_kickusers[i].node.on(cc.Node.EventType.TOUCH_END,() => {
                    let chair: number = i+1;
                    this.onKickUser(chair);
            },this);
            const x=i+1;
            this.group_user[x].on(cc.Node.EventType.TOUCH_END,()=>{this.onSelUserFace(x);},this);
        }
    }
    /**
     * 刷新邀请
     * */
    public refreshInvite():void{

        for(var i:number=0; i<BBMJMahjongDef.gPlayerNum-1; i++){

            var logicChair : number = i+1;
            var physicChair : number = BBMJ.ins.iclass.logic2physicalChair(i + 1);
            
            //人人都有邀请功能
            if((BBMJ.ins.iclass.isCreateRoom()) && (null == BBMJ.ins.iclass.getTablePlayerAry()[BBMJ.ins.iclass.logic2physicalChair(i + 1)])) {
                this.group_invite[i].node.active = true;
            } else {
                this.group_invite[i].node.active = false;
            }
        }
    }

    /**
     * 选择用户头像
     * */
    private onSelUserFace(logicChair: number): void {
        var chair: number = BBMJ.ins.iclass.logic2physicalChair(logicChair);
        console.log("选择了用户"+logicChair+chair);
        //M_BBMJView.ins.UserData.showUserData(BBMJ.ins.iclass.getTablePlayerAry()[chair],BBMJ_ReadyStatusUserInfo.UserDataPos[logicChair].x,BBMJ_ReadyStatusUserInfo.UserDataPos[logicChair].y);
       M_BBMJView.ins.UserData.showUserData(BBMJ.ins.iclass.getTableConfig().isValid,BBMJ.ins.iclass.getTablePlayerAry()[chair],BBMJ_ReadyStatusUserInfo.UserDataPos[logicChair].x,BBMJ_ReadyStatusUserInfo.UserDataPos[logicChair].y);

    }
                    
    /**
     * 设置断线玩家
     * */
    public set offlineChair(chair: number) {
        //this._img_offline[BBMJ.ins.iclass.physical2logicChair(chair)].visible = true;
        // if(M_BBMJClass.ins.isSelfCreateRoom && (M_BBMJClass.ins.TableConfig.alreadyGameNum > 0)) {
        //     this._img_readyStatus[BBMJ.ins.iclass.physical2logicChair(chair)].visible = true;
        // }
        this.userAry[BBMJ.ins.iclass.physical2logicChair(chair)].Setoffline();
    }

    /**
     * 设置重连玩家
     * */
    public set reconnectChair(chair: number) {
        //this._img_offline[BBMJ.ins.iclass.physical2logicChair(chair)].visible = false;
        this.userAry[BBMJ.ins.iclass.physical2logicChair(chair)].Hideoffline();
    }                
                    

    private onShare():void{
        //var chair: number = BBMJ.ins.iclass.logic2physicalChair(lgchair);
        //M_BBMJView.ins.OnButtonShare();
        // M_BBMJClass.ins.showShare("合肥麻将邀请",chair);
        //             console.log(`分享内容:${M_BBMJClass.ins.ShareTitle}`);
        BBMJ.ins.iview.OnButtonShare();
    }


    public OnPlayerSitDown(chairID: number,player: QL_Common.TablePlayer): void {
        
        this.showChairPlayer(chairID,player);
        this.refreshInvite();
    }

    public OnTablePlayer(chairID: number,player: QL_Common.TablePlayer): void {
        this.showChairPlayer(chairID,player);
        this.refreshInvite();
    }

    /**
     * 玩家状态发生改变,如新的玩家坐下后默认状态为SitDown,然后玩家准备,新状态就是Ready状态,
     * 只记录其他在自己进入游戏的玩家的状态变化
     * */
    public OnPlayerStatusChange(chairID: number,newStatus: QL_Common.GState): void {
        
        var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chairID);
       // this.group_ready[logicChair].node.active = (QL_Common.GState.PlayerReady == newStatus);//|| Uyi.Common.GState.OfflineInGame == newStatus);
               if(!this.group_ready[logicChair].node.active){
            this.group_ready[logicChair].node.active = (QL_Common.GState.PlayerReady == newStatus);
        }
        if(QL_Common.GState.PlayerReady != newStatus)
        {
            
           // this.group_ready[logicChair].node.active = QL_Common.GState.OfflineInGame == newStatus;//BBMJ.ins.iclass.getTablePlayerAry()[chairID].DiamondsNum>=M_BBMJClass.ins.gameMoneyNum && Uyi.Common.GState.OfflineInGame == newStatus;
            if(!this.group_ready[logicChair].node.active)
            {
                this.group_ready[logicChair].node.active=BBMJ.ins.iclass.getTableConfig().alreadyGameNum>0;
            }
        }
        if(QL_Common.GState.OfflineInGame == newStatus){
            this.userAry[logicChair].Setoffline();
        }else{
            this.userAry[logicChair].Hideoffline();
        }
        
        // if((BBMJ.ins.iclass.getSelfChair() == chairID) && (QL_Common.GState.PlayerReady == newStatus)){
        //     this._btn_ready.visible=false;
        //     //返回大厅消失
        //     this._btn_dissTable.visible = false;
        // }
    }
    
    public OnPlayerLeave(chairID: number): void {

        var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chairID);
        
        //egret.Tween.removeTweens(this._img_look[logicChair]);

        //头像不显示
        this.userAry[logicChair].Clear();
        //表情不显示
        //this._img_look[logicChair].visible=false;
        
        //账号不显示
        //this._lbl_account[logicChair].visible=false;
        
        //准备字样消失
        this.group_ready[logicChair].node.active=false;
        
        //房主字样不显示
        //this._img_tableOwener[logicChair].visible=false;
        
        //余额不显示
        //this._lbl_scoreAry[logicChair].visible=false;

        //断线不显示
        //this._img_offline[logicChair].visible=false;
        
        /*if(chairID != BBMJ.ins.iclass.getSelfChair()){
            //显示邀请按钮
            this._btn_invite[logicChair - 1].visible = M_BBMJClass.ins.SelfIsTableOwener;
        }*/
        if(logicChair > 0){
            this.group_invite[logicChair - 1].node.active = BBMJ.ins.iclass.isCreateRoom();
        }
    }

    /**
     * 显示房主
     * */
    public set tableOwener(chair: number) {
        if(chair!=BBMJMahjongDef.gInvalidChar)
        {
            var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chair);
            for(var i: number = 0;i < BBMJMahjongDef.gPlayerNum;i++) {
                if(i == logicChair){
                    this.userAry[i].SetTableowenr();
                }else{
                    this.userAry[i].HideTableowenr();
                }
                
            }
        }
        this.btn_kick.node.active = M_BBMJClass.ins.SelfIsTableOwener;
        this.refreshInvite();
        /*
        if(M_BBMJClass.ins.SelfIsTableOwener){//如果我是房主,刷新邀请按钮状态
            this.refreshInvite();
        }*/
    }

    /**
     * 隐藏玩家余额
     * */
    public hideUserMoney():void{
        for(var j: number = 0;j < this.userAry.length; j++){
            this.userAry[j].ShowMoney(false);
        }
    }

    /**
     * 刷新自己余额
     * */
    public refreshSelfScore():void{
        this.userAry[0].SetMoney(this.getPlayerLeftMoneyNum(BBMJ.ins.iclass.getTablePlayerAry()[BBMJ.ins.iclass.getSelfChair()]));
        this.userAry[0].ShowMoney(!BBMJ.ins.iclass.getTableConfig().needHideUserMoney);
    }

    /**
     * 显示桌子上的玩家
     * */
    private showChairPlayer(chairID: number,player: QL_Common.TablePlayer){
        cc.log("showChairPlayer")
        var logicChair: number =BBMJ.ins.iclass.physical2logicChair(chairID);
        //cc.log(player.NickName+333);
        //显示玩家账号
        let ss="";
        if(BBMJMahjongAlgorithm1.strLen(player.NickName) > 16){
            ss = player.NickName.substring(0,12) + "...";
        }else{
            ss = player.NickName;
        }


        this.userAry[logicChair].SetUserInfo(player.FaceID,ss,player.Gender);
        
        //显示余额
        this.userAry[logicChair].SetMoney(this.getPlayerLeftMoneyNum(player));//showUserMoney(BBMJ.ins.iclass.getRoomData().CheckMoneyType,this.getPlayerLeftMoneyNum(player));
        this.userAry[logicChair].ShowMoney(!BBMJ.ins.iclass.getTableConfig().needHideUserMoney);
        

        //不是自己,隐藏邀请按钮
        /*if(player.PlayerID != M_BBMJClass.ins.userData.UserID) {
            //邀请按钮隐藏
            this._btn_invite[logicChair - 1].visible = false;
        }*/
        //this._img_readyStatus[logicChair].visible = (Uyi.Common.GState.PlayerReady == player.PlayerState ||Uyi.Common.GState.OfflineInGame == player.PlayerState);
        this.group_ready[logicChair].node.active = (QL_Common.GState.PlayerReady == player.PlayerState);
        if(QL_Common.GState.OfflineInGame == player.PlayerState)this.userAry[logicChair].Setoffline;
        if(BBMJ.ins.iclass.isCreateRoom() && (player.PlayerState == QL_Common.GState.OfflineInGame) && (BBMJ.ins.iclass.getTableConfig().alreadyGameNum > 0)){// ||BBMJ.ins.iclass.getTablePlayerAry()[chairID].DiamondsNum>=M_BBMJClass.ins.gameMoneyNum)) {
            this.group_ready[logicChair].node.active=true;
        }

        this.userAry[logicChair].node.active=true;
    }
    // public SelfReady():void{
    //     if(BBMJ.ins.iclass.getTablePlayerAry()[BBMJ.ins.iclass.getSelfChair()].PlayerState==QL_Common.GState.SitDown){
    //         this.onReady();
    //     }
    // }
     public SelfReady():void{
        if(BBMJ.ins.iclass.getTablePlayerAry()[BBMJ.ins.iclass.getSelfChair()].PlayerState==QL_Common.GState.SitDown){
            if(BBMJ.ins.iclass.getTableConfig().isValid && BBMJ.ins.iclass.getTableConfig().alreadyGameNum==0){
                this.btn_ready.node.active=true;
                this.btn_ready.node.x=-130;
                this.btn_invite.node.x=130;
                this.group_userReady.active=true;
            }else{
                this.onReady();
            }
        }
        else if(BBMJ.ins.iclass.getTablePlayerAry()[BBMJ.ins.iclass.getSelfChair()].PlayerState==QL_Common.GState.PlayerReady){
            if(BBMJ.ins.iclass.getTableConfig().isValid && BBMJ.ins.iclass.getTableConfig().alreadyGameNum==0){
                this.btn_ready.node.active=false;
                this.btn_invite.node.x=0;
                this.group_userReady.active=true;
            }
        }
    }
        
    private onReady():void{
        
        //如果不够,开始求助
        if(M_BBMJClass.ins.checkMoneyCanGame){
            if(M_BBMJClass.ins.isSelfCreateRoom && (M_BBMJClass.ins.TableConfig.alreadyGameNum > 0) && !M_BBMJClass.ins.TableConfig.isPlayEnoughGameNum) {
                //继续游戏
                //this.dispatchEvent(new BBMJEvent(BBMJEvent.msg_goongame));
            }else{
                //发送准备
                M_BBMJView.ins.OnReady();
            }
            
            // //解散桌子不能用
            // this._btn_dissTable.visible=false;
            // this._btn_ready.visible=false;
            this.btn_ready.node.active=false;
            this.btn_invite.node.x=0;
        }
         else {
            if(BBMJ.ins.iclass.getTableStauts()!=QL_Common.TableStatus.gameing)
            {
                M_BBMJView.ins.MsgBox.showMsgBox('余额不足请先充值！', "确定", () => {
                    //打开充值
                    BBMJ.ins.iclass.exit();
                }, this,"",null,null,() => {
                    //打开充值
                    BBMJ.ins.iclass.exit();
                }, this,);
            }
        } 
        // else{                 
        //     var tipMsg: string = `您的游戏币已经不足,无法继续游戏,本次共需要:${TranslateMoneyTypeName(BBMJ.ins.iclass.getRoomData().TableCostMoneyType)}X${M_BBMJClass.ins.gameMoneyNum},点击关闭将会返回大厅。您还可以选择：`;
        //     if(M_BBMJClass.ins.isSelfCreateRoom){
        //         //发起求助
        //         M_BBMJView.ins.MsgBox.showMsgBox(tipMsg,"去充值",() => {
        //             //充值 
        //             M_BBMJClass.ins.showPay();
        //         },this,"",null,null,() => {
        //             //退出游戏
        //             M_BBMJClass.ins.ExitGame();
        //         },this); 
        //         /*
        //         //发起求助
        //         M_HZLZMJView.ins.MsgBox.showMsgBox(tipMsg,"充值",() => {
        //             //充值 
        //             M_HZLZMJClass.ins.showPay();
        //         },this,"求助",() => {
        //             M_HZLZMJView.ins.ReadyStatusUserInfo.showFriendHelp();
        //         },this,() => {
        //             //退出游戏
        //             M_HZLZMJClass.ins.ExitGame();
        //         },this);
        //         */
        //     }else{
        //         //发起求助
        //         M_BBMJView.ins.MsgBox.showMsgBox(tipMsg,"去充值",() => {
        //             //充值 
        //             M_BBMJClass.ins.showPay();
        //         },this,"",null,null,() => {
        //             //退出游戏
        //             M_BBMJClass.ins.ExitGame();
        //         },this);   
        //     }
        // }
    }
    /**
     * 玩家表情
     */
    public playerLook(chair:number,clip: cc.AnimationClip):void{
        if(this.node.active)
        {
            var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chair);
            this.userAry[logicChair].playerLook(clip);
        }
        /*egret.Tween.get(this._img_look[logicChair]).wait(3000).call(() => {
            this._img_look[logicChair].visible=false;
            this._img_face[logicChair].visible=true;
        },this);*/
    }
    /**
     * 踢人
     * */
    private onKickUser(chair:number):void{
        let phychair: number = BBMJ.ins.iclass.logic2physicalChair(chair);
        if(null == BBMJ.ins.iclass.getTablePlayerAry()[phychair]){
            M_BBMJView.ins.TipMsgView.showTip("此位置没有玩家");
            return;
        }
        
        var selfChair : number = BBMJ.ins.iclass.getSelfChair();
        /*
        if(0 >= XZMJ.ins.iclass.getTablePlayerAry()[selfChair].VIPLV){
            M_XZMJView.ins.MsgBox.showMsgBox("只有VIP玩家才可进行踢人操作");
            return;
        }*/
        
        if(BBMJ.ins.iclass.getTablePlayerAry()[chair].VIPLV > BBMJ.ins.iclass.getTablePlayerAry()[selfChair].VIPLV){
            M_BBMJView.ins.MsgBox.showMsgBox("不可踢出VIP等级高于自己的玩家");
            return;
        }
        
        M_BBMJView.ins.MsgBox.showMsgBox(`是否踢出玩家${BBMJ.ins.iclass.getTablePlayerAry()[chair].NickName}?`,"确定",()=>{
            M_BBMJClass.ins.PleaseLeavePlayer(BBMJ.ins.iclass.getTablePlayerAry()[chair].PlayerID);
            this.group_kickuser.active=false;
        },this,"取消");
    }

    onEnable():void{
        this.group_kickuser.active=false;
        this.group_userReady.active=false;
        this.btn_kick.node.active = M_BBMJClass.ins.SelfIsTableOwener;
        
        
        // this._btn_ready.visible=true;
        // this._btn_dissTable.visible=true;
        for(var i:number=0; i<BBMJMahjongDef.gPlayerNum; i++){
            
            if(null == M_BBMJClass.ins.TablePlayer[i]){
                this.OnPlayerLeave(i);
            }else{
                this.showChairPlayer(i,BBMJ.ins.iclass.getTablePlayerAry()[i]);
            }
        }
    }
    /**
     * 玩家聊天消息
     * */
    public playerChat(chair: number,chatMsg: string): void {
        if(this.node.active)
        {
            var logicChair : number = BBMJ.ins.iclass.physical2logicChair(chair);
            this.chatAry[logicChair].ShowChat(chatMsg);
        }
    }
    /**
     * 开始播放语音
     * */
    public playerPlayVoice(chair: number): void {
        if(this.node.active)
        {
            var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chair);
            this.voiceAry[logicChair].startPlay();
        }
    }
    /**
     * 停止播放语音
     * */
    public playerStopVoice(chair: number): void {
        var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chair);
        this.voiceAry[logicChair].stopPlay();
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
