import BBMJ_GamingUser from "./BBMJ_GamingUser";
import { BBMJ, BBMJMahjongDef } from "../ConstDef/BBMJMahjongDef";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import MJ_PlayVoiceStaus from "../../MJCommon/MJ_PlayVoiceStaus";
import M_BBMJView from "../M_BBMJView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_GameStatusUserInfo extends cc.Component {
    lianzhuang:number=0;
    @property([BBMJ_GamingUser])
    userAry: BBMJ_GamingUser[]=[];
    @property([cc.Node])
    group_voice: cc.Node[]=[];
    private voiceAry: Array<MJ_PlayVoiceStaus>;
   
    onLoad() {
        // init logic
        // console.log("gameUserInfo玩家信息初始化");
        //this.init();
        
    }

    public init():void{
        this.voiceAry=new Array<MJ_PlayVoiceStaus>();
        for(let i=0;i<BBMJMahjongDef.gPlayerNum;i++)
        {
            this.group_voice[i].active=false;
            let tempvoice:MJ_PlayVoiceStaus=this.group_voice[i].getComponent<MJ_PlayVoiceStaus>(MJ_PlayVoiceStaus);
            this.voiceAry.push(tempvoice);
        }
        for(let i=0;i<BBMJMahjongDef.gPlayerNum-1;i++)
        {
            const x=i+1;
            this.userAry[x].node.on(cc.Node.EventType.TOUCH_END,()=>{this.onSelUserFace(x);},this);
        }
        
        for(let i=0;i<this.userAry.length;i++)
        {
            this.userAry[i].init();
        }
       
    }

    

    private static UserDataPos: Array<{ x: number,y: number }> = [
        { x: -350,y: -170 },
        { x: 350,y: 50 },
        { x: 150,y: 230 },
        { x: -350,y: 50 }
    ]; 
		
        /**
         * 显示分数变化
         */
        public showScoreChange(scores:Array<number>):void{
            for(var i=0;i<this.userAry.length;i++)
            {
                this.userAry[i].AddScore(scores[BBMJ.ins.iclass.logic2physicalChair(i)]);
            }
        }
        /**
         * 重置显示分数
         */
        public reShowScoreChange(scores:Array<number>):void{
            for(var i=0;i<this.userAry.length;i++)
            {
                this.userAry[i].SetScore(scores[BBMJ.ins.iclass.logic2physicalChair(i)]);
            }
        }
        /**
         * 选择用户头像
         * */
        private onSelUserFace(logicChair : number):void{
            if(!BBMJ.ins.iclass.isVideo())
            {
                var chair: number = BBMJ.ins.iclass.logic2physicalChair(logicChair);
               M_BBMJView.ins.UserData.showUserData(BBMJ.ins.iclass.getTableConfig().isValid,BBMJ.ins.iclass.getTablePlayerAry()[chair],BBMJ_GameStatusUserInfo.UserDataPos[logicChair].x,BBMJ_GameStatusUserInfo.UserDataPos[logicChair].y);
            }
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
                // BBMJ.ins.iclass.getTablePlayerAry()[BBMJ.ins.iclass.logic2physicalChair(i)]
                // // this._lbl_accountAry[i].text = BBMJ.ins.iclass.getTablePlayerAry()[BBMJ.ins.iclass.logic2physicalChair(i)].NickName;
                // let ss="";
                // if(BBMJMahjongAlgorithm.strLen(player.NickName) > 16){
                //     ss = player.NickName.substring(0,12) + "...";
                // }else{
                //     ss = player.NickName;
                // }
                // this.userAry[logicChair].SetUserInfo(player.FaceID,ss,player.Gender);
                console.log("玩家昵称"+BBMJ.ins.iclass.getTablePlayerAry()[BBMJ.ins.iclass.logic2physicalChair(i)].NickName);
                this.userAry[i].SetPlayer(BBMJ.ins.iclass.getTablePlayerAry()[BBMJ.ins.iclass.logic2physicalChair(i)]);
            }
        }
        /**
         * 显示
         * */
        onEnable(): void {

            if(!BBMJ.ins.iclass.getTableConfig().IsLaPaoZuo){

                for(var i:number=0; i<BBMJMahjongDef.gPlayerNum; i++){
                this.userAry[i].ShowLaAndPao(false);
                }  
            }

            //检查断线玩家
            for(var i:number=0; i<BBMJMahjongDef.gPlayerNum; i++){
                if((null != BBMJ.ins.iclass.getTablePlayerAry()[i]) && (BBMJ.ins.iclass.getTablePlayerAry()[i].PlayerState == QL_Common.GState.OfflineInGame)){
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
                var logicChair : number = BBMJ.ins.iclass.physical2logicChair(chair);
                this.userAry[logicChair].ShowChat(chatMsg);
            }
        }

        /**
         * 玩家坐下:自己坐下和自己坐下后又有新的玩家进入坐下,默认状态为SitDown状态,以防万一最好再处理一下状态
         * */
        public OnPlayerSitDown(chairID: number,player: QL_Common.TablePlayer): void {
            //this.showChairPlayer(chairID,player);
            var logicChair : number = BBMJ.ins.iclass.physical2logicChair(chairID);
            this.userAry[logicChair].SetPlayer(player);
        }

        public HideLaPao():void{
            for(var i:number=0; i<BBMJMahjongDef.gPlayerNum; i++){
                this.userAry[i].ShowLaAndPao(false);
            } 
        }
       
        /**
         * 设置庄家椅子号
         * */
        public set bankerChair(chair:number){
            var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chair);
            for(var i: number = 0;i < BBMJMahjongDef.gPlayerNum;i++) {
                 if(i == logicChair){
                     this.userAry[i].SetBanker();
                 }
                 else{
                    this.userAry[i].HideBanker();
                 }
            }
        }
        /**设置听牌者椅子号 */
        public set Ting(chair:number){
            var logicChair:number=BBMJ.ins.iclass.physical2logicChair(chair);
            for(var i:number=0;i<BBMJMahjongDef.gPlayerNum;i++){
                if(i==logicChair){
                    this.userAry[i].SetTing();
                }
            }
        }
        /**
         * 显示房主
         * */
        public set tableOwener(chair: number) {
            var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chair);
            for(var i: number = 0;i < BBMJMahjongDef.gPlayerNum;i++) {
                 if(i == logicChair){
                     this.userAry[i].SetTableowenr();
                 }
                 else{
                    this.userAry[i].HideTableowenr();
                 }
            }
        }
       
        public SetLa(la:Array<number>):void{ 
            for(var i: number = 0;i < BBMJMahjongDef.gPlayerNum;i++) {
                var logicChair: number = BBMJ.ins.iclass.physical2logicChair(i);
                this.userAry[logicChair].SetLa(la[i]);
            }
        }

        public SetPao(pao:Array<number>):void{
            for(var i: number = 0;i < BBMJMahjongDef.gPlayerNum;i++) {
                var logicChair: number = BBMJ.ins.iclass.physical2logicChair(i);
                this.userAry[logicChair].SetPao(pao[i]);
            }
        }
        
        /**
         * 设置断线玩家
         * */
        public set offlineChair(chair:number){
            this.userAry[BBMJ.ins.iclass.physical2logicChair(chair)].Setoffline();
        }
        
        /**
         * 设置重连玩家
         * */
        public set reconnectChair(chair:number){
            this.userAry[BBMJ.ins.iclass.physical2logicChair(chair)].Hideoffline();
        }
        
        /**
         * 玩家连庄
         * */
        public playerLianBanker(chair:number):void{
            var logicChair: number = BBMJ.ins.iclass.physical2logicChair(chair);
            // if(lian!=0)
            // {
            //     this._lbl_lianBanker[logicChair].visible=true;
            //     this._lbl_lianBanker[logicChair].text="x"+lian;
            // }
            // else
            this.userAry[logicChair].SetBanker();
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
         * 清理
         * */
        public clear():void{
            console.log("clear玩家信息初始化");
            //清理庄家标志
            for(let i=0;i<BBMJMahjongDef.gPlayerNum;i++)
            {
                this.group_voice[i].active=false;
            }
            for(let i=0;i<this.userAry.length;i++)
            {
                this.userAry[i].Clear();
            }
        }
}
