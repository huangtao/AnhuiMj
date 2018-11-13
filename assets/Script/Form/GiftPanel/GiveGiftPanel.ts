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

    onLoad(){
        /**
         * 播放音效
         */
        PlayEffect(cc.url.raw("resources/Sound/gift_panel.mp3"));
    }

    CloseClick(){
        PlayEffect(cc.url.raw("resources/Sound/close_panel.mp3"));
        this.UiManager.DestroyUi(UIName.GiveGiftPanel);
    }
}
