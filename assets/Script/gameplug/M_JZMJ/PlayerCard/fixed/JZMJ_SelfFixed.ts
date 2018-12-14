import JZMJ_FixedBase from "./JZMJ_FixedBase";
import { JZMJ } from "../../ConstDef/JZMJMahjongDef";
import M_JZMJVideoClass from "../../M_JZMJVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class JZMJ_SelfFixed extends JZMJ_FixedBase {


    onLoad() {
        // init logic
        super.onLoad();
        this.init(0);
    }

    /**
     * 刷新定牌
     * */
    // protected refreshFixedCard(): void {
    //     if(this._fixedData.length > 0){
    //         for(var i:number=0; i<this._fixedData.length; i++){
    //             this._fixedData[i].node.x = -510 + i*230;
    //             this._fixedData[i].node.y = -290;
    //         }
    //     }
    // }
    protected refreshFixedCard(_jzmj = JZMJ.ins.iclass): void {
        if(this._fixedData.length > 0){
            if(_jzmj.is2D()){
                for(var i:number=0; i<this._fixedData.length; i++){
                    this._fixedData[i].node.x = -510 + i*230;
                    this._fixedData[i].node.y = -300;
                }
            }else{
                for(let i:number=0; i<this._fixedData.length; i++){
                    this._fixedData[i].node.x = -495-20 + i*230;
                    this._fixedData[i].node.y = -300;
                }
            }
            
        }
    }
    // /**
    //  * 创建一个新的活动牌
    //  * */
    // protected createSingleFixedCard(): SingleFixedBase {
    //     return new SelfSingleFixed();
    // }
}
