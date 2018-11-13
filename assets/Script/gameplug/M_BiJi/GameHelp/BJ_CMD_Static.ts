const { ccclass, property } = cc._decorator;

/**
 * 游戏ID
 */
export const GameID: number = 51;

export enum CMD_Static {
    /////////////////////////////////////////////////////////////////////服务端

    /**
     * 特殊属性
     */
    SUB_S_Attribute = 11,
    /**
     * 游戏开始
     */
    SUB_S_GameStart = 12,
    /**
     * 下注开始
     */
    SUB_S_BetStart = 13,
    /**
     * 选牌开始
     */
    SUB_S_SelectCardsStart = 14,
    /**
     * 选牌
     */
    SUB_S_SelectCards = 15,
    /**
     * 游戏结果
     */
    SUB_S_GameResult = 16,
    /**
     * 玩家余额
     */
    SUB_S_PlayerScore = 17,
    /**
     * 庄家变更-随机庄家场
     */
    SUB_S_MasterChange = 18,
    /**
     * 断线重连-抢庄
     */
    SUB_S_GameContext_RobMaster = 19,
    /**
     * 断线重连-下注
     */
    SUB_S_GameContext_Bet = 20,
    /**
     * 断线重连-选牌
     */
    SUB_S_GameContext_SelectCards = 21,
    /**
     * 断线重连-结果
     */
    SUB_S_GameContext_Result=22,
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
     * 亮自己牌
     */
    SUB_S_ShowCardTypeSelf = 38,
        /**
     * 亮自己牌
     */
    SUB_S_FinishPoker = 39,
           /**
     * 亮自己牌
     */
    SUB_S_DropCards = 40,
    /**
     * 请求续局
     */
    SUB_S_NextGamePlease = 41,
    /**
     * 提示消息
     */
    SUB_S_ShowMsg = 50,
    /**
     * 抢庄
     */
    SUB_C_RobMaster = 101,
    /**
     * 下注
     */
    SUB_C_Bet = 102,
    /**
     * 玩家准备
     */
    SUB_C_Ready = 122,
}
