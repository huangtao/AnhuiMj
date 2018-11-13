import UIBase from "../Base/UIBase";
import { UIName } from "../../Global/UIName";


const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends UIBase<any> {
    public IsEventHandler: boolean=true;
    public IsKeyHandler: boolean=true;
    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    private detailsClick(){
        this.UiManager.ShowUi(UIName.GiftExchangeDetails)
    }
    start () {

    }

    // update (dt) {}
}
