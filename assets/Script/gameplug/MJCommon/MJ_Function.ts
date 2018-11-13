

export function SetTextureRes(url: string, img: cc.Sprite) {
    if (!cc.isValid(img))
        return;
    //cc.loader.loadRes(url, cc.SpriteFrame, aaa.bind(this))
    cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
        if (err) {
            cc.error(err);
            return;
        }
        if (!cc.isValid(img))
            return;
        img.spriteFrame = spriteFrame;
    });
}
export function SetTextureResAry(urls: string[], img: cc.Sprite[]) {
    if (urls.length != img.length) {
        return;
    }
    cc.loader.loadResArray(urls, cc.SpriteFrame, function (err, assets) {
        if (err) {
            cc.error(err);
            return;
        }
        for (let i = 0; i < urls.length; i++) {
            img[i].spriteFrame = assets[i];
        }
    });
}

export function SetFontRes(url: string, label: cc.Label) {
    cc.loader.loadRes(url, cc.BitmapFont, function (err, spriteFrame) {
        label.font = spriteFrame;
    });
}

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
}
/**
 * 阿拉伯数字和文字类
 * A:阿拉伯数字 C:中文
 * _符号是转换
 */
export class TransformAlgorithm {
    /**
     * 阿拉伯数字转中文数字,(例:用于结算时个别麻将结算类型) return 十,二十一
     * @param num  数字 1.2.3.4.5.6.7.8.9
     */
    public static A_C_num(num: number): string {
        let chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        let chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
        let chnUnitChar = ["", "十", "百", "千"];
        var strIns = '', chnStr = '';
        var unitPos = 0;
        var zero = true;
        while (num > 0) {
            var v = num % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = chnStr;
                }
            } else {
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            num = Math.floor(num / 10);
        }

        return chnStr;
    }
    /**
     *  阿拉伯数字转中文数字（万筒条）(例:六安麻将红中替换的牌) return X万,X筒,X条
     * @param type 类型 0-万，1-筒，2-条
     * @param num 数字 1.2.3.4.5.6.7.8.9
     */
    public static A_C_wtt(type: number, num: number): string {
        let chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        let typeChar = ["万", "筒", "条"];
        let chnStr: string;
        chnStr = chnNumChar[num] + typeChar[type];
        return chnStr;
    }
    /**
     * 在个位数前面加0
     * @param num 数字 1.2.3.4.5.6.7.8.9
     */
    public static A_A_addZero(num: number) {
        if (num == 0) {
            return "";
        }
        if (num < 10) {
            return "0" + num;
        }
        return num.toString();
    }
}
