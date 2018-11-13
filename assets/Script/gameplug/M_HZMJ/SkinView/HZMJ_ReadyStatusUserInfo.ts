import MJ_ReadyUser from "../../MJCommon/MJ_ReadyUser";
import MJ_PlayVoiceStaus from "../../MJCommon/MJ_PlayVoiceStaus";
import { HZMJMahjongDef, HZMJ } from "../ConstDef/HZMJMahjongDef";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { HZMJMahjongAlgorithm } from "../HZMJMahjongAlgorithm/HZMJMahjongAlgorithm";
import M_HZMJClass from "../M_HZMJClass";
import M_HZMJView from "../M_HZMJView";
import MJ_ChatContext from "../../MJCommon/MJ_ChatContext";
import M_HZMJVoice from "../M_HZMJVoice";
const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_ReadyStatusUserInfo extends cc.Component {

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
        cc.log("init HZMJ_ReadyStatusUserInfo")
        this.userAry=new Array<MJ_ReadyUser>();
        this.voiceAry=new Array<MJ_PlayVoiceStaus>();
        this.chatAry=new Array<MJ_ChatContext>();
        for(let i=0;i<HZMJMahjongDef.gPlayerNum;i++)
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

        for(let i=0;i<HZMJMahjongDef.gPlayerNum-1;i++)
        {
            this.group_invite[i].node.active=false;
            this.group_invite[i].node.on(cc.Node.EventType.TOUCH_END,this.onShare,this);

            this.group_kickusers[i].node.active=true;
            this.group_kickusers[i].node.on(cc.Node.EventType.TOUCH_END,() => {
                    let chair: number = HZMJ.ins.iclass.logic2physicalChair(i+1);
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

        for(var i:number=0; i<HZMJMahjongDef.gPlayerNum-1; i++){

            var logicChair : number = i+1;
            var physicChair : number = HZMJ.ins.iclass.logic2physicalChair(i + 1);
            
            //人人都有邀请功能
            if((HZMJ.ins.iclass.isCreateRoom()) && (null == HZMJ.ins.iclass.getTablePlayerAry()[HZMJ.ins.iclass.logic2physicalChair(i + 1)])) {
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
        var chair: number = HZMJ.ins.iclass.logic2physicalChair(logicChair);
        console.log("选择了用户"+logicChair+chair);
        //M_HZMJView.ins.UserData.showUserData(HZMJ.ins.iclass.getTablePlayerAry()[chair],HZMJ_ReadyStatusUserInfo.UserDataPos[logicChair].x,HZMJ_ReadyStatusUserInfo.UserDataPos[logicChair].y);
       M_HZMJView.ins.UserData.showUserData(HZMJ.ins.iclass.getTableConfig().isValid,HZMJ.ins.iclass.getTablePlayerAry()[chair],HZMJ_ReadyStatusUserInfo.UserDataPos[logicChair].x,HZMJ_ReadyStatusUserInfo.UserDataPos[logicChair].y);

    }
                    
    /**
     * 设置断线玩家
     * */
    public set offlineChair(chair: number) {
        //this._img_offline[HZMJ.ins.iclass.physical2logicChair(chair)].visible = true;
        // if(M_HZMJClass.ins.isSelfCreateRoom && (M_HZMJClass.ins.TableConfig.alreadyGameNum > 0)) {
        //     this._img_readyStatus[HZMJ.ins.iclass.physical2logicChair(chair)].visible = true;
        // }
        this.userAry[HZMJ.ins.iclass.physical2logicChair(chair)].Setoffline();
    }

    /**
     * 设置重连玩家
     * */
    public set reconnectChair(chair: number) {
        //this._img_offline[HZMJ.ins.iclass.physical2logicChair(chair)].visible = false;
        this.userAry[HZMJ.ins.iclass.physical2logicChair(chair)].Hideoffline();
    }                
                    

    private onShare():void{
        //var chair: number = HZMJ.ins.iclass.logic2physicalChair(lgchair);
        //M_HZMJView.ins.OnButtonShare();
        // M_HZMJClass.ins.showShare("合肥麻将邀请",chair);
        //             console.log(`分享内容:${M_HZMJClass.ins.ShareTitle}`);
        HZMJ.ins.iview.OnButtonShare();
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
        
        var logicChair: number = HZMJ.ins.iclass.physical2logicChair(chairID);
       // this.group_ready[logicChair].node.active = (QL_Common.GState.PlayerReady == newStatus);//|| Uyi.Common.GState.OfflineInGame == newStatus);
           if(!this.group_ready[logicChair].node.active){
            this.group_ready[logicChair].node.active = (QL_Common.GState.PlayerReady == newStatus);
        }
        if(QL_Common.GState.PlayerReady != newStatus)
        {
            
           // this.group_ready[logicChair].node.active = QL_Common.GState.OfflineInGame == newStatus;//HZMJ.ins.iclass.getTablePlayerAry()[chairID].DiamondsNum>=M_HZMJClass.ins.gameMoneyNum && Uyi.Common.GState.OfflineInGame == newStatus;
            if(!this.group_ready[logicChair].node.active)
            {
                this.group_ready[logicChair].node.active=HZMJ.ins.iclass.getTableConfig().alreadyGameNum>0;
            }
        }
        if(QL_Common.GState.OfflineInGame == newStatus){
            this.userAry[logicChair].Setoffline();
        }else{
            this.userAry[logicChair].Hideoffline();
        }
        
        // if((HZMJ.ins.iclass.getSelfChair() == chairID) && (QL_Common.GState.PlayerReady == newStatus)){
        //     this._btn_ready.visible=false;
        //     //返回大厅消失
        //     this._btn_dissTable.visible = false;
        // }
    }
    
    public OnPlayerLeave(chairID: number): void {

        var logicChair: number = HZMJ.ins.iclass.physical2logicChair(chairID);
        
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
        
        /*if(chairID != HZMJ.ins.iclass.getSelfChair()){
            //显示邀请按钮
            this._btn_invite[logicChair - 1].visible = M_HZMJClass.ins.SelfIsTableOwener;
        }*/
        if(logicChair > 0){
            this.group_invite[logicChair - 1].node.active = HZMJ.ins.iclass.isCreateRoom();
        }
    }

    /**
     * 显示房主
     * */
    public set tableOwener(chair: number) {
        if(chair!=HZMJMahjongDef.gInvalidChar)
        {
            var logicChair: number = HZMJ.ins.iclass.physical2logicChair(chair);
            for(var i: number = 0;i < HZMJMahjongDef.gPlayerNum;i++) {
                if(i == logicChair){
                    this.userAry[i].SetTableowenr();
                }else{
                    this.userAry[i].HideTableowenr();
                }
                
            }
        }
        this.btn_kick.node.active = M_HZMJClass.ins.SelfIsTableOwener;
        this.refreshInvite();
        /*
        if(M_HZMJClass.ins.SelfIsTableOwener){//如果我是房主,刷新邀请按钮状态
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
        this.userAry[0].SetMoney(this.getPlayerLeftMoneyNum(HZMJ.ins.iclass.getTablePlayerAry()[HZMJ.ins.iclass.getSelfChair()]));
        this.userAry[0].ShowMoney(!HZMJ.ins.iclass.getTableConfig().needHideUserMoney);
    }

    /**
     * 显示桌子上的玩家
     * */
    private showChairPlayer(chairID: number,player: QL_Common.TablePlayer){
        cc.log("showChairPlayer")
        var logicChair: number =HZMJ.ins.iclass.physical2logicChair(chairID);
        //cc.log(player.NickName+333);
        //显示玩家账号
        let ss="";
        if(HZMJMahjongAlgorithm.strLen(player.NickName) > 16){
            ss = player.NickName.substring(0,12) + "...";
        }else{
            ss = player.NickName;
        }


        this.userAry[logicChair].SetUserInfo(player.FaceID,ss,player.Gender);
        
        //显示余额
        this.userAry[logicChair].SetMoney(this.getPlayerLeftMoneyNum(player));//showUserMoney(HZMJ.ins.iclass.getRoomData().CheckMoneyType,this.getPlayerLeftMoneyNum(player));
        this.userAry[logicChair].ShowMoney(!HZMJ.ins.iclass.getTableConfig().needHideUserMoney);
        

        //不是自己,隐藏邀请按钮
        /*if(player.PlayerID != M_HZMJClass.ins.userData.UserID) {
            //邀请按钮隐藏
            this._btn_invite[logicChair - 1].visible = false;
        }*/
        //this._img_readyStatus[logicChair].visible = (Uyi.Common.GState.PlayerReady == player.PlayerState ||Uyi.Common.GState.OfflineInGame == player.PlayerState);
        this.group_ready[logicChair].node.active = (QL_Common.GState.PlayerReady == player.PlayerState);
        if(QL_Common.GState.OfflineInGame == player.PlayerState)this.userAry[logicChair].Setoffline;
        if(HZMJ.ins.iclass.isCreateRoom() && (player.PlayerState == QL_Common.GState.OfflineInGame) && (HZMJ.ins.iclass.getTableConfig().alreadyGameNum > 0)){// ||HZMJ.ins.iclass.getTablePlayerAry()[chairID].DiamondsNum>=M_HZMJClass.ins.gameMoneyNum)) {
            this.group_ready[logicChair].node.active=true;
        }

        this.userAry[logicChair].node.active=true;
    }
    public SelfReady():void{
         if(HZMJ.ins.iclass.getTablePlayerAry()[HZMJ.ins.iclass.getSelfChair()].PlayerState==QL_Common.GState.SitDown){
            if(HZMJ.ins.iclass.getTableConfig().isValid && HZMJ.ins.iclass.getTableConfig().alreadyGameNum==0){
                this.btn_ready.node.active=true;
                this.btn_ready.node.x=-130;
                this.btn_invite.node.x=130;
                this.group_userReady.active=true;
            }else{
                this.onReady();
            }
        }
        else if(HZMJ.ins.iclass.getTablePlayerAry()[HZMJ.ins.iclass.getSelfChair()].PlayerState==QL_Common.GState.PlayerReady){
            if(HZMJ.ins.iclass.getTableConfig().isValid && HZMJ.ins.iclass.getTableConfig().alreadyGameNum==0){
                this.btn_ready.node.active=false;
                this.btn_invite.node.x=0;
                this.group_userReady.active=true;
            }
        }
    }
        
    private onReady():void{
        M_HZMJVoice.PlayCardType(`/sound/1/man_ready.mp3`);
         //let sex:number=this.TablePlayer[playerOutCard.chair].Gender==1?1:2;
        //如果不够,开始求助
        if(M_HZMJClass.ins.checkMoneyCanGame){
            if(M_HZMJClass.ins.isSelfCreateRoom && (M_HZMJClass.ins.TableConfig.alreadyGameNum > 0) && !M_HZMJClass.ins.TableConfig.isPlayEnoughGameNum) {
                //继续游戏
                //this.dispatchEvent(new HZMJEvent(HZMJEvent.msg_goongame));
            }else{
                //发送准备
                M_HZMJView.ins.OnReady();
            }
            
            // //解散桌子不能用
            // this._btn_dissTable.visible=false;
            // this._btn_ready.visible=false;
             this.btn_ready.node.active=false;
            this.btn_invite.node.x=0;
        }
         else {
            if(HZMJ.ins.iclass.getTableStauts()!=QL_Common.TableStatus.gameing)
            {
                M_HZMJView.ins.MsgBox.showMsgBox('余额不足请先充值！', "确定", () => {
                    //打开充值
                    HZMJ.ins.iclass.exit();
                }, this,"",null,null,() => {
                    //打开充值
                    HZMJ.ins.iclass.exit();
                }, this,);
            }
        } 
        // else{                 
        //     var tipMsg: string = `您的游戏币已经不足,无法继续游戏,本次共需要:${TranslateMoneyTypeName(HZMJ.ins.iclass.getRoomData().TableCostMoneyType)}X${M_HZMJClass.ins.gameMoneyNum},点击关闭将会返回大厅。您还可以选择：`;
        //     if(M_HZMJClass.ins.isSelfCreateRoom){
        //         //发起求助
        //         M_HZMJView.ins.MsgBox.showMsgBox(tipMsg,"去充值",() => {
        //             //充值 
        //             M_HZMJClass.ins.showPay();
        //         },this,"",null,null,() => {
        //             //退出游戏
        //             M_HZMJClass.ins.ExitGame();
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
        //         M_HZMJView.ins.MsgBox.showMsgBox(tipMsg,"去充值",() => {
        //             //充值 
        //             M_HZMJClass.ins.showPay();
        //         },this,"",null,null,() => {
        //             //退出游戏
        //             M_HZMJClass.ins.ExitGame();
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
            var logicChair: number = HZMJ.ins.iclass.physical2logicChair(chair);
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
        if(null == HZMJ.ins.iclass.getTablePlayerAry()[chair]){
            M_HZMJView.ins.TipMsgView.showTip("此位置没有玩家");
            return;
        }
        
        var selfChair : number = HZMJ.ins.iclass.getSelfChair();
        /*
        if(0 >= XZMJ.ins.iclass.getTablePlayerAry()[selfChair].VIPLV){
            M_XZMJView.ins.MsgBox.showMsgBox("只有VIP玩家才可进行踢人操作");
            return;
        }*/
        
        if(HZMJ.ins.iclass.getTablePlayerAry()[chair].VIPLV > HZMJ.ins.iclass.getTablePlayerAry()[selfChair].VIPLV){
            M_HZMJView.ins.MsgBox.showMsgBox("不可踢出VIP等级高于自己的玩家");
            return;
        }
        
        M_HZMJView.ins.MsgBox.showMsgBox(`是否踢出玩家${HZMJ.ins.iclass.getTablePlayerAry()[chair].NickName}?`,"确定",()=>{
            M_HZMJClass.ins.PleaseLeavePlayer(HZMJ.ins.iclass.getTablePlayerAry()[chair].PlayerID);
            this.group_kickuser.active=false;
        },this,"取消");
    }

    onEnable():void{
        this.group_kickuser.active=false;
          this.group_userReady.active=false;
        this.btn_kick.node.active = M_HZMJClass.ins.SelfIsTableOwener;
        
        
        // this._btn_ready.visible=true;
        // this._btn_dissTable.visible=true;
        for(var i:number=0; i<HZMJMahjongDef.gPlayerNum; i++){
            
            if(null == M_HZMJClass.ins.TablePlayer[i]){
                this.OnPlayerLeave(i);
            }else{
                this.showChairPlayer(i,HZMJ.ins.iclass.getTablePlayerAry()[i]);
            }
        }
    }
    /**
     * 玩家聊天消息
     * */
    public playerChat(chair: number,chatMsg: string): void {
        if(this.node.active)
        {
            var logicChair : number = HZMJ.ins.iclass.physical2logicChair(chair);
            this.chatAry[logicChair].ShowChat(chatMsg);
        }
    }
    /**
     * 开始播放语音
     * */
    public playerPlayVoice(chair: number): void {
        if(this.node.active)
        {
            var logicChair: number = HZMJ.ins.iclass.physical2logicChair(chair);
            this.voiceAry[logicChair].startPlay();
        }
    }
    /**
     * 停止播放语音
     * */
    public playerStopVoice(chair: number): void {
        var logicChair: number = HZMJ.ins.iclass.physical2logicChair(chair);
        this.voiceAry[logicChair].stopPlay();
    }
    /**
     * 根据场地类型,获取玩家对应余额
     * */
    private getPlayerLeftMoneyNum(player: QL_Common.TablePlayer):number{
        if(null == player){
            return 0;
        }
        switch(HZMJ.ins.iclass.getRoomData().CheckMoneyType){
            case QL_Common.CurrencyType.Gold:return player.GoldNum;
            case QL_Common.CurrencyType.RoomCard:return player.DiamondsNum;
            case QL_Common.CurrencyType.GoldCard:return player.GoldCardNum;
        }
        return 0;
    }
    
}
