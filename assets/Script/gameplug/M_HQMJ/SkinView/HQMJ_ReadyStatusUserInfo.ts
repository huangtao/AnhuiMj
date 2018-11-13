import MJ_ReadyUser from "../../MJCommon/MJ_ReadyUser";
import MJ_PlayVoiceStaus from "../../MJCommon/MJ_PlayVoiceStaus";
import { HQMJMahjongDef, HQMJ } from '../ConstDef/HQMJMahjongDef';
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { HQMJMahjongAlgorithm } from "../HQMJMahjongAlgorithm/HQMJMahjongAlgorithm";
import M_HQMJClass from '../M_HQMJClass';
import M_HQMJView from "../M_HQMJView";
import MJ_ChatContext from "../../MJCommon/MJ_ChatContext";
import M_HQMJVoice from "../M_HQMJVoice";
import UiManager from '../../../Manager/UiManager';
import M_HQMJVideoClass from '../M_HQMJVideoClass';

const { ccclass, property } = cc._decorator;

@ccclass
export default class HQMJ_ReadyStatusUserInfo extends cc.Component {

    private static UserDataPos: Array<{ x: number,y: number }> = [
        { x: -5,y: -60+30 },
        { x: -5,y: -60+30 },
        { x: -5,y: -60+30 },
        { x: -5,y: -60+30 }
        // { x: 170,y: 10 },
        // { x: 0,y: 80 },
        // { x: -170,y: 10 }
    ]; 


    private static _ins: HQMJ_ReadyStatusUserInfo;
    /**
    * 单例
    * */
    public static get ins(): HQMJ_ReadyStatusUserInfo { return this._ins; }

    @property([cc.Sprite])
    group_ready: cc.Sprite[]=[];

    //玩家头像框
    @property([cc.Node])
    group_user: cc.Node[]=[];
    private userAry:Array<MJ_ReadyUser>;

    @property([cc.Node])
    group_chat: cc.Node[]=[];
    private chatAry:Array<MJ_ChatContext>;
    
    // @property(cc.Node)
    // group_kickuser: cc.Node=null;

    // @property([cc.Button])
    // group_kickusers: cc.Button[]=[];
    
    // @property(cc.Button)
    // btn_kick: cc.Button=null;
    @property(cc.Button)
    kickBtn1:cc.Button = null;
    @property(cc.Button)
    kickBtn2:cc.Button = null;
    @property(cc.Button)
    kickBtn3:cc.Button = null;


    @property([cc.Node])
    group_voice: cc.Node[]=[];
    private voiceAry:Array<MJ_PlayVoiceStaus>;
    @property(cc.Node)
    group_userReady: cc.Node=null;

    @property(cc.Button)
    btn_ready: cc.Button=null;

    @property(cc.Button)
    btn_invite: cc.Button=null;

    private _hqmjClass: any = null;

    public set HQMJClass(value: any){
        this._hqmjClass = value;
    }

    public get HQMJClass():any{
       return this._hqmjClass;
    }
    
    onLoad() {
        // init logic
        //this.init();
        for(var i=0;i<4;i++){
            this.userAry[i].node.active = false;
        }        
    }

