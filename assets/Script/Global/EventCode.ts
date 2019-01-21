
export namespace EventCode {

    //系统推送消息事件
    export const SystmPushMsg = 65535;


    //登录成功
    export const LoginSuccess = 1;
    //断线信息到达
    export const OfflineRoom = 2;
    //最新余额
    export const LatestBalance = 3;
    //创建游戏场景
    export const CreateGameScene = 4;
    //初始化游戏
    export const InitGameScene = 5;
    //loading提示信息
    export const NewEmailInfo = 6;
    //微信授权的响应消息
    export const OnWxCodeResp = 7;
    //物理按键按下
    export const onKeyPressed = 8;
    //错误码到达
    export const ErrorCode = 9;
    //我的房间信息
    export const onMyRoomChange = 10;
    //网络无响应
    export const onNetNoResponse = 11;
    //开始播放一条语音
    export const onRecorderPlay = 12;
    //语音播放完成
    export const onRecorderEnd = 13;
    //当微信分享有响应
    export const onWxMessageResp = 14;
    //当录像播放返回
    export const onReplayBack = 15;
    //当被从浏览器拉起
    export const onNewUri = 16;
    /**
     * 获取到的群内玩家创建的房间列表
     */
    export const GroupTableList = 17;
    /**
     * 查询单个桌子信息
     */
    export const SingleTableInfo = 18;

    /**
     * 录音时间过长，已经超时
     */
    export const RecordTimeout = 19;

    /**
     * 邮件状态改变
     */
    export const EmailStatus = 20;

    /**
     * 大厅跑马灯到达
     */
    export const HornHallStart = 21;

    /**
     * 手机号登录成功
     */
    export const MobileLoginSuccess = 22;

    /**
     * 亲友圈消息推送
     */
    export const GroupSystemPush = 23;

    /**
     * 任务完成并未领奖的推送
     */
    export const TaskNumPush = 24;
}