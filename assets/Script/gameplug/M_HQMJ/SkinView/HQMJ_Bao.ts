import M_HQMJClass from "../M_HQMJClass";
import { HQMJMahjongDef, HQMJ } from "../ConstDef/HQMJMahjongDef";
import M_HQMJView from "../M_HQMJView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HQMJ_BaoTing extends cc.Component {
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
        M_HQMJClass.ins.btnBaoClick();
    }
    guo(){
        M_HQMJClass.ins.btnGuoClick();
    }

}