    public init():void{
        cc.log("init HQMJ_ReadyStatusUserInfo")
        this.userAry=new Array<MJ_ReadyUser>();
        this.voiceAry=new Array<MJ_PlayVoiceStaus>();
        this.chatAry=new Array<MJ_ChatContext>();
        for(let i=0;i<HQMJMahjongDef.gPlayerNum;i++)
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
        // this.group_kickuser.active=false;
        // this.btn_kick.node.active=false;
        // this.btn_kick.node.on(cc.Node.EventType.TOUCH_END,() => {
        //         if(this.group_kickuser.active==false){
        //             this.group_kickuser.active=true;
        //         }else{
        //             this.group_kickuser.active=false;
        //         }
        // },this);

        this.kickBtn1.node.on(cc.Node.EventType.TOUCH_END,() => {
                let chair: number = this.HQMJClass.logic2physicalChair(1);
                this.onKickUser(chair);
        },this);
        this.kickBtn2.node.on(cc.Node.EventType.TOUCH_END,() => {
                let chair: number = this.HQMJClass.logic2physicalChair(2);
                this.onKickUser(chair);
        },this);
        this.kickBtn3.node.on(cc.Node.EventType.TOUCH_END,() => {
                let chair: number = this.HQMJClass.logic2physicalChair(3);
                this.onKickUser(chair);
        },this);           

        for(let i=0;i<HQMJMahjongDef.gPlayerNum;i++){
            this.group_user[i].on(cc.Node.EventType.TOUCH_END,()=>{this.onSelUserFace(i);},this);
        }
        
    }
    /**
     * 获取用户头像坐标
     * @param chair 椅子号
     */
    public GetPlayerPoint(chair:number){
        let point = new cc.Vec2(HQMJ_ReadyStatusUserInfo.UserDataGamingPos[chair].x, HQMJ_ReadyStatusUserInfo.UserDataGamingPos[chair].y);   
        switch(chair){
            case 0:point.x-=240;
                    point.y+=30;
                    break;
            case 1:point.x+=220;
                    point.y+=50;
                    break;
            case 2:point.x+=205;
                    point.y+=100;
                    break;
            case 3:point.x-=230;
                    point.y+=60;
                    break;
        }
        return point;
     }
    private static UserDataGamingPos: Array<{ x: number, y: number }> = [
        { x: -300, y: -250 },
        { x: 350, y: 50 },
        { x: 150, y: 230 },
        { x: -350, y: 50 }
    ];
    /**
     * 选择用户头像
     * */
    private onSelUserFace(logicChair: number): void {
        M_HQMJVoice.PlayCardType(`/sound/Button32.mp3`);
        var chair: number = this.HQMJClass.logic2physicalChair(logicChair);
        console.log("选择了用户"+logicChair+chair);
        //M_HQMJView.ins.UserData.showUserData(this.HQMJClass.getTablePlayerAry()[chair],HQMJ_ReadyStatusUserInfo.UserDataPos[logicChair].x,HQMJ_ReadyStatusUserInfo.UserDataPos[logicChair].y);
       //M_HQMJView.ins.UserData.showUserData(this.HQMJClass.getTableConfig().isValid,this.HQMJClass.getTablePlayerAry()[chair],HQMJ_ReadyStatusUserInfo.UserDataPos[logicChair].x,HQMJ_ReadyStatusUserInfo.UserDataPos[logicChair].y);
       let point = new cc.Vec2(HQMJ_ReadyStatusUserInfo.UserDataGamingPos[logicChair].x, HQMJ_ReadyStatusUserInfo.UserDataGamingPos[logicChair].y);
       M_HQMJClass.ins.showPlayerInfoForm(HQMJ.ins.iclass.getTablePlayerAry()[chair],point, chair);
    }
    /**
     * 设置断线玩家
     * */
    public set offlineChair(chair: number) {
        //this._img_offline[this.HQMJClass.physical2logicChair(chair)].visible = true;
        // if(M_HQMJClass.ins.isSelfCreateRoom && (M_HQMJClass.ins.TableConfig.alreadyGameNum > 0)) {
        //     this._img_readyStatus[this.HQMJClass.physical2logicChair(chair)].visible = true;
        // }
        this.userAry[this.HQMJClass.physical2logicChair(chair)].Setoffline();
    }

    /**
     * 设置重连玩家
     * */
    public set reconnectChair(chair: number) {
        //this._img_offline[this.HQMJClass.physical2logicChair(chair)].visible = false;
        this.userAry[this.HQMJClass.physical2logicChair(chair)].Hideoffline();
    }                
                    
