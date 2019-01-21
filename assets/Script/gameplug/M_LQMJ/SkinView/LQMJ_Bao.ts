import M_LQMJClass from "../M_LQMJClass";
import { LQMJMahjongDef, LQMJ } from "../ConstDef/LQMJMahjongDef";
import M_LQMJView from "../M_LQMJView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LQMJ_BaoTing extends cc.Component {
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
        M_LQMJClass.ins.btnBaoClick();
    }
    guo(){
        M_LQMJClass.ins.btnGuoClick();
    }

}