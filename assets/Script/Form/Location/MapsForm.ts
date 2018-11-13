import { HeaderItem } from "./HeaderItem";
import UIBase from "../Base/UIBase";
import { QL_Common } from '../../CommonSrc/QL_Common';
import UiManager from '../../Manager/UiManager';
import Global from "../../Global/Global";
import { UIName } from "../../Global/UIName";


const { ccclass, property } = cc._decorator;
@ccclass
export class MapsForm extends UIBase<any> {
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;
    @property([HeaderItem])
    HeaderItems: HeaderItem[] = [];
    @property(cc.Integer)
    MinChairId: number = 0;
    onLoad() {
        for (let i = 0; i < this.HeaderItems.length; i++) {
            if (cc.isValid(this.HeaderItems[i])) {
                this.HeaderItems[i].idx = i;
            }
        }
    }
    public TabelPlayer: QL_Common.TablePlayer[] = new Array();

    public SetPlayer(i, info: QL_Common.TablePlayer, nextPlayer : QL_Common.TablePlayer, playerNum : number) {
        if (!this.TabelPlayer) return;
        this.TabelPlayer[i] = info;
        this.HeaderItems[i].SetPlayer(info, nextPlayer, playerNum);
    }

    // /**
    //  * 设置Gps显示参数
    //  * @param i 玩家座位号
    //  * @param player 玩家信息
    //  * @param nextPlayer 玩家下家信息
    //  * @param playerNum 当前桌子玩家数量
    //  */
    // public SetGpsPlayerInfo(i, player: QL_Common.TablePlayer, nextPlayer : QL_Common.TablePlayer, playerNum : number){
    //     this.HeaderItems[i].SetPlayer(i, player, nextPlayer, playerNum);
    // }
}