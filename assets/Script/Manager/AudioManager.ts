

import { IAudioManager } from "../Interface/IAudioManager";
import { AudioType, VoiceType } from "../CustomType/Enum";
import { QL_Common } from "../CommonSrc/QL_Common";
import Global from "../Global/Global";
import { EventCode } from "../Global/EventCode";
import { NativeCtrl } from "../Native/NativeCtrl";
import { DownloadFile } from "../Net/DownloadFile";
import { ConstValues } from "../Global/ConstValues";

class Volume {
    public MusicVolume: number = 1;
    public EffectVolume: number = 1;
    public RecordVolume: number = 1;
}

export class AudioManager implements IAudioManager {

    /**
     * 方言还是普通话
     */
    private _voiceType: VoiceType = VoiceType.Mandarin;

    /**
     * 声音的大小配置
     */
    private _volume: Volume;

    /**
     * 背景声音的句柄
     */
    private _bgMusic: number = -1;

    /**
     * 当前录音播放器正在播放的条数
     */
    private _recordPlayTimes = 0;

    /**
     * 玩家是否正在录音中
     */
    private _isrecording: boolean = false;

    /**
     * 音效列表
     */
    private _effectList: Array<string | cc.AudioClip>;

    private _startRecordTime: number;


    private _startRecordID:  NodeJS.Timer;

    public constructor() {
        this._volume = new Volume();
        this._effectList = new Array();
        setInterval(this.onPlayEffect.bind(this), 50);
        //从缓存中初始化快捷语句类型配置
        this.InitVoiceType();
        //从缓存中初始化声音大小配置
        this.InitVolumeConfig();
    }
    /**
     * 初始化方言等配置
     */
    private InitVoiceType() {
        const type = parseInt(cc.sys.localStorage.getItem("voiceType"));
        if (isNaN(type)) {
            cc.log("无效的VoiceType");
            return;
        }
        this._voiceType = type;
    }

    /**
     * 从缓存中获取声音大小配置
     */
    private InitVolumeConfig() {
        for (var i in this._volume) {
            const value = parseFloat(cc.sys.localStorage.getItem(i));
            if (isNaN(value)) {
                cc.log("无效的value  key=" + i)
                continue;
            }
            this._volume[i] = value;
        }
    }

