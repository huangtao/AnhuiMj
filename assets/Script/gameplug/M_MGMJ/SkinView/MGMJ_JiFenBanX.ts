import { M_MGMJ_GameMessage } from "../../../CommonSrc/M_MGMJ_GameMessage";
import { MGMJMahjongDef, MGMJ } from "../ConstDef/MGMJMahjongDef";
import M_MGMJClass from "../M_MGMJClass";
import { LoadHeader } from "../../../Tools/Function";
import MGMJ_SinglePlayerRecordX from "./MGMJ_SinglePlayerRecordX";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MGMJ_JiFenBanX extends cc.Component {

    @property(cc.Label)
    lbl_gamenum: cc.Label=null;

    @property(cc.Label)
    lbl_date: cc.Label=null;

    @property([cc.Label])
    lbl_accountAry: cc.Label[]=[];

    @property([cc.Sprite])
    img_accountAry: cc.Sprite[]=[];

    @property([cc.Label])
    lbl_totalAry: cc.Label[]=[];


    @property(cc.Node)
    group: cc.Node=null;

    @property(cc.Prefab)
    single: cc.Prefab=null;


    @property(cc.Button)
    btn_exit: cc.Button=null;
    @property(cc.Button)
    btn_share: cc.Button=null;
    @property(cc.Button)
    btn_close: cc.Button=null;

     public static _freeNode=new cc.NodePool();
    onLoad() {
        // init logic
        this.btn_close.node.on(cc.Node.EventType.TOUCH_END,()=>{
            this.scheduleOnce(()=>{this.node.active=false;},0.2);
            
        },this);
        this.btn_exit.node.on(cc.Node.EventType.TOUCH_END,()=>{
            this.scheduleOnce(()=>{this.node.active=false;},0.2);
        },this);
        this.btn_share.node.on(cc.Node.EventType.TOUCH_END,()=>{
            M_MGMJClass.ins.ScreenCapture(true);
        },this);
    }

    //
    //======================================================
    //

    //记录数据
    private _gameRecordAry:Array<M_MGMJ_GameMessage.GameRecordResult>;
    //是否取过数据
    private _hasReadData:boolean;
    
    private _fun_ok_callback: () => void;
    private _obj_ok_callback: any;
    	

    public init(): void {

        this._gameRecordAry = new Array<M_MGMJ_GameMessage.GameRecordResult>();
        this._hasReadData=false;
        this.group.removeAllChildren();
        
        
        
    }
    
    /**
     * 添加一条记录
     * */
    public gameRecord(recordData:Array<number>):void{
        // if(!this._hasReadData){
        //     return;
        // } 
        
        var gameRecord: M_MGMJ_GameMessage.GameRecordResult = new M_MGMJ_GameMessage.GameRecordResult();
        gameRecord.PlayerScore = new Array<number>();
        
        while(recordData.length > 0){
            gameRecord.PlayerScore.push(recordData.shift());
        }
        
        this._gameRecordAry.push(gameRecord);
    }
    
    /**
     * 游戏记录数据到来
     * */
    public gameRecordDataCome(recordData: Array<M_MGMJ_GameMessage.GameRecordResult>):void{
        this._hasReadData=true;
        if(recordData.length>0)
        {
            this._gameRecordAry.length=0;
            this.group.removeAllChildren();
        }
        // while(this._recordListContainer.numChildren > 0){
        //     this._recordListContainer.removeChildAt(0);
        // }
        for(let i=0;i<recordData.length;i++)
        {
            this._gameRecordAry.push(recordData[i]);
        }
        // while(recordData.length > 0){
        //     this._gameRecordAry.push(recordData.shift());
        // }
        this.loadRecordData();
    }
    
    /**
     * 开始显示
     * */
    public startShow(fun: () => void = null,obj: any = null):void{
        this._fun_ok_callback = fun;
        this._obj_ok_callback = obj;

        this.node.active=true;
    }
    
    /**
     * 设置玩家账号
     * */
    public setPlayeAccount(chair:number,account:string):void{
        this.lbl_accountAry[chair].string = account;
    }
    
    /**
     * 显示
     * */
    onEnable(): void {
        let time=new Date();
        let strTime = time.getFullYear() + "/" + this.FomatNumber(time.getMonth() + 1) + "/" + this.FomatNumber(time.getDate());
        strTime += " " + this.FomatNumber(time.getHours()) + ":" + this.FomatNumber(time.getMinutes());
        this.lbl_date.string = strTime;
        this.lbl_gamenum.string="局号："+MGMJ.ins.iclass.getTableConfig().TableCode;
        //if(!this._hasReadData){
        var queryRecord :M_MGMJ_GameMessage.CMD_C_QueryGameRecord = new M_MGMJ_GameMessage.CMD_C_QueryGameRecord();
        queryRecord.queryNum = 0;
        MGMJ.ins.iclass.sendData(queryRecord);
        this.loadRecordData();
        // }else{
        //     this.loadRecordData();
        // }
    }

    public SetPlayerData():void{
        for(var i:number=0; i<MGMJMahjongDef.gPlayerNum; i++){
            LoadHeader(MGMJ.ins.iclass.getTablePlayerAry()[i].FaceID, this.img_accountAry[i]);
            let name:string=MGMJ.ins.iclass.getTablePlayerAry()[i].NickName;
            if (name.length > 4){
                this.lbl_accountAry[i].string = name.substring(0, 4);
            }
            else{
                this.lbl_accountAry[i].string = name;
            }
            if (i==MGMJ.ins.iclass.getSelfChair()) {
                this.lbl_accountAry[i].node.color =cc.hexToColor("#ff5c00");
            }
            else {
                this.lbl_accountAry[i].node.color =cc.hexToColor("#5B1E00");
            }
        //    this.lbl_totalAry[i].string="0";
        }
    }
    
    /**
     * 显示数据列表
     * */
    private loadRecordData():void{
        
        var totalScore:Array<number> = new Array<number>();
        totalScore.push(0);
        totalScore.push(0);
        totalScore.push(0);
        totalScore.push(0);
        let winmax=0;//最大赢
        for(let i: number = 0;i < this._gameRecordAry.length;i++) {
             let newnode = MGMJ_JiFenBanX._freeNode.get();
            if (!cc.isValid(newnode)) {
                newnode = cc.instantiate(this.single);}
           // let newnode=cc.instantiate(this.single);
            let sin=newnode.getComponent<MGMJ_SinglePlayerRecordX>(MGMJ_SinglePlayerRecordX);
            sin.init(this._gameRecordAry[i],i);
            newnode.x=0;
            newnode.y=-30.5-61*i;
            //var record: MGMJ_SinglePlayerRecord = new MGMJ_SinglePlayerRecord(this._gameRecordAry[i],i);
            this.group.addChild(newnode);
            for(var j:number=0; j<MGMJMahjongDef.gPlayerNum; j++){
                totalScore[j] += this._gameRecordAry[i].PlayerScore[j];
            }
        }
        if (this._gameRecordAry.length > 5) {
            this.group.height = this._gameRecordAry.length * 61;
        }
        else {
            this.group.height = 307;
        }
        
        for(var m:number=0; m<MGMJMahjongDef.gPlayerNum; m++){
            
            if(totalScore[m] > 0) {
                this.lbl_totalAry[m].string = "+" + totalScore[m].toString();
                this.lbl_totalAry[m].node.color = cc.hexToColor("#2b8a18");
            } else {
                this.lbl_totalAry[m].string = totalScore[m].toString();
                this.lbl_totalAry[m].node.color = cc.hexToColor("#da1901");
            }

            if(totalScore[m]>winmax)
            {
                winmax=totalScore[m];
            }
        }
        // if(winmax>0) 大富豪不显示
        // {
        //     for(var i:number=0; i<MGMJMahjongDef.gPlayerNum; i++){
        //         if(totalScore[i]==winmax)
        //         {
        //             this._img_winner[i].visible=true;
        //         }
        //     }
        // }
    }
    /**
     * 转化数字格式
     */
    private FomatNumber(value: number): string {
        var result = "";
        if (value < 10)
            return "0" + value;
        else
            return "" + value;
    }
    /**
     * 新的游戏回合开始
     * */
    public gameroundStart(){
        this._hasReadData=false;
        this._gameRecordAry.splice(0,this._gameRecordAry.length);
        
        this.group.removeAllChildren();
    }
}
