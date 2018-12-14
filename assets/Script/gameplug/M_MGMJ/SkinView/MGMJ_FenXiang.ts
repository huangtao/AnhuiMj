import { M_MGMJ_GameMessage } from "../../../CommonSrc/M_MGMJ_GameMessage";
import MGMJ_SinglePlayerFX from "./MGMJ_SinglePlayerFX";
import M_MGMJClass from '../M_MGMJClass';
import M_MGMJView from "../M_MGMJView";
import { MGMJMahjongDef, MGMJ } from '../ConstDef/MGMJMahjongDef';
import M_MGMJVoice from "../M_MGMJVoice";
import { GameBaseClass } from '../../base/GameBaseClass';
import { LoadHeader } from "../../../Tools/Function";
const { ccclass, property } = cc._decorator;

@ccclass
export default class MGMJ_FenXiang extends cc.Component {

    //返回
    @property(cc.Button)
    btn_exit: cc.Button=null;

    //分享
    @property(cc.Button)
    btn_share: cc.Button=null;

    //复制
    @property(cc.Button)
    btn_copyScore:cc.Button=null;

    //单个玩家分享信息
    @property([MGMJ_SinglePlayerFX])
    playAry: MGMJ_SinglePlayerFX[]=[];

   //分数
    @property(cc.Label)
    scoreLable: cc.Label[]=[];
    @property(cc.Label)
    scoreLableWin: cc.Label[]=[];
    
    //房间号
    @property(cc.Label)
    lal_room: cc.Label=null;
    //亲友房
    @property(cc.Label)
    lal_club: cc.Label=null;
    //圈号
    @property(cc.Label)
    lal_clubNum: cc.Label=null;

  //总局数
   @property(cc.Label)
   lal_jushu: cc.Label=null;
  //时间
   @property(cc.Label)
   lal_time: cc.Label=null;
  //自摸次数
   @property(cc.Label)
   lal_ziMoCnt: cc.Label[]=[];
  //点炮胡次数
   @property(cc.Label)
   lal_dianPaoHuCnt: cc.Label[]=[];
  //暗杠次数
   @property(cc.Label)
   lal_anGangCnt: cc.Label[]=[];
  //明杠次数
   @property(cc.Label)
   lal_mingGangCnt: cc.Label[]=[];
   //房主标识
   @property([cc.Sprite])
   img_onwer:cc.Sprite[] = [];

   //头像
   @property([cc.Sprite])
   img_head:cc.Sprite[] = [];

    @property(cc.Label)
    lab_other: cc.Label=null;
    @property(cc.Node)
    shareNode: cc.Node=null;

    @property(cc.Label)
    rule0: cc.Label = null;
    @property(cc.Label)
    rule1: cc.Label = null;
    //
    //======================================================
    //

    //记录数据
    private _gameRecordAry: Array<M_MGMJ_GameMessage.GameRecordResult>;
    //是否取过数据
    private _hasReadData: boolean;

    private _fun_ok_callback: () => void;
    private _obj_ok_callback: any;

    onLoad() {
        // init logic
        
    }

