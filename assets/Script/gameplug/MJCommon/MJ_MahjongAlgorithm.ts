export class MahjongDef {
    /**
     * 花色掩码
     * */
    public static gCardMask_color:number = 0xf0;
    /**
     * 数值掩码
     * */
    public static gCardMask_value: number = 0x0f;
    /**
     * 无效的麻将牌数值
     * */
    public static gInvalidMahjongValue: number = 0;
    /**
     * 麻将牌背值
     * */
    public static gBackMahjongValue:number=255;
    /**
     * 无效的椅子号
     * */
    public static gInvalidChar: number = 255;
    /**
     * 活动牌数量
     * */
    public static gCardCount_Active: number = 14;
    /**
     * int最大值
     * */
    public static gIntMaxValue:number= 2147483647;
    /**
     * int最小值
     * */
    public static gIntMinValue:number=-2147483648;
    
    //自己方位逻辑椅子号
    public static gLogicChair_self:number=0;
    //下家方位逻辑椅子号
    public static gLogicChair_down:number=1;
    //对家方位逻辑椅子号
    public static gLogicChair_oppo:number=2;
    //上家方位逻辑椅子号
    public static gLogicChair_up:number=3;

    /**
     * 麻将牌花色:无
     * */
    public static gMahjongColor_Null: number = 0xff;
    /**
     * 麻将牌花色:万
     * */
    public static gMahjongColor_Wan: number = 0;
    /**
     * 麻将牌花色:筒
     * */
    public static gMahjongColor_Tong: number = 1;
    /**
     * 麻将牌花色:条
     * */
    public static gMahjongColor_Tiao: number = 2;
    /**
     * 麻将牌花色:字
     * */
    public static gMahjongColor_Zhi: number = 3;


    /**
     * 投票权限掩码:无
     * */
    public static gVoteRightMask_Null: number = 0x00;
    /**
     * 投票权限掩码:碰
     * */
    public static gVoteRightMask_Peng: number = 0x01;
    /**
     * 投票权限掩码:杠
     * */
    public static gVoteRightMask_Gang: number = 0x02;
    /**
     * 投票权限掩码:胡
     * */
    public static gVoteRightMask_Hu: number = 0x04;
    /**
     * 投票权限掩码:报听
     * */
    //public static gVoteRightMask_BaoTing: number = 0x08;
    /**
     * 投票权限掩码:吃
     * */
    public static gVoteRightMask_Chi: number = 0x08;

    /**
     * 操作权限掩码:无
     * */
    public static gOperateRightMask_Null: number = 0x00;
    /**
     * 操作权限掩码:可杠
     * */
    public static gOperateRightMask_Gang: number = 0x01;
    /**
     * 操作权限掩码:可自摸
     * */
    public static gOperateRightMask_Zimo: number = 0x02;


    /**
     * 投票结果:弃
     * */
    public static gVoteResult_GiveUp: number = 0;
    /**
     * 投票结果:碰
     * */
    public static gVoteResult_Peng: number = 1;
    /**
     * 投票结果:杠
     * */
    public static gVoteResult_Gang: number = 2;
    /**
     * 投票结果:胡
     * */
    public static gVoteResult_Hu: number = 3;
    /**
     * 投票结果:报听
     * */
    public static gVoteResult_BaoTing: number = 4;
    /**
     * 投票结果:报听弃票
     * */
    public static gVoteResult_BaoTingGiveUp: number = 5;
    /**
     * 投票结果:吃
     * */
    public static gVoteResult_Chi: number = 3;
    /**
     * 无投票操作
     * */
    public static gVoteResult_Null: number = 0xff;

    /**
     * 花色掩码数组
     * */
    public static gMahjongColorMask: Array<number> = [0x00,0x10,0x20,0x30];
    /**
     * 自建房间金币场最大底金
     * */
    public static gMaxGoldRoomBaseMoney:number=20000;
}

/**
 * 听牌类型
 * */
