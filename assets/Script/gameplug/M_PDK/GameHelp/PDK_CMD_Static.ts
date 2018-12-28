const { ccclass, property } = cc._decorator;

/**
 * 游戏ID
 */
export const GameID: number = 52;

export enum CMD_Static {
    /////////////////////////////////////////////////////////////////////服务端
    /**
     * 房间人数
     */
    SUB_S_PeopleNum = 10,
    /**
     * 特殊属性
     */
    SUB_S_Attribute = 11,
    /**
     * 游戏开始
     */
    SUB_S_GameStart = 12,
    /**
     * 小结算
     */
    SUB_S_GameRoundResult = 14,
    /**
     * 出牌
     */
    SUB_S_OutCard = 15,
    /**
     * 玩家余额
     */
    SUB_S_PlayerScore = 17,
    /**
     * 断线重连-出牌
     */
    SUB_S_GameContext_OutCard = 21,
     /**
     * 断线重连-准备阶段
     */
    SUB_S_GameContext_Interval = 22,
    /**
     * 房主信息
     */
    SUB_S_TableCreator = 23,
    /**
     * 请求玩家创建房间
     */
    SUB_S_GameCreatePlease = 31,
    /**
     * 计分板
     */
    SUB_S_ScoreView = 33,
    /**
     * 局数中间时的桌子状态
     */
    SUB_S_TableState = 34,
    /**
     * 解散房间
     */
    SUB_S_DissolveTable = 35,
    /**
     * 强退成功
     */
    SUB_S_ForceLeftSuccess = 36,
    /**
     * 房主离开成功
     */
    SUB_S_TableCreatorLeftSuccess = 37,
    
    /**
     * 提示消息
     */
    SUB_S_ShowMsg = 50,

    /**
     * 发送SetId
     */
    SUB_S_SendSetid = 51,
    /**
     * 玩家准备
     */
    SUB_S_Ready = 122,
}
