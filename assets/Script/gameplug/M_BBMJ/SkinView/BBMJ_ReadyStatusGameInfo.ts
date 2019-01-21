import { BBMJTableConfig, BBMJ } from "../ConstDef/BBMJMahjongDef";
const {ccclass, property} = cc._decorator;

@ccclass
export default class BBMJ_ReadyStatusGameInfo extends cc.Component {

    @property(cc.Label)
    lbl_cellscore: cc.Label=null;

    @property(cc.Node)
    lbl_ypdx: cc.Node=null;
    @property(cc.Node)
    lbl_qd: cc.Node=null;
    @property(cc.Node)
    lbl_gk: cc.Node=null;
    @property(cc.Node)
    lbl_bukao: cc.Node=null;
    @property(cc.Node)
    lbl_M1A2: cc.Node=null;
    @property(cc.Node)
    lbl_M3A4: cc.Node=null;
    @property(cc.Node)
    lbl_4hui: cc.Node=null;

    onLoad() {
        // init logic
    }

    public init():void{
        this.node.active=false;
    }

    public ShowRule(tableconfig:BBMJTableConfig):void{
        this.node.active=true;
        this.lbl_cellscore.string="底分"+tableconfig.cellScore;
        this.lbl_qd.opacity=tableconfig._ifCanHu7Dui?255:0;
        this.lbl_gk.opacity=tableconfig.IfCanBaoTing?255:0;
        this.lbl_bukao.opacity=tableconfig.IfCanTianHu?255:0;

    }

    /**
     * 刷新
     * */
    public refresh():void{       
        this.lbl_cellscore.string="底分"+BBMJ.ins.iclass.getTableConfig().cellScore;
        this.lbl_qd.opacity=BBMJ.ins.iclass.getTableConfig()._ifCanHu7Dui?255:0;
        this.lbl_gk.opacity=BBMJ.ins.iclass.getTableConfig().IfCanBaoTing?255:0;
        this.lbl_bukao.opacity=BBMJ.ins.iclass.getTableConfig().IfCanTianHu?255:0;

    }
}
