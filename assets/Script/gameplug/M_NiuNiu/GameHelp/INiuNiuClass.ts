const { ccclass, property } = cc._decorator;
import { GameIF } from "../../../CommonSrc/GameIF";
import { TimeFlag } from "./GameHelp";
import { AudioType } from "../../../CustomType/Enum";
import { M_NiuNiu_GameMessage } from "../../../CommonSrc/M_NiuNiu_GameMessage";

export interface INiuNiuClass {
    IsVideo(): boolean;
    IsCreateTable();
    PlayGameSound(soundName: string, type: AudioType, loops: boolean);
    GetServerChair(chair: number): number;
    GetClientChair(chair: number): number;
    SendData(cm: GameIF.CustomMessage): void;
    GetSpeed();
    GetSelfState();
    ScreenShot(hasMask: boolean, node: cc.Node);
    ForceQuit();
    VoiceType();
}
export interface INiuNiuView {
    GameModel();
    Master();

    OnButtonExit();
    OnButtonShare();
    OnButtonAudio();
    OnButtonHelp();
    OnButtonChat();
    OnButtonVoice();
    OnVoiceStop();
    OnButtonQueryScore();
    OnButtonTiren();
    OnTiren(chair: number);
    OnButtonReady();
    OnButtonCard(value: number[]);
    OnButtonSelectCard(value: boolean);
    OnButtonRubCard();
    OnButtonSelectHelp();
    GetCardsRes(value: number): cc.SpriteFrame;

    Rec_GameStart(msg: GameIF.CustomMessage, aniFinish: boolean);
    Rec_BetStart(msg: GameIF.CustomMessage, aniFinish: boolean);
    Rec_SelectCardsStart(msg: GameIF.CustomMessage, aniFinish: boolean);
    Rec_GameResult(msg: GameIF.CustomMessage, aniFinish: boolean);
    Rec_ScoreView(msg: GameIF.CustomMessage, aniFinish: boolean);
    Rec_MasterChange(msg: GameIF.CustomMessage, aniFinish: boolean);
    UpdatePlayerScoreByGameResult(data: M_NiuNiu_GameMessage.CMD_S_GameResult);
    Rec_PlayerScore(msg: GameIF.CustomMessage, aniFinish: boolean);
    TimerOver(value: TimeFlag);
    ShowPlayerInfo(chair: number);
    ShowQueryScore();
    ShowTotalScore();
    ShowWanfa();
    SkipRubCard();
    RubCardOver();
}

export class NiuNiu {

    private static _ins: NiuNiu = null;
    private _icalss: INiuNiuClass = null;
    private _iview: INiuNiuView = null;

    public constructor() {

    }

    /**
     * 静态单例
     * */
    public static get ins(): NiuNiu {
        if (null == NiuNiu._ins) {
            NiuNiu._ins = new NiuNiu();
        }
        return NiuNiu._ins;
    }

    /**
     * 逻辑
     * */
    public get iclass(): INiuNiuClass {
        return this._icalss;
    }
    public set iclass(value: INiuNiuClass) {
        this._icalss = value;
    }

    /**
     * 视图
     * */
    public get iview(): INiuNiuView {
        return this._iview;
    }
    public set iview(value: INiuNiuView) {
        this._iview = value;
    }
}