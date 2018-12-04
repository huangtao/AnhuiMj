import { NiuNiu } from "../GameHelp/INiuNiuClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinTiren extends cc.Component {

    @property([cc.Button])
    private btn_tiren: cc.Button[]=[];
    @property(cc.Button)
    private btn_tirencancel: cc.Button=null;

    onLoad() {
        for (let i = 0; i < this.btn_tiren.length; i++) {
            this.btn_tiren[i].node.on("click", () => { this.OnButtonTiren(i + 1) }, this);
        }
        this.btn_tirencancel.node.on("click", this.OnButtonTirenCancel, this);
    }
    public Show(chair: number) {
        this.node.active = true;
    }
    public ShowTiRen(chair:number){
        let realchair = (chair+5)%6;
        this.btn_tiren[realchair].node.active = true;
    }
    public HideTiRenOne(chair:number){
        let realchair = (chair+5)%6;
        this.btn_tiren[realchair].node.active = false;

    }
    public HideTiRen() {
        for (var i = 0; i < this.btn_tiren.length; i++) {
            this.btn_tiren[i].node.active = false;
        }
    }
    private OnButtonTiren(value: number) {
      //  this.node.active = false;
      this.btn_tiren[value-1].node.active = false;
        NiuNiu.ins.iview.OnTiren(value);
    }
    private OnButtonTirenCancel() {
        this.node.active = false;
    }
}
