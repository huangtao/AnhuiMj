import UIBase from "../Base/UIBase";
import { LoadHeader } from "../../Tools/Function";
import Global from "../../Global/Global";
import { AudioType, VoiceType } from "../../CustomType/Enum";
import { UyiSlider } from "../Base/UyiSlider";
import { NativeCtrl } from "../../Native/NativeCtrl";
import { AudioManager} from "../../Manager/AudioManager";
import UiManager from '../../Manager/UiManager';
import VersionManager from "../../Global/VersionManager";

const { ccclass, property } = cc._decorator;

@ccclass
export class SettingForm extends UIBase<any>{
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.Label)
    account: cc.Label = null;
    @property(cc.Label)
    authentication:cc.Label = null;
    @property(cc.Sprite)
    headerImg: cc.Sprite = null;
    @property(cc.Label)
    userId: cc.Label = null;
    @property(cc.Sprite)
    sex_women:cc.Sprite = null;
    @property(cc.Sprite)
    sex_man:cc.Sprite = null;

    /**
     * 音乐复选框
     */
    @property(cc.Toggle)
    chbox_music: cc.Toggle = null;

    /**
     * 音效复选框
     */
    @property(cc.Toggle)
    chbox_effect: cc.Toggle = null;

    /**
     * 震动复选框
     */
    @property(cc.Toggle)
    chbox_shock: cc.Toggle = null;

    @property(cc.Label)
    version: cc.Label = null;



    onLoad(){
        super.onLoad();
        // let version = parseInt(cc["LocalVersion"])
        // if (isNaN(version)) {
        //     version = parseInt(NativeCtrl.GetVersion())
        //     if(isNaN(version)){
        //         this.version.string = ""
        //     }else{
        //         this.version.string = version.toString()
        //     }
        // }else{
        this.version.string = "v"+VersionManager.ClintVersion.toString();
        // }
    }
    
    public InitShow() {
        let musicVolume = Global.Instance.AudioManager.GetVolume(AudioType.Music);
        let effectVolume = Global.Instance.AudioManager.GetVolume(AudioType.Effect);
        // let shockVolume = Global.Instance.AudioManager.GetVolume(AudioType.Music);

        this.chbox_music.isChecked = musicVolume != 0;
        this.chbox_effect.isChecked = effectVolume != 0;
        
        // if (0 == musicVolume) {
        //     this.chbox_music.isChecked = false;
        // }else{
        //     this.chbox_music.isChecked = true;
        // }

        // if (0 == effectVolume) {
        //     this.chbox_effect.isChecked = false;
        // }else{
        //     this.chbox_effect.isChecked = true;
        // }

        this.account.string = this.UserInfo.userData.NickName;
        this.userId.string = "ID：" + this.UserInfo.userData.UserID;
        LoadHeader(this.UserInfo.userData.Header, this.headerImg);
    }

    /**
     * 音乐开关
     */
    public switchMusicClick(toggle, customEventData) {
        if (toggle.isChecked) {
            Global.Instance.AudioManager.SetVolume(1, AudioType.Music);
            // localStorage.setItem("MusicVolume","1");
        }else{
            Global.Instance.AudioManager.SetVolume(0, AudioType.Music);
            // localStorage.setItem("MusicVolume","0");
        }

        // Global.Instance.AudioManager.SwitchMusic(toggle.isChecked);
    }

    /**
     * 音效开关
     */
    public switchEffectClick(toggle, customEventData) {
        if (toggle.isChecked) {
            Global.Instance.AudioManager.SetVolume(1, AudioType.Effect);
            // localStorage.setItem("EffectVolume","1");

        }else{
            Global.Instance.AudioManager.SetVolume(0, AudioType.Effect);
            // localStorage.setItem("EffectVolume","0");
        }

        // Global.Instance.AudioManager.SwitchEffect(toggle.isChecked);
    }

    /**
     * 震动开关
     */
    public switchShockClick(toggle, customEventData) {

    }

    private changeClick(){
        const exit = () => {
            Global.Instance.Socket.Close();
            Global.ChangeScene("Login");
        }
        this.UiManager.ShowMsgBox("你确定要切换账号吗？", this, exit);
        
    }

    /**
     * 退出游戏
     */
    public btnQuitGameClickEvent(toggle, customEventData) {
        const exit = () => {
            Global.Instance.Socket.Close();
            cc.game.end();
        }
        this.UiManager.ShowMsgBox("你真的要退出吗？", this, exit);
    }
}