import UIBase from "../Base/UIBase";
import { ActionNet } from "../../CustomType/Action";
import { WebRequest } from "../../Net/Open8hb";
import Global from "../../Global/Global";
import UiManager from '../../Manager/UiManager';
import { DateTime } from "../../Serializer/DateTime";
import EmailContentPanel from "./EmailContentPanel";
import { UIName } from "../../Global/UIName";
import { EventCode } from "../../Global/EventCode";
const { ccclass, property } = cc._decorator;

/**
 * 邮件项预制体脚本组件
 * author:Cyq
 */
@ccclass
export default class EmailItemPanel extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.Label)
    titleLabel: cc.Label = null;
    @property(cc.Label)
    dateLabel: cc.Label = null;
    @property(cc.Label)
    statusLabel: cc.Label = null;
    @property(cc.Prefab)
    ContentPanel: cc.Prefab = null;
    @property(cc.Button)
    btn:cc.Button = null;
    @property(cc.Sprite)
    sprite:cc.Sprite = null;
    @property(cc.SpriteFrame)
    spriteImg:cc.SpriteFrame = null;

    public id : string;
    public status : number;
    public content: string;

    /**
     * 初始化邮件项数据
     * @param data 邮件项数据集合
     */
    public InitData(data) { //初始化参数
        this.titleLabel.string = data[2].toString();
        this.dateLabel.string = DateTime.FromTimeStamp(data[1]).ToString("");
        this.id = data[0];
        this.content = data[3];
        this.status = data[4];

        if (this.status == 1) {
            this.statusLabel.string = "已 读";
            this.statusLabel.node.color = cc.hexToColor("#AC9A9A");
            this.btn.node.color = cc.hexToColor("#AC9A9A");
            this.sprite.spriteFrame = this.spriteImg;
        }
    }

    /**
     * 读取邮件操作
     */
    private ReadEmail() {
        if (cc.isValid(this.node)) {
            Global.Instance.UiManager.ShowUi(UIName.EmailContentPanel, this);
            this.statusLabel.string = "已 读";
            this.statusLabel.node.color = cc.hexToColor("#AC9A9A");
            this.btn.node.color = cc.hexToColor("#AC9A9A");
            this.sprite.spriteFrame = this.spriteImg;
            this.DataCache.UserInfo.MessageNum = this.DataCache.UserInfo.MessageNum - 1;
            this.EventManager.PostMessage(EventCode.NewEmailInfo)
        }
    }

}