import { TDHMJTableConfig, TDHMJ } from "../ConstDef/TDHMJMahjongDef";
const {ccclass, property} = cc._decorator;

@ccclass
export default class TDHMJ_ReadyStatusGameInfo extends cc.Component {

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

    onLoad() {
        // init logic
    }

    public init():void{
        this.node.active=false;
    }

    public ShowRule(tableconfig:TDHMJTableConfig):void{
        this.node.active=true;
        this.lbl_cellscore.string="底分"+tableconfig.cellScore;
        this.lbl_ypdx.opacity=tableconfig.IsYiPaoDuoXiang?255:0;

        this.lbl_qd.opacity=tableconfig.IfCanHu7Dui?255:0;
        this.lbl_gk.opacity=tableconfig.IsGangKai?255:0;
        this.lbl_bukao.opacity=tableconfig.IsBuKao?255:0;
    }

    /**
     * 刷新
     * */
    public refresh():void{
        
        this.lbl_cellscore.string="底分"+TDHMJ.ins.iclass.getTableConfig().cellScore;
        this.lbl_ypdx.opacity=TDHMJ.ins.iclass.getTableConfig().IsYiPaoDuoXiang?255:0;
        this.lbl_qd.opacity=TDHMJ.ins.iclass.getTableConfig().IfCanHu7Dui?255:0;
        this.lbl_gk.opacity=TDHMJ.ins.iclass.getTableConfig().IsGangKai?255:0;
        this.lbl_bukao.opacity=TDHMJ.ins.iclass.getTableConfig().IsBuKao?255:0;
    }
}
