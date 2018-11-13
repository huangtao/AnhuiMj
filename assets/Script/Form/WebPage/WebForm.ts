import UIBase from "../Base/UIBase";


const {ccclass, property} = cc._decorator;

@ccclass
export default class WebForm extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.WebView)
    public webView:cc.WebView = null;

    protected OnShow() {
        let url = this.ShowParam;
        if(!cc.isValid(url)){
            url = "http://www.qileah.cn";
        }
        this.webView.url = url;
        this.webView.enabledInHierarchy
    }

    OnWebViewEvent(a,b,c){
        cc.log({a,b,c});
    }

}
