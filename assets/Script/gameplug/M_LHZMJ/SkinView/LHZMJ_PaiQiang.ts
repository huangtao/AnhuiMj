import { LHZMJMahjongDef, LHZMJ } from "../ConstDef/LHZMJMahjongDef";
import M_LHZMJClass from "../M_LHZMJClass";
import M_LHZMJView from "../M_LHZMJView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_PaiQiang extends cc.Component {
    @property(cc.Node)
    paiQiangNode: cc.Node[] = [];
    private paiWall_0: cc.Sprite[];
    private paiWall_1: cc.Sprite[];
    private paiWall_2: cc.Sprite[];
    private paiWall_3: cc.Sprite[];

    /**
 * 回调函数
 */
    private fun: () => void;
    /**
     * 回调对象
     */
    private obj: any;
    /**
     * 删牌索引
     */
    private idx: number;
    /**
     * 抓牌索引
     */
    private holdidx: number;
    /**
     * 庄家椅子号
     */
    private bankchair: number;

    onLoad() {
        this.idx = 0;
        if(LHZMJ.ins.iclass.getRealUserNum() == 4){
            this.holdidx = 52;
        }else{
            this.holdidx = 39;
        }
        
        this.bankchair = -1;
        cc.log("牌墙实例化完成");

        if (this.paiWall_0 && this.paiWall_1 && this.paiWall_2 && this.paiWall_3) {
            for (var i = 0; i < LHZMJMahjongDef.gCardWalls_number; i++) {
                this.paiWall_0[i] = this.paiQiangNode[0].getChildByName("ID_PAIQIANG_MJ" + i).getComponent<cc.Sprite>(cc.Sprite);
                this.paiWall_1[i] = this.paiQiangNode[1].getChildByName("ID_PAIQIANG_MJ" + i).getComponent<cc.Sprite>(cc.Sprite);
                this.paiWall_2[i] = this.paiQiangNode[2].getChildByName("ID_PAIQIANG_MJ" + i).getComponent<cc.Sprite>(cc.Sprite);
                this.paiWall_3[i] = this.paiQiangNode[3].getChildByName("ID_PAIQIANG_MJ" + i).getComponent<cc.Sprite>(cc.Sprite);
            }
        }


    }
    start() {

    }
    init() {
        this.node.active = false;
        this.idx = 0;
        this.bankchair = -1;
        if(LHZMJ.ins.iclass.getRealUserNum() == 4){
            this.prepareHoldIdx(52);
        }else{
            this.prepareHoldIdx(39);    
        }
        

        if (!this.paiWall_0 && !this.paiWall_1 && !this.paiWall_2 && !this.paiWall_3) {
            this.paiWall_1 = new Array(LHZMJMahjongDef.gCardWalls_number);
            this.paiWall_2 = new Array(LHZMJMahjongDef.gCardWalls_number);
            this.paiWall_3 = new Array(LHZMJMahjongDef.gCardWalls_number);
            this.paiWall_0 = new Array(LHZMJMahjongDef.gCardWalls_number);
        }

    }
    public holdACard() {
        if (this.bankchair == -1) {
            this.bankchair = LHZMJ.ins.iclass.physical2logicChair(M_LHZMJClass.ins.BankerChair);
        }
        var idx = Math.floor(this.holdidx / 28);
        switch ((this.bankchair + idx) % 4) {
            case 0:
                if (cc.isValid(this.paiWall_0[this.holdidx % 28])) {
                    this.paiWall_0[this.holdidx % 28].node.active = false;
                    this.holdidx++;
                }
                break;
            case 1:
                if (cc.isValid(this.paiWall_1[this.holdidx % 28])) {
                    this.paiWall_1[this.holdidx % 28].node.active = false;
                    this.holdidx++;
                }
                break;
            case 2:
                if (cc.isValid(this.paiWall_2[this.holdidx % 28])) {
                    this.paiWall_2[this.holdidx % 28].node.active = false;
                    this.holdidx++;
                }
                break;
            case 3:
                if (cc.isValid(this.paiWall_3[this.holdidx % 28])) {
                    this.paiWall_3[this.holdidx % 28].node.active = false;
                    this.holdidx++;
                }

                break;
        }

    }
    public prepareHoldIdx(idx: number) {
        this.holdidx = idx;
    }
    public showPaiQiang(cardidx: number) {
        cc.log(this.holdidx+";"+cardidx);
        if (this.holdidx == 53 && M_LHZMJClass.ins.getRealUserNum() == 4) {
            cc.error("showpaiqiang():参数错误！！！");
            this.holdidx = 52;
        }else if(this.holdidx == 40 && M_LHZMJClass.ins.getRealUserNum() == 3){
            this.holdidx = 39;
        }

        this.node.active = true;
        for (var i = 0; i < LHZMJMahjongDef.gCardWalls_number; i++) {
            this.paiWall_0[i].node.active = true;
            this.paiWall_1[i].node.active = true;
            this.paiWall_2[i].node.active = true;
            this.paiWall_3[i].node.active = true;
        }
        var chair = LHZMJ.ins.iclass.physical2logicChair(M_LHZMJClass.ins.BankerChair);

        for (var i = 0; i < 13; i++) {
            switch (chair) {

                case 0: if (this.idx < 7) {
                    this.paiWall_0[4 * this.idx].node.active = false;
                    this.paiWall_0[4 * this.idx + 1].node.active = false;
                    this.paiWall_0[4 * this.idx + 2].node.active = false;
                    this.paiWall_0[4 * this.idx + 3].node.active = false;
                } else {
                    if(LHZMJ.ins.iclass.getRealUserNum() == 4){
                        this.paiWall_1[4 * (this.idx - 7)].node.active = false;
                        this.paiWall_1[4 * (this.idx - 7) + 1].node.active = false;
                        this.paiWall_1[4 * (this.idx - 7) + 2].node.active = false;
                        this.paiWall_1[4 * (this.idx - 7) + 3].node.active = false;
                    }else if(LHZMJ.ins.iclass.getRealUserNum() == 3 && this.idx < 10){
                        this.paiWall_1[4 * (this.idx - 7)].node.active = false;
                        this.paiWall_1[4 * (this.idx - 7) + 1].node.active = false;
                        this.paiWall_1[4 * (this.idx - 7) + 2].node.active = false;
                        if(this.idx < 9){
                            this.paiWall_1[4 * (this.idx - 7) + 3].node.active = false;
                        }
                    }
                  
                }
                    break;

                case 1: if (this.idx < 7) {
                    this.paiWall_1[4 * this.idx].node.active = false;
                    this.paiWall_1[4 * this.idx + 1].node.active = false;
                    this.paiWall_1[4 * this.idx + 2].node.active = false;
                    this.paiWall_1[4 * this.idx + 3].node.active = false;
                   
                } else {
                     if(LHZMJ.ins.iclass.getRealUserNum() == 4){
                        this.paiWall_2[4 * (this.idx - 7)].node.active = false;
                        this.paiWall_2[4 * (this.idx - 7) + 1].node.active = false;
                        this.paiWall_2[4 * (this.idx - 7) + 2].node.active = false;
                        this.paiWall_2[4 * (this.idx - 7) + 3].node.active = false;
                    }else if(LHZMJ.ins.iclass.getRealUserNum() == 3 && this.idx < 10){
                        this.paiWall_2[4 * (this.idx - 7)].node.active = false;
                        this.paiWall_2[4 * (this.idx - 7) + 1].node.active = false;
                        this.paiWall_2[4 * (this.idx - 7) + 2].node.active = false;
                        if(this.idx < 9){
                            this.paiWall_2[4 * (this.idx - 7) + 3].node.active = false;    
                        }
                    }
                  
                }
                    break;
                case 2: if (this.idx < 7) {
                    this.paiWall_2[4 * this.idx].node.active = false;
                    this.paiWall_2[4 * this.idx + 1].node.active = false;
                    this.paiWall_2[4 * this.idx + 2].node.active = false;
                    this.paiWall_2[4 * this.idx + 3].node.active = false;
                   
                } else {
                   if(LHZMJ.ins.iclass.getRealUserNum() == 4){
                        this.paiWall_3[4 * (this.idx - 7)].node.active = false;
                        this.paiWall_3[4 * (this.idx - 7) + 1].node.active = false;
                        this.paiWall_3[4 * (this.idx - 7) + 2].node.active = false;
                        this.paiWall_3[4 * (this.idx - 7) + 3].node.active = false;
                    }else if(LHZMJ.ins.iclass.getRealUserNum() == 3 && this.idx < 10){
                        this.paiWall_3[4 * (this.idx - 7)].node.active = false;
                        this.paiWall_3[4 * (this.idx - 7) + 1].node.active = false;
                        this.paiWall_3[4 * (this.idx - 7) + 2].node.active = false;
                        if(this.idx < 9){
                            this.paiWall_3[4 * (this.idx - 7) + 3].node.active = false;
                        }
                    }
                }
                    break;
                case 3: if (this.idx < 7) {
                    this.paiWall_3[4 * this.idx].node.active = false;
                    this.paiWall_3[4 * this.idx + 1].node.active = false;
                    this.paiWall_3[4 * this.idx + 2].node.active = false;
                    this.paiWall_3[4 * this.idx + 3].node.active = false;
                } else {
                    if(LHZMJ.ins.iclass.getRealUserNum() == 4){
                        this.paiWall_0[4 * (this.idx - 7)].node.active = false;
                        this.paiWall_0[4 * (this.idx - 7) + 1].node.active = false;
                        this.paiWall_0[4 * (this.idx - 7) + 2].node.active = false;
                        this.paiWall_0[4 * (this.idx - 7) + 3].node.active = false;
                    }else if(LHZMJ.ins.iclass.getRealUserNum() == 3 && this.idx < 10){
                        this.paiWall_0[4 * (this.idx - 7)].node.active = false;
                        this.paiWall_0[4 * (this.idx - 7) + 1].node.active = false;
                        this.paiWall_0[4 * (this.idx - 7) + 2].node.active = false;
                        if(this.idx < 9){
                            this.paiWall_0[4 * (this.idx - 7) + 3].node.active = false;
                        }
                    }
                }
                    break;
            }
            this.idx++;
        }
        if(LHZMJ.ins.iclass.getRealUserNum() == 4){
            for (var k = 52; k + cardidx < 112; k++) {
                this.holdACard();
            }
        }else{
            for (var k = 39; k + cardidx < 112; k++) {
                this.holdACard();
            }
        }


    }



    public showPaiWall(obj1: any = null, fun1: () => void = null) {
        this.fun = fun1;
        this.obj = obj1;
        this.node.active = true;
        for (var i = 0; i < LHZMJMahjongDef.gCardWalls_number; i++) {
            this.paiWall_0[i].node.active = true;
            this.paiWall_1[i].node.active = true;
            this.paiWall_2[i].node.active = true;
            this.paiWall_3[i].node.active = true;
        }
        var chair = LHZMJ.ins.iclass.physical2logicChair(M_LHZMJClass.ins.BankerChair);



        this.schedule(() => {

            switch (chair) {

                case 0: if (this.idx < 7) {
                    this.paiWall_0[4 * this.idx].node.active = false;
                    this.paiWall_0[4 * this.idx + 1].node.active = false;
                    this.paiWall_0[4 * this.idx + 2].node.active = false;
                    this.paiWall_0[4 * this.idx + 3].node.active = false;
                } else{
                    if(LHZMJ.ins.iclass.getRealUserNum() == 4){
                        this.paiWall_1[4 * (this.idx - 7)].node.active = false;
                        this.paiWall_1[4 * (this.idx - 7) + 1].node.active = false;
                        this.paiWall_1[4 * (this.idx - 7) + 2].node.active = false;
                        this.paiWall_1[4 * (this.idx - 7) + 3].node.active = false;
                    }else if(LHZMJ.ins.iclass.getRealUserNum() == 3 && this.idx < 10){
                        this.paiWall_1[4 * (this.idx - 7)].node.active = false;
                        this.paiWall_1[4 * (this.idx - 7) + 1].node.active = false;
                        this.paiWall_1[4 * (this.idx - 7) + 2].node.active = false;
                        if(this.idx < 9){
                            this.paiWall_1[4 * (this.idx - 7) + 3].node.active = false;
                        }
                    }
                }
                    break;

                case 1: if (this.idx < 7) {
                    this.paiWall_1[4 * this.idx].node.active = false;
                    this.paiWall_1[4 * this.idx + 1].node.active = false;
                    this.paiWall_1[4 * this.idx + 2].node.active = false;
                    this.paiWall_1[4 * this.idx + 3].node.active = false;
                } else {
                    if(LHZMJ.ins.iclass.getRealUserNum() == 4){
                        this.paiWall_2[4 * (this.idx - 7)].node.active = false;
                        this.paiWall_2[4 * (this.idx - 7) + 1].node.active = false;
                        this.paiWall_2[4 * (this.idx - 7) + 2].node.active = false;
                        this.paiWall_2[4 * (this.idx - 7) + 3].node.active = false;
                    }else if(LHZMJ.ins.iclass.getRealUserNum() == 3 && this.idx < 10){
                        this.paiWall_2[4 * (this.idx - 7)].node.active = false;
                        this.paiWall_2[4 * (this.idx - 7) + 1].node.active = false;
                        this.paiWall_2[4 * (this.idx - 7) + 2].node.active = false;
                        if(this.idx < 9){
                            this.paiWall_2[4 * (this.idx - 7) + 3].node.active = false;    
                        }
                    }
                }
                    break;

                case 2: if (this.idx < 7) {
                    this.paiWall_2[4 * this.idx].node.active = false;
                    this.paiWall_2[4 * this.idx + 1].node.active = false;
                    this.paiWall_2[4 * this.idx + 2].node.active = false;
                    this.paiWall_2[4 * this.idx + 3].node.active = false;
                } else {
                    if(LHZMJ.ins.iclass.getRealUserNum() == 4){
                        this.paiWall_3[4 * (this.idx - 7)].node.active = false;
                        this.paiWall_3[4 * (this.idx - 7) + 1].node.active = false;
                        this.paiWall_3[4 * (this.idx - 7) + 2].node.active = false;
                        this.paiWall_3[4 * (this.idx - 7) + 3].node.active = false;
                    }else if(LHZMJ.ins.iclass.getRealUserNum() == 3 && this.idx < 10){
                        this.paiWall_3[4 * (this.idx - 7)].node.active = false;
                        this.paiWall_3[4 * (this.idx - 7) + 1].node.active = false;
                        this.paiWall_3[4 * (this.idx - 7) + 2].node.active = false;
                        if(this.idx < 9){
                            this.paiWall_3[4 * (this.idx - 7) + 3].node.active = false;
                        }
                    }
                }
                    break;

                case 3: if (this.idx < 7) {
                    this.paiWall_3[4 * this.idx].node.active = false;
                    this.paiWall_3[4 * this.idx + 1].node.active = false;
                    this.paiWall_3[4 * this.idx + 2].node.active = false;
                    this.paiWall_3[4 * this.idx + 3].node.active = false;
                } else {
                    if(LHZMJ.ins.iclass.getRealUserNum() == 4){
                        this.paiWall_0[4 * (this.idx - 7)].node.active = false;
                        this.paiWall_0[4 * (this.idx - 7) + 1].node.active = false;
                        this.paiWall_0[4 * (this.idx - 7) + 2].node.active = false;
                        this.paiWall_0[4 * (this.idx - 7) + 3].node.active = false;
                    }else if(LHZMJ.ins.iclass.getRealUserNum() == 3 && this.idx < 10){
                        this.paiWall_0[4 * (this.idx - 7)].node.active = false;
                        this.paiWall_0[4 * (this.idx - 7) + 1].node.active = false;
                        this.paiWall_0[4 * (this.idx - 7) + 2].node.active = false;
                        if(this.idx < 9){
                            this.paiWall_0[4 * (this.idx - 7) + 3].node.active = false;
                        }
                    }
                }
                    break;
            }
            this.idx++;
            if (this.idx == 13) {
                this.onFinish();
            }
        }, 0.08, 13);





    }
    private startAni() {

    }
    private onFinish() {
        this.idx = 0;
        if ((null != this.fun) && (null != this.obj)) {
            this.fun.call(this.obj);
        }
    }
}