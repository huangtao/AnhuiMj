import LHZMJ_FlowerBase from "./LHZMJ_FlowerBase";
import { LHZMJ } from "../../ConstDef/LHZMJMahjongDef";
import LHZMJ_SelfSingleFlower from "../single/flower/LHZMJ_SelfSingleFlower";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_SelfFlower extends LHZMJ_FlowerBase {

    

    onLoad() {
        // init logic
        this.init(0);
    }
    

    /**
     * 刷新牌池牌(就是给牌摆位置)
     * */
    protected refreshPoolCard():{x:number,y:number} {
        
        if(this._flowerCard.length < 1){
            return {x:0,y:0};
        }
        console.log(`己方花牌数量：${this._flowerCard.length}`);

        var lastIdx:number=0;
        
        //var lineNum = Math.ceil((this._flowerCard.length - 1) / 10) + 1;//这是牌池牌的计算行数(因为牌池牌有两行)
        var lineNum = 1;//这是花牌的行数(主要是这个函数是从牌池牌改过来的，为了不大改,所以有这个变量)(又因为花牌只有一行所以值为1就行)




        // var locX=369;//1099是下家的活动牌x位置
        // var locY=-188;//selfActive.lastCardPos.y-50;//593是从LHZMJ_SelfActive里面考过来的y值

        // for(var i: number = 0;i < lineNum;i++) {
        //     for(var j: number = 0;j < this._flowerCard.length;j++) {
        //         if((i * 10 + j) < this._flowerCard.length) {

        //             this._flowerCard[i * 10 + j].showCard(this._cardAry[i * 10 + j]);
        //             // this._flowerCard[i * 10 + j].node.x = 449 + j * 38;
        //             // this._flowerCard[i * 10 + j].node.y = 394 + i * 46;
        //             this._flowerCard[i * 10 + j].node.x =locX-30*i ;
        //             this._flowerCard[i * 10 + j].node.y =locY ;

        //         } else {
        //             break;
        //         }
        //     }
        // }

        for(var i=0;i<this._flowerCard.length;i++){
            this.SelfHua(this._flowerCard[i],i+1)
            this._flowerCard[i].showCard(this._cardAry[i]);
            // this._flowerCard[i].node.x=locX-30*i ;
            // this._flowerCard[i].node.y =locY ;
        }

        lastIdx = this._flowerCard.length - 1;
        
        
        var rx: number = this._flowerCard[lastIdx].node.x;// + this._flowerCard[lastIdx].size.width / 2;
        var ry: number = this._flowerCard[lastIdx].node.y+ this._flowerCard[lastIdx].size.height / 2;
        return { x: rx,y: ry };
    }
    /**
     * 自己补花位置
     * @param self 自己补花的节点 
     * @param flag 第几个补花
     */
    public SelfHua(self: LHZMJ_SelfSingleFlower, flag: number){
        switch(flag){
            case 1:
                self.node.x = 503.7;
                self.node.y = -209;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(1);

                self.bmp_cardback.node.scaleX = 1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_01");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = -9;
            break;

            case 2:
                self.node.x = 450.5;
                self.node.y = -209;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(2);

                self.bmp_cardback.node.scaleX = 1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_02");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = -8;
            break;

            case 3:
                self.node.x = 397.9;
                self.node.y = -209;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(3);

                self.bmp_cardback.node.scaleX = 1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_03");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = -7;
            break;

            case 4:
                self.node.x = 345.2;
                self.node.y = -209;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(4);

                self.bmp_cardback.node.scaleX = 1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_04");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = -6;
            break;

            case 5:
                self.node.x = 291.2;
                self.node.y = -209;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(5);

                self.bmp_cardback.node.scaleX = 1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_05");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = -4.5;
            break;

            case 6:
                self.node.x = 236.7;
                self.node.y = -209;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(6);

                self.bmp_cardback.node.scaleX = 1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_06");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = -2.8;
            break;

            case 7:
                self.node.x = 183.7;
                self.node.y = -209;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(7);

                self.bmp_cardback.node.scaleX = 1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_07");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = -2;
            break;

            case 8:
                self.node.x = 130.5;
                self.node.y = -208;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(8);

                self.bmp_cardback.node.scaleX = 1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_08");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = -1.8;
            break;

            case 9:
                self.node.x = 78.2;
                self.node.y = -208;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(9);

                self.bmp_cardback.node.scaleX = 1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_09");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = -0.8;
            break;

            case 10:
                self.node.x = 25.2;
                self.node.y = -208;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(10);

                self.bmp_cardback.node.scaleX = 1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_10");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = 0;
            break;

            case 11:
                self.node.x = -26.7;
                self.node.y = -208;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(20);

                self.bmp_cardback.node.scaleX = -1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_10");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = 0;
            break;

            case 12:
                self.node.x = -79.7;
                self.node.y = -208;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(19);

                self.bmp_cardback.node.scaleX = -1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_09");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = 0.8;
            break;

            case 13:
                self.node.x = -131.5;
                self.node.y = -209;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(18);

                self.bmp_cardback.node.scaleX = -1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_08");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = 1.8;
            break;

            case 14:
                self.node.x = -184.5;
                self.node.y = -209;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(17);

                self.bmp_cardback.node.scaleX = -1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_07");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = 2;
            break;

            case 15:
                self.node.x = -238;
                self.node.y = -209;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(16);

                self.bmp_cardback.node.scaleX = -1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_06");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = 2.8;
            break;

            case 16:
                self.node.x = -292.5;
                self.node.y = -209;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(15);

                self.bmp_cardback.node.scaleX = -1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_05");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = 4.5;
            break;

            case 17:
                self.node.x = -346.5;
                self.node.y = -209;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(14);

                self.bmp_cardback.node.scaleX = -1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_04");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = 6;
            break;

            case 18:
                self.node.x = -399.3;
                self.node.y = -209;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(13);

                self.bmp_cardback.node.scaleX = -1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_03");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = 7;
            break;

            case 19:
                self.node.x = -451.8;
                self.node.y = -209;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(12);

                self.bmp_cardback.node.scaleX = -1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_02");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = 8;
            break;

            case 20:
                self.node.x = -505;
                self.node.y = -209;
                self.node.width = 88;
                self.node.height = 119;
                self.node.setLocalZOrder(11);

                self.bmp_cardback.node.scaleX = -1;
                self.bmp_cardback.node.x = 0;
                self.bmp_cardback.node.y = 0;
                self.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_btm_bh_01");

                self.bmp_cardcolor.node.x = -0.4;
                self.bmp_cardcolor.node.y = 12;
                self.bmp_cardcolor.node.scaleX = 0.65;
                self.bmp_cardcolor.node.scaleY = 0.4;
                self.bmp_cardcolor.node.width = 68;
                self.bmp_cardcolor.node.height = 97;
                self.bmp_cardcolor.node.skewX = 9;
            break;

            default:break;
        }
    }
}
