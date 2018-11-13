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
        // if(this._fixedData.length > 0) {
        //     for(var i: number = 0;i < this._fixedData.length;i++) {
        //         this._fixedData[i].node.x = 490;
        //         this._fixedData[i].node.y = -150 + i*113-20;
        //     }
        // }
        if(this._fixedData.length > 0){
            if(_hqmj.is2D()){
                for(let i: number = 0;i < this._fixedData.length;i++) {
                    this._fixedData[i].node.setLocalZOrder(this._fixedData.length-i);
                    this._fixedData[i].node.x = 490;
                    this._fixedData[i].node.y = -150 + i*113-20;
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