export enum enTinType {
    /// <summary>
    /// 不成模式
    /// </summary>
    TinType_Nothing = 0,
    /// <summary>
    /// 成组模式,例如:3万,4万,5万成一组 或者三张东风,都是成一组
    /// </summary>
    TinType_Tirple = 1,
    /// <summary>
    /// 含对模式,例如:3万,4万,5万 两个6万 成为含对模式
    /// </summary>
    TinType_HavePair = 2,
    /// <summary>
    /// 需对模式,例如:3万,4万,5万,7万,8万 成为需对模式(如果要想听牌,必须其他牌组必须含对)
    /// </summary>
    TinType_NeedPair = 3,
    /// <summary>
    /// 自由组合对模式,例如:3万,4万,5万,5万,5万 本身成为自由组合对模式(如果要想听牌,其他牌即可含对,也可需对)
    /// </summary>
    TinType_FreePair = 5,
    /// <summary>
    /// 需成组模式,例如:3万,4万,5万,8万,(如果要想听牌,其他牌必须都成组,所以叫需成组模式)
    /// </summary>
    TinType_OtherTriple = 7,
    /// <summary>
    /// 未知
    /// </summary>
    TinType_Unknown = 13
};

/**
 * 听牌提示
 * */
export class TingCardTip{
    private _tingCard:number;
    private _maxFanNum:number;
    private _leftCardNum:number;
    public constructor(tingCard:number,fanNum:number,leftNum:number){
        this._tingCard = tingCard;
        this._maxFanNum = fanNum;
        this._leftCardNum = leftNum;
    }
    
    /**
     * 听的牌
     * */
    public get tingCard():number{
        return this._tingCard;
    }
    /**
     * 听牌剩余张数
     * */
    public get leftCardNum():number{
        return this._leftCardNum;
    }
    /**
     * 可以胡的最大番数
     * */
    public get maxFanNum():number{
        return this._maxFanNum;
    }
}

/**
 * 麻将打牌玩家
 * */
export class MJOutCardPlayer{
    private _chair:number;
    private _card:number;
    
    public constructor(){
        this.clear();
    }
    
    /**
     * 出牌玩家椅子号
     * */
    public get Chair():number{
        return this._chair;
    }
    
    /**
     * 出牌玩家出的牌
     * */
    public get Card():number{
        return this._card;
    }
        
    /**
     * 玩家打出牌
     * */
    public playerOutCard(chair:number,card:number):void{
        this._chair = chair;
        this._card = card;
    }
    
    /**
     * 是否有效
     * */
    public get isValid():boolean{
        if((MahjongDef.gInvalidChar != this._chair) && (MahjongDef.gInvalidMahjongValue != this._card)){
            return true;
        }
        return false;
    }
    
    /**
     * 清除
     * */
    public clear():void{
        this._chair = MahjongDef.gInvalidChar;
        this._card = MahjongDef.gInvalidMahjongValue;
    }
}


export class MahjongAlgorithm {
    
    //
    //取牌值
    //
    
    /*
        * 取麻将牌花色,0万，1筒，2条，3字
        * */
    public static GetMahjongColor(card:number):number{
        return (card & MahjongDef.gCardMask_color) >> 4;
    }
    /**  
     * 取花色数值,0x00万,0x10筒,0x20条
     * */
    public static GetMahjongColorValue(card:number):number{
        return (card & MahjongDef.gCardMask_color);
    }
    /**
     * 取麻将牌值,1~9,一万==一筒==一条
     * */
    public static GetMahjongValue(card:number):number{
        return (card & MahjongDef.gCardMask_value);
    }
    /**
     * 取麻将牌逻辑数值,取牌逻辑值:万<筒<条<字<花
     * */
    public static GetMahjongLogicValue(card):number{
        return MahjongAlgorithm.GetMahjongColor(card) * 10 + MahjongAlgorithm.GetMahjongValue(card);
    }
    
