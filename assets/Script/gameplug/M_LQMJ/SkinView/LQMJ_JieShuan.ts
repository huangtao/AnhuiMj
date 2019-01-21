import { enHuCardType, LQMJ } from '../ConstDef/LQMJMahjongDef';
import { M_LQMJ_GameMessage } from "../../../CommonSrc/M_LQMJ_GameMessage";
import M_LQMJView from "../M_LQMJView";
import LQMJEvent from "../LQMJEvent";
import LQMJ_SinglePlayerBalance from "./LQMJ_SinglePlayerBalance";
import { LQMJMahjongAlgorithm } from "../LQMJMahjongAlgorithm/LQMJMahjongAlgorithm";
import M_LQMJClass from '../M_LQMJClass';
import { SetTextureRes } from '../../MJCommon/MJ_Function';
import M_LQMJVoice from "../M_LQMJVoice";
const { ccclass, property } = cc._decorator;

@ccclass
export default class LQMJ_JieShuan extends cc.Component {


    @property(cc.Label)
    lbl_gameid: cc.Label=null;
    //牌型分
     @property([cc.Label])
    lbl_HuCardType: cc.Label[] = [];

    @property(cc.Sprite)
    img_banker: cc.Sprite=null;

    @property(cc.Sprite)
    img_creator: cc.Sprite=null;

    @property(cc.Sprite)
    img_dianpao: cc.Sprite=null;

    @property(cc.Sprite)
    img_zimo: cc.Sprite=null;

    @property([cc.Sprite])
    img_hu: cc.Sprite[]=[];

    @property(cc.Button)
    btn_goon: cc.Button=null;
    //局数打完返回总结算
    @property(cc.Button)
    btn_LookZongJieSuan: cc.Button=null;

    //中码图标
     @property([cc.Sprite])
    img_zhongma: cc.Sprite[]=[];
    //牌面
     @property([cc.Sprite])
    bmp_cardbackAry: cc.Sprite[]=[];
    //花色
     @property([cc.Sprite])
    bmp_cardcolorAry: cc.Sprite[]=[];
    //查看牌桌
    @property(cc.Button)
    btn_checkPaiZhuo: cc.Button=null;

     //返回结算
    @property(cc.Button)
    btn_fanHui: cc.Button=null;
 
     //输赢图标
    @property(cc.Sprite)
    img_ying: cc.Sprite=null;
    @property(cc.Sprite)
    img_ping: cc.Sprite=null;
    @property(cc.Sprite)
    img_shu: cc.Sprite=null;
    //除了底下的按钮都放这里面
    @property(cc.Node)
    node_background: cc.Node=null;
    
   
    @property([LQMJ_SinglePlayerBalance])
    balanceAry: LQMJ_SinglePlayerBalance[]=[];

    onLoad() {   
    }

    private static BankerPos: Array<{ x: number,y: number }> = [

         { x: -520,y: 460 },          
        { x: -520,y: 337 },
        { x: -520,y: 210 },
        { x: -520,y: 85 }       
    ];   
    // { x: 95,y: 130 },
    //         { x: 95,y: 490 },
    //         { x: 95,y: 250 },
    //         { x: 95,y: 370 }
    private static DianPaoORZiMoPos: Array<{ x: number,y: number }> = [
        { x: -50,y: 470 },        
        { x: -50,y: 360 },
        { x: -50,y: 230 },
        { x: -50,y: 110 }
    ]; 
    private static PaiXingPos: Array<{ x: number,y: number }> = [
        { x: -50,y: 515 },        
        { x: -50,y: 395 },
        { x: -50,y: 275 },
        { x: -50,y: 155 }
    ]; 
    // //隐藏结算界面
    // private _btn_yinCang:eui.Button;
    // //显示结算界面
    // private _btn_open:eui.Button;

    //玩家结算数据
    //private _balanceAry:Array<LQMJ_SinglePlayerBalance>;
    // //退出
    // private _btn_exit:eui.Button;
    // //继续
    // private _btn_goon:eui.Button;
    // //分享
    // private _btn_share:eui.Button;
    // //游戏id
    // private _lbl_gameid:eui.Label;
    // //游戏规则
    // private _lbl_tableRule:eui.Label;
    //是否打满设置局数
    private _isPlayEnoughGameNum:boolean;    

