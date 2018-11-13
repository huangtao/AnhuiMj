import { UIName } from "../../Global/UIName";
import { NumItem } from "./NumItem";
import Global from "../../Global/Global";
import { QL_Common } from "../../CommonSrc/QL_Common";
import { KeyValue, NumStack } from "../../CustomType/NumStack";
import { EnterNumForm } from "../Base/EnterNumForm";
import { EventCode } from "../../Global/EventCode";
import { IDictionary } from "../../Interface/IDictionary";
import { Action, ActionNet } from "../../CustomType/Action";
import { WebRequest } from "../../Net/Open8hb";
import FriendCircleWebHandle from "../FriendsCircle/FriendCircleWebHandle";
import FriendCircleDataCache from "../FriendsCircle/FriendCircleDataCache";

const { ccclass, property } = cc._decorator;
@ccclass
export class JoinRoom extends EnterNumForm {
    /**
     * 标题文字
     */
    @property (cc.Label)
    lab_title: cc.Label = null;

    /**
     * 提示文字
     */
    @property (cc.Label)
    lab_tip: cc.Label = null;

    /**
     * 输入的长度
     */
    private _length = 0;

    protected Start() {
        if (this.ShowParam && "Hall" == this.ShowParam) {
            //从大厅进来的

            Global.Instance.GameHost.joinRoom(this._numStack.Num, QL_Common.EnterRoomMethod.TableID);

        }else{
            // 亲友圈进来的
            FriendCircleWebHandle.joinFriendCircle(this._numStack.Num.toString());
        }
    }

    start(){
        super.start();
        this.node.setPosition(640,360);
    }

    public get UIname(): string {
        return UIName.JoinRoom;
    }
    protected Length() {
        if (0 == this._length) {
            this._length = 6;
        }

        return this._length;
    }

    InitShow(){
        super.InitShow();
        if(!cc.game.isPersistRootNode(this.node)){
            cc.log("添加常驻节点");
            cc.game.addPersistRootNode(this.node);
        }

        // 判断是否是从亲友圈进来的
        let txt_title = "";
        let txt_tip = "";
        if (this.ShowParam && "Hall" == this.ShowParam) {
            txt_title = "加入房间";
            txt_tip = "请输入房间号";
            this._length = 6;
        }else if("FriendCircle" == this.ShowParam){
            txt_title = "加入亲友圈";
            txt_tip = "请输入亲友圈ID";
            this._length = 5;
        }

        // 重新创建输入框个数
        this.reCreateInputNumItem();

        if (this.lab_tip && this.lab_title) {
            this.lab_tip.string = txt_tip;
            this.lab_title.string = txt_title;
        }
    }
    /**
     * 
     * @param eventCode 消息到达
     * @param value 
     */
    protected OnUiEventComeIn(eventCode: number, value: any): boolean {
        switch(eventCode){
            case EventCode.ErrorCode:{
                this.UiManager.ShowTip(value[1]);
                this.Clear();
                return true;
            }
        }
        return false;
    }
}




