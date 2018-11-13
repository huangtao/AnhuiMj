import M_MGMJClass from "../M_MGMJClass";
import { MGMJMahjongDef, MGMJ } from "../ConstDef/MGMJMahjongDef";
import M_MGMJView from "../M_MGMJView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MGMJ_BaoTing extends cc.Component {
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
        M_MGMJClass.ins.btnBaoClick();
    }
    guo(){
        M_MGMJClass.ins.btnGuoClick();
    }

}