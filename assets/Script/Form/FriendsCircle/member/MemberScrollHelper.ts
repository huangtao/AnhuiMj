import ScrollHelper from "../../../utils/ScrollHelper";
import { MemberUserItem } from "./MemberUserItem";
import { Action } from "../../../CustomType/Action";
const {ccclass, property} = cc._decorator;

@ccclass
export default class MemberScrollHelper extends ScrollHelper {
    // 查看个人信息按钮点击事件
    private _openPlayerlAct: Action = null;

    get OpenPlayerInfoHandle(): Action {
        return this._openPlayerlAct;
    }
    
    set OpenPlayerInfoHandle(act: Action) {
        this._openPlayerlAct = act;
    }

	// 战绩详情按钮点击事件
    private _recordDetailAct: Action = null;

    get RecordDetailHandle(): Action {
        return this._recordDetailAct;
    }
    
    set RecordDetailHandle(act: Action) {
        this._recordDetailAct = act;
    }

    // 点心按钮事件回调
    private _heartFlagAct: Action = null;

    get HeartFlagActHandle(): Action {
        return this._heartFlagAct;
    }

    set HearFlagActHandle(act: Action) {
        this._heartFlagAct = act;
    }
    
	public onRefresh(obj, idx: number, objIdx):void{
		if (!this.ShowData || !this.ShowData[idx]) {
			return;
		}

		// 刷新成员列表
		let memberItem: MemberUserItem = obj.getComponent("MemberUserItem");
		memberItem.initShow(this.ShowData[idx]);
		memberItem.RecordDetailHandle = this._recordDetailAct;
		memberItem.HeartFlagActHandle = this._heartFlagAct;
        memberItem.OpenPlayerInfoHandle = this._openPlayerlAct;
		super.onRefresh(obj, idx, objIdx);
	}
}
