import UIBase from "../Base/UIBase";
import { UIName } from "../../Global/UIName";
import { SignInData, SignInArr, SignInItem } from "./SignInItem";
import { WebRequest } from "../../Net/Open8hb";
import { ActionNet } from "../../CustomType/Action";

const { ccclass, property } = cc._decorator;

@ccclass
export class SignInForm extends UIBase<any> {
    @property(cc.Button)
    btn_close: cc.Button=null;

    @property(cc.Button)
    btn_signin: cc.Button=null;
    @property([cc.Layout])
    lay_items: cc.Layout[]=[];

    signInItems:SignInItem[];
    public get UIname() {
        return UIName.SignIn;
    }
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    onLoad() {
        super.onLoad();
        this.btn_signin.enabled=false;
        const action = new ActionNet(this, this.OnSuccess, this.OnError);
        const data = WebRequest.DefaultData();
        // WebRequest.signin.get_signin_list(action, data);
    }
    private onSignInClick(){
        const action = new ActionNet(this, this.OnSignInSuccess, this.OnError);
        const data = WebRequest.DefaultData();
        // Open8hb.signin.get_user_signin(action, data);
    }
    private OnSignInSuccess(obj:any){
        const idx=this.UserInfo.userData.ContinuityDays>=this.signInItems.length?this.signInItems.length:this.UserInfo.userData.ContinuityDays;
        this.signInItems[idx].ShowMask();
        this.UserInfo.userData.ContinuityDays=parseInt(obj.ContinuityDays);
        this.UserInfo.userData.TodayIsSign=true;
        setTimeout(this.Close.bind(this), 1000);
        // this.CloseClick();
    }
    /**
     * 刷新
     */
    protected InitShow() {
        if(this.signInItems&&this.signInItems.length>0){
            for(let i=0;i<this.signInItems.length;i++){
                this.signInItems[i].Init();
            }
        }
    }
    private OnSuccess(obj: SignInArr) {
        console.log(obj);
        this.btn_signin.enabled=true;
        if (obj.d.length > 0) {
            cc.loader.loadRes("Prefabs/SignIn/SignInItem", function onPrefabLoad(err, prefab: cc.Prefab) {
                if (err) {
                    cc.error(err);
                    return;
                }
                this.signInItems=new Array<SignInItem>();
                this.lay_items[0].node.removeAllChildren();
                if (this.lay_items.length > 1)
                    this.lay_items[1].node.removeAllChildren();
                for (let i = 0; i < obj.d.length; i++) {
                    const item = obj.d[i];
                    const node = cc.instantiate(prefab);
                    const sData = new SignInData();
                    sData.MoneyNum = item[3];
                    sData.MoneyType = item[2];
                    sData.Status = item[1];
                    sData.SignDay = item[0];
                    const e = node.getComponent<SignInItem>(SignInItem);
                    if (cc.isValid(e)) {
                        e.signInData = sData;
                        e.Init();
                        this.signInItems.push(e);
                        if (this.lay_items.length == 1)
                            node.parent = this.lay_items[0].node;
                        else
                            node.parent = this.lay_items[Math.floor(i / 4)].node;
                    }
                }
            }.bind(this));
        }
    }
    private OnError(err) {
        console.log(err);
        this.CloseClick();
        // this.UiManager.ShowTip("获取邮件失败，请检查网络连接或重新登录");
    }

}