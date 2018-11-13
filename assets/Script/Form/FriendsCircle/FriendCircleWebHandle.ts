/**
 *    处理亲友圈Web请求 
 */

import { ISocketManager } from "../../Interface/ISocketManager";
import { GameBaseClass } from "../../gameplug/base/GameBaseClass";
import { EventManager } from "../../Manager/EventManager";
import { FriendCircleInfo ,FriendCircleRule } from "../../CustomType/FriendCircleInfo";
import { WebRequest } from "../../Net/Open8hb";
import { IDictionary } from "../../Interface/IDictionary";
import { Action, ActionNet } from "../../CustomType/Action";
import FriendCircleDataCache from "./FriendCircleDataCache";
import Global from "../../Global/Global";


export default class FriendCircleWebHandle {
    /**
     * 添加规则回调事件
     */
    private static _addRuleHandle: Action = null;

    /**
     * 加入亲友圈回调事件
     */
    private static _joinFriendCircleHandle: Action = null;

    /**
     * 获取亲友圈列表回调事件
     */
    private static _getFriendCircleListHandle: Action = null;

    /**
     * 修改亲友圈消息回调事件
     */
    private static _modifyFriendCirleInfoHandle: Action = null;

    /**
     * 踢人回调事件
     */
    private static _kickMemberHandle: Action = null;

    /**
     * 获取亲友圈列表回调事件
     */
    public static setFriendCircleListHandle(act: Action){
        if (!act) {
            return;
        }

        FriendCircleWebHandle._getFriendCircleListHandle = act;
    }

    /**
     * 设置踢人回调事件
     */
    public static setKickMemberHandle(act: Action){
        if (!act) {
            return;
        }

        FriendCircleWebHandle._kickMemberHandle = act;
    }

    /**
     * 设置添加规则回调事件
     */
    public static setAddRuleHandle(act: Action){
        if (!act) {
            return;
        }

        FriendCircleWebHandle._addRuleHandle = act;
    }

    /**
     * 设置加入亲友圈回调事件
     */
    public static setJoinFriendCircleHandle(act: Action){
        if (!act) {
            return;
        }

        FriendCircleWebHandle._joinFriendCircleHandle = act;
    }

    /**
     * 设置修改信息回调事件
     */
    public static setModifyFriendCirleInfoHandle(act: Action){
        if (!act) {
            return;
        }

        FriendCircleWebHandle._modifyFriendCirleInfoHandle = act;
    }
    

     /**
     * 请求加入或创建的亲友圈列表
     */
    public static requestFriendCircleList(act?: Action){
        let action_ = act;
        let getJoinCircleListCb = (args)=>{
            cc.info('-- getJoinCircleListCb ',args);

            if (!args || !args.status) {
                return;
            }
            
            if ("success" != args.status) {
                return;
            }

            let tmpList = args.data;
            let tmpArray = new Array<FriendCircleInfo>();
            for (var idx = 0; idx < tmpList.length; ++idx) {
                let info = new FriendCircleInfo();
                info.ID = tmpList[idx].id;
                info.userId = tmpList[idx].userId;
                info.name = tmpList[idx].name;
                info.notice = tmpList[idx].notice;
                info.header = tmpList[idx].header;
                info.userCount = tmpList[idx].userCount;
                info.maxUser = tmpList[idx].maxUserCount;
                tmpArray.push(info);
            }

            FriendCircleDataCache.Instance.AddrdorUpdateFriendCircleList(tmpArray);

            // 回调
            if (action_) {
                action_.Run([args]);
                return;
            }

            if (this._getFriendCircleListHandle) {
                this._getFriendCircleListHandle.Run([args]);
                return;
            }
        }

        // 拉取亲友圈列表
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        const action = new ActionNet(this,getJoinCircleListCb,getJoinCircleListCb);
        WebRequest.FriendCircle.getJoinCircleList(action,data);
    }

