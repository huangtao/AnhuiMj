import HQMJ_FixedBase from "./HQMJ_FixedBase";
import { HQMJ } from "../../ConstDef/HQMJMahjongDef";
import M_HQMJVideoClass from "../../M_HQMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HQMJ_DownFixed extends HQMJ_FixedBase {


    onLoad() {
        // init logic
        super.onLoad();
        this.init(1);
    }

    /**
     * 刷新定牌
     * */
    protected refreshFixedCard(_hqmj = HQMJ.ins.iclass): void {
       
        if(this._fixedData.length > 0){
            if(_hqmj.is2D()){
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
