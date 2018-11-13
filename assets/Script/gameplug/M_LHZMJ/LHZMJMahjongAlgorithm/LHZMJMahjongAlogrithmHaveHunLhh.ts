import { LHZMJMahjongDef, LHZMJ } from "../ConstDef/LHZMJMahjongDef";
import { LHZMJMahjongAlgorithm1 } from "./LHZMJMahjongAlgorithm1";
import { LHZMJMahjongAlgorithm1Lhh } from "./LHZMJMahjongAlogorithmlhh";

const { ccclass, property } = cc._decorator;


export default class LHZMJMahjongAlgorithmHaveHunLhh {
    public static IsCanHu7Dui=false;

    
    public static GetTingCardArray(srcAry:Array<number>,HunAry:Array<number>,flowerAry:Array<number>=null):Array<number>{
            LHZMJMahjongAlgorithm1Lhh.ShowAryCardLog("会牌种类：",HunAry);
            var tingCards:Array<number>=new Array<number>();
            if (srcAry.length%3 != 1)
                return tingCards;
            
            var allCard:Array<number>=new Array<number>();
            for (var i = 0; i < LHZMJMahjongDef.gMahjongCard.length; i++)
            {
                if(flowerAry!=null){
                    if(LHZMJMahjongAlgorithm1.IsContainsNumber(flowerAry,LHZMJMahjongDef.gMahjongCard[i])){//花牌不提示在胡牌列表里面
                        continue;
                    }
                }
                allCard.splice(0,allCard.length);
                for(var j=0;j<srcAry.length;j++)
                {
                    allCard.push(srcAry[j]);
                }
                allCard.push(LHZMJMahjongDef.gMahjongCard[i]);
                if (LHZMJMahjongAlgorithmHaveHunLhh.CheckIfCanHuCardArrayForRQMJ(allCard,HunAry))
                    tingCards.push(LHZMJMahjongDef.gMahjongCard[i]);
            }
            return tingCards;
       }

       
        /// <summary>
        /// 检查一副牌是否胡牌，带赖子
        /// </summary>
        /// <param name="srcAry">一副牌</param>
        /// <param name="laizi">赖子牌</param>
        /// <returns></returns>
        public static CheckIfCanHuCardArrayForRQMJ(srcAry:Array<number>,HunAry:Array<number>):boolean{
            var vSrc:Array<number> = new Array<number>();
            //手牌基本检查
            for(var i:number=0;i<srcAry.length;i++)
            {
                if(LHZMJMahjongDef.gInvalidMahjongValue!=srcAry[i])
                    vSrc.push(srcAry[i]);
            }

            //1、先决条件必须满足:胡牌的牌张数必须满%3==2，否则不可以胡
            if ((vSrc.length % 3) != 2)
            {
                return false;
            }
            //四张赖子(四张赖子胡牌是红中麻将的一个规则)
            /*
            if (this.getLaiZiNum(srcAry) == 4)
            {
                return true;
            }
            */
            //2、胡牌分三种情况：
            
            //2.1)、国世无双
            //    2.2)、七对子
            //    2.3)、对 + 刻 / 顺
            

            //if (IsHuSevenPairStruct(vSrc))
            //{
            //    return true;
            //}
            if (LHZMJMahjongAlgorithmHaveHunLhh.IsHuNormalStructHaveHun(vSrc,HunAry))
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
        private static IsHuNormalStructHaveHun(vSrc:Array<number>,HunAry:Array<number>):boolean{
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
                if (LHZMJMahjongAlgorithm1.IsContainsNumber(HunAry,vSrc[i]))
                    laiziNum++;
                else
                {
                    srcAry.push(vSrc[i]);
                }
            }
            //宿州麻将是否可以胡7对是一个可选项
            if(LHZMJMahjongAlgorithmHaveHunLhh.IsCanHu7Dui){
                //为任丘麻将加的
                if(this.ChangeArrayTo7PairsNeedHun(srcAry, laiziNum))
                {
                    return true;
                }
            }

            //分情况
            LHZMJMahjongAlgorithm1.sortCardAry(srcAry);
            //1、按花色分拣牌
            var vectorWan:Array<number> = new Array<number>();
            var vectorTong:Array<number> = new Array<number>();
            var vectorTiao:Array<number> = new Array<number>();
            var vectorZi:Array<number> = new Array<number>();
            LHZMJMahjongAlgorithm1.spiltHandCard(srcAry, vectorWan, vectorTong, vectorTiao, vectorZi);
            //3、得到各自的成组需赖子数
            var wanneed = LHZMJMahjongAlgorithm1.ChangeArrayToTripleForHuapai(vectorWan);
            var tongneed = LHZMJMahjongAlgorithm1.ChangeArrayToTripleForHuapai(vectorTong);
            var tiaoneed = LHZMJMahjongAlgorithm1.ChangeArrayToTripleForHuapai(vectorTiao);
            var zineed = LHZMJMahjongAlgorithm1.ChangeArrayToTripleForZipai(vectorZi);//红中赖子麻将实际上也没有字牌

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
                if (LHZMJMahjongAlgorithm1.ChangeArrayToPairAndTripleForHuapai(vectorWan, laiziNum - needNum))
                    return true;
            }
            needNum = wanneed + tiaoneed + zineed;
            //筒成对
            if (needNum <= laiziNum)
            {
                if (LHZMJMahjongAlgorithm1.ChangeArrayToPairAndTripleForHuapai(vectorTong, laiziNum - needNum))
                    return true;
            }
            needNum = tongneed + wanneed + zineed;
            //条成对
            if (needNum <= laiziNum)
            {
                if (LHZMJMahjongAlgorithm1.ChangeArrayToPairAndTripleForHuapai(vectorTiao, laiziNum - needNum))
                    return true;
            }
            needNum = tongneed + tiaoneed + wanneed;
            if(needNum<=laiziNum)
            {
                if(LHZMJMahjongAlgorithm1.ChangeArrayToPairAndTripleForZipai(vectorZi,laiziNum-needNum))
                return  true;
            }

            return false;
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
            if(LHZMJMahjongAlgorithm1.GetCardTypeNumFromCardAry(vectorCard)>7)//牌类型数大于7不可能组成7对
            {
                return false;
            }
            if(vectorCard==null)
            {
                return false;
            }
            needHun = LHZMJMahjongAlgorithm1.ChangeArrayToPairsNeedHun(vectorCard);

            return needHun<=hunNum;
        }



       /////////////////////////////////////////////////////////////////////上面是获取出去某张牌后的听牌列表，下面是获取出哪些牌可以听牌//////////////////////////////////////////////////////////




        /**
         * 得到所有出牌可听的可能出牌
         */
        public static GetLastCardToTing(srcAry:Array<number>,HunAry:Array<number>):Array<number>{       
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
                cardAry.push(HunAry[0]);
                if(this.CheckIfCanHuCardArrayForRQMJ(cardAry,HunAry))
                {
                    //if(!LHZMJMahjongAlgorithm1.IsContainsNumber(HunAry,srcAry[i]))//这句是红中麻将中赖子牌不加入提示，因为赖子牌不能出，而赖子牌能出的宿州麻将则需要把这个判断去掉
                        vectorChuCard.push(srcAry[i]);                 
                }
            }
            return vectorChuCard;
        }

        
        



}
