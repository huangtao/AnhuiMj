import { Action } from "../../CustomType/Action";
import { ChatType } from "../../CustomType/Enum";

const { ccclass, property } = cc._decorator;

@ccclass
export class ChatItem extends cc.Component {
    action:Action;

    @property(cc.Label)
    label: cc.Label=null;


    idx: number
    onLoad() {

    }
    Init(idx:number, str:string) {
        this.idx = idx;
        this.label.string = str;
    }


    thisClick() {
        if (this.action) {
            this.action.Run([ChatType.TextVoice, this.idx]);
        }

    }
}