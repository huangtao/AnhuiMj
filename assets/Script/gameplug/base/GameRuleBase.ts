/**
 * 	游戏通用玩法弹框界面父类
 */
import Global from "../../Global/Global";
import UIBase from "../../Form/Base/UIBase"
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameRuleBase extends UIBase<any> {
	public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true
    
    /**
     * @Author   WangHao
     * @DateTime 2018-08-14
     * @Desc     初始化界面玩法数据显示
     * @param    {any}      data [description]
     */
	public initRuleShow(data: any){
		if (!data) {
			return;
		}
	}

	/**
	 * @Author   WangHao
	 * @DateTime 2018-08-14
	 * @Desc     关闭玩法界面
	 */
	public closeClick(): void{
		this.node.removeFromParent();
	}
}
