import { SetTextureRes } from "../GameHelp/BJ_BiJiFunction";
import { TexturePath, CommonTexturePath } from "../GameHelp/BJ_GameHelp";

const { ccclass, property } = cc._decorator;

export default class SkinChip extends cc.Sprite {

    public static Width = 63;
    public static Height = 64;

    onLoad() {
        SetTextureRes(CommonTexturePath + "commonRes/coin", this);
        this.node.width = SkinChip.Width;
        this.node.height = SkinChip.Height;
        this.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    }

}
