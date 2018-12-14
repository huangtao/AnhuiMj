import Global from "../../Global/Global"
import { UIName } from "../../Global/UIname"
import  { MillisSecondToDate } from "../../Tools/Function";

import GameRuleBase from "../../gameplug/base/GameRuleBase"
import { RecordInfo } from "./RecordDataStruct";
import ScrollHelperItem from "../../utils/ScrollHelperItem";

/**
 * 城市列表Item
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class RecordItem extends ScrollHelperItem {
	/** 
	 * 游戏名称
	*/
    @property(cc.Label)
    lab_gameName: cc.Label = null;

    /** 
	 * 房间号
	*/
    @property(cc.Label)
    lab_roomID: cc.Label = null;

    /** 
	 * 局数
	*/
    @property(cc.Label)
    lab_roundNum: cc.Label = null;

    /** 
	 * 结束时间
	*/
    @property(cc.Label)
    lab_endTime: cc.Label = null;

    private _showData: RecordInfo = null;

  	/**
  	 * @Author   WangHao
  	 * @DateTime 2018-08-13
  	 * @Desc     初始化界面显示
  	 * @param    {any}      data [description]
  	 */
  	public initShow( data: RecordInfo,idx: number): void{
  		if (!data) {
  			console.log("error: RecordItem  data is not exist");
  			return;
  		}

      this._showData = data;
      let gameInfo = Global.Instance.DataCache.GameList.GetGame(data.gameId);

      if (!gameInfo) {
         Global.Instance.UiManager.ShowTip('游戏未开放');
      }

      if (gameInfo.GameName) {
        this.lab_gameName.string = gameInfo.GameName; // 游戏名称
      }

      if (data.addtime) {
        this.lab_endTime.string = MillisSecondToDate(data.addtime); // 结束时间
      }

      if (data.tableId) {
        this.lab_roomID.string = "房间号: " + data.tableId.toString();     // 房间号
      }
      
      // 总局数
      if (data.gameNum) {
        this.lab_roundNum.string = "局数: " + data.gameNum;
      }

  		// 显示玩家昵称和分数
  		for (var idx = 0; idx < 6; ++idx) {
        let nickname = cc.find("lab_userName" + idx,this.node).getComponent(cc.Label);
        let lab_score: cc.Label = cc.find("lab_userName" + idx + "/lab_score" + idx,this.node).getComponent(cc.Label);

        if (idx > data.scoreList.length - 1) {
          nickname.node.active = false;
          lab_score.node.active = false;
          continue;
        }else{
          nickname.node.active = true;
          lab_score.node.active = true;
        }

        if (data.scoreList[idx].nickname) {
          nickname.string = data.scoreList[idx].nickname;
        }

        let score = data.scoreList[idx].moneynum;

        if (undefined == score) {
          continue;
        }

        lab_score.string = score.toString();

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
     * @Desc     详情按钮表点击处理
     */
  	public detailEventHandle(): void{
      Global.Instance.UiManager.ShowUi(UIName.RecordDetails,this._showData);
  	}

    /**
     * @Author   WangHao
     * @DateTime 2018-08-14
     * @Desc     玩法显示
     */
    public ruleEventHandle(): void{
      // 显示游戏玩法
      
    }
}
