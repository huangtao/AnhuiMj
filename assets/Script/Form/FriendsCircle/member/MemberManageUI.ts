import UIBase from "../../Base/UIBase";
import { WebRequest } from "../../../Net/Open8hb";
import { IDictionary } from "../../../Interface/IDictionary";
import Global from "../../../Global/Global";
import { Action, ActionNet } from "../../../CustomType/Action";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { LoadHeader } from "../../../Tools/Function";
import { MemberUserItem } from "./MemberUserItem";
import FriendCircleDataCache from "../FriendCircleDataCache";
import FriendCircleWebHandle from "../FriendCircleWebHandle";
import { FriendCircleMember } from "../../../CustomType/FriendCircleInfo";
import { UIName } from "../../../Global/UIName";

const { ccclass, property } = cc._decorator;

@ccclass
export class MemberManageUI extends UIBase<any> {
	public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;

    /**
     * 圈主头像
     */
    @property(cc.Sprite)
    sp_adminHead: cc.Sprite = null;

    /**
     * 圈主昵称
     */
    @property(cc.Label)
    lab_nickName: cc.Label = null;

    /**
     * 圈主ID
     */
    @property(cc.Label)
    lab_circleId: cc.Label = null;

    /**
     * 成员数量
     */
    @property(cc.Label)
    lab_memberNum: cc.Label = null;

    /**
     * 成员数量
     */
    @property(cc.ScrollView)
    scroll_member: cc.ScrollView = null;

    /**
     * 成员头像预制体
     */
    @property(cc.Prefab)
    prefab_memberItem: cc.Prefab = null;

    /**
     * 成员头像预制体
     */
    @property(cc.Layout)
    layout_memberList: cc.Layout = null;

    /**
     * 成员数据列表
     */
    private memberList: Array<FriendCircleMember> = new Array<FriendCircleMember>();

    /**
     * 是否正在请求数据
     */
    private requestIng: boolean = false;

    /**
     * 当前的数据长度
     */
    private curMemberLength: number = 0;

    /**
     * 下一个请求ID
     */
    private _nextStartId: number = 0;

    public InitShow() {
        this.curMemberLength = 0;

        /**
         * 注册监听
         */
        let act = new Action(this,this.kickMemberHandle);
        FriendCircleWebHandle.setKickMemberHandle(act);

        let scrollViewEventHandler = new cc.Component.EventHandler();
        scrollViewEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        scrollViewEventHandler.component = "MemberManageUI";//这个是代码文件名
        scrollViewEventHandler.handler = "scrollEventHandle";

        this.scroll_member.scrollEvents.push(scrollViewEventHandler);

        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;

        if (!curFriendCircle) {
            return;
        }

        // 显示圈主头像
        if (this.sp_adminHead) {
            LoadHeader(curFriendCircle.header,this.sp_adminHead);
        }

        // 显示亲友圈ID
        if (this.lab_circleId) {
            this.lab_circleId.string = '亲友圈ID:' + curFriendCircle.ID;
        }

        // 人数显示
        this.updateMemberNum();

        // 清空数据
        if (this.layout_memberList.node) {
            this.layout_memberList.node.removeAllChildren();
        }

        // 请求成员列表
        this.requestMemberList();
    }

    public OnClose() {
        this._nextStartId = 0;
        this.memberList = [];
        this.curMemberLength = 0;
        this.requestIng = false;
    }

    /**
     * 请求成员列表
     */
    private requestMemberList() {
        if (this._nextStartId < 0) {
            return;
        }

        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        if (!curFriendCircle) {
            return;
        }

        let act = new Action(this,this.requestMemberListCallback);
        this.UiManager.ShowLoading("正在获数据...");
        FriendCircleWebHandle.getMemberList(curFriendCircle.ID,this._nextStartId,24,act);
    }

    /**
     * 请求列表回调
     */
    public requestMemberListCallback(res) {
        this.requestIng = false;

        if ('success' != res.status) {
            return;
        }

        let memberList = res.data;
        this._nextStartId = res.nextId;

        if (!res.nextId) {
            this._nextStartId = 0;
        }

        // 刷新圈主昵称显示
        if (this.lab_nickName) {
            let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;

            if (!curFriendCircle) {
                return;
            }

            let memberList = FriendCircleDataCache.Instance.FriendCircleMemberList;            
            let memberInfo = memberList.GetValue(curFriendCircle.userId + '');

            if (memberInfo) {
                this.lab_nickName.string = memberInfo.name + '(圈主)';
            }
        }

        // // 升序排序
        // memberList = memberList.sort((arg1,arg2)=>{
        //     return arg1.id - arg2.id;
        // });

        this.addMember(memberList);
    }

    /**
     * 添加成员
     */
    private addMember(list: any) {
        // 创建预制体
        if (!this.prefab_memberItem || !this.layout_memberList) {
            return;
        }

        // 获取当前请求的数据长度
        let keysValue = list.Keys;
        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        for (var idx = 0; idx < list.length; ++idx) {
             let info: FriendCircleMember = list[idx];
             // 圈主不显示在列表里
             if (curFriendCircle.userId == info.userId) {
                 continue;
             }

             let prefab = cc.instantiate(this.prefab_memberItem);
             let memberItem = prefab.getComponent(MemberUserItem);
             prefab.tag = parseInt(info.userId);

             // 设置成员管理界面回调
             if (this.ShowParam && this.ShowParam.isAddmin) {
                 memberItem.ClickAction = this.ShowParam.act;
             }

             memberItem.initShow(info);
             this.layout_memberList.node.addChild(prefab);
        } 
    }

    /**
     * 踢出成员事件回调
     */
    public kickMemberHandle(res) {
        if ('success' == res.resuslt.status) {
            this.UiManager.ShowTip('操作成功!');

            // 关闭个人信息界面
            this.UiManager.CloseUi(UIName.MemberPlayerInfo);

            if (res.useId && parseInt(res.useId) > 0) {
                // 移除成员
                let node = this.layout_memberList.node.getChildByTag(res.useId);
                // 数据删除
                FriendCircleDataCache.Instance.FriendCircleMemberList.Remove(res.useId + '');
    
                if(node){
                    node.removeFromParent();
                }
            }

            // 重新请求亲友圈列表
            // 请求亲友圈列表
            if ( 0 == FriendCircleDataCache.Instance.FriendCircleList.Count ) {
                FriendCircleWebHandle.requestFriendCircleList();
            }
        }
    }

    /**
     * 更新亲友圈成员数量显示
     */
    public updateMemberNum() {
        let curFriendCircle = FriendCircleDataCache.Instance.CurEnterFriendCircle;
        if (!curFriendCircle) {
            return;
        }

        // 显示亲友圈人数
        if (this.lab_memberNum) {
            this.lab_memberNum.string = "成员（" + curFriendCircle.userCount +"/" + curFriendCircle.maxUser + " )";
        }
    }

    /**
     * 滚动容器监听事件
     */
    public scrollEventHandle(scrollview, eventType, customEventData){
        if (eventType == cc.ScrollView.EventType.SCROLL_TO_TOP
            || eventType == cc.ScrollView.EventType.SCROLL_TO_BOTTOM) {
            // 滚动到顶部、底部 请求数据
            if (this.requestIng) {
                return;
            }

            this.requestIng = true;
            this.requestMemberList();
        }
    }
}