import { Action, ActionNet } from "../../../../CustomType/Action";
import Global from "../../../../Global/Global";
import { UIName } from "../../../../Global/UIName";
import { LoadHeader } from "../../../../Tools/Function";
import { FriendCircleMember } from "../../../../CustomType/FriendCircleInfo";
import FriendCircleDataCache from "../../FriendCircleDataCache";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AdministratorManageItem extends cc.Component {
	/**
	 * 已添加状态显示
	 */
    @property(cc.Node)
    node_added: cc.Node = null;

    /**
	 * 未添加状态显示
	 */
    @property(cc.Node)
    node_noAdd: cc.Node = null;

    /**
     * 删除按钮
     */
    @property(cc.Node)
    btn_delete: cc.Node = null;

    /**
     * 添加按钮
     */
    @property(cc.Node)
    btn_add: cc.Node = null;

    /**
	 * 头像
	 */
    @property(cc.Sprite)
    sp_headImg: cc.Sprite = null;

    /**
	 * 玩家ID
	 */
    @property(cc.Label)
    lab_userId: cc.Label = null;

    /**
	 * 昵称
	 */
    @property(cc.Label)
    lab_userName: cc.Label = null;

    // 添加或删除回调
    private _addOrDeleteCallBack: Action = null;

    private _showData: FriendCircleMember = null;

    public set AddOrDeleteCallBack(act: Action) {
    	this._addOrDeleteCallBack = act;
    }

    public get AddOrDeleteCallBack(): Action {
        return this._addOrDeleteCallBack;
    }

    /**
     * 初始化界面显示
     */
    public InitShow(data: FriendCircleMember) {
        // 默认显示未添加
        this.node_noAdd.active = true;
        this.node_added.active = false;

        let isCircleOwner = FriendCircleDataCache.Instance.selfIsCircleOwner();
        // 非圈主不显示添加删除按钮
        if (!isCircleOwner) {
            if (this.btn_delete && this.btn_add) {
                this.btn_add.active = false;
                this.btn_delete.active = false;
            }
        }

    	if (!data) {
    		cc.info('-- [AdministratorManageItem] [InitShow] param is null');
    		return;
    	}

    	this._showData = data;
        this.node_noAdd.active = false;
        this.node_added.active = true;

        

        // ID
    	if (cc.isValid(this.lab_userId)) {
    		this.lab_userId.string = data.userId;
    	}

        // 昵称
    	if (cc.isValid(this.lab_userName)) {
    		this.lab_userName.string = data.name;
    	}

        // 头像
    	if (cc.isValid(this.sp_headImg)) {
    		LoadHeader(data.header,this.sp_headImg);
    	}
    }

    /**
     * 添加管理员按钮
     */
    public btnAddOrDeleteAdministrator(event, args) {
    	if (this.AddOrDeleteCallBack) {
            let userId = null;
            if (this._showData) {
                userId = this._showData.userId;
            }
            
    		this.AddOrDeleteCallBack.Run([{operate: args,userId: userId,item: this}])
    	}
    }

   	/**
     * 更新状态显示
     */
    public updateStateShow(data: any) {
    	if (!this.node_added || !this.node_noAdd) {
    		return;
    	}

        if ('ADD' == data.operate) {
            this.node_added.active = true;
            this.node_noAdd.active = false;

            if (data.userInfo) {
            	this.InitShow(data.userInfo);
            }
        }else if ('DELETE' == data.operate) {
            this.node_added.active = false;
            this.node_noAdd.active = true;
        }
    }    
}
