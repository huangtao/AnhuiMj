/**
 * 城市列表Item
 */
import Global from "../../Global/Global";
import { WebRequest } from "../../Net/Open8hb";
import { GameVideoBase } from "../../gameplug/base/GameVideoBase";
import { RoundDetailInfo } from "./RecordDataStruct";
import ScrollHelperItem from "../../utils/ScrollHelperItem";
import { Action, ActionNet } from "../../CustomType/Action";
import UrlCtrl from '../../Net/UrlCtrl';

const {ccclass, property} = cc._decorator;

@ccclass
export default class RecordDetailItem extends ScrollHelperItem {
	  /** 
	   * 局数
	  */
    @property(cc.Label)
    lab_roundIdx: cc.Label = null;

    /** 
     * 回放按钮
    */
    @property(cc.Button)
    btn_replay: cc.Label = null;

    private _recordData: RoundDetailInfo;
    private _videoData: any = null;

  	/**
  	 * @Author   WangHao
  	 * @DateTime 2018-08-13
  	 * @Desc     初始化界面显示
  	 * @param    {any}      data [description]
  	 */
  	public initShow( data: RoundDetailInfo, idx: number): void{
  		if (!data) {
  			console.log("error: data is not exist");
  			return;
  		}

      this._recordData = data;

      if (this.btn_replay && !this._recordData.recPath) {
          this.btn_replay.node.active = false;
      }

  		this.lab_roundIdx.string = idx + 1 +'';

  		// 显示玩家分数
  		for (var index = 0; index < 5; ++index) {
  				let lab_score = cc.find("lab_score" + index,this.node).getComponent(cc.Label);

          if (index > data.detailListItem.length - 1) {
            lab_score.node.active = false;
            continue;
          }else{
            lab_score.node.active = true;
          }

          let score = data.detailListItem[index].moneynum;

          if (undefined == score) {
            continue;
          }
          
  				lab_score.string = score + '';

          if (score < 0) {
            lab_score.node.color = cc.color(177,98,50,255);
          }else{
            lab_score.node.color = cc.color(255,72,0,255);
        }
  		}
  	}
    /**
     * @Author   WangHao
     * @DateTime 2018-08-13
     * @Desc     回放按钮表点击处理
     */
  	public btnReplayEventHandle(): void{
      if (!this._recordData.recPath) {
        return;
      }
      
      cc.info('--- video path ', this._recordData.recPath);
      Global.Instance.UiManager.ShowLoading('正在获取数据...');
      let act = new ActionNet(this,(res)=>{
        if (res.status != 'success') {
          // 获取录像失败，请重试
          Global.Instance.UiManager.ShowTip('获取录像失败，请重试!');
          cc.info('-- err btnReplayEventHandle ',res);

        }else{
          let data = res;
          cc.info('-- btnReplayEventHandle success ',data);

          if ('success' == data.status) {
            if (!data.room || !data.tableplayer || !data.gamemessage) {
              return;
            }

            const game= Global.Instance.DataCache.GameList.GetGame(data.room.GameID);
            if(!game){
                Global.Instance.UiManager.CloseLoading();
                Global.Instance.UiManager.ShowTip("获取游戏信息失败，请重试");
                return;
            }
            this._videoData = data;
            cc.loader.loadRes(`gameres/${game.ModuleName}/Prefabs/VideoPlayer`, this.onprefab.bind(this));
          }
        }
      });

      UrlCtrl.LoadJsonAsync(this._recordData.recPath,act);
    }  

    private onprefab(err, prefab: cc.Prefab) {
        Global.Instance.UiManager.CloseLoading();
        if(err){            
            Global.Instance.UiManager.ShowTip("此游戏录像功能敬请期待");
            return;
        }
        if (!this._videoData) {
            return;
        }

        const node = cc.instantiate(prefab);
        const p = node.getComponent<GameVideoBase>(GameVideoBase);
        p.Show(null,this._videoData)
    }
}
