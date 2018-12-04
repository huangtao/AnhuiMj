import { JZMJMahjongDef } from "../ConstDef/JZMJMahjongDef";
import { allZhi } from "../ConstDef/JZMJMahjongDef";
import { enTinType, enFixedCardType } from "../ConstDef/JZMJMahjongDef";
import M_JZMJView from "../M_JZMJView";

const { ccclass, property } = cc._decorator;

	export class JZMJMahjongAlgorithm {
    	

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
            return (card & JZMJMahjongDef.gCardMask_color) >> 4;
        }
        /**
         * 取花色数值,0x00万,0x10筒,0x20条
         * */
        public static GetMahjongColorValue(card:number):number{
            return (card & JZMJMahjongDef.gCardMask_color);
        }
        /**
         * 取麻将牌值,1~9,一万==一筒==一条
         * */
        public static GetMahjongValue(card):number{
            return (card & JZMJMahjongDef.gCardMask_value);
        }
        /**
         * 取麻将牌逻辑数值,取牌逻辑值:万<筒<条<字<花
         * */
        public static GetMahjongLogicValue(card):number{
            return JZMJMahjongAlgorithm.GetMahjongColor(card) * 10 + JZMJMahjongAlgorithm.GetMahjongValue(card);
        }
        
        //
        //权限检查
        //
        
        /**
         * 检查是否可以吃
         * */
        public static CheckVoteRight_Chi(voteRight:number):boolean{
            return (voteRight & JZMJMahjongDef.gVoteRightMask_Chi) > 0;
        }
        /**
         * 检查是否可以碰
         * */
        public static CheckVoteRight_Peng(voteRight:number):boolean{
            return (voteRight & JZMJMahjongDef.gVoteRightMask_Peng) > 0;
        }
        /**
         * 检查是否可以杠
         * */
        public static CheckVoteRight_Gang(voteRight: number): boolean {
            return (voteRight & JZMJMahjongDef.gVoteRightMask_Gang) > 0;
        }
        /**
         * 检查是否可以豹
         * */
        public static CheckVoteRight_Bao(voteRight:number):boolean{
            return (voteRight & JZMJMahjongDef.gVoteRightMask_Bao) > 0;
        }
        /**
         * 检查是否可以胡
         * */
        public static CheckVoteRight_Hu(voteRight: number): boolean {
            return (voteRight & JZMJMahjongDef.gVoteRightMask_Hu) > 0;
        }
        
        /**
         * 牌阵排序
         * */
        public static sortCardAry(cardAry:Array<number>):void{
            if((null == cardAry) || (cardAry.length < 2)){
                return;
            }
            
            var tempCard : number=0;
            
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
                if(color == JZMJMahjongAlgorithm.GetMahjongColor(handCard[i])){
                    return true;
                }
            }
            return false;
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
                if(JZMJMahjongDef.gInvalidMahjongValue != handCard[i]){
                    switch(JZMJMahjongAlgorithm.GetMahjongColor(handCard[i])){
                        case JZMJMahjongDef.gMahjongColor_Wan:{
                            if(null != wan){
                                wan.push(handCard[i]);
                            }
                            break;
                        }
                        case JZMJMahjongDef.gMahjongColor_Tong:{
                            if(null != tong){
                                tong.push(handCard[i]);
                            }
                            break;
                        }
                        case JZMJMahjongDef.gMahjongColor_Tiao:{
                            if(null != tiao){
                                tiao.push(handCard[i]);
                            }
                            break;
                        }
                        case JZMJMahjongDef.gMahjongColor_Zhi:{
                            if(null != zhi){
                                zhi.push(handCard[i]);
                            }
                        }
                    }
                }
            }
            
        }
        /**
         * 得到所有出牌可听的可能出牌
         */
        public static GetLastCardToTing(srcAry:Array<number>,bukao:number):Array<number>{       
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
                if(this.CheckIfCanTingCardArray(cardAry,bukao))
                {
                    vectorChuCard.push(srcAry[i]);                 
                }
                
  
            }
            return vectorChuCard;
            //不排序，排序会打乱对应
            //JZMJMahjongAlgorithm.sortCardAry(vectorChuCard);
        }
        /**
		 * 检查是否听牌
		 */
        public static CheckIfCanTingCardArray(srcAry:Array<number>,bukao:number):Boolean{
            var cardAry:Array<number>=new Array<number>();
            var vectorTingCard:Array<number>=new Array<number>();
            //手牌基本检查
            for(var i:number=0;i<srcAry.length;i++)
            {
                if(JZMJMahjongDef.gInvalidMahjongValue!=srcAry[i])
                    cardAry.push(srcAry[i]);
            }
            if(1 != (cardAry.length % 3)) {
                return false;
            }
            JZMJMahjongAlgorithm.sortCardAry(cardAry);
            
            //听牌复制
            var vTingSpecial:Array<number>=new Array<number>(); 
            var vTingNormal:Array<number>=new Array<number>();
            var bTing:boolean = false;
          

          //  1、判断是否特殊听牌
            if (this.CheckIfCanSpecialTing(cardAry,bukao))
            {
                console.log(1);
                bTing = true;
                if (null != vectorTingCard)
                {
                    //获取特殊听牌
                    vTingSpecial.splice(0,vTingSpecial.length);
                    //获取特殊所听之牌
                    vTingSpecial=this.GetSpecialTingCard(cardAry,bukao);
                }
                else
                {
                    return true;
                }
            }

            //2、判断是否普通听牌
            if (this.CheckIfCanNormalTing(cardAry))
            {
                // if(ishavegang==true){
                // bTing = true;}
                if (null != vectorTingCard)
                {
                    //获取普通听牌
                    vTingNormal.splice(0,vTingNormal.length);
                    //获取普通所听之牌
                    vTingNormal=this.GetNormalTingCard(cardAry);
                    bTing = true;
                }
                else
                {
                    return true;
                }
            }
            if (null == vectorTingCard)
            {
                return bTing;
            }
            if ((vTingSpecial.length == 0)&&(vTingNormal.length == 0))
            {
                return false;
            }
            //合并两个听牌集并剔除重复
            //合并两个听牌集
            this.MergeVector(vTingNormal, vTingSpecial);
            //去除重复项
            this.RemoveRepeat(vTingNormal);
            for(var i=0;i<vTingNormal.length;i++)
            {
                vectorTingCard.push(vTingNormal[i]);
            }    
            return vectorTingCard.length > 0;
        }
        public static GetTingCardArray(srcAry:Array<number>,buKao:number):Array<number>{
            var vResult:Array<number> = new Array<number>();
            vResult.splice(0,vResult.length);
            var cardAry:Array<number>=new Array<number>();
            for(var i:number=0;i<srcAry.length;i++)
            {
                cardAry.push(srcAry[i]);
            }
            //vSrc.RemoveAll(delegate(byte checkCard) { return checkCard == MahjongDef.gInvalidMahjongValue; });
            JZMJMahjongAlgorithm.sortCardAry(cardAry);
            
            //听牌复制
            var vTingSpecial:Array<number>=new Array<number>();
            var vTingNormal:Array<number>=new Array<number>();
            var bTing:boolean = false;
            
         //   1、判断是否特殊听牌
            if (this.CheckIfCanSpecialTing(cardAry,buKao))
            {
                bTing = true;
                //获取特殊听牌
                vTingSpecial=this.GetSpecialTingCard(cardAry,buKao);
                //return vResult;
                console.log("听牌长度nei1"+vTingSpecial.length);
            }

            //2、判断是否普通听牌
            if (this.CheckIfCanNormalTing(cardAry))
            {
              
                bTing = true;
                //获取普通听牌
                vTingNormal=this.GetNormalTingCard(cardAry);
                //return vResult;
                console.log("听牌长度nei2"+vTingNormal.length);
            }
            //合并两个听牌集并剔除重复
            //合并两个听牌集
             this.MergeVector(vTingNormal, vTingSpecial);
            //去除重复项
            this.RemoveRepeat(vTingNormal);
            var vrealResult:Array<number> = new Array<number>();
            vrealResult.splice(0,vResult.length);
            for(var i=0;i<vTingNormal.length;i++)
            {
                vrealResult.push(vTingNormal[i]);
            } 
            console.log("听牌长度nei3"+vrealResult.length);
            return vrealResult;
       }
    /**
     * 特特殊听牌：七对……
     */
        private static CheckIfCanSpecialTing(vSrc:Array<number>,bukao:number):boolean{
            //听七对
            if (this.CheckIfTingSevenPair(vSrc))
            {
                return true;
            }
            //听十三烂
            if(this.CheckIfTingShiSanLan(vSrc)){
                //活不靠
                if(bukao == 1)
                {
                    return true;
                }
                if(bukao == 0)
                {//死不靠
                    return this.CheckIfTingSiBuKao(vSrc);
                }
            }

            return false;
        }

        //检查听牌是否为十三烂
        public static CheckIfTingShiSanLan(vSrc:Array<number>,card:number = 0):boolean
        {
            //十三烂必须是门清
            if (13 != vSrc.length)
            {
                return false;
            }
            var handCard:Array<number> = new Array<number>();
            for(let i:number=0; i<vSrc.length; i++){
                handCard.push(vSrc[i]);
            }
            if(card != 0){
                handCard.push(card);
            }
            handCard.sort();
            //1、先将玩家的牌分开
            var vWanCard:Array<number> = new Array<number>();
            var vTongCard:Array<number> = new Array<number>();
            var vTiaoCard:Array<number> = new Array<number>();
            var vZhiCard:Array<number> = new Array<number>();

            JZMJMahjongAlgorithm.spiltHandCard(handCard, vWanCard, vTongCard, vTiaoCard, vZhiCard);

            //检查万筒条是否满足条件
            if(vWanCard.length > 3 || vTongCard.length > 3 || vTiaoCard.length > 3)
            {
                return false;
            }
            if(!this.CheckSingleColor(vWanCard) || !this.CheckSingleColor(vTongCard) || !this.CheckSingleColor(vTiaoCard))
            {
                return false;
            }
            //zhiCard检测
            if (!this.CheckZhiIsSame(vZhiCard))
            {
                return false;
            }
            return true;
        }

        //检查是否听十三烂死不靠
        public static CheckIfTingSiBuKao(vSrc:Array<number>,pai:number = 0):boolean{
            //十三烂必须是门清
            if (13 != vSrc.length)
            {
                return false;
            }
            var handCard:Array<number> = new Array<number>();
            for(let i:number=0; i<vSrc.length; i++){
                handCard.push(vSrc[i]);
            }
            if(pai != 0){
                handCard.push(pai);
            }
            handCard.sort();
            //1、先将玩家的牌分开
            var vWanCard:Array<number> = new Array<number>();
            var vTongCard:Array<number> = new Array<number>();
            var vTiaoCard:Array<number> = new Array<number>();
            var vZhiCard:Array<number> = new Array<number>();

            JZMJMahjongAlgorithm.spiltHandCard(handCard, vWanCard, vTongCard, vTiaoCard, vZhiCard);
            if (vWanCard.length > 3 || vTongCard.length > 3 || vTiaoCard.length > 3)
            {
                return false;
            }
            if(vWanCard.length == 3)
            {
                if (vWanCard[2] - vWanCard[1] != 3 || vWanCard[1] - vWanCard[0] != 3)
                    return false;
            }
            if (vTongCard.length == 3)
            {
                if (vTongCard[2] - vTongCard[1] != 3 || vTongCard[1] - vTongCard[0] != 3)
                    return false;
            }
            if (vTiaoCard.length == 3)
            {
                if (vTiaoCard[2] - vTiaoCard[1] != 3 || vTiaoCard[1] - vTiaoCard[0] != 3)
                    return false;
            }
            if(vWanCard.length == 2)
            {
                if (vWanCard[1] - vWanCard[0] != 3 && vWanCard[1] - vWanCard[0] != 6)
                    return false;
            }
            if (vTongCard.length == 2)
            {
                if (vTongCard[1] - vTongCard[0] != 3 && vTongCard[1] - vTongCard[0] != 6)
                    return false;
            }
            if (vTiaoCard.length == 2)
            {
                if (vTiaoCard[1] - vTiaoCard[0] != 3 && vTiaoCard[1] - vTiaoCard[0] != 6)
                    return false;
            }
            //zhiCard检测
            if (!this.CheckZhiIsSame(vZhiCard))
            {
                return false;
            }
            return true;
        }

        //单花色检测 是否满足十三烂
        private static CheckSingleColor(card:Array<number>):boolean
        {
            if(card.length <= 1)
            {
                return true;
            }
            if(card.length == 2)
            {
                if(card[1] - card[0] > 2)
                    return true;
            }
            if(card.length == 3)
            {
                if (card[2] - card[1] > 2 && card[1] - card[0] > 2)
                    return true;
            }
            return false;
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

         /**
         * 七对
         */
        private static CheckIfTingSevenPair(vSrc:Array<number>):boolean{
            //1、七对子必须门清，即13张牌
            if (vSrc.length != 13)
            {
                return false;
            }
            //七对子
            var wPairCount:number = 0;
            JZMJMahjongAlgorithm.sortCardAry(vSrc);

            var cHashCard:number = 0;

            for (var i:number = 0; i < vSrc.length - 1; i++)
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
            for (var i = 0; i < array.length; i++)
            {
                if (array[i] == obj)
                {
                    return true;
                }
            }
            return false;
        }
        //获取特殊所听牌之牌
        private static GetSpecialTingCard(vSrc:Array<number>,bukao:number):Array<number>{
            //1、七对子
            var vResult:Array<number> = new Array<number>();
            vResult.splice(0,vResult.length);

            if (this.CheckIfTingSevenPair(vSrc))
            {
                //获取七对子所听之牌
                
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
                        vResult.push(vSrc[i]);
                        return vResult;
                    }
                }
                if (vResult.length == 0)
                {
                    vResult.push(vSrc[vSrc.length - 1]);
                    return vResult;
                }
            }

            //2、十三烂
            if ((bukao == 1 && this.CheckIfTingShiSanLan(vSrc))||(bukao == 0 && this.CheckIfTingSiBuKao(vSrc,0)))
            {
                //十三烂必须是门清
                if (13 != vSrc.length)
                {
                    return;
                }
                //字集合
                var ziLsit = [49,50,51,52,53,54,55];

                var handCard:Array<number> = new Array<number>();
                for(let i:number=0; i<vSrc.length; i++){
                    handCard.push(vSrc[i]);
                }

                //1、先将玩家的牌分开
                var vWanCard:Array<number> = new Array<number>();
                var vTongCard:Array<number> = new Array<number>();
                var vTiaoCard:Array<number> = new Array<number>();
                var vZhiCard:Array<number> = new Array<number>();

                JZMJMahjongAlgorithm.spiltHandCard(handCard, vWanCard, vTongCard, vTiaoCard, vZhiCard);

                //添加听字的牌
                for (let i:number = 0; i < 7; i++)
                {
                    if (!this.IfContainsNumber(handCard,ziLsit[i]))
                    {
                        vResult.push(ziLsit[i]);
                    }
                }
                //添加ting万筒条的牌
                var allWanTongTiao = [1,2,3,4,5,6,7,8,9,17,18,19,20,21,22,23,24,25,33,34,35,36,37,38,39,40,41]
               
                for(let i = 0; i < 27; i++)
                {
                    if(bukao == 1)
                    {
                        if (this.CheckIfTingShiSanLan(handCard,allWanTongTiao[i]))
                        {
                            vResult.push(allWanTongTiao[i]);
                        }
                    }
                    if(bukao == 0)
                    {
                        if (this.CheckIfTingSiBuKao(handCard, allWanTongTiao[i]))
                        {
                            vResult.push(allWanTongTiao[i]);
                        }
                    }
                }
            }
            return vResult;
        }

        //判断集合中是否包含某项，注：集合元素是enTinType类型
        public static IfContainsNumber(array:Array<number>,obj:number):boolean{
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
        //针对花牌，以各种情况移除一个组（刻或者顺）后得到的所有可能的序列
        public static GetFigureCardListByRemoveTriple(vectorSourceCard: Array<number>,vectorReturn: Array<Array<number>>): void {
            //初始化一下

            vectorReturn.splice(0,vectorReturn.length);

            if(vectorSourceCard.length < 3) {
                return;
            }

            var vectorCur: Array<number> = new Array<number>();
            vectorCur.splice(0,vectorReturn.length);
            for(var i = 0;i < vectorSourceCard.length - 2;i++) {
                //搜刻
                if(((vectorSourceCard[i] == vectorSourceCard[i + 1]) && (vectorSourceCard[i] == vectorSourceCard[i + 2])))//找到一个刻
                {
                    //除了这个刻的牌，其他牌全部加入到序列集里
                    var vectorFind: Array<number> = new Array<number>();
                    vectorFind.splice(0,vectorReturn.length);
                    for(var j = 0;j < vectorSourceCard.length;j++) {
                        if((j < i) || (j > (i + 2))) {
                            vectorFind.push(vectorSourceCard[j]);
                        }
                    }
                    if(!this.IsSame(vectorCur,vectorFind)) {
                        vectorCur = vectorFind;
                        vectorReturn.push(vectorCur);
                    }
                }

                //搜顺
                var next1Idx = 0;//顺的第二个索引
                var next2Idx = 0;//顺的第三个索引
                for(var k = i + 1;k < vectorSourceCard.length;k++)//(k从i的当前位置+1向后移)
                {
                    if(((this.GetMahjongLogicValue(vectorSourceCard[k]) - this.GetMahjongLogicValue(vectorSourceCard[i])) == 1) && (next1Idx == 0))//找到第一个(例:从233456678中根据3找到4)
                        next1Idx = k;
                    if(((this.GetMahjongLogicValue(vectorSourceCard[k]) - this.GetMahjongLogicValue(vectorSourceCard[i])) == 2) && (next2Idx == 0))//找到第一个(例:从233456678中根据3找到4)
                        next2Idx = k;
                    if((next1Idx != 0) && (next2Idx != 0))
                        break;
                }
                if((next1Idx != 0) && (next2Idx != 0))///找到顺了
                {
                    //注意字牌不存在顺
                    var remFlashList: Array<number> = new Array<number>();
                    for(var j = 0;j < vectorSourceCard.length;j++)//(例:2333577789,)
                    {
                        if((j != i) && (j != next1Idx) && (j != next2Idx)) {
                            remFlashList.push(vectorSourceCard[j]);
                        }
                    }
                    ///将得到的列集加入可能的序列集
                    if(!(this.IsSame(vectorCur,remFlashList))) {
                        vectorCur = remFlashList;
                        vectorReturn.push(remFlashList);
                    }
                }
            }
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

            if(this.GetMahjongColor(vectorCard1[0]) < JZMJMahjongDef.gMahjongColor_Zhi)//万,筒,条
            {
                checkOutTinType1 = this.GetFigureCardTinType(vectorCard1);
            }
            else {
                checkOutTinType1 = this.GetCharFigureCardTinType(vectorCard1);
            }

            var checkOutTinType2: enTinType;///第二个2模式的听牌类型

            if(this.GetMahjongColor(vectorCard2[0]) < JZMJMahjongDef.gMahjongColor_Zhi)//万,筒,条
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

            if(this.GetMahjongColor(vectorCard[0]) < JZMJMahjongDef.gMahjongColor_Zhi)//万,筒,条
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

        //针对字牌，以各种情况移除一个组后得到的所有可能的序列
        public static GetCharCardsListsByRemoveTriple(vectorSourceCard:Array<number>, vectorReturn:Array<Array<number>>):void
        {
            vectorReturn.splice(0, vectorReturn.length);

            if (vectorSourceCard.length < 3)
            {
                return;
            }

            var vectorCur:Array<number> = new Array<number>();
            vectorCur.splice(0, vectorCur.length);

            for (var i = 0; i < vectorSourceCard.length - 2; i++)
            {
                //搜刻
                if (((vectorSourceCard[i] == vectorSourceCard[i + 1]) && (vectorSourceCard[i] == vectorSourceCard[i + 2])))//找到一个刻
                {
                    //除了这个刻的牌，其他牌全部加入到序列集里
                    var vectorFind:Array<number> = new Array<number>();
                    vectorFind.splice(0, vectorFind.length);
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

            if(this.GetMahjongColor(cardVector[0]) < JZMJMahjongDef.gMahjongColor_Zhi)//万,筒,条
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
	}

