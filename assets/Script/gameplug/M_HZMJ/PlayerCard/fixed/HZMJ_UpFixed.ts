import HZMJ_FixedBase from "./HZMJ_FixedBase";
import { HZMJ } from "../../ConstDef/HZMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_UpFixed extends HZMJ_FixedBase {


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
    protected refreshFixedCard(): void {
        if(this._fixedData.length > 0) {
            if(HZMJ.ins.iclass.is2D()){
                for(var i: number = 0;i < this._fixedData.length;i++) {
                    this._fixedData[i].node.x = -490;
                    this._fixedData[i].node.y = 279 - i*112-16;
                }
            }else{

            }
        }
    }
}
