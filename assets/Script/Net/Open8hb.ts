import { ActionNet } from "../CustomType/Action";
import { IDictionary } from "../Interface/IDictionary";
import ConfigData from "../Global/ConfigData";
import Dictionary from "../CustomType/Dictionary";
import Global from "../Global/Global";
import { ConstValues } from "../Global/ConstValues";
import { UrlCtrl_new } from "./UrlCtrl_new";

export namespace WebRequest {

    function doActionJson(url: string, action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
        UrlCtrl_new.LoadJson(url, action, data, method);
    }

    /**
     * 获取一个上传用的结构体
     * @param key 是否自动添加sessionkey
     * @param desPwd 指定安全密钥的密码信息
     */
    export function DefaultData(key: boolean = true, desPwd?: string) {
        const dic = new Dictionary<string, any>();
        if (key) {
            // dic.Add("sessionKey", "2$AQVjZXNoaQAM-FMBW6I0VBCVbc7Df6mxVQdV0KNZwroP");
            dic.Add("sessionKey", Global.Instance.DataCache.UserInfo.UserSessionKey.SessionKey);
        }

        if (desPwd) {
            const encrypt = new JSEncrypt();
            encrypt.setPublicKey(ConstValues.RSA_PublicKey);
            const secret_pwd = encrypt.encrypt(desPwd);
            dic.Add("secret_key", ConstValues.RSA_SecretKey);
            dic.Add("secret_pwd", secret_pwd);

        }
        //dic.Add("t",Date.now());
        return dic;
    }

