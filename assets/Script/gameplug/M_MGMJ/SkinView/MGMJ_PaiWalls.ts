

const { ccclass, property } = cc._decorator;

@ccclass
export default class MGMJ_PaiWalls extends cc.Component {
    private pai:cc.Sprite[];


    onLoad(){
        this.node.active = true;
        // this.pai = new Array(34);
        // this.node.active = true;
        // this.pai[0] = this.node.getChildByName("ID_PAIQIANG0_MJ0").getComponent<cc.Sprite>(cc.Sprite);
    }
    private startNum = 0;
    private endNum   = 4;
    private me_0  :string = "ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_UP/ID_PAIQIANG0_MJ";
    private me_1  :string = "ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_DOWN/ID_PAIQIANG0_MJ"
    private xia_0 :string = "ID_RIGHTPAI/ID_NODE_PQ1_UP/ID_PAIQIANG1_MJ";
    private xia_1 :string = "ID_RIGHTPAI/ID_NODE_PQ1_DOWN/ID_PAIQIANG1_MJ";
    private dui_0 :string = "ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_UP/ID_PAIQIANG2_MJ";
    private dui_1 :string = "ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_DOWN/ID_PAIQIANG2_MJ"
    private zuo_0 :string = "ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_UP/ID_PAIQIANG3_MJ";
    private zuo_1 :string = "ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_DOWN/ID_PAIQIANG3_MJ";
    private wallFirst_0  : string = "";
    private wallFirst_1  : string = "";
    private wallSecond_0 : string = "";
    private wallSecond_1 : string = "";

    public testPai(bankerChair:number, selfChair:number, szNum:number,startNum,endNum){
        //最后每人取一张牌
        //从自家开始删除
        this.startNum = startNum;
        this.endNum = endNum;
        if(selfChair == bankerChair){
            this.wallFirst_0 = this.me_0;
            this.wallFirst_1 = this.me_1;
            this.wallSecond_0 = this.xia_0;
            this.wallSecond_1 = this.xia_1;
        }else if(selfChair < bankerChair && Math.abs(selfChair - bankerChair) == 1 || selfChair > bankerChair &&  Math.abs(selfChair - bankerChair) == 3){
            this.wallFirst_0 = this.xia_0;
            this.wallFirst_1 = this.xia_1;
            this.wallSecond_0 = this.dui_0;
            this.wallSecond_1 = this.dui_1;
        }else if(selfChair > bankerChair && Math.abs(selfChair - bankerChair) == 1 || selfChair < bankerChair &&  Math.abs(selfChair - bankerChair) == 3){
            this.wallFirst_0 = this.zuo_0;
            this.wallFirst_1 = this.zuo_1;
            this.wallSecond_0 = this.me_0;
            this.wallSecond_1 = this.me_1;
        }else if((selfChair - bankerChair + 4) % 4 == 2){
            this.wallFirst_0 = this.dui_0;
            this.wallFirst_1 = this.dui_1;
            this.wallSecond_0 = this.zuo_0;
            this.wallSecond_1 = this.zuo_1;
        }
        //每次删4张 一共12次 每个人牌墙为34张 能取8次四张
        this.schedule(()=> {
            this.delTest();
        }, 0.08, 12, 0); // 间隔时间 次数-1 延迟时间
    }

    private delTest(){
        cc.log("爱是高科技阿卡公积金呱唧呱唧方法与高圆圆");
        if(this.startNum < 32){
            for(var i=this.startNum;i<this.endNum;i++){
                if(i%2 == 0)
                        cc.find(this.wallFirst_0+i, this.node).active = false;
                    else
                        cc.find(this.wallFirst_1+i, this.node).active = false;
            }
        }
        if(this.startNum == 32){
            //当前牌墙还剩2张牌了
            cc.find(this.wallFirst_0+this.startNum, this.node).active = false;
            cc.find(this.wallFirst_1+(this.startNum+1), this.node).active = false;
            cc.find(this.wallSecond_0+0, this.node).active = false;
            cc.find(this.wallSecond_1+1, this.node).active = false;
        }
        if(this.startNum >= 36){
            //从下家第三张开始删 
            for(var i = this.startNum-34;i<this.endNum-34;i++){
                if(i%2 == 0)
                    cc.find(this.wallSecond_0+i, this.node).active = false;
                else
                    cc.find(this.wallSecond_1+i, this.node).active = false;
            }
        }
        this.startNum += 4;
        this.endNum += 4;
    }

