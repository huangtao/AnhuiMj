import { BuglyUserData } from "./BuglyUserData";
import { NativeCtrl } from "../Native/NativeCtrl";


export class LocalStorage {
    static SetItem(key: string, value: string) {
        if (!key) throw new Error("invalid key");
        cc.sys.localStorage.setItem(key, value);
    }

    static GetItem(key: string) {
        if (!key) throw new Error("invalid key")
        let value = cc.sys.localStorage.getItem(key);
        if (value === "") return null;
        return value;
    }


    static RemoveItem(key: string) {
        try {
            cc.sys.localStorage.setItem(key, "");
            cc.log("remove key" + key);
        } catch (e) {
            cc.warn(e);
        }
    }







    public static get LocalHotVersion(): any {
        let version = parseInt(LocalStorage.GetItem("LocalHotVersion"));
        if (!cc.isValid(version)) {
            version = 0;
        }
        return version;
    }
    public static set LocalHotVersion(version: any) {
        LocalStorage.SetItem("LocalHotVersion", version + '');
        let userdata: BuglyUserData = new BuglyUserData();
        userdata.Key = "LocalHotVersion";
        userdata.Value = version;
        NativeCtrl.SetBuglyUserData(userdata);
    }

    public static get LastUserLoginCache(): any {
        let version = LocalStorage.GetItem("LastUserLoginCache");
        if (!cc.isValid(version)) {
            version = 0;
        }
        return version;
    }
    public static set LastUserLoginCache(cacheToken: any) {
        LocalStorage.SetItem("LastUserLoginCache", cacheToken + '');
        let userdata: BuglyUserData = new BuglyUserData();
        //  userdata.Key = "LastUserLoginCache";
        //  userdata.Value = cacheToken;
        //  NativeCtrl.SetBuglyUserData(userdata);
    }




}