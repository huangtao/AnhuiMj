
import { TableCostConfig, PrefabPath } from "./GameHelp/PDK_GameHelp";
import { Action } from "../../CustomType/Action";
import { CreateRoomSettingBase, CreateRoomStruct } from "../base/CreateRoomSettingBase";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { SetTextureRes } from "./GameHelp/PDK_baseFunction";

const { ccclass, property } = cc._decorator;

export class M_PDK_GameData {
    public gameCountIndex:number = 0;
    //房主支付
    public tableCreatorPay: number = 0;
    
    //局数
    public SetGameNum: number = 0;
    //是否同IP
    public ifcansameip: boolean = false;

    //人数
    public PeopleNum: number = 0;
    //玩法
    public gameModel:number = 0;
    //有牌必要
    public mustOut: number = 0;
    //有2必打
    public have2OutA: boolean = false;
    //黑桃三
    public spadesRedPeach3: number = 0;
    //黑桃三必出
    public spades3MustOut: boolean = false;
    //红桃三必出
    public redPeach3MustOut: boolean = false;
    //红桃三必出
    public zhuaNiaoScore: number = 0;
    //首局黑桃三先出
    public firstSpades3Out:boolean = false;
    //3A为炸
    public threeAIsBomb:boolean = false;

    //炸弹+10
    public bomb: boolean = false;
    //放走包赔
    public FZBP: boolean = false;
    //剩三张拖尾
    public SZTW: boolean = false;
    //显示剩余张数
    public showRemainNum: boolean = false;
    //GPS定位
    public CheckGps: boolean = false;


}
@ccclass
export default class M_PDKSetting extends CreateRoomSettingBase {
    public GetSetting() {
        return this.onCreateTable();
    }
    private tableCostIcoPath: string = "Texture/Hall/";
    private ownerCostConfig: TableCostConfig;
    private AACostConfig: TableCostConfig;
    private groupCostConfig: TableCostConfig;

    @property(cc.ToggleContainer)
    TableCost: cc.ToggleContainer = null;
    @property(cc.ToggleContainer)
    GameCount: cc.ToggleContainer = null;
    @property(cc.Node)
    group: cc.Node = null;
    @property(cc.ToggleContainer)
    GameModel: cc.ToggleContainer = null;
    @property(cc.ToggleContainer)
    CardTypeModel: cc.ToggleContainer = null;
    @property([cc.Toggle])
    toggle_tableCost: cc.Toggle[] = [];
    @property([cc.Toggle])
    toggle_gameCount: cc.Toggle[] = [];
    @property(cc.Sprite)
    img_tableCost: cc.Sprite = null;
    @property(cc.Label)
    label_tableCost: cc.Label = null;
    @property(cc.Toggle)
    toggle_checkIP: cc.Toggle = null;
    @property([cc.Toggle])
    toggle_startMasterModel: cc.Toggle[] = [];
    @property([cc.Toggle])
    toggle_gameModel: cc.Toggle[] = [];
    @property([cc.Toggle])
    toggle_cardTypeModel: cc.Toggle[] = [];
    @property(cc.Node)
    group_extendBet: cc.Node = null;
    @property(cc.Toggle)
    toggle_extendBet: cc.Toggle = null;
    @property(cc.Toggle)
    toggle_dropcard: cc.Toggle = null;
    @property(cc.Toggle)
    toggle_xiscore: cc.Toggle = null;
    @property(cc.Node)
    group_rubCard: cc.Node = null;
    @property(cc.Toggle)
    toggle_rubCard: cc.Toggle = null;

    private _gamecount: number = 0;
    private _tablecost: number = 0;
    private _isGroupGame: boolean = false;
    private _gameModelConfig: number[] = new Array(1, 2, 3, 4);

