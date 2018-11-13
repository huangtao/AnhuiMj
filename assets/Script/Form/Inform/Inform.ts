import UIBase from "../Base/UIBase";
import { IsTest } from '../../Tools/Function';
const {ccclass, property} = cc._decorator;

@ccclass
export class Inform extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.EditBox)
    TargetPlayerId: cc.Label = null;

    @property(cc.EditBox)
    ReportContent: cc.Label = null;

    @property(cc.EditBox)
    PhoneNumber: cc.Label = null;

    @property(cc.Toggle)
    DlsReason: cc.Toggle = null;

    @property(cc.Toggle)
    StfdbReason: cc.Toggle = null;

    @property(cc.Toggle)
    DefaultReason: cc.Toggle = null;

    @property(cc.Node)
    ToggleCtrl: cc.Node = null;

    // onLoad () {}

    /**
     * 检查参数是否符合提交要求
     * @param id 
     * @param content 
     * @param phone 
     */
    private Verify(id, content, phone){
        if( id == null || content == null || phone == null ){
            this.UiManager.ShowTip("请输入完提交所需的资料!");
            return false
        }

        if( id.length < 6 || id == "" ){
            this.UiManager.ShowTip("玩家ID最少为6位!");
            return false
        }
        
        if( content.length <= 0 || content == "" ){
            this.UiManager.ShowTip("投诉玩家内容不能为空!");
            return false
        }

        if( content.length > 120){
            this.UiManager.ShowTip("投诉内容不允许超过120个字符!");
            return false
        }

        if( phone.length <= 0 || phone == "" ){
            this.UiManager.ShowTip("请输入本人手机号!");
            return false
        }

        if(isNaN(parseInt(id))){
            this.UiManager.ShowTip("玩家id必须得是数字!");
            return false
        }

        let regex = /^[1][3,4,5,7,8][0-9]{9}$/;

        if(!regex.test(phone)){
            this.UiManager.ShowTip("手机号不合法!");
            return false
        }

        return true
    }

    /**
     * 玩家点击确定触发
     */
    private ClickReport(){
        let id = this.TargetPlayerId.string;
        let content = this.ReportContent.string;
        let phone = this.PhoneNumber.string;


        if(!this.Verify(id, content, phone)){
            return
        }

        let toggleItems = this.ToggleCtrl.children;
        for(var i = 0; i < toggleItems.length; i++){
            if(toggleItems[i].getComponent(cc.Toggle).isChecked){
                
            }
        }

        this.UiManager.ShowTip("已成功提交");
    }

    start () {

    }

    // update (dt) {}
}
