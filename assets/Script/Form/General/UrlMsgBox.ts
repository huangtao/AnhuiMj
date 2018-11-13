
import Global from "../../Global/Global";
import UIBase from "../Base/UIBase";
import { GameCachePool } from "../../Global/GameCachePool";

const { ccclass, property } = cc._decorator;

@ccclass

export class UrlMsgBox extends UIBase<any>{
    public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;
    @property(cc.WebView)
    webView: cc.WebView=null;

    Go(root:cc.Node,url:string){
        if(!cc.isValid(root)){
            root=cc.director.getScene();
        }
        this.Show(root);
        this.webView.url=url;
    }

    OnClose() {
        super.OnClose();
        GameCachePool.UrlMsgBoxPool.put(this.node);
    }


}