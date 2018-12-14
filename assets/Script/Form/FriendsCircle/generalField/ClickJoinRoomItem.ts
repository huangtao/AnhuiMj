import { Action, ActionNet } from "../../../CustomType/Action";
import { LoadHeader } from "../../../Tools/Function"

const { ccclass, property } = cc._decorator;

@ccclass
export class ClickJoinRoomItem extends cc.Component {
	/**
	 * 图标
	 */
    @property(cc.Sprite)
    sp_icon: cc.Sprite=null;

    @property(cc.SpriteFrame)
    frame_default: cc.SpriteFrame=null;

    private _clickEvent: Action = null;

   	public set ClickEvent(act: Action){
   		this._clickEvent = act;
   	}

   	/**
   	 * 该位置是否已经有玩家坐下
   	 */

   	private _bHavePlayerSit: boolean = false;

    /**
     * 玩家坐下
     */
    public playerSit( path ) {

    	if (!path && cc.isValid(this.frame_default)) {
    		this.sp_icon.spriteFrame = this.frame_default;
    	}else{
    		LoadHeader(path,this.sp_icon);
    	}

        this.node.active = true;
        this._bHavePlayerSit = true;
    }

    /**
     * 玩家离开
     */
    public playerLeave() {
    	this._bHavePlayerSit = false;
        this.node.active = true;

    	if (this.frame_default) {
    		this.sp_icon.spriteFrame = this.frame_default;
    	}
    }

    /**
     * 玩家隐藏
     */
    public playerHide() {
        this._bHavePlayerSit = false;
        this.node.active = false;
    }


    /**
     * 点击事件
     */
    public btnJoinClick() {
    	if (this._clickEvent) {
    		this._clickEvent.Run([this._bHavePlayerSit]);
    	}
    }
}