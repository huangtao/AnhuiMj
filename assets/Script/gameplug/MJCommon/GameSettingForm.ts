import { AudioManager } from "../../Manager/AudioManager";
import { LocalStorage } from "../../CustomType/LocalStorage";
import { AudioType, VoiceType } from "../../CustomType/Enum";

import Global from "../../Global/Global";
import UIBase from "../../Form/Base/UIBase";
import { Action } from "../../CustomType/Action";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameSettingForm extends UIBase<any> {
	public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.Toggle)
    chbox_music: cc.Toggle = null;

    @property(cc.Toggle)
    chbox_effect: cc.Toggle = null;

    @property(cc.Toggle)
    chbox_shock: cc.Toggle = null;

    /**
     * 选中图标Frame
     */
    @property(cc.SpriteFrame)
    frame_tabSelected: cc.Toggle = null;

    /**
     * 标签面板节点
     */
    @property([cc.Node])
    node_panelArray: [cc.Node] = null;

    /**
     * 标签选中状态Label
     */
    @property([cc.Label])
    lab_tab_selected: [cc.Label] = null;

    /**
     * 场景切换角标
     */
    @property([cc.Node])
    node_canvasSelectedIcon: [cc.Node] = [];

    /**
     * 场景切换逻辑Act
     */
    private _canvasSwitchCb: Action = null;

    /**
     * 当前选中场景画布 (默认3D)
     */
    private _curSelectedCanvas: number = 1;

	public InitShow(){
		let musicVolume = Global.Instance.AudioManager.GetVolume(AudioType.Music);
		let effectVolume = Global.Instance.AudioManager.GetVolume(AudioType.Effect);
		// let shockVolume = Global.Instance.AudioManager.GetVolume(AudioType.Music);

		if (0 == musicVolume) {
			this.chbox_music.isChecked = false;
		}else{
			this.chbox_music.isChecked = true;
		}

		if (0 == effectVolume) {
			this.chbox_effect.isChecked = false;
		}else{
			this.chbox_effect.isChecked = true;
		}
	}

	public OnShow(){

	}
	/**
	 * @Author   WangHao
	 * @DateTime 2018-11-10
	 * @Desc     注册场景2D、3D切换
	 * @param    {Action}   clickHandle [description]
	 */
	public registerCanvasSwtichClick(clickHandle: Action) {
		this._canvasSwitchCb = clickHandle;
	}

	/**
	 * @Author   WangHao
	 * @DateTime 2018-11-10
	 * @Desc     设置标签切换逻辑
	 */
	public tabSwitchClickEventHandle(toggle, customEventData) {

	}

	/**
	 * 音乐开关
	 */
	public switchMusicClick(toggle, customEventData) {
		Global.Instance.AudioManager.SwitchMusic(toggle.isChecked);
	}

	/**
	 * 音效开关
	 */
	public switchEffectClick(toggle, customEventData) {
		Global.Instance.AudioManager.SwitchEffect(toggle.isChecked);
	}

	/**
	 * 震动开关
	 */
	public switchShockClick(toggle, customEventData) {

	}

	/**
	 * 2D、3D切换
	 */
	public canvaSwitchClickEvent(toggle, customEventData) {
		let canvas = "";
		switch (customEventData) {
			case "0":
				canvas = '2D';
				break;
			case "1":
				canvas = '3D';
				break;
			default:
				// code...
				break;
		}

		if (this._canvasSwitchCb) {
			this._canvasSwitchCb.Run([canvas]);
		}
		
		// if (this.node_canvasSelectedIcon[canvas]) {
		// 	this.node_canvasSelectedIcon[canvas].active = true;
		// }
		/**
		 * 本地存储当前选择的项
		 */
		LocalStorage.SetItem("Game_Canvas",canvas);
		cc.info("-- canvas switch ", canvas);
	}

	/**
	 * 关闭
	 */
	public closeClick(){
		this.node.removeFromParent();
	}
}
