const { ccclass, property } = cc._decorator;

@ccclass
export default class PokerCardsRes extends cc.Component {

    @property(cc.SpriteAtlas)
    private spriteAtlas: cc.SpriteAtlas = null;
    @property(cc.SpriteFrame)
    private res_cardBack: cc.SpriteFrame = null;
    @property(cc.SpriteAtlas)
    private spritesmallAtlas: cc.SpriteAtlas = null;

    onLoad() {
    }
    public GetCardsRes(value: number): cc.SpriteFrame {
        if (value == 0)
            return this.res_cardBack;
        var index = Math.floor(value / 16) * 14 + Math.floor(value % 16) - 2;
        if (index == -1 || index == 13 || index == 27 || index == 41)
            index += 13;
        else {
            switch (value) {
                case 0: {
                    index = 56;
                    break;
                }
                case -1: {
                    index = 55;
                    break;
                }
                case 0x41: {
                    index = 27;
                    break;
                }
                case 0x42: {
                    index = 13;
                    break;
                }
            }
        }
        return this.spriteAtlas.getSpriteFrame("Poker_" + index);
    }
    public GetSmallCardsRes(value: number): cc.SpriteFrame {
        if (value == 0)
            return this.spritesmallAtlas.getSpriteFrame("Poker_" + 41);;
        var index = Math.floor(value / 16) * 14 + Math.floor(value % 16) - 2;
        if (index == -1 || index == 13 || index == 27 || index == 41)
            index += 13;
        else {
            switch (value) {
                case 0: {
                    index = 56;
                    break;
                }
                case -1: {
                    index = 55;
                    break;
                }
                case 0x41: {
                    index = 27;
                    break;
                }
                case 0x42: {
                    index = 13;
                    break;
                }
            }
        }
        return this.spritesmallAtlas.getSpriteFrame("Poker_" + index);
    }

}
