import { M_LHZMJ_GameMessage } from "../../../CommonSrc/M_LHZMJ_GameMessage";

import { LHZMJMahjongDef } from "../ConstDef/LHZMJMahjongDef";
import LHZMJ_BanlanceFixed from "../PlayerCard/banlanceShow/LHZMJ_BanlanceFixed";
import LHZMJ_BanlanceActive from "../PlayerCard/banlanceShow/LHZMJ_BanlanceActive";
import { SetTextureRes } from "../../MJCommon/MJ_Function";
import M_LHZMJClass from "../M_LHZMJClass";
import { LHZMJMahjongAlgorithm1 } from "../LHZMJMahjongAlgorithm/LHZMJMahjongAlgorithm1";
import LHZMJ_BanlanceFlower from "../PlayerCard/banlanceShow/LHZMJ_BanlanceFlower";
import { LoadHeader } from "../../../Tools/Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_SinglePlayerBalance extends cc.Component {

    @property(cc.Label)
    lbl_account: cc.Label=null;

    @property(cc.Label)
    lbl_totalScore: cc.Label=null;
    @property(cc.Label)
    lbl_totalScoreWin: cc.Label=null;      
    // @property([cc.Label])
    // lbl_playBanlance: cc.Label[]=[];

    @property(LHZMJ_BanlanceFixed)
    fixedCard: LHZMJ_BanlanceFixed=null;
    @property(LHZMJ_BanlanceActive)
    handCard: LHZMJ_BanlanceActive=null;



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
    public showFlowerCard(cardAry:M_LHZMJ_GameMessage.PlayerCard):void{

        }
    
    /**
     * 显示玩家结算信息
     * */
    public showBalance(account:string,allcard:M_LHZMJ_GameMessage.PlayerCard,balance:M_LHZMJ_GameMessage.PlayerBalance,faceID:string):void{
        this.fixedCard.clear();
       // this.fixedCard.node.removeAllChildren();
        this.handCard.clear();
       // this.handCard.node.removeAllChildren();
        this.lbl_account.string = account;
        LoadHeader(faceID, this.headPhoto);
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
        this._usefulinfo=0;
        // for(var i:number=0; i<8; i++){
        //     this.lbl_playBanlance[i].node.active=false;
        // }
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
        LHZMJMahjongAlgorithm1.sortCardAry(allcard.handCard);
        allcard.handCard=LHZMJMahjongAlgorithm1.sortCardAry1(allcard.handCard,M_LHZMJClass.ins.GetHunCardAry());
        //LHZMJMahjongAlgorithm1.sortCardAry1(allcard.handCard);
        if(allcard.huCard!=LHZMJMahjongDef.gInvalidMahjongValue)
            allcard.handCard.push(allcard.huCard);
        this.handCard.refreshHandCardData(allcard.handCard);
        let url="";
        if(balance.JieSuan[0]>0){

        }else{

        }
      
        //结算部分，赢钱才显示详细信息
        if(balance.TotalScore>0 || balance.HuType>0)
        {
            // //明杠
            // if(balance.JieSuan[3]>0 && this._usefulinfo<8)
            // {
            //     this.lbl_playBanlance[this._usefulinfo].string="明杠X"+balance.JieSuan[3];
            //     this.lbl_playBanlance[this._usefulinfo++].node.active=true;
            // }

            // //放杠
            // if(balance.JieSuan[4]>0 && this._usefulinfo<8 )
            // {
            //     this.lbl_playBanlance[this._usefulinfo].string="放杠X"+balance.JieSuan[4];
            //     this.lbl_playBanlance[this._usefulinfo++].node.active=true;
            // }
            // //补杠
            // if(balance.JieSuan[5]>0 && this._usefulinfo<8 )
            // {
            //     this.lbl_playBanlance[this._usefulinfo].string="补杠X"+balance.JieSuan[5];
            //     this.lbl_playBanlance[this._usefulinfo++].node.active=true;
            // }
            // //暗杠
            // if(balance.JieSuan[6]>0 && this._usefulinfo<8 )
            // {
            //     this.lbl_playBanlance[this._usefulinfo].string="暗杠X"+balance.JieSuan[6];
            //     this.lbl_playBanlance[this._usefulinfo++].node.active=true;
            // }
            // //杠后开花
            // if(balance.JieSuan[7]>0 && this._usefulinfo<8)
            // {
            //     this.lbl_playBanlance[this._usefulinfo].string="杠后开花";
            //     this.lbl_playBanlance[this._usefulinfo++].node.active=true;
            // }
            // //天胡
            // if(balance.JieSuan[8]>0 && this._usefulinfo<8)
            // {
            //     this.lbl_playBanlance[this._usefulinfo].string="天胡";
            //     this.lbl_playBanlance[this._usefulinfo++].node.active=true;
            // }
               
           
            //  //报听
            // if(balance.JieSuan[9]>0 && this._usefulinfo<8)
            // {
            //     this.lbl_playBanlance[this._usefulinfo].string="报听";
            //     this.lbl_playBanlance[this._usefulinfo++].node.active=true;
            // }
            // //出会
            // if(balance.JieSuan[10]>0 && this._usefulinfo<8)
            // {
            //     this.lbl_playBanlance[this._usefulinfo].string="出会"+balance.JieSuan[10];
            //     this.lbl_playBanlance[this._usefulinfo++].node.active=true;
            // }
                // this.lbl_playBanlance[this._usefulinfo].string="庄分："+M_LHZMJClass.ins._lianBanker+1;
                // this.lbl_playBanlance[this._usefulinfo++].node.active=true;
            
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