    private onShare():void{
        //var chair: number = this.HQMJClass.logic2physicalChair(lgchair);
        //M_HQMJView.ins.OnButtonShare();
        // M_HQMJClass.ins.showShare("合肥麻将邀请",chair);
        //             console.log(`分享内容:${M_HQMJClass.ins.ShareTitle}`);
        // HQMJ.ins.iview.OnButtonShare();
        var curPlayer = M_HQMJClass.ins.getTablePlayerAry();
        let curPlayerCount:number=0;//查看当前桌上玩家数
        for(let i:number=0;i<curPlayer.length;i++){
            if(null != curPlayer[i])
                curPlayerCount++;
        }
        var selfChair = M_HQMJClass.ins.SelfChair;
        var playerName = curPlayer[selfChair].NickName;//发送邀请玩家的name

        let title : string;
        let context : string;
        let tableID : number = M_HQMJClass.ins.TableID;
        if(M_HQMJClass.ins.TableConfig.tableWhere > 0)
            title = "霍邱麻将 亲友圈房间号:" + tableID + " 圈号" + M_HQMJClass.ins.TableConfig.tableWhere.toString()+" "+curPlayerCount+"缺"+(4-curPlayerCount);
        else
            title = "霍邱麻将 房间号:" + tableID + " "+curPlayerCount+"缺"+(4-curPlayerCount);
        let wanfa:string=  "";

        if(M_HQMJClass.ins.TableConfig.IsTableCreatorPay == 1)
            wanfa = "AA支付,";
        if(M_HQMJClass.ins.TableConfig.IsTableCreatorPay == 2)
            wanfa = "房主支付,";
        if(M_HQMJClass.ins.TableConfig.IsTableCreatorPay == 3)
            wanfa = "圈主支付,";
        if(!M_HQMJClass.ins.TableConfig.isWhoLose)
            wanfa += "赢倒三家有,";
        if(M_HQMJClass.ins.TableConfig.isWhoLose)
            wanfa += "谁打谁出分,";
        if(!M_HQMJClass.ins.TableConfig.isCanChi)
            wanfa += "不准吃牌,";
        if(M_HQMJClass.ins.TableConfig.isDaiDaPai)
            wanfa += "带大牌,";
        if(!M_HQMJClass.ins.TableConfig.isDaiDaPai)
            wanfa += "不带大牌,";
        if(M_HQMJClass.ins.TableConfig.isGangFen)
            wanfa += "带明杠暗杠,";
        if(!M_HQMJClass.ins.TableConfig.isGangFen)
            wanfa += "不带明杠暗杠,";
        if(M_HQMJClass.ins.TableConfig.isZhanZhuang)
            wanfa += "占庄,";
            
        context = "玩法:"+ wanfa + playerName + "邀请你";
        M_HQMJClass.ins.ShowShare(null,tableID,title,context);
    }

    public OnPlayerSitDown(chairID: number,player: QL_Common.TablePlayer): void {
        
        this.showChairPlayer(chairID,player);
    }

    public OnTablePlayer(chairID: number,player: QL_Common.TablePlayer): void {
        this.showChairPlayer(chairID,player);
    }
    // public OnShowUserState(chairID):void{
    //     var logicChair: number = this.HQMJClass.physical2logicChair(chairID);
    //     this.group_ready[logicChair].node.active = true;
    // }
    /**
     * 玩家状态发生改变,如新的玩家坐下后默认状态为SitDown,然后玩家准备,新状态就是Ready状态,
     * 只记录其他在自己进入游戏后进入的玩家状态变化
     * */
    public OnPlayerStatusChange(chairID: number,newStatus: QL_Common.GState): void {
        
        var logicChair: number = this.HQMJClass.physical2logicChair(chairID);
       // this.group_ready[logicChair].node.active = (QL_Common.GState.PlayerReady == newStatus);//|| QL.Common.GState.OfflineInGame == newStatus);
        if(!this.group_ready[logicChair].node.active){
            this.group_ready[logicChair].node.active = (QL_Common.GState.PlayerReady == newStatus);
        }
        if(QL_Common.GState.PlayerReady != newStatus)
        {      
           // this.group_ready[logicChair].node.active = QL_Common.GState.OfflineInGame == newStatus;//this.HQMJClass.getTablePlayerAry()[chairID].DiamondsNum>=M_HQMJClass.ins.gameMoneyNum && Uyi.Common.GState.OfflineInGame == newStatus;
            if(!this.group_ready[logicChair].node.active)
            {
                this.group_ready[logicChair].node.active=this.HQMJClass.getTableConfig().alreadyGameNum>0;
            }
        }
        if(QL_Common.GState.OfflineInGame == newStatus){
            this.userAry[logicChair].Setoffline();
        }else{
            this.userAry[logicChair].Hideoffline();
        }    
        // if((this.HQMJClass.getSelfChair() == chairID) && (QL_Common.GState.PlayerReady == newStatus)){
        //     this._btn_ready.visible=false;
        //     //返回大厅消失
        //     this._btn_dissTable.visible = false;
        // }
    }
    
