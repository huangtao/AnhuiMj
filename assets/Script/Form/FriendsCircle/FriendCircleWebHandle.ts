/**
 *    处理亲友圈Web请求 
 */
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
     * 设置处理申请消息回调
     */
    private static _dealApplyMsgHandle: Action = null;

    /**
     * 禁玩或解禁回调事件
     */
    private static _banHandle: Action = null;

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
    public static setBanHandle(act: Action){
        if (!act) {
            return;
        }

        FriendCircleWebHandle._banHandle = act;
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
     * 设置处理申请消息回调
     */
    public static setDealApplyMsgHandle(act: Action){
        if (!act) {
            return;
        }

        FriendCircleWebHandle._dealApplyMsgHandle = act;
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
     * 请求失败回调
     */
    public static requestError( args: any){
        Global.Instance.UiManager.ShowTip(args["message"]);
        Global.Instance.UiManager.CloseLoading();
    }

     /**
     * 请求加入或创建的亲友圈列表
     */
    public static requestFriendCircleList(act?: Action){
        let action_ = act;
        let getJoinCircleListCb = (args)=>{
            cc.log('-- getJoinCircleListCb ',args);

            if (!args || !args.status) {
                // 回调
                if (action_) {
                    action_.Run([args]);
                    return;
                }
                return;
            }
            
            if ("success" != args.status) {
                // 回调
                if (action_) {
                    action_.Run([args]);
                    return;
                }
                return;
            }

            let tmpList = args.data;
            let tmpArray = new Array<FriendCircleInfo>();
            for (var idx = 0; idx < tmpList.length; ++idx) {
                let info = new FriendCircleInfo();
                info.ID = tmpList[idx].id;
                info.userId = tmpList[idx].userId;
                info.accessGame = tmpList[idx].accessGame;
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
            Global.Instance.UiManager.CloseLoading();
            cc.log('-- requestFriendCircRuleCb  ',args);

            if (!args || !args.status) {
                return;
            }
         
            if ("success" != args.status) {
                return;
            }

            let tmpList = args.data;
            
            let tmpArray = new Array<FriendCircleRule>();
            for (var idx = 0; idx < tmpList.length; ++idx) {
                let info = new FriendCircleRule();
                info.friendId = parseInt(groupId_);
                info.Id = tmpList[idx].id;
                info.sortId = tmpList[idx].sortId;
                info.gameId = tmpList[idx].gameId;
                info.gameName = tmpList[idx].gameName;
                info.ruleStr = tmpList[idx].ruleStr;
                info.ruleDesc = tmpList[idx].ruleDesc;
                info.moduleName = tmpList[idx].moduleName;
                tmpArray.push(info);
            }

            // 更新本地缓存数据
            FriendCircleDataCache.Instance.addOrUpdateWanfaList(groupId_ + '',tmpArray);

            // 回调
            if (action_) {
                action_.Run([tmpArray]);
            }
        }
        
        // 发送获取亲友圈玩法请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("groupId",groupId);
        const action = new ActionNet(this,requestFriendCircRuleCb,FriendCircleWebHandle.requestError);
        WebRequest.FriendCircle.getRuleList(action,data);
    }


    /**
     * 添加玩法
     */
    public static addRule(ruleInfo: FriendCircleRule){
        if (!ruleInfo || !ruleInfo.sortId) {
            cc.log("error: addRule param is error!");
            return;
        }

        let addRuleCb = (args)=>{
            cc.log('-- addRuleCb ',args);
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
        data.Add("sortId",ruleInfo.sortId);
        
        const action = new ActionNet(this,addRuleCb,FriendCircleWebHandle.requestError);
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
            cc.log('-- deleteRuleCb ',args);

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
        const action = new ActionNet(this,deleteRuleCb,FriendCircleWebHandle.requestError);
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
            if (!args.column || !args.data) {
                return;
            }

            FriendCircleDataCache.Instance.addOrUpdateMemberList(args.column, args.data);

            // 回调
            if (action_) {
                action_.Run([args]);
            }
        }

        this.GroupGameStat(parseInt(groupId),0,0,2,"",0,0,"","",new Action(this, getMemberListCb));
    }

    /**
     * 加入亲友圈
     */
    public static joinFriendCircle(groupId: string, act?: Action){
        let action_ = act;
        let groupId_ = groupId;
        let joinFriendCircCb = (args)=>{
            cc.log("--- joinFriendCircle callback: ",args);
            
            if (!args || !args.status) {
                return;
            }
         
            if ("success" != args.status) {
                Global.Instance.UiManager.ShowTip(args.msg);;
                return;
            }

            cc.log("--- joinFriendCircle callback: ",args);

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
            cc.log('--- kickMember ',args);

            if (!args || !args.status) {
                return;
            }
         
            if ("success" != args.status) {
                return;
            }

            Global.Instance.UiManager.ShowTip("操作成功！");

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
        const action = new ActionNet(this,requestFriendCircRuleCb,FriendCircleWebHandle.requestError);
        WebRequest.FriendCircle.kick(action,data);
    }

    /**
     * 获取消息列表
     */
    public static getMessageList(groupId: string, act?: Action){        
        let action_ = act;
        let groupId_ = groupId;
        let getMessageListCb = (args)=>{
            cc.log('--- getMessageList ',args);
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
        const action = new ActionNet(this,getMessageListCb,FriendCircleWebHandle.requestError);
        WebRequest.FriendCircle.getMessageList(action,data);
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
            cc.log("--- agreeOrRefuseJoin callback: ",args);
            
            if (!args || !args.status) {
                return;
            }
         
            if ("success" != args.status) {
                return;
            }

            cc.log("--- agreeOrRefuseJoinFriendCircle callback: ",args);

            if (action_) {
                action_.Run([args]);
            }

            if (this._dealApplyMsgHandle) {
                this._dealApplyMsgHandle.Run([args]);
            }
        }
        
        if (!_logId || !_groupId || !_status) {
            cc.log('-- error param in agreeOrRefuseJoin')
            return false;
        }
        // 发送请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("logId",_logId);   // 玩家ID
        data.Add("groupId",_groupId);// 亲友圈ID
        data.Add("status",_status); // 操作：拒绝或同意
        const action = new ActionNet(this,acceptjoinCb,FriendCircleWebHandle.requestError);
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
            cc.log("--- addOrDeleteAdmin callback: ",args);
            
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
            cc.log('-- error param in setadmin')
            return;
        }
        // 发送请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("userid",_userId);   // 玩家ID
        data.Add("groupId",_groupId);// 亲友圈ID
        data.Add("isadmin",_isAdmin); // 是否是管理员 1 是 0 不是
        const action = new ActionNet(this,setadminCb,FriendCircleWebHandle.requestError);
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
            cc.log("--- modifyFriendCircleInfoCb callback: ",args);
            
            if (!args || !args.status) {
                return;
            }
         
            if ("success" != args.status) {
                return;
            }

            Global.Instance.UiManager.ShowTip("修改成功！");
            
            // 提示修改成功
            if (FriendCircleWebHandle._modifyFriendCirleInfoHandle) {
                FriendCircleWebHandle._modifyFriendCirleInfoHandle.Run([{nickName: _name,notice: _noticContent}]);
            }
            // 回调
            if (action_) {
                action_.Run([args]);
            }
        }
        
        if (!_noticContent || !_groupId) {
            cc.log('-- error param in setadmin')
            return;
        }

        // 发送请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("title",_name);         // 标题
        data.Add("friendId",_groupId);   // ID
        data.Add("notice",_noticContent); // 内容
        const action = new ActionNet(this,modifyFriendCircleInfoCb,FriendCircleWebHandle.requestError);
        WebRequest.FriendCircle.modifyFriendCircleInfo(action,data);
    
    }

    /********************************************************** 亲友圈战绩 ***************************************************/
    /**
     * 禁玩
     */
    public static GroupUserGameBan(groupId: number, bantype: number, ruleId: number,  gameId: number, opType: string, userId: number, act?: Action) {
        let action_ = act;

        let GroupUserGameBan = (args)=>{
            cc.log("--- GroupUserGameBan callback: ",args);
            
            // 回调
            if (action_) {
                action_.Run([args]);
            }

            if (FriendCircleWebHandle._banHandle) {
                FriendCircleWebHandle._banHandle.Run([args]);
            }
        }
        
        if (!groupId) {
            return;
        }

        // 发送请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("friendId",groupId);
        data.Add("in_bantype",bantype);
        data.Add("in_friendgameid",ruleId);
        data.Add("in_gameid",gameId);
        data.Add("in_type",opType);
        data.Add("in_userid",userId);
        
        // Global.Instance.UiManager.ShowLoading("正在执行操作...");
        const action = new ActionNet(this, GroupUserGameBan, GroupUserGameBan);
        WebRequest.FriendCircle.GroupUserGameBan(action,data);
    }

    /**
     * 根据时间、玩家Id,游戏Id查询战绩
     */
    public static GroupGameStat(groupId: number, gameId: number, userId: number = 0, in_querytype: number, in_nickname: string = "", startId: number = 0, count: number = 0, beginTime: string, endTime: string, act?: Action) {
        let action_ = act;
        let _groupId = groupId;

        let getGroupStatCb = (args)=>{
            cc.log("--- getGroupStatCb callback: ",args);
            Global.Instance.UiManager.CloseLoading();
            // 回调
            if (action_) {
                action_.Run([args]);
            }
        }
        
        if (!_groupId) {
            cc.log('-- error param in setadmin')
            Global.Instance.UiManager.CloseLoading();
            return;
        }

        // 发送请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("friendId",_groupId);
        data.Add("gameId",gameId);
        data.Add("userId",userId);
        data.Add("in_querytype",in_querytype);
        data.Add("in_nickname",in_nickname);
        data.Add("beginTime",beginTime);
        data.Add("endTime",endTime);
        data.Add("startId",startId);
        data.Add("count", count);  

        const action = new ActionNet(this, getGroupStatCb, getGroupStatCb);
        WebRequest.FriendCircle.getGroupGameStat(action,data);
    }

    /**
     * 点心
     */
    public static GroupSetHeartFlag(groupId: number, gameId: number, userId: number = 0, beginTime: string, endTime: string, act?: Action) {
        let action_ = act;
        let _groupId = groupId;

        let groupSetHeartFlag = (args)=>{
            cc.log("--- groupSetHeartFlag callback: ",args);
            Global.Instance.UiManager.CloseLoading();
            // 回调
            if (action_) {
                action_.Run([args]);
            }
        }
        
        if (!_groupId || !gameId || !userId) {
            cc.log("--- GroupSetHeartFlag: param is error");
            Global.Instance.UiManager.CloseLoading();
            return;
        }

        // 发送请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("friendId",_groupId);
        data.Add("in_gameid",gameId);
        data.Add("in_begintime",beginTime);
        data.Add("in_endtime",endTime);
        data.Add("in_userid",userId);
        
        Global.Instance.UiManager.ShowLoading("正在执行操作...");
        const action = new ActionNet(this, groupSetHeartFlag, groupSetHeartFlag);
        WebRequest.FriendCircle.GroupSetHeartFlag(action,data);
    }

    /**
     * 点赞
     */
    public static GroupSetRecordFlag(groupId: number, setId: number, act?: Action) {
        let action_ = act;
        let _groupId = groupId;
        let _setId = setId;

        let GroupSetRecordFlag = (args)=>{
            cc.log("--- GroupSetRecordFlag callback: ",args);
            Global.Instance.UiManager.CloseLoading();
            // 回调
            if (action_) {
                action_.Run([args]);
            }
        }
        
        if (!_groupId) {
            Global.Instance.UiManager.CloseLoading();
            return;
        }

        // 发送请求
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("friendid",_groupId);
        data.Add("setId",_setId);
        
        Global.Instance.UiManager.ShowLoading("正在执行操作...");
        const action = new ActionNet(this, GroupSetRecordFlag, GroupSetRecordFlag);
        WebRequest.FriendCircle.GroupSetRecordFlag(action,data);
    }
}