import { BiJi } from "./BJ_IBiJiClass";
import { VoicePath, CommonVoicePath } from "./BJ_GameHelp";
import { AudioType, VoiceType } from "../../../CustomType/Enum";

const { ccclass, property } = cc._decorator;

export default class VoicePlayer {
    /**
     * 播放聊天音效
     */
    public static PlayChatVoice(value: number, gender: number) {
        /*var path = CommonVoicePath;
        if (gender == 1) {
            path += "ChatVoice/Boy/ChatVoiceB_" + value + ".mp3";
        }
        else {
            path += "ChatVoice/Girl/ChatVoiceG_" + value + ".mp3";
        }*/
        var path = VoicePath;
        if (gender == 1) {
            path += "ChatVoice/Boy/system_word_" + (value + 1) + "_boy.mp3";
        }
        else {
            path += "ChatVoice/Girl/system_word_" + (value + 1) + "_girl.mp3";
        }
        path = cc.url.raw(path);
        BiJi.ins.iclass.PlayGameSound(path, AudioType.Effect, false);
    }
    /**
     * 播放牌型音效
     */
    public static PlayCardType(value: number, voicetype: VoiceType, gender: number) {
        if (value < 0 || value > 15) {
            return;
        }
        var path = "";
        /*if (voicetype == VoiceType.Mandarin)
            path = VoicePath + "CardType/Mandarin/bull_OX_" + value + ".mp3";
        else {
            if (gender == 1)
                path = VoicePath + "CardType/Dialect/WoMan/cardtype_" + value + ".mp3";
            else
                path = VoicePath + "CardType/Dialect/WoMan/cardtype_" + value + ".mp3";
        }*/
        if (value == 11 || value == 12) return;
        if (value > 12)
            value -= 2;
        path = VoicePath + "CardType/" + value + ".mp3";
        path = cc.url.raw(path);
        BiJi.ins.iclass.PlayGameSound(path, AudioType.Effect, false);
    }
    /**
     * 播放公共音效
     */
    public static PlayPublicSound(value: string) {
        /*var path = cc.url.raw(CommonVoicePath + "Voice/" + value + ".mp3");
        BiJi.ins.iclass.PlayGameSound(path, AudioType.Effect, false);*/
    }
    /**
     * 播放系统音效
     */
    public static PlaySysSound(value: string) {
        var path = cc.url.raw(VoicePath + "SysSound/" + value + ".mp3");
        BiJi.ins.iclass.PlayGameSound(path, AudioType.Effect, false);
    }
    /**
     * 播放bgm
     */
    public static PlayBgm() {
        var path = cc.url.raw(VoicePath + "BiJi_bgm.mp3");
        BiJi.ins.iclass.PlayGameSound(path, AudioType.Music, true);
    }
}
