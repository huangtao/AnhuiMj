import { ReportError } from "../Tools/Function";
import { QL_Common } from "../CommonSrc/QL_Common";

export class GpsInfo {
    status: string;
    /**
     * 纬度
     */
    Latitude: number = 0;
    /**
     * 经度
     */
    Longitude: number = 0;
    /**
     * 地址描述
     */
    Address: string = "尚未开启定位";
    /**
     * 国家
     */
    Country: string = "";
    /**
     * 省
     */
    Province: string;
    /**
     * 城市
     */
    City: string;
    /**
     * 城区
     */
    District: string;
    /**
     * 街道
     */
    Street: string;
    /**
     * 街道门牌号
     */
    StreetNum: string;
}    


export class GpsInfoTools{
    static initWithJsonStr(str: string): GpsInfo {
        try {
            const obj = JSON.parse(str);
            return GpsInfoTools.initWithJsonObj(obj);
        } catch (e) {
            ReportError("无效的玩家Gps字符串");
            return new GpsInfo();
        }
    }

    static initWithJsonObj(obj: any): GpsInfo {
        const info = new GpsInfo();
        for (let i in obj) {
            info[i] = obj[i];
        }
        return info;
    }

    static initWithSystemConfig(dic: QL_Common.MSG_S_SysConfig[]): GpsInfo {
        const info = new GpsInfo();
        for (let i = 0; i < dic.length; i++) {
            switch (dic[i].sysConfigArray[i].Key) {
                case "Latitude":
                    info.Latitude = parseFloat(dic[i].sysConfigArray[i].Value);
                    break;
                case "Longitude":
                    info.Longitude = parseFloat(dic[i].sysConfigArray[i].Value);
                    break;
                default:
                    info[dic[i].sysConfigArray[i].Key] = dic[i].sysConfigArray[i].Value;
                    break;
            }
        }
        return info;
    }
}