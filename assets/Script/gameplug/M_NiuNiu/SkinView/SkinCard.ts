import { SetTextureRes } from "../GameHelp/NiuNiuFunction";
import GameLogic from "../GameHelp/GameLogic";
import AniCurve from "../AniView/AniCurve";
import { CardWidth, CardHeight } from "../GameHelp/GameHelp";
import { NiuNiu } from "../GameHelp/INiuNiuClass";

const { ccclass, property } = cc._decorator;

export default class SkinCard extends AniCurve {

    onLoad() {
        this.node.width = CardWidth;
        this.node.height = CardHeight;
        var img = this.node.addComponent<cc.Sprite>(cc.Sprite);
        img.sizeMode=cc.Sprite.SizeMode.CUSTOM;
        //SetTextureRes(GameLogic.GetCardUrl(0), img);
        img.spriteFrame=NiuNiu.ins.iview.GetCardsRes(0);
    }
}
