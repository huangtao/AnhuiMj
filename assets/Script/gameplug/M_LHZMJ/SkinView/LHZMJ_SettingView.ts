
import { LHZMJ } from "../ConstDef/LHZMJMahjongDef";
import M_LHZMJView from "../M_LHZMJView";
import { M_LHZMJ_GameMessage } from "../../../CommonSrc/M_LHZMJ_GameMessage";
import M_LHZMJClass from "../M_LHZMJClass";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { ReportError } from "../../../Tools/Function";
import M_LHZMJVoice from "../M_LHZMJVoice";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_SettingView extends cc.Component {

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
        
        if (LHZMJ.ins.iclass.isVideo() || !LHZMJ.ins.iclass.isCreateRoom()) {
            this.btn_back_jiesan.node.active = false;
            this.btn_back_tuichu.node.active = true;
        // } else if(LHZMJ.ins.iclass.getUserNumRule() == 4 && LHZMJ.ins.iclass.getRealUserNum() == 3){
        //     this.btn_back_jiesan.node.active = LHZMJ.ins.iclass.getTableStauts() != QL_Common.TableStatus.gameing;
        //     this.btn_back_tuichu.node.active = LHZMJ.ins.iclass.getTableStauts() == QL_Common.TableStatus.gameing;    
        }else{
            //游戏过程中才可以解散房间
            this.btn_back_jiesan.node.active = LHZMJ.ins.iclass.getTableStauts() == QL_Common.TableStatus.gameing;
            this.btn_back_tuichu.node.active = LHZMJ.ins.iclass.getTableStauts() != QL_Common.TableStatus.gameing;
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


        this.btn_help.interactable = !LHZMJ.ins.iclass.isVideo();
        this.btn_setVolume.interactable = !LHZMJ.ins.iclass.isVideo();

        if (LHZMJ.ins.iclass.isVideo() || !LHZMJ.ins.iclass.isCreateRoom()) {
            this.btn_dissTable.node.active = false;
            this.btn_exit.node.active = true;
        // } else if(LHZMJ.ins.iclass.getUserNumRule() == 4 && LHZMJ.ins.iclass.getRealUserNum() == 3){
        //     this.btn_dissTable.node.active = LHZMJ.ins.iclass.getTableStauts() != QL_Common.TableStatus.gameing;
        //     this.btn_exit.node.active = LHZMJ.ins.iclass.getTableStauts() == QL_Common.TableStatus.gameing;    
        }else{
            //游戏过程中才可以解散房间
            this.btn_dissTable.node.active = LHZMJ.ins.iclass.getTableStauts() == QL_Common.TableStatus.gameing;
            this.btn_exit.node.active = LHZMJ.ins.iclass.getTableStauts() != QL_Common.TableStatus.gameing;
        }

         if(LHZMJ.ins.iclass.getRoomData()){

        }
        else{
            ReportError("房间尚未初始化，LHZMJ.ins.iclass.getRoomData()取不到 in setting");
        }

          



        this.node.active = true;
    }

    /**
     * 打开
     */
    private onOpen(){
        M_LHZMJVoice.PlayCardType(`/sound/Button32.mp3`);
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
        M_LHZMJVoice.PlayCardType(`/sound/Button32.mp3`);
        M_LHZMJClass.ins.showWanfa();
    }

    private onMap(){
        M_LHZMJVoice.PlayCardType(`/sound/Button32.mp3`);
        M_LHZMJClass.ins.ShowMaps();
    }

    /**
     * 解散房间
     */
    private onDissable(){
        M_LHZMJVoice.PlayCardType(`/sound/Button32.mp3`);
        this.btn_dissTable.scheduleOnce(p=>{
            cc.log("解散房间");
            LHZMJ.ins.iclass.sendData(new M_LHZMJ_GameMessage.CMD_C_OfferDissTable());
            this.closeSetting();
        }, 0.2);
    }

    /**
     * 音效
     */
    private onVolume(){
        M_LHZMJVoice.PlayCardType(`/sound/Button32.mp3`);
        M_LHZMJView.ins.ShowSetVolume();
    }

    /**
     * 返回
     */
    private onExit(): void {
        M_LHZMJVoice.PlayCardType(`/sound/Button32.mp3`);            
        if (!LHZMJ.ins.iclass.ifCanExitGame(LHZMJ.ins.iclass.getSelfChair())) {
            if (LHZMJ.ins.iclass.isCreateRoom()) {
                this.closeSetting();
            }
            else {
                M_LHZMJView.ins.MsgBox.showMsgBox("在游戏中退出会扣除游戏币,是否退出", "继续强退", () => {
                    var forceLeft: M_LHZMJ_GameMessage.CMD_C_ForceLeft = new M_LHZMJ_GameMessage.CMD_C_ForceLeft();
                    forceLeft.PlayerID = LHZMJ.ins.iclass.getTablePlayerAry()[LHZMJ.ins.iclass.getSelfChair()].PlayerID;
                    M_LHZMJClass.ins.SendGameData(forceLeft);
                }, this, "返回游戏");
            }
        } else {
            if (!LHZMJ.ins.iclass.isVideo() && LHZMJ.ins.iclass.isCreateRoom()
                && LHZMJ.ins.iclass.getSelfChair() == LHZMJ.ins.iclass.getTableConfig().tableCreatorChair && !LHZMJ.ins.iclass.getTableConfig().IsSaveTable) {              
                        LHZMJ.ins.iclass.exit();                           
            }
            else {
                LHZMJ.ins.iclass.exit();
            }
            
        }
    }
}
