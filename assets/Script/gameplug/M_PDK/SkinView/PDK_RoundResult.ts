import { PDK } from "../GameHelp/PDK_IClass";
import { ScoreView } from "../GameHelp/PDK_GameHelp";
import PDK_RoundResultItem from "./PDK_RoundResultItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PDK_RoundResult extends cc.Component {

    @property(cc.Prefab)
    prefab_PlayerItem:cc.Prefab = null;

    //背景
    @property(cc.Node)
    private node_bg:cc.Node = null;
    @property(cc.Node)
    private backGround:cc.Node = null;
    //按钮
    @property(cc.Button)
    private btn_look:cc.Button = null;
    @property(cc.Button)
    private btn_ready:cc.Button = null;
    //玩家信息
    @property(cc.Node)
    private node_context:cc.Node = null;

    //变量
    private isCloseBg:boolean = false;
    private PlayerItem:PDK_RoundResultItem[] = [];

    //资源
    @property([cc.SpriteFrame])
    private res_view: cc.SpriteFrame[] = [];


    onLoad () {
        this.btn_look.node.on("click",this.ToLookDesk,this);
        this.btn_ready.node.on("click",this.ToReady,this);;
    }
    //查看牌桌
    private ToLookDesk(){
        this.isCloseBg = !this.isCloseBg;
        if(this.isCloseBg){
            this.node_bg.active = false;
            this.backGround.active = false;
            this.btn_look.node.getComponent(cc.Sprite).spriteFrame = this.res_view[5];
        }else{
            this.node_bg.active = true;
            this.backGround.active = true;
            this.btn_look.node.getComponent(cc.Sprite).spriteFrame = this.res_view[4];
        }
        
    }
    //继续游戏
    private ToReady(){
        PDK.ins.iview.OnReadyAndClear();
        this.node.active = false;
    }
    //显示结算信息
    public Show(scoreView:ScoreView) {
        let gameCount = scoreView.datalist.length - 1;
        if(PDK.ins.iview.GetGameInfo().GetLastGameCount() == 0){
            this.btn_ready.node.getComponent(cc.Sprite).spriteFrame = this.res_view[7];
        }else{
            this.btn_ready.node.getComponent(cc.Sprite).spriteFrame = this.res_view[6];
        }
        
        if(this.PlayerItem.length == 0){
            for(let i = 0;i<scoreView.datalist[gameCount].data.length;i++){
                this.PlayerItem[i] = cc.instantiate(this.prefab_PlayerItem).getComponent<PDK_RoundResultItem>(PDK_RoundResultItem);
                this.node_context.addChild(this.PlayerItem[i].node);
                this.PlayerItem[i].node.setPosition(i%2*500 - 250,0 - Math.floor(i/2)*150 - 70);
            }
        }
        for(let i = 0;i<this.PlayerItem.length;i++){
            this.PlayerItem[i].show(i,scoreView.facelist[i],scoreView.namelist[i],scoreView.datalist[gameCount].data[i],scoreView.RoundScoreInfolist[gameCount].data[i],scoreView.baoPeilist[gameCount].data[i],scoreView.RoundScoreInfolist[gameCount].data[i],scoreView.isWinList[gameCount].data[i]);
        }
        this.node_bg.active = true;
        this.backGround.active = true;
        this.node.active = true;
        this.btn_look.node.getComponent(cc.Sprite).spriteFrame = this.res_view[4];
    }
    public OnClose() {
        this.node.active = false;
    }
    public changeBtnReadyImage(isReady:boolean){
        if(isReady){
            this.btn_ready.node.getComponent(cc.Sprite).spriteFrame = this.res_view[6];
        }else{
            this.btn_ready.node.getComponent(cc.Sprite).spriteFrame = this.res_view[7]; 
        }
    }
}