    onLoad() {

    
    }
    public InitWithData(): boolean {
        this.ownerCostConfig = new TableCostConfig();
        this.AACostConfig = new TableCostConfig();
        this.groupCostConfig = new TableCostConfig();
        //局数-房费
        //8|6_16|12_24|18_32|24,8|1_16|2_24|3_32|4
        let att1 = this.RoomInfo.CSpareAttrib.Attribute1;
        console.log(att1);
        if (att1 == undefined || att1 == null || att1.length == 0)
            return false;
        else {
            try {
                const costMode = att1.split(',');
                this.SetOwnerCostConfig(costMode[0]);
                this.SetAACostConfig(costMode[1]);
                this.SetGroupCostConfig(costMode[2]);
            } catch (error) {
                return false;
            }
        }
        this._isGroupGame = this.IsGroupGame();
        this.InitGroupGame();
        this.label_tableCost.string = "";
        this.InitGameModel();
        this.InitExtendAttribute();
        this.GameInitData();
        this.refreshTableCostConfig();
        return true;
    }
    private IsGroupGame() {
        let groupID = this.ShowParam.group_id;
        if (groupID != undefined && groupID != null) {
            try {
                return parseInt(groupID) > 0;
            } catch (error) {

            }
        }
        return false;
    }
    public InitGroupGame() {
        if (this._isGroupGame) {
            this.toggle_tableCost[0].node.getChildByName("label").getComponent<cc.Label>(cc.Label).string = "群主付费";
            this.toggle_tableCost[0].isChecked = true;
            this.toggle_tableCost[0].node.getChildByName("label").color = cc.color().fromHEX("#ff4301");
            this.toggle_tableCost[1].node.active = false;
            SetTextureRes(this.tableCostIcoPath + "zuanshi", this.img_tableCost);
        }
        else {
            this.toggle_tableCost[0].node.getChildByName("label").getComponent<cc.Label>(cc.Label).string = "AA制";
            this.toggle_tableCost[1].node.getChildByName("label").getComponent<cc.Label>(cc.Label).string = "房主付费";
            this.toggle_tableCost[1].node.active = true;
            this.toggle_tableCost[0].isChecked = true;
            SetTextureRes(this.tableCostIcoPath + "fangka", this.img_tableCost);
        }
    }
    public SetOwnerCostConfig(value: string) {
        var list = value.split('_');
        for (let i = 0; i < list.length; i++) {
            var str = list[i].split('|');
            this.ownerCostConfig.Add(parseInt(str[0]), parseInt(str[1]));
        }
    }
    public SetAACostConfig(value: string) {
        var list = value.split('_');
        for (let i = 0; i < list.length; i++) {
            var str = list[i].split('|');
            this.AACostConfig.Add(parseInt(str[0]), parseInt(str[1]));
        }
    }
    public SetGroupCostConfig(value: string) {
        var list = value.split('_');
        for (let i = 0; i < list.length; i++) {
            var str = list[i].split('|');
            this.groupCostConfig.Add(parseInt(str[0]), parseInt(str[1]));
        }
    }
    //初始化游戏模式
    private InitGameModel() {
        var value = this.RoomInfo.CSpareAttrib.Attribute6;
        if (value != undefined && value != null && value != "") {
            var config = value.split(',');
            this._gameModelConfig = new Array(config.length);
            for (let i = 0; i < this._gameModelConfig.length; i++) {
                this._gameModelConfig[i] = parseInt(config[i]);
            }
            for (let i = 0; i < this.toggle_gameModel.length; i++) {
                if (i < this._gameModelConfig.length) {
                    this.toggle_gameModel[i].node.active = true;
                    this.toggle_gameModel[i].node.getChildByName("label").getComponent<cc.Label>(cc.Label).string = this.ParseGameModel(this._gameModelConfig[i]);
                    cc.log("设置gamemodel"+i);
                }
                else {
                    this.toggle_gameModel[i].node.active = false;
                }
            }
        }
    }
    private InitExtendAttribute() {
        let att4 = this.RoomInfo.CSpareAttrib.Attribute4;
        if (att4 != undefined && att4 != null && att4.length != 0) {
            try {
                let strExtendBet = att4.split(',')[0];
                if (strExtendBet != undefined && strExtendBet != null && strExtendBet.length != 0 && parseInt(strExtendBet) == 0) {
                    this.group_extendBet.active = false;

                }
                let strRubCard = att4.split(',')[1];
                if (strRubCard != undefined && strRubCard != null && strRubCard.length != 0 && parseInt(strRubCard) == 0) {
                    this.group_rubCard.active = false;

                }
            } catch (error) {
                console.log("att4 is error");
            }
            if (!this.group_extendBet.active && this.group_rubCard.active) {
                this.group_rubCard.y = this.group_extendBet.y;

            }
        }
    }
    private GameInitData() {
        try {
            if (!this._isGroupGame) {
                const tablecost = this.GetItem("tablecost");
                if (tablecost != undefined && tablecost != null && tablecost != "") {
                    this.SetTableCostSelect(parseInt(tablecost));
                }
            }
            const gamecount = this.GetItem("gamecount");
            if (gamecount != undefined && gamecount != null && gamecount != "") {
                const gamecountIndex = parseInt(gamecount);
                if (gamecountIndex < this.ownerCostConfig.gameCount.length)
                    this.SetGameCountSelect(gamecountIndex);
                else
                    this.SetGameCountSelect(0);
            }
            const checkIP = this.GetItem("checkIP");
            if (checkIP != undefined && checkIP != null && checkIP != "") {
                this.SetCheckIPSelect(checkIP == "true");
            }
            const startmastermodel = this.GetItem("startmastermodel");
            if (startmastermodel != undefined && startmastermodel != null && startmastermodel != "") {
              
            }
            const gamemodel = this.GetItem("gamemodel");
            if (gamemodel != undefined && gamemodel != null && gamemodel != "") {
                this.SetGameModelSelect(parseInt(gamemodel));
            }
            const cardtypemodel = this.GetItem("cardtypemodel");
            if (cardtypemodel != undefined && cardtypemodel != null && cardtypemodel != "") {
                this.SetCardTypeModelSelect(cardtypemodel);
            }
            const extendbet = this.GetItem("extendbet");
            if (extendbet != undefined && extendbet != null && extendbet != "") {
                this.SetExtendBetSelect(extendbet == "true");
            }
            const rubcard = this.GetItem("rubcard");
            if (rubcard != undefined && rubcard != null && rubcard != "") {
                this.SetRubCardSelect(rubcard == "true");
            }
            const havedropCard = this.GetItem("havedropcard");
            if(havedropCard != undefined&&havedropCard!=null&&havedropCard!=""){
                this.toggle_dropcard.isChecked = true;
                this.toggle_dropcard.node.getChildByName("label").color = cc.color().fromHEX("#ff4301");
                
            }
            const havexiScore = this.GetItem("havexiscore");
            if(havexiScore!=undefined&&havexiScore!=null&&havexiScore!=""){
                this.toggle_xiscore.isChecked = true;
                this.toggle_xiscore.node.getChildByName("label").color = cc.color().fromHEX("#ff4301");
                
            }
        } catch (error) {
            console.log("获取本地Item配置错误");
        }
        this.refreshGameModel();
    }
    /**
     * 刷新局数
     * */
    private refreshGameCount(): void {
        var index = this.GetGameCountSelect();
        //this.SetItem("gamecount", index + "");
        this.SetToggleContainerLabelColor(this.GameCount, index);
        if (this._isGroupGame) {
            this._gamecount = this.groupCostConfig.gameCount[index];
            this._tablecost = this.groupCostConfig.tableCost[index];
        }
        else if (this.GetTableCostSelect() == 1) {
            this._gamecount = this.ownerCostConfig.gameCount[index];
            this._tablecost = this.ownerCostConfig.tableCost[index];
        }
        else {
            this._gamecount = this.AACostConfig.gameCount[index];
            this._tablecost = this.AACostConfig.tableCost[index];
        }
        this.label_tableCost.string = "X" + this._tablecost;
    }
    private refreshTableCostConfig() {
        var tableCostName = this._isGroupGame ? "钻石" : "房卡";
        var index = this.GetTableCostSelect();
        //this.SetItem("tablecost", index + "");
        this.SetToggleContainerLabelColor(this.TableCost, index);
        if (this._isGroupGame) {
            for (var i = 0; i < this.toggle_gameCount.length; i++) {
                if (i < this.groupCostConfig.gameCount.length) {
                    this.toggle_gameCount[i].node.active = true;
                    this.toggle_gameCount[i].node.getChildByName("label").getComponent<cc.Label>(cc.Label).string = this.groupCostConfig.gameCount[i] + "局(" + tableCostName + "X" + this.groupCostConfig.tableCost[i] + ")";
                }
                else {
                    this.toggle_gameCount[i].node.active = false;
                }
            }
        }
        else if (index == 1) {
            for (var i = 0; i < this.toggle_gameCount.length; i++) {
                if (i < this.ownerCostConfig.gameCount.length) {
                    this.toggle_gameCount[i].node.active = true;
                    this.toggle_gameCount[i].node.getChildByName("label").getComponent<cc.Label>(cc.Label).string = this.ownerCostConfig.gameCount[i] + "局(" + tableCostName + "X" + this.ownerCostConfig.tableCost[i] + ")";
                }
                else {
                    this.toggle_gameCount[i].node.active = false;
                }
            }
        }
        else {
            for (var i = 0; i < this.toggle_gameCount.length; i++) {
                if (i < this.AACostConfig.gameCount.length) {
                    this.toggle_gameCount[i].node.active = true;
                    this.toggle_gameCount[i].node.getChildByName("label").getComponent<cc.Label>(cc.Label).string = this.AACostConfig.gameCount[i] + "局(" + tableCostName + "X" + this.AACostConfig.tableCost[i] + ")";
                }
                else {
                    this.toggle_gameCount[i].node.active = false;
                }
            }
        }
        this.refreshGameCount();
    }
    private refreshCheckIP() {
        var isChecked = this.GetCheckIP();
        //this.SetItem("checkIP", isChecked + "");
        this.SetToggleLabelColor(this.toggle_checkIP, isChecked);
    }
    private refreshStartMasterModel() {
        var index = this.GetStartMasterModelSelect();
        //this.SetItem("startmastermodel", index + "");
       // this.SetToggleContainerLabelColor(this.StartMasterModel, index);
    }
    private refreshGameModel() {
        var index = this.GetGameModelSelect();
        //this.SetItem("gamemodel", index + "");
        this.SetToggleContainerLabelColor(this.GameModel, index);
        this.CheckRubCard(index);
    }
    private refreshCardTypeModel() {
        var index = this.GetCardTypeModelSelect();
        for (let i = 0; i < this.toggle_cardTypeModel.length; i++) {
            let isChecked = index.indexOf(i) >= 0;
            this.SetToggleLabelColor(this.toggle_cardTypeModel[i], isChecked);
        }
        /*var itemValue = "";
        for (let i = 0; i < index.length; i++) {
            itemValue += index[i] + "_";
        }
        itemValue = itemValue.length > 0 ? itemValue.substring(0, itemValue.length - 1) : "";
        this.SetItem("cardtypemodel", itemValue);*/
    }
    private refreshExtendBet() {
        var isChecked = this.GetExtendBet();
        //this.SetItem("extendbet", isChecked + "");
        this.SetToggleLabelColor(this.toggle_extendBet, isChecked);
    }
    private refreshRubCard() {
        var isChecked = this.GetRubCard();
        //this.SetItem("rubcard", isChecked + "");
        this.SetToggleLabelColor(this.toggle_rubCard, isChecked);
    }
    private CheckRubCard(value: number) {
        if (this._gameModelConfig[value] == 1)
            this.toggle_rubCard.interactable = true;
        else
            this.toggle_rubCard.interactable = false;
    }
    private SetToggleContainerLabelColor(parent: cc.ToggleContainer, value: number) {
        for (var i = 0; i < parent.node.childrenCount; i++) {
            var toggle = parent.node.getChildByName("toggle" + i).getComponent<cc.Toggle>(cc.Toggle);
            if (i == value) {
                toggle.node.getChildByName("label").color = cc.color().fromHEX("#ff4301");
            }
            else {
                toggle.node.getChildByName("label").color = cc.color().fromHEX("#561414");
            }
        }
    }
    private SetToggleLabelColor(toggle: cc.Toggle, value: boolean) {
        if (value)
            toggle.node.getChildByName("label").color = cc.color().fromHEX("#ff4301");
        else
            toggle.node.getChildByName("label").color = cc.color().fromHEX("#561414");
    }
    private GetTableCostSelect() {
        return this.toggle_tableCost[1].isChecked ? 1 : 0;
    }
    private GetGameCountSelect() {
        for (var i = 0; i < this.toggle_gameCount.length; i++) {
            if (this.toggle_gameCount[i].isChecked)
                return i;
        }
        return 0;
    }
    private GetStartMasterModelSelect() {
        for (var i = 0; i < this.toggle_startMasterModel.length; i++) {
            if (this.toggle_startMasterModel[i].isChecked)
                return i;
        }
        return 0;
    }
    private GetGameModelSelect() {
        for (var i = 0; i < this.toggle_gameModel.length; i++) {
            if (this.toggle_gameModel[i].isChecked)
                return i;
        }
        return 0;
    }
    private GetCardTypeModelSelect() {
        var selectList = new Array();
        for (var i = 0; i < this.toggle_cardTypeModel.length; i++) {
            if (this.toggle_cardTypeModel[i].isChecked)
                selectList.push(i);
        }
        return selectList;
    }
    private GetCheckIP() {
        return this.toggle_checkIP.isChecked;
    }
    private GetExtendBet() {
        return this.toggle_extendBet.isChecked;
    }
    private GetExtendBetType() {
        if (!this.group_extendBet.active)
            return 0;
        else if (this.toggle_extendBet.isChecked)
            return 1;
        else
            return 2;
    }
    private GetRubCard() {
        return this.toggle_rubCard.isChecked;
    }
    private GetRubCardType() {
        if (!this.group_rubCard.active || !this.toggle_rubCard.interactable)
            return 0;
        else if (this.toggle_rubCard.isChecked)
            return 1;
        else
            return 2;
    }
    private SetTableCostSelect(value: number) {
        for (var i = 0; i < this.toggle_tableCost.length; i++) {
            if (i == value)
                this.toggle_tableCost[i].isChecked = true;
            else
                this.toggle_tableCost[i].isChecked = false;
        }
        this.SetToggleContainerLabelColor(this.TableCost, value);
    }
    private SetGameCountSelect(value: number) {
        for (var i = 0; i < this.toggle_gameCount.length; i++) {
            if (i == value)
                this.toggle_gameCount[i].isChecked = true;
            else
                this.toggle_gameCount[i].isChecked = false;
        }
        this.SetToggleContainerLabelColor(this.GameCount, value);
    }
    // private SetStartMasterModelSelect(value: number) {
    //     for (var i = 0; i < this.toggle_startMasterModel.length; i++) {
    //         if (i == value)
    //             this.toggle_startMasterModel[i].isChecked = true;
    //         else
    //             this.toggle_startMasterModel[i].isChecked = false;
    //     }
    //     this.SetToggleContainerLabelColor(this.StartMasterModel, value);
    // }
    private SetGameModelSelect(value: number) {
        for (var i = 0; i < this.toggle_gameModel.length; i++) {
            if (i == value)
                this.toggle_gameModel[i].isChecked = true;
            else
                this.toggle_gameModel[i].isChecked = false;
        }
        this.SetToggleContainerLabelColor(this.GameModel, value);
        this.CheckRubCard(value);
    }
    private SetCardTypeModelSelect(value: string) {
        let strList = value.split('_');
        let selectList = new Array();
        for (let i = 0; i < strList.length; i++) {
            selectList[i] = parseInt(strList[i]);
        }
        for (let i = 0; i < this.toggle_cardTypeModel.length; i++) {
            let isChecked = selectList.indexOf(i) >= 0;
            this.toggle_cardTypeModel[i].isChecked = isChecked;
            this.SetToggleLabelColor(this.toggle_cardTypeModel[i], isChecked);
        }
    }
    private SetCheckIPSelect(value: boolean) {
        this.toggle_checkIP.isChecked = value;
        this.SetToggleLabelColor(this.toggle_checkIP, value);
    }
    private SetExtendBetSelect(value: boolean) {
        this.toggle_extendBet.isChecked = value;
        this.SetToggleLabelColor(this.toggle_extendBet, value);
    }
    private SetRubCardSelect(value: boolean) {
        this.toggle_rubCard.isChecked = value;
        this.SetToggleLabelColor(this.toggle_rubCard, value);
    }
    private ParseGameModel(value: number) {
        switch (value) {
            case 0:
                return "随机庄家";
            case 1:
                return "1";
            case 2:
                return "2";
            case 10:
                return "10";
            case 20:
                return "20";
            case 5:
                return "不换庄";
        }
        return "";
    }
    private SaveLocalItemData() {
        try {
            this.SetItem("gamecount", this.GetGameCountSelect() + "");
            this.SetItem("tablecost", this.GetTableCostSelect() + "");
            this.SetItem("checkIP", this.GetCheckIP() + "");
            this.SetItem("startmastermodel", this.GetStartMasterModelSelect() + "");
            this.SetItem("gamemodel", this.GetGameModelSelect() + "");
            let index = this.GetCardTypeModelSelect();
            let itemValue = "";
            for (let i = 0; i < index.length; i++) {
                itemValue += index[i] + "_";
            }
            itemValue = itemValue.length > 0 ? itemValue.substring(0, itemValue.length - 1) : "";
            this.SetItem("cardtypemodel", itemValue);
            this.SetItem("extendbet", this.GetExtendBet() + "");
            this.SetItem("rubcard", this.GetRubCard() + "");
            this.SetItem("havedropcard",this.toggle_dropcard.isChecked+"");
            this.SetItem("havexiscore",this.toggle_xiscore.isChecked+"");
        } catch (error) {
            console.log("保存本地建房配置错误");
        }
    }
    /**
     * 创建房间
     * */
    private onCreateTable(): any {
        this.SaveLocalItemData();
        const createTable = new M_PDK_GameData();
        if (this._isGroupGame)
            createTable.tableCreatorPay = 3;
        else
            createTable.tableCreatorPay = this.GetTableCostSelect() == 1 ? 1 : 2;
       
        createTable.gameCountIndex = this.GetGameCountSelect();
        createTable.ifcansameip = false;
        const gameRuleData: CreateRoomStruct = new CreateRoomStruct();
        gameRuleData.RoomData = createTable;
        gameRuleData.CurrencyType = QL_Common.CurrencyType.Diamond;
        gameRuleData.CheckMoneyNum = this._isGroupGame ? 0 : this._tablecost;
        return gameRuleData;
    }


    private OnButtonDropCard(){
        if (this.toggle_dropcard.isChecked){
            this.toggle_dropcard.isChecked = true;
        }else{
             this.toggle_dropcard.isChecked = false;
        }
        
        if (this.toggle_dropcard.isChecked)
             this.toggle_dropcard.node.getChildByName("label").color = cc.color().fromHEX("#ff4301");
        else
             this.toggle_dropcard.node.getChildByName("label").color = cc.color().fromHEX("#561414");

    }
        private OnButtonXiScore(){
        if (this.toggle_xiscore.isChecked){
            this.toggle_xiscore.isChecked = true;
        }else{
             this.toggle_xiscore.isChecked = false;
        }
        
        if (this.toggle_xiscore.isChecked)
             this.toggle_xiscore.node.getChildByName("label").color = cc.color().fromHEX("#ff4301");
        else
             this.toggle_xiscore.node.getChildByName("label").color = cc.color().fromHEX("#561414");

    }
}
