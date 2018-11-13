import { MGMJTableConfig, MGMJ } from "../ConstDef/MGMJMahjongDef";
const {ccclass, property} = cc._decorator;

@ccclass
export default class MGMJ_ReadyStatusGameInfo extends cc.Component {

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

    public ShowRule(tableconfig:MGMJTableConfig):void{
        this.node.active=true;
        this.lbl_cellscore.string="底分"+tableconfig.cellScore;
        this.lbl_ypdx.opacity=tableconfig.IsYiPaoDuoXiang?255:0;
        this.lbl_qd.opacity=tableconfig.IsQiDui?255:0;
        this.lbl_gk.opacity=tableconfig.IsGangKai?255:0;
        this.lbl_bukao.opacity=tableconfig.IsBuKao?255:0;
    }

    /**
     * 刷新
     * */
    public refresh():void{
        
        this.lbl_cellscore.string="底分"+MGMJ.ins.iclass.getTableConfig().cellScore;
        this.lbl_ypdx.opacity=MGMJ.ins.iclass.getTableConfig().IsYiPaoDuoXiang?255:0;
        this.lbl_qd.opacity=MGMJ.ins.iclass.getTableConfig().IsQiDui?255:0;
        this.lbl_gk.opacity=MGMJ.ins.iclass.getTableConfig().IsGangKai?255:0;
        this.lbl_bukao.opacity=MGMJ.ins.iclass.getTableConfig().IsBuKao?255:0;
    }
    
}
