import { PDK } from "../GameHelp/PDK_IClass";
import GameLogic  from "../GameHelp/PDK_GameLogic";
const {ccclass, property} = cc._decorator;

@ccclass
export default class PDK_skinCards extends cc.Component {

    @property(cc.Sprite)
    private cardImage: cc.Sprite = null;
    @property(cc.Sprite)
    private icon_firstOut: cc.Sprite = null;
    @property(cc.Sprite)
    private icon_zhuaNiao: cc.Sprite = null;

    private value:number = null;
    public cValue:number = null;
    public isSelected:boolean = false;
    public PosX:number = null; 
    public scale:number = 1;
    onLoad(){
       //this.node.on(cc.Node.EventType.TOUCH_START, this.selectedCard, this);
    }

    /**
     * 创建单张牌组件
     */
    public createCard(value:number) {
        this.value = value;
        this.cValue = GameLogic.GetCardLogicValue(value);
        this.cardImage.spriteFrame = PDK.ins.iview.GetCardsRes(value);
        if(PDK.ins.iview.GetGameRule().zhuaNiaoScore != -1 && value == 0x2A){
            this.icon_zhuaNiao.node.active = true;
        }else{
            this.icon_zhuaNiao.node.active = false;
        }
        if(PDK.ins.iview.GetGameInfo().firstOutValue == value){
            this.icon_firstOut.node.active = true;
        }else{
            this.icon_firstOut.node.active = false;
        }
    }

    /**
     * 切换牌的选中状态
    */
    public changeSelected(){
        this.isSelected = !this.isSelected;
        if(this.isSelected){
            this.node.setPositionY(20);
        }else{
            this.node.setPositionY(0);
        }
    }
    
    /**
     * 设置牌的选中状态
    */
    public setSelected(state:boolean){
        this.isSelected = state;
        if(this.isSelected){
            this.node.setPositionY(20);
        }else{
            this.node.setPositionY(0);
        }
    }
     /**
     * 获取牌值
    */
    public getValue(){
        return this.value;
    }
    //设置牌的缩放
    public setScale(value:number){
        this.scale = value;
        this.node.scale = value;
    }
    /**
     * 牌的点击事件
    
    private selectedCard(){
        if(this.isSelected){
            this.node.setPositionY(this.node.getPositionY() + 20);
        }else{
            this.node.setPositionY(this.node.getPositionY() - 20);
        }
        this.isSelected = !this.isSelected;
    }*/

    // update (dt) {}
}