    private getVoiceSavePath() {
        if (cc.sys.isBrowser) {
            return new Date().valueOf() + ".mp3";
        }
        const storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'voicepath/');
        if (!jsb.fileUtils.isDirectoryExist(storagePath)) {
            cc.log("创建目录" + storagePath);
            jsb.fileUtils.createDirectory(storagePath);
        }
        return storagePath + new Date().valueOf() + ".mp3";
    }


    /**
     * 播放声音接口
     * @param path 声音的路径
     * @param audiotype 声音的类型
     * @param loop 是否循环播放
     */
    Play(path: string | cc.AudioClip, audiotype: AudioType = AudioType.Effect, loop: boolean = false): number {
        switch (audiotype) {
            case AudioType.Music:
                cc.log("播放背景音乐 path=" + path);
                return this.onPlayMusic(path + "", loop);
            case AudioType.Effect:
                cc.log("播放音效 path=" + path);
                this._effectList.push(path);

                return -1;
        }
        return -1;
    }

    /**
     * 播放玩家录音
     * @param path 录音的路径
     * @param chairId 玩家椅子号
     */
    PlayRecord(url?: string, chairId: number = QL_Common.InvalidValue.InvalidChairID): void {
        if (url && url.length > 0 && chairId !== QL_Common.InvalidValue.InvalidChairID) {
            if (cc.sys.isBrowser) {
                const voice = new RecordStruct();
                voice.Path = url;
                voice.ChairID = chairId;
                this.StartPlayRecord(voice);
                //this.onPlayRecord();
                return;
            }
            const t = this;
            const path = this.getVoiceSavePath();
            DownloadFile.LoadFile(url, path, (flag: boolean, data: Uint8Array) => {
                if (!flag) {
                    Global.Instance.UiManager.ShowTip("一条录音下载失败了，检查一下你的网络环境吧！");
                    return;
                }
                cc.log("录音长度" + data.byteLength);
                if (data.byteLength < 1000) {
                    cc.log("录音长度过短，直接丢弃");
                    return;
                }

                const voice = new RecordStruct();
                voice.Path = path;
                voice.ChairID = chairId;
                t.StartPlayRecord(voice)
            });
        }
    }

    private StartPlayRecord(voice: RecordStruct) {
        this.Pause();
        const t = this;
        //播放完成或者超时的回调
        const callback = () => {
            t._recordPlayTimes--;
            t.Continue()
            Global.Instance.EventManager.PostMessage(EventCode.onRecorderEnd, voice.ChairID);
        }
        //设置超时时间
        let timeout = setTimeout(callback, ConstValues.RecordMax * 1000);

        const volume = this._isrecording ? 0.3 : this._volume.RecordVolume;
        const id = cc.audioEngine.play(voice.Path, false, volume);
        cc.audioEngine.setFinishCallback(id, () => {
            clearTimeout(timeout);
            callback();
        });
        //设置最长播放时间
        this._recordPlayTimes++;
        Global.Instance.EventManager.PostMessage(EventCode.onRecorderPlay, voice.ChairID);
    }

    // /**
    //  * 一条录音播放完成
    //  */
    // OnRecordEnd(): void {
    //     if (this._nowVoice) {
    //         Global.Instance.EventManager.PostMessage(EventCode.onRecorderEnd, this._nowVoice.ChairID);
    //         this._nowVoice = null;
    //     }
    //     this._isFree = true;
    //     this.onPlayRecord();
    // }

    /**
     * 暂停
     */
    Pause(): void {
        if (this._bgMusic !== -1) {
            //cc.audioEngine.pause(this._bgMusic);
            cc.audioEngine.setVolume(this._bgMusic, 0);
        }
    }

    /**
     * 继续播放背景声音
     */
    Continue(): void {
        if ((this._recordPlayTimes > 0) || this._isrecording) return;
        if (this._bgMusic !== -1) {
            //cc.audioEngine.resume(this._bgMusic);
            cc.audioEngine.setVolume(this._bgMusic, this._volume.MusicVolume);
        }
    }

    /**
     * 音乐开关
     */
    SwitchMusic(onOff: boolean) {
        if (onOff) {
            this.SetVolume(1,AudioType.Music);
        }else{
            this.SetVolume(0,AudioType.Music);
        }
    }

    /**
     * 音音效开关
     */
    SwitchEffect(onOff: boolean) {
        if (onOff) {
            this.SetVolume(1,AudioType.Effect);
        }else{
            this.SetVolume(0,AudioType.Effect);
        }
    }

    SetVolume(v: number, audiotype: AudioType): void {
        switch (audiotype) {
            case AudioType.Effect:
                this._volume.EffectVolume = v;
                break;
            case AudioType.Music:
                this._volume.MusicVolume = v;
                if (this._bgMusic !== -1) {
                    cc.audioEngine.setVolume(this._bgMusic, this._volume.MusicVolume);
                }
                break;
            case AudioType.Record:
                this._volume.RecordVolume = v;
                break;
        }

        this.SaveConfig();
    }
    
    GetVolume(audiotype: AudioType): number {
        switch (audiotype) {
            case AudioType.Effect:
                return this._volume.EffectVolume;
            case AudioType.Music:
                return this._volume.MusicVolume;
            case AudioType.Record:
                return this._volume.RecordVolume;

        }
        return 0;
    }

    StopMusic(): void {
        if (this._bgMusic != -1) {
            cc.audioEngine.stop(this._bgMusic);
            this._bgMusic = -1;
        }
        //cc.audioEngine.stopAll();

    }

    IsRecording() {
        return this._isrecording;
    }


    StartRecord(): boolean {
        if (this._isrecording) return false;
        this.Pause();
        //this.OnRecordEnd();
        const t = this;
        this._startRecordID = setTimeout(() => {
            t.StopRecord();
            Global.Instance.EventManager.PostMessage(EventCode.RecordTimeout);
        }, ConstValues.RecordMax * 1000);
        this._isrecording = true;
        NativeCtrl.StartRecord();
        this._startRecordTime = Date.now();
        return true;
    }

    StopRecord(): boolean {
        clearTimeout(this._startRecordID);
        if (!this._isrecording) return false;
        let time = Date.now() - this._startRecordTime;

        //如果录音持续时间大于最短时间，则有效
        if (time > ConstValues.RecordMin * 1000) {
            NativeCtrl.StopRecord(true);
        } else {
            NativeCtrl.StopRecord(false);
            Global.Instance.UiManager.ShowTip("录音时间过短，请重试！");
        }
        this._isrecording = false;
        this.Continue();
    }

    ClearRecord(): void {
        //this._recordList.length = 0;
    }

    SaveConfig(): void {
        for (var i in this._volume) {
            cc.sys.localStorage.setItem(i, this._volume[i] + "");
        }
        cc.sys.localStorage.setItem("voiceType", this._voiceType + "");
    }
    public get VoiceType(): VoiceType {
        return this._voiceType;
    }
    public set VoiceType(val: VoiceType) {
        this._voiceType = val;
    }
    private onPlayMusic(path: string, loop: boolean) {
        if (this._bgMusic != -1) {
            cc.audioEngine.stop(this._bgMusic);
        }
        this._bgMusic = cc.audioEngine.play(path, loop, this._volume.MusicVolume);
        //修复1.5.2的一个声音播放bug
        cc.audioEngine.setVolume(this._bgMusic, this._volume.MusicVolume);

        return this._bgMusic;
    }

    private onPlayEffect() {
        if (this._effectList.length === 0) return -1;
        const path = this._effectList.shift();
        cc.log("音效大小为：" + this._volume.EffectVolume, "正在播放的录音条数：" + this._recordPlayTimes, "录音状态为：" + this._isrecording);
        //如果音效大小为0
        if (this._volume.EffectVolume === 0) return -1;
        //如果正在播放录音或者正在录音
        if ((this._recordPlayTimes > 0) || this._isrecording) return -1;

        cc.log("开始播放音频" + this._volume.EffectVolume);
        return cc.audioEngine.play(path + "", false, this._volume.EffectVolume);
    }

    // /**
    //  * 开始播放语音
    //  */
    // private onPlayRecord() {
    //     //如果正在播放
    //     if (!this._isFree) return;
    //     if (this._isrecording) return;
    //     if (this._recordList.length === 0) {
    //         this.Continue();
    //         return;
    //     }
    //     if (this._volume.RecordVolume === 0) {
    //         this._recordList.length = 0;
    //         this.Continue();
    //         return;
    //     }
    //     const voice = this._recordList.shift();
    //     this.Pause();
    //     this._isFree = false;
    //     const id = cc.audioEngine.play(voice.Path, false, this._volume.RecordVolume);
    //     cc.audioEngine.setFinishCallback(id, this.OnRecordEnd.bind(this));
    //     //NativeCtrl.PlayRecorder(voice.Path);
    //     Global.Instance.EventManager.PostMessage(EventCode.onRecorderPlay, voice.ChairID);
    //     this._nowVoice = voice;
    // }
}


class RecordStruct {
    public ChairID: number;
    public Path: string;
}