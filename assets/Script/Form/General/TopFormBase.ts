import UIBase from "../../Form/Base/UIBase";
import FormTop from "./FormTop";


const { ccclass, property } = cc._decorator;

@ccclass
export default class TopFormBase extends UIBase<any> {
	public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

	/** 
     *  返回面板
     */
    @property(cc.Node)
    node_formTop: cc.Node = null;

    public InitShow(){
        if (!cc.isValid(this.node_formTop)) {
            return;
        }

        let formTop: FormTop = this.node_formTop.getComponent(FormTop);

        if (formTop) {
            formTop.refreshDataShow();
        }
    }
}
