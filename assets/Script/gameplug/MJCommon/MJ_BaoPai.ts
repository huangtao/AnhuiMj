import M_HQMJClass from '../M_HQMJ/M_HQMJClass';
import M_HQMJView from '../M_HQMJ/M_HQMJView';
import HQMJ_SettingView from '../M_HQMJ/SkinView/HQMJ_SettingView';
import M_HQMJVideoClass from '../M_HQMJ/M_HQMJVideoClass';
import { MGMJ } from '../M_MGMJ/ConstDef/MGMJMahjongDef';
import M_MGMJView from '../M_MGMJ/M_MGMJView';

const { ccclass, property } = cc._decorator;

@ccclass
export default class MJ_BaoPai extends cc.Component {

    @property(cc.Sprite)
    mj_pai:cc.Sprite = null;

    @property(cc.Sprite)
    mj_hua:cc.Sprite = null;
    
    onLoad() {
        
    }

    public showBaoPai(outPai){
        
        this.mj_pai.spriteFrame=MGMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                    
        this.mj_hua.spriteFrame=MGMJ.ins.iclass.getMahjongPaiHuaRes(outPai);
        
        this.node.active = true;
        this.node.scaleX = 0.5;
        this.node.scaleY = 0.5;
        this.node.setPosition(cc.p(-20,-50));
        // let pos = M_MGMJView.ins.img_baokuang.node.getPosition();
        let pos = MGMJ.ins.iview.getBaoPaiKuang().node.getPosition();
        this.node.runAction(cc.sequence(cc.scaleTo(0.5,1),cc.moveTo(1,pos),cc.scaleTo(0.8,0.7)))

    }

}
