import ScrollHelper from "../../../utils/ScrollHelper";
import MessageInfoItem from "./MessageInfoItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MessageInfoScrollView extends ScrollHelper {
	public onRefresh(obj, idx: number, objIdx):void{
		let messageInfoItem: MessageInfoItem = obj.getComponent(MessageInfoItem);
		messageInfoItem.showData = this.ShowData[idx];
		messageInfoItem.initShow(idx);
		
		super.onRefresh(obj, idx, objIdx);

	}
}