    /**
     * 获取亲友圈玩法信息
     */
    public static requestFriendCircRuleList(groupId: string, act?: Action){
        let action_ = act;
        let groupId_ = groupId;
        let requestFriendCircRuleCb = (args)=>{
            cc.info('-- requestFriendCircRuleCb ',args);

            if (!args || !args.status) {
                return;
            }
         
            if ("success" != args.status) {
                return;
            }

            let tmpList = args.data;
            let curRule = FriendCircleDataCache.Instance.getCurFriendCircleRule();
            
            let tmpArray = new Array<FriendCircleRule>();
            for (var idx = 0; idx < tmpList.length; ++idx) {
                let info = new FriendCircleRule();
                info.Id = tmpList[idx].id;
                info.gameId = tmpList[idx].gameId;
                info.gameName = tmpList[idx].gameName;
                info.ruleStr = tmpList[idx].ruleStr;
                info.ruleDesc = tmpList[idx].ruleDesc;
                info.moduleName = tmpList[idx].moduleName;
                tmpArray.push(info);
            }

            // 更新本地缓存数据
            FriendCircleDataCache.Instance.FriendCircleRuleList.AddOrUpdate(groupId_ + '',tmpArray);

            // 回调
            if (action_) {
                action_.Run([{args: args}]);
            }
        }
        
        // 发送获取亲友圈玩法请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("groupId",groupId);
        const action = new ActionNet(this,requestFriendCircRuleCb,requestFriendCircRuleCb);
        WebRequest.FriendCircle.getRuleList(action,data);
    }


    /**
     * 添加玩法
     */
    public static addRule(ruleInfo: FriendCircleRule){
        if (!ruleInfo) {
            cc.info("error: addRule param is error!");
            return;
        }

        let  addRuleCb = (args)=>{
            cc.info('-- addRuleCb ',args);
            if (!args || !args.status) {
                return;
            }
         
            if ("success" != args.status) {
                return;
            }

            // 回调
            if (FriendCircleWebHandle._addRuleHandle) {
                FriendCircleWebHandle._addRuleHandle.Run([args]);
                // FriendCircleWebHandle._addRuleHandle = null;
            }
        }
        
        // 发送请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("groupId",ruleInfo.friendId);
        data.Add("gameId",ruleInfo.gameId);
        data.Add("ruleStr",ruleInfo.ruleStr);
        data.Add("ruleDesc",ruleInfo.ruleDesc);
        
        const action = new ActionNet(this,addRuleCb,addRuleCb);
        WebRequest.FriendCircle.addRule(action,data);
    }

    /**
     * 删除玩法
     */
    public static deleteRule(groupId: number,ruleId: number, act?: Action){
        let action_ = act;
        let _ruleId = ruleId;
        let _groupId = groupId;

        let deleteRuleCb = (args)=>{
            cc.info('-- deleteRuleCb ',args);

            if (!args || !args.status) {
                return;
            }
         
            if ("success" != args.status) {
                return;
            }
            // 回调
            if (action_) {
                action_.Run([args]);
            }
        }
        
        if (!groupId || !_ruleId) {
            return;
        }

        // 发送获取亲友圈玩法请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("groupId",_groupId);
        data.Add("ruleId",_ruleId);
        const action = new ActionNet(this,deleteRuleCb,deleteRuleCb);
        WebRequest.FriendCircle.deleteRule(action,data);
    }

    /**
     * 获取亲友圈成员列表
     */
    public static getMemberList(groupId: string,startId = 0, count = 21, act?: Action){
        let action_ = act;
        let _starId = startId;
        let _cout = count;
        let groupId_ = groupId;

        let getMemberListCb = (args)=>{
            cc.info('--- getMemberList ',args);
            Global.Instance.UiManager.CloseLoading();
            
            if (!args || !args.status) {
                return;
            }
         
            if ("success" != args.status) {
                return;
            }
            
            let tmpList = args.data;
            FriendCircleDataCache.Instance.addOrUpdateMemberList(args.data);

            // 回调
            if (action_) {
                action_.Run([args]);
            }
        }
        
        // 发送获取亲友圈玩法请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("groupId",groupId);
        data.Add("startId",_starId);
        data.Add('count', _cout);

        const action = new ActionNet(this,getMemberListCb,getMemberListCb);
        WebRequest.FriendCircle.getUserList(action,data);
    }

