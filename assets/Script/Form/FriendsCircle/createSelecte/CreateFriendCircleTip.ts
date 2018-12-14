import UIBase from "../../Base/UIBase";
import { NativeCtrl } from "../../../Native/NativeCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CreateFriendCircleTip extends UIBase<any> {
	public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;

    /**
     * 确定按钮事件
     */
    public btnOkClickEvent(){
        // 复制微信号
       let result = NativeCtrl.CopyToClipboard('qlfw001');

       if ('fail' != result) {
       		this.UiManager.ShowTip('已复制到剪贴板!');
       }else{
         this.UiManager.ShowTip('复制失败!');
       }

       this.CloseClick();
    }
}
