import { LHZMJMahjongDef, clsParseResult, enMahjongPattern, enTripleType, clsParseTriple, clsPairTripleWrapper, enFixedCardType, clsFixedCard } from "../ConstDef/LHZMJMahjongDef";
import { LHZMJMahjongAlgorithm1 } from "./LHZMJMahjongAlgorithm1";


const { ccclass, property } = cc._decorator;

export class LHZMJMahjongPattern {
    
        /// <summary>
        /// 检查是否是特殊胡牌结构
        /// </summary>
        /// <param name="activeCard"></param>
        /// <param name="parseResult"></param>
        /// <returns></returns>
        private static CheckIsSpecialStruct(activeCard:Array<number>, parseResult:clsParseResult):boolean
        {
            if (activeCard.length != LHZMJMahjongDef.gCardCount_Active)
            {
                return false;
            }

            // //1、检查是否胡十三烂
            // if (this.IsHuShiSanLan(activeCard))
            // {
            //     parseResult.isShiSanLan = true;
            //     return true;
            // }
            
            //2、检查七对子:14张牌是七副对子组成，检查对子数量是否等于7
            var wPairCount = 0;
            for (var i = 0; i < activeCard.length - 1; i++)
            {
                if (activeCard[i] == activeCard[i + 1])
                {
                    ++wPairCount;
                    i += 1;
                    continue;
                }
                else
                {
                    break;
                }
            }

            if (wPairCount != 7)//不满足基本七对子情况
            {
                return false;
            }

            if (wPairCount == (activeCard.length / 2))
            {
                parseResult.is7Pair = true;
                parseResult.cardAryBy7Pair.splice(0,parseResult.cardAryBy7Pair.length);
                for(var i=0;i<activeCard.length;i++)
                {
                    parseResult.cardAryBy7Pair.push(activeCard[i]);
                }
                return true;
            }
            
            //3、都不是，就是非特殊胡牌结构
            return false;
        }

        /// <summary>
        /// 解析牌阵
        /// 一对一副已经胡了牌阵进行解析，例如:将一副牌13,13,15,16,17,22,22,22,24,25,26,34,35,36 解析成：
        /// 对子：13 13 放入vectorPair
        /// Triple集为:15,16,17 | 22,22,22 | 24,25,26 | 34,35,36 放入vectorTriple
        /// </summary>
        /// <param name="pCard"></param>
        /// <param name="wCardCount"></param>
        /// <param name="tagFixedCard"></param>
        /// <param name="tagParseResult"></param>
        /// <param name="cHuCard"></param>
        public static ParseCards(srcActiveCard: Array<number>,srcFixedCard: clsFixedCard,parseResult:clsParseResult):boolean{
            //解析结果清除
            parseResult.Clear();

            //复制一份活动牌
            var activeCard = new Array<number>();
            for(var i=0;i<srcActiveCard.length;i++){
                if(LHZMJMahjongDef.gInvalidMahjongValue != srcActiveCard[i]){
                    console.log("srcActiveCard[i]：" + srcActiveCard[i].toString());
                    activeCard.push(srcActiveCard[i]);
                }
            }

            //复制一份定牌
            var fixedCard = new clsFixedCard();
            srcFixedCard.CopyTo(fixedCard);

            //去除活动牌阵中的无效牌并排序
            //activeCard.RemoveAll(delegate(byte checkCard) { return checkCard == MahjongDef.gInvalidMahjongValue; });
            LHZMJMahjongAlgorithm1.sortCardAry(activeCard);

            //先检查是否可以胡牌
            if(!LHZMJMahjongPattern.CheckIfCanHuCardArray(activeCard))
            {
                return false;
            }

            //先检查是否是特殊胡牌：七对子和国世无双
            if (LHZMJMahjongPattern.CheckIsSpecialStruct(activeCard,parseResult))
            {
                parseResult.isValid=true;
                return true;
            }

            //先把牌进行分拣
            var vWan = new Array<number>();
            var vTong = new Array<number>();
            var vTiao = new Array<number>();
            var vZhi = new Array<number>();
            LHZMJMahjongAlgorithm1.spiltHandCard(activeCard, vWan, vTong, vTiao, vZhi);

            //排序一遍
            LHZMJMahjongAlgorithm1.sortCardAry(vWan);
            LHZMJMahjongAlgorithm1.sortCardAry(vTong);
            LHZMJMahjongAlgorithm1.sortCardAry(vTiao);
            LHZMJMahjongAlgorithm1.sortCardAry(vZhi);


            //4、对每个单色牌进行解析
            var pairTripleWrapper = new clsPairTripleWrapper();
            LHZMJMahjongPattern.ParseSingleColorCard(vWan, pairTripleWrapper);	        //解析万
            LHZMJMahjongPattern.ParseSingleColorCard(vTong, pairTripleWrapper);	        //解析筒
            LHZMJMahjongPattern.ParseSingleColorCard(vTiao, pairTripleWrapper);	        //解析条
            LHZMJMahjongPattern.ParseSingleColorCard(vZhi, pairTripleWrapper);	        //解析字

            //5、加上定牌组，组成最终的解析视图
            parseResult.normalParse.pair = pairTripleWrapper.cPair;
            for(var m=0;m<activeCard.length;m++)
            {
                parseResult.normalParse.activeCard.push(activeCard[m]);
            }
            
            for(var i=0;i<fixedCard.fixedCard().length;i++)
            {
                var tagTriple = new clsParseTriple();
                tagTriple.Clear();
                tagTriple.enTripleType = <number>fixedCard.fixedCard()[i].fixedType;
                tagTriple.cTokenCard = fixedCard.fixedCard()[i].card;
                for(var j=0;j<3;j++)
                {
                    tagTriple.cCardAry.push(tagTriple.cTokenCard);
                }              
                if((enFixedCardType.FixedCardType_AGang == fixedCard.fixedCard()[i].fixedType) ||
                    (enFixedCardType.FixedCardType_BGang == fixedCard.fixedCard()[i].fixedType) ||
                    (enFixedCardType.FixedCardType_MGang == fixedCard.fixedCard()[i].fixedType))
                {
                    tagTriple.cCardAry.push(tagTriple.cTokenCard);
                }
                for(var n=0;n<tagTriple.cCardAry.length;n++)
                {
                    parseResult.normalParse.activeCard.push(tagTriple.cCardAry[n]);
                }
                
                pairTripleWrapper.AddTriple(tagTriple);
            }
            
            for (var k = 0; k < pairTripleWrapper.tagTripleList.length; k++)
            {
                if (pairTripleWrapper.tagTripleList[k].isValid)
                {
                    var item = new clsParseTriple();
                    item.cTokenCard = pairTripleWrapper.tagTripleList[k].cTokenCard;
                    item.enTripleType = pairTripleWrapper.tagTripleList[k].enTripleType;
                    for(var l=0;l<pairTripleWrapper.tagTripleList[k].cCardAry.length;l++)
                    {
                        item.cCardAry.push(pairTripleWrapper.tagTripleList[k].cCardAry[l]);
                    }
                    parseResult.normalParse.triplyAry.push(item);
                }
            }
            parseResult.isValid = true;
            return true;
        }