    /**
     * 加入亲友圈
     */
    public static joinFriendCircle(groupId: string, act?: Action){
        let action_ = act;
        let groupId_ = groupId;
        let joinFriendCircCb = (args)=>{
            cc.info("--- joinFriendCircle callback: ",args);
            
            if (!args || !args.status) {
                return;
            }
         
            if ("success" != args.status) {
                return;
            }

            cc.info("--- joinFriendCircle callback: ",args);

            if (FriendCircleWebHandle._joinFriendCircleHandle) {
                FriendCircleWebHandle._joinFriendCircleHandle.Run([args]);
                FriendCircleWebHandle._joinFriendCircleHandle = null;
            }else{
                // 回调
                if (action_) {
                    action_.Run([args]);
                }
            }
        }
        
        // 发送请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("groupId",groupId);
        const action = new ActionNet(this,joinFriendCircCb,joinFriendCircCb);
        WebRequest.FriendCircle.join(action,data);
    }

    /**
     * 踢出亲友圈
     */
    public static kickMember(userId: number, groupId: number, act?: Action){
        let action_ = act;
        let _groupId = groupId;
        let _userId = userId;

        let requestFriendCircRuleCb = (args)=>{
            cc.info('--- kickMember ',args);

            if (!args || !args.status) {
                return;
            }
         
            if ("success" != args.status) {
                return;
            }
            if (FriendCircleWebHandle._kickMemberHandle) {
                FriendCircleWebHandle._kickMemberHandle.Run([{resuslt:args,useId: _userId}]);
            }else{
                // 回调
                if (action_) {
                    action_.Run([{resuslt:args,useId: _userId}]);
                }
            }
        }
        
        if (!userId || !groupId) {
            return;
        }

        // 发送请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("exitId",userId);
        data.Add("groupId",groupId);
        const action = new ActionNet(this,requestFriendCircRuleCb,requestFriendCircRuleCb);
        WebRequest.FriendCircle.kick(action,data);
    }

    /**
     * 获取消息列表
     */
    public static getMessageList(groupId: string, act?: Action){
        let action_ = act;
        let groupId_ = groupId;
        let getMessageListCb = (args)=>{
            cc.info('--- getMessageList ',args);
            Global.Instance.UiManager.CloseLoading();
            
            if (!args || !args.status) {
                return;
            }
         
            if ("success" != args.status) {
                return;
            }

            FriendCircleDataCache.Instance.addMessage(args.data);

            // 回调
            if (action_) {
                action_.Run([args]);
            }
        }
        
        // 发送请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("groupId",groupId);
        const action = new ActionNet(this,getMessageListCb,getMessageListCb);
        WebRequest.FriendCircle.getMessageList(action,data);
        Global.Instance.UiManager.ShowLoading('正在获数据');
    }

    /**
     * 拒绝或同意加入亲友圈()
     */
    public static agreeOrRefuseJoinFriendCircle(userId: number, groupId: number,operate: number, act: Action):boolean {
        let action_ = act;
        let _logId = userId;
        let _status = operate;
        let _groupId = groupId;

        let acceptjoinCb = (args)=>{
            cc.info("--- agreeOrRefuseJoin callback: ",args);
            
            if (!args || !args.status) {
                return;
            }
         
            if ("success" != args.status) {
                return;
            }

            cc.info("--- agreeOrRefuseJoinFriendCircle callback: ",args);

            if (action_) {
                action_.Run([args]);
            }
        }
        
        if (!_logId || !_groupId || !_status) {
            cc.info('-- error param in agreeOrRefuseJoin')
            return false;
        }
        // 发送请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("logId",_logId);   // 玩家ID
        data.Add("groupId",_groupId);// 亲友圈ID
        data.Add("status",_status); // 操作：拒绝或同意
        const action = new ActionNet(this,acceptjoinCb,acceptjoinCb);
        WebRequest.FriendCircle.acceptjoin(action,data);

        return true;
    }

