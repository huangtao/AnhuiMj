import JZMJ_FixedBase from "./JZMJ_FixedBase";
import { JZMJ } from "../../ConstDef/JZMJMahjongDef";
import M_JZMJVideoClass from "../../M_JZMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class JZMJ_DownFixed extends JZMJ_FixedBase {


    onLoad() {
        // init logic
        super.onLoad();
        this.init(1);
    }

    /**
     * 刷新定牌
     * */
    protected refreshFixedCard(_JZMJ = JZMJ.ins.iclass): void {
        // if(this._fixedData.length > 0) {
        //     for(var i: number = 0;i < this._fixedData.length;i++) {
        //         this._fixedData[i].node.x = 490;
        //         this._fixedData[i].node.y = -150 + i*113-20;
        //     }
        // }
        if(this._fixedData.length > 0){
            if(_JZMJ.is2D()){
                for(let i: number = 0;i < this._fixedData.length;i++) {
                    this._fixedData[i].node.setLocalZOrder(this._fixedData.length-i);
                    this._fixedData[i].node.x = 478;
                    this._fixedData[i].node.y = -145 + i*115;
                }
            }else{
                for(let i: number = 0;i < this._fixedData.length;i++) {
                    this._fixedData[i].node.setLocalZOrder(this._fixedData.length-i);
                }
            }
            
        }
    }
}
