import UIBase from "../Base/UIBase";
import { UIName } from "../../Global/UIName";
import { RecordDataManage } from "./RecordDataManage"
import { Action, ActionNet } from "../../CustomType/Action";
import RecordListScrollView from "./RecordListScrollView";
/**
 * 战绩列表界面
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class RecordForm extends UIBase<any>{
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Component)
    scrollHelp: RecordListScrollView = null;

    /**
     * 没有战绩提示文字
     */
    @property(cc.Label)
    lab_tip: cc.Label = null;

    public InitShow(): void{
        if (this.scrollView) {
            this.scrollHelp = this.scrollView.getComponent("ScrollHelper");
            this.scrollHelp.registerScrollToTopOrBottonEvent(this.requestDataAndRefreshList.bind(this));
            this.scrollView.node.active = false;
            this.scrollHelp.resetList();
            this.reuqestRecordLit(0);
        }
    	
        if (cc.isValid(this.lab_tip)) {
            this.lab_tip.node.active = false;
        }
    }

   /**
    * @Author   WangHao
    * @DateTime 2018-08-15
    * @Desc     战绩详情
    */
    private details(){
       this.UiManager.ShowUi(UIName.Details,null,null);
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-15
     * @Desc     请求战绩列表
     */
    public reuqestRecordLit(startId?: number): void{
    	if (RecordDataManage.Instance.isRequesting) {
    		// 正在加载中
    		return;
    	}

    	let act = new Action(this,this.requestRecordCallBack);
    	RecordDataManage.Instance.reuqestRecordLit(act,startId);
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-15
     * @Desc     请求战绩列表回调
     */
    public requestRecordCallBack(res){
        if ('success' !== res.status) {
            return;
        }
    	
        if (0 == RecordDataManage.Instance.RecordList.Count && cc.isValid(this.lab_tip)) {
            this.lab_tip.node.active = true;
        }

    	// this.scrollHelp.Num = RecordDataManage.Instance.RecordList.Count;
    	// this.scrollHelp.ShowData = RecordDataManage.Instance.RecordList.Values;
    	this.scrollView.node.active = true;
    	this.scrollHelp.refreshData(RecordDataManage.Instance.RecordList.Values);
    }

    /**
     * 请求新数据并刷新列表显示
     */
    public requestDataAndRefreshList(): void{
    	this.reuqestRecordLit();
    }
}