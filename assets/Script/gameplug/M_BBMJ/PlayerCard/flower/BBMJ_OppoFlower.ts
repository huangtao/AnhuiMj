import BBMJ_FlowerBase from "./BBMJ_FlowerBase";
import { BBMJ } from "../../ConstDef/BBMJMahjongDef";
import BBMJ_OppoSingleFlower from "../single/flower/BBMJ_OppoSingleFlower";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_OppoFlower extends BBMJ_FlowerBase {

    

    onLoad() {
        // init logic
        this.init(2);
    }

    /**
     * 刷新牌池牌
     * */
    protected refreshPoolCard(): {x:number,y:number} {
        
        if(this._flowerCard.length < 1) {
            return {x:0,y:0};
        }
        
        // var lineNum = Math.ceil((this._flowerCard.length - 1) / 10) + 1;
        // var valueIdx: number = 0;
        // var cardIdx: number = this._flowerCard.length;

        // for(var i: number = 0;i < lineNum;i++) {
        //     for(var j: number = 0;j < 10;j++) {

        //         if((cardIdx > 0) && (valueIdx < this._cardAry.length)) {

        //             --cardIdx;

        //             this._flowerCard[cardIdx].node.x = (791 - j * 38+19)-640;
        //             this._flowerCard[cardIdx].node.y = 360-(200 - i * 46+29);
        //             this._flowerCard[cardIdx].showCard(this._cardAry[valueIdx]);

        //             ++valueIdx;
                    
        //         } else {
        //             break;
        //         }

        //     }
        // }

        // var locX:number=-180;//140是BBMJ_UpActive里面拷过来的x值(从理论上说还得加上BBMJ_UpActive里面麻将的宽度)
        // var locY:number=238;//21是对家的牌的Y的值(其实里面还应该加上对家牌的高度height，这样才行，只是时间匆忙，没来得及去找牌的高度，到时候再加上)
        if (!BBMJ.ins.iclass.is2D()) {
            for (var i: number = 0; i < this._flowerCard.length; i++) {
                // this._flowerCard[i].node.x=locX+i*30;
                // this._flowerCard[i].node.y=locY;
                this._flowerCard[i].node.scale = 1;
                this.OppoHua(this._flowerCard[i], i + 1)
                this._flowerCard[i].showCard(this._cardAry[i]);
            }

        } else {
            for (var i: number = 0; i < this._flowerCard.length; i++) {
                this._flowerCard[i].node.x = -180 + i * 30;
                this._flowerCard[i].node.y = 238;
                this._flowerCard[i].showCard(this._cardAry[i]);
                            this._flowerCard[i].bmp_cardcolor.node.skewX = 0;
            this._flowerCard[i].bmp_cardcolor.node.skewY = 0;
                        this._flowerCard[i].bmp_cardcolor.node.x = 0;
            this._flowerCard[i].bmp_cardcolor.node.y = 0;
            // this._flowerCard[i].bmp_cardcolor.node.scaleX = 0;
             this._flowerCard[i].bmp_cardcolor.node.scaleY = 0.4;
             this._flowerCard[i].node.scale = 0.8;
            }
        }


        

        var lastIdx = 0;
        
        var rx: number = this._flowerCard[lastIdx].node.x;
        var ry: number = this._flowerCard[lastIdx].node.y + this._flowerCard[lastIdx].size.height / 2;
        return { x: rx,y: ry };
    }
     /**
     * 对家补花位置
     * @param oppo 对家补花的节点 
     * @param flag 第几个补花
     */
    public OppoHua(oppo: BBMJ_OppoSingleFlower, flag: number){
        switch(flag){
            case 1:
                oppo.node.x = -320.7;
                oppo.node.y = 240;
                oppo.node.zIndex = (1);

                oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 46;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_01");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 14.5;
            break;

            case 2:
                oppo.node.x = -287.5;
                oppo.node.y = 239.5;
                oppo.node.zIndex = (2);

                oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 45;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_02");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 12.5;
            break;

            case 3:
                oppo.node.x = -254.9;
                oppo.node.y = 239.5;
                oppo.node.zIndex = (3);

                oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 46;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_01");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 14.5;
            break;

            case 4:
                oppo.node.x = -220.9;
                oppo.node.y = 239.5;
                oppo.node.zIndex = (4);

                oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 45;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_02");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 12.5;
            break;

            case 5:
                oppo.node.x = -187;
                oppo.node.y = 239.5;
                oppo.node.zIndex = (5);

                oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 46;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_01");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 14.5;
            break;

            case 6:
                oppo.node.x = -152.5;
                oppo.node.y = 239.5;
                oppo.node.zIndex = (6);

                oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 45;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_02");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 12.5;
            break;

            case 7:
                oppo.node.x = -118;
                oppo.node.y = 239.5;
                oppo.node.zIndex = (7);

               oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 46;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_01");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 14.5;
            break;

            case 8:
                oppo.node.x = -84.4;
                oppo.node.y = 239.5;
                oppo.node.zIndex = (8);

                oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 45;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_02");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 12.5;
            break;

            case 9:
                oppo.node.x = -50.4;
                oppo.node.y = 239.5;
                oppo.node.zIndex = (9);

                 oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 46;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_01");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 14.5;
            break;

            case 10:
                oppo.node.x = -17.2;
                oppo.node.y = 239;
                oppo.node.zIndex = (10);

                oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 45;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_02");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 12.5;
            break;

            case 11:
                oppo.node.x = 17;
                oppo.node.y = 239;
                oppo.node.zIndex = (20);

                 oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 46;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_01");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 14.5;
            break;

            case 12:
                oppo.node.x = 50;
                oppo.node.y = 239.5;
                oppo.node.zIndex = (19);

               oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 45;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_02");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 12.5;
            break;

            case 13:
                oppo.node.x = 83.7;
                oppo.node.y = 239.5;
                oppo.node.zIndex = (18);

                 oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 46;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_01");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 14.5;
            break;

            case 14:
                oppo.node.x = 117.1;
                oppo.node.y = 239.5;
                oppo.node.zIndex = (17);

                oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 45;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_02");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 12.5;
            break;

            case 15:
                oppo.node.x = 151.5;
                oppo.node.y = 239.5;
                oppo.node.zIndex = (16);

                 oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 46;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_01");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 14.5;
            break;

            case 16:
                oppo.node.x = 185.6;
                oppo.node.y = 239.5;
                oppo.node.zIndex = (15);

                oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 45;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_02");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 12.5;
            break;

            case 17:
                oppo.node.x = 219.7;
                oppo.node.y = 239.5;
                oppo.node.zIndex = (14);

                 oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 46;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_01");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 14.5;
            break;

            case 18:
                oppo.node.x = 253.5;
                oppo.node.y = 239.5;
                oppo.node.zIndex = (13);

                oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 45;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_02");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 12.5;
            break;

            case 19:
                oppo.node.x = 286.2;
                oppo.node.y = 239.5;
                oppo.node.zIndex = (12);

                 oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 46;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_01");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 14.5;
            break;

            case 20:
                oppo.node.x = 319.8;
                oppo.node.y = 239.5;
                oppo.node.zIndex = (11);

                oppo.bmp_cardback.node.scaleX = -1;
                oppo.bmp_cardback.node.x = 0;
                oppo.bmp_cardback.node.y = -5;
                oppo.bmp_cardback.node.width = 45;
                oppo.bmp_cardback.node.height = 46;
                oppo.bmp_cardback.spriteFrame = BBMJ.ins.iclass.getMahjong3DPaiBeiRes("d_top_bh_02");

                oppo.bmp_cardcolor.node.x = 0;
                oppo.bmp_cardcolor.node.y = 3.7;
                oppo.bmp_cardcolor.node.rotation = 180;
                oppo.bmp_cardcolor.node.scaleX = 0.41;
                oppo.bmp_cardcolor.node.scaleY = 0.27;
                oppo.bmp_cardcolor.node.width = 68;
                oppo.bmp_cardcolor.node.height = 97;
                oppo.bmp_cardcolor.node.skewX = 12.5;
            break;

            default:break;
        }
        if(flag%2 == 1){
            oppo.node.x = -320.7;
            oppo.node.y = 260+(flag-1)*4;
        }else{
             oppo.node.x =-287.5;
             oppo.node.y = 260+(flag-2)*4;
        }
        oppo.node.x -=40;
        oppo.node.y+=10;
        
    }
    

}
