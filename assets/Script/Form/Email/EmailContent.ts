import UIBase from "../Base/UIBase";
import { EmailInfo } from "./EmailIMessage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;


    @property(cc.Label)
    label: cc.Label = null;

    public InitShow(): void{
        if(!cc.isValid(this.ShowParam)){
            return;
        }
        let showData:EmailInfo = this.ShowParam;
        this.label.string = showData.emailContext;
    }
}
