import { LHZMJMahjongDef, LHZMJ } from "../ConstDef/LHZMJMahjongDef";
import M_LHZMJVideoClass from "../M_LHZMJVideoClass";
import M_LHZMJClass from "../M_LHZMJClass";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LHZMJ_GameInfo extends cc.Component {

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
    private _groupid:number;

    onLoad() {
        // init logic
        //this.init();
    }

    /**
     * 初始化
     * */
    public init():void{
        this.node.active=true;

        this._leftCardNum=112;
 

        this.lbl_leftCardNum.string = this._leftCardNum.toString();
  
        this.GroupRoomInfo.active=false;
        
        this.GroupLeftCard.active=false;
        this._groupid = 0;
    }

    
    /**
     * 设置桌子号
     * */
    public set tableCode(value:string){
        if(value.length > 0){
            this.GroupRoomInfo.active=true;
            if(LHZMJ.ins.iclass.isVideo()){
                if(M_LHZMJVideoClass.ins.TableConfig._groupid>0){
                    this.lbl_RoomInfo.string = "亲友圈房号:"+value;
                }else{
                     this.lbl_RoomInfo.string = "房号:"+value;
                }
            }else{
                if(M_LHZMJClass.ins.TableConfig._groupid>0){
                    this.lbl_RoomInfo.string = "亲友圈房号:"+value;
                }else{
                     this.lbl_RoomInfo.string = "房号:"+value;
                }
            }
        }
    }
    public SetGameNum(now:number,all:number):void{
        this.lbl_GameNum.string="局数:"+now+"/"+all;
    }
    /**
     * 抓牌结束
     * */
    public holdCardOver():void{
        this.GroupLeftCard.active=true;
        this.leftCardNum = LHZMJMahjongDef.gCardCount_Package - (LHZMJMahjongDef.gCardCount_Active - 1) * LHZMJMahjongDef.gPlayerNum;
    }
    public get cardCount():number{
        return this._leftCardNum;
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