    /**
     * 添加或删除管理员
     * isAdmin 是否是管理员(1 是、 2 否)
     */
    public static addOrDeleteAdmin(userId: number, groupId: number,isAdmin: number, act: Action) {
        let action_ = act;
        let _userId = userId;
        let _isAdmin = isAdmin;
        let _groupId = groupId;

        let setadminCb = (args)=>{
            cc.info("--- addOrDeleteAdmin callback: ",args);
            
            if (!args || !args.status) {
                return;
            }
         
            if ("success" != args.status) {
                return;
            }

            // 回调
            if (action_) {
                action_.Run([args]);
            }
        }
        
        if (!_userId || !_groupId) {
            cc.info('-- error param in setadmin')
            return;
        }
        // 发送请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("userid",_userId);   // 玩家ID
        data.Add("groupId",_groupId);// 亲友圈ID
        data.Add("isadmin",_isAdmin); // 是否是管理员 1 是 0 不是
        const action = new ActionNet(this,setadminCb,setadminCb);
        WebRequest.FriendCircle.setadmin(action,data);
    }

    /**
     * 修改亲友圈信息
     */
    public static modifyFriendCircleInfo(name: string,noticContent: string, groupId: number, act?: Action) {
        let action_ = act;
        let _noticContent = noticContent;
        let _groupId = groupId;
        let _name = name;

        let modifyFriendCircleInfoCb = (args)=>{
            cc.info("--- modifyFriendCircleInfoCb callback: ",args);
            
            if (!args || !args.status) {
                return;
            }
         
            if ("success" != args.status) {
                return;
            }

            if (FriendCircleWebHandle._modifyFriendCirleInfoHandle) {
                FriendCircleWebHandle._modifyFriendCirleInfoHandle.Run([{nickName: _name,notice: _noticContent}]);
            }
            // 回调
            if (action_) {
                action_.Run([args]);
            }
        }
        
        if (!_noticContent || !_groupId) {
            cc.info('-- error param in setadmin')
            return;
        }

        // 发送请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("title",_name);         // 标题
        data.Add("friendId",_groupId);   // ID
        data.Add("notice",_noticContent); // 内容
        const action = new ActionNet(this,modifyFriendCircleInfoCb,modifyFriendCircleInfoCb);
        WebRequest.FriendCircle.modifyFriendCircleInfo(action,data);
    
    }

    /********************************************************** 亲友圈战绩 ***************************************************/

    /**
     * 获取亲友圈统计数据数据
     */
    public static getGroupStat(groupId: number, act?: Action) {
        let action_ = act;
        let _groupId = groupId;

        let getGroupStatCb = (args)=>{
            cc.info("--- getGroupStatCb callback: ",args);
            
            if (!args || !args.status) {
                return;
            }
         
            if ("success" != args.status) {
                return;
            }
            
            // 回调
            if (action_) {
                action_.Run([args]);
            }
        }
        
        if (!_groupId) {
            cc.info('-- error param in setadmin')
            Global.Instance.UiManager.CloseLoading();
            return;
        }

        // 发送请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("friendId",_groupId);// ID
        data.Add("api_version",'1');  // 接口的版本号
        const action = new ActionNet(this,getGroupStatCb,getGroupStatCb);
        WebRequest.FriendCircle.getGroupStat(action,data);
    }

    /**
     * 获取局数排行数据
     */
    public static getRoundRankList(name: string,noticContent: string, groupId: number, act?: Action) {
        let action_ = act;
        let _noticContent = noticContent;
        let _groupId = groupId;
        let _name = name;

        let modifyFriendCircleInfoCb = (args)=>{
            cc.info("--- modifyFriendCircleInfoCb callback: ",args);
            
            if (!args || !args.status) {
                return;
            }
         
            if ("success" != args.status) {
                return;
            }

            if (FriendCircleWebHandle._modifyFriendCirleInfoHandle) {
                FriendCircleWebHandle._modifyFriendCirleInfoHandle.Run([{nickName: _name,notice: _noticContent}]);
            }
            // 回调
            if (action_) {
                action_.Run([args]);
            }
        }
        
        if (!_noticContent || !_groupId) {
            cc.info('-- error param in setadmin')
            return;
        }

        // 发送请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("title",_name);         // 标题
        data.Add("friendId",_groupId);   // ID
        data.Add("notice",_noticContent); // 内容
        const action = new ActionNet(this,modifyFriendCircleInfoCb,modifyFriendCircleInfoCb);
        WebRequest.FriendCircle.modifyFriendCircleInfo(action,data);
    }
}