    export class upyun {
        public static async getGETfilesign(action?: ActionNet, data?: IDictionary<string, any>, method: string = "GET") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/do/api.upyun.getGETfilesign`, action, data, method);
        }
        public static getpostfilesign(action?: ActionNet, types?: string) {
            const data = DefaultData();
            if (types) {
                data.Add("types", types);
            }
            doActionJson(`${ConfigData.webserverinterfaceUrl}/do/api.upyun.getpostfilesign`, action, data, "GET");
        }
        /**
         * 获取七牛云的上传参数
         * 
         * @static
         * @param {ActionNet} [action] 
         * @param {string} [types] 
         * @memberof upyun
         */
        public static getqnpostsign(action?: ActionNet, types?: string) {
            const data = DefaultData();
            if (types) {
                data.Add("types", types);
            }
            doActionJson(`${ConfigData.webserverinterfaceUrl}/do/api.upyun.getqnpostsign`, action, data, "GET");
        }
    }
    
    /**
    *实名认证
    **/
    export class userinfo {

        // header:    设置头像
        // my_signature:    个性签名
        // nick_name:    玩家昵称
        public static set_userinfo(action: ActionNet, header?: string, my_signature?: string, nick_name?: string) {
            const data = DefaultData();
            if (header) {
                data.Add("header", header);
            }
            if (my_signature) {
                data.Add("my_signature", my_signature);
            }
            if (nick_name) {
                data.Add("nick_name", nick_name);
            }
            doActionJson(`${ConfigData.webserverinterfaceUrl}/do/api.s.userinfo.set_userinfo`, action, data, "POST");
        }
        /**
         * 清理活跃度
         * @param action
         * @param data
         */
        public static clear_user_inactive(action?: ActionNet, data?: IDictionary<string, any>, method: string = "GET") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/do/api.s.userinfo.clear_user_inactive`, action, data, method);
        }

        /**
         * 绑定代理信息
         * @param action
         * @param data
         */
        public static bindagent(action?: ActionNet, data?: IDictionary<string, any>, method: string = "GET") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/do/api.s.userinfo.bindagent`, action, data, method);
        }

        /**
         * 获取代理基本信息
         * @param action
         * @param data
         */
        public static get_agent_info(action?: ActionNet, data?: IDictionary<string, any>, method: string = "GET") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/do/api.s.userinfo.get_agent_info`, action, data, method);
        }

        /**
         * 实名认证
         * @param action
         * @param data
         */
        public static bindidcard(action?: ActionNet, data?: IDictionary<string, any>, method: string = "GET") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/do/api.s.userinfo.bindidcard`, action, data, method);
        }


        /**
         * 获取任务列表
         * @param action 回调
         * @param data 
         * @param method 
         */
        public static gettasklist(action?: ActionNet, data?: IDictionary<string, any>, method: string = "GET") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/do/api.s.userinfo.gettasklist`, action, data, method);
        }


        /**
         * 
         * @param action 获取排行榜数据
         * @param data 
         * @param method 
         */
        public static get_rank_list(action?: ActionNet, data?: IDictionary<string, any>, method: string = "GET") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/do/api.s.userinfo.get_rank_list`, action, data, method);
        }

        /**
         * /platfrom/UserInfo.GetUploadPolicy
         */

        
        /**
         * 
         * @param action 获取文件上传策略数据
         * @param data 
         * @param method 
         */
        public static GetUploadPolicy(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/UserInfo.GetUploadPolicy`, action, data, method);
        }

        /**
         * 
         * @param action 获取文件上传策略数据
         * @param data 
         * @param method 
         */
        public static SetUserHeader(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/UserInfo.SetUserHeader`, action, data, method);
        }
        /**
         * 
         * @param action 设置玩家个人相册数据
         * @param data 
         * @param method 
         */
        public static SetUserPhoto(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/UserInfo.SetUserPhoto`, action, data, method);
        }
        /**
         * 
         * @param action 删除玩家个人相册数据
         * @param data 
         * @param method 
         */
        public static DeleteUserPhoto(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/UserInfo.DeleteUserPhoto`, action, data, method);
        }
    }


    export class userlogon {
        public static wx_app(action: ActionNet,data:IDictionary<string,string>) {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/web/userlogon.wx_app`,action,data,"POST");
        }
    }
    export class Pay{
        ///platfrom/Pay.weixinwap
        public static WxAppPay(action:ActionNet,shopId:number,subject:string,appId:string){
            let data = DefaultData(true);

            data.AddOrUpdate("shopId",shopId);
            data.AddOrUpdate("subject",subject);
            data.AddOrUpdate("appId",appId); 

            doActionJson(`${ConfigData.webserverinterfaceUrl}/pay/Pay.WxWapPay`,action,data,"POST"); 
        }
    }

    /**
     * 亲友圈
     */
    export class FriendCircle {
        /**
         * 获取加入的亲友圈列表
         */
        public static getJoinCircleList(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/PyGroup.getlist`, action, data, method);
        }

        /**
         * 获取亲友圈玩法列表
         */
        public static getRuleList(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/PyGroup.getrulelist`, action, data, method);
        }

        /**
         * 获取亲友圈成员列表
         */
        public static getUserList(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/PyGroup.getuserlist`, action, data, method);
        }

        /**
         * 加入亲友圈
         */
        public static join(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/PyGroup.userjoin`, action, data, method);
        }

        /**
         * 创建亲友圈
         */
        public static createCircle(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/PyGroup.create`, action, data, method);
        }

        /**
         * 踢出亲友圈
         */
        public static kick(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/PyGroup.userexit`, action, data, method);
        }

        /**
         * 添加玩法
         */
        public static addRule(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/PyGroup.addrule`, action, data, method);
        }

        /**
         * 删除亲友圈玩法信息
         */
        public static deleteRule(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/PyGroup.deleterule`, action, data, method);
        }

        /**
         * 获取消息列表
         */
        public static getMessageList(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/PyGroup.loadmsg`, action, data, method);
        }

        /**
         * 添加或删除管理员
         */
        public static setadmin(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/PyGroup.setadmin`, action, data, method);
        }

        /**
         * 管理员同意或拒绝加入亲友圈
         */
        public static acceptjoin(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/PyGroup.acceptjoin`, action, data, method);
        }

        /**
         * 修改亲友圈公告
         */
        public static modifyFriendCircleInfo(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/PyGroup.setinfo`, action, data, method);
        }

        /**
         * 获取亲友圈桌子信息
         */
        public static getTableInfo(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/PyGroup.getTableInfo`, action, data, method);
        }

        /**
         * 获取亲友圈战绩统计数据
         */
        public static getGroupGameStat(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/PyGroup.GroupGameStat`, action, data, method);
        }

        /**
         * 成员圈点心
         */
        public static GroupSetHeartFlag(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/PyGroup.GroupSetHeartFlag`, action, data, method);
        }

        /**
         * 战绩点赞
         */
        public static GroupSetRecordFlag(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/PyGroup.GroupSetRecordFlag`, action, data, method);
        }

        /**
         * 禁玩
         */
        public static GroupUserGameBan(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/PyGroup.GroupUserGameBan`, action, data, method);
        }
    }

    /**
     * 战绩回放
     */
    export class replay {

        public static getfile(action?: ActionNet, data?: IDictionary<string, any>, method: string = "GET") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/do/api.s.replay.getfile`, action, data, method);
        }

        public static getcombatgains(action?: ActionNet, data?: IDictionary<string, any>, method: string = "GET") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/do/api.s.replay.getcombatgains`, action, data, method);
        }

        public static getTotalRecordLIst(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/Record.getTotalRecordLIst`, action, data, method);
        }

        public static getSubReplayList(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/Record.getSubReplayList`, action, data, method);
        }

        /**
         * 获取游戏战绩的分享连接
         * @param action 
         * @param data 
         * @param method 
         */
        public static getRecordUrl(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/Record.getRecordUrl`, action, data, method);
        }

    }

    export class system{
        public static getUpdateInfo(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST"){
            doActionJson(`${ConfigData.CommonBaseUrl}/web/System.getUpdateInfo`, action, data, method); 
        }
    }

    // /**
    //  * 邮件系统相关
    //  */
    // export class email {

    //     /**
    //      * 加载邮件列表
    //      * @param action
    //      * @param data
    //      */
    //     public static get_email_list(action?: ActionNet, data?: IDictionary<string, any>, method: string = "GET") {
    //         doActionJson(`${ConfigData.webserverinterfaceUrl}/do/api.s.email.get_email_list`, action, data, method);
    //     }

    //     /**
    //      * 读取邮件
    //      * @param action
    //      * @param data
    //      */
    //     public static read_email(action?: ActionNet, data?: IDictionary<string, any>, method: string = "GET") {
    //         doActionJson(`${ConfigData.webserverinterfaceUrl}/do/api.s.email.read_email`, action, data, method);
    //     }

    // }

    /**
     * 任务
     */
    export class Task {

        /**
         * 任务列表
         * @param action
         * @param data
         */
        public static get_task_list(action?: ActionNet, data?: IDictionary<string, any>, method: string = "GET") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/Task.getTaskList`, action, data, method);
        }

        /**
         * 领取奖励
         * @param action
         * @param data
         */
        public static getReward(action?: ActionNet, data?: IDictionary<string, any>, method: string = "GET") {
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/Task.getTaskGift`, action, data, method);
        }

    }
    /**
    *分享
    */
    export class share {
        /**
         * 分享成功回调
         * {"status":"success","msg":"OK","d":[[1,"2017-06-28T14:32:38.273"]]}
         * {"status":"fail","msg":"今天已经分享过了"}} 
         * @param action 
         * @param data 
         * @returns {"status":"success","msg":"OK","d":[[1,"2017-06-28T14:32:38.273"]]}
         * {"status":"fail","msg":"今天已经分享过了"}} 
         */
        // public static share_success(action?: ActionNet, data?: IDictionary<string, any>, method: string = "GET") {
        //     doActionJson(`${ConfigData.webserverinterfaceUrl}/web/Hall.ShareSuccess`, action, data, method);
        // }
        public static share_success(action:ActionNet,taskId:string){
            let data = DefaultData(true);
            data.AddOrUpdate("taskId", taskId);
            doActionJson(`${ConfigData.webserverinterfaceUrl}/web/Hall.ShareSuccess`,action, data, "POST"); 
        }
    }
    /**
    *排行榜
    */
    export class rank{
        public static rank_success(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST"){
            doActionJson(`${ConfigData.webserverinterfaceUrl}/web/Hall.RankList`, action, data, method);
        }
       
    }

    /**
     * 获取邮件消息
     */
    export class email{
        public static EmailList(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST"){
            doActionJson(`${ConfigData.webserverinterfaceUrl}/web/Hall.GetMsgList`, action, data, method);
        }

        public static SetUserReadMsg(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST"){
            doActionJson(`${ConfigData.webserverinterfaceUrl}/web/Hall.SetUserReadMsg`, action, data, method);
        }
    }

    /**
     * 实名绑定
     */
    export class bind{
        public static BindID(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST"){
            doActionJson(`${ConfigData.webserverinterfaceUrl}/web/Hall.BindIDSuccess`, action, data, method);
        }
    }

    /**
     * 获取充值项
     */
    export class pay{
        public static PayList(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST"){
            doActionJson(`${ConfigData.webserverinterfaceUrl}/pay/Pay.PayList`, action, data, method);
        }
    }

    /**
     * 获取礼品项
     */
    export class gift{
        public static giftList(action?: ActionNet, data?: IDictionary<string, any>, method: string = "GET"){
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/GiftView.getList`, action, data, method);
        }

        public static giftRequest(action:ActionNet, giftId:number, name:string, tel:string, address:string, payAccount:string){
            let data = DefaultData(true);

            data.AddOrUpdate("giftId",giftId);
            data.AddOrUpdate("name",name);
            data.AddOrUpdate("tel",tel); 
            data.AddOrUpdate("address",address);
            data.AddOrUpdate("payAccount",payAccount);

            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/GiftView.giftRequest`, action,data,"GET"); 
        }

        public static showChangeRecord(action?: ActionNet, data?: IDictionary<string, any>, method: string = "GET"){
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/GiftView.showChangeRecord`, action, data, method);
        }
    }

    /**
     * 转盘
     */
    export class Turntable{
        public static GetTurntableGiftList(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST"){
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/Turntable.getPrizeList`, action, data, method);
        }

        public static LuckDrawRequest(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST"){
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/Turntable.LuckDrawRequest`, action, data, method);
        }

        public static getPrizeRecord(action?: ActionNet, data?: IDictionary<string, any>, method: string = "POST"){
            doActionJson(`${ConfigData.webserverinterfaceUrl}/platfrom/Turntable.getPrizeRecord`, action, data, method);
        }
    }
}