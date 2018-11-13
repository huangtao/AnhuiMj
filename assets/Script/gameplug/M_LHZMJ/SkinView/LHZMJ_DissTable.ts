
import { M_LHZMJ_GameMessage } from "../../../CommonSrc/M_LHZMJ_GameMessage";
import { LoadHeader } from "../../../Tools/Function";
import M_LHZMJClass from "../M_LHZMJClass";
import { LHZMJMahjongDef } from "../ConstDef/LHZMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_DissTable extends cc.Component {

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
    @property(cc.Sprite)
    img_alreadyAgree:cc.Sprite = null;

    @property([cc.Sprite])
    lbl_playerHead:cc.Sprite[]=[];

    @property([cc.Label])
    lbl_playerStatusAry:cc.Label[]=[];
    @property([cc.Label])
    lbl_playervote:cc.Label[]=[];

    @property([cc.Sprite])
    img_headPhoto:cc.Sprite[]=[];

    
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
        this.img_alreadyAgree.node.active = true;
        this.onVoteDissTable(1);
    }

    private onVoteDissTableReject():void{
        this.btn_agree.node.active=false;
        this.btn_reject.node.active=false;
        this.onVoteDissTable(2);
    }

    //投票
    private onVoteDissTable(vote:number):void{


        var agree: M_LHZMJ_GameMessage.CMD_C_VoteDissTable = new M_LHZMJ_GameMessage.CMD_C_VoteDissTable();
        agree.voteResult = vote;
        M_LHZMJClass.ins.SendGameData(agree);

        this.btn_agree.enabled=false;
        this.btn_reject.enabled=false;
    }
    
    /**
     * 玩家解散牌桌
     * */
    public playerDissTable(chair:number,playerVote:Array<number>,lefttime:number=60):void{
        this.unschedule(this.onTimer);
        this.btn_agree.enabled = true;
        this.btn_reject.enabled = true;
        this.btn_agree.node.active = chair != M_LHZMJClass.ins.SelfChair;
        this.btn_reject.node.active = chair != M_LHZMJClass.ins.SelfChair;
        this.img_alreadyAgree.node.active = false;
        
        this._timerNum = lefttime;
        if(this._timerNum<=0)
            this._timerNum=0;
        this._sponsor = chair;
        if(M_LHZMJClass.ins.TablePlayer[chair].NickName.length > 4)
            M_LHZMJClass.ins.TablePlayer[chair].NickName = M_LHZMJClass.ins.TablePlayer[chair].NickName.substr(0,4);
        this.lbl_sponsor.string=`玩家【${M_LHZMJClass.ins.TablePlayer[chair].NickName}】申请解散房间`;
        this.lbl_timer.string=`${this._timerNum}`;
        this.lbl_timer.node.active = true;
        
        var idx:number=0;
        for(var i: number = 0;i < LHZMJMahjongDef.gPlayerNum;i++) {
            if(i != this._sponsor) {
                if(M_LHZMJClass.ins.TablePlayer[i].NickName.length > 4)
                    M_LHZMJClass.ins.TablePlayer[i].NickName = M_LHZMJClass.ins.TablePlayer[i].NickName.substr(0,4);
                idx++;
                this.lbl_playerStatusAry[idx-1].string = M_LHZMJClass.ins.TablePlayer[i].NickName;
                this.lbl_playervote[idx-1].node.active =true;
                this.lbl_playervote[idx-1].string = "投票中";
                LoadHeader(M_LHZMJClass.ins.TablePlayer[i].FaceID, this.img_headPhoto[idx-1]);
            }
        }

        if(this._timerNum>0){
            this.schedule(this.onTimer,1,this._timerNum,1);
        }
         this.node.active=true;
        if(null == playerVote){
            
            //非发起者等待计时
            //this._intervalIdx = egret.setInterval(this.onTimer,this,1000);
          //  this.schedule(this.onTimer,1,this._timerNum,1);
        }else{
            
            //如果我既不是发起者而且还未投票,开始倒计时
            // if(0 == playerVote[M_LHZMJClass.ins.SelfChair]) {
            //     //this._intervalIdx = egret.setInterval(this.onTimer,this,1000);
            //     this.schedule(this.onTimer,1,this._timerNum,1);
            // }
            
            //恢复其他玩家的投票信息
            for(var j:number=0; j<LHZMJMahjongDef.gPlayerNum; j++){
                if((j != this._sponsor) && (0 != playerVote[j])){
                    this.playerVoteDissTable(j,playerVote[j]);
                }
            }
            
        }
        
        
    }
        

    /**
     * 玩家投票解散房间
     * */
    public playerVoteDissTable(chair:number,vote:number):void{
        
        var idx:number=0;
        
        for(var i:number=0; i<LHZMJMahjongDef.gPlayerNum; i++){
            if(i == this._sponsor){
                continue;
            }
            if(i == chair){
                break;
            }
            ++idx;
        }
   //     this.lbl_playerStatusAry[idx].string = `玩家【${M_LHZMJClass.ins.getTablePlayerAry()[chair].NickName}】${1 == vote ? "同意":"拒绝"}`;
        this.lbl_playervote[idx].string = `${1 == vote ? "同意":"拒绝"}`;
     if(chair==M_LHZMJClass.ins.SelfChair && 1 == vote){
            this.btn_agree.node.active = false;
            this.btn_reject.node.active = false;
        }
        if(vote==2){
            this.unscheduleAllCallbacks();
        }
        if(!this.node.active){
            this.node.active = true;
            this.lbl_playerStatusAry[0].node.active = false;
            this.lbl_playerStatusAry[1].node.active = false;
            this.lbl_playerStatusAry[2].node.active = false;
            this.img_alreadyAgree.node.active = false;
            this.lbl_sponsor.node.active = false;
            this.lbl_timer.node.active = false;
        }
}
    
    private onTimer():void{
        if(this._timerNum <= 0){
            this.unscheduleAllCallbacks();
            return;
        }
        --this._timerNum;
        this.lbl_timer.string= `${this._timerNum}`;
        if((0 == this._timerNum) && (this._sponsor != M_LHZMJClass.ins.SelfChair)){
            this.onVoteDissTable(1);
        }
    }
        

}
