import UIBase from "../Base/UIBase";
import RecrodDetailScrollView from "./RecrodDetailScrollView";
import { RoundDetailInfo,RecordInfo } from "./RecordDataStruct";
import { RecordDataManage } from "./RecordDataManage"
import { Action, ActionNet } from "../../CustomType/Action";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RecordDetails extends UIBase<any> {
	public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;
    
    /**
     * 局数
    */

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    private showData: RecordInfo = null;
    public InitShow(): void{
    	if (!cc.isValid(this.ShowParam)) {
    		return
    	}

        this.showData = this.ShowParam;

        // 清除数据
        let scroll = this.scrollView.getComponent(RecrodDetailScrollView);
        scroll.resetList();
        
    	// 显示五个人的昵称
    	for (var idx = 0; idx < 6; ++idx) {
    		let lab_name = cc.find("mt/node/backGround/top/lab_name" + idx,this.node).getComponent(cc.Label);
    		
            if (idx > this.showData.scoreList.length - 1) {
                lab_name.node.active = false;
                continue;
            }else{
                lab_name.node.active = true;
            }

            lab_name.string = this.showData.scoreList[idx].nickname;
    	}

        let act = new Action(this,(res)=>{
            // 创建局数列表
            let scroll = this.scrollView.getComponent(RecrodDetailScrollView);
            let detailList = RecordDataManage.Instance.RecordDetailList.GetValue(this.showData.recordId + '');
            scroll.resetList();
            scroll.refreshData(detailList);
            
        });

        // 请求详情数据
        RecordDataManage.Instance.reuqestRoundDetailList(this.showData.mId,act);
    }
}