    public delPaiWall (bankerChair:number, selfChair:number, szNum:number){
        if(selfChair == bankerChair){
            this.node.getChildByName("ID_MYPAI").active = false;   
            for(var i=0;i<18;i++){              
                if(i%2 == 0)
                    cc.find("ID_RIGHTPAI/ID_NODE_PQ1_UP/ID_PAIQIANG1_MJ"+i, this.node).active = false;
                else
                    cc.find("ID_RIGHTPAI/ID_NODE_PQ1_DOWN/ID_PAIQIANG1_MJ"+i, this.node).active = false;
            }  
        }else if(selfChair < bankerChair && Math.abs(selfChair - bankerChair) == 1 || selfChair > bankerChair &&  Math.abs(selfChair - bankerChair) == 3){
            this.node.getChildByName("ID_RIGHTPAI").active = false;
            //删18张牌 13*4-17*2 = 18
            for(var i=0;i<18;i++){              
                if(i%2 == 0)
                    cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_UP/ID_PAIQIANG2_MJ"+i, this.node).active = false;
                else
                    cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_DOWN/ID_PAIQIANG2_MJ"+i, this.node).active = false;
            }
        }else if(selfChair > bankerChair && Math.abs(selfChair - bankerChair) == 1 || selfChair < bankerChair &&  Math.abs(selfChair - bankerChair) == 3){
            this.node.getChildByName("ID_LEFTPAI").active = false;
            for(var i=0;i<18;i++){              
                if(i%2 == 0)
                    cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_UP/ID_PAIQIANG0_MJ"+i, this.node).active = false;
                else
                    cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_DOWN/ID_PAIQIANG0_MJ"+i, this.node).active = false;
            }
        }else if((selfChair - bankerChair + 4) % 4 == 2){
            this.node.getChildByName("ID_UPPAI").active = false;
            for(var i=0;i<18;i++){              
                if(i%2 == 0)
                    cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_UP/ID_PAIQIANG3_MJ"+i, this.node).active = false;
                else
                    cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_DOWN/ID_PAIQIANG3_MJ"+i, this.node).active = false;
            }
        }        
    }
    //断线重连 一次性删牌
    public delAllPai(bankerChair:number,selfChair:number,shunPai:number,houPai:number){
        if(selfChair == bankerChair){
            if(shunPai >= 102){//三家牌全部删除
                this.node.getChildByName("ID_MYPAI").active = false;
                this.node.getChildByName("ID_RIGHTPAI").active = false;
                this.node.getChildByName("ID_UPPAI").active = false;
                for(var i=0;i<shunPai-102;i++){
                    if(i%2 == 0)
                        cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_UP/ID_PAIQIANG3_MJ"+i, this.node).active = false;
                    else
                        cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_DOWN/ID_PAIQIANG3_MJ"+i, this.node).active = false;
                }
            }
            if(shunPai < 102 && shunPai >= 68){//两家牌全部删除
                this.node.getChildByName("ID_MYPAI").active = false;
                this.node.getChildByName("ID_RIGHTPAI").active = false;
                for(var i=0;i<shunPai-68;i++){
                    if(i%2 == 0)
                        cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_UP/ID_PAIQIANG2_MJ"+i, this.node).active = false;
                    else
                        cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_DOWN/ID_PAIQIANG2_MJ"+i, this.node).active = false;
                }
            }
            if(shunPai < 68){//一家牌全部删除
                this.node.getChildByName("ID_MYPAI").active = false;
                for(var i=0;i<shunPai-34;i++){              
                    if(i%2 == 0)
                        cc.find("ID_RIGHTPAI/ID_NODE_PQ1_UP/ID_PAIQIANG1_MJ"+i, this.node).active = false;
                    else
                        cc.find("ID_RIGHTPAI/ID_NODE_PQ1_DOWN/ID_PAIQIANG1_MJ"+i, this.node).active = false;
                }        
            }
        }else if(selfChair < bankerChair && Math.abs(selfChair - bankerChair) == 1 || selfChair > bankerChair &&  Math.abs(selfChair - bankerChair) == 3){
            if(shunPai >= 102){//三家牌全部删除
                this.node.getChildByName("ID_RIGHTPAI").active = false;
                this.node.getChildByName("ID_UPPAI").active = false;
                this.node.getChildByName("ID_LEFTPAI").active = false;
                for(var i=0;i<shunPai-102;i++){
                    if(i%2 == 0)
                        cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_UP/ID_PAIQIANG0_MJ"+i, this.node).active = false;
                    else
                        cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_DOWN/ID_PAIQIANG0_MJ"+i, this.node).active = false;
                }
            }
            if(shunPai < 102 && shunPai >= 68){//两家牌全部删除
                this.node.getChildByName("ID_RIGHTPAI").active = false;
                this.node.getChildByName("ID_UPPAI").active = false;
                for(var i=0;i<shunPai-68;i++){
                    if(i%2 == 0)
                        cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_UP/ID_PAIQIANG3_MJ"+i, this.node).active = false;
                    else
                        cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_DOWN/ID_PAIQIANG3_MJ"+i, this.node).active = false;
                }
            }
            if(shunPai < 68){//一家牌全部删除
                this.node.getChildByName("ID_RIGHTPAI").active = false;
                for(var i=0;i<shunPai-34;i++){              
                    if(i%2 == 0)
                        cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_UP/ID_PAIQIANG2_MJ"+i, this.node).active = false;
                    else
                        cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_DOWN/ID_PAIQIANG2_MJ"+i, this.node).active = false;
                }        
            }
        }else if(selfChair > bankerChair && Math.abs(selfChair - bankerChair) == 1 || selfChair < bankerChair &&  Math.abs(selfChair - bankerChair) == 3){
            if(shunPai >= 102){//三家牌全部删除
                this.node.getChildByName("ID_LEFTPAI").active = false;
                this.node.getChildByName("ID_MYPAI").active = false;
                this.node.getChildByName("ID_RIGHTPAI").active = false;
                for(var i=0;i<shunPai-102;i++){
                    if(i%2 == 0)
                        cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_UP/ID_PAIQIANG2_MJ"+i, this.node).active = false;
                    else
                        cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_DOWN/ID_PAIQIANG2_MJ"+i, this.node).active = false;
                }
            }
            if(shunPai < 102 && shunPai >= 68){//两家牌全部删除
                this.node.getChildByName("ID_LEFTPAI").active = false;
                this.node.getChildByName("ID_MYPAI").active = false;
                for(var i=0;i<shunPai-68;i++){
                    if(i%2 == 0)
                        cc.find("ID_RIGHTPAI/ID_NODE_PQ1_UP/ID_PAIQIANG1_MJ"+i, this.node).active = false;
                    else
                        cc.find("ID_RIGHTPAI/ID_NODE_PQ1_DOWN/ID_PAIQIANG1_MJ"+i, this.node).active = false;
                }
            }
            if(shunPai < 68){//一家牌全部删除
                this.node.getChildByName("ID_LEFTPAI").active = false;
                for(var i=0;i<shunPai-34;i++){             
                    if(i%2 == 0)
                        cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_UP/ID_PAIQIANG0_MJ"+i, this.node).active = false;
                    else
                        cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_DOWN/ID_PAIQIANG0_MJ"+i, this.node).active = false;
                }        
            }                   
        }else if((selfChair - bankerChair + 4) % 4 == 2){
            if(shunPai >= 102){//三家牌全部删除
                this.node.getChildByName("ID_UPPAI").active = false;
                this.node.getChildByName("ID_LEFTPAI").active = false;
                this.node.getChildByName("ID_MYPAI").active = false;
                for(var i=0;i<shunPai-102;i++){
                    if(i%2 == 0)
                        cc.find("ID_RIGHTPAI/ID_NODE_PQ1_UP/ID_PAIQIANG1_MJ"+i, this.node).active = false;
                    else
                        cc.find("ID_RIGHTPAI/ID_NODE_PQ1_DOWN/ID_PAIQIANG1_MJ"+i, this.node).active = false;
                }
            }
            if(shunPai < 102 && shunPai >= 68){//两家牌全部删除
                this.node.getChildByName("ID_UPPAI").active = false;
                this.node.getChildByName("ID_LEFTPAI").active = false;
                for(var i=0;i<shunPai-68;i++){
                    if(i%2 == 0)
                        cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_UP/ID_PAIQIANG0_MJ"+i, this.node).active = false;
                    else
                        cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_DOWN/ID_PAIQIANG0_MJ"+i, this.node).active = false;
                }
            }
            if(shunPai < 68){//一家牌全部删除
                this.node.getChildByName("ID_UPPAI").active = false;
                for(var i=0;i<shunPai-34;i++){   
                    if(i%2 == 0)
                        cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_UP/ID_PAIQIANG3_MJ"+i, this.node).active = false;
                    else
                        cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_DOWN/ID_PAIQIANG3_MJ"+i, this.node).active = false;
                }        
            }
        }
        //杠后摸牌 从最后面删 顺序为：32,33,30,31,28,29,26,27
            if(houPai == 0)
                return;
            if(selfChair == bankerChair){
                for(var i=1;i<=houPai;i++){
                    let lastPai;
                    if(i%2==0)
                        lastPai = 35 - i;
                    else
                        lastPai = 33 - i;
                    if(lastPai%2 == 0)              
                        cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_UP/ID_PAIQIANG3_MJ"+lastPai, this.node).active = false;
                    else
                        cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_DOWN/ID_PAIQIANG3_MJ"+lastPai, this.node).active = false;
                }
            }else if(selfChair < bankerChair && Math.abs(selfChair - bankerChair) == 1 || selfChair > bankerChair &&  Math.abs(selfChair - bankerChair) == 3){
                for(var i=1;i<=houPai;i++){
                    let lastPai;
                    if(i%2==0)
                        lastPai = 35 - i;
                    else
                        lastPai = 33 - i;
                    if(lastPai%2 == 0)
                        cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_UP/ID_PAIQIANG0_MJ"+lastPai, this.node).active = false;
                    else
                        cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_DOWN/ID_PAIQIANG0_MJ"+lastPai, this.node).active = false;
                }
                
            }else if(selfChair > bankerChair && Math.abs(selfChair - bankerChair) == 1 || selfChair < bankerChair &&  Math.abs(selfChair - bankerChair) == 3){
                for(var i=1;i<=houPai;i++){
                    let lastPai;
                    if(i%2==0)
                        lastPai = 35 - i;
                    else
                        lastPai = 33 - i;
                    if(lastPai%2 == 0)
                        cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_UP/ID_PAIQIANG2_MJ"+lastPai, this.node).active = false;
                    else
                        cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_DOWN/ID_PAIQIANG2_MJ"+lastPai, this.node).active = false;
                }
            }else if((selfChair - bankerChair + 4) % 4 == 2){
                for(var i=1;i<=houPai;i++){
                    let lastPai;
                    if(i%2==0)
                        lastPai = 35 - i;
                    else
                        lastPai = 33 - i;
                    if(lastPai%2 == 0)
                        cc.find("ID_RIGHTPAI/ID_NODE_PQ1_UP/ID_PAIQIANG1_MJ"+lastPai, this.node).active = false;
                    else
                        cc.find("ID_RIGHTPAI/ID_NODE_PQ1_DOWN/ID_PAIQIANG1_MJ"+lastPai, this.node).active = false;
                }
            }
    }

