import { M_HZMJ_GameMessage } from "../../../CommonSrc/M_HZMJ_GameMessage";
import HZMJ_SinglePlayerFX from "./HZMJ_SinglePlayerFX";
import M_HZMJClass from "../M_HZMJClass";
import M_HZMJView from "../M_HZMJView";
import { HZMJMahjongDef, HZMJ } from "../ConstDef/HZMJMahjongDef";
import M_HZMJVoice from "../M_HZMJVoice";
const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_FenXiang extends cc.Component {

    //分享
    @property(cc.Button)
    btn_mingxi: cc.Button=null;

    //返回
    @property(cc.Button)
    btn_exit: cc.Button=null;

    //分享
    @property(cc.Button)
    btn_share: cc.Button=null;

    //单个玩家分享信息
    @property([HZMJ_SinglePlayerFX])
    playAry: HZMJ_SinglePlayerFX[]=[];

   //分数
    @property(cc.Label)
    scoreLable: cc.Label[]=[];
  //房间号
    @property(cc.Label)
    lal_room: cc.Label=null;
  //总局数
   @property(cc.Label)
   lal_jushu: cc.Label=null;
  //时间
   @property(cc.Label)
   lal_time: cc.Label=null;
  //自摸次数
   @property(cc.Label)
   lal_ziMoCnt: cc.Label[]=[];
  //暗杠次数
   @property(cc.Label)
   lal_anGangCnt: cc.Label[]=[];
  //明杠次数
   @property(cc.Label)
   lal_mingGangCnt: cc.Label[]=[];
  //中码次数
   @property(cc.Label)
   lal_zhongMaCnt: cc.Label[]=[];


    @property(cc.Label)
    lab_other: cc.Label=null;
    @property(cc.Node)
    shareNode: cc.Node=null;
    //
    //======================================================
    //

    //记录数据
    private _gameRecordAry: Array<M_HZMJ_GameMessage.GameRecordResult>;
    //是否取过数据
    private _hasReadData: boolean;

    private _fun_ok_callback: () => void;
    private _obj_ok_callback: any;

    onLoad() {
        // init logic
        
    }

    public init() {

        this._gameRecordAry = new Array<M_HZMJ_GameMessage.GameRecordResult>();
        this._hasReadData = false;
        for (let i = 0; i < HZMJMahjongDef.gPlayerNum; i++) {
            this.playAry[i].init();
        }

        // var totalScore: Array<number> = new Array<number>();
        // totalScore[0] = 4;
        // totalScore[1] = 23;
        // totalScore[2] = 3243;
        // totalScore[3] = 435567;

        // for (var n: number = 0; n < HZMJMahjongDef.gPlayerNum; n++) {
        //     if(0 == n){
        //         this.playAry[n].SetData(4, n, totalScore[n], false);
        //     }else{
        //         this.playAry[n].SetData(4, n, totalScore[n], true);
        //     }
        // }
    }

    /**
     * 明细
     */
    public mingXi(){
        cc.log("明细");
        this.btn_mingxi.scheduleOnce(p=>{
            M_HZMJView.ins.GameJiFenBan.node.active = true;
        }, 0.3);  
    }

    /**
     * 返回
     */
    public exit(){
        cc.log("退出");
        this.node.active = false;
        if ((null != this._fun_ok_callback) && (null != this._obj_ok_callback)) {
            this._fun_ok_callback.call(this._obj_ok_callback);
        }
        this._fun_ok_callback = null;
        this._obj_ok_callback = null;
    }

    /**
     * 分享
     */
    public share(){
        cc.log("分享计分");
        this.btn_share.scheduleOnce(p=>{
            M_HZMJClass.ins.ScreenCapture(true,this.shareNode);
        }, 0.3);   
    }

    /**
     * 添加一条记录
     * */
    public gameRecord(recordData: Array<number>): void {

        var gameRecord: M_HZMJ_GameMessage.GameRecordResult = new M_HZMJ_GameMessage.GameRecordResult();
        gameRecord.PlayerScore = new Array<number>();

        while (recordData.length > 0) {
            gameRecord.PlayerScore.push(recordData.shift());
        }

        this._gameRecordAry.push(gameRecord);
    }

    /**
     * 游戏记录数据到来
     * */
    public gameRecordDataCome(recordData: Array<M_HZMJ_GameMessage.GameRecordResult>): void {
        this._hasReadData = true;
        if (recordData.length > 0) {
            this._gameRecordAry.length = 0;
        }
        // while(this._recordListContainer.numChildren > 0){
        //     this._recordListContainer.removeChildAt(0);
        // }
        while (recordData.length > 0) {
            this._gameRecordAry.push(recordData.shift());
        }
        console.log("游戏记录数据到来，分享")
        this.loadRecordData();
    }

    /**
     * 开始显示
     * */
    public startShow(fun: () => void = null, obj: any = null): void {
        this._fun_ok_callback = fun;
        this._obj_ok_callback = obj;

          // this.node.active = true;
        this.onShow();
    }

    public SetPlayerData(all:number):void{
        for (var n: number = 0; n < HZMJMahjongDef.gPlayerNum; n++) {
            this.playAry[n].SetPlayer(n);
        }
    }

    /**
     * 显示
     * */
    protected onShow(): void {
        M_HZMJVoice.GameOver();
        this.node.active = true;
        this.lab_other.string="合肥红中麻将";
        this.lab_other.string +=" 房间号:"+HZMJ.ins.iclass.getTableConfig().TableCode+"   ";

        let time = new Date();
        let strTime = time.getFullYear() + "/" + this.FomatNumber(time.getMonth() + 1) + "/" + this.FomatNumber(time.getDate());
        strTime += " " + this.FomatNumber(time.getHours()) + ":" + this.FomatNumber(time.getMinutes());
        this.lab_other.string += strTime;
        // this._lbl_date.text = strTime;
        // this._lbl_gamenum.text="局号："+HZMJ.ins.iclass.getTableConfig().TableCode;


        //if(!this._hasReadData){
        var queryRecord: M_HZMJ_GameMessage.CMD_C_QueryGameRecord = new M_HZMJ_GameMessage.CMD_C_QueryGameRecord();
        queryRecord.queryNum = 0;
        HZMJ.ins.iclass.sendData(queryRecord);
        console.log("游戏记录数据请求，分享")
        this.loadRecordData();
        // }else{
        //     this.loadRecordData();
        // }
    }

    /**
     * 显示数据列表
     * */
    private loadRecordData(): void {
        let time = new Date();
        this.lal_room.string="房间号:"+HZMJ.ins.iclass.getTableConfig().TableCode;
        this.lal_time.string=time.getFullYear() + "-" + this.FomatNumber(time.getMonth() + 1) + "-" + this.FomatNumber(time.getDate()) + " " + this.FomatNumber(time.getHours()) + ":" + this.FomatNumber(time.getMinutes());
        this.lal_jushu.string=HZMJ.ins.iclass.getTableConfig().alreadyGameNum.toString();
        //自摸次数
        for(var i=0;i<4;i++){
            this.lal_ziMoCnt[i].string="x"+this._gameRecordAry[0].ziMoCount[i].toString();
            this.lal_anGangCnt[i].string="x"+this._gameRecordAry[0].anGangCount[i].toString();
            this.lal_mingGangCnt[i].string="x"+this._gameRecordAry[0].mingGangCount[i].toString();
            this.lal_zhongMaCnt[i].string="x"+this._gameRecordAry[0].MaCount[i].toString();
        }
     
        // console.log("刷新数据"+this._gameRecordAry.length);
        var totalScore: Array<number> = new Array<number>();
        totalScore.push(0);
        totalScore.push(0);
        totalScore.push(0);
        totalScore.push(0);
        let winmax = 1;//最大赢
        for (var i: number = 0; i < this._gameRecordAry.length; i++) {
            for (var j: number = 0; j < HZMJMahjongDef.gPlayerNum; j++) {
                totalScore[j] += this._gameRecordAry[i].PlayerScore[j];
            }
        }
        for(var k=0;k<totalScore.length;k++){           
              this.scoreLable[k].string=totalScore[k].toString();
        }
      
        for (var m: number = 0; m < HZMJMahjongDef.gPlayerNum; m++) {
            if (totalScore[m] > winmax) {
                winmax = totalScore[m];
            }
            this.playAry[m].node.active = false;
        }

        for (var n: number = 0; n < HZMJMahjongDef.gPlayerNum; n++) {
            this.playAry[n].SetData(this._gameRecordAry.length,totalScore[n], totalScore[n] == winmax);
        }
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
    public gameroundStart() {
        this._hasReadData = false;
        this._gameRecordAry.splice(0, this._gameRecordAry.length);
    }
}
