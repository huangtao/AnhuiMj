import { HZMJ } from "../ConstDef/HZMJMahjongDef";
import M_HZMJView from "../M_HZMJView";
import { M_HZMJ_GameMessage } from "../../../CommonSrc/M_HZMJ_GameMessage";
import M_HZMJClass from "../M_HZMJClass";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import  Global  from "../../../Global/Global";
import { AudioType } from '../../../CustomType/Enum';  
import { LocalStorage } from '../../../CustomType/LocalStorage';                                                        
const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_SettingView extends cc.Component {
   public isCheckHFH:boolean=false; 
   public isCheckPTH:boolean=false;    
   public musicPersent:number=0;
   public effectPersent:number=0;
    //背景
    @property(cc.Sprite)
    img_settingbg: cc.Sprite=null;

    //打开
    @property(cc.Button)
    btn_open: cc.Button=null;

    //关闭
    @property(cc.Button)
    btn_close: cc.Button=null;

    //退出
    @property(cc.Button)
    btn_exit: cc.Button=null;

    //分享
    @property(cc.Button)
    btn_share: cc.Button=null;

    //帮助
    @property(cc.Button)
    btn_help: cc.Button=null;

    //聊天
    @property(cc.Button)
    btn_setVolume: cc.Button=null;
    //关闭
    @property(cc.Button)
    btn_settingClose: cc.Button=null;
    //解散房间
    @property(cc.Button)
    btn_dissTable: cc.Button=null;

    @property(cc.Label)
    lbl_playType: cc.Label=null;
    //音量滑条
    @property(cc.Slider)
    sli_musicSlider: cc.Slider=null;
    //音效滑条
    @property(cc.Slider)
    sli_effectSlider: cc.Slider=null;
    //音乐开关
    @property(cc.Toggle)
    tog_musicOn: cc.Toggle=null;
    //音效开关
    @property(cc.Toggle)
    tog_effectOn: cc.Toggle=null;

    @property([cc.Toggle])
    toggle_yuYan: cc.Toggle[]=[];

    @property(cc.Label)
    lbl_suanFen: cc.Label=null;

    @property(cc.Label)
    lbl_canPeng: cc.Label=null;

    @property(cc.Label)
    lbl_dianPao: cc.Label=null;

    //底分
    @property(cc.Label)
    lbl_cellScore: cc.Label=null;

    //开胡
    @property(cc.Label)
    lbl_baseScore: cc.Label=null;

    //天地胡清一色
    @property(cc.Label)
    lbl_specialScore: cc.Label=null;
    //抢杠包3
    @property(cc.Label)
    lbl_qiang: cc.Label=null;

    //拉跑坐
    @property(cc.Label)
    lbl_lp: cc.Label=null;

    //是否房主买单
    @property(cc.Label)
    lbl_roomCost: cc.Label=null;
    //拉跑坐
    @property(cc.Label)
    lbl_gang: cc.Label=null;

    private _isClose: boolean;
    private _locked:boolean;
    onLoad() {
        // init logic
       // this.img_settingbg.node.on(cc.Node.EventType.TOUCH_END, this.onClose, this);
    }

    public init() {
        this._isClose = true;

        // this.refreshStatus();
        // let straa=this.GetItem("aa");
        // if(straa!=null && straa=="1"){
        //     this.toggle_yuYan[0].check();
        // }else{
        //     this.toggle_yuYan[1].check();
        // }
    }

    private closeSetting(): void {
        if(this._locked){
            return;
        }else{
            this._locked=true;
        }
        this.img_settingbg.node.active = false;
        var action = cc.moveTo(0.1, 13, 560);
        this.node.runAction(action);

        // this.scheduleOnce(p=>{
            this._isClose = true;
            this.btn_open.node.active=true;
            //this.refreshStatus();
        // }, 0.3);
        setTimeout(function () {
            this._locked = false;
        }.bind(this), 200);
        //this.node.active=false;
    }
    private refreshYuYanType():void{
        //this._isTableCreatorPay=this.GetPayType();
        for(var i=0;i<this.toggle_yuYan.length;i++){
            var toggle=this.toggle_yuYan[i];//("toggle"+i).getComponent<cc.Toggle>(cc.Toggle);
            if(toggle.isChecked){
                toggle.node.getChildByName("New Label").color=cc.color(255,230,160);                
            }
            else{
                toggle.node.getChildByName("New Label").color=cc.color(184,190,255);
            }
            if(this.toggle_yuYan[0].isChecked){
                this.isCheckHFH=true;
                this.isCheckPTH=false;
                LocalStorage.SetItem("yuYan","HFH"); 
            }
            else{
                this.isCheckPTH=true;
                this.isCheckHFH=false;
                LocalStorage.SetItem("yuYan","PTH"); 
            }
        }
        //this.refreshTableCostConfig();
    }
    private refreshStatus(): void {
        this.btn_open.node.active = this._isClose;
        this.btn_close.node.active = !this._isClose;
    }
    //音乐滑动事件
     private showMusicSlider(): void {      
       this.musicPersent = this.sli_musicSlider.progress;       
       Global.Instance.AudioManager.SetVolume(this.musicPersent,AudioType.Music); 
       LocalStorage.SetItem("MusicSlide",this.musicPersent.toString());          
     }
     //音效滑动事件
    private showEffectSlider(): void {
        this.effectPersent = this.sli_effectSlider.progress;
        Global.Instance.AudioManager.SetVolume(this.effectPersent,AudioType.Effect);
        LocalStorage.SetItem("EffectSlide",this.effectPersent.toString());    
     }
     //音乐开关事件
    private turnOnMusic(): void {
       if(this.tog_musicOn.isChecked){    
            Global.Instance.AudioManager.SetVolume(this.musicPersent,AudioType.Music);
            LocalStorage.SetItem("MusicTurn","1");
            this.sli_musicSlider.progress=this.musicPersent;           
       }
       if(this.tog_musicOn.isChecked==false){
            Global.Instance.AudioManager.SetVolume(0,AudioType.Music);  
            LocalStorage.SetItem("MusicTurn","0"); 
            this.sli_musicSlider.progress=0;
            Global.Instance.AudioManager.SetVolume(0,AudioType.Music);         
       }
     }
     //音效开关事件
    private turnOnEffect(): void {
       if(this.tog_effectOn.isChecked){
            Global.Instance.AudioManager.SetVolume(this.effectPersent,AudioType.Effect); 
            LocalStorage.SetItem("EffectTurn","1");
            this.sli_effectSlider.progress=this.effectPersent;            
       }
       if(this.tog_effectOn.isChecked==false){
            Global.Instance.AudioManager.SetVolume(0,AudioType.Effect); 
            LocalStorage.SetItem("EffectTurn","0"); 
            this.sli_effectSlider.progress=0;
            Global.Instance.AudioManager.SetVolume(0,AudioType.Effect);              
       }
     }


    public showRule(): void {
                             
        if (HZMJ.ins.iclass.isVideo() || !HZMJ.ins.iclass.isCreateRoom()) {
            this.btn_dissTable.node.active = false;
            this.btn_exit.node.active = true;
        } else {
            //游戏过程中才可以解散房间
            this.btn_dissTable.node.active = HZMJ.ins.iclass.getTableStauts() == QL_Common.TableStatus.gameing;
            this.btn_exit.node.active = HZMJ.ins.iclass.getTableStauts() != QL_Common.TableStatus.gameing;
        }

    //     this.lbl_cellScore.string = `底分:${HZMJ.ins.iclass.getTableConfig().cellScore}`;
    //     this.lbl_baseScore.string = HZMJ.ins.iclass.getTableConfig().IfGangLeJiuYou? "最多跑二" : "";
    //     this.lbl_specialScore.string = HZMJ.ins.iclass.getTableConfig().IsLaPaoZuo ? "最多跑一" : "";
    //   //  this.lbl_canPeng.string = HZMJ.ins.iclass.getTableConfig().IsGangKai ? "杠后开花双倍" : "杠后开花四倍";
    //     this.lbl_dianPao.string = HZMJ.ins.iclass.getTableConfig().IsBuKao ? "无风牌" : "";
    //   //  this.lbl_gang.string=HZMJ.ins.iclass.getTableConfig().IsGangJiuYou?"杠了就有" : "杠随胡走";
    //  //   this.lbl_qiang.string=HZMJ.ins.iclass.getTableConfig().IsQiangGangBao3?"抢杠包三家" : "抢杠加番";
    //   //  this.lbl_lp.node.active = HZMJ.ins.iclass.getTableConfig().IsLaPaoZuo;
    //   this.lbl_baseScore.node.active = true;
    //   this.lbl_specialScore.node.active = true;
    //   this.lbl_dianPao.node.active = true;

    //     if (HZMJ.ins.iclass.getTableConfig().tableCost > 0) {
    //         if (HZMJ.ins.iclass.getTableConfig().IsTableCreatorPay) {
    //             this.lbl_roomCost.string = `房主消耗${HZMJ.ins.iclass.getTableConfig().tableCost}张房卡`;
    //         }
    //         else {
    //             this.lbl_roomCost.string = `每人消耗${HZMJ.ins.iclass.getTableConfig().tableCost}张房卡`;
    //         }
    //     }
    //     else {
    //         this.lbl_roomCost.string = "";
    //     }
    }

    /**
     * 打开
     */
    public onOpen(){
      
       if(this._locked){
            return;
        }else{
            this._locked=true;
        }
        this.showRule();
        
         this.img_settingbg.node.active = true;
         var action = cc.moveTo(0.1, 0, 0);
         this.node.runAction(action);

        this.scheduleOnce(p=>{
            this._isClose = false;   
        }, 0.3);
        this.btn_open.node.active = true;
        setTimeout(function () {
            this._locked = false;
        }.bind(this), 200);
       // this.btn_open.node.active=true;
    }

    /**
     * 关闭、背景按钮
     */
    private onClose(){
        this.closeSetting();
    }

    /**
     * 分享
     */
    private onShare(){
        
        
        HZMJ.ins.iview.OnButtonShare();
    }

    /**
     * 帮助
     */
    private onHelp(){
        
        M_HZMJView.ins.Help.node.active = true;
    }

    /**
     * 解散房间
     */
    private onDissable(){
         M_HZMJView.ins.MsgBox.showMsgBox('游戏已经开始,是否确定解散？', "确定", () => {                       
            HZMJ.ins.iclass.sendData(new M_HZMJ_GameMessage.CMD_C_OfferDissTable());
        },this,"取消",()=>{
              this.closeSetting();
        } );
        // this.btn_dissTable.scheduleOnce(p=>{
        //     cc.log("解散房间");
        //     HZMJ.ins.iclass.sendData(new M_HZMJ_GameMessage.CMD_C_OfferDissTable());
        //     this.closeSetting();
        // }, 0.2);
    }

    /**
     * 音效
     */
    private onVolume(){
        M_HZMJView.ins.ShowSetVolume();
    }

    /**
     * 返回
     */
    private onExit(): void {
                    
        if (!HZMJ.ins.iclass.ifCanExitGame(HZMJ.ins.iclass.getSelfChair())) {
            if (HZMJ.ins.iclass.isCreateRoom()) {
                this.closeSetting();
            }
            else {
                M_HZMJView.ins.MsgBox.showMsgBox("在游戏中退出会扣除游戏币,是否退出", "继续强退", () => {
                    var forceLeft: M_HZMJ_GameMessage.CMD_C_ForceLeft = new M_HZMJ_GameMessage.CMD_C_ForceLeft();
                    forceLeft.PlayerID = HZMJ.ins.iclass.getTablePlayerAry()[HZMJ.ins.iclass.getSelfChair()].PlayerID;
                    M_HZMJClass.ins.SendGameData(forceLeft);
                }, this, "返回游戏");
            }
        } else {
            if (!HZMJ.ins.iclass.isVideo() && HZMJ.ins.iclass.isCreateRoom()
                && HZMJ.ins.iclass.getSelfChair() == HZMJ.ins.iclass.getTableConfig().tableCreatorChair && !HZMJ.ins.iclass.getTableConfig().IsSaveTable) {
                // if (HZMJ.ins.iclass.getTableConfig().IsTableCreatorPay) {
                //     M_HZMJView.ins.MsgBox.showMsgBox('是否需要系统为您保留房间？系统会在游戏开始前为您保留' + HZMJ.ins.iclass.getTableConfig().SaveTableTime + '分钟，请您记住房号' + HZMJ.ins.iclass.getTableConfig().TableCode + '。', "保留", () => {
                //         var saveTable: M_HZMJ_GameMessage.CMD_C_SaveTable = new M_HZMJ_GameMessage.CMD_C_SaveTable();
                //         M_HZMJClass.ins.SendGameData(saveTable);
                //     }, this, "不保留", () => { HZMJ.ins.iclass.exit(); }, this);
                // }
                // else {
                    M_HZMJView.ins.MsgBox.showMsgBox('您还未开始游戏，解散房间不扣除钻石,是否确定解散？', "确定", () => {
                        //打开充值
                        HZMJ.ins.iclass.exit();
                    },this,"取消",()=>{
                        this.closeSetting();
                    } );
               // }

            }
            else {
                HZMJ.ins.iclass.exit();
            }
            
        }
    }
}
