
import { CreateRoomSettingBase, CreateRoomStruct } from "../base/CreateRoomSettingBase";
import { QL_Common } from "../../CommonSrc/QL_Common";

const { ccclass, property } = cc._decorator;

export class M_HZMJ_GameData{
        public title:string;

        public SetGameNum:number=1;//= this._juarr[this._payka];
        public TableCost:number=1;// this.tableCost;
        public isOutTimeOp:number=0;// this._cbx_outTime.isSel ? 1 : 0;
        public isTableCreatorPay:number=0;//this._cbx_payType.isSel?0:1;      
        public ifCanSameIP=0;             
        //是否杠开加
        public isGangKai:boolean=true;     
        //是否一炮多响
        public isYiPaoDuoXiang:boolean=true;
        //是否杠了就有
        public isGangJiuYou:boolean=true;
        //是否抢杠包三家
        public isQiangGangBao3:boolean=true;
        //是否带七对
        public QiDui:boolean=true;
        public GoldRoomBaseIdx = 4;//this._payka;
        //翻码数
        public MaShu:number=4;
        //碰牌规则
        public RulePeng:number=1;
        //出牌时间
        public OutCardTime:number=0;
        //是否记分场
         public IsRecordScoreRoom:number=0;
    }
export class GameRuleData {
    public GameData: any;
    public TableCost: number;
}
@ccclass
export default class M_HZMJSetting extends CreateRoomSettingBase {
    public GetSetting() {
        return this.onCreateTable();
    }
    PointCardCPay:string[]=["16_2","24_3","16_6","0_0"];
    PointCardAAPay:string[]=["16_1","24_1","16_2","0_0"];

    @property(cc.ToggleGroup)
    GameCount: cc.ToggleGroup=null;

    @property([cc.Toggle])
    toggle_Jushu: cc.Toggle[]=[];
    @property([cc.Toggle])
    toggle_AA: cc.Toggle[]=[];
    @property([cc.Toggle])
    toggle_other: cc.Toggle[]=[];

    @property(cc.Label)
    label_tableCost: cc.Label=null;

    @property(cc.Toggle)
    cbx_outtime: cc.Toggle=null;
    // @property(cc.Toggle)
    // cbx_paytype: cc.Toggle;
    @property(cc.Toggle)
    cbx_lpz: cc.Toggle=null;
    @property(cc.Toggle)
    cbx_yipaoduoxiang: cc.Toggle=null;
    @property(cc.Toggle)
    cbx_qidui: cc.Toggle=null;
    @property(cc.Toggle)
    cbx_gangkai: cc.Toggle=null;
    @property(cc.Toggle)
    cbx_bukao: cc.Toggle=null;
    @property(cc.Toggle)
    cbx_gang: cc.Toggle=null;
    @property(cc.Toggle)
    cbx_qiang: cc.Toggle=null;
    @property(cc.Toggle)
    cbx_ipsame: cc.Toggle=null;

    private _index:number=0;
    private _gamecount: number = 0;
    private _tablecost: number = 0;
    private _isTableCreatorPay=0;

    private _showItem:number=3;

    onLoad() {
        // init logic
       // this.Init();
        
    }

