

import ConfigData from "../../Global/ConfigData";
import { WebRequest } from "../../Net/Open8hb";
import { ActionNet, Action } from "../../CustomType/Action";
import Global from "../../Global/Global";
import { DESEncryptHelper } from "../../Tools/DESEncryptHelper";
import { ConstValues } from "../../Global/ConstValues";

const { ccclass, property } = cc._decorator;
@ccclass
export class GetConfigForm extends cc.Component {
    public IsEventHandler: boolean = false;
    public IsKeyHandler: boolean = false;
    private action: Action;

    private retryTimes = 0;
    public StartGetConfig(action: Action) {
        this.action = action;
        this.startload();
    }



    private startload() {
        this.retryTimes = 0;
        this.getConfig();
    }

    private getConfig() {
        this.retryTimes++;
        if (cc.sys.isMobile && cc.sys.isNative) {
            const action = new ActionNet(this, this.onAgentSuccess, this.onAgentError)
            let desKey = DESEncryptHelper.getRandomStr(ConstValues.DES_SecretLength);
            const data = WebRequest.DefaultData(false, desKey);
            data.Add("agent_path", ConfigData.SiteConfig.SiteVirtualDir);
            // WebRequest.system.getagentconfig(action, data, "GET", desKey);
        } else {
            if (typeof getRegionName !== 'undefined') {
                ConfigData.RegionName = getRegionName();
            } else {
                cc.log("不存在getRegionName")
            }
            if (typeof getWebConfig !== 'undefined') {
                ConfigData.SiteConfig.SetNewConfig(getWebConfig());
            } else {
                cc.log("不存在getWebConfig");
            }
            this.configEnd();
        }
    }

    onAgentSuccess(obj) {
        ConfigData.SiteConfig.SetNewConfig(obj);
        this.configEnd();
    }

    onAgentError(e) {
        if (this.retryTimes >= 3) {
            const exit = () => { cc.game.end(); };
            Global.Instance.UiManager.ShowMsgBox("获取服务器配置信息出错，是否重试？", this, this.startload, exit, exit);
        } else {
            setTimeout(this.getConfig.bind(this), 500);
        }
    }

    private configEnd() {
        if (this.action) {
            this.action.RunArgs();
            cc.log("执行了有效的回调方法");
            return;
        }
        cc.log("没有有效的回调方法");
    }


}