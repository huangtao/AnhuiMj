import { M_HZMJ_GameMessage } from "../../../CommonSrc/M_HZMJ_GameMessage";
import { HZMJMahjongAlgorithm } from "../HZMJMahjongAlgorithm/HZMJMahjongAlgorithm";
import { HZMJMahjongDef } from "../ConstDef/HZMJMahjongDef";
import HZMJ_BanlanceFixed from "../PlayerCard/banlanceShow/HZMJ_BanlanceFixed";
import HZMJ_BanlanceActive from "../PlayerCard/banlanceShow/HZMJ_BanlanceActive";
import { SetTextureRes } from "../../MJCommon/MJ_Function";
import M_HZMJClass from "../M_HZMJClass";
import { HZMJMahjongAlgorithm1 } from "../HZMJMahjongAlgorithm/HZMJMahjongAlgorithm1";
import M_HZMJVoice from "../M_HZMJVoice";
const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_SinglePlayerBalance extends cc.Component {

    @property(cc.Label)
    lbl_account: cc.Label=null;

    @property(cc.Label)
    lbl_totalScore: cc.Label=null;
    
    @property([cc.Label])
    lbl_playBanlance: cc.Label[]=[];

    @property(cc.Sprite)
    img_la_0: cc.Sprite=null;
    @property(cc.Sprite)
    img_la_1: cc.Sprite=null;
    @property(cc.Sprite)
    img_pao_0: cc.Sprite=null;
    @property(cc.Sprite)
    img_pao_1: cc.Sprite=null;
    // //赢的图标
    // @property(cc.Sprite)
    // img_ying: cc.Sprite=null;
    // //输的图标
    //  @property(cc.Sprite)
    // img_shu: cc.Sprite=null;
    // //平局的图标
    //  @property(cc.Sprite)
    // img_ping: cc.Sprite=null;
    @property(HZMJ_BanlanceFixed)
    fixedCard: HZMJ_BanlanceFixed=null;
    @property(HZMJ_BanlanceActive)
    handCard: HZMJ_BanlanceActive=null;

    onLoad() {
        // init logic
        
    }

    //结算
    private _usefulinfo:number;
    
    public init() {
        
        this._usefulinfo=0;
        this.fixedCard.init();
        this.handCard.init();

    }
    
    /**
     * 显示玩家结算信息
     * */
    public showBalance(account:string,allcard:M_HZMJ_GameMessage.PlayerCard,balance:M_HZMJ_GameMessage.PlayerBalance):void{
        
        this.fixedCard.clear();
       // this.fixedCard.node.removeAllChildren();
        this.handCard.clear();
     //   this.handCard.node.removeAllChildren();
        this.lbl_account.string = account;
        if(balance.TotalScore>0)
            this.lbl_totalScore.string = "+"+balance.TotalScore.toString();
        else
            this.lbl_totalScore.string = balance.TotalScore.toString();
        // if(balance.TotalScore>0){
        //     this.img_ying.node.active=true;
        //     this.img_shu.node.active=false;
        //     this.img_ping.node.active=false;
        // }
        // if(balance.TotalScore<0){
        //     this.img_shu.node.active=true;
        //     this.img_ying.node.active=false;
        //     this.img_ping.node.active=false;
        // }
        // if(balance.TotalScore=0){
        //     this.img_ping.node.active=true;
        //     this.img_shu.node.active=false;
        //      this.img_ying.node.active=false;
        // }
       // this.lbl_totalScore.node.color =cc.hexToColor(this.getScoreShowColor(balance.TotalScore));
        this._usefulinfo=0;
        for(var i:number=0; i<8; i++){
            this.lbl_playBanlance[i].node.active=false;
        }
        //手牌部分
        if(allcard.fixedCard.length>0)
        {
            for(var i=0;i<allcard.fixedCard.length;i++)
            {
                this.fixedCard.addFixed(allcard.fixedCard[i].tokenCard,allcard.fixedCard[i].type,allcard.fixedCard[i].pos);
            }
            this.handCard.fixedCardNum=allcard.fixedCard.length;
        }          
        this.handCard._holdCard=allcard.huCard;
       // HZMJMahjongAlgorithm.sortCardAry(allcard.handCard);
       var _hun :Array<number> = new Array<number>();
        _hun.push(0x35);  
        allcard.handCard=HZMJMahjongAlgorithm1.sortCardAry1(allcard.handCard,_hun); 
        if(allcard.huCard!=HZMJMahjongDef.gInvalidMahjongValue)
            allcard.handCard.push(allcard.huCard);
        this.handCard.refreshHandCardData(allcard.handCard);
        let url="";
        if(balance.JieSuan[0]>0){
            // url="gameres/M_HZMJ/Texture/LaPaoZuo/zuo";
            // SetTextureRes(url,this.img_la_0);
            // SetTextureRes(url,this.img_la_1);
            // this.img_la_0.texture=<egret.Texture>RES.getRes("zuo_png");
            // this.img_la_1.texture=<egret.Texture>RES.getRes("zuo_png");
        }else{
            // url="gameres/M_HZMJ/Texture/LaPaoZuo/la";
            // SetTextureRes(url,this.img_la_0);
            // SetTextureRes(url,this.img_la_1);
        }
        this.img_la_0.node.active=false;
        this.img_la_1.node.active=false;
        this.img_pao_0.node.active=false;
        this.img_pao_1.node.active=false;

        if(balance.JieSuan[1]>0){
            if(balance.JieSuan[1]==1){
                this.img_la_0.node.active=true;
                this.img_la_1.node.active=false;
            }
            else{
                this.img_la_0.node.active=true;
                this.img_la_1.node.active=true;
            } 
        }
        if(balance.JieSuan[2]>0){
            if(balance.JieSuan[2]==1){
                this.img_pao_0.node.active=true;
                this.img_pao_1.node.active=false;
            }
            else{
                this.img_pao_0.node.active=true;
                this.img_pao_1.node.active=true;
            } 
        }
        
        //结算部分，赢钱才显示详细信息
        // if(balance.TotalScore>0 || balance.HuType>0)
        // {
            //明杠
            if(balance.JieSuan[3]>0 && this._usefulinfo<8)
            {
                this.lbl_playBanlance[this._usefulinfo].string="明杠X"+balance.JieSuan[3];
                this.lbl_playBanlance[this._usefulinfo++].node.active=true;
            }

            //放杠
            if(balance.JieSuan[4]>0 && this._usefulinfo<8 )
            {
                this.lbl_playBanlance[this._usefulinfo].string="放杠X"+balance.JieSuan[4];
                this.lbl_playBanlance[this._usefulinfo++].node.active=true;
            }
            //补杠
            if(balance.JieSuan[5]>0 && this._usefulinfo<8 )
            {
                this.lbl_playBanlance[this._usefulinfo].string="补杠X"+balance.JieSuan[5];
                this.lbl_playBanlance[this._usefulinfo++].node.active=true;
            }
            //暗杠
            if(balance.JieSuan[6]>0 && this._usefulinfo<8 )
            {
                this.lbl_playBanlance[this._usefulinfo].string="暗杠X"+balance.JieSuan[6];
                this.lbl_playBanlance[this._usefulinfo++].node.active=true;
            }
            //杠后开花
            if(balance.JieSuan[7]>0 && this._usefulinfo<8)
            {
                this.lbl_playBanlance[this._usefulinfo].string="杠后开花";
                this.lbl_playBanlance[this._usefulinfo++].node.active=true;
            }
            //抢杠胡
            if(balance.JieSuan[8]>0 && this._usefulinfo<8)
            {
                this.lbl_playBanlance[this._usefulinfo].string="抢杠胡";
                this.lbl_playBanlance[this._usefulinfo++].node.active=true;
            }
               
           
             //杠后炮
            if(balance.JieSuan[9]>0 && this._usefulinfo<8)
            {
                this.lbl_playBanlance[this._usefulinfo].string="杠后炮";
                this.lbl_playBanlance[this._usefulinfo++].node.active=true;
            }
                // this.lbl_playBanlance[this._usefulinfo].string="庄分："+M_HZMJClass.ins._lianBanker+1;
                // this.lbl_playBanlance[this._usefulinfo++].node.active=true;
            
        }

    //}
    
    /**
     * 显示分数颜色
     * */
    private getScoreShowColor(score: number): string {
        if(score > 0) {
            return "#d11b10";
        } else if(score < 0) {
            return "#09326a";
        }
        return "#ffffff";
    }
}
