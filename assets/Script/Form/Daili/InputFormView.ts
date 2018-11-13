import UIBase from "../Base/UIBase";
import { Action } from "../../CustomType/Action";
import { LoadResourcesImage } from "../../Tools/Function";
import Global from "../../Global/Global";

const { ccclass, property } = cc._decorator;

@ccclass
export default class InputFormView extends UIBase<InputFormViewParam> {

    public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;

    @property(cc.Label)
    title: cc.Label=null;

    @property(cc.EditBox)
    inputText: cc.EditBox=null;
    @property(cc.Sprite)
    titleImg: cc.Sprite=null;

    onLoad() {
        super.onLoad();
        this.node.setPosition(640, 360);
    }  


    InitShow() {
        let p = this.ShowParam;
        if (!p) {
            this.CloseClick();
        }

        this.inputText.string = "";
        this.inputText.placeholder = p.placehodlerText;
        this.title.string = p.title;
        this.inputText.maxLength = p.maxlen;
        this.inputText.inputMode = p.inputMode;
        LoadResourcesImage(p.titlePath, this.titleImg);
    }

    OKButtonCall() {
        let p = this.ShowParam;
        if (!p) {
            this.CloseClick();
        }
        let s = this.inputText.string;
        if (p.Verification) {
            if (!p.Verification.Run([s])) {
                //验证失败
                return;

            }
        }
        this.CloseClick();
        p.callBack.Run([s]);
        
    }

}

export class InputFormViewParam {
    /**
     * 输入字符的模式
     */
    inputMode: cc.EditBox.InputMode = cc.EditBox.InputMode.ANY;
    /**
     * 输入完成后的回掉方法
     */
    callBack: Action;
    /**
     * 验证函数
     */
    Verification: Action;
    /**
     * 标头的文字图片资源路径
     */
    titlePath: string;
    /**
     * 占位符文字信息
     */
    placehodlerText: string;
    /**
     * 提示标题
     */
    title: string;
    /**
     * 输入字符最大长度
     */
    maxlen: number = 15;
}
