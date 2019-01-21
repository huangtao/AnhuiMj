import M_HQMJClass from '../M_HQMJ/M_HQMJClass';
import M_HQMJView from '../M_HQMJ/M_HQMJView';
import HQMJ_SettingView from '../M_HQMJ/SkinView/HQMJ_SettingView';
import M_HQMJVideoClass from '../M_HQMJ/M_HQMJVideoClass';

const { ccclass, property } = cc._decorator;

@ccclass
export default class HQMJ_Out extends cc.Component {

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

    public showOutPai(chair,outPai,_mjType:any){
        
        this.mj_pai.spriteFrame=_mjType.getMahjong3DPaiBeiRes("hand_self_1");
                    
        this.mj_hua.spriteFrame=_mjType.getMahjongPaiHuaResOut(outPai);
        
        var logicChair: number =_mjType.physical2logicChair(chair);

        this.mj_pai.node.x = this.UserDataPos[logicChair].x;


        this.mj_pai.node.y = this.UserDataPos[logicChair].y;

        this.node.active = true;
        
        if(this.node){
            setTimeout(function(){
                this.node.active=false;
            }.bind(this),800);
        }
        // this.scheduleOnce(function(){
        //     this.node.active=false;
        // }.bind(this),0.8);


    }

}
