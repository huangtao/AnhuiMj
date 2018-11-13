

import { enFixedCardType, HZMJ } from "../ConstDef/HZMJMahjongDef";
const {ccclass, property} = cc._decorator;
import { HZMJMahjongAlgorithm } from "../HZMJMahjongAlgorithm/HZMJMahjongAlgorithm";
@ccclass
export default class HZMJ_FanMa extends cc.Component {
     public FanShuNum:number=0;
    //中码图标
     @property([cc.Sprite])
    img_zhongma: cc.Sprite[]=[];
    //牌面
     @property([cc.Sprite])
    bmp_cardbackAry: cc.Sprite[]=[];
    //花色
     @property([cc.Sprite])
    bmp_cardcolorAry: cc.Sprite[]=[];
    @property(cc.Sprite)
    bmp_fanmalable: cc.Sprite=null;
     onload(){       
          this.bmp_fanmalable.node.active=false;  
          
     }
     
    public initView():void{       
        this.node.active=false;
        this.bmp_fanmalable.node.active=false;  
    }
    public showFanMa(vSrc:Array<number>):void{
        
        let url="";
        this.node.active=true;
        for(let i=0;i<6;i++){
        this.img_zhongma[i].node.active=false;
        this.bmp_cardcolorAry[i].node.active=false;                 
    }
    //牌背颜色
   url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/pb3_active_self_1280`; 
    //牌面颜色                 
   url=`gameres/gameCommonRes/Texture/Mahjong/PaiBei3/s_top_self_showcardback_bg`;                                                           
      for(let k=0;k<vSrc.length;k++){
            if(vSrc[k]!=0){  
                 this.FanShuNum++;              
                 this.bmp_cardbackAry[k].spriteFrame=HZMJ.ins.iclass.getMahjong3DPaiBeiRes("hand_self_1");
                 this.bmp_cardcolorAry[k].spriteFrame=HZMJ.ins.iclass.getMahjongPaiHuaRes(vSrc[k]);                          
                 this.bmp_cardcolorAry[k].node.active=true; 
                 this.bmp_cardcolorAry[k].node.scaleX=0.65;
                 this.bmp_cardcolorAry[k].node.scaleY=0.65; 
                  this.bmp_cardbackAry[k].node.scaleX=1.2;
                  this.bmp_cardbackAry[k].node.scaleY=1.2;
                 this.bmp_cardcolorAry[k].node.x=2;
                 this.bmp_cardcolorAry[k].node.y=1;            
        }
          
            if((HZMJMahjongAlgorithm.GetMahjongValue(vSrc[k])==1) || (HZMJMahjongAlgorithm.GetMahjongValue(vSrc[k])==5) || (HZMJMahjongAlgorithm.GetMahjongValue(vSrc[k])==9) || (HZMJMahjongAlgorithm.GetMahjongValue(vSrc[k])==35))
            {
                 this.img_zhongma[k].node.active=true; 
            }
        }
    for(let k=0;k<vSrc.length;k++){
         if(this.FanShuNum==2){
                  this.bmp_cardbackAry[0].node.x=-48;
                  this.bmp_cardbackAry[1].node.x=50;
            }
            if(this.FanShuNum==4){
                  this.bmp_cardbackAry[0].node.x=-146;
                  this.bmp_cardbackAry[1].node.x=-48;
                  this.bmp_cardbackAry[2].node.x=50;
                  this.bmp_cardbackAry[3].node.x=148;
            }
    }

    }
  
}
