import { ConstValues } from "../Global/ConstValues";


export class NIMServiceManage {

     //单例
     private static _ins: NIMServiceManage; 
     public static get Instance(): NIMServiceManage {
         if (!NIMServiceManage._ins) {
            NIMServiceManage._ins = new NIMServiceManage();
         }
         return NIMServiceManage._ins;
     }

     


    public Init() {
        NIM.getInstance({
            debug: false,
            // debug: true,
            appKey: ConstValues.NIMAppKey,
            account: 'test_210001',
            token: '657de44d4da1610e1af61da2583e634c5759bb00',
            onconnect: this.onConnect,
            onwillreconnect: this.onWillReconnect,
            ondisconnect: this.onDisconnect,
            onerror: this.onError,
            onupdatesession:this.onupdatesession

        });
    }
    private onConnect() {
        console.log('连接成功');
    }
    private onupdatesession(opt) {
        cc.log("-------收到消息--------");
        cc.log(opt.lastMsg.text);
    }
    private onWillReconnect(obj) {
        // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
        console.log('即将重连');
        console.log(obj.retryCount);
        console.log(obj.duration);
    }
    private onDisconnect(error) {
        // 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
        console.log('丢失连接');
        console.log(error);
        if (error) {
            switch (error.code) {
                // 账号或者密码错误, 请跳转到登录页面并提示错误
                case 302:
                    break;
                // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
                case 417:
                    break;
                // 被踢, 请提示错误后跳转到登录页面
                case 'kicked':
                    break;
                default:
                    break;
            }
        }
    }
    private onError(error) {
        console.log(error);
    }


}