import UIBase from "../Base/UIBase";
import { UIName } from "../../Global/UIName";
import { LocalStorage } from "../../CustomType/LocalStorage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.EditBox)
    userName: cc.EditBox = null;
    @property(cc.EditBox)
    phone: cc.EditBox = null;
    @property(cc.EditBox)
    city: cc.EditBox = null;
    @property(cc.EditBox)
    detailsAddress: cc.EditBox = null;


    private chooseCity(){
        this.UiManager.ShowUi(UIName.Area)
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {
        
    // }

    InitShow(){
        let take_name = LocalStorage.GetItem("take_name");
        if(take_name && take_name != ""){
            this.userName.string = take_name;
        }

        let take_phone = LocalStorage.GetItem("take_phone");
        if(take_phone && take_phone != ""){
            this.phone.string = take_phone;
        }

        let take_address = LocalStorage.GetItem("take_address");
        if(take_address && take_address != ""){
            this.detailsAddress.string = take_address;
        }
    }

    ValidParam(param, param1, param2){
        if(!param || !param1 || !param2){
            return false;
        }

        if(param == "" || param1 == "" || param2 == ""){
            return false;
        }

        let regex = /^[1][3,4,5,7,8][0-9]{9}$/;

        if(!regex.test(param1)){
            return false;
        }

        return true;
    }

    ClickSave(){
        let name = this.userName.string;
        let phone = this.phone.string;
        let detailsAddress = this.detailsAddress.string;

        let flag = this.ValidParam(name, phone, detailsAddress);
        if(!flag){
            this.UiManager.ShowTip("收货地址不合法!");
            return;
        }

        /**
         * 记录收货信息
         */
        LocalStorage.SetItem("take_name", name);
        LocalStorage.SetItem("take_phone", phone);
        LocalStorage.SetItem("take_address", detailsAddress);

        this.UiManager.ShowTip("保存收货地址成功");
        this.Close();
    }

    // update (dt) {}
}
