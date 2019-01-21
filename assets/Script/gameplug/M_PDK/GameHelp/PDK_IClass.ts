const { ccclass, property } = cc._decorator;
import { GameIF } from "../../../CommonSrc/GameIF";
import { ScoreView,GameInfo,TimeFlag ,CardType,GameRule,TableInfo} from "./PDK_GameHelp";
import { AudioType } from "../../../CustomType/Enum";
import { M_PDK_GameMessage } from "../../../CommonSrc/M_PDK_GameMessage";

export interface IPDKClass {
    GetSpeed();
    IsCreateTable();
    GetSelfState();
    ShowWanFa();
    ShowMaps();
    IsVideo(): boolean;
    SendData(cm: GameIF.CustomMessage): void;
    GetServerChair(chair: number): number;
    GetClientChair(chair: number): number;
    ScreenShot(hasMask: boolean, node: cc.Node);
    CopyToClipboardInfo(result:string);
    ForceQuit();
    PlayGameSound(soundName: string, type: AudioType, loops: boolean);
    GetSetId(setid:number);

}
export interface IPDKView {
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
    OnReadyAndClear();
    OnTiren(chair: number);
    OnButtonReady();
    GetCardsRes(value: number): cc.SpriteFrame;
    GetGameInfo():GameInfo;
    GetTableInfo():TableInfo;
    GetGameRule():GameRule;
    GetScoreView():ScoreView;
    OutCard(cChair:number,cards:number[],cardType:CardType,isRoundEnd:boolean,isNeedSound:boolean);
    TimerOver(value: TimeFlag);
    Rec_GameStart(msg: GameIF.CustomMessage, aniFinish: boolean);
    playCardTypeAni(cardType:CardType,chair:number,pos:cc.Vec2,cardsCount:number);
    ShowPlayerInfo(chair: number);
    ShowZhuaNiaoIcon(cChair:number);
    changeOperationPlayer(sChair:number,canOut:boolean);
    showFirstIcon(cChair:number);

}

export class PDK {

    private static _ins: PDK = null;
    private _icalss: IPDKClass = null;
    private _iview: IPDKView = null;

    public constructor() {

    }

    /**
     * 静态单例
     * */
    public static get ins(): PDK {
        if (null == PDK._ins) {
            PDK._ins = new PDK();
        }
        return PDK._ins;
    }

    /**
     * 逻辑
     * */
    public get iclass(): IPDKClass {
        return this._icalss;
    }
    public set iclass(value: IPDKClass) {
        this._icalss = value;
    }

    /**
     * 视图
     * */
    public get iview(): IPDKView {
        return this._iview;
    }
    public set iview(value: IPDKView) {
        this._iview = value;
    }
}