    public init():void{
        this.btn_fanHui.node.active = false;
        this.btn_checkPaiZhuo.node.active = true;
        this._isPlayEnoughGameNum=false;
        for(let i=0;i<this.balanceAry.length;i++)
        {
            this.balanceAry[i].init();
        }
        this.node.active=false;
    }

    public isVisible() : boolean{
        return this.node.active;
    }
    private sharebtn():void{
        M_LQMJClass.ins.ScreenCapture(true);
    }   
   
    public goonbtn():void{
        // if(M_LQMJClass.ins.TableConfig.realGameNum == M_LQMJClass.ins.TableConfig.setGameNum){
        //     M_LQMJClass.ins.checkMoneyCanGame();
        // }else{
            this.scheduleOnce(()=>{         
                    this.node.dispatchEvent(new LQMJEvent(LQMJEvent.msg_goongame));        
            },0.2);      
        // }
    }
    private LookZongJieSuanbtn():void{
        this.scheduleOnce(()=>{           
                M_LQMJView.ins.PlayFenXiang.startShow(()=>{                    
                    M_LQMJClass.ins.ExitGame();
                },this);      
        },0.2);      
    }
    //查看牌桌
    private checkPaiZhuobtn():void{
        this.node_background.active=false; 
        this.btn_fanHui.node.active=true; 
        this.btn_checkPaiZhuo.node.active=false;    
    }
     //返回结算
    private fanHuibtn():void{
        this.node_background.active=true;
        this.btn_checkPaiZhuo.node.active=true;
        this.btn_fanHui.node.active=false;     
    }
    private exitbtn():void{
        this.scheduleOnce(()=>{
            LQMJ.ins.iclass.stopTimer();
            LQMJ.ins.iclass.exit();
        },0.2);
    }

    private closebtn():void{
        this.scheduleOnce(()=>{
            if(LQMJ.ins.iclass.getTableConfig().isValid){
                if(M_LQMJClass.ins.isSelfCreateRoom && this._isPlayEnoughGameNum){
                    M_LQMJView.ins.PlayFenXiang.startShow(()=>{
                        M_LQMJClass.ins.ExitGame();
                    },this);
                }else{
                    this.node.dispatchEvent(new LQMJEvent(LQMJEvent.msg_goongame));
                }
            }else{
                LQMJ.ins.iclass.stopTimer();
                LQMJ.ins.iclass.exit();
            }
        },0.2);
    }
    public closeJieSuan():void{
        // egret.Tween.get(this).to({ y: -840 },150,egret.Ease.sineInOut).call(() => {
        //     this._btn_open.visible = true;
        //     this._btn_yinCang.visible = false;
        // },this);
    }

