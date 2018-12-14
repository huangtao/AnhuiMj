import { BBMJMahjongDef } from "../ConstDef/BBMJMahjongDef";
import { allZhi } from "../ConstDef/BBMJMahjongDef";
import { enTinType, BBMJ,enFixedCardType, clsParseTriple, enHuCardType, enTripleType } from "../ConstDef/BBMJMahjongDef";

import M_BBMJView from "../M_BBMJView";
import { BBMJMahjongPattern } from "./BBMJMahjongPattern";
import { BBMJMahjongAlgorithm1Lhh } from "./BBMJMahjongAlogorithmlhh";
import M_BBMJClass from "../M_BBMJClass";

const { ccclass, property } = cc._decorator;

	export class BBMJMahjongAlgorithm1 {

         

        //检查万筒条的花色的值是否间隔大于2,并且值是1、4、7或者是2、5、8或者是3、6、9
        private static CheckValueBiggerTwo(card:Array<number>):boolean
        {
            var colorCard:Array<number> = new Array<number>();
            colorCard.splice(0, colorCard.length);
            for(let i:number=0; i<card.length; i++){
                colorCard.push(card[i]);
            }

            colorCard.sort();
            if (colorCard.length > 3 || colorCard.length < 2)
            {
                return false;
            }

            for (let j = colorCard.length-1; j > 0; j--)
            {
                if (colorCard[j] - colorCard[j-1] < 3)
                {
                    return false;
                }
            }

			if(!this.IsEquleValue(colorCard)){
				return false;
			}

            return true;
        }

        //检查牌值是否为1、4、7或者是2、5、8或者是3、6、9
		private static IsEquleValue(card:Array<number>):boolean{
                switch (this.GetMahjongValue(card[0])) {
                    case 1:
                    case 4:
                    case 7:
                        for (let i: number = 0; i < card.length; i++) {
                            if (1 != this.GetMahjongValue(card[i]) && 4 != this.GetMahjongValue(card[i]) && 7 != this.GetMahjongValue(card[i])) {
                                return false;
                            }
                        }
                        break;

                    case 2:
                    case 5:
                    case 8:
                        for (let j: number = 0; j < card.length; j++) {
                            if (2 != this.GetMahjongValue(card[j]) && 5 != this.GetMahjongValue(card[j]) && 8 != this.GetMahjongValue(card[j])) {
                                return false;
                            }
                        }
                        break;

                    case 3:
                    case 6:
                    case 9:
                        for (let k: number = 0; k < card.length; k++) {
                            if (3 != this.GetMahjongValue(card[k]) && 6 != this.GetMahjongValue(card[k]) && 9 != this.GetMahjongValue(card[k])) {
                                return false;
                            }
                        }
                        break;

                    default: break;
                }

			return true;
		}

        //检查字是否满足条件
        private static CheckZhiIsSame(zhiCard:Array<number>):boolean
        {
            var card:Array<number> = new Array<number>();
            card.splice(0, card.length);
            for(let i:number=0; i<zhiCard.length; i++){
                card.push(zhiCard[i]);
            }

            card.sort();
            for (let j:number = card.length - 1; j > 0; j--)
            {
                if (card[j] - card[j - 1] < 1)
                {
                    return false;
                }
            }

            return true;
        }

        //检查每个花色的值属性（1、4、7属性为0， 2、5、8属性为1， 3、6、9属性为2）
		private static CheckValueFlag(card:number):number{
			switch(card){
				case 1:
				case 4:
				case 7:
					return 0;

				case 2:
				case 5:
				case 8:
					return 1;

				case 3:
				case 6:
				case 9:
					return 2;

				default:break;
			}

			return 255;
		}


        //获取万筒条听牌
		private static getWanTongTiaoTing(card:Array<number>):number{

			card.sort();
			switch(this.GetMahjongColorValue(card[0])){
				case 0x00:
					if(this.GetMahjongValue(card[0]) == 1 && this.GetMahjongValue(card[1]) == 4){
						return 7;
					}
					if(this.GetMahjongValue(card[0]) == 1 && this.GetMahjongValue(card[1]) == 7){
						return 4;
					}
					if(this.GetMahjongValue(card[0]) == 4 && this.GetMahjongValue(card[1]) == 7){
						return 1;
					}
                    if(this.GetMahjongValue(card[0]) == 2 && this.GetMahjongValue(card[1]) == 5){
						return 8;
					}
					if(this.GetMahjongValue(card[0]) == 2 && this.GetMahjongValue(card[1]) == 8){
						return 5;
					}
					if(this.GetMahjongValue(card[0]) == 5 && this.GetMahjongValue(card[1]) == 8){
						return 2;
					}
                    if(this.GetMahjongValue(card[0]) == 3 && this.GetMahjongValue(card[1]) == 6){
						return 9;
					}
					if(this.GetMahjongValue(card[0]) == 3 && this.GetMahjongValue(card[1]) == 9){
						return 6;
					}
					if(this.GetMahjongValue(card[0]) == 6 && this.GetMahjongValue(card[1]) == 9){
						return 3;
					}
				break;

				case 0x10:
					if(this.GetMahjongValue(card[0]) == 1 && this.GetMahjongValue(card[1]) == 4){
						return 7+16;
					}
					if(this.GetMahjongValue(card[0]) == 1 && this.GetMahjongValue(card[1]) == 7){
						return 4+16;
					}
					if(this.GetMahjongValue(card[0]) == 4 && this.GetMahjongValue(card[1]) == 7){
						return 1+16;
					}
                    if(this.GetMahjongValue(card[0]) == 2 && this.GetMahjongValue(card[1]) == 5){
						return 8+16;
					}
					if(this.GetMahjongValue(card[0]) == 2 && this.GetMahjongValue(card[1]) == 8){
						return 5+16;
					}
					if(this.GetMahjongValue(card[0]) == 5 && this.GetMahjongValue(card[1]) == 8){
						return 2+16;
					}
                    if(this.GetMahjongValue(card[0]) == 3 && this.GetMahjongValue(card[1]) == 6){
						return 9+16;
					}
					if(this.GetMahjongValue(card[0]) == 3 && this.GetMahjongValue(card[1]) == 9){
						return 6+16;
					}
					if(this.GetMahjongValue(card[0]) == 6 && this.GetMahjongValue(card[1]) == 9){
						return 3+16;
					}
				break;

				case 0x20:
					if(this.GetMahjongValue(card[0]) == 1 && this.GetMahjongValue(card[1]) == 4){
						return 7+32;
					}
					if(this.GetMahjongValue(card[0]) == 1 && this.GetMahjongValue(card[1]) == 7){
						return 4+32;
					}
					if(this.GetMahjongValue(card[0]) == 4 && this.GetMahjongValue(card[1]) == 7){
						return 1+32;
					}
                    if(this.GetMahjongValue(card[0]) == 2 && this.GetMahjongValue(card[1]) == 5){
						return 8+32;
					}
					if(this.GetMahjongValue(card[0]) == 2 && this.GetMahjongValue(card[1]) == 8){
						return 5+32;
					}
					if(this.GetMahjongValue(card[0]) == 5 && this.GetMahjongValue(card[1]) == 8){
						return 2+32;
					}
                    if(this.GetMahjongValue(card[0]) == 3 && this.GetMahjongValue(card[1]) == 6){
						return 9+32;
					}
					if(this.GetMahjongValue(card[0]) == 3 && this.GetMahjongValue(card[1]) == 9){
						return 6+32;
					}
					if(this.GetMahjongValue(card[0]) == 6 && this.GetMahjongValue(card[1]) == 9){
						return 3+32;
					}
				break;

				default:break;
			}
		}

        //获取字牌的听牌类型,注意：传入的牌阵需要满足以下条件：
        public static  GetCharFigureCardTinType(vCard:Array<number>):enTinType
        {
            //先排序
            this.sortCardAry(vCard);

            //==============================================
            //
            //					0~3张
            //
            //==============================================

            ///0张,当一个花色为0张时
            if (vCard.length == 0)
                return enTinType.TinType_Tirple;
            ///单张调头
            if (vCard.length == 1)
                return enTinType.TinType_OtherTriple;
            ///2张
            if (vCard.length == 2)
            {
                if (vCard[0] == vCard[1])//为一对
                    return enTinType.TinType_HavePair;
                else
                    return enTinType.TinType_Nothing;
            }
            ///3张
            if (vCard.length == 3)
            {
                if ((vCard[0] == vCard[1]) && (vCard[0] == vCard[2]))//为一刻
                    return enTinType.TinType_Tirple;
                else
                    return enTinType.TinType_Nothing;
            }

            //==============================================
            //
            //					4张
            //
            //==============================================

            if (vCard.length == 4)
            {
                if (vCard[0] == vCard[3])//为一杠，必为不听
                {
                    return enTinType.TinType_Nothing;
                }
                else
                {
                    //含有一刻
                    if ((vCard[0] == vCard[2]) || (vCard[1] == vCard[3]))
                    {
                        return enTinType.TinType_OtherTriple;
                    }
                    //两对
                    if ((vCard[0] == vCard[1]) && (vCard[2] == vCard[3]))
                    {
                        return enTinType.TinType_OtherTriple;
                    }
                    return enTinType.TinType_Nothing;
                }
            }


            var vectorGet:Array<Array<number>> = new Array<Array<number>>();
            this.GetCharCardsListsByRemoveTriple(vCard, vectorGet);

            //==============================================
            //
            //					 6,9,12张
            //
            //==============================================

            if (vectorGet.length == 0)
            {
                return enTinType.TinType_Nothing;
            }

            if ((vCard.length % 3) == 0)
            {
                for (var i = 0; i < vectorGet.length; i++)
                {
                    if (this.GetCharFigureCardTinType(vectorGet[i]) == enTinType.TinType_Tirple)
                    {
                        return enTinType.TinType_Tirple;
                    }
                }
                return enTinType.TinType_Nothing;
            }

            //==============================================
            //
            //					 7,10,13张
            //
            //==============================================
            if (vCard.length % 3 == 1)
            {
                for (var i = 0; i < vectorGet.length; i++)
                {
                    if (this.GetCharFigureCardTinType(vectorGet[i]) == enTinType.TinType_OtherTriple)
                    {
                        return enTinType.TinType_OtherTriple;
                    }
                }
                return enTinType.TinType_Nothing;
            }

            //==============================================
            //
            //				 5,8,11张
            //
            //==============================================
            //东，南，西，中，中，发，发，发
            if (vCard.length % 3 == 2)
            {
                for (var i = 0; i < vectorGet.length; i++)
                {
                    if (this.GetCharFigureCardTinType(vectorGet[i]) == enTinType.TinType_HavePair)
                    {
                        return enTinType.TinType_HavePair;
                    }
                }
                return enTinType.TinType_Nothing;
            }

            return enTinType.TinType_Unknown;
        }

        //获取一个单色牌的听牌类型,注意：传入的牌阵需要满足以下条件
        public static GetFigureCardTinType(vectorCard: Array<number>): enTinType {
            //先排序
            this.sortCardAry(vectorCard);

            //0张
            if(vectorCard.length == 0) {
                return enTinType.TinType_Tirple;
            }

            //1张，单张调头
            if(vectorCard.length == 1) {
                return enTinType.TinType_OtherTriple;
            }

            //2张
            if(vectorCard.length == 2) {
                if(vectorCard[0] == vectorCard[1])//对子
                {
                    return enTinType.TinType_HavePair;
                }
                else {
                    if((this.GetMahjongLogicValue(vectorCard[1]) - this.GetMahjongLogicValue(vectorCard[0])) < 3)//连张
                    {
                        return enTinType.TinType_NeedPair;
                    }
                }
                //不连张
                return enTinType.TinType_Nothing;
            }

            //3张
            if(vectorCard.length == 3) {
                if(vectorCard[0] == vectorCard[2])//一刻
                {
                    return enTinType.TinType_Tirple;
                }
                else {
                    if(((this.GetMahjongLogicValue(vectorCard[2]) - this.GetMahjongLogicValue(vectorCard[0])) == 2) && ((this.GetMahjongLogicValue(vectorCard[2]) - this.GetMahjongLogicValue(vectorCard[1])) == 1))//一顺
                    {
                        return enTinType.TinType_Tirple;
                    }
                }

                return enTinType.TinType_Nothing;
            }

            //4张
            if(vectorCard.length == 4) {
                if(vectorCard[0] == vectorCard[3])//为一杠，必为不听
                {
                    return enTinType.TinType_Nothing;
                }

                //含刻
                if((vectorCard[0] == vectorCard[2]) || (vectorCard[1] == vectorCard[3])) {
                    return enTinType.TinType_OtherTriple;
                }
                //两对
                if((vectorCard[0] == vectorCard[1]) && (vectorCard[2] == vectorCard[3]))//两对
                {
                    return enTinType.TinType_OtherTriple;
                }

                //前两张为一对
                if(vectorCard[0] == vectorCard[1]) {
                    if((this.GetMahjongLogicValue(vectorCard[3]) - this.GetMahjongLogicValue(vectorCard[2])) < 3)//如果后两张是相邻或是相隔
                    {
                        return enTinType.TinType_OtherTriple;
                    }
                    return enTinType.TinType_Nothing;
                }
                //中间两张为一对
                if(vectorCard[1] == vectorCard[2]) {
                    if((this.GetMahjongLogicValue(vectorCard[3]) - this.GetMahjongLogicValue(vectorCard[0])) < 3) {
                        return enTinType.TinType_OtherTriple;
                    }
                    return enTinType.TinType_Nothing;
                }
                //后两张为一对
                if(vectorCard[2] == vectorCard[3]) {
                    if((this.GetMahjongLogicValue(vectorCard[1]) - this.GetMahjongLogicValue(vectorCard[0])) < 3) {
                        return enTinType.TinType_OtherTriple;
                    }
                    return enTinType.TinType_Nothing;
                }

                //到这里，整个牌中就不含有对子了，再检查是否含有顺子情况
                if((this.GetMahjongLogicValue(vectorCard[2]) - this.GetMahjongLogicValue(vectorCard[1])) > 1)//四个散牌的中间两张不紧联，如：34 67
                {
                    return enTinType.TinType_Nothing;
                }

                //到这里，四个散牌的中间两张是紧联的，再看能否与左边或右边的一张凑成顺子
                if(((this.GetMahjongLogicValue(vectorCard[1]) - this.GetMahjongLogicValue(vectorCard[0])) < 2) || ((this.GetMahjongLogicValue(vectorCard[3]) - this.GetMahjongLogicValue(vectorCard[2])) < 2)) {
                    return enTinType.TinType_OtherTriple;
                }
                return enTinType.TinType_Nothing;
            }

            /*注：
            以下为大数递归,事实上,4张以上可以用递归的方法考察
            其中,6,9,12张就是3模式的递归;7,10,13张就是4模式的递归;5,8,11张就是2模式的递归,(以3取余)
            */

            var vectorGet: Array<Array<number>> = new Array<Array<number>>();
            //针对花牌，以各种情况移除一个组（刻或者顺）后得到的所有可能的序列
            this.GetFigureCardListByRemoveTriple(vectorCard,vectorGet);
            if(vectorGet.length == 0) {
                return enTinType.TinType_Nothing;
            }

            //6，9，12张,可能的牌型为Nothing或Triple
            if(vectorCard.length % 3 == 0) {
                for(var i = 0;i < vectorGet.length;i++) {
                    if(this.GetFigureCardTinType(vectorGet[i]) == enTinType.TinType_Tirple) {
                        return enTinType.TinType_Tirple;
                    }
                }
                return enTinType.TinType_Nothing;
            }

            //7，10，13张
            if(vectorCard.length % 3 == 1) {
                for(var i = 0;i < vectorGet.length;i++) {
                    if(this.GetFigureCardTinType(vectorGet[i]) == enTinType.TinType_OtherTriple) {
                        return enTinType.TinType_OtherTriple;
                    }
                }
                return enTinType.TinType_Nothing;
            }

            //5,8,11张
            if(vectorCard.length % 3 == 2) {
                //检查听牌的结果,这里存放枚举值
                var mapCheckResult: Array<enTinType> = new Array<enTinType>();
                //将处理后的子序列全部判型一下,取最好的情况
                for(var i = 0;i < vectorGet.length;i++) {
                    var type: enTinType = this.GetFigureCardTinType(vectorGet[i]);
                    mapCheckResult.push(type);
                }
                //优先判断FreePair,例如,345666678解析子项345666时返回FreePair
                if(this.IsContainsTinType(mapCheckResult,enTinType.TinType_FreePair))
                    return enTinType.TinType_FreePair;

                //如果此牌阵即可NeedPair又可HavePair,即为FreePair
                if((this.IsContainsTinType(mapCheckResult,enTinType.TinType_NeedPair)) && (this.IsContainsTinType(mapCheckResult,enTinType.TinType_HavePair)))
                    return enTinType.TinType_FreePair;

                //如果只是NeedPair或者HavePair
                if(this.IsContainsTinType(mapCheckResult,enTinType.TinType_HavePair))
                    return enTinType.TinType_HavePair;

                //剩下只有NeedPair了
                if(this.IsContainsTinType(mapCheckResult,enTinType.TinType_NeedPair))
                    return enTinType.TinType_NeedPair;

                ///如果什么也没有
                return enTinType.TinType_Nothing;
            }

            return enTinType.TinType_Unknown;
        }

        //得到两个2模式的所有听的牌,
        public static GetTwo2ModelTinCards(vectorCard1: Array<number>,vectorCard2: Array<number>): Array<number> {
            var vResult: Array<number> = new Array<number>()
            vResult.splice(0,vResult.length);
            if(((vectorCard1.length % 3) != 2) || ((vectorCard2.length % 3) != 2)) //此牌阵非二模式
                return vResult;

            //牌阵一排序
            this.sortCardAry(vectorCard1)
            if(this.GetMahjongColor(vectorCard1[0]) != this.GetMahjongColor(vectorCard1[vectorCard1.length - 1]))
                return vResult;

            //牌阵二排序
            this.sortCardAry(vectorCard2)
            if(this.GetMahjongColor(vectorCard2[0]) != this.GetMahjongColor(vectorCard2[vectorCard2.length - 1]))
                return vResult;

            var checkOutTinType1: enTinType;///第一个2模式的听牌类型

            if(this.GetMahjongColor(vectorCard1[0]) < BBMJMahjongDef.gMahjongColor_Zhi)//万,筒,条
            {
                checkOutTinType1 = this.GetFigureCardTinType(vectorCard1);
            }
            else {
                checkOutTinType1 = this.GetCharFigureCardTinType(vectorCard1);
            }

            var checkOutTinType2: enTinType;///第二个2模式的听牌类型

            if(this.GetMahjongColor(vectorCard2[0]) < BBMJMahjongDef.gMahjongColor_Zhi)//万,筒,条
            {
                checkOutTinType2 = this.GetFigureCardTinType(vectorCard2);
            }
            else {
                checkOutTinType2 = this.GetCharFigureCardTinType(vectorCard2);
            }

            if((checkOutTinType1 == enTinType.TinType_Nothing) || (checkOutTinType2 == enTinType.TinType_Nothing))
                return vResult;

            if((checkOutTinType1 == enTinType.TinType_NeedPair) && (checkOutTinType2 == enTinType.TinType_NeedPair))
                return vResult;//不能都为NeedPair

            //1,两个中有一个为NeedPair,返回为NeedPair的听牌集
            if(checkOutTinType1 == enTinType.TinType_NeedPair)
                return this.Get2ModelTinCards(vectorCard1);

            if(checkOutTinType2 == enTinType.TinType_NeedPair)
                return this.Get2ModelTinCards(vectorCard2);


            /*******************************************************************************************
            * 2个2模式(A,B)之间的关系:
            *
            * 1,消除NeedPair: 如果前一个2模式A为NeedPair,另一个2模式B为(FreePair,或者HavePair),结果为A的Round
            * 2,如果前一个2模式A为HavePair,另一个2模式B为(FreePair,或者HavePair),结果为A的Pair加B的Round和Pair
            * 3,如果前一个2模式A为FreePair,另一个2模式B为(FreePair,或者HavePair),结果为A的Pair加B的Round和Pair
            * ********************************************************************************************/

            //其他的情况将card2List1和card2List2听牌集合并返回即可
            //因为,HavePair的听牌集只可能为Pair,而FreePair的听牌集也只能够为Round
            return this.MergeVector(this.Get2ModelTinCards(vectorCard1),this.Get2ModelTinCards(vectorCard2));
        }

        //得到一个2模式的听牌集
        public static Get2ModelTinCards(vectorCard: Array<number>): Array<number> {
            var vResult: Array<number> = new Array<number>();
            vResult.splice(0,vResult.length);
            if((vectorCard.length % 3) != 2)
                return vResult;

            if(this.GetMahjongColor(vectorCard[0]) != this.GetMahjongColor(vectorCard[vectorCard.length - 1])) //此牌阵不为同一种花色牌
                return vResult;

            if(this.GetMahjongColor(vectorCard[0]) < BBMJMahjongDef.gMahjongColor_Zhi)//万,筒,条
            {
                //2张
                if(vectorCard.length == 2) {
                    //如果为HavePair(例:22,返回2),如果是NeedPair(例:23,返回14)
                    //不用担心,在递归去串过程中,不会将HavePair和NeedPair混淆.
                    var results: Array<number> = this.GetTwoCardsRound(vectorCard[0],vectorCard[1]);
                    return results;
                }

                var finalResults: Array<number> = new Array<number>();//结果集

                //(调用去顺,再递归)
                var remLists: Array<Array<number>> = new Array<Array<number>>();
                //针对花牌，以各种情况移除一个组（刻或者顺）后得到的所有可能的序列
                this.GetFigureCardListByRemoveTriple(vectorCard,remLists);

                if(remLists.length == 0)
                    return vResult;
                for(var i = 0;i < remLists.length;i++) {
                    //合并所有听牌集
                    var subResults: Array<number> = this.Get2ModelTinCards(remLists[i]);
                    finalResults = this.MergeVector(finalResults,subResults);
                }
                return finalResults;
            }
            else//字牌
            {
                //2张
                if (vectorCard.length == 2)
                {
                    var results: Array<number> = new Array<number>();
                    if (vectorCard[0] == vectorCard[1])
                        results.push(vectorCard[0]);

                    return results;
                }
                var finalResults: Array<number> = new Array<number>();//结果集

                //(调用去顺,再递归)
                var remLists:Array<Array<number>> = new Array<Array<number>>();
                this.GetCharCardsListsByRemoveTriple(vectorCard, remLists);

                if (remLists.length == 0)
                    return vResult;

                for (var i = 0; i < remLists.length; i++)
                {
                    //合并所有听牌集
                    var subResults:Array<number> = this.Get2ModelTinCards(remLists[i]);
                    finalResults = this.MergeVector(finalResults, subResults);
                }
                return finalResults;
            }

        }



        //得到两个牌(两张牌必须为同一类型花色,且不为字牌)能够成为一个Triple的关联牌集
        public static GetTwoCardsRound(card1: number,card2: number): Array<number> {
            var list: Array<number> = new Array<number>();
            //花色不一，不能进行
            if(this.GetMahjongColor(card1) != this.GetMahjongColor(card2)) {
                return list;
            }


            //排序,确保card2>card1
            if(card1 > card2) {
                var change: number = card1;
                card1 = card2;
                card2 = change;
            }

            var cTemp1: number = this.GetMahjongValue(card1);
            var cTemp2: number = this.GetMahjongValue(card2);

            if(card2 == card1) {
                list.push(card1);
                return list;
            }

            if((card2 - card1) == 2) {
                list.push((card2 + card1) / 2);
                return list;
            }

            if((card2 - card1) == 1)//(例:89,56,12)
            {
                if(cTemp2 == 9)
                    list.push(card1 - 1);
                else {
                    if(cTemp1 == 1)
                        list.push(card2 + 1);
                    else {
                        list.push(card1 - 1);
                        list.push(card2 + 1);
                    }
                }
                return list;
            }

            return list;
        }
        //获取一个1模式的所有听牌集合，必须为单花色且排序好的牌
        public static Get1ModelTinCards(cardVector: Array<number>): Array<number> {
            //数据初始化
            //this.RemoveRepeat(vectorTingCard);
            var vResult: Array<number> = new Array<number>();
            vResult.splice(0,vResult.length);
            if((cardVector.length % 3) != 1)
                return vResult;

            //排序
            this.sortCardAry(cardVector);

            if(this.GetMahjongColor(cardVector[0]) < BBMJMahjongDef.gMahjongColor_Zhi)//万,筒,条
            {
                //1张
                if(cardVector.length == 1) {
                    vResult.push(cardVector[0]);
                    return vResult;
                }

                //4张
                if(cardVector.length == 4) {
                    if(cardVector[0] == cardVector[3])//为4个头,返回null
                        return vResult;

                    if(cardVector[2] == cardVector[0])///前三张为一刻
                    {
                        vResult.push(cardVector[3]);
                        var round: Array<number> = this.GetTwoCardsRound(cardVector[2],cardVector[3]);
                        this.MergeVector(vResult,round);
                        //排序
                        this.sortCardAry(vResult);
                        return vResult;
                    }
                    if(cardVector[3] == cardVector[1])///后三张为一刻
                    {
                        vResult.push(cardVector[0]);
                        var round: Array<number> = this.GetTwoCardsRound(cardVector[0],cardVector[1]);
                        this.MergeVector(vResult,round);
                        //排序
                        this.sortCardAry(vResult);
                        return vResult;
                    }
                    //两对
                    if(((cardVector[1] == cardVector[0])) && ((cardVector[3] == cardVector[2]))) {
                        vResult.push(cardVector[0]);
                        vResult.push(cardVector[3]);
                        return vResult;
                    }
                    if((cardVector[1] - cardVector[0]) == 0)///前两张为一对
                    {
                        var round: Array<number> = this.GetTwoCardsRound(cardVector[2],cardVector[3]);
                        this.MergeVector(vResult,round);
                        return vResult;
                    }
                    if((cardVector[2] - cardVector[1]) == 0)///中间两张为一对
                    {
                        var round: Array<number> = this.GetTwoCardsRound(cardVector[0],cardVector[3]);
                        this.MergeVector(vResult,round);
                        return vResult;
                    }
                    if((cardVector[3] - cardVector[2]) == 0)///后两张为一对
                    {
                        var round: Array<number> = this.GetTwoCardsRound(cardVector[0],cardVector[1]);
                        this.MergeVector(vResult,round);
                        return vResult;
                    }
                    //单张
                    if((cardVector[2] - cardVector[1]) > 1)///四张单张的中间两张不连张
                        return vResult;
                    else {
                        if((cardVector[3] - cardVector[2]) == 1)//(例:2456)
                            vResult.push(cardVector[0]);

                        if((cardVector[1] - cardVector[0]) == 1)//(例:3457)
                            vResult.push(cardVector[3]);
                        return vResult;
                    }
                }

                //7,10,13递归
                //Vector_Byte finalResults;///结果集
                //(调用去顺,再递归)
                var remLists: Array<Array<number>> = new Array<Array<number>>();
                //针对花牌，以各种情况移除一个组（刻或者顺）后得到的所有可能的序列
                this.GetFigureCardListByRemoveTriple(cardVector,remLists);
                if(remLists.length == 0)
                    return vResult;
                for(var i = 0;i < remLists.length;i++) {
                    //合并所有听牌集
                    var subResults: Array<number> = this.Get1ModelTinCards(remLists[i]);
                    this.MergeVector(vResult,subResults);
                }
                return vResult;
            }
            else//字牌
            {
                //1张
                if (cardVector.length == 1)
                {
                    vResult.push(cardVector[0]);
                    return vResult;
                }
                //4张
                if (cardVector.length == 4)
                {
                    if (cardVector[0] == cardVector[3])//为4个头,返回null
                        return vResult;
                    if (cardVector[2] == cardVector[0])///前三张为一刻
                    {
                        vResult.push(cardVector[3]);
                        return vResult;
                    }
                    if (cardVector[3] == cardVector[1])///后三张为一刻
                    {
                        vResult.push(cardVector[0]);
                        return vResult;
                    }
                    if (((cardVector[1] == cardVector[0])) && ((cardVector[3] == cardVector[2])))///字牌必为两对
                    {
                        vResult.push(cardVector[0]);
                        vResult.push(cardVector[3]);
                        return vResult;
                    }
                }
                //7,10,13张
                //(调用去顺,再递归)
                var remLists:Array<Array<number>> = new Array<Array<number>>();
                this.GetCharCardsListsByRemoveTriple(cardVector, remLists);

                if (remLists.length == 0)
                    return vResult;

                for (var i = 0; i < remLists.length; i++)
                {
                    ///合并所有听牌集
                    //List<byte> subResults = new List<byte>();
                    var subResults_zhi: Array<number> = this.Get1ModelTinCards(remLists[i]);
                    vResult = this.MergeVector(vResult, subResults_zhi);
                }
                return vResult;
            }
        }


        /////////////////////////////////////////////////////////////////////////egret里面的且不冲突的代码///////////////////////////////////////////////////////////

    	/**
    	 * 获取本次需要换的三张牌
    	 * */
    	public static getNeedChangeCard(handCard:Array<number>):Array<number>{

            if((null == handCard) || (handCard.length < 3)) {
                return null;
            }
    	      var changeCard:Array<number> = new Array<number>();

    	      var wanCardAry:Array<number> = new Array<number>();
    	      var tongCardAry:Array<number> = new Array<number>();
    	      var tiaoCardAry:Array<number> = new Array<number>();

    	      BBMJMahjongAlgorithm1.spiltHandCard(handCard,wanCardAry,tongCardAry,tiaoCardAry,null);

    	      var cardAry:Array<Array<number>> = new Array<Array<number>>();
    	      if(wanCardAry.length >= 3){
    	          cardAry.push(wanCardAry);
    	      }
            if(tongCardAry.length >= 3){
                cardAry.push(tongCardAry);
    	      }
            if(tiaoCardAry.length >= 3){
                cardAry.push(tiaoCardAry);
    	      }

    	      if(cardAry.length > 0){
    	          var min : number = 0;
    	          for(var i:number=0; i<cardAry.length; i++){
    	              if(cardAry[i].length < cardAry[min].length){
    	                  min = i;
    	              }
    	          }
                cardAry[min].sort();
    	          changeCard = cardAry[min].slice(0,3);
    	      }

    	      return changeCard;
    	}



        //检查听牌是否为十三烂
        public static CheckIfTingShiSanLan(vSrc:Array<number>):boolean
        {
            //十三烂必须是门清
            if (13 != vSrc.length)
            {
                return false;
            }

            var handCard:Array<number> = new Array<number>();
            for(var i:number=0; i<vSrc.length; i++){
                handCard.push(vSrc[i]);
            }

            //1、先将玩家的牌分开
            var vWanCard:Array<number> = new Array<number>();
            var vTongCard:Array<number> = new Array<number>();
            var vTiaoCard:Array<number> = new Array<number>();
            var vZhiCard:Array<number> = new Array<number>();

            BBMJMahjongAlgorithm1.spiltHandCard(handCard,vWanCard,vTongCard,vTiaoCard,vZhiCard);

            //检查万筒条是否满足条件
            if (!BBMJMahjongPattern.CheckValueBiggerTwo(vWanCard) || !BBMJMahjongPattern.CheckValueBiggerTwo(vTongCard) || !BBMJMahjongPattern.CheckValueBiggerTwo(vTiaoCard))
            {
                return false;
            }

            //检查字是否满足条件
            if (!BBMJMahjongPattern.CheckZhiIsSame(vZhiCard))
            {
                return false;
            }

            return true;
        }




        //////////////////////////////////////////////////////////////////egret安庆麻将中的BBMJMahjongAlgorithm1里面的代码//////////////////////////////////////////////////

        /**
         * 获取花色数量
         * */
        public static getColorNum(handCard: Array<number>):number{
            var colorCard:Array<number> = new Array<number>();
            colorCard.push(0);
            colorCard.push(0);
            colorCard.push(0);
            colorCard.push(0);

            for(var i = 0;i < handCard.length; i++) {
                if(BBMJMahjongDef.gInvalidMahjongValue == handCard[i]){
                    continue;
                }
                colorCard[BBMJMahjongAlgorithm1.GetMahjongColor(handCard[i])] = 1;
            }

            var colorNum : number=0;
            for(var j:number=0; j<colorCard.length; j++){
                colorNum +=colorCard[j];
            }

            return colorNum;
        }

        /// <summary>
        /// 检查指定牌是否是将牌:2,5,8的非字牌
        /// </summary>
        /// <param name="checkCard"></param>
        /// <returns></returns>
        public static CheckIsJiangCard(checkCard: number): boolean {
            if(BBMJMahjongDef.gMahjongColor_Zhi == BBMJMahjongAlgorithm1.GetMahjongColor(checkCard)) {
                return false;
            }

            if((2 == BBMJMahjongAlgorithm1.GetMahjongValue(checkCard)) ||
                (5 == BBMJMahjongAlgorithm1.GetMahjongValue(checkCard)) ||
                (8 == BBMJMahjongAlgorithm1.GetMahjongValue(checkCard))) {
                return true;
            }

            return false;
        }

        /// <summary>
        /// 是否是幺九牌
        /// </summary>
        /// <param name="checkCard"></param>
        /// <returns></returns>
        public static CheckIs19Card(checkCard: number): boolean {
            if(BBMJMahjongDef.gMahjongColor_Zhi == BBMJMahjongAlgorithm1.GetMahjongColor(checkCard)) {
                return false;
            }

            if((1 == BBMJMahjongAlgorithm1.GetMahjongValue(checkCard)) ||
                (9 == BBMJMahjongAlgorithm1.GetMahjongValue(checkCard))) {
                return true;
            }

            return false;
        }

























        ////////////////////////////////////////////////////////安庆麻将调用egret里面MJCommon.MahjongAlgorithm里面的函数/////////////////////////////////////////////////////////








        //是否普通听牌
        public static CheckIfCanNormalTing(vSrc: Array<number>): boolean {
            this.sortCardAry(vSrc);

            //1、按花色分拣牌
            var vectorWan: Array<number> = new Array<number>();
            var vectorTong: Array<number> = new Array<number>();
            var vectorTiao: Array<number> = new Array<number>();
            var vectorZhi: Array<number> = new Array<number>();
            this.spiltHandCard(vSrc,vectorWan,vectorTong,vectorTiao,vectorZhi);

            //2、得到各个花色牌的听牌类型
            var wWanTinType: number = <number>this.GetFigureCardTinType(vectorWan);
            var wTongTinType: number = <number>this.GetFigureCardTinType(vectorTong);
            var wTiaoTinType: number = <number>this.GetFigureCardTinType(vectorTiao);
            var wshortTinType:number = <number>this.GetCharFigureCardTinType(vectorZhi);

            //3、组合判断
            //var wTinType: number = wWanTinType * wTongTinType * wTiaoTinType;// * wshortTinType;
            var wTinType: number = wWanTinType * wTongTinType * wTiaoTinType * wshortTinType;

            //有一个是Nothing，就不能听牌
            if(wTinType == 0) {
                return false;
            }

            //听牌只有两种可能
            /*
            1、一个四模式(TinType_OtherTriple = 7),其他均为3模式(TinType_Tirple = 1,)

            2、两个2模式(只要不都为TinType_NeedPair),其他均为3模式(TinType_Tirple = 1,)
            */
            if(wTinType == 7) {
                return true;
            }

            if((wTinType == 25) || (wTinType == 10) || (wTinType == 15) || (wTinType == 4) || (wTinType == 6)) {
                return true;
            }

            if(wTinType % 9 == 0)//NeedPair = 3,两个2模式都为NeedPair
            {
                return false;
            }

            return false;
        }




        //获取一个牌阵所听之牌
        public static GetNormalTingCard(vSrc: Array<number>): Array<number> {
            var vResult: Array<number> = new Array<number>();
            vResult.splice(0,vResult.length);
            //1、按花色分拣牌
            //先排序
            this.sortCardAry(vSrc);

            //再分拣

            //如果听牌,只可能两种情况:
            //1,必有一个四模式,其他都是成组的3模式
            //2,两个2模式,其他都是成组的3模式


            //1、按花色分拣牌
            var vectorWan: Array<number> = new Array<number>();
            var vectorTong: Array<number> = new Array<number>();
            var vectorTiao: Array<number> = new Array<number>();
            var vectorZhi: Array<number> = new Array<number>();
            this.spiltHandCard(vSrc,vectorWan,vectorTong,vectorTiao,vectorZhi);


            ///判断1模式
            if (vectorZhi.length % 3 == 1)
            {
                // vectorZhi.Sort();
                // Get1ModelTinCards(vectorZhi, ref vectorTingCard);
                // return;
                console.log("1模式字");
                this.sortCardAry(vectorZhi);
                vResult = this.Get1ModelTinCards(vectorZhi);
                this.RemoveRepeat(vResult);
                return vResult;
            }
            if(vectorWan.length % 3 == 1) {
                console.log("1模式万");
                this.sortCardAry(vectorWan);
                vResult = this.Get1ModelTinCards(vectorWan);
                this.RemoveRepeat(vResult);
                return vResult;
            }
            if(vectorTong.length % 3 == 1) {
                console.log("1模式筒");
                this.sortCardAry(vectorTong);
                vResult = this.Get1ModelTinCards(vectorTong);
                this.RemoveRepeat(vResult);
                return vResult;
            }
            if(vectorTiao.length % 3 == 1) {
                console.log("1模式条");
                this.sortCardAry(vectorTiao);
                vResult = this.Get1ModelTinCards(vectorTiao);
                this.RemoveRepeat(vResult);
                return vResult;
            }

            ///判断2模式(组合:1,字,万;2,字,筒;3,字,条;4,条,万;5,条,筒;6,筒,万;)，无字牌

            // if ((vectorZhi.length % 3 == 2) && (vectorWan.length % 3 == 2))//1、字,万
            // {
            //     vResult = this.GetTwo2ModelTinCards(vectorZhi, vectorWan);
            //     return;
            // }

            // if ((vectorZhi.length % 3 == 2) && (vectorTong.length % 3 == 2))//2、字,筒
            // {
            //     vResult = this.GetTwo2ModelTinCards(vectorZhi, vectorTong);
            //     return;
            // }

            // if ((vectorZhi.length % 3 == 2) && (vectorTiao.length % 3 == 2))//3、字,条
            // {
            //     vResult = this.GetTwo2ModelTinCards(vectorZhi, vectorTiao);
            //     return;
            // }

            if((vectorZhi.length % 3 == 2) && (vectorWan.length % 3 == 2))//4、条,万
            {
                console.log("2模式字万");
                this.sortCardAry(vectorZhi);
                this.sortCardAry(vectorWan);
                vResult = this.GetTwo2ModelTinCards(vectorZhi,vectorWan);
                this.RemoveRepeat(vResult);
                return vResult;
            }

            if((vectorZhi.length % 3 == 2) && (vectorTong.length % 3 == 2))//5、条,筒
            {
                console.log("2模式字筒");
                this.sortCardAry(vectorZhi);
                this.sortCardAry(vectorTong);
                vResult = this.GetTwo2ModelTinCards(vectorZhi,vectorTong);
                this.RemoveRepeat(vResult);
                return vResult;
            }

            if((vectorZhi.length % 3 == 2) && (vectorTiao.length % 3 == 2))//6、筒,万
            {
                console.log("2模式字条");
                this.sortCardAry(vectorZhi);
                this.sortCardAry(vectorTiao);
                vResult = this.GetTwo2ModelTinCards(vectorZhi,vectorTiao);
                this.RemoveRepeat(vResult);
                return vResult;
            }

            if((vectorTiao.length % 3 == 2) && (vectorWan.length % 3 == 2))//4、条,万
            {
                console.log("2模式条万");
                this.sortCardAry(vectorTiao);
                this.sortCardAry(vectorWan);
                vResult = this.GetTwo2ModelTinCards(vectorTiao,vectorWan);
                this.RemoveRepeat(vResult);
                return vResult;
            }

            if((vectorTiao.length % 3 == 2) && (vectorTong.length % 3 == 2))//5、条,筒
            {
                console.log("2模式条筒");
                this.sortCardAry(vectorTiao);
                this.sortCardAry(vectorTong);
                vResult = this.GetTwo2ModelTinCards(vectorTiao,vectorTong);
                this.RemoveRepeat(vResult);
                return vResult;
            }

            if((vectorTong.length % 3 == 2) && (vectorWan.length % 3 == 2))//6、筒,万
            {
                console.log("2模式条万");
                this.sortCardAry(vectorTong);
                this.sortCardAry(vectorWan);
                vResult = this.GetTwo2ModelTinCards(vectorTong,vectorWan);
                this.RemoveRepeat(vResult);
                return vResult;
            }
        }




        //////////////////////////////////////////////////////////////////////////////////////下面是从南京麻将拷过来的/////////////////////////////////////////////////////////




        /**
    	 * 字符串长度
    	 * */
    	public static strLen(str:string):number{
            return str.replace(/[\u0391-\uFFE5]/g,"aa").length;
    	}
    	//
    	//取牌值
    	//

    	/*
    	 * 取麻将牌花色,0万，1筒，2条，3字
    	 * */
        public static GetMahjongColor(card:number):number{
            return (card & BBMJMahjongDef.gCardMask_color) >> 4;
        }
        /**
         * 取花色数值,0x00万,0x10筒,0x20条，0x30字
         * */
        public static GetMahjongColorValue(card:number):number{
            return (card & BBMJMahjongDef.gCardMask_color);
        }
        /**
         * 取麻将牌值,1~9,一万==一筒==一条
         * */
        public static GetMahjongValue(card):number{
            return (card & BBMJMahjongDef.gCardMask_value);
        }
        /**
         * 取麻将牌逻辑数值,取牌逻辑值:万<筒<条<字<花
         * */
        public static GetMahjongLogicValue(card):number{
            return BBMJMahjongAlgorithm1.GetMahjongColor(card) * 10 + BBMJMahjongAlgorithm1.GetMahjongValue(card);
        }

        //
        //权限检查
        //

        /**
         * 检查是否可以碰
         * */
        public static CheckVoteRight_Peng(voteRight:number):boolean{
            return (voteRight & BBMJMahjongDef.gVoteRightMask_Peng) > 0;
           //return (voteRight == BBMJMahjongDef.gVoteRightMask_Peng);
        }
        /**
         * 检查是否可以杠
         * */
        public static CheckVoteRight_Gang(voteRight: number): boolean {
            return (voteRight & BBMJMahjongDef.gVoteRightMask_Gang) > 0;
         // return (voteRight == BBMJMahjongDef.gVoteRightMask_Gang);
        }
        /**
         * 检查是否可以胡
         * */
        public static CheckVoteRight_Hu(voteRight: number): boolean {
            return (voteRight & BBMJMahjongDef.gVoteRightMask_Hu) > 0;
         // return (voteRight == BBMJMahjongDef.gVoteRightMask_Hu);
        }
         /**
         * 检查是否可以听
         * */
        public static CheckVoteRight_Ting(voteRight: number): boolean {

            return (voteRight == BBMJMahjongDef.gVoteRightMask_Ting);
            
            
            
        }
        // /**
        //  * 检查是否可以吃
        //  * */
        // public static CheckVoteRight_Chi(voteRight: number): boolean {
        //     return (voteRight & BBMJMahjongDef.gVoteRightMask_Chi) > 0;
        // }


        /**
         * 牌阵排序
         * */
        public static sortCardAry(cardAry:Array<number>):void{
            if((null == cardAry) || (cardAry.length < 2)){
                return;
            }

            var tempCard : number=0;

            // for(var i:number=0; i<cardAry.length - 1; i++){
            //     for(var j:number = i+1; j<cardAry.length; j++){
            //         if(cardAry[i]!=BBMJMahjongDef.LaiZi&&(cardAry[j]==BBMJMahjongDef.LaiZi||cardAry[i] > cardAry[j])){

            //             tempCard = cardAry[i];
            //             cardAry[i] = cardAry[j];
            //             cardAry[j] = tempCard;

            //         }
            //     }
            // }
            for(var i:number=0; i<cardAry.length - 1; i++){
                for(var j:number = i+1; j<cardAry.length; j++){
                    if(cardAry[i] > cardAry[j]){

                        tempCard = cardAry[i];
                        cardAry[i] = cardAry[j];
                        cardAry[j] = tempCard;

                    }
                }
            }
           
        }
        public static sortCardAry1(cardAry: Array<number>, HunAry1: Array<number>): Array<number> {
            if ((null == cardAry) || (cardAry.length < 2)||(cardAry==undefined)) {
                return cardAry;
            }

            var cardAry2: Array<number> = new Array<number>();

            var tempCard: number = 0;
            if (HunAry1.length == 1) {
                for (var k: number = 0; k < 4; k++) {
                    for (var i: number = 0; i < cardAry.length; i++) {
                        if (cardAry[i] == HunAry1[0]) {
                            cardAry2.push(cardAry[i]);
                            cardAry.splice(i, 1);
                            break;
                        }

                    }

                }

            } else if (HunAry1.length == 2) {

                for (var j: number = 0; j < 7; j++) {

                    for (var i: number = 0; i < cardAry.length; i++) {
                        if (cardAry[i] == HunAry1[0] || cardAry[i] == HunAry1[1]) {
                            cardAry2.push(cardAry[i]);
                            cardAry.splice(i, 1);
                            break;
                        }

                    }
                }


            }
//             let aa:Array<number>=[];
// for (var i = 0; i < cardAry.length; i++) {
//     if(cardAry[i] == HunAry1[0] || cardAry[i] == HunAry1[1]){
// aa.push()
//     }else{

//     }
    
// }

            cardAry = cardAry2.concat(cardAry);
            return cardAry;



        }
        
        /**
         * 删除牌
         * */
        public static delCard(cardAry:Array<number>,delCard:Array<number>):void{
            var idx : number=-1;
            for(var i:number=0; i<delCard.length; i++){
                idx = -1;
                for(var j=0; j<cardAry.length; j++){
                    if(delCard[i] == cardAry[j]){
                        idx = j;
                        break;
                    }
                }

                if(idx >= 0){
                    cardAry.splice(idx,1);
                }
            }
        }

        /**
         * 检查是否有某花色牌
         * */
        public static checkHaveColor(handCard: Array<number>,color:number):boolean{
            for(var i:number=0; i<handCard.length; i++){
                if(color == BBMJMahjongAlgorithm1.GetMahjongColor(handCard[i])){
                    return true;
                }
            }
            return false;
        }

        /// <summary>
        /// 获取一副牌阵中牌的种类列表
        /// </summary>
        /// <param name="cardAry"></param>
        /// <returns></returns>
        public static GetCardTypeAryFromCardAry(cardAry:Array<number>):Array<number>
        {
            var card:Array<number> = new Array<number>();
            if (cardAry == null || cardAry.length < 1)
            {
                return card;
            }
            var cardAy:Array<number> = new Array<number>();

            for(var i=0;i<cardAry.length;i++){
                cardAy.push(cardAry[i]);
            }
            this.sortCardAry(cardAy);

            var count:number = cardAy.length;

            for (var i = 0; i < count; i++)
            {
                if (i == 0)
                {
                    card.push(cardAy[i]);
                    continue;
                }
                if (cardAy[i] != cardAy[i - 1])
                {
                    card.push(cardAy[i]);
                }
            }
            return card;
        }

            /// <summary>
        /// 获取一副牌阵中某张牌的数量
        /// </summary>
        /// <param name="cardAry">牌阵</param>
        /// <param name="card">需要获取数量的牌值</param>
        /// <returns>返回数量</returns>
        public static GetCardNumInCardAry(cardAry:Array<number>, card:number):number
        {
            var num:number = 0;
            if (cardAry == null || cardAry.length == 0 || card == BBMJMahjongDef.gInvalidMahjongValue)
            {
                return num;
            }
            for(var i=0;i<cardAry.length;i++){
                if(cardAry[i]==card){
                    num++;
                }
            }
            return num;
        }

        /**
         * 向一个列表里面加入一个列表的元素
         * @param desAry
         * @param nedAdAry
         */
        public static AddRangeToAry(desAry:Array<number>,nedAdAry:Array<number>):void{
            if(desAry==null||nedAdAry==null||nedAdAry.length<1){
                return;
            }
            for(var i=0;i<nedAdAry.length;i++){
                desAry.push(nedAdAry[i]);
            }
        }


       /**
        * 一个列表里是否包含另一个列表中的至少一个元素
        */
        public static OneAryIsContainsOtherAryAtListOneMember(ary1:Array<number>,ary2:Array<number>):boolean
        {
            var iscontains:boolean = false;
            if (ary1 == null || ary1.length < 1 || ary2 == null || ary2.length < 1)
            {
                return iscontains;
            }

            for(var i=0;i<ary2.length;i++)
            {
                /*if(ary1.Contains(ary2[i]))
                {
                    iscontains = true;
                }*/
                for(var j=0;j<ary1.length;j++){
                    if(ary1[j]==ary2[i]){
                        iscontains = true;
                    }
                }
            }
            return iscontains;
        }
        /// <summary>
        /// 向列表里添加指定元素的指定个数
        /// </summary>
        /// <param name="Ary"></param>
        /// <param name="card"></param>
        /// <param name="num"></param>
        public static AddZhiDingNumMemberInAry(Ary:Array<number>, card:number, num:number):void
        {
            if(Ary==null)
            {
                return;
            }

            for(var i=0;i<num;i++)
            {
                Ary.push(card);
            }
            this.sortCardAry(Ary);
        }
        /**
         * 一个列表里面是否包含某一个元素
         */
        public static  AryContainsOneOrNot(Ary:Array<number>,num:number):boolean{
            var iscontains=false;
            if(Ary==null||Ary.length<1){
                return iscontains;
            }
            for(var i=0;i<Ary.length;i++){
                if(Ary[i]==num){
                    iscontains=true;
                }
            }
            return iscontains;
        }
        public static AryRemoveOneMember(Ary:Array<number>,num:number):void{
            if(Ary==null||Ary.length<1){
                return;
            }

            if(!this.AryContainsOneOrNot(Ary,num)){
                return;
            }
            for(var i=0;i<Ary.length;i++){
                if(Ary[i]==num){
                    Ary.splice(i,1);
                    break;
                }
            }
        }

        /**
         * 将牌阵分拣为:万，筒，条，字
         * */
        public static spiltHandCard(handCard:Array<number>,wan:Array<number>,tong:Array<number>,tiao:Array<number>,zhi:Array<number>):void{

            if((null == handCard) || (handCard.length < 1)){
                return;
            }
            if(null != wan){
                wan.splice(0,wan.length);
            }
            if(null != tong) {
                tong.splice(0,tong.length);
            }
            if(null != tiao) {
                tiao.splice(0,tiao.length);
            }
            if(null != zhi) {
                zhi.splice(0,zhi.length);
            }

            for(var i:number=0; i<handCard.length; i++){
                if(BBMJMahjongDef.gInvalidMahjongValue != handCard[i]){
                    switch(BBMJMahjongAlgorithm1.GetMahjongColor(handCard[i])){
                        case BBMJMahjongDef.gMahjongColor_Wan:{
                            if(null != wan){
                                wan.push(handCard[i]);
                            }
                            break;
                        }
                        case BBMJMahjongDef.gMahjongColor_Tong:{
                            if(null != tong){
                                tong.push(handCard[i]);
                            }
                            break;
                        }
                        case BBMJMahjongDef.gMahjongColor_Tiao:{
                            if(null != tiao){
                                tiao.push(handCard[i]);
                            }
                            break;
                        }
                        case BBMJMahjongDef.gMahjongColor_Zhi:{
                            if(null != zhi){
                                zhi.push(handCard[i]);
                            }
                        }
                    }
                }
            }

        }
        /**
         * 给一个列表里添加指定元素的指定个数(比如在一个列表里添加2个1)
         */
        public static AddZhiDingNumMenberToAry(Ary:Array<number>,Member:number,num:number):void
        {
            if(num<=0)
            {
                return;
            }
            if(Ary==null)
            {
                Ary = new Array<number>();
            }
            for(var i=0;i< num;i++)
            {
                Ary.push(Member);
            }
        }

        /// <summary>
        /// 是否听对对胡(南京麻将客户端要用到，顺便写出来)
        /// </summary>
        /// <param name="vSrc">此参数应该把定牌加进来</param>
        /// <returns></returns>
        public static IsTingDuiDuiHu(vSrc:Array<number>):boolean{
            var isddh:boolean = false;
            if (vSrc == null || vSrc.length < 1)
            {
                return isddh;
            }
            if(vSrc.length%3!=1)
            {
                return isddh;
            }

            var ary:Array<number> = new Array<number>();

            for(var i=0;i<vSrc.length;i++){
                ary.push(vSrc[i]);
            }

            var cardtype:Array<number> = this.GetCardTypeAryFromCardAry(ary);

            var Count:number = cardtype.length;

            var GuZhang:number = 0;//牌阵中单张数量
            var TwoZhang:number = 0;//牌阵中两张的数量

            for(var i=0;i<Count;i++)
            {
                if(this.GetCardNumInCardAry(ary, cardtype[i]) < 2)
                {
                    GuZhang++;
                }
                if (this.GetCardNumInCardAry(ary, cardtype[i]) == 2)
                {
                    TwoZhang++;
                }
            }
            if(GuZhang>1)//对对胡停牌的时候，单张最多只有一个(其余全是3个一样的或4个一样的)，单张多余一个，不可能对对胡听牌
            {
                return isddh;
            }
            if(GuZhang==1&& TwoZhang==0)//只有一个单张，没有对子，听对对胡
            {
                isddh = true;
            }
            if(GuZhang==0&& TwoZhang==2)//没有单张，对子有两个，听对对胡
            {
                isddh = true;
            }

            return isddh;
        }







        /// <summary>
        /// 移除列表里的指定元素的指定个数
        /// </summary>
        /// <param name="Ary"></param>
        /// <param name="card"></param>
        /// <param name="num"></param>
        public static RemoveZhiDingNumMemberInAry(Ary:Array<number>,card:number,num:number):void
        {
            if(Ary==null|| Ary.length<1)
            {
                return;
            }
            if(!this.AryContainsOneOrNot(Ary,card))
            {
                return;
            }

            for(var i=0;i<num;i++){
                for(var j=0;j<Ary.length;j++){
                    if(Ary[j]==card){
                        Ary.splice(j,1);
                        break;
                    }
                }
            }
        }















        public static GetLastCardToTingForDaHuNJMJ(srcAry:Array<number>):Array<number>{
            var vectorChuCard:Array<number>=new Array<number>();

            for(var i:number=0;i<srcAry.length;i++)
            {
                var cardAry:Array<number>=new Array<number>();

                for(var j:number=0;j<srcAry.length;j++)
                {
                    if(j!=i)
                        cardAry.push(srcAry[j]);
                }

                if(this.checkIfCanTingCardAryForNjMJDaHu(cardAry)){
                    vectorChuCard.push(srcAry[i]);
                }
            }
            return vectorChuCard;
        }
        /**
         * 检查是否听牌(南京麻将中的大胡)(之所以单独写出来，是因为南京麻将有花的数量限制)
         */
        private static checkIfCanTingCardAryForNjMJDaHu(srcAry:Array<number>):boolean{
            var isting:boolean=false;
            if(srcAry==null||srcAry.length<1){
                return isting;
            }
            if(this.CheckIfCanTingQuanQiuDuDiao(srcAry)){//听全球独钓
                isting=true;
            }
            if(this.CheckIfTingSevenPair(srcAry)){//听7对
                isting=true;
            }
            if(this.CheckIfCanTingDuiDuiHu(srcAry)){
                isting=true;
            }
            // var tingKAry:Array<number>=new Array<number>();
            // var pengAry:Array<number>=this.GetAllPengCardValue();
            // if(this.IsTingKaHu(srcAry,tingKAry)){
            //     for(var i=0;i<tingKAry.length;i++){
            //         if(this.AryContainsOneOrNot(pengAry,tingKAry[i])){
            //             isting=true;
            //         }
            //     }
            // }

            return isting;
        }
        /**
         * 检查是否听全球独钓
         */
        private static CheckIfCanTingQuanQiuDuDiao(srcAry:Array<number>):boolean{
            var isting:boolean=false;
            if(srcAry==null||srcAry.length<1||srcAry.length>1){
                return isting;
            }
            if(srcAry.length==1){
                isting=true;
            }
            return isting;
        }


        /**
         * 听对对胡
         */
        public static CheckIfCanTingDuiDuiHu(Ary:Array<number>):boolean{
            var isting:boolean=false;
            if (Ary == null || Ary.length < 1)
            {
                return isting;
            }
            if(this.IsTingDuiDuiHu(Ary)){
                isting=true;
            }
            return isting;
        }

        /// <summary>
        /// 是否听卡胡(南京麻将客户端要用到压绝听牌的判断，顺便写出来)(估计用得不多)
        /// </summary>
        /// <param name="vSrc"></param>
        /// <returns></returns>
        public static IsTingKaHu(vSrc:Array<number>,tingAry:Array<number>):boolean
        {
            var isddh:boolean = false;
            if (vSrc == null || vSrc.length < 1)
            {
                return isddh;
            }
            if (vSrc.length % 3 != 1)
            {
                return isddh;
            }
            if(tingAry==null)
            {
                tingAry = new Array<number>();
            }

            var ary:Array<number> = new Array<number>();
            for(var i=0;i<vSrc.length;i++){
                ary.push(vSrc[i]);
            }

            var cardtype = this.GetCardTypeAryFromCardAry(ary);

            var Count:number = cardtype.length;

            for(var i=0;i<Count;i++)
            {
                if(this.GetCardNumInCardAry(ary, cardtype[i]) != 2)
                {
                    continue;
                }

                this.RemoveZhiDingNumMemberInAry(ary, cardtype[i], 2);

                this.sortCardAry(ary);//排序

                for(var k=0;k<ary.length;k++){
                    if(k==ary.length-1){
                        continue;
                    }
                    if(!this.AryContainsOneOrNot(ary,ary[k]+2)){
                        continue;
                    }

                    var AryTwoNum:Array<number>=new Array<number>();
                    AryTwoNum.push(ary[k]);
                    AryTwoNum.push(ary[k]+2);

                    for(var z=0;z<AryTwoNum.length;z++){
                        this.RemoveZhiDingNumMemberInAry(ary,AryTwoNum[z],1);
                    }

                    var vTriple:Array<clsParseTriple> = new Array<clsParseTriple>();

                    this.Parse3ModelToTripleListAllColor(ary, vTriple);//这个函数有问题判断不出来

                    if(vTriple.length*3== ary.length){
                        isddh = true;
                        tingAry.push(AryTwoNum[0]+1);
                    }
                    for(var z=0;z<AryTwoNum.length;z++){
                        this.AddZhiDingNumMemberInAry(ary, AryTwoNum[z], 1);
                    }
                }

                this.AddZhiDingNumMemberInAry(ary, cardtype[i], 2);
            }

            return isddh;
        }

        /**
         * 判断一副牌是否是混一色(只有万筒条中的一种和东南西北)(南京麻将中的一种)
         */
        public static IsHunYiSe(Ary:Array<number>):boolean{
            var isqys:boolean = false;

            if (Ary == null || Ary.length < 1)
            {
                return isqys;
            }

            var colorfirst = BBMJMahjongDef.gInvalidMahjongValue;

            if(!this.OneAryIsContainsOtherAryAtListOneMember(Ary,this.GetDNXB()))//保证牌值列表里至少有东南西北中的一个
            {
                return isqys;
            }

            for (var i=0;i<Ary.length;i++)
            {
                if(this.GetMahjongLogicValue(Ary[i])>34)//出现中发白，春夏秋冬，梅兰竹菊，那么就不可能是混一色
                {
                    return isqys;
                }

                if(this.GetMahjongColor(Ary[i])<3)
                {
                    colorfirst = this.GetMahjongColor(Ary[i]);
                    break;
                }
            }

            if(colorfirst== BBMJMahjongDef.gInvalidMahjongValue)//如果混一色判断出现问题的话，那么很有可能是这个地方出了问题(关键是，只有东南西北，没有万筒条，算不算混一色)
            {
                return isqys;
            }

            isqys = true;

            for (var i=0;i<Ary.length;i++)
            {
                if(this.GetMahjongColor(Ary[i])<3)
                {
                    if (colorfirst != this.GetMahjongColor(Ary[i]))
                    {
                        isqys = false;
                        break;
                    }
                }
            }
            return isqys;
        }




        /**
         * 获取东南西北列表
         */
        public static GetDNXB():Array<number>
        {
            var zi:Array<number> = new Array<number>();
            var zi1:number = 0x31;
            for(var i=0;i<4;i++)
            {
                zi.push(zi1+i);
            }
            return zi;
        }

        /**
         * 获取中发白列表
         */
        public static GetZFB():Array<number>
        {
            var zi:Array<number> = new Array<number>();
            var zi1:number = 0x35;
            for (var i = 0; i < 3; i++)
            {
                zi.push(zi1 + i);
            }
            return zi;
        }


        /// <summary>
        /// 判断一副牌是否是清一色(只有万筒条中的一种)
        /// </summary>
        /// <param name="Ary"></param>
        /// <returns></returns>
        public static IsQingYiSe(Ary:Array<number>):boolean
        {
            var isqys:boolean = false;

            if (Ary==null|| Ary.length<1)
            {
                return isqys;
            }

            isqys = true;

            var colorfirst = this.GetMahjongColor(Ary[0]);

            for(var i=0;i<Ary.length;i++)
            {
                if(colorfirst!= this.GetMahjongColor(Ary[i]))
                {
                    isqys = false;
                    break;
                }
            }
            return isqys;
        }

        /**
         * 得到所有出牌可听的可能出牌
         */
        public static GetLastCardToTing(srcAry:Array<number>,laizi:number):Array<number>{
            //清理
            var vectorChuCard:Array<number>=new Array<number>();


            for(var i:number=0;i<srcAry.length;i++)
            {
                var cardAry:Array<number>=new Array<number>();

                for(var j:number=0;j<srcAry.length;j++)
                {
                    if(j!=i)
                        cardAry.push(srcAry[j]);
                }
                //cardAry.push(NJMJ.ins.iclass.getHunCard());//这是任丘麻将的写法
                /*if(this.CheckIfCanHuCardArrayForNJMJ(cardAry,laizi))
                {
                    if(srcAry[i]!=NJMJ.ins.iclass.getHunCard())
                        vectorChuCard.push(srcAry[i]);
                }*/

                if(this.CheckIfCanTingCardArrayForNJMJ(cardAry)){
                    vectorChuCard.push(srcAry[i]);
                }
            }
            return vectorChuCard;


            //////////////////////////////////上面为任丘麻将的写法,下面为南京麻将的写法///////////////////////////////

        }


        /**
		 * 检查是否听牌
		 */
        public static CheckIfCanTingCardArray(srcAry:Array<number>,laizi:number):Boolean{
            var cardAry:Array<number>=new Array<number>();

            //手牌基本检查
            for(var i:number=0;i<srcAry.length;i++)
            {
                if(BBMJMahjongDef.gInvalidMahjongValue!=srcAry[i])
                    cardAry.push(srcAry[i]);
            }
            if(1 != (cardAry.length % 3)) {
                return false;
            }
            return this.GetTingCardArrayHaveHun(cardAry,laizi).length>0;
        }


        /**
         * 获取有混牌的听牌集合
         * @param srcAry
         * @param laizi
         */
        public static GetTingCardArrayHaveHun(srcAry:Array<number>,laizi:number):Array<number>{
            var tingCards:Array<number>=new Array<number>();
            if (srcAry.length%3 != 1)
                return tingCards;

            var allCard:Array<number>=new Array<number>();
            for (var i = 0; i < BBMJMahjongDef.gMahjongCard.length; i++)
            {
                if(this.GetCardNumInCardAry(srcAry,BBMJMahjongDef.gMahjongCard[i])==4){//这个判断是，如果手上有4张牌则不提示胡此牌
                    continue;
                }

                allCard.splice(0,allCard.length);
                for(var j=0;j<srcAry.length;j++)
                {
                    allCard.push(srcAry[j]);
                }



                var flower:Array<number> =BBMJMahjongAlgorithm1.GetFlowerCardAryBBMJ();//手上有花牌不能胡
                var isContainshua:boolean=false;
                for(var k=0;k<flower.length;k++){
                    if(BBMJMahjongAlgorithm1.IsContainsNumber(allCard,flower[k])){
                        isContainshua=true;
                    }
                }
                if(isContainshua){
                    continue;
                }



                allCard.push(BBMJMahjongDef.gMahjongCard[i]);

                if (this.CheckIfCanHuCardArrayForNJMJ(allCard,laizi)){//////////此处加了一个南京麻将的判断
                    // if(this.GetFlowerCardNum()>0&&this.GetFlowerCardNum()<4){
                    //     var DaHuTye:Array<enHuCardType>=new Array<enHuCardType>();
                    //     //DaHuTye=BBMJMahjongAlgorithm1Lhh.GetHuTypeNJMJ(allCard,BBMJMahjongDef.gMahjongCard[i]);
                    //     if(DaHuTye.length>0){
                    //         tingCards.push(BBMJMahjongDef.gMahjongCard[i]);
                    //     }
                    // }
                    // else{
                        tingCards.push(BBMJMahjongDef.gMahjongCard[i]);
                    //}
                }
            }
            return tingCards;
       }
       /**
        * 获取听牌集合
        * @param srcAry
        */
       public static GetTingCardArray(srcAry:Array<number>):Array<number>{
            var tingCards:Array<number>=new Array<number>();
            if (srcAry.length%3 != 1)
                return tingCards;

            var CdAry:Array<number> =new Array<number>();

            for(var i=0;i<srcAry.length;i++){
                CdAry.push(srcAry[i]);
            }
            BBMJMahjongAlgorithm1.sortCardAry(CdAry);

            


            var allCard:Array<number>=new Array<number>();

            for (var i = 0; i < BBMJMahjongDef.gMahjongCard.length; i++){
                if(this.GetCardNumInCardAry(srcAry,BBMJMahjongDef.gMahjongCard[i])==4){//这个判断是，如果手上有4张牌则不提示胡此牌
                    continue;
                }

                allCard.splice(0,allCard.length);
                for(var j=0;j<srcAry.length;j++){
                    allCard.push(srcAry[j]);
                }
                allCard.push(BBMJMahjongDef.gMahjongCard[i]);

                if(BBMJMahjongAlgorithm1.CheckIfCanHuCardArray(allCard)){
                    tingCards.push(BBMJMahjongDef.gMahjongCard[i]);
                }
            }




            // var tingNormalCards:Array<number>=BBMJMahjongAlgorithm1.GetNormalTingCard(CdAry);
            // var tingSpecialCards:Array<number>=new Array<number>();
            // BBMJMahjongAlgorithm1.GetSpecialTingCard(CdAry,tingSpecialCards);


            // for(var i=0;i<tingNormalCards.length;i++){
            //     if(!BBMJMahjongAlgorithm1.IsContainsNumber(tingCards,tingNormalCards[i])){
            //         tingCards.push(tingNormalCards[i]);
            //     }
            // }
            // for(var i=0;tingSpecialCards.length;i++){
            //     if(!BBMJMahjongAlgorithm1.IsContainsNumber(tingCards,tingSpecialCards[i])){
            //         tingCards.push(tingSpecialCards[i]);
            //     }
            // }

            // BBMJMahjongAlgorithm1.sortCardAry(tingCards);

            return tingCards;
       }






       /**
        * 一副牌阵是否可以胡
        * @param srcAry
        */
       public static CheckIfCanHuCardArray(srcAry:Array<number>):boolean{
            var vSrc:Array<number> = new Array<number>();
            //手牌基本检查
            for(var i:number=0;i<srcAry.length;i++)
            {
                if(BBMJMahjongDef.gInvalidMahjongValue!=srcAry[i])
                    vSrc.push(srcAry[i]);
            }

            //1、先决条件必须满足:胡牌的牌张数必须满%3==2，否则不可以胡
            if ((vSrc.length % 3) != 2)
            {
                return false;
            }

            //检查普通胡牌
            if(BBMJMahjongAlgorithm1.IsHuNormalStruct(vSrc)){
                return true;
            }

            //检查特殊胡牌
            if(BBMJMahjongAlgorithm1.IsHuSpecialStruct(vSrc)){
                return true;
            }
            return false;
       }

       /**
        * 是否胡特殊结构
        * @param srcAry
        */
       public static IsHuSpecialStruct(srcAry:Array<number>):boolean{
            if (srcAry.length < 2){//手牌必须大于等于2张
                return false;
            }
            if(srcAry.length%3!=2){
                return false;
            }
            var ishuss=false;

            //是否胡7对胡
            if(this.IsHuSevenPairStruct(srcAry)){
                console.log(`胡7对`);
                ishuss=true;
            }

            if(BBMJMahjongAlgorithm1.IsHu13BuKao(srcAry)){
                console.log(`胡13不靠`);
                ishuss=true;
            }
            return ishuss;
       }
       /**
        * 是否胡7对
        * @param vSrc
        */
        public static IsHuSevenPairStruct(vSrc:Array<number>):boolean{
            //1、七对子结构，必须门清
            if (vSrc.length != BBMJMahjongDef.gCardCount_Active)
            {
                return false;
            }
            BBMJMahjongAlgorithm1.sortCardAry(vSrc);
            var  wPairCount:number = 0;
            for (var i = 0; i < vSrc.length - 1; i++)
            {
                if (BBMJMahjongDef.gInvalidMahjongValue == vSrc[i])
                {
                    return false;
                }
                if (vSrc[i] == vSrc[i + 1])
                {
                    ++wPairCount;
                    i += 1;
                    continue;
                }
                else
                {
                    return false;
                }
            }
            return wPairCount == 7;
        }


        public static IsHu13BuKao(vSrc:Array<number>):boolean{
            //1、七对子结构，必须门清
            if (vSrc.length != BBMJMahjongDef.gCardCount_Active)
            {
                return false;
            }

            BBMJMahjongAlgorithm1.sortCardAry(vSrc);

            for (var i = 0; i < vSrc.length - 1; i++)
            {
                if (BBMJMahjongAlgorithm1.GetMahjongColor(vSrc[i]) != BBMJMahjongAlgorithm1.GetMahjongColor(vSrc[i + 1]))
                {
                    i += 1;
                    continue;
                }
                if (BBMJMahjongAlgorithm1.GetMahjongColor(vSrc[i]) < 3)
                {
                    if (BBMJMahjongAlgorithm1.GetMahjongLogicValue(vSrc[i + 1]) - BBMJMahjongAlgorithm1.GetMahjongLogicValue(vSrc[i]) < 3)
                    {
                        return false;
                    }
                }
                else
                {
                    if (BBMJMahjongAlgorithm1.GetMahjongLogicValue(vSrc[i + 1]) == BBMJMahjongAlgorithm1.GetMahjongLogicValue(vSrc[i]))
                    {
                        return false;
                    }
                }
            }


            // var ziCardAry:Array<number> = BBMJMahjongAlgorithm1.GetDNXB();

            // BBMJMahjongAlgorithm1.AddRangeToAry(ziCardAry,BBMJMahjongAlgorithm1.GetZFB())

            return true;
        }








       /**
        * 检查一副牌阵是否听牌(南京麻将)
        */
        public static CheckIfCanTingCardArrayForNJMJ(srcAry:Array<number>,vectorTingCard:Array<number>=null):boolean{

            var vectorTingCard:Array<number>=new Array<number>();


            var vSrc:Array<number> = new Array<number>();
            //vSrc.RemoveAll(delegate(byte checkCard) { return checkCard == MahjongDef.gInvalidMahjongValue; });

            for(var i:number=0;i<srcAry.length;i++)
            {
                if(BBMJMahjongDef.gInvalidMahjongValue!=srcAry[i])
                    vSrc.push(srcAry[i]);
            }
            if(1 != (vSrc.length % 3)) {
                return false;
            }
            this.sortCardAry(vSrc);


            var flowerAry:Array<number>=BBMJMahjongAlgorithm1.GetFlowerCardAryBBMJ();//安庆麻将中有花牌不能胡,13不靠除外


             if(!this.CheckIfTing13BuKao(vSrc)){//不听13不靠，就不能有花牌
                for(var i=0;i<flowerAry.length;i++){
                    if(BBMJMahjongAlgorithm1.IsContainsNumber(vSrc,flowerAry[i])){
                        return false;
                    }
                }
            }





            //扑克复制
            var vTingSpecial:Array<number> = new Array<number>();
            var vTingNormal = new Array<number>();
            //bool bTing = false;

            //1、判断是否特殊听牌
            if (this.CheckIfCanSpecialTing(vSrc))
            {
                //获取特殊听牌
                vTingSpecial.splice(0,vTingSpecial.length);
                //获取特殊所听之牌
                this.GetSpecialTingCard(vSrc, vTingSpecial);
            }

            //2、判断是否普通听牌
            if (BBMJMahjongAlgorithm1.CheckIfCanNormalTing(vSrc))
            {
                //获取普通听牌
                vTingNormal.splice(0,vTingNormal.length);
                //获取普通所听之牌
                vTingNormal=BBMJMahjongAlgorithm1.GetNormalTingCard(vSrc);
            }

            if(null == vectorTingCard) {
                return false;
            }
            if((vTingSpecial.length == 0) && (vTingNormal.length == 0)) {
                return false;
            }

            //合并两个听牌集并剔除重复
            //合并两个听牌集
            BBMJMahjongAlgorithm1.MergeVector(vTingNormal,vTingSpecial);
            //去除重复项
            BBMJMahjongAlgorithm1.RemoveRepeat(vTingNormal);
            for(var i = 0;i < vTingNormal.length;i++)
                vectorTingCard.push(vTingNormal[i]);
            return vectorTingCard.length > 0;
        }


        /**
         * 特特殊听牌：七对……
         */
        private static CheckIfCanSpecialTing(vSrc: Array<number>): boolean {
            //听七对
            if(BBMJMahjongAlgorithm1.CheckIfTingSevenPair(vSrc)) {
                return true;
            }
            //十三烂
            if(this.CheckIfTing13BuKao(vSrc)){

                return true;
            }
            return false;
        }

       /**
        * 获取特殊听牌集合
        */
        private static GetSpecialTingCard(vSrc:Array<number>,vectorTingCard:Array<number>):void
        {
            //1、七对子
            vectorTingCard.splice(0,vectorTingCard.length);

            if(this.CheckIfTingSevenPair(vSrc))
            {
                var sevenPairTingCard:Array<number> = new Array<number>();

                this.GetSevenPairTingCard(vSrc, sevenPairTingCard);

                //vectorTingCard.AddRange(sevenPairTingCard);//这行代码翻译成下面

                if(sevenPairTingCard.length>0){
                    for(var i=0;i<sevenPairTingCard.length;i++){
                        vectorTingCard.push(sevenPairTingCard[i]);
                    }
                }
            }
            if(this.CheckIfTing13BuKao(vSrc)){
                var tingAry:Array<number>=new Array<number>();
                BBMJMahjongAlgorithm1.Get13BuKaoTingCard(vSrc,tingAry);
                for(var i=0;i<tingAry.length;i++){
                    vectorTingCard.push(tingAry[i]);
                }
            }
        }


        /// <summary>
        /// 获取13不靠的听牌
        /// </summary>
        /// <param name="vectorTingCard"></param>
        public static Get13BuKaoTingCard(vSrc:Array<number>, vectorTingCard:Array<number>):void
        {
            if (vSrc == null || vSrc.length != 13)
            {
                return;
            }


            var count:number = vSrc.length;

            var TingWanCard:Array<number> = new Array<number>();
            var TingTongCard:Array<number> = new Array<number>();
            var TingTiaoCard:Array<number> = new Array<number>();
            var TingZiCard:Array<number> = new Array<number>();
            TingWanCard=BBMJMahjongAlgorithm1Lhh.Get029Wan();
            TingTongCard=BBMJMahjongAlgorithm1Lhh.Get029Tong();
            TingTiaoCard=BBMJMahjongAlgorithm1Lhh.Get029Tiao();
            TingZiCard=BBMJMahjongAlgorithm1Lhh.Get027Zi();


            for (var i = 0; i < count; i++)
            {
                if (this.GetMahjongColor(vSrc[i]) == 3)//对字牌的判断
                {
                    BBMJMahjongAlgorithm1Lhh.RemoveOneMember(TingZiCard,vSrc[i]);
                    continue;
                }
                else if (this.GetMahjongColor(vSrc[i]) == 0)
                {
                    BBMJMahjongAlgorithm1Lhh.RemoveMember(TingWanCard, vSrc[i]);
                }
                else if (this.GetMahjongColor(vSrc[i]) == 1)
                {
                    BBMJMahjongAlgorithm1Lhh.RemoveMember(TingTongCard, vSrc[i]);
                }
                else if (this.GetMahjongColor(vSrc[i]) == 2)
                {
                    BBMJMahjongAlgorithm1Lhh.RemoveMember(TingTiaoCard, vSrc[i]);
                }
            }
            for(var i=0;i<TingWanCard.length;i++){
                vectorTingCard.push(TingWanCard[i]);
            }
            for(var i=0;i<TingTongCard.length;i++){
                vectorTingCard.push(TingTongCard[i]);
            }
            for(var i=0;i<TingTiaoCard.length;i++){
                vectorTingCard.push(TingTiaoCard[i]);
            }
            for(var i=0;i<TingZiCard.length;i++){
                vectorTingCard.push(TingZiCard[i]);
            }
        }


        public static CheckIfTing13BuKao(vSrc:Array<number>):boolean
        {
            var ifting13bukao:boolean = false;
            if(vSrc==null|| vSrc.length!=13)
            {
                return ifting13bukao;
            }
            this.sortCardAry(vSrc);

            var count:number = vSrc.length;

            ifting13bukao = true;

            for (var i=0;i< count; i++)
            {
                if(this.GetMahjongColor(vSrc[i])>=3)
                {
                    if(i < count - 1)
                    {
                        if(this.GetMahjongLogicValue(vSrc[i + 1]) == this.GetMahjongLogicValue(vSrc[i]))
                        {
                            ifting13bukao = false;
                            break;
                        }
                    }

                    continue;
                }
                if(i< count-1)
                {
                    if(this.GetMahjongColor(vSrc[i])!=this.GetMahjongColor(vSrc[i+1]))
                    {
                        continue;
                    }
                    if(this.GetMahjongLogicValue(vSrc[i+1])- this.GetMahjongLogicValue(vSrc[i])<3)
                    {
                        ifting13bukao = false;
                        break;
                    }
                }
            }
            return ifting13bukao;
        }

        //获取特殊所听牌之牌
        // private static GetSpecialTingCard(vSrc: Array<number>): Array<number> {
        //     //1、七对子
        //     var vResult: Array<number> = new Array<number>();
        //     vResult.splice(0,vResult.length);

        //     if(BBMJMahjongAlgorithm1.CheckIfTingSevenPair(vSrc)) {
        //         //获取七对子所听之牌

        //         //七对子
        //         for(var i = 0;i < vSrc.length - 1;i++) {
        //             if(vSrc[i] == vSrc[i + 1]) {
        //                 i += 1;
        //                 continue;
        //             }
        //             else {
        //                 vResult.push(vSrc[i]);
        //                 return vResult;
        //             }
        //         }
        //         if(vResult.length == 0) {
        //             vResult.push(vSrc[vSrc.length - 1]);
        //         }
        //         return vResult;
        //     }

        //     //2、十三烂
        //     if (this.CheckIfTingShiSanLan(vSrc))
        //     {

        //         //十三烂必须是门清
        //         if (13 != vSrc.length)
        //         {
        //             return;
        //         }
        //         // //万集合
        //         // var allWan:Array<number> = new Array<number>(9)
        //         // {
        //         //     0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09
        //         // };
        //         // //筒集合
        //         // var allTong:Array<number> = new Array<number>(9)
        //         // {
        //         //     0x11,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19
        //         // };
        //         // //条集合
        //         // var allTiao:Array<number> = new Array<number>(9)
        //         // {
        //         //     0x21,0x22,0x23,0x24,0x25,0x26,0x27,0x28,0x29
        //         // };
        //         // //字集合
        //         // var allZhi:Array<number> = Array<number>(7)
        //         // {
        //         //     0x31,0x32,0x33,0x34,0x35,0x36,0x37
        //         // };
        //         var all_wan:allWan = new allWan();
        //         var all_tong:allTong = new allTong();
        //         var all_tiao:allTiao = new allTiao();
        //         var all_zhi:allZhi = new allZhi();

        //         var handCard:Array<number> = new Array<number>();
        //         for(let i:number=0; i<vSrc.length; i++){
        //             handCard.push(vSrc[i]);
        //         }

        //         //1、先将玩家的牌分开
        //         var vWanCard:Array<number> = new Array<number>();
        //         var vTongCard:Array<number> = new Array<number>();
        //         var vTiaoCard:Array<number> = new Array<number>();
        //         var vZhiCard:Array<number> = new Array<number>();

        //         BBMJMahjongAlgorithm1.spiltHandCard(handCard,vWanCard,vTongCard,vTiaoCard,vZhiCard);

        //         //添加听字的牌
        //         if (vZhiCard.length < 7)
        //         {
        //             var isSame:boolean;
        //             for (var i:number = 0; i < 7; i++)
        //             {
        //                 isSame = false;
        //                 for(var j:number=0; j<vZhiCard.length; j++){
        //                     if (BBMJMahjongAlgorithm1.GetMahjongValue(vZhiCard[j]) == BBMJMahjongAlgorithm1.GetMahjongValue(all_zhi.zhi[i]))
        //                     {
        //                         isSame = true;
        //                         break;
        //                     }
        //                 }
        //                 if(!isSame){
        //                     vResult.push(all_zhi.zhi[i]);
        //                 }
        //             }
        //         }

        //         //添加听万的牌
        //         if (vWanCard.length < 3)
        //         {
        //             switch (vWanCard.length)
        //             {
        //                 case 0:
        //                     for (var i:number = 0; i < 9; i++)
        //                     {
        //                         vResult.push(all_wan.wan[i]);
        //                     }
        //                     break;

        //                 case 1:
        //                     for (var i:number = 0; i < 9; i++)
        //                     {
        //                         if (Math.abs(BBMJMahjongAlgorithm1.GetMahjongValue(all_wan.wan[i]) - BBMJMahjongAlgorithm1.GetMahjongValue(vWanCard[0])) >= 3)
        //                         {
        //                             vResult.push(all_wan.wan[i]);
        //                         }
        //                     }
        //                     break;

        //                 case 2:
        //                     for (var i:number = 0; i < 9; i++)
        //                     {
        //                         if (Math.abs(BBMJMahjongAlgorithm1.GetMahjongValue(all_wan.wan[i]) - BBMJMahjongAlgorithm1.GetMahjongValue(vWanCard[0])) >= 3 && Math.abs(BBMJMahjongAlgorithm1.GetMahjongValue(all_wan.wan[i]) - BBMJMahjongAlgorithm1.GetMahjongValue(vWanCard[1])) >= 3)
        //                         {
        //                             vResult.push(all_wan.wan[i]);
        //                         }
        //                     }
        //                     break;
        //             }
        //         }

        //         //添加听筒的牌
        //         if (vTongCard.length < 3)
        //         {
        //             switch (vTongCard.length)
        //             {
        //                 case 0:
        //                     for (var i:number = 0; i < 9; i++)
        //                     {
        //                         vResult.push(all_tong.tong[i]);
        //                     }
        //                     break;

        //                 case 1:
        //                     for (var i:number = 0; i < 9; i++)
        //                     {
        //                         if (Math.abs(BBMJMahjongAlgorithm1.GetMahjongValue(all_tong.tong[i]) - BBMJMahjongAlgorithm1.GetMahjongValue(vTongCard[0])) >= 3)
        //                         {
        //                             vResult.push(all_tong.tong[i]);
        //                         }
        //                     }
        //                     break;

        //                 case 2:
        //                     for (var i:number = 0; i < 9; i++)
        //                     {
        //                         if (Math.abs(BBMJMahjongAlgorithm1.GetMahjongValue(all_tong.tong[i]) - BBMJMahjongAlgorithm1.GetMahjongValue(vTongCard[0])) >= 3 && Math.abs(BBMJMahjongAlgorithm1.GetMahjongValue(all_tong.tong[i]) - BBMJMahjongAlgorithm1.GetMahjongValue(vTongCard[1])) >= 3)
        //                         {
        //                             vResult.push(all_tong.tong[i]);
        //                         }
        //                     }
        //                     break;
        //             }
        //         }

        //         //添加听条的牌
        //         if (vTiaoCard.length < 3)
        //         {
        //             switch (vTiaoCard.length)
        //             {
        //                 case 0:
        //                     for (var i:number = 0; i < 9; i++)
        //                     {
        //                         vResult.push(all_tiao.tiao[i]);
        //                     }
        //                     break;

        //                 case 1:
        //                     for (var i:number = 0; i < 9; i++)
        //                     {
        //                         if (Math.abs(BBMJMahjongAlgorithm1.GetMahjongValue(all_tiao.tiao[i]) - BBMJMahjongAlgorithm1.GetMahjongValue(vTiaoCard[0])) >= 3)
        //                         {
        //                             vResult.push(all_tiao.tiao[i]);
        //                         }
        //                     }
        //                     break;

        //                 case 2:
        //                     for (var i:number = 0; i < 9; i++)
        //                     {
        //                         if (Math.abs(BBMJMahjongAlgorithm1.GetMahjongValue(all_tiao.tiao[i]) - BBMJMahjongAlgorithm1.GetMahjongValue(vTiaoCard[0])) >= 3 && Math.abs(BBMJMahjongAlgorithm1.GetMahjongValue(all_tiao.tiao[i]) - BBMJMahjongAlgorithm1.GetMahjongValue(vTiaoCard[1])) >= 3)
        //                         {
        //                             vResult.push(all_tiao.tiao[i]);
        //                         }
        //                     }
        //                     break;
        //             }
        //         }
        //         return vResult;
        //     }
        // }



        /// <summary>
        /// 将牌解析成3模式(所有颜色)
        /// </summary>
        /// <param name="vSingleCard"></param>
        /// <param name="vTriple"></param>
        public static Parse3ModelToTripleListAllColor(vSingleCard:Array<number>, vTriple:Array<clsParseTriple>):void
        {
            vTriple.splice(0,vTriple.length);

            //1、如果不是3模式或没有牌
            if (((vSingleCard.length % 3) != 0) || (vSingleCard.length == 0))
            {
                return;
            }

            //2、进行一次排序
            this.sortCardAry(vSingleCard);


            //1、按花色分拣牌
            var vectorWan:Array<number> = new Array<number>();
            var vectorTong:Array<number> = new Array<number>();
            var vectorTiao:Array<number> = new Array<number>();
            var vectorZhi:Array<number> = new Array<number>();
            this.SpiltHandCardByCardColor(vSingleCard, vectorWan, vectorTong, vectorTiao, vectorZhi);

            var tripleWan:Array<clsParseTriple> = new Array<clsParseTriple>();
            var tripleTong:Array<clsParseTriple> = new Array<clsParseTriple>();
            var tripleTiao:Array<clsParseTriple> = new Array<clsParseTriple>();
            var tripleZi:Array<clsParseTriple> = new Array<clsParseTriple>();

            this.Parse3ModelToTripleList(vectorWan, tripleWan);
            this.Parse3ModelToTripleList(vectorTong, tripleTong);
            this.Parse3ModelToTripleList(vectorTiao, tripleTiao);
            this.Parse3ModelToTripleList(vectorZhi, tripleZi);

            for(var i=0;i< tripleWan.length;i++)
            {
                vTriple.push(tripleWan[i]);
            }

            for (var i = 0; i < tripleTong.length; i++)
            {
                vTriple.push(tripleTong[i]);
            }

            for (var i = 0; i < tripleTiao.length; i++)
            {
                vTriple.push(tripleTiao[i]);
            }

            for (var i = 0; i < tripleZi.length; i++)
            {
                vTriple.push(tripleZi[i]);
            }
        }






        /// <summary>
        /// 检查特殊听牌牌型：七对子，二色二顺
        /// </summary>
        /// <param name="vSrc"></param>
        /// <returns></returns>
        public static CheckIfTingSevenPair(vSrc:Array<number>):boolean
        {
            //1、七对子必须门清，即13张牌
            if (vSrc.length != 13)
            {
                return false;
            }
            //七对子
            var wPairCount:number = 0;

            this.sortCardAry(vSrc);

            var cHashCard:number = 0;

            for (var i = 0; i < vSrc.length - 1; i++)
            {
                if (vSrc[i] == vSrc[i + 1])
                {
                    i += 1;
                    wPairCount++;
                    continue;
                }
                else
                {
                    cHashCard = vSrc[i];
                }
            }

            return wPairCount == 6;
        }
        /// <summary>
        /// 获取7对听牌列表
        /// </summary>
        /// <param name="vSrc"></param>
        /// <param name="vectorTingCard"></param>
        public static GetSevenPairTingCard(vSrc:Array<number>, vectorTingCard:Array<number>):void
        {
            if (vSrc == null || vSrc.length != 13)
            {
                return;
            }

            //七对子
            for (var i = 0; i < vSrc.length - 1; i++)
            {
                if (vSrc[i] == vSrc[i + 1])
                {
                    i += 1;
                    continue;
                }
                else
                {
                    vectorTingCard.push(vSrc[i]);
                    return;
                }
            }
            if (vectorTingCard.length == 0)
            {
                vectorTingCard.push(vSrc[vSrc.length - 1]);
            }
        }


        //针对花牌，以各种情况移除一个组（刻或者顺）后得到的所有可能的序列
        private static GetFigureCardListByRemoveTriple(vectorSourceCard:Array<number>,vectorReturn:Array<Array<number>>):void{
            //初始化一下

            vectorReturn.splice(0,vectorReturn.length);

            if (vectorSourceCard.length < 3)
            {
                return;
            }

            var vectorCur:Array<number> = new Array<number>();
            vectorCur.splice(0,vectorReturn.length);
            for (var i = 0; i < vectorSourceCard.length- 2; i++)
            {
                //搜刻
                if (((vectorSourceCard[i] == vectorSourceCard[i + 1]) && (vectorSourceCard[i] == vectorSourceCard[i + 2])))//找到一个刻
                {
                    //除了这个刻的牌，其他牌全部加入到序列集里
                    var vectorFind:Array<number> = new Array<number>();
                    vectorFind.splice(0,vectorReturn.length);
                    for (var j = 0; j < vectorSourceCard.length; j++)
                    {
                        if ((j < i) || (j > (i + 2)))
                        {
                            vectorFind.push(vectorSourceCard[j]);
                        }
                    }
                    if (!this.IsSame(vectorCur, vectorFind))
                    {
                        vectorCur = vectorFind;
                        vectorReturn.push(vectorCur);
                    }
                }

                //搜顺
                var next1Idx = 0;//顺的第二个索引
                var next2Idx = 0;//顺的第三个索引
                for (var k = i + 1; k < vectorSourceCard.length; k++)//(k从i的当前位置+1向后移)
                {
                    if (((BBMJMahjongAlgorithm1.GetMahjongLogicValue(vectorSourceCard[k]) - BBMJMahjongAlgorithm1.GetMahjongLogicValue(vectorSourceCard[i])) == 1) && (next1Idx == 0))//找到第一个(例:从233456678中根据3找到4)
                        next1Idx = k;
                    if (((BBMJMahjongAlgorithm1.GetMahjongLogicValue(vectorSourceCard[k]) - BBMJMahjongAlgorithm1.GetMahjongLogicValue(vectorSourceCard[i])) == 2) && (next2Idx == 0))//找到第一个(例:从233456678中根据3找到4)
                        next2Idx = k;
                    if ((next1Idx != 0) && (next2Idx != 0))
                        break;
                }
                if ((next1Idx != 0) && (next2Idx != 0))///找到顺了
                {
                    //注意字牌不存在顺
                    var remFlashList:Array<number> = new Array<number>();
                    for (var j = 0; j < vectorSourceCard.length; j++)//(例:2333577789,)
                    {
                        if ((j != i) && (j != next1Idx) && (j != next2Idx))
                        {
                            remFlashList.push(vectorSourceCard[j]);
                        }
                    }
                    ///将得到的列集加入可能的序列集
                    if (!(this.IsSame(vectorCur, remFlashList)))
                    {
                        vectorCur = remFlashList;
                        vectorReturn.push(remFlashList);
                    }
                }
            }
        }
        //针对字牌，以各种情况移除一个组后得到的所有可能的序列
        public static GetCharCardsListsByRemoveTriple(vectorSourceCard:Array<number>,vectorReturn:Array<Array<number>>):void{
            vectorReturn.splice(0,vectorReturn.length);

            if (vectorSourceCard.length < 3)
            {
                return;
            }

            var vectorCur:Array<number> = new Array<number>();
            vectorCur.splice(0,vectorReturn.length);

            for (var i = 0; i < vectorSourceCard.length - 2; i++)
            {
                //搜刻
                if (((vectorSourceCard[i] == vectorSourceCard[i + 1]) && (vectorSourceCard[i] == vectorSourceCard[i + 2])))//找到一个刻
                {
                    //除了这个刻的牌，其他牌全部加入到序列集里
                    var vectorFind:Array<number> = new Array<number>();
                    vectorFind.splice(0,vectorFind.length);
                    for (var j = 0; j < vectorSourceCard.length; j++)
                    {
                        if ((j < i) || (j > (i + 2)))
                        {
                            vectorFind.push(vectorSourceCard[j]);
                        }
                    }
                    if (!this.IsSame(vectorCur, vectorFind))
                    {
                        vectorCur = vectorFind;
                        vectorReturn.push(vectorCur);
                    }
                }
            }
        }
         //判断两个集合是否一样,注：集合元素是number类型
        public static IsSame(array1:Array<number>, array2:Array<number>):boolean{
            if (array1.length != array2.length)
            {
                return false;
            }
            for (var i = 0; i < array1.length; i++)
            {
                if (array1[i] != array2[i])
                {
                    return false;
                }
            }
            return true;
        }
        //判断集合中是否包含某项，注：集合元素是enTinType类型
        public static IsContainsTinType(array:Array<enTinType>,obj:enTinType):boolean{
            for (var i = 0; i < array.length; i++)
            {
                if (array[i] == obj)
                {
                    return true;
                }
            }
            return false;
        }
        //判断集合中是否包含某项，注：集合元素是enTinType类型
        public static IsContainsNumber(array:Array<number>,obj:number):boolean{
            if(array==null){
                return false;
            }
            for (var i = 0; i < array.length; i++)
            {
                if (array[i] == obj)
                {
                    return true;
                }
            }
            return false;
        }



        //合并后剔除重复,所有数据保存在vectorCard1中
        private static MergeVector(vectorCard1:Array<number>,vectorCard2:Array<number>):Array<number>{
            if (vectorCard2.length == 0)
                return vectorCard1;

            for (var i = 0; i < vectorCard2.length; i++)
            {
                var count = 0;
                for (var j = 0; j < vectorCard1.length; j++)
                {
                    if (vectorCard1[j] == vectorCard2[i])
                        count++;
                }
                if (count == 0)
                    vectorCard1.push(vectorCard2[i]);
            }
            this.sortCardAry(vectorCard1)
            this.RemoveRepeat(vectorCard1);
            return vectorCard1;
        }
        //将一个牌阵中重复的删除只保留一个
        private static RemoveRepeat(vSource:Array<number>):void{
            //如果长度小于2，直接返回
            if (vSource.length < 2)
            {
                return;
            }
            var vReturn:Array<number> = new Array<number>();
            vReturn.splice(0,vReturn.length);

            var wFindCount = 0;
            for (var i = 0; i < vSource.length; i++)
            {
                wFindCount = 0;
                if (vReturn.length == 0)
                {
                    vReturn.push(vSource[i]);
                }
                else
                {
                    for (var j = 0; j < vReturn.length; j++)
                    {
                        if (vReturn[j] == vSource[i])
                        {
                            ++wFindCount;
                            break;
                        }
                    }
                    if (0 == wFindCount)
                    {
                        vReturn.push(vSource[i]);
                    }
                }
            }
            vSource.splice(0,vSource.length);
            for(var i=0;i<vReturn.length;i++)
            {
                vSource.push(vReturn[i]);
            }
        }
        //得到手牌中的赖子数
        public static getLaiZiNum(vSrc:Array<number>):number{
            var laiziNum = 0;
            //找赖子
            for (var i = 0; i < vSrc.length; i++)
            {
                // if (vSrc[i] == BBMJ.ins.iclass.getHunCard())
                //     laiziNum++;
            }
            return laiziNum;
        }

        /// <summary>
        /// 单一花色牌组补成成组模式所需赖子数
        /// </summary>
        /// <param name="vectorCard">牌组</param>
        /// <param name="needCard">替代牌</param>
        /// <returns></returns>
        public static ChangeArrayToTripleForHuapai(vectorCard:Array<number>):number{
            var needCard = 0;
            //无牌
            if (vectorCard.length == 0)
                return needCard;
            //有牌
            var vectorGet:Array<Array<number>> = new Array<Array<number>>();
            var needs:Array<number>=new Array<number>();
            //针对花牌，以各种情况移除一个组（刻或者顺）后得到的所有可能的序列
            this.GetFigureCardListByRemoveTriple(vectorCard,vectorGet);
            //牌组被改动，挑选最优项
            if (vectorGet.length > 0)
            {
                needs.splice(0,needs.length);
                for (var i = 0; i < vectorGet.length; i++)
                {
                    needs.push(this.ChangeArrayToTripleForHuapai(vectorGet[i]));
                }
                var temp = 0;
                for (var i = 0; i < needs.length; i++)
                {
                    if (needs[temp] > needs[i])
                        temp = i;
                }
                //挑选出最少赖子数
                return needs[temp];
            }
            //最后留一刻或顺,去刻顺不知道为什么留
            if (vectorCard.length == 3)
            {
                if((vectorCard[0]==vectorCard[1]&&vectorCard[1]==vectorCard[2])|| (vectorCard[2]- vectorCard[1]==1&& vectorCard[1]- vectorCard[0]==1))
                    return needCard;
            }
            //到此为止：刻顺全去，剩孤张，对
            this.sortCardAry(vectorCard);
            for (var i = 0; i < vectorCard.length; i++)
            {
                //不是最后一张
                if (i != vectorCard.length - 1 && this.GetMahjongLogicValue(vectorCard[i + 1]) - this.GetMahjongLogicValue(vectorCard[i]) < 3)
                {
                        needCard++;
                        i++;
                }
                //最后一张 或 不连张
                else
                {
                    needCard += 2;
                }
            }
            return needCard;
        }

        /// <summary>
        /// 字牌组补成成组模式所需赖子数
        /// </summary>
        /// <param name="vectorCard">牌组</param>
        /// <returns></returns>
        public static ChangeArrayToTripleForZipai(vectorCard:Array<number>):number
        {
            var needCard:number = 0;
            //无牌
            if (vectorCard.length == 0)
                return needCard;
            //有牌
            var vectorGet:Array<Array<number>> = new Array<Array<number>>();
            var needs:Array<number> = new Array<number>();
            //针对花牌，以各种情况移除一个组（刻或者顺）后得到的所有可能的序列
            this.GetCharCardsListsByRemoveTriple(vectorCard, vectorGet);
            //牌组被改动，挑选最优项
            if (vectorGet.length > 0)
            {
                needs.splice(0,needs.length);
                for (var i = 0; i < vectorGet.length; i++)
                {
                    needs.push(this.ChangeArrayToTripleForZipai(vectorGet[i]));
                }
                var temp = 0;
                for (var i = 0; i < needs.length; i++)
                {
                    if (needs[temp] > needs[i])
                        temp = i;
                }
                //挑选出最少赖子数
                return needs[temp];
            }
            //最后留一刻或顺,去刻顺不知道为什么留vectorCard
            if (vectorCard.length == 3)
            {
                if (vectorCard[0] == vectorCard[1] && vectorCard[1] == vectorCard[2])
                    return needCard;
            }

            //到此为止：刻顺全去，剩孤张，对
            //到此为止：刻顺全去，剩孤张，对
            this.sortCardAry(vectorCard);
            //此时将东南西北，和中发白分出来

            var vectorDNXB:Array<number> = new Array<number>(); //东南西北列表
            var vectorZFB:Array<number> = new Array<number>();//中发白列表

            var needCardDNXB:number = 0;//东南西北需要混牌数量

            var needCardZFB:number = 0;//中發白需要混牌数量

            for(var i=0;i< vectorCard.length;i++)
            {
                if(vectorCard[i]!=0x35&& vectorCard[i]!=0x36&& vectorCard[i]!=0x37)
                {
                    vectorDNXB.push(vectorCard[i]);
                    continue;
                }
                vectorZFB.push(vectorCard[i]);
            }
            this.sortCardAry(vectorDNXB);
            this.sortCardAry(vectorZFB);

            for (var i = 0; i < vectorDNXB.length; i++)//组成3个一样的
            {
                //不是最后一张，字牌要相同
                if (i != vectorDNXB.length - 1 && this.GetMahjongLogicValue(vectorDNXB[i + 1]) == this.GetMahjongLogicValue(vectorDNXB[i]))
                {
                    needCardDNXB++;
                    i++;
                }

                //最后一张 或 不连张
                else
                {
                    needCardDNXB += 2;
                }
            }

            for (var i = 0; i < vectorZFB.length; i++)//组成3个一样的
            {
                //不是最后一张，字牌要相同
                if (i != vectorZFB.length - 1 && this.GetMahjongLogicValue(vectorZFB[i + 1]) == this.GetMahjongLogicValue(vectorZFB[i]))
                {
                    needCardZFB++;
                    i++;
                }

                //最后一张 或 不连张
                else
                {
                    needCardZFB += 2;
                }
            }

            var needCard2:number = 0;
            var isreal0:boolean = false;
            for (var i = 0; i < vectorZFB.length; i++)//组成箭
            {
                if (i != vectorZFB.length - 1 && (vectorZFB[i] == 53|| vectorZFB[i] == 54|| vectorZFB[i] == 55))
                {
                    isreal0 = true;
                    var zhong:number = -1;
                    var fa:number = -1;
                    var bai:number = -1;

                    for (var j = i; j < vectorZFB.length; j++)
                    {
                        if (zhong == -1 && vectorZFB[j] == 53)
                        {
                            zhong = j;
                        }
                        if (fa == -1 && vectorZFB[j] == 54)
                        {
                            fa = j;
                        }
                        if (bai == -1 && vectorZFB[j] == 55)
                        {
                            bai = j;
                        }
                    }

                    if (zhong != -1)
                    {
                        i++;
                    }
                    if(zhong==-1)
                    {
                        needCard2++;
                    }
                    if (fa != -1)
                    {
                        i++;
                    }
                    if (fa == -1)
                    {
                        needCard2++;
                    }
                    if (bai != -1)
                    {
                        i++;
                    }
                    if (bai == -1)
                    {
                        needCard2++;
                    }
                }
            }
            if(isreal0)
            {
                needCardZFB = (needCardZFB <= needCard2) ? needCardZFB : needCard2;
            }
            else
            {
                if(needCard2!=0)
                {
                    needCardZFB = (needCardZFB <= needCard2) ? needCardZFB : needCard2;
                }
            }

            needCard = needCardDNXB + needCardZFB;

            return needCard;
        }



        /// <summary>
        /// 单一花色牌组补成胡牌模式（一对加N组）
        /// </summary>
        /// <param name="vectorCard">牌组</param>
        /// <param name="laiziNum">可用赖子数</param>
        /// <returns></returns>
        public static ChangeArrayToPairAndTripleForHuapai(vectorCard:Array<number>,laiziNum:number):boolean{
            var needCard = 0;
            var allCards:Array<number> = new Array<number>();
            for(var i=0;i<vectorCard.length;i++)
            {
                if(BBMJMahjongDef.gInvalidMahjongValue!=vectorCard[i])
                    allCards.push(vectorCard[i]);
            }
            this.sortCardAry(allCards);
            //无牌，要两张赖子
            if (allCards.length == 0)
            {
                needCard += 2;
                return needCard<=laiziNum;
            }
            var needBu:Array<number> = new Array<number>();
            var needs:Array<number> = new Array<number>();
            //先选出一对，再对剩下的牌做补组
            for (var i = 0; i < allCards.length; i++)
            {
                //非最后一张,且是对
                if (i < allCards.length - 1 && allCards[i] == allCards[i + 1])
                {
                    needBu.splice(0,needBu.length);
                    for (var j = 0; j < allCards.length; j++)
                    {
                        if (!(j == i || j == i + 1))
                            needBu.push(allCards[j]);
                    }
                    needs.push(this.ChangeArrayToTripleForHuapai(needBu));
                }
                else//孤张
                {
                    needBu.splice(0,needBu.length);
                    for (var j = 0; j < allCards.length; j++)
                    {
                        if (j != i)
                            needBu.push(allCards[j]);
                    }
                    needs.push(this.ChangeArrayToTripleForHuapai(needBu));
                    needs[i]++;
                }
            }
            //只能返回一种可能，若出现多种胡牌可能会出错
            var temp = 0;
            for (var i = 0; i < needs.length; i++)
            {
                if (needs[temp] > needs[i])
                    temp = i;
            }
            return needs[temp]<=laiziNum;
        }




        /// <summary>
        /// 字牌组补成胡牌模式（一对加N组）
        /// </summary>
        /// <param name="vectorCard">牌组</param>
        /// <param name="laiziNum">可用赖子数</param>
        /// <returns></returns>
        public static ChangeArrayToPairAndTripleForZipai(vectorCard:Array<number>,laiziNum:number):boolean
        {
            var needCard = 0;
            var allCards:Array<number> = new Array<number>();

            for(var i=0;i<vectorCard.length;i++)
            {
                if(BBMJMahjongDef.gInvalidMahjongValue!=vectorCard[i])
                    allCards.push(vectorCard[i]);
            }
            this.sortCardAry(allCards);

            //无牌，要两张赖子
            if (allCards.length == 0)
            {
                needCard += 2;
                return needCard <= laiziNum;
            }
            var needBu:Array<number> = new Array<number>();
            var needs:Array<number> = new Array<number>();
            //先选出一对，再对剩下的牌做补组
            for (var i = 0; i < allCards.length; i++)
            {
                //非最后一张，是对
                if (i < allCards.length - 1 && allCards[i] == allCards[i + 1])
                {
                    needBu.splice(0,needBu.length);
                    for (var j = 0; j < allCards.length; j++)
                    {
                        if (!(j == i || j == i + 1))
                            needBu.push(allCards[j]);
                    }
                    needs.push(this.ChangeArrayToTripleForZipai(needBu));
                }
                else//孤张
                {
                    needBu.splice(0,needBu.length);
                    for (var j = 0; j < allCards.length; j++)
                    {
                        if (j != i)
                            needBu.push(allCards[j]);
                    }
                    needs.push(this.ChangeArrayToTripleForZipai(needBu));
                    needs[i]++;
                }
            }
            //只能返回一种可能，若出现多种胡牌可能会出错
            var temp = 0;
            for (var i = 0; i < needs.length; i++)
            {
                if (needs[temp] > needs[i])
                    temp = i;
            }
            return needs[temp]<=laiziNum;
        }








        /// <summary>
        /// 检查一副牌是否胡牌，带赖子
        /// </summary>
        /// <param name="srcAry">一副牌</param>
        /// <param name="laizi">赖子牌</param>
        /// <returns></returns>
        public static CheckIfCanHuCardArrayForNJMJ(srcAry:Array<number>,laizi:number):boolean{
            var vSrc:Array<number> = new Array<number>();
            //手牌基本检查
            for(var i:number=0;i<srcAry.length;i++)
            {
                if(BBMJMahjongDef.gInvalidMahjongValue!=srcAry[i])
                    vSrc.push(srcAry[i]);
            }

            //1、先决条件必须满足:胡牌的牌张数必须满%3==2，否则不可以胡
            if ((vSrc.length % 3) != 2)
            {
                return false;
            }
            //四张赖子(四张赖子胡牌是红中麻将的一个规则)

            if (this.getLaiZiNum(srcAry) == 4)
            {
                return true;
            }

            if (this.IsHuNormalStructNJMJ(vSrc,laizi))
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// 是否胡普通结构
        /// </summary>
        /// <param name="vSrc">一副牌</param>
        /// <param name="laizi">赖子牌</param>
        /// <returns></returns>
        private static IsHuNormalStructHaveHun(vSrc:Array<number>):boolean{
            //1、先决条件，胡牌时手上最少要有2张
            if ((vSrc.length % 3) != 2)
            {
                return false;
            }
            var laiziNum = 0;
            var srcAry:Array<number> = new Array<number>();
            //去赖子
            for (var i = 0; i < vSrc.length; i++)
            {
                // if (vSrc[i] == BBMJ.ins.iclass.getHunCard())
                //     laiziNum++;
                // else
                // {
                //     srcAry.push(vSrc[i]);
                // }
            }

            //为任丘麻将加的
            if(this.ChangeArrayTo7PairsNeedHun(srcAry, laiziNum))
            {
                return true;
            }


            //分情况
            this.sortCardAry(srcAry);
            //1、按花色分拣牌
            var vectorWan:Array<number> = new Array<number>();
            var vectorTong:Array<number> = new Array<number>();
            var vectorTiao:Array<number> = new Array<number>();
            var vectorZi:Array<number> = new Array<number>();
            BBMJMahjongAlgorithm1.spiltHandCard(srcAry, vectorWan, vectorTong, vectorTiao, vectorZi);
            //3、得到各自的成组需赖子数
            var wanneed = this.ChangeArrayToTripleForHuapai(vectorWan);
            var tongneed = this.ChangeArrayToTripleForHuapai(vectorTong);
            var tiaoneed = this.ChangeArrayToTripleForHuapai(vectorTiao);
            var zineed = this.ChangeArrayToTripleForZipai(vectorZi);//红中赖子麻将实际上也没有字牌

            var needNum = wanneed+tongneed + tiaoneed + zineed;

            if (laiziNum>=needNum)
            {
                return true;
            }
            //四种情况，将对分别在万，筒，条，字中
            needNum = tongneed + tiaoneed + zineed;
            //万成对
            if (needNum <= laiziNum)
            {
                if (this.ChangeArrayToPairAndTripleForHuapai(vectorWan, laiziNum - needNum))
                    return true;
            }
            needNum = wanneed + tiaoneed + zineed;
            //筒成对
            if (needNum <= laiziNum)
            {
                if (this.ChangeArrayToPairAndTripleForHuapai(vectorTong, laiziNum - needNum))
                    return true;
            }
            needNum = tongneed + wanneed + zineed;
            //条成对
            if (needNum <= laiziNum)
            {
                if (this.ChangeArrayToPairAndTripleForHuapai(vectorTiao, laiziNum - needNum))
                    return true;
            }
            needNum = tongneed + tiaoneed + wanneed;
            if(needNum<=laiziNum)
            {
                if(this.ChangeArrayToPairAndTripleForZipai(vectorZi,laiziNum-needNum))
                return  true;
            }

            return false;
        }

        /// <summary>
        /// 对一个同花色的3模式牌阵进行解析(必须可以完全解析成3模式，即vSingleCard里面的牌数量必须为3的整数倍)
        /// </summary>
        /// <param name="vSingleCard"></param>
        /// <param name="vTriple"></param>
        private static Parse3ModelToTripleList(vSingleCard:Array<number>,vTriple:Array<clsParseTriple>):void
        {
            vTriple.splice(0,vTriple.length);

            //1、如果不是3模式或没有牌
            if (((vSingleCard.length % 3) != 0) || (vSingleCard.length == 0))
            {
                return;
            }

            //2、进行一次排序
            this.sortCardAry(vSingleCard);

            //3、开始解析
            if (BBMJMahjongAlgorithm1.GetMahjongColor(vSingleCard[0]) != BBMJMahjongDef.gMahjongColor_Zhi)//花牌,万，筒，条
            {
                //3张牌,要么一刻，要么一顺(刻指3张相同的牌)
                if (vSingleCard.length == 3)
                {
                    //为一刻
                    if (vSingleCard[0] == vSingleCard[2])
                    {
                        var tagTriple:clsParseTriple = new clsParseTriple();
                        tagTriple.Clear();
                        tagTriple.enTripleType = enTripleType.TripleType_Echo;
                        tagTriple.cTokenCard = vSingleCard[0];
                        for (var i = 0; i < 3; i++)
                        {
                            tagTriple.cCardAry[i] = vSingleCard[i];
                        }
                        vTriple.push(tagTriple);
                        return;
                    }

                    //为一顺
                    if (((vSingleCard[1] - vSingleCard[0]) == 1) && ((vSingleCard[2] - vSingleCard[1]) == 1))
                    {
                        var tagTriple:clsParseTriple = new clsParseTriple();
                        tagTriple.Clear();
                        tagTriple.enTripleType = enTripleType.TripleType_Flash;
                        tagTriple.cTokenCard = vSingleCard[0];
                        for (var i = 0; i < 3; i++)
                        {
                            tagTriple.cCardAry[i] = vSingleCard[i];
                        }
                        vTriple.push(tagTriple);
                        return;
                    }
                    return;
                }

                //6,9,12张牌
                if ((vSingleCard.length % 3) == 0)
                {
                    for (var i = 0; i < vSingleCard.length - 2; i++)
                    {
                        //搜刻,如果含有刻，这三张必在一起
                        if ((vSingleCard[i] == vSingleCard[i + 1]) && (vSingleCard[i] == vSingleCard[i + 2]))
                        {
                            //本次去除刻后的子串
                            var vRemCard:Array<number> = new Array<number>();
                            for (var j = 0; j < vSingleCard.length; j++)
                            {
                                if (j < i || j > i + 2)
                                {
                                    vRemCard.push(vSingleCard[j]);
                                }
                            }
                            //递归解析本次去刻后的子串
                            var vSubTriple:Array<clsParseTriple> = new Array<clsParseTriple>();
                            this.Parse3ModelToTripleList(vRemCard, vSubTriple);
                            if (vSubTriple.length == 0)
                            {
                                return;
                            }
                            else
                            {
                                for (var j = 0; j < vSubTriple.length; j++)
                                {
                                    vTriple.push(vSubTriple[j]);
                                }
                                //再加上此次拆串所得刻
                                var tagTriple:clsParseTriple = new clsParseTriple();
                                tagTriple.Clear();
                                tagTriple.enTripleType = enTripleType.TripleType_Echo;
                                tagTriple.cTokenCard = vSingleCard[i];
                                for (var j = 0; j < 3; j++)
                                {
                                    tagTriple.cCardAry[j] = vSingleCard[i + j];
                                }
                                vTriple.push(tagTriple);
                                return;
                            }
                        }

                        //搜顺
                        var wNet1Idx:number = 0;//顺的第二个索引
                        var wNet2Idx:number = 0;//顺的第三个索引
                        for (var k = i + 1; k < vSingleCard.length; k++)
                        {
                            if (((vSingleCard[k] - vSingleCard[i]) == 1) && (wNet1Idx == 0))///找到第一个(例:从233456678中根据3找到4)
                            {
                                wNet1Idx = k;
                            }
                            if (((vSingleCard[k] - vSingleCard[i]) == 2) && (wNet2Idx == 0))///找到第一个(例:从233456678中根据3找到4)
                            {
                                wNet2Idx = k;
                            }
                            if ((wNet1Idx != 0) && (wNet2Idx != 0))
                                break;
                        }
                        if ((wNet1Idx != 0) && (wNet2Idx != 0))//找到顺了
                        {
                            //本次去除刻后的子串
                            var vRemCard:Array<number> = new Array<number>();
                            for (var j = 0; j < vSingleCard.length; j++)
                            {
                                if ((j != i) && (j != wNet1Idx) && (j != wNet2Idx))
                                {
                                    vRemCard.push(vSingleCard[j]);
                                }
                            }

                            //先加上本次拆串所得顺
                            var tagTriple:clsParseTriple = new clsParseTriple();
                            tagTriple.Clear();
                            tagTriple.enTripleType = enTripleType.TripleType_Flash;
                            tagTriple.cTokenCard = vSingleCard[i];
                            tagTriple.cCardAry[0] = vSingleCard[i];
                            tagTriple.cCardAry[1] = vSingleCard[wNet1Idx];
                            tagTriple.cCardAry[2] = vSingleCard[wNet2Idx];
                            vTriple.push(tagTriple);

                            //递归解析本次去刻后的子串
                            var vSubTriple:Array<clsParseTriple> = new Array<clsParseTriple>();
                            this.Parse3ModelToTripleList(vRemCard, vSubTriple);
                            if (vTriple.length == 0)
                            {
                                return;
                            }
                            else
                            {
                                for (var j = 0; j < vSubTriple.length; j++)
                                {
                                    vTriple.push(vSubTriple[j]);
                                }
                                return;
                            }
                        }
                    }
                }
            }
            else//字牌，东，南，西，北，中，发，白
            {
                //3张牌，必为一刻，字牌不存在顺
                if (vSingleCard.length == 3)
                {
                    //为一刻
                    if (vSingleCard[0] == vSingleCard[2])
                    {
                        var tagTriple:clsParseTriple = new clsParseTriple();
                        tagTriple.Clear();
                        tagTriple.enTripleType = enTripleType.TripleType_Echo;
                        tagTriple.cTokenCard = vSingleCard[0];
                        for (var i = 0; i < 3; i++)
                        {
                            tagTriple.cCardAry[i] = vSingleCard[i];
                        }
                        vTriple.push(tagTriple);
                    }
                    return;
                }


                //6，9，12张牌
                if ((vSingleCard.length % 3) == 0)
                {
                    for (var i = 0; i < vSingleCard.length - 2; i++)
                    {
                        //搜刻,如果含有刻，这三张必在一起
                        if ((vSingleCard[i] == vSingleCard[i + 1]) && (vSingleCard[i] == vSingleCard[i + 2]))
                        {
                            //本次去除刻后的子串
                            var vRemCard:Array<number> = new Array<number>();
                            for (var j = 0; j < vSingleCard.length; j++)
                            {
                                if (j < i || j > i + 2)
                                {
                                    vRemCard.push(vSingleCard[j]);
                                }
                            }
                            //递归解析本次去刻后的子串
                            var vSubTriple:Array<clsParseTriple> = new Array<clsParseTriple>();
                            this.Parse3ModelToTripleList(vRemCard, vSubTriple);
                            if (vSubTriple.length == 0)
                            {
                                return;
                            }
                            else
                            {
                                for (var j = 0; j < vSubTriple.length; j++)
                                {
                                    vTriple.push(vSubTriple[j]);
                                }
                                //再加上此次拆串所得刻
                                var tagTriple:clsParseTriple = new clsParseTriple();
                                tagTriple.Clear();
                                tagTriple.enTripleType = enTripleType.TripleType_Echo;
                                tagTriple.cTokenCard = vSingleCard[i];
                                for (var j = 0; j < 3; j++)
                                {
                                    tagTriple.cCardAry[j] = vSingleCard[i + j];
                                }
                                vTriple.push(tagTriple);
                                return;
                            }
                        }
                    }
                }
            }
        }



        private static IsHuNormalStructNJMJ(vSrc:Array<number>, laizi:number):boolean
        {
            //1、先决条件，胡牌时手上最少要有2张
            if (vSrc.length < 2)
            {
                return false;
            }
            var laiziNum:number = 0;
            var srcAry:Array<number> = new Array<number>();
            //去赖子
            for (var i = 0; i < vSrc.length; i++)
            {
                if (vSrc[i] == laizi)
                    laiziNum++;
                else
                {
                    srcAry.push(vSrc[i]);
                }
            }
            if (this.CheckIfCanHuCardArray(srcAry))//没有赖子普通的胡牌，如果有赖子(即laiziNum!=0),且此处判断能够胡，那么赖子数必为3的整数倍
            {
                return true;
            }

            /**
             * (为任丘麻将加的)
             */
            if(this.ChangeArrayTo7PairsNeedHun(srcAry, laiziNum))
            {
                return true;
            }



            //2、按花色分拣牌
            var vectorWan:Array<number> = new Array<number>();
            var vectorTong:Array<number> = new Array<number>();
            var vectorTiao:Array<number> = new Array<number>();
            var vectorZi:Array<number> = new Array<number>();
            this.SpiltHandCardByCardColor(srcAry, vectorWan, vectorTong, vectorTiao, vectorZi);
            //3、得到各自的成组需赖子数
            var wanneed:number = this.ChangeArrayToTripleForHuapai(vectorWan);
            var tongneed:number = this.ChangeArrayToTripleForHuapai(vectorTong);
            var tiaoneed:number = this.ChangeArrayToTripleForHuapai(vectorTiao);
            var zineed:number = this.ChangeArrayToTripleForZipai(vectorZi);// ChangeArrayToTripleForZipai(vectorZi);红中赖子麻将实际上也没有字牌

            var needNum:number = wanneed + tongneed + tiaoneed + zineed;

            if (laiziNum >= needNum)//如果laiziNum>needNum,那么(laiziNum-needNum)一定是3的倍数
            {
                return true;
            }
            //四种情况，将对分别在万，筒，条，字中
            needNum = tongneed + tiaoneed + zineed;
            //万成对
            if (needNum <= laiziNum)
            {
                if (this.ChangeArrayToPairAndTripleForHuapai(vectorWan, laiziNum - needNum))
                    return true;
            }
            needNum = wanneed + tiaoneed + zineed;
            //筒成对
            if (needNum <= laiziNum)
            {
                if (this.ChangeArrayToPairAndTripleForHuapai(vectorTong, laiziNum - needNum))
                    return true;
            }
            needNum = tongneed + wanneed + zineed;
            //条成对
            if (needNum <= laiziNum)
            {
                if (this.ChangeArrayToPairAndTripleForHuapai(vectorTiao, laiziNum - needNum))
                    return true;
            }

            needNum = tongneed + tiaoneed + wanneed;
            //字成对
            if (needNum <= laiziNum)
            {
                if (this.ChangeArrayToPairAndTripleForZipai(vectorZi, laiziNum - needNum))
                    return true;
            }

            return false;
        }

        public static SpiltHandCardByCardColor(srcAry:Array<number>, vectorWan:Array<number>, vectorTong:Array<number>, vectorTiao:Array<number>, vectorZhi:Array<number>):void
        {
            var vSrc:Array<number> = new Array<number>();
            for(var i=0;i<srcAry.length;i++){
                vSrc.push(srcAry[i]);
            }

            this.sortCardAry(vSrc);

            vectorWan.splice(0,vectorWan.length);
            vectorTong.splice(0,vectorTong.length);
            vectorTiao.splice(0,vectorTiao.length);
            vectorZhi.splice(0,vectorZhi.length);

            if (vSrc.length < 1)
            {
                return;
            }
            for (var i = 0; i < vSrc.length; i++)
            {
                //取这张牌的花色
                switch (this.GetMahjongColor(vSrc[i]))
                {
                    case BBMJMahjongDef.gMahjongColor_Wan://万
                        {
                            vectorWan.push(vSrc[i]);
                            break;
                        }
                    case BBMJMahjongDef.gMahjongColor_Tong://筒
                        {
                            vectorTong.push(vSrc[i]);
                            break;
                        }
                    case BBMJMahjongDef.gMahjongColor_Tiao://条
                        {
                            vectorTiao.push(vSrc[i]);
                            break;
                        }
                    case BBMJMahjongDef.gMahjongColor_Zhi: //字
                        {
                            vectorZhi.push(vSrc[i]);
                            break;
                        }
                }
            }
        }

        // public static CheckIfCanHuCardArray(srcAry:Array<number>):boolean
        // {
        //     var vSrc:Array<number> = new Array<number>();

        //     for(var i=0;i<srcAry.length;i++){
        //         vSrc.push(srcAry[i]);
        //     }

        //     //1、先决条件必须满足:胡牌的牌张数必须满%3==2，否则不可以胡
        //     if ((vSrc.length % 3) != 2)
        //     {
        //         return false;
        //     }

        //     //2、胡牌分三种情况：
        //     /*
        //         2.1)、国世无双
        //         2.2)、七对子
        //         2.3)、对+刻/顺
        //     */

        //     if (BBMJMahjongAlgorithm1.IsHuSevenPairStruct(vSrc))//胡7对结构
        //     {
        //         return true;
        //     }
        //     if(this.IsHuNormalStruct(vSrc))//没有混牌的普通胡牌结构
        //     {
        //         return true;
        //     }
        //     if (this.IsHuNormalStructHaveHun(vSrc))//胡普通结构(有混)
        //     {
        //         return true;
        //     }
        //     return false;
        // }

        //是否胡普通结构
        private static IsHuNormalStruct(vSrc:Array<number>):boolean
        {
            //1、先决条件，胡牌时手上最少要有2张
            if (vSrc.length < 2)
            {
                return false;
            }
            //2、如果只有2张，则必须为对，否则不胡
            if (vSrc.length == 2)
            {
                return vSrc[0] == vSrc[1];
            }
            //3、对+刻/顺结构
            this.sortCardAry(vSrc);

            //除去对之后剩余的牌
            var vLeftCard:Array<number> = new Array<number>();

            var vWanCard:Array<number> = new Array<number>();
            var vTongCard:Array<number> = new Array<number>();
            var vTiaoCard:Array<number> = new Array<number>();
            var vZhiCard:Array<number> = new Array<number>();

            var v_TripleWan:Array<clsParseTriple> = new Array<clsParseTriple>();
            var v_TripleTong:Array<clsParseTriple> = new Array<clsParseTriple>();
            var v_TripleTiao:Array<clsParseTriple> = new Array<clsParseTriple>();
            var v_TripleZhi:Array<clsParseTriple> = new Array<clsParseTriple>();

            for (var i = 0; i < vSrc.length - 1; i++)
            {
                if (vSrc[i] == vSrc[i + 1])//找到一对
                {
                    vLeftCard.splice(0,vLeftCard.length);

                    vWanCard.splice(0,vWanCard.length);
                    vTongCard.splice(0,vTongCard.length);
                    vTiaoCard.splice(0,vTiaoCard.length);
                    vZhiCard.splice(0,vZhiCard.length);

                    v_TripleWan.splice(0,v_TripleWan.length);
                    v_TripleTong.splice(0,v_TripleTong.length);
                    v_TripleTiao.splice(0,v_TripleTiao.length);
                    v_TripleZhi.splice(0,v_TripleZhi.length);

                    //1、先将对子除去
                    for (var j = 0; j < vSrc.length; j++)
                    {
                        if ((j != i) && (j != (i + 1)))
                        {
                            vLeftCard.push(vSrc[j]);
                        }
                    }

                    //2、分拣牌
                    this.SpiltHandCardByCardColor(vLeftCard, vWanCard, vTongCard, vTiaoCard, vZhiCard);

                    //3、分别进行解析
                    this.Parse3ModelToTripleList(vWanCard, v_TripleWan);
                    this.Parse3ModelToTripleList(vTongCard, v_TripleTong);
                    this.Parse3ModelToTripleList(vTiaoCard, v_TripleTiao);
                    this.Parse3ModelToTripleList(vZhiCard, v_TripleZhi);//这是麻将字牌中没有顺的情况的调用
                    if ((v_TripleWan.length * 3 + v_TripleTong.length * 3 + v_TripleTiao.length * 3 + v_TripleZhi.length * 3 + 2) == vSrc.length)
                    {
                        return true;
                    }
                    i += 1;
                    continue;
                }
            }
            return false;
        }

        public static GetACardWithOutLaiZi(vSrc:Array<number>):number{
            var temp=BBMJMahjongDef.gInvalidMahjongValue;
            // for(var i=0;i<vSrc.length;i++)
            // {
            //     if(vSrc[i]!=BBMJ.ins.iclass.getHunCard())
            //         return vSrc[i];
            // }
            return temp;
        }

        /// <summary>
        /// 是否能组成需要混牌的7对胡
        /// </summary>
        /// <param name="vectorCard"></param>
        /// <returns></returns>
        public static ChangeArrayTo7PairsNeedHun(vectorCard:Array<number>,hunNum:number):boolean{
            var needHun:number = 0;

            if((vectorCard.length+hunNum)!=14)
            {
                return false;
            }
            if(this.GetCardTypeNumFromCardAry(vectorCard)>7)//牌类型数大于7不可能组成7对
            {
                return false;
            }
            if(vectorCard==null)
            {
                return false;
            }
            needHun = this.ChangeArrayToPairsNeedHun(vectorCard);

            return needHun<=hunNum;
        }
        /// <summary>
        /// 组成全对所需混牌(万能牌)数
        /// </summary>
        /// <param name="vectorCard"></param>
        /// <returns></returns>
        public static ChangeArrayToPairsNeedHun(vectorCard:Array<number>):number{
            var needHun:number = 0;
            if(vectorCard==null|| vectorCard.length<1)
            {
                return needHun;
            }

            var cardList:Array<number> = new Array<number>();
            for(var i=0;i<vectorCard.length;i++)
            {
                cardList.push(vectorCard[i]);
            }

            this.sortCardAry(cardList);

            var cardAry:Array<number> = new Array<number>();

            for(var i=0;i< cardList.length;i++)
            {
                if(i!= cardList.length-1&& cardList[i]== cardList[i+1])
                {
                    for(var j=0;j< cardList.length;j++)
                    {
                        if(j!=i&&j!=i+1)
                        {
                            cardAry.push(cardList[j]);
                        }
                    }
                    needHun = this.ChangeArrayToPairsNeedHun(cardAry);
                    return needHun;
                }
            }
            return cardList.length;
        }

        /// <summary>
        /// 获取一副牌阵中牌的种类数
        /// </summary>
        /// <param name="cardAry">需要检测的牌阵</param>
        /// <returns></returns>
        public static GetCardTypeNumFromCardAry(cardAry:Array<number>):number
        {
            var typeNum:number = 0;
            if(cardAry==null|| cardAry.length<1)
            {
                return typeNum;
            }
            var cardAy:Array<number> = new Array<number>();

            for(var i=0;i<cardAry.length;i++)
            {
                cardAy.push(cardAry[i]);
            }

            this.sortCardAry(cardAy);

            var count:number = cardAy.length;
            for (var i=0;i< count;i++)
            {
                if(i==0)
                {
                    typeNum++;
                    continue;
                }
                if(cardAy[i]!= cardAy[i-1])
                {
                    typeNum++;
                }
            }
            return typeNum;
        }

        /// <summary>
        /// 获取正确的椅子号
        /// </summary>
        /// <param name="chair"></param>
        /// <returns></returns>
        public static GetRightChairNum(chair:number):number
        {
            var rightchair:number = chair;

            while(rightchair>3)
            {
                rightchair -= 4;
            }

            while(rightchair<0)
            {
                rightchair += 4;
            }

            return rightchair;
        }



        ///////////////////////////////////////////////////南京麻将加的////////////////////////////////////////////////////////

        /// <summary>
        ///
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public static GetPrintStrFromHuType(type:enHuCardType):string
        {
            var score:string = "";
            switch (type)
            {
                // case enHuCardType.HuCardType_Null:
                //     {
                //         score = "没有胡类型";
                //         break;
                //     }
                // case enHuCardType.HuCardType_PingHu:
                //     {
                //         score = "平胡";
                //         break;
                //     }
                // case enHuCardType.HuCardType_MenQing:
                //     {
                //         score = "门清";
                //         break;
                //     }
                // case enHuCardType.HuCardType_TianHu:
                //     {
                //         score = "天胡";
                //         break;
                //     }
                // case enHuCardType.HuCardType_DiHu:
                //     {
                //         score = "地胡";
                //         break;
                //     }
                // case enHuCardType.HuCardType_7Dui:
                //     {
                //         score = "7对胡";
                //         break;
                //     }
                // case enHuCardType.HuCardType_Shuang7Dui:
                //     {
                //         score = "双7对胡";
                //         break;
                //     }
                // case enHuCardType.HuCardType_QuanQiuDuDiao:
                //     {
                //         score = "全球独钓";
                //         break;
                //     }
                // case enHuCardType.HuCardType_QingYiSe:
                //     {
                //         score = "清一色";
                //         break;
                //     }
                // case enHuCardType.HuCardType_HunYiSe:
                //     {
                //         score = "混一色";
                //         break;
                //     }
                // case enHuCardType.HuCardType_DuiDuiHu:
                //     {
                //         score = "对对胡";
                //         break;
                //     }
                // case enHuCardType.HuCardType_YaJue:
                //     {
                //         score = "压绝";
                //         break;
                //     }
                // case enHuCardType.HuCardType_WuHuaGuo:
                //     {
                //         score = "无花果";
                //         break;
                //     }
                // case enHuCardType.HuCardType_XiaoGangKaiHua:
                //     {
                //         score = "小杠开花";
                //         break;
                //     }
                // case enHuCardType.HuCardType_DaGangKaiHua://这貌似还有*2倍和*3家的说法，此处不严密
                //     {
                //         score = "大杠开花";
                //         break;
                //     }
                // case enHuCardType.HuCardType_QiangGangHu://抢杠胡的分数有待确定
                //     {
                //         score = "抢杠胡";
                //         break;
                //     }
            }
            return score;
        }


















































        /**
         * 获取安庆麻将花牌
         */
        public static GetFlowerCardAryBBMJ():Array<number>{
            var Ary:Array<number>=new Array<number>();
            Ary.push(0x31);
            Ary.push(0x35);
            Ary.push(0x36);
            Ary.push(0x37);
            return Ary;
        }


        /**
         * 获取流水名称
         * @param num
         */
        public static GetFlowStr(num:number):string{
            var str:string="";
            switch(num){
                case 0:{
                    break;
                }
                case 1:{
                    str="自摸";
                    break;
                }
                case 2:{
                    str="平胡";
                    break;
                }
                case 3:{
                    str="杠上花";
                    break;
                }
                case 4:{
                    str="自摸";
                    break;
                }
                case 5:{
                    str="抢杠胡";
                    break;
                }
                case 6:{
                    str="天胡";
                    break;
                }
                case 7:{
                    str="对碰胡";
                    break;
                }
                case 8:{
                    str="7对";
                    break;
                }
                case 9:{
                    str="双7对";
                    break;
                }
                case 10:{
                    str="大吊车";
                    break;
                }
                case 11:{
                    str="卡胡";
                    break;
                }
                case 12:{
                    str="边胡";
                    break;
                }
                case 13:{
                    str="对对胡";
                    break;
                }
                case 14:{
                    str="单调";
                    break;
                }
                case 15:{
                    str="无花果";
                    break;
                }
                case 16:{
                    str="大杠开花";
                    break;
                }
                case 17:{
                    str="小杠开花";
                    break;
                }
                case 18:{
                    str="门清";
                    break;
                }
                case 19:{
                    str="13烂";
                    break;
                }
                case 20:{
                    str="13烂7星归位";
                    break;
                }
                case 21:{
                    str="摸牌天胡";
                    break;
                }
                case 22:{
                    str="门清+对对胡";
                    break;
                }
                case 23:{
                    str="报听";
                    break;
                }
                case 24:{
                    str="庄";
                    break;
                }
                case 25:{
                    str="花";
                    break;
                }
            }
            return str;
        }
        /**
         * 获取番数流水名称
         */
        public static GetFanShuFlowStr(num:number):string{
            var str:string="";
            switch(num){
                case 0:{
                    break;
                }
                case 1:{
                    str="庄:1番";
                    break;
                }
                case 2:{
                    str="杠上花:1番";
                    break;
                }
                case 3:{
                    str="报听:1番";
                    break;
                }
                case 4:{
                    str="天胡:2番";
                    break;
                }
                case 5:{
                    str="出会:1番";
                    break;
                }
            }
            return str;
        }
        /**
         * 获取碰杠流水名称
         * @param num
         */
        public static GetPGFlowStr(num:number):string{
            var str:string="";
            switch(num){
                case 0:{
                    break;
                }
                case 1:{
                    str="胡";
                    break;
                }
                case 2:{
                    str="碰杠";
                    break;
                }
                case 3:{
                    str="碰杠";
                    break;
                }
                case 4:{
                    str="碰杠";
                    break;
                }
                case 5:{
                    str="追风";
                    break;
                }
                case 6:{
                    str="出4张";
                    break;
                }
                case 7:{
                    str="花杠";
                    break;
                }
                case 8:{
                    str="包牌";
                    break;
                }
            }
            return str;
        }





	}







