import { WebRequest } from "../../../Net/Open8hb";
import { IDictionary } from "../../../Interface/IDictionary";
import UIBase from "../../Base/UIBase";
import UiManager from "../../../Manager/UiManager";
import Global from "../../../Global/Global";
import { Action, ActionNet } from "../../../CustomType/Action";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { UIName } from "../../../Global/UIName";
import UrlCtrl from "../../../Net/UrlCtrl";

const { ccclass, property } = cc._decorator;

/******************************** 房间玩法和房间列表Item ******************************/

@ccclass
export default class RoomTableItem extends cc.Component {
    public IsEventHandler: boolean = true
    public IsKeyHandler: boolean = true;

    /**
     * 成员列表Item
     */
    @property(cc.Prefab)
    memberItemPrefab: cc.Prefab = null;

    public initShow() {

    }
    
    /**
     * @Author   WangHao
     * @DateTime 2018-08-08
     * @Desc     刷新用户加入房间显示用户头像
     */
    public refreshMemberJoin(){

    }
}
