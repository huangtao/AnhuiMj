import { BiJi } from "../GameHelp/BJ_IBiJiClass";

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
    public Show(state: number[]) {
        this.node.active = true;
        // for (var i = 0; i < state.length; i++) {
        //     if (state[i] == 1)
        //         this.btn_tiren[i].node.active = true;
        //     else
        //         this.btn_tiren[i].node.active = false;
        // }
    }
    public ShowTiRen(chair:number){
        let realchair = (chair+4)%5;
        this.btn_tiren[realchair].node.active = true;
    }
    public HideTiRenOne(chair:number){
        let realchair = (chair+4)%5;
        this.btn_tiren[realchair].node.active = false;

    }
    public HideTiRen(){
        for(var i = 0;i<this.btn_tiren.length;i++){
            this.btn_tiren[i].node.active = false;
        }
        
    }

    private OnButtonTiren(value: number) {
        this.btn_tiren[value-1].node.active = false;
        BiJi.ins.iview.OnTiren(value);
    }
    private OnButtonTirenCancel() {
        this.node.active = false;
    }
}
