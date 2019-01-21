import { PDK } from "./PDK_IClass";
import { VoicePath, CommonVoicePath,CardType } from "./PDK_GameHelp";
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
        PDK.ins.iclass.PlayGameSound(path, AudioType.Effect, false);
    }
    /**
     * 播放牌型音效
     */
    public static PlayCardType(cardType:CardType,value: number, voicetype: VoiceType, gender: number) {
        if (value < 0 || value > 15) {
            return;
        }
        var path = "CardType/";
        if (gender == 1) {
            path += "Boy/";
        }
        else {
            path += "Girl/";
        }
        if(cardType == CardType.One){
            path = VoicePath + path + value + ".mp3";
        }else if(cardType == CardType.Two){
            path = VoicePath  + path + "dui" + value + ".mp3";
        }else if(cardType == CardType.lianDui){
            path = VoicePath  + path + "liandui.mp3";
        }else if(cardType == CardType.ThreeAndTwo){
            path = VoicePath  + path + "sandaier.mp3";
        }else if(cardType == CardType.ThreeAndOne){
            path = VoicePath  + path + "sandaiyi.mp3";
        }else if(cardType == CardType.Three){
            path = VoicePath  + path + "sange.mp3";
        }else if(cardType == CardType.ShunZi){
            path = VoicePath  + path + "shunzi.mp3";
        }else if(cardType == CardType.Bomb){
            path = VoicePath  + path + "zhadan.mp3";
        }else if(cardType == CardType.FourAndTwo){
            path = VoicePath  + path + "sidaier.mp3";
        }else if(cardType == CardType.Plane){
            if(value == 1){
                path = VoicePath  + path + "planewings.mp3";
            }else if(value == 0){
                path = VoicePath  + path + "plane.mp3";
            }else{
                path = VoicePath  + path + "feiji_bgm.mp3";
            }
        }else if(cardType == CardType.Pass){
            //let randomNum = Math.floor(Math.random()*3) + 1;
            path = VoicePath  + path + "buyao1.mp3";
        }else{
            return;
        }
        path = cc.url.raw(path);
        PDK.ins.iclass.PlayGameSound(path, AudioType.Effect, false);
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
        PDK.ins.iclass.PlayGameSound(path, AudioType.Effect, false);
    }
    /**
     * 播放bgm
     */
    public static PlayBgm() {
        var path = cc.url.raw(VoicePath + "PDK_bgm.mp3");
        PDK.ins.iclass.PlayGameSound(path, AudioType.Music, true);
    }
}
