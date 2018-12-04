import JZMJ_GamingUser from "./JZMJ_GamingUser";
import { JZMJ, JZMJMahjongDef } from "../ConstDef/JZMJMahjongDef";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { JZMJMahjongAlgorithm } from "../JZMJMahjongAlgorithm/JZMJMahjongAlgorithm";
import MJ_PlayVoiceStaus from "../../MJCommon/MJ_PlayVoiceStaus";
import M_JZMJView from "../M_JZMJView";
import M_JZMJVoice from "../M_JZMJVoice";
import M_JZMJClass from "../M_JZMJClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class JZMJ_GameStatusUserInfo extends cc.Component {
    lianzhuang:number=0;
    @property([JZMJ_GamingUser])
    userAry: JZMJ_GamingUser[]=[];
    @property([cc.Node])
    group_voice: cc.Node[]=[];
    private voiceAry: Array<MJ_PlayVoiceStaus>;
   
    private _JZMJClass: any = null;
    public set JZMJClass(value: any){
        this._JZMJClass = value;
    }

    public get JZMJClass():any{
       return this._JZMJClass;
    }

    onLoad() {
        // init logic
        // console.log("gameUserInfo玩家信息初始化");
        //this.init();
        
    }

    public init():void{
        this.voiceAry=new Array<MJ_PlayVoiceStaus>();
        for(let i=0;i<JZMJMahjongDef.gPlayerNum;i++)
        {
            this.group_voice[i].active=false;
            let tempvoice:MJ_PlayVoiceStaus=this.group_voice[i].getComponent<MJ_PlayVoiceStaus>(MJ_PlayVoiceStaus);
            this.voiceAry.push(tempvoice);
        }
        for(let i=0;i<JZMJMahjongDef.gPlayerNum;i++)
        {
            this.userAry[i].node.on(cc.Node.EventType.TOUCH_END,()=>{this.onSelUserFace(i);},this);
        }
        
        for(let i=0;i<this.userAry.length;i++)
        {
            this.userAry[i].init();
        }
        
    }
    private static UserDataGamingPos: Array<{ x: number, y: number }> = [
        { x: -300, y: -250 },
        { x: 350, y: 50 },
        { x: 150, y: 230 },
        { x: -350, y: 50 }
    ];

    private static UserDataPos: Array<{ x: number,y: number }> = [
        { x: -5,y: -60+30 },
        { x: -5,y: -60+30 },
        { x: -5,y: -60+30 },
        { x: -5,y: -60+30 }
    ]; 

    /**
     * 显示鼓掌动画
     */
    public ShowGuZhang(chair: number) {
        if (this.userAry[chair].node.active)
            this.userAry[chair].ShowGuZhang();
    }
		
        /**
         * 显示分数变化
         */
        public showScoreChange(scores:Array<number>):void{
            for(var i=0;i<this.userAry.length;i++)
            {
                this.userAry[i].AddScore(scores[this.JZMJClass.logic2physicalChair(i)]);
            }
        }
        /**
         * 重置显示分数
         */
        public reShowScoreChange(scores:Array<number>):void{
            for(var i=0;i<this.userAry.length;i++)
            {
                this.userAry[i].SetScore(scores[this.JZMJClass.logic2physicalChair(i)]);
            }
        }
        /**
         * 选择用户头像
         * */
        private onSelUserFace(logicChair : number):void{
            if(!this.JZMJClass.isVideo())
            {
                var chair: number = this.JZMJClass.logic2physicalChair(logicChair);

                var xPos = 0;
                var yPos = 0;
                if(logicChair == 1){
                    xPos = JZMJ_GameStatusUserInfo.UserDataPos[logicChair].x;
                    yPos = JZMJ_GameStatusUserInfo.UserDataPos[logicChair].y;
                }else if(logicChair == 2){
                    xPos = JZMJ_GameStatusUserInfo.UserDataPos[logicChair].x;
                    yPos = JZMJ_GameStatusUserInfo.UserDataPos[logicChair].y;
                }else if(logicChair == 3){
                    xPos = JZMJ_GameStatusUserInfo.UserDataPos[logicChair].x;
                    yPos = JZMJ_GameStatusUserInfo.UserDataPos[logicChair].y;
                }else{
                    xPos = JZMJ_GameStatusUserInfo.UserDataPos[logicChair].x;
                    yPos = JZMJ_GameStatusUserInfo.UserDataPos[logicChair].y;
                }
                M_JZMJVoice.PlayCardType(`/sound/Button32.mp3`);
                // M_JZMJView.ins.UserData.showUserData(this.JZMJClass.getTableConfig().isValid,this.JZMJClass.getTablePlayerAry()[chair],xPos,yPos);
                let point = new cc.Vec2(JZMJ_GameStatusUserInfo.UserDataGamingPos[logicChair].x, JZMJ_GameStatusUserInfo.UserDataGamingPos[logicChair].y);
                M_JZMJClass.ins.showPlayerInfoForm(JZMJ.ins.iclass.getTablePlayerAry()[chair],point, chair);
            }
        }
        /**
         * 玩家表情
         */
        public playerLook(chair:number,clip: cc.AnimationClip):void{
            if(this.node.active)
            {
                var logicChair: number = this.JZMJClass.physical2logicChair(chair);
                this.userAry[logicChair].playerLook(clip);
            }
            // egret.Tween.removeTweens(this._img_look[logicChair]);
            // this._img_look[logicChair].source=chatMsg;
            // this._img_look[logicChair].visible=true;
            // this._img_face[logicChair].visible=false;
            // egret.Tween.get(this._img_look[logicChair]).to({ scaleX: 1.4,scaleY: 1.4 },500).to({ scaleX: 0.6,scaleY: 0.6 },500).to({ scaleX: 1,scaleY: 1 },200).wait(2000).call(() => {
            //     this._img_look[logicChair].visible=false;
            //     this._img_face[logicChair].visible=true;
            // },this);
            /*egret.Tween.get(this._img_look[logicChair]).wait(3000).call(() => {
                this._img_look[logicChair].visible=false;
                this._img_face[logicChair].visible=true;
            },this);*/
        }
        

        public reflashPlayer():void{
            for(var i:number=0; i<this.userAry.length; i++){
                // this.JZMJClass.getTablePlayerAry()[this.JZMJClass.logic2physicalChair(i)]
                // // this._lbl_accountAry[i].text = this.JZMJClass.getTablePlayerAry()[this.JZMJClass.logic2physicalChair(i)].NickName;
                // let ss="";
                // if(JZMJMahjongAlgorithm.strLen(player.NickName) > 16){
                //     ss = player.NickName.substring(0,12) + "...";
                // }else{
                //     ss = player.NickName;
                // }
                // this.userAry[logicChair].SetUserInfo(player.FaceID,ss,player.Gender);
                console.log("玩家昵称"+this.JZMJClass.getTablePlayerAry()[this.JZMJClass.logic2physicalChair(i)].NickName);
                this.userAry[i].SetPlayer(this.JZMJClass.getTablePlayerAry()[this.JZMJClass.logic2physicalChair(i)]);
            }
        }
        /**
         * 显示
         * */
        onEnable(): void {

            // if(!this.JZMJClass.getTableConfig().IsLaPaoZuo){

            //     for(var i:number=0; i<JZMJMahjongDef.gPlayerNum; i++){
            //     this.userAry[i].ShowLaAndPao(false);
            //     }  
            // }

            //检查断线玩家
            for(var i:number=0; i<JZMJMahjongDef.gPlayerNum; i++){
                if((null != this.JZMJClass.getTablePlayerAry()[i]) && (this.JZMJClass.getTablePlayerAry()[i].PlayerState == QL_Common.GState.OfflineInGame)){
                    this.offlineChair=i;
                }
            }
        }
        /**
         * 玩家聊天消息
         * */
        public playerChat(chair: number,chatMsg: string): void {
            if(this.node.active)
            {
                var logicChair : number = this.JZMJClass.physical2logicChair(chair);
                this.userAry[logicChair].ShowChat(chatMsg);
            }
        }

        /**
         * 玩家坐下:自己坐下和自己坐下后又有新的玩家进入坐下,默认状态为SitDown状态,以防万一最好再处理一下状态
         * */
        public OnPlayerSitDown(chairID: number,player: QL_Common.TablePlayer): void {
            //this.showChairPlayer(chairID,player);
            var logicChair : number = this.JZMJClass.physical2logicChair(chairID);
            this.userAry[logicChair].SetPlayer(player);
            if(this.JZMJClass != JZMJ.ins.iclass){
                for(let i=0;i<JZMJMahjongDef.gPlayerNum;i++){
                    this.group_voice[i].active = false;
                    this.userAry[i].userChat.img_bg.node.active = false;
                    this.userAry[i].img_look.node.active = false;
                    this.userAry[i].img_offline.node.active = false;
                    this.userAry[i].lbl_score.string = "";
                }
            }
        }

        public HideLaPao():void{
            for(var i:number=0; i<JZMJMahjongDef.gPlayerNum; i++){
                this.userAry[i].ShowLaAndPao(false);
            } 
        }
       
        /**
         * 设置庄家椅子号
         * */
        public setBankerChair(chair:number,lianNum:number){
            var logicChair: number = this.JZMJClass.physical2logicChair(chair);
            for(var i: number = 0;i < JZMJMahjongDef.gPlayerNum;i++) {
                 if(i == logicChair){
                     this.userAry[i].SetBanker(lianNum);
                 }
                 else{
                    this.userAry[i].HideBanker();
                 }
            }
        }
        /**设置听牌者椅子号 */
        public set Ting(chair:number){
            var logicChair:number=this.JZMJClass.physical2logicChair(chair);
            for(var i:number=0;i<JZMJMahjongDef.gPlayerNum;i++){
                if(i==logicChair){
                    this.userAry[i].SetTing();
                }else{
                    this.userAry[i].HideTing();
                }
            }
        }
        /**
         * 显示房主
         * */
        public set tableOwener(chair: number) {
            var logicChair: number = this.JZMJClass.physical2logicChair(chair);
            for(var i: number = 0;i < JZMJMahjongDef.gPlayerNum;i++) {
                 if(i == logicChair){
                     this.userAry[i].SetTableowenr();
                 }
                 else{
                    this.userAry[i].HideTableowenr();
                 }
            }
        }
       
        public SetLa(la:Array<number>):void{ 
            for(var i: number = 0;i < JZMJMahjongDef.gPlayerNum;i++) {
                var logicChair: number = this.JZMJClass.physical2logicChair(i);
                this.userAry[logicChair].SetLa(la[i]);
            }
        }

        public SetPao(pao:Array<number>):void{
            for(var i: number = 0;i < JZMJMahjongDef.gPlayerNum;i++) {
                var logicChair: number = this.JZMJClass.physical2logicChair(i);
                this.userAry[logicChair].SetPao(pao[i]);
            }
        }
        
        /**
         * 设置断线玩家
         * */
        public set offlineChair(chair:number){
            this.userAry[this.JZMJClass.physical2logicChair(chair)].Setoffline();
        }
        
        /**
         * 设置重连玩家
         * */
        public set reconnectChair(chair:number){
            this.userAry[this.JZMJClass.physical2logicChair(chair)].Hideoffline();
        }
        
        /**
         * 玩家连庄
         * */
        public playerLianBanker(chair:number):void{
            var logicChair: number = this.JZMJClass.physical2logicChair(chair);
            // if(lian!=0)
            // {
            //     this._lbl_lianBanker[logicChair].visible=true;
            //     this._lbl_lianBanker[logicChair].text="x"+lian;
            // }
            // else
            // this.userAry[logicChair].SetBanker();
        }
        /**
         * 开始播放语音
         * */
        public playerPlayVoice(chair: number): void {
            if(this.node.active)
            {
                var logicChair: number = this.JZMJClass.physical2logicChair(chair);
                this.voiceAry[logicChair].startPlay();
            }
        }
        /**
         * 停止播放语音
         * */
        public playerStopVoice(chair: number): void {
            var logicChair: number = this.JZMJClass.physical2logicChair(chair);
            this.voiceAry[logicChair].stopPlay();
        }
        
        /**
         * 清理
         * */
        public clear():void{
            console.log("clear玩家信息初始化");
            //清理庄家标志
            for(let i=0;i<JZMJMahjongDef.gPlayerNum;i++)
            {
                this.group_voice[i].active=false;
            }
            for(let i=0;i<this.userAry.length;i++)
            {
                this.userAry[i].Clear();
            }
        }
}
