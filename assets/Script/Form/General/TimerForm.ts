import { addZero } from "../../Tools/Function";

const { ccclass, property } = cc._decorator;
@ccclass
export class TimerForm extends cc.Component {

    public static create() {
        const node = new cc.Node("Timer");
        node.width = 60;
        node.height = 54;
        const label = node.addComponent(cc.Label);
        label.fontSize = 27;
        label.lineHeight = 27;
        label.fontFamily="Sim Hei";
        const form = node.addComponent(TimerForm);
        return node;
    }

    public label: cc.Label;
    onLoad() {
        this.label = this.node.getComponent(cc.Label);
        this.schedule(this.flush, 5);
        this.flush();
    }

    start(){
        
    }



    onDestroy(): void {
        this.unschedule(this.flush);
    }

    private flush() {
        if (cc.isValid(this.label)) {

            this.label.string = this.getDateString();
        }
    }

    private getDateString(): string {
        const date = new Date();
        const str = `${addZero(date.getHours(), 2)}:${addZero(date.getMinutes(), 2)}`;
        return str;
    }
}