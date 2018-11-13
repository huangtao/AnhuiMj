
export class CallUMengParam{
    type:string;
}

/**
 * 开始关卡
 */
export class startLevel extends CallUMengParam{
    public constructor(){
        super();
        this.type="startLevel";
    }
    level:string;       //关卡名称
}

export class failLevel extends CallUMengParam{
    public constructor(){
        super();
        this.type="failLevel";
    }
    level:string;       //关卡名称
}

export class finishLevel extends CallUMengParam{
    public constructor(){
        super();
        this.type="finishLevel";
    }
    level:string;       //关卡名称
}

export class pay1 extends CallUMengParam{
    public constructor(){
        super();
        this.type="pay1";
    }

    money:number;       //本次消费金额(非负数)
    coin:number;        //本次消费的等值虚拟币(非负数)
    source:number;      //支付渠道, 1 ~ 99 之间的整数， 1-20 已经被预先定义, 21~99 之间需要在网站设置

}

export class pay2 extends CallUMengParam{
    public constructor(){
        super();
        this.type="pay2";
    }
    money:number        //本次消费的金额(非负数)
    item:string         //购买物品的ID(不能为空)
    number:number;      //购买物品数量(非负数)
    price:number;       //每个物品等值虚拟币的价格(非负数)
    source:number;      //支付渠道 1 ~ 99 之间的整数， 1-20 已经被预先定义, 21~99 之间需要在网站设置
}

export class buy extends CallUMengParam{
    public constructor(){
        super();
        this.type="buy";
    }
    item:string         //购买物品的ID
    number:number;      //购买物品数量
    price:number;       //购买物品的单价(虚拟币)
}
export class use extends CallUMengParam{
    public constructor(){
        super();
        this.type="use";
    }
    item:string         //物品的ID
    number:number;      //物品数量
    price:number;       //物品的单价(虚拟币)
}

/**
 * 针对游戏中额外获得的虚拟币进行统计，比如系统赠送，节日奖励，打怪掉落
 */
export class bonus1 extends CallUMengParam{
    public constructor(){
        super();
        this.type="bonus1";
    }
    coin:number;        //赠送的虚拟币数额
    trigger:number=1;     //触发奖励的事件, 取值在 1~10 之间，“1”已经被预先定义为“系统奖励”， 2~10 需要在网站设置含义
}
/**
 * 针对游戏中额外获得的虚拟币进行统计，比如系统赠送，节日奖励，打怪掉落
 */
export class bonus2 extends CallUMengParam{
    public constructor(){
        super();
        this.type="bonus2";
    }
    item:string;        //奖励物品ID
    number:number;         //奖励物品数量
    price:number;       //物品的虚拟币单价
    trigger:number;     //触发奖励的事件, 取值在 1~10 之间，“1”已经被预先定义为“系统奖励”， 2~10 需要在网站设置含义
}
export class onProfileSignIn1 extends CallUMengParam{
    public constructor(){
        super();
        this.type="onProfileSignIn1";
    }
    ID:string;          //玩家账号ID，长度小于64字节
}
export class onProfileSignIn2 extends CallUMengParam{
    public constructor(){
        super();
        this.type="onProfileSignIn2";
    }
    Provider:string;    //账号来源 不能以下划线"_"开头，使用大写字母和数字标识，长度小于32字节
    ID:string;          //玩家账号ID，长度小于64字节
}
export class onProfileSignOff extends CallUMengParam{
    public constructor(){
        super();
        this.type="onProfileSignOff";
    }
    
}

export class setPlayerLevel extends CallUMengParam{
    public constructor(){
        super();
        this.type="setPlayerLevel";
    }
    level:number        //大于1的整数，最多统计1000个等级
}
export class onEvent1 extends CallUMengParam{
    public constructor(){
        super();
        this.type="onEvent1";
    }
    eventId:string;     //自定义事件id
}
export class onEvent2 extends CallUMengParam{
    public constructor(){
        super();
        this.type="onEvent2";
    }
    eventId:string;     //自定义事件id
    map:any;            //为当前事件的属性和取值（Key-Value键值对）。
}
export class onEventValue extends CallUMengParam{
    public constructor(){
        super();
        this.type="onEventValue";
    }
    id:string;  //事件ID
    m:any;      //为当前事件的属性和取值（Key-Value键值对）
    du:number;  //为当前事件的数值为当前事件的数值，取值范围是-2,147,483,648 到 +2,147,483,647 之间的有符号整数，即int 32类型，如果数据超出了该范围，会造成数据丢包，影响数据统计的准确性。
}