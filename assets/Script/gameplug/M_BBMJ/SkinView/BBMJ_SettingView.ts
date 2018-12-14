
import { BBMJ } from "../ConstDef/BBMJMahjongDef";
import M_BBMJView from "../M_BBMJView";
import { M_BBMJ_GameMessage } from "../../../CommonSrc/M_BBMJ_GameMessage";
import M_BBMJClass from "../M_BBMJClass";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { ReportError } from "../../../Tools/Function";
import M_BBMJVoice from "../M_BBMJVoice";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_SettingView extends cc.Component {

    //背景
    @property(cc.Sprite)
    img_settingbg: cc.Sprite=null;

    //打开
    @property(cc.Button)
    btn_open: cc.Button=null;


    //退出
    @property(cc.Button)
    btn_exit: cc.Button=null;



    //帮助
    @property(cc.Button)
    btn_help: cc.Button=null;

    //聊天
    @property(cc.Button)
    btn_setVolume: cc.Button=null;

    //解散房间
    @property(cc.Button)
    btn_dissTable: cc.Button=null;

   
    @property(cc.Node)
    view:cc.Node=null;

    @property(cc.Button)
    btn_back_jiesan: cc.Button=null;
    @property(cc.Button)
    btn_back_tuichu: cc.Button=null;

    private _isClose: boolean;
    private _locked:boolean;
    onLoad() {
        // init logic
        this.img_settingbg.node.on(cc.Node.EventType.TOUCH_END, this.onClose, this);
    }

    public init() {
        this._isClose = true;

        this.refreshStatus();
        this.refreshBtn_backStatus();
    }

    public refreshBtn_backStatus(){
         if (BBMJ.ins.iclass.isVideo() || !BBMJ.ins.iclass.isCreateRoom()) {
            this.btn_back_jiesan.node.active = false;
            this.btn_back_tuichu.node.active = true;
        } else {
            //游戏过程中才可以解散房间
            this.btn_back_jiesan.node.active = BBMJ.ins.iclass.getTableStauts() == QL_Common.TableStatus.gameing;
            this.btn_back_tuichu.node.active = BBMJ.ins.iclass.getTableStauts() != QL_Common.TableStatus.gameing;
        }
    }

    private closeSetting(): void {
        if(this._locked){
            return;
        }else{
            this._locked=true;
        }
        this.img_settingbg.node.active = false;
         this.view.active=false;
            this._isClose = true;
            this.refreshStatus();

        setTimeout(function () {
            this._locked = false;
        }.bind(this), 200);
    }

    private refreshStatus(): void {
        this.btn_open.node.active = this._isClose;
    }

    public showRule(): void {


        this.btn_help.interactable = !BBMJ.ins.iclass.isVideo();
        this.btn_setVolume.interactable = !BBMJ.ins.iclass.isVideo();

        if (BBMJ.ins.iclass.isVideo() || !BBMJ.ins.iclass.isCreateRoom()) {
            this.btn_dissTable.node.active = false;
            this.btn_exit.node.active = true;
        } else {
            //游戏过程中才可以解散房间
            this.btn_dissTable.node.active = BBMJ.ins.iclass.getTableStauts() == QL_Common.TableStatus.gameing;
            this.btn_exit.node.active = BBMJ.ins.iclass.getTableStauts() != QL_Common.TableStatus.gameing;
        }

         if(BBMJ.ins.iclass.getRoomData()){

        }
        else{
            ReportError("房间尚未初始化，BBMJ.ins.iclass.getRoomData()取不到 in setting");
        }

          



        this.node.active = true;
    }

    /**
     * 打开
     */
    private onOpen(){
        M_BBMJVoice.PlayCardType(`/sound/Button32.mp3`);
       if(this._locked){
            return;
        }else{
            this._locked=true;
        }
        this.showRule();
        if(this.img_settingbg.node.active){
            this.img_settingbg.node.active = false;
        }else{
            this.img_settingbg.node.active = true;
        }
        
       this.view.active=true;
            this._isClose = true;
            this.refreshStatus();

        setTimeout(function () {
            this._locked = false;
        }.bind(this), 200);
    }

    /**
     * 关闭、背景按钮
     */
    private onClose(){
        this.closeSetting();
    }


    /**
     * 帮助
     */
    private onHelp(){
        M_BBMJVoice.PlayCardType(`/sound/Button32.mp3`);
        M_BBMJClass.ins.showWanfa();
    }

    private onMap(){
        M_BBMJVoice.PlayCardType(`/sound/Button32.mp3`);
        M_BBMJClass.ins.ShowMaps();
    }

    /**
     * 解散房间
     */
    private onDissable(){
        M_BBMJVoice.PlayCardType(`/sound/Button32.mp3`);
        this.btn_dissTable.scheduleOnce(p=>{
            cc.log("解散房间");
            BBMJ.ins.iclass.sendData(new M_BBMJ_GameMessage.CMD_C_OfferDissTable());
            this.closeSetting();
        }, 0.2);
    }

    /**
     * 音效
     */
    private onVolume(){
        M_BBMJVoice.PlayCardType(`/sound/Button32.mp3`);
        M_BBMJView.ins.ShowSetVolume();
    }

    /**
     * 返回
     */
    private onExit(): void {
        M_BBMJVoice.PlayCardType(`/sound/Button32.mp3`);            
        if (!BBMJ.ins.iclass.ifCanExitGame(BBMJ.ins.iclass.getSelfChair())) {
            if (BBMJ.ins.iclass.isCreateRoom()) {
                this.closeSetting();
            }
            else {
                M_BBMJView.ins.MsgBox.showMsgBox("在游戏中退出会扣除游戏币,是否退出", "继续强退", () => {
                    var forceLeft: M_BBMJ_GameMessage.CMD_C_ForceLeft = new M_BBMJ_GameMessage.CMD_C_ForceLeft();
                    forceLeft.PlayerID = BBMJ.ins.iclass.getTablePlayerAry()[BBMJ.ins.iclass.getSelfChair()].PlayerID;
                    M_BBMJClass.ins.SendGameData(forceLeft);
                }, this, "返回游戏");
            }
        } else {
            if (!BBMJ.ins.iclass.isVideo() && BBMJ.ins.iclass.isCreateRoom()
                && BBMJ.ins.iclass.getSelfChair() == BBMJ.ins.iclass.getTableConfig().tableCreatorChair && !BBMJ.ins.iclass.getTableConfig().IsSaveTable) {              
                        BBMJ.ins.iclass.exit();                           
            }
            else {
                BBMJ.ins.iclass.exit();
            }
            
        }
    }
}
