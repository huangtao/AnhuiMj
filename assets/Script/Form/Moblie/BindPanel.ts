import UIBase from "../Base/UIBase";
import { UIName } from "../../Global/UIName";

const { ccclass } = cc._decorator;

@ccclass
export default class BindPanel extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    private ClickBind(e, type) {
        switch (type) {
            case "0":
                this.UiManager.ShowUi(UIName.Auth);
                break;
            case "1":
                this.UiManager.ShowUi(UIName.BindPhonePanel);
                break;
            default:
                break;
        }

        super.CloseClick();
    }
}