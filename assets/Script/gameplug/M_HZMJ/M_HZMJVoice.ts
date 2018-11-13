import { HZMJSoundDef, HZMJ } from "./ConstDef/HZMJMahjongDef";
import { AudioType, VoiceType } from "../../CustomType/Enum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class M_HZMJVoice{

    /**
     * 播放聊天音效
     */
    public static PlayChatVoice(value: number, gender: number,Type:VoiceType) {
        //如果是普通话
        if(Type==VoiceType.Mandarin){
        var path = "resources/gameres/gameCommonRes/Voice/";
        if (gender == 1) {
            path += "ChatVoice/Boy/ChatVoiceB_" + value + ".mp3";
        }
        else {
            path += "ChatVoice/Girl/ChatVoiceG_" + value + ".mp3";
        }
        //path = cc.url.raw(path);
        HZMJ.ins.iclass.playMJSound(path, AudioType.Effect, false);
    }else{


        var path = "resources/gameres/gameCommonRes/Voice/";
        if (gender == 1) {
            path += "ChatVoice/Boy/ChatVoiceB_" + value + ".mp3";
        }
        else {
            path += "ChatVoice/Girl/ChatVoiceG_" + value + ".mp3";
        }
        //path = cc.url.raw(path);
        HZMJ.ins.iclass.playMJSound(path, AudioType.Effect, false);





        var path = "resources/gameres/M_HZMJ/sound/";
        if (gender == 1) {
            path += "DialectVoice/Boy/DialectVoiceB_" + value + ".mp3";
        }
        else {
            path += "DialectVoice/Girl/DialectVoiceG_" + value + ".mp3";
        }
       
        HZMJ.ins.iclass.playMJSound(path, AudioType.Effect, false);



    }




}
    /**
     * 播放牌型音效
     */
    public static PlayCardType(str:string) {
        var path = HZMJSoundDef.VoicePath;
        // if (gender == 1) {
        //     path += "CardType/Boy/CardType76B_" + value + ".mp3";
        // }
        // else {
        //     path += "CardType/Girl/CardType76G_" + value + ".mp3";
        // }
        path+=str;
        //path = cc.url.raw(path);
        HZMJ.ins.iclass.playMJSound(path, AudioType.Effect, false);
    }

      /**
     * 播放方言版牌型音效
     */
    public static PlayDiaCardType(str:string) {
        var path = str;
        // if (gender == 1) {
        //     path += "CardType/Boy/CardType76B_" + value + ".mp3";
        // }
        // else {
        //     path += "CardType/Girl/CardType76G_" + value + ".mp3";
        // }
        
        //path = cc.url.raw(path);
        HZMJ.ins.iclass.playMJSound(path, AudioType.Effect, false);
    }
    /**
     * 播放公共音效
     */
    public static PlayPublicSound(value: string) {
        var path = cc.url.raw(HZMJSoundDef.CommonVoicePath + "Voice/" + value + ".mp3");
        HZMJ.ins.iclass.playMJSound(path, AudioType.Effect, false);
    }
    /**
     * 播放系统音效
     */
    public static PlaySysSound(value: string) {
        var path = cc.url.raw(HZMJSoundDef.VoicePath + "SysSound/Sys76_" + value + ".mp3");
        HZMJ.ins.iclass.playMJSound(path, AudioType.Effect, false);
    }
    /**
     * 播放bgm
     */
    public static PlayBgm() {
        var path = "resources/gameres/gameCommonRes/Voice/MJ_Voice/sound/mj_sound_bg.mp3";//cc.url.raw("resources/gameres/gameCommonRes/Voice/MJ_Voice/sound/mj_sound_bg.mp3");
        HZMJ.ins.iclass.playMJSound(path, AudioType.Music, true);
    }
    /**
     * 播放win
     */
    public static PlayWin() {
        var path = "resources/gameres/gameCommonRes/Voice/MJ_Voice/sound/win.mp3";//cc.url.raw("resources/gameres/gameCommonRes/Voice/MJ_Voice/sound/mj_sound_bg.mp3");
        HZMJ.ins.iclass.playMJSound(path, AudioType.Music, false);
    }
    /**
     * 播放lose
     */
    public static PlayLose() {
        var path = "resources/gameres/gameCommonRes/Voice/MJ_Voice/sound/lost.mp3";//cc.url.raw("resources/gameres/gameCommonRes/Voice/MJ_Voice/sound/mj_sound_bg.mp3");
        HZMJ.ins.iclass.playMJSound(path, AudioType.Music, false);
    }
    /**
     * 播放平局
     */
    public static PlayPing() {
        var path = "resources/gameres/gameCommonRes/Voice/MJ_Voice/sound/audio_liuju.mp3";//cc.url.raw("resources/gameres/gameCommonRes/Voice/MJ_Voice/sound/mj_sound_bg.mp3");
        HZMJ.ins.iclass.playMJSound(path, AudioType.Music, false);
    }
     /**
     * 游戏开始
     */
    public static StartGame() {
        var path = "resources/gameres/gameCommonRes/Voice/MJ_Voice/sound/game_start.mp3";//cc.url.raw("resources/gameres/gameCommonRes/Voice/MJ_Voice/sound/mj_sound_bg.mp3");
        HZMJ.ins.iclass.playMJSound(path, AudioType.Music, false);
    }
     /**
     * 游戏结束
     */
    public static GameOver() {
        var path = "resources/gameres/gameCommonRes/Voice/MJ_Voice/sound/final_report.mp3";//cc.url.raw("resources/gameres/gameCommonRes/Voice/MJ_Voice/sound/mj_sound_bg.mp3");
        HZMJ.ins.iclass.playMJSound(path, AudioType.Music, false);
    }
    
}