    public InitWithData(): boolean {
        //特殊属性1
        let att1 = this.RoomInfo.CSpareAttrib.Attribute1;
        //let check:number=0;
        console.log(att1);
        if (att1 != null && att1 != "") {
            let strAll = att1.split(',');
            this._showItem=0;
             
            //最多4个
            let str1=strAll[0].split('_');
            for (let i = 0; i < str1.length - 1; i++){
                let str11=str1[i].split('|');
                this.PointCardAAPay[i]=str11[0]+"_"+str11[1];
                this.PointCardCPay[i]=str11[0]+"_"+str11[2];
                if(str11[0]==str1[str1.length-1])
                {
                    this._index=i;
                }
            }   
        }else{
            return false;
        }
        
        this.Init();
        return true;
    }
    private Init(): void {
        // const tempdata=new M_HZMJ_GameData();

        // let stridx:string=this.GetItem("idx");
        // let idx=parseInt(stridx);
        // if(stridx!=null &&!isNaN(idx) && idx>=0 &&idx<=2){
            

        //         this._index=idx;
        //         if(this._index<3){
        //             this.toggle_Jushu[this._index].check();
        //         }
        //         let strbukao=this.GetItem("bukao");
        //         if(strbukao!=null && strbukao=="1"){
        //             this.cbx_bukao.check();
        //         }
        //         let strgangkai=this.GetItem("gangkai");
        //         if(strgangkai!=null && strgangkai=="1"){
        //             this.cbx_gangkai.check();
        //         }
        //         // let strlapaozuo=this.GetItem("lapaozuo");
        //         // if(strlapaozuo!=null && strlapaozuo=="1"){
        //         //     this.cbx_lpz.check();
        //         // }
        //         let strouttime=this.GetItem("outtime");
        //         if(strouttime!=null && strouttime=="1"){
        //             this.cbx_outtime.check();
        //         }
        //         let strip=this.GetItem("ipsame");
        //         if(strip!=null && strip=="1"){
        //             this.cbx_ipsame.check();
        //         }

        //         let strqidui=this.GetItem("qidui");
        //         if(strqidui!=null && strqidui=="1"){
        //             this.cbx_qidui.check();
        //         }

        //         let straa=this.GetItem("aa");
        //         if(straa!=null && straa=="1"){
        //             this.toggle_AA[0].check();
        //         }else{
        //             this.toggle_AA[1].check();
        //         }

        //         let strypdx=this.GetItem("ypdx");
        //         if(strypdx!=null && strypdx=="1"){
        //             this.cbx_yipaoduoxiang.check();
        //         }
        //         // let strgangjiuyou=this.GetItem("gangjiuyou");
        //         // if(strgangjiuyou!=null && strgangjiuyou=="1"){
        //         //     this.cbx_gang.check();
        //         // }
        //         // let strqiang=this.GetItem("qiang");
        //         // if(strqiang!=null && strqiang=="1"){
        //         //     this.cbx_qiang.check();
        //         // }
            
        // }else{
        //     if(this._index<3){
        //         this.toggle_Jushu[this._index].check();
        //     }
        //         if(tempdata.isBuKao){
        //             this.cbx_bukao.check();
        //         }
               
        //         if(tempdata.isGangKai){
        //             this.cbx_gangkai.check();
        //         }

        //         // if(tempdata.isLaPaoZuo){
        //         //     this.cbx_lpz.check();
        //         // }

        //         if(tempdata.isOutTimeOp>0){
        //             this.cbx_outtime.check();
        //         }

        //         if(tempdata.isQiDui){
        //             this.cbx_qidui.check();
        //         }
        //         if(tempdata.ifCanSameIP==0){
        //             this.cbx_ipsame.check();
        //         }
        //         if(tempdata.isTableCreatorPay==0){
        //             this.toggle_AA[0].check();
        //         }else{
        //             this.toggle_AA[1].check();
        //         }
        //         if(tempdata.isYiPaoDuoXiang){
        //             this.cbx_yipaoduoxiang.check();
        //         }

        //         // if(tempdata.isGangJiuYou){
        //         //     this.cbx_gang.check();
        //         // }
        //         // if(tempdata.isQiangGangBao3){
        //         //     this.cbx_qiang.check();
        //         // }
            
        // }
        // this.label_tableCost.string = "";
        // this.refreshCheckBox();
        
        // this.refreshTableCostConfig();
        
        
    }

    private refreshPayType():void{
        this._isTableCreatorPay=this.GetPayType();
        for(var i=0;i<this.toggle_AA.length;i++){
            var toggle=this.toggle_AA[i];//("toggle"+i).getComponent<cc.Toggle>(cc.Toggle);
            if(toggle.isChecked){
                toggle.node.getChildByName("Label").color=cc.color().fromHEX("#ff4301");
            }
            else{
                toggle.node.getChildByName("Label").color=cc.color().fromHEX("#561414");
            }
        }
        this.refreshTableCostConfig();
    }
    private GetPayType() {
        if (this.toggle_AA[1].isChecked)
            return 1;
        else
            return 0;
    }

