import { JZMJMahjongDef, JZMJ } from "../ConstDef/JZMJMahjongDef";
import M_JZMJView from "../M_JZMJView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class JZMJ_OutCardView extends cc.Component {

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
        if((JZMJMahjongDef.gInvalidChar == chair) || (JZMJMahjongDef.gInvalidMahjongValue == card)){
            this.node.active = false;
        }else{
            
            this.node.opacity=0;
            this.node.scale=1;
            
            this.img_card.spriteFrame=JZMJ.ins.iclass.getMahjongPaiHuaRes(card);
            let logicChair: number = JZMJ.ins.iclass.physical2logicChair(chair);

            if(cc.isValid(M_JZMJView.ins.CardView)){
                for(let i=0;i<4;i++){
                    if(i!=chair){
                        M_JZMJView.ins.CardView.getPool(i).ShowAllCard();
                    }
                }
                // M_JZMJView.ins.CardView.RunArrow();
            } 



            this.node.x = JZMJ_OutCardView.ShowCardPos[logicChair].x;
            this.node.y = JZMJ_OutCardView.ShowCardPos[logicChair].y;

            this.node.active = true;

            let func=cc.callFunc(this.showAllPoolCardAndArrow,this);

            let action=cc.sequence(cc.fadeTo(0.15, 255), cc.fadeTo(0.7, 255),
            cc.spawn(cc.fadeTo(0.15, 0),cc.scaleTo(0.15,0),cc.moveTo(0.15,x,y)),func);//cc.scaleTo(0.25,0));//
            this.node.runAction(action);
        }
    }

    private showAllPoolCardAndArrow():void{
        if(cc.isValid(M_JZMJView.ins.CardView)){
            M_JZMJView.ins.CardView.getPool(0).ShowAllCard();
            M_JZMJView.ins.CardView.getPool(1).ShowAllCard();
            M_JZMJView.ins.CardView.getPool(2).ShowAllCard();
            M_JZMJView.ins.CardView.getPool(3).ShowAllCard();
            M_JZMJView.ins.CardView.RunArrow();
        } 
    }

    private showAllPoolCard():void{
        if(cc.isValid(M_JZMJView.ins.CardView)){
            M_JZMJView.ins.CardView.getPool(0).ShowAllCard();
            M_JZMJView.ins.CardView.getPool(1).ShowAllCard();
            M_JZMJView.ins.CardView.getPool(2).ShowAllCard();
            M_JZMJView.ins.CardView.getPool(3).ShowAllCard();
        } 
    }

    onDisable(): void{
        this.node.stopAllActions();
        this.showAllPoolCard();
    }
}