    public OnPlayerLeave(chairID: number): void {

        var logicChair: number = this.HQMJClass.physical2logicChair(chairID);
        
        //egret.Tween.removeTweens(this._img_look[logicChair]);

        //头像不显示
        this.userAry[logicChair].Clear();
        this.userAry[logicChair].node.active = false;
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
        
        /*if(chairID != this.HQMJClass.getSelfChair()){
            //显示邀请按钮
            this._btn_invite[logicChair - 1].visible = M_HQMJClass.ins.SelfIsTableOwener;
        }*/
    }

    /**
     * 显示房主
     * */
    public set tableOwener(chair: number) {
        if(chair!=HQMJMahjongDef.gInvalidChar)
        {
            var logicChair: number = this.HQMJClass.physical2logicChair(chair);
            for(var i: number = 0;i < HQMJMahjongDef.gPlayerNum;i++) {
                if(i == logicChair){
                    this.userAry[i].SetTableowenr();
                }else{
                    this.userAry[i].HideTableowenr();
                }
                
            }
        }
        // this.btn_kick.node.active = M_HQMJClass.ins.SelfIsTableOwener;
        /*
        if(M_HQMJClass.ins.SelfIsTableOwener){//如果我是房主,刷新邀请按钮状态
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
        this.userAry[0].SetMoney(this.getPlayerLeftMoneyNum(this.HQMJClass.getTablePlayerAry()[this.HQMJClass.getSelfChair()]));
        this.userAry[0].ShowMoney(!this.HQMJClass.getTableConfig().needHideUserMoney);
    }

    /**
     * 显示桌子上的玩家
     * */
    private showChairPlayer(chairID: number,player: QL_Common.TablePlayer){
        cc.log("showChairPlayer")
        var logicChair: number =this.HQMJClass.physical2logicChair(chairID);
        // HQMJ.ins.iclass
        //cc.log(player.NickName+333);
        //显示玩家账号
        let ss="";
        if(HQMJMahjongAlgorithm.strLen(player.NickName) > 4){
            ss = player.NickName.substring(0,4);
        }else{
            ss = player.NickName;
        }
        
        this.userAry[logicChair].node.active = true;

        this.userAry[logicChair].SetUserInfo(player.FaceID,ss,player.Gender);
        
        //显示余额
        this.userAry[logicChair].SetMoney(this.getPlayerLeftMoneyNum(player));//showUserMoney(this.HQMJClass.getRoomData().CheckMoneyType,this.getPlayerLeftMoneyNum(player));
        this.userAry[logicChair].ShowMoney(!this.HQMJClass.getTableConfig().needHideUserMoney);
        

        //不是自己,隐藏邀请按钮
        /*if(player.PlayerID != M_HQMJClass.ins.userData.UserID) {
            //邀请按钮隐藏
            this._btn_invite[logicChair - 1].visible = false;
        }*/
        //this._img_readyStatus[logicChair].visible = (QL.Common.GState.PlayerReady == player.PlayerState ||QL.Common.GState.OfflineInGame == player.PlayerState);
        this.group_ready[logicChair].node.active = (QL_Common.GState.PlayerReady == player.PlayerState);
        if(QL_Common.GState.OfflineInGame == player.PlayerState)this.userAry[logicChair].Setoffline;
        if(this.HQMJClass.isCreateRoom() && (player.PlayerState == QL_Common.GState.OfflineInGame) && (this.HQMJClass.getTableConfig().alreadyGameNum > 0)){// ||this.HQMJClass.getTablePlayerAry()[chairID].DiamondsNum>=M_HQMJClass.ins.gameMoneyNum)) {
            this.group_ready[logicChair].node.active=true;

        }

        this.userAry[logicChair].node.active=true;

        // if(M_HQMJClass.ins.SelfIsTableOwener){
            
        // }
    }
    public SelfReady():void{
         if(this.HQMJClass.getTablePlayerAry()[this.HQMJClass.getSelfChair()].PlayerState==QL_Common.GState.SitDown){
            if(this.HQMJClass.getTableConfig().isValid && this.HQMJClass.getTableConfig().alreadyGameNum==0){
                this.btn_ready.node.active=true;
                this.btn_ready.node.x=130;
                this.btn_invite.node.x=-130;
                this.group_userReady.active=true;
            }else{
                this.onReady();
            }
        }
        else if(this.HQMJClass.getTablePlayerAry()[this.HQMJClass.getSelfChair()].PlayerState==QL_Common.GState.PlayerReady){
            if(this.HQMJClass.getTableConfig().isValid && this.HQMJClass.getTableConfig().alreadyGameNum==0){
                this.btn_ready.node.active=false;
                this.btn_invite.node.x=0;
                this.group_userReady.active=true;
            }
        }
    }
        
    private onReady():void{
        
        //如果不够,开始求助
        if(M_HQMJClass.ins.checkMoneyCanGame()){
            if(M_HQMJClass.ins.isSelfCreateRoom && (M_HQMJClass.ins.TableConfig.alreadyGameNum > 0) && !M_HQMJClass.ins.TableConfig.isPlayEnoughGameNum(M_HQMJClass.ins._addNum)) {
                //继续游戏
                //this.dispatchEvent(new HQMJEvent(HQMJEvent.msg_goongame));
            }else{
                //发送准备
                M_HQMJView.ins.OnReady();
            }       
            // //解散桌子不能用
            // this._btn_dissTable.visible=false;
            // this._btn_ready.visible=false;
             this.btn_ready.node.active=false;
            this.btn_invite.node.x=0;
        }
         else {
            if(this.HQMJClass.getTableStauts()!=QL_Common.TableStatus.gameing)
            {
                M_HQMJClass.ins.UiManager.ShowMsgBox('余额不足请先充值！', "确定", () => {
                    //打开充值
                    M_HQMJClass.ins.showPay();
                }, null,null,null,null,() => {
                    //打开充值
                    this.HQMJClass.exit();
                });
            }
        } 
        // else{                 
        //     var tipMsg: string = `您的游戏币已经不足,无法继续游戏,本次共需要:${TranslateMoneyTypeName(this.HQMJClass.getRoomData().TableCostMoneyType)}X${M_HQMJClass.ins.gameMoneyNum},点击关闭将会返回大厅。您还可以选择：`;
        //     if(M_HQMJClass.ins.isSelfCreateRoom){
        //         //发起求助
        //         M_HQMJView.ins.MsgBox.showMsgBox(tipMsg,"去充值",() => {
        //             //充值 
        //             M_HQMJClass.ins.showPay();
        //         },this,"",null,null,() => {
        //             //退出游戏
        //             M_HQMJClass.ins.ExitGame();
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
        //         M_HQMJView.ins.MsgBox.showMsgBox(tipMsg,"去充值",() => {
        //             //充值 
        //             M_HQMJClass.ins.showPay();
        //         },this,"",null,null,() => {
        //             //退出游戏
        //             M_HQMJClass.ins.ExitGame();
        //         },this);   
        //     }
        // }
    }
    /**
     * 显示鼓掌动画
     */
    public ShowGuZhang(chair: number) {
        if (this.userAry[chair].node.active)
            this.userAry[chair].ShowGuZhang();
    }
    /**
     * 玩家表情
     */
    public playerLook(chair:number,clip: cc.AnimationClip):void{
        if(this.node.active)
        {
            var logicChair: number = this.HQMJClass.physical2logicChair(chair);
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
        if(null == this.HQMJClass.getTablePlayerAry()[chair]){
            M_HQMJView.ins.TipMsgView.showTip("此位置没有玩家");
            return;
        }
        
        var selfChair : number = this.HQMJClass.getSelfChair();
        /*
        if(0 >= XZMJ.ins.iclass.getTablePlayerAry()[selfChair].VIPLV){
            M_XZMJView.ins.MsgBox.showMsgBox("只有VIP玩家才可进行踢人操作");
            return;
        }*/
        
        // if(this.HQMJClass.getTablePlayerAry()[chair].VIPLV > this.HQMJClass.getTablePlayerAry()[selfChair].VIPLV){
        //     M_HQMJView.ins.MsgBox.showMsgBox("不可踢出VIP等级高于自己的玩家");
        //     return;
        // }

        M_HQMJClass.ins.PleaseLeavePlayer(this.HQMJClass.getTablePlayerAry()[chair].PlayerID);
        // M_HQMJView.ins.MsgBox.showMsgBox(`是否踢出玩家${this.HQMJClass.getTablePlayerAry()[chair].NickName}?`,"确定",()=>{
        //     M_HQMJClass.ins.PleaseLeavePlayer(this.HQMJClass.getTablePlayerAry()[chair].PlayerID);
        //     // this.group_kickuser.active=false;
        // },this,"取消");
    }

    onEnable():void{
        // this.group_kickuser.active=false;
        //   this.group_userReady.active=false;
        // this.btn_kick.node.active = M_HQMJClass.ins.SelfIsTableOwener;
        
        
        // this._btn_ready.visible=true;
        // this._btn_dissTable.visible=true;
        for(var i:number=0; i<HQMJMahjongDef.gPlayerNum; i++){
            
            if(null == M_HQMJClass.ins.TablePlayer[i]){
                this.OnPlayerLeave(i);
            }else{
                this.showChairPlayer(i,this.HQMJClass.getTablePlayerAry()[i]);
            }
        }
    }
    /**
     * 玩家聊天消息
     * */
    public playerChat(chair: number,chatMsg: string): void {
        if(this.node.active)
        {
            var logicChair : number = this.HQMJClass.physical2logicChair(chair);
            this.chatAry[logicChair].ShowChat(chatMsg);
        }
    }
    /**
     * 开始播放语音
     * */
    public playerPlayVoice(chair: number): void {
        if(this.node.active)
        {
            var logicChair: number = this.HQMJClass.physical2logicChair(chair);
            this.voiceAry[logicChair].startPlay();
        }
    }
    /**
     * 停止播放语音
     * */
    public playerStopVoice(chair: number): void {
        var logicChair: number = this.HQMJClass.physical2logicChair(chair);
        this.voiceAry[logicChair].stopPlay();
    }
    /**
     * 根据场地类型,获取玩家对应余额
     * */
    private getPlayerLeftMoneyNum(player: QL_Common.TablePlayer):number{
        if(null == player){
            return 0;
        }
        if(this.HQMJClass.getRoomData().CheckMoneyType){
            switch(this.HQMJClass.getRoomData().CheckMoneyType){
                case QL_Common.CurrencyType.Gold:return player.GoldNum;
                case QL_Common.CurrencyType.Diamond:return player.DiamondsNum;
                case QL_Common.CurrencyType.QiDou:return player.QiDouNum;
            }
        }
        
        return 0;
    }
    
}