    public init() {
        this.node.setLocalZOrder(1000);
        this._gameRecordAry = new Array<M_MGMJ_GameMessage.GameRecordResult>();
        this._hasReadData = false;
        
        // var totalScore: Array<number> = new Array<number>();
        // totalScore[0] = 4;
        // totalScore[1] = 23;
        // totalScore[2] = 3243;
        // totalScore[3] = 435567;

        // for (var n: number = 0; n < MGMJMahjongDef.gPlayerNum; n++) {
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
    // public mingXi(){
    //     cc.log("明细");
    //     this.btn_mingxi.scheduleOnce(p=>{
    //         M_MGMJView.ins.GameJiFenBan.node.active = true;
    //     }, 0.3);  
    // }

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
            M_MGMJClass.ins.ScreenCapture(true,this.node);
        }, 0.3);   
    }

    /**
     * 复制分数
     */
    public copyScore(){
        cc.log("复制分数");
        let scoreStr : string = "";

        var totalScore: Array<number> = new Array<number>();
        totalScore.push(0);
        totalScore.push(0);
        totalScore.push(0);
        totalScore.push(0);
        for (var i: number = 0; i < this._gameRecordAry.length; i++) {
            for (var j: number = 0; j < MGMJMahjongDef.gPlayerNum; j++) {
                totalScore[j] += this._gameRecordAry[i].PlayerScore[j];
            }
        }

        scoreStr = "本局分数："+"\n"+this.playAry[0].lbl_play.string+":"+totalScore[0]+"\n"
                    + this.playAry[1].lbl_play.string+":"+totalScore[1]+"\n"
                    + this.playAry[2].lbl_play.string+":"+totalScore[2]+"\n"
                    + this.playAry[3].lbl_play.string+":"+totalScore[3]+"\n";
        M_MGMJClass.ins.CopyToClipboard(scoreStr);
    }

    /**
     * 添加一条记录
     * */
    public gameRecord(recordData: Array<number>): void {

        var gameRecord: M_MGMJ_GameMessage.GameRecordResult = new M_MGMJ_GameMessage.GameRecordResult();
        gameRecord.PlayerScore = new Array<number>();

        while (recordData.length > 0) {
            gameRecord.PlayerScore.push(recordData.shift());
        }

        this._gameRecordAry.push(gameRecord);
    }

    /**
     * 游戏记录数据到来
     * */
    public gameRecordDataCome(recordData: Array<M_MGMJ_GameMessage.GameRecordResult>): void {
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
        for (let i = 0; i < MGMJMahjongDef.gPlayerNum; i++) {
            this.playAry[i].init();
            if(null != M_MGMJClass.ins.TablePlayer[i])
                LoadHeader(M_MGMJClass.ins.TablePlayer[i].FaceID, this.img_head[i]);
        }
        M_MGMJVoice.PlayCardType(`/sound/final_report.mp3`);
        this.onShow();
    }

    public SetPlayerData(all:number):void{
        for (var n: number = 0; n < MGMJMahjongDef.gPlayerNum; n++) {
            this.playAry[n].SetPlayer(n);
        }
    }

    /**
     * 显示
     * */
    protected onShow(): void {
        //播放游戏结束音效
       // M_MGMJVoice.GameOver();
        this.node.active = true;
        this.lab_other.string="明光麻将";
        //游戏规则
        var rule = M_MGMJClass.ins.GameRule;
        var rule0 = "";
        var rule1 = "";
        if(rule.GameData.SetGameNum == 8)
            rule0 += "8局 ";
        if(rule.GameData.SetGameNum == 16)
            rule0 += "16局 ";
        if(rule.GameData.tableCreatorPay == 1)
            rule0 += "AA支付 ";
        if(rule.GameData.tableCreatorPay == 2)
            rule0 += "房主支付 ";
        if(rule.GameData.tableCreatorPay == 3)
            rule0 += "圈主支付 ";
        
        if(rule.GameData.PeiZi==55)
            rule1 += "白皮配子 ";
        if(rule.GameData.PeiZi!=55)
            rule1 += "随机配子 ";
        if(rule.GameData.zhanZhuang)
            rule1 += "占庄 ";
        if(rule.GameData.DianPao)
            rule1 += "点炮 ";
        if(rule.GameData.QiangGangHu)
            rule1 += "抢杠胡 ";
            
        //显示玩法
        this.rule0.string = rule0;
        this.rule1.string = rule1;

        let time = new Date();
        let strTime = time.getFullYear() + "/" + this.FomatNumber(time.getMonth() + 1) + "/" + this.FomatNumber(time.getDate());
        strTime += " " + this.FomatNumber(time.getHours()) + ":" + this.FomatNumber(time.getMinutes());

        var queryRecord: M_MGMJ_GameMessage.CMD_C_QueryGameRecord = new M_MGMJ_GameMessage.CMD_C_QueryGameRecord();
        queryRecord.queryNum = 0;
        MGMJ.ins.iclass.sendData(queryRecord);
        console.log("游戏记录数据请求，分享")
        this.loadRecordData();

    }

    /**
     * 显示数据列表
     * */
    private loadRecordData(): void {
        let time = new Date();
        if(M_MGMJClass.ins.TableConfig.tableWhere > 0){//亲友圈
            this.lal_club.node.active = true;
            this.lal_clubNum.node.active = true;
            this.lal_clubNum.string = M_MGMJClass.ins.TableConfig.tableWhere.toString();
            this.lal_room.string="亲友圈房号:"+MGMJ.ins.iclass.getTableConfig().TableCode;
        }else{
            this.lal_club.node.active = false;
            this.lal_clubNum.node.active = false;
            this.lal_room.string="房间号:"+MGMJ.ins.iclass.getTableConfig().TableCode;
        }
        this.lal_time.string=time.getFullYear() + "-" + this.FomatNumber(time.getMonth() + 1) + "-" + this.FomatNumber(time.getDate()) + " " + this.FomatNumber(time.getHours()) + ":" + this.FomatNumber(time.getMinutes());
        this.lal_jushu.string=MGMJ.ins.iclass.getTableConfig().alreadyGameNum.toString();
        // if(null == this._gameRecordAry[0].huGangCount){
        //     for(let i=0;i<4;i++){
        //         for(let j=0;j<4;j++){
        //             this._gameRecordAry[0].huGangCount[i][j] = 0;
        //         }
        //         this._gameRecordAry[0].PlayerScore[i] = 0;
        //     }
        // }
    
        if(null != this._gameRecordAry[0].huGangCount){
        
        //胡牌 杠牌次数统计 杠和暗杠页面标签拖拽错误 处理交换 2 3 
            for(var i=0;i<4;i++){
                this.lal_ziMoCnt[i].string="x"+this._gameRecordAry[0].huGangCount[i][0].toString();
                this.lal_dianPaoHuCnt[i].string="x"+this._gameRecordAry[0].huGangCount[i][1].toString();
                this.lal_mingGangCnt[i].string="x"+this._gameRecordAry[0].huGangCount[i][3].toString();
                this.lal_anGangCnt[i].string="x"+this._gameRecordAry[0].huGangCount[i][2].toString();
            }
        }else{
            for(var i=0;i<4;i++){
                this.lal_ziMoCnt[i].string="x"+0;
                this.lal_dianPaoHuCnt[i].string="x"+0;
                this.lal_mingGangCnt[i].string="x"+0;
                this.lal_anGangCnt[i].string="x"+0;
            }
        }

        var totalScore: Array<number> = new Array<number>();
        totalScore.push(0);
        totalScore.push(0);
        totalScore.push(0);
        totalScore.push(0);
        let winmax = 1;//最大赢
        for (var i: number = 0; i < this._gameRecordAry.length; i++) {
            for (var j: number = 0; j < MGMJMahjongDef.gPlayerNum; j++) {
                if(this._gameRecordAry[0].PlayerScore.length != 0)
                    totalScore[j] += this._gameRecordAry[i].PlayerScore[j];
                else
                    totalScore[j] += 0;
            }
        }
        for(var k=0;k<4;k++){
            if(totalScore[k] > 0){
                this.scoreLable[k].node.active = false;
                this.scoreLable[k+4].node.active = true;
                this.scoreLable[k+4].string = "+" + totalScore[k].toString();
            }else{
                this.scoreLable[k].node.active = true;
                this.scoreLable[k+4].node.active = false;
                this.scoreLable[k].string = totalScore[k].toString();
            }            
        }
      
        for (var m: number = 0; m < MGMJMahjongDef.gPlayerNum; m++) {
            if (totalScore[m] > winmax) {
                winmax = totalScore[m];
            }
            this.playAry[m].node.active = false;
        }
        //显示房主
        for(let i:number=0;i<MGMJMahjongDef.gPlayerNum;i++){
            if(i == this._gameRecordAry[0].Banker)
                this.img_onwer[i].node.active = true;
            else
                this.img_onwer[i].node.active = false;
        }

        for (var n: number = 0; n < MGMJMahjongDef.gPlayerNum; n++) {
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
