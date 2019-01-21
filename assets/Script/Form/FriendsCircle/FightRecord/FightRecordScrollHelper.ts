import ScrollHelper from "../../../utils/ScrollHelper";
import FightRecordItem from "./FightRecordItem";
import { Action } from "../../../CustomType/Action";
const {ccclass} = cc._decorator;

@ccclass
export default class FightRecordScrollHelper extends ScrollHelper {
    // 战绩详情按钮点击事件
    private _recordDetailAct: Action = null;

    get RecordDetailHandle(): Action {
        return this._recordDetailAct;
    }
    
    set RecordDetailHandle(act: Action) {
        this._recordDetailAct = act;
    }

    // 点赞按钮事件回调
    private _praiseAct: Action = null;

    set PraiseActHandle(act: Action) {
        this._praiseAct = act;
    }

    get PraiseActHandle(): Action {
        return this._praiseAct;
    }
    
	public onRefresh(obj, idx: number, objIdx):void{
		if (!this.ShowData || !this.ShowData[idx]) {
			return;
		}

		// 刷新战绩列表
		let recordItem: FightRecordItem = obj.getComponent("FightRecordItem");
		recordItem.initUI(this.ShowData[idx]);
		recordItem.RecordDetailHandle = this.RecordDetailHandle;
		recordItem.PraiseActHandle = this.PraiseActHandle;
		super.onRefresh(obj, idx, objIdx);
	}
}
