import { LQMJMahjongDef, LQMJ } from "../ConstDef/LQMJMahjongDef";
import M_LQMJView from "../M_LQMJView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LQMJ_OutCardView extends cc.Component {

    @property(cc.Sprite)
    img_card: cc.Sprite=null;

    @property(cc.Node)
    control: cc.Node=null;


    private static ShowCardPos: Array<{x:number,y:number}> = [
            { x: 0,y:-100},
            { x: 350,y: 50},
            { x: 0,y: 200},
            { x: -350,y: 50}
        ];

    onLoad() {
        // init logic
        
    }

    public init() {
        this.node.active = false;
    }

    public showCard(chair:number,card:number,x:number,y:number):void{
        this.node.stopAllActions();
        if((LQMJMahjongDef.gInvalidChar == chair) || (LQMJMahjongDef.gInvalidMahjongValue == card)){
            this.node.active = false;
        }else{
            
            this.node.opacity=0;
            this.node.scale=1;
            
            this.img_card.spriteFrame=LQMJ.ins.iclass.getMahjongPaiHuaRes(card);
            let logicChair: number = LQMJ.ins.iclass.physical2logicChair(chair);

            if(cc.isValid(M_LQMJView.ins.CardView)){
                for(let i=0;i<4;i++){
                    if(i!=chair){
                        M_LQMJView.ins.CardView.getPool(i).ShowAllCard();
                    }
                }
                // M_LQMJView.ins.CardView.RunArrow();
            } 



            this.node.x = LQMJ_OutCardView.ShowCardPos[logicChair].x;
            this.node.y = LQMJ_OutCardView.ShowCardPos[logicChair].y;

            this.node.active = true;

            let func=cc.callFunc(this.showAllPoolCardAndArrow,this);

            let action=cc.sequence(cc.fadeTo(0.15, 255), cc.fadeTo(0.7, 255),
            cc.spawn(cc.fadeTo(0.15, 0),cc.scaleTo(0.15,0),cc.moveTo(0.15,x,y)),func);//cc.scaleTo(0.25,0));//
            this.node.runAction(action);
        }
    }

    private showAllPoolCardAndArrow():void{
        if(cc.isValid(M_LQMJView.ins.CardView)){
            M_LQMJView.ins.CardView.getPool(0).ShowAllCard();
            M_LQMJView.ins.CardView.getPool(1).ShowAllCard();
            M_LQMJView.ins.CardView.getPool(2).ShowAllCard();
            M_LQMJView.ins.CardView.getPool(3).ShowAllCard();
            M_LQMJView.ins.CardView.RunArrow();
        } 
    }

    private showAllPoolCard():void{
        if(cc.isValid(M_LQMJView.ins.CardView)){
            M_LQMJView.ins.CardView.getPool(0).ShowAllCard();
            M_LQMJView.ins.CardView.getPool(1).ShowAllCard();
            M_LQMJView.ins.CardView.getPool(2).ShowAllCard();
            M_LQMJView.ins.CardView.getPool(3).ShowAllCard();
        } 
    }

    onDisable(): void{
        this.node.stopAllActions();
        this.showAllPoolCard();
    }
}
