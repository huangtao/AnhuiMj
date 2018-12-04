import { JZMJSoundDef, JZMJ } from "./ConstDef/JZMJMahjongDef";
import { AudioType, VoiceType } from '../../CustomType/Enum';

const { ccclass, property } = cc._decorator;

@ccclass
export default class M_JZMJVoice{

    /**
     * 播放聊天音效
     */
    public static PlayChatVoice(value: number, gender: number,Type:VoiceType) {
        //如果是普通话
        if(true){
        var path = "resources/gameres/Voice/";
        if (gender == 1) {
            path += "MJ_Voice/sound/chatVoice/1/pt/fix_msg_" + value + ".mp3";
        }
        else {
            path += "MJ_Voice/sound/chatVoice/2/pt/fix_msg_" + value + ".mp3";
        }
        cc.log(path+"快捷语音播放音效...");
        //path = cc.url.raw(path);
        JZMJ.ins.iclass.playMJSound(path, AudioType.Effect, false);
    }else{


        var path = "resources/gameres/Voice/";
        if (gender == 1) {
            path += "ChatVoice/Boy/ChatVoiceB_" + value + ".mp3";
        }
        else {
            path += "ChatVoice/Girl/ChatVoiceG_" + value + ".mp3";
        }
        //path = cc.url.raw(path);
        JZMJ.ins.iclass.playMJSound(path, AudioType.Effect, false);





        // var path = "resources/gameres/M_JZMJ/sound/";
        // if (gender == 1) {
        //     path += "DialectVoice/Boy/DialectVoiceB_" + value + ".mp3";
        // }
        // else {
        //     path += "DialectVoice/Girl/DialectVoiceG_" + value + ".mp3";
        // }
       
        // JZMJ.ins.iclass.playMJSound(path, AudioType.Effect, false);
    }
}
    /**
     * 播放牌型音效
     */
    public static PlayCardType(str:string) {
        var path = JZMJSoundDef.VoicePath;
        // if (gender == 1) {
        //     path += "CardType/Boy/CardType76B_" + value + ".mp3";
        // }
        // else {
        //     path += "CardType/Girl/CardType76G_" + value + ".mp3";
        // }
        path+=str;
        //path = cc.url.raw(path);
        cc.log("打出的牌"+path+"8888888888888888")
        JZMJ.ins.iclass.playMJSound(path, AudioType.Effect, false);
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
        JZMJ.ins.iclass.playMJSound(path, AudioType.Effect, false);
    }
    /**
     * 播放公共音效
     */
    public static PlayPublicSound(value: string) {
        var path = cc.url.raw(JZMJSoundDef.CommonVoicePath + "Voice/" + value + ".mp3");
        JZMJ.ins.iclass.playMJSound(path, AudioType.Effect, false);
    }
    /**
     * 播放系统音效
     */
    public static PlaySysSound(value: string) {
        var path = cc.url.raw(JZMJSoundDef.VoicePath + "SysSound/Sys76_" + value + ".mp3");
        JZMJ.ins.iclass.playMJSound(path, AudioType.Effect, false);
    }
    /**
     * 播放bgm
     */
    public static PlayBgm() {
        var path = "resources/gameres/Voice/MJ_Voice/sound/mj_sound_bg.mp3";
        JZMJ.ins.iclass.playMJSound(path, AudioType.Music, true);
    }
    
}
