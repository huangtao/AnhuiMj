import { ActionNet } from "../CustomType/Action";
import { IDictionary } from "../Interface/IDictionary";
import ConfigData from "../Global/ConfigData";
import { UrlCtrl_new } from "./UrlCtrl_new";


export namespace SafeWebRequest {

    function doSafeActionJson(url: string, action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST", trycount: number = 3) {
        UrlCtrl_new.LoadSafeRequestJson(url, action, data, method, trycount);
    }

    export class GameHall {
        public static getUpdateInfo(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doSafeActionJson(`${ConfigData.CommonBaseUrl}/safeApi/GameHall.getUpdateInfo`, action, data, method, 1);
        }

        public static LoginSmsApp(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doSafeActionJson(`${ConfigData.webserverinterfaceUrl}/safeApi/GameHall.login_sms_app`, action, data, method);
        }
        public static LoginCacheApp(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doSafeActionJson(`${ConfigData.webserverinterfaceUrl}/safeApi/GameHall.login_cache_app`, action, data, method);
        }
    }

    export class SmsSend {
        public static getSmsSend(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doSafeActionJson(`${ConfigData.webserverinterfaceUrl}/safeApi/SmsService.getSmsCode`, action, data, method);
        }


    }

    export class SmsSUserSessionend {
        public static BindPhone(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doSafeActionJson(`${ConfigData.webserverinterfaceUrl}/safeApi/UserSession.BindPhone`, action, data, method);
        }


    }

    export class Test {
        public static test(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doSafeActionJson(`http://192.168.1.250:12345/safeApi/Test.test`, action, data, method);
        }
    }
}