    /**
     * 检查是否可以碰
     * */
    public static CheckVoteRight_Peng(voteRight:number):boolean{
        return (voteRight & MahjongDef.gVoteRightMask_Peng) > 0;
    }
    /**
     * 检查是否可以杠
     * */
    public static CheckVoteRight_Gang(voteRight: number): boolean {
        return (voteRight & MahjongDef.gVoteRightMask_Gang) > 0;
    }
    /**
     * 检查是否可以胡
     * */
    public static CheckVoteRight_Hu(voteRight: number): boolean {
        return (voteRight & MahjongDef.gVoteRightMask_Hu) > 0;
    }

    /**
     * 检查是否可以报听
     * */
    /*
    public static CheckVoteRight_BaoTing(voteRight: number): boolean {
        return (voteRight & MahjongDef.gVoteRightMask_BaoTing) > 0;
    }
    */
    
    /**
     * 牌阵排序
     * */
    public static sortCardAry(cardAry:Array<number>):void{
        if((null == cardAry) || (cardAry.length < 2)){
            return;
        }
        
        let tempCard : number=0;
        
        for(let i:number=0; i<cardAry.length - 1; i++){
            for(let j:number = i+1; j<cardAry.length; j++){
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
        let idx : number=-1;
        for(let i:number=0; i<delCard.length; i++){
            idx = -1;
            for(let j=0; j<cardAry.length; j++){
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
        for(let i:number=0; i<handCard.length; i++){
            if(color == MahjongAlgorithm.GetMahjongColor(handCard[i])){
                return true;
            }
        }
        return false;
    }
    
    /**
     * 获取花色数量
     * */
    public static getColorNum(handCard: Array<number>):number{
        let colorCard:Array<number> = new Array<number>();
        colorCard.push(0);
        colorCard.push(0);
        colorCard.push(0);
        colorCard.push(0);
        
        for(let i = 0;i < handCard.length; i++) {
            if(MahjongDef.gInvalidMahjongValue == handCard[i]){
                continue;
            }
            colorCard[MahjongAlgorithm.GetMahjongColor(handCard[i])] = 1;
        }
        
        let colorNum : number=0;
        for(let j:number=0; j<colorCard.length; j++){
            colorNum +=colorCard[j];
        }
        
        return colorNum;
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
        
        for(let i:number=0; i<handCard.length; i++){
            if(MahjongDef.gInvalidMahjongValue != handCard[i]){
                switch(MahjongAlgorithm.GetMahjongColor(handCard[i])){
                    case MahjongDef.gMahjongColor_Wan:{
                        if(null != wan){
                            wan.push(handCard[i]);
                        }
                        break;
                    }
                    case MahjongDef.gMahjongColor_Tong:{
                        if(null != tong){
                            tong.push(handCard[i]);
                        }
                        break;
                    }
                    case MahjongDef.gMahjongColor_Tiao:{
                        if(null != tiao){
                            tiao.push(handCard[i]);
                        }
                        break;
                    }
                    case MahjongDef.gMahjongColor_Zhi:{
                        if(null != zhi){
                            zhi.push(handCard[i]);
                        }
                    }
                }
            }
        }
    }
    
    /**
    * 七对
    */
    public static CheckIfTingSevenPair(vSrc: Array<number>): boolean {
        //1、七对子必须门清，即13张牌
        if(vSrc.length != 13) {
            return false;
        }
        //七对子
        let wPairCount: number = 0;
        MahjongAlgorithm.sortCardAry(vSrc);

        let cHashCard: number = 0;

        for(let i: number = 0;i < vSrc.length - 1;i++) {
            if(vSrc[i] == vSrc[i + 1]) {
                i += 1;
                wPairCount++;
                continue;
            }
            else {
                cHashCard = vSrc[i];
            }
        }
        return wPairCount == 6;
    }
    //是否普通听牌
    public static CheckIfCanNormalTing(vSrc: Array<number>): boolean {
        MahjongAlgorithm.sortCardAry(vSrc);

        //1、按花色分拣牌
        let vectorWan: Array<number> = new Array<number>();
        let vectorTong: Array<number> = new Array<number>();
        let vectorTiao: Array<number> = new Array<number>();
        let vectorZhi: Array<number> = new Array<number>();
        MahjongAlgorithm.spiltHandCard(vSrc,vectorWan,vectorTong,vectorTiao,vectorZhi);

        //2、得到各个花色牌的听牌类型
        let wWanTinType: number = <number>this.GetFigureCardTinType(vectorWan);
        let wTongTinType: number = <number>this.GetFigureCardTinType(vectorTong);
        let wTiaoTinType: number = <number>this.GetFigureCardTinType(vectorTiao);
        let wshortTinType:number = <number>this.GetCharFigureCardTinType(vectorZhi);

        //3、组合判断
        //let wTinType: number = wWanTinType * wTongTinType * wTiaoTinType;// * wshortTinType;
        let wTinType: number = wWanTinType * wTongTinType * wTiaoTinType * wshortTinType;

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

    //获取字牌的听牌类型,注意：传入的牌阵需要满足以下条件：
    public static  GetCharFigureCardTinType(vCard:Array<number>):enTinType
    {
        //先排序
        MahjongAlgorithm.sortCardAry(vCard);

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

        
        let vectorGet:Array<Array<number>> = new Array<Array<number>>();
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
            for (let i = 0; i < vectorGet.length; i++)
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
            for (let i = 0; i < vectorGet.length; i++)
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
            for (let i = 0; i < vectorGet.length; i++)
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
        MahjongAlgorithm.sortCardAry(vectorCard);

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
                if((MahjongAlgorithm.GetMahjongLogicValue(vectorCard[1]) - MahjongAlgorithm.GetMahjongLogicValue(vectorCard[0])) < 3)//连张
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
                if(((MahjongAlgorithm.GetMahjongLogicValue(vectorCard[2]) - MahjongAlgorithm.GetMahjongLogicValue(vectorCard[0])) == 2) && ((MahjongAlgorithm.GetMahjongLogicValue(vectorCard[2]) - MahjongAlgorithm.GetMahjongLogicValue(vectorCard[1])) == 1))//一顺
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
                if((MahjongAlgorithm.GetMahjongLogicValue(vectorCard[3]) - MahjongAlgorithm.GetMahjongLogicValue(vectorCard[2])) < 3)//如果后两张是相邻或是相隔
                {
                    return enTinType.TinType_OtherTriple;
                }
                return enTinType.TinType_Nothing;
            }
            //中间两张为一对
            if(vectorCard[1] == vectorCard[2]) {
                if((MahjongAlgorithm.GetMahjongLogicValue(vectorCard[3]) - MahjongAlgorithm.GetMahjongLogicValue(vectorCard[0])) < 3) {
                    return enTinType.TinType_OtherTriple;
                }
                return enTinType.TinType_Nothing;
            }
            //后两张为一对
            if(vectorCard[2] == vectorCard[3]) {
                if((MahjongAlgorithm.GetMahjongLogicValue(vectorCard[1]) - MahjongAlgorithm.GetMahjongLogicValue(vectorCard[0])) < 3) {
                    return enTinType.TinType_OtherTriple;
                }
                return enTinType.TinType_Nothing;
            }

            //到这里，整个牌中就不含有对子了，再检查是否含有顺子情况
            if((MahjongAlgorithm.GetMahjongLogicValue(vectorCard[2]) - MahjongAlgorithm.GetMahjongLogicValue(vectorCard[1])) > 1)//四个散牌的中间两张不紧联，如：34 67
            {
                return enTinType.TinType_Nothing;
            }

            //到这里，四个散牌的中间两张是紧联的，再看能否与左边或右边的一张凑成顺子
            if(((MahjongAlgorithm.GetMahjongLogicValue(vectorCard[1]) - MahjongAlgorithm.GetMahjongLogicValue(vectorCard[0])) < 2) || ((MahjongAlgorithm.GetMahjongLogicValue(vectorCard[3]) - MahjongAlgorithm.GetMahjongLogicValue(vectorCard[2])) < 2)) {
                return enTinType.TinType_OtherTriple;
            }
            return enTinType.TinType_Nothing;
        }

        /*注：
        以下为大数递归,事实上,4张以上可以用递归的方法考察
        其中,6,9,12张就是3模式的递归;7,10,13张就是4模式的递归;5,8,11张就是2模式的递归,(以3取余)
        */

        let vectorGet: Array<Array<number>> = new Array<Array<number>>();
        //针对花牌，以各种情况移除一个组（刻或者顺）后得到的所有可能的序列
        this.GetFigureCardListByRemoveTriple(vectorCard,vectorGet);
        if(vectorGet.length == 0) {
            return enTinType.TinType_Nothing;
        }

        //6，9，12张,可能的牌型为Nothing或Triple
        if(vectorCard.length % 3 == 0) {
            for(let i = 0;i < vectorGet.length;i++) {
                if(this.GetFigureCardTinType(vectorGet[i]) == enTinType.TinType_Tirple) {
                    return enTinType.TinType_Tirple;
                }
            }
            return enTinType.TinType_Nothing;
        }

        //7，10，13张
        if(vectorCard.length % 3 == 1) {
            for(let i = 0;i < vectorGet.length;i++) {
                if(this.GetFigureCardTinType(vectorGet[i]) == enTinType.TinType_OtherTriple) {
                    return enTinType.TinType_OtherTriple;
                }
            }
            return enTinType.TinType_Nothing;
        }

        //5,8,11张
        if(vectorCard.length % 3 == 2) {
            //检查听牌的结果,这里存放枚举值
            let mapCheckResult: Array<enTinType> = new Array<enTinType>();
            //将处理后的子序列全部判型一下,取最好的情况
            for(let i = 0;i < vectorGet.length;i++) {
                let type: enTinType = this.GetFigureCardTinType(vectorGet[i]);
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

        let vectorCur: Array<number> = new Array<number>();
        vectorCur.splice(0,vectorReturn.length);
        for(let i = 0;i < vectorSourceCard.length - 2;i++) {
            //搜刻
            if(((vectorSourceCard[i] == vectorSourceCard[i + 1]) && (vectorSourceCard[i] == vectorSourceCard[i + 2])))//找到一个刻
            {
                //除了这个刻的牌，其他牌全部加入到序列集里
                let vectorFind: Array<number> = new Array<number>();
                vectorFind.splice(0,vectorReturn.length);
                for(let j = 0;j < vectorSourceCard.length;j++) {
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
            let next1Idx = 0;//顺的第二个索引
            let next2Idx = 0;//顺的第三个索引
            for(let k = i + 1;k < vectorSourceCard.length;k++)//(k从i的当前位置+1向后移)
            {
                if(((MahjongAlgorithm.GetMahjongLogicValue(vectorSourceCard[k]) - MahjongAlgorithm.GetMahjongLogicValue(vectorSourceCard[i])) == 1) && (next1Idx == 0))//找到第一个(例:从233456678中根据3找到4)
                    next1Idx = k;
                if(((MahjongAlgorithm.GetMahjongLogicValue(vectorSourceCard[k]) - MahjongAlgorithm.GetMahjongLogicValue(vectorSourceCard[i])) == 2) && (next2Idx == 0))//找到第一个(例:从233456678中根据3找到4)
                    next2Idx = k;
                if((next1Idx != 0) && (next2Idx != 0))
                    break;
            }
            if((next1Idx != 0) && (next2Idx != 0))///找到顺了
            {
                //注意字牌不存在顺
                let remFlashList: Array<number> = new Array<number>();
                for(let j = 0;j < vectorSourceCard.length;j++)//(例:2333577789,)
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
    //判断两个集合是否一样,注：集合元素是number类型
    public static IsSame(array1: Array<number>,array2: Array<number>): boolean {
        if(array1.length != array2.length) {
            return false;
        }
        for(let i = 0;i < array1.length;i++) {
            if(array1[i] != array2[i]) {
                return false;
            }
        }
        return true;
    }
    //判断集合中是否包含某项，注：集合元素是enTinType类型
    public static IsContainsTinType(array: Array<enTinType>,obj: enTinType): boolean {
        for(let i = 0;i < array.length;i++) {
            if(array[i] == obj) {
                return true;
            }
        }
        return false;
    }
    //判断集合中是否包含某项，注：集合元素是enTinType类型
    public static IsContainsNumber(array: Array<number>,obj: number): boolean {
        for(let i = 0;i < array.length;i++) {
            if(array[i] == obj) {
                return true;
            }
        }
        return false;
    }
    //获取特殊所听牌之牌
    public static GetSpecialTingCard(vSrc: Array<number>): Array<number> {
        //1、七对子
        let vResult: Array<number> = new Array<number>();
        vResult.splice(0,vResult.length);

        if(this.CheckIfTingSevenPair(vSrc)) {
            //获取七对子所听之牌

            //七对子
            for(let i = 0;i < vSrc.length - 1;i++) {
                if(vSrc[i] == vSrc[i + 1]) {
                    i += 1;
                    continue;
                }
                else {
                    vResult.push(vSrc[i]);
                    return vResult;
                }
            }
            if(vResult.length == 0) {
                vResult.push(vSrc[vSrc.length - 1]);
            }
            return vResult;
        }
    }
    //获取一个牌阵所听之牌
    public static GetNormalTingCard(vSrc: Array<number>): Array<number> {
        let vResult: Array<number> = new Array<number>();
        vResult.splice(0,vResult.length);
        //1、按花色分拣牌
        //先排序
        MahjongAlgorithm.sortCardAry(vSrc);

        //再分拣

        //如果听牌,只可能两种情况:
        //1,必有一个四模式,其他都是成组的3模式
        //2,两个2模式,其他都是成组的3模式


        //1、按花色分拣牌
        let vectorWan: Array<number> = new Array<number>();
        let vectorTong: Array<number> = new Array<number>();
        let vectorTiao: Array<number> = new Array<number>();
        let vectorZhi: Array<number> = new Array<number>();
        MahjongAlgorithm.spiltHandCard(vSrc,vectorWan,vectorTong,vectorTiao,vectorZhi);


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
    //得到两个2模式的所有听的牌,
    public static GetTwo2ModelTinCards(vectorCard1: Array<number>,vectorCard2: Array<number>): Array<number> {
        let vResult: Array<number> = new Array<number>()
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

        let checkOutTinType1: enTinType;///第一个2模式的听牌类型

        if(this.GetMahjongColor(vectorCard1[0]) < MahjongDef.gMahjongColor_Zhi)//万,筒,条
        {
            checkOutTinType1 = this.GetFigureCardTinType(vectorCard1);
        }
        else {
            checkOutTinType1 = this.GetCharFigureCardTinType(vectorCard1);
        }

        let checkOutTinType2: enTinType;///第二个2模式的听牌类型

        if(this.GetMahjongColor(vectorCard2[0]) < MahjongDef.gMahjongColor_Zhi)//万,筒,条
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
        let vResult: Array<number> = new Array<number>();
        vResult.splice(0,vResult.length);
        if((vectorCard.length % 3) != 2)
            return vResult;

        if(this.GetMahjongColor(vectorCard[0]) != this.GetMahjongColor(vectorCard[vectorCard.length - 1])) //此牌阵不为同一种花色牌
            return vResult;

        if(this.GetMahjongColor(vectorCard[0]) < MahjongDef.gMahjongColor_Zhi)//万,筒,条
        {
            //2张
            if(vectorCard.length == 2) {
                //如果为HavePair(例:22,返回2),如果是NeedPair(例:23,返回14)
                //不用担心,在递归去串过程中,不会将HavePair和NeedPair混淆.
                let results: Array<number> = this.GetTwoCardsRound(vectorCard[0],vectorCard[1]);
                return results;
            }

            let finalResults: Array<number> = new Array<number>();//结果集

            //(调用去顺,再递归)
            let remLists: Array<Array<number>> = new Array<Array<number>>();
            //针对花牌，以各种情况移除一个组（刻或者顺）后得到的所有可能的序列
            this.GetFigureCardListByRemoveTriple(vectorCard,remLists);

            if(remLists.length == 0)
                return vResult;
            for(let i = 0;i < remLists.length;i++) {
                //合并所有听牌集
                let subResults: Array<number> = this.Get2ModelTinCards(remLists[i]);
                finalResults = this.MergeVector(finalResults,subResults);
            }
            return finalResults;
        }
        else//字牌
        {
            //2张
            if (vectorCard.length == 2)
            {
                let results: Array<number> = new Array<number>();
                if (vectorCard[0] == vectorCard[1])
                    results.push(vectorCard[0]);

                return results;
            }
            let finalResults: Array<number> = new Array<number>();//结果集

            //(调用去顺,再递归)
            let remLists:Array<Array<number>> = new Array<Array<number>>();
            this.GetCharCardsListsByRemoveTriple(vectorCard, remLists);

            if (remLists.length == 0)
                return vResult;

            for (let i = 0; i < remLists.length; i++)
            {
                //合并所有听牌集
                let subResults:Array<number> = this.Get2ModelTinCards(remLists[i]);
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

        let vectorCur:Array<number> = new Array<number>();
        vectorCur.splice(0, vectorCur.length);

        for (let i = 0; i < vectorSourceCard.length - 2; i++)
        {
            //搜刻
            if (((vectorSourceCard[i] == vectorSourceCard[i + 1]) && (vectorSourceCard[i] == vectorSourceCard[i + 2])))//找到一个刻
            {
                //除了这个刻的牌，其他牌全部加入到序列集里
                let vectorFind:Array<number> = new Array<number>();
                vectorFind.splice(0, vectorFind.length);
                for (let j = 0; j < vectorSourceCard.length; j++)
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
        let list: Array<number> = new Array<number>();
        //花色不一，不能进行
        if(this.GetMahjongColor(card1) != this.GetMahjongColor(card2)) {
            return list;
        }


        //排序,确保card2>card1
        if(card1 > card2) {
            let change: number = card1;
            card1 = card2;
            card2 = change;
        }

        let cTemp1: number = this.GetMahjongValue(card1);
        let cTemp2: number = this.GetMahjongValue(card2);

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
        let vResult: Array<number> = new Array<number>();
        vResult.splice(0,vResult.length);
        if((cardVector.length % 3) != 1)
            return vResult;

        //排序
        this.sortCardAry(cardVector);

        if(this.GetMahjongColor(cardVector[0]) < MahjongDef.gMahjongColor_Zhi)//万,筒,条
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
                    let round: Array<number> = this.GetTwoCardsRound(cardVector[2],cardVector[3]);
                    this.MergeVector(vResult,round);
                    //排序
                    this.sortCardAry(vResult);
                    return vResult;
                }
                if(cardVector[3] == cardVector[1])///后三张为一刻
                {
                    vResult.push(cardVector[0]);
                    let round: Array<number> = this.GetTwoCardsRound(cardVector[0],cardVector[1]);
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
                    let round: Array<number> = this.GetTwoCardsRound(cardVector[2],cardVector[3]);
                    this.MergeVector(vResult,round);
                    return vResult;
                }
                if((cardVector[2] - cardVector[1]) == 0)///中间两张为一对
                {
                    let round: Array<number> = this.GetTwoCardsRound(cardVector[0],cardVector[3]);
                    this.MergeVector(vResult,round);
                    return vResult;
                }
                if((cardVector[3] - cardVector[2]) == 0)///后两张为一对
                {
                    let round: Array<number> = this.GetTwoCardsRound(cardVector[0],cardVector[1]);
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
            let remLists: Array<Array<number>> = new Array<Array<number>>();
            //针对花牌，以各种情况移除一个组（刻或者顺）后得到的所有可能的序列
            this.GetFigureCardListByRemoveTriple(cardVector,remLists);
            if(remLists.length == 0)
                return vResult;
            for(let i = 0;i < remLists.length;i++) {
                //合并所有听牌集
                let subResults: Array<number> = this.Get1ModelTinCards(remLists[i]);
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
            let remLists:Array<Array<number>> = new Array<Array<number>>();
            this.GetCharCardsListsByRemoveTriple(cardVector, remLists);

            if (remLists.length == 0)
                return vResult;

            for (let i = 0; i < remLists.length; i++)
            {
                ///合并所有听牌集
                //List<byte> subResults = new List<byte>();
                let subResults_zhi: Array<number> = this.Get1ModelTinCards(remLists[i]);
                vResult = this.MergeVector(vResult, subResults_zhi);
            }
            return vResult;
        }
    }
    //合并后剔除重复,所有数据保存在vectorCard1中
    public static MergeVector(vectorCard1: Array<number>,vectorCard2: Array<number>): Array<number> {
        if(vectorCard2.length == 0)
            return vectorCard1;

        for(let i = 0;i < vectorCard2.length;i++) {
            let count = 0;
            for(let j = 0;j < vectorCard1.length;j++) {
                if(vectorCard1[j] == vectorCard2[i])
                    count++;
            }
            if(count == 0)
                vectorCard1.push(vectorCard2[i]);
        }
        this.sortCardAry(vectorCard1)
        this.RemoveRepeat(vectorCard1);
        return vectorCard1;
    }
    //将一个牌阵中重复的删除只保留一个
    public static RemoveRepeat(vSource: Array<number>): void {
        //如果长度小于2，直接返回
        if(vSource.length < 2) {
            return;
        }
        let vReturn: Array<number> = new Array<number>();
        vReturn.splice(0,vReturn.length);

        let wFindCount = 0;
        for(let i = 0;i < vSource.length;i++) {
            wFindCount = 0;
            if(vReturn.length == 0) {
                vReturn.push(vSource[i]);
            }
            else {
                for(let j = 0;j < vReturn.length;j++) {
                    if(vReturn[j] == vSource[i]) {
                        ++wFindCount;
                        break;
                    }
                }
                if(0 == wFindCount) {
                    vReturn.push(vSource[i]);
                }
            }
        }
        vSource.splice(0,vSource.length);
        for(let i = 0;i < vReturn.length;i++) {
            vSource.push(vReturn[i]);
        }
    }
    
    /// <summary>
    /// 检查指定牌是否是将牌:2,5,8的非字牌
    /// </summary>
    /// <param name="checkCard"></param>
    /// <returns></returns>
    public static CheckIsJiangCard(checkCard: number): boolean {
        if(MahjongDef.gMahjongColor_Zhi == MahjongAlgorithm.GetMahjongColor(checkCard)) {
            return false;
        }

        if((2 == MahjongAlgorithm.GetMahjongValue(checkCard)) ||
            (5 == MahjongAlgorithm.GetMahjongValue(checkCard)) ||
            (8 == MahjongAlgorithm.GetMahjongValue(checkCard))) {
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
        if(MahjongDef.gMahjongColor_Zhi == MahjongAlgorithm.GetMahjongColor(checkCard)) {
            return false;
        }

        if((1 == MahjongAlgorithm.GetMahjongValue(checkCard)) ||
            (9 == MahjongAlgorithm.GetMahjongValue(checkCard))) {
            return true;
        }

        return false;
    }
}