import { ActionNet, Action } from "../../CustomType/Action";
import { WebRequest } from "../../Net/Open8hb";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankList {
    private static _ins: RankList;
    public static get Instance(): RankList {
        if (!RankList._ins) {
            RankList._ins = new RankList();
        }
        return RankList._ins;
    }

    @property(cc.Node)
    content: cc.Node = null;
    
    private type:string = "todayRank";
    private count:number = 20;

    public getTodayRankInfos(act? : Action){
        let success = (obj) => {
            let dataList = obj.data;
            let infoArray = new Array<string>();
            for(var i = 0;i < dataList.length;i++){
                if(!dataList[i][1]){
                    dataList[i][1] = "";
                }
                infoArray.push(dataList[i][1]);
            }
            act.Run(infoArray);
        }
        const data = WebRequest.DefaultData();
        data.Add("type",this.type);
        data.Add("count",this.count)
        const action = new ActionNet(this, success, this.error);
        WebRequest.rank.rank_success(action, data);
    }
    /**
     * error
     */
    public error(err) {
        cc.info(err);
    }
    
}
