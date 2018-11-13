



import { RecordInfo } from "./RecordInfo";
import { addZero } from "../../Tools/Function";
import { WebRequest } from "../../Net/Open8hb";
import { ActionNet } from "../../CustomType/Action";
import Global from "../../Global/Global";
import { GameVideoBase } from "../../gameplug/base/GameVideoBase";

const { ccclass, property } = cc._decorator;
@ccclass
export class DetailInfos extends cc.Component {
    @property(cc.Node)
    bg: cc.Node=null;

    @property(cc.Label)
    no: cc.Label=null;

    @property(cc.Label)
    date: cc.Label=null;

    @property(cc.Node)
    group: cc.Node=null;

    gameid: number;

    data: RecordInfo;

    Init(no: number) {
        cc.log("初始化节点" + no);
        this.bg.active = no % 2 === 0;
        this.no.string = (no + 1) + "";
        const date = new Date(this.data.CTime * 1000);
        this.date.string = `${addZero(date.getMonth() + 1, 2)}-${addZero(date.getDate(), 2)} ${date.getHours()}:${addZero(date.getMinutes(), 2)}:${addZero(date.getSeconds(), 2)}`;



        for (let i = 0; i < this.data.UserData.length; i++) {
            const node = new cc.Node("node");
            node.width = 100;
            node.height = 40;
            const label = node.addComponent<cc.Label>(cc.Label);
            label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
            label.overflow = cc.Label.Overflow.SHRINK;
            label.isSystemFontUsed = true;
            label.fontFamily = "SimHei";
            if (this.data.UserData[i].MoneyNum >= 0) {
                const color = new cc.Color(34, 141, 77);
                node.color = color;
                label.string = "+" + this.data.UserData[i].MoneyNum;
            } else {
                const color = new cc.Color(255, 42, 0);
                node.color = color;
                label.string = this.data.UserData[i].MoneyNum + "";
            }
            node.parent = this.group;
        }
    }

    videoClick(){

       
        if(!this.data)return;
        const game= Global.Instance.DataCache.GameList.GetGame(this.gameid);
        if(!game){
            Global.Instance.UiManager.ShowTip("获取游戏信息失败，请重试");
            return;
        }
        const isnavite = 1;
        const data= WebRequest.DefaultData();
        data.Add("rid",this.data.ID);
        data.Add("isnative",1);

        const action=new ActionNet(this,this.success,this.error);
        Global.Instance.UiManager.ShowLoading("正在获取录像信息");
        WebRequest.replay.getfile(action, data);
    }

    private obj;

    private success(obj) {
        const game= Global.Instance.DataCache.GameList.GetGame(this.gameid);
        if(!game){
            Global.Instance.UiManager.CloseLoading();
            Global.Instance.UiManager.ShowTip("获取游戏信息失败，请重试");
            return;
        }
        this.obj=obj;
        cc.loader.loadRes(`gameres/${game.ModuleName}/Prefabs/VideoPlayer`, this.onprefab.bind(this));
    }

    private error() {
        Global.Instance.UiManager.ShowTip("获取录像失败，请重试");
        Global.Instance.UiManager.CloseLoading();
    }

    private onprefab(err, prefab: cc.Prefab) {
        Global.Instance.UiManager.CloseLoading();
        if(err){            
            Global.Instance.UiManager.ShowTip("此游戏录像功能敬请期待");
            return;
        }
        if (!this.obj) {
            return;
        }
        const node = cc.instantiate(prefab);
        const p = node.getComponent<GameVideoBase>(GameVideoBase);
        p.Show(null,this.obj)
    }
}