import { SetTextureRes } from "../GameHelp/BJ_BiJiFunction";
import GameLogic from "../GameHelp/BJ_GameLogic";
import AniCurve from "../AniView/BJ_AniCurve";
import { CardWidth, CardHeight } from "../GameHelp/BJ_GameHelp";
import { BiJi } from "../GameHelp/BJ_IBiJiClass";

const { ccclass, property } = cc._decorator;

export default class SkinCard extends AniCurve {

    onLoad() {
        this.node.width = CardWidth;
        this.node.height = CardHeight;
        var img = this.node.addComponent<cc.Sprite>(cc.Sprite);
        img.sizeMode=cc.Sprite.SizeMode.CUSTOM;
        //SetTextureRes(GameLogic.GetCardUrl(0), img);
        img.spriteFrame=BiJi.ins.iview.GetCardsRes(0);
    }
}
