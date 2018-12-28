import { CardType } from "./PDK_GameHelp";
import { PDK } from "./PDK_IClass";
import { SetFontRes } from "../../MJCommon/MJ_Function";
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
     * 转换富文本内容
     */
    public static ChangeRichTextMsg(value: string) {
        value = value.replace("<font color='", "<color=");
        value = value.replace("'>", ">");
        value = value.replace("</font>", "</c>");
        return value;
    }


    /**
     * 把一个世界坐标的点，转换到某个节点下的坐标
     * 原点在node左下角
     * @param {*} node 
     * @param {*} worldPoint 
     */
    public static worldConvertLocalPoint(node, worldPoint) {
        if (node) {
            return node.convertToNodeSpace(worldPoint);
        }
        return null;
    }
     
    //取16进制第一位
    public static GetCardColor(bCardData: number): number {    
        return bCardData & 0xf0;
    }
    //取16进制第二位
    public static GetCardValue(bCardData: number): number {
        return bCardData & 0x0f;
    }
    

    public static GetCardLogicValue(bCardData:number): number {
        var bCardValue = this.GetCardValue(bCardData);//获取点数 
        if(bCardValue == 1){
            bCardValue = 14;
        }else if(bCardValue == 2){
            bCardValue = 15;
        }
        return bCardValue;
    }
    
    /**
     * 牌型解析，分炼牌
     * @param bCardData 牌组
     */
    public static GetCardTypeTips(bCardData:Array<number>):void{
        for(var i = 0;i<bCardData.length;i++){
            let value = 0;
            let color = 0;
            switch(this.GetCardValue(bCardData[i])){
                case 0:value = 0;break;
                case 1:value = 1;break;
                case 2:value = 2;break;
                case 3:value = 3;break;
                case 4:value = 4;break;
                case 5:value = 5;break;
                case 6:value = 6;break;
                case 7:value = 7;break;
                case 8:value = 8;break;
                case 9:value = 9;break;
                case 10:value = 10;break;
                case 11:value = 11;break;
                case 12:value = 12;break;
                case 13:value = 13;break;
                case 14:value = 14;break;
            }
            cc.log("第"+i+"张牌" +value+"牌的色值" +this.GetCardColor(bCardData[i]));
            switch(this.GetCardColor(bCardData[i])){
                case 0:color=0;break;
                case 16:color =1;break;
                case 32:color = 2;break;
                case 48:color =3;break;
            }
        }
    }

    public static CompareCard(cardA:number, cardB:number,needChange:Boolean):boolean
    {
        let logicA  = cardA;
        let logicB  = cardB;
        if(needChange){
            logicA = this.GetCardLogicValue(cardA);
            logicB = this.GetCardLogicValue(cardB);
        }
        if (logicA > logicB)
            return true;
        else if (logicA < logicB)
            return false;
        else
            return this.GetCardColor(cardA) > this.GetCardColor(cardB) ? true : false;//不存在两张相同的牌
    }
    /**
     *  牌冒泡排序
     * 牌数组，长度，是否转换为客户端牌值
      */
    public static SortCardToSmall( cards:number[],  count:number,needChange:boolean):number[]
    {
        for (var i = 0; i < count - 1; i++)
        {
            for (var j = i + 1; j < count; j++)
            {
                if (this.CompareCard(cards[j], cards[i],needChange))
                {
                    var temp = cards[i];
                    cards[i] = cards[j];
                    cards[j] = temp;
                }
            }
        }
        return cards;
    }
    //返回牌的值和数量键值对数组
    public static getCardHashObj(cards:number[]){
        let newCards:number[] = [];
        for(let value of cards){
            newCards.push(this.GetCardLogicValue(value));
        }
        let Obj = {};
        for(let value of newCards){
            if(Obj.hasOwnProperty(value)){
                Obj[value] += 1;
            }else{
                Obj[value] = 1;

            }
        }
        return Obj;
    }

    //对象转数组
    public static ObjToArray(obj){
        let KeyArray:number[]  = [];
        let ValueArray:number[] = [];
        Object.keys(obj).forEach(function(key){
            KeyArray.push(parseInt(key));
            ValueArray.push(obj[key]);
       });

       return [KeyArray,ValueArray];
    }
    //判断数组中的数字是否连续
    public static isConsecutive(cardValueArray:number[],cardCountArray:number[]){
        let shunzi = true;
        this.getSortCardArray(cardValueArray,cardCountArray);
        for(let i = 0;i<cardValueArray.length;i++){
            if(i+1 < cardValueArray.length && (cardValueArray[i]-1 != cardValueArray[i+1] || cardValueArray[i] == 15 || cardValueArray[i+1] == 15)){
                shunzi = false;
            }
        }
        return shunzi;
    }

    //判断是否为顺子、连对
    public static isShunOrDui(cardValueArray:number[],cardCountArray:number[]){
        if(this.isConsecutive(cardValueArray,cardCountArray) == false){
            return 0;
        }
        let shunzi = true;
        let duizi = true;
        for(let count of cardCountArray){
            if(count != 1){
                shunzi = false;
            }
            if(count != 2){
                duizi = false;
            }
        }
        if(shunzi){
            return 1;
        }if(duizi){
            return 2;
        }else{
            return 0;
        }
    }


     //判断是否为飞机
     public static isPlane(cardValueArray:number[],cardCountArray:number[],cardsCount:number){
        let count = 0;
        let tempArray = [];
        for(let i = 0;i<cardValueArray.length;i++){
            if(cardValueArray[i+1] && cardValueArray[i]-1 == cardValueArray[i+1] && cardCountArray[i] >= 3 && cardCountArray[i+1] >= 3 ){
                if(tempArray.length == 0){
                    tempArray.push(cardValueArray[i]);
                    tempArray.push(cardValueArray[i+1]);
                }else if(tempArray[tempArray.length-1] == cardValueArray[i]){
                    tempArray.push(cardValueArray[i+1]);
                }
            }
        }
        count = tempArray.length;
        if(count*3 == cardsCount || count*3 + count == cardsCount || count*3 + count*2 == cardsCount ){
            return true;
        }else{
            return false;
        }
    }

    //取出牌组中所有的顺子数组
    public static getShunziArray(cardValueArray:number[],cardCountArray:number[],Count:number){
        let tempArray = [];
        let tempItemArray = []; 
        for(let i = 0;i<cardValueArray.length;i++){
            if(cardValueArray[i+1] && cardValueArray[i]-1 == cardValueArray[i+1] && cardCountArray[i] >= Count ){
                if(tempItemArray.length == 0){
                    tempItemArray.push(cardValueArray[i]);
                    tempItemArray.push(cardValueArray[i+1]);
                }else if(tempItemArray[tempArray.length-1] == cardValueArray[i]){
                    tempItemArray.push(cardValueArray[i+1]);
                }
            }else if(tempItemArray.length != 0){
                tempArray.push(tempItemArray);
                tempItemArray = [];
            }
        }
    }

    

    /**
     *  牌冒泡排序
      */
     public static getSortCardArray( cardValues:number[], cardCount:number[])
     {
        let  count = cardValues.length;
        for (let i = 0; i < count-1; i++)
         {
             for (let j = i + 1; j < count; j++)
             {
                 if (this.CompareCard(cardValues[j], cardValues[i],false))
                 {
                     let tempValue = cardValues[i];
                     cardValues[i] = cardValues[j];
                     cardValues[j] = tempValue;

                     let tempCount = cardCount[i];
                     cardCount[i] = cardCount[j];
                     cardCount[j] = tempCount;
                 }
             }
         }
         return [cardValues,cardCount];
     }

    //返回牌型
    public static getCardType(cards:number[]){
        let threeAIsBomb = PDK.ins.iview.GetGameRule().threeAIsBomb;
        let cardHashObj = this.getCardHashObj(cards);
        let cardHashObjNum = Object.getOwnPropertyNames(cardHashObj).length;
        if(cards.length == 1){
            return CardType.One;
        }else if(cards.length == 2){
            if(cardHashObjNum == 1){
                return CardType.Two;
            }else{
                return CardType.Error;
            }
        }else if(cards.length == 3){
            if(cardHashObjNum == 1){
                //三个A是炸弹
                if(threeAIsBomb && cardHashObj[14]){
                    return CardType.Bomb;
                }
                return CardType.Three;
            }else{
                return CardType.Error;
            }
        }else if(cards.length >= 4){
            let [cardValueArray,cardCountArray] = this.ObjToArray(cardHashObj);
            let shunOrDui = this.isShunOrDui(cardValueArray,cardCountArray);
            if(shunOrDui == 1 && cards.length > 4){
                return CardType.ShunZi
            }else if( shunOrDui == 2){
                return CardType.lianDui;
            }
            //4张
            if(cards.length == 4){
                if(cardHashObjNum == 1){
                    return CardType.Bomb;
                }else if(cardHashObjNum == 2){
                    //三个A带1是炸弹
                    if(threeAIsBomb && cardHashObj[14] && cardHashObj[14] == 3){
                            return CardType.Bomb;
                    }else if(cardCountArray[0] == 3 || cardCountArray[1] == 3){
                        return CardType.ThreeAndOne;
                    }else{
                        return CardType.Error;
                    }
                }else{
                    return CardType.Error;
                } 
            }else{
                //5张
                if(cards.length == 5){
                    if(cardHashObjNum ==2){
                        if(cardCountArray[0] ==2 || cardCountArray[0] == 3 ||cardCountArray[0] ==1|| cardCountArray[0] == 4){
                            return CardType.ThreeAndTwo;
                        }
                    }else if(cardHashObjNum ==3 && (cardCountArray[0] ==3 || cardCountArray[1] == 3 || cardCountArray[2] == 3)){
                        return CardType.ThreeAndTwo;
                    }else{
                        return CardType.Error;
                    }
                //6张
                }else if(cards.length >= 6){
                    let isPlane = this.isPlane(cardValueArray,cardCountArray,cards.length);
                    if(isPlane){
                        return CardType.Plane;
                    }
                    if(cards.length == 6){
                        for(let cardCount of cardCountArray){
                             //三个A带任何其他三张牌是4带二
                            if(cardCount == 4 || (threeAIsBomb && cardHashObj[14] && cardHashObj[14] == 3)){
                                return CardType.FourAndTwo;
                            }
                        }
                        return CardType.Error;
                    }else{
                        return CardType.Error;  
                    }
                }
            }
        }
    }

}
