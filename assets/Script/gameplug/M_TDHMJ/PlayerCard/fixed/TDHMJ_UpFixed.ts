import TDHMJ_FixedBase from "./TDHMJ_FixedBase";
import { TDHMJ } from "../../ConstDef/TDHMJMahjongDef";
import M_TDHMJVideoClass from "../../M_TDHMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TDHMJ_UpFixed extends TDHMJ_FixedBase {


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
    // }
    protected refreshFixedCard(_lqmj = TDHMJ.ins.iclass): void {
        if(this._fixedData.length > 0) {
            if(_lqmj.is2D()){
                for(var i: number = 0;i < this._fixedData.length;i++) {
                    this._fixedData[i].node.x = -478;
                    this._fixedData[i].node.y = 233 - i*115;
                }
            }else{

            }
        }
    }
}
