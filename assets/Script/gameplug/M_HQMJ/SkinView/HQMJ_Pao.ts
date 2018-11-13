import HQMJEvent from "../HQMJEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HQMJ_Pao extends cc.Component {

    @property(cc.Button)
    btn_pao_1: cc.Button=null;

    @property(cc.Button)
    btn_pao_2: cc.Button=null;

    @property(cc.Button)
    btn_pao_0: cc.Button=null;

    onLoad() {
        // init logic
    }

    public init():void{
        this.node.active=false;
    }

    private Pao1():void{
        this.onPaoDian(1);
    }
    private Pao2():void{
        this.onPaoDian(2);
    }
    private Pao0():void{
        this.onPaoDian(0);
    }

    private onPaoDian(point : number)
    {
        this.node.dispatchEvent(new HQMJEvent(HQMJEvent.msg_pao, point));
        this.node.active=false;
    }
}
