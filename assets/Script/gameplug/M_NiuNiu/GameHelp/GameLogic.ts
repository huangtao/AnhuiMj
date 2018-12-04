import { CardTypeModel } from "./GameHelp";

const { ccclass, property } = cc._decorator;

/**
	 *
	 * @author 
	 *
	 */
export default class GameLogic {
    /**
     * int转string
     */
    public static FomatInt(value: number): string {
        if (value >= 0) {
            return Math.floor(value / 10000) + "万";
        }
        else {
            var abs = Math.abs(value);
            return "-" + Math.floor(abs / 10000) + "万";
        }
    }
    /**
     * int转string
     */
    public static FomatDecimal(value: number): string {
        if (value >= 0) {
            return Math.floor(value / 10000) + "." + Math.floor((value % 10000) / 1000) + "万";
        }
        else {
            var abs = Math.abs(value);
            return "-" + Math.floor(abs / 10000) + "." + Math.floor((abs % 10000) / 1000) + "万";
        }
    }
    /**
     * 复制数组
     */
    public static CopyArray(src: number[], dst: number[], length: number): void {
        for (var i = 0; i < length; i++) {
            src[i] = dst[i];
        }
    }
    /**
     * 复制字符串数组
     */
    public static CopyStr(src: string[], dst: string[], length: number): void {
        for (var i = 0; i < length; i++) {
            src[i] = dst[i];
        }
    }
    /**
     * 获取随机数
     */
    public static Random(start: number, end: number) {
        if (end > start)
            return Math.floor(Math.random() * (end - start)) + start;
        else
            return Math.floor(Math.random() * (start - end)) + end;
    }
    /**
     * 打乱数组
     */
    public static RandomArray(data: number[], length: number): void {
        for (var i = 0; i < length; i++) {
            var index = Math.floor(Math.random() * length);
            var temp = data[index];
            data[index] = data[i];
            data[i] = temp;
        }
    }
    /**
     * 数组求和
     */
    public static SumArray(data: number[]): number {
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i];
        }
        return sum;
    }
    /**
     * 反转数组
     */
    public static ReversalArray(data: number[]): void {
        var length = data.length;
        for (var i = 0; i < length / 2; i++) {
            var temp = data[i];
            data[i] = data[length - 1 - i];
            data[length - 1 - i] = temp;
        }
    }
    /**
     * 获取牌的逻辑值
     */
    public static GetCardLogicValue(value: number) {
        var card = value & 0x0f;
        return card > 10 ? 10 : card;
    }
    /**
     * 0为牌背，-1为灰牌
     */
    public static GetCardUrl(value: number): string {
        var index = Math.floor(value / 16) * 14 + Math.floor(value % 16) - 2;
        if (index == -1 || index == 13 || index == 27 || index == 41)
            index += 13;
        else {
            switch (value) {
                case 0: {
                    index = 41;
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
        return "gameres/gameCommonRes/Texture/Poker/Poker_" + index;
    }
    /**
     * 牌型
     */
    public static GetCardTypeText(value: number): string {
        switch (value) {
            case 0:
                return "没牛";
            case 1:
                return "牛一";
            case 2:
                return "牛二";
            case 3:
                return "牛三";
            case 4:
                return "牛四";
            case 5:
                return "牛五";
            case 6:
                return "牛六";
            case 7:
                return "牛七";
            case 8:
                return "牛八";
            case 9:
                return "牛九";
            case 10:
                return "牛牛";
            case 11:
                return "顺子";
            case 12:
                return "三带二";
            case 13:
                return "五花牛";
            case 14:
                return "四炸";
            case 15:
                return "五小牛";
        }
        return "";
    }
    /**
     * 获取牌型模式文本
     */
    public static GetCardTypeModelText(value: CardTypeModel): string {
        switch (value) {
            case CardTypeModel.Junko: return "顺子";
            case CardTypeModel.Gourd: return "三带二";
            case CardTypeModel.FiveBig: return "五花牛";
            case CardTypeModel.Bomb: return "四炸";
            case CardTypeModel.FiveSmall: return "五小牛";
        }
    }
    /**
     * 转换富文本内容
     */
    public static ChangeRichTextMsg(value: string) {
        value = value.replace("<font color='", "<color=");
        value = value.replace("'>", ">");
        value = value.replace("</font>", "</c>");
        return value;
    }
    /**
     * 判断是否是抢庄模式，暂且通过牌数来判断
     */
    public static IsGameModelRobMaster(value:number){
        return value==4;
    }
}