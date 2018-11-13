

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_PaiWalls extends cc.Component {
    private pai:cc.Sprite[];


    onLoad(){
        this.node.active = true;
        // this.pai = new Array(34);
        // this.node.active = true;
        // this.pai[0] = this.node.getChildByName("ID_PAIQIANG0_MJ0").getComponent<cc.Sprite>(cc.Sprite);
    }

    public delPaiWall (bankerChair:number, selfChair:number){
        if(selfChair == bankerChair){
            this.node.getChildByName("ID_MYPAI").active = false;   
            for(var i=0;i<24;i++){              
                if(i%2 == 0)
                    cc.find("ID_RIGHTPAI/ID_NODE_PQ1_UP/ID_PAIQIANG1_MJ"+i, this.node).active = false;
                else
                    cc.find("ID_RIGHTPAI/ID_NODE_PQ1_DOWN/ID_PAIQIANG1_MJ"+i, this.node).active = false;
            }        
        }else if(selfChair < bankerChair && Math.abs(selfChair - bankerChair) == 1 || selfChair > bankerChair &&  Math.abs(selfChair - bankerChair) == 3){
            this.node.getChildByName("ID_RIGHTPAI").active = false;
            //删18张牌 13*4-17*2 = 18
            for(var i=0;i<24;i++){              
                if(i%2 == 0)
                    cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_UP/ID_PAIQIANG2_MJ"+i, this.node).active = false;
                else
                    cc.find("ID_UPPAI/ID_NODE_PAIQINAG2/ID_NODE_PQ2_DOWN/ID_PAIQIANG2_MJ"+i, this.node).active = false;
            }
        }else if(selfChair > bankerChair && Math.abs(selfChair - bankerChair) == 1 || selfChair < bankerChair &&  Math.abs(selfChair - bankerChair) == 3){
            this.node.getChildByName("ID_LEFTPAI").active = false;
            for(var i=0;i<24;i++){              
                if(i%2 == 0)
                    cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_UP/ID_PAIQIANG0_MJ"+i, this.node).active = false;
                else
                    cc.find("ID_MYPAI/ID_NODE_PAIQINAG0/ID_NODE_PQ0_DOWN/ID_PAIQIANG0_MJ"+i, this.node).active = false;
            }
        }else if((selfChair - bankerChair + 4) % 4 == 2){
            this.node.getChildByName("ID_UPPAI").active = false;
            for(var i=0;i<24;i++){              
                if(i%2 == 0)
                    cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_UP/ID_PAIQIANG3_MJ"+i, this.node).active = false;
                else
                    cc.find("ID_LEFTPAI/ID_NODE_PAIQINAG3/ID_NODE_PQ3_DOWN/ID_PAIQIANG3_MJ"+i, this.node).active = false;
            }
        }        
    }

    //玩家每抓一张牌 从牌蹲删除一张牌
    public delOnePai (selfChair,bankerChair,numUsual,numGang,usual){
        /**
         * 开始游戏时 发了13*4=52张牌 删除到到牌墙还剩 28-（52-28）= 4张
         */
        if(usual){//usual为false 表示杠后摸牌 
            if(numUsual <= 4){
                //接着删除 正在删除的牌墙 从第onePai开始删除
                let onePai = numUsual + 23;        
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
            if(numUsual > 4 && numUsual <= 32){
                //接着删除 从庄家对面那蹲牌开始删除
                let onePai = numUsual - 5;        
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
            }else if(numUsual > 32){
                //从最后一蹲牌开始删除
                let onePai = numUsual - 33;
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
            let lastPai;
            if(numGang%2==0)
                lastPai = 29 - numGang;
            else
                lastPai = 27 - numGang;

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
        for(var i=0;i<28
        
        ;i++){
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
        for(var i=0;i<28;i++){
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