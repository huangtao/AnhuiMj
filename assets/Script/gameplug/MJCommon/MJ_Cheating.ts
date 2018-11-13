import M_HQMJClass from '../M_HQMJ/M_HQMJClass';
import M_HQMJView from '../M_HQMJ/M_HQMJView';
import HQMJ_SettingView from '../M_HQMJ/SkinView/HQMJ_SettingView';

const { ccclass, property } = cc._decorator;

@ccclass
export default class MJ_Cheating extends cc.Component {

    @property(cc.Button)
    continueBtn:cc.Button = null;

    @property(cc.Button)
    leaveBtn:cc.Button = null;

    @property(cc.Button)
    exitBtn:cc.Button = null;

    @property(cc.Label)
    msgLab0:cc.Label = null;

    @property(cc.Label)
    msgLab1:cc.Label = null;

    @property(cc.Label)
    msgLab2:cc.Label = null;

    @property(cc.Label)
    lab:cc.Label = null;
    //处理游戏回调
    private _func :any=null;
    private _obj:any=null;


    onLoad() {
    }
    start(){
        this.leaveBtn.node.on(cc.Node.EventType.TOUCH_END,this.leaveRoom,this);
    }
    public showCheatBox(msgStr:string[],action:any,obj:any){
        // if(this.node.active == false){
        //     this.node.active = true;
        //     this.msgLab0.string = msgStr;
        //     this.msgLab0.node.active = true;
        //     this.msgLab1.node.active = true;
        // }else{
        //     this.msgLab0.string = msgStr;
        // }
        if(msgStr.length == 1){
            this.msgLab1.string = msgStr[0];
            this.msgLab1.node.active = true;
            this.lab.node.active = true;
        }
        if(msgStr.length == 3){
            this.msgLab0.string = msgStr[0];
            this.msgLab1.string = msgStr[1];
            this.msgLab2.string = msgStr[2];
            this.msgLab0.node.active = true;
            this.msgLab1.node.active = true;
            this.msgLab2.node.active = true;
            this.lab.node.active = true;
        }
        //赋值动作
        this._func = action;
        this._obj=obj;
        this.node.active = true;
    }
    public hideCheatBox(){
        if(this.node.active)
            this.node.active = false;
    }
    private continueGame(){
        this.node.active = false;
    }

    private leaveRoom(){
        // M_HQMJView.ins._setting.onExit();
        if(this._func!=null&&this._obj!=null)
            this._func.call(this._obj);
    }
    

}
