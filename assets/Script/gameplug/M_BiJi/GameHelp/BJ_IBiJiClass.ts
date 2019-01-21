const { ccclass, property } = cc._decorator;
import { GameIF } from "../../../CommonSrc/GameIF";
import { TimeFlag } from "./BJ_GameHelp";
import { AudioType } from "../../../CustomType/Enum";
import { M_BiJi_GameMessage } from "../../../CommonSrc/M_BiJi_GameMessage";

export interface IBiJiClass {
    IsVideo(): boolean;
    IsCreateTable();
    PlayGameSound(soundName: string, type: AudioType, loops: boolean);
    GetServerChair(chair: number): number;
    GetClientChair(chair: number): number;
    SendData(cm: GameIF.CustomMessage): void;
    GetSpeed();
    GetSelfState();
    ScreenShot(hasMask: boolean, node: cc.Node);
    CopyToClipboardInfo(result:string);
    ForceQuit();
    VoiceType();
    ShowWanFa();
    ShowMaps();
    GetSetId(setid:number);
}
export interface IBiJiView {
    GameModel();
    Master();

    OnButtonExit();
    OnButtonShare();
    OnButtonCopy();
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
    OnButtonSelectHelp();
    GetCardsRes(value: number): cc.SpriteFrame;
    GetSmallCardsRes(value: number): cc.SpriteFrame;
    GetXiScoreTypeRes(value:string):cc.SpriteFrame;
    Rec_GameStart(msg: GameIF.CustomMessage, aniFinish: boolean);
    Rec_BetStart(msg: GameIF.CustomMessage, aniFinish: boolean);
    Rec_SelectCardsStart(msg: GameIF.CustomMessage, aniFinish: boolean);
    Rec_GameResult(msg: GameIF.CustomMessage, aniFinish: boolean);
    Rec_ScoreView(msg: GameIF.CustomMessage, aniFinish: boolean);
    Rec_MasterChange(msg: GameIF.CustomMessage, aniFinish: boolean);
    UpdatePlayerScoreByGameResult(data: M_BiJi_GameMessage.CMD_S_GameResult);
    Rec_PlayerScore(msg: GameIF.CustomMessage, aniFinish: boolean);
    TimerOver(value: TimeFlag);
    ShowPlayerInfo(chair: number);
    ShowQueryScore();
    ShowTotalScore();
    GetPlayerXiScore();
    GetCardType(cards:number[]):number;

}

export class BiJi {

    private static _ins: BiJi = null;
    private _icalss: IBiJiClass = null;
    private _iview: IBiJiView = null;

    public constructor() {

    }

    /**
     * 静态单例
     * */
    public static get ins(): BiJi {
        if (null == BiJi._ins) {
            BiJi._ins = new BiJi();
        }
        return BiJi._ins;
    }

    /**
     * 逻辑
     * */
    public get iclass(): IBiJiClass {
        return this._icalss;
    }
    public set iclass(value: IBiJiClass) {
        this._icalss = value;
    }

    /**
     * 视图
     * */
    public get iview(): IBiJiView {
        return this._iview;
    }
    public set iview(value: IBiJiView) {
        this._iview = value;
    }
}
