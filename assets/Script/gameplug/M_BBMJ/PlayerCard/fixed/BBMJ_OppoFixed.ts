import BBMJ_FixedBase from "./BBMJ_FixedBase";
import { BBMJ } from "../../ConstDef/BBMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_OppoFixed extends BBMJ_FixedBase {

    onLoad() {
        // init logic
        super.onLoad();
        this.init(2);
    }

    /**
     * 刷新定牌
     * */
    protected refreshFixedCard(): void {
        // if(this._fixedData.length > 0) {
        //     for(var i: number = 0;i < this._fixedData.length;i++) {
        //         this._fixedData[i].node.x = 284 - i*130-40;//830
        //         this._fixedData[i].node.y = 284;
        //     }
        // }
        if(this._fixedData.length > 0){
            if(BBMJ.ins.iclass.is2D()){
                for(let i: number = 0;i < this._fixedData.length;i++) {
                this._fixedData[i].node.x = 257-i*133;//257     124
                this._fixedData[i].node.y = 309;
            }
            }else{
                // for(let i:number=0; i<this._fixedData.length; i++){
                //     this._fixedData[i].node.x = 290 - i*140;
                //     this._fixedData[i].node.y = 285;
                // }
            }
            
        }
    }
}
