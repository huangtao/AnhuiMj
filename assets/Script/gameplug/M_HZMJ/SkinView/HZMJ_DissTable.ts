import { HZMJMahjongDef } from "../ConstDef/HZMJMahjongDef";
import M_HZMJClass from "../M_HZMJClass";
import { M_HZMJ_GameMessage } from "../../../CommonSrc/M_HZMJ_GameMessage";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_DissTable extends cc.Component {

    /**
     * 取消按钮
     */
    @property(cc.Button)
    btn_reject:cc.Button=null;
    /**
     * 确定按钮
     */
    @property(cc.Button)
    btn_agree:cc.Button=null;
    /**
     * 
     */
    @property(cc.Label)
    lbl_sponsor:cc.Label=null;
    /**
     * 
     */
    @property(cc.Label)
    lbl_timer:cc.Label=null;

    @property(cc.Label)
    lbl_player_0:cc.Label=null;

    @property(cc.Label)
    lbl_player_1:cc.Label=null;

    @property(cc.Label)
    lbl_player_2:cc.Label=null;
    //已同意按钮
    @property(cc.Sprite)
    tongYi:cc.Sprite=null;

    @property([cc.Label])
    lbl_playerStatusAry:cc.Label[]=[];
    //状态栏
    @property(cc.Label)
    lbl_zhuangTai: cc.Label[]=[];

    //玩家状态
    private _lbl_playerStatusAry:Array<cc.Label>;


    
    //倒计时时间
    private _timerNum:number;
    //发起者
    private _sponsor:number;
    //计时器ID
    private _intervalIdx:number;
    

    onLoad() {
        // init logic

        // this.node.getChildByName("btn_reject").on(cc.Node.EventType.MOUSE_UP,this.onVoteDissTableReject,this);
        // this.node.getChildByName("btn_agree").on(cc.Node.EventType.MOUSE_UP,this.onVoteDissTableAgree,this);
        //同意
        this.btn_agree.node.on(cc.Node.EventType.TOUCH_END,(e:cc.Event.EventCustom)=>{
            this.onVoteDissTableAgree();
        },this);
        
        //拒绝
        this.btn_reject.node.on(cc.Node.EventType.TOUCH_END,(e:cc.Event.EventCustom)=>{
            this.onVoteDissTableReject();
        },this);
        
    }

    public Init():void{
        
        this.node.active=false;
    }
    /**
     * 
     */
    private onVoteDissTableAgree():void{
        this.btn_agree.node.active=false;
        this.btn_reject.node.active=false;  
        this.tongYi.node.active=true;  
        this.onVoteDissTable(1);
    }

    private onVoteDissTableReject():void{
        this.btn_agree.node.active=false;
        this.btn_reject.node.active=false;
        this.onVoteDissTable(2);
    }

    //投票
    private onVoteDissTable(vote:number):void{


        var agree: M_HZMJ_GameMessage.CMD_C_VoteDissTable = new M_HZMJ_GameMessage.CMD_C_VoteDissTable();
        agree.voteResult = vote;
        M_HZMJClass.ins.SendGameData(agree);

        this.btn_agree.enabled=false;
        this.btn_reject.enabled=false;
    }
    
    /**
     * 玩家解散牌桌
     * */
    public playerDissTable(chair:number,playerVote:Array<number>,lefttime:number=60):void{
        this.tongYi.node.active=false;
        if(chair==M_HZMJClass.ins.SelfChair){
             this.tongYi.node.active=true;
        } 
        this.btn_agree.enabled = true;
        this.btn_reject.enabled = true;
        this.btn_agree.node.active = chair != M_HZMJClass.ins.SelfChair;
        this.btn_reject.node.active = chair != M_HZMJClass.ins.SelfChair;
        
        this._timerNum = lefttime;
        this._sponsor = chair;
        
        this.lbl_sponsor.string=`玩家【${M_HZMJClass.ins.TablePlayer[chair].NickName}】申请解散房间`;
        this.lbl_timer.string=`${this._timerNum}`;
        this.lbl_timer.node.active = true;
        
        var idx:number=0;
        for(var i: number = 0;i < HZMJMahjongDef.gPlayerNum;i++) {
            if(i != M_HZMJClass.ins.SelfChair) {
                this.lbl_playerStatusAry[idx++].string = `${M_HZMJClass.ins.TablePlayer[i].NickName}`;                
            }
        }
        for(var k=0;k<3;k++){           
                this.lbl_zhuangTai[k].string = '投票中...'                     
        }
              if(this._timerNum>0){
            this.schedule(this.onTimer,1,this._timerNum,1);
        }
        if(null == playerVote){
            
            //非发起者等待计时
            //this._intervalIdx = egret.setInterval(this.onTimer,this,1000);
          //  this.schedule(this.onTimer,1,this._timerNum,1);
        }else{
            
            //如果我既不是发起者而且还未投票,开始倒计时
            // if(0 == playerVote[M_HZMJClass.ins.SelfChair]) {
            //     //this._intervalIdx = egret.setInterval(this.onTimer,this,1000);
            //     this.schedule(this.onTimer,1,this._timerNum,1);
            // }
            
            //恢复其他玩家的投票信息
            for(var j:number=0; j<HZMJMahjongDef.gPlayerNum; j++){
                if((j != this._sponsor) && (0 != playerVote[j])){
                    this.playerVoteDissTable(j,playerVote[j]);
                }
            }
            
        }
        
        this.node.active=true;
    }
        

    /**
     * 玩家投票解散房间
     * */
    public playerVoteDissTable(chair:number,vote:number):void{
        
        var idx:number=0;
        
        for(var i:number=0; i<HZMJMahjongDef.gPlayerNum; i++){
            if(i == this._sponsor){
                continue;
            }
            if(i == chair){
                break;
            }
            ++idx;
        }
        if(idx!=M_HZMJClass.ins.SelfChair){
        //this.lbl_playerStatusAry[idx].string = `${M_HZMJClass.ins.getTablePlayerAry()[chair].NickName}`;
        if(this._sponsor==0){
            if(chair==1){
               this.lbl_zhuangTai[0].string='已同意';
            }
        
        }
       
        }
        
     if(chair==M_HZMJClass.ins.SelfChair && 1 == vote){
            this.btn_agree.node.active = false;
            this.btn_reject.node.active = false;
        }
        if(vote==2){
            this.unscheduleAllCallbacks();
        }
}
    
    private onTimer():void{
        if(this._timerNum <= 0){
            this.unscheduleAllCallbacks();
            return;
        }
        --this._timerNum;
        this.lbl_timer.string= `${this._timerNum}`;
        if((0 == this._timerNum) && (this._sponsor != M_HZMJClass.ins.SelfChair)){
            this.onVoteDissTable(1);
        }
    }
        

}
