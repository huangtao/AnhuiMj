

/**
 * 音频管理器
 */
import { AudioType, VoiceType } from "../CustomType/Enum";

export interface IAudioManager {
    /**
     * 播放声音
     */
    Play(path: string | cc.AudioClip, audiotype?: AudioType, loop?: boolean): number;

    /**
     * 播放声音
     */
    PlayRecord(path?: string, chairId?: number): void;

    // /**
    //  * 一条录音播放完成
    //  */
    // OnRecordEnd():void;

    /**
     * 清除语音列表
     */
    ClearRecord(): void;

    /**
     * 暂停所有声音
     */
    Pause(): void;

    /**
     * 继续播放所有声音
     */
    Continue(): void;

    /**
     * 停止背景音乐
     */
    StopMusic():void;
    
    /**
     * 音乐开关
     */
    SwitchMusic(onOff: boolean);

    /**
     * 音音效开关
     */
    SwitchEffect(onOff: boolean);

    /**
     * 设置声音大小
     */
    SetVolume(v: number, audiotype: AudioType): void;
    GetVolume(audiotype: AudioType): number;

    /**
     * 是否正在录音
     */
    IsRecording():boolean;

    StartRecord():boolean;

    StopRecord():boolean;

    SaveConfig(): void;

    VoiceType:VoiceType;
}