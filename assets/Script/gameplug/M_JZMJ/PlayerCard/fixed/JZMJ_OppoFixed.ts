import JZMJ_FixedBase from "./JZMJ_FixedBase";
import { JZMJ } from "../../ConstDef/JZMJMahjongDef";
import M_JZMJVideoClass from "../../M_JZMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class JZMJ_OppoFixed extends JZMJ_FixedBase {

    onLoad() {
        // init logic
        super.onLoad();
        this.init(2);
    }

    /**
     * 刷新定牌
     * */
    protected refreshFixedCard(_jzmj = JZMJ.ins.iclass): void {
        if(this._fixedData.length > 0){
            if(_jzmj.is2D()){
                for(let i: number = 0;i < this._fixedData.length;i++) {
                    this._fixedData[i].node.x = 257-i*133;//257     124
                    this._fixedData[i].node.y = 309;
                }
            }
        }
    }
    
}
