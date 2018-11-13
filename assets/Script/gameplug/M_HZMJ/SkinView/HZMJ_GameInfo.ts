import { HZMJMahjongDef, HZMJ } from "../ConstDef/HZMJMahjongDef";
import M_HZMJVideoClass from "../M_HZMJVideoClass";
import M_HZMJClass from "../M_HZMJClass";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HZMJ_GameInfo extends cc.Component {

    @property(cc.Label)
    lbl_leftCardNum: cc.Label=null;
    @property(cc.Node)
    GroupRoomInfo: cc.Node=null;

    @property(cc.Node)
    GroupLeftCard: cc.Node=null;

    @property(cc.Label)
    lbl_RoomInfo: cc.Label=null;

    @property(cc.Label)
    lbl_GameNum: cc.Label=null;

    private _leftCardNum:number;

    onLoad() {
        // init logic
        //this.init();
    }

    /**
     * 初始化
     * */
    public init():void{
        this.node.active=true;

        this._leftCardNum=136;
               if(HZMJ.ins.iclass.isVideo()){
        if(M_HZMJVideoClass.ins.TableConfig.IsBuKao){
            
            this._leftCardNum=108;
        }
    }else{
            if(M_HZMJClass.ins.TableConfig.IsBuKao){
            
            this._leftCardNum=108;
        }
    

}

        this.lbl_leftCardNum.string = this._leftCardNum.toString();
  
        this.GroupRoomInfo.active=false;
        
        this.GroupLeftCard.active=false;
    }
    
    /**
     * 设置桌子号
     * */
    public set tableCode(value:string){
        if(value.length > 0){
            this.GroupRoomInfo.active=true;
            this.lbl_RoomInfo.string = value;
        }
    }
    public SetGameNum(now:number,all:number):void{
        this.lbl_GameNum.string=""+now+"/"+all;
    }
    /**
     * 抓牌结束
     * */
    public holdCardOver():void{
          this.leftCardNum = HZMJMahjongDef.gCardCount_Package - (HZMJMahjongDef.gCardCount_Active - 1) * HZMJMahjongDef.gPlayerNum;
        
        if(HZMJ.ins.iclass.isVideo()){
            
        if(M_HZMJVideoClass.ins.TableConfig.IsBuKao){
        this.leftCardNum = 108 - (HZMJMahjongDef.gCardCount_Active - 1) * HZMJMahjongDef.gPlayerNum;

            
        }

    }else{
        
        if(M_HZMJClass.ins.TableConfig.IsBuKao){
        this.leftCardNum = 108 - (HZMJMahjongDef.gCardCount_Active - 1) * HZMJMahjongDef.gPlayerNum;

            
        }

        }

    }
    /**
     * 玩家抓了一张牌
     * */
    public holdACard():void{
        this.GroupLeftCard.active=true;
        if(this._leftCardNum > 0){
            this.leftCardNum = this._leftCardNum - 1;
        }
    }
    /**
     * 抓一定数量的牌
     * */
    public holdNumCard(holdNum:number):void{
        this.GroupLeftCard.active=true;
        this.leftCardNum = this._leftCardNum - holdNum;
    }
    /**
     * 设置剩余牌张数
     * */
    public set leftCardNum(cardNum:number){
        this.GroupLeftCard.active=true;
        this._leftCardNum = cardNum;
        this.lbl_leftCardNum.string=this._leftCardNum.toString();
    }
}