        /// <summary>
        /// 检查一副牌是否可以胡牌
        /// </summary>
        /// <param name="vSrc"></param>
        /// <returns></returns>
        public static CheckIfCanHuCardArray(srcAry:Array<number>):boolean
        {
            var vSrc = new Array<number>();

            for(var i=0;i<srcAry.length;i++)
            {
                vSrc.push(srcAry[i]);
            }

            //1、先决条件必须满足:胡牌的牌张数必须满%3==2，否则不可以胡
            console.log("12324124124");
            if ((vSrc.length % 3) != 2)
            {
                return false;
            }

            //2、胡牌分三种情况：
            /*
                2.1)、国世无双
                2.2)、七对子
                2.3)、对+刻/顺
            */
            if(LHZMJMahjongPattern.IsHuShiSanLan(vSrc)){
                return true;
            }

            if (LHZMJMahjongPattern.IsHuSevenPairStruct(vSrc))
            {
                return true;
            }
            
            if(LHZMJMahjongPattern.IsHuNormalStruct(vSrc))
            {
                return true;
            }
            return false;
        }

        //是否胡十三烂
        public static IsHuShiSanLan(vSrc:Array<number>):boolean
        {
            if (vSrc.length != LHZMJMahjongDef.gCardCount_Active)
            {
                return false;
            }

            var card:Array<number> = new Array<number>();
            card.splice(0, card.length);
            for(let i:number=0; i<vSrc.length; i++){
                card.push(vSrc[i]);
            }

            var vWanCard:Array<number> = new Array<number>();
            var vTongCard:Array<number> = new Array<number>();
            var vTiaoCard:Array<number> = new Array<number>();
            var vZhiCard:Array<number> = new Array<number>();

            vWanCard.splice(0, vWanCard.length);
            vTongCard.splice(0, vTongCard.length);
            vTiaoCard.splice(0, vTiaoCard.length);
            vZhiCard.splice(0, vZhiCard.length);

            //分拣牌
            LHZMJMahjongAlgorithm1.spiltHandCard(card,vWanCard,vTongCard,vTiaoCard,vZhiCard);

            //检查万筒条是否满足条件
            if (!this.CheckValueBiggerTwo(vWanCard) || !this.CheckValueBiggerTwo(vTongCard) || !this.CheckValueBiggerTwo(vTiaoCard))
            {
                return false;
            }

            //检查字是否满足条件
            if (!this.CheckZhiIsSame(vZhiCard))
            {
                return false;
            }

            return true;
        }

