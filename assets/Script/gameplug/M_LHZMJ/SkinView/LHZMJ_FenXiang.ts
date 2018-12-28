import { M_LHZMJ_GameMessage } from "../../../CommonSrc/M_LHZMJ_GameMessage";
import LHZMJ_SinglePlayerFX from "./LHZMJ_SinglePlayerFX";
import M_LHZMJClass from "../M_LHZMJClass";
import M_LHZMJView from "../M_LHZMJView";
import { LHZMJMahjongDef, LHZMJ } from "../ConstDef/LHZMJMahjongDef";
import { LoadHeader } from "../../../Tools/Function";
import M_LHZMJVoice from "../M_LHZMJVoice";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_FenXiang extends cc.Component {

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
    @property([LHZMJ_SinglePlayerFX])
    playAry: LHZMJ_SinglePlayerFX[]=[];

          //分数
    @property(cc.Label)
    scoreLable: cc.Label[]=[];


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

    @property(cc.Node)
    playerArr:cc.Node[] = [];
    //
    //======================================================
    //

    //记录数据
    private _gameRecordAry: Array<M_LHZMJ_GameMessage.GameRecordResult>;
    //是否取过数据
    private _hasReadData: boolean;

    private _fun_ok_callback: () => void;
    private _obj_ok_callback: any;

    onLoad() {
        // init logic
        
    }

    public init() {

        this._gameRecordAry = new Array<M_LHZMJ_GameMessage.GameRecordResult>();
        this._hasReadData = false;
        for (let i = 0; i < LHZMJMahjongDef.gPlayerNum; i++) {
            this.playAry[i].init();
        }
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
            M_LHZMJClass.ins.ScreenCapture(true,this.node);
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
            for (var j: number = 0; j < LHZMJMahjongDef.gPlayerNum; j++) {
                totalScore[j] += this._gameRecordAry[i].PlayerScore[j];
            }
        }

        for(var i = 0;i < 4 ; i++){
            if(this.playAry[i].lbl_play.string != ""){
                scoreStr = this.playAry[i].lbl_play.string+":"+totalScore[i]+"\n"+scoreStr;
            }
        }
        scoreStr = "本局分数："+"\n"+scoreStr;

        // this.playAry[0].lbl_play.string+":"+totalScore[0]+"\n"
        //             + this.playAry[1].lbl_play.string+":"+totalScore[1]+"\n"
        //             + this.playAry[2].lbl_play.string+":"+totalScore[2]+"\n"
        //             + this.playAry[3].lbl_play.string+":"+totalScore[3]+"\n";

        M_LHZMJClass.ins.CopyToClipboard(scoreStr);
    }

    /**
     * 添加一条记录
     * */
    public gameRecord(recordData: Array<number>): void {

        var gameRecord: M_LHZMJ_GameMessage.GameRecordResult = new M_LHZMJ_GameMessage.GameRecordResult();
        gameRecord.PlayerScore = new Array<number>();

        while (recordData.length > 0) {
            gameRecord.PlayerScore.push(recordData.shift());
        }

        this._gameRecordAry.push(gameRecord);
    }

    /**
     * 游戏记录数据到来
     * */
    public gameRecordDataCome(recordData: Array<M_LHZMJ_GameMessage.GameRecordResult>): void {
        this._hasReadData = true;
        if (recordData.length > 0) {
            this._gameRecordAry.length = 0;
        }
        while (recordData.length > 0) {
            this._gameRecordAry.push(recordData.shift());
        }
        console.log("游戏记录数据到来，分享")
        this.loadRecordData();
    }
