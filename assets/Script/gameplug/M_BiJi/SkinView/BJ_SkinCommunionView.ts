
import SkinChatBox from "./BJ_SkinChatBox";
import SkinVoicePlay from "./BJ_SkinVoicePlay";
import { PlayerCount } from "../GameHelp/BJ_GameHelp";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinCommunionView extends cc.Component {
    @property(cc.Prefab)
    private prefab_chatBox: cc.Prefab=null;
    private skinChatBox: SkinChatBox[];
    @property(cc.Prefab)
    private prefab_voicePlay: cc.Prefab=null;
    private skinVoicePlay: SkinVoicePlay[];

    onLoad() {
        this.skinChatBox = new Array(PlayerCount);
        for (let i = 0; i < this.skinChatBox.length; i++) {
            this.skinChatBox[i] = cc.instantiate(this.prefab_chatBox).getComponent<SkinChatBox>(SkinChatBox);
            this.node.addChild(this.skinChatBox[i].node);
            this.skinChatBox[i].SetChair(i);
        }
        this.skinVoicePlay = new Array(PlayerCount);
        for (let i = 0; i < this.skinVoicePlay.length; i++) {
            this.skinVoicePlay[i] = cc.instantiate(this.prefab_voicePlay).getComponent<SkinVoicePlay>(SkinVoicePlay);
            this.node.addChild(this.skinVoicePlay[i].node);
            this.skinVoicePlay[i].SetChair(i);
        }
    }

    public Init() {
        for (let i = 0; i < this.skinChatBox.length; i++) {
            this.skinChatBox[i].Init();
            this.skinVoicePlay[i].Init();
        }
    }
    public Clear(chair: number) {
        this.skinChatBox[chair].Init();
        this.skinVoicePlay[chair].Init();
    }

    public Show(chair: number, type: number, msg: string = "") {
        if (type == 0)
            this.ShowChat(chair, msg);
        else if (type == 1)
            this.ShowVoice(chair);
        else if (type == 2)
            this.StopVoice(chair);
    }
    /**
     * 显示文字聊天消息
     */
    private ShowChat(chair: number, value: string) {
        console.log("ShowChat:" + chair + "," + value);
        this.skinChatBox[chair].ShowChat(value);
    }
    /**
     * 播放语音
     */
    private ShowVoice(chair: number) {
        this.skinVoicePlay[chair].startPlay();
    }
    /**
     * 关闭语音
     */
    private StopVoice(chair: number) {
        this.skinVoicePlay[chair].stopPlay();
    }
}
