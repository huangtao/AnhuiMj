import M_MGMJClass from '../M_MGMJClass';
import M_MGMJView from '../M_MGMJView';
import MGMJ_SettingView from './MGMJ_SettingView';

const { ccclass, property } = cc._decorator;

@ccclass
export default class MJ_Cheating extends cc.Component {

    @property(cc.Sprite)
    mj_bg:cc.Sprite = null;

    @property(cc.Sprite)
    mj_pai:cc.Sprite = null;

    @property(cc.Sprite)
    mj_hua:cc.Sprite = null;
    
    onLoad() {
        
    }
    private UserDataPos: Array<{ x: number,y: number }> = [
            { x: 10,y: -80 },
            { x: 350,y: 80 },
            { x: 20,y: 200},
            { x: -330,y: 20 }
        ];

    public showOutPai(chair,outPai){

        this.mj_pai.spriteFrame=M_MGMJClass.ins.getMahjong3DPaiBeiRes("hand_self_1");            
        this.mj_hua.spriteFrame=M_MGMJClass.ins.getMahjongPaiHuaResOut(outPai);
        
        var logicChair: number =M_MGMJClass.ins.physical2logicChair(chair);

        this.mj_pai.node.x = this.UserDataPos[logicChair].x;
        this.mj_pai.node.y = this.UserDataPos[logicChair].y;

        this.node.active = true;

        setTimeout(function(){
            this.node.active=false;
        }.bind(this),800);
    }

}
