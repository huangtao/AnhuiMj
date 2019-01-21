
export class CCGlobalManager{
    public static get Instance():CCGlobalManager{
        let o = cc["QL_CCGlobalManager"] as CCGlobalManager;
        if(cc.isValid(o)){
            return o;
        }
        o = new CCGlobalManager();
        cc["QL_CCGlobalManager"] = o;
        return o;
    }
}