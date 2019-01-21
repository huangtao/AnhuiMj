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
     * 标签按钮节点
     */
    @property([cc.Button])
    btn_panelArray: cc.Button[] = [];

    /**
     * 标签面板节点
     */
    @property([cc.Node])
    node_panelArray: cc.Node[] = [];

    /**
     * 标签选中状态Node
     */
    @property([cc.Node])
    node_tab_selected: cc.Node[] = [];

    /**
     * 标签未被选中状态Node
     */
    @property([cc.Node])
    node_tab_noSelected: cc.Node[] = [];

    /**
     * 场景切换角标
     */
    @property([cc.Node])
    node_canvasSelectedIcon: cc.Node[] = [];

    /**
     * 场景切换逻辑Act
     */
    private _canvasSwitchCb: Action = null;

    /**
     * 当前选中场景画布 (默认3D)
     */
    private _curSelectedCanvas: number = 1;

    /**
     * 当前选中设置面板
     */
    private _curSelectedSetIndex: number = 0;

    /**
     * 按钮是否可点击（避免短时间内用户连续点击多次按钮会出现问题)
     */
    private _isClickEnable: boolean = true;


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

		this._curSelectedSetIndex = 0;
		this._curSelectedCanvas = -1;

		// 初始化2D、3D面板面板
		this.initSceneCanvasUIShow();	
	}

	public OnShow(){

	}

	OnClose() {
		this._isClickEnable = true;
		this.unscheduleAllCallbacks();
	}

	/**
	 * 是否能够切换2D、3D
	 */
	public setEnableChange2D(enable: boolean) {
		if (!enable) {
			this.tabSwitchClickEventHandle(null,"1");
			this.btn_panelArray[0].node.active = false;
		} else {
			this.btn_panelArray[0].node.active = true;
		}
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
	 * @Desc     标签切换逻辑
	 */
	public tabSwitchClickEventHandle(toggle, customEventData) {
		if (!customEventData) {
			return;
		}

		let curSelectIndex = parseInt(customEventData);

		if (this._curSelectedSetIndex == curSelectIndex) {
			return;
		}

		// 隐藏当前选中状态
		this.node_tab_selected[this._curSelectedSetIndex].active = false;
		this.node_tab_noSelected[this._curSelectedSetIndex].active = true;
		this.node_panelArray[this._curSelectedSetIndex].active = false;

		// 设置当前选择的标签为选中状态
		if (customEventData) {
			this.node_tab_selected[parseInt(customEventData)].active = true;
			this.node_tab_noSelected[parseInt(customEventData)].active = false;
			this.node_panelArray[parseInt(customEventData)].active = true;
		}

		this._curSelectedSetIndex = parseInt(customEventData);
	}

	/**
	 * 初始化2D、3D面板显示
	 */
	private initSceneCanvasUIShow() {
		this.node_canvasSelectedIcon[0].active = false;
		this.node_canvasSelectedIcon[1].active = false;

		// let localSelect = LocalStorage.GetItem("Game_Canvas");
		// localSelect = (localSelect == "2D")?"0":"1";

		let localSelect = "";
		if (this.ShowParam && this.ShowParam.canvas) {
			localSelect = (this.ShowParam.canvas == "2D")?"0":"1";
		}

		if (localSelect) {
			this._curSelectedCanvas = parseInt(localSelect);
			this.node_canvasSelectedIcon[this._curSelectedCanvas].active = true;
		} else {
			// 默认选择3D
			this._curSelectedCanvas = 1;
			this.node_canvasSelectedIcon[1].active = true;
		}
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
		let curSelectIndex = parseInt(customEventData);

		if (this._curSelectedCanvas == curSelectIndex) {
			return;
		}

		if (!this._isClickEnable) {
			this.UiManager.ShowTip("您的操作过于频繁，请稍后再试");
			return;
		}

		this._isClickEnable = false;
		this.scheduleOnce(()=>{
			this._isClickEnable = true;
		}, 2);

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

		// 设置当前选择的标签为未被选中状态
		this.node_canvasSelectedIcon[this._curSelectedCanvas].active = false;

		if (this.node_canvasSelectedIcon[parseInt(customEventData)]) {
			this.node_canvasSelectedIcon[parseInt(customEventData)].active = true;
		}

		this._curSelectedCanvas = parseInt(customEventData);
		/**
		 * 本地存储当前选择的项
		 */
		LocalStorage.SetItem("Game_Canvas",canvas);
		cc.log("-- canvas switch ", canvas);
	}

	/**
	 * 关闭
	 */
	public closeClick(){
		this.node.removeFromParent();
	}
}
