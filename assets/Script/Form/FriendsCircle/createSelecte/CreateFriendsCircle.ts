import UIBase from "../../Base/UIBase";
import { WebRequest } from "../../../Net/Open8hb";
import { IDictionary } from "../../../Interface/IDictionary";
import { ActionNet } from "../../../CustomType/Action";
import { UIName } from "../../../Global/UIName";
import FriendCircleDataCache from "../FriendCircleDataCache";




const { ccclass, property } = cc._decorator;

@ccclass
export default class CreateFriendsCircle extends UIBase<any> {
	public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;

    /**
     * 亲友圈名称输入框
     */
    @property(cc.EditBox)
    editBox_name: cc.EditBox = null;

    public onLoad(){

    }
    
    public InitShow(){
        // 清空输入文字
        if (this.editBox_name) {
            this.editBox_name.string = '';
        }
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-01
     * @Desc     创建亲友圈
     */
    public sureBtnCllickEventHandle(){
        // 先验证昵称
        if ("" === this.editBox_name.string) {
            this.UiManager.ShowTip("请输入亲友圈昵称");
            return;
        }

        // 判断是否是代理
        if (0 > this.DataCache.UserInfo.InviteCode) {
            this.UiManager.ShowUi(UIName.CreateFriendCircleTip);
            return;
        }

        // 判断是否已经创建或加入了四个亲友圈
        if (FriendCircleDataCache.Instance.FriendCircleList.Count >=4) {
            this.UiManager.ShowTip("您创建或加入的亲友圈总数已达到上限!请删除或退出一个亲友圈再试！");
            return ;
        }

        // 创建亲友圈
        let data: IDictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("name",this.editBox_name.string);
        const action = new ActionNet(this,this.createCircleSuccess,this.createCircleError);
        WebRequest.FriendCircle.createCircle(action,data);
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-06
     * @Desc     创建成功
     * @param    {any}      obj [description]
     */
    public createCircleSuccess(obj: any){
        this.UiManager.ShowTip("创建成功");

        // 刷新列表显示
        if (this.ShowParam) {
            this.ShowParam.RunArgs();
        }

        this.CloseClick();
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-06
     * @Desc     创建失败
     * @param    {any}      obj [description]
     */
    public createCircleError(obj: any){
        
    }
}