    //玩家每抓一张牌 从牌蹲删除一张牌
    public delOnePai (selfChair,bankerChair,numUsual,numGang,usual){
        /**
         * 开始游戏时 发了13*4=52张牌 删除到到牌墙还剩 34-（52-34）= 16张
         */
        if(usual){//usual为false 表示杠后摸牌 
            if(numUsual <= 16){
                //接着删除 正在删除的牌墙 从第onePai开始删除
                let onePai = numUsual + 17;        
                if(selfChair == bankerChair){
                    if(onePai%2 == 0)
                        cc.find("ID_RIGHTPAI/ID_NODE_PQ1_UP/ID_PAIQIANG1_MJ"+onePai, this.node).active = false;
                    else
                        cc.find("ID_RIGHTPAI/ID_NODE_PQ1_DOWN/ID_PAIQIANG1_MJ"+onePai, this.node).active = false;
                }else if(selfChair < bankerChair && Math.abs(selfChair - bankerChair) == 1 || selfChair > bankerChair &&  Math.abs(selfChair - bankerChair) == 3){
                    if(onePai%2 == 0)
                        cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_UP/ID_PAIQIANG2_MJ"+onePai, this.node).active = false;
                    else
                        cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_DOWN/ID_PAIQIANG2_MJ"+onePai, this.node).active = false;
                }else if(selfChair > bankerChair && Math.abs(selfChair - bankerChair) == 1 || selfChair < bankerChair &&  Math.abs(selfChair - bankerChair) == 3){
                    if(onePai%2 == 0)
                        cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_UP/ID_PAIQIANG0_MJ"+onePai, this.node).active = false;
                    else
                        cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_DOWN/ID_PAIQIANG0_MJ"+onePai, this.node).active = false;
                }else if((selfChair - bankerChair + 4) % 4 == 2){
                    if(onePai%2 == 0)
                        cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_UP/ID_PAIQIANG3_MJ"+onePai, this.node).active = false;
                    else
                        cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_DOWN/ID_PAIQIANG3_MJ"+onePai, this.node).active = false;
                }
            }
            if(numUsual > 16 && numUsual <= 50){
                //接着删除 从庄家对面那蹲牌开始删除
                let onePai = numUsual - 17;        
                if(selfChair == bankerChair){
                    if(onePai%2 == 0)
                        cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_UP/ID_PAIQIANG2_MJ"+onePai, this.node).active = false;
                    else
                        cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_DOWN/ID_PAIQIANG2_MJ"+onePai, this.node).active = false;
                }else if(selfChair < bankerChair && Math.abs(selfChair - bankerChair) == 1 || selfChair > bankerChair &&  Math.abs(selfChair - bankerChair) == 3){
                    if(onePai%2 == 0)
                        cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_UP/ID_PAIQIANG3_MJ"+onePai, this.node).active = false;
                    else
                        cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_DOWN/ID_PAIQIANG3_MJ"+onePai, this.node).active = false;
                }else if(selfChair > bankerChair && Math.abs(selfChair - bankerChair) == 1 || selfChair < bankerChair &&  Math.abs(selfChair - bankerChair) == 3){
                    if(onePai%2 == 0)
                        cc.find("ID_RIGHTPAI/ID_NODE_PQ1_UP/ID_PAIQIANG1_MJ"+onePai, this.node).active = false;
                    else
                        cc.find("ID_RIGHTPAI/ID_NODE_PQ1_DOWN/ID_PAIQIANG1_MJ"+onePai, this.node).active = false;
                }else if((selfChair - bankerChair + 4) % 4 == 2){
                    if(onePai%2 == 0)
                        cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_UP/ID_PAIQIANG0_MJ"+onePai, this.node).active = false;
                    else
                        cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_DOWN/ID_PAIQIANG0_MJ"+onePai, this.node).active = false;
                }
            }else if(numUsual > 50){
                //从最后一蹲牌开始删除
                let onePai = numUsual - 51;
                if(selfChair == bankerChair){
                    if(onePai%2 == 0)
                        cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_UP/ID_PAIQIANG3_MJ"+onePai, this.node).active = false;
                    else
                        cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_DOWN/ID_PAIQIANG3_MJ"+onePai, this.node).active = false;
                }else if(selfChair < bankerChair && Math.abs(selfChair - bankerChair) == 1 || selfChair > bankerChair &&  Math.abs(selfChair - bankerChair) == 3){
                    if(onePai%2 == 0)
                        cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_UP/ID_PAIQIANG0_MJ"+onePai, this.node).active = false;
                    else
                        cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_DOWN/ID_PAIQIANG0_MJ"+onePai, this.node).active = false;
                }else if(selfChair > bankerChair && Math.abs(selfChair - bankerChair) == 1 || selfChair < bankerChair &&  Math.abs(selfChair - bankerChair) == 3){
                    if(onePai%2 == 0)
                        cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_UP/ID_PAIQIANG2_MJ"+onePai, this.node).active = false;
                    else
                        cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_DOWN/ID_PAIQIANG2_MJ"+onePai, this.node).active = false;
                }else if((selfChair - bankerChair + 4) % 4 == 2){
                    if(onePai%2 == 0)
                        cc.find("ID_RIGHTPAI/ID_NODE_PQ1_UP/ID_PAIQIANG1_MJ"+onePai, this.node).active = false;
                    else
                        cc.find("ID_RIGHTPAI/ID_NODE_PQ1_DOWN/ID_PAIQIANG1_MJ"+onePai, this.node).active = false;
                }
            }            
        }else{//杠后摸牌 从最后面删 顺序为：32,33,30,31,28,29,26,27
            if(numGang == 0)
                return;
            let lastPai;
            if(numGang%2==0)
                lastPai = 35 - numGang;
            else
                lastPai = 33 - numGang;
            if(selfChair == bankerChair){
                if(lastPai%2 == 0)              
                    cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_UP/ID_PAIQIANG3_MJ"+lastPai, this.node).active = false;
                else
                    cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_DOWN/ID_PAIQIANG3_MJ"+lastPai, this.node).active = false;
            }else if(selfChair < bankerChair && Math.abs(selfChair - bankerChair) == 1 || selfChair > bankerChair &&  Math.abs(selfChair - bankerChair) == 3){
                if(lastPai%2 == 0)
                    cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_UP/ID_PAIQIANG0_MJ"+lastPai, this.node).active = false;
                else
                    cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_DOWN/ID_PAIQIANG0_MJ"+lastPai, this.node).active = false;
            }else if(selfChair > bankerChair && Math.abs(selfChair - bankerChair) == 1 || selfChair < bankerChair &&  Math.abs(selfChair - bankerChair) == 3){
                if(lastPai%2 == 0)
                    cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_UP/ID_PAIQIANG2_MJ"+lastPai, this.node).active = false;
                else
                    cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_DOWN/ID_PAIQIANG2_MJ"+lastPai, this.node).active = false;
            }else if((selfChair - bankerChair + 4) % 4 == 2){
                if(lastPai%2 == 0)
                    cc.find("ID_RIGHTPAI/ID_NODE_PQ1_UP/ID_PAIQIANG1_MJ"+lastPai, this.node).active = false;
                else
                    cc.find("ID_RIGHTPAI/ID_NODE_PQ1_DOWN/ID_PAIQIANG1_MJ"+lastPai, this.node).active = false;
            }  
        }
    }