        //检查万筒条的花色的值是否间隔大于2
        public static CheckValueBiggerTwo(card:Array<number>):boolean
        {
            var colorCard:Array<number> = new Array<number>();
            colorCard.splice(0, colorCard.length);
            for(let i:number=0; i<card.length; i++){
                colorCard.push(card[i]);
            }

            colorCard.sort();
            if (colorCard.length > 3)
            {
                return false;
            }

            if (colorCard.length > 0)
            {
                for (var i:number = colorCard.length-1; i > 0; i--)
                {
                    if (colorCard[i] - colorCard[i-1] < 3)
                    {
                        return false;
                    }
                }
            }

            return true;
        }

        //检查字是否满足条件
        public static CheckZhiIsSame(zhiCard:Array<number>):boolean
        {
            var card:Array<number> = new Array<number>();
            card.splice(0, card.length);
            for(let i:number=0; i<zhiCard.length; i++){
                card.push(zhiCard[i]);
            }

            card.sort();
            for (var i:number = card.length - 1; i > 0; i--)
            {
                if (card[i] - card[i - 1] < 1)
                {
                    return false;
                }
            }

            return true;
        }

        /// <summary>
        /// 解析牌型
        /// </summary>
        /// <param name="parseResult"></param>
        /// <param name="parseFan"></param>
        /// <returns></returns>
        public static ParsePattern(parseResult: clsParseResult,have19Jiang: boolean): enMahjongPattern
        {
            if(!parseResult.isValid)
            {
                return enMahjongPattern.MahjongPattern_Null;
            }

            // //检查十三烂
            // if(LHZMJMahjongPattern.CheckMahjongPattern_ShiSanLan(parseResult))
            // {
            //     return enMahjongPattern.MahjongPattern_ShiSanLan;
            // }

            //检查清单调
            if(LHZMJMahjongPattern.CheckMahjongPattern_QingDanDiao(parseResult))
            {
                return enMahjongPattern.MahjongPattern_QingDanDiao;
            }
            //检查清七对
            if (LHZMJMahjongPattern.CheckMahjongPattern_QingQiDui(parseResult))
            {
                return enMahjongPattern.MahjongPattern_QingQiDui;
            }
            //检查将对
            if (have19Jiang && LHZMJMahjongPattern.CheckMahjongPattern_JiangDui(parseResult))
            {
                return enMahjongPattern.MahjongPattern_JiangDui;
            }
            
            
            //检查龙七对
            if (LHZMJMahjongPattern.CheckMahjongPattern_LongQiDui(parseResult))
            {
                return  enMahjongPattern.MahjongPattern_LongQiDui;
            }
            //检查清大对
            if (LHZMJMahjongPattern.CheckMahjongPattern_QingDaDui(parseResult))
            {
                return enMahjongPattern.MahjongPattern_QingDaDui;
            }
            
            //检查大单吊
            if(have19Jiang && LHZMJMahjongPattern.CheckMahjongPattern_DaDanDiao(parseResult)) {
                return enMahjongPattern.MahjongPattern_DaDanDiao;
            }
            // //检查带幺九
            // if (have19Jiang && LHZMJMahjongPattern.CheckMahjongPattern_DaiYaoJiu(parseResult))
            // {
            //     return enMahjongPattern.MahjongPattern_DaiYaoJiu;
            // }
            //检查小七对
            if (LHZMJMahjongPattern.CheckMahjongPattern_XiaoQiDui(parseResult))
            {
                return enMahjongPattern.MahjongPattern_XiaoQiDui;
            }
            //检查清一色
            if (LHZMJMahjongPattern.CheckMahjongPattern_QingYiShe(parseResult))
            {
                return enMahjongPattern.MahjongPattern_QingYiShe;
            }
            
            //检查对对胡
            if (LHZMJMahjongPattern.CheckMahjongPattern_DuiDuiHu(parseResult))
            {
                return enMahjongPattern.MahjongPattern_DuiDuiHu;
            }
            
            //默认平胡
            return enMahjongPattern.MahjongPattern_PingHu;
        }

        /// <summary>
        /// 十三烂
        /// </summary>
        /// <param name="parseResult"></param>
        /// <returns></returns>
        /// <summary>
        /// 十三烂
        /// </summary>
        /// <param name="parseResult"></param>
        /// <returns></returns>
        // private static CheckMahjongPattern_ShiSanLan(parseResult:clsParseResult):boolean
        // {
        //     return parseResult.isShiSanLan;
        // }

