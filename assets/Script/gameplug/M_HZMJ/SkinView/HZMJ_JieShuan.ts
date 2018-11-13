import { enHuCardType, HZMJ } from "../ConstDef/HZMJMahjongDef";
import M_HZMJClass from "../M_HZMJClass";
import { M_HZMJ_GameMessage } from "../../../CommonSrc/M_HZMJ_GameMessage";
import M_HZMJView from "../M_HZMJView";
import HZMJEvent from "../HZMJEvent";
import HZMJ_SinglePlayerBalance from "./HZMJ_SinglePlayerBalance";
import HZMJ_FanMa from "./HZMJ_FanMa";
import { HZMJMahjongAlgorithm } from "../HZMJMahjongAlgorithm/HZMJMahjongAlgorithm";
import M_HQMJClass from '../../M_HQMJ/M_HQMJClass';
import { SetTextureRes } from '../../MJCommon/MJ_Function';
import M_HZMJVoice from "../M_HZMJVoice";
const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_JieShuan extends cc.Component {


    @property(cc.Label)
    lbl_gameid: cc.Label=null;
    @property(cc.Label)
    lbl_tableRule: cc.Label=null;
     @property(cc.Label)
    lbl_HuCardType: cc.Label=null;
    @property(cc.Sprite)
    img_banker: cc.Sprite=null;

    @property(cc.Sprite)
    img_dianpao: cc.Sprite=null;

    @property(cc.Sprite)
    img_zimo: cc.Sprite=null;

    @property([cc.Sprite])
    img_hu: cc.Sprite[]=[];

    @property(cc.Button)
    btn_yinCang: cc.Button=null;

    @property(cc.Button)
    btn_open: cc.Button=null;

    @property(cc.Button)
    btn_exit: cc.Button=null;

    @property(cc.Button)
    btn_goon: cc.Button=null;
    //局数打完返回总结算
    @property(cc.Button)
    btn_LookZongJieSuan: cc.Button=null;

    @property(cc.Button)
    btn_share: cc.Button=null;

    @property(cc.Button)
    btn_close: cc.Button=null;
  
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
    @property(cc.Label)
    img_ying: cc.Sprite=null;
     //分数图标    
    @property([cc.Label])
    bmp_fenshu: cc.Label[]=[];
    //除了底下的按钮都放这里面
    @property(cc.Node)
    node_backgroand: cc.Node=null;
    
   
    @property([HZMJ_SinglePlayerBalance])
    balanceAry: HZMJ_SinglePlayerBalance[]=[];

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
    //private _balanceAry:Array<HZMJ_SinglePlayerBalance>;
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
       
        this._isPlayEnoughGameNum=false;
        for(let i=0;i<this.balanceAry.length;i++)
        {
            this.balanceAry[i].init();
        }
        this.node.active=false;
    }

    private sharebtn():void{
        M_HZMJClass.ins.ScreenCapture(true);
    }   
   
    private goonbtn():void{
        this.scheduleOnce(()=>{         
                this.node.dispatchEvent(new HZMJEvent(HZMJEvent.msg_goongame));        
        },0.2);      
    }
    private LookZongJieSuanbtn():void{
        this.scheduleOnce(()=>{           
                M_HZMJView.ins.PlayFenXiang.startShow(()=>{                    
                    M_HZMJClass.ins.ExitGame();
                },this);      
        },0.2);      
    }
    //查看牌桌
    private checkPaiZhuobtn():void{
        this.node_backgroand.active=false; 
        this.btn_fanHui.node.active=true; 
        this.btn_checkPaiZhuo.node.active=false;    
    }
     //返回结算
    private fanHuibtn():void{
        this.node_backgroand.active=true;
        this.btn_checkPaiZhuo.node.active=true;
        this.btn_fanHui.node.active=false;     
    }
    private exitbtn():void{
        this.scheduleOnce(()=>{
            HZMJ.ins.iclass.stopTimer();
            HZMJ.ins.iclass.exit();
        },0.2);
    }

    private closebtn():void{
        this.scheduleOnce(()=>{
            if(HZMJ.ins.iclass.getTableConfig().isValid){
                if(M_HZMJClass.ins.isSelfCreateRoom && this._isPlayEnoughGameNum){
                    M_HZMJView.ins.PlayFenXiang.startShow(()=>{
                        M_HZMJClass.ins.ExitGame();
                    },this);
                }else{
                    this.node.dispatchEvent(new HZMJEvent(HZMJEvent.msg_goongame));
                }
            }else{
                HZMJ.ins.iclass.stopTimer();
                HZMJ.ins.iclass.exit();
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
    public showJieShuan(balanceData: M_HZMJ_GameMessage.CMD_S_Balance):void{
        this.btn_checkPaiZhuo.node.active=true;
        this.btn_fanHui.node.active=false; 
        this.lbl_HuCardType.node.active=false;
        this.img_zimo.node.active=false;
        this.img_dianpao.node.active=false;
        this.img_hu[0].node.active=false;
        this.img_hu[1].node.active=false;
        this.img_hu[2].node.active=false;
        this.img_hu[3].node.active=false;

        this.lbl_gameid.string = HZMJ.ins.iclass.getGameID();
        let msg=`底分${HZMJ.ins.iclass.getTableConfig().cellScore}|`;
     //   msg+=HZMJ.ins.iclass.getTableConfig().IsGangKai?"杠后开花加番|":"";
      //  msg+=HZMJ.ins.iclass.getTableConfig().IsQiDui?"七对加番|":"";
      //  msg+=HZMJ.ins.iclass.getTableConfig().IsBuKao?"无风牌|":"";
        this.lbl_tableRule.string=msg; 
        //显示庄家位置,相对于自己
        var bankerpos=(M_HZMJClass.ins.BankerChair-M_HZMJClass.ins.SelfChair+4)%4;
        let url1="gameres/M_HZMJ/MaJiangPai/majiangresource/font/jia.fnt";
        let url2="gameres/M_HZMJ/MaJiangPai/majiangresource/font/jian.fnt";
        this.img_banker.node.y = HZMJ_JieShuan.BankerPos[bankerpos].y;
        // for(let i=0;i<4;i++){
        //     if(balanceData.playerBalance[i].TotalScore>0){           
        //     SetTextureRes(url1,this.bmp_fenshu[i].font);
        // }
        //  if(balanceData.playerBalance[i].TotalScore<0 || balanceData.playerBalance[i].TotalScore==0){           
        //     SetTextureRes(url2,this.bmp_fenshu[i]);
        // }
        // }
        //显示玩家结算数据,本家，对家,上家，下家
        var me=M_HZMJClass.ins.SelfChair;
        if(balanceData.playerBalance[me].TotalScore>0){
            // M_HZMJVoice.PlayWin();
            M_HZMJVoice.PlayCardType(`/sound/win.mp3`);     
            let url="gameres/M_HZMJ/MaJiangPai/majiangresource/mjjiesuan/img_zjsdyj_title_1.png";
            SetTextureRes(url,this.img_ying);
            

        }
         if(balanceData.playerBalance[me].TotalScore<0){
            // M_HZMJVoice.PlayLose();
            M_HZMJVoice.PlayCardType(`/sound/lost.mp3`);     
            
            let url="gameres/M_HZMJ/MaJiangPai/majiangresource/mjjiesuan/img_zjsdyj_title_2.png";
            SetTextureRes(url,this.img_ying);
        }
         if(balanceData.playerBalance[me].TotalScore==0){
             //M_HZMJVoice.PlayPing();
            M_HZMJVoice.PlayCardType(`/sound/audio_liuju.mp3`); 
            let url="gameres/M_HZMJ/MaJiangPai/majiangresource/mjjiesuan/img_zjsdyj_title_3.png";
            SetTextureRes(url,this.img_ying);
        }
        this.balanceAry[0].showBalance(M_HZMJClass.ins.TablePlayer[me].NickName,balanceData.playerCard[me],balanceData.playerBalance[me]);
        if(balanceData.playerBalance[me].FangPao>0)
        {
            this.img_dianpao.node.active=true;
            //this._img_dianpao.x=HZMJ_JieShuan.DianPaoORZiMoPos[0].x;
            this.img_dianpao.node.y=HZMJ_JieShuan.DianPaoORZiMoPos[0].y;
        }
        else if(balanceData.playerBalance[me].HuType>0)
        {
            if(balanceData.playerBalance[me].HuType==enHuCardType.HuCardType_ZiMo||balanceData.playerBalance[me].HuType==enHuCardType.HuCardType_GangShangHua)
            {
                this.img_zimo.node.active=true;
                this.lbl_HuCardType.node.active=true;
                this.lbl_HuCardType.string = M_HZMJClass.ins.HuCardtype;
               this.lbl_HuCardType.node.y=HZMJ_JieShuan.PaiXingPos[0].y;
                //this._img_zimo.x=HBMJ_JieShuan.DianPaoORZiMoPos[0].x;
                this.img_zimo.node.y=HZMJ_JieShuan.DianPaoORZiMoPos[0].y;
            }
            else
            {
                this.img_hu[0].node.active=true;
            }
        }
        var dui=(me+1)%4;
        this.balanceAry[1].showBalance(M_HZMJClass.ins.TablePlayer[dui].NickName,balanceData.playerCard[dui],balanceData.playerBalance[dui]);  
        if(balanceData.playerBalance[dui].FangPao>0)
        {
            this.img_dianpao.node.active=true;
             //this.lbl_HuCardType.node.active=true;
            // this.lbl_HuCardType.string = M_HZMJClass.ins.HuCardtype;
            //this._img_dianpao.x=HZMJ_JieShuan.DianPaoORZiMoPos[1].x;
            this.img_dianpao.node.y=HZMJ_JieShuan.DianPaoORZiMoPos[1].y;
           // this.lbl_HuCardType.node.y=HZMJ_JieShuan.DianPaoORZiMoPos[1].y;
        }
         else if(balanceData.playerBalance[dui].HuType>0)
        {
            if(balanceData.playerBalance[dui].HuType==enHuCardType.HuCardType_ZiMo||balanceData.playerBalance[dui].HuType==enHuCardType.HuCardType_GangShangHua)
            {
                this.img_zimo.node.active=true;
                 this.lbl_HuCardType.node.active=true;
                 this.lbl_HuCardType.string = M_HZMJClass.ins.HuCardtype;
                //this._img_zimo.x=HBMJ_JieShuan.DianPaoORZiMoPos[1].x;
                this.img_zimo.node.y=HZMJ_JieShuan.DianPaoORZiMoPos[1].y;
                this.lbl_HuCardType.node.y=HZMJ_JieShuan.PaiXingPos[1].y;
            }
            else
            {
                this.img_hu[1].node.active=true;
            }
        }  
        var shang=(me+2)%4;
        this.balanceAry[2].showBalance(M_HZMJClass.ins.TablePlayer[shang].NickName,balanceData.playerCard[shang],balanceData.playerBalance[shang]);
        if(balanceData.playerBalance[shang].FangPao>0)
        {
            this.img_dianpao.node.active=true;
            //this._img_dianpao.x=HZMJ_JieShuan.DianPaoORZiMoPos[2].x;
            this.img_dianpao.node.y=HZMJ_JieShuan.DianPaoORZiMoPos[2].y;
        }
       else if(balanceData.playerBalance[shang].HuType>0)
        {
            if(balanceData.playerBalance[shang].HuType==enHuCardType.HuCardType_ZiMo||balanceData.playerBalance[shang].HuType==enHuCardType.HuCardType_GangShangHua)
            {
                this.img_zimo.node.active=true;
                 this.lbl_HuCardType.node.active=true;
                 this.lbl_HuCardType.string =M_HZMJClass.ins.HuCardtype;
                //this._img_zimo.x=HBMJ_JieShuan.DianPaoORZiMoPos[2].x;
                this.img_zimo.node.y=HZMJ_JieShuan.DianPaoORZiMoPos[2].y;
                this.lbl_HuCardType.node.y=HZMJ_JieShuan.PaiXingPos[2].y;
            }
            else
            {
                this.img_hu[2].node.active=true;
            }
        }
        var xia=(me+3)%4;
        this.balanceAry[3].showBalance(M_HZMJClass.ins.TablePlayer[xia].NickName,balanceData.playerCard[xia],balanceData.playerBalance[xia]);
        if(balanceData.playerBalance[xia].FangPao>0)
        {
            this.img_dianpao.node.active=true;
            //this._img_dianpao.x=HZMJ_JieShuan.DianPaoORZiMoPos[3].x;
            this.img_dianpao.node.y=HZMJ_JieShuan.DianPaoORZiMoPos[3].y;
        }
         else if(balanceData.playerBalance[xia].HuType>0)
        {
            if(balanceData.playerBalance[xia].HuType==enHuCardType.HuCardType_ZiMo||balanceData.playerBalance[xia].HuType==enHuCardType.HuCardType_GangShangHua)
            {
                this.img_zimo.node.active=true;
                 this.lbl_HuCardType.node.active=true;
                 this.lbl_HuCardType.string = M_HZMJClass.ins.HuCardtype;
                //this._img_zimo.x=HBMJ_JieShuan.DianPaoORZiMoPos[3].x;
                this.img_zimo.node.y=HZMJ_JieShuan.DianPaoORZiMoPos[3].y;
                this.lbl_HuCardType.node.y=HZMJ_JieShuan.PaiXingPos[3].y;
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
        if(M_HZMJClass.ins.isSelfCreateRoom && this._isPlayEnoughGameNum) {
            M_HZMJClass.ins.ignoreForceLeft = true;
        }
        this.btn_exit.node.active = !HZMJ.ins.iclass.isCreateRoom();
        this.btn_share.node.active = HZMJ.ins.iclass.isCreateRoom();
        //egret.setTimeout(()=>{
        console.log("jiesuan");
        setTimeout(function(){  
            this.node.active=true;
        }.bind(this),300);
        //},this,300);

         
        for(let i=0;i<6;i++){
        this.img_zhongma[i].node.active=false;
        this.bmp_cardcolorAry[i].node.active=false;                 
    }
        for(let k=0;k<M_HZMJClass.ins._fanma.length;k++){
            if(M_HZMJClass.ins._fanma[k]!=0){                  
                 this.bmp_cardbackAry[k].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                 this.bmp_cardcolorAry[k].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(M_HZMJClass.ins._fanma[k]);                          
                 this.bmp_cardcolorAry[k].node.active=true;  
                 this.bmp_cardcolorAry[k].node.scaleX=0.3;
                 this.bmp_cardcolorAry[k].node.scaleY=0.3; 
                 this.bmp_cardbackAry[k].node.scaleX=0.5;
                 this.bmp_cardbackAry[k].node.scaleY=0.5;         
        }
            if((HZMJMahjongAlgorithm.GetMahjongValue(M_HZMJClass.ins._fanma[k])==1) || (HZMJMahjongAlgorithm.GetMahjongValue(M_HZMJClass.ins._fanma[k])==5) || (HZMJMahjongAlgorithm.GetMahjongValue(M_HZMJClass.ins._fanma[k])==9) || (HZMJMahjongAlgorithm.GetMahjongValue(M_HZMJClass.ins._fanma[k])==35))
            {
                 this.img_zhongma[k].node.active=true; 
            }
        }
    }
}
