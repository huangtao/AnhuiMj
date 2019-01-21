import UIBase from "../Base/UIBase";
import { UIName } from "../../Global/UIName";
import Global from "../../Global/Global";
import { AudioType } from "../../CustomType/Enum";
import { PlayEffect, LoadHeader } from "../../Tools/Function";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Congratulation extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.Label)
    name_label: cc.Label = null;

    @property(cc.Label)
    num_label: cc.Label = null;

    @property(cc.Sprite)
    ProImg: cc.Sprite = null;

    @property([cc.SpriteFrame])
    public ResList: cc.SpriteFrame[] = [];

    onLoad(){
        /**
         * 播放音效
         */
        PlayEffect(cc.url.raw("resources/Sound/gift_panel.mp3"));
    }
    
     /**
     * 初始化数据
     */
    InitShow(){
        let obj = this.ShowParam;
        if(obj){
            this.name_label.string = obj.ProType;
            this.num_label.string = "x"+obj.ProNum;

            if(obj.ProImg != null){
                LoadHeader(obj.ProImg, this.ProImg);
            }else{
                cc.log(obj.ImgId);
                this.ProImg.spriteFrame = this.ResList[obj.ImgId];
            }
        }
    }

    private CloseGiftPanel(){
        PlayEffect(cc.url.raw("resources/Sound/close_panel.mp3"));
        this.UiManager.DestroyUi(UIName.ShopGiftPanel);
    }
}
