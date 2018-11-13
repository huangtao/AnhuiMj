import { ActionNet } from "../CustomType/Action";
import { IDictionary } from "../Interface/IDictionary";
import ConfigData from "../Global/ConfigData";
import { UrlCtrl_new } from "./UrlCtrl_new";


export namespace SafeWebRequest{
    
    function doSafeActionJson(url: string, action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
        UrlCtrl_new.LoadSafeRequestJson(url, action, data, method);
    }
    
    export class GameHall{
        public static getUpdateInfo(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST"){
            doSafeActionJson(`${ConfigData.CommonBaseUrl}/safeApi/GameHall.getUpdateInfo`, action, data, method); 
        }
    }

    export class Test{ 
        public static test(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST"){
            doSafeActionJson(`http://192.168.1.250:12345/safeApi/Test.test`, action, data, method); 
        }
    }
}