    //玩家点击继续游戏 隐藏所有牌蹲
    public hidePaiWall(){
        for(var i=0;i<34;i++){
            if(i%2 == 0){
                cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_UP/ID_PAIQIANG0_MJ"+i, this.node).active = false;
                cc.find("ID_RIGHTPAI/ID_NODE_PQ1_UP/ID_PAIQIANG1_MJ"+i, this.node).active = false;
                cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_UP/ID_PAIQIANG2_MJ"+i, this.node).active = false;
                cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_UP/ID_PAIQIANG3_MJ"+i, this.node).active = false;
            }else{
                cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_DOWN/ID_PAIQIANG0_MJ"+i, this.node).active = false;
                cc.find("ID_RIGHTPAI/ID_NODE_PQ1_DOWN/ID_PAIQIANG1_MJ"+i, this.node).active = false;
                cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_DOWN/ID_PAIQIANG2_MJ"+i, this.node).active = false;
                cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_DOWN/ID_PAIQIANG3_MJ"+i, this.node).active = false;
            }
        }
    }

    //新的一局开始 重新显示牌蹲
    public showPaiWall(){
        this.node.getChildByName("ID_MYPAI").active = true;
        this.node.getChildByName("ID_RIGHTPAI").active = true;
        this.node.getChildByName("ID_UPPAI").active = true;
        this.node.getChildByName("ID_LEFTPAI").active = true;
        for(var i=0;i<34;i++){
            if(i%2 == 0){
                cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_UP/ID_PAIQIANG0_MJ"+i, this.node).active = true;
                cc.find("ID_RIGHTPAI/ID_NODE_PQ1_UP/ID_PAIQIANG1_MJ"+i, this.node).active = true;
                cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_UP/ID_PAIQIANG2_MJ"+i, this.node).active = true;
                cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_UP/ID_PAIQIANG3_MJ"+i, this.node).active = true;
            }else{
                cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_DOWN/ID_PAIQIANG0_MJ"+i, this.node).active = true;
                cc.find("ID_RIGHTPAI/ID_NODE_PQ1_DOWN/ID_PAIQIANG1_MJ"+i, this.node).active = true;
                cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_DOWN/ID_PAIQIANG2_MJ"+i, this.node).active = true;
                cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_DOWN/ID_PAIQIANG3_MJ"+i, this.node).active = true;
            }
        }                                       
    }

}