import { M_HQMJ_GameMessage } from "../../../CommonSrc/M_HQMJ_GameMessage";
import { HQMJMahjongAlgorithm } from "../HQMJMahjongAlgorithm/HQMJMahjongAlgorithm";
import { HQMJMahjongDef } from "../ConstDef/HQMJMahjongDef";
import HQMJ_BanlanceFixed from "../PlayerCard/banlanceShow/HQMJ_BanlanceFixed";
import HQMJ_BanlanceActive from "../PlayerCard/banlanceShow/HQMJ_BanlanceActive";
import { SetTextureRes } from "../../MJCommon/MJ_Function";
import M_HQMJClass from "../M_HQMJClass";
import { LoadHeader } from "../../../Tools/Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HQMJ_SinglePlayerBalance extends cc.Component {

    @property(cc.Label)
    lbl_account: cc.Label=null;

    @property(cc.Label)
    lbl_totalScore: cc.Label=null;
    @property(cc.Label)
    lbl_totalScoreWin: cc.Label=null;  

    @property(cc.Sprite)
    img_la_0: cc.Sprite=null;
    @property(cc.Sprite)
    img_la_1: cc.Sprite=null;
    @property(cc.Sprite)
    img_pao_0: cc.Sprite=null;
    @property(cc.Sprite)
    img_pao_1: cc.Sprite=null;

    @property(HQMJ_BanlanceFixed)
    fixedCard: HQMJ_BanlanceFixed=null;
    @property(HQMJ_BanlanceActive)
    handCard: HQMJ_BanlanceActive=null;

    @property(cc.Sprite)
    headPhoto:cc.Sprite = null;

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
    public showBalance(account:string,allcard:M_HQMJ_GameMessage.PlayerCard,balance:M_HQMJ_GameMessage.PlayerBalance,faceID:string):void{
        this.fixedCard.clear();
       // this.fixedCard.node.removeAllChildren();
        this.handCard.clear();
     //   this.handCard.node.removeAllChildren();

        LoadHeader(faceID, this.headPhoto);

        let ss:string = "";
        if(HQMJMahjongAlgorithm.strLen(account) > 4){
            ss = account.substring(0,4);
        }else{
            ss = account;
        }
        this.lbl_account.string = ss;
        if(balance.TotalScore>0){
            this.lbl_totalScore.node.active = false;
            this.lbl_totalScoreWin.node.active = true;
            this.lbl_totalScoreWin.string = "+"+balance.TotalScore.toString();
            
        }
        else{
            this.lbl_totalScore.node.active = true;
            this.lbl_totalScoreWin.node.active = false;
            this.lbl_totalScore.string = balance.TotalScore.toString();
        }

        //this.lbl_totalScore.node.color =cc.hexToColor(this.getScoreShowColor(balance.TotalScore));
        this._usefulinfo=0;
        //手牌部分
        if(allcard.fixedCard.length>0)
        {
            for(var i=0;i<allcard.fixedCard.length;i++)
            {
                this.fixedCard.addFixed(allcard.fixedCard[i].tokenCard,allcard.fixedCard[i].type, null,allcard.fixedCard[i].chiType);
            }
            this.handCard.fixedCardNum=allcard.fixedCard.length;
        }          
        this.handCard._holdCard=allcard.huCard;
        HQMJMahjongAlgorithm.sortCardAry(allcard.handCard);
        if(allcard.huCard!=HQMJMahjongDef.gInvalidMahjongValue)
            allcard.handCard.push(allcard.huCard);
        this.handCard.refreshHandCardData(allcard.handCard);
        let url="";
        if(balance.JieSuan[0]>0){
            // url="gameres/M_HQMJ/Texture/LaPaoZuo/zuo";
            // SetTextureRes(url,this.img_la_0);
            // SetTextureRes(url,this.img_la_1);
            // this.img_la_0.texture=<egret.Texture>RES.getRes("zuo_png");
            // this.img_la_1.texture=<egret.Texture>RES.getRes("zuo_png");
        }else{
            // url="gameres/M_HQMJ/Texture/LaPaoZuo/la";
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
            
    }

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
