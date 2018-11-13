import { HZMJMahjongAlgorithm1 } from "./HZMJMahjongAlgorithm1";
import { HZMJMahjongDef, enHuCardType } from "../ConstDef/HZMJMahjongDef";
import M_HZMJClass from "../M_HZMJClass";
import M_HZMJView from "../M_HZMJView";

const { ccclass, property } = cc._decorator;


export class HZMJMahjongAlgorithm1Lhh {



        //////////////////////////////////////////////////////南京麻将中的大胡判断//////////////////////////////////////////////

        /// <summary>
        /// 是否胡七对子结构
        /// </summary>
        /// <param name="vSrc"></param>
        /// <returns></returns>
        public static IsHuSevenPairStruct(vSrc:Array<number>):boolean
        {
            //1、七对子结构，必须门清
            if (vSrc.length != 14)
            {
                return false;
            }
            
            HZMJMahjongAlgorithm1.sortCardAry(vSrc);
            var wPairCount:number = 0;
            for (var i = 0; i < vSrc.length - 1; i++)
            {
                if (HZMJMahjongDef.gInvalidMahjongValue == vSrc[i])
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





         /// <summary>
        /// 是否是双七对(南京麻将中：全是对子，成的一张为手上3张，成第4张)
        /// </summary>
        /// <returns></returns>
        private static IsHuDouble7Pairs(cardAry:Array<number>,huCard:number):boolean
        {
            var isdouble7pairs:boolean = false;
            
            if (cardAry == null || cardAry.length < 1)
            {
                return isdouble7pairs;
            }
            if (cardAry.length != 14)
            {
                return isdouble7pairs;
            }

            var have4num:number = 0;
            
            if(!this.CardAryIfContain7Pairs(cardAry, have4num))
            {
                return isdouble7pairs;
            }

            if(have4num<1)
            {
                return isdouble7pairs;
            }

            if(this.GetCardNumInCardAry(cardAry,huCard)<4)
            {
                return isdouble7pairs;
            }

            isdouble7pairs = true;

            return isdouble7pairs;
        }

         /// <summary>
        /// 一副牌是否是7对牌
        /// </summary>
        /// <param name="cardAry">需要检测的牌阵</param>
        /// <param name="have4Num">4个一样的牌(即两队相同)的个数(都是大胡，此处应该不用判断)</param>
        /// <returns>是7对返回true，否则返回false</returns>
        private static CardAryIfContain7Pairs(cardAry:Array<number>,have4Num:number):boolean
        {
            var is7pairs:boolean = false;
            if(cardAry==null|| cardAry.length<1)
            {
                return is7pairs;
            }
            if(cardAry.length!=14)
            {
                return is7pairs;
            }
            HZMJMahjongAlgorithm1.sortCardAry(cardAry);
            have4Num = 0;
            is7pairs = true;
            for (var i=0;i< cardAry.length-1;i++)
            {
                if(cardAry[i]!= cardAry[i+1])
                {
                    is7pairs = false;
                    break;
                }
                if(i< cardAry.length-3)
                {
                    if (cardAry[i] == cardAry[i + 3])
                    {
                        have4Num++;
                    }
                }
                i += 1;//这儿加一次，上面i++时加一次，就是下两次了
            }
            return is7pairs;
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
            if (cardAry == null || cardAry.length == 0 || card == HZMJMahjongDef.gInvalidMahjongValue)
            {
                return num;
            }
            for(var i=0;i<cardAry.length;i++){
                if(cardAry[i]=card){
                    num++;
                }
            }
            return num;
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

            var colorfirst:number = HZMJMahjongAlgorithm1.GetMahjongColor(Ary[0]);

            for(var i=0;i<Ary.length;i++)
            {
                if(colorfirst!= HZMJMahjongAlgorithm1.GetMahjongColor(Ary[i]))
                {
                    isqys = false;
                    break;
                }
            }
            return isqys;
        }

        /// <summary>
        /// 判断一副牌是否是混一色(只有万筒条中的一种和东南西北)(南京麻将中的一种)
        /// </summary>
        /// <param name="Ary"></param>
        /// <returns></returns>
        public static IsHunYiSe(Ary:Array<number>):boolean
        {
            var isqys:boolean = false;

            if (Ary == null || Ary.length < 1)
            {
                return isqys;
            }

            var colorfirst:number = HZMJMahjongDef.gInvalidMahjongValue;

            if(!HZMJMahjongAlgorithm1.OneAryIsContainsOtherAryAtListOneMember(Ary,HZMJMahjongAlgorithm1.GetDNXB()))//保证牌值列表里至少有东南西北中的一个
            {
                return isqys;
            }

            for(var i=0;i<Ary.length;i++){
                if(HZMJMahjongAlgorithm1.GetMahjongLogicValue(Ary[i])>34)//出现中发白，春夏秋冬，梅兰竹菊，那么就不可能是混一色
                {
                    return isqys;
                }
                
                if(HZMJMahjongAlgorithm1.GetMahjongColor(Ary[i])<3)
                {
                    colorfirst = HZMJMahjongAlgorithm1.GetMahjongColor(Ary[i]);
                    break;
                }
            }

            if(colorfirst== HZMJMahjongDef.gInvalidMahjongValue)//如果混一色判断出现问题的话，那么很有可能是这个地方出了问题(关键是，只有东南西北，没有万筒条，算不算混一色)
            {
                return isqys;
            }

            isqys = true;

            for(var i=0;i<Ary.length;i++){
                if(HZMJMahjongAlgorithm1.GetMahjongColor(Ary[i])<3)
                {
                    if (colorfirst != HZMJMahjongAlgorithm1.GetMahjongColor(Ary[i]))
                    {
                        isqys = false;
                        break;
                    }
                }
            }

            return isqys;
        }



        /**
         * 是否是对对胡
         */
        public static IsDuiDuiHu(vSrc:Array<number>):boolean
        {
            var isddh:boolean = false;
            if(vSrc==null|| vSrc.length<2)
            {
                return isddh;
            }

            var ary:Array<number> = new Array<number>();

            for(var i=0;i<vSrc.length;i++){
                ary.push(vSrc[i])
            }
            HZMJMahjongAlgorithm1.sortCardAry(ary);

            var cardtype:Array<number> = HZMJMahjongAlgorithm1.GetCardTypeAryFromCardAry(ary);

            for(var i=0;i< cardtype.length;i++)
            {
                if(HZMJMahjongAlgorithm1.GetCardNumInCardAry(ary, cardtype[i])!=2)
                {
                    continue;
                }

                HZMJMahjongAlgorithm1.RemoveZhiDingNumMemberInAry(ary, cardtype[i], 2);

                var cardtp:Array<number> = new Array<number>();

                for(var j=0;j<cardtype.length;j++){
                    cardtp.push(cardtype[j]);
                }
                HZMJMahjongAlgorithm1.RemoveZhiDingNumMemberInAry(cardtp,cardtype[i],1);

                var isduidh:boolean = true;

                for(var j=0;j< cardtp.length;j++)
                {
                    if(HZMJMahjongAlgorithm1.GetCardNumInCardAry(ary, cardtp[j])>=3)
                    {
                        continue;
                    }
                    isduidh = false;
                }

                HZMJMahjongAlgorithm1.AddZhiDingNumMemberInAry(ary, cardtype[i], 2);

                if(isduidh)
                {
                    isddh = true;
                    break;
                }
            }
            return isddh;
        }

        /// <summary>
        /// 是否胡卡张(卡胡)
        /// </summary>
        /// <param name="Ary">胡牌列表(记住这个列表里面的牌一定是已经胡了的牌)</param>
        /// <param name="huCard">胡的牌</param>
        /// <returns></returns>
        public static IsHuKaZhang(Ary:Array<number>, huCard:number):boolean
        {
            var ishudandiao:boolean = false;
            if (Ary == null || Ary.length < 5 || huCard == HZMJMahjongDef.gInvalidMahjongValue|| HZMJMahjongAlgorithm1.GetMahjongColor(huCard)>=3
                ||HZMJMahjongAlgorithm1.GetMahjongValue(huCard)==1||HZMJMahjongAlgorithm1.GetMahjongValue(huCard)==9)
            {
                return ishudandiao;
            }

            var byary:Array<number> = new Array<number>();
            for(var i=0;i<Ary.length;i++){
                byary.push(Ary[i]);
            }
            HZMJMahjongAlgorithm1.sortCardAry(byary);


            if(!HZMJMahjongAlgorithm1.IsContainsNumber(byary,huCard-1)||!HZMJMahjongAlgorithm1.IsContainsNumber(byary,huCard+1)){
                return ishudandiao;
            }

            //下面的逻辑很仓促写出来的，严密性需要检验

            HZMJMahjongAlgorithm1.RemoveZhiDingNumMemberInAry(byary,huCard - 1,1);
            HZMJMahjongAlgorithm1.RemoveZhiDingNumMemberInAry(byary,huCard,1);
            HZMJMahjongAlgorithm1.RemoveZhiDingNumMemberInAry(byary,huCard + 1,1);

            if(HZMJMahjongAlgorithm1.CheckIfCanHuCardArray(byary))
            {
                ishudandiao = true;
            }

            return ishudandiao;
        }











        ////////////////////////////////////////////////////////公共函数/////////////////////////////////////////////////////////////////////
        /// <summary>
        /// 通过自己的椅子号获取上家的椅子号
        /// </summary>
        /// <param name="chair"></param>
        /// <returns></returns>
        public static GetUpChairBySelfChair(chair:number):number
        {
            if (chair == HZMJMahjongDef.gInvalidChar || chair > 3)
            {
                return HZMJMahjongDef.gInvalidChar;
            }
            if (chair == 0)
            {
                return 3;
            }

            return chair - 1;
        }
        /// <summary>
        /// 通过自己的椅子号获取下家的椅子号
        /// </summary>
        /// <param name="chair"></param>
        /// <returns></returns>
        public static GetDownChairBySelfChair(chair:number):number
        {
            if (chair == HZMJMahjongDef.gInvalidChar || chair > 3)
            {
                return HZMJMahjongDef.gInvalidChar;
            }
            if (chair == 3)
            {
                return 0;
            }

            return chair + 1;
        }

        /// <summary>
        /// 通过自己的椅子号获取下家的椅子号
        /// </summary>
        /// <param name="chair"></param>
        /// <returns></returns>
        public static GetOppoChairBySelfChair(chair:number):number
        {
            if (chair == HZMJMahjongDef.gInvalidChar || chair > 3)
            {
                return HZMJMahjongDef.gInvalidChar;
            }
            if (chair == 0 || chair == 1)
            {
                return chair + 2;
            }

            return chair - 2;
        }


        /// <summary>
        /// 获取0-9万列表
        /// </summary>
        /// <returns></returns>
        public static Get029Wan():Array<number>
        {
            var wan:Array<number> = new Array<number>();
            var wan1:number = 0x01;
            for(var i=0;i<9;i++)
            {
                wan.push(wan1 + i);
            }
            return wan;
        }
        /// <summary>
        /// 获取0-9筒列表
        /// </summary>
        /// <returns></returns>
        public static Get029Tong():Array<number>
        {
            var tong:Array<number> = new Array<number>();
            var tong1:number = 0x11;
            for (var i = 0; i < 9; i++)
            {
                tong.push(tong1 + i);
            }
            return tong;
        }
        /// <summary>
        /// 获取0-9条列表
        /// </summary>
        /// <returns></returns>
        public static Get029Tiao():Array<number>
        {
            var tiao:Array<number> = new Array<number>();
            var tiao1:number = 0x21;
            for (var i = 0; i < 9; i++)
            {
                tiao.push(tiao1 + i);
            }
            return tiao;
        }
        /// <summary>
        /// 获取字牌列表
        /// </summary>
        /// <returns></returns>
        public static Get027Zi():Array<number>
        {
            var zi:Array<number> = new Array<number>();
            var zi1:number = 0x31;
            for (var i = 0; i < 7; i++)
            {
                zi.push(zi1 + i);
            }
            return zi;
        }
        /// <summary>
        /// 获取东南西北列表
        /// </summary>
        /// <returns></returns>
        public static GetDNXB():Array<number>
        {
            var zi:Array<number> = new Array<number>();
            var zi1:number = 0x31;
            for(var i=0;i<4;i++)
            {
                zi.push(zi1 + i);
            }
            return zi;
        }
        /// <summary>
        /// 获取中发白列表
        /// </summary>
        /// <returns></returns>
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
        /// 获取春夏秋冬列表
        /// </summary>
        /// <returns></returns>
        public static GetCXQD():Array<number>
        {
            var zi:Array<number> = new Array<number>();
            var zi1:number = 0x41;
            for (var i = 0; i < 4; i++)
            {
                zi.push(zi1 + i);
            }
            return zi;
        }
        /// <summary>
        /// 获取梅兰竹菊列表
        /// </summary>
        /// <returns></returns>
        public static GetMLZJ():Array<number>
        {
            var zi:Array<number> = new Array<number>();
            var zi1:number = 0x45;
            for (var i = 0; i < 4; i++)
            {
                zi.push(zi1 + i);
            }
            return zi;
        }

        /**
         * 移除一个元素
         * @param Ary 
         * @param card 
         */
        public static RemoveOneMember(Ary:Array<number>,card:number):void{
            if(Array==null||Ary.length<1){
                return;
            }
            if(card==HZMJMahjongDef.gInvalidMahjongValue){
                return;
            }
            if(!HZMJMahjongAlgorithm1.AryContainsOneOrNot(Ary,card)){
                return;
            }
            for(var i=0;i<Ary.length;i++){
                if(Ary[i]!=card){
                    continue;
                }
                Ary.splice(i,1);
                break;
            }
        }

        /**
         * 将一个列表里面传入参数的值和传入长度的前后元素都删除
         */
        public static RemoveMember(Ary:Array<number>,card:number,length:number=3):void
        {
            if(Ary==null|| Ary.length<1)
            {
                return;
            }
            HZMJMahjongAlgorithm1.sortCardAry(Ary);
            var cardSmall:number = card - length + 1;//最小牌值
            for (var i=0;i<2*length-1;i++)
            {
                var cd:number = cardSmall + i;
                if (HZMJMahjongAlgorithm1.IsContainsNumber(Ary,cd))
                {
                    this.RemoveOneMember(Ary,cd);
                }
            }
        }



        /// <summary>
        /// 一副牌阵中是否包含花牌
        /// </summary>
        /// <param name="CardAry"></param>
        /// <returns></returns>
        public static IsContansFlowrCard(CardAry:Array<number>):boolean
        {
            var iscf:boolean = false;
            if (CardAry == null)
            {
                return iscf;
            }
            var FlowerAry:Array<number> = new Array<number>();
            for(var i=0;i<M_HZMJClass.ins.FlowerAry.length;i++){
                FlowerAry.push(M_HZMJClass.ins.FlowerAry[i]);
            }
            for (var i = 0; i < CardAry.length; i++)
            {
                if (HZMJMahjongAlgorithm1.IsContainsNumber(FlowerAry,CardAry[i]))
                {
                    iscf = true;
                }
            }
            return iscf;
        }
        /**
         * 是否是花牌(宿州麻将判断)
         * @param card 
         */
        public static IsFlowerCardHZMJ(card:number):boolean{
            var FlowerAry:Array<number> = new Array<number>();
            for(var i=0;i<M_HZMJClass.ins.FlowerAry.length;i++){
                FlowerAry.push(M_HZMJClass.ins.FlowerAry[i]);
            }
            for(var i=0;i<FlowerAry.length;i++){
                if(card==FlowerAry[i]){
                    return true;
                }
            }
            return false;
        }


////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 显示牌阵列表log
     * @param MiaoShu 
     * @param cardAry 
     */
    public static ShowAryCardLog(MiaoShu:string,cardAry:Array<number>){
        if(cardAry==null||cardAry.length==0){
            console.log(MiaoShu);
        }
        var strCard:string="";
        var length=cardAry.length;
        for(var i=0;i<length;i++){
            if(i==length-1){
                strCard+=cardAry[i].toString();
                continue;
            }
            strCard+=cardAry[i].toString();
            strCard+=",";
        }
        console.log(MiaoShu+strCard);
    }

    

}
