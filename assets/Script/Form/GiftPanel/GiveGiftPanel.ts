import { UIName } from "../../Global/UIName";
import GiftCategoryScrollView from "../Gift/GiftCategoryScrollView";
import { Action } from "../../CustomType/Action";
import UIBase from "../Base/UIBase";
import Global from "../../Global/Global";
import { AudioType } from "../../CustomType/Enum";
import { PlayEffect } from "../../Tools/Function";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GiveGiftPanel extends UIBase<any> {
    public IsEventHandler: boolean=true;
    public IsKeyHandler: boolean=true;

    @property(cc.Label)
    name_label_1: cc.Label = null;

    @property(cc.Label)
    num_label_1: cc.Label = null;

    @property(cc.Sprite)
    ProImg_1: cc.Sprite = null;

    @property(cc.Label)
    name_label_2: cc.Label = null;

    @property(cc.Label)
    num_label_2: cc.Label = null;

    @property(cc.Sprite)
    ProImg_2: cc.Sprite = null;

    @property([cc.SpriteFrame])
    public ResList: cc.SpriteFrame[] = [];

    /**
     * 初始化数据
     */
    InitShow(){
        let obj = this.ShowParam;
        if(obj){
            this.name_label_1.string = obj.ProType_1;
            this.num_label_1.string = "x"+obj.ProNum_1;
            this.ProImg_1.spriteFrame = this.ResList[obj.ImgId_1];

            this.name_label_2.string = obj.ProType_2;
            this.num_label_2.string = "x"+obj.ProNum_2;
            this.ProImg_2.spriteFrame = this.ResList[obj.ImgId_2];

            PlayEffect(cc.url.raw("resources/Sound/gift_panel.mp3"));
        }
    }

    CloseClick(){
        PlayEffect(cc.url.raw("resources/Sound/close_panel.mp3"));
        this.UiManager.DestroyUi(UIName.GiveGiftPanel);
    }
}
