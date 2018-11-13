import LHZMJ_FlowerBase from "./LHZMJ_FlowerBase";
import { LHZMJ } from "../../ConstDef/LHZMJMahjongDef";
import LHZMJ_UpSingleFlower from "../single/flower/LHZMJ_UpSingleFlower";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_UpFlower extends LHZMJ_FlowerBase {

    

    onLoad() {
        // init logic
        this.init(3);
    }

    /**
     * 刷新牌池牌
     * */
    protected refreshPoolCard(): {x:number,y:number} {
        if(this._flowerCard.length < 1) {
            return {x:0,y:0};
        }
        
        

        // var locX:number=-425;//140是LHZMJ_UpActive里面拷过来的x值(从理论上说还得加上LHZMJ_UpActive里面麻将的宽度)
        // var locY:number=-133;//21是对家的牌的Y的值(其实里面还应该加上对家牌的高度height，这样才行，只是时间匆忙，没来得及去找牌的高度，到时候再加上)

        for(var i:number=0;i<this._flowerCard.length;i++){
            // this._flowerCard[i].node.x=locX;
            // this._flowerCard[i].node.y=locY+i*26;
            //this._flowerCard[i].node.setLocalZOrder(this._flowerCard.length-i);
            this.UpHua(this._flowerCard[i],i+1);
            this._flowerCard[i].showCard(this._cardAry[i]);
        }

        // for(var i:number=this._flowerCard.length-1;i>=0;i--){//这样摆牌应该不行
        //     this._flowerCard[i].node.x=locX;
        //     this._flowerCard[i].node.y=locY+i*26;
        //     this._flowerCard[i].showCard(this._cardAry[i]);
        // }


        var lastIdx: number = this._flowerCard.length - 1;
        
        var rx: number = this._flowerCard[lastIdx].node.x ;
        var ry: number = this._flowerCard[lastIdx].node.y+ this._flowerCard[lastIdx].size.height / 2;
        return { x: rx,y: ry };
    }
    /**
     * 上家补花位置
     * @param up 下家补花的节点 
     * @param flag 第几个补花
     */
    public UpHua(up: LHZMJ_UpSingleFlower, flag: number){
        switch(flag){
            case 1:
                up.node.x = -518;
                up.node.y = -164.3;
                up.node.setLocalZOrder(20);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 67;
                up.bmp_cardback.node.height = 50;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_20");

                up.bmp_cardcolor.node.x = 0;
                up.bmp_cardcolor.node.y = 10;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.37;
                up.bmp_cardcolor.node.scaleY = 0.45;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 2:
                up.node.x = -510.5;
                up.node.y = -134.8;
                up.node.setLocalZOrder(19);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 66;
                up.bmp_cardback.node.height = 50;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_19");

                up.bmp_cardcolor.node.x = 0;
                up.bmp_cardcolor.node.y = 9;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.36;
                up.bmp_cardcolor.node.scaleY = 0.44;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 3:
                up.node.x = -503;
                up.node.y = -105.8;
                up.node.setLocalZOrder(18);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 64;
                up.bmp_cardback.node.height = 47;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_18");

                up.bmp_cardcolor.node.x = 0;
                up.bmp_cardcolor.node.y = 8;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.35;
                up.bmp_cardcolor.node.scaleY = 0.44;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 4:
                up.node.x = -496;
                up.node.y = -79.8;
                up.node.setLocalZOrder(17);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 63;
                up.bmp_cardback.node.height = 47;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_17");

                up.bmp_cardcolor.node.x = 0.4;
                up.bmp_cardcolor.node.y = 8.9;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.34;
                up.bmp_cardcolor.node.scaleY = 0.42;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 5:
                up.node.x = -487.6;
                up.node.y = -52.6;
                up.node.setLocalZOrder(16);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 62;
                up.bmp_cardback.node.height = 46;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_16");

                up.bmp_cardcolor.node.x = 0.4;
                up.bmp_cardcolor.node.y = 7.8;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.33;
                up.bmp_cardcolor.node.scaleY = 0.42;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 6:
                up.node.x = -482;
                up.node.y = -25.6;
                up.node.setLocalZOrder(15);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 60;
                up.bmp_cardback.node.height = 46;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_15");

                up.bmp_cardcolor.node.x = 0.5;
                up.bmp_cardcolor.node.y = 7.6;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.33;
                up.bmp_cardcolor.node.scaleY = 0.4;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 7:
                up.node.x = -475;
                up.node.y = 1;
                up.node.setLocalZOrder(14);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 59;
                up.bmp_cardback.node.height = 44;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_14");

                up.bmp_cardcolor.node.x = 0.5;
                up.bmp_cardcolor.node.y = 7.1;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.3;
                up.bmp_cardcolor.node.scaleY = 0.39;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 8:
                up.node.x = -469;
                up.node.y = 25;
                up.node.setLocalZOrder(13);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 58;
                up.bmp_cardback.node.height = 44;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_13");

                up.bmp_cardcolor.node.x = 0.5;
                up.bmp_cardcolor.node.y = 8.7;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.3;
                up.bmp_cardcolor.node.scaleY = 0.39;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 9:
                up.node.x = -463;
                up.node.y = 48;
                up.node.setLocalZOrder(12);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 57;
                up.bmp_cardback.node.height = 43;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_12");

                up.bmp_cardcolor.node.x = 0.5;
                up.bmp_cardcolor.node.y = 8.2;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.27;
                up.bmp_cardcolor.node.scaleY = 0.39;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 10:
                up.node.x = -457;
                up.node.y = 71;
                up.node.setLocalZOrder(11);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 55;
                up.bmp_cardback.node.height = 43;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_11");

                up.bmp_cardcolor.node.x = 0.5;
                up.bmp_cardcolor.node.y = 8;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.28;
                up.bmp_cardcolor.node.scaleY = 0.37;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 11:
                up.node.x = -451;
                up.node.y = 94;
                up.node.setLocalZOrder(10);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 54;
                up.bmp_cardback.node.height = 42;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_10");

                up.bmp_cardcolor.node.x = 0.2;
                up.bmp_cardcolor.node.y = 7.9;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.28;
                up.bmp_cardcolor.node.scaleY = 0.36;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 12:
                up.node.x = -445;
                up.node.y = 117;
                up.node.setLocalZOrder(9);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 54;
                up.bmp_cardback.node.height = 41;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_09");

                up.bmp_cardcolor.node.x = 0.2;
                up.bmp_cardcolor.node.y = 7.5;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.28;
                up.bmp_cardcolor.node.scaleY = 0.35;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 13:
                up.node.x = -439;
                up.node.y = 140;
                up.node.setLocalZOrder(8);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 53;
                up.bmp_cardback.node.height = 39;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_08");

                up.bmp_cardcolor.node.x = 0.2;
                up.bmp_cardcolor.node.y = 6.8;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.27;
                up.bmp_cardcolor.node.scaleY = 0.35;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 14:
                up.node.x = -432.5;
                up.node.y = 163;
                up.node.setLocalZOrder(7);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 52;
                up.bmp_cardback.node.height = 38;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_07");

                up.bmp_cardcolor.node.x = -0.2;
                up.bmp_cardcolor.node.y = 6.8;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.27;
                up.bmp_cardcolor.node.scaleY = 0.34;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 15:
                up.node.x = -426;
                up.node.y = 186;
                up.node.setLocalZOrder(6);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 51;
                up.bmp_cardback.node.height = 38;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_06");

                up.bmp_cardcolor.node.x = 0.2;
                up.bmp_cardcolor.node.y = 6.8;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.27;
                up.bmp_cardcolor.node.scaleY = 0.34;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 16:
                up.node.x = -420.5;
                up.node.y = 209;
                up.node.setLocalZOrder(5);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 50;
                up.bmp_cardback.node.height = 38;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_05");

                up.bmp_cardcolor.node.x = 0.2;
                up.bmp_cardcolor.node.y = 6.8;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.27;
                up.bmp_cardcolor.node.scaleY = 0.34;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 17:
                up.node.x = -414.5;
                up.node.y = 232;
                up.node.setLocalZOrder(4);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 50;
                up.bmp_cardback.node.height = 38;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_04");

                up.bmp_cardcolor.node.x = 0.6;
                up.bmp_cardcolor.node.y = 6.8;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.26;
                up.bmp_cardcolor.node.scaleY = 0.33;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 18:
                up.node.x = -408;
                up.node.y = 255;
                up.node.setLocalZOrder(3);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 49;
                up.bmp_cardback.node.height = 38;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_03");

                up.bmp_cardcolor.node.x = 0.2;
                up.bmp_cardcolor.node.y = 6.8;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.26;
                up.bmp_cardcolor.node.scaleY = 0.32;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 19:
                up.node.x = -402;
                up.node.y = 278;
                up.node.setLocalZOrder(2);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 48;
                up.bmp_cardback.node.height = 38;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_02");

                up.bmp_cardcolor.node.x = 0.2;
                up.bmp_cardcolor.node.y = 6.8;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.25;
                up.bmp_cardcolor.node.scaleY = 0.31;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            case 20:
                up.node.x = -396;
                up.node.y = 301;
                up.node.setLocalZOrder(1);

                up.bmp_cardback.node.scaleX = 1;
                up.bmp_cardback.node.x = 2;
                up.bmp_cardback.node.y = 0;
                up.bmp_cardback.node.width = 47;
                up.bmp_cardback.node.height = 38;
                up.bmp_cardback.spriteFrame = LHZMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_01");

                up.bmp_cardcolor.node.x = 0.2;
                up.bmp_cardcolor.node.y = 6.8;
                up.bmp_cardcolor.node.rotation = 90;
                up.bmp_cardcolor.node.scaleX = 0.25;
                up.bmp_cardcolor.node.scaleY = 0.31;
                up.bmp_cardcolor.node.width = 68;
                up.bmp_cardcolor.node.height = 97;
                up.bmp_cardcolor.node.skewY = -12;
            break;

            default:break;
        }
    }
}
