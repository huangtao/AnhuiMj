import { WebRequest } from "../../../Net/Open8hb";
import { IDictionary } from "../../../Interface/IDictionary";
import Global from "../../../Global/Global";
import { Action, ActionNet } from "../../../CustomType/Action";
import { QL_Common } from "../../../CommonSrc/QL_Common";
const { ccclass, property } = cc._decorator;

/******************************** 比赛场 ******************************/

@ccclass
export default class MatchField extends cc.Component {
	public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;

    /**
     * 加入群组或者创建群组操作面板
     */
    @property(cc.Node)
    joinOrCreateGroup: cc.Node = null;

    /**
     * @Author   WangHao
     * @DateTime 2018-08-02
     * @Desc     列表项
     * @param    {[type]}   cc.Prefab [description]
     */
    @property(cc.Prefab)
    groupItemPrefab: cc.Node = null;
   
    public onLoad(){
        
    }
    
    protected OnShow(){
        // 拉取亲友圈列表
        // let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        // const action = new ActionNet(this,this.getJoinCircleListSuccess,this.getJoinCircleListError);
        // WebRequest.FriendCircle.getJoinCircleList(action,data);
    }

}
