import M_TDHMJClass from "../M_TDHMJClass";
import { TDHMJMahjongDef, TDHMJ } from "../ConstDef/TDHMJMahjongDef";
import M_TDHMJView from "../M_TDHMJView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TDHMJ_BaoTing extends cc.Component {
    //豹
    @property(cc.Button)
    btn_bao: cc.Button=null;

    //过
    @property(cc.Button)
    btn_guo: cc.Button=null;

    onLoad (){
        this.btn_bao.node.on(cc.Node.EventType.TOUCH_END, this.bao, this);
        this.btn_guo.node.on(cc.Node.EventType.TOUCH_END, this.guo, this);
    }

    public init():void{
        this.node.active = false;
    }

    bao(){
        M_TDHMJClass.ins.btnBaoClick();
    }
    guo(){
        M_TDHMJClass.ins.btnGuoClick();
    }

}