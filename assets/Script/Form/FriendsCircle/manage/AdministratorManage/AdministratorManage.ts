import { Action } from "../../../../CustomType/Action";
import { UIName } from "../../../../Global/UIName";
import Global from "../../../../Global/Global";
import FriendCircleDataCache from "../../FriendCircleDataCache";
import FriendCircleWebHandle from "../../FriendCircleWebHandle";
import AdministratorManageItem from "./AdministratorManageItem";
import { FriendCircleMember } from "../../../../CustomType/FriendCircleInfo";
import { LoadHeader } from "../../../../Tools/Function";
import ManageChildBase from "../ManageChildBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AdministratorManage extends ManageChildBase {
	/**
     * 圈主ID
     */
    @property(cc.Label)
    lab_userId: cc.Label = null;

    /**
     * 圈主昵称
     */
    @property(cc.Label)
    lab_userName: cc.Label = null;

    /**
     * 圈主头像
     */
    @property(cc.Sprite)
    sp_headImg: cc.Sprite = null;

    /**
     * Item预制体
     */
    @property(cc.Prefab)
    prefab_adminItem: cc.Prefab = null;

    /**
     * 列表Layout
     */
    @property(cc.Layout)
    Layout_list: cc.Layout = null;

    /**
     * 是否正在请求
     */ 
    private _requesting: boolean = false;
    
    /**
     * 当前的操作
     */ 
    private _curOperate: string = '';

    /**
     * 当前操作的Item
     */ 
    private _curOperateItem: AdministratorManageItem = null;


    public InitShow() {
        this._requesting = false;

        // 请求成员
        this.requestMemberList();

        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        // 圈主ID
        if (this.lab_userId) {
            this.lab_userId.string = curFriendCircle.userId;
        }

        // 头像
        if (this.sp_headImg) {
            LoadHeader(curFriendCircle.header,this.sp_headImg);
        }
    }

    /**
     * 请求成员列表
     */
    private requestMemberList() {
        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        if (!curFriendCircle) {
            return;
        }

        Global.Instance.UiManager.ShowLoading('正在获数据...');
        let act = new Action(this,(res)=>{
            if ("success" != res.status) {
                return;
            }
            // 创建Item
            let num = this.getAdministratorNum();
            let adminList = FriendCircleDataCache.Instance.getAdminList();
            
            if (this.Layout_list) {
                this.Layout_list.node.removeAllChildren();
            }

            let circleOwner = FriendCircleDataCache.Instance.getCircleOwenerInfo();

            // 圈主昵称
            if (this.lab_userName && circleOwner) {
                this.lab_userName.string = circleOwner.nickname;
            }

            if (this.prefab_adminItem) {
                for (var idx = 0; idx < num; ++idx) {
                    // 创建预制体
                    let prefab = cc.instantiate(this.prefab_adminItem);
                    let item = prefab.getComponent(AdministratorManageItem);
                    item.AddOrDeleteCallBack = new Action(this,this.addOrDeleteAdminclick);
        
                    if(idx <= adminList.length -1){
                        item.InitShow(adminList[idx]);
                    }else{
                        item.InitShow(null);
                    }
    
                    if (this.Layout_list) {
                        this.Layout_list.node.addChild(prefab);
                    }
                }
            }
        });

        FriendCircleWebHandle.getMemberList(curFriendCircle.ID,0,21,act);
    }


    /**
     * 添加管理员点击事件
     */
    public addOrDeleteAdminclick(data: any) {
        if (!data) {
            return;
        }

        if (this._requesting) {
            Global.Instance.UiManager.ShowTip('您的操作过于频繁,请稍后再试！');
            return;
        }

        if (data.item) {
            this._curOperateItem = data.item;
        }

        this._curOperate = data.operate;

        if ('ADD' == data.operate) {
            Global.Instance.UiManager.ShowUi(UIName.FriendCircleMember,{isAddmin: true,act: new Action(this,this.addOrDeleteAdministrator)});
        }else if('DELETE' == data.operate){
            let memberInfo = FriendCircleDataCache.Instance.FriendCircleMemberList.GetValue(data.userId + '');
            this.addOrDeleteAdministrator(memberInfo);
        }
    }

    /**
     * 添加管理员
     */
    public addOrDeleteAdministrator(userInfo: FriendCircleMember) {
        if (!userInfo) {
            return;
        }

        if ('ADD' == this._curOperate && parseInt(userInfo.isadmin) > 0) {
            Global.Instance.UiManager.ShowTip('该成员已经是管理员');
            return;
        }

        let _userInfo = userInfo;
        if ('0' == userInfo.userid.toString()) {
            cc.info('-- [addOrDeleteAdministrator userId error');
            return;
        }

        this._requesting = true;
        let act = new Action(this,(res)=>{
            this._requesting = false;
            // 关闭成员界面
            Global.Instance.UiManager.ShowTip('操作成功！');
            if ('ADD' == this._curOperate) {
                // 关闭成员界面
                Global.Instance.UiManager.CloseUi(UIName.FriendCircleMember);                
            }else if('DELETE' == this._curOperate){
                 
            }
           
           // 刷新显示
           if (this._curOperateItem && this._curOperateItem.updateStateShow) {
               this._curOperateItem.updateStateShow({operate: this._curOperate,userInfo: _userInfo});
           }
        });

        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        let _userId = userInfo.userid;
        let _isAdmin = 0;

        if ('ADD' == this._curOperate) {
            _isAdmin = 1;
        }
        
        FriendCircleWebHandle.addOrDeleteAdmin(_userId,parseInt(curFriendCircle.ID),_isAdmin,act);
    }

    /**
     * 获取管理员数量
     */
    private getAdministratorNum() : number{
        return 4;
    }
}
