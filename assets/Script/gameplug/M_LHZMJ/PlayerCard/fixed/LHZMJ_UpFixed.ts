import LHZMJ_FixedBase from "./LHZMJ_FixedBase";
import { LHZMJ } from "../../ConstDef/LHZMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_UpFixed extends LHZMJ_FixedBase {


    onLoad() {
        // init logic
        super.onLoad();
        this.init(3);
    }
    /**
     * 刷新定牌
     * */
    // protected refreshFixedCard(): void {
    //     if(this._fixedData.length > 0) {
    //         for(var i: number = 0;i < this._fixedData.length;i++) {
    //             this._fixedData[i].node.x = -490;
    //             this._fixedData[i].node.y = 279 - i*112-16;
    //         }
    //     }
    // }233  118  3  -112
    protected refreshFixedCard(): void {
        if(this._fixedData.length > 0) {
            if(LHZMJ.ins.iclass.is2D()){
                for(var i: number = 0;i < this._fixedData.length;i++) {
                    this._fixedData[i].node.x = -478;
                    this._fixedData[i].node.y = 233 - i*115;
                }
            }else{

            }
        }
    }
}
