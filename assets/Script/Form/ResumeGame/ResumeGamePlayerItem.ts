/**
 * 续局弹框玩家信息展示列表Item预制体
 */

import { LoadImage } from "../../Tools/Function";
import { QL_Common } from "../../CommonSrc/QL_Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResumeGamePlayerItem extends cc.Component {

	/**
	 * 分数
	 */
	@property(cc.Label)
	lab_score: cc.Label = null;

    /**
	 * 投票状态
	 */
	@property(cc.Label)
	lab_status: cc.Label = null;

    /**
	 * 头像
	 */
	@property(cc.Sprite)
	sp_headImg: cc.Sprite = null;

	/**
	 * 分数面板节点
	 */
	@property(cc.Node)
	node_score: cc.Node = null;

	playerid: number = 0;

    /**
     * 初始化界面数据显示
     */
	public initUI(playerInfo: any, gameVoteType: number) {
		// 分数
		if (this.lab_score) {
			this.lab_score.string = '';

			if (playerInfo.score < 0) {
				cc.loader.loadRes('font/jian', cc.BitmapFont, (err, spriteFrame) => {
					cc.log('-- score ', playerInfo.score);
					cc.log('-- lab_score string ', this.lab_score.string);
					this.lab_score.font = spriteFrame;
					this.lab_score.string += playerInfo.score;
				});
			} else {
				cc.loader.loadRes('font/jia', cc.BitmapFont, (err, spriteFrame) => {
					this.lab_score.font = spriteFrame;
					cc.log('-- score ', playerInfo.score);
					cc.log('-- lab_score string ', this.lab_score.string);
					this.lab_score.string = '+';
					this.lab_score.string += playerInfo.score;
				});
			}

		}

		// // 投票状态
		if (this.lab_status) {
			this.lab_status.node.color = cc.color(236, 119, 32);
		}

		// 显示分数面板节点
		switch (gameVoteType) {
			case 0:
			case 1:
				{
					this.node_score.active = true;
				}
				break;
			default:
				{
					this.node_score.active = false;
				}
				break;
		}

		this.playerid = playerInfo.PlayerID;
		cc.log("我自己的id" + this.playerid);
		if (this.lab_status.string != "同意续局") {
			this.lab_status.string = "投票中";
		} else {
			let labelTipsStr: string = "";
			switch (gameVoteType) {
				case 0:
				case 1:
					{
						this.node_score.active = true;
						labelTipsStr = "同意续局...";
					}
					break;
				default:
					{
						this.node_score.active = false;
						labelTipsStr = "同意...";
					}
					break;
			}

			this.lab_status.string = labelTipsStr;
		}

		// 头像
		if (this.sp_headImg) {
			LoadImage(playerInfo.FaceID, this.sp_headImg);
		}
	}

	/**
	 * 更新投票状态显示
	 */
	public updateVoteStatusShow(status: number, voteType: number) {
		if (this.lab_status) {
			this.lab_status.node.color = cc.color(34, 169, 41);
			if (QL_Common.GameVoteStatus.Denied == status) {
				let labelTipsStr: string = "";
				switch (voteType) {
					case 0:
					case 1:
						{
							labelTipsStr = "结束游戏";
						}
						break;
					default:
						{
							labelTipsStr = "拒绝";
						}
						break;
				}

				this.lab_status.string = labelTipsStr;
			} else if (QL_Common.GameVoteStatus.Agree == status) {
				let labelTipsStr: string = "";
				switch (voteType) {
					case 0:
					case 1:
						{
							labelTipsStr = "同意续局...";
						}
						break;
					default:
						{
							labelTipsStr = "同意...";
						}
						break;
				}

				this.lab_status.string = labelTipsStr;
			} else {
				cc.log("状态未知,请检查");
			}
		}
	}
}
