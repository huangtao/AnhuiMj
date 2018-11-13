import HZMJ_FixedBase from "./HZMJ_FixedBase";
import { HZMJ } from "../../ConstDef/HZMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_DownFixed extends HZMJ_FixedBase {


    onLoad() {
        // init logic
        super.onLoad();
        this.init(1);
    }

    /**
     * 刷新定牌
     * */
    protected refreshFixedCard(): void {
        // if(this._fixedData.length > 0) {
        //     for(var i: number = 0;i < this._fixedData.length;i++) {
        //         this._fixedData[i].node.x = 490;
        //         this._fixedData[i].node.y = -150 + i*113-20;
        //     }
        // }
        if(this._fixedData.length > 0){
            if(HZMJ.ins.iclass.is2D()){
                for(let i: number = 0;i < this._fixedData.length;i++) {
                    this._fixedData[i].node.setLocalZOrder(this._fixedData.length-i);
                    this._fixedData[i].node.x =200;
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
