import { WebRequest } from "../Net/Open8hb";
import { ActionNet } from "../CustomType/Action";
import UrlCtrl from "../Net/UrlCtrl";
import { GameVideoBase } from "../gameplug/base/GameVideoBase";
import Global from "../Global/Global";
import ConfigData from "../Global/ConfigData";
import UserInfo from "../CustomType/UserInfo";


export default class LinkActionProcesser {

    public static CkeckDoAction(): boolean {

        if (typeof getUrlQueryData === "undefined") return;
        var query = getUrlQueryData();

        var action_type = query.action_type;
        var param = query.param;
        var l = new LinkActionProcesser(action_type, param);

        if (l.Do()) {
            cc.log("执行成功 --- LinkActionProcesser");
            return true;
        } else {
            cc.log("执行失败 --- LinkActionProcesser");
            return false;
        }
    }

    private action: string;
    private param: string;

    public constructor(action: string, param: string) {
        this.action = action;
        this.param = param
    }

    private Do(): boolean {
        //判断服务处理的action_type 这个是区分大小写的
        var a = this.action;
        a = a + '';
        a = a.toLowerCase();

        cc.log(a);

        switch (a) {
            case "showrec":
                Global.Instance.UiManager.ShowMsgBox("检测到查看录像操作，是否查看录像？", this, this.showrec);
                return true;
        }

        return false;
    }

    private showrec(): any {


        Global.Instance.UiManager.ShowLoading("正在加载录像配置数据");

        var action = new ActionNet(this, this.showrec_getfile_token_success, this.showrec_getfile_token_error);
        var data = WebRequest.DefaultData(false);
        data.Add("token", this.param);

        UrlCtrl.LoadJson(`${ConfigData.webserverinterfaceUrl}/do/api.s.replay.getfile_token`, data, "POST").then((obj) => {
            action.Run(obj);
        }, (e) => {
            Global.Instance.UiManager.CloseLoading();
            Global.Instance.UiManager.ShowTip("此游戏录像功能敬请期待");
        });
    }
    private showrec_getfile_token_success(json: any) {
        //获取录像配置数据成功

        // json = {
        //     "status": "success",
        //     "msg": "OK",
        //     "id": 1804221,
        //     "gameId": 118,
        //     "rPath": "http://dwc.file-upy.8hb.cc/gamerecord/2017/9/9/118/379512c2ecf34397ad179a3f89f71fb2.rpl",
        //     "roomOwner": "863510",
        //     "dllName": "M_BBMJ",
        //     "gameName": "蚌埠麻将"
        // }
        Global.Instance.UiManager.LoadingInfo("正在加载录像文件");

        //加载录像文件成功回调
        var suucessCall = function (obj) {
            //开始加载指定游戏的录像预置体
            Global.Instance.DataCache.UserInfo.userData.UserID = this.json.userId;
            cc.loader.loadRes(`gameres/${this.json.dllName}/Prefabs/VideoPlayer`,
                function (err, prefab: cc.Prefab) {
                    Global.Instance.UiManager.CloseLoading();
                    if (err) {
                        Global.Instance.UiManager.CloseLoading();
                        Global.Instance.UiManager.ShowTip("此游戏录像功能敬请期待");
                        return;
                    }
                    if (!this.obj) {
                        Global.Instance.UiManager.CloseLoading();
                        return;
                    }
                    const node = cc.instantiate(prefab);
                    const p = node.getComponent<GameVideoBase>(GameVideoBase);
                    Global.Instance.UiManager.CloseLoading();
                    p.Show(null, this.obj)
                }.bind({
                    obj: obj
                })
            );
        }.bind({
            json: json
        });

        //开始加载录像文件数据
        UrlCtrl.LoadJson(json.rPath, null, "GET").then(suucessCall, (e) => {
            Global.Instance.UiManager.CloseLoading();
            Global.Instance.UiManager.ShowTip("获取录像数据失败！");
        });
        
    }
    private showrec_getfile_token_error(json: any) {
        Global.Instance.UiManager.CloseLoading();
        Global.Instance.UiManager.ShowTip("获取录像数据失败！");
        return;
    }



}
