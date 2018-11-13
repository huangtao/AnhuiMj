/**
 * 分享拉起APP或复制房间号到大厅自动弹出
 */

import UIBase from "../Base/UIBase";
import { WxManager } from "../../Manager/WxManager";
import { ShareParam } from "../../CustomType/ShareParam";
import Global from "../../Global/Global";
import { NumItem } from "../JoinRoom/NumItem";
import { UIName } from "../../Global/UIName";
import { QL_Common } from "../../CommonSrc/QL_Common";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AutoJoinRoom extends UIBase<any> {
   public IsEventHandler: boolean = true
   public IsKeyHandler: boolean = true;

   @property(cc.Layout)
   	nums: cc.Layout=null;
   @property(cc.Prefab)
    numprefab: cc.Prefab=null;

   protected InitShow(){
   	    super.InitShow();

   	    if (!this.ShowParam) {
   	    	return;
   	    }

   	    // 先清空
   	    this.nums.node.removeAllChildren();

   	    let roomId: string = this.ShowParam;

   	    // 显示房间号
   	    for (let i = 0; i < roomId.length; i++) {
            const newNode = cc.instantiate(this.numprefab);
            const u = <NumItem>newNode.getComponent(NumItem);
            u.SetText(roomId[i]);
            u.Show(this.nums.node);

            if (0 == i || roomId.length - 1 == i) {
                // 更换底图
                if (u.frame_oval && u.sp_bg) {
                    u.sp_bg.spriteFrame = u.frame_oval;

                    if (roomId.length - 1 == i) {
                        u.sp_bg.node.scaleX = -1;
                    }
                }
            }
        }
   }

   /**
    * 确定按钮回调事件
    */
   public btnSureEventHanle() {
   		if (!this.ShowParam) {
   			return;
   		}

   		Global.Instance.GameHost.joinRoom(this.ShowParam, QL_Common.EnterRoomMethod.TableID);
   }
}
