import BBMJ_FlowerBase from "./BBMJ_FlowerBase";
import { BBMJ } from "../../ConstDef/BBMJMahjongDef";
import BBMJ_DownSingleFlower from "../single/flower/BBMJ_DownSingleFlower";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_DownFlower extends BBMJ_FlowerBase {


    onLoad() {
        // init logic
        this.init(1);
    }

    /**
     * 刷新牌池牌
     * */
    protected refreshPoolCard(): {x:number,y:number} {
        
        if(this._flowerCard.length < 1) {
            return {x:0,y:0};
        }
        
        // //let columnNum = Math.ceil((this._flowerCard.length - 1) / 10) + 1;//这是牌池牌的计算行数(因为牌池牌有两行)
        // var columnNum = 1;//这是花牌的行数(主要是这个函数是从牌池牌改过来的，为了不大改,所以有这个变量)(又因为花牌只有一行所以值为1就行)

        // let valueIdx: number = 0;
        // let cardIdx: number = this._flowerCard.length;


        
        // for(let i: number = 0;i < columnNum;i++) {
        //     for(let j: number = 0;j < 10;j++) {

        //         if((cardIdx > 0) && (valueIdx < this._cardAry.length)) {

        //             --cardIdx;

        //             this._flowerCard[cardIdx].node.x = (840 + i * 51+26)-640;
        //             this._flowerCard[cardIdx].node.y = 360-(451 - j * 33+22);
        //             this._flowerCard[cardIdx].showCard(this._cardAry[valueIdx]);
        //             ++valueIdx;
                    
        //         } else {
        //             break;
        //         }

        //     }
        // }


        // var locX:number=420;//1092是BBMJ_DownActive里面拷过来的x值
        // var locY:number=197;//21是对家的牌的Y的值(其实里面还应该加上对家牌的高度height，这样才行，只是时间匆忙，没来得及去找牌的高度，到时候再加上)
        if (!BBMJ.ins.iclass.is2D()) {
            for (var i: number = 0; i < this._flowerCard.length; i++) {
                // this._flowerCard[i].node.x=locX;
                // this._flowerCard[i].node.y=locY-i*26;
                //this._flowerCard[i].rotation=-90;
                //this._flowerCard[i].node.zIndex = (this._flowerCard.length-i);
                this._flowerCard[i].node.scale = 1;
                this.DownHua(this._flowerCard[i], i + 1)


                this._flowerCard[i].showCard(this._cardAry[i]);
            }
        } else {
              for (var i: number = 0; i < this._flowerCard.length; i++) {
            this._flowerCard[i].node.x = 420;
            this._flowerCard[i].node.y = 197 - i * 26;
            this._flowerCard[i].showCard(this._cardAry[i]);
            this._flowerCard[i].bmp_cardcolor.node.skewX = 0;
            this._flowerCard[i].bmp_cardcolor.node.skewY = 0;
            this._flowerCard[i].bmp_cardcolor.node.x = -6;
            this._flowerCard[i].bmp_cardcolor.node.y = 8;
            // this._flowerCard[i].bmp_cardcolor.node.scaleX = 0;
             this._flowerCard[i].bmp_cardcolor.node.scaleY = 0.45;
             this._flowerCard[i].node.scale = 0.8;
             this._flowerCard[i].node.zIndex = i+1;
              }
        }


        let lastIdx: number = 0;
        
        let rx: number = this._flowerCard[lastIdx].node.x ;
        let ry: number = this._flowerCard[lastIdx].node.y+ this._flowerCard[lastIdx].size.height / 2;
        return { x: rx,y: ry };
    }
    /**
     * 下家补花位置
     * @param down 下家补花的节点 
     * @param flag 第几个补花
     */
    public DownHua(down:BBMJ_DownSingleFlower, flag: number){
        switch(flag){
            case 1:
                down.node.x = 518;
                down.node.y = -146.3;
                down.node.zIndex = (1);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 67;
                down.bmp_cardback.node.height = 50;
              //  down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_20");

                down.bmp_cardcolor.node.x =-5;
                down.bmp_cardcolor.node.y = 10;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.37;
                down.bmp_cardcolor.node.scaleY = 0.45;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 2:
                down.node.x = 510.5;
                down.node.y = -116.8;
                down.node.zIndex = (2);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 66;
                down.bmp_cardback.node.height = 50;
              //  down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_19");

                down.bmp_cardcolor.node.x =-5;
                down.bmp_cardcolor.node.y = 9;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.36;
                down.bmp_cardcolor.node.scaleY = 0.44;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 3:
                down.node.x = 503;
                down.node.y = -87.8;
                down.node.zIndex = (3);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 64;
                down.bmp_cardback.node.height = 47;
             //   down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_18");

                down.bmp_cardcolor.node.x =-5;
                down.bmp_cardcolor.node.y = 8;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.35;
                down.bmp_cardcolor.node.scaleY = 0.44;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 4:
                down.node.x = 496;
                down.node.y = -61.8;
                down.node.zIndex = (4);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 63;
                down.bmp_cardback.node.height = 47;
            //    down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_17");

                down.bmp_cardcolor.node.x = -5.4;
                down.bmp_cardcolor.node.y = 8.9;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.34;
                down.bmp_cardcolor.node.scaleY = 0.42;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 5:
                down.node.x = 488.6;
                down.node.y = -34.6;
                down.node.zIndex = (5);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 62;
                down.bmp_cardback.node.height = 46;
              //  down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_16");

                down.bmp_cardcolor.node.x = -5.4;
                down.bmp_cardcolor.node.y = 7.8;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.33;
                down.bmp_cardcolor.node.scaleY = 0.42;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 6:
                down.node.x = 482;
                down.node.y = -7.6;
                down.node.zIndex = (6);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 60;
                down.bmp_cardback.node.height = 46;
              //  down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_15");

                down.bmp_cardcolor.node.x = -5.5;
                down.bmp_cardcolor.node.y = 7.6;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.33;
                down.bmp_cardcolor.node.scaleY = 0.4;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 7:
                down.node.x = 475;
                down.node.y = 19;
                down.node.zIndex = (7);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 59;
                down.bmp_cardback.node.height = 44;
            //    down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_14");

                down.bmp_cardcolor.node.x = -5.5;
                down.bmp_cardcolor.node.y = 7.1;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.3;
                down.bmp_cardcolor.node.scaleY = 0.39;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 8:
                down.node.x = 469;
                down.node.y = 43;
                down.node.zIndex = (8);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 58;
                down.bmp_cardback.node.height = 44;
            //    down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_13");

                down.bmp_cardcolor.node.x = -5.5;
                down.bmp_cardcolor.node.y = 8.7;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.3;
                down.bmp_cardcolor.node.scaleY = 0.39;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 9:
                down.node.x = 463;
                down.node.y = 66;
                down.node.zIndex = (9);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 57;
                down.bmp_cardback.node.height = 43;
             //   down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_12");

                down.bmp_cardcolor.node.x = -5.5;
                down.bmp_cardcolor.node.y = 8.2;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.27;
                down.bmp_cardcolor.node.scaleY = 0.39;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 10:
                down.node.x = 457;
                down.node.y = 89;
                down.node.zIndex = (10);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 55;
                down.bmp_cardback.node.height = 43;
             //   down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_11");

                down.bmp_cardcolor.node.x = -5.5;
                down.bmp_cardcolor.node.y = 8;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.28;
                down.bmp_cardcolor.node.scaleY = 0.37;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 11:
                down.node.x = 451;
                down.node.y = 112;
                down.node.zIndex = (11);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 54;
                down.bmp_cardback.node.height = 42;
             //   down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_10");

                down.bmp_cardcolor.node.x = -5.2;
                down.bmp_cardcolor.node.y = 7.9;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.28;
                down.bmp_cardcolor.node.scaleY = 0.36;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 12:
                down.node.x = 445;
                down.node.y = 135;
                down.node.zIndex = (12);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 54;
                down.bmp_cardback.node.height = 41;
             //   down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_09");

                down.bmp_cardcolor.node.x = -5.2;
                down.bmp_cardcolor.node.y = 7.5;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.28;
                down.bmp_cardcolor.node.scaleY = 0.35;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 13:
                down.node.x = 439;
                down.node.y = 158;
                down.node.zIndex = (13);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 53;
                down.bmp_cardback.node.height = 39;
             //   down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_08");

                down.bmp_cardcolor.node.x = -5.2;
                down.bmp_cardcolor.node.y = 6.8;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.27;
                down.bmp_cardcolor.node.scaleY = 0.35;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 14:
                down.node.x = 432.5;
                down.node.y = 181;
                down.node.zIndex = (14);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 52;
                down.bmp_cardback.node.height = 38;
            //    down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_07");

                down.bmp_cardcolor.node.x = -4.8;
                down.bmp_cardcolor.node.y = 6.8;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.27;
                down.bmp_cardcolor.node.scaleY = 0.34;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 15:
                down.node.x = 426;
                down.node.y = 204;
                down.node.zIndex = (15);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 51;
                down.bmp_cardback.node.height = 38;
            //    down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_06");

                down.bmp_cardcolor.node.x = -5.2;
                down.bmp_cardcolor.node.y = 6.8;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.27;
                down.bmp_cardcolor.node.scaleY = 0.34;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 16:
                down.node.x = 420.5;
                down.node.y = 227;
                down.node.zIndex = (16);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 50;
                down.bmp_cardback.node.height = 38;
               // down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_05");

                down.bmp_cardcolor.node.x = -5.2;
                down.bmp_cardcolor.node.y = 6.8;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.27;
                down.bmp_cardcolor.node.scaleY = 0.34;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 17:
                down.node.x = 414.5;
                down.node.y = 250;
                down.node.zIndex = (17);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 50;
                down.bmp_cardback.node.height = 38;
              //  down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_04");

                down.bmp_cardcolor.node.x = -5.6;
                down.bmp_cardcolor.node.y = 6.8;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.26;
                down.bmp_cardcolor.node.scaleY = 0.33;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 18:
                down.node.x = 408;
                down.node.y = 273;
                down.node.zIndex = (18);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 49;
                down.bmp_cardback.node.height = 38;
             //   down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_03");

                down.bmp_cardcolor.node.x = -5.2;
                down.bmp_cardcolor.node.y = 6.8;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.26;
                down.bmp_cardcolor.node.scaleY = 0.32;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 19:
                down.node.x = 402;
                down.node.y = 296;
                down.node.zIndex = (19);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 48;
                down.bmp_cardback.node.height = 38;
             //   down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_02");

                down.bmp_cardcolor.node.x = -5.2;
                down.bmp_cardcolor.node.y = 6.8;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.25;
                down.bmp_cardcolor.node.scaleY = 0.31;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            case 20:
                down.node.x = 396;
                down.node.y = 319;
                down.node.zIndex = (20);

                down.bmp_cardback.node.scaleX = -1;
                down.bmp_cardback.node.x =-7;
                down.bmp_cardback.node.y = 0;
                down.bmp_cardback.node.width = 47;
                down.bmp_cardback.node.height = 38;
             //   down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_01");

                down.bmp_cardcolor.node.x = -5.2;
                down.bmp_cardcolor.node.y = 6.8;
                down.bmp_cardcolor.node.rotation = -90;
                down.bmp_cardcolor.node.scaleX = 0.25;
                down.bmp_cardcolor.node.scaleY = 0.31;
                down.bmp_cardcolor.node.width = 68;
                down.bmp_cardcolor.node.height = 97;
                down.bmp_cardcolor.node.skewY = 12;
            break;

            default:break;
        }
        if(flag%2 == 1){
            down.node.x = 510;
            down.node.y = -146.3;
            down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_20");
            down.node.zIndex = flag+1;
        if(flag>2){
            down.node.x += (flag-2)*4;
            down.node.y += (flag-2)*6;;
        }
        }else{
             down.node.x = 502.5;
             down.node.y = -116.8;
             down.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_left_bh_bg_19");
             down.node.zIndex = flag-1;
                     if(flag>2){
            down.node.x += (flag-3)*4;
            down.node.y += (flag-3)*6;;
        }
        }

       
    }
    

}
