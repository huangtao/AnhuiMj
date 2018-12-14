import UIBase from "../../Base/UIBase";
import ManageChildBase from "./ManageChildBase";
import FriendCircleDataCache from "../FriendCircleDataCache";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ManageUi extends UIBase<any> {
	public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;

	/**
	 * 修改资料面板
	 */
    @property(cc.Node)
    node_modifyInfo: cc.Node = null;

    /**
	 * 添加管理员面板
	 */
    @property(cc.Node)
    node_administratorManage: cc.Node = null;

    /**
	 * 数据统计面板
	 */
    @property(cc.Node)
    node_dataStatistics: cc.Node = null;
    /**
     * 资料修改选中按钮
     */
    @property(cc.Button)
    btn_modifyInfo_selected: cc.Button = null;
    /**
     * 添加管理员选中按钮
     */
    @property(cc.Button)
    btn_addAdmin_selected: cc.Button = null;
    /**
     * 数据统计选中按钮
     */
    @property(cc.Button)
    btn_statistics_selected: cc.Button = null;

    /**
     * 资料修改按钮
     */
    @property(cc.Button)
    btn_modifyInfo: cc.Button = null;

    /**
     * 添加管理员按钮
     */
    @property(cc.Button)
    btn_addAdmin: cc.Button = null;

    /**
     * 数据统计按钮
     */
    @property(cc.Button)
    btn_statistics: cc.Button = null;

    public InitShow() {
        let isAdministrator = FriendCircleDataCache.Instance.selfIsAdministrator();
        // 非管理员不显示数据统计按钮
        
        if (!isAdministrator && this.btn_statistics) {
            // this.btn_statistics.node.active = false;
        }else{
            if (this.btn_statistics) {
                // this.btn_statistics.node.active = true;
            }
        }
        
        this.btn_statistics.node.active = false;
    	// 默认选中资料修改
    	this.tabChangeLogic("btn_modifyInfo");
    }

    /**
     * 标签点击事件处理
     */
    public tabClickHandle(event,args) {
    	this.tabChangeLogic(args);
    }


    /**
     * 标签切换逻辑
     */
    public tabChangeLogic(tabName: string) {
    	if (!this.node_administratorManage || !this.node_dataStatistics || !this.node_modifyInfo) {
    		return;
    	}

        let childModel: ManageChildBase = null;

    	if ('btn_modifyInfo' == tabName) {
    		// 修改资料
            this.node_modifyInfo.active = true;
            this.btn_modifyInfo_selected.node.active = true;
            this.node_administratorManage.active = false;
            this.btn_addAdmin_selected.node.active = false;
            this.node_dataStatistics.active = false;
            this.btn_statistics_selected.node.active = false;
            childModel = this.node_modifyInfo.getComponent('ManageChildBase');
    	}else if('btn_addAdmin' == tabName){
            this.node_modifyInfo.active = false;
            this.btn_modifyInfo_selected.node.active = false;
            this.node_administratorManage.active = true;
            this.btn_addAdmin_selected.node.active = true;
            this.node_dataStatistics.active = false;
            this.btn_statistics_selected.node.active = false;
            childModel = this.node_administratorManage.getComponent('ManageChildBase');
    		// 添加管理员
    	}else if('btn_statistics' == tabName){
    		// 数据统计
            this.node_modifyInfo.active = false;
            this.btn_modifyInfo_selected.node.active = false;
            this.node_administratorManage.active = false;
            this.btn_addAdmin_selected.node.active = false;
            this.node_dataStatistics.active = true;
            this.btn_statistics_selected.node.active = true;
            childModel = this.node_dataStatistics.getComponent('ManageChildBase');
    	}

        if (childModel) {
            childModel.InitShow();
        }
    }
}
