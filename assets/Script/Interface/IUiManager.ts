import { Action } from "../CustomType/Action";
import { QL_Common } from "../CommonSrc/QL_Common";
import { InputFormViewParam } from "../Form/Daili/InputFormView";

export interface IUiManager {
    ShowUi(uiname: string): void;
    ShowUi(uiname: string, param: any): void;
    ShowUi(uiname: string, param: any, action: Action): void;

    GetUINode(UIName: string): cc.Node;

    CloseUi(uiname: string,param?:any): void;


    DestroyUi(uiname: string):void;


    ShowLoading(str?: string): void;
    CloseLoading(): void;
    LoadingInfo(str: string);

    ShowUrlMsgBox(url:string):void;

    /**
     * 弹窗
     * @param msg 文本内容
     * @param thisobj 作用域
     * @param okAction 确定回调
     * @param showcancle 是否显示返回按钮
     * @param cancleAction 返回的回调
     * @param showclose 是否显示叉号
     * @param closeAction 叉号回调
     */
    ShowMsgBox(msg: string, thisobj?: any, okAction?: Function, cancleAction?: Function, closeAction?: Function, okArgs?: any, cancleArgs?: any, closeArgs?: any, align?: cc.Label.HorizontalAlign): void;
    ShowTip(msg: string);
    ShowTip(msg: string, time: number);
    ShowHorn(HornEntity: QL_Common.SystemHornEntity, pos_x: number, pos_y: number);

    PlayHallRoolNotice(notice:any);

    GetTimerForm():cc.Node;
    ShowInputBox(param: InputFormViewParam);
}