    public openJieSuan():void{
        // egret.Tween.get(this).to({ y: 0 },150,egret.Ease.sineInOut).call(() => {
        //     this._btn_open.visible = false;
        //     this._btn_yinCang.visible = true;
        // },this);
    }
    /**
     * 显示结算
     * */
    public showJieShuan(balanceData: M_LQMJ_GameMessage.CMD_S_Balance):void{
        this.node.active=true;
        this.node_background.active=true;
        
        this.lbl_HuCardType[0].node.active=false;
        this.lbl_HuCardType[1].node.active=false;
        this.lbl_HuCardType[2].node.active=false;
        this.lbl_HuCardType[3].node.active=false;
        this.img_zimo.node.active=false;
        this.img_dianpao.node.active=false;
        this.img_hu[0].node.active=false;
        this.img_hu[1].node.active=false;
        this.img_hu[2].node.active=false;
        this.img_hu[3].node.active=false;

        this.lbl_gameid.string = LQMJ.ins.iclass.getGameID();
        let msg=`底分${LQMJ.ins.iclass.getTableConfig().cellScore}|`;
        //显示庄家位置,相对于自己
        var bankerpos=(M_LQMJClass.ins.BankerChair-M_LQMJClass.ins.SelfChair+4)%4;
        this.img_banker.node.y = LQMJ_JieShuan.BankerPos[bankerpos].y + 65;

        //房主
        let creatorPos = (M_LQMJClass.ins.getTableConfig().tableCreatorChair - M_LQMJClass.ins.SelfChair + 4)%4;
        this.img_creator.node.y = LQMJ_JieShuan.BankerPos[bankerpos].y + 25;

        //显示玩家结算数据,本家，对家,上家，下家
        var me=M_LQMJClass.ins.SelfChair;
        if(balanceData.playerBalance[me].TotalScore>0){
            // M_LQMJVoice.PlayWin();
            M_LQMJVoice.PlayCardType(`/sound/win.mp3`);     
            // let url="gameres/mjjiesuan/img_zjsdyj_title_1.png";
            // SetTextureRes(url,this.img_ying);
            this.img_ying.node.active = true;
            this.img_shu.node.active = false;
            this.img_ping.node.active = false;
        }
         if(balanceData.playerBalance[me].TotalScore<0){
            // M_LQMJVoice.PlayLose();
            M_LQMJVoice.PlayCardType(`/sound/lost.mp3`);     
            // let url="gameres/gameCommonRes/MaJiangPai/majiangresource/mjjiesuan/img_zjsdyj_title_2.png";
            // SetTextureRes(url,this.img_ying);
            this.img_ying.node.active = false;
            this.img_shu.node.active = true;
            this.img_ping.node.active = false;
        }
         if(balanceData.playerBalance[me].TotalScore==0){
             //M_LQMJVoice.PlayPing();
            M_LQMJVoice.PlayCardType(`/sound/audio_liuju.mp3`); 
            // let url="gameres/gameCommonRes/MaJiangPai/majiangresource/mjjiesuan/img_zjsdyj_title_3.png";
            // SetTextureRes(url,this.img_ying);
            this.img_ying.node.active = false;
            this.img_shu.node.active = false;
            this.img_ping.node.active = true;
        }

        this.balanceAry[0].showBalance(M_LQMJClass.ins.TablePlayer[me].NickName,balanceData.playerCard[me],balanceData.playerBalance[me],M_LQMJClass.ins.TablePlayer[me].FaceID);
        if("" != balanceData.playerBalance[me].vecType){
            //牌型分
            this.lbl_HuCardType[0].string = balanceData.playerBalance[me].vecType;
            this.lbl_HuCardType[0].node.active=true;
            this.lbl_HuCardType[0].node.y=LQMJ_JieShuan.PaiXingPos[0].y - 3;
        }
        if(balanceData.playerBalance[me].FangPao>0)
        {
            this.img_dianpao.node.active=true;
            //this._img_dianpao.x=LQMJ_JieShuan.DianPaoORZiMoPos[0].x;
            this.img_dianpao.node.y=LQMJ_JieShuan.DianPaoORZiMoPos[0].y;
        }
        else if(balanceData.playerBalance[me].HuType>0)
        {
            if(balanceData.playerBalance[me].HuType==enHuCardType.HuCardType_ZiMo||balanceData.playerBalance[me].HuType==enHuCardType.HuCardType_GangShangHua)
            {
                this.img_zimo.node.active=true;              
                this.img_zimo.node.y=LQMJ_JieShuan.DianPaoORZiMoPos[0].y;
            }
            else
            {
                this.img_hu[0].node.active=true;
            }
        }
        var dui=(me+1)%4;
        this.balanceAry[1].showBalance(M_LQMJClass.ins.TablePlayer[dui].NickName,balanceData.playerCard[dui],balanceData.playerBalance[dui],M_LQMJClass.ins.TablePlayer[dui].FaceID);  
        if("" != balanceData.playerBalance[dui].vecType){
            //牌型分
            this.lbl_HuCardType[1].string = balanceData.playerBalance[dui].vecType;
            this.lbl_HuCardType[1].node.active=true;
            this.lbl_HuCardType[1].node.y=LQMJ_JieShuan.PaiXingPos[1].y - 3;
        }
        if(balanceData.playerBalance[dui].FangPao>0)
        {
            this.img_dianpao.node.active=true;
             //this.lbl_HuCardType.node.active=true;
            // this.lbl_HuCardType.string = M_LQMJClass.ins.HuCardtype;
            //this._img_dianpao.x=LQMJ_JieShuan.DianPaoORZiMoPos[1].x;
            this.img_dianpao.node.y=LQMJ_JieShuan.DianPaoORZiMoPos[1].y;
           // this.lbl_HuCardType.node.y=LQMJ_JieShuan.DianPaoORZiMoPos[1].y;
        }
         else if(balanceData.playerBalance[dui].HuType>0)
        {
            if(balanceData.playerBalance[dui].HuType==enHuCardType.HuCardType_ZiMo||balanceData.playerBalance[dui].HuType==enHuCardType.HuCardType_GangShangHua)
            {
                this.img_zimo.node.active=true;             
                this.img_zimo.node.y=LQMJ_JieShuan.DianPaoORZiMoPos[1].y;             
            }
            else
            {
                this.img_hu[1].node.active=true;
            }
        }  
        var shang=(me+2)%4;
        this.balanceAry[2].showBalance(M_LQMJClass.ins.TablePlayer[shang].NickName,balanceData.playerCard[shang],balanceData.playerBalance[shang],M_LQMJClass.ins.TablePlayer[shang].FaceID);
        if("" != balanceData.playerBalance[shang].vecType){
            //牌型分
            this.lbl_HuCardType[2].string = balanceData.playerBalance[shang].vecType;
            this.lbl_HuCardType[2].node.active=true;
            this.lbl_HuCardType[2].node.y=LQMJ_JieShuan.PaiXingPos[2].y - 3;
        }
        if(balanceData.playerBalance[shang].FangPao>0)
        {
            this.img_dianpao.node.active=true;
            //this._img_dianpao.x=LQMJ_JieShuan.DianPaoORZiMoPos[2].x;
            this.img_dianpao.node.y=LQMJ_JieShuan.DianPaoORZiMoPos[2].y;
        }
       else if(balanceData.playerBalance[shang].HuType>0)
        {
            if(balanceData.playerBalance[shang].HuType==enHuCardType.HuCardType_ZiMo||balanceData.playerBalance[shang].HuType==enHuCardType.HuCardType_GangShangHua)
            {
                this.img_zimo.node.active=true;
                this.img_zimo.node.y=LQMJ_JieShuan.DianPaoORZiMoPos[2].y;
            }
            else
            {
                this.img_hu[2].node.active=true;
            }
        }
        var xia=(me+3)%4;
        this.balanceAry[3].showBalance(M_LQMJClass.ins.TablePlayer[xia].NickName,balanceData.playerCard[xia],balanceData.playerBalance[xia],M_LQMJClass.ins.TablePlayer[xia].FaceID);
        if("" != balanceData.playerBalance[xia].vecType){
            //牌型分
            this.lbl_HuCardType[3].string = balanceData.playerBalance[xia].vecType;
            this.lbl_HuCardType[3].node.active=true;
            this.lbl_HuCardType[3].node.y=LQMJ_JieShuan.PaiXingPos[3].y - 3;
        }
        if(balanceData.playerBalance[xia].FangPao>0)
        {
            this.img_dianpao.node.active=true;
            //this._img_dianpao.x=LQMJ_JieShuan.DianPaoORZiMoPos[3].x;
            this.img_dianpao.node.y=LQMJ_JieShuan.DianPaoORZiMoPos[3].y;
        }
         else if(balanceData.playerBalance[xia].HuType>0)
        {
            if(balanceData.playerBalance[xia].HuType==enHuCardType.HuCardType_ZiMo||balanceData.playerBalance[xia].HuType==enHuCardType.HuCardType_GangShangHua)
            {
                this.img_zimo.node.active=true;
                this.img_zimo.node.y=LQMJ_JieShuan.DianPaoORZiMoPos[3].y;
            }
            else
            {
                this.img_hu[3].node.active=true;
            }
        }

        this.node.x=0;
        this.node.y=0;
        this._isPlayEnoughGameNum = balanceData.isPlayEnougnGameNum != 0;
        if(this._isPlayEnoughGameNum){
          this.btn_LookZongJieSuan.node.active=true; 
          this.btn_goon.node.active=false;      
       }
        else{
          this.btn_LookZongJieSuan.node.active=false;
          this.btn_goon.node.active=true;       
        }
        if(M_LQMJClass.ins.isSelfCreateRoom && this._isPlayEnoughGameNum) {
            M_LQMJClass.ins.ignoreForceLeft = true;
        }
        //egret.setTimeout(()=>{
        console.log("jiesuan");
        
        this.scheduleOnce(function () {
            this.node.active=true;
            console.log("--------延时发牌-------")
            }.bind(this), 0.3)

        //},this,300);
       
    }

    onEnable() {
        cc.info("--- active is true");
        this.unscheduleAllCallbacks();
    }
}
