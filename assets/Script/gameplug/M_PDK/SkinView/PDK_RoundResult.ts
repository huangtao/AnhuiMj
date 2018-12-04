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
    //title
    @property(cc.Sprite)
    private node_title:cc.Sprite = null;
    @property(cc.Sprite)
    private Sprite_title:cc.Sprite = null;
    //详情
    @property (cc.Node)
    private node_info_View:cc.Node = null;
    //详情
    @property (cc.RichText)
    private RichText_info:cc.RichText = null;

    //变量
    private isCloseBg:boolean = false;
    private PlayerItem:PDK_RoundResultItem[] = [];

    //资源
    @property([cc.SpriteFrame])
    private res_view: cc.SpriteFrame[] = [];


    onLoad () {
        this.node_info_View.setLocalZOrder(10);
        this.btn_look.node.on("click",this.ToLookDesk,this);
        this.btn_ready.node.on("click",this.ToReady,this);
        this.node.on('showInfo', function (event) {
            let data = event.getUserData();
            this.showInfo(data[0]);
            event.stopPropagation();
          },this);
    }
    //查看牌桌
    private ToLookDesk(){
        this.isCloseBg = !this.isCloseBg;
        if(this.isCloseBg){
            this.node_bg.active = false;
            this.backGround.active = false;
            this.btn_look.node.getComponent(cc.Sprite).spriteFrame = this.res_view[4];
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
    public Show(scoreView:ScoreView,length:number) {
        this.node_info_View.active = false;
        let gameCount = length;
        if(this.PlayerItem.length == 0){
            for(let i = 0;i<scoreView.chairlist.length;i++){
                this.PlayerItem[i] = cc.instantiate(this.prefab_PlayerItem).getComponent<PDK_RoundResultItem>(PDK_RoundResultItem);
                this.node_context.addChild(this.PlayerItem[i].node);
                this.PlayerItem[i].node.setPosition(0,0- (i * 80) - 35);
                if(PDK.ins.iclass.GetClientChair(scoreView.chairlist[i]) == 0 ){
                    if(scoreView.isWinList[gameCount].data[i] == 1){
                        this.node_title.spriteFrame = this.res_view[2];
                        this.Sprite_title.spriteFrame = this.res_view[3];
                    }else{
                        this.node_title.spriteFrame = this.res_view[0];
                        this.Sprite_title.spriteFrame = this.res_view[1];
                    }
                }
            }
        }
        for(let i = 0;i<this.PlayerItem.length;i++){
            this.PlayerItem[i].show(i,scoreView.facelist[i],scoreView.namelist[i],scoreView.datalist[gameCount].data[i],scoreView.RoundScoreInfolist[gameCount].data[i],scoreView.baoPeilist[gameCount].data[i]);
        }
        this.node.active = true;
    }

    //显示详情
    private showInfo(index:number){
        this.node_info_View.active = true;
        let gameCount = PDK.ins.iview.GetGameInfo().gameCount[0];
        let scoreView = PDK.ins.iview.GetScoreView();
        this.RichText_info.string = scoreView.RoundScoreInfolist[gameCount-1].data[index];
        this.node_info_View.setPositionY(0-index*80 - 45);
    }
}