        /// <summary>
        /// 清单调,手里的牌都碰或杠完只剩最后一张。例如：111筒、333筒、555筒、666筒都是碰掉了，手里剩一张2筒，胡2筒
        /// </summary>
        /// <param name="parseResult"></param>
        /// <returns></returns>
        private static CheckMahjongPattern_QingDanDiao(parseResult:clsParseResult):boolean
        {
            //同时满足清一色,大单调
            if (LHZMJMahjongPattern.CheckMahjongPattern_QingYiShe(parseResult) && LHZMJMahjongPattern.CheckMahjongPattern_DaDanDiao(parseResult))
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// 清七对,手上的牌是清一色的七对。 例：22334466778899条
        /// </summary>
        /// <param name="parseResult"></param>
        /// <returns></returns>
        private static CheckMahjongPattern_QingQiDui(parseResult:clsParseResult):boolean
        {
            //同时满足清一色,小七对
            if (LHZMJMahjongPattern.CheckMahjongPattern_QingYiShe(parseResult) && LHZMJMahjongPattern.CheckMahjongPattern_XiaoQiDui(parseResult))
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// 将对,除了一对对牌以外，剩下的都是三张一对的，一共四对。而对牌必须为二、五、八。 例：222555888万55588筒
        /// </summary>
        /// <param name="parseResult"></param>
        /// <returns></returns>
        private static CheckMahjongPattern_JiangDui(parseResult:clsParseResult):boolean
        {
            if(!LHZMJMahjongAlgorithm1.CheckIsJiangCard(parseResult.normalParse.pair))
            {
                return false;
            }

            for(var i=0;i<parseResult.normalParse.triplyAry.length;i++)
            {
                if(!parseResult.normalParse.triplyAry[i].isValid)
                {
                    continue;
                }
                if(enTripleType.TripleType_Flash == parseResult.normalParse.triplyAry[i].enTripleType)//不能有顺
                {
                    return false;
                }
                if(!LHZMJMahjongAlgorithm1.CheckIsJiangCard(parseResult.normalParse.triplyAry[i].cTokenCard))
                {
                    return false;
                }
            }

            return true;
        }


        /// <summary>
        /// 龙七对,手牌为暗七对牌型，没有碰过或者杠过，并且有四张牌是一样的，叫龙七对。不再计七对。例：22333366条337788筒
        /// </summary>
        /// <param name="parseResult"></param>
        /// <returns></returns>
        private static CheckMahjongPattern_LongQiDui(parseResult:clsParseResult):boolean
        {
            if(parseResult.is7Pair && (LHZMJMahjongDef.gCardCount_Active == parseResult.cardAryBy7Pair.length))
            {
                var handCard = new Array<number>();
                for(var i=0;i<parseResult.cardAryBy7Pair.length;i++)
                {
                    handCard.push(parseResult.cardAryBy7Pair[i]);
                }
                LHZMJMahjongAlgorithm1.sortCardAry(handCard);

                for (var i = 0; i < handCard.length - 3; i++ )
                {
                    if(LHZMJMahjongDef.gInvalidMahjongValue == handCard[i])
                    {
                        return false;
                    }
                    if(handCard[i] == handCard[i + 3])
                    {
                        return true;
                    }
                }
            }
            return false;
        }

        /// <summary>
        /// 清大对,手上的牌是清一色的对对胡。 例： 22233355566699筒
        /// </summary>
        /// <param name="parseResult"></param>
        /// <returns></returns>
        private static CheckMahjongPattern_QingDaDui(parseResult:clsParseResult):boolean
        {
            //同时满足清一色,对对胡
            if (LHZMJMahjongPattern.CheckMahjongPattern_QingYiShe(parseResult) && LHZMJMahjongPattern.CheckMahjongPattern_DuiDuiHu(parseResult))
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// 大单吊,手里的牌都碰或杠完只剩最后一张。例如：111筒、333筒、555条、666条都是碰掉了，手里剩一张2筒或2条，胡2筒或2条
        /// </summary>
        /// <param name="parseResult"></param>
        /// <returns></returns>
        private static CheckMahjongPattern_DaDanDiao(parseResult:clsParseResult):boolean
        {
            if(parseResult.is7Pair)
            {
                return false;
            }
            for(var i=0;i<parseResult.normalParse.triplyAry.length;i++)
            {
                if (!parseResult.normalParse.triplyAry[i].isValid)
                {
                    continue;
                }
                if((enTripleType.TripleType_Flash == parseResult.normalParse.triplyAry[i].enTripleType) || 
                    (enTripleType.TripleType_Echo == parseResult.normalParse.triplyAry[i].enTripleType))//不能有顺和刻
                {
                    return false;
                }
            }
            return true;
        }

        /// <summary>
        /// 带幺九,玩家手牌中，全部都是用1的连牌或者9的连牌组成的牌，且麻将也是1,9。 例：111222333筒78999万
        /// </summary>
        /// <param name="parseResult"></param>
        /// <returns></returns>
        // private static CheckMahjongPattern_DaiYaoJiu(parseResult:clsParseResult):boolean
        // {
        //     if (parseResult.is7Pair)
        //     {
        //         return false;
        //     }
        //     if(!LHZMJMahjongAlgorithm1.CheckIs19Card(parseResult.normalParse.pair))
        //     {
        //         return false;
        //     }

        //     var bChangeCheck = false;

        //     //解析后的三元组必须带1或9
        //     for(var i=0;i<parseResult.normalParse.triplyAry.length;i++)
        //     {
        //         if (!parseResult.normalParse.triplyAry[i].isValid)
        //         {
        //             continue;
        //         }
        //         if(!parseResult.normalParse.triplyAry[i].have19Card)//没有19牌,再去检查是否是7,8,9,1,2,3的刻
        //         {
        //             if(enTripleType.TripleType_Echo == parseResult.normalParse.triplyAry[i].enTripleType)
        //             {
        //                 if((7 == LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard)) || 
        //                     (8 == LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard)) || 
        //                     (9 == LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard)) || 
        //                     (1 == LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard)) || 
        //                     (2 == LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard)) ||
        //                     (3 == LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard)))
        //                 {
        //                     bChangeCheck=true;
        //                     continue;
        //                 }
        //             }
        //             return false;
        //         }
        //     }

        //     //
        //     if (bChangeCheck == true)
        //     {
        //         //解析牌阵时,把111,222,333,解析成了刻,777,888,999,也解析成了刻
        //         var b123 = new Array<boolean>();
        //         var b789 = new Array<boolean>();

        //         b123.push(false);b123.push(false);b123.push(false);
        //         b789.push(false);b789.push(false);b789.push(false);

        //         var b123Triple = new Array<number>();
        //         var b789Triple = new Array<number>();

        //         b123Triple.splice(0,b123Triple.length);
        //         b789Triple.splice(0,b789Triple.length);

        //         for(var i=0;i<parseResult.normalParse.triplyAry.length;i++)
        //         {
        //             if (!parseResult.normalParse.triplyAry[i].isValid)
        //             {
        //                 continue;
        //             }
        //             if(enTripleType.TripleType_Echo == parseResult.normalParse.triplyAry[i].enTripleType)
        //             {
        //                 if((1 == LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard)) || 
        //                     (2 == LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard)) || 
        //                     (3 == LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard)))
        //                 {
        //                     b123[LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard) - 1] = true;
        //                     b123Triple.push(parseResult.normalParse.triplyAry[i].cTokenCard);

        //                     continue;
        //                 }

        //                 if((7 == LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard)) ||
        //                     (8 == LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard)) ||
        //                     (9 == LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard)))
        //                 {
        //                     b789[LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard) - 7] = true;
        //                     b789Triple.push(parseResult.normalParse.triplyAry[i].cTokenCard);

        //                     continue;
        //                 }
        //             }
        //         }

        //         //如果满足123或789就再重新检查一遍
        //         if ((b123[0] && b123[1] && b123[2]) || (b789[0] && b789[1] && b789[2]))
        //         {
        //             for(var i=0;i<parseResult.normalParse.triplyAry.length;i++)
        //             {
        //                 if (!parseResult.normalParse.triplyAry[i].isValid)
        //                 {
        //                     continue;
        //                 }
        //                 if (!parseResult.normalParse.triplyAry[i].have19Card)//没有19牌
        //                 {
        //                     //有123刻,且这个就是123中的一个
        //                     if ((b123[0] && b123[1] && b123[2]) && 
        //                         ((1 == LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard)) || 
        //                         (2 == LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard)) || 
        //                         (3 == LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard))))
        //                     {
        //                         if((LHZMJMahjongAlgorithm1.GetMahjongColor(b123Triple[0]) != LHZMJMahjongAlgorithm1.GetMahjongColor(b123Triple[1])) || 
        //                             (LHZMJMahjongAlgorithm1.GetMahjongColor(b123Triple[0]) != LHZMJMahjongAlgorithm1.GetMahjongColor(b123Triple[2])) ||
        //                             (LHZMJMahjongAlgorithm1.GetMahjongColor(b123Triple[1]) != LHZMJMahjongAlgorithm1.GetMahjongColor(b123Triple[2])))
        //                         {
        //                             return false;
        //                         }
        //                         else
        //                         {
        //                             continue;
        //                         }
        //                     }

        //                     //有789刻,且这个就是789中的一个
        //                     if ((b789[0] && b789[1] && b789[2]) &&
        //                         ((7 == LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard)) ||
        //                         (8 == LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard)) ||
        //                         (9 == LHZMJMahjongAlgorithm1.GetMahjongValue(parseResult.normalParse.triplyAry[i].cTokenCard))))
        //                     {
        //                         if((LHZMJMahjongAlgorithm1.GetMahjongColor(b789Triple[0]) != LHZMJMahjongAlgorithm1.GetMahjongColor(b789Triple[1])) ||
        //                             (LHZMJMahjongAlgorithm1.GetMahjongColor(b789Triple[0]) != LHZMJMahjongAlgorithm1.GetMahjongColor(b789Triple[2])) ||
        //                             (LHZMJMahjongAlgorithm1.GetMahjongColor(b789Triple[1]) != LHZMJMahjongAlgorithm1.GetMahjongColor(b789Triple[2])))
        //                         {
        //                             return false;
        //                         }
        //                         else
        //                         {
        //                             continue;
        //                         }
        //                     }

        //                     return false;
        //                 }
        //             }
        //         }
        //         else
        //         {
        //             for(var i=0;i<parseResult.normalParse.triplyAry.length;i++)
        //             {
        //                 if (!parseResult.normalParse.triplyAry[i].isValid)
        //                 {
        //                     continue;
        //                 }
        //                 if (!parseResult.normalParse.triplyAry[i].have19Card)//没有19牌,再去检查是否是7,8,9,1,2,3的刻
        //                 {
        //                     return false;
        //                 }
        //             }
        //         }
        //     }

        //     return true;
        // }

        /// <summary>
        /// 小七对,手牌全部是两张一对的，没有碰过和杠过 例：11335566条224466筒
        /// </summary>
        /// <param name="parseResult"></param>
        /// <returns></returns>
        private static CheckMahjongPattern_XiaoQiDui(parseResult:clsParseResult):boolean
        {
            return parseResult.is7Pair;
        }
        /// <summary>
        /// 清一色,胡牌的手牌全部都是一门花色。 例：11122233345688筒。
        /// </summary>
        /// <param name="parseResult"></param>
        /// <returns></returns>
        private static CheckMahjongPattern_QingYiShe(parseResult:clsParseResult):boolean
        {
            var color = new Array<number>();
            color.push(0);color.push(0);color.push(0);color.push(0);
            if (parseResult.is7Pair)
            {
                for(var i=0;i<parseResult.cardAryBy7Pair.length;i++)
                {
                    color[LHZMJMahjongAlgorithm1.GetMahjongColor(parseResult.cardAryBy7Pair[i])] = 1;
                }
            }
            else
            {
                for(var i=0;i<parseResult.normalParse.activeCard.length;i++)
                {
                    color[LHZMJMahjongAlgorithm1.GetMahjongColor(parseResult.normalParse.activeCard[i])] = 1;
                }
            }

            if(1 == (color[0] + color[1] + color[2] + color[3]))
            {
                return true;
            }

            return false;
        }

        /// <summary>
        /// 对对胡,除了一对对牌以外，剩下的都是三张一对的，一共四对。例： 222666888万33399筒
        /// </summary>
        /// <param name="parseResult"></param>
        /// <returns></returns>
        private static CheckMahjongPattern_DuiDuiHu(parseResult:clsParseResult):boolean
        {
            if(parseResult.is7Pair)
            {
                return false;
            }
            for (var i=0;i< parseResult.normalParse.triplyAry.length;i++)
            {
                if (!parseResult.normalParse.triplyAry[i].isValid)
                {
                    continue;
                }
                if(enTripleType.TripleType_Flash == parseResult.normalParse.triplyAry[i].enTripleType)
                {
                    return false;
                }
            }
            return true;
        }



        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        /// <summary>
        /// 对一个同花色的3模式牌阵进行解析
        /// </summary>
        /// <param name="vSingleCard"></param>
        /// <param name="vTriple"></param>
        public static Parse3ModelToTripleList(vSingleCard:Array<number>, vTriple:Array<clsParseTriple>):void 
        {
            vTriple.splice(0,vTriple.length);

            //1、如果不是3模式或没有牌
            if (((vSingleCard.length % 3) != 0) || (vSingleCard.length == 0))
            {
                return;
            }

            //2、进行一次排序
            LHZMJMahjongAlgorithm1.sortCardAry(vSingleCard);
            
            //3、开始解析
            if (LHZMJMahjongAlgorithm1.GetMahjongColor(vSingleCard[0]) != LHZMJMahjongDef.gMahjongColor_Zhi)//花牌,万，筒，条
            {
                //3张牌,要么一刻，要么一顺
                if (vSingleCard.length == 3)
                {
                    //为一刻
                    if (vSingleCard[0] == vSingleCard[2])
                    {
                        var tagTriple = new clsParseTriple();
                        tagTriple.Clear();
                        tagTriple.enTripleType = enTripleType.TripleType_Echo;
                        tagTriple.cTokenCard = vSingleCard[0];
                        for (var i = 0; i < 3; i++)
                        {
                            tagTriple.cCardAry.push(vSingleCard[i]);
                        }
                        vTriple.push(tagTriple);
                        return;
                    }

                    //为一顺
                    if (((vSingleCard[1] - vSingleCard[0]) == 1) && ((vSingleCard[2] - vSingleCard[1]) == 1))
                    {
                        var tagTriple = new clsParseTriple();
                        tagTriple.Clear();
                        tagTriple.enTripleType = enTripleType.TripleType_Flash;
                        tagTriple.cTokenCard = vSingleCard[0];
                        for (var i = 0; i < 3; i++)
                        {
                            tagTriple.cCardAry.push(vSingleCard[i]);
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
                            LHZMJMahjongPattern.Parse3ModelToTripleList(vRemCard, vSubTriple);
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
                                var tagTriple = new clsParseTriple();
                                tagTriple.Clear();
                                tagTriple.enTripleType = enTripleType.TripleType_Echo;
                                tagTriple.cTokenCard = vSingleCard[i];
                                for (var j = 0; j < 3; j++)
                                {
                                    tagTriple.cCardAry.push(vSingleCard[i + j]);
                                }
                                vTriple.push(tagTriple);
                                return;
                            }
                        }

                        //搜顺
                        var wNet1Idx = 0;//顺的第二个索引
                        var wNet2Idx = 0;//顺的第三个索引
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
                            var tagTriple = new clsParseTriple();
                            tagTriple.Clear();
                            tagTriple.enTripleType = enTripleType.TripleType_Flash;
                            tagTriple.cTokenCard = vSingleCard[i];
                            tagTriple.cCardAry.push(vSingleCard[i]);
                            tagTriple.cCardAry.push(vSingleCard[wNet1Idx]);
                            tagTriple.cCardAry.push(vSingleCard[wNet2Idx]);
                            vTriple.push(tagTriple);

                            //递归解析本次去刻后的子串
                            var vSubTriple:Array<clsParseTriple> = new Array<clsParseTriple>();
                            LHZMJMahjongPattern.Parse3ModelToTripleList(vRemCard, vSubTriple);
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
                        var tagTriple = new clsParseTriple();
                        tagTriple.Clear();
                        tagTriple.enTripleType = enTripleType.TripleType_Echo;
                        tagTriple.cTokenCard = vSingleCard[0];
                        for (var i = 0; i < 3; i++)
                        {
                            tagTriple.cCardAry.push(vSingleCard[i]);
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
                            var vRemCard = new Array<number>();
                            for (var j = 0; j < vSingleCard.length; j++)
                            {
                                if (j < i || j > i + 2)
                                {
                                    vRemCard.push(vSingleCard[j]);
                                }
                            }
                            //递归解析本次去刻后的子串
                            var vSubTriple = new Array<clsParseTriple>();
                            LHZMJMahjongPattern.Parse3ModelToTripleList(vRemCard, vSubTriple);
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
                                var tagTriple = new clsParseTriple();
                                tagTriple.Clear();
                                tagTriple.enTripleType = enTripleType.TripleType_Echo;
                                tagTriple.cTokenCard = vSingleCard[i];
                                for (var j = 0; j < 3; j++)
                                {
                                    tagTriple.cCardAry.push(vSingleCard[i + j]);
                                }
                                vTriple.push(tagTriple);
                                return;
                            }
                        }
                    }
                }
            }
        }

        /// <summary>
        /// 对一个单色牌阵进行解析
        /// </summary>
        /// <param name="vSingleCard"></param>
        public static ParseSingleColorCard(vSingleCard:Array<number>, pairTripleWrapper:clsPairTripleWrapper):void 
        {
            if (vSingleCard.length == 0)
            {
                return;
            }

            //1、如果是三模式
            if (vSingleCard.length % 3 == 0)
            {
                var vTriple:Array<clsParseTriple> = new Array<clsParseTriple>();
                LHZMJMahjongPattern.Parse3ModelToTripleList(vSingleCard, vTriple);
                for (var i = 0; i < vTriple.length; i++)
                {
                    pairTripleWrapper.AddTriple(vTriple[i]);
                }
                return;
            }

            //2、如果是二模式仅两张牌
            if (vSingleCard.length == 2)
            {
                pairTripleWrapper.cPair = vSingleCard[0];
                return;
            }

            /************************************************************************************
            * 注意:
            * 考察这样一个解析例子:
            * (例如:33344455566)
            * 如果以3做对子,其他的牌可以解析为:345,456,456(一色二顺),这样的解析结果翻数较小
            * 如果以6做对子,其他的牌可以解析为:333,444,555(三暗刻),这样的解析结果翻数较大
            * 所以,对于2模式,应该遍历搜对,将所有成功的解析包装,再选出解析结果的最大值作为解析
            * ***********************************************************************************/

            //3、如果是二模式，一对+顺/刻
            var vPairTripleWrapper:Array<clsPairTripleWrapper> = new Array<clsPairTripleWrapper>();
            LHZMJMahjongAlgorithm1.sortCardAry(vSingleCard);
            for (var i = 0; i < vSingleCard.length - 1; i++)
            {
                //有对子，两张牌必在一起
                if (vSingleCard[i] == vSingleCard[i + 1])
                {
                    var vRemList:Array<number> = new Array<number>();
                    for (var j = 0; j < vSingleCard.length; j++)
                    {
                        if ((j < i) || (j > (i + 1)))
                        {
                            vRemList.push(vSingleCard[j]);
                        }
                    }
                    var vTriple:Array<clsParseTriple> = new Array<clsParseTriple>();
                    LHZMJMahjongPattern.Parse3ModelToTripleList(vRemList, vTriple);
                    if (vTriple.length > 0)//此次拆分是对的
                    {
                        var tagParTripleWrapper = new clsPairTripleWrapper();
                        tagParTripleWrapper.Clear();
                        tagParTripleWrapper.cPair = vSingleCard[i];
                        for (var j = 0; j < vTriple.length; j++)
                        {
                            tagParTripleWrapper.AddTriple(vTriple[j]);
                        }
                        vPairTripleWrapper.push(tagParTripleWrapper);
                    }
                }
            }

            if (vPairTripleWrapper.length == 0)
            {
                return;
            }

            //找到拥有最大解析值的PairTripleWrapper
            var wMaxIdx = 0;
            var wMaxTripleValue = 0;
            for (var i = 0; i < vPairTripleWrapper.length; i++)
            {
                var wCurTripleValue = vPairTripleWrapper[i].tripleValue;
                if (wCurTripleValue > wMaxTripleValue)
                {
                    wMaxIdx = i;
                    wMaxTripleValue = wCurTripleValue;
                }
            }

            //将此对赋值
            pairTripleWrapper.cPair = vPairTripleWrapper[wMaxIdx].cPair;
            for (var i = 0; i < vPairTripleWrapper[wMaxIdx].wTripleCount; i++)
            {
                pairTripleWrapper.AddTriple(vPairTripleWrapper[wMaxIdx].tagTripleList[i]);
            }
        }

        //是否胡七对子结构
        public static IsHuSevenPairStruct(vSrc:Array<number>):boolean
        {
            //1、七对子结构，必须门清
            if (vSrc.length != LHZMJMahjongDef.gCardCount_Active)
            {
                return false;
            }
            var wPairCount = 0;
            for (var i = 0; i < vSrc.length - 1; i++)
            {
                if (LHZMJMahjongDef.gInvalidMahjongValue == vSrc[i])
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

        //是否胡普通结构
        public static IsHuNormalStruct(vSrc:Array<number>):boolean
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
            LHZMJMahjongAlgorithm1.sortCardAry(vSrc);
            //除去对之后剩余的牌
            var vLeftCard = new Array<number>();

            var vWanCard = new Array<number>();
            var vTongCard = new Array<number>();
            var vTiaoCard = new Array<number>();
            var vZhiCard = new Array<number>();

            var v_TripleWan = new Array<clsParseTriple>();
            var v_TripleTong = new Array<clsParseTriple>();
            var v_TripleTiao = new Array<clsParseTriple>();
            var v_TripleZhi = new Array<clsParseTriple>();

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
                    LHZMJMahjongAlgorithm1.spiltHandCard(vLeftCard, vWanCard, vTongCard, vTiaoCard, vZhiCard);

                    //3、分别进行解析
                    LHZMJMahjongPattern.Parse3ModelToTripleList(vWanCard, v_TripleWan);
                    LHZMJMahjongPattern.Parse3ModelToTripleList(vTongCard, v_TripleTong);
                    LHZMJMahjongPattern.Parse3ModelToTripleList(vTiaoCard, v_TripleTiao);
                    LHZMJMahjongPattern.Parse3ModelToTripleList(vZhiCard, v_TripleZhi);

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
        

































    }
