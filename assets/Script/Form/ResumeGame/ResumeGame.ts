import UIBase from "../../Form/Base/UIBase";
import Dictionary from "../../CustomType/Dictionary";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { LocalStorage } from "../../CustomType/LocalStorage";
import Global from "../../Global/Global";
import { Action } from "../../CustomType/Action";
import TopFormBase from "../General/TopFormBase";
import ResumeGamePlayerItem from "./ResumeGamePlayerItem";
import SendMessage from "../../Global/SendMessage";
import { UIName } from "../../Global/UIName";
import { EventCode } from "../../Global/EventCode";
import { ResumeGameParam } from "../../CustomType/ResumeGameParam";

const { ccclass, property } = cc._decorator;

@ccclass
export class ResumeGame extends UIBase<ResumeGameParam> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    private _gameEndAct: Action = null;
    private _agreeResumeGameAct: Action = null;

    /**
     * 同意继续游戏按钮
     */
    @property(cc.Button)
    btn_agreeResum: cc.Button = null;

    /**
     * 结束游戏按钮
     */
    @property(cc.Button)
    btn_gameEnd: cc.Button = null;

    /**
     * 玩家列表面板Layout 
     */
    @property(cc.Layout)
    layout_playerList: cc.Layout = null;

    /**
     * 玩家Item预制体
     */
    @property(cc.Prefab)
    prefab_playerItem: cc.Prefab = null;

    /**
     * 倒计时时间显示 
     */
    @property(cc.Label)
    lab_countDownTime: cc.Label = null;

    /**
     * 同意按钮遮罩
     */
    @property(cc.Mask)
    mask_agreeBtn: cc.Mask = null;

    /**
     * 结束游戏按钮遮罩
     */
    @property(cc.Mask)
    mask_gameEnd: cc.Mask = null;

    @property(cc.Label)
    labeltips: cc.Label = null;

    /**
     * 玩家信息预制体列表
     */
    private _playerList: ResumeGamePlayerItem[] = [];

    /**
     * 倒计时时间
     */
    private _countDownTime: number = 0;
    private _currentGameVoteType: number = 1;

    public InitShow() {
        super.InitShow();
        this._playerList = [];
        cc.log("--- resumeGame playerStatusInfo: ", this.ShowParam);

        if (this.layout_playerList) {
            this.layout_playerList.node.removeAllChildren();
        }

        if (this.btn_agreeResum
            && this.mask_agreeBtn
            && this.btn_gameEnd
            && this.mask_gameEnd) {
            this.btn_agreeResum.enabled = true;
            this.mask_agreeBtn.node.active = false;
            this.btn_gameEnd.enabled = true;
            this.mask_gameEnd.node.active = false;
        }

        if (this.ShowParam) {
            let labelTipsStr: string = `续局提示`;
            switch (this.ShowParam.gameVoteType) {
                case 0:
                case 1:
                    labelTipsStr = "续局提示";
                    this._currentGameVoteType = 1;
                    break;
                default:
                    labelTipsStr = "三人投票";
                    this._currentGameVoteType = this.ShowParam.gameVoteType;
                    break;
            }
            this.labeltips.string = labelTipsStr;
            this._gameEndAct = this.ShowParam.gameEndEventHandle;
            this._agreeResumeGameAct = this.ShowParam.agreeEventHandle;
            this.initPlayerShow(this.ShowParam.playerList);
            this._countDownTime = this.ShowParam.countDownTime;
            this.lab_countDownTime.string = this._countDownTime + '秒';
        }

        // 初始化投票状态
        if (this.ShowParam.statusList) {
            for (var idx = 0; idx < this.ShowParam.statusList.length; ++idx) {
                this.updatePlayerVoteStatus(idx, this.ShowParam.statusList[idx]);
            }
        }

        if (this._countDownTime > 0) {
            // 开启倒计时
            this.schedule(this.countDownTimeCallback, 1);
        }
        this.node.active = true;
    }

    /**
     * 初始化玩家数据显示
     */

    public initPlayerShow(playerList: any) {
        if (!playerList
            || 0 == playerList.length
            || !this.prefab_playerItem
            || !this.layout_playerList) {
            return;
        }

        // 创建玩家Item并初始化显示
        for (let idx = 0; idx < playerList.length; ++idx) {
            if (!(playerList[idx] && null != this.ShowParam.scoreList[idx]
            )) {
                continue;
            }

            let node_player: cc.Node = cc.instantiate(this.prefab_playerItem);
            let comp_player: ResumeGamePlayerItem = node_player.getComponent("ResumeGamePlayerItem");
            playerList[idx].score = this.ShowParam.scoreList[idx];
            comp_player.initUI(playerList[idx]);
            this._playerList.push(comp_player);
            this.layout_playerList.node.addChild(node_player);
            this.btn_agreeResum.interactable = true;
            this.btn_gameEnd.interactable = true;
            this.mask_agreeBtn.node.active = false;
            this.mask_gameEnd.node.active = false;
        }
    }
    public CloseUiContinue() {
        Global.Instance.UiManager.CloseUi(UIName.ResumeGame);
    }

    /**
     * 更新玩家投票状态
     */
    public updatePlayerVoteStatus(id: number, status: QL_Common.GameVoteStatus) {
        let comp_player = null;
        cc.log("--- player vote: " + "chair" + id + "status" + status);
        for (var i = 0; i < this._playerList.length; i++) {
            if (this._playerList[i].playerid == id) {
                comp_player = this._playerList[i];
            }
        }

        if (comp_player) {
            comp_player.updateVoteStatusShow(status);
        }
        //判断所有玩家是否都同意续局
        for (var k = 0, x = 0; k < this._playerList.length; k++) {
            if (this._playerList[k] != null && this._playerList[k].lab_status.string == '同意续局') {
                x++;
            }
            if (x == this._playerList.length) {
                Global.Instance.UiManager.CloseUi(UIName.ResumeGame);
                break;

            }
        }
        if (status == QL_Common.GameVoteStatus.Denied) {
            Global.Instance.UiManager.CloseUi(UIName.ResumeGame);
        }
    }

    /** 
     * 倒计时定时器
     */
    public countDownTimeCallback() {
        if (this._countDownTime > 0) {
            this._countDownTime--;
            this.lab_countDownTime.string = this._countDownTime + '秒';
        } else {
            this.unschedule(this.countDownTimeCallback);
        }
    }

    /**
     * 游戏结束按钮回调事件
     */
    public btnGameEndEvent() {
        // if (this._gameEndAct) {
        //     cc.log('--- player argee refuse resume game. ');
        //     this._gameEndAct.Run([]);
        // }
        this.btn_gameEnd.interactable = false;
        this.btn_agreeResum.interactable = false;
        this.mask_agreeBtn.node.active = true;
        this.mask_gameEnd.node.active = true;
        Global.Instance.UiManager.CloseUi(UIName.ResumeGame);
        SendMessage.Instance.GameVoteStatus(this._currentGameVoteType, QL_Common.GameVoteStatus.Denied);
    }

    /**
     * 同意续局按钮事件回调
     */
    public btnAgreeResumeGameEvent() {
        this.btn_agreeResum.interactable = false;
        this.btn_gameEnd.interactable = false;
        this.mask_agreeBtn.node.active = true;
        this.mask_gameEnd.node.active = true;
        SendMessage.Instance.GameVoteStatus(this._currentGameVoteType,QL_Common.GameVoteStatus.Agree);

        // if (this._agreeResumeGameAct) {
        //     this._agreeResumeGameAct.Run([]);

        //     if (this.btn_agreeResum 
        //         && this.mask_agreeBtn
        //         && this.btn_gameEnd
        //         && this.mask_gameEnd) {
        //         this.mask_agreeBtn.node.active = true;
        //         this.mask_gameEnd.node.active = true
        //         this.btn_agreeResum.enabled = false;
        //         this.btn_gameEnd.enabled = false;
        //     }

        //     cc.log('--- player argee resume game. ');
        // }
    }

    /**
     * 
     * @param eventCode 
     * @param value 
     */
    OnEventComeIn(eventCode: number, value: any): boolean {
        switch (eventCode) {
            case EventCode.onNetNoResponse: {
                this.CloseClick();
            }
        }
        return super.OnEventComeIn(eventCode, value);
    }
}