    private refreshCheckBox():void{
        for(var i=0;i<this.toggle_other.length;i++){
            var toggle=this.toggle_other[i];//("toggle"+i).getComponent<cc.Toggle>(cc.Toggle);
            if(toggle.isChecked){
                toggle.node.getChildByName("New Label").color=cc.color().fromHEX("#ff4301");
            }
            else{
                toggle.node.getChildByName("New Label").color=cc.color().fromHEX("#561414");
            }
        }

    }
    private refreshTableCostConfig() {
        var tableCostName = "房卡";

        this._index=this.GetGameCountSelect();
        this.SetPointCard();
        
        this.refreshGameCount();
    }

    private SetToggleLabelColor(parent:cc.ToggleGroup,value:number){
        for(var i=0;i<parent.node.childrenCount;i++){
            var toggle=parent.node.getChildByName("toggle"+i).getComponent<cc.Toggle>(cc.Toggle);
            if(i==value){
                toggle.node.getChildByName("label").color=cc.color().fromHEX("#ff4301");
            }
            else{
                toggle.node.getChildByName("label").color=cc.color().fromHEX("#561414");
            }
        }
    }
    private GetGameCountSelect() {
        if (this.toggle_Jushu[1].isChecked)
            return 1;
        else if (this.toggle_Jushu[2].isChecked)
            return 2;
        else
            return 0;
    }
    private refreshGameCount(): void {
        this._index=this.GetGameCountSelect();
        this.SetPointCard();
        this._gamecount = Number(this.PointCardAAPay[Number(this._index)].split("_")[0]);//Number(this.JuGroup.selectedValue.split("_")[0]);
        this.label_tableCost.string =this._isTableCreatorPay==0?this.TableCost()+"/人" : this.TableCost() + "";
    }
    private TableCost() {
        if(this._isTableCreatorPay==0)
        {
            this._tablecost = Number(this.PointCardAAPay[Number(this._index)].split("_")[1]);
        }
        else{
            this._tablecost = Number(this.PointCardCPay[Number(this._index)].split("_")[1]);
        }
        //Number(this.JuGroup.selectedValue.split("_")[1]);
        return this._tablecost;
    }

    private SetPointCard(){
            for(var i=0;i<this.toggle_Jushu.length;i++){
                var toggle=this.toggle_Jushu[i]//parent.node.getChildByName("toggle"+i).getComponent<cc.Toggle>(cc.Toggle);
                if(toggle.isChecked){
                    toggle.node.getChildByName("Label").color=cc.color().fromHEX("#ff4301");
                }
                else{
                    toggle.node.getChildByName("Label").color=cc.color().fromHEX("#561414");
                }
                if(this._isTableCreatorPay==0){
                    toggle.node.getChildByName("Label").getComponent<cc.Label>(cc.Label).string=Number(this.PointCardAAPay[i].split("_")[0])+"局"+`（房卡X${Number(this.PointCardAAPay[i].split("_")[1])}）`;
                }else{
                    toggle.node.getChildByName("Label").getComponent<cc.Label>(cc.Label).string=Number(this.PointCardCPay[i].split("_")[0])+"局"+`（房卡X${Number(this.PointCardCPay[i].split("_")[1])}）`;
                }
        }
    }
    /**
     * 创建房间
     * */
    private onCreateTable(): CreateRoomStruct {
       const createTable = new M_HZMJ_GameData();
createTable.GoldRoomBaseIdx=this._index;
this.SetItem("idx",""+this._index);
createTable.isGangKai=true;
this.SetItem("gangkai","1");
createTable.isOutTimeOp=0;
createTable.isTableCreatorPay=0;
createTable.isYiPaoDuoXiang=false;
createTable.isGangJiuYou=false;
createTable.isQiangGangBao3=false;
createTable.QiDui=true;
createTable.ifCanSameIP=1;
createTable.SetGameNum=8;
createTable.TableCost=1;
createTable.MaShu=4;
createTable.OutCardTime=0;
createTable.RulePeng=0;
createTable.IsRecordScoreRoom=0;
const gameRuleData: GameRuleData = new GameRuleData();
gameRuleData.GameData = createTable;
gameRuleData.TableCost = 1;
let crs=new CreateRoomStruct();
crs.CheckMoneyNum=1;
crs.CurrencyType=QL_Common.CurrencyType.Diamond;
crs.RoomData=gameRuleData;
return crs;
    }
}

