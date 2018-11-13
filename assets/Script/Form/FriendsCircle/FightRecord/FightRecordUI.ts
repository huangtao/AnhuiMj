import UIBase from "../../Base/UIBase";
import FriendCircleDataCache from "../FriendCircleDataCache";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FightRecordUI extends UIBase<any> {
	public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;

    /**
     * 今日积分按钮标签文字
     */
    @property([cc.Label])
    lab_score: cc.Label[] = [];

    /**
     * 按钮
     */
    @property([cc.Button])
    btn_tab: cc.Button[] = [];

    /**
     * 按钮选中状态图片
     */
    @property(cc.SpriteFrame)
    frame_tabSelected: cc.SpriteFrame = null;

    /**
     * 按钮未选中状态图片
     */
    @property(cc.SpriteFrame)
    frame_noTabSelected: cc.SpriteFrame = null;

    /**
     * 当前选择标签索引
     */
    private _curSelectTabIdx: number = 0;

    public InitShow() {

        // 默认显示第一个
        this.tabChangeLogic('0');
    }

    /**
     * 标签点击事件处理
     */
    public tabClickHandle(event,args) {
    	this.tabChangeLogic(args);
    }


    /**
     * 标签切换逻辑
     */
    public tabChangeLogic(tabTag: string) {
        let tag = parseInt(tabTag);

        if (tag < 0) {
            return;
        }

        // 更新上次选择项UI显示
        if (cc.isValid(this.btn_tab[this._curSelectTabIdx]) && this.frame_tabSelected) {
            let sprite: cc.Sprite = this.btn_tab[this._curSelectTabIdx].node.getComponent('cc.Sprite');
            sprite.spriteFrame = this.frame_noTabSelected;
        }

        // 更新文字颜色表示
        if (this.lab_score[this._curSelectTabIdx]) {
            this.lab_score[this._curSelectTabIdx].node.color = cc.hexToColor("#C96931");
            this.lab_score[this._curSelectTabIdx].node.getComponent('cc.LabelOutline').enabled = false;
        }

        this._curSelectTabIdx = tag;

        // 更新当前选中按钮状态显示
        if (cc.isValid(this.btn_tab[tag]) && this.frame_tabSelected) {
            let sprite: cc.Sprite = this.btn_tab[tag].node.getComponent('cc.Sprite');
            sprite.spriteFrame = this.frame_tabSelected;
        }

        // 更新文字颜色表示
        if (this.lab_score[tag]) {
            this.lab_score[tag].node.color = cc.hexToColor("#FFFFFF");
            this.lab_score[tag].node.getComponent('cc.LabelOutline').enabled = true;
        }

    }
}