/**
 * 
 * @param Data 统计胡刚次数
 */
    public HuGangCount(data:M_LHZMJ_GameMessage.CMD_S_GameRecordResult):void{
        for(var i= 0;i<LHZMJMahjongDef.gPlayerNum;i++){
                this.lal_ziMoCnt[i].string="x"+data.ZiMoCnt[i];
                this.lal_dianPaoHuCnt[i].string="x"+data.ZhongMaCnt[i];
                this.lal_mingGangCnt[i].string="x"+data.MingGangCnt[i];
                this.lal_anGangCnt[i].string="x"+data.AnGangCnt[i];
        }          
    }

    /**
     * 开始显示
     * */
    public startShow(fun: () => void = null, obj: any = null): void {
        this._fun_ok_callback = fun;
        this._obj_ok_callback = obj;
        for (let i = 0; i < LHZMJMahjongDef.gPlayerNum; i++) {
            this.playAry[i].init();
            if (this.playAry[i].lbl_other.string == "undefined") { 
                this.playerArr[i].active = false;
            }
            cc.log(M_LHZMJClass.ins.TablePlayer[i]);
            if(null != M_LHZMJClass.ins.TablePlayer[i]){
                LoadHeader(M_LHZMJClass.ins.TablePlayer[i].FaceID, this.img_head[i]);
            }
        }
        M_LHZMJVoice.PlayCardType(`/sound/final_report.mp3`);
        this.onShow();
    }

    public SetPlayerData(all:number):void{
        for (var n: number = 0; n < LHZMJMahjongDef.gPlayerNum; n++) {
            cc.log(M_LHZMJClass.ins.TablePlayer[n]);
            this.playAry[n].SetPlayer(n);
        }
    }

    /**
     * 显示
     * */
    protected onShow(): void {
        this.node.active = true;
        this.lab_other.string="红中麻将";
       //游戏规则
        var rule = M_LHZMJClass.ins.GameRule;
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
        if(rule.GameData.MaShu == 0)
            rule0 += "2码 ";
        else if(rule.GameData.MaShu == 1)
            rule0 += "4码 ";
        else if(rule.GameData.MaShu == 2)
            rule0 += "6码 ";    
        if(rule.GameData.RulePeng == 0)
            rule1 += "可碰牌 ";
        else if(rule.GameData.RulePeng == 1)
            rule1 += "碰一次 ";
        else if(rule.GameData.RulePeng == 2)
            rule1 += "不可碰 ";
        if(rule.GameData.IfCanHu7Dui)
            rule1 += "可胡七对 ";
        if(rule.GameData.GangLeJiuYou)
            rule1 += "杠了就有 ";
            
        //显示玩法
        this.rule0.string = rule0;
        this.rule1.string = rule1;
        var queryRecord: M_LHZMJ_GameMessage.CMD_C_QueryGameRecord = new M_LHZMJ_GameMessage.CMD_C_QueryGameRecord();
        queryRecord.queryNum = 0;
        LHZMJ.ins.iclass.sendData(queryRecord);
        console.log("游戏记录数据请求，分享")
        this.loadRecordData();

    }

    /**
     * 显示数据列表
     * */
    private loadRecordData(): void {
               let time = new Date();
        // if(M_LHZMJClass.ins.TableConfig.tableWhere > 0){//亲友圈
        //     this.lal_club.node.active = true;
        //     this.lal_clubNum.node.active = true;
        //     this.lal_clubNum.string = M_LHZMJClass.ins.TableConfig.tableWhere.toString();
        //     this.lal_room.string="亲友圈房号:"+LHZMJ.ins.iclass.getTableConfig().TableCode;
        // }else{
            this.lal_club.node.active = false;
            this.lal_clubNum.node.active = false;
            this.lal_room.string="房间号:"+LHZMJ.ins.iclass.getTableConfig().TableCode;
//        }
        this.lal_time.string=time.getFullYear() + "-" + this.FomatNumber(time.getMonth() + 1) + "-" + this.FomatNumber(time.getDate()) + " " + this.FomatNumber(time.getHours()) + ":" + this.FomatNumber(time.getMinutes());
        this.lal_jushu.string=LHZMJ.ins.iclass.getTableConfig().alreadyGameNum.toString();


                //胡牌 杠牌次数统计
        //     for(var i=0;i<4;i++){
        //        // this.lal_ziMoCnt[i].string="x"+this._gameRecordAry[0]
        //         // this.lal_dianPaoHuCnt[i].string="x"+this._gameRecordAry[0].huGangCount[i][1].toString();
        //         // this.lal_mingGangCnt[i].string="x"+this._gameRecordAry[0].huGangCount[i][2].toString();
        //         // this.lal_anGangCnt[i].string="x"+this._gameRecordAry[0].huGangCount[i][3].toString();
        //     }
        // }


        var totalScore: Array<number> = new Array<number>();
        totalScore.push(0);
        totalScore.push(0);
        totalScore.push(0);
        totalScore.push(0);
        let winmax = 1;//最大赢
        for (var i: number = 0; i < this._gameRecordAry.length; i++) {
            for (var j: number = 0; j < LHZMJMahjongDef.gPlayerNum; j++) {
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

        for (var m: number = 0; m < LHZMJMahjongDef.gPlayerNum; m++) {
            if (totalScore[m] > winmax) {
                winmax = totalScore[m];
            }
            this.playAry[m].node.active = false;
        }

        //显示房主
        for(let i:number=0;i<LHZMJMahjongDef.gPlayerNum;i++){
            if(i == this._gameRecordAry[0].Banker)
                this.img_onwer[i].node.active = true;
            else
                this.img_onwer[i].node.active = false;
        }

        for (var n: number = 0; n < LHZMJMahjongDef.gPlayerNum; n++) {
            cc.log(M_LHZMJClass.ins.TablePlayer[n]);
            
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
