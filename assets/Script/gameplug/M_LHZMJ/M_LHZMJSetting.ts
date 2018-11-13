
import { CreateRoomSettingBase, CreateRoomStruct } from "../base/CreateRoomSettingBase";
import { QL_Common } from "../../CommonSrc/QL_Common";
import M_SZMJClass from "./M_LHZMJClass";

const { ccclass, property } = cc._decorator;

export class M_LHZMJ_GameData{        
        public SetGameNum:number=1;//= this._juarr[this._payka];
        public TableCost:number=1;// this.tableCost;
        public tableCreatorPay:number=0;//this._cbx_payType.isSel?0:1;
        public IfCanHu7Dui:boolean = true;
        public GangLeJiuYou:boolean = true;
        public CheckGps:boolean = true;
        public PeopleNum:number = 4;
        public MaShu:number = 2;
        public OutCardTime:number = 0;
        public GuoHuBuHu:boolean = true;
        public RulePeng:number = 0;
        public ifcansameip:number=0;        
        public GangKaiJia:number = 1;
        public IsRecordScoreRoom:boolean = true;
        public isGangJiuYou:boolean = true
        public isOutTimeOp:number = 0;
        public isYiPaoDuoXiang:boolean = false;
    }
export class GameRuleData {
    public GameData: any;
    public TableCost: number;
}
@ccclass
export default class M_SZMJSetting extends CreateRoomSettingBase {
    public GetSetting() {
        return this.onCreateTable();
    }
      
    PointCardCPay:string[]=["4_2","8_3","16_6","0_0"];
    PointCardAAPay:string[]=["4_1","8_2","16_2","0_0"];


   

    private _index:number=0;
    private _gamecount: number = 0;
    private _tablecost: number = 0;

    private _difen:number=2;
    private _zhamacount:number=0;

    private _showItem:number=3;

    private _isAgreIpXT=true;

    onLoad() {
        // init logic
        //this.Init();
    }

    public InitWithData(): boolean {
        //特殊属性1
        let att1 = this.RoomInfo.CSpareAttrib.Attribute1;
        //att1="4_1_2:8-2-3:16-3-6:0-0-0:16";/////////////////////////此行代码用于测试，正式时需要去掉
        //let check:number=0;
        //att1="4|1|2_8|2|3_16|3|6_8,";
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

        
        
        

        return true;
    }




private shezhiXuanZe(Ary:cc.Toggle[],index:number):void{
        if(Ary==null){
            return;
        }
        if(index<0||index>Ary.length){
            return;
        }
        for(var i=0;i<Ary.length;i++){
            if(i==index){
                Ary[i].check();
                continue;
            }
            Ary[i].isChecked=false;
        }
    }


























    














    /**
     * 刷新超时托管
     */
    private refresOutTime():void{
        // if(this.cbx_outtime.isChecked){
        //     this.cbx_outtime.node.getChildByName("New Label").color=cc.color().fromHEX("#ff4301");
        // }
        // else{
        //     this.cbx_outtime.node.getChildByName("New Label").color=cc.color().fromHEX("#561414");
        // }
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

    





    /**
     * 创建房间
     * */
    private onCreateTable(): CreateRoomStruct {
        
        


        let crs=new CreateRoomStruct();
        return crs;
    }
}

