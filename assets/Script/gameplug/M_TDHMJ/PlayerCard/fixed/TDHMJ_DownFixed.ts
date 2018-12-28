import TDHMJ_FixedBase from "./TDHMJ_FixedBase";
import { TDHMJ } from "../../ConstDef/TDHMJMahjongDef";
import M_TDHMJVideoClass from "../../M_TDHMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TDHMJ_DownFixed extends TDHMJ_FixedBase {


    onLoad() {
        // init logic
        super.onLoad();
        this.init(1);
    }

    /**
     * 刷新定牌
     * */
    protected refreshFixedCard(_lqmj = TDHMJ.ins.iclass): void {
       
        if(this._fixedData.length > 0){
            if(_lqmj.is2D()){
                for(let i: number = 0;i < this._fixedData.length;i++) {
                    this._fixedData[i].node.setLocalZOrder(this._fixedData.length-i);
                    this._fixedData[i].node.x = 478;
                    this._fixedData[i].node.y = -145 + i*115;
                }
            }else{
                for(let i: number = 0;i < this._fixedData.length;i++) {
                    this._fixedData[i].node.setLocalZOrder(this._fixedData.length-i);
                    // this._fixedData[i].node.x = 480;
                    // this._fixedData[i].node.y = -140 + i*115;
                }
            }
            
        }
    }
}
